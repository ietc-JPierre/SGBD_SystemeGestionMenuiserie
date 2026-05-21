import { TestBed } from '@angular/core/testing';

import { Dimension } from './dimension';

describe('Dimension', () => {
  let service: Dimension;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dimension);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
