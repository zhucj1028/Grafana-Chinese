(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cloudMonitoringPlugin"],{

/***/ "./public/app/plugins/datasource/cloud-monitoring/CloudMonitoringMetricFindQuery.ts":
/*!******************************************************************************************!*\
  !*** ./public/app/plugins/datasource/cloud-monitoring/CloudMonitoringMetricFindQuery.ts ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CloudMonitoringMetricFindQuery; });
/* harmony import */ var lodash_isString__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isString */ "./node_modules/lodash/isString.js");
/* harmony import */ var lodash_isString__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isString__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./public/app/plugins/datasource/cloud-monitoring/constants.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./public/app/plugins/datasource/cloud-monitoring/types.ts");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./functions */ "./public/app/plugins/datasource/cloud-monitoring/functions.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var CloudMonitoringMetricFindQuery =
/*#__PURE__*/
function () {
  function CloudMonitoringMetricFindQuery(datasource) {
    _classCallCheck(this, CloudMonitoringMetricFindQuery);

    this.datasource = datasource;
  }

  _createClass(CloudMonitoringMetricFindQuery, [{
    key: "execute",
    value: function () {
      var _execute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(query) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!query.projectName) {
                  query.projectName = this.datasource.getDefaultProject();
                }

                _context.t0 = query.selectedQueryType;
                _context.next = _context.t0 === _types__WEBPACK_IMPORTED_MODULE_2__["MetricFindQueryTypes"].Projects ? 5 : _context.t0 === _types__WEBPACK_IMPORTED_MODULE_2__["MetricFindQueryTypes"].Services ? 6 : _context.t0 === _types__WEBPACK_IMPORTED_MODULE_2__["MetricFindQueryTypes"].MetricTypes ? 7 : _context.t0 === _types__WEBPACK_IMPORTED_MODULE_2__["MetricFindQueryTypes"].LabelKeys ? 8 : _context.t0 === _types__WEBPACK_IMPORTED_MODULE_2__["MetricFindQueryTypes"].LabelValues ? 9 : _context.t0 === _types__WEBPACK_IMPORTED_MODULE_2__["MetricFindQueryTypes"].ResourceTypes ? 10 : _context.t0 === _types__WEBPACK_IMPORTED_MODULE_2__["MetricFindQueryTypes"].Aligners ? 11 : _context.t0 === _types__WEBPACK_IMPORTED_MODULE_2__["MetricFindQueryTypes"].AlignmentPeriods ? 12 : _context.t0 === _types__WEBPACK_IMPORTED_MODULE_2__["MetricFindQueryTypes"].Aggregations ? 13 : _context.t0 === _types__WEBPACK_IMPORTED_MODULE_2__["MetricFindQueryTypes"].SLOServices ? 14 : _context.t0 === _types__WEBPACK_IMPORTED_MODULE_2__["MetricFindQueryTypes"].SLO ? 15 : _context.t0 === _types__WEBPACK_IMPORTED_MODULE_2__["MetricFindQueryTypes"].Selectors ? 16 : 17;
                break;

              case 5:
                return _context.abrupt("return", this.handleProjectsQuery());

              case 6:
                return _context.abrupt("return", this.handleServiceQuery(query));

              case 7:
                return _context.abrupt("return", this.handleMetricTypesQuery(query));

              case 8:
                return _context.abrupt("return", this.handleLabelKeysQuery(query));

              case 9:
                return _context.abrupt("return", this.handleLabelValuesQuery(query));

              case 10:
                return _context.abrupt("return", this.handleResourceTypeQuery(query));

              case 11:
                return _context.abrupt("return", this.handleAlignersQuery(query));

              case 12:
                return _context.abrupt("return", this.handleAlignmentPeriodQuery());

              case 13:
                return _context.abrupt("return", this.handleAggregationQuery(query));

              case 14:
                return _context.abrupt("return", this.handleSLOServicesQuery(query));

              case 15:
                return _context.abrupt("return", this.handleSLOQuery(query));

              case 16:
                return _context.abrupt("return", this.handleSelectorQuery());

              case 17:
                return _context.abrupt("return", []);

              case 18:
                _context.next = 24;
                break;

              case 20:
                _context.prev = 20;
                _context.t1 = _context["catch"](0);
                console.error("Could not run CloudMonitoringMetricFindQuery ".concat(query), _context.t1);
                return _context.abrupt("return", []);

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 20]]);
      }));

      function execute(_x) {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }, {
    key: "handleProjectsQuery",
    value: function () {
      var _handleProjectsQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var projects;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.datasource.getProjects();

              case 2:
                projects = _context2.sent;
                return _context2.abrupt("return", projects.map(function (s) {
                  return {
                    text: s.label,
                    value: s.value,
                    expandable: true
                  };
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleProjectsQuery() {
        return _handleProjectsQuery.apply(this, arguments);
      }

      return handleProjectsQuery;
    }()
  }, {
    key: "handleServiceQuery",
    value: function () {
      var _handleServiceQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(_ref) {
        var projectName, metricDescriptors, services;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                projectName = _ref.projectName;
                _context3.next = 3;
                return this.datasource.getMetricTypes(projectName);

              case 3:
                metricDescriptors = _context3.sent;
                services = Object(_functions__WEBPACK_IMPORTED_MODULE_3__["extractServicesFromMetricDescriptors"])(metricDescriptors);
                return _context3.abrupt("return", services.map(function (s) {
                  return {
                    text: s.serviceShortName,
                    value: s.service,
                    expandable: true
                  };
                }));

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function handleServiceQuery(_x2) {
        return _handleServiceQuery.apply(this, arguments);
      }

      return handleServiceQuery;
    }()
  }, {
    key: "handleMetricTypesQuery",
    value: function () {
      var _handleMetricTypesQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref2) {
        var selectedService, projectName, metricDescriptors;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                selectedService = _ref2.selectedService, projectName = _ref2.projectName;

                if (selectedService) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", []);

              case 3:
                _context4.next = 5;
                return this.datasource.getMetricTypes(projectName);

              case 5:
                metricDescriptors = _context4.sent;
                return _context4.abrupt("return", Object(_functions__WEBPACK_IMPORTED_MODULE_3__["getMetricTypesByService"])(metricDescriptors, this.datasource.templateSrv.replace(selectedService)).map(function (s) {
                  return {
                    text: s.displayName,
                    value: s.type,
                    expandable: true
                  };
                }));

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function handleMetricTypesQuery(_x3) {
        return _handleMetricTypesQuery.apply(this, arguments);
      }

      return handleMetricTypesQuery;
    }()
  }, {
    key: "handleLabelKeysQuery",
    value: function () {
      var _handleLabelKeysQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(_ref3) {
        var selectedMetricType, projectName, labelKeys;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                selectedMetricType = _ref3.selectedMetricType, projectName = _ref3.projectName;

                if (selectedMetricType) {
                  _context5.next = 3;
                  break;
                }

                return _context5.abrupt("return", []);

              case 3:
                _context5.next = 5;
                return Object(_functions__WEBPACK_IMPORTED_MODULE_3__["getLabelKeys"])(this.datasource, selectedMetricType, projectName);

              case 5:
                labelKeys = _context5.sent;
                return _context5.abrupt("return", labelKeys.map(this.toFindQueryResult));

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function handleLabelKeysQuery(_x4) {
        return _handleLabelKeysQuery.apply(this, arguments);
      }

      return handleLabelKeysQuery;
    }()
  }, {
    key: "handleLabelValuesQuery",
    value: function () {
      var _handleLabelValuesQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(_ref4) {
        var selectedMetricType, labelKey, projectName, refId, labels, interpolatedKey, values;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                selectedMetricType = _ref4.selectedMetricType, labelKey = _ref4.labelKey, projectName = _ref4.projectName;

                if (selectedMetricType) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return", []);

              case 3:
                refId = 'handleLabelValuesQuery';
                _context6.next = 6;
                return this.datasource.getLabels(selectedMetricType, refId, projectName, [labelKey]);

              case 6:
                labels = _context6.sent;
                interpolatedKey = this.datasource.templateSrv.replace(labelKey);
                values = labels.hasOwnProperty(interpolatedKey) ? labels[interpolatedKey] : [];
                return _context6.abrupt("return", values.map(this.toFindQueryResult));

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function handleLabelValuesQuery(_x5) {
        return _handleLabelValuesQuery.apply(this, arguments);
      }

      return handleLabelValuesQuery;
    }()
  }, {
    key: "handleResourceTypeQuery",
    value: function () {
      var _handleResourceTypeQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(_ref5) {
        var selectedMetricType, projectName, refId, labels;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                selectedMetricType = _ref5.selectedMetricType, projectName = _ref5.projectName;

                if (selectedMetricType) {
                  _context7.next = 3;
                  break;
                }

                return _context7.abrupt("return", []);

              case 3:
                refId = 'handleResourceTypeQueryQueryType';
                _context7.next = 6;
                return this.datasource.getLabels(selectedMetricType, refId, projectName);

              case 6:
                labels = _context7.sent;
                return _context7.abrupt("return", labels['resource.type'].map(this.toFindQueryResult));

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function handleResourceTypeQuery(_x6) {
        return _handleResourceTypeQuery.apply(this, arguments);
      }

      return handleResourceTypeQuery;
    }()
  }, {
    key: "handleAlignersQuery",
    value: function () {
      var _handleAlignersQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(_ref6) {
        var _this = this;

        var selectedMetricType, projectName, metricDescriptors, descriptor;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                selectedMetricType = _ref6.selectedMetricType, projectName = _ref6.projectName;

                if (selectedMetricType) {
                  _context8.next = 3;
                  break;
                }

                return _context8.abrupt("return", []);

              case 3:
                _context8.next = 5;
                return this.datasource.getMetricTypes(projectName);

              case 5:
                metricDescriptors = _context8.sent;
                descriptor = metricDescriptors.find(function (m) {
                  return m.type === _this.datasource.templateSrv.replace(selectedMetricType);
                });

                if (descriptor) {
                  _context8.next = 9;
                  break;
                }

                return _context8.abrupt("return", []);

              case 9:
                return _context8.abrupt("return", Object(_functions__WEBPACK_IMPORTED_MODULE_3__["getAlignmentOptionsByMetric"])(descriptor.valueType, descriptor.metricKind).map(this.toFindQueryResult));

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function handleAlignersQuery(_x7) {
        return _handleAlignersQuery.apply(this, arguments);
      }

      return handleAlignersQuery;
    }()
  }, {
    key: "handleAggregationQuery",
    value: function () {
      var _handleAggregationQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(_ref7) {
        var _this2 = this;

        var selectedMetricType, projectName, metricDescriptors, descriptor;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                selectedMetricType = _ref7.selectedMetricType, projectName = _ref7.projectName;

                if (selectedMetricType) {
                  _context9.next = 3;
                  break;
                }

                return _context9.abrupt("return", []);

              case 3:
                _context9.next = 5;
                return this.datasource.getMetricTypes(projectName);

              case 5:
                metricDescriptors = _context9.sent;
                descriptor = metricDescriptors.find(function (m) {
                  return m.type === _this2.datasource.templateSrv.replace(selectedMetricType);
                });

                if (descriptor) {
                  _context9.next = 9;
                  break;
                }

                return _context9.abrupt("return", []);

              case 9:
                return _context9.abrupt("return", Object(_functions__WEBPACK_IMPORTED_MODULE_3__["getAggregationOptionsByMetric"])(descriptor.valueType, descriptor.metricKind).map(this.toFindQueryResult));

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function handleAggregationQuery(_x8) {
        return _handleAggregationQuery.apply(this, arguments);
      }

      return handleAggregationQuery;
    }()
  }, {
    key: "handleSLOServicesQuery",
    value: function () {
      var _handleSLOServicesQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(_ref8) {
        var projectName, services;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                projectName = _ref8.projectName;
                _context10.next = 3;
                return this.datasource.getSLOServices(projectName);

              case 3:
                services = _context10.sent;
                return _context10.abrupt("return", services.map(this.toFindQueryResult));

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function handleSLOServicesQuery(_x9) {
        return _handleSLOServicesQuery.apply(this, arguments);
      }

      return handleSLOServicesQuery;
    }()
  }, {
    key: "handleSLOQuery",
    value: function () {
      var _handleSLOQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(_ref9) {
        var selectedSLOService, projectName, slos;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                selectedSLOService = _ref9.selectedSLOService, projectName = _ref9.projectName;
                _context11.next = 3;
                return this.datasource.getServiceLevelObjectives(projectName, selectedSLOService);

              case 3:
                slos = _context11.sent;
                return _context11.abrupt("return", slos.map(this.toFindQueryResult));

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function handleSLOQuery(_x10) {
        return _handleSLOQuery.apply(this, arguments);
      }

      return handleSLOQuery;
    }()
  }, {
    key: "handleSelectorQuery",
    value: function () {
      var _handleSelectorQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt("return", _constants__WEBPACK_IMPORTED_MODULE_1__["selectors"].map(this.toFindQueryResult));

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function handleSelectorQuery() {
        return _handleSelectorQuery.apply(this, arguments);
      }

      return handleSelectorQuery;
    }()
  }, {
    key: "handleAlignmentPeriodQuery",
    value: function handleAlignmentPeriodQuery() {
      return _constants__WEBPACK_IMPORTED_MODULE_1__["alignmentPeriods"].map(this.toFindQueryResult);
    }
  }, {
    key: "toFindQueryResult",
    value: function toFindQueryResult(x) {
      return lodash_isString__WEBPACK_IMPORTED_MODULE_0___default()(x) ? {
        text: x,
        expandable: true
      } : _objectSpread({}, x, {
        expandable: true
      });
    }
  }]);

  return CloudMonitoringMetricFindQuery;
}();



/***/ }),

/***/ "./public/app/plugins/datasource/cloud-monitoring/annotations_query_ctrl.ts":
/*!**********************************************************************************!*\
  !*** ./public/app/plugins/datasource/cloud-monitoring/annotations_query_ctrl.ts ***!
  \**********************************************************************************/
/*! exports provided: CloudMonitoringAnnotationsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudMonitoringAnnotationsQueryCtrl", function() { return CloudMonitoringAnnotationsQueryCtrl; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CloudMonitoringAnnotationsQueryCtrl =
/*#__PURE__*/
function () {
  /** @ngInject */
  function CloudMonitoringAnnotationsQueryCtrl() {
    _classCallCheck(this, CloudMonitoringAnnotationsQueryCtrl);

    this.annotation.target = this.annotation.target || {};
    this.onQueryChange = this.onQueryChange.bind(this);
  }

  _createClass(CloudMonitoringAnnotationsQueryCtrl, [{
    key: "onQueryChange",
    value: function onQueryChange(target) {
      Object.assign(this.annotation.target, target);
    }
  }]);

  return CloudMonitoringAnnotationsQueryCtrl;
}();
CloudMonitoringAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';

/***/ }),

/***/ "./public/app/plugins/datasource/cloud-monitoring/api.ts":
/*!***************************************************************!*\
  !*** ./public/app/plugins/datasource/cloud-monitoring/api.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Api; });
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./functions */ "./public/app/plugins/datasource/cloud-monitoring/functions.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var Api =
/*#__PURE__*/
function () {
  function Api(baseUrl) {
    _classCallCheck(this, Api);

    this.baseUrl = baseUrl;
    this.cache = {};
    this.defaultOptions = {
      useCache: true,
      responseMap: function responseMap(res) {
        return res;
      },
      baseUrl: this.baseUrl
    };
  }

  _createClass(Api, [{
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(path, options) {
        var _this$defaultOptions$, useCache, responseMap, _baseUrl, response, responsePropName, _res;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _this$defaultOptions$ = _objectSpread({}, this.defaultOptions, {}, options), useCache = _this$defaultOptions$.useCache, responseMap = _this$defaultOptions$.responseMap, _baseUrl = _this$defaultOptions$.baseUrl;

                if (!(useCache && this.cache[path])) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", this.cache[path]);

              case 4:
                _context.next = 6;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().datasourceRequest({
                  url: _baseUrl + path,
                  method: 'GET'
                });

              case 6:
                response = _context.sent;
                responsePropName = path.match(/([^\/]*)\/*$/)[1];
                _res = [];

                if (response && response.data && response.data[responsePropName]) {
                  _res = response.data[responsePropName].map(responseMap);
                }

                if (useCache) {
                  this.cache[path] = _res;
                }

                return _context.abrupt("return", _res);

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](0);
                app_core_app_events__WEBPACK_IMPORTED_MODULE_0__["default"].emit(app_types__WEBPACK_IMPORTED_MODULE_1__["CoreEvents"].dsRequestError, {
                  error: {
                    data: {
                      error: Object(_functions__WEBPACK_IMPORTED_MODULE_3__["formatCloudMonitoringError"])(_context.t0)
                    }
                  }
                });
                return _context.abrupt("return", []);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 14]]);
      }));

      function get(_x, _x2) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(data) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().datasourceRequest({
                  url: '/api/tsdb/query',
                  method: 'POST',
                  data: data
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function post(_x3) {
        return _post.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: "test",
    value: function () {
      var _test = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(projectName) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().datasourceRequest({
                  url: "".concat(this.baseUrl).concat(projectName, "/metricDescriptors"),
                  method: 'GET'
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function test(_x4) {
        return _test.apply(this, arguments);
      }

      return test;
    }()
  }]);

  return Api;
}();



/***/ }),

/***/ "./public/app/plugins/datasource/cloud-monitoring/components/VariableQueryEditor.tsx":
/*!*******************************************************************************************!*\
  !*** ./public/app/plugins/datasource/cloud-monitoring/components/VariableQueryEditor.tsx ***!
  \*******************************************************************************************/
/*! exports provided: CloudMonitoringVariableQueryEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudMonitoringVariableQueryEditor", function() { return CloudMonitoringVariableQueryEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./public/app/plugins/datasource/cloud-monitoring/components/index.ts");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../functions */ "./public/app/plugins/datasource/cloud-monitoring/functions.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types */ "./public/app/plugins/datasource/cloud-monitoring/types.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var CloudMonitoringVariableQueryEditor =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(CloudMonitoringVariableQueryEditor, _PureComponent);

  function CloudMonitoringVariableQueryEditor(props) {
    var _this;

    _classCallCheck(this, CloudMonitoringVariableQueryEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CloudMonitoringVariableQueryEditor).call(this, props));
    _this.queryTypes = [{
      value: _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].Projects,
      name: 'Projects'
    }, {
      value: _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].Services,
      name: 'Services'
    }, {
      value: _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].MetricTypes,
      name: 'Metric Types'
    }, {
      value: _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].LabelKeys,
      name: 'Label Keys'
    }, {
      value: _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].LabelValues,
      name: 'Label Values'
    }, {
      value: _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].ResourceTypes,
      name: 'Resource Types'
    }, {
      value: _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].Aggregations,
      name: 'Aggregations'
    }, {
      value: _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].Aligners,
      name: 'Aligners'
    }, {
      value: _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].AlignmentPeriods,
      name: 'Alignment Periods'
    }, {
      value: _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].Selectors,
      name: 'Selectors'
    }, {
      value: _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].SLOServices,
      name: 'SLO Services'
    }, {
      value: _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].SLO,
      name: 'Service Level Objectives (SLO)'
    }];
    _this.defaults = {
      selectedQueryType: _this.queryTypes[0].value,
      metricDescriptors: [],
      selectedService: '',
      selectedMetricType: '',
      labels: [],
      labelKey: '',
      metricTypes: [],
      services: [],
      sloServices: [],
      selectedSLOService: '',
      projects: [],
      projectName: '',
      loading: true
    };

    _this.onPropsChange = function () {
      var _this$state = _this.state,
          metricDescriptors = _this$state.metricDescriptors,
          labels = _this$state.labels,
          metricTypes = _this$state.metricTypes,
          services = _this$state.services,
          queryModel = _objectWithoutProperties(_this$state, ["metricDescriptors", "labels", "metricTypes", "services"]);

      var query = _this.queryTypes.find(function (q) {
        return q.value === _this.state.selectedQueryType;
      });

      _this.props.onChange(queryModel, "Google Cloud Monitoring - ".concat(query.name));
    };

    _this.state = Object.assign(_this.defaults, {
      projectName: _this.props.datasource.getDefaultProject()
    }, _this.props.query);
    return _this;
  }

  _createClass(CloudMonitoringVariableQueryEditor, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var projects, metricDescriptors, services, selectedService, _getMetricTypes, metricTypes, selectedMetricType, sloServices, state;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.props.datasource.getProjects();

              case 2:
                projects = _context.sent;
                _context.next = 5;
                return this.props.datasource.getMetricTypes(this.props.query.projectName || this.props.datasource.getDefaultProject());

              case 5:
                metricDescriptors = _context.sent;
                services = Object(_functions__WEBPACK_IMPORTED_MODULE_2__["extractServicesFromMetricDescriptors"])(metricDescriptors).map(function (m) {
                  return {
                    value: m.service,
                    name: m.serviceShortName
                  };
                });
                selectedService = '';

                if (services.some(function (s) {
                  return s.value === _this2.props.templateSrv.replace(_this2.state.selectedService);
                })) {
                  selectedService = this.state.selectedService;
                } else if (services && services.length > 0) {
                  selectedService = services[0].value;
                }

                _getMetricTypes = Object(_functions__WEBPACK_IMPORTED_MODULE_2__["getMetricTypes"])(metricDescriptors, this.state.selectedMetricType, this.props.templateSrv.replace(this.state.selectedMetricType), this.props.templateSrv.replace(selectedService)), metricTypes = _getMetricTypes.metricTypes, selectedMetricType = _getMetricTypes.selectedMetricType;
                _context.next = 12;
                return this.props.datasource.getSLOServices(this.state.projectName);

              case 12:
                sloServices = _context.sent;
                _context.t0 = _objectSpread;
                _context.t1 = {
                  services: services,
                  selectedService: selectedService,
                  metricTypes: metricTypes,
                  selectedMetricType: selectedMetricType,
                  metricDescriptors: metricDescriptors,
                  projects: projects.map(function (_ref) {
                    var value = _ref.value,
                        label = _ref.label;
                    return {
                      value: value,
                      name: label
                    };
                  })
                };
                _context.next = 17;
                return this.getLabels(selectedMetricType, this.state.projectName);

              case 17:
                _context.t2 = _context.sent;
                _context.t3 = {
                  sloServices: sloServices.map(function (_ref2) {
                    var value = _ref2.value,
                        label = _ref2.label;
                    return {
                      value: value,
                      name: label
                    };
                  }),
                  loading: false
                };
                state = (0, _context.t0)(_context.t1, _context.t2, _context.t3);
                this.setState(state, function () {
                  return _this2.onPropsChange();
                });

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "onQueryTypeChange",
    value: function () {
      var _onQueryTypeChange = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(queryType) {
        var state;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = _objectSpread;
                _context2.t1 = {
                  selectedQueryType: queryType
                };
                _context2.next = 4;
                return this.getLabels(this.state.selectedMetricType, this.state.projectName, queryType);

              case 4:
                _context2.t2 = _context2.sent;
                state = (0, _context2.t0)(_context2.t1, _context2.t2);
                this.setState(state);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onQueryTypeChange(_x) {
        return _onQueryTypeChange.apply(this, arguments);
      }

      return onQueryTypeChange;
    }()
  }, {
    key: "onProjectChange",
    value: function () {
      var _onProjectChange = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(projectName) {
        var metricDescriptors, labels, _getMetricTypes2, metricTypes, selectedMetricType, sloServices;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.props.datasource.getMetricTypes(projectName);

              case 2:
                metricDescriptors = _context3.sent;
                _context3.next = 5;
                return this.getLabels(this.state.selectedMetricType, projectName);

              case 5:
                labels = _context3.sent;
                _getMetricTypes2 = Object(_functions__WEBPACK_IMPORTED_MODULE_2__["getMetricTypes"])(metricDescriptors, this.state.selectedMetricType, this.props.templateSrv.replace(this.state.selectedMetricType), this.props.templateSrv.replace(this.state.selectedService)), metricTypes = _getMetricTypes2.metricTypes, selectedMetricType = _getMetricTypes2.selectedMetricType;
                _context3.next = 9;
                return this.props.datasource.getSLOServices(projectName);

              case 9:
                sloServices = _context3.sent;
                this.setState(_objectSpread({}, labels, {
                  metricTypes: metricTypes,
                  selectedMetricType: selectedMetricType,
                  metricDescriptors: metricDescriptors,
                  projectName: projectName,
                  sloServices: sloServices.map(function (_ref3) {
                    var value = _ref3.value,
                        label = _ref3.label;
                    return {
                      value: value,
                      name: label
                    };
                  })
                }));

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onProjectChange(_x2) {
        return _onProjectChange.apply(this, arguments);
      }

      return onProjectChange;
    }()
  }, {
    key: "onServiceChange",
    value: function () {
      var _onServiceChange = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(service) {
        var _getMetricTypes3, metricTypes, selectedMetricType, state;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _getMetricTypes3 = Object(_functions__WEBPACK_IMPORTED_MODULE_2__["getMetricTypes"])(this.state.metricDescriptors, this.state.selectedMetricType, this.props.templateSrv.replace(this.state.selectedMetricType), this.props.templateSrv.replace(service)), metricTypes = _getMetricTypes3.metricTypes, selectedMetricType = _getMetricTypes3.selectedMetricType;
                _context4.t0 = _objectSpread;
                _context4.t1 = {
                  selectedService: service,
                  metricTypes: metricTypes,
                  selectedMetricType: selectedMetricType
                };
                _context4.next = 5;
                return this.getLabels(selectedMetricType, this.state.projectName);

              case 5:
                _context4.t2 = _context4.sent;
                state = (0, _context4.t0)(_context4.t1, _context4.t2);
                this.setState(state);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function onServiceChange(_x3) {
        return _onServiceChange.apply(this, arguments);
      }

      return onServiceChange;
    }()
  }, {
    key: "onMetricTypeChange",
    value: function () {
      var _onMetricTypeChange = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(metricType) {
        var state;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t0 = _objectSpread;
                _context5.t1 = {
                  selectedMetricType: metricType
                };
                _context5.next = 4;
                return this.getLabels(metricType, this.state.projectName);

              case 4:
                _context5.t2 = _context5.sent;
                state = (0, _context5.t0)(_context5.t1, _context5.t2);
                this.setState(state);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function onMetricTypeChange(_x4) {
        return _onMetricTypeChange.apply(this, arguments);
      }

      return onMetricTypeChange;
    }()
  }, {
    key: "onLabelKeyChange",
    value: function onLabelKeyChange(labelKey) {
      var _this3 = this;

      this.setState({
        labelKey: labelKey
      }, function () {
        return _this3.onPropsChange();
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var selecQueryTypeChanged = prevState.selectedQueryType !== this.state.selectedQueryType;
      var selectSLOServiceChanged = this.state.selectedSLOService !== prevState.selectedSLOService;

      if (selecQueryTypeChanged || selectSLOServiceChanged) {
        this.onPropsChange();
      }
    }
  }, {
    key: "getLabels",
    value: function () {
      var _getLabels = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(selectedMetricType, projectName) {
        var _this4 = this;

        var selectedQueryType,
            result,
            labels,
            labelKey,
            _args6 = arguments;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                selectedQueryType = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : this.state.selectedQueryType;
                result = {
                  labels: this.state.labels,
                  labelKey: this.state.labelKey
                };

                if (!(selectedMetricType && selectedQueryType === _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].LabelValues)) {
                  _context6.next = 8;
                  break;
                }

                _context6.next = 5;
                return Object(_functions__WEBPACK_IMPORTED_MODULE_2__["getLabelKeys"])(this.props.datasource, selectedMetricType, projectName);

              case 5:
                labels = _context6.sent;
                labelKey = labels.some(function (l) {
                  return l === _this4.props.templateSrv.replace(_this4.state.labelKey);
                }) ? this.state.labelKey : labels[0];
                result = {
                  labels: labels,
                  labelKey: labelKey
                };

              case 8:
                return _context6.abrupt("return", result);

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getLabels(_x5, _x6) {
        return _getLabels.apply(this, arguments);
      }

      return getLabels;
    }()
  }, {
    key: "insertTemplateVariables",
    value: function insertTemplateVariables(options) {
      var templateVariables = this.props.templateSrv.getVariables().map(function (v) {
        return {
          name: "$".concat(v.name),
          value: "$".concat(v.name)
        };
      });
      return [].concat(_toConsumableArray(templateVariables), _toConsumableArray(options));
    }
  }, {
    key: "renderQueryTypeSwitch",
    value: function renderQueryTypeSwitch(queryType) {
      var _this5 = this;

      switch (queryType) {
        case _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].MetricTypes:
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_1__["SimpleSelect"], {
            value: this.state.projectName,
            options: this.insertTemplateVariables(this.state.projects),
            onValueChange: function onValueChange(e) {
              return _this5.onProjectChange(e.target.value);
            },
            label: "\u9879\u76EE"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_1__["SimpleSelect"], {
            value: this.state.selectedService,
            options: this.insertTemplateVariables(this.state.services),
            onValueChange: function onValueChange(e) {
              return _this5.onServiceChange(e.target.value);
            },
            label: "\u670D\u52A1"
          }));

        case _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].LabelKeys:
        case _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].LabelValues:
        case _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].ResourceTypes:
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_1__["SimpleSelect"], {
            value: this.state.projectName,
            options: this.insertTemplateVariables(this.state.projects),
            onValueChange: function onValueChange(e) {
              return _this5.onProjectChange(e.target.value);
            },
            label: "\u9879\u76EE"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_1__["SimpleSelect"], {
            value: this.state.selectedService,
            options: this.insertTemplateVariables(this.state.services),
            onValueChange: function onValueChange(e) {
              return _this5.onServiceChange(e.target.value);
            },
            label: "\u670D\u52A1"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_1__["SimpleSelect"], {
            value: this.state.selectedMetricType,
            options: this.insertTemplateVariables(this.state.metricTypes),
            onValueChange: function onValueChange(e) {
              return _this5.onMetricTypeChange(e.target.value);
            },
            label: "\u6307\u6807\u7C7B\u578B"
          }), queryType === _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].LabelValues && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_1__["SimpleSelect"], {
            value: this.state.labelKey,
            options: this.insertTemplateVariables(this.state.labels.map(function (l) {
              return {
                value: l,
                name: l
              };
            })),
            onValueChange: function onValueChange(e) {
              return _this5.onLabelKeyChange(e.target.value);
            },
            label: "\u6807\u7B7E\u952E"
          }));

        case _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].Aligners:
        case _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].Aggregations:
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_1__["SimpleSelect"], {
            value: this.state.selectedService,
            options: this.insertTemplateVariables(this.state.services),
            onValueChange: function onValueChange(e) {
              return _this5.onServiceChange(e.target.value);
            },
            label: "\u670D\u52A1"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_1__["SimpleSelect"], {
            value: this.state.selectedMetricType,
            options: this.insertTemplateVariables(this.state.metricTypes),
            onValueChange: function onValueChange(e) {
              return _this5.onMetricTypeChange(e.target.value);
            },
            label: "\u6307\u6807\u7C7B\u578B"
          }));

        case _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].SLOServices:
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_1__["SimpleSelect"], {
            value: this.state.projectName,
            options: this.insertTemplateVariables(this.state.projects),
            onValueChange: function onValueChange(e) {
              return _this5.onProjectChange(e.target.value);
            },
            label: "\u9879\u76EE"
          }));

        case _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].SLO:
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_1__["SimpleSelect"], {
            value: this.state.projectName,
            options: this.insertTemplateVariables(this.state.projects),
            onValueChange: function onValueChange(e) {
              return _this5.onProjectChange(e.target.value);
            },
            label: "\u9879\u76EE"
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_1__["SimpleSelect"], {
            value: this.state.selectedSLOService,
            options: this.insertTemplateVariables(this.state.sloServices),
            onValueChange: function onValueChange(e) {
              _this5.setState(_objectSpread({}, _this5.state, {
                selectedSLOService: e.target.value
              }));
            },
            label: "SLO\u670D\u52A1"
          }));

        default:
          return '';
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      if (this.state.loading) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "gf-form max-width-21"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "gf-form-label width-10 query-keyword"
        }, "\u67E5\u8BE2\u7C7B\u578B"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "gf-form-select-wrapper max-width-12"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
          className: "gf-form-input"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", null, "\u52A0\u8F7D..."))));
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_1__["SimpleSelect"], {
        value: this.state.selectedQueryType,
        options: this.queryTypes,
        onValueChange: function onValueChange(e) {
          return _this6.onQueryTypeChange(e.target.value);
        },
        label: "\u67E5\u8BE2\u7C7B\u578B"
      }), this.renderQueryTypeSwitch(this.state.selectedQueryType));
    }
  }]);

  return CloudMonitoringVariableQueryEditor;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/***/ }),

/***/ "./public/app/plugins/datasource/cloud-monitoring/config_ctrl.ts":
/*!***********************************************************************!*\
  !*** ./public/app/plugins/datasource/cloud-monitoring/config_ctrl.ts ***!
  \***********************************************************************/
/*! exports provided: CloudMonitoringConfigCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudMonitoringConfigCtrl", function() { return CloudMonitoringConfigCtrl; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./public/app/plugins/datasource/cloud-monitoring/types.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var CloudMonitoringConfigCtrl =
/*#__PURE__*/
function () {
  CloudMonitoringConfigCtrl.$inject = ["datasourceSrv"];

  /** @ngInject */
  function CloudMonitoringConfigCtrl(datasourceSrv) {
    _classCallCheck(this, CloudMonitoringConfigCtrl);

    this.validationErrors = [];
    this.defaultAuthenticationType = _types__WEBPACK_IMPORTED_MODULE_0__["AuthType"].JWT;
    this.datasourceSrv = datasourceSrv;
    this.name = this.meta.name;
    this.current.jsonData = this.current.jsonData || {};
    this.current.jsonData.authenticationType = this.current.jsonData.authenticationType ? this.current.jsonData.authenticationType : this.defaultAuthenticationType;
    this.current.secureJsonData = this.current.secureJsonData || {};
    this.current.secureJsonFields = this.current.secureJsonFields || {};
    this.authenticationTypes = _types__WEBPACK_IMPORTED_MODULE_0__["authTypes"];
  }

  _createClass(CloudMonitoringConfigCtrl, [{
    key: "save",
    value: function save(jwt) {
      this.current.secureJsonData.privateKey = jwt.private_key;
      this.current.jsonData.tokenUri = jwt.token_uri;
      this.current.jsonData.clientEmail = jwt.client_email;
      this.current.jsonData.defaultProject = jwt.project_id;
    }
  }, {
    key: "validateJwt",
    value: function validateJwt(jwt) {
      this.resetValidationMessages();

      if (!jwt.private_key || jwt.private_key.length === 0) {
        this.validationErrors.push('Private key field missing in JWT file.');
      }

      if (!jwt.token_uri || jwt.token_uri.length === 0) {
        this.validationErrors.push('Token URI field missing in JWT file.');
      }

      if (!jwt.client_email || jwt.client_email.length === 0) {
        this.validationErrors.push('Client Email field missing in JWT file.');
      }

      if (!jwt.project_id || jwt.project_id.length === 0) {
        this.validationErrors.push('Project Id field missing in JWT file.');
      }

      if (this.validationErrors.length === 0) {
        this.inputDataValid = true;
        return true;
      }

      return false;
    }
  }, {
    key: "onUpload",
    value: function onUpload(json) {
      this.jsonText = '';

      if (this.validateJwt(json)) {
        this.save(json);
      }
    }
  }, {
    key: "onPasteJwt",
    value: function onPasteJwt(e) {
      try {
        var json = JSON.parse(e.originalEvent.clipboardData.getData('text/plain') || this.jsonText);

        if (this.validateJwt(json)) {
          this.save(json);
        }
      } catch (error) {
        this.resetValidationMessages();
        this.validationErrors.push("Invalid json: ".concat(error.message));
      }
    }
  }, {
    key: "resetValidationMessages",
    value: function resetValidationMessages() {
      this.validationErrors = [];
      this.inputDataValid = false;
      this.jsonText = '';
      this.current.jsonData = Object.assign({}, {
        authenticationType: this.current.jsonData.authenticationType
      });
      this.current.secureJsonData = {};
      this.current.secureJsonFields = {};
    }
  }]);

  return CloudMonitoringConfigCtrl;
}();
CloudMonitoringConfigCtrl.templateUrl = 'public/app/plugins/datasource/cloud-monitoring/partials/config.html';

/***/ }),

/***/ "./public/app/plugins/datasource/cloud-monitoring/datasource.ts":
/*!**********************************************************************!*\
  !*** ./public/app/plugins/datasource/cloud-monitoring/datasource.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CloudMonitoringDatasource; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./public/app/plugins/datasource/cloud-monitoring/types.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./public/app/plugins/datasource/cloud-monitoring/constants.ts");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api */ "./public/app/plugins/datasource/cloud-monitoring/api.ts");
/* harmony import */ var _CloudMonitoringMetricFindQuery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CloudMonitoringMetricFindQuery */ "./public/app/plugins/datasource/cloud-monitoring/CloudMonitoringMetricFindQuery.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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








var CloudMonitoringDatasource =
/*#__PURE__*/
function (_DataSourceApi) {
  CloudMonitoringDatasource.$inject = ["instanceSettings", "templateSrv", "timeSrv"];

  _inherits(CloudMonitoringDatasource, _DataSourceApi);

  /** @ngInject */
  function CloudMonitoringDatasource(instanceSettings, templateSrv, timeSrv) {
    var _this;

    _classCallCheck(this, CloudMonitoringDatasource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CloudMonitoringDatasource).call(this, instanceSettings));
    _this.instanceSettings = instanceSettings;
    _this.templateSrv = templateSrv;
    _this.timeSrv = timeSrv;
    _this.authenticationType = instanceSettings.jsonData.authenticationType || 'jwt';
    _this.api = new _api__WEBPACK_IMPORTED_MODULE_4__["default"]("".concat(instanceSettings.url, "/cloudmonitoring/v3/projects/"));
    return _this;
  }

  _createClass(CloudMonitoringDatasource, [{
    key: "query",
    value: function () {
      var _query = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(options) {
        var _this2 = this;

        var result, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = [];
                _context.next = 3;
                return this.getTimeSeries(options);

              case 3:
                data = _context.sent;

                if (!data.results) {
                  _context.next = 9;
                  break;
                }

                Object.values(data.results).forEach(function (queryRes) {
                  if (!queryRes.series) {
                    return;
                  }

                  var unit = _this2.resolvePanelUnitFromTargets(options.targets);

                  queryRes.series.forEach(function (series) {
                    var timeSerie = {
                      target: series.name,
                      datapoints: series.points,
                      refId: queryRes.refId,
                      meta: queryRes.meta
                    };

                    if (unit) {
                      timeSerie = _objectSpread({}, timeSerie, {
                        unit: unit
                      });
                    }

                    var df = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["toDataFrame"])(timeSerie);
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                      for (var _iterator = df.fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _queryRes$meta, _queryRes$meta2;

                        var field = _step.value;

                        if (((_queryRes$meta = queryRes.meta) === null || _queryRes$meta === void 0 ? void 0 : _queryRes$meta.deepLink) && ((_queryRes$meta2 = queryRes.meta) === null || _queryRes$meta2 === void 0 ? void 0 : _queryRes$meta2.deepLink.length) > 0) {
                          var _queryRes$meta3;

                          field.config.links = [{
                            url: (_queryRes$meta3 = queryRes.meta) === null || _queryRes$meta3 === void 0 ? void 0 : _queryRes$meta3.deepLink,
                            title: 'View in Metrics Explorer',
                            targetBlank: true
                          }];
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

                    result.push(df);
                  });
                });
                return _context.abrupt("return", {
                  data: result
                });

              case 9:
                return _context.abrupt("return", {
                  data: []
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function query(_x) {
        return _query.apply(this, arguments);
      }

      return query;
    }()
  }, {
    key: "annotationQuery",
    value: function () {
      var _annotationQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(options) {
        var annotation, queries, _ref, data, results;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.ensureGCEDefaultProject();

              case 2:
                annotation = options.annotation;
                queries = [{
                  refId: 'annotationQuery',
                  type: 'annotationQuery',
                  datasourceId: this.id,
                  view: 'FULL',
                  crossSeriesReducer: 'REDUCE_NONE',
                  perSeriesAligner: 'ALIGN_NONE',
                  metricType: this.templateSrv.replace(annotation.target.metricType, options.scopedVars || {}),
                  title: this.templateSrv.replace(annotation.target.title, options.scopedVars || {}),
                  text: this.templateSrv.replace(annotation.target.text, options.scopedVars || {}),
                  tags: this.templateSrv.replace(annotation.target.tags, options.scopedVars || {}),
                  projectName: this.templateSrv.replace(annotation.target.projectName ? annotation.target.projectName : this.getDefaultProject(), options.scopedVars || {}),
                  filters: this.interpolateFilters(annotation.target.filters || [], options.scopedVars)
                }];
                _context2.next = 6;
                return this.api.post({
                  from: options.range.from.valueOf().toString(),
                  to: options.range.to.valueOf().toString(),
                  queries: queries
                });

              case 6:
                _ref = _context2.sent;
                data = _ref.data;
                results = data.results['annotationQuery'].tables[0].rows.map(function (v) {
                  return {
                    annotation: annotation,
                    time: Date.parse(v[0]),
                    title: v[1],
                    tags: [],
                    text: v[3]
                  };
                });
                return _context2.abrupt("return", results);

              case 10:
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
    key: "metricFindQuery",
    value: function () {
      var _metricFindQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(query) {
        var cloudMonitoringMetricFindQuery;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.ensureGCEDefaultProject();

              case 2:
                cloudMonitoringMetricFindQuery = new _CloudMonitoringMetricFindQuery__WEBPACK_IMPORTED_MODULE_5__["default"](this);
                return _context3.abrupt("return", cloudMonitoringMetricFindQuery.execute(query));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function metricFindQuery(_x3) {
        return _metricFindQuery.apply(this, arguments);
      }

      return metricFindQuery;
    }()
  }, {
    key: "getTimeSeries",
    value: function () {
      var _getTimeSeries = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(options) {
        var _this3 = this;

        var queries, _ref2, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.ensureGCEDefaultProject();

              case 2:
                queries = options.targets.map(this.migrateQuery).filter(this.shouldRunQuery).map(function (q) {
                  return _this3.prepareTimeSeriesQuery(q, options.scopedVars);
                }).map(function (q) {
                  return _objectSpread({}, q, {
                    intervalMs: options.intervalMs,
                    type: 'timeSeriesQuery'
                  });
                });

                if (!(queries.length > 0)) {
                  _context4.next = 11;
                  break;
                }

                _context4.next = 6;
                return this.api.post({
                  from: options.range.from.valueOf().toString(),
                  to: options.range.to.valueOf().toString(),
                  queries: queries
                });

              case 6:
                _ref2 = _context4.sent;
                data = _ref2.data;
                return _context4.abrupt("return", data);

              case 11:
                return _context4.abrupt("return", {
                  results: []
                });

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getTimeSeries(_x4) {
        return _getTimeSeries.apply(this, arguments);
      }

      return getTimeSeries;
    }()
  }, {
    key: "getLabels",
    value: function () {
      var _getLabels = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(metricType, refId, projectName, groupBys) {
        var response, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getTimeSeries({
                  targets: [{
                    refId: refId,
                    datasourceId: this.id,
                    queryType: _types__WEBPACK_IMPORTED_MODULE_2__["QueryType"].METRICS,
                    metricQuery: {
                      projectName: this.templateSrv.replace(projectName),
                      metricType: this.templateSrv.replace(metricType),
                      groupBys: this.interpolateGroupBys(groupBys || [], {}),
                      crossSeriesReducer: 'REDUCE_NONE',
                      view: 'HEADERS'
                    }
                  }],
                  range: this.timeSrv.timeRange()
                });

              case 2:
                response = _context5.sent;
                result = response.results[refId];
                return _context5.abrupt("return", result && result.meta ? result.meta.labels : {});

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getLabels(_x5, _x6, _x7, _x8) {
        return _getLabels.apply(this, arguments);
      }

      return getLabels;
    }()
  }, {
    key: "testDatasource",
    value: function () {
      var _testDatasource = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var status, message, defaultErrorMessage, response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                defaultErrorMessage = 'Cannot connect to Google Cloud Monitoring API';
                _context6.prev = 1;
                _context6.next = 4;
                return this.ensureGCEDefaultProject();

              case 4:
                _context6.next = 6;
                return this.api.test(this.getDefaultProject());

              case 6:
                response = _context6.sent;

                if (response.status === 200) {
                  status = 'success';
                  message = 'Successfully queried the Google Cloud Monitoring API.';
                } else {
                  status = 'error';
                  message = response.statusText ? response.statusText : defaultErrorMessage;
                }

                _context6.next = 14;
                break;

              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6["catch"](1);
                status = 'error';

                if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString(_context6.t0)) {
                  message = _context6.t0;
                } else {
                  message = 'Google Cloud Monitoring: ';
                  message += _context6.t0.statusText ? _context6.t0.statusText : defaultErrorMessage;

                  if (_context6.t0.data && _context6.t0.data.error && _context6.t0.data.error.code) {
                    message += ': ' + _context6.t0.data.error.code + '. ' + _context6.t0.data.error.message;
                  }
                }

              case 14:
                _context6.prev = 14;
                return _context6.abrupt("return", {
                  status: status,
                  message: message
                });

              case 17:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 10, 14, 17]]);
      }));

      function testDatasource() {
        return _testDatasource.apply(this, arguments);
      }

      return testDatasource;
    }()
  }, {
    key: "getGCEDefaultProject",
    value: function () {
      var _getGCEDefaultProject = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", this.api.post({
                  queries: [{
                    refId: 'getGCEDefaultProject',
                    type: 'getGCEDefaultProject',
                    datasourceId: this.id
                  }]
                }).then(function (_ref3) {
                  var data = _ref3.data;
                  return data && data.results && data.results.getGCEDefaultProject && data.results.getGCEDefaultProject.meta ? data.results.getGCEDefaultProject.meta.defaultProject : '';
                }).catch(function (err) {
                  throw err.data.error;
                }));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getGCEDefaultProject() {
        return _getGCEDefaultProject.apply(this, arguments);
      }

      return getGCEDefaultProject;
    }()
  }, {
    key: "getDefaultProject",
    value: function getDefaultProject() {
      var _this$instanceSetting = this.instanceSettings.jsonData,
          defaultProject = _this$instanceSetting.defaultProject,
          authenticationType = _this$instanceSetting.authenticationType,
          gceDefaultProject = _this$instanceSetting.gceDefaultProject;

      if (authenticationType === 'gce') {
        return gceDefaultProject || '';
      }

      return defaultProject || '';
    }
  }, {
    key: "ensureGCEDefaultProject",
    value: function () {
      var _ensureGCEDefaultProject = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        var _this$instanceSetting2, authenticationType, gceDefaultProject;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _this$instanceSetting2 = this.instanceSettings.jsonData, authenticationType = _this$instanceSetting2.authenticationType, gceDefaultProject = _this$instanceSetting2.gceDefaultProject;

                if (!(authenticationType === 'gce' && !gceDefaultProject)) {
                  _context8.next = 5;
                  break;
                }

                _context8.next = 4;
                return this.getGCEDefaultProject();

              case 4:
                this.instanceSettings.jsonData.gceDefaultProject = _context8.sent;

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function ensureGCEDefaultProject() {
        return _ensureGCEDefaultProject.apply(this, arguments);
      }

      return ensureGCEDefaultProject;
    }()
  }, {
    key: "getMetricTypes",
    value: function () {
      var _getMetricTypes = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(projectName) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (projectName) {
                  _context9.next = 2;
                  break;
                }

                return _context9.abrupt("return", []);

              case 2:
                return _context9.abrupt("return", this.api.get("".concat(this.templateSrv.replace(projectName), "/metricDescriptors"), {
                  responseMap: function responseMap(m) {
                    var _m$type$split = m.type.split('/'),
                        _m$type$split2 = _slicedToArray(_m$type$split, 1),
                        service = _m$type$split2[0];

                    var _service$split = service.split('.'),
                        _service$split2 = _slicedToArray(_service$split, 1),
                        serviceShortName = _service$split2[0];

                    m.service = service;
                    m.serviceShortName = serviceShortName;
                    m.displayName = m.displayName || m.type;
                    return m;
                  }
                }));

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getMetricTypes(_x9) {
        return _getMetricTypes.apply(this, arguments);
      }

      return getMetricTypes;
    }()
  }, {
    key: "getSLOServices",
    value: function () {
      var _getSLOServices = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(projectName) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                return _context10.abrupt("return", this.api.get("".concat(this.templateSrv.replace(projectName), "/services"), {
                  responseMap: function responseMap(_ref4) {
                    var name = _ref4.name;
                    return {
                      value: name.match(/([^\/]*)\/*$/)[1],
                      label: name.match(/([^\/]*)\/*$/)[1]
                    };
                  }
                }));

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getSLOServices(_x10) {
        return _getSLOServices.apply(this, arguments);
      }

      return getSLOServices;
    }()
  }, {
    key: "getServiceLevelObjectives",
    value: function () {
      var _getServiceLevelObjectives = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(projectName, serviceId) {
        var _this$interpolateProp, p, s;

        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (serviceId) {
                  _context11.next = 2;
                  break;
                }

                return _context11.abrupt("return", Promise.resolve([]));

              case 2:
                _this$interpolateProp = this.interpolateProps({
                  projectName: projectName,
                  serviceId: serviceId
                }), p = _this$interpolateProp.projectName, s = _this$interpolateProp.serviceId;
                return _context11.abrupt("return", this.api.get("".concat(p, "/services/").concat(s, "/serviceLevelObjectives"), {
                  responseMap: function responseMap(_ref5) {
                    var name = _ref5.name,
                        displayName = _ref5.displayName,
                        goal = _ref5.goal;
                    return {
                      value: name.match(/([^\/]*)\/*$/)[1],
                      label: displayName,
                      goal: goal
                    };
                  }
                }));

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function getServiceLevelObjectives(_x11, _x12) {
        return _getServiceLevelObjectives.apply(this, arguments);
      }

      return getServiceLevelObjectives;
    }()
  }, {
    key: "getProjects",
    value: function () {
      var _getProjects = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt("return", this.api.get("projects", {
                  responseMap: function responseMap(_ref6) {
                    var projectId = _ref6.projectId,
                        name = _ref6.name;
                    return {
                      value: projectId,
                      label: name
                    };
                  },
                  baseUrl: "".concat(this.instanceSettings.url, "/cloudresourcemanager/v1/")
                }));

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getProjects() {
        return _getProjects.apply(this, arguments);
      }

      return getProjects;
    }()
  }, {
    key: "migrateQuery",
    value: function migrateQuery(query) {
      if (!query.hasOwnProperty('metricQuery')) {
        var _ref7 = query,
            hide = _ref7.hide,
            refId = _ref7.refId,
            datasource = _ref7.datasource,
            key = _ref7.key,
            queryType = _ref7.queryType,
            maxLines = _ref7.maxLines,
            metric = _ref7.metric,
            rest = _objectWithoutProperties(_ref7, ["hide", "refId", "datasource", "key", "queryType", "maxLines", "metric"]);

        return {
          refId: refId,
          hide: hide,
          queryType: _types__WEBPACK_IMPORTED_MODULE_2__["QueryType"].METRICS,
          metricQuery: _objectSpread({}, rest, {
            view: rest.view || 'FULL'
          })
        };
      }

      return query;
    }
  }, {
    key: "interpolateProps",
    value: function interpolateProps(object) {
      var _this4 = this;

      var scopedVars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return Object.entries(object).reduce(function (acc, _ref8) {
        var _ref9 = _slicedToArray(_ref8, 2),
            key = _ref9[0],
            value = _ref9[1];

        return _objectSpread({}, acc, _defineProperty({}, key, value && lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString(value) ? _this4.templateSrv.replace(value, scopedVars) : value));
      }, {});
    }
  }, {
    key: "shouldRunQuery",
    value: function shouldRunQuery(query) {
      if (query.hide) {
        return false;
      }

      if (query.queryType && query.queryType === _types__WEBPACK_IMPORTED_MODULE_2__["QueryType"].SLO && query.sloQuery) {
        var _query$sloQuery = query.sloQuery,
            selectorName = _query$sloQuery.selectorName,
            serviceId = _query$sloQuery.serviceId,
            sloId = _query$sloQuery.sloId,
            projectName = _query$sloQuery.projectName;
        return !!selectorName && !!serviceId && !!sloId && !!projectName;
      }

      var metricType = query.metricQuery.metricType;
      return !!metricType;
    }
  }, {
    key: "prepareTimeSeriesQuery",
    value: function prepareTimeSeriesQuery(_ref10, scopedVars) {
      var metricQuery = _ref10.metricQuery,
          refId = _ref10.refId,
          queryType = _ref10.queryType,
          sloQuery = _ref10.sloQuery;
      return {
        datasourceId: this.id,
        refId: refId,
        queryType: queryType,
        metricQuery: _objectSpread({}, this.interpolateProps(metricQuery, scopedVars), {
          projectName: this.templateSrv.replace(metricQuery.projectName ? metricQuery.projectName : this.getDefaultProject()),
          filters: this.interpolateFilters(metricQuery.filters || [], scopedVars),
          groupBys: this.interpolateGroupBys(metricQuery.groupBys || [], scopedVars),
          view: metricQuery.view || 'FULL'
        }),
        sloQuery: sloQuery && this.interpolateProps(sloQuery, scopedVars)
      };
    }
  }, {
    key: "interpolateVariablesInQueries",
    value: function interpolateVariablesInQueries(queries, scopedVars) {
      var _this5 = this;

      return queries.map(function (query) {
        return _this5.prepareTimeSeriesQuery(query, scopedVars);
      });
    }
  }, {
    key: "interpolateFilters",
    value: function interpolateFilters(filters, scopedVars) {
      var _this6 = this;

      var completeFilter = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.chunk(filters, 4).map(function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 4),
            key = _ref12[0],
            operator = _ref12[1],
            value = _ref12[2],
            condition = _ref12[3];

        return _objectSpread({
          key: key,
          operator: operator,
          value: value
        }, condition && {
          condition: condition
        });
      }).reduce(function (res, filter) {
        return filter.value ? [].concat(_toConsumableArray(res), [filter]) : res;
      }, []);

      var filterArray = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.flatten(completeFilter.map(function (_ref13) {
        var key = _ref13.key,
            operator = _ref13.operator,
            value = _ref13.value,
            condition = _ref13.condition;
        return [_this6.templateSrv.replace(key, scopedVars || {}), operator, _this6.templateSrv.replace(value, scopedVars || {}, 'regex')].concat(_toConsumableArray(condition ? [condition] : []));
      }));

      return filterArray || [];
    }
  }, {
    key: "interpolateGroupBys",
    value: function interpolateGroupBys(groupBys, scopedVars) {
      var _this7 = this;

      var interpolatedGroupBys = [];
      (groupBys || []).forEach(function (gb) {
        var interpolated = _this7.templateSrv.replace(gb, scopedVars || {}, 'csv').split(',');

        if (Array.isArray(interpolated)) {
          interpolatedGroupBys = interpolatedGroupBys.concat(interpolated);
        } else {
          interpolatedGroupBys.push(interpolated);
        }
      });
      return interpolatedGroupBys;
    }
  }, {
    key: "resolvePanelUnitFromTargets",
    value: function resolvePanelUnitFromTargets(targets) {
      var unit;

      if (targets.length > 0 && targets.every(function (t) {
        return t.unit === targets[0].unit;
      })) {
        if (_constants__WEBPACK_IMPORTED_MODULE_3__["cloudMonitoringUnitMappings"].hasOwnProperty(targets[0].unit)) {
          // @ts-ignore
          unit = _constants__WEBPACK_IMPORTED_MODULE_3__["cloudMonitoringUnitMappings"][targets[0].unit];
        }
      }

      return unit;
    }
  }, {
    key: "variables",
    get: function get() {
      return this.templateSrv.getVariables().map(function (v) {
        return "$".concat(v.name);
      });
    }
  }]);

  return CloudMonitoringDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataSourceApi"]);



/***/ }),

/***/ "./public/app/plugins/datasource/cloud-monitoring/module.ts":
/*!******************************************************************!*\
  !*** ./public/app/plugins/datasource/cloud-monitoring/module.ts ***!
  \******************************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/cloud-monitoring/datasource.ts");
/* harmony import */ var _components_QueryEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/QueryEditor */ "./public/app/plugins/datasource/cloud-monitoring/components/QueryEditor.tsx");
/* harmony import */ var _config_ctrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config_ctrl */ "./public/app/plugins/datasource/cloud-monitoring/config_ctrl.ts");
/* harmony import */ var _annotations_query_ctrl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./annotations_query_ctrl */ "./public/app/plugins/datasource/cloud-monitoring/annotations_query_ctrl.ts");
/* harmony import */ var _components_VariableQueryEditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/VariableQueryEditor */ "./public/app/plugins/datasource/cloud-monitoring/components/VariableQueryEditor.tsx");






var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_1__["default"]).setQueryEditor(_components_QueryEditor__WEBPACK_IMPORTED_MODULE_2__["QueryEditor"]).setConfigCtrl(_config_ctrl__WEBPACK_IMPORTED_MODULE_3__["CloudMonitoringConfigCtrl"]).setAnnotationQueryCtrl(_annotations_query_ctrl__WEBPACK_IMPORTED_MODULE_4__["CloudMonitoringAnnotationsQueryCtrl"]).setVariableQueryEditor(_components_VariableQueryEditor__WEBPACK_IMPORTED_MODULE_5__["CloudMonitoringVariableQueryEditor"]);

/***/ })

}]);
//# sourceMappingURL=cloudMonitoringPlugin.1ebdc265fc3bd7452fcd.js.map