import {AfterViewInit, Component, EventEmitter, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {firstValueFrom, forkJoin, lastValueFrom} from "rxjs";
import {BackendService} from "../../../services/backend.service";
import {IButtonsHeaders, IUpdatePaginationEvent, TableComponent} from "src/app/common/table/table.component";
import {
  PropertyCustomerSlideComponent
} from "../../../property-customers/components/property-customer-slide/property-customer-slide.component";
import {
  ReservationSlideComponent
} from "../../../reservations/components/reservation-slide/reservation-slide.component";
import {
  PropertyResourcesSlideComponent
} from "../../../property-resources/components/property-resources-slide/property-resources-slide.component";

@Component({
  selector: 'app-account-property-detail',
  templateUrl: './account-property-detail.component.html',
  styleUrls: ['./account-property-detail.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountPropertyDetailComponent implements OnInit, AfterViewInit {

  loading = false;
  name = "";
  accountId;
  generalFormGroup: FormGroup;

  @ViewChild('tableAccountPropertyResource') tableAccountPropertyResource: TableComponent;
  @ViewChild(PropertyResourcesSlideComponent) propertyResourcesSlideComponent: PropertyResourcesSlideComponent;
  resourcesList = [];
  headersResourcesTab = [
    {
      name: 'ACCOUNT_PROPERTY.DETAIL.RESOURCE_TABLE_HEADER.NAME_TH',
      variable: 'name'
    },
    {
      name: 'ACCOUNT_PROPERTY.DETAIL.RESOURCE_TABLE_HEADER.STATUS_TH',
      variable: 'status'
    }
  ];
  buttonsResourcesTableEventEmitter = new EventEmitter<any>();
  buttonsHeaderResourcesTab: IButtonsHeaders[] = [
  ];

  @ViewChild('tableAccountPropertyCustomer') tableAccountPropertyCustomer: TableComponent;
  @ViewChild(PropertyCustomerSlideComponent) propertyCustomerSlideComponent: PropertyCustomerSlideComponent;
  customersList = [];
  headersCustomersTab = [
    {
      name: 'ACCOUNT_PROPERTY.DETAIL.CUSTOMER_TABLE_HEADER.NAME_TH',
      variable: 'name'
    },
    {
      name: 'ACCOUNT_PROPERTY.DETAIL.CUSTOMER_TABLE_HEADER.SURNAME_TH',
      variable: 'surname'
    },
    {
      name: 'ACCOUNT_PROPERTY.DETAIL.CUSTOMER_TABLE_HEADER.EMAIL_TH',
      variable: 'email'
    },
  ];
  buttonsHeaderCustomerTab: IButtonsHeaders[] = [
  ];

  @ViewChild('tableAccountPropertyReservation') tableAccountPropertyReservation: TableComponent;
  @ViewChild(ReservationSlideComponent) reservationSlideComponent: ReservationSlideComponent;
  reservationList = [];
  headersReservationTable = [
    {
      name: 'ACCOUNT_PROPERTY.DETAIL.RESERVATION_TABLE_HEADER.CUSTOMER_EMAIL_TH',
      variable: 'customer_email'
    },
    {
      name: 'ACCOUNT_PROPERTY.DETAIL.RESERVATION_TABLE_HEADER.RESOURCE_TH',
      variable: 'resource_name'
    },
    {
      name: 'ACCOUNT_PROPERTY.DETAIL.RESERVATION_TABLE_HEADER.START_DATE_TH',
      variable: 'start_date'
    },
    {
      name: 'ACCOUNT_PROPERTY.DETAIL.RESERVATION_TABLE_HEADER.END_DATE_TH',
      variable: 'end_date'
    },
  ];
  buttonsHeaderReservationTableEvent = new EventEmitter<any>();
  buttonsHeaderReservationTable: IButtonsHeaders[] = [
    {
      type: "goCalendar",
      eventEmitter: this.buttonsHeaderReservationTableEvent,
      cssClass: 'e-primary',
      nzTypeIcon: 'calendar',
      needCheckItem: false,
    }
  ];


  constructor(
    private readonly fb: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly backendService: BackendService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    const accountProperty = this.activatedRoute.snapshot.data.accountProperty.body;
    this.accountId = this.activatedRoute.snapshot.params.accountId;
    this.initGeneralFormGroup();
    this.setValuesFormByResponseGeneralFormGroup(accountProperty);
  }

  async ngAfterViewInit(): Promise<void> {
    const forkJoinParameter = {
      resources: this.updateResourcesTable(),
      customer: this.updateCustomerTable(),
      reservation: this.updateReservationTable(),
    };
    const updateTableRequest = forkJoin(forkJoinParameter);
    await lastValueFrom(updateTableRequest);
    this.tableAccountPropertyResource.updatePagination();
    this.tableAccountPropertyCustomer.updatePagination();
    this.tableAccountPropertyReservation.updatePagination();
    this.buttonsSubscriptionReservationTableHeader();
  }

  initGeneralFormGroup() {
    this.generalFormGroup = this.fb.group({
      id: [{value: '', disabled: true}],
      name: [''],
      pms_type: [''],
      pms_connection_ClientToken: [''],
      pms_connection_AccessToken: [''],
      lock_tech: [''],
      lock_tech_connection_host: [''],
      lock_tech_connection_port: [''],
    });
  }

  setValuesFormByResponseGeneralFormGroup(response): void {
    this.name = response.name;
    this.generalFormGroup.get('id').setValue(response.id);
    this.generalFormGroup.get('name').setValue(response.name);
    this.generalFormGroup.get('pms_type').setValue(response.pms_type);
    this.generalFormGroup.get('pms_connection_ClientToken').setValue(response.pms_connection?.ClientToken);
    this.generalFormGroup.get('pms_connection_AccessToken').setValue(response.pms_connection?.AccessToken);
    this.generalFormGroup.get('lock_tech').setValue(response.lock_tech);
    this.generalFormGroup.get('lock_tech_connection_host').setValue(response.lock_tech_connection?.host);
    this.generalFormGroup.get('lock_tech_connection_port').setValue(response.lock_tech_connection?.port);
  }

  async onCancelClickGeneral(): Promise<void> {
    this.loading = true;
    try {
      const request = this.backendService.getAccountProperties(this.accountId, this.generalFormGroup.get('id').value);
      const response: any = await firstValueFrom(request);
      const responseBody = response.body;
      this.setValuesFormByResponseGeneralFormGroup(responseBody);
    } catch (e) {

    }
    this.loading = false;
  }

  async onModifyClickGeneral(): Promise<void> {
    this.loading = true;
    try {
      const value = {
        name: this.generalFormGroup.get('name').value,
        pms_type: this.generalFormGroup.get('pms_type').value,
        pms_connection: {
          AccessToken: this.generalFormGroup.get('pms_connection_AccessToken').value,
          ClientToken: this.generalFormGroup.get('pms_connection_ClientToken').value,
        },
        lock_tech: this.generalFormGroup.get('lock_tech').value,
        lock_tech_connection: {
          host: this.generalFormGroup.get('lock_tech_connection_host').value,
          port: this.generalFormGroup.get('lock_tech_connection_port').value,
        }
      }
      const request = this.backendService.putAccountProperty(this.accountId, this.generalFormGroup.get('id').value, value);
      const response: any = await firstValueFrom(request);
      this.name = value.name;
    } catch (e) {

    }
    this.loading = false;
  }

  onClickResourceTableItem(event) {
    this.propertyResourcesSlideComponent.open(this.accountId, this.generalFormGroup.get('id').value, event.id);
  }

  async updateResourcesTable(): Promise<void> {
    this.tableAccountPropertyResource.loading = true;
    try {
      const pagination = this.tableAccountPropertyResource.transformPagination2HttpParams();
      const request = this.backendService.getAccountPropertyResources(this.accountId, this.generalFormGroup.get('id').value, null, pagination);
      const response: any = await lastValueFrom(request);
      const body = response.body;
      this.resourcesList = body;
      this.tableAccountPropertyResource.totalItems = response.headers.get('x-total-count');
    } catch (e) {
      console.log(e);
    }
    this.tableAccountPropertyResource.loading = false;
  }

  updatePaginationEventResource($event): void {
    this.updateResourcesTable();
  }

  async updateCustomerTable(): Promise<void> {
    this.tableAccountPropertyCustomer.loading = true;
    try {
      const pagination = this.tableAccountPropertyCustomer.transformPagination2HttpParams();
      const request = this.backendService.getAccountPropertyCustomers(this.accountId, this.generalFormGroup.get('id').value, null, pagination);
      const response: any = await lastValueFrom(request);
      const body = response.body;
      this.customersList = body;
      this.tableAccountPropertyCustomer.totalItems = response.headers.get('x-total-count');
    } catch (e) {
      console.log(e);
    }
    this.tableAccountPropertyCustomer.loading = false;
  }

  updatePaginationEventCustomer($event): void {
    this.updateCustomerTable();
  }


  async onClickCustomerTable(event: any): Promise<void> {
    this.propertyCustomerSlideComponent.open(event);
  }

  async updateReservationTable(): Promise<void> {
    this.tableAccountPropertyReservation.loading = true;
    try {
      const pagination = this.tableAccountPropertyReservation.transformPagination2HttpParams();
      const requestResource = this.backendService.getAccountPropertyResources(this.accountId, this.generalFormGroup.get('id').value);
      const responseResource: any = await lastValueFrom(requestResource);
      const bodyResource = responseResource.body as any[];
      const request = this.backendService.getAccountPropertyReservations(this.accountId, this.generalFormGroup.get('id').value, null, pagination);
      const response: any = await lastValueFrom(request);
      const body = response.body as any[];
      this.reservationList = body.map((element) => {
        element.resource_name = bodyResource.find(value => {
          return value.pms_resource_id === element.pms_resource_id;
        }).name;
        const start_date = new Date(element.start_date);
        const end_date = new Date(element.end_date);
        element.start_date = `${start_date.getFullYear()}-${start_date.getMonth()}-${start_date.getDay()} ${start_date.getHours()}:${start_date.getMinutes()}`;
        element.end_date = `${end_date.getFullYear()}-${end_date.getMonth()}-${end_date.getDay()} ${end_date.getHours()}:${end_date.getMinutes()}`;
        return element;
      });
      this.tableAccountPropertyReservation.totalItems = response.headers.get('x-total-count');
    } catch (e) {
      console.log(e);
    }
    this.tableAccountPropertyReservation.loading = false;
  }

  updatePaginationEventReservation(event): void {
    this.updateReservationTable();
  }

  buttonsSubscriptionReservationTableHeader() {
    this.buttonsHeaderReservationTableEvent.subscribe((event) => {
      switch (event.type) {
        case 'goCalendar':
          this.router.navigate(['reservation', 'browser'], {
            queryParams: {
             accountId: this.accountId,
             propertyId: this.generalFormGroup.get('id').value,
            }
          });
          break;
      }
    });
  }

  async onClickReservationTableItem(event): Promise<void> {
    this.reservationSlideComponent.open(this.accountId, this.generalFormGroup.get('id').value, event.id);
  }


}
