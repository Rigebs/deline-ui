import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlnCheckbox } from './dln-checkbox';

describe('DlnCheckbox', () => {
  let component: DlnCheckbox;
  let fixture: ComponentFixture<DlnCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlnCheckbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DlnCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
