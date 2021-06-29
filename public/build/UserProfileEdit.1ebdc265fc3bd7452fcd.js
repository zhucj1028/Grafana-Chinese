(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["UserProfileEdit"],{

/***/ "./public/app/features/profile/UserOrganizations.tsx":
/*!***********************************************************!*\
  !*** ./public/app/features/profile/UserOrganizations.tsx ***!
  \***********************************************************/
/*! exports provided: UserOrganizations, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserOrganizations", function() { return UserOrganizations; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var UserOrganizations =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(UserOrganizations, _PureComponent);

  function UserOrganizations() {
    _classCallCheck(this, UserOrganizations);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserOrganizations).apply(this, arguments));
  }

  _createClass(UserOrganizations, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.loadOrgs();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          isLoading = _this$props.isLoading,
          orgs = _this$props.orgs,
          user = _this$props.user;

      if (isLoading) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LoadingPlaceholder"], {
          text: "\u52A0\u8F7D\u7EC4\u7EC7..."
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, orgs.length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: "page-sub-heading"
      }, "\u7EC4\u7EC7\u673A\u6784"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "filter-table form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u540D\u5B57"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u89D2\u8272"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, orgs.map(function (org, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
          key: index
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, org.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, org.role), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
          className: "text-right"
        }, org.orgId === user.orgId ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "btn btn-primary btn-small"
        }, "\u5F53\u524D") : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
          variant: "secondary",
          size: "sm",
          onClick: function onClick() {
            _this.props.setUserOrg(org);
          }
        }, "\u9009\u62E9")));
      }))))));
    }
  }]);

  return UserOrganizations;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (UserOrganizations);

/***/ }),

/***/ "./public/app/features/profile/UserProfileEdit.tsx":
/*!*********************************************************!*\
  !*** ./public/app/features/profile/UserProfileEdit.tsx ***!
  \*********************************************************/
/*! exports provided: UserProfileEdit, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfileEdit", function() { return UserProfileEdit; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_utils_UserProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/utils/UserProvider */ "./public/app/core/utils/UserProvider.tsx");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_core_components_SharedPreferences_SharedPreferences__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/components/SharedPreferences/SharedPreferences */ "./public/app/core/components/SharedPreferences/SharedPreferences.tsx");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _UserTeams__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./UserTeams */ "./public/app/features/profile/UserTeams.tsx");
/* harmony import */ var _UserSessions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./UserSessions */ "./public/app/features/profile/UserSessions.tsx");
/* harmony import */ var _UserOrganizations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./UserOrganizations */ "./public/app/features/profile/UserOrganizations.tsx");
/* harmony import */ var _UserProfileEditForm__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./UserProfileEditForm */ "./public/app/features/profile/UserProfileEditForm.tsx");













var UserProfileEdit = function UserProfileEdit(_ref) {
  var navModel = _ref.navModel;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_8__["default"], {
    navModel: navModel
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_utils_UserProvider__WEBPACK_IMPORTED_MODULE_5__["UserProvider"], {
    userId: _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["config"].bootData.user.id
  }, function (api, states, teams, orgs, sessions, user) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_8__["default"].Contents, null, states.loadUser ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LoadingPlaceholder"], {
      text: "\u52A0\u8F7D\u7528\u6237\u8D44\u6599..."
    }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserProfileEditForm__WEBPACK_IMPORTED_MODULE_12__["UserProfileEditForm"], {
      updateProfile: api.updateUserProfile,
      isSavingUser: states.updateUserProfile,
      user: user
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_SharedPreferences_SharedPreferences__WEBPACK_IMPORTED_MODULE_7__["SharedPreferences"], {
      resourceUri: "user"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserTeams__WEBPACK_IMPORTED_MODULE_9__["UserTeams"], {
      isLoading: states.loadTeams,
      loadTeams: api.loadTeams,
      teams: teams
    }), !states.loadUser && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserOrganizations__WEBPACK_IMPORTED_MODULE_11__["UserOrganizations"], {
      isLoading: states.loadOrgs,
      setUserOrg: api.setUserOrg,
      loadOrgs: api.loadOrgs,
      orgs: orgs,
      user: user
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UserSessions__WEBPACK_IMPORTED_MODULE_10__["UserSessions"], {
      isLoading: states.loadSessions,
      loadSessions: api.loadSessions,
      revokeUserSession: api.revokeUserSession,
      sessions: sessions,
      user: user
    })));
  }));
};

function mapStateToProps(state) {
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_6__["getNavModel"])(state.navIndex, 'profile-settings')
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, null)(UserProfileEdit)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/profile/UserProfileEditForm.tsx":
/*!*************************************************************!*\
  !*** ./public/app/features/profile/UserProfileEditForm.tsx ***!
  \*************************************************************/
/*! exports provided: UserProfileEditForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfileEditForm", function() { return UserProfileEditForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");



var disableLoginForm = app_core_config__WEBPACK_IMPORTED_MODULE_2__["default"].disableLoginForm;
var UserProfileEditForm = function UserProfileEditForm(_ref) {
  var user = _ref.user,
      isSavingUser = _ref.isSavingUser,
      updateProfile = _ref.updateProfile;

  var onSubmitProfileUpdate = function onSubmitProfileUpdate(data) {
    updateProfile(data);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Form"], {
    onSubmit: onSubmitProfileUpdate,
    validateOn: "onBlur"
  }, function (_ref2) {
    var register = _ref2.register,
        errors = _ref2.errors;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["FieldSet"], {
      label: "\u7F16\u8F91\u4E2A\u4EBA\u8D44\u6599"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      label: "\u540D\u5B57",
      invalid: !!errors.name,
      error: "\u540D\u79F0\u4E3A\u5FC5\u586B\u9879"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
      name: "name",
      ref: register({
        required: true
      }),
      placeholder: "\u540D\u5B57",
      defaultValue: user.name
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      label: "\u90AE\u7BB1",
      invalid: !!errors.email,
      error: "\u90AE\u7BB1\u4E3A\u5FC5\u586B\u9879",
      disabled: disableLoginForm
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
      name: "email",
      ref: register({
        required: true
      }),
      placeholder: "\u90AE\u7BB1",
      defaultValue: user.email,
      suffix: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InputSuffix, null)
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      label: "\u7528\u6237\u540D",
      disabled: disableLoginForm
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
      name: "login",
      ref: register,
      defaultValue: user.login,
      placeholder: "\u7528\u6237\u540D",
      suffix: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InputSuffix, null)
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "gf-form-button-row"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      variant: "primary",
      disabled: isSavingUser
    }, "\u4FDD\u5B58")));
  });
};
/* harmony default export */ __webpack_exports__["default"] = (UserProfileEditForm);

var InputSuffix = function InputSuffix() {
  return disableLoginForm ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
    content: "\u767B\u5F55\u8BE6\u7EC6\u4FE1\u606F\u5DF2\u9501\u5B9A-\u5728\u53E6\u4E00\u4E2A\u7CFB\u7EDF\u4E2D\u8FDB\u884C\u7BA1\u7406\u3002"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
    name: "lock"
  })) : null;
};

/***/ }),

/***/ "./public/app/features/profile/UserSessions.tsx":
/*!******************************************************!*\
  !*** ./public/app/features/profile/UserSessions.tsx ***!
  \******************************************************/
/*! exports provided: UserSessions, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserSessions", function() { return UserSessions; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var UserSessions =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(UserSessions, _PureComponent);

  function UserSessions() {
    _classCallCheck(this, UserSessions);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserSessions).apply(this, arguments));
  }

  _createClass(UserSessions, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.loadSessions();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isLoading = _this$props.isLoading,
          sessions = _this$props.sessions,
          revokeUserSession = _this$props.revokeUserSession;

      if (isLoading) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LoadingPlaceholder"], {
          text: "\u52A0\u8F7D\u4F1A\u8BDD..."
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, sessions.length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: "page-sub-heading"
      }, "\u4F1A\u8BDD"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "filter-table form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u6700\u540E\u4E00\u6B21"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u767B\u9646"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "IP\u5730\u5740"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u6D4F\u89C8\u5668 & \u7CFB\u7EDF\u4FE1\u606F"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, sessions.map(function (session, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
          key: index
        }, session.isActive ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, "\u73B0\u5728") : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, session.seenAt), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, session.createdAt), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, session.clientIp), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, session.browser, " on ", session.os, " ", session.osVersion), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
          size: "sm",
          variant: "destructive",
          onClick: function onClick() {
            return revokeUserSession(session.id);
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
          name: "power"
        }))));
      }))))));
    }
  }]);

  return UserSessions;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (UserSessions);

/***/ }),

/***/ "./public/app/features/profile/UserTeams.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/profile/UserTeams.tsx ***!
  \***************************************************/
/*! exports provided: UserTeams, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserTeams", function() { return UserTeams; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var UserTeams =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(UserTeams, _PureComponent);

  function UserTeams() {
    _classCallCheck(this, UserTeams);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserTeams).apply(this, arguments));
  }

  _createClass(UserTeams, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.loadTeams();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isLoading = _this$props.isLoading,
          teams = _this$props.teams;

      if (isLoading) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LoadingPlaceholder"], {
          text: "\u52A0\u8F7D\u56E2\u961F..."
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, teams.length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: "page-sub-heading"
      }, "\u56E2\u961F"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "filter-table form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u540D\u5B57"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u7535\u5B50\u90AE\u4EF6"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u6210\u5458"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, teams.map(function (team, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
          key: index
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
          className: "width-4 text-center"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          className: "filter-table__avatar",
          src: team.avatarUrl
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, team.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, team.email), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, team.memberCount));
      }))))));
    }
  }]);

  return UserTeams;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (UserTeams);

/***/ })

}]);
//# sourceMappingURL=UserProfileEdit.1ebdc265fc3bd7452fcd.js.map