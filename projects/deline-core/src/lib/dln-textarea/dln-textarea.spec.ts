import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlnTextarea } from './dln-textarea';

describe('DlnTextarea', () => {
  let component: DlnTextarea;
  let fixture: ComponentFixture<DlnTextarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlnTextarea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DlnTextarea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
