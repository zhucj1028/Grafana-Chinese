(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["zipkinPlugin"],{

/***/ "./public/app/plugins/datasource/zipkin/ConfigEditor.tsx":
/*!***************************************************************!*\
  !*** ./public/app/plugins/datasource/zipkin/ConfigEditor.tsx ***!
  \***************************************************************/
/*! exports provided: ConfigEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");


var ConfigEditor = function ConfigEditor(_ref) {
  var options = _ref.options,
      onOptionsChange = _ref.onOptionsChange;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["DataSourceHttpSettings"], {
    defaultUrl: 'http://localhost:9411',
    dataSourceConfig: options,
    showAccessOptions: true,
    onChange: onOptionsChange
  });
};

/***/ }),

/***/ "./public/app/plugins/datasource/zipkin/QueryField.tsx":
/*!*************************************************************!*\
  !*** ./public/app/plugins/datasource/zipkin/QueryField.tsx ***!
  \*************************************************************/
/*! exports provided: QueryField, useServices, useLoadOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryField", function() { return QueryField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useServices", function() { return useServices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLoadOptions", function() { return useLoadOptions; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/index.js");
/* harmony import */ var _core_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../core/core */ "./public/app/core/core.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./public/app/plugins/datasource/zipkin/constants.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var QueryField = function QueryField(_ref) {
  var query = _ref.query,
      _onChange = _ref.onChange,
      onRunQuery = _ref.onRunQuery,
      datasource = _ref.datasource;
  var serviceOptions = useServices(datasource);

  var _useLoadOptions = useLoadOptions(datasource),
      onLoadOptions = _useLoadOptions.onLoadOptions,
      allOptions = _useLoadOptions.allOptions;

  var onSelectTrace = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (values, selectedOptions) {
    if (selectedOptions.length === 3) {
      var traceID = selectedOptions[2].value;

      _onChange(_objectSpread({}, query, {
        query: traceID
      }));

      onRunQuery();
    }
  }, [_onChange, onRunQuery, query]);
  var cascaderOptions = useMapToCascaderOptions(serviceOptions, allOptions);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-inline gf-form-inline--nowrap"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form flex-shrink-0"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["ButtonCascader"], {
    options: cascaderOptions,
    onChange: onSelectTrace,
    loadData: onLoadOptions
  }, "Traces")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form gf-form--grow flex-shrink-1"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: 'slate-query-field__wrapper'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "slate-query-field"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    style: {
      width: '100%'
    },
    value: query.query || '',
    onChange: function onChange(e) {
      return _onChange(_objectSpread({}, query, {
        query: e.currentTarget.value
      }));
    }
  }))))));
}; // Exported for tests

function useServices(datasource) {
  var url = "".concat(_constants__WEBPACK_IMPORTED_MODULE_5__["apiPrefix"], "/services");

  var _useAsyncFn = Object(react_use__WEBPACK_IMPORTED_MODULE_3__["useAsyncFn"])(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var services;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return datasource.metadataRequest(url);

          case 3:
            services = _context.sent;

            if (!services) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", services.sort().map(function (service) {
              return {
                label: service,
                value: service,
                isLeaf: false
              };
            }));

          case 6:
            return _context.abrupt("return", []);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            _core_core__WEBPACK_IMPORTED_MODULE_4__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["AppEvents"].alertError, ['Failed to load services from Zipkin', _context.t0]);
            throw _context.t0;

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  })), [datasource]),
      _useAsyncFn2 = _slicedToArray(_useAsyncFn, 2),
      servicesOptions = _useAsyncFn2[0],
      fetch = _useAsyncFn2[1];

  Object(react_use__WEBPACK_IMPORTED_MODULE_3__["useMount"])(function () {
    // We should probably call this periodically to get new services after mount.
    fetch();
  });
  return servicesOptions;
}
// Exported for tests
function useLoadOptions(datasource) {
  var isMounted = Object(react_use__WEBPACK_IMPORTED_MODULE_3__["useMountedState"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({}),
      _useState2 = _slicedToArray(_useState, 2),
      allOptions = _useState2[0],
      setAllOptions = _useState2[1];

  var _useAsyncFn3 = Object(react_use__WEBPACK_IMPORTED_MODULE_3__["useAsyncFn"])(
  /*#__PURE__*/
  function () {
    var _findSpans = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(service) {
      var url, response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              url = "".concat(_constants__WEBPACK_IMPORTED_MODULE_5__["apiPrefix"], "/spans");
              _context2.prev = 1;
              _context2.next = 4;
              return datasource.metadataRequest(url, {
                serviceName: service
              });

            case 4:
              response = _context2.sent;

              if (isMounted()) {
                setAllOptions(function (state) {
                  var spanOptions = Object(lodash__WEBPACK_IMPORTED_MODULE_6__["fromPairs"])(response.map(function (span) {
                    return [span, undefined];
                  }));
                  return _objectSpread({}, state, _defineProperty({}, service, spanOptions));
                });
              }

              _context2.next = 12;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              _core_core__WEBPACK_IMPORTED_MODULE_4__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["AppEvents"].alertError, ['Failed to load spans from Zipkin', _context2.t0]);
              throw _context2.t0;

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 8]]);
    }));

    function findSpans(_x) {
      return _findSpans.apply(this, arguments);
    }

    return findSpans;
  }(), [datasource, allOptions]),
      _useAsyncFn4 = _slicedToArray(_useAsyncFn3, 2),
      fetchSpans = _useAsyncFn4[1];

  var _useAsyncFn5 = Object(react_use__WEBPACK_IMPORTED_MODULE_3__["useAsyncFn"])(
  /*#__PURE__*/
  function () {
    var _findTraces = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(serviceName, spanName) {
      var url, search, traces, newTraces;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              url = "".concat(_constants__WEBPACK_IMPORTED_MODULE_5__["apiPrefix"], "/traces");
              search = {
                serviceName: serviceName,
                spanName: spanName // See other params and default here https://zipkin.io/zipkin-api/#/default/get_traces

              };
              _context3.prev = 2;
              _context3.next = 5;
              return datasource.metadataRequest(url, search);

            case 5:
              traces = _context3.sent;

              if (isMounted()) {
                newTraces = traces.length ? Object(lodash__WEBPACK_IMPORTED_MODULE_6__["fromPairs"])(traces.map(function (trace) {
                  var rootSpan = trace.find(function (span) {
                    return !span.parentId;
                  });
                  return ["".concat(rootSpan.name, " [").concat(Math.floor(rootSpan.duration / 1000), " ms]"), rootSpan.traceId];
                })) : noTracesOptions;
                setAllOptions(function (state) {
                  var spans = state[serviceName];
                  return _objectSpread({}, state, _defineProperty({}, serviceName, _objectSpread({}, spans, _defineProperty({}, spanName, newTraces))));
                });
              }

              _context3.next = 13;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](2);
              _core_core__WEBPACK_IMPORTED_MODULE_4__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["AppEvents"].alertError, ['Failed to load spans from Zipkin', _context3.t0]);
              throw _context3.t0;

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 9]]);
    }));

    function findTraces(_x2, _x3) {
      return _findTraces.apply(this, arguments);
    }

    return findTraces;
  }(), [datasource]),
      _useAsyncFn6 = _slicedToArray(_useAsyncFn5, 2),
      fetchTraces = _useAsyncFn6[1];

  var onLoadOptions = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (selectedOptions) {
    var service = selectedOptions[0].value;

    if (selectedOptions.length === 1) {
      fetchSpans(service);
    } else if (selectedOptions.length === 2) {
      var _spanName = selectedOptions[1].value;
      fetchTraces(service, _spanName);
    }
  }, [fetchSpans, fetchTraces]);
  return {
    onLoadOptions: onLoadOptions,
    allOptions: allOptions
  };
}

function useMapToCascaderOptions(services, allOptions) {
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    var cascaderOptions = [];

    if (services.value && services.value.length) {
      cascaderOptions = services.value.map(function (services) {
        return _objectSpread({}, services, {
          children: allOptions[services.value] && Object.keys(allOptions[services.value]).map(function (spanName) {
            return {
              label: spanName,
              value: spanName,
              isLeaf: false,
              children: allOptions[services.value][spanName] && Object.keys(allOptions[services.value][spanName]).map(function (traceName) {
                return {
                  label: traceName,
                  value: allOptions[services.value][spanName][traceName]
                };
              })
            };
          })
        });
      });
    } else if (services.value && !services.value.length) {
      cascaderOptions = noTracesFoundOptions;
    }

    return cascaderOptions;
  }, [services, allOptions]);
}

var NO_TRACES_KEY = '__NO_TRACES__';
var noTracesFoundOptions = [{
  label: 'No traces found',
  value: 'no_traces',
  isLeaf: true // Cannot be disabled because then cascader shows 'loading' for some reason.
  // disabled: true,

}];
var noTracesOptions = {
  '[No traces in time range]': NO_TRACES_KEY
};

/***/ }),

/***/ "./public/app/plugins/datasource/zipkin/constants.ts":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/zipkin/constants.ts ***!
  \***********************************************************/
/*! exports provided: apiPrefix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiPrefix", function() { return apiPrefix; });
var apiPrefix = '/api/v2';

/***/ }),

/***/ "./public/app/plugins/datasource/zipkin/datasource.ts":
/*!************************************************************!*\
  !*** ./public/app/plugins/datasource/zipkin/datasource.ts ***!
  \************************************************************/
/*! exports provided: ZipkinDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZipkinDatasource", function() { return ZipkinDatasource; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _core_utils_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/utils/fetch */ "./public/app/core/utils/fetch.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./public/app/plugins/datasource/zipkin/constants.ts");
/* harmony import */ var _utils_transforms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/transforms */ "./public/app/plugins/datasource/zipkin/utils/transforms.ts");
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








var ZipkinDatasource =
/*#__PURE__*/
function (_DataSourceApi) {
  _inherits(ZipkinDatasource, _DataSourceApi);

  function ZipkinDatasource(instanceSettings) {
    var _this;

    _classCallCheck(this, ZipkinDatasource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ZipkinDatasource).call(this, instanceSettings));
    _this.instanceSettings = instanceSettings;
    return _this;
  }

  _createClass(ZipkinDatasource, [{
    key: "query",
    value: function query(options) {
      var _options$targets$;

      var traceId = (_options$targets$ = options.targets[0]) === null || _options$targets$ === void 0 ? void 0 : _options$targets$.query;

      if (traceId) {
        return this.request("".concat(_constants__WEBPACK_IMPORTED_MODULE_5__["apiPrefix"], "/trace/").concat(encodeURIComponent(traceId))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(responseToDataQueryResponse));
      } else {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(emptyDataQueryResponse);
      }
    }
  }, {
    key: "metadataRequest",
    value: function () {
      var _metadataRequest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(url, params) {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.request(url, params, {
                  hideFromInspector: true
                }).toPromise();

              case 2:
                res = _context.sent;
                return _context.abrupt("return", res.data);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function metadataRequest(_x, _x2) {
        return _metadataRequest.apply(this, arguments);
      }

      return metadataRequest;
    }()
  }, {
    key: "testDatasource",
    value: function () {
      var _testDatasource = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.metadataRequest("".concat(_constants__WEBPACK_IMPORTED_MODULE_5__["apiPrefix"], "/services"));

              case 2:
                return _context2.abrupt("return", true);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function testDatasource() {
        return _testDatasource.apply(this, arguments);
      }

      return testDatasource;
    }()
  }, {
    key: "getQueryDisplayText",
    value: function getQueryDisplayText(query) {
      return query.query;
    }
  }, {
    key: "request",
    value: function request(apiUrl, data, options) {
      // Hack for proxying metadata requests
      var baseUrl = "/api/datasources/proxy/".concat(this.instanceSettings.id);
      var params = data ? Object(_core_utils_fetch__WEBPACK_IMPORTED_MODULE_2__["serializeParams"])(data) : '';
      var url = "".concat(baseUrl).concat(apiUrl).concat(params.length ? "?".concat(params) : '');

      var req = _objectSpread({}, options, {
        url: url
      });

      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_3__["getBackendSrv"])().datasourceRequest(req));
    }
  }]);

  return ZipkinDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourceApi"]);

function responseToDataQueryResponse(response) {
  return {
    data: [new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["MutableDataFrame"]({
      fields: [{
        name: 'trace',
        type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].trace,
        // There is probably better mapping than just putting everything in as a single value but that's how
        // we do it with jaeger and is the simplest right now.
        values: (response === null || response === void 0 ? void 0 : response.data) ? [Object(_utils_transforms__WEBPACK_IMPORTED_MODULE_6__["transformResponse"])(response === null || response === void 0 ? void 0 : response.data)] : []
      }],
      meta: {
        preferredVisualisationType: 'trace'
      }
    })]
  };
}

var emptyDataQueryResponse = {
  data: [new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["MutableDataFrame"]({
    fields: [{
      name: 'trace',
      type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].trace,
      values: []
    }],
    meta: {
      preferredVisualisationType: 'trace'
    }
  })]
};

/***/ }),

/***/ "./public/app/plugins/datasource/zipkin/module.ts":
/*!********************************************************!*\
  !*** ./public/app/plugins/datasource/zipkin/module.ts ***!
  \********************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/zipkin/datasource.ts");
/* harmony import */ var _QueryField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QueryField */ "./public/app/plugins/datasource/zipkin/QueryField.tsx");
/* harmony import */ var _ConfigEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ConfigEditor */ "./public/app/plugins/datasource/zipkin/ConfigEditor.tsx");




var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_1__["ZipkinDatasource"]).setConfigEditor(_ConfigEditor__WEBPACK_IMPORTED_MODULE_3__["ConfigEditor"]).setExploreQueryField(_QueryField__WEBPACK_IMPORTED_MODULE_2__["QueryField"]);

/***/ }),

/***/ "./public/app/plugins/datasource/zipkin/utils/transforms.ts":
/*!******************************************************************!*\
  !*** ./public/app/plugins/datasource/zipkin/utils/transforms.ts ***!
  \******************************************************************/
/*! exports provided: transformResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformResponse", function() { return transformResponse; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }




/**
 * Transforms response to format similar to Jaegers as we use Jaeger ui on the frontend.
 */
function transformResponse(zSpans) {
  return {
    processes: gatherProcesses(zSpans),
    traceID: zSpans[0].traceId,
    spans: zSpans.map(transformSpan),
    warnings: null
  };
}

function transformSpan(span) {
  var _ref, _span$annotations, _span$localEndpoint, _span$remoteEndpoint;

  var jaegerSpan = {
    duration: span.duration,
    // TODO: not sure what this is
    flags: 1,
    logs: (_ref = (_span$annotations = span.annotations) === null || _span$annotations === void 0 ? void 0 : _span$annotations.map(transformAnnotation)) !== null && _ref !== void 0 ? _ref : [],
    operationName: span.name,
    processID: ((_span$localEndpoint = span.localEndpoint) === null || _span$localEndpoint === void 0 ? void 0 : _span$localEndpoint.serviceName) || ((_span$remoteEndpoint = span.remoteEndpoint) === null || _span$remoteEndpoint === void 0 ? void 0 : _span$remoteEndpoint.serviceName) || 'unknown',
    startTime: span.timestamp,
    spanID: span.id,
    traceID: span.traceId,
    warnings: null,
    tags: Object.keys(span.tags || {}).map(function (key) {
      // If tag is error we remap it to simple boolean so that the Jaeger ui will show an error icon.
      return {
        key: key,
        type: key === 'error' ? 'bool' : 'string',
        value: key === 'error' ? true : span.tags[key]
      };
    }),
    references: span.parentId ? [{
      refType: 'CHILD_OF',
      spanID: span.parentId,
      traceID: span.traceId
    }] : []
  };

  if (span.kind) {
    jaegerSpan.tags = [{
      key: 'kind',
      type: 'string',
      value: span.kind
    }].concat(_toConsumableArray(jaegerSpan.tags));
  }

  return jaegerSpan;
}
/**
 * Maps annotations as a Jaeger log as that seems to be the closest thing.
 * See https://zipkin.io/zipkin-api/#/default/get_trace__traceId_
 */


function transformAnnotation(annotation) {
  return {
    timestamp: annotation.timestamp,
    fields: [{
      key: 'annotation',
      type: 'string',
      value: annotation.value
    }]
  };
}

function gatherProcesses(zSpans) {
  var processes = zSpans.reduce(function (acc, span) {
    if (span.localEndpoint) {
      acc.push(endpointToProcess(span.localEndpoint));
    }

    if (span.remoteEndpoint) {
      acc.push(endpointToProcess(span.remoteEndpoint));
    }

    return acc;
  }, []);
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["keyBy"])(processes, 'serviceName');
}

function endpointToProcess(endpoint) {
  return {
    serviceName: endpoint.serviceName,
    tags: [valueToTag('ipv4', endpoint.ipv4, 'string'), valueToTag('ipv6', endpoint.ipv6, 'string'), valueToTag('port', endpoint.port, 'number')].filter(lodash__WEBPACK_IMPORTED_MODULE_0__["identity"])
  };
}

function valueToTag(key, value, type) {
  if (!value) {
    return undefined;
  }

  return {
    key: key,
    type: type,
    value: value
  };
}

/***/ })

}]);
//# sourceMappingURL=zipkinPlugin.1ebdc265fc3bd7452fcd.js.map