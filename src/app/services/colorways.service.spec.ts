import { TestBed } from '@angular/core/testing';

import { ColorwaysService } from './colorways.service';

describe('ColorwaysService', () => {
  let service: ColorwaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorwaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
