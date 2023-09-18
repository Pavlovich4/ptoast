/// <reference types="node" />
import { Toast, ToastManagerOptions } from './Interfaces';
declare class ToastManager {
    private _options;
    private defaultOptions;
    constructor();
    get options(): ToastManagerOptions;
    set options(value: ToastManagerOptions);
    withOptions(options: ToastManagerOptions): this;
    show({ title, message, type }: Toast): void;
    getContainer(): Element;
    closeToast(toastElement: HTMLDivElement, progressBarInterval: NodeJS.Timeout | null): void;
    success(title: string, message: string): void;
    error(title: string, message: string): void;
    warning(title: string, message: string): void;
    info(title: string, message: string): void;
    private getSvgValue;
    private generateToastElement;
    private toastAndProgressBarClasses;
}
declare const _default: ToastManager;
export default _default;
