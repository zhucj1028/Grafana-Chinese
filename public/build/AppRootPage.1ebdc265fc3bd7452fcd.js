(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["AppRootPage"],{

/***/ "./public/app/features/plugins/AppRootPage.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/plugins/AppRootPage.tsx ***!
  \*****************************************************/
/*! exports provided: getAppPluginPageError, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppPluginPageError", function() { return getAppPluginPageError; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _PluginSettingsCache__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PluginSettingsCache */ "./public/app/features/plugins/PluginSettingsCache.ts");
/* harmony import */ var _plugin_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plugin_loader */ "./public/app/features/plugins/plugin_loader.ts");
/* harmony import */ var app_core_nav_model_srv__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/nav_model_srv */ "./public/app/core/nav_model_srv.ts");
/* harmony import */ var app_core_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/core */ "./public/app/core/core.ts");
/* harmony import */ var app_core_components_PageLoader_PageLoader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/components/PageLoader/PageLoader */ "./public/app/core/components/PageLoader/PageLoader.tsx");
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

// Libraries


 // Types








function getAppPluginPageError(meta) {
  if (!meta) {
    return '未知插件';
  }

  if (meta.type !== _grafana_data__WEBPACK_IMPORTED_MODULE_3__["PluginType"].app) {
    return '插件必须是一个应用';
  }

  if (!meta.enabled) {
    return '应用未启用';
  }

  return null;
}

var AppRootPage =
/*#__PURE__*/
function (_Component) {
  _inherits(AppRootPage, _Component);

  function AppRootPage(props) {
    var _this;

    _classCallCheck(this, AppRootPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AppRootPage).call(this, props));

    _this.onNavChanged = function (nav) {
      _this.setState({
        nav: nav
      });
    };

    _this.state = {
      loading: true
    };
    return _this;
  }

  _createClass(AppRootPage, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var pluginId, app;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pluginId = this.props.pluginId;
                _context.prev = 1;
                _context.next = 4;
                return Object(_PluginSettingsCache__WEBPACK_IMPORTED_MODULE_5__["getPluginSettings"])(pluginId).then(function (info) {
                  var error = getAppPluginPageError(info);

                  if (error) {
                    app_core_core__WEBPACK_IMPORTED_MODULE_8__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["AppEvents"].alertError, [error]);

                    _this2.setState({
                      nav: Object(app_core_nav_model_srv__WEBPACK_IMPORTED_MODULE_7__["getWarningNav"])(error)
                    });

                    return null;
                  }

                  return Object(_plugin_loader__WEBPACK_IMPORTED_MODULE_6__["importAppPlugin"])(info);
                });

              case 4:
                app = _context.sent;
                this.setState({
                  plugin: app,
                  loading: false
                });
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                this.setState({
                  plugin: null,
                  loading: false,
                  nav:  true ? Object(app_core_nav_model_srv__WEBPACK_IMPORTED_MODULE_7__["getExceptionNav"])(_context.t0) : undefined
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          path = _this$props.path,
          query = _this$props.query;
      var _this$state = this.state,
          loading = _this$state.loading,
          plugin = _this$state.plugin,
          nav = _this$state.nav;

      if (plugin && !plugin.root) {
        // TODO? redirect to plugin page?
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "No Root App");
      } // When no naviagion is set, give full control to the app plugin


      if (!nav) {
        if (plugin && plugin.root) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(plugin.root, {
            meta: plugin.meta,
            query: query,
            path: path,
            onNavChanged: this.onNavChanged
          });
        }

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_PageLoader_PageLoader__WEBPACK_IMPORTED_MODULE_9__["default"], null);
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"], {
        navModel: nav
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"].Contents, {
        isLoading: loading
      }, plugin && plugin.root && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(plugin.root, {
        meta: plugin.meta,
        query: query,
        path: path,
        onNavChanged: this.onNavChanged
      })));
    }
  }]);

  return AppRootPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    pluginId: state.location.routeParams.pluginId,
    slug: state.location.routeParams.slug,
    query: state.location.query,
    path: state.location.path
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps)(AppRootPage)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=AppRootPage.1ebdc265fc3bd7452fcd.js.map