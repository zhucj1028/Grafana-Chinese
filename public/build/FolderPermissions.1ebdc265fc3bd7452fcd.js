(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["FolderPermissions"],{

/***/ "./public/app/features/folders/FolderPermissions.tsx":
/*!***********************************************************!*\
  !*** ./public/app/features/folders/FolderPermissions.tsx ***!
  \***********************************************************/
/*! exports provided: FolderPermissions, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FolderPermissions", function() { return FolderPermissions; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_Animations_SlideDown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/Animations/SlideDown */ "./public/app/core/components/Animations/SlideDown.tsx");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/folders/state/actions.ts");
/* harmony import */ var _state_navModel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/navModel */ "./public/app/features/folders/state/navModel.ts");
/* harmony import */ var app_core_components_PermissionList_PermissionList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/components/PermissionList/PermissionList */ "./public/app/core/components/PermissionList/PermissionList.tsx");
/* harmony import */ var app_core_components_PermissionList_AddPermission__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/components/PermissionList/AddPermission */ "./public/app/core/components/PermissionList/AddPermission.tsx");
/* harmony import */ var app_core_components_PermissionList_PermissionsInfo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/components/PermissionList/PermissionsInfo */ "./public/app/core/components/PermissionList/PermissionsInfo.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }













var FolderPermissions =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(FolderPermissions, _PureComponent);

  function FolderPermissions(props) {
    var _this;

    _classCallCheck(this, FolderPermissions);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FolderPermissions).call(this, props));

    _this.onOpenAddPermissions = function () {
      _this.setState({
        isAdding: true
      });
    };

    _this.onRemoveItem = function (item) {
      _this.props.removeFolderPermission(item);
    };

    _this.onPermissionChanged = function (item, level) {
      _this.props.updateFolderPermission(item, level);
    };

    _this.onAddPermission = function (newItem) {
      return _this.props.addFolderPermission(newItem);
    };

    _this.onCancelAddPermission = function () {
      _this.setState({
        isAdding: false
      });
    };

    _this.state = {
      isAdding: false
    };
    return _this;
  }

  _createClass(FolderPermissions, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.getFolderByUid(this.props.folderUid);
      this.props.getFolderPermissions(this.props.folderUid);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          navModel = _this$props.navModel,
          folder = _this$props.folder;
      var isAdding = this.state.isAdding;

      if (folder.id === 0) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"], {
          navModel: navModel
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"].Contents, {
          isLoading: true
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null)));
      }

      var folderInfo = {
        title: folder.title,
        url: folder.url,
        id: folder.id
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"], {
        navModel: navModel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"].Contents, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: "page-sub-heading"
      }, "\u6587\u4EF6\u5939\u6743\u9650"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], {
        placement: "auto",
        content: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_PermissionList_PermissionsInfo__WEBPACK_IMPORTED_MODULE_11__["default"], null)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Icon"], {
        className: "icon--has-hover page-sub-heading-icon",
        name: "question-circle"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar__spacer"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-primary pull-right",
        onClick: this.onOpenAddPermissions,
        disabled: isAdding
      }, "\u6DFB\u52A0\u6743\u9650")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Animations_SlideDown__WEBPACK_IMPORTED_MODULE_5__["SlideDown"], {
        in: isAdding
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_PermissionList_AddPermission__WEBPACK_IMPORTED_MODULE_10__["default"], {
        onAddPermission: this.onAddPermission,
        onCancel: this.onCancelAddPermission
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_PermissionList_PermissionList__WEBPACK_IMPORTED_MODULE_9__["default"], {
        items: folder.permissions,
        onRemoveItem: this.onRemoveItem,
        onPermissionChanged: this.onPermissionChanged,
        isFetching: false,
        folderInfo: folderInfo
      })));
    }
  }]);

  return FolderPermissions;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  var uid = state.location.routeParams.uid;
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_6__["getNavModel"])(state.navIndex, "folder-permissions-".concat(uid), Object(_state_navModel__WEBPACK_IMPORTED_MODULE_8__["getLoadingNav"])(1)),
    folderUid: uid,
    folder: state.folder
  };
};

var mapDispatchToProps = {
  getFolderByUid: _state_actions__WEBPACK_IMPORTED_MODULE_7__["getFolderByUid"],
  getFolderPermissions: _state_actions__WEBPACK_IMPORTED_MODULE_7__["getFolderPermissions"],
  updateFolderPermission: _state_actions__WEBPACK_IMPORTED_MODULE_7__["updateFolderPermission"],
  removeFolderPermission: _state_actions__WEBPACK_IMPORTED_MODULE_7__["removeFolderPermission"],
  addFolderPermission: _state_actions__WEBPACK_IMPORTED_MODULE_7__["addFolderPermission"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(FolderPermissions)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=FolderPermissions.1ebdc265fc3bd7452fcd.js.map