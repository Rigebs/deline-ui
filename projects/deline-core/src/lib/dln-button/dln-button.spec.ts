import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlnButton } from './dln-button';

describe('DlnButton', () => {
  let component: DlnButton;
  let fixture: ComponentFixture<DlnButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlnButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DlnButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
