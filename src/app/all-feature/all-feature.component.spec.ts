import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFeatureComponent } from './all-feature.component';

describe('AllFeatureComponent', () => {
  let component: AllFeatureComponent;
  let fixture: ComponentFixture<AllFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFeatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
