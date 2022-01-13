import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtComponent } from './hrt.component';

describe('HrtComponent', () => {
  let component: HrtComponent;
  let fixture: ComponentFixture<HrtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
