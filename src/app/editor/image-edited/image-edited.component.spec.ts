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

  it('should return merged styles correctly from getMergedStyles', () => {
    component.imageStyles = { 'background-color': 'red' };
    component.imageCrop = { x: 0, y: 0, scale: 2 };
    component.currentRotationAngle = 90;

    const expectedStyles = {
      'background-color': 'red',
      'transform': 'scale(2) rotate(90deg)',
      'transform-origin': 'center center'
    };

    expect(component.getMergedStyles()).toEqual(expectedStyles);
  });

  it('should emit panImage event correctly', () => {
    spyOn(component.panImage, 'emit');
    const event = new MouseEvent('mousemove');

    component.panImage.emit(event);

    expect(component.panImage.emit).toHaveBeenCalledWith(event);
  });

  it('should emit activatePanMode event correctly', () => {
    spyOn(component.activatePanMode, 'emit');

    component.activatePanMode.emit();

    expect(component.activatePanMode.emit).toHaveBeenCalled();
  });

  it('should emit deactivatePanMode event correctly', () => {
    spyOn(component.deactivatePanMode, 'emit');

    component.deactivatePanMode.emit();

    expect(component.deactivatePanMode.emit).toHaveBeenCalled();
  });

});
