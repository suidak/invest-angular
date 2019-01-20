import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionAddComponent } from './emission-add.component';

describe('EmissionAddComponent', () => {
  let component: EmissionAddComponent;
  let fixture: ComponentFixture<EmissionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmissionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmissionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
