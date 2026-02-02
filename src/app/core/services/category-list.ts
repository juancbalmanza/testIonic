import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Category } from '../models/category.model';
import { StorageList } from './storage-list';

@Injectable({
  providedIn: 'root',
})
export class CategoryList {
  private _$categories: WritableSignal<Category[]> = signal([]);
  $categories: Signal<Category[]> = this._$categories.asReadonly();

  constructor(private storageList: StorageList) { }

  public async getCategory() {
    const value = await this.storageList?.get('category');
    const orderName = value?.sort((a: any, b: any) => a.name - b.name);
    this._$categories.set(orderName ?? []);
  }
}
