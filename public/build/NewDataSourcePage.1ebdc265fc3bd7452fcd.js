(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["NewDataSourcePage"],{

/***/ "./public/app/core/components/Card/Card.tsx":
/*!**************************************************!*\
  !*** ./public/app/core/components/Card/Card.tsx ***!
  \**************************************************/
/*! exports provided: Card */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Card", function() { return Card; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");


var Card = function Card(_ref) {
  var logoUrl = _ref.logoUrl,
      title = _ref.title,
      description = _ref.description,
      labels = _ref.labels,
      actions = _ref.actions,
      onClick = _ref.onClick,
      ariaLabel = _ref.ariaLabel,
      className = _ref.className;
  var mainClassName = Object(emotion__WEBPACK_IMPORTED_MODULE_1__["cx"])('add-data-source-item', className);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: mainClassName,
    onClick: onClick,
    "aria-label": ariaLabel
  }, logoUrl && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "add-data-source-item-logo",
    src: logoUrl
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "add-data-source-item-text-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "add-data-source-item-text"
  }, title), description && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "add-data-source-item-desc"
  }, description), labels && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, labels)), actions && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "add-data-source-item-actions"
  }, actions));
};

/***/ }),

/***/ "./public/app/features/datasources/NewDataSourcePage.tsx":
/*!***************************************************************!*\
  !*** ./public/app/features/datasources/NewDataSourcePage.tsx ***!
  \***************************************************************/
/*! exports provided: getNavModel, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNavModel", function() { return getNavModel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/datasources/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/datasources/state/selectors.ts");
/* harmony import */ var app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/components/FilterInput/FilterInput */ "./public/app/core/components/FilterInput/FilterInput.tsx");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/datasources/state/reducers.ts");
/* harmony import */ var _plugins_PluginSignatureBadge__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../plugins/PluginSignatureBadge */ "./public/app/features/plugins/PluginSignatureBadge.tsx");
/* harmony import */ var app_core_components_Card_Card__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/components/Card/Card */ "./public/app/core/components/Card/Card.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }














var NewDataSourcePage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(NewDataSourcePage, _PureComponent);

  function NewDataSourcePage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NewDataSourcePage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NewDataSourcePage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onDataSourceTypeClicked = function (plugin) {
      _this.props.addDataSource(plugin);
    };

    _this.onSearchQueryChange = function (value) {
      _this.props.setDataSourceTypeSearchQuery(value);
    };

    _this.onLearnMoreClick = function (evt) {
      evt.stopPropagation();
    };

    return _this;
  }

  _createClass(NewDataSourcePage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.loadDataSourcePlugins();
    }
  }, {
    key: "renderPlugins",
    value: function renderPlugins(plugins) {
      var _this2 = this;

      if (!plugins || !plugins.length) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["List"], {
        items: plugins,
        getItemKey: function getItemKey(item) {
          return item.id.toString();
        },
        renderItem: function renderItem(item) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DataSourceTypeCard, {
            plugin: item,
            onClick: function onClick() {
              return _this2.onDataSourceTypeClicked(item);
            },
            onLearnMoreClick: _this2.onLearnMoreClick
          });
        }
      });
    }
  }, {
    key: "renderCategories",
    value: function renderCategories() {
      var _this3 = this;

      var categories = this.props.categories;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, categories.map(function (category) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "add-data-source-category",
          key: category.id
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "add-data-source-category__header"
        }, category.title), _this3.renderPlugins(category.plugins));
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "add-data-source-more"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LinkButton"], {
        variant: "secondary",
        href: "https://grafana.com/plugins?type=datasource&utm_source=grafana_add_ds",
        target: "_blank",
        rel: "noopener"
      }, "\u5728grafana.com\u4E0A\u67E5\u627E\u66F4\u591A\u6570\u636E\u6E90\u63D2\u4EF6")));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          navModel = _this$props.navModel,
          isLoading = _this$props.isLoading,
          searchQuery = _this$props.searchQuery,
          plugins = _this$props.plugins;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"], {
        navModel: navModel
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"].Contents, {
        isLoading: isLoading
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_8__["FilterInput"], {
        value: searchQuery,
        onChange: this.onSearchQueryChange,
        placeholder: "\u6309\u540D\u79F0\u6216\u7C7B\u578B\u8FC7\u6EE4"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "page-action-bar__spacer"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LinkButton"], {
        href: "datasources"
      }, "\u53D6\u6D88")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, searchQuery && this.renderPlugins(plugins), !searchQuery && this.renderCategories())));
    }
  }]);

  return NewDataSourcePage;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var DataSourceTypeCard = function DataSourceTypeCard(props) {
  var plugin = props.plugin,
      onLearnMoreClick = props.onLearnMoreClick;
  var isPhantom = plugin.module === 'phantom';
  var onClick = !isPhantom ? props.onClick : function () {}; // find first plugin info link

  var learnMoreLink = plugin.info.links && plugin.info.links.length > 0 ? plugin.info.links[0] : null;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Card_Card__WEBPACK_IMPORTED_MODULE_11__["Card"], {
    title: plugin.name,
    description: plugin.info.description,
    ariaLabel: _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_4__["selectors"].pages.AddDataSource.dataSourcePlugins(plugin.name),
    logoUrl: plugin.info.logos.small,
    actions: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, learnMoreLink && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LinkButton"], {
      variant: "secondary",
      href: "".concat(learnMoreLink.url, "?utm_source=grafana_add_ds"),
      target: "_blank",
      rel: "noopener",
      onClick: onLearnMoreClick,
      icon: "external-link-alt"
    }, learnMoreLink.name), !isPhantom && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], null, "\u9009\u62E9")),
    labels: !isPhantom && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_plugins_PluginSignatureBadge__WEBPACK_IMPORTED_MODULE_10__["PluginSignatureBadge"], {
      status: plugin.signature
    })),
    className: isPhantom ? 'add-data-source-item--phantom' : '',
    onClick: onClick,
    "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_4__["selectors"].pages.AddDataSource.dataSourcePlugins(plugin.name)
  });
};

function getNavModel() {
  var main = {
    icon: 'database',
    id: 'datasource-new',
    text: '添加数据源',
    href: 'datasources/new',
    subTitle: '选择数据源类型'
  };
  return {
    main: main,
    node: main
  };
}

function mapStateToProps(state) {
  return {
    navModel: getNavModel(),
    plugins: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_7__["getDataSourcePlugins"])(state.dataSources),
    searchQuery: state.dataSources.dataSourceTypeSearchQuery,
    categories: state.dataSources.categories,
    isLoading: state.dataSources.isLoadingDataSources
  };
}

var mapDispatchToProps = {
  addDataSource: _state_actions__WEBPACK_IMPORTED_MODULE_6__["addDataSource"],
  loadDataSourcePlugins: _state_actions__WEBPACK_IMPORTED_MODULE_6__["loadDataSourcePlugins"],
  setDataSourceTypeSearchQuery: _state_reducers__WEBPACK_IMPORTED_MODULE_9__["setDataSourceTypeSearchQuery"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(NewDataSourcePage)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/plugins/PluginSignatureBadge.tsx":
/*!**************************************************************!*\
  !*** ./public/app/features/plugins/PluginSignatureBadge.tsx ***!
  \**************************************************************/
/*! exports provided: PluginSignatureBadge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginSignatureBadge", function() { return PluginSignatureBadge; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");



var PluginSignatureBadge = function PluginSignatureBadge(_ref) {
  var status = _ref.status;
  var display = getSignatureDisplayModel(status);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Badge"], {
    text: display.text,
    color: display.color,
    icon: display.icon,
    tooltip: display.tooltip
  });
};

function getSignatureDisplayModel(signature) {
  if (!signature) {
    signature = _grafana_data__WEBPACK_IMPORTED_MODULE_2__["PluginSignatureStatus"].invalid;
  }

  switch (signature) {
    case _grafana_data__WEBPACK_IMPORTED_MODULE_2__["PluginSignatureStatus"].internal:
      return {
        text: '核心',
        icon: 'cube',
        color: 'blue',
        tooltip: '与Grafana捆绑在一起的核心插件'
      };

    case _grafana_data__WEBPACK_IMPORTED_MODULE_2__["PluginSignatureStatus"].valid:
      return {
        text: '签名',
        icon: 'lock',
        color: 'green',
        tooltip: '签名并验证的插件'
      };

    case _grafana_data__WEBPACK_IMPORTED_MODULE_2__["PluginSignatureStatus"].invalid:
      return {
        text: '无效',
        icon: 'exclamation-triangle',
        color: 'red',
        tooltip: '无效的插件签名'
      };

    case _grafana_data__WEBPACK_IMPORTED_MODULE_2__["PluginSignatureStatus"].modified:
      return {
        text: '已修改',
        icon: 'exclamation-triangle',
        color: 'red',
        tooltip: '有效签名，但内容已被修改'
      };
  }

  return {
    text: '未签名',
    icon: 'exclamation-triangle',
    color: 'red',
    tooltip: '未签名的外部插件'
  };
}

PluginSignatureBadge.displayName = 'PluginSignatureBadge';

/***/ })

}]);
//# sourceMappingURL=NewDataSourcePage.1ebdc265fc3bd7452fcd.js.map