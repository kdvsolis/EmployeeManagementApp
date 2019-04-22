import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddTimeComponent } from './employee-add-time.component';

describe('EmployeeAddTimeComponent', () => {
  let component: EmployeeAddTimeComponent;
  let fixture: ComponentFixture<EmployeeAddTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
