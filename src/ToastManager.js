"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var Enums_1 = require("./Enums");
var ToastManager = /** @class */ (function () {
    function ToastManager() {
        this.defaultOptions = {
            position: Enums_1.ToastPosition.TopRight,
            animation: Enums_1.ToastAnimation.SlideInUp,
            duration: 5000,
            close: true,
            progress: true
        };
        this._options = __assign(__assign({}, this.defaultOptions), this.options);
    }
    Object.defineProperty(ToastManager.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (value) {
            this._options = __assign(__assign({}, this.defaultOptions), value);
        },
        enumerable: false,
        configurable: true
    });
    ToastManager.prototype.withOptions = function (options) {
        this.options = options;
        return this;
    };
    ToastManager.prototype.show = function (_a) {
        var _b, _c, _d, _e, _f;
        var _this = this;
        var title = _a.title, message = _a.message, _g = _a.type, type = _g === void 0 ? Enums_1.ToastType.Default : _g;
        var _h = this.toastAndProgressBarClasses(type), toastClasses = _h.toastClasses, progressBarClasses = _h.progressBarClasses;
        var toastElement = this.generateToastElement(toastClasses, type);
        var iconElement = document.createElement("div");
        (_b = iconElement.classList).add.apply(_b, "inline-block pr-2 align-middle text-xl".split(' '));
        toastElement.appendChild(iconElement);
        var contentElement = document.createElement("div");
        (_c = contentElement.classList).add.apply(_c, "inline-block align-middle".split(' '));
        toastElement.appendChild(contentElement);
        if (type) {
            iconElement.innerHTML = this.getSvgValue(type);
        }
        var titleElement = document.createElement("div");
        titleElement.classList.add("font-semibold");
        titleElement.textContent = title || "";
        contentElement.appendChild(titleElement);
        var messageElement = document.createElement("div");
        (_d = messageElement.classList).add.apply(_d, "font-light leading-6".split(' '));
        messageElement.textContent = message || "";
        contentElement.appendChild(messageElement);
        var progressBarInterval = null;
        if (this.options.progress) {
            var progressBarElement_1 = document.createElement("div");
            (_e = progressBarElement_1.classList).add.apply(_e, __spreadArray(__spreadArray([], "absolute bottom-0 left-0 h-1 w-full bg-gray-400".split(' '), false), [progressBarClasses], false));
            toastElement.appendChild(progressBarElement_1);
            // Manage the progressBar
            var computedDuration_1 = this.options.duration;
            progressBarInterval = setInterval(function () {
                computedDuration_1 = computedDuration_1 - 100;
                var progressBarWidth = (100 * computedDuration_1) / _this.options.duration;
                progressBarElement_1.style.width = progressBarWidth + "%";
            }, 100);
        }
        if (this.options.close) {
            var closeIcon = document.createElement('span');
            (_f = closeIcon.classList).add.apply(_f, "absolute right-2 top-2 w-4 cursor-pointer stroke-2".split(' '));
            closeIcon.innerHTML = " <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" >\n                                      <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6 18L18 6M6 6l12 12\" />\n                                    </svg>\n                                    ";
            toastElement.appendChild(closeIcon);
            closeIcon.addEventListener('click', function () {
                _this.closeToast(toastElement, progressBarInterval);
            });
        }
        var toastContainer = this.getContainer();
        toastContainer.appendChild(toastElement);
        // Close the toast after this.options.duration
        setTimeout(function () { return _this.closeToast(toastElement, progressBarInterval); }, this.options.duration);
    };
    ToastManager.prototype.getContainer = function () {
        var _a;
        var toastContainer = document.querySelector(".toast-container");
        if (!toastContainer) {
            toastContainer = document.createElement("div");
            var position = [];
            switch (this.options.position) {
                case 'top-left':
                    position = ["left-10", "top-10"];
                    break;
                case 'bottom-left':
                    position = ["left-10", "bottom-10"];
                    break;
                case 'bottom-right':
                    position = ["bottom-10", "right-10"];
                    break;
                case 'top-right':
                    position = ["right-10", "top-10"];
                    break;
                default:
                    position = ["right-10", "top-10"];
            }
            (_a = toastContainer.classList).add.apply(_a, __spreadArray(__spreadArray(["fixed", "z-[10000px]", "flex", "max-w-md", "flex-col", "gap-3", "font-sans", "text-base"], position, false), ["toast-container", "transition-all"], false));
            document.body.appendChild(toastContainer);
        }
        return toastContainer;
    };
    ToastManager.prototype.closeToast = function (toastElement, progressBarInterval) {
        if (progressBarInterval) {
            clearInterval(progressBarInterval);
        }
        toastElement.classList.remove(this.options.animation);
        toastElement.classList.add('fadeOut');
        // Use setTimeout with a named function for clarity
        setTimeout(function () {
            toastElement.remove();
        }, 500);
    };
    ToastManager.prototype.success = function (title, message) {
        this.show({
            type: Enums_1.ToastType.Success,
            title: title,
            message: message
        });
    };
    ToastManager.prototype.error = function (title, message) {
        this.show({
            type: Enums_1.ToastType.Error,
            title: title,
            message: message
        });
    };
    ToastManager.prototype.warning = function (title, message) {
        this.show({
            type: Enums_1.ToastType.Warning,
            title: title,
            message: message
        });
    };
    ToastManager.prototype.info = function (title, message) {
        this.show({
            type: Enums_1.ToastType.Info,
            title: title,
            message: message
        });
    };
    ToastManager.prototype.getSvgValue = function (value) {
        // @ts-ignore
        return Enums_1.Icons[value] || '';
    };
    ToastManager.prototype.generateToastElement = function (toastClasses, type) {
        var _a;
        var toastElement = document.createElement("div");
        (_a = toastElement.classList).add.apply(_a, __spreadArray(__spreadArray(__spreadArray([], "relative flex translate-x-0 items-center rounded-r-md border-l-4 py-4 pl-3 pr-10 shadow-lg toast".split(' '), false), [type,
            this.options.animation], false), toastClasses.split(' '), false));
        return toastElement;
    };
    ToastManager.prototype.toastAndProgressBarClasses = function (type) {
        var toastClasses = "";
        var progressBarClasses = "";
        switch (type) {
            case 'success':
                toastClasses = "border-green-600 bg-green-500 text-white";
                progressBarClasses = "bg-green-600";
                break;
            case 'error':
                toastClasses = "border-red-700 bg-red-500 text-white";
                progressBarClasses = "bg-red-700";
                break;
            case 'info':
                toastClasses = "border-blue-600 bg-blue-500 text-white";
                progressBarClasses = "bg-blue-600";
                break;
            case 'warning':
                toastClasses = "border-yellow-600 bg-yellow-500 text-white";
                progressBarClasses = "bg-yellow-600";
                break;
        }
        return { toastClasses: toastClasses, progressBarClasses: progressBarClasses };
    };
    return ToastManager;
}());
exports["default"] = new ToastManager();
