import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginateData {
  private page = 0;
  private readonly PAGE_SIZE = 10;

  loadData(data: any[]) {
    if (data.length === 0) return [];
    const start = this.page * this.PAGE_SIZE;
    const end = start + this.PAGE_SIZE;
    this.page++;
    return data.slice(start, end);
  }

  setPage(value: number) {
    this.page = value;
  }
}
