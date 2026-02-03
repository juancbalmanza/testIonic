import { Injectable } from '@angular/core';
import { fetchAndActivate, getValue, RemoteConfig } from '@angular/fire/remote-config';

@Injectable({
  providedIn: 'root',
})
export class FirebaseRemoteConfig {
  constructor(private remoteConfig: RemoteConfig) {}

  async init() {
    try {
      await fetchAndActivate(this.remoteConfig);
    } catch (error) {
      console.error('Error en esta parte del init', error);
    }
  }

  getString(key: string): string {
    return getValue(this.remoteConfig, key).asString();
  }

  getBoolean(key: string): boolean {
    return getValue(this.remoteConfig, key).asBoolean();
  }
}
