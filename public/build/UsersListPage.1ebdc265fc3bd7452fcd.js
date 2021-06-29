(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["UsersListPage"],{

/***/ "./public/app/features/users/InviteeRow.tsx":
/*!**************************************************!*\
  !*** ./public/app/features/users/InviteeRow.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/users/state/actions.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var InviteeRow =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(InviteeRow, _PureComponent);

  function InviteeRow() {
    _classCallCheck(this, InviteeRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(InviteeRow).apply(this, arguments));
  }

  _createClass(InviteeRow, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          invitee = _this$props.invitee,
          revokeInvite = _this$props.revokeInvite;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, invitee.email), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, invitee.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "text-right"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["ClipboardButton"], {
        variant: "secondary",
        size: "sm",
        getText: function getText() {
          return invitee.url;
        }
      }, "\u590D\u5236\u9080\u8BF7"), "\xA0"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        variant: "destructive",
        size: "sm",
        icon: "times",
        onClick: function onClick() {
          return revokeInvite(invitee.code);
        }
      })));
    }
  }]);

  return InviteeRow;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapDispatchToProps = {
  revokeInvite: _state_actions__WEBPACK_IMPORTED_MODULE_2__["revokeInvite"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(function () {
  return {};
}, mapDispatchToProps)(InviteeRow));

/***/ }),

/***/ "./public/app/features/users/InviteesTable.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/users/InviteesTable.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InviteesTable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _InviteeRow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InviteeRow */ "./public/app/features/users/InviteeRow.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var InviteesTable =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(InviteesTable, _PureComponent);

  function InviteesTable() {
    _classCallCheck(this, InviteesTable);

    return _possibleConstructorReturn(this, _getPrototypeOf(InviteesTable).apply(this, arguments));
  }

  _createClass(InviteesTable, [{
    key: "render",
    value: function render() {
      var invitees = this.props.invitees;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "filter-table form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u7535\u5B50\u90AE\u4EF6"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u540D\u5B57"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        style: {
          width: '34px'
        }
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, invitees.map(function (invitee, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InviteeRow__WEBPACK_IMPORTED_MODULE_1__["default"], {
          key: "".concat(invitee.id, "-").concat(index),
          invitee: invitee
        });
      })));
    }
  }]);

  return InviteesTable;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);



/***/ }),

/***/ "./public/app/features/users/UsersActionBar.tsx":
/*!******************************************************!*\
  !*** ./public/app/features/users/UsersActionBar.tsx ***!
  \******************************************************/
/*! exports provided: UsersActionBar, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersActionBar", function() { return UsersActionBar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/users/state/reducers.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/users/state/selectors.ts");
/* harmony import */ var app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/FilterInput/FilterInput */ "./public/app/core/components/FilterInput/FilterInput.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var UsersActionBar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(UsersActionBar, _PureComponent);

  function UsersActionBar() {
    _classCallCheck(this, UsersActionBar);

    return _possibleConstructorReturn(this, _getPrototypeOf(UsersActionBar).apply(this, arguments));
  }

  _createClass(UsersActionBar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          canInvite = _this$props.canInvite,
          externalUserMngLinkName = _this$props.externalUserMngLinkName,
          externalUserMngLinkUrl = _this$props.externalUserMngLinkUrl,
          searchQuery = _this$props.searchQuery,
          pendingInvitesCount = _this$props.pendingInvitesCount,
          setUsersSearchQuery = _this$props.setUsersSearchQuery,
          onShowInvites = _this$props.onShowInvites,
          showInvites = _this$props.showInvites;
      var options = [{
        label: '用户',
        value: 'users'
      }, {
        label: "\u53D1\u9001\u9080\u8BF7 (".concat(pendingInvitesCount, ")"),
        value: 'invites'
      }];
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form gf-form--grow"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_4__["FilterInput"], {
        labelClassName: "gf-form--has-input-icon",
        inputClassName: "gf-form-input width-20",
        value: searchQuery,
        onChange: setUsersSearchQuery,
        placeholder: "\u901A\u8FC7\u767B\u5F55\u540D\uFF0C\u7535\u5B50\u90AE\u4EF6\u6216\u59D3\u540D\u641C\u7D22\u7528\u6237"
      }), pendingInvitesCount > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          marginLeft: '1rem'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["RadioButtonGroup"], {
        value: showInvites ? 'invites' : 'users',
        options: options,
        onChange: onShowInvites
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar__spacer"
      }), canInvite && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["LinkButton"], {
        href: "org/users/invite"
      }, "\u9080\u8BF7"), externalUserMngLinkUrl && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["LinkButton"], {
        href: externalUserMngLinkUrl,
        target: "_blank",
        rel: "noopener"
      }, externalUserMngLinkName)));
    }
  }]);

  return UsersActionBar;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapStateToProps(state) {
  return {
    searchQuery: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_3__["getUsersSearchQuery"])(state.users),
    pendingInvitesCount: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_3__["getInviteesCount"])(state.users),
    externalUserMngLinkName: state.users.externalUserMngLinkName,
    externalUserMngLinkUrl: state.users.externalUserMngLinkUrl,
    canInvite: state.users.canInvite
  };
}

var mapDispatchToProps = {
  setUsersSearchQuery: _state_reducers__WEBPACK_IMPORTED_MODULE_2__["setUsersSearchQuery"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(UsersActionBar));

/***/ }),

/***/ "./public/app/features/users/UsersListPage.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/users/UsersListPage.tsx ***!
  \*****************************************************/
/*! exports provided: UsersListPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersListPage", function() { return UsersListPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _UsersActionBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UsersActionBar */ "./public/app/features/users/UsersActionBar.tsx");
/* harmony import */ var _UsersTable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UsersTable */ "./public/app/features/users/UsersTable.tsx");
/* harmony import */ var _InviteesTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./InviteesTable */ "./public/app/features/users/InviteesTable.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/users/state/actions.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/users/state/selectors.ts");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/users/state/reducers.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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













var UsersListPage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(UsersListPage, _PureComponent);

  function UsersListPage(props) {
    var _this;

    _classCallCheck(this, UsersListPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UsersListPage).call(this, props));

    _this.onRoleChange = function (role, user) {
      var updatedUser = _objectSpread({}, user, {
        role: role
      });

      _this.props.updateUser(updatedUser);
    };

    _this.onShowInvites = function () {
      _this.setState(function (prevState) {
        return {
          showInvites: !prevState.showInvites
        };
      });
    };

    if (_this.props.externalUserMngInfo) {
      _this.externalUserMngInfoHtml = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["renderMarkdown"])(_this.props.externalUserMngInfo);
    }

    _this.state = {
      showInvites: false
    };
    return _this;
  }

  _createClass(UsersListPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchUsers();
      this.fetchInvitees();
    }
  }, {
    key: "fetchUsers",
    value: function () {
      var _fetchUsers = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.props.loadUsers();

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchUsers() {
        return _fetchUsers.apply(this, arguments);
      }

      return fetchUsers;
    }()
  }, {
    key: "fetchInvitees",
    value: function () {
      var _fetchInvitees = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.props.loadInvitees();

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchInvitees() {
        return _fetchInvitees.apply(this, arguments);
      }

      return fetchInvitees;
    }()
  }, {
    key: "renderTable",
    value: function renderTable() {
      var _this2 = this;

      var _this$props = this.props,
          invitees = _this$props.invitees,
          users = _this$props.users;

      if (this.state.showInvites) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InviteesTable__WEBPACK_IMPORTED_MODULE_7__["default"], {
          invitees: invitees
        });
      } else {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UsersTable__WEBPACK_IMPORTED_MODULE_6__["default"], {
          users: users,
          onRoleChange: function onRoleChange(role, user) {
            return _this2.onRoleChange(role, user);
          },
          onRemoveUser: function onRemoveUser(user) {
            return _this2.props.removeUser(user.userId);
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          navModel = _this$props2.navModel,
          hasFetched = _this$props2.hasFetched;
      var externalUserMngInfoHtml = this.externalUserMngInfoHtml;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"], {
        navModel: navModel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"].Contents, {
        isLoading: !hasFetched
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_UsersActionBar__WEBPACK_IMPORTED_MODULE_5__["default"], {
        onShowInvites: this.onShowInvites,
        showInvites: this.state.showInvites
      }), externalUserMngInfoHtml && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "grafana-info-box",
        dangerouslySetInnerHTML: {
          __html: externalUserMngInfoHtml
        }
      }), hasFetched && this.renderTable())));
    }
  }]);

  return UsersListPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapStateToProps(state) {
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_9__["getNavModel"])(state.navIndex, 'users'),
    users: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getUsers"])(state.users),
    searchQuery: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getUsersSearchQuery"])(state.users),
    invitees: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getInvitees"])(state.users),
    externalUserMngInfo: state.users.externalUserMngInfo,
    hasFetched: state.users.hasFetched
  };
}

var mapDispatchToProps = {
  loadUsers: _state_actions__WEBPACK_IMPORTED_MODULE_8__["loadUsers"],
  loadInvitees: _state_actions__WEBPACK_IMPORTED_MODULE_8__["loadInvitees"],
  setUsersSearchQuery: _state_reducers__WEBPACK_IMPORTED_MODULE_11__["setUsersSearchQuery"],
  updateUser: _state_actions__WEBPACK_IMPORTED_MODULE_8__["updateUser"],
  removeUser: _state_actions__WEBPACK_IMPORTED_MODULE_8__["removeUser"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(UsersListPage)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/users/UsersTable.tsx":
/*!**************************************************!*\
  !*** ./public/app/features/users/UsersTable.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _admin_OrgRolePicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../admin/OrgRolePicker */ "./public/app/features/admin/OrgRolePicker.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var UsersTable = function UsersTable(props) {
  var users = props.users,
      onRoleChange = props.onRoleChange,
      onRemoveUser = props.onRemoveUser;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      showRemoveModal = _useState2[0],
      setShowRemoveModal = _useState2[1];

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "filter-table form-inline"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u767B\u9646"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u7535\u5B50\u90AE\u4EF6"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u540D\u5B57"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u6700\u8FD1\u8BBF\u95EE"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u89D2\u8272"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    style: {
      width: '34px'
    }
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, users.map(function (user, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: "".concat(user.userId, "-").concat(index)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "width-2 text-center"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      className: "filter-table__avatar",
      src: user.avatarUrl
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "max-width-6"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "ellipsis",
      title: user.login
    }, user.login)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "max-width-5"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "ellipsis",
      title: user.email
    }, user.email)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "max-width-5"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "ellipsis",
      title: user.name
    }, user.name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "width-1"
    }, user.lastSeenAtAge), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "width-8"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_admin_OrgRolePicker__WEBPACK_IMPORTED_MODULE_1__["OrgRolePicker"], {
      value: user.role,
      onChange: function onChange(newRole) {
        return onRoleChange(newRole, user);
      }
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      size: "sm",
      variant: "destructive",
      onClick: function onClick() {
        return setShowRemoveModal(user.login);
      },
      icon: "times"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["ConfirmModal"], {
      body: "\u60A8\u786E\u5B9A\u8981\u5220\u9664\u7528\u6237 ".concat(user.login, "?"),
      confirmText: "\u5220\u9664",
      title: "\u5220\u9664",
      onDismiss: function onDismiss() {
        return setShowRemoveModal(false);
      },
      isOpen: user.login === showRemoveModal,
      onConfirm: function onConfirm() {
        onRemoveUser(user);
      }
    })));
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (UsersTable);

/***/ }),

/***/ "./public/app/features/users/state/actions.ts":
/*!****************************************************!*\
  !*** ./public/app/features/users/state/actions.ts ***!
  \****************************************************/
/*! exports provided: loadUsers, loadInvitees, updateUser, removeUser, revokeInvite */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadUsers", function() { return loadUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadInvitees", function() { return loadInvitees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateUser", function() { return updateUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeUser", function() { return removeUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "revokeInvite", function() { return revokeInvite; });
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducers */ "./public/app/features/users/state/reducers.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



function loadUsers() {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dispatch) {
        var users;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().get('/api/org/users');

              case 2:
                users = _context.sent;
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_1__["usersLoaded"])(users));

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
    }()
  );
}
function loadInvitees() {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(dispatch) {
        var invitees;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().get('/api/org/invites');

              case 2:
                invitees = _context2.sent;
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_1__["inviteesLoaded"])(invitees));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
}
function updateUser(user) {
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(dispatch) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().patch("/api/org/users/".concat(user.userId), {
                  role: user.role
                });

              case 2:
                dispatch(loadUsers());

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
}
function removeUser(userId) {
  return (
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(dispatch) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().delete("/api/org/users/".concat(userId));

              case 2:
                dispatch(loadUsers());

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
}
function revokeInvite(code) {
  return (
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(dispatch) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().patch("/api/org/invites/".concat(code, "/revoke"), {});

              case 2:
                dispatch(loadInvitees());

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x5) {
        return _ref5.apply(this, arguments);
      };
    }()
  );
}

/***/ }),

/***/ "./public/app/features/users/state/selectors.ts":
/*!******************************************************!*\
  !*** ./public/app/features/users/state/selectors.ts ***!
  \******************************************************/
/*! exports provided: getUsers, getInvitees, getInviteesCount, getUsersSearchQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUsers", function() { return getUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInvitees", function() { return getInvitees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInviteesCount", function() { return getInviteesCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUsersSearchQuery", function() { return getUsersSearchQuery; });
var getUsers = function getUsers(state) {
  var regex = new RegExp(state.searchQuery, 'i');
  return state.users.filter(function (user) {
    return regex.test(user.login) || regex.test(user.email) || regex.test(user.name);
  });
};
var getInvitees = function getInvitees(state) {
  var regex = new RegExp(state.searchQuery, 'i');
  return state.invitees.filter(function (invitee) {
    return regex.test(invitee.name) || regex.test(invitee.email);
  });
};
var getInviteesCount = function getInviteesCount(state) {
  return state.invitees.length;
};
var getUsersSearchQuery = function getUsersSearchQuery(state) {
  return state.searchQuery;
};

/***/ })

}]);
//# sourceMappingURL=UsersListPage.1ebdc265fc3bd7452fcd.js.map