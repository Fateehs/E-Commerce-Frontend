import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteShoppingDialogComponent } from './complete-shopping-dialog.component';

describe('CompleteShoppingDialogComponent', () => {
  let component: CompleteShoppingDialogComponent;
  let fixture: ComponentFixture<CompleteShoppingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteShoppingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteShoppingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
