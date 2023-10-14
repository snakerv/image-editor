import { TestBed } from '@angular/core/testing';
import { ImageEditorService } from './image.service';
import { ImageEditorStoreService } from '../custom-store/image-editor-store/image-editor-store.service';

describe('ImageEditorService', () => {
  let service: ImageEditorService;
  let mockImageEditorStoreService: any;

  beforeEach(() => {
    mockImageEditorStoreService = jasmine.createSpyObj(['setState', 'currentState']);
    mockImageEditorStoreService.currentState = {
      image: null,
      isImageLoaded: false,
      imageCrop: { x: 0, y: 0, scale: 1 },
      imageStyles: {},
      currentRotationAngle: 0,
      isMouseDown: false,
      appliedFilters: []
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ImageEditorStoreService, useValue: mockImageEditorStoreService }
      ]
    });

    service = TestBed.inject(ImageEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set image data', () => {
    const imageData = 'some-image-data';
    service.setImage(imageData);

    expect(mockImageEditorStoreService.setState).toHaveBeenCalledWith({
      image: imageData,
      isImageLoaded: true,
    });
  });

  it('should reset filters', () => {
    service.resetFilters();

    expect(mockImageEditorStoreService.setState).toHaveBeenCalledWith({
      image: null,
      isImageLoaded: false,
      imageCrop: { x: 0, y: 0, scale: 1 },
      imageStyles: {},
      currentRotationAngle: 0,
      isMouseDown: false,
      appliedFilters: []
    });
  });

  it('should apply zoomIn action', () => {
    service.applyAction('zoomIn');
    expect(mockImageEditorStoreService.setState).toHaveBeenCalled();
  });

});
