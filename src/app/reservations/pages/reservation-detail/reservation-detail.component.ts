import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BackendService} from "../../../services/backend.service";
import {firstValueFrom, forkJoin} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ReservationDetailComponent implements OnInit {

  loading = false;
  itemId: any;
  accountId: any;
  propertyId: any;
  name = "";
  formGroup: FormGroup;
  devices: any[] = [];

  clientList = [];
  clientListHeaders: any[] = [
    {
      name: 'RESERVATION.DETAIL.CLIENTS_TABLE.NAME_TH',
      variable: 'name'
    }, {
      name: 'RESERVATION.DETAIL.CLIENTS_TABLE.SURNAME_TH',
      variable: 'surname'
    }
  ];

  isVisiblePrintKeyModal = false;
  selectedDevice: any = null;

  constructor(
    private readonly backendService: BackendService,
    private readonly fb: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.initForm();
    const urlParams = this.activatedRoute.snapshot.params;
    this.itemId = urlParams['id'];
    this.accountId = urlParams['accountId'];
    this.propertyId = urlParams['propertyId'];
    const request = forkJoin({
      reservation: this.backendService.getAccountPropertyReservations(this.accountId, this.propertyId, this.itemId),
      clients: this.backendService.getReservationClients(this.accountId, this.propertyId, this.itemId),
      devices: this.backendService.getDevice(this.accountId, this.propertyId),
    });
    const response: any = await firstValueFrom(request);
    const responseBody: any = {
      reservation: response.reservation.body,
      clients: response.clients.body,
      devices: response.devices.body,
    };
    this.devices = responseBody.devices;
    console.log(this.devices);
    this.clientList = responseBody.clients;
    this.setDataByResponse(responseBody);
    this.loading = false;
  }

  initForm() {
    this.formGroup = this.fb.group({
      id: [{value: '', disabled: true}],
      start_date: [{value: '', disabled: true}],
      end_date: [{value: '', disabled: true}],
      status: [{value: '', disabled: true}],
    });
  }

  setDataByResponse(response) {
    const start_date = new Date(response.reservation?.start_date);
    const end_date = new Date(response.reservation?.end_date);
    this.formGroup.get('id').setValue(response.reservation.id);
    this.formGroup.get('status').setValue(response.reservation.status);
    this.formGroup.get('start_date').setValue(`${start_date.getFullYear()}-${start_date.getMonth() + 1}-${start_date.getDate()}`);
    this.formGroup.get('end_date').setValue(`${end_date.getFullYear()}-${end_date.getMonth() + 1}-${end_date.getDate()}`);
  }

  onClickPrintKey() {
    this.isVisiblePrintKeyModal = true;
    this.selectedDevice = null;
  }

  onAcceptPrintKey() {
    this.isVisiblePrintKeyModal = false;
    this.backendService.postKeyCutter(this.accountId, this.propertyId, this.selectedDevice, { reservation_id: this.itemId });
  }

  onCancelPrintKey() {
    this.isVisiblePrintKeyModal = false;
  }

}
