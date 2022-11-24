import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core'

@Component({
  selector: 'single-conversation',
  templateUrl: './single-conversation.component.html',
  styleUrls: ['./single-conversation.component.css']
})
export class SingleConversation implements OnInit {
  guests = [
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
  ngOnInit (): void {}
}
