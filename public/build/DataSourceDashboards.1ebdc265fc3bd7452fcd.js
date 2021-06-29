(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["DataSourceDashboards"],{

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

/***/ "./public/app/features/datasources/DataSourceDashboards.tsx":
/*!******************************************************************!*\
  !*** ./public/app/features/datasources/DataSourceDashboards.tsx ***!
  \******************************************************************/
/*! exports provided: DataSourceDashboards, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourceDashboards", function() { return DataSourceDashboards; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _DashboardsTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DashboardsTable */ "./public/app/features/datasources/DashboardsTable.tsx");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_core_selectors_location__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/selectors/location */ "./public/app/core/selectors/location.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/datasources/state/actions.ts");
/* harmony import */ var _plugins_state_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../plugins/state/actions */ "./public/app/features/plugins/state/actions.ts");
/* harmony import */ var _dashboard_state_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dashboard/state/actions */ "./public/app/features/dashboard/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/datasources/state/selectors.ts");
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


 // Components


 // Actions & Selectors






 // Types

var DataSourceDashboards =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DataSourceDashboards, _PureComponent);

  function DataSourceDashboards() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DataSourceDashboards);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DataSourceDashboards)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onImport = function (dashboard, overwrite) {
      var _this$props = _this.props,
          dataSource = _this$props.dataSource,
          importDashboard = _this$props.importDashboard;
      var data = {
        pluginId: dashboard.pluginId,
        path: dashboard.path,
        overwrite: overwrite,
        inputs: []
      };

      if (dataSource) {
        data.inputs.push({
          name: '*',
          type: 'datasource',
          pluginId: dataSource.type,
          value: dataSource.name
        });
      }

      importDashboard(data, dashboard.title);
    };

    _this.onRemove = function (dashboard) {
      _this.props.removeDashboard(dashboard.importedUri);
    };

    return _this;
  }

  _createClass(DataSourceDashboards, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this$props2, loadDataSource, pageId;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props2 = this.props, loadDataSource = _this$props2.loadDataSource, pageId = _this$props2.pageId;
                _context.next = 3;
                return loadDataSource(pageId);

              case 3:
                this.props.loadPluginDashboards();

              case 4:
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
      var _this2 = this;

      var _this$props3 = this.props,
          dashboards = _this$props3.dashboards,
          navModel = _this$props3.navModel,
          isLoading = _this$props3.isLoading;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"], {
        navModel: navModel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"].Contents, {
        isLoading: isLoading
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DashboardsTable__WEBPACK_IMPORTED_MODULE_4__["default"], {
        dashboards: dashboards,
        onImport: function onImport(dashboard, overwrite) {
          return _this2.onImport(dashboard, overwrite);
        },
        onRemove: function onRemove(dashboard) {
          return _this2.onRemove(dashboard);
        }
      })));
    }
  }]);

  return DataSourceDashboards;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapStateToProps(state) {
  var pageId = Object(app_core_selectors_location__WEBPACK_IMPORTED_MODULE_6__["getRouteParamsId"])(state.location);
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_5__["getNavModel"])(state.navIndex, "datasource-dashboards-".concat(pageId)),
    pageId: pageId,
    dashboards: state.plugins.dashboards,
    dataSource: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getDataSource"])(state.dataSources, pageId),
    isLoading: state.plugins.isLoadingPluginDashboards
  };
}

var mapDispatchToProps = {
  importDashboard: _dashboard_state_actions__WEBPACK_IMPORTED_MODULE_9__["importDashboard"],
  loadDataSource: _state_actions__WEBPACK_IMPORTED_MODULE_7__["loadDataSource"],
  loadPluginDashboards: _plugins_state_actions__WEBPACK_IMPORTED_MODULE_8__["loadPluginDashboards"],
  removeDashboard: _dashboard_state_actions__WEBPACK_IMPORTED_MODULE_9__["removeDashboard"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(DataSourceDashboards)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=DataSourceDashboards.1ebdc265fc3bd7452fcd.js.map