(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~FolderPermissions~FolderSettingsPage~NewDashboardsFolder"],{

/***/ "./public/app/features/folders/state/actions.ts":
/*!******************************************************!*\
  !*** ./public/app/features/folders/state/actions.ts ***!
  \******************************************************/
/*! exports provided: getFolderByUid, saveFolder, deleteFolder, getFolderPermissions, updateFolderPermission, removeFolderPermission, addFolderPermission, createNewFolder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFolderByUid", function() { return getFolderByUid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveFolder", function() { return saveFolder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteFolder", function() { return deleteFolder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFolderPermissions", function() { return getFolderPermissions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateFolderPermission", function() { return updateFolderPermission; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFolderPermission", function() { return removeFolderPermission; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFolderPermission", function() { return addFolderPermission; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNewFolder", function() { return createNewFolder; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var _navModel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navModel */ "./public/app/features/folders/state/navModel.ts");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./reducers */ "./public/app/features/folders/state/reducers.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








function getFolderByUid(uid) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dispatch) {
        var folder;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["backendSrv"].getFolderByUid(uid);

              case 2:
                folder = _context.sent;
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_6__["loadFolder"])(folder));
                dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateNavIndex"])(Object(_navModel__WEBPACK_IMPORTED_MODULE_4__["buildNavModel"])(folder)));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}
function saveFolder(folder) {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(dispatch) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["backendSrv"].put("/api/folders/".concat(folder.uid), {
                  title: folder.title,
                  version: folder.version
                });

              case 2:
                res = _context2.sent;
                // this should be redux action at some point
                app_core_app_events__WEBPACK_IMPORTED_MODULE_5__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["AppEvents"].alertSuccess, ['文件夹已保存']);
                dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateLocation"])({
                  path: "".concat(res.url, "/settings")
                }));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
}
function deleteFolder(uid) {
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(dispatch) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["backendSrv"].delete("/api/folders/".concat(uid));

              case 2:
                dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateLocation"])({
                  path: "dashboards"
                }));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
}
function getFolderPermissions(uid) {
  return (
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(dispatch) {
        var permissions;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["backendSrv"].get("/api/folders/".concat(uid, "/permissions"));

              case 2:
                permissions = _context4.sent;
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_6__["loadFolderPermissions"])(permissions));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
}

function toUpdateItem(item) {
  return {
    userId: item.userId,
    teamId: item.teamId,
    role: item.role,
    permission: item.permission
  };
}

function updateFolderPermission(itemToUpdate, level) {
  return (
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(dispatch, getStore) {
        var folder, itemsToUpdate, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, updated;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                folder = getStore().folder;
                itemsToUpdate = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context5.prev = 5;
                _iterator = folder.permissions[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context5.next = 17;
                  break;
                }

                item = _step.value;

                if (!item.inherited) {
                  _context5.next = 11;
                  break;
                }

                return _context5.abrupt("continue", 14);

              case 11:
                updated = toUpdateItem(item); // if this is the item we want to update, update it's permission

                if (itemToUpdate === item) {
                  updated.permission = level;
                }

                itemsToUpdate.push(updated);

              case 14:
                _iteratorNormalCompletion = true;
                _context5.next = 7;
                break;

              case 17:
                _context5.next = 23;
                break;

              case 19:
                _context5.prev = 19;
                _context5.t0 = _context5["catch"](5);
                _didIteratorError = true;
                _iteratorError = _context5.t0;

              case 23:
                _context5.prev = 23;
                _context5.prev = 24;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 26:
                _context5.prev = 26;

                if (!_didIteratorError) {
                  _context5.next = 29;
                  break;
                }

                throw _iteratorError;

              case 29:
                return _context5.finish(26);

              case 30:
                return _context5.finish(23);

              case 31:
                _context5.next = 33;
                return app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["backendSrv"].post("/api/folders/".concat(folder.uid, "/permissions"), {
                  items: itemsToUpdate
                });

              case 33:
                _context5.next = 35;
                return dispatch(getFolderPermissions(folder.uid));

              case 35:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[5, 19, 23, 31], [24,, 26, 30]]);
      }));

      return function (_x5, _x6) {
        return _ref5.apply(this, arguments);
      };
    }()
  );
}
function removeFolderPermission(itemToDelete) {
  return (
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(dispatch, getStore) {
        var folder, itemsToUpdate, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                folder = getStore().folder;
                itemsToUpdate = [];
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context6.prev = 5;
                _iterator2 = folder.permissions[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context6.next = 15;
                  break;
                }

                item = _step2.value;

                if (!(item.inherited || item === itemToDelete)) {
                  _context6.next = 11;
                  break;
                }

                return _context6.abrupt("continue", 12);

              case 11:
                itemsToUpdate.push(toUpdateItem(item));

              case 12:
                _iteratorNormalCompletion2 = true;
                _context6.next = 7;
                break;

              case 15:
                _context6.next = 21;
                break;

              case 17:
                _context6.prev = 17;
                _context6.t0 = _context6["catch"](5);
                _didIteratorError2 = true;
                _iteratorError2 = _context6.t0;

              case 21:
                _context6.prev = 21;
                _context6.prev = 22;

                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }

              case 24:
                _context6.prev = 24;

                if (!_didIteratorError2) {
                  _context6.next = 27;
                  break;
                }

                throw _iteratorError2;

              case 27:
                return _context6.finish(24);

              case 28:
                return _context6.finish(21);

              case 29:
                _context6.next = 31;
                return app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["backendSrv"].post("/api/folders/".concat(folder.uid, "/permissions"), {
                  items: itemsToUpdate
                });

              case 31:
                _context6.next = 33;
                return dispatch(getFolderPermissions(folder.uid));

              case 33:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[5, 17, 21, 29], [22,, 24, 28]]);
      }));

      return function (_x7, _x8) {
        return _ref6.apply(this, arguments);
      };
    }()
  );
}
function addFolderPermission(newItem) {
  return (
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(dispatch, getStore) {
        var folder, itemsToUpdate, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                folder = getStore().folder;
                itemsToUpdate = [];
                _iteratorNormalCompletion3 = true;
                _didIteratorError3 = false;
                _iteratorError3 = undefined;
                _context7.prev = 5;
                _iterator3 = folder.permissions[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                  _context7.next = 15;
                  break;
                }

                item = _step3.value;

                if (!item.inherited) {
                  _context7.next = 11;
                  break;
                }

                return _context7.abrupt("continue", 12);

              case 11:
                itemsToUpdate.push(toUpdateItem(item));

              case 12:
                _iteratorNormalCompletion3 = true;
                _context7.next = 7;
                break;

              case 15:
                _context7.next = 21;
                break;

              case 17:
                _context7.prev = 17;
                _context7.t0 = _context7["catch"](5);
                _didIteratorError3 = true;
                _iteratorError3 = _context7.t0;

              case 21:
                _context7.prev = 21;
                _context7.prev = 22;

                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                  _iterator3.return();
                }

              case 24:
                _context7.prev = 24;

                if (!_didIteratorError3) {
                  _context7.next = 27;
                  break;
                }

                throw _iteratorError3;

              case 27:
                return _context7.finish(24);

              case 28:
                return _context7.finish(21);

              case 29:
                itemsToUpdate.push({
                  userId: newItem.userId,
                  teamId: newItem.teamId,
                  role: newItem.role,
                  permission: newItem.permission
                });
                _context7.next = 32;
                return app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["backendSrv"].post("/api/folders/".concat(folder.uid, "/permissions"), {
                  items: itemsToUpdate
                });

              case 32:
                _context7.next = 34;
                return dispatch(getFolderPermissions(folder.uid));

              case 34:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[5, 17, 21, 29], [22,, 24, 28]]);
      }));

      return function (_x9, _x10) {
        return _ref7.apply(this, arguments);
      };
    }()
  );
}
function createNewFolder(folderName) {
  return (
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(dispatch) {
        var newFolder;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post('/api/folders', {
                  title: folderName
                });

              case 2:
                newFolder = _context8.sent;
                app_core_app_events__WEBPACK_IMPORTED_MODULE_5__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["AppEvents"].alertSuccess, ['文件夹已创建', 'OK']);
                dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateLocation"])({
                  path: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["locationUtil"].stripBaseFromUrl(newFolder.url)
                }));

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      return function (_x11) {
        return _ref8.apply(this, arguments);
      };
    }()
  );
}

/***/ }),

/***/ "./public/app/features/folders/state/navModel.ts":
/*!*******************************************************!*\
  !*** ./public/app/features/folders/state/navModel.ts ***!
  \*******************************************************/
/*! exports provided: buildNavModel, getLoadingNav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildNavModel", function() { return buildNavModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLoadingNav", function() { return getLoadingNav; });
function buildNavModel(folder) {
  return {
    icon: 'folder',
    id: 'manage-folder',
    subTitle: '管理文件夹仪表板和权限',
    url: '',
    text: folder.title,
    breadcrumbs: [{
      title: '仪表板',
      url: 'dashboards'
    }],
    children: [{
      active: false,
      icon: 'apps',
      id: "folder-dashboards-".concat(folder.uid),
      text: '仪表板',
      url: folder.url
    }, {
      active: false,
      icon: 'lock',
      id: "folder-permissions-".concat(folder.uid),
      text: '权限',
      url: "".concat(folder.url, "/permissions")
    }, {
      active: false,
      icon: 'cog',
      id: "folder-settings-".concat(folder.uid),
      text: '设置',
      url: "".concat(folder.url, "/settings")
    }]
  };
}
function getLoadingNav(tabIndex) {
  var main = buildNavModel({
    id: 1,
    uid: 'loading',
    title: '加载中',
    url: 'url',
    canSave: false,
    canEdit: false,
    canAdmin: false,
    version: 0
  });
  main.children[tabIndex].active = true;
  return {
    main: main,
    node: main.children[tabIndex]
  };
}

/***/ })

}]);
//# sourceMappingURL=default~FolderPermissions~FolderSettingsPage~NewDashboardsFolder.1ebdc265fc3bd7452fcd.js.map