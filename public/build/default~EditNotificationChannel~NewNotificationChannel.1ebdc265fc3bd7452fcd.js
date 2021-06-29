(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~EditNotificationChannel~NewNotificationChannel"],{

/***/ "./public/app/features/alerting/components/BasicSettings.tsx":
/*!*******************************************************************!*\
  !*** ./public/app/features/alerting/components/BasicSettings.tsx ***!
  \*******************************************************************/
/*! exports provided: BasicSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicSettings", function() { return BasicSettings; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _NotificationChannelOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotificationChannelOptions */ "./public/app/features/alerting/components/NotificationChannelOptions.tsx");



var BasicSettings = function BasicSettings(_ref) {
  var control = _ref.control,
      currentFormValues = _ref.currentFormValues,
      errors = _ref.errors,
      secureFields = _ref.secureFields,
      selectedChannel = _ref.selectedChannel,
      channels = _ref.channels,
      register = _ref.register,
      resetSecureField = _ref.resetSecureField;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
    label: "\u540D\u5B57",
    invalid: !!errors.name,
    error: errors.name && errors.name.message
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "name",
    ref: register({
      required: '名字必填项'
    })
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
    label: "\u7C7B\u578B"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InputControl"], {
    name: "type",
    as: _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"],
    options: channels,
    control: control,
    rules: {
      required: true
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NotificationChannelOptions__WEBPACK_IMPORTED_MODULE_2__["NotificationChannelOptions"], {
    selectedChannelOptions: selectedChannel.options.filter(function (o) {
      return o.required;
    }),
    currentFormValues: currentFormValues,
    secureFields: secureFields,
    onResetSecureField: resetSecureField,
    register: register,
    errors: errors,
    control: control
  }));
};

/***/ }),

/***/ "./public/app/features/alerting/components/ChannelSettings.tsx":
/*!*********************************************************************!*\
  !*** ./public/app/features/alerting/components/ChannelSettings.tsx ***!
  \*********************************************************************/
/*! exports provided: ChannelSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChannelSettings", function() { return ChannelSettings; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _NotificationChannelOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotificationChannelOptions */ "./public/app/features/alerting/components/NotificationChannelOptions.tsx");



var ChannelSettings = function ChannelSettings(_ref) {
  var control = _ref.control,
      currentFormValues = _ref.currentFormValues,
      errors = _ref.errors,
      selectedChannel = _ref.selectedChannel,
      secureFields = _ref.secureFields,
      register = _ref.register,
      resetSecureField = _ref.resetSecureField;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["CollapsableSection"], {
    label: "Optional ".concat(selectedChannel.heading),
    isOpen: false
  }, selectedChannel.info !== '' && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InfoBox"], null, selectedChannel.info), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NotificationChannelOptions__WEBPACK_IMPORTED_MODULE_2__["NotificationChannelOptions"], {
    selectedChannelOptions: selectedChannel.options.filter(function (o) {
      return !o.required;
    }),
    currentFormValues: currentFormValues,
    register: register,
    errors: errors,
    control: control,
    onResetSecureField: resetSecureField,
    secureFields: secureFields
  }));
};

/***/ }),

/***/ "./public/app/features/alerting/components/NotificationChannelForm.tsx":
/*!*****************************************************************************!*\
  !*** ./public/app/features/alerting/components/NotificationChannelForm.tsx ***!
  \*****************************************************************************/
/*! exports provided: NotificationChannelForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationChannelForm", function() { return NotificationChannelForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _NotificationSettings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NotificationSettings */ "./public/app/features/alerting/components/NotificationSettings.tsx");
/* harmony import */ var _BasicSettings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BasicSettings */ "./public/app/features/alerting/components/BasicSettings.tsx");
/* harmony import */ var _ChannelSettings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ChannelSettings */ "./public/app/features/alerting/components/ChannelSettings.tsx");
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      padding-top: ", ";\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      flex-grow: 1;\n      padding-top: ", ";\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var NotificationChannelForm = function NotificationChannelForm(_ref) {
  var control = _ref.control,
      errors = _ref.errors,
      selectedChannel = _ref.selectedChannel,
      selectableChannels = _ref.selectableChannels,
      register = _ref.register,
      watch = _ref.watch,
      getValues = _ref.getValues,
      imageRendererAvailable = _ref.imageRendererAvailable,
      onTestChannel = _ref.onTestChannel,
      resetSecureField = _ref.resetSecureField,
      secureFields = _ref.secureFields;
  var styles = getStyles(Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["useTheme"])());
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    watch(['type', 'settings.priority', 'sendReminder', 'uploadImage']);
  }, []);
  var currentFormValues = getValues();

  if (!selectedChannel) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Spinner"], null);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.formContainer
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.formItem
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_BasicSettings__WEBPACK_IMPORTED_MODULE_4__["BasicSettings"], {
    selectedChannel: selectedChannel,
    channels: selectableChannels,
    secureFields: secureFields,
    resetSecureField: resetSecureField,
    currentFormValues: currentFormValues,
    register: register,
    errors: errors,
    control: control
  })), selectedChannel.options.filter(function (o) {
    return !o.required;
  }).length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.formItem
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ChannelSettings__WEBPACK_IMPORTED_MODULE_5__["ChannelSettings"], {
    selectedChannel: selectedChannel,
    secureFields: secureFields,
    resetSecureField: resetSecureField,
    currentFormValues: currentFormValues,
    register: register,
    errors: errors,
    control: control
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.formItem
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NotificationSettings__WEBPACK_IMPORTED_MODULE_3__["NotificationSettings"], {
    imageRendererAvailable: imageRendererAvailable,
    currentFormValues: currentFormValues,
    register: register,
    errors: errors,
    control: control
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.formButtons
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["HorizontalGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    type: "submit"
  }, "\u4FDD\u5B58"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    type: "button",
    variant: "secondary",
    onClick: function onClick() {
      return onTestChannel(getValues({
        nest: true
      }));
    }
  }, "\u6D4B\u8BD5"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "/alerting/notifications"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    type: "button",
    variant: "secondary"
  }, "\u8FD4\u56DE")))));
};
var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function (theme) {
  return {
    formContainer: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject()),
    formItem: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2(), theme.spacing.md),
    formButtons: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3(), theme.spacing.xl)
  };
});

/***/ }),

/***/ "./public/app/features/alerting/components/NotificationChannelOptions.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/features/alerting/components/NotificationChannelOptions.tsx ***!
  \********************************************************************************/
/*! exports provided: NotificationChannelOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationChannelOptions", function() { return NotificationChannelOptions; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _OptionElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OptionElement */ "./public/app/features/alerting/components/OptionElement.tsx");



var NotificationChannelOptions = function NotificationChannelOptions(_ref) {
  var control = _ref.control,
      currentFormValues = _ref.currentFormValues,
      errors = _ref.errors,
      selectedChannelOptions = _ref.selectedChannelOptions,
      register = _ref.register,
      onResetSecureField = _ref.onResetSecureField,
      secureFields = _ref.secureFields;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, selectedChannelOptions.map(function (option, index) {
    var _errors$settings$opti;

    var key = "".concat(option.label, "-").concat(index); // Some options can be dependent on other options, this determines what is selected in the dependency options
    // I think this needs more thought.

    var selectedOptionValue = currentFormValues["settings.".concat(option.showWhen.field)] && currentFormValues["settings.".concat(option.showWhen.field)].value;

    if (option.showWhen.field && selectedOptionValue !== option.showWhen.is) {
      return null;
    }

    if (option.element === 'checkbox') {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
        key: key
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], {
        name: option.secure ? "secureSettings.".concat(option.propertyName) : "settings.".concat(option.propertyName),
        ref: register,
        label: option.label,
        description: option.description
      }));
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      key: key,
      label: option.label,
      description: option.description,
      invalid: errors.settings && !!errors.settings[option.propertyName],
      error: errors.settings && ((_errors$settings$opti = errors.settings[option.propertyName]) === null || _errors$settings$opti === void 0 ? void 0 : _errors$settings$opti.message)
    }, secureFields && secureFields[option.propertyName] ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
      readOnly: true,
      value: "Configured",
      suffix: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        onClick: function onClick() {
          return onResetSecureField(option.propertyName);
        },
        variant: "link",
        type: "button",
        size: "sm"
      }, "Clear")
    }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OptionElement__WEBPACK_IMPORTED_MODULE_2__["OptionElement"], {
      option: option,
      register: register,
      control: control
    }));
  }));
};

/***/ }),

/***/ "./public/app/features/alerting/components/NotificationSettings.tsx":
/*!**************************************************************************!*\
  !*** ./public/app/features/alerting/components/NotificationSettings.tsx ***!
  \**************************************************************************/
/*! exports provided: NotificationSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationSettings", function() { return NotificationSettings; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");


var NotificationSettings = function NotificationSettings(_ref) {
  var currentFormValues = _ref.currentFormValues,
      imageRendererAvailable = _ref.imageRendererAvailable,
      register = _ref.register;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["CollapsableSection"], {
    label: "\u901A\u77E5\u8BBE\u7F6E",
    isOpen: false
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], {
    name: "isDefault",
    ref: register,
    label: "\u9ED8\u8BA4",
    description: "\u5C06\u6B64\u901A\u77E5\u7528\u4E8E\u6240\u6709\u8B66\u62A5"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], {
    name: "settings.uploadImage",
    ref: register,
    label: "\u5305\u542B\u56FE\u7247",
    description: "\u6355\u83B7\u56FE\u50CF\u5E76\u5C06\u5176\u5305\u542B\u5728\u901A\u77E5\u4E2D"
  })), currentFormValues.uploadImage && !imageRendererAvailable && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InfoBox"], {
    title: "\u6CA1\u6709\u53EF\u7528\u7684\u56FE\u50CF\u6E32\u67D3\u5668/\u672A\u5B89\u88C5"
  }, "Grafana\u627E\u4E0D\u5230\u7528\u4E8E\u6E32\u67D3\u901A\u77E5\u56FE\u50CF\u7684\u56FE\u50CF\u6E32\u67D3\u5668\u3002 \u8BF7\u786E\u4FDD\u5DF2\u5B89\u88C5Grafana Image Renderer\u63D2\u4EF6\u3002 \u8BF7\u4E0E\u60A8\u7684Grafana\u7BA1\u7406\u5458\u8054\u7CFB\u4EE5\u5B89\u88C5\u63D2\u4EF6\u3002"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], {
    name: "disableResolveMessage",
    ref: register,
    label: "\u7981\u7528\u89E3\u51B3\u6D88\u606F",
    description: "\u7981\u7528\u8B66\u62A5\u72B6\u6001\u8FD4\u56DE\u4E3Afalse\u65F6\u53D1\u9001\u7684\u89E3\u51B3\u6D88\u606F[OK]"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Checkbox"], {
    name: "sendReminder",
    ref: register,
    label: "\u53D1\u9001\u63D0\u9192",
    description: "\u53D1\u9001\u5176\u4ED6\u901A\u77E5\u4EE5\u89E6\u53D1\u8B66\u62A5"
  })), currentFormValues.sendReminder && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
    label: "\u6BCF\u5929\u53D1\u9001\u63D0\u9192",
    description: "\u6307\u5B9A\u5E94\u8BE5\u591A\u4E45\u53D1\u9001\u4E00\u6B21\u63D0\u9192\uFF0C\u4F8B\u5982 \u6BCF30s\uFF0C1m\uFF0C10m\uFF0C30m\u62161h\u7B49\u3002\u8BC4\u4F30\u89C4\u5219\u540E\u5C06\u53D1\u9001\u8B66\u62A5\u63D0\u9192\u3002 \u56E0\u6B64\uFF0C\u6C38\u8FDC\u4E0D\u4F1A\u6BD4\u914D\u7F6E\u7684\u8B66\u62A5\u89C4\u5219\u8BC4\u4F30\u95F4\u9694\u66F4\u9891\u7E41\u5730\u53D1\u9001\u63D0\u9192\u3002"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    name: "frequency",
    ref: register,
    width: 8
  }))));
};

/***/ }),

/***/ "./public/app/features/alerting/components/OptionElement.tsx":
/*!*******************************************************************!*\
  !*** ./public/app/features/alerting/components/OptionElement.tsx ***!
  \*******************************************************************/
/*! exports provided: OptionElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionElement", function() { return OptionElement; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");


var OptionElement = function OptionElement(_ref) {
  var control = _ref.control,
      option = _ref.option,
      register = _ref.register,
      invalid = _ref.invalid;
  var modelValue = option.secure ? "secureSettings.".concat(option.propertyName) : "settings.".concat(option.propertyName);

  switch (option.element) {
    case 'input':
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
        invalid: invalid,
        type: option.inputType,
        name: "".concat(modelValue),
        ref: register({
          required: option.required ? 'Required' : false,
          validate: function validate(v) {
            return option.validationRule !== '' ? validateOption(v, option.validationRule) : true;
          }
        }),
        placeholder: option.placeholder
      });

    case 'select':
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InputControl"], {
        as: _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"],
        options: option.selectOptions,
        control: control,
        name: "".concat(modelValue),
        invalid: invalid
      });

    case 'textarea':
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["TextArea"], {
        invalid: invalid,
        name: "".concat(modelValue),
        ref: register({
          required: option.required ? 'Required' : false,
          validate: function validate(v) {
            return option.validationRule !== '' ? validateOption(v, option.validationRule) : true;
          }
        })
      });

    default:
      console.error('不支持元素', option.element);
      return null;
  }
};

var validateOption = function validateOption(value, validationRule) {
  return RegExp(validationRule).test(value) ? true : 'Invalid format';
};

/***/ }),

/***/ "./public/app/features/alerting/state/actions.ts":
/*!*******************************************************!*\
  !*** ./public/app/features/alerting/state/actions.ts ***!
  \*******************************************************/
/*! exports provided: getAlertRulesAsync, togglePauseAlertRule, createNotificationChannel, updateNotificationChannel, testNotificationChannel, loadNotificationTypes, loadNotificationChannel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAlertRulesAsync", function() { return getAlertRulesAsync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "togglePauseAlertRule", function() { return togglePauseAlertRule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNotificationChannel", function() { return createNotificationChannel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateNotificationChannel", function() { return updateNotificationChannel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testNotificationChannel", function() { return testNotificationChannel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadNotificationTypes", function() { return loadNotificationTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadNotificationChannel", function() { return loadNotificationChannel; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/core */ "./public/app/core/core.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reducers */ "./public/app/features/alerting/state/reducers.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






function getAlertRulesAsync(options) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(dispatch) {
        var rules;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_4__["loadAlertRules"])());
                _context.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get('/api/alerts', options);

              case 3:
                rules = _context.sent;
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_4__["loadedAlertRules"])(rules));

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
function togglePauseAlertRule(id, options) {
  return (
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(dispatch, getState) {
        var stateFilter;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post("/api/alerts/".concat(id, "/pause"), options);

              case 2:
                stateFilter = getState().location.query.state || 'all';
                dispatch(getAlertRulesAsync({
                  state: stateFilter.toString()
                }));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
}
function createNotificationChannel(data) {
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
                _context3.prev = 0;
                _context3.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post("/api/alert-notifications", data);

              case 3:
                app_core_core__WEBPACK_IMPORTED_MODULE_2__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["AppEvents"].alertSuccess, ['Notification created']);
                dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateLocation"])({
                  path: 'alerting/notifications'
                }));
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                app_core_core__WEBPACK_IMPORTED_MODULE_2__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["AppEvents"].alertError, [_context3.t0.data.error]);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      return function (_x4) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
}
function updateNotificationChannel(data) {
  return (
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(dispatch) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().put("/api/alert-notifications/".concat(data.id), data);

              case 3:
                app_core_core__WEBPACK_IMPORTED_MODULE_2__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["AppEvents"].alertSuccess, ['Notification updated']);
                dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateLocation"])({
                  path: 'alerting/notifications'
                }));
                _context4.next = 10;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                app_core_core__WEBPACK_IMPORTED_MODULE_2__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["AppEvents"].alertError, [_context4.t0.data.error]);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }));

      return function (_x5) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
}
function testNotificationChannel(data) {
  return (
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(dispatch, getState) {
        var channel;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                channel = getState().notificationChannel.notificationChannel;
                _context5.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post('/api/alert-notifications/test', _objectSpread({
                  id: channel.id
                }, data));

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x6, _x7) {
        return _ref5.apply(this, arguments);
      };
    }()
  );
}
function loadNotificationTypes() {
  return (
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(dispatch) {
        var alertNotifiers, notificationTypes;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get("/api/alert-notifiers");

              case 2:
                alertNotifiers = _context6.sent;
                notificationTypes = alertNotifiers.sort(function (o1, o2) {
                  if (o1.name > o2.name) {
                    return 1;
                  }

                  return -1;
                });
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_4__["setNotificationChannels"])(notificationTypes));

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x8) {
        return _ref6.apply(this, arguments);
      };
    }()
  );
}
function loadNotificationChannel(id) {
  return (
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(dispatch) {
        var notificationChannel;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get("/api/alert-notifications/".concat(id));

              case 2:
                notificationChannel = _context7.sent;
                dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_4__["notificationChannelLoaded"])(notificationChannel));

              case 4:
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

/***/ }),

/***/ "./public/app/features/alerting/utils/notificationChannels.ts":
/*!********************************************************************!*\
  !*** ./public/app/features/alerting/utils/notificationChannels.ts ***!
  \********************************************************************/
/*! exports provided: defaultValues, mapChannelsToSelectableValue, transformSubmitData, transformTestData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultValues", function() { return defaultValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapChannelsToSelectableValue", function() { return mapChannelsToSelectableValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformSubmitData", function() { return transformSubmitData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformTestData", function() { return transformTestData; });
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var defaultValues = {
  id: -1,
  name: '',
  type: {
    value: 'email',
    label: 'Email'
  },
  sendReminder: false,
  disableResolveMessage: false,
  frequency: '15m',
  settings: {
    uploadImage: _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["config"].rendererAvailable,
    autoResolve: true,
    httpMethod: 'POST',
    severity: 'critical'
  },
  secureSettings: {},
  secureFields: {},
  isDefault: false
};
var mapChannelsToSelectableValue = Object(memoize_one__WEBPACK_IMPORTED_MODULE_0__["default"])(function (notificationChannels) {
  return notificationChannels.map(function (channel) {
    return {
      value: channel.value,
      label: channel.label,
      description: channel.description
    };
  });
});
var transformSubmitData = function transformSubmitData(formData) {
  /*
    Some settings can be options in a select, in order to not save a SelectableValue<T>
    we need to use check if it is a SelectableValue and use its value.
  */
  var settings = Object.fromEntries(Object.entries(formData.settings).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return [key, value && value.hasOwnProperty('value') ? value.value : value];
  }));
  return _objectSpread({}, defaultValues, {}, formData, {
    frequency: formData.frequency === '' ? defaultValues.frequency : formData.frequency,
    type: formData.type.value,
    settings: _objectSpread({}, defaultValues.settings, {}, settings),
    secureSettings: _objectSpread({}, formData.secureSettings)
  });
};
var transformTestData = function transformTestData(formData) {
  var _formData$frequency;

  return {
    name: formData.name,
    type: formData.type.value,
    frequency: (_formData$frequency = formData.frequency) !== null && _formData$frequency !== void 0 ? _formData$frequency : defaultValues.frequency,
    settings: _objectSpread({}, Object.assign(defaultValues.settings, formData.settings)),
    secureSettings: _objectSpread({}, formData.secureSettings)
  };
};

/***/ })

}]);
//# sourceMappingURL=default~EditNotificationChannel~NewNotificationChannel.1ebdc265fc3bd7452fcd.js.map