(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~DashboardPage~explore"],{

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

/***/ "./public/app/features/dashboard/components/Inspector/InspectStatsTab.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/features/dashboard/components/Inspector/InspectStatsTab.tsx ***!
  \********************************************************************************/
/*! exports provided: InspectStatsTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InspectStatsTab", function() { return InspectStatsTab; });
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
/* harmony import */ var _InspectStatsTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InspectStatsTable */ "./public/app/features/dashboard/components/Inspector/InspectStatsTable.tsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



var InspectStatsTab = function InspectStatsTab(_ref) {
  var _data$timings;

  var data = _ref.data,
      timeZone = _ref.timeZone;

  if (!data.request) {
    return null;
  }

  var stats = [];
  var requestTime = data.request.endTime ? data.request.endTime - data.request.startTime : -1;
  var processingTime = ((_data$timings = data.timings) === null || _data$timings === void 0 ? void 0 : _data$timings.dataProcessingTime) || -1;
  var dataRows = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data.series[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var frame = _step.value;
      dataRows += frame.length;
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

  if (requestTime > 0) {
    stats.push({
      displayName: '总请求时间',
      value: requestTime,
      unit: 'ms'
    });
  }

  if (processingTime > 0) {
    stats.push({
      displayName: '数据处理时间',
      value: processingTime,
      unit: 'ms'
    });
  }

  stats.push({
    displayName: '查询数量',
    value: data.request.targets.length
  });
  stats.push({
    displayName: '总行数',
    value: dataRows
  });
  var dataStats = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = data.series[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var series = _step2.value;

      if (series.meta && series.meta.stats) {
        dataStats = dataStats.concat(series.meta.stats);
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

  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_0__["selectors"].components.PanelInspector.Stats.content
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_InspectStatsTable__WEBPACK_IMPORTED_MODULE_1__["InspectStatsTable"], {
    timeZone: timeZone,
    name: '统计',
    stats: stats
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_InspectStatsTable__WEBPACK_IMPORTED_MODULE_1__["InspectStatsTable"], {
    timeZone: timeZone,
    name: '数据源统计',
    stats: dataStats
  }));
};

/***/ }),

/***/ "./public/app/features/dashboard/components/Inspector/InspectStatsTable.tsx":
/*!**********************************************************************************!*\
  !*** ./public/app/features/dashboard/components/Inspector/InspectStatsTable.tsx ***!
  \**********************************************************************************/
/*! exports provided: InspectStatsTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InspectStatsTable", function() { return InspectStatsTable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      text-align: right;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      padding-bottom: ", ";\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var InspectStatsTable = function InspectStatsTable(_ref) {
  var timeZone = _ref.timeZone,
      name = _ref.name,
      stats = _ref.stats;
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["useTheme"])();
  var styles = getStyles(theme);

  if (!stats || !stats.length) {
    return null;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.wrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "section-heading"
  }, name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "filter-table width-30"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, stats.map(function (stat, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: "".concat(stat.displayName, "-").concat(index)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, stat.displayName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: styles.cell
    }, formatStat(stat, timeZone)));
  }))));
};

function formatStat(stat, timeZone) {
  var display = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["getDisplayProcessor"])({
    field: {
      type: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldType"].number,
      config: stat
    },
    theme: app_core_config__WEBPACK_IMPORTED_MODULE_2__["config"].theme,
    timeZone: timeZone
  });
  return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["formattedValueToString"])(display(stat.value));
}

var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["stylesFactory"])(function (theme) {
  return {
    wrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(_templateObject(), theme.spacing.md),
    cell: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(_templateObject2())
  };
});

/***/ }),

/***/ "./public/app/features/dashboard/components/Inspector/styles.ts":
/*!**********************************************************************!*\
  !*** ./public/app/features/dashboard/components/Inspector/styles.ts ***!
  \**********************************************************************/
/*! exports provided: getPanelInspectorStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPanelInspectorStyles", function() { return getPanelInspectorStyles; });
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
function _templateObject15() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      > * {\n        margin-right: ", ";\n      }\n    "]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n      flex-grow: 1;\n      min-width: 300px;\n      margin-right: ", ";\n    "]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n      padding-top: ", ";\n    "]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      flex-grow: 1;\n\n      max-width: 85%;\n      @media (max-width: 1345px) {\n        max-width: 75%;\n      }\n    "]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n    "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      flex-direction: column;\n      height: 100%;\n      width: 100%;\n    "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n      height: 100%;\n      display: flex;\n      flex-direction: column;\n    "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n      flex-grow: 2;\n    "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n      overflow: scroll;\n    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n      font-family: monospace;\n      height: 100%;\n      flex-grow: 1;\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n      flex-grow: 1;\n      padding: ", " 0;\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n      flex-grow: 1;\n      padding-bottom: 16px;\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      margin-left: ", ";\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      width: 100%;\n      flex-grow: 0;\n      align-items: center;\n      justify-content: flex-end;\n      margin-bottom: ", ";\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      flex-direction: column;\n      height: 100%;\n      width: 100%;\n      flex: 1 1 0;\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var getPanelInspectorStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function () {
  return {
    wrap: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject()),
    toolbar: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject2(), app_core_config__WEBPACK_IMPORTED_MODULE_1__["config"].theme.spacing.sm),
    toolbarItem: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject3(), app_core_config__WEBPACK_IMPORTED_MODULE_1__["config"].theme.spacing.md),
    content: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject4()),
    contentQueryInspector: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject5(), app_core_config__WEBPACK_IMPORTED_MODULE_1__["config"].theme.spacing.md),
    editor: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject6()),
    viewer: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject7()),
    dataFrameSelect: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject8()),
    tabContent: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject9()),
    dataTabContent: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject10()),
    actionsWrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject11()),
    leftActions: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject12()),
    options: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject13(), app_core_config__WEBPACK_IMPORTED_MODULE_1__["config"].theme.spacing.sm),
    dataDisplayOptions: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject14(), app_core_config__WEBPACK_IMPORTED_MODULE_1__["config"].theme.spacing.sm),
    selects: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject15(), app_core_config__WEBPACK_IMPORTED_MODULE_1__["config"].theme.spacing.sm)
  };
});

/***/ })

}]);
//# sourceMappingURL=default~DashboardPage~explore.1ebdc265fc3bd7452fcd.js.map