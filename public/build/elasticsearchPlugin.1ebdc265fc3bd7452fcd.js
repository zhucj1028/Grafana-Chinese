(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["elasticsearchPlugin"],{

/***/ "./public/app/core/components/Select/DataSourcePicker.tsx":
/*!****************************************************************!*\
  !*** ./public/app/core/components/Select/DataSourcePicker.tsx ***!
  \****************************************************************/
/*! exports provided: DataSourcePicker, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourcePicker", function() { return DataSourcePicker; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
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
 // Components



var DataSourcePicker =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DataSourcePicker, _PureComponent);

  function DataSourcePicker(props) {
    var _this;

    _classCallCheck(this, DataSourcePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataSourcePicker).call(this, props));

    _this.onChange = function (item) {
      var ds = _this.props.datasources.find(function (ds) {
        return ds.name === item.value;
      });

      if (ds) {
        _this.props.onChange(ds);
      }
    };

    return _this;
  }

  _createClass(DataSourcePicker, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          datasources = _this$props.datasources,
          current = _this$props.current,
          autoFocus = _this$props.autoFocus,
          hideTextValue = _this$props.hideTextValue,
          onBlur = _this$props.onBlur,
          openMenuOnFocus = _this$props.openMenuOnFocus,
          showLoading = _this$props.showLoading,
          placeholder = _this$props.placeholder,
          invalid = _this$props.invalid;
      var options = datasources.map(function (ds) {
        return {
          value: ds.name,
          label: ds.name,
          imgUrl: ds.meta.info.logos.small
        };
      });
      var value = current && {
        label: current.name.substr(0, 37),
        value: current.name,
        imgUrl: current.meta.info.logos.small,
        loading: showLoading,
        hideText: hideTextValue
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_2__["selectors"].components.DataSourcePicker.container
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
        className: "ds-picker select-container",
        isMulti: false,
        isClearable: false,
        backspaceRemovesValue: false,
        onChange: this.onChange,
        options: options,
        autoFocus: autoFocus,
        onBlur: onBlur,
        openMenuOnFocus: openMenuOnFocus,
        maxMenuHeight: 500,
        menuPlacement: "bottom",
        placeholder: placeholder,
        noOptionsMessage: "No datasources found",
        value: value,
        invalid: invalid
      }));
    }
  }]);

  return DataSourcePicker;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
DataSourcePicker.defaultProps = {
  autoFocus: false,
  openMenuOnFocus: false,
  placeholder: '选择数据源'
};
/* harmony default export */ __webpack_exports__["default"] = (DataSourcePicker);

/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/bucket_agg.ts":
/*!*******************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/bucket_agg.ts ***!
  \*******************************************************************/
/*! exports provided: ElasticBucketAggCtrl, elasticBucketAgg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElasticBucketAggCtrl", function() { return ElasticBucketAggCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elasticBucketAgg", function() { return elasticBucketAgg; });
/* harmony import */ var app_core_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/core_module */ "./public/app/core/core_module.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _query_def__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query_def */ "./public/app/plugins/datasource/elasticsearch/query_def.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var ElasticBucketAggCtrl =
/** @ngInject */
function ElasticBucketAggCtrl($scope, uiSegmentSrv, $rootScope) {
  _classCallCheck(this, ElasticBucketAggCtrl);

  var bucketAggs = $scope.target.bucketAggs;
  $scope.orderByOptions = [];

  $scope.getBucketAggTypes = function () {
    return _query_def__WEBPACK_IMPORTED_MODULE_2__["bucketAggTypes"];
  };

  $scope.getOrderOptions = function () {
    return _query_def__WEBPACK_IMPORTED_MODULE_2__["orderOptions"];
  };

  $scope.getSizeOptions = function () {
    return _query_def__WEBPACK_IMPORTED_MODULE_2__["sizeOptions"];
  };

  $rootScope.onAppEvent(app_types__WEBPACK_IMPORTED_MODULE_3__["CoreEvents"].elasticQueryUpdated, function () {
    $scope.validateModel();
  }, $scope);

  $scope.init = function () {
    $scope.agg = bucketAggs[$scope.index] || {};
    $scope.validateModel();
  };

  $scope.onChangeInternal = function () {
    $scope.onChange();
  };

  $scope.onTypeChanged = function () {
    $scope.agg.settings = {};
    $scope.showOptions = false;

    switch ($scope.agg.type) {
      case 'date_histogram':
      case 'histogram':
      case 'terms':
        {
          delete $scope.agg.query;
          $scope.agg.field = 'select field';
          break;
        }

      case 'filters':
        {
          delete $scope.agg.field;
          $scope.agg.query = '*';
          break;
        }

      case 'geohash_grid':
        {
          $scope.agg.settings.precision = 3;
          break;
        }
    }

    $scope.validateModel();
    $scope.onChange();
  };

  $scope.validateModel = function () {
    $scope.index = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.indexOf(bucketAggs, $scope.agg);
    $scope.isFirst = $scope.index === 0;
    $scope.bucketAggCount = bucketAggs.length;
    var settingsLinkText = '';
    var settings = $scope.agg.settings || {};

    switch ($scope.agg.type) {
      case 'terms':
        {
          settings.order = settings.order || 'desc';
          settings.size = settings.size || '10';
          settings.min_doc_count = settings.min_doc_count || 0;
          settings.orderBy = settings.orderBy || '_term';

          if (settings.size !== '0') {
            settingsLinkText = _query_def__WEBPACK_IMPORTED_MODULE_2__["describeOrder"](settings.order) + ' ' + settings.size + ', ';
          }

          if (settings.min_doc_count > 0) {
            settingsLinkText += 'Min Doc Count: ' + settings.min_doc_count + ', ';
          }

          settingsLinkText += 'Order by: ' + _query_def__WEBPACK_IMPORTED_MODULE_2__["describeOrderBy"](settings.orderBy, $scope.target);

          if (settings.size === '0') {
            settingsLinkText += ' (' + settings.order + ')';
          }

          break;
        }

      case 'filters':
        {
          settings.filters = settings.filters || [{
            query: '*'
          }];
          settingsLinkText = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.reduce(settings.filters, function (memo, value, index) {
            memo += 'Q' + (index + 1) + '  = ' + value.query + ' ';
            return memo;
          }, '');

          if (settingsLinkText.length > 50) {
            settingsLinkText = settingsLinkText.substr(0, 50) + '...';
          }

          settingsLinkText = 'Filter Queries (' + settings.filters.length + ')';
          break;
        }

      case 'date_histogram':
        {
          settings.interval = settings.interval || 'auto';
          settings.min_doc_count = settings.min_doc_count || 0;
          $scope.agg.field = $scope.target.timeField;
          settingsLinkText = 'Interval: ' + settings.interval;

          if (settings.min_doc_count > 0) {
            settingsLinkText += ', Min Doc Count: ' + settings.min_doc_count;
          }

          if (settings.trimEdges === undefined || settings.trimEdges < 0) {
            settings.trimEdges = 0;
          }

          if (settings.trimEdges && settings.trimEdges > 0) {
            settingsLinkText += ', Trim edges: ' + settings.trimEdges;
          }

          break;
        }

      case 'histogram':
        {
          settings.interval = settings.interval || 1000;
          settings.min_doc_count = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.defaultTo(settings.min_doc_count, 1);
          settingsLinkText = 'Interval: ' + settings.interval;

          if (settings.min_doc_count > 0) {
            settingsLinkText += ', Min Doc Count: ' + settings.min_doc_count;
          }

          break;
        }

      case 'geohash_grid':
        {
          // limit precision to 12
          settings.precision = Math.max(Math.min(settings.precision, 12), 1);
          settingsLinkText = 'Precision: ' + settings.precision;
          break;
        }
    }

    $scope.settingsLinkText = settingsLinkText;
    $scope.agg.settings = settings;
    return true;
  };

  $scope.addFiltersQuery = function () {
    $scope.agg.settings.filters.push({
      query: '*'
    });
  };

  $scope.removeFiltersQuery = function (filter) {
    $scope.agg.settings.filters = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.without($scope.agg.settings.filters, filter);
  };

  $scope.toggleOptions = function () {
    $scope.showOptions = !$scope.showOptions;
  };

  $scope.getOrderByOptions = function () {
    return _query_def__WEBPACK_IMPORTED_MODULE_2__["getOrderByOptions"]($scope.target);
  };

  $scope.getFieldsInternal = function () {
    if ($scope.agg.type === 'date_histogram') {
      return $scope.getFields({
        $fieldType: 'date'
      });
    } else {
      return $scope.getFields();
    }
  };

  $scope.getIntervalOptions = function () {
    return Promise.resolve(uiSegmentSrv.transformToSegments(true, 'interval')(_query_def__WEBPACK_IMPORTED_MODULE_2__["intervalOptions"]));
  };

  $scope.addBucketAgg = function () {
    // if last is date histogram add it before
    var lastBucket = bucketAggs[bucketAggs.length - 1];
    var addIndex = bucketAggs.length - 1;

    if (lastBucket && lastBucket.type === 'date_histogram') {
      addIndex -= 1;
    }

    var id = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.reduce($scope.target.bucketAggs.concat($scope.target.metrics), function (max, val) {
      return parseInt(val.id, 10) > max ? parseInt(val.id, 10) : max;
    }, 0);

    bucketAggs.splice(addIndex, 0, {
      type: 'terms',
      field: 'select field',
      id: (id + 1).toString(),
      fake: true
    });
    $scope.onChange();
  };

  $scope.removeBucketAgg = function () {
    bucketAggs.splice($scope.index, 1);
    $scope.onChange();
  };

  $scope.init();
};
ElasticBucketAggCtrl.$inject = ["$scope", "uiSegmentSrv", "$rootScope"];
ElasticBucketAggCtrl.$inject = ["$scope", "uiSegmentSrv", "$rootScope"];
function elasticBucketAgg() {
  return {
    templateUrl: 'public/app/plugins/datasource/elasticsearch/partials/bucket_agg.html',
    controller: ElasticBucketAggCtrl,
    restrict: 'E',
    scope: {
      target: '=',
      index: '=',
      onChange: '&',
      getFields: '&'
    }
  };
}
app_core_core_module__WEBPACK_IMPORTED_MODULE_0__["default"].directive('elasticBucketAgg', elasticBucketAgg);

/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/configuration/ConfigEditor.tsx":
/*!************************************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/configuration/ConfigEditor.tsx ***!
  \************************************************************************************/
/*! exports provided: ConfigEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _ElasticDetails__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ElasticDetails */ "./public/app/plugins/datasource/elasticsearch/configuration/ElasticDetails.tsx");
/* harmony import */ var _LogsConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LogsConfig */ "./public/app/plugins/datasource/elasticsearch/configuration/LogsConfig.tsx");
/* harmony import */ var _DataLinks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DataLinks */ "./public/app/plugins/datasource/elasticsearch/configuration/DataLinks.tsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var ConfigEditor = function ConfigEditor(props) {
  var options = props.options,
      onOptionsChange = props.onOptionsChange; // Apply some defaults on initial render

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    var esVersion = options.jsonData.esVersion || 5;
    onOptionsChange(_objectSpread({}, options, {
      jsonData: _objectSpread({}, options.jsonData, {
        timeField: options.jsonData.timeField || '@timestamp',
        esVersion: esVersion,
        maxConcurrentShardRequests: options.jsonData.maxConcurrentShardRequests || Object(_ElasticDetails__WEBPACK_IMPORTED_MODULE_2__["defaultMaxConcurrentShardRequests"])(esVersion),
        logMessageField: options.jsonData.logMessageField || '',
        logLevelField: options.jsonData.logLevelField || ''
      })
    }));
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["DataSourceHttpSettings"], {
    defaultUrl: 'http://localhost:9200',
    dataSourceConfig: options,
    showAccessOptions: true,
    onChange: onOptionsChange
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ElasticDetails__WEBPACK_IMPORTED_MODULE_2__["ElasticDetails"], {
    value: options,
    onChange: onOptionsChange
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LogsConfig__WEBPACK_IMPORTED_MODULE_3__["LogsConfig"], {
    value: options.jsonData,
    onChange: function onChange(newValue) {
      return onOptionsChange(_objectSpread({}, options, {
        jsonData: newValue
      }));
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataLinks__WEBPACK_IMPORTED_MODULE_4__["DataLinks"], {
    value: options.jsonData.dataLinks,
    onChange: function onChange(newValue) {
      onOptionsChange(_objectSpread({}, options, {
        jsonData: _objectSpread({}, options.jsonData, {
          dataLinks: newValue
        })
      }));
    }
  }));
};

/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/configuration/DataLink.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/configuration/DataLink.tsx ***!
  \********************************************************************************/
/*! exports provided: DataLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataLink", function() { return DataLink; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/index.js");
/* harmony import */ var _features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../features/plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");
/* harmony import */ var _core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../core/components/Select/DataSourcePicker */ "./public/app/core/components/Select/DataSourcePicker.tsx");
function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n            width: 100%;\n          "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: baseline;\n  "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    flex: 3;\n  "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    flex: 2;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var FormField = _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LegacyForms"].FormField,
    Switch = _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LegacyForms"].Switch;



var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function () {
  return {
    firstRow: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject()),
    nameField: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2()),
    regexField: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3()),
    row: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject4())
  };
});
var DataLink = function DataLink(props) {
  var value = props.value,
      _onChange = props.onChange,
      onDelete = props.onDelete,
      suggestions = props.suggestions,
      className = props.className;
  var styles = getStyles();

  var _useInternalLink = useInternalLink(value.datasourceUid),
      _useInternalLink2 = _slicedToArray(_useInternalLink, 2),
      showInternalLink = _useInternalLink2[0],
      setShowInternalLink = _useInternalLink2[1];

  var handleChange = function handleChange(field) {
    return function (event) {
      _onChange(_objectSpread({}, value, _defineProperty({}, field, event.currentTarget.value)));
    };
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: className
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.firstRow + ' gf-form'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    className: styles.nameField,
    labelWidth: 6 // A bit of a hack to prevent using default value for the width from FormField
    ,
    inputWidth: null,
    label: "\u5B57\u6BB5",
    type: "text",
    value: value.field,
    tooltip: '可以是确切的字段名称，也可以是与该字段名称匹配的正则表达式模式。',
    onChange: handleChange('field')
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: 'destructive',
    title: "\u79FB\u9664\u5B57\u6BB5",
    icon: "times",
    onClick: function onClick(event) {
      event.preventDefault();
      onDelete();
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    label: showInternalLink ? 'Query' : 'URL',
    labelWidth: 6,
    inputEl: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["DataLinkInput"], {
      placeholder: showInternalLink ? '${__value.raw}' : 'http://example.com/${__value.raw}',
      value: value.url || '',
      onChange: function onChange(newValue) {
        return _onChange(_objectSpread({}, value, {
          url: newValue
        }));
      },
      suggestions: suggestions
    }),
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject5())
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.row
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Switch, {
    label: "\u5185\u90E8\u94FE\u63A5",
    checked: showInternalLink,
    onChange: function onChange() {
      if (showInternalLink) {
        _onChange(_objectSpread({}, value, {
          datasourceUid: undefined
        }));
      }

      setShowInternalLink(!showInternalLink);
    }
  }), showInternalLink && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DataSourceSection, {
    onChange: function onChange(datasourceUid) {
      _onChange(_objectSpread({}, value, {
        datasourceUid: datasourceUid
      }));
    },
    datasourceUid: value.datasourceUid
  })));
};

var DataSourceSection = function DataSourceSection(props) {
  var datasourceUid = props.datasourceUid,
      _onChange2 = props.onChange;
  var datasources = Object(_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_4__["getDatasourceSrv"])().getExternal() // At this moment only Jaeger and Zipkin datasource is supported as the link target.
  .filter(function (ds) {
    return ds.meta.tracing;
  }).map(function (ds) {
    return {
      value: ds.uid,
      name: ds.name,
      meta: ds.meta
    };
  });
  var selectedDatasource = datasourceUid && datasources.find(function (d) {
    return d.value === datasourceUid;
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_5__["default"] // Uid and value should be always set in the db and so in the items.
  , {
    onChange: function onChange(ds) {
      return _onChange2(ds.value);
    },
    datasources: datasources,
    current: selectedDatasource || undefined
  });
};

function useInternalLink(datasourceUid) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(!!datasourceUid),
      _useState2 = _slicedToArray(_useState, 2),
      showInternalLink = _useState2[0],
      setShowInternalLink = _useState2[1];

  var previousUid = Object(react_use__WEBPACK_IMPORTED_MODULE_3__["usePrevious"])(datasourceUid); // Force internal link visibility change if uid changed outside of this component.

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (!previousUid && datasourceUid && !showInternalLink) {
      setShowInternalLink(true);
    }

    if (previousUid && !datasourceUid && showInternalLink) {
      setShowInternalLink(false);
    }
  }, [previousUid, datasourceUid, showInternalLink]);
  return [showInternalLink, setShowInternalLink];
}

/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/configuration/DataLinks.tsx":
/*!*********************************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/configuration/DataLinks.tsx ***!
  \*********************************************************************************/
/*! exports provided: DataLinks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataLinks", function() { return DataLinks; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _DataLink__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DataLink */ "./public/app/plugins/datasource/elasticsearch/configuration/DataLink.tsx");
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n              margin-right: 10px;\n            "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    margin-bottom: ", ";\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    padding-bottom: ", ";\n    color: ", ";\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function (theme) {
  return {
    infoText: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject(), theme.spacing.md, theme.colors.textWeak),
    dataLink: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2(), theme.spacing.sm)
  };
});
var DataLinks = function DataLinks(props) {
  var value = props.value,
      _onChange = props.onChange;
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["useTheme"])();
  var styles = getStyles(theme);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "page-heading"
  }, "\u6570\u636E\u8FDE\u63A5"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.infoText
  }, "\u5C06\u94FE\u63A5\u6DFB\u52A0\u5230\u73B0\u6709\u5B57\u6BB5\u3002 \u94FE\u63A5\u5C06\u663E\u793A\u5728\u5B57\u6BB5\u503C\u65C1\u8FB9\u7684\u65E5\u5FD7\u884C\u8BE6\u7EC6\u4FE1\u606F\u4E2D\u3002"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-group"
  }, value && value.map(function (field, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataLink__WEBPACK_IMPORTED_MODULE_4__["DataLink"], {
      className: styles.dataLink,
      key: index,
      value: field,
      onChange: function onChange(newField) {
        var newDataLinks = _toConsumableArray(value);

        newDataLinks.splice(index, 1, newField);

        _onChange(newDataLinks);
      },
      onDelete: function onDelete() {
        var newDataLinks = _toConsumableArray(value);

        newDataLinks.splice(index, 1);

        _onChange(newDataLinks);
      },
      suggestions: [{
        value: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["DataLinkBuiltInVars"].valueRaw,
        label: '原始值',
        documentation: '字段的原始值',
        origin: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["VariableOrigin"].Value
      }]
    });
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: 'secondary',
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3()),
    icon: "plus",
    onClick: function onClick(event) {
      event.preventDefault();
      var newDataLinks = [].concat(_toConsumableArray(value || []), [{
        field: '',
        url: ''
      }]);

      _onChange(newDataLinks);
    }
  }, "\u6DFB\u52A0"))));
};

/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/configuration/ElasticDetails.tsx":
/*!**************************************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/configuration/ElasticDetails.tsx ***!
  \**************************************************************************************/
/*! exports provided: ElasticDetails, defaultMaxConcurrentShardRequests */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElasticDetails", function() { return ElasticDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultMaxConcurrentShardRequests", function() { return defaultMaxConcurrentShardRequests; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Select = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].Select,
    Input = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].Input,
    FormField = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].FormField;
var indexPatternTypes = [{
  label: 'No pattern',
  value: 'none'
}, {
  label: 'Hourly',
  value: 'Hourly',
  example: '[logstash-]YYYY.MM.DD.HH'
}, {
  label: 'Daily',
  value: 'Daily',
  example: '[logstash-]YYYY.MM.DD'
}, {
  label: 'Weekly',
  value: 'Weekly',
  example: '[logstash-]GGGG.WW'
}, {
  label: 'Monthly',
  value: 'Monthly',
  example: '[logstash-]YYYY.MM'
}, {
  label: 'Yearly',
  value: 'Yearly',
  example: '[logstash-]YYYY'
}];
var esVersions = [{
  label: '2.x',
  value: 2
}, {
  label: '5.x',
  value: 5
}, {
  label: '5.6+',
  value: 56
}, {
  label: '6.0+',
  value: 60
}, {
  label: '7.0+',
  value: 70
}];
var ElasticDetails = function ElasticDetails(props) {
  var value = props.value,
      _onChange = props.onChange;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "page-heading"
  }, "Elasticsearch\u7EC6\u8282"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-inline"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form max-width-25"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    labelWidth: 10,
    inputWidth: 15,
    label: "\u7D22\u5F15\u540D\u79F0",
    value: value.database || '',
    onChange: changeHandler('database', value, _onChange),
    placeholder: 'es-index-name',
    required: true
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form width-14"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    labelWidth: 10,
    label: "\u6A21\u5F0F",
    inputEl: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Select, {
      options: indexPatternTypes,
      onChange: intervalHandler(value, _onChange),
      value: indexPatternTypes.find(function (pattern) {
        return pattern.value === (value.jsonData.interval === undefined ? 'none' : value.jsonData.interval);
      })
    })
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form max-width-25"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    labelWidth: 10,
    inputWidth: 15,
    label: "\u65F6\u95F4\u5B57\u6BB5\u540D\u79F0",
    value: value.jsonData.timeField || '',
    onChange: jsonDataChangeHandler('timeField', value, _onChange),
    required: true
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "gf-form-select-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    labelWidth: 10,
    label: "\u7248\u672C",
    inputEl: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Select, {
      options: esVersions,
      onChange: function onChange(option) {
        var maxConcurrentShardRequests = getMaxConcurrenShardRequestOrDefault(value.jsonData.maxConcurrentShardRequests, option.value);

        _onChange(_objectSpread({}, value, {
          jsonData: _objectSpread({}, value.jsonData, {
            esVersion: option.value,
            maxConcurrentShardRequests: maxConcurrentShardRequests
          })
        }));
      },
      value: esVersions.find(function (version) {
        return version.value === value.jsonData.esVersion;
      })
    })
  }))), value.jsonData.esVersion >= 56 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form max-width-30"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    "aria-label": 'Max concurrent Shard Requests input',
    labelWidth: 15,
    label: "\u6700\u5927\u5E76\u53D1\u5206\u7247\u8BF7\u6C42",
    value: value.jsonData.maxConcurrentShardRequests || '',
    onChange: jsonDataChangeHandler('maxConcurrentShardRequests', value, _onChange)
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-inline"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    labelWidth: 10,
    label: "\u6700\u5C0F\u65F6\u95F4\u95F4\u9694",
    inputEl: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
      className: 'width-6',
      value: value.jsonData.timeInterval || '',
      onChange: jsonDataChangeHandler('timeInterval', value, _onChange),
      placeholder: "10s",
      validationEvents: _defineProperty({}, _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["EventsWithValidation"].onBlur, [Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["regexValidation"])(/^\d+(ms|[Mwdhmsy])$/, '值无效，您可以使用带时间单位的数字指定: y, M, w, d, h, m, s')])
    }),
    tooltip: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "\u81EA\u52A8\u5206\u7EC4\u65F6\u95F4\u95F4\u9694\u7684\u4E0B\u9650\u3002 \u5EFA\u8BAE\u8BBE\u7F6E\u4E3A\u5199\u5165\u9891\u7387\uFF0C\u4F8B\u5982\uFF0C\u5982\u679C\u6BCF\u5206\u949F\u5199\u5165\u4E00\u6B21\u6570\u636E\uFF0C\u5219\u4E3A", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, " 1m "), "\u3002")
  })))));
};

var changeHandler = function changeHandler(key, value, onChange) {
  return function (event) {
    onChange(_objectSpread({}, value, _defineProperty({}, key, event.currentTarget.value)));
  };
};

var jsonDataChangeHandler = function jsonDataChangeHandler(key, value, onChange) {
  return function (event) {
    onChange(_objectSpread({}, value, {
      jsonData: _objectSpread({}, value.jsonData, _defineProperty({}, key, event.currentTarget.value))
    }));
  };
};

var intervalHandler = function intervalHandler(value, onChange) {
  return function (option) {
    var database = value.database; // If option value is undefined it will send its label instead so we have to convert made up value to undefined here.

    var newInterval = option.value === 'none' ? undefined : option.value;

    if (!database || database.length === 0 || database.startsWith('[logstash-]')) {
      var newDatabase = '';

      if (newInterval !== undefined) {
        var pattern = indexPatternTypes.find(function (pattern) {
          return pattern.value === newInterval;
        });

        if (pattern) {
          var _pattern$example;

          newDatabase = (_pattern$example = pattern.example) !== null && _pattern$example !== void 0 ? _pattern$example : '';
        }
      }

      onChange(_objectSpread({}, value, {
        database: newDatabase,
        jsonData: _objectSpread({}, value.jsonData, {
          interval: newInterval
        })
      }));
    } else {
      onChange(_objectSpread({}, value, {
        jsonData: _objectSpread({}, value.jsonData, {
          interval: newInterval
        })
      }));
    }
  };
};

function getMaxConcurrenShardRequestOrDefault(maxConcurrentShardRequests, version) {
  if (maxConcurrentShardRequests === 5 && version < 70) {
    return 256;
  }

  if (maxConcurrentShardRequests === 256 && version >= 70) {
    return 5;
  }

  return maxConcurrentShardRequests || defaultMaxConcurrentShardRequests(version);
}

function defaultMaxConcurrentShardRequests(version) {
  return version >= 70 ? 5 : 256;
}

/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/configuration/LogsConfig.tsx":
/*!**********************************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/configuration/LogsConfig.tsx ***!
  \**********************************************************************************/
/*! exports provided: LogsConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogsConfig", function() { return LogsConfig; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var FormField = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].FormField;
var LogsConfig = function LogsConfig(props) {
  var value = props.value,
      onChange = props.onChange;

  var changeHandler = function changeHandler(key) {
    return function (event) {
      onChange(_objectSpread({}, value, _defineProperty({}, key, event.currentTarget.value)));
    };
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "page-heading"
  }, "\u65E5\u5FD7"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form max-width-30"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    labelWidth: 11,
    label: "\u6D88\u606F\u5B57\u6BB5\u540D\u79F0",
    value: value.logMessageField,
    onChange: changeHandler('logMessageField'),
    placeholder: "_source"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form max-width-30"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    labelWidth: 11,
    label: "\u7EA7\u522B\u5B57\u6BB5\u540D\u79F0",
    value: value.logLevelField,
    onChange: changeHandler('logLevelField')
  }))));
};

/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/datasource.ts":
/*!*******************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/datasource.ts ***!
  \*******************************************************************/
/*! exports provided: ElasticDatasource, enhanceDataFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElasticDatasource", function() { return ElasticDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enhanceDataFrame", function() { return enhanceDataFrame; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _language_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./language_provider */ "./public/app/plugins/datasource/elasticsearch/language_provider.ts");
/* harmony import */ var _elastic_response__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./elastic_response */ "./public/app/plugins/datasource/elasticsearch/elastic_response.ts");
/* harmony import */ var _index_pattern__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./index_pattern */ "./public/app/plugins/datasource/elasticsearch/index_pattern.ts");
/* harmony import */ var _query_builder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./query_builder */ "./public/app/plugins/datasource/elasticsearch/query_builder.ts");
/* harmony import */ var _query_def__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./query_def */ "./public/app/plugins/datasource/elasticsearch/query_def.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }











// Those are metadata fields as defined in https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-fields.html#_identity_metadata_fields.
// custom fields can start with underscores, therefore is not safe to exclude anything that starts with one.
var ELASTIC_META_FIELDS = ['_index', '_type', '_id', '_source', '_size', '_field_names', '_ignored', '_routing', '_meta'];
var ElasticDatasource =
/*#__PURE__*/
function (_DataSourceApi) {
  ElasticDatasource.$inject = ["instanceSettings", "templateSrv", "timeSrv"];

  _inherits(ElasticDatasource, _DataSourceApi);

  /** @ngInject */
  function ElasticDatasource(instanceSettings, templateSrv, timeSrv) {
    var _instanceSettings$dat;

    var _this;

    _classCallCheck(this, ElasticDatasource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ElasticDatasource).call(this, instanceSettings));
    _this.templateSrv = templateSrv;
    _this.timeSrv = timeSrv;
    _this.basicAuth = instanceSettings.basicAuth;
    _this.withCredentials = instanceSettings.withCredentials;
    _this.url = instanceSettings.url;
    _this.name = instanceSettings.name;
    _this.index = (_instanceSettings$dat = instanceSettings.database) !== null && _instanceSettings$dat !== void 0 ? _instanceSettings$dat : '';
    var settingsData = instanceSettings.jsonData || {};
    _this.timeField = settingsData.timeField;
    _this.esVersion = settingsData.esVersion;
    _this.indexPattern = new _index_pattern__WEBPACK_IMPORTED_MODULE_5__["IndexPattern"](_this.index, settingsData.interval);
    _this.interval = settingsData.timeInterval;
    _this.maxConcurrentShardRequests = settingsData.maxConcurrentShardRequests;
    _this.queryBuilder = new _query_builder__WEBPACK_IMPORTED_MODULE_6__["ElasticQueryBuilder"]({
      timeField: _this.timeField,
      esVersion: _this.esVersion
    });
    _this.logMessageField = settingsData.logMessageField || '';
    _this.logLevelField = settingsData.logLevelField || '';
    _this.dataLinks = settingsData.dataLinks || [];

    if (_this.logMessageField === '') {
      _this.logMessageField = undefined;
    }

    if (_this.logLevelField === '') {
      _this.logLevelField = undefined;
    }

    _this.languageProvider = new _language_provider__WEBPACK_IMPORTED_MODULE_3__["default"](_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ElasticDatasource, [{
    key: "request",
    value: function request(method, url, data) {
      var options = {
        url: this.url + '/' + url,
        method: method,
        data: data
      };

      if (this.basicAuth || this.withCredentials) {
        options.withCredentials = true;
      }

      if (this.basicAuth) {
        options.headers = {
          Authorization: this.basicAuth
        };
      }

      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_8__["getBackendSrv"])().datasourceRequest(options).catch(function (err) {
        if (err.data && err.data.error) {
          throw {
            message: 'Elasticsearch error: ' + err.data.error.reason,
            error: err.data.error
          };
        }

        throw err;
      });
    }
  }, {
    key: "importQueries",
    value: function () {
      var _importQueries = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(queries, originMeta) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.languageProvider.importQueries(queries, originMeta.id));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function importQueries(_x, _x2) {
        return _importQueries.apply(this, arguments);
      }

      return importQueries;
    }()
    /**
     * Sends a GET request to the specified url on the newest matching and available index.
     *
     * When multiple indices span the provided time range, the request is sent starting from the newest index,
     * and then going backwards until an index is found.
     *
     * @param url the url to query the index on, for example `/_mapping`.
     */

  }, {
    key: "get",
    value: function get(url) {
      var range = this.timeSrv.timeRange();
      var indexList = this.indexPattern.getIndexList(range.from.valueOf(), range.to.valueOf());

      if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isArray(indexList) && indexList.length) {
        return this.requestAllIndices(indexList, url).then(function (results) {
          results.data.$$config = results.config;
          return results.data;
        });
      } else {
        return this.request('GET', this.indexPattern.getIndexForToday() + url).then(function (results) {
          results.data.$$config = results.config;
          return results.data;
        });
      }
    }
  }, {
    key: "requestAllIndices",
    value: function () {
      var _requestAllIndices = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(indexList, url) {
        var maxTraversals, listLen, i;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                maxTraversals = 7; // do not go beyond one week (for a daily pattern)

                listLen = indexList.length;
                i = 0;

              case 3:
                if (!(i < Math.min(listLen, maxTraversals))) {
                  _context2.next = 17;
                  break;
                }

                _context2.prev = 4;
                _context2.next = 7;
                return this.request('GET', indexList[listLen - i - 1] + url);

              case 7:
                return _context2.abrupt("return", _context2.sent);

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](4);

                if (!(_context2.t0.status !== 404 || i === maxTraversals - 1)) {
                  _context2.next = 14;
                  break;
                }

                throw _context2.t0;

              case 14:
                i++;
                _context2.next = 3;
                break;

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 10]]);
      }));

      function requestAllIndices(_x3, _x4) {
        return _requestAllIndices.apply(this, arguments);
      }

      return requestAllIndices;
    }()
  }, {
    key: "post",
    value: function post(url, data) {
      return this.request('POST', url, data).then(function (results) {
        results.data.$$config = results.config;
        return results.data;
      });
    }
  }, {
    key: "annotationQuery",
    value: function annotationQuery(options) {
      var annotation = options.annotation;
      var timeField = annotation.timeField || '@timestamp';
      var timeEndField = annotation.timeEndField || null;
      var queryString = annotation.query || '*';
      var tagsField = annotation.tagsField || 'tags';
      var textField = annotation.textField || null;
      var dateRanges = [];
      var rangeStart = {};
      rangeStart[timeField] = {
        from: options.range.from.valueOf(),
        to: options.range.to.valueOf(),
        format: 'epoch_millis'
      };
      dateRanges.push({
        range: rangeStart
      });

      if (timeEndField) {
        var rangeEnd = {};
        rangeEnd[timeEndField] = {
          from: options.range.from.valueOf(),
          to: options.range.to.valueOf(),
          format: 'epoch_millis'
        };
        dateRanges.push({
          range: rangeEnd
        });
      }

      var queryInterpolated = this.templateSrv.replace(queryString, {}, 'lucene');
      var query = {
        bool: {
          filter: [{
            bool: {
              should: dateRanges,
              minimum_should_match: 1
            }
          }, {
            query_string: {
              query: queryInterpolated
            }
          }]
        }
      };
      var data = {
        query: query,
        size: 10000
      }; // fields field not supported on ES 5.x

      if (this.esVersion < 5) {
        data['fields'] = [timeField, '_source'];
      }

      var header = {
        search_type: 'query_then_fetch',
        ignore_unavailable: true
      }; // old elastic annotations had index specified on them

      if (annotation.index) {
        header.index = annotation.index;
      } else {
        header.index = this.indexPattern.getIndexList(options.range.from, options.range.to);
      }

      var payload = angular__WEBPACK_IMPORTED_MODULE_0___default.a.toJson(header) + '\n' + angular__WEBPACK_IMPORTED_MODULE_0___default.a.toJson(data) + '\n';
      return this.post('_msearch', payload).then(function (res) {
        var list = [];
        var hits = res.responses[0].hits.hits;

        var getFieldFromSource = function getFieldFromSource(source, fieldName) {
          if (!fieldName) {
            return;
          }

          var fieldNames = fieldName.split('.');
          var fieldValue = source;

          for (var i = 0; i < fieldNames.length; i++) {
            fieldValue = fieldValue[fieldNames[i]];

            if (!fieldValue) {
              console.log('could not find field in annotation: ', fieldName);
              return '';
            }
          }

          return fieldValue;
        };

        for (var i = 0; i < hits.length; i++) {
          var source = hits[i]._source;
          var time = getFieldFromSource(source, timeField);

          if (typeof hits[i].fields !== 'undefined') {
            var fields = hits[i].fields;

            if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isString(fields[timeField]) || lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isNumber(fields[timeField])) {
              time = fields[timeField];
            }
          }

          var event = {
            annotation: annotation,
            time: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["toUtc"])(time).valueOf(),
            text: getFieldFromSource(source, textField),
            tags: getFieldFromSource(source, tagsField)
          };

          if (timeEndField) {
            var timeEnd = getFieldFromSource(source, timeEndField);

            if (timeEnd) {
              event.timeEnd = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["toUtc"])(timeEnd).valueOf();
            }
          } // legacy support for title tield


          if (annotation.titleField) {
            var title = getFieldFromSource(source, annotation.titleField);

            if (title) {
              event.text = title + '\n' + event.text;
            }
          }

          if (typeof event.tags === 'string') {
            event.tags = event.tags.split(',');
          }

          list.push(event);
        }

        return list;
      });
    }
  }, {
    key: "interpolateVariablesInQueries",
    value: function interpolateVariablesInQueries(queries, scopedVars) {
      var _this2 = this;

      var expandedQueries = queries;

      if (queries && queries.length > 0) {
        expandedQueries = queries.map(function (query) {
          var expandedQuery = _objectSpread({}, query, {
            datasource: _this2.name,
            query: _this2.templateSrv.replace(query.query, scopedVars, 'lucene')
          });

          return expandedQuery;
        });
      }

      return expandedQueries;
    }
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      var _this3 = this;

      // validate that the index exist and has date field
      return this.getFields({
        type: 'date'
      }).then(function (dateFields) {
        var timeField = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(dateFields, {
          text: _this3.timeField
        });

        if (!timeField) {
          return {
            status: 'error',
            message: 'No date field named ' + _this3.timeField + ' found'
          };
        }

        return {
          status: 'success',
          message: 'Index OK. Time field name OK.'
        };
      }, function (err) {
        console.error(err);

        if (err.data && err.data.error) {
          var message = angular__WEBPACK_IMPORTED_MODULE_0___default.a.toJson(err.data.error);

          if (err.data.error.reason) {
            message = err.data.error.reason;
          }

          return {
            status: 'error',
            message: message
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
    key: "getQueryHeader",
    value: function getQueryHeader(searchType, timeFrom, timeTo) {
      var queryHeader = {
        search_type: searchType,
        ignore_unavailable: true,
        index: this.indexPattern.getIndexList(timeFrom, timeTo)
      };

      if (this.esVersion >= 56 && this.esVersion < 70) {
        queryHeader['max_concurrent_shard_requests'] = this.maxConcurrentShardRequests;
      }

      return angular__WEBPACK_IMPORTED_MODULE_0___default.a.toJson(queryHeader);
    }
  }, {
    key: "query",
    value: function query(options) {
      var _this4 = this;

      var payload = '';

      var targets = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.cloneDeep(options.targets);

      var sentTargets = []; // add global adhoc filters to timeFilter

      var adhocFilters = this.templateSrv.getAdhocFilters(this.name);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var target = _step.value;

          if (target.hide) {
            continue;
          }

          var queryString = this.templateSrv.replace(target.query, options.scopedVars, 'lucene'); // Elasticsearch queryString should always be '*' if empty string

          if (!queryString || queryString === '') {
            queryString = '*';
          }

          var queryObj = void 0;

          if (target.isLogsQuery || _query_def__WEBPACK_IMPORTED_MODULE_7__["hasMetricOfType"](target, 'logs')) {
            target.bucketAggs = [_query_def__WEBPACK_IMPORTED_MODULE_7__["defaultBucketAgg"]()];
            target.metrics = []; // Setting this for metrics queries that are typed as logs

            target.isLogsQuery = true;
            queryObj = this.queryBuilder.getLogsQuery(target, adhocFilters, queryString);
          } else {
            if (target.alias) {
              target.alias = this.templateSrv.replace(target.alias, options.scopedVars, 'lucene');
            }

            queryObj = this.queryBuilder.build(target, adhocFilters, queryString);
          }

          var esQuery = angular__WEBPACK_IMPORTED_MODULE_0___default.a.toJson(queryObj);
          var searchType = queryObj.size === 0 && this.esVersion < 5 ? 'count' : 'query_then_fetch';
          var header = this.getQueryHeader(searchType, options.range.from, options.range.to);
          payload += header + '\n';
          payload += esQuery + '\n';
          sentTargets.push(target);
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

      if (sentTargets.length === 0) {
        return Promise.resolve({
          data: []
        });
      } // We replace the range here for actual values. We need to replace it together with enclosing "" so that we replace
      // it as an integer not as string with digits. This is because elastic will convert the string only if the time
      // field is specified as type date (which probably should) but can also be specified as integer (millisecond epoch)
      // and then sending string will error out.


      payload = payload.replace(/"\$timeFrom"/g, options.range.from.valueOf().toString());
      payload = payload.replace(/"\$timeTo"/g, options.range.to.valueOf().toString());
      payload = this.templateSrv.replace(payload, options.scopedVars);
      var url = this.getMultiSearchUrl();
      return this.post(url, payload).then(function (res) {
        var er = new _elastic_response__WEBPACK_IMPORTED_MODULE_4__["ElasticResponse"](sentTargets, res);

        if (sentTargets.some(function (target) {
          return target.isLogsQuery;
        })) {
          var response = er.getLogs(_this4.logMessageField, _this4.logLevelField);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = response.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var dataFrame = _step2.value;
              enhanceDataFrame(dataFrame, _this4.dataLinks);
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

          return response;
        }

        return er.getTimeSeries();
      });
    }
  }, {
    key: "isMetadataField",
    value: function isMetadataField(fieldName) {
      return ELASTIC_META_FIELDS.includes(fieldName);
    }
  }, {
    key: "getFields",
    value: function getFields(query) {
      var _this5 = this;

      var configuredEsVersion = this.esVersion;
      return this.get('/_mapping').then(function (result) {
        var typeMap = {
          float: 'number',
          double: 'number',
          integer: 'number',
          long: 'number',
          date: 'date',
          date_nanos: 'date',
          string: 'string',
          text: 'string',
          scaled_float: 'number',
          nested: 'nested'
        };

        var shouldAddField = function shouldAddField(obj, key, query) {
          if (_this5.isMetadataField(key)) {
            return false;
          }

          if (!query.type) {
            return true;
          } // equal query type filter, or via typemap translation


          return query.type === obj.type || query.type === typeMap[obj.type];
        }; // Store subfield names: [system, process, cpu, total] -> system.process.cpu.total


        var fieldNameParts = [];
        var fields = {};

        function getFieldsRecursively(obj) {
          for (var key in obj) {
            var subObj = obj[key]; // Check mapping field for nested fields

            if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isObject(subObj.properties)) {
              fieldNameParts.push(key);
              getFieldsRecursively(subObj.properties);
            }

            if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isObject(subObj.fields)) {
              fieldNameParts.push(key);
              getFieldsRecursively(subObj.fields);
            }

            if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isString(subObj.type)) {
              var fieldName = fieldNameParts.concat(key).join('.'); // Hide meta-fields and check field type

              if (shouldAddField(subObj, key, query)) {
                fields[fieldName] = {
                  text: fieldName,
                  type: subObj.type
                };
              }
            }
          }

          fieldNameParts.pop();
        }

        for (var indexName in result) {
          var index = result[indexName];

          if (index && index.mappings) {
            var mappings = index.mappings;

            if (configuredEsVersion < 70) {
              for (var typeName in mappings) {
                var properties = mappings[typeName].properties;
                getFieldsRecursively(properties);
              }
            } else {
              var _properties = mappings.properties;
              getFieldsRecursively(_properties);
            }
          }
        } // transform to array


        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(fields, function (value) {
          return value;
        });
      });
    }
  }, {
    key: "getTerms",
    value: function getTerms(queryDef) {
      var range = this.timeSrv.timeRange();
      var searchType = this.esVersion >= 5 ? 'query_then_fetch' : 'count';
      var header = this.getQueryHeader(searchType, range.from, range.to);
      var esQuery = angular__WEBPACK_IMPORTED_MODULE_0___default.a.toJson(this.queryBuilder.getTermsQuery(queryDef));
      esQuery = esQuery.replace(/\$timeFrom/g, range.from.valueOf().toString());
      esQuery = esQuery.replace(/\$timeTo/g, range.to.valueOf().toString());
      esQuery = header + '\n' + esQuery + '\n';
      var url = this.getMultiSearchUrl();
      return this.post(url, esQuery).then(function (res) {
        if (!res.responses[0].aggregations) {
          return [];
        }

        var buckets = res.responses[0].aggregations['1'].buckets;
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(buckets, function (bucket) {
          return {
            text: bucket.key_as_string || bucket.key,
            value: bucket.key
          };
        });
      });
    }
  }, {
    key: "getMultiSearchUrl",
    value: function getMultiSearchUrl() {
      if (this.esVersion >= 70 && this.maxConcurrentShardRequests) {
        return "_msearch?max_concurrent_shard_requests=".concat(this.maxConcurrentShardRequests);
      }

      return '_msearch';
    }
  }, {
    key: "metricFindQuery",
    value: function metricFindQuery(query) {
      query = angular__WEBPACK_IMPORTED_MODULE_0___default.a.fromJson(query);

      if (query) {
        if (query.find === 'fields') {
          query.field = this.templateSrv.replace(query.field, {}, 'lucene');
          return this.getFields(query);
        }

        if (query.find === 'terms') {
          query.field = this.templateSrv.replace(query.field, {}, 'lucene');
          query.query = this.templateSrv.replace(query.query || '*', {}, 'lucene');
          return this.getTerms(query);
        }
      }

      return Promise.resolve([]);
    }
  }, {
    key: "getTagKeys",
    value: function getTagKeys() {
      return this.getFields({});
    }
  }, {
    key: "getTagValues",
    value: function getTagValues(options) {
      return this.getTerms({
        field: options.key,
        query: '*'
      });
    }
  }, {
    key: "targetContainsTemplate",
    value: function targetContainsTemplate(target) {
      if (this.templateSrv.variableExists(target.query) || this.templateSrv.variableExists(target.alias)) {
        return true;
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = target.bucketAggs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var bucketAgg = _step3.value;

          if (this.templateSrv.variableExists(bucketAgg.field) || this.objectContainsTemplate(bucketAgg.settings)) {
            return true;
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

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = target.metrics[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var metric = _step4.value;

          if (this.templateSrv.variableExists(metric.field) || this.objectContainsTemplate(metric.settings) || this.objectContainsTemplate(metric.meta)) {
            return true;
          }
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

      return false;
    }
  }, {
    key: "isPrimitive",
    value: function isPrimitive(obj) {
      if (obj === null || obj === undefined) {
        return true;
      }

      if (['string', 'number', 'boolean'].some(function (type) {
        return type === _typeof(true);
      })) {
        return true;
      }

      return false;
    }
  }, {
    key: "objectContainsTemplate",
    value: function objectContainsTemplate(obj) {
      if (!obj) {
        return false;
      }

      for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];

        if (this.isPrimitive(obj[key])) {
          if (this.templateSrv.variableExists(obj[key])) {
            return true;
          }
        } else if (Array.isArray(obj[key])) {
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = obj[key][Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var item = _step5.value;

              if (this.objectContainsTemplate(item)) {
                return true;
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        } else {
          if (this.objectContainsTemplate(obj[key])) {
            return true;
          }
        }
      }

      return false;
    }
  }]);

  return ElasticDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["DataSourceApi"]);
/**
 * Modifies dataframe and adds dataLinks from the config.
 * Exported for tests.
 */

function enhanceDataFrame(dataFrame, dataLinks) {
  if (dataLinks.length) {
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      var _loop = function _loop() {
        var field = _step6.value;
        var dataLinkConfig = dataLinks.find(function (dataLink) {
          return field.name && field.name.match(dataLink.field);
        });

        if (dataLinkConfig) {
          var link;

          if (dataLinkConfig.datasourceUid) {
            link = {
              title: '',
              url: '',
              internal: {
                query: {
                  query: dataLinkConfig.url
                },
                datasourceUid: dataLinkConfig.datasourceUid
              }
            };
          } else {
            link = {
              title: '',
              url: dataLinkConfig.url
            };
          }

          field.config = field.config || {};
          field.config.links = [].concat(_toConsumableArray(field.config.links || []), [link]);
        }
      };

      for (var _iterator6 = dataFrame.fields[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }
  }
}

/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/elastic_response.ts":
/*!*************************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/elastic_response.ts ***!
  \*************************************************************************/
/*! exports provided: ElasticResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElasticResponse", function() { return ElasticResponse; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_utils_flatten__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/utils/flatten */ "./public/app/core/utils/flatten.ts");
/* harmony import */ var _query_def__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query_def */ "./public/app/plugins/datasource/elasticsearch/query_def.ts");
/* harmony import */ var app_core_table_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/table_model */ "./public/app/core/table_model.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var ElasticResponse =
/*#__PURE__*/
function () {
  function ElasticResponse(targets, response) {
    var _this = this;

    _classCallCheck(this, ElasticResponse);

    this.targets = targets;
    this.response = response;

    this.processResponseToSeries = function () {
      var seriesList = [];

      for (var i = 0; i < _this.response.responses.length; i++) {
        var _response = _this.response.responses[i];
        var target = _this.targets[i];

        if (_response.error) {
          throw _this.getErrorFromElasticResponse(_this.response, _response.error);
        }

        if (_response.hits && _response.hits.hits.length > 0) {
          _this.processHits(_response.hits, seriesList, target);
        }

        if (_response.aggregations) {
          var aggregations = _response.aggregations;
          var tmpSeriesList = [];
          var table = new app_core_table_model__WEBPACK_IMPORTED_MODULE_3__["default"]();
          table.refId = target.refId;

          _this.processBuckets(aggregations, target, tmpSeriesList, table, {}, 0);

          _this.trimDatapoints(tmpSeriesList, target);

          _this.nameSeries(tmpSeriesList, target);

          for (var y = 0; y < tmpSeriesList.length; y++) {
            seriesList.push(tmpSeriesList[y]);
          }

          if (table.rows.length > 0) {
            seriesList.push(table);
          }
        }
      }

      return {
        data: seriesList
      };
    };

    this.targets = targets;
    this.response = response;
  }

  _createClass(ElasticResponse, [{
    key: "processMetrics",
    value: function processMetrics(esAgg, target, seriesList, props) {
      var metric, y, i, bucket, value;
      var newSeries;

      for (y = 0; y < target.metrics.length; y++) {
        metric = target.metrics[y];

        if (metric.hide) {
          continue;
        }

        switch (metric.type) {
          case 'count':
            {
              newSeries = {
                datapoints: [],
                metric: 'count',
                props: props,
                refId: target.refId
              };

              for (i = 0; i < esAgg.buckets.length; i++) {
                bucket = esAgg.buckets[i];
                value = bucket.doc_count;
                newSeries.datapoints.push([value, bucket.key]);
              }

              seriesList.push(newSeries);
              break;
            }

          case 'percentiles':
            {
              if (esAgg.buckets.length === 0) {
                break;
              }

              var firstBucket = esAgg.buckets[0];
              var percentiles = firstBucket[metric.id].values;

              for (var percentileName in percentiles) {
                newSeries = {
                  datapoints: [],
                  metric: 'p' + percentileName,
                  props: props,
                  field: metric.field,
                  refId: target.refId
                };

                for (i = 0; i < esAgg.buckets.length; i++) {
                  bucket = esAgg.buckets[i];
                  var values = bucket[metric.id].values;
                  newSeries.datapoints.push([values[percentileName], bucket.key]);
                }

                seriesList.push(newSeries);
              }

              break;
            }

          case 'extended_stats':
            {
              for (var statName in metric.meta) {
                if (!metric.meta[statName]) {
                  continue;
                }

                newSeries = {
                  datapoints: [],
                  metric: statName,
                  props: props,
                  field: metric.field,
                  refId: target.refId
                };

                for (i = 0; i < esAgg.buckets.length; i++) {
                  bucket = esAgg.buckets[i];
                  var stats = bucket[metric.id]; // add stats that are in nested obj to top level obj

                  stats.std_deviation_bounds_upper = stats.std_deviation_bounds.upper;
                  stats.std_deviation_bounds_lower = stats.std_deviation_bounds.lower;
                  newSeries.datapoints.push([stats[statName], bucket.key]);
                }

                seriesList.push(newSeries);
              }

              break;
            }

          default:
            {
              newSeries = {
                datapoints: [],
                metric: metric.type,
                field: metric.field,
                metricId: metric.id,
                props: props,
                refId: target.refId
              };

              for (i = 0; i < esAgg.buckets.length; i++) {
                bucket = esAgg.buckets[i];
                value = bucket[metric.id];

                if (value !== undefined) {
                  if (value.normalized_value) {
                    newSeries.datapoints.push([value.normalized_value, bucket.key]);
                  } else {
                    newSeries.datapoints.push([value.value, bucket.key]);
                  }
                }
              }

              seriesList.push(newSeries);
              break;
            }
        }
      }
    }
  }, {
    key: "processAggregationDocs",
    value: function processAggregationDocs(esAgg, aggDef, target, table, props) {
      // add columns
      if (table.columns.length === 0) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var propKey = _step.value;
            table.addColumn({
              text: propKey,
              filterable: true
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

        table.addColumn({
          text: aggDef.field,
          filterable: true
        });
      } // helper func to add values to value array


      var addMetricValue = function addMetricValue(values, metricName, value) {
        table.addColumn({
          text: metricName
        });
        values.push(value);
      };

      var buckets = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isArray(esAgg.buckets) ? esAgg.buckets : [esAgg.buckets];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = buckets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var bucket = _step2.value;
          var values = [];
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.values(props)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var propValues = _step3.value;
              values.push(propValues);
            } // add bucket key (value)

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

          values.push(bucket.key);
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = target.metrics[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var metric = _step4.value;

              switch (metric.type) {
                case 'count':
                  {
                    addMetricValue(values, this.getMetricName(metric.type), bucket.doc_count);
                    break;
                  }

                case 'extended_stats':
                  {
                    for (var statName in metric.meta) {
                      if (!metric.meta[statName]) {
                        continue;
                      }

                      var stats = bucket[metric.id]; // add stats that are in nested obj to top level obj

                      stats.std_deviation_bounds_upper = stats.std_deviation_bounds.upper;
                      stats.std_deviation_bounds_lower = stats.std_deviation_bounds.lower;
                      addMetricValue(values, this.getMetricName(statName), stats[statName]);
                    }

                    break;
                  }

                case 'percentiles':
                  {
                    var percentiles = bucket[metric.id].values;

                    for (var percentileName in percentiles) {
                      addMetricValue(values, "p".concat(percentileName, " ").concat(metric.field), percentiles[percentileName]);
                    }

                    break;
                  }

                default:
                  {
                    var metricName = this.getMetricName(metric.type);

                    var otherMetrics = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(target.metrics, {
                      type: metric.type
                    }); // if more of the same metric type include field field name in property


                    if (otherMetrics.length > 1) {
                      metricName += ' ' + metric.field;

                      if (metric.type === 'bucket_script') {
                        //Use the formula in the column name
                        metricName = metric.settings.script;
                      }
                    }

                    addMetricValue(values, metricName, bucket[metric.id].value);
                    break;
                  }
              }
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

          table.rows.push(values);
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
    } // This is quite complex
    // need to recurse down the nested buckets to build series

  }, {
    key: "processBuckets",
    value: function processBuckets(aggs, target, seriesList, table, props, depth) {
      var bucket, aggDef, esAgg, aggId;
      var maxDepth = target.bucketAggs.length - 1;

      for (aggId in aggs) {
        aggDef = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(target.bucketAggs, {
          id: aggId
        });
        esAgg = aggs[aggId];

        if (!aggDef) {
          continue;
        }

        if (depth === maxDepth) {
          if (aggDef.type === 'date_histogram') {
            this.processMetrics(esAgg, target, seriesList, props);
          } else {
            this.processAggregationDocs(esAgg, aggDef, target, table, props);
          }
        } else {
          for (var nameIndex in esAgg.buckets) {
            bucket = esAgg.buckets[nameIndex];
            props = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.clone(props);

            if (bucket.key !== void 0) {
              props[aggDef.field] = bucket.key;
            } else {
              props['filter'] = nameIndex;
            }

            if (bucket.key_as_string) {
              props[aggDef.field] = bucket.key_as_string;
            }

            this.processBuckets(bucket, target, seriesList, table, props, depth + 1);
          }
        }
      }
    }
  }, {
    key: "getMetricName",
    value: function getMetricName(metric) {
      var metricDef = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(_query_def__WEBPACK_IMPORTED_MODULE_2__["metricAggTypes"], {
        value: metric
      });

      if (!metricDef) {
        metricDef = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(_query_def__WEBPACK_IMPORTED_MODULE_2__["extendedStats"], {
          value: metric
        });
      }

      return metricDef ? metricDef.text : metric;
    }
  }, {
    key: "getSeriesName",
    value: function getSeriesName(series, target, metricTypeCount) {
      var metricName = this.getMetricName(series.metric);

      if (target.alias) {
        var regex = /\{\{([\s\S]+?)\}\}/g;
        return target.alias.replace(regex, function (match, g1, g2) {
          var group = g1 || g2;

          if (group.indexOf('term ') === 0) {
            return series.props[group.substring(5)];
          }

          if (series.props[group] !== void 0) {
            return series.props[group];
          }

          if (group === 'metric') {
            return metricName;
          }

          if (group === 'field') {
            return series.field || '';
          }

          return match;
        });
      }

      if (series.field && _query_def__WEBPACK_IMPORTED_MODULE_2__["isPipelineAgg"](series.metric)) {
        if (series.metric && _query_def__WEBPACK_IMPORTED_MODULE_2__["isPipelineAggWithMultipleBucketPaths"](series.metric)) {
          var agg = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(target.metrics, {
            id: series.metricId
          });

          if (agg && agg.settings.script) {
            metricName = agg.settings.script;
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
              for (var _iterator5 = agg.pipelineVariables[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                var pv = _step5.value;

                var appliedAgg = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(target.metrics, {
                  id: pv.pipelineAgg
                });

                if (appliedAgg) {
                  metricName = metricName.replace('params.' + pv.name, _query_def__WEBPACK_IMPORTED_MODULE_2__["describeMetric"](appliedAgg));
                }
              }
            } catch (err) {
              _didIteratorError5 = true;
              _iteratorError5 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                  _iterator5.return();
                }
              } finally {
                if (_didIteratorError5) {
                  throw _iteratorError5;
                }
              }
            }
          } else {
            metricName = 'Unset';
          }
        } else {
          var _appliedAgg = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(target.metrics, {
            id: series.field
          });

          if (_appliedAgg) {
            metricName += ' ' + _query_def__WEBPACK_IMPORTED_MODULE_2__["describeMetric"](_appliedAgg);
          } else {
            metricName = 'Unset';
          }
        }
      } else if (series.field) {
        metricName += ' ' + series.field;
      }

      var propKeys = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(series.props);

      if (propKeys.length === 0) {
        return metricName;
      }

      var name = '';

      for (var propName in series.props) {
        name += series.props[propName] + ' ';
      }

      if (metricTypeCount === 1) {
        return name.trim();
      }

      return name.trim() + ' ' + metricName;
    }
  }, {
    key: "nameSeries",
    value: function nameSeries(seriesList, target) {
      var metricTypeCount = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniq(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(seriesList, 'metric')).length;

      for (var i = 0; i < seriesList.length; i++) {
        var series = seriesList[i];
        series.target = this.getSeriesName(series, target, metricTypeCount);
      }
    }
  }, {
    key: "processHits",
    value: function processHits(hits, seriesList, target) {
      var hitsTotal = typeof hits.total === 'number' ? hits.total : hits.total.value; // <- Works with Elasticsearch 7.0+

      var series = {
        target: target.refId,
        type: 'docs',
        refId: target.refId,
        datapoints: [],
        total: hitsTotal,
        filterable: true
      };
      var propName, hit, doc, i;

      for (i = 0; i < hits.hits.length; i++) {
        hit = hits.hits[i];
        doc = {
          _id: hit._id,
          _type: hit._type,
          _index: hit._index
        };

        if (hit._source) {
          for (propName in hit._source) {
            doc[propName] = hit._source[propName];
          }
        }

        for (propName in hit.fields) {
          doc[propName] = hit.fields[propName];
        }

        series.datapoints.push(doc);
      }

      seriesList.push(series);
    }
  }, {
    key: "trimDatapoints",
    value: function trimDatapoints(aggregations, target) {
      var histogram = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(target.bucketAggs, {
        type: 'date_histogram'
      });

      var shouldDropFirstAndLast = histogram && histogram.settings && histogram.settings.trimEdges;

      if (shouldDropFirstAndLast) {
        var trim = histogram.settings.trimEdges;

        for (var prop in aggregations) {
          var points = aggregations[prop];

          if (points.datapoints.length > trim * 2) {
            points.datapoints = points.datapoints.slice(trim, points.datapoints.length - trim);
          }
        }
      }
    }
  }, {
    key: "getErrorFromElasticResponse",
    value: function getErrorFromElasticResponse(response, err) {
      var result = {};
      result.data = JSON.stringify(err, null, 4);

      if (err.root_cause && err.root_cause.length > 0 && err.root_cause[0].reason) {
        result.message = err.root_cause[0].reason;
      } else {
        result.message = err.reason || 'Unknown elastic error response';
      }

      if (response.$$config) {
        result.config = response.$$config;
      }

      return result;
    }
  }, {
    key: "getTimeSeries",
    value: function getTimeSeries() {
      if (this.targets.some(function (target) {
        return target.metrics.some(function (metric) {
          return metric.type === 'raw_data';
        });
      })) {
        return this.processResponseToDataFrames(false);
      }

      return this.processResponseToSeries();
    }
  }, {
    key: "getLogs",
    value: function getLogs(logMessageField, logLevelField) {
      return this.processResponseToDataFrames(true, logMessageField, logLevelField);
    }
  }, {
    key: "processResponseToDataFrames",
    value: function processResponseToDataFrames(isLogsRequest, logMessageField, logLevelField) {
      var dataFrame = [];

      for (var n = 0; n < this.response.responses.length; n++) {
        var _response2 = this.response.responses[n];

        if (_response2.error) {
          throw this.getErrorFromElasticResponse(this.response, _response2.error);
        }

        if (_response2.hits && _response2.hits.hits.length > 0) {
          var _flattenHits = flattenHits(_response2.hits.hits),
              propNames = _flattenHits.propNames,
              docs = _flattenHits.docs;

          if (docs.length > 0) {
            var series = createEmptyDataFrame(propNames, this.targets[0].timeField, isLogsRequest, logMessageField, logLevelField); // Add a row for each document

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
              for (var _iterator6 = docs[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var doc = _step6.value;

                if (logLevelField) {
                  // Remap level field based on the datasource config. This field is then used in explore to figure out the
                  // log level. We may rewrite some actual data in the level field if they are different.
                  doc['level'] = doc[logLevelField];
                }

                series.add(doc);
              }
            } catch (err) {
              _didIteratorError6 = true;
              _iteratorError6 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
                  _iterator6.return();
                }
              } finally {
                if (_didIteratorError6) {
                  throw _iteratorError6;
                }
              }
            }

            if (isLogsRequest) {
              series = addPreferredVisualisationType(series, 'logs');
            }

            var target = this.targets[n];
            series.refId = target.refId;
            dataFrame.push(series);
          }
        }

        if (_response2.aggregations) {
          var aggregations = _response2.aggregations;
          var _target = this.targets[n];
          var tmpSeriesList = [];
          var table = new app_core_table_model__WEBPACK_IMPORTED_MODULE_3__["default"]();
          this.processBuckets(aggregations, _target, tmpSeriesList, table, {}, 0);
          this.trimDatapoints(tmpSeriesList, _target);
          this.nameSeries(tmpSeriesList, _target);

          if (table.rows.length > 0) {
            var _series = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["toDataFrame"])(table);

            _series.refId = _target.refId;
            dataFrame.push(_series);
          }

          for (var y = 0; y < tmpSeriesList.length; y++) {
            var _series2 = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["toDataFrame"])(tmpSeriesList[y]); // When log results, show aggregations only in graph. Log fields are then going to be shown in table.


            if (isLogsRequest) {
              _series2 = addPreferredVisualisationType(_series2, 'graph');
            }

            _series2.refId = _target.refId;
            dataFrame.push(_series2);
          }
        }
      }

      return {
        data: dataFrame
      };
    }
  }]);

  return ElasticResponse;
}();

/**
 * Flatten the docs from response mainly the _source part which can be nested. This flattens it so that it is one level
 * deep and the keys are: `level1Name.level2Name...`. Also returns list of all properties from all the docs (not all
 * docs have to have the same keys).
 * @param hits
 */
var flattenHits = function flattenHits(hits) {
  var docs = []; // We keep a list of all props so that we can create all the fields in the dataFrame, this can lead
  // to wide sparse dataframes in case the scheme is different per document.

  var propNames = [];
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = hits[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var hit = _step7.value;
      var flattened = hit._source ? Object(app_core_utils_flatten__WEBPACK_IMPORTED_MODULE_1__["default"])(hit._source) : {};

      var doc = _objectSpread({
        _id: hit._id,
        _type: hit._type,
        _index: hit._index,
        _source: _objectSpread({}, flattened)
      }, flattened);

      for (var _i = 0, _Object$keys = Object.keys(doc); _i < _Object$keys.length; _i++) {
        var propName = _Object$keys[_i];

        if (propNames.indexOf(propName) === -1) {
          propNames.push(propName);
        }
      }

      docs.push(doc);
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  propNames.sort();
  return {
    docs: docs,
    propNames: propNames
  };
};
/**
 * Create empty dataframe but with created fields. Fields are based from propNames (should be from the response) and
 * also from configuration specified fields for message, time, and level.
 * @param propNames
 * @param timeField
 * @param logMessageField
 * @param logLevelField
 */


var createEmptyDataFrame = function createEmptyDataFrame(propNames, timeField, isLogsRequest, logMessageField, logLevelField) {
  var series = new _grafana_data__WEBPACK_IMPORTED_MODULE_4__["MutableDataFrame"]({
    fields: []
  });
  series.addField({
    config: {
      filterable: true
    },
    name: timeField,
    type: _grafana_data__WEBPACK_IMPORTED_MODULE_4__["FieldType"].time
  });

  if (logMessageField) {
    series.addField({
      name: logMessageField,
      type: _grafana_data__WEBPACK_IMPORTED_MODULE_4__["FieldType"].string
    }).parse = function (v) {
      return v || '';
    };
  }

  if (logLevelField) {
    series.addField({
      name: 'level',
      type: _grafana_data__WEBPACK_IMPORTED_MODULE_4__["FieldType"].string
    }).parse = function (v) {
      return v || '';
    };
  }

  var fieldNames = series.fields.map(function (field) {
    return field.name;
  });
  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = propNames[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var propName = _step8.value;

      // Do not duplicate fields. This can mean that we will shadow some fields.
      if (fieldNames.includes(propName)) {
        continue;
      } // Do not add _source field (besides logs) as we are showing each _source field in table instead.


      if (!isLogsRequest && propName === '_source') {
        continue;
      }

      series.addField({
        config: {
          filterable: true
        },
        name: propName,
        type: _grafana_data__WEBPACK_IMPORTED_MODULE_4__["FieldType"].string
      }).parse = function (v) {
        return v || '';
      };
    }
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
        _iterator8.return();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }

  return series;
};

var addPreferredVisualisationType = function addPreferredVisualisationType(series, type) {
  var s = series;
  s.meta ? s.meta.preferredVisualisationType = type : s.meta = {
    preferredVisualisationType: type
  };
  return s;
};

/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/index_pattern.ts":
/*!**********************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/index_pattern.ts ***!
  \**********************************************************************/
/*! exports provided: IndexPattern */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexPattern", function() { return IndexPattern; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var intervalMap = {
  Hourly: {
    startOf: 'hour',
    amount: 'hours'
  },
  Daily: {
    startOf: 'day',
    amount: 'days'
  },
  Weekly: {
    startOf: 'isoWeek',
    amount: 'weeks'
  },
  Monthly: {
    startOf: 'month',
    amount: 'months'
  },
  Yearly: {
    startOf: 'year',
    amount: 'years'
  }
};
var IndexPattern =
/*#__PURE__*/
function () {
  function IndexPattern(pattern, interval) {
    _classCallCheck(this, IndexPattern);

    this.pattern = pattern;
    this.interval = interval;
    this.dateLocale = 'en';
  }

  _createClass(IndexPattern, [{
    key: "getIndexForToday",
    value: function getIndexForToday() {
      if (this.interval) {
        return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["toUtc"])().locale(this.dateLocale).format(this.pattern);
      } else {
        return this.pattern;
      }
    }
  }, {
    key: "getIndexList",
    value: function getIndexList(from, to) {
      if (!this.interval) {
        return this.pattern;
      }

      var intervalInfo = intervalMap[this.interval];
      var start = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["dateTime"])(from).utc().startOf(intervalInfo.startOf);
      var endEpoch = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["dateTime"])(to).utc().startOf(intervalInfo.startOf).valueOf();
      var indexList = [];

      while (start.valueOf() <= endEpoch) {
        indexList.push(start.locale(this.dateLocale).format(this.pattern));
        start.add(1, intervalInfo.amount);
      }

      return indexList;
    }
  }]);

  return IndexPattern;
}();

/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/language_provider.ts":
/*!**************************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/language_provider.ts ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ElasticsearchLanguageProvider; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _prometheus_promql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../prometheus/promql */ "./public/app/plugins/datasource/prometheus/promql.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





function getNameLabelValue(promQuery, tokens) {
  var nameLabelValue = '';

  for (var prop in tokens) {
    if (typeof tokens[prop] === 'string') {
      nameLabelValue = tokens[prop];
      break;
    }
  }

  return nameLabelValue;
}

function extractPrometheusLabels(promQuery) {
  var labels = [];

  if (!promQuery || promQuery.length === 0) {
    return labels;
  }

  var tokens = prismjs__WEBPACK_IMPORTED_MODULE_1___default.a.tokenize(promQuery, _prometheus_promql__WEBPACK_IMPORTED_MODULE_2__["default"]);
  var nameLabelValue = getNameLabelValue(promQuery, tokens);

  if (nameLabelValue && nameLabelValue.length > 0) {
    labels.push(['__name__', '=', '"' + nameLabelValue + '"']);
  }

  for (var prop in tokens) {
    if (tokens[prop] instanceof prismjs__WEBPACK_IMPORTED_MODULE_1__["Token"]) {
      var token = tokens[prop];

      if (token.type === 'context-labels') {
        var labelKey = '';
        var labelValue = '';
        var labelOperator = '';
        var contentTokens = token.content;

        for (var currentToken in contentTokens) {
          if (typeof contentTokens[currentToken] === 'string') {
            var currentStr = void 0;
            currentStr = contentTokens[currentToken];

            if (currentStr === '=' || currentStr === '!=' || currentStr === '=~' || currentStr === '!~') {
              labelOperator = currentStr;
            }
          } else if (contentTokens[currentToken] instanceof prismjs__WEBPACK_IMPORTED_MODULE_1__["Token"]) {
            switch (contentTokens[currentToken].type) {
              case 'label-key':
                labelKey = contentTokens[currentToken].content;
                break;

              case 'label-value':
                labelValue = contentTokens[currentToken].content;
                labels.push([labelKey, labelOperator, labelValue]);
                break;
            }
          }
        }
      }
    }
  }

  return labels;
}

function getElasticsearchQuery(prometheusLabels) {
  var elasticsearchLuceneLabels = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = prometheusLabels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var keyOperatorValue = _step.value;

      switch (keyOperatorValue[1]) {
        case '=':
          {
            elasticsearchLuceneLabels.push(keyOperatorValue[0] + ':' + keyOperatorValue[2]);
            break;
          }

        case '!=':
          {
            elasticsearchLuceneLabels.push('NOT ' + keyOperatorValue[0] + ':' + keyOperatorValue[2]);
            break;
          }

        case '=~':
          {
            elasticsearchLuceneLabels.push(keyOperatorValue[0] + ':/' + keyOperatorValue[2].substring(1, keyOperatorValue[2].length - 1) + '/');
            break;
          }

        case '!~':
          {
            elasticsearchLuceneLabels.push('NOT ' + keyOperatorValue[0] + ':/' + keyOperatorValue[2].substring(1, keyOperatorValue[2].length - 1) + '/');
            break;
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

  return elasticsearchLuceneLabels.join(' AND ');
}

var ElasticsearchLanguageProvider =
/*#__PURE__*/
function (_LanguageProvider) {
  _inherits(ElasticsearchLanguageProvider, _LanguageProvider);

  function ElasticsearchLanguageProvider(datasource, initialValues) {
    var _this;

    _classCallCheck(this, ElasticsearchLanguageProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ElasticsearchLanguageProvider).call(this));
    _this.datasource = datasource;
    Object.assign(_assertThisInitialized(_this), initialValues);
    return _this;
  }

  _createClass(ElasticsearchLanguageProvider, [{
    key: "importQueries",
    value: function importQueries(queries, datasourceType) {
      if (datasourceType === 'prometheus' || datasourceType === 'loki') {
        return queries.map(function (query) {
          var prometheusQuery = query;
          var expr = getElasticsearchQuery(extractPrometheusLabels(prometheusQuery.expr));
          return {
            isLogsQuery: true,
            query: expr,
            refId: query.refId
          };
        });
      }

      return queries.map(function (query) {
        return {
          isLogsQuery: true,
          query: '',
          refId: query.refId
        };
      });
    }
  }]);

  return ElasticsearchLanguageProvider;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["LanguageProvider"]);



/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/metric_agg.ts":
/*!*******************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/metric_agg.ts ***!
  \*******************************************************************/
/*! exports provided: ElasticMetricAggCtrl, elasticMetricAgg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElasticMetricAggCtrl", function() { return ElasticMetricAggCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elasticMetricAgg", function() { return elasticMetricAgg; });
/* harmony import */ var app_core_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/core_module */ "./public/app/core/core_module.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _query_def__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query_def */ "./public/app/plugins/datasource/elasticsearch/query_def.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var ElasticMetricAggCtrl =
/** @ngInject */
function ElasticMetricAggCtrl($scope, uiSegmentSrv, $rootScope) {
  _classCallCheck(this, ElasticMetricAggCtrl);

  var metricAggs = $scope.target.metrics;
  $scope.metricAggTypes = _query_def__WEBPACK_IMPORTED_MODULE_2__["getMetricAggTypes"]($scope.esVersion);
  $scope.extendedStats = _query_def__WEBPACK_IMPORTED_MODULE_2__["extendedStats"];
  $scope.pipelineAggOptions = [];
  $scope.modelSettingsValues = {};

  $scope.init = function () {
    $scope.agg = metricAggs[$scope.index];
    $scope.validateModel();
    $scope.updatePipelineAggOptions();
  };

  $scope.updatePipelineAggOptions = function () {
    $scope.pipelineAggOptions = _query_def__WEBPACK_IMPORTED_MODULE_2__["getPipelineAggOptions"]($scope.target);
  };

  $rootScope.onAppEvent(app_types__WEBPACK_IMPORTED_MODULE_3__["CoreEvents"].elasticQueryUpdated, function () {
    $scope.index = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.indexOf(metricAggs, $scope.agg);
    $scope.updatePipelineAggOptions();
    $scope.validateModel();
  }, $scope);

  $scope.validateModel = function () {
    $scope.isFirst = $scope.index === 0;
    $scope.isSingle = metricAggs.length === 1;
    $scope.settingsLinkText = '';
    $scope.variablesLinkText = '';
    $scope.aggDef = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find($scope.metricAggTypes, {
      value: $scope.agg.type
    });

    if (_query_def__WEBPACK_IMPORTED_MODULE_2__["isPipelineAgg"]($scope.agg.type)) {
      if (_query_def__WEBPACK_IMPORTED_MODULE_2__["isPipelineAggWithMultipleBucketPaths"]($scope.agg.type)) {
        $scope.variablesLinkText = '选项';

        if ($scope.agg.settings.script) {
          $scope.variablesLinkText = 'Script: ' + $scope.agg.settings.script.replace(new RegExp('params.', 'g'), '');
        }
      } else {
        $scope.agg.pipelineAgg = $scope.agg.pipelineAgg || 'select metric';
        $scope.agg.field = $scope.agg.pipelineAgg;
      }

      var pipelineOptions = _query_def__WEBPACK_IMPORTED_MODULE_2__["getPipelineOptions"]($scope.agg);

      if (pipelineOptions.length > 0) {
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(pipelineOptions, function (opt) {
          $scope.agg.settings[opt.text] = $scope.agg.settings[opt.text] || opt.default;
        });

        $scope.settingsLinkText = '选项';
      }
    } else if (!$scope.agg.field) {
      $scope.agg.field = 'select field';
    }

    switch ($scope.agg.type) {
      case 'cardinality':
        {
          var precisionThreshold = $scope.agg.settings.precision_threshold || '';
          $scope.settingsLinkText = 'Precision threshold: ' + precisionThreshold;
          break;
        }

      case 'percentiles':
        {
          $scope.agg.settings.percents = $scope.agg.settings.percents || [25, 50, 75, 95, 99];
          $scope.settingsLinkText = 'Values: ' + $scope.agg.settings.percents.join(',');
          break;
        }

      case 'extended_stats':
        {
          if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.keys($scope.agg.meta).length === 0) {
            $scope.agg.meta.std_deviation_bounds_lower = true;
            $scope.agg.meta.std_deviation_bounds_upper = true;
          }

          var stats = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.reduce($scope.agg.meta, function (memo, val, key) {
            if (val) {
              var def = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find($scope.extendedStats, {
                value: key
              });

              memo.push(def.text);
            }

            return memo;
          }, []);

          $scope.settingsLinkText = 'Stats: ' + stats.join(', ');
          break;
        }

      case 'moving_avg':
        {
          $scope.movingAvgModelTypes = _query_def__WEBPACK_IMPORTED_MODULE_2__["movingAvgModelOptions"];
          $scope.modelSettings = _query_def__WEBPACK_IMPORTED_MODULE_2__["getMovingAvgSettings"]($scope.agg.settings.model, true);
          $scope.updateMovingAvgModelSettings();
          break;
        }

      case 'raw_document':
      case 'raw_data':
        {
          $scope.agg.settings.size = $scope.agg.settings.size || 500;
          $scope.settingsLinkText = 'Size: ' + $scope.agg.settings.size;
          $scope.target.metrics.splice(0, $scope.target.metrics.length, $scope.agg);
          $scope.target.bucketAggs = [];
          break;
        }
    }

    if ($scope.aggDef.supportsInlineScript) {
      // I know this stores the inline script twice
      // but having it like this simplifes the query_builder
      var inlineScript = $scope.agg.inlineScript;

      if (inlineScript) {
        $scope.agg.settings.script = {
          inline: inlineScript
        };
      } else {
        delete $scope.agg.settings.script;
      }

      if ($scope.settingsLinkText === '') {
        $scope.settingsLinkText = '选项';
      }
    }
  };

  $scope.toggleOptions = function () {
    $scope.showOptions = !$scope.showOptions;
    $scope.updatePipelineAggOptions();
  };

  $scope.toggleVariables = function () {
    $scope.showVariables = !$scope.showVariables;
  };

  $scope.onChangeInternal = function () {
    $scope.onChange();
  };

  $scope.updateMovingAvgModelSettings = function () {
    var modelSettingsKeys = [];
    var modelSettings = _query_def__WEBPACK_IMPORTED_MODULE_2__["getMovingAvgSettings"]($scope.agg.settings.model, false);

    for (var i = 0; i < modelSettings.length; i++) {
      modelSettingsKeys.push(modelSettings[i].value);
    }

    for (var key in $scope.agg.settings.settings) {
      if ($scope.agg.settings.settings[key] === null || modelSettingsKeys.indexOf(key) === -1) {
        delete $scope.agg.settings.settings[key];
      }
    }
  };

  $scope.onChangeClearInternal = function () {
    delete $scope.agg.settings.minimize;
    $scope.onChange();
  };

  $scope.onTypeChange = function () {
    $scope.agg.settings = {};
    $scope.agg.meta = {};
    $scope.showOptions = false; // reset back to metric/group by query

    if ($scope.target.bucketAggs.length === 0 && ($scope.agg.type !== 'raw_document' || $scope.agg.type !== 'raw_data')) {
      $scope.target.bucketAggs = [_query_def__WEBPACK_IMPORTED_MODULE_2__["defaultBucketAgg"]()];
    }

    $scope.showVariables = _query_def__WEBPACK_IMPORTED_MODULE_2__["isPipelineAggWithMultipleBucketPaths"]($scope.agg.type);
    $scope.updatePipelineAggOptions();
    $scope.onChange();
  };

  $scope.getFieldsInternal = function () {
    if ($scope.agg.type === 'cardinality') {
      return $scope.getFields();
    }

    return $scope.getFields({
      $fieldType: 'number'
    });
  };

  $scope.addMetricAgg = function () {
    var addIndex = metricAggs.length;

    var id = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.reduce($scope.target.bucketAggs.concat($scope.target.metrics), function (max, val) {
      return parseInt(val.id, 10) > max ? parseInt(val.id, 10) : max;
    }, 0);

    metricAggs.splice(addIndex, 0, {
      type: 'count',
      field: 'select field',
      id: (id + 1).toString()
    });
    $scope.onChange();
  };

  $scope.removeMetricAgg = function () {
    metricAggs.splice($scope.index, 1);
    $scope.onChange();
  };

  $scope.toggleShowMetric = function () {
    $scope.agg.hide = !$scope.agg.hide;

    if (!$scope.agg.hide) {
      delete $scope.agg.hide;
    }

    $scope.onChange();
  };

  $scope.init();
};
ElasticMetricAggCtrl.$inject = ["$scope", "uiSegmentSrv", "$rootScope"];
ElasticMetricAggCtrl.$inject = ["$scope", "uiSegmentSrv", "$rootScope"];
function elasticMetricAgg() {
  return {
    templateUrl: 'public/app/plugins/datasource/elasticsearch/partials/metric_agg.html',
    controller: ElasticMetricAggCtrl,
    restrict: 'E',
    scope: {
      target: '=',
      index: '=',
      onChange: '&',
      getFields: '&',
      esVersion: '='
    }
  };
}
app_core_core_module__WEBPACK_IMPORTED_MODULE_0__["default"].directive('elasticMetricAgg', elasticMetricAgg);

/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/module.ts":
/*!***************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/module.ts ***!
  \***************************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/elasticsearch/datasource.ts");
/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query_ctrl */ "./public/app/plugins/datasource/elasticsearch/query_ctrl.ts");
/* harmony import */ var _configuration_ConfigEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./configuration/ConfigEditor */ "./public/app/plugins/datasource/elasticsearch/configuration/ConfigEditor.tsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






var ElasticAnnotationsQueryCtrl = function ElasticAnnotationsQueryCtrl() {
  _classCallCheck(this, ElasticAnnotationsQueryCtrl);
};

ElasticAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_1__["ElasticDatasource"]).setQueryCtrl(_query_ctrl__WEBPACK_IMPORTED_MODULE_2__["ElasticQueryCtrl"]).setConfigEditor(_configuration_ConfigEditor__WEBPACK_IMPORTED_MODULE_3__["ConfigEditor"]).setAnnotationQueryCtrl(ElasticAnnotationsQueryCtrl);

/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/pipeline_variables.ts":
/*!***************************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/pipeline_variables.ts ***!
  \***************************************************************************/
/*! exports provided: elasticPipelineVariables, ElasticPipelineVariablesCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elasticPipelineVariables", function() { return elasticPipelineVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElasticPipelineVariablesCtrl", function() { return ElasticPipelineVariablesCtrl; });
/* harmony import */ var app_core_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/core_module */ "./public/app/core/core_module.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


function elasticPipelineVariables() {
  return {
    templateUrl: 'public/app/plugins/datasource/elasticsearch/partials/pipeline_variables.html',
    controller: 'ElasticPipelineVariablesCtrl',
    restrict: 'E',
    scope: {
      onChange: '&',
      variables: '=',
      options: '='
    }
  };
}

var newVariable = function newVariable(index) {
  return {
    name: 'var' + index,
    pipelineAgg: 'select metric'
  };
};

var ElasticPipelineVariablesCtrl =
/** @ngInject */
function ElasticPipelineVariablesCtrl($scope) {
  _classCallCheck(this, ElasticPipelineVariablesCtrl);

  $scope.variables = $scope.variables || [newVariable(1)];

  $scope.onChangeInternal = function () {
    $scope.onChange();
  };

  $scope.add = function () {
    $scope.variables.push(newVariable($scope.variables.length + 1));
    $scope.onChange();
  };

  $scope.remove = function (index) {
    $scope.variables.splice(index, 1);
    $scope.onChange();
  };
};
ElasticPipelineVariablesCtrl.$inject = ["$scope"];
ElasticPipelineVariablesCtrl.$inject = ["$scope"];
app_core_core_module__WEBPACK_IMPORTED_MODULE_0__["default"].directive('elasticPipelineVariables', elasticPipelineVariables);
app_core_core_module__WEBPACK_IMPORTED_MODULE_0__["default"].controller('ElasticPipelineVariablesCtrl', ElasticPipelineVariablesCtrl);

/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/query_builder.ts":
/*!**********************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/query_builder.ts ***!
  \**********************************************************************/
/*! exports provided: ElasticQueryBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElasticQueryBuilder", function() { return ElasticQueryBuilder; });
/* harmony import */ var _query_def__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query_def */ "./public/app/plugins/datasource/elasticsearch/query_def.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var ElasticQueryBuilder =
/*#__PURE__*/
function () {
  function ElasticQueryBuilder(options) {
    _classCallCheck(this, ElasticQueryBuilder);

    this.timeField = options.timeField;
    this.esVersion = options.esVersion;
  }

  _createClass(ElasticQueryBuilder, [{
    key: "getRangeFilter",
    value: function getRangeFilter() {
      var filter = {};
      filter[this.timeField] = {
        gte: '$timeFrom',
        lte: '$timeTo',
        format: 'epoch_millis'
      };
      return filter;
    }
  }, {
    key: "buildTermsAgg",
    value: function buildTermsAgg(aggDef, queryNode, target) {
      var metricRef, metric, y;
      queryNode.terms = {
        field: aggDef.field
      };

      if (!aggDef.settings) {
        return queryNode;
      }

      queryNode.terms.size = parseInt(aggDef.settings.size, 10) === 0 ? 500 : parseInt(aggDef.settings.size, 10);

      if (aggDef.settings.orderBy !== void 0) {
        queryNode.terms.order = {};

        if (aggDef.settings.orderBy === '_term' && this.esVersion >= 60) {
          queryNode.terms.order['_key'] = aggDef.settings.order;
        } else {
          queryNode.terms.order[aggDef.settings.orderBy] = aggDef.settings.order;
        } // if metric ref, look it up and add it to this agg level


        metricRef = parseInt(aggDef.settings.orderBy, 10);

        if (!isNaN(metricRef)) {
          for (y = 0; y < target.metrics.length; y++) {
            metric = target.metrics[y];

            if (metric.id === aggDef.settings.orderBy) {
              queryNode.aggs = {};
              queryNode.aggs[metric.id] = {};
              queryNode.aggs[metric.id][metric.type] = {
                field: metric.field
              };
              break;
            }
          }
        }
      }

      if (aggDef.settings.min_doc_count !== void 0) {
        queryNode.terms.min_doc_count = parseInt(aggDef.settings.min_doc_count, 10);

        if (isNaN(queryNode.terms.min_doc_count)) {
          queryNode.terms.min_doc_count = aggDef.settings.min_doc_count;
        }
      }

      if (aggDef.settings.missing) {
        queryNode.terms.missing = aggDef.settings.missing;
      }

      return queryNode;
    }
  }, {
    key: "getDateHistogramAgg",
    value: function getDateHistogramAgg(aggDef) {
      var esAgg = {};
      var settings = aggDef.settings || {};
      esAgg.interval = settings.interval;
      esAgg.field = this.timeField;
      esAgg.min_doc_count = settings.min_doc_count || 0;
      esAgg.extended_bounds = {
        min: '$timeFrom',
        max: '$timeTo'
      };
      esAgg.format = 'epoch_millis';

      if (settings.offset !== '') {
        esAgg.offset = settings.offset;
      }

      if (esAgg.interval === 'auto') {
        esAgg.interval = '$__interval';
      }

      if (settings.missing) {
        esAgg.missing = settings.missing;
      }

      return esAgg;
    }
  }, {
    key: "getHistogramAgg",
    value: function getHistogramAgg(aggDef) {
      var esAgg = {};
      var settings = aggDef.settings || {};
      esAgg.interval = settings.interval;
      esAgg.field = aggDef.field;
      esAgg.min_doc_count = settings.min_doc_count || 0;

      if (settings.missing) {
        esAgg.missing = settings.missing;
      }

      return esAgg;
    }
  }, {
    key: "getFiltersAgg",
    value: function getFiltersAgg(aggDef) {
      var filterObj = {};

      for (var i = 0; i < aggDef.settings.filters.length; i++) {
        var query = aggDef.settings.filters[i].query;
        var label = aggDef.settings.filters[i].label;
        label = label === '' || label === undefined ? query : label;
        filterObj[label] = {
          query_string: {
            query: query,
            analyze_wildcard: true
          }
        };
      }

      return filterObj;
    }
  }, {
    key: "documentQuery",
    value: function documentQuery(query, size) {
      query.size = size;
      query.sort = {};
      query.sort[this.timeField] = {
        order: 'desc',
        unmapped_type: 'boolean'
      }; // fields field not supported on ES 5.x

      if (this.esVersion < 5) {
        query.fields = ['*', '_source'];
      }

      query.script_fields = {};
      return query;
    }
  }, {
    key: "addAdhocFilters",
    value: function addAdhocFilters(query, adhocFilters) {
      if (!adhocFilters) {
        return;
      }

      var i, filter, condition, queryCondition;

      for (i = 0; i < adhocFilters.length; i++) {
        filter = adhocFilters[i];
        condition = {};
        condition[filter.key] = filter.value;
        queryCondition = {};
        queryCondition[filter.key] = {
          query: filter.value
        };

        switch (filter.operator) {
          case '=':
            if (!query.query.bool.must) {
              query.query.bool.must = [];
            }

            query.query.bool.must.push({
              match_phrase: queryCondition
            });
            break;

          case '!=':
            if (!query.query.bool.must_not) {
              query.query.bool.must_not = [];
            }

            query.query.bool.must_not.push({
              match_phrase: queryCondition
            });
            break;

          case '<':
            condition[filter.key] = {
              lt: filter.value
            };
            query.query.bool.filter.push({
              range: condition
            });
            break;

          case '>':
            condition[filter.key] = {
              gt: filter.value
            };
            query.query.bool.filter.push({
              range: condition
            });
            break;

          case '=~':
            query.query.bool.filter.push({
              regexp: condition
            });
            break;

          case '!~':
            query.query.bool.filter.push({
              bool: {
                must_not: {
                  regexp: condition
                }
              }
            });
            break;
        }
      }
    }
  }, {
    key: "build",
    value: function build(target, adhocFilters, queryString) {
      var _target$metrics, _target$metrics$, _target$metrics2, _target$metrics2$;

      // make sure query has defaults;
      target.metrics = target.metrics || [_query_def__WEBPACK_IMPORTED_MODULE_0__["defaultMetricAgg"]()];
      target.bucketAggs = target.bucketAggs || [_query_def__WEBPACK_IMPORTED_MODULE_0__["defaultBucketAgg"]()];
      target.timeField = this.timeField;
      var i, j, pv, nestedAggs, metric;
      var query = {
        size: 0,
        query: {
          bool: {
            filter: [{
              range: this.getRangeFilter()
            }, {
              query_string: {
                analyze_wildcard: true,
                query: queryString
              }
            }]
          }
        }
      };
      this.addAdhocFilters(query, adhocFilters); // If target doesn't have bucketAggs and type is not raw_document, it is invalid query.

      if (target.bucketAggs.length === 0) {
        metric = target.metrics[0];

        if (!metric || !(metric.type === 'raw_document' || metric.type === 'raw_data')) {
          throw {
            message: 'Invalid query'
          };
        }
      }
      /* Handle document query:
       * Check if metric type is raw_document. If metric doesn't have size (or size is 0), update size to 500.
       * Otherwise it will not be a valid query and error will be thrown.
       */


      if (((_target$metrics = target.metrics) === null || _target$metrics === void 0 ? void 0 : (_target$metrics$ = _target$metrics[0]) === null || _target$metrics$ === void 0 ? void 0 : _target$metrics$.type) === 'raw_document' || ((_target$metrics2 = target.metrics) === null || _target$metrics2 === void 0 ? void 0 : (_target$metrics2$ = _target$metrics2[0]) === null || _target$metrics2$ === void 0 ? void 0 : _target$metrics2$.type) === 'raw_data') {
        metric = target.metrics[0];
        var size = metric.settings && metric.settings.size !== 0 && metric.settings.size || 500;
        return this.documentQuery(query, size);
      }

      nestedAggs = query;

      for (i = 0; i < target.bucketAggs.length; i++) {
        var aggDef = target.bucketAggs[i];
        var esAgg = {};

        switch (aggDef.type) {
          case 'date_histogram':
            {
              esAgg['date_histogram'] = this.getDateHistogramAgg(aggDef);
              break;
            }

          case 'histogram':
            {
              esAgg['histogram'] = this.getHistogramAgg(aggDef);
              break;
            }

          case 'filters':
            {
              esAgg['filters'] = {
                filters: this.getFiltersAgg(aggDef)
              };
              break;
            }

          case 'terms':
            {
              this.buildTermsAgg(aggDef, esAgg, target);
              break;
            }

          case 'geohash_grid':
            {
              esAgg['geohash_grid'] = {
                field: aggDef.field,
                precision: aggDef.settings.precision
              };
              break;
            }
        }

        nestedAggs.aggs = nestedAggs.aggs || {};
        nestedAggs.aggs[aggDef.id] = esAgg;
        nestedAggs = esAgg;
      }

      nestedAggs.aggs = {};

      for (i = 0; i < target.metrics.length; i++) {
        metric = target.metrics[i];

        if (metric.type === 'count') {
          continue;
        }

        var aggField = {};
        var metricAgg = null;

        if (_query_def__WEBPACK_IMPORTED_MODULE_0__["isPipelineAgg"](metric.type)) {
          if (_query_def__WEBPACK_IMPORTED_MODULE_0__["isPipelineAggWithMultipleBucketPaths"](metric.type)) {
            if (metric.pipelineVariables) {
              metricAgg = {
                buckets_path: {}
              };

              for (j = 0; j < metric.pipelineVariables.length; j++) {
                pv = metric.pipelineVariables[j];

                if (pv.name && pv.pipelineAgg && /^\d*$/.test(pv.pipelineAgg)) {
                  var appliedAgg = _query_def__WEBPACK_IMPORTED_MODULE_0__["findMetricById"](target.metrics, pv.pipelineAgg);

                  if (appliedAgg) {
                    if (appliedAgg.type === 'count') {
                      metricAgg.buckets_path[pv.name] = '_count';
                    } else {
                      metricAgg.buckets_path[pv.name] = pv.pipelineAgg;
                    }
                  }
                }
              }
            } else {
              continue;
            }
          } else {
            if (metric.pipelineAgg && /^\d*$/.test(metric.pipelineAgg)) {
              var _appliedAgg = _query_def__WEBPACK_IMPORTED_MODULE_0__["findMetricById"](target.metrics, metric.pipelineAgg);

              if (_appliedAgg) {
                if (_appliedAgg.type === 'count') {
                  metricAgg = {
                    buckets_path: '_count'
                  };
                } else {
                  metricAgg = {
                    buckets_path: metric.pipelineAgg
                  };
                }
              }
            } else {
              continue;
            }
          }
        } else {
          metricAgg = {
            field: metric.field
          };
        }

        for (var prop in metric.settings) {
          if (metric.settings.hasOwnProperty(prop) && metric.settings[prop] !== null) {
            metricAgg[prop] = metric.settings[prop];
          }
        }

        aggField[metric.type] = metricAgg;
        nestedAggs.aggs[metric.id] = aggField;
      }

      return query;
    }
  }, {
    key: "getTermsQuery",
    value: function getTermsQuery(queryDef) {
      var query = {
        size: 0,
        query: {
          bool: {
            filter: [{
              range: this.getRangeFilter()
            }]
          }
        }
      };

      if (queryDef.query) {
        query.query.bool.filter.push({
          query_string: {
            analyze_wildcard: true,
            query: queryDef.query
          }
        });
      }

      var size = 500;

      if (queryDef.size) {
        size = queryDef.size;
      }

      query.aggs = {
        '1': {
          terms: {
            field: queryDef.field,
            size: size,
            order: {}
          }
        }
      }; // Default behaviour is to order results by { _key: asc }
      // queryDef.order allows selection of asc/desc
      // queryDef.orderBy allows selection of doc_count ordering (defaults desc)

      var _queryDef$orderBy = queryDef.orderBy,
          orderBy = _queryDef$orderBy === void 0 ? 'key' : _queryDef$orderBy,
          _queryDef$order = queryDef.order,
          order = _queryDef$order === void 0 ? orderBy === 'doc_count' ? 'desc' : 'asc' : _queryDef$order;

      if (['asc', 'desc'].indexOf(order) < 0) {
        throw {
          message: "Invalid query sort order ".concat(order)
        };
      }

      switch (orderBy) {
        case 'key':
        case 'term':
          var keyname = this.esVersion >= 60 ? '_key' : '_term';
          query.aggs['1'].terms.order[keyname] = order;
          break;

        case 'doc_count':
          query.aggs['1'].terms.order['_count'] = order;
          break;

        default:
          throw {
            message: "Invalid query sort type ".concat(orderBy)
          };
      }

      return query;
    }
  }, {
    key: "getLogsQuery",
    value: function getLogsQuery(target, adhocFilters, querystring) {
      var query = {
        size: 0,
        query: {
          bool: {
            filter: [{
              range: this.getRangeFilter()
            }]
          }
        }
      };
      this.addAdhocFilters(query, adhocFilters);

      if (target.query) {
        query.query.bool.filter.push({
          query_string: {
            analyze_wildcard: true,
            query: querystring
          }
        });
      }

      query = this.documentQuery(query, 500);
      return _objectSpread({}, query, {
        aggs: this.build(target, null, querystring).aggs
      });
    }
  }]);

  return ElasticQueryBuilder;
}();

/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/query_ctrl.ts":
/*!*******************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/query_ctrl.ts ***!
  \*******************************************************************/
/*! exports provided: ElasticQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElasticQueryCtrl", function() { return ElasticQueryCtrl; });
/* harmony import */ var _bucket_agg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bucket_agg */ "./public/app/plugins/datasource/elasticsearch/bucket_agg.ts");
/* harmony import */ var _metric_agg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./metric_agg */ "./public/app/plugins/datasource/elasticsearch/metric_agg.ts");
/* harmony import */ var _pipeline_variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pipeline_variables */ "./public/app/plugins/datasource/elasticsearch/pipeline_variables.ts");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _query_def__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./query_def */ "./public/app/plugins/datasource/elasticsearch/query_def.ts");
/* harmony import */ var app_plugins_sdk__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/plugins/sdk */ "./public/app/plugins/sdk.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var ElasticQueryCtrl =
/*#__PURE__*/
function (_QueryCtrl) {
  ElasticQueryCtrl.$inject = ["$scope", "$injector", "$rootScope", "uiSegmentSrv"];

  _inherits(ElasticQueryCtrl, _QueryCtrl);

  /** @ngInject */
  function ElasticQueryCtrl($scope, $injector, $rootScope, uiSegmentSrv) {
    var _this;

    _classCallCheck(this, ElasticQueryCtrl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ElasticQueryCtrl).call(this, $scope, $injector));
    _this.$rootScope = $rootScope;
    _this.uiSegmentSrv = uiSegmentSrv;
    _this.esVersion = _this.datasource.esVersion;
    _this.target = _this.target || {};
    _this.target.metrics = _this.target.metrics || [_query_def__WEBPACK_IMPORTED_MODULE_5__["defaultMetricAgg"]()];
    _this.target.bucketAggs = _this.target.bucketAggs || [_query_def__WEBPACK_IMPORTED_MODULE_5__["defaultBucketAgg"]()];

    if (_this.target.bucketAggs.length === 0) {
      var metric = _this.target.metrics[0];

      if (!metric || metric.type !== 'raw_document') {
        _this.target.bucketAggs = [_query_def__WEBPACK_IMPORTED_MODULE_5__["defaultBucketAgg"]()];
      }

      _this.refresh();
    }

    _this.queryUpdated();

    return _this;
  }

  _createClass(ElasticQueryCtrl, [{
    key: "getFields",
    value: function getFields(type) {
      var jsonStr = angular__WEBPACK_IMPORTED_MODULE_3___default.a.toJson({
        find: 'fields',
        type: type
      });
      return this.datasource.metricFindQuery(jsonStr).then(this.uiSegmentSrv.transformToSegments(false)).catch(this.handleQueryError.bind(this));
    }
  }, {
    key: "queryUpdated",
    value: function queryUpdated() {
      var newJsonTargetMetrics = angular__WEBPACK_IMPORTED_MODULE_3___default.a.toJson(this.target.metrics);
      var newJsonRawQuery = angular__WEBPACK_IMPORTED_MODULE_3___default.a.toJson(this.datasource.queryBuilder.build(this.target), true);

      if (this.rawQueryOld && newJsonRawQuery !== this.rawQueryOld || this.targetMetricsOld && newJsonTargetMetrics !== this.targetMetricsOld) {
        this.refresh();
      }

      this.rawQueryOld = newJsonRawQuery;
      this.targetMetricsOld = newJsonTargetMetrics;
      this.$rootScope.appEvent(app_types__WEBPACK_IMPORTED_MODULE_7__["CoreEvents"].elasticQueryUpdated);
    }
  }, {
    key: "getCollapsedText",
    value: function getCollapsedText() {
      var metricAggs = this.target.metrics;
      var bucketAggs = this.target.bucketAggs;
      var metricAggTypes = _query_def__WEBPACK_IMPORTED_MODULE_5__["getMetricAggTypes"](this.esVersion);
      var bucketAggTypes = _query_def__WEBPACK_IMPORTED_MODULE_5__["bucketAggTypes"];
      var text = '';

      if (this.target.query) {
        text += 'Query: ' + this.target.query + ', ';
      }

      text += 'Metrics: ';

      lodash__WEBPACK_IMPORTED_MODULE_4___default.a.each(metricAggs, function (metric, index) {
        var aggDef = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.find(metricAggTypes, {
          value: metric.type
        });

        text += aggDef.text + '(';

        if (aggDef.requiresField) {
          text += metric.field;
        }

        if (aggDef.supportsMultipleBucketPaths) {
          text += metric.settings.script.replace(new RegExp('params.', 'g'), '');
        }

        text += '), ';
      });

      lodash__WEBPACK_IMPORTED_MODULE_4___default.a.each(bucketAggs, function (bucketAgg, index) {
        if (index === 0) {
          text += ' Group by: ';
        }

        var aggDef = lodash__WEBPACK_IMPORTED_MODULE_4___default.a.find(bucketAggTypes, {
          value: bucketAgg.type
        });

        text += aggDef.text + '(';

        if (aggDef.requiresField) {
          text += bucketAgg.field;
        }

        text += '), ';
      });

      if (this.target.alias) {
        text += 'Alias: ' + this.target.alias;
      }

      return text;
    }
  }, {
    key: "handleQueryError",
    value: function handleQueryError(err) {
      this.error = err.message || 'Failed to issue metric query';
      return [];
    }
  }]);

  return ElasticQueryCtrl;
}(app_plugins_sdk__WEBPACK_IMPORTED_MODULE_6__["QueryCtrl"]);
ElasticQueryCtrl.templateUrl = 'partials/query.editor.html';

/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/query_def.ts":
/*!******************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/query_def.ts ***!
  \******************************************************************/
/*! exports provided: metricAggTypes, bucketAggTypes, orderByOptions, orderOptions, sizeOptions, extendedStats, intervalOptions, movingAvgModelOptions, pipelineOptions, movingAvgModelSettings, getMetricAggTypes, getPipelineOptions, isPipelineAgg, isPipelineAggWithMultipleBucketPaths, getPipelineAggOptions, getMovingAvgSettings, getOrderByOptions, describeOrder, describeMetric, describeOrderBy, defaultMetricAgg, defaultBucketAgg, findMetricById, hasMetricOfType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "metricAggTypes", function() { return metricAggTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bucketAggTypes", function() { return bucketAggTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orderByOptions", function() { return orderByOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orderOptions", function() { return orderOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sizeOptions", function() { return sizeOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendedStats", function() { return extendedStats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intervalOptions", function() { return intervalOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "movingAvgModelOptions", function() { return movingAvgModelOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pipelineOptions", function() { return pipelineOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "movingAvgModelSettings", function() { return movingAvgModelSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMetricAggTypes", function() { return getMetricAggTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPipelineOptions", function() { return getPipelineOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPipelineAgg", function() { return isPipelineAgg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPipelineAggWithMultipleBucketPaths", function() { return isPipelineAggWithMultipleBucketPaths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPipelineAggOptions", function() { return getPipelineAggOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMovingAvgSettings", function() { return getMovingAvgSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOrderByOptions", function() { return getOrderByOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "describeOrder", function() { return describeOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "describeMetric", function() { return describeMetric; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "describeOrderBy", function() { return describeOrderBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultMetricAgg", function() { return defaultMetricAgg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultBucketAgg", function() { return defaultBucketAgg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findMetricById", function() { return findMetricById; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasMetricOfType", function() { return hasMetricOfType; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

var metricAggTypes = [{
  text: 'Count',
  value: 'count',
  requiresField: false
}, {
  text: '平均',
  value: 'avg',
  requiresField: true,
  supportsInlineScript: true,
  supportsMissing: true
}, {
  text: '总和',
  value: 'sum',
  requiresField: true,
  supportsInlineScript: true,
  supportsMissing: true
}, {
  text: '最大',
  value: 'max',
  requiresField: true,
  supportsInlineScript: true,
  supportsMissing: true
}, {
  text: '最小',
  value: 'min',
  requiresField: true,
  supportsInlineScript: true,
  supportsMissing: true
}, {
  text: '扩展统计',
  value: 'extended_stats',
  requiresField: true,
  supportsMissing: true,
  supportsInlineScript: true
}, {
  text: '百分位数',
  value: 'percentiles',
  requiresField: true,
  supportsMissing: true,
  supportsInlineScript: true
}, {
  text: '唯一计数',
  value: 'cardinality',
  requiresField: true,
  supportsMissing: true
}, {
  text: '移动平均线',
  value: 'moving_avg',
  requiresField: false,
  isPipelineAgg: true,
  minVersion: 2
}, {
  text: '派生物',
  value: 'derivative',
  requiresField: false,
  isPipelineAgg: true,
  minVersion: 2
}, {
  text: '累计总和',
  value: 'cumulative_sum',
  requiresField: false,
  isPipelineAgg: true,
  minVersion: 2
}, {
  text: '桶脚本',
  value: 'bucket_script',
  requiresField: false,
  isPipelineAgg: true,
  supportsMultipleBucketPaths: true,
  minVersion: 2
}, {
  text: '原始文件（旧版）',
  value: 'raw_document',
  requiresField: false
}, {
  text: '原始数据',
  value: 'raw_data',
  requiresField: false
}, {
  text: '日志',
  value: 'logs',
  requiresField: false
}];
var bucketAggTypes = [{
  text: '项',
  value: 'terms',
  requiresField: true
}, {
  text: '过滤器',
  value: 'filters'
}, {
  text: '地理哈希网格',
  value: 'geohash_grid',
  requiresField: true
}, {
  text: '日期直方图',
  value: 'date_histogram',
  requiresField: true
}, {
  text: '直方图',
  value: 'histogram',
  requiresField: true
}];
var orderByOptions = [{
  text: '文件计数',
  value: '_count'
}, {
  text: '期限值',
  value: '_term'
}];
var orderOptions = [{
  text: '最高',
  value: 'desc'
}, {
  text: '最低',
  value: 'asc'
}];
var sizeOptions = [{
  text: '无限制',
  value: '0'
}, {
  text: '1',
  value: '1'
}, {
  text: '2',
  value: '2'
}, {
  text: '3',
  value: '3'
}, {
  text: '5',
  value: '5'
}, {
  text: '10',
  value: '10'
}, {
  text: '15',
  value: '15'
}, {
  text: '20',
  value: '20'
}];
var extendedStats = [{
  text: '平均',
  value: 'avg'
}, {
  text: '最小',
  value: 'min'
}, {
  text: '最大',
  value: 'max'
}, {
  text: '总和',
  value: 'sum'
}, {
  text: '计数',
  value: 'count'
}, {
  text: '标准偏差',
  value: 'std_deviation'
}, {
  text: '标准偏差上限',
  value: 'std_deviation_bounds_upper'
}, {
  text: '标准偏差下限',
  value: 'std_deviation_bounds_lower'
}];
var intervalOptions = [{
  text: '自动',
  value: 'auto'
}, {
  text: '10s',
  value: '10s'
}, {
  text: '1m',
  value: '1m'
}, {
  text: '5m',
  value: '5m'
}, {
  text: '10m',
  value: '10m'
}, {
  text: '20m',
  value: '20m'
}, {
  text: '1h',
  value: '1h'
}, {
  text: '1d',
  value: '1d'
}];
var movingAvgModelOptions = [{
  text: '简单',
  value: 'simple'
}, {
  text: '线性',
  value: 'linear'
}, {
  text: '指数加权',
  value: 'ewma'
}, {
  text: '霍尔特线性',
  value: 'holt'
}, {
  text: '霍尔特温特斯',
  value: 'holt_winters'
}];
var pipelineOptions = {
  moving_avg: [{
    text: '窗口',
    default: 5
  }, {
    text: '模式',
    default: 'simple'
  }, {
    text: '预测',
    default: undefined
  }, {
    text: '最小化',
    default: false
  }],
  derivative: [{
    text: '单位',
    default: undefined
  }],
  cumulative_sum: [{
    text: '格式化',
    default: undefined
  }],
  bucket_script: []
};
var movingAvgModelSettings = {
  simple: [],
  linear: [],
  ewma: [{
    text: 'Alpha',
    value: 'alpha',
    default: undefined
  }],
  holt: [{
    text: 'Alpha',
    value: 'alpha',
    default: undefined
  }, {
    text: 'Beta',
    value: 'beta',
    default: undefined
  }],
  holt_winters: [{
    text: 'Alpha',
    value: 'alpha',
    default: undefined
  }, {
    text: 'Beta',
    value: 'beta',
    default: undefined
  }, {
    text: 'Gamma',
    value: 'gamma',
    default: undefined
  }, {
    text: 'Period',
    value: 'period',
    default: undefined
  }, {
    text: 'Pad',
    value: 'pad',
    default: undefined,
    isCheckbox: true
  }]
};
function getMetricAggTypes(esVersion) {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(metricAggTypes, function (f) {
    if (f.minVersion) {
      return f.minVersion <= esVersion;
    } else {
      return true;
    }
  });
}
function getPipelineOptions(metric) {
  if (!isPipelineAgg(metric.type)) {
    return [];
  }

  return pipelineOptions[metric.type];
}
function isPipelineAgg(metricType) {
  if (metricType) {
    var po = pipelineOptions[metricType];
    return po !== null && po !== undefined;
  }

  return false;
}
function isPipelineAggWithMultipleBucketPaths(metricType) {
  if (metricType) {
    return metricAggTypes.find(function (t) {
      return t.value === metricType && t.supportsMultipleBucketPaths;
    }) !== undefined;
  }

  return false;
}
function getPipelineAggOptions(targets) {
  var result = [];

  lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(targets.metrics, function (metric) {
    if (!isPipelineAgg(metric.type)) {
      result.push({
        text: describeMetric(metric),
        value: metric.id
      });
    }
  });

  return result;
}
function getMovingAvgSettings(model, filtered) {
  var filteredResult = [];

  if (filtered) {
    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(movingAvgModelSettings[model], function (setting) {
      if (!setting.isCheckbox) {
        filteredResult.push(setting);
      }
    });

    return filteredResult;
  }

  return movingAvgModelSettings[model];
}
function getOrderByOptions(target) {
  var metricRefs = [];

  lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(target.metrics, function (metric) {
    if (metric.type !== 'count') {
      metricRefs.push({
        text: describeMetric(metric),
        value: metric.id
      });
    }
  });

  return orderByOptions.concat(metricRefs);
}
function describeOrder(order) {
  var def = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(orderOptions, {
    value: order
  });

  return def.text;
}
function describeMetric(metric) {
  var def = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(metricAggTypes, {
    value: metric.type
  });

  if (!def.requiresField && !isPipelineAgg(metric.type)) {
    return def.text;
  }

  return def.text + ' ' + metric.field;
}
function describeOrderBy(orderBy, target) {
  var def = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(orderByOptions, {
    value: orderBy
  });

  if (def) {
    return def.text;
  }

  var metric = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(target.metrics, {
    id: orderBy
  });

  if (metric) {
    return describeMetric(metric);
  } else {
    return '未发现指标';
  }
}
function defaultMetricAgg() {
  return {
    type: 'count',
    id: '1'
  };
}
function defaultBucketAgg() {
  return {
    type: 'date_histogram',
    id: '2',
    settings: {
      interval: 'auto'
    }
  };
}
var findMetricById = function findMetricById(metrics, id) {
  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(metrics, {
    id: id
  });
};
function hasMetricOfType(target, type) {
  return target && target.metrics && target.metrics.some(function (m) {
    return m.type === type;
  });
}

/***/ })

}]);
//# sourceMappingURL=elasticsearchPlugin.1ebdc265fc3bd7452fcd.js.map