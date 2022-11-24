import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-guest-coming-slide',
  templateUrl: './guest-coming-slide.component.html',
  styleUrls: ['./guest-coming-slide.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GuestComingSlideComponent implements OnInit {

  isVisible = false;
  title: string;
  isLoading = false;
  dataSet = [
    {
      id: 1,
      name: 'John Brown',
      totalGuest: '2',
      checkIn: '12:40',
    },
    {
      id: 2,
      name: 'Jim Green',
      totalGuest: '4',
      checkIn: '12:40',
    },
    {
      id: 3,
      name: 'Joe Black',
      totalGuest: '3',
      checkIn: '17:30',
    },
    {
      id: 3,
      name: 'Joe Black',
      totalGuest: '3',
      checkIn: '17:30',
    },
    {
      id: 3,
      name: 'Joe Black',
      totalGuest: '3',
      checkIn: '17:30',
    },
    {
      id: 3,
      name: 'Joe Black',
      totalGuest: '3',
      checkIn: '17:30',
    },
  ]

  @Output() modifyItemEvent = new EventEmitter<any>();

  ngOnInit(): void {
  }

  async open(): Promise<void> {
    this.isLoading = true;
    this.isVisible = true;
    this.isLoading = false;
  }

  close(): void {
    this.isVisible = false;
  }

}
