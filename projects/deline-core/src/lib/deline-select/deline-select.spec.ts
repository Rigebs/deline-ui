import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelineSelect } from './deline-select';

describe('DelineSelect', () => {
  let component: DelineSelect;
  let fixture: ComponentFixture<DelineSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelineSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelineSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
