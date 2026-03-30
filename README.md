# Browser Selection

## Overview

Lightweight widget for selecting browser and operating system. Injects UI into a container and redirects user based on selected option.

Built with jQuery for simple embedding into static HTML pages.

---

## Features

- Browser and OS selection dropdown
- Dynamic UI injection into target container
- Redirect based on selection
- No build step required
- External CSS file
- jQuery-based implementation

---

## Project Structure

```text
.
├── dist/
│   ├── images/
│   ├── js/
│   │   ├── jquery-2.1.4.min.js
│   │   └── browser-selection.js
│   ├── browser-selection-styles.css
│   └── index.html
│
└── scss/
    └── (scss sources)
```

---

## Installation

Place files into your project. No bundlers or build tools required.

---

## Usage

### 1. Add container

```text
<div id="browserling-dropdown-container"></div>
```

---

### 2. Include styles

```text
<link rel="stylesheet" href="./browser-selection-styles.css">
```

---

### 3. Include scripts

```text
<script src="js/jquery-2.1.4.min.js"></script>
<script src="js/browser-selection.js"></script>
```

---

## Initialization

The widget automatically mounts into:

#browserling-dropdown-container

No manual initialization required.
