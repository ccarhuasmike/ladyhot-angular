import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeinicialComponent } from './homeinicial.component';

describe('HomeinicialComponent', () => {
  let component: HomeinicialComponent;
  let fixture: ComponentFixture<HomeinicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeinicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeinicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
