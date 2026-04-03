# Browser Selection

## Overview

Lightweight widget for selecting browser and operating system. Injects UI into a container and redirects user based on selected option.

---

## Features

- Browser and OS selection dropdown
- Dynamic UI injection into target container
- Redirect based on selection
- No build step required
- External CSS file

---

## Project Structure

```text
.
├── dist/
│   ├── images/
│   ├── fonts/
│   ├── js/
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

### 3. Include script

```text
<script src="js/browser-selection.js"></script>
```

---

## Initialization

The widget automatically mounts into:

#browserling-dropdown-container

No manual initialization required.
