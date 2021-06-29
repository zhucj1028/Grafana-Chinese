(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["VerifyEmailPage"],{

/***/ "./public/app/core/components/Signup/VerifyEmail.tsx":
/*!***********************************************************!*\
  !*** ./public/app/core/components/Signup/VerifyEmail.tsx ***!
  \***********************************************************/
/*! exports provided: VerifyEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifyEmail", function() { return VerifyEmail; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var VerifyEmail = function VerifyEmail() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      emailSent = _useState2[0],
      setEmailSent = _useState2[1];

  var onSubmit = function onSubmit(formModel) {
    Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_3__["getBackendSrv"])().post('/api/user/signup', formModel).then(function () {
      setEmailSent(true);
    }).catch(function (err) {
      var _err$data;

      var msg = ((_err$data = err.data) === null || _err$data === void 0 ? void 0 : _err$data.message) || err;
      app_core_app_events__WEBPACK_IMPORTED_MODULE_4__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["AppEvents"].alertWarning, [msg]);
    });
  };

  if (emailSent) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "An email with a verification link has been sent to the email address. You should receive it shortly."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Container"], {
      margin: "md"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LinkButton"], {
      variant: "primary",
      href: Object(app_core_config__WEBPACK_IMPORTED_MODULE_2__["getConfig"])().appSubUrl + '/signup'
    }, "Complete Signup"));
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Form"], {
    onSubmit: onSubmit
  }, function (_ref) {
    var _email;

    var register = _ref.register,
        errors = _ref.errors;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Legend"], null, "Verify Email"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      label: "Email",
      description: "Enter your email address to get a verification link sent to you",
      invalid: !!errors.email,
      error: (_email = errors.email) === null || _email === void 0 ? void 0 : _email.message
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
      placeholder: "Email",
      name: "email",
      ref: register({
        required: true
      })
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["HorizontalGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], null, "Send verification email"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LinkButton"], {
      variant: "link",
      href: Object(app_core_config__WEBPACK_IMPORTED_MODULE_2__["getConfig"])().appSubUrl + '/login'
    }, "Back to login")));
  });
};

/***/ }),

/***/ "./public/app/core/components/Signup/VerifyEmailPage.tsx":
/*!***************************************************************!*\
  !*** ./public/app/core/components/Signup/VerifyEmailPage.tsx ***!
  \***************************************************************/
/*! exports provided: VerifyEmailPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifyEmailPage", function() { return VerifyEmailPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Login_LoginLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Login/LoginLayout */ "./public/app/core/components/Login/LoginLayout.tsx");
/* harmony import */ var _VerifyEmail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VerifyEmail */ "./public/app/core/components/Signup/VerifyEmail.tsx");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");




var VerifyEmailPage = function VerifyEmailPage() {
  if (!Object(app_core_config__WEBPACK_IMPORTED_MODULE_3__["getConfig"])().verifyEmailEnabled) {
    window.location.href = Object(app_core_config__WEBPACK_IMPORTED_MODULE_3__["getConfig"])().appSubUrl + '/signup';
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Login_LoginLayout__WEBPACK_IMPORTED_MODULE_1__["LoginLayout"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Login_LoginLayout__WEBPACK_IMPORTED_MODULE_1__["InnerBox"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VerifyEmail__WEBPACK_IMPORTED_MODULE_2__["VerifyEmail"], null)));
};
/* harmony default export */ __webpack_exports__["default"] = (VerifyEmailPage);

/***/ })

}]);
//# sourceMappingURL=VerifyEmailPage.1ebdc265fc3bd7452fcd.js.map