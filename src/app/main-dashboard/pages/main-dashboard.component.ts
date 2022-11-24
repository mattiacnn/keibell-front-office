import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core'
import { GuestComingSlideComponent } from '../components/guest-coming-slide/guest-coming-slide.component'
import { ReservationsSlideComponent } from '../components/reservations-slide/reservations-slide.component'

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {

  @ViewChild(GuestComingSlideComponent)
  guestComingSlideComponent: GuestComingSlideComponent

  @ViewChild(ReservationsSlideComponent)
  reservationsSlideComponent: ReservationsSlideComponent

  // chart diagram data
  public piedata: Object[]
  public piedata2: Object[]
  public legendSettings: Object
  public datalabel: Object
  public palette: string[]

  constructor () {}

  initiGraphsData (): void {
    this.datalabel = { visible: true, position: 'Outside' }
    this.palette = [
      '#70F1B9',
      '#000000d9',
      '#F9C151',
      '#F57408',
      '#228B22',
      '#3399FF'
    ]

    this.piedata = [
      { x: 'Cleaned', y: 3, text: 'Cleaned' },
      { x: 'Dirty', y: 3, text: 'Dirty' },
      { x: 'Inspected', y: 7, text: 'Inspected' }
    ]

    this.piedata2 = [
      { x: 'Check-in online', y: 3, text: 'Cleaned' },
      { x: 'Check-in offline', y: 5, text: 'Dirty' },
      { x: 'Check-out online', y: 1, text: 'Dirty' },
      { x: 'Check-out offline', y: 2, text: 'Dirty' },


    ]
    this.legendSettings = {
      visible: true
    }
  }

  modifyItemEvent () {
    this.guestComingSlideComponent.open()
  }

  openReservationsSlide () {
    this.reservationsSlideComponent.open()
  }

  ngOnInit (): void {
    this.initiGraphsData()
  }
}
