import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMenuDetailComponent } from './delete-menu-detail.component';

describe('DeleteMenuDetailComponent', () => {
  let component: DeleteMenuDetailComponent;
  let fixture: ComponentFixture<DeleteMenuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMenuDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMenuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
