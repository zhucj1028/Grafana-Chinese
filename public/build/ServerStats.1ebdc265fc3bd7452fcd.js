(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ServerStats"],{

/***/ "./public/app/features/admin/ServerStats.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/admin/ServerStats.tsx ***!
  \***************************************************/
/*! exports provided: ServerStats, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerStats", function() { return ServerStats; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var _state_apis__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state/apis */ "./public/app/features/admin/state/apis.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
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







var ServerStats =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ServerStats, _PureComponent);

  function ServerStats() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ServerStats);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ServerStats)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      stats: [],
      isLoading: true
    };
    return _this;
  }

  _createClass(ServerStats, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var stats;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.props.getServerStats();

              case 3:
                stats = _context.sent;
                this.setState({
                  stats: stats,
                  isLoading: false
                });
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var navModel = this.props.navModel;
      var _this$state = this.state,
          stats = _this$state.stats,
          isLoading = _this$state.isLoading;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"], {
        navModel: navModel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"].Contents, {
        isLoading: isLoading
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "filter-table form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u540D\u5B57"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u503C"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, stats.map(StatItem)))));
    }
  }]);

  return ServerStats;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function StatItem(stat) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    key: stat.name
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, stat.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, stat.value));
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_3__["getNavModel"])(state.navIndex, 'server-stats'),
    getServerStats: _state_apis__WEBPACK_IMPORTED_MODULE_4__["getServerStats"]
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps)(ServerStats)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/admin/state/apis.ts":
/*!*************************************************!*\
  !*** ./public/app/features/admin/state/apis.ts ***!
  \*************************************************/
/*! exports provided: getServerStats */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getServerStats", function() { return getServerStats; });
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var getServerStats =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().get('api/admin/stats');

          case 3:
            res = _context.sent;
            return _context.abrupt("return", [{
              name: 'Total users',
              value: res.users
            }, {
              name: 'Total admins',
              value: res.admins
            }, {
              name: 'Total editors',
              value: res.editors
            }, {
              name: 'Total viewers',
              value: res.viewers
            }, {
              name: 'Active users (seen last 30 days)',
              value: res.activeUsers
            }, {
              name: 'Active admins (seen last 30 days)',
              value: res.activeAdmins
            }, {
              name: 'Active editors (seen last 30 days)',
              value: res.activeEditors
            }, {
              name: 'Active viewers (seen last 30 days)',
              value: res.activeViewers
            }, {
              name: 'Active sessions',
              value: res.activeSessions
            }, {
              name: 'Total dashboards',
              value: res.dashboards
            }, {
              name: 'Total orgs',
              value: res.orgs
            }, {
              name: 'Total playlists',
              value: res.playlists
            }, {
              name: 'Total snapshots',
              value: res.snapshots
            }, {
              name: 'Total dashboard tags',
              value: res.tags
            }, {
              name: 'Total starred dashboards',
              value: res.stars
            }, {
              name: 'Total alerts',
              value: res.alerts
            }]);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            throw _context.t0;

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getServerStats() {
    return _ref.apply(this, arguments);
  };
}();

/***/ })

}]);
//# sourceMappingURL=ServerStats.1ebdc265fc3bd7452fcd.js.map