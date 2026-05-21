import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientChantiers } from './client-chantiers';

describe('ClientChantiers', () => {
  let component: ClientChantiers;
  let fixture: ComponentFixture<ClientChantiers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientChantiers],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientChantiers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
