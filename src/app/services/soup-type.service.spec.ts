import { TestBed } from '@angular/core/testing';

import { SoupTypeService } from './soup-type.service';

describe('SoupTypeService', () => {
  let service: SoupTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoupTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
