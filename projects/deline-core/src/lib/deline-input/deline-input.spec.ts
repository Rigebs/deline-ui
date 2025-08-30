import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelineInput } from './deline-input';

describe('DelineInput', () => {
  let component: DelineInput;
  let fixture: ComponentFixture<DelineInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelineInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelineInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
