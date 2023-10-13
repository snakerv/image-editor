import { Component } from '@angular/core';
import { ImageEditorComponent } from './editor/image-editor/image-editor.component';
import { ImageToolbarComponent } from './editor/image-toolbar/image-toolbar.component';
import { ImageUploadComponent } from './editor/image-upload/image-upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ImageEditorComponent,
    ImageToolbarComponent,
    ImageUploadComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
