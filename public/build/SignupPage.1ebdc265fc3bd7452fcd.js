(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["SignupPage"],{

/***/ "./public/app/core/components/Signup/Signup.tsx":
/*!******************************************************!*\
  !*** ./public/app/core/components/Signup/Signup.tsx ***!
  \******************************************************/
/*! exports provided: Signup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Signup", function() { return Signup; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }









var SignupUnconnected = function SignupUnconnected(props) {
  var onSubmit =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(formData) {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (formData.name === '') {
                delete formData.name;
              }

              delete formData.confirm;
              _context.next = 4;
              return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getBackendSrv"])().post('/api/user/signup/step2', {
                email: formData.email,
                code: formData.code,
                username: formData.email,
                orgName: formData.orgName,
                password: formData.password,
                name: formData.name
              }).catch(function (err) {
                var _err$data;

                var msg = ((_err$data = err.data) === null || _err$data === void 0 ? void 0 : _err$data.message) || err;
                app_core_app_events__WEBPACK_IMPORTED_MODULE_5__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_6__["AppEvents"].alertWarning, [msg]);
              });

            case 4:
              response = _context.sent;

              if (response.code === 'redirect-to-select-org') {
                window.location.href = Object(app_core_config__WEBPACK_IMPORTED_MODULE_3__["getConfig"])().appSubUrl + '/profile/select-org?signup=1';
              }

              window.location.href = Object(app_core_config__WEBPACK_IMPORTED_MODULE_3__["getConfig"])().appSubUrl + '/';

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function onSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var defaultValues = {
    email: props.email,
    code: props.code
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Form"], {
    defaultValues: defaultValues,
    onSubmit: onSubmit
  }, function (_ref2) {
    var _errors$email, _errors$password, _errors$confirm;

    var errors = _ref2.errors,
        register = _ref2.register,
        getValues = _ref2.getValues;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      label: "Your name"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      name: "name",
      placeholder: "(optional)",
      ref: register
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      label: "Email",
      invalid: !!errors.email,
      error: (_errors$email = errors.email) === null || _errors$email === void 0 ? void 0 : _errors$email.message
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      name: "email",
      type: "email",
      placeholder: "Email",
      ref: register({
        required: 'Email is required',
        pattern: {
          value: /^\S+@\S+$/,
          message: 'Email is invalid'
        }
      })
    })), !Object(app_core_config__WEBPACK_IMPORTED_MODULE_3__["getConfig"])().autoAssignOrg && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      label: "Org. name"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      name: "orgName",
      placeholder: "Org. name",
      ref: register
    })), Object(app_core_config__WEBPACK_IMPORTED_MODULE_3__["getConfig"])().verifyEmailEnabled && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      label: "Email verification code (sent to your email)"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      name: "code",
      ref: register,
      placeholder: "Code"
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      label: "Password",
      invalid: !!errors.password,
      error: errors === null || errors === void 0 ? void 0 : (_errors$password = errors.password) === null || _errors$password === void 0 ? void 0 : _errors$password.message
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      autoFocus: true,
      type: "password",
      name: "password",
      ref: register({
        required: 'Password is required'
      })
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      label: "Confirm password",
      invalid: !!errors.confirm,
      error: errors === null || errors === void 0 ? void 0 : (_errors$confirm = errors.confirm) === null || _errors$confirm === void 0 ? void 0 : _errors$confirm.message
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      type: "password",
      name: "confirm",
      ref: register({
        required: 'Confirmed password is required',
        validate: function validate(v) {
          return v === getValues().password || 'Passwords must match!';
        }
      })
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["HorizontalGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      type: "submit"
    }, "Submit"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LinkButton"], {
      variant: "link",
      href: Object(app_core_config__WEBPACK_IMPORTED_MODULE_3__["getConfig"])().appSubUrl + '/login'
    }, "Back to login")));
  });
};

var mapStateToProps = function mapStateToProps(state) {
  var _state$location$route, _state$location$route2;

  return {
    email: (_state$location$route = state.location.routeParams.email) === null || _state$location$route === void 0 ? void 0 : _state$location$route.toString(),
    code: (_state$location$route2 = state.location.routeParams.code) === null || _state$location$route2 === void 0 ? void 0 : _state$location$route2.toString()
  };
};

var Signup = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(SignupUnconnected);

/***/ }),

/***/ "./public/app/core/components/Signup/SignupPage.tsx":
/*!**********************************************************!*\
  !*** ./public/app/core/components/Signup/SignupPage.tsx ***!
  \**********************************************************/
/*! exports provided: SignupPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPage", function() { return SignupPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Login_LoginLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Login/LoginLayout */ "./public/app/core/components/Login/LoginLayout.tsx");
/* harmony import */ var _Signup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Signup */ "./public/app/core/components/Signup/Signup.tsx");



var SignupPage = function SignupPage() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Login_LoginLayout__WEBPACK_IMPORTED_MODULE_1__["LoginLayout"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Login_LoginLayout__WEBPACK_IMPORTED_MODULE_1__["InnerBox"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Signup__WEBPACK_IMPORTED_MODULE_2__["Signup"], null)));
};
/* harmony default export */ __webpack_exports__["default"] = (SignupPage);

/***/ })

}]);
//# sourceMappingURL=SignupPage.1ebdc265fc3bd7452fcd.js.map