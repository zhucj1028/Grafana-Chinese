(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["UserInvitePage"],{

/***/ "./public/app/features/org/UserInviteForm.tsx":
/*!****************************************************!*\
  !*** ./public/app/features/org/UserInviteForm.tsx ***!
  \****************************************************/
/*! exports provided: UserInviteForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserInviteForm", function() { return UserInviteForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var app_core_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/core */ "./public/app/core/core.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }











var roles = [{
  label: 'Viewer',
  value: app_types__WEBPACK_IMPORTED_MODULE_3__["OrgRole"].Viewer
}, {
  label: 'Editor',
  value: app_types__WEBPACK_IMPORTED_MODULE_3__["OrgRole"].Editor
}, {
  label: 'Admin',
  value: app_types__WEBPACK_IMPORTED_MODULE_3__["OrgRole"].Admin
}];
var UserInviteForm = function UserInviteForm(_ref) {
  var updateLocation = _ref.updateLocation;

  var onSubmit =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(formData) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getBackendSrv"])().post('/api/org/invites', formData);

            case 3:
              _context.next = 8;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](0);
              app_core_core__WEBPACK_IMPORTED_MODULE_8__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_9__["AppEvents"].alertError, ['发送邀请失败', _context.t0.message]);

            case 8:
              updateLocation({
                path: 'org/users/'
              });

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 5]]);
    }));

    return function onSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var defaultValues = {
    name: '',
    email: '',
    role: app_types__WEBPACK_IMPORTED_MODULE_3__["OrgRole"].Editor,
    sendEmail: true
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Form"], {
    defaultValues: defaultValues,
    onSubmit: onSubmit
  }, function (_ref3) {
    var register = _ref3.register,
        control = _ref3.control,
        errors = _ref3.errors;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      invalid: !!errors.loginOrEmail,
      error: !!errors.loginOrEmail ? '电子邮件或用户名为必填项' : undefined,
      label: "\u7535\u5B50\u90AE\u4EF6\u6216\u7528\u6237\u540D"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
      name: "loginOrEmail",
      placeholder: "email@example.com",
      ref: register({
        required: true
      })
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      invalid: !!errors.name,
      label: "\u540D\u5B57"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
      name: "name",
      placeholder: "(\u53EF\u9009)",
      ref: register
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      invalid: !!errors.role,
      label: "\u89D2\u8272"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InputControl"], {
      as: _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["RadioButtonGroup"],
      control: control,
      options: roles,
      name: "role"
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      invalid: !!errors.sendEmail,
      label: "\u53D1\u9001\u9080\u8BF7\u90AE\u4EF6"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Switch"], {
      name: "sendEmail",
      ref: register
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["HorizontalGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      type: "submit"
    }, "\u63D0\u4EA4"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LinkButton"], {
      href: _grafana_data__WEBPACK_IMPORTED_MODULE_9__["locationUtil"].assureBaseUrl(Object(app_core_config__WEBPACK_IMPORTED_MODULE_2__["getConfig"])().appSubUrl + '/org/users'),
      variant: "secondary"
    }, "\u8FD4\u56DE")));
  });
};
var mapDispatchToProps = {
  updateLocation: app_core_actions__WEBPACK_IMPORTED_MODULE_5__["updateLocation"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_7__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(null, mapDispatchToProps)(UserInviteForm)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/org/UserInvitePage.tsx":
/*!****************************************************!*\
  !*** ./public/app/features/org/UserInvitePage.tsx ***!
  \****************************************************/
/*! exports provided: UserInvitePage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserInvitePage", function() { return UserInvitePage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _UserInviteForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UserInviteForm */ "./public/app/features/org/UserInviteForm.tsx");
/* harmony import */ var app_core_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/core */ "./public/app/core/core.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");







var UserInvitePage = function UserInvitePage(_ref) {
  var navModel = _ref.navModel;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_6__["default"], {
    navModel: navModel
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_6__["default"].Contents, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "page-sub-heading"
  }, "\u9080\u8BF7\u7528\u6237"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "p-b-2"
  }, "\u53D1\u9001\u9080\u8BF7\u6216\u5C06\u73B0\u6709Grafana\u7528\u6237\u6DFB\u52A0\u5230\u7EC4\u7EC7\u4E2D", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "highlight-word"
  }, " ", app_core_core__WEBPACK_IMPORTED_MODULE_4__["contextSrv"].user.orgName)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserInviteForm__WEBPACK_IMPORTED_MODULE_3__["default"], null)));
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_5__["getNavModel"])(state.navIndex, 'users')
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps)(UserInvitePage)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=UserInvitePage.1ebdc265fc3bd7452fcd.js.map