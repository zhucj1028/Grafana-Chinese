(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["AlertRuleList"],{

/***/ "./public/app/features/alerting/AlertRuleItem.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/alerting/AlertRuleItem.tsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_highlight_words__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-highlight-words */ "./node_modules/react-highlight-words/dist/main.js");
/* harmony import */ var react_highlight_words__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_highlight_words__WEBPACK_IMPORTED_MODULE_1__);
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

 // @ts-ignore




var AlertRuleItem =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AlertRuleItem, _PureComponent);

  function AlertRuleItem() {
    _classCallCheck(this, AlertRuleItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(AlertRuleItem).apply(this, arguments));
  }

  _createClass(AlertRuleItem, [{
    key: "renderText",
    value: function renderText(text) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_highlight_words__WEBPACK_IMPORTED_MODULE_1___default.a, {
        highlightClassName: "highlight-search-match",
        textToHighlight: text,
        searchWords: [this.props.search]
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          rule = _this$props.rule,
          onTogglePause = _this$props.onTogglePause;
      var ruleUrl = "".concat(rule.url, "?editPanel=").concat(rule.panelId, "&tab=alert");
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "alert-rule-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
        size: "xl",
        name: rule.stateIcon,
        className: "alert-rule-item__icon ".concat(rule.stateClass)
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "alert-rule-item__body"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "alert-rule-item__header"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "alert-rule-item__name"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: ruleUrl
      }, this.renderText(rule.name))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "alert-rule-item__text"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "".concat(rule.stateClass)
      }, this.renderText(rule.stateText)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "alert-rule-item__time"
      }, " for ", rule.stateAge))), rule.info && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "small muted alert-rule-item__info"
      }, this.renderText(rule.info))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "alert-rule-item__actions"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["HorizontalGroup"], {
        spacing: "sm"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], {
        placement: "bottom",
        content: "\u6682\u505C\u8B66\u62A5\u89C4\u5219\u5C06\u963B\u6B62\u5176\u6267\u884C"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        variant: "secondary",
        size: "sm",
        icon: rule.state === 'paused' ? 'play' : 'pause',
        onClick: onTogglePause
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], {
        placement: "right",
        content: "\u7F16\u8F91\u8B66\u62A5\u89C4\u5219"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LinkButton"], {
        size: "sm",
        variant: "secondary",
        href: ruleUrl,
        icon: "cog"
      })))));
    }
  }]);

  return AlertRuleItem;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/* harmony default export */ __webpack_exports__["default"] = (AlertRuleItem);

/***/ }),

/***/ "./public/app/features/alerting/AlertRuleList.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/alerting/AlertRuleList.tsx ***!
  \********************************************************/
/*! exports provided: AlertRuleList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertRuleList", function() { return AlertRuleList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _AlertRuleItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AlertRuleItem */ "./public/app/features/alerting/AlertRuleItem.tsx");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/alerting/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/alerting/state/selectors.ts");
/* harmony import */ var app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/components/FilterInput/FilterInput */ "./public/app/core/components/FilterInput/FilterInput.tsx");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/alerting/state/reducers.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
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















var AlertRuleList =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AlertRuleList, _PureComponent);

  function AlertRuleList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AlertRuleList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AlertRuleList)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.stateFilters = [{
      label: '所有',
      value: 'all'
    }, {
      label: '正常',
      value: 'ok'
    }, {
      label: '非正常',
      value: 'not_ok'
    }, {
      label: '警报中',
      value: 'alerting'
    }, {
      label: '无数据',
      value: 'no_data'
    }, {
      label: '暂停',
      value: 'paused'
    }, {
      label: '触发警报',
      value: 'pending'
    }];

    _this.onStateFilterChanged = function (option) {
      _this.props.updateLocation({
        query: {
          state: option.value
        }
      });
    };

    _this.onOpenHowTo = function () {
      app_core_app_events__WEBPACK_IMPORTED_MODULE_5__["default"].emit(app_types__WEBPACK_IMPORTED_MODULE_8__["CoreEvents"].showModal, {
        src: 'public/app/features/alerting/partials/alert_howto.html',
        modalClass: 'confirm-modal',
        model: {}
      });
    };

    _this.onSearchQueryChange = function (value) {
      _this.props.setSearchQuery(value);
    };

    _this.onTogglePause = function (rule) {
      _this.props.togglePauseAlertRule(rule.id, {
        paused: rule.state !== 'paused'
      });
    };

    _this.alertStateFilterOption = function (_ref) {
      var text = _ref.text,
          value = _ref.value;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: value,
        value: value
      }, text);
    };

    return _this;
  }

  _createClass(AlertRuleList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchRules();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.stateFilter !== this.props.stateFilter) {
        this.fetchRules();
      }
    }
  }, {
    key: "fetchRules",
    value: function () {
      var _fetchRules = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.props.getAlertRulesAsync({
                  state: this.getStateFilter()
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchRules() {
        return _fetchRules.apply(this, arguments);
      }

      return fetchRules;
    }()
  }, {
    key: "getStateFilter",
    value: function getStateFilter() {
      var stateFilter = this.props.stateFilter;

      if (stateFilter) {
        return stateFilter.toString();
      }

      return 'all';
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          navModel = _this$props.navModel,
          alertRules = _this$props.alertRules,
          search = _this$props.search,
          isLoading = _this$props.isLoading;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"], {
        navModel: navModel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"].Contents, {
        isLoading: isLoading
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form gf-form--grow"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_11__["FilterInput"], {
        labelClassName: "gf-form--has-input-icon gf-form--grow",
        inputClassName: "gf-form-input",
        placeholder: "\u641C\u7D22\u63D0\u9192",
        value: search,
        onChange: this.onSearchQueryChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "gf-form-label"
      }, "\u72B6\u6001"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "width-13"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_13__["Select"], {
        options: this.stateFilters,
        onChange: this.onStateFilterChanged,
        value: this.getStateFilter()
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar__spacer"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_13__["Button"], {
        variant: "secondary",
        onClick: this.onOpenHowTo
      }, "\u5982\u4F55\u6DFB\u52A0\u8B66\u62A5")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ol", {
        className: "alert-rule-list"
      }, alertRules.map(function (rule) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AlertRuleItem__WEBPACK_IMPORTED_MODULE_4__["default"], {
          rule: rule,
          key: rule.id,
          search: search,
          onTogglePause: function onTogglePause() {
            return _this2.onTogglePause(rule);
          }
        });
      })))));
    }
  }]);

  return AlertRuleList;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_7__["getNavModel"])(state.navIndex, 'alert-list'),
    alertRules: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getAlertRuleItems"])(state.alertRules),
    stateFilter: state.location.query.state,
    search: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getSearchQuery"])(state.alertRules),
    isLoading: state.alertRules.isLoading
  };
};

var mapDispatchToProps = {
  updateLocation: app_core_actions__WEBPACK_IMPORTED_MODULE_6__["updateLocation"],
  getAlertRulesAsync: _state_actions__WEBPACK_IMPORTED_MODULE_9__["getAlertRulesAsync"],
  setSearchQuery: _state_reducers__WEBPACK_IMPORTED_MODULE_12__["setSearchQuery"],
  togglePauseAlertRule: _state_actions__WEBPACK_IMPORTED_MODULE_9__["togglePauseAlertRule"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(AlertRuleList)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/alerting/state/actions.ts":
/*!*******************************************************!*\
  !*** ./public/app/features/alerting/state/actions.ts ***!
  \*******************************************************/
/*! exports provided: getAlertRulesAsync, togglePauseAlertRule, createNotificationChannel, updateNotificationChannel, testNotificationChannel, loadNotificationTypes, loadNotificationChannel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAlertRulesAsync", function() { return getAlertRulesAsync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "togglePauseAlertRule", function() { return togglePauseAlertRule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNotificationChannel", function() { return createNotificationChannel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateNotificationChannel", function() { return updateNotificationChannel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testNotificationChannel", function() { return testNotificationChannel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadNotificationTypes", function() { return loadNotificationTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadNotificationChannel", function() { return loadNotificationChannel; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/core */ "./public/app/core/core.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reducers */ "./public/app/features/alerting/state/reducers.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






function getAlertRulesAsync(options) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dispatch) {
        var rules;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_4__["loadAlertRules"])());
                _context.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get('/api/alerts', options);

              case 3:
                rules = _context.sent;
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_4__["loadedAlertRules"])(rules));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}
function togglePauseAlertRule(id, options) {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(dispatch, getState) {
        var stateFilter;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post("/api/alerts/".concat(id, "/pause"), options);

              case 2:
                stateFilter = getState().location.query.state || 'all';
                dispatch(getAlertRulesAsync({
                  state: stateFilter.toString()
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
}
function createNotificationChannel(data) {
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(dispatch) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post("/api/alert-notifications", data);

              case 3:
                app_core_core__WEBPACK_IMPORTED_MODULE_2__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["AppEvents"].alertSuccess, ['Notification created']);
                dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateLocation"])({
                  path: 'alerting/notifications'
                }));
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                app_core_core__WEBPACK_IMPORTED_MODULE_2__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["AppEvents"].alertError, [_context3.t0.data.error]);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      return function (_x4) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
}
function updateNotificationChannel(data) {
  return (
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(dispatch) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().put("/api/alert-notifications/".concat(data.id), data);

              case 3:
                app_core_core__WEBPACK_IMPORTED_MODULE_2__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["AppEvents"].alertSuccess, ['Notification updated']);
                dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateLocation"])({
                  path: 'alerting/notifications'
                }));
                _context4.next = 10;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                app_core_core__WEBPACK_IMPORTED_MODULE_2__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["AppEvents"].alertError, [_context4.t0.data.error]);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }));

      return function (_x5) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
}
function testNotificationChannel(data) {
  return (
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(dispatch, getState) {
        var channel;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                channel = getState().notificationChannel.notificationChannel;
                _context5.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post('/api/alert-notifications/test', _objectSpread({
                  id: channel.id
                }, data));

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x6, _x7) {
        return _ref5.apply(this, arguments);
      };
    }()
  );
}
function loadNotificationTypes() {
  return (
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(dispatch) {
        var alertNotifiers, notificationTypes;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get("/api/alert-notifiers");

              case 2:
                alertNotifiers = _context6.sent;
                notificationTypes = alertNotifiers.sort(function (o1, o2) {
                  if (o1.name > o2.name) {
                    return 1;
                  }

                  return -1;
                });
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_4__["setNotificationChannels"])(notificationTypes));

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x8) {
        return _ref6.apply(this, arguments);
      };
    }()
  );
}
function loadNotificationChannel(id) {
  return (
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(dispatch) {
        var notificationChannel;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get("/api/alert-notifications/".concat(id));

              case 2:
                notificationChannel = _context7.sent;
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_4__["notificationChannelLoaded"])(notificationChannel));

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x9) {
        return _ref7.apply(this, arguments);
      };
    }()
  );
}

/***/ }),

/***/ "./public/app/features/alerting/state/selectors.ts":
/*!*********************************************************!*\
  !*** ./public/app/features/alerting/state/selectors.ts ***!
  \*********************************************************/
/*! exports provided: getSearchQuery, getAlertRuleItems, getNotificationChannel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSearchQuery", function() { return getSearchQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAlertRuleItems", function() { return getAlertRuleItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNotificationChannel", function() { return getNotificationChannel; });
var getSearchQuery = function getSearchQuery(state) {
  return state.searchQuery;
};
var getAlertRuleItems = function getAlertRuleItems(state) {
  var regex = new RegExp(state.searchQuery, 'i');
  return state.items.filter(function (item) {
    return regex.test(item.name) || regex.test(item.stateText) || regex.test(item.info);
  });
};
var getNotificationChannel = function getNotificationChannel(state, channelId) {
  if (state.notificationChannel.id === channelId) {
    return state.notificationChannel;
  }

  return null;
};

/***/ })

}]);
//# sourceMappingURL=AlertRuleList.1ebdc265fc3bd7452fcd.js.map