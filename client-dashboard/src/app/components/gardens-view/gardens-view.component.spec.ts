import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardensViewComponent } from './gardens-view.component';

describe('GardensViewComponent', () => {
  let component: GardensViewComponent;
  let fixture: ComponentFixture<GardensViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardensViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GardensViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
