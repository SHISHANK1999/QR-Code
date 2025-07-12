const qrContainer = document.getElementById("qrcode");
const downloadBtn = document.getElementById("download");

document.getElementById("generate").addEventListener("click", () => {
  const url = document.getElementById("qr-text").value.trim();
  if (!url) {
    alert("Please enter a valid URL");
    return;
  }

  qrContainer.innerHTML = "";                // पुराना QR हटाएं
  qrContainer.classList.remove("hidden");   // दिखाने के लिए क्लास हटाएं

  new QRCode(qrContainer, {
    text: url,
    width: 256,
    height: 256,
    colorDark: "#000",
    colorLight: "#fff",
    correctLevel: QRCode.CorrectLevel.H
  });

  downloadBtn.disabled = false;
  downloadBtn.onclick = () => {
    const img = qrContainer.querySelector("img") || qrContainer.querySelector("canvas");
    const dataURL = img.tagName === "IMG" ? img.src : img.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataURL;
    a.download = "QR_Code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
});
