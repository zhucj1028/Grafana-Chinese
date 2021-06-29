(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./public/app/features/admin/LicenseChrome.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/admin/LicenseChrome.tsx ***!
  \*****************************************************/
/*! exports provided: LicenseChrome, Circle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LicenseChrome", function() { return LicenseChrome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return Circle; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      height: 137px;\n      padding: 40px 0 0 79px;\n      position: relative;\n      background: url('", "') right;\n  "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      text-align: center;\n      padding: 16px;\n      background: ", ";\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      padding: 36px 79px;\n      background: ", ";\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var title = {
  fontWeight: 500,
  fontSize: '26px',
  lineHeight: '123%'
};
var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["stylesFactory"])(function (theme) {
  var backgroundUrl = theme.isDark ? 'public/img/licensing/header_dark.svg' : 'public/img/licensing/header_light.svg';
  var footerBg = theme.isDark ? theme.palette.dark9 : theme.palette.gray6;
  return {
    container: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject(), theme.colors.panelBg),
    footer: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject2(), footerBg),
    header: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject3(), backgroundUrl)
  };
});
var LicenseChrome = function LicenseChrome(_ref) {
  var header = _ref.header,
      editionNotice = _ref.editionNotice,
      subheader = _ref.subheader,
      children = _ref.children;
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["useTheme"])();
  var styles = getStyles(theme);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.header
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    style: title
  }, header), subheader && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, subheader), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Circle, {
    size: "128px",
    style: {
      boxShadow: '0px 0px 24px rgba(24, 58, 110, 0.45)',
      background: '#0A1C36',
      position: 'absolute',
      top: '19px',
      left: '71%'
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "public/img/grafana_icon.svg",
    alt: "Grafana",
    width: "80px",
    style: {
      position: 'absolute',
      left: '23px',
      top: '20px'
    }
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.container
  }, children), editionNotice && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.footer
  }, editionNotice));
};
var Circle = function Circle(_ref2) {
  var size = _ref2.size,
      style = _ref2.style,
      children = _ref2.children;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: _objectSpread({
      width: size,
      height: size,
      position: 'absolute',
      bottom: 0,
      right: 0,
      borderRadius: '50%'
    }, style)
  }, children);
};

/***/ }),

/***/ "./public/app/features/admin/UpgradePage.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/admin/UpgradePage.tsx ***!
  \***************************************************/
/*! exports provided: UpgradePage, UpgradeInfo, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpgradePage", function() { return UpgradePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpgradeInfo", function() { return UpgradeInfo; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _LicenseChrome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LicenseChrome */ "./public/app/features/admin/LicenseChrome.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _core_selectors_navModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    font-weight: 500;\n    line-height: 1.7;\n  "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n\n    > img {\n      display: block;\n      height: 22px;\n      flex-grow: 0;\n      padding-right: 12px;\n    }\n  "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    flex-direction: column;\n    padding-top: 8px;\n\n    > div {\n      margin-bottom: ", "px;\n    }\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: grid;\n    grid-template-columns: 100%;\n    column-gap: 20px;\n    row-gap: 40px;\n\n    @media (min-width: 1050px) {\n      grid-template-columns: 50% 50%;\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









var UpgradePage = function UpgradePage(_ref) {
  var navModel = _ref.navModel;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__["default"], {
    navModel: navModel
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__["default"].Contents, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(UpgradeInfo, {
    editionNotice: "\u60A8\u6B63\u5728\u8FD0\u884CGrafana\u7684\u5F00\u6E90\u7248\u672C\u3002\u5FC5\u987B\u5B89\u88C5\u4F01\u4E1A\u7248\u624D\u80FD\u542F\u7528\u4F01\u4E1A\u529F\u80FD\u3002"
  })));
};
var titleStyles = {
  fontWeight: 500,
  fontSize: '26px',
  lineHeight: '123%'
};
var UpgradeInfo = function UpgradeInfo(_ref2) {
  var editionNotice = _ref2.editionNotice;
  var columnStyles = Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject());
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LicenseChrome__WEBPACK_IMPORTED_MODULE_3__["LicenseChrome"], {
    header: "Grafana\u4F01\u4E1A\u7248",
    subheader: "\u514D\u8D39\u8BD5\u7528",
    editionNotice: editionNotice
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: columnStyles
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FeatureInfo, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ServiceInfo, null)));
};

var GetEnterprise = function GetEnterprise() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      marginTop: '40px',
      marginBottom: '30px'
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    style: titleStyles
  }, "\u83B7\u53D6Grafana\u4F01\u4E1A\u7248"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CallToAction, null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    style: {
      paddingTop: '12px'
    }
  }, "\u4F60\u53EF\u4EE5\u514D\u8D39\u8BD5\u7528 ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "30\u5929"), "\u3002\u653E\u5FC3", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "\u5728\u8BD5\u7528\u671F\u7ED3\u675F5\u5929\u4E4B\u524D"), "\u6211\u4EEC\u4F1A\u63D0\u9192\u60A8\u3002"));
};

var CallToAction = function CallToAction() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["LinkButton"], {
    variant: "primary",
    size: "lg",
    href: "https://grafana.com/contact?about=grafana-enterprise&utm_source=grafana-upgrade-page"
  }, "\u8054\u7CFB\u6211\u4EEC\u5E76\u83B7\u5F97\u514D\u8D39\u8BD5\u7528");
};

var ServiceInfo = function ServiceInfo() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "\u4E50\u610F\u6548\u52B3"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(List, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "\u4F01\u4E1A\u63D2\u4EF6",
    image: "public/img/licensing/plugin_enterprise.svg"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "\u5173\u952ESLA\uFF1A2\u5C0F\u65F6",
    image: "public/img/licensing/sla.svg"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "\u65E0\u9650\u7684\u4E13\u5BB6\u652F\u6301",
    image: "public/img/licensing/customer_support.svg"
  }, "24x7x365 \u901A\u8FC7\u63D0\u4F9B\u652F\u6301", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(List, {
    nested: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "\u7535\u5B50\u90AE\u4EF6"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "\u79C1\u6709slack\u901A\u9053"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "\u7535\u8BDD"
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "Hand-in-hand support",
    image: "public/img/licensing/handinhand_support.svg"
  }, "\u5728\u5347\u7EA7\u8FC7\u7A0B\u4E2D")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      marginTop: '20px'
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "\u8FD8\u5305\u62EC:"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "\u4FDD\u969C\uFF0C\u4E0EGrafana Labs\u5408\u4F5C\u786E\u5B9A\u672A\u6765\u7684\u4F18\u5148\u7EA7\uFF0C\u5E76\u4ECEGrafana\u6838\u5FC3\u56E2\u961F\u8FDB\u884C\u57F9\u8BAD\u3002"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(GetEnterprise, null));
};

var FeatureInfo = function FeatureInfo() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      paddingRight: '11px'
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "\u589E\u5F3A\u529F\u80FD"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FeatureListing, null));
};

var FeatureListing = function FeatureListing() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(List, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "\u6570\u636E\u6E90\u6743\u9650"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "\u62A5\u544A"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "SAML\u8EAB\u4EFD\u9A8C\u8BC1"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "\u589E\u5F3A\u7684LDAP\u96C6\u6210"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "\u56E2\u961F\u540C\u6B65"
  }, "LDAP\uFF0CGitHub OAuth\uFF0C\u8EAB\u4EFD\u9A8C\u8BC1\u4EE3\u7406\uFF0COkta"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "\u767D\u8272\u6807\u7B7E"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "Grafana\u4F7F\u7528\u89C1\u89E3"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(List, {
    nested: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "\u6309\u641C\u7D22\u53D7\u6B22\u8FCE\u7A0B\u5EA6\u5BF9\u4EEA\u8868\u76D8\u8FDB\u884C\u6392\u5E8F"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "\u67E5\u627E\u672A\u4F7F\u7528\u7684\u4EEA\u8868\u677F"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "\u4EEA\u8868\u677F\u4F7F\u7528\u60C5\u51B5\u7EDF\u8BA1\u62BD\u5C49"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "\u4EEA\u8868\u677F\u72B6\u6001\u6307\u793A\u5668"
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "\u4F01\u4E1A\u63D2\u4EF6"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(List, {
    nested: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "Oracle"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "Splunk"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "Service Now"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "Dynatrace"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "New Relic"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "DataDog"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "AppDynamics"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Item, {
    title: "Amazon Timestream"
  }))));
};

var List = function List(_ref3) {
  var children = _ref3.children,
      nested = _ref3.nested;
  var listStyle = Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2(), nested ? 0 : 8);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: listStyle
  }, children);
};

var Item = function Item(_ref4) {
  var children = _ref4.children,
      title = _ref4.title,
      image = _ref4.image;
  var imageUrl = image ? image : 'public/img/licensing/checkmark.svg';
  var itemStyle = Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3());
  var titleStyle = Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject4());
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: itemStyle
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: imageUrl
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: titleStyle
  }, title), children));
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    navModel: Object(_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_6__["getNavModel"])(state.navIndex, 'upgrading')
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_5__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStateToProps)(UpgradePage)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=3.1ebdc265fc3bd7452fcd.js.map