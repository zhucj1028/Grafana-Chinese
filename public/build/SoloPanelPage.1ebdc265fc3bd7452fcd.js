(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["SoloPanelPage"],{

/***/ "./public/app/features/dashboard/containers/SoloPanelPage.tsx":
/*!********************************************************************!*\
  !*** ./public/app/features/dashboard/containers/SoloPanelPage.tsx ***!
  \********************************************************************/
/*! exports provided: SoloPanelPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoloPanelPage", function() { return SoloPanelPage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _dashgrid_DashboardPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dashgrid/DashboardPanel */ "./public/app/features/dashboard/dashgrid/DashboardPanel.tsx");
/* harmony import */ var _state_initDashboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../state/initDashboard */ "./public/app/features/dashboard/state/initDashboard.ts");
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

 // Redux

 // Types

var SoloPanelPage =
/*#__PURE__*/
function (_Component) {
  _inherits(SoloPanelPage, _Component);

  function SoloPanelPage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SoloPanelPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SoloPanelPage)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      panel: null,
      notFound: false
    };
    return _this;
  }

  _createClass(SoloPanelPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          $injector = _this$props.$injector,
          $scope = _this$props.$scope,
          urlUid = _this$props.urlUid,
          urlType = _this$props.urlType,
          urlSlug = _this$props.urlSlug,
          routeInfo = _this$props.routeInfo;
      this.props.initDashboard({
        $injector: $injector,
        $scope: $scope,
        urlSlug: urlSlug,
        urlUid: urlUid,
        urlType: urlType,
        routeInfo: routeInfo,
        fixUrl: false
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
          urlPanelId = _this$props2.urlPanelId,
          dashboard = _this$props2.dashboard;

      if (!dashboard) {
        return;
      } // we just got the dashboard!


      if (!prevProps.dashboard) {
        var panelId = parseInt(urlPanelId, 10); // need to expand parent row if this panel is inside a row

        dashboard.expandParentRowFor(panelId);
        var panel = dashboard.getPanelById(panelId);

        if (!panel) {
          this.setState({
            notFound: true
          });
          return;
        }

        this.setState({
          panel: panel
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          urlPanelId = _this$props3.urlPanelId,
          dashboard = _this$props3.dashboard;
      var _this$state = this.state,
          notFound = _this$state.notFound,
          panel = _this$state.panel;

      if (notFound) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "alert alert-error"
        }, "\u627E\u4E0D\u5230ID\u4E3A ", urlPanelId, " \u7684\u9762\u677F");
      }

      if (!panel || !dashboard) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "\u52A0\u8F7D\u548C\u521D\u59CB\u5316\u4EEA\u8868\u677F");
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-solo"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dashgrid_DashboardPanel__WEBPACK_IMPORTED_MODULE_3__["DashboardPanel"], {
        dashboard: dashboard,
        panel: panel,
        isEditing: false,
        isViewing: false,
        isInView: true
      }));
    }
  }]);

  return SoloPanelPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    urlUid: state.location.routeParams.uid,
    urlSlug: state.location.routeParams.slug,
    urlType: state.location.routeParams.type,
    urlPanelId: state.location.query.panelId,
    dashboard: state.dashboard.getModel()
  };
};

var mapDispatchToProps = {
  initDashboard: _state_initDashboard__WEBPACK_IMPORTED_MODULE_4__["initDashboard"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(SoloPanelPage)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=SoloPanelPage.1ebdc265fc3bd7452fcd.js.map