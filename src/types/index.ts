export type AppStep = 'landing' | 'upload' | 'details' | 'generating' | 'result';

export interface BuilderInfo {
  name: string;
  stack: string;
  builderTitle: string;
  photoUrl: string | null;
  photoAspect: number; // width / height
  idNumber: string;
  timestamp: string;
}

export interface GenerationProgress {
  photo: boolean;
  identity: boolean;
  builderTitle: boolean;
  hhGoaFrame: boolean;
  finalGraphic: boolean;
}

export interface RenderCardOptions {
  name: string;
  builderTitle: string;
  stack: string;
  photoImage: HTMLImageElement | ImageBitmap;
  idNumber: string;
}
