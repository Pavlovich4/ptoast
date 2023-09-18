
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Enums.ts":
/*!**********************!*\
  !*** ./src/Enums.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Icons: () => (/* binding */ Icons),
/* harmony export */   ToastAnimation: () => (/* binding */ ToastAnimation),
/* harmony export */   ToastPosition: () => (/* binding */ ToastPosition),
/* harmony export */   ToastType: () => (/* binding */ ToastType)
/* harmony export */ });
// Enums for toast type and animation type
var ToastType;
(function (ToastType) {
    ToastType["Success"] = "success";
    ToastType["Error"] = "error";
    ToastType["Warning"] = "warning";
    ToastType["Info"] = "info";
    ToastType["Default"] = "default";
})(ToastType || (ToastType = {}));
var ToastAnimation;
(function (ToastAnimation) {
    ToastAnimation["SlideInUp"] = "slideInUp";
    ToastAnimation["SlideUp"] = "slideUp";
    ToastAnimation["SlideDown"] = "slideDown";
    ToastAnimation["SlideRight"] = "slideRight";
    ToastAnimation["SlideLeft"] = "slideLeft";
    ToastAnimation["FadeIn"] = "fadeIn";
    // Add more animation types as needed
})(ToastAnimation || (ToastAnimation = {}));
var ToastPosition;
(function (ToastPosition) {
    ToastPosition["TopRight"] = "top-right";
    ToastPosition["TopLeft"] = "top-left";
    ToastPosition["BottomRight"] = "bottom-right";
    ToastPosition["BottomLeft"] = "bottom-left";
})(ToastPosition || (ToastPosition = {}));
var Icons;
(function (Icons) {
    Icons["success"] = " <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" class=\"h-8 w-8 stroke-2\" viewBox=\"0 0 24 24\"  stroke=\"currentColor\" >\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z\" />\n</svg>\n";
    Icons["info"] = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" class=\"h-8 w-8 stroke-2\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z\" />\n</svg>";
    Icons["warning"] = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" class=\"h-8 w-8 stroke-2\" viewBox=\"0 0 24 24\"  stroke=\"currentColor\" >\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z\" />\n</svg>";
    Icons["error"] = " <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" class=\"h-8 w-8 stroke-2\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />\n</svg>";
})(Icons || (Icons = {}));


/***/ }),

/***/ "./src/ToastManager.ts":
/*!*****************************!*\
  !*** ./src/ToastManager.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Enums */ "./src/Enums.ts");

class ToastManager {
    _options;
    defaultOptions = {
        position: _Enums__WEBPACK_IMPORTED_MODULE_0__.ToastPosition.TopRight,
        animation: _Enums__WEBPACK_IMPORTED_MODULE_0__.ToastAnimation.SlideInUp,
        duration: 5000,
        close: true,
        progress: true
    };
    constructor() {
        this._options = { ...this.defaultOptions, ...this.options };
    }
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = { ...this.defaultOptions, ...value };
    }
    withOptions(options) {
        this.options = options;
        return this;
    }
    show({ title, message, type = _Enums__WEBPACK_IMPORTED_MODULE_0__.ToastType.Default }) {
        const { toastClasses, progressBarClasses } = this.toastAndProgressBarClasses(type);
        const toastElement = this.generateToastElement(toastClasses, type);
        const iconElement = document.createElement("div");
        iconElement.classList.add(..."inline-block pr-2 align-middle text-xl".split(' '));
        toastElement.appendChild(iconElement);
        const contentElement = document.createElement("div");
        contentElement.classList.add(..."inline-block align-middle".split(' '));
        toastElement.appendChild(contentElement);
        if (type) {
            iconElement.innerHTML = this.getSvgValue(type);
        }
        const titleElement = document.createElement("div");
        titleElement.classList.add("font-semibold");
        titleElement.textContent = title || "";
        contentElement.appendChild(titleElement);
        const messageElement = document.createElement("div");
        messageElement.classList.add(..."font-light leading-6".split(' '));
        messageElement.textContent = message || "";
        contentElement.appendChild(messageElement);
        let progressBarInterval = null;
        if (this.options.progress) {
            const progressBarElement = document.createElement("div");
            progressBarElement.classList.add(..."absolute bottom-0 left-0 h-1 w-full bg-gray-400".split(' '), progressBarClasses);
            toastElement.appendChild(progressBarElement);
            // Manage the progressBar
            let computedDuration = this.options.duration;
            progressBarInterval = setInterval(() => {
                computedDuration = computedDuration - 100;
                const progressBarWidth = (100 * computedDuration) / this.options.duration;
                progressBarElement.style.width = progressBarWidth + "%";
            }, 100);
        }
        if (this.options.close) {
            const closeIcon = document.createElement('span');
            closeIcon.classList.add(..."absolute right-2 top-2 w-4 cursor-pointer stroke-2".split(' '));
            closeIcon.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    `;
            toastElement.appendChild(closeIcon);
            closeIcon.addEventListener('click', () => {
                this.closeToast(toastElement, progressBarInterval);
            });
        }
        const toastContainer = this.getContainer();
        toastContainer.appendChild(toastElement);
        // Close the toast after this.options.duration
        setTimeout(() => this.closeToast(toastElement, progressBarInterval), this.options.duration);
    }
    getContainer() {
        let toastContainer = document.querySelector(".toast-container");
        if (!toastContainer) {
            toastContainer = document.createElement("div");
            let position = [];
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
            toastContainer.classList.add("fixed", "z-[10000px]", "flex", "max-w-md", "flex-col", "gap-3", "font-sans", "text-base", ...position, "toast-container", "transition-all");
            document.body.appendChild(toastContainer);
        }
        return toastContainer;
    }
    closeToast(toastElement, progressBarInterval) {
        if (progressBarInterval) {
            clearInterval(progressBarInterval);
        }
        toastElement.classList.remove(this.options.animation);
        toastElement.classList.add('fadeOut');
        // Use setTimeout with a named function for clarity
        setTimeout(() => {
            toastElement.remove();
        }, 500);
    }
    success(title, message) {
        this.show({
            type: _Enums__WEBPACK_IMPORTED_MODULE_0__.ToastType.Success,
            title,
            message,
        });
    }
    error(title, message) {
        this.show({
            type: _Enums__WEBPACK_IMPORTED_MODULE_0__.ToastType.Error,
            title,
            message
        });
    }
    warning(title, message) {
        this.show({
            type: _Enums__WEBPACK_IMPORTED_MODULE_0__.ToastType.Warning,
            title,
            message,
        });
    }
    info(title, message) {
        this.show({
            type: _Enums__WEBPACK_IMPORTED_MODULE_0__.ToastType.Info,
            title,
            message,
        });
    }
    getSvgValue(value) {
        // @ts-ignore
        return _Enums__WEBPACK_IMPORTED_MODULE_0__.Icons[value] || '';
    }
    generateToastElement(toastClasses, type) {
        const toastElement = document.createElement("div");
        toastElement.classList.add(..."relative flex translate-x-0 items-center rounded-r-md border-l-4 py-4 pl-3 pr-10 shadow-lg toast".split(' '), type, this.options.animation, ...toastClasses.split(' '));
        return toastElement;
    }
    toastAndProgressBarClasses(type) {
        let toastClasses = "";
        let progressBarClasses = "";
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
        return { toastClasses, progressBarClasses };
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new ToastManager());


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/Index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toast: () => (/* reexport safe */ _ToastManager__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _ToastManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ToastManager */ "./src/ToastManager.ts");


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw4QkFBOEI7QUFDeEI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx3Q0FBd0M7QUFDbEM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzQ0FBc0M7QUFDaEM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzQkFBc0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ21EO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpREFBYTtBQUMvQixtQkFBbUIsa0RBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLHVCQUF1Qiw2Q0FBUyxVQUFVO0FBQ3JELGdCQUFnQixtQ0FBbUM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDZDQUFTO0FBQzNCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDZDQUFTO0FBQzNCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDZDQUFTO0FBQzNCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDZDQUFTO0FBQzNCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsZUFBZSx5Q0FBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlFQUFlLGtCQUFrQixFQUFDOzs7Ozs7O1VDM0tsQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTmtEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9hc3QtbWUvLi9zcmMvRW51bXMudHMiLCJ3ZWJwYWNrOi8vdG9hc3QtbWUvLi9zcmMvVG9hc3RNYW5hZ2VyLnRzIiwid2VicGFjazovL3RvYXN0LW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvYXN0LW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2FzdC1tZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvYXN0LW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9hc3QtbWUvLi9zcmMvSW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRW51bXMgZm9yIHRvYXN0IHR5cGUgYW5kIGFuaW1hdGlvbiB0eXBlXG5leHBvcnQgdmFyIFRvYXN0VHlwZTtcbihmdW5jdGlvbiAoVG9hc3RUeXBlKSB7XG4gICAgVG9hc3RUeXBlW1wiU3VjY2Vzc1wiXSA9IFwic3VjY2Vzc1wiO1xuICAgIFRvYXN0VHlwZVtcIkVycm9yXCJdID0gXCJlcnJvclwiO1xuICAgIFRvYXN0VHlwZVtcIldhcm5pbmdcIl0gPSBcIndhcm5pbmdcIjtcbiAgICBUb2FzdFR5cGVbXCJJbmZvXCJdID0gXCJpbmZvXCI7XG4gICAgVG9hc3RUeXBlW1wiRGVmYXVsdFwiXSA9IFwiZGVmYXVsdFwiO1xufSkoVG9hc3RUeXBlIHx8IChUb2FzdFR5cGUgPSB7fSkpO1xuZXhwb3J0IHZhciBUb2FzdEFuaW1hdGlvbjtcbihmdW5jdGlvbiAoVG9hc3RBbmltYXRpb24pIHtcbiAgICBUb2FzdEFuaW1hdGlvbltcIlNsaWRlSW5VcFwiXSA9IFwic2xpZGVJblVwXCI7XG4gICAgVG9hc3RBbmltYXRpb25bXCJTbGlkZVVwXCJdID0gXCJzbGlkZVVwXCI7XG4gICAgVG9hc3RBbmltYXRpb25bXCJTbGlkZURvd25cIl0gPSBcInNsaWRlRG93blwiO1xuICAgIFRvYXN0QW5pbWF0aW9uW1wiU2xpZGVSaWdodFwiXSA9IFwic2xpZGVSaWdodFwiO1xuICAgIFRvYXN0QW5pbWF0aW9uW1wiU2xpZGVMZWZ0XCJdID0gXCJzbGlkZUxlZnRcIjtcbiAgICBUb2FzdEFuaW1hdGlvbltcIkZhZGVJblwiXSA9IFwiZmFkZUluXCI7XG4gICAgLy8gQWRkIG1vcmUgYW5pbWF0aW9uIHR5cGVzIGFzIG5lZWRlZFxufSkoVG9hc3RBbmltYXRpb24gfHwgKFRvYXN0QW5pbWF0aW9uID0ge30pKTtcbmV4cG9ydCB2YXIgVG9hc3RQb3NpdGlvbjtcbihmdW5jdGlvbiAoVG9hc3RQb3NpdGlvbikge1xuICAgIFRvYXN0UG9zaXRpb25bXCJUb3BSaWdodFwiXSA9IFwidG9wLXJpZ2h0XCI7XG4gICAgVG9hc3RQb3NpdGlvbltcIlRvcExlZnRcIl0gPSBcInRvcC1sZWZ0XCI7XG4gICAgVG9hc3RQb3NpdGlvbltcIkJvdHRvbVJpZ2h0XCJdID0gXCJib3R0b20tcmlnaHRcIjtcbiAgICBUb2FzdFBvc2l0aW9uW1wiQm90dG9tTGVmdFwiXSA9IFwiYm90dG9tLWxlZnRcIjtcbn0pKFRvYXN0UG9zaXRpb24gfHwgKFRvYXN0UG9zaXRpb24gPSB7fSkpO1xuZXhwb3J0IHZhciBJY29ucztcbihmdW5jdGlvbiAoSWNvbnMpIHtcbiAgICBJY29uc1tcInN1Y2Nlc3NcIl0gPSBcIiA8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgZmlsbD1cXFwibm9uZVxcXCIgY2xhc3M9XFxcImgtOCB3LTggc3Ryb2tlLTJcXFwiIHZpZXdCb3g9XFxcIjAgMCAyNCAyNFxcXCIgIHN0cm9rZT1cXFwiY3VycmVudENvbG9yXFxcIiA+XFxuICA8cGF0aCBzdHJva2UtbGluZWNhcD1cXFwicm91bmRcXFwiIHN0cm9rZS1saW5lam9pbj1cXFwicm91bmRcXFwiIGQ9XFxcIk05IDEyLjc1TDExLjI1IDE1IDE1IDkuNzVtLTMtNy4wMzZBMTEuOTU5IDExLjk1OSAwIDAxMy41OTggNiAxMS45OSAxMS45OSAwIDAwMyA5Ljc0OWMwIDUuNTkyIDMuODI0IDEwLjI5IDkgMTEuNjIzIDUuMTc2LTEuMzMyIDktNi4wMyA5LTExLjYyMiAwLTEuMzEtLjIxLTIuNTcxLS41OTgtMy43NTFoLS4xNTJjLTMuMTk2IDAtNi4xLTEuMjQ4LTguMjUtMy4yODV6XFxcIiAvPlxcbjwvc3ZnPlxcblwiO1xuICAgIEljb25zW1wiaW5mb1wiXSA9IFwiPHN2ZyB4bWxucz1cXFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcXFwiIGZpbGw9XFxcIm5vbmVcXFwiIGNsYXNzPVxcXCJoLTggdy04IHN0cm9rZS0yXFxcIiB2aWV3Qm94PVxcXCIwIDAgMjQgMjRcXFwiIHN0cm9rZT1cXFwiY3VycmVudENvbG9yXFxcIj5cXG4gIDxwYXRoIHN0cm9rZS1saW5lY2FwPVxcXCJyb3VuZFxcXCIgc3Ryb2tlLWxpbmVqb2luPVxcXCJyb3VuZFxcXCIgZD1cXFwiTTExLjI1IDExLjI1bC4wNDEtLjAyYS43NS43NSAwIDAxMS4wNjMuODUybC0uNzA4IDIuODM2YS43NS43NSAwIDAwMS4wNjMuODUzbC4wNDEtLjAyMU0yMSAxMmE5IDkgMCAxMS0xOCAwIDkgOSAwIDAxMTggMHptLTktMy43NWguMDA4di4wMDhIMTJWOC4yNXpcXFwiIC8+XFxuPC9zdmc+XCI7XG4gICAgSWNvbnNbXCJ3YXJuaW5nXCJdID0gXCI8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgZmlsbD1cXFwibm9uZVxcXCIgY2xhc3M9XFxcImgtOCB3LTggc3Ryb2tlLTJcXFwiIHZpZXdCb3g9XFxcIjAgMCAyNCAyNFxcXCIgIHN0cm9rZT1cXFwiY3VycmVudENvbG9yXFxcIiA+XFxuICA8cGF0aCBzdHJva2UtbGluZWNhcD1cXFwicm91bmRcXFwiIHN0cm9rZS1saW5lam9pbj1cXFwicm91bmRcXFwiIGQ9XFxcIk0xMiA5djMuNzVtLTkuMzAzIDMuMzc2Yy0uODY2IDEuNS4yMTcgMy4zNzQgMS45NDggMy4zNzRoMTQuNzFjMS43MyAwIDIuODEzLTEuODc0IDEuOTQ4LTMuMzc0TDEzLjk0OSAzLjM3OGMtLjg2Ni0xLjUtMy4wMzItMS41LTMuODk4IDBMMi42OTcgMTYuMTI2ek0xMiAxNS43NWguMDA3di4wMDhIMTJ2LS4wMDh6XFxcIiAvPlxcbjwvc3ZnPlwiO1xuICAgIEljb25zW1wiZXJyb3JcIl0gPSBcIiA8c3ZnIHhtbG5zPVxcXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1xcXCIgZmlsbD1cXFwibm9uZVxcXCIgY2xhc3M9XFxcImgtOCB3LTggc3Ryb2tlLTJcXFwiIHZpZXdCb3g9XFxcIjAgMCAyNCAyNFxcXCIgc3Ryb2tlPVxcXCJjdXJyZW50Q29sb3JcXFwiPlxcbiAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9XFxcInJvdW5kXFxcIiBzdHJva2UtbGluZWpvaW49XFxcInJvdW5kXFxcIiBkPVxcXCJNOS43NSA5Ljc1bDQuNSA0LjVtMC00LjVsLTQuNSA0LjVNMjEgMTJhOSA5IDAgMTEtMTggMCA5IDkgMCAwMTE4IDB6XFxcIiAvPlxcbjwvc3ZnPlwiO1xufSkoSWNvbnMgfHwgKEljb25zID0ge30pKTtcbiIsImltcG9ydCB7IEljb25zLCBUb2FzdEFuaW1hdGlvbiwgVG9hc3RQb3NpdGlvbiwgVG9hc3RUeXBlIH0gZnJvbSAnLi9FbnVtcyc7XG5jbGFzcyBUb2FzdE1hbmFnZXIge1xuICAgIF9vcHRpb25zO1xuICAgIGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICBwb3NpdGlvbjogVG9hc3RQb3NpdGlvbi5Ub3BSaWdodCxcbiAgICAgICAgYW5pbWF0aW9uOiBUb2FzdEFuaW1hdGlvbi5TbGlkZUluVXAsXG4gICAgICAgIGR1cmF0aW9uOiA1MDAwLFxuICAgICAgICBjbG9zZTogdHJ1ZSxcbiAgICAgICAgcHJvZ3Jlc3M6IHRydWVcbiAgICB9O1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0geyAuLi50aGlzLmRlZmF1bHRPcHRpb25zLCAuLi50aGlzLm9wdGlvbnMgfTtcbiAgICB9XG4gICAgZ2V0IG9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICAgIH1cbiAgICBzZXQgb3B0aW9ucyh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0geyAuLi50aGlzLmRlZmF1bHRPcHRpb25zLCAuLi52YWx1ZSB9O1xuICAgIH1cbiAgICB3aXRoT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzaG93KHsgdGl0bGUsIG1lc3NhZ2UsIHR5cGUgPSBUb2FzdFR5cGUuRGVmYXVsdCB9KSB7XG4gICAgICAgIGNvbnN0IHsgdG9hc3RDbGFzc2VzLCBwcm9ncmVzc0JhckNsYXNzZXMgfSA9IHRoaXMudG9hc3RBbmRQcm9ncmVzc0JhckNsYXNzZXModHlwZSk7XG4gICAgICAgIGNvbnN0IHRvYXN0RWxlbWVudCA9IHRoaXMuZ2VuZXJhdGVUb2FzdEVsZW1lbnQodG9hc3RDbGFzc2VzLCB0eXBlKTtcbiAgICAgICAgY29uc3QgaWNvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBpY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLlwiaW5saW5lLWJsb2NrIHByLTIgYWxpZ24tbWlkZGxlIHRleHQteGxcIi5zcGxpdCgnICcpKTtcbiAgICAgICAgdG9hc3RFbGVtZW50LmFwcGVuZENoaWxkKGljb25FbGVtZW50KTtcbiAgICAgICAgY29uc3QgY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb250ZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLlwiaW5saW5lLWJsb2NrIGFsaWduLW1pZGRsZVwiLnNwbGl0KCcgJykpO1xuICAgICAgICB0b2FzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGVudEVsZW1lbnQpO1xuICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgICAgaWNvbkVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5nZXRTdmdWYWx1ZSh0eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0aXRsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aXRsZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImZvbnQtc2VtaWJvbGRcIik7XG4gICAgICAgIHRpdGxlRWxlbWVudC50ZXh0Q29udGVudCA9IHRpdGxlIHx8IFwiXCI7XG4gICAgICAgIGNvbnRlbnRFbGVtZW50LmFwcGVuZENoaWxkKHRpdGxlRWxlbWVudCk7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbWVzc2FnZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCguLi5cImZvbnQtbGlnaHQgbGVhZGluZy02XCIuc3BsaXQoJyAnKSk7XG4gICAgICAgIG1lc3NhZ2VFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZSB8fCBcIlwiO1xuICAgICAgICBjb250ZW50RWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlRWxlbWVudCk7XG4gICAgICAgIGxldCBwcm9ncmVzc0JhckludGVydmFsID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wcm9ncmVzcykge1xuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NCYXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHByb2dyZXNzQmFyRWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLlwiYWJzb2x1dGUgYm90dG9tLTAgbGVmdC0wIGgtMSB3LWZ1bGwgYmctZ3JheS00MDBcIi5zcGxpdCgnICcpLCBwcm9ncmVzc0JhckNsYXNzZXMpO1xuICAgICAgICAgICAgdG9hc3RFbGVtZW50LmFwcGVuZENoaWxkKHByb2dyZXNzQmFyRWxlbWVudCk7XG4gICAgICAgICAgICAvLyBNYW5hZ2UgdGhlIHByb2dyZXNzQmFyXG4gICAgICAgICAgICBsZXQgY29tcHV0ZWREdXJhdGlvbiA9IHRoaXMub3B0aW9ucy5kdXJhdGlvbjtcbiAgICAgICAgICAgIHByb2dyZXNzQmFySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29tcHV0ZWREdXJhdGlvbiA9IGNvbXB1dGVkRHVyYXRpb24gLSAxMDA7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NCYXJXaWR0aCA9ICgxMDAgKiBjb21wdXRlZER1cmF0aW9uKSAvIHRoaXMub3B0aW9ucy5kdXJhdGlvbjtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0JhckVsZW1lbnQuc3R5bGUud2lkdGggPSBwcm9ncmVzc0JhcldpZHRoICsgXCIlXCI7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY2xvc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsb3NlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIGNsb3NlSWNvbi5jbGFzc0xpc3QuYWRkKC4uLlwiYWJzb2x1dGUgcmlnaHQtMiB0b3AtMiB3LTQgY3Vyc29yLXBvaW50ZXIgc3Ryb2tlLTJcIi5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgIGNsb3NlSWNvbi5pbm5lckhUTUwgPSBgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIgZD1cIk02IDE4TDE4IDZNNiA2bDEyIDEyXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIHRvYXN0RWxlbWVudC5hcHBlbmRDaGlsZChjbG9zZUljb24pO1xuICAgICAgICAgICAgY2xvc2VJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VUb2FzdCh0b2FzdEVsZW1lbnQsIHByb2dyZXNzQmFySW50ZXJ2YWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdG9hc3RDb250YWluZXIgPSB0aGlzLmdldENvbnRhaW5lcigpO1xuICAgICAgICB0b2FzdENvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2FzdEVsZW1lbnQpO1xuICAgICAgICAvLyBDbG9zZSB0aGUgdG9hc3QgYWZ0ZXIgdGhpcy5vcHRpb25zLmR1cmF0aW9uXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jbG9zZVRvYXN0KHRvYXN0RWxlbWVudCwgcHJvZ3Jlc3NCYXJJbnRlcnZhbCksIHRoaXMub3B0aW9ucy5kdXJhdGlvbik7XG4gICAgfVxuICAgIGdldENvbnRhaW5lcigpIHtcbiAgICAgICAgbGV0IHRvYXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2FzdC1jb250YWluZXJcIik7XG4gICAgICAgIGlmICghdG9hc3RDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRvYXN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IFtdO1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLm9wdGlvbnMucG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlICd0b3AtbGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gW1wibGVmdC0xMFwiLCBcInRvcC0xMFwiXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tLWxlZnQnOlxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IFtcImxlZnQtMTBcIiwgXCJib3R0b20tMTBcIl07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2JvdHRvbS1yaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gW1wiYm90dG9tLTEwXCIsIFwicmlnaHQtMTBcIl07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3RvcC1yaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gW1wicmlnaHQtMTBcIiwgXCJ0b3AtMTBcIl07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gW1wicmlnaHQtMTBcIiwgXCJ0b3AtMTBcIl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2FzdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZml4ZWRcIiwgXCJ6LVsxMDAwMHB4XVwiLCBcImZsZXhcIiwgXCJtYXgtdy1tZFwiLCBcImZsZXgtY29sXCIsIFwiZ2FwLTNcIiwgXCJmb250LXNhbnNcIiwgXCJ0ZXh0LWJhc2VcIiwgLi4ucG9zaXRpb24sIFwidG9hc3QtY29udGFpbmVyXCIsIFwidHJhbnNpdGlvbi1hbGxcIik7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRvYXN0Q29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9hc3RDb250YWluZXI7XG4gICAgfVxuICAgIGNsb3NlVG9hc3QodG9hc3RFbGVtZW50LCBwcm9ncmVzc0JhckludGVydmFsKSB7XG4gICAgICAgIGlmIChwcm9ncmVzc0JhckludGVydmFsKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHByb2dyZXNzQmFySW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICAgIHRvYXN0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMub3B0aW9ucy5hbmltYXRpb24pO1xuICAgICAgICB0b2FzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmFkZU91dCcpO1xuICAgICAgICAvLyBVc2Ugc2V0VGltZW91dCB3aXRoIGEgbmFtZWQgZnVuY3Rpb24gZm9yIGNsYXJpdHlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0b2FzdEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH0sIDUwMCk7XG4gICAgfVxuICAgIHN1Y2Nlc3ModGl0bGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5zaG93KHtcbiAgICAgICAgICAgIHR5cGU6IFRvYXN0VHlwZS5TdWNjZXNzLFxuICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZXJyb3IodGl0bGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5zaG93KHtcbiAgICAgICAgICAgIHR5cGU6IFRvYXN0VHlwZS5FcnJvcixcbiAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgd2FybmluZyh0aXRsZSwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLnNob3coe1xuICAgICAgICAgICAgdHlwZTogVG9hc3RUeXBlLldhcm5pbmcsXG4gICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpbmZvKHRpdGxlLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuc2hvdyh7XG4gICAgICAgICAgICB0eXBlOiBUb2FzdFR5cGUuSW5mbyxcbiAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldFN2Z1ZhbHVlKHZhbHVlKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIEljb25zW3ZhbHVlXSB8fCAnJztcbiAgICB9XG4gICAgZ2VuZXJhdGVUb2FzdEVsZW1lbnQodG9hc3RDbGFzc2VzLCB0eXBlKSB7XG4gICAgICAgIGNvbnN0IHRvYXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRvYXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKC4uLlwicmVsYXRpdmUgZmxleCB0cmFuc2xhdGUteC0wIGl0ZW1zLWNlbnRlciByb3VuZGVkLXItbWQgYm9yZGVyLWwtNCBweS00IHBsLTMgcHItMTAgc2hhZG93LWxnIHRvYXN0XCIuc3BsaXQoJyAnKSwgdHlwZSwgdGhpcy5vcHRpb25zLmFuaW1hdGlvbiwgLi4udG9hc3RDbGFzc2VzLnNwbGl0KCcgJykpO1xuICAgICAgICByZXR1cm4gdG9hc3RFbGVtZW50O1xuICAgIH1cbiAgICB0b2FzdEFuZFByb2dyZXNzQmFyQ2xhc3Nlcyh0eXBlKSB7XG4gICAgICAgIGxldCB0b2FzdENsYXNzZXMgPSBcIlwiO1xuICAgICAgICBsZXQgcHJvZ3Jlc3NCYXJDbGFzc2VzID0gXCJcIjtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgICAgICAgICB0b2FzdENsYXNzZXMgPSBcImJvcmRlci1ncmVlbi02MDAgYmctZ3JlZW4tNTAwIHRleHQtd2hpdGVcIjtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0JhckNsYXNzZXMgPSBcImJnLWdyZWVuLTYwMFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgICAgIHRvYXN0Q2xhc3NlcyA9IFwiYm9yZGVyLXJlZC03MDAgYmctcmVkLTUwMCB0ZXh0LXdoaXRlXCI7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXJDbGFzc2VzID0gXCJiZy1yZWQtNzAwXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpbmZvJzpcbiAgICAgICAgICAgICAgICB0b2FzdENsYXNzZXMgPSBcImJvcmRlci1ibHVlLTYwMCBiZy1ibHVlLTUwMCB0ZXh0LXdoaXRlXCI7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXJDbGFzc2VzID0gXCJiZy1ibHVlLTYwMFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgICAgICAgICAgdG9hc3RDbGFzc2VzID0gXCJib3JkZXIteWVsbG93LTYwMCBiZy15ZWxsb3ctNTAwIHRleHQtd2hpdGVcIjtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0JhckNsYXNzZXMgPSBcImJnLXllbGxvdy02MDBcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyB0b2FzdENsYXNzZXMsIHByb2dyZXNzQmFyQ2xhc3NlcyB9O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IG5ldyBUb2FzdE1hbmFnZXIoKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IHsgZGVmYXVsdCBhcyB0b2FzdCB9IGZyb20gXCIuL1RvYXN0TWFuYWdlclwiO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9