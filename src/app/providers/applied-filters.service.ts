import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppliedFiltersService {
  @Output() onAppliedFilters: EventEmitter<any[]> = new EventEmitter();

  constructor() { }

  sendFilters(filters: any[]) {
    this.onAppliedFilters.emit(filters);
  }

}
