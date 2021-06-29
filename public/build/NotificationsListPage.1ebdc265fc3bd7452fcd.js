(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["NotificationsListPage"],{

/***/ "./public/app/core/hooks/useNavModel.ts":
/*!**********************************************!*\
  !*** ./public/app/core/hooks/useNavModel.ts ***!
  \**********************************************/
/*! exports provided: useNavModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useNavModel", function() { return useNavModel; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _selectors_navModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../selectors/navModel */ "./public/app/core/selectors/navModel.ts");


var useNavModel = function useNavModel(id) {
  var navIndex = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["useSelector"])(function (state) {
    return state.navIndex;
  });
  return Object(_selectors_navModel__WEBPACK_IMPORTED_MODULE_1__["getNavModel"])(navIndex, id);
};

/***/ }),

/***/ "./public/app/features/alerting/NotificationsListPage.tsx":
/*!****************************************************************!*\
  !*** ./public/app/features/alerting/NotificationsListPage.tsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/components/EmptyListCTA/EmptyListCTA */ "./public/app/core/components/EmptyListCTA/EmptyListCTA.tsx");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/index.js");
/* harmony import */ var app_core_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/core */ "./public/app/core/core.ts");
/* harmony import */ var app_core_hooks_useNavModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/hooks/useNavModel */ "./public/app/core/hooks/useNavModel.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











var NotificationsListPage = function NotificationsListPage() {
  var navModel = Object(app_core_hooks_useNavModel__WEBPACK_IMPORTED_MODULE_6__["useNavModel"])('channels');

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      notifications = _useState2[0],
      setNotifications = _useState2[1];

  var getNotifications =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_3__["getBackendSrv"])().get("/api/alert-notifications");

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getNotifications() {
      return _ref.apply(this, arguments);
    };
  }();

  var _useAsyncFn = Object(react_use__WEBPACK_IMPORTED_MODULE_4__["useAsyncFn"])(getNotifications),
      _useAsyncFn2 = _slicedToArray(_useAsyncFn, 2),
      state = _useAsyncFn2[0],
      fetchNotifications = _useAsyncFn2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    fetchNotifications().then(function (res) {
      setNotifications(res);
    });
  }, []);

  var deleteNotification = function deleteNotification(id) {
    app_core_core__WEBPACK_IMPORTED_MODULE_5__["appEvents"].emit(app_types__WEBPACK_IMPORTED_MODULE_8__["CoreEvents"].showConfirmModal, {
      title: '删除',
      text: '您要删除此通知频道吗？',
      text2: "\u5220\u9664\u6B64\u901A\u77E5\u9891\u9053\u4E0D\u4F1A\u4ECE\u8B66\u62A5\u4E2D\u5220\u9664\u5BF9\u5176\u7684\u4EFB\u4F55\u5F15\u7528",
      icon: 'trash-alt',
      confirmText: '删除',
      yesText: '删除',
      onConfirm: function () {
        var _onConfirm = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  deleteNotificationConfirmed(id);

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function onConfirm() {
          return _onConfirm.apply(this, arguments);
        }

        return onConfirm;
      }()
    });
  };

  var deleteNotificationConfirmed =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(id) {
      var notifications;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_3__["getBackendSrv"])().delete("/api/alert-notifications/".concat(id));

            case 2:
              _context3.next = 4;
              return fetchNotifications();

            case 4:
              notifications = _context3.sent;
              setNotifications(notifications);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function deleteNotificationConfirmed(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__["default"], {
    navModel: navModel
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__["default"].Contents, null, state.error && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, state.error), !!notifications.length && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page-action-bar"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page-action-bar__spacer"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["LinkButton"], {
    icon: "channel-add",
    href: "alerting/notification/new"
  }, "\u65B0\u901A\u9053")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "filter-table filter-table--hover"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    style: {
      minWidth: '200px'
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "\u540D\u5B57")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    style: {
      minWidth: '100px'
    }
  }, "\u7C7B\u578B"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    style: {
      width: '1%'
    }
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, notifications.map(function (notification) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: notification.id
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "link-td"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "alerting/notification/".concat(notification.id, "/edit")
    }, notification.name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "link-td"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "alerting/notification/".concat(notification.id, "/edit")
    }, notification.type)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: "text-right"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["HorizontalGroup"], {
      justify: "flex-end"
    }, notification.isDefault && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["Button"], {
      disabled: true,
      variant: "secondary",
      size: "sm"
    }, "\u9ED8\u8BA4"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["Button"], {
      variant: "destructive",
      icon: "times",
      size: "sm",
      onClick: function onClick() {
        deleteNotification(notification.id);
      }
    }))));
  })))), !(notifications.length || state.loading) && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_1__["default"], {
    title: "\u5C1A\u672A\u5B9A\u4E49\u901A\u77E5\u9891\u9053",
    buttonIcon: "channel-add",
    buttonLink: "alerting/notification/new",
    buttonTitle: "\u65B0\u589E\u901A\u9053",
    proTip: "\u60A8\u53EF\u4EE5\u5728\u8B66\u62A5\u901A\u77E5\u4E2D\u5305\u542B\u56FE\u50CF\u3002",
    proTipLink: "http://docs.grafana.org/alerting/notifications/",
    proTipLinkTitle: "\u4E86\u89E3\u66F4\u591A",
    proTipTarget: "_blank"
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (NotificationsListPage);

/***/ })

}]);
//# sourceMappingURL=NotificationsListPage.1ebdc265fc3bd7452fcd.js.map