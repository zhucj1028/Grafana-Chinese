(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["AdminListOrgsPage"],{

/***/ "./public/app/features/admin/AdminListOrgsPage.tsx":
/*!*********************************************************!*\
  !*** ./public/app/features/admin/AdminListOrgsPage.tsx ***!
  \*********************************************************/
/*! exports provided: AdminListOrgsPages, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminListOrgsPages", function() { return AdminListOrgsPages; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _AdminOrgsTable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AdminOrgsTable */ "./public/app/features/admin/AdminOrgsTable.tsx");
/* harmony import */ var react_use_lib_useAsyncFn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-use/lib/useAsyncFn */ "./node_modules/react-use/lib/useAsyncFn.js");
/* harmony import */ var react_use_lib_useAsyncFn__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_use_lib_useAsyncFn__WEBPACK_IMPORTED_MODULE_7__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }










var deleteOrg =
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
            return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_5__["getBackendSrv"])().delete('/api/orgs/' + orgId);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function deleteOrg(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getOrgs =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_5__["getBackendSrv"])().get('/api/orgs');

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getOrgs() {
    return _ref2.apply(this, arguments);
  };
}();

var AdminListOrgsPages = function AdminListOrgsPages() {
  var navIndex = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["useSelector"])(function (state) {
    return state.navIndex;
  });
  var navModel = Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_1__["getNavModel"])(navIndex, 'global-orgs');

  var _useAsyncFn = react_use_lib_useAsyncFn__WEBPACK_IMPORTED_MODULE_7___default()(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getOrgs();

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })), []),
      _useAsyncFn2 = _slicedToArray(_useAsyncFn, 2),
      state = _useAsyncFn2[0],
      fetchOrgs = _useAsyncFn2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    fetchOrgs();
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__["default"], {
    navModel: navModel
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__["default"].Contents, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page-action-bar"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page-action-bar__spacer"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["LinkButton"], {
    icon: "plus",
    href: "org/new"
  }, "\u65B0\u7EC4\u7EC7")), state.loading && '获取组织', state.error, state.value && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AdminOrgsTable__WEBPACK_IMPORTED_MODULE_6__["AdminOrgsTable"], {
    orgs: state.value,
    onDelete: function onDelete(orgId) {
      deleteOrg(orgId).then(function () {
        return fetchOrgs();
      });
    }
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (AdminListOrgsPages);

/***/ }),

/***/ "./public/app/features/admin/AdminOrgsTable.tsx":
/*!******************************************************!*\
  !*** ./public/app/features/admin/AdminOrgsTable.tsx ***!
  \******************************************************/
/*! exports provided: AdminOrgsTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminOrgsTable", function() { return AdminOrgsTable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var AdminOrgsTable = function AdminOrgsTable(_ref) {
  var orgs = _ref.orgs,
      onDelete = _ref.onDelete;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(),
      _useState2 = _slicedToArray(_useState, 2),
      deleteOrg = _useState2[0],
      setDeleteOrg = _useState2[1];

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "filter-table form-inline filter-table--hover"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Id"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u540D\u5B57"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    style: {
      width: '1%'
    }
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, orgs.map(function (org) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: "".concat(org.id, "-").concat(org.name)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "link-td"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "admin/orgs/edit/".concat(org.id)
    }, org.id)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "link-td"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "admin/orgs/edit/".concat(org.id)
    }, org.name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "text-right"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      variant: "destructive",
      size: "sm",
      icon: "times",
      onClick: function onClick() {
        return setDeleteOrg(org);
      }
    })));
  })), deleteOrg && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["ConfirmModal"], {
    isOpen: true,
    icon: "trash-alt",
    title: "\u5220\u9664",
    body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "\u4F60\u786E\u5B9A\u4F60\u8981\u5220\u9664 '", deleteOrg.name, "'?", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", null, "\u8BE5\u7EC4\u7EC7\u7684\u6240\u6709\u4EEA\u8868\u677F\u5C06\u88AB\u5220\u9664\uFF01")),
    confirmText: "\u5220\u9664",
    onDismiss: function onDismiss() {
      return setDeleteOrg(undefined);
    },
    onConfirm: function onConfirm() {
      onDelete(deleteOrg.id);
      setDeleteOrg(undefined);
    }
  }));
};

/***/ })

}]);
//# sourceMappingURL=AdminListOrgsPage.1ebdc265fc3bd7452fcd.js.map