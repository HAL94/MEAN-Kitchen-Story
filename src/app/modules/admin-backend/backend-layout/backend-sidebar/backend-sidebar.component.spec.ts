import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendSidebarComponent } from './backend-sidebar.component';

describe('SidebarComponent', () => {
  let component: BackendSidebarComponent;
  let fixture: ComponentFixture<BackendSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
