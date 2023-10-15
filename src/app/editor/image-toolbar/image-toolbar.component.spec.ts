import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageToolbarComponent } from './image-toolbar.component';
import { ImageEditorService } from 'src/app/services/image.service';
import { ImageEditorStoreService } from 'src/app/custom-store/image-editor-store/image-editor-store.service';

describe('ImageToolbarComponent', () => {
  let component: ImageToolbarComponent;
  let fixture: ComponentFixture<ImageToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImageToolbarComponent],
      providers: [ImageEditorService, ImageEditorStoreService]
    });
    fixture = TestBed.createComponent(ImageToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
