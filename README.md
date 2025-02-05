# Pesnuk 🦠📱

**A Mindful Gateway for Facebook Addicts**  
*Replace your Facebook app icon. Break the "Fesnuk Gila" cycle.*

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) 
[![Project Status: WIP](https://img.shields.io/badge/Status-Research%20Phase-orange)](https://github.com/yourusername/pesnuk) 

---

## 🦠 What's "Pesnuk"? 

![Penyakit fesbuk gila](https://i.imgur.com/4dDDMpz.jpeg)

The name comes from Indonesian Facebook meme culture:
- **"Fesbuk"** → Common local spelling of Facebook  
- **"Fesnuk"** → Intentional typo used in memes  
- **"Penyakit Fesnuk Gila"** (Crazy Fesnuk Disease) → Viral term describing Facebook addiction  

Pesnuk is your antidote to this "disease" - a tool to use Facebook intentionally, not compulsively.

---

## 🎯 Why Pesnuk Exists

*"I just want to check notifications, but end up scrolling for hours!"*  

**Replace your default Facebook app icon with Pesnuk to:**
- 🛑 **Block autopilot opens** - No more feed-first design  
- 🔔 **See notifications only** on launch  
- 🃏 **Browse posts consciously** with card-style view + daily limits  
- ✍️ **Draft posts mindfully** without immediate publishing (keeping your account productive 🤭)  

---

## ✨ Planned Features (Minimalist Vision)

### Core Philosophy  
*"A speed bump between you and Facebook's dopamine hits"*

| Feature                | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| **Notifications Gate** | Must-click-through screen showing only new notifications (maybe we could force exit the app when there's no notifications 😕? That means you have to be interactive with your friendlist to continue using Facebook lol)                    |
| **Card View**          | Posts appear as cards (configurable daily limit). No more endless scrolling             |
| **Post Ideas**         | Local drafts that redirect to Facebook.com when ready to post. Keeping your profile productive (not just sharing posts)               |
| **One-Tap Exit**       | Prominent "Done" button that closes app after checking essentials (maybe not important)           |

---

## 🔒 Privacy & Safety

**Why trust Pesnuk?**
- 🕵️ **Full transparency** - Open source code; no hidden trackers  
- 📱 **Zero data collection** - Everything stays on your device  
- 🔐 **Minimal permissions** - Only needs internet access (to load Facebook)    

*"If you don't trust us, build it yourself!"* ← We mean this literally.

---

## 🧠 Core Technical Concept

Pesnuk’s core strategy is to **act as a middleware between you and Facebook**, using a combination of WebView, DOM scraping, and a custom UI to reshape your experience. Here’s how it works:

---

### **1. WebView as the Backbone**
- **What it does**:  
  Pesnuk uses a hidden `WebView` (via `react-native-webview`) to load Facebook’s mobile site in the background.  
- **Why it’s used**:  
  - No need to reverse-engineer Facebook’s API (which is complex and against their terms of service).  
  - Maintains compatibility with Facebook’s ever-changing UI.  
  - Preserves login sessions securely via cookies.  

---

### **2. DOM Scraping for Data Extraction**
- **What it does**:  
  JavaScript is injected into the WebView to extract specific elements (e.g., notifications, posts) using **CSS selectors** or **XPath**.  
- **Why it’s used**:  
  - Allows us to **filter out unnecessary content** (e.g., ads, suggested posts, stories).  
  - Enables **custom presentation** of data (e.g., card view, notifications-first layout).  

---

### **3. Custom UI for Mindful Interaction**
- **What it does**:  
  The scraped data is presented in a **minimalist, distraction-free UI** built with React Native.  
- **Why it’s used**:  
  - Replaces Facebook’s addictive design with intentional interactions.  
  - Provides **guardrails** (e.g., post limits, one-tap exit) to prevent mindless scrolling.  

---

### **How It All Fits Together**
1. **User opens Pesnuk**: The app loads Facebook in a hidden WebView.  
2. **Scraping begins**: JavaScript extracts notifications and posts from the DOM.  
3. **Custom UI renders**: Data is presented in a minimalist, card-based layout.   

---

### **Why This Approach?**
- **Simplicity**: No need to maintain a backend or reverse-engineer APIs.  
- **Privacy**: All data stays on the device; no servers are involved.  
- **Flexibility**: Adapts to Facebook’s UI changes without breaking the app.

---

## 🛠 Roadmap (Research Phase)

### Phase 0: Technical Research (Current Stage)
- ✅ **WebView strategy**: Confirming Facebook mobile site works in `react-native-webview`...  
- ✅ **DOM scraping tests**: Can it extract notifications via CSS selectors? 
- 🔄 **Cookie experiments**: Testing session persistence across app restarts...  
- ⏳ **UI prototypes**: Just pray because I'm not a front-end programmer 💀    

### Future Ideas (Post-Stable)  
- *goes here*

---

## 🌱 How to Contribute

**We welcome:**  
- React Native developers familiar with WebView hacking  
- UI designers for user interfaces  
- Beta testers willing to replace their Facebook app icon  

**Getting started:**  
1. Fork repo  
2. Join discussion in [GitHub Issues]  
3. Help prototype components:  
   ```bash
   git clone https://github.com/yourusername/pesnuk.git
   cd pesnuk && npm install
   ```

**Golden rules:**  
1. No feature creep - fight for simplicity    
2. Assume users have zero self-control  

---

## ⚠️ Disclaimer

Pesnuk is an **unofficial experiment** and not affiliated with Meta/Facebook.  
- Use at your own risk  
- Doesn't bypass any Facebook features - just reshapes your access  
- Not responsible for "Fesnuk Gila" relapses 😉  

---

*"The best way to resist temptation is to make it harder to indulge."*
*- DeepSeek R1*

*📄 License: MIT | 🚧 Made by @riozee and fellow survivors of Fesnuk Gila*
