import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskFilter {
  private _$filter: WritableSignal<string> = signal('all');
  $filter: Signal<string> = this._$filter.asReadonly();

  setFilter(filter: string) {
    this._$filter.set(filter);
  }

  filterData(data: any[], filter: boolean, attribute: string) {
    const dataFitered = data.filter(x => x[attribute] === filter);
    return dataFitered;
  }
}
