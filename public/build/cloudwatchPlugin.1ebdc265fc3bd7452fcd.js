(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cloudwatchPlugin"],{

/***/ "./node_modules/common-tags/es/TemplateTag/TemplateTag.js":
/*!****************************************************************!*\
  !*** ./node_modules/common-tags/es/TemplateTag/TemplateTag.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['', ''], ['', '']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class TemplateTag
 * @classdesc Consumes a pipeline of composable transformer plugins and produces a template tag.
 */
var TemplateTag = function () {
  /**
   * constructs a template tag
   * @constructs TemplateTag
   * @param  {...Object} [...transformers] - an array or arguments list of transformers
   * @return {Function}                    - a template tag
   */
  function TemplateTag() {
    var _this = this;

    for (var _len = arguments.length, transformers = Array(_len), _key = 0; _key < _len; _key++) {
      transformers[_key] = arguments[_key];
    }

    _classCallCheck(this, TemplateTag);

    this.tag = function (strings) {
      for (var _len2 = arguments.length, expressions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        expressions[_key2 - 1] = arguments[_key2];
      }

      if (typeof strings === 'function') {
        // if the first argument passed is a function, assume it is a template tag and return
        // an intermediary tag that processes the template using the aforementioned tag, passing the
        // result to our tag
        return _this.interimTag.bind(_this, strings);
      }

      if (typeof strings === 'string') {
        // if the first argument passed is a string, just transform it
        return _this.transformEndResult(strings);
      }

      // else, return a transformed end result of processing the template with our tag
      strings = strings.map(_this.transformString.bind(_this));
      return _this.transformEndResult(strings.reduce(_this.processSubstitutions.bind(_this, expressions)));
    };

    // if first argument is an array, extrude it as a list of transformers
    if (transformers.length > 0 && Array.isArray(transformers[0])) {
      transformers = transformers[0];
    }

    // if any transformers are functions, this means they are not initiated - automatically initiate them
    this.transformers = transformers.map(function (transformer) {
      return typeof transformer === 'function' ? transformer() : transformer;
    });

    // return an ES2015 template tag
    return this.tag;
  }

  /**
   * Applies all transformers to a template literal tagged with this method.
   * If a function is passed as the first argument, assumes the function is a template tag
   * and applies it to the template, returning a template tag.
   * @param  {(Function|String|Array<String>)} strings        - Either a template tag or an array containing template strings separated by identifier
   * @param  {...*}                            ...expressions - Optional list of substitution values.
   * @return {(String|Function)}                              - Either an intermediary tag function or the results of processing the template.
   */


  _createClass(TemplateTag, [{
    key: 'interimTag',


    /**
     * An intermediary template tag that receives a template tag and passes the result of calling the template with the received
     * template tag to our own template tag.
     * @param  {Function}        nextTag          - the received template tag
     * @param  {Array<String>}   template         - the template to process
     * @param  {...*}            ...substitutions - `substitutions` is an array of all substitutions in the template
     * @return {*}                                - the final processed value
     */
    value: function interimTag(previousTag, template) {
      for (var _len3 = arguments.length, substitutions = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        substitutions[_key3 - 2] = arguments[_key3];
      }

      return this.tag(_templateObject, previousTag.apply(undefined, [template].concat(substitutions)));
    }

    /**
     * Performs bulk processing on the tagged template, transforming each substitution and then
     * concatenating the resulting values into a string.
     * @param  {Array<*>} substitutions - an array of all remaining substitutions present in this template
     * @param  {String}   resultSoFar   - this iteration's result string so far
     * @param  {String}   remainingPart - the template chunk after the current substitution
     * @return {String}                 - the result of joining this iteration's processed substitution with the result
     */

  }, {
    key: 'processSubstitutions',
    value: function processSubstitutions(substitutions, resultSoFar, remainingPart) {
      var substitution = this.transformSubstitution(substitutions.shift(), resultSoFar);
      return ''.concat(resultSoFar, substitution, remainingPart);
    }

    /**
     * Iterate through each transformer, applying the transformer's `onString` method to the template
     * strings before all substitutions are processed.
     * @param {String}  str - The input string
     * @return {String}     - The final results of processing each transformer
     */

  }, {
    key: 'transformString',
    value: function transformString(str) {
      var cb = function cb(res, transform) {
        return transform.onString ? transform.onString(res) : res;
      };
      return this.transformers.reduce(cb, str);
    }

    /**
     * When a substitution is encountered, iterates through each transformer and applies the transformer's
     * `onSubstitution` method to the substitution.
     * @param  {*}      substitution - The current substitution
     * @param  {String} resultSoFar  - The result up to and excluding this substitution.
     * @return {*}                   - The final result of applying all substitution transformations.
     */

  }, {
    key: 'transformSubstitution',
    value: function transformSubstitution(substitution, resultSoFar) {
      var cb = function cb(res, transform) {
        return transform.onSubstitution ? transform.onSubstitution(res, resultSoFar) : res;
      };
      return this.transformers.reduce(cb, substitution);
    }

    /**
     * Iterates through each transformer, applying the transformer's `onEndResult` method to the
     * template literal after all substitutions have finished processing.
     * @param  {String} endResult - The processed template, just before it is returned from the tag
     * @return {String}           - The final results of processing each transformer
     */

  }, {
    key: 'transformEndResult',
    value: function transformEndResult(endResult) {
      var cb = function cb(res, transform) {
        return transform.onEndResult ? transform.onEndResult(res) : res;
      };
      return this.transformers.reduce(cb, endResult);
    }
  }]);

  return TemplateTag;
}();

/* harmony default export */ __webpack_exports__["default"] = (TemplateTag);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UZW1wbGF0ZVRhZy9UZW1wbGF0ZVRhZy5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZVRhZyIsInRyYW5zZm9ybWVycyIsInRhZyIsInN0cmluZ3MiLCJleHByZXNzaW9ucyIsImludGVyaW1UYWciLCJiaW5kIiwidHJhbnNmb3JtRW5kUmVzdWx0IiwibWFwIiwidHJhbnNmb3JtU3RyaW5nIiwicmVkdWNlIiwicHJvY2Vzc1N1YnN0aXR1dGlvbnMiLCJsZW5ndGgiLCJBcnJheSIsImlzQXJyYXkiLCJ0cmFuc2Zvcm1lciIsInByZXZpb3VzVGFnIiwidGVtcGxhdGUiLCJzdWJzdGl0dXRpb25zIiwicmVzdWx0U29GYXIiLCJyZW1haW5pbmdQYXJ0Iiwic3Vic3RpdHV0aW9uIiwidHJhbnNmb3JtU3Vic3RpdHV0aW9uIiwic2hpZnQiLCJjb25jYXQiLCJzdHIiLCJjYiIsInJlcyIsInRyYW5zZm9ybSIsIm9uU3RyaW5nIiwib25TdWJzdGl0dXRpb24iLCJlbmRSZXN1bHQiLCJvbkVuZFJlc3VsdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztJQUlxQkEsVztBQUNuQjs7Ozs7O0FBTUEseUJBQTZCO0FBQUE7O0FBQUEsc0NBQWRDLFlBQWM7QUFBZEEsa0JBQWM7QUFBQTs7QUFBQTs7QUFBQSxTQXVCN0JDLEdBdkI2QixHQXVCdkIsVUFBQ0MsT0FBRCxFQUE2QjtBQUFBLHlDQUFoQkMsV0FBZ0I7QUFBaEJBLG1CQUFnQjtBQUFBOztBQUNqQyxVQUFJLE9BQU9ELE9BQVAsS0FBbUIsVUFBdkIsRUFBbUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsZUFBTyxNQUFLRSxVQUFMLENBQWdCQyxJQUFoQixRQUEyQkgsT0FBM0IsQ0FBUDtBQUNEOztBQUVELFVBQUksT0FBT0EsT0FBUCxLQUFtQixRQUF2QixFQUFpQztBQUMvQjtBQUNBLGVBQU8sTUFBS0ksa0JBQUwsQ0FBd0JKLE9BQXhCLENBQVA7QUFDRDs7QUFFRDtBQUNBQSxnQkFBVUEsUUFBUUssR0FBUixDQUFZLE1BQUtDLGVBQUwsQ0FBcUJILElBQXJCLE9BQVosQ0FBVjtBQUNBLGFBQU8sTUFBS0Msa0JBQUwsQ0FDTEosUUFBUU8sTUFBUixDQUFlLE1BQUtDLG9CQUFMLENBQTBCTCxJQUExQixRQUFxQ0YsV0FBckMsQ0FBZixDQURLLENBQVA7QUFHRCxLQXpDNEI7O0FBQzNCO0FBQ0EsUUFBSUgsYUFBYVcsTUFBYixHQUFzQixDQUF0QixJQUEyQkMsTUFBTUMsT0FBTixDQUFjYixhQUFhLENBQWIsQ0FBZCxDQUEvQixFQUErRDtBQUM3REEscUJBQWVBLGFBQWEsQ0FBYixDQUFmO0FBQ0Q7O0FBRUQ7QUFDQSxTQUFLQSxZQUFMLEdBQW9CQSxhQUFhTyxHQUFiLENBQWlCLHVCQUFlO0FBQ2xELGFBQU8sT0FBT08sV0FBUCxLQUF1QixVQUF2QixHQUFvQ0EsYUFBcEMsR0FBb0RBLFdBQTNEO0FBQ0QsS0FGbUIsQ0FBcEI7O0FBSUE7QUFDQSxXQUFPLEtBQUtiLEdBQVo7QUFDRDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7QUE0QkE7Ozs7Ozs7OytCQVFXYyxXLEVBQWFDLFEsRUFBNEI7QUFBQSx5Q0FBZkMsYUFBZTtBQUFmQSxxQkFBZTtBQUFBOztBQUNsRCxhQUFPLEtBQUtoQixHQUFaLGtCQUFrQmMsOEJBQVlDLFFBQVosU0FBeUJDLGFBQXpCLEVBQWxCO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7O3lDQVFxQkEsYSxFQUFlQyxXLEVBQWFDLGEsRUFBZTtBQUM5RCxVQUFNQyxlQUFlLEtBQUtDLHFCQUFMLENBQ25CSixjQUFjSyxLQUFkLEVBRG1CLEVBRW5CSixXQUZtQixDQUFyQjtBQUlBLGFBQU8sR0FBR0ssTUFBSCxDQUFVTCxXQUFWLEVBQXVCRSxZQUF2QixFQUFxQ0QsYUFBckMsQ0FBUDtBQUNEOztBQUVEOzs7Ozs7Ozs7b0NBTWdCSyxHLEVBQUs7QUFDbkIsVUFBTUMsS0FBSyxTQUFMQSxFQUFLLENBQUNDLEdBQUQsRUFBTUMsU0FBTjtBQUFBLGVBQ1RBLFVBQVVDLFFBQVYsR0FBcUJELFVBQVVDLFFBQVYsQ0FBbUJGLEdBQW5CLENBQXJCLEdBQStDQSxHQUR0QztBQUFBLE9BQVg7QUFFQSxhQUFPLEtBQUsxQixZQUFMLENBQWtCUyxNQUFsQixDQUF5QmdCLEVBQXpCLEVBQTZCRCxHQUE3QixDQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7MENBT3NCSixZLEVBQWNGLFcsRUFBYTtBQUMvQyxVQUFNTyxLQUFLLFNBQUxBLEVBQUssQ0FBQ0MsR0FBRCxFQUFNQyxTQUFOO0FBQUEsZUFDVEEsVUFBVUUsY0FBVixHQUNJRixVQUFVRSxjQUFWLENBQXlCSCxHQUF6QixFQUE4QlIsV0FBOUIsQ0FESixHQUVJUSxHQUhLO0FBQUEsT0FBWDtBQUlBLGFBQU8sS0FBSzFCLFlBQUwsQ0FBa0JTLE1BQWxCLENBQXlCZ0IsRUFBekIsRUFBNkJMLFlBQTdCLENBQVA7QUFDRDs7QUFFRDs7Ozs7Ozs7O3VDQU1tQlUsUyxFQUFXO0FBQzVCLFVBQU1MLEtBQUssU0FBTEEsRUFBSyxDQUFDQyxHQUFELEVBQU1DLFNBQU47QUFBQSxlQUNUQSxVQUFVSSxXQUFWLEdBQXdCSixVQUFVSSxXQUFWLENBQXNCTCxHQUF0QixDQUF4QixHQUFxREEsR0FENUM7QUFBQSxPQUFYO0FBRUEsYUFBTyxLQUFLMUIsWUFBTCxDQUFrQlMsTUFBbEIsQ0FBeUJnQixFQUF6QixFQUE2QkssU0FBN0IsQ0FBUDtBQUNEOzs7Ozs7ZUFuSGtCL0IsVyIsImZpbGUiOiJUZW1wbGF0ZVRhZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNsYXNzIFRlbXBsYXRlVGFnXG4gKiBAY2xhc3NkZXNjIENvbnN1bWVzIGEgcGlwZWxpbmUgb2YgY29tcG9zYWJsZSB0cmFuc2Zvcm1lciBwbHVnaW5zIGFuZCBwcm9kdWNlcyBhIHRlbXBsYXRlIHRhZy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVtcGxhdGVUYWcge1xuICAvKipcbiAgICogY29uc3RydWN0cyBhIHRlbXBsYXRlIHRhZ1xuICAgKiBAY29uc3RydWN0cyBUZW1wbGF0ZVRhZ1xuICAgKiBAcGFyYW0gIHsuLi5PYmplY3R9IFsuLi50cmFuc2Zvcm1lcnNdIC0gYW4gYXJyYXkgb3IgYXJndW1lbnRzIGxpc3Qgb2YgdHJhbnNmb3JtZXJzXG4gICAqIEByZXR1cm4ge0Z1bmN0aW9ufSAgICAgICAgICAgICAgICAgICAgLSBhIHRlbXBsYXRlIHRhZ1xuICAgKi9cbiAgY29uc3RydWN0b3IoLi4udHJhbnNmb3JtZXJzKSB7XG4gICAgLy8gaWYgZmlyc3QgYXJndW1lbnQgaXMgYW4gYXJyYXksIGV4dHJ1ZGUgaXQgYXMgYSBsaXN0IG9mIHRyYW5zZm9ybWVyc1xuICAgIGlmICh0cmFuc2Zvcm1lcnMubGVuZ3RoID4gMCAmJiBBcnJheS5pc0FycmF5KHRyYW5zZm9ybWVyc1swXSkpIHtcbiAgICAgIHRyYW5zZm9ybWVycyA9IHRyYW5zZm9ybWVyc1swXTtcbiAgICB9XG5cbiAgICAvLyBpZiBhbnkgdHJhbnNmb3JtZXJzIGFyZSBmdW5jdGlvbnMsIHRoaXMgbWVhbnMgdGhleSBhcmUgbm90IGluaXRpYXRlZCAtIGF1dG9tYXRpY2FsbHkgaW5pdGlhdGUgdGhlbVxuICAgIHRoaXMudHJhbnNmb3JtZXJzID0gdHJhbnNmb3JtZXJzLm1hcCh0cmFuc2Zvcm1lciA9PiB7XG4gICAgICByZXR1cm4gdHlwZW9mIHRyYW5zZm9ybWVyID09PSAnZnVuY3Rpb24nID8gdHJhbnNmb3JtZXIoKSA6IHRyYW5zZm9ybWVyO1xuICAgIH0pO1xuXG4gICAgLy8gcmV0dXJuIGFuIEVTMjAxNSB0ZW1wbGF0ZSB0YWdcbiAgICByZXR1cm4gdGhpcy50YWc7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyBhbGwgdHJhbnNmb3JtZXJzIHRvIGEgdGVtcGxhdGUgbGl0ZXJhbCB0YWdnZWQgd2l0aCB0aGlzIG1ldGhvZC5cbiAgICogSWYgYSBmdW5jdGlvbiBpcyBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50LCBhc3N1bWVzIHRoZSBmdW5jdGlvbiBpcyBhIHRlbXBsYXRlIHRhZ1xuICAgKiBhbmQgYXBwbGllcyBpdCB0byB0aGUgdGVtcGxhdGUsIHJldHVybmluZyBhIHRlbXBsYXRlIHRhZy5cbiAgICogQHBhcmFtICB7KEZ1bmN0aW9ufFN0cmluZ3xBcnJheTxTdHJpbmc+KX0gc3RyaW5ncyAgICAgICAgLSBFaXRoZXIgYSB0ZW1wbGF0ZSB0YWcgb3IgYW4gYXJyYXkgY29udGFpbmluZyB0ZW1wbGF0ZSBzdHJpbmdzIHNlcGFyYXRlZCBieSBpZGVudGlmaWVyXG4gICAqIEBwYXJhbSAgey4uLip9ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmV4cHJlc3Npb25zIC0gT3B0aW9uYWwgbGlzdCBvZiBzdWJzdGl0dXRpb24gdmFsdWVzLlxuICAgKiBAcmV0dXJuIHsoU3RyaW5nfEZ1bmN0aW9uKX0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtIEVpdGhlciBhbiBpbnRlcm1lZGlhcnkgdGFnIGZ1bmN0aW9uIG9yIHRoZSByZXN1bHRzIG9mIHByb2Nlc3NpbmcgdGhlIHRlbXBsYXRlLlxuICAgKi9cbiAgdGFnID0gKHN0cmluZ3MsIC4uLmV4cHJlc3Npb25zKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBzdHJpbmdzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBpZiB0aGUgZmlyc3QgYXJndW1lbnQgcGFzc2VkIGlzIGEgZnVuY3Rpb24sIGFzc3VtZSBpdCBpcyBhIHRlbXBsYXRlIHRhZyBhbmQgcmV0dXJuXG4gICAgICAvLyBhbiBpbnRlcm1lZGlhcnkgdGFnIHRoYXQgcHJvY2Vzc2VzIHRoZSB0ZW1wbGF0ZSB1c2luZyB0aGUgYWZvcmVtZW50aW9uZWQgdGFnLCBwYXNzaW5nIHRoZVxuICAgICAgLy8gcmVzdWx0IHRvIG91ciB0YWdcbiAgICAgIHJldHVybiB0aGlzLmludGVyaW1UYWcuYmluZCh0aGlzLCBzdHJpbmdzKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHN0cmluZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBpZiB0aGUgZmlyc3QgYXJndW1lbnQgcGFzc2VkIGlzIGEgc3RyaW5nLCBqdXN0IHRyYW5zZm9ybSBpdFxuICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtRW5kUmVzdWx0KHN0cmluZ3MpO1xuICAgIH1cblxuICAgIC8vIGVsc2UsIHJldHVybiBhIHRyYW5zZm9ybWVkIGVuZCByZXN1bHQgb2YgcHJvY2Vzc2luZyB0aGUgdGVtcGxhdGUgd2l0aCBvdXIgdGFnXG4gICAgc3RyaW5ncyA9IHN0cmluZ3MubWFwKHRoaXMudHJhbnNmb3JtU3RyaW5nLmJpbmQodGhpcykpO1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybUVuZFJlc3VsdChcbiAgICAgIHN0cmluZ3MucmVkdWNlKHRoaXMucHJvY2Vzc1N1YnN0aXR1dGlvbnMuYmluZCh0aGlzLCBleHByZXNzaW9ucykpLFxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFuIGludGVybWVkaWFyeSB0ZW1wbGF0ZSB0YWcgdGhhdCByZWNlaXZlcyBhIHRlbXBsYXRlIHRhZyBhbmQgcGFzc2VzIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgdGVtcGxhdGUgd2l0aCB0aGUgcmVjZWl2ZWRcbiAgICogdGVtcGxhdGUgdGFnIHRvIG91ciBvd24gdGVtcGxhdGUgdGFnLlxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gICAgICAgIG5leHRUYWcgICAgICAgICAgLSB0aGUgcmVjZWl2ZWQgdGVtcGxhdGUgdGFnXG4gICAqIEBwYXJhbSAge0FycmF5PFN0cmluZz59ICAgdGVtcGxhdGUgICAgICAgICAtIHRoZSB0ZW1wbGF0ZSB0byBwcm9jZXNzXG4gICAqIEBwYXJhbSAgey4uLip9ICAgICAgICAgICAgLi4uc3Vic3RpdHV0aW9ucyAtIGBzdWJzdGl0dXRpb25zYCBpcyBhbiBhcnJheSBvZiBhbGwgc3Vic3RpdHV0aW9ucyBpbiB0aGUgdGVtcGxhdGVcbiAgICogQHJldHVybiB7Kn0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0gdGhlIGZpbmFsIHByb2Nlc3NlZCB2YWx1ZVxuICAgKi9cbiAgaW50ZXJpbVRhZyhwcmV2aW91c1RhZywgdGVtcGxhdGUsIC4uLnN1YnN0aXR1dGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy50YWdgJHtwcmV2aW91c1RhZyh0ZW1wbGF0ZSwgLi4uc3Vic3RpdHV0aW9ucyl9YDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBidWxrIHByb2Nlc3Npbmcgb24gdGhlIHRhZ2dlZCB0ZW1wbGF0ZSwgdHJhbnNmb3JtaW5nIGVhY2ggc3Vic3RpdHV0aW9uIGFuZCB0aGVuXG4gICAqIGNvbmNhdGVuYXRpbmcgdGhlIHJlc3VsdGluZyB2YWx1ZXMgaW50byBhIHN0cmluZy5cbiAgICogQHBhcmFtICB7QXJyYXk8Kj59IHN1YnN0aXR1dGlvbnMgLSBhbiBhcnJheSBvZiBhbGwgcmVtYWluaW5nIHN1YnN0aXR1dGlvbnMgcHJlc2VudCBpbiB0aGlzIHRlbXBsYXRlXG4gICAqIEBwYXJhbSAge1N0cmluZ30gICByZXN1bHRTb0ZhciAgIC0gdGhpcyBpdGVyYXRpb24ncyByZXN1bHQgc3RyaW5nIHNvIGZhclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICAgcmVtYWluaW5nUGFydCAtIHRoZSB0ZW1wbGF0ZSBjaHVuayBhZnRlciB0aGUgY3VycmVudCBzdWJzdGl0dXRpb25cbiAgICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgICAgICAgICAgLSB0aGUgcmVzdWx0IG9mIGpvaW5pbmcgdGhpcyBpdGVyYXRpb24ncyBwcm9jZXNzZWQgc3Vic3RpdHV0aW9uIHdpdGggdGhlIHJlc3VsdFxuICAgKi9cbiAgcHJvY2Vzc1N1YnN0aXR1dGlvbnMoc3Vic3RpdHV0aW9ucywgcmVzdWx0U29GYXIsIHJlbWFpbmluZ1BhcnQpIHtcbiAgICBjb25zdCBzdWJzdGl0dXRpb24gPSB0aGlzLnRyYW5zZm9ybVN1YnN0aXR1dGlvbihcbiAgICAgIHN1YnN0aXR1dGlvbnMuc2hpZnQoKSxcbiAgICAgIHJlc3VsdFNvRmFyLFxuICAgICk7XG4gICAgcmV0dXJuICcnLmNvbmNhdChyZXN1bHRTb0Zhciwgc3Vic3RpdHV0aW9uLCByZW1haW5pbmdQYXJ0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIHRocm91Z2ggZWFjaCB0cmFuc2Zvcm1lciwgYXBwbHlpbmcgdGhlIHRyYW5zZm9ybWVyJ3MgYG9uU3RyaW5nYCBtZXRob2QgdG8gdGhlIHRlbXBsYXRlXG4gICAqIHN0cmluZ3MgYmVmb3JlIGFsbCBzdWJzdGl0dXRpb25zIGFyZSBwcm9jZXNzZWQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgc3RyIC0gVGhlIGlucHV0IHN0cmluZ1xuICAgKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAtIFRoZSBmaW5hbCByZXN1bHRzIG9mIHByb2Nlc3NpbmcgZWFjaCB0cmFuc2Zvcm1lclxuICAgKi9cbiAgdHJhbnNmb3JtU3RyaW5nKHN0cikge1xuICAgIGNvbnN0IGNiID0gKHJlcywgdHJhbnNmb3JtKSA9PlxuICAgICAgdHJhbnNmb3JtLm9uU3RyaW5nID8gdHJhbnNmb3JtLm9uU3RyaW5nKHJlcykgOiByZXM7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtZXJzLnJlZHVjZShjYiwgc3RyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIGEgc3Vic3RpdHV0aW9uIGlzIGVuY291bnRlcmVkLCBpdGVyYXRlcyB0aHJvdWdoIGVhY2ggdHJhbnNmb3JtZXIgYW5kIGFwcGxpZXMgdGhlIHRyYW5zZm9ybWVyJ3NcbiAgICogYG9uU3Vic3RpdHV0aW9uYCBtZXRob2QgdG8gdGhlIHN1YnN0aXR1dGlvbi5cbiAgICogQHBhcmFtICB7Kn0gICAgICBzdWJzdGl0dXRpb24gLSBUaGUgY3VycmVudCBzdWJzdGl0dXRpb25cbiAgICogQHBhcmFtICB7U3RyaW5nfSByZXN1bHRTb0ZhciAgLSBUaGUgcmVzdWx0IHVwIHRvIGFuZCBleGNsdWRpbmcgdGhpcyBzdWJzdGl0dXRpb24uXG4gICAqIEByZXR1cm4geyp9ICAgICAgICAgICAgICAgICAgIC0gVGhlIGZpbmFsIHJlc3VsdCBvZiBhcHBseWluZyBhbGwgc3Vic3RpdHV0aW9uIHRyYW5zZm9ybWF0aW9ucy5cbiAgICovXG4gIHRyYW5zZm9ybVN1YnN0aXR1dGlvbihzdWJzdGl0dXRpb24sIHJlc3VsdFNvRmFyKSB7XG4gICAgY29uc3QgY2IgPSAocmVzLCB0cmFuc2Zvcm0pID0+XG4gICAgICB0cmFuc2Zvcm0ub25TdWJzdGl0dXRpb25cbiAgICAgICAgPyB0cmFuc2Zvcm0ub25TdWJzdGl0dXRpb24ocmVzLCByZXN1bHRTb0ZhcilcbiAgICAgICAgOiByZXM7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtZXJzLnJlZHVjZShjYiwgc3Vic3RpdHV0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlcyB0aHJvdWdoIGVhY2ggdHJhbnNmb3JtZXIsIGFwcGx5aW5nIHRoZSB0cmFuc2Zvcm1lcidzIGBvbkVuZFJlc3VsdGAgbWV0aG9kIHRvIHRoZVxuICAgKiB0ZW1wbGF0ZSBsaXRlcmFsIGFmdGVyIGFsbCBzdWJzdGl0dXRpb25zIGhhdmUgZmluaXNoZWQgcHJvY2Vzc2luZy5cbiAgICogQHBhcmFtICB7U3RyaW5nfSBlbmRSZXN1bHQgLSBUaGUgcHJvY2Vzc2VkIHRlbXBsYXRlLCBqdXN0IGJlZm9yZSBpdCBpcyByZXR1cm5lZCBmcm9tIHRoZSB0YWdcbiAgICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgICAgLSBUaGUgZmluYWwgcmVzdWx0cyBvZiBwcm9jZXNzaW5nIGVhY2ggdHJhbnNmb3JtZXJcbiAgICovXG4gIHRyYW5zZm9ybUVuZFJlc3VsdChlbmRSZXN1bHQpIHtcbiAgICBjb25zdCBjYiA9IChyZXMsIHRyYW5zZm9ybSkgPT5cbiAgICAgIHRyYW5zZm9ybS5vbkVuZFJlc3VsdCA/IHRyYW5zZm9ybS5vbkVuZFJlc3VsdChyZXMpIDogcmVzO1xuICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybWVycy5yZWR1Y2UoY2IsIGVuZFJlc3VsdCk7XG4gIH1cbn1cbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/TemplateTag/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/common-tags/es/TemplateTag/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TemplateTag */ "./node_modules/common-tags/es/TemplateTag/TemplateTag.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _TemplateTag__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UZW1wbGF0ZVRhZy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0Il0sIm1hcHBpbmdzIjoicUJBQW9CLGU7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL1RlbXBsYXRlVGFnJztcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/codeBlock/index.js":
/*!********************************************************!*\
  !*** ./node_modules/common-tags/es/codeBlock/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html */ "./node_modules/common-tags/es/html/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _html__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb2RlQmxvY2svaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdCJdLCJtYXBwaW5ncyI6InFCQUFvQixTO3FCQUFiQSxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnJvbSAnLi4vaHRtbCc7XG4iXX0=

/***/ }),

/***/ "./node_modules/common-tags/es/commaLists/commaLists.js":
/*!**************************************************************!*\
  !*** ./node_modules/common-tags/es/commaLists/commaLists.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplateTag */ "./node_modules/common-tags/es/TemplateTag/index.js");
/* harmony import */ var _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stripIndentTransformer */ "./node_modules/common-tags/es/stripIndentTransformer/index.js");
/* harmony import */ var _inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inlineArrayTransformer */ "./node_modules/common-tags/es/inlineArrayTransformer/index.js");
/* harmony import */ var _trimResultTransformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../trimResultTransformer */ "./node_modules/common-tags/es/trimResultTransformer/index.js");





var commaLists = new _TemplateTag__WEBPACK_IMPORTED_MODULE_0__["default"](Object(_inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_2__["default"])({ separator: ',' }), _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_1__["default"], _trimResultTransformer__WEBPACK_IMPORTED_MODULE_3__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (commaLists);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYUxpc3RzL2NvbW1hTGlzdHMuanMiXSwibmFtZXMiOlsiVGVtcGxhdGVUYWciLCJzdHJpcEluZGVudFRyYW5zZm9ybWVyIiwiaW5saW5lQXJyYXlUcmFuc2Zvcm1lciIsInRyaW1SZXN1bHRUcmFuc2Zvcm1lciIsImNvbW1hTGlzdHMiLCJzZXBhcmF0b3IiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFdBQVAsTUFBd0IsZ0JBQXhCO0FBQ0EsT0FBT0Msc0JBQVAsTUFBbUMsMkJBQW5DO0FBQ0EsT0FBT0Msc0JBQVAsTUFBbUMsMkJBQW5DO0FBQ0EsT0FBT0MscUJBQVAsTUFBa0MsMEJBQWxDOztBQUVBLElBQU1DLGFBQWEsSUFBSUosV0FBSixDQUNqQkUsdUJBQXVCLEVBQUVHLFdBQVcsR0FBYixFQUF2QixDQURpQixFQUVqQkosc0JBRmlCLEVBR2pCRSxxQkFIaUIsQ0FBbkI7O0FBTUEsZUFBZUMsVUFBZiIsImZpbGUiOiJjb21tYUxpc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRlbXBsYXRlVGFnIGZyb20gJy4uL1RlbXBsYXRlVGFnJztcbmltcG9ydCBzdHJpcEluZGVudFRyYW5zZm9ybWVyIGZyb20gJy4uL3N0cmlwSW5kZW50VHJhbnNmb3JtZXInO1xuaW1wb3J0IGlubGluZUFycmF5VHJhbnNmb3JtZXIgZnJvbSAnLi4vaW5saW5lQXJyYXlUcmFuc2Zvcm1lcic7XG5pbXBvcnQgdHJpbVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4uL3RyaW1SZXN1bHRUcmFuc2Zvcm1lcic7XG5cbmNvbnN0IGNvbW1hTGlzdHMgPSBuZXcgVGVtcGxhdGVUYWcoXG4gIGlubGluZUFycmF5VHJhbnNmb3JtZXIoeyBzZXBhcmF0b3I6ICcsJyB9KSxcbiAgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lcixcbiAgdHJpbVJlc3VsdFRyYW5zZm9ybWVyLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29tbWFMaXN0cztcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/commaLists/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/common-tags/es/commaLists/index.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commaLists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commaLists */ "./node_modules/common-tags/es/commaLists/commaLists.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _commaLists__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYUxpc3RzL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiXSwibWFwcGluZ3MiOiJxQkFBb0IsYztxQkFBYkEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZyb20gJy4vY29tbWFMaXN0cyc7XG4iXX0=

/***/ }),

/***/ "./node_modules/common-tags/es/commaListsAnd/commaListsAnd.js":
/*!********************************************************************!*\
  !*** ./node_modules/common-tags/es/commaListsAnd/commaListsAnd.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplateTag */ "./node_modules/common-tags/es/TemplateTag/index.js");
/* harmony import */ var _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stripIndentTransformer */ "./node_modules/common-tags/es/stripIndentTransformer/index.js");
/* harmony import */ var _inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inlineArrayTransformer */ "./node_modules/common-tags/es/inlineArrayTransformer/index.js");
/* harmony import */ var _trimResultTransformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../trimResultTransformer */ "./node_modules/common-tags/es/trimResultTransformer/index.js");





var commaListsAnd = new _TemplateTag__WEBPACK_IMPORTED_MODULE_0__["default"](Object(_inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_2__["default"])({ separator: ',', conjunction: 'and' }), _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_1__["default"], _trimResultTransformer__WEBPACK_IMPORTED_MODULE_3__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (commaListsAnd);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYUxpc3RzQW5kL2NvbW1hTGlzdHNBbmQuanMiXSwibmFtZXMiOlsiVGVtcGxhdGVUYWciLCJzdHJpcEluZGVudFRyYW5zZm9ybWVyIiwiaW5saW5lQXJyYXlUcmFuc2Zvcm1lciIsInRyaW1SZXN1bHRUcmFuc2Zvcm1lciIsImNvbW1hTGlzdHNBbmQiLCJzZXBhcmF0b3IiLCJjb25qdW5jdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsV0FBUCxNQUF3QixnQkFBeEI7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxxQkFBUCxNQUFrQywwQkFBbEM7O0FBRUEsSUFBTUMsZ0JBQWdCLElBQUlKLFdBQUosQ0FDcEJFLHVCQUF1QixFQUFFRyxXQUFXLEdBQWIsRUFBa0JDLGFBQWEsS0FBL0IsRUFBdkIsQ0FEb0IsRUFFcEJMLHNCQUZvQixFQUdwQkUscUJBSG9CLENBQXRCOztBQU1BLGVBQWVDLGFBQWYiLCJmaWxlIjoiY29tbWFMaXN0c0FuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZW1wbGF0ZVRhZyBmcm9tICcuLi9UZW1wbGF0ZVRhZyc7XG5pbXBvcnQgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lciBmcm9tICcuLi9zdHJpcEluZGVudFRyYW5zZm9ybWVyJztcbmltcG9ydCBpbmxpbmVBcnJheVRyYW5zZm9ybWVyIGZyb20gJy4uL2lubGluZUFycmF5VHJhbnNmb3JtZXInO1xuaW1wb3J0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi90cmltUmVzdWx0VHJhbnNmb3JtZXInO1xuXG5jb25zdCBjb21tYUxpc3RzQW5kID0gbmV3IFRlbXBsYXRlVGFnKFxuICBpbmxpbmVBcnJheVRyYW5zZm9ybWVyKHsgc2VwYXJhdG9yOiAnLCcsIGNvbmp1bmN0aW9uOiAnYW5kJyB9KSxcbiAgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lcixcbiAgdHJpbVJlc3VsdFRyYW5zZm9ybWVyLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgY29tbWFMaXN0c0FuZDtcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/commaListsAnd/index.js":
/*!************************************************************!*\
  !*** ./node_modules/common-tags/es/commaListsAnd/index.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commaListsAnd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commaListsAnd */ "./node_modules/common-tags/es/commaListsAnd/commaListsAnd.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _commaListsAnd__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYUxpc3RzQW5kL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiXSwibWFwcGluZ3MiOiJxQkFBb0IsaUI7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL2NvbW1hTGlzdHNBbmQnO1xuIl19

/***/ }),

/***/ "./node_modules/common-tags/es/commaListsOr/commaListsOr.js":
/*!******************************************************************!*\
  !*** ./node_modules/common-tags/es/commaListsOr/commaListsOr.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplateTag */ "./node_modules/common-tags/es/TemplateTag/index.js");
/* harmony import */ var _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stripIndentTransformer */ "./node_modules/common-tags/es/stripIndentTransformer/index.js");
/* harmony import */ var _inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inlineArrayTransformer */ "./node_modules/common-tags/es/inlineArrayTransformer/index.js");
/* harmony import */ var _trimResultTransformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../trimResultTransformer */ "./node_modules/common-tags/es/trimResultTransformer/index.js");





var commaListsOr = new _TemplateTag__WEBPACK_IMPORTED_MODULE_0__["default"](Object(_inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_2__["default"])({ separator: ',', conjunction: 'or' }), _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_1__["default"], _trimResultTransformer__WEBPACK_IMPORTED_MODULE_3__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (commaListsOr);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYUxpc3RzT3IvY29tbWFMaXN0c09yLmpzIl0sIm5hbWVzIjpbIlRlbXBsYXRlVGFnIiwic3RyaXBJbmRlbnRUcmFuc2Zvcm1lciIsImlubGluZUFycmF5VHJhbnNmb3JtZXIiLCJ0cmltUmVzdWx0VHJhbnNmb3JtZXIiLCJjb21tYUxpc3RzT3IiLCJzZXBhcmF0b3IiLCJjb25qdW5jdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsV0FBUCxNQUF3QixnQkFBeEI7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxxQkFBUCxNQUFrQywwQkFBbEM7O0FBRUEsSUFBTUMsZUFBZSxJQUFJSixXQUFKLENBQ25CRSx1QkFBdUIsRUFBRUcsV0FBVyxHQUFiLEVBQWtCQyxhQUFhLElBQS9CLEVBQXZCLENBRG1CLEVBRW5CTCxzQkFGbUIsRUFHbkJFLHFCQUhtQixDQUFyQjs7QUFNQSxlQUFlQyxZQUFmIiwiZmlsZSI6ImNvbW1hTGlzdHNPci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZW1wbGF0ZVRhZyBmcm9tICcuLi9UZW1wbGF0ZVRhZyc7XG5pbXBvcnQgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lciBmcm9tICcuLi9zdHJpcEluZGVudFRyYW5zZm9ybWVyJztcbmltcG9ydCBpbmxpbmVBcnJheVRyYW5zZm9ybWVyIGZyb20gJy4uL2lubGluZUFycmF5VHJhbnNmb3JtZXInO1xuaW1wb3J0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi90cmltUmVzdWx0VHJhbnNmb3JtZXInO1xuXG5jb25zdCBjb21tYUxpc3RzT3IgPSBuZXcgVGVtcGxhdGVUYWcoXG4gIGlubGluZUFycmF5VHJhbnNmb3JtZXIoeyBzZXBhcmF0b3I6ICcsJywgY29uanVuY3Rpb246ICdvcicgfSksXG4gIHN0cmlwSW5kZW50VHJhbnNmb3JtZXIsXG4gIHRyaW1SZXN1bHRUcmFuc2Zvcm1lcixcbik7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbW1hTGlzdHNPcjtcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/commaListsOr/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/common-tags/es/commaListsOr/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commaListsOr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commaListsOr */ "./node_modules/common-tags/es/commaListsOr/commaListsOr.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _commaListsOr__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYUxpc3RzT3IvaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdCJdLCJtYXBwaW5ncyI6InFCQUFvQixnQjtxQkFBYkEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZyb20gJy4vY29tbWFMaXN0c09yJztcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/html/html.js":
/*!**************************************************!*\
  !*** ./node_modules/common-tags/es/html/html.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplateTag */ "./node_modules/common-tags/es/TemplateTag/index.js");
/* harmony import */ var _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stripIndentTransformer */ "./node_modules/common-tags/es/stripIndentTransformer/index.js");
/* harmony import */ var _inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inlineArrayTransformer */ "./node_modules/common-tags/es/inlineArrayTransformer/index.js");
/* harmony import */ var _trimResultTransformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../trimResultTransformer */ "./node_modules/common-tags/es/trimResultTransformer/index.js");
/* harmony import */ var _splitStringTransformer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../splitStringTransformer */ "./node_modules/common-tags/es/splitStringTransformer/index.js");
/* harmony import */ var _removeNonPrintingValuesTransformer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../removeNonPrintingValuesTransformer */ "./node_modules/common-tags/es/removeNonPrintingValuesTransformer/index.js");







var html = new _TemplateTag__WEBPACK_IMPORTED_MODULE_0__["default"](Object(_splitStringTransformer__WEBPACK_IMPORTED_MODULE_4__["default"])('\n'), _removeNonPrintingValuesTransformer__WEBPACK_IMPORTED_MODULE_5__["default"], _inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_2__["default"], _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_1__["default"], _trimResultTransformer__WEBPACK_IMPORTED_MODULE_3__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (html);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9odG1sL2h0bWwuanMiXSwibmFtZXMiOlsiVGVtcGxhdGVUYWciLCJzdHJpcEluZGVudFRyYW5zZm9ybWVyIiwiaW5saW5lQXJyYXlUcmFuc2Zvcm1lciIsInRyaW1SZXN1bHRUcmFuc2Zvcm1lciIsInNwbGl0U3RyaW5nVHJhbnNmb3JtZXIiLCJyZW1vdmVOb25QcmludGluZ1ZhbHVlc1RyYW5zZm9ybWVyIiwiaHRtbCJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsV0FBUCxNQUF3QixnQkFBeEI7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxxQkFBUCxNQUFrQywwQkFBbEM7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxrQ0FBUCxNQUErQyx1Q0FBL0M7O0FBRUEsSUFBTUMsT0FBTyxJQUFJTixXQUFKLENBQ1hJLHVCQUF1QixJQUF2QixDQURXLEVBRVhDLGtDQUZXLEVBR1hILHNCQUhXLEVBSVhELHNCQUpXLEVBS1hFLHFCQUxXLENBQWI7O0FBUUEsZUFBZUcsSUFBZiIsImZpbGUiOiJodG1sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRlbXBsYXRlVGFnIGZyb20gJy4uL1RlbXBsYXRlVGFnJztcbmltcG9ydCBzdHJpcEluZGVudFRyYW5zZm9ybWVyIGZyb20gJy4uL3N0cmlwSW5kZW50VHJhbnNmb3JtZXInO1xuaW1wb3J0IGlubGluZUFycmF5VHJhbnNmb3JtZXIgZnJvbSAnLi4vaW5saW5lQXJyYXlUcmFuc2Zvcm1lcic7XG5pbXBvcnQgdHJpbVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4uL3RyaW1SZXN1bHRUcmFuc2Zvcm1lcic7XG5pbXBvcnQgc3BsaXRTdHJpbmdUcmFuc2Zvcm1lciBmcm9tICcuLi9zcGxpdFN0cmluZ1RyYW5zZm9ybWVyJztcbmltcG9ydCByZW1vdmVOb25QcmludGluZ1ZhbHVlc1RyYW5zZm9ybWVyIGZyb20gJy4uL3JlbW92ZU5vblByaW50aW5nVmFsdWVzVHJhbnNmb3JtZXInO1xuXG5jb25zdCBodG1sID0gbmV3IFRlbXBsYXRlVGFnKFxuICBzcGxpdFN0cmluZ1RyYW5zZm9ybWVyKCdcXG4nKSxcbiAgcmVtb3ZlTm9uUHJpbnRpbmdWYWx1ZXNUcmFuc2Zvcm1lcixcbiAgaW5saW5lQXJyYXlUcmFuc2Zvcm1lcixcbiAgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lcixcbiAgdHJpbVJlc3VsdFRyYW5zZm9ybWVyLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgaHRtbDtcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/html/index.js":
/*!***************************************************!*\
  !*** ./node_modules/common-tags/es/html/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html */ "./node_modules/common-tags/es/html/html.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _html__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9odG1sL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiXSwibWFwcGluZ3MiOiJxQkFBb0IsUTtxQkFBYkEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZyb20gJy4vaHRtbCc7XG4iXX0=

/***/ }),

/***/ "./node_modules/common-tags/es/index.js":
/*!**********************************************!*\
  !*** ./node_modules/common-tags/es/index.js ***!
  \**********************************************/
/*! exports provided: TemplateTag, trimResultTransformer, stripIndentTransformer, replaceResultTransformer, replaceSubstitutionTransformer, replaceStringTransformer, inlineArrayTransformer, splitStringTransformer, removeNonPrintingValuesTransformer, commaLists, commaListsAnd, commaListsOr, html, codeBlock, source, safeHtml, oneLine, oneLineTrim, oneLineCommaLists, oneLineCommaListsOr, oneLineCommaListsAnd, inlineLists, oneLineInlineLists, stripIndent, stripIndents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TemplateTag */ "./node_modules/common-tags/es/TemplateTag/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TemplateTag", function() { return _TemplateTag__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _trimResultTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./trimResultTransformer */ "./node_modules/common-tags/es/trimResultTransformer/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "trimResultTransformer", function() { return _trimResultTransformer__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stripIndentTransformer */ "./node_modules/common-tags/es/stripIndentTransformer/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stripIndentTransformer", function() { return _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _replaceResultTransformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./replaceResultTransformer */ "./node_modules/common-tags/es/replaceResultTransformer/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replaceResultTransformer", function() { return _replaceResultTransformer__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _replaceSubstitutionTransformer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./replaceSubstitutionTransformer */ "./node_modules/common-tags/es/replaceSubstitutionTransformer/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replaceSubstitutionTransformer", function() { return _replaceSubstitutionTransformer__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _replaceStringTransformer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./replaceStringTransformer */ "./node_modules/common-tags/es/replaceStringTransformer/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replaceStringTransformer", function() { return _replaceStringTransformer__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./inlineArrayTransformer */ "./node_modules/common-tags/es/inlineArrayTransformer/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inlineArrayTransformer", function() { return _inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _splitStringTransformer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./splitStringTransformer */ "./node_modules/common-tags/es/splitStringTransformer/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "splitStringTransformer", function() { return _splitStringTransformer__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _removeNonPrintingValuesTransformer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./removeNonPrintingValuesTransformer */ "./node_modules/common-tags/es/removeNonPrintingValuesTransformer/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeNonPrintingValuesTransformer", function() { return _removeNonPrintingValuesTransformer__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _commaLists__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./commaLists */ "./node_modules/common-tags/es/commaLists/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "commaLists", function() { return _commaLists__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _commaListsAnd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./commaListsAnd */ "./node_modules/common-tags/es/commaListsAnd/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "commaListsAnd", function() { return _commaListsAnd__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _commaListsOr__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./commaListsOr */ "./node_modules/common-tags/es/commaListsOr/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "commaListsOr", function() { return _commaListsOr__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./html */ "./node_modules/common-tags/es/html/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "html", function() { return _html__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _codeBlock__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./codeBlock */ "./node_modules/common-tags/es/codeBlock/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "codeBlock", function() { return _codeBlock__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _source__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./source */ "./node_modules/common-tags/es/source/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "source", function() { return _source__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _safeHtml__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./safeHtml */ "./node_modules/common-tags/es/safeHtml/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "safeHtml", function() { return _safeHtml__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _oneLine__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./oneLine */ "./node_modules/common-tags/es/oneLine/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "oneLine", function() { return _oneLine__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _oneLineTrim__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./oneLineTrim */ "./node_modules/common-tags/es/oneLineTrim/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "oneLineTrim", function() { return _oneLineTrim__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _oneLineCommaLists__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./oneLineCommaLists */ "./node_modules/common-tags/es/oneLineCommaLists/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "oneLineCommaLists", function() { return _oneLineCommaLists__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _oneLineCommaListsOr__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./oneLineCommaListsOr */ "./node_modules/common-tags/es/oneLineCommaListsOr/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "oneLineCommaListsOr", function() { return _oneLineCommaListsOr__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _oneLineCommaListsAnd__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./oneLineCommaListsAnd */ "./node_modules/common-tags/es/oneLineCommaListsAnd/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "oneLineCommaListsAnd", function() { return _oneLineCommaListsAnd__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _inlineLists__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./inlineLists */ "./node_modules/common-tags/es/inlineLists/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inlineLists", function() { return _inlineLists__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _oneLineInlineLists__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./oneLineInlineLists */ "./node_modules/common-tags/es/oneLineInlineLists/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "oneLineInlineLists", function() { return _oneLineInlineLists__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _stripIndent__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./stripIndent */ "./node_modules/common-tags/es/stripIndent/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stripIndent", function() { return _stripIndent__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _stripIndents__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./stripIndents */ "./node_modules/common-tags/es/stripIndents/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stripIndents", function() { return _stripIndents__WEBPACK_IMPORTED_MODULE_24__["default"]; });

// core



// transformers


















// tags

































//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZVRhZyIsInRyaW1SZXN1bHRUcmFuc2Zvcm1lciIsInN0cmlwSW5kZW50VHJhbnNmb3JtZXIiLCJyZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXIiLCJyZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXIiLCJyZXBsYWNlU3RyaW5nVHJhbnNmb3JtZXIiLCJpbmxpbmVBcnJheVRyYW5zZm9ybWVyIiwic3BsaXRTdHJpbmdUcmFuc2Zvcm1lciIsInJlbW92ZU5vblByaW50aW5nVmFsdWVzVHJhbnNmb3JtZXIiLCJjb21tYUxpc3RzIiwiY29tbWFMaXN0c0FuZCIsImNvbW1hTGlzdHNPciIsImh0bWwiLCJjb2RlQmxvY2siLCJzb3VyY2UiLCJzYWZlSHRtbCIsIm9uZUxpbmUiLCJvbmVMaW5lVHJpbSIsIm9uZUxpbmVDb21tYUxpc3RzIiwib25lTGluZUNvbW1hTGlzdHNPciIsIm9uZUxpbmVDb21tYUxpc3RzQW5kIiwiaW5saW5lTGlzdHMiLCJvbmVMaW5lSW5saW5lTGlzdHMiLCJzdHJpcEluZGVudCIsInN0cmlwSW5kZW50cyJdLCJtYXBwaW5ncyI6IkFBQUE7eUJBQ3dCLGU7eUJBQWpCQSxXOztBQUVQOzttQ0FDa0MseUI7bUNBQTNCQyxxQjtvQ0FDNEIsMEI7b0NBQTVCQyxzQjtzQ0FDOEIsNEI7c0NBQTlCQyx3Qjs0Q0FDb0Msa0M7NENBQXBDQyw4QjtzQ0FDOEIsNEI7c0NBQTlCQyx3QjtvQ0FDNEIsMEI7b0NBQTVCQyxzQjtvQ0FDNEIsMEI7b0NBQTVCQyxzQjtnREFDd0Msc0M7Z0RBQXhDQyxrQzs7QUFFUDs7d0JBQ3VCLGM7d0JBQWhCQyxVOzJCQUNtQixpQjsyQkFBbkJDLGE7MEJBQ2tCLGdCOzBCQUFsQkMsWTtrQkFDVSxRO2tCQUFWQyxJO3VCQUNlLGE7dUJBQWZDLFM7b0JBQ1ksVTtvQkFBWkMsTTtzQkFDYyxZO3NCQUFkQyxRO3FCQUNhLFc7cUJBQWJDLE87eUJBQ2lCLGU7eUJBQWpCQyxXOytCQUN1QixxQjsrQkFBdkJDLGlCO2lDQUN5Qix1QjtpQ0FBekJDLG1CO2tDQUMwQix3QjtrQ0FBMUJDLG9CO3lCQUNpQixlO3lCQUFqQkMsVztnQ0FDd0Isc0I7Z0NBQXhCQyxrQjt5QkFDaUIsZTt5QkFBakJDLFc7MEJBQ2tCLGdCOzBCQUFsQkMsWSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGNvcmVcbmV4cG9ydCBUZW1wbGF0ZVRhZyBmcm9tICcuL1RlbXBsYXRlVGFnJztcblxuLy8gdHJhbnNmb3JtZXJzXG5leHBvcnQgdHJpbVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4vdHJpbVJlc3VsdFRyYW5zZm9ybWVyJztcbmV4cG9ydCBzdHJpcEluZGVudFRyYW5zZm9ybWVyIGZyb20gJy4vc3RyaXBJbmRlbnRUcmFuc2Zvcm1lcic7XG5leHBvcnQgcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4vcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyJztcbmV4cG9ydCByZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXIgZnJvbSAnLi9yZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXInO1xuZXhwb3J0IHJlcGxhY2VTdHJpbmdUcmFuc2Zvcm1lciBmcm9tICcuL3JlcGxhY2VTdHJpbmdUcmFuc2Zvcm1lcic7XG5leHBvcnQgaW5saW5lQXJyYXlUcmFuc2Zvcm1lciBmcm9tICcuL2lubGluZUFycmF5VHJhbnNmb3JtZXInO1xuZXhwb3J0IHNwbGl0U3RyaW5nVHJhbnNmb3JtZXIgZnJvbSAnLi9zcGxpdFN0cmluZ1RyYW5zZm9ybWVyJztcbmV4cG9ydCByZW1vdmVOb25QcmludGluZ1ZhbHVlc1RyYW5zZm9ybWVyIGZyb20gJy4vcmVtb3ZlTm9uUHJpbnRpbmdWYWx1ZXNUcmFuc2Zvcm1lcic7XG5cbi8vIHRhZ3NcbmV4cG9ydCBjb21tYUxpc3RzIGZyb20gJy4vY29tbWFMaXN0cyc7XG5leHBvcnQgY29tbWFMaXN0c0FuZCBmcm9tICcuL2NvbW1hTGlzdHNBbmQnO1xuZXhwb3J0IGNvbW1hTGlzdHNPciBmcm9tICcuL2NvbW1hTGlzdHNPcic7XG5leHBvcnQgaHRtbCBmcm9tICcuL2h0bWwnO1xuZXhwb3J0IGNvZGVCbG9jayBmcm9tICcuL2NvZGVCbG9jayc7XG5leHBvcnQgc291cmNlIGZyb20gJy4vc291cmNlJztcbmV4cG9ydCBzYWZlSHRtbCBmcm9tICcuL3NhZmVIdG1sJztcbmV4cG9ydCBvbmVMaW5lIGZyb20gJy4vb25lTGluZSc7XG5leHBvcnQgb25lTGluZVRyaW0gZnJvbSAnLi9vbmVMaW5lVHJpbSc7XG5leHBvcnQgb25lTGluZUNvbW1hTGlzdHMgZnJvbSAnLi9vbmVMaW5lQ29tbWFMaXN0cyc7XG5leHBvcnQgb25lTGluZUNvbW1hTGlzdHNPciBmcm9tICcuL29uZUxpbmVDb21tYUxpc3RzT3InO1xuZXhwb3J0IG9uZUxpbmVDb21tYUxpc3RzQW5kIGZyb20gJy4vb25lTGluZUNvbW1hTGlzdHNBbmQnO1xuZXhwb3J0IGlubGluZUxpc3RzIGZyb20gJy4vaW5saW5lTGlzdHMnO1xuZXhwb3J0IG9uZUxpbmVJbmxpbmVMaXN0cyBmcm9tICcuL29uZUxpbmVJbmxpbmVMaXN0cyc7XG5leHBvcnQgc3RyaXBJbmRlbnQgZnJvbSAnLi9zdHJpcEluZGVudCc7XG5leHBvcnQgc3RyaXBJbmRlbnRzIGZyb20gJy4vc3RyaXBJbmRlbnRzJztcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/inlineArrayTransformer/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/common-tags/es/inlineArrayTransformer/index.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inlineArrayTransformer */ "./node_modules/common-tags/es/inlineArrayTransformer/inlineArrayTransformer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmxpbmVBcnJheVRyYW5zZm9ybWVyL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiXSwibWFwcGluZ3MiOiJxQkFBb0IsMEI7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL2lubGluZUFycmF5VHJhbnNmb3JtZXInO1xuIl19

/***/ }),

/***/ "./node_modules/common-tags/es/inlineArrayTransformer/inlineArrayTransformer.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/common-tags/es/inlineArrayTransformer/inlineArrayTransformer.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var defaults = {
  separator: '',
  conjunction: '',
  serial: false
};

/**
 * Converts an array substitution to a string containing a list
 * @param  {String} [opts.separator = ''] - the character that separates each item
 * @param  {String} [opts.conjunction = '']  - replace the last separator with this
 * @param  {Boolean} [opts.serial = false] - include the separator before the conjunction? (Oxford comma use-case)
 *
 * @return {Object}                     - a TemplateTag transformer
 */
var inlineArrayTransformer = function inlineArrayTransformer() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaults;
  return {
    onSubstitution: function onSubstitution(substitution, resultSoFar) {
      // only operate on arrays
      if (Array.isArray(substitution)) {
        var arrayLength = substitution.length;
        var separator = opts.separator;
        var conjunction = opts.conjunction;
        var serial = opts.serial;
        // join each item in the array into a string where each item is separated by separator
        // be sure to maintain indentation
        var indent = resultSoFar.match(/(\n?[^\S\n]+)$/);
        if (indent) {
          substitution = substitution.join(separator + indent[1]);
        } else {
          substitution = substitution.join(separator + ' ');
        }
        // if conjunction is set, replace the last separator with conjunction, but only if there is more than one substitution
        if (conjunction && arrayLength > 1) {
          var separatorIndex = substitution.lastIndexOf(separator);
          substitution = substitution.slice(0, separatorIndex) + (serial ? separator : '') + ' ' + conjunction + substitution.slice(separatorIndex + 1);
        }
      }
      return substitution;
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (inlineArrayTransformer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmxpbmVBcnJheVRyYW5zZm9ybWVyL2lubGluZUFycmF5VHJhbnNmb3JtZXIuanMiXSwibmFtZXMiOlsiZGVmYXVsdHMiLCJzZXBhcmF0b3IiLCJjb25qdW5jdGlvbiIsInNlcmlhbCIsImlubGluZUFycmF5VHJhbnNmb3JtZXIiLCJvcHRzIiwib25TdWJzdGl0dXRpb24iLCJzdWJzdGl0dXRpb24iLCJyZXN1bHRTb0ZhciIsIkFycmF5IiwiaXNBcnJheSIsImFycmF5TGVuZ3RoIiwibGVuZ3RoIiwiaW5kZW50IiwibWF0Y2giLCJqb2luIiwic2VwYXJhdG9ySW5kZXgiLCJsYXN0SW5kZXhPZiIsInNsaWNlIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFNQSxXQUFXO0FBQ2ZDLGFBQVcsRUFESTtBQUVmQyxlQUFhLEVBRkU7QUFHZkMsVUFBUTtBQUhPLENBQWpCOztBQU1BOzs7Ozs7OztBQVFBLElBQU1DLHlCQUF5QixTQUF6QkEsc0JBQXlCO0FBQUEsTUFBQ0MsSUFBRCx1RUFBUUwsUUFBUjtBQUFBLFNBQXNCO0FBQ25ETSxrQkFEbUQsMEJBQ3BDQyxZQURvQyxFQUN0QkMsV0FEc0IsRUFDVDtBQUN4QztBQUNBLFVBQUlDLE1BQU1DLE9BQU4sQ0FBY0gsWUFBZCxDQUFKLEVBQWlDO0FBQy9CLFlBQU1JLGNBQWNKLGFBQWFLLE1BQWpDO0FBQ0EsWUFBTVgsWUFBWUksS0FBS0osU0FBdkI7QUFDQSxZQUFNQyxjQUFjRyxLQUFLSCxXQUF6QjtBQUNBLFlBQU1DLFNBQVNFLEtBQUtGLE1BQXBCO0FBQ0E7QUFDQTtBQUNBLFlBQU1VLFNBQVNMLFlBQVlNLEtBQVosQ0FBa0IsZ0JBQWxCLENBQWY7QUFDQSxZQUFJRCxNQUFKLEVBQVk7QUFDVk4seUJBQWVBLGFBQWFRLElBQWIsQ0FBa0JkLFlBQVlZLE9BQU8sQ0FBUCxDQUE5QixDQUFmO0FBQ0QsU0FGRCxNQUVPO0FBQ0xOLHlCQUFlQSxhQUFhUSxJQUFiLENBQWtCZCxZQUFZLEdBQTlCLENBQWY7QUFDRDtBQUNEO0FBQ0EsWUFBSUMsZUFBZVMsY0FBYyxDQUFqQyxFQUFvQztBQUNsQyxjQUFNSyxpQkFBaUJULGFBQWFVLFdBQWIsQ0FBeUJoQixTQUF6QixDQUF2QjtBQUNBTSx5QkFDRUEsYUFBYVcsS0FBYixDQUFtQixDQUFuQixFQUFzQkYsY0FBdEIsS0FDQ2IsU0FBU0YsU0FBVCxHQUFxQixFQUR0QixJQUVBLEdBRkEsR0FHQUMsV0FIQSxHQUlBSyxhQUFhVyxLQUFiLENBQW1CRixpQkFBaUIsQ0FBcEMsQ0FMRjtBQU1EO0FBQ0Y7QUFDRCxhQUFPVCxZQUFQO0FBQ0Q7QUE1QmtELEdBQXRCO0FBQUEsQ0FBL0I7O0FBK0JBLGVBQWVILHNCQUFmIiwiZmlsZSI6ImlubGluZUFycmF5VHJhbnNmb3JtZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkZWZhdWx0cyA9IHtcbiAgc2VwYXJhdG9yOiAnJyxcbiAgY29uanVuY3Rpb246ICcnLFxuICBzZXJpYWw6IGZhbHNlLFxufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBhcnJheSBzdWJzdGl0dXRpb24gdG8gYSBzdHJpbmcgY29udGFpbmluZyBhIGxpc3RcbiAqIEBwYXJhbSAge1N0cmluZ30gW29wdHMuc2VwYXJhdG9yID0gJyddIC0gdGhlIGNoYXJhY3RlciB0aGF0IHNlcGFyYXRlcyBlYWNoIGl0ZW1cbiAqIEBwYXJhbSAge1N0cmluZ30gW29wdHMuY29uanVuY3Rpb24gPSAnJ10gIC0gcmVwbGFjZSB0aGUgbGFzdCBzZXBhcmF0b3Igd2l0aCB0aGlzXG4gKiBAcGFyYW0gIHtCb29sZWFufSBbb3B0cy5zZXJpYWwgPSBmYWxzZV0gLSBpbmNsdWRlIHRoZSBzZXBhcmF0b3IgYmVmb3JlIHRoZSBjb25qdW5jdGlvbj8gKE94Zm9yZCBjb21tYSB1c2UtY2FzZSlcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgICAgICAgICAgLSBhIFRlbXBsYXRlVGFnIHRyYW5zZm9ybWVyXG4gKi9cbmNvbnN0IGlubGluZUFycmF5VHJhbnNmb3JtZXIgPSAob3B0cyA9IGRlZmF1bHRzKSA9PiAoe1xuICBvblN1YnN0aXR1dGlvbihzdWJzdGl0dXRpb24sIHJlc3VsdFNvRmFyKSB7XG4gICAgLy8gb25seSBvcGVyYXRlIG9uIGFycmF5c1xuICAgIGlmIChBcnJheS5pc0FycmF5KHN1YnN0aXR1dGlvbikpIHtcbiAgICAgIGNvbnN0IGFycmF5TGVuZ3RoID0gc3Vic3RpdHV0aW9uLmxlbmd0aDtcbiAgICAgIGNvbnN0IHNlcGFyYXRvciA9IG9wdHMuc2VwYXJhdG9yO1xuICAgICAgY29uc3QgY29uanVuY3Rpb24gPSBvcHRzLmNvbmp1bmN0aW9uO1xuICAgICAgY29uc3Qgc2VyaWFsID0gb3B0cy5zZXJpYWw7XG4gICAgICAvLyBqb2luIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXkgaW50byBhIHN0cmluZyB3aGVyZSBlYWNoIGl0ZW0gaXMgc2VwYXJhdGVkIGJ5IHNlcGFyYXRvclxuICAgICAgLy8gYmUgc3VyZSB0byBtYWludGFpbiBpbmRlbnRhdGlvblxuICAgICAgY29uc3QgaW5kZW50ID0gcmVzdWx0U29GYXIubWF0Y2goLyhcXG4/W15cXFNcXG5dKykkLyk7XG4gICAgICBpZiAoaW5kZW50KSB7XG4gICAgICAgIHN1YnN0aXR1dGlvbiA9IHN1YnN0aXR1dGlvbi5qb2luKHNlcGFyYXRvciArIGluZGVudFsxXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdWJzdGl0dXRpb24gPSBzdWJzdGl0dXRpb24uam9pbihzZXBhcmF0b3IgKyAnICcpO1xuICAgICAgfVxuICAgICAgLy8gaWYgY29uanVuY3Rpb24gaXMgc2V0LCByZXBsYWNlIHRoZSBsYXN0IHNlcGFyYXRvciB3aXRoIGNvbmp1bmN0aW9uLCBidXQgb25seSBpZiB0aGVyZSBpcyBtb3JlIHRoYW4gb25lIHN1YnN0aXR1dGlvblxuICAgICAgaWYgKGNvbmp1bmN0aW9uICYmIGFycmF5TGVuZ3RoID4gMSkge1xuICAgICAgICBjb25zdCBzZXBhcmF0b3JJbmRleCA9IHN1YnN0aXR1dGlvbi5sYXN0SW5kZXhPZihzZXBhcmF0b3IpO1xuICAgICAgICBzdWJzdGl0dXRpb24gPVxuICAgICAgICAgIHN1YnN0aXR1dGlvbi5zbGljZSgwLCBzZXBhcmF0b3JJbmRleCkgK1xuICAgICAgICAgIChzZXJpYWwgPyBzZXBhcmF0b3IgOiAnJykgK1xuICAgICAgICAgICcgJyArXG4gICAgICAgICAgY29uanVuY3Rpb24gK1xuICAgICAgICAgIHN1YnN0aXR1dGlvbi5zbGljZShzZXBhcmF0b3JJbmRleCArIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3Vic3RpdHV0aW9uO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGlubGluZUFycmF5VHJhbnNmb3JtZXI7XG4iXX0=

/***/ }),

/***/ "./node_modules/common-tags/es/inlineLists/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/common-tags/es/inlineLists/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _inlineLists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inlineLists */ "./node_modules/common-tags/es/inlineLists/inlineLists.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inlineLists__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmxpbmVMaXN0cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0Il0sIm1hcHBpbmdzIjoicUJBQW9CLGU7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL2lubGluZUxpc3RzJztcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/inlineLists/inlineLists.js":
/*!****************************************************************!*\
  !*** ./node_modules/common-tags/es/inlineLists/inlineLists.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplateTag */ "./node_modules/common-tags/es/TemplateTag/index.js");
/* harmony import */ var _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stripIndentTransformer */ "./node_modules/common-tags/es/stripIndentTransformer/index.js");
/* harmony import */ var _inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inlineArrayTransformer */ "./node_modules/common-tags/es/inlineArrayTransformer/index.js");
/* harmony import */ var _trimResultTransformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../trimResultTransformer */ "./node_modules/common-tags/es/trimResultTransformer/index.js");





var inlineLists = new _TemplateTag__WEBPACK_IMPORTED_MODULE_0__["default"](_inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_2__["default"], _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_1__["default"], _trimResultTransformer__WEBPACK_IMPORTED_MODULE_3__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (inlineLists);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmxpbmVMaXN0cy9pbmxpbmVMaXN0cy5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZVRhZyIsInN0cmlwSW5kZW50VHJhbnNmb3JtZXIiLCJpbmxpbmVBcnJheVRyYW5zZm9ybWVyIiwidHJpbVJlc3VsdFRyYW5zZm9ybWVyIiwiaW5saW5lTGlzdHMiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFdBQVAsTUFBd0IsZ0JBQXhCO0FBQ0EsT0FBT0Msc0JBQVAsTUFBbUMsMkJBQW5DO0FBQ0EsT0FBT0Msc0JBQVAsTUFBbUMsMkJBQW5DO0FBQ0EsT0FBT0MscUJBQVAsTUFBa0MsMEJBQWxDOztBQUVBLElBQU1DLGNBQWMsSUFBSUosV0FBSixDQUNsQkUsc0JBRGtCLEVBRWxCRCxzQkFGa0IsRUFHbEJFLHFCQUhrQixDQUFwQjs7QUFNQSxlQUFlQyxXQUFmIiwiZmlsZSI6ImlubGluZUxpc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRlbXBsYXRlVGFnIGZyb20gJy4uL1RlbXBsYXRlVGFnJztcbmltcG9ydCBzdHJpcEluZGVudFRyYW5zZm9ybWVyIGZyb20gJy4uL3N0cmlwSW5kZW50VHJhbnNmb3JtZXInO1xuaW1wb3J0IGlubGluZUFycmF5VHJhbnNmb3JtZXIgZnJvbSAnLi4vaW5saW5lQXJyYXlUcmFuc2Zvcm1lcic7XG5pbXBvcnQgdHJpbVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4uL3RyaW1SZXN1bHRUcmFuc2Zvcm1lcic7XG5cbmNvbnN0IGlubGluZUxpc3RzID0gbmV3IFRlbXBsYXRlVGFnKFxuICBpbmxpbmVBcnJheVRyYW5zZm9ybWVyLFxuICBzdHJpcEluZGVudFRyYW5zZm9ybWVyLFxuICB0cmltUmVzdWx0VHJhbnNmb3JtZXIsXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBpbmxpbmVMaXN0cztcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/oneLine/index.js":
/*!******************************************************!*\
  !*** ./node_modules/common-tags/es/oneLine/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _oneLine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oneLine */ "./node_modules/common-tags/es/oneLine/oneLine.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _oneLine__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiXSwibWFwcGluZ3MiOiJxQkFBb0IsVztxQkFBYkEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZyb20gJy4vb25lTGluZSc7XG4iXX0=

/***/ }),

/***/ "./node_modules/common-tags/es/oneLine/oneLine.js":
/*!********************************************************!*\
  !*** ./node_modules/common-tags/es/oneLine/oneLine.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplateTag */ "./node_modules/common-tags/es/TemplateTag/index.js");
/* harmony import */ var _trimResultTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../trimResultTransformer */ "./node_modules/common-tags/es/trimResultTransformer/index.js");
/* harmony import */ var _replaceResultTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../replaceResultTransformer */ "./node_modules/common-tags/es/replaceResultTransformer/index.js");




var oneLine = new _TemplateTag__WEBPACK_IMPORTED_MODULE_0__["default"](Object(_replaceResultTransformer__WEBPACK_IMPORTED_MODULE_2__["default"])(/(?:\n(?:\s*))+/g, ' '), _trimResultTransformer__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (oneLine);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lL29uZUxpbmUuanMiXSwibmFtZXMiOlsiVGVtcGxhdGVUYWciLCJ0cmltUmVzdWx0VHJhbnNmb3JtZXIiLCJyZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXIiLCJvbmVMaW5lIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxXQUFQLE1BQXdCLGdCQUF4QjtBQUNBLE9BQU9DLHFCQUFQLE1BQWtDLDBCQUFsQztBQUNBLE9BQU9DLHdCQUFQLE1BQXFDLDZCQUFyQzs7QUFFQSxJQUFNQyxVQUFVLElBQUlILFdBQUosQ0FDZEUseUJBQXlCLGlCQUF6QixFQUE0QyxHQUE1QyxDQURjLEVBRWRELHFCQUZjLENBQWhCOztBQUtBLGVBQWVFLE9BQWYiLCJmaWxlIjoib25lTGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZW1wbGF0ZVRhZyBmcm9tICcuLi9UZW1wbGF0ZVRhZyc7XG5pbXBvcnQgdHJpbVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4uL3RyaW1SZXN1bHRUcmFuc2Zvcm1lcic7XG5pbXBvcnQgcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4uL3JlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lcic7XG5cbmNvbnN0IG9uZUxpbmUgPSBuZXcgVGVtcGxhdGVUYWcoXG4gIHJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lcigvKD86XFxuKD86XFxzKikpKy9nLCAnICcpLFxuICB0cmltUmVzdWx0VHJhbnNmb3JtZXIsXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBvbmVMaW5lO1xuIl19

/***/ }),

/***/ "./node_modules/common-tags/es/oneLineCommaLists/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/common-tags/es/oneLineCommaLists/index.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _oneLineCommaLists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oneLineCommaLists */ "./node_modules/common-tags/es/oneLineCommaLists/oneLineCommaLists.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _oneLineCommaLists__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lQ29tbWFMaXN0cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0Il0sIm1hcHBpbmdzIjoicUJBQW9CLHFCO3FCQUFiQSxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnJvbSAnLi9vbmVMaW5lQ29tbWFMaXN0cyc7XG4iXX0=

/***/ }),

/***/ "./node_modules/common-tags/es/oneLineCommaLists/oneLineCommaLists.js":
/*!****************************************************************************!*\
  !*** ./node_modules/common-tags/es/oneLineCommaLists/oneLineCommaLists.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplateTag */ "./node_modules/common-tags/es/TemplateTag/index.js");
/* harmony import */ var _inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../inlineArrayTransformer */ "./node_modules/common-tags/es/inlineArrayTransformer/index.js");
/* harmony import */ var _trimResultTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../trimResultTransformer */ "./node_modules/common-tags/es/trimResultTransformer/index.js");
/* harmony import */ var _replaceResultTransformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../replaceResultTransformer */ "./node_modules/common-tags/es/replaceResultTransformer/index.js");





var oneLineCommaLists = new _TemplateTag__WEBPACK_IMPORTED_MODULE_0__["default"](Object(_inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_1__["default"])({ separator: ',' }), Object(_replaceResultTransformer__WEBPACK_IMPORTED_MODULE_3__["default"])(/(?:\s+)/g, ' '), _trimResultTransformer__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (oneLineCommaLists);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lQ29tbWFMaXN0cy9vbmVMaW5lQ29tbWFMaXN0cy5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZVRhZyIsImlubGluZUFycmF5VHJhbnNmb3JtZXIiLCJ0cmltUmVzdWx0VHJhbnNmb3JtZXIiLCJyZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXIiLCJvbmVMaW5lQ29tbWFMaXN0cyIsInNlcGFyYXRvciJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsV0FBUCxNQUF3QixnQkFBeEI7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxxQkFBUCxNQUFrQywwQkFBbEM7QUFDQSxPQUFPQyx3QkFBUCxNQUFxQyw2QkFBckM7O0FBRUEsSUFBTUMsb0JBQW9CLElBQUlKLFdBQUosQ0FDeEJDLHVCQUF1QixFQUFFSSxXQUFXLEdBQWIsRUFBdkIsQ0FEd0IsRUFFeEJGLHlCQUF5QixVQUF6QixFQUFxQyxHQUFyQyxDQUZ3QixFQUd4QkQscUJBSHdCLENBQTFCOztBQU1BLGVBQWVFLGlCQUFmIiwiZmlsZSI6Im9uZUxpbmVDb21tYUxpc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRlbXBsYXRlVGFnIGZyb20gJy4uL1RlbXBsYXRlVGFnJztcbmltcG9ydCBpbmxpbmVBcnJheVRyYW5zZm9ybWVyIGZyb20gJy4uL2lubGluZUFycmF5VHJhbnNmb3JtZXInO1xuaW1wb3J0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi90cmltUmVzdWx0VHJhbnNmb3JtZXInO1xuaW1wb3J0IHJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi9yZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXInO1xuXG5jb25zdCBvbmVMaW5lQ29tbWFMaXN0cyA9IG5ldyBUZW1wbGF0ZVRhZyhcbiAgaW5saW5lQXJyYXlUcmFuc2Zvcm1lcih7IHNlcGFyYXRvcjogJywnIH0pLFxuICByZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXIoLyg/OlxccyspL2csICcgJyksXG4gIHRyaW1SZXN1bHRUcmFuc2Zvcm1lcixcbik7XG5cbmV4cG9ydCBkZWZhdWx0IG9uZUxpbmVDb21tYUxpc3RzO1xuIl19

/***/ }),

/***/ "./node_modules/common-tags/es/oneLineCommaListsAnd/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/common-tags/es/oneLineCommaListsAnd/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _oneLineCommaListsAnd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oneLineCommaListsAnd */ "./node_modules/common-tags/es/oneLineCommaListsAnd/oneLineCommaListsAnd.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _oneLineCommaListsAnd__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lQ29tbWFMaXN0c0FuZC9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0Il0sIm1hcHBpbmdzIjoicUJBQW9CLHdCO3FCQUFiQSxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnJvbSAnLi9vbmVMaW5lQ29tbWFMaXN0c0FuZCc7XG4iXX0=

/***/ }),

/***/ "./node_modules/common-tags/es/oneLineCommaListsAnd/oneLineCommaListsAnd.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/common-tags/es/oneLineCommaListsAnd/oneLineCommaListsAnd.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplateTag */ "./node_modules/common-tags/es/TemplateTag/index.js");
/* harmony import */ var _inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../inlineArrayTransformer */ "./node_modules/common-tags/es/inlineArrayTransformer/index.js");
/* harmony import */ var _trimResultTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../trimResultTransformer */ "./node_modules/common-tags/es/trimResultTransformer/index.js");
/* harmony import */ var _replaceResultTransformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../replaceResultTransformer */ "./node_modules/common-tags/es/replaceResultTransformer/index.js");





var oneLineCommaListsAnd = new _TemplateTag__WEBPACK_IMPORTED_MODULE_0__["default"](Object(_inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_1__["default"])({ separator: ',', conjunction: 'and' }), Object(_replaceResultTransformer__WEBPACK_IMPORTED_MODULE_3__["default"])(/(?:\s+)/g, ' '), _trimResultTransformer__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (oneLineCommaListsAnd);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lQ29tbWFMaXN0c0FuZC9vbmVMaW5lQ29tbWFMaXN0c0FuZC5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZVRhZyIsImlubGluZUFycmF5VHJhbnNmb3JtZXIiLCJ0cmltUmVzdWx0VHJhbnNmb3JtZXIiLCJyZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXIiLCJvbmVMaW5lQ29tbWFMaXN0c0FuZCIsInNlcGFyYXRvciIsImNvbmp1bmN0aW9uIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxXQUFQLE1BQXdCLGdCQUF4QjtBQUNBLE9BQU9DLHNCQUFQLE1BQW1DLDJCQUFuQztBQUNBLE9BQU9DLHFCQUFQLE1BQWtDLDBCQUFsQztBQUNBLE9BQU9DLHdCQUFQLE1BQXFDLDZCQUFyQzs7QUFFQSxJQUFNQyx1QkFBdUIsSUFBSUosV0FBSixDQUMzQkMsdUJBQXVCLEVBQUVJLFdBQVcsR0FBYixFQUFrQkMsYUFBYSxLQUEvQixFQUF2QixDQUQyQixFQUUzQkgseUJBQXlCLFVBQXpCLEVBQXFDLEdBQXJDLENBRjJCLEVBRzNCRCxxQkFIMkIsQ0FBN0I7O0FBTUEsZUFBZUUsb0JBQWYiLCJmaWxlIjoib25lTGluZUNvbW1hTGlzdHNBbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGVtcGxhdGVUYWcgZnJvbSAnLi4vVGVtcGxhdGVUYWcnO1xuaW1wb3J0IGlubGluZUFycmF5VHJhbnNmb3JtZXIgZnJvbSAnLi4vaW5saW5lQXJyYXlUcmFuc2Zvcm1lcic7XG5pbXBvcnQgdHJpbVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4uL3RyaW1SZXN1bHRUcmFuc2Zvcm1lcic7XG5pbXBvcnQgcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyIGZyb20gJy4uL3JlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lcic7XG5cbmNvbnN0IG9uZUxpbmVDb21tYUxpc3RzQW5kID0gbmV3IFRlbXBsYXRlVGFnKFxuICBpbmxpbmVBcnJheVRyYW5zZm9ybWVyKHsgc2VwYXJhdG9yOiAnLCcsIGNvbmp1bmN0aW9uOiAnYW5kJyB9KSxcbiAgcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyKC8oPzpcXHMrKS9nLCAnICcpLFxuICB0cmltUmVzdWx0VHJhbnNmb3JtZXIsXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBvbmVMaW5lQ29tbWFMaXN0c0FuZDtcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/oneLineCommaListsOr/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/common-tags/es/oneLineCommaListsOr/index.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _oneLineCommaListsOr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oneLineCommaListsOr */ "./node_modules/common-tags/es/oneLineCommaListsOr/oneLineCommaListsOr.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _oneLineCommaListsOr__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lQ29tbWFMaXN0c09yL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiXSwibWFwcGluZ3MiOiJxQkFBb0IsdUI7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL29uZUxpbmVDb21tYUxpc3RzT3InO1xuIl19

/***/ }),

/***/ "./node_modules/common-tags/es/oneLineCommaListsOr/oneLineCommaListsOr.js":
/*!********************************************************************************!*\
  !*** ./node_modules/common-tags/es/oneLineCommaListsOr/oneLineCommaListsOr.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplateTag */ "./node_modules/common-tags/es/TemplateTag/index.js");
/* harmony import */ var _inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../inlineArrayTransformer */ "./node_modules/common-tags/es/inlineArrayTransformer/index.js");
/* harmony import */ var _trimResultTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../trimResultTransformer */ "./node_modules/common-tags/es/trimResultTransformer/index.js");
/* harmony import */ var _replaceResultTransformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../replaceResultTransformer */ "./node_modules/common-tags/es/replaceResultTransformer/index.js");





var oneLineCommaListsOr = new _TemplateTag__WEBPACK_IMPORTED_MODULE_0__["default"](Object(_inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_1__["default"])({ separator: ',', conjunction: 'or' }), Object(_replaceResultTransformer__WEBPACK_IMPORTED_MODULE_3__["default"])(/(?:\s+)/g, ' '), _trimResultTransformer__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (oneLineCommaListsOr);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lQ29tbWFMaXN0c09yL29uZUxpbmVDb21tYUxpc3RzT3IuanMiXSwibmFtZXMiOlsiVGVtcGxhdGVUYWciLCJpbmxpbmVBcnJheVRyYW5zZm9ybWVyIiwidHJpbVJlc3VsdFRyYW5zZm9ybWVyIiwicmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyIiwib25lTGluZUNvbW1hTGlzdHNPciIsInNlcGFyYXRvciIsImNvbmp1bmN0aW9uIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxXQUFQLE1BQXdCLGdCQUF4QjtBQUNBLE9BQU9DLHNCQUFQLE1BQW1DLDJCQUFuQztBQUNBLE9BQU9DLHFCQUFQLE1BQWtDLDBCQUFsQztBQUNBLE9BQU9DLHdCQUFQLE1BQXFDLDZCQUFyQzs7QUFFQSxJQUFNQyxzQkFBc0IsSUFBSUosV0FBSixDQUMxQkMsdUJBQXVCLEVBQUVJLFdBQVcsR0FBYixFQUFrQkMsYUFBYSxJQUEvQixFQUF2QixDQUQwQixFQUUxQkgseUJBQXlCLFVBQXpCLEVBQXFDLEdBQXJDLENBRjBCLEVBRzFCRCxxQkFIMEIsQ0FBNUI7O0FBTUEsZUFBZUUsbUJBQWYiLCJmaWxlIjoib25lTGluZUNvbW1hTGlzdHNPci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZW1wbGF0ZVRhZyBmcm9tICcuLi9UZW1wbGF0ZVRhZyc7XG5pbXBvcnQgaW5saW5lQXJyYXlUcmFuc2Zvcm1lciBmcm9tICcuLi9pbmxpbmVBcnJheVRyYW5zZm9ybWVyJztcbmltcG9ydCB0cmltUmVzdWx0VHJhbnNmb3JtZXIgZnJvbSAnLi4vdHJpbVJlc3VsdFRyYW5zZm9ybWVyJztcbmltcG9ydCByZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXIgZnJvbSAnLi4vcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyJztcblxuY29uc3Qgb25lTGluZUNvbW1hTGlzdHNPciA9IG5ldyBUZW1wbGF0ZVRhZyhcbiAgaW5saW5lQXJyYXlUcmFuc2Zvcm1lcih7IHNlcGFyYXRvcjogJywnLCBjb25qdW5jdGlvbjogJ29yJyB9KSxcbiAgcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyKC8oPzpcXHMrKS9nLCAnICcpLFxuICB0cmltUmVzdWx0VHJhbnNmb3JtZXIsXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBvbmVMaW5lQ29tbWFMaXN0c09yO1xuIl19

/***/ }),

/***/ "./node_modules/common-tags/es/oneLineInlineLists/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/common-tags/es/oneLineInlineLists/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _oneLineInlineLists__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oneLineInlineLists */ "./node_modules/common-tags/es/oneLineInlineLists/oneLineInlineLists.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _oneLineInlineLists__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lSW5saW5lTGlzdHMvaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdCJdLCJtYXBwaW5ncyI6InFCQUFvQixzQjtxQkFBYkEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZyb20gJy4vb25lTGluZUlubGluZUxpc3RzJztcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/oneLineInlineLists/oneLineInlineLists.js":
/*!******************************************************************************!*\
  !*** ./node_modules/common-tags/es/oneLineInlineLists/oneLineInlineLists.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplateTag */ "./node_modules/common-tags/es/TemplateTag/index.js");
/* harmony import */ var _inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../inlineArrayTransformer */ "./node_modules/common-tags/es/inlineArrayTransformer/index.js");
/* harmony import */ var _trimResultTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../trimResultTransformer */ "./node_modules/common-tags/es/trimResultTransformer/index.js");
/* harmony import */ var _replaceResultTransformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../replaceResultTransformer */ "./node_modules/common-tags/es/replaceResultTransformer/index.js");





var oneLineInlineLists = new _TemplateTag__WEBPACK_IMPORTED_MODULE_0__["default"](_inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_1__["default"], Object(_replaceResultTransformer__WEBPACK_IMPORTED_MODULE_3__["default"])(/(?:\s+)/g, ' '), _trimResultTransformer__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (oneLineInlineLists);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lSW5saW5lTGlzdHMvb25lTGluZUlubGluZUxpc3RzLmpzIl0sIm5hbWVzIjpbIlRlbXBsYXRlVGFnIiwiaW5saW5lQXJyYXlUcmFuc2Zvcm1lciIsInRyaW1SZXN1bHRUcmFuc2Zvcm1lciIsInJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lciIsIm9uZUxpbmVJbmxpbmVMaXN0cyJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsV0FBUCxNQUF3QixnQkFBeEI7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxxQkFBUCxNQUFrQywwQkFBbEM7QUFDQSxPQUFPQyx3QkFBUCxNQUFxQyw2QkFBckM7O0FBRUEsSUFBTUMscUJBQXFCLElBQUlKLFdBQUosQ0FDekJDLHNCQUR5QixFQUV6QkUseUJBQXlCLFVBQXpCLEVBQXFDLEdBQXJDLENBRnlCLEVBR3pCRCxxQkFIeUIsQ0FBM0I7O0FBTUEsZUFBZUUsa0JBQWYiLCJmaWxlIjoib25lTGluZUlubGluZUxpc3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRlbXBsYXRlVGFnIGZyb20gJy4uL1RlbXBsYXRlVGFnJztcbmltcG9ydCBpbmxpbmVBcnJheVRyYW5zZm9ybWVyIGZyb20gJy4uL2lubGluZUFycmF5VHJhbnNmb3JtZXInO1xuaW1wb3J0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi90cmltUmVzdWx0VHJhbnNmb3JtZXInO1xuaW1wb3J0IHJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi9yZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXInO1xuXG5jb25zdCBvbmVMaW5lSW5saW5lTGlzdHMgPSBuZXcgVGVtcGxhdGVUYWcoXG4gIGlubGluZUFycmF5VHJhbnNmb3JtZXIsXG4gIHJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lcigvKD86XFxzKykvZywgJyAnKSxcbiAgdHJpbVJlc3VsdFRyYW5zZm9ybWVyLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgb25lTGluZUlubGluZUxpc3RzO1xuIl19

/***/ }),

/***/ "./node_modules/common-tags/es/oneLineTrim/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/common-tags/es/oneLineTrim/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _oneLineTrim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./oneLineTrim */ "./node_modules/common-tags/es/oneLineTrim/oneLineTrim.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _oneLineTrim__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lVHJpbS9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0Il0sIm1hcHBpbmdzIjoicUJBQW9CLGU7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL29uZUxpbmVUcmltJztcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/oneLineTrim/oneLineTrim.js":
/*!****************************************************************!*\
  !*** ./node_modules/common-tags/es/oneLineTrim/oneLineTrim.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplateTag */ "./node_modules/common-tags/es/TemplateTag/index.js");
/* harmony import */ var _trimResultTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../trimResultTransformer */ "./node_modules/common-tags/es/trimResultTransformer/index.js");
/* harmony import */ var _replaceResultTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../replaceResultTransformer */ "./node_modules/common-tags/es/replaceResultTransformer/index.js");




var oneLineTrim = new _TemplateTag__WEBPACK_IMPORTED_MODULE_0__["default"](Object(_replaceResultTransformer__WEBPACK_IMPORTED_MODULE_2__["default"])(/(?:\n\s*)/g, ''), _trimResultTransformer__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (oneLineTrim);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vbmVMaW5lVHJpbS9vbmVMaW5lVHJpbS5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZVRhZyIsInRyaW1SZXN1bHRUcmFuc2Zvcm1lciIsInJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lciIsIm9uZUxpbmVUcmltIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxXQUFQLE1BQXdCLGdCQUF4QjtBQUNBLE9BQU9DLHFCQUFQLE1BQWtDLDBCQUFsQztBQUNBLE9BQU9DLHdCQUFQLE1BQXFDLDZCQUFyQzs7QUFFQSxJQUFNQyxjQUFjLElBQUlILFdBQUosQ0FDbEJFLHlCQUF5QixZQUF6QixFQUF1QyxFQUF2QyxDQURrQixFQUVsQkQscUJBRmtCLENBQXBCOztBQUtBLGVBQWVFLFdBQWYiLCJmaWxlIjoib25lTGluZVRyaW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGVtcGxhdGVUYWcgZnJvbSAnLi4vVGVtcGxhdGVUYWcnO1xuaW1wb3J0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi90cmltUmVzdWx0VHJhbnNmb3JtZXInO1xuaW1wb3J0IHJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi9yZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXInO1xuXG5jb25zdCBvbmVMaW5lVHJpbSA9IG5ldyBUZW1wbGF0ZVRhZyhcbiAgcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyKC8oPzpcXG5cXHMqKS9nLCAnJyksXG4gIHRyaW1SZXN1bHRUcmFuc2Zvcm1lcixcbik7XG5cbmV4cG9ydCBkZWZhdWx0IG9uZUxpbmVUcmltO1xuIl19

/***/ }),

/***/ "./node_modules/common-tags/es/removeNonPrintingValuesTransformer/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/common-tags/es/removeNonPrintingValuesTransformer/index.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _removeNonPrintingValuesTransformer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removeNonPrintingValuesTransformer */ "./node_modules/common-tags/es/removeNonPrintingValuesTransformer/removeNonPrintingValuesTransformer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _removeNonPrintingValuesTransformer__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZW1vdmVOb25QcmludGluZ1ZhbHVlc1RyYW5zZm9ybWVyL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiXSwibWFwcGluZ3MiOiJxQkFBb0Isc0M7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL3JlbW92ZU5vblByaW50aW5nVmFsdWVzVHJhbnNmb3JtZXInO1xuIl19

/***/ }),

/***/ "./node_modules/common-tags/es/removeNonPrintingValuesTransformer/removeNonPrintingValuesTransformer.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/common-tags/es/removeNonPrintingValuesTransformer/removeNonPrintingValuesTransformer.js ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var isValidValue = function isValidValue(x) {
  return x != null && !Number.isNaN(x) && typeof x !== 'boolean';
};

var removeNonPrintingValuesTransformer = function removeNonPrintingValuesTransformer() {
  return {
    onSubstitution: function onSubstitution(substitution) {
      if (Array.isArray(substitution)) {
        return substitution.filter(isValidValue);
      }
      if (isValidValue(substitution)) {
        return substitution;
      }
      return '';
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (removeNonPrintingValuesTransformer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZW1vdmVOb25QcmludGluZ1ZhbHVlc1RyYW5zZm9ybWVyL3JlbW92ZU5vblByaW50aW5nVmFsdWVzVHJhbnNmb3JtZXIuanMiXSwibmFtZXMiOlsiaXNWYWxpZFZhbHVlIiwieCIsIk51bWJlciIsImlzTmFOIiwicmVtb3ZlTm9uUHJpbnRpbmdWYWx1ZXNUcmFuc2Zvcm1lciIsIm9uU3Vic3RpdHV0aW9uIiwic3Vic3RpdHV0aW9uIiwiQXJyYXkiLCJpc0FycmF5IiwiZmlsdGVyIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFNQSxlQUFlLFNBQWZBLFlBQWU7QUFBQSxTQUNuQkMsS0FBSyxJQUFMLElBQWEsQ0FBQ0MsT0FBT0MsS0FBUCxDQUFhRixDQUFiLENBQWQsSUFBaUMsT0FBT0EsQ0FBUCxLQUFhLFNBRDNCO0FBQUEsQ0FBckI7O0FBR0EsSUFBTUcscUNBQXFDLFNBQXJDQSxrQ0FBcUM7QUFBQSxTQUFPO0FBQ2hEQyxrQkFEZ0QsMEJBQ2pDQyxZQURpQyxFQUNuQjtBQUMzQixVQUFJQyxNQUFNQyxPQUFOLENBQWNGLFlBQWQsQ0FBSixFQUFpQztBQUMvQixlQUFPQSxhQUFhRyxNQUFiLENBQW9CVCxZQUFwQixDQUFQO0FBQ0Q7QUFDRCxVQUFJQSxhQUFhTSxZQUFiLENBQUosRUFBZ0M7QUFDOUIsZUFBT0EsWUFBUDtBQUNEO0FBQ0QsYUFBTyxFQUFQO0FBQ0Q7QUFUK0MsR0FBUDtBQUFBLENBQTNDOztBQVlBLGVBQWVGLGtDQUFmIiwiZmlsZSI6InJlbW92ZU5vblByaW50aW5nVmFsdWVzVHJhbnNmb3JtZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpc1ZhbGlkVmFsdWUgPSB4ID0+XG4gIHggIT0gbnVsbCAmJiAhTnVtYmVyLmlzTmFOKHgpICYmIHR5cGVvZiB4ICE9PSAnYm9vbGVhbic7XG5cbmNvbnN0IHJlbW92ZU5vblByaW50aW5nVmFsdWVzVHJhbnNmb3JtZXIgPSAoKSA9PiAoe1xuICBvblN1YnN0aXR1dGlvbihzdWJzdGl0dXRpb24pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdWJzdGl0dXRpb24pKSB7XG4gICAgICByZXR1cm4gc3Vic3RpdHV0aW9uLmZpbHRlcihpc1ZhbGlkVmFsdWUpO1xuICAgIH1cbiAgICBpZiAoaXNWYWxpZFZhbHVlKHN1YnN0aXR1dGlvbikpIHtcbiAgICAgIHJldHVybiBzdWJzdGl0dXRpb247XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByZW1vdmVOb25QcmludGluZ1ZhbHVlc1RyYW5zZm9ybWVyO1xuIl19

/***/ }),

/***/ "./node_modules/common-tags/es/replaceResultTransformer/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/common-tags/es/replaceResultTransformer/index.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _replaceResultTransformer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./replaceResultTransformer */ "./node_modules/common-tags/es/replaceResultTransformer/replaceResultTransformer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _replaceResultTransformer__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXIvaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdCJdLCJtYXBwaW5ncyI6InFCQUFvQiw0QjtxQkFBYkEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZyb20gJy4vcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyJztcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/replaceResultTransformer/replaceResultTransformer.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/common-tags/es/replaceResultTransformer/replaceResultTransformer.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Replaces tabs, newlines and spaces with the chosen value when they occur in sequences
 * @param  {(String|RegExp)} replaceWhat - the value or pattern that should be replaced
 * @param  {*}               replaceWith - the replacement value
 * @return {Object}                      - a TemplateTag transformer
 */
var replaceResultTransformer = function replaceResultTransformer(replaceWhat, replaceWith) {
  return {
    onEndResult: function onEndResult(endResult) {
      if (replaceWhat == null || replaceWith == null) {
        throw new Error('replaceResultTransformer requires at least 2 arguments.');
      }
      return endResult.replace(replaceWhat, replaceWith);
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (replaceResultTransformer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBsYWNlUmVzdWx0VHJhbnNmb3JtZXIvcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyLmpzIl0sIm5hbWVzIjpbInJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lciIsInJlcGxhY2VXaGF0IiwicmVwbGFjZVdpdGgiLCJvbkVuZFJlc3VsdCIsImVuZFJlc3VsdCIsIkVycm9yIiwicmVwbGFjZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQU1BLElBQU1BLDJCQUEyQixTQUEzQkEsd0JBQTJCLENBQUNDLFdBQUQsRUFBY0MsV0FBZDtBQUFBLFNBQStCO0FBQzlEQyxlQUQ4RCx1QkFDbERDLFNBRGtELEVBQ3ZDO0FBQ3JCLFVBQUlILGVBQWUsSUFBZixJQUF1QkMsZUFBZSxJQUExQyxFQUFnRDtBQUM5QyxjQUFNLElBQUlHLEtBQUosQ0FDSix5REFESSxDQUFOO0FBR0Q7QUFDRCxhQUFPRCxVQUFVRSxPQUFWLENBQWtCTCxXQUFsQixFQUErQkMsV0FBL0IsQ0FBUDtBQUNEO0FBUjZELEdBQS9CO0FBQUEsQ0FBakM7O0FBV0EsZUFBZUYsd0JBQWYiLCJmaWxlIjoicmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZXBsYWNlcyB0YWJzLCBuZXdsaW5lcyBhbmQgc3BhY2VzIHdpdGggdGhlIGNob3NlbiB2YWx1ZSB3aGVuIHRoZXkgb2NjdXIgaW4gc2VxdWVuY2VzXG4gKiBAcGFyYW0gIHsoU3RyaW5nfFJlZ0V4cCl9IHJlcGxhY2VXaGF0IC0gdGhlIHZhbHVlIG9yIHBhdHRlcm4gdGhhdCBzaG91bGQgYmUgcmVwbGFjZWRcbiAqIEBwYXJhbSAgeyp9ICAgICAgICAgICAgICAgcmVwbGFjZVdpdGggLSB0aGUgcmVwbGFjZW1lbnQgdmFsdWVcbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgICAgICAgLSBhIFRlbXBsYXRlVGFnIHRyYW5zZm9ybWVyXG4gKi9cbmNvbnN0IHJlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lciA9IChyZXBsYWNlV2hhdCwgcmVwbGFjZVdpdGgpID0+ICh7XG4gIG9uRW5kUmVzdWx0KGVuZFJlc3VsdCkge1xuICAgIGlmIChyZXBsYWNlV2hhdCA9PSBudWxsIHx8IHJlcGxhY2VXaXRoID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ3JlcGxhY2VSZXN1bHRUcmFuc2Zvcm1lciByZXF1aXJlcyBhdCBsZWFzdCAyIGFyZ3VtZW50cy4nLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGVuZFJlc3VsdC5yZXBsYWNlKHJlcGxhY2VXaGF0LCByZXBsYWNlV2l0aCk7XG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZVJlc3VsdFRyYW5zZm9ybWVyO1xuIl19

/***/ }),

/***/ "./node_modules/common-tags/es/replaceStringTransformer/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/common-tags/es/replaceStringTransformer/index.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _replaceStringTransformer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./replaceStringTransformer */ "./node_modules/common-tags/es/replaceStringTransformer/replaceStringTransformer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _replaceStringTransformer__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBsYWNlU3RyaW5nVHJhbnNmb3JtZXIvaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdCJdLCJtYXBwaW5ncyI6InFCQUFvQiw0QjtxQkFBYkEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZyb20gJy4vcmVwbGFjZVN0cmluZ1RyYW5zZm9ybWVyJztcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/replaceStringTransformer/replaceStringTransformer.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/common-tags/es/replaceStringTransformer/replaceStringTransformer.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var replaceStringTransformer = function replaceStringTransformer(replaceWhat, replaceWith) {
  return {
    onString: function onString(str) {
      if (replaceWhat == null || replaceWith == null) {
        throw new Error('replaceStringTransformer requires at least 2 arguments.');
      }

      return str.replace(replaceWhat, replaceWith);
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (replaceStringTransformer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBsYWNlU3RyaW5nVHJhbnNmb3JtZXIvcmVwbGFjZVN0cmluZ1RyYW5zZm9ybWVyLmpzIl0sIm5hbWVzIjpbInJlcGxhY2VTdHJpbmdUcmFuc2Zvcm1lciIsInJlcGxhY2VXaGF0IiwicmVwbGFjZVdpdGgiLCJvblN0cmluZyIsInN0ciIsIkVycm9yIiwicmVwbGFjZSJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTUEsMkJBQTJCLFNBQTNCQSx3QkFBMkIsQ0FBQ0MsV0FBRCxFQUFjQyxXQUFkO0FBQUEsU0FBK0I7QUFDOURDLFlBRDhELG9CQUNyREMsR0FEcUQsRUFDaEQ7QUFDWixVQUFJSCxlQUFlLElBQWYsSUFBdUJDLGVBQWUsSUFBMUMsRUFBZ0Q7QUFDOUMsY0FBTSxJQUFJRyxLQUFKLENBQ0oseURBREksQ0FBTjtBQUdEOztBQUVELGFBQU9ELElBQUlFLE9BQUosQ0FBWUwsV0FBWixFQUF5QkMsV0FBekIsQ0FBUDtBQUNEO0FBVDZELEdBQS9CO0FBQUEsQ0FBakM7O0FBWUEsZUFBZUYsd0JBQWYiLCJmaWxlIjoicmVwbGFjZVN0cmluZ1RyYW5zZm9ybWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcmVwbGFjZVN0cmluZ1RyYW5zZm9ybWVyID0gKHJlcGxhY2VXaGF0LCByZXBsYWNlV2l0aCkgPT4gKHtcbiAgb25TdHJpbmcoc3RyKSB7XG4gICAgaWYgKHJlcGxhY2VXaGF0ID09IG51bGwgfHwgcmVwbGFjZVdpdGggPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAncmVwbGFjZVN0cmluZ1RyYW5zZm9ybWVyIHJlcXVpcmVzIGF0IGxlYXN0IDIgYXJndW1lbnRzLicsXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBzdHIucmVwbGFjZShyZXBsYWNlV2hhdCwgcmVwbGFjZVdpdGgpO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJlcGxhY2VTdHJpbmdUcmFuc2Zvcm1lcjtcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/replaceSubstitutionTransformer/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/common-tags/es/replaceSubstitutionTransformer/index.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _replaceSubstitutionTransformer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./replaceSubstitutionTransformer */ "./node_modules/common-tags/es/replaceSubstitutionTransformer/replaceSubstitutionTransformer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _replaceSubstitutionTransformer__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXIvaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdCJdLCJtYXBwaW5ncyI6InFCQUFvQixrQztxQkFBYkEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZyb20gJy4vcmVwbGFjZVN1YnN0aXR1dGlvblRyYW5zZm9ybWVyJztcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/replaceSubstitutionTransformer/replaceSubstitutionTransformer.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/common-tags/es/replaceSubstitutionTransformer/replaceSubstitutionTransformer.js ***!
  \******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var replaceSubstitutionTransformer = function replaceSubstitutionTransformer(replaceWhat, replaceWith) {
  return {
    onSubstitution: function onSubstitution(substitution, resultSoFar) {
      if (replaceWhat == null || replaceWith == null) {
        throw new Error('replaceSubstitutionTransformer requires at least 2 arguments.');
      }

      // Do not touch if null or undefined
      if (substitution == null) {
        return substitution;
      } else {
        return substitution.toString().replace(replaceWhat, replaceWith);
      }
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (replaceSubstitutionTransformer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXIvcmVwbGFjZVN1YnN0aXR1dGlvblRyYW5zZm9ybWVyLmpzIl0sIm5hbWVzIjpbInJlcGxhY2VTdWJzdGl0dXRpb25UcmFuc2Zvcm1lciIsInJlcGxhY2VXaGF0IiwicmVwbGFjZVdpdGgiLCJvblN1YnN0aXR1dGlvbiIsInN1YnN0aXR1dGlvbiIsInJlc3VsdFNvRmFyIiwiRXJyb3IiLCJ0b1N0cmluZyIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiJBQUFBLElBQU1BLGlDQUFpQyxTQUFqQ0EsOEJBQWlDLENBQUNDLFdBQUQsRUFBY0MsV0FBZDtBQUFBLFNBQStCO0FBQ3BFQyxrQkFEb0UsMEJBQ3JEQyxZQURxRCxFQUN2Q0MsV0FEdUMsRUFDMUI7QUFDeEMsVUFBSUosZUFBZSxJQUFmLElBQXVCQyxlQUFlLElBQTFDLEVBQWdEO0FBQzlDLGNBQU0sSUFBSUksS0FBSixDQUNKLCtEQURJLENBQU47QUFHRDs7QUFFRDtBQUNBLFVBQUlGLGdCQUFnQixJQUFwQixFQUEwQjtBQUN4QixlQUFPQSxZQUFQO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZUFBT0EsYUFBYUcsUUFBYixHQUF3QkMsT0FBeEIsQ0FBZ0NQLFdBQWhDLEVBQTZDQyxXQUE3QyxDQUFQO0FBQ0Q7QUFDRjtBQWRtRSxHQUEvQjtBQUFBLENBQXZDOztBQWlCQSxlQUFlRiw4QkFBZiIsImZpbGUiOiJyZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCByZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXIgPSAocmVwbGFjZVdoYXQsIHJlcGxhY2VXaXRoKSA9PiAoe1xuICBvblN1YnN0aXR1dGlvbihzdWJzdGl0dXRpb24sIHJlc3VsdFNvRmFyKSB7XG4gICAgaWYgKHJlcGxhY2VXaGF0ID09IG51bGwgfHwgcmVwbGFjZVdpdGggPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAncmVwbGFjZVN1YnN0aXR1dGlvblRyYW5zZm9ybWVyIHJlcXVpcmVzIGF0IGxlYXN0IDIgYXJndW1lbnRzLicsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIERvIG5vdCB0b3VjaCBpZiBudWxsIG9yIHVuZGVmaW5lZFxuICAgIGlmIChzdWJzdGl0dXRpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHN1YnN0aXR1dGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1YnN0aXR1dGlvbi50b1N0cmluZygpLnJlcGxhY2UocmVwbGFjZVdoYXQsIHJlcGxhY2VXaXRoKTtcbiAgICB9XG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZVN1YnN0aXR1dGlvblRyYW5zZm9ybWVyO1xuIl19

/***/ }),

/***/ "./node_modules/common-tags/es/safeHtml/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/common-tags/es/safeHtml/index.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _safeHtml__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./safeHtml */ "./node_modules/common-tags/es/safeHtml/safeHtml.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _safeHtml__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zYWZlSHRtbC9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0Il0sIm1hcHBpbmdzIjoicUJBQW9CLFk7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL3NhZmVIdG1sJztcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/safeHtml/safeHtml.js":
/*!**********************************************************!*\
  !*** ./node_modules/common-tags/es/safeHtml/safeHtml.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplateTag */ "./node_modules/common-tags/es/TemplateTag/index.js");
/* harmony import */ var _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stripIndentTransformer */ "./node_modules/common-tags/es/stripIndentTransformer/index.js");
/* harmony import */ var _inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../inlineArrayTransformer */ "./node_modules/common-tags/es/inlineArrayTransformer/index.js");
/* harmony import */ var _trimResultTransformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../trimResultTransformer */ "./node_modules/common-tags/es/trimResultTransformer/index.js");
/* harmony import */ var _splitStringTransformer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../splitStringTransformer */ "./node_modules/common-tags/es/splitStringTransformer/index.js");
/* harmony import */ var _replaceSubstitutionTransformer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../replaceSubstitutionTransformer */ "./node_modules/common-tags/es/replaceSubstitutionTransformer/index.js");







var safeHtml = new _TemplateTag__WEBPACK_IMPORTED_MODULE_0__["default"](Object(_splitStringTransformer__WEBPACK_IMPORTED_MODULE_4__["default"])('\n'), _inlineArrayTransformer__WEBPACK_IMPORTED_MODULE_2__["default"], _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_1__["default"], _trimResultTransformer__WEBPACK_IMPORTED_MODULE_3__["default"], Object(_replaceSubstitutionTransformer__WEBPACK_IMPORTED_MODULE_5__["default"])(/&/g, '&amp;'), Object(_replaceSubstitutionTransformer__WEBPACK_IMPORTED_MODULE_5__["default"])(/</g, '&lt;'), Object(_replaceSubstitutionTransformer__WEBPACK_IMPORTED_MODULE_5__["default"])(/>/g, '&gt;'), Object(_replaceSubstitutionTransformer__WEBPACK_IMPORTED_MODULE_5__["default"])(/"/g, '&quot;'), Object(_replaceSubstitutionTransformer__WEBPACK_IMPORTED_MODULE_5__["default"])(/'/g, '&#x27;'), Object(_replaceSubstitutionTransformer__WEBPACK_IMPORTED_MODULE_5__["default"])(/`/g, '&#x60;'));

/* harmony default export */ __webpack_exports__["default"] = (safeHtml);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zYWZlSHRtbC9zYWZlSHRtbC5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZVRhZyIsInN0cmlwSW5kZW50VHJhbnNmb3JtZXIiLCJpbmxpbmVBcnJheVRyYW5zZm9ybWVyIiwidHJpbVJlc3VsdFRyYW5zZm9ybWVyIiwic3BsaXRTdHJpbmdUcmFuc2Zvcm1lciIsInJlcGxhY2VTdWJzdGl0dXRpb25UcmFuc2Zvcm1lciIsInNhZmVIdG1sIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxXQUFQLE1BQXdCLGdCQUF4QjtBQUNBLE9BQU9DLHNCQUFQLE1BQW1DLDJCQUFuQztBQUNBLE9BQU9DLHNCQUFQLE1BQW1DLDJCQUFuQztBQUNBLE9BQU9DLHFCQUFQLE1BQWtDLDBCQUFsQztBQUNBLE9BQU9DLHNCQUFQLE1BQW1DLDJCQUFuQztBQUNBLE9BQU9DLDhCQUFQLE1BQTJDLG1DQUEzQzs7QUFFQSxJQUFNQyxXQUFXLElBQUlOLFdBQUosQ0FDZkksdUJBQXVCLElBQXZCLENBRGUsRUFFZkYsc0JBRmUsRUFHZkQsc0JBSGUsRUFJZkUscUJBSmUsRUFLZkUsK0JBQStCLElBQS9CLEVBQXFDLE9BQXJDLENBTGUsRUFNZkEsK0JBQStCLElBQS9CLEVBQXFDLE1BQXJDLENBTmUsRUFPZkEsK0JBQStCLElBQS9CLEVBQXFDLE1BQXJDLENBUGUsRUFRZkEsK0JBQStCLElBQS9CLEVBQXFDLFFBQXJDLENBUmUsRUFTZkEsK0JBQStCLElBQS9CLEVBQXFDLFFBQXJDLENBVGUsRUFVZkEsK0JBQStCLElBQS9CLEVBQXFDLFFBQXJDLENBVmUsQ0FBakI7O0FBYUEsZUFBZUMsUUFBZiIsImZpbGUiOiJzYWZlSHRtbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZW1wbGF0ZVRhZyBmcm9tICcuLi9UZW1wbGF0ZVRhZyc7XG5pbXBvcnQgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lciBmcm9tICcuLi9zdHJpcEluZGVudFRyYW5zZm9ybWVyJztcbmltcG9ydCBpbmxpbmVBcnJheVRyYW5zZm9ybWVyIGZyb20gJy4uL2lubGluZUFycmF5VHJhbnNmb3JtZXInO1xuaW1wb3J0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi90cmltUmVzdWx0VHJhbnNmb3JtZXInO1xuaW1wb3J0IHNwbGl0U3RyaW5nVHJhbnNmb3JtZXIgZnJvbSAnLi4vc3BsaXRTdHJpbmdUcmFuc2Zvcm1lcic7XG5pbXBvcnQgcmVwbGFjZVN1YnN0aXR1dGlvblRyYW5zZm9ybWVyIGZyb20gJy4uL3JlcGxhY2VTdWJzdGl0dXRpb25UcmFuc2Zvcm1lcic7XG5cbmNvbnN0IHNhZmVIdG1sID0gbmV3IFRlbXBsYXRlVGFnKFxuICBzcGxpdFN0cmluZ1RyYW5zZm9ybWVyKCdcXG4nKSxcbiAgaW5saW5lQXJyYXlUcmFuc2Zvcm1lcixcbiAgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lcixcbiAgdHJpbVJlc3VsdFRyYW5zZm9ybWVyLFxuICByZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXIoLyYvZywgJyZhbXA7JyksXG4gIHJlcGxhY2VTdWJzdGl0dXRpb25UcmFuc2Zvcm1lcigvPC9nLCAnJmx0OycpLFxuICByZXBsYWNlU3Vic3RpdHV0aW9uVHJhbnNmb3JtZXIoLz4vZywgJyZndDsnKSxcbiAgcmVwbGFjZVN1YnN0aXR1dGlvblRyYW5zZm9ybWVyKC9cIi9nLCAnJnF1b3Q7JyksXG4gIHJlcGxhY2VTdWJzdGl0dXRpb25UcmFuc2Zvcm1lcigvJy9nLCAnJiN4Mjc7JyksXG4gIHJlcGxhY2VTdWJzdGl0dXRpb25UcmFuc2Zvcm1lcigvYC9nLCAnJiN4NjA7JyksXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBzYWZlSHRtbDtcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/source/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/common-tags/es/source/index.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../html */ "./node_modules/common-tags/es/html/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _html__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zb3VyY2UvaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdCJdLCJtYXBwaW5ncyI6InFCQUFvQixTO3FCQUFiQSxPIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnJvbSAnLi4vaHRtbCc7XG4iXX0=

/***/ }),

/***/ "./node_modules/common-tags/es/splitStringTransformer/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/common-tags/es/splitStringTransformer/index.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _splitStringTransformer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./splitStringTransformer */ "./node_modules/common-tags/es/splitStringTransformer/splitStringTransformer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _splitStringTransformer__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zcGxpdFN0cmluZ1RyYW5zZm9ybWVyL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiXSwibWFwcGluZ3MiOiJxQkFBb0IsMEI7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL3NwbGl0U3RyaW5nVHJhbnNmb3JtZXInO1xuIl19

/***/ }),

/***/ "./node_modules/common-tags/es/splitStringTransformer/splitStringTransformer.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/common-tags/es/splitStringTransformer/splitStringTransformer.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var splitStringTransformer = function splitStringTransformer(splitBy) {
  return {
    onSubstitution: function onSubstitution(substitution, resultSoFar) {
      if (splitBy != null && typeof splitBy === 'string') {
        if (typeof substitution === 'string' && substitution.includes(splitBy)) {
          substitution = substitution.split(splitBy);
        }
      } else {
        throw new Error('You need to specify a string character to split by.');
      }
      return substitution;
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (splitStringTransformer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zcGxpdFN0cmluZ1RyYW5zZm9ybWVyL3NwbGl0U3RyaW5nVHJhbnNmb3JtZXIuanMiXSwibmFtZXMiOlsic3BsaXRTdHJpbmdUcmFuc2Zvcm1lciIsIm9uU3Vic3RpdHV0aW9uIiwic3Vic3RpdHV0aW9uIiwicmVzdWx0U29GYXIiLCJzcGxpdEJ5IiwiaW5jbHVkZXMiLCJzcGxpdCIsIkVycm9yIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFNQSx5QkFBeUIsU0FBekJBLHNCQUF5QjtBQUFBLFNBQVk7QUFDekNDLGtCQUR5QywwQkFDMUJDLFlBRDBCLEVBQ1pDLFdBRFksRUFDQztBQUN4QyxVQUFJQyxXQUFXLElBQVgsSUFBbUIsT0FBT0EsT0FBUCxLQUFtQixRQUExQyxFQUFvRDtBQUNsRCxZQUFJLE9BQU9GLFlBQVAsS0FBd0IsUUFBeEIsSUFBb0NBLGFBQWFHLFFBQWIsQ0FBc0JELE9BQXRCLENBQXhDLEVBQXdFO0FBQ3RFRix5QkFBZUEsYUFBYUksS0FBYixDQUFtQkYsT0FBbkIsQ0FBZjtBQUNEO0FBQ0YsT0FKRCxNQUlPO0FBQ0wsY0FBTSxJQUFJRyxLQUFKLENBQVUscURBQVYsQ0FBTjtBQUNEO0FBQ0QsYUFBT0wsWUFBUDtBQUNEO0FBVndDLEdBQVo7QUFBQSxDQUEvQjs7QUFhQSxlQUFlRixzQkFBZiIsImZpbGUiOiJzcGxpdFN0cmluZ1RyYW5zZm9ybWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgc3BsaXRTdHJpbmdUcmFuc2Zvcm1lciA9IHNwbGl0QnkgPT4gKHtcbiAgb25TdWJzdGl0dXRpb24oc3Vic3RpdHV0aW9uLCByZXN1bHRTb0Zhcikge1xuICAgIGlmIChzcGxpdEJ5ICE9IG51bGwgJiYgdHlwZW9mIHNwbGl0QnkgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAodHlwZW9mIHN1YnN0aXR1dGlvbiA9PT0gJ3N0cmluZycgJiYgc3Vic3RpdHV0aW9uLmluY2x1ZGVzKHNwbGl0QnkpKSB7XG4gICAgICAgIHN1YnN0aXR1dGlvbiA9IHN1YnN0aXR1dGlvbi5zcGxpdChzcGxpdEJ5KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbmVlZCB0byBzcGVjaWZ5IGEgc3RyaW5nIGNoYXJhY3RlciB0byBzcGxpdCBieS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1YnN0aXR1dGlvbjtcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBzcGxpdFN0cmluZ1RyYW5zZm9ybWVyO1xuIl19

/***/ }),

/***/ "./node_modules/common-tags/es/stripIndent/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/common-tags/es/stripIndent/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stripIndent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stripIndent */ "./node_modules/common-tags/es/stripIndent/stripIndent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _stripIndent__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJpcEluZGVudC9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0Il0sIm1hcHBpbmdzIjoicUJBQW9CLGU7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL3N0cmlwSW5kZW50JztcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/stripIndent/stripIndent.js":
/*!****************************************************************!*\
  !*** ./node_modules/common-tags/es/stripIndent/stripIndent.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplateTag */ "./node_modules/common-tags/es/TemplateTag/index.js");
/* harmony import */ var _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stripIndentTransformer */ "./node_modules/common-tags/es/stripIndentTransformer/index.js");
/* harmony import */ var _trimResultTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../trimResultTransformer */ "./node_modules/common-tags/es/trimResultTransformer/index.js");




var stripIndent = new _TemplateTag__WEBPACK_IMPORTED_MODULE_0__["default"](_stripIndentTransformer__WEBPACK_IMPORTED_MODULE_1__["default"], _trimResultTransformer__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (stripIndent);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJpcEluZGVudC9zdHJpcEluZGVudC5qcyJdLCJuYW1lcyI6WyJUZW1wbGF0ZVRhZyIsInN0cmlwSW5kZW50VHJhbnNmb3JtZXIiLCJ0cmltUmVzdWx0VHJhbnNmb3JtZXIiLCJzdHJpcEluZGVudCJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsV0FBUCxNQUF3QixnQkFBeEI7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxxQkFBUCxNQUFrQywwQkFBbEM7O0FBRUEsSUFBTUMsY0FBYyxJQUFJSCxXQUFKLENBQ2xCQyxzQkFEa0IsRUFFbEJDLHFCQUZrQixDQUFwQjs7QUFLQSxlQUFlQyxXQUFmIiwiZmlsZSI6InN0cmlwSW5kZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRlbXBsYXRlVGFnIGZyb20gJy4uL1RlbXBsYXRlVGFnJztcbmltcG9ydCBzdHJpcEluZGVudFRyYW5zZm9ybWVyIGZyb20gJy4uL3N0cmlwSW5kZW50VHJhbnNmb3JtZXInO1xuaW1wb3J0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lciBmcm9tICcuLi90cmltUmVzdWx0VHJhbnNmb3JtZXInO1xuXG5jb25zdCBzdHJpcEluZGVudCA9IG5ldyBUZW1wbGF0ZVRhZyhcbiAgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lcixcbiAgdHJpbVJlc3VsdFRyYW5zZm9ybWVyLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgc3RyaXBJbmRlbnQ7XG4iXX0=

/***/ }),

/***/ "./node_modules/common-tags/es/stripIndentTransformer/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/common-tags/es/stripIndentTransformer/index.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stripIndentTransformer */ "./node_modules/common-tags/es/stripIndentTransformer/stripIndentTransformer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJpcEluZGVudFRyYW5zZm9ybWVyL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHQiXSwibWFwcGluZ3MiOiJxQkFBb0IsMEI7cUJBQWJBLE8iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmcm9tICcuL3N0cmlwSW5kZW50VHJhbnNmb3JtZXInO1xuIl19

/***/ }),

/***/ "./node_modules/common-tags/es/stripIndentTransformer/stripIndentTransformer.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/common-tags/es/stripIndentTransformer/stripIndentTransformer.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * strips indentation from a template literal
 * @param  {String} type = 'initial' - whether to remove all indentation or just leading indentation. can be 'all' or 'initial'
 * @return {Object}                  - a TemplateTag transformer
 */
var stripIndentTransformer = function stripIndentTransformer() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'initial';
  return {
    onEndResult: function onEndResult(endResult) {
      if (type === 'initial') {
        // remove the shortest leading indentation from each line
        var match = endResult.match(/^[^\S\n]*(?=\S)/gm);
        var indent = match && Math.min.apply(Math, _toConsumableArray(match.map(function (el) {
          return el.length;
        })));
        if (indent) {
          var regexp = new RegExp('^.{' + indent + '}', 'gm');
          return endResult.replace(regexp, '');
        }
        return endResult;
      }
      if (type === 'all') {
        // remove all indentation from each line
        return endResult.replace(/^[^\S\n]+/gm, '');
      }
      throw new Error('Unknown type: ' + type);
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (stripIndentTransformer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJpcEluZGVudFRyYW5zZm9ybWVyL3N0cmlwSW5kZW50VHJhbnNmb3JtZXIuanMiXSwibmFtZXMiOlsic3RyaXBJbmRlbnRUcmFuc2Zvcm1lciIsInR5cGUiLCJvbkVuZFJlc3VsdCIsImVuZFJlc3VsdCIsIm1hdGNoIiwiaW5kZW50IiwiTWF0aCIsIm1pbiIsIm1hcCIsImVsIiwibGVuZ3RoIiwicmVnZXhwIiwiUmVnRXhwIiwicmVwbGFjZSIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7OztBQUtBLElBQU1BLHlCQUF5QixTQUF6QkEsc0JBQXlCO0FBQUEsTUFBQ0MsSUFBRCx1RUFBUSxTQUFSO0FBQUEsU0FBdUI7QUFDcERDLGVBRG9ELHVCQUN4Q0MsU0FEd0MsRUFDN0I7QUFDckIsVUFBSUYsU0FBUyxTQUFiLEVBQXdCO0FBQ3RCO0FBQ0EsWUFBTUcsUUFBUUQsVUFBVUMsS0FBVixDQUFnQixtQkFBaEIsQ0FBZDtBQUNBLFlBQU1DLFNBQVNELFNBQVNFLEtBQUtDLEdBQUwsZ0NBQVlILE1BQU1JLEdBQU4sQ0FBVTtBQUFBLGlCQUFNQyxHQUFHQyxNQUFUO0FBQUEsU0FBVixDQUFaLEVBQXhCO0FBQ0EsWUFBSUwsTUFBSixFQUFZO0FBQ1YsY0FBTU0sU0FBUyxJQUFJQyxNQUFKLFNBQWlCUCxNQUFqQixRQUE0QixJQUE1QixDQUFmO0FBQ0EsaUJBQU9GLFVBQVVVLE9BQVYsQ0FBa0JGLE1BQWxCLEVBQTBCLEVBQTFCLENBQVA7QUFDRDtBQUNELGVBQU9SLFNBQVA7QUFDRDtBQUNELFVBQUlGLFNBQVMsS0FBYixFQUFvQjtBQUNsQjtBQUNBLGVBQU9FLFVBQVVVLE9BQVYsQ0FBa0IsYUFBbEIsRUFBaUMsRUFBakMsQ0FBUDtBQUNEO0FBQ0QsWUFBTSxJQUFJQyxLQUFKLG9CQUEyQmIsSUFBM0IsQ0FBTjtBQUNEO0FBakJtRCxHQUF2QjtBQUFBLENBQS9COztBQW9CQSxlQUFlRCxzQkFBZiIsImZpbGUiOiJzdHJpcEluZGVudFRyYW5zZm9ybWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBzdHJpcHMgaW5kZW50YXRpb24gZnJvbSBhIHRlbXBsYXRlIGxpdGVyYWxcbiAqIEBwYXJhbSAge1N0cmluZ30gdHlwZSA9ICdpbml0aWFsJyAtIHdoZXRoZXIgdG8gcmVtb3ZlIGFsbCBpbmRlbnRhdGlvbiBvciBqdXN0IGxlYWRpbmcgaW5kZW50YXRpb24uIGNhbiBiZSAnYWxsJyBvciAnaW5pdGlhbCdcbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgICAtIGEgVGVtcGxhdGVUYWcgdHJhbnNmb3JtZXJcbiAqL1xuY29uc3Qgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lciA9ICh0eXBlID0gJ2luaXRpYWwnKSA9PiAoe1xuICBvbkVuZFJlc3VsdChlbmRSZXN1bHQpIHtcbiAgICBpZiAodHlwZSA9PT0gJ2luaXRpYWwnKSB7XG4gICAgICAvLyByZW1vdmUgdGhlIHNob3J0ZXN0IGxlYWRpbmcgaW5kZW50YXRpb24gZnJvbSBlYWNoIGxpbmVcbiAgICAgIGNvbnN0IG1hdGNoID0gZW5kUmVzdWx0Lm1hdGNoKC9eW15cXFNcXG5dKig/PVxcUykvZ20pO1xuICAgICAgY29uc3QgaW5kZW50ID0gbWF0Y2ggJiYgTWF0aC5taW4oLi4ubWF0Y2gubWFwKGVsID0+IGVsLmxlbmd0aCkpO1xuICAgICAgaWYgKGluZGVudCkge1xuICAgICAgICBjb25zdCByZWdleHAgPSBuZXcgUmVnRXhwKGBeLnske2luZGVudH19YCwgJ2dtJyk7XG4gICAgICAgIHJldHVybiBlbmRSZXN1bHQucmVwbGFjZShyZWdleHAsICcnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbmRSZXN1bHQ7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnYWxsJykge1xuICAgICAgLy8gcmVtb3ZlIGFsbCBpbmRlbnRhdGlvbiBmcm9tIGVhY2ggbGluZVxuICAgICAgcmV0dXJuIGVuZFJlc3VsdC5yZXBsYWNlKC9eW15cXFNcXG5dKy9nbSwgJycpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gdHlwZTogJHt0eXBlfWApO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmlwSW5kZW50VHJhbnNmb3JtZXI7XG4iXX0=

/***/ }),

/***/ "./node_modules/common-tags/es/stripIndents/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/common-tags/es/stripIndents/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stripIndents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stripIndents */ "./node_modules/common-tags/es/stripIndents/stripIndents.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _stripIndents__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJpcEluZGVudHMvaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdCJdLCJtYXBwaW5ncyI6InFCQUFvQixnQjtxQkFBYkEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZyb20gJy4vc3RyaXBJbmRlbnRzJztcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/stripIndents/stripIndents.js":
/*!******************************************************************!*\
  !*** ./node_modules/common-tags/es/stripIndents/stripIndents.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemplateTag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../TemplateTag */ "./node_modules/common-tags/es/TemplateTag/index.js");
/* harmony import */ var _stripIndentTransformer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stripIndentTransformer */ "./node_modules/common-tags/es/stripIndentTransformer/index.js");
/* harmony import */ var _trimResultTransformer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../trimResultTransformer */ "./node_modules/common-tags/es/trimResultTransformer/index.js");




var stripIndents = new _TemplateTag__WEBPACK_IMPORTED_MODULE_0__["default"](Object(_stripIndentTransformer__WEBPACK_IMPORTED_MODULE_1__["default"])('all'), _trimResultTransformer__WEBPACK_IMPORTED_MODULE_2__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (stripIndents);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJpcEluZGVudHMvc3RyaXBJbmRlbnRzLmpzIl0sIm5hbWVzIjpbIlRlbXBsYXRlVGFnIiwic3RyaXBJbmRlbnRUcmFuc2Zvcm1lciIsInRyaW1SZXN1bHRUcmFuc2Zvcm1lciIsInN0cmlwSW5kZW50cyJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsV0FBUCxNQUF3QixnQkFBeEI7QUFDQSxPQUFPQyxzQkFBUCxNQUFtQywyQkFBbkM7QUFDQSxPQUFPQyxxQkFBUCxNQUFrQywwQkFBbEM7O0FBRUEsSUFBTUMsZUFBZSxJQUFJSCxXQUFKLENBQ25CQyx1QkFBdUIsS0FBdkIsQ0FEbUIsRUFFbkJDLHFCQUZtQixDQUFyQjs7QUFLQSxlQUFlQyxZQUFmIiwiZmlsZSI6InN0cmlwSW5kZW50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUZW1wbGF0ZVRhZyBmcm9tICcuLi9UZW1wbGF0ZVRhZyc7XG5pbXBvcnQgc3RyaXBJbmRlbnRUcmFuc2Zvcm1lciBmcm9tICcuLi9zdHJpcEluZGVudFRyYW5zZm9ybWVyJztcbmltcG9ydCB0cmltUmVzdWx0VHJhbnNmb3JtZXIgZnJvbSAnLi4vdHJpbVJlc3VsdFRyYW5zZm9ybWVyJztcblxuY29uc3Qgc3RyaXBJbmRlbnRzID0gbmV3IFRlbXBsYXRlVGFnKFxuICBzdHJpcEluZGVudFRyYW5zZm9ybWVyKCdhbGwnKSxcbiAgdHJpbVJlc3VsdFRyYW5zZm9ybWVyLFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgc3RyaXBJbmRlbnRzO1xuIl19

/***/ }),

/***/ "./node_modules/common-tags/es/trimResultTransformer/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/common-tags/es/trimResultTransformer/index.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _trimResultTransformer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./trimResultTransformer */ "./node_modules/common-tags/es/trimResultTransformer/trimResultTransformer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _trimResultTransformer__WEBPACK_IMPORTED_MODULE_0__["default"]; });



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmltUmVzdWx0VHJhbnNmb3JtZXIvaW5kZXguanMiXSwibmFtZXMiOlsiZGVmYXVsdCJdLCJtYXBwaW5ncyI6InFCQUFvQix5QjtxQkFBYkEsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZyb20gJy4vdHJpbVJlc3VsdFRyYW5zZm9ybWVyJztcbiJdfQ==

/***/ }),

/***/ "./node_modules/common-tags/es/trimResultTransformer/trimResultTransformer.js":
/*!************************************************************************************!*\
  !*** ./node_modules/common-tags/es/trimResultTransformer/trimResultTransformer.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * TemplateTag transformer that trims whitespace on the end result of a tagged template
 * @param  {String} side = '' - The side of the string to trim. Can be 'start' or 'end' (alternatively 'left' or 'right')
 * @return {Object}           - a TemplateTag transformer
 */
var trimResultTransformer = function trimResultTransformer() {
  var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return {
    onEndResult: function onEndResult(endResult) {
      if (side === '') {
        return endResult.trim();
      }

      side = side.toLowerCase();

      if (side === 'start' || side === 'left') {
        return endResult.replace(/^\s*/, '');
      }

      if (side === 'end' || side === 'right') {
        return endResult.replace(/\s*$/, '');
      }

      throw new Error('Side not supported: ' + side);
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (trimResultTransformer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmltUmVzdWx0VHJhbnNmb3JtZXIvdHJpbVJlc3VsdFRyYW5zZm9ybWVyLmpzIl0sIm5hbWVzIjpbInRyaW1SZXN1bHRUcmFuc2Zvcm1lciIsInNpZGUiLCJvbkVuZFJlc3VsdCIsImVuZFJlc3VsdCIsInRyaW0iLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJFcnJvciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FBS0EsSUFBTUEsd0JBQXdCLFNBQXhCQSxxQkFBd0I7QUFBQSxNQUFDQyxJQUFELHVFQUFRLEVBQVI7QUFBQSxTQUFnQjtBQUM1Q0MsZUFENEMsdUJBQ2hDQyxTQURnQyxFQUNyQjtBQUNyQixVQUFJRixTQUFTLEVBQWIsRUFBaUI7QUFDZixlQUFPRSxVQUFVQyxJQUFWLEVBQVA7QUFDRDs7QUFFREgsYUFBT0EsS0FBS0ksV0FBTCxFQUFQOztBQUVBLFVBQUlKLFNBQVMsT0FBVCxJQUFvQkEsU0FBUyxNQUFqQyxFQUF5QztBQUN2QyxlQUFPRSxVQUFVRyxPQUFWLENBQWtCLE1BQWxCLEVBQTBCLEVBQTFCLENBQVA7QUFDRDs7QUFFRCxVQUFJTCxTQUFTLEtBQVQsSUFBa0JBLFNBQVMsT0FBL0IsRUFBd0M7QUFDdEMsZUFBT0UsVUFBVUcsT0FBVixDQUFrQixNQUFsQixFQUEwQixFQUExQixDQUFQO0FBQ0Q7O0FBRUQsWUFBTSxJQUFJQyxLQUFKLDBCQUFpQ04sSUFBakMsQ0FBTjtBQUNEO0FBakIyQyxHQUFoQjtBQUFBLENBQTlCOztBQW9CQSxlQUFlRCxxQkFBZiIsImZpbGUiOiJ0cmltUmVzdWx0VHJhbnNmb3JtZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlbXBsYXRlVGFnIHRyYW5zZm9ybWVyIHRoYXQgdHJpbXMgd2hpdGVzcGFjZSBvbiB0aGUgZW5kIHJlc3VsdCBvZiBhIHRhZ2dlZCB0ZW1wbGF0ZVxuICogQHBhcmFtICB7U3RyaW5nfSBzaWRlID0gJycgLSBUaGUgc2lkZSBvZiB0aGUgc3RyaW5nIHRvIHRyaW0uIENhbiBiZSAnc3RhcnQnIG9yICdlbmQnIChhbHRlcm5hdGl2ZWx5ICdsZWZ0JyBvciAncmlnaHQnKVxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgLSBhIFRlbXBsYXRlVGFnIHRyYW5zZm9ybWVyXG4gKi9cbmNvbnN0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lciA9IChzaWRlID0gJycpID0+ICh7XG4gIG9uRW5kUmVzdWx0KGVuZFJlc3VsdCkge1xuICAgIGlmIChzaWRlID09PSAnJykge1xuICAgICAgcmV0dXJuIGVuZFJlc3VsdC50cmltKCk7XG4gICAgfVxuXG4gICAgc2lkZSA9IHNpZGUudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmIChzaWRlID09PSAnc3RhcnQnIHx8IHNpZGUgPT09ICdsZWZ0Jykge1xuICAgICAgcmV0dXJuIGVuZFJlc3VsdC5yZXBsYWNlKC9eXFxzKi8sICcnKTtcbiAgICB9XG5cbiAgICBpZiAoc2lkZSA9PT0gJ2VuZCcgfHwgc2lkZSA9PT0gJ3JpZ2h0Jykge1xuICAgICAgcmV0dXJuIGVuZFJlc3VsdC5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYFNpZGUgbm90IHN1cHBvcnRlZDogJHtzaWRlfWApO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHRyaW1SZXN1bHRUcmFuc2Zvcm1lcjtcbiJdfQ==

/***/ }),

/***/ "./public/app/core/utils/CancelablePromise.ts":
/*!****************************************************!*\
  !*** ./public/app/core/utils/CancelablePromise.ts ***!
  \****************************************************/
/*! exports provided: makePromiseCancelable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makePromiseCancelable", function() { return makePromiseCancelable; });
// https://github.com/facebook/react/issues/5465
var makePromiseCancelable = function makePromiseCancelable(promise) {
  var hasCanceled_ = false;
  var wrappedPromise = new Promise(function (resolve, reject) {
    promise.then(function (val) {
      return hasCanceled_ ? reject({
        isCanceled: true
      }) : resolve(val);
    });
    promise.catch(function (error) {
      return hasCanceled_ ? reject({
        isCanceled: true
      }) : reject(error);
    });
  });
  return {
    promise: wrappedPromise,
    cancel: function cancel() {
      hasCanceled_ = true;
    }
  };
};

/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/annotations_query_ctrl.ts":
/*!****************************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/annotations_query_ctrl.ts ***!
  \****************************************************************************/
/*! exports provided: CloudWatchAnnotationsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudWatchAnnotationsQueryCtrl", function() { return CloudWatchAnnotationsQueryCtrl; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var CloudWatchAnnotationsQueryCtrl =
/*#__PURE__*/
function () {
  /** @ngInject */
  function CloudWatchAnnotationsQueryCtrl() {
    _classCallCheck(this, CloudWatchAnnotationsQueryCtrl);

    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.defaultsDeep(this.annotation, {
      namespace: '',
      metricName: '',
      expression: '',
      dimensions: {},
      region: 'default',
      id: '',
      alias: '',
      statistics: ['Average'],
      matchExact: true,
      prefixMatching: false,
      actionPrefix: '',
      alarmNamePrefix: ''
    });

    this.onChange = this.onChange.bind(this);
  }

  _createClass(CloudWatchAnnotationsQueryCtrl, [{
    key: "onChange",
    value: function onChange(query) {
      Object.assign(this.annotation, query);
    }
  }]);

  return CloudWatchAnnotationsQueryCtrl;
}();
CloudWatchAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';

/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/components/ConfigEditor.tsx":
/*!******************************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/components/ConfigEditor.tsx ***!
  \******************************************************************************/
/*! exports provided: ConfigEditor, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/features/plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");
/* harmony import */ var app_core_utils_CancelablePromise__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/utils/CancelablePromise */ "./public/app/core/utils/CancelablePromise.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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



var Select = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].Select,
    Input = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].Input;



var authProviderOptions = [{
  label: 'Access & secret key',
  value: 'keys'
}, {
  label: 'Credentials file',
  value: 'credentials'
}, {
  label: 'ARN',
  value: 'arn'
}];
var ConfigEditor =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ConfigEditor, _PureComponent);

  function ConfigEditor(props) {
    var _this;

    _classCallCheck(this, ConfigEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConfigEditor).call(this, props));
    _this.loadRegionsPromise = null;
    _this.state = {
      regions: []
    };
    return _this;
  }

  _createClass(ConfigEditor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadRegionsPromise = Object(app_core_utils_CancelablePromise__WEBPACK_IMPORTED_MODULE_4__["makePromiseCancelable"])(this.loadRegions());
      this.loadRegionsPromise.promise.catch(function (_ref) {
        var isCanceled = _ref.isCanceled;

        if (isCanceled) {
          console.warn('Cloud Watch ConfigEditor has unmounted, intialization was canceled');
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.loadRegionsPromise) {
        this.loadRegionsPromise.cancel();
      }
    }
  }, {
    key: "loadRegions",
    value: function () {
      var _loadRegions = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_3__["getDatasourceSrv"])().loadDatasource(this.props.options.name).then(function (ds) {
                  return ds.getRegions();
                }).then(function (regions) {
                  _this2.setState({
                    regions: regions.map(function (region) {
                      return {
                        value: region.value,
                        label: region.text
                      };
                    })
                  });
                }, function (err) {
                  var regions = ['af-south-1', 'ap-east-1', 'ap-northeast-1', 'ap-northeast-2', 'ap-northeast-3', 'ap-south-1', 'ap-southeast-1', 'ap-southeast-2', 'ca-central-1', 'cn-north-1', 'cn-northwest-1', 'eu-central-1', 'eu-north-1', 'eu-west-1', 'eu-west-2', 'eu-west-3', 'me-south-1', 'sa-east-1', 'us-east-1', 'us-east-2', 'us-gov-east-1', 'us-gov-west-1', 'us-iso-east-1', 'us-isob-east-1', 'us-west-1', 'us-west-2'];

                  _this2.setState({
                    regions: regions.map(function (region) {
                      return {
                        value: region,
                        label: region
                      };
                    })
                  }); // expected to fail when creating new datasource
                  // console.error('failed to get latest regions', err);

                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadRegions() {
        return _loadRegions.apply(this, arguments);
      }

      return loadRegions;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this,
          _options$secureJsonFi,
          _options$secureJsonFi2;

      var regions = this.state.regions;
      var options = this.props.options;
      var secureJsonData = options.secureJsonData || {};
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: "page-heading"
      }, "CloudWatch\u7EC6\u8282"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-14"
      }, "\u8EAB\u4EFD\u9A8C\u8BC1\u63D0\u4F9B\u8005"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Select, {
        className: "width-30",
        value: authProviderOptions.find(function (authProvider) {
          return authProvider.value === options.jsonData.authType;
        }),
        options: authProviderOptions,
        defaultValue: options.jsonData.authType,
        onChange: function onChange(option) {
          if (options.jsonData.authType === 'arn' && option.value !== 'arn') {
            delete _this3.props.options.jsonData.assumeRoleArn;
            delete _this3.props.options.jsonData.externalId;
          }

          Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceJsonDataOptionSelect"])(_this3.props, 'authType')(option);
        }
      }))), options.jsonData.authType === 'credentials' && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-14",
        tooltip: "\u5728\u301C/.aws/ credentials\u4E2D\u6307\u5B9A\u7684\u51ED\u636E\u914D\u7F6E\u6587\u4EF6\u540D\u79F0\uFF0C\u9ED8\u8BA4\u4FDD\u7559\u4E3A\u7A7A\u767D\u3002"
      }, "\u51ED\u8BC1\u914D\u7F6E\u6587\u4EF6\u540D\u79F0"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "width-30"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        className: "width-30",
        placeholder: "default",
        value: options.jsonData.database,
        onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceOption"])(this.props, 'database')
      })))), options.jsonData.authType === 'keys' && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, ((_options$secureJsonFi = options.secureJsonFields) === null || _options$secureJsonFi === void 0 ? void 0 : _options$secureJsonFi.accessKey) ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-14"
      }, "\u8BBF\u95EE\u5BC6\u94A5ID"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        className: "width-25",
        placeholder: "\u5DF2\u914D\u7F6E",
        disabled: true
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "max-width-30 gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        variant: "secondary",
        type: "button",
        onClick: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceResetOption"])(this.props, 'accessKey')
      }, "\u91CD\u7F6E")))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-14"
      }, "\u8BBF\u95EE\u5BC6\u94A5ID"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "width-30"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        className: "width-30",
        value: secureJsonData.accessKey || '',
        onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceSecureJsonDataOption"])(this.props, 'accessKey')
      })))), ((_options$secureJsonFi2 = options.secureJsonFields) === null || _options$secureJsonFi2 === void 0 ? void 0 : _options$secureJsonFi2.secretKey) ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-14"
      }, "\u79D8\u5BC6\u8BBF\u95EE\u5BC6\u94A5"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        className: "width-25",
        placeholder: "Configured",
        disabled: true
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "max-width-30 gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        variant: "secondary",
        type: "button",
        onClick: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceResetOption"])(this.props, 'secretKey')
      }, "\u91CD\u7F6E")))) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-14"
      }, "\u79D8\u5BC6\u8BBF\u95EE\u5BC6\u94A5"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "width-30"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        className: "width-30",
        value: secureJsonData.secretKey || '',
        onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceSecureJsonDataOption"])(this.props, 'secretKey')
      }))))), options.jsonData.authType === 'arn' && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-14",
        tooltip: "\u627F\u62C5\u89D2\u8272\u7684ARN"
      }, "\u627F\u62C5\u89D2\u8272ARN"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "width-30"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        className: "width-30",
        placeholder: "arn:aws:iam:*",
        value: options.jsonData.assumeRoleArn || '',
        onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceJsonDataOption"])(this.props, 'assumeRoleArn')
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-14",
        tooltip: "\u5982\u679C\u60A8\u5728\u53E6\u4E00\u4E2A\u4F7F\u7528\u5916\u90E8ID\u521B\u5EFA\u7684\u5E10\u6237\u4E2D\u62C5\u4EFB\u89D2\u8272\uFF0C\u8BF7\u5728\u6B64\u5904\u6307\u5B9A\u5916\u90E8ID\u3002"
      }, "\u5916\u90E8ID"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "width-30"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        className: "width-30",
        placeholder: "\u5916\u90E8ID",
        value: options.jsonData.externalId || '',
        onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceJsonDataOption"])(this.props, 'externalId')
      })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-14",
        tooltip: "\u6307\u5B9A\u533A\u57DF\uFF0C\u4F8B\u5982\u5BF9\u4E8E\u7F8E\u56FD\u897F\u90E8\uFF08\u4FC4\u52D2\u5188\u5DDE\uFF09\uFF0C\u8BF7\u4F7F\u7528\u201C us-west-2\u201D\u4F5C\u4E3A\u533A\u57DF\u3002"
      }, "\u9ED8\u8BA4\u533A\u57DF"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Select, {
        className: "width-30",
        value: regions.find(function (region) {
          return region.value === options.jsonData.defaultRegion;
        }),
        options: regions,
        defaultValue: options.jsonData.defaultRegion,
        onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceJsonDataOptionSelect"])(this.props, 'defaultRegion')
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        className: "width-14",
        tooltip: "\u81EA\u5B9A\u4E49\u6307\u6807\u7684\u547D\u540D\u7A7A\u95F4\u3002"
      }, "\u81EA\u5B9A\u4E49\u6307\u6807"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        className: "width-30",
        placeholder: "\u547D\u540D\u7A7A\u95F41,\u547D\u540D\u7A7A\u95F42",
        value: options.jsonData.customMetricsNamespaces || '',
        onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceJsonDataOption"])(this.props, 'customMetricsNamespaces')
      })))));
    }
  }]);

  return ConfigEditor;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (ConfigEditor);

/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/components/LogsCheatSheet.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/components/LogsCheatSheet.tsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LogsCheatSheet; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var common_tags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! common-tags */ "./node_modules/common-tags/es/index.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _syntax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../syntax */ "./public/app/plugins/datasource/cloudwatch/syntax.ts");
/* harmony import */ var _grafana_ui_src_slate_plugins_slate_prism__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui/src/slate-plugins/slate-prism */ "./packages/grafana-ui/src/slate-plugins/slate-prism/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _templateObject17() {
  var data = _taggedTemplateLiteral(["\n  margin-top: 5px;\n"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["fields requestId, latency |\n                           filter logType = \"RequestSummary\" |\n                           sort latency desc |\n                           limit 10"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["fields ispresent(resolverArn) as isRes |\n                           filter isRes |\n                           filter logType = \"Tracing\" |\n                           stats min(duration), max(duration), avg(duration) as avgDur by resolverArn |\n                           sort avgDur desc |\n                           limit 10"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["fields requestId, latency |\n                           filter logType = \"RequestSummary\" |\n                           sort latency desc |\n                           limit 10"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["fields ispresent(resolverArn) as isRes |\n                           stats count() as errorCount by resolverArn, logType |\n                           filter isRes and (logType = \"RequestMapping\" or logType = \"ResponseMapping\") and fieldInError |\n                           sort errorCount desc |\n                           limit 10"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["fields ispresent(resolverArn) as isRes |\n                           stats count() as invocationCount by resolverArn |\n                           filter isRes |\n                           filter logType = \"Tracing\" |\n                           sort invocationCount desc |\n                           limit 10"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["fields resolverArn, duration |\n                           filter logType = \"Tracing\" |\n                           sort duration desc |\n                           limit 10"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["fields ispresent(graphQLAPIId) as isApi |\n                           filter isApi |\n                           filter logType = \"RequestSummary\" |\n                           stats count() as statusCount by statusCode |\n                           sort statusCount desc"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["filter @message like /Exception/ |\n                           stats count(*) as exceptionCount by bin(5m) |\n                           sort exceptionCount desc"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["fields @timestamp, @message |\n                           sort @timestamp desc |\n                           limit 25"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["filter eventName=\"CreateUser\" |\n                           fields awsRegion, requestParameters.userName, responseElements.user.arn"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["filter eventSource=\"ec2.amazonaws.com\" |\n                           stats count(*) as eventCount by eventName, awsRegion |\n                           sort eventCount desc"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["filter action=\"REJECT\" |\n                           stats count(*) as numRejections by srcAddr |\n                           sort numRejections desc |\n                           limit 20"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["stats sum(bytes) as bytesTransferred by srcAddr, dstAddr |\n                           sort bytesTransferred desc |\n                           limit 10"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["filter @type = \"REPORT\" |\n                           fields @requestId, @billedDuration |\n                           sort by @billedDuration desc"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n        filter @type = \"REPORT\" |\n        stats max(@memorySize / 1024 / 1024) as provisonedMemoryMB,\n              min(@maxMemoryUsed / 1024 / 1024) as smallestMemoryRequestMB,\n              avg(@maxMemoryUsed / 1024 / 1024) as avgMemoryUsedMB,\n              max(@maxMemoryUsed / 1024 / 1024) as maxMemoryUsedMB,\n              provisonedMemoryMB - maxMemoryUsedMB as overProvisionedMB"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["filter @type = \"REPORT\" |\n                           stats avg(@duration), max(@duration), min(@duration) by bin(5m)"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var CLIQ_EXAMPLES = [{
  category: 'Lambda',
  examples: [{
    title: 'View latency statistics for 5-minute intervals',
    expr: Object(common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndents"])(_templateObject())
  }, {
    title: 'Determine the amount of overprovisioned memory',
    expr: Object(common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndent"])(_templateObject2())
  }, {
    title: 'Find the most expensive requests',
    expr: Object(common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndents"])(_templateObject3())
  }]
}, {
  category: 'VPC Flow Logs',
  examples: [{
    title: 'Average, min, and max byte transfers by source and destination IP addresses',
    expr: "stats avg(bytes), min(bytes), max(bytes) by srcAddr, dstAddr"
  }, {
    title: 'IP addresses using UDP transfer protocol',
    expr: 'filter protocol=17 | stats count(*) by srcAddr'
  }, {
    title: 'Top 10 byte transfers by source and destination IP addresses',
    expr: Object(common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndents"])(_templateObject4())
  }, {
    title: 'Top 20 source IP addresses with highest number of rejected requests',
    expr: Object(common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndents"])(_templateObject5())
  }]
}, {
  category: 'CloudTrail',
  examples: [{
    title: 'Number of log entries by service, event type, and region',
    expr: 'stats count(*) by eventSource, eventName, awsRegion'
  }, {
    title: 'Number of log entries by region and EC2 event type',
    expr: Object(common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndents"])(_templateObject6())
  }, {
    title: 'Regions, usernames, and ARNs of newly created IAM users',
    expr: Object(common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndents"])(_templateObject7())
  }]
}, {
  category: 'Common Queries',
  examples: [{
    title: '25 most recently added log events',
    expr: Object(common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndents"])(_templateObject8())
  }, {
    title: 'Number of exceptions logged every 5 minutes',
    expr: Object(common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndents"])(_templateObject9())
  }, {
    title: 'List of log events that are not exceptions',
    expr: 'fields @message | filter @message not like /Exception/'
  }]
}, {
  category: 'Route 53',
  examples: [{
    title: 'Number of requests received every 10  minutes by edge location',
    expr: 'stats count(*) by queryType, bin(10m)'
  }, {
    title: 'Number of unsuccessful requests by domain',
    expr: 'filter responseCode="SERVFAIL" | stats count(*) by queryName'
  }, {
    title: 'Number of requests received every 10  minutes by edge location',
    expr: 'stats count(*) as numRequests by resolverIp | sort numRequests desc | limit 10'
  }]
}, {
  category: 'AWS AppSync',
  examples: [{
    title: 'Number of unique HTTP status codes',
    expr: Object(common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndents"])(_templateObject10())
  }, {
    title: 'Top 10 resolvers with maximum latency',
    expr: Object(common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndents"])(_templateObject11())
  }, {
    title: 'Most frequently invoked resolvers',
    expr: Object(common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndents"])(_templateObject12())
  }, {
    title: 'Resolvers with most errors in mapping templates',
    expr: Object(common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndents"])(_templateObject13())
  }, {
    title: 'Field latency statistics',
    expr: Object(common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndents"])(_templateObject14())
  }, {
    title: 'Resolver latency statistics',
    expr: Object(common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndents"])(_templateObject15())
  }, {
    title: 'Top 10 requests with maximum latency',
    expr: Object(common_tags__WEBPACK_IMPORTED_MODULE_1__["stripIndents"])(_templateObject16())
  }]
}];

function renderHighlightedMarkup(code, keyPrefix) {
  var _Prism$languages$clou;

  var grammar = (_Prism$languages$clou = prismjs__WEBPACK_IMPORTED_MODULE_2___default.a.languages['cloudwatch']) !== null && _Prism$languages$clou !== void 0 ? _Prism$languages$clou : _syntax__WEBPACK_IMPORTED_MODULE_3__["default"];
  var tokens = Object(_grafana_ui_src_slate_plugins_slate_prism__WEBPACK_IMPORTED_MODULE_4__["flattenTokens"])(prismjs__WEBPACK_IMPORTED_MODULE_2___default.a.tokenize(code, grammar));
  var spans = tokens.filter(function (token) {
    return typeof token !== 'string';
  }).map(function (token, i) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "prism-token token ".concat(token.types.join(' '), " ").concat(token.aliases.join(' ')),
      key: "".concat(keyPrefix, "-token-").concat(i)
    }, token.content);
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "slate-query-field"
  }, spans);
}

var exampleCategory = Object(emotion__WEBPACK_IMPORTED_MODULE_5__["css"])(_templateObject17());

var LogsCheatSheet =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(LogsCheatSheet, _PureComponent);

  function LogsCheatSheet() {
    _classCallCheck(this, LogsCheatSheet);

    return _possibleConstructorReturn(this, _getPrototypeOf(LogsCheatSheet).apply(this, arguments));
  }

  _createClass(LogsCheatSheet, [{
    key: "onClickExample",
    value: function onClickExample(query) {
      this.props.onClickExample(query);
    }
  }, {
    key: "renderExpression",
    value: function renderExpression(expr, keyPrefix) {
      var _this = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cheat-sheet-item__example",
        key: expr,
        onClick: function onClick(e) {
          return _this.onClickExample({
            refId: 'A',
            expression: expr,
            queryMode: 'Logs',
            region: 'default',
            id: 'A'
          });
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", null, renderHighlightedMarkup(expr, keyPrefix)));
    }
  }, {
    key: "renderLogsCheatSheet",
    value: function renderLogsCheatSheet() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "CloudWatch Logs Cheat Sheet"), CLIQ_EXAMPLES.map(function (cat) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "cheat-sheet-item__title ".concat(Object(emotion__WEBPACK_IMPORTED_MODULE_5__["cx"])(exampleCategory))
        }, cat.category), cat.examples.map(function (item, i) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "cheat-sheet-item",
            key: "item-".concat(i)
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, item.title), _this2.renderExpression(item.expr, "item-".concat(i)));
        }));
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "CloudWatch Logs Cheat Sheet"), CLIQ_EXAMPLES.map(function (cat, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: "cat-".concat(i)
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "cheat-sheet-item__title ".concat(Object(emotion__WEBPACK_IMPORTED_MODULE_5__["cx"])(exampleCategory))
        }, cat.category), cat.examples.map(function (item, j) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "cheat-sheet-item",
            key: "item-".concat(j)
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h4", null, item.title), _this3.renderExpression(item.expr, "item-".concat(j)));
        }));
      }));
    }
  }]);

  return LogsCheatSheet;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);



/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/components/ThrottlingErrorMessage.tsx":
/*!****************************************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/components/ThrottlingErrorMessage.tsx ***!
  \****************************************************************************************/
/*! exports provided: ThrottlingErrorMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThrottlingErrorMessage", function() { return ThrottlingErrorMessage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var ThrottlingErrorMessage = function ThrottlingErrorMessage(_ref) {
  var region = _ref.region;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "Please visit the\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    target: "_blank",
    className: "text-link",
    href: "https://".concat(region, ".console.aws.amazon.com/servicequotas/home?region=").concat(region, "#!/services/monitoring/quotas/L-5E141212")
  }, "AWS Service Quotas console"), "\xA0to request a quota increase or see our\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    target: "_blank",
    className: "text-link",
    href: "https://grafana.com/docs/features/datasources/cloudwatch/#service-quotas"
  }, "documentation"), "\xA0to learn more.");
};

/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/datasource.ts":
/*!****************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/datasource.ts ***!
  \****************************************************************/
/*! exports provided: MAX_ATTEMPTS, CloudWatchDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_ATTEMPTS", function() { return MAX_ATTEMPTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudWatchDatasource", function() { return CloudWatchDatasource; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var app_core_copy_appNotification__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/copy/appNotification */ "./public/app/core/copy/appNotification.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var app_store_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/store/store */ "./public/app/store/store.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _components_ThrottlingErrorMessage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/ThrottlingErrorMessage */ "./public/app/plugins/datasource/cloudwatch/components/ThrottlingErrorMessage.tsx");
/* harmony import */ var _memoizedDebounce__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./memoizedDebounce */ "./public/app/plugins/datasource/cloudwatch/memoizedDebounce.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./types */ "./public/app/plugins/datasource/cloudwatch/types.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _language_provider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./language_provider */ "./public/app/plugins/datasource/cloudwatch/language_provider.ts");
/* harmony import */ var _aws_url__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./aws_url */ "./public/app/plugins/datasource/cloudwatch/aws_url.ts");
/* harmony import */ var _utils_rxjs_increasingInterval__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./utils/rxjs/increasingInterval */ "./public/app/plugins/datasource/cloudwatch/utils/rxjs/increasingInterval.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


















var TSDB_QUERY_ENDPOINT = '/api/tsdb/query'; // Constants also defined in tsdb/cloudwatch/cloudwatch.go

var LOG_IDENTIFIER_INTERNAL = '__log__grafana_internal__';
var LOGSTREAM_IDENTIFIER_INTERNAL = '__logstream__grafana_internal__';

var displayAlert = function displayAlert(datasourceName, region) {
  return app_store_store__WEBPACK_IMPORTED_MODULE_6__["store"].dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["notifyApp"])(Object(app_core_copy_appNotification__WEBPACK_IMPORTED_MODULE_4__["createErrorNotification"])("CloudWatch request limit reached in ".concat(region, " for data source ").concat(datasourceName), '', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ThrottlingErrorMessage__WEBPACK_IMPORTED_MODULE_9__["ThrottlingErrorMessage"], {
    region: region
  }, null))));
};

var displayCustomError = function displayCustomError(title, message) {
  return app_store_store__WEBPACK_IMPORTED_MODULE_6__["store"].dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["notifyApp"])(Object(app_core_copy_appNotification__WEBPACK_IMPORTED_MODULE_4__["createErrorNotification"])(title, message)));
};

var MAX_ATTEMPTS = 5;
var CloudWatchDatasource =
/*#__PURE__*/
function (_DataSourceApi) {
  CloudWatchDatasource.$inject = ["instanceSettings", "templateSrv", "timeSrv"];

  _inherits(CloudWatchDatasource, _DataSourceApi);

  /** @ngInject */
  function CloudWatchDatasource(instanceSettings, templateSrv, timeSrv) {
    var _this;

    _classCallCheck(this, CloudWatchDatasource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CloudWatchDatasource).call(this, instanceSettings));
    _this.templateSrv = templateSrv;
    _this.timeSrv = timeSrv;

    _this.handleLogQueries = function (logQueries, options) {
      var validLogQueries = logQueries.filter(function (item) {
        var _item$logGroupNames;

        return (_item$logGroupNames = item.logGroupNames) === null || _item$logGroupNames === void 0 ? void 0 : _item$logGroupNames.length;
      });

      if (logQueries.length > validLogQueries.length) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["of"])({
          data: [],
          error: {
            message: 'Log group is required'
          }
        });
      } // No valid targets, return the empty result to save a round trip.


      if (lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isEmpty(validLogQueries)) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["of"])({
          data: [],
          state: _grafana_data__WEBPACK_IMPORTED_MODULE_7__["LoadingState"].Done
        });
      }

      var queryParams = validLogQueries.map(function (target) {
        return {
          queryString: target.expression,
          refId: target.refId,
          logGroupNames: target.logGroupNames,
          region: _this.replace(_this.getActualRegion(target.region), options.scopedVars, true, 'region')
        };
      });
      return _this.makeLogActionRequest('StartQuery', queryParams, options.scopedVars).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["mergeMap"])(function (dataFrames) {
        return _this.logsQuery(dataFrames.map(function (dataFrame) {
          var _ref, _dataFrame$meta, _dataFrame$meta$custo;

          return {
            queryId: dataFrame.fields[0].values.get(0),
            region: (_ref = (_dataFrame$meta = dataFrame.meta) === null || _dataFrame$meta === void 0 ? void 0 : (_dataFrame$meta$custo = _dataFrame$meta.custom) === null || _dataFrame$meta$custo === void 0 ? void 0 : _dataFrame$meta$custo['Region']) !== null && _ref !== void 0 ? _ref : 'default',
            refId: dataFrame.refId,
            statsGroups: logQueries.find(function (target) {
              return target.refId === dataFrame.refId;
            }).statsGroups
          };
        }));
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["map"])(function (response) {
        return _this.addDataLinksToLogsResponse(response, options);
      }));
    };

    _this.handleMetricQueries = function (metricQueries, options) {
      var _options$range, _options$range2;

      var validMetricsQueries = metricQueries.filter(function (item) {
        var _item$expression;

        return !!item.region && !!item.namespace && !!item.metricName && !lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isEmpty(item.statistics) || ((_item$expression = item.expression) === null || _item$expression === void 0 ? void 0 : _item$expression.length) > 0;
      }).map(function (item) {
        item.region = _this.replace(_this.getActualRegion(item.region), options.scopedVars, true, 'region');
        item.namespace = _this.replace(item.namespace, options.scopedVars, true, 'namespace');
        item.metricName = _this.replace(item.metricName, options.scopedVars, true, 'metric name');
        item.dimensions = _this.convertDimensionFormat(item.dimensions, options.scopedVars);
        item.statistics = item.statistics.map(function (stat) {
          return _this.replace(stat, options.scopedVars, true, 'statistics');
        });
        item.period = String(_this.getPeriod(item, options)); // use string format for period in graph query, and alerting

        item.id = _this.templateSrv.replace(item.id, options.scopedVars);
        item.expression = _this.templateSrv.replace(item.expression, options.scopedVars); // valid ExtendedStatistics is like p90.00, check the pattern

        var hasInvalidStatistics = item.statistics.some(function (s) {
          if (s.indexOf('p') === 0) {
            var matches = /^p\d{2}(?:\.\d{1,2})?$/.exec(s);
            return !matches || matches[0] !== s;
          }

          return false;
        });

        if (hasInvalidStatistics) {
          throw {
            message: 'Invalid extended statistics'
          };
        }

        return _objectSpread({
          intervalMs: options.intervalMs,
          maxDataPoints: options.maxDataPoints,
          datasourceId: _this.id,
          type: 'timeSeriesQuery'
        }, item);
      }); // No valid targets, return the empty result to save a round trip.

      if (lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isEmpty(validMetricsQueries)) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["of"])({
          data: []
        });
      }

      var request = {
        from: options === null || options === void 0 ? void 0 : (_options$range = options.range) === null || _options$range === void 0 ? void 0 : _options$range.from.valueOf().toString(),
        to: options === null || options === void 0 ? void 0 : (_options$range2 = options.range) === null || _options$range2 === void 0 ? void 0 : _options$range2.to.valueOf().toString(),
        queries: validMetricsQueries
      };
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["from"])(_this.performTimeSeriesQuery(request, options.range));
    };

    _this.getLogRowContext =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(row) {
        var _ref3,
            _ref3$limit,
            limit,
            _ref3$direction,
            direction,
            logStreamField,
            logField,
            _iteratorNormalCompletion,
            _didIteratorError,
            _iteratorError,
            _iterator,
            _step,
            field,
            requestParams,
            dataFrames,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref3 = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, _ref3$limit = _ref3.limit, limit = _ref3$limit === void 0 ? 10 : _ref3$limit, _ref3$direction = _ref3.direction, direction = _ref3$direction === void 0 ? 'BACKWARD' : _ref3$direction;
                logStreamField = null;
                logField = null;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 6;
                _iterator = row.dataFrame.fields[Symbol.iterator]();

              case 8:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 23;
                  break;
                }

                field = _step.value;

                if (!(field.name === LOGSTREAM_IDENTIFIER_INTERNAL)) {
                  _context.next = 16;
                  break;
                }

                logStreamField = field;

                if (!(logField !== null)) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("break", 23);

              case 14:
                _context.next = 20;
                break;

              case 16:
                if (!(field.name === LOG_IDENTIFIER_INTERNAL)) {
                  _context.next = 20;
                  break;
                }

                logField = field;

                if (!(logStreamField !== null)) {
                  _context.next = 20;
                  break;
                }

                return _context.abrupt("break", 23);

              case 20:
                _iteratorNormalCompletion = true;
                _context.next = 8;
                break;

              case 23:
                _context.next = 29;
                break;

              case 25:
                _context.prev = 25;
                _context.t0 = _context["catch"](6);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 29:
                _context.prev = 29;
                _context.prev = 30;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 32:
                _context.prev = 32;

                if (!_didIteratorError) {
                  _context.next = 35;
                  break;
                }

                throw _iteratorError;

              case 35:
                return _context.finish(32);

              case 36:
                return _context.finish(29);

              case 37:
                requestParams = {
                  limit: limit,
                  startFromHead: direction !== 'BACKWARD',
                  logGroupName: parseLogGroupName(logField.values.get(row.rowIndex)),
                  logStreamName: logStreamField.values.get(row.rowIndex)
                };

                if (direction === 'BACKWARD') {
                  requestParams.endTime = row.timeEpochMs;
                } else {
                  requestParams.startTime = row.timeEpochMs;
                }

                _context.next = 41;
                return _this.makeLogActionRequest('GetLogEvents', [requestParams]).toPromise();

              case 41:
                dataFrames = _context.sent;
                return _context.abrupt("return", {
                  data: dataFrames
                });

              case 43:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[6, 25, 29, 37], [30,, 32, 36]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.getTargetsByQueryMode = function (targets) {
      var logQueries = [];
      var metricsQueries = [];
      targets.forEach(function (query) {
        var _query$queryMode;

        var mode = (_query$queryMode = query.queryMode) !== null && _query$queryMode !== void 0 ? _query$queryMode : 'Metrics';

        if (mode === 'Logs') {
          logQueries.push(query);
        } else {
          metricsQueries.push(query);
        }
      });
      return {
        logQueries: logQueries,
        metricsQueries: metricsQueries
      };
    };

    _this.type = 'cloudwatch';
    _this.proxyUrl = instanceSettings.url;
    _this.defaultRegion = instanceSettings.jsonData.defaultRegion;
    _this.datasourceName = instanceSettings.name;
    _this.standardStatistics = ['Average', 'Maximum', 'Minimum', 'Sum', 'SampleCount'];
    _this.debouncedAlert = Object(_memoizedDebounce__WEBPACK_IMPORTED_MODULE_10__["default"])(displayAlert, app_types__WEBPACK_IMPORTED_MODULE_5__["AppNotificationTimeout"].Error);
    _this.debouncedCustomAlert = Object(_memoizedDebounce__WEBPACK_IMPORTED_MODULE_10__["default"])(displayCustomError, app_types__WEBPACK_IMPORTED_MODULE_5__["AppNotificationTimeout"].Error);
    _this.logQueries = {};
    _this.languageProvider = new _language_provider__WEBPACK_IMPORTED_MODULE_14__["CloudWatchLanguageProvider"](_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CloudWatchDatasource, [{
    key: "query",
    value: function query(options) {
      options = angular__WEBPACK_IMPORTED_MODULE_1___default.a.copy(options);
      var queries = options.targets.filter(function (item) {
        return item.id !== '' || item.hide !== true;
      });

      var _this$getTargetsByQue = this.getTargetsByQueryMode(queries),
          logQueries = _this$getTargetsByQue.logQueries,
          metricsQueries = _this$getTargetsByQue.metricsQueries;

      var dataQueryResponses = [];

      if (logQueries.length > 0) {
        dataQueryResponses.push(this.handleLogQueries(logQueries, options));
      }

      if (metricsQueries.length > 0) {
        dataQueryResponses.push(this.handleMetricQueries(metricsQueries, options));
      } // No valid targets, return the empty result to save a round trip.


      if (lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isEmpty(dataQueryResponses)) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["of"])({
          data: [],
          state: _grafana_data__WEBPACK_IMPORTED_MODULE_7__["LoadingState"].Done
        });
      }

      return rxjs__WEBPACK_IMPORTED_MODULE_12__["merge"].apply(void 0, dataQueryResponses);
    }
  }, {
    key: "logsQuery",
    value: function logsQuery(queryParams) {
      var _this2 = this;

      this.logQueries = {};
      queryParams.forEach(function (param) {
        var _ref4, _ref5, _param$statsGroups;

        _this2.logQueries[param.refId] = {
          id: param.queryId,
          region: param.region,
          statsQuery: (_ref4 = ((_ref5 = (_param$statsGroups = param.statsGroups) === null || _param$statsGroups === void 0 ? void 0 : _param$statsGroups.length) !== null && _ref5 !== void 0 ? _ref5 : 0) > 0) !== null && _ref4 !== void 0 ? _ref4 : false
        };
      });
      var dataFrames = Object(_utils_rxjs_increasingInterval__WEBPACK_IMPORTED_MODULE_16__["increasingInterval"])({
        startPeriod: 100,
        endPeriod: 1000,
        step: 300
      }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["concatMap"])(function (_) {
        return _this2.makeLogActionRequest('GetQueryResults', queryParams);
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["repeat"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["share"])());
      var consecutiveFailedAttempts = dataFrames.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["scan"])(function (_ref6, frames) {
        var failures = _ref6.failures,
            prevRecordsMatched = _ref6.prevRecordsMatched;
        failures++;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = frames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _frame$meta, _frame$meta$stats, _frame$meta$stats$fin, _prevRecordsMatched;

            var frame = _step2.value;
            var recordsMatched = (_frame$meta = frame.meta) === null || _frame$meta === void 0 ? void 0 : (_frame$meta$stats = _frame$meta.stats) === null || _frame$meta$stats === void 0 ? void 0 : (_frame$meta$stats$fin = _frame$meta$stats.find(function (stat) {
              return stat.displayName === 'Records matched';
            })) === null || _frame$meta$stats$fin === void 0 ? void 0 : _frame$meta$stats$fin.value;

            if (recordsMatched > ((_prevRecordsMatched = prevRecordsMatched[frame.refId]) !== null && _prevRecordsMatched !== void 0 ? _prevRecordsMatched : 0)) {
              failures = 0;
            }

            prevRecordsMatched[frame.refId] = recordsMatched;
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
          failures: failures,
          prevRecordsMatched: prevRecordsMatched
        };
      }, {
        failures: 0,
        prevRecordsMatched: {}
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["map"])(function (_ref7) {
        var failures = _ref7.failures;
        return failures;
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["share"])());
      var queryResponse = Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["zip"])(dataFrames, consecutiveFailedAttempts).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["tap"])(function (_ref8) {
        var _ref9 = _slicedToArray(_ref8, 1),
            dataFrames = _ref9[0];

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = dataFrames[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _frame$meta2, _frame$meta2$custom;

            var frame = _step3.value;

            if ([_types__WEBPACK_IMPORTED_MODULE_11__["CloudWatchLogsQueryStatus"].Complete, _types__WEBPACK_IMPORTED_MODULE_11__["CloudWatchLogsQueryStatus"].Cancelled, _types__WEBPACK_IMPORTED_MODULE_11__["CloudWatchLogsQueryStatus"].Failed].includes((_frame$meta2 = frame.meta) === null || _frame$meta2 === void 0 ? void 0 : (_frame$meta2$custom = _frame$meta2.custom) === null || _frame$meta2$custom === void 0 ? void 0 : _frame$meta2$custom['Status']) && _this2.logQueries.hasOwnProperty(frame.refId)) {
              delete _this2.logQueries[frame.refId];
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
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["map"])(function (_ref10) {
        var _ref11 = _slicedToArray(_ref10, 2),
            dataFrames = _ref11[0],
            failedAttempts = _ref11[1];

        if (failedAttempts >= MAX_ATTEMPTS) {
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = dataFrames[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var frame = _step4.value;

              lodash__WEBPACK_IMPORTED_MODULE_2___default.a.set(frame, 'meta.custom.Status', _types__WEBPACK_IMPORTED_MODULE_11__["CloudWatchLogsQueryStatus"].Cancelled);
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

        return {
          data: dataFrames,
          key: 'test-key',
          state: dataFrames.every(function (dataFrame) {
            var _dataFrame$meta2, _dataFrame$meta2$cust;

            return [_types__WEBPACK_IMPORTED_MODULE_11__["CloudWatchLogsQueryStatus"].Complete, _types__WEBPACK_IMPORTED_MODULE_11__["CloudWatchLogsQueryStatus"].Cancelled, _types__WEBPACK_IMPORTED_MODULE_11__["CloudWatchLogsQueryStatus"].Failed].includes((_dataFrame$meta2 = dataFrame.meta) === null || _dataFrame$meta2 === void 0 ? void 0 : (_dataFrame$meta2$cust = _dataFrame$meta2.custom) === null || _dataFrame$meta2$cust === void 0 ? void 0 : _dataFrame$meta2$cust['Status']);
          }) ? _grafana_data__WEBPACK_IMPORTED_MODULE_7__["LoadingState"].Done : _grafana_data__WEBPACK_IMPORTED_MODULE_7__["LoadingState"].Loading,
          error: failedAttempts >= MAX_ATTEMPTS ? {
            message: "error: query timed out after ".concat(MAX_ATTEMPTS, " attempts"),
            type: _grafana_data__WEBPACK_IMPORTED_MODULE_7__["DataQueryErrorType"].Timeout
          } : undefined
        };
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeWhile"])(function (_ref12) {
        var state = _ref12.state;
        return state !== _grafana_data__WEBPACK_IMPORTED_MODULE_7__["LoadingState"].Error && state !== _grafana_data__WEBPACK_IMPORTED_MODULE_7__["LoadingState"].Done;
      }, true));
      return withTeardown(queryResponse, function () {
        return _this2.stopQueries();
      });
    }
  }, {
    key: "addDataLinksToLogsResponse",
    value: function addDataLinksToLogsResponse(response, options) {
      var _this3 = this;

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        var _loop = function _loop() {
          var _ref13, _curTarget$logGroupNa;

          var dataFrame = _step5.value;

          var range = _this3.timeSrv.timeRange();

          var start = range.from.toISOString();
          var end = range.to.toISOString();
          var curTarget = options.targets.find(function (target) {
            return target.refId === dataFrame.refId;
          });
          var interpolatedGroups = (_ref13 = (_curTarget$logGroupNa = curTarget.logGroupNames) === null || _curTarget$logGroupNa === void 0 ? void 0 : _curTarget$logGroupNa.map(function (logGroup) {
            return _this3.replace(logGroup, options.scopedVars, true, 'log groups');
          })) !== null && _ref13 !== void 0 ? _ref13 : [];
          var urlProps = {
            end: end,
            start: start,
            timeType: 'ABSOLUTE',
            tz: 'UTC',
            editorString: curTarget.expression ? _this3.replace(curTarget.expression, options.scopedVars, true) : '',
            isLiveTail: false,
            source: interpolatedGroups
          };
          var encodedUrl = Object(_aws_url__WEBPACK_IMPORTED_MODULE_15__["encodeUrl"])(urlProps, _this3.getActualRegion(_this3.replace(curTarget.region, options.scopedVars, true, 'region')));
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = dataFrame.fields[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var field = _step6.value;
              field.config.links = [{
                url: encodedUrl,
                title: 'View in CloudWatch console',
                targetBlank: true
              }];
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
        };

        for (var _iterator5 = response.data[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          _loop();
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

      return response;
    }
  }, {
    key: "stopQueries",
    value: function stopQueries() {
      var _this4 = this;

      if (Object.keys(this.logQueries).length > 0) {
        this.makeLogActionRequest('StopQuery', Object.values(this.logQueries).map(function (logQuery) {
          return {
            queryId: logQuery.id,
            region: logQuery.region
          };
        }), undefined, false).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["finalize"])(function () {
          _this4.logQueries = {};
        }));
      }
    }
  }, {
    key: "describeLogGroups",
    value: function () {
      var _describeLogGroups = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(params) {
        var _ref14, _dataFrames$, _dataFrames$$fields$;

        var dataFrames, logGroupNames;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.makeLogActionRequest('DescribeLogGroups', [params]).toPromise();

              case 2:
                dataFrames = _context2.sent;
                logGroupNames = (_ref14 = (_dataFrames$ = dataFrames[0]) === null || _dataFrames$ === void 0 ? void 0 : (_dataFrames$$fields$ = _dataFrames$.fields[0]) === null || _dataFrames$$fields$ === void 0 ? void 0 : _dataFrames$$fields$.values.toArray()) !== null && _ref14 !== void 0 ? _ref14 : [];
                return _context2.abrupt("return", logGroupNames);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function describeLogGroups(_x2) {
        return _describeLogGroups.apply(this, arguments);
      }

      return describeLogGroups;
    }()
  }, {
    key: "getLogGroupFields",
    value: function () {
      var _getLogGroupFields = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(params) {
        var _fieldNames$map;

        var dataFrames, fieldNames, fieldPercentages, getLogGroupFieldsResponse;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.makeLogActionRequest('GetLogGroupFields', [params]).toPromise();

              case 2:
                dataFrames = _context3.sent;
                fieldNames = dataFrames[0].fields[0].values.toArray();
                fieldPercentages = dataFrames[0].fields[1].values.toArray();
                getLogGroupFieldsResponse = {
                  logGroupFields: (_fieldNames$map = fieldNames.map(function (val, i) {
                    return {
                      name: val,
                      percent: fieldPercentages[i]
                    };
                  })) !== null && _fieldNames$map !== void 0 ? _fieldNames$map : []
                };
                return _context3.abrupt("return", getLogGroupFieldsResponse);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getLogGroupFields(_x3) {
        return _getLogGroupFields.apply(this, arguments);
      }

      return getLogGroupFields;
    }()
  }, {
    key: "getPeriod",
    value: function getPeriod(target, options) {
      var period = this.templateSrv.replace(target.period, options.scopedVars);

      if (period && period.toLowerCase() !== 'auto') {
        if (/^\d+$/.test(period)) {
          period = parseInt(period, 10);
        } else {
          period = _grafana_data__WEBPACK_IMPORTED_MODULE_7__["rangeUtil"].intervalToSeconds(period);
        }

        if (period < 1) {
          period = 1;
        }
      }

      return period || '';
    }
  }, {
    key: "buildCloudwatchConsoleUrl",
    value: function buildCloudwatchConsoleUrl(_ref15, start, end, title, gmdMeta) {
      var region = _ref15.region,
          namespace = _ref15.namespace,
          metricName = _ref15.metricName,
          dimensions = _ref15.dimensions,
          statistics = _ref15.statistics,
          expression = _ref15.expression;
      region = this.getActualRegion(region);
      var conf = {
        view: 'timeSeries',
        stacked: false,
        title: title,
        start: start,
        end: end,
        region: region
      };
      var isSearchExpression = gmdMeta && gmdMeta.length && gmdMeta.every(function (_ref16) {
        var expression = _ref16.Expression;
        return /SEARCH().*/.test(expression);
      });
      var isMathExpression = !isSearchExpression && expression;

      if (isMathExpression) {
        return '';
      }

      if (isSearchExpression) {
        var metrics = gmdMeta && gmdMeta.length ? gmdMeta.map(function (_ref17) {
          var expression = _ref17.Expression;
          return {
            expression: expression
          };
        }) : [{
          expression: expression
        }];
        conf = _objectSpread({}, conf, {
          metrics: metrics
        });
      } else {
        conf = _objectSpread({}, conf, {
          metrics: _toConsumableArray(statistics.map(function (stat) {
            return [namespace, metricName].concat(_toConsumableArray(Object.entries(dimensions).reduce(function (acc, _ref18) {
              var _ref19 = _slicedToArray(_ref18, 2),
                  key = _ref19[0],
                  value = _ref19[1];

              return [].concat(_toConsumableArray(acc), [key, value[0]]);
            }, [])), [{
              stat: stat,
              period: gmdMeta.length ? gmdMeta[0].Period : 60
            }]);
          }))
        });
      }

      return "https://".concat(region, ".console.aws.amazon.com/cloudwatch/deeplink.js?region=").concat(region, "#metricsV2:graph=").concat(encodeURIComponent(JSON.stringify(conf)));
    }
  }, {
    key: "performTimeSeriesQuery",
    value: function performTimeSeriesQuery(request, _ref20) {
      var _this5 = this;

      var from = _ref20.from,
          to = _ref20.to;
      return this.awsRequest(TSDB_QUERY_ENDPOINT, request).then(function (res) {
        if (!res.results) {
          return {
            data: []
          };
        }

        return Object.values(request.queries).reduce(function (_ref21, queryRequest) {
          var data = _ref21.data,
              error = _ref21.error;
          var queryResult = res.results[queryRequest.refId];

          if (!queryResult) {
            return {
              data: data,
              error: error
            };
          }

          var link = _this5.buildCloudwatchConsoleUrl(queryRequest, from.toISOString(), to.toISOString(), queryRequest.refId, queryResult.meta.gmdMeta);

          return {
            error: error || queryResult.error ? {
              message: queryResult.error
            } : null,
            data: [].concat(_toConsumableArray(data), _toConsumableArray(queryResult.series.map(function (_ref22) {
              var name = _ref22.name,
                  points = _ref22.points;
              var dataFrame = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_7__["toDataFrame"])({
                target: name,
                datapoints: points,
                refId: queryRequest.refId,
                meta: queryResult.meta
              });

              if (link) {
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                  for (var _iterator7 = dataFrame.fields[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var field = _step7.value;
                    field.config.links = [{
                      url: link,
                      title: 'View in CloudWatch console',
                      targetBlank: true
                    }];
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
              }

              return dataFrame;
            })))
          };
        }, {
          data: [],
          error: null
        });
      }).catch(function () {
        var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          data: {
            error: ''
          }
        };

        if (/^Throttling:.*/.test(err.data.message)) {
          var failedRedIds = Object.keys(err.data.results);
          var regionsAffected = Object.values(request.queries).reduce(function (res, _ref23) {
            var refId = _ref23.refId,
                region = _ref23.region;
            return refId && !failedRedIds.includes(refId) || res.includes(region) ? res : [].concat(_toConsumableArray(res), [region]);
          }, []);
          regionsAffected.forEach(function (region) {
            return _this5.debouncedAlert(_this5.datasourceName, _this5.getActualRegion(region));
          });
        }

        if (err.data && err.data.message === 'Metric request error' && err.data.error) {
          err.data.message = err.data.error;
        }

        throw err;
      });
    }
  }, {
    key: "transformSuggestDataFromTable",
    value: function transformSuggestDataFromTable(suggestData) {
      return suggestData.results['metricFindQuery'].tables[0].rows.map(function (_ref24) {
        var _ref25 = _slicedToArray(_ref24, 2),
            text = _ref25[0],
            value = _ref25[1];

        return {
          text: text,
          value: value,
          label: value
        };
      });
    }
  }, {
    key: "doMetricQueryRequest",
    value: function doMetricQueryRequest(subtype, parameters) {
      var _this6 = this;

      var range = this.timeSrv.timeRange();
      return this.awsRequest(TSDB_QUERY_ENDPOINT, {
        from: range.from.valueOf().toString(),
        to: range.to.valueOf().toString(),
        queries: [_objectSpread({
          refId: 'metricFindQuery',
          intervalMs: 1,
          // dummy
          maxDataPoints: 1,
          // dummy
          datasourceId: this.id,
          type: 'metricFindQuery',
          subtype: subtype
        }, parameters)]
      }).then(function (r) {
        return _this6.transformSuggestDataFromTable(r);
      });
    }
  }, {
    key: "makeLogActionRequest",
    value: function makeLogActionRequest(subtype, queryParams, scopedVars) {
      var _this7 = this;

      var makeReplacements = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var range = this.timeSrv.timeRange();
      var requestParams = {
        from: range.from.valueOf().toString(),
        to: range.to.valueOf().toString(),
        queries: queryParams.map(function (param) {
          return _objectSpread({
            refId: 'A',
            intervalMs: 1,
            // dummy
            maxDataPoints: 1,
            // dummy
            datasourceId: _this7.id,
            type: 'logAction',
            subtype: subtype
          }, param);
        })
      };

      if (makeReplacements) {
        requestParams.queries.forEach(function (query) {
          if (query.hasOwnProperty('queryString')) {
            query.queryString = _this7.replace(query.queryString, scopedVars, true);
          }

          query.region = _this7.replace(query.region, scopedVars, true, 'region');
          query.region = _this7.getActualRegion(query.region); // interpolate log groups

          if (query.logGroupNames) {
            query.logGroupNames = query.logGroupNames.map(function (logGroup) {
              return _this7.replace(logGroup, scopedVars, true, 'log groups');
            });
          }
        });
      }

      var resultsToDataFrames = function resultsToDataFrames(val) {
        return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_8__["toDataQueryResponse"])(val).data || [];
      };

      return Object(rxjs__WEBPACK_IMPORTED_MODULE_12__["from"])(this.awsRequest(TSDB_QUERY_ENDPOINT, requestParams)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["map"])(function (response) {
        return resultsToDataFrames({
          data: response
        });
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["catchError"])(function (err) {
        var _err$data;

        if ((_err$data = err.data) === null || _err$data === void 0 ? void 0 : _err$data.error) {
          throw err.data.error;
        }

        throw err;
      }));
    }
  }, {
    key: "getRegions",
    value: function getRegions() {
      return this.doMetricQueryRequest('regions', null).then(function (regions) {
        return [{
          label: 'default',
          value: 'default',
          text: 'default'
        }].concat(_toConsumableArray(regions));
      });
    }
  }, {
    key: "getNamespaces",
    value: function getNamespaces() {
      return this.doMetricQueryRequest('namespaces', null);
    }
  }, {
    key: "getMetrics",
    value: function () {
      var _getMetrics = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(namespace, region) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (namespace) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", []);

              case 2:
                return _context4.abrupt("return", this.doMetricQueryRequest('metrics', {
                  region: this.templateSrv.replace(this.getActualRegion(region)),
                  namespace: this.templateSrv.replace(namespace)
                }));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getMetrics(_x4, _x5) {
        return _getMetrics.apply(this, arguments);
      }

      return getMetrics;
    }()
  }, {
    key: "getDimensionKeys",
    value: function () {
      var _getDimensionKeys = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(namespace, region) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (namespace) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", []);

              case 2:
                return _context5.abrupt("return", this.doMetricQueryRequest('dimension_keys', {
                  region: this.templateSrv.replace(this.getActualRegion(region)),
                  namespace: this.templateSrv.replace(namespace)
                }));

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getDimensionKeys(_x6, _x7) {
        return _getDimensionKeys.apply(this, arguments);
      }

      return getDimensionKeys;
    }()
  }, {
    key: "getDimensionValues",
    value: function () {
      var _getDimensionValues = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(region, namespace, metricName, dimensionKey, filterDimensions) {
        var values;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(!namespace || !metricName)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", []);

              case 2:
                _context6.next = 4;
                return this.doMetricQueryRequest('dimension_values', {
                  region: this.templateSrv.replace(this.getActualRegion(region)),
                  namespace: this.templateSrv.replace(namespace),
                  metricName: this.templateSrv.replace(metricName.trim()),
                  dimensionKey: this.templateSrv.replace(dimensionKey),
                  dimensions: this.convertDimensionFormat(filterDimensions, {})
                });

              case 4:
                values = _context6.sent;
                return _context6.abrupt("return", values);

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getDimensionValues(_x8, _x9, _x10, _x11, _x12) {
        return _getDimensionValues.apply(this, arguments);
      }

      return getDimensionValues;
    }()
  }, {
    key: "getEbsVolumeIds",
    value: function getEbsVolumeIds(region, instanceId) {
      return this.doMetricQueryRequest('ebs_volume_ids', {
        region: this.templateSrv.replace(this.getActualRegion(region)),
        instanceId: this.templateSrv.replace(instanceId)
      });
    }
  }, {
    key: "getEc2InstanceAttribute",
    value: function getEc2InstanceAttribute(region, attributeName, filters) {
      return this.doMetricQueryRequest('ec2_instance_attribute', {
        region: this.templateSrv.replace(this.getActualRegion(region)),
        attributeName: this.templateSrv.replace(attributeName),
        filters: filters
      });
    }
  }, {
    key: "getResourceARNs",
    value: function getResourceARNs(region, resourceType, tags) {
      return this.doMetricQueryRequest('resource_arns', {
        region: this.templateSrv.replace(this.getActualRegion(region)),
        resourceType: this.templateSrv.replace(resourceType),
        tags: tags
      });
    }
  }, {
    key: "metricFindQuery",
    value: function () {
      var _metricFindQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(query) {
        var region, namespace, metricName, filterJson, regionQuery, namespaceQuery, metricNameQuery, dimensionKeysQuery, dimensionValuesQuery, dimensionKey, ebsVolumeIdsQuery, instanceId, ec2InstanceAttributeQuery, targetAttributeName, resourceARNsQuery, resourceType, tagsJSON, statsQuery;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                regionQuery = query.match(/^regions\(\)/);

                if (!regionQuery) {
                  _context7.next = 3;
                  break;
                }

                return _context7.abrupt("return", this.getRegions());

              case 3:
                namespaceQuery = query.match(/^namespaces\(\)/);

                if (!namespaceQuery) {
                  _context7.next = 6;
                  break;
                }

                return _context7.abrupt("return", this.getNamespaces());

              case 6:
                metricNameQuery = query.match(/^metrics\(([^\)]+?)(,\s?([^,]+?))?\)/);

                if (!metricNameQuery) {
                  _context7.next = 11;
                  break;
                }

                namespace = metricNameQuery[1];
                region = metricNameQuery[3];
                return _context7.abrupt("return", this.getMetrics(namespace, region));

              case 11:
                dimensionKeysQuery = query.match(/^dimension_keys\(([^\)]+?)(,\s?([^,]+?))?\)/);

                if (!dimensionKeysQuery) {
                  _context7.next = 16;
                  break;
                }

                namespace = dimensionKeysQuery[1];
                region = dimensionKeysQuery[3];
                return _context7.abrupt("return", this.getDimensionKeys(namespace, region));

              case 16:
                dimensionValuesQuery = query.match(/^dimension_values\(([^,]+?),\s?([^,]+?),\s?([^,]+?),\s?([^,]+?)(,\s?(.+))?\)/);

                if (!dimensionValuesQuery) {
                  _context7.next = 25;
                  break;
                }

                region = dimensionValuesQuery[1];
                namespace = dimensionValuesQuery[2];
                metricName = dimensionValuesQuery[3];
                dimensionKey = dimensionValuesQuery[4];
                filterJson = {};

                if (dimensionValuesQuery[6]) {
                  filterJson = JSON.parse(this.templateSrv.replace(dimensionValuesQuery[6]));
                }

                return _context7.abrupt("return", this.getDimensionValues(region, namespace, metricName, dimensionKey, filterJson));

              case 25:
                ebsVolumeIdsQuery = query.match(/^ebs_volume_ids\(([^,]+?),\s?([^,]+?)\)/);

                if (!ebsVolumeIdsQuery) {
                  _context7.next = 30;
                  break;
                }

                region = ebsVolumeIdsQuery[1];
                instanceId = ebsVolumeIdsQuery[2];
                return _context7.abrupt("return", this.getEbsVolumeIds(region, instanceId));

              case 30:
                ec2InstanceAttributeQuery = query.match(/^ec2_instance_attribute\(([^,]+?),\s?([^,]+?),\s?(.+?)\)/);

                if (!ec2InstanceAttributeQuery) {
                  _context7.next = 36;
                  break;
                }

                region = ec2InstanceAttributeQuery[1];
                targetAttributeName = ec2InstanceAttributeQuery[2];
                filterJson = JSON.parse(this.templateSrv.replace(ec2InstanceAttributeQuery[3]));
                return _context7.abrupt("return", this.getEc2InstanceAttribute(region, targetAttributeName, filterJson));

              case 36:
                resourceARNsQuery = query.match(/^resource_arns\(([^,]+?),\s?([^,]+?),\s?(.+?)\)/);

                if (!resourceARNsQuery) {
                  _context7.next = 42;
                  break;
                }

                region = resourceARNsQuery[1];
                resourceType = resourceARNsQuery[2];
                tagsJSON = JSON.parse(this.templateSrv.replace(resourceARNsQuery[3]));
                return _context7.abrupt("return", this.getResourceARNs(region, resourceType, tagsJSON));

              case 42:
                statsQuery = query.match(/^statistics\(\)/);

                if (!statsQuery) {
                  _context7.next = 45;
                  break;
                }

                return _context7.abrupt("return", this.standardStatistics.map(function (s) {
                  return {
                    value: s,
                    label: s,
                    text: s
                  };
                }));

              case 45:
                return _context7.abrupt("return", Promise.resolve([]));

              case 46:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function metricFindQuery(_x13) {
        return _metricFindQuery.apply(this, arguments);
      }

      return metricFindQuery;
    }()
  }, {
    key: "annotationQuery",
    value: function annotationQuery(options) {
      var _this8 = this;

      var annotation = options.annotation;
      var statistics = annotation.statistics.map(function (s) {
        return _this8.templateSrv.replace(s);
      });
      var defaultPeriod = annotation.prefixMatching ? '' : '300';
      var period = annotation.period || defaultPeriod;
      period = parseInt(period, 10);
      var parameters = {
        prefixMatching: annotation.prefixMatching,
        region: this.templateSrv.replace(this.getActualRegion(annotation.region)),
        namespace: this.templateSrv.replace(annotation.namespace),
        metricName: this.templateSrv.replace(annotation.metricName),
        dimensions: this.convertDimensionFormat(annotation.dimensions, {}),
        statistics: statistics,
        period: period,
        actionPrefix: annotation.actionPrefix || '',
        alarmNamePrefix: annotation.alarmNamePrefix || ''
      };
      return this.awsRequest(TSDB_QUERY_ENDPOINT, {
        from: options.range.from.valueOf().toString(),
        to: options.range.to.valueOf().toString(),
        queries: [_objectSpread({
          refId: 'annotationQuery',
          datasourceId: this.id,
          type: 'annotationQuery'
        }, parameters)]
      }).then(function (r) {
        return r.results['annotationQuery'].tables[0].rows.map(function (v) {
          return {
            annotation: annotation,
            time: Date.parse(v[0]),
            title: v[1],
            tags: [v[2]],
            text: v[3]
          };
        });
      });
    }
  }, {
    key: "targetContainsTemplate",
    value: function targetContainsTemplate(target) {
      var _target$logGroupNames,
          _this9 = this;

      return this.templateSrv.variableExists(target.region) || this.templateSrv.variableExists(target.namespace) || this.templateSrv.variableExists(target.metricName) || this.templateSrv.variableExists(target.expression) || ((_target$logGroupNames = target.logGroupNames) === null || _target$logGroupNames === void 0 ? void 0 : _target$logGroupNames.some(function (logGroup) {
        return _this9.templateSrv.variableExists(logGroup);
      })) || lodash__WEBPACK_IMPORTED_MODULE_2___default.a.find(target.dimensions, function (v, k) {
        return _this9.templateSrv.variableExists(k) || _this9.templateSrv.variableExists(v);
      });
    }
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      // use billing metrics for test
      var region = this.defaultRegion;
      var namespace = 'AWS/Billing';
      var metricName = 'EstimatedCharges';
      var dimensions = {};
      return this.getDimensionValues(region, namespace, metricName, 'ServiceName', dimensions).then(function () {
        return {
          status: 'success',
          message: '数据源正在工作'
        };
      });
    }
  }, {
    key: "awsRequest",
    value: function () {
      var _awsRequest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(url, data) {
        var options, result;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                options = {
                  method: 'POST',
                  url: url,
                  data: data
                };
                _context8.next = 3;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_8__["getBackendSrv"])().datasourceRequest(options);

              case 3:
                result = _context8.sent;
                return _context8.abrupt("return", result.data);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function awsRequest(_x14, _x15) {
        return _awsRequest.apply(this, arguments);
      }

      return awsRequest;
    }()
  }, {
    key: "getDefaultRegion",
    value: function getDefaultRegion() {
      return this.defaultRegion;
    }
  }, {
    key: "getActualRegion",
    value: function getActualRegion(region) {
      if (region === 'default' || region === undefined || region === '') {
        return this.getDefaultRegion();
      }

      return region;
    }
  }, {
    key: "showContextToggle",
    value: function showContextToggle() {
      return true;
    }
  }, {
    key: "convertToCloudWatchTime",
    value: function convertToCloudWatchTime(date, roundUp) {
      if (lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isString(date)) {
        date = _grafana_data__WEBPACK_IMPORTED_MODULE_7__["dateMath"].parse(date, roundUp);
      }

      return Math.round(date.valueOf() / 1000);
    }
  }, {
    key: "convertDimensionFormat",
    value: function convertDimensionFormat(dimensions, scopedVars) {
      var _this10 = this;

      return Object.entries(dimensions).reduce(function (result, _ref26) {
        var _ref27 = _slicedToArray(_ref26, 2),
            key = _ref27[0],
            value = _ref27[1];

        key = _this10.replace(key, scopedVars, true, 'dimension keys');

        if (Array.isArray(value)) {
          return _objectSpread({}, result, _defineProperty({}, key, value));
        }

        var valueVar = _this10.templateSrv.getVariables().find(function (_ref28) {
          var name = _ref28.name;
          return name === _this10.templateSrv.getVariableName(value);
        });

        if (valueVar) {
          if (valueVar.multi) {
            var values = _this10.templateSrv.replace(value, scopedVars, 'pipe').split('|');

            return _objectSpread({}, result, _defineProperty({}, key, values));
          }

          return _objectSpread({}, result, _defineProperty({}, key, [_this10.templateSrv.replace(value, scopedVars)]));
        }

        return _objectSpread({}, result, _defineProperty({}, key, [value]));
      }, {});
    }
  }, {
    key: "replace",
    value: function replace(target, scopedVars, displayErrorIfIsMultiTemplateVariable, fieldName) {
      var _this11 = this;

      if (displayErrorIfIsMultiTemplateVariable && !!target) {
        var variable = this.templateSrv.getVariables().find(function (_ref29) {
          var name = _ref29.name;
          return name === _this11.templateSrv.getVariableName(target);
        });

        if (variable && variable.multi) {
          this.debouncedCustomAlert('CloudWatch模板错误', "\u4E0D\u652F\u6301\u591A\u6A21\u677F\u53D8\u91CF ".concat(fieldName || target));
        }
      }

      return this.templateSrv.replace(target, scopedVars);
    }
  }, {
    key: "getQueryDisplayText",
    value: function getQueryDisplayText(query) {
      if (query.queryMode === 'Logs') {
        var _query$expression;

        return (_query$expression = query.expression) !== null && _query$expression !== void 0 ? _query$expression : '';
      } else {
        return JSON.stringify(query);
      }
    }
  }, {
    key: "interpolateVariablesInQueries",
    value: function interpolateVariablesInQueries(queries, scopedVars) {
      var _this12 = this;

      if (!queries.length) {
        return queries;
      }

      return queries.map(function (query) {
        return _objectSpread({}, query, {
          region: _this12.getActualRegion(_this12.replace(query.region, scopedVars)),
          expression: _this12.replace(query.expression, scopedVars)
        }, !Object(_types__WEBPACK_IMPORTED_MODULE_11__["isCloudWatchLogsQuery"])(query) && _this12.interpolateMetricsQueryVariables(query, scopedVars));
      });
    }
  }, {
    key: "interpolateMetricsQueryVariables",
    value: function interpolateMetricsQueryVariables(query, scopedVars) {
      var _this13 = this;

      return {
        alias: this.replace(query.alias, scopedVars),
        metricName: this.replace(query.metricName, scopedVars),
        namespace: this.replace(query.namespace, scopedVars),
        period: this.replace(query.period, scopedVars),
        dimensions: Object.entries(query.dimensions).reduce(function (prev, _ref30) {
          var _ref31 = _slicedToArray(_ref30, 2),
              key = _ref31[0],
              value = _ref31[1];

          if (Array.isArray(value)) {
            return _objectSpread({}, prev, _defineProperty({}, key, value));
          }

          return _objectSpread({}, prev, _defineProperty({}, _this13.replace(key, scopedVars), _this13.replace(value, scopedVars)));
        }, {})
      };
    }
  }, {
    key: "variables",
    get: function get() {
      return this.templateSrv.getVariables().map(function (v) {
        return "$".concat(v.name);
      });
    }
  }]);

  return CloudWatchDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_7__["DataSourceApi"]);

function withTeardown(observable, onUnsubscribe) {
  return new rxjs__WEBPACK_IMPORTED_MODULE_12__["Observable"](function (subscriber) {
    var innerSub = observable.subscribe({
      next: function next(val) {
        return subscriber.next(val);
      },
      error: function error(err) {
        return subscriber.next(err);
      },
      complete: function complete() {
        return subscriber.complete();
      }
    });
    return function () {
      innerSub.unsubscribe();
      onUnsubscribe();
    };
  });
}

function parseLogGroupName(logIdentifier) {
  var colonIndex = logIdentifier.lastIndexOf(':');
  return logIdentifier.substr(colonIndex + 1);
}

/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/language_provider.ts":
/*!***********************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/language_provider.ts ***!
  \***********************************************************************/
/*! exports provided: CloudWatchLanguageProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudWatchLanguageProvider", function() { return CloudWatchLanguageProvider; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _syntax__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./syntax */ "./public/app/plugins/datasource/cloudwatch/syntax.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

// Libraries
 // Services & Utils

 // Types



var CloudWatchLanguageProvider =
/*#__PURE__*/
function (_LanguageProvider) {
  _inherits(CloudWatchLanguageProvider, _LanguageProvider);

  function CloudWatchLanguageProvider(datasource, initialValues) {
    var _this;

    _classCallCheck(this, CloudWatchLanguageProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CloudWatchLanguageProvider).call(this));

    _this.cleanText = function (s) {
      return s.replace(/[()]/g, '').trim();
    };

    _this.request = function (url, params) {
      return _this.datasource.awsRequest(url, params);
    };

    _this.start = function () {
      if (!_this.startTask) {
        _this.startTask = Promise.resolve().then(function () {
          _this.started = true;
          return [];
        });
      }

      return _this.startTask;
    };

    _this.fetchFields =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(logGroups) {
        var results, fields;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this.fetchedFieldsCache && Date.now() - _this.fetchedFieldsCache.time < 30 * 1000 && lodash__WEBPACK_IMPORTED_MODULE_0___default.a.sortedUniq(_this.fetchedFieldsCache.logGroups).join('|') === lodash__WEBPACK_IMPORTED_MODULE_0___default.a.sortedUniq(logGroups).join('|'))) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", _this.fetchedFieldsCache.fields);

              case 2:
                _context.next = 4;
                return Promise.all(logGroups.map(function (logGroup) {
                  return _this.datasource.getLogGroupFields({
                    logGroupName: logGroup
                  });
                }));

              case 4:
                results = _context.sent;
                fields = _toConsumableArray(new Set(results.reduce(function (acc, cur) {
                  var _cur$logGroupFields;

                  return acc.concat((_cur$logGroupFields = cur.logGroupFields) === null || _cur$logGroupFields === void 0 ? void 0 : _cur$logGroupFields.map(function (f) {
                    return f.name;
                  }));
                }, [])).values());
                _this.fetchedFieldsCache = {
                  time: Date.now(),
                  logGroups: logGroups,
                  fields: fields
                };
                return _context.abrupt("return", fields);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.handleKeyword =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(context) {
        var _ref3, _suggs$suggestions;

        var suggs, functionSuggestions;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.getFieldCompletionItems((_ref3 = context === null || context === void 0 ? void 0 : context.logGroupNames) !== null && _ref3 !== void 0 ? _ref3 : []);

              case 2:
                suggs = _context2.sent;
                functionSuggestions = [{
                  prefixMatch: true,
                  label: 'Functions',
                  items: _syntax__WEBPACK_IMPORTED_MODULE_1__["STRING_FUNCTIONS"].concat(_syntax__WEBPACK_IMPORTED_MODULE_1__["DATETIME_FUNCTIONS"], _syntax__WEBPACK_IMPORTED_MODULE_1__["IP_FUNCTIONS"])
                }];

                (_suggs$suggestions = suggs.suggestions).push.apply(_suggs$suggestions, functionSuggestions);

                return _context2.abrupt("return", suggs);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.handleCommand =
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(commandToken, curToken, context) {
        var _commandToken$next;

        var queryCommand, prevToken, currentTokenIsFirstArg, _ref5, currentTokenIsAfterCommandAndEmpty, currentTokenIsAfterCommand, currentTokenIsComma, currentTokenIsCommaOrAfterComma, _ref6, _typeaheadOutput$sugg, typeaheadOutput, _typeaheadOutput, _ref7, _sugg$suggestions, sugg, boolFuncs;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                queryCommand = commandToken.content.toLowerCase();
                prevToken = prevNonWhitespaceToken(curToken);
                currentTokenIsFirstArg = prevToken === commandToken;

                if (!(queryCommand === 'sort')) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", _this.handleSortCommand(currentTokenIsFirstArg, curToken, context));

              case 5:
                if (!(queryCommand === 'parse')) {
                  _context3.next = 10;
                  break;
                }

                if (!currentTokenIsFirstArg) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 9;
                return _this.getFieldCompletionItems((_ref5 = context === null || context === void 0 ? void 0 : context.logGroupNames) !== null && _ref5 !== void 0 ? _ref5 : []);

              case 9:
                return _context3.abrupt("return", _context3.sent);

              case 10:
                currentTokenIsAfterCommandAndEmpty = isTokenType(commandToken.next, 'whitespace') && !((_commandToken$next = commandToken.next) === null || _commandToken$next === void 0 ? void 0 : _commandToken$next.next);
                currentTokenIsAfterCommand = currentTokenIsAfterCommandAndEmpty || nextNonWhitespaceToken(commandToken) === curToken;
                currentTokenIsComma = isTokenType(curToken, 'punctuation', ',');
                currentTokenIsCommaOrAfterComma = currentTokenIsComma || isTokenType(prevToken, 'punctuation', ','); // We only show suggestions if we are after a command or after a comma which is a field separator

                if (currentTokenIsAfterCommand || currentTokenIsCommaOrAfterComma) {
                  _context3.next = 16;
                  break;
                }

                return _context3.abrupt("return", {
                  suggestions: []
                });

              case 16:
                if (!['display', 'fields'].includes(queryCommand)) {
                  _context3.next = 22;
                  break;
                }

                _context3.next = 19;
                return _this.getFieldCompletionItems((_ref6 = context === null || context === void 0 ? void 0 : context.logGroupNames) !== null && _ref6 !== void 0 ? _ref6 : []);

              case 19:
                typeaheadOutput = _context3.sent;

                (_typeaheadOutput$sugg = typeaheadOutput.suggestions).push.apply(_typeaheadOutput$sugg, _toConsumableArray(_this.getFieldAndFilterFunctionCompletionItems().suggestions));

                return _context3.abrupt("return", typeaheadOutput);

              case 22:
                if (!(queryCommand === 'stats')) {
                  _context3.next = 26;
                  break;
                }

                _typeaheadOutput = _this.getStatsAggCompletionItems();

                if (currentTokenIsComma || currentTokenIsAfterCommandAndEmpty) {
                  _typeaheadOutput === null || _typeaheadOutput === void 0 ? void 0 : _typeaheadOutput.suggestions.forEach(function (group) {
                    group.skipFilter = true;
                  });
                }

                return _context3.abrupt("return", _typeaheadOutput);

              case 26:
                if (!(queryCommand === 'filter' && currentTokenIsFirstArg)) {
                  _context3.next = 33;
                  break;
                }

                _context3.next = 29;
                return _this.getFieldCompletionItems((_ref7 = context === null || context === void 0 ? void 0 : context.logGroupNames) !== null && _ref7 !== void 0 ? _ref7 : []);

              case 29:
                sugg = _context3.sent;
                boolFuncs = _this.getBoolFuncCompletionItems();

                (_sugg$suggestions = sugg.suggestions).push.apply(_sugg$suggestions, _toConsumableArray(boolFuncs.suggestions));

                return _context3.abrupt("return", sugg);

              case 33:
                return _context3.abrupt("return", {
                  suggestions: []
                });

              case 34:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x3, _x4, _x5) {
        return _ref4.apply(this, arguments);
      };
    }();

    _this.handleComparison =
    /*#__PURE__*/
    function () {
      var _ref8 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(context) {
        var _ref9, _fieldsSuggestions$su;

        var fieldsSuggestions, comparisonSuggestions;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this.getFieldCompletionItems((_ref9 = context === null || context === void 0 ? void 0 : context.logGroupNames) !== null && _ref9 !== void 0 ? _ref9 : []);

              case 2:
                fieldsSuggestions = _context4.sent;
                comparisonSuggestions = _this.getComparisonCompletionItems();

                (_fieldsSuggestions$su = fieldsSuggestions.suggestions).push.apply(_fieldsSuggestions$su, _toConsumableArray(comparisonSuggestions.suggestions));

                return _context4.abrupt("return", fieldsSuggestions);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x6) {
        return _ref8.apply(this, arguments);
      };
    }();

    _this.getCommandCompletionItems = function () {
      return {
        suggestions: [{
          prefixMatch: true,
          label: 'Commands',
          items: _syntax__WEBPACK_IMPORTED_MODULE_1__["QUERY_COMMANDS"]
        }]
      };
    };

    _this.getFieldAndFilterFunctionCompletionItems = function () {
      return {
        suggestions: [{
          prefixMatch: true,
          label: 'Functions',
          items: _syntax__WEBPACK_IMPORTED_MODULE_1__["FIELD_AND_FILTER_FUNCTIONS"]
        }]
      };
    };

    _this.getStatsAggCompletionItems = function () {
      return {
        suggestions: [{
          prefixMatch: true,
          label: 'Functions',
          items: _syntax__WEBPACK_IMPORTED_MODULE_1__["AGGREGATION_FUNCTIONS_STATS"]
        }]
      };
    };

    _this.getBoolFuncCompletionItems = function () {
      return {
        suggestions: [{
          prefixMatch: true,
          label: 'Functions',
          items: _syntax__WEBPACK_IMPORTED_MODULE_1__["BOOLEAN_FUNCTIONS"]
        }]
      };
    };

    _this.getComparisonCompletionItems = function () {
      return {
        suggestions: [{
          prefixMatch: true,
          label: 'Functions',
          items: _syntax__WEBPACK_IMPORTED_MODULE_1__["NUMERIC_OPERATORS"].concat(_syntax__WEBPACK_IMPORTED_MODULE_1__["BOOLEAN_FUNCTIONS"])
        }]
      };
    };

    _this.getFieldCompletionItems =
    /*#__PURE__*/
    function () {
      var _ref10 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(logGroups) {
        var fields;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _this.fetchFields(logGroups);

              case 2:
                fields = _context5.sent;
                return _context5.abrupt("return", {
                  suggestions: [{
                    label: 'Fields',
                    items: fields.map(function (field) {
                      return {
                        label: field,
                        insertText: field.match(/@?[_a-zA-Z]+[_.0-9a-zA-Z]*/) ? undefined : "`".concat(field, "`")
                      };
                    })
                  }]
                });

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x7) {
        return _ref10.apply(this, arguments);
      };
    }();

    _this.datasource = datasource;
    Object.assign(_assertThisInitialized(_this), initialValues);
    return _this;
  } // Strip syntax chars


  _createClass(CloudWatchLanguageProvider, [{
    key: "getSyntax",
    value: function getSyntax() {
      return _syntax__WEBPACK_IMPORTED_MODULE_1__["default"];
    }
  }, {
    key: "isStatsQuery",
    value: function isStatsQuery(query) {
      var _Prism$tokenize;

      var grammar = this.getSyntax();
      var tokens = (_Prism$tokenize = prismjs__WEBPACK_IMPORTED_MODULE_3___default.a.tokenize(query, grammar)) !== null && _Prism$tokenize !== void 0 ? _Prism$tokenize : [];
      return !!tokens.find(function (token) {
        return typeof token !== 'string' && token.content.toString().toLowerCase() === 'stats' && token.type === 'query-command';
      });
    }
    /**
     * Return suggestions based on input that can be then plugged into a typeahead dropdown.
     * Keep this DOM-free for testing
     * @param input
     * @param context Is optional in types but is required in case we are doing getLabelCompletionItems
     * @param context.absoluteRange Required in case we are doing getLabelCompletionItems
     * @param context.history Optional used only in getEmptyCompletionItems
     */

  }, {
    key: "provideCompletionItems",
    value: function () {
      var _provideCompletionItems = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(input, context) {
        var value, tokens, curToken, isFirstToken, prevToken, isCommandStart, _ref11, commandToken;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                value = input.value; // Get tokens

                tokens = value === null || value === void 0 ? void 0 : value.data.get('tokens');

                if (!(!tokens || !tokens.length)) {
                  _context6.next = 4;
                  break;
                }

                return _context6.abrupt("return", {
                  suggestions: []
                });

              case 4:
                curToken = tokens.filter(function (token) {
                  var _selection, _selection$start, _selection2, _selection2$start;

                  return token.offsets.start <= ((_selection = value.selection) === null || _selection === void 0 ? void 0 : (_selection$start = _selection.start) === null || _selection$start === void 0 ? void 0 : _selection$start.offset) && token.offsets.end >= ((_selection2 = value.selection) === null || _selection2 === void 0 ? void 0 : (_selection2$start = _selection2.start) === null || _selection2$start === void 0 ? void 0 : _selection2$start.offset);
                })[0];
                isFirstToken = !curToken.prev;
                prevToken = prevNonWhitespaceToken(curToken);
                isCommandStart = isFirstToken || !isFirstToken && (prevToken === null || prevToken === void 0 ? void 0 : prevToken.types.includes('command-separator'));

                if (!isCommandStart) {
                  _context6.next = 10;
                  break;
                }

                return _context6.abrupt("return", this.getCommandCompletionItems());

              case 10:
                if (!isInsideFunctionParenthesis(curToken)) {
                  _context6.next = 14;
                  break;
                }

                _context6.next = 13;
                return this.getFieldCompletionItems((_ref11 = context === null || context === void 0 ? void 0 : context.logGroupNames) !== null && _ref11 !== void 0 ? _ref11 : []);

              case 13:
                return _context6.abrupt("return", _context6.sent);

              case 14:
                if (!isAfterKeyword('by', curToken)) {
                  _context6.next = 16;
                  break;
                }

                return _context6.abrupt("return", this.handleKeyword(context));

              case 16:
                if (!(prevToken === null || prevToken === void 0 ? void 0 : prevToken.types.includes('comparison-operator'))) {
                  _context6.next = 18;
                  break;
                }

                return _context6.abrupt("return", this.handleComparison(context));

              case 18:
                commandToken = previousCommandToken(curToken);

                if (!commandToken) {
                  _context6.next = 23;
                  break;
                }

                _context6.next = 22;
                return this.handleCommand(commandToken, curToken, context);

              case 22:
                return _context6.abrupt("return", _context6.sent);

              case 23:
                return _context6.abrupt("return", {
                  suggestions: []
                });

              case 24:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function provideCompletionItems(_x8, _x9) {
        return _provideCompletionItems.apply(this, arguments);
      }

      return provideCompletionItems;
    }()
  }, {
    key: "handleSortCommand",
    value: function () {
      var _handleSortCommand = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(isFirstArgument, curToken, context) {
        var _ref12;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!isFirstArgument) {
                  _context7.next = 6;
                  break;
                }

                _context7.next = 3;
                return this.getFieldCompletionItems((_ref12 = context === null || context === void 0 ? void 0 : context.logGroupNames) !== null && _ref12 !== void 0 ? _ref12 : []);

              case 3:
                return _context7.abrupt("return", _context7.sent);

              case 6:
                if (!isTokenType(prevNonWhitespaceToken(curToken), 'field-name')) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return", {
                  suggestions: [{
                    prefixMatch: true,
                    label: 'Sort Order',
                    items: [{
                      label: 'asc'
                    }, {
                      label: 'desc'
                    }]
                  }]
                });

              case 8:
                return _context7.abrupt("return", {
                  suggestions: []
                });

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function handleSortCommand(_x10, _x11, _x12) {
        return _handleSortCommand.apply(this, arguments);
      }

      return handleSortCommand;
    }()
  }]);

  return CloudWatchLanguageProvider;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["LanguageProvider"]);

function nextNonWhitespaceToken(token) {
  var curToken = token;

  while (curToken.next) {
    if (curToken.next.types.includes('whitespace')) {
      curToken = curToken.next;
    } else {
      return curToken.next;
    }
  }

  return null;
}

function prevNonWhitespaceToken(token) {
  var curToken = token;

  while (curToken.prev) {
    if (isTokenType(curToken.prev, 'whitespace')) {
      curToken = curToken.prev;
    } else {
      return curToken.prev;
    }
  }

  return null;
}

function previousCommandToken(startToken) {
  var thisToken = startToken;

  while (!!thisToken.prev) {
    thisToken = thisToken.prev;

    if (thisToken.types.includes('query-command') && (!thisToken.prev || isTokenType(prevNonWhitespaceToken(thisToken), 'command-separator'))) {
      return thisToken;
    }
  }

  return null;
}

var funcsWithFieldArgs = ['avg', 'count', 'count_distinct', 'earliest', 'latest', 'sortsFirst', 'sortsLast', 'max', 'min', 'pct', 'stddev', 'ispresent', 'fromMillis', 'toMillis', 'isempty', 'isblank', 'isValidIp', 'isValidIpV4', 'isValidIpV6', 'isIpInSubnet', 'isIpv4InSubnet', 'isIpv6InSubnet'].map(function (funcName) {
  return funcName.toLowerCase();
});
/**
 * Returns true if cursor is currently inside a function parenthesis for example `count(|)` or `count(@mess|)` should
 * return true.
 */

function isInsideFunctionParenthesis(curToken) {
  var prevToken = prevNonWhitespaceToken(curToken);

  if (!prevToken) {
    return false;
  }

  var parenthesisToken = curToken.content === '(' ? curToken : prevToken.content === '(' ? prevToken : undefined;

  if (parenthesisToken) {
    var maybeFunctionToken = prevNonWhitespaceToken(parenthesisToken);

    if (maybeFunctionToken) {
      return funcsWithFieldArgs.includes(maybeFunctionToken.content.toLowerCase()) && maybeFunctionToken.types.includes('function');
    }
  }

  return false;
}

function isAfterKeyword(keyword, token) {
  var maybeKeyword = getPreviousTokenExcluding(token, ['whitespace', 'function', 'punctuation', 'field-name', 'number']);

  if (isTokenType(maybeKeyword, 'keyword', 'by')) {
    var prev = getPreviousTokenExcluding(token, ['whitespace']);

    if (prev === maybeKeyword || isTokenType(prev, 'punctuation', ',')) {
      return true;
    }
  }

  return false;
}

function isTokenType(token, type, content) {
  if (!(token === null || token === void 0 ? void 0 : token.types.includes(type))) {
    return false;
  }

  if (content) {
    if ((token === null || token === void 0 ? void 0 : token.content.toLowerCase()) !== content) {
      return false;
    }
  }

  return true;
}

function getPreviousTokenExcluding(token, exclude) {
  var curToken = token.prev;

  main: while (curToken) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = exclude[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;

        if (typeof item === 'string') {
          if (curToken.types.includes(item)) {
            curToken = curToken.prev;
            continue main;
          }
        } else {
          if (curToken.types.includes(item.type) && curToken.content.toLowerCase() === item.value) {
            curToken = curToken.prev;
            continue main;
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

    break;
  }

  return curToken;
}

/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/memoizedDebounce.ts":
/*!**********************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/memoizedDebounce.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (function (func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7000;
  var mem = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["memoize"])(function () {
    return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["debounce"])(func, wait, {
      leading: true
    });
  }, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return JSON.stringify(args);
  });
  return function () {
    return mem.apply(void 0, arguments).apply(void 0, arguments);
  };
});

/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/module.tsx":
/*!*************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/module.tsx ***!
  \*************************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _query_parameter_ctrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query_parameter_ctrl */ "./public/app/plugins/datasource/cloudwatch/query_parameter_ctrl.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _components_ConfigEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ConfigEditor */ "./public/app/plugins/datasource/cloudwatch/components/ConfigEditor.tsx");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/cloudwatch/datasource.ts");
/* harmony import */ var _annotations_query_ctrl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./annotations_query_ctrl */ "./public/app/plugins/datasource/cloudwatch/annotations_query_ctrl.ts");
/* harmony import */ var _components_LogsQueryEditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/LogsQueryEditor */ "./public/app/plugins/datasource/cloudwatch/components/LogsQueryEditor.tsx");
/* harmony import */ var _components_PanelQueryEditor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/PanelQueryEditor */ "./public/app/plugins/datasource/cloudwatch/components/PanelQueryEditor.tsx");
/* harmony import */ var _components_LogsCheatSheet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/LogsCheatSheet */ "./public/app/plugins/datasource/cloudwatch/components/LogsCheatSheet.tsx");








var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_3__["CloudWatchDatasource"]).setExploreStartPage(_components_LogsCheatSheet__WEBPACK_IMPORTED_MODULE_7__["default"]).setConfigEditor(_components_ConfigEditor__WEBPACK_IMPORTED_MODULE_2__["ConfigEditor"]).setQueryEditor(_components_PanelQueryEditor__WEBPACK_IMPORTED_MODULE_6__["PanelQueryEditor"]).setExploreMetricsQueryField(_components_PanelQueryEditor__WEBPACK_IMPORTED_MODULE_6__["PanelQueryEditor"]).setExploreLogsQueryField(_components_LogsQueryEditor__WEBPACK_IMPORTED_MODULE_5__["CloudWatchLogsQueryEditor"]).setAnnotationQueryCtrl(_annotations_query_ctrl__WEBPACK_IMPORTED_MODULE_4__["CloudWatchAnnotationsQueryCtrl"]);

/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/query_parameter_ctrl.ts":
/*!**************************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/query_parameter_ctrl.ts ***!
  \**************************************************************************/
/*! exports provided: CloudWatchQueryParameterCtrl, cloudWatchQueryParameter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudWatchQueryParameterCtrl", function() { return CloudWatchQueryParameterCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloudWatchQueryParameter", function() { return cloudWatchQueryParameter; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/core_module */ "./public/app/core/core_module.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var CloudWatchQueryParameterCtrl =
/** @ngInject */
function CloudWatchQueryParameterCtrl($scope, templateSrv, uiSegmentSrv, datasourceSrv) {
  _classCallCheck(this, CloudWatchQueryParameterCtrl);

  $scope.init = function () {
    var target = $scope.target;
    target.namespace = target.namespace || '';
    target.metricName = target.metricName || '';
    target.statistics = target.statistics || ['Average'];
    target.dimensions = target.dimensions || {};
    target.period = target.period || '';
    target.region = target.region || 'default';
    target.id = target.id || '';
    target.expression = target.expression || '';
    $scope.regionSegment = uiSegmentSrv.getSegmentForValue($scope.target.region, 'select region');
    $scope.namespaceSegment = uiSegmentSrv.getSegmentForValue($scope.target.namespace, 'select namespace');
    $scope.metricSegment = uiSegmentSrv.getSegmentForValue($scope.target.metricName, 'select metric');
    $scope.dimSegments = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.reduce($scope.target.dimensions, function (memo, value, key) {
      memo.push(uiSegmentSrv.newKey(key));
      memo.push(uiSegmentSrv.newOperator('='));
      memo.push(uiSegmentSrv.newKeyValue(value));
      return memo;
    }, []);
    $scope.statSegments = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map($scope.target.statistics, function (stat) {
      return uiSegmentSrv.getSegmentForValue(stat);
    });
    $scope.ensurePlusButton($scope.statSegments);
    $scope.ensurePlusButton($scope.dimSegments);
    $scope.removeDimSegment = uiSegmentSrv.newSegment({
      fake: true,
      value: '-- remove dimension --'
    });
    $scope.removeStatSegment = uiSegmentSrv.newSegment({
      fake: true,
      value: '-- remove stat --'
    });

    if (lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isEmpty($scope.target.region)) {
      $scope.target.region = 'default';
    }

    if (!$scope.onChange) {
      $scope.onChange = function () {};
    }
  };

  $scope.getStatSegments = function () {
    return Promise.resolve(lodash__WEBPACK_IMPORTED_MODULE_2___default.a.flatten([angular__WEBPACK_IMPORTED_MODULE_0___default.a.copy($scope.removeStatSegment), lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map($scope.datasource.standardStatistics, function (s) {
      return uiSegmentSrv.getSegmentForValue(s);
    }), uiSegmentSrv.getSegmentForValue('pNN.NN')]));
  };

  $scope.statSegmentChanged = function (segment, index) {
    if (segment.value === $scope.removeStatSegment.value) {
      $scope.statSegments.splice(index, 1);
    } else {
      segment.type = 'value';
    }

    $scope.target.statistics = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.reduce($scope.statSegments, function (memo, seg) {
      if (!seg.fake) {
        memo.push(seg.value);
      }

      return memo;
    }, []);
    $scope.ensurePlusButton($scope.statSegments);
    $scope.onChange();
  };

  $scope.ensurePlusButton = function (segments) {
    var count = segments.length;
    var lastSegment = segments[Math.max(count - 1, 0)];

    if (!lastSegment || lastSegment.type !== 'plus-button') {
      segments.push(uiSegmentSrv.newPlusButton());
    }
  };

  $scope.getDimSegments = function (segment, $index) {
    if (segment.type === 'operator') {
      return Promise.resolve([]);
    }

    var target = $scope.target;
    var query = Promise.resolve([]);

    if (segment.type === 'key' || segment.type === 'plus-button') {
      query = $scope.datasource.getDimensionKeys($scope.target.namespace, $scope.target.region);
    } else if (segment.type === 'value') {
      var dimensionKey = $scope.dimSegments[$index - 2].value;
      delete target.dimensions[dimensionKey];
      query = $scope.datasource.getDimensionValues(target.region, target.namespace, target.metricName, dimensionKey, target.dimensions);
    }

    return query.then($scope.transformToSegments(true)).then(function (results) {
      if (segment.type === 'key') {
        results.splice(0, 0, angular__WEBPACK_IMPORTED_MODULE_0___default.a.copy($scope.removeDimSegment));
      }

      return results;
    });
  };

  $scope.dimSegmentChanged = function (segment, index) {
    $scope.dimSegments[index] = segment;

    if (segment.value === $scope.removeDimSegment.value) {
      $scope.dimSegments.splice(index, 3);
    } else if (segment.type === 'plus-button') {
      $scope.dimSegments.push(uiSegmentSrv.newOperator('='));
      $scope.dimSegments.push(uiSegmentSrv.newFake('select dimension value', 'value', 'query-segment-value'));
      segment.type = 'key';
      segment.cssClass = 'query-segment-key';
    }

    $scope.syncDimSegmentsWithModel();
    $scope.ensurePlusButton($scope.dimSegments);
    $scope.onChange();
  };

  $scope.syncDimSegmentsWithModel = function () {
    var dims = {};
    var length = $scope.dimSegments.length;

    for (var i = 0; i < length - 2; i += 3) {
      var keySegment = $scope.dimSegments[i];
      var valueSegment = $scope.dimSegments[i + 2];

      if (!valueSegment.fake) {
        dims[keySegment.value] = valueSegment.value;
      }
    }

    $scope.target.dimensions = dims;
  };

  $scope.getRegions = function () {
    return $scope.datasource.metricFindQuery('regions()').then(function (results) {
      results.unshift({
        text: 'default'
      });
      return results;
    }).then($scope.transformToSegments(true));
  };

  $scope.getNamespaces = function () {
    return $scope.datasource.metricFindQuery('namespaces()').then($scope.transformToSegments(true));
  };

  $scope.getMetrics = function () {
    return $scope.datasource.metricFindQuery('metrics(' + $scope.target.namespace + ',' + $scope.target.region + ')').then($scope.transformToSegments(true));
  };

  $scope.regionChanged = function () {
    $scope.target.region = $scope.regionSegment.value;
    $scope.onChange();
  };

  $scope.namespaceChanged = function () {
    $scope.target.namespace = $scope.namespaceSegment.value;
    $scope.onChange();
  };

  $scope.metricChanged = function () {
    $scope.target.metricName = $scope.metricSegment.value;
    $scope.onChange();
  };

  $scope.transformToSegments = function (addTemplateVars) {
    return function (results) {
      var segments = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(results, function (segment) {
        return uiSegmentSrv.newSegment({
          value: segment.text,
          expandable: segment.expandable
        });
      });

      if (addTemplateVars) {
        lodash__WEBPACK_IMPORTED_MODULE_2___default.a.each(templateSrv.getVariables(), function (variable) {
          segments.unshift(uiSegmentSrv.newSegment({
            type: 'template',
            value: '$' + variable.name,
            expandable: true
          }));
        });
      }

      return segments;
    };
  };

  $scope.init();
};
CloudWatchQueryParameterCtrl.$inject = ["$scope", "templateSrv", "uiSegmentSrv", "datasourceSrv"];
CloudWatchQueryParameterCtrl.$inject = ["$scope", "templateSrv", "uiSegmentSrv", "datasourceSrv"];
function cloudWatchQueryParameter() {
  return {
    templateUrl: 'public/app/plugins/datasource/cloudwatch/partials/query.parameter.html',
    controller: CloudWatchQueryParameterCtrl,
    restrict: 'E',
    scope: {
      target: '=',
      datasource: '=',
      onChange: '&'
    }
  };
}
app_core_core_module__WEBPACK_IMPORTED_MODULE_1__["default"].directive('cloudwatchQueryParameter', cloudWatchQueryParameter);

/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/types.ts":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/types.ts ***!
  \***********************************************************/
/*! exports provided: CloudWatchLogsQueryStatus, isCloudWatchLogsQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudWatchLogsQueryStatus", function() { return CloudWatchLogsQueryStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCloudWatchLogsQuery", function() { return isCloudWatchLogsQuery; });
var CloudWatchLogsQueryStatus;

(function (CloudWatchLogsQueryStatus) {
  CloudWatchLogsQueryStatus["Scheduled"] = "Scheduled";
  CloudWatchLogsQueryStatus["Running"] = "Running";
  CloudWatchLogsQueryStatus["Complete"] = "Complete";
  CloudWatchLogsQueryStatus["Failed"] = "Failed";
  CloudWatchLogsQueryStatus["Cancelled"] = "Cancelled";
})(CloudWatchLogsQueryStatus || (CloudWatchLogsQueryStatus = {}));

var isCloudWatchLogsQuery = function isCloudWatchLogsQuery(cloudwatchQuery) {
  return cloudwatchQuery.queryMode === 'Logs';
};

/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/utils/rxjs/increasingInterval.ts":
/*!***********************************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/utils/rxjs/increasingInterval.ts ***!
  \***********************************************************************************/
/*! exports provided: increasingInterval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "increasingInterval", function() { return increasingInterval; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");

/**
 * Creates an Observable that emits sequential numbers after increasing intervals of time
 * starting with `startPeriod`, ending with `endPeriod` and incrementing by `step`.
 */

var increasingInterval = function increasingInterval(_ref) {
  var _ref$startPeriod = _ref.startPeriod,
      startPeriod = _ref$startPeriod === void 0 ? 0 : _ref$startPeriod,
      _ref$endPeriod = _ref.endPeriod,
      endPeriod = _ref$endPeriod === void 0 ? 5000 : _ref$endPeriod,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 1000 : _ref$step;
  var scheduler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : rxjs__WEBPACK_IMPORTED_MODULE_0__["asyncScheduler"];
  return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (subscriber) {
    subscriber.add(scheduler.schedule(dispatch, startPeriod, {
      subscriber: subscriber,
      counter: 0,
      period: startPeriod,
      step: step,
      endPeriod: endPeriod
    }));
    return subscriber;
  });
};

function dispatch(state) {
  var subscriber = state.subscriber,
      counter = state.counter,
      period = state.period,
      step = state.step,
      endPeriod = state.endPeriod;
  subscriber.next(counter);
  var newPeriod = Math.min(period + step, endPeriod);
  this.schedule({
    subscriber: subscriber,
    counter: counter + 1,
    period: newPeriod,
    step: step,
    endPeriod: endPeriod
  }, newPeriod);
}

/***/ })

}]);
//# sourceMappingURL=cloudwatchPlugin.1ebdc265fc3bd7452fcd.js.map