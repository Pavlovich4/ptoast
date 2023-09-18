// Interface for options passed to ToastManager constructor
import {ToastAnimation, ToastPosition, ToastType} from "./Enums";

export interface ToastManagerOptions {
    position?: ToastPosition;
    animation?: ToastAnimation;
    duration?: number;
    close?: boolean,
    progress?: boolean
  }
  
  // Interface for individual toast properties
  export interface Toast {
    type?: ToastType;
    title?: string;
    message?: string;
  }
  