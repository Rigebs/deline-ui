import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlnSelect } from './dln-select';

describe('DlnSelect', () => {
  let component: DlnSelect;
  let fixture: ComponentFixture<DlnSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlnSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DlnSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
