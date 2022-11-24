import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {BackendService} from "src/app/services/backend.service";
import {firstValueFrom, forkJoin, lastValueFrom} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reservation-slide',
  templateUrl: './reservation-slide.component.html',
  styleUrls: ['./reservation-slide.component.sass']
})
export class ReservationSlideComponent implements OnInit {

  accountId;
  propertyid;
  itemId;
  isVisible = false;
  isLoading = false;
  clientList = [];
  resourceName = '';
  resource;
  reservation = {};
  isVisibleModalOpenDoor = false;
  nameResource = "";
  nameResourceOpenDoorInput = "";
  disabledOpenDoor = true;
  devicesData: any[] = [];

  clientData = []
  reservationData = [
    {
      label: 'RESERVATION.SLIDE.RESERVATION_SECTION_TITLE.STATUS',
      variable: 'status',
    },
    {
      label: 'Service',
      variable: 'service',
    },
    {
      label: 'Confirmation number',
      variable: 'service',
    },
    {
      label: 'Group name',
      variable: 'service',
    },
    {
      label: 'RESERVATION.SLIDE.RESERVATION_SECTION_TITLE.START_DATE',
      variable: 'startDateOutput',
    },
    {
     label: 'RESERVATION.SLIDE.RESERVATION_SECTION_TITLE.END_DATE',
      variable: 'endDateOutput',
    },
    {
      label: 'Reservation purpose',
      variable: 'service',
    },
    {
      label: 'Avg. rate (nightly)',
      variable: 'service',
    },
    {
      label: 'Requested category',
      variable: 'service',
    },
    {
      label: 'Space category',
      variable: 'service',
    },
    {
      label: 'Assigned space',
      variable: 'service',
    },
    {
      label: 'Rate',
      variable: 'service',
    },
    {
      label: 'Company',
      variable: 'service',
    },
    {
      label: 'Created',
      variable: 'service',
    },
    {
      label: 'Note',
      variable: 'service',
    }
  ]
  dataSet2 = [
    {
      id: 1,
      name: 'Mattia Cannavò',
      spaceName: 'COOL 58'
    }
  ]

  keyData = [
    {
      id: 1,
      name: 'Mattia',
      surname: 'Cannavò',
      type: 'smart',
      created: '31/08/2022',
      status: 'active'
    },
    {
      id: 2,
      name: 'Jim	',
      surname: 'Green',
      type: 'physical',
      created: '31/08/2022',
      status: 'disabled'
    },
  ]

  constructor(
    private readonly fb: FormBuilder,
    private readonly backendService: BackendService,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {

  }

  cleanValue(): void {
    this.resourceName = "";
    this.clientData = [];
    this.reservation = {};
  }

  setDataByResponse(response): void {
    this.clientData = response.clients;
    this.reservation = response.reservation;
    this.devicesData = response.devices;
    const start_date = new Date(this.reservation['start_date']);
    const end_date = new Date(this.reservation['end_date']);
    this.reservation['startDateOutput'] = `${start_date.getFullYear()}-${start_date.getMonth() + 1}-${start_date.getDate()}`;
    this.reservation['endDateOutput'] = `${end_date.getFullYear()}-${end_date.getMonth() + 1}-${end_date.getDate()}`;
  }

  async open(accountId, propertyid, id): Promise<void> {
    this.clientList = [];
    this.accountId = accountId;
    this.propertyid = propertyid;
    this.itemId = id;
    this.isLoading = true;
    this.isVisible = true;
    this.cleanValue();
    try {
      const request = forkJoin({
        reservation: this.backendService.getAccountPropertyReservations(this.accountId, this.propertyid, this.itemId),
        clients: this.backendService.getReservationClients(this.accountId, this.propertyid, this.itemId),
        devices: this.backendService.getDevice(this.accountId, this.propertyid),
      });
      const response: any = await firstValueFrom(request);
      const responseBody: any = {
        reservation: response.reservation.body,
        clients: response.clients.body,
        devices: response.devices.body,
      };
      const requestResource = this.backendService.getAccountPropertyResources(this.accountId, this.propertyid, responseBody.reservation.resource_id);
      const responseResource: any = await firstValueFrom(requestResource);
      responseBody.resource = responseResource.body;
      this.resource = responseResource.body;
      this.resourceName = this.resource.name;
      this.clientList = responseBody.clients.flatMap(element => {
        if (!element) {
          return [];
        } else {
          return [element];
        }
      });
      this.backendService.getPropertyResourcesLock(this.accountId, this.propertyid, responseBody.reservation.resource_id).subscribe( (response: any) => {
        this.disabledOpenDoor = response.body.status !== "Closed";
      });
      this.setDataByResponse(responseBody);
    } catch (e) {
      this.isVisible = false;
      console.log(e);
    }
    this.isLoading = false;
  }

  close(): void {
    this.isVisible = false;
  }

  onClickResource() {
    this.router.navigate(['account', this.accountId, 'property', this.propertyid, 'resource', 'detail', this.resource.id]);
  }

  onDetailClick() {
    this.router.navigate(['reservation', "account", this.accountId, 'property', this.propertyid, 'detail', this.itemId]);
  }

  onOpenDoorClick(): void {
    if (this.disabledOpenDoor) {
      return;
    }
    this.nameResourceOpenDoorInput = "";
    this.isVisibleModalOpenDoor = true;
  }

  closeModalOpenDoor(): void {
    this.isVisibleModalOpenDoor = false;
  }

  isDisabledAcceptOpenDoor(): boolean {
    return this.nameResource !== this.nameResourceOpenDoorInput;
  }

  acceptModalOpenDoor() {
    if (this.isDisabledAcceptOpenDoor()) {
      return;
    }
    this.backendService.postPropertyResourcesLock(this.accountId, this.propertyid, this.itemId, {status: 'Opened'});
    this.isVisibleModalOpenDoor = false;
  }

  async printKey(data): Promise<void> {
    const request = this.backendService.postKeyCutter(this.accountId, this.propertyid, data.id, { reservation_id: this.itemId });
    /*await firstValueFrom(request);*/
  }
}
