(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["AdminEditOrgPage"],{

/***/ "./public/app/features/admin/AdminEditOrgPage.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/admin/AdminEditOrgPage.tsx ***!
  \********************************************************/
/*! exports provided: AdminEditOrgPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminEditOrgPage", function() { return AdminEditOrgPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var _users_UsersTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../users/UsersTable */ "./public/app/features/users/UsersTable.tsx");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/index.js");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n              margin-top: 20px;\n            "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }











var getOrg =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(orgId) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_6__["getBackendSrv"])().get('/api/orgs/' + orgId);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getOrg(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getOrgUsers =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(orgId) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_6__["getBackendSrv"])().get('/api/orgs/' + orgId + '/users');

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getOrgUsers(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var updateOrgUserRole =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(orgUser, orgId) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_6__["getBackendSrv"])().patch('/api/orgs/' + orgId + '/users/' + orgUser.userId, orgUser);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateOrgUserRole(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var removeOrgUser =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(orgUser, orgId) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_6__["getBackendSrv"])().delete('/api/orgs/' + orgId + '/users/' + orgUser.userId);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function removeOrgUser(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var AdminEditOrgPage = function AdminEditOrgPage() {
  var navIndex = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) {
    return state.navIndex;
  });
  var navModel = Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_3__["getNavModel"])(navIndex, 'global-orgs');
  var orgId = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) {
    return state.location.routeParams.id;
  });

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      users = _useState2[0],
      setUsers = _useState2[1];

  var _useAsyncFn = Object(react_use__WEBPACK_IMPORTED_MODULE_5__["useAsyncFn"])(function () {
    return getOrg(orgId);
  }, []),
      _useAsyncFn2 = _slicedToArray(_useAsyncFn, 2),
      orgState = _useAsyncFn2[0],
      fetchOrg = _useAsyncFn2[1];

  var _useAsyncFn3 = Object(react_use__WEBPACK_IMPORTED_MODULE_5__["useAsyncFn"])(function () {
    return getOrgUsers(orgId);
  }, []),
      _useAsyncFn4 = _slicedToArray(_useAsyncFn3, 2),
      fetchOrgUsers = _useAsyncFn4[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    fetchOrg();
    fetchOrgUsers().then(function (res) {
      return setUsers(res);
    });
  }, []);

  var updateOrgName =
  /*#__PURE__*/
  function () {
    var _ref5 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(name) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_6__["getBackendSrv"])().put('/api/orgs/' + orgId, _objectSpread({}, orgState.value, {
                name: name
              }));

            case 2:
              return _context5.abrupt("return", _context5.sent);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function updateOrgName(_x7) {
      return _ref5.apply(this, arguments);
    };
  }();

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_1__["default"], {
    navModel: navModel
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_1__["default"].Contents, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["Legend"], null, "\u7F16\u8F91\u7EC4\u7EC7"), orgState.value && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["Form"], {
    defaultValues: {
      orgName: orgState.value.name
    },
    onSubmit:
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(values) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return updateOrgName(values.orgName);

              case 2:
                return _context6.abrupt("return", _context6.sent);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x8) {
        return _ref6.apply(this, arguments);
      };
    }()
  }, function (_ref7) {
    var register = _ref7.register,
        errors = _ref7.errors;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["Field"], {
      label: "\u540D\u79F0",
      invalid: !!errors.orgName,
      error: "\u540D\u79F0\u4E3A\u5FC5\u586B\u9879"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["Input"], {
      name: "orgName",
      ref: register({
        required: true
      })
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["Button"], null, "\u66F4\u65B0"));
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_8__["css"])(_templateObject())
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["Legend"], null, "\u7EC4\u7EC7\u7528\u6237"), !!users.length && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_users_UsersTable__WEBPACK_IMPORTED_MODULE_4__["default"], {
    users: users,
    onRoleChange: function onRoleChange(role, orgUser) {
      updateOrgUserRole(_objectSpread({}, orgUser, {
        role: role
      }), orgId);
      setUsers(users.map(function (user) {
        if (orgUser.userId === user.userId) {
          return _objectSpread({}, orgUser, {
            role: role
          });
        }

        return user;
      }));
      fetchOrgUsers();
    },
    onRemoveUser: function onRemoveUser(orgUser) {
      removeOrgUser(orgUser, orgId);
      setUsers(users.filter(function (user) {
        return orgUser.userId !== user.userId;
      }));
      fetchOrgUsers();
    }
  })))));
};
/* harmony default export */ __webpack_exports__["default"] = (AdminEditOrgPage);

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

/***/ })

}]);
//# sourceMappingURL=AdminEditOrgPage.1ebdc265fc3bd7452fcd.js.map