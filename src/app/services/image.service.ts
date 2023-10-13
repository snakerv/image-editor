import { Injectable } from '@angular/core';
import { ImageEditorStoreService } from '../custom-store/image-editor-store/image-editor-store.service';

@Injectable({
  providedIn: 'root',
})
export class ImageEditorService {
  constructor(private store: ImageEditorStoreService) {}

  setImage(imageData: string) {
    this.store.setState({
      image: imageData,
      isImageLoaded: !!imageData,
    });
  }

  applyAction(action: string) {
    let currentState = this.store.currentState;
    let newImageCrop = { ...currentState.imageCrop };
    let newImageStyles = { ...currentState.imageStyles };
    let newRotationAngle = currentState.currentRotationAngle;

    switch (action) {
      case 'zoomIn':
        newImageCrop.scale += 0.1;
        break;
      case 'zoomOut':
        newImageCrop.scale = Math.max(newImageCrop.scale - 0.1, 1);
        break;
      case 'rotateRight':
        newRotationAngle += 90;
        newImageStyles['transform'] = `rotate(${newRotationAngle}deg)`;
        break;
      case 'rotateLeft':
        newRotationAngle -= 90;
        newImageStyles['transform'] = `rotate(${newRotationAngle}deg)`;
        break;
      case 'toBlackAndWhite':
        newImageStyles['filter'] = 'grayscale(100%)';
        break;
      case 'undo':
        newImageStyles = {};
        newImageCrop = { x: 0, y: 0, scale: 1 };
        break;
    }

    this.store.setState({
      imageCrop: newImageCrop,
      imageStyles: newImageStyles,
      currentRotationAngle: newRotationAngle,
    });
  }

  resetFilters() {
    this.store.setState({
      image: null,
      isImageLoaded: false,
      imageCrop: { x: 0, y: 0, scale: 1 },
      imageStyles: {},
      currentRotationAngle: 0,
      isMouseDown: false,
    });
  }

}

