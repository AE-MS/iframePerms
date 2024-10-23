document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('createIframeButton');
    if (button) {
        button.addEventListener('click', createIframe);
    }
});

function isInIframe(): boolean {
    return window.self !== window.top;
}

function getCurrentDomain(): string {
    return window.location.origin;
}

function onBoot() {
    const introElement = document.getElementById('intro');
    if (introElement) {
        introElement.textContent = isInIframe() ? `Hosted in an Iframe on ${getCurrentDomain()}` : `Hosted on ${getCurrentDomain()}`;
    }

    if (isInIframe()) {
        const button = document.getElementById('createIframeButton');
        if (button) {
            button.style.display = 'none';
        }
    }
}

function createIframe() {

    const iframeContainer = document.getElementById('iframeContainer');
    if (iframeContainer) {
        iframeContainer.innerHTML = ''; // Clear the container before adding a new iframe
        const iframe = document.createElement('iframe');
        iframe.src = 'http://127.0.0.1:8080/';
        iframe.width = `${window.innerWidth * 0.5}px`; // Set the width to 50% of the window width
        iframe.height = `${window.innerHeight * 0.5}px`; // Set the height to 50% of the window height
        iframe.sandbox.add('allow-scripts');
        iframeContainer.appendChild(iframe);
    }

    const introElement = document.getElementById('subText');
    if (introElement) {
        introElement.textContent = `IFRAME was (re)created at ${new Date().toLocaleTimeString()}`;
    }
}

onBoot();
