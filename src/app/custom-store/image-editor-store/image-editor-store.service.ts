import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ImageEditorState {
  image: string | null;
  isImageLoaded: boolean;
  imageCrop: { x: number, y: number, scale: number };
  imageStyles: { [key: string]: string };
  currentRotationAngle: number;
  isMouseDown: boolean;
  appliedFilters: string[];
}

const initialState: ImageEditorState = {
  image: null,
  isImageLoaded: false,
  imageCrop: { x: 0, y: 0, scale: 1 },
  imageStyles: {},
  currentRotationAngle: 0,
  isMouseDown: false,
  appliedFilters: []
};

@Injectable()
export class ImageEditorStoreService {
  private stateSubject = new BehaviorSubject<ImageEditorState>(initialState);
  state$ = this.stateSubject.asObservable();

  constructor() { }

  get currentState(): ImageEditorState {
    return this.stateSubject.getValue();
  }

  setState(newState: Partial<ImageEditorState>) {
    const currentState = this.stateSubject.getValue();
    this.stateSubject.next({ ...currentState, ...newState });
  }
}
