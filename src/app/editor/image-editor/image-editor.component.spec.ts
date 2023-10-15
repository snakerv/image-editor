import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditorComponent } from './image-editor.component';
import { ImageToolbarComponent } from '../image-toolbar/image-toolbar.component';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageEditedComponent } from '../image-edited/image-edited.component';
import { ImageEditorStoreService } from 'src/app/custom-store/image-editor-store/image-editor-store.service';
import { ImageEditorService } from 'src/app/services/image.service';
import { of } from 'rxjs';

describe('ImageEditorComponent', () => {
  let component: ImageEditorComponent;
  let fixture: ComponentFixture<ImageEditorComponent>;
  let mockImageService: jasmine.SpyObj<ImageEditorService>;
  let mockStoreService: jasmine.SpyObj<ImageEditorStoreService>;

  beforeEach(() => {
    mockImageService = jasmine.createSpyObj('ImageEditorService', ['setImage', 'applyAction', 'resetFilters']);
    mockStoreService = jasmine.createSpyObj('ImageEditorStoreService', ['setState']);
    mockStoreService.state$ = of({
      image: null,
      isImageLoaded: false,
      imageCrop: { x: 0, y: 0, scale: 1 },
      imageStyles: {},
      currentRotationAngle: 0,
      isMouseDown: false,
      appliedFilters: []
    });
    TestBed.configureTestingModule({
      imports: [ImageEditorComponent, ImageToolbarComponent, ImageUploadComponent, MatProgressSpinnerModule, ImageEditedComponent],
      providers: [
        ImageEditorService,
        ImageEditorStoreService,
        { provide: ImageEditorService, useValue: mockImageService },
        { provide: ImageEditorStoreService, useValue: mockStoreService }]
    });
    fixture = TestBed.createComponent(ImageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setState when activatePanMode is triggered', () => {
    component.activatePanMode();
    expect(mockStoreService.setState).toHaveBeenCalledWith({ isMouseDown: true });
  });

  it('should set isEditing to true when onImageUploaded is triggered', () => {
    const imageInfo = { data: 'someData', name: 'someName' };
    component.onImageUploaded(imageInfo);
    expect(component.isEditing).toBeTrue();
  });

  it('should set isEditing to false when onBackClicked is triggered', () => {
    component.onBackClicked();
    expect(component.isEditing).toBeFalse();
  });

  it('should call setState with { isMouseDown: true } when activatePanMode is triggered', () => {
    component.activatePanMode();
    expect(mockStoreService.setState).toHaveBeenCalledWith({ isMouseDown: true });
  });

  it('should call setState with { isMouseDown: false } when deactivatePanMode is triggered', () => {
    component.deactivatePanMode();
    expect(mockStoreService.setState).toHaveBeenCalledWith({ isMouseDown: false });
  });

});
