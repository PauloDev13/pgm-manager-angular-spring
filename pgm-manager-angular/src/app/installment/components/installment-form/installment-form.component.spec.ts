import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentFormComponent } from './installment-form.component';

describe('InstallmentFormComponent', () => {
  let component: InstallmentFormComponent;
  let fixture: ComponentFixture<InstallmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallmentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstallmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
