import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardensListComponent } from './gardens-list.component';

describe('GardensListComponent', () => {
  let component: GardensListComponent;
  let fixture: ComponentFixture<GardensListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardensListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GardensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
