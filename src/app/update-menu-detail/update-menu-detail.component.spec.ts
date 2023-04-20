import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMenuDetailComponent } from './update-menu-detail.component';

describe('UpdateMenuDetailComponent', () => {
  let component: UpdateMenuDetailComponent;
  let fixture: ComponentFixture<UpdateMenuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMenuDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMenuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
