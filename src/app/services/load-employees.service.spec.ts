import { TestBed } from '@angular/core/testing';

import { LoadEmployeesService } from './load-employees.service';

describe('LoadEmployeesService', () => {
  let service: LoadEmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadEmployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
