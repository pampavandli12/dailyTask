import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoreditcomponentComponent } from './addoreditcomponent.component';

describe('AddoreditcomponentComponent', () => {
  let component: AddoreditcomponentComponent;
  let fixture: ComponentFixture<AddoreditcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddoreditcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddoreditcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
