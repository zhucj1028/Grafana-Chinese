(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./public/app/plugins/datasource/dashboard/datasource.ts":
/*!***************************************************************!*\
  !*** ./public/app/plugins/datasource/dashboard/datasource.ts ***!
  \***************************************************************/
/*! exports provided: DashboardDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardDatasource", function() { return DashboardDatasource; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



/**
 * This should not really be called
 */
var DashboardDatasource =
/*#__PURE__*/
function (_DataSourceApi) {
  _inherits(DashboardDatasource, _DataSourceApi);

  function DashboardDatasource(instanceSettings) {
    _classCallCheck(this, DashboardDatasource);

    return _possibleConstructorReturn(this, _getPrototypeOf(DashboardDatasource).call(this, instanceSettings));
  }

  _createClass(DashboardDatasource, [{
    key: "getCollapsedText",
    value: function getCollapsedText(query) {
      return "Dashboard Reference: ".concat(query.panelId);
    }
  }, {
    key: "query",
    value: function query(options) {
      return Promise.reject('This should not be called directly');
    }
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      return Promise.resolve({});
    }
  }]);

  return DashboardDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourceApi"]);

/***/ }),

/***/ "./public/app/plugins/datasource/dashboard/module.ts":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/dashboard/module.ts ***!
  \***********************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/dashboard/datasource.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");


var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_0__["DashboardDatasource"]);

/***/ })

}]);
//# sourceMappingURL=4.1ebdc265fc3bd7452fcd.js.map