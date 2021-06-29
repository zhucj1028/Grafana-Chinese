(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["NewNotificationChannel"],{

/***/ "./public/app/features/alerting/NewNotificationChannelPage.tsx":
/*!*********************************************************************!*\
  !*** ./public/app/features/alerting/NewNotificationChannelPage.tsx ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _components_NotificationChannelForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/NotificationChannelForm */ "./public/app/features/alerting/components/NotificationChannelForm.tsx");
/* harmony import */ var _utils_notificationChannels__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/notificationChannels */ "./public/app/features/alerting/utils/notificationChannels.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/alerting/state/actions.ts");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/alerting/state/reducers.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }












var NewNotificationChannelPage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(NewNotificationChannelPage, _PureComponent);

  function NewNotificationChannelPage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NewNotificationChannelPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NewNotificationChannelPage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onSubmit = function (data) {
      _this.props.createNotificationChannel(Object(_utils_notificationChannels__WEBPACK_IMPORTED_MODULE_6__["transformSubmitData"])(_objectSpread({}, _utils_notificationChannels__WEBPACK_IMPORTED_MODULE_6__["defaultValues"], {}, data)));
    };

    _this.onTestChannel = function (data) {
      _this.props.testNotificationChannel(Object(_utils_notificationChannels__WEBPACK_IMPORTED_MODULE_6__["transformTestData"])(_objectSpread({}, _utils_notificationChannels__WEBPACK_IMPORTED_MODULE_6__["defaultValues"], {}, data)));
    };

    return _this;
  }

  _createClass(NewNotificationChannelPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.loadNotificationTypes();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          navModel = _this$props.navModel,
          notificationChannelTypes = _this$props.notificationChannelTypes;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"], {
        navModel: navModel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"].Contents, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: "page-sub-heading"
      }, "\u65B0\u7684\u901A\u77E5\u9891\u9053"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Form"], {
        onSubmit: this.onSubmit,
        validateOn: "onChange",
        defaultValues: _utils_notificationChannels__WEBPACK_IMPORTED_MODULE_6__["defaultValues"],
        maxWidth: 600
      }, function (_ref) {
        var register = _ref.register,
            errors = _ref.errors,
            control = _ref.control,
            getValues = _ref.getValues,
            watch = _ref.watch;
        var selectedChannel = notificationChannelTypes.find(function (c) {
          return c.value === getValues().type.value;
        });
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_NotificationChannelForm__WEBPACK_IMPORTED_MODULE_5__["NotificationChannelForm"], {
          selectableChannels: Object(_utils_notificationChannels__WEBPACK_IMPORTED_MODULE_6__["mapChannelsToSelectableValue"])(notificationChannelTypes),
          selectedChannel: selectedChannel,
          onTestChannel: _this2.onTestChannel,
          register: register,
          errors: errors,
          getValues: getValues,
          control: control,
          watch: watch,
          imageRendererAvailable: _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["config"].rendererAvailable,
          resetSecureField: _this2.props.resetSecureField,
          secureFields: {}
        });
      })));
    }
  }]);

  return NewNotificationChannelPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_7__["getNavModel"])(state.navIndex, 'channels'),
    notificationChannelTypes: state.notificationChannel.notificationChannelTypes
  };
};

var mapDispatchToProps = {
  createNotificationChannel: _state_actions__WEBPACK_IMPORTED_MODULE_8__["createNotificationChannel"],
  loadNotificationTypes: _state_actions__WEBPACK_IMPORTED_MODULE_8__["loadNotificationTypes"],
  testNotificationChannel: _state_actions__WEBPACK_IMPORTED_MODULE_8__["testNotificationChannel"],
  resetSecureField: _state_reducers__WEBPACK_IMPORTED_MODULE_9__["resetSecureField"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(NewNotificationChannelPage));

/***/ })

}]);
//# sourceMappingURL=NewNotificationChannel.1ebdc265fc3bd7452fcd.js.map