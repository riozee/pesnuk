# Contributing to Pesnuk

Thank you for considering contributing to Pesnuk! This document provides guidelines and instructions for contributing to the project.

As you may have read in [README.md](./README.md), this project currently faces some challenges:

> This project is still in development. We have implemented one of two essential capabilities:
>
> - ✅ Establish two-way communication between Facebook's site and the Pesnuk app (by executing JavaScript inside WebView)
> - ❌ Simulate user input to navigate Facebook's site
>
> The main challenge is that information (such as URLs or text) isn't always explicitly available in the HTML content. We need to simulate user input to access the information we want. Currently, programmatic approaches like `element.click()` don't work on Facebook's site. We need to find an alternative approach.

Below is our progress so far:
| ![Pesnuk Web View](https://imgur.com/7YkvxmF.jpeg) | ![Working with FB mobile site](https://imgur.com/GQFAesp.jpeg) |
|:---:|:---:|
| _Extracting notifications_ | _WebView display_ |

## Getting Started

We use **Expo with React Native** as the main framework. Simply run `npx expo start` and open the project using the **Expo Go** app on your physical device.

1. **Fork** the repository on GitHub 🍴
2. **Clone** your fork locally 🖥️

```bash
git clone https://github.com/YOUR-USERNAME/pesnuk.git
cd pesnuk
```

3. **Install** dependencies 📦 (**we use yarn, not npm**)

```bash
yarn install
```

4. **Start** the development server 🚀

```bash
npx expo start
```

> This project also comes preconfigured with **DevBox**. You can immediately jump to running the project **without even** installing Node.js and Yarn on your machine. Simply run `devbox install` then `devbox shell` and run the steps above normally from the shell.

## Core Mechanism: WebView Architecture

Pesnuk's fundamental architecture revolves around a persistent WebView that loads and interacts with Facebook's mobile website. Understanding this mechanism is crucial for contributing effectively.

### WebView Architecture Overview

1. **Persistent Background WebView**

   - A single WebView instance is mounted at app startup via `WebViewProvider.tsx`
   - This WebView remains loaded in the background throughout the app lifecycle
   - For safety and consistency, all Facebook interactions must happen through this single WebView instance

2. **WebView Management**

   - `WebViewProvider.tsx` is a context provider that:
     - Maintains the WebView reference
     - Handles WebView visibility (show/hide)
     - Provides methods to execute JavaScript within the WebView
     - Manages URL loading and navigation
     - Synchronizes promise-based communication between React Native and WebView

3. **Data Extraction Flow**

   1. The WebView loads Facebook's mobile site (initially hidden from the user)
   2. JavaScript is executed within the WebView to extract data (using the `executeScript` method)
   3. DOM content is parsed using `htmlparser2` in `parseHTML.ts`
   4. Scrapers (e.g., `notifications.ts`) extract specific data from the DOM
   5. Extracted data is rendered in our custom React Native UI

4. **User Interaction Pattern**

   - Users primarily interact with our custom React Native UI
   - When direct Facebook interaction is needed, we:
     - Execute JavaScript in the WebView (e.g., simulate clicks)
     - Make the WebView visible via `DialogScreen.tsx` when necessary
     - Hide the WebView when the interaction is complete

5. **DialogScreen.tsx**
   - Wraps the WebView in a modal-like interface
   - Provides UI controls for WebView interaction (back, forward, reload)
   - Controls WebView visibility based on app state

## Project Structure

The project follows the Expo Router file-based routing with a structured organization:

```
pesnuk/
├── src/                       # Source files
│   ├── app/                   # Application screens and routes (Expo Router)
│   │   ├── _layout.tsx        # Root layout configuration
│   │   ├── (tabs)/            # Tab-based navigation
│   │   │   ├── notifications.tsx # Notifications tab screen
│   │   │   └── ...            # Other tab screens
│   ├── assets/                # Static assets like images
│   ├── components/            # Reusable UI components
│   │   ├── DialogScreen.tsx   # WebView dialog component
│   │   ├── Notification.tsx   # Notification item component
│   │   ├── WebViewProvider.tsx # WebView context provider
│   │   └── ...                # Other components
│   └── utils/                 # Utility functions and helpers
│       ├── logger.ts          # Centralized logging utility
│       ├── parseHTML.ts       # HTML parsing utilities
│       ├── scrapers/          # DOM scraper utilities
│       │   ├── notifications.ts # Notification scraper
│       │   └── ...            # Other scrapers
│       ├── simulateClick.ts   # Utilities for simulating user interactions
│       └── ...                # Other utilities
├── CONTRIBUTING.md            # Contribution guidelines (this file)
├── LICENSE                    # MIT License
├── README.md                  # Project overview and documentation
├── app.json                   # Expo configuration
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── devbox.json                # DevBox system package manager configuration
├── .prettierrc                # Prettier code formatter configuration
└── .eslintrc.js               # ESLint code checker configuration

```

## Development Process

### Code Style

We use ESLint and Prettier for code formatting. Please ensure your code passes linting before submitting:

```bash
yarn lint
```

### Logging Standards

```typescript
import { logger } from 'utils/logger';

const log = logger('path/to/your/file.ts');

log.info('Information message');
log.warn('Warning message');
log.error('Error message');
```

## Pull Request Process

1. Create a feature branch from `main`
2. Implement your changes with appropriate tests and documentation
3. Update the README.md if necessary
4. Submit a PR to the `main` branch
5. Address any feedback from code reviews

Thank you for contributing to a more mindful social media experience! 🌟
