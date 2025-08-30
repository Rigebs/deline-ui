import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelineButton } from './deline-button';

describe('DelineButton', () => {
  let component: DelineButton;
  let fixture: ComponentFixture<DelineButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelineButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelineButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
