import {Component, ViewChild, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BackendService} from "src/app/services/backend.service";
import {firstValueFrom} from "rxjs";
import {ReservationScheduleComponent} from "../../components/reservation-schedule/reservation-schedule.component";
import {GlobalVariablesService} from "../../../services/global-variables.service";


@Component({
  selector: 'app-reservations-browser',
  templateUrl: './reservations-browser.component.html',
  styleUrls: ['./reservations-browser.component.css'],
  providers: []
})
export class ReservationsBrowserComponent implements OnInit, AfterViewInit, OnDestroy {

  data: any = [];
  accountsList: any[] = [];
  accountSelected = null;
  propertiesList = [];
  propertySelected = null;
  loading = false;

  @ViewChild(ReservationScheduleComponent) reservationScheduleComponent: ReservationScheduleComponent;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly backendService: BackendService,
    private readonly globalVariablesService: GlobalVariablesService,
  ) {
  }


  ngOnInit(): void {
    this.accountsList = this.activatedRoute.snapshot.data.accountList?.body;
  }

  ngOnDestroy() {
    this.globalVariablesService.reservationBrowserStatus = {
      accountSelected: this.accountSelected,
      propertySelected: this.propertySelected,
    };
  }

  async initWithStatus(): Promise<void> {
    const reservationBrowserStatus = this.globalVariablesService.reservationBrowserStatus;
    if (reservationBrowserStatus && reservationBrowserStatus.accountSelected) {
      this.accountSelected = this.globalVariablesService.reservationBrowserStatus.accountSelected;
      await this.accountSelectedChangeEvent();
      if (reservationBrowserStatus.propertySelected) {
        this.propertySelected = reservationBrowserStatus.propertySelected;
        this.propertySelectedChangeEvent();
      }
    }
  }

  ngAfterViewInit(): void {
    this.initWithStatus().then();
  }

  async accountSelectedChangeEvent(): Promise<void> {
    this.loading = true;
    this.propertySelected = null;
    this.data = [];
    await this.loadAccountData();
    this.loading = false;
  }

  async loadAccountData(): Promise<void> {
    try {
      const request = this.backendService.getAccountProperties(this.accountSelected);
      const response: any = await firstValueFrom(request);
      this.propertiesList = response.body;
    } catch (e) {
      console.log(e);
    }
  }

  async propertySelectedChangeEvent(): Promise<void> {
    this.loading = true;
    this.reservationScheduleComponent.propertyId = this.propertySelected;
    this.reservationScheduleComponent.accountId = this.accountSelected;
    await this.reservationScheduleComponent.chargeData();
    this.loading = false;
  }

  async reservationScheduleEvent(event: {type: string, value: any}): Promise<void> {
    switch (event.type) {
      case 'dateNavigateStart':
        this.loading = true;
        break;
      case 'dateNavigateFinish':
        this.loading = false;
        break;
    }
  }

}
