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
nuve-1.0.14-en.factory.bin   SHA256 EA3871FE35FC70E9D7F2EF77D0C82DB6D38C5CC8750F24E03EBF3B6936D466E6
nuve-1.0.14.littlefs.bin  SHA256 9D2F15BC8263F06B78EF5D325F0B889FF457690A4FEE2A6851900BD39E1EECF1
```

Before publishing another version, replace both binaries, update their versioned names and paths in `manifest.json`, update the visible version in `index.html`, and recalculate the checksums.

The installer always uses the English-default factory firmware. The TR/EN page switch changes only the website language. The device language can be changed after setup.
