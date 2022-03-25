import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailStagiaireComponent } from './detail-stagiaire.component';

describe('DetailStagiaireComponent', () => {
  let component: DetailStagiaireComponent;
  let fixture: ComponentFixture<DetailStagiaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailStagiaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailStagiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
