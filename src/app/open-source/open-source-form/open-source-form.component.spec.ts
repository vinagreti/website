import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSourceFormComponent } from './open-source-form.component';

describe('OpenSourceFormComponent', () => {
  let component: OpenSourceFormComponent;
  let fixture: ComponentFixture<OpenSourceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenSourceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
