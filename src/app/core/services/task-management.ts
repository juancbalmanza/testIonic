import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StorageManagement } from './storage-management';

@Injectable({
  providedIn: 'root',
})
export class TaskManagement {
  constructor(private storageList: StorageManagement) {

  }

  public async setTask() {
    await this.storageList?.set('task', [{
      id: 1,
      title: 'test',
      description: 'test',
      completed: true
    }]);
  }
}
