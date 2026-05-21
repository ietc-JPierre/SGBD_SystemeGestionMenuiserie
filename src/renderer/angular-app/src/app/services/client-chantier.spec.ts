import { TestBed } from '@angular/core/testing';

import { ClientChantier } from './client-chantier';

describe('ClientChantier', () => {
  let service: ClientChantier;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientChantier);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
