import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ImageDatas } from 'src/app/common/interfaces/image-editor.interfaces';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './image-upload.component.html',
})
export class ImageUploadComponent {

  @Output() imageUploaded = new EventEmitter<ImageDatas>();

  uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) {
        alert("Only image files are allowed.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const imageInfo = {
          data: reader.result as string,
          name: file.name,
        };
        this.imageUploaded.emit(imageInfo);
      };
      reader.readAsDataURL(file);
    }
  }

}
