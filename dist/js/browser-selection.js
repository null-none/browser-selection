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

  function range(start, end) {
    var ret = [];
    for (var i = start; i <= end; i++) {
      ret.push(i);
    }
    return ret;
  }

  function rangeP(prefix, start, end) {
    var ret = [];
    for (var i = start; i <= end; i++) {
      ret.push(prefix + i);
    }
    return ret;
  }

  function flat(arr) {
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
      var value = arr[i];
      if (typeof value === "object") {
        for (var j = 0; j < value.length; j++) {
          ret.push(value[j]);
        }
      } else {
        ret.push(value);
      }
    }
    return ret;
  }

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

  g_AllBrowserVersions = {
    mac26: {
      safari: [26],
      chrome: range(122, 140),
      edge: range(122, 140),
      firefox: range(113, 143),
      opera: range(108, 122),
      brave: flat([rangeP("1.", 64, 71), rangeP("1.", 73, 82)]),
      vivaldi: flat([
        rangeP("6.", 1, 2),
        rangeP("6.", 6, 9),
        rangeP("7.", 0, 5),
      ]),
      tor: ["13", "13.5", "14", "14.5"],
    },
    mac15: {
      safari: [18],
      chrome: range(122, 132),
      edge: range(122, 132),
      firefox: range(113, 134),
      opera: range(108, 116),
      brave: flat([rangeP("1.", 64, 71), rangeP("1.", 73, 74)]),
      vivaldi: flat([
        rangeP("6.", 1, 2),
        rangeP("6.", 6, 9),
        rangeP("7.", 0, 1),
      ]),
      tor: ["13", "13.5", "14"],
    },
    mac14: {
      safari: [17],
      chrome: range(120, 132),
      edge: range(120, 132),
      firefox: range(113, 134),
      opera: range(100, 116),
      brave: flat([rangeP("1.", 64, 71), rangeP("1.", 73, 74)]),
      vivaldi: flat([
        rangeP("6.", 1, 2),
        rangeP("6.", 4, 9),
        rangeP("7.", 0, 1),
      ]),
      tor: ["13", "13.5", "14"],
    },
    mac13: {
      safari: [16],
      chrome: range(120, 132),
      edge: range(120, 132),
      firefox: range(113, 134),
      opera: range(100, 116),
      brave: flat([rangeP("1.", 64, 71), rangeP("1.", 73, 74)]),
      vivaldi: flat([
        rangeP("6.", 1, 2),
        rangeP("6.", 4, 9),
        rangeP("7.", 0, 1),
      ]),
      tor: ["13", "13.5", "14"],
    },
    mac12: {
      safari: [15],
      chrome: range(120, 132),
      edge: range(120, 132),
      firefox: range(113, 134),
      opera: range(100, 116),
      brave: flat([rangeP("1.", 64, 71), rangeP("1.", 73, 74)]),
      vivaldi: flat([
        rangeP("6.", 1, 2),
        rangeP("6.", 4, 9),
        rangeP("7.", 0, 1),
      ]),
      tor: ["13", "13.5", "14"],
    },
    "android4.4": {
      chrome: range(77, 81),
      firefox: range(64, 68),
    },
    "android5.0": {
      chrome: range(90, 95),
      firefox: range(122, 128),
    },
    "android5.1": {
      chrome: range(90, 95),
      firefox: range(122, 128),
    },
    "android6.0": {
      chrome: range(100, 106),
      firefox: range(122, 128),
    },
    "android7.0": {
      chrome: range(115, 119),
      firefox: range(122, 128),
    },
    "android7.1": {
      chrome: range(115, 119),
      firefox: range(122, 128),
    },
    "android8.0": {
      chrome: range(122, 126),
      firefox: range(122, 128),
    },
    "android8.1": {
      chrome: range(122, 126),
      firefox: range(122, 128),
    },
    android9: {
      chrome: range(122, 126),
      firefox: range(122, 127),
    },
    android10: {
      chrome: range(100, 126),
      firefox: range(100, 127),
    },
    android11: {
      chrome: range(100, 126),
      firefox: range(100, 127),
    },
    android12: {
      chrome: range(100, 126),
      firefox: range(100, 127),
    },
    "android12.1": {
      chrome: range(100, 126),
      firefox: range(100, 127),
    },
    android13: {
      chrome: range(100, 126),
      firefox: range(100, 127),
    },
    android14: {
      chrome: range(100, 126),
      firefox: range(100, 127),
    },
    android15: {
      chrome: range(100, 126),
      firefox: range(100, 127),
    },
    winxp: {
      ie: [6, 7, 8],
      chrome: range(1, 49),
      firefox: flat([1, 2, 3, 3.5, 3.6, range(4, 52)]),
      opera: flat([10, 10.5, 11, 11.5, 11.6, 12, 13, 14, range(15, 36)]),
      mypal: [68],
      supermium: [132],
    },
    winvista: {
      ie: [7, 8, 9],
      chrome: range(1, 50),
      firefox: flat([1, 2, 3, 3.5, 3.6, range(4, 52)]),
      opera: flat([10, 10.5, 11, 11.5, 11.6, 12, 13, 14, range(15, 36)]),
      mypal: [68],
      supermium: range(122, 132),
    },
    win7: {
      ie: [8, 9, 10, 11],
      chrome: range(1, 109),
      firefox: flat([1, 2, 3, 3.5, 3.6, range(4, 115)]),
      opera: flat([
        10,
        "10.50",
        11,
        "11.50",
        "11.60",
        12,
        13,
        14,
        range(15, 95),
      ]),
      mypal: [68],
      supermium: range(122, 132),
    },
    win8: {
      ie: [10],
      chrome: range(1, 109),
      firefox: flat([1, 2, 3, 3.5, 3.6, range(4, 115)]),
      opera: flat([
        10,
        "10.50",
        11,
        "11.50",
        "11.60",
        12,
        13,
        14,
        range(15, 95),
      ]),
      mypal: [68],
      supermium: range(122, 132),
    },
    "win8.1": {
      ie: [11],
      chrome: range(1, 109),
      firefox: flat([1, 2, 3, 3.5, 3.6, range(4, 115)]),
      opera: flat([
        10,
        "10.50",
        11,
        "11.50",
        "11.60",
        12,
        13,
        14,
        range(15, 95),
      ]),
      mypal: [68],
      supermium: range(122, 132),
    },
    win10: {
      tor: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
      edge: range(100, 127),
      chrome: range(1, 127),
      firefox: flat([1, 2, 3, 3.5, 3.6, range(4, 128)]),
      opera: flat([
        10,
        "10.50",
        11,
        "11.50",
        "11.60",
        12,
        13,
        14,
        range(15, 112),
      ]),
      brave: rangeP("1.", 0, 68),
      vivaldi: flat([
        rangeP("1.", 0, 15),
        rangeP("2.", 0, 11),
        rangeP("3.", 0, 8),
        rangeP("4.", 0, 3),
        rangeP("5.", 0, 8),
        rangeP("6.", 0, 8),
      ]),
    },
    win11: {
      tor: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5],
      edge: range(100, 127),
      chrome: range(1, 127),
      firefox: flat([1, 2, 3, 3.5, 3.6, range(4, 128)]),
      opera: flat([
        10,
        "10.50",
        11,
        "11.50",
        "11.60",
        12,
        13,
        14,
        range(15, 112),
      ]),
      brave: rangeP("1.", 0, 68),
      vivaldi: flat([
        rangeP("1.", 0, 15),
        rangeP("2.", 0, 11),
        rangeP("3.", 0, 8),
        rangeP("4.", 0, 3),
        rangeP("5.", 0, 8),
        rangeP("6.", 0, 8),
      ]),
    },
    ios15: {
      safari: [15],
      orion: rangeP("1.", 1, 4),
      ddg: rangeP("7.", 189, 199),
      firefox: range(137, 146),
      opera: ["4.5", "4.6", "4.7", rangeP("5.", 0, 5), "6.0"],
      vivaldi: rangeP("6.", 3, 7),
      brave: rangeP("1.", 56, 66),
      edge: range(116, 125),
      chrome: [range(108, 111), range(120, 125)],
    },
    ios16: {
      safari: [16],
      orion: rangeP("1.", 1, 4),
      ddg: rangeP("7.", 189, 199),
      firefox: range(137, 146),
      opera: [rangeP("5.", 0, 5), rangeP("6.", 0, 3)],
      vivaldi: [rangeP("6.", 4, 9), rangeP("7.", 0, 2), "7.4"],
      brave: rangeP("1.", 69, 79),
      edge: range(128, 137),
      chrome: range(128, 137),
    },
    ios17: {
      safari: [17],
      orion: rangeP("1.", 1, 4),
      ddg: rangeP("7.", 189, 199),
      firefox: range(137, 146),
      opera: [rangeP("5.", 0, 5), rangeP("6.", 0, 3)],
      vivaldi: [rangeP("6.", 7, 9), rangeP("7.", 0, 2), rangeP("7.", 4, 7)],
      brave: rangeP("1.", 76, 85),
      edge: range(134, 143),
      chrome: range(134, 143),
    },
    ios18: {
      safari: [18],
      orion: rangeP("1.", 1, 4),
      ddg: rangeP("7.", 189, 199),
      firefox: range(137, 146),
      opera: [rangeP("5.", 0, 5), rangeP("6.", 0, 3)],
      vivaldi: [rangeP("6.", 7, 9), rangeP("7.", 0, 2), rangeP("7.", 4, 7)],
      brave: rangeP("1.", 76, 85),
      edge: range(134, 143),
      chrome: range(134, 143),
    },
    ios26: {
      safari: [26],
      orion: rangeP("1.", 1, 4),
      ddg: [rangeP("7.", 189, 193), rangeP("7.", 195, 199)],
      firefox: range(137, 146),
      opera: [rangeP("5.", 0, 5), rangeP("6.", 0, 3)],
      vivaldi: [rangeP("6.", 7, 9), rangeP("7.", 0, 2), rangeP("7.", 4, 7)],
      brave: rangeP("1.", 76, 85),
      edge: range(134, 143),
      chrome: range(134, 143),
    },
  };

  /*function getAllBrowserVersionsJSON() {
    fetch("/data/browsers.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("ok");
        g_AllBrowserVersions = updateBrowserList(data);
      });
  }*/

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

  var versionDropdown = new Dropdown({
    width: 90,
    height: 45,
    iconWidth: 20,
    iconHeight: 20,
    center: true,
    data: [],
    callback: function (selected) {
      var data = init(
        document.querySelector("#platform .dropdown__selected .dropdown__text")
          ?.textContent || "",
        document.querySelector("#browser .dropdown__selected .dropdown__text")
          ?.textContent || "",
        selected,
      );
      lastChanges(data);
    },
  });

  document.querySelector("#version")?.append(versionDropdown.create());

  var browserDropdown = new Dropdown({
    width: 200,
    height: 45,
    iconWidth: 23,
    iconHeight: 23,
    data: [],
    callback: function (selected) {
      var data = init(
        document.querySelector("#platform .dropdown__selected .dropdown__text")
          ?.textContent || "",
        selected,
      );
      lastChanges(data);
    },
  });
  document.querySelector("#browser").append(browserDropdown.create());

  var platformDropdown = new Dropdown({
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
