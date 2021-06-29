(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["grafanaPlugin"],{

/***/ "./public/app/plugins/datasource/grafana/datasource.ts":
/*!*************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana/datasource.ts ***!
  \*************************************************************/
/*! exports provided: GrafanaDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GrafanaDatasource", function() { return GrafanaDatasource; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/features/templating/template_srv */ "./public/app/features/templating/template_srv.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var GrafanaDatasource =
/*#__PURE__*/
function (_DataSourceApi) {
  GrafanaDatasource.$inject = ["instanceSettings"];

  _inherits(GrafanaDatasource, _DataSourceApi);

  /** @ngInject */
  function GrafanaDatasource(instanceSettings) {
    _classCallCheck(this, GrafanaDatasource);

    return _possibleConstructorReturn(this, _getPrototypeOf(GrafanaDatasource).call(this, instanceSettings));
  }

  _createClass(GrafanaDatasource, [{
    key: "query",
    value: function query(options) {
      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get('/api/tsdb/testdata/random-walk', {
        from: options.range.from.valueOf(),
        to: options.range.to.valueOf(),
        intervalMs: options.intervalMs,
        maxDataPoints: options.maxDataPoints
      }).then(function (res) {
        var data = [];

        if (res.results) {
          lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(res.results, function (queryRes) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = queryRes.series[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var series = _step.value;
                data.push({
                  target: series.name,
                  datapoints: series.points
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
          });
        }

        return {
          data: data
        };
      });
    }
  }, {
    key: "metricFindQuery",
    value: function metricFindQuery(options) {
      return Promise.resolve([]);
    }
  }, {
    key: "annotationQuery",
    value: function annotationQuery(options) {
      var _options$dashboard;

      var params = {
        from: options.range.from.valueOf(),
        to: options.range.to.valueOf(),
        limit: options.annotation.limit,
        tags: options.annotation.tags,
        matchAny: options.annotation.matchAny
      };

      if (options.annotation.type === 'dashboard') {
        // if no dashboard id yet return
        if (!options.dashboard.id) {
          return Promise.resolve([]);
        } // filter by dashboard id


        params.dashboardId = options.dashboard.id; // remove tags filter if any

        delete params.tags;
      } else {
        var _ret = function () {
          // require at least one tag
          if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isArray(options.annotation.tags) || options.annotation.tags.length === 0) {
            return {
              v: Promise.resolve([])
            };
          }

          var delimiter = '__delimiter__';
          var tags = [];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = params.tags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var t = _step2.value;
              var renderedValues = app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_3__["default"].replace(t, {}, function (value) {
                if (typeof value === 'string') {
                  return value;
                }

                return value.join(delimiter);
              });
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = renderedValues.split(delimiter)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var tt = _step3.value;
                  tags.push(tt);
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

          params.tags = tags;
        }();

        if (_typeof(_ret) === "object") return _ret.v;
      }

      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get('/api/annotations', params, "grafana-data-source-annotations-".concat(options.annotation.name, "-").concat((_options$dashboard = options.dashboard) === null || _options$dashboard === void 0 ? void 0 : _options$dashboard.id));
    }
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      return Promise.resolve();
    }
  }]);

  return GrafanaDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["DataSourceApi"]);



/***/ }),

/***/ "./public/app/plugins/datasource/grafana/module.ts":
/*!*********************************************************!*\
  !*** ./public/app/plugins/datasource/grafana/module.ts ***!
  \*********************************************************/
/*! exports provided: GrafanaDatasource, Datasource, QueryCtrl, AnnotationsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryCtrl", function() { return GrafanaQueryCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationsQueryCtrl", function() { return GrafanaAnnotationsQueryCtrl; });
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/grafana/datasource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GrafanaDatasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_0__["GrafanaDatasource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Datasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_0__["GrafanaDatasource"]; });

/* harmony import */ var app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/plugins/sdk */ "./public/app/plugins/sdk.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var GrafanaQueryCtrl =
/*#__PURE__*/
function (_QueryCtrl) {
  _inherits(GrafanaQueryCtrl, _QueryCtrl);

  function GrafanaQueryCtrl() {
    _classCallCheck(this, GrafanaQueryCtrl);

    return _possibleConstructorReturn(this, _getPrototypeOf(GrafanaQueryCtrl).apply(this, arguments));
  }

  return GrafanaQueryCtrl;
}(app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__["QueryCtrl"]);

GrafanaQueryCtrl.templateUrl = 'partials/query.editor.html';

var GrafanaAnnotationsQueryCtrl = function GrafanaAnnotationsQueryCtrl() {
  _classCallCheck(this, GrafanaAnnotationsQueryCtrl);

  this.types = [{
    text: '仪表板',
    value: 'dashboard'
  }, {
    text: '标签',
    value: 'tags'
  }];
  this.annotation.type = this.annotation.type || 'tags';
  this.annotation.limit = this.annotation.limit || 100;
};

GrafanaAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';


/***/ })

}]);
//# sourceMappingURL=grafanaPlugin.1ebdc265fc3bd7452fcd.js.map