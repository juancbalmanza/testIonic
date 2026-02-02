import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageList {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
  }

  async init() {
    if (!this._storage) {
      const storage = await this.storage.create();
      this._storage = storage;
    }
  }

  public async get(key: string) {
    await this.init();
    const value = await this._storage?.get(key);
    return value;
  }
}
