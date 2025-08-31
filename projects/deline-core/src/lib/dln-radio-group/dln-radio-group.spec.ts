import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlnRadioGroup } from './dln-radio-group';

describe('DlnRadioGroup', () => {
  let component: DlnRadioGroup;
  let fixture: ComponentFixture<DlnRadioGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlnRadioGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DlnRadioGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
