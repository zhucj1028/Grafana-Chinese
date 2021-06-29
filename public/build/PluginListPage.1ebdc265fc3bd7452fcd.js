(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["PluginListPage"],{

/***/ "./public/app/core/components/OrgActionBar/OrgActionBar.tsx":
/*!******************************************************************!*\
  !*** ./public/app/core/components/OrgActionBar/OrgActionBar.tsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OrgActionBar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FilterInput/FilterInput */ "./public/app/core/components/FilterInput/FilterInput.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var OrgActionBar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(OrgActionBar, _PureComponent);

  function OrgActionBar() {
    _classCallCheck(this, OrgActionBar);

    return _possibleConstructorReturn(this, _getPrototypeOf(OrgActionBar).apply(this, arguments));
  }

  _createClass(OrgActionBar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          searchQuery = _this$props.searchQuery,
          linkButton = _this$props.linkButton,
          setSearchQuery = _this$props.setSearchQuery,
          target = _this$props.target;
      var linkProps = {
        href: linkButton.href
      };

      if (target) {
        linkProps.target = target;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form gf-form--grow"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_1__["FilterInput"], {
        labelClassName: "gf-form--has-input-icon",
        inputClassName: "gf-form-input width-20",
        value: searchQuery,
        onChange: setSearchQuery,
        placeholder: '按名称或类型搜索'
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar__spacer"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LinkButton"], linkProps, linkButton.title));
    }
  }]);

  return OrgActionBar;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);



/***/ }),

/***/ "./public/app/features/plugins/PluginList.tsx":
/*!****************************************************!*\
  !*** ./public/app/features/plugins/PluginList.tsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PluginListItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PluginListItem */ "./public/app/features/plugins/PluginListItem.tsx");



var PluginList = function PluginList(props) {
  var plugins = props.plugins;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: "card-section card-list-layout-list"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ol", {
    className: "card-list"
  }, plugins.map(function (plugin, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PluginListItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
      plugin: plugin,
      key: "".concat(plugin.name, "-").concat(index)
    });
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (PluginList);

/***/ }),

/***/ "./public/app/features/plugins/PluginListItem.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/plugins/PluginListItem.tsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PluginSignatureBadge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PluginSignatureBadge */ "./public/app/features/plugins/PluginSignatureBadge.tsx");



var PluginListItem = function PluginListItem(props) {
  var plugin = props.plugin;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "card-item-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "card-item",
    href: "plugins/".concat(plugin.id, "/")
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "card-item-header"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "card-item-type"
  }, plugin.type), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PluginSignatureBadge__WEBPACK_IMPORTED_MODULE_1__["PluginSignatureBadge"], {
    status: plugin.signature
  }), plugin.hasUpdate && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "card-item-notice"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    "bs-tooltip": "plugin.latestVersion"
  }, "Update available!"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "card-item-body"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
    className: "card-item-figure"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: plugin.info.logos.small
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "card-item-details"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "card-item-name"
  }, plugin.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "card-item-sub-name"
  }, "By ".concat(plugin.info.author.name))))));
};

/* harmony default export */ __webpack_exports__["default"] = (PluginListItem);

/***/ }),

/***/ "./public/app/features/plugins/PluginListPage.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/plugins/PluginListPage.tsx ***!
  \********************************************************/
/*! exports provided: PluginListPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginListPage", function() { return PluginListPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var app_core_components_OrgActionBar_OrgActionBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/OrgActionBar/OrgActionBar */ "./public/app/core/components/OrgActionBar/OrgActionBar.tsx");
/* harmony import */ var _PluginList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PluginList */ "./public/app/features/plugins/PluginList.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/plugins/state/actions.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/plugins/state/selectors.ts");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/plugins/state/reducers.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }











var PluginListPage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PluginListPage, _PureComponent);

  function PluginListPage() {
    _classCallCheck(this, PluginListPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(PluginListPage).apply(this, arguments));
  }

  _createClass(PluginListPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchPlugins();
    }
  }, {
    key: "fetchPlugins",
    value: function () {
      var _fetchPlugins = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.props.loadPlugins();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchPlugins() {
        return _fetchPlugins.apply(this, arguments);
      }

      return fetchPlugins;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          hasFetched = _this$props.hasFetched,
          navModel = _this$props.navModel,
          plugins = _this$props.plugins,
          setPluginsSearchQuery = _this$props.setPluginsSearchQuery,
          searchQuery = _this$props.searchQuery;
      var linkButton = {
        href: 'https://grafana.com/plugins?utm_source=grafana_plugin_list',
        title: '在Grafana.com上找到更多插件'
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"], {
        navModel: navModel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"].Contents, {
        isLoading: !hasFetched
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_OrgActionBar_OrgActionBar__WEBPACK_IMPORTED_MODULE_4__["default"], {
        searchQuery: searchQuery,
        setSearchQuery: function setSearchQuery(query) {
          return setPluginsSearchQuery(query);
        },
        linkButton: linkButton,
        target: "_blank"
      }), hasFetched && plugins && plugins && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PluginList__WEBPACK_IMPORTED_MODULE_5__["default"], {
        plugins: plugins
      }))));
    }
  }]);

  return PluginListPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapStateToProps(state) {
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_7__["getNavModel"])(state.navIndex, 'plugins'),
    plugins: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_8__["getPlugins"])(state.plugins),
    searchQuery: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_8__["getPluginsSearchQuery"])(state.plugins),
    hasFetched: state.plugins.hasFetched
  };
}

var mapDispatchToProps = {
  loadPlugins: _state_actions__WEBPACK_IMPORTED_MODULE_6__["loadPlugins"],
  setPluginsSearchQuery: _state_reducers__WEBPACK_IMPORTED_MODULE_9__["setPluginsSearchQuery"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(PluginListPage)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/plugins/PluginSignatureBadge.tsx":
/*!**************************************************************!*\
  !*** ./public/app/features/plugins/PluginSignatureBadge.tsx ***!
  \**************************************************************/
/*! exports provided: PluginSignatureBadge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginSignatureBadge", function() { return PluginSignatureBadge; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");



var PluginSignatureBadge = function PluginSignatureBadge(_ref) {
  var status = _ref.status;
  var display = getSignatureDisplayModel(status);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Badge"], {
    text: display.text,
    color: display.color,
    icon: display.icon,
    tooltip: display.tooltip
  });
};

function getSignatureDisplayModel(signature) {
  if (!signature) {
    signature = _grafana_data__WEBPACK_IMPORTED_MODULE_2__["PluginSignatureStatus"].invalid;
  }

  switch (signature) {
    case _grafana_data__WEBPACK_IMPORTED_MODULE_2__["PluginSignatureStatus"].internal:
      return {
        text: '核心',
        icon: 'cube',
        color: 'blue',
        tooltip: '与Grafana捆绑在一起的核心插件'
      };

    case _grafana_data__WEBPACK_IMPORTED_MODULE_2__["PluginSignatureStatus"].valid:
      return {
        text: '签名',
        icon: 'lock',
        color: 'green',
        tooltip: '签名并验证的插件'
      };

    case _grafana_data__WEBPACK_IMPORTED_MODULE_2__["PluginSignatureStatus"].invalid:
      return {
        text: '无效',
        icon: 'exclamation-triangle',
        color: 'red',
        tooltip: '无效的插件签名'
      };

    case _grafana_data__WEBPACK_IMPORTED_MODULE_2__["PluginSignatureStatus"].modified:
      return {
        text: '已修改',
        icon: 'exclamation-triangle',
        color: 'red',
        tooltip: '有效签名，但内容已被修改'
      };
  }

  return {
    text: '未签名',
    icon: 'exclamation-triangle',
    color: 'red',
    tooltip: '未签名的外部插件'
  };
}

PluginSignatureBadge.displayName = 'PluginSignatureBadge';

/***/ }),

/***/ "./public/app/features/plugins/state/selectors.ts":
/*!********************************************************!*\
  !*** ./public/app/features/plugins/state/selectors.ts ***!
  \********************************************************/
/*! exports provided: getPlugins, getPluginsSearchQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPlugins", function() { return getPlugins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPluginsSearchQuery", function() { return getPluginsSearchQuery; });
var getPlugins = function getPlugins(state) {
  var regex = new RegExp(state.searchQuery, 'i');
  return state.plugins.filter(function (item) {
    return regex.test(item.name) || regex.test(item.info.author.name) || regex.test(item.info.description);
  });
};
var getPluginsSearchQuery = function getPluginsSearchQuery(state) {
  return state.searchQuery;
};

/***/ })

}]);
//# sourceMappingURL=PluginListPage.1ebdc265fc3bd7452fcd.js.map