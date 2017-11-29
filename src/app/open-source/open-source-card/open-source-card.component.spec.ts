import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSourceCardComponent } from './open-source-card.component';

describe('OpenSourceCardComponent', () => {
  let component: OpenSourceCardComponent;
  let fixture: ComponentFixture<OpenSourceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenSourceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSourceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
