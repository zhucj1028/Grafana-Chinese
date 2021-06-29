(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["DashboardImport"],{

/***/ "./public/app/core/components/Select/DataSourcePicker.tsx":
/*!****************************************************************!*\
  !*** ./public/app/core/components/Select/DataSourcePicker.tsx ***!
  \****************************************************************/
/*! exports provided: DataSourcePicker, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourcePicker", function() { return DataSourcePicker; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
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
 // Components



var DataSourcePicker =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DataSourcePicker, _PureComponent);

  function DataSourcePicker(props) {
    var _this;

    _classCallCheck(this, DataSourcePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataSourcePicker).call(this, props));

    _this.onChange = function (item) {
      var ds = _this.props.datasources.find(function (ds) {
        return ds.name === item.value;
      });

      if (ds) {
        _this.props.onChange(ds);
      }
    };

    return _this;
  }

  _createClass(DataSourcePicker, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          datasources = _this$props.datasources,
          current = _this$props.current,
          autoFocus = _this$props.autoFocus,
          hideTextValue = _this$props.hideTextValue,
          onBlur = _this$props.onBlur,
          openMenuOnFocus = _this$props.openMenuOnFocus,
          showLoading = _this$props.showLoading,
          placeholder = _this$props.placeholder,
          invalid = _this$props.invalid;
      var options = datasources.map(function (ds) {
        return {
          value: ds.name,
          label: ds.name,
          imgUrl: ds.meta.info.logos.small
        };
      });
      var value = current && {
        label: current.name.substr(0, 37),
        value: current.name,
        imgUrl: current.meta.info.logos.small,
        loading: showLoading,
        hideText: hideTextValue
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_2__["selectors"].components.DataSourcePicker.container
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
        className: "ds-picker select-container",
        isMulti: false,
        isClearable: false,
        backspaceRemovesValue: false,
        onChange: this.onChange,
        options: options,
        autoFocus: autoFocus,
        onBlur: onBlur,
        openMenuOnFocus: openMenuOnFocus,
        maxMenuHeight: 500,
        menuPlacement: "bottom",
        placeholder: placeholder,
        noOptionsMessage: "No datasources found",
        value: value,
        invalid: invalid
      }));
    }
  }]);

  return DataSourcePicker;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
DataSourcePicker.defaultProps = {
  autoFocus: false,
  openMenuOnFocus: false,
  placeholder: '选择数据源'
};
/* harmony default export */ __webpack_exports__["default"] = (DataSourcePicker);

/***/ }),

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

/***/ "./public/app/features/manage-dashboards/DashboardImportPage.tsx":
/*!***********************************************************************!*\
  !*** ./public/app/features/manage-dashboards/DashboardImportPage.tsx ***!
  \***********************************************************************/
/*! exports provided: DashboardImportPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardImportPage", function() { return DashboardImportPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var app_core_components_connectWithCleanUp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/connectWithCleanUp */ "./public/app/core/components/connectWithCleanUp.tsx");
/* harmony import */ var _components_ImportDashboardOverview__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/ImportDashboardOverview */ "./public/app/features/manage-dashboards/components/ImportDashboardOverview.tsx");
/* harmony import */ var _utils_validation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/validation */ "./public/app/features/manage-dashboards/utils/validation.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/manage-dashboards/state/actions.ts");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      margin-bottom: 32px;\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }













var DashboardImportUnConnected =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DashboardImportUnConnected, _PureComponent);

  function DashboardImportUnConnected() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DashboardImportUnConnected);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DashboardImportUnConnected)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onFileUpload = function (event) {
      var importDashboardJson = _this.props.importDashboardJson;
      var file = event.currentTarget.files && event.currentTarget.files.length > 0 && event.currentTarget.files[0];

      if (file) {
        var reader = new FileReader();

        var readerOnLoad = function readerOnLoad() {
          return function (e) {
            var dashboard;

            try {
              dashboard = JSON.parse(e.target.result);
            } catch (error) {
              app_core_app_events__WEBPACK_IMPORTED_MODULE_9__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["AppEvents"].alertError, ['导入失败', 'JSON-> JS序列化失败: ' + error.message]);
              return;
            }

            importDashboardJson(dashboard);
          };
        };

        reader.onload = readerOnLoad();
        reader.readAsText(file);
      }
    };

    _this.getDashboardFromJson = function (formData) {
      _this.props.importDashboardJson(JSON.parse(formData.dashboardJson));
    };

    _this.getGcomDashboard = function (formData) {
      var dashboardId;
      var match = /(^\d+$)|dashboards\/(\d+)/.exec(formData.gcomDashboard);

      if (match && match[1]) {
        dashboardId = match[1];
      } else if (match && match[2]) {
        dashboardId = match[2];
      }

      if (dashboardId) {
        _this.props.fetchGcomDashboard(dashboardId);
      }
    };

    return _this;
  }

  _createClass(DashboardImportUnConnected, [{
    key: "renderImportForm",
    value: function renderImportForm() {
      var styles = importStyles();
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.option
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FileUpload"], {
        accept: "application/json",
        onFileUpload: this.onFileUpload
      }, "\u4E0A\u4F20JSON\u6587\u4EF6")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.option
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Legend"], null, "\u901A\u8FC7grafana.com\u5BFC\u5165"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Form"], {
        onSubmit: this.getGcomDashboard,
        defaultValues: {
          gcomDashboard: ''
        }
      }, function (_ref) {
        var register = _ref.register,
            errors = _ref.errors;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Field"], {
          invalid: !!errors.gcomDashboard,
          error: errors.gcomDashboard && errors.gcomDashboard.message
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Input"], {
          name: "gcomDashboard",
          placeholder: "Grafana.com\u4FE1\u606F\u4E2D\u5FC3\u7F51\u5740\u6216ID",
          type: "text",
          ref: register({
            required: '必须提供Grafana仪表板网址或ID',
            validate: _utils_validation__WEBPACK_IMPORTED_MODULE_7__["validateGcomDashboard"]
          }),
          addonAfter: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], {
            type: "submit"
          }, "\u52A0\u8F7D")
        }));
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.option
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Legend"], null, "\u901A\u8FC7\u9762\u677FJSON\u5BFC\u5165"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Form"], {
        onSubmit: this.getDashboardFromJson,
        defaultValues: {
          dashboardJson: ''
        }
      }, function (_ref2) {
        var register = _ref2.register,
            errors = _ref2.errors;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Field"], {
          invalid: !!errors.dashboardJson,
          error: errors.dashboardJson && errors.dashboardJson.message
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["TextArea"], {
          name: "dashboardJson",
          ref: register({
            required: '需要仪表板json模型',
            validate: _utils_validation__WEBPACK_IMPORTED_MODULE_7__["validateDashboardJson"]
          }),
          rows: 10
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], {
          type: "submit"
        }, "\u52A0\u8F7D"));
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isLoaded = _this$props.isLoaded,
          navModel = _this$props.navModel;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"], {
        navModel: navModel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"].Contents, null, isLoaded ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ImportDashboardOverview__WEBPACK_IMPORTED_MODULE_6__["ImportDashboardOverview"], null) : this.renderImportForm()));
    }
  }]);

  return DashboardImportUnConnected;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_10__["getNavModel"])(state.navIndex, 'import', undefined, true),
    isLoaded: state.importDashboard.isLoaded
  };
};

var mapDispatchToProps = {
  fetchGcomDashboard: _state_actions__WEBPACK_IMPORTED_MODULE_8__["fetchGcomDashboard"],
  importDashboardJson: _state_actions__WEBPACK_IMPORTED_MODULE_8__["importDashboardJson"]
};
var DashboardImportPage = Object(app_core_components_connectWithCleanUp__WEBPACK_IMPORTED_MODULE_5__["connectWithCleanUp"])(mapStateToProps, mapDispatchToProps, function (state) {
  return state.importDashboard;
})(DashboardImportUnConnected);
/* harmony default export */ __webpack_exports__["default"] = (DashboardImportPage);
DashboardImportPage.displayName = 'DashboardImport';
var importStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["stylesFactory"])(function () {
  return {
    option: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject())
  };
});

/***/ }),

/***/ "./public/app/features/manage-dashboards/components/ImportDashboardForm.tsx":
/*!**********************************************************************************!*\
  !*** ./public/app/features/manage-dashboards/components/ImportDashboardForm.tsx ***!
  \**********************************************************************************/
/*! exports provided: ImportDashboardForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportDashboardForm", function() { return ImportDashboardForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_Select_FolderPicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/components/Select/FolderPicker */ "./public/app/core/components/Select/FolderPicker.tsx");
/* harmony import */ var app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/Select/DataSourcePicker */ "./public/app/core/components/Select/DataSourcePicker.tsx");
/* harmony import */ var _utils_validation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/validation */ "./public/app/features/manage-dashboards/utils/validation.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var ImportDashboardForm = function ImportDashboardForm(_ref) {
  var register = _ref.register,
      errors = _ref.errors,
      control = _ref.control,
      getValues = _ref.getValues,
      uidReset = _ref.uidReset,
      inputs = _ref.inputs,
      initialFolderId = _ref.initialFolderId,
      onUidReset = _ref.onUidReset,
      onCancel = _ref.onCancel,
      onSubmit = _ref.onSubmit;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      isSubmitted = _useState2[0],
      setSubmitted = _useState2[1];
  /*
    This useEffect is needed for overwriting a dashboard. It
    submits the form even if there's validation errors on title or uid.
  */


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (isSubmitted && (errors.title || errors.uid)) {
      onSubmit(getValues({
        nest: true
      }), {});
    }
  }, [errors]);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Legend"], null, "\u9009\u9879"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
    label: "\u540D\u5B57",
    invalid: !!errors.title,
    error: errors.title && errors.title.message
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "title",
    type: "text",
    ref: register({
      required: '名字是必填项',
      validate: function () {
        var _validate = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(v) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return Object(_utils_validation__WEBPACK_IMPORTED_MODULE_4__["validateTitle"])(v, getValues().folder.id);

                case 2:
                  return _context.abrupt("return", _context.sent);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function validate(_x) {
          return _validate.apply(this, arguments);
        }

        return validate;
      }()
    })
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
    label: "\u6587\u4EF6\u5939"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InputControl"], {
    as: app_core_components_Select_FolderPicker__WEBPACK_IMPORTED_MODULE_2__["FolderPicker"],
    name: "folder",
    useNewForms: true,
    enableCreateNew: true,
    initialFolderId: initialFolderId,
    control: control
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
    label: "\u552F\u4E00\u6807\u8BC6\u7B26\uFF08uid\uFF09",
    description: "\u4EEA\u8868\u677F\u7684\u552F\u4E00\u6807\u8BC6\u7B26\uFF08uid\uFF09\u53EF\u7528\u4E8E\u5728\u591A\u4E2AGrafana\u5B89\u88C5\u4E4B\u95F4\u552F\u4E00\u6807\u8BC6\u4EEA\u8868\u677F\u3002 uid\u5141\u8BB8\u4F7F\u7528\u4E00\u81F4\u7684URL\u6765\u8BBF\u95EE\u4EEA\u8868\u677F\uFF0C\u56E0\u6B64\u66F4\u6539\u4EEA\u8868\u677F\u7684\u6807\u9898\u4E0D\u4F1A\u7834\u574F\u6307\u5411\u8BE5\u4EEA\u8868\u677F\u7684\u4EFB\u4F55\u4E66\u7B7E\u94FE\u63A5\u3002",
    invalid: !!errors.uid,
    error: errors.uid && errors.uid.message
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, !uidReset ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "uid",
    disabled: true,
    ref: register({
      validate: function () {
        var _validate2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(v) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return Object(_utils_validation__WEBPACK_IMPORTED_MODULE_4__["validateUid"])(v);

                case 2:
                  return _context2.abrupt("return", _context2.sent);

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function validate(_x2) {
          return _validate2.apply(this, arguments);
        }

        return validate;
      }()
    }),
    addonAfter: !uidReset && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      onClick: onUidReset
    }, "\u66FF\u6362uid")
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "uid",
    ref: register({
      required: true,
      validate: function () {
        var _validate3 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3(v) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return Object(_utils_validation__WEBPACK_IMPORTED_MODULE_4__["validateUid"])(v);

                case 2:
                  return _context3.abrupt("return", _context3.sent);

                case 3:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        function validate(_x3) {
          return _validate3.apply(this, arguments);
        }

        return validate;
      }()
    })
  }))), inputs.dataSources && inputs.dataSources.map(function (input, index) {
    var dataSourceOption = "dataSources[".concat(index, "]");
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      label: input.label,
      key: dataSourceOption,
      invalid: errors.dataSources && !!errors.dataSources[index],
      error: errors.dataSources && errors.dataSources[index] && '需要数据源'
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InputControl"], {
      as: app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_3__["default"],
      name: "".concat(dataSourceOption),
      datasources: input.options,
      control: control,
      placeholder: input.info,
      rules: {
        required: true
      }
    }));
  }), inputs.constants && inputs.constants.map(function (input, index) {
    var constantIndex = "constants[".concat(index, "]");
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      label: input.label,
      error: errors.constants && errors.constants[index] && "".concat(input.label, " \u9700\u8981\u4E00\u4E2A\u503C"),
      invalid: errors.constants && !!errors.constants[index],
      key: constantIndex
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
      ref: register({
        required: true
      }),
      name: "".concat(constantIndex),
      defaultValue: input.value
    }));
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["HorizontalGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    type: "submit",
    variant: getButtonVariant(errors),
    onClick: function onClick() {
      setSubmitted(true);
    }
  }, getButtonText(errors)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    type: "reset",
    variant: "secondary",
    onClick: onCancel
  }, "\u53D6\u6D88")));
};

function getButtonVariant(errors) {
  return errors && (errors.title || errors.uid) ? 'destructive' : 'primary';
}

function getButtonText(errors) {
  return errors && (errors.title || errors.uid) ? 'Import (Overwrite)' : 'Import';
}

/***/ }),

/***/ "./public/app/features/manage-dashboards/components/ImportDashboardOverview.tsx":
/*!**************************************************************************************!*\
  !*** ./public/app/features/manage-dashboards/components/ImportDashboardOverview.tsx ***!
  \**************************************************************************************/
/*! exports provided: ImportDashboardOverview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImportDashboardOverview", function() { return ImportDashboardOverview; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _ImportDashboardForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ImportDashboardForm */ "./public/app/features/manage-dashboards/components/ImportDashboardForm.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../state/actions */ "./public/app/features/manage-dashboards/state/actions.ts");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../state/reducers */ "./public/app/features/manage-dashboards/state/reducers.ts");
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









var ImportDashboardOverviewUnConnected =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ImportDashboardOverviewUnConnected, _PureComponent);

  function ImportDashboardOverviewUnConnected() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ImportDashboardOverviewUnConnected);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ImportDashboardOverviewUnConnected)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      uidReset: false
    };

    _this.onSubmit = function (form) {
      _this.props.importDashboard(form);
    };

    _this.onCancel = function () {
      _this.props.clearLoadedDashboard();
    };

    _this.onUidReset = function () {
      _this.setState({
        uidReset: true
      });
    };

    return _this;
  }

  _createClass(ImportDashboardOverviewUnConnected, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          dashboard = _this$props.dashboard,
          inputs = _this$props.inputs,
          meta = _this$props.meta,
          source = _this$props.source,
          folder = _this$props.folder;
      var uidReset = this.state.uidReset;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, source === _state_reducers__WEBPACK_IMPORTED_MODULE_6__["DashboardSource"].Gcom && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          marginBottom: '24px'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Legend"], null, "\u4ECE\u4E2D\u5BFC\u5165\u4EEA\u8868\u677F", ' ', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "https://grafana.com/dashboards/".concat(dashboard.gnetId),
        className: "external-link",
        target: "_blank"
      }, "Grafana.com"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "filter-table form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "\u53D1\u5E03\u4EBA"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, meta.orgName)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "\u66F4\u65B0\u4E8E"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["dateTimeFormat"])(meta.updatedAt)))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Form"], {
        onSubmit: this.onSubmit,
        defaultValues: _objectSpread({}, dashboard, {
          constants: [],
          dataSources: [],
          folder: folder
        }),
        validateOnMount: true,
        validateFieldsOnMount: ['title', 'uid'],
        validateOn: "onChange"
      }, function (_ref) {
        var register = _ref.register,
            errors = _ref.errors,
            control = _ref.control,
            getValues = _ref.getValues;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ImportDashboardForm__WEBPACK_IMPORTED_MODULE_4__["ImportDashboardForm"], {
          register: register,
          errors: errors,
          control: control,
          getValues: getValues,
          uidReset: uidReset,
          inputs: inputs,
          onCancel: _this2.onCancel,
          onUidReset: _this2.onUidReset,
          onSubmit: _this2.onSubmit,
          initialFolderId: folder.id
        });
      }));
    }
  }]);

  return ImportDashboardOverviewUnConnected;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    dashboard: state.importDashboard.dashboard,
    meta: state.importDashboard.meta,
    source: state.importDashboard.source,
    inputs: state.importDashboard.inputs,
    folder: state.location.routeParams.folderId ? {
      id: Number(state.location.routeParams.folderId)
    } : {
      id: 0
    }
  };
};

var mapDispatchToProps = {
  clearLoadedDashboard: _state_actions__WEBPACK_IMPORTED_MODULE_5__["clearLoadedDashboard"],
  importDashboard: _state_actions__WEBPACK_IMPORTED_MODULE_5__["importDashboard"]
};
var ImportDashboardOverview = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(ImportDashboardOverviewUnConnected);
ImportDashboardOverview.displayName = 'ImportDashboardOverview';

/***/ }),

/***/ "./public/app/features/manage-dashboards/utils/validation.ts":
/*!*******************************************************************!*\
  !*** ./public/app/features/manage-dashboards/utils/validation.ts ***!
  \*******************************************************************/
/*! exports provided: validateDashboardJson, validateGcomDashboard, validateTitle, validateUid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateDashboardJson", function() { return validateDashboardJson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateGcomDashboard", function() { return validateGcomDashboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateTitle", function() { return validateTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateUid", function() { return validateUid; });
/* harmony import */ var _services_ValidationSrv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/ValidationSrv */ "./public/app/features/manage-dashboards/services/ValidationSrv.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");


var validateDashboardJson = function validateDashboardJson(json) {
  try {
    JSON.parse(json);
    return true;
  } catch (error) {
    return '无效的JSON';
  }
};
var validateGcomDashboard = function validateGcomDashboard(gcomDashboard) {
  // From DashboardImportCtrl
  var match = /(^\d+$)|dashboards\/(\d+)/.exec(gcomDashboard);
  return match && (match[1] || match[2]) ? true : '找不到有效的Grafana.com ID';
};
var validateTitle = function validateTitle(newTitle, folderId) {
  return _services_ValidationSrv__WEBPACK_IMPORTED_MODULE_0__["default"].validateNewDashboardName(folderId, newTitle).then(function () {
    return true;
  }).catch(function (error) {
    if (error.type === 'EXISTING') {
      return error.message;
    }
  });
};
var validateUid = function validateUid(value) {
  return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get("/api/dashboards/uid/".concat(value)).then(function (existingDashboard) {
    return "\u4EEA\u8868\u677F '".concat(existingDashboard === null || existingDashboard === void 0 ? void 0 : existingDashboard.dashboard.title, "' \u5728\u6587\u4EF6\u5939 '").concat(existingDashboard === null || existingDashboard === void 0 ? void 0 : existingDashboard.meta.folderTitle, "' \u5185\u6709\u76F8\u540Cuid");
  }).catch(function (error) {
    error.isHandled = true;
    return true;
  });
};

/***/ })

}]);
//# sourceMappingURL=DashboardImport.1ebdc265fc3bd7452fcd.js.map