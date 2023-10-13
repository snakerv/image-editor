import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ImageEditorStoreService } from './custom-store/image-editor-store/image-editor-store.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ImageEditorStoreService]
};
