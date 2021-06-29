(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~TeamList~TeamPages"],{

/***/ "./public/app/features/teams/state/actions.ts":
/*!****************************************************!*\
  !*** ./public/app/features/teams/state/actions.ts ***!
  \****************************************************/
/*! exports provided: loadTeams, loadTeam, loadTeamMembers, addTeamMember, removeTeamMember, updateTeam, loadTeamGroups, addTeamGroup, removeTeamGroup, deleteTeam, updateTeamMember */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTeams", function() { return loadTeams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTeam", function() { return loadTeam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTeamMembers", function() { return loadTeamMembers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addTeamMember", function() { return addTeamMember; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeTeamMember", function() { return removeTeamMember; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateTeam", function() { return updateTeam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTeamGroups", function() { return loadTeamGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addTeamGroup", function() { return addTeamGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeTeamGroup", function() { return removeTeamGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteTeam", function() { return deleteTeam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateTeamMember", function() { return updateTeamMember; });
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var _navModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navModel */ "./public/app/features/teams/state/navModel.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reducers */ "./public/app/features/teams/state/reducers.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





function loadTeams() {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dispatch) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().get('/api/teams/search', {
                  perpage: 1000,
                  page: 1
                });

              case 2:
                response = _context.sent;
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_3__["teamsLoaded"])(response.teams));

              case 4:
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
function loadTeam(id) {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(dispatch) {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().get("/api/teams/".concat(id));

              case 2:
                response = _context2.sent;
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_3__["teamLoaded"])(response));
                dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_1__["updateNavIndex"])(Object(_navModel__WEBPACK_IMPORTED_MODULE_2__["buildNavModel"])(response)));

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
function loadTeamMembers() {
  return (
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(dispatch, getStore) {
        var team, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                team = getStore().team.team;
                _context3.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().get("/api/teams/".concat(team.id, "/members"));

              case 3:
                response = _context3.sent;
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_3__["teamMembersLoaded"])(response));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3, _x4) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
}
function addTeamMember(id) {
  return (
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(dispatch, getStore) {
        var team;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                team = getStore().team.team;
                _context4.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().post("/api/teams/".concat(team.id, "/members"), {
                  userId: id
                });

              case 3:
                dispatch(loadTeamMembers());

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x5, _x6) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
}
function removeTeamMember(id) {
  return (
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(dispatch, getStore) {
        var team;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                team = getStore().team.team;
                _context5.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().delete("/api/teams/".concat(team.id, "/members/").concat(id));

              case 3:
                dispatch(loadTeamMembers());

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x7, _x8) {
        return _ref5.apply(this, arguments);
      };
    }()
  );
}
function updateTeam(name, email) {
  return (
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(dispatch, getStore) {
        var team;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                team = getStore().team.team;
                _context6.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().put("/api/teams/".concat(team.id), {
                  name: name,
                  email: email
                });

              case 3:
                dispatch(loadTeam(team.id));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x9, _x10) {
        return _ref6.apply(this, arguments);
      };
    }()
  );
}
function loadTeamGroups() {
  return (
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(dispatch, getStore) {
        var team, response;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                team = getStore().team.team;
                _context7.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().get("/api/teams/".concat(team.id, "/groups"));

              case 3:
                response = _context7.sent;
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_3__["teamGroupsLoaded"])(response));

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x11, _x12) {
        return _ref7.apply(this, arguments);
      };
    }()
  );
}
function addTeamGroup(groupId) {
  return (
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(dispatch, getStore) {
        var team;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                team = getStore().team.team;
                _context8.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().post("/api/teams/".concat(team.id, "/groups"), {
                  groupId: groupId
                });

              case 3:
                dispatch(loadTeamGroups());

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      return function (_x13, _x14) {
        return _ref8.apply(this, arguments);
      };
    }()
  );
}
function removeTeamGroup(groupId) {
  return (
    /*#__PURE__*/
    function () {
      var _ref9 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(dispatch, getStore) {
        var team;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                team = getStore().team.team;
                _context9.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().delete("/api/teams/".concat(team.id, "/groups/").concat(encodeURIComponent(groupId)));

              case 3:
                dispatch(loadTeamGroups());

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      return function (_x15, _x16) {
        return _ref9.apply(this, arguments);
      };
    }()
  );
}
function deleteTeam(id) {
  return (
    /*#__PURE__*/
    function () {
      var _ref10 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(dispatch) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().delete("/api/teams/".concat(id));

              case 2:
                dispatch(loadTeams());

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      return function (_x17) {
        return _ref10.apply(this, arguments);
      };
    }()
  );
}
function updateTeamMember(member) {
  return (
    /*#__PURE__*/
    function () {
      var _ref11 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(dispatch) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"])().put("/api/teams/".concat(member.teamId, "/members/").concat(member.userId), {
                  permission: member.permission
                });

              case 2:
                dispatch(loadTeamMembers());

              case 3:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      return function (_x18) {
        return _ref11.apply(this, arguments);
      };
    }()
  );
}

/***/ }),

/***/ "./public/app/features/teams/state/navModel.ts":
/*!*****************************************************!*\
  !*** ./public/app/features/teams/state/navModel.ts ***!
  \*****************************************************/
/*! exports provided: buildNavModel, getTeamLoadingNav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildNavModel", function() { return buildNavModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeamLoadingNav", function() { return getTeamLoadingNav; });
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");


function buildNavModel(team) {
  var navModel = {
    img: team.avatarUrl,
    id: 'team-' + team.id,
    subTitle: '管理成员和设置',
    url: '',
    text: team.name,
    breadcrumbs: [{
      title: '团队',
      url: 'org/teams'
    }],
    children: [{
      active: false,
      icon: 'users-alt',
      id: "team-members-".concat(team.id),
      text: '成员',
      url: "org/teams/edit/".concat(team.id, "/members")
    }, {
      active: false,
      icon: 'sliders-v-alt',
      id: "team-settings-".concat(team.id),
      text: '设置',
      url: "org/teams/edit/".concat(team.id, "/settings")
    }]
  };

  if (app_core_config__WEBPACK_IMPORTED_MODULE_1__["default"].licenseInfo.hasLicense) {
    navModel.children.push({
      active: false,
      icon: 'sync',
      id: "team-groupsync-".concat(team.id),
      text: '外部组同步',
      url: "org/teams/edit/".concat(team.id, "/groupsync")
    });
  }

  return navModel;
}
function getTeamLoadingNav(pageName) {
  var main = buildNavModel({
    avatarUrl: 'public/img/user_profile.png',
    id: 1,
    name: 'Loading',
    email: 'loading',
    memberCount: 0,
    permission: app_types__WEBPACK_IMPORTED_MODULE_0__["TeamPermissionLevel"].Member
  });
  var node; // find active page

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = main.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var child = _step.value;

      if (child.id.indexOf(pageName) > 0) {
        child.active = true;
        node = child;
        break;
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

  return {
    main: main,
    node: node
  };
}

/***/ }),

/***/ "./public/app/features/teams/state/selectors.ts":
/*!******************************************************!*\
  !*** ./public/app/features/teams/state/selectors.ts ***!
  \******************************************************/
/*! exports provided: getSearchQuery, getSearchMemberQuery, getTeamGroups, getTeamsCount, getTeam, getTeams, getTeamMembers, isSignedInUserTeamAdmin, isPermissionTeamAdmin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSearchQuery", function() { return getSearchQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSearchMemberQuery", function() { return getSearchMemberQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeamGroups", function() { return getTeamGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeamsCount", function() { return getTeamsCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeam", function() { return getTeam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeams", function() { return getTeams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeamMembers", function() { return getTeamMembers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSignedInUserTeamAdmin", function() { return isSignedInUserTeamAdmin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPermissionTeamAdmin", function() { return isPermissionTeamAdmin; });
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");

var getSearchQuery = function getSearchQuery(state) {
  return state.searchQuery;
};
var getSearchMemberQuery = function getSearchMemberQuery(state) {
  return state.searchMemberQuery;
};
var getTeamGroups = function getTeamGroups(state) {
  return state.groups;
};
var getTeamsCount = function getTeamsCount(state) {
  return state.teams.length;
};
var getTeam = function getTeam(state, currentTeamId) {
  if (state.team.id === parseInt(currentTeamId, 10)) {
    return state.team;
  }

  return null;
};
var getTeams = function getTeams(state) {
  var regex = RegExp(state.searchQuery, 'i');
  return state.teams.filter(function (team) {
    return regex.test(team.name);
  });
};
var getTeamMembers = function getTeamMembers(state) {
  var regex = RegExp(state.searchMemberQuery, 'i');
  return state.members.filter(function (member) {
    return regex.test(member.login) || regex.test(member.email) || regex.test(member.name);
  });
};
var isSignedInUserTeamAdmin = function isSignedInUserTeamAdmin(config) {
  var members = config.members,
      signedInUser = config.signedInUser,
      editorsCanAdmin = config.editorsCanAdmin;
  var userInMembers = members.find(function (m) {
    return m.userId === signedInUser.id;
  });
  var permission = userInMembers ? userInMembers.permission : app_types__WEBPACK_IMPORTED_MODULE_0__["TeamPermissionLevel"].Member;
  return isPermissionTeamAdmin({
    permission: permission,
    signedInUser: signedInUser,
    editorsCanAdmin: editorsCanAdmin
  });
};
var isPermissionTeamAdmin = function isPermissionTeamAdmin(config) {
  var permission = config.permission,
      signedInUser = config.signedInUser,
      editorsCanAdmin = config.editorsCanAdmin;
  var isAdmin = signedInUser.isGrafanaAdmin || signedInUser.orgRole === app_types__WEBPACK_IMPORTED_MODULE_0__["OrgRole"].Admin;
  var userIsTeamAdmin = permission === app_types__WEBPACK_IMPORTED_MODULE_0__["TeamPermissionLevel"].Admin;
  var isSignedInUserTeamAdmin = isAdmin || userIsTeamAdmin;
  return isSignedInUserTeamAdmin || !editorsCanAdmin;
};

/***/ })

}]);
//# sourceMappingURL=default~TeamList~TeamPages.1ebdc265fc3bd7452fcd.js.map