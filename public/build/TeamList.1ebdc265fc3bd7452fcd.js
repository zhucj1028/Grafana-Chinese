(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["TeamList"],{

/***/ "./public/app/core/components/connectWithCleanUp.tsx":
/*!***********************************************************!*\
  !*** ./public/app/core/components/connectWithCleanUp.tsx ***!
  \***********************************************************/
/*! exports provided: connectWithCleanUp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connectWithCleanUp", function() { return connectWithCleanUp; });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_cleanUp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/cleanUp */ "./public/app/core/actions/cleanUp.ts");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3__);




var connectWithCleanUp = function connectWithCleanUp(mapStateToProps, mapDispatchToProps, stateSelector) {
  return function (Component) {
    var ConnectedComponent = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps // @ts-ignore
    )(Component);

    var ConnectedComponentWithCleanUp = function ConnectedComponentWithCleanUp(props) {
      var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["useDispatch"])();
      Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
        return function cleanUp() {
          dispatch(Object(_actions_cleanUp__WEBPACK_IMPORTED_MODULE_1__["cleanUpAction"])({
            stateSelector: stateSelector
          }));
        };
      }, []); // @ts-ignore

      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ConnectedComponent, props);
    };

    ConnectedComponentWithCleanUp.displayName = "ConnectWithCleanUp(".concat(ConnectedComponent.displayName, ")");
    hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3___default()(ConnectedComponentWithCleanUp, Component);
    return ConnectedComponentWithCleanUp;
  };
};

/***/ }),

/***/ "./public/app/features/teams/TeamList.tsx":
/*!************************************************!*\
  !*** ./public/app/features/teams/TeamList.tsx ***!
  \************************************************/
/*! exports provided: TeamList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamList", function() { return TeamList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/EmptyListCTA/EmptyListCTA */ "./public/app/core/components/EmptyListCTA/EmptyListCTA.tsx");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/teams/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/teams/state/selectors.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/components/FilterInput/FilterInput */ "./public/app/core/components/FilterInput/FilterInput.tsx");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var app_core_services_context_srv__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/services/context_srv */ "./public/app/core/services/context_srv.ts");
/* harmony import */ var _core_components_connectWithCleanUp__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../core/components/connectWithCleanUp */ "./public/app/core/components/connectWithCleanUp.tsx");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/teams/state/reducers.ts");
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















var TeamList =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TeamList, _PureComponent);

  function TeamList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TeamList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TeamList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.deleteTeam = function (team) {
      _this.props.deleteTeam(team.id);
    };

    _this.onSearchQueryChange = function (value) {
      _this.props.setSearchQuery(value);
    };

    return _this;
  }

  _createClass(TeamList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchTeams();
    }
  }, {
    key: "fetchTeams",
    value: function () {
      var _fetchTeams = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.props.loadTeams();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchTeams() {
        return _fetchTeams.apply(this, arguments);
      }

      return fetchTeams;
    }()
  }, {
    key: "renderTeam",
    value: function renderTeam(team) {
      var _this2 = this;

      var _this$props = this.props,
          editorsCanAdmin = _this$props.editorsCanAdmin,
          signedInUser = _this$props.signedInUser;
      var permission = team.permission;
      var teamUrl = "org/teams/edit/".concat(team.id);
      var canDelete = Object(_state_selectors__WEBPACK_IMPORTED_MODULE_7__["isPermissionTeamAdmin"])({
        permission: permission,
        editorsCanAdmin: editorsCanAdmin,
        signedInUser: signedInUser
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        key: team.id
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "width-4 text-center link-td"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: teamUrl
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: "filter-table__avatar",
        src: team.avatarUrl
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "link-td"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: teamUrl
      }, team.name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "link-td"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: teamUrl
      }, team.email)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "link-td"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: teamUrl
      }, team.memberCount)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "text-right"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["DeleteButton"], {
        size: "sm",
        disabled: !canDelete,
        onConfirm: function onConfirm() {
          return _this2.deleteTeam(team);
        }
      })));
    }
  }, {
    key: "renderEmptyList",
    value: function renderEmptyList() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_4__["default"], {
        title: "\u60A8\u5C1A\u672A\u521B\u5EFA\u4EFB\u4F55\u56E2\u961F\u3002",
        buttonIcon: "users-alt",
        buttonLink: "org/teams/new",
        buttonTitle: " \u65B0\u5EFA\u56E2\u961F",
        proTip: "\u5C06\u6587\u4EF6\u5939\u548C\u4EEA\u8868\u677F\u6743\u9650\u5206\u914D\u7ED9\u56E2\u961F\u800C\u4E0D\u662F\u7528\u6237\uFF0C\u4EE5\u7B80\u5316\u7BA1\u7406\u3002",
        proTipLink: "",
        proTipLinkTitle: "",
        proTipTarget: "_blank"
      });
    }
  }, {
    key: "renderTeamList",
    value: function renderTeamList() {
      var _this3 = this;

      var _this$props2 = this.props,
          teams = _this$props2.teams,
          searchQuery = _this$props2.searchQuery,
          editorsCanAdmin = _this$props2.editorsCanAdmin,
          signedInUser = _this$props2.signedInUser;
      var isCanAdminAndViewer = editorsCanAdmin && signedInUser.orgRole === app_types__WEBPACK_IMPORTED_MODULE_5__["OrgRole"].Viewer;
      var disabledClass = isCanAdminAndViewer ? ' disabled' : '';
      var newTeamHref = isCanAdminAndViewer ? '#' : 'org/teams/new';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form gf-form--grow"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_9__["FilterInput"], {
        labelClassName: "gf-form--has-input-icon gf-form--grow",
        inputClassName: "gf-form-input",
        placeholder: "\u641C\u7D22\u56E2\u961F",
        value: searchQuery,
        onChange: this.onSearchQueryChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar__spacer"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LinkButton"], {
        className: disabledClass,
        href: newTeamHref
      }, "\u65B0\u5EFA\u56E2\u961F")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "admin-list-table"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "filter-table filter-table--hover form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u540D\u5B57"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u7535\u5B50\u90AE\u4EF6"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u6210\u5458"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        style: {
          width: '1%'
        }
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, teams.map(function (team) {
        return _this3.renderTeam(team);
      })))));
    }
  }, {
    key: "renderList",
    value: function renderList() {
      var _this$props3 = this.props,
          teamsCount = _this$props3.teamsCount,
          hasFetched = _this$props3.hasFetched;

      if (!hasFetched) {
        return null;
      }

      if (teamsCount > 0) {
        return this.renderTeamList();
      } else {
        return this.renderEmptyList();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          hasFetched = _this$props4.hasFetched,
          navModel = _this$props4.navModel;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__["default"], {
        navModel: navModel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__["default"].Contents, {
        isLoading: !hasFetched
      }, this.renderList()));
    }
  }]);

  return TeamList;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapStateToProps(state) {
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_8__["getNavModel"])(state.navIndex, 'teams'),
    teams: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_7__["getTeams"])(state.teams),
    searchQuery: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_7__["getSearchQuery"])(state.teams),
    teamsCount: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_7__["getTeamsCount"])(state.teams),
    hasFetched: state.teams.hasFetched,
    editorsCanAdmin: app_core_config__WEBPACK_IMPORTED_MODULE_10__["config"].editorsCanAdmin,
    // this makes the feature toggle mockable/controllable from tests,
    signedInUser: app_core_services_context_srv__WEBPACK_IMPORTED_MODULE_11__["contextSrv"].user // this makes the feature toggle mockable/controllable from tests,

  };
}

var mapDispatchToProps = {
  loadTeams: _state_actions__WEBPACK_IMPORTED_MODULE_6__["loadTeams"],
  deleteTeam: _state_actions__WEBPACK_IMPORTED_MODULE_6__["deleteTeam"],
  setSearchQuery: _state_reducers__WEBPACK_IMPORTED_MODULE_13__["setSearchQuery"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Object(_core_components_connectWithCleanUp__WEBPACK_IMPORTED_MODULE_12__["connectWithCleanUp"])(mapStateToProps, mapDispatchToProps, function (state) {
  return state.teams;
})(TeamList)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=TeamList.1ebdc265fc3bd7452fcd.js.map