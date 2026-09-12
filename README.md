# Nuve Recovery Installer

Static GitHub Pages recovery installer for Nuve Smart Azan ESP32-S3 devices.

The installer performs a full recovery flash:

- `firmware.factory.bin` at `0x0`
- `littlefs.bin` at `0x910000`

The install erases existing flash data, including Wi-Fi credentials and device settings.

## Publish

1. Create a public GitHub repository named `nuve-recovery-installer`.
2. Push this repository to its `main` branch.
3. In **Settings → Pages**, choose **GitHub Actions** as the source.
4. Wait for the **Deploy GitHub Pages** workflow to finish.

Web Serial requires HTTPS and a desktop Chromium browser such as Chrome or Edge.

## Package checksums

```text
nuve-1.0.13.factory.bin   SHA256 C3AFE8E6BF6CB27FC0A231660E22AB671AA5A192B8177BFD795C3450A712F924
nuve-1.0.13.littlefs.bin  SHA256 14227715204CFB5F3FBE3609482355521F94B0909F24563B4450F30CF39CB6E9
```

Before publishing another version, replace both binaries, update their versioned names and paths in `manifest.json`, update the visible version in `index.html`, and recalculate the checksums.
