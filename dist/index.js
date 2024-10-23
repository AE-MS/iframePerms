"use strict";
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("createIframeButton").addEventListener("click", createIframe);
    document.getElementById("getLocationButton").addEventListener("click", getLocation);
});
function isInIframe() {
    return window.self !== window.top;
}
function getCurrentDomain() {
    return window.location.hostname;
}
function onBoot() {
    var introElement = document.getElementById("intro");
    if (introElement) {
        introElement.textContent = isInIframe()
            ? "Hosted in an IFRAME on ".concat(getCurrentDomain())
            : "Hosted on ".concat(getCurrentDomain());
    }
    if (!isInIframe()) {
        document.getElementById("createIframeButton").style.display = "block";
        document.getElementById("sandboxDiv").style.display = "block";
        document.getElementById("allowDiv").style.display = "block";
        document.getElementById("iframeUrlDiv").style.display = "block";
    }
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            document.getElementById("subText").textContent = "Latitude: ".concat(position.coords.latitude, ", Longitude: ").concat(position.coords.longitude);
        }, function (error) {
            document.getElementById("subText").textContent = "Error: ".concat(error.message);
        });
    }
    else {
        alert("Geolocation is not supported by this browser.");
    }
}
function createIframe() {
    var iframeContainer = document.getElementById("iframeContainer");
    if (iframeContainer) {
        iframeContainer.innerHTML = ""; // Clear the container before adding a new iframe
        var iframe_1 = document.createElement("iframe");
        iframe_1.width = "".concat(window.innerWidth * 0.5, "px"); // Set the width to 50% of the window width
        iframe_1.height = "".concat(window.innerHeight * 0.5, "px"); // Set the height to 50% of the window height
        var iframeUrl = document.getElementById("iframeUrl");
        iframe_1.src = iframeUrl.value;
        var sandboxAttributeInput = document.getElementById("sandboxAttribute");
        var sandboxAttributes = sandboxAttributeInput.value.split(" ");
        sandboxAttributes.forEach(function (attr) { return iframe_1.sandbox.add(attr); });
        var allowAttributeInput = document.getElementById("allowAttribute");
        iframe_1.allow = allowAttributeInput.value;
        iframeContainer.appendChild(iframe_1);
    }
    var introElement = document.getElementById("subText");
    if (introElement) {
        introElement.textContent = "IFRAME was (re)created at ".concat(new Date().toLocaleTimeString());
    }
}
onBoot();
