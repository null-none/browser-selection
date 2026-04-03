const scriptSrc = document.currentScript?.src;
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", MainFc);
} else {
  MainFc();
}

function MainFc() {
  const containerElem = document.getElementById(
    "browserling-dropdown-container",
  );

  const wddWrapper = createDiv({
    id: "wrapper",
    class: "wrapper",
    innerHTML: `
       <div class="group__input" id="run">
        <input id="input" type=""text class="input" placeholder="https://" />
        <button id="button" class="button">Test Now</button>
      </div>          
      <div id="group__dropdown" class="group__dropdown">
        <div id="platform"></div>
        <div id="browser"></div>
        <div id="version"></div>
      </div>`,
  });

  containerElem.append(wddWrapper);

  var g_AllPlatforms;
  var g_AllBrowserVersions = {};
  var g_AllBrowserTypes;
  var g_AllBrowserOrder;

  g_AllBrowserOrder = [
    "edge",
    "ie",
    "chrome",
    "firefox",
    "opera",
    "brave",
    "vivaldi",
    "tor",
    "safari",
    "browser",
    "mypal",
    "supermium",
    "orion",
    "ddg",
    "brave",
  ];

  const platformNamesArray = [
    "macOS 26 Tahoe",
    "macOS 15 Sequoia",
    "macOS 14 Sonoma",
    "macOS 13 Ventura",
    "macOS 12 Monterey",
    "Windows 11",
    "Windows 10",
    "Windows 8.1",
    "Windows 8",
    "Windows 7",
    "Windows Vista",
    "Windows XP",
    "Android 15",
    "Android 14",
    "Android 13",
    "Android 12.1",
    "Android 12",
    "Android 11",
    "Android 10",
    "Android 9 Pie",
    "Android 8.1 Oreo",
    "Android 8.0 Oreo",
    "Android 7.1 Nougat",
    "Android 7.0 Nougat",
    "Android 6.0 Marshmallow",
    "Android 5.1 Lollipop",
    "Android 5.0 Lollipop",
    "Android 4.4 KitKat",
    "iOS 26",
    "iOS 18",
    "iOS 17",
    "iOS 16",
    "iOS 15",
  ];

  g_AllPlatforms = [];
  platformNamesArray.forEach((os) => {
    const osText = os.split(" ")[0];
    const osVersion = os.split(" ")[1].toLowerCase();
    const osName =
      osText === "Android" ? "android" : osText.toLowerCase().slice(0, 3);
    const iconUrl =
      os === "Android 12.1"
        ? "/images/os-icons/android-12.png"
        : `/images/os-icons/${osText.toLowerCase()}-${osVersion.replace(".", "")}.png`;

    const resObj = {
      name: osName,
      version: osVersion,
      text: os,
      icon: iconUrl,
    };

    if (os === "Windows 10") resObj.selected = true;
    g_AllPlatforms.push(resObj);
  });

  g_AllBrowserTypes = {
    ie: { text: "Internet Explorer", icon: "/images/browser-icons/ie.png" },
    chrome: { text: "Chrome", icon: "/images/browser-icons/chrome.png" },
    firefox: { text: "Firefox", icon: "/images/browser-icons/firefox.png" },
    opera: { text: "Opera", icon: "/images/browser-icons/opera.png" },
    safari: { text: "Safari", icon: "/images/browser-icons/safari.png" },
    edge: { text: "Edge", icon: "/images/browser-icons/edge.png" },
    brave: { text: "Brave", icon: "/images/browser-icons/brave.png" },
    vivaldi: { text: "Vivaldi", icon: "/images/browser-icons/vivaldi.png" },
    tor: { text: "Tor Browser", icon: "/images/browser-icons/tor.png" },
    browser: {
      text: "Default Browser",
      icon: "/images/browser-icons/android.png",
    },
    mypal: { text: "Mypal", icon: "/images/browser-icons/mypal.png" },
    supermium: {
      text: "Supermium",
      icon: "/images/browser-icons/supermium.png",
    },
    ddg: { text: "DuckDuckGo", icon: "/images/browser-icons/ddg.png" },
    orion: { text: "Orion", icon: "/images/browser-icons/orion.png" },
  };

  function platformVersionToShortName(platformVersion) {
    return platformVersion.split(" ")[1].toLowerCase();
  }

  function normalizeBrowserName(browser) {
    if (browser == "Internet Explorer") {
      browser = "ie";
    } else if (browser == "Tor Browser") {
      browser = "tor";
    } else if (browser == "DuckDuckGo") {
      browser = "ddg";
    } else {
      browser = browser.toLowerCase();
    }
    return browser;
  }

  function normalizePlatformName(platform) {
    let platformName = "win";

    if (/android/i.test(platform)) {
      platformName = "android";
    } else if (/mac/i.test(platform)) {
      platformName = "mac";
    } else if (/ios/i.test(platform)) {
      platformName = "ios";
    }

    return platformName;
  }

  function getLatestBrowsers(cb) {
    fetch("https://www.browserling.com/browsers.json")
      .then((res) => res.text())
      .then((data) => {
        try {
          cb(JSON.parse(data));
        } catch {
          cb(null);
        }
      })
      .catch(() => cb(null));
  }

  function updateBrowserList(browserList) {
    var list = {};
    Object.keys(browserList).forEach((os) => {
      var osPlatform = Object.keys(browserList[os]);
      osPlatform.forEach(function (platform) {
        list[os + platform] = {};

        var osBrowsers = Object.keys(browserList[os][platform]);
        osBrowsers.forEach(function (browser) {
          // put any browser versions with text (nightly, next, canary) at the first position
          var orderedBrowserList = [];
          browserList[os][platform][browser].forEach(function (v) {
            if (/^\d+/.test(v)) {
              orderedBrowserList.push(v);
            } else {
              orderedBrowserList.unshift(v);
            }
          });
          // make the last item selected for Dropdown
          var last = orderedBrowserList[orderedBrowserList.length - 1];
          last = { text: last, selected: true };
          orderedBrowserList[orderedBrowserList.length - 1] = last;

          list[os + platform][browser] = orderedBrowserList;
        });
      });
    });
    return list;
  }

  function generateLink(url) {
    let platformVersion =
      document.querySelector("#platform .dropdown__selected .dropdown__text")
        ?.textContent || "";

    const platformName = normalizePlatformName(platformVersion);

    platformVersion = platformVersionToShortName(platformVersion);

    let browser =
      document.querySelector("#browser .dropdown__selected .dropdown__text")
        ?.textContent || "";
    browser = normalizeBrowserName(browser);

    const version =
      document.querySelector("#version .dropdown__selected .dropdown__text")
        ?.textContent || "";
    const newUrl =
      "https://www.browserling.com/browse/" +
      platformName +
      platformVersion +
      "/" +
      browser +
      version +
      "/" +
      encodeURIComponent(url);
    return newUrl;
  }

  function openUrl(url) {
    var newUrl = generateLink(url);
    console.log("open", newUrl);
    window.open(newUrl);
  }

  function getPlatform(plaformName) {
    const platformVersion = platformVersionToShortName(plaformName);
    const platform = normalizePlatformName(plaformName);
    plaformName = platform + platformVersion;

    var allPlatforms = JSON.parse(JSON.stringify(g_AllPlatforms));

    var allBrowserVersions = JSON.parse(JSON.stringify(g_AllBrowserVersions));

    var browsers = [];
    var allBrowserTypes = JSON.parse(JSON.stringify(g_AllBrowserTypes));

    var keysActive = Object.keys(allBrowserVersions[plaformName]);
    var allBrowserOrder = [];
    for (var i = 0; g_AllBrowserOrder.length > i; i++) {
      if (keysActive.includes(g_AllBrowserOrder[i])) {
        allBrowserOrder.push(g_AllBrowserOrder[i]);
      }
    }

    for (var i = 0; i < allBrowserOrder.length; i++) {
      browsers.push(allBrowserTypes[allBrowserOrder[i]]);
    }

    return [
      allPlatforms.map((value) => {
        if (value.name + value.version === plaformName) {
          value.selected = true;
        } else {
          delete value.selected;
        }
        return value;
      }),
      browsers,
      plaformName,
    ];
  }

  function getBrowser(plaformName, browserName) {
    var platformVersion = platformVersionToShortName(plaformName);
    var platform = normalizePlatformName(plaformName);

    plaformName = platform + platformVersion;
    var allBrowserTypes = JSON.parse(JSON.stringify(g_AllBrowserTypes));
    var keysAllBrowserTypes = Object.keys(allBrowserTypes);
    var keysActive = Object.keys(g_AllBrowserVersions[plaformName]);
    for (var i = 0; i < keysAllBrowserTypes.length; i++) {
      if (keysActive.indexOf(keysAllBrowserTypes[i]) == -1) {
        delete allBrowserTypes[keysAllBrowserTypes[i]];
      }
    }

    const mapped = Object.keys(allBrowserTypes).map((k) => {
      const v = allBrowserTypes[k];
      v.selected =
        v.text === browserName ? true : (delete v.selected, undefined);
      return v;
    });

    const selectedKey = Object.keys(allBrowserTypes).find(
      (k) => allBrowserTypes[k].selected,
    );

    return [mapped, selectedKey];
  }

  function getVersion(platformName, browserName) {
    var versions = JSON.parse(
      JSON.stringify(g_AllBrowserVersions[platformName][browserName]),
    );
    versions.reverse();
    return versions;
  }

  function lastChanges(data) {
    var url = `${data[0][2]}/${data[1][1]}${
      document.querySelector("#version .dropdown__selected .dropdown__text")
        ?.textContent || ""
    }`;

    localStorageSet({
      platformName:
        document.querySelector("#platform .dropdown__selected .dropdown__text")
          ?.textContent || "",
      browserName:
        document.querySelector("#browser .dropdown__selected .dropdown__text")
          ?.textContent || "",
      version:
        document.querySelector("#version .dropdown__selected .dropdown__text")
          ?.textContent || "",
      url: url,
    });
  }

  function cacheLatestBrowsers(isFirst = false) {
    getLatestBrowsers(function (browsers) {
      if (browsers) {
        var browserList = updateBrowserList(browsers);
        g_AllBrowserVersions = browserList;
        if (isFirst) init("Windows 10", "Chrome");
        localStorageSet({
          browsers: browserList,
          cacheTime: Date.now(),
        });
      }
    });
  }

  function init(platformName, browserName, version) {
    var platform = getPlatform(platformName);
    if (!browserName) {
      browserName = platform[1][0].text;
    }
    var browser = getBrowser(platformName, browserName);

    var versions = getVersion(platform[2], browser[1]);
    var data = [platform, browser, versions];
    platformDropdown.update(data[0][0]);
    browserDropdown.update(data[1][0]);
    versionDropdown.update(data[2]);
    if (version) {
      document.querySelector(
        "#version .dropdown__selected .dropdown__item .dropdown__text",
      ).textContent = version;
    }

    return data;
  }

  function localStorageGet(items, cb) {
    let resObj = {};
    if (Array.isArray(items)) {
      items.forEach((item) => {
        let value = localStorage.getItem(item);
        if (value) {
          try {
            value = JSON.parse(value);
          } catch (e) {}
        }
        resObj[item] = value;
      });
    } else {
      let value = localStorage.getItem(items);

      try {
        value = JSON.parse(value);
      } catch (e) {}

      resObj[items] = value;
    }

    cb(resObj);
  }

  function localStorageSet(items) {
    Object.keys(items).forEach((key) => {
      localStorage.setItem(key, JSON.stringify(items[key]));
    });
  }

  var versionDropdown, browserDropdown, platformDropdown;

  fetch("/data/browsers.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      g_AllBrowserVersions = updateBrowserList(data);

      versionDropdown = new Dropdown({
        width: 90,
        height: 45,
        iconWidth: 20,
        iconHeight: 20,
        center: true,
        data: [],
        callback: function (selected) {
          var data = init(
            document.querySelector(
              "#platform .dropdown__selected .dropdown__text",
            )?.textContent || "",
            document.querySelector(
              "#browser .dropdown__selected .dropdown__text",
            )?.textContent || "",
            selected,
          );
          lastChanges(data);
        },
      });
      document.querySelector("#version").append(versionDropdown.create());

      browserDropdown = new Dropdown({
        width: 200,
        height: 45,
        iconWidth: 23,
        iconHeight: 23,
        data: [],
        callback: function (selected) {
          var data = init(
            document.querySelector(
              "#platform .dropdown__selected .dropdown__text",
            )?.textContent || "",
            selected,
          );
          lastChanges(data);
        },
      });
      document.querySelector("#browser").append(browserDropdown.create());

      platformDropdown = new Dropdown({
        width: 200,
        height: 45,
        iconWidth: 23,
        iconHeight: 23,
        data: [],
        callback: function (selected) {
          var data = init(selected);
          lastChanges(data);
        },
      });
      document.querySelector("#platform").append(platformDropdown.create());

      localStorageGet(
        ["platformName", "browserName", "version", "browsers", "cacheTime"],
        function (items) {
          if (items.browsers && items.cacheTime) {
            if (Date.now() - items.cacheTime > 3 * 3600 * 1000) {
              cacheLatestBrowsers();
            } else {
              g_AllBrowserVersions = items.browsers;
            }
          } else {
            cacheLatestBrowsers(true);
          }

          if (items.platformName && items.browserName && items.version) {
            init(items.platformName, items.browserName);
            document
              .querySelectorAll("#version .dropdown__slider .dropdown__item")
              .forEach(function (el) {
                if (el.textContent === items.version) {
                  document.querySelector(
                    "#version .dropdown__selected .dropdown__text",
                  ).textContent = el.textContent;
                }
              });
          } else {
            init("Windows 10", "Chrome");
          }
        },
      );
    });

  // make run work
  document.querySelector("#run button").addEventListener("click", function () {
    var url = document.querySelector("#run input").value;
    openUrl(url);
  });

  // fill url field with current tab's url
  document.querySelector("#run input").value = window.location.href;
}

function Dropdown(opts) {
  if (!(this instanceof Dropdown)) return new Dropdown(opts);
  var self = this;

  var dropdown;
  var selected;
  var slider;

  function appendItem(x) {
    var item = createDiv({ class: "dropdown__item" });

    item.addEventListener("click", function () {
      // update selection
      if (x.icon) {
        selected
          .querySelector(".dropdown__icon img")
          .setAttribute("src", x.icon);
      }

      if (typeof x === "object") {
        selected.querySelector(".dropdown__text").textContent = x.text;
      } else if (typeof x === "number" || typeof x === "string") {
        selected.querySelector(".dropdown__text").textContent = x;
      }

      if (opts.callback) {
        opts.callback(selected.querySelector(".dropdown__text").textContent);
      }

      selected.click();
    });

    item.style.width = opts.width + "px";
    item.style.height = opts.height + "px";

    if (x.icon) {
      var icon = createDiv({ class: "dropdown__icon" });
      var img = document.createElement("img");
      img.src = "." + x.icon;

      if (opts.iconWidth) img.width = opts.iconWidth;
      if (opts.iconHeight) img.height = opts.iconHeight;

      icon.appendChild(img);
      item.appendChild(icon);
    }

    var text = createDiv({ class: "dropdown__text" });

    if (typeof x === "object") {
      text.textContent = x.text;
    } else if (typeof x === "number" || typeof x === "string") {
      text.textContent = x;
    }

    if (x.center || opts.center) {
      text.style.left = opts.width / 2 - 20 + "px";
    }

    item.appendChild(text);
    slider.appendChild(item);

    if (x.selected) {
      selected.appendChild(item.cloneNode(true));
    }
  }

  function appendAllItems(data) {
    data = Object.values(data);
    if (!data.length) return;

    // if none of items are selected, select first
    if (!data.some((x) => x.selected)) {
      if (typeof data[0] === "object") {
        data[0].selected = true;
      } else {
        data[0] = { text: data[0], selected: true };
      }
    }

    data.forEach(function (x) {
      appendItem(x);
    });
  }

  self.update = function (data) {
    dropdown.querySelectorAll(".dropdown__item").forEach((el) => el.remove());
    appendAllItems(data);
  };

  self.create = function () {
    var data = opts.data;

    dropdown = createDiv({ class: "dropdown" });

    var arrow = createDiv({ class: "dropdown__arrow" });
    var arrowImg = document.createElement("img");
    arrowImg.src = "./images/dropdown-arrow-down.svg";
    arrow.appendChild(arrowImg);

    arrow.style.top = opts.height / 2 - 15 + "px";
    arrow.style.right = "14px";

    dropdown.appendChild(arrow);

    if (opts.backgroundColor) {
      dropdown.style.backgroundColor = opts.backgroundColor;
    }

    selected = createDiv({ class: "dropdown__selected" });
    dropdown.appendChild(selected);

    slider = createDiv({ class: "dropdown__slider" });
    dropdown.appendChild(slider);

    appendAllItems(data);

    // make dropdown selectable
    selected.addEventListener("click", function () {
      if (slider.style.display === "block") {
        if (opts.onClick) opts.onClick("hidden");
        slider.style.display = "none";
        dropdown
          .querySelector(".dropdown__arrow img")
          .setAttribute("src", "./images/dropdown-arrow-down.svg");
      } else {
        if (opts.onClick) opts.onClick("visible");
        slider.style.display = "block";
        dropdown
          .querySelector(".dropdown__arrow img")
          .setAttribute("src", "./images/dropdown-arrow-up.svg");
      }
    });

    arrow.addEventListener("click", function () {
      selected.click();
    });

    return dropdown;
  };
}

function createDiv(options = {}) {
  /*{
      class: "myclass",
      innerHTML: `....`,
      text: "ddd",
      click: callback
    }
   */
  const newDiv = document.createElement("div");
  if ("id" in options) newDiv.id = options.id;
  if ("class" in options) newDiv.className = options.class;
  if ("innerHTML" in options) newDiv.innerHTML = options.innerHTML;
  if ("text" in options) newDiv.textContent = options.text;
  if ("click" in options) newDiv.addEventListener("click", options.click);
  if ("attributes" in options) {
    for (const key in options.attributes) {
      newDiv.setAttribute(key, options.attributes[key]);
    }
  }

  return newDiv;
}
