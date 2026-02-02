import { TestBed } from '@angular/core/testing';

import { CategoryList } from './category-list';

describe('CategoryList', () => {
  let service: CategoryList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
