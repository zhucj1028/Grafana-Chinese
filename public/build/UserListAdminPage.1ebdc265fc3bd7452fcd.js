(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["UserListAdminPage"],{

/***/ "./public/app/features/admin/UserListAdminPage.tsx":
/*!*********************************************************!*\
  !*** ./public/app/features/admin/UserListAdminPage.tsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _core_selectors_navModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/admin/state/actions.ts");
/* harmony import */ var app_core_components_TagFilter_TagBadge__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/components/TagFilter/TagBadge */ "./public/app/core/components/TagFilter/TagBadge.tsx");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      margin-top: 28px;\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }











var UserListAdminPageUnConnected = function UserListAdminPageUnConnected(props) {
  var styles = getStyles();
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    props.fetchUsers();
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"], {
    navModel: props.navModel
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"].Contents, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["HorizontalGroup"], {
    justify: "space-between"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Input"], {
    width: 40,
    type: "text",
    placeholder: "\u901A\u8FC7\u767B\u5F55\u540D\uFF0C\u7535\u5B50\u90AE\u4EF6\u6216\u59D3\u540D\u641C\u7D22\u7528\u6237",
    tabIndex: 1,
    autoFocus: true,
    value: props.query,
    spellCheck: false,
    onChange: function onChange(event) {
      return props.changeQuery(event.currentTarget.value);
    },
    prefix: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Icon"], {
      name: "search"
    })
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["LinkButton"], {
    href: "admin/users/create",
    variant: "primary"
  }, "\u65B0\u7528\u6237"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["cx"])(styles.table, 'admin-list-table')
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "filter-table form-inline filter-table--hover"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u767B\u9646"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u7535\u5B50\u90AE\u4EF6"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u540D\u5B57"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u4F7F\u7528\u65F6\u95F4\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], {
    placement: "top",
    content: "\u81EA\u4ECE\u770B\u5230\u7528\u6237\u4F7F\u7528Grafana\u4EE5\u6765\u7684\u65F6\u95F4"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Icon"], {
    name: "question-circle"
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    style: {
      width: '1%'
    }
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, props.users.map(renderUser)))), props.showPaging && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Pagination"], {
    numberOfPages: props.totalPages,
    currentPage: props.page,
    onNavigate: props.changePage
  }))));
};

var renderUser = function renderUser(user) {
  var editUrl = "admin/users/edit/".concat(user.id);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    key: user.id
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "width-4 text-center link-td"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: editUrl
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "filter-table__avatar",
    src: user.avatarUrl
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "link-td max-width-10"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "ellipsis",
    href: editUrl,
    title: user.login
  }, user.login)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "link-td max-width-10"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "ellipsis",
    href: editUrl,
    title: user.email
  }, user.email)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "link-td max-width-10"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    className: "ellipsis",
    href: editUrl,
    title: user.name
  }, user.name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "link-td"
  }, user.lastSeenAtAge && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: editUrl
  }, user.lastSeenAtAge)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "link-td"
  }, user.isAdmin && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: editUrl
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], {
    placement: "top",
    content: "Grafana Admin"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Icon"], {
    name: "shield"
  })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "text-right"
  }, Array.isArray(user.authLabels) && user.authLabels.length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_TagFilter_TagBadge__WEBPACK_IMPORTED_MODULE_8__["TagBadge"], {
    label: user.authLabels[0],
    removeIcon: false,
    count: 0
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
    className: "text-right"
  }, user.isDisabled && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "label label-tag label-tag--gray"
  }, "\u7981\u7528")));
};

var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["stylesFactory"])(function () {
  return {
    table: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject())
  };
});
var mapDispatchToProps = {
  fetchUsers: _state_actions__WEBPACK_IMPORTED_MODULE_7__["fetchUsers"],
  changeQuery: _state_actions__WEBPACK_IMPORTED_MODULE_7__["changeQuery"],
  changePage: _state_actions__WEBPACK_IMPORTED_MODULE_7__["changePage"]
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    navModel: Object(_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_6__["getNavModel"])(state.navIndex, 'global-users'),
    users: state.userListAdmin.users,
    query: state.userListAdmin.query,
    showPaging: state.userListAdmin.showPaging,
    totalPages: state.userListAdmin.totalPages,
    page: state.userListAdmin.page
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(UserListAdminPageUnConnected)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=UserListAdminPage.1ebdc265fc3bd7452fcd.js.map