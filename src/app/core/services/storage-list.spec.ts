import { TestBed } from '@angular/core/testing';

import { StorageList } from './storage-list';

describe('StorageList', () => {
  let service: StorageList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
