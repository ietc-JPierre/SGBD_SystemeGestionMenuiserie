import { TestBed } from '@angular/core/testing';

import { CommandeProduit } from './commande-produit';

describe('CommandeProduit', () => {
  let service: CommandeProduit;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandeProduit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
