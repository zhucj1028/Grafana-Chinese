(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~OrgDetailsPage~TeamPages~UserProfileEdit"],{

/***/ "./public/app/core/components/SharedPreferences/SharedPreferences.tsx":
/*!****************************************************************************!*\
  !*** ./public/app/core/components/SharedPreferences/SharedPreferences.tsx ***!
  \****************************************************************************/
/*! exports provided: SharedPreferences, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedPreferences", function() { return SharedPreferences; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      margin-right: 6px;\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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






var themes = [{
  value: '',
  label: '默认'
}, {
  value: 'dark',
  label: '黑暗'
}, {
  value: 'light',
  label: '明亮'
}];
var SharedPreferences =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(SharedPreferences, _PureComponent);

  function SharedPreferences(props) {
    var _this;

    _classCallCheck(this, SharedPreferences);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SharedPreferences).call(this, props));
    _this.backendSrv = app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_4__["backendSrv"];
    _this.onSubmitForm =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _this$state, homeDashboardId, theme, timezone;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$state = _this.state, homeDashboardId = _this$state.homeDashboardId, theme = _this$state.theme, timezone = _this$state.timezone;
              _context.next = 3;
              return app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_4__["backendSrv"].put("/api/".concat(_this.props.resourceUri, "/preferences"), {
                homeDashboardId: homeDashboardId,
                theme: theme,
                timezone: timezone
              });

            case 3:
              window.location.reload();

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    _this.onThemeChanged = function (value) {
      _this.setState({
        theme: value
      });
    };

    _this.onTimeZoneChanged = function (timezone) {
      if (!timezone) {
        return;
      }

      _this.setState({
        timezone: timezone
      });
    };

    _this.onHomeDashboardChanged = function (dashboardId) {
      _this.setState({
        homeDashboardId: dashboardId
      });
    };

    _this.getFullDashName = function (dashboard) {
      if (typeof dashboard.folderTitle === 'undefined' || dashboard.folderTitle === '') {
        return dashboard.title;
      }

      return dashboard.folderTitle + ' / ' + dashboard.title;
    };

    _this.state = {
      homeDashboardId: 0,
      theme: '',
      timezone: '',
      dashboards: []
    };
    return _this;
  }

  _createClass(SharedPreferences, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var prefs, dashboards, defaultDashboardHit, missing;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_4__["backendSrv"].get("/api/".concat(this.props.resourceUri, "/preferences"));

              case 2:
                prefs = _context2.sent;
                _context2.next = 5;
                return app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_4__["backendSrv"].search({
                  starred: true
                });

              case 5:
                dashboards = _context2.sent;
                defaultDashboardHit = {
                  id: 0,
                  title: '默认',
                  tags: [],
                  type: '',
                  uid: '',
                  uri: '',
                  url: '',
                  folderId: 0,
                  folderTitle: '',
                  folderUid: '',
                  folderUrl: '',
                  isStarred: false,
                  slug: '',
                  items: []
                };

                if (!(prefs.homeDashboardId > 0 && !dashboards.find(function (d) {
                  return d.id === prefs.homeDashboardId;
                }))) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 10;
                return app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_4__["backendSrv"].search({
                  dashboardIds: [prefs.homeDashboardId]
                });

              case 10:
                missing = _context2.sent;

                if (missing && missing.length > 0) {
                  dashboards.push(missing[0]);
                }

              case 12:
                this.setState({
                  homeDashboardId: prefs.homeDashboardId,
                  theme: prefs.theme,
                  timezone: prefs.timezone,
                  dashboards: [defaultDashboardHit].concat(_toConsumableArray(dashboards))
                });

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
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

      var _this$state2 = this.state,
          theme = _this$state2.theme,
          timezone = _this$state2.timezone,
          homeDashboardId = _this$state2.homeDashboardId,
          dashboards = _this$state2.dashboards;
      var styles = getStyles();
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Form"], {
        onSubmit: this.onSubmitForm
      }, function () {
        var _themes$find;

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FieldSet"], {
          label: "\u504F\u597D\u8BBE\u5B9A"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
          label: "\u4E3B\u9898"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["RadioButtonGroup"], {
          options: themes,
          value: (_themes$find = themes.find(function (item) {
            return item.value === theme;
          })) === null || _themes$find === void 0 ? void 0 : _themes$find.value,
          onChange: _this2.onThemeChanged
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
          label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Label"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: styles.labelText
          }, "\u4E3B\u4EEA\u8868\u677F"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], {
            content: "\u627E\u4E0D\u5230\u60F3\u8981\u7684\u4EEA\u8868\u677F\uFF1F\u5148\u5BF9\u5176\u52A0\u6CE8\u661F\u6807\uFF0C\u7136\u540E\u5B83\u5E94\u51FA\u73B0\u5728\u6B64\u9009\u62E9\u6846\u4E2D\u3002"
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
            name: "info-circle"
          })))
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], {
          value: dashboards.find(function (dashboard) {
            return dashboard.id === homeDashboardId;
          }),
          getOptionValue: function getOptionValue(i) {
            return i.id;
          },
          getOptionLabel: _this2.getFullDashName,
          onChange: function onChange(dashboard) {
            return _this2.onHomeDashboardChanged(dashboard.id);
          },
          options: dashboards,
          placeholder: "\u9009\u62E9\u9ED8\u8BA4\u4EEA\u8868\u677F"
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
          label: "\u65F6\u533A",
          "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_3__["selectors"].components.TimeZonePicker.container
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["TimeZonePicker"], {
          includeInternal: true,
          value: timezone,
          onChange: _this2.onTimeZoneChanged
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "gf-form-button-row"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
          variant: "primary"
        }, "\u4FDD\u5B58")));
      });
    }
  }]);

  return SharedPreferences;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (SharedPreferences);
var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function () {
  return {
    labelText: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject())
  };
});

/***/ })

}]);
//# sourceMappingURL=default~OrgDetailsPage~TeamPages~UserProfileEdit.1ebdc265fc3bd7452fcd.js.map