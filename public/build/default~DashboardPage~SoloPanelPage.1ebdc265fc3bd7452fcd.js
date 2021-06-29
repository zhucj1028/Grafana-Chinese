(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~DashboardPage~SoloPanelPage"],{

/***/ "./public/app/features/dashboard/components/Inspector/types.ts":
/*!*********************************************************************!*\
  !*** ./public/app/features/dashboard/components/Inspector/types.ts ***!
  \*********************************************************************/
/*! exports provided: InspectTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InspectTab", function() { return InspectTab; });
var InspectTab;

(function (InspectTab) {
  InspectTab["Data"] = "data";
  InspectTab["Meta"] = "meta";
  InspectTab["Error"] = "error";
  InspectTab["Stats"] = "stats";
  InspectTab["JSON"] = "json";
  InspectTab["Query"] = "query";
})(InspectTab || (InspectTab = {}));

/***/ }),

/***/ "./public/app/features/dashboard/dashgrid/DashboardPanel.tsx":
/*!*******************************************************************!*\
  !*** ./public/app/features/dashboard/dashgrid/DashboardPanel.tsx ***!
  \*******************************************************************/
/*! exports provided: DashboardPanelUnconnected, DashboardPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPanelUnconnected", function() { return DashboardPanelUnconnected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPanel", function() { return DashboardPanel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-virtualized-auto-sizer */ "./node_modules/react-virtualized-auto-sizer/dist/index.esm.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _PanelChrome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PanelChrome */ "./public/app/features/dashboard/dashgrid/PanelChrome.tsx");
/* harmony import */ var _PanelChromeAngular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PanelChromeAngular */ "./public/app/features/dashboard/dashgrid/PanelChromeAngular.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../state/actions */ "./public/app/features/dashboard/state/actions.ts");
/* harmony import */ var app_core_reducers_location__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/reducers/location */ "./public/app/core/reducers/location.ts");
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


 // Actions


 // Types

var DashboardPanelUnconnected =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DashboardPanelUnconnected, _PureComponent);

  function DashboardPanelUnconnected(props) {
    var _this;

    _classCallCheck(this, DashboardPanelUnconnected);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DashboardPanelUnconnected).call(this, props));
    _this.specialPanels = {};

    _this.onMouseEnter = function () {
      _this.props.dashboard.setPanelFocus(_this.props.panel.id);
    };

    _this.onMouseLeave = function () {
      _this.props.dashboard.setPanelFocus(0);
    };

    _this.state = {
      isLazy: !props.isInView
    };
    return _this;
  }

  _createClass(DashboardPanelUnconnected, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.initDashboardPanel(this.props.panel);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.isLazy && this.props.isInView) {
        this.setState({
          isLazy: false
        });
      }
    }
  }, {
    key: "renderPanel",
    value: function renderPanel(plugin) {
      var _this$props = this.props,
          dashboard = _this$props.dashboard,
          panel = _this$props.panel,
          isViewing = _this$props.isViewing,
          isInView = _this$props.isInView,
          isEditing = _this$props.isEditing,
          updateLocation = _this$props.updateLocation;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_2__["default"], null, function (_ref) {
        var width = _ref.width,
            height = _ref.height;

        if (width === 0) {
          return null;
        }

        if (plugin.angularPanelCtrl) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PanelChromeAngular__WEBPACK_IMPORTED_MODULE_5__["PanelChromeAngular"], {
            plugin: plugin,
            panel: panel,
            dashboard: dashboard,
            isViewing: isViewing,
            isEditing: isEditing,
            isInView: isInView,
            width: width,
            height: height
          });
        }

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PanelChrome__WEBPACK_IMPORTED_MODULE_4__["PanelChrome"], {
          plugin: plugin,
          panel: panel,
          dashboard: dashboard,
          isViewing: isViewing,
          isEditing: isEditing,
          isInView: isInView,
          width: width,
          height: height,
          updateLocation: updateLocation
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          isViewing = _this$props2.isViewing,
          plugin = _this$props2.plugin;
      var isLazy = this.state.isLazy; // if we have not loaded plugin exports yet, wait

      if (!plugin) {
        return null;
      } // If we are lazy state don't render anything


      if (isLazy) {
        return null;
      }

      var panelWrapperClass = classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        'panel-wrapper': true,
        'panel-wrapper--view': isViewing
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: panelWrapperClass,
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave
      }, this.renderPanel(plugin));
    }
  }]);

  return DashboardPanelUnconnected;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state, props) {
  var panelState = state.dashboard.panels[props.panel.id];

  if (!panelState) {
    return {
      plugin: null
    };
  }

  return {
    plugin: panelState.plugin
  };
};

var mapDispatchToProps = {
  initDashboardPanel: _state_actions__WEBPACK_IMPORTED_MODULE_6__["initDashboardPanel"],
  updateLocation: app_core_reducers_location__WEBPACK_IMPORTED_MODULE_7__["updateLocation"]
};
var DashboardPanel = Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(DashboardPanelUnconnected);

/***/ }),

/***/ "./public/app/features/dashboard/dashgrid/PanelChrome.tsx":
/*!****************************************************************!*\
  !*** ./public/app/features/dashboard/dashgrid/PanelChrome.tsx ***!
  \****************************************************************/
/*! exports provided: PanelChrome */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelChrome", function() { return PanelChrome; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PanelHeader_PanelHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PanelHeader/PanelHeader */ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeader.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _services_TimeSrv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");
/* harmony import */ var app_features_dashboard_utils_panel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/features/dashboard/utils/panel */ "./public/app/features/dashboard/utils/panel.ts");
/* harmony import */ var app_core_profiler__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/profiler */ "./public/app/core/profiler.ts");
/* harmony import */ var _state_runRequest__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../state/runRequest */ "./public/app/features/dashboard/state/runRequest.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var app_core_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/constants */ "./public/app/core/constants.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

 // Utils & Services









var DEFAULT_PLUGIN_ERROR = 'Error in plugin';
var PanelChrome =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PanelChrome, _PureComponent);

  function PanelChrome(props) {
    var _this;

    _classCallCheck(this, PanelChrome);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PanelChrome).call(this, props));
    _this.timeSrv = Object(_services_TimeSrv__WEBPACK_IMPORTED_MODULE_4__["getTimeSrv"])();

    _this.onRefresh = function () {
      var _this$props = _this.props,
          panel = _this$props.panel,
          isInView = _this$props.isInView,
          width = _this$props.width;

      if (!isInView) {
        _this.setState({
          refreshWhenInView: true
        });

        return;
      }

      var timeData = Object(app_features_dashboard_utils_panel__WEBPACK_IMPORTED_MODULE_5__["applyPanelTimeOverrides"])(panel, _this.timeSrv.timeRange()); // Issue Query

      if (_this.wantsQueryExecution) {
        if (width < 0) {
          return;
        }

        panel.getQueryRunner().run({
          datasource: panel.datasource,
          queries: panel.targets,
          panelId: panel.id,
          dashboardId: _this.props.dashboard.id,
          timezone: _this.props.dashboard.getTimezone(),
          timeRange: timeData.timeRange,
          timeInfo: timeData.timeInfo,
          maxDataPoints: panel.maxDataPoints || width,
          minInterval: panel.interval,
          scopedVars: panel.scopedVars,
          cacheTimeout: panel.cacheTimeout,
          transformations: panel.transformations
        });
      } else {
        // The panel should render on refresh as well if it doesn't have a query, like clock panel
        _this.onRender();
      }
    };

    _this.onRender = function () {
      var stateUpdate = {
        renderCounter: _this.state.renderCounter + 1
      };

      _this.setState(stateUpdate);
    };

    _this.onOptionsChange = function (options) {
      _this.props.panel.updateOptions(options);
    };

    _this.onFieldConfigChange = function (config) {
      _this.props.panel.updateFieldConfig(config);
    };

    _this.onPanelError = function (message) {
      if (_this.state.errorMessage !== message) {
        _this.setState({
          errorMessage: message
        });
      }
    };

    _this.onChangeTimeRange = function (timeRange) {
      _this.timeSrv.setTime({
        from: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_10__["toUtc"])(timeRange.from),
        to: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_10__["toUtc"])(timeRange.to)
      });
    };

    _this.state = {
      isFirstLoad: true,
      renderCounter: 0,
      refreshWhenInView: false,
      data: {
        state: _grafana_data__WEBPACK_IMPORTED_MODULE_10__["LoadingState"].NotStarted,
        series: [],
        timeRange: _grafana_data__WEBPACK_IMPORTED_MODULE_10__["DefaultTimeRange"]
      }
    };
    return _this;
  }

  _createClass(PanelChrome, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props2 = this.props,
          panel = _this$props2.panel,
          dashboard = _this$props2.dashboard;
      panel.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_10__["PanelEvents"].refresh, this.onRefresh);
      panel.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_10__["PanelEvents"].render, this.onRender);
      dashboard.panelInitialized(this.props.panel); // Move snapshot data into the query response

      if (this.hasPanelSnapshot) {
        this.setState({
          data: _objectSpread({}, this.state.data, {
            state: _grafana_data__WEBPACK_IMPORTED_MODULE_10__["LoadingState"].Done,
            series: Object(_state_runRequest__WEBPACK_IMPORTED_MODULE_7__["getProcessedDataFrames"])(panel.snapshotData)
          }),
          isFirstLoad: false
        });
        return;
      }

      if (!this.wantsQueryExecution) {
        this.setState({
          isFirstLoad: false
        });
      }

      this.querySubscription = panel.getQueryRunner().getData({
        withTransforms: true,
        withFieldConfig: true
      }).subscribe({
        next: function next(data) {
          return _this2.onDataUpdate(data);
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.panel.events.off(_grafana_data__WEBPACK_IMPORTED_MODULE_10__["PanelEvents"].refresh, this.onRefresh);
      this.props.panel.events.off(_grafana_data__WEBPACK_IMPORTED_MODULE_10__["PanelEvents"].render, this.onRender);

      if (this.querySubscription) {
        this.querySubscription.unsubscribe();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var isInView = this.props.isInView; // View state has changed

      if (isInView !== prevProps.isInView) {
        if (isInView) {
          // Check if we need a delayed refresh
          if (this.state.refreshWhenInView) {
            this.onRefresh();
          }
        }
      }
    } // Updates the response with information from the stream
    // The next is outside a react synthetic event so setState is not batched
    // So in this context we can only do a single call to setState

  }, {
    key: "onDataUpdate",
    value: function onDataUpdate(data) {
      if (!this.props.isInView) {
        // Ignore events when not visible.
        // The call will be repeated when the panel comes into view
        return;
      }

      var isFirstLoad = this.state.isFirstLoad;
      var errorMessage;

      switch (data.state) {
        case _grafana_data__WEBPACK_IMPORTED_MODULE_10__["LoadingState"].Loading:
          // Skip updating state data if it is already in loading state
          // This is to avoid rendering partial loading responses
          if (this.state.data.state === _grafana_data__WEBPACK_IMPORTED_MODULE_10__["LoadingState"].Loading) {
            return;
          }

          break;

        case _grafana_data__WEBPACK_IMPORTED_MODULE_10__["LoadingState"].Error:
          var error = data.error;

          if (error) {
            if (errorMessage !== error.message) {
              errorMessage = error.message;
            }
          }

          break;

        case _grafana_data__WEBPACK_IMPORTED_MODULE_10__["LoadingState"].Done:
          // If we are doing a snapshot save data in panel model
          if (this.props.dashboard.snapshot) {
            this.props.panel.snapshotData = data.series.map(function (frame) {
              return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_10__["toDataFrameDTO"])(frame);
            });
          }

          if (isFirstLoad) {
            isFirstLoad = false;
          }

          break;
      }

      this.setState({
        isFirstLoad: isFirstLoad,
        errorMessage: errorMessage,
        data: data
      });
    }
  }, {
    key: "shouldSignalRenderingCompleted",
    value: function shouldSignalRenderingCompleted(loadingState, pluginMeta) {
      return loadingState === _grafana_data__WEBPACK_IMPORTED_MODULE_10__["LoadingState"].Done || pluginMeta.skipDataQuery;
    }
  }, {
    key: "renderPanel",
    value: function renderPanel(width, height) {
      var _this$props3 = this.props,
          panel = _this$props3.panel,
          plugin = _this$props3.plugin;
      var _this$state = this.state,
          renderCounter = _this$state.renderCounter,
          data = _this$state.data,
          isFirstLoad = _this$state.isFirstLoad;
      var theme = app_core_config__WEBPACK_IMPORTED_MODULE_8__["default"].theme;
      var loadingState = data.state; // do not render component until we have first data

      if (isFirstLoad && (loadingState === _grafana_data__WEBPACK_IMPORTED_MODULE_10__["LoadingState"].Loading || loadingState === _grafana_data__WEBPACK_IMPORTED_MODULE_10__["LoadingState"].NotStarted)) {
        return null;
      } // This is only done to increase a counter that is used by backend
      // image rendering to know when to capture image


      if (this.shouldSignalRenderingCompleted(loadingState, plugin.meta)) {
        app_core_profiler__WEBPACK_IMPORTED_MODULE_6__["profiler"].renderingCompleted();
      }

      var PanelComponent = plugin.panel;
      var timeRange = data.timeRange || this.timeSrv.timeRange();
      var headerHeight = this.hasOverlayHeader() ? 0 : theme.panelHeaderHeight;
      var chromePadding = plugin.noPadding ? 0 : theme.panelPadding;
      var panelWidth = width - chromePadding * 2 - app_core_constants__WEBPACK_IMPORTED_MODULE_9__["PANEL_BORDER"];
      var innerPanelHeight = height - headerHeight - chromePadding * 2 - app_core_constants__WEBPACK_IMPORTED_MODULE_9__["PANEL_BORDER"];
      var panelContentClassNames = classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        'panel-content': true,
        'panel-content--no-padding': plugin.noPadding
      });
      var panelOptions = panel.getOptions();
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: panelContentClassNames
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PanelComponent, {
        id: panel.id,
        data: data,
        title: panel.title,
        timeRange: timeRange,
        timeZone: this.props.dashboard.getTimezone(),
        options: panelOptions,
        fieldConfig: panel.fieldConfig,
        transparent: panel.transparent,
        width: panelWidth,
        height: innerPanelHeight,
        renderCounter: renderCounter,
        replaceVariables: panel.replaceVariables,
        onOptionsChange: this.onOptionsChange,
        onFieldConfigChange: this.onFieldConfigChange,
        onChangeTimeRange: this.onChangeTimeRange
      })));
    }
  }, {
    key: "hasOverlayHeader",
    value: function hasOverlayHeader() {
      var panel = this.props.panel;
      var _this$state2 = this.state,
          errorMessage = _this$state2.errorMessage,
          data = _this$state2.data; // always show normal header if we have an error message

      if (errorMessage) {
        return false;
      } // always show normal header if we have time override


      if (data.request && data.request.timeInfo) {
        return false;
      }

      return !panel.hasTitle();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props4 = this.props,
          dashboard = _this$props4.dashboard,
          panel = _this$props4.panel,
          isViewing = _this$props4.isViewing,
          isEditing = _this$props4.isEditing,
          width = _this$props4.width,
          height = _this$props4.height,
          updateLocation = _this$props4.updateLocation;
      var _this$state3 = this.state,
          errorMessage = _this$state3.errorMessage,
          data = _this$state3.data;
      var transparent = panel.transparent;
      var containerClassNames = classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        'panel-container': true,
        'panel-container--absolute': true,
        'panel-container--transparent': transparent,
        'panel-container--no-title': this.hasOverlayHeader()
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: containerClassNames,
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_11__["selectors"].components.Panels.Panel.containerByTitle(panel.title)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PanelHeader_PanelHeader__WEBPACK_IMPORTED_MODULE_2__["PanelHeader"], {
        panel: panel,
        dashboard: dashboard,
        title: panel.title,
        description: panel.description,
        scopedVars: panel.scopedVars,
        links: panel.links,
        error: errorMessage,
        isEditing: isEditing,
        isViewing: isViewing,
        data: data,
        updateLocation: updateLocation
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["ErrorBoundary"], null, function (_ref) {
        var error = _ref.error;

        if (error) {
          _this3.onPanelError(error.message || DEFAULT_PLUGIN_ERROR);

          return null;
        }

        return _this3.renderPanel(width, height);
      }));
    }
  }, {
    key: "hasPanelSnapshot",
    get: function get() {
      var panel = this.props.panel;
      return panel.snapshotData && panel.snapshotData.length;
    }
  }, {
    key: "wantsQueryExecution",
    get: function get() {
      return !(this.props.plugin.meta.skipDataQuery || this.hasPanelSnapshot);
    }
  }]);

  return PanelChrome;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/***/ }),

/***/ "./public/app/features/dashboard/dashgrid/PanelChromeAngular.tsx":
/*!***********************************************************************!*\
  !*** ./public/app/features/dashboard/dashgrid/PanelChromeAngular.tsx ***!
  \***********************************************************************/
/*! exports provided: PanelChromeAngularUnconnected, PanelChromeAngular */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelChromeAngularUnconnected", function() { return PanelChromeAngularUnconnected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelChromeAngular", function() { return PanelChromeAngular; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _PanelHeader_PanelHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PanelHeader/PanelHeader */ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeader.tsx");
/* harmony import */ var _services_TimeSrv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../state/reducers */ "./public/app/features/dashboard/state/reducers.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var app_core_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/constants */ "./public/app/core/constants.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

 // Utils & Services




 // Types





var PanelChromeAngularUnconnected =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PanelChromeAngularUnconnected, _PureComponent);

  function PanelChromeAngularUnconnected(props) {
    var _this;

    _classCallCheck(this, PanelChromeAngularUnconnected);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PanelChromeAngularUnconnected).call(this, props));
    _this.element = null;
    _this.timeSrv = Object(_services_TimeSrv__WEBPACK_IMPORTED_MODULE_4__["getTimeSrv"])();

    _this.onPanelRenderEvent = function (payload) {
      var alertState = _this.state.alertState;

      if (payload && payload.alertState && _this.props.panel.alert) {
        _this.setState({
          alertState: payload.alertState
        });
      } else if (payload && payload.alertState && !_this.props.panel.alert) {
        // when user deletes alert in panel editor the source panel needs to refresh as this is in the mutable state and
        // will not automatically re render
        _this.setState({
          alertState: undefined
        });
      } else if (payload && alertState) {
        _this.setState({
          alertState: undefined
        });
      } else {
        // only needed for detecting title updates right now fix before 7.0
        _this.forceUpdate();
      }
    };

    _this.state = {
      data: {
        state: _grafana_data__WEBPACK_IMPORTED_MODULE_8__["LoadingState"].NotStarted,
        series: [],
        timeRange: _grafana_data__WEBPACK_IMPORTED_MODULE_8__["DefaultTimeRange"]
      }
    };
    return _this;
  }

  _createClass(PanelChromeAngularUnconnected, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var panel = this.props.panel;
      this.loadAngularPanel(); // subscribe to data events

      var queryRunner = panel.getQueryRunner(); // we are not displaying any of this data so no need for transforms or field config

      this.querySubscription = queryRunner.getData({
        withTransforms: false,
        withFieldConfig: false
      }).subscribe({
        next: function next(data) {
          return _this2.onPanelDataUpdate(data);
        }
      });
    }
  }, {
    key: "subscribeToRenderEvent",
    value: function subscribeToRenderEvent() {
      // Subscribe to render event, this is as far as I know only needed for changes to title & transparent
      // These changes are modified in the model and only way to communicate that change is via this event
      // Need to find another solution for this in tthe future (panel title in redux?)
      this.props.panel.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_8__["PanelEvents"].render, this.onPanelRenderEvent);
    }
  }, {
    key: "onPanelDataUpdate",
    value: function onPanelDataUpdate(data) {
      var errorMessage;

      if (data.state === _grafana_data__WEBPACK_IMPORTED_MODULE_8__["LoadingState"].Error) {
        var error = data.error;

        if (error) {
          if (errorMessage !== error.message) {
            errorMessage = error.message;
          }
        }
      }

      this.setState({
        data: data,
        errorMessage: errorMessage
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cleanUpAngularPanel();

      if (this.querySubscription) {
        this.querySubscription.unsubscribe();
      }

      this.props.panel.events.off(_grafana_data__WEBPACK_IMPORTED_MODULE_8__["PanelEvents"].render, this.onPanelRenderEvent);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this$props = this.props,
          plugin = _this$props.plugin,
          height = _this$props.height,
          width = _this$props.width,
          panel = _this$props.panel;

      if (prevProps.plugin !== plugin) {
        this.cleanUpAngularPanel();
        this.loadAngularPanel();
      }

      if (prevProps.width !== width || prevProps.height !== height) {
        if (this.scopeProps) {
          this.scopeProps.size.height = this.getInnerPanelHeight();
          this.scopeProps.size.width = this.getInnerPanelWidth();
          panel.events.emit(_grafana_data__WEBPACK_IMPORTED_MODULE_8__["PanelEvents"].panelSizeChanged);
        }
      }
    }
  }, {
    key: "getInnerPanelHeight",
    value: function getInnerPanelHeight() {
      var _this$props2 = this.props,
          plugin = _this$props2.plugin,
          height = _this$props2.height;
      var theme = app_core_config__WEBPACK_IMPORTED_MODULE_7__["default"].theme;
      var headerHeight = this.hasOverlayHeader() ? 0 : theme.panelHeaderHeight;
      var chromePadding = plugin.noPadding ? 0 : theme.panelPadding;
      return height - headerHeight - chromePadding * 2 - app_core_constants__WEBPACK_IMPORTED_MODULE_10__["PANEL_BORDER"];
    }
  }, {
    key: "getInnerPanelWidth",
    value: function getInnerPanelWidth() {
      var _this$props3 = this.props,
          plugin = _this$props3.plugin,
          width = _this$props3.width;
      var theme = app_core_config__WEBPACK_IMPORTED_MODULE_7__["default"].theme;
      var chromePadding = plugin.noPadding ? 0 : theme.panelPadding;
      return width - chromePadding * 2 - app_core_constants__WEBPACK_IMPORTED_MODULE_10__["PANEL_BORDER"];
    }
  }, {
    key: "loadAngularPanel",
    value: function loadAngularPanel() {
      var _this$props4 = this.props,
          panel = _this$props4.panel,
          dashboard = _this$props4.dashboard,
          setPanelAngularComponent = _this$props4.setPanelAngularComponent; // if we have no element or already have loaded the panel return

      if (!this.element) {
        return;
      }

      var loader = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_5__["getAngularLoader"])();
      var template = '<plugin-component type="panel" class="panel-height-helper"></plugin-component>';
      this.scopeProps = {
        panel: panel,
        dashboard: dashboard,
        size: {
          width: this.getInnerPanelWidth(),
          height: this.getInnerPanelHeight()
        }
      };
      setPanelAngularComponent({
        panelId: panel.id,
        angularComponent: loader.load(this.element, this.scopeProps, template)
      }); // need to to this every time we load an angular as all events are unsubscribed when panel is destroyed

      this.subscribeToRenderEvent();
    }
  }, {
    key: "cleanUpAngularPanel",
    value: function cleanUpAngularPanel() {
      var _this$props5 = this.props,
          angularComponent = _this$props5.angularComponent,
          setPanelAngularComponent = _this$props5.setPanelAngularComponent,
          panel = _this$props5.panel;

      if (angularComponent) {
        angularComponent.destroy();
      }

      setPanelAngularComponent({
        panelId: panel.id,
        angularComponent: null
      });
    }
  }, {
    key: "hasOverlayHeader",
    value: function hasOverlayHeader() {
      var panel = this.props.panel;
      var _this$state = this.state,
          errorMessage = _this$state.errorMessage,
          data = _this$state.data; // always show normal header if we have an error message

      if (errorMessage) {
        return false;
      } // always show normal header if we have time override


      if (data.request && data.request.timeInfo) {
        return false;
      }

      return !panel.hasTitle();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props6 = this.props,
          dashboard = _this$props6.dashboard,
          panel = _this$props6.panel,
          isViewing = _this$props6.isViewing,
          isEditing = _this$props6.isEditing,
          plugin = _this$props6.plugin,
          angularComponent = _this$props6.angularComponent,
          updateLocation = _this$props6.updateLocation;
      var _this$state2 = this.state,
          errorMessage = _this$state2.errorMessage,
          data = _this$state2.data,
          alertState = _this$state2.alertState;
      var transparent = panel.transparent;
      var containerClassNames = classnames__WEBPACK_IMPORTED_MODULE_1___default()(_defineProperty({
        'panel-container': true,
        'panel-container--absolute': true,
        'panel-container--transparent': transparent,
        'panel-container--no-title': this.hasOverlayHeader(),
        'panel-has-alert': panel.alert !== undefined
      }, "panel-alert-state--".concat(alertState), alertState !== undefined));
      var panelContentClassNames = classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        'panel-content': true,
        'panel-content--no-padding': plugin.noPadding
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: containerClassNames,
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_11__["selectors"].components.Panels.Panel.containerByTitle(panel.title)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PanelHeader_PanelHeader__WEBPACK_IMPORTED_MODULE_3__["PanelHeader"], {
        panel: panel,
        dashboard: dashboard,
        title: panel.title,
        description: panel.description,
        scopedVars: panel.scopedVars,
        angularComponent: angularComponent,
        links: panel.links,
        error: errorMessage,
        isViewing: isViewing,
        isEditing: isEditing,
        data: data,
        updateLocation: updateLocation,
        alertState: alertState
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: panelContentClassNames
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        ref: function ref(element) {
          return _this3.element = element;
        },
        className: "panel-height-helper"
      })));
    }
  }]);

  return PanelChromeAngularUnconnected;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    angularComponent: state.dashboard.panels[props.panel.id].angularComponent
  };
};

var mapDispatchToProps = {
  setPanelAngularComponent: _state_reducers__WEBPACK_IMPORTED_MODULE_6__["setPanelAngularComponent"],
  updateLocation: app_core_actions__WEBPACK_IMPORTED_MODULE_9__["updateLocation"]
};
var PanelChromeAngular = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(PanelChromeAngularUnconnected);

/***/ }),

/***/ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeader.tsx":
/*!****************************************************************************!*\
  !*** ./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeader.tsx ***!
  \****************************************************************************/
/*! exports provided: PanelHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelHeader", function() { return PanelHeader; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
/* harmony import */ var _PanelHeaderCorner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PanelHeaderCorner */ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderCorner.tsx");
/* harmony import */ var _PanelHeaderMenu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PanelHeaderMenu */ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderMenu.tsx");
/* harmony import */ var app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/features/templating/template_srv */ "./public/app/features/templating/template_srv.ts");
/* harmony import */ var app_features_panel_panellinks_linkSuppliers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/features/panel/panellinks/linkSuppliers */ "./public/app/features/panel/panellinks/linkSuppliers.ts");
/* harmony import */ var app_features_dashboard_utils_getPanelMenu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/features/dashboard/utils/getPanelMenu */ "./public/app/features/dashboard/utils/getPanelMenu.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }












var PanelHeader =
/*#__PURE__*/
function (_Component) {
  _inherits(PanelHeader, _Component);

  function PanelHeader() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PanelHeader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PanelHeader)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.clickCoordinates = {
      x: 0,
      y: 0
    };
    _this.state = {
      panelMenuOpen: false,
      menuItems: []
    };

    _this.eventToClickCoordinates = function (event) {
      return {
        x: event.clientX,
        y: event.clientY
      };
    };

    _this.onMouseDown = function (event) {
      _this.clickCoordinates = _this.eventToClickCoordinates(event);
    };

    _this.isClick = function (clickCoordinates) {
      return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["isEqual"])(clickCoordinates, _this.clickCoordinates);
    };

    _this.onMenuToggle = function (event) {
      if (!_this.isClick(_this.eventToClickCoordinates(event))) {
        return;
      }

      event.stopPropagation();
      var _this$props = _this.props,
          dashboard = _this$props.dashboard,
          panel = _this$props.panel,
          angularComponent = _this$props.angularComponent;
      var menuItems = Object(app_features_dashboard_utils_getPanelMenu__WEBPACK_IMPORTED_MODULE_10__["getPanelMenu"])(dashboard, panel, angularComponent);

      _this.setState({
        panelMenuOpen: !_this.state.panelMenuOpen,
        menuItems: menuItems
      });
    };

    _this.closeMenu = function () {
      _this.setState({
        panelMenuOpen: false
      });
    };

    _this.onCancelQuery = function () {
      _this.props.panel.getQueryRunner().cancelQuery();
    };

    _this.openInspect = function (e, tab) {
      var _this$props2 = _this.props,
          updateLocation = _this$props2.updateLocation,
          panel = _this$props2.panel;
      e.stopPropagation();
      updateLocation({
        query: {
          inspect: panel.id,
          inspectTab: tab
        },
        partial: true
      });
    };

    _this.renderNotice = function (notice) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], {
        content: notice.text,
        key: notice.severity
      }, notice.inspect ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-info-notice pointer",
        onClick: function onClick(e) {
          return _this.openInspect(e, notice.inspect);
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Icon"], {
        name: "info-circle",
        style: {
          marginRight: '8px'
        }
      })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "panel-info-notice",
        href: notice.link,
        target: "_blank"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Icon"], {
        name: "info-circle",
        style: {
          marginRight: '8px'
        }
      })));
    };

    return _this;
  }

  _createClass(PanelHeader, [{
    key: "renderLoadingState",
    value: function renderLoadingState() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-loading",
        onClick: this.onCancelQuery
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], {
        content: "\u53D6\u6D88\u67E5\u8BE2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Icon"], {
        className: "panel-loading__spinner spin-clockwise",
        name: "sync"
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          panel = _this$props3.panel,
          scopedVars = _this$props3.scopedVars,
          error = _this$props3.error,
          isViewing = _this$props3.isViewing,
          isEditing = _this$props3.isEditing,
          data = _this$props3.data,
          alertState = _this$props3.alertState;
      var menuItems = this.state.menuItems;
      var title = app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_8__["default"].replace(panel.title, scopedVars, 'text');
      var panelHeaderClass = classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        'panel-header': true,
        'grid-drag-handle': !(isViewing || isEditing)
      }); // dedupe on severity

      var notices = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data.series[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var series = _step.value;

          if (series.meta && series.meta.notices) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = series.meta.notices[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var notice = _step2.value;
                notices[notice.severity] = notice;
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
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

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, data.state === _grafana_data__WEBPACK_IMPORTED_MODULE_3__["LoadingState"].Loading && this.renderLoadingState(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: panelHeaderClass
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PanelHeaderCorner__WEBPACK_IMPORTED_MODULE_6__["default"], {
        panel: panel,
        title: panel.title,
        description: panel.description,
        scopedVars: panel.scopedVars,
        links: Object(app_features_panel_panellinks_linkSuppliers__WEBPACK_IMPORTED_MODULE_9__["getPanelLinksSupplier"])(panel),
        error: error
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-title-container",
        onClick: this.onMenuToggle,
        onMouseDown: this.onMouseDown,
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_5__["selectors"].components.Panels.Panel.title(title)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-title"
      }, Object.values(notices).map(this.renderNotice), alertState && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Icon"], {
        name: alertState === 'alerting' ? 'heart-break' : 'heart',
        className: "icon-gf panel-alert-icon",
        style: {
          marginRight: '4px'
        },
        size: "sm"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "panel-title-text"
      }, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Icon"], {
        name: "angle-down",
        className: "panel-menu-toggle"
      }), this.state.panelMenuOpen && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["ClickOutsideWrapper"], {
        onClick: this.closeMenu,
        parent: document
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PanelHeaderMenu__WEBPACK_IMPORTED_MODULE_7__["PanelHeaderMenu"], {
        items: menuItems
      })), data.request && data.request.timeInfo && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "panel-time-info"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Icon"], {
        name: "clock-nine",
        size: "sm"
      }), " ", data.request.timeInfo)))));
    }
  }]);

  return PanelHeader;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/***/ }),

/***/ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderCorner.tsx":
/*!**********************************************************************************!*\
  !*** ./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderCorner.tsx ***!
  \**********************************************************************************/
/*! exports provided: PanelHeaderCorner, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelHeaderCorner", function() { return PanelHeaderCorner; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/features/templating/template_srv */ "./public/app/features/templating/template_srv.ts");
/* harmony import */ var app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/features/dashboard/services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");
/* harmony import */ var _components_Inspector_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Inspector/types */ "./public/app/features/dashboard/components/Inspector/types.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var InfoMode;

(function (InfoMode) {
  InfoMode["Error"] = "Error";
  InfoMode["Info"] = "Info";
  InfoMode["Links"] = "Links";
})(InfoMode || (InfoMode = {}));

var PanelHeaderCorner =
/*#__PURE__*/
function (_Component) {
  _inherits(PanelHeaderCorner, _Component);

  function PanelHeaderCorner() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PanelHeaderCorner);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PanelHeaderCorner)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.timeSrv = Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_5__["getTimeSrv"])();

    _this.getInfoMode = function () {
      var _this$props = _this.props,
          panel = _this$props.panel,
          error = _this$props.error;

      if (error) {
        return InfoMode.Error;
      }

      if (!!panel.description) {
        return InfoMode.Info;
      }

      if (panel.links && panel.links.length) {
        return InfoMode.Links;
      }

      return undefined;
    };

    _this.getInfoContent = function () {
      var panel = _this.props.panel;
      var markdown = panel.description || '';
      var interpolatedMarkdown = app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_4__["default"].replace(markdown, panel.scopedVars);
      var markedInterpolatedMarkdown = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["renderMarkdown"])(interpolatedMarkdown);

      var links = _this.props.links && _this.props.links.getLinks(panel);

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-info-content markdown-html"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: markedInterpolatedMarkdown
        }
      }), links && links.length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "panel-info-corner-links"
      }, links.map(function (link, idx) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: idx
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          className: "panel-info-corner-links__item",
          href: link.href,
          target: link.target
        }, link.title));
      })));
    };

    _this.onClickError = function () {
      Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_3__["getLocationSrv"])().update({
        partial: true,
        query: {
          inspect: _this.props.panel.id,
          inspectTab: _components_Inspector_types__WEBPACK_IMPORTED_MODULE_6__["InspectTab"].Error
        }
      });
    };

    return _this;
  }

  _createClass(PanelHeaderCorner, [{
    key: "renderCornerType",
    value: function renderCornerType(infoMode, content, onClick) {
      var theme = infoMode === InfoMode.Error ? 'error' : 'info';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], {
        content: content,
        placement: "top-start",
        theme: theme
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-info-corner panel-info-corner--".concat(infoMode.toLowerCase()),
        onClick: onClick
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "panel-info-corner-inner"
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var error = this.props.error;
      var infoMode = this.getInfoMode();

      if (!infoMode) {
        return null;
      }

      if (infoMode === InfoMode.Error && error) {
        return this.renderCornerType(infoMode, error, this.onClickError);
      }

      if (infoMode === InfoMode.Info || infoMode === InfoMode.Links) {
        return this.renderCornerType(infoMode, this.getInfoContent);
      }

      return null;
    }
  }]);

  return PanelHeaderCorner;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
/* harmony default export */ __webpack_exports__["default"] = (PanelHeaderCorner);

/***/ }),

/***/ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderMenu.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderMenu.tsx ***!
  \********************************************************************************/
/*! exports provided: PanelHeaderMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelHeaderMenu", function() { return PanelHeaderMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PanelHeaderMenuItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PanelHeaderMenuItem */ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderMenuItem.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var PanelHeaderMenu =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PanelHeaderMenu, _PureComponent);

  function PanelHeaderMenu() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PanelHeaderMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PanelHeaderMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.renderItems = function (menu) {
      var isSubMenu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "dropdown-menu dropdown-menu--menu panel-menu",
        role: isSubMenu ? '' : 'menu'
      }, menu.map(function (menuItem, idx) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PanelHeaderMenuItem__WEBPACK_IMPORTED_MODULE_1__["PanelHeaderMenuItem"], {
          key: "".concat(menuItem.text).concat(idx),
          type: menuItem.type,
          text: menuItem.text,
          iconClassName: menuItem.iconClassName,
          onClick: menuItem.onClick,
          shortcut: menuItem.shortcut
        }, menuItem.subMenu && _this.renderItems(menuItem.subMenu, true));
      }));
    };

    return _this;
  }

  _createClass(PanelHeaderMenu, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-menu-container dropdown open"
      }, this.renderItems(this.props.items));
    }
  }]);

  return PanelHeaderMenu;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/***/ }),

/***/ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderMenuItem.tsx":
/*!************************************************************************************!*\
  !*** ./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderMenuItem.tsx ***!
  \************************************************************************************/
/*! exports provided: PanelHeaderMenuItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelHeaderMenuItem", function() { return PanelHeaderMenuItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    position: absolute;\n    top: 7px;\n    right: ", ";\n    color: ", ";\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    margin-right: ", ";\n    a::after {\n      display: none;\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var PanelHeaderMenuItem = function PanelHeaderMenuItem(props) {
  var isSubMenu = props.type === 'submenu';
  var isDivider = props.type === 'divider';
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["useTheme"])();
  var menuIconClassName = Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject(), theme.spacing.sm);
  var shortcutIconClassName = Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2(), theme.spacing.xs, theme.colors.textWeak);
  return isDivider ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "divider"
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: isSubMenu ? 'dropdown-submenu' : undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    onClick: props.onClick,
    href: props.href
  }, props.iconClassName && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
    name: props.iconClassName,
    className: menuIconClassName
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "dropdown-item-text",
    "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_3__["selectors"].components.Panels.Panel.headerItems(props.text)
  }, props.text, isSubMenu && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
    name: "angle-right",
    className: shortcutIconClassName
  })), props.shortcut && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "dropdown-menu-item-shortcut"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
    name: "keyboard",
    className: menuIconClassName
  }), " ", props.shortcut)), props.children);
};

/***/ }),

/***/ "./public/app/features/dashboard/state/initDashboard.ts":
/*!**************************************************************!*\
  !*** ./public/app/features/dashboard/state/initDashboard.ts ***!
  \**************************************************************/
/*! exports provided: initDashboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initDashboard", function() { return initDashboard; });
/* harmony import */ var app_core_copy_appNotification__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/copy/appNotification */ "./public/app/core/copy/appNotification.ts");
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reducers */ "./public/app/features/dashboard/state/reducers.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _DashboardModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DashboardModel */ "./public/app/features/dashboard/state/DashboardModel.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _variables_state_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../variables/state/actions */ "./public/app/features/variables/state/actions.ts");
/* harmony import */ var _analyticsProcessor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./analyticsProcessor */ "./public/app/features/dashboard/state/analyticsProcessor.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Services & Utils


// Actions

 // Types







function redirectToNewUrl(_x, _x2, _x3) {
  return _redirectToNewUrl.apply(this, arguments);
}

function _redirectToNewUrl() {
  _redirectToNewUrl = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(slug, dispatch, currentPath) {
    var res, newUrl, url;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_1__["backendSrv"].getDashboardBySlug(slug);

          case 2:
            res = _context2.sent;

            if (res) {
              newUrl = res.meta.url; // fix solo route urls

              if (currentPath.indexOf('dashboard-solo') !== -1) {
                newUrl = newUrl.replace('/d/', '/d-solo/');
              }

              url = _grafana_data__WEBPACK_IMPORTED_MODULE_6__["locationUtil"].stripBaseFromUrl(newUrl);
              dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_2__["updateLocation"])({
                path: url,
                partial: true,
                replace: true
              }));
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _redirectToNewUrl.apply(this, arguments);
}

function fetchDashboard(_x4, _x5, _x6) {
  return _fetchDashboard.apply(this, arguments);
}
/**
 * This action (or saga) does everything needed to bootstrap a dashboard & dashboard model.
 * First it handles the process of fetching the dashboard, correcting the url if required (causing redirects/url updates)
 *
 * This is used both for single dashboard & solo panel routes, home & new dashboard routes.
 *
 * Then it handles the initializing of the old angular services that the dashboard components & panels still depend on
 *
 */


function _fetchDashboard() {
  _fetchDashboard = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(args, dispatch, getState) {
    var dashDTO, newUrl, loaderSrv, _dashDTO, dashboardUrl, currentPath;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.t0 = args.routeInfo;
            _context3.next = _context3.t0 === app_types__WEBPACK_IMPORTED_MODULE_4__["DashboardRouteInfo"].Home ? 4 : _context3.t0 === app_types__WEBPACK_IMPORTED_MODULE_4__["DashboardRouteInfo"].Normal ? 15 : _context3.t0 === app_types__WEBPACK_IMPORTED_MODULE_4__["DashboardRouteInfo"].New ? 29 : 30;
            break;

          case 4:
            _context3.next = 6;
            return app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_1__["backendSrv"].get('/api/dashboards/home');

          case 6:
            dashDTO = _context3.sent;

            if (!dashDTO.redirectUri) {
              _context3.next = 11;
              break;
            }

            newUrl = _grafana_data__WEBPACK_IMPORTED_MODULE_6__["locationUtil"].stripBaseFromUrl(dashDTO.redirectUri);
            dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_2__["updateLocation"])({
              path: newUrl,
              replace: true
            }));
            return _context3.abrupt("return", null);

          case 11:
            // disable some actions on the default home dashboard
            dashDTO.meta.canSave = false;
            dashDTO.meta.canShare = false;
            dashDTO.meta.canStar = false;
            return _context3.abrupt("return", dashDTO);

          case 15:
            if (!(args.urlType === 'db')) {
              _context3.next = 18;
              break;
            }

            redirectToNewUrl(args.urlSlug, dispatch, getState().location.path);
            return _context3.abrupt("return", null);

          case 18:
            loaderSrv = args.$injector.get('dashboardLoaderSrv');
            _context3.next = 21;
            return loaderSrv.loadDashboard(args.urlType, args.urlSlug, args.urlUid);

          case 21:
            _dashDTO = _context3.sent;

            if (!(args.fixUrl && _dashDTO.meta.url)) {
              _context3.next = 28;
              break;
            }

            // check if the current url is correct (might be old slug)
            dashboardUrl = _grafana_data__WEBPACK_IMPORTED_MODULE_6__["locationUtil"].stripBaseFromUrl(_dashDTO.meta.url);
            currentPath = getState().location.path;

            if (!(dashboardUrl !== currentPath)) {
              _context3.next = 28;
              break;
            }

            // replace url to not create additional history items and then return so that initDashboard below isn't executed multiple times.
            dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_2__["updateLocation"])({
              path: dashboardUrl,
              partial: true,
              replace: true
            }));
            return _context3.abrupt("return", null);

          case 28:
            return _context3.abrupt("return", _dashDTO);

          case 29:
            return _context3.abrupt("return", getNewDashboardModelData(args.urlFolderId));

          case 30:
            throw {
              message: '未知路由 ' + args.routeInfo
            };

          case 31:
            _context3.next = 40;
            break;

          case 33:
            _context3.prev = 33;
            _context3.t1 = _context3["catch"](0);

            if (!_context3.t1.cancelled) {
              _context3.next = 37;
              break;
            }

            return _context3.abrupt("return", null);

          case 37:
            dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_3__["dashboardInitFailed"])({
              message: '未能获取仪表板',
              error: _context3.t1
            }));
            console.error(_context3.t1);
            return _context3.abrupt("return", null);

          case 40:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 33]]);
  }));
  return _fetchDashboard.apply(this, arguments);
}

function initDashboard(args) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dispatch, getState) {
        var dashDTO, dashboard, storeState, timeSrv, annotationsSrv, keybindingSrv, unsavedChangesSrv, dashboardSrv, _storeState$dashboard, panelId, queries, queryParams, _storeState$dashboard2, _panelId, _queries;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // set fetching state
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_3__["dashboardInitFetching"])()); // Detect slow loading / initializing and set state flag
                // This is in order to not show loading indication for fast loading dashboards as it creates blinking/flashing

                setTimeout(function () {
                  if (getState().dashboard.getModel() === null) {
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_3__["dashboardInitSlow"])());
                  }
                }, 500); // fetch dashboard data

                _context.next = 4;
                return fetchDashboard(args, dispatch, getState);

              case 4:
                dashDTO = _context.sent;

                if (dashDTO) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return");

              case 7:
                // set initializing state
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_3__["dashboardInitServices"])()); // create model

                _context.prev = 8;
                dashboard = new _DashboardModel__WEBPACK_IMPORTED_MODULE_5__["DashboardModel"](dashDTO.dashboard, dashDTO.meta);
                _context.next = 17;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](8);
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_3__["dashboardInitFailed"])({
                  message: '创建仪表板模型失败',
                  error: _context.t0
                }));
                console.error(_context.t0);
                return _context.abrupt("return");

              case 17:
                // add missing orgId query param
                storeState = getState();

                if (!storeState.location.query.orgId) {
                  dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_2__["updateLocation"])({
                    query: {
                      orgId: storeState.user.orgId
                    },
                    partial: true,
                    replace: true
                  }));
                } // init services


                timeSrv = args.$injector.get('timeSrv');
                annotationsSrv = args.$injector.get('annotationsSrv');
                keybindingSrv = args.$injector.get('keybindingSrv');
                unsavedChangesSrv = args.$injector.get('unsavedChangesSrv');
                dashboardSrv = args.$injector.get('dashboardSrv');
                timeSrv.init(dashboard);
                annotationsSrv.init(dashboard);

                if (storeState.dashboard.modifiedQueries) {
                  _storeState$dashboard = storeState.dashboard.modifiedQueries, panelId = _storeState$dashboard.panelId, queries = _storeState$dashboard.queries;
                  dashboard.meta.fromExplore = !!(panelId && queries);
                } // template values service needs to initialize completely before the rest of the dashboard can load


                _context.next = 29;
                return dispatch(Object(_variables_state_actions__WEBPACK_IMPORTED_MODULE_7__["initVariablesTransaction"])(args.urlUid, dashboard));

              case 29:
                if (!(getState().templating.transaction.uid !== args.urlUid)) {
                  _context.next = 31;
                  break;
                }

                return _context.abrupt("return");

              case 31:
                if (!(getState().dashboard.initPhase !== app_types__WEBPACK_IMPORTED_MODULE_4__["DashboardInitPhase"].Services)) {
                  _context.next = 33;
                  break;
                }

                return _context.abrupt("return");

              case 33:
                try {
                  dashboard.processRepeats();
                  dashboard.updateSubmenuVisibility(); // handle auto fix experimental feature

                  queryParams = getState().location.query;

                  if (queryParams.autofitpanels) {
                    dashboard.autoFitPanels(window.innerHeight, queryParams.kiosk);
                  } // init unsaved changes tracking


                  unsavedChangesSrv.init(dashboard, args.$scope);
                  keybindingSrv.setupDashboardBindings(args.$scope, dashboard);
                } catch (err) {
                  dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_2__["notifyApp"])(Object(app_core_copy_appNotification__WEBPACK_IMPORTED_MODULE_0__["createErrorNotification"])('仪表板初始化失败', err)));
                  console.error(err);
                }

                if (storeState.dashboard.modifiedQueries) {
                  _storeState$dashboard2 = storeState.dashboard.modifiedQueries, _panelId = _storeState$dashboard2.panelId, _queries = _storeState$dashboard2.queries;
                  updateQueriesWhenComingFromExplore(dispatch, dashboard, _panelId, _queries);
                } // legacy srv state


                dashboardSrv.setCurrent(dashboard); // send open dashboard event

                if (args.routeInfo !== app_types__WEBPACK_IMPORTED_MODULE_4__["DashboardRouteInfo"].New) {
                  Object(_analyticsProcessor__WEBPACK_IMPORTED_MODULE_8__["emitDashboardViewEvent"])(dashboard);
                } // yay we are done


                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_3__["dashboardInitCompleted"])(dashboard));

              case 38:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[8, 12]]);
      }));

      return function (_x7, _x8) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}

function getNewDashboardModelData(urlFolderId) {
  var data = {
    meta: {
      canStar: false,
      canShare: false,
      isNew: true,
      folderId: 0
    },
    dashboard: {
      title: '新建仪表板',
      panels: [{
        type: 'add-panel',
        gridPos: {
          x: 0,
          y: 0,
          w: 12,
          h: 9
        },
        title: '面板标题'
      }]
    }
  };

  if (urlFolderId) {
    data.meta.folderId = parseInt(urlFolderId, 10);
  }

  return data;
}

function updateQueriesWhenComingFromExplore(dispatch, dashboard, originPanelId, queries) {
  var panelArrId = dashboard.panels.findIndex(function (panel) {
    return panel.id === originPanelId;
  });

  if (panelArrId > -1) {
    dashboard.panels[panelArrId].targets = queries;
  } // Clear update state now that we're done


  dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_3__["clearDashboardQueriesToUpdateOnLoad"])());
}

/***/ }),

/***/ "./public/app/features/dashboard/utils/getPanelMenu.ts":
/*!*************************************************************!*\
  !*** ./public/app/features/dashboard/utils/getPanelMenu.ts ***!
  \*************************************************************/
/*! exports provided: getPanelMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPanelMenu", function() { return getPanelMenu; });
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var app_store_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/store/store */ "./public/app/store/store.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_features_dashboard_utils_panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/features/dashboard/utils/panel */ "./public/app/features/dashboard/utils/panel.ts");
/* harmony import */ var _core_services_context_srv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/services/context_srv */ "./public/app/core/services/context_srv.ts");
/* harmony import */ var _explore_state_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../explore/state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var _core_utils_explore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var _services_TimeSrv__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");









function getPanelMenu(dashboard, panel, angularComponent) {
  var onViewPanel = function onViewPanel(event) {
    event.preventDefault();
    app_store_store__WEBPACK_IMPORTED_MODULE_1__["store"].dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_0__["updateLocation"])({
      query: {
        viewPanel: panel.id
      },
      partial: true
    }));
  };

  var onEditPanel = function onEditPanel(event) {
    event.preventDefault();
    app_store_store__WEBPACK_IMPORTED_MODULE_1__["store"].dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_0__["updateLocation"])({
      query: {
        editPanel: panel.id
      },
      partial: true
    }));
  };

  var onSharePanel = function onSharePanel(event) {
    event.preventDefault();
    Object(app_features_dashboard_utils_panel__WEBPACK_IMPORTED_MODULE_3__["sharePanel"])(dashboard, panel);
  };

  var onInspectPanel = function onInspectPanel(tab) {
    Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getLocationSrv"])().update({
      partial: true,
      query: {
        inspect: panel.id,
        inspectTab: tab
      }
    });
  };

  var onMore = function onMore(event) {
    event.preventDefault();
  };

  var onDuplicatePanel = function onDuplicatePanel(event) {
    event.preventDefault();
    Object(app_features_dashboard_utils_panel__WEBPACK_IMPORTED_MODULE_3__["duplicatePanel"])(dashboard, panel);
  };

  var onCopyPanel = function onCopyPanel(event) {
    event.preventDefault();
    Object(app_features_dashboard_utils_panel__WEBPACK_IMPORTED_MODULE_3__["copyPanel"])(panel);
  };

  var onRemovePanel = function onRemovePanel(event) {
    event.preventDefault();
    Object(app_features_dashboard_utils_panel__WEBPACK_IMPORTED_MODULE_3__["removePanel"])(dashboard, panel, true);
  };

  var onNavigateToExplore = function onNavigateToExplore(event) {
    event.preventDefault();
    var openInNewWindow = event.ctrlKey || event.metaKey ? function (url) {
      return window.open("".concat(app_core_config__WEBPACK_IMPORTED_MODULE_8__["default"].appSubUrl).concat(url));
    } : undefined;
    app_store_store__WEBPACK_IMPORTED_MODULE_1__["store"].dispatch(Object(_explore_state_actions__WEBPACK_IMPORTED_MODULE_5__["navigateToExplore"])(panel, {
      getDataSourceSrv: _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getDataSourceSrv"],
      getTimeSrv: _services_TimeSrv__WEBPACK_IMPORTED_MODULE_7__["getTimeSrv"],
      getExploreUrl: _core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["getExploreUrl"],
      openInNewWindow: openInNewWindow
    }));
  };

  var menu = [];

  if (!panel.isEditing) {
    menu.push({
      text: '查看',
      iconClassName: 'eye',
      onClick: onViewPanel,
      shortcut: 'v'
    });
  }

  if (dashboard.canEditPanel(panel) && !panel.isEditing) {
    menu.push({
      text: '编辑',
      iconClassName: 'edit',
      onClick: onEditPanel,
      shortcut: 'e'
    });
  }

  menu.push({
    text: '分享',
    iconClassName: 'share-alt',
    onClick: onSharePanel,
    shortcut: 'p s'
  });

  if (_core_services_context_srv__WEBPACK_IMPORTED_MODULE_4__["contextSrv"].hasAccessToExplore() && !(panel.plugin && panel.plugin.meta.skipDataQuery)) {
    menu.push({
      text: '查询',
      iconClassName: 'compass',
      shortcut: 'x',
      onClick: onNavigateToExplore
    });
  }

  var inspectMenu = []; // Only show these inspect actions for data plugins

  if (panel.plugin && !panel.plugin.meta.skipDataQuery) {
    inspectMenu.push({
      text: '数据',
      onClick: function onClick(e) {
        return onInspectPanel('data');
      }
    });

    if (dashboard.meta.canEdit) {
      inspectMenu.push({
        text: '查询',
        onClick: function onClick(e) {
          return onInspectPanel('query');
        }
      });
    }
  }

  inspectMenu.push({
    text: '面板Json',
    onClick: function onClick(e) {
      return onInspectPanel('json');
    }
  });
  menu.push({
    type: 'submenu',
    text: '检查',
    iconClassName: 'info-circle',
    onClick: function onClick(e) {
      return onInspectPanel();
    },
    shortcut: 'i',
    subMenu: inspectMenu
  });
  var subMenu = [];

  if (dashboard.canEditPanel(panel) && !(panel.isViewing || panel.isEditing)) {
    subMenu.push({
      text: '复制',
      onClick: onDuplicatePanel,
      shortcut: 'p d'
    });
    subMenu.push({
      text: '拷贝',
      onClick: onCopyPanel
    });
  } // add old angular panel options


  if (angularComponent) {
    (function () {
      var scope = angularComponent.getScope();
      var panelCtrl = scope.$$childHead.ctrl;
      var angularMenuItems = panelCtrl.getExtendedMenu();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var item = _step.value;
          var reactItem = {
            text: item.text,
            href: item.href,
            shortcut: item.shortcut
          };

          if (item.click) {
            reactItem.onClick = function () {
              scope.$eval(item.click, {
                ctrl: panelCtrl
              });
            };
          }

          subMenu.push(reactItem);
        };

        for (var _iterator = angularMenuItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
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
    })();
  }

  if (!panel.isEditing && subMenu.length) {
    menu.push({
      type: 'submenu',
      text: '更多...',
      iconClassName: 'cube',
      subMenu: subMenu,
      onClick: onMore
    });
  }

  if (dashboard.canEditPanel(panel) && !panel.isEditing) {
    menu.push({
      type: 'divider',
      text: ''
    });
    menu.push({
      text: '移除',
      iconClassName: 'trash-alt',
      onClick: onRemovePanel,
      shortcut: 'p r'
    });
  }

  return menu;
}

/***/ })

}]);
//# sourceMappingURL=default~DashboardPage~SoloPanelPage.1ebdc265fc3bd7452fcd.js.map