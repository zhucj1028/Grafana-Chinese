(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["TeamPages"],{

/***/ "./public/app/core/components/WithFeatureToggle.tsx":
/*!**********************************************************!*\
  !*** ./public/app/core/components/WithFeatureToggle.tsx ***!
  \**********************************************************/
/*! exports provided: WithFeatureToggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WithFeatureToggle", function() { return WithFeatureToggle; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var WithFeatureToggle = function WithFeatureToggle(_ref) {
  var featureToggle = _ref.featureToggle,
      children = _ref.children;

  if (featureToggle === true) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, children);
  }

  return null;
};

/***/ }),

/***/ "./public/app/features/teams/TeamGroupSync.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/teams/TeamGroupSync.tsx ***!
  \*****************************************************/
/*! exports provided: TeamGroupSync, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamGroupSync", function() { return TeamGroupSync; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_components_Animations_SlideDown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/components/Animations/SlideDown */ "./public/app/core/components/Animations/SlideDown.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/teams/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/teams/state/selectors.ts");
/* harmony import */ var app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/EmptyListCTA/EmptyListCTA */ "./public/app/core/components/EmptyListCTA/EmptyListCTA.tsx");
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





var Input = _grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LegacyForms"].Input;



var headerTooltip = "Sync LDAP or OAuth groups with your Grafana teams.";
var TeamGroupSync =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TeamGroupSync, _PureComponent);

  function TeamGroupSync(props) {
    var _this;

    _classCallCheck(this, TeamGroupSync);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TeamGroupSync).call(this, props));

    _this.onToggleAdding = function () {
      _this.setState({
        isAdding: !_this.state.isAdding
      });
    };

    _this.onNewGroupIdChanged = function (event) {
      _this.setState({
        newGroupId: event.target.value
      });
    };

    _this.onAddGroup = function (event) {
      event.preventDefault();

      _this.props.addTeamGroup(_this.state.newGroupId);

      _this.setState({
        isAdding: false,
        newGroupId: ''
      });
    };

    _this.onRemoveGroup = function (group) {
      _this.props.removeTeamGroup(group.groupId);
    };

    _this.state = {
      isAdding: false,
      newGroupId: ''
    };
    return _this;
  }

  _createClass(TeamGroupSync, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchTeamGroups();
    }
  }, {
    key: "fetchTeamGroups",
    value: function () {
      var _fetchTeamGroups = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.props.loadTeamGroups();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchTeamGroups() {
        return _fetchTeamGroups.apply(this, arguments);
      }

      return fetchTeamGroups;
    }()
  }, {
    key: "isNewGroupValid",
    value: function isNewGroupValid() {
      return this.state.newGroupId.length > 1;
    }
  }, {
    key: "renderGroup",
    value: function renderGroup(group) {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        key: group.groupId
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, group.groupId), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        style: {
          width: '1%'
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-danger btn-small",
        onClick: function onClick() {
          return _this2.onRemoveGroup(group);
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Icon"], {
        name: "times",
        style: {
          marginBottom: 0
        }
      }))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          isAdding = _this$state.isAdding,
          newGroupId = _this$state.newGroupId;
      var groups = this.props.groups;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: "page-sub-heading"
      }, "\u5916\u90E8\u7EC4\u540C\u6B65"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], {
        placement: "auto",
        content: headerTooltip
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Icon"], {
        className: "icon--has-hover page-sub-heading-icon",
        name: "question-circle"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar__spacer"
      }), groups.length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-primary pull-right",
        onClick: this.onToggleAdding
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Icon"], {
        name: "plus"
      }), " \u6DFB\u52A0\u7EC4")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Animations_SlideDown__WEBPACK_IMPORTED_MODULE_2__["SlideDown"], {
        in: isAdding
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cta-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "cta-form__close btn btn-transparent",
        onClick: this.onToggleAdding
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Icon"], {
        name: "times"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", null, "\u6DFB\u52A0\u5916\u90E8\u7EC4"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        className: "gf-form-inline",
        onSubmit: this.onAddGroup
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        type: "text",
        className: "gf-form-input width-30",
        value: newGroupId,
        onChange: this.onNewGroupIdChanged,
        placeholder: "cn=ops,ou=groups,dc=grafana,dc=org"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-primary gf-form-btn",
        type: "submit",
        disabled: !this.isNewGroupValid()
      }, "\u6DFB\u52A0\u7EC4"))))), groups.length === 0 && !isAdding && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_6__["default"], {
        onClick: this.onToggleAdding,
        buttonIcon: "users-alt",
        title: "\u6CA1\u6709\u8981\u4E0E\u4E4B\u540C\u6B65\u7684\u5916\u90E8\u7EC4",
        buttonTitle: "\u6DFB\u52A0\u7EC4",
        proTip: headerTooltip,
        proTipLinkTitle: "\u4E86\u89E3\u66F4\u591A",
        proTipLink: "http://docs.grafana.org/auth/enhanced_ldap/",
        proTipTarget: "_blank"
      }), groups.length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "admin-list-table"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "filter-table filter-table--hover form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u5916\u90E8\u7EC4ID"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        style: {
          width: '1%'
        }
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, groups.map(function (group) {
        return _this3.renderGroup(group);
      })))));
    }
  }]);

  return TeamGroupSync;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapStateToProps(state) {
  return {
    groups: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_5__["getTeamGroups"])(state.team)
  };
}

var mapDispatchToProps = {
  loadTeamGroups: _state_actions__WEBPACK_IMPORTED_MODULE_4__["loadTeamGroups"],
  addTeamGroup: _state_actions__WEBPACK_IMPORTED_MODULE_4__["addTeamGroup"],
  removeTeamGroup: _state_actions__WEBPACK_IMPORTED_MODULE_4__["removeTeamGroup"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(TeamGroupSync));

/***/ }),

/***/ "./public/app/features/teams/TeamMemberRow.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/teams/TeamMemberRow.tsx ***!
  \*****************************************************/
/*! exports provided: TeamMemberRow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamMemberRow", function() { return TeamMemberRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var app_core_components_WithFeatureToggle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/WithFeatureToggle */ "./public/app/core/components/WithFeatureToggle.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/teams/state/actions.ts");
/* harmony import */ var app_core_components_TagFilter_TagBadge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/TagFilter/TagBadge */ "./public/app/core/components/TagFilter/TagBadge.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Select = _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LegacyForms"].Select;




var TeamMemberRow =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TeamMemberRow, _PureComponent);

  function TeamMemberRow(props) {
    var _this;

    _classCallCheck(this, TeamMemberRow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TeamMemberRow).call(this, props));

    _this.onPermissionChange = function (item, member) {
      var permission = item.value;

      var updatedTeamMember = _objectSpread({}, member, {
        permission: permission
      });

      _this.props.updateTeamMember(updatedTeamMember);
    };

    _this.renderLabels = _this.renderLabels.bind(_assertThisInitialized(_this));
    _this.renderPermissions = _this.renderPermissions.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TeamMemberRow, [{
    key: "onRemoveMember",
    value: function onRemoveMember(member) {
      this.props.removeTeamMember(member.userId);
    }
  }, {
    key: "renderPermissions",
    value: function renderPermissions(member) {
      var _this2 = this;

      var _this$props = this.props,
          editorsCanAdmin = _this$props.editorsCanAdmin,
          signedInUserIsTeamAdmin = _this$props.signedInUserIsTeamAdmin;
      var value = app_types__WEBPACK_IMPORTED_MODULE_3__["teamsPermissionLevels"].find(function (dp) {
        return dp.value === member.permission;
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_WithFeatureToggle__WEBPACK_IMPORTED_MODULE_4__["WithFeatureToggle"], {
        featureToggle: editorsCanAdmin
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "width-5 team-permissions"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, signedInUserIsTeamAdmin && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Select, {
        isSearchable: false,
        options: app_types__WEBPACK_IMPORTED_MODULE_3__["teamsPermissionLevels"],
        onChange: function onChange(item) {
          return _this2.onPermissionChange(item, member);
        },
        className: "gf-form-select-box__control--menu-right",
        value: value
      }), !signedInUserIsTeamAdmin && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, value.label))));
    }
  }, {
    key: "renderLabels",
    value: function renderLabels(labels) {
      if (!labels) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null);
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, labels.map(function (label) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_TagFilter_TagBadge__WEBPACK_IMPORTED_MODULE_6__["TagBadge"], {
          key: label,
          label: label,
          removeIcon: false,
          count: 0,
          onClick: function onClick() {}
        });
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          member = _this$props2.member,
          syncEnabled = _this$props2.syncEnabled,
          signedInUserIsTeamAdmin = _this$props2.signedInUserIsTeamAdmin;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        key: member.userId
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "width-4 text-center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: "filter-table__avatar",
        src: member.avatarUrl
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, member.login), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, member.email), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, member.name), this.renderPermissions(member), syncEnabled && this.renderLabels(member.labels), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "text-right"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["DeleteButton"], {
        size: "sm",
        disabled: !signedInUserIsTeamAdmin,
        onConfirm: function onConfirm() {
          return _this3.onRemoveMember(member);
        }
      })));
    }
  }]);

  return TeamMemberRow;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapStateToProps(state) {
  return {};
}

var mapDispatchToProps = {
  removeTeamMember: _state_actions__WEBPACK_IMPORTED_MODULE_5__["removeTeamMember"],
  updateTeamMember: _state_actions__WEBPACK_IMPORTED_MODULE_5__["updateTeamMember"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(TeamMemberRow));

/***/ }),

/***/ "./public/app/features/teams/TeamMembers.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/teams/TeamMembers.tsx ***!
  \***************************************************/
/*! exports provided: TeamMembers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamMembers", function() { return TeamMembers; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_Animations_SlideDown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/Animations/SlideDown */ "./public/app/core/components/Animations/SlideDown.tsx");
/* harmony import */ var app_core_components_Select_UserPicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Select/UserPicker */ "./public/app/core/components/Select/UserPicker.tsx");
/* harmony import */ var app_core_components_TagFilter_TagBadge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/TagFilter/TagBadge */ "./public/app/core/components/TagFilter/TagBadge.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/teams/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/teams/state/selectors.ts");
/* harmony import */ var app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/components/FilterInput/FilterInput */ "./public/app/core/components/FilterInput/FilterInput.tsx");
/* harmony import */ var app_core_components_WithFeatureToggle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/components/WithFeatureToggle */ "./public/app/core/components/WithFeatureToggle.tsx");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var app_core_services_context_srv__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/services/context_srv */ "./public/app/core/services/context_srv.ts");
/* harmony import */ var _TeamMemberRow__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./TeamMemberRow */ "./public/app/features/teams/TeamMemberRow.tsx");
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















var TeamMembers =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TeamMembers, _PureComponent);

  function TeamMembers(props) {
    var _this;

    _classCallCheck(this, TeamMembers);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TeamMembers).call(this, props));

    _this.onSearchQueryChange = function (value) {
      _this.props.setSearchMemberQuery(value);
    };

    _this.onToggleAdding = function () {
      _this.setState({
        isAdding: !_this.state.isAdding
      });
    };

    _this.onUserSelected = function (user) {
      _this.setState({
        newTeamMember: user
      });
    };

    _this.onAddUserToTeam =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.props.addTeamMember(_this.state.newTeamMember.id);

              _this.setState({
                newTeamMember: null
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    _this.state = {
      isAdding: false,
      newTeamMember: null
    };
    return _this;
  }

  _createClass(TeamMembers, [{
    key: "renderLabels",
    value: function renderLabels(labels) {
      if (!labels) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null);
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, labels.map(function (label) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_TagFilter_TagBadge__WEBPACK_IMPORTED_MODULE_5__["TagBadge"], {
          key: label,
          label: label,
          removeIcon: false,
          count: 0,
          onClick: function onClick() {}
        });
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var isAdding = this.state.isAdding;
      var _this$props = this.props,
          searchMemberQuery = _this$props.searchMemberQuery,
          members = _this$props.members,
          syncEnabled = _this$props.syncEnabled,
          editorsCanAdmin = _this$props.editorsCanAdmin,
          signedInUser = _this$props.signedInUser;
      var isTeamAdmin = Object(_state_selectors__WEBPACK_IMPORTED_MODULE_7__["isSignedInUserTeamAdmin"])({
        members: members,
        editorsCanAdmin: editorsCanAdmin,
        signedInUser: signedInUser
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form gf-form--grow"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_8__["FilterInput"], {
        labelClassName: "gf-form--has-input-icon gf-form--grow",
        inputClassName: "gf-form-input",
        placeholder: "\u641C\u7D22\u6210\u5458",
        value: searchMemberQuery,
        onChange: this.onSearchQueryChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar__spacer"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-primary pull-right",
        onClick: this.onToggleAdding,
        disabled: isAdding || !isTeamAdmin
      }, "\u6DFB\u52A0\u6210\u5458")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Animations_SlideDown__WEBPACK_IMPORTED_MODULE_3__["SlideDown"], {
        in: isAdding
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cta-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "cta-form__close btn btn-transparent",
        onClick: this.onToggleAdding
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
        name: "times"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", null, "\u6DFB\u52A0\u56E2\u961F\u6210\u5458"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Select_UserPicker__WEBPACK_IMPORTED_MODULE_4__["UserPicker"], {
        onSelected: this.onUserSelected,
        className: "min-width-30"
      }), this.state.newTeamMember && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-primary gf-form-btn",
        type: "submit",
        onClick: this.onAddUserToTeam
      }, "\u52A0\u5165\u56E2\u961F")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "admin-list-table"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "filter-table filter-table--hover form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u767B\u9646"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u7535\u5B50\u90AE\u4EF6"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u540D\u5B57"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_WithFeatureToggle__WEBPACK_IMPORTED_MODULE_9__["WithFeatureToggle"], {
        featureToggle: editorsCanAdmin
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "\u6743\u9650")), syncEnabled && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        style: {
          width: '1%'
        }
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, members && members.map(function (member) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TeamMemberRow__WEBPACK_IMPORTED_MODULE_12__["default"], {
          key: member.userId,
          member: member,
          syncEnabled: syncEnabled,
          editorsCanAdmin: editorsCanAdmin,
          signedInUserIsTeamAdmin: isTeamAdmin
        });
      })))));
    }
  }]);

  return TeamMembers;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapStateToProps(state) {
  return {
    searchMemberQuery: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_7__["getSearchMemberQuery"])(state.team),
    editorsCanAdmin: app_core_config__WEBPACK_IMPORTED_MODULE_10__["config"].editorsCanAdmin,
    // this makes the feature toggle mockable/controllable from tests,
    signedInUser: app_core_services_context_srv__WEBPACK_IMPORTED_MODULE_11__["contextSrv"].user // this makes the feature toggle mockable/controllable from tests,

  };
}

var mapDispatchToProps = {
  addTeamMember: _state_actions__WEBPACK_IMPORTED_MODULE_6__["addTeamMember"],
  setSearchMemberQuery: _state_reducers__WEBPACK_IMPORTED_MODULE_13__["setSearchMemberQuery"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(TeamMembers));

/***/ }),

/***/ "./public/app/features/teams/TeamPages.tsx":
/*!*************************************************!*\
  !*** ./public/app/features/teams/TeamPages.tsx ***!
  \*************************************************/
/*! exports provided: TeamPages, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamPages", function() { return TeamPages; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _TeamMembers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TeamMembers */ "./public/app/features/teams/TeamMembers.tsx");
/* harmony import */ var _TeamSettings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TeamSettings */ "./public/app/features/teams/TeamSettings.tsx");
/* harmony import */ var _TeamGroupSync__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TeamGroupSync */ "./public/app/features/teams/TeamGroupSync.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/teams/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/teams/state/selectors.ts");
/* harmony import */ var _state_navModel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/navModel */ "./public/app/features/teams/state/navModel.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var _core_selectors_location__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../core/selectors/location */ "./public/app/core/selectors/location.ts");
/* harmony import */ var app_core_services_context_srv__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/core/services/context_srv */ "./public/app/core/services/context_srv.ts");
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
















var PageTypes;

(function (PageTypes) {
  PageTypes["Members"] = "members";
  PageTypes["Settings"] = "settings";
  PageTypes["GroupSync"] = "groupsync";
})(PageTypes || (PageTypes = {}));

var TeamPages =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TeamPages, _PureComponent);

  function TeamPages(props) {
    var _this;

    _classCallCheck(this, TeamPages);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TeamPages).call(this, props));

    _this.textsAreEqual = function (text1, text2) {
      if (!text1 && !text2) {
        return true;
      }

      if (!text1 || !text2) {
        return false;
      }

      return text1.toLocaleLowerCase() === text2.toLocaleLowerCase();
    };

    _this.hideTabsFromNonTeamAdmin = function (navModel, isSignedInUserTeamAdmin) {
      if (!isSignedInUserTeamAdmin && navModel.main && navModel.main.children) {
        navModel.main.children.filter(function (navItem) {
          return !_this.textsAreEqual(navItem.text, PageTypes.Members);
        }).map(function (navItem) {
          navItem.hideFromTabs = true;
        });
      }

      return navModel;
    };

    _this.state = {
      isLoading: false,
      isSyncEnabled: app_core_config__WEBPACK_IMPORTED_MODULE_4__["default"].licenseInfo.hasLicense
    };
    return _this;
  }

  _createClass(TeamPages, [{
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
                return this.fetchTeam();

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
    key: "fetchTeam",
    value: function () {
      var _fetchTeam = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this$props, loadTeam, teamId, team;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props = this.props, loadTeam = _this$props.loadTeam, teamId = _this$props.teamId;
                this.setState({
                  isLoading: true
                });
                _context2.next = 4;
                return loadTeam(teamId);

              case 4:
                team = _context2.sent;
                _context2.next = 7;
                return this.props.loadTeamMembers();

              case 7:
                this.setState({
                  isLoading: false
                });
                return _context2.abrupt("return", team);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchTeam() {
        return _fetchTeam.apply(this, arguments);
      }

      return fetchTeam;
    }()
  }, {
    key: "getCurrentPage",
    value: function getCurrentPage() {
      var pages = ['members', 'settings', 'groupsync'];
      var currentPage = this.props.pageName;
      return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.includes(pages, currentPage) ? currentPage : pages[0];
    }
  }, {
    key: "renderPage",
    value: function renderPage(isSignedInUserTeamAdmin) {
      var isSyncEnabled = this.state.isSyncEnabled;
      var members = this.props.members;
      var currentPage = this.getCurrentPage();

      switch (currentPage) {
        case PageTypes.Members:
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TeamMembers__WEBPACK_IMPORTED_MODULE_6__["default"], {
            syncEnabled: isSyncEnabled,
            members: members
          });

        case PageTypes.Settings:
          return isSignedInUserTeamAdmin && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TeamSettings__WEBPACK_IMPORTED_MODULE_7__["default"], null);

        case PageTypes.GroupSync:
          return isSignedInUserTeamAdmin && isSyncEnabled && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TeamGroupSync__WEBPACK_IMPORTED_MODULE_8__["default"], null);
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          team = _this$props2.team,
          navModel = _this$props2.navModel,
          members = _this$props2.members,
          editorsCanAdmin = _this$props2.editorsCanAdmin,
          signedInUser = _this$props2.signedInUser;
      var isTeamAdmin = Object(_state_selectors__WEBPACK_IMPORTED_MODULE_10__["isSignedInUserTeamAdmin"])({
        members: members,
        editorsCanAdmin: editorsCanAdmin,
        signedInUser: signedInUser
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"], {
        navModel: this.hideTabsFromNonTeamAdmin(navModel, isTeamAdmin)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"].Contents, {
        isLoading: this.state.isLoading
      }, team && Object.keys(team).length !== 0 && this.renderPage(isTeamAdmin)));
    }
  }]);

  return TeamPages;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapStateToProps(state) {
  var teamId = Object(_core_selectors_location__WEBPACK_IMPORTED_MODULE_13__["getRouteParamsId"])(state.location);
  var pageName = Object(_core_selectors_location__WEBPACK_IMPORTED_MODULE_13__["getRouteParamsPage"])(state.location) || 'members';
  var teamLoadingNav = Object(_state_navModel__WEBPACK_IMPORTED_MODULE_11__["getTeamLoadingNav"])(pageName);
  var navModel = Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_12__["getNavModel"])(state.navIndex, "team-".concat(pageName, "-").concat(teamId), teamLoadingNav);
  var team = Object(_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getTeam"])(state.team, teamId);
  var members = Object(_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getTeamMembers"])(state.team);
  return {
    navModel: navModel,
    teamId: teamId,
    pageName: pageName,
    team: team,
    members: members,
    editorsCanAdmin: app_core_config__WEBPACK_IMPORTED_MODULE_4__["default"].editorsCanAdmin,
    // this makes the feature toggle mockable/controllable from tests,
    signedInUser: app_core_services_context_srv__WEBPACK_IMPORTED_MODULE_14__["contextSrv"].user // this makes the feature toggle mockable/controllable from tests,

  };
}

var mapDispatchToProps = {
  loadTeam: _state_actions__WEBPACK_IMPORTED_MODULE_9__["loadTeam"],
  loadTeamMembers: _state_actions__WEBPACK_IMPORTED_MODULE_9__["loadTeamMembers"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(TeamPages)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/teams/TeamSettings.tsx":
/*!****************************************************!*\
  !*** ./public/app/features/teams/TeamSettings.tsx ***!
  \****************************************************/
/*! exports provided: TeamSettings, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamSettings", function() { return TeamSettings; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_SharedPreferences_SharedPreferences__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/SharedPreferences/SharedPreferences */ "./public/app/core/components/SharedPreferences/SharedPreferences.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/teams/state/actions.ts");
/* harmony import */ var app_core_selectors_location__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/selectors/location */ "./public/app/core/selectors/location.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/teams/state/selectors.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var TeamSettings = function TeamSettings(_ref) {
  var team = _ref.team,
      updateTeam = _ref.updateTeam;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["VerticalGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FieldSet"], {
    label: "\u56E2\u961F\u8BBE\u7F6E"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Form"], {
    defaultValues: _objectSpread({}, team),
    onSubmit: function onSubmit(formTeam) {
      updateTeam(formTeam.name, formTeam.email);
    }
  }, function (_ref2) {
    var register = _ref2.register;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      label: "\u540D\u5B57"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      name: "name",
      ref: register({
        required: true
      })
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
      label: "\u7535\u5B50\u90AE\u4EF6",
      description: "\u8FD9\u662F\u53EF\u9009\u7684\uFF0C\u4E3B\u8981\u7528\u4E8E\u8BBE\u7F6E\u56E2\u961F\u8D44\u6599\u7684\u5934\u50CF\uFF08\u901A\u8FC7gravatar\u670D\u52A1\uFF09"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
      placeholder: "team@email.com",
      type: "email",
      name: "email",
      ref: register
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      type: "submit"
    }, "\u66F4\u65B0"));
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_SharedPreferences_SharedPreferences__WEBPACK_IMPORTED_MODULE_3__["SharedPreferences"], {
    resourceUri: "teams/".concat(team.id)
  }));
};

function mapStateToProps(state) {
  var teamId = Object(app_core_selectors_location__WEBPACK_IMPORTED_MODULE_5__["getRouteParamsId"])(state.location);
  return {
    team: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_6__["getTeam"])(state.team, teamId)
  };
}

var mapDispatchToProps = {
  updateTeam: _state_actions__WEBPACK_IMPORTED_MODULE_4__["updateTeam"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(TeamSettings));

/***/ })

}]);
//# sourceMappingURL=TeamPages.1ebdc265fc3bd7452fcd.js.map