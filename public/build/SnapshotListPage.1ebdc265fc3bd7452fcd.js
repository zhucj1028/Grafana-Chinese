(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["SnapshotListPage"],{

/***/ "./public/app/features/manage-dashboards/SnapshotListPage.tsx":
/*!********************************************************************!*\
  !*** ./public/app/features/manage-dashboards/SnapshotListPage.tsx ***!
  \********************************************************************/
/*! exports provided: SnapshotListPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnapshotListPage", function() { return SnapshotListPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var app_core_selectors_location__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/selectors/location */ "./public/app/core/selectors/location.ts");
/* harmony import */ var _components_SnapshotListTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/SnapshotListTable */ "./public/app/features/manage-dashboards/components/SnapshotListTable.tsx");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/manage-dashboards/state/selectors.ts");






var SnapshotListPage = function SnapshotListPage(_ref) {
  var navModel = _ref.navModel,
      url = _ref.url;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__["default"], {
    navModel: navModel
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__["default"].Contents, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_SnapshotListTable__WEBPACK_IMPORTED_MODULE_4__["SnapshotListTable"], {
    url: url
  })));
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    navModel: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_5__["getDashboardNavModel"])(state),
    url: Object(app_core_selectors_location__WEBPACK_IMPORTED_MODULE_3__["getUrl"])(state.location)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(SnapshotListPage));

/***/ }),

/***/ "./public/app/features/manage-dashboards/components/SnapshotListTable.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/features/manage-dashboards/components/SnapshotListTable.tsx ***!
  \********************************************************************************/
/*! exports provided: SnapshotListTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnapshotListTable", function() { return SnapshotListTable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var SnapshotListTable = function SnapshotListTable(_ref) {
  var url = _ref.url;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      snapshots = _useState2[0],
      setSnapshots = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(),
      _useState4 = _slicedToArray(_useState3, 2),
      removeSnapshot = _useState4[0],
      setRemoveSnapshot = _useState4[1];

  var getSnapshots = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().get('/api/dashboard/snapshots').then(function (result) {
              var absUrl = window.location.href;
              var baseUrl = absUrl.replace(url, '');
              var snapshots = result.map(function (snapshot) {
                return _objectSpread({}, snapshot, {
                  url: snapshot.externalUrl || "".concat(baseUrl, "/dashboard/snapshot/").concat(snapshot.key)
                });
              });
              setSnapshots(snapshots);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), []);
  var doRemoveSnapshot = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(snapshot) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              setSnapshots(snapshots.filter(function (ss) {
                return ss.key !== snapshot.key;
              }));
              _context2.next = 3;
              return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().delete("/api/snapshots/".concat(snapshot.key)).then(rxjs__WEBPACK_IMPORTED_MODULE_3__["noop"], function () {
                setSnapshots(snapshots.concat(snapshot));
              });

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }(), [snapshots]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    getSnapshots();
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page-container page-body"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "filter-table"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "\u540D\u5B57")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "\u5FEB\u7167\u5730\u5740")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    style: {
      width: '70px'
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    style: {
      width: '30px'
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    style: {
      width: '25px'
    }
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, snapshots.map(function (snapshot, key) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: key
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: snapshot.url
    }, snapshot.name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: snapshot.url
    }, snapshot.url)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, snapshot.external && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "query-keyword"
    }, "\u5916\u90E8")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "text-center"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LinkButton"], {
      href: snapshot.url,
      variant: "secondary",
      size: "sm",
      icon: "eye"
    }, "\u67E5\u770B")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "text-right"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      variant: "destructive",
      size: "sm",
      icon: "times",
      onClick: function onClick() {
        return setRemoveSnapshot(snapshot);
      }
    })));
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["ConfirmModal"], {
    isOpen: !!removeSnapshot,
    icon: "trash-alt",
    title: "\u5220\u9664",
    body: "\u4F60\u786E\u5B9A\u4F60\u8981\u5220\u9664 '".concat(removeSnapshot === null || removeSnapshot === void 0 ? void 0 : removeSnapshot.name, "'?"),
    confirmText: "\u5220\u9664",
    onDismiss: function onDismiss() {
      return setRemoveSnapshot(undefined);
    },
    onConfirm: function onConfirm() {
      doRemoveSnapshot(removeSnapshot);
      setRemoveSnapshot(undefined);
    }
  }));
};

/***/ }),

/***/ "./public/app/features/manage-dashboards/state/selectors.ts":
/*!******************************************************************!*\
  !*** ./public/app/features/manage-dashboards/state/selectors.ts ***!
  \******************************************************************/
/*! exports provided: getDashboardNavModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDashboardNavModel", function() { return getDashboardNavModel; });
/* harmony import */ var app_core_selectors_location__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/selectors/location */ "./public/app/core/selectors/location.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var getDashboardNavModel = function getDashboardNavModel(state) {
  var _nav$main$children;

  var url = Object(app_core_selectors_location__WEBPACK_IMPORTED_MODULE_0__["getUrl"])(state.location);
  var navModel = Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_1__["getNavModel"])(state.navIndex, 'dashboards');

  var nav = _objectSpread({}, navModel);

  var node = (_nav$main$children = nav.main.children) === null || _nav$main$children === void 0 ? void 0 : _nav$main$children.find(function (item) {
    return item.url === url;
  });

  if (node) {
    nav.node = node;
  } // This needs to be copied to avoid mutating the store in a selector


  nav.main.children = _toConsumableArray(navModel.main.children);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = nav.main.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      item.active = false;

      if (item.url === nav.node.url) {
        item.active = true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return nav;
};

/***/ })

}]);
//# sourceMappingURL=SnapshotListPage.1ebdc265fc3bd7452fcd.js.map