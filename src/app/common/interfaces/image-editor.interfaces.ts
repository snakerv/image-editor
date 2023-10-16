export interface ImageCrop {
  x: number;
  y: number;
  scale: number;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ImageEditorState {
  image: string | null;
  isImageLoaded: boolean;
  imageCrop: ImageCrop;
  imageStyles: { [key: string]: string };
  currentRotationAngle: number;
  isMouseDown: boolean;
  appliedFilters: string[];
}

export interface ImageDatas {
  data: string;
  name: string
}
