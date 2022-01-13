import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelecommunicationComponent } from './telecommunication.component';

describe('TelecommunicationComponent', () => {
  let component: TelecommunicationComponent;
  let fixture: ComponentFixture<TelecommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelecommunicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelecommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
