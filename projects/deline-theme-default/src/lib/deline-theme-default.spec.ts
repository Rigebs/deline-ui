import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelineThemeDefault } from './deline-theme-default';

describe('DelineThemeDefault', () => {
  let component: DelineThemeDefault;
  let fixture: ComponentFixture<DelineThemeDefault>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelineThemeDefault]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelineThemeDefault);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
