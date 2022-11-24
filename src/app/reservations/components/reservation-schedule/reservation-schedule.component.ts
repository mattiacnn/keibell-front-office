import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  ActionEventArgs,
  EventRenderedArgs,
  EventSettingsModel,
  GroupModel, PopupOpenEventArgs, RenderCellEventArgs, ScheduleComponent,
  View
} from "@syncfusion/ej2-angular-schedule";
import {firstValueFrom, forkJoin, lastValueFrom} from "rxjs";
import {BackendService} from "src/app/services/backend.service";
import {ReservationSlideComponent} from "../reservation-slide/reservation-slide.component";

@Component({
  selector: 'app-reservation-schedule',
  templateUrl: './reservation-schedule.component.html',
  styleUrls: ['./reservation-schedule.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ReservationScheduleComponent implements OnInit {

  readonly RESERVATION_COLORS =  {
    Confirmed: "#d7ab17",
    Started: "#17d7c8",
    Processed: "#88d717",
  }

  @Input() accountId = null;
  @Input() propertyId = null;

  @Output() eventEmitter = new EventEmitter<{type: string, value: any}>();

  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;
  @ViewChild(ReservationSlideComponent) reservationSlideComponent: ReservationSlideComponent;

  resourceDataSource: Record<string, any>[] = [];
  currentView: View = 'TimelineMonth';
  group: GroupModel = {
    enableCompactView: false,
    resources: ['MeetingRoom']
  };
  workDays: number[] = [1, 2, 3, 4, 5];
  data: any = [];
  eventSettings: EventSettingsModel = {
    dataSource: [],
    fields: {
      id: 'id',
      subject: {title: 'Summary', name: 'Subject'},
      location: {title: 'Location', name: 'Location'},
      description: {title: 'Comments', name: 'Description'},
      startTime: {title: 'From', name: 'StartTime'},
      endTime: {title: 'To', name: 'EndTime'}
    },
    allowAdding: false,
    allowEditing: false,
    allowDeleting: false,
  };
  cellWidth = 200;
  cellHeight = 60;
  allowMultiple = true;

  constructor(
    private readonly backendService: BackendService,
  ) { }

  ngOnInit(): void {
    this.changeSizeCells();
  }

  async chargeData(): Promise<void> {
    const dataForkJoin = forkJoin([this.loadResources(), this.loadReservations()]);
    await lastValueFrom(dataForkJoin)
  }

  async loadReservations(): Promise<void> {
    const datesView = this.scheduleObj.getCurrentViewDates();
    const firstDateView = datesView[0];
    const lastDayView = datesView[datesView.length - 1];
    const q = {
      op: "OR",
      terms: [
        {
          op: "BETWEEN",
          field: "start_date",
          values: [
            `${firstDateView.getFullYear()}-${firstDateView.getMonth() + 1}-${firstDateView.getDate()}`,
            `${lastDayView.getFullYear()}-${lastDayView.getMonth() + 1}-${lastDayView.getDate()}`,
          ]
        },
        {
          op: "BETWEEN",
          field: "end_date",
          values: [
            `${firstDateView.getFullYear()}-${firstDateView.getMonth() + 1}-${firstDateView.getDate()}`,
            `${lastDayView.getFullYear()}-${lastDayView.getMonth() + 1}-${lastDayView.getDate()}`,
          ]
        },
      ]
    }
    try {
      const request = this.backendService.getAccountPropertyReservations(
        this.accountId,
        this.propertyId,
        null,
        {
          q: JSON.stringify(q),
        }
      );
      const response: any = await firstValueFrom(request);
      const responseBody = response.body;
      this.data = responseBody.map((element: any) => {
        const newElement: any = {
          id: element.id,
          customer_surname: element.customer_surname,
          StartTime: new Date(element.start_date),
          EndTime: new Date(element.end_date),
          RoomId: element.pms_resource_id,
          status: element.status,
        };
        return newElement;
      });
      console.log(this.data);
      this.eventSettings = {...this.eventSettings, dataSource: this.data};
    } catch (e) {

    }
  }

  async loadResources(): Promise<void> {
    try {
      const request = this.backendService.getAccountPropertyResources(this.accountId, this.propertyId);
      const response: any = await firstValueFrom(request);
      const responseBody = response.body;
      this.resourceDataSource = responseBody.map((element: any) => {
        const newElement: any = {
          name: element.name,
          id: element.pms_resource_id,
          category: element.categories[0]['en-US'],
        };
        return newElement;
      });
    } catch (e) {

    }
  }

  public async onActionBegin(args: ActionEventArgs): Promise<void> {
  }

  public onRenderCell(args: RenderCellEventArgs): void {
    if (args.elementType === 'emptyCells' && args.element.classList.contains('e-resource-left-td')) {
      const target: HTMLElement = args.element.querySelector('.e-resource-text') as HTMLElement;
    }
  }

  public async onActionComplete(args: ActionEventArgs): Promise<void> {
    switch (args.requestType) {
      case 'dateNavigate':
        this.eventEmitter.emit({type:'dateNavigateStart', value: null});
        await this.loadReservations();
        this.eventEmitter.emit({type: 'dateNavigateFinish',value: null})
        break;
    }
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    const appointmentElement =
      args.target.classList.contains('e-appointment');
    if ((args.type === 'QuickInfo' || args.type === 'Editor')) {
      args.cancel = true;
    }
    if (appointmentElement) {
      this.reservationSlideComponent.open(this.accountId, this.propertyId, args.data.id);
    }
  }

  public onEventRendered(args: EventRenderedArgs): void {
    const height = this.cellHeight - 20;
    const starTime = args.data.StartTime as Date;
    const endTime = args.data.EndTime as Date;
    const element = args.element;
    const monthView = this.scheduleObj.getCurrentViewDates()[0].getMonth();
    let leftStylePixel: number;
    let widthStylePixel: number;
    if (endTime.getMonth() !== monthView) {
      const lastDay = new Date(starTime.getFullYear(), monthView + 1, 0);
      widthStylePixel = (lastDay.getDate() - starTime.getDate()) * (this.cellWidth) + (this.cellWidth / 2) - 20;
    } else if (starTime.getMonth() !== monthView) {
      widthStylePixel = endTime.getDate() * this.cellWidth - (this.cellWidth / 2) - 3;
      element.style.borderRight = '1px solid #000000';
    } else {
      widthStylePixel = (endTime.getDate() - starTime.getDate()) * (this.cellWidth) - 3;
      element.style.borderRight = '1px solid #000000';
    }
    if (starTime.getMonth() !== monthView) {
      leftStylePixel = 3;
    } else {
      leftStylePixel = (starTime.getDate() - 1) * this.cellWidth + (this.cellWidth / 2) + 3;
      element.style.borderLeft = '1px solid #000000';
    }
    element.style.height = `${height}px`;
    element.style.borderRadius = '3px';
    element.style.color = '#000000';
    element.style.borderTop = '1px solid #000000';
    element.style.borderBottom = '1px solid #000000';
    element.style.lineHeight = '0';
    element.style.left = `${leftStylePixel}px`;
    element.style.width = `${widthStylePixel}px`;

    const resourceIndex = this.resourceDataSource.findIndex((element) => {
      return element.id == args.data.RoomId;
    });
    element.style.top = `${this.cellHeight * resourceIndex + (this.cellHeight / 2 - (height / 2))}px`;

    element.style.backgroundColor = this.RESERVATION_COLORS[args.data.status] || 'rgba(204, 204, 204, .6)';
  }

  changeSizeCells() {
    document.documentElement.style.setProperty("--reservation-browse-cells-width", `${this.cellWidth}px`);
    document.documentElement.style.setProperty("--reservation-browse-cells-height", `${this.cellHeight}px`);
  }

}
