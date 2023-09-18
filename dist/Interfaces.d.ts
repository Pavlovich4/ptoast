import { ToastAnimation, ToastPosition, ToastType } from "./Enums";
export interface ToastManagerOptions {
    position?: ToastPosition;
    animation?: ToastAnimation;
    duration?: number;
    close?: boolean;
    progress?: boolean;
}
export interface Toast {
    type?: ToastType;
    title?: string;
    message?: string;
}
