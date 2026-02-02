import { TestBed } from '@angular/core/testing';

import { PaginateData } from './paginate-data';

describe('PaginateData', () => {
  let service: PaginateData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginateData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
