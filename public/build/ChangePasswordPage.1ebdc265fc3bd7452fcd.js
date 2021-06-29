(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ChangePasswordPage"],{

/***/ "./public/app/core/components/ForgottenPassword/ChangePasswordPage.tsx":
/*!*****************************************************************************!*\
  !*** ./public/app/core/components/ForgottenPassword/ChangePasswordPage.tsx ***!
  \*****************************************************************************/
/*! exports provided: ChangePasswordPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordPage", function() { return ChangePasswordPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Login_LoginLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Login/LoginLayout */ "./public/app/core/components/Login/LoginLayout.tsx");
/* harmony import */ var _ChangePassword__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ChangePassword */ "./public/app/core/components/ForgottenPassword/ChangePassword.tsx");
/* harmony import */ var _Login_LoginCtrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Login/LoginCtrl */ "./public/app/core/components/Login/LoginCtrl.tsx");




var ChangePasswordPage = function ChangePasswordPage() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Login_LoginLayout__WEBPACK_IMPORTED_MODULE_1__["LoginLayout"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Login_LoginLayout__WEBPACK_IMPORTED_MODULE_1__["InnerBox"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Login_LoginCtrl__WEBPACK_IMPORTED_MODULE_3__["default"], null, function (_ref) {
    var changePassword = _ref.changePassword;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ChangePassword__WEBPACK_IMPORTED_MODULE_2__["ChangePassword"], {
      onSubmit: changePassword
    });
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (ChangePasswordPage);

/***/ }),

/***/ "./public/app/features/profile/ChangePasswordForm.tsx":
/*!************************************************************!*\
  !*** ./public/app/features/profile/ChangePasswordForm.tsx ***!
  \************************************************************/
/*! exports provided: ChangePasswordForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordForm", function() { return ChangePasswordForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        max-width: 400px;\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var ChangePasswordForm = function ChangePasswordForm(_ref) {
  var onChangePassword = _ref.onChangePassword,
      isSaving = _ref.isSaving;
  var ldapEnabled = app_core_config__WEBPACK_IMPORTED_MODULE_1__["default"].ldapEnabled,
      authProxyEnabled = app_core_config__WEBPACK_IMPORTED_MODULE_1__["default"].authProxyEnabled;

  if (ldapEnabled || authProxyEnabled) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "\u542F\u7528ldap\u6216auth\u4EE3\u7406\u8EAB\u4EFD\u9A8C\u8BC1\u65F6\uFF0C\u65E0\u6CD5\u66F4\u6539\u5BC6\u7801\u3002");
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(_templateObject())
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Form"], {
    onSubmit: onChangePassword
  }, function (_ref2) {
    var _errors$oldPassword, _errors$newPassword, _errors$confirmNew;

    var register = _ref2.register,
        errors = _ref2.errors,
        getValues = _ref2.getValues;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      label: "\u65E7\u5BC6\u7801",
      invalid: !!errors.oldPassword,
      error: errors === null || errors === void 0 ? void 0 : (_errors$oldPassword = errors.oldPassword) === null || _errors$oldPassword === void 0 ? void 0 : _errors$oldPassword.message
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      type: "password",
      name: "oldPassword",
      ref: register({
        required: '旧密码必填项'
      })
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      label: "\u65B0\u5BC6\u7801",
      invalid: !!errors.newPassword,
      error: errors === null || errors === void 0 ? void 0 : (_errors$newPassword = errors.newPassword) === null || _errors$newPassword === void 0 ? void 0 : _errors$newPassword.message
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      type: "password",
      name: "newPassword",
      ref: register({
        required: '新密码必填项',
        validate: {
          confirm: function confirm(v) {
            return v === getValues().confirmNew || '密码必须匹配';
          },
          old: function old(v) {
            return v !== getValues().oldPassword || "\u65B0\u5BC6\u7801\u4E0D\u80FD\u4E0E\u65E7\u5BC6\u7801\u76F8\u540C\u3002";
          }
        }
      })
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      label: "\u786E\u8BA4\u5BC6\u7801",
      invalid: !!errors.confirmNew,
      error: errors === null || errors === void 0 ? void 0 : (_errors$confirmNew = errors.confirmNew) === null || _errors$confirmNew === void 0 ? void 0 : _errors$confirmNew.message
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      type: "password",
      name: "confirmNew",
      ref: register({
        required: '需要新的密码确认',
        validate: function validate(v) {
          return v === getValues().newPassword || '密码必须匹配';
        }
      })
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["HorizontalGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      variant: "primary",
      disabled: isSaving
    }, "\u66F4\u6539\u5BC6\u7801"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LinkButton"], {
      variant: "secondary",
      href: "".concat(app_core_config__WEBPACK_IMPORTED_MODULE_1__["default"].appSubUrl, "/profile")
    }, "\u53D6\u6D88")));
  }));
};

/***/ }),

/***/ "./public/app/features/profile/ChangePasswordPage.tsx":
/*!************************************************************!*\
  !*** ./public/app/features/profile/ChangePasswordPage.tsx ***!
  \************************************************************/
/*! exports provided: ChangePasswordPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordPage", function() { return ChangePasswordPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_core_utils_UserProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/utils/UserProvider */ "./public/app/core/utils/UserProvider.tsx");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _ChangePasswordForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ChangePasswordForm */ "./public/app/features/profile/ChangePasswordForm.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var ChangePasswordPage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ChangePasswordPage, _PureComponent);

  function ChangePasswordPage() {
    _classCallCheck(this, ChangePasswordPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(ChangePasswordPage).apply(this, arguments));
  }

  _createClass(ChangePasswordPage, [{
    key: "render",
    value: function render() {
      var navModel = this.props.navModel;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"], {
        navModel: navModel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_utils_UserProvider__WEBPACK_IMPORTED_MODULE_4__["UserProvider"], null, function (_ref, states) {
        var changePassword = _ref.changePassword;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"].Contents, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
          className: "page-sub-heading"
        }, "\u66F4\u6539\u4F60\u7684\u5BC6\u7801"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ChangePasswordForm__WEBPACK_IMPORTED_MODULE_6__["ChangePasswordForm"], {
          onChangePassword: changePassword,
          isSaving: states.changePassword
        }));
      }));
    }
  }]);

  return ChangePasswordPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapStateToProps(state) {
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_3__["getNavModel"])(state.navIndex, "change-password")
  };
}

var mapDispatchToProps = {};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ChangePasswordPage)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=ChangePasswordPage.1ebdc265fc3bd7452fcd.js.map