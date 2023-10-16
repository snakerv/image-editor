import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageTooltipDirective } from 'src/app/directives/image-tooltip.directive';
import { ImageCrop, ImageDimensions, imageStyleKey } from 'src/app/common/interfaces/image-editor.interfaces';

@Component({
  selector: 'app-image-edited',
  standalone: true,
  imports: [CommonModule, ImageTooltipDirective],
  templateUrl: './image-edited.component.html',
})
export class ImageEditedComponent {

  @Input({ required: true }) imageStyles: imageStyleKey = {};
  @Input() image: string | null = null;
  @Input() imageCrop: ImageCrop = { x: 0, y: 0, scale: 1 };
  @Input({ required: true }) imageDimensions: ImageDimensions = { width: 0, height: 0 };
  @Input() imageName?: string;
  @Input() currentRotationAngle: number = 0;

  @Output() panImage = new EventEmitter<MouseEvent>();
  @Output() activatePanMode = new EventEmitter<void>();
  @Output() deactivatePanMode = new EventEmitter<void>();

  getMergedStyles(): imageStyleKey {
    return {
      ...this.imageStyles,
      'transform': `scale(${this.imageCrop.scale}) rotate(${this.currentRotationAngle}deg)`,
      'transform-origin': 'center center'
    };
  }

}
