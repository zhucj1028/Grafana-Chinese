(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["DashboardListPage"],{

/***/ "./public/app/features/search/components/DashboardListPage.tsx":
/*!*********************************************************************!*\
  !*** ./public/app/features/search/components/DashboardListPage.tsx ***!
  \*********************************************************************/
/*! exports provided: DashboardListPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardListPage", function() { return DashboardListPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_core_selectors_location__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/selectors/location */ "./public/app/core/selectors/location.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _loaders__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../loaders */ "./public/app/features/search/loaders.ts");
/* harmony import */ var _ManageDashboards__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ManageDashboards */ "./public/app/features/search/components/ManageDashboards.tsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var DashboardListPage = Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(function (_ref) {
  var _ref3;

  var navModel = _ref.navModel,
      uid = _ref.uid,
      url = _ref.url;

  var _useAsync = Object(react_use__WEBPACK_IMPORTED_MODULE_1__["useAsync"])(function () {
    if (!uid || !url.startsWith('/dashboards')) {
      return Promise.resolve({
        pageNavModel: navModel
      });
    }

    return Object(_loaders__WEBPACK_IMPORTED_MODULE_8__["loadFolderPage"])(uid, 'manage-folder-dashboards').then(function (_ref2) {
      var folder = _ref2.folder,
          model = _ref2.model;
      var path = _grafana_data__WEBPACK_IMPORTED_MODULE_3__["locationUtil"].stripBaseFromUrl(folder.url);

      if (path !== location.pathname) {
        Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getLocationSrv"])().update({
          path: path
        });
      }

      return {
        folder: folder,
        pageNavModel: _objectSpread({}, navModel, {}, model)
      };
    });
  }, [uid]),
      loading = _useAsync.loading,
      value = _useAsync.value;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_7__["default"], {
    navModel: (_ref3 = value === null || value === void 0 ? void 0 : value.pageNavModel) !== null && _ref3 !== void 0 ? _ref3 : navModel
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_7__["default"].Contents, {
    isLoading: loading
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ManageDashboards__WEBPACK_IMPORTED_MODULE_9__["default"], {
    folder: value === null || value === void 0 ? void 0 : value.folder
  })));
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_5__["getNavModel"])(state.navIndex, 'manage-dashboards'),
    uid: Object(app_core_selectors_location__WEBPACK_IMPORTED_MODULE_6__["getRouteParams"])(state.location).uid,
    url: Object(app_core_selectors_location__WEBPACK_IMPORTED_MODULE_6__["getUrl"])(state.location)
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps)(DashboardListPage));

/***/ }),

/***/ "./public/app/features/search/loaders.ts":
/*!***********************************************!*\
  !*** ./public/app/features/search/loaders.ts ***!
  \***********************************************/
/*! exports provided: loadFolderPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadFolderPage", function() { return loadFolderPage; });
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");

var loadFolderPage = function loadFolderPage(uid, activeChildId) {
  var navModel = {
    main: {
      icon: 'folder-open',
      id: 'manage-folder',
      subTitle: '管理文件夹仪表板和权限',
      url: '',
      text: '',
      breadcrumbs: [{
        title: '仪表板',
        url: 'dashboards'
      }],
      children: [{
        active: activeChildId === 'manage-folder-dashboards',
        icon: 'th-large',
        id: 'manage-folder-dashboards',
        text: '仪表板',
        url: 'dashboards'
      }, {
        active: activeChildId === 'manage-folder-permissions',
        icon: 'lock',
        id: 'manage-folder-permissions',
        text: '权限',
        url: 'dashboards/permissions'
      }, {
        active: activeChildId === 'manage-folder-settings',
        icon: 'cog',
        id: 'manage-folder-settings',
        text: '设置',
        url: 'dashboards/settings'
      }]
    }
  };
  return app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_0__["backendSrv"].getFolderByUid(uid).then(function (folder) {
    var folderTitle = folder.title;
    var folderUrl = folder.url;
    navModel.main.text = folderTitle;
    var dashTab = navModel.main.children.find(function (child) {
      return child.id === 'manage-folder-dashboards';
    });
    dashTab.url = folderUrl;

    if (folder.canAdmin) {
      var permTab = navModel.main.children.find(function (child) {
        return child.id === 'manage-folder-permissions';
      });
      permTab.url = folderUrl + '/permissions';
      var settingsTab = navModel.main.children.find(function (child) {
        return child.id === 'manage-folder-settings';
      });
      settingsTab.url = folderUrl + '/settings';
    } else {
      navModel.main.children = [dashTab];
    }

    return {
      folder: folder,
      model: navModel
    };
  });
};

/***/ })

}]);
//# sourceMappingURL=DashboardListPage.1ebdc265fc3bd7452fcd.js.map