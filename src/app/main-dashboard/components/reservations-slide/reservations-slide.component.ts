import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core'

@Component({
  selector: 'app-reservations-slide',
  templateUrl: './reservations-slide.component.html',
  styleUrls: ['./reservations-slide.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReservationsSlideComponent implements OnInit {
  isVisible = false
  title: string
  isLoading = false
  dataSet = [
    {
      id: 1,
      name: 'Mattia',
      surname: 'Cannavò',
      birthday: '20/08/1999',
      balance: '0,00€'
    },
    {
      id: 2,
      name: 'Jim',
      surname: 'Green',
      birthday: '23/12/2001',
      balance: '10,00€'
    },
    {
      id: 3,
      name: 'Joe',
      surname: 'Black',
      birthday: '14/08/1989',
      balance: '0,00€'
    }
  ]

  reservationData = [
    {
      label: 'Service',
      data: 'Stay'
    },
    {
      label: 'Confirmation number',
      data: '315'
    },
    {
      label: 'Group name',
      data: 'Cannavò'
    },
    {
      label: 'Arrival',
      data: '22/07/2022 13:00:00'
    },
    {
      label: 'Departure',
      data: '29/07/2022 13:00:00'
    },
    {
      label: 'Reservation purpose',
      data: 'work'
    },
    {
      label: 'Avg. rate (nightly)',
      data: '52,00 €'
    },
    {
      label: 'Requested category',
      data: 'medium studio'
    },
    {
      label: 'Space category',
      data: 'medium studio'
    },
    {
      label: 'Assigned space',
      data: '3C ONE'
    },
    {
      label: 'Rate',
      data: 'Special summer'
    },
    {
      label: 'Company',
      data: 'Seven islands studio'
    },
    {
      label: 'Created',
      data: '12/03/2022'
    },
    {
      label: 'Note',
      data: 'Tipo Cero. Producción Cinematográfica'
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

  @Output() modifyItemEvent = new EventEmitter<any>()

  ngOnInit (): void {}

  async open (): Promise<void> {
    this.isLoading = true
    this.isVisible = true
    this.isLoading = false
  }

  close (): void {
    this.isVisible = false
  }
}
