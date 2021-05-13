import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapesListComponent } from './scrapes-list.component';

describe('ScrapesListComponent', () => {
  let component: ScrapesListComponent;
  let fixture: ComponentFixture<ScrapesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrapesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
