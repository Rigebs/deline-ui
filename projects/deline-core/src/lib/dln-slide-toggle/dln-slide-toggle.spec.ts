import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlnSlideToggle } from './dln-slide-toggle';

describe('DlnSlideToggle', () => {
  let component: DlnSlideToggle;
  let fixture: ComponentFixture<DlnSlideToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlnSlideToggle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DlnSlideToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
