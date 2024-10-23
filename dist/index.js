"use strict";
document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('createIframeButton');
    if (button) {
        button.addEventListener('click', createIframe);
    }
});
function isInIframe() {
    return window.self !== window.top;
}
function getCurrentDomain() {
    return window.location.origin;
}
function onBoot() {
    var introElement = document.getElementById('intro');
    if (introElement) {
        introElement.textContent = isInIframe() ? "Hosted in an Iframe on ".concat(getCurrentDomain()) : "Hosted on ".concat(getCurrentDomain());
    }
    if (isInIframe()) {
        var button = document.getElementById('createIframeButton');
        if (button) {
            button.style.display = 'none';
        }
    }
}
function createIframe() {
    var iframeContainer = document.getElementById('iframeContainer');
    if (iframeContainer) {
        iframeContainer.innerHTML = ''; // Clear the container before adding a new iframe
        var iframe = document.createElement('iframe');
        iframe.src = 'http://127.0.0.1:8080/';
        iframe.width = "".concat(window.innerWidth * 0.5, "px"); // Set the width to 50% of the window width
        iframe.height = "".concat(window.innerHeight * 0.5, "px"); // Set the height to 50% of the window height
        iframeContainer.appendChild(iframe);
    }
    var introElement = document.getElementById('subText');
    if (introElement) {
        introElement.textContent = "IFRAME was (re)created at ".concat(new Date().toLocaleTimeString());
    }
}
onBoot();
