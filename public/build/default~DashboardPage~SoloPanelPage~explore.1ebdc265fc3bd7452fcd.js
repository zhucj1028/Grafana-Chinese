(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~DashboardPage~SoloPanelPage~explore"],{

/***/ "./public/app/core/utils/richHistory.ts":
/*!**********************************************!*\
  !*** ./public/app/core/utils/richHistory.ts ***!
  \**********************************************/
/*! exports provided: RICH_HISTORY_SETTING_KEYS, SortOrder, addToRichHistory, getRichHistory, deleteAllFromRichHistory, updateStarredInRichHistory, updateCommentInRichHistory, deleteQueryInRichHistory, sortQueries, copyStringToClipboard, createUrlFromRichHistory, mapNumbertoTimeInSlider, createRetentionPeriodBoundary, createDateStringFromTs, getQueryDisplayText, createQueryHeading, createQueryText, mapQueriesToHeadings, createDatasourcesList, notEmptyQuery, filterQueriesBySearchFilter, filterQueriesByDataSource, filterQueriesByTime, filterAndSortQueries */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RICH_HISTORY_SETTING_KEYS", function() { return RICH_HISTORY_SETTING_KEYS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortOrder", function() { return SortOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addToRichHistory", function() { return addToRichHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRichHistory", function() { return getRichHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteAllFromRichHistory", function() { return deleteAllFromRichHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateStarredInRichHistory", function() { return updateStarredInRichHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateCommentInRichHistory", function() { return updateCommentInRichHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteQueryInRichHistory", function() { return deleteQueryInRichHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortQueries", function() { return sortQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyStringToClipboard", function() { return copyStringToClipboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUrlFromRichHistory", function() { return createUrlFromRichHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapNumbertoTimeInSlider", function() { return mapNumbertoTimeInSlider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRetentionPeriodBoundary", function() { return createRetentionPeriodBoundary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDateStringFromTs", function() { return createDateStringFromTs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryDisplayText", function() { return getQueryDisplayText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createQueryHeading", function() { return createQueryHeading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createQueryText", function() { return createQueryText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapQueriesToHeadings", function() { return mapQueriesToHeadings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDatasourcesList", function() { return createDatasourcesList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notEmptyQuery", function() { return notEmptyQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterQueriesBySearchFilter", function() { return filterQueriesBySearchFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterQueriesByDataSource", function() { return filterQueriesByDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterQueriesByTime", function() { return filterQueriesByTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterAndSortQueries", function() { return filterAndSortQueries; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var app_core_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/store */ "./public/app/core/store.ts");
/* harmony import */ var _features_explore_state_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../features/explore/state/selectors */ "./public/app/features/explore/state/selectors.ts");
/* harmony import */ var _grafana_data_src_utils_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data/src/utils/url */ "./packages/grafana-data/src/utils/url.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Libraries
 // Services & Utils




 // Types


var RICH_HISTORY_KEY = 'grafana.explore.richHistory';
var RICH_HISTORY_SETTING_KEYS = {
  retentionPeriod: 'grafana.explore.richHistory.retentionPeriod',
  starredTabAsFirstTab: 'grafana.explore.richHistory.starredTabAsFirstTab',
  activeDatasourceOnly: 'grafana.explore.richHistory.activeDatasourceOnly',
  datasourceFilters: 'grafana.explore.richHistory.datasourceFilters'
};
var SortOrder;
/*
 * Add queries to rich history. Save only queries within the retention period, or that are starred.
 * Side-effect: store history in local storage
 */

(function (SortOrder) {
  SortOrder["Descending"] = "Descending";
  SortOrder["Ascending"] = "Ascending";
  SortOrder["DatasourceAZ"] = "Datasource A-Z";
  SortOrder["DatasourceZA"] = "Datasource Z-A";
})(SortOrder || (SortOrder = {}));

function addToRichHistory(richHistory, datasourceId, datasourceName, queries, starred, comment, sessionName) {
  var ts = Date.now();
  /* Save only queries, that are not falsy (e.g. empty object, null, ...) */

  var newQueriesToSave = queries && queries.filter(function (query) {
    return notEmptyQuery(query);
  });
  var retentionPeriod = app_core_store__WEBPACK_IMPORTED_MODULE_3__["default"].getObject(RICH_HISTORY_SETTING_KEYS.retentionPeriod, 7);
  var retentionPeriodLastTs = createRetentionPeriodBoundary(retentionPeriod, false);
  /* Keep only queries, that are within the selected retention period or that are starred.
   * If no queries, initialize with empty array
   */

  var queriesToKeep = richHistory.filter(function (q) {
    return q.ts > retentionPeriodLastTs || q.starred === true;
  }) || [];

  if (newQueriesToSave.length > 0) {
    /* Compare queries of a new query and last saved queries. If they are the same, (except selected properties,
     * which can be different) don't save it in rich history.
     */
    var newQueriesToCompare = newQueriesToSave.map(function (q) {
      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.omit(q, ['key', 'refId']);
    });
    var lastQueriesToCompare = queriesToKeep.length > 0 && queriesToKeep[0].queries.map(function (q) {
      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.omit(q, ['key', 'refId']);
    });

    if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(newQueriesToCompare, lastQueriesToCompare)) {
      return richHistory;
    }

    var updatedHistory = [{
      queries: newQueriesToSave,
      ts: ts,
      datasourceId: datasourceId,
      datasourceName: datasourceName,
      starred: starred,
      comment: comment,
      sessionName: sessionName
    }].concat(_toConsumableArray(queriesToKeep));

    try {
      app_core_store__WEBPACK_IMPORTED_MODULE_3__["default"].setObject(RICH_HISTORY_KEY, updatedHistory);
      return updatedHistory;
    } catch (error) {
      app_core_app_events__WEBPACK_IMPORTED_MODULE_2__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["AppEvents"].alertError, [error]);
      return richHistory;
    }
  }

  return richHistory;
}
function getRichHistory() {
  var richHistory = app_core_store__WEBPACK_IMPORTED_MODULE_3__["default"].getObject(RICH_HISTORY_KEY, []);
  var transformedRichHistory = migrateRichHistory(richHistory);
  return transformedRichHistory;
}
function deleteAllFromRichHistory() {
  return app_core_store__WEBPACK_IMPORTED_MODULE_3__["default"].delete(RICH_HISTORY_KEY);
}
function updateStarredInRichHistory(richHistory, ts) {
  var updatedHistory = richHistory.map(function (query) {
    /* Timestamps are currently unique - we can use them to identify specific queries */
    if (query.ts === ts) {
      var isStarred = query.starred;
      var updatedQuery = Object.assign({}, query, {
        starred: !isStarred
      });
      return updatedQuery;
    }

    return query;
  });

  try {
    app_core_store__WEBPACK_IMPORTED_MODULE_3__["default"].setObject(RICH_HISTORY_KEY, updatedHistory);
    return updatedHistory;
  } catch (error) {
    app_core_app_events__WEBPACK_IMPORTED_MODULE_2__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["AppEvents"].alertError, [error]);
    return richHistory;
  }
}
function updateCommentInRichHistory(richHistory, ts, newComment) {
  var updatedHistory = richHistory.map(function (query) {
    if (query.ts === ts) {
      var updatedQuery = Object.assign({}, query, {
        comment: newComment
      });
      return updatedQuery;
    }

    return query;
  });

  try {
    app_core_store__WEBPACK_IMPORTED_MODULE_3__["default"].setObject(RICH_HISTORY_KEY, updatedHistory);
    return updatedHistory;
  } catch (error) {
    app_core_app_events__WEBPACK_IMPORTED_MODULE_2__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["AppEvents"].alertError, [error]);
    return richHistory;
  }
}
function deleteQueryInRichHistory(richHistory, ts) {
  var updatedHistory = richHistory.filter(function (query) {
    return query.ts !== ts;
  });

  try {
    app_core_store__WEBPACK_IMPORTED_MODULE_3__["default"].setObject(RICH_HISTORY_KEY, updatedHistory);
    return updatedHistory;
  } catch (error) {
    app_core_app_events__WEBPACK_IMPORTED_MODULE_2__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["AppEvents"].alertError, [error]);
    return richHistory;
  }
}
var sortQueries = function sortQueries(array, sortOrder) {
  var sortFunc;

  if (sortOrder === SortOrder.Ascending) {
    sortFunc = function sortFunc(a, b) {
      return a.ts < b.ts ? -1 : a.ts > b.ts ? 1 : 0;
    };
  }

  if (sortOrder === SortOrder.Descending) {
    sortFunc = function sortFunc(a, b) {
      return a.ts < b.ts ? 1 : a.ts > b.ts ? -1 : 0;
    };
  }

  if (sortOrder === SortOrder.DatasourceZA) {
    sortFunc = function sortFunc(a, b) {
      return a.datasourceName < b.datasourceName ? -1 : a.datasourceName > b.datasourceName ? 1 : 0;
    };
  }

  if (sortOrder === SortOrder.DatasourceAZ) {
    sortFunc = function sortFunc(a, b) {
      return a.datasourceName < b.datasourceName ? 1 : a.datasourceName > b.datasourceName ? -1 : 0;
    };
  }

  return array.sort(sortFunc);
};
var copyStringToClipboard = function copyStringToClipboard(string) {
  var el = document.createElement('textarea');
  el.value = string;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
var createUrlFromRichHistory = function createUrlFromRichHistory(query) {
  var exploreState = {
    /* Default range, as we are not saving timerange in rich history */
    range: {
      from: 'now-1h',
      to: 'now'
    },
    datasource: query.datasourceName,
    queries: query.queries,
    ui: {
      showingGraph: true,
      showingLogs: true,
      showingTable: true
    },
    context: 'explore'
  };
  var serializedState = Object(_grafana_data_src_utils_url__WEBPACK_IMPORTED_MODULE_5__["serializeStateToUrlParam"])(exploreState, true);
  var baseUrl = /.*(?=\/explore)/.exec("".concat(window.location.href))[0];
  var url = _grafana_data__WEBPACK_IMPORTED_MODULE_1__["urlUtil"].renderUrl("".concat(baseUrl, "/explore"), {
    left: serializedState
  });
  return url;
};
/* Needed for slider in Rich history to map numerical values to meaningful strings */

var mapNumbertoTimeInSlider = function mapNumbertoTimeInSlider(num) {
  var str;

  switch (num) {
    case 0:
      str = '今天';
      break;

    case 1:
      str = '昨天';
      break;

    case 7:
      str = '一周前';
      break;

    case 14:
      str = '两周钱';
      break;

    default:
      str = "".concat(num, " \u5929\u524D");
  }

  return str;
};
var createRetentionPeriodBoundary = function createRetentionPeriodBoundary(days, isLastTs) {
  var today = new Date();
  var date = new Date(today.setDate(today.getDate() - days));
  /*
   * As a retention period boundaries, we consider:
   * - The last timestamp equals to the 24:00 of the last day of retention
   * - The first timestamp that equals to the 00:00 of the first day of retention
   */

  var boundary = isLastTs ? date.setHours(24, 0, 0, 0) : date.setHours(0, 0, 0, 0);
  return boundary;
};
function createDateStringFromTs(ts) {
  return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["dateTimeFormat"])(ts, {
    format: 'MMMM D'
  });
}
function getQueryDisplayText(query) {
  /* If datasource doesn't have getQueryDisplayText, create query display text by
   * stringifying query that was stripped of key, refId and datasource for nicer
   * formatting and improved readability
   */
  var strippedQuery = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.omit(query, ['key', 'refId', 'datasource']);

  return JSON.stringify(strippedQuery);
}
function createQueryHeading(query, sortOrder) {
  var heading = '';

  if (sortOrder === SortOrder.DatasourceAZ || sortOrder === SortOrder.DatasourceZA) {
    heading = query.datasourceName;
  } else {
    heading = createDateStringFromTs(query.ts);
  }

  return heading;
}
function createQueryText(query, queryDsInstance) {
  /* query DatasourceInstance is necessary because we use its getQueryDisplayText method
   * to format query text
   */
  if (queryDsInstance === null || queryDsInstance === void 0 ? void 0 : queryDsInstance.getQueryDisplayText) {
    return queryDsInstance.getQueryDisplayText(query);
  }

  return getQueryDisplayText(query);
}
function mapQueriesToHeadings(query, sortOrder) {
  var mappedQueriesToHeadings = {};
  query.forEach(function (q) {
    var heading = createQueryHeading(q, sortOrder);

    if (!(heading in mappedQueriesToHeadings)) {
      mappedQueriesToHeadings[heading] = [q];
    } else {
      mappedQueriesToHeadings[heading] = [].concat(_toConsumableArray(mappedQueriesToHeadings[heading]), [q]);
    }
  });
  return mappedQueriesToHeadings;
}
/* Create datasource list with images. If specific datasource retrieved from Rich history is not part of
 * exploreDatasources add generic datasource image and add property isRemoved = true.
 */

function createDatasourcesList(queriesDatasources) {
  var exploreDatasources = Object(_features_explore_state_selectors__WEBPACK_IMPORTED_MODULE_4__["getExploreDatasources"])();
  var datasources = [];
  queriesDatasources.forEach(function (queryDsName) {
    var index = exploreDatasources.findIndex(function (exploreDs) {
      return exploreDs.name === queryDsName;
    });

    if (index !== -1) {
      datasources.push({
        label: queryDsName,
        value: queryDsName,
        imgUrl: exploreDatasources[index].meta.info.logos.small,
        isRemoved: false
      });
    } else {
      datasources.push({
        label: queryDsName,
        value: queryDsName,
        imgUrl: 'public/img/icn-datasource.svg',
        isRemoved: true
      });
    }
  });
  return datasources;
}
function notEmptyQuery(query) {
  /* Check if query has any other properties besides key, refId and datasource.
   * If not, then we consider it empty query.
   */
  var strippedQuery = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.omit(query, ['key', 'refId', 'datasource']);

  var queryKeys = Object.keys(strippedQuery);

  if (queryKeys.length > 0) {
    return true;
  }

  return false;
}
function filterQueriesBySearchFilter(queries, searchFilter) {
  return queries.filter(function (query) {
    if (query.comment.includes(searchFilter)) {
      return true;
    }

    var listOfMatchingQueries = query.queries.filter(function (query) {
      return (// Remove fields in which we don't want to be searching
        Object.values(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.omit(query, ['datasource', 'key', 'refId', 'hide', 'queryType'])).some(function (value) {
          return value === null || value === void 0 ? void 0 : value.toString().includes(searchFilter);
        })
      );
    });
    return listOfMatchingQueries.length > 0;
  });
}
function filterQueriesByDataSource(queries, listOfDatasourceFilters) {
  return listOfDatasourceFilters && listOfDatasourceFilters.length > 0 ? queries.filter(function (q) {
    return listOfDatasourceFilters.includes(q.datasourceName);
  }) : queries;
}
function filterQueriesByTime(queries, timeFilter) {
  return queries.filter(function (q) {
    return q.ts < createRetentionPeriodBoundary(timeFilter[0], true) && q.ts > createRetentionPeriodBoundary(timeFilter[1], false);
  });
}
function filterAndSortQueries(queries, sortOrder, listOfDatasourceFilters, searchFilter, timeFilter) {
  var filteredQueriesByDs = filterQueriesByDataSource(queries, listOfDatasourceFilters);
  var filteredQueriesByDsAndSearchFilter = filterQueriesBySearchFilter(filteredQueriesByDs, searchFilter);
  var filteredQueriesToBeSorted = timeFilter ? filterQueriesByTime(filteredQueriesByDsAndSearchFilter, timeFilter) : filteredQueriesByDsAndSearchFilter;
  return sortQueries(filteredQueriesToBeSorted, sortOrder);
}
/* These functions are created to migrate string queries (from 6.7 release) to DataQueries. They can be removed after 7.1 release. */

function migrateRichHistory(richHistory) {
  var transformedRichHistory = richHistory.map(function (query) {
    var transformedQueries = query.queries.map(function (q, index) {
      return createDataQuery(query, q, index);
    });
    return _objectSpread({}, query, {
      queries: transformedQueries
    });
  });
  return transformedRichHistory;
}

function createDataQuery(query, individualQuery, index) {
  var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';

  if (_typeof(individualQuery) === 'object') {
    return individualQuery;
  } else if (isParsable(individualQuery)) {
    return JSON.parse(individualQuery);
  }

  return {
    expr: individualQuery,
    refId: letters[index]
  };
}

function isParsable(string) {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }

  return true;
}

/***/ }),

/***/ "./public/app/features/dashboard/state/index.ts":
/*!******************************************************!*\
  !*** ./public/app/features/dashboard/state/index.ts ***!
  \******************************************************/
/*! exports provided: DashboardModel, PanelModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DashboardModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashboardModel */ "./public/app/features/dashboard/state/DashboardModel.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DashboardModel", function() { return _DashboardModel__WEBPACK_IMPORTED_MODULE_0__["DashboardModel"]; });

/* harmony import */ var _PanelModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PanelModel */ "./public/app/features/dashboard/state/PanelModel.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PanelModel", function() { return _PanelModel__WEBPACK_IMPORTED_MODULE_1__["PanelModel"]; });




/***/ }),

/***/ "./public/app/features/explore/state/actions.ts":
/*!******************************************************!*\
  !*** ./public/app/features/explore/state/actions.ts ***!
  \******************************************************/
/*! exports provided: addQueryRow, changeDatasource, changeQuery, changeSize, updateTimeRange, changeRefreshInterval, clearQueries, cancelQueries, loadExploreDatasourcesAndSetDatasource, initializeExplore, loadDatasourceReady, importQueries, loadDatasource, modifyQueries, runQueries, updateRichHistory, deleteRichHistory, toRawTimeRange, stateSave, updateTime, scanStart, setQueries, splitClose, splitOpen, syncTimes, toggleGraph, toggleTable, changeDedupStrategy, refreshExplore, navigateToExplore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addQueryRow", function() { return addQueryRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeDatasource", function() { return changeDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeQuery", function() { return changeQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeSize", function() { return changeSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateTimeRange", function() { return updateTimeRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeRefreshInterval", function() { return changeRefreshInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearQueries", function() { return clearQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancelQueries", function() { return cancelQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadExploreDatasourcesAndSetDatasource", function() { return loadExploreDatasourcesAndSetDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeExplore", function() { return initializeExplore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDatasourceReady", function() { return loadDatasourceReady; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importQueries", function() { return importQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDatasource", function() { return loadDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modifyQueries", function() { return modifyQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runQueries", function() { return runQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateRichHistory", function() { return updateRichHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteRichHistory", function() { return deleteRichHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRawTimeRange", function() { return toRawTimeRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stateSave", function() { return stateSave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateTime", function() { return updateTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scanStart", function() { return scanStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setQueries", function() { return setQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitClose", function() { return splitClose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitOpen", function() { return splitOpen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "syncTimes", function() { return syncTimes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleGraph", function() { return toggleGraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleTable", function() { return toggleTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeDedupStrategy", function() { return changeDedupStrategy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refreshExplore", function() { return refreshExplore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigateToExplore", function() { return navigateToExplore; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/store */ "./public/app/core/store.ts");
/* harmony import */ var app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/features/plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var app_core_utils_richHistory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/utils/richHistory */ "./public/app/core/utils/richHistory.ts");
/* harmony import */ var app_types_explore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/types/explore */ "./public/app/types/explore.ts");
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./actionTypes */ "./public/app/features/explore/state/actionTypes.ts");
/* harmony import */ var app_features_profile_state_selectors__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/features/profile/state/selectors */ "./public/app/features/profile/state/selectors.ts");
/* harmony import */ var app_core_utils_timePicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/utils/timePicker */ "./public/app/core/utils/timePicker.ts");
/* harmony import */ var _core_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var _dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../dashboard/services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");
/* harmony import */ var _dashboard_state_runRequest__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../dashboard/state/runRequest */ "./public/app/features/dashboard/state/runRequest.ts");
/* harmony import */ var app_features_dashboard_state__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! app/features/dashboard/state */ "./public/app/features/dashboard/state/index.ts");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./selectors */ "./public/app/features/explore/state/selectors.ts");
/* harmony import */ var _grafana_data_src_utils_url__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @grafana/data/src/utils/url */ "./packages/grafana-data/src/utils/url.ts");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Libraries



 // Services & Utils




 // Types











/**
 * Updates UI state and save it to the URL
 */

var updateExploreUIState = function updateExploreUIState(exploreId, uiStateFragment) {
  return function (dispatch) {
    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["updateUIStateAction"])(_objectSpread({
      exploreId: exploreId
    }, uiStateFragment)));
    dispatch(stateSave());
  };
};
/**
 * Adds a query row after the row with the given index.
 */


function addQueryRow(exploreId, index) {
  return function (dispatch, getState) {
    var queries = getState().explore[exploreId].queries;
    var query = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["generateEmptyQuery"])(queries, index);
    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["addQueryRowAction"])({
      exploreId: exploreId,
      index: index,
      query: query
    }));
  };
}
/**
 * Loads a new datasource identified by the given name.
 */

function changeDatasource(exploreId, datasourceName, options) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dispatch, getState) {
        var newDataSourceInstance, currentDataSourceInstance, queries, orgId, datasourceVersion;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (datasourceName) {
                  _context.next = 6;
                  break;
                }

                _context.next = 3;
                return Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_5__["getDatasourceSrv"])().get();

              case 3:
                newDataSourceInstance = _context.sent;
                _context.next = 9;
                break;

              case 6:
                _context.next = 8;
                return Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_5__["getDatasourceSrv"])().get(datasourceName);

              case 8:
                newDataSourceInstance = _context.sent;

              case 9:
                currentDataSourceInstance = getState().explore[exploreId].datasourceInstance;
                queries = getState().explore[exploreId].queries;
                orgId = getState().user.orgId;
                _context.t0 = newDataSourceInstance.getVersion;

                if (!_context.t0) {
                  _context.next = 17;
                  break;
                }

                _context.next = 16;
                return newDataSourceInstance.getVersion();

              case 16:
                _context.t0 = _context.sent;

              case 17:
                datasourceVersion = _context.t0;
                dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["updateDatasourceInstanceAction"])({
                  exploreId: exploreId,
                  datasourceInstance: newDataSourceInstance,
                  version: datasourceVersion
                }));

                if (!(options === null || options === void 0 ? void 0 : options.importQueries)) {
                  _context.next = 22;
                  break;
                }

                _context.next = 22;
                return dispatch(importQueries(exploreId, queries, currentDataSourceInstance, newDataSourceInstance));

              case 22:
                if (getState().explore[exploreId].isLive) {
                  dispatch(changeRefreshInterval(exploreId, _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["RefreshPicker"].offOption.value));
                }

                _context.next = 25;
                return dispatch(loadDatasource(exploreId, newDataSourceInstance, orgId));

              case 25:
                // Exception - we only want to run queries on data source change, if the queries were imported
                if (options === null || options === void 0 ? void 0 : options.importQueries) {
                  dispatch(runQueries(exploreId));
                }

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}
/**
 * Query change handler for the query row with the given index.
 * If `override` is reset the query modifications and run the queries. Use this to set queries via a link.
 */

function changeQuery(exploreId, query, index) {
  var override = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return function (dispatch, getState) {
    // Null query means reset
    if (query === null) {
      var queries = getState().explore[exploreId].queries;
      var _queries$index = queries[index],
          refId = _queries$index.refId,
          key = _queries$index.key;
      query = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["generateNewKeyAndAddRefIdIfMissing"])({
        refId: refId,
        key: key
      }, queries, index);
    }

    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["changeQueryAction"])({
      exploreId: exploreId,
      query: query,
      index: index,
      override: override
    }));

    if (override) {
      dispatch(runQueries(exploreId));
    }
  };
}
/**
 * Keep track of the Explore container size, in particular the width.
 * The width will be used to calculate graph intervals (number of datapoints).
 */

function changeSize(exploreId, _ref2) {
  var height = _ref2.height,
      width = _ref2.width;
  return Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["changeSizeAction"])({
    exploreId: exploreId,
    height: height,
    width: width
  });
}
var updateTimeRange = function updateTimeRange(options) {
  return function (dispatch, getState) {
    var syncedTimes = getState().explore.syncedTimes;

    if (syncedTimes) {
      dispatch(updateTime(_objectSpread({}, options, {
        exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].left
      })));
      dispatch(runQueries(app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].left));
      dispatch(updateTime(_objectSpread({}, options, {
        exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].right
      })));
      dispatch(runQueries(app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].right));
    } else {
      dispatch(updateTime(_objectSpread({}, options)));
      dispatch(runQueries(options.exploreId));
    }
  };
};
/**
 * Change the refresh interval of Explore. Called from the Refresh picker.
 */

function changeRefreshInterval(exploreId, refreshInterval) {
  return Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["changeRefreshIntervalAction"])({
    exploreId: exploreId,
    refreshInterval: refreshInterval
  });
}
/**
 * Clear all queries and results.
 */

function clearQueries(exploreId) {
  return function (dispatch) {
    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["scanStopAction"])({
      exploreId: exploreId
    }));
    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["clearQueriesAction"])({
      exploreId: exploreId
    }));
    dispatch(stateSave());
  };
}
/**
 * Cancel running queries
 */

function cancelQueries(exploreId) {
  return function (dispatch) {
    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["scanStopAction"])({
      exploreId: exploreId
    }));
    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["cancelQueriesAction"])({
      exploreId: exploreId
    }));
    dispatch(stateSave());
  };
}
/**
 * Loads all explore data sources and sets the chosen datasource.
 * If there are no datasources a missing datasource action is dispatched.
 */

function loadExploreDatasourcesAndSetDatasource(exploreId, datasourceName) {
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(dispatch) {
        var exploreDatasources;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                exploreDatasources = Object(_selectors__WEBPACK_IMPORTED_MODULE_16__["getExploreDatasources"])();

                if (!(exploreDatasources.length >= 1)) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 4;
                return dispatch(changeDatasource(exploreId, datasourceName, {
                  importQueries: true
                }));

              case 4:
                _context2.next = 7;
                break;

              case 6:
                dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["loadDatasourceMissingAction"])({
                  exploreId: exploreId
                }));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
}
/**
 * Initialize Explore state with state from the URL and the React component.
 * Call this only on components for with the Explore state has not been initialized.
 */

function initializeExplore(exploreId, datasourceName, queries, range, containerWidth, eventBridge, ui, originPanelId) {
  return (
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(dispatch, getState) {
        var richHistory;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                dispatch(loadExploreDatasourcesAndSetDatasource(exploreId, datasourceName));
                dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["initializeExploreAction"])({
                  exploreId: exploreId,
                  containerWidth: containerWidth,
                  eventBridge: eventBridge,
                  queries: queries,
                  range: range,
                  ui: ui,
                  originPanelId: originPanelId
                }));
                dispatch(updateTime({
                  exploreId: exploreId
                }));
                richHistory = Object(app_core_utils_richHistory__WEBPACK_IMPORTED_MODULE_7__["getRichHistory"])();
                dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["richHistoryUpdatedAction"])({
                  richHistory: richHistory
                }));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x4, _x5) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
}
/**
 * Datasource loading was successfully completed.
 */

var loadDatasourceReady = function loadDatasourceReady(exploreId, instance, orgId) {
  var _instance$meta;

  var historyKey = "grafana.explore.history.".concat((_instance$meta = instance.meta) === null || _instance$meta === void 0 ? void 0 : _instance$meta.id);
  var history = app_core_store__WEBPACK_IMPORTED_MODULE_4__["default"].getObject(historyKey, []); // Save last-used datasource

  app_core_store__WEBPACK_IMPORTED_MODULE_4__["default"].set(Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["lastUsedDatasourceKeyForOrgId"])(orgId), instance.name);
  return Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["loadDatasourceReadyAction"])({
    exploreId: exploreId,
    history: history
  });
};
/**
 * Import queries from previous datasource if possible eg Loki and Prometheus have similar query language so the
 * labels part can be reused to get similar data.
 * @param exploreId
 * @param queries
 * @param sourceDataSource
 * @param targetDataSource
 */

var importQueries = function importQueries(exploreId, queries, sourceDataSource, targetDataSource) {
  return (
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(dispatch) {
        var _sourceDataSource$met, _targetDataSource$met;

        var importedQueries, nextQueries;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (sourceDataSource) {
                  _context4.next = 3;
                  break;
                }

                // explore not initialized
                dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["queriesImportedAction"])({
                  exploreId: exploreId,
                  queries: queries
                }));
                return _context4.abrupt("return");

              case 3:
                importedQueries = queries; // Check if queries can be imported from previously selected datasource

                if (!(((_sourceDataSource$met = sourceDataSource.meta) === null || _sourceDataSource$met === void 0 ? void 0 : _sourceDataSource$met.id) === ((_targetDataSource$met = targetDataSource.meta) === null || _targetDataSource$met === void 0 ? void 0 : _targetDataSource$met.id))) {
                  _context4.next = 8;
                  break;
                }

                // Keep same queries if same type of datasource
                importedQueries = _toConsumableArray(queries);
                _context4.next = 15;
                break;

              case 8:
                if (!targetDataSource.importQueries) {
                  _context4.next = 14;
                  break;
                }

                _context4.next = 11;
                return targetDataSource.importQueries(queries, sourceDataSource.meta);

              case 11:
                importedQueries = _context4.sent;
                _context4.next = 15;
                break;

              case 14:
                // Default is blank queries
                importedQueries = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["ensureQueries"])();

              case 15:
                nextQueries = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["ensureQueries"])(importedQueries);
                dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["queriesImportedAction"])({
                  exploreId: exploreId,
                  queries: nextQueries
                }));

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x6) {
        return _ref5.apply(this, arguments);
      };
    }()
  );
};
/**
 * Main action to asynchronously load a datasource. Dispatches lots of smaller actions for feedback.
 */

var loadDatasource = function loadDatasource(exploreId, instance, orgId) {
  return (
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(dispatch, getState) {
        var datasourceName;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                datasourceName = instance.name; // Keep ID to track selection

                dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["loadDatasourcePendingAction"])({
                  exploreId: exploreId,
                  requestedDatasourceName: datasourceName
                }));

                if (instance.init) {
                  try {
                    instance.init();
                  } catch (err) {
                    console.error(err);
                  }
                }

                if (!(datasourceName !== getState().explore[exploreId].requestedDatasourceName)) {
                  _context5.next = 5;
                  break;
                }

                return _context5.abrupt("return");

              case 5:
                dispatch(loadDatasourceReady(exploreId, instance, orgId));

              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x7, _x8) {
        return _ref6.apply(this, arguments);
      };
    }()
  );
};
/**
 * Action to modify a query given a datasource-specific modifier action.
 * @param exploreId Explore area
 * @param modification Action object with a type, e.g., ADD_FILTER
 * @param index Optional query row index. If omitted, the modification is applied to all query rows.
 * @param modifier Function that executes the modification, typically `datasourceInstance.modifyQueries`.
 */

function modifyQueries(exploreId, modification, modifier, index) {
  return function (dispatch) {
    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["modifyQueriesAction"])({
      exploreId: exploreId,
      modification: modification,
      index: index,
      modifier: modifier
    }));

    if (!modification.preventSubmit) {
      dispatch(runQueries(exploreId));
    }
  };
}
/**
 * Main action to run queries and dispatches sub-actions based on which result viewers are active
 */

var runQueries = function runQueries(exploreId) {
  return function (dispatch, getState) {
    dispatch(updateTime({
      exploreId: exploreId
    }));
    var richHistory = getState().explore.richHistory;
    var exploreItemState = getState().explore[exploreId];
    var datasourceInstance = exploreItemState.datasourceInstance,
        queries = exploreItemState.queries,
        containerWidth = exploreItemState.containerWidth,
        live = exploreItemState.isLive,
        range = exploreItemState.range,
        scanning = exploreItemState.scanning,
        queryResponse = exploreItemState.queryResponse,
        querySubscription = exploreItemState.querySubscription,
        history = exploreItemState.history,
        showingGraph = exploreItemState.showingGraph,
        showingTable = exploreItemState.showingTable;

    if (!Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["hasNonEmptyQuery"])(queries)) {
      dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["clearQueriesAction"])({
        exploreId: exploreId
      }));
      dispatch(stateSave()); // Remember to save to state and update location

      return;
    }

    if (!datasourceInstance) {
      return;
    } // Some datasource's query builders allow per-query interval limits,
    // but we're using the datasource interval limit for now


    var minInterval = datasourceInstance === null || datasourceInstance === void 0 ? void 0 : datasourceInstance.interval;
    Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["stopQueryState"])(querySubscription);
    var datasourceId = datasourceInstance === null || datasourceInstance === void 0 ? void 0 : datasourceInstance.meta.id;
    var queryOptions = {
      minInterval: minInterval,
      // maxDataPoints is used in:
      // Loki - used for logs streaming for buffer size, with undefined it falls back to datasource config if it supports that.
      // Elastic - limits the number of datapoints for the counts query and for logs it has hardcoded limit.
      // Influx - used to correctly display logs in graph
      // TODO:unification
      // maxDataPoints: mode === ExploreMode.Logs && datasourceId === 'loki' ? undefined : containerWidth,
      maxDataPoints: containerWidth,
      liveStreaming: live,
      showingGraph: showingGraph,
      showingTable: showingTable
    };
    var datasourceName = exploreItemState.requestedDatasourceName;
    var timeZone = Object(app_features_profile_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getTimeZone"])(getState().user);
    var transaction = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["buildQueryTransaction"])(queries, queryOptions, range, scanning, timeZone);
    var firstResponse = true;
    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["changeLoadingStateAction"])({
      exploreId: exploreId,
      loadingState: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["LoadingState"].Loading
    }));
    var newQuerySub = Object(_dashboard_state_runRequest__WEBPACK_IMPORTED_MODULE_14__["runRequest"])(datasourceInstance, transaction.request).pipe( // Simple throttle for live tailing, in case of > 1000 rows per interval we spend about 200ms on processing and
    // rendering. In case this is optimized this can be tweaked, but also it should be only as fast as user
    // actually can see what is happening.
    live ? Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["throttleTime"])(500) : rxjs__WEBPACK_IMPORTED_MODULE_1__["identity"], Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (data) {
      return Object(_dashboard_state_runRequest__WEBPACK_IMPORTED_MODULE_14__["preProcessPanelData"])(data, queryResponse);
    })).subscribe(function (data) {
      if (!data.error && firstResponse) {
        // Side-effect: Saving history in localstorage
        var nextHistory = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["updateHistory"])(history, datasourceId, queries);
        var nextRichHistory = Object(app_core_utils_richHistory__WEBPACK_IMPORTED_MODULE_7__["addToRichHistory"])(richHistory || [], datasourceId, datasourceName, queries, false, '', '');
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["historyUpdatedAction"])({
          exploreId: exploreId,
          history: nextHistory
        }));
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["richHistoryUpdatedAction"])({
          richHistory: nextRichHistory
        })); // We save queries to the URL here so that only successfully run queries change the URL.

        dispatch(stateSave());
      }

      firstResponse = false;
      dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["queryStreamUpdatedAction"])({
        exploreId: exploreId,
        response: data
      })); // Keep scanning for results if this was the last scanning transaction

      if (getState().explore[exploreId].scanning) {
        if (data.state === _grafana_data__WEBPACK_IMPORTED_MODULE_3__["LoadingState"].Done && data.series.length === 0) {
          var _range = Object(app_core_utils_timePicker__WEBPACK_IMPORTED_MODULE_11__["getShiftedTimeRange"])(-1, getState().explore[exploreId].range);

          dispatch(updateTime({
            exploreId: exploreId,
            absoluteRange: _range
          }));
          dispatch(runQueries(exploreId));
        } else {
          // We can stop scanning if we have a result
          dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["scanStopAction"])({
            exploreId: exploreId
          }));
        }
      }
    });
    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["queryStoreSubscriptionAction"])({
      exploreId: exploreId,
      querySubscription: newQuerySub
    }));
  };
};
var updateRichHistory = function updateRichHistory(ts, property, updatedProperty) {
  return function (dispatch, getState) {
    // Side-effect: Saving rich history in localstorage
    var nextRichHistory;

    if (property === 'starred') {
      nextRichHistory = Object(app_core_utils_richHistory__WEBPACK_IMPORTED_MODULE_7__["updateStarredInRichHistory"])(getState().explore.richHistory, ts);
    }

    if (property === 'comment') {
      nextRichHistory = Object(app_core_utils_richHistory__WEBPACK_IMPORTED_MODULE_7__["updateCommentInRichHistory"])(getState().explore.richHistory, ts, updatedProperty);
    }

    if (property === 'delete') {
      nextRichHistory = Object(app_core_utils_richHistory__WEBPACK_IMPORTED_MODULE_7__["deleteQueryInRichHistory"])(getState().explore.richHistory, ts);
    }

    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["richHistoryUpdatedAction"])({
      richHistory: nextRichHistory
    }));
  };
};
var deleteRichHistory = function deleteRichHistory() {
  return function (dispatch) {
    Object(app_core_utils_richHistory__WEBPACK_IMPORTED_MODULE_7__["deleteAllFromRichHistory"])();
    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["richHistoryUpdatedAction"])({
      richHistory: []
    }));
  };
};
var toRawTimeRange = function toRawTimeRange(range) {
  var from = range.raw.from;

  if (Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["isDateTime"])(from)) {
    from = from.valueOf().toString(10);
  }

  var to = range.raw.to;

  if (Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["isDateTime"])(to)) {
    to = to.valueOf().toString(10);
  }

  return {
    from: from,
    to: to
  };
};
/**
 * Save local redux state back to the URL. Should be called when there is some change that should affect the URL.
 * Not all of the redux state is reflected in URL though.
 */

var stateSave = function stateSave() {
  return function (dispatch, getState) {
    var _getState$explore = getState().explore,
        left = _getState$explore.left,
        right = _getState$explore.right,
        split = _getState$explore.split;
    var orgId = getState().user.orgId.toString();
    var replace = left && left.urlReplaced === false;
    var urlStates = {
      orgId: orgId
    };
    var leftUrlState = {
      datasource: left.datasourceInstance.name,
      queries: left.queries.map(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["clearQueryKeys"]),
      range: toRawTimeRange(left.range),
      ui: {
        showingGraph: left.showingGraph,
        showingLogs: true,
        showingTable: left.showingTable,
        dedupStrategy: left.dedupStrategy
      }
    };
    urlStates.left = Object(_grafana_data_src_utils_url__WEBPACK_IMPORTED_MODULE_17__["serializeStateToUrlParam"])(leftUrlState, true);

    if (split) {
      var rightUrlState = {
        datasource: right.datasourceInstance.name,
        queries: right.queries.map(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["clearQueryKeys"]),
        range: toRawTimeRange(right.range),
        ui: {
          showingGraph: right.showingGraph,
          showingLogs: true,
          showingTable: right.showingTable,
          dedupStrategy: right.dedupStrategy
        }
      };
      urlStates.right = Object(_grafana_data_src_utils_url__WEBPACK_IMPORTED_MODULE_17__["serializeStateToUrlParam"])(rightUrlState, true);
    }

    dispatch(Object(_core_actions__WEBPACK_IMPORTED_MODULE_12__["updateLocation"])({
      query: urlStates,
      replace: replace
    }));

    if (replace) {
      dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["setUrlReplacedAction"])({
        exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].left
      }));
    }
  };
};
var updateTime = function updateTime(config) {
  return function (dispatch, getState) {
    var exploreId = config.exploreId,
        absRange = config.absoluteRange,
        actionRange = config.rawRange;
    var itemState = getState().explore[exploreId];
    var timeZone = Object(app_features_profile_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getTimeZone"])(getState().user);
    var rangeInState = itemState.range;
    var rawRange = rangeInState.raw;

    if (absRange) {
      rawRange = {
        from: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateTimeForTimeZone"])(timeZone, absRange.from),
        to: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateTimeForTimeZone"])(timeZone, absRange.to)
      };
    }

    if (actionRange) {
      rawRange = actionRange;
    }

    var range = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["getTimeRange"])(timeZone, rawRange);
    var absoluteRange = {
      from: range.from.valueOf(),
      to: range.to.valueOf()
    };
    Object(_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_13__["getTimeSrv"])().init(new app_features_dashboard_state__WEBPACK_IMPORTED_MODULE_15__["DashboardModel"]({
      time: range.raw,
      refresh: false,
      timeZone: timeZone
    }));
    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["changeRangeAction"])({
      exploreId: exploreId,
      range: range,
      absoluteRange: absoluteRange
    }));
  };
};
/**
 * Start a scan for more results using the given scanner.
 * @param exploreId Explore area
 * @param scanner Function that a) returns a new time range and b) triggers a query run for the new range
 */

function scanStart(exploreId) {
  return function (dispatch, getState) {
    // Register the scanner
    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["scanStartAction"])({
      exploreId: exploreId
    })); // Scanning must trigger query run, and return the new range

    var range = Object(app_core_utils_timePicker__WEBPACK_IMPORTED_MODULE_11__["getShiftedTimeRange"])(-1, getState().explore[exploreId].range); // Set the new range to be displayed

    dispatch(updateTime({
      exploreId: exploreId,
      absoluteRange: range
    }));
    dispatch(runQueries(exploreId));
  };
}
/**
 * Reset queries to the given queries. Any modifications will be discarded.
 * Use this action for clicks on query examples. Triggers a query run.
 */

function setQueries(exploreId, rawQueries) {
  return function (dispatch, getState) {
    // Inject react keys into query objects
    var queries = getState().explore[exploreId].queries;
    var nextQueries = rawQueries.map(function (query, index) {
      return Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["generateNewKeyAndAddRefIdIfMissing"])(query, queries, index);
    });
    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["setQueriesAction"])({
      exploreId: exploreId,
      queries: nextQueries
    }));
    dispatch(runQueries(exploreId));
  };
}
/**
 * Close the split view and save URL state.
 */

function splitClose(itemId) {
  return function (dispatch) {
    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["splitCloseAction"])({
      itemId: itemId
    }));
    dispatch(stateSave());
  };
}
/**
 * Open the split view and the right state is automatically initialized.
 * If options are specified it initializes that pane with the datasource and query from options.
 * Otherwise it copies the left state to be the right state. The copy keeps all query modifications but wipes the query
 * results.
 */

function splitOpen(options) {
  return (
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(dispatch, getState) {
        var leftState, rightState, queryState, urlState, queries, dataSourceSettings;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // Clone left state to become the right state
                leftState = getState().explore[app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].left];
                rightState = _objectSpread({}, leftState);
                queryState = getState().location.query[app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].left];
                urlState = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["parseUrlState"])(queryState);

                if (!options) {
                  _context6.next = 23;
                  break;
                }

                rightState.queries = [];
                rightState.graphResult = null;
                rightState.logsResult = null;
                rightState.tableResult = null;
                rightState.queryKeys = [];
                urlState.queries = [];
                rightState.urlState = urlState;
                dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["splitOpenAction"])({
                  itemState: rightState
                }));
                queries = [_objectSpread({}, options.query, {
                  refId: 'A'
                })];
                dataSourceSettings = Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_5__["getDatasourceSrv"])().getDataSourceSettingsByUid(options.datasourceUid);
                _context6.next = 17;
                return dispatch(changeDatasource(app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].right, dataSourceSettings.name));

              case 17:
                _context6.next = 19;
                return dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["setQueriesAction"])({
                  exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].right,
                  queries: queries
                }));

              case 19:
                _context6.next = 21;
                return dispatch(runQueries(app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].right));

              case 21:
                _context6.next = 26;
                break;

              case 23:
                rightState.queries = leftState.queries.slice();
                rightState.urlState = urlState;
                dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["splitOpenAction"])({
                  itemState: rightState
                }));

              case 26:
                dispatch(stateSave());

              case 27:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x9, _x10) {
        return _ref7.apply(this, arguments);
      };
    }()
  );
}
/**
 * Syncs time interval, if they are not synced on both panels in a split mode.
 * Unsyncs time interval, if they are synced on both panels in a split mode.
 */

function syncTimes(exploreId) {
  return function (dispatch, getState) {
    if (exploreId === app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].left) {
      var leftState = getState().explore.left;
      dispatch(updateTimeRange({
        exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].right,
        rawRange: leftState.range.raw
      }));
    } else {
      var rightState = getState().explore.right;
      dispatch(updateTimeRange({
        exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].left,
        rawRange: rightState.range.raw
      }));
    }

    var isTimeSynced = getState().explore.syncedTimes;
    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["syncTimesAction"])({
      syncedTimes: !isTimeSynced
    }));
    dispatch(stateSave());
  };
}
/**
 * Creates action to collapse graph/logs/table panel. When panel is collapsed,
 * queries won't be run
 */

var togglePanelActionCreator = function togglePanelActionCreator(actionCreator) {
  return function (exploreId, isPanelVisible) {
    return function (dispatch) {
      var uiFragmentStateUpdate;
      var shouldRunQueries = !isPanelVisible;

      switch (actionCreator.type) {
        case _actionTypes__WEBPACK_IMPORTED_MODULE_9__["toggleGraphAction"].type:
          uiFragmentStateUpdate = {
            showingGraph: !isPanelVisible
          };
          break;

        case _actionTypes__WEBPACK_IMPORTED_MODULE_9__["toggleTableAction"].type:
          uiFragmentStateUpdate = {
            showingTable: !isPanelVisible
          };
          break;
      }

      dispatch(actionCreator({
        exploreId: exploreId
      })); // The switch further up is exhaustive so uiFragmentStateUpdate should definitely be initialized

      dispatch(updateExploreUIState(exploreId, uiFragmentStateUpdate));

      if (shouldRunQueries) {
        dispatch(runQueries(exploreId));
      }
    };
  };
};
/**
 * Expand/collapse the graph result viewer. When collapsed, graph queries won't be run.
 */


var toggleGraph = togglePanelActionCreator(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["toggleGraphAction"]);
/**
 * Expand/collapse the table result viewer. When collapsed, table queries won't be run.
 */

var toggleTable = togglePanelActionCreator(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["toggleTableAction"]);
/**
 * Change logs deduplication strategy and update URL.
 */

var changeDedupStrategy = function changeDedupStrategy(exploreId, dedupStrategy) {
  return function (dispatch) {
    dispatch(updateExploreUIState(exploreId, {
      dedupStrategy: dedupStrategy
    }));
  };
};
/**
 * Reacts to changes in URL state that we need to sync back to our redux state. Checks the internal update variable
 * to see which parts change and need to be synced.
 * @param exploreId
 */

function refreshExplore(exploreId) {
  return function (dispatch, getState) {
    var itemState = getState().explore[exploreId];

    if (!itemState.initialized) {
      return;
    }

    var urlState = itemState.urlState,
        update = itemState.update,
        containerWidth = itemState.containerWidth,
        eventBridge = itemState.eventBridge;

    if (!urlState) {
      return;
    }

    var datasource = urlState.datasource,
        queries = urlState.queries,
        urlRange = urlState.range,
        ui = urlState.ui,
        originPanelId = urlState.originPanelId;
    var refreshQueries = [];

    for (var _index = 0; _index < queries.length; _index++) {
      var query = queries[_index];
      refreshQueries.push(Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["generateNewKeyAndAddRefIdIfMissing"])(query, refreshQueries, _index));
    }

    var timeZone = Object(app_features_profile_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getTimeZone"])(getState().user);
    var range = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["getTimeRangeFromUrl"])(urlRange, timeZone); // need to refresh datasource

    if (update.datasource) {
      var initialQueries = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["ensureQueries"])(queries);
      dispatch(initializeExplore(exploreId, datasource, initialQueries, range, containerWidth, eventBridge, ui, originPanelId));
      return;
    }

    if (update.range) {
      dispatch(updateTime({
        exploreId: exploreId,
        rawRange: range.raw
      }));
    } // need to refresh ui state


    if (update.ui) {
      dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["updateUIStateAction"])(_objectSpread({}, ui, {
        exploreId: exploreId
      })));
    } // need to refresh queries


    if (update.queries) {
      dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["setQueriesAction"])({
        exploreId: exploreId,
        queries: refreshQueries
      }));
    } // always run queries when refresh is needed


    if (update.queries || update.ui || update.range) {
      dispatch(runQueries(exploreId));
    }
  };
}
var navigateToExplore = function navigateToExplore(panel, dependencies) {
  return (
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(dispatch) {
        var getDataSourceSrv, getTimeSrv, getExploreUrl, openInNewWindow, datasourceSrv, datasource, path, query;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                getDataSourceSrv = dependencies.getDataSourceSrv, getTimeSrv = dependencies.getTimeSrv, getExploreUrl = dependencies.getExploreUrl, openInNewWindow = dependencies.openInNewWindow;
                datasourceSrv = getDataSourceSrv();
                _context7.next = 4;
                return datasourceSrv.get(panel.datasource);

              case 4:
                datasource = _context7.sent;
                _context7.next = 7;
                return getExploreUrl({
                  panel: panel,
                  panelTargets: panel.targets,
                  panelDatasource: datasource,
                  datasourceSrv: datasourceSrv,
                  timeSrv: getTimeSrv()
                });

              case 7:
                path = _context7.sent;

                if (!(openInNewWindow && path)) {
                  _context7.next = 11;
                  break;
                }

                openInNewWindow(path);
                return _context7.abrupt("return");

              case 11:
                query = {}; // strips any angular query param

                dispatch(Object(_core_actions__WEBPACK_IMPORTED_MODULE_12__["updateLocation"])({
                  path: path,
                  query: query
                }));

              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x11) {
        return _ref8.apply(this, arguments);
      };
    }()
  );
};

/***/ }),

/***/ "./public/app/features/explore/state/selectors.ts":
/*!********************************************************!*\
  !*** ./public/app/features/explore/state/selectors.ts ***!
  \********************************************************/
/*! exports provided: deduplicatedRowsSelector, getExploreDatasources */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deduplicatedRowsSelector", function() { return deduplicatedRowsSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExploreDatasources", function() { return getExploreDatasources; });
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reselect */ "./node_modules/reselect/es/index.js");
/* harmony import */ var app_core_logs_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/logs_model */ "./public/app/core/logs_model.ts");
/* harmony import */ var _plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");




var logsRowsSelector = function logsRowsSelector(state) {
  return state.logsResult && state.logsResult.rows;
};

var hiddenLogLevelsSelector = function hiddenLogLevelsSelector(state) {
  return state.hiddenLogLevels;
};

var dedupStrategySelector = function dedupStrategySelector(state) {
  return state.dedupStrategy;
};

var deduplicatedRowsSelector = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(logsRowsSelector, hiddenLogLevelsSelector, dedupStrategySelector, function dedupRows(rows, hiddenLogLevels, dedupStrategy) {
  if (!(rows && rows.length)) {
    return rows;
  }

  var filteredRows = Object(app_core_logs_model__WEBPACK_IMPORTED_MODULE_1__["filterLogLevels"])(rows, new Set(hiddenLogLevels));
  return Object(app_core_logs_model__WEBPACK_IMPORTED_MODULE_1__["dedupLogRows"])(filteredRows, dedupStrategy);
});
var getExploreDatasources = function getExploreDatasources() {
  return Object(_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_2__["getDatasourceSrv"])().getExternal().map(function (ds) {
    return {
      value: ds.name,
      name: ds.name,
      meta: ds.meta
    };
  });
};

/***/ }),

/***/ "./public/app/features/profile/state/selectors.ts":
/*!********************************************************!*\
  !*** ./public/app/features/profile/state/selectors.ts ***!
  \********************************************************/
/*! exports provided: getTimeZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimeZone", function() { return getTimeZone; });
var getTimeZone = function getTimeZone(state) {
  return state.timeZone;
};

/***/ })

}]);
//# sourceMappingURL=default~DashboardPage~SoloPanelPage~explore.1ebdc265fc3bd7452fcd.js.map