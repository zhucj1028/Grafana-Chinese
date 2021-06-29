(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["NewOrgPage"],{

/***/ "./public/app/features/org/NewOrgPage.tsx":
/*!************************************************!*\
  !*** ./public/app/features/org/NewOrgPage.tsx ***!
  \************************************************/
/*! exports provided: NewOrgPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewOrgPage", function() { return NewOrgPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _core_selectors_navModel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }










var createOrg =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(newOrg) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post('/api/orgs/', newOrg);

          case 2:
            result = _context.sent;
            _context.next = 5;
            return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post('/api/user/using/' + result.orgId);

          case 5:
            window.location.href = Object(app_core_config__WEBPACK_IMPORTED_MODULE_4__["getConfig"])().appSubUrl + '/org';

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createOrg(_x) {
    return _ref.apply(this, arguments);
  };
}();

var validateOrg =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(orgName) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get("api/orgs/name/".concat(encodeURI(orgName)));

          case 3:
            _context2.next = 11;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);

            if (!(_context2.t0.status === 404)) {
              _context2.next = 10;
              break;
            }

            _context2.t0.isHandled = true;
            return _context2.abrupt("return", true);

          case 10:
            return _context2.abrupt("return", 'Something went wrong');

          case 11:
            return _context2.abrupt("return", 'Organization already exists');

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 5]]);
  }));

  return function validateOrg(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var NewOrgPage = function NewOrgPage(_ref3) {
  var navModel = _ref3.navModel;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__["default"], {
    navModel: navModel
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__["default"].Contents, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "page-sub-heading"
  }, "\u65B0\u7EC4\u7EC7"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: "playlist-description"
  }, "\u6BCF\u4E2A\u7EC4\u7EC7\u90FD\u5305\u542B\u81EA\u5DF1\u7684\u4EEA\u8868\u677F\uFF0C\u6570\u636E\u6E90\u548C\u914D\u7F6E\uFF0C\u5E76\u4E14\u4E0D\u80FD\u5728\u7EC4\u7EC7\u4E4B\u95F4\u5171\u4EAB\u3002 \u5C3D\u7BA1\u7528\u6237\u53EF\u80FD\u5C5E\u4E8E\u591A\u4E2A\u7528\u6237\uFF0C\u4F46\u5728\u591A\u79DF\u6237\u90E8\u7F72\u4E2D\u6700\u7ECF\u5E38\u4F7F\u7528\u591A\u4E2A\u7EC4\u7EC7\u3002", ' '), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Form"], {
    onSubmit: createOrg
  }, function (_ref4) {
    var register = _ref4.register,
        errors = _ref4.errors;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Field"], {
      label: "\u7EC4\u7EC7\u540D\u79F0",
      invalid: !!errors.name,
      error: errors.name && errors.name.message
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Input"], {
      placeholder: "\u7EC4\u7EC7\u540D",
      name: "name",
      ref: register({
        required: '组织名称是必填项',
        validate: function () {
          var _validate = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3(orgName) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return validateOrg(orgName);

                  case 2:
                    return _context3.abrupt("return", _context3.sent);

                  case 3:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          function validate(_x3) {
            return _validate.apply(this, arguments);
          }

          return validate;
        }()
      })
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      type: "submit"
    }, "\u521B\u5EFA"));
  })));
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    navModel: Object(_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_7__["getNavModel"])(state.navIndex, 'global-orgs')
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_5__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(mapStateToProps)(NewOrgPage)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=NewOrgPage.1ebdc265fc3bd7452fcd.js.map