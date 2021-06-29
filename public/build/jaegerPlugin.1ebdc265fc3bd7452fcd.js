(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["jaegerPlugin"],{

/***/ "./public/app/plugins/datasource/jaeger/ConfigEditor.tsx":
/*!***************************************************************!*\
  !*** ./public/app/plugins/datasource/jaeger/ConfigEditor.tsx ***!
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
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["DataSourceHttpSettings"], {
    defaultUrl: 'http://localhost:16686',
    dataSourceConfig: options,
    showAccessOptions: true,
    onChange: onOptionsChange
  }));
};

/***/ }),

/***/ "./public/app/plugins/datasource/jaeger/QueryField.tsx":
/*!*************************************************************!*\
  !*** ./public/app/plugins/datasource/jaeger/QueryField.tsx ***!
  \*************************************************************/
/*! exports provided: JaegerQueryField, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JaegerQueryField", function() { return JaegerQueryField; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _core_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/core */ "./public/app/core/core.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var ALL_OPERATIONS_KEY = '__ALL__';
var NO_TRACES_KEY = '__NO_TRACES__';

function findRootSpan(spans) {
  return spans.find(function (s) {
    var _s$references;

    return !((_s$references = s.references) === null || _s$references === void 0 ? void 0 : _s$references.length);
  });
}

function getLabelFromTrace(trace) {
  var rootSpan = findRootSpan(trace.spans);

  if (rootSpan) {
    return "".concat(rootSpan.operationName, " [").concat(rootSpan.duration / 1000, " ms]");
  }

  return trace.traceID;
}

var JaegerQueryField =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(JaegerQueryField, _React$PureComponent);

  function JaegerQueryField(props, context) {
    var _this;

    _classCallCheck(this, JaegerQueryField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JaegerQueryField).call(this, props, context));

    _this.onLoadOptions =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(selectedOptions) {
        var service, operations, allOperationsOption, operationOptions, operationValue, operation, traces, traceOptions;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                service = selectedOptions[0].value;

                if (!(selectedOptions.length === 1)) {
                  _context.next = 12;
                  break;
                }

                _context.next = 4;
                return _this.findOperations(service);

              case 4:
                operations = _context.sent;

                if (_this._isMounted) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return");

              case 7:
                allOperationsOption = {
                  label: '[所有]',
                  value: ALL_OPERATIONS_KEY
                };
                operationOptions = [allOperationsOption].concat(_toConsumableArray(operations.sort().map(function (operation) {
                  return {
                    label: operation,
                    value: operation,
                    isLeaf: false
                  };
                })));

                _this.setState(function (state) {
                  var serviceOptions = state.serviceOptions.map(function (serviceOption) {
                    if (serviceOption.value === service) {
                      return _objectSpread({}, serviceOption, {
                        children: operationOptions
                      });
                    }

                    return serviceOption;
                  });
                  return {
                    serviceOptions: serviceOptions
                  };
                });

                _context.next = 23;
                break;

              case 12:
                if (!(selectedOptions.length === 2)) {
                  _context.next = 23;
                  break;
                }

                // Load traces
                operationValue = selectedOptions[1].value;
                operation = operationValue === ALL_OPERATIONS_KEY ? '' : operationValue;
                _context.next = 17;
                return _this.findTraces(service, operation);

              case 17:
                traces = _context.sent;

                if (_this._isMounted) {
                  _context.next = 20;
                  break;
                }

                return _context.abrupt("return");

              case 20:
                traceOptions = traces.map(function (trace) {
                  return {
                    label: getLabelFromTrace(trace),
                    value: trace.traceID
                  };
                });

                if (traceOptions.length === 0) {
                  traceOptions = [{
                    label: '[时间范围内无痕迹]',
                    value: NO_TRACES_KEY
                  }];
                }

                _this.setState(function (state) {
                  // Place new traces into the correct service/operation sub-tree
                  var serviceOptions = state.serviceOptions.map(function (serviceOption) {
                    if (serviceOption.value === service && serviceOption.children) {
                      var _operationOptions = serviceOption.children.map(function (operationOption) {
                        if (operationOption.value === operationValue) {
                          return _objectSpread({}, operationOption, {
                            children: traceOptions
                          });
                        }

                        return operationOption;
                      });

                      return _objectSpread({}, serviceOption, {
                        children: _operationOptions
                      });
                    }

                    return serviceOption;
                  });
                  return {
                    serviceOptions: serviceOptions
                  };
                });

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.findOperations =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(service) {
        var datasource, url;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                datasource = _this.props.datasource;
                url = "/api/services/".concat(encodeURIComponent(service), "/operations");
                _context2.prev = 2;
                _context2.next = 5;
                return datasource.metadataRequest(url);

              case 5:
                return _context2.abrupt("return", _context2.sent);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](2);
                _core_core__WEBPACK_IMPORTED_MODULE_3__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["AppEvents"].alertError, ['无法从Jaeger加载操作', _context2.t0]);

              case 11:
                return _context2.abrupt("return", []);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 8]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.findTraces =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(service, operation) {
        var datasource, _datasource$getTimeRa, start, end, traceSearch, url;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                datasource = _this.props.datasource;
                _datasource$getTimeRa = datasource.getTimeRange(), start = _datasource$getTimeRa.start, end = _datasource$getTimeRa.end;
                traceSearch = {
                  start: start,
                  end: end,
                  service: service,
                  operation: operation,
                  limit: 10,
                  lookback: '1h',
                  maxDuration: '',
                  minDuration: ''
                };
                url = '/api/traces';
                _context3.prev = 4;
                _context3.next = 7;
                return datasource.metadataRequest(url, traceSearch);

              case 7:
                return _context3.abrupt("return", _context3.sent);

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](4);
                _core_core__WEBPACK_IMPORTED_MODULE_3__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["AppEvents"].alertError, ['无法从Jaeger加载跟踪', _context3.t0]);

              case 13:
                return _context3.abrupt("return", []);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[4, 10]]);
      }));

      return function (_x3, _x4) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.onSelectTrace = function (values, selectedOptions) {
      var _this$props = _this.props,
          query = _this$props.query,
          onChange = _this$props.onChange,
          onRunQuery = _this$props.onRunQuery;

      if (selectedOptions.length === 3) {
        var traceID = selectedOptions[2].value;
        onChange(_objectSpread({}, query, {
          query: traceID
        }));
        onRunQuery();
      }
    };

    _this.state = {
      serviceOptions: []
    };
    return _this;
  }

  _createClass(JaegerQueryField, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true; // We should probably call this periodically to get new services after mount.

      this.getServices();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "getServices",
    value: function () {
      var _getServices = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var url, datasource, services, serviceOptions;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                url = '/api/services';
                datasource = this.props.datasource;
                _context4.prev = 2;
                _context4.next = 5;
                return datasource.metadataRequest(url);

              case 5:
                services = _context4.sent;

                if (this._isMounted) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return");

              case 8:
                if (services) {
                  serviceOptions = services.sort().map(function (service) {
                    return {
                      label: service,
                      value: service,
                      isLeaf: false
                    };
                  });
                  this.setState({
                    serviceOptions: serviceOptions
                  });
                }

                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](2);
                _core_core__WEBPACK_IMPORTED_MODULE_3__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["AppEvents"].alertError, ['Failed to load services from Jaeger', _context4.t0]);

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 11]]);
      }));

      function getServices() {
        return _getServices.apply(this, arguments);
      }

      return getServices;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          query = _this$props2.query,
          _onChange = _this$props2.onChange;
      var serviceOptions = this.state.serviceOptions;
      var cascaderOptions = serviceOptions && serviceOptions.length ? serviceOptions : noTracesFoundOptions;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline gf-form-inline--nowrap"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form flex-shrink-0"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["ButtonCascader"], {
        options: cascaderOptions,
        onChange: this.onSelectTrace,
        loadData: this.onLoadOptions
      }, "\u8FFD\u8E2A")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
    }
  }]);

  return JaegerQueryField;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);
var noTracesFoundOptions = [{
  label: '没有发现踪迹',
  value: 'no_traces',
  isLeaf: true // Cannot be disabled because then cascader shows 'loading' for some reason.
  // disabled: true,

}];
/* harmony default export */ __webpack_exports__["default"] = (JaegerQueryField);

/***/ }),

/***/ "./public/app/plugins/datasource/jaeger/datasource.ts":
/*!************************************************************!*\
  !*** ./public/app/plugins/datasource/jaeger/datasource.ts ***!
  \************************************************************/
/*! exports provided: JaegerDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JaegerDatasource", function() { return JaegerDatasource; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/features/dashboard/services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");
/* harmony import */ var app_core_utils_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/utils/fetch */ "./public/app/core/utils/fetch.ts");
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







var JaegerDatasource =
/*#__PURE__*/
function (_DataSourceApi) {
  _inherits(JaegerDatasource, _DataSourceApi);

  function JaegerDatasource(instanceSettings) {
    var _this;

    _classCallCheck(this, JaegerDatasource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JaegerDatasource).call(this, instanceSettings));
    _this.instanceSettings = instanceSettings;
    return _this;
  }

  _createClass(JaegerDatasource, [{
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
                return this._request(url, params, {
                  hideFromInspector: true
                }).toPromise();

              case 2:
                res = _context.sent;
                return _context.abrupt("return", res.data.data);

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
    key: "query",
    value: function query(options) {
      var _options$targets$;

      // At this moment we expect only one target. In case we somehow change the UI to be able to show multiple
      // traces at one we need to change this.
      var id = (_options$targets$ = options.targets[0]) === null || _options$targets$ === void 0 ? void 0 : _options$targets$.query;

      if (id) {
        // TODO: this api is internal, used in jaeger ui. Officially they have gRPC api that should be used.
        return this._request("/api/traces/".concat(encodeURIComponent(id))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
          var _response$data;

          return {
            data: [new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["MutableDataFrame"]({
              fields: [{
                name: 'trace',
                type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].trace,
                values: (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.data) || []
              }],
              meta: {
                preferredVisualisationType: 'trace'
              }
            })]
          };
        }));
      } else {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({
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
        });
      }
    }
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
                return _context2.abrupt("return", true);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function testDatasource() {
        return _testDatasource.apply(this, arguments);
      }

      return testDatasource;
    }()
  }, {
    key: "getTimeRange",
    value: function getTimeRange() {
      var range = Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_4__["getTimeSrv"])().timeRange();
      return {
        start: getTime(range.from, false),
        end: getTime(range.to, true)
      };
    }
  }, {
    key: "getQueryDisplayText",
    value: function getQueryDisplayText(query) {
      return query.query;
    }
  }, {
    key: "_request",
    value: function _request(apiUrl, data, options) {
      // Hack for proxying metadata requests
      var baseUrl = "/api/datasources/proxy/".concat(this.instanceSettings.id);
      var params = data ? Object(app_core_utils_fetch__WEBPACK_IMPORTED_MODULE_5__["serializeParams"])(data) : '';
      var url = "".concat(baseUrl).concat(apiUrl).concat(params.length ? "?".concat(params) : '');

      var req = _objectSpread({}, options, {
        url: url
      });

      return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().datasourceRequest(req));
    }
  }]);

  return JaegerDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourceApi"]);

function getTime(date, roundUp) {
  if (typeof date === 'string') {
    date = _grafana_data__WEBPACK_IMPORTED_MODULE_0__["dateMath"].parse(date, roundUp);
  }

  return date.valueOf() * 1000;
}

/***/ }),

/***/ "./public/app/plugins/datasource/jaeger/module.ts":
/*!********************************************************!*\
  !*** ./public/app/plugins/datasource/jaeger/module.ts ***!
  \********************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/jaeger/datasource.ts");
/* harmony import */ var _QueryField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QueryField */ "./public/app/plugins/datasource/jaeger/QueryField.tsx");
/* harmony import */ var _ConfigEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ConfigEditor */ "./public/app/plugins/datasource/jaeger/ConfigEditor.tsx");




var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_1__["JaegerDatasource"]).setConfigEditor(_ConfigEditor__WEBPACK_IMPORTED_MODULE_3__["ConfigEditor"]).setExploreQueryField(_QueryField__WEBPACK_IMPORTED_MODULE_2__["JaegerQueryField"]);

/***/ })

}]);
//# sourceMappingURL=jaegerPlugin.1ebdc265fc3bd7452fcd.js.map