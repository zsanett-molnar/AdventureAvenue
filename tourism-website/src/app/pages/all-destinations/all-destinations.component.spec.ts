import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDestinationsComponent } from './all-destinations.component';

describe('AllDestinationsComponent', () => {
  let component: AllDestinationsComponent;
  let fixture: ComponentFixture<AllDestinationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllDestinationsComponent]
    });
    fixture = TestBed.createComponent(AllDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
