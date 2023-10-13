import { Routes } from '@angular/router';
import { ImageEditorComponent } from './editor/image-editor/image-editor.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ImageEditorComponent },
  { path: '**', component: ImageEditorComponent }
];
