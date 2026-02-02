import { Injectable, signal, WritableSignal } from '@angular/core';
import { Category } from '../models/category.model';
import { StorageManagement } from './storage-management';

@Injectable({
  providedIn: 'root',
})
export class CategoryManagement {
  private readonly _$categorySelected: WritableSignal<Category | null> = signal(null);
  readonly $categorySelected = this._$categorySelected.asReadonly();
  categoryTemp: WritableSignal<Category | null> = signal(null);

  constructor(private storage: StorageManagement) { }

  public async setCategory(categories: Category[]) {
    await this.storage?.set('category', categories);
    this._$categorySelected.set(null);
  }

  public async updateCategory(categories: Category[], category: Category) {
    const result = this.setData(categories, category, false);
    await this.storage?.set('category', result);
    this.setCategorySelected(signal(null));
  }

  public async deleteCategory(categories: Category[], category: Category) {
    const result = this.setData(categories, category, true);
    await this.storage?.set('category', result);
    this.setCategorySelected(signal(null));
  }

  public setCategorySelected(category: WritableSignal<Category | null>) {
    this.categoryTemp.update(av => (av ? { ...av!!, selected: false } : null));
    if (category()) category.update(av => ({ ...av!!, selected: true }));
    this.categoryTemp = category;
    this._$categorySelected.set(category()!!);
  }

  setData(categories: Category[], category: Category, deleteCategory: boolean ) {
    const categoryResult = categories.find(x => x.id === category.id);
    const index = categories.indexOf(categoryResult!!);
    deleteCategory ? categories.splice(index, 1) : categories[index] = { ...categories[index], ...category }; 
    return categories;
  }
}
