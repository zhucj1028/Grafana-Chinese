(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["mixedPlugin"],{

/***/ "./public/app/plugins/datasource/mixed/MixedDataSource.ts":
/*!****************************************************************!*\
  !*** ./public/app/plugins/datasource/mixed/MixedDataSource.ts ***!
  \****************************************************************/
/*! exports provided: MIXED_DATASOURCE_NAME, MixedDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIXED_DATASOURCE_NAME", function() { return MIXED_DATASOURCE_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MixedDatasource", function() { return MixedDatasource; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_groupBy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/groupBy */ "./node_modules/lodash/groupBy.js");
/* harmony import */ var lodash_groupBy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_groupBy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
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







var MIXED_DATASOURCE_NAME = '-- Mixed --';
var MixedDatasource =
/*#__PURE__*/
function (_DataSourceApi) {
  _inherits(MixedDatasource, _DataSourceApi);

  function MixedDatasource(instanceSettings) {
    _classCallCheck(this, MixedDatasource);

    return _possibleConstructorReturn(this, _getPrototypeOf(MixedDatasource).call(this, instanceSettings));
  }

  _createClass(MixedDatasource, [{
    key: "query",
    value: function query(request) {
      // Remove any invalid queries
      var queries = request.targets.filter(function (t) {
        return t.datasource !== MIXED_DATASOURCE_NAME;
      });

      if (!queries.length) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({
          data: []
        }); // nothing
      } // Build groups of queries to run in parallel


      var sets = lodash_groupBy__WEBPACK_IMPORTED_MODULE_1___default()(queries, 'datasource');
      var mixed = [];

      for (var _key in sets) {
        var targets = sets[_key];
        var dsName = targets[0].datasource;
        mixed.push({
          datasource: Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_5__["getDataSourceSrv"])().get(dsName, request.scopedVars),
          targets: targets
        });
      }

      return this.batchQueries(mixed, request);
    }
  }, {
    key: "batchQueries",
    value: function batchQueries(mixed, request) {
      var runningQueries = mixed.filter(this.isQueryable).map(function (query, i) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(query.datasource).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mergeMap"])(function (api) {
          var dsRequest = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(request);
          dsRequest.requestId = "mixed-".concat(i, "-").concat(dsRequest.requestId || '');
          dsRequest.targets = query.targets;
          return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(api.query(dsRequest)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return _objectSpread({}, response, {
              data: response.data || [],
              state: _grafana_data__WEBPACK_IMPORTED_MODULE_4__["LoadingState"].Loading,
              key: "mixed-".concat(i, "-").concat(response.key || '')
            });
          }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) {
            err = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_5__["toDataQueryError"])(err);
            err.message = "".concat(api.name, ": ").concat(err.message);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({
              data: [],
              state: _grafana_data__WEBPACK_IMPORTED_MODULE_4__["LoadingState"].Error,
              error: err,
              key: "mixed-".concat(i, "-").concat(dsRequest.requestId || '')
            });
          }));
        }));
      });
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["forkJoin"])(runningQueries).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.finalizeResponses), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mergeAll"])());
    }
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      return Promise.resolve({});
    }
  }, {
    key: "isQueryable",
    value: function isQueryable(query) {
      return query && Array.isArray(query.targets) && query.targets.length > 0;
    }
  }, {
    key: "finalizeResponses",
    value: function finalizeResponses(responses) {
      var length = responses.length;

      if (length === 0) {
        return responses;
      }

      var error = responses.find(function (response) {
        return response.state === _grafana_data__WEBPACK_IMPORTED_MODULE_4__["LoadingState"].Error;
      });

      if (error) {
        responses.push(error); // adds the first found error entry so error shows up in the panel
      } else {
        responses[length - 1].state = _grafana_data__WEBPACK_IMPORTED_MODULE_4__["LoadingState"].Done;
      }

      return responses;
    }
  }]);

  return MixedDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["DataSourceApi"]);

/***/ }),

/***/ "./public/app/plugins/datasource/mixed/module.ts":
/*!*******************************************************!*\
  !*** ./public/app/plugins/datasource/mixed/module.ts ***!
  \*******************************************************/
/*! exports provided: MixedDatasource, Datasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MixedDataSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MixedDataSource */ "./public/app/plugins/datasource/mixed/MixedDataSource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MixedDatasource", function() { return _MixedDataSource__WEBPACK_IMPORTED_MODULE_0__["MixedDatasource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Datasource", function() { return _MixedDataSource__WEBPACK_IMPORTED_MODULE_0__["MixedDatasource"]; });




/***/ })

}]);
//# sourceMappingURL=mixedPlugin.1ebdc265fc3bd7452fcd.js.map