(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["LiveAdmin"],{

/***/ "./public/app/features/admin/LiveAdmin.tsx":
/*!*************************************************!*\
  !*** ./public/app/features/admin/LiveAdmin.tsx ***!
  \*************************************************/
/*! exports provided: LiveAdmin, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveAdmin", function() { return LiveAdmin; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _LivePanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./LivePanel */ "./public/app/features/admin/LivePanel.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var LiveAdmin =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(LiveAdmin, _PureComponent);

  function LiveAdmin() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LiveAdmin);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LiveAdmin)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      channel: 'random-2s-stream',
      text: '' // publish text to a channel

    };

    _this.onChannelChanged = function (v) {
      if (v.value) {
        _this.setState({
          channel: v.value
        });
      }
    };

    _this.onTextChanged = function (event) {
      _this.setState({
        text: event.target.value
      });
    };

    _this.onPublish = function () {
      var _this$state = _this.state,
          text = _this$state.text,
          channel = _this$state.channel;

      if (text) {
        var msg = {
          line: text
        };
        var srv = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_8__["getGrafanaLiveSrv"])();
        srv.publish(channel, msg).then(function (v) {
          console.log('PUBLISHED', text, v);
        });
      }

      _this.setState({
        text: ''
      });
    };

    return _this;
  }

  _createClass(LiveAdmin, [{
    key: "render",
    value: function render() {
      var navModel = this.props.navModel;
      var _this$state2 = this.state,
          channel = _this$state2.channel,
          text = _this$state2.text;
      var channels = [{
        label: 'random-2s-stream',
        value: 'random-2s-stream',
        description: 'Random stream that updates every 2s'
      }, {
        label: 'random-flakey-stream',
        value: 'random-flakey-stream',
        description: 'Random stream with intermittent updates'
      }, {
        label: 'example-chat',
        value: 'example-chat',
        description: 'A channel that expects chat messages'
      }];
      var current = channels.find(function (f) {
        return f.value === channel;
      });

      if (!current) {
        current = {
          label: channel,
          value: channel
        };
        channels.push(current);
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"], {
        navModel: navModel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"].Contents, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["Container"], {
        grow: 1
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["FeatureInfoBox"], {
        title: "Grafana Live",
        featureState: _grafana_data__WEBPACK_IMPORTED_MODULE_5__["FeatureState"].alpha // url={getDocsLink(DocsId.Transformations)}

      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "\u8FD9\u652F\u6301grafana\u6838\u5FC3\u4E2D\u7684\u5B9E\u65F6\u4E8B\u4EF6\u6D41\u3002 \u6B64\u529F\u80FD\u6B63\u5728\u5927\u529B\u5F00\u53D1\u4E2D\u3002 \u968F\u7740\u751F\u4EA7\u51C6\u5907\u5C31\u7EEA\uFF0C\u754C\u9762\u548C\u7ED3\u6784\u4F1A\u53D1\u751F\u53D8\u5316\u3002")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "\u901A\u9053"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["Select"], {
        options: channels,
        value: current,
        onChange: this.onChannelChanged,
        allowCustomValue: true
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LivePanel__WEBPACK_IMPORTED_MODULE_6__["LivePanel"], {
        channel: channel
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "\u5199\u5165\u901A\u9053"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["Input"], {
        value: text,
        onChange: this.onTextChanged
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["Button"], {
        onClick: this.onPublish,
        variant: text ? 'primary' : 'secondary'
      }, "\u53D1\u5E03")));
    }
  }]);

  return LiveAdmin;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_3__["getNavModel"])(state.navIndex, 'live')
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps)(LiveAdmin)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/admin/LivePanel.tsx":
/*!*************************************************!*\
  !*** ./public/app/features/admin/LivePanel.tsx ***!
  \*************************************************/
/*! exports provided: LivePanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LivePanel", function() { return LivePanel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var LivePanel =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(LivePanel, _PureComponent);

  function LivePanel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LivePanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LivePanel)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      connected: false,
      count: 0,
      lastTime: 0,
      lastBody: ''
    };
    _this.observer = {
      next: function next(msg) {
        _this.setState({
          count: _this.state.count + 1,
          lastTime: Date.now(),
          lastBody: JSON.stringify(msg)
        });
      }
    };

    _this.startSubscription = function () {
      if (_this.subscription) {
        _this.subscription.unsubscribe();

        _this.subscription = undefined;
      }

      var srv = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getGrafanaLiveSrv"])();

      if (srv.isConnected()) {
        var stream = srv.getChannelStream(_this.props.channel);
        _this.subscription = stream.subscribe(_this.observer);

        _this.setState({
          connected: true,
          count: 0,
          lastTime: 0,
          lastBody: ''
        });

        return;
      }

      console.log('尚未连接...请重试...');
      setTimeout(_this.startSubscription, 200);
    };

    _this.componentDidMount = function () {
      _this.startSubscription();
    };

    return _this;
  }

  _createClass(LivePanel, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = undefined;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(oldProps) {
      if (oldProps.channel !== this.props.channel) {
        this.startSubscription();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          lastBody = _this$state.lastBody,
          lastTime = _this$state.lastTime,
          count = _this$state.count;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", null, "Count: ", count), lastTime > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", null, "\u6700\u540E: ", lastTime), lastBody && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", null, lastBody))));
    }
  }]);

  return LivePanel;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/***/ })

}]);
//# sourceMappingURL=LiveAdmin.1ebdc265fc3bd7452fcd.js.map