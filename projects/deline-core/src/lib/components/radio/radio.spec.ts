import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Radio, RadioGroupComponent } from './radio';

@Component({
  template: '<dln-radio-group><dln-radio value="a" label="Option A"></dln-radio></dln-radio-group>',
  imports: [RadioGroupComponent, Radio],
  standalone: true,
})
class TestHost {}

describe('Radio', () => {
  let component: TestHost;
  let fixture: ComponentFixture<TestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
