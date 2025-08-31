import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlnRadioButton } from './dln-radio-button';

describe('DlnRadioButton', () => {
  let component: DlnRadioButton;
  let fixture: ComponentFixture<DlnRadioButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlnRadioButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DlnRadioButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
