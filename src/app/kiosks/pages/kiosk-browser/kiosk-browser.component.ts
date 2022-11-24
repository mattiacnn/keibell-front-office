import {AfterViewInit, Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {IButtonsHeaders, IUpdatePaginationEvent, TableComponent} from "../../../common/table/table.component";
import {lastValueFrom} from "rxjs";
import {BackendService} from "../../../services/backend.service";
import {KioskActivateModalComponent} from "../../components/kiosk-activate-modal/kiosk-activate-modal.component";

@Component({
  selector: 'app-kiosk-browser',
  templateUrl: './kiosk-browser.component.html',
  styleUrls: ['./kiosk-browser.component.sass']
})
export class KioskBrowserComponent implements OnInit, AfterViewInit {

  loading = false;
  totalItemsTable = 0;
  dataTable = [];
  tableEmitterButtonHeader = new EventEmitter<any>();
  headersTable = [
    {
      name: 'KIOSK.BROWSER_ACTIVATION.TABLE.NAME_TH',
      variable: 'kiosk_id',
    }
  ];
  buttonsHeaderTable: IButtonsHeaders[] = [
    {
      type: 'activate-kiosk',
      eventEmitter: this.tableEmitterButtonHeader,
      cssClass: 'e-primary',
      nzTypeIcon: 'check-square',
      needOnlyOneCheckItem: true
    }
  ];

  @ViewChild(TableComponent) tableComponent: TableComponent;
  @ViewChild(KioskActivateModalComponent) kioskActivateModalComponent: KioskActivateModalComponent;

  constructor(
    private readonly backendService: BackendService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.buttonsHeaderEvent();
  }

  async ngAfterViewInit(): Promise<void> {
    this.loading = true;
    await this.updateTable();
    this.loading = false;
  }

  async updateTable(): Promise<void> {
    try {
      const pagination = this.tableComponent.transformPagination2HttpParams();
      const request: any = this.backendService.getKiosksUnidentified(pagination);
      const response: any = await lastValueFrom(request);
      this.dataTable = response.body;
      this.totalItemsTable = Number(response.headers.get('x-total-count'));
      this.tableComponent.totalItems = this.totalItemsTable;
      this.tableComponent.updatePagination();
    } catch (e) {

    }
  }

  async updatePaginationEvent(event: IUpdatePaginationEvent): Promise<void> {
    this.loading = true;
    await this.updateTable();
    this.loading = false;
  }

  buttonsHeaderEvent() {
    this.tableEmitterButtonHeader.subscribe(event => {
      switch (event.type) {
        case 'activate-kiosk':
          if (event.chekedList && event.chekedList[0]) {
            this.kioskActivateModalComponent.open(event.chekedList[0]);
          }
          break;
      }
    });
  }

  async acceptEventActivateModal(): Promise<void> {
    this.loading = true;
    this.tableComponent.checkedList = [];
    await this.updateTable();
    this.loading = false;
  }

  onClickItem(event) {

  }

}
