// Interface for options passed to ToastManager constructor
import {ToastAnimation, ToastType} from "./Enums";

export interface ToastManagerOptions {
    position?: string;
    animation?: ToastAnimation;
    duration?: number;
  }
  
  // Interface for individual toast properties
  export interface Toast {
    type: ToastType;
    title?: string;
    message?: string;
    icon?: string;
  }
  