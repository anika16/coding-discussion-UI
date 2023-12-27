import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpvoteComponent } from './upvote.component';

describe('UpvoteComponent', () => {
  let component: UpvoteComponent;
  let fixture: ComponentFixture<UpvoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpvoteComponent]
    });
    fixture = TestBed.createComponent(UpvoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
