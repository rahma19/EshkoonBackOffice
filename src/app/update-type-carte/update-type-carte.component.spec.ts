import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypeCarteComponent } from './update-type-carte.component';

describe('UpdateTypeCarteComponent', () => {
  let component: UpdateTypeCarteComponent;
  let fixture: ComponentFixture<UpdateTypeCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTypeCarteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTypeCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
