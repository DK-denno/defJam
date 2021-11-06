import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferRegisterComponent } from './refer-register.component';

describe('ReferRegisterComponent', () => {
  let component: ReferRegisterComponent;
  let fixture: ComponentFixture<ReferRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
