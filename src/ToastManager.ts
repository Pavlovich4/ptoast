import { ToastType, ToastAnimation } from './Enums';
import { ToastManagerOptions, Toast } from './Interfaces';

class ToastManager {
    
    private _options: ToastManagerOptions;

    private defaultOptions: ToastManagerOptions = {
        position: "top-right",
        animation: ToastAnimation.SlideInUp,
        duration: 5000, // Default duration is 5 seconds
    };
    constructor() {
        this._options = { ...this.defaultOptions, ...this.options }
    }

    get options(): ToastManagerOptions {
        return this._options;
    }

    set options(value: ToastManagerOptions) {
        this._options = { ...this.defaultOptions, ...value };
    }

    show({ type, title, message, icon }: Toast): void {
        
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

        // Manage the progressBar
        let computedDuration: number = this.options.duration!

        const progressBarInterval: NodeJS.Timeout = setInterval((): void => {
            computedDuration = computedDuration - 100
            const progressBarWidth = (100 * computedDuration) / this.options.duration!
            progressBarElement.style.width = progressBarWidth + "%";
        }, 100);

        // Close the toast after this.options.duration
        setTimeout(() => this.closeToast(toastElement, progressBarInterval), this.options.duration);
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
    
    
    closeToast(toastElement: HTMLDivElement, progressBarInterval: NodeJS.Timeout | null): void {
        
        if (progressBarInterval) {
            clearInterval(progressBarInterval);
        }
        
        toastElement.classList.remove(this.options.animation!);
        toastElement.classList.add('fadeOut');

        // Use setTimeout with a named function for clarity
        setTimeout(() =>  {
            this.getContainer().removeChild(toastElement);
        }, 500);
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
