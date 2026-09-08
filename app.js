import { ESPLoader, Transport } from "https://unpkg.com/esptool-js@0.6.1/bundle.js";

const translations = {
  tr: {
    pageTitle: "Nuve Yazılım Yükleme",
    description: "Nuve yazılımını cihazınıza USB üzerinden yükleyin.",
    heading: "Nuve Yazılım Yükleme",
    lead: "Nuve yazılımını cihazınıza USB üzerinden yükleyin.",
    noticeTitle: "Bilmeniz gereken",
    noticeText: "Wi‑Fi, konum ve kişisel ayarlar sıfırlanır. Yüklemeden sonra bunları cihazdan yeniden ayarlarsınız.",
    stepBrowserTitle: "Bilgisayardan açın",
    stepBrowserText: "Chrome veya Edge kullanın.",
    stepUsbTitle: "Cihazı USB ile bağlayın",
    stepUsbText: "Veri aktarımını destekleyen bir USB kablosu kullanın.",
    stepInstallTitle: "Yazılımı yükleyin",
    stepInstallText: "Listeden USB JTAG/serial debug unit yazan cihazı seçin.",
    installButton: "Yazılımı Yükle",
    unsupported: "Bu tarayıcı USB yüklemeyi desteklemiyor. Bilgisayarda güncel Chrome veya Edge kullanın.",
    connectionHelpTitle: "Cihaz görünüyor ama bağlanmıyor mu?",
    connectionHelpIntro: "Şu adımları uygulayıp tekrar deneyin:",
    closePrograms: "Seri monitörü ve cihazı kullanan diğer programları kapatın.",
    holdBoot: "BOOT tuşunu basılı tutun.",
    pressReset: "BOOT basılıyken RESET/RST tuşuna bir kez basıp bırakın.",
    releaseBoot: "BOOT tuşunu bırakın.",
    retryText: "Yazılımı Yükle düğmesine tekrar basın ve aynı cihazı seçin.",
    notFoundTitle: "Cihaz listede görünmüyor mu?",
    notFoundText: "Başka bir veri USB kablosu veya bilgisayardaki başka bir USB girişi deneyin.",
    versionText: "Yazılım sürümü: v1.0.13 · Yalnızca Nuve cihazları içindir.",
    connectingTitle: "Cihazınızı seçin",
    connectingText: "Açılan pencereden Nuve cihazınızı seçin.",
    preparingTitle: "Yükleme hazırlanıyor",
    preparingText: "Cihazla bağlantı kuruluyor. USB kablosunu çıkarmayın.",
    downloadingTitle: "Yazılım hazırlanıyor",
    downloadingText: "Yükleme dosyaları indiriliyor.",
    installingTitle: "Yazılım yükleniyor",
    installingText: "USB kablosunu çıkarmayın veya bilgisayarı kapatmayın.",
    successTitle: "Yükleme tamamlandı",
    successText: "Cihaz birkaç saniye içinde açılmazsa USB kablosunu çıkarıp tekrar takın.",
    connectionErrorTitle: "Cihazla bağlantı kurulamadı",
    connectionErrorText: "Doğru USB cihazını seçin ve seri monitörü kapatın. Bağlanmazsa BOOT’a basılı tutup RESET/RST’ye bir kez basın.",
    downloadErrorTitle: "Yazılım indirilemedi",
    downloadErrorText: "İnternet bağlantınızı kontrol edip tekrar deneyin.",
    deviceErrorTitle: "Bu cihaz desteklenmiyor",
    deviceErrorText: "Yalnızca Nuve ESP32‑S3 cihazını seçin.",
    installErrorTitle: "Yükleme tamamlanamadı",
    installErrorText: "Cihazı yeniden bağlayıp tekrar deneyin.",
    retryButton: "Tekrar Dene",
    closeButton: "Kapat"
  },
  en: {
    pageTitle: "Nuve Software Installation",
    description: "Install Nuve software on your device over USB.",
    heading: "Nuve Software Installation",
    lead: "Install Nuve software on your device over USB.",
    noticeTitle: "Before you continue",
    noticeText: "Wi‑Fi, location, and personal settings will be reset. You can set them again on the device after installation.",
    stepBrowserTitle: "Use a computer",
    stepBrowserText: "Open this page in Chrome or Edge.",
    stepUsbTitle: "Connect the device with USB",
    stepUsbText: "Use a USB cable that supports data transfer.",
    stepInstallTitle: "Install the software",
    stepInstallText: "Select the device named USB JTAG/serial debug unit.",
    installButton: "Install Software",
    unsupported: "This browser does not support USB installation. Use an up-to-date version of Chrome or Edge on a computer.",
    connectionHelpTitle: "Device appears but will not connect?",
    connectionHelpIntro: "Follow these steps and try again:",
    closePrograms: "Close the serial monitor and any other program using the device.",
    holdBoot: "Press and hold the BOOT button.",
    pressReset: "While holding BOOT, press and release RESET/RST once.",
    releaseBoot: "Release the BOOT button.",
    retryText: "Press Install Software again and select the same device.",
    notFoundTitle: "Device does not appear in the list?",
    notFoundText: "Try another data USB cable or another USB port on your computer.",
    versionText: "Software version: v1.0.13 · For Nuve devices only.",
    connectingTitle: "Select your device",
    connectingText: "Select your Nuve device in the browser window.",
    preparingTitle: "Preparing installation",
    preparingText: "Connecting to the device. Do not unplug the USB cable.",
    downloadingTitle: "Preparing software",
    downloadingText: "Downloading the installation files.",
    installingTitle: "Installing software",
    installingText: "Do not unplug the USB cable or turn off the computer.",
    successTitle: "Installation complete",
    successText: "If the device does not start within a few seconds, unplug and reconnect the USB cable.",
    connectionErrorTitle: "Could not connect to the device",
    connectionErrorText: "Select the correct USB device and close the serial monitor. If it does not connect, hold BOOT and press RESET/RST once.",
    downloadErrorTitle: "Could not download the software",
    downloadErrorText: "Check your internet connection and try again.",
    deviceErrorTitle: "This device is not supported",
    deviceErrorText: "Select a Nuve ESP32‑S3 device.",
    installErrorTitle: "Installation could not be completed",
    installErrorText: "Reconnect the device and try again.",
    retryButton: "Try Again",
    closeButton: "Close"
  }
};

const elements = {
  languageButtons: document.querySelectorAll("[data-language]"),
  description: document.querySelector('meta[name="description"]'),
  installButton: document.querySelector("#install-button"),
  supportError: document.querySelector("#support-error"),
  dialog: document.querySelector("#install-dialog"),
  statusIcon: document.querySelector("#status-icon"),
  statusTitle: document.querySelector("#status-title"),
  statusText: document.querySelector("#status-text"),
  progressWrap: document.querySelector("#progress-wrap"),
  progress: document.querySelector("#install-progress"),
  progressValue: document.querySelector("#progress-value"),
  actions: document.querySelector("#dialog-actions"),
  retryButton: document.querySelector("#retry-button"),
  closeButton: document.querySelector("#close-button")
};

let currentLanguage = "tr";
let busy = false;

function text(key) {
  return translations[currentLanguage][key];
}

function setLanguage(language) {
  currentLanguage = translations[language] ? language : "tr";
  const strings = translations[currentLanguage];

  document.documentElement.lang = currentLanguage;
  document.title = strings.pageTitle;
  elements.description.content = strings.description;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = strings[element.dataset.i18n];
  });

  elements.languageButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage));
  });

  try {
    localStorage.setItem("nuve-language", currentLanguage);
  } catch (_) {
    // Language selection still works when browser storage is unavailable.
  }
}

function showStatus(type, titleKey, textKey, showProgress = false) {
  elements.statusIcon.className = `status-icon ${type}`;
  elements.statusTitle.textContent = text(titleKey);
  elements.statusText.textContent = text(textKey);
  elements.progressWrap.hidden = !showProgress;
  elements.actions.hidden = type !== "success" && type !== "error";
  elements.retryButton.hidden = type !== "error";
}

function setProgress(value) {
  const percentage = Math.max(0, Math.min(100, Math.round(value)));
  elements.progress.value = percentage;
  elements.progressValue.textContent = `${percentage}%`;
}

async function loadFiles() {
  const manifestUrl = new URL("manifest.json", window.location.href);
  const response = await fetch(manifestUrl, { cache: "no-store" });
  if (!response.ok) throw new Error("DOWNLOAD_MANIFEST");

  const manifest = await response.json();
  const build = manifest.builds?.find((candidate) => candidate.chipFamily === "ESP32-S3");
  if (!build?.parts?.length) throw new Error("DOWNLOAD_MANIFEST");

  return Promise.all(build.parts.map(async (part) => {
    const fileResponse = await fetch(new URL(part.path, manifestUrl));
    if (!fileResponse.ok) throw new Error("DOWNLOAD_FILE");
    return {
      address: part.offset,
      data: new Uint8Array(await fileResponse.arrayBuffer())
    };
  }));
}

function errorMessage(error) {
  const message = String(error?.message || error || "").toLowerCase();
  if (message.includes("unsupported_device")) {
    return ["deviceErrorTitle", "deviceErrorText"];
  }
  if (message.includes("download_") || message.includes("fetch") || message.includes("network")) {
    return ["downloadErrorTitle", "downloadErrorText"];
  }
  if (message.includes("connect") || message.includes("serial") || message.includes("port") || message.includes("timeout")) {
    return ["connectionErrorTitle", "connectionErrorText"];
  }
  return ["installErrorTitle", "installErrorText"];
}

async function disconnect(transport) {
  if (!transport) return;
  try {
    await transport.disconnect();
  } catch (_) {
    // The device may already have reset and closed the serial connection.
  }
}

async function install() {
  if (busy) return;
  if (!navigator.serial || !window.isSecureContext) {
    elements.supportError.hidden = false;
    return;
  }

  busy = true;
  elements.installButton.disabled = true;
  elements.supportError.hidden = true;
  setProgress(0);
  showStatus("", "connectingTitle", "connectingText");
  if (!elements.dialog.open) elements.dialog.showModal();

  let transport;
  try {
    const port = await navigator.serial.requestPort();
    showStatus("", "preparingTitle", "preparingText");

    transport = new Transport(port, true);
    const loader = new ESPLoader({
      transport,
      baudrate: 460800,
      terminal: { clean() {}, write() {}, writeLine() {} }
    });

    const chip = await loader.main();
    if (!String(chip).toUpperCase().includes("ESP32-S3")) {
      throw new Error("UNSUPPORTED_DEVICE");
    }

    showStatus("", "downloadingTitle", "downloadingText", true);
    const files = await loadFiles();
    const totalBytes = files.reduce((total, file) => total + file.data.byteLength, 0);
    const precedingBytes = files.map((_, index) =>
      files.slice(0, index).reduce((total, file) => total + file.data.byteLength, 0));

    showStatus("", "installingTitle", "installingText", true);
    await loader.writeFlash({
      fileArray: files,
      flashSize: "keep",
      flashMode: "keep",
      flashFreq: "keep",
      eraseAll: true,
      compress: true,
      reportProgress(fileIndex, written) {
        setProgress(((precedingBytes[fileIndex] + written) / totalBytes) * 100);
      }
    });

    setProgress(100);
    try {
      await loader.after("hard_reset");
    } catch (_) {
      // Flashing is complete even if the reset closes USB immediately.
    }
    await disconnect(transport);
    transport = null;
    showStatus("success", "successTitle", "successText");
  } catch (error) {
    await disconnect(transport);
    if (error?.name === "NotFoundError") {
      elements.dialog.close();
    } else {
      console.error("Nuve installation failed", error);
      const [titleKey, textKey] = errorMessage(error);
      showStatus("error", titleKey, textKey);
    }
  } finally {
    busy = false;
    elements.installButton.disabled = false;
  }
}

elements.languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});
elements.installButton.addEventListener("click", install);
elements.retryButton.addEventListener("click", install);
elements.closeButton.addEventListener("click", () => elements.dialog.close());
elements.dialog.addEventListener("cancel", (event) => {
  if (busy) event.preventDefault();
});

let savedLanguage;
try {
  savedLanguage = localStorage.getItem("nuve-language");
} catch (_) {
  savedLanguage = null;
}

const browserLanguage = navigator.language.toLowerCase().startsWith("tr") ? "tr" : "en";
setLanguage(savedLanguage || browserLanguage);
