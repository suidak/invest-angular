import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionDetailComponent } from './emission-detail.component';

describe('EmissionDetailComponent', () => {
  let component: EmissionDetailComponent;
  let fixture: ComponentFixture<EmissionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmissionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmissionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
