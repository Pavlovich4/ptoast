import { ToastType, ToastAnimation } from './Enums';
import { ToastManagerOptions, Toast } from './Interfaces';

class ToastManager {
    
    private _options: ToastManagerOptions;
    constructor(options: ToastManagerOptions = {}) {

        this._options = {
            position: options.position || "top-right",
            animation: options.animation || ToastAnimation.SlideRight,
            duration: options.duration || 5000, // Default duration is 5 seconds
        };
        console.log(this._options)
    }

    get options(): ToastManagerOptions {
        return this._options;
    }

    set options(value: ToastManagerOptions) {
        this._options = value;
    }

    show({ type, title, message, icon }: Toast): void {
        console.log(this.options)
        const toastElement: HTMLDivElement = document.createElement("div");
        toastElement.classList.add("toast", type, this.options.animation!);

        const iconElement: HTMLDivElement = document.createElement("div");
        iconElement.classList.add("icon");
        toastElement.appendChild(iconElement);

        const contentElement: HTMLDivElement = document.createElement("div");
        contentElement.classList.add("content");
        toastElement.appendChild(contentElement);

        if (icon) {
            iconElement.innerHTML = `<i class="${icon}"></i>`;
        }

        const titleElement: HTMLDivElement = document.createElement("div");
        titleElement.classList.add("title");
        titleElement.textContent = title || "";
        contentElement.appendChild(titleElement);

        const messageElement: HTMLDivElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.textContent = message || "";
        contentElement.appendChild(messageElement);

        const progressBarElement: HTMLDivElement = document.createElement("div");
        progressBarElement.classList.add("progress-bar");
        toastElement.appendChild(progressBarElement);

        const toastContainer: Element = this.getContainer();
        toastContainer.appendChild(toastElement);

        //let computedDuration: number = this.duration
        let computedDuration: number = this.options.duration!

        const progressBarInterval = setInterval((): void => {
            computedDuration = computedDuration - 100
            const progressBarWidth = (100 * computedDuration) / this.options.duration!
            progressBarElement.style.width = progressBarWidth + "%";
        }, 100);

        setTimeout((): void => {
            clearInterval(progressBarInterval);
            //TODO: FadeOut the element
            toastContainer.removeChild(toastElement);
        }, 5000); // TODO: get duration from options here
    }

    getContainer(): Element {
        let toastContainer = document.querySelector(".toast-container");
        if (!toastContainer) {
            toastContainer = document.createElement("div");
            toastContainer.classList.add("toast-container", this.options.position!);
            document.body.appendChild(toastContainer);
        }
        return toastContainer;
    }

    success(title: string, message: string, icon: string): void {
        this.show({
            type: ToastType.Success,
            title,
            message,
            icon,
        });
    }

    error(title: string, message: string, icon: string): void {
        this.show({
            type: ToastType.Error,
            title,
            message,
            icon,
        });
    }

    warning(title: string, message: string, icon: string): void {
        this.show({
            type: ToastType.Warning,
            title,
            message,
            icon,
        });
    }

    info(title: string, message: string, icon: string): void {
        this.show({
            type: ToastType.Info,
            title,
            message,
            icon,
        });
    }
}
const toastManager = new ToastManager()
export default toastManager;
