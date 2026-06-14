import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Accordion, AccordionPanel } from './accordion';

@Component({
  template: '<dln-accordion><dln-accordion-panel header="Test"><p>Content</p></dln-accordion-panel></dln-accordion>',
  imports: [Accordion, AccordionPanel],
  standalone: true,
})
class TestHost {}

describe('Accordion', () => {
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
