import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTypeCarteComponent } from './delete-type-carte.component';

describe('DeleteTypeCarteComponent', () => {
  let component: DeleteTypeCarteComponent;
  let fixture: ComponentFixture<DeleteTypeCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTypeCarteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTypeCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
