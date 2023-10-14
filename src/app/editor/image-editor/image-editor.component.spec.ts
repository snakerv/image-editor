import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditorComponent } from './image-editor.component';
import { ImageToolbarComponent } from '../image-toolbar/image-toolbar.component';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageEditedComponent } from '../image-edited/image-edited.component';
import { ImageEditorStoreService } from 'src/app/custom-store/image-editor-store/image-editor-store.service';
import { ImageEditorService } from 'src/app/services/image.service';

describe('ImageEditorComponent', () => {
  let component: ImageEditorComponent;
  let fixture: ComponentFixture<ImageEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImageEditorComponent, ImageToolbarComponent, ImageUploadComponent, MatProgressSpinnerModule, ImageEditedComponent],
      providers: [ImageEditorService, ImageEditorStoreService]
    });
    fixture = TestBed.createComponent(ImageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
