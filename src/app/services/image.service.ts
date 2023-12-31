import { Injectable } from '@angular/core';
import { ImageEditorStoreService } from '../custom-store/image-editor-store/image-editor-store.service';

@Injectable({
  providedIn: 'root',
})
export class ImageEditorService {
  constructor(private store: ImageEditorStoreService) { }

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
    let newAppliedFilters = [...(currentState.appliedFilters || [])];

    switch (action) {
      case 'zoomIn':
        newImageCrop.scale += 0.1;
        if (!newAppliedFilters.includes('Zoom In')) {
          newAppliedFilters.push('Zoom In');
        }
        break;
      case 'zoomOut':
        newImageCrop.scale -= 0.1;
        if (!newAppliedFilters.includes('Zoom Out')) {
          newAppliedFilters.push('Zoom Out');
        }
        break;
      case 'rotateRight':
        newRotationAngle += 90;
        if (!newAppliedFilters.includes('Rotate right')) {
          newAppliedFilters.push('Rotate right');
        }
        break;
      case 'rotateLeft':
        newRotationAngle -= 90;
        if (!newAppliedFilters.includes('Rotate left')) {
          newAppliedFilters.push('Rotate left');
        }
        break;
      case 'toBlackAndWhite':
        newImageStyles['filter'] = 'grayscale(100%)';
        if (!newAppliedFilters.includes('black and white')) {
          newAppliedFilters.push('black and white');
        }
        break;
      case 'undo':
        newImageStyles = {};
        newImageCrop = { x: 0, y: 0, scale: 1 };
        newRotationAngle = 0;
        newAppliedFilters = [];
        this.store.setState({
          imageCrop: newImageCrop,
          imageStyles: newImageStyles,
          currentRotationAngle: newRotationAngle,
          appliedFilters: newAppliedFilters
        });
        break;

      case 'increaseContrast':
        newImageStyles['filter'] = 'contrast(150%)';
        if (!newAppliedFilters.includes('Contrast')) {
          newAppliedFilters.push('Contrast');
        }
        break;
      case 'blur':
        newImageStyles['filter'] = 'blur(4px)';
        if (!newAppliedFilters.includes('blur')) {
          newAppliedFilters.push('blur');
        }
        break;
      case 'psychedelic':
        const hue = Math.floor(Math.random() * 360);
        newImageStyles['filter'] = `hue-rotate(${hue}deg)`;
        if (!newAppliedFilters.includes('Psychedelik')) {
          newAppliedFilters.push('Psychedelik');
        }
        break;
    }

    newImageStyles['transform'] = `scale(${newImageCrop.scale}) rotate(${newRotationAngle}deg)`;

    this.store.setState({
      imageCrop: newImageCrop,
      imageStyles: newImageStyles,
      currentRotationAngle: newRotationAngle,
      appliedFilters: newAppliedFilters
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
      appliedFilters: []
    });
  }

  downloadImage(imageData: string, imageStyles: any, imageCrop: any, currentRotationAngle: number, title: string) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageData;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      if (!ctx) {
        alert("Le contexte du canvas n'a pas pu être récupéré.");
        return;
      }

      ctx.filter = imageStyles['filter'] || 'none';
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((currentRotationAngle * Math.PI) / 180);
      ctx.scale(imageCrop.scale, imageCrop.scale);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.href = url;
      a.download = title;
      a.click();
    };
  }

}

