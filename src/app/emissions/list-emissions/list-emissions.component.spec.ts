import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmissionsComponent } from './list-emissions.component';

describe('ListEmissionsComponent', () => {
  let component: ListEmissionsComponent;
  let fixture: ComponentFixture<ListEmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
