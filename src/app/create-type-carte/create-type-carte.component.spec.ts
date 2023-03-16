import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTypeCarteComponent } from './create-type-carte.component';

describe('CreateTypeCarteComponent', () => {
  let component: CreateTypeCarteComponent;
  let fixture: ComponentFixture<CreateTypeCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTypeCarteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTypeCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
