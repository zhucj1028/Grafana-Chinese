(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["OrgDetailsPage"],{

/***/ "./public/app/features/org/OrgDetailsPage.tsx":
/*!****************************************************!*\
  !*** ./public/app/features/org/OrgDetailsPage.tsx ***!
  \****************************************************/
/*! exports provided: OrgDetailsPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrgDetailsPage", function() { return OrgDetailsPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _OrgProfile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OrgProfile */ "./public/app/features/org/OrgProfile.tsx");
/* harmony import */ var app_core_components_SharedPreferences_SharedPreferences__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/SharedPreferences/SharedPreferences */ "./public/app/core/components/SharedPreferences/SharedPreferences.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/org/state/actions.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/org/state/reducers.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
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











var OrgDetailsPage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(OrgDetailsPage, _PureComponent);

  function OrgDetailsPage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, OrgDetailsPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(OrgDetailsPage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onUpdateOrganization = function (orgName) {
      _this.props.setOrganizationName(orgName);

      _this.props.updateOrganization();
    };

    return _this;
  }

  _createClass(OrgDetailsPage, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.props.loadOrganization();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          navModel = _this$props.navModel,
          organization = _this$props.organization;
      var isLoading = Object.keys(organization).length === 0;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"], {
        navModel: navModel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"].Contents, {
        isLoading: isLoading
      }, !isLoading && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_9__["VerticalGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OrgProfile__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onSubmit: this.onUpdateOrganization,
        orgName: organization.name
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_SharedPreferences_SharedPreferences__WEBPACK_IMPORTED_MODULE_5__["default"], {
        resourceUri: "org"
      }))));
    }
  }]);

  return OrgDetailsPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapStateToProps(state) {
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_7__["getNavModel"])(state.navIndex, 'org-settings'),
    organization: state.organization.organization
  };
}

var mapDispatchToProps = {
  loadOrganization: _state_actions__WEBPACK_IMPORTED_MODULE_6__["loadOrganization"],
  setOrganizationName: _state_reducers__WEBPACK_IMPORTED_MODULE_8__["setOrganizationName"],
  updateOrganization: _state_actions__WEBPACK_IMPORTED_MODULE_6__["updateOrganization"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(OrgDetailsPage)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/org/OrgProfile.tsx":
/*!************************************************!*\
  !*** ./public/app/features/org/OrgProfile.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");



var OrgProfile = function OrgProfile(_ref) {
  var _onSubmit = _ref.onSubmit,
      orgName = _ref.orgName;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Form"], {
    defaultValues: {
      orgName: orgName
    },
    onSubmit: function onSubmit(_ref2) {
      var orgName = _ref2.orgName;
      return _onSubmit(orgName);
    }
  }, function (_ref3) {
    var register = _ref3.register;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["FieldSet"], {
      label: "\u7EC4\u7EC7\u6982\u51B5"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      label: "\u7EC4\u7EC7\u540D\u79F0"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
      name: "orgName",
      type: "text",
      ref: register({
        required: true
      })
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      type: "submit"
    }, "\u66F4\u65B0\u7EC4\u7EC7\u540D\u79F0"));
  });
};

/* harmony default export */ __webpack_exports__["default"] = (OrgProfile);

/***/ }),

/***/ "./public/app/features/org/state/actions.ts":
/*!**************************************************!*\
  !*** ./public/app/features/org/state/actions.ts ***!
  \**************************************************/
/*! exports provided: loadOrganization, updateOrganization */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadOrganization", function() { return loadOrganization; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateOrganization", function() { return updateOrganization; });
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducers */ "./public/app/features/org/state/reducers.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




function loadOrganization() {
  var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    getBackendSrv: _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"]
  };
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dispatch) {
        var organizationResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return dependencies.getBackendSrv().get('/api/org');

              case 2:
                organizationResponse = _context.sent;
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_1__["organizationLoaded"])(organizationResponse));
                return _context.abrupt("return", organizationResponse);

              case 5:
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
function updateOrganization() {
  var dependencies = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    getBackendSrv: _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"]
  };
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(dispatch, getStore) {
        var organization;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                organization = getStore().organization.organization;
                _context2.next = 3;
                return dependencies.getBackendSrv().put('/api/org', {
                  name: organization.name
                });

              case 3:
                dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_2__["updateConfigurationSubtitle"])(organization.name));
                dispatch(loadOrganization(dependencies));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
}

/***/ })

}]);
//# sourceMappingURL=OrgDetailsPage.1ebdc265fc3bd7452fcd.js.map