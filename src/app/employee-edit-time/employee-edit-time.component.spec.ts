import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEditTimeComponent } from './employee-edit-time.component';

describe('EmployeeEditTimeComponent', () => {
  let component: EmployeeEditTimeComponent;
  let fixture: ComponentFixture<EmployeeEditTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEditTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEditTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
