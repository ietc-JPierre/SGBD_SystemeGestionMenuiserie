import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelCommandes } from './personnel-commandes';

describe('PersonnelCommandes', () => {
  let component: PersonnelCommandes;
  let fixture: ComponentFixture<PersonnelCommandes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnelCommandes],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonnelCommandes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
