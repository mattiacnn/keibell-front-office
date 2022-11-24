import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {firstValueFrom, forkJoin, lastValueFrom} from 'rxjs';
import {
  AccountPersonModalCreateComponent
} from 'src/app/account-persons/components/account-person-modal-create/account-person-modal-create.component';
import {
  AccountPersonSlideComponent
} from 'src/app/account-persons/components/account-person-slide/account-person-slide.component';
import {
  AccountPropertySlideComponent
} from 'src/app/account-properties/components/account-property-slide/account-property-slide.component';
import {TableComponent, IButtonsHeaders} from 'src/app/common/table/table.component';
import {BackendService} from 'src/app/services/backend.service';
import {
  AccountPropertyModalCreateComponent
} from "../../../account-properties/components/account-property-modal-create/account-property-modal-create.component";
import {
  AccountKioskSlideComponent
} from "../../../account-kioks/components/account-kiosk-slide/account-kiosk-slide.component";
import {
  AccountKioskModalCreateComponent
} from "../../../account-kioks/components/account-kiosk-modal-create/account-kiosk-modal-create.component";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AccountDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  account;
  loading = false;
  formGroup: FormGroup;

  @ViewChild('tablePersonsAccountDetail', {static: false}) tablePersonsAccountDetail: TableComponent;
  @ViewChild('tablePropertiesAccountDetail', {static: false}) tablePropertiesAccountDetail: TableComponent;
  @ViewChild('tableKiosksAccountDetail', {static: false}) tableKiosksAccountDetail: TableComponent;
  @ViewChild(AccountPersonModalCreateComponent) accountPersonModalCreateComponent: AccountPersonModalCreateComponent;
  @ViewChild(AccountPropertyModalCreateComponent) accountPropertyModalCreate: AccountPropertyModalCreateComponent;
  @ViewChild(AccountKioskModalCreateComponent) accountKioskModalCreateComponent: AccountKioskModalCreateComponent;
  headersPersonsTab = [
    {
      name: 'ACCOUNT.DETAIL.PERSONS_TAB.NAME_TH',
      variable: 'name'
    }, {
      name: 'ACCOUNT.DETAIL.PERSONS_TAB.SURNAME_TH',
      variable: 'surname'
    }, {
      name: 'ACCOUNT.DETAIL.PERSONS_TAB.EMAIL_TH',
      variable: 'email'
    }
  ];
  headersPropertiesTab = [
    {
      name: 'ACCOUNT.DETAIL.PROPERTIES_TAB.NAME_TH',
      variable: 'name'
    },
    {
      name: 'ACCOUNT.DETAIL.PROPERTIES_TAB.PMS_TYPE_TH',
      variable: 'pms_type'
    }
  ];
  headersKiosksTab = [
    {
      name: 'ACCOUNT.DETAIL.KIOSKS_TAB.NAME_TH',
      variable: 'name'
    },
  ];
  buttonsPersonsTableEventEmmiter = new EventEmitter();
  buttonsHeaderPersonsTab: IButtonsHeaders[] = [
    {
      type: 'addEmployee',
      nzTypeIcon: 'plus-square',
      cssClass: 'e-primary',
      eventEmitter: this.buttonsPersonsTableEventEmmiter,
    },
    {
      type: 'inviteEmployee',
      nzTypeIcon: 'user-add',
      cssClass: 'e-primary',
      eventEmitter: this.buttonsPersonsTableEventEmmiter,
      needCheckItem: true,
    },
    {
      type: 'deleteItemsSelected',
      nzTypeIcon: 'delete',
      cssClass: 'e-danger',
      eventEmitter: this.buttonsPersonsTableEventEmmiter,
      needCheckItem: true,
    }
  ];
  buttonsPropertiesTableEventEmmiter = new EventEmitter();
  buttonsHeaderPropertiesTab: IButtonsHeaders[] = [
    {
      type: 'createItem',
      nzTypeIcon: 'plus-square',
      cssClass: 'e-primary',
      eventEmitter: this.buttonsPropertiesTableEventEmmiter,
    },
    {
      type: 'deleteItemsSelected',
      nzTypeIcon: 'delete',
      cssClass: 'e-danger',
      eventEmitter: this.buttonsPropertiesTableEventEmmiter,
      needCheckItem: true,
    }
  ];
  buttonsKioskTableEventEmmiter = new EventEmitter();
  buttonsHeaderKiosksTab: IButtonsHeaders[] = [
    {
      type: 'createItem',
      nzTypeIcon: 'plus-square',
      cssClass: 'e-primary',
      eventEmitter: this.buttonsKioskTableEventEmmiter,
    },
    {
      type: 'deleteItemsSelected',
      nzTypeIcon: 'delete',
      cssClass: 'e-danger',
      eventEmitter: this.buttonsKioskTableEventEmmiter,
      needCheckItem: true,
    }
  ];
  personsList: any[] = [];
  propertiesList: any[] = [];
  kiosksList: any[] = [];

  @ViewChild(AccountPersonSlideComponent) acountPersonSlide: AccountPersonSlideComponent;
  @ViewChild(AccountPropertySlideComponent) accountPropertySlide: AccountPropertySlideComponent;
  @ViewChild(AccountKioskSlideComponent) accountKioskSlide: AccountKioskSlideComponent;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly backendService: BackendService,
  ) {
  }

  ngOnInit(): void {
    this.account = this.activatedRoute.snapshot.data.account.body;
    this.initFormGroup();
    this.setFormGroupByResponse(this.account);
    this.buttonsTableEvents();
  }

  ngOnDestroy(): void {
    this.buttonsPersonsTableEventEmmiter.unsubscribe();
  }

  async ngAfterViewInit(): Promise<void> {
    this.loading = true;
    const forkJoinParameter = {
      kioks: this.updateKiosksTable(),
      persons: this.updatePersonTable(),
      properties: this.updatePropertiesTable(),
    };
    const updateTableRequest = forkJoin(forkJoinParameter);
    await lastValueFrom(updateTableRequest);
    this.loading = false;
  }

  initFormGroup() {
    this.formGroup = this.fb.group({
      id: [{value: this.account.id, disabled: true}],
      name: [''],
      description: ['']
    });
  }

  setFormGroupByResponse(response) {
    this.formGroup.get('name').setValue(response.name);
    this.formGroup.get('description').setValue(response.description);
  }

  buttonsTableEvents(): void {
    this.buttonsPersonsTableEventEmmiter.subscribe(async (event) => {
      switch (event.type) {
        case 'deleteItemsSelected':
          this.loading = true;
          const forkJoinRequest = {};
          for (const id of event.chekedList) {
            forkJoinRequest[id] = this.backendService.deleteAccountPerson(this.account.id, id);
          }
          const request = forkJoin(forkJoinRequest);
          try {
            const response: any = await lastValueFrom(request);
          } catch (e) {
            console.log(e);
          }
          await this.updatePersonTable();
          this.loading = false;
          break;
        case 'addEmployee':
          this.accountPersonModalCreateComponent.open(this.account.id);
          break;
        case 'inviteEmployee':
          this.loading = true;
          const forkJoinGetPersonRequest = {};
          for (const id of event.chekedList) {
            forkJoinGetPersonRequest[id] = this.backendService.getAccountPersons(this.account.id, id);
          }
          const requestGetPerson = forkJoin(forkJoinGetPersonRequest);
          try {
            const responseGetPerson: any = await lastValueFrom(requestGetPerson);
            const forkJoinInvitePersonRequest = {};
            for (const key of Object.keys(responseGetPerson)) {
              const person = responseGetPerson[key].body;
              const value = [{
                agent_type: 'staff',
                agent_uuid: person.uuid,
              }];
              forkJoinInvitePersonRequest[person.uuid] = this.backendService.inviteAccountPersonStaff(this.account.id, value);
            }
            const requestInvitePerson = forkJoin(forkJoinInvitePersonRequest);
            await lastValueFrom(requestInvitePerson);
          } catch (e) {
            console.log(e);
          }
          this.loading = false;
      }
    });

    this.buttonsPropertiesTableEventEmmiter.subscribe(async (event) => {
      switch (event.type) {
        case 'createItem':
          this.accountPropertyModalCreate.open(this.account.id);
          break;
        case 'deleteItemsSelected':
          this.loading = true;
          const forkJoinRequest = {};
          for (const id of event.chekedList) {
            forkJoinRequest[id] = this.backendService.deleteAccountProperties(this.account.id, id);
          }
          const request = forkJoin(forkJoinRequest);
          try {
            const response: any = await lastValueFrom(request);
          } catch (e) {
            console.log(e);
          }
          await this.updatePropertiesTable();
          this.loading = false;
          break;
      }
    });

    this.buttonsKioskTableEventEmmiter.subscribe(async (event) => {
      switch (event.type) {
        case 'createItem':
          this.accountKioskModalCreateComponent.open(this.account.id);
          break;
        case 'deleteItemsSelected':
          this.loading = true;
          const forkJoinRequest = {};
          for (const id of event.chekedList) {
            forkJoinRequest[id] = this.backendService.deleteAccountKiosk(this.account.id, id);
          }
          const request = forkJoin(forkJoinRequest);
          try {
            const response: any = await lastValueFrom(request);
          } catch (e) {
            console.log(e);
          }
          await this.updateKiosksTable();
          this.loading = false;
          break;
      }
    })
  }

  async onAcceptClickUpdateAccount() {
    this.loading = true;
    const value = {
      name: this.formGroup.get('name').value,
      description: this.formGroup.get('description').value,
    }
    try {
      const request: any = this.backendService.putAccounts(this.account.id, value);
      const response: any = await lastValueFrom(request);
      this.account.name = value.name;
    } catch (e) {

    }
    this.loading = false;
  }

  async onCancelClickAccount() {
    this.loading = true;
    try {
      const request = this.backendService.getAccounts(this.account.id);
      const response: any = await firstValueFrom(request);
      const responseBody = response.body;
      this.account.name = responseBody.name;
      this.setFormGroupByResponse(responseBody);
    } catch (e) {

    }
    this.loading = false;
  }

  onClickPersonTable(event) {
    this.acountPersonSlide.open(this.account.id, event.id);
  }

  async updatePersonTable(): Promise<void> {
    try {
      const pagination = this.tablePersonsAccountDetail.transformPagination2HttpParams();
      const request = this.backendService.getAccountPersons(this.account.id, null, pagination);
      const response: any = await lastValueFrom(request);
      const body = response.body;
      this.personsList = body;
      this.tablePersonsAccountDetail.totalItems = response.headers.get('x-total-count');
      this.tablePersonsAccountDetail.updatePagination();
    } catch (e) {
      console.log(e);
    }
  }

  updatePaginationEventPersons(event): void {
    this.updatePersonTable();
  }

  onClickPropertyTable(event) {
    this.accountPropertySlide.open(this.account.id, event.id);
  }

  updatePaginationEventProperties(event) {
    this.updatePropertiesTable();
  }

  async updatePropertiesTable(): Promise<void> {
    try {
      const pagination = this.tablePropertiesAccountDetail.transformPagination2HttpParams();
      const request = this.backendService.getAccountProperties(this.account.id, null, pagination);
      const response: any = await lastValueFrom(request);
      const body = response.body;
      this.propertiesList = body;
      this.tablePropertiesAccountDetail.totalItems = response.headers.get('x-total-count');
      this.tablePropertiesAccountDetail.updatePagination();
    } catch (e) {
      console.log(e);
    }
  }

  async updateKiosksTable(): Promise<void> {
    try {
      const pagination = this.tableKiosksAccountDetail.transformPagination2HttpParams();
      const request = this.backendService.getAccountKiosks(this.account.id, null, pagination);
      const response: any = await lastValueFrom(request);
      const body = response.body;
      this.kiosksList = body;
      this.tableKiosksAccountDetail.totalItems = response.headers.get('x-total-count');
      this.tableKiosksAccountDetail.updatePagination();
    } catch (e) {
      console.log(e);
    }
  }

  updatePaginationEventKiosks(event): void {
    this.updateKiosksTable();
  }

  onClickKioskTable(event) {
    this.accountKioskSlide.open(this.account.id, event.id);
  }

}
