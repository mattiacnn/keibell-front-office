import {Component, Input, OnInit, Output, ViewEncapsulation, EventEmitter} from '@angular/core';

export interface IButtonsHeaders {
  type: string;
  eventEmitter: EventEmitter<any>;
  cssClass: 'e-primary' | 'e-danger';
  nzTypeIcon: string;
  needCheckItem?: boolean,
  needOnlyOneCheckItem?: boolean
}

export interface IUpdatePaginationEvent {
  pageSize: number;
  pageIndex: number;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {

  @Input() data: any[] = [];
  @Input() nameVariableId = "id";
  @Input() headers = [];
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [
    {
      label: "5",
      value: 5
    },
    {
      label: "10",
      value: 10
    },
    {
      label: "15",
      value: 15
    },
    {
      label: "20",
      value: 20
    },
  ]
  totalItems = 0;
  @Input() paginationIndex = 0;
  @Input() loading = false;
  @Input() canCheckAll = false;
  @Input() canCheckItem = false;
  @Input() clickItemEventAviable = false;
  checkedList = [];
  @Input() buttonsHeader: IButtonsHeaders[] = [];
  totalPages = 0;
  paginationOptions = [];
  @Input('showPagination') showPagination = true;
  @Input('removeToolbar') removeToolbar = false;
  @Input('boxShadowContainer') boxShadowContainer = true;

  @Output() clickItemEvent = new EventEmitter<any>();
  @Output() loadingChange = new EventEmitter<boolean>();
  @Output() updatePaginationEvent = new EventEmitter<IUpdatePaginationEvent>();


  constructor() {
  }

  ngOnInit(): void {

  }

  private getUpdatePaginationEvent(): IUpdatePaginationEvent {
    return {
      pageIndex: this.paginationIndex,
      pageSize: this.pageSize,
    };
  }

  changePageSizeEvent(event): void {
    this.updatePagination();
    this.updatePaginationEvent.emit(this.getUpdatePaginationEvent());
  }

  changePageIndexEvent(event): void {
    this.updatePagination();
    this.updatePaginationEvent.emit(this.getUpdatePaginationEvent());
  }

  updatePagination() {
    const newPaginationOptions = [];
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    let startRange = 1;
    for (let i = 0; i < this.totalPages; i++) {
      let endRange = startRange + this.pageSize - 1;
      endRange = endRange > this.totalItems ? this.totalItems : endRange;
      newPaginationOptions.push(`${startRange}-${endRange}`);
      startRange += this.pageSize;
    }
    this.paginationOptions = newPaginationOptions;
  }

  nextPage(): void {
    if ((this.paginationIndex + 1) >= this.totalPages) {
      return;
    }
    this.paginationIndex++;
    this.updatePaginationEvent.emit(this.getUpdatePaginationEvent());
  }

  previousPage(): void {
    if (this.paginationIndex <= 0) {
      return;
    }
    this.paginationIndex--;
    this.updatePaginationEvent.emit(this.getUpdatePaginationEvent());
  }

  onClickItem(item) {
    if (!this.clickItemEventAviable) {
      return false;
    }
    this.clickItemEvent.emit(item);
  }

  clickButtonHeader(button: IButtonsHeaders) {
    button.eventEmitter.emit({
      type: button.type,
      chekedList: this.checkedList,
    });
  }

  onCheckItem(item, value: boolean): void {
    if (value) {
      this.checkedList = [...this.checkedList, item[this.nameVariableId]];
    } else {
      let index = -1;
      this.checkedList.find((element, i) => {
        if (element == item[this.nameVariableId]) {
          index = i;
          return true;
        }
        return false;
      });
      if (index > -1) {
        this.checkedList.splice(index, 1);
      }
    }
  }

  isDisableButtonHeader(button: IButtonsHeaders) {
    if (button.needOnlyOneCheckItem) {
      return this.checkedList.length == 0 || this.checkedList.length > 1;
    }
    if (button.needCheckItem) {
      return this.checkedList.length == 0;
    }
    return false;
  }

  isChekedItem(item) {
    const result = this.checkedList.find((element) => {
      return element == item[this.nameVariableId];
    });
    return result;
  }

  transformPagination2HttpParams() {
    return {
      skip: this.pageSize * this.paginationIndex,
      limit: this.pageSize,
    };
  }

}
