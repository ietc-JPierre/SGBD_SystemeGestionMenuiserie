import { TestBed } from '@angular/core/testing';

import { CodePostal } from './code-postal';

describe('CodePostal', () => {
  let service: CodePostal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodePostal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
