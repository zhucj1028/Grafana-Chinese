(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["prometheusPlugin"],{

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

/***/ "./public/app/plugins/datasource/prometheus/components/PromCheatSheet.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/components/PromCheatSheet.tsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var CHEAT_SHEET_ITEMS = [{
  title: '请求速率',
  expression: 'rate(http_request_total[5m])',
  label: '给定一个HTTP请求计数器，此查询将计算最近5分钟的每秒平均请求速率。'
}, {
  title: '请求延迟的95％',
  expression: 'histogram_quantile(0.95, sum(rate(prometheus_http_request_duration_seconds_bucket[5m])) by (le))',
  label: '计算5分钟内HTTP请求率的95％。'
}, {
  title: '警报触发',
  expression: 'sort_desc(sum(sum_over_time(ALERTS{alertstate="firing"}[24h])) by (alertname))',
  label: '总结过去24小时内一直触发的警报。'
}, {
  title: 'Step',
  label: '使用持续时间格式（15s，1m，3h等）定义图形分辨率。 小步长会创建高分辨率图形，但在较大的时间范围内可能会变慢。 使用更长的步骤会降低分辨率，并通过产生更少的数据点来平滑图形。 如果没有步骤给出的分辨率自动计算。'
}];
/* harmony default export */ __webpack_exports__["default"] = (function (props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "PromQL\u5907\u5FD8\u5355"), CHEAT_SHEET_ITEMS.map(function (item, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cheat-sheet-item",
      key: index
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cheat-sheet-item__title"
    }, item.title), item.expression ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cheat-sheet-item__example",
      onClick: function onClick(e) {
        return props.onClickExample({
          refId: 'A',
          expr: item.expression
        });
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, item.expression)) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "cheat-sheet-item__label"
    }, item.label));
  }));
});

/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/components/PromExploreExtraField.tsx":
/*!***************************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/components/PromExploreExtraField.tsx ***!
  \***************************************************************************************/
/*! exports provided: PromExploreExtraField, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromExploreExtraField", function() { return PromExploreExtraField; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
// Libraries
 // Types


function PromExploreExtraField(props) {
  var label = props.label,
      onChangeFunc = props.onChangeFunc,
      onKeyDownFunc = props.onKeyDownFunc,
      value = props.value,
      hasTooltip = props.hasTooltip,
      tooltipContent = props.tooltipContent;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-inline",
    "aria-label": "Prometheus extra field"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
    width: 5,
    tooltip: hasTooltip ? tooltipContent : undefined
  }, label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: 'text',
    className: "gf-form-input width-4",
    placeholder: 'auto',
    onChange: onChangeFunc,
    onKeyDown: onKeyDownFunc,
    value: value
  })));
}
/* harmony default export */ __webpack_exports__["default"] = (Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(PromExploreExtraField));

/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/components/PromExploreQueryEditor.tsx":
/*!****************************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/components/PromExploreQueryEditor.tsx ***!
  \****************************************************************************************/
/*! exports provided: PromExploreQueryEditor, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromExploreQueryEditor", function() { return PromExploreQueryEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PromQueryField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PromQueryField */ "./public/app/plugins/datasource/prometheus/components/PromQueryField.tsx");
/* harmony import */ var _PromExploreExtraField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PromExploreExtraField */ "./public/app/plugins/datasource/prometheus/components/PromExploreExtraField.tsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // Types



var PromExploreQueryEditor = function PromExploreQueryEditor(props) {
  var query = props.query,
      data = props.data,
      datasource = props.datasource,
      history = props.history,
      onChange = props.onChange,
      onRunQuery = props.onRunQuery;

  function onChangeQueryStep(value) {
    var query = props.query,
        onChange = props.onChange;

    var nextQuery = _objectSpread({}, query, {
      interval: value
    });

    onChange(nextQuery);
  }

  function onStepChange(e) {
    if (e.currentTarget.value !== query.interval) {
      onChangeQueryStep(e.currentTarget.value);
    }
  }

  function onReturnKeyDown(e) {
    if (e.key === 'Enter') {
      onRunQuery();
    }
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PromQueryField__WEBPACK_IMPORTED_MODULE_1__["default"], {
    datasource: datasource,
    query: query,
    onRunQuery: onRunQuery,
    onChange: onChange,
    onBlur: function onBlur() {},
    history: history,
    data: data,
    ExtraFieldElement: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PromExploreExtraField__WEBPACK_IMPORTED_MODULE_2__["PromExploreExtraField"], {
      label: '步',
      onChangeFunc: onStepChange,
      onKeyDownFunc: onReturnKeyDown,
      value: query.interval || '',
      hasTooltip: true,
      tooltipContent: '在这里可以使用时间单位，例如：5s，1m，3h，1d，1y（如果未指定单位，则为默认值：s）'
    })
  });
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(PromExploreQueryEditor));

/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/components/PromLink.tsx":
/*!**************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/components/PromLink.tsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PromLink; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
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




var PromLink =
/*#__PURE__*/
function (_Component) {
  _inherits(PromLink, _Component);

  function PromLink() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PromLink);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PromLink)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      href: ''
    };
    return _this;
  }

  _createClass(PromLink, [{
    key: "componentDidUpdate",
    value: function () {
      var _componentDidUpdate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(prevProps) {
        var panelData, href;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                panelData = this.props.panelData;

                if (!(panelData && panelData.request && prevProps.panelData !== panelData)) {
                  _context.next = 6;
                  break;
                }

                _context.next = 4;
                return this.getExternalLink(panelData);

              case 4:
                href = _context.sent;
                this.setState({
                  href: href
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidUpdate(_x) {
        return _componentDidUpdate.apply(this, arguments);
      }

      return componentDidUpdate;
    }()
  }, {
    key: "getExternalLink",
    value: function () {
      var _getExternalLink = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(panelData) {
        var _this$props, query, datasource, request, range, start, end, rangeDiff, endTime, options, queryOptions, expr, args;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props = this.props, query = _this$props.query, datasource = _this$props.datasource;
                request = panelData.request;

                if (request) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", '');

              case 4:
                range = request.range;
                start = datasource.getPrometheusTime(range.from, false);
                end = datasource.getPrometheusTime(range.to, true);
                rangeDiff = Math.ceil(end - start);
                endTime = range.to.utc().format('YYYY-MM-DD HH:mm');
                options = {
                  interval: request.interval
                };
                queryOptions = datasource.createQuery(query, options, start, end);
                expr = {
                  'g0.expr': queryOptions.expr,
                  'g0.range_input': rangeDiff + 's',
                  'g0.end_input': endTime,
                  'g0.step_input': queryOptions.step,
                  'g0.tab': 0
                };
                args = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(expr, function (v, k) {
                  return k + '=' + encodeURIComponent(v);
                }).join('&');
                return _context2.abrupt("return", "".concat(datasource.directUrl, "/graph?").concat(args));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getExternalLink(_x2) {
        return _getExternalLink.apply(this, arguments);
      }

      return getExternalLink;
    }()
  }, {
    key: "render",
    value: function render() {
      var href = this.state.href;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
        href: href,
        target: "_blank",
        rel: "noopener"
      }, "Prometheus");
    }
  }]);

  return PromLink;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);



/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/components/PromQueryEditor.tsx":
/*!*********************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/components/PromQueryEditor.tsx ***!
  \*********************************************************************************/
/*! exports provided: PromQueryEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromQueryEditor", function() { return PromQueryEditor; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _PromQueryField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PromQueryField */ "./public/app/plugins/datasource/prometheus/components/PromQueryField.tsx");
/* harmony import */ var _PromLink__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PromLink */ "./public/app/plugins/datasource/prometheus/components/PromLink.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


 // Types


var Switch = _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LegacyForms"].Switch;


var FORMAT_OPTIONS = [{
  label: '时间序列',
  value: 'time_series'
}, {
  label: '表格',
  value: 'table'
}, {
  label: '热图',
  value: 'heatmap'
}];

var INTERVAL_FACTOR_OPTIONS = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map([1, 2, 3, 4, 5, 10], function (value) {
  return {
    value: value,
    label: '1/' + value
  };
});

var PromQueryEditor =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PromQueryEditor, _PureComponent);

  // Query target to be modified and used for queries
  function PromQueryEditor(props) {
    var _this;

    _classCallCheck(this, PromQueryEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PromQueryEditor).call(this, props)); // Use default query to prevent undefined input values

    _this.onFieldChange = function (query, override) {
      _this.query.expr = query.expr;
    };

    _this.onFormatChange = function (option) {
      _this.query.format = option.value;

      _this.setState({
        formatOption: option
      }, _this.onRunQuery);
    };

    _this.onInstantChange = function (e) {
      var instant = e.target.checked;
      _this.query.instant = instant;

      _this.setState({
        instant: instant
      }, _this.onRunQuery);
    };

    _this.onIntervalChange = function (e) {
      var interval = e.currentTarget.value;
      _this.query.interval = interval;

      _this.setState({
        interval: interval
      });
    };

    _this.onIntervalFactorChange = function (option) {
      _this.query.intervalFactor = option.value;

      _this.setState({
        intervalFactorOption: option
      }, _this.onRunQuery);
    };

    _this.onLegendChange = function (e) {
      var legendFormat = e.currentTarget.value;
      _this.query.legendFormat = legendFormat;

      _this.setState({
        legendFormat: legendFormat
      });
    };

    _this.onRunQuery = function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          query = _assertThisInitialize.query;

      _this.props.onChange(query);

      _this.props.onRunQuery();
    };

    var defaultQuery = {
      expr: '',
      legendFormat: '',
      interval: ''
    };

    var _query = Object.assign({}, defaultQuery, props.query);

    _this.query = _query; // Query target properties that are fully controlled inputs

    _this.state = {
      // Fully controlled text inputs
      interval: _query.interval,
      legendFormat: _query.legendFormat,
      // Select options
      formatOption: FORMAT_OPTIONS.find(function (option) {
        return option.value === _query.format;
      }) || FORMAT_OPTIONS[0],
      intervalFactorOption: INTERVAL_FACTOR_OPTIONS.find(function (option) {
        return option.value === _query.intervalFactor;
      }) || INTERVAL_FACTOR_OPTIONS[0],
      // Switch options
      instant: Boolean(_query.instant)
    };
    return _this;
  }

  _createClass(PromQueryEditor, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          datasource = _this$props.datasource,
          query = _this$props.query,
          data = _this$props.data;
      var _this$state = this.state,
          formatOption = _this$state.formatOption,
          instant = _this$state.instant,
          interval = _this$state.interval,
          intervalFactorOption = _this$state.intervalFactorOption,
          legendFormat = _this$state.legendFormat;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PromQueryField__WEBPACK_IMPORTED_MODULE_3__["default"], {
        datasource: datasource,
        query: query,
        onRunQuery: this.onRunQuery,
        onChange: this.onFieldChange,
        history: [],
        data: data
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
        width: 7,
        tooltip: "\u4F7F\u7528\u540D\u79F0\u6216\u6A21\u5F0F\u63A7\u5236\u65F6\u95F4\u5E8F\u5217\u7684\u540D\u79F0\u3002 \u4F8B\u5982\uFF0C{{hostname}}\u5C06\u66FF\u6362\u4E3A\u6807\u7B7E\u4E3B\u673A\u540D\u7684\u6807\u7B7E\u503C\u3002"
      }, "\u56FE\u4F8B"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
        type: "text",
        className: "gf-form-input",
        placeholder: "\u56FE\u4F8B\u683C\u5F0F",
        value: legendFormat,
        onChange: this.onLegendChange,
        onBlur: this.onRunQuery
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
        width: 7,
        tooltip: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, "Prometheus\u67E5\u8BE2\u7684step\u53C2\u6570\u548C", '', "\u7684\u9644\u52A0\u4E0B\u9650", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("code", null, "$__interval"), " \u548C ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("code", null, "$__rate_interval"), " \u53D8\u91CF\u3002 \u8BE5\u9650\u5236\u662F\u7EDD\u5BF9\u7684\uFF0C\u4E0D\u80FD\u901A\u8FC7\u201C\u5206\u8FA8\u7387\u201D\u8BBE\u7F6E\u8FDB\u884C\u4FEE\u6539\u3002")
      }, "\u6700\u5C0F\u6B65\u957F"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
        type: "text",
        className: "gf-form-input width-8",
        placeholder: interval,
        onChange: this.onIntervalChange,
        onBlur: this.onRunQuery,
        value: interval
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "gf-form-label"
      }, "\u89E3\u6790\u5EA6"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], {
        isSearchable: false,
        menuPlacement: "bottom",
        options: INTERVAL_FACTOR_OPTIONS,
        onChange: this.onIntervalFactorChange,
        value: intervalFactorOption
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "gf-form-label width-7"
      }, "\u683C\u5F0F"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], {
        width: 16,
        isSearchable: false,
        options: FORMAT_OPTIONS,
        onChange: this.onFormatChange,
        value: formatOption
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Switch, {
        label: "\u77AC\u95F4",
        checked: instant,
        onChange: this.onInstantChange
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
        width: 10,
        tooltip: "\u94FE\u63A5\u5230Prometheus\u4E2D\u7684\u56FE"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PromLink__WEBPACK_IMPORTED_MODULE_4__["default"], {
        datasource: datasource,
        query: this.query // Use modified query
        ,
        panelData: data
      })))));
    }
  }]);

  return PromQueryEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]);

/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/components/PromQueryField.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/components/PromQueryField.tsx ***!
  \********************************************************************************/
/*! exports provided: RECORDING_RULES_GROUP, groupMetricsByPrefix, willApplySuggestion, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECORDING_RULES_GROUP", function() { return RECORDING_RULES_GROUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupMetricsByPrefix", function() { return groupMetricsByPrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "willApplySuggestion", function() { return willApplySuggestion; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var app_core_utils_CancelablePromise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/utils/CancelablePromise */ "./public/app/core/utils/CancelablePromise.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }




 // dom also includes Element polyfills




var HISTOGRAM_GROUP = '__histograms__';
var PRISM_SYNTAX = 'promql';
var RECORDING_RULES_GROUP = '__recording_rules__';

function getChooserText(metricsLookupDisabled, hasSyntax, metrics) {
  if (metricsLookupDisabled) {
    return '(Disabled)';
  }

  if (!hasSyntax) {
    return '加载指标...';
  }

  if (metrics && metrics.length === 0) {
    return '(找不到指标)';
  }

  return 'Metrics';
}

function addMetricsMetadata(metric, metadata) {
  var option = {
    label: metric,
    value: metric
  };

  if (metadata && metadata[metric]) {
    var _metadata$metric$ = metadata[metric][0],
        _metadata$metric$$typ = _metadata$metric$.type,
        type = _metadata$metric$$typ === void 0 ? '' : _metadata$metric$$typ,
        help = _metadata$metric$.help;
    option.title = [metric, type.toUpperCase(), help].join('\n');
  }

  return option;
}

function groupMetricsByPrefix(metrics, metadata) {
  // Filter out recording rules and insert as first option
  var ruleRegex = /:\w+:/;
  var ruleNames = metrics.filter(function (metric) {
    return ruleRegex.test(metric);
  });
  var rulesOption = {
    label: '记录规则',
    value: RECORDING_RULES_GROUP,
    children: ruleNames.slice().sort().map(function (name) {
      return {
        label: name,
        value: name
      };
    })
  };
  var options = ruleNames.length > 0 ? [rulesOption] : [];
  var delimiter = '_';

  var metricsOptions = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.chain(metrics).filter(function (metric) {
    return !ruleRegex.test(metric);
  }).groupBy(function (metric) {
    return metric.split(delimiter)[0];
  }).map(function (metricsForPrefix, prefix) {
    var prefixIsMetric = metricsForPrefix.length === 1 && metricsForPrefix[0] === prefix;
    var children = prefixIsMetric ? [] : metricsForPrefix.sort().map(function (m) {
      return addMetricsMetadata(m, metadata);
    });
    return {
      children: children,
      label: prefix,
      value: prefix
    };
  }).sortBy('label').value();

  return [].concat(options, _toConsumableArray(metricsOptions));
}
function willApplySuggestion(suggestion, _ref) {
  var typeaheadContext = _ref.typeaheadContext,
      typeaheadText = _ref.typeaheadText;

  // Modify suggestion based on context
  switch (typeaheadContext) {
    case 'context-labels':
      {
        var nextChar = _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["DOMUtil"].getNextCharacter();

        if (!nextChar || nextChar === '}' || nextChar === ',') {
          suggestion += '=';
        }

        break;
      }

    case 'context-label-values':
      {
        // Always add quotes and remove existing ones instead
        if (!typeaheadText.match(/^(!?=~?"|")/)) {
          suggestion = "\"".concat(suggestion);
        }

        if (_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["DOMUtil"].getNextCharacter() !== '"') {
          suggestion = "".concat(suggestion, "\"");
        }

        break;
      }

    default:
  }

  return suggestion;
}

var PromQueryField =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(PromQueryField, _React$PureComponent);

  function PromQueryField(props, context) {
    var _this;

    _classCallCheck(this, PromQueryField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PromQueryField).call(this, props, context));

    _this.refreshHint = function () {
      var _this$props = _this.props,
          datasource = _this$props.datasource,
          query = _this$props.query,
          data = _this$props.data;

      if (!data || data.series.length === 0) {
        _this.setState({
          hint: null
        });

        return;
      }

      var result = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["isDataFrame"])(data.series[0]) ? data.series.map(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["toLegacyResponseData"]) : data.series;
      var hints = datasource.getQueryHints(query, result);
      var hint = hints.length > 0 ? hints[0] : null;

      _this.setState({
        hint: hint
      });
    };

    _this.refreshMetrics = function () {
      var languageProvider = _this.props.datasource.languageProvider;

      _this.setState({
        syntaxLoaded: false
      });

      prismjs__WEBPACK_IMPORTED_MODULE_3___default.a.languages[PRISM_SYNTAX] = languageProvider.syntax;
      _this.languageProviderInitializationPromise = Object(app_core_utils_CancelablePromise__WEBPACK_IMPORTED_MODULE_4__["makePromiseCancelable"])(languageProvider.start());

      _this.languageProviderInitializationPromise.promise.then(function (remaining) {
        remaining.map(function (task) {
          return task.then(_this.onUpdateLanguage).catch(function () {});
        });
      }).then(function () {
        return _this.onUpdateLanguage();
      }).catch(function (err) {
        if (!err.isCanceled) {
          throw err;
        }
      });
    };

    _this.onChangeMetrics = function (values, selectedOptions) {
      var query;

      if (selectedOptions.length === 1) {
        var selectedOption = selectedOptions[0];

        if (!selectedOption.children || selectedOption.children.length === 0) {
          query = selectedOption.value;
        } else {
          // Ignore click on group
          return;
        }
      } else {
        var prefix = selectedOptions[0].value;
        var metric = selectedOptions[1].value;

        if (prefix === HISTOGRAM_GROUP) {
          query = "histogram_quantile(0.95, sum(rate(".concat(metric, "[5m])) by (le))");
        } else {
          query = metric;
        }
      }

      _this.onChangeQuery(query, true);
    };

    _this.onChangeQuery = function (value, override) {
      // Send text change to parent
      var _this$props2 = _this.props,
          query = _this$props2.query,
          onChange = _this$props2.onChange,
          onRunQuery = _this$props2.onRunQuery;

      if (onChange) {
        var nextQuery = _objectSpread({}, query, {
          expr: value
        });

        onChange(nextQuery);

        if (override && onRunQuery) {
          onRunQuery();
        }
      }
    };

    _this.onClickHintFix = function () {
      var _this$props3 = _this.props,
          datasource = _this$props3.datasource,
          query = _this$props3.query,
          onChange = _this$props3.onChange,
          onRunQuery = _this$props3.onRunQuery;
      var hint = _this.state.hint;
      onChange(datasource.modifyQuery(query, hint.fix.action));
      onRunQuery();
    };

    _this.onUpdateLanguage = function () {
      var _this$props4 = _this.props,
          datasource = _this$props4.datasource,
          languageProvider = _this$props4.datasource.languageProvider;
      var histogramMetrics = languageProvider.histogramMetrics,
          metrics = languageProvider.metrics,
          metricsMetadata = languageProvider.metricsMetadata,
          lookupMetricsThreshold = languageProvider.lookupMetricsThreshold;

      if (!metrics) {
        return;
      } // Build metrics tree


      var metricsByPrefix = groupMetricsByPrefix(metrics, metricsMetadata);
      var histogramOptions = histogramMetrics.map(function (hm) {
        return {
          label: hm,
          value: hm
        };
      });
      var metricsOptions = histogramMetrics.length > 0 ? [{
        label: '直方图',
        value: HISTOGRAM_GROUP,
        children: histogramOptions,
        isLeaf: false
      }].concat(_toConsumableArray(metricsByPrefix)) : metricsByPrefix; // Hint for big disabled lookups

      var hint = null;

      if (!datasource.lookupsDisabled && languageProvider.lookupsDisabled) {
        hint = {
          label: "\u8D85\u8FC7".concat(lookupMetricsThreshold, "\u4E2A\u6307\u6807\u7684\u6570\u636E\u6E90\u5C06\u7981\u7528\u52A8\u6001\u6807\u7B7E\u67E5\u627E\u3002"),
          type: 'INFO'
        };
      }

      _this.setState({
        hint: hint,
        metricsOptions: metricsOptions,
        syntaxLoaded: true
      });
    };

    _this.onTypeahead =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(typeahead) {
        var languageProvider, history, prefix, text, value, wrapperClasses, labelKey, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                languageProvider = _this.props.datasource.languageProvider;

                if (languageProvider) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", {
                  suggestions: []
                });

              case 3:
                history = _this.props.history;
                prefix = typeahead.prefix, text = typeahead.text, value = typeahead.value, wrapperClasses = typeahead.wrapperClasses, labelKey = typeahead.labelKey;
                _context.next = 7;
                return languageProvider.provideCompletionItems({
                  text: text,
                  value: value,
                  prefix: prefix,
                  wrapperClasses: wrapperClasses,
                  labelKey: labelKey
                }, {
                  history: history
                });

              case 7:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.plugins = [Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["BracesPlugin"])(), Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["SlatePrism"])({
      onlyIn: function onlyIn(node) {
        return node.type === 'code_block';
      },
      getSyntax: function getSyntax(node) {
        return 'promql';
      }
    })];
    _this.state = {
      metricsOptions: [],
      syntaxLoaded: false,
      hint: null
    };
    return _this;
  }

  _createClass(PromQueryField, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.datasource.languageProvider) {
        this.refreshMetrics();
      }

      this.refreshHint();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.languageProviderInitializationPromise) {
        this.languageProviderInitializationPromise.cancel();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props5 = this.props,
          data = _this$props5.data,
          languageProvider = _this$props5.datasource.languageProvider;

      if (languageProvider !== prevProps.datasource.languageProvider) {
        this.refreshMetrics();
      }

      if (data && prevProps.data && prevProps.data.series !== data.series) {
        this.refreshHint();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          datasource = _this$props6.datasource,
          languageProvider = _this$props6.datasource.languageProvider,
          query = _this$props6.query,
          ExtraFieldElement = _this$props6.ExtraFieldElement;
      var _this$state = this.state,
          metricsOptions = _this$state.metricsOptions,
          syntaxLoaded = _this$state.syntaxLoaded,
          hint = _this$state.hint;
      var cleanText = languageProvider ? languageProvider.cleanText : undefined;
      var chooserText = getChooserText(datasource.lookupsDisabled, syntaxLoaded, metricsOptions);
      var buttonDisabled = !(syntaxLoaded && metricsOptions && metricsOptions.length > 0);
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "gf-form-inline gf-form-inline--xs-view-flex-column flex-grow-1"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "gf-form flex-shrink-0"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["ButtonCascader"], {
        options: metricsOptions,
        disabled: buttonDisabled,
        onChange: this.onChangeMetrics
      }, chooserText)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: 'gf-form gf-form--grow flex-shrink-1 min-width-15 explore-input-margin'
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["QueryField"], {
        additionalPlugins: this.plugins,
        cleanText: cleanText,
        query: query.expr,
        onTypeahead: this.onTypeahead,
        onWillApplySuggestion: willApplySuggestion,
        onBlur: this.props.onBlur,
        onChange: this.onChangeQuery,
        onRunQuery: this.props.onRunQuery,
        placeholder: "\u8F93\u5165PromQL\u67E5\u8BE2\uFF08\u4F7F\u7528Shift + Enter\u6267\u884C\uFF09",
        portalOrigin: "prometheus",
        syntaxLoaded: syntaxLoaded
      })), ExtraFieldElement), hint ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "query-row-break"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "prom-query-field-info text-warning"
      }, hint.label, ' ', hint.fix ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
        className: "text-link muted",
        onClick: this.onClickHintFix
      }, hint.fix.label) : null)) : null);
    }
  }]);

  return PromQueryField;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent);

/* harmony default export */ __webpack_exports__["default"] = (PromQueryField);

/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/configuration/ConfigEditor.tsx":
/*!*********************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/configuration/ConfigEditor.tsx ***!
  \*********************************************************************************/
/*! exports provided: ConfigEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _PromSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PromSettings */ "./public/app/plugins/datasource/prometheus/configuration/PromSettings.tsx");



var ConfigEditor = function ConfigEditor(props) {
  var options = props.options,
      onOptionsChange = props.onOptionsChange;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["DataSourceHttpSettings"], {
    defaultUrl: "http://localhost:9090",
    dataSourceConfig: options,
    showAccessOptions: true,
    onChange: onOptionsChange
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PromSettings__WEBPACK_IMPORTED_MODULE_2__["PromSettings"], {
    options: options,
    onOptionsChange: onOptionsChange
  }));
};

/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/configuration/PromSettings.tsx":
/*!*********************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/configuration/PromSettings.tsx ***!
  \*********************************************************************************/
/*! exports provided: PromSettings, promSettingsValidationEvents, getValueFromEventItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromSettings", function() { return PromSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "promSettingsValidationEvents", function() { return promSettingsValidationEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValueFromEventItem", function() { return getValueFromEventItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Select = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].Select,
    Input = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].Input,
    FormField = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].FormField,
    Switch = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].Switch;

var httpOptions = [{
  value: 'GET',
  label: 'GET'
}, {
  value: 'POST',
  label: 'POST'
}];
var PromSettings = function PromSettings(props) {
  var _options$jsonData$dis;

  var options = props.options,
      onOptionsChange = props.onOptionsChange;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-inline"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    label: "\u522E\u64E6\u95F4\u9694",
    labelWidth: 13,
    inputEl: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
      className: "width-6",
      value: options.jsonData.timeInterval,
      spellCheck: false,
      placeholder: "15s",
      onChange: onChangeHandler('timeInterval', options, onOptionsChange),
      validationEvents: promSettingsValidationEvents
    }),
    tooltip: "\u5C06\u6B64\u8BBE\u7F6E\u4E3APrometheus\u4E2D\u914D\u7F6E\u7684\u5178\u578B\u522E\u64E6\u548C\u8BC4\u4F30\u95F4\u9694\u3002 \u9ED8\u8BA4\u503C\u4E3A15\u79D2\u3002"
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-inline"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    label: "\u67E5\u8BE2\u8D85\u65F6",
    labelWidth: 13,
    inputEl: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
      className: "width-6",
      value: options.jsonData.queryTimeout,
      onChange: onChangeHandler('queryTimeout', options, onOptionsChange),
      spellCheck: false,
      placeholder: "60s",
      validationEvents: promSettingsValidationEvents
    }),
    tooltip: "\u8BBE\u7F6EPrometheus\u67E5\u8BE2\u8D85\u65F6\u3002"
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
    width: 13,
    tooltip: "\u6307\u5B9A\u7528\u4E8E\u67E5\u8BE2Prometheus\u7684HTTP\u65B9\u6CD5\u3002 \uFF08\u4EC5\u5728Prometheus> = v2.1.0\u4E2D\u53EF\u7528POST\uFF09"
  }, "HTTP\u65B9\u6CD5"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Select, {
    options: httpOptions,
    value: httpOptions.find(function (o) {
      return o.value === options.jsonData.httpMethod;
    }),
    onChange: onChangeHandler('httpMethod', options, onOptionsChange),
    width: 7
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "page-heading"
  }, "\u6742\u9879"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Switch, {
    checked: (_options$jsonData$dis = options.jsonData.disableMetricsLookup) !== null && _options$jsonData$dis !== void 0 ? _options$jsonData$dis : false,
    label: "\u7981\u7528\u6307\u6807\u67E5\u8BE2",
    labelClass: "width-14",
    onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceJsonDataOptionChecked"])(props, 'disableMetricsLookup'),
    tooltip: "\u9009\u4E2D\u6B64\u9009\u9879\u5C06\u5728\u67E5\u8BE2\u5B57\u6BB5\u7684\u81EA\u52A8\u5B8C\u6210\u529F\u80FD\u4E2D\u7981\u7528\u6307\u6807\u9009\u62E9\u5668\u548C\u6307\u6807/\u6807\u7B7E\u652F\u6301\u3002 \u5982\u679C\u8F83\u5927\u7684Prometheus\u5B9E\u4F8B\u9047\u5230\u6027\u80FD\u95EE\u9898\uFF0C\u8FD9\u4F1A\u6709\u6240\u5E2E\u52A9\u3002"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-inline"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form max-width-30"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    label: "\u81EA\u5B9A\u4E49\u67E5\u8BE2\u53C2\u6570",
    labelWidth: 14,
    tooltip: "\u5C06\u81EA\u5B9A\u4E49\u53C2\u6570\u6DFB\u52A0\u5230Prometheus\u6216Thanos\u67E5\u8BE2\u3002",
    inputEl: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
      className: "width-25",
      value: options.jsonData.customQueryParameters,
      onChange: onChangeHandler('customQueryParameters', options, onOptionsChange),
      spellCheck: false,
      placeholder: "\u4F8B: max_source_resolution=5m&timeout=10"
    })
  })))));
};
var promSettingsValidationEvents = _defineProperty({}, _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["EventsWithValidation"].onBlur, [Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["regexValidation"])(/^$|^\d+(ms|[Mwdhmsy])$/, '值无效，您可以将数字与时间单位说明符一起使用: y, M, w, d, h, m, s')]);
var getValueFromEventItem = function getValueFromEventItem(eventItem) {
  if (!eventItem) {
    return '';
  }

  if (eventItem.hasOwnProperty('currentTarget')) {
    return eventItem.currentTarget.value;
  }

  return eventItem.value;
};

var onChangeHandler = function onChangeHandler(key, options, onOptionsChange) {
  return function (eventItem) {
    onOptionsChange(_objectSpread({}, options, {
      jsonData: _objectSpread({}, options.jsonData, _defineProperty({}, key, getValueFromEventItem(eventItem)))
    }));
  };
};

/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/datasource.ts":
/*!****************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/datasource.ts ***!
  \****************************************************************/
/*! exports provided: ANNOTATION_QUERY_STEP_DEFAULT, PrometheusDatasource, alignRange, extractRuleMappingFromGroups, prometheusRegularEscape, prometheusSpecialRegexEscape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ANNOTATION_QUERY_STEP_DEFAULT", function() { return ANNOTATION_QUERY_STEP_DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrometheusDatasource", function() { return PrometheusDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alignRange", function() { return alignRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractRuleMappingFromGroups", function() { return extractRuleMappingFromGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prometheusRegularEscape", function() { return prometheusRegularEscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prometheusSpecialRegexEscape", function() { return prometheusSpecialRegexEscape; });
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _metric_find_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./metric_find_query */ "./public/app/plugins/datasource/prometheus/metric_find_query.ts");
/* harmony import */ var _result_transformer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./result_transformer */ "./public/app/plugins/datasource/prometheus/result_transformer.ts");
/* harmony import */ var _language_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./language_provider */ "./public/app/plugins/datasource/prometheus/language_provider.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _add_label_to_query__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./add_label_to_query */ "./public/app/plugins/datasource/prometheus/add_label_to_query.ts");
/* harmony import */ var _query_hints__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./query_hints */ "./public/app/plugins/datasource/prometheus/query_hints.ts");
/* harmony import */ var _language_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./language_utils */ "./public/app/plugins/datasource/prometheus/language_utils.ts");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/features/templating/template_srv */ "./public/app/features/templating/template_srv.ts");
/* harmony import */ var app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/features/dashboard/services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_14__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Libraries
 // Services & Utils










 // Types





var ANNOTATION_QUERY_STEP_DEFAULT = '60s';
var PrometheusDatasource =
/*#__PURE__*/
function (_DataSourceApi) {
  _inherits(PrometheusDatasource, _DataSourceApi);

  function PrometheusDatasource(instanceSettings) {
    var _instanceSettings$jso;

    var _this;

    _classCallCheck(this, PrometheusDatasource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PrometheusDatasource).call(this, instanceSettings));

    _this.init = function () {
      _this.loadRules();
    };

    _this.processResult = function (response, query, target, responseListLength, scopedVars) {
      // Keeping original start/end for transformers
      var transformerOptions = {
        format: target.format,
        step: query.step,
        legendFormat: target.legendFormat,
        start: query.start,
        end: query.end,
        query: query.expr,
        responseListLength: responseListLength,
        scopedVars: scopedVars,
        refId: target.refId,
        valueWithRefId: target.valueWithRefId,
        meta: {
          /** Fix for showing of Prometheus results in Explore table. We want to show result of instant query in table and the rest of time series in graph */
          preferredVisualisationType: query.instant ? 'table' : 'graph'
        }
      };

      var series = _this.resultTransformer.transform(response, transformerOptions);

      return series;
    };

    _this.prepareTargets = function (options, start, end) {
      var queries = [];
      var activeTargets = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = options.targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var target = _step.value;

          if (!target.expr || target.hide) {
            continue;
          }

          target.requestId = options.panelId + target.refId;

          if (options.app !== _grafana_data__WEBPACK_IMPORTED_MODULE_1__["CoreApp"].Explore) {
            activeTargets.push(target);
            queries.push(_this.createQuery(target, options, start, end));
            continue;
          }

          if (options.showingTable) {
            // create instant target only if Table is showed in Explore
            var instantTarget = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_0___default()(target);
            instantTarget.format = 'table';
            instantTarget.instant = true;
            instantTarget.valueWithRefId = true;
            delete instantTarget.maxDataPoints;
            instantTarget.requestId += '_instant';
            activeTargets.push(instantTarget);
            queries.push(_this.createQuery(instantTarget, options, start, end));
          }

          if (options.showingGraph) {
            // create time series target only if Graph is showed in Explore
            target.format = 'time_series';
            target.instant = false;
            activeTargets.push(target);
            queries.push(_this.createQuery(target, options, start, end));
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

      return {
        queries: queries,
        activeTargets: activeTargets
      };
    };

    _this.handleErrors = function (err, target) {
      var error = {
        message: err && err.statusText || 'Unknown error during query transaction. Please check JS console logs.',
        refId: target.refId
      };

      if (err.data) {
        if (typeof err.data === 'string') {
          error.message = err.data;
        } else if (err.data.error) {
          error.message = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_11__["safeStringifyValue"])(err.data.error);
        }
      } else if (err.message) {
        error.message = err.message;
      } else if (typeof err === 'string') {
        error.message = err;
      }

      error.status = err.status;
      error.statusText = err.statusText;
      return error;
    };

    _this.createAnnotationQueryOptions = function (options) {
      var annotation = options.annotation;
      var interval = annotation && annotation.step && typeof annotation.step === 'string' ? annotation.step : ANNOTATION_QUERY_STEP_DEFAULT;
      return _objectSpread({}, options, {
        interval: interval
      });
    };

    _this.type = 'prometheus';
    _this.editorSrc = 'app/features/prometheus/partials/query.editor.html';
    _this.url = instanceSettings.url;
    _this.basicAuth = instanceSettings.basicAuth;
    _this.withCredentials = instanceSettings.withCredentials;
    _this.interval = instanceSettings.jsonData.timeInterval || '15s';
    _this.queryTimeout = instanceSettings.jsonData.queryTimeout;
    _this.httpMethod = instanceSettings.jsonData.httpMethod || 'GET';
    _this.directUrl = instanceSettings.jsonData.directUrl;
    _this.resultTransformer = new _result_transformer__WEBPACK_IMPORTED_MODULE_5__["ResultTransformer"](app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_12__["default"]);
    _this.ruleMappings = {};
    _this.languageProvider = new _language_provider__WEBPACK_IMPORTED_MODULE_6__["default"](_assertThisInitialized(_this));
    _this.lookupsDisabled = (_instanceSettings$jso = instanceSettings.jsonData.disableMetricsLookup) !== null && _instanceSettings$jso !== void 0 ? _instanceSettings$jso : false;
    _this.customQueryParameters = new URLSearchParams(instanceSettings.jsonData.customQueryParameters);
    return _this;
  }

  _createClass(PrometheusDatasource, [{
    key: "getQueryDisplayText",
    value: function getQueryDisplayText(query) {
      return query.expr;
    }
  }, {
    key: "_addTracingHeaders",
    value: function _addTracingHeaders(httpOptions, options) {
      httpOptions.headers = {};
      var proxyMode = !this.url.match(/^http/);

      if (proxyMode) {
        httpOptions.headers['X-Dashboard-Id'] = options.dashboardId;
        httpOptions.headers['X-Panel-Id'] = options.panelId;
      }
    }
  }, {
    key: "_request",
    value: function _request(url, data) {
      var overrides = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var options = Object(lodash__WEBPACK_IMPORTED_MODULE_14__["defaults"])(overrides, {
        url: this.url + url,
        method: this.httpMethod,
        headers: {}
      });

      if (options.method === 'GET') {
        if (data && Object.keys(data).length) {
          options.url = options.url + '?' + Object.entries(data).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                k = _ref2[0],
                v = _ref2[1];

            return "".concat(encodeURIComponent(k), "=").concat(encodeURIComponent(v));
          }).join('&');
        }
      } else {
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        options.data = data;
      }

      if (this.basicAuth || this.withCredentials) {
        options.withCredentials = true;
      }

      if (this.basicAuth) {
        options.headers.Authorization = this.basicAuth;
      }

      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_7__["getBackendSrv"])().fetch(options);
    } // Use this for tab completion features, wont publish response to other components

  }, {
    key: "metadataRequest",
    value: function metadataRequest(url) {
      return this._request(url, null, {
        method: 'GET',
        hideFromInspector: true
      }).toPromise(); // toPromise until we change getTagValues, getTagKeys to Observable
    }
  }, {
    key: "interpolateQueryExpr",
    value: function interpolateQueryExpr() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var variable = arguments.length > 1 ? arguments[1] : undefined;

      // if no multi or include all do not regexEscape
      if (!variable.multi && !variable.includeAll) {
        return prometheusRegularEscape(value);
      }

      if (typeof value === 'string') {
        return prometheusSpecialRegexEscape(value);
      }

      var escapedValues = value.map(function (val) {
        return prometheusSpecialRegexEscape(val);
      });

      if (escapedValues.length === 1) {
        return escapedValues[0];
      }

      return '(' + escapedValues.join('|') + ')';
    }
  }, {
    key: "targetContainsTemplate",
    value: function targetContainsTemplate(target) {
      return app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_12__["default"].variableExists(target.expr);
    }
  }, {
    key: "query",
    value: function query(options) {
      var start = this.getPrometheusTime(options.range.from, false);
      var end = this.getPrometheusTime(options.range.to, true);

      var _this$prepareTargets = this.prepareTargets(options, start, end),
          queries = _this$prepareTargets.queries,
          activeTargets = _this$prepareTargets.activeTargets; // No valid targets, return the empty result to save a round trip.


      if (!queries || !queries.length) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({
          data: [],
          state: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["LoadingState"].Done
        });
      }

      if (options.app === _grafana_data__WEBPACK_IMPORTED_MODULE_1__["CoreApp"].Explore) {
        return this.exploreQuery(queries, activeTargets, end);
      }

      return this.panelsQuery(queries, activeTargets, end, options.requestId, options.scopedVars);
    }
  }, {
    key: "exploreQuery",
    value: function exploreQuery(queries, activeTargets, end) {
      var _this2 = this;

      var runningQueriesCount = queries.length;
      var subQueries = queries.map(function (query, index) {
        var target = activeTargets[index];
        var observable = query.instant ? _this2.performInstantQuery(query, end) : _this2.performTimeSeriesQuery(query, query.start, query.end);
        return observable.pipe( // Decrease the counter here. We assume that each request returns only single value and then completes
        // (should hold until there is some streaming requests involved).
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function () {
          return runningQueriesCount--;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (response) {
          return response.cancelled ? false : true;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
          var data = _this2.processResult(response, query, target, queries.length);

          return {
            data: data,
            key: query.requestId,
            state: runningQueriesCount === 0 ? _grafana_data__WEBPACK_IMPORTED_MODULE_1__["LoadingState"].Done : _grafana_data__WEBPACK_IMPORTED_MODULE_1__["LoadingState"].Loading
          };
        }));
      });
      return rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"].apply(void 0, _toConsumableArray(subQueries));
    }
  }, {
    key: "panelsQuery",
    value: function panelsQuery(queries, activeTargets, end, requestId, scopedVars) {
      var _this3 = this;

      var observables = queries.map(function (query, index) {
        var target = activeTargets[index];
        var observable = query.instant ? _this3.performInstantQuery(query, end) : _this3.performTimeSeriesQuery(query, query.start, query.end);
        return observable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (response) {
          return response.cancelled ? false : true;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
          var data = _this3.processResult(response, query, target, queries.length, scopedVars);

          return data;
        }));
      });
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["forkJoin"])(observables).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (results) {
        var data = results.reduce(function (result, current) {
          return [].concat(_toConsumableArray(result), _toConsumableArray(current));
        }, []);
        return {
          data: data,
          key: requestId,
          state: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["LoadingState"].Done
        };
      }));
    }
  }, {
    key: "createQuery",
    value: function createQuery(target, options, start, end) {
      var query = {
        hinting: target.hinting,
        instant: target.instant,
        step: 0,
        expr: '',
        requestId: target.requestId,
        refId: target.refId,
        start: 0,
        end: 0
      };
      var range = Math.ceil(end - start); // options.interval is the dynamically calculated interval

      var interval = _grafana_data__WEBPACK_IMPORTED_MODULE_1__["rangeUtil"].intervalToSeconds(options.interval); // Minimum interval ("Min step"), if specified for the query, or same as interval otherwise.

      var minInterval = _grafana_data__WEBPACK_IMPORTED_MODULE_1__["rangeUtil"].intervalToSeconds(app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_12__["default"].replace(target.interval || options.interval, options.scopedVars)); // Scrape interval as specified for the query ("Min step") or otherwise taken from the datasource.
      // Min step field can have template variables in it, make sure to replace it.

      var scrapeInterval = target.interval ? _grafana_data__WEBPACK_IMPORTED_MODULE_1__["rangeUtil"].intervalToSeconds(app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_12__["default"].replace(target.interval, options.scopedVars)) : _grafana_data__WEBPACK_IMPORTED_MODULE_1__["rangeUtil"].intervalToSeconds(this.interval);
      var intervalFactor = target.intervalFactor || 1; // Adjust the interval to take into account any specified minimum and interval factor plus Prometheus limits

      var adjustedInterval = this.adjustInterval(interval, minInterval, range, intervalFactor);

      var scopedVars = _objectSpread({}, options.scopedVars, {}, this.getRangeScopedVars(options.range), {}, this.getRateIntervalScopedVariable(adjustedInterval, scrapeInterval)); // If the interval was adjusted, make a shallow copy of scopedVars with updated interval vars


      if (interval !== adjustedInterval) {
        interval = adjustedInterval;
        scopedVars = Object.assign({}, options.scopedVars, _objectSpread({
          __interval: {
            text: interval + 's',
            value: interval + 's'
          },
          __interval_ms: {
            text: interval * 1000,
            value: interval * 1000
          }
        }, this.getRateIntervalScopedVariable(interval, scrapeInterval), {}, this.getRangeScopedVars(options.range)));
      }

      query.step = interval;
      var expr = target.expr; // Apply adhoc filters

      var adhocFilters = app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_12__["default"].getAdhocFilters(this.name);
      expr = adhocFilters.reduce(function (acc, filter) {
        var key = filter.key,
            operator = filter.operator;
        var value = filter.value;

        if (operator === '=~' || operator === '!~') {
          value = prometheusRegularEscape(value);
        }

        return Object(_add_label_to_query__WEBPACK_IMPORTED_MODULE_8__["default"])(acc, key, value, operator);
      }, expr); // Only replace vars in expression after having (possibly) updated interval vars

      query.expr = app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_12__["default"].replace(expr, scopedVars, this.interpolateQueryExpr); // Align query interval with step to allow query caching and to ensure
      // that about-same-time query results look the same.

      var adjusted = alignRange(start, end, query.step, Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_13__["getTimeSrv"])().timeRange().to.utcOffset() * 60);
      query.start = adjusted.start;
      query.end = adjusted.end;

      this._addTracingHeaders(query, options);

      return query;
    }
  }, {
    key: "getRateIntervalScopedVariable",
    value: function getRateIntervalScopedVariable(interval, scrapeInterval) {
      // Fall back to the default scrape interval of 15s if scrapeInterval is 0 for some reason.
      if (scrapeInterval === 0) {
        scrapeInterval = 15;
      }

      var rateInterval = Math.max(interval + scrapeInterval, 4 * scrapeInterval);
      return {
        __rate_interval: {
          text: rateInterval + 's',
          value: rateInterval + 's'
        }
      };
    }
  }, {
    key: "adjustInterval",
    value: function adjustInterval(interval, minInterval, range, intervalFactor) {
      // Prometheus will drop queries that might return more than 11000 data points.
      // Calculate a safe interval as an additional minimum to take into account.
      // Fractional safeIntervals are allowed, however serve little purpose if the interval is greater than 1
      // If this is the case take the ceil of the value.
      var safeInterval = range / 11000;

      if (safeInterval > 1) {
        safeInterval = Math.ceil(safeInterval);
      }

      return Math.max(interval * intervalFactor, minInterval, safeInterval);
    }
  }, {
    key: "performTimeSeriesQuery",
    value: function performTimeSeriesQuery(query, start, end) {
      var _this4 = this;

      if (start > end) {
        throw {
          message: 'Invalid time range'
        };
      }

      var url = '/api/v1/query_range';
      var data = {
        query: query.expr,
        start: start,
        end: end,
        step: query.step
      };

      if (this.queryTimeout) {
        data['timeout'] = this.queryTimeout;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.customQueryParameters[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              _key = _step2$value[0],
              value = _step2$value[1];

          if (data[_key] == null) {
            data[_key] = value;
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

      return this._request(url, data, {
        requestId: query.requestId,
        headers: query.headers
      }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) {
        if (err.cancelled) {
          return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(err);
        }

        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(_this4.handleErrors(err, query));
      }));
    }
  }, {
    key: "performInstantQuery",
    value: function performInstantQuery(query, time) {
      var _this5 = this;

      var url = '/api/v1/query';
      var data = {
        query: query.expr,
        time: time
      };

      if (this.queryTimeout) {
        data['timeout'] = this.queryTimeout;
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.customQueryParameters[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2),
              _key2 = _step3$value[0],
              value = _step3$value[1];

          if (data[_key2] == null) {
            data[_key2] = value;
          }
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

      return this._request(url, data, {
        requestId: query.requestId,
        headers: query.headers
      }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) {
        if (err.cancelled) {
          return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(err);
        }

        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(_this5.handleErrors(err, query));
      }));
    }
  }, {
    key: "performSuggestQuery",
    value: function () {
      var _performSuggestQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(query) {
        var _this$metricsNameCach;

        var cache,
            response,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cache = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;

                if (!(cache && ((_this$metricsNameCach = this.metricsNameCache) === null || _this$metricsNameCach === void 0 ? void 0 : _this$metricsNameCach.expire) > Date.now())) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", this.metricsNameCache.data.filter(function (metricName) {
                  return metricName.indexOf(query) !== 1;
                }));

              case 3:
                _context.next = 5;
                return this.metadataRequest('/api/v1/label/__name__/values');

              case 5:
                response = _context.sent;
                this.metricsNameCache = {
                  data: response.data.data,
                  expire: Date.now() + 60 * 1000
                };
                return _context.abrupt("return", response.data.data.filter(function (metricName) {
                  return metricName.indexOf(query) !== 1;
                }));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function performSuggestQuery(_x) {
        return _performSuggestQuery.apply(this, arguments);
      }

      return performSuggestQuery;
    }()
  }, {
    key: "metricFindQuery",
    value: function metricFindQuery(query) {
      if (!query) {
        return Promise.resolve([]);
      }

      var scopedVars = _objectSpread({
        __interval: {
          text: this.interval,
          value: this.interval
        },
        __interval_ms: {
          text: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["rangeUtil"].intervalToMs(this.interval),
          value: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["rangeUtil"].intervalToMs(this.interval)
        }
      }, this.getRangeScopedVars(Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_13__["getTimeSrv"])().timeRange()));

      var interpolated = app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_12__["default"].replace(query, scopedVars, this.interpolateQueryExpr);
      var metricFindQuery = new _metric_find_query__WEBPACK_IMPORTED_MODULE_4__["default"](this, interpolated);
      return metricFindQuery.process();
    }
  }, {
    key: "getRangeScopedVars",
    value: function getRangeScopedVars() {
      var range = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_13__["getTimeSrv"])().timeRange();
      var msRange = range.to.diff(range.from);
      var sRange = Math.round(msRange / 1000);
      return {
        __range_ms: {
          text: msRange,
          value: msRange
        },
        __range_s: {
          text: sRange,
          value: sRange
        },
        __range: {
          text: sRange + 's',
          value: sRange + 's'
        }
      };
    }
  }, {
    key: "annotationQuery",
    value: function () {
      var _annotationQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(options) {
        var _query$step, _response$data, _response$data$data, _response$data$data$r;

        var annotation, _annotation$expr, expr, _annotation$tagKeys, tagKeys, _annotation$titleForm, titleFormat, _annotation$textForma, textFormat, start, end, queryOptions, minStep, queryModel, query, self, response, eventList, splitKeys, step;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                annotation = options.annotation;
                _annotation$expr = annotation.expr, expr = _annotation$expr === void 0 ? '' : _annotation$expr, _annotation$tagKeys = annotation.tagKeys, tagKeys = _annotation$tagKeys === void 0 ? '' : _annotation$tagKeys, _annotation$titleForm = annotation.titleFormat, titleFormat = _annotation$titleForm === void 0 ? '' : _annotation$titleForm, _annotation$textForma = annotation.textFormat, textFormat = _annotation$textForma === void 0 ? '' : _annotation$textForma;

                if (expr) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", Promise.resolve([]));

              case 4:
                start = this.getPrometheusTime(options.range.from, false);
                end = this.getPrometheusTime(options.range.to, true);
                queryOptions = this.createAnnotationQueryOptions(options); // Unsetting min interval for accurate event resolution

                minStep = '1s';
                queryModel = {
                  expr: expr,
                  interval: minStep,
                  refId: 'X',
                  requestId: "prom-query-".concat(annotation.name)
                };
                query = this.createQuery(queryModel, queryOptions, start, end);
                self = this;
                _context2.next = 13;
                return this.performTimeSeriesQuery(query, query.start, query.end).toPromise();

              case 13:
                response = _context2.sent;
                eventList = [];
                splitKeys = tagKeys.split(',');

                if (!response.cancelled) {
                  _context2.next = 18;
                  break;
                }

                return _context2.abrupt("return", []);

              case 18:
                step = Math.floor((_query$step = query.step) !== null && _query$step !== void 0 ? _query$step : 15) * 1000;
                response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : (_response$data$data = _response$data.data) === null || _response$data$data === void 0 ? void 0 : (_response$data$data$r = _response$data$data.result) === null || _response$data$data$r === void 0 ? void 0 : _response$data$data$r.forEach(function (series) {
                  var tags = Object.entries(series.metric).filter(function (_ref3) {
                    var _ref4 = _slicedToArray(_ref3, 1),
                        k = _ref4[0];

                    return splitKeys.includes(k);
                  }).map(function (_ref5) {
                    var _ref6 = _slicedToArray(_ref5, 2),
                        _k = _ref6[0],
                        v = _ref6[1];

                    return v;
                  });
                  series.values.forEach(function (value) {
                    var timestampValue; // rewrite timeseries to a common format

                    if (annotation.useValueForTime) {
                      timestampValue = Math.floor(parseFloat(value[1]));
                      value[1] = 1;
                    } else {
                      timestampValue = Math.floor(parseFloat(value[0])) * 1000;
                    }

                    value[0] = timestampValue;
                  });
                  var activeValues = series.values.filter(function (value) {
                    return parseFloat(value[1]) >= 1;
                  });
                  var activeValuesTimestamps = activeValues.map(function (value) {
                    return value[0];
                  }); // Instead of creating singular annotation for each active event we group events into region if they are less
                  // then `step` apart.

                  var latestEvent = null;
                  var _iteratorNormalCompletion4 = true;
                  var _didIteratorError4 = false;
                  var _iteratorError4 = undefined;

                  try {
                    for (var _iterator4 = activeValuesTimestamps[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                      var _latestEvent$timeEnd;

                      var timestamp = _step4.value;

                      // We already have event `open` and we have new event that is inside the `step` so we just update the end.
                      if (latestEvent && ((_latestEvent$timeEnd = latestEvent.timeEnd) !== null && _latestEvent$timeEnd !== void 0 ? _latestEvent$timeEnd : 0) + step >= timestamp) {
                        latestEvent.timeEnd = timestamp;
                        continue;
                      } // Event exists but new one is outside of the `step` so we "finish" the current region.


                      if (latestEvent) {
                        eventList.push(latestEvent);
                      } // We start a new region.


                      latestEvent = {
                        time: timestamp,
                        timeEnd: timestamp,
                        annotation: annotation,
                        title: self.resultTransformer.renderTemplate(titleFormat, series.metric),
                        tags: tags,
                        text: self.resultTransformer.renderTemplate(textFormat, series.metric)
                      };
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

                  if (latestEvent) {
                    // finish up last point if we have one
                    latestEvent.timeEnd = activeValuesTimestamps[activeValuesTimestamps.length - 1];
                    eventList.push(latestEvent);
                  }
                });
                return _context2.abrupt("return", eventList);

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function annotationQuery(_x2) {
        return _annotationQuery.apply(this, arguments);
      }

      return annotationQuery;
    }()
  }, {
    key: "getTagKeys",
    value: function () {
      var _getTagKeys = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var _ref7, _result$data, _result$data$data;

        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.metadataRequest('/api/v1/labels');

              case 2:
                result = _context3.sent;
                return _context3.abrupt("return", (_ref7 = result === null || result === void 0 ? void 0 : (_result$data = result.data) === null || _result$data === void 0 ? void 0 : (_result$data$data = _result$data.data) === null || _result$data$data === void 0 ? void 0 : _result$data$data.map(function (value) {
                  return {
                    text: value
                  };
                })) !== null && _ref7 !== void 0 ? _ref7 : []);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getTagKeys() {
        return _getTagKeys.apply(this, arguments);
      }

      return getTagKeys;
    }()
  }, {
    key: "getTagValues",
    value: function () {
      var _getTagValues = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var _ref8, _result$data2, _result$data2$data;

        var options,
            result,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
                _context4.next = 3;
                return this.metadataRequest("/api/v1/label/".concat(options.key, "/values"));

              case 3:
                result = _context4.sent;
                return _context4.abrupt("return", (_ref8 = result === null || result === void 0 ? void 0 : (_result$data2 = result.data) === null || _result$data2 === void 0 ? void 0 : (_result$data2$data = _result$data2.data) === null || _result$data2$data === void 0 ? void 0 : _result$data2$data.map(function (value) {
                  return {
                    text: value
                  };
                })) !== null && _ref8 !== void 0 ? _ref8 : []);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getTagValues() {
        return _getTagValues.apply(this, arguments);
      }

      return getTagValues;
    }()
  }, {
    key: "testDatasource",
    value: function () {
      var _testDatasource = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var now, query, response;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                now = new Date().getTime();
                query = {
                  expr: '1+1'
                };
                _context5.next = 4;
                return this.performInstantQuery(query, now / 1000).toPromise();

              case 4:
                response = _context5.sent;
                return _context5.abrupt("return", response.data.status === 'success' ? {
                  status: 'success',
                  message: '数据源工作正常'
                } : {
                  status: 'error',
                  message: response.error
                });

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function testDatasource() {
        return _testDatasource.apply(this, arguments);
      }

      return testDatasource;
    }()
  }, {
    key: "interpolateVariablesInQueries",
    value: function interpolateVariablesInQueries(queries, scopedVars) {
      var _this6 = this;

      var expandedQueries = queries;

      if (queries && queries.length) {
        expandedQueries = queries.map(function (query) {
          var expandedQuery = _objectSpread({}, query, {
            datasource: _this6.name,
            expr: app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_12__["default"].replace(query.expr, scopedVars, _this6.interpolateQueryExpr)
          });

          return expandedQuery;
        });
      }

      return expandedQueries;
    }
  }, {
    key: "getQueryHints",
    value: function getQueryHints(query, result) {
      var _query$expr;

      return Object(_query_hints__WEBPACK_IMPORTED_MODULE_9__["getQueryHints"])((_query$expr = query.expr) !== null && _query$expr !== void 0 ? _query$expr : '', result, this);
    }
  }, {
    key: "loadRules",
    value: function () {
      var _loadRules = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var _res$data, _res$data$data, res, groups;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this.metadataRequest('/api/v1/rules');

              case 3:
                res = _context6.sent;
                groups = (_res$data = res.data) === null || _res$data === void 0 ? void 0 : (_res$data$data = _res$data.data) === null || _res$data$data === void 0 ? void 0 : _res$data$data.groups;

                if (groups) {
                  this.ruleMappings = extractRuleMappingFromGroups(groups);
                }

                _context6.next = 12;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](0);
                console.log('Rules API is experimental. Ignore next error.');
                console.error(_context6.t0);

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 8]]);
      }));

      function loadRules() {
        return _loadRules.apply(this, arguments);
      }

      return loadRules;
    }()
  }, {
    key: "modifyQuery",
    value: function modifyQuery(query, action) {
      var _query$expr2;

      var expression = (_query$expr2 = query.expr) !== null && _query$expr2 !== void 0 ? _query$expr2 : '';

      switch (action.type) {
        case 'ADD_FILTER':
          {
            expression = Object(_add_label_to_query__WEBPACK_IMPORTED_MODULE_8__["default"])(expression, action.key, action.value);
            break;
          }

        case 'ADD_FILTER_OUT':
          {
            expression = Object(_add_label_to_query__WEBPACK_IMPORTED_MODULE_8__["default"])(expression, action.key, action.value, '!=');
            break;
          }

        case 'ADD_HISTOGRAM_QUANTILE':
          {
            expression = "histogram_quantile(0.95, sum(rate(".concat(expression, "[5m])) by (le))");
            break;
          }

        case 'ADD_RATE':
          {
            expression = "rate(".concat(expression, "[5m])");
            break;
          }

        case 'ADD_SUM':
          {
            expression = "sum(".concat(expression.trim(), ") by ($1)");
            break;
          }

        case 'EXPAND_RULES':
          {
            if (action.mapping) {
              expression = Object(_language_utils__WEBPACK_IMPORTED_MODULE_10__["expandRecordingRules"])(expression, action.mapping);
            }

            break;
          }

        default:
          break;
      }

      return _objectSpread({}, query, {
        expr: expression
      });
    }
  }, {
    key: "getPrometheusTime",
    value: function getPrometheusTime(date, roundUp) {
      if (typeof date === 'string') {
        date = _grafana_data__WEBPACK_IMPORTED_MODULE_1__["dateMath"].parse(date, roundUp);
      }

      return Math.ceil(date.valueOf() / 1000);
    }
  }, {
    key: "getTimeRange",
    value: function getTimeRange() {
      var range = Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_13__["getTimeSrv"])().timeRange();
      return {
        start: this.getPrometheusTime(range.from, false),
        end: this.getPrometheusTime(range.to, true)
      };
    }
  }, {
    key: "getOriginalMetricName",
    value: function getOriginalMetricName(labelData) {
      return this.resultTransformer.getOriginalMetricName(labelData);
    }
  }]);

  return PrometheusDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataSourceApi"]);
/**
 * Align query range to step.
 * Rounds start and end down to a multiple of step.
 * @param start Timestamp marking the beginning of the range.
 * @param end Timestamp marking the end of the range.
 * @param step Interval to align start and end with.
 * @param utcOffsetSec Number of seconds current timezone is offset from UTC
 */

function alignRange(start, end, step, utcOffsetSec) {
  var alignedEnd = Math.floor((end + utcOffsetSec) / step) * step - utcOffsetSec;
  var alignedStart = Math.floor((start + utcOffsetSec) / step) * step - utcOffsetSec;
  return {
    end: alignedEnd,
    start: alignedStart
  };
}
function extractRuleMappingFromGroups(groups) {
  return groups.reduce(function (mapping, group) {
    return group.rules.filter(function (rule) {
      return rule.type === 'recording';
    }).reduce(function (acc, rule) {
      return _objectSpread({}, acc, _defineProperty({}, rule.name, rule.query));
    }, mapping);
  }, {});
}
function prometheusRegularEscape(value) {
  return typeof value === 'string' ? value.replace(/\\/g, '\\\\').replace(/'/g, "\\\\'") : value;
}
function prometheusSpecialRegexEscape(value) {
  return typeof value === 'string' ? value.replace(/\\/g, '\\\\\\\\').replace(/[$^*{}\[\]\'+?.()|]/g, '\\\\$&') : value;
}

/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/language_provider.ts":
/*!***********************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/language_provider.ts ***!
  \***********************************************************************/
/*! exports provided: DEFAULT_LOOKUP_METRICS_THRESHOLD, addHistoryMetadata, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LOOKUP_METRICS_THRESHOLD", function() { return DEFAULT_LOOKUP_METRICS_THRESHOLD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addHistoryMetadata", function() { return addHistoryMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PromQlLanguageProvider; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lru_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lru-cache */ "./node_modules/lru-cache/index.js");
/* harmony import */ var lru_cache__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lru_cache__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _language_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./language_utils */ "./public/app/plugins/datasource/prometheus/language_utils.ts");
/* harmony import */ var _promql__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./promql */ "./public/app/plugins/datasource/prometheus/promql.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var DEFAULT_KEYS = ['job', 'instance'];
var EMPTY_SELECTOR = '{}';
var HISTORY_ITEM_COUNT = 5;
var HISTORY_COUNT_CUTOFF = 1000 * 60 * 60 * 24; // 24h

var DEFAULT_LOOKUP_METRICS_THRESHOLD = 10000; // number of metrics defining an installation that's too big

var wrapLabel = function wrapLabel(label) {
  return {
    label: label
  };
};

var setFunctionKind = function setFunctionKind(suggestion) {
  suggestion.kind = 'function';
  return suggestion;
};

function addHistoryMetadata(item, history) {
  var cutoffTs = Date.now() - HISTORY_COUNT_CUTOFF;
  var historyForItem = history.filter(function (h) {
    return h.ts > cutoffTs && h.query === item.label;
  });
  var count = historyForItem.length;
  var recent = historyForItem[0];
  var hint = "\u6700\u8FD124\u5C0F\u65F6\u88AB\u67E5\u8BE2 ".concat(count, " \u6B21\u3002");

  if (recent) {
    var lastQueried = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateTime"])(recent.ts).fromNow();
    hint = "".concat(hint, " \u6700\u540E\u67E5\u8BE2\u7684 ").concat(lastQueried, ".");
  }

  return _objectSpread({}, item, {
    documentation: hint
  });
}

function addMetricsMetadata(metric, metadata) {
  var item = {
    label: metric
  };

  if (metadata && metadata[metric]) {
    var _metadata$metric$ = metadata[metric][0],
        type = _metadata$metric$.type,
        help = _metadata$metric$.help;
    item.documentation = "".concat(type.toUpperCase(), ": ").concat(help);
  }

  return item;
}

var PREFIX_DELIMITER_REGEX = /(="|!="|=~"|!~"|\{|\[|\(|\+|-|\/|\*|%|\^|\band\b|\bor\b|\bunless\b|==|>=|!=|<=|>|<|=|~|,)/;

var PromQlLanguageProvider =
/*#__PURE__*/
function (_LanguageProvider) {
  _inherits(PromQlLanguageProvider, _LanguageProvider);

  // Dynamically set to true for big/slow instances

  /**
   *  Cache for labels of series. This is bit simplistic in the sense that it just counts responses each as a 1 and does
   *  not account for different size of a response. If that is needed a `length` function can be added in the options.
   *  10 as a max size is totally arbitrary right now.
   */
  function PromQlLanguageProvider(datasource, initialValues) {
    var _this;

    _classCallCheck(this, PromQlLanguageProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PromQlLanguageProvider).call(this));
    _this.labelsCache = new lru_cache__WEBPACK_IMPORTED_MODULE_1___default.a(10);

    _this.request =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(url, defaultValue) {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this.datasource.metadataRequest(url);

              case 3:
                res = _context.sent;
                return _context.abrupt("return", res.data.data);

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);

              case 10:
                return _context.abrupt("return", defaultValue);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.start =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!_this.datasource.lookupsDisabled) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", []);

            case 2:
              _context2.next = 4;
              return _this.request('/api/v1/label/__name__/values', []);

            case 4:
              _this.metrics = _context2.sent;
              _this.lookupsDisabled = _this.metrics.length > _this.lookupMetricsThreshold;
              _context2.t0 = _language_utils__WEBPACK_IMPORTED_MODULE_3__["fixSummariesMetadata"];
              _context2.next = 9;
              return _this.request('/api/v1/metadata', {});

            case 9:
              _context2.t1 = _context2.sent;
              _this.metricsMetadata = (0, _context2.t0)(_context2.t1);

              _this.processHistogramMetrics(_this.metrics);

              return _context2.abrupt("return", []);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    _this.processHistogramMetrics = function (data) {
      var _processHistogramLabe = Object(_language_utils__WEBPACK_IMPORTED_MODULE_3__["processHistogramLabels"])(data),
          values = _processHistogramLabe.values;

      if (values && values['__name__']) {
        _this.histogramMetrics = values['__name__'].slice().sort();
      }
    };

    _this.provideCompletionItems =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref4) {
        var prefix,
            text,
            value,
            labelKey,
            wrapperClasses,
            context,
            emptyResult,
            empty,
            selectedLines,
            currentLine,
            nextCharacter,
            tokenRecognized,
            prefixUnrecognized,
            noSuffix,
            safePrefix,
            operatorsPattern,
            isNextOperand,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                prefix = _ref4.prefix, text = _ref4.text, value = _ref4.value, labelKey = _ref4.labelKey, wrapperClasses = _ref4.wrapperClasses;
                context = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {
                  history: []
                };
                emptyResult = {
                  suggestions: []
                };

                if (value) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", emptyResult);

              case 5:
                // Local text properties
                empty = value.document.text.length === 0;
                selectedLines = value.document.getTextsAtRange(value.selection);
                currentLine = selectedLines.size === 1 ? selectedLines.first().getText() : null;
                nextCharacter = currentLine ? currentLine[value.selection.anchor.offset] : null; // Syntax spans have 3 classes by default. More indicate a recognized token

                tokenRecognized = wrapperClasses.length > 3; // Non-empty prefix, but not inside known token

                prefixUnrecognized = prefix && !tokenRecognized; // Prevent suggestions in `function(|suffix)`

                noSuffix = !nextCharacter || nextCharacter === ')'; // Prefix is safe if it does not immediately follow a complete expression and has no text after it

                safePrefix = prefix && !text.match(/^[\]})\s]+$/) && noSuffix; // About to type next operand if preceded by binary operator

                operatorsPattern = /[+\-*/^%]/;
                isNextOperand = text.match(operatorsPattern); // Determine candidates by CSS context

                if (!wrapperClasses.includes('context-range')) {
                  _context3.next = 19;
                  break;
                }

                return _context3.abrupt("return", _this.getRangeCompletionItems());

              case 19:
                if (!wrapperClasses.includes('context-labels')) {
                  _context3.next = 23;
                  break;
                }

                return _context3.abrupt("return", _this.getLabelCompletionItems({
                  prefix: prefix,
                  text: text,
                  value: value,
                  labelKey: labelKey,
                  wrapperClasses: wrapperClasses
                }));

              case 23:
                if (!wrapperClasses.includes('context-aggregation')) {
                  _context3.next = 27;
                  break;
                }

                return _context3.abrupt("return", _this.getAggregationCompletionItems(value));

              case 27:
                if (!empty) {
                  _context3.next = 31;
                  break;
                }

                return _context3.abrupt("return", _this.getEmptyCompletionItems(context));

              case 31:
                if (!(prefixUnrecognized && noSuffix && !isNextOperand)) {
                  _context3.next = 35;
                  break;
                }

                return _context3.abrupt("return", _this.getBeginningCompletionItems(context));

              case 35:
                if (!(prefixUnrecognized && safePrefix)) {
                  _context3.next = 37;
                  break;
                }

                return _context3.abrupt("return", _this.getTermCompletionItems());

              case 37:
                return _context3.abrupt("return", emptyResult);

              case 38:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.getBeginningCompletionItems = function (context) {
      return {
        suggestions: [].concat(_toConsumableArray(_this.getEmptyCompletionItems(context).suggestions), _toConsumableArray(_this.getTermCompletionItems().suggestions))
      };
    };

    _this.getEmptyCompletionItems = function (context) {
      var history = context.history;
      var suggestions = [];

      if (history && history.length) {
        var historyItems = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.chain(history).map(function (h) {
          return h.query.expr;
        }).filter().uniq().take(HISTORY_ITEM_COUNT).map(wrapLabel).map(function (item) {
          return addHistoryMetadata(item, history);
        }).value();

        suggestions.push({
          prefixMatch: true,
          skipSort: true,
          label: '历史',
          items: historyItems
        });
      }

      return {
        suggestions: suggestions
      };
    };

    _this.getTermCompletionItems = function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          metrics = _assertThisInitialize.metrics,
          metricsMetadata = _assertThisInitialize.metricsMetadata;

      var suggestions = [];
      suggestions.push({
        prefixMatch: true,
        label: '功能',
        items: _promql__WEBPACK_IMPORTED_MODULE_4__["FUNCTIONS"].map(setFunctionKind)
      });

      if (metrics && metrics.length) {
        suggestions.push({
          label: '指标',
          items: metrics.map(function (m) {
            return addMetricsMetadata(m, metricsMetadata);
          })
        });
      }

      return {
        suggestions: suggestions
      };
    };

    _this.getAggregationCompletionItems =
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(value) {
        var suggestions, queryOffset, queryText, openParensAggregationIndex, openParensSelectorIndex, closeParensSelectorIndex, closeParensAggregationIndex, result, selectorString, selector, labelValues;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                suggestions = []; // Stitch all query lines together to support multi-line queries

                queryText = value.document.getBlocks().reduce(function (text, block) {
                  if (!block) {
                    return text;
                  }

                  var blockText = block === null || block === void 0 ? void 0 : block.getText();

                  if (value.anchorBlock.key === block.key) {
                    // Newline characters are not accounted for but this is irrelevant
                    // for the purpose of extracting the selector string
                    queryOffset = value.selection.anchor.offset + text.length;
                  }

                  return text + blockText;
                }, ''); // Try search for selector part on the left-hand side, such as `sum (m) by (l)`

                openParensAggregationIndex = queryText.lastIndexOf('(', queryOffset);
                openParensSelectorIndex = queryText.lastIndexOf('(', openParensAggregationIndex - 1);
                closeParensSelectorIndex = queryText.indexOf(')', openParensSelectorIndex); // Try search for selector part of an alternate aggregation clause, such as `sum by (l) (m)`

                if (openParensSelectorIndex === -1) {
                  closeParensAggregationIndex = queryText.indexOf(')', queryOffset);
                  closeParensSelectorIndex = queryText.indexOf(')', closeParensAggregationIndex + 1);
                  openParensSelectorIndex = queryText.lastIndexOf('(', closeParensSelectorIndex);
                }

                result = {
                  suggestions: suggestions,
                  context: 'context-aggregation'
                }; // Suggestions are useless for alternative aggregation clauses without a selector in context

                if (!(openParensSelectorIndex === -1)) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return", result);

              case 9:
                // Range vector syntax not accounted for by subsequent parse so discard it if present
                selectorString = queryText.slice(openParensSelectorIndex + 1, closeParensSelectorIndex).replace(/\[[^\]]+\]$/, '');
                selector = Object(_language_utils__WEBPACK_IMPORTED_MODULE_3__["parseSelector"])(selectorString, selectorString.length - 2).selector;
                _context4.next = 13;
                return _this.getLabelValues(selector);

              case 13:
                labelValues = _context4.sent;

                if (labelValues) {
                  suggestions.push({
                    label: '标签',
                    items: Object.keys(labelValues).map(wrapLabel)
                  });
                }

                return _context4.abrupt("return", result);

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4) {
        return _ref5.apply(this, arguments);
      };
    }();

    _this.getLabelCompletionItems =
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(_ref7) {
        var text, wrapperClasses, labelKey, value, suggestions, line, cursorOffset, suffix, prefix, isValueStart, isValueEnd, isPreValue, isValueEmpty, hasValuePrefix, selector, parsedSelector, containsMetric, existingKeys, labelValues, context, labelKeys, possibleKeys, newItems, newSuggestion;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                text = _ref7.text, wrapperClasses = _ref7.wrapperClasses, labelKey = _ref7.labelKey, value = _ref7.value;

                if (value) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt("return", {
                  suggestions: []
                });

              case 3:
                suggestions = [];
                line = value.anchorBlock.getText();
                cursorOffset = value.selection.anchor.offset;
                suffix = line.substr(cursorOffset);
                prefix = line.substr(0, cursorOffset);
                isValueStart = text.match(/^(=|=~|!=|!~)/);
                isValueEnd = suffix.match(/^"?[,}]/); // detect cursor in front of value, e.g., {key=|"}

                isPreValue = prefix.match(/(=|=~|!=|!~)$/) && suffix.match(/^"/); // Don't suggestq anything at the beginning or inside a value

                isValueEmpty = isValueStart && isValueEnd;
                hasValuePrefix = isValueEnd && !isValueStart;

                if (!(!isValueEmpty && !hasValuePrefix || isPreValue)) {
                  _context5.next = 15;
                  break;
                }

                return _context5.abrupt("return", {
                  suggestions: suggestions
                });

              case 15:
                try {
                  parsedSelector = Object(_language_utils__WEBPACK_IMPORTED_MODULE_3__["parseSelector"])(line, cursorOffset);
                  selector = parsedSelector.selector;
                } catch (_unused) {
                  selector = EMPTY_SELECTOR;
                }

                containsMetric = selector.includes('__name__=');
                existingKeys = parsedSelector ? parsedSelector.labelKeys : [];

                if (!selector) {
                  _context5.next = 22;
                  break;
                }

                _context5.next = 21;
                return _this.getLabelValues(selector, !containsMetric);

              case 21:
                labelValues = _context5.sent;

              case 22:
                if (labelValues) {
                  _context5.next = 25;
                  break;
                }

                console.warn("\u670D\u52A1\u5668\u6CA1\u6709\u7ED9\u9009\u62E9\u5668 ".concat(selector, " \u8FD4\u56DE\u4EFB\u4F55\u503C"));
                return _context5.abrupt("return", {
                  suggestions: suggestions
                });

              case 25:
                if (text && isValueStart || wrapperClasses.includes('attr-value')) {
                  // Label values
                  if (labelKey && labelValues[labelKey]) {
                    context = 'context-label-values';
                    suggestions.push({
                      label: "\"".concat(labelKey, "\"\u7684\u6807\u7B7E\u503C"),
                      items: labelValues[labelKey].map(wrapLabel)
                    });
                  }
                } else {
                  // Label keys
                  labelKeys = labelValues ? Object.keys(labelValues) : containsMetric ? null : DEFAULT_KEYS;

                  if (labelKeys) {
                    possibleKeys = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.difference(labelKeys, existingKeys);

                    if (possibleKeys.length) {
                      context = 'context-labels';
                      newItems = possibleKeys.map(function (key) {
                        return {
                          label: key
                        };
                      });
                      newSuggestion = {
                        label: "\u6807\u7B7E",
                        items: newItems
                      };
                      suggestions.push(newSuggestion);
                    }
                  }
                }

                return _context5.abrupt("return", {
                  context: context,
                  suggestions: suggestions
                });

              case 27:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x5) {
        return _ref6.apply(this, arguments);
      };
    }();

    _this.fetchLabelValues =
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(key) {
        var data;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this.request("/api/v1/label/".concat(key, "/values"), []);

              case 2:
                data = _context6.sent;
                return _context6.abrupt("return", _defineProperty({}, key, data));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x6) {
        return _ref8.apply(this, arguments);
      };
    }();

    _this.fetchSeriesLabels =
    /*#__PURE__*/
    function () {
      var _ref10 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(name, withName) {
        var tRange, params, url, cacheKey, value, data, _processLabels, values;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                tRange = _this.datasource.getTimeRange();
                params = new URLSearchParams({
                  'match[]': name,
                  start: tRange['start'].toString(),
                  end: tRange['end'].toString()
                });
                url = "/api/v1/series?".concat(params.toString()); // Cache key is a bit different here. We add the `withName` param and also round up to a minute the intervals.
                // The rounding may seem strange but makes relative intervals like now-1h less prone to need separate request every
                // millisecond while still actually getting all the keys for the correct interval. This still can create problems
                // when user does not the newest values for a minute if already cached.

                params.set('start', _this.roundToMinutes(tRange['start']).toString());
                params.set('end', _this.roundToMinutes(tRange['end']).toString());
                params.append('withName', withName ? 'true' : 'false');
                cacheKey = "/api/v1/series?".concat(params.toString());
                value = _this.labelsCache.get(cacheKey);

                if (value) {
                  _context7.next = 15;
                  break;
                }

                _context7.next = 11;
                return _this.request(url, []);

              case 11:
                data = _context7.sent;
                _processLabels = Object(_language_utils__WEBPACK_IMPORTED_MODULE_3__["processLabels"])(data, withName), values = _processLabels.values;
                value = values;

                _this.labelsCache.set(cacheKey, value);

              case 15:
                return _context7.abrupt("return", value);

              case 16:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x7, _x8) {
        return _ref10.apply(this, arguments);
      };
    }();

    _this.fetchDefaultLabels = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.once(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var values;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return Promise.all(DEFAULT_KEYS.map(function (key) {
                return _this.fetchLabelValues(key);
              }));

            case 2:
              values = _context8.sent;
              return _context8.abrupt("return", values.reduce(function (acc, value) {
                return _objectSpread({}, acc, {}, value);
              }, {}));

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    _this.datasource = datasource;
    _this.histogramMetrics = [];
    _this.timeRange = {
      start: 0,
      end: 0
    };
    _this.metrics = []; // Disable lookups until we know the instance is small enough

    _this.lookupMetricsThreshold = DEFAULT_LOOKUP_METRICS_THRESHOLD;
    _this.lookupsDisabled = true;
    Object.assign(_assertThisInitialized(_this), initialValues);
    return _this;
  } // Strip syntax chars so that typeahead suggestions can work on clean inputs


  _createClass(PromQlLanguageProvider, [{
    key: "cleanText",
    value: function cleanText(s) {
      var parts = s.split(PREFIX_DELIMITER_REGEX);
      var last = parts.pop();
      return last.trimLeft().replace(/"$/, '').replace(/^"/, '');
    }
  }, {
    key: "getRangeCompletionItems",
    value: function getRangeCompletionItems() {
      return {
        context: 'context-range',
        suggestions: [{
          label: '范围向量',
          items: _toConsumableArray(_promql__WEBPACK_IMPORTED_MODULE_4__["RATE_RANGES"])
        }]
      };
    }
  }, {
    key: "getLabelValues",
    value: function () {
      var _getLabelValues = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(selector, withName) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!this.lookupsDisabled) {
                  _context9.next = 2;
                  break;
                }

                return _context9.abrupt("return", undefined);

              case 2:
                _context9.prev = 2;

                if (!(selector === EMPTY_SELECTOR)) {
                  _context9.next = 9;
                  break;
                }

                _context9.next = 6;
                return this.fetchDefaultLabels();

              case 6:
                return _context9.abrupt("return", _context9.sent);

              case 9:
                _context9.next = 11;
                return this.fetchSeriesLabels(selector, withName);

              case 11:
                return _context9.abrupt("return", _context9.sent);

              case 12:
                _context9.next = 18;
                break;

              case 14:
                _context9.prev = 14;
                _context9.t0 = _context9["catch"](2);
                // TODO: better error handling
                console.error(_context9.t0);
                return _context9.abrupt("return", undefined);

              case 18:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[2, 14]]);
      }));

      function getLabelValues(_x9, _x10) {
        return _getLabelValues.apply(this, arguments);
      }

      return getLabelValues;
    }()
  }, {
    key: "roundToMinutes",
    value: function roundToMinutes(seconds) {
      return Math.floor(seconds / 60);
    }
    /**
     * Fetch labels for a series. This is cached by it's args but also by the global timeRange currently selected as
     * they can change over requested time.
     * @param name
     * @param withName
     */

  }, {
    key: "syntax",
    get: function get() {
      return _promql__WEBPACK_IMPORTED_MODULE_4__["default"];
    }
  }]);

  return PromQlLanguageProvider;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["LanguageProvider"]);



/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/metric_find_query.ts":
/*!***********************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/metric_find_query.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PrometheusMetricFindQuery; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/features/dashboard/services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var PrometheusMetricFindQuery =
/*#__PURE__*/
function () {
  function PrometheusMetricFindQuery(datasource, query) {
    _classCallCheck(this, PrometheusMetricFindQuery);

    this.datasource = datasource;
    this.query = query;
    this.datasource = datasource;
    this.query = query;
    this.range = Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_2__["getTimeSrv"])().timeRange();
  }

  _createClass(PrometheusMetricFindQuery, [{
    key: "process",
    value: function process() {
      var labelNamesRegex = /^label_names\(\)\s*$/;
      var labelValuesRegex = /^label_values\((?:(.+),\s*)?([a-zA-Z_][a-zA-Z0-9_]*)\)\s*$/;
      var metricNamesRegex = /^metrics\((.+)\)\s*$/;
      var queryResultRegex = /^query_result\((.+)\)\s*$/;
      var labelNamesQuery = this.query.match(labelNamesRegex);

      if (labelNamesQuery) {
        return this.labelNamesQuery();
      }

      var labelValuesQuery = this.query.match(labelValuesRegex);

      if (labelValuesQuery) {
        if (labelValuesQuery[1]) {
          return this.labelValuesQuery(labelValuesQuery[2], labelValuesQuery[1]);
        } else {
          return this.labelValuesQuery(labelValuesQuery[2]);
        }
      }

      var metricNamesQuery = this.query.match(metricNamesRegex);

      if (metricNamesQuery) {
        return this.metricNameQuery(metricNamesQuery[1]);
      }

      var queryResultQuery = this.query.match(queryResultRegex);

      if (queryResultQuery) {
        return this.queryResultQuery(queryResultQuery[1]).toPromise();
      } // if query contains full metric name, return metric name and label list


      return this.metricNameAndLabelsQuery(this.query);
    }
  }, {
    key: "labelNamesQuery",
    value: function labelNamesQuery() {
      var url = '/api/v1/labels';
      return this.datasource.metadataRequest(url).then(function (result) {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data.data, function (value) {
          return {
            text: value
          };
        });
      });
    }
  }, {
    key: "labelValuesQuery",
    value: function labelValuesQuery(label, metric) {
      var url;

      if (!metric) {
        // return label values globally
        url = '/api/v1/label/' + label + '/values';
        return this.datasource.metadataRequest(url).then(function (result) {
          return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data.data, function (value) {
            return {
              text: value
            };
          });
        });
      } else {
        var start = this.datasource.getPrometheusTime(this.range.from, false);
        var end = this.datasource.getPrometheusTime(this.range.to, true);
        var params = new URLSearchParams({
          'match[]': metric,
          start: start.toString(),
          end: end.toString()
        });
        url = "/api/v1/series?".concat(params.toString());
        return this.datasource.metadataRequest(url).then(function (result) {
          var _labels = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data.data, function (metric) {
            return metric[label] || '';
          }).filter(function (label) {
            return label !== '';
          });

          return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniq(_labels).map(function (metric) {
            return {
              text: metric,
              expandable: true
            };
          });
        });
      }
    }
  }, {
    key: "metricNameQuery",
    value: function metricNameQuery(metricFilterPattern) {
      var url = '/api/v1/label/__name__/values';
      return this.datasource.metadataRequest(url).then(function (result) {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.chain(result.data.data).filter(function (metricName) {
          var r = new RegExp(metricFilterPattern);
          return r.test(metricName);
        }).map(function (matchedMetricName) {
          return {
            text: matchedMetricName,
            expandable: true
          };
        }).value();
      });
    }
  }, {
    key: "queryResultQuery",
    value: function queryResultQuery(query) {
      var end = this.datasource.getPrometheusTime(this.range.to, true);
      var instantQuery = {
        expr: query
      };
      return this.datasource.performInstantQuery(instantQuery, end).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (result) {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data.data.result, function (metricData) {
          var text = metricData.metric.__name__ || '';
          delete metricData.metric.__name__;
          text += '{' + lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(metricData.metric, function (v, k) {
            return k + '="' + v + '"';
          }).join(',') + '}';
          text += ' ' + metricData.value[1] + ' ' + metricData.value[0] * 1000;
          return {
            text: text,
            expandable: true
          };
        });
      }));
    }
  }, {
    key: "metricNameAndLabelsQuery",
    value: function metricNameAndLabelsQuery(query) {
      var start = this.datasource.getPrometheusTime(this.range.from, false);
      var end = this.datasource.getPrometheusTime(this.range.to, true);
      var params = new URLSearchParams({
        'match[]': query,
        start: start.toString(),
        end: end.toString()
      });
      var url = "/api/v1/series?".concat(params.toString());
      var self = this;
      return this.datasource.metadataRequest(url).then(function (result) {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data.data, function (metric) {
          return {
            text: self.datasource.getOriginalMetricName(metric),
            expandable: true
          };
        });
      });
    }
  }]);

  return PrometheusMetricFindQuery;
}();



/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/module.ts":
/*!************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/module.ts ***!
  \************************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/prometheus/datasource.ts");
/* harmony import */ var _components_PromQueryEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/PromQueryEditor */ "./public/app/plugins/datasource/prometheus/components/PromQueryEditor.tsx");
/* harmony import */ var _components_PromCheatSheet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/PromCheatSheet */ "./public/app/plugins/datasource/prometheus/components/PromCheatSheet.tsx");
/* harmony import */ var _components_PromExploreQueryEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/PromExploreQueryEditor */ "./public/app/plugins/datasource/prometheus/components/PromExploreQueryEditor.tsx");
/* harmony import */ var _configuration_ConfigEditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./configuration/ConfigEditor */ "./public/app/plugins/datasource/prometheus/configuration/ConfigEditor.tsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }








var PrometheusAnnotationsQueryCtrl = function PrometheusAnnotationsQueryCtrl() {
  _classCallCheck(this, PrometheusAnnotationsQueryCtrl);

  this.stepDefaultValuePlaceholder = _datasource__WEBPACK_IMPORTED_MODULE_1__["ANNOTATION_QUERY_STEP_DEFAULT"];
};

PrometheusAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_1__["PrometheusDatasource"]).setQueryEditor(_components_PromQueryEditor__WEBPACK_IMPORTED_MODULE_2__["PromQueryEditor"]).setConfigEditor(_configuration_ConfigEditor__WEBPACK_IMPORTED_MODULE_5__["ConfigEditor"]).setExploreMetricsQueryField(_components_PromExploreQueryEditor__WEBPACK_IMPORTED_MODULE_4__["default"]).setAnnotationQueryCtrl(PrometheusAnnotationsQueryCtrl).setExploreStartPage(_components_PromCheatSheet__WEBPACK_IMPORTED_MODULE_3__["default"]);

/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/query_hints.ts":
/*!*****************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/query_hints.ts ***!
  \*****************************************************************/
/*! exports provided: SUM_HINT_THRESHOLD_COUNT, getQueryHints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUM_HINT_THRESHOLD_COUNT", function() { return SUM_HINT_THRESHOLD_COUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryHints", function() { return getQueryHints; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * Number of time series results needed before starting to suggest sum aggregation hints
 */
var SUM_HINT_THRESHOLD_COUNT = 20;
function getQueryHints(query, series, datasource) {
  var hints = []; // ..._bucket metric needs a histogram_quantile()

  var histogramMetric = query.trim().match(/^\w+_bucket$/);

  if (histogramMetric) {
    var label = '时间序列有桶，您可能想要直方图。';
    hints.push({
      type: 'HISTOGRAM_QUANTILE',
      label: label,
      fix: {
        label: '通过添加进行更改 histogram_quantile().',
        action: {
          type: 'ADD_HISTOGRAM_QUANTILE',
          query: query
        }
      }
    });
  } // Check for need of rate()


  if (query.indexOf('rate(') === -1 && query.indexOf('increase(') === -1) {
    var _ref, _datasource$languageP;

    // Use metric metadata for exact types
    var nameMatch = query.match(/\b(\w+_(total|sum|count))\b/);
    var counterNameMetric = nameMatch ? nameMatch[1] : '';
    var metricsMetadata = (_ref = datasource === null || datasource === void 0 ? void 0 : (_datasource$languageP = datasource.languageProvider) === null || _datasource$languageP === void 0 ? void 0 : _datasource$languageP.metricsMetadata) !== null && _ref !== void 0 ? _ref : {};
    var metricMetadataKeys = Object.keys(metricsMetadata);
    var certain = false;

    if (metricMetadataKeys.length > 0) {
      var _metricMetadataKeys$f;

      counterNameMetric = (_metricMetadataKeys$f = metricMetadataKeys.find(function (metricName) {
        // Only considering first type information, could be non-deterministic
        var metadata = metricsMetadata[metricName][0];

        if (metadata.type.toLowerCase() === 'counter') {
          var metricRegex = new RegExp("\\b".concat(metricName, "\\b"));

          if (query.match(metricRegex)) {
            certain = true;
            return true;
          }
        }

        return false;
      })) !== null && _metricMetadataKeys$f !== void 0 ? _metricMetadataKeys$f : '';
    }

    if (counterNameMetric) {
      var simpleMetric = query.trim().match(/^\w+$/);
      var verb = certain ? '是' : '像';

      var _label = "\u6307\u6807 ".concat(counterNameMetric, " ").concat(verb, " \u8BA1\u6570\u5668\u3002");

      var fix;

      if (simpleMetric) {
        fix = {
          label: '通过添加进行更改 rate().',
          action: {
            type: 'ADD_RATE',
            query: query
          }
        };
      } else {
        _label = "".concat(_label, " \u5C1D\u8BD5\u5E94\u7528 rate() \u51FD\u6570\u3002");
      }

      hints.push({
        type: 'APPLY_RATE',
        label: _label,
        fix: fix
      });
    }
  } // Check for recording rules expansion


  if (datasource && datasource.ruleMappings) {
    var mapping = datasource.ruleMappings;
    var mappingForQuery = Object.keys(mapping).reduce(function (acc, ruleName) {
      if (query.search(ruleName) > -1) {
        return _objectSpread({}, acc, _defineProperty({}, ruleName, mapping[ruleName]));
      }

      return acc;
    }, {});

    if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.size(mappingForQuery) > 0) {
      var _label2 = '查询包含记录规则。';
      hints.push({
        type: 'EXPAND_RULES',
        label: _label2,
        fix: {
          label: '扩展规则',
          action: {
            type: 'EXPAND_RULES',
            query: query,
            mapping: mappingForQuery
          }
        }
      });
    }
  }

  if (series && series.length >= SUM_HINT_THRESHOLD_COUNT) {
    var _simpleMetric = query.trim().match(/^\w+$/);

    if (_simpleMetric) {
      hints.push({
        type: 'ADD_SUM',
        label: '返回了许多时间序列结果。',
        fix: {
          label: '考虑使用 sum() 进行聚合。',
          action: {
            type: 'ADD_SUM',
            query: query,
            preventSubmit: true
          }
        }
      });
    }
  }

  return hints;
}

/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/result_transformer.ts":
/*!************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/result_transformer.ts ***!
  \************************************************************************/
/*! exports provided: ResultTransformer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultTransformer", function() { return ResultTransformer; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_table_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/table_model */ "./public/app/core/table_model.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var ResultTransformer =
/*#__PURE__*/
function () {
  function ResultTransformer(templateSrv) {
    _classCallCheck(this, ResultTransformer);

    this.templateSrv = templateSrv;
  }

  _createClass(ResultTransformer, [{
    key: "transform",
    value: function transform(response, options) {
      var prometheusResult = response.data.data.result;

      if (options.format === 'table') {
        return [this.transformMetricDataToTable(prometheusResult, options.responseListLength, options.refId, options.meta, options.valueWithRefId)];
      } else if (prometheusResult && options.format === 'heatmap') {
        var seriesList = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = prometheusResult[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var metricData = _step.value;
            seriesList.push(this.transformMetricData(metricData, options, options.start, options.end));
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

        seriesList.sort(sortSeriesByLabel);
        seriesList = this.transformToHistogramOverTime(seriesList);
        return seriesList;
      } else if (prometheusResult) {
        var _seriesList = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = prometheusResult[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _metricData = _step2.value;

            if (response.data.data.resultType === 'matrix') {
              _seriesList.push(this.transformMetricData(_metricData, options, options.start, options.end));
            } else if (response.data.data.resultType === 'vector') {
              _seriesList.push(this.transformInstantMetricData(_metricData, options));
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

        return _seriesList;
      }

      return [];
    }
  }, {
    key: "transformMetricData",
    value: function transformMetricData(metricData, options, start, end) {
      var dps = [];

      var _this$createLabelInfo = this.createLabelInfo(metricData.metric, options),
          name = _this$createLabelInfo.name,
          labels = _this$createLabelInfo.labels,
          title = _this$createLabelInfo.title;

      var stepMs = parseFloat(options.step) * 1000;
      var baseTimestamp = start * 1000;

      if (metricData.values === undefined) {
        throw new Error('Prometheus热图错误：数据应为时间序列');
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = metricData.values[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var value = _step3.value;
          var dpValue = parseFloat(value[1]);

          if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isNaN(dpValue)) {
            dpValue = null;
          }

          var timestamp = parseFloat(value[0]) * 1000;

          for (var _t = baseTimestamp; _t < timestamp; _t += stepMs) {
            dps.push([null, _t]);
          }

          baseTimestamp = timestamp + stepMs;
          dps.push([dpValue, timestamp]);
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

      var endTimestamp = end * 1000;

      for (var t = baseTimestamp; t <= endTimestamp; t += stepMs) {
        dps.push([null, t]);
      }

      return {
        datapoints: dps,
        refId: options.refId,
        target: name !== null && name !== void 0 ? name : '',
        tags: labels,
        title: title,
        meta: options.meta
      };
    }
  }, {
    key: "transformMetricDataToTable",
    value: function transformMetricDataToTable(md, resultCount, refId, meta, valueWithRefId) {
      var table = new app_core_table_model__WEBPACK_IMPORTED_MODULE_1__["default"]();
      table.refId = refId;
      table.meta = meta;
      var i, j;
      var metricLabels = {};

      if (!md || md.length === 0) {
        return table;
      } // Collect all labels across all metrics


      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(md, function (series) {
        for (var label in series.metric) {
          if (!metricLabels.hasOwnProperty(label)) {
            metricLabels[label] = 1;
          }
        }
      }); // Sort metric labels, create columns for them and record their index


      var sortedLabels = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(metricLabels).sort();

      table.columns.push({
        text: 'Time',
        type: _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].time
      });

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(sortedLabels, function (label, labelIndex) {
        metricLabels[label] = labelIndex + 1;
        table.columns.push({
          text: label,
          filterable: true
        });
      });

      var valueText = resultCount > 1 || valueWithRefId ? "Value #".concat(refId) : 'Value';
      table.columns.push({
        text: valueText
      }); // Populate rows, set value to empty string when label not present.

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(md, function (series) {
        if (series.value) {
          series.values = [series.value];
        }

        if (series.values) {
          for (i = 0; i < series.values.length; i++) {
            var values = series.values[i];
            var reordered = [values[0] * 1000];

            if (series.metric) {
              for (j = 0; j < sortedLabels.length; j++) {
                var label = sortedLabels[j];

                if (series.metric.hasOwnProperty(label)) {
                  if (label === 'le') {
                    reordered.push(parseHistogramLabel(series.metric[label]));
                  } else {
                    reordered.push(series.metric[label]);
                  }
                } else {
                  reordered.push('');
                }
              }
            }

            reordered.push(parseFloat(values[1]));
            table.rows.push(reordered);
          }
        }
      });

      return table;
    }
  }, {
    key: "transformInstantMetricData",
    value: function transformInstantMetricData(md, options) {
      var dps = [];

      var _this$createLabelInfo2 = this.createLabelInfo(md.metric, options),
          name = _this$createLabelInfo2.name,
          labels = _this$createLabelInfo2.labels;

      dps.push([parseFloat(md.value[1]), md.value[0] * 1000]);
      return {
        target: name !== null && name !== void 0 ? name : '',
        title: name,
        datapoints: dps,
        tags: labels,
        refId: options.refId,
        meta: options.meta
      };
    }
  }, {
    key: "createLabelInfo",
    value: function createLabelInfo(labels, options) {
      if (options === null || options === void 0 ? void 0 : options.legendFormat) {
        var _title = this.renderTemplate(this.templateSrv.replace(options.legendFormat, options === null || options === void 0 ? void 0 : options.scopedVars), labels);

        return {
          name: _title,
          title: _title,
          labels: labels
        };
      }

      var __name__ = labels.__name__,
          labelsWithoutName = _objectWithoutProperties(labels, ["__name__"]);

      var title = __name__ || '';
      var labelPart = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["formatLabels"])(labelsWithoutName);

      if (!title && !labelPart) {
        title = options.query;
      }

      title = "".concat(__name__ !== null && __name__ !== void 0 ? __name__ : '').concat(labelPart);
      return {
        name: title,
        title: title,
        labels: labelsWithoutName
      };
    }
  }, {
    key: "getOriginalMetricName",
    value: function getOriginalMetricName(labelData) {
      var metricName = labelData.__name__ || '';
      delete labelData.__name__;
      var labelPart = Object.entries(labelData).map(function (label) {
        return "".concat(label[0], "=\"").concat(label[1], "\"");
      }).join(',');
      return "".concat(metricName, "{").concat(labelPart, "}");
    }
  }, {
    key: "renderTemplate",
    value: function renderTemplate(aliasPattern, aliasData) {
      var aliasRegex = /\{\{\s*(.+?)\s*\}\}/g;
      return aliasPattern.replace(aliasRegex, function (match, g1) {
        if (aliasData[g1]) {
          return aliasData[g1];
        }

        return '';
      });
    }
  }, {
    key: "transformToHistogramOverTime",
    value: function transformToHistogramOverTime(seriesList) {
      /*      t1 = timestamp1, t2 = timestamp2 etc.
              t1  t2  t3          t1  t2  t3
      le10    10  10  0     =>    10  10  0
      le20    20  10  30    =>    10  0   30
      le30    30  10  35    =>    10  0   5
      */
      for (var i = seriesList.length - 1; i > 0; i--) {
        var topSeries = seriesList[i].datapoints;
        var bottomSeries = seriesList[i - 1].datapoints;

        if (!topSeries || !bottomSeries) {
          throw new Error('Prometheus热图错误：数据应为时间序列');
        }

        for (var j = 0; j < topSeries.length; j++) {
          var bottomPoint = bottomSeries[j] || [0];
          topSeries[j][0] -= bottomPoint[0];
        }
      }

      return seriesList;
    }
  }]);

  return ResultTransformer;
}();

function sortSeriesByLabel(s1, s2) {
  var le1, le2;

  try {
    // fail if not integer. might happen with bad queries
    le1 = parseHistogramLabel(s1.target);
    le2 = parseHistogramLabel(s2.target);
  } catch (err) {
    console.error(err);
    return 0;
  }

  if (le1 > le2) {
    return 1;
  }

  if (le1 < le2) {
    return -1;
  }

  return 0;
}

function parseHistogramLabel(le) {
  if (le === '+Inf') {
    return +Infinity;
  }

  return Number(le);
}

/***/ })

}]);
//# sourceMappingURL=prometheusPlugin.1ebdc265fc3bd7452fcd.js.map