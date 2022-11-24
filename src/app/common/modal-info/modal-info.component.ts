import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.sass']
})
export class ModalInfoComponent implements OnInit {

  @Input() isVisible = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Input() closable = true;
  @Input() title;
  @Input() content;
  @Input() iconType;
  @Input() iconTheme;
  @Input() iconTwotoneColor;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    console.log('close');
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

}
