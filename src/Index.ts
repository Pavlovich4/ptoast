import toastManager from './ToastManager'
import {ToastAnimation} from "./Enums";

document.addEventListener("DOMContentLoaded", function () {
    /*const toastManager = toastManager({
      position: "bottom-left",
      duration: 7000,
    });*/
    
    toastManager.options = {
        animation: ToastAnimation.FadeIn,
    }
  
    const showToastButton = document.getElementById("show-toast");
  
    showToastButton?.addEventListener("click", function () {
      console.log('here');
      toastManager.info("Here is the title", "This is a success toast message.", "fas fa-check-circle");
      toastManager.error("Here is the title", "This is a success toast message.", "fas fa-check-circle");
      toastManager.warning("Here is the title", "This is a success toast message.", "fas fa-check-circle");
      toastManager.success("Here is the title", "This is a success toast message.", "fas fa-check-circle");
    });
  });