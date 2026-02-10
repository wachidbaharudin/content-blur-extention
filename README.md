# WhatsApp Web Blur Extension

A Brave/Chrome browser extension that blurs WhatsApp Web content for privacy. Hover over blurred elements to reveal them.

## Features

| Feature | Behavior |
|---|---|
| **Chat messages** | Blurred, revealed on hover |
| **Contact names** | Blurred, revealed on hover |
| **Profile pictures** | Blurred, revealed on hover |
| **Media (images/video)** | Blurred, revealed on hover |
| **Toggle button** | Turn blur on/off via popup |
| **Persistent state** | Remembers your preference via `chrome.storage` |

## Project Structure

```
content-blur-extention/
├── manifest.json
├── content.css
├── content.js
├── popup.html
├── popup.js
├── README.md
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/wachidbaharudin/content-blur-extention.git
   ```
2. Open Brave (or Chrome) and go to `brave://extensions` (or `chrome://extensions`)
3. Enable **"Developer mode"** (toggle in the top-right)
4. Click **"Load unpacked"**
5. Select the `content-blur-extention/` folder
6. Open [https://web.whatsapp.com](https://web.whatsapp.com) — content will be blurred!
7. Click the extension icon to **toggle blur on/off**

## How It Works

- **`manifest.json`** — Extension configuration (Manifest V3), defines permissions and content scripts
- **`content.css`** — CSS rules that apply `filter: blur()` to WhatsApp Web elements (messages, names, profile pictures, media)
- **`content.js`** — Content script that manages the blur state and listens for toggle messages from the popup
- **`popup.html`** — Simple popup UI with a toggle button
- **`popup.js`** — Handles the toggle button click and communicates with the content script

## Tips

- **Icons**: You need to create simple 16×16, 48×48, and 128×128 PNG icons and place them in the `icons/` folder.
- **CSS selectors may change**: WhatsApp Web updates its DOM frequently. If blur stops working, inspect the page (`F12`) and update the CSS selectors in `content.css`.
- **Publish**: To share it, you can package it as a `.crx` file or publish it on the [Chrome Web Store](https://chrome.google.com/webstore/devconsole) (Brave supports Chrome Web Store extensions).

## License

MIT