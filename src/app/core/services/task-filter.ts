import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskFilter {
  private _$filter: WritableSignal<string> = signal('all');
  $filter: Signal<string> = this._$filter.asReadonly();
  private _$filterCategory: WritableSignal<any> = signal(null);
  $filterCategory: Signal<any> = this._$filterCategory.asReadonly();

  setFilter(filter: string) {
    this._$filter.set(filter);
  }

  setFilterCategory(filter: any) {
    this._$filterCategory.set(filter);
  }

  filterData(data: any[], filter: boolean | any, attribute: string) {
    const dataFitered = data.filter(x => x[attribute] === filter);
    return dataFitered;
  }
}
