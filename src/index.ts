document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("createIframeButton")!.addEventListener("click", createIframe);
  document.getElementById("getLocationButton")!.addEventListener("click", getLocation);
});

function isInIframe(): boolean {
  return window.self !== window.top;
}

function getCurrentDomain(): string {
  return window.location.hostname;
}

function onBoot() {
  const introElement = document.getElementById("intro");
  if (introElement) {
    introElement.textContent = isInIframe()
      ? `Hosted in an IFRAME on ${getCurrentDomain()}`
      : `Hosted on ${getCurrentDomain()}`;
  }

  if (!isInIframe()) {
    document.getElementById("createIframeButton")!.style.display = "block";
    document.getElementById("sandboxDiv")!.style.display = "block";
    document.getElementById("allowDiv")!.style.display = "block";
    document.getElementById("iframeUrlDiv")!.style.display = "block";
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        document.getElementById(
          "subText"
        )!.textContent = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
      },
      (error) => {
        document.getElementById("subText")!.textContent = `Error: ${error.message}`;
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function createIframe() {
  const iframeContainer = document.getElementById("iframeContainer");
  if (iframeContainer) {
    iframeContainer.innerHTML = ""; // Clear the container before adding a new iframe
    const iframe = document.createElement("iframe");
    iframe.width = `${window.innerWidth * 0.5}px`; // Set the width to 50% of the window width
    iframe.height = `${window.innerHeight * 0.5}px`; // Set the height to 50% of the window height

    const iframeUrl = document.getElementById("iframeUrl") as HTMLInputElement;
    iframe.src = iframeUrl.value;

    const sandboxAttributeInput = document.getElementById("sandboxAttribute") as HTMLInputElement;
    const sandboxAttributes = sandboxAttributeInput.value.split(" ");
    sandboxAttributes.forEach((attr) => iframe.sandbox.add(attr));

    const allowAttributeInput = document.getElementById("allowAttribute") as HTMLInputElement;
    iframe.allow = allowAttributeInput.value;

    iframeContainer.appendChild(iframe);
  }

  const introElement = document.getElementById("subText");
  if (introElement) {
    introElement.textContent = `IFRAME was (re)created at ${new Date().toLocaleTimeString()}`;
  }
}

onBoot();
