import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskedByMeComponent } from './asked-by-me.component';

describe('AskedByMeComponent', () => {
  let component: AskedByMeComponent;
  let fixture: ComponentFixture<AskedByMeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AskedByMeComponent]
    });
    fixture = TestBed.createComponent(AskedByMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
