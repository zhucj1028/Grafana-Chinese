(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["mssqlPlugin"],{

/***/ "./public/app/features/datasources/utils/passwordHandlers.ts":
/*!*******************************************************************!*\
  !*** ./public/app/features/datasources/utils/passwordHandlers.ts ***!
  \*******************************************************************/
/*! exports provided: PasswordFieldEnum, createResetHandler, createChangeHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordFieldEnum", function() { return PasswordFieldEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createResetHandler", function() { return createResetHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createChangeHandler", function() { return createChangeHandler; });
/**
 * Set of handlers for secure password field in Angular components. They handle backward compatibility with
 * passwords stored in plain text fields.
 */
var PasswordFieldEnum;
/**
 * Basic shape for settings controllers in at the moment mostly angular datasource plugins.
 */

(function (PasswordFieldEnum) {
  PasswordFieldEnum["Password"] = "password";
  PasswordFieldEnum["BasicAuthPassword"] = "basicAuthPassword";
})(PasswordFieldEnum || (PasswordFieldEnum = {}));

var createResetHandler = function createResetHandler(ctrl, field) {
  return function (event) {
    event.preventDefault(); // Reset also normal plain text password to remove it and only save it in secureJsonData.

    ctrl.current[field] = undefined;
    ctrl.current.secureJsonFields[field] = false;
    ctrl.current.secureJsonData = ctrl.current.secureJsonData || {};
    ctrl.current.secureJsonData[field] = '';
  };
};
var createChangeHandler = function createChangeHandler(ctrl, field) {
  return function (event) {
    ctrl.current.secureJsonData = ctrl.current.secureJsonData || {};
    ctrl.current.secureJsonData[field] = event.currentTarget.value;
  };
};

/***/ }),

/***/ "./public/app/plugins/datasource/mssql/config_ctrl.ts":
/*!************************************************************!*\
  !*** ./public/app/plugins/datasource/mssql/config_ctrl.ts ***!
  \************************************************************/
/*! exports provided: MssqlConfigCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MssqlConfigCtrl", function() { return MssqlConfigCtrl; });
/* harmony import */ var _features_datasources_utils_passwordHandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../features/datasources/utils/passwordHandlers */ "./public/app/features/datasources/utils/passwordHandlers.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var MssqlConfigCtrl =
/** @ngInject */
function MssqlConfigCtrl($scope) {
  _classCallCheck(this, MssqlConfigCtrl);

  this.current.jsonData.encrypt = this.current.jsonData.encrypt || 'false';
  this.onPasswordReset = Object(_features_datasources_utils_passwordHandlers__WEBPACK_IMPORTED_MODULE_0__["createResetHandler"])(this, _features_datasources_utils_passwordHandlers__WEBPACK_IMPORTED_MODULE_0__["PasswordFieldEnum"].Password);
  this.onPasswordChange = Object(_features_datasources_utils_passwordHandlers__WEBPACK_IMPORTED_MODULE_0__["createChangeHandler"])(this, _features_datasources_utils_passwordHandlers__WEBPACK_IMPORTED_MODULE_0__["PasswordFieldEnum"].Password);
};
MssqlConfigCtrl.$inject = ["$scope"];
MssqlConfigCtrl.templateUrl = 'partials/config.html';

/***/ }),

/***/ "./public/app/plugins/datasource/mssql/datasource.ts":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/mssql/datasource.ts ***!
  \***********************************************************/
/*! exports provided: MssqlDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MssqlDatasource", function() { return MssqlDatasource; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _response_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./response_parser */ "./public/app/plugins/datasource/mssql/response_parser.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var MssqlDatasource =
/*#__PURE__*/
function () {
  MssqlDatasource.$inject = ["instanceSettings", "templateSrv", "timeSrv"];

  /** @ngInject */
  function MssqlDatasource(instanceSettings, templateSrv, timeSrv) {
    _classCallCheck(this, MssqlDatasource);

    this.templateSrv = templateSrv;
    this.timeSrv = timeSrv;
    this.name = instanceSettings.name;
    this.id = instanceSettings.id;
    this.responseParser = new _response_parser__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.interval = (instanceSettings.jsonData || {}).timeInterval || '1m';
  }

  _createClass(MssqlDatasource, [{
    key: "interpolateVariable",
    value: function interpolateVariable(value, variable) {
      if (typeof value === 'string') {
        if (variable.multi || variable.includeAll) {
          return "'" + value.replace(/'/g, "''") + "'";
        } else {
          return value;
        }
      }

      if (typeof value === 'number') {
        return value;
      }

      var quotedValues = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(value, function (val) {
        if (typeof value === 'number') {
          return value;
        }

        return "'" + val.replace(/'/g, "''") + "'";
      });

      return quotedValues.join(',');
    }
  }, {
    key: "interpolateVariablesInQueries",
    value: function interpolateVariablesInQueries(queries, scopedVars) {
      var _this = this;

      var expandedQueries = queries;

      if (queries && queries.length > 0) {
        expandedQueries = queries.map(function (query) {
          var expandedQuery = _objectSpread({}, query, {
            datasource: _this.name,
            rawSql: _this.templateSrv.replace(query.rawSql, scopedVars, _this.interpolateVariable),
            rawQuery: true
          });

          return expandedQuery;
        });
      }

      return expandedQueries;
    }
  }, {
    key: "query",
    value: function query(options) {
      var _this2 = this;

      var queries = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(options.targets, function (item) {
        return item.hide !== true;
      }).map(function (item) {
        return {
          refId: item.refId,
          intervalMs: options.intervalMs,
          maxDataPoints: options.maxDataPoints,
          datasourceId: _this2.id,
          rawSql: _this2.templateSrv.replace(item.rawSql, options.scopedVars, _this2.interpolateVariable),
          format: item.format
        };
      });

      if (queries.length === 0) {
        return Promise.resolve({
          data: []
        });
      }

      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().datasourceRequest({
        url: '/api/tsdb/query',
        method: 'POST',
        data: {
          from: options.range.from.valueOf().toString(),
          to: options.range.to.valueOf().toString(),
          queries: queries
        }
      }).then(this.responseParser.processQueryResult);
    }
  }, {
    key: "annotationQuery",
    value: function annotationQuery(options) {
      var _this3 = this;

      if (!options.annotation.rawQuery) {
        return Promise.reject({
          message: 'Query missing in annotation definition'
        });
      }

      var query = {
        refId: options.annotation.name,
        datasourceId: this.id,
        rawSql: this.templateSrv.replace(options.annotation.rawQuery, options.scopedVars, this.interpolateVariable),
        format: 'table'
      };
      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().datasourceRequest({
        url: '/api/tsdb/query',
        method: 'POST',
        data: {
          from: options.range.from.valueOf().toString(),
          to: options.range.to.valueOf().toString(),
          queries: [query]
        }
      }).then(function (data) {
        return _this3.responseParser.transformAnnotationResponse(options, data);
      });
    }
  }, {
    key: "metricFindQuery",
    value: function metricFindQuery(query, optionalOptions) {
      var _this4 = this;

      var refId = 'tempvar';

      if (optionalOptions && optionalOptions.variable && optionalOptions.variable.name) {
        refId = optionalOptions.variable.name;
      }

      var interpolatedQuery = {
        refId: refId,
        datasourceId: this.id,
        rawSql: this.templateSrv.replace(query, {}, this.interpolateVariable),
        format: 'table'
      };
      var range = this.timeSrv.timeRange();
      var data = {
        queries: [interpolatedQuery],
        from: range.from.valueOf().toString(),
        to: range.to.valueOf().toString()
      };
      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().datasourceRequest({
        url: '/api/tsdb/query',
        method: 'POST',
        data: data
      }).then(function (data) {
        return _this4.responseParser.parseMetricFindQueryResult(refId, data);
      });
    }
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().datasourceRequest({
        url: '/api/tsdb/query',
        method: 'POST',
        data: {
          from: '5m',
          to: 'now',
          queries: [{
            refId: 'A',
            intervalMs: 1,
            maxDataPoints: 1,
            datasourceId: this.id,
            rawSql: 'SELECT 1',
            format: 'table'
          }]
        }
      }).then(function (res) {
        return {
          status: 'success',
          message: 'Database Connection OK'
        };
      }).catch(function (err) {
        console.error(err);

        if (err.data && err.data.message) {
          return {
            status: 'error',
            message: err.data.message
          };
        } else {
          return {
            status: 'error',
            message: err.status
          };
        }
      });
    }
  }, {
    key: "targetContainsTemplate",
    value: function targetContainsTemplate(target) {
      var rawSql = target.rawSql.replace('$__', '');
      return this.templateSrv.variableExists(rawSql);
    }
  }]);

  return MssqlDatasource;
}();

/***/ }),

/***/ "./public/app/plugins/datasource/mssql/module.ts":
/*!*******************************************************!*\
  !*** ./public/app/plugins/datasource/mssql/module.ts ***!
  \*******************************************************/
/*! exports provided: MssqlDatasource, Datasource, QueryCtrl, ConfigCtrl, AnnotationsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationsQueryCtrl", function() { return MssqlAnnotationsQueryCtrl; });
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/mssql/datasource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MssqlDatasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_0__["MssqlDatasource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Datasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_0__["MssqlDatasource"]; });

/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_ctrl */ "./public/app/plugins/datasource/mssql/query_ctrl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryCtrl", function() { return _query_ctrl__WEBPACK_IMPORTED_MODULE_1__["MssqlQueryCtrl"]; });

/* harmony import */ var _config_ctrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config_ctrl */ "./public/app/plugins/datasource/mssql/config_ctrl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConfigCtrl", function() { return _config_ctrl__WEBPACK_IMPORTED_MODULE_2__["MssqlConfigCtrl"]; });

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var defaultQuery = "SELECT\n    <time_column> as time,\n    <text_column> as text,\n    <tags_column> as tags\n  FROM\n    <table name>\n  WHERE\n    $__timeFilter(time_column)\n  ORDER BY\n    <time_column> ASC";

var MssqlAnnotationsQueryCtrl =
/** @ngInject */
function MssqlAnnotationsQueryCtrl() {
  _classCallCheck(this, MssqlAnnotationsQueryCtrl);

  this.annotation.rawQuery = this.annotation.rawQuery || defaultQuery;
};

MssqlAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';


/***/ }),

/***/ "./public/app/plugins/datasource/mssql/query_ctrl.ts":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/mssql/query_ctrl.ts ***!
  \***********************************************************/
/*! exports provided: MssqlQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MssqlQueryCtrl", function() { return MssqlQueryCtrl; });
/* harmony import */ var app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/plugins/sdk */ "./public/app/plugins/sdk.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var defaultQuery = "SELECT\n  $__timeEpoch(<time_column>),\n  <value column> as value,\n  <series name column> as metric\nFROM\n  <table name>\nWHERE\n  $__timeFilter(time_column)\nORDER BY\n  <time_column> ASC";
var MssqlQueryCtrl =
/*#__PURE__*/
function (_QueryCtrl) {
  MssqlQueryCtrl.$inject = ["$scope", "$injector"];

  _inherits(MssqlQueryCtrl, _QueryCtrl);

  /** @ngInject */
  function MssqlQueryCtrl($scope, $injector) {
    var _this;

    _classCallCheck(this, MssqlQueryCtrl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MssqlQueryCtrl).call(this, $scope, $injector));
    _this.target.format = _this.target.format || 'time_series';
    _this.target.alias = '';
    _this.formats = [{
      text: '时间序列',
      value: 'time_series'
    }, {
      text: '表格',
      value: 'table'
    }];

    if (!_this.target.rawSql) {
      // special handling when in table panel
      if (_this.panelCtrl.panel.type === 'table') {
        _this.target.format = 'table';
        _this.target.rawSql = 'SELECT 1';
      } else {
        _this.target.rawSql = defaultQuery;
      }
    }

    _this.panelCtrl.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["PanelEvents"].dataReceived, _this.onDataReceived.bind(_assertThisInitialized(_this)), $scope);

    _this.panelCtrl.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["PanelEvents"].dataError, _this.onDataError.bind(_assertThisInitialized(_this)), $scope);

    return _this;
  }

  _createClass(MssqlQueryCtrl, [{
    key: "showQueryInspector",
    value: function showQueryInspector() {
      Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getLocationSrv"])().update({
        query: {
          inspect: this.panel.id,
          inspectTab: 'query'
        },
        partial: true
      });
    }
  }, {
    key: "onDataReceived",
    value: function onDataReceived(dataList) {
      this.lastQueryError = null;
    }
  }, {
    key: "onDataError",
    value: function onDataError(err) {
      if (err.data && err.data.results) {
        var queryRes = err.data.results[this.target.refId];

        if (queryRes) {
          this.lastQueryError = queryRes.error;
        }
      }
    }
  }]);

  return MssqlQueryCtrl;
}(app_plugins_sdk__WEBPACK_IMPORTED_MODULE_0__["QueryCtrl"]);
MssqlQueryCtrl.templateUrl = 'partials/query.editor.html';

/***/ }),

/***/ "./public/app/plugins/datasource/mssql/response_parser.ts":
/*!****************************************************************!*\
  !*** ./public/app/plugins/datasource/mssql/response_parser.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ResponseParser; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var ResponseParser =
/*#__PURE__*/
function () {
  function ResponseParser() {
    _classCallCheck(this, ResponseParser);
  }

  _createClass(ResponseParser, [{
    key: "processQueryResult",
    value: function processQueryResult(res) {
      var data = [];

      if (!res.data.results) {
        return {
          data: data
        };
      }

      for (var key in res.data.results) {
        var queryRes = res.data.results[key];

        if (queryRes.series) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = queryRes.series[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var series = _step.value;
              data.push({
                target: series.name,
                datapoints: series.points,
                refId: queryRes.refId,
                meta: queryRes.meta
              });
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
        }

        if (queryRes.tables) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = queryRes.tables[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var table = _step2.value;
              table.type = 'table';
              table.refId = queryRes.refId;
              table.meta = queryRes.meta;
              data.push(table);
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

      return {
        data: data
      };
    }
  }, {
    key: "parseMetricFindQueryResult",
    value: function parseMetricFindQueryResult(refId, results) {
      if (!results || results.data.length === 0 || results.data.results[refId].meta.rowCount === 0) {
        return [];
      }

      var columns = results.data.results[refId].tables[0].columns;
      var rows = results.data.results[refId].tables[0].rows;
      var textColIndex = this.findColIndex(columns, '__text');
      var valueColIndex = this.findColIndex(columns, '__value');

      if (columns.length === 2 && textColIndex !== -1 && valueColIndex !== -1) {
        return this.transformToKeyValueList(rows, textColIndex, valueColIndex);
      }

      return this.transformToSimpleList(rows);
    }
  }, {
    key: "transformToKeyValueList",
    value: function transformToKeyValueList(rows, textColIndex, valueColIndex) {
      var res = [];

      for (var i = 0; i < rows.length; i++) {
        if (!this.containsKey(res, rows[i][textColIndex])) {
          res.push({
            text: rows[i][textColIndex],
            value: rows[i][valueColIndex]
          });
        }
      }

      return res;
    }
  }, {
    key: "transformToSimpleList",
    value: function transformToSimpleList(rows) {
      var res = [];

      for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[i].length; j++) {
          var value = rows[i][j];

          if (res.indexOf(value) === -1) {
            res.push(value);
          }
        }
      }

      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(res, function (value) {
        return {
          text: value
        };
      });
    }
  }, {
    key: "findColIndex",
    value: function findColIndex(columns, colName) {
      for (var i = 0; i < columns.length; i++) {
        if (columns[i].text === colName) {
          return i;
        }
      }

      return -1;
    }
  }, {
    key: "containsKey",
    value: function containsKey(res, key) {
      for (var i = 0; i < res.length; i++) {
        if (res[i].text === key) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "transformAnnotationResponse",
    value: function transformAnnotationResponse(options, data) {
      var table = data.data.results[options.annotation.name].tables[0];
      var timeColumnIndex = -1;
      var timeEndColumnIndex = -1;
      var textColumnIndex = -1;
      var tagsColumnIndex = -1;

      for (var i = 0; i < table.columns.length; i++) {
        if (table.columns[i].text === 'time') {
          timeColumnIndex = i;
        } else if (table.columns[i].text === 'timeend') {
          timeEndColumnIndex = i;
        } else if (table.columns[i].text === 'text') {
          textColumnIndex = i;
        } else if (table.columns[i].text === 'tags') {
          tagsColumnIndex = i;
        }
      }

      if (timeColumnIndex === -1) {
        return Promise.reject({
          message: 'Missing mandatory time column (with time column alias) in annotation query.'
        });
      }

      var list = [];

      for (var _i = 0; _i < table.rows.length; _i++) {
        var row = table.rows[_i];
        var timeEnd = timeEndColumnIndex !== -1 && row[timeEndColumnIndex] ? Math.floor(row[timeEndColumnIndex]) : undefined;
        list.push({
          annotation: options.annotation,
          time: Math.floor(row[timeColumnIndex]),
          timeEnd: timeEnd,
          text: row[textColumnIndex],
          tags: row[tagsColumnIndex] ? row[tagsColumnIndex].trim().split(/\s*,\s*/) : []
        });
      }

      return list;
    }
  }]);

  return ResponseParser;
}();



/***/ })

}]);
//# sourceMappingURL=mssqlPlugin.1ebdc265fc3bd7452fcd.js.map