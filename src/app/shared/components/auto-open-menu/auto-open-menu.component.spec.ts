import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoOpenMenuComponent } from './auto-open-menu.component';

describe('AutoOpenMenuComponent', () => {
  let component: AutoOpenMenuComponent;
  let fixture: ComponentFixture<AutoOpenMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoOpenMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoOpenMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
