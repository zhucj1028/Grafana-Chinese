(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["DataSourcesListPage"],{

/***/ "./public/app/core/components/OrgActionBar/OrgActionBar.tsx":
/*!******************************************************************!*\
  !*** ./public/app/core/components/OrgActionBar/OrgActionBar.tsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OrgActionBar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../FilterInput/FilterInput */ "./public/app/core/components/FilterInput/FilterInput.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var OrgActionBar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(OrgActionBar, _PureComponent);

  function OrgActionBar() {
    _classCallCheck(this, OrgActionBar);

    return _possibleConstructorReturn(this, _getPrototypeOf(OrgActionBar).apply(this, arguments));
  }

  _createClass(OrgActionBar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          searchQuery = _this$props.searchQuery,
          linkButton = _this$props.linkButton,
          setSearchQuery = _this$props.setSearchQuery,
          target = _this$props.target;
      var linkProps = {
        href: linkButton.href
      };

      if (target) {
        linkProps.target = target;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form gf-form--grow"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_1__["FilterInput"], {
        labelClassName: "gf-form--has-input-icon",
        inputClassName: "gf-form-input width-20",
        value: searchQuery,
        onChange: setSearchQuery,
        placeholder: '按名称或类型搜索'
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar__spacer"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LinkButton"], linkProps, linkButton.title));
    }
  }]);

  return OrgActionBar;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);



/***/ }),

/***/ "./public/app/features/datasources/DataSourcesList.tsx":
/*!*************************************************************!*\
  !*** ./public/app/features/datasources/DataSourcesList.tsx ***!
  \*************************************************************/
/*! exports provided: DataSourcesList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourcesList", function() { return DataSourcesList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DataSourcesListItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataSourcesListItem */ "./public/app/features/datasources/DataSourcesListItem.tsx");
/* harmony import */ var _core_components_LayoutSelector_LayoutSelector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/components/LayoutSelector/LayoutSelector */ "./public/app/core/components/LayoutSelector/LayoutSelector.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Libraries

 // Components

 // Types


var DataSourcesList =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DataSourcesList, _PureComponent);

  function DataSourcesList() {
    _classCallCheck(this, DataSourcesList);

    return _possibleConstructorReturn(this, _getPrototypeOf(DataSourcesList).apply(this, arguments));
  }

  _createClass(DataSourcesList, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          dataSources = _this$props.dataSources,
          layoutMode = _this$props.layoutMode;
      var listStyle = classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        'card-section': true,
        'card-list-layout-grid': layoutMode === _core_components_LayoutSelector_LayoutSelector__WEBPACK_IMPORTED_MODULE_3__["LayoutModes"].Grid,
        'card-list-layout-list': layoutMode === _core_components_LayoutSelector_LayoutSelector__WEBPACK_IMPORTED_MODULE_3__["LayoutModes"].List
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
        className: listStyle
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ol", {
        className: "card-list"
      }, dataSources.map(function (dataSource, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataSourcesListItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
          dataSource: dataSource,
          key: "".concat(dataSource.id, "-").concat(index)
        });
      })));
    }
  }]);

  return DataSourcesList;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (DataSourcesList);

/***/ }),

/***/ "./public/app/features/datasources/DataSourcesListItem.tsx":
/*!*****************************************************************!*\
  !*** ./public/app/features/datasources/DataSourcesListItem.tsx ***!
  \*****************************************************************/
/*! exports provided: DataSourcesListItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourcesListItem", function() { return DataSourcesListItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var DataSourcesListItem =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DataSourcesListItem, _PureComponent);

  function DataSourcesListItem() {
    _classCallCheck(this, DataSourcesListItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(DataSourcesListItem).apply(this, arguments));
  }

  _createClass(DataSourcesListItem, [{
    key: "render",
    value: function render() {
      var dataSource = this.props.dataSource;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "card-item-wrapper"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "card-item",
        href: "datasources/edit/".concat(dataSource.id)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-item-header"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-item-type"
      }, dataSource.type)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-item-body"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", {
        className: "card-item-figure"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: dataSource.typeLogoUrl,
        alt: dataSource.name
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-item-details"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-item-name",
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_1__["selectors"].pages.DataSources.dataSources(dataSource.name)
      }, dataSource.name, dataSource.isDefault && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "btn btn-secondary btn-small card-item-label"
      }, "\u9ED8\u8BA4")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "card-item-sub-name"
      }, dataSource.url)))));
    }
  }]);

  return DataSourcesListItem;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (DataSourcesListItem);

/***/ }),

/***/ "./public/app/features/datasources/DataSourcesListPage.tsx":
/*!*****************************************************************!*\
  !*** ./public/app/features/datasources/DataSourcesListPage.tsx ***!
  \*****************************************************************/
/*! exports provided: DataSourcesListPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourcesListPage", function() { return DataSourcesListPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var app_core_components_OrgActionBar_OrgActionBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/OrgActionBar/OrgActionBar */ "./public/app/core/components/OrgActionBar/OrgActionBar.tsx");
/* harmony import */ var app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/EmptyListCTA/EmptyListCTA */ "./public/app/core/components/EmptyListCTA/EmptyListCTA.tsx");
/* harmony import */ var _DataSourcesList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DataSourcesList */ "./public/app/features/datasources/DataSourcesList.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/datasources/state/actions.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/datasources/state/selectors.ts");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/datasources/state/reducers.ts");
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

// Libraries


 // Components




 // Types

// Actions




var emptyListModel = {
  title: '尚未定义数据源',
  buttonIcon: 'database',
  buttonLink: 'datasources/new',
  buttonTitle: '添加数据源',
  proTip: '您还可以通过配置文件定义数据源。',
  proTipLink: 'http://docs.grafana.org/administration/provisioning/#datasources?utm_source=grafana_ds_list',
  proTipLinkTitle: '了解更多',
  proTipTarget: '_blank'
};
var DataSourcesListPage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DataSourcesListPage, _PureComponent);

  function DataSourcesListPage() {
    _classCallCheck(this, DataSourcesListPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(DataSourcesListPage).apply(this, arguments));
  }

  _createClass(DataSourcesListPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchDataSources();
    }
  }, {
    key: "fetchDataSources",
    value: function () {
      var _fetchDataSources = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.props.loadDataSources();

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchDataSources() {
        return _fetchDataSources.apply(this, arguments);
      }

      return fetchDataSources;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          dataSources = _this$props.dataSources,
          dataSourcesCount = _this$props.dataSourcesCount,
          navModel = _this$props.navModel,
          layoutMode = _this$props.layoutMode,
          searchQuery = _this$props.searchQuery,
          setDataSourcesSearchQuery = _this$props.setDataSourcesSearchQuery,
          hasFetched = _this$props.hasFetched;
      var linkButton = {
        href: 'datasources/new',
        title: '添加数据源'
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"], {
        navModel: navModel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"].Contents, {
        isLoading: !hasFetched
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, hasFetched && dataSourcesCount === 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_5__["default"], emptyListModel), hasFetched && dataSourcesCount > 0 && [react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_OrgActionBar_OrgActionBar__WEBPACK_IMPORTED_MODULE_4__["default"], {
        searchQuery: searchQuery,
        setSearchQuery: function setSearchQuery(query) {
          return setDataSourcesSearchQuery(query);
        },
        linkButton: linkButton,
        key: "action-bar"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataSourcesList__WEBPACK_IMPORTED_MODULE_6__["default"], {
        dataSources: dataSources,
        layoutMode: layoutMode,
        key: "list"
      })])));
    }
  }]);

  return DataSourcesListPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function mapStateToProps(state) {
  return {
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_8__["getNavModel"])(state.navIndex, 'datasources'),
    dataSources: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_9__["getDataSources"])(state.dataSources),
    layoutMode: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_9__["getDataSourcesLayoutMode"])(state.dataSources),
    dataSourcesCount: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_9__["getDataSourcesCount"])(state.dataSources),
    searchQuery: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_9__["getDataSourcesSearchQuery"])(state.dataSources),
    hasFetched: state.dataSources.hasFetched
  };
}

var mapDispatchToProps = {
  loadDataSources: _state_actions__WEBPACK_IMPORTED_MODULE_7__["loadDataSources"],
  setDataSourcesSearchQuery: _state_reducers__WEBPACK_IMPORTED_MODULE_10__["setDataSourcesSearchQuery"],
  setDataSourcesLayoutMode: _state_reducers__WEBPACK_IMPORTED_MODULE_10__["setDataSourcesLayoutMode"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataSourcesListPage)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=DataSourcesListPage.1ebdc265fc3bd7452fcd.js.map