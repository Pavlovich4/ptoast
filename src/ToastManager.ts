import {Icons, ToastAnimation, ToastPosition, ToastType} from './Enums';
import {Toast, ToastManagerOptions} from './Interfaces';

class ToastManager {

    private _options: ToastManagerOptions;

    private defaultOptions: ToastManagerOptions = {
        position: ToastPosition.TopRight,
        animation: ToastAnimation.SlideInUp,
        duration: 5000,
        close: true,
        progress: true
    };

    constructor() {
        this._options = {...this.defaultOptions, ...this.options}
    }

    get options(): ToastManagerOptions {
        return this._options;
    }

    set options(value: ToastManagerOptions) {
        this._options = {...this.defaultOptions, ...value};
    }

    withOptions(options: ToastManagerOptions) {
        this.options = options

        return this
    }

    show({title, message, type = ToastType.Default}: Toast): void {
        

        const { toastClasses, progressBarClasses } = this.toastAndProgressBarClasses(type)

        
       const toastElement: HTMLDivElement = this.generateToastElement(toastClasses, type)

        const iconElement: HTMLDivElement = document.createElement("div");
        iconElement.classList.add(..."inline-block pr-2 align-middle text-xl".split(' '));
        toastElement.appendChild(iconElement);

        const contentElement: HTMLDivElement = document.createElement("div");
        contentElement.classList.add(..."inline-block align-middle".split(' '));
        toastElement.appendChild(contentElement);

        if (type) {
            iconElement.innerHTML = this.getSvgValue(type);
        }

        const titleElement: HTMLDivElement = document.createElement("div");
        titleElement.classList.add("font-semibold");
        titleElement.textContent = title || "";
        contentElement.appendChild(titleElement);

        const messageElement: HTMLDivElement = document.createElement("div");
        messageElement.classList.add(..."font-light leading-6".split(' '));
        messageElement.textContent = message || "";
        contentElement.appendChild(messageElement);

        let progressBarInterval: NodeJS.Timeout | null = null;
        if (this.options.progress) {

            const progressBarElement: HTMLDivElement = document.createElement("div");
            progressBarElement.classList.add(..."absolute bottom-0 left-0 h-1 w-full bg-gray-400".split(' '), progressBarClasses);
            toastElement.appendChild(progressBarElement);


            // Manage the progressBar
            let computedDuration: number = this.options.duration!

            progressBarInterval = setInterval((): void => {
                computedDuration = computedDuration - 100
                const progressBarWidth = (100 * computedDuration) / this.options.duration!
                progressBarElement.style.width = progressBarWidth + "%";
            }, 100);
        }


        if (this.options.close) {
            const closeIcon: HTMLSpanElement = document.createElement('span');
            closeIcon.classList.add(..."absolute right-2 top-2 w-4 cursor-pointer stroke-2".split(' '));
            closeIcon.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    `;

            toastElement.appendChild(closeIcon)

            closeIcon.addEventListener('click', () => {
                this.closeToast(toastElement, progressBarInterval);
            })
        }

        const toastContainer: Element = this.getContainer();
        toastContainer.appendChild(toastElement);

        // Close the toast after this.options.duration
        setTimeout(() => this.closeToast(toastElement, progressBarInterval), this.options.duration);
    }

    getContainer(): Element {
        let toastContainer = document.querySelector(".toast-container");
        if (!toastContainer) {
            toastContainer = document.createElement("div");
            
            let position: string[] = [];
            
            switch (this.options.position) {
                case 'top-left':
                    position = ["left-10","top-10"]
                    break;
                case 'bottom-left':
                    position = ["left-10","bottom-10"]
                    break;
                case 'bottom-right':
                    position = ["bottom-10","right-10"]
                    break;
                case 'top-right':
                    position = ["right-10","top-10"]
                    break;
                default:
                    position = ["right-10","top-10"]
            }
            
            toastContainer.classList.add("fixed", "z-[10000px]", "flex", "max-w-md", "flex-col", "gap-3", "font-sans", "text-base", ...position, "toast-container", "transition-all");
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
        setTimeout(() => {
            toastElement.remove()
        }, 500);
    }


    success(title: string, message: string): void {
        this.show({
            type: ToastType.Success,
            title,
            message,
        });
    }

    error(title: string, message: string): void {
        this.show({
            type: ToastType.Error,
            title,
            message
        });
    }

    warning(title: string, message: string): void {
        this.show({
            type: ToastType.Warning,
            title,
            message,
        });
    }

    info(title: string, message: string): void {
        this.show({
            type: ToastType.Info,
            title,
            message,
        });
    }


    private getSvgValue(value: string): string {
        // @ts-ignore
        return Icons[value] || '';
    }

    private generateToastElement(toastClasses: string, type: ToastType): HTMLDivElement {
        const toastElement: HTMLDivElement = document.createElement("div");

        toastElement.classList.add(
            ..."relative flex translate-x-0 items-center rounded-r-md border-l-4 py-4 pl-3 pr-10 shadow-lg toast".split(' '),
            type,
            this.options.animation!,
            ...toastClasses.split(' ')
        );
        
        return toastElement;
    }

    private toastAndProgressBarClasses(type: ToastType): { toastClasses: string, progressBarClasses: string} {
        let toastClasses: string = "";
        let progressBarClasses: string = ""


        switch (type) {
            case 'success':
                toastClasses = "border-green-600 bg-green-500 text-white"
                progressBarClasses = "bg-green-600"
                break;
            case 'error':
                toastClasses = "border-red-700 bg-red-500 text-white"
                progressBarClasses = "bg-red-700"
                break;
            case 'info':
                toastClasses = "border-blue-600 bg-blue-500 text-white"
                progressBarClasses = "bg-blue-600"
                break;
            case 'warning':
                toastClasses = "border-yellow-600 bg-yellow-500 text-white"
                progressBarClasses = "bg-yellow-600"
                break;
        }
        
        return {toastClasses, progressBarClasses}
    }
}

export default new ToastManager();
