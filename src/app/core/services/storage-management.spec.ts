import { TestBed } from '@angular/core/testing';

import { StorageManagement } from './storage-management';

describe('StorageManagement', () => {
  let service: StorageManagement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageManagement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
