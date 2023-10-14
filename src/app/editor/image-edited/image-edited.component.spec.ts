import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditedComponent } from './image-edited.component';

describe('ImageEditedComponent', () => {
  let component: ImageEditedComponent;
  let fixture: ComponentFixture<ImageEditedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImageEditedComponent]
    });
    fixture = TestBed.createComponent(ImageEditedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
