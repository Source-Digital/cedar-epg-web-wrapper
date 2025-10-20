# Cedar EPG Web Wrapper

A React web application wrapper for Electronic Program Guide (EPG) functionality, designed as a proof-of-concept for TV streaming applications on EmteriaOS and Android TV platforms.

## Overview

This project demonstrates EPG integration patterns and serves as a foundation for TV streaming applications. It includes custom EPG components with BKFC TV theming and explores compatibility between web and native TV platforms.

## Key Features

- Custom EPG component with channel and program listings
- BKFC TV branding and styling
- Responsive design for TV screens
- Mock data for development and testing
- EmteriaOS compatibility research

## Tech Stack

- React 19.2.0
- Styled Components
- React Router DOM
- Custom CSS Grid layouts

## Development Notes

This is a web-based exploration of EPG functionality. For production TV applications requiring DotStudio Pro SDKs (@dotstudiopro/player, @dotstudiopro/core), consider using React Native TV instead, as these SDKs are not compatible with web browsers.

## Installation
```bash
yarn install
yarn start
```

## Platform Compatibility

- ✅ Web browsers (Chrome, Firefox, Safari)
- ✅ EmteriaOS (via browser)
- ❌ Native TV SDKs (requires React Native TV)
