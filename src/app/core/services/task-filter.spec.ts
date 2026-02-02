import { TestBed } from '@angular/core/testing';

import { TaskFilter } from './task-filter';

describe('TaskFilter', () => {
  let service: TaskFilter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskFilter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
