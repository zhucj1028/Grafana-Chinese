(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["graphitePlugin"],{

/***/ "./public/app/core/utils/version.ts":
/*!******************************************!*\
  !*** ./public/app/core/utils/version.ts ***!
  \******************************************/
/*! exports provided: SemVersion, isVersionGtOrEq */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SemVersion", function() { return SemVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVersionGtOrEq", function() { return isVersionGtOrEq; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var versionPattern = /^(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:-([0-9A-Za-z\.]+))?/;
var SemVersion =
/*#__PURE__*/
function () {
  function SemVersion(version) {
    _classCallCheck(this, SemVersion);

    var match = versionPattern.exec(version);

    if (match) {
      this.major = Number(match[1]);
      this.minor = Number(match[2] || 0);
      this.patch = Number(match[3] || 0);
      this.meta = match[4];
    }
  }

  _createClass(SemVersion, [{
    key: "isGtOrEq",
    value: function isGtOrEq(version) {
      var compared = new SemVersion(version);

      for (var i = 0; i < this.comparable.length; ++i) {
        if (this.comparable[i] > compared.comparable[i]) {
          return true;
        }

        if (this.comparable[i] < compared.comparable[i]) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isNumber(this.major);
    }
  }, {
    key: "comparable",
    get: function get() {
      return [this.major, this.minor, this.patch];
    }
  }]);

  return SemVersion;
}();
function isVersionGtOrEq(a, b) {
  var aSemver = new SemVersion(a);
  return aSemver.isGtOrEq(b);
}

/***/ }),

/***/ "./public/app/plugins/datasource/graphite/MetricTankMetaInspector.tsx":
/*!****************************************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/MetricTankMetaInspector.tsx ***!
  \****************************************************************************/
/*! exports provided: MetricTankMetaInspector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricTankMetaInspector", function() { return MetricTankMetaInspector; });
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./meta */ "./public/app/plugins/datasource/graphite/meta.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n      background: linear-gradient(0deg, ", ", ", ");\n    "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n      background: linear-gradient(0deg, ", ", ", ");\n      text-align: center;\n      color: ", ";\n      margin-right: ", ";\n      border-radius: ", ";\n    "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n      flex-grow: 0;\n      width: 60px;\n    "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      margin-bottom: ", ";\n      border-radius: ", ";\n    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n      margin-bottom: ", ";\n\n      &:last-child {\n        margin-bottom: 0;\n      }\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n      font-size: ", ";\n      color: ", ";\n      margin-bottom: ", ";\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n      font-size: ", ";\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      padding: ", ";\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      background: ", ";\n      padding: ", " ", ";\n      font-size: ", ";\n      display: flex;\n      justify-content: space-between;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      background: ", ";\n      border: 1px solid ", ";\n      margin-bottom: ", ";\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var MetricTankMetaInspector =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(MetricTankMetaInspector, _PureComponent);

  function MetricTankMetaInspector() {
    _classCallCheck(this, MetricTankMetaInspector);

    return _possibleConstructorReturn(this, _getPrototypeOf(MetricTankMetaInspector).apply(this, arguments));
  }

  _createClass(MetricTankMetaInspector, [{
    key: "renderMeta",
    value: function renderMeta(meta, key) {
      var _meta$consolidatorNo;

      var styles = getStyles();
      var buckets = Object(_meta__WEBPACK_IMPORTED_MODULE_3__["parseSchemaRetentions"])(meta['schema-retentions']);
      var rollupNotice = Object(_meta__WEBPACK_IMPORTED_MODULE_3__["getRollupNotice"])([meta]);
      var runtimeNotice = Object(_meta__WEBPACK_IMPORTED_MODULE_3__["getRuntimeConsolidationNotice"])([meta]);
      var normFunc = ((_meta$consolidatorNo = meta['consolidator-normfetch']) !== null && _meta$consolidatorNo !== void 0 ? _meta$consolidatorNo : '').replace('Consolidator', '');
      var totalSeconds = buckets.reduce(function (acc, bucket) {
        return acc + (bucket.retention ? _grafana_data__WEBPACK_IMPORTED_MODULE_2__["rangeUtil"].intervalToSeconds(bucket.retention) : 0);
      }, 0);
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: styles.metaItem,
        key: key
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: styles.metaItemHeader
      }, "Schema: ", meta['schema-name'], react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "small muted"
      }, "Series count: ", meta.count)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: styles.metaItemBody
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: styles.step
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: styles.stepHeading
      }, "Step 1: Fetch"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: styles.stepDescription
      }, "First data is fetched, either from raw data archive or a rollup archive"), rollupNotice && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, rollupNotice.text), !rollupNotice && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "No rollup archive was used"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, buckets.map(function (bucket, index) {
        var bucketLength = bucket.retention ? _grafana_data__WEBPACK_IMPORTED_MODULE_2__["rangeUtil"].intervalToSeconds(bucket.retention) : 0;
        var lengthPercent = bucketLength / totalSeconds * 100;
        var isActive = index === meta['archive-read'];
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          key: bucket.retention,
          className: styles.bucket
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          className: styles.bucketInterval
        }, bucket.interval), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          className: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["cx"])(styles.bucketRetention, _defineProperty({}, styles.bucketRetentionActive, isActive)),
          style: {
            flexGrow: lengthPercent
          }
        }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          style: {
            flexGrow: 100 - lengthPercent
          }
        }, bucket.retention));
      }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: styles.step
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: styles.stepHeading
      }, "Step 2: Normalization"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: styles.stepDescription
      }, "Normalization happens when series with different intervals between points are combined."), meta['aggnum-norm'] > 1 && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Normalization did occur using ", normFunc), meta['aggnum-norm'] === 1 && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "No normalization was needed")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: styles.step
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: styles.stepHeading
      }, "Step 3: Runtime consolidation"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: styles.stepDescription
      }, "If there are too many data points at this point Metrictank will consolidate them down to below max data points (set in queries tab)."), runtimeNotice && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, runtimeNotice.text), !runtimeNotice && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "No runtime consolidation"))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var data = this.props.data; // away to dedupe them

      var seriesMetas = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var series = _step.value;

          if (series.meta && series.meta.custom) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = series.meta.custom.seriesMetaList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var metaItem = _step2.value;
                // key is to dedupe as many series will have identitical meta
                var key = "".concat(JSON.stringify(metaItem));

                if (seriesMetas[key]) {
                  seriesMetas[key].count += metaItem.count;
                } else {
                  seriesMetas[key] = metaItem;
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

      if (Object.keys(seriesMetas).length === 0) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, "No response meta data");
      }

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", {
        className: "page-heading"
      }, "Metrictank Lineage"), Object.keys(seriesMetas).map(function (key) {
        return _this.renderMeta(seriesMetas[key], key);
      }));
    }
  }]);

  return MetricTankMetaInspector;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]);
var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["stylesFactory"])(function () {
  var theme = app_core_config__WEBPACK_IMPORTED_MODULE_5__["config"].theme;
  var borderColor = theme.isDark ? theme.palette.gray25 : theme.palette.gray85;
  var background = theme.isDark ? theme.palette.dark1 : theme.palette.white;
  var headerBg = theme.isDark ? theme.palette.gray15 : theme.palette.gray85;
  return {
    metaItem: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject(), background, borderColor, theme.spacing.md),
    metaItemHeader: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject2(), headerBg, theme.spacing.xs, theme.spacing.md, theme.typography.size.md),
    metaItemBody: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject3(), theme.spacing.md),
    stepHeading: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject4(), theme.typography.size.md),
    stepDescription: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject5(), theme.typography.size.sm, theme.colors.textWeak, theme.spacing.sm),
    step: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject6(), theme.spacing.lg),
    bucket: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject7(), theme.spacing.sm, theme.border.radius.md),
    bucketInterval: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject8()),
    bucketRetention: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject9(), theme.palette.blue85, theme.palette.blue95, theme.palette.white, theme.spacing.md, theme.border.radius.md),
    bucketRetentionActive: Object(emotion__WEBPACK_IMPORTED_MODULE_0__["css"])(_templateObject10(), theme.palette.greenBase, theme.palette.greenShade)
  };
});

/***/ }),

/***/ "./public/app/plugins/datasource/graphite/add_graphite_func.ts":
/*!*********************************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/add_graphite_func.ts ***!
  \*********************************************************************/
/*! exports provided: graphiteAddFunc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graphiteAddFunc", function() { return graphiteAddFunc; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tether_drop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tether-drop */ "./node_modules/tether-drop/dist/js/drop.js");
/* harmony import */ var tether_drop__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tether_drop__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_core_core_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/core_module */ "./public/app/core/core_module.ts");
graphiteAddFunc.$inject = ["$compile"];

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


 // @ts-ignore




/** @ngInject */
function graphiteAddFunc($compile) {
  var inputTemplate = '<input type="text"' + ' class="gf-form-input"' + ' spellcheck="false" style="display:none"></input>';
  var buttonTemplate = '<a class="gf-form-label dropdown-toggle"' + ' tabindex="1" gf-dropdown="functionMenu" data-toggle="dropdown">' + '<icon name="\'plus\'" size="\'sm\'"></name></a>';
  return {
    link: function link($scope, elem) {
      var _this = this;

      var ctrl = $scope.ctrl;
      var $input = jquery__WEBPACK_IMPORTED_MODULE_1___default()(inputTemplate);
      var $button = jquery__WEBPACK_IMPORTED_MODULE_1___default()(buttonTemplate);
      $input.appendTo(elem);
      $button.appendTo(elem);
      ctrl.datasource.getFuncDefs().then(function (funcDefs) {
        var allFunctions = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(funcDefs, 'name').sort();

        $scope.functionMenu = createFunctionDropDownMenu(funcDefs);
        $input.attr('data-provide', 'typeahead');
        $input.typeahead({
          source: allFunctions,
          minLength: 1,
          items: 10,
          updater: function updater(value) {
            var funcDef = ctrl.datasource.getFuncDef(value);

            if (!funcDef) {
              // try find close match
              value = value.toLowerCase();
              funcDef = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(allFunctions, function (funcName) {
                return funcName.toLowerCase().indexOf(value) === 0;
              });

              if (!funcDef) {
                return '';
              }
            }

            $scope.$apply(function () {
              ctrl.addFunction(funcDef);
            });
            $input.trigger('blur');
            return '';
          }
        });
        $button.click(function () {
          $button.hide();
          $input.show();
          $input.focus();
        });
        $input.keyup(function () {
          elem.toggleClass('open', $input.val() === '');
        });
        $input.blur(function () {
          // clicking the function dropdown menu won't
          // work if you remove class at once
          setTimeout(function () {
            $input.val('');
            $input.hide();
            $button.show();
            elem.removeClass('open');
          }, 200);
        });
        $compile(elem.contents())($scope);
      });
      var drop;

      var cleanUpDrop = function cleanUpDrop() {
        if (drop) {
          drop.destroy();
          drop = null;
        }
      };

      jquery__WEBPACK_IMPORTED_MODULE_1___default()(elem).on('mouseenter', 'ul.dropdown-menu li',
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var funcDef, shortDesc, contentElement, _ref2, rst2html;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cleanUpDrop();

                try {
                  funcDef = ctrl.datasource.getFuncDef(jquery__WEBPACK_IMPORTED_MODULE_1___default()('a', _this).text());
                } catch (e) {// ignore
                }

                if (!(funcDef && funcDef.description)) {
                  _context.next = 12;
                  break;
                }

                shortDesc = funcDef.description;

                if (shortDesc.length > 500) {
                  shortDesc = shortDesc.substring(0, 497) + '...';
                }

                contentElement = document.createElement('div'); // @ts-ignore

                _context.next = 8;
                return __webpack_require__.e(/*! import() | rst2html */ "rst2html").then(__webpack_require__.t.bind(null, /*! rst2html */ "./node_modules/rst2html/dist/rst2html.min.js", 7));

              case 8:
                _ref2 = _context.sent;
                rst2html = _ref2.default;
                contentElement.innerHTML = '<h4>' + funcDef.name + '</h4>' + rst2html(shortDesc);
                drop = new tether_drop__WEBPACK_IMPORTED_MODULE_2___default.a({
                  target: _this,
                  content: contentElement,
                  classes: 'drop-popover',
                  openOn: 'always',
                  tetherOptions: {
                    attachment: 'bottom left',
                    targetAttachment: 'bottom right'
                  }
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))).on('mouseout', 'ul.dropdown-menu li', function () {
        cleanUpDrop();
      });
      $scope.$on('$destroy', cleanUpDrop);
    }
  };
}
app_core_core_module__WEBPACK_IMPORTED_MODULE_3__["default"].directive('graphiteAddFunc', graphiteAddFunc);

function createFunctionDropDownMenu(funcDefs) {
  var categories = {};

  lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(funcDefs, function (funcDef) {
    if (!funcDef.category) {
      return;
    }

    if (!categories[funcDef.category]) {
      categories[funcDef.category] = [];
    }

    categories[funcDef.category].push({
      text: funcDef.name,
      click: "ctrl.addFunction('" + funcDef.name + "')"
    });
  });

  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.sortBy(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(categories, function (submenu, category) {
    return {
      text: category,
      submenu: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.sortBy(submenu, 'text')
    };
  }), 'text');
}

/***/ }),

/***/ "./public/app/plugins/datasource/graphite/configuration/ConfigEditor.tsx":
/*!*******************************************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/configuration/ConfigEditor.tsx ***!
  \*******************************************************************************/
/*! exports provided: ConfigEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types */ "./public/app/plugins/datasource/graphite/types.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var Select = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].Select,
    Switch = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].Switch;


var graphiteVersions = [{
  label: '0.9.x',
  value: '0.9'
}, {
  label: '1.0.x',
  value: '1.0'
}, {
  label: '1.1.x',
  value: '1.1'
}];
var graphiteTypes = Object.entries(_types__WEBPACK_IMPORTED_MODULE_3__["GraphiteType"]).map(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      label = _ref2[0],
      value = _ref2[1];

  return {
    label: label,
    value: value
  };
});
var ConfigEditor =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ConfigEditor, _PureComponent);

  function ConfigEditor(props) {
    var _this;

    _classCallCheck(this, ConfigEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConfigEditor).call(this, props));

    _this.renderTypeHelp = function () {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "\u6709\u4E0D\u540C\u7C7B\u578B\u7684\u77F3\u58A8\u517C\u5BB9\u540E\u7AEF\u3002 \u60A8\u53EF\u4EE5\u5728\u6B64\u5904\u6307\u5B9A\u4F7F\u7528\u7684\u7C7B\u578B\u3002 \u5982\u679C\u60A8\u6B63\u5728\u4F7F\u7528", ' ', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "https://github.com/grafana/metrictank",
        className: "pointer",
        target: "_blank"
      }, "Metrictank"), ' ', "\u7136\u540E\u5728\u8FD9\u91CC\u9009\u62E9 \u8FD9\u5C06\u542F\u7528Metrictank\u7279\u5B9A\u7684\u529F\u80FD\uFF0C\u4F8B\u5982\u67E5\u8BE2\u5904\u7406\u5143\u6570\u636E\u3002 Metrictank\u662F\u9762\u5411Graphite\u548C\u670B\u53CB\u7684\u591A\u79DF\u6237\u65F6\u95F4\u5E8F\u5217\u5F15\u64CE\u3002");
    };

    return _this;
  }

  _createClass(ConfigEditor, [{
    key: "render",
    value: function render() {
      var _graphiteVersions$fin;

      var _this$props = this.props,
          options = _this$props.options,
          onOptionsChange = _this$props.onOptionsChange;
      var currentVersion = (_graphiteVersions$fin = graphiteVersions.find(function (item) {
        return item.value === options.jsonData.graphiteVersion;
      })) !== null && _graphiteVersions$fin !== void 0 ? _graphiteVersions$fin : graphiteVersions[2];
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["DataSourceHttpSettings"], {
        defaultUrl: "http://localhost:8080",
        dataSourceConfig: options,
        onChange: onOptionsChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: "page-heading"
      }, "\u77F3\u58A8\u7EC6\u8282"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        tooltip: "\u6B64\u9009\u9879\u63A7\u5236Graphite\u67E5\u8BE2\u7F16\u8F91\u5668\u4E2D\u53EF\u7528\u7684\u529F\u80FD\u3002"
      }, "\u7248\u672C"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Select, {
        value: currentVersion,
        options: graphiteVersions,
        width: 8,
        onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceJsonDataOptionSelect"])(this.props, 'graphiteVersion')
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        tooltip: this.renderTypeHelp
      }, "\u7C7B\u578B"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Select, {
        options: graphiteTypes,
        value: graphiteTypes.find(function (type) {
          return type.value === options.jsonData.graphiteType;
        }),
        width: 8,
        onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceJsonDataOptionSelect"])(this.props, 'graphiteType')
      }))), options.jsonData.graphiteType === _types__WEBPACK_IMPORTED_MODULE_3__["GraphiteType"].Metrictank && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Switch, {
        label: "\u6C47\u603B\u6307\u793A\u5668",
        labelClass: 'width-10',
        tooltip: "\u6C47\u603B\u6570\u636E\u65F6\u5728\u9762\u677F\u6807\u9898\u4E2D\u663E\u793A\u4E3A\u4FE1\u606F\u56FE\u6807",
        checked: !!options.jsonData.rollupIndicatorEnabled,
        onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceJsonDataOptionChecked"])(this.props, 'rollupIndicatorEnabled')
      })))));
    }
  }]);

  return ConfigEditor;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/***/ }),

/***/ "./public/app/plugins/datasource/graphite/datasource.ts":
/*!**************************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/datasource.ts ***!
  \**************************************************************/
/*! exports provided: GraphiteDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphiteDatasource", function() { return GraphiteDatasource; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_utils_version__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/utils/version */ "./public/app/core/utils/version.ts");
/* harmony import */ var _gfunc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gfunc */ "./public/app/plugins/datasource/graphite/gfunc.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types */ "./public/app/plugins/datasource/graphite/types.ts");
/* harmony import */ var app_plugins_datasource_graphite_meta__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/plugins/datasource/graphite/meta */ "./public/app/plugins/datasource/graphite/meta.ts");
/* harmony import */ var _features_variables_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../features/variables/utils */ "./public/app/features/variables/utils.ts");
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






// Types



var GraphiteDatasource =
/*#__PURE__*/
function (_DataSourceApi) {
  GraphiteDatasource.$inject = ["instanceSettings", "templateSrv"];

  _inherits(GraphiteDatasource, _DataSourceApi);

  /** @ngInject */
  function GraphiteDatasource(instanceSettings, templateSrv) {
    var _this;

    _classCallCheck(this, GraphiteDatasource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GraphiteDatasource).call(this, instanceSettings));
    _this.templateSrv = templateSrv;
    _this.funcDefs = null;
    _this.funcDefsPromise = null;

    _this.convertResponseToDataFrames = function (result) {
      var data = [];

      if (!result || !result.data) {
        return {
          data: data
        };
      } // Series are either at the root or under a node called 'series'


      var series = result.data.series || result.data;

      if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isArray(series)) {
        throw {
          message: 'Missing series in result',
          data: result
        };
      }

      for (var i = 0; i < series.length; i++) {
        var s = series[i]; // Disables Grafana own series naming

        s.title = s.target;

        for (var y = 0; y < s.datapoints.length; y++) {
          s.datapoints[y][1] *= 1000;
        }

        var frame = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["toDataFrame"])(s); // Metrictank metadata

        if (s.meta) {
          frame.meta = {
            custom: {
              requestMetaList: result.data.meta,
              // info for the whole request
              seriesMetaList: s.meta // Array of metadata

            }
          };

          if (_this.rollupIndicatorEnabled) {
            var rollupNotice = Object(app_plugins_datasource_graphite_meta__WEBPACK_IMPORTED_MODULE_6__["getRollupNotice"])(s.meta);
            var runtimeNotice = Object(app_plugins_datasource_graphite_meta__WEBPACK_IMPORTED_MODULE_6__["getRuntimeConsolidationNotice"])(s.meta);

            if (rollupNotice) {
              frame.meta.notices = [rollupNotice];
            } else if (runtimeNotice) {
              frame.meta.notices = [runtimeNotice];
            }
          } // only add the request stats to the first frame


          if (i === 0 && result.data.meta.stats) {
            frame.meta.stats = _this.getRequestStats(result.data.meta);
          }
        }

        data.push(frame);
      }

      return {
        data: data
      };
    };

    _this.basicAuth = instanceSettings.basicAuth;
    _this.url = instanceSettings.url;
    _this.name = instanceSettings.name;
    _this.graphiteVersion = instanceSettings.jsonData.graphiteVersion || '0.9';
    _this.isMetricTank = instanceSettings.jsonData.graphiteType === _types__WEBPACK_IMPORTED_MODULE_5__["GraphiteType"].Metrictank;
    _this.supportsTags = supportsTags(_this.graphiteVersion);
    _this.cacheTimeout = instanceSettings.cacheTimeout;
    _this.rollupIndicatorEnabled = instanceSettings.jsonData.rollupIndicatorEnabled;
    _this.withCredentials = instanceSettings.withCredentials;
    _this.funcDefs = null;
    _this.funcDefsPromise = null;
    _this._seriesRefLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return _this;
  }

  _createClass(GraphiteDatasource, [{
    key: "getQueryOptionsInfo",
    value: function getQueryOptionsInfo() {
      return {
        maxDataPoints: true,
        cacheTimeout: true,
        links: [{
          text: 'Help',
          url: 'http://docs.grafana.org/features/datasources/graphite/#using-graphite-in-grafana'
        }]
      };
    }
  }, {
    key: "query",
    value: function () {
      var _query = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(options) {
        var graphOptions, params, httpOptions;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                graphOptions = {
                  from: this.translateTime(options.range.raw.from, false, options.timezone),
                  until: this.translateTime(options.range.raw.to, true, options.timezone),
                  targets: options.targets,
                  format: options.format,
                  cacheTimeout: options.cacheTimeout || this.cacheTimeout,
                  maxDataPoints: options.maxDataPoints
                };
                params = this.buildGraphiteParams(graphOptions, options.scopedVars);

                if (!(params.length === 0)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", Promise.resolve({
                  data: []
                }));

              case 4:
                if (this.isMetricTank) {
                  params.push('meta=true');
                }

                httpOptions = {
                  method: 'POST',
                  url: '/render',
                  data: params.join('&'),
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                };
                this.addTracingHeaders(httpOptions, options);

                if (options.panelId) {
                  httpOptions.requestId = this.name + '.panelId.' + options.panelId;
                }

                return _context.abrupt("return", this.doGraphiteRequest(httpOptions).then(this.convertResponseToDataFrames));

              case 9:
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
    key: "addTracingHeaders",
    value: function addTracingHeaders(httpOptions, options) {
      var proxyMode = !this.url.match(/^http/);

      if (proxyMode) {
        if (options.dashboardId) {
          httpOptions.headers['X-Dashboard-Id'] = options.dashboardId;
        }

        if (options.panelId) {
          httpOptions.headers['X-Panel-Id'] = options.panelId;
        }
      }
    }
  }, {
    key: "getRequestStats",
    value: function getRequestStats(meta) {
      var stats = [];

      for (var key in meta.stats) {
        var unit = undefined;

        if (key.endsWith('.ms')) {
          unit = 'ms';
        }

        stats.push({
          displayName: key,
          value: meta.stats[key],
          unit: unit
        });
      }

      return stats;
    }
  }, {
    key: "parseTags",
    value: function parseTags(tagString) {
      var tags = [];
      tags = tagString.split(',');

      if (tags.length === 1) {
        tags = tagString.split(' ');

        if (tags[0] === '') {
          tags = [];
        }
      }

      return tags;
    }
  }, {
    key: "interpolateVariablesInQueries",
    value: function interpolateVariablesInQueries(queries, scopedVars) {
      var _this2 = this;

      var expandedQueries = queries;

      if (queries && queries.length > 0) {
        expandedQueries = queries.map(function (query) {
          var _query$target;

          var expandedQuery = _objectSpread({}, query, {
            datasource: _this2.name,
            target: _this2.templateSrv.replace((_query$target = query.target) !== null && _query$target !== void 0 ? _query$target : '', scopedVars)
          });

          return expandedQuery;
        });
      }

      return expandedQueries;
    }
  }, {
    key: "annotationQuery",
    value: function annotationQuery(options) {
      var _this3 = this;

      // Graphite metric as annotation
      if (options.annotation.target) {
        var target = this.templateSrv.replace(options.annotation.target, {}, 'glob');
        var graphiteQuery = {
          range: options.range,
          targets: [{
            target: target
          }],
          format: 'json',
          maxDataPoints: 100
        };
        return this.query(graphiteQuery).then(function (result) {
          var list = [];

          for (var i = 0; i < result.data.length; i++) {
            var _target = result.data[i];

            for (var y = 0; y < _target.length; y++) {
              var time = _target.fields[0].values.get(y);

              var value = _target.fields[1].values.get(y);

              if (!value) {
                continue;
              }

              list.push({
                annotation: options.annotation,
                time: time,
                title: _target.name
              });
            }
          }

          return list;
        });
      } else {
        // Graphite event as annotation
        var tags = this.templateSrv.replace(options.annotation.tags);
        return this.events({
          range: options.range,
          tags: tags
        }).then(function (results) {
          var list = [];

          for (var i = 0; i < results.data.length; i++) {
            var e = results.data[i];
            var _tags = e.tags;

            if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString(e.tags)) {
              _tags = _this3.parseTags(e.tags);
            }

            list.push({
              annotation: options.annotation,
              time: e.when * 1000,
              title: e.what,
              tags: _tags,
              text: e.data
            });
          }

          return list;
        });
      }
    }
  }, {
    key: "events",
    value: function events(options) {
      try {
        var tags = '';

        if (options.tags) {
          tags = '&tags=' + options.tags;
        }

        return this.doGraphiteRequest({
          method: 'GET',
          url: '/events/get_data?from=' + this.translateTime(options.range.raw.from, false, options.timezone) + '&until=' + this.translateTime(options.range.raw.to, true, options.timezone) + tags
        });
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }, {
    key: "targetContainsTemplate",
    value: function targetContainsTemplate(target) {
      var _target$target;

      return this.templateSrv.variableExists((_target$target = target.target) !== null && _target$target !== void 0 ? _target$target : '');
    }
  }, {
    key: "translateTime",
    value: function translateTime(date, roundUp, timezone) {
      if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString(date)) {
        if (date === 'now') {
          return 'now';
        } else if (date.indexOf('now-') >= 0 && date.indexOf('/') === -1) {
          date = date.substring(3);
          date = date.replace('m', 'min');
          date = date.replace('M', 'mon');
          return date;
        }

        date = _grafana_data__WEBPACK_IMPORTED_MODULE_1__["dateMath"].parse(date, roundUp, timezone);
      } // graphite' s from filter is exclusive
      // here we step back one minute in order
      // to guarantee that we get all the data that
      // exists for the specified range


      if (roundUp) {
        if (date.get('s')) {
          date.add(1, 's');
        }
      } else if (roundUp === false) {
        if (date.get('s')) {
          date.subtract(1, 's');
        }
      }

      return date.unix();
    }
  }, {
    key: "metricFindQuery",
    value: function metricFindQuery(query, optionalOptions) {
      var options = optionalOptions || {};
      var interpolatedQuery = this.templateSrv.replace(query, Object(_features_variables_utils__WEBPACK_IMPORTED_MODULE_7__["getSearchFilterScopedVar"])({
        query: query,
        wildcardChar: '',
        options: optionalOptions
      })); // special handling for tag_values(<tag>[,<expression>]*), this is used for template variables

      var matches = interpolatedQuery.match(/^tag_values\(([^,]+)((, *[^,]+)*)\)$/);

      if (matches) {
        var expressions = [];
        var exprRegex = /, *([^,]+)/g;
        var match = exprRegex.exec(matches[2]);

        while (match !== null) {
          expressions.push(match[1]);
          match = exprRegex.exec(matches[2]);
        }

        options.limit = 10000;
        return this.getTagValuesAutoComplete(expressions, matches[1], undefined, options);
      } // special handling for tags(<expression>[,<expression>]*), this is used for template variables


      matches = interpolatedQuery.match(/^tags\(([^,]*)((, *[^,]+)*)\)$/);

      if (matches) {
        var _expressions = [];

        if (matches[1]) {
          _expressions.push(matches[1]);

          var _exprRegex = /, *([^,]+)/g;

          var _match = _exprRegex.exec(matches[2]);

          while (_match !== null) {
            _expressions.push(_match[1]);

            _match = _exprRegex.exec(matches[2]);
          }
        }

        options.limit = 10000;
        return this.getTagsAutoComplete(_expressions, undefined, options);
      }

      interpolatedQuery = this.templateSrv.replace(query, Object(_features_variables_utils__WEBPACK_IMPORTED_MODULE_7__["getSearchFilterScopedVar"])({
        query: query,
        wildcardChar: '*',
        options: optionalOptions
      }));
      var httpOptions = {
        method: 'POST',
        url: '/metrics/find',
        params: {},
        data: "query=".concat(interpolatedQuery),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        // for cancellations
        requestId: options.requestId
      };

      if (options.range) {
        httpOptions.params.from = this.translateTime(options.range.from, false, options.timezone);
        httpOptions.params.until = this.translateTime(options.range.to, true, options.timezone);
      }

      return this.doGraphiteRequest(httpOptions).then(function (results) {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(results.data, function (metric) {
          return {
            text: metric.text,
            expandable: metric.expandable ? true : false
          };
        });
      });
    }
  }, {
    key: "getTags",
    value: function getTags(optionalOptions) {
      var options = optionalOptions || {};
      var httpOptions = {
        method: 'GET',
        url: '/tags',
        // for cancellations
        requestId: options.requestId
      };

      if (options.range) {
        httpOptions.params.from = this.translateTime(options.range.from, false, options.timezone);
        httpOptions.params.until = this.translateTime(options.range.to, true, options.timezone);
      }

      return this.doGraphiteRequest(httpOptions).then(function (results) {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(results.data, function (tag) {
          return {
            text: tag.tag,
            id: tag.id
          };
        });
      });
    }
  }, {
    key: "getTagValues",
    value: function getTagValues() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var httpOptions = {
        method: 'GET',
        url: '/tags/' + this.templateSrv.replace(options.key),
        // for cancellations
        requestId: options.requestId
      };

      if (options.range) {
        httpOptions.params.from = this.translateTime(options.range.from, false, options.timezone);
        httpOptions.params.until = this.translateTime(options.range.to, true, options.timezone);
      }

      return this.doGraphiteRequest(httpOptions).then(function (results) {
        if (results.data && results.data.values) {
          return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(results.data.values, function (value) {
            return {
              text: value.value,
              id: value.id
            };
          });
        } else {
          return [];
        }
      });
    }
  }, {
    key: "getTagsAutoComplete",
    value: function getTagsAutoComplete(expressions, tagPrefix, optionalOptions) {
      var _this4 = this;

      var options = optionalOptions || {};
      var httpOptions = {
        method: 'GET',
        url: '/tags/autoComplete/tags',
        params: {
          expr: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(expressions, function (expression) {
            return _this4.templateSrv.replace((expression || '').trim());
          })
        },
        // for cancellations
        requestId: options.requestId
      };

      if (tagPrefix) {
        httpOptions.params.tagPrefix = tagPrefix;
      }

      if (options.limit) {
        httpOptions.params.limit = options.limit;
      }

      if (options.range) {
        httpOptions.params.from = this.translateTime(options.range.from, false, options.timezone);
        httpOptions.params.until = this.translateTime(options.range.to, true, options.timezone);
      }

      return this.doGraphiteRequest(httpOptions).then(function (results) {
        if (results.data) {
          return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(results.data, function (tag) {
            return {
              text: tag
            };
          });
        } else {
          return [];
        }
      });
    }
  }, {
    key: "getTagValuesAutoComplete",
    value: function getTagValuesAutoComplete(expressions, tag, valuePrefix, optionalOptions) {
      var _this5 = this;

      var options = optionalOptions || {};
      var httpOptions = {
        method: 'GET',
        url: '/tags/autoComplete/values',
        params: {
          expr: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(expressions, function (expression) {
            return _this5.templateSrv.replace((expression || '').trim());
          }),
          tag: this.templateSrv.replace((tag || '').trim())
        },
        // for cancellations
        requestId: options.requestId
      };

      if (valuePrefix) {
        httpOptions.params.valuePrefix = valuePrefix;
      }

      if (options.limit) {
        httpOptions.params.limit = options.limit;
      }

      if (options.range) {
        httpOptions.params.from = this.translateTime(options.range.from, false, options.timezone);
        httpOptions.params.until = this.translateTime(options.range.to, true, options.timezone);
      }

      return this.doGraphiteRequest(httpOptions).then(function (results) {
        if (results.data) {
          return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(results.data, function (value) {
            return {
              text: value
            };
          });
        } else {
          return [];
        }
      });
    }
  }, {
    key: "getVersion",
    value: function getVersion(optionalOptions) {
      var options = optionalOptions || {};
      var httpOptions = {
        method: 'GET',
        url: '/version',
        requestId: options.requestId
      };
      return this.doGraphiteRequest(httpOptions).then(function (results) {
        if (results.data) {
          var semver = new app_core_utils_version__WEBPACK_IMPORTED_MODULE_2__["SemVersion"](results.data);
          return semver.isValid() ? results.data : '';
        }

        return '';
      }).catch(function () {
        return '';
      });
    }
  }, {
    key: "createFuncInstance",
    value: function createFuncInstance(funcDef, options) {
      return _gfunc__WEBPACK_IMPORTED_MODULE_3__["default"].createFuncInstance(funcDef, options, this.funcDefs);
    }
  }, {
    key: "getFuncDef",
    value: function getFuncDef(name) {
      return _gfunc__WEBPACK_IMPORTED_MODULE_3__["default"].getFuncDef(name, this.funcDefs);
    }
  }, {
    key: "waitForFuncDefsLoaded",
    value: function waitForFuncDefsLoaded() {
      return this.getFuncDefs();
    }
  }, {
    key: "getFuncDefs",
    value: function getFuncDefs() {
      var _this6 = this;

      if (this.funcDefsPromise !== null) {
        return this.funcDefsPromise;
      }

      if (!supportsFunctionIndex(this.graphiteVersion)) {
        this.funcDefs = _gfunc__WEBPACK_IMPORTED_MODULE_3__["default"].getFuncDefs(this.graphiteVersion);
        this.funcDefsPromise = Promise.resolve(this.funcDefs);
        return this.funcDefsPromise;
      }

      var httpOptions = {
        method: 'GET',
        url: '/functions'
      };
      this.funcDefsPromise = this.doGraphiteRequest(httpOptions).then(function (results) {
        if (results.status !== 200 || _typeof(results.data) !== 'object') {
          _this6.funcDefs = _gfunc__WEBPACK_IMPORTED_MODULE_3__["default"].getFuncDefs(_this6.graphiteVersion);
        } else {
          _this6.funcDefs = _gfunc__WEBPACK_IMPORTED_MODULE_3__["default"].parseFuncDefs(results.data);
        }

        return _this6.funcDefs;
      }).catch(function (err) {
        console.error('提取石墨功能错误', err);
        _this6.funcDefs = _gfunc__WEBPACK_IMPORTED_MODULE_3__["default"].getFuncDefs(_this6.graphiteVersion);
        return _this6.funcDefs;
      });
      return this.funcDefsPromise;
    }
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      var query = {
        panelId: 3,
        rangeRaw: {
          from: 'now-1h',
          to: 'now'
        },
        range: {
          raw: {
            from: 'now-1h',
            to: 'now'
          }
        },
        targets: [{
          target: 'constantLine(100)'
        }],
        maxDataPoints: 300
      };
      return this.query(query).then(function () {
        return {
          status: 'success',
          message: '数据源正在工作'
        };
      });
    }
  }, {
    key: "doGraphiteRequest",
    value: function doGraphiteRequest(options) {
      if (this.basicAuth || this.withCredentials) {
        options.withCredentials = true;
      }

      if (this.basicAuth) {
        options.headers = options.headers || {};
        options.headers.Authorization = this.basicAuth;
      }

      options.url = this.url + options.url;
      options.inspect = {
        type: 'graphite'
      };
      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getBackendSrv"])().datasourceRequest(options);
    }
  }, {
    key: "buildGraphiteParams",
    value: function buildGraphiteParams(options, scopedVars) {
      var graphiteOptions = ['from', 'until', 'rawData', 'format', 'maxDataPoints', 'cacheTimeout'];
      var cleanOptions = [],
          targets = {};
      var target, targetValue, i;
      var regex = /\#([A-Z])/g;
      var intervalFormatFixRegex = /'(\d+)m'/gi;
      var hasTargets = false;
      options['format'] = 'json';

      function fixIntervalFormat(match) {
        return match.replace('m', 'min').replace('M', 'mon');
      }

      for (i = 0; i < options.targets.length; i++) {
        target = options.targets[i];

        if (!target.target) {
          continue;
        }

        if (!target.refId) {
          target.refId = this._seriesRefLetters[i];
        }

        targetValue = this.templateSrv.replace(target.target, scopedVars);
        targetValue = targetValue.replace(intervalFormatFixRegex, fixIntervalFormat);
        targets[target.refId] = targetValue;
      }

      function nestedSeriesRegexReplacer(match, g1) {
        return targets[g1] || match;
      }

      for (i = 0; i < options.targets.length; i++) {
        target = options.targets[i];

        if (!target.target) {
          continue;
        }

        targetValue = targets[target.refId];
        targetValue = targetValue.replace(regex, nestedSeriesRegexReplacer);
        targets[target.refId] = targetValue;

        if (!target.hide) {
          hasTargets = true;
          cleanOptions.push('target=' + encodeURIComponent(targetValue));
        }
      }

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(options, function (value, key) {
        if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.indexOf(graphiteOptions, key) === -1) {
          return;
        }

        if (value) {
          cleanOptions.push(key + '=' + encodeURIComponent(value));
        }
      });

      if (!hasTargets) {
        return [];
      }

      return cleanOptions;
    }
  }]);

  return GraphiteDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataSourceApi"]);

function supportsTags(version) {
  return Object(app_core_utils_version__WEBPACK_IMPORTED_MODULE_2__["isVersionGtOrEq"])(version, '1.1');
}

function supportsFunctionIndex(version) {
  return Object(app_core_utils_version__WEBPACK_IMPORTED_MODULE_2__["isVersionGtOrEq"])(version, '1.1');
}

/***/ }),

/***/ "./public/app/plugins/datasource/graphite/func_editor.ts":
/*!***************************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/func_editor.ts ***!
  \***************************************************************/
/*! exports provided: graphiteFuncEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graphiteFuncEditor", function() { return graphiteFuncEditor; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_core_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/core_module */ "./public/app/core/core_module.ts");
graphiteFuncEditor.$inject = ["$compile", "templateSrv"];




/** @ngInject */
function graphiteFuncEditor($compile, templateSrv) {
  var funcSpanTemplate = "\n    <function-editor\n      func=\"func\"\n      onRemove=\"ctrl.handleRemoveFunction\"\n      onMoveLeft=\"ctrl.handleMoveLeft\"\n      onMoveRight=\"ctrl.handleMoveRight\">\n    </function-editor>\n    <span>(</span>\n  ";
  var paramTemplate = '<input type="text" style="display:none"' + ' class="input-small tight-form-func-param"></input>';
  return {
    restrict: 'A',
    link: function postLink($scope, elem) {
      var $funcLink = jquery__WEBPACK_IMPORTED_MODULE_1___default()(funcSpanTemplate);
      var ctrl = $scope.ctrl;
      var func = $scope.func;
      var scheduledRelink = false;
      var paramCountAtLink = 0;
      var cancelBlur = null;

      ctrl.handleRemoveFunction = function (func) {
        ctrl.removeFunction(func);
      };

      ctrl.handleMoveLeft = function (func) {
        ctrl.moveFunction(func, -1);
      };

      ctrl.handleMoveRight = function (func) {
        ctrl.moveFunction(func, 1);
      };

      function clickFuncParam(paramIndex) {
        var $link = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this);
        var $comma = $link.prev('.comma');
        var $input = $link.next();
        $input.val(func.params[paramIndex]);
        $comma.removeClass('query-part__last');
        $link.hide();
        $input.show();
        $input.focus();
        $input.select();
        var typeahead = $input.data('typeahead');

        if (typeahead) {
          $input.val('');
          typeahead.lookup();
        }
      }

      function scheduledRelinkIfNeeded() {
        if (paramCountAtLink === func.params.length) {
          return;
        }

        if (!scheduledRelink) {
          scheduledRelink = true;
          setTimeout(function () {
            relink();
            scheduledRelink = false;
          }, 200);
        }
      }

      function paramDef(index) {
        if (index < func.def.params.length) {
          return func.def.params[index];
        }

        if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.last(func.def.params).multiple) {
          return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assign({}, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.last(func.def.params), {
            optional: true
          });
        }

        return {};
      }

      function switchToLink(inputElem, paramIndex) {
        var $input = jquery__WEBPACK_IMPORTED_MODULE_1___default()(inputElem);
        clearTimeout(cancelBlur);
        cancelBlur = null;
        var $link = $input.prev();
        var $comma = $link.prev('.comma');
        var newValue = $input.val(); // remove optional empty params

        if (newValue !== '' || paramDef(paramIndex).optional) {
          func.updateParam(newValue, paramIndex);
          $link.html(newValue ? templateSrv.highlightVariablesAsHtml(newValue) : '&nbsp;');
        }

        scheduledRelinkIfNeeded();
        $scope.$apply(function () {
          ctrl.targetChanged();
        });

        if ($link.hasClass('query-part__last') && newValue === '') {
          $comma.addClass('query-part__last');
        } else {
          $link.removeClass('query-part__last');
        }

        $input.hide();
        $link.show();
      } // this = input element


      function inputBlur(paramIndex) {
        var inputElem = this; // happens long before the click event on the typeahead options
        // need to have long delay because the blur

        cancelBlur = setTimeout(function () {
          switchToLink(inputElem, paramIndex);
        }, 200);
      }

      function inputKeyPress(paramIndex, e) {
        if (e.which === 13) {
          jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).blur();
        }
      }

      function inputKeyDown() {
        this.style.width = (3 + this.value.length) * 8 + 'px';
      }

      function addTypeahead($input, paramIndex) {
        $input.attr('data-provide', 'typeahead');
        var options = paramDef(paramIndex).options;

        if (paramDef(paramIndex).type === 'int') {
          options = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(options, function (val) {
            return val.toString();
          });
        }

        $input.typeahead({
          source: options,
          minLength: 0,
          items: 20,
          updater: function updater(value) {
            $input.val(value);
            switchToLink($input[0], paramIndex);
            return value;
          }
        });
        var typeahead = $input.data('typeahead');

        typeahead.lookup = function () {
          this.query = this.$element.val() || '';
          return this.process(this.source);
        };
      }

      function addElementsAndCompile() {
        $funcLink.appendTo(elem);

        var defParams = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.clone(func.def.params);

        var lastParam = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.last(func.def.params);

        while (func.params.length >= defParams.length && lastParam && lastParam.multiple) {
          defParams.push(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assign({}, lastParam, {
            optional: true
          }));
        }

        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(defParams, function (param, index) {
          if (param.optional && func.params.length < index) {
            return false;
          }

          var paramValue = templateSrv.highlightVariablesAsHtml(func.params[index]);
          var hasValue = paramValue !== null && paramValue !== undefined && paramValue !== '';
          var last = index >= func.params.length - 1 && param.optional && !hasValue;
          var linkClass = 'query-part__link';

          if (last) {
            linkClass += ' query-part__last';
          }

          if (last && param.multiple) {
            paramValue = '+';
          } else if (!hasValue) {
            // for params with no value default to param name
            paramValue = param.name;
            linkClass += ' query-part__link--no-value';
          }

          if (index > 0) {
            jquery__WEBPACK_IMPORTED_MODULE_1___default()('<span class="comma' + (last ? ' query-part__last' : '') + '">, </span>').appendTo(elem);
          }

          var $paramLink = jquery__WEBPACK_IMPORTED_MODULE_1___default()("<a ng-click=\"\" class=\"".concat(linkClass, "\">").concat(paramValue, "</a>"));
          var $input = jquery__WEBPACK_IMPORTED_MODULE_1___default()(paramTemplate);
          $input.attr('placeholder', param.name);
          paramCountAtLink++;
          $paramLink.appendTo(elem);
          $input.appendTo(elem);
          $input.blur(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.partial(inputBlur, index));
          $input.keyup(inputKeyDown);
          $input.keypress(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.partial(inputKeyPress, index));
          $paramLink.click(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.partial(clickFuncParam, index));

          if (param.options) {
            addTypeahead($input, index);
          }

          return true;
        });

        jquery__WEBPACK_IMPORTED_MODULE_1___default()('<span>)</span>').appendTo(elem);
        $compile(elem.contents())($scope);
      }

      function ifJustAddedFocusFirstParam() {
        if ($scope.func.added) {
          $scope.func.added = false;
          setTimeout(function () {
            elem.find('.query-part__link').first().click();
          }, 10);
        }
      }

      function relink() {
        elem.children().remove();
        addElementsAndCompile();
        ifJustAddedFocusFirstParam();
      }

      relink();
    }
  };
}
app_core_core_module__WEBPACK_IMPORTED_MODULE_2__["default"].directive('graphiteFuncEditor', graphiteFuncEditor);

/***/ }),

/***/ "./public/app/plugins/datasource/graphite/gfunc.ts":
/*!*********************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/gfunc.ts ***!
  \*********************************************************/
/*! exports provided: FuncInstance, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FuncInstance", function() { return FuncInstance; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_utils_version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/utils/version */ "./public/app/core/utils/version.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var index = {};

function addFuncDef(funcDef) {
  funcDef.params = funcDef.params || [];
  funcDef.defaultParams = funcDef.defaultParams || [];
  index[funcDef.name] = funcDef;

  if (funcDef.shortName) {
    index[funcDef.shortName] = funcDef;
  }
}

var optionalSeriesRefArgs = [{
  name: 'other',
  type: 'value_or_series',
  optional: true,
  multiple: true
}];
addFuncDef({
  name: 'scaleToSeconds',
  category: 'Transform',
  params: [{
    name: 'seconds',
    type: 'int'
  }],
  defaultParams: [1]
});
addFuncDef({
  name: 'perSecond',
  category: 'Transform',
  params: [{
    name: 'max value',
    type: 'int',
    optional: true
  }],
  defaultParams: []
});
addFuncDef({
  name: 'holtWintersForecast',
  category: 'Calculate'
});
addFuncDef({
  name: 'holtWintersConfidenceBands',
  category: 'Calculate',
  params: [{
    name: 'delta',
    type: 'int'
  }],
  defaultParams: [3]
});
addFuncDef({
  name: 'holtWintersAberration',
  category: 'Calculate',
  params: [{
    name: 'delta',
    type: 'int'
  }],
  defaultParams: [3]
});
addFuncDef({
  name: 'nPercentile',
  category: 'Calculate',
  params: [{
    name: 'Nth percentile',
    type: 'int'
  }],
  defaultParams: [95]
});
addFuncDef({
  name: 'diffSeries',
  params: optionalSeriesRefArgs,
  defaultParams: ['#A'],
  category: 'Combine'
});
addFuncDef({
  name: 'stddevSeries',
  params: optionalSeriesRefArgs,
  defaultParams: [''],
  category: 'Combine'
});
addFuncDef({
  name: 'divideSeries',
  params: optionalSeriesRefArgs,
  defaultParams: ['#A'],
  category: 'Combine'
});
addFuncDef({
  name: 'multiplySeries',
  params: optionalSeriesRefArgs,
  defaultParams: ['#A'],
  category: 'Combine'
});
addFuncDef({
  name: 'asPercent',
  params: optionalSeriesRefArgs,
  defaultParams: ['#A'],
  category: 'Combine'
});
addFuncDef({
  name: 'group',
  params: optionalSeriesRefArgs,
  defaultParams: ['#A', '#B'],
  category: 'Combine'
});
addFuncDef({
  name: 'sumSeries',
  shortName: 'sum',
  category: 'Combine',
  params: optionalSeriesRefArgs,
  defaultParams: ['']
});
addFuncDef({
  name: 'averageSeries',
  shortName: 'avg',
  category: 'Combine',
  params: optionalSeriesRefArgs,
  defaultParams: ['']
});
addFuncDef({
  name: 'rangeOfSeries',
  category: 'Combine'
});
addFuncDef({
  name: 'percentileOfSeries',
  category: 'Combine',
  params: [{
    name: 'n',
    type: 'int'
  }, {
    name: 'interpolate',
    type: 'boolean',
    options: ['true', 'false']
  }],
  defaultParams: [95, 'false']
});
addFuncDef({
  name: 'sumSeriesWithWildcards',
  category: 'Combine',
  params: [{
    name: 'node',
    type: 'int',
    multiple: true
  }],
  defaultParams: [3]
});
addFuncDef({
  name: 'maxSeries',
  shortName: 'max',
  category: 'Combine'
});
addFuncDef({
  name: 'minSeries',
  shortName: 'min',
  category: 'Combine'
});
addFuncDef({
  name: 'averageSeriesWithWildcards',
  category: 'Combine',
  params: [{
    name: 'node',
    type: 'int',
    multiple: true
  }],
  defaultParams: [3]
});
addFuncDef({
  name: 'alias',
  category: 'Alias',
  params: [{
    name: 'alias',
    type: 'string'
  }],
  defaultParams: ['alias']
});
addFuncDef({
  name: 'aliasSub',
  category: 'Alias',
  params: [{
    name: 'search',
    type: 'string'
  }, {
    name: 'replace',
    type: 'string'
  }],
  defaultParams: ['', '\\1']
});
addFuncDef({
  name: 'consolidateBy',
  category: 'Special',
  params: [{
    name: 'function',
    type: 'string',
    options: ['sum', 'average', 'min', 'max']
  }],
  defaultParams: ['max']
});
addFuncDef({
  name: 'cumulative',
  category: 'Special',
  params: [],
  defaultParams: []
});
addFuncDef({
  name: 'groupByNode',
  category: 'Combine',
  params: [{
    name: 'node',
    type: 'int',
    options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]
  }, {
    name: 'function',
    type: 'string',
    options: ['sum', 'avg', 'maxSeries']
  }],
  defaultParams: [3, 'sum']
});
addFuncDef({
  name: 'aliasByNode',
  category: 'Alias',
  params: [{
    name: 'node',
    type: 'int',
    options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
    multiple: true
  }],
  defaultParams: [3]
});
addFuncDef({
  name: 'substr',
  category: 'Special',
  params: [{
    name: 'start',
    type: 'int',
    options: [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]
  }, {
    name: 'stop',
    type: 'int',
    options: [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]
  }],
  defaultParams: [0, 0]
});
addFuncDef({
  name: 'sortByName',
  category: 'Sorting',
  params: [{
    name: 'natural',
    type: 'boolean',
    options: ['true', 'false'],
    optional: true
  }],
  defaultParams: ['false']
});
addFuncDef({
  name: 'sortByMaxima',
  category: 'Sorting'
});
addFuncDef({
  name: 'sortByMinima',
  category: 'Sorting'
});
addFuncDef({
  name: 'sortByTotal',
  category: 'Sorting'
});
addFuncDef({
  name: 'aliasByMetric',
  category: 'Alias'
});
addFuncDef({
  name: 'randomWalk',
  fake: true,
  category: 'Special',
  params: [{
    name: 'name',
    type: 'string'
  }],
  defaultParams: ['randomWalk']
});
addFuncDef({
  name: 'countSeries',
  category: 'Combine'
});
addFuncDef({
  name: 'constantLine',
  category: 'Special',
  params: [{
    name: 'value',
    type: 'int'
  }],
  defaultParams: [10]
});
addFuncDef({
  name: 'cactiStyle',
  category: 'Special'
});
addFuncDef({
  name: 'keepLastValue',
  category: 'Transform',
  params: [{
    name: 'n',
    type: 'int'
  }],
  defaultParams: [100]
});
addFuncDef({
  name: 'changed',
  category: 'Special',
  params: [],
  defaultParams: []
});
addFuncDef({
  name: 'scale',
  category: 'Transform',
  params: [{
    name: 'factor',
    type: 'int'
  }],
  defaultParams: [1]
});
addFuncDef({
  name: 'offset',
  category: 'Transform',
  params: [{
    name: 'amount',
    type: 'int'
  }],
  defaultParams: [10]
});
addFuncDef({
  name: 'transformNull',
  category: 'Transform',
  params: [{
    name: 'amount',
    type: 'int'
  }],
  defaultParams: [0]
});
addFuncDef({
  name: 'integral',
  category: 'Transform'
});
addFuncDef({
  name: 'derivative',
  category: 'Transform'
});
addFuncDef({
  name: 'nonNegativeDerivative',
  category: 'Transform',
  params: [{
    name: 'max value or 0',
    type: 'int',
    optional: true
  }],
  defaultParams: ['']
});
addFuncDef({
  name: 'timeShift',
  category: 'Transform',
  params: [{
    name: 'amount',
    type: 'select',
    options: ['1h', '6h', '12h', '1d', '2d', '7d', '14d', '30d']
  }],
  defaultParams: ['1d']
});
addFuncDef({
  name: 'timeStack',
  category: 'Transform',
  params: [{
    name: 'timeShiftUnit',
    type: 'select',
    options: ['1h', '6h', '12h', '1d', '2d', '7d', '14d', '30d']
  }, {
    name: 'timeShiftStart',
    type: 'int'
  }, {
    name: 'timeShiftEnd',
    type: 'int'
  }],
  defaultParams: ['1d', 0, 7]
});
addFuncDef({
  name: 'summarize',
  category: 'Transform',
  params: [{
    name: 'interval',
    type: 'string'
  }, {
    name: 'func',
    type: 'select',
    options: ['sum', 'avg', 'min', 'max', 'last']
  }, {
    name: 'alignToFrom',
    type: 'boolean',
    optional: true,
    options: ['false', 'true']
  }],
  defaultParams: ['1h', 'sum', 'false']
});
addFuncDef({
  name: 'smartSummarize',
  category: 'Transform',
  params: [{
    name: 'interval',
    type: 'string'
  }, {
    name: 'func',
    type: 'select',
    options: ['sum', 'avg', 'min', 'max', 'last']
  }],
  defaultParams: ['1h', 'sum']
});
addFuncDef({
  name: 'absolute',
  category: 'Transform'
});
addFuncDef({
  name: 'hitcount',
  category: 'Transform',
  params: [{
    name: 'interval',
    type: 'string'
  }],
  defaultParams: ['10s']
});
addFuncDef({
  name: 'log',
  category: 'Transform',
  params: [{
    name: 'base',
    type: 'int'
  }],
  defaultParams: ['10']
});
addFuncDef({
  name: 'averageAbove',
  category: 'Filter Series',
  params: [{
    name: 'n',
    type: 'int'
  }],
  defaultParams: [25]
});
addFuncDef({
  name: 'averageBelow',
  category: 'Filter Series',
  params: [{
    name: 'n',
    type: 'int'
  }],
  defaultParams: [25]
});
addFuncDef({
  name: 'currentAbove',
  category: 'Filter Series',
  params: [{
    name: 'n',
    type: 'int'
  }],
  defaultParams: [25]
});
addFuncDef({
  name: 'currentBelow',
  category: 'Filter Series',
  params: [{
    name: 'n',
    type: 'int'
  }],
  defaultParams: [25]
});
addFuncDef({
  name: 'maximumAbove',
  category: 'Filter Series',
  params: [{
    name: 'value',
    type: 'int'
  }],
  defaultParams: [0]
});
addFuncDef({
  name: 'maximumBelow',
  category: 'Filter Series',
  params: [{
    name: 'value',
    type: 'int'
  }],
  defaultParams: [0]
});
addFuncDef({
  name: 'minimumAbove',
  category: 'Filter Series',
  params: [{
    name: 'value',
    type: 'int'
  }],
  defaultParams: [0]
});
addFuncDef({
  name: 'minimumBelow',
  category: 'Filter Series',
  params: [{
    name: 'value',
    type: 'int'
  }],
  defaultParams: [0]
});
addFuncDef({
  name: 'limit',
  category: 'Filter Series',
  params: [{
    name: 'n',
    type: 'int'
  }],
  defaultParams: [5]
});
addFuncDef({
  name: 'mostDeviant',
  category: 'Filter Series',
  params: [{
    name: 'n',
    type: 'int'
  }],
  defaultParams: [10]
});
addFuncDef({
  name: 'exclude',
  category: 'Filter Series',
  params: [{
    name: 'exclude',
    type: 'string'
  }],
  defaultParams: ['exclude']
});
addFuncDef({
  name: 'highestCurrent',
  category: 'Filter Series',
  params: [{
    name: 'count',
    type: 'int'
  }],
  defaultParams: [5]
});
addFuncDef({
  name: 'highestMax',
  category: 'Filter Series',
  params: [{
    name: 'count',
    type: 'int'
  }],
  defaultParams: [5]
});
addFuncDef({
  name: 'lowestCurrent',
  category: 'Filter Series',
  params: [{
    name: 'count',
    type: 'int'
  }],
  defaultParams: [5]
});
addFuncDef({
  name: 'movingAverage',
  category: 'Calculate',
  params: [{
    name: 'windowSize',
    type: 'int_or_interval',
    options: ['5', '7', '10', '5min', '10min', '30min', '1hour']
  }],
  defaultParams: [10]
});
addFuncDef({
  name: 'movingMedian',
  category: 'Calculate',
  params: [{
    name: 'windowSize',
    type: 'int_or_interval',
    options: ['5', '7', '10', '5min', '10min', '30min', '1hour']
  }],
  defaultParams: ['5']
});
addFuncDef({
  name: 'stdev',
  category: 'Calculate',
  params: [{
    name: 'n',
    type: 'int'
  }, {
    name: 'tolerance',
    type: 'int'
  }],
  defaultParams: [5, 0.1]
});
addFuncDef({
  name: 'highestAverage',
  category: 'Filter Series',
  params: [{
    name: 'count',
    type: 'int'
  }],
  defaultParams: [5]
});
addFuncDef({
  name: 'lowestAverage',
  category: 'Filter Series',
  params: [{
    name: 'count',
    type: 'int'
  }],
  defaultParams: [5]
});
addFuncDef({
  name: 'removeAbovePercentile',
  category: 'Filter Data',
  params: [{
    name: 'n',
    type: 'int'
  }],
  defaultParams: [5]
});
addFuncDef({
  name: 'removeAboveValue',
  category: 'Filter Data',
  params: [{
    name: 'n',
    type: 'int'
  }],
  defaultParams: [5]
});
addFuncDef({
  name: 'removeBelowPercentile',
  category: 'Filter Data',
  params: [{
    name: 'n',
    type: 'int'
  }],
  defaultParams: [5]
});
addFuncDef({
  name: 'removeBelowValue',
  category: 'Filter Data',
  params: [{
    name: 'n',
    type: 'int'
  }],
  defaultParams: [5]
});
addFuncDef({
  name: 'useSeriesAbove',
  category: 'Filter Series',
  params: [{
    name: 'value',
    type: 'int'
  }, {
    name: 'search',
    type: 'string'
  }, {
    name: 'replace',
    type: 'string'
  }],
  defaultParams: [0, 'search', 'replace']
}); ////////////////////
// Graphite 1.0.x //
////////////////////

addFuncDef({
  name: 'aggregateLine',
  category: 'Calculate',
  params: [{
    name: 'func',
    type: 'select',
    options: ['sum', 'avg', 'min', 'max', 'last']
  }],
  defaultParams: ['avg'],
  version: '1.0'
});
addFuncDef({
  name: 'averageOutsidePercentile',
  category: 'Filter Series',
  params: [{
    name: 'n',
    type: 'int'
  }],
  defaultParams: [95],
  version: '1.0'
});
addFuncDef({
  name: 'delay',
  category: 'Transform',
  params: [{
    name: 'steps',
    type: 'int'
  }],
  defaultParams: [1],
  version: '1.0'
});
addFuncDef({
  name: 'exponentialMovingAverage',
  category: 'Calculate',
  params: [{
    name: 'windowSize',
    type: 'int_or_interval',
    options: ['5', '7', '10', '5min', '10min', '30min', '1hour']
  }],
  defaultParams: [10],
  version: '1.0'
});
addFuncDef({
  name: 'fallbackSeries',
  category: 'Special',
  params: [{
    name: 'fallback',
    type: 'string'
  }],
  defaultParams: ['constantLine(0)'],
  version: '1.0'
});
addFuncDef({
  name: 'grep',
  category: 'Filter Series',
  params: [{
    name: 'grep',
    type: 'string'
  }],
  defaultParams: ['grep'],
  version: '1.0'
});
addFuncDef({
  name: 'groupByNodes',
  category: 'Combine',
  params: [{
    name: 'function',
    type: 'string',
    options: ['sum', 'avg', 'maxSeries']
  }, {
    name: 'node',
    type: 'int',
    options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
    multiple: true
  }],
  defaultParams: ['sum', 3],
  version: '1.0'
});
addFuncDef({
  name: 'integralByInterval',
  category: 'Transform',
  params: [{
    name: 'intervalUnit',
    type: 'select',
    options: ['1h', '6h', '12h', '1d', '2d', '7d', '14d', '30d']
  }],
  defaultParams: ['1d'],
  version: '1.0'
});
addFuncDef({
  name: 'interpolate',
  category: 'Transform',
  params: [{
    name: 'limit',
    type: 'int',
    optional: true
  }],
  defaultParams: [],
  version: '1.0'
});
addFuncDef({
  name: 'invert',
  category: 'Transform',
  version: '1.0'
});
addFuncDef({
  name: 'isNonNull',
  category: 'Combine',
  version: '1.0'
});
addFuncDef({
  name: 'linearRegression',
  category: 'Calculate',
  params: [{
    name: 'startSourceAt',
    type: 'select',
    options: ['-1h', '-6h', '-12h', '-1d', '-2d', '-7d', '-14d', '-30d'],
    optional: true
  }, {
    name: 'endSourceAt',
    type: 'select',
    options: ['-1h', '-6h', '-12h', '-1d', '-2d', '-7d', '-14d', '-30d'],
    optional: true
  }],
  defaultParams: [],
  version: '1.0'
});
addFuncDef({
  name: 'mapSeries',
  shortName: 'map',
  params: [{
    name: 'node',
    type: 'int'
  }],
  defaultParams: [3],
  category: 'Combine',
  version: '1.0'
});
addFuncDef({
  name: 'movingMin',
  category: 'Calculate',
  params: [{
    name: 'windowSize',
    type: 'int_or_interval',
    options: ['5', '7', '10', '5min', '10min', '30min', '1hour']
  }],
  defaultParams: [10],
  version: '1.0'
});
addFuncDef({
  name: 'movingMax',
  category: 'Calculate',
  params: [{
    name: 'windowSize',
    type: 'int_or_interval',
    options: ['5', '7', '10', '5min', '10min', '30min', '1hour']
  }],
  defaultParams: [10],
  version: '1.0'
});
addFuncDef({
  name: 'movingSum',
  category: 'Calculate',
  params: [{
    name: 'windowSize',
    type: 'int_or_interval',
    options: ['5', '7', '10', '5min', '10min', '30min', '1hour']
  }],
  defaultParams: [10],
  version: '1.0'
});
addFuncDef({
  name: 'multiplySeriesWithWildcards',
  category: 'Combine',
  params: [{
    name: 'position',
    type: 'int',
    options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
    multiple: true
  }],
  defaultParams: [2],
  version: '1.0'
});
addFuncDef({
  name: 'offsetToZero',
  category: 'Transform',
  version: '1.0'
});
addFuncDef({
  name: 'pow',
  category: 'Transform',
  params: [{
    name: 'factor',
    type: 'int'
  }],
  defaultParams: [10],
  version: '1.0'
});
addFuncDef({
  name: 'powSeries',
  category: 'Transform',
  params: optionalSeriesRefArgs,
  defaultParams: [''],
  version: '1.0'
});
addFuncDef({
  name: 'reduceSeries',
  shortName: 'reduce',
  params: [{
    name: 'function',
    type: 'string',
    options: ['asPercent', 'diffSeries', 'divideSeries']
  }, {
    name: 'reduceNode',
    type: 'int',
    options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  }, {
    name: 'reduceMatchers',
    type: 'string',
    multiple: true
  }],
  defaultParams: ['asPercent', 2, 'used_bytes'],
  category: 'Combine',
  version: '1.0'
});
addFuncDef({
  name: 'removeBetweenPercentile',
  category: 'Filter Series',
  params: [{
    name: 'n',
    type: 'int'
  }],
  defaultParams: [95],
  version: '1.0'
});
addFuncDef({
  name: 'removeEmptySeries',
  category: 'Filter Series',
  version: '1.0'
});
addFuncDef({
  name: 'squareRoot',
  category: 'Transform',
  version: '1.0'
});
addFuncDef({
  name: 'timeSlice',
  category: 'Transform',
  params: [{
    name: 'startSliceAt',
    type: 'select',
    options: ['-1h', '-6h', '-12h', '-1d', '-2d', '-7d', '-14d', '-30d']
  }, {
    name: 'endSliceAt',
    type: 'select',
    options: ['-1h', '-6h', '-12h', '-1d', '-2d', '-7d', '-14d', '-30d'],
    optional: true
  }],
  defaultParams: ['-1h'],
  version: '1.0'
});
addFuncDef({
  name: 'weightedAverage',
  category: 'Combine',
  params: [{
    name: 'other',
    type: 'value_or_series',
    optional: true
  }, {
    name: 'node',
    type: 'int',
    options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]
  }],
  defaultParams: ['#A', 4],
  version: '1.0'
});
addFuncDef({
  name: 'seriesByTag',
  category: 'Special',
  params: [{
    name: 'tagExpression',
    type: 'string',
    multiple: true
  }],
  version: '1.1'
});
addFuncDef({
  name: 'groupByTags',
  category: 'Combine',
  params: [{
    name: 'function',
    type: 'string',
    options: ['sum', 'avg', 'maxSeries']
  }, {
    name: 'tag',
    type: 'string',
    multiple: true
  }],
  defaultParams: ['sum', 'tag'],
  version: '1.1'
});
addFuncDef({
  name: 'aliasByTags',
  category: 'Alias',
  params: [{
    name: 'tag',
    type: 'string',
    multiple: true
  }],
  defaultParams: ['tag'],
  version: '1.1'
});

function isVersionRelatedFunction(obj, graphiteVersion) {
  return !obj.version || Object(app_core_utils_version__WEBPACK_IMPORTED_MODULE_1__["isVersionGtOrEq"])(graphiteVersion, obj.version);
}

var FuncInstance =
/*#__PURE__*/
function () {
  function FuncInstance(funcDef, options) {
    _classCallCheck(this, FuncInstance);

    this.def = funcDef;
    this.params = [];

    if (options && options.withDefaultParams) {
      this.params = funcDef.defaultParams.slice(0);
    }

    this.updateText();
  }

  _createClass(FuncInstance, [{
    key: "render",
    value: function render(metricExp, replaceVariables) {
      var _this = this;

      var str = this.def.name + '(';

      var parameters = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.params, function (value, index) {
        var paramType;

        if (index < _this.def.params.length) {
          paramType = _this.def.params[index].type;
        } else if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.last(_this.def.params), 'multiple')) {
          paramType = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.last(_this.def.params), 'type');
        } // param types that should never be quoted


        if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(['value_or_series', 'boolean', 'int', 'float', 'node'], paramType)) {
          return value;
        }

        var valueInterpolated = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString(value) ? replaceVariables(value) : value; // param types that might be quoted
        // To quote variables correctly we need to interpolate it to check if it contains a numeric or string value

        if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(['int_or_interval', 'node_or_tag'], paramType) && lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isFinite(+valueInterpolated)) {
          return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.toString(value);
        }

        return "'" + value + "'";
      }); // don't send any blank parameters to graphite


      while (parameters[parameters.length - 1] === '') {
        parameters.pop();
      }

      if (metricExp) {
        parameters.unshift(metricExp);
      }

      return str + parameters.join(', ') + ')';
    }
  }, {
    key: "_hasMultipleParamsInString",
    value: function _hasMultipleParamsInString(strValue, index) {
      if (strValue.indexOf(',') === -1) {
        return false;
      }

      if (this.def.params[index + 1] && this.def.params[index + 1].optional) {
        return true;
      }

      if (index + 1 >= this.def.params.length && lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.last(this.def.params), 'multiple')) {
        return true;
      }

      return false;
    }
  }, {
    key: "updateParam",
    value: function updateParam(strValue, index) {
      var _this2 = this;

      // handle optional parameters
      // if string contains ',' and next param is optional, split and update both
      if (this._hasMultipleParamsInString(strValue, index)) {
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(strValue.split(','), function (partVal, idx) {
          _this2.updateParam(partVal.trim(), index + idx);
        });

        return;
      }

      if (strValue === '' && (index >= this.def.params.length || this.def.params[index].optional)) {
        this.params.splice(index, 1);
      } else {
        this.params[index] = strValue;
      }

      this.updateText();
    }
  }, {
    key: "updateText",
    value: function updateText() {
      if (this.params.length === 0) {
        this.text = this.def.name + '()';
        return;
      }

      var text = this.def.name + '(';
      text += this.params.join(', ');
      text += ')';
      this.text = text;
    }
  }]);

  return FuncInstance;
}();

function createFuncInstance(funcDef, options, idx) {
  if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString(funcDef)) {
    funcDef = getFuncDef(funcDef, idx);
  }

  return new FuncInstance(funcDef, options);
}

function getFuncDef(name, idx) {
  if (!(idx || index)[name]) {
    throw {
      message: 'Method not found ' + name
    };
  }

  return (idx || index)[name];
}

function getFuncDefs(graphiteVersion, idx) {
  var funcs = {};

  lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(idx || index, function (funcDef) {
    if (isVersionRelatedFunction(funcDef, graphiteVersion)) {
      funcs[funcDef.name] = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assign({}, funcDef, {
        params: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(funcDef.params, function (param) {
          return isVersionRelatedFunction(param, graphiteVersion);
        })
      });
    }
  });

  return funcs;
} // parse response from graphite /functions endpoint into internal format


function parseFuncDefs(rawDefs) {
  var funcDefs = {};

  lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(rawDefs || {}, function (funcDef, funcName) {
    // skip graphite graph functions
    if (funcDef.group === 'Graph') {
      return;
    }

    var description = funcDef.description;

    if (description) {
      // tidy up some pydoc syntax that rst2html can't handle
      description = description.replace(/:py:func:`(.+)( <[^>]*>)?`/g, '``$1``').replace(/.. seealso:: /g, 'See also: ').replace(/.. code-block *:: *none/g, '.. code-block::');
    }

    var func = {
      name: funcDef.name,
      description: description,
      category: funcDef.group,
      params: [],
      defaultParams: [],
      fake: false
    }; // get rid of the first "seriesList" param

    if (/^seriesLists?$/.test(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(funcDef, 'params[0].type', ''))) {
      // handle functions that accept multiple seriesLists
      // we leave the param in place but mark it optional, so users can add more series if they wish
      if (funcDef.params[0].multiple) {
        funcDef.params[0].required = false; // otherwise chop off the first param, it'll be handled separately
      } else {
        funcDef.params.shift();
      } // tag function as fake

    } else {
      func.fake = true;
    }

    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(funcDef.params, function (rawParam) {
      var param = {
        name: rawParam.name,
        type: 'string',
        optional: !rawParam.required,
        multiple: !!rawParam.multiple,
        options: undefined
      };

      if (rawParam.default !== undefined) {
        func.defaultParams.push(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.toString(rawParam.default));
      } else if (rawParam.suggestions) {
        func.defaultParams.push(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.toString(rawParam.suggestions[0]));
      } else {
        func.defaultParams.push('');
      }

      if (rawParam.type === 'boolean') {
        param.type = 'boolean';
        param.options = ['true', 'false'];
      } else if (rawParam.type === 'integer') {
        param.type = 'int';
      } else if (rawParam.type === 'float') {
        param.type = 'float';
      } else if (rawParam.type === 'node') {
        param.type = 'node';
        param.options = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
      } else if (rawParam.type === 'nodeOrTag') {
        param.type = 'node_or_tag';
        param.options = ['name', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
      } else if (rawParam.type === 'intOrInterval') {
        param.type = 'int_or_interval';
      } else if (rawParam.type === 'seriesList') {
        param.type = 'value_or_series';
      }

      if (rawParam.options) {
        param.options = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(rawParam.options, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.toString);
      } else if (rawParam.suggestions) {
        param.options = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(rawParam.suggestions, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.toString);
      }

      func.params.push(param);
    });

    funcDefs[funcName] = func;
  });

  return funcDefs;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  createFuncInstance: createFuncInstance,
  getFuncDef: getFuncDef,
  getFuncDefs: getFuncDefs,
  parseFuncDefs: parseFuncDefs
});

/***/ }),

/***/ "./public/app/plugins/datasource/graphite/graphite_query.ts":
/*!******************************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/graphite_query.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GraphiteQuery; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser */ "./public/app/plugins/datasource/graphite/parser.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var GraphiteQuery =
/*#__PURE__*/
function () {
  GraphiteQuery.$inject = ["datasource", "target", "templateSrv", "scopedVars"];

  /** @ngInject */
  function GraphiteQuery(datasource, target, templateSrv, scopedVars) {
    _classCallCheck(this, GraphiteQuery);

    this.datasource = datasource;
    this.target = target;
    this.templateSrv = templateSrv;
    this.scopedVars = scopedVars;
    this.parseTarget();
    this.removeTagValue = '-- remove tag --';
  }

  _createClass(GraphiteQuery, [{
    key: "parseTarget",
    value: function parseTarget() {
      this.functions = [];
      this.segments = [];
      this.tags = [];
      this.seriesByTagUsed = false;
      this.error = null;

      if (this.target.textEditor) {
        return;
      }

      var parser = new _parser__WEBPACK_IMPORTED_MODULE_1__["Parser"](this.target.target);
      var astNode = parser.getAst();

      if (astNode === null) {
        this.checkOtherSegmentsIndex = 0;
        return;
      }

      if (astNode.type === 'error') {
        this.error = astNode.message + ' at position: ' + astNode.pos;
        this.target.textEditor = true;
        return;
      }

      try {
        this.parseTargetRecursive(astNode, null);
      } catch (err) {
        console.error('error parsing target:', err.message);
        this.error = err.message;
        this.target.textEditor = true;
      }

      this.checkOtherSegmentsIndex = this.segments.length - 1;
    }
  }, {
    key: "getSegmentPathUpTo",
    value: function getSegmentPathUpTo(index) {
      var arr = this.segments.slice(0, index);
      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.reduce(arr, function (result, segment) {
        return result ? result + '.' + segment.value : segment.value;
      }, '');
    }
  }, {
    key: "parseTargetRecursive",
    value: function parseTargetRecursive(astNode, func) {
      var _this = this;

      if (astNode === null) {
        return null;
      }

      switch (astNode.type) {
        case 'function':
          var innerFunc = this.datasource.createFuncInstance(astNode.name, {
            withDefaultParams: false
          });

          lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(astNode.params, function (param) {
            _this.parseTargetRecursive(param, innerFunc);
          });

          innerFunc.updateText();
          this.functions.push(innerFunc); // extract tags from seriesByTag function and hide function

          if (innerFunc.def.name === 'seriesByTag' && !this.seriesByTagUsed) {
            this.seriesByTagUsed = true;
            innerFunc.hidden = true;
            this.tags = this.splitSeriesByTagParams(innerFunc);
          }

          break;

        case 'series-ref':
          if (this.segments.length > 0 || this.getSeriesByTagFuncIndex() >= 0) {
            this.addFunctionParameter(func, astNode.value);
          } else {
            this.segments.push(astNode);
          }

          break;

        case 'bool':
        case 'string':
        case 'number':
          this.addFunctionParameter(func, astNode.value);
          break;

        case 'metric':
          if (this.segments.length || this.tags.length) {
            this.addFunctionParameter(func, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.join(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(astNode.segments, 'value'), '.'));
          } else {
            this.segments = astNode.segments;
          }

          break;
      }
    }
  }, {
    key: "updateSegmentValue",
    value: function updateSegmentValue(segment, index) {
      this.segments[index].value = segment.value;
    }
  }, {
    key: "addSelectMetricSegment",
    value: function addSelectMetricSegment() {
      this.segments.push({
        value: 'select metric'
      });
    }
  }, {
    key: "addFunction",
    value: function addFunction(newFunc) {
      this.functions.push(newFunc);
    }
  }, {
    key: "addFunctionParameter",
    value: function addFunctionParameter(func, value) {
      if (func.params.length >= func.def.params.length && !lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.last(func.def.params), 'multiple', false)) {
        throw {
          message: 'too many parameters for function ' + func.def.name
        };
      }

      func.params.push(value);
    }
  }, {
    key: "removeFunction",
    value: function removeFunction(func) {
      this.functions = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.without(this.functions, func);
    }
  }, {
    key: "moveFunction",
    value: function moveFunction(func, offset) {
      var index = this.functions.indexOf(func); // @ts-ignore

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.move(this.functions, index, index + offset);
    }
  }, {
    key: "updateModelTarget",
    value: function updateModelTarget(targets) {
      var _this2 = this;

      var wrapFunction = function wrapFunction(target, func) {
        return func.render(target, function (value) {
          return _this2.templateSrv.replace(value, _this2.scopedVars);
        });
      };

      if (!this.target.textEditor) {
        var metricPath = this.getSegmentPathUpTo(this.segments.length).replace(/\.select metric$/, '');
        this.target.target = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.reduce(this.functions, wrapFunction, metricPath);
      }

      this.updateRenderedTarget(this.target, targets); // loop through other queries and update targetFull as needed

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (targets || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var target = _step.value;

          if (target.refId !== this.target.refId) {
            this.updateRenderedTarget(target, targets);
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
    }
  }, {
    key: "updateRenderedTarget",
    value: function updateRenderedTarget(target, targets) {
      // render nested query
      var targetsByRefId = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keyBy(targets, 'refId'); // no references to self


      delete targetsByRefId[target.refId];
      var nestedSeriesRefRegex = /\#([A-Z])/g;
      var targetWithNestedQueries = target.target; // Use ref count to track circular references

      function countTargetRefs(targetsByRefId, refId) {
        var refCount = 0;

        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(targetsByRefId, function (t, id) {
          if (id !== refId) {
            var match = nestedSeriesRefRegex.exec(t.target);
            var count = match && match.length ? match.length - 1 : 0;
            refCount += count;
          }
        });

        targetsByRefId[refId].refCount = refCount;
      }

      lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(targetsByRefId, function (t, id) {
        countTargetRefs(targetsByRefId, id);
      }); // Keep interpolating until there are no query references
      // The reason for the loop is that the referenced query might contain another reference to another query


      while (targetWithNestedQueries.match(nestedSeriesRefRegex)) {
        var updated = targetWithNestedQueries.replace(nestedSeriesRefRegex, function (match, g1) {
          var t = targetsByRefId[g1];

          if (!t) {
            return match;
          } // no circular references


          if (t.refCount === 0) {
            delete targetsByRefId[g1];
          }

          t.refCount--;
          return t.target;
        });

        if (updated === targetWithNestedQueries) {
          break;
        }

        targetWithNestedQueries = updated;
      }

      delete target.targetFull;

      if (target.target !== targetWithNestedQueries) {
        target.targetFull = targetWithNestedQueries;
      }
    }
  }, {
    key: "splitSeriesByTagParams",
    value: function splitSeriesByTagParams(func) {
      var tagPattern = /([^\!=~]+)(\!?=~?)(.*)/;
      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.flatten(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(func.params, function (param) {
        var matches = tagPattern.exec(param);

        if (matches) {
          var tag = matches.slice(1);

          if (tag.length === 3) {
            return {
              key: tag[0],
              operator: tag[1],
              value: tag[2]
            };
          }
        }

        return [];
      }));
    }
  }, {
    key: "getSeriesByTagFuncIndex",
    value: function getSeriesByTagFuncIndex() {
      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.findIndex(this.functions, function (func) {
        return func.def.name === 'seriesByTag';
      });
    }
  }, {
    key: "getSeriesByTagFunc",
    value: function getSeriesByTagFunc() {
      var seriesByTagFuncIndex = this.getSeriesByTagFuncIndex();

      if (seriesByTagFuncIndex >= 0) {
        return this.functions[seriesByTagFuncIndex];
      } else {
        return undefined;
      }
    }
  }, {
    key: "addTag",
    value: function addTag(tag) {
      var newTagParam = renderTagString(tag);
      this.getSeriesByTagFunc().params.push(newTagParam);
      this.tags.push(tag);
    }
  }, {
    key: "removeTag",
    value: function removeTag(index) {
      this.getSeriesByTagFunc().params.splice(index, 1);
      this.tags.splice(index, 1);
    }
  }, {
    key: "updateTag",
    value: function updateTag(tag, tagIndex) {
      this.error = null;

      if (tag.key === this.removeTagValue) {
        this.removeTag(tagIndex);
        return;
      }

      var newTagParam = renderTagString(tag);
      this.getSeriesByTagFunc().params[tagIndex] = newTagParam;
      this.tags[tagIndex] = tag;
    }
  }, {
    key: "renderTagExpressions",
    value: function renderTagExpressions() {
      var excludeIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.tags, function (tagExpr, index) {
        // Don't render tag that we want to lookup
        if (index !== excludeIndex) {
          return tagExpr.key + tagExpr.operator + tagExpr.value;
        }
      }));
    }
  }]);

  return GraphiteQuery;
}();



function renderTagString(tag) {
  return tag.key + tag.operator + tag.value;
}

/***/ }),

/***/ "./public/app/plugins/datasource/graphite/lexer.ts":
/*!*********************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/lexer.ts ***!
  \*********************************************************/
/*! exports provided: Lexer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lexer", function() { return Lexer; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

 // This is auto generated from the unicode tables.
// The tables are at:
// http://www.fileformat.info/info/unicode/category/Lu/list.htm
// http://www.fileformat.info/info/unicode/category/Ll/list.htm
// http://www.fileformat.info/info/unicode/category/Lt/list.htm
// http://www.fileformat.info/info/unicode/category/Lm/list.htm
// http://www.fileformat.info/info/unicode/category/Lo/list.htm
// http://www.fileformat.info/info/unicode/category/Nl/list.htm

var unicodeLetterTable = [170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 705, 710, 721, 736, 740, 748, 748, 750, 750, 880, 884, 886, 887, 890, 893, 902, 902, 904, 906, 908, 908, 910, 929, 931, 1013, 1015, 1153, 1162, 1319, 1329, 1366, 1369, 1369, 1377, 1415, 1488, 1514, 1520, 1522, 1568, 1610, 1646, 1647, 1649, 1747, 1749, 1749, 1765, 1766, 1774, 1775, 1786, 1788, 1791, 1791, 1808, 1808, 1810, 1839, 1869, 1957, 1969, 1969, 1994, 2026, 2036, 2037, 2042, 2042, 2048, 2069, 2074, 2074, 2084, 2084, 2088, 2088, 2112, 2136, 2308, 2361, 2365, 2365, 2384, 2384, 2392, 2401, 2417, 2423, 2425, 2431, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2493, 2493, 2510, 2510, 2524, 2525, 2527, 2529, 2544, 2545, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2649, 2652, 2654, 2654, 2674, 2676, 2693, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2749, 2749, 2768, 2768, 2784, 2785, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2869, 2873, 2877, 2877, 2908, 2909, 2911, 2913, 2929, 2929, 2947, 2947, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 3001, 3024, 3024, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3123, 3125, 3129, 3133, 3133, 3160, 3161, 3168, 3169, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3261, 3261, 3294, 3294, 3296, 3297, 3313, 3314, 3333, 3340, 3342, 3344, 3346, 3386, 3389, 3389, 3406, 3406, 3424, 3425, 3450, 3455, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3585, 3632, 3634, 3635, 3648, 3654, 3713, 3714, 3716, 3716, 3719, 3720, 3722, 3722, 3725, 3725, 3732, 3735, 3737, 3743, 3745, 3747, 3749, 3749, 3751, 3751, 3754, 3755, 3757, 3760, 3762, 3763, 3773, 3773, 3776, 3780, 3782, 3782, 3804, 3805, 3840, 3840, 3904, 3911, 3913, 3948, 3976, 3980, 4096, 4138, 4159, 4159, 4176, 4181, 4186, 4189, 4193, 4193, 4197, 4198, 4206, 4208, 4213, 4225, 4238, 4238, 4256, 4293, 4304, 4346, 4348, 4348, 4352, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4744, 4746, 4749, 4752, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4822, 4824, 4880, 4882, 4885, 4888, 4954, 4992, 5007, 5024, 5108, 5121, 5740, 5743, 5759, 5761, 5786, 5792, 5866, 5870, 5872, 5888, 5900, 5902, 5905, 5920, 5937, 5952, 5969, 5984, 5996, 5998, 6000, 6016, 6067, 6103, 6103, 6108, 6108, 6176, 6263, 6272, 6312, 6314, 6314, 6320, 6389, 6400, 6428, 6480, 6509, 6512, 6516, 6528, 6571, 6593, 6599, 6656, 6678, 6688, 6740, 6823, 6823, 6917, 6963, 6981, 6987, 7043, 7072, 7086, 7087, 7104, 7141, 7168, 7203, 7245, 7247, 7258, 7293, 7401, 7404, 7406, 7409, 7424, 7615, 7680, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8305, 8305, 8319, 8319, 8336, 8348, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8473, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8493, 8495, 8505, 8508, 8511, 8517, 8521, 8526, 8526, 8544, 8584, 11264, 11310, 11312, 11358, 11360, 11492, 11499, 11502, 11520, 11557, 11568, 11621, 11631, 11631, 11648, 11670, 11680, 11686, 11688, 11694, 11696, 11702, 11704, 11710, 11712, 11718, 11720, 11726, 11728, 11734, 11736, 11742, 11823, 11823, 12293, 12295, 12321, 12329, 12337, 12341, 12344, 12348, 12353, 12438, 12445, 12447, 12449, 12538, 12540, 12543, 12549, 12589, 12593, 12686, 12704, 12730, 12784, 12799, 13312, 13312, 19893, 19893, 19968, 19968, 40907, 40907, 40960, 42124, 42192, 42237, 42240, 42508, 42512, 42527, 42538, 42539, 42560, 42606, 42623, 42647, 42656, 42735, 42775, 42783, 42786, 42888, 42891, 42894, 42896, 42897, 42912, 42921, 43002, 43009, 43011, 43013, 43015, 43018, 43020, 43042, 43072, 43123, 43138, 43187, 43250, 43255, 43259, 43259, 43274, 43301, 43312, 43334, 43360, 43388, 43396, 43442, 43471, 43471, 43520, 43560, 43584, 43586, 43588, 43595, 43616, 43638, 43642, 43642, 43648, 43695, 43697, 43697, 43701, 43702, 43705, 43709, 43712, 43712, 43714, 43714, 43739, 43741, 43777, 43782, 43785, 43790, 43793, 43798, 43808, 43814, 43816, 43822, 43968, 44002, 44032, 44032, 55203, 55203, 55216, 55238, 55243, 55291, 63744, 64045, 64048, 64109, 64112, 64217, 64256, 64262, 64275, 64279, 64285, 64285, 64287, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65136, 65140, 65142, 65276, 65313, 65338, 65345, 65370, 65382, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500, 65536, 65547, 65549, 65574, 65576, 65594, 65596, 65597, 65599, 65613, 65616, 65629, 65664, 65786, 65856, 65908, 66176, 66204, 66208, 66256, 66304, 66334, 66352, 66378, 66432, 66461, 66464, 66499, 66504, 66511, 66513, 66517, 66560, 66717, 67584, 67589, 67592, 67592, 67594, 67637, 67639, 67640, 67644, 67644, 67647, 67669, 67840, 67861, 67872, 67897, 68096, 68096, 68112, 68115, 68117, 68119, 68121, 68147, 68192, 68220, 68352, 68405, 68416, 68437, 68448, 68466, 68608, 68680, 69635, 69687, 69763, 69807, 73728, 74606, 74752, 74850, 77824, 78894, 92160, 92728, 110592, 110593, 119808, 119892, 119894, 119964, 119966, 119967, 119970, 119970, 119973, 119974, 119977, 119980, 119982, 119993, 119995, 119995, 119997, 120003, 120005, 120069, 120071, 120074, 120077, 120084, 120086, 120092, 120094, 120121, 120123, 120126, 120128, 120132, 120134, 120134, 120138, 120144, 120146, 120485, 120488, 120512, 120514, 120538, 120540, 120570, 120572, 120596, 120598, 120628, 120630, 120654, 120656, 120686, 120688, 120712, 120714, 120744, 120746, 120770, 120772, 120779, 131072, 131072, 173782, 173782, 173824, 173824, 177972, 177972, 177984, 177984, 178205, 178205, 194560, 195101];
var identifierStartTable = [];

for (var i = 0; i < 128; i++) {
  identifierStartTable[i] = i >= 48 && i <= 57 || // 0-9
  i === 36 || // $
  i === 126 || // ~
  i === 124 || // |
  i >= 65 && i <= 90 || // A-Z
  i === 95 || // _
  i === 45 || // -
  i === 42 || // *
  i === 58 || // :
  i === 91 || // templateStart [
  i === 93 || // templateEnd ]
  i === 63 || // ?
  i === 37 || // %
  i === 35 || // #
  i === 61 || // =
  i >= 97 && i <= 122; // a-z
}

var identifierPartTable = identifierStartTable;
var Lexer =
/*#__PURE__*/
function () {
  function Lexer(expression) {
    _classCallCheck(this, Lexer);

    this.input = expression;
    this.char = 1;
    this.from = 1;
  }

  _createClass(Lexer, [{
    key: "peek",
    value: function peek(i) {
      return this.input.charAt(i || 0);
    }
  }, {
    key: "skip",
    value: function skip(i) {
      i = i || 1;
      this.char += i;
      this.input = this.input.slice(i);
    }
  }, {
    key: "tokenize",
    value: function tokenize() {
      var list = [];
      var token = this.next();

      while (token) {
        list.push(token);
        token = this.next();
      }

      return list;
    }
  }, {
    key: "next",
    value: function next() {
      this.from = this.char; // Move to the next non-space character.

      if (/\s/.test(this.peek())) {
        while (/\s/.test(this.peek())) {
          this.from += 1;
          this.skip();
        }

        if (this.peek() === '') {
          // EOL
          return null;
        }
      }

      var match = this.scanStringLiteral();

      if (match) {
        return match;
      }

      match = this.scanPunctuator() || this.scanNumericLiteral() || this.scanIdentifier() || this.scanTemplateSequence();

      if (match) {
        this.skip(match.value.length);
        return match;
      } // No token could be matched, give up.


      return null;
    }
  }, {
    key: "scanTemplateSequence",
    value: function scanTemplateSequence() {
      if (this.peek() === '[' && this.peek(1) === '[') {
        return {
          type: 'templateStart',
          value: '[[',
          pos: this.char
        };
      }

      if (this.peek() === ']' && this.peek(1) === ']') {
        return {
          type: 'templateEnd',
          value: '[[',
          pos: this.char
        };
      }

      return null;
    }
    /*
     * Extract a JavaScript identifier out of the next sequence of
     * characters or return 'null' if its not possible. In addition,
     * to Identifier this method can also produce BooleanLiteral
     * (true/false) and NullLiteral (null).
     */

  }, {
    key: "scanIdentifier",
    value: function scanIdentifier() {
      var id = '';
      var index = 0;
      var type, char; // Detects any character in the Unicode categories "Uppercase
      // letter (Lu)", "Lowercase letter (Ll)", "Titlecase letter
      // (Lt)", "Modifier letter (Lm)", "Other letter (Lo)", or
      // "Letter number (Nl)".
      //
      // Both approach and unicodeLetterTable were borrowed from
      // Google's Traceur.

      function isUnicodeLetter(code) {
        for (var _i = 0; _i < unicodeLetterTable.length;) {
          if (code < unicodeLetterTable[_i++]) {
            return false;
          }

          if (code <= unicodeLetterTable[_i++]) {
            return true;
          }
        }

        return false;
      }

      function isHexDigit(str) {
        return /^[0-9a-fA-F]$/.test(str);
      }

      var readUnicodeEscapeSequence = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.bind(function () {
        index += 1;

        if (this.peek(index) !== 'u') {
          return null;
        }

        var ch1 = this.peek(index + 1);
        var ch2 = this.peek(index + 2);
        var ch3 = this.peek(index + 3);
        var ch4 = this.peek(index + 4);
        var code;

        if (isHexDigit(ch1) && isHexDigit(ch2) && isHexDigit(ch3) && isHexDigit(ch4)) {
          code = parseInt(ch1 + ch2 + ch3 + ch4, 16);

          if (isUnicodeLetter(code)) {
            index += 5;
            return "\\u" + ch1 + ch2 + ch3 + ch4;
          }

          return null;
        }

        return null;
      }, this);

      var getIdentifierStart = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.bind(function () {
        var chr = this.peek(index);
        var code = chr.charCodeAt(0);

        if (chr === '*') {
          index += 1;
          return chr;
        }

        if (code === 92) {
          return readUnicodeEscapeSequence();
        }

        if (code < 128) {
          if (identifierStartTable[code]) {
            index += 1;
            return chr;
          }

          return null;
        }

        if (isUnicodeLetter(code)) {
          index += 1;
          return chr;
        }

        return null;
      }, this);

      var getIdentifierPart = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.bind(function () {
        var chr = this.peek(index);
        var code = chr.charCodeAt(0);

        if (code === 92) {
          return readUnicodeEscapeSequence();
        }

        if (code < 128) {
          if (identifierPartTable[code]) {
            index += 1;
            return chr;
          }

          return null;
        }

        if (isUnicodeLetter(code)) {
          index += 1;
          return chr;
        }

        return null;
      }, this);

      char = getIdentifierStart();

      if (char === null) {
        return null;
      }

      id = char;

      for (;;) {
        char = getIdentifierPart();

        if (char === null) {
          break;
        }

        id += char;
      }

      switch (id) {
        case 'true':
          {
            type = 'bool';
            break;
          }

        case 'false':
          {
            type = 'bool';
            break;
          }

        default:
          type = 'identifier';
      }

      return {
        type: type,
        value: id,
        pos: this.char
      };
    }
    /*
     * Extract a numeric literal out of the next sequence of
     * characters or return 'null' if its not possible. This method
     * supports all numeric literals described in section 7.8.3
     * of the EcmaScript 5 specification.
     *
     * This method's implementation was heavily influenced by the
     * scanNumericLiteral function in the Esprima parser's source code.
     */

  }, {
    key: "scanNumericLiteral",
    value: function scanNumericLiteral() {
      var index = 0;
      var value = '';
      var length = this.input.length;
      var char = this.peek(index);
      var bad;

      function isDecimalDigit(str) {
        return /^[0-9]$/.test(str);
      }

      function isOctalDigit(str) {
        return /^[0-7]$/.test(str);
      }

      function isHexDigit(str) {
        return /^[0-9a-fA-F]$/.test(str);
      }

      function isIdentifierStart(ch) {
        return ch === '$' || ch === '_' || ch === '\\' || ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z';
      } // handle negative num literals


      if (char === '-') {
        value += char;
        index += 1;
        char = this.peek(index);
      } // Numbers must start either with a decimal digit or a point.


      if (char !== '.' && !isDecimalDigit(char)) {
        return null;
      }

      if (char !== '.') {
        value += this.peek(index);
        index += 1;
        char = this.peek(index);

        if (value === '0') {
          // Base-16 numbers.
          if (char === 'x' || char === 'X') {
            index += 1;
            value += char;

            while (index < length) {
              char = this.peek(index);

              if (!isHexDigit(char)) {
                break;
              }

              value += char;
              index += 1;
            }

            if (value.length <= 2) {
              // 0x
              return {
                type: 'number',
                value: value,
                isMalformed: true,
                pos: this.char
              };
            }

            if (index < length) {
              char = this.peek(index);

              if (isIdentifierStart(char)) {
                return null;
              }
            }

            return {
              type: 'number',
              value: value,
              base: 16,
              isMalformed: false,
              pos: this.char
            };
          } // Base-8 numbers.


          if (isOctalDigit(char)) {
            index += 1;
            value += char;
            bad = false;

            while (index < length) {
              char = this.peek(index); // Numbers like '019' (note the 9) are not valid octals
              // but we still parse them and mark as malformed.

              if (isDecimalDigit(char)) {
                bad = true;
              }

              if (!isOctalDigit(char)) {
                // if the char is a non punctuator then its not a valid number
                if (!this.isPunctuator(char)) {
                  return null;
                }

                break;
              }

              value += char;
              index += 1;
            }

            if (index < length) {
              char = this.peek(index);

              if (isIdentifierStart(char)) {
                return null;
              }
            }

            return {
              type: 'number',
              value: value,
              base: 8,
              isMalformed: bad
            };
          } // Decimal numbers that start with '0' such as '09' are illegal
          // but we still parse them and return as malformed.


          if (isDecimalDigit(char)) {
            index += 1;
            value += char;
          }
        }

        while (index < length) {
          char = this.peek(index);

          if (!isDecimalDigit(char)) {
            break;
          }

          value += char;
          index += 1;
        }
      } // Decimal digits.


      if (char === '.') {
        value += char;
        index += 1;

        while (index < length) {
          char = this.peek(index);

          if (!isDecimalDigit(char)) {
            break;
          }

          value += char;
          index += 1;
        }
      } // Exponent part.


      if (char === 'e' || char === 'E') {
        value += char;
        index += 1;
        char = this.peek(index);

        if (char === '+' || char === '-') {
          value += this.peek(index);
          index += 1;
        }

        char = this.peek(index);

        if (isDecimalDigit(char)) {
          value += char;
          index += 1;

          while (index < length) {
            char = this.peek(index);

            if (!isDecimalDigit(char)) {
              break;
            }

            value += char;
            index += 1;
          }
        } else {
          return null;
        }
      }

      if (index < length) {
        char = this.peek(index);

        if (!this.isPunctuator(char)) {
          return null;
        }
      }

      return {
        type: 'number',
        value: value,
        base: 10,
        pos: this.char,
        isMalformed: !isFinite(+value)
      };
    }
  }, {
    key: "isPunctuator",
    value: function isPunctuator(ch1) {
      switch (ch1) {
        case '.':
        case '(':
        case ')':
        case ',':
        case '{':
        case '}':
          return true;
      }

      return false;
    }
  }, {
    key: "scanPunctuator",
    value: function scanPunctuator() {
      var ch1 = this.peek();

      if (this.isPunctuator(ch1)) {
        return {
          type: ch1,
          value: ch1,
          pos: this.char
        };
      }

      return null;
    }
    /*
     * Extract a string out of the next sequence of characters and/or
     * lines or return 'null' if its not possible. Since strings can
     * span across multiple lines this method has to move the char
     * pointer.
     *
     * This method recognizes pseudo-multiline JavaScript strings:
     *
     *   var str = "hello\
     *   world";
     */

  }, {
    key: "scanStringLiteral",
    value: function scanStringLiteral() {
      var quote = this.peek(); // String must start with a quote.

      if (quote !== '"' && quote !== "'") {
        return null;
      }

      var value = '';
      this.skip();

      while (this.peek() !== quote) {
        if (this.peek() === '') {
          // End Of Line
          return {
            type: 'string',
            value: value,
            isUnclosed: true,
            quote: quote,
            pos: this.char
          };
        }

        var char = this.peek();
        var jump = 1; // A length of a jump, after we're done
        // parsing this character.

        value += char;
        this.skip(jump);
      }

      this.skip();
      return {
        type: 'string',
        value: value,
        isUnclosed: false,
        quote: quote,
        pos: this.char
      };
    }
  }]);

  return Lexer;
}();

/***/ }),

/***/ "./public/app/plugins/datasource/graphite/meta.ts":
/*!********************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/meta.ts ***!
  \********************************************************/
/*! exports provided: getRollupNotice, getRuntimeConsolidationNotice, parseSchemaRetentions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRollupNotice", function() { return getRollupNotice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRuntimeConsolidationNotice", function() { return getRuntimeConsolidationNotice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseSchemaRetentions", function() { return parseSchemaRetentions; });
// https://github.com/grafana/metrictank/blob/master/scripts/config/storage-schemas.conf#L15-L46
function toInteger(val) {
  if (val) {
    return parseInt(val, 10);
  }

  return undefined;
}

function toBooleanOrTimestamp(val) {
  if (val) {
    if (val === 'true') {
      return true;
    }

    if (val === 'false') {
      return false;
    }

    return parseInt(val, 10);
  }

  return undefined;
}

function getRollupNotice(metaList) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = metaList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var meta = _step.value;
      var archiveIndex = meta['archive-read'];

      if (archiveIndex > 0) {
        var _meta$consolidatorNo;

        var schema = parseSchemaRetentions(meta['schema-retentions']);
        var intervalString = schema[archiveIndex].interval;
        var func = ((_meta$consolidatorNo = meta['consolidator-normfetch']) !== null && _meta$consolidatorNo !== void 0 ? _meta$consolidatorNo : '').replace('Consolidator', '');
        return {
          text: "Data is rolled up, aggregated over ".concat(intervalString, " using ").concat(func, " function"),
          severity: 'info',
          inspect: 'meta'
        };
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

  return null;
}
function getRuntimeConsolidationNotice(metaList) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = metaList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var meta = _step2.value;
      var runtimeNr = meta['aggnum-rc'];

      if (runtimeNr > 0) {
        var _meta$consolidatorRc;

        var func = ((_meta$consolidatorRc = meta['consolidator-rc']) !== null && _meta$consolidatorRc !== void 0 ? _meta$consolidatorRc : '').replace('Consolidator', '');
        return {
          text: "Data is runtime consolidated, ".concat(runtimeNr, " datapoints combined using ").concat(func, " function"),
          severity: 'info',
          inspect: 'meta'
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

  return null;
}
function parseSchemaRetentions(spec) {
  if (!spec) {
    return [];
  }

  return spec.split(',').map(function (str) {
    var vals = str.split(':');
    return {
      interval: vals[0],
      retention: vals[1],
      chunkspan: vals[2],
      numchunks: toInteger(vals[3]),
      ready: toBooleanOrTimestamp(vals[4])
    };
  });
}

/***/ }),

/***/ "./public/app/plugins/datasource/graphite/module.ts":
/*!**********************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/module.ts ***!
  \**********************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/graphite/datasource.ts");
/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_ctrl */ "./public/app/plugins/datasource/graphite/query_ctrl.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _configuration_ConfigEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./configuration/ConfigEditor */ "./public/app/plugins/datasource/graphite/configuration/ConfigEditor.tsx");
/* harmony import */ var _MetricTankMetaInspector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MetricTankMetaInspector */ "./public/app/plugins/datasource/graphite/MetricTankMetaInspector.tsx");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







var AnnotationsQueryCtrl = function AnnotationsQueryCtrl() {
  _classCallCheck(this, AnnotationsQueryCtrl);
};

AnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_2__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_0__["GraphiteDatasource"]).setQueryCtrl(_query_ctrl__WEBPACK_IMPORTED_MODULE_1__["GraphiteQueryCtrl"]).setConfigEditor(_configuration_ConfigEditor__WEBPACK_IMPORTED_MODULE_3__["ConfigEditor"]).setMetadataInspector(_MetricTankMetaInspector__WEBPACK_IMPORTED_MODULE_4__["MetricTankMetaInspector"]).setAnnotationQueryCtrl(AnnotationsQueryCtrl);

/***/ }),

/***/ "./public/app/plugins/datasource/graphite/parser.ts":
/*!**********************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/parser.ts ***!
  \**********************************************************/
/*! exports provided: Parser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Parser", function() { return Parser; });
/* harmony import */ var _lexer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lexer */ "./public/app/plugins/datasource/graphite/lexer.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var Parser =
/*#__PURE__*/
function () {
  function Parser(expression) {
    _classCallCheck(this, Parser);

    this.expression = expression;
    this.lexer = new _lexer__WEBPACK_IMPORTED_MODULE_0__["Lexer"](expression);
    this.tokens = this.lexer.tokenize();
    this.index = 0;
  }

  _createClass(Parser, [{
    key: "getAst",
    value: function getAst() {
      return this.start();
    }
  }, {
    key: "start",
    value: function start() {
      try {
        return this.functionCall() || this.metricExpression();
      } catch (e) {
        return {
          type: 'error',
          message: e.message,
          pos: e.pos
        };
      }
    }
  }, {
    key: "curlyBraceSegment",
    value: function curlyBraceSegment() {
      if (this.match('identifier', '{') || this.match('{')) {
        var curlySegment = '';

        while (!this.match('') && !this.match('}')) {
          curlySegment += this.consumeToken().value;
        }

        if (!this.match('}')) {
          this.errorMark("Expected closing '}'");
        }

        curlySegment += this.consumeToken().value; // if curly segment is directly followed by identifier
        // include it in the segment

        if (this.match('identifier')) {
          curlySegment += this.consumeToken().value;
        }

        return {
          type: 'segment',
          value: curlySegment
        };
      } else {
        return null;
      }
    }
  }, {
    key: "metricSegment",
    value: function metricSegment() {
      var curly = this.curlyBraceSegment();

      if (curly) {
        return curly;
      }

      if (this.match('identifier') || this.match('number')) {
        // hack to handle float numbers in metric segments
        var parts = this.consumeToken().value.split('.');

        if (parts.length === 2) {
          this.tokens.splice(this.index, 0, {
            type: '.'
          });
          this.tokens.splice(this.index + 1, 0, {
            type: 'number',
            value: parts[1]
          });
        }

        return {
          type: 'segment',
          value: parts[0]
        };
      }

      if (!this.match('templateStart')) {
        this.errorMark('Expected metric identifier');
      }

      this.consumeToken();

      if (!this.match('identifier')) {
        this.errorMark('Expected identifier after templateStart');
      }

      var node = {
        type: 'template',
        value: this.consumeToken().value
      };

      if (!this.match('templateEnd')) {
        this.errorMark('Expected templateEnd');
      }

      this.consumeToken();
      return node;
    }
  }, {
    key: "metricExpression",
    value: function metricExpression() {
      if (!this.match('templateStart') && !this.match('identifier') && !this.match('number') && !this.match('{')) {
        return null;
      }

      var node = {
        type: 'metric',
        segments: []
      };
      node.segments.push(this.metricSegment());

      while (this.match('.')) {
        this.consumeToken();
        var segment = this.metricSegment();

        if (!segment) {
          this.errorMark('Expected metric identifier');
        }

        node.segments.push(segment);
      }

      return node;
    }
  }, {
    key: "functionCall",
    value: function functionCall() {
      if (!this.match('identifier', '(')) {
        return null;
      }

      var node = {
        type: 'function',
        name: this.consumeToken().value
      }; // consume left parenthesis

      this.consumeToken();
      node.params = this.functionParameters();

      if (!this.match(')')) {
        this.errorMark('Expected closing parenthesis');
      }

      this.consumeToken();
      return node;
    }
  }, {
    key: "boolExpression",
    value: function boolExpression() {
      if (!this.match('bool')) {
        return null;
      }

      return {
        type: 'bool',
        value: this.consumeToken().value === 'true'
      };
    }
  }, {
    key: "functionParameters",
    value: function functionParameters() {
      if (this.match(')') || this.match('')) {
        return [];
      }

      var param = this.functionCall() || this.numericLiteral() || this.seriesRefExpression() || this.boolExpression() || this.metricExpression() || this.stringLiteral();

      if (!this.match(',')) {
        return [param];
      }

      this.consumeToken();
      return [param].concat(this.functionParameters());
    }
  }, {
    key: "seriesRefExpression",
    value: function seriesRefExpression() {
      if (!this.match('identifier')) {
        return null;
      }

      var value = this.tokens[this.index].value;

      if (!value.match(/\#[A-Z]/)) {
        return null;
      }

      var token = this.consumeToken();
      return {
        type: 'series-ref',
        value: token.value
      };
    }
  }, {
    key: "numericLiteral",
    value: function numericLiteral() {
      if (!this.match('number')) {
        return null;
      }

      return {
        type: 'number',
        value: parseFloat(this.consumeToken().value)
      };
    }
  }, {
    key: "stringLiteral",
    value: function stringLiteral() {
      if (!this.match('string')) {
        return null;
      }

      var token = this.consumeToken();

      if (token.isUnclosed) {
        throw {
          message: 'Unclosed string parameter',
          pos: token.pos
        };
      }

      return {
        type: 'string',
        value: token.value
      };
    }
  }, {
    key: "errorMark",
    value: function errorMark(text) {
      var currentToken = this.tokens[this.index];
      var type = currentToken ? currentToken.type : 'end of string';
      throw {
        message: text + ' instead found ' + type,
        pos: currentToken ? currentToken.pos : this.lexer.char
      };
    } // returns token value and incre

  }, {
    key: "consumeToken",
    value: function consumeToken() {
      this.index++;
      return this.tokens[this.index - 1];
    }
  }, {
    key: "matchToken",
    value: function matchToken(type, index) {
      var token = this.tokens[this.index + index];
      return token === undefined && type === '' || token && token.type === type;
    }
  }, {
    key: "match",
    value: function match(token1, token2) {
      return this.matchToken(token1, 0) && (!token2 || this.matchToken(token2, 1));
    }
  }]);

  return Parser;
}();

/***/ }),

/***/ "./public/app/plugins/datasource/graphite/query_ctrl.ts":
/*!**************************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/query_ctrl.ts ***!
  \**************************************************************/
/*! exports provided: GraphiteQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphiteQueryCtrl", function() { return GraphiteQueryCtrl; });
/* harmony import */ var _add_graphite_func__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add_graphite_func */ "./public/app/plugins/datasource/graphite/add_graphite_func.ts");
/* harmony import */ var _func_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./func_editor */ "./public/app/plugins/datasource/graphite/func_editor.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _graphite_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./graphite_query */ "./public/app/plugins/datasource/graphite/graphite_query.ts");
/* harmony import */ var app_plugins_sdk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/plugins/sdk */ "./public/app/plugins/sdk.ts");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var app_core_utils_promiseToDigest__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/utils/promiseToDigest */ "./public/app/core/utils/promiseToDigest.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var GRAPHITE_TAG_OPERATORS = ['=', '!=', '=~', '!=~'];
var TAG_PREFIX = 'tag: ';
var GraphiteQueryCtrl =
/*#__PURE__*/
function (_QueryCtrl) {
  GraphiteQueryCtrl.$inject = ["$scope", "$injector", "uiSegmentSrv", "templateSrv", "$timeout"];

  _inherits(GraphiteQueryCtrl, _QueryCtrl);

  /** @ngInject */
  function GraphiteQueryCtrl($scope, $injector, uiSegmentSrv, templateSrv, $timeout) {
    var _this;

    _classCallCheck(this, GraphiteQueryCtrl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GraphiteQueryCtrl).call(this, $scope, $injector));
    _this.uiSegmentSrv = uiSegmentSrv;
    _this.templateSrv = templateSrv;
    _this.supportsTags = _this.datasource.supportsTags;
    _this.paused = false;
    _this.target.target = _this.target.target || '';

    _this.datasource.waitForFuncDefsLoaded().then(function () {
      _this.queryModel = new _graphite_query__WEBPACK_IMPORTED_MODULE_3__["default"](_this.datasource, _this.target, templateSrv);

      _this.buildSegments(false);
    });

    _this.removeTagValue = '-- remove tag --';
    return _this;
  }

  _createClass(GraphiteQueryCtrl, [{
    key: "parseTarget",
    value: function parseTarget() {
      this.queryModel.parseTarget();
      this.buildSegments();
    }
  }, {
    key: "toggleEditorMode",
    value: function toggleEditorMode() {
      this.target.textEditor = !this.target.textEditor;
      this.parseTarget();
    }
  }, {
    key: "buildSegments",
    value: function buildSegments() {
      var _this2 = this;

      var modifyLastSegment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.segments = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(this.queryModel.segments, function (segment) {
        return _this2.uiSegmentSrv.newSegment(segment);
      });
      var checkOtherSegmentsIndex = this.queryModel.checkOtherSegmentsIndex || 0;
      Object(app_core_utils_promiseToDigest__WEBPACK_IMPORTED_MODULE_6__["promiseToDigest"])(this.$scope)(this.checkOtherSegments(checkOtherSegmentsIndex, modifyLastSegment));

      if (this.queryModel.seriesByTagUsed) {
        this.fixTagSegments();
      }
    }
  }, {
    key: "addSelectMetricSegment",
    value: function addSelectMetricSegment() {
      this.queryModel.addSelectMetricSegment();
      this.segments.push(this.uiSegmentSrv.newSelectMetric());
    }
  }, {
    key: "checkOtherSegments",
    value: function checkOtherSegments(fromIndex) {
      var _this3 = this;

      var modifyLastSegment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (this.queryModel.segments.length === 1 && this.queryModel.segments[0].type === 'series-ref') {
        return Promise.resolve();
      }

      if (fromIndex === 0) {
        this.addSelectMetricSegment();
        return Promise.resolve();
      }

      var path = this.queryModel.getSegmentPathUpTo(fromIndex + 1);

      if (path === '') {
        return Promise.resolve();
      }

      return this.datasource.metricFindQuery(path).then(function (segments) {
        if (segments.length === 0) {
          if (path !== '' && modifyLastSegment) {
            _this3.queryModel.segments = _this3.queryModel.segments.splice(0, fromIndex);
            _this3.segments = _this3.segments.splice(0, fromIndex);

            _this3.addSelectMetricSegment();
          }
        } else if (segments[0].expandable) {
          if (_this3.segments.length === fromIndex) {
            _this3.addSelectMetricSegment();
          } else {
            return _this3.checkOtherSegments(fromIndex + 1);
          }
        }
      }).catch(function (err) {
        app_core_app_events__WEBPACK_IMPORTED_MODULE_5__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_7__["AppEvents"].alertError, ['Error', err]);
      });
    }
  }, {
    key: "setSegmentFocus",
    value: function setSegmentFocus(segmentIndex) {
      lodash__WEBPACK_IMPORTED_MODULE_2___default.a.each(this.segments, function (segment, index) {
        segment.focus = segmentIndex === index;
      });
    }
  }, {
    key: "getAltSegments",
    value: function getAltSegments(index, prefix) {
      var _this4 = this;

      var query = prefix && prefix.length > 0 ? '*' + prefix + '*' : '*';

      if (index > 0) {
        query = this.queryModel.getSegmentPathUpTo(index) + '.' + query;
      }

      var options = {
        range: this.panelCtrl.range,
        requestId: 'get-alt-segments'
      };
      return this.datasource.metricFindQuery(query, options).then(function (segments) {
        var altSegments = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(segments, function (segment) {
          return _this4.uiSegmentSrv.newSegment({
            value: segment.text,
            expandable: segment.expandable
          });
        });

        if (index > 0 && altSegments.length === 0) {
          return altSegments;
        } // add query references


        if (index === 0) {
          lodash__WEBPACK_IMPORTED_MODULE_2___default.a.eachRight(_this4.panelCtrl.panel.targets, function (target) {
            if (target.refId === _this4.queryModel.target.refId) {
              return;
            }

            altSegments.unshift(_this4.uiSegmentSrv.newSegment({
              type: 'series-ref',
              value: '#' + target.refId,
              expandable: false
            }));
          });
        } // add template variables


        lodash__WEBPACK_IMPORTED_MODULE_2___default.a.eachRight(_this4.templateSrv.getVariables(), function (variable) {
          altSegments.unshift(_this4.uiSegmentSrv.newSegment({
            type: 'template',
            value: '$' + variable.name,
            expandable: true
          }));
        }); // add wildcard option


        altSegments.unshift(_this4.uiSegmentSrv.newSegment('*'));

        if (_this4.supportsTags && index === 0) {
          _this4.removeTaggedEntry(altSegments);

          return _this4.addAltTagSegments(prefix, altSegments);
        } else {
          return altSegments;
        }
      }).catch(function (err) {
        return [];
      });
    }
  }, {
    key: "addAltTagSegments",
    value: function addAltTagSegments(prefix, altSegments) {
      return this.getTagsAsSegments(prefix).then(function (tagSegments) {
        tagSegments = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(tagSegments, function (segment) {
          segment.value = TAG_PREFIX + segment.value;
          return segment;
        });
        return altSegments.concat.apply(altSegments, _toConsumableArray(tagSegments));
      });
    }
  }, {
    key: "removeTaggedEntry",
    value: function removeTaggedEntry(altSegments) {
      altSegments = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.remove(altSegments, function (s) {
        return s.value === '_tagged';
      });
    }
  }, {
    key: "segmentValueChanged",
    value: function segmentValueChanged(segment, segmentIndex) {
      var _this5 = this;

      this.error = null;
      this.queryModel.updateSegmentValue(segment, segmentIndex);

      if (this.queryModel.functions.length > 0 && this.queryModel.functions[0].def.fake) {
        this.queryModel.functions = [];
      }

      if (segment.type === 'tag') {
        var tag = removeTagPrefix(segment.value);
        this.pause();
        this.addSeriesByTagFunc(tag);
        return null;
      }

      if (segment.expandable) {
        return Object(app_core_utils_promiseToDigest__WEBPACK_IMPORTED_MODULE_6__["promiseToDigest"])(this.$scope)(this.checkOtherSegments(segmentIndex + 1).then(function () {
          _this5.setSegmentFocus(segmentIndex + 1);

          _this5.targetChanged();
        }));
      } else {
        this.spliceSegments(segmentIndex + 1);
      }

      this.setSegmentFocus(segmentIndex + 1);
      this.targetChanged();
      return null;
    }
  }, {
    key: "spliceSegments",
    value: function spliceSegments(index) {
      this.segments = this.segments.splice(0, index);
      this.queryModel.segments = this.queryModel.segments.splice(0, index);
    }
  }, {
    key: "emptySegments",
    value: function emptySegments() {
      this.queryModel.segments = [];
      this.segments = [];
    }
  }, {
    key: "targetTextChanged",
    value: function targetTextChanged() {
      this.updateModelTarget();
      this.refresh();
    }
  }, {
    key: "updateModelTarget",
    value: function updateModelTarget() {
      this.queryModel.updateModelTarget(this.panelCtrl.panel.targets);
    }
  }, {
    key: "targetChanged",
    value: function targetChanged() {
      if (this.queryModel.error) {
        return;
      }

      var oldTarget = this.queryModel.target.target;
      this.updateModelTarget();

      if (this.queryModel.target !== oldTarget && !this.paused) {
        this.panelCtrl.refresh();
      }
    }
  }, {
    key: "addFunction",
    value: function addFunction(funcDef) {
      var newFunc = this.datasource.createFuncInstance(funcDef, {
        withDefaultParams: true
      });
      newFunc.added = true;
      this.queryModel.addFunction(newFunc);
      this.smartlyHandleNewAliasByNode(newFunc);

      if (this.segments.length === 1 && this.segments[0].fake) {
        this.emptySegments();
      }

      if (!newFunc.params.length && newFunc.added) {
        this.targetChanged();
      }

      if (newFunc.def.name === 'seriesByTag') {
        this.parseTarget();
      }
    }
  }, {
    key: "removeFunction",
    value: function removeFunction(func) {
      this.queryModel.removeFunction(func);
      this.targetChanged();
    }
  }, {
    key: "moveFunction",
    value: function moveFunction(func, offset) {
      this.queryModel.moveFunction(func, offset);
      this.targetChanged();
    }
  }, {
    key: "addSeriesByTagFunc",
    value: function addSeriesByTagFunc(tag) {
      var newFunc = this.datasource.createFuncInstance('seriesByTag', {
        withDefaultParams: false
      });
      var tagParam = "".concat(tag, "=");
      newFunc.params = [tagParam];
      this.queryModel.addFunction(newFunc);
      newFunc.added = true;
      this.emptySegments();
      this.targetChanged();
      this.parseTarget();
    }
  }, {
    key: "smartlyHandleNewAliasByNode",
    value: function smartlyHandleNewAliasByNode(func) {
      if (func.def.name !== 'aliasByNode') {
        return;
      }

      for (var i = 0; i < this.segments.length; i++) {
        if (this.segments[i].value.indexOf('*') >= 0) {
          func.params[0] = i;
          func.added = false;
          this.targetChanged();
          return;
        }
      }
    }
  }, {
    key: "getAllTags",
    value: function getAllTags() {
      var _this6 = this;

      return this.datasource.getTags().then(function (values) {
        var altTags = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(values, 'text');

        altTags.splice(0, 0, _this6.removeTagValue);
        return mapToDropdownOptions(altTags);
      });
    }
  }, {
    key: "getTags",
    value: function getTags(index, tagPrefix) {
      var _this7 = this;

      var tagExpressions = this.queryModel.renderTagExpressions(index);
      return this.datasource.getTagsAutoComplete(tagExpressions, tagPrefix).then(function (values) {
        var altTags = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(values, 'text');

        altTags.splice(0, 0, _this7.removeTagValue);
        return mapToDropdownOptions(altTags);
      });
    }
  }, {
    key: "getTagsAsSegments",
    value: function getTagsAsSegments(tagPrefix) {
      var _this8 = this;

      var tagExpressions = this.queryModel.renderTagExpressions();
      return this.datasource.getTagsAutoComplete(tagExpressions, tagPrefix).then(function (values) {
        return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(values, function (val) {
          return _this8.uiSegmentSrv.newSegment({
            value: val.text,
            type: 'tag',
            expandable: false
          });
        });
      });
    }
  }, {
    key: "getTagOperators",
    value: function getTagOperators() {
      return mapToDropdownOptions(GRAPHITE_TAG_OPERATORS);
    }
  }, {
    key: "getAllTagValues",
    value: function getAllTagValues(tag) {
      var tagKey = tag.key;
      return this.datasource.getTagValues(tagKey).then(function (values) {
        var altValues = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(values, 'text');

        return mapToDropdownOptions(altValues);
      });
    }
  }, {
    key: "getTagValues",
    value: function getTagValues(tag, index, valuePrefix) {
      var _this9 = this;

      var tagExpressions = this.queryModel.renderTagExpressions(index);
      var tagKey = tag.key;
      return this.datasource.getTagValuesAutoComplete(tagExpressions, tagKey, valuePrefix).then(function (values) {
        var altValues = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(values, 'text'); // Add template variables as additional values


        lodash__WEBPACK_IMPORTED_MODULE_2___default.a.eachRight(_this9.templateSrv.getVariables(), function (variable) {
          altValues.push('${' + variable.name + ':regex}');
        });

        return mapToDropdownOptions(altValues);
      });
    }
  }, {
    key: "tagChanged",
    value: function tagChanged(tag, tagIndex) {
      this.queryModel.updateTag(tag, tagIndex);
      this.targetChanged();
    }
  }, {
    key: "addNewTag",
    value: function addNewTag(segment) {
      var newTagKey = segment.value;
      var newTag = {
        key: newTagKey,
        operator: '=',
        value: ''
      };
      this.queryModel.addTag(newTag);
      this.targetChanged();
      this.fixTagSegments();
    }
  }, {
    key: "removeTag",
    value: function removeTag(index) {
      this.queryModel.removeTag(index);
      this.targetChanged();
    }
  }, {
    key: "fixTagSegments",
    value: function fixTagSegments() {
      // Adding tag with the same name as just removed works incorrectly if single segment is used (instead of array)
      this.addTagSegments = [this.uiSegmentSrv.newPlusButton()];
    }
  }, {
    key: "showDelimiter",
    value: function showDelimiter(index) {
      return index !== this.queryModel.tags.length - 1;
    }
  }, {
    key: "pause",
    value: function pause() {
      this.paused = true;
    }
  }, {
    key: "unpause",
    value: function unpause() {
      this.paused = false;
      this.panelCtrl.refresh();
    }
  }, {
    key: "getCollapsedText",
    value: function getCollapsedText() {
      return this.target.target;
    }
  }]);

  return GraphiteQueryCtrl;
}(app_plugins_sdk__WEBPACK_IMPORTED_MODULE_4__["QueryCtrl"]);
GraphiteQueryCtrl.templateUrl = 'partials/query.editor.html';

function mapToDropdownOptions(results) {
  return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(results, function (value) {
    return {
      text: value,
      value: value
    };
  });
}

function removeTagPrefix(value) {
  return value.replace(TAG_PREFIX, '');
}

/***/ }),

/***/ "./public/app/plugins/datasource/graphite/types.ts":
/*!*********************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/types.ts ***!
  \*********************************************************/
/*! exports provided: GraphiteType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphiteType", function() { return GraphiteType; });
var GraphiteType;

(function (GraphiteType) {
  GraphiteType["Default"] = "default";
  GraphiteType["Metrictank"] = "metrictank";
})(GraphiteType || (GraphiteType = {}));

/***/ })

}]);
//# sourceMappingURL=graphitePlugin.1ebdc265fc3bd7452fcd.js.map