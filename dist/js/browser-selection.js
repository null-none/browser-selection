const scriptSrc = document.currentScript?.src;
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", MainFc);
} else {
  MainFc();
}

function MainFc() {
  const url = new URL(scriptSrc);

  //const basePath = url.origin + url.pathname.replace(/\/[^/]*$/, "/");
  //const basePath = url.pathname.replace(/\/[^/]*$/, "/");

  const containerElem = document.getElementById(
    "browserling-dropdown-container",
  );

  const wddWrapper = $(`
    <div id="wrapper" class="wrapper">
      <div class="group__input" id="run">
        <input id="input" type=""text class="input" placeholder="https://" />
        <button id="button" class="button">Test Now</button>
      </div>          
      <div id="group__dropdown" class="group__dropdown">
        <div id="platform"></div>
        <div id="browser"></div>
        <div id="version"></div>
      </div>
    </div>
  `);

  $(containerElem).append(wddWrapper);

  var g_AllPlatforms;
  var g_AllBrowserVersions;
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

  g_AllPlatforms = [
    {
      name: "mac",
      version: "26",
      text: "macOS 26 Tahoe",
      icon: "/images/os-icons/macos-26.png",
    },
    {
      name: "mac",
      version: "15",
      text: "macOS 15 Sequoia",
      icon: "/images/os-icons/macos-15.png",
    },
    {
      name: "mac",
      version: "14",
      text: "macOS 14 Sonoma",
      icon: "/images/os-icons/macos-14.png",
    },
    {
      name: "mac",
      version: "13",
      text: "macOS 13 Ventura",
      icon: "/images/os-icons/macos-13.png",
    },
    {
      name: "mac",
      version: "12",
      text: "macOS 12 Monterey",
      icon: "/images/os-icons/macos-12.png",
    },

    {
      name: "win",
      version: "11",
      text: "Windows 11",
      icon: "/images/os-icons/windows-11.png",
    },
    {
      name: "win",
      version: "10",
      text: "Windows 10",
      icon: "/images/os-icons/windows-10.png",
      selected: true,
    },
    {
      name: "win",
      version: "8.1",
      text: "Windows 8.1",
      icon: "/images/os-icons/windows-81.png",
    },
    {
      name: "win",
      version: "8",
      text: "Windows 8",
      icon: "/images/os-icons/windows-8.png",
    },
    {
      name: "win",
      version: "7",
      text: "Windows 7",
      icon: "/images/os-icons/windows-7.png",
    },
    {
      name: "win",
      version: "vista",
      text: "Windows Vista",
      icon: "/images/os-icons/windows-vista.png",
    },
    {
      name: "win",
      version: "xp",
      text: "Windows XP",
      icon: "/images/os-icons/windows-xp.png",
    },

    {
      name: "android",
      version: "15",
      text: "Android 15",
      icon: "/images/os-icons/android-15.png",
    },
    {
      name: "android",
      version: "14",
      text: "Android 14",
      icon: "/images/os-icons/android-14.png",
    },
    {
      name: "android",
      version: "13",
      text: "Android 13",
      icon: "/images/os-icons/android-13.png",
    },
    {
      name: "android",
      version: "12.1",
      text: "Android 12.1",
      icon: "/images/os-icons/android-12.png",
    },
    {
      name: "android",
      version: "12",
      text: "Android 12",
      icon: "/images/os-icons/android-12.png",
    },
    {
      name: "android",
      version: "11",
      text: "Android 11",
      icon: "/images/os-icons/android-11.png",
    },
    {
      name: "android",
      version: "10",
      text: "Android 10",
      icon: "/images/os-icons/android-10.png",
    },
    {
      name: "android",
      version: "9",
      text: "Android 9 Pie",
      icon: "/images/os-icons/android-9.png",
    },
    {
      name: "android",
      version: "8.1",
      text: "Android 8.1 Oreo",
      icon: "/images/os-icons/android-81.png",
    },
    {
      name: "android",
      version: "8.0",
      text: "Android 8.0 Oreo",
      icon: "/images/os-icons/android-80.png",
    },
    {
      name: "android",
      version: "7.1",
      text: "Android 7.1 Nougat",
      icon: "/images/os-icons/android-71.png",
    },
    {
      name: "android",
      version: "7.0",
      text: "Android 7.0 Nougat",
      icon: "/images/os-icons/android-70.png",
    },
    {
      name: "android",
      version: "6.0",
      text: "Android 6.0 Marshmallow",
      icon: "/images/os-icons/android-60.png",
    },
    {
      name: "android",
      version: "5.1",
      text: "Android 5.1 Lollipop",
      icon: "/images/os-icons/android-51.png",
    },
    {
      name: "android",
      version: "5.0",
      text: "Android 5.0 Lollipop",
      icon: "/images/os-icons/android-50.png",
    },
    {
      name: "android",
      version: "4.4",
      text: "Android 4.4 KitKat",
      icon: "/images/os-icons/android-44.png",
    },
    {
      name: "ios",
      version: "26",
      text: "iOS 26",
      icon: "/images/os-icons/ios-26.png",
    },
    {
      name: "ios",
      version: "18",
      text: "iOS 18",
      icon: "/images/os-icons/ios-18.png",
    },
    {
      name: "ios",
      version: "17",
      text: "iOS 17",
      icon: "/images/os-icons/ios-17.png",
    },
    {
      name: "ios",
      version: "16",
      text: "iOS 16",
      icon: "/images/os-icons/ios-16.png",
    },
    {
      name: "ios",
      version: "15",
      text: "iOS 15",
      icon: "/images/os-icons/ios-15.png",
    },
  ];

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

  function platformVersionToShortName(platformVersion) {
    if (platformVersion == "Windows XP") {
      platformVersion = "xp";
    } else if (platformVersion == "Windows Vista") {
      platformVersion = "vista";
    } else if (platformVersion == "Windows 7") {
      platformVersion = "7";
    } else if (platformVersion == "Windows 8") {
      platformVersion = "8";
    } else if (platformVersion == "Windows 8.1") {
      platformVersion = "8.1";
    } else if (platformVersion == "Windows 10") {
      platformVersion = "10";
    } else if (platformVersion == "Windows 11") {
      platformVersion = "11";
    } else if (platformVersion == "Android 15") {
      platformVersion = "15";
    } else if (platformVersion == "Android 14") {
      platformVersion = "14";
    } else if (platformVersion == "Android 13") {
      platformVersion = "13";
    } else if (platformVersion == "Android 12.1") {
      platformVersion = "12.1";
    } else if (platformVersion == "Android 12") {
      platformVersion = "12";
    } else if (platformVersion == "Android 11") {
      platformVersion = "11";
    } else if (platformVersion == "Android 10") {
      platformVersion = "10";
    } else if (platformVersion == "Android 9 Pie") {
      platformVersion = "9";
    } else if (platformVersion == "Android 8.1 Oreo") {
      platformVersion = "8.1";
    } else if (platformVersion == "Android 8.0 Oreo") {
      platformVersion = "8.0";
    } else if (platformVersion == "Android 7.1 Nougat") {
      platformVersion = "7.1";
    } else if (platformVersion == "Android 7.0 Nougat") {
      platformVersion = "7.0";
    } else if (platformVersion == "Android 6.0 Marshmallow") {
      platformVersion = "6.0";
    } else if (platformVersion == "Android 5.1 Lollipop") {
      platformVersion = "5.1";
    } else if (platformVersion == "Android 5.0 Lollipop") {
      platformVersion = "5.0";
    } else if (platformVersion == "Android 4.4 KitKat") {
      platformVersion = "4.4";
    } else if (platformVersion == "macOS 26 Tahoe") {
      platformVersion = "26";
    } else if (platformVersion == "macOS 15 Sequoia") {
      platformVersion = "15";
    } else if (platformVersion == "macOS 14 Sonoma") {
      platformVersion = "14";
    } else if (platformVersion == "macOS 13 Ventura") {
      platformVersion = "13";
    } else if (platformVersion == "macOS 12 Monterey") {
      platformVersion = "12";
    } else if (platformVersion == "iOS 15") {
      platformVersion = "15";
    } else if (platformVersion == "iOS 16") {
      platformVersion = "16";
    } else if (platformVersion == "iOS 17") {
      platformVersion = "17";
    } else if (platformVersion == "iOS 18") {
      platformVersion = "18";
    } else if (platformVersion == "iOS 26") {
      platformVersion = "26";
    }

    return platformVersion;
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

  function getLatestBrowsers(cb) {
    $.get(
      "https://www.browserling.com/browsers.json",
      function (data) {
        try {
          var browsers = JSON.parse(data);
          cb(browsers);
        } catch (e) {
          cb(null);
        }
      },
      "text",
    );
  }

  function updateBrowserList(browserList) {
    var list = {};

    var winPlatform = Object.keys(browserList.win);
    winPlatform.forEach(function (platform) {
      list["win" + platform] = {};

      var winBrowsers = Object.keys(browserList.win[platform]);
      winBrowsers.forEach(function (browser) {
        // put any browser versions with text (nightly, next, canary) at the first position
        var orderedBrowserList = [];
        browserList["win"][platform][browser].forEach(function (v) {
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

        list["win" + platform][browser] = orderedBrowserList;
      });
    });

    var androidPlatform = Object.keys(browserList.android);
    androidPlatform.forEach(function (platform) {
      list["android" + platform] = {};

      var androidBrowsers = Object.keys(browserList.android[platform]);
      androidBrowsers.forEach(function (browser) {
        // put any browser versions with text (nightly, next, canary) at the first position
        var orderedBrowserList = [];
        browserList["android"][platform][browser].forEach(function (v) {
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

        list["android" + platform][browser] = orderedBrowserList;
      });
    });

    var macPlatform = Object.keys(browserList.mac);
    macPlatform.forEach(function (platform) {
      list["mac" + platform] = {};

      var macBrowsers = Object.keys(browserList.mac[platform]);
      macBrowsers.forEach(function (browser) {
        // put any browser versions with text (nightly, next, canary) at the first position
        var orderedBrowserList = [];
        browserList["mac"][platform][browser].forEach(function (v) {
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

        list["mac" + platform][browser] = orderedBrowserList;
      });
    });

    var iosPlatform = Object.keys(browserList.ios);
    iosPlatform.forEach(function (platform) {
      list["ios" + platform] = {};

      var iosBrowsers = Object.keys(browserList.ios[platform]);
      iosBrowsers.forEach(function (browser) {
        var orderedBrowserList = [];
        browserList["ios"][platform][browser].forEach(function (v) {
          orderedBrowserList.push(v);
        });
        // make the last item selected for Dropdown
        var last = orderedBrowserList[orderedBrowserList.length - 1];
        last = { text: last, selected: true };
        orderedBrowserList[orderedBrowserList.length - 1] = last;

        list["ios" + platform][browser] = orderedBrowserList;
      });
    });

    return list;
  }

  function generateLink(url) {
    var platformName = "win";
    var platformVersion = $(
      "#platform .dropdown__selected .dropdown__text",
    ).text();
    if (/android/i.test(platformVersion)) {
      platformName = "android";
    }
    if (/mac/i.test(platformVersion)) {
      platformName = "mac";
    }
    if (/ios/i.test(platformVersion)) {
      platformName = "ios";
    }
    platformVersion = platformVersionToShortName(platformVersion);

    var browser = $("#browser .dropdown__selected .dropdown__text").text();
    browser = normalizeBrowserName(browser);

    var version = $("#version .dropdown__selected .dropdown__text").text();

    var newUrl =
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
    var platformVersion = platformVersionToShortName(plaformName);
    var platform = "win";
    if (/android/i.test(plaformName)) {
      platform = "android";
    }
    if (/mac/i.test(plaformName)) {
      platform = "mac";
    }
    if (/ios/i.test(plaformName)) {
      platform = "ios";
    }
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
      $.map(allPlatforms, function (value, i) {
        if (value.name + value.version == plaformName) {
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
    var platform = "win";
    if (/android/i.test(plaformName)) {
      platform = "android";
    }
    if (/mac/i.test(plaformName)) {
      platform = "mac";
    }
    if (/ios/i.test(plaformName)) {
      platform = "ios";
    }
    plaformName = platform + platformVersion;
    var allBrowserTypes = JSON.parse(JSON.stringify(g_AllBrowserTypes));
    var keysAllBrowserTypes = Object.keys(allBrowserTypes);
    var keysActive = Object.keys(g_AllBrowserVersions[plaformName]);
    for (var i = 0; i < keysAllBrowserTypes.length; i++) {
      if (keysActive.indexOf(keysAllBrowserTypes[i]) == -1) {
        delete allBrowserTypes[keysAllBrowserTypes[i]];
      }
    }
    return [
      $.map(allBrowserTypes, function (value, i) {
        if (value.text == browserName) {
          value.selected = true;
        } else {
          delete value.selected;
        }
        return value;
      }),
      Object.keys(allBrowserTypes).filter(function (value, index) {
        return allBrowserTypes[value].selected == true;
      })[0],
    ];
  }

  function getVersion(platformName, browserName) {
    var versions = JSON.parse(
      JSON.stringify(g_AllBrowserVersions[platformName][browserName]),
    );
    versions.reverse();
    return versions;
  }

  function lastChanges(data) {
    var url = `${data[0][2]}/${data[1][1]}${$(
      "#version .dropdown__selected .dropdown__text",
    ).text()}`;

    localStorageSet({
      platformName: $("#platform .dropdown__selected .dropdown__text").text(),
      browserName: $("#browser .dropdown__selected .dropdown__text").text(),
      version: $("#version .dropdown__selected .dropdown__text").text(),
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
        $("#platform .dropdown__selected .dropdown__text").text(),
        $("#browser .dropdown__selected .dropdown__text").text(),
        selected,
      );
      lastChanges(data);
    },
  });
  $("#version").append(versionDropdown.create());

  var browserDropdown = new Dropdown({
    width: 200,
    height: 45,
    iconWidth: 23,
    iconHeight: 23,
    data: [],
    callback: function (selected) {
      var data = init(
        $("#platform .dropdown__selected .dropdown__text").text(),
        selected,
      );
      lastChanges(data);
    },
  });
  $("#browser").append(browserDropdown.create());

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
  $("#platform").append(platformDropdown.create());

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
      $("#version .dropdown__selected .dropdown__item .dropdown__text").text(
        version,
      );
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
        $("#version .dropdown__slider .dropdown__item").each(function () {
          if ($(this).text() == items.version) {
            $("#version .dropdown__selected .dropdown__text").text(
              $(this).text(),
            );
          }
        });
      } else {
        init("Windows 10", "Chrome");
      }
    },
  );

  // make run work
  $("#run button").click(function () {
    var url = $("#run input").val();
    console.log("url", url);
    openUrl(url);
  });

  // fill url field with current tab's url
  $("#run input").val(window.location.href);
}

function Dropdown(opts) {
  if (!(this instanceof Dropdown)) return new Dropdown(opts);
  var self = this;

  var dropdown;
  var selected;
  var slider;

  function appendItem(x) {
    var item = $('<div class="dropdown__item">');

    item.on("click", function () {
      // update selection
      if (x.icon) {
        selected.find(".dropdown__icon img").attr("src", x.icon);
      }
      if (typeof x === "object") {
        selected.find(".dropdown__text").text(x.text);
      } else if (typeof x === "number" || typeof x === "string") {
        selected.find(".dropdown__text").text(x);
      }
      if (opts.callback) {
        opts.callback(selected.find(".dropdown__text").text());
      }
      selected.click();
    });

    item.css({
      width: opts.width,
      height: opts.height,
    });

    if (x.icon) {
      var icon = $('<div class="dropdown__icon">');
      var img = $(`<img src=".${x.icon}">`);
      //var img = $(`<img src="https://www.browserling.com/${x.icon}">`);
      if (opts.iconWidth) img.width(opts.iconWidth);
      if (opts.iconHeight) img.height(opts.iconHeight);
      icon.append(img);
    }

    var text = $('<div class="dropdown__text">');
    if (typeof x === "object") {
      text.append(x.text);
    } else if (typeof x === "number" || typeof x === "string") {
      text.append(x);
    }

    if (x.center || opts.center) {
      text.css({
        left: opts.width / 2 - 20,
      });
    }

    if (x.icon) {
      item.append(icon);
    }

    item.append(text);
    slider.append(item);

    if (x.selected) {
      selected.append(item.clone());
    }
  }

  function appendAllItems(data) {
    data = Object.keys(data).map((key) => data[key]);
    // if none of items are selected, select first
    var oneSelected = false;

    data.forEach(function (x) {
      if (x.selected) oneSelected = true;
    });

    if (!oneSelected) {
      if (data.length) {
        if (typeof data[0] === "object") {
          data[0] = {
            text: data[0].text,
            icon: data[0].icon,
            selected: true,
          };
        } else {
          data[0] = { text: data[0], selected: true };
        }
      }
    }

    data.forEach(function (x) {
      appendItem(x);
    });
  }

  self.update = function (data) {
    dropdown.find(".dropdown__item").remove();
    appendAllItems(data);
  };

  self.create = function () {
    var data = opts.data;
    dropdown = $('<div class="dropdown">');
    var arrow = $('<div class="dropdown__arrow ">');
    arrow.append('<img src="./images/dropdown-arrow-down.svg">');

    arrow.css({
      top: opts.height / 2 - 15,
      //left: opts.width - 25,
      right: 14,
    });

    dropdown.append(arrow);

    if (opts.backgroundColor) {
      dropdown.css({ "background-color": opts.backgroundColor });
    }

    selected = $('<div class="dropdown__selected">');
    dropdown.append(selected);

    slider = $('<div class="dropdown__slider">');
    dropdown.append(slider);

    appendAllItems(data);

    // make dropdown selectable
    selected.on("click", function () {
      if (slider.is(":visible")) {
        if (opts.onClick) opts.onClick("hidden");
        slider.slideUp("fast");
        dropdown
          .find(".dropdown__arrow img")
          .attr("src", "./images/dropdown-arrow-down.svg");
      } else {
        if (opts.onClick) opts.onClick("visible");
        slider.slideDown("fast");
        dropdown
          .find(".dropdown__arrow img")
          .attr("src", "./images/dropdown-arrow-up.svg");
      }
    });
    arrow.on("click", function () {
      selected.click();
    });

    return dropdown;
  };
}
