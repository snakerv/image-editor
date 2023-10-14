import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageTooltipDirective } from 'src/app/directives/image-tooltip.directive';

@Component({
  selector: 'app-image-edited',
  standalone: true,
  imports: [CommonModule, ImageTooltipDirective],
  templateUrl: './image-edited.component.html',
})
export class ImageEditedComponent {

  @Input({ required: true }) imageStyles: { [key: string]: string } = {};
  @Input() image: string | null = null;
  @Input() imageCrop = { x: 0, y: 0, scale: 1 };
  @Input({ required: true }) imageDimensions: { width: number, height: number } = { width: 0, height: 0 };
  @Input() imageName?: string;

  @Output() panImage = new EventEmitter<MouseEvent>();
  @Output() activatePanMode = new EventEmitter<void>();
  @Output() deactivatePanMode = new EventEmitter<void>();

}
