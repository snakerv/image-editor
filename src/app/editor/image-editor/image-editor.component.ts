import { CommonModule } from '@angular/common';
import { Component, OnDestroy, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageToolbarComponent } from '../image-toolbar/image-toolbar.component';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { ImageEditorService } from 'src/app/services/image.service';
import { ImageEditorStoreService } from 'src/app/custom-store/image-editor-store/image-editor-store.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { ImageEditedComponent } from '../image-edited/image-edited.component';
import { ImageEditorState } from 'src/app/common/interfaces/image-editor.interfaces';

@Component({
  selector: 'app-image-editor',
  standalone: true,
  imports: [CommonModule, ImageToolbarComponent, ImageUploadComponent, MatProgressSpinnerModule, ImageEditedComponent],
  providers: [ImageEditorService],
  templateUrl: './image-editor.component.html',
})
export class ImageEditorComponent implements OnDestroy {
  imageState: ImageEditorState = {
    image: null,
    isImageLoaded: false,
    imageCrop: { x: 0, y: 0, scale: 1 },
    imageStyles: {},
    currentRotationAngle: 0,
    isMouseDown: false,
    appliedFilters: []
  };
  imageDimensions: { width: number, height: number } = { width: 0, height: 0 };
  isLoading = signal(false);
  isEditing = false;
  imageName?: string;
  private stateSubscription: Subscription;

  constructor(
    private imageService: ImageEditorService,
    private store: ImageEditorStoreService
  ) {
    this.stateSubscription = this.store.state$.subscribe((state) => {
      this.imageState = state;
    });
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  onImageUploaded(imageInfo: { data: string; name: string }) {
    this.isLoading.set(true);
    this.imageName = imageInfo.name;
    this.isEditing = true;
    this.imageService.setImage(imageInfo.data);
    const img = new Image();
    img.onload = () => {
      this.isLoading.set(false);
      this.imageDimensions.width = img.width;
      this.imageDimensions.height = img.height;
    };
    img.src = imageInfo.data;
  }

  loading(): boolean {
    return this.isLoading();
  }

  performAction(action: string) {
    this.imageService.applyAction(action);
  }

  activatePanMode() {
    this.store.setState({ isMouseDown: true });
  }

  deactivatePanMode() {
    this.store.setState({ isMouseDown: false });
  }

  panImage(event: MouseEvent) {
    if (!this.imageState.isMouseDown || this.imageState.imageCrop.scale <= 1) {
      return;
    }
    if (this.imageState.imageCrop.scale <= 1) {
      return;
    }
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.imageState.imageCrop.x = -1 * (x - rect.width / 2) * (this.imageState.imageCrop.scale - 1);
    this.imageState.imageCrop.y = -1 * (y - rect.height / 2) * (this.imageState.imageCrop.scale - 1);
  }

  onBackClicked() {
    this.isEditing = false;
    this.imageService.resetFilters();
  }

}
