import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToDoTask } from '../models/to-do-task.model';
import { StorageList } from './storage-list';

@Injectable({
  providedIn: 'root',
})
export class TaskList {
  private _$tasks: WritableSignal<ToDoTask[]> = signal([]);
  $tasks: Signal<ToDoTask[]> = this._$tasks.asReadonly();

  constructor(private storageList: StorageList) { }

  public async getTask() {
    const value = await this.storageList?.get('task');
    const orderId = value.sort((a: any, b: any) => b.id - a.id);
    const orderCompleted = orderId.sort((a: any, b: any) => Number(a.completed) - Number(b.completed));
    this._$tasks.set(orderCompleted ?? []);
  }
}
