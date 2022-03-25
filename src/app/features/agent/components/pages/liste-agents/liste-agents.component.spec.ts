import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAgentsComponent } from './liste-agents.component';

describe('ListeAgentsComponent', () => {
  let component: ListeAgentsComponent;
  let fixture: ComponentFixture<ListeAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
