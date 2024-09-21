import { Component, EventEmitter, Input, Output } from "@angular/core";
@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent {
  @Input() isLoading: boolean | null = false;
  @Input() currentPage: number = 0;
  @Output() currentPageChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() itemsPerPage= 10;
  @Output() onScroll: EventEmitter<any> = new EventEmitter<any>();

  onScrolling() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    this.currentPage++;
    this.currentPageChange.emit(this.currentPage);
    this.onScroll.emit();
  }
}
