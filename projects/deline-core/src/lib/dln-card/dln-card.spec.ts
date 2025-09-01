import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlnCard } from './dln-card';

describe('DlnCard', () => {
  let component: DlnCard;
  let fixture: ComponentFixture<DlnCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlnCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DlnCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
