(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["FolderSettingsPage"],{

/***/ "./public/app/features/folders/FolderSettingsPage.tsx":
/*!************************************************************!*\
  !*** ./public/app/features/folders/FolderSettingsPage.tsx ***!
  \************************************************************/
/*! exports provided: FolderSettingsPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FolderSettingsPage", function() { return FolderSettingsPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/folders/state/actions.ts");
/* harmony import */ var _state_navModel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/navModel */ "./public/app/features/folders/state/navModel.ts");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/folders/state/reducers.ts");
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





var Input = _grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LegacyForms"].Input;







var FolderSettingsPage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(FolderSettingsPage, _PureComponent);

  function FolderSettingsPage(props) {
    var _this;

    _classCallCheck(this, FolderSettingsPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FolderSettingsPage).call(this, props));

    _this.onTitleChange = function (evt) {
      _this.props.setFolderTitle(evt.target.value);
    };

    _this.onSave =
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
                evt.stopPropagation();

                _this.setState({
                  isLoading: true
                });

                _context.next = 5;
                return _this.props.saveFolder(_this.props.folder);

              case 5:
                _this.setState({
                  isLoading: false
                });

              case 6:
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

    _this.onDelete = function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      app_core_app_events__WEBPACK_IMPORTED_MODULE_5__["default"].emit(app_types__WEBPACK_IMPORTED_MODULE_7__["CoreEvents"].showConfirmModal, {
        title: '删除',
        text: "\u60A8\u662F\u5426\u8981\u5220\u9664\u6B64\u6587\u4EF6\u5939\u53CA\u5176\u6240\u6709\u4EEA\u8868\u677F?",
        icon: 'trash-alt',
        yesText: '删除',
        onConfirm: function onConfirm() {
          _this.props.deleteFolder(_this.props.folder.uid);
        }
      });
    };

    _this.state = {
      isLoading: false
    };
    return _this;
  }

  _createClass(FolderSettingsPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.getFolderByUid(this.props.folderUid);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          navModel = _this$props.navModel,
          folder = _this$props.folder;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"], {
        navModel: navModel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"].Contents, {
        isLoading: this.state.isLoading
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: "page-sub-heading"
      }, "\u6587\u4EF6\u5939\u8BBE\u7F6E"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "section gf-form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        name: "folderSettingsForm",
        onSubmit: this.onSave
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "gf-form-label width-7"
      }, "\u540D\u5B57"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        type: "text",
        className: "gf-form-input width-30",
        value: folder.title,
        onChange: this.onTitleChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-button-row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "submit",
        className: "btn btn-primary",
        disabled: !folder.canSave || !folder.hasChanged
      }, "\u4FDD\u5B58"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-danger",
        onClick: this.onDelete,
        disabled: !folder.canSave
      }, "\u5220\u9664"))))));
    }
  }]);

  return FolderSettingsPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  var uid = state.location.routeParams.uid;
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_6__["getNavModel"])(state.navIndex, "folder-settings-".concat(uid), Object(_state_navModel__WEBPACK_IMPORTED_MODULE_9__["getLoadingNav"])(2)),
    folderUid: uid,
    folder: state.folder
  };
};

var mapDispatchToProps = {
  getFolderByUid: _state_actions__WEBPACK_IMPORTED_MODULE_8__["getFolderByUid"],
  saveFolder: _state_actions__WEBPACK_IMPORTED_MODULE_8__["saveFolder"],
  setFolderTitle: _state_reducers__WEBPACK_IMPORTED_MODULE_10__["setFolderTitle"],
  deleteFolder: _state_actions__WEBPACK_IMPORTED_MODULE_8__["deleteFolder"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(FolderSettingsPage)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=FolderSettingsPage.1ebdc265fc3bd7452fcd.js.map