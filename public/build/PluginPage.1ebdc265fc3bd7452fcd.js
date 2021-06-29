(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["PluginPage"],{

/***/ "./node_modules/lodash/assignIn.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/assignIn.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    createAssigner = __webpack_require__(/*! ./_createAssigner */ "./node_modules/lodash/_createAssigner.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");

/**
 * This method is like `_.assign` except that it iterates over own and
 * inherited source properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assign
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assignIn({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
 */
var assignIn = createAssigner(function(object, source) {
  copyObject(source, keysIn(source), object);
});

module.exports = assignIn;


/***/ }),

/***/ "./node_modules/lodash/extend.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/extend.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./assignIn */ "./node_modules/lodash/assignIn.js");


/***/ }),

/***/ "./public/app/core/components/PluginHelp/PluginHelp.tsx":
/*!**************************************************************!*\
  !*** ./public/app/core/components/PluginHelp/PluginHelp.tsx ***!
  \**************************************************************/
/*! exports provided: PluginHelp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginHelp", function() { return PluginHelp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var PluginHelp =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PluginHelp, _PureComponent);

  function PluginHelp() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PluginHelp);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PluginHelp)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isError: false,
      isLoading: false,
      help: ''
    };

    _this.loadHelp = function () {
      var _this$props = _this.props,
          plugin = _this$props.plugin,
          type = _this$props.type;

      _this.setState({
        isLoading: true
      });

      Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().get("/api/plugins/".concat(plugin.id, "/markdown/").concat(type)).then(function (response) {
        var helpHtml = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["renderMarkdown"])(response);

        if (response === '' && type === 'help') {
          _this.setState({
            isError: false,
            isLoading: false,
            help: _this.constructPlaceholderInfo()
          });
        } else {
          _this.setState({
            isError: false,
            isLoading: false,
            help: helpHtml
          });
        }
      }).catch(function () {
        _this.setState({
          isError: true,
          isLoading: false
        });
      });
    };

    return _this;
  }

  _createClass(PluginHelp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadHelp();
    }
  }, {
    key: "constructPlaceholderInfo",
    value: function constructPlaceholderInfo() {
      return '找不到插件帮助或自述文件减价文件';
    }
  }, {
    key: "render",
    value: function render() {
      var type = this.props.type;
      var _this$state = this.state,
          isError = _this$state.isError,
          isLoading = _this$state.isLoading,
          help = _this$state.help;

      if (isLoading) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "\u6B63\u5728\u52A0\u8F7D\u5E2E\u52A9...");
      }

      if (isError) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "'\u52A0\u8F7D\u5E2E\u52A9\u65F6\u53D1\u751F\u9519\u8BEF'");
      }

      if (type === 'panel_help' && help === '') {}

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "markdown-html",
        dangerouslySetInnerHTML: {
          __html: help
        }
      });
    }
  }]);

  return PluginHelp;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/***/ }),

/***/ "./public/app/features/datasources/DashboardsTable.tsx":
/*!*************************************************************!*\
  !*** ./public/app/features/datasources/DashboardsTable.tsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");



var DashboardsTable = function DashboardsTable(_ref) {
  var dashboards = _ref.dashboards,
      onImport = _ref.onImport,
      onRemove = _ref.onRemove;

  function buttonText(dashboard) {
    return dashboard.revision !== dashboard.importedRevision ? 'Update' : 'Re-import';
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "filter-table"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, dashboards.map(function (dashboard, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: "".concat(dashboard.dashboardId, "-").concat(index)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "width-1"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      name: "apps"
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, dashboard.imported ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: dashboard.importedUrl
    }, dashboard.title) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, dashboard.title)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      style: {
        textAlign: 'right'
      }
    }, !dashboard.imported ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "btn btn-secondary btn-small",
      onClick: function onClick() {
        return onImport(dashboard, false);
      }
    }, "\u5BFC\u5165") : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "btn btn-secondary btn-small",
      onClick: function onClick() {
        return onImport(dashboard, true);
      }
    }, buttonText(dashboard)), dashboard.imported && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "btn btn-danger btn-small",
      onClick: function onClick() {
        return onRemove(dashboard);
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      name: "trash-alt"
    }))));
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (DashboardsTable);

/***/ }),

/***/ "./public/app/features/plugins/PluginDashboards.tsx":
/*!**********************************************************!*\
  !*** ./public/app/features/plugins/PluginDashboards.tsx ***!
  \**********************************************************/
/*! exports provided: PluginDashboards */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginDashboards", function() { return PluginDashboards; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/extend */ "./node_modules/lodash/extend.js");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/core */ "./public/app/core/core.ts");
/* harmony import */ var app_features_datasources_DashboardsTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/features/datasources/DashboardsTable */ "./public/app/features/datasources/DashboardsTable.tsx");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var PluginDashboards =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PluginDashboards, _PureComponent);

  function PluginDashboards(props) {
    var _this;

    _classCallCheck(this, PluginDashboards);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PluginDashboards).call(this, props));

    _this.importAll = function () {
      _this.importNext(0);
    };

    _this.importNext = function (index) {
      var dashboards = _this.state.dashboards;
      return _this.import(dashboards[index], true).then(function () {
        if (index + 1 < dashboards.length) {
          return new Promise(function (resolve) {
            setTimeout(function () {
              _this.importNext(index + 1).then(function () {
                resolve();
              });
            }, 500);
          });
        } else {
          return Promise.resolve();
        }
      });
    };

    _this.import = function (dash, overwrite) {
      var _this$props = _this.props,
          plugin = _this$props.plugin,
          datasource = _this$props.datasource;
      var installCmd = {
        pluginId: plugin.id,
        path: dash.path,
        overwrite: overwrite,
        inputs: []
      };

      if (datasource) {
        installCmd.inputs.push({
          name: '*',
          type: 'datasource',
          pluginId: datasource.meta.id,
          value: datasource.name
        });
      }

      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().post("/api/dashboards/import", installCmd).then(function (res) {
        app_core_core__WEBPACK_IMPORTED_MODULE_3__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["AppEvents"].alertSuccess, ['仪表板导入', dash.title]);
        lodash_extend__WEBPACK_IMPORTED_MODULE_1___default()(dash, res);

        _this.setState({
          dashboards: _toConsumableArray(_this.state.dashboards)
        });
      });
    };

    _this.remove = function (dash) {
      Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().delete('/api/dashboards/' + dash.importedUri).then(function () {
        dash.imported = false;

        _this.setState({
          dashboards: _toConsumableArray(_this.state.dashboards)
        });
      });
    };

    _this.state = {
      loading: true,
      dashboards: []
    };
    return _this;
  }

  _createClass(PluginDashboards, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var pluginId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pluginId = this.props.plugin.id;
                Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().get("/api/plugins/".concat(pluginId, "/dashboards")).then(function (dashboards) {
                  _this2.setState({
                    dashboards: dashboards,
                    loading: false
                  });
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          loading = _this$state.loading,
          dashboards = _this$state.dashboards;

      if (loading) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "\u52A0\u8F7D\u4E2D...");
      }

      if (!dashboards || !dashboards.length) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "\u8FD9\u4E2A\u63D2\u4EF6\u4E0D\u5305\u542B\u4EEA\u8868\u677F");
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_features_datasources_DashboardsTable__WEBPACK_IMPORTED_MODULE_4__["default"], {
        dashboards: dashboards,
        onImport: this.import,
        onRemove: this.remove
      }));
    }
  }]);

  return PluginDashboards;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/***/ }),

/***/ "./public/app/features/plugins/PluginPage.tsx":
/*!****************************************************!*\
  !*** ./public/app/features/plugins/PluginPage.tsx ***!
  \****************************************************/
/*! exports provided: getLoadingNav, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLoadingNav", function() { return getLoadingNav; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/find */ "./node_modules/lodash/find.js");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _PluginSettingsCache__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PluginSettingsCache */ "./public/app/features/plugins/PluginSettingsCache.ts");
/* harmony import */ var _plugin_loader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./plugin_loader */ "./public/app/features/plugins/plugin_loader.ts");
/* harmony import */ var app_core_nav_model_srv__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/nav_model_srv */ "./public/app/core/nav_model_srv.ts");
/* harmony import */ var app_core_components_PluginHelp_PluginHelp__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/components/PluginHelp/PluginHelp */ "./public/app/core/components/PluginHelp/PluginHelp.tsx");
/* harmony import */ var _wrappers_AppConfigWrapper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./wrappers/AppConfigWrapper */ "./public/app/features/plugins/wrappers/AppConfigWrapper.tsx");
/* harmony import */ var _PluginDashboards__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./PluginDashboards */ "./public/app/features/plugins/PluginDashboards.tsx");
/* harmony import */ var app_core_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/core/core */ "./public/app/core/core.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Libraries



 // Types













function getLoadingNav() {
  var node = {
    text: '加载中...',
    icon: 'icon-gf icon-gf-panel'
  };
  return {
    node: node,
    main: node
  };
}

function loadPlugin(pluginId) {
  return Object(_PluginSettingsCache__WEBPACK_IMPORTED_MODULE_8__["getPluginSettings"])(pluginId).then(function (info) {
    if (info.type === _grafana_data__WEBPACK_IMPORTED_MODULE_4__["PluginType"].app) {
      return Object(_plugin_loader__WEBPACK_IMPORTED_MODULE_9__["importAppPlugin"])(info);
    }

    if (info.type === _grafana_data__WEBPACK_IMPORTED_MODULE_4__["PluginType"].datasource) {
      return Object(_plugin_loader__WEBPACK_IMPORTED_MODULE_9__["importDataSourcePlugin"])(info);
    }

    if (info.type === _grafana_data__WEBPACK_IMPORTED_MODULE_4__["PluginType"].panel) {
      return Object(_plugin_loader__WEBPACK_IMPORTED_MODULE_9__["importPanelPlugin"])(pluginId).then(function (plugin) {
        // Panel Meta does not have the *full* settings meta
        return Object(_PluginSettingsCache__WEBPACK_IMPORTED_MODULE_8__["getPluginSettings"])(pluginId).then(function (meta) {
          plugin.meta = _objectSpread({}, meta, {}, plugin.meta);
          return plugin;
        });
      });
    }

    if (info.type === _grafana_data__WEBPACK_IMPORTED_MODULE_4__["PluginType"].renderer) {
      return Promise.resolve({
        meta: info
      });
    }

    return Promise.reject('Unknown Plugin type: ' + info.type);
  });
}

var PAGE_ID_README = 'readme';
var PAGE_ID_DASHBOARDS = 'dashboards';
var PAGE_ID_CONFIG_CTRL = 'config';

var PluginPage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PluginPage, _PureComponent);

  function PluginPage(props) {
    var _this;

    _classCallCheck(this, PluginPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PluginPage).call(this, props));

    _this.showUpdateInfo = function () {
      app_core_core__WEBPACK_IMPORTED_MODULE_14__["appEvents"].emit(app_types__WEBPACK_IMPORTED_MODULE_5__["CoreEvents"].showModal, {
        src: 'public/app/features/plugins/partials/update_instructions.html',
        model: _this.state.plugin.meta
      });
    };

    _this.state = {
      loading: true,
      nav: getLoadingNav(),
      defaultPage: PAGE_ID_README
    };
    return _this;
  }

  _createClass(PluginPage, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this$props, pluginId, path, query, $contextSrv, appSubUrl, plugin, _getPluginTabsNav, defaultPage, nav;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = this.props, pluginId = _this$props.pluginId, path = _this$props.path, query = _this$props.query, $contextSrv = _this$props.$contextSrv;
                appSubUrl = app_core_config__WEBPACK_IMPORTED_MODULE_15__["config"].appSubUrl;
                _context.next = 4;
                return loadPlugin(pluginId);

              case 4:
                plugin = _context.sent;

                if (plugin) {
                  _context.next = 8;
                  break;
                }

                this.setState({
                  loading: false,
                  nav: Object(app_core_nav_model_srv__WEBPACK_IMPORTED_MODULE_10__["getNotFoundNav"])()
                });
                return _context.abrupt("return");

              case 8:
                _getPluginTabsNav = getPluginTabsNav(plugin, appSubUrl, path, query, $contextSrv.hasRole('Admin')), defaultPage = _getPluginTabsNav.defaultPage, nav = _getPluginTabsNav.nav;
                this.setState({
                  loading: false,
                  plugin: plugin,
                  defaultPage: defaultPage,
                  nav: nav
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevPage = prevProps.query.page;
      var page = this.props.query.page;

      if (prevPage !== page) {
        var _this$state = this.state,
            nav = _this$state.nav,
            defaultPage = _this$state.defaultPage;

        var node = _objectSpread({}, nav.node, {
          children: setActivePage(page, nav.node.children, defaultPage)
        });

        this.setState({
          nav: {
            node: node,
            main: node
          }
        });
      }
    }
  }, {
    key: "renderBody",
    value: function renderBody() {
      var query = this.props.query;
      var _this$state2 = this.state,
          plugin = _this$state2.plugin,
          nav = _this$state2.nav;

      if (!plugin) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_6__["Alert"], {
          severity: app_types__WEBPACK_IMPORTED_MODULE_5__["AppNotificationSeverity"].Error,
          title: "\u627E\u4E0D\u5230\u63D2\u4EF6"
        });
      }

      var active = nav.main.children.find(function (tab) {
        return tab.active;
      });

      if (active) {
        // Find the current config tab
        if (plugin.configPages) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = plugin.configPages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var tab = _step.value;

              if (tab.id === active.id) {
                return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(tab.body, {
                  plugin: plugin,
                  query: query
                });
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        } // Apps have some special behavior


        if (plugin.meta.type === _grafana_data__WEBPACK_IMPORTED_MODULE_4__["PluginType"].app) {
          if (active.id === PAGE_ID_DASHBOARDS) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PluginDashboards__WEBPACK_IMPORTED_MODULE_13__["PluginDashboards"], {
              plugin: plugin.meta
            });
          }

          if (active.id === PAGE_ID_CONFIG_CTRL && plugin.angularConfigCtrl) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_wrappers_AppConfigWrapper__WEBPACK_IMPORTED_MODULE_12__["AppConfigCtrlWrapper"], {
              app: plugin
            });
          }
        }
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_PluginHelp_PluginHelp__WEBPACK_IMPORTED_MODULE_11__["PluginHelp"], {
        plugin: plugin.meta,
        type: "help"
      });
    }
  }, {
    key: "renderVersionInfo",
    value: function renderVersionInfo(meta) {
      if (!meta.info.version) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
        className: "page-sidebar-section"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "\u7248\u672C"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, meta.info.version), meta.hasUpdate && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
        content: meta.latestVersion,
        theme: "info",
        placement: "top"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#",
        onClick: this.showUpdateInfo
      }, "\u66F4\u65B0\u53EF\u7528\uFF01"))));
    }
  }, {
    key: "renderSidebarIncludeBody",
    value: function renderSidebarIncludeBody(item) {
      if (item.type === _grafana_data__WEBPACK_IMPORTED_MODULE_4__["PluginIncludeType"].page) {
        var pluginId = this.state.plugin.meta.id;
        var page = item.name.toLowerCase().replace(' ', '-');
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "plugins/".concat(pluginId, "/page/").concat(page)
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: getPluginIcon(item.type)
        }), item.name);
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: getPluginIcon(item.type)
      }), item.name);
    }
  }, {
    key: "renderSidebarIncludes",
    value: function renderSidebarIncludes(includes) {
      var _this2 = this;

      if (!includes || !includes.length) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
        className: "page-sidebar-section"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "Includes"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "ui-list plugin-info-list"
      }, includes.map(function (include) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: "plugin-info-list-item",
          key: include.name
        }, _this2.renderSidebarIncludeBody(include));
      })));
    }
  }, {
    key: "renderSidebarDependencies",
    value: function renderSidebarDependencies(dependencies) {
      if (!dependencies) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
        className: "page-sidebar-section"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "\u4F9D\u5B58\u5173\u7CFB"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "ui-list plugin-info-list"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "plugin-info-list-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "public/img/grafana_icon.svg"
      }), "Grafana ", dependencies.grafanaVersion), dependencies.plugins && dependencies.plugins.map(function (plug) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: "plugin-info-list-item",
          key: plug.name
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: getPluginIcon(plug.type)
        }), plug.name, " ", plug.version);
      })));
    }
  }, {
    key: "renderSidebarLinks",
    value: function renderSidebarLinks(info) {
      if (!info.links || !info.links.length) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
        className: "page-sidebar-section"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, "\u94FE\u63A5"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "ui-list"
      }, info.links.map(function (link) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: link.url
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: link.url,
          className: "external-link",
          target: "_blank",
          rel: "noopener"
        }, link.name));
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state3 = this.state,
          loading = _this$state3.loading,
          nav = _this$state3.nav,
          plugin = _this$state3.plugin;
      var $contextSrv = this.props.$contextSrv;
      var isAdmin = $contextSrv.hasRole('Admin');
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_7__["default"], {
        navModel: nav
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_7__["default"].Contents, {
        isLoading: loading
      }, plugin && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "sidebar-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "sidebar-content"
      }, plugin.loadError && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_6__["Alert"], {
        severity: app_types__WEBPACK_IMPORTED_MODULE_5__["AppNotificationSeverity"].Error,
        title: "\u52A0\u8F7D\u63D2\u4EF6\u65F6\u51FA\u9519",
        children: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "\u68C0\u67E5\u670D\u52A1\u5668\u542F\u52A8\u65E5\u5FD7\u4EE5\u83B7\u53D6\u66F4\u591A\u4FE1\u606F\u3002 ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "\u5982\u679C\u6B64\u63D2\u4EF6\u662F\u4ECEgit\u52A0\u8F7D\u7684\uFF0C\u8BF7\u786E\u4FDD\u5DF2\u7F16\u8BD1\u3002")
      }), this.renderBody()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("aside", {
        className: "page-sidebar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
        className: "page-sidebar-section"
      }, this.renderVersionInfo(plugin.meta), isAdmin && this.renderSidebarIncludes(plugin.meta.includes), this.renderSidebarDependencies(plugin.meta.dependencies), this.renderSidebarLinks(plugin.meta.info))))));
    }
  }]);

  return PluginPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function getPluginTabsNav(plugin, appSubUrl, path, query, isAdmin) {
  var meta = plugin.meta;
  var defaultPage;
  var pages = [];

  if (true) {
    pages.push({
      text: '自述文件',
      icon: 'fa fa-fw fa-file-text-o',
      url: "".concat(appSubUrl).concat(path, "?page=").concat(PAGE_ID_README),
      id: PAGE_ID_README
    });
  } // We allow non admins to see plugins but only their readme. Config is hidden even though the API needs to be
  // public for plugins to work properly.


  if (isAdmin) {
    // Only show Config/Pages for app
    if (meta.type === _grafana_data__WEBPACK_IMPORTED_MODULE_4__["PluginType"].app) {
      // Legacy App Config
      if (plugin.angularConfigCtrl) {
        pages.push({
          text: '配置',
          icon: 'gicon gicon-cog',
          url: "".concat(appSubUrl).concat(path, "?page=").concat(PAGE_ID_CONFIG_CTRL),
          id: PAGE_ID_CONFIG_CTRL
        });
        defaultPage = PAGE_ID_CONFIG_CTRL;
      }

      if (plugin.configPages) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = plugin.configPages[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var page = _step2.value;
            pages.push({
              text: page.title,
              icon: page.icon,
              url: "".concat(appSubUrl).concat(path, "?page=").concat(page.id),
              id: page.id
            });

            if (!defaultPage) {
              defaultPage = page.id;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      } // Check for the dashboard pages


      if (lodash_find__WEBPACK_IMPORTED_MODULE_3___default()(meta.includes, {
        type: _grafana_data__WEBPACK_IMPORTED_MODULE_4__["PluginIncludeType"].dashboard
      })) {
        pages.push({
          text: '仪表板',
          icon: 'gicon gicon-dashboard',
          url: "".concat(appSubUrl).concat(path, "?page=").concat(PAGE_ID_DASHBOARDS),
          id: PAGE_ID_DASHBOARDS
        });
      }
    }
  }

  if (!defaultPage) {
    defaultPage = pages[0].id; // the first tab
  }

  var node = {
    text: meta.name,
    img: meta.info.logos.large,
    subTitle: meta.info.author.name,
    breadcrumbs: [{
      title: '插件',
      url: 'plugins'
    }],
    url: "".concat(appSubUrl).concat(path),
    children: setActivePage(query.page, pages, defaultPage)
  };
  return {
    defaultPage: defaultPage,
    nav: {
      node: node,
      main: node
    }
  };
}

function setActivePage(pageId, pages, defaultPageId) {
  var found = false;
  var selected = pageId || defaultPageId;
  var changed = pages.map(function (p) {
    var active = !found && selected === p.id;

    if (active) {
      found = true;
    }

    return _objectSpread({}, p, {
      active: active
    });
  });

  if (!found) {
    changed[0].active = true;
  }

  return changed;
}

function getPluginIcon(type) {
  switch (type) {
    case 'datasource':
      return 'gicon gicon-datasources';

    case 'panel':
      return 'icon-gf icon-gf-panel';

    case 'app':
      return 'icon-gf icon-gf-apps';

    case 'page':
      return 'icon-gf icon-gf-endpoint-tiny';

    case 'dashboard':
      return 'gicon gicon-dashboard';

    default:
      return 'icon-gf icon-gf-apps';
  }
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    pluginId: state.location.routeParams.pluginId,
    query: state.location.query,
    path: state.location.path
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps)(PluginPage)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/plugins/wrappers/AppConfigWrapper.tsx":
/*!*******************************************************************!*\
  !*** ./public/app/features/plugins/wrappers/AppConfigWrapper.tsx ***!
  \*******************************************************************/
/*! exports provided: AppConfigCtrlWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConfigCtrlWrapper", function() { return AppConfigCtrlWrapper; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/extend */ "./node_modules/lodash/extend.js");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Libraries







var AppConfigCtrlWrapper =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AppConfigCtrlWrapper, _PureComponent);

  // Needed for angular scope
  function AppConfigCtrlWrapper(props) {
    var _this;

    _classCallCheck(this, AppConfigCtrlWrapper);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AppConfigCtrlWrapper).call(this, props));
    _this.element = null;

    _this.preUpdateHook = function () {
      return Promise.resolve();
    };

    _this.postUpdateHook = function () {
      return Promise.resolve();
    };

    _this.update = function () {
      var pluginId = _this.model.id;

      _this.preUpdateHook().then(function () {
        var updateCmd = lodash_extend__WEBPACK_IMPORTED_MODULE_2___default()({
          enabled: _this.model.enabled,
          pinned: _this.model.pinned,
          jsonData: _this.model.jsonData,
          secureJsonData: _this.model.secureJsonData
        }, {});
        return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_5__["getBackendSrv"])().post("/api/plugins/".concat(pluginId, "/settings"), updateCmd);
      }).then(_this.postUpdateHook).then(function (res) {
        window.location.href = window.location.href;
      });
    };

    _this.setPreUpdateHook = function (callback) {
      _this.preUpdateHook = callback;
    };

    _this.setPostUpdateHook = function (callback) {
      _this.postUpdateHook = callback;
    };

    _this.importDashboards = function () {
      Object(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["deprecationWarning"])('AppConfig', 'importDashboards()');
      return Promise.resolve();
    };

    _this.enable = function () {
      _this.model.enabled = true;
      _this.model.pinned = true;

      _this.update();
    };

    _this.disable = function () {
      _this.model.enabled = false;
      _this.model.pinned = false;

      _this.update();
    };

    _this.state = {
      angularCtrl: null,
      refresh: 0
    };
    return _this;
  }

  _createClass(AppConfigCtrlWrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // Force a reload after the first mount -- is there a better way to do this?
      setTimeout(function () {
        _this2.setState({
          refresh: _this2.state.refresh + 1
        });
      }, 5);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!this.element || this.state.angularCtrl) {
        return;
      } // Set a copy of the meta


      this.model = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default()(this.props.app.meta);
      var loader = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_5__["getAngularLoader"])();
      var template = '<plugin-component type="app-config-ctrl"></plugin-component>';
      var scopeProps = {
        ctrl: this
      };
      var angularCtrl = loader.load(this.element, scopeProps, template);
      this.setState({
        angularCtrl: angularCtrl
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var model = this.model;
      var withRightMargin = Object(emotion__WEBPACK_IMPORTED_MODULE_6__["css"])({
        marginRight: '8px'
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        ref: function ref(element) {
          return _this3.element = element;
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), model && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, !model.enabled && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        variant: "primary",
        onClick: this.enable,
        className: withRightMargin
      }, "\u542F\u7528"), model.enabled && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        variant: "primary",
        onClick: this.update,
        className: withRightMargin
      }, "\u66F4\u65B0"), model.enabled && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        variant: "destructive",
        onClick: this.disable,
        className: withRightMargin
      }, "\u7981\u7528")));
    } //-----------------------------------------------------------
    // Copied from plugin_edit_ctrl
    //-----------------------------------------------------------

  }]);

  return AppConfigCtrlWrapper;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/***/ })

}]);
//# sourceMappingURL=PluginPage.1ebdc265fc3bd7452fcd.js.map