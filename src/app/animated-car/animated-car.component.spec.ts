import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedCarComponent } from './animated-car.component';

describe('AnimatedCarComponent', () => {
  let component: AnimatedCarComponent;
  let fixture: ComponentFixture<AnimatedCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedCarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimatedCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
