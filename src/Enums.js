"use strict";
exports.__esModule = true;
exports.Icons = exports.ToastPosition = exports.ToastAnimation = exports.ToastType = void 0;
// Enums for toast type and animation type
var ToastType;
(function (ToastType) {
    ToastType["Success"] = "success";
    ToastType["Error"] = "error";
    ToastType["Warning"] = "warning";
    ToastType["Info"] = "info";
    ToastType["Default"] = "default";
})(ToastType = exports.ToastType || (exports.ToastType = {}));
var ToastAnimation;
(function (ToastAnimation) {
    ToastAnimation["SlideInUp"] = "slideInUp";
    ToastAnimation["SlideUp"] = "slideUp";
    ToastAnimation["SlideDown"] = "slideDown";
    ToastAnimation["SlideRight"] = "slideRight";
    ToastAnimation["SlideLeft"] = "slideLeft";
    ToastAnimation["FadeIn"] = "fadeIn";
    // Add more animation types as needed
})(ToastAnimation = exports.ToastAnimation || (exports.ToastAnimation = {}));
var ToastPosition;
(function (ToastPosition) {
    ToastPosition["TopRight"] = "top-right";
    ToastPosition["TopLeft"] = "top-left";
    ToastPosition["BottomRight"] = "bottom-right";
    ToastPosition["BottomLeft"] = "bottom-left";
})(ToastPosition = exports.ToastPosition || (exports.ToastPosition = {}));
var Icons;
(function (Icons) {
    Icons["success"] = " <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" class=\"h-8 w-8 stroke-2\" viewBox=\"0 0 24 24\"  stroke=\"currentColor\" >\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z\" />\n</svg>\n";
    Icons["info"] = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" class=\"h-8 w-8 stroke-2\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z\" />\n</svg>";
    Icons["warning"] = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" class=\"h-8 w-8 stroke-2\" viewBox=\"0 0 24 24\"  stroke=\"currentColor\" >\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z\" />\n</svg>";
    Icons["error"] = " <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" class=\"h-8 w-8 stroke-2\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />\n</svg>";
})(Icons = exports.Icons || (exports.Icons = {}));
