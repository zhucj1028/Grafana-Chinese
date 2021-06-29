(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["testDataDSPlugin"],{

/***/ "./public/app/plugins/datasource/testdata/ConfigEditor.tsx":
/*!*****************************************************************!*\
  !*** ./public/app/plugins/datasource/testdata/ConfigEditor.tsx ***!
  \*****************************************************************/
/*! exports provided: ConfigEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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


/**
 * Empty Config Editor -- settings to save
 */
var ConfigEditor =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ConfigEditor, _PureComponent);

  function ConfigEditor() {
    _classCallCheck(this, ConfigEditor);

    return _possibleConstructorReturn(this, _getPrototypeOf(ConfigEditor).apply(this, arguments));
  }

  _createClass(ConfigEditor, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null);
    }
  }]);

  return ConfigEditor;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/***/ }),

/***/ "./public/app/plugins/datasource/testdata/LogIpsum.ts":
/*!************************************************************!*\
  !*** ./public/app/plugins/datasource/testdata/LogIpsum.ts ***!
  \************************************************************/
/*! exports provided: getRandomLogLevel, getNextWord, getRandomLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomLogLevel", function() { return getRandomLogLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNextWord", function() { return getNextWord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomLine", function() { return getRandomLine; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");

var index = 0;
function getRandomLogLevel() {
  var v = Math.random();

  if (v > 0.9) {
    return _grafana_data__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].critical;
  }

  if (v > 0.8) {
    return _grafana_data__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].error;
  }

  if (v > 0.7) {
    return _grafana_data__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].warning;
  }

  if (v > 0.4) {
    return _grafana_data__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].info;
  }

  if (v > 0.3) {
    return _grafana_data__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].debug;
  }

  if (v > 0.1) {
    return _grafana_data__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].trace;
  }

  return _grafana_data__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].unknown;
}
function getNextWord() {
  index = (index + Math.floor(Math.random() * 5)) % words.length;
  return words[index];
}
function getRandomLine() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60;
  var line = getNextWord();

  while (line.length < length) {
    line += ' ' + getNextWord();
  }

  return line;
}
var words = ['At', 'vero', 'eos', 'et', 'accusamus', 'et', 'iusto', 'odio', 'dignissimos', 'ducimus', 'qui', 'blanditiis', 'praesentium', 'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos', 'dolores', 'et', 'quas', 'molestias', 'excepturi', 'sint', 'occaecati', 'cupiditate', 'non', 'provident', 'similique', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollitia', 'animi', 'id', 'est', 'laborum', 'et', 'dolorum', 'fuga', 'Et', 'harum', 'quidem', 'rerum', 'facilis', 'est', 'et', 'expedita', 'distinctio', 'Nam', 'libero', 'tempore', 'cum', 'soluta', 'nobis', 'est', 'eligendi', 'optio', 'cumque', 'nihil', 'impedit', 'quo', 'minus', 'id', 'quod', 'maxime', 'placeat', 'facere', 'possimus', 'omnis', 'voluptas', 'assumenda', 'est', 'omnis', 'dolor', 'repellendus', 'Temporibus', 'autem', 'quibusdam', 'et', 'aut', 'officiis', 'debitis', 'aut', 'rerum', 'necessitatibus', 'saepe', 'eveniet', 'ut', 'et', 'voluptates', 'repudiandae', 'sint', 'et', 'molestiae', 'non', 'recusandae', 'Itaque', 'earum', 'rerum', 'hic', 'tenetur', 'a', 'sapiente', 'delectus', 'ut', 'aut', 'reiciendis', 'voluptatibus', 'maiores', 'alias', 'consequatur', 'aut', 'perferendis', 'doloribus', 'asperiores', 'repellat'];

/***/ }),

/***/ "./public/app/plugins/datasource/testdata/TestInfoTab.tsx":
/*!****************************************************************!*\
  !*** ./public/app/plugins/datasource/testdata/TestInfoTab.tsx ***!
  \****************************************************************/
/*! exports provided: TestInfoTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestInfoTab", function() { return TestInfoTab; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
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
 // Types

var TestInfoTab =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TestInfoTab, _PureComponent);

  function TestInfoTab(props) {
    _classCallCheck(this, TestInfoTab);

    return _possibleConstructorReturn(this, _getPrototypeOf(TestInfoTab).call(this, props));
  }

  _createClass(TestInfoTab, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "\u6709\u5173\u8BBE\u7F6E\u53EF\u91CD\u590D\u6D4B\u8BD5\u73AF\u5883\u7684\u66F4\u591A\u4FE1\u606F\uFF0C\u8BF7\u53C2\u9605github\u3002", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "btn btn-inverse",
        href: "https://github.com/grafana/grafana/tree/master/devenv",
        target: "_blank",
        rel: "noopener"
      }, "GitHub"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null));
    }
  }]);

  return TestInfoTab;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/***/ }),

/***/ "./public/app/plugins/datasource/testdata/datasource.ts":
/*!**************************************************************!*\
  !*** ./public/app/plugins/datasource/testdata/datasource.ts ***!
  \**************************************************************/
/*! exports provided: TestDataDataSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestDataDataSource", function() { return TestDataDataSource; });
/* harmony import */ var lodash_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/set */ "./node_modules/lodash/set.js");
/* harmony import */ var lodash_set__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_set__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _metricTree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./metricTree */ "./public/app/plugins/datasource/testdata/metricTree.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _runStreams__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./runStreams */ "./public/app/plugins/datasource/testdata/runStreams.ts");
/* harmony import */ var app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/features/templating/template_srv */ "./public/app/features/templating/template_srv.ts");
/* harmony import */ var app_features_variables_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/features/variables/utils */ "./public/app/features/variables/utils.ts");
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










var TestDataDataSource =
/*#__PURE__*/
function (_DataSourceApi) {
  _inherits(TestDataDataSource, _DataSourceApi);

  function TestDataDataSource(instanceSettings) {
    _classCallCheck(this, TestDataDataSource);

    return _possibleConstructorReturn(this, _getPrototypeOf(TestDataDataSource).call(this, instanceSettings));
  }

  _createClass(TestDataDataSource, [{
    key: "query",
    value: function query(options) {
      var _this = this;

      var queries = [];
      var streams = []; // Start streams and prepare queries

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = options.targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var target = _step.value;

          if (target.hide) {
            continue;
          }

          if (target.scenarioId === 'streaming_client') {
            streams.push(Object(_runStreams__WEBPACK_IMPORTED_MODULE_6__["runStream"])(target, options));
          } else if (target.scenarioId === 'grafana_api') {
            streams.push(runGrafanaAPI(target, options));
          } else if (target.scenarioId === 'arrow') {
            streams.push(runArrowFile(target, options));
          } else {
            queries.push(_objectSpread({}, target, {
              intervalMs: options.intervalMs,
              maxDataPoints: options.maxDataPoints,
              datasourceId: this.id,
              alias: app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_7__["default"].replace(target.alias || '', options.scopedVars)
            }));
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

      if (queries.length) {
        var stream = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().fetch({
          method: 'POST',
          url: '/api/tsdb/query',
          data: {
            from: options.range.from.valueOf().toString(),
            to: options.range.to.valueOf().toString(),
            queries: queries
          }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (res) {
          return _this.processQueryResult(queries, res);
        }));
        streams.push(stream);
      }

      return rxjs__WEBPACK_IMPORTED_MODULE_4__["merge"].apply(void 0, streams);
    }
  }, {
    key: "processQueryResult",
    value: function processQueryResult(queries, res) {
      var data = [];
      var error = undefined;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = queries[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var query = _step2.value;
          var results = res.data.results[query.refId];
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = (results.tables || [])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var t = _step3.value;
              var table = t;
              table.refId = query.refId;
              table.name = query.alias;

              if (query.scenarioId === 'logs') {
                lodash_set__WEBPACK_IMPORTED_MODULE_0___default()(table, 'meta.preferredVisualisationType', 'logs');
              }

              data.push(table);
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

          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = (results.series || [])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var series = _step4.value;
              data.push({
                target: series.name,
                datapoints: series.points,
                refId: query.refId,
                tags: series.tags
              });
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }

          if (results.error) {
            error = {
              message: results.error
            };
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

      return {
        data: data,
        error: error
      };
    }
  }, {
    key: "annotationQuery",
    value: function annotationQuery(options) {
      var timeWalker = options.range.from.valueOf();
      var to = options.range.to.valueOf();
      var events = [];
      var eventCount = 10;
      var step = (to - timeWalker) / eventCount;

      for (var i = 0; i < eventCount; i++) {
        events.push({
          annotation: options.annotation,
          time: timeWalker,
          text: 'This is the text, <a href="https://grafana.com">Grafana.com</a>',
          tags: ['text', 'server']
        });
        timeWalker += step;
      }

      return Promise.resolve(events);
    }
  }, {
    key: "getQueryDisplayText",
    value: function getQueryDisplayText(query) {
      if (query.alias) {
        return query.scenarioId + ' as ' + query.alias;
      }

      return query.scenarioId;
    }
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      return Promise.resolve({
        status: 'success',
        message: '数据源工作正常'
      });
    }
  }, {
    key: "getScenarios",
    value: function getScenarios() {
      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().get('/api/tsdb/testdata/scenarios');
    }
  }, {
    key: "metricFindQuery",
    value: function metricFindQuery(query, options) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          var interpolatedQuery = app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_7__["default"].replace(query, Object(app_features_variables_utils__WEBPACK_IMPORTED_MODULE_8__["getSearchFilterScopedVar"])({
            query: query,
            wildcardChar: '*',
            options: options
          }));
          var children = Object(_metricTree__WEBPACK_IMPORTED_MODULE_3__["queryMetricTree"])(interpolatedQuery);
          var items = children.map(function (item) {
            return {
              value: item.name,
              text: item.name
            };
          });
          resolve(items);
        }, 100);
      });
    }
  }]);

  return TestDataDataSource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataSourceApi"]);

function runArrowFile(target, req) {
  var data = [];

  if (target.stringInput && target.stringInput.length > 10) {
    try {
      var table = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["base64StringToArrowTable"])(target.stringInput);
      data = [Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["arrowTableToDataFrame"])(table)];
    } catch (e) {
      console.warn('Error reading saved arrow', e);
      var error = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["toDataQueryError"])(e);
      error.refId = target.refId;
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])({
        state: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["LoadingState"].Error,
        error: error,
        data: data
      });
    }
  }

  return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])({
    state: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["LoadingState"].Done,
    data: data
  });
}

function runGrafanaAPI(target, req) {
  var url = "/api/".concat(target.stringInput);
  return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().get(url).then(function (res) {
    var frame = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__["ArrayDataFrame"](res);
    return {
      state: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["LoadingState"].Done,
      data: [frame]
    };
  }));
}

/***/ }),

/***/ "./public/app/plugins/datasource/testdata/metricTree.ts":
/*!**************************************************************!*\
  !*** ./public/app/plugins/datasource/testdata/metricTree.ts ***!
  \**************************************************************/
/*! exports provided: queryMetricTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryMetricTree", function() { return queryMetricTree; });
/*
 *  Builds a nested tree like
 *  [
 *    {
 *      name: 'A',
 *      children: [
 *        { name: 'AA', children: [] },
 *        { name: 'AB', children: [] },
 *      ]
 *    }
 *  ]
 */
function buildMetricTree(parent, depth) {
  var chars = ['A', 'B', 'C'];
  var children = [];

  if (depth > 5) {
    return [];
  }

  for (var _i = 0, _chars = chars; _i < _chars.length; _i++) {
    var letter = _chars[_i];
    var nodeName = "".concat(parent).concat(letter);
    children.push({
      name: nodeName,
      children: buildMetricTree(nodeName, depth + 1)
    });
  }

  return children;
}

function queryTree(children, query, queryIndex) {
  if (queryIndex >= query.length) {
    return children;
  }

  if (query[queryIndex] === '*') {
    return children;
  }

  var nodeQuery = query[queryIndex];
  var result = [];
  var namesToMatch = [nodeQuery]; // handle glob queries

  if (nodeQuery.startsWith('{')) {
    namesToMatch = nodeQuery.replace(/\{|\}/g, '').split(',');
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var node = _step.value;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = namesToMatch[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var nameToMatch = _step2.value;

          if (nameToMatch.indexOf('*') !== -1) {
            var pattern = nameToMatch.replace('*', '');
            var regex = new RegExp("^".concat(pattern, ".*"), 'gi');

            if (regex.test(node.name)) {
              result = result.concat(queryTree([node], query, queryIndex + 1));
            }
          } else if (node.name === nameToMatch) {
            result = result.concat(queryTree(node.children, query, queryIndex + 1));
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

  return result;
}

function queryMetricTree(query) {
  if (query.indexOf('value') === 0) {
    return [{
      name: query,
      children: []
    }];
  }

  var children = buildMetricTree('', 0);
  return queryTree(children, query.split('.'), 0);
}

/***/ }),

/***/ "./public/app/plugins/datasource/testdata/module.tsx":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/testdata/module.tsx ***!
  \***********************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/testdata/datasource.ts");
/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query_ctrl */ "./public/app/plugins/datasource/testdata/query_ctrl.ts");
/* harmony import */ var _TestInfoTab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TestInfoTab */ "./public/app/plugins/datasource/testdata/TestInfoTab.tsx");
/* harmony import */ var _ConfigEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ConfigEditor */ "./public/app/plugins/datasource/testdata/ConfigEditor.tsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







var TestDataAnnotationsQueryCtrl = function TestDataAnnotationsQueryCtrl() {
  _classCallCheck(this, TestDataAnnotationsQueryCtrl);
};

TestDataAnnotationsQueryCtrl.template = '<h2>Annotation scenario</h2>';
var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_1__["TestDataDataSource"]).setConfigEditor(_ConfigEditor__WEBPACK_IMPORTED_MODULE_4__["ConfigEditor"]).setQueryCtrl(_query_ctrl__WEBPACK_IMPORTED_MODULE_2__["TestDataQueryCtrl"]).setAnnotationQueryCtrl(TestDataAnnotationsQueryCtrl).addConfigPage({
  title: '安装',
  icon: 'list-ul',
  body: _TestInfoTab__WEBPACK_IMPORTED_MODULE_3__["TestInfoTab"],
  id: 'setup'
});

/***/ }),

/***/ "./public/app/plugins/datasource/testdata/query_ctrl.ts":
/*!**************************************************************!*\
  !*** ./public/app/plugins/datasource/testdata/query_ctrl.ts ***!
  \**************************************************************/
/*! exports provided: defaultPulse, defaultCSVWave, TestDataQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultPulse", function() { return defaultPulse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultCSVWave", function() { return defaultCSVWave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestDataQueryCtrl", function() { return TestDataQueryCtrl; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
/* harmony import */ var app_plugins_sdk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/plugins/sdk */ "./public/app/plugins/sdk.ts");
/* harmony import */ var _runStreams__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./runStreams */ "./public/app/plugins/datasource/testdata/runStreams.ts");
/* harmony import */ var app_core_utils_promiseToDigest__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/utils/promiseToDigest */ "./public/app/core/utils/promiseToDigest.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var defaultPulse = {
  timeStep: 60,
  onCount: 3,
  onValue: 2,
  offCount: 3,
  offValue: 1
};
var defaultCSVWave = {
  timeStep: 60,
  valuesCSV: '0,0,2,2,1,1'
};
var showLabelsFor = ['random_walk', 'predictable_pulse', 'predictable_csv_wave'];
var TestDataQueryCtrl =
/*#__PURE__*/
function (_QueryCtrl) {
  TestDataQueryCtrl.$inject = ["$scope", "$injector"];

  _inherits(TestDataQueryCtrl, _QueryCtrl);

  /** @ngInject */
  function TestDataQueryCtrl($scope, $injector) {
    var _this;

    _classCallCheck(this, TestDataQueryCtrl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TestDataQueryCtrl).call(this, $scope, $injector));
    _this.showLabels = false;
    _this.target.scenarioId = _this.target.scenarioId || 'random_walk';
    _this.scenarioList = [];
    _this.newPointTime = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateTime"])();
    _this.selectedPoint = {
      text: 'Select point',
      value: null
    };
    _this.showLabels = showLabelsFor.includes(_this.target.scenarioId);
    _this.selectors = _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_3__["selectors"].components.DataSource.TestData.QueryTab;
    return _this;
  }

  _createClass(TestDataQueryCtrl, [{
    key: "getPoints",
    value: function getPoints() {
      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.target.points, function (point, index) {
        return {
          text: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateTime"])(point[1]).format('MMMM Do YYYY, H:mm:ss') + ' : ' + point[0],
          value: index
        };
      });
    }
  }, {
    key: "pointSelected",
    value: function pointSelected(option) {
      this.selectedPoint = option;
    }
  }, {
    key: "deletePoint",
    value: function deletePoint() {
      this.target.points.splice(this.selectedPoint.value, 1);
      this.selectedPoint = {
        text: 'Select point',
        value: null
      };
      this.refresh();
    }
  }, {
    key: "addPoint",
    value: function addPoint() {
      this.target.points = this.target.points || [];
      this.newPointTime = _grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateMath"].parse(this.newPointTime);
      this.target.points.push([this.newPointValue, this.newPointTime.valueOf()]);
      this.target.points = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.sortBy(this.target.points, function (p) {
        return p[1];
      });
      this.refresh();
    }
  }, {
    key: "$onInit",
    value: function $onInit() {
      var _this2 = this;

      return Object(app_core_utils_promiseToDigest__WEBPACK_IMPORTED_MODULE_6__["promiseToDigest"])(this.$scope)(Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get('/api/tsdb/testdata/scenarios').then(function (res) {
        _this2.scenarioList = res;
        _this2.scenario = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(_this2.scenarioList, {
          id: _this2.target.scenarioId
        });
      }));
    }
  }, {
    key: "scenarioChanged",
    value: function scenarioChanged() {
      var _this$scenario$string;

      this.scenario = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(this.scenarioList, {
        id: this.target.scenarioId
      });

      if (this.target.scenarioId === 'manual_entry') {
        this.target.points = this.target.points || [];
      } else {
        delete this.target.points;
      }

      if (this.target.scenarioId === 'streaming_client') {
        this.target.stream = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.defaults(this.target.stream || {}, _runStreams__WEBPACK_IMPORTED_MODULE_5__["defaultQuery"]);
      } else {
        delete this.target.stream;
      }

      if (this.target.scenarioId === 'predictable_pulse') {
        this.target.pulseWave = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.defaults(this.target.pulseWave || {}, defaultPulse);
      } else {
        delete this.target.pulseWave;
      }

      if (this.target.scenarioId === 'predictable_csv_wave') {
        this.target.csvWave = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.defaults(this.target.csvWave || {}, defaultCSVWave);
      } else {
        delete this.target.csvWave;
      }

      if (this.target.scenarioId === 'grafana_api') {
        this.target.stringInput = 'datasources';
      } else {
        delete this.target.stringInput;
      }

      this.target.stringInput = (_this$scenario$string = this.scenario.stringInput) !== null && _this$scenario$string !== void 0 ? _this$scenario$string : undefined;
      this.showLabels = showLabelsFor.includes(this.target.scenarioId);
      this.refresh();
    }
  }, {
    key: "streamChanged",
    value: function streamChanged() {
      this.refresh();
    }
  }]);

  return TestDataQueryCtrl;
}(app_plugins_sdk__WEBPACK_IMPORTED_MODULE_4__["QueryCtrl"]);
TestDataQueryCtrl.templateUrl = 'partials/query.editor.html';

/***/ }),

/***/ "./public/app/plugins/datasource/testdata/runStreams.ts":
/*!**************************************************************!*\
  !*** ./public/app/plugins/datasource/testdata/runStreams.ts ***!
  \**************************************************************/
/*! exports provided: defaultQuery, runStream, runSignalStream, runLogsStream, runFetchStream */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultQuery", function() { return defaultQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runStream", function() { return runStream; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runSignalStream", function() { return runSignalStream; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runLogsStream", function() { return runLogsStream; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runFetchStream", function() { return runFetchStream; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _LogIpsum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LogIpsum */ "./public/app/plugins/datasource/testdata/LogIpsum.ts");




var defaultQuery = {
  type: 'signal',
  speed: 250,
  // ms
  spread: 3.5,
  noise: 2.2,
  bands: 1
};
function runStream(target, req) {
  var query = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["defaults"])(target.stream, defaultQuery);

  if ('signal' === query.type) {
    return runSignalStream(target, query, req);
  }

  if ('logs' === query.type) {
    return runLogsStream(target, query, req);
  }

  if ('fetch' === query.type) {
    return runFetchStream(target, query, req);
  }

  throw new Error("Unknown Stream Type: ".concat(query.type));
}
function runSignalStream(target, query, req) {
  return new rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"](function (subscriber) {
    var streamId = "signal-".concat(req.panelId, "-").concat(target.refId);
    var maxDataPoints = req.maxDataPoints || 1000;
    var data = new _grafana_data__WEBPACK_IMPORTED_MODULE_2__["CircularDataFrame"]({
      append: 'tail',
      capacity: maxDataPoints
    });
    data.refId = target.refId;
    data.name = target.alias || 'Signal ' + target.refId;
    data.addField({
      name: 'time',
      type: _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].time
    });
    data.addField({
      name: 'value',
      type: _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].number
    });
    var spread = query.spread,
        speed = query.speed,
        _query$bands = query.bands,
        bands = _query$bands === void 0 ? 0 : _query$bands,
        noise = query.noise;

    for (var i = 0; i < bands; i++) {
      var suffix = bands > 1 ? " ".concat(i + 1) : '';
      data.addField({
        name: 'Min' + suffix,
        type: _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].number
      });
      data.addField({
        name: 'Max' + suffix,
        type: _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].number
      });
    }

    var value = Math.random() * 100;
    var timeoutId = null;

    var addNextRow = function addNextRow(time) {
      value += (Math.random() - 0.5) * spread;
      var idx = 0;
      data.fields[idx++].values.add(time);
      data.fields[idx++].values.add(value);
      var min = value;
      var max = value;

      for (var _i = 0; _i < bands; _i++) {
        min = min - Math.random() * noise;
        max = max + Math.random() * noise;
        data.fields[idx++].values.add(min);
        data.fields[idx++].values.add(max);
      }
    }; // Fill the buffer on init


    if (true) {
      var time = Date.now() - maxDataPoints * speed;

      for (var _i2 = 0; _i2 < maxDataPoints; _i2++) {
        addNextRow(time);
        time += speed;
      }
    }

    var pushNextEvent = function pushNextEvent() {
      addNextRow(Date.now());
      subscriber.next({
        data: [data],
        key: streamId
      });
      timeoutId = setTimeout(pushNextEvent, speed);
    }; // Send first event in 5ms


    setTimeout(pushNextEvent, 5);
    return function () {
      console.log('unsubscribing to stream ' + streamId);
      clearTimeout(timeoutId);
    };
  });
}
function runLogsStream(target, query, req) {
  return new rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"](function (subscriber) {
    var streamId = "logs-".concat(req.panelId, "-").concat(target.refId);
    var maxDataPoints = req.maxDataPoints || 1000;
    var data = new _grafana_data__WEBPACK_IMPORTED_MODULE_2__["CircularDataFrame"]({
      append: 'tail',
      capacity: maxDataPoints
    });
    data.refId = target.refId;
    data.name = target.alias || 'Logs ' + target.refId;
    data.addField({
      name: 'line',
      type: _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].string
    });
    data.addField({
      name: 'time',
      type: _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].time
    });
    data.meta = {
      preferredVisualisationType: 'logs'
    };
    var speed = query.speed;
    var timeoutId = null;

    var pushNextEvent = function pushNextEvent() {
      data.values.time.add(Date.now());
      data.values.line.add(Object(_LogIpsum__WEBPACK_IMPORTED_MODULE_3__["getRandomLine"])());
      subscriber.next({
        data: [data],
        key: streamId
      });
      timeoutId = setTimeout(pushNextEvent, speed);
    }; // Send first event in 5ms


    setTimeout(pushNextEvent, 5);
    return function () {
      console.log('unsubscribing to stream ' + streamId);
      clearTimeout(timeoutId);
    };
  });
}
function runFetchStream(target, query, req) {
  return new rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"](function (subscriber) {
    var streamId = "fetch-".concat(req.panelId, "-").concat(target.refId);
    var maxDataPoints = req.maxDataPoints || 1000;
    var data = new _grafana_data__WEBPACK_IMPORTED_MODULE_2__["CircularDataFrame"]({
      append: 'tail',
      capacity: maxDataPoints
    });
    data.refId = target.refId;
    data.name = target.alias || 'Fetch ' + target.refId;
    var reader;
    var csv = new _grafana_data__WEBPACK_IMPORTED_MODULE_2__["CSVReader"]({
      callback: {
        onHeader: function onHeader(fields) {
          // Clear any existing fields
          if (data.fields.length) {
            data = new _grafana_data__WEBPACK_IMPORTED_MODULE_2__["CircularDataFrame"]({
              append: 'tail',
              capacity: maxDataPoints
            });
            data.refId = target.refId;
            data.name = 'Fetch ' + target.refId;
          }

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var field = _step.value;
              data.addField(field);
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
        },
        onRow: function onRow(row) {
          data.add(row);
        }
      }
    });

    var processChunk = function processChunk(value) {
      if (value.value) {
        var text = new TextDecoder().decode(value.value);
        csv.readCSV(text);
      }

      subscriber.next({
        data: [data],
        key: streamId,
        state: value.done ? _grafana_data__WEBPACK_IMPORTED_MODULE_2__["LoadingState"].Done : _grafana_data__WEBPACK_IMPORTED_MODULE_2__["LoadingState"].Streaming
      });

      if (value.done) {
        console.log('Finished stream');
        subscriber.complete(); // necessary?

        return;
      }

      return reader.read().then(processChunk);
    };

    if (!query.url) {
      throw new Error('query.url is not defined');
    }

    fetch(new Request(query.url)).then(function (response) {
      if (response.body) {
        reader = response.body.getReader();
        reader.read().then(processChunk);
      }
    });
    return function () {
      // Cancel fetch?
      console.log('unsubscribing to stream ' + streamId);
    };
  });
}

/***/ })

}]);
//# sourceMappingURL=testDataDSPlugin.1ebdc265fc3bd7452fcd.js.map