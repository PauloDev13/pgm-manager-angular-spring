import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifierSnackbarComponent } from './notifier-snackbar.component';

describe('NotifierSnackbarComponent', () => {
  let component: NotifierSnackbarComponent;
  let fixture: ComponentFixture<NotifierSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotifierSnackbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotifierSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
