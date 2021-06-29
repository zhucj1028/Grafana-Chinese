(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~DataSourceDashboards~DataSourceSettingsPage~DataSourcesListPage~NewDataSourcePage"],{

/***/ "./public/app/features/datasources/state/actions.ts":
/*!**********************************************************!*\
  !*** ./public/app/features/datasources/state/actions.ts ***!
  \**********************************************************/
/*! exports provided: initDataSourceSettings, testDataSource, loadDataSources, loadDataSource, addDataSource, loadDataSourcePlugins, updateDataSource, deleteDataSource, nameExits, findNewName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initDataSourceSettings", function() { return initDataSourceSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testDataSource", function() { return testDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDataSources", function() { return loadDataSources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDataSource", function() { return loadDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDataSource", function() { return addDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDataSourcePlugins", function() { return loadDataSourcePlugins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateDataSource", function() { return updateDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteDataSource", function() { return deleteDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nameExits", function() { return nameExits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findNewName", function() { return findNewName; });
/* harmony import */ var _core_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/config */ "./public/app/core/config.ts");
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");
/* harmony import */ var app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/features/plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var _navModel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navModel */ "./public/app/features/datasources/state/navModel.ts");
/* harmony import */ var app_features_plugins_PluginSettingsCache__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/features/plugins/PluginSettingsCache */ "./public/app/features/plugins/PluginSettingsCache.ts");
/* harmony import */ var app_features_plugins_plugin_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/features/plugins/plugin_loader */ "./public/app/features/plugins/plugin_loader.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reducers */ "./public/app/features/datasources/state/reducers.ts");
/* harmony import */ var _buildCategories__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./buildCategories */ "./public/app/features/datasources/state/buildCategories.ts");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./selectors */ "./public/app/features/datasources/state/selectors.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }











var initDataSourceSettings = function initDataSourceSettings(pageId) {
  var dependencies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    loadDataSource: loadDataSource,
    getDataSource: _selectors__WEBPACK_IMPORTED_MODULE_9__["getDataSource"],
    getDataSourceMeta: _selectors__WEBPACK_IMPORTED_MODULE_9__["getDataSourceMeta"],
    importDataSourcePlugin: app_features_plugins_plugin_loader__WEBPACK_IMPORTED_MODULE_6__["importDataSourcePlugin"]
  };
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dispatch, getState) {
        var dataSource, dataSourceMeta, importedPlugin;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!isNaN(pageId)) {
                  _context.next = 3;
                  break;
                }

                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_7__["initDataSourceSettingsFailed"])(new Error('Invalid ID')));
                return _context.abrupt("return");

              case 3:
                _context.prev = 3;
                _context.next = 6;
                return dispatch(dependencies.loadDataSource(pageId));

              case 6:
                if (!getState().dataSourceSettings.plugin) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return");

              case 8:
                dataSource = dependencies.getDataSource(getState().dataSources, pageId);
                dataSourceMeta = dependencies.getDataSourceMeta(getState().dataSources, dataSource.type);
                _context.next = 12;
                return dependencies.importDataSourcePlugin(dataSourceMeta);

              case 12:
                importedPlugin = _context.sent;
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_7__["initDataSourceSettingsSucceeded"])(importedPlugin));
                _context.next = 20;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](3);
                console.error('导入插件模块失败', _context.t0);
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_7__["initDataSourceSettingsFailed"])(_context.t0));

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 16]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};
var testDataSource = function testDataSource(dataSourceName) {
  var dependencies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    getDatasourceSrv: app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_2__["getDatasourceSrv"],
    getBackendSrv: app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"]
  };
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(dispatch, getState) {
        var dsApi;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return dependencies.getDatasourceSrv().get(dataSourceName);

              case 2:
                dsApi = _context3.sent;

                if (dsApi.testDatasource) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return");

              case 5:
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_7__["testDataSourceStarting"])());
                dependencies.getBackendSrv().withNoBackendCache(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee2() {
                  var result, message;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.prev = 0;
                          _context2.next = 3;
                          return dsApi.testDatasource();

                        case 3:
                          result = _context2.sent;
                          dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_7__["testDataSourceSucceeded"])(result));
                          _context2.next = 12;
                          break;

                        case 7:
                          _context2.prev = 7;
                          _context2.t0 = _context2["catch"](0);
                          message = '';

                          if (_context2.t0.statusText) {
                            message = 'HTTP Error ' + _context2.t0.statusText;
                          } else {
                            message = _context2.t0.message;
                          }

                          dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_7__["testDataSourceFailed"])({
                            message: message
                          }));

                        case 12:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, null, [[0, 7]]);
                })));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
};
function loadDataSources() {
  return (
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(dispatch) {
        var response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get('/api/datasources');

              case 2:
                response = _context4.sent;
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_7__["dataSourcesLoaded"])(response));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x5) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
}
function loadDataSource(id) {
  return (
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(dispatch) {
        var dataSource, pluginInfo, plugin;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get("/api/datasources/".concat(id));

              case 2:
                dataSource = _context5.sent;
                _context5.next = 5;
                return Object(app_features_plugins_PluginSettingsCache__WEBPACK_IMPORTED_MODULE_5__["getPluginSettings"])(dataSource.type);

              case 5:
                pluginInfo = _context5.sent;
                _context5.next = 8;
                return Object(app_features_plugins_plugin_loader__WEBPACK_IMPORTED_MODULE_6__["importDataSourcePlugin"])(pluginInfo);

              case 8:
                plugin = _context5.sent;
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_7__["dataSourceLoaded"])(dataSource));
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_7__["dataSourceMetaLoaded"])(pluginInfo));
                dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateNavIndex"])(Object(_navModel__WEBPACK_IMPORTED_MODULE_4__["buildNavModel"])(dataSource, plugin)));

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x6) {
        return _ref5.apply(this, arguments);
      };
    }()
  );
}
function addDataSource(plugin) {
  return (
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(dispatch, getStore) {
        var dataSources, newInstance, result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return dispatch(loadDataSources());

              case 2:
                dataSources = getStore().dataSources.dataSources;
                newInstance = {
                  name: plugin.name,
                  type: plugin.id,
                  access: 'proxy',
                  isDefault: dataSources.length === 0
                };

                if (nameExits(dataSources, newInstance.name)) {
                  newInstance.name = findNewName(dataSources, newInstance.name);
                }

                _context6.next = 7;
                return Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post('/api/datasources', newInstance);

              case 7:
                result = _context6.sent;
                dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateLocation"])({
                  path: "/datasources/edit/".concat(result.id)
                }));

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x7, _x8) {
        return _ref6.apply(this, arguments);
      };
    }()
  );
}
function loadDataSourcePlugins() {
  return (
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(dispatch) {
        var plugins, categories;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_7__["dataSourcePluginsLoad"])());
                _context7.next = 3;
                return Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get('/api/plugins', {
                  enabled: 1,
                  type: 'datasource'
                });

              case 3:
                plugins = _context7.sent;
                categories = Object(_buildCategories__WEBPACK_IMPORTED_MODULE_8__["buildCategories"])(plugins);
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_7__["dataSourcePluginsLoaded"])({
                  plugins: plugins,
                  categories: categories
                }));

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x9) {
        return _ref7.apply(this, arguments);
      };
    }()
  );
}
function updateDataSource(dataSource) {
  return (
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(dispatch) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().put("/api/datasources/".concat(dataSource.id), dataSource);

              case 2:
                _context8.next = 4;
                return updateFrontendSettings();

              case 4:
                return _context8.abrupt("return", dispatch(loadDataSource(dataSource.id)));

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      return function (_x10) {
        return _ref8.apply(this, arguments);
      };
    }()
  );
}
function deleteDataSource() {
  return (
    /*#__PURE__*/
    function () {
      var _ref9 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(dispatch, getStore) {
        var dataSource;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                dataSource = getStore().dataSources.dataSource;
                _context9.next = 3;
                return Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().delete("/api/datasources/".concat(dataSource.id));

              case 3:
                _context9.next = 5;
                return updateFrontendSettings();

              case 5:
                dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateLocation"])({
                  path: '/datasources'
                }));

              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      return function (_x11, _x12) {
        return _ref9.apply(this, arguments);
      };
    }()
  );
}
function nameExits(dataSources, name) {
  return dataSources.filter(function (dataSource) {
    return dataSource.name.toLowerCase() === name.toLowerCase();
  }).length > 0;
}
function findNewName(dataSources, name) {
  // Need to loop through current data sources to make sure
  // the name doesn't exist
  while (nameExits(dataSources, name)) {
    // If there's a duplicate name that doesn't end with '-x'
    // we can add -1 to the name and be done.
    if (!nameHasSuffix(name)) {
      name = "".concat(name, "-1");
    } else {
      // if there's a duplicate name that ends with '-x'
      // we can try to increment the last digit until the name is unique
      // remove the 'x' part and replace it with the new number
      name = "".concat(getNewName(name)).concat(incrementLastDigit(getLastDigit(name)));
    }
  }

  return name;
}

function updateFrontendSettings() {
  return Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get('/api/frontend/settings').then(function (settings) {
    _core_config__WEBPACK_IMPORTED_MODULE_0__["default"].datasources = settings.datasources;
    _core_config__WEBPACK_IMPORTED_MODULE_0__["default"].defaultDatasource = settings.defaultDatasource;
    Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_2__["getDatasourceSrv"])().init();
  });
}

function nameHasSuffix(name) {
  return name.endsWith('-', name.length - 1);
}

function getLastDigit(name) {
  return parseInt(name.slice(-1), 10);
}

function incrementLastDigit(digit) {
  return isNaN(digit) ? 1 : digit + 1;
}

function getNewName(name) {
  return name.slice(0, name.length - 1);
}

/***/ }),

/***/ "./public/app/features/datasources/state/buildCategories.ts":
/*!******************************************************************!*\
  !*** ./public/app/features/datasources/state/buildCategories.ts ***!
  \******************************************************************/
/*! exports provided: buildCategories */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildCategories", function() { return buildCategories; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");

function buildCategories(plugins) {
  var categories = [{
    id: 'tsdb',
    title: '时间序列数据库',
    plugins: []
  }, {
    id: 'logging',
    title: '记录和文档数据库',
    plugins: []
  }, {
    id: 'tracing',
    title: '分布式跟踪',
    plugins: []
  }, {
    id: 'sql',
    title: 'SQL',
    plugins: []
  }, {
    id: 'cloud',
    title: '云',
    plugins: []
  }, {
    id: 'enterprise',
    title: '企业插件',
    plugins: []
  }, {
    id: 'other',
    title: '其他',
    plugins: []
  }].filter(function (item) {
    return item;
  });
  var categoryIndex = {};
  var pluginIndex = {};
  var enterprisePlugins = getEnterprisePhantomPlugins(); // build indices

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = categories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var category = _step.value;
      categoryIndex[category.id] = category;
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

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop = function _loop() {
      var plugin = _step2.value;

      // Force category for enterprise plugins
      if (enterprisePlugins.find(function (item) {
        return item.id === plugin.id;
      })) {
        plugin.category = 'enterprise';
      } // Fix link name


      if (plugin.info.links) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = plugin.info.links[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var link = _step4.value;
            link.name = '了解更多';
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
      }

      var category = categories.find(function (item) {
        return item.id === plugin.category;
      }) || categoryIndex['other'];
      category.plugins.push(plugin); // add to plugin index

      pluginIndex[plugin.id] = plugin;
    };

    for (var _iterator2 = plugins[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop();
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

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = categories[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _category = _step3.value;

      // add phantom plugin
      if (_category.id === 'cloud') {
        _category.plugins.push(getGrafanaCloudPhantomPlugin());
      } // add phantom plugins


      if (_category.id === 'enterprise') {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = enterprisePlugins[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var plugin = _step5.value;

            if (!pluginIndex[plugin.id]) {
              _category.plugins.push(plugin);
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
      }

      sortPlugins(_category.plugins);
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

  return categories;
}

function sortPlugins(plugins) {
  var sortingRules = {
    prometheus: 100,
    graphite: 95,
    loki: 90,
    mysql: 80,
    jaeger: 100,
    postgres: 79,
    gcloud: -1
  };
  plugins.sort(function (a, b) {
    var aSort = sortingRules[a.id] || 0;
    var bSort = sortingRules[b.id] || 0;

    if (aSort > bSort) {
      return -1;
    }

    if (aSort < bSort) {
      return 1;
    }

    return a.name > b.name ? -1 : 1;
  });
}

function getEnterprisePhantomPlugins() {
  return [getPhantomPlugin({
    id: 'grafana-splunk-datasource',
    name: 'Splunk',
    description: '可视化和浏览Splunk日志',
    imgUrl: 'public/img/plugins/splunk_logo_128.png'
  }), getPhantomPlugin({
    id: 'grafana-oracle-datasource',
    name: 'Oracle',
    description: '可视化和探索Oracle SQL',
    imgUrl: 'public/img/plugins/oracle.png'
  }), getPhantomPlugin({
    id: 'grafana-dynatrace-datasource',
    name: 'Dynatrace',
    description: '可视化并浏览Dynatrace数据',
    imgUrl: 'public/img/plugins/dynatrace.png'
  }), getPhantomPlugin({
    id: 'grafana-servicenow-datasource',
    description: 'ServiceNow集成和数据源',
    name: 'ServiceNow',
    imgUrl: 'public/img/plugins/servicenow.svg'
  }), getPhantomPlugin({
    id: 'grafana-datadog-datasource',
    description: 'DataDog集成和数据源',
    name: 'DataDog',
    imgUrl: 'public/img/plugins/datadog.png'
  }), getPhantomPlugin({
    id: 'grafana-newrelic-datasource',
    description: '新的Relic集成和数据源',
    name: 'New Relic',
    imgUrl: 'public/img/plugins/newrelic.svg'
  }), getPhantomPlugin({
    id: 'dlopes7-appdynamics-datasource',
    description: 'AppDynamics集成和数据源',
    name: 'AppDynamics',
    imgUrl: 'public/img/plugins/appdynamics.svg'
  })];
}

function getGrafanaCloudPhantomPlugin() {
  return {
    id: 'gcloud',
    name: 'Grafana Cloud',
    type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["PluginType"].datasource,
    module: 'phantom',
    baseUrl: '',
    info: {
      description: '托管石墨，普罗米修斯和洛基',
      logos: {
        small: 'public/img/grafana_icon.svg',
        large: 'asd'
      },
      author: {
        name: 'Grafana Labs'
      },
      links: [{
        url: 'https://grafana.com/products/cloud/',
        name: '了解更多'
      }],
      screenshots: [],
      updated: '2019-05-10',
      version: '1.0.0'
    }
  };
}

function getPhantomPlugin(options) {
  return {
    id: options.id,
    name: options.name,
    type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["PluginType"].datasource,
    module: 'phantom',
    baseUrl: '',
    info: {
      description: options.description,
      logos: {
        small: options.imgUrl,
        large: options.imgUrl
      },
      author: {
        name: 'Grafana Labs'
      },
      links: [{
        url: 'https://grafana.com/grafana/plugins/' + options.id,
        name: '现在安装'
      }],
      screenshots: [],
      updated: '2019-05-10',
      version: '1.0.0'
    }
  };
}

/***/ }),

/***/ "./public/app/features/datasources/state/navModel.ts":
/*!***********************************************************!*\
  !*** ./public/app/features/datasources/state/navModel.ts ***!
  \***********************************************************/
/*! exports provided: buildNavModel, getDataSourceLoadingNav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildNavModel", function() { return buildNavModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourceLoadingNav", function() { return getDataSourceLoadingNav; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");


function buildNavModel(dataSource, plugin) {
  var pluginMeta = plugin.meta;
  var navModel = {
    img: pluginMeta.info.logos.large,
    id: 'datasource-' + dataSource.id,
    subTitle: "\u7C7B\u578B: ".concat(pluginMeta.name),
    url: '',
    text: dataSource.name,
    breadcrumbs: [{
      title: '数据源',
      url: 'datasources'
    }],
    children: [{
      active: false,
      icon: 'sliders-v-alt',
      id: "datasource-settings-".concat(dataSource.id),
      text: '设置',
      url: "datasources/edit/".concat(dataSource.id, "/")
    }]
  };

  if (plugin.configPages) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = plugin.configPages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var page = _step.value;
        navModel.children.push({
          active: false,
          text: page.title,
          icon: page.icon,
          url: "datasources/edit/".concat(dataSource.id, "/?page=").concat(page.id),
          id: "datasource-page-".concat(page.id)
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
  }

  if (pluginMeta.includes && hasDashboards(pluginMeta.includes)) {
    navModel.children.push({
      active: false,
      icon: 'apps',
      id: "datasource-dashboards-".concat(dataSource.id),
      text: '仪表板',
      url: "datasources/edit/".concat(dataSource.id, "/dashboards")
    });
  }

  if (app_core_config__WEBPACK_IMPORTED_MODULE_1__["default"].licenseInfo.hasLicense) {
    navModel.children.push({
      active: false,
      icon: 'lock',
      id: "datasource-permissions-".concat(dataSource.id),
      text: '权限',
      url: "datasources/edit/".concat(dataSource.id, "/permissions")
    });

    if (app_core_config__WEBPACK_IMPORTED_MODULE_1__["default"].featureToggles.datasourceInsights) {
      navModel.children.push({
        active: false,
        icon: 'info-circle',
        id: "datasource-insights-".concat(dataSource.id),
        text: '见解',
        url: "datasources/edit/".concat(dataSource.id, "/insights")
      });
    }
  }

  return navModel;
}
function getDataSourceLoadingNav(pageName) {
  var main = buildNavModel({
    access: '',
    basicAuth: false,
    basicAuthUser: '',
    basicAuthPassword: '',
    withCredentials: false,
    database: '',
    id: 1,
    isDefault: false,
    jsonData: {
      authType: 'credentials',
      defaultRegion: 'eu-west-2'
    },
    name: 'Loading',
    orgId: 1,
    password: '',
    readOnly: false,
    type: 'Loading',
    typeLogoUrl: 'public/img/icn-datasource.svg',
    url: '',
    user: '',
    secureJsonFields: {}
  }, {
    meta: {
      id: '1',
      type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["PluginType"].datasource,
      name: '',
      info: {
        author: {
          name: '',
          url: ''
        },
        description: '',
        links: [{
          name: '',
          url: ''
        }],
        logos: {
          large: '',
          small: ''
        },
        screenshots: [],
        updated: '',
        version: ''
      },
      includes: [],
      module: '',
      baseUrl: ''
    }
  });
  var node; // find active page

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = main.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var child = _step2.value;

      if (child.id.indexOf(pageName) > 0) {
        child.active = true;
        node = child;
        break;
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
    main: main,
    node: node
  };
}

function hasDashboards(includes) {
  return includes.find(function (include) {
    return include.type === 'dashboard';
  }) !== undefined;
}

/***/ }),

/***/ "./public/app/features/datasources/state/selectors.ts":
/*!************************************************************!*\
  !*** ./public/app/features/datasources/state/selectors.ts ***!
  \************************************************************/
/*! exports provided: getDataSources, getDataSourcePlugins, getDataSource, getDataSourceMeta, getDataSourcesSearchQuery, getDataSourcesLayoutMode, getDataSourcesCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSources", function() { return getDataSources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourcePlugins", function() { return getDataSourcePlugins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSource", function() { return getDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourceMeta", function() { return getDataSourceMeta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourcesSearchQuery", function() { return getDataSourcesSearchQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourcesLayoutMode", function() { return getDataSourcesLayoutMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourcesCount", function() { return getDataSourcesCount; });
var getDataSources = function getDataSources(state) {
  var regex = new RegExp(state.searchQuery, 'i');
  return state.dataSources.filter(function (dataSource) {
    return regex.test(dataSource.name) || regex.test(dataSource.database) || regex.test(dataSource.type);
  });
};
var getDataSourcePlugins = function getDataSourcePlugins(state) {
  var regex = new RegExp(state.dataSourceTypeSearchQuery, 'i');
  return state.plugins.filter(function (type) {
    return regex.test(type.name);
  });
};
var getDataSource = function getDataSource(state, dataSourceId) {
  if (state.dataSource.id === parseInt(dataSourceId, 10)) {
    return state.dataSource;
  }

  return {};
};
var getDataSourceMeta = function getDataSourceMeta(state, type) {
  if (state.dataSourceMeta.id === type) {
    return state.dataSourceMeta;
  }

  return {};
};
var getDataSourcesSearchQuery = function getDataSourcesSearchQuery(state) {
  return state.searchQuery;
};
var getDataSourcesLayoutMode = function getDataSourcesLayoutMode(state) {
  return state.layoutMode;
};
var getDataSourcesCount = function getDataSourcesCount(state) {
  return state.dataSourcesCount;
};

/***/ })

}]);
//# sourceMappingURL=default~DataSourceDashboards~DataSourceSettingsPage~DataSourcesListPage~NewDataSourcePage.1ebdc265fc3bd7452fcd.js.map