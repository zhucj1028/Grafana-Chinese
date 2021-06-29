(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["DataSourceSettingsPage"],{

/***/ "./public/app/core/components/connectWithCleanUp.tsx":
/*!***********************************************************!*\
  !*** ./public/app/core/components/connectWithCleanUp.tsx ***!
  \***********************************************************/
/*! exports provided: connectWithCleanUp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connectWithCleanUp", function() { return connectWithCleanUp; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_cleanUp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/cleanUp */ "./public/app/core/actions/cleanUp.ts");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3__);




var connectWithCleanUp = function connectWithCleanUp(mapStateToProps, mapDispatchToProps, stateSelector) {
  return function (Component) {
    var ConnectedComponent = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps // @ts-ignore
    )(Component);

    var ConnectedComponentWithCleanUp = function ConnectedComponentWithCleanUp(props) {
      var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["useDispatch"])();
      Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
        return function cleanUp() {
          dispatch(Object(_actions_cleanUp__WEBPACK_IMPORTED_MODULE_1__["cleanUpAction"])({
            stateSelector: stateSelector
          }));
        };
      }, []); // @ts-ignore

      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ConnectedComponent, props);
    };

    ConnectedComponentWithCleanUp.displayName = "ConnectWithCleanUp(".concat(ConnectedComponent.displayName, ")");
    hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3___default()(ConnectedComponentWithCleanUp, Component);
    return ConnectedComponentWithCleanUp;
  };
};

/***/ }),

/***/ "./public/app/features/datasources/settings/BasicSettings.tsx":
/*!********************************************************************!*\
  !*** ./public/app/features/datasources/settings/BasicSettings.tsx ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");



var Input = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].Input,
    Switch = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].Switch;

var BasicSettings = function BasicSettings(_ref) {
  var dataSourceName = _ref.dataSourceName,
      isDefault = _ref.isDefault,
      onDefaultChange = _ref.onDefaultChange,
      onNameChange = _ref.onNameChange;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-group",
    "aria-label": "\u6570\u636E\u6E90\u8BBE\u7F6E\u9875\u9762\u7684\u57FA\u672C\u8BBE\u7F6E"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-inline"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form max-width-30",
    style: {
      marginRight: '3px'
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
    tooltip: '在面板中选择数据源时使用该名称。 默认数据源是 ' + '在新面板中预先选择。'
  }, "\u540D\u5B57"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
    className: "gf-form-input max-width-23",
    type: "text",
    value: dataSourceName,
    placeholder: "\u540D\u5B57",
    onChange: function onChange(event) {
      return onNameChange(event.target.value);
    },
    required: true,
    "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_2__["selectors"].pages.DataSource.name
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Switch, {
    label: "\u9ED8\u8BA4",
    checked: isDefault,
    onChange: function onChange(event) {
      // @ts-ignore
      onDefaultChange(event.target.checked);
    }
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (BasicSettings);

/***/ }),

/***/ "./public/app/features/datasources/settings/ButtonRow.tsx":
/*!****************************************************************!*\
  !*** ./public/app/features/datasources/settings/ButtonRow.tsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");




var ButtonRow = function ButtonRow(_ref) {
  var isReadOnly = _ref.isReadOnly,
      onDelete = _ref.onDelete,
      onSubmit = _ref.onSubmit,
      onTest = _ref.onTest;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-button-row"
  }, !isReadOnly && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    disabled: isReadOnly,
    onClick: function onClick(event) {
      return onSubmit(event);
    },
    "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_1__["selectors"].pages.DataSource.saveAndTest
  }, "\u4FDD\u5B58 & \u6D4B\u8BD5"), isReadOnly && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "submit",
    className: "btn btn-success",
    onClick: onTest
  }, "\u6D4B\u8BD5"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "btn btn-danger",
    disabled: isReadOnly,
    onClick: onDelete,
    "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_1__["selectors"].pages.DataSource.delete
  }, "\u5220\u9664"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "btn btn-inverse",
    href: "".concat(app_core_config__WEBPACK_IMPORTED_MODULE_2__["default"].appSubUrl, "/datasources")
  }, "\u8FD4\u56DE"));
};

/* harmony default export */ __webpack_exports__["default"] = (ButtonRow);

/***/ }),

/***/ "./public/app/features/datasources/settings/DataSourceSettingsPage.tsx":
/*!*****************************************************************************!*\
  !*** ./public/app/features/datasources/settings/DataSourceSettingsPage.tsx ***!
  \*****************************************************************************/
/*! exports provided: DataSourceSettingsPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourceSettingsPage", function() { return DataSourceSettingsPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_isString__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/isString */ "./node_modules/lodash/isString.js");
/* harmony import */ var lodash_isString__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_isString__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _PluginSettings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PluginSettings */ "./public/app/features/datasources/settings/PluginSettings.tsx");
/* harmony import */ var _BasicSettings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./BasicSettings */ "./public/app/features/datasources/settings/BasicSettings.tsx");
/* harmony import */ var _ButtonRow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ButtonRow */ "./public/app/features/datasources/settings/ButtonRow.tsx");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../state/selectors */ "./public/app/features/datasources/state/selectors.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../state/actions */ "./public/app/features/datasources/state/actions.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_core_selectors_location__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/core/selectors/location */ "./public/app/core/selectors/location.ts");
/* harmony import */ var app_types___WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/types/ */ "./public/app/types/index.ts");
/* harmony import */ var _state_navModel__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../state/navModel */ "./public/app/features/datasources/state/navModel.ts");
/* harmony import */ var app_features_plugins_PluginStateInfo__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! app/features/plugins/PluginStateInfo */ "./public/app/features/plugins/PluginStateInfo.tsx");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../state/reducers */ "./public/app/features/datasources/state/reducers.ts");
/* harmony import */ var app_core_components_connectWithCleanUp__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! app/core/components/connectWithCleanUp */ "./public/app/core/components/connectWithCleanUp.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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




 // Services & Utils

 // Actions & selectors




 // Types






var DataSourceSettingsPage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DataSourceSettingsPage, _PureComponent);

  function DataSourceSettingsPage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DataSourceSettingsPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DataSourceSettingsPage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onSubmit =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(evt) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                evt.preventDefault();
                _context.next = 3;
                return _this.props.updateDataSource(_objectSpread({}, _this.props.dataSource));

              case 3:
                _this.testDataSource();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.onTest =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(evt) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                evt.preventDefault();

                _this.testDataSource();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.onDelete = function () {
      app_core_app_events__WEBPACK_IMPORTED_MODULE_9__["default"].emit(app_types___WEBPACK_IMPORTED_MODULE_14__["CoreEvents"].showConfirmModal, {
        title: '删除',
        text: '您确定要删除此数据源吗?',
        yesText: '删除',
        icon: 'trash-alt',
        onConfirm: function onConfirm() {
          _this.confirmDelete();
        }
      });
    };

    _this.confirmDelete = function () {
      _this.props.deleteDataSource();
    };

    _this.onModelChange = function (dataSource) {
      _this.props.dataSourceLoaded(dataSource);
    };

    return _this;
  }

  _createClass(DataSourceSettingsPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          initDataSourceSettings = _this$props.initDataSourceSettings,
          pageId = _this$props.pageId;
      initDataSourceSettings(pageId);
    }
  }, {
    key: "isReadOnly",
    value: function isReadOnly() {
      return this.props.dataSource.readOnly === true;
    }
  }, {
    key: "renderIsReadOnlyMessage",
    value: function renderIsReadOnlyMessage() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "grafana-info-box span8"
      }, "\u6B64\u6570\u636E\u6E90\u662F\u7531config\u6DFB\u52A0\u7684\uFF0C\u65E0\u6CD5\u4F7F\u7528UI\u8FDB\u884C\u4FEE\u6539\u3002 \u8BF7\u4E0E\u60A8\u7684\u670D\u52A1\u5668\u7BA1\u7406\u5458\u8054\u7CFB\u4EE5\u66F4\u65B0\u6B64\u6570\u636E\u6E90\u3002");
    }
  }, {
    key: "testDataSource",
    value: function testDataSource() {
      var _this$props2 = this.props,
          dataSource = _this$props2.dataSource,
          testDataSource = _this$props2.testDataSource;
      testDataSource(dataSource.name);
    }
  }, {
    key: "renderLoadError",
    value: function renderLoadError(loadError) {
      var showDelete = false;
      var msg = loadError.toString();

      if (loadError.data) {
        if (loadError.data.message) {
          msg = loadError.data.message;
        }
      } else if (lodash_isString__WEBPACK_IMPORTED_MODULE_2___default()(loadError)) {
        showDelete = true;
      }

      var node = {
        text: msg,
        subTitle: '数据源错误',
        icon: 'exclamation-triangle'
      };
      var nav = {
        node: node,
        main: node
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"], {
        navModel: nav
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"].Contents, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-button-row"
      }, showDelete && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "submit",
        className: "btn btn-danger",
        onClick: this.onDelete
      }, "\u5220\u9664"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-inverse",
        href: "datasources"
      }, "\u8FD4\u56DE")))));
    }
  }, {
    key: "renderConfigPageBody",
    value: function renderConfigPageBody(page) {
      var plugin = this.props.plugin;

      if (!plugin || !plugin.configPages) {
        return null; // still loading
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = plugin.configPages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var p = _step.value;

          if (p.id === page) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(p.body, {
              plugin: plugin,
              query: this.props.query
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

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "\u7F51\u9875\u672A\u627E\u5230\uFF1A ", page);
    }
  }, {
    key: "renderSettings",
    value: function renderSettings() {
      var _this2 = this;

      var _this$props3 = this.props,
          dataSourceMeta = _this$props3.dataSourceMeta,
          setDataSourceName = _this$props3.setDataSourceName,
          setIsDefault = _this$props3.setIsDefault,
          dataSource = _this$props3.dataSource,
          testingStatus = _this$props3.testingStatus,
          plugin = _this$props3.plugin;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        onSubmit: this.onSubmit
      }, this.isReadOnly() && this.renderIsReadOnlyMessage(), dataSourceMeta.state && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "gf-form-label width-10"
      }, "\u63D2\u4EF6\u72B6\u6001"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "gf-form-label gf-form-label--transparent"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_features_plugins_PluginStateInfo__WEBPACK_IMPORTED_MODULE_16__["default"], {
        state: dataSourceMeta.state
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_BasicSettings__WEBPACK_IMPORTED_MODULE_7__["default"], {
        dataSourceName: dataSource.name,
        isDefault: dataSource.isDefault,
        onDefaultChange: function onDefaultChange(state) {
          return setIsDefault(state);
        },
        onNameChange: function onNameChange(name) {
          return setDataSourceName(name);
        }
      }), plugin && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PluginSettings__WEBPACK_IMPORTED_MODULE_6__["PluginSettings"], {
        plugin: plugin,
        dataSource: dataSource,
        dataSourceMeta: dataSourceMeta,
        onModelChange: this.onModelChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-group"
      }, testingStatus && testingStatus.message && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "alert-".concat(testingStatus.status, " alert"),
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_4__["selectors"].pages.DataSource.alert
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "alert-icon"
      }, testingStatus.status === 'error' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Icon"], {
        name: "exclamation-triangle"
      }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Icon"], {
        name: "check"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "alert-body"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "alert-title",
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_4__["selectors"].pages.DataSource.alertMessage
      }, testingStatus.message)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ButtonRow__WEBPACK_IMPORTED_MODULE_8__["default"], {
        onSubmit: function onSubmit(event) {
          return _this2.onSubmit(event);
        },
        isReadOnly: this.isReadOnly(),
        onDelete: this.onDelete,
        onTest: function onTest(event) {
          return _this2.onTest(event);
        }
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          navModel = _this$props4.navModel,
          page = _this$props4.page,
          loadError = _this$props4.loadError;

      if (loadError) {
        return this.renderLoadError(loadError);
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"], {
        navModel: navModel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"].Contents, {
        isLoading: !this.hasDataSource
      }, this.hasDataSource ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, page ? this.renderConfigPageBody(page) : this.renderSettings()) : null));
    }
  }, {
    key: "hasDataSource",
    get: function get() {
      return this.props.dataSource.id > 0;
    }
  }]);

  return DataSourceSettingsPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapStateToProps(state) {
  var pageId = Object(app_core_selectors_location__WEBPACK_IMPORTED_MODULE_13__["getRouteParamsId"])(state.location);
  var dataSource = Object(_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getDataSource"])(state.dataSources, pageId);
  var page = state.location.query.page;
  var _state$dataSourceSett = state.dataSourceSettings,
      plugin = _state$dataSourceSett.plugin,
      loadError = _state$dataSourceSett.loadError,
      testingStatus = _state$dataSourceSett.testingStatus;
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_12__["getNavModel"])(state.navIndex, page ? "datasource-page-".concat(page) : "datasource-settings-".concat(pageId), Object(_state_navModel__WEBPACK_IMPORTED_MODULE_15__["getDataSourceLoadingNav"])('settings')),
    dataSource: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getDataSource"])(state.dataSources, pageId),
    dataSourceMeta: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getDataSourceMeta"])(state.dataSources, dataSource.type),
    pageId: pageId,
    query: state.location.query,
    page: page,
    plugin: plugin,
    loadError: loadError,
    testingStatus: testingStatus
  };
}

var mapDispatchToProps = {
  deleteDataSource: _state_actions__WEBPACK_IMPORTED_MODULE_11__["deleteDataSource"],
  loadDataSource: _state_actions__WEBPACK_IMPORTED_MODULE_11__["loadDataSource"],
  setDataSourceName: _state_reducers__WEBPACK_IMPORTED_MODULE_17__["setDataSourceName"],
  updateDataSource: _state_actions__WEBPACK_IMPORTED_MODULE_11__["updateDataSource"],
  setIsDefault: _state_reducers__WEBPACK_IMPORTED_MODULE_17__["setIsDefault"],
  dataSourceLoaded: _state_reducers__WEBPACK_IMPORTED_MODULE_17__["dataSourceLoaded"],
  initDataSourceSettings: _state_actions__WEBPACK_IMPORTED_MODULE_11__["initDataSourceSettings"],
  testDataSource: _state_actions__WEBPACK_IMPORTED_MODULE_11__["testDataSource"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Object(app_core_components_connectWithCleanUp__WEBPACK_IMPORTED_MODULE_18__["connectWithCleanUp"])(mapStateToProps, mapDispatchToProps, function (state) {
  return state.dataSourceSettings;
})(DataSourceSettingsPage)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/datasources/settings/PluginSettings.tsx":
/*!*********************************************************************!*\
  !*** ./public/app/features/datasources/settings/PluginSettings.tsx ***!
  \*********************************************************************/
/*! exports provided: PluginSettings, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginSettings", function() { return PluginSettings; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var PluginSettings =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PluginSettings, _PureComponent);

  function PluginSettings(props) {
    var _this;

    _classCallCheck(this, PluginSettings);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PluginSettings).call(this, props));

    _this.onModelChanged = function (dataSource) {
      _this.props.onModelChange(dataSource);
    };

    _this.scopeProps = {
      ctrl: {
        datasourceMeta: props.dataSourceMeta,
        current: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.cloneDeep(props.dataSource)
      },
      onModelChanged: _this.onModelChanged
    };
    _this.onModelChanged = _this.onModelChanged.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PluginSettings, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var plugin = this.props.plugin;

      if (!this.element) {
        return;
      }

      if (!plugin.components.ConfigEditor) {
        // React editor is not specified, let's render angular editor
        // How to apprach this better? Introduce ReactDataSourcePlugin interface and typeguard it here?
        var loader = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getAngularLoader"])();
        var template = '<plugin-component type="datasource-config-ctrl" />';
        this.component = loader.load(this.element, this.scopeProps, template);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var plugin = this.props.plugin;

      if (!plugin.components.ConfigEditor && this.props.dataSource !== prevProps.dataSource) {
        this.scopeProps.ctrl.current = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.cloneDeep(this.props.dataSource);
        this.component.digest();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.component) {
        this.component.destroy();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          plugin = _this$props.plugin,
          dataSource = _this$props.dataSource;

      if (!plugin) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        ref: function ref(element) {
          return _this2.element = element;
        }
      }, plugin.components.ConfigEditor && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(plugin.components.ConfigEditor, {
        options: dataSource,
        onOptionsChange: this.onModelChanged
      }));
    }
  }]);

  return PluginSettings;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (PluginSettings);

/***/ }),

/***/ "./public/app/features/plugins/PluginStateInfo.tsx":
/*!*********************************************************!*\
  !*** ./public/app/features/plugins/PluginStateInfo.tsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        margin-left: 16px;\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






function getPluginStateInfoText(state) {
  switch (state) {
    case _grafana_data__WEBPACK_IMPORTED_MODULE_2__["PluginState"].alpha:
      return 'Alpha Plugin: This plugin is a work in progress and updates may include breaking changes';

    case _grafana_data__WEBPACK_IMPORTED_MODULE_2__["PluginState"].beta:
      return 'Beta Plugin: There could be bugs and minor breaking changes to this plugin';
  }

  return null;
}

var PluginStateinfo = function PluginStateinfo(props) {
  var text = getPluginStateInfoText(props.state);

  if (!text) {
    return null;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["AlphaNotice"], {
    state: props.state,
    text: text,
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(_templateObject())
  });
};

/* harmony default export */ __webpack_exports__["default"] = (PluginStateinfo);

/***/ })

}]);
//# sourceMappingURL=DataSourceSettingsPage.1ebdc265fc3bd7452fcd.js.map