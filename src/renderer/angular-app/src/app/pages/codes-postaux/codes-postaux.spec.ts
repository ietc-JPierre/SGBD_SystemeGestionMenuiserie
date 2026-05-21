import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodesPostaux } from './codes-postaux';

describe('CodesPostaux', () => {
  let component: CodesPostaux;
  let fixture: ComponentFixture<CodesPostaux>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodesPostaux],
    }).compileComponents();

    fixture = TestBed.createComponent(CodesPostaux);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
