import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirAutomaticoComponent } from './subir-automatico.component';

describe('SubirAutomaticoComponent', () => {
  let component: SubirAutomaticoComponent;
  let fixture: ComponentFixture<SubirAutomaticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirAutomaticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirAutomaticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
