(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~ChangePasswordPage~UserProfileEdit"],{

/***/ "./public/app/core/utils/UserProvider.tsx":
/*!************************************************!*\
  !*** ./public/app/core/utils/UserProvider.tsx ***!
  \************************************************/
/*! exports provided: UserProvider, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProvider", function() { return UserProvider; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
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





var UserProvider =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(UserProvider, _PureComponent);

  function UserProvider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, UserProvider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(UserProvider)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      teams: [],
      orgs: [],
      sessions: [],
      loadingStates: {
        changePassword: false,
        loadUser: true,
        loadTeams: false,
        loadOrgs: false,
        loadSessions: false,
        updateUserProfile: false,
        updateUserOrg: false
      }
    };

    _this.changePassword =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(payload) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.setState({
                  loadingStates: _objectSpread({}, _this.state.loadingStates, {
                    changePassword: true
                  })
                });

                _context.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().put('/api/user/password', payload);

              case 3:
                _this.setState({
                  loadingStates: _objectSpread({}, _this.state.loadingStates, {
                    changePassword: false
                  })
                });

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

    _this.loadUser =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this.setState({
                loadingStates: _objectSpread({}, _this.state.loadingStates, {
                  loadUser: true
                })
              });

              _context2.next = 3;
              return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get('/api/user');

            case 3:
              user = _context2.sent;

              _this.setState({
                user: user,
                loadingStates: _objectSpread({}, _this.state.loadingStates, {
                  loadUser: Object.keys(user).length === 0
                })
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    _this.loadTeams =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var teams;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this.setState({
                loadingStates: _objectSpread({}, _this.state.loadingStates, {
                  loadTeams: true
                })
              });

              _context3.next = 3;
              return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get('/api/user/teams');

            case 3:
              teams = _context3.sent;

              _this.setState({
                teams: teams,
                loadingStates: _objectSpread({}, _this.state.loadingStates, {
                  loadTeams: false
                })
              });

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    _this.loadOrgs =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var orgs;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this.setState({
                loadingStates: _objectSpread({}, _this.state.loadingStates, {
                  loadOrgs: true
                })
              });

              _context4.next = 3;
              return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get('/api/user/orgs');

            case 3:
              orgs = _context4.sent;

              _this.setState({
                orgs: orgs,
                loadingStates: _objectSpread({}, _this.state.loadingStates, {
                  loadOrgs: false
                })
              });

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    _this.loadSessions =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _this.setState({
                loadingStates: _objectSpread({}, _this.state.loadingStates, {
                  loadSessions: true
                })
              });

              _context5.next = 3;
              return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get('/api/user/auth-tokens').then(function (sessions) {
                sessions = sessions // Show active sessions first
                .sort(function (a, b) {
                  return Number(b.isActive) - Number(a.isActive);
                }).map(function (session) {
                  return {
                    id: session.id,
                    isActive: session.isActive,
                    seenAt: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateTimeFormatTimeAgo"])(session.seenAt),
                    createdAt: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateTimeFormat"])(session.createdAt, {
                      format: 'MMMM DD, YYYY'
                    }),
                    clientIp: session.clientIp,
                    browser: session.browser,
                    browserVersion: session.browserVersion,
                    os: session.os,
                    osVersion: session.osVersion,
                    device: session.device
                  };
                });

                _this.setState({
                  sessions: sessions,
                  loadingStates: _objectSpread({}, _this.state.loadingStates, {
                    loadSessions: false
                  })
                });
              });

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    _this.revokeUserSession =
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(tokenId) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post('/api/user/revoke-auth-token', {
                  authTokenId: tokenId
                }).then(function () {
                  var sessions = _this.state.sessions.filter(function (session) {
                    return session.id !== tokenId;
                  });

                  _this.setState({
                    sessions: sessions
                  });
                });

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x2) {
        return _ref6.apply(this, arguments);
      };
    }();

    _this.setUserOrg =
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(org) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _this.setState({
                  loadingStates: _objectSpread({}, _this.state.loadingStates, {
                    updateUserOrg: true
                  })
                });

                _context7.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post('/api/user/using/' + org.orgId, {}).then(function () {
                  window.location.href = app_core_config__WEBPACK_IMPORTED_MODULE_2__["config"].appSubUrl + '/profile';
                }).finally(function () {
                  _this.setState({
                    loadingStates: _objectSpread({}, _this.state.loadingStates, {
                      updateUserOrg: false
                    })
                  });
                });

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x3) {
        return _ref7.apply(this, arguments);
      };
    }();

    _this.updateUserProfile =
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(payload) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this.setState({
                  loadingStates: _objectSpread({}, _this.state.loadingStates, {
                    updateUserProfile: true
                  })
                });

                _context8.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().put('/api/user', payload).then(_this.loadUser).catch(function (e) {
                  return console.error(e);
                }).finally(function () {
                  _this.setState({
                    loadingStates: _objectSpread({}, _this.state.loadingStates, {
                      updateUserProfile: false
                    })
                  });
                });

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      return function (_x4) {
        return _ref8.apply(this, arguments);
      };
    }();

    return _this;
  }

  _createClass(UserProvider, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (this.props.userId) {
        this.loadUser();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var _this$state = this.state,
          loadingStates = _this$state.loadingStates,
          teams = _this$state.teams,
          orgs = _this$state.orgs,
          sessions = _this$state.sessions,
          user = _this$state.user;
      var api = {
        changePassword: this.changePassword,
        loadUser: this.loadUser,
        loadTeams: this.loadTeams,
        loadOrgs: this.loadOrgs,
        loadSessions: this.loadSessions,
        revokeUserSession: this.revokeUserSession,
        updateUserProfile: this.updateUserProfile,
        setUserOrg: this.setUserOrg
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, children(api, loadingStates, teams, orgs, sessions, user));
    }
  }]);

  return UserProvider;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (UserProvider);

/***/ })

}]);
//# sourceMappingURL=default~ChangePasswordPage~UserProfileEdit.1ebdc265fc3bd7452fcd.js.map