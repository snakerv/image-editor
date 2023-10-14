import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditedComponent } from './image-edited.component';
import { ImageEditorStoreService } from 'src/app/custom-store/image-editor-store/image-editor-store.service';

describe('ImageEditedComponent', () => {
  let component: ImageEditedComponent;
  let fixture: ComponentFixture<ImageEditedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImageEditedComponent],
      providers: [ImageEditorStoreService]
    });
    fixture = TestBed.createComponent(ImageEditedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
