(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["mysqlPlugin"],{

/***/ "./public/app/core/components/sql_part/sql_part.ts":
/*!*********************************************************!*\
  !*** ./public/app/core/components/sql_part/sql_part.ts ***!
  \*********************************************************/
/*! exports provided: SqlPartDef, SqlPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SqlPartDef", function() { return SqlPartDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SqlPart", function() { return SqlPart; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var SqlPartDef = function SqlPartDef(options) {
  _classCallCheck(this, SqlPartDef);

  this.type = options.type;

  if (options.label) {
    this.label = options.label;
  } else {
    this.label = this.type[0].toUpperCase() + this.type.substring(1) + ':';
  }

  this.style = options.style;

  if (this.style === 'function') {
    this.wrapOpen = '(';
    this.wrapClose = ')';
    this.separator = ', ';
  } else {
    this.wrapOpen = ' ';
    this.wrapClose = ' ';
    this.separator = ' ';
  }

  this.params = options.params;
  this.defaultParams = options.defaultParams;
};
var SqlPart =
/*#__PURE__*/
function () {
  function SqlPart(part, def) {
    _classCallCheck(this, SqlPart);

    this.part = part;
    this.def = def;

    if (!this.def) {
      throw {
        message: '找不到SQL部分 ' + part.type
      };
    }

    this.datatype = part.datatype;

    if (part.name) {
      this.name = part.name;
      this.label = def.label + ' ' + part.name;
    } else {
      this.name = '';
      this.label = def.label;
    }

    part.params = part.params || lodash__WEBPACK_IMPORTED_MODULE_0___default.a.clone(this.def.defaultParams);
    this.params = part.params;
  }

  _createClass(SqlPart, [{
    key: "updateParam",
    value: function updateParam(strValue, index) {
      // handle optional parameters
      if (strValue === '' && this.def.params[index].optional) {
        this.params.splice(index, 1);
      } else {
        this.params[index] = strValue;
      }

      this.part.params = this.params;
    }
  }]);

  return SqlPart;
}();

/***/ }),

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

/***/ "./public/app/plugins/datasource/mysql/datasource.ts":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/mysql/datasource.ts ***!
  \***********************************************************/
/*! exports provided: MysqlDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MysqlDatasource", function() { return MysqlDatasource; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _response_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./response_parser */ "./public/app/plugins/datasource/mysql/response_parser.ts");
/* harmony import */ var app_plugins_datasource_mysql_mysql_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/plugins/datasource/mysql/mysql_query */ "./public/app/plugins/datasource/mysql/mysql_query.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _features_variables_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../features/variables/utils */ "./public/app/features/variables/utils.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var MysqlDatasource =
/*#__PURE__*/
function () {
  MysqlDatasource.$inject = ["instanceSettings", "templateSrv", "timeSrv"];

  /** @ngInject */
  function MysqlDatasource(instanceSettings, templateSrv, timeSrv) {
    var _this = this;

    _classCallCheck(this, MysqlDatasource);

    this.templateSrv = templateSrv;
    this.timeSrv = timeSrv;

    this.interpolateVariable = function (value, variable) {
      if (typeof value === 'string') {
        if (variable.multi || variable.includeAll) {
          var result = _this.queryModel.quoteLiteral(value);

          return result;
        } else {
          return value;
        }
      }

      if (typeof value === 'number') {
        return value;
      }

      var quotedValues = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(value, function (v) {
        return _this.queryModel.quoteLiteral(v);
      });

      return quotedValues.join(',');
    };

    this.name = instanceSettings.name;
    this.id = instanceSettings.id;
    this.responseParser = new _response_parser__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.queryModel = new app_plugins_datasource_mysql_mysql_query__WEBPACK_IMPORTED_MODULE_2__["default"]({});
    this.interval = (instanceSettings.jsonData || {}).timeInterval || '1m';
  }

  _createClass(MysqlDatasource, [{
    key: "interpolateVariablesInQueries",
    value: function interpolateVariablesInQueries(queries, scopedVars) {
      var _this2 = this;

      var expandedQueries = queries;

      if (queries && queries.length > 0) {
        expandedQueries = queries.map(function (query) {
          var expandedQuery = _objectSpread({}, query, {
            datasource: _this2.name,
            rawSql: _this2.templateSrv.replace(query.rawSql, scopedVars, _this2.interpolateVariable),
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
      var _this3 = this;

      var queries = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(options.targets, function (target) {
        return target.hide !== true;
      }).map(function (target) {
        var queryModel = new app_plugins_datasource_mysql_mysql_query__WEBPACK_IMPORTED_MODULE_2__["default"](target, _this3.templateSrv, options.scopedVars);
        return {
          refId: target.refId,
          intervalMs: options.intervalMs,
          maxDataPoints: options.maxDataPoints,
          datasourceId: _this3.id,
          rawSql: queryModel.render(_this3.interpolateVariable),
          format: target.format
        };
      });

      if (queries.length === 0) {
        return Promise.resolve({
          data: []
        });
      }

      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_3__["getBackendSrv"])().datasourceRequest({
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
      var _this4 = this;

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
      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_3__["getBackendSrv"])().datasourceRequest({
        url: '/api/tsdb/query',
        method: 'POST',
        data: {
          from: options.range.from.valueOf().toString(),
          to: options.range.to.valueOf().toString(),
          queries: [query]
        }
      }).then(function (data) {
        return _this4.responseParser.transformAnnotationResponse(options, data);
      });
    }
  }, {
    key: "metricFindQuery",
    value: function metricFindQuery(query, optionalOptions) {
      var _this5 = this;

      var refId = 'tempvar';

      if (optionalOptions && optionalOptions.variable && optionalOptions.variable.name) {
        refId = optionalOptions.variable.name;
      }

      var rawSql = this.templateSrv.replace(query, Object(_features_variables_utils__WEBPACK_IMPORTED_MODULE_4__["getSearchFilterScopedVar"])({
        query: query,
        wildcardChar: '%',
        options: optionalOptions
      }), this.interpolateVariable);
      var interpolatedQuery = {
        refId: refId,
        datasourceId: this.id,
        rawSql: rawSql,
        format: 'table'
      };
      var range = this.timeSrv.timeRange();
      var data = {
        queries: [interpolatedQuery],
        from: range.from.valueOf().toString(),
        to: range.to.valueOf().toString()
      };

      if (optionalOptions && optionalOptions.range && optionalOptions.range.from) {
        data['from'] = optionalOptions.range.from.valueOf().toString();
      }

      if (optionalOptions && optionalOptions.range && optionalOptions.range.to) {
        data['to'] = optionalOptions.range.to.valueOf().toString();
      }

      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_3__["getBackendSrv"])().datasourceRequest({
        url: '/api/tsdb/query',
        method: 'POST',
        data: data
      }).then(function (data) {
        return _this5.responseParser.parseMetricFindQueryResult(refId, data);
      });
    }
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_3__["getBackendSrv"])().datasourceRequest({
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
      var rawSql = '';

      if (target.rawQuery) {
        rawSql = target.rawSql;
      } else {
        var query = new app_plugins_datasource_mysql_mysql_query__WEBPACK_IMPORTED_MODULE_2__["default"](target);
        rawSql = query.buildQuery();
      }

      rawSql = rawSql.replace('$__', '');
      return this.templateSrv.variableExists(rawSql);
    }
  }]);

  return MysqlDatasource;
}();

/***/ }),

/***/ "./public/app/plugins/datasource/mysql/meta_query.ts":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/mysql/meta_query.ts ***!
  \***********************************************************/
/*! exports provided: MysqlMetaQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MysqlMetaQuery", function() { return MysqlMetaQuery; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MysqlMetaQuery =
/*#__PURE__*/
function () {
  function MysqlMetaQuery(target, queryModel) {
    _classCallCheck(this, MysqlMetaQuery);

    this.target = target;
    this.queryModel = queryModel;
  }

  _createClass(MysqlMetaQuery, [{
    key: "getOperators",
    value: function getOperators(datatype) {
      switch (datatype) {
        case 'double':
        case 'float':
          {
            return ['=', '!=', '<', '<=', '>', '>='];
          }

        case 'text':
        case 'tinytext':
        case 'mediumtext':
        case 'longtext':
        case 'varchar':
        case 'char':
          {
            return ['=', '!=', '<', '<=', '>', '>=', 'IN', 'NOT IN', 'LIKE', 'NOT LIKE'];
          }

        default:
          {
            return ['=', '!=', '<', '<=', '>', '>=', 'IN', 'NOT IN'];
          }
      }
    } // quote identifier as literal to use in metadata queries

  }, {
    key: "quoteIdentAsLiteral",
    value: function quoteIdentAsLiteral(value) {
      return this.queryModel.quoteLiteral(this.queryModel.unquoteIdentifier(value));
    }
  }, {
    key: "findMetricTable",
    value: function findMetricTable() {
      // query that returns first table found that has a timestamp(tz) column and a float column
      var query = "\n  SELECT\n    table_name as table_name,\n    ( SELECT\n        column_name as column_name\n      FROM information_schema.columns c\n      WHERE\n        c.table_schema = t.table_schema AND\n        c.table_name = t.table_name AND\n        c.data_type IN ('timestamp', 'datetime')\n      ORDER BY ordinal_position LIMIT 1\n    ) AS time_column,\n    ( SELECT\n        column_name AS column_name\n      FROM information_schema.columns c\n      WHERE\n        c.table_schema = t.table_schema AND\n        c.table_name = t.table_name AND\n        c.data_type IN('float', 'int', 'bigint')\n      ORDER BY ordinal_position LIMIT 1\n    ) AS value_column\n  FROM information_schema.tables t\n  WHERE\n    t.table_schema = database() AND\n    EXISTS\n    ( SELECT 1\n      FROM information_schema.columns c\n      WHERE\n        c.table_schema = t.table_schema AND\n        c.table_name = t.table_name AND\n        c.data_type IN ('timestamp', 'datetime')\n    ) AND\n    EXISTS\n    ( SELECT 1\n      FROM information_schema.columns c\n      WHERE\n        c.table_schema = t.table_schema AND\n        c.table_name = t.table_name AND\n        c.data_type IN('float', 'int', 'bigint')\n    )\n  LIMIT 1\n;";
      return query;
    }
  }, {
    key: "buildTableConstraint",
    value: function buildTableConstraint(table) {
      var query = ''; // check for schema qualified table

      if (table.includes('.')) {
        var parts = table.split('.');
        query = 'table_schema = ' + this.quoteIdentAsLiteral(parts[0]);
        query += ' AND table_name = ' + this.quoteIdentAsLiteral(parts[1]);
        return query;
      } else {
        query = 'table_schema = database() AND table_name = ' + this.quoteIdentAsLiteral(table);
        return query;
      }
    }
  }, {
    key: "buildTableQuery",
    value: function buildTableQuery() {
      return 'SELECT table_name FROM information_schema.tables WHERE table_schema = database() ORDER BY table_name';
    }
  }, {
    key: "buildColumnQuery",
    value: function buildColumnQuery(type) {
      var query = 'SELECT column_name FROM information_schema.columns WHERE ';
      query += this.buildTableConstraint(this.target.table);

      switch (type) {
        case 'time':
          {
            query += " AND data_type IN ('timestamp','datetime','bigint','int','double','float')";
            break;
          }

        case 'metric':
          {
            query += " AND data_type IN ('text','tinytext','mediumtext','longtext','varchar','char')";
            break;
          }

        case 'value':
          {
            query += " AND data_type IN ('bigint','int','smallint','mediumint','tinyint','double','decimal','float')";
            query += ' AND column_name <> ' + this.quoteIdentAsLiteral(this.target.timeColumn);
            break;
          }

        case 'group':
          {
            query += " AND data_type IN ('text','tinytext','mediumtext','longtext','varchar','char')";
            break;
          }
      }

      query += ' ORDER BY column_name';
      return query;
    }
  }, {
    key: "buildValueQuery",
    value: function buildValueQuery(column) {
      var query = 'SELECT DISTINCT QUOTE(' + column + ')';
      query += ' FROM ' + this.target.table;
      query += ' WHERE $__timeFilter(' + this.target.timeColumn + ')';
      query += ' ORDER BY 1 LIMIT 100';
      return query;
    }
  }, {
    key: "buildDatatypeQuery",
    value: function buildDatatypeQuery(column) {
      var query = "\nSELECT data_type\nFROM information_schema.columns\nWHERE ";
      query += ' table_name = ' + this.quoteIdentAsLiteral(this.target.table);
      query += ' AND column_name = ' + this.quoteIdentAsLiteral(column);
      return query;
    }
  }]);

  return MysqlMetaQuery;
}();

/***/ }),

/***/ "./public/app/plugins/datasource/mysql/module.ts":
/*!*******************************************************!*\
  !*** ./public/app/plugins/datasource/mysql/module.ts ***!
  \*******************************************************/
/*! exports provided: MysqlDatasource, Datasource, QueryCtrl, ConfigCtrl, AnnotationsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigCtrl", function() { return MysqlConfigCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationsQueryCtrl", function() { return MysqlAnnotationsQueryCtrl; });
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/mysql/datasource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MysqlDatasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_0__["MysqlDatasource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Datasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_0__["MysqlDatasource"]; });

/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_ctrl */ "./public/app/plugins/datasource/mysql/query_ctrl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryCtrl", function() { return _query_ctrl__WEBPACK_IMPORTED_MODULE_1__["MysqlQueryCtrl"]; });

/* harmony import */ var _features_datasources_utils_passwordHandlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../features/datasources/utils/passwordHandlers */ "./public/app/features/datasources/utils/passwordHandlers.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var MysqlConfigCtrl = function MysqlConfigCtrl() {
  _classCallCheck(this, MysqlConfigCtrl);

  this.onPasswordReset = Object(_features_datasources_utils_passwordHandlers__WEBPACK_IMPORTED_MODULE_2__["createResetHandler"])(this, _features_datasources_utils_passwordHandlers__WEBPACK_IMPORTED_MODULE_2__["PasswordFieldEnum"].Password);
  this.onPasswordChange = Object(_features_datasources_utils_passwordHandlers__WEBPACK_IMPORTED_MODULE_2__["createChangeHandler"])(this, _features_datasources_utils_passwordHandlers__WEBPACK_IMPORTED_MODULE_2__["PasswordFieldEnum"].Password);
};

MysqlConfigCtrl.templateUrl = 'partials/config.html';
var defaultQuery = "SELECT\n    UNIX_TIMESTAMP(<time_column>) as time_sec,\n    <text_column> as text,\n    <tags_column> as tags\n  FROM <table name>\n  WHERE $__timeFilter(time_column)\n  ORDER BY <time_column> ASC\n  LIMIT 100\n  ";

var MysqlAnnotationsQueryCtrl =
/** @ngInject */
function MysqlAnnotationsQueryCtrl() {
  _classCallCheck(this, MysqlAnnotationsQueryCtrl);

  this.annotation.rawQuery = this.annotation.rawQuery || defaultQuery;
};

MysqlAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';


/***/ }),

/***/ "./public/app/plugins/datasource/mysql/mysql_query.ts":
/*!************************************************************!*\
  !*** ./public/app/plugins/datasource/mysql/mysql_query.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MysqlQuery; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var MysqlQuery =
/*#__PURE__*/
function () {
  MysqlQuery.$inject = ["target", "templateSrv", "scopedVars"];

  /** @ngInject */
  function MysqlQuery(target, templateSrv, scopedVars) {
    _classCallCheck(this, MysqlQuery);

    this.target = target;
    this.templateSrv = templateSrv;
    this.scopedVars = scopedVars;
    target.format = target.format || 'time_series';
    target.timeColumn = target.timeColumn || 'time';
    target.metricColumn = target.metricColumn || 'none';
    target.group = target.group || [];
    target.where = target.where || [{
      type: 'macro',
      name: '$__timeFilter',
      params: []
    }];
    target.select = target.select || [[{
      type: 'column',
      params: ['value']
    }]]; // handle pre query gui panels gracefully

    if (!('rawQuery' in this.target)) {
      if ('rawSql' in target) {
        // pre query gui panel
        target.rawQuery = true;
      } else {
        // new panel
        target.rawQuery = false;
      }
    } // give interpolateQueryStr access to this


    this.interpolateQueryStr = this.interpolateQueryStr.bind(this);
  } // remove identifier quoting from identifier to use in metadata queries


  _createClass(MysqlQuery, [{
    key: "unquoteIdentifier",
    value: function unquoteIdentifier(value) {
      if (value[0] === '"' && value[value.length - 1] === '"') {
        return value.substring(1, value.length - 1).replace(/""/g, '"');
      } else {
        return value;
      }
    }
  }, {
    key: "quoteIdentifier",
    value: function quoteIdentifier(value) {
      return '"' + value.replace(/"/g, '""') + '"';
    }
  }, {
    key: "quoteLiteral",
    value: function quoteLiteral(value) {
      return "'" + value.replace(/'/g, "''") + "'";
    }
  }, {
    key: "escapeLiteral",
    value: function escapeLiteral(value) {
      return String(value).replace(/'/g, "''");
    }
  }, {
    key: "hasTimeGroup",
    value: function hasTimeGroup() {
      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(this.target.group, function (g) {
        return g.type === 'time';
      });
    }
  }, {
    key: "hasMetricColumn",
    value: function hasMetricColumn() {
      return this.target.metricColumn !== 'none';
    }
  }, {
    key: "interpolateQueryStr",
    value: function interpolateQueryStr(value, variable, defaultFormatFn) {
      // if no multi or include all do not regexEscape
      if (!variable.multi && !variable.includeAll) {
        return this.escapeLiteral(value);
      }

      if (typeof value === 'string') {
        return this.quoteLiteral(value);
      }

      var escapedValues = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(value, this.quoteLiteral);

      return escapedValues.join(',');
    }
  }, {
    key: "render",
    value: function render(interpolate) {
      var target = this.target; // new query with no table set yet

      if (!this.target.rawQuery && !('table' in this.target)) {
        return '';
      }

      if (!target.rawQuery) {
        target.rawSql = this.buildQuery();
      }

      if (interpolate) {
        return this.templateSrv.replace(target.rawSql, this.scopedVars, this.interpolateQueryStr);
      } else {
        return target.rawSql;
      }
    }
  }, {
    key: "hasUnixEpochTimecolumn",
    value: function hasUnixEpochTimecolumn() {
      return ['int', 'bigint', 'double'].indexOf(this.target.timeColumnType) > -1;
    }
  }, {
    key: "buildTimeColumn",
    value: function buildTimeColumn() {
      var alias = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var timeGroup = this.hasTimeGroup();
      var query;
      var macro = '$__timeGroup';

      if (timeGroup) {
        var args;

        if (timeGroup.params.length > 1 && timeGroup.params[1] !== 'none') {
          args = timeGroup.params.join(',');
        } else {
          args = timeGroup.params[0];
        }

        if (this.hasUnixEpochTimecolumn()) {
          macro = '$__unixEpochGroup';
        }

        if (alias) {
          macro += 'Alias';
        }

        query = macro + '(' + this.target.timeColumn + ',' + args + ')';
      } else {
        query = this.target.timeColumn;

        if (alias) {
          query += ' AS "time"';
        }
      }

      return query;
    }
  }, {
    key: "buildMetricColumn",
    value: function buildMetricColumn() {
      if (this.hasMetricColumn()) {
        return this.target.metricColumn + ' AS metric';
      }

      return '';
    }
  }, {
    key: "buildValueColumns",
    value: function buildValueColumns() {
      var query = '';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.target.select[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var column = _step.value;
          query += ',\n  ' + this.buildValueColumn(column);
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

      return query;
    }
  }, {
    key: "buildValueColumn",
    value: function buildValueColumn(column) {
      var query = '';

      var columnName = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(column, function (g) {
        return g.type === 'column';
      });

      query = columnName.params[0];

      var aggregate = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(column, function (g) {
        return g.type === 'aggregate';
      });

      if (aggregate) {
        var func = aggregate.params[0];
        query = func + '(' + query + ')';
      }

      var alias = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(column, function (g) {
        return g.type === 'alias';
      });

      if (alias) {
        query += ' AS ' + this.quoteIdentifier(alias.params[0]);
      }

      return query;
    }
  }, {
    key: "buildWhereClause",
    value: function buildWhereClause() {
      var _this = this;

      var query = '';

      var conditions = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.target.where, function (tag, index) {
        switch (tag.type) {
          case 'macro':
            return tag.name + '(' + _this.target.timeColumn + ')';
            break;

          case 'expression':
            return tag.params.join(' ');
            break;
        }
      });

      if (conditions.length > 0) {
        query = '\nWHERE\n  ' + conditions.join(' AND\n  ');
      }

      return query;
    }
  }, {
    key: "buildGroupClause",
    value: function buildGroupClause() {
      var query = '';
      var groupSection = '';

      for (var i = 0; i < this.target.group.length; i++) {
        var part = this.target.group[i];

        if (i > 0) {
          groupSection += ', ';
        }

        if (part.type === 'time') {
          groupSection += '1';
        } else {
          groupSection += part.params[0];
        }
      }

      if (groupSection.length) {
        query = '\nGROUP BY ' + groupSection;

        if (this.hasMetricColumn()) {
          query += ',2';
        }
      }

      return query;
    }
  }, {
    key: "buildQuery",
    value: function buildQuery() {
      var query = 'SELECT';
      query += '\n  ' + this.buildTimeColumn();

      if (this.hasMetricColumn()) {
        query += ',\n  ' + this.buildMetricColumn();
      }

      query += this.buildValueColumns();
      query += '\nFROM ' + this.target.table;
      query += this.buildWhereClause();
      query += this.buildGroupClause();
      query += '\nORDER BY ' + this.buildTimeColumn(false);
      return query;
    }
  }]);

  return MysqlQuery;
}();



/***/ }),

/***/ "./public/app/plugins/datasource/mysql/query_ctrl.ts":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/mysql/query_ctrl.ts ***!
  \***********************************************************/
/*! exports provided: MysqlQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MysqlQueryCtrl", function() { return MysqlQueryCtrl; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var _meta_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./meta_query */ "./public/app/plugins/datasource/mysql/meta_query.ts");
/* harmony import */ var app_plugins_sdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/plugins/sdk */ "./public/app/plugins/sdk.ts");
/* harmony import */ var _mysql_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mysql_query */ "./public/app/plugins/datasource/mysql/mysql_query.ts");
/* harmony import */ var _sql_part__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sql_part */ "./public/app/plugins/datasource/mysql/sql_part.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var defaultQuery = "SELECT\n  UNIX_TIMESTAMP(<time_column>) as time_sec,\n  <value column> as value,\n  <series name column> as metric\nFROM <table name>\nWHERE $__timeFilter(time_column)\nORDER BY <time_column> ASC\n";
var MysqlQueryCtrl =
/*#__PURE__*/
function (_QueryCtrl) {
  MysqlQueryCtrl.$inject = ["$scope", "$injector", "templateSrv", "uiSegmentSrv"];

  _inherits(MysqlQueryCtrl, _QueryCtrl);

  /** @ngInject */
  function MysqlQueryCtrl($scope, $injector, templateSrv, uiSegmentSrv) {
    var _this;

    _classCallCheck(this, MysqlQueryCtrl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MysqlQueryCtrl).call(this, $scope, $injector));
    _this.templateSrv = templateSrv;
    _this.uiSegmentSrv = uiSegmentSrv;
    _this.target = _this.target;
    _this.queryModel = new _mysql_query__WEBPACK_IMPORTED_MODULE_4__["default"](_this.target, templateSrv, _this.panel.scopedVars);
    _this.metaBuilder = new _meta_query__WEBPACK_IMPORTED_MODULE_2__["MysqlMetaQuery"](_this.target, _this.queryModel);

    _this.updateProjection();

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
        _this.target.rawQuery = true;
      } else {
        _this.target.rawSql = defaultQuery;

        _this.datasource.metricFindQuery(_this.metaBuilder.findMetricTable()).then(function (result) {
          if (result.length > 0) {
            _this.target.table = result[0].text;

            var segment = _this.uiSegmentSrv.newSegment(_this.target.table);

            _this.tableSegment.html = segment.html;
            _this.tableSegment.value = segment.value;
            _this.target.timeColumn = result[1].text;
            segment = _this.uiSegmentSrv.newSegment(_this.target.timeColumn);
            _this.timeColumnSegment.html = segment.html;
            _this.timeColumnSegment.value = segment.value;
            _this.target.timeColumnType = 'timestamp';
            _this.target.select = [[{
              type: 'column',
              params: [result[2].text]
            }]];

            _this.updateProjection();

            _this.updateRawSqlAndRefresh();
          }
        });
      }
    }

    if (!_this.target.table) {
      _this.tableSegment = uiSegmentSrv.newSegment({
        value: 'select table',
        fake: true
      });
    } else {
      _this.tableSegment = uiSegmentSrv.newSegment(_this.target.table);
    }

    _this.timeColumnSegment = uiSegmentSrv.newSegment(_this.target.timeColumn);
    _this.metricColumnSegment = uiSegmentSrv.newSegment(_this.target.metricColumn);

    _this.buildSelectMenu();

    _this.whereAdd = _this.uiSegmentSrv.newPlusButton();
    _this.groupAdd = _this.uiSegmentSrv.newPlusButton();

    _this.panelCtrl.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_7__["PanelEvents"].dataReceived, _this.onDataReceived.bind(_assertThisInitialized(_this)), $scope);

    _this.panelCtrl.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_7__["PanelEvents"].dataError, _this.onDataError.bind(_assertThisInitialized(_this)), $scope);

    return _this;
  }

  _createClass(MysqlQueryCtrl, [{
    key: "showQueryInspector",
    value: function showQueryInspector() {
      Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_8__["getLocationSrv"])().update({
        query: {
          inspect: this.panel.id,
          inspectTab: 'query'
        },
        partial: true
      });
    }
  }, {
    key: "updateRawSqlAndRefresh",
    value: function updateRawSqlAndRefresh() {
      if (!this.target.rawQuery) {
        this.target.rawSql = this.queryModel.buildQuery();
      }

      this.panelCtrl.refresh();
    }
  }, {
    key: "updateProjection",
    value: function updateProjection() {
      this.selectParts = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.target.select, function (parts) {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(parts, _sql_part__WEBPACK_IMPORTED_MODULE_5__["default"].create).filter(function (n) {
          return n;
        });
      });
      this.whereParts = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.target.where, _sql_part__WEBPACK_IMPORTED_MODULE_5__["default"].create).filter(function (n) {
        return n;
      });
      this.groupParts = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.target.group, _sql_part__WEBPACK_IMPORTED_MODULE_5__["default"].create).filter(function (n) {
        return n;
      });
    }
  }, {
    key: "updatePersistedParts",
    value: function updatePersistedParts() {
      this.target.select = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.selectParts, function (selectParts) {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(selectParts, function (part) {
          return {
            type: part.def.type,
            datatype: part.datatype,
            params: part.params
          };
        });
      });
      this.target.where = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.whereParts, function (part) {
        return {
          type: part.def.type,
          datatype: part.datatype,
          name: part.name,
          params: part.params
        };
      });
      this.target.group = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.groupParts, function (part) {
        return {
          type: part.def.type,
          datatype: part.datatype,
          params: part.params
        };
      });
    }
  }, {
    key: "buildSelectMenu",
    value: function buildSelectMenu() {
      this.selectMenu = [];
      var aggregates = {
        text: 'Aggregate Functions',
        value: 'aggregate',
        submenu: [{
          text: 'Average',
          value: 'avg'
        }, {
          text: 'Count',
          value: 'count'
        }, {
          text: 'Maximum',
          value: 'max'
        }, {
          text: 'Minimum',
          value: 'min'
        }, {
          text: 'Sum',
          value: 'sum'
        }, {
          text: 'Standard deviation',
          value: 'stddev'
        }, {
          text: 'Variance',
          value: 'variance'
        }]
      };
      this.selectMenu.push(aggregates);
      this.selectMenu.push({
        text: 'Alias',
        value: 'alias'
      });
      this.selectMenu.push({
        text: 'Column',
        value: 'column'
      });
    }
  }, {
    key: "toggleEditorMode",
    value: function toggleEditorMode() {
      var _this2 = this;

      if (this.target.rawQuery) {
        app_core_app_events__WEBPACK_IMPORTED_MODULE_1__["default"].emit(app_types__WEBPACK_IMPORTED_MODULE_6__["CoreEvents"].showConfirmModal, {
          title: 'Warning',
          text2: 'Switching to query builder may overwrite your raw SQL.',
          icon: 'exclamation-triangle',
          yesText: 'Switch',
          onConfirm: function onConfirm() {
            _this2.target.rawQuery = !_this2.target.rawQuery;
          }
        });
      } else {
        this.target.rawQuery = !this.target.rawQuery;
      }
    }
  }, {
    key: "resetPlusButton",
    value: function resetPlusButton(button) {
      var plusButton = this.uiSegmentSrv.newPlusButton();
      button.html = plusButton.html;
      button.value = plusButton.value;
    }
  }, {
    key: "getTableSegments",
    value: function getTableSegments() {
      return this.datasource.metricFindQuery(this.metaBuilder.buildTableQuery()).then(this.transformToSegments({})).catch(this.handleQueryError.bind(this));
    }
  }, {
    key: "tableChanged",
    value: function tableChanged() {
      var _this3 = this;

      this.target.table = this.tableSegment.value;
      this.target.where = [];
      this.target.group = [];
      this.updateProjection();
      var segment = this.uiSegmentSrv.newSegment('none');
      this.metricColumnSegment.html = segment.html;
      this.metricColumnSegment.value = segment.value;
      this.target.metricColumn = 'none';
      var task1 = this.datasource.metricFindQuery(this.metaBuilder.buildColumnQuery('time')).then(function (result) {
        // check if time column is still valid
        if (result.length > 0 && !lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(result, function (r) {
          return r.text === _this3.target.timeColumn;
        })) {
          var _segment = _this3.uiSegmentSrv.newSegment(result[0].text);

          _this3.timeColumnSegment.html = _segment.html;
          _this3.timeColumnSegment.value = _segment.value;
        }

        return _this3.timeColumnChanged(false);
      });
      var task2 = this.datasource.metricFindQuery(this.metaBuilder.buildColumnQuery('value')).then(function (result) {
        if (result.length > 0) {
          _this3.target.select = [[{
            type: 'column',
            params: [result[0].text]
          }]];

          _this3.updateProjection();
        }
      });
      Promise.all([task1, task2]).then(function () {
        _this3.updateRawSqlAndRefresh();
      });
    }
  }, {
    key: "getTimeColumnSegments",
    value: function getTimeColumnSegments() {
      return this.datasource.metricFindQuery(this.metaBuilder.buildColumnQuery('time')).then(this.transformToSegments({})).catch(this.handleQueryError.bind(this));
    }
  }, {
    key: "timeColumnChanged",
    value: function timeColumnChanged(refresh) {
      var _this4 = this;

      this.target.timeColumn = this.timeColumnSegment.value;
      return this.datasource.metricFindQuery(this.metaBuilder.buildDatatypeQuery(this.target.timeColumn)).then(function (result) {
        if (result.length === 1) {
          if (_this4.target.timeColumnType !== result[0].text) {
            _this4.target.timeColumnType = result[0].text;
          }

          var partModel;

          if (_this4.queryModel.hasUnixEpochTimecolumn()) {
            partModel = _sql_part__WEBPACK_IMPORTED_MODULE_5__["default"].create({
              type: 'macro',
              name: '$__unixEpochFilter',
              params: []
            });
          } else {
            partModel = _sql_part__WEBPACK_IMPORTED_MODULE_5__["default"].create({
              type: 'macro',
              name: '$__timeFilter',
              params: []
            });
          }

          if (_this4.whereParts.length >= 1 && _this4.whereParts[0].def.type === 'macro') {
            // replace current macro
            _this4.whereParts[0] = partModel;
          } else {
            _this4.whereParts.splice(0, 0, partModel);
          }
        }

        _this4.updatePersistedParts();

        if (refresh !== false) {
          _this4.updateRawSqlAndRefresh();
        }
      });
    }
  }, {
    key: "getMetricColumnSegments",
    value: function getMetricColumnSegments() {
      return this.datasource.metricFindQuery(this.metaBuilder.buildColumnQuery('metric')).then(this.transformToSegments({
        addNone: true
      })).catch(this.handleQueryError.bind(this));
    }
  }, {
    key: "metricColumnChanged",
    value: function metricColumnChanged() {
      this.target.metricColumn = this.metricColumnSegment.value;
      this.updateRawSqlAndRefresh();
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
  }, {
    key: "transformToSegments",
    value: function transformToSegments(config) {
      var _this5 = this;

      return function (results) {
        var segments = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(results, function (segment) {
          return _this5.uiSegmentSrv.newSegment({
            value: segment.text,
            expandable: segment.expandable
          });
        });

        if (config.addTemplateVars) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _this5.templateSrv.getVariables()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var variable = _step.value;
              var value = void 0;
              value = '$' + variable.name;

              if (config.templateQuoter && variable.multi === false) {
                value = config.templateQuoter(value);
              }

              segments.unshift(_this5.uiSegmentSrv.newSegment({
                type: 'template',
                value: value,
                expandable: true
              }));
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

        if (config.addNone) {
          segments.unshift(_this5.uiSegmentSrv.newSegment({
            type: 'template',
            value: 'none',
            expandable: true
          }));
        }

        return segments;
      };
    }
  }, {
    key: "findAggregateIndex",
    value: function findAggregateIndex(selectParts) {
      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.findIndex(selectParts, function (p) {
        return p.def.type === 'aggregate' || p.def.type === 'percentile';
      });
    }
  }, {
    key: "findWindowIndex",
    value: function findWindowIndex(selectParts) {
      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.findIndex(selectParts, function (p) {
        return p.def.type === 'window' || p.def.type === 'moving_window';
      });
    }
  }, {
    key: "addSelectPart",
    value: function addSelectPart(selectParts, item, subItem) {
      var partType = item.value;

      if (subItem && subItem.type) {
        partType = subItem.type;
      }

      var partModel = _sql_part__WEBPACK_IMPORTED_MODULE_5__["default"].create({
        type: partType
      });

      if (subItem) {
        partModel.params[0] = subItem.value;
      }

      var addAlias = false;

      switch (partType) {
        case 'column':
          var parts = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(selectParts, function (part) {
            return _sql_part__WEBPACK_IMPORTED_MODULE_5__["default"].create({
              type: part.def.type,
              params: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.clone(part.params)
            });
          });

          this.selectParts.push(parts);
          break;

        case 'percentile':
        case 'aggregate':
          // add group by if no group by yet
          if (this.target.group.length === 0) {
            this.addGroup('time', '$__interval');
          }

          var aggIndex = this.findAggregateIndex(selectParts);

          if (aggIndex !== -1) {
            // replace current aggregation
            selectParts[aggIndex] = partModel;
          } else {
            selectParts.splice(1, 0, partModel);
          }

          if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(selectParts, function (p) {
            return p.def.type === 'alias';
          })) {
            addAlias = true;
          }

          break;

        case 'moving_window':
        case 'window':
          var windowIndex = this.findWindowIndex(selectParts);

          if (windowIndex !== -1) {
            // replace current window function
            selectParts[windowIndex] = partModel;
          } else {
            var _aggIndex = this.findAggregateIndex(selectParts);

            if (_aggIndex !== -1) {
              selectParts.splice(_aggIndex + 1, 0, partModel);
            } else {
              selectParts.splice(1, 0, partModel);
            }
          }

          if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(selectParts, function (p) {
            return p.def.type === 'alias';
          })) {
            addAlias = true;
          }

          break;

        case 'alias':
          addAlias = true;
          break;
      }

      if (addAlias) {
        // set initial alias name to column name
        partModel = _sql_part__WEBPACK_IMPORTED_MODULE_5__["default"].create({
          type: 'alias',
          params: [selectParts[0].params[0].replace(/"/g, '')]
        });

        if (selectParts[selectParts.length - 1].def.type === 'alias') {
          selectParts[selectParts.length - 1] = partModel;
        } else {
          selectParts.push(partModel);
        }
      }

      this.updatePersistedParts();
      this.updateRawSqlAndRefresh();
    }
  }, {
    key: "removeSelectPart",
    value: function removeSelectPart(selectParts, part) {
      if (part.def.type === 'column') {
        // remove all parts of column unless its last column
        if (this.selectParts.length > 1) {
          var modelsIndex = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.indexOf(this.selectParts, selectParts);

          this.selectParts.splice(modelsIndex, 1);
        }
      } else {
        var partIndex = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.indexOf(selectParts, part);

        selectParts.splice(partIndex, 1);
      }

      this.updatePersistedParts();
    }
  }, {
    key: "handleSelectPartEvent",
    value: function handleSelectPartEvent(selectParts, part, evt) {
      switch (evt.name) {
        case 'get-param-options':
          {
            switch (part.def.type) {
              // case 'aggregate':
              //   return this.datasource
              //     .metricFindQuery(this.metaBuilder.buildAggregateQuery())
              //     .then(this.transformToSegments({}))
              //     .catch(this.handleQueryError.bind(this));
              case 'column':
                return this.datasource.metricFindQuery(this.metaBuilder.buildColumnQuery('value')).then(this.transformToSegments({})).catch(this.handleQueryError.bind(this));
            }
          }

        case 'part-param-changed':
          {
            this.updatePersistedParts();
            this.updateRawSqlAndRefresh();
            break;
          }

        case 'action':
          {
            this.removeSelectPart(selectParts, part);
            this.updateRawSqlAndRefresh();
            break;
          }

        case 'get-part-actions':
          {
            return Promise.resolve([{
              text: 'Remove',
              value: 'remove-part'
            }]);
          }
      }
    }
  }, {
    key: "handleGroupPartEvent",
    value: function handleGroupPartEvent(part, index, evt) {
      switch (evt.name) {
        case 'get-param-options':
          {
            return this.datasource.metricFindQuery(this.metaBuilder.buildColumnQuery()).then(this.transformToSegments({})).catch(this.handleQueryError.bind(this));
          }

        case 'part-param-changed':
          {
            this.updatePersistedParts();
            this.updateRawSqlAndRefresh();
            break;
          }

        case 'action':
          {
            this.removeGroup(part, index);
            this.updateRawSqlAndRefresh();
            break;
          }

        case 'get-part-actions':
          {
            return Promise.resolve([{
              text: 'Remove',
              value: 'remove-part'
            }]);
          }
      }
    }
  }, {
    key: "addGroup",
    value: function addGroup(partType, value) {
      var params = [value];

      if (partType === 'time') {
        params = ['$__interval', 'none'];
      }

      var partModel = _sql_part__WEBPACK_IMPORTED_MODULE_5__["default"].create({
        type: partType,
        params: params
      });

      if (partType === 'time') {
        // put timeGroup at start
        this.groupParts.splice(0, 0, partModel);
      } else {
        this.groupParts.push(partModel);
      } // add aggregates when adding group by


      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.selectParts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var selectParts = _step2.value;

          if (!selectParts.some(function (part) {
            return part.def.type === 'aggregate';
          })) {
            var aggregate = _sql_part__WEBPACK_IMPORTED_MODULE_5__["default"].create({
              type: 'aggregate',
              params: ['avg']
            });
            selectParts.splice(1, 0, aggregate);

            if (!selectParts.some(function (part) {
              return part.def.type === 'alias';
            })) {
              var alias = _sql_part__WEBPACK_IMPORTED_MODULE_5__["default"].create({
                type: 'alias',
                params: [selectParts[0].part.params[0]]
              });
              selectParts.push(alias);
            }
          }
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

      this.updatePersistedParts();
    }
  }, {
    key: "removeGroup",
    value: function removeGroup(part, index) {
      if (part.def.type === 'time') {
        // remove aggregations
        this.selectParts = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.selectParts, function (s) {
          return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(s, function (part) {
            if (part.def.type === 'aggregate' || part.def.type === 'percentile') {
              return false;
            }

            return true;
          });
        });
      }

      this.groupParts.splice(index, 1);
      this.updatePersistedParts();
    }
  }, {
    key: "handleWherePartEvent",
    value: function handleWherePartEvent(whereParts, part, evt, index) {
      var _this6 = this;

      switch (evt.name) {
        case 'get-param-options':
          {
            switch (evt.param.name) {
              case 'left':
                return this.datasource.metricFindQuery(this.metaBuilder.buildColumnQuery()).then(this.transformToSegments({})).catch(this.handleQueryError.bind(this));

              case 'right':
                if (['int', 'bigint', 'double', 'datetime'].indexOf(part.datatype) > -1) {
                  // don't do value lookups for numerical fields
                  return Promise.resolve([]);
                } else {
                  return this.datasource.metricFindQuery(this.metaBuilder.buildValueQuery(part.params[0])).then(this.transformToSegments({
                    addTemplateVars: true,
                    templateQuoter: function templateQuoter(v) {
                      return _this6.queryModel.quoteLiteral(v);
                    }
                  })).catch(this.handleQueryError.bind(this));
                }

              case 'op':
                return Promise.resolve(this.uiSegmentSrv.newOperators(this.metaBuilder.getOperators(part.datatype)));

              default:
                return Promise.resolve([]);
            }
          }

        case 'part-param-changed':
          {
            this.updatePersistedParts();
            this.datasource.metricFindQuery(this.metaBuilder.buildDatatypeQuery(part.params[0])).then(function (d) {
              if (d.length === 1) {
                part.datatype = d[0].text;
              }
            });
            this.updateRawSqlAndRefresh();
            break;
          }

        case 'action':
          {
            // remove element
            whereParts.splice(index, 1);
            this.updatePersistedParts();
            this.updateRawSqlAndRefresh();
            break;
          }

        case 'get-part-actions':
          {
            return Promise.resolve([{
              text: 'Remove',
              value: 'remove-part'
            }]);
          }
      }
    }
  }, {
    key: "getWhereOptions",
    value: function getWhereOptions() {
      var options = [];

      if (this.queryModel.hasUnixEpochTimecolumn()) {
        options.push(this.uiSegmentSrv.newSegment({
          type: 'macro',
          value: '$__unixEpochFilter'
        }));
      } else {
        options.push(this.uiSegmentSrv.newSegment({
          type: 'macro',
          value: '$__timeFilter'
        }));
      }

      options.push(this.uiSegmentSrv.newSegment({
        type: 'expression',
        value: 'Expression'
      }));
      return Promise.resolve(options);
    }
  }, {
    key: "addWhereAction",
    value: function addWhereAction(part, index) {
      switch (this.whereAdd.type) {
        case 'macro':
          {
            var partModel = _sql_part__WEBPACK_IMPORTED_MODULE_5__["default"].create({
              type: 'macro',
              name: this.whereAdd.value,
              params: []
            });

            if (this.whereParts.length >= 1 && this.whereParts[0].def.type === 'macro') {
              // replace current macro
              this.whereParts[0] = partModel;
            } else {
              this.whereParts.splice(0, 0, partModel);
            }

            break;
          }

        default:
          {
            this.whereParts.push(_sql_part__WEBPACK_IMPORTED_MODULE_5__["default"].create({
              type: 'expression',
              params: ['value', '=', 'value']
            }));
          }
      }

      this.updatePersistedParts();
      this.resetPlusButton(this.whereAdd);
      this.updateRawSqlAndRefresh();
    }
  }, {
    key: "getGroupOptions",
    value: function getGroupOptions() {
      var _this7 = this;

      return this.datasource.metricFindQuery(this.metaBuilder.buildColumnQuery('group')).then(function (tags) {
        var options = [];

        if (!_this7.queryModel.hasTimeGroup()) {
          options.push(_this7.uiSegmentSrv.newSegment({
            type: 'time',
            value: 'time($__interval,none)'
          }));
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = tags[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var tag = _step3.value;
            options.push(_this7.uiSegmentSrv.newSegment({
              type: 'column',
              value: tag.text
            }));
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return options;
      }).catch(this.handleQueryError.bind(this));
    }
  }, {
    key: "addGroupAction",
    value: function addGroupAction() {
      switch (this.groupAdd.value) {
        default:
          {
            this.addGroup(this.groupAdd.type, this.groupAdd.value);
          }
      }

      this.resetPlusButton(this.groupAdd);
      this.updateRawSqlAndRefresh();
    }
  }, {
    key: "handleQueryError",
    value: function handleQueryError(err) {
      this.error = err.message || 'Failed to issue metric query';
      return [];
    }
  }]);

  return MysqlQueryCtrl;
}(app_plugins_sdk__WEBPACK_IMPORTED_MODULE_3__["QueryCtrl"]);
MysqlQueryCtrl.templateUrl = 'partials/query.editor.html';

/***/ }),

/***/ "./public/app/plugins/datasource/mysql/response_parser.ts":
/*!****************************************************************!*\
  !*** ./public/app/plugins/datasource/mysql/response_parser.ts ***!
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
        if (table.columns[i].text === 'time_sec' || table.columns[i].text === 'time') {
          timeColumnIndex = i;
        } else if (table.columns[i].text === 'timeend') {
          timeEndColumnIndex = i;
        } else if (table.columns[i].text === 'title') {
          return Promise.reject({
            message: 'The title column for annotations is deprecated, now only a column named text is returned'
          });
        } else if (table.columns[i].text === 'text') {
          textColumnIndex = i;
        } else if (table.columns[i].text === 'tags') {
          tagsColumnIndex = i;
        }
      }

      if (timeColumnIndex === -1) {
        return Promise.reject({
          message: 'Missing mandatory time column (with time_sec column alias) in annotation query.'
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
          text: row[textColumnIndex] ? row[textColumnIndex].toString() : '',
          tags: row[tagsColumnIndex] ? row[tagsColumnIndex].trim().split(/\s*,\s*/) : []
        });
      }

      return list;
    }
  }]);

  return ResponseParser;
}();



/***/ }),

/***/ "./public/app/plugins/datasource/mysql/sql_part.ts":
/*!*********************************************************!*\
  !*** ./public/app/plugins/datasource/mysql/sql_part.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var app_core_components_sql_part_sql_part__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/components/sql_part/sql_part */ "./public/app/core/components/sql_part/sql_part.ts");

var index = [];

function createPart(part) {
  var def = index[part.type];

  if (!def) {
    return null;
  }

  return new app_core_components_sql_part_sql_part__WEBPACK_IMPORTED_MODULE_0__["SqlPart"](part, def);
}

function register(options) {
  index[options.type] = new app_core_components_sql_part_sql_part__WEBPACK_IMPORTED_MODULE_0__["SqlPartDef"](options);
}

register({
  type: 'column',
  style: 'label',
  params: [{
    type: 'column',
    dynamicLookup: true
  }],
  defaultParams: ['value']
});
register({
  type: 'expression',
  style: 'expression',
  label: 'Expr:',
  params: [{
    name: 'left',
    type: 'string',
    dynamicLookup: true
  }, {
    name: 'op',
    type: 'string',
    dynamicLookup: true
  }, {
    name: 'right',
    type: 'string',
    dynamicLookup: true
  }],
  defaultParams: ['value', '=', 'value']
});
register({
  type: 'macro',
  style: 'label',
  label: 'Macro:',
  params: [],
  defaultParams: []
});
register({
  type: 'aggregate',
  style: 'label',
  params: [{
    name: 'name',
    type: 'string',
    options: ['avg', 'count', 'min', 'max', 'sum', 'stddev', 'variance']
  }],
  defaultParams: ['avg']
});
register({
  type: 'alias',
  style: 'label',
  params: [{
    name: 'name',
    type: 'string',
    quote: 'double'
  }],
  defaultParams: ['alias']
});
register({
  type: 'time',
  style: 'function',
  label: 'time',
  params: [{
    name: 'interval',
    type: 'interval',
    options: ['$__interval', '1s', '10s', '1m', '5m', '10m', '15m', '1h']
  }, {
    name: 'fill',
    type: 'string',
    options: ['none', 'NULL', 'previous', '0']
  }],
  defaultParams: ['$__interval', 'none']
});
/* harmony default export */ __webpack_exports__["default"] = ({
  create: createPart
});

/***/ })

}]);
//# sourceMappingURL=mysqlPlugin.1ebdc265fc3bd7452fcd.js.map