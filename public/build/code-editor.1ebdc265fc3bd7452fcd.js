(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["code-editor"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-action-bar {\r\n\ttext-align: right;\r\n\toverflow: hidden;\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.monaco-action-bar .actions-container {\r\n\tdisplay: flex;\r\n\tmargin: 0 auto;\r\n\tpadding: 0;\r\n\twidth: 100%;\r\n\tjustify-content: flex-end;\r\n}\r\n\r\n.monaco-action-bar.vertical .actions-container {\r\n\tdisplay: inline-block;\r\n}\r\n\r\n.monaco-action-bar.reverse .actions-container {\r\n\tflex-direction: row-reverse;\r\n}\r\n\r\n.monaco-action-bar .action-item {\r\n\tcursor: pointer;\r\n\tdisplay: inline-block;\r\n\ttransition: transform 50ms ease;\r\n\tposition: relative;  /* DO NOT REMOVE - this is the key to preventing the ghosting icon bug in Chrome 42 */\r\n}\r\n\r\n.monaco-action-bar .action-item.disabled {\r\n\tcursor: default;\r\n}\r\n\r\n.monaco-action-bar.animated .action-item.active {\r\n\ttransform: scale(1.272019649, 1.272019649); /* 1.272019649 = √φ */\r\n}\r\n\r\n.monaco-action-bar .action-item .icon,\r\n.monaco-action-bar .action-item .codicon {\r\n\tdisplay: inline-block;\r\n}\r\n\r\n.monaco-action-bar .action-label {\r\n\tfont-size: 11px;\r\n\tmargin-right: 4px;\r\n}\r\n\r\n.monaco-action-bar .action-item.disabled .action-label,\r\n.monaco-action-bar .action-item.disabled .action-label:hover {\r\n\topacity: 0.4;\r\n}\r\n\r\n/* Vertical actions */\r\n\r\n.monaco-action-bar.vertical {\r\n\ttext-align: left;\r\n}\r\n\r\n.monaco-action-bar.vertical .action-item {\r\n\tdisplay: block;\r\n}\r\n\r\n.monaco-action-bar.vertical .action-label.separator {\r\n\tdisplay: block;\r\n\tborder-bottom: 1px solid #bbb;\r\n\tpadding-top: 1px;\r\n\tmargin-left: .8em;\r\n\tmargin-right: .8em;\r\n}\r\n\r\n.monaco-action-bar.animated.vertical .action-item.active {\r\n\ttransform: translate(5px, 0);\r\n}\r\n\r\n.secondary-actions .monaco-action-bar .action-label {\r\n\tmargin-left: 6px;\r\n}\r\n\r\n/* Action Items */\r\n.monaco-action-bar .action-item.select-container {\r\n\toverflow: hidden; /* somehow the dropdown overflows its container, we prevent it here to not push */\r\n\tflex: 1;\r\n\tmax-width: 170px;\r\n\tmin-width: 60px;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\tmargin-right: 10px;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/aria/aria.css":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/aria/aria.css ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-aria-container {\r\n\tposition: absolute; /* try to hide from window but not from screen readers */\r\n\tleft:-999em;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon-animations.css":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon-animations.css ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n@keyframes codicon-spin {\r\n\t100% {\r\n\t\ttransform:rotate(360deg);\r\n\t}\r\n}\r\n\r\n.codicon-animation-spin {\r\n\tanimation: codicon-spin 1.5s linear infinite;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon.css":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon.css ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ../../../../../../../../css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ./codicon.ttf */ "./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon.ttf");
exports = ___CSS_LOADER_API_IMPORT___(false);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n@font-face {\r\n\tfont-family: \"codicon\";\r\n\tsrc: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"truetype\");\r\n}\r\n\r\n.codicon[class*='codicon-'] {\r\n\tfont: normal normal normal 16px/1 codicon;\r\n\tdisplay: inline-block;\r\n\ttext-decoration: none;\r\n\ttext-rendering: auto;\r\n\ttext-align: center;\r\n\t-webkit-font-smoothing: antialiased;\r\n\t-moz-osx-font-smoothing: grayscale;\r\n\tuser-select: none;\r\n\t-webkit-user-select: none;\r\n\t-ms-user-select: none;\r\n}\r\n\r\n\r\n.codicon-add:before { content: \"\\ea60\" }\r\n.codicon-plus:before { content: \"\\ea60\" }\r\n.codicon-gist-new:before { content: \"\\ea60\" }\r\n.codicon-repo-create:before { content: \"\\ea60\" }\r\n.codicon-lightbulb:before { content: \"\\ea61\" }\r\n.codicon-light-bulb:before { content: \"\\ea61\" }\r\n.codicon-repo:before { content: \"\\ea62\" }\r\n.codicon-repo-delete:before { content: \"\\ea62\" }\r\n.codicon-gist-fork:before { content: \"\\ea63\" }\r\n.codicon-repo-forked:before { content: \"\\ea63\" }\r\n.codicon-git-pull-request:before { content: \"\\ea64\" }\r\n.codicon-git-pull-request-abandoned:before { content: \"\\ea64\" }\r\n.codicon-record-keys:before { content: \"\\ea65\" }\r\n.codicon-keyboard:before { content: \"\\ea65\" }\r\n.codicon-tag:before { content: \"\\ea66\" }\r\n.codicon-tag-add:before { content: \"\\ea66\" }\r\n.codicon-tag-remove:before { content: \"\\ea66\" }\r\n.codicon-person:before { content: \"\\ea67\" }\r\n.codicon-person-add:before { content: \"\\ea67\" }\r\n.codicon-person-follow:before { content: \"\\ea67\" }\r\n.codicon-person-outline:before { content: \"\\ea67\" }\r\n.codicon-person-filled:before { content: \"\\ea67\" }\r\n.codicon-git-branch:before { content: \"\\ea68\" }\r\n.codicon-git-branch-create:before { content: \"\\ea68\" }\r\n.codicon-git-branch-delete:before { content: \"\\ea68\" }\r\n.codicon-source-control:before { content: \"\\ea68\" }\r\n.codicon-mirror:before { content: \"\\ea69\" }\r\n.codicon-mirror-public:before { content: \"\\ea69\" }\r\n.codicon-star:before { content: \"\\ea6a\" }\r\n.codicon-star-add:before { content: \"\\ea6a\" }\r\n.codicon-star-delete:before { content: \"\\ea6a\" }\r\n.codicon-star-empty:before { content: \"\\ea6a\" }\r\n.codicon-comment:before { content: \"\\ea6b\" }\r\n.codicon-comment-add:before { content: \"\\ea6b\" }\r\n.codicon-alert:before { content: \"\\ea6c\" }\r\n.codicon-warning:before { content: \"\\ea6c\" }\r\n.codicon-search:before { content: \"\\ea6d\" }\r\n.codicon-search-save:before { content: \"\\ea6d\" }\r\n.codicon-log-out:before { content: \"\\ea6e\" }\r\n.codicon-sign-out:before { content: \"\\ea6e\" }\r\n.codicon-log-in:before { content: \"\\ea6f\" }\r\n.codicon-sign-in:before { content: \"\\ea6f\" }\r\n.codicon-eye:before { content: \"\\ea70\" }\r\n.codicon-eye-unwatch:before { content: \"\\ea70\" }\r\n.codicon-eye-watch:before { content: \"\\ea70\" }\r\n.codicon-circle-filled:before { content: \"\\ea71\" }\r\n.codicon-primitive-dot:before { content: \"\\ea71\" }\r\n.codicon-close-dirty:before { content: \"\\ea71\" }\r\n.codicon-debug-breakpoint:before { content: \"\\ea71\" }\r\n.codicon-debug-breakpoint-disabled:before { content: \"\\ea71\" }\r\n.codicon-debug-hint:before { content: \"\\ea71\" }\r\n.codicon-primitive-square:before { content: \"\\ea72\" }\r\n.codicon-edit:before { content: \"\\ea73\" }\r\n.codicon-pencil:before { content: \"\\ea73\" }\r\n.codicon-info:before { content: \"\\ea74\" }\r\n.codicon-issue-opened:before { content: \"\\ea74\" }\r\n.codicon-gist-private:before { content: \"\\ea75\" }\r\n.codicon-git-fork-private:before { content: \"\\ea75\" }\r\n.codicon-lock:before { content: \"\\ea75\" }\r\n.codicon-mirror-private:before { content: \"\\ea75\" }\r\n.codicon-close:before { content: \"\\ea76\" }\r\n.codicon-remove-close:before { content: \"\\ea76\" }\r\n.codicon-x:before { content: \"\\ea76\" }\r\n.codicon-repo-sync:before { content: \"\\ea77\" }\r\n.codicon-sync:before { content: \"\\ea77\" }\r\n.codicon-clone:before { content: \"\\ea78\" }\r\n.codicon-desktop-download:before { content: \"\\ea78\" }\r\n.codicon-beaker:before { content: \"\\ea79\" }\r\n.codicon-microscope:before { content: \"\\ea79\" }\r\n.codicon-vm:before { content: \"\\ea7a\" }\r\n.codicon-device-desktop:before { content: \"\\ea7a\" }\r\n.codicon-file:before { content: \"\\ea7b\" }\r\n.codicon-file-text:before { content: \"\\ea7b\" }\r\n.codicon-more:before { content: \"\\ea7c\" }\r\n.codicon-ellipsis:before { content: \"\\ea7c\" }\r\n.codicon-kebab-horizontal:before { content: \"\\ea7c\" }\r\n.codicon-mail-reply:before { content: \"\\ea7d\" }\r\n.codicon-reply:before { content: \"\\ea7d\" }\r\n.codicon-organization:before { content: \"\\ea7e\" }\r\n.codicon-organization-filled:before { content: \"\\ea7e\" }\r\n.codicon-organization-outline:before { content: \"\\ea7e\" }\r\n.codicon-new-file:before { content: \"\\ea7f\" }\r\n.codicon-file-add:before { content: \"\\ea7f\" }\r\n.codicon-new-folder:before { content: \"\\ea80\" }\r\n.codicon-file-directory-create:before { content: \"\\ea80\" }\r\n.codicon-trash:before { content: \"\\ea81\" }\r\n.codicon-trashcan:before { content: \"\\ea81\" }\r\n.codicon-history:before { content: \"\\ea82\" }\r\n.codicon-clock:before { content: \"\\ea82\" }\r\n.codicon-folder:before { content: \"\\ea83\" }\r\n.codicon-file-directory:before { content: \"\\ea83\" }\r\n.codicon-symbol-folder:before { content: \"\\ea83\" }\r\n.codicon-logo-github:before { content: \"\\ea84\" }\r\n.codicon-mark-github:before { content: \"\\ea84\" }\r\n.codicon-github:before { content: \"\\ea84\" }\r\n.codicon-terminal:before { content: \"\\ea85\" }\r\n.codicon-console:before { content: \"\\ea85\" }\r\n.codicon-repl:before { content: \"\\ea85\" }\r\n.codicon-zap:before { content: \"\\ea86\" }\r\n.codicon-symbol-event:before { content: \"\\ea86\" }\r\n.codicon-error:before { content: \"\\ea87\" }\r\n.codicon-stop:before { content: \"\\ea87\" }\r\n.codicon-variable:before { content: \"\\ea88\" }\r\n.codicon-symbol-variable:before { content: \"\\ea88\" }\r\n.codicon-array:before { content: \"\\ea8a\" }\r\n.codicon-symbol-array:before { content: \"\\ea8a\" }\r\n.codicon-symbol-module:before { content: \"\\ea8b\" }\r\n.codicon-symbol-package:before { content: \"\\ea8b\" }\r\n.codicon-symbol-namespace:before { content: \"\\ea8b\" }\r\n.codicon-symbol-object:before { content: \"\\ea8b\" }\r\n.codicon-symbol-method:before { content: \"\\ea8c\" }\r\n.codicon-symbol-function:before { content: \"\\ea8c\" }\r\n.codicon-symbol-constructor:before { content: \"\\ea8c\" }\r\n.codicon-symbol-boolean:before { content: \"\\ea8f\" }\r\n.codicon-symbol-null:before { content: \"\\ea8f\" }\r\n.codicon-symbol-numeric:before { content: \"\\ea90\" }\r\n.codicon-symbol-number:before { content: \"\\ea90\" }\r\n.codicon-symbol-structure:before { content: \"\\ea91\" }\r\n.codicon-symbol-struct:before { content: \"\\ea91\" }\r\n.codicon-symbol-parameter:before { content: \"\\ea92\" }\r\n.codicon-symbol-type-parameter:before { content: \"\\ea92\" }\r\n.codicon-symbol-key:before { content: \"\\ea93\" }\r\n.codicon-symbol-text:before { content: \"\\ea93\" }\r\n.codicon-symbol-reference:before { content: \"\\ea94\" }\r\n.codicon-go-to-file:before { content: \"\\ea94\" }\r\n.codicon-symbol-enum:before { content: \"\\ea95\" }\r\n.codicon-symbol-value:before { content: \"\\ea95\" }\r\n.codicon-symbol-ruler:before { content: \"\\ea96\" }\r\n.codicon-symbol-unit:before { content: \"\\ea96\" }\r\n.codicon-activate-breakpoints:before { content: \"\\ea97\" }\r\n.codicon-archive:before { content: \"\\ea98\" }\r\n.codicon-arrow-both:before { content: \"\\ea99\" }\r\n.codicon-arrow-down:before { content: \"\\ea9a\" }\r\n.codicon-arrow-left:before { content: \"\\ea9b\" }\r\n.codicon-arrow-right:before { content: \"\\ea9c\" }\r\n.codicon-arrow-small-down:before { content: \"\\ea9d\" }\r\n.codicon-arrow-small-left:before { content: \"\\ea9e\" }\r\n.codicon-arrow-small-right:before { content: \"\\ea9f\" }\r\n.codicon-arrow-small-up:before { content: \"\\eaa0\" }\r\n.codicon-arrow-up:before { content: \"\\eaa1\" }\r\n.codicon-bell:before { content: \"\\eaa2\" }\r\n.codicon-bold:before { content: \"\\eaa3\" }\r\n.codicon-book:before { content: \"\\eaa4\" }\r\n.codicon-bookmark:before { content: \"\\eaa5\" }\r\n.codicon-debug-breakpoint-conditional-unverified:before { content: \"\\eaa6\" }\r\n.codicon-debug-breakpoint-conditional:before { content: \"\\eaa7\" }\r\n.codicon-debug-breakpoint-conditional-disabled:before { content: \"\\eaa7\" }\r\n.codicon-debug-breakpoint-data-unverified:before { content: \"\\eaa8\" }\r\n.codicon-debug-breakpoint-data:before { content: \"\\eaa9\" }\r\n.codicon-debug-breakpoint-data-disabled:before { content: \"\\eaa9\" }\r\n.codicon-debug-breakpoint-log-unverified:before { content: \"\\eaaa\" }\r\n.codicon-debug-breakpoint-log:before { content: \"\\eaab\" }\r\n.codicon-debug-breakpoint-log-disabled:before { content: \"\\eaab\" }\r\n.codicon-briefcase:before { content: \"\\eaac\" }\r\n.codicon-broadcast:before { content: \"\\eaad\" }\r\n.codicon-browser:before { content: \"\\eaae\" }\r\n.codicon-bug:before { content: \"\\eaaf\" }\r\n.codicon-calendar:before { content: \"\\eab0\" }\r\n.codicon-case-sensitive:before { content: \"\\eab1\" }\r\n.codicon-check:before { content: \"\\eab2\" }\r\n.codicon-checklist:before { content: \"\\eab3\" }\r\n.codicon-chevron-down:before { content: \"\\eab4\" }\r\n.codicon-chevron-left:before { content: \"\\eab5\" }\r\n.codicon-chevron-right:before { content: \"\\eab6\" }\r\n.codicon-chevron-up:before { content: \"\\eab7\" }\r\n.codicon-chrome-close:before { content: \"\\eab8\" }\r\n.codicon-chrome-maximize:before { content: \"\\eab9\" }\r\n.codicon-chrome-minimize:before { content: \"\\eaba\" }\r\n.codicon-chrome-restore:before { content: \"\\eabb\" }\r\n.codicon-circle-outline:before { content: \"\\eabc\" }\r\n.codicon-debug-breakpoint-unverified:before { content: \"\\eabc\" }\r\n.codicon-circle-slash:before { content: \"\\eabd\" }\r\n.codicon-circuit-board:before { content: \"\\eabe\" }\r\n.codicon-clear-all:before { content: \"\\eabf\" }\r\n.codicon-clippy:before { content: \"\\eac0\" }\r\n.codicon-close-all:before { content: \"\\eac1\" }\r\n.codicon-cloud-download:before { content: \"\\eac2\" }\r\n.codicon-cloud-upload:before { content: \"\\eac3\" }\r\n.codicon-code:before { content: \"\\eac4\" }\r\n.codicon-collapse-all:before { content: \"\\eac5\" }\r\n.codicon-color-mode:before { content: \"\\eac6\" }\r\n.codicon-comment-discussion:before { content: \"\\eac7\" }\r\n.codicon-compare-changes:before { content: \"\\eac8\" }\r\n.codicon-credit-card:before { content: \"\\eac9\" }\r\n.codicon-dash:before { content: \"\\eacc\" }\r\n.codicon-dashboard:before { content: \"\\eacd\" }\r\n.codicon-database:before { content: \"\\eace\" }\r\n.codicon-debug-continue:before { content: \"\\eacf\" }\r\n.codicon-debug-disconnect:before { content: \"\\ead0\" }\r\n.codicon-debug-pause:before { content: \"\\ead1\" }\r\n.codicon-debug-restart:before { content: \"\\ead2\" }\r\n.codicon-debug-start:before { content: \"\\ead3\" }\r\n.codicon-debug-step-into:before { content: \"\\ead4\" }\r\n.codicon-debug-step-out:before { content: \"\\ead5\" }\r\n.codicon-debug-step-over:before { content: \"\\ead6\" }\r\n.codicon-debug-stop:before { content: \"\\ead7\" }\r\n.codicon-debug:before { content: \"\\ead8\" }\r\n.codicon-device-camera-video:before { content: \"\\ead9\" }\r\n.codicon-device-camera:before { content: \"\\eada\" }\r\n.codicon-device-mobile:before { content: \"\\eadb\" }\r\n.codicon-diff-added:before { content: \"\\eadc\" }\r\n.codicon-diff-ignored:before { content: \"\\eadd\" }\r\n.codicon-diff-modified:before { content: \"\\eade\" }\r\n.codicon-diff-removed:before { content: \"\\eadf\" }\r\n.codicon-diff-renamed:before { content: \"\\eae0\" }\r\n.codicon-diff:before { content: \"\\eae1\" }\r\n.codicon-discard:before { content: \"\\eae2\" }\r\n.codicon-editor-layout:before { content: \"\\eae3\" }\r\n.codicon-empty-window:before { content: \"\\eae4\" }\r\n.codicon-exclude:before { content: \"\\eae5\" }\r\n.codicon-extensions:before { content: \"\\eae6\" }\r\n.codicon-eye-closed:before { content: \"\\eae7\" }\r\n.codicon-file-binary:before { content: \"\\eae8\" }\r\n.codicon-file-code:before { content: \"\\eae9\" }\r\n.codicon-file-media:before { content: \"\\eaea\" }\r\n.codicon-file-pdf:before { content: \"\\eaeb\" }\r\n.codicon-file-submodule:before { content: \"\\eaec\" }\r\n.codicon-file-symlink-directory:before { content: \"\\eaed\" }\r\n.codicon-file-symlink-file:before { content: \"\\eaee\" }\r\n.codicon-file-zip:before { content: \"\\eaef\" }\r\n.codicon-files:before { content: \"\\eaf0\" }\r\n.codicon-filter:before { content: \"\\eaf1\" }\r\n.codicon-flame:before { content: \"\\eaf2\" }\r\n.codicon-fold-down:before { content: \"\\eaf3\" }\r\n.codicon-fold-up:before { content: \"\\eaf4\" }\r\n.codicon-fold:before { content: \"\\eaf5\" }\r\n.codicon-folder-active:before { content: \"\\eaf6\" }\r\n.codicon-folder-opened:before { content: \"\\eaf7\" }\r\n.codicon-gear:before { content: \"\\eaf8\" }\r\n.codicon-gift:before { content: \"\\eaf9\" }\r\n.codicon-gist-secret:before { content: \"\\eafa\" }\r\n.codicon-gist:before { content: \"\\eafb\" }\r\n.codicon-git-commit:before { content: \"\\eafc\" }\r\n.codicon-git-compare:before { content: \"\\eafd\" }\r\n.codicon-git-merge:before { content: \"\\eafe\" }\r\n.codicon-github-action:before { content: \"\\eaff\" }\r\n.codicon-github-alt:before { content: \"\\eb00\" }\r\n.codicon-globe:before { content: \"\\eb01\" }\r\n.codicon-grabber:before { content: \"\\eb02\" }\r\n.codicon-graph:before { content: \"\\eb03\" }\r\n.codicon-gripper:before { content: \"\\eb04\" }\r\n.codicon-heart:before { content: \"\\eb05\" }\r\n.codicon-home:before { content: \"\\eb06\" }\r\n.codicon-horizontal-rule:before { content: \"\\eb07\" }\r\n.codicon-hubot:before { content: \"\\eb08\" }\r\n.codicon-inbox:before { content: \"\\eb09\" }\r\n.codicon-issue-closed:before { content: \"\\eb0a\" }\r\n.codicon-issue-reopened:before { content: \"\\eb0b\" }\r\n.codicon-issues:before { content: \"\\eb0c\" }\r\n.codicon-italic:before { content: \"\\eb0d\" }\r\n.codicon-jersey:before { content: \"\\eb0e\" }\r\n.codicon-json:before { content: \"\\eb0f\" }\r\n.codicon-kebab-vertical:before { content: \"\\eb10\" }\r\n.codicon-key:before { content: \"\\eb11\" }\r\n.codicon-law:before { content: \"\\eb12\" }\r\n.codicon-lightbulb-autofix:before { content: \"\\eb13\" }\r\n.codicon-link-external:before { content: \"\\eb14\" }\r\n.codicon-link:before { content: \"\\eb15\" }\r\n.codicon-list-ordered:before { content: \"\\eb16\" }\r\n.codicon-list-unordered:before { content: \"\\eb17\" }\r\n.codicon-live-share:before { content: \"\\eb18\" }\r\n.codicon-loading:before { content: \"\\eb19\" }\r\n.codicon-location:before { content: \"\\eb1a\" }\r\n.codicon-mail-read:before { content: \"\\eb1b\" }\r\n.codicon-mail:before { content: \"\\eb1c\" }\r\n.codicon-markdown:before { content: \"\\eb1d\" }\r\n.codicon-megaphone:before { content: \"\\eb1e\" }\r\n.codicon-mention:before { content: \"\\eb1f\" }\r\n.codicon-milestone:before { content: \"\\eb20\" }\r\n.codicon-mortar-board:before { content: \"\\eb21\" }\r\n.codicon-move:before { content: \"\\eb22\" }\r\n.codicon-multiple-windows:before { content: \"\\eb23\" }\r\n.codicon-mute:before { content: \"\\eb24\" }\r\n.codicon-no-newline:before { content: \"\\eb25\" }\r\n.codicon-note:before { content: \"\\eb26\" }\r\n.codicon-octoface:before { content: \"\\eb27\" }\r\n.codicon-open-preview:before { content: \"\\eb28\" }\r\n.codicon-package:before { content: \"\\eb29\" }\r\n.codicon-paintcan:before { content: \"\\eb2a\" }\r\n.codicon-pin:before { content: \"\\eb2b\" }\r\n.codicon-play:before { content: \"\\eb2c\" }\r\n.codicon-plug:before { content: \"\\eb2d\" }\r\n.codicon-preserve-case:before { content: \"\\eb2e\" }\r\n.codicon-preview:before { content: \"\\eb2f\" }\r\n.codicon-project:before { content: \"\\eb30\" }\r\n.codicon-pulse:before { content: \"\\eb31\" }\r\n.codicon-question:before { content: \"\\eb32\" }\r\n.codicon-quote:before { content: \"\\eb33\" }\r\n.codicon-radio-tower:before { content: \"\\eb34\" }\r\n.codicon-reactions:before { content: \"\\eb35\" }\r\n.codicon-references:before { content: \"\\eb36\" }\r\n.codicon-refresh:before { content: \"\\eb37\" }\r\n.codicon-regex:before { content: \"\\eb38\" }\r\n.codicon-remote-explorer:before { content: \"\\eb39\" }\r\n.codicon-remote:before { content: \"\\eb3a\" }\r\n.codicon-remove:before { content: \"\\eb3b\" }\r\n.codicon-replace-all:before { content: \"\\eb3c\" }\r\n.codicon-replace:before { content: \"\\eb3d\" }\r\n.codicon-repo-clone:before { content: \"\\eb3e\" }\r\n.codicon-repo-force-push:before { content: \"\\eb3f\" }\r\n.codicon-repo-pull:before { content: \"\\eb40\" }\r\n.codicon-repo-push:before { content: \"\\eb41\" }\r\n.codicon-report:before { content: \"\\eb42\" }\r\n.codicon-request-changes:before { content: \"\\eb43\" }\r\n.codicon-rocket:before { content: \"\\eb44\" }\r\n.codicon-root-folder-opened:before { content: \"\\eb45\" }\r\n.codicon-root-folder:before { content: \"\\eb46\" }\r\n.codicon-rss:before { content: \"\\eb47\" }\r\n.codicon-ruby:before { content: \"\\eb48\" }\r\n.codicon-save-all:before { content: \"\\eb49\" }\r\n.codicon-save-as:before { content: \"\\eb4a\" }\r\n.codicon-save:before { content: \"\\eb4b\" }\r\n.codicon-screen-full:before { content: \"\\eb4c\" }\r\n.codicon-screen-normal:before { content: \"\\eb4d\" }\r\n.codicon-search-stop:before { content: \"\\eb4e\" }\r\n.codicon-server:before { content: \"\\eb50\" }\r\n.codicon-settings-gear:before { content: \"\\eb51\" }\r\n.codicon-settings:before { content: \"\\eb52\" }\r\n.codicon-shield:before { content: \"\\eb53\" }\r\n.codicon-smiley:before { content: \"\\eb54\" }\r\n.codicon-sort-precedence:before { content: \"\\eb55\" }\r\n.codicon-split-horizontal:before { content: \"\\eb56\" }\r\n.codicon-split-vertical:before { content: \"\\eb57\" }\r\n.codicon-squirrel:before { content: \"\\eb58\" }\r\n.codicon-star-full:before { content: \"\\eb59\" }\r\n.codicon-star-half:before { content: \"\\eb5a\" }\r\n.codicon-symbol-class:before { content: \"\\eb5b\" }\r\n.codicon-symbol-color:before { content: \"\\eb5c\" }\r\n.codicon-symbol-constant:before { content: \"\\eb5d\" }\r\n.codicon-symbol-enum-member:before { content: \"\\eb5e\" }\r\n.codicon-symbol-field:before { content: \"\\eb5f\" }\r\n.codicon-symbol-file:before { content: \"\\eb60\" }\r\n.codicon-symbol-interface:before { content: \"\\eb61\" }\r\n.codicon-symbol-keyword:before { content: \"\\eb62\" }\r\n.codicon-symbol-misc:before { content: \"\\eb63\" }\r\n.codicon-symbol-operator:before { content: \"\\eb64\" }\r\n.codicon-symbol-property:before { content: \"\\eb65\" }\r\n.codicon-symbol-snippet:before { content: \"\\eb66\" }\r\n.codicon-tasklist:before { content: \"\\eb67\" }\r\n.codicon-telescope:before { content: \"\\eb68\" }\r\n.codicon-text-size:before { content: \"\\eb69\" }\r\n.codicon-three-bars:before { content: \"\\eb6a\" }\r\n.codicon-thumbsdown:before { content: \"\\eb6b\" }\r\n.codicon-thumbsup:before { content: \"\\eb6c\" }\r\n.codicon-tools:before { content: \"\\eb6d\" }\r\n.codicon-triangle-down:before { content: \"\\eb6e\" }\r\n.codicon-triangle-left:before { content: \"\\eb6f\" }\r\n.codicon-triangle-right:before { content: \"\\eb70\" }\r\n.codicon-triangle-up:before { content: \"\\eb71\" }\r\n.codicon-twitter:before { content: \"\\eb72\" }\r\n.codicon-unfold:before { content: \"\\eb73\" }\r\n.codicon-unlock:before { content: \"\\eb74\" }\r\n.codicon-unmute:before { content: \"\\eb75\" }\r\n.codicon-unverified:before { content: \"\\eb76\" }\r\n.codicon-verified:before { content: \"\\eb77\" }\r\n.codicon-versions:before { content: \"\\eb78\" }\r\n.codicon-vm-active:before { content: \"\\eb79\" }\r\n.codicon-vm-outline:before { content: \"\\eb7a\" }\r\n.codicon-vm-running:before { content: \"\\eb7b\" }\r\n.codicon-watch:before { content: \"\\eb7c\" }\r\n.codicon-whitespace:before { content: \"\\eb7d\" }\r\n.codicon-whole-word:before { content: \"\\eb7e\" }\r\n.codicon-window:before { content: \"\\eb7f\" }\r\n.codicon-word-wrap:before { content: \"\\eb80\" }\r\n.codicon-zoom-in:before { content: \"\\eb81\" }\r\n.codicon-zoom-out:before { content: \"\\eb82\" }\r\n.codicon-list-filter:before { content: \"\\eb83\" }\r\n.codicon-list-flat:before { content: \"\\eb84\" }\r\n.codicon-list-selection:before { content: \"\\eb85\" }\r\n.codicon-selection:before { content: \"\\eb85\" }\r\n.codicon-list-tree:before { content: \"\\eb86\" }\r\n.codicon-debug-breakpoint-function-unverified:before { content: \"\\eb87\" }\r\n.codicon-debug-breakpoint-function:before { content: \"\\eb88\" }\r\n.codicon-debug-breakpoint-function-disabled:before { content: \"\\eb88\" }\r\n.codicon-debug-stackframe-active:before { content: \"\\eb89\" }\r\n.codicon-debug-stackframe-dot:before { content: \"\\eb8a\" }\r\n.codicon-debug-stackframe:before { content: \"\\eb8b\" }\r\n.codicon-debug-stackframe-focused:before { content: \"\\eb8b\" }\r\n.codicon-debug-breakpoint-unsupported:before { content: \"\\eb8c\" }\r\n.codicon-symbol-string:before { content: \"\\eb8d\" }\r\n.codicon-debug-reverse-continue:before { content: \"\\eb8e\" }\r\n.codicon-debug-step-back:before { content: \"\\eb8f\" }\r\n.codicon-debug-restart-frame:before { content: \"\\eb90\" }\r\n.codicon-debug-alternate:before { content: \"\\eb91\" }\r\n.codicon-call-incoming:before { content: \"\\eb92\" }\r\n.codicon-call-outgoing:before { content: \"\\eb93\" }\r\n.codicon-menu:before { content: \"\\eb94\" }\r\n.codicon-expand-all:before { content: \"\\eb95\" }\r\n.codicon-feedback:before { content: \"\\eb96\" }\r\n.codicon-group-by-ref-type:before { content: \"\\eb97\" }\r\n.codicon-ungroup-by-ref-type:before { content: \"\\eb98\" }\r\n.codicon-debug-alt:before { content: \"\\f101\" }\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/contextview/contextview.css":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/contextview/contextview.css ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.context-view {\r\n\tposition: absolute;\r\n\tz-index: 2500;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/iconLabel/iconlabel.css":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/iconLabel/iconlabel.css ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n/* ---------- Icon label ---------- */\r\n\r\n.monaco-icon-label {\r\n\tdisplay: flex; /* required for icons support :before rule */\r\n\toverflow: hidden;\r\n\ttext-overflow: ellipsis;\r\n}\r\n\r\n.monaco-icon-label::before {\r\n\r\n\t/* svg icons rendered as background image */\r\n\tbackground-size: 16px;\r\n\tbackground-position: left center;\r\n\tbackground-repeat: no-repeat;\r\n\tpadding-right: 6px;\r\n\twidth: 16px;\r\n\theight: 22px;\r\n\tline-height: inherit !important;\r\n\tdisplay: inline-block;\r\n\r\n\t/* fonts icons */\r\n\t-webkit-font-smoothing: antialiased;\r\n\t-moz-osx-font-smoothing: grayscale;\r\n\tvertical-align: top;\r\n\r\n\tflex-shrink: 0; /* fix for https://github.com/Microsoft/vscode/issues/13787 */\r\n}\r\n\r\n.monaco-icon-label > .monaco-icon-label-container {\r\n\tmin-width: 0;\r\n\toverflow: hidden;\r\n\ttext-overflow: ellipsis;\r\n\tflex: 1;\r\n}\r\n\r\n.monaco-icon-label > .monaco-icon-label-container > .monaco-icon-name-container > .label-name {\r\n\tcolor: inherit;\r\n\twhite-space: pre; /* enable to show labels that include multiple whitespaces */\r\n}\r\n\r\n.monaco-icon-label > .monaco-icon-label-container > .monaco-icon-name-container > .label-name > .label-separator {\r\n\tmargin: 0 2px;\r\n\topacity: 0.5;\r\n}\r\n\r\n.monaco-icon-label > .monaco-icon-label-container > .monaco-icon-description-container > .label-description {\r\n\topacity: .7;\r\n\tmargin-left: 0.5em;\r\n\tfont-size: 0.9em;\r\n\twhite-space: pre; /* enable to show labels that include multiple whitespaces */\r\n}\r\n\r\n.monaco-icon-label.italic > .monaco-icon-label-container > .monaco-icon-name-container > .label-name,\r\n.monaco-icon-label.italic > .monaco-icon-description-container > .label-description {\r\n\tfont-style: italic;\r\n}\r\n\r\n.monaco-icon-label::after {\r\n\topacity: 0.75;\r\n\tfont-size: 90%;\r\n\tfont-weight: 600;\r\n\tpadding: 0 16px 0 5px;\r\n\ttext-align: center;\r\n}\r\n\r\n/* make sure selection color wins when a label is being selected */\r\n.monaco-tree.focused .selected .monaco-icon-label, /* tree */\r\n.monaco-tree.focused .selected .monaco-icon-label::after,\r\n.monaco-list:focus .selected .monaco-icon-label, /* list */\r\n.monaco-list:focus .selected .monaco-icon-label::after\r\n{\r\n\tcolor: inherit !important;\r\n}\r\n\r\n.monaco-tree-row.focused.selected .label-description,\r\n.monaco-tree-row.selected .label-description,\r\n.monaco-list-row.focused.selected .label-description,\r\n.monaco-list-row.selected .label-description {\r\n\topacity: .8;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/list/list.css":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/list/list.css ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-list {\r\n\tposition: relative;\r\n\theight: 100%;\r\n\twidth: 100%;\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.monaco-list.mouse-support {\r\n\tuser-select: none;\r\n\t-webkit-user-select: none;\r\n\t-ms-user-select: none;\r\n}\r\n\r\n.monaco-list > .monaco-scrollable-element {\r\n\theight: 100%;\r\n}\r\n\r\n.monaco-list-rows {\r\n\tposition: relative;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n}\r\n\r\n.monaco-list.horizontal-scrolling .monaco-list-rows {\r\n\twidth: auto;\r\n\tmin-width: 100%;\r\n}\r\n\r\n.monaco-list-row {\r\n\tposition: absolute;\r\n\tbox-sizing:\tborder-box;\r\n\toverflow: hidden;\r\n\twidth: 100%;\r\n}\r\n\r\n.monaco-list.mouse-support .monaco-list-row {\r\n\tcursor: pointer;\r\n\ttouch-action: none;\r\n}\r\n\r\n/* for OS X ballistic scrolling */\r\n.monaco-list-row.scrolling {\r\n\tdisplay: none !important;\r\n}\r\n\r\n/* Focus */\r\n.monaco-list.element-focused, .monaco-list.selection-single, .monaco-list.selection-multiple {\r\n\toutline: 0 !important;\r\n}\r\n\r\n.monaco-list:focus .monaco-list-row.selected .codicon {\r\n\tcolor: inherit;\r\n}\r\n\r\n/* Dnd */\r\n.monaco-drag-image {\r\n\tdisplay: inline-block;\r\n\tpadding: 1px 7px;\r\n\tborder-radius: 10px;\r\n\tfont-size: 12px;\r\n\tposition: absolute;\r\n}\r\n\r\n/* Type filter */\r\n\r\n.monaco-list-type-filter {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tposition: absolute;\r\n\tborder-radius: 2px;\r\n\tpadding: 0px 3px;\r\n\tmax-width: calc(100% - 10px);\r\n\ttext-overflow: ellipsis;\r\n\toverflow: hidden;\r\n\ttext-align: right;\r\n\tbox-sizing: border-box;\r\n\tcursor: all-scroll;\r\n\tfont-size: 13px;\r\n\tline-height: 18px;\r\n\theight: 20px;\r\n\tz-index: 1;\r\n\ttop: 4px;\r\n}\r\n\r\n.monaco-list-type-filter.dragging {\r\n\ttransition: top 0.2s, left 0.2s;\r\n}\r\n\r\n.monaco-list-type-filter.ne {\r\n\tright: 4px;\r\n}\r\n\r\n.monaco-list-type-filter.nw {\r\n\tleft: 4px;\r\n}\r\n\r\n.monaco-list-type-filter > .controls {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tbox-sizing: border-box;\r\n\ttransition: width 0.2s;\r\n\twidth: 0;\r\n}\r\n\r\n.monaco-list-type-filter.dragging > .controls,\r\n.monaco-list-type-filter:hover > .controls {\r\n\twidth: 36px;\r\n}\r\n\r\n.monaco-list-type-filter > .controls > * {\r\n\tborder: none;\r\n\tbox-sizing: border-box;\r\n\t-webkit-appearance: none;\r\n\t-moz-appearance: none;\r\n\tbackground: none;\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tflex-shrink: 0;\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\tcursor: pointer;\r\n}\r\n\r\n.monaco-list-type-filter > .controls > .filter:checked::before {\r\n\tcontent: \"\\eb83\" !important; /* codicon-list-filter */\r\n}\r\n\r\n.monaco-list-type-filter > .controls > .filter {\r\n\tmargin-left: 4px;\r\n}\r\n\r\n.monaco-list-type-filter-message {\r\n\tposition: absolute;\r\n\tbox-sizing: border-box;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tpadding: 40px 1em 1em 1em;\r\n\ttext-align: center;\r\n\twhite-space: normal;\r\n\topacity: 0.7;\r\n\tpointer-events: none;\r\n}\r\n\r\n.monaco-list-type-filter-message:empty {\r\n\tdisplay: none;\r\n}\r\n\r\n/* Electron */\r\n\r\n.monaco-list-type-filter {\r\n\tcursor: grab;\r\n}\r\n\r\n.monaco-list-type-filter.dragging {\r\n\tcursor: grabbing;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/menu/menu.css":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/menu/menu.css ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-menu .monaco-action-bar.vertical {\r\n\tmargin-left: 0;\r\n\toverflow: visible;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .actions-container {\r\n\tdisplay: block;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .action-item {\r\n\tpadding: 0;\r\n\ttransform: none;\r\n\tdisplay: flex;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .action-item.active {\r\n\ttransform: none;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .action-menu-item {\r\n\tflex: 1 1 auto;\r\n\tdisplay: flex;\r\n\theight: 2em;\r\n\talign-items: center;\r\n\tposition: relative;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .action-label {\r\n\tflex: 1 1 auto;\r\n\ttext-decoration: none;\r\n\tpadding: 0 1em;\r\n\tbackground: none;\r\n\tfont-size: 12px;\r\n\tline-height: 1;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .keybinding,\r\n.monaco-menu .monaco-action-bar.vertical .submenu-indicator {\r\n\tdisplay: inline-block;\r\n\tflex: 2 1 auto;\r\n\tpadding: 0 1em;\r\n\ttext-align: right;\r\n\tfont-size: 12px;\r\n\tline-height: 1;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .submenu-indicator {\r\n\theight: 100%;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .submenu-indicator.codicon {\r\n\tfont-size: 16px !important;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .submenu-indicator.codicon::before {\r\n\tmargin-left: auto;\r\n\tmargin-right: -20px;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .action-item.disabled .keybinding,\r\n.monaco-menu .monaco-action-bar.vertical .action-item.disabled .submenu-indicator {\r\n\topacity: 0.4;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .action-label:not(.separator) {\r\n\tdisplay: inline-block;\r\n\tbox-sizing: border-box;\r\n\tmargin: 0;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .action-item {\r\n\tposition: static;\r\n\toverflow: visible;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .action-item .monaco-submenu {\r\n\tposition: absolute;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .action-label.separator {\r\n\tpadding: 0.5em 0 0 0;\r\n\tmargin-bottom: 0.5em;\r\n\twidth: 100%;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .action-label.separator.text {\r\n\tpadding: 0.7em 1em 0.1em 1em;\r\n\tfont-weight: bold;\r\n\topacity: 1;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .action-label:hover {\r\n\tcolor: inherit;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .menu-item-check {\r\n\tposition: absolute;\r\n\tvisibility: hidden;\r\n\twidth: 1em;\r\n\theight: 100%;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .action-menu-item.checked .menu-item-check {\r\n\tvisibility: visible;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n}\r\n\r\n/* Context Menu */\r\n\r\n.context-view.monaco-menu-container {\r\n\toutline: 0;\r\n\tborder: none;\r\n\tanimation: fadeIn 0.083s linear;\r\n}\r\n\r\n.context-view.monaco-menu-container :focus,\r\n.context-view.monaco-menu-container .monaco-action-bar.vertical:focus,\r\n.context-view.monaco-menu-container .monaco-action-bar.vertical :focus {\r\n\toutline: 0;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .action-item {\r\n\tborder: thin solid transparent; /* prevents jumping behaviour on hover or focus */\r\n}\r\n\r\n\r\n/* High Contrast Theming */\r\n.hc-black .context-view.monaco-menu-container {\r\n\tbox-shadow: none;\r\n}\r\n\r\n.hc-black .monaco-menu .monaco-action-bar.vertical .action-item.focused {\r\n\tbackground: none;\r\n}\r\n\r\n/* Menubar styles */\r\n\r\n.menubar {\r\n\tdisplay: flex;\r\n\tflex-shrink: 1;\r\n\tbox-sizing: border-box;\r\n\theight: 30px;\r\n\toverflow: hidden;\r\n\tflex-wrap: wrap;\r\n}\r\n\r\n.fullscreen .menubar:not(.compact) {\r\n\tmargin: 0px;\r\n\tpadding: 0px 5px;\r\n}\r\n\r\n.menubar > .menubar-menu-button {\r\n\talign-items: center;\r\n\tbox-sizing: border-box;\r\n\tpadding: 0px 8px;\r\n\tcursor: default;\r\n\t-webkit-app-region: no-drag;\r\n\tzoom: 1;\r\n\twhite-space: nowrap;\r\n\toutline: 0;\r\n}\r\n\r\n.menubar.compact {\r\n\tflex-shrink: 0;\r\n}\r\n\r\n.menubar.compact > .menubar-menu-button {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tpadding: 0px;\r\n}\r\n\r\n.menubar .menubar-menu-items-holder {\r\n\tposition: absolute;\r\n\tleft: 0px;\r\n\topacity: 1;\r\n\tz-index: 2000;\r\n}\r\n\r\n.menubar .menubar-menu-items-holder.monaco-menu-container {\r\n\toutline: 0;\r\n\tborder: none;\r\n}\r\n\r\n.menubar .menubar-menu-items-holder.monaco-menu-container :focus {\r\n\toutline: 0;\r\n}\r\n\r\n.menubar .toolbar-toggle-more {\r\n\twidth: 20px;\r\n\theight: 100%;\r\n}\r\n\r\n.menubar.compact .toolbar-toggle-more {\r\n\tposition: absolute;\r\n\tleft: 0px;\r\n\ttop: 0px;\r\n\tcursor: pointer;\r\n\twidth: 100%;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n}\r\n\r\n.menubar .toolbar-toggle-more {\r\n\tpadding: 0;\r\n\tvertical-align: sub;\r\n}\r\n\r\n.menubar.compact .toolbar-toggle-more::before {\r\n\tcontent: \"\\eb94\" !important;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/sash/sash.css":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/sash/sash.css ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-sash {\r\n\tposition: absolute;\r\n\tz-index: 35;\r\n\ttouch-action: none;\r\n}\r\n\r\n.monaco-sash.disabled {\r\n\tpointer-events: none;\r\n}\r\n\r\n.monaco-sash.vertical {\r\n\tcursor: ew-resize;\r\n\ttop: 0;\r\n\twidth: 4px;\r\n\theight: 100%;\r\n}\r\n\r\n.monaco-sash.mac.vertical {\r\n\tcursor: col-resize;\r\n}\r\n\r\n.monaco-sash.vertical.minimum {\r\n\tcursor: e-resize;\r\n}\r\n\r\n.monaco-sash.vertical.maximum {\r\n\tcursor: w-resize;\r\n}\r\n\r\n.monaco-sash.horizontal {\r\n\tcursor: ns-resize;\r\n\tleft: 0;\r\n\twidth: 100%;\r\n\theight: 4px;\r\n}\r\n\r\n.monaco-sash.mac.horizontal {\r\n\tcursor: row-resize;\r\n}\r\n\r\n.monaco-sash.horizontal.minimum {\r\n\tcursor: s-resize;\r\n}\r\n\r\n.monaco-sash.horizontal.maximum {\r\n\tcursor: n-resize;\r\n}\r\n\r\n.monaco-sash:not(.disabled).orthogonal-start::before,\r\n.monaco-sash:not(.disabled).orthogonal-end::after {\r\n\tcontent: ' ';\r\n\theight: 8px;\r\n\twidth: 8px;\r\n\tz-index: 100;\r\n\tdisplay: block;\r\n\tcursor: all-scroll;\r\n\tposition: absolute;\r\n}\r\n\r\n.monaco-sash.orthogonal-start.vertical::before {\r\n\tleft: -2px;\r\n\ttop: -4px;\r\n}\r\n\r\n.monaco-sash.orthogonal-end.vertical::after {\r\n\tleft: -2px;\r\n\tbottom: -4px;\r\n}\r\n\r\n.monaco-sash.orthogonal-start.horizontal::before {\r\n\ttop: -2px;\r\n\tleft: -4px;\r\n}\r\n\r\n.monaco-sash.orthogonal-end.horizontal::after {\r\n\ttop: -2px;\r\n\tright: -4px;\r\n}\r\n\r\n.monaco-sash.disabled {\r\n\tcursor: default !important;\r\n\tpointer-events: none !important;\r\n}\r\n\r\n/** Touch **/\r\n\r\n.monaco-sash.touch.vertical {\r\n\twidth: 20px;\r\n}\r\n\r\n.monaco-sash.touch.horizontal {\r\n\theight: 20px;\r\n}\r\n\r\n/** Debug **/\r\n\r\n.monaco-sash.debug {\r\n\tbackground: cyan;\r\n}\r\n\r\n.monaco-sash.debug.disabled {\r\n\tbackground: rgba(0, 255, 255, 0.2);\r\n}\r\n\r\n.monaco-sash.debug:not(.disabled).orthogonal-start::before,\r\n.monaco-sash.debug:not(.disabled).orthogonal-end::after {\r\n\tbackground: red;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/scrollbar/media/scrollbars.css":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/scrollbar/media/scrollbars.css ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n/* Arrows */\r\n.monaco-scrollable-element > .scrollbar > .up-arrow {\r\n\tbackground: url(\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTEgMTEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTkuNDgwNDYsOC45NjE1bDEuMjYsLTEuMjZsLTUuMDQsLTUuMDRsLTUuNDYsNS4wNGwxLjI2LDEuMjZsNC4yLC0zLjc4bDMuNzgsMy43OHoiIGZpbGw9IiM0MjQyNDIiLz48L3N2Zz4=\");\r\n\tcursor: pointer;\r\n}\r\n.monaco-scrollable-element > .scrollbar > .down-arrow {\r\n\tbackground: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMSAxMSI+PHBhdGggdHJhbnNmb3JtPSJyb3RhdGUoLTE4MCA1LjQ5MDQ1OTkxODk3NTgzLDUuODExNTAwMDcyNDc5MjQ4KSIgZmlsbD0iIzQyNDI0MiIgZD0ibTkuNDgwNDYsOC45NjE1bDEuMjYsLTEuMjZsLTUuMDQsLTUuMDRsLTUuNDYsNS4wNGwxLjI2LDEuMjZsNC4yLC0zLjc4bDMuNzgsMy43OHoiLz48L3N2Zz4=\");\r\n\tcursor: pointer;\r\n}\r\n.monaco-scrollable-element > .scrollbar > .left-arrow {\r\n\tbackground: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMSAxMSI+PHBhdGggdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDUuNDkwNDU5OTE4OTc1ODMxLDUuNDMxMzgyMTc5MjYwMjU0KSIgZmlsbD0iIzQyNDI0MiIgZD0ibTkuNDgwNDYsOC41ODEzOGwxLjI2LC0xLjI2bC01LjA0LC01LjA0bC01LjQ2LDUuMDRsMS4yNiwxLjI2bDQuMiwtMy43OGwzLjc4LDMuNzh6Ii8+PC9zdmc+\");\r\n\tcursor: pointer;\r\n}\r\n.monaco-scrollable-element > .scrollbar > .right-arrow {\r\n\tbackground: url(\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTEgMTEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggdHJhbnNmb3JtPSJyb3RhdGUoOTAgNS42MTcxNjUwODg2NTM1NjQ1LDUuNTU4MDg5NzMzMTIzNzgpICIgZmlsbD0iIzQyNDI0MiIgZD0ibTkuNjA3MTcsOC43MDgwOWwxLjI2LC0xLjI2bC01LjA0LC01LjA0bC01LjQ2LDUuMDRsMS4yNiwxLjI2bDQuMiwtMy43OGwzLjc4LDMuNzh6Ii8+PC9zdmc+\");\r\n\tcursor: pointer;\r\n}\r\n\r\n.hc-black .monaco-scrollable-element > .scrollbar > .up-arrow,\r\n.vs-dark .monaco-scrollable-element > .scrollbar > .up-arrow {\r\n\tbackground: url(\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTEgMTEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTkuNDgwNDYsOC45NjE1bDEuMjYsLTEuMjZsLTUuMDQsLTUuMDRsLTUuNDYsNS4wNGwxLjI2LDEuMjZsNC4yLC0zLjc4bDMuNzgsMy43OHoiIGZpbGw9IiNFOEU4RTgiLz48L3N2Zz4=\");\r\n}\r\n.hc-black .monaco-scrollable-element > .scrollbar > .down-arrow,\r\n.vs-dark .monaco-scrollable-element > .scrollbar > .down-arrow {\r\n\tbackground: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMSAxMSI+PHBhdGggdHJhbnNmb3JtPSJyb3RhdGUoLTE4MCA1LjQ5MDQ1OTkxODk3NTgzLDUuODExNTAwMDcyNDc5MjQ4KSIgZmlsbD0iI0U4RThFOCIgZD0ibTkuNDgwNDYsOC45NjE1bDEuMjYsLTEuMjZsLTUuMDQsLTUuMDRsLTUuNDYsNS4wNGwxLjI2LDEuMjZsNC4yLC0zLjc4bDMuNzgsMy43OHoiLz48L3N2Zz4=\");\r\n}\r\n.hc-black .monaco-scrollable-element > .scrollbar > .left-arrow,\r\n.vs-dark .monaco-scrollable-element > .scrollbar > .left-arrow {\r\n\tbackground: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMSAxMSI+PHBhdGggdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDUuNDkwNDU5OTE4OTc1ODMxLDUuNDMxMzgyMTc5MjYwMjU0KSIgZmlsbD0iI0U4RThFOCIgZD0ibTkuNDgwNDYsOC41ODEzOGwxLjI2LC0xLjI2bC01LjA0LC01LjA0bC01LjQ2LDUuMDRsMS4yNiwxLjI2bDQuMiwtMy43OGwzLjc4LDMuNzh6Ii8+PC9zdmc+\");\r\n}\r\n.hc-black .monaco-scrollable-element > .scrollbar > .right-arrow,\r\n.vs-dark .monaco-scrollable-element > .scrollbar > .right-arrow {\r\n\tbackground: url(\"data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTEgMTEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggdHJhbnNmb3JtPSJyb3RhdGUoOTAgNS42MTcxNjUwODg2NTM1NjQ1LDUuNTU4MDg5NzMzMTIzNzgpICIgZmlsbD0iI0U4RThFOCIgZD0ibTkuNjA3MTcsOC43MDgwOWwxLjI2LC0xLjI2bC01LjA0LC01LjA0bC01LjQ2LDUuMDRsMS4yNiwxLjI2bDQuMiwtMy43OGwzLjc4LDMuNzh6Ii8+PC9zdmc+\");\r\n}\r\n\r\n.monaco-scrollable-element > .visible {\r\n\topacity: 1;\r\n\r\n\t/* Background rule added for IE9 - to allow clicks on dom node */\r\n\tbackground:rgba(0,0,0,0);\r\n\r\n\ttransition: opacity 100ms linear;\r\n}\r\n.monaco-scrollable-element > .invisible {\r\n\topacity: 0;\r\n\tpointer-events: none;\r\n}\r\n.monaco-scrollable-element > .invisible.fade {\r\n\ttransition: opacity 800ms linear;\r\n}\r\n\r\n/* Scrollable Content Inset Shadow */\r\n.monaco-scrollable-element > .shadow {\r\n\tposition: absolute;\r\n\tdisplay: none;\r\n}\r\n.monaco-scrollable-element > .shadow.top {\r\n\tdisplay: block;\r\n\ttop: 0;\r\n\tleft: 3px;\r\n\theight: 3px;\r\n\twidth: 100%;\r\n\tbox-shadow: #DDD 0 6px 6px -6px inset;\r\n}\r\n.monaco-scrollable-element > .shadow.left {\r\n\tdisplay: block;\r\n\ttop: 3px;\r\n\tleft: 0;\r\n\theight: 100%;\r\n\twidth: 3px;\r\n\tbox-shadow: #DDD 6px 0 6px -6px inset;\r\n}\r\n.monaco-scrollable-element > .shadow.top-left-corner {\r\n\tdisplay: block;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\theight: 3px;\r\n\twidth: 3px;\r\n}\r\n.monaco-scrollable-element > .shadow.top.left {\r\n\tbox-shadow: #DDD 6px 6px 6px -6px inset;\r\n}\r\n\r\n/* ---------- Default Style ---------- */\r\n\r\n.vs .monaco-scrollable-element > .scrollbar > .slider {\r\n\tbackground: rgba(100, 100, 100, .4);\r\n}\r\n.vs-dark .monaco-scrollable-element > .scrollbar > .slider {\r\n\tbackground: rgba(121, 121, 121, .4);\r\n}\r\n.hc-black .monaco-scrollable-element > .scrollbar > .slider {\r\n\tbackground: rgba(111, 195, 223, .6);\r\n}\r\n\r\n.monaco-scrollable-element > .scrollbar > .slider:hover {\r\n\tbackground: rgba(100, 100, 100, .7);\r\n}\r\n.hc-black .monaco-scrollable-element > .scrollbar > .slider:hover {\r\n\tbackground: rgba(111, 195, 223, .8);\r\n}\r\n\r\n.monaco-scrollable-element > .scrollbar > .slider.active {\r\n\tbackground: rgba(0, 0, 0, .6);\r\n}\r\n.vs-dark .monaco-scrollable-element > .scrollbar > .slider.active {\r\n\tbackground: rgba(191, 191, 191, .4);\r\n}\r\n.hc-black .monaco-scrollable-element > .scrollbar > .slider.active {\r\n\tbackground: rgba(111, 195, 223, 1);\r\n}\r\n\r\n.vs-dark .monaco-scrollable-element .shadow.top {\r\n\tbox-shadow: none;\r\n}\r\n\r\n.vs-dark .monaco-scrollable-element .shadow.left {\r\n\tbox-shadow: #000 6px 0 6px -6px inset;\r\n}\r\n\r\n.vs-dark .monaco-scrollable-element .shadow.top.left {\r\n\tbox-shadow: #000 6px 6px 6px -6px inset;\r\n}\r\n\r\n.hc-black .monaco-scrollable-element .shadow.top {\r\n\tbox-shadow: none;\r\n}\r\n\r\n.hc-black .monaco-scrollable-element .shadow.left {\r\n\tbox-shadow: none;\r\n}\r\n\r\n.hc-black .monaco-scrollable-element .shadow.top.left {\r\n\tbox-shadow: none;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/tree/media/tree.css":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/tree/media/tree.css ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-tl-row {\r\n\tdisplay: flex;\r\n\theight: 100%;\r\n\talign-items: center;\r\n\tposition: relative;\r\n}\r\n\r\n.monaco-tl-indent {\r\n\theight: 100%;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 16px;\r\n\tpointer-events: none;\r\n}\r\n\r\n.hide-arrows .monaco-tl-indent {\r\n\tleft: 12px;\r\n}\r\n\r\n.monaco-tl-indent > .indent-guide {\r\n\tdisplay: inline-block;\r\n\tbox-sizing: border-box;\r\n\theight: 100%;\r\n\tborder-left: 1px solid transparent;\r\n}\r\n\r\n.monaco-tl-indent > .indent-guide {\r\n\ttransition: border-color 0.1s linear;\r\n}\r\n\r\n.monaco-tl-twistie,\r\n.monaco-tl-contents {\r\n\theight: 100%;\r\n}\r\n\r\n.monaco-tl-twistie {\r\n\tfont-size: 10px;\r\n\ttext-align: right;\r\n\tpadding-right: 6px;\r\n\tflex-shrink: 0;\r\n\twidth: 16px;\r\n\tdisplay: flex !important;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\tcolor: inherit !important;\r\n\ttransform: translateX(3px);\r\n}\r\n\r\n.monaco-tl-contents {\r\n\tflex: 1;\r\n\toverflow: hidden;\r\n}\r\n\r\n.monaco-tl-twistie.collapsed::before {\r\n\ttransform: rotate(-90deg);\r\n}\r\n\r\n.monaco-tl-twistie.codicon-loading::before {\r\n\tanimation: codicon-spin 1.25s linear infinite;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/controller/textAreaHandler.css":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/controller/textAreaHandler.css ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-editor .inputarea {\r\n\tmin-width: 0;\r\n\tmin-height: 0;\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tposition: absolute;\r\n\toutline: none !important;\r\n\tresize: none;\r\n\tborder: none;\r\n\toverflow: hidden;\r\n\tcolor: transparent;\r\n\tbackground-color: transparent;\r\n}\r\n/*.monaco-editor .inputarea {\r\n\tposition: fixed !important;\r\n\twidth: 800px !important;\r\n\theight: 500px !important;\r\n\ttop: initial !important;\r\n\tleft: initial !important;\r\n\tbottom: 0 !important;\r\n\tright: 0 !important;\r\n\tcolor: black !important;\r\n\tbackground: white !important;\r\n\tline-height: 15px !important;\r\n\tfont-size: 14px !important;\r\n}*/\r\n.monaco-editor .inputarea.ime-input {\r\n\tz-index: 10;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/currentLineHighlight/currentLineHighlight.css":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/currentLineHighlight/currentLineHighlight.css ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-editor .view-overlays .current-line {\r\n\tdisplay: block;\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n.monaco-editor .margin-view-overlays .current-line {\r\n\tdisplay: block;\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n.monaco-editor .margin-view-overlays .current-line.current-line-margin.current-line-margin-both {\r\n\tborder-right: 0;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/decorations/decorations.css":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/decorations/decorations.css ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n/*\r\n\tKeeping name short for faster parsing.\r\n\tcdr = core decorations rendering (div)\r\n*/\r\n.monaco-editor .lines-content .cdr {\r\n\tposition: absolute;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/glyphMargin/glyphMargin.css":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/glyphMargin/glyphMargin.css ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-editor .glyph-margin {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n}\r\n\r\n/*\r\n\tKeeping name short for faster parsing.\r\n\tcgmr = core glyph margin rendering (div)\r\n*/\r\n.monaco-editor .margin-view-overlays .cgmr {\r\n\tposition: absolute;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/indentGuides/indentGuides.css":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/indentGuides/indentGuides.css ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n/*\r\n\tKeeping name short for faster parsing.\r\n\tcigr = core ident guides rendering (div)\r\n*/\r\n.monaco-editor .lines-content .cigr {\r\n\tposition: absolute;\r\n}\r\n.monaco-editor .lines-content .cigra {\r\n\tposition: absolute;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/lineNumbers/lineNumbers.css":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/lineNumbers/lineNumbers.css ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-editor .margin-view-overlays .line-numbers {\r\n\tposition: absolute;\r\n\ttext-align: right;\r\n\tdisplay: inline-block;\r\n\tvertical-align: middle;\r\n\tbox-sizing: border-box;\r\n\tcursor: default;\r\n\theight: 100%;\r\n}\r\n\r\n.monaco-editor .relative-current-line-number {\r\n\ttext-align: left;\r\n\tdisplay: inline-block;\r\n\twidth: 100%;\r\n}\r\n\r\n.monaco-editor .margin-view-overlays .line-numbers.lh-odd {\r\n\tmargin-top: 1px;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/lines/viewLines.css":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/lines/viewLines.css ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n/* Uncomment to see lines flashing when they're painted */\r\n/*.monaco-editor .view-lines > .view-line {\r\n\tbackground-color: none;\r\n\tanimation-name: flash-background;\r\n\tanimation-duration: 800ms;\r\n}\r\n@keyframes flash-background {\r\n\t0%   { background-color: lightgreen; }\r\n\t100% { background-color: none }\r\n}*/\r\n\r\n.monaco-editor.no-user-select .lines-content,\r\n.monaco-editor.no-user-select .view-line,\r\n.monaco-editor.no-user-select .view-lines {\r\n\tuser-select: none;\r\n\t-webkit-user-select: none;\r\n\t-ms-user-select: none;\r\n}\r\n\r\n.monaco-editor .view-lines {\r\n\tcursor: text;\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.monaco-editor.vs-dark.mac .view-lines,\r\n.monaco-editor.hc-black.mac .view-lines {\r\n\tcursor: -webkit-image-set(url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAL0lEQVQoz2NgCD3x//9/BhBYBWdhgFVAiVW4JBFKGIa4AqD0//9D3pt4I4tAdAMAHTQ/j5Zom30AAAAASUVORK5CYII=) 1x, url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAAz0lEQVRIx2NgYGBY/R8I/vx5eelX3n82IJ9FxGf6tksvf/8FiTMQAcAGQMDvSwu09abffY8QYSAScNk45G198eX//yev73/4///701eh//kZSARckrNBRvz//+8+6ZohwCzjGNjdgQxkAg7B9WADeBjIBqtJCbhRA0YNoIkBSNmaPEMoNmA0FkYNoFKhapJ6FGyAH3nauaSmPfwI0v/3OukVi0CIZ+F25KrtYcx/CTIy0e+rC7R1Z4KMICVTQQ14feVXIbR695u14+Ir4gwAAD49E54wc1kWAAAAAElFTkSuQmCC) 2x) 5 8, text;\r\n}\r\n\r\n.monaco-editor .view-line {\r\n\tposition: absolute;\r\n\twidth: 100%;\r\n}\r\n\r\n/* TODO@tokenization bootstrap fix */\r\n/*.monaco-editor .view-line > span > span {\r\n\tfloat: none;\r\n\tmin-height: inherit;\r\n\tmargin-left: inherit;\r\n}*/\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/linesDecorations/linesDecorations.css":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/linesDecorations/linesDecorations.css ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n.monaco-editor .lines-decorations {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tbackground: white;\r\n}\r\n\r\n/*\r\n\tKeeping name short for faster parsing.\r\n\tcldr = core lines decorations rendering (div)\r\n*/\r\n.monaco-editor .margin-view-overlays .cldr {\r\n\tposition: absolute;\r\n\theight: 100%;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/marginDecorations/marginDecorations.css":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/marginDecorations/marginDecorations.css ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n/*\r\n\tKeeping name short for faster parsing.\r\n\tcmdr = core margin decorations rendering (div)\r\n*/\r\n.monaco-editor .margin-view-overlays .cmdr {\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/minimap/minimap.css":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/minimap/minimap.css ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n/* START cover the case that slider is visible on mouseover */\r\n.monaco-editor .minimap.slider-mouseover .minimap-slider {\r\n\topacity: 0;\r\n\ttransition: opacity 100ms linear;\r\n}\r\n.monaco-editor .minimap.slider-mouseover:hover .minimap-slider {\r\n\topacity: 1;\r\n}\r\n.monaco-editor .minimap.slider-mouseover .minimap-slider.active {\r\n\topacity: 1;\r\n}\r\n/* END cover the case that slider is visible on mouseover */\r\n\r\n.monaco-editor .minimap-shadow-hidden {\r\n\tposition: absolute;\r\n\twidth: 0;\r\n}\r\n.monaco-editor .minimap-shadow-visible {\r\n\tposition: absolute;\r\n\tleft: -6px;\r\n\twidth: 6px;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/overlayWidgets/overlayWidgets.css":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/overlayWidgets/overlayWidgets.css ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n.monaco-editor .overlayWidgets {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft:0;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/rulers/rulers.css":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/rulers/rulers.css ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-editor .view-ruler {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/scrollDecoration/scrollDecoration.css":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/scrollDecoration/scrollDecoration.css ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-editor .scroll-decoration {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\theight: 6px;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/selections/selections.css":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/selections/selections.css ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n/*\r\n\tKeeping name short for faster parsing.\r\n\tcslr = core selections layer rendering (div)\r\n*/\r\n.monaco-editor .lines-content .cslr {\r\n\tposition: absolute;\r\n}\r\n\r\n.monaco-editor\t\t\t.top-left-radius\t\t{ border-top-left-radius: 3px; }\r\n.monaco-editor\t\t\t.bottom-left-radius\t\t{ border-bottom-left-radius: 3px; }\r\n.monaco-editor\t\t\t.top-right-radius\t\t{ border-top-right-radius: 3px; }\r\n.monaco-editor\t\t\t.bottom-right-radius\t{ border-bottom-right-radius: 3px; }\r\n\r\n.monaco-editor.hc-black .top-left-radius\t\t{ border-top-left-radius: 0; }\r\n.monaco-editor.hc-black .bottom-left-radius\t\t{ border-bottom-left-radius: 0; }\r\n.monaco-editor.hc-black .top-right-radius\t\t{ border-top-right-radius: 0; }\r\n.monaco-editor.hc-black .bottom-right-radius\t{ border-bottom-right-radius: 0; }\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/viewCursors/viewCursors.css":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/viewCursors/viewCursors.css ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n.monaco-editor .cursors-layer {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n}\r\n\r\n.monaco-editor .cursors-layer > .cursor {\r\n\tposition: absolute;\r\n\tcursor: text;\r\n\toverflow: hidden;\r\n}\r\n\r\n/* -- smooth-caret-animation -- */\r\n.monaco-editor .cursors-layer.cursor-smooth-caret-animation > .cursor {\r\n\ttransition: all 80ms;\r\n}\r\n\r\n/* -- block-outline-style -- */\r\n.monaco-editor .cursors-layer.cursor-block-outline-style > .cursor {\r\n\tbox-sizing: border-box;\r\n\tbackground: transparent !important;\r\n\tborder-style: solid;\r\n\tborder-width: 1px;\r\n}\r\n\r\n/* -- underline-style -- */\r\n.monaco-editor .cursors-layer.cursor-underline-style > .cursor {\r\n\tborder-bottom-width: 2px;\r\n\tborder-bottom-style: solid;\r\n\tbackground: transparent !important;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n/* -- underline-thin-style -- */\r\n.monaco-editor .cursors-layer.cursor-underline-thin-style > .cursor {\r\n\tborder-bottom-width: 1px;\r\n\tborder-bottom-style: solid;\r\n\tbackground: transparent !important;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n@keyframes monaco-cursor-smooth {\r\n\t0%,\r\n\t20% {\r\n\t\topacity: 1;\r\n\t}\r\n\t60%,\r\n\t100% {\r\n\t\topacity: 0;\r\n\t}\r\n}\r\n\r\n@keyframes monaco-cursor-phase {\r\n\t0%,\r\n\t20% {\r\n\t\topacity: 1;\r\n\t}\r\n\t90%,\r\n\t100% {\r\n\t\topacity: 0;\r\n\t}\r\n}\r\n\r\n@keyframes monaco-cursor-expand {\r\n\t0%,\r\n\t20% {\r\n\t\ttransform: scaleY(1);\r\n\t}\r\n\t80%,\r\n\t100% {\r\n\t\ttransform: scaleY(0);\r\n\t}\r\n}\r\n\r\n.cursor-smooth {\r\n\tanimation: monaco-cursor-smooth 0.5s ease-in-out 0s 20 alternate;\r\n}\r\n\r\n.cursor-phase {\r\n\tanimation: monaco-cursor-phase 0.5s ease-in-out 0s 20 alternate;\r\n}\r\n\r\n.cursor-expand > .cursor {\r\n\tanimation: monaco-cursor-expand 0.5s ease-in-out 0s 20 alternate;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/diffEditor.css":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/diffEditor.css ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n/* ---------- DiffEditor ---------- */\r\n\r\n.monaco-diff-editor .diffOverview {\r\n\tz-index: 9;\r\n}\r\n\r\n/* colors not externalized: using transparancy on background */\r\n.monaco-diff-editor.vs\t\t\t.diffOverview { background: rgba(0, 0, 0, 0.03); }\r\n.monaco-diff-editor.vs-dark\t\t.diffOverview { background: rgba(255, 255, 255, 0.01); }\r\n\r\n.monaco-diff-editor .diffViewport {\r\n\tbox-shadow: inset 0px 0px 1px 0px #B9B9B9;\r\n\tbackground: rgba(0, 0, 0, 0.10);\r\n}\r\n\r\n.monaco-diff-editor.vs-dark .diffViewport,\r\n.monaco-diff-editor.hc-black .diffViewport {\r\n\tbackground: rgba(255, 255, 255, 0.10);\r\n}\r\n.monaco-scrollable-element.modified-in-monaco-diff-editor.vs\t\t.scrollbar { background: rgba(0,0,0,0); }\r\n.monaco-scrollable-element.modified-in-monaco-diff-editor.vs-dark\t.scrollbar { background: rgba(0,0,0,0); }\r\n.monaco-scrollable-element.modified-in-monaco-diff-editor.hc-black\t.scrollbar { background: none; }\r\n\r\n.monaco-scrollable-element.modified-in-monaco-diff-editor .slider {\r\n\tz-index: 10;\r\n}\r\n.modified-in-monaco-diff-editor\t\t\t\t.slider.active { background: rgba(171, 171, 171, .4); }\r\n.modified-in-monaco-diff-editor.hc-black\t.slider.active { background: none; }\r\n\r\n/* ---------- Diff ---------- */\r\n\r\n.monaco-editor .insert-sign,\r\n.monaco-diff-editor .insert-sign,\r\n.monaco-editor .delete-sign,\r\n.monaco-diff-editor .delete-sign {\r\n\tfont-size: 11px !important;\r\n\topacity: 0.7 !important;\r\n\tdisplay: flex !important;\r\n\talign-items: center;\r\n}\r\n.monaco-editor.hc-black .insert-sign,\r\n.monaco-diff-editor.hc-black .insert-sign,\r\n.monaco-editor.hc-black .delete-sign,\r\n.monaco-diff-editor.hc-black .delete-sign {\r\n\topacity: 1;\r\n}\r\n\r\n.monaco-editor .inline-deleted-margin-view-zone {\r\n\ttext-align: right;\r\n}\r\n.monaco-editor .inline-added-margin-view-zone {\r\n\ttext-align: right;\r\n}\r\n\r\n.monaco-editor .diagonal-fill {\r\n\tbackground: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAChJREFUKFNjOH/+fAMDDgCSu3Dhwn9c8gwwBTgNGR4KQP4HhQOhsAIAZCBTkhtqePcAAAAASUVORK5CYII=\");\r\n}\r\n.monaco-editor.vs-dark .diagonal-fill {\r\n\topacity: 0.2;\r\n}\r\n.monaco-editor.hc-black .diagonal-fill {\r\n\tbackground: none;\r\n}\r\n\r\n/* ---------- Inline Diff ---------- */\r\n\r\n.monaco-editor .view-zones .view-lines .view-line span {\r\n\tdisplay: inline-block;\r\n}\r\n\r\n.monaco-editor .margin-view-zones .lightbulb-glyph:hover {\r\n\tcursor: pointer;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/diffReview.css":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/diffReview.css ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-diff-editor .diff-review-line-number {\r\n\ttext-align: right;\r\n\tdisplay: inline-block;\r\n}\r\n\r\n.monaco-diff-editor .diff-review {\r\n\tposition: absolute;\r\n\tuser-select: none;\r\n\t-webkit-user-select: none;\r\n\t-ms-user-select: none;\r\n}\r\n\r\n.monaco-diff-editor .diff-review-summary {\r\n\tpadding-left: 10px;\r\n}\r\n\r\n.monaco-diff-editor .diff-review-shadow {\r\n\tposition: absolute;\r\n}\r\n\r\n.monaco-diff-editor .diff-review-row {\r\n\twhite-space: pre;\r\n}\r\n\r\n.monaco-diff-editor .diff-review-table {\r\n\tdisplay: table;\r\n\tmin-width: 100%;\r\n}\r\n\r\n.monaco-diff-editor .diff-review-row {\r\n\tdisplay: table-row;\r\n\twidth: 100%;\r\n}\r\n\r\n.monaco-diff-editor .diff-review-cell {\r\n\tdisplay: table-cell;\r\n}\r\n\r\n.monaco-diff-editor .diff-review-spacer {\r\n\tdisplay: inline-block;\r\n\twidth: 10px;\r\n}\r\n\r\n.monaco-diff-editor .diff-review-actions {\r\n\tdisplay: inline-block;\r\n\tposition: absolute;\r\n\tright: 10px;\r\n\ttop: 2px;\r\n}\r\n\r\n.monaco-diff-editor .diff-review-actions .action-label {\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tmargin: 2px 0;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/editor.css":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/editor.css ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n/* -------------------- IE10 remove auto clear button -------------------- */\r\n\r\n::-ms-clear {\r\n\tdisplay: none;\r\n}\r\n\r\n/* All widgets */\r\n/* I am not a big fan of this rule */\r\n.monaco-editor .editor-widget input {\r\n\tcolor: inherit;\r\n}\r\n\r\n/* -------------------- Editor -------------------- */\r\n\r\n.monaco-editor {\r\n\tposition: relative;\r\n\toverflow: visible;\r\n\t-webkit-text-size-adjust: 100%;\r\n}\r\n\r\n/* -------------------- Misc -------------------- */\r\n\r\n.monaco-editor .overflow-guard {\r\n\tposition: relative;\r\n\toverflow: hidden;\r\n}\r\n\r\n.monaco-editor .view-overlays {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n}\r\n\r\n/*\r\n.monaco-editor .auto-closed-character {\r\n\topacity: 0.3;\r\n}\r\n*/\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.css":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.css ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-editor .bracket-match {\r\n\tbox-sizing: border-box;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/documentSymbols/media/outlineTree.css":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/documentSymbols/media/outlineTree.css ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-list .monaco-list-row.focused.selected .outline-element .monaco-highlighted-label,\r\n.monaco-list .monaco-list-row.focused.selected .outline-element-decoration {\r\n\t/* make sure selection color wins when a label is being selected */\r\n\tcolor: inherit !important;\r\n}\r\n\r\n.monaco-list .outline-element {\r\n\tdisplay: flex;\r\n\tflex: 1;\r\n\tflex-flow: row nowrap;\r\n\talign-items: center;\r\n}\r\n\r\n.monaco-list .outline-element .monaco-highlighted-label {\r\n\tcolor: var(--outline-element-color);\r\n}\r\n\r\n.monaco-tree .monaco-tree-row.focused .outline-element .outline-element-detail {\r\n\tvisibility: inherit;\r\n}\r\n\r\n.monaco-list .outline-element .outline-element-decoration {\r\n\topacity: 0.75;\r\n\tfont-size: 90%;\r\n\tfont-weight: 600;\r\n\tpadding: 0 12px 0 5px;\r\n\tmargin-left: auto;\r\n\ttext-align: center;\r\n\tcolor: var(--outline-element-color);\r\n}\r\n\r\n.monaco-list .outline-element .outline-element-decoration.bubble {\r\n\tfont-family: codicon;\r\n\tfont-size: 14px;\r\n\topacity: 0.4;\r\n}\r\n\r\n.monaco-list .outline-element .outline-element-icon {\r\n\tmargin-right: 4px;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/documentSymbols/media/symbol-icons.css":
/*!***************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/documentSymbols/media/symbol-icons.css ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-icon-label.deprecated {\r\n\ttext-decoration: line-through;\r\n\topacity: 0.66;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/folding/folding.css":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/folding/folding.css ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-editor .margin-view-overlays .codicon-chevron-right,\r\n.monaco-editor .margin-view-overlays .codicon-chevron-down {\r\n\tcursor: pointer;\r\n\topacity: 0;\r\n\ttransition: opacity 0.5s;\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n\tfont-size: 140%;\r\n\tmargin-left: 2px;\r\n}\r\n\r\n.monaco-editor .margin-view-overlays:hover .codicon,\r\n.monaco-editor .margin-view-overlays .codicon.codicon-chevron-right,\r\n.monaco-editor .margin-view-overlays .codicon.alwaysShowFoldIcons {\r\n\topacity: 1;\r\n}\r\n\r\n.monaco-editor .inline-folded:after {\r\n\tcolor: grey;\r\n\tmargin: 0.1em 0.2em 0 0.2em;\r\n\tcontent: \"⋯\";\r\n\tdisplay: inline;\r\n\tline-height: 1em;\r\n\tcursor: pointer;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/parameterHints/parameterHints.css":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/parameterHints/parameterHints.css ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-editor .parameter-hints-widget {\r\n\tz-index: 10;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tline-height: 1.5em;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget > .wrapper {\r\n\tmax-width: 440px;\r\n\tdisplay: flex;\r\n\tflex-direction: row;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget.multiple {\r\n\tmin-height: 3.3em;\r\n\tpadding: 0;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget.visible {\r\n\ttransition: left .05s ease-in-out;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget p,\r\n.monaco-editor .parameter-hints-widget ul {\r\n\tmargin: 8px 0;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget .monaco-scrollable-element,\r\n.monaco-editor .parameter-hints-widget .body {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tmin-height: 100%;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget .signature {\r\n\tpadding: 4px 5px;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget .docs {\r\n\tpadding: 0 10px 0 5px;\r\n\twhite-space: pre-wrap;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget .docs.empty {\r\n\tdisplay: none;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget .docs .markdown-docs {\r\n\twhite-space: initial;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget .docs .markdown-docs code {\r\n\tfont-family: var(--monaco-monospace-font);\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget .docs .code {\r\n\twhite-space: pre-wrap;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget .docs code {\r\n\tborder-radius: 3px;\r\n\tpadding: 0 0.4em;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget .controls {\r\n\tdisplay: none;\r\n\tflex-direction: column;\r\n\talign-items: center;\r\n\tmin-width: 22px;\r\n\tjustify-content: flex-end;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget.multiple .controls {\r\n\tdisplay: flex;\r\n\tpadding: 0 2px;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget.multiple .button {\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tbackground-repeat: no-repeat;\r\n\tcursor: pointer;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget .button.previous {\r\n\tbottom: 24px;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget .overloads {\r\n\ttext-align: center;\r\n\theight: 12px;\r\n\tline-height: 12px;\r\n\topacity: 0.5;\r\n\tfont-family: var(--monaco-monospace-font);\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget .signature .parameter.active {\r\n\tfont-weight: bold;\r\n\ttext-decoration: underline;\r\n}\r\n\r\n.monaco-editor .parameter-hints-widget .documentation-parameter > .parameter {\r\n\tfont-weight: bold;\r\n\tmargin-right: 0.5em;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/snippet/snippetSession.css":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/snippet/snippetSession.css ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-editor .snippet-placeholder {\r\n\tmin-width: 2px;\r\n\toutline-style: solid;\r\n\toutline-width: 1px;\r\n}\r\n\r\n.monaco-editor .finish-snippet-placeholder {\r\n\toutline-style: solid;\r\n\toutline-width: 1px;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/suggest/media/suggest.css":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/suggest/media/suggest.css ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n/* Suggest widget*/\r\n.monaco-editor .suggest-widget {\r\n\tz-index: 40;\r\n}\r\n\r\n/** Initial widths **/\r\n\r\n.monaco-editor .suggest-widget {\r\n\twidth: 430px;\r\n}\r\n\r\n.monaco-editor .suggest-widget > .message,\r\n.monaco-editor .suggest-widget > .tree,\r\n.monaco-editor .suggest-widget > .details {\r\n\twidth: 100%;\r\n\tborder-style: solid;\r\n\tborder-width: 1px;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n.monaco-editor.hc-black .suggest-widget > .message,\r\n.monaco-editor.hc-black .suggest-widget > .tree,\r\n.monaco-editor.hc-black .suggest-widget > .details {\r\n\tborder-width: 2px;\r\n}\r\n\r\n/** Adjust width when docs are expanded to the side **/\r\n.monaco-editor .suggest-widget.docs-side {\r\n\twidth: 660px;\r\n}\r\n\r\n.monaco-editor .suggest-widget.docs-side > .tree,\r\n.monaco-editor .suggest-widget.docs-side > .details {\r\n\twidth: 50%;\r\n\tfloat: left;\r\n}\r\n\r\n.monaco-editor .suggest-widget.docs-side.list-right > .tree,\r\n.monaco-editor .suggest-widget.docs-side.list-right > .details  {\r\n\tfloat: right;\r\n}\r\n\r\n/* MarkupContent Layout */\r\n.monaco-editor .suggest-widget > .details ul {\r\n\tpadding-left: 20px;\r\n}\r\n.monaco-editor .suggest-widget > .details ol {\r\n\tpadding-left: 20px;\r\n}\r\n\r\n.monaco-editor .suggest-widget > .details p code {\r\n\tfont-family: var(--monaco-monospace-font);\r\n}\r\n\r\n/* Styles for Message element for when widget is loading or is empty */\r\n.monaco-editor .suggest-widget > .message {\r\n\tpadding-left: 22px;\r\n}\r\n\r\n/** Styles for the list element **/\r\n.monaco-editor .suggest-widget > .tree {\r\n\theight: 100%;\r\n}\r\n\r\n.monaco-editor .suggest-widget .monaco-list {\r\n\tuser-select: none;\r\n\t-webkit-user-select: none;\r\n\t-ms-user-select: none;\r\n}\r\n\r\n/** Styles for each row in the list element **/\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row {\r\n\tdisplay: flex;\r\n\t-mox-box-sizing: border-box;\r\n\tbox-sizing: border-box;\r\n\tpadding-right: 10px;\r\n\tbackground-repeat: no-repeat;\r\n\tbackground-position: 2px 2px;\r\n\twhite-space: nowrap;\r\n\tcursor: pointer;\r\n\ttouch-action: none;\r\n}\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents {\r\n\tflex: 1;\r\n\theight: 100%;\r\n\toverflow: hidden;\r\n\tpadding-left: 2px;\r\n}\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main {\r\n\tdisplay: flex;\r\n\toverflow: hidden;\r\n\ttext-overflow: ellipsis;\r\n\twhite-space: pre;\r\n\tjustify-content: space-between;\r\n}\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .left,\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right {\r\n\tdisplay: flex;\r\n}\r\n\r\n.monaco-editor .suggest-widget:not(.frozen) .monaco-highlighted-label .highlight {\r\n\tfont-weight: bold;\r\n}\r\n\r\n/** Status Bar **/\r\n\r\n.monaco-editor .suggest-widget > .suggest-status-bar {\r\n\tvisibility: hidden;\r\n\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\r\n\tbox-sizing: border-box;\r\n\r\n\tdisplay: flex;\r\n\tflex-flow: row nowrap;\r\n\tjustify-content: space-between;\r\n\r\n\twidth: 100%;\r\n\r\n\tfont-size: 80%;\r\n\r\n\tborder-left-width: 1px;\r\n\tborder-left-style: solid;\r\n\tborder-right-width: 1px;\r\n\tborder-right-style: solid;\r\n\tborder-bottom-width: 1px;\r\n\tborder-bottom-style: solid;\r\n\r\n\tpadding: 1px 8px 1px 4px;\r\n\r\n\tbox-shadow: 0 -.5px 3px #ddd;\r\n}\r\n.monaco-editor .suggest-widget > .suggest-status-bar span {\r\n\topacity: 0.7;\r\n}\r\n.monaco-editor .suggest-widget.list-right.docs-side > .suggest-status-bar {\r\n\tleft: auto;\r\n\tright: 0;\r\n}\r\n.monaco-editor .suggest-widget.docs-side > .suggest-status-bar {\r\n\twidth: 50%;\r\n}\r\n\r\n/** ReadMore Icon styles **/\r\n\r\n.monaco-editor .suggest-widget .details > .monaco-scrollable-element > .body > .header > .codicon-close,\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right > .readMore::before {\r\n\tcolor: inherit;\r\n\topacity: 1;\r\n\tfont-size: 14px;\r\n\tcursor: pointer;\r\n}\r\n\r\n.monaco-editor .suggest-widget .details > .monaco-scrollable-element > .body > .header > .codicon-close {\r\n\tposition: absolute;\r\n\ttop: 2px;\r\n\tright: 2px;\r\n}\r\n\r\n.monaco-editor .suggest-widget .details > .monaco-scrollable-element > .body > .header > .codicon-close:hover,\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right > .readMore:hover {\r\n\topacity: 1;\r\n}\r\n\r\n/** signature, qualifier, type/details opacity **/\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .left > .signature-label,\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .left > .qualifier-label,\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right > .details-label {\r\n\topacity: 0.7;\r\n}\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .left > .qualifier-label {\r\n\tmargin-left: 4px;\r\n\topacity: 0.4;\r\n\tfont-size: 90%;\r\n\ttext-overflow: ellipsis;\r\n\toverflow: hidden;\r\n\tline-height: 17px;\r\n\talign-self: center;\r\n}\r\n\r\n/** Type Info and icon next to the label in the focused completion item **/\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right > .details-label {\r\n\tmargin-left: 0.8em;\r\n\toverflow: hidden;\r\n\ttext-overflow: ellipsis;\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right > .details-label > .monaco-tokenized-source {\r\n\tdisplay: inline;\r\n}\r\n\r\n/** Details: if using CompletionItem#details, show on focus **/\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right > .details-label,\r\n.monaco-editor .suggest-widget.docs-side .monaco-list .monaco-list-row.focused > .contents > .main > .right > .details-label {\r\n\tdisplay: none;\r\n}\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row.focused > .contents > .main > .right > .details-label {\r\n\tdisplay: inline;\r\n}\r\n\r\n/** Details: if using CompletionItemLabel#details, always show **/\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right.always-show-details > .details-label,\r\n.monaco-editor .suggest-widget.docs-side .monaco-list .monaco-list-row.focused > .contents > .main > .right.always-show-details > .details-label {\r\n\tdisplay: inline;\r\n}\r\n\r\n/** Ellipsis on hover **/\r\n.monaco-editor .suggest-widget:not(.docs-side) .monaco-list .monaco-list-row:hover > .contents > .main > .right.can-expand-details > .details-label {\r\n\twidth: calc(100% - 26px);\r\n}\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .left {\r\n\tflex-shrink: 1;\r\n\toverflow: hidden;\r\n}\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .left > .monaco-icon-label {\r\n\tflex-shrink: 1;\r\n}\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right {\r\n\toverflow: hidden;\r\n\tflex-shrink: 0;\r\n\tmax-width: 45%;\r\n}\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right > .readMore {\r\n\tdisplay: inline-block;\r\n\tposition: absolute;\r\n\tright: 10px;\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tvisibility: hidden;\r\n}\r\n\r\n/** Do NOT display ReadMore when docs is side/below **/\r\n.monaco-editor .suggest-widget.docs-side .monaco-list .monaco-list-row > .contents > .main > .right > .readMore,\r\n.monaco-editor .suggest-widget.docs-below .monaco-list .monaco-list-row > .contents > .main > .right > .readMore {\r\n\tdisplay: none !important;\r\n}\r\n\r\n/** Do NOT display ReadMore when using plain CompletionItemLabel (details/documentation might not be resolved) **/\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row > .contents > .main > .right:not(.always-show-details) > .readMore {\r\n\tdisplay: none;\r\n}\r\n/** Focused item can show ReadMore, but can't when docs is side/below **/\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row.focused > .contents > .main > .right:not(.always-show-details) > .readMore {\r\n\tdisplay: inline-block;\r\n}\r\n\r\n.monaco-editor .suggest-widget.docs-side .monaco-list .monaco-list-row > .contents > .main > .right > .readMore,\r\n.monaco-editor .suggest-widget.docs-below .monaco-list .monaco-list-row > .contents > .main > .right > .readMore {\r\n\tdisplay: none;\r\n}\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row:hover > .contents > .main > .right > .readMore {\r\n\tvisibility: visible;\r\n}\r\n\r\n/** Styles for each row in the list **/\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row .monaco-icon-label.deprecated {\r\n\topacity: 0.66;\r\n\ttext-decoration: unset;\r\n}\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row .monaco-icon-label.deprecated > .monaco-icon-label-container > .monaco-icon-name-container {\r\n\ttext-decoration: line-through;\r\n}\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row .monaco-icon-label::before {\r\n\theight: 100%;\r\n}\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row .icon {\r\n\tdisplay: block;\r\n\theight: 16px;\r\n\twidth: 16px;\r\n\tmargin-left: 2px;\r\n\tbackground-repeat: no-repeat;\r\n\tbackground-size: 80%;\r\n\tbackground-position: center;\r\n}\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row .icon.hide {\r\n\tdisplay: none;\r\n}\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row .suggest-icon {\r\n\tdisplay: flex;\r\n\talign-items: center;\r\n\tmargin-right: 4px;\r\n}\r\n\r\n.monaco-editor .suggest-widget.no-icons .monaco-list .monaco-list-row .icon,\r\n.monaco-editor .suggest-widget.no-icons .monaco-list .monaco-list-row .suggest-icon::before {\r\n\tdisplay: none;\r\n}\r\n\r\n.monaco-editor .suggest-widget .monaco-list .monaco-list-row .icon.customcolor .colorspan {\r\n\tmargin: 0 0 0 0.3em;\r\n\tborder: 0.1em solid #000;\r\n\twidth: 0.7em;\r\n\theight: 0.7em;\r\n\tdisplay: inline-block;\r\n}\r\n\r\n/** Styles for the docs of the completion item in focus **/\r\n.monaco-editor .suggest-widget .details {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tcursor: default;\r\n}\r\n\r\n.monaco-editor .suggest-widget .details.no-docs {\r\n\tdisplay: none;\r\n}\r\n\r\n.monaco-editor .suggest-widget.docs-below .details {\r\n\tborder-top-width: 0;\r\n}\r\n\r\n.monaco-editor .suggest-widget .details > .monaco-scrollable-element {\r\n\tflex: 1;\r\n}\r\n\r\n.monaco-editor .suggest-widget .details > .monaco-scrollable-element > .body {\r\n\tposition: absolute;\r\n\tbox-sizing: border-box;\r\n\theight: 100%;\r\n\twidth: 100%;\r\n}\r\n\r\n.monaco-editor .suggest-widget .details > .monaco-scrollable-element > .body > .header > .type {\r\n\tflex: 2;\r\n\toverflow: hidden;\r\n\ttext-overflow: ellipsis;\r\n\topacity: 0.7;\r\n\tword-break: break-all;\r\n\tmargin: 0 24px 0 0;\r\n\tpadding: 4px 0 12px 5px;\r\n}\r\n\r\n.monaco-editor .suggest-widget .details > .monaco-scrollable-element > .body > .docs {\r\n\tmargin: 0;\r\n\tpadding: 4px 5px;\r\n\twhite-space: pre-wrap;\r\n}\r\n\r\n.monaco-editor .suggest-widget .details > .monaco-scrollable-element > .body > .docs.markdown-docs {\r\n\tpadding: 0;\r\n\twhite-space: initial;\r\n\tmin-height: calc(1rem + 8px);\r\n}\r\n\r\n.monaco-editor .suggest-widget .details > .monaco-scrollable-element > .body > .docs.markdown-docs > div,\r\n.monaco-editor .suggest-widget .details > .monaco-scrollable-element > .body > .docs.markdown-docs > span:not(:empty) {\r\n\tpadding: 4px 5px;\r\n}\r\n\r\n.monaco-editor .suggest-widget .details > .monaco-scrollable-element > .body > .docs.markdown-docs > div > p:first-child {\r\n\tmargin-top: 0;\r\n}\r\n\r\n.monaco-editor .suggest-widget .details > .monaco-scrollable-element > .body > .docs.markdown-docs > div > p:last-child\t {\r\n\tmargin-bottom: 0;\r\n}\r\n\r\n.monaco-editor .suggest-widget .details > .monaco-scrollable-element > .body > .docs .code {\r\n\twhite-space: pre-wrap;\r\n\tword-wrap: break-word;\r\n}\r\n\r\n.monaco-editor .suggest-widget .details > .monaco-scrollable-element > .body > p:empty {\r\n\tdisplay: none;\r\n}\r\n\r\n.monaco-editor .suggest-widget .details code {\r\n\tborder-radius: 3px;\r\n\tpadding: 0 0.4em;\r\n}\r\n\r\n\r\n/* replace/insert decorations */\r\n\r\n.monaco-editor .suggest-insert-unexpected {\r\n\tfont-style: italic;\r\n}\r\n\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/suggest/media/suggestStatusBar.css":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/suggest/media/suggestStatusBar.css ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.monaco-editor .suggest-widget.with-status-bar .suggest-status-bar {\r\n\tvisibility: visible;\r\n}\r\n.monaco-editor .suggest-widget.with-status-bar > .tree {\r\n\tmargin-bottom: 18px;\r\n}\r\n\r\n.monaco-editor .suggest-widget.with-status-bar .suggest-status-bar span {\r\n\tmin-height: 18px;\r\n}\r\n\r\n.monaco-editor .suggest-widget.with-status-bar .monaco-list .monaco-list-row > .contents > .main > .right > .readMore,\r\n.monaco-editor .suggest-widget.with-status-bar .monaco-list .monaco-list-row.focused > .contents > .main > .right:not(.always-show-details) > .readMore {\r\n\tdisplay: none;\r\n}\r\n\r\n.monaco-editor .suggest-widget.with-status-bar:not(.docs-side) .monaco-list .monaco-list-row:hover > .contents > .main > .right.can-expand-details > .details-label {\r\n\twidth: 100%;\r\n}\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/standalone/browser/standalone-tokens.css":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/standalone/browser/standalone-tokens.css ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n\r\n/* Default standalone editor font */\r\n.monaco-editor {\r\n\tfont-family: -apple-system, BlinkMacSystemFont, \"Segoe WPC\", \"Segoe UI\", \"HelveticaNeue-Light\", \"Ubuntu\", \"Droid Sans\", sans-serif;\r\n}\r\n\r\n.monaco-menu .monaco-action-bar.vertical .action-item .action-menu-item:focus .action-label {\r\n\tstroke-width: 1.2px;\r\n}\r\n\r\n.monaco-editor.vs-dark .monaco-menu .monaco-action-bar.vertical .action-menu-item:focus .action-label,\r\n.monaco-editor.hc-black .monaco-menu .monaco-action-bar.vertical .action-menu-item:focus .action-label {\r\n\tstroke-width: 1.2px;\r\n}\r\n\r\n.monaco-editor-hover p {\r\n\tmargin: 0;\r\n}\r\n\r\n/* The hc-black theme is already high contrast optimized */\r\n.monaco-editor.hc-black {\r\n\t-ms-high-contrast-adjust: none;\r\n}\r\n/* In case the browser goes into high contrast mode and the editor is not configured with the hc-black theme */\r\n@media screen and (-ms-high-contrast:active) {\r\n\r\n\t/* current line highlight */\r\n\t.monaco-editor.vs .view-overlays .current-line,\r\n\t.monaco-editor.vs-dark .view-overlays .current-line {\r\n\t\tborder-color: windowtext !important;\r\n\t\tborder-left: 0;\r\n\t\tborder-right: 0;\r\n\t}\r\n\r\n\t/* view cursors */\r\n\t.monaco-editor.vs .cursor,\r\n\t.monaco-editor.vs-dark .cursor {\r\n\t\tbackground-color: windowtext !important;\r\n\t}\r\n\t/* dnd target */\r\n\t.monaco-editor.vs .dnd-target,\r\n\t.monaco-editor.vs-dark .dnd-target {\r\n\t\tborder-color: windowtext !important;\r\n\t}\r\n\r\n\t/* selected text background */\r\n\t.monaco-editor.vs .selected-text,\r\n\t.monaco-editor.vs-dark .selected-text {\r\n\t\tbackground-color: highlight !important;\r\n\t}\r\n\r\n\t/* allow the text to have a transparent background. */\r\n\t.monaco-editor.vs .view-line,\r\n\t.monaco-editor.vs-dark .view-line {\r\n\t\t-ms-high-contrast-adjust: none;\r\n\t}\r\n\r\n\t/* text color */\r\n\t.monaco-editor.vs .view-line span,\r\n\t.monaco-editor.vs-dark .view-line span {\r\n\t\tcolor: windowtext !important;\r\n\t}\r\n\t/* selected text color */\r\n\t.monaco-editor.vs .view-line span.inline-selected-text,\r\n\t.monaco-editor.vs-dark .view-line span.inline-selected-text {\r\n\t\tcolor: highlighttext !important;\r\n\t}\r\n\r\n\t/* allow decorations */\r\n\t.monaco-editor.vs .view-overlays,\r\n\t.monaco-editor.vs-dark .view-overlays {\r\n\t\t-ms-high-contrast-adjust: none;\r\n\t}\r\n\r\n\t/* various decorations */\r\n\t.monaco-editor.vs .selectionHighlight,\r\n\t.monaco-editor.vs-dark .selectionHighlight,\r\n\t.monaco-editor.vs .wordHighlight,\r\n\t.monaco-editor.vs-dark .wordHighlight,\r\n\t.monaco-editor.vs .wordHighlightStrong,\r\n\t.monaco-editor.vs-dark .wordHighlightStrong,\r\n\t.monaco-editor.vs .reference-decoration,\r\n\t.monaco-editor.vs-dark .reference-decoration {\r\n\t\tborder: 2px dotted highlight !important;\r\n\t\tbackground: transparent !important;\r\n\t\tbox-sizing: border-box;\r\n\t}\r\n\t.monaco-editor.vs .rangeHighlight,\r\n\t.monaco-editor.vs-dark .rangeHighlight {\r\n\t\tbackground: transparent !important;\r\n\t\tborder: 1px dotted activeborder !important;\r\n\t\tbox-sizing: border-box;\r\n\t}\r\n\t.monaco-editor.vs .bracket-match,\r\n\t.monaco-editor.vs-dark .bracket-match {\r\n\t\tborder-color: windowtext !important;\r\n\t\tbackground: transparent !important;\r\n\t}\r\n\r\n\t/* find widget */\r\n\t.monaco-editor.vs .findMatch,\r\n\t.monaco-editor.vs-dark .findMatch,\r\n\t.monaco-editor.vs .currentFindMatch,\r\n\t.monaco-editor.vs-dark .currentFindMatch {\r\n\t\tborder: 2px dotted activeborder !important;\r\n\t\tbackground: transparent !important;\r\n\t\tbox-sizing: border-box;\r\n\t}\r\n\t.monaco-editor.vs .find-widget,\r\n\t.monaco-editor.vs-dark .find-widget {\r\n\t\tborder: 1px solid windowtext;\r\n\t}\r\n\r\n\t/* list - used by suggest widget */\r\n\t.monaco-editor.vs .monaco-list .monaco-list-row,\r\n\t.monaco-editor.vs-dark .monaco-list .monaco-list-row {\r\n\t\t-ms-high-contrast-adjust: none;\r\n\t\tcolor: windowtext !important;\r\n\t}\r\n\t.monaco-editor.vs .monaco-list .monaco-list-row.focused,\r\n\t.monaco-editor.vs-dark .monaco-list .monaco-list-row.focused {\r\n\t\tcolor: highlighttext !important;\r\n\t\tbackground-color: highlight !important;\r\n\t}\r\n\t.monaco-editor.vs .monaco-list .monaco-list-row:hover,\r\n\t.monaco-editor.vs-dark .monaco-list .monaco-list-row:hover {\r\n\t\tbackground: transparent !important;\r\n\t\tborder: 1px solid highlight;\r\n\t\tbox-sizing: border-box;\r\n\t}\r\n\r\n\t/* tree */\r\n\t.monaco-editor.vs .monaco-tree .monaco-tree-row,\r\n\t.monaco-editor.vs-dark .monaco-tree .monaco-tree-row {\r\n\t\t-ms-high-contrast-adjust: none;\r\n\t\tcolor: windowtext !important;\r\n\t}\r\n\t.monaco-editor.vs .monaco-tree .monaco-tree-row.selected,\r\n\t.monaco-editor.vs-dark .monaco-tree .monaco-tree-row.selected,\r\n\t.monaco-editor.vs .monaco-tree .monaco-tree-row.focused,\r\n\t.monaco-editor.vs-dark .monaco-tree .monaco-tree-row.focused {\r\n\t\tcolor: highlighttext !important;\r\n\t\tbackground-color: highlight !important;\r\n\t}\r\n\t.monaco-editor.vs .monaco-tree .monaco-tree-row:hover,\r\n\t.monaco-editor.vs-dark .monaco-tree .monaco-tree-row:hover {\r\n\t\tbackground: transparent !important;\r\n\t\tborder: 1px solid highlight;\r\n\t\tbox-sizing: border-box;\r\n\t}\r\n\r\n\t/* scrollbars */\r\n\t.monaco-editor.vs .monaco-scrollable-element > .scrollbar,\r\n\t.monaco-editor.vs-dark .monaco-scrollable-element > .scrollbar {\r\n\t\t-ms-high-contrast-adjust: none;\r\n\t\tbackground: background !important;\r\n\t\tborder: 1px solid windowtext;\r\n\t\tbox-sizing: border-box;\r\n\t}\r\n\t.monaco-editor.vs .monaco-scrollable-element > .scrollbar > .slider,\r\n\t.monaco-editor.vs-dark .monaco-scrollable-element > .scrollbar > .slider {\r\n\t\tbackground: windowtext !important;\r\n\t}\r\n\t.monaco-editor.vs .monaco-scrollable-element > .scrollbar > .slider:hover,\r\n\t.monaco-editor.vs-dark .monaco-scrollable-element > .scrollbar > .slider:hover {\r\n\t\tbackground: highlight !important;\r\n\t}\r\n\t.monaco-editor.vs .monaco-scrollable-element > .scrollbar > .slider.active,\r\n\t.monaco-editor.vs-dark .monaco-scrollable-element > .scrollbar > .slider.active {\r\n\t\tbackground: highlight !important;\r\n\t}\r\n\r\n\t/* overview ruler */\r\n\t.monaco-editor.vs .decorationsOverviewRuler,\r\n\t.monaco-editor.vs-dark .decorationsOverviewRuler {\r\n\t\topacity: 0;\r\n\t}\r\n\r\n\t/* minimap */\r\n\t.monaco-editor.vs .minimap,\r\n\t.monaco-editor.vs-dark .minimap {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t/* squiggles */\r\n\t.monaco-editor.vs .squiggly-d-error,\r\n\t.monaco-editor.vs-dark .squiggly-d-error {\r\n\t\tbackground: transparent !important;\r\n\t\tborder-bottom: 4px double #E47777;\r\n\t}\r\n\t.monaco-editor.vs .squiggly-c-warning,\r\n\t.monaco-editor.vs-dark .squiggly-c-warning {\r\n\t\tborder-bottom: 4px double #71B771;\r\n\t}\r\n\t.monaco-editor.vs .squiggly-b-info,\r\n\t.monaco-editor.vs-dark .squiggly-b-info {\r\n\t\tborder-bottom: 4px double #71B771;\r\n\t}\r\n\t.monaco-editor.vs .squiggly-a-hint,\r\n\t.monaco-editor.vs-dark .squiggly-a-hint {\r\n\t\tborder-bottom: 4px double #6c6c6c;\r\n\t}\r\n\r\n\t/* contextmenu */\r\n\t.monaco-editor.vs .monaco-menu .monaco-action-bar.vertical .action-menu-item:focus .action-label,\r\n\t.monaco-editor.vs-dark .monaco-menu .monaco-action-bar.vertical .action-menu-item:focus .action-label {\r\n\t\t-ms-high-contrast-adjust: none;\r\n\t\tcolor: highlighttext !important;\r\n\t\tbackground-color: highlight !important;\r\n\t}\r\n\t.monaco-editor.vs .monaco-menu .monaco-action-bar.vertical .action-menu-item:hover .action-label,\r\n\t.monaco-editor.vs-dark .monaco-menu .monaco-action-bar.vertical .action-menu-item:hover .action-label {\r\n\t\t-ms-high-contrast-adjust: none;\r\n\t\tbackground: transparent !important;\r\n\t\tborder: 1px solid highlight;\r\n\t\tbox-sizing: border-box;\r\n\t}\r\n\r\n\t/* diff editor */\r\n\t.monaco-diff-editor.vs .diffOverviewRuler,\r\n\t.monaco-diff-editor.vs-dark .diffOverviewRuler {\r\n\t\tdisplay: none;\r\n\t}\r\n\t.monaco-editor.vs .line-insert,\r\n\t.monaco-editor.vs-dark .line-insert,\r\n\t.monaco-editor.vs .line-delete,\r\n\t.monaco-editor.vs-dark .line-delete {\r\n\t\tbackground: transparent !important;\r\n\t\tborder: 1px solid highlight !important;\r\n\t\tbox-sizing: border-box;\r\n\t}\r\n\t.monaco-editor.vs .char-insert,\r\n\t.monaco-editor.vs-dark .char-insert,\r\n\t.monaco-editor.vs .char-delete,\r\n\t.monaco-editor.vs-dark .char-delete {\r\n\t\tbackground: transparent !important;\r\n\t}\r\n}\r\n\r\n/*.monaco-editor.vs [tabindex=\"0\"]:focus {\r\n\toutline: 1px solid rgba(0, 122, 204, 0.4);\r\n\toutline-offset: -1px;\r\n\topacity: 1 !important;\r\n}\r\n\r\n.monaco-editor.vs-dark [tabindex=\"0\"]:focus {\r\n\toutline: 1px solid rgba(14, 99, 156, 0.6);\r\n\toutline-offset: -1px;\r\n\topacity: 1 !important;\r\n}*/\r\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/platform/contextview/browser/contextMenuHandler.css":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/platform/contextview/browser/contextMenuHandler.css ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\n.context-view .monaco-menu {\r\n\tmin-width: 130px;\r\n}\r\n\r\n.context-view-block {\r\n\tposition: fixed;\r\n\tleft:0;\r\n\ttop:0;\r\n\tz-index: -1;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css":
/*!***********************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./actionbar.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./actionbar.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./actionbar.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/actionbar/actionbar.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/browser/ui/aria/aria.css":
/*!*************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/browser/ui/aria/aria.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./aria.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/aria/aria.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./aria.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/aria/aria.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./aria.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/aria/aria.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon-animations.css":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon-animations.css ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../../css-loader/dist/cjs.js!./codicon-animations.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon-animations.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../../css-loader/dist/cjs.js!./codicon-animations.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon-animations.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../../css-loader/dist/cjs.js!./codicon-animations.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon-animations.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon.css":
/*!********************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon.css ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../../css-loader/dist/cjs.js!./codicon.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../../css-loader/dist/cjs.js!./codicon.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../../css-loader/dist/cjs.js!./codicon.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon.ttf":
/*!********************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon.ttf ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "static/img/codicon.a609dc0f.ttf");

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/browser/ui/contextview/contextview.css":
/*!***************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/browser/ui/contextview/contextview.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./contextview.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/contextview/contextview.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./contextview.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/contextview/contextview.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./contextview.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/contextview/contextview.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/browser/ui/iconLabel/iconlabel.css":
/*!***********************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/browser/ui/iconLabel/iconlabel.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./iconlabel.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/iconLabel/iconlabel.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./iconlabel.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/iconLabel/iconlabel.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./iconlabel.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/iconLabel/iconlabel.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/browser/ui/list/list.css":
/*!*************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/browser/ui/list/list.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./list.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/list/list.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./list.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/list/list.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./list.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/list/list.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/browser/ui/menu/menu.css":
/*!*************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/browser/ui/menu/menu.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./menu.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/menu/menu.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./menu.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/menu/menu.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./menu.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/menu/menu.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/browser/ui/sash/sash.css":
/*!*************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/browser/ui/sash/sash.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./sash.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/sash/sash.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./sash.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/sash/sash.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./sash.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/sash/sash.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/browser/ui/scrollbar/media/scrollbars.css":
/*!******************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/browser/ui/scrollbar/media/scrollbars.css ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../../css-loader/dist/cjs.js!./scrollbars.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/scrollbar/media/scrollbars.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../../css-loader/dist/cjs.js!./scrollbars.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/scrollbar/media/scrollbars.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../../css-loader/dist/cjs.js!./scrollbars.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/scrollbar/media/scrollbars.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/base/browser/ui/tree/media/tree.css":
/*!*******************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/base/browser/ui/tree/media/tree.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../../css-loader/dist/cjs.js!./tree.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/tree/media/tree.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../../css-loader/dist/cjs.js!./tree.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/tree/media/tree.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../../css-loader/dist/cjs.js!./tree.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/base/browser/ui/tree/media/tree.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/controller/textAreaHandler.css":
/*!*****************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/controller/textAreaHandler.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../css-loader/dist/cjs.js!./textAreaHandler.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/controller/textAreaHandler.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../css-loader/dist/cjs.js!./textAreaHandler.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/controller/textAreaHandler.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../css-loader/dist/cjs.js!./textAreaHandler.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/controller/textAreaHandler.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/currentLineHighlight/currentLineHighlight.css":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/currentLineHighlight/currentLineHighlight.css ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./currentLineHighlight.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/currentLineHighlight/currentLineHighlight.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./currentLineHighlight.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/currentLineHighlight/currentLineHighlight.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./currentLineHighlight.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/currentLineHighlight/currentLineHighlight.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/decorations/decorations.css":
/*!************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/decorations/decorations.css ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./decorations.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/decorations/decorations.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./decorations.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/decorations/decorations.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./decorations.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/decorations/decorations.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/glyphMargin/glyphMargin.css":
/*!************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/glyphMargin/glyphMargin.css ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./glyphMargin.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/glyphMargin/glyphMargin.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./glyphMargin.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/glyphMargin/glyphMargin.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./glyphMargin.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/glyphMargin/glyphMargin.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/indentGuides/indentGuides.css":
/*!**************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/indentGuides/indentGuides.css ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./indentGuides.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/indentGuides/indentGuides.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./indentGuides.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/indentGuides/indentGuides.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./indentGuides.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/indentGuides/indentGuides.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/lineNumbers/lineNumbers.css":
/*!************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/lineNumbers/lineNumbers.css ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./lineNumbers.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/lineNumbers/lineNumbers.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./lineNumbers.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/lineNumbers/lineNumbers.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./lineNumbers.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/lineNumbers/lineNumbers.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/lines/viewLines.css":
/*!****************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/lines/viewLines.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./viewLines.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/lines/viewLines.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./viewLines.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/lines/viewLines.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./viewLines.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/lines/viewLines.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/linesDecorations/linesDecorations.css":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/linesDecorations/linesDecorations.css ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./linesDecorations.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/linesDecorations/linesDecorations.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./linesDecorations.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/linesDecorations/linesDecorations.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./linesDecorations.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/linesDecorations/linesDecorations.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/marginDecorations/marginDecorations.css":
/*!************************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/marginDecorations/marginDecorations.css ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./marginDecorations.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/marginDecorations/marginDecorations.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./marginDecorations.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/marginDecorations/marginDecorations.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./marginDecorations.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/marginDecorations/marginDecorations.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/minimap/minimap.css":
/*!****************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/minimap/minimap.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./minimap.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/minimap/minimap.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./minimap.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/minimap/minimap.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./minimap.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/minimap/minimap.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/overlayWidgets/overlayWidgets.css":
/*!******************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/overlayWidgets/overlayWidgets.css ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./overlayWidgets.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/overlayWidgets/overlayWidgets.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./overlayWidgets.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/overlayWidgets/overlayWidgets.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./overlayWidgets.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/overlayWidgets/overlayWidgets.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/rulers/rulers.css":
/*!**************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/rulers/rulers.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./rulers.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/rulers/rulers.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./rulers.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/rulers/rulers.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./rulers.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/rulers/rulers.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/scrollDecoration/scrollDecoration.css":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/scrollDecoration/scrollDecoration.css ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./scrollDecoration.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/scrollDecoration/scrollDecoration.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./scrollDecoration.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/scrollDecoration/scrollDecoration.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./scrollDecoration.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/scrollDecoration/scrollDecoration.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/selections/selections.css":
/*!**********************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/selections/selections.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./selections.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/selections/selections.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./selections.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/selections/selections.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./selections.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/selections/selections.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/viewCursors/viewCursors.css":
/*!************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/viewCursors/viewCursors.css ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./viewCursors.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/viewCursors/viewCursors.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./viewCursors.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/viewCursors/viewCursors.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./viewCursors.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/viewParts/viewCursors/viewCursors.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/diffEditor.css":
/*!**************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/diffEditor.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./diffEditor.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/diffEditor.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./diffEditor.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/diffEditor.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./diffEditor.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/diffEditor.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/diffReview.css":
/*!**************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/diffReview.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./diffReview.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/diffReview.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./diffReview.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/diffReview.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./diffReview.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/diffReview.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/editor.css":
/*!**********************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/editor.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./editor.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/editor.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./editor.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/editor.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./editor.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/browser/widget/media/editor.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.css":
/*!**********************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../css-loader/dist/cjs.js!./bracketMatching.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../css-loader/dist/cjs.js!./bracketMatching.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../css-loader/dist/cjs.js!./bracketMatching.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/contrib/documentSymbols/media/outlineTree.css":
/*!************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/contrib/documentSymbols/media/outlineTree.css ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./outlineTree.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/documentSymbols/media/outlineTree.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./outlineTree.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/documentSymbols/media/outlineTree.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./outlineTree.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/documentSymbols/media/outlineTree.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/contrib/documentSymbols/media/symbol-icons.css":
/*!*************************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/contrib/documentSymbols/media/symbol-icons.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./symbol-icons.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/documentSymbols/media/symbol-icons.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./symbol-icons.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/documentSymbols/media/symbol-icons.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./symbol-icons.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/documentSymbols/media/symbol-icons.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/contrib/folding/folding.css":
/*!******************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/contrib/folding/folding.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../css-loader/dist/cjs.js!./folding.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/folding/folding.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../css-loader/dist/cjs.js!./folding.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/folding/folding.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../css-loader/dist/cjs.js!./folding.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/folding/folding.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/contrib/parameterHints/parameterHints.css":
/*!********************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/contrib/parameterHints/parameterHints.css ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../css-loader/dist/cjs.js!./parameterHints.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/parameterHints/parameterHints.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../css-loader/dist/cjs.js!./parameterHints.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/parameterHints/parameterHints.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../css-loader/dist/cjs.js!./parameterHints.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/parameterHints/parameterHints.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/contrib/snippet/snippetSession.css":
/*!*************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/contrib/snippet/snippetSession.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../css-loader/dist/cjs.js!./snippetSession.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/snippet/snippetSession.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../css-loader/dist/cjs.js!./snippetSession.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/snippet/snippetSession.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../css-loader/dist/cjs.js!./snippetSession.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/snippet/snippetSession.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/contrib/suggest/media/suggest.css":
/*!************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/contrib/suggest/media/suggest.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./suggest.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/suggest/media/suggest.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./suggest.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/suggest/media/suggest.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./suggest.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/suggest/media/suggest.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/contrib/suggest/media/suggestStatusBar.css":
/*!*********************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/contrib/suggest/media/suggestStatusBar.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./suggestStatusBar.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/suggest/media/suggestStatusBar.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../../css-loader/dist/cjs.js!./suggestStatusBar.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/suggest/media/suggestStatusBar.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../../css-loader/dist/cjs.js!./suggestStatusBar.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/contrib/suggest/media/suggestStatusBar.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/editor/standalone/browser/standalone-tokens.css":
/*!*******************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/editor/standalone/browser/standalone-tokens.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../css-loader/dist/cjs.js!./standalone-tokens.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/standalone/browser/standalone-tokens.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../css-loader/dist/cjs.js!./standalone-tokens.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/standalone/browser/standalone-tokens.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../css-loader/dist/cjs.js!./standalone-tokens.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/editor/standalone/browser/standalone-tokens.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ }),

/***/ "./node_modules/monaco-editor/esm/vs/platform/contextview/browser/contextMenuHandler.css":
/*!***********************************************************************************************!*\
  !*** ./node_modules/monaco-editor/esm/vs/platform/contextview/browser/contextMenuHandler.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../../css-loader/dist/cjs.js!./contextMenuHandler.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/platform/contextview/browser/contextMenuHandler.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};


if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../../../../../css-loader/dist/cjs.js!./contextMenuHandler.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/platform/contextview/browser/contextMenuHandler.css",
      function () {
        var newContent = __webpack_require__(/*! !../../../../../../css-loader/dist/cjs.js!./contextMenuHandler.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/monaco-editor/esm/vs/platform/contextview/browser/contextMenuHandler.css");

              newContent = newContent.__esModule ? newContent.default : newContent;

              if (typeof newContent === 'string') {
                newContent = [[module.i, newContent, '']];
              }

              update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

module.exports = exported;

/***/ })

}]);
//# sourceMappingURL=code-editor.1ebdc265fc3bd7452fcd.js.map