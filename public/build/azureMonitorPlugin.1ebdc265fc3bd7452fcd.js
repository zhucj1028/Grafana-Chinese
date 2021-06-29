(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["azureMonitorPlugin"],{

/***/ "./public/app/core/utils/CancelablePromise.ts":
/*!****************************************************!*\
  !*** ./public/app/core/utils/CancelablePromise.ts ***!
  \****************************************************/
/*! exports provided: makePromiseCancelable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makePromiseCancelable", function() { return makePromiseCancelable; });
// https://github.com/facebook/react/issues/5465
var makePromiseCancelable = function makePromiseCancelable(promise) {
  var hasCanceled_ = false;
  var wrappedPromise = new Promise(function (resolve, reject) {
    promise.then(function (val) {
      return hasCanceled_ ? reject({
        isCanceled: true
      }) : resolve(val);
    });
    promise.catch(function (error) {
      return hasCanceled_ ? reject({
        isCanceled: true
      }) : reject(error);
    });
  });
  return {
    promise: wrappedPromise,
    cancel: function cancel() {
      hasCanceled_ = true;
    }
  };
};

/***/ }),

/***/ "./public/app/features/explore/slate-plugins/prism/index.tsx":
/*!*******************************************************************!*\
  !*** ./public/app/features/explore/slate-plugins/prism/index.tsx ***!
  \*******************************************************************/
/*! exports provided: setPrismTokens, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPrismTokens", function() { return setPrismTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PrismPlugin; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_1__);


var TOKEN_MARK = 'prism-token';
function setPrismTokens(language, field, values) {
  var alias = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'variable';
  prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.languages[language][field] = {
    alias: alias,
    pattern: new RegExp("(?:^|\\s)(".concat(values.join('|'), ")(?:$|\\s)"))
  };
}
/**
 * Code-highlighting plugin based on Prism and
 * https://github.com/ianstormtaylor/slate/blob/master/examples/code-highlighting/index.js
 *
 * (Adapted to handle nested grammar definitions.)
 */

function PrismPlugin(_ref) {
  var definition = _ref.definition,
      language = _ref.language;

  if (definition) {
    // Don't override exising modified definitions
    prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.languages[language] = prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.languages[language] || definition;
  }

  return {
    /**
     * Render a Slate mark with appropiate CSS class names
     *
     * @param {Object} props
     * @return {Element}
     */
    renderDecoration: function renderDecoration(props, editor, next) {
      var children = props.children,
          decoration = props.decoration; // Only apply spans to marks identified by this plugin

      if (decoration.type !== TOKEN_MARK) {
        return next();
      }

      var className = "token ".concat(decoration.data.get('types'));
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: className
      }, children);
    },

    /**
     * Decorate code blocks with Prism.js highlighting.
     *
     * @param {Node} node
     * @return {Array}
     */
    decorateNode: function decorateNode(node, editor, next) {
      if (node.type !== 'paragraph') {
        return [];
      }

      var texts = node.getTexts().toArray();
      var tstring = texts.map(function (t) {
        return t.text;
      }).join('\n');
      var grammar = prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.languages[language];
      var tokens = prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.tokenize(tstring, grammar);
      var decorations = [];
      var startText = texts.shift();
      var endText = startText;
      var startOffset = 0;
      var endOffset = 0;
      var start = 0;

      function processToken(token, acc) {
        // Accumulate token types down the tree
        var types = "".concat(acc || '', " ").concat(token.type || '', " ").concat(token.alias || ''); // Add mark for token node

        if (typeof token === 'string' || typeof token.content === 'string') {
          startText = endText;
          startOffset = endOffset;
          var content = typeof token === 'string' ? token : token.content;
          var newlines = content.split('\n').length - 1;
          var length = content.length - newlines;
          var end = start + length;
          var available = startText.text.length - startOffset;
          var remaining = length;
          endOffset = startOffset + remaining;

          while (available < remaining) {
            endText = texts.shift();
            remaining = length - available;
            available = endText.text.length;
            endOffset = remaining;
          } // Inject marks from up the tree (acc) as well


          if (typeof token !== 'string' || acc) {
            var range = node.createDecoration({
              anchor: {
                key: startText.key,
                offset: startOffset
              },
              focus: {
                key: endText.key,
                offset: endOffset
              },
              type: TOKEN_MARK,
              data: {
                types: types
              }
            });
            decorations.push(range);
          }

          start = end;
        } else if (token.content && token.content.length) {
          // Tokens can be nested
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = token.content[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var subToken = _step.value;
              processToken(subToken, types);
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
      } // Process top-level tokens


      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = tokens[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var token = _step2.value;
          processToken(token);
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

      return decorations;
    }
  };
}

/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/annotations_query_ctrl.ts":
/*!**************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/annotations_query_ctrl.ts ***!
  \**************************************************************************************************/
/*! exports provided: AzureMonitorAnnotationsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AzureMonitorAnnotationsQueryCtrl", function() { return AzureMonitorAnnotationsQueryCtrl; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AzureMonitorAnnotationsQueryCtrl =
/*#__PURE__*/
function () {
  AzureMonitorAnnotationsQueryCtrl.$inject = ["templateSrv"];

  /** @ngInject */
  function AzureMonitorAnnotationsQueryCtrl(templateSrv) {
    var _this = this;

    _classCallCheck(this, AzureMonitorAnnotationsQueryCtrl);

    this.templateSrv = templateSrv;
    this.defaultQuery = '<your table>\n| where $__timeFilter() \n| project TimeGenerated, Text=YourTitleColumn, Tags="tag1,tag2"';

    this.getAzureLogAnalyticsSchema = function () {
      return _this.getWorkspaces().then(function () {
        return _this.datasource.azureLogAnalyticsDatasource.getSchema(_this.annotation.workspace);
      }).catch(function () {});
    };

    this.onSubscriptionChange = function () {
      _this.getWorkspaces(true);
    };

    this.onLogAnalyticsQueryChange = function (nextQuery) {
      _this.annotation.rawQuery = nextQuery;
    };

    this.annotation.queryType = this.annotation.queryType || 'Azure Log Analytics';
    this.annotation.rawQuery = this.annotation.rawQuery || this.defaultQuery;
    this.initDropdowns();
  }

  _createClass(AzureMonitorAnnotationsQueryCtrl, [{
    key: "initDropdowns",
    value: function () {
      var _initDropdowns = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getSubscriptions();

              case 2:
                _context.next = 4;
                return this.getWorkspaces();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initDropdowns() {
        return _initDropdowns.apply(this, arguments);
      }

      return initDropdowns;
    }()
  }, {
    key: "getSubscriptions",
    value: function () {
      var _getSubscriptions = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.datasource.azureMonitorDatasource.isConfigured()) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                return _context2.abrupt("return", this.datasource.azureMonitorDatasource.getSubscriptions().then(function (subs) {
                  _this2.subscriptions = subs;

                  if (!_this2.annotation.subscription && _this2.annotation.queryType === 'Azure Log Analytics') {
                    _this2.annotation.subscription = _this2.datasource.azureLogAnalyticsDatasource.subscriptionId;
                  }

                  if (!_this2.annotation.subscription && _this2.subscriptions.length > 0) {
                    _this2.annotation.subscription = _this2.subscriptions[0].value;
                  }
                }));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getSubscriptions() {
        return _getSubscriptions.apply(this, arguments);
      }

      return getSubscriptions;
    }()
  }, {
    key: "getWorkspaces",
    value: function () {
      var _getWorkspaces = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(bustCache) {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!bustCache && this.workspaces && this.workspaces.length > 0)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", this.workspaces);

              case 2:
                return _context3.abrupt("return", this.datasource.getAzureLogAnalyticsWorkspaces(this.annotation.subscription).then(function (list) {
                  _this3.workspaces = list;

                  if (list.length > 0 && !_this3.annotation.workspace) {
                    _this3.annotation.workspace = list[0].value;
                  }

                  return _this3.workspaces;
                }).catch(function () {}));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getWorkspaces(_x) {
        return _getWorkspaces.apply(this, arguments);
      }

      return getWorkspaces;
    }()
  }, {
    key: "templateVariables",
    get: function get() {
      return this.templateSrv.getVariables().map(function (t) {
        return '$' + t.name;
      });
    }
  }]);

  return AzureMonitorAnnotationsQueryCtrl;
}();
AzureMonitorAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';

/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/app_insights/app_insights_datasource.ts":
/*!****************************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/app_insights/app_insights_datasource.ts ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AppInsightsDatasource; });
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _time_grain_converter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../time_grain_converter */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/time_grain_converter.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/types.ts");
/* harmony import */ var _response_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./response_parser */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/app_insights/response_parser.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var AppInsightsDatasource =
/*#__PURE__*/
function (_DataSourceWithBacken) {
  _inherits(AppInsightsDatasource, _DataSourceWithBacken);

  function AppInsightsDatasource(instanceSettings) {
    var _instanceSettings$jso;

    var _this;

    _classCallCheck(this, AppInsightsDatasource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AppInsightsDatasource).call(this, instanceSettings));
    _this.version = 'beta';
    _this.logAnalyticsColumns = {};
    _this.applicationId = instanceSettings.jsonData.appInsightsAppId || '';

    switch ((_instanceSettings$jso = instanceSettings.jsonData) === null || _instanceSettings$jso === void 0 ? void 0 : _instanceSettings$jso.cloudName) {
      // Azure US Government
      case 'govazuremonitor':
        break;
      // Azure Germany

      case 'germanyazuremonitor':
        break;
      // Azue China

      case 'chinaazuremonitor':
        _this.baseUrl = "/chinaappinsights/".concat(_this.version, "/apps/").concat(_this.applicationId);
        break;
      // Azure Global

      default:
        _this.baseUrl = "/appinsights/".concat(_this.version, "/apps/").concat(_this.applicationId);
    }

    _this.url = instanceSettings.url || '';
    return _this;
  }

  _createClass(AppInsightsDatasource, [{
    key: "isConfigured",
    value: function isConfigured() {
      return !!this.applicationId && this.applicationId.length > 0;
    }
  }, {
    key: "createRawQueryRequest",
    value: function createRawQueryRequest(item, options, target) {
      if (item.xaxis && !item.timeColumn) {
        item.timeColumn = item.xaxis;
      }

      if (item.yaxis && !item.valueColumn) {
        item.valueColumn = item.yaxis;
      }

      if (item.spliton && !item.segmentColumn) {
        item.segmentColumn = item.spliton;
      }

      return {
        type: 'timeSeriesQuery',
        raw: false,
        appInsights: {
          rawQuery: true,
          rawQueryString: Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getTemplateSrv"])().replace(item.rawQueryString, options.scopedVars),
          timeColumn: item.timeColumn,
          valueColumn: item.valueColumn,
          segmentColumn: item.segmentColumn
        }
      };
    }
  }, {
    key: "applyTemplateVariables",
    value: function applyTemplateVariables(target, scopedVars) {
      var item = target.appInsights;
      var old = item; // fix for timeGrainUnit which is a deprecated/removed field name

      if (old.timeGrainCount) {
        item.timeGrain = _time_grain_converter__WEBPACK_IMPORTED_MODULE_2__["default"].createISO8601Duration(old.timeGrainCount, item.timeGrainUnit);
      } else if (item.timeGrainUnit && item.timeGrain !== 'auto') {
        item.timeGrain = _time_grain_converter__WEBPACK_IMPORTED_MODULE_2__["default"].createISO8601Duration(item.timeGrain, item.timeGrainUnit);
      } // migration for non-standard names


      if (old.groupBy && !item.dimension) {
        item.dimension = [old.groupBy];
      }

      if (old.filter && !item.dimensionFilter) {
        item.dimensionFilter = old.filter;
      } // Migrate single dimension string to array


      if (Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isString"])(item.dimension)) {
        if (item.dimension === 'None') {
          item.dimension = [];
        } else {
          item.dimension = [item.dimension];
        }
      }

      if (!item.dimension) {
        item.dimension = [];
      }

      var templateSrv = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getTemplateSrv"])();
      return {
        type: 'timeSeriesQuery',
        refId: target.refId,
        format: target.format,
        queryType: _types__WEBPACK_IMPORTED_MODULE_3__["AzureQueryType"].ApplicationInsights,
        appInsights: {
          timeGrain: templateSrv.replace((item.timeGrain || '').toString(), scopedVars),
          allowedTimeGrainsMs: item.allowedTimeGrainsMs,
          metricName: templateSrv.replace(item.metricName, scopedVars),
          aggregation: templateSrv.replace(item.aggregation, scopedVars),
          dimension: item.dimension.map(function (d) {
            return templateSrv.replace(d, scopedVars);
          }),
          dimensionFilter: templateSrv.replace(item.dimensionFilter, scopedVars),
          alias: item.alias,
          format: target.format
        }
      };
    }
    /**
     * This is named differently than DataSourceApi.metricFindQuery
     * because it's not exposed to Grafana like the main AzureMonitorDataSource.
     * And some of the azure internal data sources return null in this function, which the
     * external interface does not support
     */

  }, {
    key: "metricFindQueryInternal",
    value: function metricFindQueryInternal(query) {
      var appInsightsMetricNameQuery = query.match(/^AppInsightsMetricNames\(\)/i);

      if (appInsightsMetricNameQuery) {
        return this.getMetricNames();
      }

      var appInsightsGroupByQuery = query.match(/^AppInsightsGroupBys\(([^\)]+?)(,\s?([^,]+?))?\)/i);

      if (appInsightsGroupByQuery) {
        var metricName = appInsightsGroupByQuery[1];
        return this.getGroupBys(Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getTemplateSrv"])().replace(metricName));
      }

      return null;
    }
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      var url = "".concat(this.baseUrl, "/metrics/metadata");
      return this.doRequest(url).then(function (response) {
        if (response.status === 200) {
          return {
            status: 'success',
            message: 'Successfully queried the Application Insights service.',
            title: 'Success'
          };
        }

        return {
          status: 'error',
          message: 'Application Insights: Returned http status code ' + response.status
        };
      }).catch(function (error) {
        var message = 'Application Insights: ';
        message += error.statusText ? error.statusText + ': ' : '';

        if (error.data && error.data.error && error.data.error.code === 'PathNotFoundError') {
          message += 'Invalid Application Id for Application Insights service.';
        } else if (error.data && error.data.error) {
          message += error.data.error.code + '. ' + error.data.error.message;
        } else {
          message += 'Cannot connect to Application Insights REST API.';
        }

        return {
          status: 'error',
          message: message
        };
      });
    }
  }, {
    key: "doRequest",
    value: function doRequest(url) {
      var _this2 = this;

      var maxRetries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().datasourceRequest({
        url: this.url + url,
        method: 'GET'
      }).catch(function (error) {
        if (maxRetries > 0) {
          return _this2.doRequest(url, maxRetries - 1);
        }

        throw error;
      });
    }
  }, {
    key: "getMetricNames",
    value: function getMetricNames() {
      var url = "".concat(this.baseUrl, "/metrics/metadata");
      return this.doRequest(url).then(_response_parser__WEBPACK_IMPORTED_MODULE_4__["default"].parseMetricNames);
    }
  }, {
    key: "getMetricMetadata",
    value: function getMetricMetadata(metricName) {
      var url = "".concat(this.baseUrl, "/metrics/metadata");
      return this.doRequest(url).then(function (result) {
        return new _response_parser__WEBPACK_IMPORTED_MODULE_4__["default"](result).parseMetadata(metricName);
      });
    }
  }, {
    key: "getGroupBys",
    value: function getGroupBys(metricName) {
      return this.getMetricMetadata(metricName).then(function (result) {
        return new _response_parser__WEBPACK_IMPORTED_MODULE_4__["default"](result).parseGroupBys();
      });
    }
  }, {
    key: "getQuerySchema",
    value: function getQuerySchema() {
      var url = "".concat(this.baseUrl, "/query/schema");
      return this.doRequest(url).then(function (result) {
        var schema = new _response_parser__WEBPACK_IMPORTED_MODULE_4__["default"](result).parseQuerySchema(); // console.log(schema);

        return schema;
      });
    }
  }]);

  return AppInsightsDatasource;
}(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["DataSourceWithBackend"]);



/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/app_insights/response_parser.ts":
/*!********************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/app_insights/response_parser.ts ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ResponseParser; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var ResponseParser =
/*#__PURE__*/
function () {
  function ResponseParser(results) {
    _classCallCheck(this, ResponseParser);

    this.results = results;
  }

  _createClass(ResponseParser, [{
    key: "parseQueryResult",
    value: function parseQueryResult() {
      var data = [];
      var columns = [];

      for (var i = 0; i < this.results.length; i++) {
        if (this.results[i].query.raw) {
          var xaxis = this.results[i].query.xaxis;
          var yaxises = this.results[i].query.yaxis;
          var spliton = this.results[i].query.spliton;
          columns = this.results[i].result.data.Tables[0].Columns;
          var rows = this.results[i].result.data.Tables[0].Rows;
          data = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.concat(data, this.parseRawQueryResultRow(this.results[i].query, columns, rows, xaxis, yaxises, spliton));
        } else {
          var value = this.results[i].result.data.value;
          var alias = this.results[i].query.alias;
          data = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.concat(data, this.parseQueryResultRow(this.results[i].query, value, alias));
        }
      }

      return data;
    }
  }, {
    key: "parseRawQueryResultRow",
    value: function parseRawQueryResultRow(query, columns, rows, xaxis, yaxises, spliton) {
      var data = [];

      var columnsForDropdown = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(columns, function (column) {
        return {
          text: column.ColumnName,
          value: column.ColumnName
        };
      });

      var xaxisColumn = columns.findIndex(function (column) {
        return column.ColumnName === xaxis;
      });
      var yaxisesSplit = yaxises.split(',');
      var yaxisColumns = {};

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(yaxisesSplit, function (yaxis) {
        yaxisColumns[yaxis] = columns.findIndex(function (column) {
          return column.ColumnName === yaxis;
        });
      });

      var splitonColumn = columns.findIndex(function (column) {
        return column.ColumnName === spliton;
      });
      var convertTimestamp = xaxis === 'timestamp';

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(rows, function (row) {
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(yaxisColumns, function (yaxisColumn, yaxisName) {
          var bucket = splitonColumn === -1 ? ResponseParser.findOrCreateBucket(data, yaxisName) : ResponseParser.findOrCreateBucket(data, row[splitonColumn]);
          var epoch = convertTimestamp ? ResponseParser.dateTimeToEpoch(row[xaxisColumn]) : row[xaxisColumn];
          bucket.datapoints.push([row[yaxisColumn], epoch]);
          bucket.refId = query.refId;
          bucket.query = query.query;
          bucket.columnsForDropdown = columnsForDropdown;
        });
      });

      return data;
    }
  }, {
    key: "parseQueryResultRow",
    value: function parseQueryResultRow(query, value, alias) {
      var data = [];

      if (ResponseParser.isSingleValue(value)) {
        var metricName = ResponseParser.getMetricFieldKey(value);
        var aggField = ResponseParser.getKeyForAggregationField(value[metricName]);
        var epoch = ResponseParser.dateTimeToEpoch(value.end);
        data.push({
          target: metricName,
          datapoints: [[value[metricName][aggField], epoch]],
          refId: query.refId,
          query: query.query
        });
        return data;
      }

      var groupedBy = ResponseParser.hasSegmentsField(value.segments[0]);

      if (!groupedBy) {
        var _metricName = ResponseParser.getMetricFieldKey(value.segments[0]);

        var dataTarget = ResponseParser.findOrCreateBucket(data, _metricName);

        for (var i = 0; i < value.segments.length; i++) {
          var _epoch = ResponseParser.dateTimeToEpoch(value.segments[i].end);

          var _aggField = ResponseParser.getKeyForAggregationField(value.segments[i][_metricName]);

          dataTarget.datapoints.push([value.segments[i][_metricName][_aggField], _epoch]);
        }

        dataTarget.refId = query.refId;
        dataTarget.query = query.query;
      } else {
        for (var _i = 0; _i < value.segments.length; _i++) {
          var _epoch2 = ResponseParser.dateTimeToEpoch(value.segments[_i].end);

          for (var j = 0; j < value.segments[_i].segments.length; j++) {
            var _metricName2 = ResponseParser.getMetricFieldKey(value.segments[_i].segments[j]);

            var _aggField2 = ResponseParser.getKeyForAggregationField(value.segments[_i].segments[j][_metricName2]);

            var target = this.getTargetName(value.segments[_i].segments[j], alias);
            var bucket = ResponseParser.findOrCreateBucket(data, target);
            bucket.datapoints.push([value.segments[_i].segments[j][_metricName2][_aggField2], _epoch2]);
            bucket.refId = query.refId;
            bucket.meta = {
              query: query.query
            };
          }
        }
      }

      return data;
    }
  }, {
    key: "getTargetName",
    value: function getTargetName(segment, alias) {
      var metric = '';
      var segmentName = '';
      var segmentValue = '';

      for (var prop in segment) {
        if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(segment[prop])) {
          metric = prop;
        } else {
          segmentName = prop;
          segmentValue = segment[prop];
        }
      }

      if (alias) {
        var regex = /\{\{([\s\S]+?)\}\}/g;
        return alias.replace(regex, function (match, g1, g2) {
          var group = g1 || g2;

          if (group === 'metric') {
            return metric;
          } else if (group === 'groupbyname') {
            return segmentName;
          } else if (group === 'groupbyvalue') {
            return segmentValue;
          }

          return match;
        });
      }

      return metric + "{".concat(segmentName, "=\"").concat(segmentValue, "\"}");
    }
  }, {
    key: "parseMetadata",
    value: function parseMetadata(metricName) {
      var metric = this.results.data.metrics[metricName];

      if (!metric) {
        throw Error('找不到指标数据: ' + metricName);
      }

      return {
        primaryAggType: metric.defaultAggregation,
        supportedAggTypes: metric.supportedAggregations,
        supportedGroupBy: metric.supportedGroupBy.all
      };
    }
  }, {
    key: "parseGroupBys",
    value: function parseGroupBys() {
      return ResponseParser.toTextValueList(this.results.supportedGroupBy);
    }
  }, {
    key: "parseQuerySchema",
    value: function parseQuerySchema() {
      var result = {
        Type: 'AppInsights',
        Tables: {}
      };

      if (this.results && this.results.data && this.results.data.Tables) {
        for (var i = 0; i < this.results.data.Tables[0].Rows.length; i++) {
          var column = this.results.data.Tables[0].Rows[i];
          var columnTable = column[0];
          var columnName = column[1];
          var columnType = column[2];

          if (result.Tables[columnTable]) {
            result.Tables[columnTable].OrderedColumns.push({
              Name: columnName,
              Type: columnType
            });
          } else {
            result.Tables[columnTable] = {
              Name: columnTable,
              OrderedColumns: [{
                Name: columnName,
                Type: columnType
              }]
            };
          }
        }
      }

      return result;
    }
  }], [{
    key: "isSingleValue",
    value: function isSingleValue(value) {
      return !ResponseParser.hasSegmentsField(value);
    }
  }, {
    key: "findOrCreateBucket",
    value: function findOrCreateBucket(data, target) {
      var dataTarget = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(data, ['target', target]);

      if (!dataTarget) {
        dataTarget = {
          target: target,
          datapoints: []
        };
        data.push(dataTarget);
      }

      return dataTarget;
    }
  }, {
    key: "hasSegmentsField",
    value: function hasSegmentsField(obj) {
      var keys = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(obj);

      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.indexOf(keys, 'segments') > -1;
    }
  }, {
    key: "getMetricFieldKey",
    value: function getMetricFieldKey(segment) {
      var keys = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(segment);

      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.without(keys, 'start', 'end'), function (key) {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(segment[key]);
      })[0];
    }
  }, {
    key: "getKeyForAggregationField",
    value: function getKeyForAggregationField(dataObj) {
      var keys = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(dataObj);

      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.intersection(keys, ['sum', 'avg', 'min', 'max', 'count', 'unique'])[0];
    }
  }, {
    key: "dateTimeToEpoch",
    value: function dateTimeToEpoch(dateTimeValue) {
      return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["dateTime"])(dateTimeValue).valueOf();
    }
  }, {
    key: "parseMetricNames",
    value: function parseMetricNames(result) {
      var keys = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(result.data.metrics);

      return ResponseParser.toTextValueList(keys);
    }
  }, {
    key: "toTextValueList",
    value: function toTextValueList(values) {
      var list = [];

      for (var i = 0; i < values.length; i++) {
        list.push({
          text: values[i],
          value: values[i]
        });
      }

      return list;
    }
  }]);

  return ResponseParser;
}();



/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_log_analytics/azure_log_analytics_datasource.ts":
/*!******************************************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_log_analytics/azure_log_analytics_datasource.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AzureLogAnalyticsDatasource; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_analytics_querystring_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../log_analytics/querystring_builder */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/log_analytics/querystring_builder.ts");
/* harmony import */ var _response_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./response_parser */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_log_analytics/response_parser.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/types.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var AzureLogAnalyticsDatasource =
/*#__PURE__*/
function (_DataSourceWithBacken) {
  _inherits(AzureLogAnalyticsDatasource, _DataSourceWithBacken);

  function AzureLogAnalyticsDatasource(instanceSettings) {
    var _this;

    _classCallCheck(this, AzureLogAnalyticsDatasource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AzureLogAnalyticsDatasource).call(this, instanceSettings));
    _this.instanceSettings = instanceSettings;
    _this.cache = new Map();

    switch (_this.instanceSettings.jsonData.cloudName) {
      case 'govazuremonitor':
        // Azure US Government
        _this.baseUrl = '/govloganalyticsazure';
        break;

      case 'germanyazuremonitor':
        // Azure Germany
        break;

      case 'chinaazuremonitor':
        // Azure China
        _this.baseUrl = '/chinaloganalyticsazure';
        break;

      default:
        // Azure Global
        _this.baseUrl = '/loganalyticsazure';
    }

    _this.url = instanceSettings.url || '';
    _this.defaultOrFirstWorkspace = _this.instanceSettings.jsonData.logAnalyticsDefaultWorkspace || '';

    _this.setWorkspaceUrl();

    return _this;
  }

  _createClass(AzureLogAnalyticsDatasource, [{
    key: "isConfigured",
    value: function isConfigured() {
      return !!this.instanceSettings.jsonData.logAnalyticsSubscriptionId && this.instanceSettings.jsonData.logAnalyticsSubscriptionId.length > 0 || !!this.instanceSettings.jsonData.azureLogAnalyticsSameAs;
    }
  }, {
    key: "setWorkspaceUrl",
    value: function setWorkspaceUrl() {
      if (!!this.instanceSettings.jsonData.subscriptionId || !!this.instanceSettings.jsonData.azureLogAnalyticsSameAs) {
        this.subscriptionId = this.instanceSettings.jsonData.subscriptionId;
        var azureCloud = this.instanceSettings.jsonData.cloudName || 'azuremonitor';
        this.azureMonitorUrl = "/".concat(azureCloud, "/subscriptions");
      } else {
        this.subscriptionId = this.instanceSettings.jsonData.logAnalyticsSubscriptionId || '';

        switch (this.instanceSettings.jsonData.cloudName) {
          case 'govazuremonitor':
            // Azure US Government
            this.azureMonitorUrl = "/govworkspacesloganalytics/subscriptions";
            break;

          case 'germanyazuremonitor':
            // Azure Germany
            break;

          case 'chinaazuremonitor':
            // Azure China
            this.azureMonitorUrl = "/chinaworkspacesloganalytics/subscriptions";
            break;

          default:
            // Azure Global
            this.azureMonitorUrl = "/workspacesloganalytics/subscriptions";
        }
      }
    }
  }, {
    key: "getWorkspaces",
    value: function () {
      var _getWorkspaces = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(subscription) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getWorkspaceList(subscription);

              case 2:
                response = _context.sent;
                return _context.abrupt("return", lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(response.data.value, function (val) {
                  return {
                    text: val.name,
                    value: val.properties.customerId
                  };
                }) || []);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getWorkspaces(_x) {
        return _getWorkspaces.apply(this, arguments);
      }

      return getWorkspaces;
    }()
  }, {
    key: "getWorkspaceList",
    value: function getWorkspaceList(subscription) {
      var subscriptionId = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getTemplateSrv"])().replace(subscription || this.subscriptionId);
      var workspaceListUrl = this.azureMonitorUrl + "/".concat(subscriptionId, "/providers/Microsoft.OperationalInsights/workspaces?api-version=2017-04-26-preview");
      return this.doRequest(workspaceListUrl, true);
    }
  }, {
    key: "getSchema",
    value: function getSchema(workspace) {
      if (!workspace) {
        return Promise.resolve();
      }

      var url = "".concat(this.baseUrl, "/").concat(Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getTemplateSrv"])().replace(workspace, {}), "/metadata");
      return this.doRequest(url).then(function (response) {
        return new _response_parser__WEBPACK_IMPORTED_MODULE_2__["default"](response.data).parseSchemaResult();
      });
    }
  }, {
    key: "applyTemplateVariables",
    value: function applyTemplateVariables(target, scopedVars) {
      var item = target.azureLogAnalytics;
      var templateSrv = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getTemplateSrv"])();
      var workspace = templateSrv.replace(item.workspace, scopedVars);

      if (!workspace && this.defaultOrFirstWorkspace) {
        workspace = this.defaultOrFirstWorkspace;
      }

      var subscriptionId = templateSrv.replace(target.subscription || this.subscriptionId, scopedVars);
      var query = templateSrv.replace(item.query, scopedVars, this.interpolateVariable);
      return {
        refId: target.refId,
        format: target.format,
        queryType: _types__WEBPACK_IMPORTED_MODULE_3__["AzureQueryType"].LogAnalytics,
        subscriptionId: subscriptionId,
        azureLogAnalytics: {
          resultFormat: item.resultFormat,
          query: query,
          workspace: workspace
        }
      };
    }
    /**
     * Augment the results with links back to the azure console
     */

  }, {
    key: "query",
    value: function query(request) {
      var _this2 = this;

      return _get(_getPrototypeOf(AzureLogAnalyticsDatasource.prototype), "query", this).call(this, request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["mergeMap"])(function (res) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["from"])(_this2.processResponse(res));
      }));
    }
  }, {
    key: "processResponse",
    value: function () {
      var _processResponse = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(res) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _df$meta, _df$meta$custom, df, encodedQuery, url, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, field;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!res.data) {
                  _context2.next = 50;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 4;
                _iterator = res.data[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 36;
                  break;
                }

                df = _step.value;
                encodedQuery = (_df$meta = df.meta) === null || _df$meta === void 0 ? void 0 : (_df$meta$custom = _df$meta.custom) === null || _df$meta$custom === void 0 ? void 0 : _df$meta$custom.encodedQuery;

                if (!(encodedQuery && encodedQuery.length > 0)) {
                  _context2.next = 33;
                  break;
                }

                _context2.next = 12;
                return this.buildDeepLink(df.meta.custom);

              case 12:
                url = _context2.sent;

                if (!(url === null || url === void 0 ? void 0 : url.length)) {
                  _context2.next = 33;
                  break;
                }

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 17;

                for (_iterator2 = df.fields[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  field = _step2.value;
                  field.config.links = [{
                    url: url,
                    title: 'View in Azure Portal',
                    targetBlank: true
                  }];
                }

                _context2.next = 25;
                break;

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](17);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t0;

              case 25:
                _context2.prev = 25;
                _context2.prev = 26;

                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }

              case 28:
                _context2.prev = 28;

                if (!_didIteratorError2) {
                  _context2.next = 31;
                  break;
                }

                throw _iteratorError2;

              case 31:
                return _context2.finish(28);

              case 32:
                return _context2.finish(25);

              case 33:
                _iteratorNormalCompletion = true;
                _context2.next = 6;
                break;

              case 36:
                _context2.next = 42;
                break;

              case 38:
                _context2.prev = 38;
                _context2.t1 = _context2["catch"](4);
                _didIteratorError = true;
                _iteratorError = _context2.t1;

              case 42:
                _context2.prev = 42;
                _context2.prev = 43;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 45:
                _context2.prev = 45;

                if (!_didIteratorError) {
                  _context2.next = 48;
                  break;
                }

                throw _iteratorError;

              case 48:
                return _context2.finish(45);

              case 49:
                return _context2.finish(42);

              case 50:
                return _context2.abrupt("return", res);

              case 51:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 38, 42, 50], [17, 21, 25, 33], [26,, 28, 32], [43,, 45, 49]]);
      }));

      function processResponse(_x2) {
        return _processResponse.apply(this, arguments);
      }

      return processResponse;
    }()
  }, {
    key: "buildDeepLink",
    value: function () {
      var _buildDeepLink = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(customMeta) {
        var base64Enc, workspaceId, subscription, details, url;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                base64Enc = encodeURIComponent(customMeta.encodedQuery);
                workspaceId = customMeta.workspace;
                subscription = customMeta.subscription;
                _context3.next = 5;
                return this.getWorkspaceDetails(workspaceId);

              case 5:
                details = _context3.sent;

                if (!(!details.workspace || !details.resourceGroup)) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", '');

              case 8:
                url = "https://portal.azure.com/#blade/Microsoft_OperationsManagementSuite_Workspace/" + "AnalyticsBlade/initiator/AnalyticsShareLinkToQuery/isQueryEditorVisible/true/scope/" + "%7B%22resources%22%3A%5B%7B%22resourceId%22%3A%22%2Fsubscriptions%2F".concat(subscription) + "%2Fresourcegroups%2F".concat(details.resourceGroup, "%2Fproviders%2Fmicrosoft.operationalinsights%2Fworkspaces%2F").concat(details.workspace) + "%22%7D%5D%7D/query/".concat(base64Enc, "/isQueryBase64Compressed/true/timespanInIsoFormat/P1D");
                return _context3.abrupt("return", url);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function buildDeepLink(_x3) {
        return _buildDeepLink.apply(this, arguments);
      }

      return buildDeepLink;
    }()
  }, {
    key: "getWorkspaceDetails",
    value: function () {
      var _getWorkspaceDetails = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(workspaceId) {
        var response, details, regex, results;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.getWorkspaceList(this.subscriptionId);

              case 2:
                response = _context4.sent;
                details = response.data.value.find(function (o) {
                  return o.properties.customerId === workspaceId;
                });

                if (details) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", {});

              case 6:
                regex = /.*resourcegroups\/(.*)\/providers.*/;
                results = regex.exec(details.id);

                if (!(!results || results.length < 2)) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt("return", {});

              case 10:
                return _context4.abrupt("return", {
                  workspace: details.name,
                  resourceGroup: results[1]
                });

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getWorkspaceDetails(_x4) {
        return _getWorkspaceDetails.apply(this, arguments);
      }

      return getWorkspaceDetails;
    }()
    /**
     * This is named differently than DataSourceApi.metricFindQuery
     * because it's not exposed to Grafana like the main AzureMonitorDataSource.
     * And some of the azure internal data sources return null in this function, which the
     * external interface does not support
     */

  }, {
    key: "metricFindQueryInternal",
    value: function metricFindQueryInternal(query) {
      var _this3 = this;

      var workspacesQuery = query.match(/^workspaces\(\)/i);

      if (workspacesQuery) {
        return this.getWorkspaces(this.subscriptionId);
      }

      var workspacesQueryWithSub = query.match(/^workspaces\(["']?([^\)]+?)["']?\)/i);

      if (workspacesQueryWithSub) {
        return this.getWorkspaces((workspacesQueryWithSub[1] || '').trim());
      }

      return this.getDefaultOrFirstWorkspace().then(function (workspace) {
        var queries = _this3.buildQuery(query, null, workspace);

        var promises = _this3.doQueries(queries);

        return Promise.all(promises).then(function (results) {
          return new _response_parser__WEBPACK_IMPORTED_MODULE_2__["default"](results).parseToVariables();
        }).catch(function (err) {
          if (err.error && err.error.data && err.error.data.error && err.error.data.error.innererror && err.error.data.error.innererror.innererror) {
            throw {
              message: err.error.data.error.innererror.innererror.message
            };
          } else if (err.error && err.error.data && err.error.data.error) {
            throw {
              message: err.error.data.error.message
            };
          }
        });
      });
    }
  }, {
    key: "buildQuery",
    value: function buildQuery(query, options, workspace) {
      var querystringBuilder = new _log_analytics_querystring_builder__WEBPACK_IMPORTED_MODULE_1__["default"](Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getTemplateSrv"])().replace(query, {}, this.interpolateVariable), options, 'TimeGenerated');
      var querystring = querystringBuilder.generate().uriString;
      var url = "".concat(this.baseUrl, "/").concat(workspace, "/query?").concat(querystring);
      var queries = [];
      queries.push({
        datasourceId: this.id,
        url: url,
        resultFormat: 'table'
      });
      return queries;
    }
  }, {
    key: "interpolateVariable",
    value: function interpolateVariable(value, variable) {
      if (typeof value === 'string') {
        if (variable.multi || variable.includeAll) {
          return "'" + value + "'";
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

        return "'" + val + "'";
      });

      return quotedValues.join(',');
    }
  }, {
    key: "getDefaultOrFirstWorkspace",
    value: function getDefaultOrFirstWorkspace() {
      var _this4 = this;

      if (this.defaultOrFirstWorkspace) {
        return Promise.resolve(this.defaultOrFirstWorkspace);
      }

      return this.getWorkspaces(this.subscriptionId).then(function (workspaces) {
        _this4.defaultOrFirstWorkspace = workspaces[0].value;
        return _this4.defaultOrFirstWorkspace;
      });
    }
  }, {
    key: "annotationQuery",
    value: function annotationQuery(options) {
      if (!options.annotation.rawQuery) {
        return Promise.reject({
          message: 'Query missing in annotation definition'
        });
      }

      var queries = this.buildQuery(options.annotation.rawQuery, options, options.annotation.workspace);
      var promises = this.doQueries(queries);
      return Promise.all(promises).then(function (results) {
        var annotations = new _response_parser__WEBPACK_IMPORTED_MODULE_2__["default"](results).transformToAnnotations(options);
        return annotations;
      });
    }
  }, {
    key: "doQueries",
    value: function doQueries(queries) {
      var _this5 = this;

      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(queries, function (query) {
        return _this5.doRequest(query.url).then(function (result) {
          return {
            result: result,
            query: query
          };
        }).catch(function (err) {
          throw {
            error: err,
            query: query
          };
        });
      });
    }
  }, {
    key: "doRequest",
    value: function () {
      var _doRequest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(url) {
        var useCache,
            maxRetries,
            res,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                useCache = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : false;
                maxRetries = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : 1;
                _context5.prev = 2;

                if (!(useCache && this.cache.has(url))) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return", this.cache.get(url));

              case 5:
                _context5.next = 7;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getBackendSrv"])().datasourceRequest({
                  url: this.url + url,
                  method: 'GET'
                });

              case 7:
                res = _context5.sent;

                if (useCache) {
                  this.cache.set(url, res);
                }

                return _context5.abrupt("return", res);

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](2);

                if (!(maxRetries > 0)) {
                  _context5.next = 16;
                  break;
                }

                return _context5.abrupt("return", this.doRequest(url, useCache, maxRetries - 1));

              case 16:
                throw _context5.t0;

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 12]]);
      }));

      function doRequest(_x5) {
        return _doRequest.apply(this, arguments);
      }

      return doRequest;
    }()
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      var _this6 = this;

      var validationError = this.isValidConfig();

      if (validationError) {
        return Promise.resolve(validationError);
      }

      return this.getDefaultOrFirstWorkspace().then(function (ws) {
        var url = "".concat(_this6.baseUrl, "/").concat(ws, "/metadata");
        return _this6.doRequest(url);
      }).then(function (response) {
        if (response.status === 200) {
          return {
            status: 'success',
            message: 'Successfully queried the Azure Log Analytics service.',
            title: 'Success'
          };
        }

        return {
          status: 'error',
          message: 'Returned http status code ' + response.status
        };
      }).catch(function (error) {
        var message = 'Azure Log Analytics: ';

        if (error.config && error.config.url && error.config.url.indexOf('workspacesloganalytics') > -1) {
          message = 'Azure Log Analytics requires access to Azure Monitor but had the following error: ';
        }

        message = _this6.getErrorMessage(message, error);
        return {
          status: 'error',
          message: message
        };
      });
    }
  }, {
    key: "getErrorMessage",
    value: function getErrorMessage(message, error) {
      message += error.statusText ? error.statusText + ': ' : '';

      if (error.data && error.data.error && error.data.error.code) {
        message += error.data.error.code + '. ' + error.data.error.message;
      } else if (error.data && error.data.error) {
        message += error.data.error;
      } else if (error.data) {
        message += error.data;
      } else {
        message += 'Cannot connect to Azure Log Analytics REST API.';
      }

      return message;
    }
  }, {
    key: "isValidConfig",
    value: function isValidConfig() {
      if (this.instanceSettings.jsonData.azureLogAnalyticsSameAs) {
        return undefined;
      }

      if (!this.isValidConfigField(this.instanceSettings.jsonData.logAnalyticsSubscriptionId)) {
        return {
          status: 'error',
          message: 'The Subscription Id field is required.'
        };
      }

      if (!this.isValidConfigField(this.instanceSettings.jsonData.logAnalyticsTenantId)) {
        return {
          status: 'error',
          message: 'The Tenant Id field is required.'
        };
      }

      if (!this.isValidConfigField(this.instanceSettings.jsonData.logAnalyticsClientId)) {
        return {
          status: 'error',
          message: 'The Client Id field is required.'
        };
      }

      return undefined;
    }
  }, {
    key: "isValidConfigField",
    value: function isValidConfigField(field) {
      return field && field.length > 0;
    }
  }]);

  return AzureLogAnalyticsDatasource;
}(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["DataSourceWithBackend"]);



/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_log_analytics/response_parser.ts":
/*!***************************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_log_analytics/response_parser.ts ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ResponseParser; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var ResponseParser =
/*#__PURE__*/
function () {
  function ResponseParser(results) {
    _classCallCheck(this, ResponseParser);

    this.results = results;
  }

  _createClass(ResponseParser, [{
    key: "parseQueryResult",
    value: function parseQueryResult() {
      var data = [];
      var columns = [];

      for (var i = 0; i < this.results.length; i++) {
        if (this.results[i].result.data.tables.length === 0) {
          continue;
        }

        columns = this.results[i].result.data.tables[0].columns;
        var rows = this.results[i].result.data.tables[0].rows;

        if (this.results[i].query.resultFormat === 'time_series') {
          data = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.concat(data, this.parseTimeSeriesResult(this.results[i].query, columns, rows));
        } else {
          data = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.concat(data, this.parseTableResult(this.results[i].query, columns, rows));
        }
      }

      return data;
    }
  }, {
    key: "parseTimeSeriesResult",
    value: function parseTimeSeriesResult(query, columns, rows) {
      var data = [];
      var timeIndex = -1;
      var metricIndex = -1;
      var valueIndex = -1;

      for (var i = 0; i < columns.length; i++) {
        if (timeIndex === -1 && columns[i].type === 'datetime') {
          timeIndex = i;
        }

        if (metricIndex === -1 && columns[i].type === 'string') {
          metricIndex = i;
        }

        if (valueIndex === -1 && ['int', 'long', 'real', 'double'].indexOf(columns[i].type) > -1) {
          valueIndex = i;
        }
      }

      if (timeIndex === -1) {
        throw new Error('No datetime column found in the result. The Time Series format requires a time column.');
      }

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(rows, function (row) {
        var epoch = ResponseParser.dateTimeToEpoch(row[timeIndex]);
        var metricName = metricIndex > -1 ? row[metricIndex] : columns[valueIndex].name;
        var bucket = ResponseParser.findOrCreateBucket(data, metricName);
        bucket.datapoints.push([row[valueIndex], epoch]);
        bucket.refId = query.refId;
        bucket.meta = {
          executedQueryString: query.query
        };
      });

      return data;
    }
  }, {
    key: "parseTableResult",
    value: function parseTableResult(query, columns, rows) {
      var tableResult = {
        type: 'table',
        columns: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(columns, function (col) {
          return {
            text: col.name,
            type: col.type
          };
        }),
        rows: rows,
        refId: query.refId,
        meta: {
          executedQueryString: query.query
        }
      };
      return tableResult;
    }
  }, {
    key: "parseToVariables",
    value: function parseToVariables() {
      var queryResult = this.parseQueryResult();
      var variables = [];

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(queryResult, function (result) {
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.flattenDeep(result.rows), function (row) {
          variables.push({
            text: row,
            value: row
          });
        });
      });

      return variables;
    }
  }, {
    key: "transformToAnnotations",
    value: function transformToAnnotations(options) {
      var queryResult = this.parseQueryResult();
      var list = [];

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(queryResult, function (result) {
        var timeIndex = -1;
        var textIndex = -1;
        var tagsIndex = -1;

        for (var i = 0; i < result.columns.length; i++) {
          if (timeIndex === -1 && result.columns[i].type === 'datetime') {
            timeIndex = i;
          }

          if (textIndex === -1 && result.columns[i].text.toLowerCase() === 'text') {
            textIndex = i;
          }

          if (tagsIndex === -1 && result.columns[i].text.toLowerCase() === 'tags') {
            tagsIndex = i;
          }
        }

        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(result.rows, function (row) {
          list.push({
            annotation: options.annotation,
            time: Math.floor(ResponseParser.dateTimeToEpoch(row[timeIndex])),
            text: row[textIndex] ? row[textIndex].toString() : '',
            tags: row[tagsIndex] ? row[tagsIndex].trim().split(/\s*,\s*/) : []
          });
        });
      });

      return list;
    }
  }, {
    key: "parseSchemaResult",
    value: function parseSchemaResult() {
      return {
        Plugins: [{
          Name: 'pivot'
        }],
        Databases: this.createSchemaDatabaseWithTables()
      };
    }
  }, {
    key: "createSchemaDatabaseWithTables",
    value: function createSchemaDatabaseWithTables() {
      var databases = {
        Default: {
          Name: 'Default',
          Tables: this.createSchemaTables(),
          Functions: this.createSchemaFunctions()
        }
      };
      return databases;
    }
  }, {
    key: "createSchemaTables",
    value: function createSchemaTables() {
      var tables = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.results.tables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var table = _step.value;
          tables[table.name] = {
            Name: table.name,
            OrderedColumns: []
          };
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = table.columns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var col = _step2.value;
              tables[table.name].OrderedColumns.push(this.convertToKustoColumn(col));
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

      return tables;
    }
  }, {
    key: "convertToKustoColumn",
    value: function convertToKustoColumn(col) {
      return {
        Name: col.name,
        Type: col.type
      };
    }
  }, {
    key: "createSchemaFunctions",
    value: function createSchemaFunctions() {
      var functions = {};

      if (!this.results.functions) {
        return functions;
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.results.functions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var func = _step3.value;
          functions[func.name] = {
            Name: func.name,
            Body: func.body,
            DocString: func.displayName,
            Folder: func.category,
            FunctionKind: 'Unknown',
            InputParameters: [],
            OutputColumns: []
          };
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

      return functions;
    }
  }], [{
    key: "findOrCreateBucket",
    value: function findOrCreateBucket(data, target) {
      var dataTarget = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(data, ['target', target]);

      if (!dataTarget) {
        dataTarget = {
          target: target,
          datapoints: [],
          refId: '',
          query: ''
        };
        data.push(dataTarget);
      }

      return dataTarget;
    }
  }, {
    key: "dateTimeToEpoch",
    value: function dateTimeToEpoch(dateTimeValue) {
      return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["dateTime"])(dateTimeValue).valueOf();
    }
  }]);

  return ResponseParser;
}();



/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/azure_monitor_datasource.ts":
/*!******************************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/azure_monitor_datasource.ts ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AzureMonitorDatasource; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _url_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./url_builder */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/url_builder.ts");
/* harmony import */ var _response_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./response_parser */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/response_parser.ts");
/* harmony import */ var _supported_namespaces__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./supported_namespaces */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/supported_namespaces.ts");
/* harmony import */ var _time_grain_converter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../time_grain_converter */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/time_grain_converter.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../types */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/types.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var defaultDropdownValue = 'select';

var AzureMonitorDatasource =
/*#__PURE__*/
function (_DataSourceWithBacken) {
  _inherits(AzureMonitorDatasource, _DataSourceWithBacken);

  function AzureMonitorDatasource(instanceSettings) {
    var _this;

    _classCallCheck(this, AzureMonitorDatasource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AzureMonitorDatasource).call(this, instanceSettings));
    _this.instanceSettings = instanceSettings;
    _this.apiVersion = '2018-01-01';
    _this.apiPreviewVersion = '2017-12-01-preview';
    _this.supportedMetricNamespaces = [];
    _this.subscriptionId = instanceSettings.jsonData.subscriptionId;
    _this.cloudName = instanceSettings.jsonData.cloudName || 'azuremonitor';
    _this.baseUrl = "/".concat(_this.cloudName, "/subscriptions");
    _this.url = instanceSettings.url;
    _this.supportedMetricNamespaces = new _supported_namespaces__WEBPACK_IMPORTED_MODULE_3__["default"](_this.cloudName).get();
    return _this;
  }

  _createClass(AzureMonitorDatasource, [{
    key: "isConfigured",
    value: function isConfigured() {
      return !!this.subscriptionId && this.subscriptionId.length > 0;
    }
  }, {
    key: "filterQuery",
    value: function filterQuery(item) {
      return item.hide !== true && item.azureMonitor.resourceGroup !== defaultDropdownValue && item.azureMonitor.resourceName !== defaultDropdownValue && item.azureMonitor.metricDefinition !== defaultDropdownValue && item.azureMonitor.metricName !== defaultDropdownValue;
    }
  }, {
    key: "applyTemplateVariables",
    value: function applyTemplateVariables(target, scopedVars) {
      var item = target.azureMonitor; // fix for timeGrainUnit which is a deprecated/removed field name

      if (item.timeGrainUnit && item.timeGrain !== 'auto') {
        item.timeGrain = _time_grain_converter__WEBPACK_IMPORTED_MODULE_4__["default"].createISO8601Duration(item.timeGrain, item.timeGrainUnit);
      }

      var templateSrv = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_6__["getTemplateSrv"])();
      var subscriptionId = templateSrv.replace(target.subscription || this.subscriptionId, scopedVars);
      var resourceGroup = templateSrv.replace(item.resourceGroup, scopedVars);
      var resourceName = templateSrv.replace(item.resourceName, scopedVars);
      var metricNamespace = templateSrv.replace(item.metricNamespace, scopedVars);
      var metricDefinition = templateSrv.replace(item.metricDefinition, scopedVars);
      var timeGrain = templateSrv.replace((item.timeGrain || '').toString(), scopedVars);
      var aggregation = templateSrv.replace(item.aggregation, scopedVars);
      var top = templateSrv.replace(item.top || '', scopedVars);
      var dimensionFilters = item.dimensionFilters.filter(function (f) {
        return f.dimension && f.dimension !== 'None';
      }).map(function (f) {
        var _f$filter;

        var filter = templateSrv.replace((_f$filter = f.filter) !== null && _f$filter !== void 0 ? _f$filter : '', scopedVars);
        return {
          dimension: templateSrv.replace(f.dimension, scopedVars),
          operator: f.operator || 'eq',
          filter: filter || '*' // send * when empty

        };
      });
      return {
        refId: target.refId,
        subscription: subscriptionId,
        queryType: _types__WEBPACK_IMPORTED_MODULE_5__["AzureQueryType"].AzureMonitor,
        azureMonitor: {
          resourceGroup: resourceGroup,
          resourceName: resourceName,
          metricDefinition: metricDefinition,
          timeGrain: timeGrain,
          allowedTimeGrainsMs: item.allowedTimeGrainsMs,
          metricName: templateSrv.replace(item.metricName, scopedVars),
          metricNamespace: metricNamespace && metricNamespace !== defaultDropdownValue ? metricNamespace : metricDefinition,
          aggregation: aggregation,
          dimensionFilters: dimensionFilters,
          top: top || '10',
          alias: item.alias,
          format: target.format
        }
      };
    }
    /**
     * This is named differently than DataSourceApi.metricFindQuery
     * because it's not exposed to Grafana like the main AzureMonitorDataSource.
     * And some of the azure internal data sources return null in this function, which the
     * external interface does not support
     */

  }, {
    key: "metricFindQueryInternal",
    value: function metricFindQueryInternal(query) {
      var subscriptionsQuery = query.match(/^Subscriptions\(\)/i);

      if (subscriptionsQuery) {
        return this.getSubscriptions();
      }

      var resourceGroupsQuery = query.match(/^ResourceGroups\(\)/i);

      if (resourceGroupsQuery) {
        return this.getResourceGroups(this.subscriptionId);
      }

      var resourceGroupsQueryWithSub = query.match(/^ResourceGroups\(([^\)]+?)(,\s?([^,]+?))?\)/i);

      if (resourceGroupsQueryWithSub) {
        return this.getResourceGroups(this.toVariable(resourceGroupsQueryWithSub[1]));
      }

      var metricDefinitionsQuery = query.match(/^Namespaces\(([^\)]+?)(,\s?([^,]+?))?\)/i);

      if (metricDefinitionsQuery) {
        if (!metricDefinitionsQuery[3]) {
          return this.getMetricDefinitions(this.subscriptionId, this.toVariable(metricDefinitionsQuery[1]));
        }
      }

      var metricDefinitionsQueryWithSub = query.match(/^Namespaces\(([^,]+?),\s?([^,]+?)\)/i);

      if (metricDefinitionsQueryWithSub) {
        return this.getMetricDefinitions(this.toVariable(metricDefinitionsQueryWithSub[1]), this.toVariable(metricDefinitionsQueryWithSub[2]));
      }

      var resourceNamesQuery = query.match(/^ResourceNames\(([^,]+?),\s?([^,]+?)\)/i);

      if (resourceNamesQuery) {
        var resourceGroup = this.toVariable(resourceNamesQuery[1]);
        var metricDefinition = this.toVariable(resourceNamesQuery[2]);
        return this.getResourceNames(this.subscriptionId, resourceGroup, metricDefinition);
      }

      var resourceNamesQueryWithSub = query.match(/^ResourceNames\(([^,]+?),\s?([^,]+?),\s?(.+?)\)/i);

      if (resourceNamesQueryWithSub) {
        var subscription = this.toVariable(resourceNamesQueryWithSub[1]);

        var _resourceGroup = this.toVariable(resourceNamesQueryWithSub[2]);

        var _metricDefinition = this.toVariable(resourceNamesQueryWithSub[3]);

        return this.getResourceNames(subscription, _resourceGroup, _metricDefinition);
      }

      var metricNamespaceQuery = query.match(/^MetricNamespace\(([^,]+?),\s?([^,]+?),\s?([^,]+?)\)/i);

      if (metricNamespaceQuery) {
        var _resourceGroup2 = this.toVariable(metricNamespaceQuery[1]);

        var _metricDefinition2 = this.toVariable(metricNamespaceQuery[2]);

        var resourceName = this.toVariable(metricNamespaceQuery[3]);
        return this.getMetricNamespaces(this.subscriptionId, _resourceGroup2, _metricDefinition2, resourceName);
      }

      var metricNamespaceQueryWithSub = query.match(/^metricnamespace\(([^,]+?),\s?([^,]+?),\s?([^,]+?),\s?([^,]+?)\)/i);

      if (metricNamespaceQueryWithSub) {
        var _subscription = this.toVariable(metricNamespaceQueryWithSub[1]);

        var _resourceGroup3 = this.toVariable(metricNamespaceQueryWithSub[2]);

        var _metricDefinition3 = this.toVariable(metricNamespaceQueryWithSub[3]);

        var _resourceName = this.toVariable(metricNamespaceQueryWithSub[4]);

        return this.getMetricNamespaces(_subscription, _resourceGroup3, _metricDefinition3, _resourceName);
      }

      var metricNamesQuery = query.match(/^MetricNames\(([^,]+?),\s?([^,]+?),\s?([^,]+?),\s?([^,]+?)\)/i);

      if (metricNamesQuery) {
        if (metricNamesQuery[3].indexOf(',') === -1) {
          var _resourceGroup4 = this.toVariable(metricNamesQuery[1]);

          var _metricDefinition4 = this.toVariable(metricNamesQuery[2]);

          var _resourceName2 = this.toVariable(metricNamesQuery[3]);

          var metricNamespace = this.toVariable(metricNamesQuery[4]);
          return this.getMetricNames(this.subscriptionId, _resourceGroup4, _metricDefinition4, _resourceName2, metricNamespace);
        }
      }

      var metricNamesQueryWithSub = query.match(/^MetricNames\(([^,]+?),\s?([^,]+?),\s?([^,]+?),\s?([^,]+?),\s?(.+?)\)/i);

      if (metricNamesQueryWithSub) {
        var _subscription2 = this.toVariable(metricNamesQueryWithSub[1]);

        var _resourceGroup5 = this.toVariable(metricNamesQueryWithSub[2]);

        var _metricDefinition5 = this.toVariable(metricNamesQueryWithSub[3]);

        var _resourceName3 = this.toVariable(metricNamesQueryWithSub[4]);

        var _metricNamespace = this.toVariable(metricNamesQueryWithSub[5]);

        return this.getMetricNames(_subscription2, _resourceGroup5, _metricDefinition5, _resourceName3, _metricNamespace);
      }

      return null;
    }
  }, {
    key: "toVariable",
    value: function toVariable(metric) {
      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_6__["getTemplateSrv"])().replace((metric || '').trim());
    }
  }, {
    key: "getSubscriptions",
    value: function getSubscriptions(route) {
      var url = "/".concat(route || this.cloudName, "/subscriptions?api-version=2019-03-01");
      return this.doRequest(url).then(function (result) {
        return _response_parser__WEBPACK_IMPORTED_MODULE_2__["default"].parseSubscriptions(result);
      });
    }
  }, {
    key: "getResourceGroups",
    value: function getResourceGroups(subscriptionId) {
      var url = "".concat(this.baseUrl, "/").concat(subscriptionId, "/resourceGroups?api-version=").concat(this.apiVersion);
      return this.doRequest(url).then(function (result) {
        return _response_parser__WEBPACK_IMPORTED_MODULE_2__["default"].parseResponseValues(result, 'name', 'name');
      });
    }
  }, {
    key: "getMetricDefinitions",
    value: function getMetricDefinitions(subscriptionId, resourceGroup) {
      var _this2 = this;

      var url = "".concat(this.baseUrl, "/").concat(subscriptionId, "/resourceGroups/").concat(resourceGroup, "/resources?api-version=").concat(this.apiVersion);
      return this.doRequest(url).then(function (result) {
        return _response_parser__WEBPACK_IMPORTED_MODULE_2__["default"].parseResponseValues(result, 'type', 'type');
      }).then(function (result) {
        return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["filter"])(result, function (t) {
          for (var i = 0; i < _this2.supportedMetricNamespaces.length; i++) {
            if (t.value.toLowerCase() === _this2.supportedMetricNamespaces[i].toLowerCase()) {
              return true;
            }
          }

          return false;
        });
      }).then(function (result) {
        var shouldHardcodeBlobStorage = false;

        for (var i = 0; i < result.length; i++) {
          if (result[i].value === 'Microsoft.Storage/storageAccounts') {
            shouldHardcodeBlobStorage = true;
            break;
          }
        }

        if (shouldHardcodeBlobStorage) {
          result.push({
            text: 'Microsoft.Storage/storageAccounts/blobServices',
            value: 'Microsoft.Storage/storageAccounts/blobServices'
          });
          result.push({
            text: 'Microsoft.Storage/storageAccounts/fileServices',
            value: 'Microsoft.Storage/storageAccounts/fileServices'
          });
          result.push({
            text: 'Microsoft.Storage/storageAccounts/tableServices',
            value: 'Microsoft.Storage/storageAccounts/tableServices'
          });
          result.push({
            text: 'Microsoft.Storage/storageAccounts/queueServices',
            value: 'Microsoft.Storage/storageAccounts/queueServices'
          });
        }

        return result;
      });
    }
  }, {
    key: "getResourceNames",
    value: function getResourceNames(subscriptionId, resourceGroup, metricDefinition) {
      var url = "".concat(this.baseUrl, "/").concat(subscriptionId, "/resourceGroups/").concat(resourceGroup, "/resources?api-version=").concat(this.apiVersion);
      return this.doRequest(url).then(function (result) {
        if (!Object(lodash__WEBPACK_IMPORTED_MODULE_0__["startsWith"])(metricDefinition, 'Microsoft.Storage/storageAccounts/')) {
          return _response_parser__WEBPACK_IMPORTED_MODULE_2__["default"].parseResourceNames(result, metricDefinition);
        }

        var list = _response_parser__WEBPACK_IMPORTED_MODULE_2__["default"].parseResourceNames(result, 'Microsoft.Storage/storageAccounts');

        for (var i = 0; i < list.length; i++) {
          list[i].text += '/default';
          list[i].value += '/default';
        }

        return list;
      });
    }
  }, {
    key: "getMetricNamespaces",
    value: function getMetricNamespaces(subscriptionId, resourceGroup, metricDefinition, resourceName) {
      var url = _url_builder__WEBPACK_IMPORTED_MODULE_1__["default"].buildAzureMonitorGetMetricNamespacesUrl(this.baseUrl, subscriptionId, resourceGroup, metricDefinition, resourceName, this.apiPreviewVersion);
      return this.doRequest(url).then(function (result) {
        return _response_parser__WEBPACK_IMPORTED_MODULE_2__["default"].parseResponseValues(result, 'name', 'properties.metricNamespaceName');
      });
    }
  }, {
    key: "getMetricNames",
    value: function getMetricNames(subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace) {
      var url = _url_builder__WEBPACK_IMPORTED_MODULE_1__["default"].buildAzureMonitorGetMetricNamesUrl(this.baseUrl, subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace, this.apiVersion);
      return this.doRequest(url).then(function (result) {
        return _response_parser__WEBPACK_IMPORTED_MODULE_2__["default"].parseResponseValues(result, 'name.localizedValue', 'name.value');
      });
    }
  }, {
    key: "getMetricMetadata",
    value: function getMetricMetadata(subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace, metricName) {
      var url = _url_builder__WEBPACK_IMPORTED_MODULE_1__["default"].buildAzureMonitorGetMetricNamesUrl(this.baseUrl, subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace, this.apiVersion);
      return this.doRequest(url).then(function (result) {
        return _response_parser__WEBPACK_IMPORTED_MODULE_2__["default"].parseMetadata(result, metricName);
      });
    }
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      if (!this.isValidConfigField(this.instanceSettings.jsonData.tenantId)) {
        return Promise.resolve({
          status: 'error',
          message: 'The Tenant Id field is required.'
        });
      }

      if (!this.isValidConfigField(this.instanceSettings.jsonData.clientId)) {
        return Promise.resolve({
          status: 'error',
          message: 'The Client Id field is required.'
        });
      }

      var url = "/".concat(this.cloudName, "/subscriptions?api-version=2019-03-01");
      return this.doRequest(url).then(function (response) {
        if (response.status === 200) {
          return {
            status: 'success',
            message: 'Successfully queried the Azure Monitor service.',
            title: 'Success'
          };
        }

        return {
          status: 'error',
          message: 'Returned http status code ' + response.status
        };
      }).catch(function (error) {
        var message = 'Azure Monitor: ';
        message += error.statusText ? error.statusText + ': ' : '';

        if (error.data && error.data.error && error.data.error.code) {
          message += error.data.error.code + '. ' + error.data.error.message;
        } else if (error.data && error.data.error) {
          message += error.data.error;
        } else if (error.data) {
          message += error.data;
        } else {
          message += 'Cannot connect to Azure Monitor REST API.';
        }

        return {
          status: 'error',
          message: message
        };
      });
    }
  }, {
    key: "isValidConfigField",
    value: function isValidConfigField(field) {
      return field && field.length > 0;
    }
  }, {
    key: "doRequest",
    value: function doRequest(url) {
      var _this3 = this;

      var maxRetries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_6__["getBackendSrv"])().datasourceRequest({
        url: this.url + url,
        method: 'GET'
      }).catch(function (error) {
        if (maxRetries > 0) {
          return _this3.doRequest(url, maxRetries - 1);
        }

        throw error;
      });
    }
  }]);

  return AzureMonitorDatasource;
}(_grafana_runtime__WEBPACK_IMPORTED_MODULE_6__["DataSourceWithBackend"]);



/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/response_parser.ts":
/*!*********************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/response_parser.ts ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ResponseParser; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _time_grain_converter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../time_grain_converter */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/time_grain_converter.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var ResponseParser =
/*#__PURE__*/
function () {
  function ResponseParser() {
    _classCallCheck(this, ResponseParser);
  }

  _createClass(ResponseParser, null, [{
    key: "parseResponseValues",
    value: function parseResponseValues(result, textFieldName, valueFieldName) {
      var list = [];

      if (!result) {
        return list;
      }

      for (var i = 0; i < result.data.value.length; i++) {
        if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(list, ['value', lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], valueFieldName)])) {
          var value = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], valueFieldName);

          var text = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], textFieldName, value);

          list.push({
            text: text,
            value: value
          });
        }
      }

      return list;
    }
  }, {
    key: "parseResourceNames",
    value: function parseResourceNames(result, metricDefinition) {
      var list = [];

      if (!result) {
        return list;
      }

      for (var i = 0; i < result.data.value.length; i++) {
        if (result.data.value[i].type === metricDefinition) {
          list.push({
            text: result.data.value[i].name,
            value: result.data.value[i].name
          });
        }
      }

      return list;
    }
  }, {
    key: "parseMetadata",
    value: function parseMetadata(result, metricName) {
      var defaultAggTypes = ['None', 'Average', 'Minimum', 'Maximum', 'Total', 'Count'];

      if (!result) {
        return {
          primaryAggType: '',
          supportedAggTypes: defaultAggTypes,
          supportedTimeGrains: [],
          dimensions: []
        };
      }

      var metricData = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(result.data.value, function (o) {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(o, 'name.value') === metricName;
      });

      return {
        primaryAggType: metricData.primaryAggregationType,
        supportedAggTypes: metricData.supportedAggregationTypes || defaultAggTypes,
        supportedTimeGrains: ResponseParser.parseTimeGrains(metricData.metricAvailabilities || []),
        dimensions: ResponseParser.parseDimensions(metricData)
      };
    }
  }, {
    key: "parseTimeGrains",
    value: function parseTimeGrains(metricAvailabilities) {
      var timeGrains = [];

      if (!metricAvailabilities) {
        return timeGrains;
      }

      metricAvailabilities.forEach(function (avail) {
        if (avail.timeGrain) {
          timeGrains.push({
            text: _time_grain_converter__WEBPACK_IMPORTED_MODULE_1__["default"].createTimeGrainFromISO8601Duration(avail.timeGrain),
            value: avail.timeGrain
          });
        }
      });
      return timeGrains;
    }
  }, {
    key: "parseDimensions",
    value: function parseDimensions(metricData) {
      var dimensions = [];

      if (!metricData.dimensions || metricData.dimensions.length === 0) {
        return dimensions;
      }

      for (var i = 0; i < metricData.dimensions.length; i++) {
        var text = metricData.dimensions[i].localizedValue;
        var value = metricData.dimensions[i].value;
        dimensions.push({
          text: !text ? value : text,
          value: value
        });
      }

      return dimensions;
    }
  }, {
    key: "parseSubscriptions",
    value: function parseSubscriptions(result) {
      var list = [];

      if (!result) {
        return list;
      }

      var valueFieldName = 'subscriptionId';
      var textFieldName = 'displayName';

      for (var i = 0; i < result.data.value.length; i++) {
        if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(list, ['value', lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], valueFieldName)])) {
          list.push({
            text: "".concat(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], textFieldName), " - ").concat(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], valueFieldName)),
            value: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], valueFieldName)
          });
        }
      }

      return list;
    }
  }, {
    key: "parseSubscriptionsForSelect",
    value: function parseSubscriptionsForSelect(result) {
      var list = [];

      if (!result) {
        return list;
      }

      var valueFieldName = 'subscriptionId';
      var textFieldName = 'displayName';

      for (var i = 0; i < result.data.value.length; i++) {
        if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(list, ['value', lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], valueFieldName)])) {
          list.push({
            label: "".concat(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], textFieldName), " - ").concat(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], valueFieldName)),
            value: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], valueFieldName)
          });
        }
      }

      return list;
    }
  }, {
    key: "parseWorkspacesForSelect",
    value: function parseWorkspacesForSelect(result) {
      var list = [];

      if (!result) {
        return list;
      }

      var valueFieldName = 'customerId';
      var textFieldName = 'name';

      for (var i = 0; i < result.data.value.length; i++) {
        if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(list, ['value', lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i].properties, valueFieldName)])) {
          list.push({
            label: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], textFieldName),
            value: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i].properties, valueFieldName)
          });
        }
      }

      return list;
    }
  }]);

  return ResponseParser;
}();



/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/supported_namespaces.ts":
/*!**************************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/supported_namespaces.ts ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SupportedNamespaces; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SupportedNamespaces =
/*#__PURE__*/
function () {
  function SupportedNamespaces(cloudName) {
    _classCallCheck(this, SupportedNamespaces);

    this.cloudName = cloudName;
    this.supportedMetricNamespaces = {
      azuremonitor: ['Microsoft.AnalysisServices/servers', 'Microsoft.ApiManagement/service', 'Microsoft.Automation/automationAccounts', 'Microsoft.Batch/batchAccounts', 'Microsoft.Cache/redis', 'Microsoft.ClassicCompute/virtualMachines', 'Microsoft.ClassicCompute/domainNames/slots/roles', 'Microsoft.CognitiveServices/accounts', 'Microsoft.Compute/virtualMachines', 'Microsoft.Compute/virtualMachineScaleSets', 'Microsoft.ContainerInstance/containerGroups', 'Microsoft.ContainerRegistry/registries', 'Microsoft.ContainerService/managedClusters', 'Microsoft.CustomerInsights/hubs', 'Microsoft.DataBoxEdge/dataBoxEdgeDevices', 'Microsoft.DataFactory/datafactories', 'Microsoft.DataFactory/factories', 'Microsoft.DataLakeAnalytics/accounts', 'Microsoft.DataLakeStore/accounts', 'Microsoft.DBforMariaDB/servers', 'Microsoft.DBforMySQL/servers', 'Microsoft.DBforPostgreSQL/servers', 'Microsoft.Devices/IotHubs', 'Microsoft.Devices/provisioningServices', 'Microsoft.DocumentDB/databaseAccounts', 'Microsoft.EventGrid/topics', 'Microsoft.EventGrid/eventSubscriptions', 'Microsoft.EventGrid/extensionTopics', 'Microsoft.EventHub/namespaces', 'Microsoft.EventHub/clusters', 'Microsoft.HDInsight/clusters', 'Microsoft.Insights/AutoscaleSettings', 'Microsoft.Insights/components', 'Microsoft.KeyVault/vaults', 'Microsoft.Kusto/clusters', 'Microsoft.LocationBasedServices/accounts', 'Microsoft.Logic/workflows', 'Microsoft.Logic/integrationServiceEnvironments', 'Microsoft.NetApp/netAppAccounts/capacityPools', 'Microsoft.NetApp/netAppAccounts/capacityPools/Volumes', 'Microsoft.Network/networkInterfaces', 'Microsoft.Network/loadBalancers', 'Microsoft.Network/dnsZones', 'Microsoft.Network/publicIPAddresses', 'Microsoft.Network/azureFirewalls', 'Microsoft.Network/applicationGateways', 'Microsoft.Network/virtualNetworkGateways', 'Microsoft.Network/expressRouteCircuits', 'Microsoft.Network/expressRouteCircuits/Peerings', 'Microsoft.Network/connections', 'Microsoft.Network/trafficManagerProfiles', 'Microsoft.Network/networkWatchers/connectionMonitors', 'Microsoft.Network/frontdoors', 'Microsoft.NotificationHubs/namespaces/notificationHubs', 'Microsoft.OperationalInsights/workspaces', 'Microsoft.PowerBIDedicated/capacities', 'Microsoft.Relay/namespaces', 'Microsoft.Search/searchServices', 'Microsoft.ServiceBus/namespaces', 'Microsoft.Sql/servers/databases', 'Microsoft.Sql/servers/elasticPools', 'Microsoft.Sql/managedInstances', 'Microsoft.Storage/storageAccounts', 'Microsoft.Storage/storageAccounts/blobServices', 'Microsoft.Storage/storageAccounts/fileServices', 'Microsoft.Storage/storageAccounts/queueServices', 'Microsoft.Storage/storageAccounts/tableServices', 'Microsoft.StorageSync/storageSyncServices', 'Microsoft.StorageSync/storageSyncServices/syncGroups', 'Microsoft.StorageSync/storageSyncServices/syncGroups/serverEndpoints', 'Microsoft.StorageSync/storageSyncServices/registeredServers', 'Microsoft.StreamAnalytics/streamingJobs', 'Microsoft.Web/serverfarms', 'Microsoft.Web/sites', 'Microsoft.Web/sites/slots', 'Microsoft.Web/hostingEnvironments/multiRolePools', 'Microsoft.Web/hostingEnvironments/workerPools'],
      govazuremonitor: ['Microsoft.AnalysisServices/servers', 'Microsoft.ApiManagement/service', 'Microsoft.Batch/batchAccounts', 'Microsoft.Cache/redis', 'Microsoft.ClassicCompute/virtualMachines', 'Microsoft.ClassicCompute/domainNames/slots/roles', 'Microsoft.CognitiveServices/accounts', 'Microsoft.Compute/virtualMachines', 'Microsoft.Compute/virtualMachineScaleSets', 'Microsoft.ContainerRegistry/registries', 'Microsoft.DBforMySQL/servers', 'Microsoft.DBforPostgreSQL/servers', 'Microsoft.Devices/IotHubs', 'Microsoft.Devices/provisioningServices', 'Microsoft.EventGrid/topics', 'Microsoft.EventGrid/eventSubscriptions', 'Microsoft.EventGrid/extensionTopics', 'Microsoft.EventHub/namespaces', 'Microsoft.EventHub/clusters', 'Microsoft.Insights/AutoscaleSettings', 'Microsoft.KeyVault/vaults', 'Microsoft.Logic/workflows', 'Microsoft.Network/networkInterfaces', 'Microsoft.Network/loadBalancers', 'Microsoft.Network/dnsZones', 'Microsoft.Network/publicIPAddresses', 'Microsoft.Network/azureFirewalls', 'Microsoft.Network/applicationGateways', 'Microsoft.Network/virtualNetworkGateways', 'Microsoft.Network/expressRouteCircuits', 'Microsoft.Network/expressRouteCircuits/Peerings', 'Microsoft.Network/connections', 'Microsoft.Network/trafficManagerProfiles', 'Microsoft.Network/networkWatchers/connectionMonitors', 'Microsoft.Network/frontdoors', 'Microsoft.NotificationHubs/namespaces/notificationHubs', 'Microsoft.OperationalInsights/workspaces', 'Microsoft.PowerBIDedicated/capacities', 'Microsoft.Relay/namespaces', 'Microsoft.ServiceBus/namespaces', 'Microsoft.Sql/servers/databases', 'Microsoft.Sql/servers/elasticPools', 'Microsoft.Sql/managedInstances', 'Microsoft.Storage/storageAccounts', 'Microsoft.Storage/storageAccounts/blobServices', 'Microsoft.Storage/storageAccounts/fileServices', 'Microsoft.Storage/storageAccounts/queueServices', 'Microsoft.Storage/storageAccounts/tableServices', 'Microsoft.Web/serverfarms', 'Microsoft.Web/sites', 'Microsoft.Web/sites/slots', 'Microsoft.Web/hostingEnvironments/multiRolePools', 'Microsoft.Web/hostingEnvironments/workerPools'],
      germanyazuremonitor: ['Microsoft.AnalysisServices/servers', 'Microsoft.Batch/batchAccounts', 'Microsoft.Cache/redis', 'Microsoft.ClassicCompute/virtualMachines', 'Microsoft.ClassicCompute/domainNames/slots/roles', 'Microsoft.Compute/virtualMachines', 'Microsoft.Compute/virtualMachineScaleSets', 'Microsoft.DBforMySQL/servers', 'Microsoft.DBforPostgreSQL/servers', 'Microsoft.Devices/IotHubs', 'Microsoft.Devices/provisioningServices', 'Microsoft.EventHub/namespaces', 'Microsoft.EventHub/clusters', 'Microsoft.Insights/AutoscaleSettings', 'Microsoft.KeyVault/vaults', 'Microsoft.Network/networkInterfaces', 'Microsoft.Network/loadBalancers', 'Microsoft.Network/dnsZones', 'Microsoft.Network/publicIPAddresses', 'Microsoft.Network/azureFirewalls', 'Microsoft.Network/applicationGateways', 'Microsoft.Network/virtualNetworkGateways', 'Microsoft.Network/expressRouteCircuits', 'Microsoft.Network/expressRouteCircuits/Peerings', 'Microsoft.Network/connections', 'Microsoft.Network/trafficManagerProfiles', 'Microsoft.Network/networkWatchers/connectionMonitors', 'Microsoft.Network/frontdoors', 'Microsoft.NotificationHubs/namespaces/notificationHubs', 'Microsoft.OperationalInsights/workspaces', 'Microsoft.PowerBIDedicated/capacities', 'Microsoft.Relay/namespaces', 'Microsoft.ServiceBus/namespaces', 'Microsoft.Sql/servers/databases', 'Microsoft.Sql/servers/elasticPools', 'Microsoft.Sql/managedInstances', 'Microsoft.Storage/storageAccounts', 'Microsoft.Storage/storageAccounts/blobServices', 'Microsoft.Storage/storageAccounts/fileServices', 'Microsoft.Storage/storageAccounts/queueServices', 'Microsoft.Storage/storageAccounts/tableServices', 'Microsoft.StreamAnalytics/streamingJobs', 'Microsoft.Web/serverfarms', 'Microsoft.Web/sites', 'Microsoft.Web/sites/slots', 'Microsoft.Web/hostingEnvironments/multiRolePools', 'Microsoft.Web/hostingEnvironments/workerPools'],
      chinaazuremonitor: ['Microsoft.AnalysisServices/servers', 'Microsoft.Batch/batchAccounts', 'Microsoft.Cache/redis', 'Microsoft.ClassicCompute/virtualMachines', 'Microsoft.ClassicCompute/domainNames/slots/roles', 'Microsoft.CognitiveServices/accounts', 'Microsoft.Compute/virtualMachines', 'Microsoft.Compute/virtualMachineScaleSets', 'Microsoft.ContainerRegistry/registries', 'Microsoft.DBforMySQL/servers', 'Microsoft.DBforPostgreSQL/servers', 'Microsoft.Devices/IotHubs', 'Microsoft.Devices/provisioningServices', 'Microsoft.EventHub/namespaces', 'Microsoft.Insights/AutoscaleSettings', 'Microsoft.KeyVault/vaults', 'Microsoft.Logic/workflows', 'Microsoft.Network/networkInterfaces', 'Microsoft.Network/loadBalancers', 'Microsoft.Network/dnsZones', 'Microsoft.Network/publicIPAddresses', 'Microsoft.Network/azureFirewalls', 'Microsoft.Network/applicationGateways', 'Microsoft.Network/virtualNetworkGateways', 'Microsoft.Network/expressRouteCircuits', 'Microsoft.Network/expressRouteCircuits/Peerings', 'Microsoft.Network/connections', 'Microsoft.Network/trafficManagerProfiles', 'Microsoft.Network/networkWatchers/connectionMonitors', 'Microsoft.Network/frontdoors', 'Microsoft.NotificationHubs/namespaces/notificationHubs', 'Microsoft.PowerBIDedicated/capacities', 'Microsoft.Relay/namespaces', 'Microsoft.ServiceBus/namespaces', 'Microsoft.Sql/servers/databases', 'Microsoft.Sql/servers/elasticPools', 'Microsoft.Sql/managedInstances', 'Microsoft.Storage/storageAccounts', 'Microsoft.Storage/storageAccounts/blobServices', 'Microsoft.Storage/storageAccounts/fileServices', 'Microsoft.Storage/storageAccounts/queueServices', 'Microsoft.Storage/storageAccounts/tableServices', 'Microsoft.StreamAnalytics/streamingJobs', 'Microsoft.Web/serverfarms', 'Microsoft.Web/sites', 'Microsoft.Web/sites/slots', 'Microsoft.Web/hostingEnvironments/multiRolePools', 'Microsoft.Web/hostingEnvironments/workerPools']
    };
  }

  _createClass(SupportedNamespaces, [{
    key: "get",
    value: function get() {
      return this.supportedMetricNamespaces[this.cloudName];
    }
  }]);

  return SupportedNamespaces;
}();



/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/url_builder.ts":
/*!*****************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/url_builder.ts ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UrlBuilder; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UrlBuilder =
/*#__PURE__*/
function () {
  function UrlBuilder() {
    _classCallCheck(this, UrlBuilder);
  }

  _createClass(UrlBuilder, null, [{
    key: "buildAzureMonitorGetMetricNamespacesUrl",
    value: function buildAzureMonitorGetMetricNamespacesUrl(baseUrl, subscriptionId, resourceGroup, metricDefinition, resourceName, apiVersion) {
      if ((metricDefinition.match(/\//g) || []).length > 1) {
        var rn = resourceName.split('/');
        var service = metricDefinition.substring(metricDefinition.lastIndexOf('/') + 1);
        var md = metricDefinition.substring(0, metricDefinition.lastIndexOf('/'));
        return "".concat(baseUrl, "/").concat(subscriptionId, "/resourceGroups/").concat(resourceGroup, "/providers/").concat(md, "/").concat(rn[0], "/").concat(service, "/").concat(rn[1]) + "/providers/microsoft.insights/metricNamespaces?api-version=".concat(apiVersion);
      }

      return "".concat(baseUrl, "/").concat(subscriptionId, "/resourceGroups/").concat(resourceGroup, "/providers/").concat(metricDefinition, "/").concat(resourceName) + "/providers/microsoft.insights/metricNamespaces?api-version=".concat(apiVersion);
    }
  }, {
    key: "buildAzureMonitorGetMetricNamesUrl",
    value: function buildAzureMonitorGetMetricNamesUrl(baseUrl, subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace, apiVersion) {
      if ((metricDefinition.match(/\//g) || []).length > 1) {
        var rn = resourceName.split('/');
        var service = metricDefinition.substring(metricDefinition.lastIndexOf('/') + 1);
        var md = metricDefinition.substring(0, metricDefinition.lastIndexOf('/'));
        return "".concat(baseUrl, "/").concat(subscriptionId, "/resourceGroups/").concat(resourceGroup, "/providers/").concat(md, "/").concat(rn[0], "/").concat(service, "/").concat(rn[1]) + "/providers/microsoft.insights/metricdefinitions?api-version=".concat(apiVersion, "&metricnamespace=").concat(encodeURIComponent(metricNamespace));
      }

      return "".concat(baseUrl, "/").concat(subscriptionId, "/resourceGroups/").concat(resourceGroup, "/providers/").concat(metricDefinition, "/").concat(resourceName) + "/providers/microsoft.insights/metricdefinitions?api-version=".concat(apiVersion, "&metricnamespace=").concat(encodeURIComponent(metricNamespace));
    }
  }]);

  return UrlBuilder;
}();



/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/AnalyticsConfig.tsx":
/*!*******************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/AnalyticsConfig.tsx ***!
  \*******************************************************************************************************/
/*! exports provided: AnalyticsConfig, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsConfig", function() { return AnalyticsConfig; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AzureCredentialsForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AzureCredentialsForm */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/AzureCredentialsForm.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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




var Select = _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LegacyForms"].Select,
    Switch = _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LegacyForms"].Switch;
var AnalyticsConfig =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AnalyticsConfig, _PureComponent);

  function AnalyticsConfig(props) {
    var _this;

    _classCallCheck(this, AnalyticsConfig);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AnalyticsConfig).call(this, props));

    _this.onLogAnalyticsTenantIdChange = function (event) {
      _this.props.onUpdateJsonDataOption('logAnalyticsTenantId', event.target.value);
    };

    _this.onLogAnalyticsClientIdChange = function (event) {
      _this.props.onUpdateJsonDataOption('logAnalyticsClientId', event.target.value);
    };

    _this.onLogAnalyticsClientSecretChange = function (event) {
      _this.props.onUpdateSecureJsonDataOption('logAnalyticsClientSecret', event.target.value);
    };

    _this.onLogAnalyticsSubscriptionSelect = function (logAnalyticsSubscription) {
      _this.props.onUpdateJsonDataOption('logAnalyticsSubscriptionId', logAnalyticsSubscription.value);
    };

    _this.onWorkspaceSelectChange = function (logAnalyticsDefaultWorkspace) {
      _this.props.onUpdateJsonDataOption('logAnalyticsDefaultWorkspace', logAnalyticsDefaultWorkspace.value);
    };

    _this.onAzureLogAnalyticsSameAsChange = function () {
      var _this$props = _this.props,
          options = _this$props.options,
          onUpdateDatasourceOptions = _this$props.onUpdateDatasourceOptions,
          makeSameAs = _this$props.makeSameAs;

      if (!options.jsonData.azureLogAnalyticsSameAs && options.secureJsonData.clientSecret) {
        makeSameAs();
      } else if (!options.jsonData.azureLogAnalyticsSameAs) {
        // if currently off, clear monitor secret
        onUpdateDatasourceOptions(_objectSpread({}, options, {
          jsonData: _objectSpread({}, options.jsonData, {
            azureLogAnalyticsSameAs: !options.jsonData.azureLogAnalyticsSameAs
          }),
          secureJsonData: _objectSpread({}, options.secureJsonData, {
            clientSecret: ''
          }),
          secureJsonFields: {
            clientSecret: false
          }
        }));

        _this.setState({
          sameAsSwitched: true
        });
      } else {
        _this.props.onUpdateJsonDataOption('azureLogAnalyticsSameAs', !options.jsonData.azureLogAnalyticsSameAs);
      }
    };

    _this.onLogAnalyticsResetClientSecret = function () {
      _this.props.onResetOptionKey('logAnalyticsClientSecret');
    };

    _this.hasWorkspaceRequiredFields = function () {
      var _this$props$options = _this.props.options,
          jsonData = _this$props$options.jsonData,
          secureJsonData = _this$props$options.secureJsonData,
          secureJsonFields = _this$props$options.secureJsonFields;

      if (jsonData.azureLogAnalyticsSameAs) {
        return jsonData.tenantId && jsonData.clientId && jsonData.subscriptionId && (secureJsonData.clientSecret || secureJsonFields.clientSecret);
      }

      return jsonData.logAnalyticsTenantId && jsonData.logAnalyticsTenantId.length && jsonData.logAnalyticsClientId && jsonData.logAnalyticsClientId.length && jsonData.logAnalyticsSubscriptionId && (secureJsonFields.logAnalyticsClientSecret || secureJsonData.logAnalyticsClientSecret);
    };

    _this.state = {
      sameAsSwitched: false
    };
    return _this;
  }

  _createClass(AnalyticsConfig, [{
    key: "render",
    value: function render() {
      var _jsonData$azureLogAna,
          _this2 = this;

      var _this$props2 = this.props,
          _this$props2$options = _this$props2.options,
          jsonData = _this$props2$options.jsonData,
          secureJsonData = _this$props2$options.secureJsonData,
          secureJsonFields = _this$props2$options.secureJsonFields,
          subscriptions = _this$props2.subscriptions,
          workspaces = _this$props2.workspaces;
      var sameAsSwitched = this.state.sameAsSwitched;

      if (!jsonData.hasOwnProperty('azureLogAnalyticsSameAs')) {
        jsonData.azureLogAnalyticsSameAs = true;
      }

      var addtlAttrs = _objectSpread({}, jsonData.azureLogAnalyticsSameAs && {
        tooltip: 'Workspaces are pulled from default subscription selected above.'
      });

      var showSameAsHelpMsg = sameAsSwitched && jsonData.azureLogAnalyticsSameAs && secureJsonFields && !secureJsonFields.clientSecret && !secureJsonData.clientSecret;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: "page-heading"
      }, "Azure Log Analytics API Details"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Switch, _extends({
        label: "Same details as Azure Monitor API",
        checked: (_jsonData$azureLogAna = jsonData.azureLogAnalyticsSameAs) !== null && _jsonData$azureLogAna !== void 0 ? _jsonData$azureLogAna : false,
        onChange: this.onAzureLogAnalyticsSameAsChange
      }, addtlAttrs)), showSameAsHelpMsg && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "grafana-info-box m-t-2"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "alert-body"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Re-enter your Azure Monitor Client Secret to use this setting."))), !jsonData.azureLogAnalyticsSameAs && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AzureCredentialsForm__WEBPACK_IMPORTED_MODULE_1__["AzureCredentialsForm"], {
        subscriptionOptions: subscriptions,
        selectedSubscription: jsonData.logAnalyticsSubscriptionId,
        tenantId: jsonData.logAnalyticsTenantId,
        clientId: jsonData.logAnalyticsClientId,
        clientSecret: secureJsonData.logAnalyticsClientSecret,
        clientSecretConfigured: secureJsonFields.logAnalyticsClientSecret,
        onSubscriptionSelectChange: this.onLogAnalyticsSubscriptionSelect,
        onTenantIdChange: this.onLogAnalyticsTenantIdChange,
        onClientIdChange: this.onLogAnalyticsClientIdChange,
        onClientSecretChange: this.onLogAnalyticsClientSecretChange,
        onResetClientSecret: this.onLogAnalyticsResetClientSecret,
        onLoadSubscriptions: function onLoadSubscriptions() {
          return _this2.props.onLoadSubscriptions('workspacesloganalytics');
        }
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
        className: "width-12",
        tooltip: "Choose the default/preferred Workspace for Azure Log Analytics queries."
      }, "Default Workspace"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "width-25"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Select, {
        value: workspaces.find(function (workspace) {
          return workspace.value === jsonData.logAnalyticsDefaultWorkspace;
        }),
        options: workspaces,
        defaultValue: jsonData.logAnalyticsDefaultWorkspace,
        onChange: this.onWorkspaceSelectChange
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "max-width-30 gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        variant: "secondary",
        size: "sm",
        type: "button",
        onClick: function onClick() {
          return _this2.props.onLoadWorkspaces();
        },
        disabled: !this.hasWorkspaceRequiredFields()
      }, "Load Workspaces"))))));
    }
  }]);

  return AnalyticsConfig;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (AnalyticsConfig);

/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/AzureCredentialsForm.tsx":
/*!************************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/AzureCredentialsForm.tsx ***!
  \************************************************************************************************************/
/*! exports provided: AzureCredentialsForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AzureCredentialsForm", function() { return AzureCredentialsForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Select = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].Select,
    Input = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].Input;
var AzureCredentialsForm =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AzureCredentialsForm, _PureComponent);

  function AzureCredentialsForm() {
    _classCallCheck(this, AzureCredentialsForm);

    return _possibleConstructorReturn(this, _getPrototypeOf(AzureCredentialsForm).apply(this, arguments));
  }

  _createClass(AzureCredentialsForm, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          selectedAzureCloud = _this$props.selectedAzureCloud,
          selectedSubscription = _this$props.selectedSubscription,
          tenantId = _this$props.tenantId,
          clientId = _this$props.clientId,
          clientSecret = _this$props.clientSecret,
          clientSecretConfigured = _this$props.clientSecretConfigured,
          azureCloudOptions = _this$props.azureCloudOptions,
          subscriptionOptions = _this$props.subscriptionOptions,
          onAzureCloudChange = _this$props.onAzureCloudChange,
          onSubscriptionSelectChange = _this$props.onSubscriptionSelectChange,
          onTenantIdChange = _this$props.onTenantIdChange,
          onClientIdChange = _this$props.onClientIdChange,
          onClientSecretChange = _this$props.onClientSecretChange,
          onResetClientSecret = _this$props.onResetClientSecret,
          onLoadSubscriptions = _this$props.onLoadSubscriptions;
      var hasRequiredFields = tenantId && clientId && (clientSecret || clientSecretConfigured);
      var hasSubscriptions = onLoadSubscriptions && subscriptionOptions;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-group"
      }, azureCloudOptions && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-12",
        tooltip: "Choose an Azure Cloud."
      }, "Azure Cloud"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Select, {
        className: "width-15",
        value: azureCloudOptions.find(function (azureCloud) {
          return azureCloud.value === selectedAzureCloud;
        }),
        options: azureCloudOptions,
        defaultValue: selectedAzureCloud,
        onChange: onAzureCloudChange
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-12"
      }, "Directory (tenant) ID"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "width-15"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        className: "width-30",
        placeholder: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        value: tenantId || '',
        onChange: onTenantIdChange
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-12"
      }, "Application (client) ID"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "width-15"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        className: "width-30",
        placeholder: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        value: clientId || '',
        onChange: onClientIdChange
      })))), clientSecretConfigured ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-12"
      }, "Client Secret"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        className: "width-25",
        placeholder: "configured",
        disabled: true
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "max-width-30 gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        variant: "secondary",
        type: "button",
        onClick: onResetClientSecret
      }, "reset")))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-12"
      }, "Client Secret"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "width-15"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        className: "width-30",
        placeholder: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        value: clientSecret || '',
        onChange: onClientSecretChange
      })))), hasSubscriptions && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-12"
      }, "Default Subscription"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "width-25"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Select, {
        value: subscriptionOptions.find(function (subscription) {
          return subscription.value === selectedSubscription;
        }),
        options: subscriptionOptions,
        defaultValue: selectedSubscription,
        onChange: onSubscriptionSelectChange
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "max-width-30 gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        variant: "secondary",
        size: "sm",
        type: "button",
        onClick: onLoadSubscriptions,
        disabled: !hasRequiredFields
      }, "Load Subscriptions")))))));
    }
  }]);

  return AzureCredentialsForm;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (AzureCredentialsForm);

/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/ConfigEditor.tsx":
/*!****************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/ConfigEditor.tsx ***!
  \****************************************************************************************************/
/*! exports provided: ConfigEditor, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _MonitorConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MonitorConfig */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/MonitorConfig.tsx");
/* harmony import */ var _AnalyticsConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AnalyticsConfig */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/AnalyticsConfig.tsx");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _InsightsConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InsightsConfig */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/InsightsConfig.tsx");
/* harmony import */ var _azure_monitor_response_parser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../azure_monitor/response_parser */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/response_parser.ts");
/* harmony import */ var app_core_utils_CancelablePromise__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/utils/CancelablePromise */ "./public/app/core/utils/CancelablePromise.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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









var ConfigEditor =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ConfigEditor, _PureComponent);

  function ConfigEditor(props) {
    var _this;

    _classCallCheck(this, ConfigEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConfigEditor).call(this, props));
    _this.initPromise = null;
    _this.templateSrv = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getTemplateSrv"])();
    _this.init =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.getSubscriptions();

            case 2:
              if (_this.props.options.jsonData.azureLogAnalyticsSameAs) {
                _context.next = 5;
                break;
              }

              _context.next = 5;
              return _this.getLogAnalyticsSubscriptions();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    _this.updateJsonDataOption = function (key, val) {
      Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["updateDatasourcePluginJsonDataOption"])(_this.props, key, val);
    };

    _this.updateSecureJsonDataOption = function (key, val) {
      Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["updateDatasourcePluginSecureJsonDataOption"])(_this.props, key, val);
    };

    _this.resetSecureKey = function (key) {
      Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["updateDatasourcePluginResetOption"])(_this.props, key);
    };

    _this.onUpdateJsonDataOption = function (key) {
      return function (event) {
        _this.updateJsonDataOption(key, event.currentTarget.value);
      };
    };

    _this.onUpdateSecureJsonDataOption = function (key) {
      return function (event) {
        _this.updateSecureJsonDataOption(key, event.currentTarget.value);
      };
    };

    _this.makeSameAs = function (updatedClientSecret) {
      var options = _this.props.options;
      var clientSecret = updatedClientSecret || options.secureJsonData.clientSecret;

      _this.props.onOptionsChange(_objectSpread({}, options, {
        jsonData: _objectSpread({}, options.jsonData, {
          azureLogAnalyticsSameAs: true,
          logAnalyticsSubscriptionId: options.jsonData.subscriptionId,
          logAnalyticsTenantId: options.jsonData.tenantId,
          logAnalyticsClientId: options.jsonData.clientId
        }),
        secureJsonData: _objectSpread({}, options.secureJsonData, {
          clientSecret: clientSecret,
          logAnalyticsClientSecret: clientSecret
        })
      }));
    };

    _this.hasNecessaryCredentials = function () {
      if (!_this.props.options.secureJsonFields.clientSecret && !_this.props.options.secureJsonData.clientSecret) {
        return false;
      }

      if (!_this.props.options.jsonData.clientId || !_this.props.options.jsonData.tenantId) {
        return false;
      }

      return true;
    };

    _this.logAnalyticsHasNecessaryCredentials = function () {
      if (!_this.props.options.secureJsonFields.logAnalyticsClientSecret && !_this.props.options.secureJsonData.logAnalyticsClientSecret) {
        return false;
      }

      if (!_this.props.options.jsonData.logAnalyticsClientId || !_this.props.options.jsonData.logAnalyticsTenantId) {
        return false;
      }

      return true;
    };

    _this.onLoadSubscriptions =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(type) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getBackendSrv"])().put("/api/datasources/".concat(_this.props.options.id), _this.props.options).then(function (result) {
                  Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["updateDatasourcePluginOption"])(_this.props, 'version', result.version);
                });

              case 2:
                if (type && type === 'workspacesloganalytics') {
                  _this.getLogAnalyticsSubscriptions();
                } else {
                  _this.getSubscriptions();
                }

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.loadSubscriptions =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(route) {
        var url, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                url = "/".concat(route || _this.props.options.jsonData.cloudName, "/subscriptions?api-version=2019-03-01");
                _context3.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getBackendSrv"])().datasourceRequest({
                  url: _this.props.options.url + url,
                  method: 'GET'
                });

              case 3:
                result = _context3.sent;
                return _context3.abrupt("return", _azure_monitor_response_parser__WEBPACK_IMPORTED_MODULE_6__["default"].parseSubscriptionsForSelect(result));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.loadWorkspaces =
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(subscription) {
        var _this$props$options$j, azureLogAnalyticsSameAs, cloudName, logAnalyticsSubscriptionId, azureMonitorUrl, subscriptionId, azureCloud, workspaceListUrl, result;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this$props$options$j = _this.props.options.jsonData, azureLogAnalyticsSameAs = _this$props$options$j.azureLogAnalyticsSameAs, cloudName = _this$props$options$j.cloudName, logAnalyticsSubscriptionId = _this$props$options$j.logAnalyticsSubscriptionId;
                azureMonitorUrl = '', subscriptionId = _this.templateSrv.replace(subscription || _this.props.options.jsonData.subscriptionId);

                if (azureLogAnalyticsSameAs) {
                  azureCloud = cloudName || 'azuremonitor';
                  azureMonitorUrl = "/".concat(azureCloud, "/subscriptions");
                } else {
                  subscriptionId = logAnalyticsSubscriptionId;
                  azureMonitorUrl = "/workspacesloganalytics/subscriptions";
                }

                workspaceListUrl = azureMonitorUrl + "/".concat(subscriptionId, "/providers/Microsoft.OperationalInsights/workspaces?api-version=2017-04-26-preview");
                _context4.next = 6;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getBackendSrv"])().datasourceRequest({
                  url: _this.props.options.url + workspaceListUrl,
                  method: 'GET'
                });

              case 6:
                result = _context4.sent;
                return _context4.abrupt("return", _azure_monitor_response_parser__WEBPACK_IMPORTED_MODULE_6__["default"].parseWorkspacesForSelect(result));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x3) {
        return _ref4.apply(this, arguments);
      };
    }();

    _this.getSubscriptions =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var subscriptions;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (_this.hasNecessaryCredentials()) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return");

            case 2:
              _context5.next = 4;
              return _this.loadSubscriptions();

            case 4:
              _context5.t0 = _context5.sent;

              if (_context5.t0) {
                _context5.next = 7;
                break;
              }

              _context5.t0 = [];

            case 7:
              subscriptions = _context5.t0;

              if (subscriptions && subscriptions.length > 0) {
                _this.setState({
                  subscriptions: subscriptions
                });

                _this.updateJsonDataOption('subscriptionId', _this.props.options.jsonData.subscriptionId || subscriptions[0].value);
              }

              if (!(_this.props.options.jsonData.subscriptionId && _this.props.options.jsonData.azureLogAnalyticsSameAs)) {
                _context5.next = 12;
                break;
              }

              _context5.next = 12;
              return _this.getWorkspaces();

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    _this.getLogAnalyticsSubscriptions =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var logAnalyticsSubscriptions;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (_this.logAnalyticsHasNecessaryCredentials()) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return");

            case 2:
              _context6.next = 4;
              return _this.loadSubscriptions('workspacesloganalytics');

            case 4:
              _context6.t0 = _context6.sent;

              if (_context6.t0) {
                _context6.next = 7;
                break;
              }

              _context6.t0 = [];

            case 7:
              logAnalyticsSubscriptions = _context6.t0;

              if (logAnalyticsSubscriptions && logAnalyticsSubscriptions.length > 0) {
                _this.setState({
                  logAnalyticsSubscriptions: logAnalyticsSubscriptions
                });

                _this.updateJsonDataOption('logAnalyticsSubscriptionId', _this.props.options.jsonData.logAnalyticsSubscriptionId || logAnalyticsSubscriptions[0].value);
              }

              if (!_this.props.options.jsonData.logAnalyticsSubscriptionId) {
                _context6.next = 12;
                break;
              }

              _context6.next = 12;
              return _this.getWorkspaces();

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));
    _this.getWorkspaces =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var _this$props$options$j2, subscriptionId, azureLogAnalyticsSameAs, logAnalyticsSubscriptionId, subscriptionIdToUse, logAnalyticsWorkspaces;

      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _this$props$options$j2 = _this.props.options.jsonData, subscriptionId = _this$props$options$j2.subscriptionId, azureLogAnalyticsSameAs = _this$props$options$j2.azureLogAnalyticsSameAs, logAnalyticsSubscriptionId = _this$props$options$j2.logAnalyticsSubscriptionId;
              subscriptionIdToUse = azureLogAnalyticsSameAs ? subscriptionId : logAnalyticsSubscriptionId;

              if (subscriptionIdToUse) {
                _context7.next = 4;
                break;
              }

              return _context7.abrupt("return");

            case 4:
              _context7.next = 6;
              return _this.loadWorkspaces(subscriptionIdToUse);

            case 6:
              logAnalyticsWorkspaces = _context7.sent;

              if (logAnalyticsWorkspaces.length > 0) {
                _this.setState({
                  logAnalyticsWorkspaces: logAnalyticsWorkspaces
                });

                _this.updateJsonDataOption('logAnalyticsDefaultWorkspace', _this.props.options.jsonData.logAnalyticsDefaultWorkspace || logAnalyticsWorkspaces[0].value);
              }

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));
    _this.state = {
      subscriptions: [],
      logAnalyticsSubscriptions: [],
      logAnalyticsWorkspaces: [],
      subscriptionId: '',
      logAnalyticsSubscriptionId: ''
    };

    if (_this.props.options.id) {
      Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["updateDatasourcePluginOption"])(_this.props, 'url', '/api/datasources/proxy/' + _this.props.options.id);
    }

    return _this;
  }

  _createClass(ConfigEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initPromise = Object(app_core_utils_CancelablePromise__WEBPACK_IMPORTED_MODULE_7__["makePromiseCancelable"])(this.init());
      this.initPromise.promise.catch(function (_ref8) {
        var isCanceled = _ref8.isCanceled;

        if (isCanceled) {
          console.warn('Azure Monitor ConfigEditor has unmounted, intialization was canceled');
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.initPromise.cancel();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          subscriptions = _this$state.subscriptions,
          logAnalyticsSubscriptions = _this$state.logAnalyticsSubscriptions,
          logAnalyticsWorkspaces = _this$state.logAnalyticsWorkspaces;
      var options = this.props.options;
      options.jsonData.cloudName = options.jsonData.cloudName || 'azuremonitor'; // This is bad, causes so many messy typing issues everwhere..

      options.secureJsonData = options.secureJsonData || {};
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MonitorConfig__WEBPACK_IMPORTED_MODULE_2__["MonitorConfig"], {
        options: options,
        subscriptions: subscriptions,
        makeSameAs: this.makeSameAs,
        onLoadSubscriptions: this.onLoadSubscriptions,
        onUpdateJsonDataOption: this.updateJsonDataOption,
        onUpdateSecureJsonDataOption: this.updateSecureJsonDataOption,
        onResetOptionKey: this.resetSecureKey
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AnalyticsConfig__WEBPACK_IMPORTED_MODULE_3__["AnalyticsConfig"], {
        options: options,
        workspaces: logAnalyticsWorkspaces,
        subscriptions: logAnalyticsSubscriptions,
        makeSameAs: this.makeSameAs,
        onUpdateDatasourceOptions: this.props.onOptionsChange,
        onUpdateJsonDataOption: this.updateJsonDataOption,
        onUpdateSecureJsonDataOption: this.updateSecureJsonDataOption,
        onResetOptionKey: this.resetSecureKey,
        onLoadSubscriptions: this.onLoadSubscriptions,
        onLoadWorkspaces: this.getWorkspaces
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InsightsConfig__WEBPACK_IMPORTED_MODULE_5__["InsightsConfig"], {
        options: options,
        onUpdateJsonDataOption: this.onUpdateJsonDataOption,
        onUpdateSecureJsonDataOption: this.onUpdateSecureJsonDataOption,
        onResetOptionKey: this.resetSecureKey
      }));
    }
  }]);

  return ConfigEditor;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (ConfigEditor);

/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/InsightsConfig.tsx":
/*!******************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/InsightsConfig.tsx ***!
  \******************************************************************************************************/
/*! exports provided: InsightsConfig, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsightsConfig", function() { return InsightsConfig; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Input = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].Input;
var InsightsConfig =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(InsightsConfig, _PureComponent);

  function InsightsConfig() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, InsightsConfig);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InsightsConfig)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onAppInsightsResetApiKey = function () {
      _this.props.onResetOptionKey('appInsightsApiKey');
    };

    return _this;
  }

  _createClass(InsightsConfig, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          options = _this$props.options,
          onUpdateJsonDataOption = _this$props.onUpdateJsonDataOption,
          onUpdateSecureJsonDataOption = _this$props.onUpdateSecureJsonDataOption;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: "page-heading"
      }, "Application Insights Details"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-group"
      }, options.secureJsonFields.appInsightsApiKey ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-12"
      }, "API Key"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        className: "width-25",
        placeholder: "configured",
        disabled: true
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "max-width-30 gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        variant: "secondary",
        type: "button",
        onClick: this.onAppInsightsResetApiKey
      }, "reset")))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-12"
      }, "API Key"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "width-15"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        className: "width-30",
        placeholder: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        value: options.secureJsonData.appInsightsApiKey || '',
        onChange: onUpdateSecureJsonDataOption('appInsightsApiKey')
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-12"
      }, "Application ID"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "width-15"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        className: "width-30",
        value: options.jsonData.appInsightsAppId || '',
        onChange: onUpdateJsonDataOption('appInsightsAppId')
      }))))));
    }
  }]);

  return InsightsConfig;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (InsightsConfig);

/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/MonitorConfig.tsx":
/*!*****************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/MonitorConfig.tsx ***!
  \*****************************************************************************************************/
/*! exports provided: MonitorConfig, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonitorConfig", function() { return MonitorConfig; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AzureCredentialsForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AzureCredentialsForm */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/AzureCredentialsForm.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var azureClouds = [{
  value: 'azuremonitor',
  label: 'Azure'
}, {
  value: 'govazuremonitor',
  label: 'Azure US Government'
}, {
  value: 'germanyazuremonitor',
  label: 'Azure Germany'
}, {
  value: 'chinaazuremonitor',
  label: 'Azure China'
}];
var MonitorConfig =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(MonitorConfig, _PureComponent);

  function MonitorConfig() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MonitorConfig);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MonitorConfig)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onAzureCloudSelect = function (cloudName) {
      _this.props.onUpdateJsonDataOption('cloudName', cloudName.value);
    };

    _this.onTenantIdChange = function (event) {
      _this.props.onUpdateJsonDataOption('tenantId', event.target.value);
    };

    _this.onClientIdChange = function (event) {
      _this.props.onUpdateJsonDataOption('clientId', event.target.value);
    };

    _this.onClientSecretChange = function (event) {
      var _this$props = _this.props,
          options = _this$props.options,
          makeSameAs = _this$props.makeSameAs;

      if (options.jsonData.azureLogAnalyticsSameAs && event.target.value) {
        makeSameAs(event.target.value);
      } else {
        _this.props.onUpdateSecureJsonDataOption('clientSecret', event.target.value);
      }
    };

    _this.onResetClientSecret = function () {
      _this.props.onResetOptionKey('clientSecret');
    };

    _this.onSubscriptionSelect = function (subscription) {
      _this.props.onUpdateJsonDataOption('subscriptionId', subscription.value);
    };

    return _this;
  }

  _createClass(MonitorConfig, [{
    key: "render",
    value: function render() {
      var _options$secureJsonDa;

      var _this$props2 = this.props,
          options = _this$props2.options,
          subscriptions = _this$props2.subscriptions;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: "page-heading"
      }, "Azure Monitor Details"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AzureCredentialsForm__WEBPACK_IMPORTED_MODULE_1__["AzureCredentialsForm"], {
        selectedAzureCloud: options.jsonData.cloudName || 'azuremonitor',
        azureCloudOptions: azureClouds,
        subscriptionOptions: subscriptions,
        selectedSubscription: options.jsonData.subscriptionId,
        tenantId: options.jsonData.tenantId,
        clientId: options.jsonData.clientId,
        clientSecret: (_options$secureJsonDa = options.secureJsonData) === null || _options$secureJsonDa === void 0 ? void 0 : _options$secureJsonDa.clientSecret,
        clientSecretConfigured: options.secureJsonFields.clientSecret,
        onAzureCloudChange: this.onAzureCloudSelect,
        onSubscriptionSelectChange: this.onSubscriptionSelect,
        onTenantIdChange: this.onTenantIdChange,
        onClientIdChange: this.onClientIdChange,
        onClientSecretChange: this.onClientSecretChange,
        onResetClientSecret: this.onResetClientSecret,
        onLoadSubscriptions: this.props.onLoadSubscriptions
      }));
    }
  }]);

  return MonitorConfig;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (MonitorConfig);

/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/datasource.ts":
/*!**************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/datasource.ts ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Datasource; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _azure_monitor_azure_monitor_datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./azure_monitor/azure_monitor_datasource */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/azure_monitor_datasource.ts");
/* harmony import */ var _app_insights_app_insights_datasource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app_insights/app_insights_datasource */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/app_insights/app_insights_datasource.ts");
/* harmony import */ var _azure_log_analytics_azure_log_analytics_datasource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./azure_log_analytics/azure_log_analytics_datasource */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_log_analytics/azure_log_analytics_datasource.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/types.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _insights_analytics_insights_analytics_datasource__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./insights_analytics/insights_analytics_datasource */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/insights_analytics/insights_analytics_datasource.ts");
/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./query_ctrl */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/query_ctrl.ts");
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











var Datasource =
/*#__PURE__*/
function (_DataSourceApi) {
  _inherits(Datasource, _DataSourceApi);

  function Datasource(instanceSettings) {
    var _this;

    _classCallCheck(this, Datasource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Datasource).call(this, instanceSettings));
    _this.azureMonitorDatasource = new _azure_monitor_azure_monitor_datasource__WEBPACK_IMPORTED_MODULE_1__["default"](instanceSettings);
    _this.appInsightsDatasource = new _app_insights_app_insights_datasource__WEBPACK_IMPORTED_MODULE_2__["default"](instanceSettings);
    _this.azureLogAnalyticsDatasource = new _azure_log_analytics_azure_log_analytics_datasource__WEBPACK_IMPORTED_MODULE_3__["default"](instanceSettings);
    _this.insightsAnalyticsDatasource = new _insights_analytics_insights_analytics_datasource__WEBPACK_IMPORTED_MODULE_7__["default"](instanceSettings);
    var pseudoDatasource = {};
    pseudoDatasource[_types__WEBPACK_IMPORTED_MODULE_4__["AzureQueryType"].ApplicationInsights] = _this.appInsightsDatasource;
    pseudoDatasource[_types__WEBPACK_IMPORTED_MODULE_4__["AzureQueryType"].AzureMonitor] = _this.azureMonitorDatasource;
    pseudoDatasource[_types__WEBPACK_IMPORTED_MODULE_4__["AzureQueryType"].InsightsAnalytics] = _this.insightsAnalyticsDatasource;
    pseudoDatasource[_types__WEBPACK_IMPORTED_MODULE_4__["AzureQueryType"].LogAnalytics] = _this.azureLogAnalyticsDatasource;
    _this.pseudoDatasource = pseudoDatasource;
    var optionsKey = {};
    optionsKey[_types__WEBPACK_IMPORTED_MODULE_4__["AzureQueryType"].ApplicationInsights] = 'appInsights';
    optionsKey[_types__WEBPACK_IMPORTED_MODULE_4__["AzureQueryType"].AzureMonitor] = 'azureMonitor';
    optionsKey[_types__WEBPACK_IMPORTED_MODULE_4__["AzureQueryType"].InsightsAnalytics] = 'insightsAnalytics';
    optionsKey[_types__WEBPACK_IMPORTED_MODULE_4__["AzureQueryType"].LogAnalytics] = 'azureLogAnalytics';
    _this.optionsKey = optionsKey;
    return _this;
  }

  _createClass(Datasource, [{
    key: "query",
    value: function query(options) {
      var _this2 = this;

      var byType = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = options.targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var target = _step.value;

          // Migrate old query structure
          if (target.queryType === _types__WEBPACK_IMPORTED_MODULE_4__["AzureQueryType"].ApplicationInsights) {
            if (target.appInsights.rawQuery) {
              target.queryType = _types__WEBPACK_IMPORTED_MODULE_4__["AzureQueryType"].InsightsAnalytics;
              target.insightsAnalytics = target.appInsights;
              delete target.appInsights;
            }
          }

          if (!target.queryType) {
            target.queryType = _types__WEBPACK_IMPORTED_MODULE_4__["AzureQueryType"].AzureMonitor;
          }

          if (target.queryType === _types__WEBPACK_IMPORTED_MODULE_4__["AzureQueryType"].AzureMonitor) {
            Object(_query_ctrl__WEBPACK_IMPORTED_MODULE_8__["migrateMetricsDimensionFilters"])(target.azureMonitor);
          } // Check that we have options


          var opts = target[this.optionsKey[target.queryType]]; // Skip hidden queries or ones without properties

          if (target.hide || !opts) {
            continue;
          } // Initalize the list of queries


          var q = byType[target.queryType];

          if (!q) {
            q = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.cloneDeep(options);
            q.targets = [];
            byType[target.queryType] = q;
          }

          q.targets.push(target);
        } // Distinct types are managed by distinct requests

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

      var obs = Object.keys(byType).map(function (type) {
        var req = byType[type];
        return _this2.pseudoDatasource[type].query(req);
      }); // Single query can skip merge

      if (obs.length === 1) {
        return obs[0];
      }

      if (obs.length > 1) {
        // Not accurate, but simple and works
        // should likely be more like the mixed data source
        var promises = obs.map(function (o) {
          return o.toPromise();
        });
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])(Promise.all(promises).then(function (results) {
          return {
            data: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.flatten(results)
          };
        }));
      }

      return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])({
        state: _grafana_data__WEBPACK_IMPORTED_MODULE_5__["LoadingState"].Done
      });
    }
  }, {
    key: "annotationQuery",
    value: function () {
      var _annotationQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(options) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.azureLogAnalyticsDatasource.annotationQuery(options));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function annotationQuery(_x) {
        return _annotationQuery.apply(this, arguments);
      }

      return annotationQuery;
    }()
  }, {
    key: "metricFindQuery",
    value: function () {
      var _metricFindQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(query) {
        var aiResult, amResult, alaResult;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (query) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", Promise.resolve([]));

              case 2:
                aiResult = this.appInsightsDatasource.metricFindQueryInternal(query);

                if (!aiResult) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", aiResult);

              case 5:
                amResult = this.azureMonitorDatasource.metricFindQueryInternal(query);

                if (!amResult) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", amResult);

              case 8:
                alaResult = this.azureLogAnalyticsDatasource.metricFindQueryInternal(query);

                if (!alaResult) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", alaResult);

              case 11:
                return _context2.abrupt("return", Promise.resolve([]));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function metricFindQuery(_x2) {
        return _metricFindQuery.apply(this, arguments);
      }

      return metricFindQuery;
    }()
  }, {
    key: "testDatasource",
    value: function () {
      var _testDatasource = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var promises;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                promises = [];

                if (this.azureMonitorDatasource.isConfigured()) {
                  promises.push(this.azureMonitorDatasource.testDatasource());
                }

                if (this.appInsightsDatasource.isConfigured()) {
                  promises.push(this.appInsightsDatasource.testDatasource());
                }

                if (this.azureLogAnalyticsDatasource.isConfigured()) {
                  promises.push(this.azureLogAnalyticsDatasource.testDatasource());
                }

                if (!(promises.length === 0)) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", {
                  status: 'error',
                  message: "Nothing configured. At least one of the API's must be configured.",
                  title: 'Error'
                });

              case 6:
                return _context3.abrupt("return", Promise.all(promises).then(function (results) {
                  var status = 'success';
                  var message = '';

                  for (var i = 0; i < results.length; i++) {
                    if (results[i].status !== 'success') {
                      status = results[i].status;
                    }

                    message += "".concat(i + 1, ". ").concat(results[i].message, " ");
                  }

                  return {
                    status: status,
                    message: message,
                    title: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.upperFirst(status)
                  };
                }));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function testDatasource() {
        return _testDatasource.apply(this, arguments);
      }

      return testDatasource;
    }()
    /* Azure Monitor REST API methods */

  }, {
    key: "getResourceGroups",
    value: function getResourceGroups(subscriptionId) {
      return this.azureMonitorDatasource.getResourceGroups(subscriptionId);
    }
  }, {
    key: "getMetricDefinitions",
    value: function getMetricDefinitions(subscriptionId, resourceGroup) {
      return this.azureMonitorDatasource.getMetricDefinitions(subscriptionId, resourceGroup);
    }
  }, {
    key: "getResourceNames",
    value: function getResourceNames(subscriptionId, resourceGroup, metricDefinition) {
      return this.azureMonitorDatasource.getResourceNames(subscriptionId, resourceGroup, metricDefinition);
    }
  }, {
    key: "getMetricNames",
    value: function getMetricNames(subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace) {
      return this.azureMonitorDatasource.getMetricNames(subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace);
    }
  }, {
    key: "getMetricNamespaces",
    value: function getMetricNamespaces(subscriptionId, resourceGroup, metricDefinition, resourceName) {
      return this.azureMonitorDatasource.getMetricNamespaces(subscriptionId, resourceGroup, metricDefinition, resourceName);
    }
  }, {
    key: "getMetricMetadata",
    value: function getMetricMetadata(subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace, metricName) {
      return this.azureMonitorDatasource.getMetricMetadata(subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace, metricName);
    }
    /* Application Insights API method */

  }, {
    key: "getAppInsightsMetricNames",
    value: function getAppInsightsMetricNames() {
      return this.appInsightsDatasource.getMetricNames();
    }
  }, {
    key: "getAppInsightsMetricMetadata",
    value: function getAppInsightsMetricMetadata(metricName) {
      return this.appInsightsDatasource.getMetricMetadata(metricName);
    }
  }, {
    key: "getAppInsightsColumns",
    value: function getAppInsightsColumns(refId) {
      return this.appInsightsDatasource.logAnalyticsColumns[refId];
    }
    /*Azure Log Analytics */

  }, {
    key: "getAzureLogAnalyticsWorkspaces",
    value: function getAzureLogAnalyticsWorkspaces(subscriptionId) {
      return this.azureLogAnalyticsDatasource.getWorkspaces(subscriptionId);
    }
  }, {
    key: "getSubscriptions",
    value: function getSubscriptions() {
      return this.azureMonitorDatasource.getSubscriptions();
    }
  }, {
    key: "interpolateVariablesInQueries",
    value: function interpolateVariablesInQueries(queries, scopedVars) {
      var _this3 = this;

      return queries.map(function (query) {
        return _this3.pseudoDatasource[query.queryType].applyTemplateVariables(query, scopedVars);
      });
    }
  }]);

  return Datasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["DataSourceApi"]);



/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/KustoQueryField.tsx":
/*!***************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/KustoQueryField.tsx ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return KustoQueryField; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var slate_plain_serializer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! slate-plain-serializer */ "./node_modules/slate-plain-serializer/lib/slate-plain-serializer.es.js");
/* harmony import */ var _query_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query_field */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/query_field.tsx");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _kusto_kusto__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./kusto/kusto */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/kusto/kusto.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






 // import '../sass/editor.base.scss';

var TYPEAHEAD_DELAY = 100;

var defaultSchema = function defaultSchema() {
  return {
    Databases: {
      Default: {}
    }
  };
};

var cleanText = function cleanText(s) {
  return s.replace(/[{}[\]="(),!~+\-*/^%]/g, '').trim();
};

var wrapText = function wrapText(text) {
  return {
    text: text
  };
};

var KustoQueryField =
/*#__PURE__*/
function (_QueryField) {
  _inherits(KustoQueryField, _QueryField);

  function KustoQueryField(props, context) {
    var _this;

    _classCallCheck(this, KustoQueryField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(KustoQueryField).call(this, props, context));

    _this.onTypeahead = function () {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var selection = window.getSelection();

      if (selection && selection.anchorNode) {
        var wrapperNode = selection.anchorNode.parentElement;

        if (wrapperNode === null) {
          return;
        }

        var editorNode = wrapperNode.closest('.slate-query-field');

        if (!editorNode || _this.state.value.isBlurred) {
          // Not inside this editor
          return;
        } // DOM ranges


        var range = selection.getRangeAt(0);
        var text = selection.anchorNode.textContent;

        if (text === null) {
          return;
        }

        var offset = range.startOffset;
        var prefix = cleanText(text.substr(0, offset)); // Model ranges

        var modelOffset = _this.state.value.anchorOffset;

        var modelPrefix = _this.state.value.anchorText.text.slice(0, modelOffset); // Determine candidates by context


        var suggestionGroups = [];
        var wrapperClasses = wrapperNode.classList;
        var typeaheadContext = null; // Built-in functions

        if (wrapperClasses.contains('function-context')) {
          typeaheadContext = 'context-function';
          suggestionGroups = _this.getColumnSuggestions(); // where
        } else if (modelPrefix.match(/(where\s(\w+\b)?$)/i)) {
          typeaheadContext = 'context-where';
          suggestionGroups = _this.getColumnSuggestions(); // summarize by
        } else if (modelPrefix.match(/(summarize\s(\w+\b)?$)/i)) {
          typeaheadContext = 'context-summarize';
          suggestionGroups = _this.getFunctionSuggestions();
        } else if (modelPrefix.match(/(summarize\s(.+\s)?by\s+([^,\s]+,\s*)*([^,\s]+\b)?$)/i)) {
          typeaheadContext = 'context-summarize-by';
          suggestionGroups = _this.getColumnSuggestions(); // order by, top X by, ... by ...
        } else if (modelPrefix.match(/(by\s+([^,\s]+,\s*)*([^,\s]+\b)?$)/i)) {
          typeaheadContext = 'context-by';
          suggestionGroups = _this.getColumnSuggestions(); // join
        } else if (modelPrefix.match(/(on\s(.+\b)?$)/i)) {
          typeaheadContext = 'context-join-on';
          suggestionGroups = _this.getColumnSuggestions();
        } else if (modelPrefix.match(/(join\s+(\(\s+)?(\w+\b)?$)/i)) {
          typeaheadContext = 'context-join';
          suggestionGroups = _this.getTableSuggestions(); // distinct
        } else if (modelPrefix.match(/(distinct\s(.+\b)?$)/i)) {
          typeaheadContext = 'context-distinct';
          suggestionGroups = _this.getColumnSuggestions(); // database()
        } else if (modelPrefix.match(/(database\(\"(\w+)\"\)\.(.+\b)?$)/i)) {
          typeaheadContext = 'context-database-table';

          var db = _this.getDBFromDatabaseFunction(modelPrefix);

          suggestionGroups = _this.getTableSuggestions(db);
          prefix = prefix.replace('.', ''); // new
        } else if (normalizeQuery(slate_plain_serializer__WEBPACK_IMPORTED_MODULE_1__["default"].serialize(_this.state.value)).match(/^\s*\w*$/i)) {
          typeaheadContext = 'context-new';

          if (_this.schema) {
            suggestionGroups = _this.getInitialSuggestions();
          } else {
            _this.fetchSchema();

            setTimeout(_this.onTypeahead, 0);
            return;
          } // built-in

        } else if (prefix && !wrapperClasses.contains('argument') && !force) {
          // Use only last typed word as a prefix for searching
          if (modelPrefix.match(/\s$/i)) {
            prefix = '';
            return;
          }

          prefix = getLastWord(prefix);
          typeaheadContext = 'context-builtin';
          suggestionGroups = _this.getKeywordSuggestions();
        } else if (force === true) {
          typeaheadContext = 'context-builtin-forced';

          if (modelPrefix.match(/\s$/i)) {
            prefix = '';
          }

          suggestionGroups = _this.getKeywordSuggestions();
        }

        var results = 0;
        prefix = prefix.toLowerCase();
        var filteredSuggestions = suggestionGroups.map(function (group) {
          if (group.items && prefix && !group.skipFilter) {
            group.items = group.items.filter(function (c) {
              return c.text.length >= prefix.length;
            });

            if (group.prefixMatch) {
              group.items = group.items.filter(function (c) {
                return c.text.toLowerCase().indexOf(prefix) === 0;
              });
            } else {
              group.items = group.items.filter(function (c) {
                return c.text.toLowerCase().indexOf(prefix) > -1;
              });
            }
          }

          results += group.items.length;
          return group;
        }).filter(function (group) {
          return group.items.length > 0;
        }); // console.log('onTypeahead', selection.anchorNode, wrapperClasses, text, offset, prefix, typeaheadContext);
        // console.log('onTypeahead', prefix, typeaheadContext, force);

        _this.setState({
          typeaheadPrefix: prefix,
          typeaheadContext: typeaheadContext,
          typeaheadText: text,
          suggestions: results > 0 ? filteredSuggestions : []
        });
      }
    };

    _this.applyTypeahead = function (editor, suggestion) {
      var _this$state = _this.state,
          typeaheadPrefix = _this$state.typeaheadPrefix,
          typeaheadContext = _this$state.typeaheadContext,
          typeaheadText = _this$state.typeaheadText;
      var suggestionText = suggestion.text || suggestion;
      var move = 0; // Modify suggestion based on context

      var nextChar = _grafana_ui__WEBPACK_IMPORTED_MODULE_4__["DOMUtil"].getNextCharacter();

      if (suggestion.type === 'function') {
        if (!nextChar || nextChar !== '(') {
          suggestionText += '(';
        }
      } else if (typeaheadContext === 'context-function') {
        if (!nextChar || nextChar !== ')') {
          suggestionText += ')';
        }
      } else {
        if (!nextChar || nextChar !== ' ') {
          suggestionText += ' ';
        }
      } // Remove the current, incomplete text and replace it with the selected suggestion


      var backward = suggestion.deleteBackwards || typeaheadPrefix.length;
      var text = cleanText(typeaheadText);
      var suffixLength = text.length - typeaheadPrefix.length;
      var offset = typeaheadText.indexOf(typeaheadPrefix);
      var midWord = typeaheadPrefix && (suffixLength > 0 && offset > -1 || suggestionText === typeaheadText);
      var forward = midWord ? suffixLength + offset : 0;

      _this.resetTypeahead(function () {
        return editor.deleteBackward(backward).deleteForward(forward).insertText(suggestionText).moveForward(move).focus();
      });

      return editor;
    };

    _this.schema = defaultSchema();
    _this.onTypeahead = lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()(_this.onTypeahead, TYPEAHEAD_DELAY);
    return _this;
  }

  _createClass(KustoQueryField, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(_getPrototypeOf(KustoQueryField.prototype), "componentDidMount", this).call(this);

      this.fetchSchema();
    }
  }, {
    key: "getInitialSuggestions",
    // private _getFieldsSuggestions(): SuggestionGroup[] {
    //   return [
    //     {
    //       prefixMatch: true,
    //       label: 'Fields',
    //       items: this.fields.map(wrapText)
    //     },
    //     {
    //       prefixMatch: true,
    //       label: 'Variables',
    //       items: this.props.templateVariables.map(wrapText)
    //     }
    //   ];
    // }
    // private _getAfterFromSuggestions(): SuggestionGroup[] {
    //   return [
    //     {
    //       skipFilter: true,
    //       label: 'Events',
    //       items: this.events.map(wrapText)
    //     },
    //     {
    //       prefixMatch: true,
    //       label: 'Variables',
    //       items: this.props.templateVariables
    //         .map(wrapText)
    //         .map(suggestion => {
    //           suggestion.deleteBackwards = 0;
    //           return suggestion;
    //         })
    //     }
    //   ];
    // }
    // private _getAfterSelectSuggestions(): SuggestionGroup[] {
    //   return [
    //     {
    //       prefixMatch: true,
    //       label: 'Fields',
    //       items: this.fields.map(wrapText)
    //     },
    //     {
    //       prefixMatch: true,
    //       label: 'Functions',
    //       items: FUNCTIONS.map((s: any) => { s.type = 'function'; return s; })
    //     },
    //     {
    //       prefixMatch: true,
    //       label: 'Variables',
    //       items: this.props.templateVariables.map(wrapText)
    //     }
    //   ];
    // }
    value: function getInitialSuggestions() {
      return this.getTableSuggestions();
    }
  }, {
    key: "getKeywordSuggestions",
    value: function getKeywordSuggestions() {
      return [{
        prefixMatch: true,
        label: 'Keywords',
        items: _kusto_kusto__WEBPACK_IMPORTED_MODULE_5__["KEYWORDS"].map(wrapText)
      }, {
        prefixMatch: true,
        label: 'Operators',
        items: _kusto_kusto__WEBPACK_IMPORTED_MODULE_5__["operatorTokens"]
      }, {
        prefixMatch: true,
        label: 'Functions',
        items: _kusto_kusto__WEBPACK_IMPORTED_MODULE_5__["functionTokens"].map(function (s) {
          s.type = 'function';
          return s;
        })
      }, {
        prefixMatch: true,
        label: 'Macros',
        items: _kusto_kusto__WEBPACK_IMPORTED_MODULE_5__["grafanaMacros"].map(function (s) {
          s.type = 'function';
          return s;
        })
      }, {
        prefixMatch: true,
        label: 'Tables',
        items: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.schema.Databases.Default.Tables, function (t) {
          return {
            text: t.Name
          };
        })
      }];
    }
  }, {
    key: "getFunctionSuggestions",
    value: function getFunctionSuggestions() {
      return [{
        prefixMatch: true,
        label: 'Functions',
        items: _kusto_kusto__WEBPACK_IMPORTED_MODULE_5__["functionTokens"].map(function (s) {
          s.type = 'function';
          return s;
        })
      }, {
        prefixMatch: true,
        label: 'Macros',
        items: _kusto_kusto__WEBPACK_IMPORTED_MODULE_5__["grafanaMacros"].map(function (s) {
          s.type = 'function';
          return s;
        })
      }];
    }
  }, {
    key: "getTableSuggestions",
    value: function getTableSuggestions() {
      var db = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Default';

      // @ts-ignore
      if (this.schema.Databases[db]) {
        return [{
          prefixMatch: true,
          label: 'Tables',
          // @ts-ignore
          items: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.schema.Databases[db].Tables, function (t) {
            return {
              text: t.Name
            };
          })
        }];
      } else {
        return [];
      }
    }
  }, {
    key: "getColumnSuggestions",
    value: function getColumnSuggestions() {
      var table = this.getTableFromContext();

      if (table) {
        var tableSchema = this.schema.Databases.Default.Tables[table];

        if (tableSchema) {
          return [{
            prefixMatch: true,
            label: 'Fields',
            items: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(tableSchema.OrderedColumns, function (f) {
              return {
                text: f.Name,
                hint: f.Type
              };
            })
          }];
        }
      }

      return [];
    }
  }, {
    key: "getTableFromContext",
    value: function getTableFromContext() {
      var query = slate_plain_serializer__WEBPACK_IMPORTED_MODULE_1__["default"].serialize(this.state.value);
      var tablePattern = /^\s*(\w+)\s*|/g;
      var normalizedQuery = normalizeQuery(query);
      var match = tablePattern.exec(normalizedQuery);

      if (match && match.length > 1 && match[0] && match[1]) {
        return match[1];
      } else {
        return null;
      }
    }
  }, {
    key: "getDBFromDatabaseFunction",
    value: function getDBFromDatabaseFunction(prefix) {
      var databasePattern = /database\(\"(\w+)\"\)/gi;
      var match = databasePattern.exec(prefix);

      if (match && match.length > 1 && match[0] && match[1]) {
        return match[1];
      } else {
        return undefined;
      }
    }
  }, {
    key: "fetchSchema",
    value: function () {
      var _fetchSchema = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var schema;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.props.getSchema();

              case 2:
                schema = _context.sent;

                if (schema) {
                  if (schema.Type === 'AppInsights') {
                    schema = castSchema(schema);
                  }

                  this.schema = schema;
                } else {
                  this.schema = defaultSchema();
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchSchema() {
        return _fetchSchema.apply(this, arguments);
      }

      return fetchSchema;
    }()
  }]);

  return KustoQueryField;
}(_query_field__WEBPACK_IMPORTED_MODULE_2__["default"]);
/**
 * Cast schema from App Insights to default Kusto schema
 */




function castSchema(schema) {
  var defaultSchemaTemplate = defaultSchema();
  defaultSchemaTemplate.Databases.Default = schema;
  return defaultSchemaTemplate;
}

function normalizeQuery(query) {
  var commentPattern = /\/\/.*$/gm;
  var normalizedQuery = query.replace(commentPattern, '');
  normalizedQuery = normalizedQuery.replace('\n', ' ');
  return normalizedQuery;
}

function getLastWord(str) {
  var lastWordPattern = /(?:.*\s)?([^\s]+\s*)$/gi;
  var match = lastWordPattern.exec(str);

  if (match && match.length > 1) {
    return match[1];
  }

  return '';
}

/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/editor_component.tsx":
/*!****************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/editor_component.tsx ***!
  \****************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _KustoQueryField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KustoQueryField */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/KustoQueryField.tsx");
/* harmony import */ var _kusto_kusto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./kusto/kusto */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/kusto/kusto.ts");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_core_core_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/core_module */ "./public/app/core/core_module.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Editor =
/*#__PURE__*/
function (_Component) {
  _inherits(Editor, _Component);

  function Editor(props) {
    var _this;

    _classCallCheck(this, Editor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Editor).call(this, props));

    _this.onChangeQuery = function (value) {
      var _this$props = _this.props,
          index = _this$props.index,
          change = _this$props.change;
      var query = _this.state.query;
      var edited = query !== value;

      _this.setState({
        edited: edited,
        query: value
      });

      if (change) {
        change(value, index);
      }
    };

    _this.onPressEnter = function () {
      var execute = _this.props.execute;

      if (execute) {
        execute();
      }
    };

    _this.state = {
      edited: false,
      query: props.query || ''
    };
    return _this;
  }

  _createClass(Editor, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          variables = _this$props2.variables,
          getSchema = _this$props2.getSchema,
          placeholder = _this$props2.placeholder;
      var _this$state = this.state,
          edited = _this$state.edited,
          query = _this$state.query;
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "gf-form-input",
        style: {
          height: 'auto'
        }
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_KustoQueryField__WEBPACK_IMPORTED_MODULE_0__["default"], {
        initialQuery: edited ? null : query,
        onPressEnter: this.onPressEnter,
        onQueryChange: this.onChangeQuery,
        prismLanguage: "kusto",
        prismDefinition: _kusto_kusto__WEBPACK_IMPORTED_MODULE_1__["default"],
        placeholder: placeholder,
        templateVariables: variables,
        getSchema: getSchema
      }));
    }
  }]);

  return Editor;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);

Editor.defaultProps = {
  placeholder: 'Enter a query'
};
app_core_core_module__WEBPACK_IMPORTED_MODULE_3__["default"].directive('kustoEditor', ['reactDirective', function (reactDirective) {
  return reactDirective(Editor, ['change', 'database', 'execute', 'query', 'variables', 'placeholder', ['getSchema', {
    watchDepth: 'reference'
  }]]);
}]);

/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/kusto/kusto.ts":
/*!**********************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/kusto/kusto.ts ***!
  \**********************************************************************************************/
/*! exports provided: operatorTokens, functionTokens, KEYWORDS, grafanaMacros, DURATION, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "operatorTokens", function() { return operatorTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "functionTokens", function() { return functionTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEYWORDS", function() { return KEYWORDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grafanaMacros", function() { return grafanaMacros; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DURATION", function() { return DURATION; });
/* eslint-disable max-len */
var operatorTokens = [{
  text: '!between',
  hint: 'Matches the input that is outside the inclusive range.'
}, {
  text: 'as',
  hint: "Binds a name to the operator's input tabular expression."
}, {
  text: 'between',
  hint: 'Matches the input that is inside the inclusive range.'
}, {
  text: 'consume',
  hint: 'The `consume` operator consumes the tabular data stream handed to it. It is\r\nmostly used for triggering the query side-effect without actually returning\r\nthe results back to the caller.'
}, {
  text: 'count',
  hint: 'Returns the number of records in the input record set.'
}, {
  text: 'datatable',
  hint: 'Returns a table whose schema and values are defined in the query itself.'
}, {
  text: 'distinct',
  hint: 'Produces a table with the distinct combination of the provided columns of the input table.'
}, {
  text: 'evaluate',
  hint: 'Invokes a service-side query extension (plugin).'
}, {
  text: 'extend',
  hint: 'Create calculated columns and append them to the result set.'
}, {
  text: 'externaldata',
  hint: 'Returns a table whose schema is defined in the query itself, and whose data is read from an external raw file.'
}, {
  text: 'facet',
  hint: 'Returns a set of tables, one for each specified column.\r\nEach table specifies the list of values taken by its column.\r\nAn additional table can be created by using the `with` clause.'
}, {
  text: 'find',
  hint: 'Finds rows that match a predicate across a set of tables.'
}, {
  text: 'fork',
  hint: 'Runs multiple consumer operators in parallel.'
}, {
  text: 'getschema',
  hint: 'Produce a table that represents a tabular schema of the input.'
}, {
  text: 'in',
  hint: 'Filters a recordset based on the provided set of values.'
}, {
  text: 'invoke',
  hint: 'Invokes lambda that receives the source of `invoke` as tabular parameter argument.'
}, {
  text: 'join',
  hint: 'Merge the rows of two tables to form a new table by matching values of the specified column(s) from each table.'
}, {
  text: 'limit',
  hint: 'Return up to the specified number of rows.'
}, {
  text: 'make-series',
  hint: 'Create series of specified aggregated values along specified axis.'
}, {
  text: 'mvexpand',
  hint: 'Expands multi-value array or property bag.'
}, {
  text: 'order',
  hint: 'Sort the rows of the input table into order by one or more columns.'
}, {
  text: 'parse',
  hint: 'Evaluates a string expression and parses its value into one or more calculated columns.'
}, {
  text: 'print',
  hint: 'Evaluates one or more scalar expressions and inserts the results (as a single-row table with as many columns as there are expressions) into the output.'
}, {
  text: 'project',
  hint: 'Select the columns to include, rename or drop, and insert new computed columns.'
}, {
  text: 'project-away',
  hint: 'Select what  columns to exclude from the input.'
}, {
  text: 'project-rename',
  hint: 'Renames columns in the result output.'
}, {
  text: 'range',
  hint: 'Generates a single-column table of values.'
}, {
  text: 'reduce',
  hint: 'Groups a set of strings together based on values similarity.'
}, {
  text: 'render',
  hint: 'Instructs the user agent to render the results of the query in a particular way.'
}, {
  text: 'sample',
  hint: 'Returns up to the specified number of random rows from the input table.'
}, {
  text: 'sample-distinct',
  hint: 'Returns a single column that contains up to the specified number of distinct values of the requested column.'
}, {
  text: 'search',
  hint: 'The search operator provides a multi-table/multi-column search experience.'
}, {
  text: 'serialize',
  hint: 'Marks that order of the input row set is safe for window functions usage.'
}, {
  text: 'sort',
  hint: 'Sort the rows of the input table into order by one or more columns.'
}, {
  text: 'summarize',
  hint: 'Produces a table that aggregates the content of the input table.'
}, {
  text: 'take',
  hint: 'Return up to the specified number of rows.'
}, {
  text: 'top',
  hint: 'Returns the first *N* records sorted by the specified columns.'
}, {
  text: 'top-hitters',
  hint: 'Returns an approximation of the first *N* results (assuming skewed distribution of the input).'
}, {
  text: 'top-nested',
  hint: 'Produces hierarchical top results, where each level is a drill-down based on previous level values.'
}, {
  text: 'union',
  hint: 'Takes two or more tables and returns the rows of all of them.'
}, {
  text: 'where',
  hint: 'Filters a table to the subset of rows that satisfy a predicate.'
}];
var functionTokens = [{
  text: 'abs',
  hint: 'Calculates the absolute value of the input.'
}, {
  text: 'acos',
  hint: 'Returns the angle whose cosine is the specified number (the inverse operation of [`cos()`](cosfunction.md)) .'
}, {
  text: 'ago',
  hint: 'Subtracts the given timespan from the current UTC clock time.'
}, {
  text: 'any',
  hint: 'Returns random non-empty value from the specified expression values.'
}, {
  text: 'arg_max',
  hint: 'Finds a row in the group that maximizes *ExprToMaximize*, and returns the value of *ExprToReturn* (or `*` to return the entire row).'
}, {
  text: 'arg_min',
  hint: 'Finds a row in the group that minimizes *ExprToMinimize*, and returns the value of *ExprToReturn* (or `*` to return the entire row).'
}, {
  text: 'argmax',
  hint: 'Finds a row in the group that maximizes *ExprToMaximize*, and returns the value of *ExprToReturn* (or `*` to return the entire row).'
}, {
  text: 'argmin',
  hint: 'Finds a row in the group that minimizes *ExprToMinimize*, and returns the value of *ExprToReturn* (or `*` to return the entire row).'
}, {
  text: 'array_concat',
  hint: 'Concatenates a number of dynamic arrays to a single array.'
}, {
  text: 'array_length',
  hint: 'Calculates the number of elements in a dynamic array.'
}, {
  text: 'array_slice',
  hint: 'Extracts a slice of a dynamic array.'
}, {
  text: 'array_split',
  hint: 'Splits an array to multiple arrays according to the split indices and packs the generated array in a dynamic array.'
}, {
  text: 'asin',
  hint: 'Returns the angle whose sine is the specified number (the inverse operation of [`sin()`](sinfunction.md)) .'
}, {
  text: 'assert',
  hint: 'Checks for a condition; if the condition is false, outputs error messages and fails the query.'
}, {
  text: 'atan',
  hint: 'Returns the angle whose tangent is the specified number (the inverse operation of [`tan()`](tanfunction.md)) .'
}, {
  text: 'atan2',
  hint: 'Calculates the angle, in radians, between the positive x-axis and the ray from the origin to the point (y, x).'
}, {
  text: 'avg',
  hint: 'Calculates the average of *Expr* across the group.'
}, {
  text: 'avgif',
  hint: 'Calculates the [average](avg-aggfunction.md) of *Expr* across the group for which *Predicate* evaluates to `true`.'
}, {
  text: 'bag_keys',
  hint: 'Enumerates all the root keys in a dynamic property-bag object.'
}, {
  text: 'base64_decodestring',
  hint: 'Decodes a base64 string to a UTF-8 string'
}, {
  text: 'base64_encodestring',
  hint: 'Encodes a string as base64 string'
}, {
  text: 'beta_cdf',
  hint: 'Returns the standard cumulative beta distribution function.'
}, {
  text: 'beta_inv',
  hint: 'Returns the inverse of the beta cumulative probability beta density function.'
}, {
  text: 'beta_pdf',
  hint: 'Returns the probability density beta function.'
}, {
  text: 'bin',
  hint: 'Rounds values down to an integer multiple of a given bin size.'
}, {
  text: 'bin_at',
  hint: "Rounds values down to a fixed-size 'bin', with control over the bin's starting point.\r\n(See also [`bin function`](./binfunction.md).)"
}, {
  text: 'bin_auto',
  hint: "Rounds values down to a fixed-size 'bin', with control over the bin size and starting point provided by a query property."
}, {
  text: 'binary_and',
  hint: 'Returns a result of the bitwise `and` operation between two values.'
}, {
  text: 'binary_not',
  hint: 'Returns a bitwise negation of the input value.'
}, {
  text: 'binary_or',
  hint: 'Returns a result of the bitwise `or` operation of the two values.'
}, {
  text: 'binary_shift_left',
  hint: 'Returns binary shift left operation on a pair of numbers.'
}, {
  text: 'binary_shift_right',
  hint: 'Returns binary shift right operation on a pair of numbers.'
}, {
  text: 'binary_xor',
  hint: 'Returns a result of the bitwise `xor` operation of the two values.'
}, {
  text: 'buildschema',
  hint: 'Returns the minimal schema that admits all values of *DynamicExpr*.'
}, {
  text: 'case',
  hint: 'Evaluates a list of predicates and returns the first result expression whose predicate is satisfied.'
}, {
  text: 'ceiling',
  hint: 'Calculates the smallest integer greater than, or equal to, the specified numeric expression.'
}, {
  text: 'cluster',
  hint: 'Changes the reference of the query to a remote cluster.'
}, {
  text: 'coalesce',
  hint: 'Evaluates a list of expressions and returns the first non-null (or non-empty for string) expression.'
}, {
  text: 'cos',
  hint: 'Returns the cosine function.'
}, {
  text: 'cot',
  hint: 'Calculates the trigonometric cotangent of the specified angle, in radians.'
}, {
  text: 'count',
  hint: 'Returns a count of the records per summarization group (or in total if summarization is done without grouping).'
}, {
  text: 'countif',
  hint: 'Returns a count of rows for which *Predicate* evaluates to `true`.'
}, {
  text: 'countof',
  hint: 'Counts occurrences of a substring in a string. Plain string matches may overlap; regex matches do not.'
}, {
  text: 'current_principal',
  hint: 'Returns the current principal running this query.'
}, {
  text: 'cursor_after',
  hint: 'A predicate over the records of a table to compare their ingestion time\r\nagainst a database cursor.'
}, {
  text: 'cursor_before_or_at',
  hint: 'A predicate over the records of a table to compare their ingestion time\r\nagainst a database cursor.'
}, {
  text: 'database',
  hint: 'Changes the reference of the query to a specific database within the cluster scope.'
}, {
  text: 'datetime_add',
  hint: 'Calculates a new [datetime](./scalar-data-types/datetime.md) from a specified datepart multiplied by a specified amount, added to a specified [datetime](./scalar-data-types/datetime.md).'
}, {
  text: 'datetime_diff',
  hint: 'Calculates calendarian difference between two [datetime](./scalar-data-types/datetime.md) values.'
}, {
  text: 'datetime_part',
  hint: 'Extracts the requested date part as an integer value.'
}, {
  text: 'dayofmonth',
  hint: 'Returns the integer number representing the day number of the given month'
}, {
  text: 'dayofweek',
  hint: 'Returns the integer number of days since the preceding Sunday, as a `timespan`.'
}, {
  text: 'dayofyear',
  hint: 'Returns the integer number represents the day number of the given year.'
}, {
  text: 'dcount',
  hint: 'Returns an estimate of the number of distinct values of *Expr* in the group.'
}, {
  text: 'dcount_hll',
  hint: 'Calculates the dcount from hll results (which was generated by [hll](hll-aggfunction.md) or [hll_merge](hll-merge-aggfunction.md)).'
}, {
  text: 'dcountif',
  hint: 'Returns an estimate of the number of distinct values of *Expr* of rows for which *Predicate* evaluates to `true`.'
}, {
  text: 'degrees',
  hint: 'Converts angle value in radians into value in degrees, using formula `degrees = (180 / PI ) * angle_in_radians`'
}, {
  text: 'distance',
  hint: 'Returns the distance between two points in meters.'
}, {
  text: 'endofday',
  hint: 'Returns the end of the day containing the date, shifted by an offset, if provided.'
}, {
  text: 'endofmonth',
  hint: 'Returns the end of the month containing the date, shifted by an offset, if provided.'
}, {
  text: 'endofweek',
  hint: 'Returns the end of the week containing the date, shifted by an offset, if provided.'
}, {
  text: 'endofyear',
  hint: 'Returns the end of the year containing the date, shifted by an offset, if provided.'
}, {
  text: 'estimate_data_size',
  hint: 'Returns an estimated data size of the selected columns of the tabular expression.'
}, {
  text: 'exp',
  hint: 'The base-e exponential function of x, which is e raised to the power x: e^x.'
}, {
  text: 'exp10',
  hint: 'The base-10 exponential function of x, which is 10 raised to the power x: 10^x.  \r\n**Syntax**'
}, {
  text: 'exp2',
  hint: 'The base-2 exponential function of x, which is 2 raised to the power x: 2^x.'
}, {
  text: 'extent_id',
  hint: 'Returns a unique identifier that identifies the data shard ("extent") that the current record resides in.'
}, {
  text: 'extent_tags',
  hint: 'Returns a dynamic array with the [tags](../management/extents-overview.md#extent-tagging) of the data shard ("extent") that the current record resides in.'
}, {
  text: 'extract',
  hint: 'Get a match for a [regular expression](./re2.md) from a text string.'
}, {
  text: 'extract_all',
  hint: 'Get all matches for a [regular expression](./re2.md) from a text string.'
}, {
  text: 'extractjson',
  hint: 'Get a specified element out of a JSON text using a path expression.'
}, {
  text: 'floor',
  hint: 'An alias for [`bin()`](binfunction.md).'
}, {
  text: 'format_datetime',
  hint: 'Formats a datetime parameter based on the format pattern parameter.'
}, {
  text: 'format_timespan',
  hint: 'Formats a timespan parameter based on the format pattern parameter.'
}, {
  text: 'gamma',
  hint: 'Computes [gamma function](https://en.wikipedia.org/wiki/Gamma_function)'
}, {
  text: 'getmonth',
  hint: 'Get the month number (1-12) from a datetime.'
}, {
  text: 'gettype',
  hint: 'Returns the runtime type of its single argument.'
}, {
  text: 'getyear',
  hint: 'Returns the year part of the `datetime` argument.'
}, {
  text: 'hash',
  hint: 'Returns a hash value for the input value.'
}, {
  text: 'hash_sha256',
  hint: 'Returns a sha256 hash value for the input value.'
}, {
  text: 'hll',
  hint: 'Calculates the Intermediate results of [dcount](dcount-aggfunction.md) across the group.'
}, {
  text: 'hll_merge',
  hint: 'Merges hll results (scalar version of the aggregate version [`hll_merge()`](hll-merge-aggfunction.md)).'
}, {
  text: 'hourofday',
  hint: 'Returns the integer number representing the hour number of the given date'
}, {
  text: 'iff',
  hint: 'Evaluates the first argument (the predicate), and returns the value of either the second or third arguments, depending on whether the predicate evaluated to `true` (second) or `false` (third).'
}, {
  text: 'iif',
  hint: 'Evaluates the first argument (the predicate), and returns the value of either the second or third arguments, depending on whether the predicate evaluated to `true` (second) or `false` (third).'
}, {
  text: 'indexof',
  hint: 'Function reports the zero-based index of the first occurrence of a specified string within input string.'
}, {
  text: 'ingestion_time',
  hint: "Retrieves the record's `$IngestionTime` hidden `datetime` column, or null."
}, {
  text: 'iscolumnexists',
  hint: 'Returns a boolean value indicating if the given string argument exists in the schema produced by the preceding tabular operator.'
}, {
  text: 'isempty',
  hint: 'Returns `true` if the argument is an empty string or is null.'
}, {
  text: 'isfinite',
  hint: 'Returns whether input is a finite value (is neither infinite nor NaN).'
}, {
  text: 'isinf',
  hint: 'Returns whether input is an infinite (positive or negative) value.'
}, {
  text: 'isnan',
  hint: 'Returns whether input is Not-a-Number (NaN) value.'
}, {
  text: 'isnotempty',
  hint: 'Returns `true` if the argument is not an empty string nor it is a null.'
}, {
  text: 'isnotnull',
  hint: 'Returns `true` if the argument is not null.'
}, {
  text: 'isnull',
  hint: 'Evaluates its sole argument and returns a `bool` value indicating if the argument evaluates to a null value.'
}, {
  text: 'log',
  hint: 'Returns the natural logarithm function.'
}, {
  text: 'log10',
  hint: 'Returns the common (base-10) logarithm function.'
}, {
  text: 'log2',
  hint: 'Returns the base-2 logarithm function.'
}, {
  text: 'loggamma',
  hint: 'Computes log of absolute value of the [gamma function](https://en.wikipedia.org/wiki/Gamma_function)'
}, {
  text: 'make_datetime',
  hint: 'Creates a [datetime](./scalar-data-types/datetime.md) scalar value from the specified date and time.'
}, {
  text: 'make_dictionary',
  hint: 'Returns a `dynamic` (JSON) property-bag (dictionary) of all the values of *Expr* in the group.'
}, {
  text: 'make_string',
  hint: 'Returns the string generated by the Unicode characters.'
}, {
  text: 'make_timespan',
  hint: 'Creates a [timespan](./scalar-data-types/timespan.md) scalar value from the specified time period.'
}, {
  text: 'makelist',
  hint: 'Returns a `dynamic` (JSON) array of all the values of *Expr* in the group.'
}, {
  text: 'makeset',
  hint: 'Returns a `dynamic` (JSON) array of the set of distinct values that *Expr* takes in the group.'
}, {
  text: 'materialize',
  hint: 'Allows caching a sub-query result during the time of query execution in a way that other subqueries can reference the partial result.'
}, {
  text: 'max',
  hint: 'Returns the maximum value across the group.'
}, {
  text: 'max_of',
  hint: 'Returns the maximum value of several evaluated numeric expressions.'
}, {
  text: 'merge_tdigests',
  hint: 'Merges tdigest results (scalar version of the aggregate version [`merge_tdigests()`](merge-tdigests-aggfunction.md)).'
}, {
  text: 'min',
  hint: 'Returns the minimum value agross the group.'
}, {
  text: 'min_of',
  hint: 'Returns the minimum value of several evaluated numeric expressions.'
}, {
  text: 'monthofyear',
  hint: 'Returns the integer number represents the month number of the given year.'
}, {
  text: 'next',
  hint: 'Returns the value of a column in a row that it at some offset following the\r\ncurrent row in a [serialized row set](./windowsfunctions.md#serialized-row-set).'
}, {
  text: 'not',
  hint: 'Reverses the value of its `bool` argument.'
}, {
  text: 'now',
  hint: 'Returns the current UTC clock time, optionally offset by a given timespan.\r\nThis function can be used multiple times in a statement and the clock time being referenced will be the same for all instances.'
}, {
  text: 'pack',
  hint: 'Creates a `dynamic` object (property bag) from a list of names and values.'
}, {
  text: 'pack_all',
  hint: 'Creates a `dynamic` object (property bag) from all the columns of the tabular expression.'
}, {
  text: 'pack_array',
  hint: 'Packs all input values into a dynamic array.'
}, {
  text: 'parse_ipv4',
  hint: 'Converts input to integer (signed 64-bit) number representation.'
}, {
  text: 'parse_json',
  hint: 'Interprets a `string` as a [JSON value](https://json.org/)) and returns the value as [`dynamic`](./scalar-data-types/dynamic.md). \r\nIt is superior to using [extractjson() function](./extractjsonfunction.md)\r\nwhen you need to extract more than one element of a JSON compound object.'
}, {
  text: 'parse_path',
  hint: "Parses a file path `string` and returns a [`dynamic`](./scalar-data-types/dynamic.md) object that contains the following parts of the path: \r\nScheme, RootPath, DirectoryPath, DirectoryName, FileName, Extension, AlternateDataStreamName.\r\nIn addition to the simple paths with both types of slashes, supports paths with schemas (e.g. \"file://...\"), shared paths (e.g. \"\\\\shareddrive\\users...\"), long paths (e.g \"\\\\?\\C:...\"\"), alternate data streams (e.g. \"file1.exe:file2.exe\")"
}, {
  text: 'parse_url',
  hint: 'Parses an absolute URL `string` and returns a [`dynamic`](./scalar-data-types/dynamic.md) object contains all parts of the URL (Scheme, Host, Port, Path, Username, Password, Query Parameters, Fragment).'
}, {
  text: 'parse_urlquery',
  hint: 'Parses a url query `string` and returns a [`dynamic`](./scalar-data-types/dynamic.md) object contains the Query parameters.'
}, {
  text: 'parse_user_agent',
  hint: "Interprets a user-agent string, which identifies the user's browser and provides certain system details to servers hosting the websites the user visits. The result is returned as [`dynamic`](./scalar-data-types/dynamic.md)."
}, {
  text: 'parse_version',
  hint: 'Converts input string representation of version to a comparable decimal number.'
}, {
  text: 'parse_xml',
  hint: 'Interprets a `string` as a XML value, converts the value to a [JSON value](https://json.org/) and returns the value as  [`dynamic`](./scalar-data-types/dynamic.md).'
}, {
  text: 'percentile',
  hint: 'Returns an estimate for the specified [nearest-rank percentile](#nearest-rank-percentile) of the population defined by *Expr*. \r\nThe accuracy depends on the density of population in the region of the percentile.'
}, {
  text: 'percentile_tdigest',
  hint: 'Calculates the percentile result from tdigest results (which was generated by [tdigest](tdigest-aggfunction.md) or [merge-tdigests](merge-tdigests-aggfunction.md))'
}, {
  text: 'percentrank_tdigest',
  hint: "Calculates the approximate rank of the value in a set where rank is expressed as percentage of set's size. \r\nThis function can be viewed as the inverse of the percentile."
}, {
  text: 'pi',
  hint: 'Returns the constant value of Pi (π).'
}, {
  text: 'point',
  hint: 'Returns a dynamic array representation of a point.'
}, {
  text: 'pow',
  hint: 'Returns a result of raising to power'
}, {
  text: 'prev',
  hint: 'Returns the value of a column in a row that it at some offset prior to the\r\ncurrent row in a [serialized row set](./windowsfunctions.md#serialized-row-set).'
}, {
  text: 'radians',
  hint: 'Converts angle value in degrees into value in radians, using formula `radians = (PI / 180 ) * angle_in_degrees`'
}, {
  text: 'rand',
  hint: 'Returns a random number.'
}, {
  text: 'range',
  hint: 'Generates a dynamic array holding a series of equally-spaced values.'
}, {
  text: 'repeat',
  hint: 'Generates a dynamic array holding a series of equal values.'
}, {
  text: 'replace',
  hint: 'Replace all regex matches with another string.'
}, {
  text: 'reverse',
  hint: 'Function makes reverse of input string.'
}, {
  text: 'round',
  hint: 'Returns the rounded source to the specified precision.'
}, {
  text: 'row_cumsum',
  hint: 'Calculates the cumulative sum of a column in a [serialized row set](./windowsfunctions.md#serialized-row-set).'
}, {
  text: 'row_number',
  hint: "Returns the current row's index in a [serialized row set](./windowsfunctions.md#serialized-row-set).\r\nThe row index starts by default at `1` for the first row, and is incremented by `1` for each additional row.\r\nOptionally, the row index can start at a different value than `1`.\r\nAdditionally, the row index may be reset according to some provided predicate."
}, {
  text: 'series_add',
  hint: 'Calculates the element-wise addition of two numeric series inputs.'
}, {
  text: 'series_decompose',
  hint: 'Applies a decomposition transformation on a series.'
}, {
  text: 'series_decompose_anomalies',
  hint: 'Anomaly Detection based on series decomposition (refer to [series_decompose()](series-decomposefunction.md))'
}, {
  text: 'series_decompose_forecast',
  hint: 'Forecast based on series decomposition.'
}, {
  text: 'series_divide',
  hint: 'Calculates the element-wise division of two numeric series inputs.'
}, {
  text: 'series_equals',
  hint: 'Calculates the element-wise equals (`==`) logic operation of two numeric series inputs.'
}, {
  text: 'series_fill_backward',
  hint: 'Performs backward fill interpolation of missing values in a series.'
}, {
  text: 'series_fill_const',
  hint: 'Replaces missing values in a series with a specified constant value.'
}, {
  text: 'series_fill_forward',
  hint: 'Performs forward fill interpolation of missing values in a series.'
}, {
  text: 'series_fill_linear',
  hint: 'Performs linear interpolation of missing values in a series.'
}, {
  text: 'series_fir',
  hint: 'Applies a Finite Impulse Response filter on a series.'
}, {
  text: 'series_fit_2lines',
  hint: 'Applies two segments linear regression on a series, returning multiple columns.'
}, {
  text: 'series_fit_2lines_dynamic',
  hint: 'Applies two segments linear regression on a series, returning dynamic object.'
}, {
  text: 'series_fit_line',
  hint: 'Applies linear regression on a series, returning multiple columns.'
}, {
  text: 'series_fit_line_dynamic',
  hint: 'Applies linear regression on a series, returning dynamic object.'
}, {
  text: 'series_greater',
  hint: 'Calculates the element-wise greater (`>`) logic operation of two numeric series inputs.'
}, {
  text: 'series_greater_equals',
  hint: 'Calculates the element-wise greater or equals (`>=`) logic operation of two numeric series inputs.'
}, {
  text: 'series_iir',
  hint: 'Applies a Infinite Impulse Response filter on a series.'
}, {
  text: 'series_less',
  hint: 'Calculates the element-wise less (`<`) logic operation of two numeric series inputs.'
}, {
  text: 'series_less_equals',
  hint: 'Calculates the element-wise less or equal (`<=`) logic operation of two numeric series inputs.'
}, {
  text: 'series_multiply',
  hint: 'Calculates the element-wise multiplication of two numeric series inputs.'
}, {
  text: 'series_not_equals',
  hint: 'Calculates the element-wise not equals (`!=`) logic operation of two numeric series inputs.'
}, {
  text: 'series_outliers',
  hint: 'Scores anomaly points in a series.'
}, {
  text: 'series_periods_detect',
  hint: 'Finds the most significant periods that exist in a time series.'
}, {
  text: 'series_periods_validate',
  hint: 'Checks whether a time series contains periodic patterns of given lengths.'
}, {
  text: 'series_seasonal',
  hint: 'Calculates the seasonal component of a series according to the detected or given seasonal period.'
}, {
  text: 'series_stats',
  hint: 'Returns statistics for a series in multiple columns.'
}, {
  text: 'series_stats_dynamic',
  hint: 'Returns statistics for a series in dynamic object.'
}, {
  text: 'series_subtract',
  hint: 'Calculates the element-wise subtraction of two numeric series inputs.'
}, {
  text: 'sign',
  hint: 'Sign of a numeric expression'
}, {
  text: 'sin',
  hint: 'Returns the sine function.'
}, {
  text: 'split',
  hint: 'Splits a given string according to a given delimiter and returns a string array with the contained substrings.'
}, {
  text: 'sqrt',
  hint: 'Returns the square root function.'
}, {
  text: 'startofday',
  hint: 'Returns the start of the day containing the date, shifted by an offset, if provided.'
}, {
  text: 'startofmonth',
  hint: 'Returns the start of the month containing the date, shifted by an offset, if provided.'
}, {
  text: 'startofweek',
  hint: 'Returns the start of the week containing the date, shifted by an offset, if provided.'
}, {
  text: 'startofyear',
  hint: 'Returns the start of the year containing the date, shifted by an offset, if provided.'
}, {
  text: 'stdev',
  hint: 'Calculates the standard deviation of *Expr* across the group, considering the group as a [sample](https://en.wikipedia.org/wiki/Sample_%28statistics%29).'
}, {
  text: 'stdevif',
  hint: 'Calculates the [stdev](stdev-aggfunction.md) of *Expr* across the group for which *Predicate* evaluates to `true`.'
}, {
  text: 'stdevp',
  hint: 'Calculates the standard deviation of *Expr* across the group, considering the group as a [population](https://en.wikipedia.org/wiki/Statistical_population).'
}, {
  text: 'strcat',
  hint: 'Concatenates between 1 and 64 arguments.'
}, {
  text: 'strcat_array',
  hint: 'Creates a concatenated string of array values using specified delimiter.'
}, {
  text: 'strcat_delim',
  hint: 'Concatenates between 2 and 64 arguments, with delimiter, provided as first argument.'
}, {
  text: 'strcmp',
  hint: 'Compares two strings.'
}, {
  text: 'string_size',
  hint: 'Returns the size, in bytes, of the input string.'
}, {
  text: 'strlen',
  hint: 'Returns the length, in characters, of the input string.'
}, {
  text: 'strrep',
  hint: 'Repeats given [string](./scalar-data-types/string.md) provided amount of times.'
}, {
  text: 'substring',
  hint: 'Extracts a substring from a source string starting from some index to the end of the string.'
}, {
  text: 'sum',
  hint: 'Calculates the sum of *Expr* across the group.'
}, {
  text: 'sumif',
  hint: 'Returns a sum of *Expr* for which *Predicate* evaluates to `true`.'
}, {
  text: 'table',
  hint: 'References specific table using an query-time evaluated string-expression.'
}, {
  text: 'tan',
  hint: 'Returns the tangent function.'
}, {
  text: 'tdigest',
  hint: 'Calculates the Intermediate results of [`percentiles()`](percentiles-aggfunction.md) across the group.'
}, {
  text: 'tdigest_merge',
  hint: 'Merges tdigest results (scalar version of the aggregate version [`tdigest_merge()`](tdigest-merge-aggfunction.md)).'
}, {
  text: 'tobool',
  hint: 'Converts input to boolean (signed 8-bit) representation.'
}, {
  text: 'todatetime',
  hint: 'Converts input to [datetime](./scalar-data-types/datetime.md) scalar.'
}, {
  text: 'todecimal',
  hint: 'Converts input to decimal number representation.'
}, {
  text: 'todouble',
  hint: 'Converts the input to a value of type `real`. (`todouble()` and `toreal()` are synonyms.)'
}, {
  text: 'todynamic',
  hint: 'Interprets a `string` as a [JSON value](https://json.org/) and returns the value as [`dynamic`](./scalar-data-types/dynamic.md).'
}, {
  text: 'toguid',
  hint: 'Converts input to [`guid`](./scalar-data-types/guid.md) representation.'
}, {
  text: 'tohex',
  hint: 'Converts input to a hexadecimal string.'
}, {
  text: 'toint',
  hint: 'Converts input to integer (signed 32-bit) number representation.'
}, {
  text: 'tolong',
  hint: 'Converts input to long (signed 64-bit) number representation.'
}, {
  text: 'tolower',
  hint: 'Converts input string to lower case.'
}, {
  text: 'toscalar',
  hint: 'Returns a scalar constant value of the evaluated expression.'
}, {
  text: 'tostring',
  hint: 'Converts input to a string representation.'
}, {
  text: 'totimespan',
  hint: 'Converts input  to [timespan](./scalar-data-types/timespan.md) scalar.'
}, {
  text: 'toupper',
  hint: 'Converts a string to upper case.'
}, {
  text: 'translate',
  hint: "Replaces a set of characters ('searchList') with another set of characters ('replacementList') in a given a string.\r\nThe function searches for characters in the 'searchList' and replaces them with the corresponding characters in 'replacementList'"
}, {
  text: 'treepath',
  hint: 'Enumerates all the path expressions that identify leaves in a dynamic object.'
}, {
  text: 'trim',
  hint: 'Removes all leading and trailing matches of the specified regular expression.'
}, {
  text: 'trim_end',
  hint: 'Removes trailing match of the specified regular expression.'
}, {
  text: 'trim_start',
  hint: 'Removes leading match of the specified regular expression.'
}, {
  text: 'url_decode',
  hint: 'The function converts encoded URL into a to regular URL representation.'
}, {
  text: 'url_encode',
  hint: 'The function converts characters of the input URL into a format that can be transmitted over the Internet.'
}, {
  text: 'variance',
  hint: 'Calculates the variance of *Expr* across the group, considering the group as a [sample](https://en.wikipedia.org/wiki/Sample_%28statistics%29).'
}, {
  text: 'varianceif',
  hint: 'Calculates the [variance](variance-aggfunction.md) of *Expr* across the group for which *Predicate* evaluates to `true`.'
}, {
  text: 'variancep',
  hint: 'Calculates the variance of *Expr* across the group, considering the group as a [population](https://en.wikipedia.org/wiki/Statistical_population).'
}, {
  text: 'weekofyear',
  hint: 'Returns the integer number represents the week number.'
}, {
  text: 'welch_test',
  hint: 'Computes the p_value of the [Welch-test function](https://en.wikipedia.org/wiki/Welch%27s_t-test)'
}, {
  text: 'zip',
  hint: 'The `zip` function accepts any number of `dynamic` arrays, and returns an\r\narray whose elements are each an array holding the elements of the input\r\narrays of the same index.'
}];
var KEYWORDS = ['by', 'on', 'contains', 'notcontains', 'containscs', 'notcontainscs', 'startswith', 'has', 'matches', 'regex', 'true', 'false', 'and', 'or', 'typeof', 'int', 'string', 'date', 'datetime', 'time', 'long', 'real', '​boolean', 'bool'];
var grafanaMacros = [{
  text: '$__timeFilter',
  display: '$__timeFilter()',
  hint: 'Macro that uses the selected timerange in Grafana to filter the query.'
}, {
  text: '$__timeTo',
  display: '$__timeTo()',
  hint: 'Returns the From datetime from the Grafana picker. Example: datetime(2018-06-05T20:09:58.907Z).'
}, {
  text: '$__timeFrom',
  display: '$__timeFrom()',
  hint: 'Returns the From datetime from the Grafana picker. Example: datetime(2018-06-05T18:09:58.907Z).'
}, {
  text: '$__escapeMulti',
  display: '$__escapeMulti()',
  hint: 'Macro to escape multi-value template variables that contain illegal characters.'
}, {
  text: '$__contains',
  display: '$__contains()',
  hint: 'Macro for multi-value template variables.'
}]; // Kusto operators
// export const OPERATORS = ['+', '-', '*', '/', '>', '<', '==', '<>', '<=', '>=', '~', '!~'];

var DURATION = ['SECONDS', 'MINUTES', 'HOURS', 'DAYS', 'WEEKS', 'MONTHS', 'YEARS'];
var tokenizer = {
  comment: {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: true,
    greedy: true
  },
  'function-context': {
    pattern: /[a-z0-9_]+\([^)]*\)?/i,
    inside: {}
  },
  duration: {
    pattern: new RegExp("".concat(DURATION.join('?|'), "?"), 'i'),
    alias: 'number'
  },
  builtin: new RegExp("\\b(?:".concat(functionTokens.map(function (f) {
    return f.text;
  }).join('|'), ")(?=\\s*\\()"), 'i'),
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  keyword: new RegExp("\\b(?:".concat(KEYWORDS.join('|'), "|").concat(operatorTokens.map(function (f) {
    return f.text;
  }).join('|'), "|\\*)\\b"), 'i'),
  boolean: /\b(?:true|false)\b/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /-|\+|\*|\/|>|<|==|<=?|>=?|<>|!~|~|=|\|/,
  punctuation: /[{};(),.:]/,
  variable: /(\[\[(.+?)\]\])|(\$(.+?))\b/
};
tokenizer['function-context'].inside = {
  argument: {
    pattern: /[a-z0-9_]+(?=:)/i,
    alias: 'symbol'
  },
  duration: tokenizer.duration,
  number: tokenizer.number,
  builtin: tokenizer.builtin,
  string: tokenizer.string,
  variable: tokenizer.variable
}; // console.log(tokenizer.builtin);

/* harmony default export */ __webpack_exports__["default"] = (tokenizer); // function escapeRegExp(str: string): string {
//   return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
// }

/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/query_field.tsx":
/*!***********************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/query_field.tsx ***!
  \***********************************************************************************************/
/*! exports provided: makeFragment, getInitialValue, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeFragment", function() { return makeFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInitialValue", function() { return getInitialValue; });
/* harmony import */ var app_features_explore_slate_plugins_prism__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/features/explore/slate-plugins/prism */ "./public/app/features/explore/slate-plugins/prism/index.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _typeahead__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./typeahead */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/typeahead.tsx");
/* harmony import */ var app_core_services_keybindingSrv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/services/keybindingSrv */ "./public/app/core/services/keybindingSrv.ts");
/* harmony import */ var slate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! slate */ "./node_modules/slate/lib/slate.es.js");
/* harmony import */ var _grafana_slate_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/slate-react */ "./node_modules/@grafana/slate-react/lib/slate-react.es.js");
/* harmony import */ var slate_plain_serializer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! slate-plain-serializer */ "./node_modules/slate-plain-serializer/lib/slate-plain-serializer.es.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }











function flattenSuggestions(s) {
  return s ? s.reduce(function (acc, g) {
    return acc.concat(g.items);
  }, []) : [];
}

var makeFragment = function makeFragment(text) {
  var lines = text.split('\n').map(function (line) {
    return slate__WEBPACK_IMPORTED_MODULE_4__["Block"].create({
      type: 'paragraph',
      nodes: [slate__WEBPACK_IMPORTED_MODULE_4__["Text"].create(line)]
    });
  });
  var fragment = slate__WEBPACK_IMPORTED_MODULE_4__["Document"].create({
    nodes: lines
  });
  return fragment;
};
var getInitialValue = function getInitialValue(query) {
  return slate__WEBPACK_IMPORTED_MODULE_4__["Value"].create({
    document: makeFragment(query)
  });
};

var Portal =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Portal, _React$Component);

  function Portal(props) {
    var _this;

    _classCallCheck(this, Portal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Portal).call(this, props));
    var _props$index = props.index,
        index = _props$index === void 0 ? 0 : _props$index,
        _props$prefix = props.prefix,
        prefix = _props$prefix === void 0 ? 'query' : _props$prefix;
    _this.node = document.createElement('div');

    _this.node.classList.add("slate-typeahead", "slate-typeahead-".concat(prefix, "-").concat(index));

    document.body.appendChild(_this.node);
    return _this;
  }

  _createClass(Portal, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.body.removeChild(this.node);
    }
  }, {
    key: "render",
    value: function render() {
      return react_dom__WEBPACK_IMPORTED_MODULE_7___default.a.createPortal(this.props.children, this.node);
    }
  }]);

  return Portal;
}(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);

var QueryField =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(QueryField, _React$Component2);

  function QueryField(props, context) {
    var _this2;

    _classCallCheck(this, QueryField);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(QueryField).call(this, props, context));
    _this2.keybindingSrv = Object(app_core_services_keybindingSrv__WEBPACK_IMPORTED_MODULE_3__["getKeybindingSrv"])();

    _this2.onChange = function (_ref) {
      var value = _ref.value;
      var changed = value.document !== _this2.state.value.document;

      _this2.setState({
        value: value
      }, function () {
        if (changed) {
          // call typeahead only if query changed
          requestAnimationFrame(function () {
            return _this2.onTypeahead();
          });

          _this2.onChangeQuery();
        }
      });
    };

    _this2.onChangeQuery = function () {
      // Send text change to parent
      var onQueryChange = _this2.props.onQueryChange;

      if (onQueryChange) {
        onQueryChange(slate_plain_serializer__WEBPACK_IMPORTED_MODULE_6__["default"].serialize(_this2.state.value));
      }
    };

    _this2.onKeyDown = function (event, editor, next) {
      var _this2$state = _this2.state,
          typeaheadIndex = _this2$state.typeaheadIndex,
          suggestions = _this2$state.suggestions;
      var keyboardEvent = event;

      switch (keyboardEvent.key) {
        case 'Escape':
          {
            if (_this2.menuEl) {
              keyboardEvent.preventDefault();
              keyboardEvent.stopPropagation();

              _this2.resetTypeahead();

              return true;
            }

            break;
          }

        case ' ':
          {
            if (keyboardEvent.ctrlKey) {
              keyboardEvent.preventDefault();

              _this2.onTypeahead(true);

              return true;
            }

            break;
          }

        case 'Tab':
        case 'Enter':
          {
            if (_this2.menuEl && typeaheadIndex !== null) {
              // Dont blur input
              keyboardEvent.preventDefault();

              if (!suggestions || !suggestions.length || keyboardEvent.shiftKey || keyboardEvent.ctrlKey) {
                return next();
              } // Get the currently selected suggestion


              var flattenedSuggestions = flattenSuggestions(suggestions);
              var selected = Math.abs(typeaheadIndex);
              var selectedIndex = selected % flattenedSuggestions.length || 0;
              var suggestion = flattenedSuggestions[selectedIndex];
              return _this2.applyTypeahead(editor, suggestion);
            }

            break;
          }

        case 'ArrowDown':
          {
            if (_this2.menuEl) {
              // Select next suggestion
              keyboardEvent.preventDefault();

              _this2.setState({
                typeaheadIndex: (typeaheadIndex || 0) + 1
              });
            }

            break;
          }

        case 'ArrowUp':
          {
            if (_this2.menuEl) {
              // Select previous suggestion
              keyboardEvent.preventDefault();

              _this2.setState({
                typeaheadIndex: Math.max(0, (typeaheadIndex || 0) - 1)
              });
            }

            break;
          }

        default:
          {
            // console.log('default key', event.key, event.which, event.charCode, event.locale, data.key);
            break;
          }
      }

      return next();
    };

    _this2.onTypeahead = function () {
      var change = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var item = arguments.length > 1 ? arguments[1] : undefined;
      return change;
    };

    _this2.applyTypeahead = function (editor, suggestion) {
      return {
        value: new slate__WEBPACK_IMPORTED_MODULE_4__["Value"]()
      };
    };

    _this2.resetTypeahead = function (callback) {
      _this2.setState({
        suggestions: [],
        typeaheadIndex: null,
        typeaheadPrefix: '',
        typeaheadContext: null
      }, callback);
    };

    _this2.handleBlur = function (event, editor, next) {
      var onBlur = _this2.props.onBlur; // If we dont wait here, menu clicks wont work because the menu
      // will be gone.

      _this2.resetTimer = setTimeout(_this2.resetTypeahead, 100);

      if (onBlur) {
        onBlur();
      }

      _this2.restoreEscapeKeyBinding();

      return next();
    };

    _this2.handleFocus = function (event, editor, next) {
      var onFocus = _this2.props.onFocus;

      if (onFocus) {
        onFocus();
      } // Don't go back to dashboard if Escape pressed inside the editor.


      _this2.removeEscapeKeyBinding();

      return next();
    };

    _this2.onClickItem = function (item) {
      var suggestions = _this2.state.suggestions;

      if (!suggestions || suggestions.length === 0) {
        return;
      } // Manually triggering change


      var change = _this2.applyTypeahead();

      _this2.onChange(change);
    };

    _this2.updateMenu = function () {
      var suggestions = _this2.state.suggestions;
      var menu = _this2.menuEl;
      var selection = window.getSelection(); // No menu, nothing to do

      if (!menu || !selection) {
        return;
      }

      var node = selection.anchorNode; // No suggestions or blur, remove menu

      var hasSuggesstions = suggestions && suggestions.length > 0;

      if (!hasSuggesstions) {
        menu.removeAttribute('style');
        return;
      } // Align menu overlay to editor node


      if (node && node.parentElement) {
        // Read from DOM
        var rect = node.parentElement.getBoundingClientRect();
        var scrollX = window.scrollX;
        var scrollY = window.scrollY;
        var screenHeight = window.innerHeight;
        var menuLeft = rect.left + scrollX - 2;
        var menuTop = rect.top + scrollY + rect.height + 4;
        var menuHeight = screenHeight - menuTop - 10; // Write DOM

        requestAnimationFrame(function () {
          menu.style.opacity = 1;
          menu.style.top = "".concat(menuTop, "px");
          menu.style.left = "".concat(menuLeft, "px");
          menu.style.maxHeight = "".concat(menuHeight, "px");
        });
      }
    };

    _this2.menuRef = function (el) {
      _this2.menuEl = el;
    };

    _this2.renderMenu = function () {
      var portalPrefix = _this2.props.portalPrefix;
      var _this2$state2 = _this2.state,
          suggestions = _this2$state2.suggestions,
          typeaheadIndex = _this2$state2.typeaheadIndex;
      var hasSuggesstions = suggestions && suggestions.length > 0;

      if (!hasSuggesstions) {
        return null;
      } // Guard selectedIndex to be within the length of the suggestions


      var selectedIndex = Math.max(typeaheadIndex, 0);
      var flattenedSuggestions = flattenSuggestions(suggestions);
      selectedIndex = selectedIndex % flattenedSuggestions.length || 0;
      var selectedKeys = (typeaheadIndex !== null && flattenedSuggestions.length > 0 ? [flattenedSuggestions[selectedIndex]] : []).map(function (i) {
        return _typeof(i) === 'object' ? i.text : i;
      }); // Create typeahead in DOM root so we can later position it absolutely

      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(Portal, {
        prefix: portalPrefix
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_typeahead__WEBPACK_IMPORTED_MODULE_2__["default"], {
        menuRef: _this2.menuRef,
        selectedItems: selectedKeys,
        onClickItem: _this2.onClickItem,
        groupedItems: suggestions
      }));
    };

    var _props$prismDefinitio = props.prismDefinition,
        prismDefinition = _props$prismDefinitio === void 0 ? {} : _props$prismDefinitio,
        _props$prismLanguage = props.prismLanguage,
        prismLanguage = _props$prismLanguage === void 0 ? 'kusto' : _props$prismLanguage;
    _this2.plugins = [Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["BracesPlugin"])(), Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["ClearPlugin"])(), Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["RunnerPlugin"])({
      handler: props.onPressEnter
    }), Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["NewlinePlugin"])(), Object(app_features_explore_slate_plugins_prism__WEBPACK_IMPORTED_MODULE_0__["default"])({
      definition: prismDefinition,
      language: prismLanguage
    })];
    _this2.state = {
      labelKeys: {},
      labelValues: {},
      suggestions: [],
      typeaheadIndex: null,
      typeaheadPrefix: '',
      value: getInitialValue(props.initialQuery || '')
    };
    return _this2;
  }

  _createClass(QueryField, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateMenu();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.restoreEscapeKeyBinding();
      clearTimeout(this.resetTimer);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateMenu();
    }
  }, {
    key: "removeEscapeKeyBinding",
    value: function removeEscapeKeyBinding() {
      this.keybindingSrv.unbind('esc', 'keydown');
    }
  }, {
    key: "restoreEscapeKeyBinding",
    value: function restoreEscapeKeyBinding() {
      this.keybindingSrv.setupGlobal();
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "slate-query-field"
      }, this.renderMenu(), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_grafana_slate_react__WEBPACK_IMPORTED_MODULE_5__["Editor"], {
        autoCorrect: false,
        onBlur: this.handleBlur,
        onKeyDown: this.onKeyDown,
        onChange: this.onChange,
        onFocus: this.handleFocus,
        placeholder: this.props.placeholder,
        plugins: this.plugins,
        spellCheck: false,
        value: this.state.value
      }));
    }
  }]);

  return QueryField;
}(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (QueryField);

/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/typeahead.tsx":
/*!*********************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/typeahead.tsx ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



function scrollIntoView(el) {
  if (!el || !el.offsetParent) {
    return;
  }

  var container = el.offsetParent;

  if (el.offsetTop > container.scrollTop + container.offsetHeight || el.offsetTop < container.scrollTop) {
    container.scrollTop = el.offsetTop - container.offsetTop;
  }
}

var TypeaheadItem =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(TypeaheadItem, _React$PureComponent);

  function TypeaheadItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TypeaheadItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TypeaheadItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.getRef = function (el) {
      _this.el = el;
    };

    return _this;
  }

  _createClass(TypeaheadItem, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.isSelected && !prevProps.isSelected) {
        scrollIntoView(this.el);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          hint = _this$props.hint,
          isSelected = _this$props.isSelected,
          label = _this$props.label,
          onClickItem = _this$props.onClickItem;
      var className = isSelected ? 'typeahead-item typeahead-item__selected' : 'typeahead-item';

      var onClick = function onClick() {
        return onClickItem(label);
      };

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        ref: this.getRef,
        className: className,
        onClick: onClick
      }, label, hint && isSelected ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "typeahead-item-hint"
      }, hint) : null);
    }
  }]);

  return TypeaheadItem;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

var TypeaheadGroup =
/*#__PURE__*/
function (_React$PureComponent2) {
  _inherits(TypeaheadGroup, _React$PureComponent2);

  function TypeaheadGroup() {
    _classCallCheck(this, TypeaheadGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(TypeaheadGroup).apply(this, arguments));
  }

  _createClass(TypeaheadGroup, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          items = _this$props2.items,
          label = _this$props2.label,
          selected = _this$props2.selected,
          onClickItem = _this$props2.onClickItem;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "typeahead-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "typeahead-group__title"
      }, label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "typeahead-group__list"
      }, items.map(function (item) {
        var text = _typeof(item) === 'object' ? item.text : item;
        var label = _typeof(item) === 'object' ? item.display || item.text : item;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TypeaheadItem, {
          key: text,
          onClickItem: onClickItem,
          isSelected: selected.indexOf(text) > -1,
          hint: item.hint,
          label: label
        });
      })));
    }
  }]);

  return TypeaheadGroup;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

var Typeahead =
/*#__PURE__*/
function (_React$PureComponent3) {
  _inherits(Typeahead, _React$PureComponent3);

  function Typeahead() {
    _classCallCheck(this, Typeahead);

    return _possibleConstructorReturn(this, _getPrototypeOf(Typeahead).apply(this, arguments));
  }

  _createClass(Typeahead, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          groupedItems = _this$props3.groupedItems,
          menuRef = _this$props3.menuRef,
          selectedItems = _this$props3.selectedItems,
          onClickItem = _this$props3.onClickItem;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "typeahead",
        ref: menuRef
      }, groupedItems.map(function (g) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TypeaheadGroup, _extends({
          key: g.label,
          onClickItem: onClickItem,
          selected: selectedItems
        }, g));
      }));
    }
  }]);

  return Typeahead;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

/* harmony default export */ __webpack_exports__["default"] = (Typeahead);

/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/insights_analytics/insights_analytics_datasource.ts":
/*!****************************************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/insights_analytics/insights_analytics_datasource.ts ***!
  \****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InsightsAnalyticsDatasource; });
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/types.ts");
/* harmony import */ var _app_insights_app_insights_datasource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app_insights/app_insights_datasource */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/app_insights/app_insights_datasource.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var InsightsAnalyticsDatasource =
/*#__PURE__*/
function (_AppInsightsDatasourc) {
  _inherits(InsightsAnalyticsDatasource, _AppInsightsDatasourc);

  function InsightsAnalyticsDatasource(instanceSettings) {
    _classCallCheck(this, InsightsAnalyticsDatasource);

    return _possibleConstructorReturn(this, _getPrototypeOf(InsightsAnalyticsDatasource).call(this, instanceSettings));
  }

  _createClass(InsightsAnalyticsDatasource, [{
    key: "applyTemplateVariables",
    value: function applyTemplateVariables(target, scopedVars) {
      var item = target.insightsAnalytics; // Old name migrations

      var old = item;

      if (old.rawQueryString && !item.query) {
        item.query = old.rawQueryString;
      }

      return {
        refId: target.refId,
        queryType: _types__WEBPACK_IMPORTED_MODULE_1__["AzureQueryType"].InsightsAnalytics,
        insightsAnalytics: {
          query: Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getTemplateSrv"])().replace(item.query, scopedVars),
          resultFormat: item.resultFormat
        }
      };
    }
  }]);

  return InsightsAnalyticsDatasource;
}(_app_insights_app_insights_datasource__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/log_analytics/querystring_builder.ts":
/*!*************************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/log_analytics/querystring_builder.ts ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LogAnalyticsQuerystringBuilder; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var LogAnalyticsQuerystringBuilder =
/*#__PURE__*/
function () {
  function LogAnalyticsQuerystringBuilder(rawQueryString, options, defaultTimeField) {
    _classCallCheck(this, LogAnalyticsQuerystringBuilder);

    this.rawQueryString = rawQueryString;
    this.options = options;
    this.defaultTimeField = defaultTimeField;
  }

  _createClass(LogAnalyticsQuerystringBuilder, [{
    key: "generate",
    value: function generate() {
      var _this = this;

      var queryString = this.rawQueryString;
      var macroRegexp = /\$__([_a-zA-Z0-9]+)\(([^\)]*)\)/gi;
      queryString = queryString.replace(macroRegexp, function (match, p1, p2) {
        if (p1 === 'contains') {
          return _this.getMultiContains(p2);
        }

        return match;
      });
      queryString = queryString.replace(/\$__escapeMulti\(('[^]*')\)/gi, function (match, p1) {
        return _this.escape(p1);
      });

      if (this.options) {
        queryString = queryString.replace(macroRegexp, function (match, p1, p2) {
          if (p1 === 'timeFilter') {
            return _this.getTimeFilter(p2, _this.options);
          }

          if (p1 === 'timeFrom') {
            return _this.getFrom(_this.options);
          }

          if (p1 === 'timeTo') {
            return _this.getUntil(_this.options);
          }

          return match;
        });
        queryString = queryString.replace(/\$__interval/gi, this.options.interval);
      }

      var rawQuery = queryString;
      queryString = encodeURIComponent(queryString);
      var uriString = "query=".concat(queryString);
      return {
        uriString: uriString,
        rawQuery: rawQuery
      };
    }
  }, {
    key: "getFrom",
    value: function getFrom(options) {
      var from = options.range.from;
      return "datetime(".concat(Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["dateTime"])(from).startOf('minute').toISOString(), ")");
    }
  }, {
    key: "getUntil",
    value: function getUntil(options) {
      if (options.rangeRaw.to === 'now') {
        var now = Date.now();
        return "datetime(".concat(Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["dateTime"])(now).startOf('minute').toISOString(), ")");
      } else {
        var until = options.range.to;
        return "datetime(".concat(Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["dateTime"])(until).startOf('minute').toISOString(), ")");
      }
    }
  }, {
    key: "getTimeFilter",
    value: function getTimeFilter(timeFieldArg, options) {
      var timeField = timeFieldArg || this.defaultTimeField;

      if (options.rangeRaw.to === 'now') {
        return "".concat(timeField, " >= ").concat(this.getFrom(options));
      } else {
        return "".concat(timeField, "  >= ").concat(this.getFrom(options), " and ").concat(timeField, " <= ").concat(this.getUntil(options));
      }
    }
  }, {
    key: "getMultiContains",
    value: function getMultiContains(inputs) {
      var firstCommaIndex = inputs.indexOf(',');
      var field = inputs.substring(0, firstCommaIndex);
      var templateVar = inputs.substring(inputs.indexOf(',') + 1);

      if (templateVar && templateVar.toLowerCase().trim() === 'all') {
        return '1 == 1';
      }

      return "".concat(field.trim(), " in (").concat(templateVar.trim(), ")");
    }
  }, {
    key: "escape",
    value: function escape(inputs) {
      return inputs.substring(1, inputs.length - 1).split("','").map(function (v) {
        return "@'".concat(v, "'");
      }).join(', ');
    }
  }]);

  return LogAnalyticsQuerystringBuilder;
}();



/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/module.tsx":
/*!***********************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/module.tsx ***!
  \***********************************************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_ctrl */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/query_ctrl.ts");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/datasource.ts");
/* harmony import */ var _components_ConfigEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ConfigEditor */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/ConfigEditor.tsx");
/* harmony import */ var _annotations_query_ctrl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./annotations_query_ctrl */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/annotations_query_ctrl.ts");





var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_2__["default"]).setConfigEditor(_components_ConfigEditor__WEBPACK_IMPORTED_MODULE_3__["ConfigEditor"]).setQueryCtrl(_query_ctrl__WEBPACK_IMPORTED_MODULE_1__["AzureMonitorQueryCtrl"]).setAnnotationQueryCtrl(_annotations_query_ctrl__WEBPACK_IMPORTED_MODULE_4__["AzureMonitorAnnotationsQueryCtrl"]);

/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/query_ctrl.ts":
/*!**************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/query_ctrl.ts ***!
  \**************************************************************************************/
/*! exports provided: AzureMonitorQueryCtrl, migrateMetricsDimensionFilters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AzureMonitorQueryCtrl", function() { return AzureMonitorQueryCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "migrateMetricsDimensionFilters", function() { return migrateMetricsDimensionFilters; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/plugins/sdk */ "./public/app/plugins/sdk.ts");
/* harmony import */ var _time_grain_converter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./time_grain_converter */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/time_grain_converter.ts");
/* harmony import */ var _editor_editor_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor/editor_component */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/editor_component.tsx");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // import './css/query_editor.css';




var AzureMonitorQueryCtrl =
/*#__PURE__*/
function (_QueryCtrl) {
  AzureMonitorQueryCtrl.$inject = ["$scope", "$injector", "templateSrv"];

  _inherits(AzureMonitorQueryCtrl, _QueryCtrl);

  /** @ngInject */
  function AzureMonitorQueryCtrl($scope, $injector, templateSrv) {
    var _this;

    _classCallCheck(this, AzureMonitorQueryCtrl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AzureMonitorQueryCtrl).call(this, $scope, $injector));
    _this.templateSrv = templateSrv;
    _this.defaultDropdownValue = 'select';
    _this.dummyDiminsionString = '+';
    _this.defaults = {
      queryType: 'Azure Monitor',
      azureMonitor: {
        resourceGroup: _this.defaultDropdownValue,
        metricDefinition: _this.defaultDropdownValue,
        resourceName: _this.defaultDropdownValue,
        metricNamespace: _this.defaultDropdownValue,
        metricName: _this.defaultDropdownValue,
        dimensionFilter: '*',
        timeGrain: 'auto',
        top: '10',
        aggOptions: [],
        timeGrains: []
      },
      azureLogAnalytics: {
        query: ['//change this example to create your own time series query', '<table name>                                                              ' + '//the table to query (e.g. Usage, Heartbeat, Perf)', '| where $__timeFilter(TimeGenerated)                                      ' + '//this is a macro used to show the full chart’s time range, choose the datetime column here', '| summarize count() by <group by column>, bin(TimeGenerated, $__interval) ' + '//change “group by column” to a column in your table, such as “Computer”. ' + 'The $__interval macro is used to auto-select the time grain. Can also use 1h, 5m etc.', '| order by TimeGenerated asc'].join('\n'),
        resultFormat: 'time_series',
        workspace: _this.datasource && _this.datasource.azureLogAnalyticsDatasource ? _this.datasource.azureLogAnalyticsDatasource.defaultOrFirstWorkspace : ''
      },
      appInsights: {
        metricName: _this.defaultDropdownValue,
        // dimension: [],
        timeGrain: 'auto'
      },
      insightsAnalytics: {
        query: '',
        resultFormat: 'time_series'
      }
    };

    _this.getWorkspaces = function () {
      return _this.datasource.azureLogAnalyticsDatasource.getWorkspaces(_this.target.subscription).then(function (list) {
        _this.workspaces = list;

        if (list.length > 0 && !_this.target.azureLogAnalytics.workspace) {
          if (_this.datasource.azureLogAnalyticsDatasource.defaultOrFirstWorkspace) {
            _this.target.azureLogAnalytics.workspace = _this.datasource.azureLogAnalyticsDatasource.defaultOrFirstWorkspace;
          }

          if (!_this.target.azureLogAnalytics.workspace) {
            _this.target.azureLogAnalytics.workspace = list[0].value;
          }
        }

        return _this.workspaces;
      }).catch(_this.handleQueryCtrlError.bind(_assertThisInitialized(_this)));
    };

    _this.getAzureLogAnalyticsSchema = function () {
      return _this.getWorkspaces().then(function () {
        return _this.datasource.azureLogAnalyticsDatasource.getSchema(_this.target.azureLogAnalytics.workspace);
      }).catch(_this.handleQueryCtrlError.bind(_assertThisInitialized(_this)));
    };

    _this.onLogAnalyticsQueryChange = function (nextQuery) {
      _this.target.azureLogAnalytics.query = nextQuery;
    };

    _this.onLogAnalyticsQueryExecute = function () {
      _this.panelCtrl.refresh();
    };

    _this.onInsightsAnalyticsQueryChange = function (nextQuery) {
      _this.target.insightsAnalytics.query = nextQuery;
    };

    _this.onQueryExecute = function () {
      return _this.refresh();
    };

    _this.getAppInsightsQuerySchema = function () {
      return _this.datasource.appInsightsDatasource.getQuerySchema().catch(_this.handleQueryCtrlError.bind(_assertThisInitialized(_this)));
    };

    _this.removeGroupBy = function (index) {
      var appInsights = _this.target.appInsights;
      appInsights.dimension.splice(index, 1);

      _this.refresh();
    };

    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.defaultsDeep(_this.target, _this.defaults);

    _this.migrateTimeGrains();

    _this.migrateToFromTimes();

    _this.migrateToDefaultNamespace();

    _this.migrateApplicationInsightsKeys();

    _this.migrateApplicationInsightsDimensions();

    migrateMetricsDimensionFilters(_this.target.azureMonitor);

    _this.panelCtrl.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["PanelEvents"].dataReceived, _this.onDataReceived.bind(_assertThisInitialized(_this)), $scope);

    _this.panelCtrl.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["PanelEvents"].dataError, _this.onDataError.bind(_assertThisInitialized(_this)), $scope);

    _this.resultFormats = [{
      text: '时间序列',
      value: 'time_series'
    }, {
      text: '表格',
      value: 'table'
    }];

    _this.getSubscriptions();

    if (_this.target.queryType === 'Azure Log Analytics') {
      _this.getWorkspaces();
    }

    return _this;
  }

  _createClass(AzureMonitorQueryCtrl, [{
    key: "onDataReceived",
    value: function onDataReceived(dataList) {
      this.lastQueryError = undefined;
      this.lastQuery = '';

      var anySeriesFromQuery = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(dataList, {
        refId: this.target.refId
      });

      if (anySeriesFromQuery && anySeriesFromQuery.meta) {
        this.lastQuery = anySeriesFromQuery.meta.query;
      }
    }
  }, {
    key: "onDataError",
    value: function onDataError(err) {
      this.handleQueryCtrlError(err);
    }
  }, {
    key: "handleQueryCtrlError",
    value: function handleQueryCtrlError(err) {
      if (err.query && err.query.refId && err.query.refId !== this.target.refId) {
        return;
      }

      if (err.error && err.error.data && err.error.data.error && err.error.data.error.innererror) {
        if (err.error.data.error.innererror.innererror) {
          this.lastQueryError = err.error.data.error.innererror.innererror.message;
        } else {
          this.lastQueryError = err.error.data.error.innererror.message;
        }
      } else if (err.error && err.error.data && err.error.data.error) {
        this.lastQueryError = err.error.data.error.message;
      } else if (err.error && err.error.data) {
        this.lastQueryError = err.error.data.message;
      } else if (err.data && err.data.error) {
        this.lastQueryError = err.data.error.message;
      } else if (err.data && err.data.message) {
        this.lastQueryError = err.data.message;
      } else {
        this.lastQueryError = err;
      }
    }
  }, {
    key: "migrateTimeGrains",
    value: function migrateTimeGrains() {
      if (this.target.azureMonitor.timeGrainUnit) {
        if (this.target.azureMonitor.timeGrain !== 'auto') {
          this.target.azureMonitor.timeGrain = _time_grain_converter__WEBPACK_IMPORTED_MODULE_2__["default"].createISO8601Duration(this.target.azureMonitor.timeGrain, this.target.azureMonitor.timeGrainUnit);
        }

        delete this.target.azureMonitor.timeGrainUnit;
        this.onMetricNameChange();
      }

      if (this.target.appInsights.timeGrainUnit) {
        if (this.target.appInsights.timeGrain !== 'auto') {
          if (this.target.appInsights.timeGrainCount) {
            this.target.appInsights.timeGrain = _time_grain_converter__WEBPACK_IMPORTED_MODULE_2__["default"].createISO8601Duration(this.target.appInsights.timeGrainCount, this.target.appInsights.timeGrainUnit);
          } else {
            this.target.appInsights.timeGrainCount = this.target.appInsights.timeGrain;
            this.target.appInsights.timeGrain = _time_grain_converter__WEBPACK_IMPORTED_MODULE_2__["default"].createISO8601Duration(this.target.appInsights.timeGrain, this.target.appInsights.timeGrainUnit);
          }
        }
      }

      var oldAzureTimeGrains = this.target.azureMonitor.timeGrains;

      if (oldAzureTimeGrains && oldAzureTimeGrains.length > 0 && (!this.target.azureMonitor.allowedTimeGrainsMs || this.target.azureMonitor.allowedTimeGrainsMs.length === 0)) {
        this.target.azureMonitor.allowedTimeGrainsMs = this.convertTimeGrainsToMs(oldAzureTimeGrains);
      }

      if (this.target.appInsights.timeGrains && this.target.appInsights.timeGrains.length > 0 && (!this.target.appInsights.allowedTimeGrainsMs || this.target.appInsights.allowedTimeGrainsMs.length === 0)) {
        this.target.appInsights.allowedTimeGrainsMs = this.convertTimeGrainsToMs(this.target.appInsights.timeGrains);
      }
    }
  }, {
    key: "migrateToFromTimes",
    value: function migrateToFromTimes() {
      this.target.azureLogAnalytics.query = this.target.azureLogAnalytics.query.replace(/\$__from\s/gi, '$__timeFrom() ');
      this.target.azureLogAnalytics.query = this.target.azureLogAnalytics.query.replace(/\$__to\s/gi, '$__timeTo() ');
    }
  }, {
    key: "migrateToDefaultNamespace",
    value: function () {
      var _migrateToDefaultNamespace = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.target.azureMonitor.metricNamespace && this.target.azureMonitor.metricNamespace !== this.defaultDropdownValue && this.target.azureMonitor.metricDefinition)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                this.target.azureMonitor.metricNamespace = this.target.azureMonitor.metricDefinition;

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function migrateToDefaultNamespace() {
        return _migrateToDefaultNamespace.apply(this, arguments);
      }

      return migrateToDefaultNamespace;
    }()
  }, {
    key: "migrateApplicationInsightsKeys",
    value: function migrateApplicationInsightsKeys() {
      var appInsights = this.target.appInsights; // Migrate old app insights data keys to match other datasources

      var mappings = {
        xaxis: 'timeColumn',
        yaxis: 'valueColumn',
        spliton: 'segmentColumn',
        groupBy: 'dimension',
        groupByOptions: 'dimensions',
        filter: 'dimensionFilter'
      };

      for (var _old in mappings) {
        if (appInsights[_old]) {
          appInsights[mappings[_old]] = appInsights[_old];
          delete appInsights[_old];
        }
      }
    }
  }, {
    key: "migrateApplicationInsightsDimensions",
    value: function migrateApplicationInsightsDimensions() {
      var appInsights = this.target.appInsights;

      if (!appInsights.dimension) {
        appInsights.dimension = [];
      }

      if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString(appInsights.dimension)) {
        appInsights.dimension = [appInsights.dimension];
      }
    }
  }, {
    key: "replace",
    value: function replace(variable) {
      return this.templateSrv.replace(variable, this.panelCtrl.panel.scopedVars);
    }
  }, {
    key: "onQueryTypeChange",
    value: function onQueryTypeChange() {
      if (this.target.queryType === 'Azure Log Analytics') {
        return this.getWorkspaces();
      }
    }
  }, {
    key: "getSubscriptions",
    value: function getSubscriptions() {
      var _this2 = this;

      if (!this.datasource.azureMonitorDatasource.isConfigured()) {
        return;
      }

      return this.datasource.azureMonitorDatasource.getSubscriptions().then(function (subs) {
        _this2.subscriptions = subs;

        if (!_this2.target.subscription && _this2.target.queryType === 'Azure Monitor') {
          _this2.target.subscription = _this2.datasource.azureMonitorDatasource.subscriptionId;
        } else if (!_this2.target.subscription && _this2.target.queryType === 'Azure Log Analytics') {
          _this2.target.subscription = _this2.datasource.azureLogAnalyticsDatasource.logAnalyticsSubscriptionId;
        }

        if (!_this2.target.subscription && _this2.subscriptions.length > 0) {
          _this2.target.subscription = _this2.subscriptions[0].value;
        }

        return _this2.subscriptions;
      });
    }
  }, {
    key: "onSubscriptionChange",
    value: function onSubscriptionChange() {
      if (this.target.queryType === 'Azure Log Analytics') {
        return this.getWorkspaces();
      }

      if (this.target.queryType === 'Azure Monitor') {
        this.target.azureMonitor.resourceGroup = this.defaultDropdownValue;
        this.target.azureMonitor.metricDefinition = this.defaultDropdownValue;
        this.target.azureMonitor.resourceName = this.defaultDropdownValue;
        this.target.azureMonitor.metricName = this.defaultDropdownValue;
        this.target.azureMonitor.aggregation = '';
        this.target.azureMonitor.timeGrain = '';
        this.target.azureMonitor.dimensionFilters = [];
      }
    }
    /* Azure Monitor Section */

  }, {
    key: "getResourceGroups",
    value: function getResourceGroups(query) {
      if (this.target.queryType !== 'Azure Monitor' || !this.datasource.azureMonitorDatasource.isConfigured()) {
        return;
      }

      return this.datasource.getResourceGroups(this.replace(this.target.subscription || this.datasource.azureMonitorDatasource.subscriptionId)).catch(this.handleQueryCtrlError.bind(this));
    }
  }, {
    key: "getMetricDefinitions",
    value: function getMetricDefinitions(query) {
      if (this.target.queryType !== 'Azure Monitor' || !this.target.azureMonitor.resourceGroup || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue) {
        return;
      }

      return this.datasource.getMetricDefinitions(this.replace(this.target.subscription || this.datasource.azureMonitorDatasource.subscriptionId), this.replace(this.target.azureMonitor.resourceGroup)).catch(this.handleQueryCtrlError.bind(this));
    }
  }, {
    key: "getResourceNames",
    value: function getResourceNames(query) {
      if (this.target.queryType !== 'Azure Monitor' || !this.target.azureMonitor.resourceGroup || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue || !this.target.azureMonitor.metricDefinition || this.target.azureMonitor.metricDefinition === this.defaultDropdownValue) {
        return;
      }

      return this.datasource.getResourceNames(this.replace(this.target.subscription || this.datasource.azureMonitorDatasource.subscriptionId), this.replace(this.target.azureMonitor.resourceGroup), this.replace(this.target.azureMonitor.metricDefinition)).catch(this.handleQueryCtrlError.bind(this));
    }
  }, {
    key: "getMetricNamespaces",
    value: function getMetricNamespaces() {
      if (this.target.queryType !== 'Azure Monitor' || !this.target.azureMonitor.resourceGroup || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue || !this.target.azureMonitor.metricDefinition || this.target.azureMonitor.metricDefinition === this.defaultDropdownValue || !this.target.azureMonitor.resourceName || this.target.azureMonitor.resourceName === this.defaultDropdownValue) {
        return;
      }

      return this.datasource.getMetricNamespaces(this.replace(this.target.subscription || this.datasource.azureMonitorDatasource.subscriptionId), this.replace(this.target.azureMonitor.resourceGroup), this.replace(this.target.azureMonitor.metricDefinition), this.replace(this.target.azureMonitor.resourceName)).catch(this.handleQueryCtrlError.bind(this));
    }
  }, {
    key: "getMetricNames",
    value: function getMetricNames() {
      if (this.target.queryType !== 'Azure Monitor' || !this.target.azureMonitor.resourceGroup || this.target.azureMonitor.resourceGroup === this.defaultDropdownValue || !this.target.azureMonitor.metricDefinition || this.target.azureMonitor.metricDefinition === this.defaultDropdownValue || !this.target.azureMonitor.resourceName || this.target.azureMonitor.resourceName === this.defaultDropdownValue || !this.target.azureMonitor.metricNamespace || this.target.azureMonitor.metricNamespace === this.defaultDropdownValue) {
        return;
      }

      return this.datasource.getMetricNames(this.replace(this.target.subscription || this.datasource.azureMonitorDatasource.subscriptionId), this.replace(this.target.azureMonitor.resourceGroup), this.replace(this.target.azureMonitor.metricDefinition), this.replace(this.target.azureMonitor.resourceName), this.replace(this.target.azureMonitor.metricNamespace)).catch(this.handleQueryCtrlError.bind(this));
    }
  }, {
    key: "onResourceGroupChange",
    value: function onResourceGroupChange() {
      this.target.azureMonitor.metricDefinition = this.defaultDropdownValue;
      this.target.azureMonitor.resourceName = this.defaultDropdownValue;
      this.target.azureMonitor.metricNamespace = this.defaultDropdownValue;
      this.target.azureMonitor.metricName = this.defaultDropdownValue;
      this.target.azureMonitor.aggregation = '';
      this.target.azureMonitor.timeGrain = '';
      this.target.azureMonitor.dimensionFilters = [];
      this.refresh();
    }
  }, {
    key: "onMetricDefinitionChange",
    value: function onMetricDefinitionChange() {
      this.target.azureMonitor.resourceName = this.defaultDropdownValue;
      this.target.azureMonitor.metricNamespace = this.defaultDropdownValue;
      this.target.azureMonitor.metricName = this.defaultDropdownValue;
      this.target.azureMonitor.aggregation = '';
      this.target.azureMonitor.timeGrain = '';
      this.target.azureMonitor.dimensionFilters = [];
    }
  }, {
    key: "onResourceNameChange",
    value: function onResourceNameChange() {
      this.target.azureMonitor.metricNamespace = this.defaultDropdownValue;
      this.target.azureMonitor.metricName = this.defaultDropdownValue;
      this.target.azureMonitor.aggregation = '';
      this.target.azureMonitor.timeGrain = '';
      this.target.azureMonitor.dimensionFilters = [];
      this.refresh();
    }
  }, {
    key: "onMetricNamespacesChange",
    value: function onMetricNamespacesChange() {
      this.target.azureMonitor.metricName = this.defaultDropdownValue;
      this.target.azureMonitor.dimensionFilters = [];
    }
  }, {
    key: "onMetricNameChange",
    value: function onMetricNameChange() {
      var _this3 = this;

      if (!this.target.azureMonitor.metricName || this.target.azureMonitor.metricName === this.defaultDropdownValue) {
        return Promise.resolve();
      }

      return this.datasource.getMetricMetadata(this.replace(this.target.subscription), this.replace(this.target.azureMonitor.resourceGroup), this.replace(this.target.azureMonitor.metricDefinition), this.replace(this.target.azureMonitor.resourceName), this.replace(this.target.azureMonitor.metricNamespace), this.replace(this.target.azureMonitor.metricName)).then(function (metadata) {
        _this3.target.azureMonitor.aggregation = metadata.primaryAggType;
        _this3.target.azureMonitor.timeGrain = 'auto';
        _this3.target.azureMonitor.allowedTimeGrainsMs = _this3.convertTimeGrainsToMs(metadata.supportedTimeGrains || []); // HACK: this saves the last metadata values in the panel json ¯\_(ツ)_/¯

        var hackState = _this3.target.azureMonitor;
        hackState.aggOptions = metadata.supportedAggTypes || [metadata.primaryAggType];
        hackState.timeGrains = [{
          text: 'auto',
          value: 'auto'
        }].concat(metadata.supportedTimeGrains);
        hackState.dimensions = metadata.dimensions;

        if (metadata.dimensions.length > 0) {//  this.target.azureMonitor.dimension = metadata.dimensions[0].value;
        }

        return _this3.refresh();
      }).catch(this.handleQueryCtrlError.bind(this));
    }
  }, {
    key: "convertTimeGrainsToMs",
    value: function convertTimeGrainsToMs(timeGrains) {
      var allowedTimeGrainsMs = [];
      timeGrains.forEach(function (tg) {
        if (tg.value !== 'auto') {
          allowedTimeGrainsMs.push(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["rangeUtil"].intervalToMs(_time_grain_converter__WEBPACK_IMPORTED_MODULE_2__["default"].createKbnUnitFromISO8601Duration(tg.value)));
        }
      });
      return allowedTimeGrainsMs;
    }
  }, {
    key: "generateAutoUnits",
    value: function generateAutoUnits(timeGrain, timeGrains) {
      if (timeGrain === 'auto') {
        return _time_grain_converter__WEBPACK_IMPORTED_MODULE_2__["default"].findClosestTimeGrain('1m', lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(timeGrains, function (o) {
          return _time_grain_converter__WEBPACK_IMPORTED_MODULE_2__["default"].createKbnUnitFromISO8601Duration(o.value);
        }) || ['1m', '5m', '15m', '30m', '1h', '6h', '12h', '1d']);
      }

      return '';
    }
  }, {
    key: "getAzureMonitorAutoInterval",
    value: function getAzureMonitorAutoInterval() {
      return this.generateAutoUnits(this.target.azureMonitor.timeGrain, this.target.azureMonitor.timeGrains);
    }
  }, {
    key: "getApplicationInsightAutoInterval",
    value: function getApplicationInsightAutoInterval() {
      return this.generateAutoUnits(this.target.appInsights.timeGrain, this.target.appInsights.timeGrains);
    }
  }, {
    key: "azureMonitorAddDimensionFilter",
    value: function azureMonitorAddDimensionFilter() {
      this.target.azureMonitor.dimensionFilters.push({
        dimension: '',
        operator: 'eq',
        filter: ''
      });
    }
  }, {
    key: "azureMonitorRemoveDimensionFilter",
    value: function azureMonitorRemoveDimensionFilter(index) {
      this.target.azureMonitor.dimensionFilters.splice(index, 1);
      this.refresh();
    }
    /* Azure Log Analytics */

  }, {
    key: "getAppInsightsMetricNames",
    value: function getAppInsightsMetricNames() {
      if (!this.datasource.appInsightsDatasource.isConfigured()) {
        return;
      }

      return this.datasource.getAppInsightsMetricNames().catch(this.handleQueryCtrlError.bind(this));
    }
  }, {
    key: "getAppInsightsColumns",
    value: function getAppInsightsColumns() {
      return this.datasource.getAppInsightsColumns(this.target.refId);
    }
  }, {
    key: "onAppInsightsColumnChange",
    value: function onAppInsightsColumnChange() {
      return this.refresh();
    }
  }, {
    key: "onAppInsightsMetricNameChange",
    value: function onAppInsightsMetricNameChange() {
      var _this4 = this;

      if (!this.target.appInsights.metricName || this.target.appInsights.metricName === this.defaultDropdownValue) {
        return;
      }

      return this.datasource.getAppInsightsMetricMetadata(this.replace(this.target.appInsights.metricName)).then(function (aggData) {
        _this4.target.appInsights.aggOptions = aggData.supportedAggTypes;
        _this4.target.appInsights.dimensions = aggData.supportedGroupBy;
        _this4.target.appInsights.aggregation = aggData.primaryAggType;
        return _this4.refresh();
      }).catch(this.handleQueryCtrlError.bind(this));
    }
  }, {
    key: "getAppInsightsGroupBySegments",
    value: function getAppInsightsGroupBySegments(query) {
      var appInsights = this.target.appInsights; // HACK alert... there must be a better way!

      if (this.dummyDiminsionString && this.dummyDiminsionString.length && '+' !== this.dummyDiminsionString) {
        if (!appInsights.dimension) {
          appInsights.dimension = [];
        }

        appInsights.dimension.push(this.dummyDiminsionString);
        this.dummyDiminsionString = '+';
        this.refresh();
      } // Return the list of dimensions stored on the query object from the last request :(


      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(appInsights.dimensions, function (option) {
        return {
          text: option,
          value: option
        };
      });
    }
  }, {
    key: "resetAppInsightsGroupBy",
    value: function resetAppInsightsGroupBy() {
      this.target.appInsights.dimension = 'none';
      this.refresh();
    }
  }, {
    key: "updateTimeGrainType",
    value: function updateTimeGrainType() {
      if (this.target.appInsights.timeGrainType === 'specific') {
        this.target.appInsights.timeGrainCount = '1';
        this.target.appInsights.timeGrainUnit = 'minute';
        this.target.appInsights.timeGrain = _time_grain_converter__WEBPACK_IMPORTED_MODULE_2__["default"].createISO8601Duration(this.target.appInsights.timeGrainCount, this.target.appInsights.timeGrainUnit);
      } else {
        this.target.appInsights.timeGrainCount = '';
        this.target.appInsights.timeGrainUnit = '';
      }
    }
  }, {
    key: "updateAppInsightsTimeGrain",
    value: function updateAppInsightsTimeGrain() {
      if (this.target.appInsights.timeGrainUnit && this.target.appInsights.timeGrainCount) {
        this.target.appInsights.timeGrain = _time_grain_converter__WEBPACK_IMPORTED_MODULE_2__["default"].createISO8601Duration(this.target.appInsights.timeGrainCount, this.target.appInsights.timeGrainUnit);
      }

      this.refresh();
    }
  }, {
    key: "templateVariables",
    get: function get() {
      return this.templateSrv.getVariables().map(function (t) {
        return '$' + t.name;
      });
    }
  }]);

  return AzureMonitorQueryCtrl;
}(app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__["QueryCtrl"]); // Modifies the actual query object

AzureMonitorQueryCtrl.templateUrl = 'partials/query.editor.html';
function migrateMetricsDimensionFilters(item) {
  if (!item.dimensionFilters) {
    item.dimensionFilters = [];
  }

  var oldDimension = item.dimension;

  if (oldDimension && oldDimension !== 'None') {
    item.dimensionFilters.push({
      dimension: oldDimension,
      operator: 'eq',
      filter: item.dimensionFilter
    });
    delete item.dimension;
    delete item.dimensionFilter;
  }
}

/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/time_grain_converter.ts":
/*!************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/time_grain_converter.ts ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TimeGrainConverter; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var TimeGrainConverter =
/*#__PURE__*/
function () {
  function TimeGrainConverter() {
    _classCallCheck(this, TimeGrainConverter);
  }

  _createClass(TimeGrainConverter, null, [{
    key: "createISO8601Duration",
    value: function createISO8601Duration(timeGrain, timeGrainUnit) {
      var timeIntervals = ['hour', 'minute', 'h', 'm'];

      if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(timeIntervals, timeGrainUnit)) {
        return "PT".concat(timeGrain).concat(timeGrainUnit[0].toUpperCase());
      }

      return "P".concat(timeGrain).concat(timeGrainUnit[0].toUpperCase());
    }
  }, {
    key: "createISO8601DurationFromInterval",
    value: function createISO8601DurationFromInterval(interval) {
      var timeGrain = +interval.slice(0, interval.length - 1);
      var unit = interval[interval.length - 1];

      if (interval.indexOf('ms') > -1) {
        return TimeGrainConverter.createISO8601Duration(1, 'm');
      }

      if (interval[interval.length - 1] === 's') {
        var toMinutes = timeGrain * 60 % 60;

        if (toMinutes < 1) {
          toMinutes = 1;
        }

        return TimeGrainConverter.createISO8601Duration(toMinutes, 'm');
      }

      return TimeGrainConverter.createISO8601Duration(timeGrain, unit);
    }
  }, {
    key: "findClosestTimeGrain",
    value: function findClosestTimeGrain(interval, allowedTimeGrains) {
      var timeGrains = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(allowedTimeGrains, function (o) {
        return o !== 'auto';
      });

      var closest = timeGrains[0];
      var intervalMs = _grafana_data__WEBPACK_IMPORTED_MODULE_1__["rangeUtil"].intervalToMs(interval);

      for (var i = 0; i < timeGrains.length; i++) {
        // abs (num - val) < abs (num - curr):
        if (intervalMs > _grafana_data__WEBPACK_IMPORTED_MODULE_1__["rangeUtil"].intervalToMs(timeGrains[i])) {
          if (i + 1 < timeGrains.length) {
            closest = timeGrains[i + 1];
          } else {
            closest = timeGrains[i];
          }
        }
      }

      return closest;
    }
  }, {
    key: "createTimeGrainFromISO8601Duration",
    value: function createTimeGrainFromISO8601Duration(duration) {
      var offset = 1;

      if (duration.substring(0, 2) === 'PT') {
        offset = 2;
      }

      var value = duration.substring(offset, duration.length - 1);
      var unit = duration.substring(duration.length - 1);
      return value + ' ' + TimeGrainConverter.timeUnitToText(+value, unit);
    }
  }, {
    key: "timeUnitToText",
    value: function timeUnitToText(value, unit) {
      var text = '';

      if (unit === 'S') {
        text = 'second';
      }

      if (unit === 'M') {
        text = 'minute';
      }

      if (unit === 'H') {
        text = 'hour';
      }

      if (unit === 'D') {
        text = 'day';
      }

      if (value > 1) {
        return text + 's';
      }

      return text;
    }
  }, {
    key: "createKbnUnitFromISO8601Duration",
    value: function createKbnUnitFromISO8601Duration(duration) {
      if (duration === 'auto') {
        return 'auto';
      }

      var offset = 1;

      if (duration.substring(0, 2) === 'PT') {
        offset = 2;
      }

      var value = duration.substring(offset, duration.length - 1);
      var unit = duration.substring(duration.length - 1);
      return value + TimeGrainConverter.timeUnitToKbn(+value, unit);
    }
  }, {
    key: "timeUnitToKbn",
    value: function timeUnitToKbn(value, unit) {
      if (unit === 'S') {
        return 's';
      }

      if (unit === 'M') {
        return 'm';
      }

      if (unit === 'H') {
        return 'h';
      }

      if (unit === 'D') {
        return 'd';
      }

      return '';
    }
  }]);

  return TimeGrainConverter;
}();



/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/types.ts":
/*!*********************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/types.ts ***!
  \*********************************************************************************/
/*! exports provided: AzureQueryType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AzureQueryType", function() { return AzureQueryType; });
var AzureQueryType;

(function (AzureQueryType) {
  AzureQueryType["AzureMonitor"] = "Azure Monitor";
  AzureQueryType["ApplicationInsights"] = "Application Insights";
  AzureQueryType["InsightsAnalytics"] = "Insights Analytics";
  AzureQueryType["LogAnalytics"] = "Azure Log Analytics";
})(AzureQueryType || (AzureQueryType = {}));

/***/ })

}]);
//# sourceMappingURL=azureMonitorPlugin.1ebdc265fc3bd7452fcd.js.map