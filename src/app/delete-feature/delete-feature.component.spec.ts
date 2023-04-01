import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFeatureComponent } from './delete-feature.component';

describe('DeleteFeatureComponent', () => {
  let component: DeleteFeatureComponent;
  let fixture: ComponentFixture<DeleteFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFeatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
