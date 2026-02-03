import { TestBed } from '@angular/core/testing';

import { FirebaseRemoteConfig } from './firebase-remote-config';

describe('FirebaseRemoteConfig', () => {
  let service: FirebaseRemoteConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseRemoteConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
