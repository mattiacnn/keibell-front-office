import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import { firstValueFrom, forkJoin, lastValueFrom } from 'rxjs';
import { IButtonsHeaders, TableComponent } from 'src/app/common/table/table.component';
import { Router } from '@angular/router';
import { AccountSlideComponent } from '../../components/account-slide/account-slide.component';
import { AccountModalCreateComponent } from '../../components/account-modal-create/account-modal-create.component';

@Component({
  selector: 'app-accounts-browser',
  templateUrl: './accounts-browser.component.html',
  styleUrls: ['./accounts-browser.component.sass'],
})
export class AccountsBrowserComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(TableComponent) tableComponent: TableComponent;
  @ViewChild(AccountSlideComponent) accountSlideComponet: AccountSlideComponent;
  @ViewChild(AccountModalCreateComponent) accountModalCreateComponent: AccountModalCreateComponent;
  loading = false;
  dataTable = [];
  headersTable = [{
    name: 'ACCOUNT.BROWSER.TABLE.NAME_TH',
    variable: 'name',
  }];
  buttonsTableEventEmmiter = new EventEmitter();
  buttonsHeaderTab: IButtonsHeaders[] = [
    {
      type: 'createItem',
      nzTypeIcon: 'plus-square',
      cssClass: 'e-primary',
      eventEmitter: this.buttonsTableEventEmmiter,
    },
    {
      type: 'deleteItemsSelected',
      nzTypeIcon: 'delete',
      cssClass: 'e-danger',
      eventEmitter: this.buttonsTableEventEmmiter,
      needCheckItem: true,
    }
  ];
  totalItemsTable = 0;

  constructor(
    private readonly backendService: BackendService,
    private readonly router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    this.buttonsTableEvents();
  }

  async ngAfterViewInit(): Promise<void> {
    this.loading = true;
    await this.updateTable();
    this.loading = false;
  }

  async ngOnDestroy(): Promise<void> {
      this.buttonsTableEventEmmiter.unsubscribe();
  }

  async updateTable(): Promise<void> {
    try {
      const pagination = this.tableComponent.transformPagination2HttpParams();
      const request: any = this.backendService.getAccounts(null, pagination);
      const response: any = await lastValueFrom(request);
      this.dataTable = response.body;
      this.totalItemsTable = Number(response.headers.get('x-total-count'));
      this.tableComponent.totalItems = this.totalItemsTable;
      this.tableComponent.updatePagination();
    } catch (e) {

    }
  }

  buttonsTableEvents(): void {
    this.buttonsTableEventEmmiter.subscribe( async (event) => {
      switch (event.type) {
        case 'createItem':
          this.accountModalCreateComponent.open();
          break;
        case 'deleteItemsSelected':
          this.loading = true;
          const forkJoinRequest = {};
          for (const id of event.chekedList) {
            forkJoinRequest[id] = this.backendService.deleteAccount(id);
          }
          const request = forkJoin(forkJoinRequest);
          try {
            const response: any = await firstValueFrom(request);
          } catch (e) {
            console.log(e);
          }
          await this.updateTable();
          this.loading = false;
          break;
      }
    });
  }

  onClickItem(item) {
    this.accountSlideComponet.open(item.id);
  }

  modifyItemEvent() {
    this.updateTable();
  }


  createItemEvent() {
    this.updateTable();
  }

  updatePaginationEvent(event) {
    this.updateTable();
  }

}
