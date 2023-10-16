import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageEditorService } from 'src/app/services/image.service';


@Component({
  selector: 'app-image-toolbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './image-toolbar.component.html',
})
export class ImageToolbarComponent {
  @Input() image: string | null = null;
  @Input() imageStyles: { [key: string]: string } = {};
  @Input() imageCrop = { x: 0, y: 0, scale: 1 };
  @Input() currentRotationAngle = 0;
  @Input() imageName?: string;

  @Output() action = new EventEmitter<string>();
  @Output() backClicked = new EventEmitter<void>();

  constructor(
    private imageService: ImageEditorService
  ) {}

  onBackClicked() {
    this.backClicked.emit();
  }

  onDownloadClicked() {
    this.imageService.downloadImage(
      this.image!,
      this.imageStyles,
      this.imageCrop,
      this.currentRotationAngle,
      this.imageName!
    );
  }
}
