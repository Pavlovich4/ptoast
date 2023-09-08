import toastManager from './ToastManager'

document.addEventListener("DOMContentLoaded", function () {
    /*const toastManager = toastManager({
      position: "bottom-left",
      duration: 7000,
    });*/
    
    toastManager.options = {
        duration: 10000
    }
  
    const showToastButton = document.getElementById("show-toast");
  
    showToastButton?.addEventListener("click", function () {
      console.log('here');
      toastManager.error("Here is the title", "This is a success toast message.", "fas fa-check-circle");
    });
  });