import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAnuncioComponent } from './top-anuncio.component';

describe('TopAnuncioComponent', () => {
  let component: TopAnuncioComponent;
  let fixture: ComponentFixture<TopAnuncioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopAnuncioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
