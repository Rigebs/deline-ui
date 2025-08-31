import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlnInput } from './dln-input';

describe('DlnInput', () => {
  let component: DlnInput;
  let fixture: ComponentFixture<DlnInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlnInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DlnInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
