(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["DashboardPage"],{

/***/ "./node_modules/batch-processor/src/batch-processor.js":
/*!*************************************************************!*\
  !*** ./node_modules/batch-processor/src/batch-processor.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/batch-processor/src/utils.js");

module.exports = function batchProcessorMaker(options) {
    options             = options || {};
    var reporter        = options.reporter;
    var asyncProcess    = utils.getOption(options, "async", true);
    var autoProcess     = utils.getOption(options, "auto", true);

    if(autoProcess && !asyncProcess) {
        reporter && reporter.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true.");
        asyncProcess = true;
    }

    var batch = Batch();
    var asyncFrameHandler;
    var isProcessing = false;

    function addFunction(level, fn) {
        if(!isProcessing && autoProcess && asyncProcess && batch.size() === 0) {
            // Since this is async, it is guaranteed to be executed after that the fn is added to the batch.
            // This needs to be done before, since we're checking the size of the batch to be 0.
            processBatchAsync();
        }

        batch.add(level, fn);
    }

    function processBatch() {
        // Save the current batch, and create a new batch so that incoming functions are not added into the currently processing batch.
        // Continue processing until the top-level batch is empty (functions may be added to the new batch while processing, and so on).
        isProcessing = true;
        while (batch.size()) {
            var processingBatch = batch;
            batch = Batch();
            processingBatch.process();
        }
        isProcessing = false;
    }

    function forceProcessBatch(localAsyncProcess) {
        if (isProcessing) {
            return;
        }

        if(localAsyncProcess === undefined) {
            localAsyncProcess = asyncProcess;
        }

        if(asyncFrameHandler) {
            cancelFrame(asyncFrameHandler);
            asyncFrameHandler = null;
        }

        if(localAsyncProcess) {
            processBatchAsync();
        } else {
            processBatch();
        }
    }

    function processBatchAsync() {
        asyncFrameHandler = requestFrame(processBatch);
    }

    function clearBatch() {
        batch           = {};
        batchSize       = 0;
        topLevel        = 0;
        bottomLevel     = 0;
    }

    function cancelFrame(listener) {
        // var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
        var cancel = clearTimeout;
        return cancel(listener);
    }

    function requestFrame(callback) {
        // var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) { return window.setTimeout(fn, 20); };
        var raf = function(fn) { return setTimeout(fn, 0); };
        return raf(callback);
    }

    return {
        add: addFunction,
        force: forceProcessBatch
    };
};

function Batch() {
    var batch       = {};
    var size        = 0;
    var topLevel    = 0;
    var bottomLevel = 0;

    function add(level, fn) {
        if(!fn) {
            fn = level;
            level = 0;
        }

        if(level > topLevel) {
            topLevel = level;
        } else if(level < bottomLevel) {
            bottomLevel = level;
        }

        if(!batch[level]) {
            batch[level] = [];
        }

        batch[level].push(fn);
        size++;
    }

    function process() {
        for(var level = bottomLevel; level <= topLevel; level++) {
            var fns = batch[level];

            for(var i = 0; i < fns.length; i++) {
                var fn = fns[i];
                fn();
            }
        }
    }

    function getSize() {
        return size;
    }

    return {
        add: add,
        process: process,
        size: getSize
    };
}


/***/ }),

/***/ "./node_modules/batch-processor/src/utils.js":
/*!***************************************************!*\
  !*** ./node_modules/batch-processor/src/utils.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = module.exports = {};

utils.getOption = getOption;

function getOption(options, name, defaultValue) {
    var value = options[name];

    if((value === undefined || value === null) && defaultValue !== undefined) {
        return defaultValue;
    }

    return value;
}


/***/ }),

/***/ "./node_modules/element-resize-detector/src/browser-detector.js":
/*!**********************************************************************!*\
  !*** ./node_modules/element-resize-detector/src/browser-detector.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var detector = module.exports = {};

detector.isIE = function(version) {
    function isAnyIeVersion() {
        var agent = navigator.userAgent.toLowerCase();
        return agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1 || agent.indexOf(" edge/") !== -1;
    }

    if(!isAnyIeVersion()) {
        return false;
    }

    if(!version) {
        return true;
    }

    //Shamelessly stolen from https://gist.github.com/padolsey/527683
    var ieVersion = (function(){
        var undef,
            v = 3,
            div = document.createElement("div"),
            all = div.getElementsByTagName("i");

        do {
            div.innerHTML = "<!--[if gt IE " + (++v) + "]><i></i><![endif]-->";
        }
        while (all[0]);

        return v > 4 ? v : undef;
    }());

    return version === ieVersion;
};

detector.isLegacyOpera = function() {
    return !!window.opera;
};


/***/ }),

/***/ "./node_modules/element-resize-detector/src/collection-utils.js":
/*!**********************************************************************!*\
  !*** ./node_modules/element-resize-detector/src/collection-utils.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = module.exports = {};

/**
 * Loops through the collection and calls the callback for each element. if the callback returns truthy, the loop is broken and returns the same value.
 * @public
 * @param {*} collection The collection to loop through. Needs to have a length property set and have indices set from 0 to length - 1.
 * @param {function} callback The callback to be called for each element. The element will be given as a parameter to the callback. If this callback returns truthy, the loop is broken and the same value is returned.
 * @returns {*} The value that a callback has returned (if truthy). Otherwise nothing.
 */
utils.forEach = function(collection, callback) {
    for(var i = 0; i < collection.length; i++) {
        var result = callback(collection[i]);
        if(result) {
            return result;
        }
    }
};


/***/ }),

/***/ "./node_modules/element-resize-detector/src/detection-strategy/object.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/element-resize-detector/src/detection-strategy/object.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Resize detection strategy that injects objects to elements in order to detect resize events.
 * Heavily inspired by: http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
 */



var browserDetector = __webpack_require__(/*! ../browser-detector */ "./node_modules/element-resize-detector/src/browser-detector.js");

module.exports = function(options) {
    options             = options || {};
    var reporter        = options.reporter;
    var batchProcessor  = options.batchProcessor;
    var getState        = options.stateHandler.getState;

    if(!reporter) {
        throw new Error("Missing required dependency: reporter.");
    }

    /**
     * Adds a resize event listener to the element.
     * @public
     * @param {element} element The element that should have the listener added.
     * @param {function} listener The listener callback to be called for each resize event of the element. The element will be given as a parameter to the listener callback.
     */
    function addListener(element, listener) {
        function listenerProxy() {
            listener(element);
        }

        if(browserDetector.isIE(8)) {
            //IE 8 does not support object, but supports the resize event directly on elements.
            getState(element).object = {
                proxy: listenerProxy
            };
            element.attachEvent("onresize", listenerProxy);
        } else {
            var object = getObject(element);

            if(!object) {
                throw new Error("Element is not detectable by this strategy.");
            }

            object.contentDocument.defaultView.addEventListener("resize", listenerProxy);
        }
    }

    function buildCssTextString(rules) {
        var seperator = options.important ? " !important; " : "; ";

        return (rules.join(seperator) + seperator).trim();
    }

    /**
     * Makes an element detectable and ready to be listened for resize events. Will call the callback when the element is ready to be listened for resize changes.
     * @private
     * @param {object} options Optional options object.
     * @param {element} element The element to make detectable
     * @param {function} callback The callback to be called when the element is ready to be listened for resize changes. Will be called with the element as first parameter.
     */
    function makeDetectable(options, element, callback) {
        if (!callback) {
            callback = element;
            element = options;
            options = null;
        }

        options = options || {};
        var debug = options.debug;

        function injectObject(element, callback) {
            var OBJECT_STYLE = buildCssTextString(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]);

            //The target element needs to be positioned (everything except static) so the absolute positioned object will be positioned relative to the target element.

            // Position altering may be performed directly or on object load, depending on if style resolution is possible directly or not.
            var positionCheckPerformed = false;

            // The element may not yet be attached to the DOM, and therefore the style object may be empty in some browsers.
            // Since the style object is a reference, it will be updated as soon as the element is attached to the DOM.
            var style = window.getComputedStyle(element);
            var width = element.offsetWidth;
            var height = element.offsetHeight;

            getState(element).startSize = {
                width: width,
                height: height
            };

            function mutateDom() {
                function alterPositionStyles() {
                    if(style.position === "static") {
                        element.style.setProperty("position", "relative", options.important ? "important" : "");

                        var removeRelativeStyles = function(reporter, element, style, property) {
                            function getNumericalValue(value) {
                                return value.replace(/[^-\d\.]/g, "");
                            }

                            var value = style[property];

                            if(value !== "auto" && getNumericalValue(value) !== "0") {
                                reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element);
                                element.style.setProperty(property, "0", options.important ? "important" : "");
                            }
                        };

                        //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
                        //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).
                        removeRelativeStyles(reporter, element, style, "top");
                        removeRelativeStyles(reporter, element, style, "right");
                        removeRelativeStyles(reporter, element, style, "bottom");
                        removeRelativeStyles(reporter, element, style, "left");
                    }
                }

                function onObjectLoad() {
                    // The object has been loaded, which means that the element now is guaranteed to be attached to the DOM.
                    if (!positionCheckPerformed) {
                        alterPositionStyles();
                    }

                    /*jshint validthis: true */

                    function getDocument(element, callback) {
                        //Opera 12 seem to call the object.onload before the actual document has been created.
                        //So if it is not present, poll it with an timeout until it is present.
                        //TODO: Could maybe be handled better with object.onreadystatechange or similar.
                        if(!element.contentDocument) {
                            var state = getState(element);
                            if (state.checkForObjectDocumentTimeoutId) {
                                window.clearTimeout(state.checkForObjectDocumentTimeoutId);
                            }
                            state.checkForObjectDocumentTimeoutId = setTimeout(function checkForObjectDocument() {
                                state.checkForObjectDocumentTimeoutId = 0;
                                getDocument(element, callback);
                            }, 100);

                            return;
                        }

                        callback(element.contentDocument);
                    }

                    //Mutating the object element here seems to fire another load event.
                    //Mutating the inner document of the object element is fine though.
                    var objectElement = this;

                    //Create the style element to be added to the object.
                    getDocument(objectElement, function onObjectDocumentReady(objectDocument) {
                        //Notify that the element is ready to be listened to.
                        callback(element);
                    });
                }

                // The element may be detached from the DOM, and some browsers does not support style resolving of detached elements.
                // The alterPositionStyles needs to be delayed until we know the element has been attached to the DOM (which we are sure of when the onObjectLoad has been fired), if style resolution is not possible.
                if (style.position !== "") {
                    alterPositionStyles(style);
                    positionCheckPerformed = true;
                }

                //Add an object element as a child to the target element that will be listened to for resize events.
                var object = document.createElement("object");
                object.style.cssText = OBJECT_STYLE;
                object.tabIndex = -1;
                object.type = "text/html";
                object.setAttribute("aria-hidden", "true");
                object.onload = onObjectLoad;

                //Safari: This must occur before adding the object to the DOM.
                //IE: Does not like that this happens before, even if it is also added after.
                if(!browserDetector.isIE()) {
                    object.data = "about:blank";
                }

                if (!getState(element)) {
                    // The element has been uninstalled before the actual loading happened.
                    return;
                }

                element.appendChild(object);
                getState(element).object = object;

                //IE: This must occur after adding the object to the DOM.
                if(browserDetector.isIE()) {
                    object.data = "about:blank";
                }
            }

            if(batchProcessor) {
                batchProcessor.add(mutateDom);
            } else {
                mutateDom();
            }
        }

        if(browserDetector.isIE(8)) {
            //IE 8 does not support objects properly. Luckily they do support the resize event.
            //So do not inject the object and notify that the element is already ready to be listened to.
            //The event handler for the resize event is attached in the utils.addListener instead.
            callback(element);
        } else {
            injectObject(element, callback);
        }
    }

    /**
     * Returns the child object of the target element.
     * @private
     * @param {element} element The target element.
     * @returns The object element of the target.
     */
    function getObject(element) {
        return getState(element).object;
    }

    function uninstall(element) {
        if (!getState(element)) {
            return;
        }

        var object = getObject(element);

        if (!object) {
            return;
        }

        if (browserDetector.isIE(8)) {
            element.detachEvent("onresize", object.proxy);
        } else {
            element.removeChild(object);
        }

        if (getState(element).checkForObjectDocumentTimeoutId) {
            window.clearTimeout(getState(element).checkForObjectDocumentTimeoutId);
        }

        delete getState(element).object;
    }

    return {
        makeDetectable: makeDetectable,
        addListener: addListener,
        uninstall: uninstall
    };
};


/***/ }),

/***/ "./node_modules/element-resize-detector/src/detection-strategy/scroll.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/element-resize-detector/src/detection-strategy/scroll.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Resize detection strategy that injects divs to elements in order to detect resize events on scroll events.
 * Heavily inspired by: https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
 */



var forEach = __webpack_require__(/*! ../collection-utils */ "./node_modules/element-resize-detector/src/collection-utils.js").forEach;

module.exports = function(options) {
    options             = options || {};
    var reporter        = options.reporter;
    var batchProcessor  = options.batchProcessor;
    var getState        = options.stateHandler.getState;
    var hasState        = options.stateHandler.hasState;
    var idHandler       = options.idHandler;

    if (!batchProcessor) {
        throw new Error("Missing required dependency: batchProcessor");
    }

    if (!reporter) {
        throw new Error("Missing required dependency: reporter.");
    }

    //TODO: Could this perhaps be done at installation time?
    var scrollbarSizes = getScrollbarSizes();

    var styleId = "erd_scroll_detection_scrollbar_style";
    var detectionContainerClass = "erd_scroll_detection_container";

    function initDocument(targetDocument) {
        // Inject the scrollbar styling that prevents them from appearing sometimes in Chrome.
        // The injected container needs to have a class, so that it may be styled with CSS (pseudo elements).
        injectScrollStyle(targetDocument, styleId, detectionContainerClass);
    }

    initDocument(window.document);

    function buildCssTextString(rules) {
        var seperator = options.important ? " !important; " : "; ";

        return (rules.join(seperator) + seperator).trim();
    }

    function getScrollbarSizes() {
        var width = 500;
        var height = 500;

        var child = document.createElement("div");
        child.style.cssText = buildCssTextString(["position: absolute", "width: " + width*2 + "px", "height: " + height*2 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);

        var container = document.createElement("div");
        container.style.cssText = buildCssTextString(["position: absolute", "width: " + width + "px", "height: " + height + "px", "overflow: scroll", "visibility: none", "top: " + -width*3 + "px", "left: " + -height*3 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);

        container.appendChild(child);

        document.body.insertBefore(container, document.body.firstChild);

        var widthSize = width - container.clientWidth;
        var heightSize = height - container.clientHeight;

        document.body.removeChild(container);

        return {
            width: widthSize,
            height: heightSize
        };
    }

    function injectScrollStyle(targetDocument, styleId, containerClass) {
        function injectStyle(style, method) {
            method = method || function (element) {
                targetDocument.head.appendChild(element);
            };

            var styleElement = targetDocument.createElement("style");
            styleElement.innerHTML = style;
            styleElement.id = styleId;
            method(styleElement);
            return styleElement;
        }

        if (!targetDocument.getElementById(styleId)) {
            var containerAnimationClass = containerClass + "_animation";
            var containerAnimationActiveClass = containerClass + "_animation_active";
            var style = "/* Created by the element-resize-detector library. */\n";
            style += "." + containerClass + " > div::-webkit-scrollbar { " + buildCssTextString(["display: none"]) + " }\n\n";
            style += "." + containerAnimationActiveClass + " { " + buildCssTextString(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + containerAnimationClass, "animation-name: " + containerAnimationClass]) + " }\n";
            style += "@-webkit-keyframes " + containerAnimationClass +  " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n";
            style += "@keyframes " + containerAnimationClass +          " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }";
            injectStyle(style);
        }
    }

    function addAnimationClass(element) {
        element.className += " " + detectionContainerClass + "_animation_active";
    }

    function addEvent(el, name, cb) {
        if (el.addEventListener) {
            el.addEventListener(name, cb);
        } else if(el.attachEvent) {
            el.attachEvent("on" + name, cb);
        } else {
            return reporter.error("[scroll] Don't know how to add event listeners.");
        }
    }

    function removeEvent(el, name, cb) {
        if (el.removeEventListener) {
            el.removeEventListener(name, cb);
        } else if(el.detachEvent) {
            el.detachEvent("on" + name, cb);
        } else {
            return reporter.error("[scroll] Don't know how to remove event listeners.");
        }
    }

    function getExpandElement(element) {
        return getState(element).container.childNodes[0].childNodes[0].childNodes[0];
    }

    function getShrinkElement(element) {
        return getState(element).container.childNodes[0].childNodes[0].childNodes[1];
    }

    /**
     * Adds a resize event listener to the element.
     * @public
     * @param {element} element The element that should have the listener added.
     * @param {function} listener The listener callback to be called for each resize event of the element. The element will be given as a parameter to the listener callback.
     */
    function addListener(element, listener) {
        var listeners = getState(element).listeners;

        if (!listeners.push) {
            throw new Error("Cannot add listener to an element that is not detectable.");
        }

        getState(element).listeners.push(listener);
    }

    /**
     * Makes an element detectable and ready to be listened for resize events. Will call the callback when the element is ready to be listened for resize changes.
     * @private
     * @param {object} options Optional options object.
     * @param {element} element The element to make detectable
     * @param {function} callback The callback to be called when the element is ready to be listened for resize changes. Will be called with the element as first parameter.
     */
    function makeDetectable(options, element, callback) {
        if (!callback) {
            callback = element;
            element = options;
            options = null;
        }

        options = options || {};

        function debug() {
            if (options.debug) {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(idHandler.get(element), "Scroll: ");
                if (reporter.log.apply) {
                    reporter.log.apply(null, args);
                } else {
                    for (var i = 0; i < args.length; i++) {
                        reporter.log(args[i]);
                    }
                }
            }
        }

        function isDetached(element) {
            function isInDocument(element) {
                return element === element.ownerDocument.body || element.ownerDocument.body.contains(element);
            }

            if (!isInDocument(element)) {
                return true;
            }

            // FireFox returns null style in hidden iframes. See https://github.com/wnr/element-resize-detector/issues/68 and https://bugzilla.mozilla.org/show_bug.cgi?id=795520
            if (window.getComputedStyle(element) === null) {
                return true;
            }

            return false;
        }

        function isUnrendered(element) {
            // Check the absolute positioned container since the top level container is display: inline.
            var container = getState(element).container.childNodes[0];
            var style = window.getComputedStyle(container);
            return !style.width || style.width.indexOf("px") === -1; //Can only compute pixel value when rendered.
        }

        function getStyle() {
            // Some browsers only force layouts when actually reading the style properties of the style object, so make sure that they are all read here,
            // so that the user of the function can be sure that it will perform the layout here, instead of later (important for batching).
            var elementStyle            = window.getComputedStyle(element);
            var style                   = {};
            style.position              = elementStyle.position;
            style.width                 = element.offsetWidth;
            style.height                = element.offsetHeight;
            style.top                   = elementStyle.top;
            style.right                 = elementStyle.right;
            style.bottom                = elementStyle.bottom;
            style.left                  = elementStyle.left;
            style.widthCSS              = elementStyle.width;
            style.heightCSS             = elementStyle.height;
            return style;
        }

        function storeStartSize() {
            var style = getStyle();
            getState(element).startSize = {
                width: style.width,
                height: style.height
            };
            debug("Element start size", getState(element).startSize);
        }

        function initListeners() {
            getState(element).listeners = [];
        }

        function storeStyle() {
            debug("storeStyle invoked.");
            if (!getState(element)) {
                debug("Aborting because element has been uninstalled");
                return;
            }

            var style = getStyle();
            getState(element).style = style;
        }

        function storeCurrentSize(element, width, height) {
            getState(element).lastWidth = width;
            getState(element).lastHeight  = height;
        }

        function getExpandChildElement(element) {
            return getExpandElement(element).childNodes[0];
        }

        function getWidthOffset() {
            return 2 * scrollbarSizes.width + 1;
        }

        function getHeightOffset() {
            return 2 * scrollbarSizes.height + 1;
        }

        function getExpandWidth(width) {
            return width + 10 + getWidthOffset();
        }

        function getExpandHeight(height) {
            return height + 10 + getHeightOffset();
        }

        function getShrinkWidth(width) {
            return width * 2 + getWidthOffset();
        }

        function getShrinkHeight(height) {
            return height * 2 + getHeightOffset();
        }

        function positionScrollbars(element, width, height) {
            var expand          = getExpandElement(element);
            var shrink          = getShrinkElement(element);
            var expandWidth     = getExpandWidth(width);
            var expandHeight    = getExpandHeight(height);
            var shrinkWidth     = getShrinkWidth(width);
            var shrinkHeight    = getShrinkHeight(height);
            expand.scrollLeft   = expandWidth;
            expand.scrollTop    = expandHeight;
            shrink.scrollLeft   = shrinkWidth;
            shrink.scrollTop    = shrinkHeight;
        }

        function injectContainerElement() {
            var container = getState(element).container;

            if (!container) {
                container                   = document.createElement("div");
                container.className         = detectionContainerClass;
                container.style.cssText     = buildCssTextString(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]);
                getState(element).container = container;
                addAnimationClass(container);
                element.appendChild(container);

                var onAnimationStart = function () {
                    getState(element).onRendered && getState(element).onRendered();
                };

                addEvent(container, "animationstart", onAnimationStart);

                // Store the event handler here so that they may be removed when uninstall is called.
                // See uninstall function for an explanation why it is needed.
                getState(element).onAnimationStart = onAnimationStart;
            }

            return container;
        }

        function injectScrollElements() {
            function alterPositionStyles() {
                var style = getState(element).style;

                if(style.position === "static") {
                    element.style.setProperty("position", "relative",options.important ? "important" : "");

                    var removeRelativeStyles = function(reporter, element, style, property) {
                        function getNumericalValue(value) {
                            return value.replace(/[^-\d\.]/g, "");
                        }

                        var value = style[property];

                        if(value !== "auto" && getNumericalValue(value) !== "0") {
                            reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element);
                            element.style[property] = 0;
                        }
                    };

                    //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
                    //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).
                    removeRelativeStyles(reporter, element, style, "top");
                    removeRelativeStyles(reporter, element, style, "right");
                    removeRelativeStyles(reporter, element, style, "bottom");
                    removeRelativeStyles(reporter, element, style, "left");
                }
            }

            function getLeftTopBottomRightCssText(left, top, bottom, right) {
                left = (!left ? "0" : (left + "px"));
                top = (!top ? "0" : (top + "px"));
                bottom = (!bottom ? "0" : (bottom + "px"));
                right = (!right ? "0" : (right + "px"));

                return ["left: " + left, "top: " + top, "right: " + right, "bottom: " + bottom];
            }

            debug("Injecting elements");

            if (!getState(element)) {
                debug("Aborting because element has been uninstalled");
                return;
            }

            alterPositionStyles();

            var rootContainer = getState(element).container;

            if (!rootContainer) {
                rootContainer = injectContainerElement();
            }

            // Due to this WebKit bug https://bugs.webkit.org/show_bug.cgi?id=80808 (currently fixed in Blink, but still present in WebKit browsers such as Safari),
            // we need to inject two containers, one that is width/height 100% and another that is left/top -1px so that the final container always is 1x1 pixels bigger than
            // the targeted element.
            // When the bug is resolved, "containerContainer" may be removed.

            // The outer container can occasionally be less wide than the targeted when inside inline elements element in WebKit (see https://bugs.webkit.org/show_bug.cgi?id=152980).
            // This should be no problem since the inner container either way makes sure the injected scroll elements are at least 1x1 px.

            var scrollbarWidth          = scrollbarSizes.width;
            var scrollbarHeight         = scrollbarSizes.height;
            var containerContainerStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]);
            var containerStyle          = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat(getLeftTopBottomRightCssText(-(1 + scrollbarWidth), -(1 + scrollbarHeight), -scrollbarHeight, -scrollbarWidth)));
            var expandStyle             = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
            var shrinkStyle             = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
            var expandChildStyle        = buildCssTextString(["position: absolute", "left: 0", "top: 0"]);
            var shrinkChildStyle        = buildCssTextString(["position: absolute", "width: 200%", "height: 200%"]);

            var containerContainer      = document.createElement("div");
            var container               = document.createElement("div");
            var expand                  = document.createElement("div");
            var expandChild             = document.createElement("div");
            var shrink                  = document.createElement("div");
            var shrinkChild             = document.createElement("div");

            // Some browsers choke on the resize system being rtl, so force it to ltr. https://github.com/wnr/element-resize-detector/issues/56
            // However, dir should not be set on the top level container as it alters the dimensions of the target element in some browsers.
            containerContainer.dir              = "ltr";

            containerContainer.style.cssText    = containerContainerStyle;
            containerContainer.className        = detectionContainerClass;
            container.className                 = detectionContainerClass;
            container.style.cssText             = containerStyle;
            expand.style.cssText                = expandStyle;
            expandChild.style.cssText           = expandChildStyle;
            shrink.style.cssText                = shrinkStyle;
            shrinkChild.style.cssText           = shrinkChildStyle;

            expand.appendChild(expandChild);
            shrink.appendChild(shrinkChild);
            container.appendChild(expand);
            container.appendChild(shrink);
            containerContainer.appendChild(container);
            rootContainer.appendChild(containerContainer);

            function onExpandScroll() {
                getState(element).onExpand && getState(element).onExpand();
            }

            function onShrinkScroll() {
                getState(element).onShrink && getState(element).onShrink();
            }

            addEvent(expand, "scroll", onExpandScroll);
            addEvent(shrink, "scroll", onShrinkScroll);

            // Store the event handlers here so that they may be removed when uninstall is called.
            // See uninstall function for an explanation why it is needed.
            getState(element).onExpandScroll = onExpandScroll;
            getState(element).onShrinkScroll = onShrinkScroll;
        }

        function registerListenersAndPositionElements() {
            function updateChildSizes(element, width, height) {
                var expandChild             = getExpandChildElement(element);
                var expandWidth             = getExpandWidth(width);
                var expandHeight            = getExpandHeight(height);
                expandChild.style.setProperty("width", expandWidth + "px", options.important ? "important" : "");
                expandChild.style.setProperty("height", expandHeight + "px", options.important ? "important" : "");
            }

            function updateDetectorElements(done) {
                var width           = element.offsetWidth;
                var height          = element.offsetHeight;

                // Check whether the size has actually changed since last time the algorithm ran. If not, some steps may be skipped.
                var sizeChanged = width !== getState(element).lastWidth || height !== getState(element).lastHeight;

                debug("Storing current size", width, height);

                // Store the size of the element sync here, so that multiple scroll events may be ignored in the event listeners.
                // Otherwise the if-check in handleScroll is useless.
                storeCurrentSize(element, width, height);

                // Since we delay the processing of the batch, there is a risk that uninstall has been called before the batch gets to execute.
                // Since there is no way to cancel the fn executions, we need to add an uninstall guard to all fns of the batch.

                batchProcessor.add(0, function performUpdateChildSizes() {
                    if (!sizeChanged) {
                        return;
                    }

                    if (!getState(element)) {
                        debug("Aborting because element has been uninstalled");
                        return;
                    }

                    if (!areElementsInjected()) {
                        debug("Aborting because element container has not been initialized");
                        return;
                    }

                    if (options.debug) {
                        var w = element.offsetWidth;
                        var h = element.offsetHeight;

                        if (w !== width || h !== height) {
                            reporter.warn(idHandler.get(element), "Scroll: Size changed before updating detector elements.");
                        }
                    }

                    updateChildSizes(element, width, height);
                });

                batchProcessor.add(1, function updateScrollbars() {
                    // This function needs to be invoked event though the size is unchanged. The element could have been resized very quickly and then
                    // been restored to the original size, which will have changed the scrollbar positions.

                    if (!getState(element)) {
                        debug("Aborting because element has been uninstalled");
                        return;
                    }

                    if (!areElementsInjected()) {
                        debug("Aborting because element container has not been initialized");
                        return;
                    }

                    positionScrollbars(element, width, height);
                });

                if (sizeChanged && done) {
                    batchProcessor.add(2, function () {
                        if (!getState(element)) {
                            debug("Aborting because element has been uninstalled");
                            return;
                        }

                        if (!areElementsInjected()) {
                          debug("Aborting because element container has not been initialized");
                          return;
                        }

                        done();
                    });
                }
            }

            function areElementsInjected() {
                return !!getState(element).container;
            }

            function notifyListenersIfNeeded() {
                function isFirstNotify() {
                    return getState(element).lastNotifiedWidth === undefined;
                }

                debug("notifyListenersIfNeeded invoked");

                var state = getState(element);

                // Don't notify if the current size is the start size, and this is the first notification.
                if (isFirstNotify() && state.lastWidth === state.startSize.width && state.lastHeight === state.startSize.height) {
                    return debug("Not notifying: Size is the same as the start size, and there has been no notification yet.");
                }

                // Don't notify if the size already has been notified.
                if (state.lastWidth === state.lastNotifiedWidth && state.lastHeight === state.lastNotifiedHeight) {
                    return debug("Not notifying: Size already notified");
                }


                debug("Current size not notified, notifying...");
                state.lastNotifiedWidth = state.lastWidth;
                state.lastNotifiedHeight = state.lastHeight;
                forEach(getState(element).listeners, function (listener) {
                    listener(element);
                });
            }

            function handleRender() {
                debug("startanimation triggered.");

                if (isUnrendered(element)) {
                    debug("Ignoring since element is still unrendered...");
                    return;
                }

                debug("Element rendered.");
                var expand = getExpandElement(element);
                var shrink = getShrinkElement(element);
                if (expand.scrollLeft === 0 || expand.scrollTop === 0 || shrink.scrollLeft === 0 || shrink.scrollTop === 0) {
                    debug("Scrollbars out of sync. Updating detector elements...");
                    updateDetectorElements(notifyListenersIfNeeded);
                }
            }

            function handleScroll() {
                debug("Scroll detected.");

                if (isUnrendered(element)) {
                    // Element is still unrendered. Skip this scroll event.
                    debug("Scroll event fired while unrendered. Ignoring...");
                    return;
                }

                updateDetectorElements(notifyListenersIfNeeded);
            }

            debug("registerListenersAndPositionElements invoked.");

            if (!getState(element)) {
                debug("Aborting because element has been uninstalled");
                return;
            }

            getState(element).onRendered = handleRender;
            getState(element).onExpand = handleScroll;
            getState(element).onShrink = handleScroll;

            var style = getState(element).style;
            updateChildSizes(element, style.width, style.height);
        }

        function finalizeDomMutation() {
            debug("finalizeDomMutation invoked.");

            if (!getState(element)) {
                debug("Aborting because element has been uninstalled");
                return;
            }

            var style = getState(element).style;
            storeCurrentSize(element, style.width, style.height);
            positionScrollbars(element, style.width, style.height);
        }

        function ready() {
            callback(element);
        }

        function install() {
            debug("Installing...");
            initListeners();
            storeStartSize();

            batchProcessor.add(0, storeStyle);
            batchProcessor.add(1, injectScrollElements);
            batchProcessor.add(2, registerListenersAndPositionElements);
            batchProcessor.add(3, finalizeDomMutation);
            batchProcessor.add(4, ready);
        }

        debug("Making detectable...");

        if (isDetached(element)) {
            debug("Element is detached");

            injectContainerElement();

            debug("Waiting until element is attached...");

            getState(element).onRendered = function () {
                debug("Element is now attached");
                install();
            };
        } else {
            install();
        }
    }

    function uninstall(element) {
        var state = getState(element);

        if (!state) {
            // Uninstall has been called on a non-erd element.
            return;
        }

        // Uninstall may have been called in the following scenarios:
        // (1) Right between the sync code and async batch (here state.busy = true, but nothing have been registered or injected).
        // (2) In the ready callback of the last level of the batch by another element (here, state.busy = true, but all the stuff has been injected).
        // (3) After the installation process (here, state.busy = false and all the stuff has been injected).
        // So to be on the safe side, let's check for each thing before removing.

        // We need to remove the event listeners, because otherwise the event might fire on an uninstall element which results in an error when trying to get the state of the element.
        state.onExpandScroll && removeEvent(getExpandElement(element), "scroll", state.onExpandScroll);
        state.onShrinkScroll && removeEvent(getShrinkElement(element), "scroll", state.onShrinkScroll);
        state.onAnimationStart && removeEvent(state.container, "animationstart", state.onAnimationStart);

        state.container && element.removeChild(state.container);
    }

    return {
        makeDetectable: makeDetectable,
        addListener: addListener,
        uninstall: uninstall,
        initDocument: initDocument
    };
};


/***/ }),

/***/ "./node_modules/element-resize-detector/src/element-resize-detector.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/element-resize-detector/src/element-resize-detector.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach                 = __webpack_require__(/*! ./collection-utils */ "./node_modules/element-resize-detector/src/collection-utils.js").forEach;
var elementUtilsMaker       = __webpack_require__(/*! ./element-utils */ "./node_modules/element-resize-detector/src/element-utils.js");
var listenerHandlerMaker    = __webpack_require__(/*! ./listener-handler */ "./node_modules/element-resize-detector/src/listener-handler.js");
var idGeneratorMaker        = __webpack_require__(/*! ./id-generator */ "./node_modules/element-resize-detector/src/id-generator.js");
var idHandlerMaker          = __webpack_require__(/*! ./id-handler */ "./node_modules/element-resize-detector/src/id-handler.js");
var reporterMaker           = __webpack_require__(/*! ./reporter */ "./node_modules/element-resize-detector/src/reporter.js");
var browserDetector         = __webpack_require__(/*! ./browser-detector */ "./node_modules/element-resize-detector/src/browser-detector.js");
var batchProcessorMaker     = __webpack_require__(/*! batch-processor */ "./node_modules/batch-processor/src/batch-processor.js");
var stateHandler            = __webpack_require__(/*! ./state-handler */ "./node_modules/element-resize-detector/src/state-handler.js");

//Detection strategies.
var objectStrategyMaker     = __webpack_require__(/*! ./detection-strategy/object.js */ "./node_modules/element-resize-detector/src/detection-strategy/object.js");
var scrollStrategyMaker     = __webpack_require__(/*! ./detection-strategy/scroll.js */ "./node_modules/element-resize-detector/src/detection-strategy/scroll.js");

function isCollection(obj) {
    return Array.isArray(obj) || obj.length !== undefined;
}

function toArray(collection) {
    if (!Array.isArray(collection)) {
        var array = [];
        forEach(collection, function (obj) {
            array.push(obj);
        });
        return array;
    } else {
        return collection;
    }
}

function isElement(obj) {
    return obj && obj.nodeType === 1;
}

/**
 * @typedef idHandler
 * @type {object}
 * @property {function} get Gets the resize detector id of the element.
 * @property {function} set Generate and sets the resize detector id of the element.
 */

/**
 * @typedef Options
 * @type {object}
 * @property {boolean} callOnAdd    Determines if listeners should be called when they are getting added.
                                    Default is true. If true, the listener is guaranteed to be called when it has been added.
                                    If false, the listener will not be guarenteed to be called when it has been added (does not prevent it from being called).
 * @property {idHandler} idHandler  A custom id handler that is responsible for generating, setting and retrieving id's for elements.
                                    If not provided, a default id handler will be used.
 * @property {reporter} reporter    A custom reporter that handles reporting logs, warnings and errors.
                                    If not provided, a default id handler will be used.
                                    If set to false, then nothing will be reported.
 * @property {boolean} debug        If set to true, the the system will report debug messages as default for the listenTo method.
 */

/**
 * Creates an element resize detector instance.
 * @public
 * @param {Options?} options Optional global options object that will decide how this instance will work.
 */
module.exports = function(options) {
    options = options || {};

    //idHandler is currently not an option to the listenTo function, so it should not be added to globalOptions.
    var idHandler;

    if (options.idHandler) {
        // To maintain compatability with idHandler.get(element, readonly), make sure to wrap the given idHandler
        // so that readonly flag always is true when it's used here. This may be removed next major version bump.
        idHandler = {
            get: function (element) { return options.idHandler.get(element, true); },
            set: options.idHandler.set
        };
    } else {
        var idGenerator = idGeneratorMaker();
        var defaultIdHandler = idHandlerMaker({
            idGenerator: idGenerator,
            stateHandler: stateHandler
        });
        idHandler = defaultIdHandler;
    }

    //reporter is currently not an option to the listenTo function, so it should not be added to globalOptions.
    var reporter = options.reporter;

    if(!reporter) {
        //If options.reporter is false, then the reporter should be quiet.
        var quiet = reporter === false;
        reporter = reporterMaker(quiet);
    }

    //batchProcessor is currently not an option to the listenTo function, so it should not be added to globalOptions.
    var batchProcessor = getOption(options, "batchProcessor", batchProcessorMaker({ reporter: reporter }));

    //Options to be used as default for the listenTo function.
    var globalOptions = {};
    globalOptions.callOnAdd     = !!getOption(options, "callOnAdd", true);
    globalOptions.debug         = !!getOption(options, "debug", false);

    var eventListenerHandler    = listenerHandlerMaker(idHandler);
    var elementUtils            = elementUtilsMaker({
        stateHandler: stateHandler
    });

    //The detection strategy to be used.
    var detectionStrategy;
    var desiredStrategy = getOption(options, "strategy", "object");
    var importantCssRules = getOption(options, "important", false);
    var strategyOptions = {
        reporter: reporter,
        batchProcessor: batchProcessor,
        stateHandler: stateHandler,
        idHandler: idHandler,
        important: importantCssRules
    };

    if(desiredStrategy === "scroll") {
        if (browserDetector.isLegacyOpera()) {
            reporter.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy.");
            desiredStrategy = "object";
        } else if (browserDetector.isIE(9)) {
            reporter.warn("Scroll strategy is not supported on IE9. Changing to object strategy.");
            desiredStrategy = "object";
        }
    }

    if(desiredStrategy === "scroll") {
        detectionStrategy = scrollStrategyMaker(strategyOptions);
    } else if(desiredStrategy === "object") {
        detectionStrategy = objectStrategyMaker(strategyOptions);
    } else {
        throw new Error("Invalid strategy name: " + desiredStrategy);
    }

    //Calls can be made to listenTo with elements that are still being installed.
    //Also, same elements can occur in the elements list in the listenTo function.
    //With this map, the ready callbacks can be synchronized between the calls
    //so that the ready callback can always be called when an element is ready - even if
    //it wasn't installed from the function itself.
    var onReadyCallbacks = {};

    /**
     * Makes the given elements resize-detectable and starts listening to resize events on the elements. Calls the event callback for each event for each element.
     * @public
     * @param {Options?} options Optional options object. These options will override the global options. Some options may not be overriden, such as idHandler.
     * @param {element[]|element} elements The given array of elements to detect resize events of. Single element is also valid.
     * @param {function} listener The callback to be executed for each resize event for each element.
     */
    function listenTo(options, elements, listener) {
        function onResizeCallback(element) {
            var listeners = eventListenerHandler.get(element);
            forEach(listeners, function callListenerProxy(listener) {
                listener(element);
            });
        }

        function addListener(callOnAdd, element, listener) {
            eventListenerHandler.add(element, listener);

            if(callOnAdd) {
                listener(element);
            }
        }

        //Options object may be omitted.
        if(!listener) {
            listener = elements;
            elements = options;
            options = {};
        }

        if(!elements) {
            throw new Error("At least one element required.");
        }

        if(!listener) {
            throw new Error("Listener required.");
        }

        if (isElement(elements)) {
            // A single element has been passed in.
            elements = [elements];
        } else if (isCollection(elements)) {
            // Convert collection to array for plugins.
            // TODO: May want to check so that all the elements in the collection are valid elements.
            elements = toArray(elements);
        } else {
            return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
        }

        var elementsReady = 0;

        var callOnAdd = getOption(options, "callOnAdd", globalOptions.callOnAdd);
        var onReadyCallback = getOption(options, "onReady", function noop() {});
        var debug = getOption(options, "debug", globalOptions.debug);

        forEach(elements, function attachListenerToElement(element) {
            if (!stateHandler.getState(element)) {
                stateHandler.initState(element);
                idHandler.set(element);
            }

            var id = idHandler.get(element);

            debug && reporter.log("Attaching listener to element", id, element);

            if(!elementUtils.isDetectable(element)) {
                debug && reporter.log(id, "Not detectable.");
                if(elementUtils.isBusy(element)) {
                    debug && reporter.log(id, "System busy making it detectable");

                    //The element is being prepared to be detectable. Do not make it detectable.
                    //Just add the listener, because the element will soon be detectable.
                    addListener(callOnAdd, element, listener);
                    onReadyCallbacks[id] = onReadyCallbacks[id] || [];
                    onReadyCallbacks[id].push(function onReady() {
                        elementsReady++;

                        if(elementsReady === elements.length) {
                            onReadyCallback();
                        }
                    });
                    return;
                }

                debug && reporter.log(id, "Making detectable...");
                //The element is not prepared to be detectable, so do prepare it and add a listener to it.
                elementUtils.markBusy(element, true);
                return detectionStrategy.makeDetectable({ debug: debug, important: importantCssRules }, element, function onElementDetectable(element) {
                    debug && reporter.log(id, "onElementDetectable");

                    if (stateHandler.getState(element)) {
                        elementUtils.markAsDetectable(element);
                        elementUtils.markBusy(element, false);
                        detectionStrategy.addListener(element, onResizeCallback);
                        addListener(callOnAdd, element, listener);

                        // Since the element size might have changed since the call to "listenTo", we need to check for this change,
                        // so that a resize event may be emitted.
                        // Having the startSize object is optional (since it does not make sense in some cases such as unrendered elements), so check for its existance before.
                        // Also, check the state existance before since the element may have been uninstalled in the installation process.
                        var state = stateHandler.getState(element);
                        if (state && state.startSize) {
                            var width = element.offsetWidth;
                            var height = element.offsetHeight;
                            if (state.startSize.width !== width || state.startSize.height !== height) {
                                onResizeCallback(element);
                            }
                        }

                        if(onReadyCallbacks[id]) {
                            forEach(onReadyCallbacks[id], function(callback) {
                                callback();
                            });
                        }
                    } else {
                        // The element has been unisntalled before being detectable.
                        debug && reporter.log(id, "Element uninstalled before being detectable.");
                    }

                    delete onReadyCallbacks[id];

                    elementsReady++;
                    if(elementsReady === elements.length) {
                        onReadyCallback();
                    }
                });
            }

            debug && reporter.log(id, "Already detecable, adding listener.");

            //The element has been prepared to be detectable and is ready to be listened to.
            addListener(callOnAdd, element, listener);
            elementsReady++;
        });

        if(elementsReady === elements.length) {
            onReadyCallback();
        }
    }

    function uninstall(elements) {
        if(!elements) {
            return reporter.error("At least one element is required.");
        }

        if (isElement(elements)) {
            // A single element has been passed in.
            elements = [elements];
        } else if (isCollection(elements)) {
            // Convert collection to array for plugins.
            // TODO: May want to check so that all the elements in the collection are valid elements.
            elements = toArray(elements);
        } else {
            return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
        }

        forEach(elements, function (element) {
            eventListenerHandler.removeAllListeners(element);
            detectionStrategy.uninstall(element);
            stateHandler.cleanState(element);
        });
    }

    function initDocument(targetDocument) {
        detectionStrategy.initDocument && detectionStrategy.initDocument(targetDocument);
    }

    return {
        listenTo: listenTo,
        removeListener: eventListenerHandler.removeListener,
        removeAllListeners: eventListenerHandler.removeAllListeners,
        uninstall: uninstall,
        initDocument: initDocument
    };
};

function getOption(options, name, defaultValue) {
    var value = options[name];

    if((value === undefined || value === null) && defaultValue !== undefined) {
        return defaultValue;
    }

    return value;
}


/***/ }),

/***/ "./node_modules/element-resize-detector/src/element-utils.js":
/*!*******************************************************************!*\
  !*** ./node_modules/element-resize-detector/src/element-utils.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(options) {
    var getState = options.stateHandler.getState;

    /**
     * Tells if the element has been made detectable and ready to be listened for resize events.
     * @public
     * @param {element} The element to check.
     * @returns {boolean} True or false depending on if the element is detectable or not.
     */
    function isDetectable(element) {
        var state = getState(element);
        return state && !!state.isDetectable;
    }

    /**
     * Marks the element that it has been made detectable and ready to be listened for resize events.
     * @public
     * @param {element} The element to mark.
     */
    function markAsDetectable(element) {
        getState(element).isDetectable = true;
    }

    /**
     * Tells if the element is busy or not.
     * @public
     * @param {element} The element to check.
     * @returns {boolean} True or false depending on if the element is busy or not.
     */
    function isBusy(element) {
        return !!getState(element).busy;
    }

    /**
     * Marks the object is busy and should not be made detectable.
     * @public
     * @param {element} element The element to mark.
     * @param {boolean} busy If the element is busy or not.
     */
    function markBusy(element, busy) {
        getState(element).busy = !!busy;
    }

    return {
        isDetectable: isDetectable,
        markAsDetectable: markAsDetectable,
        isBusy: isBusy,
        markBusy: markBusy
    };
};


/***/ }),

/***/ "./node_modules/element-resize-detector/src/id-generator.js":
/*!******************************************************************!*\
  !*** ./node_modules/element-resize-detector/src/id-generator.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function() {
    var idCount = 1;

    /**
     * Generates a new unique id in the context.
     * @public
     * @returns {number} A unique id in the context.
     */
    function generate() {
        return idCount++;
    }

    return {
        generate: generate
    };
};


/***/ }),

/***/ "./node_modules/element-resize-detector/src/id-handler.js":
/*!****************************************************************!*\
  !*** ./node_modules/element-resize-detector/src/id-handler.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(options) {
    var idGenerator     = options.idGenerator;
    var getState        = options.stateHandler.getState;

    /**
     * Gets the resize detector id of the element.
     * @public
     * @param {element} element The target element to get the id of.
     * @returns {string|number|null} The id of the element. Null if it has no id.
     */
    function getId(element) {
        var state = getState(element);

        if (state && state.id !== undefined) {
            return state.id;
        }

        return null;
    }

    /**
     * Sets the resize detector id of the element. Requires the element to have a resize detector state initialized.
     * @public
     * @param {element} element The target element to set the id of.
     * @returns {string|number|null} The id of the element.
     */
    function setId(element) {
        var state = getState(element);

        if (!state) {
            throw new Error("setId required the element to have a resize detection state.");
        }

        var id = idGenerator.generate();

        state.id = id;

        return id;
    }

    return {
        get: getId,
        set: setId
    };
};


/***/ }),

/***/ "./node_modules/element-resize-detector/src/listener-handler.js":
/*!**********************************************************************!*\
  !*** ./node_modules/element-resize-detector/src/listener-handler.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function(idHandler) {
    var eventListeners = {};

    /**
     * Gets all listeners for the given element.
     * @public
     * @param {element} element The element to get all listeners for.
     * @returns All listeners for the given element.
     */
    function getListeners(element) {
        var id = idHandler.get(element);

        if (id === undefined) {
            return [];
        }

        return eventListeners[id] || [];
    }

    /**
     * Stores the given listener for the given element. Will not actually add the listener to the element.
     * @public
     * @param {element} element The element that should have the listener added.
     * @param {function} listener The callback that the element has added.
     */
    function addListener(element, listener) {
        var id = idHandler.get(element);

        if(!eventListeners[id]) {
            eventListeners[id] = [];
        }

        eventListeners[id].push(listener);
    }

    function removeListener(element, listener) {
        var listeners = getListeners(element);
        for (var i = 0, len = listeners.length; i < len; ++i) {
            if (listeners[i] === listener) {
              listeners.splice(i, 1);
              break;
            }
        }
    }

    function removeAllListeners(element) {
      var listeners = getListeners(element);
      if (!listeners) { return; }
      listeners.length = 0;
    }

    return {
        get: getListeners,
        add: addListener,
        removeListener: removeListener,
        removeAllListeners: removeAllListeners
    };
};


/***/ }),

/***/ "./node_modules/element-resize-detector/src/reporter.js":
/*!**************************************************************!*\
  !*** ./node_modules/element-resize-detector/src/reporter.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global console: false */

/**
 * Reporter that handles the reporting of logs, warnings and errors.
 * @public
 * @param {boolean} quiet Tells if the reporter should be quiet or not.
 */
module.exports = function(quiet) {
    function noop() {
        //Does nothing.
    }

    var reporter = {
        log: noop,
        warn: noop,
        error: noop
    };

    if(!quiet && window.console) {
        var attachFunction = function(reporter, name) {
            //The proxy is needed to be able to call the method with the console context,
            //since we cannot use bind.
            reporter[name] = function reporterProxy() {
                var f = console[name];
                if (f.apply) { //IE9 does not support console.log.apply :)
                    f.apply(console, arguments);
                } else {
                    for (var i = 0; i < arguments.length; i++) {
                        f(arguments[i]);
                    }
                }
            };
        };

        attachFunction(reporter, "log");
        attachFunction(reporter, "warn");
        attachFunction(reporter, "error");
    }

    return reporter;
};

/***/ }),

/***/ "./node_modules/element-resize-detector/src/state-handler.js":
/*!*******************************************************************!*\
  !*** ./node_modules/element-resize-detector/src/state-handler.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var prop = "_erd";

function initState(element) {
    element[prop] = {};
    return getState(element);
}

function getState(element) {
    return element[prop];
}

function cleanState(element) {
    delete element[prop];
}

module.exports = {
    initState: initState,
    getState: getState,
    cleanState: cleanState
};


/***/ }),

/***/ "./node_modules/invariant/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/invariant/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (true) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ "./node_modules/lodash.isequal/index.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash.isequal/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/react-draggable/web/react-draggable.min.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-draggable/web/react-draggable.min.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__(/*! react */ "./node_modules/react/index.js"),__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js")):undefined}(window,function(t,e){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=9)}([function(t,e,n){t.exports=n(11)()},function(t,e,n){"use strict";function r(t,e){for(var n=0,r=t.length;n<r;n++)if(e.apply(e,[t[n],n,t]))return t[n]}function o(t){return"function"==typeof t||"[object Function]"===Object.prototype.toString.call(t)}function a(t){return"number"==typeof t&&!isNaN(t)}function i(t){return parseInt(t,10)}function c(t,e,n){if(t[e])return new Error("Invalid prop ".concat(e," passed to ").concat(n," - do not set this, set it on the child."))}n.d(e,"b",function(){return r}),n.d(e,"d",function(){return o}),n.d(e,"e",function(){return a}),n.d(e,"c",function(){return i}),n.d(e,"a",function(){return c})},function(t,e,n){"use strict";var r=n(1),o=["Moz","Webkit","O","ms"];function a(t,e){return e?"".concat(e).concat(function(t){for(var e="",n=!0,r=0;r<t.length;r++)n?(e+=t[r].toUpperCase(),n=!1):"-"===t[r]?n=!0:e+=t[r];return e}(t)):t}var i=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"transform";if("undefined"==typeof window||void 0===window.document)return"";var e=window.document.documentElement.style;if(t in e)return"";for(var n=0;n<o.length;n++)if(a(t,o[n])in e)return o[n];return""}();function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n.d(e,"i",function(){return f}),n.d(e,"a",function(){return p}),n.d(e,"m",function(){return d}),n.d(e,"k",function(){return g}),n.d(e,"l",function(){return b}),n.d(e,"g",function(){return y}),n.d(e,"h",function(){return h}),n.d(e,"j",function(){return m}),n.d(e,"c",function(){return O}),n.d(e,"d",function(){return v}),n.d(e,"e",function(){return w}),n.d(e,"f",function(){return D}),n.d(e,"b",function(){return S}),n.d(e,"n",function(){return x}),n.d(e,"o",function(){return P});var s="";function l(t,e){return s||(s=Object(r.b)(["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"],function(e){return Object(r.d)(t[e])})),!!Object(r.d)(t[s])&&t[s](e)}function f(t,e,n){var r=t;do{if(l(r,e))return!0;if(r===n)return!1;r=r.parentNode}while(r);return!1}function p(t,e,n){t&&(t.attachEvent?t.attachEvent("on"+e,n):t.addEventListener?t.addEventListener(e,n,!0):t["on"+e]=n)}function d(t,e,n){t&&(t.detachEvent?t.detachEvent("on"+e,n):t.removeEventListener?t.removeEventListener(e,n,!0):t["on"+e]=null)}function g(t){var e=t.clientHeight,n=t.ownerDocument.defaultView.getComputedStyle(t);return e+=Object(r.c)(n.borderTopWidth),e+=Object(r.c)(n.borderBottomWidth)}function b(t){var e=t.clientWidth,n=t.ownerDocument.defaultView.getComputedStyle(t);return e+=Object(r.c)(n.borderLeftWidth),e+=Object(r.c)(n.borderRightWidth)}function y(t){var e=t.clientHeight,n=t.ownerDocument.defaultView.getComputedStyle(t);return e-=Object(r.c)(n.paddingTop),e-=Object(r.c)(n.paddingBottom)}function h(t){var e=t.clientWidth,n=t.ownerDocument.defaultView.getComputedStyle(t);return e-=Object(r.c)(n.paddingLeft),e-=Object(r.c)(n.paddingRight)}function m(t,e){var n=e===e.ownerDocument.body?{left:0,top:0}:e.getBoundingClientRect();return{x:t.clientX+e.scrollLeft-n.left,y:t.clientY+e.scrollTop-n.top}}function O(t,e){var n=j(t,e,"px");return u({},a("transform",i),n)}function v(t,e){return j(t,e,"")}function j(t,e,n){var r=t.x,o=t.y,a="translate(".concat(r).concat(n,",").concat(o).concat(n,")");if(e){var i="".concat("string"==typeof e.x?e.x:e.x+n),c="".concat("string"==typeof e.y?e.y:e.y+n);a="translate(".concat(i,", ").concat(c,")")+a}return a}function w(t,e){return t.targetTouches&&Object(r.b)(t.targetTouches,function(t){return e===t.identifier})||t.changedTouches&&Object(r.b)(t.changedTouches,function(t){return e===t.identifier})}function D(t){return t.targetTouches&&t.targetTouches[0]?t.targetTouches[0].identifier:t.changedTouches&&t.changedTouches[0]?t.changedTouches[0].identifier:void 0}function S(t){if(t){var e,n,r=t.getElementById("react-draggable-style-el");r||((r=t.createElement("style")).type="text/css",r.id="react-draggable-style-el",r.innerHTML=".react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n",r.innerHTML+=".react-draggable-transparent-selection *::selection {all: inherit;}\n",t.getElementsByTagName("head")[0].appendChild(r)),t.body&&(e=t.body,n="react-draggable-transparent-selection",e.classList?e.classList.add(n):e.className.match(new RegExp("(?:^|\\s)".concat(n,"(?!\\S)")))||(e.className+=" ".concat(n)))}}function x(t){try{t&&t.body&&(e=t.body,n="react-draggable-transparent-selection",e.classList?e.classList.remove(n):e.className=e.className.replace(new RegExp("(?:^|\\s)".concat(n,"(?!\\S)"),"g"),"")),t.selection?t.selection.empty():window.getSelection().removeAllRanges()}catch(t){}var e,n}function P(){return function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(n,!0).forEach(function(e){u(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}({touchAction:"none"},arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}},function(t,e,n){"use strict";n.d(e,"e",function(){return c}),n.d(e,"g",function(){return u}),n.d(e,"a",function(){return s}),n.d(e,"b",function(){return l}),n.d(e,"f",function(){return f}),n.d(e,"c",function(){return p}),n.d(e,"d",function(){return d});var r=n(1),o=n(6),a=n.n(o),i=n(2);function c(t,e,n){if(!t.props.bounds)return[e,n];var o=t.props.bounds;o="string"==typeof o?o:function(t){return{left:t.left,top:t.top,right:t.right,bottom:t.bottom}}(o);var a=g(t);if("string"==typeof o){var c,u=a.ownerDocument,s=u.defaultView;if(!((c="parent"===o?a.parentNode:u.querySelector(o))instanceof s.HTMLElement))throw new Error('Bounds selector "'+o+'" could not find an element.');var l=s.getComputedStyle(a),f=s.getComputedStyle(c);o={left:-a.offsetLeft+Object(r.c)(f.paddingLeft)+Object(r.c)(l.marginLeft),top:-a.offsetTop+Object(r.c)(f.paddingTop)+Object(r.c)(l.marginTop),right:Object(i.h)(c)-Object(i.l)(a)-a.offsetLeft+Object(r.c)(f.paddingRight)-Object(r.c)(l.marginRight),bottom:Object(i.g)(c)-Object(i.k)(a)-a.offsetTop+Object(r.c)(f.paddingBottom)-Object(r.c)(l.marginBottom)}}return Object(r.e)(o.right)&&(e=Math.min(e,o.right)),Object(r.e)(o.bottom)&&(n=Math.min(n,o.bottom)),Object(r.e)(o.left)&&(e=Math.max(e,o.left)),Object(r.e)(o.top)&&(n=Math.max(n,o.top)),[e,n]}function u(t,e,n){return[Math.round(e/t[0])*t[0],Math.round(n/t[1])*t[1]]}function s(t){return"both"===t.props.axis||"x"===t.props.axis}function l(t){return"both"===t.props.axis||"y"===t.props.axis}function f(t,e,n){var r="number"==typeof e?Object(i.e)(t,e):null;if("number"==typeof e&&!r)return null;var o=g(n),a=n.props.offsetParent||o.offsetParent||o.ownerDocument.body;return Object(i.j)(r||t,a)}function p(t,e,n){var o=t.state,a=!Object(r.e)(o.lastX),i=g(t);return a?{node:i,deltaX:0,deltaY:0,lastX:e,lastY:n,x:e,y:n}:{node:i,deltaX:e-o.lastX,deltaY:n-o.lastY,lastX:o.lastX,lastY:o.lastY,x:e,y:n}}function d(t,e){var n=t.props.scale;return{node:e.node,x:t.state.x+e.deltaX/n,y:t.state.y+e.deltaY/n,deltaX:e.deltaX/n,deltaY:e.deltaY/n,lastX:t.state.x,lastY:t.state.y}}function g(t){var e=a.a.findDOMNode(t);if(!e)throw new Error("<DraggableCore>: Unmounted during event!");return e}},function(t,e,n){"use strict";function r(){}n.d(e,"a",function(){return r})},function(e,n){e.exports=t},function(t,n){t.exports=e},function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return w});var r=n(5),o=n.n(r),a=n(0),i=n.n(a),c=n(6),u=n.n(c),s=n(2),l=n(3),f=n(1),p=n(4);function d(t){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function g(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=t[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,a=t}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function b(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function y(t){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function h(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function m(t,e){return(m=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function O(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var v={touch:{start:"touchstart",move:"touchmove",stop:"touchend"},mouse:{start:"mousedown",move:"mousemove",stop:"mouseup"}},j=v.mouse,w=function(t){function e(){var t,n,r,o;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var a=arguments.length,i=new Array(a),c=0;c<a;c++)i[c]=arguments[c];return r=this,o=(t=y(e)).call.apply(t,[this].concat(i)),n=!o||"object"!==d(o)&&"function"!=typeof o?h(r):o,O(h(n),"state",{dragging:!1,lastX:NaN,lastY:NaN,touchIdentifier:null}),O(h(n),"handleDragStart",function(t){if(n.props.onMouseDown(t),!n.props.allowAnyClick&&"number"==typeof t.button&&0!==t.button)return!1;var e=u.a.findDOMNode(h(n));if(!e||!e.ownerDocument||!e.ownerDocument.body)throw new Error("<DraggableCore> not mounted on DragStart!");var r=e.ownerDocument;if(!(n.props.disabled||!(t.target instanceof r.defaultView.Node)||n.props.handle&&!Object(s.i)(t.target,n.props.handle,e)||n.props.cancel&&Object(s.i)(t.target,n.props.cancel,e))){var o=Object(s.f)(t);n.setState({touchIdentifier:o});var a=Object(l.f)(t,o,h(n));if(null!=a){var i=a.x,c=a.y,f=Object(l.c)(h(n),i,c);Object(p.a)("DraggableCore: handleDragStart: %j",f),Object(p.a)("calling",n.props.onStart),!1!==n.props.onStart(t,f)&&(n.props.enableUserSelectHack&&Object(s.b)(r),n.setState({dragging:!0,lastX:i,lastY:c}),Object(s.a)(r,j.move,n.handleDrag),Object(s.a)(r,j.stop,n.handleDragStop))}}}),O(h(n),"handleDrag",function(t){"touchmove"===t.type&&t.preventDefault();var e=Object(l.f)(t,n.state.touchIdentifier,h(n));if(null!=e){var r=e.x,o=e.y;if(Array.isArray(n.props.grid)){var a=r-n.state.lastX,i=o-n.state.lastY,c=g(Object(l.g)(n.props.grid,a,i),2);if(a=c[0],i=c[1],!a&&!i)return;r=n.state.lastX+a,o=n.state.lastY+i}var u=Object(l.c)(h(n),r,o);if(Object(p.a)("DraggableCore: handleDrag: %j",u),!1!==n.props.onDrag(t,u))n.setState({lastX:r,lastY:o});else try{n.handleDragStop(new MouseEvent("mouseup"))}catch(t){var s=document.createEvent("MouseEvents");s.initMouseEvent("mouseup",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),n.handleDragStop(s)}}}),O(h(n),"handleDragStop",function(t){if(n.state.dragging){var e=Object(l.f)(t,n.state.touchIdentifier,h(n));if(null!=e){var r=e.x,o=e.y,a=Object(l.c)(h(n),r,o),i=u.a.findDOMNode(h(n));i&&n.props.enableUserSelectHack&&Object(s.n)(i.ownerDocument),Object(p.a)("DraggableCore: handleDragStop: %j",a),n.setState({dragging:!1,lastX:NaN,lastY:NaN}),n.props.onStop(t,a),i&&(Object(p.a)("DraggableCore: Removing handlers"),Object(s.m)(i.ownerDocument,j.move,n.handleDrag),Object(s.m)(i.ownerDocument,j.stop,n.handleDragStop))}}}),O(h(n),"onMouseDown",function(t){return j=v.mouse,n.handleDragStart(t)}),O(h(n),"onMouseUp",function(t){return j=v.mouse,n.handleDragStop(t)}),O(h(n),"onTouchStart",function(t){return j=v.touch,n.handleDragStart(t)}),O(h(n),"onTouchEnd",function(t){return j=v.touch,n.handleDragStop(t)}),n}var n,r,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&m(t,e)}(e,o.a.Component),n=e,(r=[{key:"componentWillUnmount",value:function(){var t=u.a.findDOMNode(this);if(t){var e=t.ownerDocument;Object(s.m)(e,v.mouse.move,this.handleDrag),Object(s.m)(e,v.touch.move,this.handleDrag),Object(s.m)(e,v.mouse.stop,this.handleDragStop),Object(s.m)(e,v.touch.stop,this.handleDragStop),this.props.enableUserSelectHack&&Object(s.n)(e)}}},{key:"render",value:function(){return o.a.cloneElement(o.a.Children.only(this.props.children),{style:Object(s.o)(this.props.children.props.style),onMouseDown:this.onMouseDown,onTouchStart:this.onTouchStart,onMouseUp:this.onMouseUp,onTouchEnd:this.onTouchEnd})}}])&&b(n.prototype,r),a&&b(n,a),e}();O(w,"displayName","DraggableCore"),O(w,"propTypes",{allowAnyClick:i.a.bool,disabled:i.a.bool,enableUserSelectHack:i.a.bool,offsetParent:function(t,e){if(t[e]&&1!==t[e].nodeType)throw new Error("Draggable's offsetParent must be a DOM Node.")},grid:i.a.arrayOf(i.a.number),handle:i.a.string,cancel:i.a.string,onStart:i.a.func,onDrag:i.a.func,onStop:i.a.func,onMouseDown:i.a.func,className:f.a,style:f.a,transform:f.a}),O(w,"defaultProps",{allowAnyClick:!1,cancel:null,disabled:!1,enableUserSelectHack:!0,offsetParent:null,handle:null,grid:null,transform:null,onStart:function(){},onDrag:function(){},onStop:function(){},onMouseDown:function(){}})},function(t,e,n){var r;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var a=typeof r;if("string"===a||"number"===a)t.push(r);else if(Array.isArray(r)&&r.length){var i=o.apply(null,r);i&&t.push(i)}else if("object"===a)for(var c in r)n.call(r,c)&&r[c]&&t.push(c)}}return t.join(" ")}t.exports?(o.default=o,t.exports=o):void 0===(r=function(){return o}.apply(e,[]))||(t.exports=r)}()},function(t,e,n){var r=n(10).default;t.exports=r,t.exports.default=r,t.exports.DraggableCore=n(7).default},function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return T});var r=n(5),o=n.n(r),a=n(0),i=n.n(a),c=n(6),u=n.n(c),s=n(8),l=n.n(s),f=n(2),p=n(3),d=n(1),g=n(7),b=n(4);function y(t){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function h(){return(h=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function m(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},a=Object.keys(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}function O(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=t[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,a=t}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function v(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function j(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?v(n,!0).forEach(function(e){E(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):v(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function w(t){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function D(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function S(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function x(t,e,n){return e&&S(t.prototype,e),n&&S(t,n),t}function P(t,e){return(P=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function E(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var T=function(t){function e(t){var n,r,o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),r=this,o=w(e).call(this,t),n=!o||"object"!==y(o)&&"function"!=typeof o?D(r):o,E(D(n),"onDragStart",function(t,e){if(Object(b.a)("Draggable: onDragStart: %j",e),!1===n.props.onStart(t,Object(p.d)(D(n),e)))return!1;n.setState({dragging:!0,dragged:!0})}),E(D(n),"onDrag",function(t,e){if(!n.state.dragging)return!1;Object(b.a)("Draggable: onDrag: %j",e);var r=Object(p.d)(D(n),e),o={x:r.x,y:r.y};if(n.props.bounds){var a=o.x,i=o.y;o.x+=n.state.slackX,o.y+=n.state.slackY;var c=O(Object(p.e)(D(n),o.x,o.y),2),u=c[0],s=c[1];o.x=u,o.y=s,o.slackX=n.state.slackX+(a-o.x),o.slackY=n.state.slackY+(i-o.y),r.x=o.x,r.y=o.y,r.deltaX=o.x-n.state.x,r.deltaY=o.y-n.state.y}if(!1===n.props.onDrag(t,r))return!1;n.setState(o)}),E(D(n),"onDragStop",function(t,e){if(!n.state.dragging)return!1;if(!1===n.props.onStop(t,Object(p.d)(D(n),e)))return!1;Object(b.a)("Draggable: onDragStop: %j",e);var r={dragging:!1,slackX:0,slackY:0};if(Boolean(n.props.position)){var o=n.props.position,a=o.x,i=o.y;r.x=a,r.y=i}n.setState(r)}),n.state={dragging:!1,dragged:!1,x:t.position?t.position.x:t.defaultPosition.x,y:t.position?t.position.y:t.defaultPosition.y,prevPropsPosition:j({},t.position),slackX:0,slackY:0,isElementSVG:!1},!t.position||t.onDrag||t.onStop||console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element."),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&P(t,e)}(e,o.a.Component),x(e,null,[{key:"getDerivedStateFromProps",value:function(t,e){var n=t.position,r=e.prevPropsPosition;return!n||r&&n.x===r.x&&n.y===r.y?null:(Object(b.a)("Draggable: getDerivedStateFromProps %j",{position:n,prevPropsPosition:r}),{x:n.x,y:n.y,prevPropsPosition:j({},n)})}}]),x(e,[{key:"componentDidMount",value:function(){void 0!==window.SVGElement&&u.a.findDOMNode(this)instanceof window.SVGElement&&this.setState({isElementSVG:!0})}},{key:"componentWillUnmount",value:function(){this.setState({dragging:!1})}},{key:"render",value:function(){var t,e=this.props,n=(e.axis,e.bounds,e.children),r=e.defaultPosition,a=e.defaultClassName,i=e.defaultClassNameDragging,c=e.defaultClassNameDragged,u=e.position,s=e.positionOffset,d=(e.scale,m(e,["axis","bounds","children","defaultPosition","defaultClassName","defaultClassNameDragging","defaultClassNameDragged","position","positionOffset","scale"])),b={},y=null,O=!Boolean(u)||this.state.dragging,v=u||r,w={x:Object(p.a)(this)&&O?this.state.x:v.x,y:Object(p.b)(this)&&O?this.state.y:v.y};this.state.isElementSVG?y=Object(f.d)(w,s):b=Object(f.c)(w,s);var D=l()(n.props.className||"",a,(E(t={},i,this.state.dragging),E(t,c,this.state.dragged),t));return o.a.createElement(g.default,h({},d,{onStart:this.onDragStart,onDrag:this.onDrag,onStop:this.onDragStop}),o.a.cloneElement(o.a.Children.only(n),{className:D,style:j({},n.props.style,{},b),transform:y}))}}]),e}();E(T,"displayName","Draggable"),E(T,"propTypes",j({},g.default.propTypes,{axis:i.a.oneOf(["both","x","y","none"]),bounds:i.a.oneOfType([i.a.shape({left:i.a.number,right:i.a.number,top:i.a.number,bottom:i.a.number}),i.a.string,i.a.oneOf([!1])]),defaultClassName:i.a.string,defaultClassNameDragging:i.a.string,defaultClassNameDragged:i.a.string,defaultPosition:i.a.shape({x:i.a.number,y:i.a.number}),positionOffset:i.a.shape({x:i.a.oneOfType([i.a.number,i.a.string]),y:i.a.oneOfType([i.a.number,i.a.string])}),position:i.a.shape({x:i.a.number,y:i.a.number}),className:d.a,style:d.a,transform:d.a})),E(T,"defaultProps",j({},g.default.defaultProps,{axis:"both",bounds:!1,defaultClassName:"react-draggable",defaultClassNameDragging:"react-draggable-dragging",defaultClassNameDragged:"react-draggable-dragged",defaultPosition:{x:0,y:0},position:null,scale:1}))},function(t,e,n){"use strict";var r=n(12);function o(){}function a(){}a.resetWarningCache=o,t.exports=function(){function t(t,e,n,o,a,i){if(i!==r){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function e(){return t}t.isRequired=t;var n={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:a,resetWarningCache:o};return n.PropTypes=n,n}},function(t,e,n){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}])});
//# sourceMappingURL=react-draggable.min.js.map

/***/ }),

/***/ "./node_modules/react-grid-layout/build/GridItem.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-grid-layout/build/GridItem.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _reactDraggable = __webpack_require__(/*! react-draggable */ "./node_modules/react-grid-layout/node_modules/react-draggable/build/web/react-draggable.min.js");

var _reactResizable = __webpack_require__(/*! react-resizable */ "./node_modules/react-resizable/index.js");

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/react-grid-layout/build/utils.js");

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * An individual item within a ReactGridLayout.
 */
var GridItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GridItem, _React$Component);

  function GridItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, GridItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GridItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      resizing: null,
      dragging: null,
      className: ""
    });

    _defineProperty(_assertThisInitialized(_this), "currentNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "onDragStart", function (e
    /*: Event*/
    , _ref) {
      var node = _ref.node;
      if (!_this.props.onDragStart) return;
      var newPosition
      /*: PartialPosition*/
      = {
        top: 0,
        left: 0
      }; // TODO: this wont work on nested parents

      var offsetParent = node.offsetParent;
      if (!offsetParent) return;
      var parentRect = offsetParent.getBoundingClientRect();
      var clientRect = node.getBoundingClientRect();
      var cLeft = clientRect.left / _this.props.transformScale;
      var pLeft = parentRect.left / _this.props.transformScale;
      var cTop = clientRect.top / _this.props.transformScale;
      var pTop = parentRect.top / _this.props.transformScale;
      newPosition.left = cLeft - pLeft + offsetParent.scrollLeft;
      newPosition.top = cTop - pTop + offsetParent.scrollTop;

      _this.setState({
        dragging: newPosition
      });

      var _this$calcXY = _this.calcXY(newPosition.top, newPosition.left),
          x = _this$calcXY.x,
          y = _this$calcXY.y;

      return _this.props.onDragStart && _this.props.onDragStart.call(_assertThisInitialized(_this), _this.props.i, x, y, {
        e: e,
        node: node,
        newPosition: newPosition
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDrag", function (e
    /*: Event*/
    , _ref2) {
      var node = _ref2.node,
          deltaX = _ref2.deltaX,
          deltaY = _ref2.deltaY;
      if (!_this.props.onDrag) return;
      var newPosition
      /*: PartialPosition*/
      = {
        top: 0,
        left: 0
      };
      if (!_this.state.dragging) throw new Error("onDrag called before onDragStart.");
      newPosition.left = _this.state.dragging.left + deltaX;
      newPosition.top = _this.state.dragging.top + deltaY;

      _this.setState({
        dragging: newPosition
      });

      var _this$calcXY2 = _this.calcXY(newPosition.top, newPosition.left),
          x = _this$calcXY2.x,
          y = _this$calcXY2.y;

      return _this.props.onDrag && _this.props.onDrag.call(_assertThisInitialized(_this), _this.props.i, x, y, {
        e: e,
        node: node,
        newPosition: newPosition
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDragStop", function (e
    /*: Event*/
    , _ref3) {
      var node = _ref3.node;
      if (!_this.props.onDragStop) return;
      var newPosition
      /*: PartialPosition*/
      = {
        top: 0,
        left: 0
      };
      if (!_this.state.dragging) throw new Error("onDragEnd called before onDragStart.");
      newPosition.left = _this.state.dragging.left;
      newPosition.top = _this.state.dragging.top;

      _this.setState({
        dragging: null
      });

      var _this$calcXY3 = _this.calcXY(newPosition.top, newPosition.left),
          x = _this$calcXY3.x,
          y = _this$calcXY3.y;

      return _this.props.onDragStop && _this.props.onDragStop.call(_assertThisInitialized(_this), _this.props.i, x, y, {
        e: e,
        node: node,
        newPosition: newPosition
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onResizeStop", function (e
    /*: Event*/
    , callbackData
    /*: { node: HTMLElement, size: Position }*/
    ) {
      _this.onResizeHandler(e, callbackData, "onResizeStop");
    });

    _defineProperty(_assertThisInitialized(_this), "onResizeStart", function (e
    /*: Event*/
    , callbackData
    /*: { node: HTMLElement, size: Position }*/
    ) {
      _this.onResizeHandler(e, callbackData, "onResizeStart");
    });

    _defineProperty(_assertThisInitialized(_this), "onResize", function (e
    /*: Event*/
    , callbackData
    /*: { node: HTMLElement, size: Position }*/
    ) {
      _this.onResizeHandler(e, callbackData, "onResize");
    });

    return _this;
  }

  _createClass(GridItem, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps
    /*: Props*/
    ) {
      if (this.props.droppingPosition && prevProps.droppingPosition) {
        this.moveDroppingItem(prevProps);
      }
    }
  }, {
    key: "moveDroppingItem",
    value: function moveDroppingItem(prevProps
    /*: Props*/
    ) {
      var droppingPosition = this.props.droppingPosition;
      var dragging = this.state.dragging;

      if (!droppingPosition || !prevProps.droppingPosition) {
        return;
      }

      if (!this.currentNode) {
        // eslint-disable-next-line react/no-find-dom-node
        this.currentNode = ((_reactDom.default.findDOMNode(this)
        /*: any*/
        )
        /*: HTMLElement*/
        );
      }

      var shouldDrag = dragging && droppingPosition.x !== prevProps.droppingPosition.x || droppingPosition.y !== prevProps.droppingPosition.y;

      if (!dragging) {
        this.onDragStart(droppingPosition.e, {
          node: this.currentNode,
          deltaX: droppingPosition.x,
          deltaY: droppingPosition.y
        });
      } else if (shouldDrag) {
        var deltaX = droppingPosition.x - dragging.left;
        var deltaY = droppingPosition.y - dragging.top;
        this.onDrag(droppingPosition.e, {
          node: this.currentNode,
          deltaX: deltaX,
          deltaY: deltaY
        });
      }
    } // Helper for generating column width

  }, {
    key: "calcColWidth",
    value: function calcColWidth()
    /*: number*/
    {
      var _this$props = this.props,
          margin = _this$props.margin,
          containerPadding = _this$props.containerPadding,
          containerWidth = _this$props.containerWidth,
          cols = _this$props.cols;
      return (containerWidth - margin[0] * (cols - 1) - containerPadding[0] * 2) / cols;
    }
    /**
     * Return position on the page given an x, y, w, h.
     * left, top, width, height are all in pixels.
     * @param  {Number}  x             X coordinate in grid units.
     * @param  {Number}  y             Y coordinate in grid units.
     * @param  {Number}  w             W coordinate in grid units.
     * @param  {Number}  h             H coordinate in grid units.
     * @return {Object}                Object containing coords.
     */

  }, {
    key: "calcPosition",
    value: function calcPosition(x
    /*: number*/
    , y
    /*: number*/
    , w
    /*: number*/
    , h
    /*: number*/
    , state
    /*: ?Object*/
    )
    /*: Position*/
    {
      var _this$props2 = this.props,
          margin = _this$props2.margin,
          containerPadding = _this$props2.containerPadding,
          rowHeight = _this$props2.rowHeight;
      var colWidth = this.calcColWidth();
      var out = {}; // If resizing, use the exact width and height as returned from resizing callbacks.

      if (state && state.resizing) {
        out.width = Math.round(state.resizing.width);
        out.height = Math.round(state.resizing.height);
      } // Otherwise, calculate from grid units.
      else {
          // 0 * Infinity === NaN, which causes problems with resize constraints;
          // Fix this if it occurs.
          // Note we do it here rather than later because Math.round(Infinity) causes deopt
          out.width = w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * margin[0]);
          out.height = h === Infinity ? h : Math.round(rowHeight * h + Math.max(0, h - 1) * margin[1]);
        } // If dragging, use the exact width and height as returned from dragging callbacks.


      if (state && state.dragging) {
        out.top = Math.round(state.dragging.top);
        out.left = Math.round(state.dragging.left);
      } // Otherwise, calculate from grid units.
      else {
          out.top = Math.round((rowHeight + margin[1]) * y + containerPadding[1]);
          out.left = Math.round((colWidth + margin[0]) * x + containerPadding[0]);
        }

      return out;
    }
    /**
     * Translate x and y coordinates from pixels to grid units.
     * @param  {Number} top  Top position (relative to parent) in pixels.
     * @param  {Number} left Left position (relative to parent) in pixels.
     * @return {Object} x and y in grid units.
     */

  }, {
    key: "calcXY",
    value: function calcXY(top
    /*: number*/
    , left
    /*: number*/
    )
    /*: { x: number, y: number }*/
    {
      var _this$props3 = this.props,
          margin = _this$props3.margin,
          cols = _this$props3.cols,
          rowHeight = _this$props3.rowHeight,
          w = _this$props3.w,
          h = _this$props3.h,
          maxRows = _this$props3.maxRows;
      var colWidth = this.calcColWidth(); // left = colWidth * x + margin * (x + 1)
      // l = cx + m(x+1)
      // l = cx + mx + m
      // l - m = cx + mx
      // l - m = x(c + m)
      // (l - m) / (c + m) = x
      // x = (left - margin) / (coldWidth + margin)

      var x = Math.round((left - margin[0]) / (colWidth + margin[0]));
      var y = Math.round((top - margin[1]) / (rowHeight + margin[1])); // Capping

      x = Math.max(Math.min(x, cols - w), 0);
      y = Math.max(Math.min(y, maxRows - h), 0);
      return {
        x: x,
        y: y
      };
    }
    /**
     * Given a height and width in pixel values, calculate grid units.
     * @param  {Number} height Height in pixels.
     * @param  {Number} width  Width in pixels.
     * @return {Object} w, h as grid units.
     */

  }, {
    key: "calcWH",
    value: function calcWH(_ref4)
    /*: { w: number, h: number }*/
    {
      var height = _ref4.height,
          width = _ref4.width;
      var _this$props4 = this.props,
          margin = _this$props4.margin,
          maxRows = _this$props4.maxRows,
          cols = _this$props4.cols,
          rowHeight = _this$props4.rowHeight,
          x = _this$props4.x,
          y = _this$props4.y;
      var colWidth = this.calcColWidth(); // width = colWidth * w - (margin * (w - 1))
      // ...
      // w = (width + margin) / (colWidth + margin)

      var w = Math.round((width + margin[0]) / (colWidth + margin[0]));
      var h = Math.round((height + margin[1]) / (rowHeight + margin[1])); // Capping

      w = Math.max(Math.min(w, cols - x), 0);
      h = Math.max(Math.min(h, maxRows - y), 0);
      return {
        w: w,
        h: h
      };
    }
    /**
     * This is where we set the grid item's absolute placement. It gets a little tricky because we want to do it
     * well when server rendering, and the only way to do that properly is to use percentage width/left because
     * we don't know exactly what the browser viewport is.
     * Unfortunately, CSS Transforms, which are great for performance, break in this instance because a percentage
     * left is relative to the item itself, not its container! So we cannot use them on the server rendering pass.
     *
     * @param  {Object} pos Position object with width, height, left, top.
     * @return {Object}     Style object.
     */

  }, {
    key: "createStyle",
    value: function createStyle(pos
    /*: Position*/
    )
    /*: { [key: string]: ?string }*/
    {
      var _this$props5 = this.props,
          usePercentages = _this$props5.usePercentages,
          containerWidth = _this$props5.containerWidth,
          useCSSTransforms = _this$props5.useCSSTransforms;
      var style; // CSS Transforms support (default)

      if (useCSSTransforms) {
        style = (0, _utils.setTransform)(pos);
      } else {
        // top,left (slow)
        style = (0, _utils.setTopLeft)(pos); // This is used for server rendering.

        if (usePercentages) {
          style.left = (0, _utils.perc)(pos.left / containerWidth);
          style.width = (0, _utils.perc)(pos.width / containerWidth);
        }
      }

      return style;
    }
    /**
     * Mix a Draggable instance into a child.
     * @param  {Element} child    Child element.
     * @return {Element}          Child wrapped in Draggable.
     */

  }, {
    key: "mixinDraggable",
    value: function mixinDraggable(child
    /*: ReactElement<any>*/
    )
    /*: ReactElement<any>*/
    {
      return _react.default.createElement(_reactDraggable.DraggableCore, {
        onStart: this.onDragStart,
        onDrag: this.onDrag,
        onStop: this.onDragStop,
        handle: this.props.handle,
        cancel: ".react-resizable-handle" + (this.props.cancel ? "," + this.props.cancel : ""),
        scale: this.props.transformScale
      }, child);
    }
    /**
     * Mix a Resizable instance into a child.
     * @param  {Element} child    Child element.
     * @param  {Object} position  Position object (pixel values)
     * @return {Element}          Child wrapped in Resizable.
     */

  }, {
    key: "mixinResizable",
    value: function mixinResizable(child
    /*: ReactElement<any>*/
    , position
    /*: Position*/
    )
    /*: ReactElement<any>*/
    {
      var _this$props6 = this.props,
          cols = _this$props6.cols,
          x = _this$props6.x,
          minW = _this$props6.minW,
          minH = _this$props6.minH,
          maxW = _this$props6.maxW,
          maxH = _this$props6.maxH; // This is the max possible width - doesn't go to infinity because of the width of the window

      var maxWidth = this.calcPosition(0, 0, cols - x, 0).width; // Calculate min/max constraints using our min & maxes

      var mins = this.calcPosition(0, 0, minW, minH);
      var maxes = this.calcPosition(0, 0, maxW, maxH);
      var minConstraints = [mins.width, mins.height];
      var maxConstraints = [Math.min(maxes.width, maxWidth), Math.min(maxes.height, Infinity)];
      return _react.default.createElement(_reactResizable.Resizable, {
        width: position.width,
        height: position.height,
        minConstraints: minConstraints,
        maxConstraints: maxConstraints,
        onResizeStop: this.onResizeStop,
        onResizeStart: this.onResizeStart,
        onResize: this.onResize
      }, child);
    }
    /**
     * onDragStart event handler
     * @param  {Event}  e             event data
     * @param  {Object} callbackData  an object with node, delta and position information
     */

  }, {
    key: "onResizeHandler",

    /**
     * Wrapper around drag events to provide more useful data.
     * All drag events call the function with the given handler name,
     * with the signature (index, x, y).
     *
     * @param  {String} handlerName Handler name to wrap.
     * @return {Function}           Handler function.
     */
    value: function onResizeHandler(e
    /*: Event*/
    , _ref5, handlerName
    /*: string*/
    ) {
      var node = _ref5.node,
          size = _ref5.size;
      var handler = this.props[handlerName];
      if (!handler) return;
      var _this$props7 = this.props,
          cols = _this$props7.cols,
          x = _this$props7.x,
          i = _this$props7.i,
          maxW = _this$props7.maxW,
          minW = _this$props7.minW,
          maxH = _this$props7.maxH,
          minH = _this$props7.minH; // Get new XY

      var _this$calcWH = this.calcWH(size),
          w = _this$calcWH.w,
          h = _this$calcWH.h; // Cap w at numCols


      w = Math.min(w, cols - x); // Ensure w is at least 1

      w = Math.max(w, 1); // Min/max capping

      w = Math.max(Math.min(w, maxW), minW);
      h = Math.max(Math.min(h, maxH), minH);
      this.setState({
        resizing: handlerName === "onResizeStop" ? null : size
      });
      handler.call(this, i, w, h, {
        e: e,
        node: node,
        size: size
      });
    }
  }, {
    key: "render",
    value: function render()
    /*: ReactNode*/
    {
      var _this$props8 = this.props,
          x = _this$props8.x,
          y = _this$props8.y,
          w = _this$props8.w,
          h = _this$props8.h,
          isDraggable = _this$props8.isDraggable,
          isResizable = _this$props8.isResizable,
          droppingPosition = _this$props8.droppingPosition,
          useCSSTransforms = _this$props8.useCSSTransforms;
      var pos = this.calcPosition(x, y, w, h, this.state);

      var child = _react.default.Children.only(this.props.children); // Create the child element. We clone the existing element but modify its className and style.


      var newChild = _react.default.cloneElement(child, {
        className: (0, _classnames.default)("react-grid-item", child.props.className, this.props.className, {
          static: this.props.static,
          resizing: Boolean(this.state.resizing),
          "react-draggable": isDraggable,
          "react-draggable-dragging": Boolean(this.state.dragging),
          dropping: Boolean(droppingPosition),
          cssTransforms: useCSSTransforms
        }),
        // We can set the width and height on the child, but unfortunately we can't set the position.
        style: _objectSpread({}, this.props.style, {}, child.props.style, {}, this.createStyle(pos))
      }); // Resizable support. This is usually on but the user can toggle it off.


      if (isResizable) newChild = this.mixinResizable(newChild, pos); // Draggable support. This is always on, except for with placeholders.

      if (isDraggable) newChild = this.mixinDraggable(newChild);
      return newChild;
    }
  }]);

  return GridItem;
}(_react.default.Component);

exports.default = GridItem;

_defineProperty(GridItem, "propTypes", {
  // Children must be only a single element
  children: _propTypes.default.element,
  // General grid attributes
  cols: _propTypes.default.number.isRequired,
  containerWidth: _propTypes.default.number.isRequired,
  rowHeight: _propTypes.default.number.isRequired,
  margin: _propTypes.default.array.isRequired,
  maxRows: _propTypes.default.number.isRequired,
  containerPadding: _propTypes.default.array.isRequired,
  // These are all in grid units
  x: _propTypes.default.number.isRequired,
  y: _propTypes.default.number.isRequired,
  w: _propTypes.default.number.isRequired,
  h: _propTypes.default.number.isRequired,
  // All optional
  minW: function minW(props
  /*: Props*/
  , propName
  /*: string*/
  ) {
    var value = props[propName];
    if (typeof value !== "number") return new Error("minWidth not Number");
    if (value > props.w || value > props.maxW) return new Error("minWidth larger than item width/maxWidth");
  },
  maxW: function maxW(props
  /*: Props*/
  , propName
  /*: string*/
  ) {
    var value = props[propName];
    if (typeof value !== "number") return new Error("maxWidth not Number");
    if (value < props.w || value < props.minW) return new Error("maxWidth smaller than item width/minWidth");
  },
  minH: function minH(props
  /*: Props*/
  , propName
  /*: string*/
  ) {
    var value = props[propName];
    if (typeof value !== "number") return new Error("minHeight not Number");
    if (value > props.h || value > props.maxH) return new Error("minHeight larger than item height/maxHeight");
  },
  maxH: function maxH(props
  /*: Props*/
  , propName
  /*: string*/
  ) {
    var value = props[propName];
    if (typeof value !== "number") return new Error("maxHeight not Number");
    if (value < props.h || value < props.minH) return new Error("maxHeight smaller than item height/minHeight");
  },
  // ID is nice to have for callbacks
  i: _propTypes.default.string.isRequired,
  // Functions
  onDragStop: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onDrag: _propTypes.default.func,
  onResizeStop: _propTypes.default.func,
  onResizeStart: _propTypes.default.func,
  onResize: _propTypes.default.func,
  // Flags
  isDraggable: _propTypes.default.bool.isRequired,
  isResizable: _propTypes.default.bool.isRequired,
  static: _propTypes.default.bool,
  // Use CSS transforms instead of top/left
  useCSSTransforms: _propTypes.default.bool.isRequired,
  transformScale: _propTypes.default.number,
  // Others
  className: _propTypes.default.string,
  // Selector for draggable handle
  handle: _propTypes.default.string,
  // Selector for draggable cancel (see react-draggable)
  cancel: _propTypes.default.string,
  // Current position of a dropping element
  droppingPosition: _propTypes.default.shape({
    e: _propTypes.default.object.isRequired,
    x: _propTypes.default.number.isRequired,
    y: _propTypes.default.number.isRequired
  })
});

_defineProperty(GridItem, "defaultProps", {
  className: "",
  cancel: "",
  handle: "",
  minH: 1,
  minW: 1,
  maxH: Infinity,
  maxW: Infinity,
  transformScale: 1
});

/***/ }),

/***/ "./node_modules/react-grid-layout/build/ReactGridLayout.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-grid-layout/build/ReactGridLayout.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.isequal */ "./node_modules/lodash.isequal/index.js"));

var _classnames = _interopRequireDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/react-grid-layout/build/utils.js");

var _GridItem = _interopRequireDefault(__webpack_require__(/*! ./GridItem */ "./node_modules/react-grid-layout/build/GridItem.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// End Types
var compactType = function compactType(props
/*: Props*/
)
/*: CompactType*/
{
  var _ref = props || {},
      verticalCompact = _ref.verticalCompact,
      compactType = _ref.compactType;

  return verticalCompact === false ? null : compactType;
};

var layoutClassName = "react-grid-layout";
var isFirefox = false; // Try...catch will protect from navigator not existing (e.g. node) or a bad implementation of navigator

try {
  isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
} catch (e) {}
/* Ignore */

/**
 * A reactive, fluid grid layout with draggable, resizable components.
 */


var ReactGridLayout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReactGridLayout, _React$Component);

  // TODO publish internal ReactClass displayName transform
  function ReactGridLayout(props
  /*: Props*/
  , context
  /*: any*/
  )
  /*: void*/
  {
    var _this;

    _classCallCheck(this, ReactGridLayout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactGridLayout).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "state", {
      activeDrag: null,
      layout: (0, _utils.synchronizeLayoutWithChildren)(_this.props.layout, _this.props.children, _this.props.cols, // Legacy support for verticalCompact: false
      compactType(_this.props)),
      mounted: false,
      oldDragItem: null,
      oldLayout: null,
      oldResizeItem: null,
      droppingDOMNode: null,
      children: []
    });

    _defineProperty(_assertThisInitialized(_this), "dragEnterCounter", 0);

    _defineProperty(_assertThisInitialized(_this), "onDragOver", function (e
    /*: DragOverEvent*/
    ) {
      // we should ignore events from layout's children in Firefox
      // to avoid unpredictable jumping of a dropping placeholder
      if (isFirefox && !e.nativeEvent.target.className.includes(layoutClassName)) {
        return false;
      }

      var droppingItem = _this.props.droppingItem;
      var layout = _this.state.layout;
      var _e$nativeEvent = e.nativeEvent,
          layerX = _e$nativeEvent.layerX,
          layerY = _e$nativeEvent.layerY;
      var droppingPosition = {
        x: layerX,
        y: layerY,
        e: e
      };

      if (!_this.state.droppingDOMNode) {
        _this.setState({
          droppingDOMNode: _react.default.createElement("div", {
            key: droppingItem.i
          }),
          droppingPosition: droppingPosition,
          layout: [].concat(_toConsumableArray(layout), [_objectSpread({}, droppingItem, {
            x: 0,
            y: 0,
            static: false,
            isDraggable: true
          })])
        });
      } else if (_this.state.droppingPosition) {
        var shouldUpdatePosition = _this.state.droppingPosition.x != layerX || _this.state.droppingPosition.y != layerY;
        shouldUpdatePosition && _this.setState({
          droppingPosition: droppingPosition
        });
      }

      e.stopPropagation();
      e.preventDefault();
    });

    _defineProperty(_assertThisInitialized(_this), "removeDroppingPlaceholder", function () {
      var _this$props = _this.props,
          droppingItem = _this$props.droppingItem,
          cols = _this$props.cols;
      var layout = _this.state.layout;
      var newLayout = (0, _utils.compact)(layout.filter(function (l) {
        return l.i !== droppingItem.i;
      }), compactType(_this.props), cols);

      _this.setState({
        layout: newLayout,
        droppingDOMNode: null,
        activeDrag: null,
        droppingPosition: undefined
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDragLeave", function () {
      _this.dragEnterCounter--; // onDragLeave can be triggered on each layout's child.
      // But we know that count of dragEnter and dragLeave events
      // will be balanced after leaving the layout's container
      // so we can increase and decrease count of dragEnter and
      // when it'll be equal to 0 we'll remove the placeholder

      if (_this.dragEnterCounter === 0) {
        _this.removeDroppingPlaceholder();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDragEnter", function () {
      _this.dragEnterCounter++;
    });

    _defineProperty(_assertThisInitialized(_this), "onDrop", function () {
      var droppingItem = _this.props.droppingItem;
      var layout = _this.state.layout;

      var _ref2 = layout.find(function (l) {
        return l.i === droppingItem.i;
      }) || {},
          x = _ref2.x,
          y = _ref2.y,
          w = _ref2.w,
          h = _ref2.h; // reset gragEnter counter on drop


      _this.dragEnterCounter = 0;

      _this.removeDroppingPlaceholder();

      _this.props.onDrop({
        x: x,
        y: y,
        w: w,
        h: h
      });
    });

    (0, _utils.autoBindHandlers)(_assertThisInitialized(_this), ["onDragStart", "onDrag", "onDragStop", "onResizeStart", "onResize", "onResizeStop"]);
    return _this;
  }

  _createClass(ReactGridLayout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        mounted: true
      }); // Possibly call back with layout on mount. This should be done after correcting the layout width
      // to ensure we don't rerender with the wrong width.

      this.onLayoutMaybeChanged(this.state.layout, this.props.layout);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps
    /*: Props*/
    , prevState
    /*: State*/
    ) {
      if (!this.state.activeDrag) {
        var newLayout = this.state.layout;
        var oldLayout = prevState.layout;
        this.onLayoutMaybeChanged(newLayout, oldLayout);
      }
    }
    /**
     * Calculates a pixel value for the container.
     * @return {String} Container height in pixels.
     */

  }, {
    key: "containerHeight",
    value: function containerHeight() {
      if (!this.props.autoSize) return;
      var nbRow = (0, _utils.bottom)(this.state.layout);
      var containerPaddingY = this.props.containerPadding ? this.props.containerPadding[1] : this.props.margin[1];
      return nbRow * this.props.rowHeight + (nbRow - 1) * this.props.margin[1] + containerPaddingY * 2 + "px";
    }
    /**
     * When dragging starts
     * @param {String} i Id of the child
     * @param {Number} x X position of the move
     * @param {Number} y Y position of the move
     * @param {Event} e The mousedown event
     * @param {Element} node The current dragging DOM element
     */

  }, {
    key: "onDragStart",
    value: function onDragStart(i
    /*: string*/
    , x
    /*: number*/
    , y
    /*: number*/
    , _ref3) {
      var e = _ref3.e,
          node = _ref3.node;
      var layout = this.state.layout;
      var l = (0, _utils.getLayoutItem)(layout, i);
      if (!l) return;
      this.setState({
        oldDragItem: (0, _utils.cloneLayoutItem)(l),
        oldLayout: this.state.layout
      });
      return this.props.onDragStart(layout, l, l, null, e, node);
    }
    /**
     * Each drag movement create a new dragelement and move the element to the dragged location
     * @param {String} i Id of the child
     * @param {Number} x X position of the move
     * @param {Number} y Y position of the move
     * @param {Event} e The mousedown event
     * @param {Element} node The current dragging DOM element
     */

  }, {
    key: "onDrag",
    value: function onDrag(i
    /*: string*/
    , x
    /*: number*/
    , y
    /*: number*/
    , _ref4) {
      var e = _ref4.e,
          node = _ref4.node;
      var oldDragItem = this.state.oldDragItem;
      var layout = this.state.layout;
      var cols = this.props.cols;
      var l = (0, _utils.getLayoutItem)(layout, i);
      if (!l) return; // Create placeholder (display only)

      var placeholder = {
        w: l.w,
        h: l.h,
        x: l.x,
        y: l.y,
        placeholder: true,
        i: i
      }; // Move the element to the dragged location.

      var isUserAction = true;
      layout = (0, _utils.moveElement)(layout, l, x, y, isUserAction, this.props.preventCollision, compactType(this.props), cols);
      this.props.onDrag(layout, oldDragItem, l, placeholder, e, node);
      this.setState({
        layout: (0, _utils.compact)(layout, compactType(this.props), cols),
        activeDrag: placeholder
      });
    }
    /**
     * When dragging stops, figure out which position the element is closest to and update its x and y.
     * @param  {String} i Index of the child.
     * @param {Number} x X position of the move
     * @param {Number} y Y position of the move
     * @param {Event} e The mousedown event
     * @param {Element} node The current dragging DOM element
     */

  }, {
    key: "onDragStop",
    value: function onDragStop(i
    /*: string*/
    , x
    /*: number*/
    , y
    /*: number*/
    , _ref5) {
      var e = _ref5.e,
          node = _ref5.node;
      var oldDragItem = this.state.oldDragItem;
      var layout = this.state.layout;
      var _this$props2 = this.props,
          cols = _this$props2.cols,
          preventCollision = _this$props2.preventCollision;
      var l = (0, _utils.getLayoutItem)(layout, i);
      if (!l) return; // Move the element here

      var isUserAction = true;
      layout = (0, _utils.moveElement)(layout, l, x, y, isUserAction, preventCollision, compactType(this.props), cols);

      if (this.state.activeDrag) {
        this.props.onDragStop(layout, oldDragItem, l, null, e, node);
      } // Set state


      var newLayout = (0, _utils.compact)(layout, compactType(this.props), cols);
      var oldLayout = this.state.oldLayout;
      this.setState({
        activeDrag: null,
        layout: newLayout,
        oldDragItem: null,
        oldLayout: null
      });
      this.onLayoutMaybeChanged(newLayout, oldLayout);
    }
  }, {
    key: "onLayoutMaybeChanged",
    value: function onLayoutMaybeChanged(newLayout
    /*: Layout*/
    , oldLayout
    /*: ?Layout*/
    ) {
      if (!oldLayout) oldLayout = this.state.layout;

      if (!(0, _lodash.default)(oldLayout, newLayout)) {
        this.props.onLayoutChange(newLayout);
      }
    }
  }, {
    key: "onResizeStart",
    value: function onResizeStart(i
    /*: string*/
    , w
    /*: number*/
    , h
    /*: number*/
    , _ref6) {
      var e = _ref6.e,
          node = _ref6.node;
      var layout = this.state.layout;
      var l = (0, _utils.getLayoutItem)(layout, i);
      if (!l) return;
      this.setState({
        oldResizeItem: (0, _utils.cloneLayoutItem)(l),
        oldLayout: this.state.layout
      });
      this.props.onResizeStart(layout, l, l, null, e, node);
    }
  }, {
    key: "onResize",
    value: function onResize(i
    /*: string*/
    , w
    /*: number*/
    , h
    /*: number*/
    , _ref7) {
      var e = _ref7.e,
          node = _ref7.node;
      var _this$state = this.state,
          layout = _this$state.layout,
          oldResizeItem = _this$state.oldResizeItem;
      var _this$props3 = this.props,
          cols = _this$props3.cols,
          preventCollision = _this$props3.preventCollision;
      var l
      /*: ?LayoutItem*/
      = (0, _utils.getLayoutItem)(layout, i);
      if (!l) return; // Something like quad tree should be used
      // to find collisions faster

      var hasCollisions;

      if (preventCollision) {
        var collisions = (0, _utils.getAllCollisions)(layout, _objectSpread({}, l, {
          w: w,
          h: h
        })).filter(function (layoutItem) {
          return layoutItem.i !== l.i;
        });
        hasCollisions = collisions.length > 0; // If we're colliding, we need adjust the placeholder.

        if (hasCollisions) {
          // adjust w && h to maximum allowed space
          var leastX = Infinity,
              leastY = Infinity;
          collisions.forEach(function (layoutItem) {
            if (layoutItem.x > l.x) leastX = Math.min(leastX, layoutItem.x);
            if (layoutItem.y > l.y) leastY = Math.min(leastY, layoutItem.y);
          });
          if (Number.isFinite(leastX)) l.w = leastX - l.x;
          if (Number.isFinite(leastY)) l.h = leastY - l.y;
        }
      }

      if (!hasCollisions) {
        // Set new width and height.
        l.w = w;
        l.h = h;
      } // Create placeholder element (display only)


      var placeholder = {
        w: l.w,
        h: l.h,
        x: l.x,
        y: l.y,
        static: true,
        i: i
      };
      this.props.onResize(layout, oldResizeItem, l, placeholder, e, node); // Re-compact the layout and set the drag placeholder.

      this.setState({
        layout: (0, _utils.compact)(layout, compactType(this.props), cols),
        activeDrag: placeholder
      });
    }
  }, {
    key: "onResizeStop",
    value: function onResizeStop(i
    /*: string*/
    , w
    /*: number*/
    , h
    /*: number*/
    , _ref8) {
      var e = _ref8.e,
          node = _ref8.node;
      var _this$state2 = this.state,
          layout = _this$state2.layout,
          oldResizeItem = _this$state2.oldResizeItem;
      var cols = this.props.cols;
      var l = (0, _utils.getLayoutItem)(layout, i);
      this.props.onResizeStop(layout, oldResizeItem, l, null, e, node); // Set state

      var newLayout = (0, _utils.compact)(layout, compactType(this.props), cols);
      var oldLayout = this.state.oldLayout;
      this.setState({
        activeDrag: null,
        layout: newLayout,
        oldResizeItem: null,
        oldLayout: null
      });
      this.onLayoutMaybeChanged(newLayout, oldLayout);
    }
    /**
     * Create a placeholder object.
     * @return {Element} Placeholder div.
     */

  }, {
    key: "placeholder",
    value: function placeholder()
    /*: ?ReactElement<any>*/
    {
      var activeDrag = this.state.activeDrag;
      if (!activeDrag) return null;
      var _this$props4 = this.props,
          width = _this$props4.width,
          cols = _this$props4.cols,
          margin = _this$props4.margin,
          containerPadding = _this$props4.containerPadding,
          rowHeight = _this$props4.rowHeight,
          maxRows = _this$props4.maxRows,
          useCSSTransforms = _this$props4.useCSSTransforms,
          transformScale = _this$props4.transformScale; // {...this.state.activeDrag} is pretty slow, actually

      return _react.default.createElement(_GridItem.default, {
        w: activeDrag.w,
        h: activeDrag.h,
        x: activeDrag.x,
        y: activeDrag.y,
        i: activeDrag.i,
        className: "react-grid-placeholder",
        containerWidth: width,
        cols: cols,
        margin: margin,
        containerPadding: containerPadding || margin,
        maxRows: maxRows,
        rowHeight: rowHeight,
        isDraggable: false,
        isResizable: false,
        useCSSTransforms: useCSSTransforms,
        transformScale: transformScale
      }, _react.default.createElement("div", null));
    }
    /**
     * Given a grid item, set its style attributes & surround in a <Draggable>.
     * @param  {Element} child React element.
     * @return {Element}       Element wrapped in draggable and properly placed.
     */

  }, {
    key: "processGridItem",
    value: function processGridItem(child
    /*: ReactElement<any>*/
    , isDroppingItem
    /*: boolean*/
    )
    /*: ?ReactElement<any>*/
    {
      if (!child || !child.key) return;
      var l = (0, _utils.getLayoutItem)(this.state.layout, String(child.key));
      if (!l) return null;
      var _this$props5 = this.props,
          width = _this$props5.width,
          cols = _this$props5.cols,
          margin = _this$props5.margin,
          containerPadding = _this$props5.containerPadding,
          rowHeight = _this$props5.rowHeight,
          maxRows = _this$props5.maxRows,
          isDraggable = _this$props5.isDraggable,
          isResizable = _this$props5.isResizable,
          useCSSTransforms = _this$props5.useCSSTransforms,
          transformScale = _this$props5.transformScale,
          draggableCancel = _this$props5.draggableCancel,
          draggableHandle = _this$props5.draggableHandle;
      var _this$state3 = this.state,
          mounted = _this$state3.mounted,
          droppingPosition = _this$state3.droppingPosition; // Parse 'static'. Any properties defined directly on the grid item will take precedence.

      var draggable = Boolean(!l.static && isDraggable && (l.isDraggable || l.isDraggable == null));
      var resizable = Boolean(!l.static && isResizable && (l.isResizable || l.isResizable == null));
      return _react.default.createElement(_GridItem.default, {
        containerWidth: width,
        cols: cols,
        margin: margin,
        containerPadding: containerPadding || margin,
        maxRows: maxRows,
        rowHeight: rowHeight,
        cancel: draggableCancel,
        handle: draggableHandle,
        onDragStop: this.onDragStop,
        onDragStart: this.onDragStart,
        onDrag: this.onDrag,
        onResizeStart: this.onResizeStart,
        onResize: this.onResize,
        onResizeStop: this.onResizeStop,
        isDraggable: draggable,
        isResizable: resizable,
        useCSSTransforms: useCSSTransforms && mounted,
        usePercentages: !mounted,
        transformScale: transformScale,
        w: l.w,
        h: l.h,
        x: l.x,
        y: l.y,
        i: l.i,
        minH: l.minH,
        minW: l.minW,
        maxH: l.maxH,
        maxW: l.maxW,
        static: l.static,
        droppingPosition: isDroppingItem ? droppingPosition : undefined
      }, child);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props6 = this.props,
          className = _this$props6.className,
          style = _this$props6.style,
          isDroppable = _this$props6.isDroppable;
      var mergedClassName = (0, _classnames.default)(layoutClassName, className);

      var mergedStyle = _objectSpread({
        height: this.containerHeight()
      }, style);

      return _react.default.createElement("div", {
        className: mergedClassName,
        style: mergedStyle,
        onDrop: isDroppable ? this.onDrop : _utils.noop,
        onDragLeave: isDroppable ? this.onDragLeave : _utils.noop,
        onDragEnter: isDroppable ? this.onDragEnter : _utils.noop,
        onDragOver: isDroppable ? this.onDragOver : _utils.noop
      }, _react.default.Children.map(this.props.children, function (child) {
        return _this2.processGridItem(child);
      }), isDroppable && this.state.droppingDOMNode && this.processGridItem(this.state.droppingDOMNode, true), this.placeholder());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps
    /*: Props*/
    , prevState
    /*: State*/
    ) {
      var newLayoutBase;

      if (prevState.activeDrag) {
        return null;
      } // Legacy support for compactType
      // Allow parent to set layout directly.


      if (!(0, _lodash.default)(nextProps.layout, prevState.propsLayout) || nextProps.compactType !== prevState.compactType) {
        newLayoutBase = nextProps.layout;
      } else if (!(0, _utils.childrenEqual)(nextProps.children, prevState.children)) {
        // If children change, also regenerate the layout. Use our state
        // as the base in case because it may be more up to date than
        // what is in props.
        newLayoutBase = prevState.layout;
      } // We need to regenerate the layout.


      if (newLayoutBase) {
        var newLayout = (0, _utils.synchronizeLayoutWithChildren)(newLayoutBase, nextProps.children, nextProps.cols, compactType(nextProps));
        return {
          layout: newLayout,
          // We need to save these props to state for using
          // getDerivedStateFromProps instead of componentDidMount (in which we would get extra rerender)
          compactType: nextProps.compactType,
          children: nextProps.children,
          propsLayout: nextProps.layout
        };
      }

      return null;
    }
  }]);

  return ReactGridLayout;
}(_react.default.Component);

exports.default = ReactGridLayout;

_defineProperty(ReactGridLayout, "displayName", "ReactGridLayout");

_defineProperty(ReactGridLayout, "propTypes", {
  //
  // Basic props
  //
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  // This can be set explicitly. If it is not set, it will automatically
  // be set to the container width. Note that resizes will *not* cause this to adjust.
  // If you need that behavior, use WidthProvider.
  width: _propTypes.default.number,
  // If true, the container height swells and contracts to fit contents
  autoSize: _propTypes.default.bool,
  // # of cols.
  cols: _propTypes.default.number,
  // A selector that will not be draggable.
  draggableCancel: _propTypes.default.string,
  // A selector for the draggable handler
  draggableHandle: _propTypes.default.string,
  // Deprecated
  verticalCompact: function verticalCompact(props
  /*: Props*/
  ) {
    if (props.verticalCompact === false && "development" !== "production") {
      console.warn( // eslint-disable-line no-console
      "`verticalCompact` on <ReactGridLayout> is deprecated and will be removed soon. " + 'Use `compactType`: "horizontal" | "vertical" | null.');
    }
  },
  // Choose vertical or hotizontal compaction
  compactType: _propTypes.default.oneOf(["vertical", "horizontal"]),
  // layout is an array of object with the format:
  // {x: Number, y: Number, w: Number, h: Number, i: String}
  layout: function layout(props
  /*: Props*/
  ) {
    var layout = props.layout; // I hope you're setting the data-grid property on the grid items

    if (layout === undefined) return;
    (0, _utils.validateLayout)(layout, "layout");
  },
  //
  // Grid Dimensions
  //
  // Margin between items [x, y] in px
  margin: _propTypes.default.arrayOf(_propTypes.default.number),
  // Padding inside the container [x, y] in px
  containerPadding: _propTypes.default.arrayOf(_propTypes.default.number),
  // Rows have a static height, but you can change this based on breakpoints if you like
  rowHeight: _propTypes.default.number,
  // Default Infinity, but you can specify a max here if you like.
  // Note that this isn't fully fleshed out and won't error if you specify a layout that
  // extends beyond the row capacity. It will, however, not allow users to drag/resize
  // an item past the barrier. They can push items beyond the barrier, though.
  // Intentionally not documented for this reason.
  maxRows: _propTypes.default.number,
  //
  // Flags
  //
  isDraggable: _propTypes.default.bool,
  isResizable: _propTypes.default.bool,
  // If true, grid items won't change position when being dragged over.
  preventCollision: _propTypes.default.bool,
  // Use CSS transforms instead of top/left
  useCSSTransforms: _propTypes.default.bool,
  // parent layout transform scale
  transformScale: _propTypes.default.number,
  // If true, an external element can trigger onDrop callback with a specific grid position as a parameter
  isDroppable: _propTypes.default.bool,
  //
  // Callbacks
  //
  // Callback so you can save the layout. Calls after each drag & resize stops.
  onLayoutChange: _propTypes.default.func,
  // Calls when drag starts. Callback is of the signature (layout, oldItem, newItem, placeholder, e, ?node).
  // All callbacks below have the same signature. 'start' and 'stop' callbacks omit the 'placeholder'.
  onDragStart: _propTypes.default.func,
  // Calls on each drag movement.
  onDrag: _propTypes.default.func,
  // Calls when drag is complete.
  onDragStop: _propTypes.default.func,
  //Calls when resize starts.
  onResizeStart: _propTypes.default.func,
  // Calls when resize movement happens.
  onResize: _propTypes.default.func,
  // Calls when resize is complete.
  onResizeStop: _propTypes.default.func,
  // Calls when some element is dropped.
  onDrop: _propTypes.default.func,
  //
  // Other validations
  //
  droppingItem: _propTypes.default.shape({
    i: _propTypes.default.string.isRequired,
    w: _propTypes.default.number.isRequired,
    h: _propTypes.default.number.isRequired
  }),
  // Children must not have duplicate keys.
  children: function children(props
  /*: Props*/
  , propName
  /*: string*/
  ) {
    var children = props[propName]; // Check children keys for duplicates. Throw if found.

    var keys = {};

    _react.default.Children.forEach(children, function (child) {
      if (keys[child.key]) {
        throw new Error('Duplicate child key "' + child.key + '" found! This will cause problems in ReactGridLayout.');
      }

      keys[child.key] = true;
    });
  }
});

_defineProperty(ReactGridLayout, "defaultProps", {
  autoSize: true,
  cols: 12,
  className: "",
  style: {},
  draggableHandle: "",
  draggableCancel: "",
  containerPadding: null,
  rowHeight: 150,
  maxRows: Infinity,
  // infinite vertical growth
  layout: [],
  margin: [10, 10],
  isDraggable: true,
  isResizable: true,
  isDroppable: false,
  useCSSTransforms: true,
  transformScale: 1,
  verticalCompact: true,
  compactType: "vertical",
  preventCollision: false,
  droppingItem: {
    i: "__dropping-elem__",
    h: 1,
    w: 1
  },
  onLayoutChange: _utils.noop,
  onDragStart: _utils.noop,
  onDrag: _utils.noop,
  onDragStop: _utils.noop,
  onResizeStart: _utils.noop,
  onResize: _utils.noop,
  onResizeStop: _utils.noop,
  onDrop: _utils.noop
});

/***/ }),

/***/ "./node_modules/react-grid-layout/build/ResponsiveReactGridLayout.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-grid-layout/build/ResponsiveReactGridLayout.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.isequal */ "./node_modules/lodash.isequal/index.js"));

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/react-grid-layout/build/utils.js");

var _responsiveUtils = __webpack_require__(/*! ./responsiveUtils */ "./node_modules/react-grid-layout/build/responsiveUtils.js");

var _ReactGridLayout = _interopRequireDefault(__webpack_require__(/*! ./ReactGridLayout */ "./node_modules/react-grid-layout/build/ReactGridLayout.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var type = function type(obj) {
  return Object.prototype.toString.call(obj);
};
/**
 * Get a value of margin or containerPadding.
 *
 * @param  {Array | Object} param Margin | containerPadding, e.g. [10, 10] | {lg: [10, 10], ...}.
 * @param  {String} breakpoint   Breakpoint: lg, md, sm, xs and etc.
 * @return {Array}
 */


function getIndentationValue(param
/*: { [key: string]: [number, number] } | [number, number]*/
, breakpoint
/*: string*/
) {
  return Array.isArray(param) ? param : param[breakpoint];
}
/*:: type State = {
  layout: Layout,
  breakpoint: string,
  cols: number,
  layouts?: { [key: string]: Layout }
};*/

/*:: type Props<Breakpoint: string = string> = {
  ...$Exact<RGLProps>,

  // Responsive config
  breakpoint: Breakpoint,
  breakpoints: { [key: Breakpoint]: number },
  cols: { [key: Breakpoint]: number },
  layouts: { [key: Breakpoint]: Layout },
  width: number,
  margin: { [key: Breakpoint]: [number, number] } | [number, number],
  containerPadding: { [key: Breakpoint]: [number, number] } | [number, number],

  // Callbacks
  onBreakpointChange: (Breakpoint, cols: number) => void,
  onLayoutChange: (Layout, { [key: Breakpoint]: Layout }) => void,
  onWidthChange: (
    containerWidth: number,
    margin: [number, number],
    cols: number,
    containerPadding: [number, number] | null
  ) => void
};*/


var ResponsiveReactGridLayout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ResponsiveReactGridLayout, _React$Component);

  function ResponsiveReactGridLayout() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ResponsiveReactGridLayout);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ResponsiveReactGridLayout)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", _this.generateInitialState());

    _defineProperty(_assertThisInitialized(_this), "onLayoutChange", function (layout
    /*: Layout*/
    ) {
      _this.props.onLayoutChange(layout, _objectSpread({}, _this.props.layouts, _defineProperty({}, _this.state.breakpoint, layout)));
    });

    return _this;
  }

  _createClass(ResponsiveReactGridLayout, [{
    key: "generateInitialState",
    value: function generateInitialState()
    /*: State*/
    {
      var _this$props = this.props,
          width = _this$props.width,
          breakpoints = _this$props.breakpoints,
          layouts = _this$props.layouts,
          cols = _this$props.cols;
      var breakpoint = (0, _responsiveUtils.getBreakpointFromWidth)(breakpoints, width);
      var colNo = (0, _responsiveUtils.getColsFromBreakpoint)(breakpoint, cols); // verticalCompact compatibility, now deprecated

      var compactType = this.props.verticalCompact === false ? null : this.props.compactType; // Get the initial layout. This can tricky; we try to generate one however possible if one doesn't exist
      // for this layout.

      var initialLayout = (0, _responsiveUtils.findOrGenerateResponsiveLayout)(layouts, breakpoints, breakpoint, breakpoint, colNo, compactType);
      return {
        layout: initialLayout,
        breakpoint: breakpoint,
        cols: colNo
      };
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps
    /*: Props<*>*/
    ) {
      // Allow parent to set width or breakpoint directly.
      if (this.props.width != prevProps.width || this.props.breakpoint !== prevProps.breakpoint || !(0, _lodash.default)(this.props.breakpoints, prevProps.breakpoints) || !(0, _lodash.default)(this.props.cols, prevProps.cols)) {
        this.onWidthChange(this.props);
      }
    } // wrap layouts so we do not need to pass layouts to child

  }, {
    key: "onWidthChange",

    /**
     * When the width changes work through breakpoints and reset state with the new width & breakpoint.
     * Width changes are necessary to figure out the widget widths.
     */
    value: function onWidthChange(nextProps
    /*: Props<*>*/
    ) {
      var breakpoints = nextProps.breakpoints,
          cols = nextProps.cols,
          layouts = nextProps.layouts,
          compactType = nextProps.compactType;
      var newBreakpoint = nextProps.breakpoint || (0, _responsiveUtils.getBreakpointFromWidth)(nextProps.breakpoints, nextProps.width);
      var lastBreakpoint = this.state.breakpoint;
      var newCols
      /*: number*/
      = (0, _responsiveUtils.getColsFromBreakpoint)(newBreakpoint, cols); // Breakpoint change

      if (lastBreakpoint !== newBreakpoint || this.props.breakpoints !== breakpoints || this.props.cols !== cols) {
        // Preserve the current layout if the current breakpoint is not present in the next layouts.
        if (!(lastBreakpoint in layouts)) layouts[lastBreakpoint] = (0, _utils.cloneLayout)(this.state.layout); // Find or generate a new layout.

        var layout = (0, _responsiveUtils.findOrGenerateResponsiveLayout)(layouts, breakpoints, newBreakpoint, lastBreakpoint, newCols, compactType); // This adds missing items.

        layout = (0, _utils.synchronizeLayoutWithChildren)(layout, nextProps.children, newCols, compactType); // Store the new layout.

        layouts[newBreakpoint] = layout; // callbacks

        this.props.onLayoutChange(layout, layouts);
        this.props.onBreakpointChange(newBreakpoint, newCols);
        this.setState({
          breakpoint: newBreakpoint,
          layout: layout,
          cols: newCols
        });
      }

      var margin = getIndentationValue(nextProps.margin, newBreakpoint);
      var containerPadding = getIndentationValue(nextProps.containerPadding, newBreakpoint); //call onWidthChange on every change of width, not only on breakpoint changes

      this.props.onWidthChange(nextProps.width, margin, newCols, containerPadding);
    }
  }, {
    key: "render",
    value: function render() {
      /* eslint-disable no-unused-vars */
      var _this$props2 = this.props,
          breakpoint = _this$props2.breakpoint,
          breakpoints = _this$props2.breakpoints,
          cols = _this$props2.cols,
          layouts = _this$props2.layouts,
          margin = _this$props2.margin,
          containerPadding = _this$props2.containerPadding,
          onBreakpointChange = _this$props2.onBreakpointChange,
          onLayoutChange = _this$props2.onLayoutChange,
          onWidthChange = _this$props2.onWidthChange,
          other = _objectWithoutProperties(_this$props2, ["breakpoint", "breakpoints", "cols", "layouts", "margin", "containerPadding", "onBreakpointChange", "onLayoutChange", "onWidthChange"]);
      /* eslint-enable no-unused-vars */


      return _react.default.createElement(_ReactGridLayout.default, _extends({}, other, {
        margin: getIndentationValue(margin, this.state.breakpoint),
        containerPadding: getIndentationValue(containerPadding, this.state.breakpoint),
        onLayoutChange: this.onLayoutChange,
        layout: this.state.layout,
        cols: this.state.cols
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps
    /*: Props<*>*/
    , prevState
    /*: State*/
    ) {
      if (!(0, _lodash.default)(nextProps.layouts, prevState.layouts)) {
        // Allow parent to set layouts directly.
        var breakpoint = prevState.breakpoint,
            _cols = prevState.cols; // Since we're setting an entirely new layout object, we must generate a new responsive layout
        // if one does not exist.

        var newLayout = (0, _responsiveUtils.findOrGenerateResponsiveLayout)(nextProps.layouts, nextProps.breakpoints, breakpoint, breakpoint, _cols, nextProps.compactType);
        return {
          layout: newLayout,
          layouts: nextProps.layouts
        };
      }

      return null;
    }
  }]);

  return ResponsiveReactGridLayout;
}(_react.default.Component);

exports.default = ResponsiveReactGridLayout;

_defineProperty(ResponsiveReactGridLayout, "propTypes", {
  //
  // Basic props
  //
  // Optional, but if you are managing width yourself you may want to set the breakpoint
  // yourself as well.
  breakpoint: _propTypes.default.string,
  // {name: pxVal}, e.g. {lg: 1200, md: 996, sm: 768, xs: 480}
  breakpoints: _propTypes.default.object,
  // # of cols. This is a breakpoint -> cols map
  cols: _propTypes.default.object,
  // # of margin. This is a breakpoint -> margin map
  // e.g. { lg: [5, 5], md: [10, 10], sm: [15, 15] }
  // Margin between items [x, y] in px
  // e.g. [10, 10]
  margin: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object]),
  // # of containerPadding. This is a breakpoint -> containerPadding map
  // e.g. { lg: [5, 5], md: [10, 10], sm: [15, 15] }
  // Padding inside the container [x, y] in px
  // e.g. [10, 10]
  containerPadding: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object]),
  // layouts is an object mapping breakpoints to layouts.
  // e.g. {lg: Layout, md: Layout, ...}
  layouts: function layouts(props
  /*: Props<>*/
  , propName
  /*: string*/
  ) {
    if (type(props[propName]) !== "[object Object]") {
      throw new Error("Layout property must be an object. Received: " + type(props[propName]));
    }

    Object.keys(props[propName]).forEach(function (key) {
      if (!(key in props.breakpoints)) {
        throw new Error("Each key in layouts must align with a key in breakpoints.");
      }

      (0, _utils.validateLayout)(props.layouts[key], "layouts." + key);
    });
  },
  // The width of this component.
  // Required in this propTypes stanza because generateInitialState() will fail without it.
  width: _propTypes.default.number.isRequired,
  //
  // Callbacks
  //
  // Calls back with breakpoint and new # cols
  onBreakpointChange: _propTypes.default.func,
  // Callback so you can save the layout.
  // Calls back with (currentLayout, allLayouts). allLayouts are keyed by breakpoint.
  onLayoutChange: _propTypes.default.func,
  // Calls back with (containerWidth, margin, cols, containerPadding)
  onWidthChange: _propTypes.default.func
});

_defineProperty(ResponsiveReactGridLayout, "defaultProps", {
  breakpoints: {
    lg: 1200,
    md: 996,
    sm: 768,
    xs: 480,
    xxs: 0
  },
  cols: {
    lg: 12,
    md: 10,
    sm: 6,
    xs: 4,
    xxs: 2
  },
  layouts: {},
  margin: [10, 10],
  containerPadding: {
    lg: null,
    md: null,
    sm: null,
    xs: null,
    xxs: null
  },
  onBreakpointChange: _utils.noop,
  onLayoutChange: _utils.noop,
  onWidthChange: _utils.noop
});

/***/ }),

/***/ "./node_modules/react-grid-layout/build/components/WidthProvider.js":
/*!**************************************************************************!*\
  !*** ./node_modules/react-grid-layout/build/components/WidthProvider.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WidthProvider;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
 * A simple HOC that provides facility for listening to container resizes.
 */
function WidthProvider
/*:: <
  Props,
  ComposedProps: { ...Props, ...WPProps }
>*/
(ComposedComponent
/*: ReactComponentType<Props>*/
)
/*: ReactComponentType<ComposedProps>*/
{
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(WidthProvider, _React$Component);

    function WidthProvider() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, WidthProvider);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WidthProvider)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "state", {
        width: 1280
      });

      _defineProperty(_assertThisInitialized(_this), "mounted", false);

      _defineProperty(_assertThisInitialized(_this), "onWindowResize", function () {
        if (!_this.mounted) return; // eslint-disable-next-line react/no-find-dom-node

        var node = _reactDom.default.findDOMNode(_assertThisInitialized(_this)); // Flow casts this to Text | Element


        if (node instanceof HTMLElement) _this.setState({
          width: node.offsetWidth
        });
      });

      return _this;
    }

    _createClass(WidthProvider, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.mounted = true;
        window.addEventListener("resize", this.onWindowResize); // Call to properly set the breakpoint and resize the elements.
        // Note that if you're doing a full-width element, this can get a little wonky if a scrollbar
        // appears because of the grid. In that case, fire your own resize event, or set `overflow: scroll` on your body.

        this.onWindowResize();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.mounted = false;
        window.removeEventListener("resize", this.onWindowResize);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            measureBeforeMount = _this$props.measureBeforeMount,
            rest = _objectWithoutProperties(_this$props, ["measureBeforeMount"]);

        if (measureBeforeMount && !this.mounted) {
          return _react.default.createElement("div", {
            className: this.props.className,
            style: this.props.style
          });
        }

        return _react.default.createElement(ComposedComponent, _extends({}, rest, this.state));
      }
    }]);

    return WidthProvider;
  }(_react.default.Component), _defineProperty(_class, "defaultProps", {
    measureBeforeMount: false
  }), _defineProperty(_class, "propTypes", {
    // If true, will not render children until mounted. Useful for getting the exact width before
    // rendering, to prevent any unsightly resizing.
    measureBeforeMount: _propTypes.default.bool
  }), _temp;
}

/***/ }),

/***/ "./node_modules/react-grid-layout/build/responsiveUtils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-grid-layout/build/responsiveUtils.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBreakpointFromWidth = getBreakpointFromWidth;
exports.getColsFromBreakpoint = getColsFromBreakpoint;
exports.findOrGenerateResponsiveLayout = findOrGenerateResponsiveLayout;
exports.sortBreakpoints = sortBreakpoints;

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/react-grid-layout/build/utils.js");

/**
 * Given a width, find the highest breakpoint that matches is valid for it (width > breakpoint).
 *
 * @param  {Object} breakpoints Breakpoints object (e.g. {lg: 1200, md: 960, ...})
 * @param  {Number} width Screen width.
 * @return {String}       Highest breakpoint that is less than width.
 */
function getBreakpointFromWidth(breakpoints
/*: Breakpoints*/
, width
/*: number*/
)
/*: Breakpoint*/
{
  var sorted = sortBreakpoints(breakpoints);
  var matching = sorted[0];

  for (var i = 1, len = sorted.length; i < len; i++) {
    var breakpointName = sorted[i];
    if (width > breakpoints[breakpointName]) matching = breakpointName;
  }

  return matching;
}
/**
 * Given a breakpoint, get the # of cols set for it.
 * @param  {String} breakpoint Breakpoint name.
 * @param  {Object} cols       Map of breakpoints to cols.
 * @return {Number}            Number of cols.
 */


function getColsFromBreakpoint(breakpoint
/*: Breakpoint*/
, cols
/*: Breakpoints*/
)
/*: number*/
{
  if (!cols[breakpoint]) {
    throw new Error("ResponsiveReactGridLayout: `cols` entry for breakpoint " + breakpoint + " is missing!");
  }

  return cols[breakpoint];
}
/**
 * Given existing layouts and a new breakpoint, find or generate a new layout.
 *
 * This finds the layout above the new one and generates from it, if it exists.
 *
 * @param  {Object} layouts     Existing layouts.
 * @param  {Array} breakpoints All breakpoints.
 * @param  {String} breakpoint New breakpoint.
 * @param  {String} breakpoint Last breakpoint (for fallback).
 * @param  {Number} cols       Column count at new breakpoint.
 * @param  {Boolean} verticalCompact Whether or not to compact the layout
 *   vertically.
 * @return {Array}             New layout.
 */


function findOrGenerateResponsiveLayout(layouts
/*: ResponsiveLayout*/
, breakpoints
/*: Breakpoints*/
, breakpoint
/*: Breakpoint*/
, lastBreakpoint
/*: Breakpoint*/
, cols
/*: number*/
, compactType
/*: CompactType*/
)
/*: Layout*/
{
  // If it already exists, just return it.
  if (layouts[breakpoint]) return (0, _utils.cloneLayout)(layouts[breakpoint]); // Find or generate the next layout

  var layout = layouts[lastBreakpoint];
  var breakpointsSorted = sortBreakpoints(breakpoints);
  var breakpointsAbove = breakpointsSorted.slice(breakpointsSorted.indexOf(breakpoint));

  for (var i = 0, len = breakpointsAbove.length; i < len; i++) {
    var b = breakpointsAbove[i];

    if (layouts[b]) {
      layout = layouts[b];
      break;
    }
  }

  layout = (0, _utils.cloneLayout)(layout || []); // clone layout so we don't modify existing items

  return (0, _utils.compact)((0, _utils.correctBounds)(layout, {
    cols: cols
  }), compactType, cols);
}
/**
 * Given breakpoints, return an array of breakpoints sorted by width. This is usually
 * e.g. ['xxs', 'xs', 'sm', ...]
 *
 * @param  {Object} breakpoints Key/value pair of breakpoint names to widths.
 * @return {Array}              Sorted breakpoints.
 */


function sortBreakpoints(breakpoints
/*: Breakpoints*/
)
/*: Array<Breakpoint>*/
{
  var keys
  /*: Array<string>*/
  = Object.keys(breakpoints);
  return keys.sort(function (a, b) {
    return breakpoints[a] - breakpoints[b];
  });
}

/***/ }),

/***/ "./node_modules/react-grid-layout/build/utils.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-grid-layout/build/utils.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bottom = bottom;
exports.cloneLayout = cloneLayout;
exports.cloneLayoutItem = cloneLayoutItem;
exports.childrenEqual = childrenEqual;
exports.collides = collides;
exports.compact = compact;
exports.compactItem = compactItem;
exports.correctBounds = correctBounds;
exports.getLayoutItem = getLayoutItem;
exports.getFirstCollision = getFirstCollision;
exports.getAllCollisions = getAllCollisions;
exports.getStatics = getStatics;
exports.moveElement = moveElement;
exports.moveElementAwayFromCollision = moveElementAwayFromCollision;
exports.perc = perc;
exports.setTransform = setTransform;
exports.setTopLeft = setTopLeft;
exports.sortLayoutItems = sortLayoutItems;
exports.sortLayoutItemsByRowCol = sortLayoutItemsByRowCol;
exports.sortLayoutItemsByColRow = sortLayoutItemsByColRow;
exports.synchronizeLayoutWithChildren = synchronizeLayoutWithChildren;
exports.validateLayout = validateLayout;
exports.autoBindHandlers = autoBindHandlers;
exports.noop = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash.isequal */ "./node_modules/lodash.isequal/index.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isProduction = "development" === "production";
var DEBUG = false;
/**
 * Return the bottom coordinate of the layout.
 *
 * @param  {Array} layout Layout array.
 * @return {Number}       Bottom coordinate.
 */

function bottom(layout
/*: Layout*/
)
/*: number*/
{
  var max = 0,
      bottomY;

  for (var i = 0, len = layout.length; i < len; i++) {
    bottomY = layout[i].y + layout[i].h;
    if (bottomY > max) max = bottomY;
  }

  return max;
}

function cloneLayout(layout
/*: Layout*/
)
/*: Layout*/
{
  var newLayout = Array(layout.length);

  for (var i = 0, len = layout.length; i < len; i++) {
    newLayout[i] = cloneLayoutItem(layout[i]);
  }

  return newLayout;
} // Fast path to cloning, since this is monomorphic


function cloneLayoutItem(layoutItem
/*: LayoutItem*/
)
/*: LayoutItem*/
{
  return {
    w: layoutItem.w,
    h: layoutItem.h,
    x: layoutItem.x,
    y: layoutItem.y,
    i: layoutItem.i,
    minW: layoutItem.minW,
    maxW: layoutItem.maxW,
    minH: layoutItem.minH,
    maxH: layoutItem.maxH,
    moved: Boolean(layoutItem.moved),
    static: Boolean(layoutItem.static),
    // These can be null
    isDraggable: layoutItem.isDraggable,
    isResizable: layoutItem.isResizable
  };
}
/**
 * Comparing React `children` is a bit difficult. This is a good way to compare them.
 * This will catch differences in keys, order, and length.
 */


function childrenEqual(a
/*: ReactChildren*/
, b
/*: ReactChildren*/
)
/*: boolean*/
{
  return (0, _lodash.default)(_react.default.Children.map(a, function (c) {
    return c.key;
  }), _react.default.Children.map(b, function (c) {
    return c.key;
  }));
}
/**
 * Given two layoutitems, check if they collide.
 */


function collides(l1
/*: LayoutItem*/
, l2
/*: LayoutItem*/
)
/*: boolean*/
{
  if (l1.i === l2.i) return false; // same element

  if (l1.x + l1.w <= l2.x) return false; // l1 is left of l2

  if (l1.x >= l2.x + l2.w) return false; // l1 is right of l2

  if (l1.y + l1.h <= l2.y) return false; // l1 is above l2

  if (l1.y >= l2.y + l2.h) return false; // l1 is below l2

  return true; // boxes overlap
}
/**
 * Given a layout, compact it. This involves going down each y coordinate and removing gaps
 * between items.
 *
 * @param  {Array} layout Layout.
 * @param  {Boolean} verticalCompact Whether or not to compact the layout
 *   vertically.
 * @return {Array}       Compacted Layout.
 */


function compact(layout
/*: Layout*/
, compactType
/*: CompactType*/
, cols
/*: number*/
)
/*: Layout*/
{
  // Statics go in the compareWith array right away so items flow around them.
  var compareWith = getStatics(layout); // We go through the items by row and column.

  var sorted = sortLayoutItems(layout, compactType); // Holding for new items.

  var out = Array(layout.length);

  for (var i = 0, len = sorted.length; i < len; i++) {
    var l = cloneLayoutItem(sorted[i]); // Don't move static elements

    if (!l.static) {
      l = compactItem(compareWith, l, compactType, cols, sorted); // Add to comparison array. We only collide with items before this one.
      // Statics are already in this array.

      compareWith.push(l);
    } // Add to output array to make sure they still come out in the right order.


    out[layout.indexOf(sorted[i])] = l; // Clear moved flag, if it exists.

    l.moved = false;
  }

  return out;
}

var heightWidth = {
  x: "w",
  y: "h"
};
/**
 * Before moving item down, it will check if the movement will cause collisions and move those items down before.
 */

function resolveCompactionCollision(layout
/*: Layout*/
, item
/*: LayoutItem*/
, moveToCoord
/*: number*/
, axis
/*: "x" | "y"*/
) {
  var sizeProp = heightWidth[axis];
  item[axis] += 1;
  var itemIndex = layout.map(function (layoutItem) {
    return layoutItem.i;
  }).indexOf(item.i); // Go through each item we collide with.

  for (var i = itemIndex + 1; i < layout.length; i++) {
    var otherItem = layout[i]; // Ignore static items

    if (otherItem.static) continue; // Optimization: we can break early if we know we're past this el
    // We can do this b/c it's a sorted layout

    if (otherItem.y > item.y + item.h) break;

    if (collides(item, otherItem)) {
      resolveCompactionCollision(layout, otherItem, moveToCoord + item[sizeProp], axis);
    }
  }

  item[axis] = moveToCoord;
}
/**
 * Compact an item in the layout.
 */


function compactItem(compareWith
/*: Layout*/
, l
/*: LayoutItem*/
, compactType
/*: CompactType*/
, cols
/*: number*/
, fullLayout
/*: Layout*/
)
/*: LayoutItem*/
{
  var compactV = compactType === "vertical";
  var compactH = compactType === "horizontal";

  if (compactV) {
    // Bottom 'y' possible is the bottom of the layout.
    // This allows you to do nice stuff like specify {y: Infinity}
    // This is here because the layout must be sorted in order to get the correct bottom `y`.
    l.y = Math.min(bottom(compareWith), l.y); // Move the element up as far as it can go without colliding.

    while (l.y > 0 && !getFirstCollision(compareWith, l)) {
      l.y--;
    }
  } else if (compactH) {
    l.y = Math.min(bottom(compareWith), l.y); // Move the element left as far as it can go without colliding.

    while (l.x > 0 && !getFirstCollision(compareWith, l)) {
      l.x--;
    }
  } // Move it down, and keep moving it down if it's colliding.


  var collides;

  while (collides = getFirstCollision(compareWith, l)) {
    if (compactH) {
      resolveCompactionCollision(fullLayout, l, collides.x + collides.w, "x");
    } else {
      resolveCompactionCollision(fullLayout, l, collides.y + collides.h, "y");
    } // Since we can't grow without bounds horizontally, if we've overflown, let's move it down and try again.


    if (compactH && l.x + l.w > cols) {
      l.x = cols - l.w;
      l.y++;
    }
  }

  return l;
}
/**
 * Given a layout, make sure all elements fit within its bounds.
 *
 * @param  {Array} layout Layout array.
 * @param  {Number} bounds Number of columns.
 */


function correctBounds(layout
/*: Layout*/
, bounds
/*: { cols: number }*/
)
/*: Layout*/
{
  var collidesWith = getStatics(layout);

  for (var i = 0, len = layout.length; i < len; i++) {
    var l = layout[i]; // Overflows right

    if (l.x + l.w > bounds.cols) l.x = bounds.cols - l.w; // Overflows left

    if (l.x < 0) {
      l.x = 0;
      l.w = bounds.cols;
    }

    if (!l.static) collidesWith.push(l);else {
      // If this is static and collides with other statics, we must move it down.
      // We have to do something nicer than just letting them overlap.
      while (getFirstCollision(collidesWith, l)) {
        l.y++;
      }
    }
  }

  return layout;
}
/**
 * Get a layout item by ID. Used so we can override later on if necessary.
 *
 * @param  {Array}  layout Layout array.
 * @param  {String} id     ID
 * @return {LayoutItem}    Item at ID.
 */


function getLayoutItem(layout
/*: Layout*/
, id
/*: string*/
)
/*: ?LayoutItem*/
{
  for (var i = 0, len = layout.length; i < len; i++) {
    if (layout[i].i === id) return layout[i];
  }
}
/**
 * Returns the first item this layout collides with.
 * It doesn't appear to matter which order we approach this from, although
 * perhaps that is the wrong thing to do.
 *
 * @param  {Object} layoutItem Layout item.
 * @return {Object|undefined}  A colliding layout item, or undefined.
 */


function getFirstCollision(layout
/*: Layout*/
, layoutItem
/*: LayoutItem*/
)
/*: ?LayoutItem*/
{
  for (var i = 0, len = layout.length; i < len; i++) {
    if (collides(layout[i], layoutItem)) return layout[i];
  }
}

function getAllCollisions(layout
/*: Layout*/
, layoutItem
/*: LayoutItem*/
)
/*: Array<LayoutItem>*/
{
  return layout.filter(function (l) {
    return collides(l, layoutItem);
  });
}
/**
 * Get all static elements.
 * @param  {Array} layout Array of layout objects.
 * @return {Array}        Array of static layout items..
 */


function getStatics(layout
/*: Layout*/
)
/*: Array<LayoutItem>*/
{
  return layout.filter(function (l) {
    return l.static;
  });
}
/**
 * Move an element. Responsible for doing cascading movements of other elements.
 *
 * @param  {Array}      layout            Full layout to modify.
 * @param  {LayoutItem} l                 element to move.
 * @param  {Number}     [x]               X position in grid units.
 * @param  {Number}     [y]               Y position in grid units.
 */


function moveElement(layout
/*: Layout*/
, l
/*: LayoutItem*/
, x
/*: ?number*/
, y
/*: ?number*/
, isUserAction
/*: ?boolean*/
, preventCollision
/*: ?boolean*/
, compactType
/*: CompactType*/
, cols
/*: number*/
)
/*: Layout*/
{
  if (l.static) return layout; // Short-circuit if nothing to do.

  if (l.y === y && l.x === x) return layout;
  log("Moving element ".concat(l.i, " to [").concat(String(x), ",").concat(String(y), "] from [").concat(l.x, ",").concat(l.y, "]"));
  var oldX = l.x;
  var oldY = l.y; // This is quite a bit faster than extending the object

  if (typeof x === "number") l.x = x;
  if (typeof y === "number") l.y = y;
  l.moved = true; // If this collides with anything, move it.
  // When doing this comparison, we have to sort the items we compare with
  // to ensure, in the case of multiple collisions, that we're getting the
  // nearest collision.

  var sorted = sortLayoutItems(layout, compactType);
  var movingUp = compactType === "vertical" && typeof y === "number" ? oldY >= y : compactType === "horizontal" && typeof x === "number" ? oldX >= x : false;
  if (movingUp) sorted = sorted.reverse();
  var collisions = getAllCollisions(sorted, l); // There was a collision; abort

  if (preventCollision && collisions.length) {
    log("Collision prevented on ".concat(l.i, ", reverting."));
    l.x = oldX;
    l.y = oldY;
    l.moved = false;
    return layout;
  } // Move each item that collides away from this element.


  for (var i = 0, len = collisions.length; i < len; i++) {
    var collision = collisions[i];
    log("Resolving collision between ".concat(l.i, " at [").concat(l.x, ",").concat(l.y, "] and ").concat(collision.i, " at [").concat(collision.x, ",").concat(collision.y, "]")); // Short circuit so we can't infinite loop

    if (collision.moved) continue; // Don't move static items - we have to move *this* element away

    if (collision.static) {
      layout = moveElementAwayFromCollision(layout, collision, l, isUserAction, compactType, cols);
    } else {
      layout = moveElementAwayFromCollision(layout, l, collision, isUserAction, compactType, cols);
    }
  }

  return layout;
}
/**
 * This is where the magic needs to happen - given a collision, move an element away from the collision.
 * We attempt to move it up if there's room, otherwise it goes below.
 *
 * @param  {Array} layout            Full layout to modify.
 * @param  {LayoutItem} collidesWith Layout item we're colliding with.
 * @param  {LayoutItem} itemToMove   Layout item we're moving.
 */


function moveElementAwayFromCollision(layout
/*: Layout*/
, collidesWith
/*: LayoutItem*/
, itemToMove
/*: LayoutItem*/
, isUserAction
/*: ?boolean*/
, compactType
/*: CompactType*/
, cols
/*: number*/
)
/*: Layout*/
{
  var compactH = compactType === "horizontal"; // Compact vertically if not set to horizontal

  var compactV = compactType !== "horizontal";
  var preventCollision = collidesWith.static; // we're already colliding (not for static items)
  // If there is enough space above the collision to put this element, move it there.
  // We only do this on the main collision as this can get funky in cascades and cause
  // unwanted swapping behavior.

  if (isUserAction) {
    // Reset isUserAction flag because we're not in the main collision anymore.
    isUserAction = false; // Make a mock item so we don't modify the item here, only modify in moveElement.

    var fakeItem
    /*: LayoutItem*/
    = {
      x: compactH ? Math.max(collidesWith.x - itemToMove.w, 0) : itemToMove.x,
      y: compactV ? Math.max(collidesWith.y - itemToMove.h, 0) : itemToMove.y,
      w: itemToMove.w,
      h: itemToMove.h,
      i: "-1"
    }; // No collision? If so, we can go up there; otherwise, we'll end up moving down as normal

    if (!getFirstCollision(layout, fakeItem)) {
      log("Doing reverse collision on ".concat(itemToMove.i, " up to [").concat(fakeItem.x, ",").concat(fakeItem.y, "]."));
      return moveElement(layout, itemToMove, compactH ? fakeItem.x : undefined, compactV ? fakeItem.y : undefined, isUserAction, preventCollision, compactType, cols);
    }
  }

  return moveElement(layout, itemToMove, compactH ? itemToMove.x + 1 : undefined, compactV ? itemToMove.y + 1 : undefined, isUserAction, preventCollision, compactType, cols);
}
/**
 * Helper to convert a number to a percentage string.
 *
 * @param  {Number} num Any number
 * @return {String}     That number as a percentage.
 */


function perc(num
/*: number*/
)
/*: string*/
{
  return num * 100 + "%";
}

function setTransform(_ref)
/*: Object*/
{
  var top = _ref.top,
      left = _ref.left,
      width = _ref.width,
      height = _ref.height;
  // Replace unitless items with px
  var translate = "translate(".concat(left, "px,").concat(top, "px)");
  return {
    transform: translate,
    WebkitTransform: translate,
    MozTransform: translate,
    msTransform: translate,
    OTransform: translate,
    width: "".concat(width, "px"),
    height: "".concat(height, "px"),
    position: "absolute"
  };
}

function setTopLeft(_ref2)
/*: Object*/
{
  var top = _ref2.top,
      left = _ref2.left,
      width = _ref2.width,
      height = _ref2.height;
  return {
    top: "".concat(top, "px"),
    left: "".concat(left, "px"),
    width: "".concat(width, "px"),
    height: "".concat(height, "px"),
    position: "absolute"
  };
}
/**
 * Get layout items sorted from top left to right and down.
 *
 * @return {Array} Array of layout objects.
 * @return {Array}        Layout, sorted static items first.
 */


function sortLayoutItems(layout
/*: Layout*/
, compactType
/*: CompactType*/
)
/*: Layout*/
{
  if (compactType === "horizontal") return sortLayoutItemsByColRow(layout);else return sortLayoutItemsByRowCol(layout);
}

function sortLayoutItemsByRowCol(layout
/*: Layout*/
)
/*: Layout*/
{
  return [].concat(layout).sort(function (a, b) {
    if (a.y > b.y || a.y === b.y && a.x > b.x) {
      return 1;
    } else if (a.y === b.y && a.x === b.x) {
      // Without this, we can get different sort results in IE vs. Chrome/FF
      return 0;
    }

    return -1;
  });
}

function sortLayoutItemsByColRow(layout
/*: Layout*/
)
/*: Layout*/
{
  return [].concat(layout).sort(function (a, b) {
    if (a.x > b.x || a.x === b.x && a.y > b.y) {
      return 1;
    }

    return -1;
  });
}
/**
 * Generate a layout using the initialLayout and children as a template.
 * Missing entries will be added, extraneous ones will be truncated.
 *
 * @param  {Array}  initialLayout Layout passed in through props.
 * @param  {String} breakpoint    Current responsive breakpoint.
 * @param  {?String} compact      Compaction option.
 * @return {Array}                Working layout.
 */


function synchronizeLayoutWithChildren(initialLayout
/*: Layout*/
, children
/*: ReactChildren*/
, cols
/*: number*/
, compactType
/*: CompactType*/
)
/*: Layout*/
{
  initialLayout = initialLayout || []; // Generate one layout item per child.

  var layout
  /*: Layout*/
  = [];

  _react.default.Children.forEach(children, function (child
  /*: ReactElement<any>*/
  , i
  /*: number*/
  ) {
    // Don't overwrite if it already exists.
    var exists = getLayoutItem(initialLayout, String(child.key));

    if (exists) {
      layout[i] = cloneLayoutItem(exists);
    } else {
      if (!isProduction && child.props._grid) {
        console.warn("`_grid` properties on children have been deprecated as of React 15.2. " + // eslint-disable-line
        "Please use `data-grid` or add your properties directly to the `layout`.");
      }

      var g = child.props["data-grid"] || child.props._grid; // Hey, this item has a data-grid property, use it.

      if (g) {
        if (!isProduction) {
          validateLayout([g], "ReactGridLayout.children");
        }

        layout[i] = cloneLayoutItem(_objectSpread({}, g, {
          i: child.key
        }));
      } else {
        // Nothing provided: ensure this is added to the bottom
        layout[i] = cloneLayoutItem({
          w: 1,
          h: 1,
          x: 0,
          y: bottom(layout),
          i: String(child.key)
        });
      }
    }
  }); // Correct the layout.


  layout = correctBounds(layout, {
    cols: cols
  });
  layout = compact(layout, compactType, cols);
  return layout;
}
/**
 * Validate a layout. Throws errors.
 *
 * @param  {Array}  layout        Array of layout items.
 * @param  {String} [contextName] Context name for errors.
 * @throw  {Error}                Validation error.
 */


function validateLayout(layout
/*: Layout*/
)
/*: void*/
{
  var contextName
  /*: string*/
  = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Layout";
  var subProps = ["x", "y", "w", "h"];
  if (!Array.isArray(layout)) throw new Error(contextName + " must be an array!");

  for (var i = 0, len = layout.length; i < len; i++) {
    var item = layout[i];

    for (var j = 0; j < subProps.length; j++) {
      if (typeof item[subProps[j]] !== "number") {
        throw new Error("ReactGridLayout: " + contextName + "[" + i + "]." + subProps[j] + " must be a number!");
      }
    }

    if (item.i && typeof item.i !== "string") {
      throw new Error("ReactGridLayout: " + contextName + "[" + i + "].i must be a string!");
    }

    if (item.static !== undefined && typeof item.static !== "boolean") {
      throw new Error("ReactGridLayout: " + contextName + "[" + i + "].static must be a boolean!");
    }
  }
} // Flow can't really figure this out, so we just use Object


function autoBindHandlers(el
/*: Object*/
, fns
/*: Array<string>*/
)
/*: void*/
{
  fns.forEach(function (key) {
    return el[key] = el[key].bind(el);
  });
}

function log() {
  var _console;

  if (!DEBUG) return; // eslint-disable-next-line no-console

  (_console = console).log.apply(_console, arguments);
}

var noop = function noop() {};

exports.noop = noop;

/***/ }),

/***/ "./node_modules/react-grid-layout/index.js":
/*!*************************************************!*\
  !*** ./node_modules/react-grid-layout/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./build/ReactGridLayout */ "./node_modules/react-grid-layout/build/ReactGridLayout.js").default;
module.exports.utils = __webpack_require__(/*! ./build/utils */ "./node_modules/react-grid-layout/build/utils.js");
module.exports.Responsive = __webpack_require__(/*! ./build/ResponsiveReactGridLayout */ "./node_modules/react-grid-layout/build/ResponsiveReactGridLayout.js").default;
module.exports.Responsive.utils = __webpack_require__(/*! ./build/responsiveUtils */ "./node_modules/react-grid-layout/build/responsiveUtils.js");
module.exports.WidthProvider = __webpack_require__(/*! ./build/components/WidthProvider */ "./node_modules/react-grid-layout/build/components/WidthProvider.js").default;


/***/ }),

/***/ "./node_modules/react-grid-layout/node_modules/react-draggable/build/web/react-draggable.min.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/react-grid-layout/node_modules/react-draggable/build/web/react-draggable.min.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__(/*! react */ "./node_modules/react/index.js"),__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js")):undefined}(window,function(t,e){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=4)}([function(t,e,n){t.exports=n(5)()},function(e,n){e.exports=t},function(t,n){t.exports=e},function(t,e,n){var r;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var t=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var a=typeof r;if("string"===a||"number"===a)t.push(r);else if(Array.isArray(r)&&r.length){var i=o.apply(null,r);i&&t.push(i)}else if("object"===a)for(var s in r)n.call(r,s)&&r[s]&&t.push(s)}}return t.join(" ")}t.exports?(o.default=o,t.exports=o):void 0===(r=function(){return o}.apply(e,[]))||(t.exports=r)}()},function(t,e,n){var r=n(7),o=r.default,a=r.DraggableCore;t.exports=o,t.exports.default=o,t.exports.DraggableCore=a},function(t,e,n){"use strict";var r=n(6);function o(){}function a(){}a.resetWarningCache=o,t.exports=function(){function t(t,e,n,o,a,i){if(i!==r){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function e(){return t}t.isRequired=t;var n={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:a,resetWarningCache:o};return n.PropTypes=n,n}},function(t,e,n){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(t,e,n){"use strict";n.r(e);var r=n(1),o=n.n(r),a=n(0),i=n.n(a),s=n(2),u=n.n(s),c=n(3),l=n.n(c);function f(t,e){for(var n=0,r=t.length;n<r;n++)if(e.apply(e,[t[n],n,t]))return t[n]}function p(t){return"function"==typeof t||"[object Function]"===Object.prototype.toString.call(t)}function d(t){return"number"==typeof t&&!isNaN(t)}function g(t){return parseInt(t,10)}function y(t,e,n){if(t[e])return new Error("Invalid prop ".concat(e," passed to ").concat(n," - do not set this, set it on the child."))}var h=["Moz","Webkit","O","ms"];function b(t,e){return e?"".concat(e).concat(function(t){for(var e="",n=!0,r=0;r<t.length;r++)n?(e+=t[r].toUpperCase(),n=!1):"-"===t[r]?n=!0:e+=t[r];return e}(t)):t}var m=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"transform";if("undefined"==typeof window||void 0===window.document)return"";var e=window.document.documentElement.style;if(t in e)return"";for(var n=0;n<h.length;n++)if(b(t,h[n])in e)return h[n];return""}();function v(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function w(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var O="";function S(t,e){return O||(O=f(["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"],function(e){return p(t[e])})),!!p(t[O])&&t[O](e)}function D(t,e,n){var r=t;do{if(S(r,e))return!0;if(r===n)return!1;r=r.parentNode}while(r);return!1}function x(t,e,n){t&&(t.attachEvent?t.attachEvent("on"+e,n):t.addEventListener?t.addEventListener(e,n,!0):t["on"+e]=n)}function P(t,e,n){t&&(t.detachEvent?t.detachEvent("on"+e,n):t.removeEventListener?t.removeEventListener(e,n,!0):t["on"+e]=null)}function j(t){var e=t.clientHeight,n=t.ownerDocument.defaultView.getComputedStyle(t);return e+=g(n.borderTopWidth),e+=g(n.borderBottomWidth)}function E(t){var e=t.clientWidth,n=t.ownerDocument.defaultView.getComputedStyle(t);return e+=g(n.borderLeftWidth),e+=g(n.borderRightWidth)}function T(t){var e=t.clientHeight,n=t.ownerDocument.defaultView.getComputedStyle(t);return e-=g(n.paddingTop),e-=g(n.paddingBottom)}function N(t){var e=t.clientWidth,n=t.ownerDocument.defaultView.getComputedStyle(t);return e-=g(n.paddingLeft),e-=g(n.paddingRight)}function C(t,e,n){var r=t.x,o=t.y,a="translate(".concat(r).concat(n,",").concat(o).concat(n,")");if(e){var i="".concat("string"==typeof e.x?e.x:e.x+n),s="".concat("string"==typeof e.y?e.y:e.y+n);a="translate(".concat(i,", ").concat(s,")")+a}return a}function M(t){if(t){var e,n,r=t.getElementById("react-draggable-style-el");r||((r=t.createElement("style")).type="text/css",r.id="react-draggable-style-el",r.innerHTML=".react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n",r.innerHTML+=".react-draggable-transparent-selection *::selection {all: inherit;}\n",t.getElementsByTagName("head")[0].appendChild(r)),t.body&&(e=t.body,n="react-draggable-transparent-selection",e.classList?e.classList.add(n):e.className.match(new RegExp("(?:^|\\s)".concat(n,"(?!\\S)")))||(e.className+=" ".concat(n)))}}function k(t){try{t&&t.body&&(e=t.body,n="react-draggable-transparent-selection",e.classList?e.classList.remove(n):e.className=e.className.replace(new RegExp("(?:^|\\s)".concat(n,"(?!\\S)"),"g"),"")),t.selection?t.selection.empty():window.getSelection().removeAllRanges()}catch(t){}var e,n}function _(){return function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?v(n,!0).forEach(function(e){w(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):v(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}({touchAction:"none"},arguments.length>0&&void 0!==arguments[0]?arguments[0]:{})}function X(t){return"both"===t.props.axis||"x"===t.props.axis}function Y(t){return"both"===t.props.axis||"y"===t.props.axis}function L(t,e,n){var r="number"==typeof e?function(t,e){return t.targetTouches&&f(t.targetTouches,function(t){return e===t.identifier})||t.changedTouches&&f(t.changedTouches,function(t){return e===t.identifier})}(t,e):null;if("number"==typeof e&&!r)return null;var o=I(n);return function(t,e,n){var r=e===e.ownerDocument.body?{left:0,top:0}:e.getBoundingClientRect();return{x:(t.clientX+e.scrollLeft-r.left)/n,y:(t.clientY+e.scrollTop-r.top)/n}}(r||t,n.props.offsetParent||o.offsetParent||o.ownerDocument.body,n.props.scale)}function R(t,e,n){var r=t.state,o=!d(r.lastX),a=I(t);return o?{node:a,deltaX:0,deltaY:0,lastX:e,lastY:n,x:e,y:n}:{node:a,deltaX:e-r.lastX,deltaY:n-r.lastY,lastX:r.lastX,lastY:r.lastY,x:e,y:n}}function A(t,e){var n=t.props.scale;return{node:e.node,x:t.state.x+e.deltaX/n,y:t.state.y+e.deltaY/n,deltaX:e.deltaX/n,deltaY:e.deltaY/n,lastX:t.state.x,lastY:t.state.y}}function I(t){var e=u.a.findDOMNode(t);if(!e)throw new Error("<DraggableCore>: Unmounted during event!");return e}function U(t){return(U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function V(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,o=!1,a=void 0;try{for(var i,s=t[Symbol.iterator]();!(r=(i=s.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,a=t}finally{try{r||null==s.return||s.return()}finally{if(o)throw a}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function W(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function B(t){return(B=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function H(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function q(t,e){return(q=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function G(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var z={touch:{start:"touchstart",move:"touchmove",stop:"touchend"},mouse:{start:"mousedown",move:"mousemove",stop:"mouseup"}},F=z.mouse,J=function(t){function e(){var t,n,r,o;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);for(var a=arguments.length,i=new Array(a),s=0;s<a;s++)i[s]=arguments[s];return r=this,o=(t=B(e)).call.apply(t,[this].concat(i)),n=!o||"object"!==U(o)&&"function"!=typeof o?H(r):o,G(H(n),"state",{dragging:!1,lastX:NaN,lastY:NaN,touchIdentifier:null}),G(H(n),"handleDragStart",function(t){if(n.props.onMouseDown(t),!n.props.allowAnyClick&&"number"==typeof t.button&&0!==t.button)return!1;var e=u.a.findDOMNode(H(n));if(!e||!e.ownerDocument||!e.ownerDocument.body)throw new Error("<DraggableCore> not mounted on DragStart!");var r=e.ownerDocument;if(!(n.props.disabled||!(t.target instanceof r.defaultView.Node)||n.props.handle&&!D(t.target,n.props.handle,e)||n.props.cancel&&D(t.target,n.props.cancel,e))){var o=function(t){return t.targetTouches&&t.targetTouches[0]?t.targetTouches[0].identifier:t.changedTouches&&t.changedTouches[0]?t.changedTouches[0].identifier:void 0}(t);n.setState({touchIdentifier:o});var a=L(t,o,H(n));if(null!=a){var i=a.x,s=a.y,c=R(H(n),i,s);n.props.onStart,!1!==n.props.onStart(t,c)&&(n.props.enableUserSelectHack&&M(r),n.setState({dragging:!0,lastX:i,lastY:s}),x(r,F.move,n.handleDrag),x(r,F.stop,n.handleDragStop))}}}),G(H(n),"handleDrag",function(t){"touchmove"===t.type&&t.preventDefault();var e=L(t,n.state.touchIdentifier,H(n));if(null!=e){var r,o,a,i=e.x,s=e.y;if(Array.isArray(n.props.grid)){var u=i-n.state.lastX,c=s-n.state.lastY,l=V((r=n.props.grid,o=u,a=c,[Math.round(o/r[0])*r[0],Math.round(a/r[1])*r[1]]),2);if(u=l[0],c=l[1],!u&&!c)return;i=n.state.lastX+u,s=n.state.lastY+c}var f=R(H(n),i,s);if(!1!==n.props.onDrag(t,f))n.setState({lastX:i,lastY:s});else try{n.handleDragStop(new MouseEvent("mouseup"))}catch(t){var p=document.createEvent("MouseEvents");p.initMouseEvent("mouseup",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),n.handleDragStop(p)}}}),G(H(n),"handleDragStop",function(t){if(n.state.dragging){var e=L(t,n.state.touchIdentifier,H(n));if(null!=e){var r=e.x,o=e.y,a=R(H(n),r,o),i=u.a.findDOMNode(H(n));i&&n.props.enableUserSelectHack&&k(i.ownerDocument),n.setState({dragging:!1,lastX:NaN,lastY:NaN}),n.props.onStop(t,a),i&&(P(i.ownerDocument,F.move,n.handleDrag),P(i.ownerDocument,F.stop,n.handleDragStop))}}}),G(H(n),"onMouseDown",function(t){return F=z.mouse,n.handleDragStart(t)}),G(H(n),"onMouseUp",function(t){return F=z.mouse,n.handleDragStop(t)}),G(H(n),"onTouchStart",function(t){return F=z.touch,n.handleDragStart(t)}),G(H(n),"onTouchEnd",function(t){return F=z.touch,n.handleDragStop(t)}),n}var n,r,a;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&q(t,e)}(e,o.a.Component),n=e,(r=[{key:"componentWillUnmount",value:function(){var t=u.a.findDOMNode(this);if(t){var e=t.ownerDocument;P(e,z.mouse.move,this.handleDrag),P(e,z.touch.move,this.handleDrag),P(e,z.mouse.stop,this.handleDragStop),P(e,z.touch.stop,this.handleDragStop),this.props.enableUserSelectHack&&k(e)}}},{key:"render",value:function(){return o.a.cloneElement(o.a.Children.only(this.props.children),{style:_(this.props.children.props.style),onMouseDown:this.onMouseDown,onTouchStart:this.onTouchStart,onMouseUp:this.onMouseUp,onTouchEnd:this.onTouchEnd})}}])&&W(n.prototype,r),a&&W(n,a),e}();function K(t){return(K="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function Q(){return(Q=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function Z(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},a=Object.keys(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(r=0;r<a.length;r++)n=a[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}function $(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,o=!1,a=void 0;try{for(var i,s=t[Symbol.iterator]();!(r=(i=s.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,a=t}finally{try{r||null==s.return||s.return()}finally{if(o)throw a}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function tt(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function et(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?tt(n,!0).forEach(function(e){st(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):tt(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function nt(t){return(nt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function rt(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function ot(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function at(t,e,n){return e&&ot(t.prototype,e),n&&ot(t,n),t}function it(t,e){return(it=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function st(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}G(J,"displayName","DraggableCore"),G(J,"propTypes",{allowAnyClick:i.a.bool,disabled:i.a.bool,enableUserSelectHack:i.a.bool,offsetParent:function(t,e){if(t[e]&&1!==t[e].nodeType)throw new Error("Draggable's offsetParent must be a DOM Node.")},grid:i.a.arrayOf(i.a.number),handle:i.a.string,cancel:i.a.string,onStart:i.a.func,onDrag:i.a.func,onStop:i.a.func,onMouseDown:i.a.func,scale:i.a.number,className:y,style:y,transform:y}),G(J,"defaultProps",{allowAnyClick:!1,cancel:null,disabled:!1,enableUserSelectHack:!0,offsetParent:null,handle:null,grid:null,transform:null,onStart:function(){},onDrag:function(){},onStop:function(){},onMouseDown:function(){},scale:1}),n.d(e,"default",function(){return ut}),n.d(e,"DraggableCore",function(){return J});var ut=function(t){function e(t){var n,r,o;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),r=this,o=nt(e).call(this,t),n=!o||"object"!==K(o)&&"function"!=typeof o?rt(r):o,st(rt(n),"onDragStart",function(t,e){if(!1===n.props.onStart(t,A(rt(n),e)))return!1;n.setState({dragging:!0,dragged:!0})}),st(rt(n),"onDrag",function(t,e){if(!n.state.dragging)return!1;var r=A(rt(n),e),o={x:r.x,y:r.y};if(n.props.bounds){var a=o.x,i=o.y;o.x+=n.state.slackX,o.y+=n.state.slackY;var s=$(function(t,e,n){if(!t.props.bounds)return[e,n];var r=t.props.bounds;r="string"==typeof r?r:function(t){return{left:t.left,top:t.top,right:t.right,bottom:t.bottom}}(r);var o=I(t);if("string"==typeof r){var a,i=o.ownerDocument,s=i.defaultView;if(!((a="parent"===r?o.parentNode:i.querySelector(r))instanceof s.HTMLElement))throw new Error('Bounds selector "'+r+'" could not find an element.');var u=s.getComputedStyle(o),c=s.getComputedStyle(a);r={left:-o.offsetLeft+g(c.paddingLeft)+g(u.marginLeft),top:-o.offsetTop+g(c.paddingTop)+g(u.marginTop),right:N(a)-E(o)-o.offsetLeft+g(c.paddingRight)-g(u.marginRight),bottom:T(a)-j(o)-o.offsetTop+g(c.paddingBottom)-g(u.marginBottom)}}return d(r.right)&&(e=Math.min(e,r.right)),d(r.bottom)&&(n=Math.min(n,r.bottom)),d(r.left)&&(e=Math.max(e,r.left)),d(r.top)&&(n=Math.max(n,r.top)),[e,n]}(rt(n),o.x,o.y),2),u=s[0],c=s[1];o.x=u,o.y=c,o.slackX=n.state.slackX+(a-o.x),o.slackY=n.state.slackY+(i-o.y),r.x=o.x,r.y=o.y,r.deltaX=o.x-n.state.x,r.deltaY=o.y-n.state.y}if(!1===n.props.onDrag(t,r))return!1;n.setState(o)}),st(rt(n),"onDragStop",function(t,e){if(!n.state.dragging)return!1;if(!1===n.props.onStop(t,A(rt(n),e)))return!1;var r={dragging:!1,slackX:0,slackY:0};if(Boolean(n.props.position)){var o=n.props.position,a=o.x,i=o.y;r.x=a,r.y=i}n.setState(r)}),n.state={dragging:!1,dragged:!1,x:t.position?t.position.x:t.defaultPosition.x,y:t.position?t.position.y:t.defaultPosition.y,prevPropsPosition:et({},t.position),slackX:0,slackY:0,isElementSVG:!1},!t.position||t.onDrag||t.onStop||console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element."),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&it(t,e)}(e,o.a.Component),at(e,null,[{key:"getDerivedStateFromProps",value:function(t,e){var n=t.position,r=e.prevPropsPosition;return!n||r&&n.x===r.x&&n.y===r.y?null:{x:n.x,y:n.y,prevPropsPosition:et({},n)}}}]),at(e,[{key:"componentDidMount",value:function(){void 0!==window.SVGElement&&u.a.findDOMNode(this)instanceof window.SVGElement&&this.setState({isElementSVG:!0})}},{key:"componentWillUnmount",value:function(){this.setState({dragging:!1})}},{key:"render",value:function(){var t,e=this.props,n=(e.axis,e.bounds,e.children),r=e.defaultPosition,a=e.defaultClassName,i=e.defaultClassNameDragging,s=e.defaultClassNameDragged,u=e.position,c=e.positionOffset,f=(e.scale,Z(e,["axis","bounds","children","defaultPosition","defaultClassName","defaultClassNameDragging","defaultClassNameDragged","position","positionOffset","scale"])),p={},d=null,g=!Boolean(u)||this.state.dragging,y=u||r,h={x:X(this)&&g?this.state.x:y.x,y:Y(this)&&g?this.state.y:y.y};this.state.isElementSVG?d=function(t,e){return C(t,e,"")}(h,c):p=function(t,e){var n=C(t,e,"px");return w({},b("transform",m),n)}(h,c);var v=l()(n.props.className||"",a,(st(t={},i,this.state.dragging),st(t,s,this.state.dragged),t));return o.a.createElement(J,Q({},f,{onStart:this.onDragStart,onDrag:this.onDrag,onStop:this.onDragStop}),o.a.cloneElement(o.a.Children.only(n),{className:v,style:et({},n.props.style,{},p),transform:d}))}}]),e}();st(ut,"displayName","Draggable"),st(ut,"propTypes",et({},J.propTypes,{axis:i.a.oneOf(["both","x","y","none"]),bounds:i.a.oneOfType([i.a.shape({left:i.a.number,right:i.a.number,top:i.a.number,bottom:i.a.number}),i.a.string,i.a.oneOf([!1])]),defaultClassName:i.a.string,defaultClassNameDragging:i.a.string,defaultClassNameDragged:i.a.string,defaultPosition:i.a.shape({x:i.a.number,y:i.a.number}),positionOffset:i.a.shape({x:i.a.oneOfType([i.a.number,i.a.string]),y:i.a.oneOfType([i.a.number,i.a.string])}),position:i.a.shape({x:i.a.number,y:i.a.number}),className:y,style:y,transform:y})),st(ut,"defaultProps",et({},J.defaultProps,{axis:"both",bounds:!1,defaultClassName:"react-draggable",defaultClassNameDragging:"react-draggable-dragging",defaultClassNameDragged:"react-draggable-dragged",defaultPosition:{x:0,y:0},position:null,scale:1}))}])});
//# sourceMappingURL=react-draggable.min.js.map

/***/ }),

/***/ "./node_modules/react-resizable/build/Resizable.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-resizable/build/Resizable.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _reactDraggable = __webpack_require__(/*! react-draggable */ "./node_modules/react-draggable/web/react-draggable.min.js");

var _utils = __webpack_require__(/*! ./utils */ "./node_modules/react-resizable/build/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Resizable =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Resizable, _React$Component);

  function Resizable() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      slackW: 0,
      slackH: 0
    });

    return _this;
  }

  var _proto = Resizable.prototype;

  _proto.lockAspectRatio = function lockAspectRatio(width, height, aspectRatio) {
    height = width / aspectRatio;
    width = height * aspectRatio;
    return [width, height];
  } // If you do this, be careful of constraints
  ;

  _proto.runConstraints = function runConstraints(width, height) {
    var _ref = [this.props.minConstraints, this.props.maxConstraints],
        min = _ref[0],
        max = _ref[1];
    if (!min && !max) return [width, height]; // Fit width & height to aspect ratio

    if (this.props.lockAspectRatio) {
      if (height === this.props.height) {
        var ratio = this.props.width / this.props.height;
        height = width / ratio;
        width = height * ratio;
      } else {
        // Take into account vertical resize with N/S handles on locked aspect
        // ratio. Calculate the change height-first, instead of width-first
        var _ratio = this.props.height / this.props.width;

        width = height / _ratio;
        height = width * _ratio;
      }
    }

    var oldW = width,
        oldH = height; // Add slack to the values used to calculate bound position. This will ensure that if
    // we start removing slack, the element won't react to it right away until it's been
    // completely removed.

    var _this$state = this.state,
        slackW = _this$state.slackW,
        slackH = _this$state.slackH;
    width += slackW;
    height += slackH;

    if (min) {
      width = Math.max(min[0], width);
      height = Math.max(min[1], height);
    }

    if (max) {
      width = Math.min(max[0], width);
      height = Math.min(max[1], height);
    } // If the numbers changed, we must have introduced some slack. Record it for the next iteration.


    slackW += oldW - width;
    slackH += oldH - height;

    if (slackW !== this.state.slackW || slackH !== this.state.slackH) {
      this.setState({
        slackW: slackW,
        slackH: slackH
      });
    }

    return [width, height];
  }
  /**
   * Wrapper around drag events to provide more useful data.
   *
   * @param  {String} handlerName Handler name to wrap.
   * @return {Function}           Handler function.
   */
  ;

  _proto.resizeHandler = function resizeHandler(handlerName, axis) {
    var _this2 = this;

    return function (e, _ref2) {
      var node = _ref2.node,
          deltaX = _ref2.deltaX,
          deltaY = _ref2.deltaY;
      deltaX /= _this2.props.transformScale;
      deltaY /= _this2.props.transformScale; // Axis restrictions

      var canDragX = (_this2.props.axis === 'both' || _this2.props.axis === 'x') && ['n', 's'].indexOf(axis) === -1;
      var canDragY = (_this2.props.axis === 'both' || _this2.props.axis === 'y') && ['e', 'w'].indexOf(axis) === -1; // reverse delta if using top or left drag handles

      if (canDragX && axis[axis.length - 1] === 'w') {
        deltaX = -deltaX;
      }

      if (canDragY && axis[0] === 'n') {
        deltaY = -deltaY;
      } // Update w/h


      var width = _this2.props.width + (canDragX ? deltaX : 0);
      var height = _this2.props.height + (canDragY ? deltaY : 0); // Early return if no change

      var widthChanged = width !== _this2.props.width,
          heightChanged = height !== _this2.props.height;
      if (handlerName === 'onResize' && !widthChanged && !heightChanged) return;

      var _this2$runConstraints = _this2.runConstraints(width, height);

      width = _this2$runConstraints[0];
      height = _this2$runConstraints[1];
      // Set the appropriate state for this handler.
      var newState = {};

      if (handlerName === 'onResizeStart') {// nothing
      } else if (handlerName === 'onResizeStop') {
        newState.slackW = newState.slackH = 0;
      } else {
        // Early return if no change after constraints
        if (width === _this2.props.width && height === _this2.props.height) return;
      }

      var hasCb = typeof _this2.props[handlerName] === 'function';

      if (hasCb) {
        // $FlowIgnore isn't refining this correctly to SyntheticEvent
        if (typeof e.persist === 'function') e.persist();

        _this2.setState(newState, function () {
          return _this2.props[handlerName](e, {
            node: node,
            size: {
              width: width,
              height: height
            },
            handle: axis
          });
        });
      } else {
        _this2.setState(newState);
      }
    };
  };

  _proto.renderResizeHandle = function renderResizeHandle(resizeHandle) {
    var handle = this.props.handle;

    if (handle) {
      if (typeof handle === 'function') {
        return handle(resizeHandle);
      }

      return handle;
    }

    return _react.default.createElement("span", {
      className: "react-resizable-handle react-resizable-handle-" + resizeHandle
    });
  };

  _proto.render = function render() {
    var _this3 = this;

    // eslint-disable-next-line no-unused-vars
    var _this$props = this.props,
        children = _this$props.children,
        draggableOpts = _this$props.draggableOpts,
        width = _this$props.width,
        height = _this$props.height,
        handleSize = _this$props.handleSize,
        lockAspectRatio = _this$props.lockAspectRatio,
        axis = _this$props.axis,
        minConstraints = _this$props.minConstraints,
        maxConstraints = _this$props.maxConstraints,
        onResize = _this$props.onResize,
        onResizeStop = _this$props.onResizeStop,
        onResizeStart = _this$props.onResizeStart,
        resizeHandles = _this$props.resizeHandles,
        transformScale = _this$props.transformScale,
        p = _objectWithoutPropertiesLoose(_this$props, ["children", "draggableOpts", "width", "height", "handleSize", "lockAspectRatio", "axis", "minConstraints", "maxConstraints", "onResize", "onResizeStop", "onResizeStart", "resizeHandles", "transformScale"]);

    var className = p.className ? p.className + " react-resizable" : 'react-resizable'; // What we're doing here is getting the child of this element, and cloning it with this element's props.
    // We are then defining its children as:
    // Its original children (resizable's child's children), and
    // One or more draggable handles.

    return (0, _utils.cloneElement)(children, _objectSpread({}, p, {
      className: className,
      children: [children.props.children, resizeHandles.map(function (h) {
        return _react.default.createElement(_reactDraggable.DraggableCore, _extends({}, draggableOpts, {
          key: "resizableHandle-" + h,
          onStop: _this3.resizeHandler('onResizeStop', h),
          onStart: _this3.resizeHandler('onResizeStart', h),
          onDrag: _this3.resizeHandler('onResize', h)
        }), _this3.renderResizeHandle(h));
      })]
    }));
  };

  return Resizable;
}(_react.default.Component);

exports.default = Resizable;

_defineProperty(Resizable, "propTypes", {
  //
  // Required Props
  //
  // Require that one and only one child be present.
  children: _propTypes.default.element.isRequired,
  // Initial w/h
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  //
  // Optional props
  //
  // Custom resize handle
  handle: _propTypes.default.element,
  // If you change this, be sure to update your css
  handleSize: _propTypes.default.array,
  // Defines which resize handles should be rendered (default: 'se')
  // Allows for any combination of:
  // 's' - South handle (bottom-center)
  // 'w' - West handle (left-center)
  // 'e' - East handle (right-center)
  // 'n' - North handle (top-center)
  // 'sw' - Southwest handle (bottom-left)
  // 'nw' - Northwest handle (top-left)
  // 'se' - Southeast handle (bottom-right)
  // 'ne' - Northeast handle (top-center)
  resizeHandles: _propTypes.default.arrayOf(_propTypes.default.oneOf(['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'])),
  transformScale: _propTypes.default.number,
  // If true, will only allow width/height to move in lockstep
  lockAspectRatio: _propTypes.default.bool,
  // Restricts resizing to a particular axis (default: 'both')
  // 'both' - allows resizing by width or height
  // 'x' - only allows the width to be changed
  // 'y' - only allows the height to be changed
  // 'none' - disables resizing altogether
  axis: _propTypes.default.oneOf(['both', 'x', 'y', 'none']),
  // Min/max size
  minConstraints: _propTypes.default.arrayOf(_propTypes.default.number),
  maxConstraints: _propTypes.default.arrayOf(_propTypes.default.number),
  // Callbacks
  onResizeStop: _propTypes.default.func,
  onResizeStart: _propTypes.default.func,
  onResize: _propTypes.default.func,
  // These will be passed wholesale to react-draggable's DraggableCore
  draggableOpts: _propTypes.default.object
});

_defineProperty(Resizable, "defaultProps", {
  handleSize: [20, 20],
  lockAspectRatio: false,
  axis: 'both',
  minConstraints: [20, 20],
  maxConstraints: [Infinity, Infinity],
  resizeHandles: ['se'],
  transformScale: 1
});

/***/ }),

/***/ "./node_modules/react-resizable/build/ResizableBox.js":
/*!************************************************************!*\
  !*** ./node_modules/react-resizable/build/ResizableBox.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _Resizable = _interopRequireDefault(__webpack_require__(/*! ./Resizable */ "./node_modules/react-resizable/build/Resizable.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// An example use of Resizable.
var ResizableBox =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ResizableBox, _React$Component);

  function ResizableBox() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      width: _this.props.width,
      height: _this.props.height,
      propsWidth: _this.props.width,
      propsHeight: _this.props.height
    });

    _defineProperty(_assertThisInitialized(_this), "onResize", function (e, data) {
      var size = data.size;
      var width = size.width,
          height = size.height;

      if (_this.props.onResize) {
        e.persist && e.persist();

        _this.setState(size, function () {
          return _this.props.onResize && _this.props.onResize(e, data);
        });
      } else {
        _this.setState(size);
      }
    });

    return _this;
  }

  ResizableBox.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    // If parent changes height/width, set that in our state.
    if (state.propsWidth !== props.width || state.propsHeight !== props.height) {
      return {
        width: props.width,
        height: props.height,
        propsWidth: props.width,
        propsHeight: props.height
      };
    }

    return null;
  };

  var _proto = ResizableBox.prototype;

  _proto.render = function render() {
    // Basic wrapper around a Resizable instance.
    // If you use Resizable directly, you are responsible for updating the child component
    // with a new width and height.
    var _this$props = this.props,
        handle = _this$props.handle,
        handleSize = _this$props.handleSize,
        onResize = _this$props.onResize,
        onResizeStart = _this$props.onResizeStart,
        onResizeStop = _this$props.onResizeStop,
        draggableOpts = _this$props.draggableOpts,
        minConstraints = _this$props.minConstraints,
        maxConstraints = _this$props.maxConstraints,
        lockAspectRatio = _this$props.lockAspectRatio,
        axis = _this$props.axis,
        width = _this$props.width,
        height = _this$props.height,
        resizeHandles = _this$props.resizeHandles,
        props = _objectWithoutPropertiesLoose(_this$props, ["handle", "handleSize", "onResize", "onResizeStart", "onResizeStop", "draggableOpts", "minConstraints", "maxConstraints", "lockAspectRatio", "axis", "width", "height", "resizeHandles"]);

    return _react.default.createElement(_Resizable.default, {
      handle: handle,
      handleSize: handleSize,
      width: this.state.width,
      height: this.state.height,
      onResizeStart: onResizeStart,
      onResize: this.onResize,
      onResizeStop: onResizeStop,
      draggableOpts: draggableOpts,
      minConstraints: minConstraints,
      maxConstraints: maxConstraints,
      lockAspectRatio: lockAspectRatio,
      axis: axis,
      resizeHandles: resizeHandles
    }, _react.default.createElement("div", _extends({
      style: {
        width: this.state.width + 'px',
        height: this.state.height + 'px'
      }
    }, props)));
  };

  return ResizableBox;
}(_react.default.Component);

exports.default = ResizableBox;

_defineProperty(ResizableBox, "propTypes", {
  height: _propTypes.default.number,
  width: _propTypes.default.number
});

_defineProperty(ResizableBox, "defaultProps", {
  handleSize: [20, 20]
});

/***/ }),

/***/ "./node_modules/react-resizable/build/utils.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-resizable/build/utils.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.cloneElement = cloneElement;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// React.addons.cloneWithProps look-alike that merges style & className.
function cloneElement(element, props) {
  if (props.style && element.props.style) {
    props.style = _objectSpread({}, element.props.style, {}, props.style);
  }

  if (props.className && element.props.className) {
    props.className = element.props.className + " " + props.className;
  }

  return _react.default.cloneElement(element, props);
}

/***/ }),

/***/ "./node_modules/react-resizable/index.js":
/*!***********************************************!*\
  !*** ./node_modules/react-resizable/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function() {
  throw new Error("Don't instantiate Resizable directly! Use require('react-resizable').Resizable");
};

module.exports.Resizable = __webpack_require__(/*! ./build/Resizable */ "./node_modules/react-resizable/build/Resizable.js").default;
module.exports.ResizableBox = __webpack_require__(/*! ./build/ResizableBox */ "./node_modules/react-resizable/build/ResizableBox.js").default;


/***/ }),

/***/ "./node_modules/react-sizeme/dist/react-sizeme.js":
/*!********************************************************!*\
  !*** ./node_modules/react-sizeme/dist/react-sizeme.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var React__default = _interopDefault(React);
var ReactDOM = _interopDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
var invariant = _interopDefault(__webpack_require__(/*! invariant */ "./node_modules/invariant/browser.js"));
var throttleDebounce = __webpack_require__(/*! throttle-debounce */ "./node_modules/throttle-debounce/dist/index.esm.js");
var createResizeDetector = _interopDefault(__webpack_require__(/*! element-resize-detector */ "./node_modules/element-resize-detector/src/element-resize-detector.js"));
var isShallowEqual = _interopDefault(__webpack_require__(/*! shallowequal */ "./node_modules/shallowequal/index.js"));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var instances = {}; // Lazily require to not cause bug
// https://github.com/ctrlplusb/react-sizeme/issues/6

function resizeDetector() {
  var strategy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'scroll';

  if (!instances[strategy]) {
    instances[strategy] = createResizeDetector({
      strategy: strategy
    });
  }

  return instances[strategy];
}

var errMsg = 'react-sizeme: an error occurred whilst stopping to listen to node size changes';
var defaultConfig = {
  monitorWidth: true,
  monitorHeight: false,
  monitorPosition: false,
  refreshRate: 16,
  refreshMode: 'throttle',
  noPlaceholder: false,
  resizeDetectorStrategy: 'scroll'
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
/**
 * This is a utility wrapper component that will allow our higher order
 * component to get a ref handle on our wrapped components html.
 * @see https://gist.github.com/jimfb/32b587ee6177665fb4cf
 */


var ReferenceWrapper =
/*#__PURE__*/
function (_Component) {
  _inherits(ReferenceWrapper, _Component);

  function ReferenceWrapper() {
    _classCallCheck(this, ReferenceWrapper);

    return _possibleConstructorReturn(this, _getPrototypeOf(ReferenceWrapper).apply(this, arguments));
  }

  _createClass(ReferenceWrapper, [{
    key: "render",
    value: function render() {
      return React.Children.only(this.props.children);
    }
  }]);

  return ReferenceWrapper;
}(React.Component);

_defineProperty(ReferenceWrapper, "displayName", 'SizeMeReferenceWrapper');

function Placeholder(_ref) {
  var className = _ref.className,
      style = _ref.style;
  // Lets create the props for the temp element.
  var phProps = {}; // We will use any provided className/style or else make the temp
  // container take the full available space.

  if (!className && !style) {
    phProps.style = {
      width: '100%',
      height: '100%'
    };
  } else {
    if (className) {
      phProps.className = className;
    }

    if (style) {
      phProps.style = style;
    }
  }

  return React__default.createElement("div", phProps);
}

Placeholder.displayName = 'SizeMePlaceholder';
/**
 * As we need to maintain a ref on the root node that is rendered within our
 * SizeMe component we need to wrap our entire render in a sub component.
 * Without this, we lose the DOM ref after the placeholder is removed from
 * the render and the actual component is rendered.
 * It took me forever to figure this out, so tread extra careful on this one!
 */

var renderWrapper = function renderWrapper(WrappedComponent) {
  function SizeMeRenderer(props) {
    var explicitRef = props.explicitRef,
        className = props.className,
        style = props.style,
        size = props.size,
        disablePlaceholder = props.disablePlaceholder,
        onSize = props.onSize,
        restProps = _objectWithoutProperties(props, ["explicitRef", "className", "style", "size", "disablePlaceholder", "onSize"]);

    var noSizeData = size == null || size.width == null && size.height == null && size.position == null;
    var renderPlaceholder = noSizeData && !disablePlaceholder;
    var renderProps = {
      className: className,
      style: style
    };

    if (size != null) {
      renderProps.size = size;
    }

    var toRender = renderPlaceholder ? React__default.createElement(Placeholder, {
      className: className,
      style: style
    }) : React__default.createElement(WrappedComponent, _extends({}, renderProps, restProps));
    return React__default.createElement(ReferenceWrapper, {
      ref: explicitRef
    }, toRender);
  }

  SizeMeRenderer.displayName = "SizeMeRenderer(".concat(getDisplayName(WrappedComponent), ")");
  return SizeMeRenderer;
};
/**
 * :: config -> Component -> WrappedComponent
 *
 * Higher order component that allows the wrapped component to become aware
 * of it's size, by receiving it as an object within it's props.
 *
 * @param  monitorWidth
 *   Default true, whether changes in the element's width should be monitored,
 *   causing a size property to be broadcast.
 * @param  monitorHeight
 *   Default false, whether changes in the element's height should be monitored,
 *   causing a size property to be broadcast.
 *
 * @return The wrapped component.
 */


function withSize() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultConfig;
  var _config$monitorWidth = config.monitorWidth,
      monitorWidth = _config$monitorWidth === void 0 ? defaultConfig.monitorWidth : _config$monitorWidth,
      _config$monitorHeight = config.monitorHeight,
      monitorHeight = _config$monitorHeight === void 0 ? defaultConfig.monitorHeight : _config$monitorHeight,
      _config$monitorPositi = config.monitorPosition,
      monitorPosition = _config$monitorPositi === void 0 ? defaultConfig.monitorPosition : _config$monitorPositi,
      _config$refreshRate = config.refreshRate,
      refreshRate = _config$refreshRate === void 0 ? defaultConfig.refreshRate : _config$refreshRate,
      _config$refreshMode = config.refreshMode,
      refreshMode = _config$refreshMode === void 0 ? defaultConfig.refreshMode : _config$refreshMode,
      _config$noPlaceholder = config.noPlaceholder,
      noPlaceholder = _config$noPlaceholder === void 0 ? defaultConfig.noPlaceholder : _config$noPlaceholder,
      _config$resizeDetecto = config.resizeDetectorStrategy,
      resizeDetectorStrategy = _config$resizeDetecto === void 0 ? defaultConfig.resizeDetectorStrategy : _config$resizeDetecto;
  invariant(monitorWidth || monitorHeight || monitorPosition, 'You have to monitor at least one of the width, height, or position when using "sizeMe"');
  invariant(refreshRate >= 16, "It is highly recommended that you don't put your refreshRate lower than " + '16 as this may cause layout thrashing.');
  invariant(refreshMode === 'throttle' || refreshMode === 'debounce', 'The refreshMode should have a value of "throttle" or "debounce"');
  var refreshDelayStrategy = refreshMode === 'throttle' ? throttleDebounce.throttle : throttleDebounce.debounce;
  return function WrapComponent(WrappedComponent) {
    var SizeMeRenderWrapper = renderWrapper(WrappedComponent);

    var SizeAwareComponent =
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(SizeAwareComponent, _React$Component);

      function SizeAwareComponent() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, SizeAwareComponent);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SizeAwareComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _defineProperty(_assertThisInitialized(_this), "domEl", null);

        _defineProperty(_assertThisInitialized(_this), "state", {
          width: undefined,
          height: undefined,
          position: undefined
        });

        _defineProperty(_assertThisInitialized(_this), "uninstall", function () {
          if (_this.domEl) {
            try {
              _this.detector.uninstall(_this.domEl);
            } catch (err) {
              // eslint-disable-next-line no-console
              console.warn(errMsg);
            }

            _this.domEl = null;
          }
        });

        _defineProperty(_assertThisInitialized(_this), "determineStrategy", function (props) {
          if (props.onSize) {
            if (!_this.callbackState) {
              _this.callbackState = _objectSpread2({}, _this.state);
            }

            _this.strategy = 'callback';
          } else {
            _this.strategy = 'render';
          }
        });

        _defineProperty(_assertThisInitialized(_this), "strategisedSetState", function (state) {
          if (_this.strategy === 'callback') {
            _this.callbackState = state;

            _this.props.onSize(state);
          }

          _this.setState(state);
        });

        _defineProperty(_assertThisInitialized(_this), "strategisedGetState", function () {
          return _this.strategy === 'callback' ? _this.callbackState : _this.state;
        });

        _defineProperty(_assertThisInitialized(_this), "refCallback", function (element) {
          _this.element = element;
        });

        _defineProperty(_assertThisInitialized(_this), "hasSizeChanged", function (current, next) {
          var c = current;
          var n = next;
          var cp = c.position || {};
          var np = n.position || {};
          return monitorWidth && c.width !== n.width || monitorHeight && c.height !== n.height || monitorPosition && (cp.top !== np.top || cp.left !== np.left || cp.bottom !== np.bottom || cp.right !== np.right);
        });

        _defineProperty(_assertThisInitialized(_this), "checkIfSizeChanged", refreshDelayStrategy(refreshRate, function (el) {
          var _el$getBoundingClient = el.getBoundingClientRect(),
              width = _el$getBoundingClient.width,
              height = _el$getBoundingClient.height,
              right = _el$getBoundingClient.right,
              left = _el$getBoundingClient.left,
              top = _el$getBoundingClient.top,
              bottom = _el$getBoundingClient.bottom;

          var next = {
            width: monitorWidth ? width : null,
            height: monitorHeight ? height : null,
            position: monitorPosition ? {
              right: right,
              left: left,
              top: top,
              bottom: bottom
            } : null
          };

          if (_this.hasSizeChanged(_this.strategisedGetState(), next)) {
            _this.strategisedSetState(next);
          }
        }));

        return _this;
      }

      _createClass(SizeAwareComponent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.detector = resizeDetector(resizeDetectorStrategy);
          this.determineStrategy(this.props);
          this.handleDOMNode();
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
          this.determineStrategy(this.props);
          this.handleDOMNode();
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          // Change our size checker to a noop just in case we have some
          // late running events.
          this.hasSizeChanged = function () {
            return undefined;
          };

          this.checkIfSizeChanged = function () {
            return undefined;
          };

          this.uninstall();
        }
      }, {
        key: "handleDOMNode",
        value: function handleDOMNode() {
          var found = this.element && ReactDOM.findDOMNode(this.element);

          if (!found) {
            // If we previously had a dom node then we need to ensure that
            // we remove any existing listeners to avoid memory leaks.
            this.uninstall();
            return;
          }

          if (!this.domEl) {
            this.domEl = found;
            this.detector.listenTo(this.domEl, this.checkIfSizeChanged);
          } else if (this.domEl.isSameNode && !this.domEl.isSameNode(found) || this.domEl !== found) {
            this.uninstall();
            this.domEl = found;
            this.detector.listenTo(this.domEl, this.checkIfSizeChanged);
          }
        }
      }, {
        key: "render",
        value: function render() {
          var disablePlaceholder = withSize.enableSSRBehaviour || withSize.noPlaceholders || noPlaceholder || this.strategy === 'callback';

          var size = _objectSpread2({}, this.state);

          return React__default.createElement(SizeMeRenderWrapper, _extends({
            explicitRef: this.refCallback,
            size: this.strategy === 'callback' ? null : size,
            disablePlaceholder: disablePlaceholder
          }, this.props));
        }
      }]);

      return SizeAwareComponent;
    }(React__default.Component);

    _defineProperty(SizeAwareComponent, "displayName", "SizeMe(".concat(getDisplayName(WrappedComponent), ")"));

    SizeAwareComponent.WrappedComponent = WrappedComponent;
    return SizeAwareComponent;
  };
}
/**
 * Allow SizeMe to run within SSR environments.  This is a "global" behaviour
 * flag that should be set within the initialisation phase of your application.
 *
 * Warning: don't set this flag unless you need to as using it may cause
 * extra render cycles to happen within your components depending on the logic
 * contained within them around the usage of the `size` data.
 *
 * DEPRECATED: Please use the global noPlaceholders
 */


withSize.enableSSRBehaviour = false;
/**
 * Global configuration allowing to disable placeholder rendering for all
 * sizeMe components.
 */

withSize.noPlaceholders = false;

var SizeMe =
/*#__PURE__*/
function (_Component) {
  _inherits(SizeMe, _Component);

  function SizeMe(props) {
    var _this;

    _classCallCheck(this, SizeMe);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SizeMe).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "createComponent", function (config) {
      _this.SizeAware = withSize(config)(function (_ref) {
        var children = _ref.children;
        return children;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSize", function (size) {
      return _this.setState({
        size: size
      });
    });

    var _children = props.children,
        render = props.render,
        sizeMeConfig = _objectWithoutProperties(props, ["children", "render"]);

    _this.createComponent(sizeMeConfig);

    _this.state = {
      size: {
        width: undefined,
        height: undefined
      }
    };
    return _this;
  }

  _createClass(SizeMe, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          prevChildren = _this$props.children,
          prevRender = _this$props.render,
          currentSizeMeConfig = _objectWithoutProperties(_this$props, ["children", "render"]);

      var nextChildren = prevProps.children,
          nextRender = prevProps.render,
          prevSizeMeConfig = _objectWithoutProperties(prevProps, ["children", "render"]);

      if (!isShallowEqual(currentSizeMeConfig, prevSizeMeConfig)) {
        this.createComponent(currentSizeMeConfig);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var SizeAware = this.SizeAware;
      var render = this.props.children || this.props.render;
      return React__default.createElement(SizeAware, {
        onSize: this.onSize
      }, render({
        size: this.state.size
      }));
    }
  }]);

  return SizeMe;
}(React.Component);

_defineProperty(SizeMe, "defaultProps", {
  children: undefined,
  render: undefined
});

withSize.SizeMe = SizeMe;
withSize.withSize = withSize;

module.exports = withSize;
//# sourceMappingURL=react-sizeme.js.map


/***/ }),

/***/ "./node_modules/react-split-pane/dist/index.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-split-pane/dist/index.esm.js ***!
  \*********************************************************/
/*! exports provided: default, Pane */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pane", function() { return Pane; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_style_proptype__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-style-proptype */ "./node_modules/react-style-proptype/src/index.js");
/* harmony import */ var react_style_proptype__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_style_proptype__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_lifecycles_compat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-lifecycles-compat */ "./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js");





function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var Pane =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Pane, _React$PureComponent);

  function Pane() {
    _classCallCheck(this, Pane);

    return _possibleConstructorReturn(this, _getPrototypeOf(Pane).apply(this, arguments));
  }

  _createClass(Pane, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className,
          split = _this$props.split,
          styleProps = _this$props.style,
          size = _this$props.size,
          eleRef = _this$props.eleRef;
      var classes = ['Pane', split, className];
      var style = {
        flex: 1,
        position: 'relative',
        outline: 'none'
      };

      if (size !== undefined) {
        if (split === 'vertical') {
          style.width = size;
        } else {
          style.height = size;
          style.display = 'flex';
        }

        style.flex = 'none';
      }

      style = Object.assign({}, style, styleProps || {});
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        ref: eleRef,
        className: classes.join(' '),
        style: style
      }, children);
    }
  }]);

  return Pane;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

Pane.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node.isRequired,
  size: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number]),
  split: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['vertical', 'horizontal']),
  style: react_style_proptype__WEBPACK_IMPORTED_MODULE_2___default.a,
  eleRef: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
Pane.defaultProps = {};

var RESIZER_DEFAULT_CLASSNAME = 'Resizer';

var Resizer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Resizer, _React$Component);

  function Resizer() {
    _classCallCheck(this, Resizer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Resizer).apply(this, arguments));
  }

  _createClass(Resizer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          _onClick = _this$props.onClick,
          _onDoubleClick = _this$props.onDoubleClick,
          _onMouseDown = _this$props.onMouseDown,
          _onTouchEnd = _this$props.onTouchEnd,
          _onTouchStart = _this$props.onTouchStart,
          resizerClassName = _this$props.resizerClassName,
          split = _this$props.split,
          style = _this$props.style;
      var classes = [resizerClassName, split, className];
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        role: "presentation",
        className: classes.join(' '),
        style: style,
        onMouseDown: function onMouseDown(event) {
          return _onMouseDown(event);
        },
        onTouchStart: function onTouchStart(event) {
          event.preventDefault();

          _onTouchStart(event);
        },
        onTouchEnd: function onTouchEnd(event) {
          event.preventDefault();

          _onTouchEnd(event);
        },
        onClick: function onClick(event) {
          if (_onClick) {
            event.preventDefault();

            _onClick(event);
          }
        },
        onDoubleClick: function onDoubleClick(event) {
          if (_onDoubleClick) {
            event.preventDefault();

            _onDoubleClick(event);
          }
        }
      });
    }
  }]);

  return Resizer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Resizer.propTypes = {
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onDoubleClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onMouseDown: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  onTouchStart: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  onTouchEnd: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  split: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['vertical', 'horizontal']),
  style: react_style_proptype__WEBPACK_IMPORTED_MODULE_2___default.a,
  resizerClassName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
};
Resizer.defaultProps = {
  resizerClassName: RESIZER_DEFAULT_CLASSNAME
};

function unFocus(document, window) {
  if (document.selection) {
    document.selection.empty();
  } else {
    try {
      window.getSelection().removeAllRanges(); // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

function getDefaultSize(defaultSize, minSize, maxSize, draggedSize) {
  if (typeof draggedSize === 'number') {
    var min = typeof minSize === 'number' ? minSize : 0;
    var max = typeof maxSize === 'number' && maxSize >= 0 ? maxSize : Infinity;
    return Math.max(min, Math.min(max, draggedSize));
  }

  if (defaultSize !== undefined) {
    return defaultSize;
  }

  return minSize;
}

function removeNullChildren(children) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.toArray(children).filter(function (c) {
    return c;
  });
}

var SplitPane =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SplitPane, _React$Component);

  function SplitPane(props) {
    var _this;

    _classCallCheck(this, SplitPane);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SplitPane).call(this, props));
    _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onTouchStart = _this.onTouchStart.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onMouseMove = _this.onMouseMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onTouchMove = _this.onTouchMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onMouseUp = _this.onMouseUp.bind(_assertThisInitialized(_assertThisInitialized(_this))); // order of setting panel sizes.
    // 1. size
    // 2. getDefaultSize(defaultSize, minsize, maxSize)

    var size = props.size,
        defaultSize = props.defaultSize,
        minSize = props.minSize,
        maxSize = props.maxSize,
        primary = props.primary;
    var initialSize = size !== undefined ? size : getDefaultSize(defaultSize, minSize, maxSize, null);
    _this.state = {
      active: false,
      resized: false,
      pane1Size: primary === 'first' ? initialSize : undefined,
      pane2Size: primary === 'second' ? initialSize : undefined,
      // these are props that are needed in static functions. ie: gDSFP
      instanceProps: {
        size: size
      }
    };
    return _this;
  }

  _createClass(SplitPane, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('touchmove', this.onTouchMove);
      this.setState(SplitPane.getSizeUpdate(this.props, this.state));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('touchmove', this.onTouchMove);
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      var eventWithTouches = Object.assign({}, event, {
        touches: [{
          clientX: event.clientX,
          clientY: event.clientY
        }]
      });
      this.onTouchStart(eventWithTouches);
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(event) {
      var _this$props = this.props,
          allowResize = _this$props.allowResize,
          onDragStarted = _this$props.onDragStarted,
          split = _this$props.split;

      if (allowResize) {
        unFocus(document, window);
        var position = split === 'vertical' ? event.touches[0].clientX : event.touches[0].clientY;

        if (typeof onDragStarted === 'function') {
          onDragStarted();
        }

        this.setState({
          active: true,
          position: position
        });
      }
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      var eventWithTouches = Object.assign({}, event, {
        touches: [{
          clientX: event.clientX,
          clientY: event.clientY
        }]
      });
      this.onTouchMove(eventWithTouches);
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(event) {
      var _this$props2 = this.props,
          allowResize = _this$props2.allowResize,
          maxSize = _this$props2.maxSize,
          minSize = _this$props2.minSize,
          onChange = _this$props2.onChange,
          split = _this$props2.split,
          step = _this$props2.step;
      var _this$state = this.state,
          active = _this$state.active,
          position = _this$state.position;

      if (allowResize && active) {
        unFocus(document, window);
        var isPrimaryFirst = this.props.primary === 'first';
        var ref = isPrimaryFirst ? this.pane1 : this.pane2;
        var ref2 = isPrimaryFirst ? this.pane2 : this.pane1;

        if (ref) {
          var node = ref;
          var node2 = ref2;

          if (node.getBoundingClientRect) {
            var width = node.getBoundingClientRect().width;
            var height = node.getBoundingClientRect().height;
            var current = split === 'vertical' ? event.touches[0].clientX : event.touches[0].clientY;
            var size = split === 'vertical' ? width : height;
            var positionDelta = position - current;

            if (step) {
              if (Math.abs(positionDelta) < step) {
                return;
              } // Integer division
              // eslint-disable-next-line no-bitwise


              positionDelta = ~~(positionDelta / step) * step;
            }

            var sizeDelta = isPrimaryFirst ? positionDelta : -positionDelta;
            var pane1Order = parseInt(window.getComputedStyle(node).order);
            var pane2Order = parseInt(window.getComputedStyle(node2).order);

            if (pane1Order > pane2Order) {
              sizeDelta = -sizeDelta;
            }

            var newMaxSize = maxSize;

            if (maxSize !== undefined && maxSize <= 0) {
              var splitPane = this.splitPane;

              if (split === 'vertical') {
                newMaxSize = splitPane.getBoundingClientRect().width + maxSize;
              } else {
                newMaxSize = splitPane.getBoundingClientRect().height + maxSize;
              }
            }

            var newSize = size - sizeDelta;
            var newPosition = position - positionDelta;

            if (newSize < minSize) {
              newSize = minSize;
            } else if (maxSize !== undefined && newSize > newMaxSize) {
              newSize = newMaxSize;
            } else {
              this.setState({
                position: newPosition,
                resized: true
              });
            }

            if (onChange) onChange(newSize);
            this.setState(_defineProperty({
              draggedSize: newSize
            }, isPrimaryFirst ? 'pane1Size' : 'pane2Size', newSize));
          }
        }
      }
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      var _this$props3 = this.props,
          allowResize = _this$props3.allowResize,
          onDragFinished = _this$props3.onDragFinished;
      var _this$state2 = this.state,
          active = _this$state2.active,
          draggedSize = _this$state2.draggedSize;

      if (allowResize && active) {
        if (typeof onDragFinished === 'function') {
          onDragFinished(draggedSize);
        }

        this.setState({
          active: false
        });
      }
    } // we have to check values since gDSFP is called on every render and more in StrictMode

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          allowResize = _this$props4.allowResize,
          children = _this$props4.children,
          className = _this$props4.className,
          onResizerClick = _this$props4.onResizerClick,
          onResizerDoubleClick = _this$props4.onResizerDoubleClick,
          paneClassName = _this$props4.paneClassName,
          pane1ClassName = _this$props4.pane1ClassName,
          pane2ClassName = _this$props4.pane2ClassName,
          paneStyle = _this$props4.paneStyle,
          pane1StyleProps = _this$props4.pane1Style,
          pane2StyleProps = _this$props4.pane2Style,
          resizerClassName = _this$props4.resizerClassName,
          resizerStyle = _this$props4.resizerStyle,
          split = _this$props4.split,
          styleProps = _this$props4.style;
      var _this$state3 = this.state,
          pane1Size = _this$state3.pane1Size,
          pane2Size = _this$state3.pane2Size;
      var disabledClass = allowResize ? '' : 'disabled';
      var resizerClassNamesIncludingDefault = resizerClassName ? "".concat(resizerClassName, " ").concat(RESIZER_DEFAULT_CLASSNAME) : resizerClassName;
      var notNullChildren = removeNullChildren(children);

      var style = _objectSpread({
        display: 'flex',
        flex: 1,
        height: '100%',
        position: 'absolute',
        outline: 'none',
        overflow: 'hidden',
        MozUserSelect: 'text',
        WebkitUserSelect: 'text',
        msUserSelect: 'text',
        userSelect: 'text'
      }, styleProps);

      if (split === 'vertical') {
        Object.assign(style, {
          flexDirection: 'row',
          left: 0,
          right: 0
        });
      } else {
        Object.assign(style, {
          bottom: 0,
          flexDirection: 'column',
          minHeight: '100%',
          top: 0,
          width: '100%'
        });
      }

      var classes = ['SplitPane', className, split, disabledClass];

      var pane1Style = _objectSpread({}, paneStyle, pane1StyleProps);

      var pane2Style = _objectSpread({}, paneStyle, pane2StyleProps);

      var pane1Classes = ['Pane1', paneClassName, pane1ClassName].join(' ');
      var pane2Classes = ['Pane2', paneClassName, pane2ClassName].join(' ');
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.join(' '),
        ref: function ref(node) {
          _this2.splitPane = node;
        },
        style: style
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Pane, {
        className: pane1Classes,
        key: "pane1",
        eleRef: function eleRef(node) {
          _this2.pane1 = node;
        },
        size: pane1Size,
        split: split,
        style: pane1Style
      }, notNullChildren[0]), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Resizer, {
        className: disabledClass,
        onClick: onResizerClick,
        onDoubleClick: onResizerDoubleClick,
        onMouseDown: this.onMouseDown,
        onTouchStart: this.onTouchStart,
        onTouchEnd: this.onMouseUp,
        key: "resizer",
        resizerClassName: resizerClassNamesIncludingDefault,
        split: split,
        style: resizerStyle || {}
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Pane, {
        className: pane2Classes,
        key: "pane2",
        eleRef: function eleRef(node) {
          _this2.pane2 = node;
        },
        size: pane2Size,
        split: split,
        style: pane2Style
      }, notNullChildren[1]));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return SplitPane.getSizeUpdate(nextProps, prevState);
    }
  }, {
    key: "getSizeUpdate",
    value: function getSizeUpdate(props, state) {
      var newState = {};
      var instanceProps = state.instanceProps;

      if (instanceProps.size === props.size && props.size !== undefined) {
        return {};
      }

      var newSize = props.size !== undefined ? props.size : getDefaultSize(props.defaultSize, props.minSize, props.maxSize, state.draggedSize);

      if (props.size !== undefined) {
        newState.draggedSize = newSize;
      }

      var isPanel1Primary = props.primary === 'first';
      newState[isPanel1Primary ? 'pane1Size' : 'pane2Size'] = newSize;
      newState[isPanel1Primary ? 'pane2Size' : 'pane1Size'] = undefined;
      newState.instanceProps = {
        size: props.size
      };
      return newState;
    }
  }]);

  return SplitPane;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

SplitPane.propTypes = {
  allowResize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.node).isRequired,
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  primary: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['first', 'second']),
  minSize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number]),
  maxSize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number]),
  // eslint-disable-next-line react/no-unused-prop-types
  defaultSize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number]),
  size: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number]),
  split: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['vertical', 'horizontal']),
  onDragStarted: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onDragFinished: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onResizerClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onResizerDoubleClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  style: react_style_proptype__WEBPACK_IMPORTED_MODULE_2___default.a,
  resizerStyle: react_style_proptype__WEBPACK_IMPORTED_MODULE_2___default.a,
  paneClassName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  pane1ClassName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  pane2ClassName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  paneStyle: react_style_proptype__WEBPACK_IMPORTED_MODULE_2___default.a,
  pane1Style: react_style_proptype__WEBPACK_IMPORTED_MODULE_2___default.a,
  pane2Style: react_style_proptype__WEBPACK_IMPORTED_MODULE_2___default.a,
  resizerClassName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  step: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number
};
SplitPane.defaultProps = {
  allowResize: true,
  minSize: 50,
  primary: 'first',
  split: 'vertical',
  paneClassName: '',
  pane1ClassName: '',
  pane2ClassName: ''
};
Object(react_lifecycles_compat__WEBPACK_IMPORTED_MODULE_3__["polyfill"])(SplitPane);

/* harmony default export */ __webpack_exports__["default"] = (SplitPane);



/***/ }),

/***/ "./node_modules/react-style-proptype/src/css-properties.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-style-proptype/src/css-properties.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// GENERATED DO NOT EDIT
module.exports = [
  "alignContent",
  "MozAlignContent",
  "WebkitAlignContent",
  "MSAlignContent",
  "OAlignContent",
  "alignItems",
  "MozAlignItems",
  "WebkitAlignItems",
  "MSAlignItems",
  "OAlignItems",
  "alignSelf",
  "MozAlignSelf",
  "WebkitAlignSelf",
  "MSAlignSelf",
  "OAlignSelf",
  "all",
  "MozAll",
  "WebkitAll",
  "MSAll",
  "OAll",
  "animation",
  "MozAnimation",
  "WebkitAnimation",
  "MSAnimation",
  "OAnimation",
  "animationDelay",
  "MozAnimationDelay",
  "WebkitAnimationDelay",
  "MSAnimationDelay",
  "OAnimationDelay",
  "animationDirection",
  "MozAnimationDirection",
  "WebkitAnimationDirection",
  "MSAnimationDirection",
  "OAnimationDirection",
  "animationDuration",
  "MozAnimationDuration",
  "WebkitAnimationDuration",
  "MSAnimationDuration",
  "OAnimationDuration",
  "animationFillMode",
  "MozAnimationFillMode",
  "WebkitAnimationFillMode",
  "MSAnimationFillMode",
  "OAnimationFillMode",
  "animationIterationCount",
  "MozAnimationIterationCount",
  "WebkitAnimationIterationCount",
  "MSAnimationIterationCount",
  "OAnimationIterationCount",
  "animationName",
  "MozAnimationName",
  "WebkitAnimationName",
  "MSAnimationName",
  "OAnimationName",
  "animationPlayState",
  "MozAnimationPlayState",
  "WebkitAnimationPlayState",
  "MSAnimationPlayState",
  "OAnimationPlayState",
  "animationTimingFunction",
  "MozAnimationTimingFunction",
  "WebkitAnimationTimingFunction",
  "MSAnimationTimingFunction",
  "OAnimationTimingFunction",
  "backfaceVisibility",
  "MozBackfaceVisibility",
  "WebkitBackfaceVisibility",
  "MSBackfaceVisibility",
  "OBackfaceVisibility",
  "background",
  "MozBackground",
  "WebkitBackground",
  "MSBackground",
  "OBackground",
  "backgroundAttachment",
  "MozBackgroundAttachment",
  "WebkitBackgroundAttachment",
  "MSBackgroundAttachment",
  "OBackgroundAttachment",
  "backgroundBlendMode",
  "MozBackgroundBlendMode",
  "WebkitBackgroundBlendMode",
  "MSBackgroundBlendMode",
  "OBackgroundBlendMode",
  "backgroundClip",
  "MozBackgroundClip",
  "WebkitBackgroundClip",
  "MSBackgroundClip",
  "OBackgroundClip",
  "backgroundColor",
  "MozBackgroundColor",
  "WebkitBackgroundColor",
  "MSBackgroundColor",
  "OBackgroundColor",
  "backgroundImage",
  "MozBackgroundImage",
  "WebkitBackgroundImage",
  "MSBackgroundImage",
  "OBackgroundImage",
  "backgroundOrigin",
  "MozBackgroundOrigin",
  "WebkitBackgroundOrigin",
  "MSBackgroundOrigin",
  "OBackgroundOrigin",
  "backgroundPosition",
  "MozBackgroundPosition",
  "WebkitBackgroundPosition",
  "MSBackgroundPosition",
  "OBackgroundPosition",
  "backgroundRepeat",
  "MozBackgroundRepeat",
  "WebkitBackgroundRepeat",
  "MSBackgroundRepeat",
  "OBackgroundRepeat",
  "backgroundSize",
  "MozBackgroundSize",
  "WebkitBackgroundSize",
  "MSBackgroundSize",
  "OBackgroundSize",
  "blockSize",
  "MozBlockSize",
  "WebkitBlockSize",
  "MSBlockSize",
  "OBlockSize",
  "border",
  "MozBorder",
  "WebkitBorder",
  "MSBorder",
  "OBorder",
  "borderBlockEnd",
  "MozBorderBlockEnd",
  "WebkitBorderBlockEnd",
  "MSBorderBlockEnd",
  "OBorderBlockEnd",
  "borderBlockEndColor",
  "MozBorderBlockEndColor",
  "WebkitBorderBlockEndColor",
  "MSBorderBlockEndColor",
  "OBorderBlockEndColor",
  "borderBlockEndStyle",
  "MozBorderBlockEndStyle",
  "WebkitBorderBlockEndStyle",
  "MSBorderBlockEndStyle",
  "OBorderBlockEndStyle",
  "borderBlockEndWidth",
  "MozBorderBlockEndWidth",
  "WebkitBorderBlockEndWidth",
  "MSBorderBlockEndWidth",
  "OBorderBlockEndWidth",
  "borderBlockStart",
  "MozBorderBlockStart",
  "WebkitBorderBlockStart",
  "MSBorderBlockStart",
  "OBorderBlockStart",
  "borderBlockStartColor",
  "MozBorderBlockStartColor",
  "WebkitBorderBlockStartColor",
  "MSBorderBlockStartColor",
  "OBorderBlockStartColor",
  "borderBlockStartStyle",
  "MozBorderBlockStartStyle",
  "WebkitBorderBlockStartStyle",
  "MSBorderBlockStartStyle",
  "OBorderBlockStartStyle",
  "borderBlockStartWidth",
  "MozBorderBlockStartWidth",
  "WebkitBorderBlockStartWidth",
  "MSBorderBlockStartWidth",
  "OBorderBlockStartWidth",
  "borderBottom",
  "MozBorderBottom",
  "WebkitBorderBottom",
  "MSBorderBottom",
  "OBorderBottom",
  "borderBottomColor",
  "MozBorderBottomColor",
  "WebkitBorderBottomColor",
  "MSBorderBottomColor",
  "OBorderBottomColor",
  "borderBottomLeftRadius",
  "MozBorderBottomLeftRadius",
  "WebkitBorderBottomLeftRadius",
  "MSBorderBottomLeftRadius",
  "OBorderBottomLeftRadius",
  "borderBottomRightRadius",
  "MozBorderBottomRightRadius",
  "WebkitBorderBottomRightRadius",
  "MSBorderBottomRightRadius",
  "OBorderBottomRightRadius",
  "borderBottomStyle",
  "MozBorderBottomStyle",
  "WebkitBorderBottomStyle",
  "MSBorderBottomStyle",
  "OBorderBottomStyle",
  "borderBottomWidth",
  "MozBorderBottomWidth",
  "WebkitBorderBottomWidth",
  "MSBorderBottomWidth",
  "OBorderBottomWidth",
  "borderCollapse",
  "MozBorderCollapse",
  "WebkitBorderCollapse",
  "MSBorderCollapse",
  "OBorderCollapse",
  "borderColor",
  "MozBorderColor",
  "WebkitBorderColor",
  "MSBorderColor",
  "OBorderColor",
  "borderImage",
  "MozBorderImage",
  "WebkitBorderImage",
  "MSBorderImage",
  "OBorderImage",
  "borderImageOutset",
  "MozBorderImageOutset",
  "WebkitBorderImageOutset",
  "MSBorderImageOutset",
  "OBorderImageOutset",
  "borderImageRepeat",
  "MozBorderImageRepeat",
  "WebkitBorderImageRepeat",
  "MSBorderImageRepeat",
  "OBorderImageRepeat",
  "borderImageSlice",
  "MozBorderImageSlice",
  "WebkitBorderImageSlice",
  "MSBorderImageSlice",
  "OBorderImageSlice",
  "borderImageSource",
  "MozBorderImageSource",
  "WebkitBorderImageSource",
  "MSBorderImageSource",
  "OBorderImageSource",
  "borderImageWidth",
  "MozBorderImageWidth",
  "WebkitBorderImageWidth",
  "MSBorderImageWidth",
  "OBorderImageWidth",
  "borderInlineEnd",
  "MozBorderInlineEnd",
  "WebkitBorderInlineEnd",
  "MSBorderInlineEnd",
  "OBorderInlineEnd",
  "borderInlineEndColor",
  "MozBorderInlineEndColor",
  "WebkitBorderInlineEndColor",
  "MSBorderInlineEndColor",
  "OBorderInlineEndColor",
  "borderInlineEndStyle",
  "MozBorderInlineEndStyle",
  "WebkitBorderInlineEndStyle",
  "MSBorderInlineEndStyle",
  "OBorderInlineEndStyle",
  "borderInlineEndWidth",
  "MozBorderInlineEndWidth",
  "WebkitBorderInlineEndWidth",
  "MSBorderInlineEndWidth",
  "OBorderInlineEndWidth",
  "borderInlineStart",
  "MozBorderInlineStart",
  "WebkitBorderInlineStart",
  "MSBorderInlineStart",
  "OBorderInlineStart",
  "borderInlineStartColor",
  "MozBorderInlineStartColor",
  "WebkitBorderInlineStartColor",
  "MSBorderInlineStartColor",
  "OBorderInlineStartColor",
  "borderInlineStartStyle",
  "MozBorderInlineStartStyle",
  "WebkitBorderInlineStartStyle",
  "MSBorderInlineStartStyle",
  "OBorderInlineStartStyle",
  "borderInlineStartWidth",
  "MozBorderInlineStartWidth",
  "WebkitBorderInlineStartWidth",
  "MSBorderInlineStartWidth",
  "OBorderInlineStartWidth",
  "borderLeft",
  "MozBorderLeft",
  "WebkitBorderLeft",
  "MSBorderLeft",
  "OBorderLeft",
  "borderLeftColor",
  "MozBorderLeftColor",
  "WebkitBorderLeftColor",
  "MSBorderLeftColor",
  "OBorderLeftColor",
  "borderLeftStyle",
  "MozBorderLeftStyle",
  "WebkitBorderLeftStyle",
  "MSBorderLeftStyle",
  "OBorderLeftStyle",
  "borderLeftWidth",
  "MozBorderLeftWidth",
  "WebkitBorderLeftWidth",
  "MSBorderLeftWidth",
  "OBorderLeftWidth",
  "borderRadius",
  "MozBorderRadius",
  "WebkitBorderRadius",
  "MSBorderRadius",
  "OBorderRadius",
  "borderRight",
  "MozBorderRight",
  "WebkitBorderRight",
  "MSBorderRight",
  "OBorderRight",
  "borderRightColor",
  "MozBorderRightColor",
  "WebkitBorderRightColor",
  "MSBorderRightColor",
  "OBorderRightColor",
  "borderRightStyle",
  "MozBorderRightStyle",
  "WebkitBorderRightStyle",
  "MSBorderRightStyle",
  "OBorderRightStyle",
  "borderRightWidth",
  "MozBorderRightWidth",
  "WebkitBorderRightWidth",
  "MSBorderRightWidth",
  "OBorderRightWidth",
  "borderSpacing",
  "MozBorderSpacing",
  "WebkitBorderSpacing",
  "MSBorderSpacing",
  "OBorderSpacing",
  "borderStyle",
  "MozBorderStyle",
  "WebkitBorderStyle",
  "MSBorderStyle",
  "OBorderStyle",
  "borderTop",
  "MozBorderTop",
  "WebkitBorderTop",
  "MSBorderTop",
  "OBorderTop",
  "borderTopColor",
  "MozBorderTopColor",
  "WebkitBorderTopColor",
  "MSBorderTopColor",
  "OBorderTopColor",
  "borderTopLeftRadius",
  "MozBorderTopLeftRadius",
  "WebkitBorderTopLeftRadius",
  "MSBorderTopLeftRadius",
  "OBorderTopLeftRadius",
  "borderTopRightRadius",
  "MozBorderTopRightRadius",
  "WebkitBorderTopRightRadius",
  "MSBorderTopRightRadius",
  "OBorderTopRightRadius",
  "borderTopStyle",
  "MozBorderTopStyle",
  "WebkitBorderTopStyle",
  "MSBorderTopStyle",
  "OBorderTopStyle",
  "borderTopWidth",
  "MozBorderTopWidth",
  "WebkitBorderTopWidth",
  "MSBorderTopWidth",
  "OBorderTopWidth",
  "borderWidth",
  "MozBorderWidth",
  "WebkitBorderWidth",
  "MSBorderWidth",
  "OBorderWidth",
  "bottom",
  "MozBottom",
  "WebkitBottom",
  "MSBottom",
  "OBottom",
  "boxDecorationBreak",
  "MozBoxDecorationBreak",
  "WebkitBoxDecorationBreak",
  "MSBoxDecorationBreak",
  "OBoxDecorationBreak",
  "boxShadow",
  "MozBoxShadow",
  "WebkitBoxShadow",
  "MSBoxShadow",
  "OBoxShadow",
  "boxSizing",
  "MozBoxSizing",
  "WebkitBoxSizing",
  "MSBoxSizing",
  "OBoxSizing",
  "breakAfter",
  "MozBreakAfter",
  "WebkitBreakAfter",
  "MSBreakAfter",
  "OBreakAfter",
  "breakBefore",
  "MozBreakBefore",
  "WebkitBreakBefore",
  "MSBreakBefore",
  "OBreakBefore",
  "breakInside",
  "MozBreakInside",
  "WebkitBreakInside",
  "MSBreakInside",
  "OBreakInside",
  "captionSide",
  "MozCaptionSide",
  "WebkitCaptionSide",
  "MSCaptionSide",
  "OCaptionSide",
  "caretColor",
  "MozCaretColor",
  "WebkitCaretColor",
  "MSCaretColor",
  "OCaretColor",
  "ch",
  "MozCh",
  "WebkitCh",
  "MSCh",
  "OCh",
  "clear",
  "MozClear",
  "WebkitClear",
  "MSClear",
  "OClear",
  "clip",
  "MozClip",
  "WebkitClip",
  "MSClip",
  "OClip",
  "clipPath",
  "MozClipPath",
  "WebkitClipPath",
  "MSClipPath",
  "OClipPath",
  "cm",
  "MozCm",
  "WebkitCm",
  "MSCm",
  "OCm",
  "color",
  "MozColor",
  "WebkitColor",
  "MSColor",
  "OColor",
  "columnCount",
  "MozColumnCount",
  "WebkitColumnCount",
  "MSColumnCount",
  "OColumnCount",
  "columnFill",
  "MozColumnFill",
  "WebkitColumnFill",
  "MSColumnFill",
  "OColumnFill",
  "columnGap",
  "MozColumnGap",
  "WebkitColumnGap",
  "MSColumnGap",
  "OColumnGap",
  "columnRule",
  "MozColumnRule",
  "WebkitColumnRule",
  "MSColumnRule",
  "OColumnRule",
  "columnRuleColor",
  "MozColumnRuleColor",
  "WebkitColumnRuleColor",
  "MSColumnRuleColor",
  "OColumnRuleColor",
  "columnRuleStyle",
  "MozColumnRuleStyle",
  "WebkitColumnRuleStyle",
  "MSColumnRuleStyle",
  "OColumnRuleStyle",
  "columnRuleWidth",
  "MozColumnRuleWidth",
  "WebkitColumnRuleWidth",
  "MSColumnRuleWidth",
  "OColumnRuleWidth",
  "columnSpan",
  "MozColumnSpan",
  "WebkitColumnSpan",
  "MSColumnSpan",
  "OColumnSpan",
  "columnWidth",
  "MozColumnWidth",
  "WebkitColumnWidth",
  "MSColumnWidth",
  "OColumnWidth",
  "columns",
  "MozColumns",
  "WebkitColumns",
  "MSColumns",
  "OColumns",
  "content",
  "MozContent",
  "WebkitContent",
  "MSContent",
  "OContent",
  "counterIncrement",
  "MozCounterIncrement",
  "WebkitCounterIncrement",
  "MSCounterIncrement",
  "OCounterIncrement",
  "counterReset",
  "MozCounterReset",
  "WebkitCounterReset",
  "MSCounterReset",
  "OCounterReset",
  "cursor",
  "MozCursor",
  "WebkitCursor",
  "MSCursor",
  "OCursor",
  "deg",
  "MozDeg",
  "WebkitDeg",
  "MSDeg",
  "ODeg",
  "direction",
  "MozDirection",
  "WebkitDirection",
  "MSDirection",
  "ODirection",
  "display",
  "MozDisplay",
  "WebkitDisplay",
  "MSDisplay",
  "ODisplay",
  "dpcm",
  "MozDpcm",
  "WebkitDpcm",
  "MSDpcm",
  "ODpcm",
  "dpi",
  "MozDpi",
  "WebkitDpi",
  "MSDpi",
  "ODpi",
  "dppx",
  "MozDppx",
  "WebkitDppx",
  "MSDppx",
  "ODppx",
  "em",
  "MozEm",
  "WebkitEm",
  "MSEm",
  "OEm",
  "emptyCells",
  "MozEmptyCells",
  "WebkitEmptyCells",
  "MSEmptyCells",
  "OEmptyCells",
  "ex",
  "MozEx",
  "WebkitEx",
  "MSEx",
  "OEx",
  "filter",
  "MozFilter",
  "WebkitFilter",
  "MSFilter",
  "OFilter",
  "flexBasis",
  "MozFlexBasis",
  "WebkitFlexBasis",
  "MSFlexBasis",
  "OFlexBasis",
  "flexDirection",
  "MozFlexDirection",
  "WebkitFlexDirection",
  "MSFlexDirection",
  "OFlexDirection",
  "flexFlow",
  "MozFlexFlow",
  "WebkitFlexFlow",
  "MSFlexFlow",
  "OFlexFlow",
  "flexGrow",
  "MozFlexGrow",
  "WebkitFlexGrow",
  "MSFlexGrow",
  "OFlexGrow",
  "flexShrink",
  "MozFlexShrink",
  "WebkitFlexShrink",
  "MSFlexShrink",
  "OFlexShrink",
  "flexWrap",
  "MozFlexWrap",
  "WebkitFlexWrap",
  "MSFlexWrap",
  "OFlexWrap",
  "float",
  "MozFloat",
  "WebkitFloat",
  "MSFloat",
  "OFloat",
  "font",
  "MozFont",
  "WebkitFont",
  "MSFont",
  "OFont",
  "fontFamily",
  "MozFontFamily",
  "WebkitFontFamily",
  "MSFontFamily",
  "OFontFamily",
  "fontFeatureSettings",
  "MozFontFeatureSettings",
  "WebkitFontFeatureSettings",
  "MSFontFeatureSettings",
  "OFontFeatureSettings",
  "fontKerning",
  "MozFontKerning",
  "WebkitFontKerning",
  "MSFontKerning",
  "OFontKerning",
  "fontLanguageOverride",
  "MozFontLanguageOverride",
  "WebkitFontLanguageOverride",
  "MSFontLanguageOverride",
  "OFontLanguageOverride",
  "fontSize",
  "MozFontSize",
  "WebkitFontSize",
  "MSFontSize",
  "OFontSize",
  "fontSizeAdjust",
  "MozFontSizeAdjust",
  "WebkitFontSizeAdjust",
  "MSFontSizeAdjust",
  "OFontSizeAdjust",
  "fontStretch",
  "MozFontStretch",
  "WebkitFontStretch",
  "MSFontStretch",
  "OFontStretch",
  "fontStyle",
  "MozFontStyle",
  "WebkitFontStyle",
  "MSFontStyle",
  "OFontStyle",
  "fontSynthesis",
  "MozFontSynthesis",
  "WebkitFontSynthesis",
  "MSFontSynthesis",
  "OFontSynthesis",
  "fontVariant",
  "MozFontVariant",
  "WebkitFontVariant",
  "MSFontVariant",
  "OFontVariant",
  "fontVariantAlternates",
  "MozFontVariantAlternates",
  "WebkitFontVariantAlternates",
  "MSFontVariantAlternates",
  "OFontVariantAlternates",
  "fontVariantCaps",
  "MozFontVariantCaps",
  "WebkitFontVariantCaps",
  "MSFontVariantCaps",
  "OFontVariantCaps",
  "fontVariantEastAsian",
  "MozFontVariantEastAsian",
  "WebkitFontVariantEastAsian",
  "MSFontVariantEastAsian",
  "OFontVariantEastAsian",
  "fontVariantLigatures",
  "MozFontVariantLigatures",
  "WebkitFontVariantLigatures",
  "MSFontVariantLigatures",
  "OFontVariantLigatures",
  "fontVariantNumeric",
  "MozFontVariantNumeric",
  "WebkitFontVariantNumeric",
  "MSFontVariantNumeric",
  "OFontVariantNumeric",
  "fontVariantPosition",
  "MozFontVariantPosition",
  "WebkitFontVariantPosition",
  "MSFontVariantPosition",
  "OFontVariantPosition",
  "fontWeight",
  "MozFontWeight",
  "WebkitFontWeight",
  "MSFontWeight",
  "OFontWeight",
  "fr",
  "MozFr",
  "WebkitFr",
  "MSFr",
  "OFr",
  "grad",
  "MozGrad",
  "WebkitGrad",
  "MSGrad",
  "OGrad",
  "grid",
  "MozGrid",
  "WebkitGrid",
  "MSGrid",
  "OGrid",
  "gridArea",
  "MozGridArea",
  "WebkitGridArea",
  "MSGridArea",
  "OGridArea",
  "gridAutoColumns",
  "MozGridAutoColumns",
  "WebkitGridAutoColumns",
  "MSGridAutoColumns",
  "OGridAutoColumns",
  "gridAutoFlow",
  "MozGridAutoFlow",
  "WebkitGridAutoFlow",
  "MSGridAutoFlow",
  "OGridAutoFlow",
  "gridAutoRows",
  "MozGridAutoRows",
  "WebkitGridAutoRows",
  "MSGridAutoRows",
  "OGridAutoRows",
  "gridColumn",
  "MozGridColumn",
  "WebkitGridColumn",
  "MSGridColumn",
  "OGridColumn",
  "gridColumnEnd",
  "MozGridColumnEnd",
  "WebkitGridColumnEnd",
  "MSGridColumnEnd",
  "OGridColumnEnd",
  "gridColumnGap",
  "MozGridColumnGap",
  "WebkitGridColumnGap",
  "MSGridColumnGap",
  "OGridColumnGap",
  "gridColumnStart",
  "MozGridColumnStart",
  "WebkitGridColumnStart",
  "MSGridColumnStart",
  "OGridColumnStart",
  "gridGap",
  "MozGridGap",
  "WebkitGridGap",
  "MSGridGap",
  "OGridGap",
  "gridRow",
  "MozGridRow",
  "WebkitGridRow",
  "MSGridRow",
  "OGridRow",
  "gridRowEnd",
  "MozGridRowEnd",
  "WebkitGridRowEnd",
  "MSGridRowEnd",
  "OGridRowEnd",
  "gridRowGap",
  "MozGridRowGap",
  "WebkitGridRowGap",
  "MSGridRowGap",
  "OGridRowGap",
  "gridRowStart",
  "MozGridRowStart",
  "WebkitGridRowStart",
  "MSGridRowStart",
  "OGridRowStart",
  "gridTemplate",
  "MozGridTemplate",
  "WebkitGridTemplate",
  "MSGridTemplate",
  "OGridTemplate",
  "gridTemplateAreas",
  "MozGridTemplateAreas",
  "WebkitGridTemplateAreas",
  "MSGridTemplateAreas",
  "OGridTemplateAreas",
  "gridTemplateColumns",
  "MozGridTemplateColumns",
  "WebkitGridTemplateColumns",
  "MSGridTemplateColumns",
  "OGridTemplateColumns",
  "gridTemplateRows",
  "MozGridTemplateRows",
  "WebkitGridTemplateRows",
  "MSGridTemplateRows",
  "OGridTemplateRows",
  "height",
  "MozHeight",
  "WebkitHeight",
  "MSHeight",
  "OHeight",
  "hyphens",
  "MozHyphens",
  "WebkitHyphens",
  "MSHyphens",
  "OHyphens",
  "hz",
  "MozHz",
  "WebkitHz",
  "MSHz",
  "OHz",
  "imageOrientation",
  "MozImageOrientation",
  "WebkitImageOrientation",
  "MSImageOrientation",
  "OImageOrientation",
  "imageRendering",
  "MozImageRendering",
  "WebkitImageRendering",
  "MSImageRendering",
  "OImageRendering",
  "imageResolution",
  "MozImageResolution",
  "WebkitImageResolution",
  "MSImageResolution",
  "OImageResolution",
  "imeMode",
  "MozImeMode",
  "WebkitImeMode",
  "MSImeMode",
  "OImeMode",
  "in",
  "MozIn",
  "WebkitIn",
  "MSIn",
  "OIn",
  "inherit",
  "MozInherit",
  "WebkitInherit",
  "MSInherit",
  "OInherit",
  "initial",
  "MozInitial",
  "WebkitInitial",
  "MSInitial",
  "OInitial",
  "inlineSize",
  "MozInlineSize",
  "WebkitInlineSize",
  "MSInlineSize",
  "OInlineSize",
  "isolation",
  "MozIsolation",
  "WebkitIsolation",
  "MSIsolation",
  "OIsolation",
  "justifyContent",
  "MozJustifyContent",
  "WebkitJustifyContent",
  "MSJustifyContent",
  "OJustifyContent",
  "khz",
  "MozKhz",
  "WebkitKhz",
  "MSKhz",
  "OKhz",
  "left",
  "MozLeft",
  "WebkitLeft",
  "MSLeft",
  "OLeft",
  "letterSpacing",
  "MozLetterSpacing",
  "WebkitLetterSpacing",
  "MSLetterSpacing",
  "OLetterSpacing",
  "lineBreak",
  "MozLineBreak",
  "WebkitLineBreak",
  "MSLineBreak",
  "OLineBreak",
  "lineHeight",
  "MozLineHeight",
  "WebkitLineHeight",
  "MSLineHeight",
  "OLineHeight",
  "listStyle",
  "MozListStyle",
  "WebkitListStyle",
  "MSListStyle",
  "OListStyle",
  "listStyleImage",
  "MozListStyleImage",
  "WebkitListStyleImage",
  "MSListStyleImage",
  "OListStyleImage",
  "listStylePosition",
  "MozListStylePosition",
  "WebkitListStylePosition",
  "MSListStylePosition",
  "OListStylePosition",
  "listStyleType",
  "MozListStyleType",
  "WebkitListStyleType",
  "MSListStyleType",
  "OListStyleType",
  "margin",
  "MozMargin",
  "WebkitMargin",
  "MSMargin",
  "OMargin",
  "marginBlockEnd",
  "MozMarginBlockEnd",
  "WebkitMarginBlockEnd",
  "MSMarginBlockEnd",
  "OMarginBlockEnd",
  "marginBlockStart",
  "MozMarginBlockStart",
  "WebkitMarginBlockStart",
  "MSMarginBlockStart",
  "OMarginBlockStart",
  "marginBottom",
  "MozMarginBottom",
  "WebkitMarginBottom",
  "MSMarginBottom",
  "OMarginBottom",
  "marginInlineEnd",
  "MozMarginInlineEnd",
  "WebkitMarginInlineEnd",
  "MSMarginInlineEnd",
  "OMarginInlineEnd",
  "marginInlineStart",
  "MozMarginInlineStart",
  "WebkitMarginInlineStart",
  "MSMarginInlineStart",
  "OMarginInlineStart",
  "marginLeft",
  "MozMarginLeft",
  "WebkitMarginLeft",
  "MSMarginLeft",
  "OMarginLeft",
  "marginRight",
  "MozMarginRight",
  "WebkitMarginRight",
  "MSMarginRight",
  "OMarginRight",
  "marginTop",
  "MozMarginTop",
  "WebkitMarginTop",
  "MSMarginTop",
  "OMarginTop",
  "mask",
  "MozMask",
  "WebkitMask",
  "MSMask",
  "OMask",
  "maskClip",
  "MozMaskClip",
  "WebkitMaskClip",
  "MSMaskClip",
  "OMaskClip",
  "maskComposite",
  "MozMaskComposite",
  "WebkitMaskComposite",
  "MSMaskComposite",
  "OMaskComposite",
  "maskImage",
  "MozMaskImage",
  "WebkitMaskImage",
  "MSMaskImage",
  "OMaskImage",
  "maskMode",
  "MozMaskMode",
  "WebkitMaskMode",
  "MSMaskMode",
  "OMaskMode",
  "maskOrigin",
  "MozMaskOrigin",
  "WebkitMaskOrigin",
  "MSMaskOrigin",
  "OMaskOrigin",
  "maskPosition",
  "MozMaskPosition",
  "WebkitMaskPosition",
  "MSMaskPosition",
  "OMaskPosition",
  "maskRepeat",
  "MozMaskRepeat",
  "WebkitMaskRepeat",
  "MSMaskRepeat",
  "OMaskRepeat",
  "maskSize",
  "MozMaskSize",
  "WebkitMaskSize",
  "MSMaskSize",
  "OMaskSize",
  "maskType",
  "MozMaskType",
  "WebkitMaskType",
  "MSMaskType",
  "OMaskType",
  "maxHeight",
  "MozMaxHeight",
  "WebkitMaxHeight",
  "MSMaxHeight",
  "OMaxHeight",
  "maxWidth",
  "MozMaxWidth",
  "WebkitMaxWidth",
  "MSMaxWidth",
  "OMaxWidth",
  "minBlockSize",
  "MozMinBlockSize",
  "WebkitMinBlockSize",
  "MSMinBlockSize",
  "OMinBlockSize",
  "minHeight",
  "MozMinHeight",
  "WebkitMinHeight",
  "MSMinHeight",
  "OMinHeight",
  "minInlineSize",
  "MozMinInlineSize",
  "WebkitMinInlineSize",
  "MSMinInlineSize",
  "OMinInlineSize",
  "minWidth",
  "MozMinWidth",
  "WebkitMinWidth",
  "MSMinWidth",
  "OMinWidth",
  "mixBlendMode",
  "MozMixBlendMode",
  "WebkitMixBlendMode",
  "MSMixBlendMode",
  "OMixBlendMode",
  "mm",
  "MozMm",
  "WebkitMm",
  "MSMm",
  "OMm",
  "ms",
  "MozMs",
  "WebkitMs",
  "MSMs",
  "OMs",
  "objectFit",
  "MozObjectFit",
  "WebkitObjectFit",
  "MSObjectFit",
  "OObjectFit",
  "objectPosition",
  "MozObjectPosition",
  "WebkitObjectPosition",
  "MSObjectPosition",
  "OObjectPosition",
  "offsetBlockEnd",
  "MozOffsetBlockEnd",
  "WebkitOffsetBlockEnd",
  "MSOffsetBlockEnd",
  "OOffsetBlockEnd",
  "offsetBlockStart",
  "MozOffsetBlockStart",
  "WebkitOffsetBlockStart",
  "MSOffsetBlockStart",
  "OOffsetBlockStart",
  "offsetInlineEnd",
  "MozOffsetInlineEnd",
  "WebkitOffsetInlineEnd",
  "MSOffsetInlineEnd",
  "OOffsetInlineEnd",
  "offsetInlineStart",
  "MozOffsetInlineStart",
  "WebkitOffsetInlineStart",
  "MSOffsetInlineStart",
  "OOffsetInlineStart",
  "opacity",
  "MozOpacity",
  "WebkitOpacity",
  "MSOpacity",
  "OOpacity",
  "order",
  "MozOrder",
  "WebkitOrder",
  "MSOrder",
  "OOrder",
  "orphans",
  "MozOrphans",
  "WebkitOrphans",
  "MSOrphans",
  "OOrphans",
  "outline",
  "MozOutline",
  "WebkitOutline",
  "MSOutline",
  "OOutline",
  "outlineColor",
  "MozOutlineColor",
  "WebkitOutlineColor",
  "MSOutlineColor",
  "OOutlineColor",
  "outlineOffset",
  "MozOutlineOffset",
  "WebkitOutlineOffset",
  "MSOutlineOffset",
  "OOutlineOffset",
  "outlineStyle",
  "MozOutlineStyle",
  "WebkitOutlineStyle",
  "MSOutlineStyle",
  "OOutlineStyle",
  "outlineWidth",
  "MozOutlineWidth",
  "WebkitOutlineWidth",
  "MSOutlineWidth",
  "OOutlineWidth",
  "overflow",
  "MozOverflow",
  "WebkitOverflow",
  "MSOverflow",
  "OOverflow",
  "overflowWrap",
  "MozOverflowWrap",
  "WebkitOverflowWrap",
  "MSOverflowWrap",
  "OOverflowWrap",
  "overflowX",
  "MozOverflowX",
  "WebkitOverflowX",
  "MSOverflowX",
  "OOverflowX",
  "overflowY",
  "MozOverflowY",
  "WebkitOverflowY",
  "MSOverflowY",
  "OOverflowY",
  "padding",
  "MozPadding",
  "WebkitPadding",
  "MSPadding",
  "OPadding",
  "paddingBlockEnd",
  "MozPaddingBlockEnd",
  "WebkitPaddingBlockEnd",
  "MSPaddingBlockEnd",
  "OPaddingBlockEnd",
  "paddingBlockStart",
  "MozPaddingBlockStart",
  "WebkitPaddingBlockStart",
  "MSPaddingBlockStart",
  "OPaddingBlockStart",
  "paddingBottom",
  "MozPaddingBottom",
  "WebkitPaddingBottom",
  "MSPaddingBottom",
  "OPaddingBottom",
  "paddingInlineEnd",
  "MozPaddingInlineEnd",
  "WebkitPaddingInlineEnd",
  "MSPaddingInlineEnd",
  "OPaddingInlineEnd",
  "paddingInlineStart",
  "MozPaddingInlineStart",
  "WebkitPaddingInlineStart",
  "MSPaddingInlineStart",
  "OPaddingInlineStart",
  "paddingLeft",
  "MozPaddingLeft",
  "WebkitPaddingLeft",
  "MSPaddingLeft",
  "OPaddingLeft",
  "paddingRight",
  "MozPaddingRight",
  "WebkitPaddingRight",
  "MSPaddingRight",
  "OPaddingRight",
  "paddingTop",
  "MozPaddingTop",
  "WebkitPaddingTop",
  "MSPaddingTop",
  "OPaddingTop",
  "pageBreakAfter",
  "MozPageBreakAfter",
  "WebkitPageBreakAfter",
  "MSPageBreakAfter",
  "OPageBreakAfter",
  "pageBreakBefore",
  "MozPageBreakBefore",
  "WebkitPageBreakBefore",
  "MSPageBreakBefore",
  "OPageBreakBefore",
  "pageBreakInside",
  "MozPageBreakInside",
  "WebkitPageBreakInside",
  "MSPageBreakInside",
  "OPageBreakInside",
  "pc",
  "MozPc",
  "WebkitPc",
  "MSPc",
  "OPc",
  "perspective",
  "MozPerspective",
  "WebkitPerspective",
  "MSPerspective",
  "OPerspective",
  "perspectiveOrigin",
  "MozPerspectiveOrigin",
  "WebkitPerspectiveOrigin",
  "MSPerspectiveOrigin",
  "OPerspectiveOrigin",
  "pointerEvents",
  "MozPointerEvents",
  "WebkitPointerEvents",
  "MSPointerEvents",
  "OPointerEvents",
  "position",
  "MozPosition",
  "WebkitPosition",
  "MSPosition",
  "OPosition",
  "pt",
  "MozPt",
  "WebkitPt",
  "MSPt",
  "OPt",
  "px",
  "MozPx",
  "WebkitPx",
  "MSPx",
  "OPx",
  "q",
  "MozQ",
  "WebkitQ",
  "MSQ",
  "OQ",
  "quotes",
  "MozQuotes",
  "WebkitQuotes",
  "MSQuotes",
  "OQuotes",
  "rad",
  "MozRad",
  "WebkitRad",
  "MSRad",
  "ORad",
  "rem",
  "MozRem",
  "WebkitRem",
  "MSRem",
  "ORem",
  "resize",
  "MozResize",
  "WebkitResize",
  "MSResize",
  "OResize",
  "revert",
  "MozRevert",
  "WebkitRevert",
  "MSRevert",
  "ORevert",
  "right",
  "MozRight",
  "WebkitRight",
  "MSRight",
  "ORight",
  "rubyAlign",
  "MozRubyAlign",
  "WebkitRubyAlign",
  "MSRubyAlign",
  "ORubyAlign",
  "rubyMerge",
  "MozRubyMerge",
  "WebkitRubyMerge",
  "MSRubyMerge",
  "ORubyMerge",
  "rubyPosition",
  "MozRubyPosition",
  "WebkitRubyPosition",
  "MSRubyPosition",
  "ORubyPosition",
  "s",
  "MozS",
  "WebkitS",
  "MSS",
  "OS",
  "scrollBehavior",
  "MozScrollBehavior",
  "WebkitScrollBehavior",
  "MSScrollBehavior",
  "OScrollBehavior",
  "scrollSnapCoordinate",
  "MozScrollSnapCoordinate",
  "WebkitScrollSnapCoordinate",
  "MSScrollSnapCoordinate",
  "OScrollSnapCoordinate",
  "scrollSnapDestination",
  "MozScrollSnapDestination",
  "WebkitScrollSnapDestination",
  "MSScrollSnapDestination",
  "OScrollSnapDestination",
  "scrollSnapType",
  "MozScrollSnapType",
  "WebkitScrollSnapType",
  "MSScrollSnapType",
  "OScrollSnapType",
  "shapeImageThreshold",
  "MozShapeImageThreshold",
  "WebkitShapeImageThreshold",
  "MSShapeImageThreshold",
  "OShapeImageThreshold",
  "shapeMargin",
  "MozShapeMargin",
  "WebkitShapeMargin",
  "MSShapeMargin",
  "OShapeMargin",
  "shapeOutside",
  "MozShapeOutside",
  "WebkitShapeOutside",
  "MSShapeOutside",
  "OShapeOutside",
  "tabSize",
  "MozTabSize",
  "WebkitTabSize",
  "MSTabSize",
  "OTabSize",
  "tableLayout",
  "MozTableLayout",
  "WebkitTableLayout",
  "MSTableLayout",
  "OTableLayout",
  "textAlign",
  "MozTextAlign",
  "WebkitTextAlign",
  "MSTextAlign",
  "OTextAlign",
  "textAlignLast",
  "MozTextAlignLast",
  "WebkitTextAlignLast",
  "MSTextAlignLast",
  "OTextAlignLast",
  "textCombineUpright",
  "MozTextCombineUpright",
  "WebkitTextCombineUpright",
  "MSTextCombineUpright",
  "OTextCombineUpright",
  "textDecoration",
  "MozTextDecoration",
  "WebkitTextDecoration",
  "MSTextDecoration",
  "OTextDecoration",
  "textDecorationColor",
  "MozTextDecorationColor",
  "WebkitTextDecorationColor",
  "MSTextDecorationColor",
  "OTextDecorationColor",
  "textDecorationLine",
  "MozTextDecorationLine",
  "WebkitTextDecorationLine",
  "MSTextDecorationLine",
  "OTextDecorationLine",
  "textDecorationStyle",
  "MozTextDecorationStyle",
  "WebkitTextDecorationStyle",
  "MSTextDecorationStyle",
  "OTextDecorationStyle",
  "textEmphasis",
  "MozTextEmphasis",
  "WebkitTextEmphasis",
  "MSTextEmphasis",
  "OTextEmphasis",
  "textEmphasisColor",
  "MozTextEmphasisColor",
  "WebkitTextEmphasisColor",
  "MSTextEmphasisColor",
  "OTextEmphasisColor",
  "textEmphasisPosition",
  "MozTextEmphasisPosition",
  "WebkitTextEmphasisPosition",
  "MSTextEmphasisPosition",
  "OTextEmphasisPosition",
  "textEmphasisStyle",
  "MozTextEmphasisStyle",
  "WebkitTextEmphasisStyle",
  "MSTextEmphasisStyle",
  "OTextEmphasisStyle",
  "textIndent",
  "MozTextIndent",
  "WebkitTextIndent",
  "MSTextIndent",
  "OTextIndent",
  "textOrientation",
  "MozTextOrientation",
  "WebkitTextOrientation",
  "MSTextOrientation",
  "OTextOrientation",
  "textOverflow",
  "MozTextOverflow",
  "WebkitTextOverflow",
  "MSTextOverflow",
  "OTextOverflow",
  "textRendering",
  "MozTextRendering",
  "WebkitTextRendering",
  "MSTextRendering",
  "OTextRendering",
  "textShadow",
  "MozTextShadow",
  "WebkitTextShadow",
  "MSTextShadow",
  "OTextShadow",
  "textTransform",
  "MozTextTransform",
  "WebkitTextTransform",
  "MSTextTransform",
  "OTextTransform",
  "textUnderlinePosition",
  "MozTextUnderlinePosition",
  "WebkitTextUnderlinePosition",
  "MSTextUnderlinePosition",
  "OTextUnderlinePosition",
  "top",
  "MozTop",
  "WebkitTop",
  "MSTop",
  "OTop",
  "touchAction",
  "MozTouchAction",
  "WebkitTouchAction",
  "MSTouchAction",
  "OTouchAction",
  "transform",
  "MozTransform",
  "WebkitTransform",
  "msTransform",
  "OTransform",
  "transformBox",
  "MozTransformBox",
  "WebkitTransformBox",
  "MSTransformBox",
  "OTransformBox",
  "transformOrigin",
  "MozTransformOrigin",
  "WebkitTransformOrigin",
  "MSTransformOrigin",
  "OTransformOrigin",
  "transformStyle",
  "MozTransformStyle",
  "WebkitTransformStyle",
  "MSTransformStyle",
  "OTransformStyle",
  "transition",
  "MozTransition",
  "WebkitTransition",
  "MSTransition",
  "OTransition",
  "transitionDelay",
  "MozTransitionDelay",
  "WebkitTransitionDelay",
  "MSTransitionDelay",
  "OTransitionDelay",
  "transitionDuration",
  "MozTransitionDuration",
  "WebkitTransitionDuration",
  "MSTransitionDuration",
  "OTransitionDuration",
  "transitionProperty",
  "MozTransitionProperty",
  "WebkitTransitionProperty",
  "MSTransitionProperty",
  "OTransitionProperty",
  "transitionTimingFunction",
  "MozTransitionTimingFunction",
  "WebkitTransitionTimingFunction",
  "MSTransitionTimingFunction",
  "OTransitionTimingFunction",
  "turn",
  "MozTurn",
  "WebkitTurn",
  "MSTurn",
  "OTurn",
  "unicodeBidi",
  "MozUnicodeBidi",
  "WebkitUnicodeBidi",
  "MSUnicodeBidi",
  "OUnicodeBidi",
  "unset",
  "MozUnset",
  "WebkitUnset",
  "MSUnset",
  "OUnset",
  "verticalAlign",
  "MozVerticalAlign",
  "WebkitVerticalAlign",
  "MSVerticalAlign",
  "OVerticalAlign",
  "vh",
  "MozVh",
  "WebkitVh",
  "MSVh",
  "OVh",
  "visibility",
  "MozVisibility",
  "WebkitVisibility",
  "MSVisibility",
  "OVisibility",
  "vmax",
  "MozVmax",
  "WebkitVmax",
  "MSVmax",
  "OVmax",
  "vmin",
  "MozVmin",
  "WebkitVmin",
  "MSVmin",
  "OVmin",
  "vw",
  "MozVw",
  "WebkitVw",
  "MSVw",
  "OVw",
  "whiteSpace",
  "MozWhiteSpace",
  "WebkitWhiteSpace",
  "MSWhiteSpace",
  "OWhiteSpace",
  "widows",
  "MozWidows",
  "WebkitWidows",
  "MSWidows",
  "OWidows",
  "width",
  "MozWidth",
  "WebkitWidth",
  "MSWidth",
  "OWidth",
  "willChange",
  "MozWillChange",
  "WebkitWillChange",
  "MSWillChange",
  "OWillChange",
  "wordBreak",
  "MozWordBreak",
  "WebkitWordBreak",
  "MSWordBreak",
  "OWordBreak",
  "wordSpacing",
  "MozWordSpacing",
  "WebkitWordSpacing",
  "MSWordSpacing",
  "OWordSpacing",
  "wordWrap",
  "MozWordWrap",
  "WebkitWordWrap",
  "MSWordWrap",
  "OWordWrap",
  "writingMode",
  "MozWritingMode",
  "WebkitWritingMode",
  "MSWritingMode",
  "OWritingMode",
  "zIndex",
  "MozZIndex",
  "WebkitZIndex",
  "MSZIndex",
  "OZIndex",
  "fontSize",
  "MozFontSize",
  "WebkitFontSize",
  "MSFontSize",
  "OFontSize",
  "flex",
  "MozFlex",
  "WebkitFlex",
  "MSFlex",
  "OFlex",
  "fr",
  "MozFr",
  "WebkitFr",
  "MSFr",
  "OFr",
  "overflowScrolling",
  "MozOverflowScrolling",
  "WebkitOverflowScrolling",
  "MSOverflowScrolling",
  "OOverflowScrolling",
  "userSelect",
  "MozUserSelect",
  "WebkitUserSelect",
  "MSUserSelect",
  "OUserSelect"
]


/***/ }),

/***/ "./node_modules/react-style-proptype/src/index.js":
/*!********************************************************!*\
  !*** ./node_modules/react-style-proptype/src/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var properties = __webpack_require__(/*! ./css-properties.js */ "./node_modules/react-style-proptype/src/css-properties.js");
var PropTypes = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");

module.exports = function(props, propName, componentName) {
  var styles = props[propName];
  if (!styles) {
    return;
  }

  var failures = [];
  Object.keys(styles).forEach(function(styleKey){
    if (properties.indexOf(styleKey) === -1) {
      failures.push(styleKey);
    }
  });
  if (failures.length) {
    throw new Error('Prop ' + propName + ' passed to ' + componentName + '. Has invalid keys ' + failures.join(', '));
  }
};

module.exports.isRequired = function(props, propName, componentName) {
  if (!props[propName]) {
    throw new Error('Prop ' + propName + ' passed to ' + componentName + ' is required');
  }
  return module.exports(props, propName, componentName);
};

module.exports.supportingArrays = PropTypes.oneOfType([
  PropTypes.arrayOf(module.exports),
  module.exports
]);


/***/ }),

/***/ "./public/app/core/components/Card/Card.tsx":
/*!**************************************************!*\
  !*** ./public/app/core/components/Card/Card.tsx ***!
  \**************************************************/
/*! exports provided: Card */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Card", function() { return Card; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");


var Card = function Card(_ref) {
  var logoUrl = _ref.logoUrl,
      title = _ref.title,
      description = _ref.description,
      labels = _ref.labels,
      actions = _ref.actions,
      onClick = _ref.onClick,
      ariaLabel = _ref.ariaLabel,
      className = _ref.className;
  var mainClassName = Object(emotion__WEBPACK_IMPORTED_MODULE_1__["cx"])('add-data-source-item', className);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: mainClassName,
    onClick: onClick,
    "aria-label": ariaLabel
  }, logoUrl && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "add-data-source-item-logo",
    src: logoUrl
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "add-data-source-item-text-wrapper"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "add-data-source-item-text"
  }, title), description && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "add-data-source-item-desc"
  }, description), labels && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, labels)), actions && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "add-data-source-item-actions"
  }, actions));
};

/***/ }),

/***/ "./public/app/core/components/PluginHelp/PluginHelp.tsx":
/*!**************************************************************!*\
  !*** ./public/app/core/components/PluginHelp/PluginHelp.tsx ***!
  \**************************************************************/
/*! exports provided: PluginHelp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginHelp", function() { return PluginHelp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var PluginHelp =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PluginHelp, _PureComponent);

  function PluginHelp() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PluginHelp);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PluginHelp)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isError: false,
      isLoading: false,
      help: ''
    };

    _this.loadHelp = function () {
      var _this$props = _this.props,
          plugin = _this$props.plugin,
          type = _this$props.type;

      _this.setState({
        isLoading: true
      });

      Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().get("/api/plugins/".concat(plugin.id, "/markdown/").concat(type)).then(function (response) {
        var helpHtml = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["renderMarkdown"])(response);

        if (response === '' && type === 'help') {
          _this.setState({
            isError: false,
            isLoading: false,
            help: _this.constructPlaceholderInfo()
          });
        } else {
          _this.setState({
            isError: false,
            isLoading: false,
            help: helpHtml
          });
        }
      }).catch(function () {
        _this.setState({
          isError: true,
          isLoading: false
        });
      });
    };

    return _this;
  }

  _createClass(PluginHelp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadHelp();
    }
  }, {
    key: "constructPlaceholderInfo",
    value: function constructPlaceholderInfo() {
      return '找不到插件帮助或自述文件减价文件';
    }
  }, {
    key: "render",
    value: function render() {
      var type = this.props.type;
      var _this$state = this.state,
          isError = _this$state.isError,
          isLoading = _this$state.isLoading,
          help = _this$state.help;

      if (isLoading) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "\u6B63\u5728\u52A0\u8F7D\u5E2E\u52A9...");
      }

      if (isError) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, "'\u52A0\u8F7D\u5E2E\u52A9\u65F6\u53D1\u751F\u9519\u8BEF'");
      }

      if (type === 'panel_help' && help === '') {}

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "markdown-html",
        dangerouslySetInnerHTML: {
          __html: help
        }
      });
    }
  }]);

  return PluginHelp;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/***/ }),

/***/ "./public/app/core/utils/docsLinks.ts":
/*!********************************************!*\
  !*** ./public/app/core/utils/docsLinks.ts ***!
  \********************************************/
/*! exports provided: getDocsLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDocsLink", function() { return getDocsLink; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
var _DOCS_LINKS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // TODO: Documentation links

var DOCS_LINKS = (_DOCS_LINKS = {}, _defineProperty(_DOCS_LINKS, _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DocsId"].Transformations, 'https://grafana.com/docs/grafana/latest/panels/transformations'), _defineProperty(_DOCS_LINKS, _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DocsId"].FieldConfig, 'https://grafana.com/docs/grafana/latest/panels/field-configuration-options/'), _defineProperty(_DOCS_LINKS, _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DocsId"].FieldConfigOverrides, 'https://grafana.com/docs/grafana/latest/panels/field-configuration-options/#override-a-field'), _DOCS_LINKS);
var getDocsLink = function getDocsLink(id) {
  return DOCS_LINKS[id];
};

/***/ }),

/***/ "./public/app/features/alerting/AlertTab.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/alerting/AlertTab.tsx ***!
  \***************************************************/
/*! exports provided: AlertTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertTab", function() { return AlertTab; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _getAlertingValidationMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getAlertingValidationMessage */ "./public/app/features/alerting/getAlertingValidationMessage.ts");
/* harmony import */ var app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/EmptyListCTA/EmptyListCTA */ "./public/app/core/components/EmptyListCTA/EmptyListCTA.tsx");
/* harmony import */ var _StateHistory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./StateHistory */ "./public/app/features/alerting/StateHistory.tsx");
/* harmony import */ var app_features_alerting_AlertTabCtrl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/features/alerting/AlertTabCtrl */ "./public/app/features/alerting/AlertTabCtrl.ts");
/* harmony import */ var _TestRuleResult__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TestRuleResult */ "./public/app/features/alerting/TestRuleResult.tsx");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _dashboard_components_PanelEditor_PanelNotSupported__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../dashboard/components/PanelEditor/PanelNotSupported */ "./public/app/features/dashboard/components/PanelEditor/PanelNotSupported.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }














var UnConnectedAlertTab =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(UnConnectedAlertTab, _PureComponent);

  function UnConnectedAlertTab() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, UnConnectedAlertTab);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(UnConnectedAlertTab)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      validationMessage: '',
      showStateHistory: false,
      showDeleteConfirmation: false,
      showTestRule: false
    };

    _this.onAngularPanelUpdated = function () {
      _this.forceUpdate();
    };

    _this.onAddAlert = function () {
      _this.panelCtrl._enableAlert();

      _this.component.digest();

      _this.forceUpdate();
    };

    _this.onToggleModal = function (prop) {
      var value = _this.state[prop];

      _this.setState(_objectSpread({}, _this.state, _defineProperty({}, prop, !value)));
    };

    _this.renderTestRule = function () {
      if (!_this.state.showTestRule) {
        return null;
      }

      var _this$props = _this.props,
          panel = _this$props.panel,
          dashboard = _this$props.dashboard;

      var onDismiss = function onDismiss() {
        return _this.onToggleModal('showTestRule');
      };

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
        isOpen: true,
        icon: "bug",
        title: "Testing rule",
        onDismiss: onDismiss,
        onClickBackdrop: onDismiss
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TestRuleResult__WEBPACK_IMPORTED_MODULE_9__["TestRuleResult"], {
        panel: panel,
        dashboard: dashboard
      }));
    };

    _this.renderDeleteConfirmation = function () {
      if (!_this.state.showDeleteConfirmation) {
        return null;
      }

      var panel = _this.props.panel;

      var onDismiss = function onDismiss() {
        return _this.onToggleModal('showDeleteConfirmation');
      };

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["ConfirmModal"], {
        isOpen: true,
        icon: "trash-alt",
        title: "\u5220\u9664",
        body: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "\u60A8\u786E\u5B9A\u8981\u5220\u9664\u6B64\u8B66\u62A5\u89C4\u5219\u5417\uFF1F", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("small", null, "\u60A8\u9700\u8981\u4FDD\u5B58\u4EEA\u8868\u677F\u624D\u80FD\u4F7F\u5220\u9664\u751F\u6548\u3002")),
        confirmText: "\u5220\u9664\u8B66\u62A5",
        onDismiss: onDismiss,
        onConfirm: function onConfirm() {
          delete panel.alert;
          panel.thresholds = [];
          _this.panelCtrl.alertState = null;

          _this.panelCtrl.render();

          _this.component.digest();

          onDismiss();
        }
      });
    };

    _this.renderStateHistory = function () {
      var _panel$editSourceId;

      if (!_this.state.showStateHistory) {
        return null;
      }

      var _this$props2 = _this.props,
          panel = _this$props2.panel,
          dashboard = _this$props2.dashboard;

      var onDismiss = function onDismiss() {
        return _this.onToggleModal('showStateHistory');
      };

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
        isOpen: true,
        icon: "history",
        title: "\u72B6\u6001\u5386\u53F2",
        onDismiss: onDismiss,
        onClickBackdrop: onDismiss
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_StateHistory__WEBPACK_IMPORTED_MODULE_7__["default"], {
        dashboard: dashboard,
        panelId: (_panel$editSourceId = panel.editSourceId) !== null && _panel$editSourceId !== void 0 ? _panel$editSourceId : panel.id,
        onRefresh: function onRefresh() {
          return _this.panelCtrl.refresh();
        }
      }));
    };

    return _this;
  }

  _createClass(UnConnectedAlertTab, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadAlertTab();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.loadAlertTab();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.component) {
        this.component.destroy();
      }
    }
  }, {
    key: "loadAlertTab",
    value: function () {
      var _loadAlertTab = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var _this$props3, panel, angularPanelComponent, scope, loader, template, scopeProps, validationMessage;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props3 = this.props, panel = _this$props3.panel, angularPanelComponent = _this$props3.angularPanelComponent;

                if (!(!this.element || !angularPanelComponent || this.component)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                scope = angularPanelComponent.getScope(); // When full page reloading in edit mode the angular panel has on fully compiled & instantiated yet

                if (scope.$$childHead) {
                  _context.next = 7;
                  break;
                }

                setTimeout(function () {
                  _this2.forceUpdate();
                });
                return _context.abrupt("return");

              case 7:
                this.panelCtrl = scope.$$childHead.ctrl;
                loader = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getAngularLoader"])();
                template = '<alert-tab />';
                scopeProps = {
                  ctrl: this.panelCtrl
                };
                this.component = loader.load(this.element, scopeProps, template);
                _context.next = 14;
                return Object(_getAlertingValidationMessage__WEBPACK_IMPORTED_MODULE_5__["getAlertingValidationMessage"])(panel.transformations, panel.targets, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getDataSourceSrv"])(), panel.datasource);

              case 14:
                validationMessage = _context.sent;

                if (validationMessage) {
                  this.setState({
                    validationMessage: validationMessage
                  });
                }

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadAlertTab() {
        return _loadAlertTab.apply(this, arguments);
      }

      return loadAlertTab;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props$panel = this.props.panel,
          alert = _this$props$panel.alert,
          transformations = _this$props$panel.transformations;
      var validationMessage = this.state.validationMessage;
      var hasTransformations = transformations && transformations.length > 0;

      if (!alert && validationMessage) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dashboard_components_PanelEditor_PanelNotSupported__WEBPACK_IMPORTED_MODULE_11__["PanelNotSupported"], {
          message: validationMessage
        });
      }

      var model = {
        title: '面板未定义警报规则',
        buttonIcon: 'bell',
        onClick: this.onAddAlert,
        buttonTitle: '创建警报'
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["CustomScrollbar"], {
        autoHeightMin: "100%"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Container"], {
        padding: "md"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_3__["selectors"].components.AlertTab.content
      }, alert && hasTransformations && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Alert"], {
        severity: app_types__WEBPACK_IMPORTED_MODULE_10__["AppNotificationSeverity"].Error,
        title: "\u8B66\u62A5\u67E5\u8BE2\u4E0D\u652F\u6301\u8F6C\u6362"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        ref: function ref(element) {
          return _this3.element = element;
        }
      }), alert && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["HorizontalGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        onClick: function onClick() {
          return _this3.onToggleModal('showStateHistory');
        },
        variant: "secondary"
      }, "\u72B6\u6001\u5386\u53F2"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        onClick: function onClick() {
          return _this3.onToggleModal('showTestRule');
        },
        variant: "secondary"
      }, "\u6D4B\u8BD5\u89C4\u5219"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        onClick: function onClick() {
          return _this3.onToggleModal('showDeleteConfirmation');
        },
        variant: "destructive"
      }, "\u5220\u9664")), !alert && !validationMessage && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_6__["default"], model)))), this.renderTestRule(), this.renderDeleteConfirmation(), this.renderStateHistory());
    }
  }]);

  return UnConnectedAlertTab;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    angularPanelComponent: state.dashboard.panels[props.panel.id].angularComponent
  };
};

var mapDispatchToProps = {};
var AlertTab = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(UnConnectedAlertTab);

/***/ }),

/***/ "./public/app/features/alerting/StateHistory.tsx":
/*!*******************************************************!*\
  !*** ./public/app/features/alerting/StateHistory.tsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _state_alertDef__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state/alertDef */ "./public/app/features/alerting/state/alertDef.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n                  direction: ltr;\n                "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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







var StateHistory =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(StateHistory, _PureComponent);

  function StateHistory() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, StateHistory);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StateHistory)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      stateHistoryItems: []
    };
    _this.clearHistory =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _this$props, dashboard, panelId, onRefresh;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, dashboard = _this$props.dashboard, panelId = _this$props.panelId, onRefresh = _this$props.onRefresh;
              _context.next = 3;
              return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post('/api/annotations/mass-delete', {
                dashboardId: dashboard.id,
                panelId: panelId
              });

            case 3:
              _this.setState({
                stateHistoryItems: []
              });

              onRefresh();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _this;
  }

  _createClass(StateHistory, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props2 = this.props,
          dashboard = _this$props2.dashboard,
          panelId = _this$props2.panelId;
      Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get("/api/annotations?dashboardId=".concat(dashboard.id, "&panelId=").concat(panelId, "&limit=50&type=alert"), {}, "state-history-".concat(dashboard.id, "-").concat(panelId)).then(function (data) {
        var items = data.map(function (item) {
          return {
            stateModel: _state_alertDef__WEBPACK_IMPORTED_MODULE_3__["default"].getStateDisplayModel(item.newState),
            time: dashboard.formatDate(item.time, 'MMM D, YYYY HH:mm:ss'),
            info: _state_alertDef__WEBPACK_IMPORTED_MODULE_3__["default"].getAlertAnnotationInfo(item)
          };
        });

        _this2.setState({
          stateHistoryItems: items
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var stateHistoryItems = this.state.stateHistoryItems;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, stateHistoryItems.length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-b-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "muted"
      }, "\u6700\u8FD150\u6B21\u72B6\u6001\u66F4\u6539"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["ConfirmButton"], {
        onConfirm: this.clearHistory,
        confirmVariant: "destructive",
        confirmText: "\u6E05\u9664"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        className: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(_templateObject()),
        variant: "destructive",
        icon: "trash-alt"
      }, "\u6E05\u9664\u5386\u53F2"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ol", {
        className: "alert-rule-list"
      }, stateHistoryItems.length > 0 ? stateHistoryItems.map(function (item, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: "alert-rule-item",
          key: "".concat(item.time, "-").concat(index)
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "alert-rule-item__icon ".concat(item.stateModel.stateClass)
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
          name: item.stateModel.iconClass,
          size: "xl"
        })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "alert-rule-item__body"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "alert-rule-item__header"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: "alert-rule-item__name"
        }, item.alertName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "alert-rule-item__text"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "".concat(item.stateModel.stateClass)
        }, item.stateModel.text))), item.info), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "alert-rule-item__time"
        }, item.time));
      }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, "\u6CA1\u6709\u8BB0\u5F55\u72B6\u6001\u53D8\u5316")));
    }
  }]);

  return StateHistory;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/* harmony default export */ __webpack_exports__["default"] = (StateHistory);

/***/ }),

/***/ "./public/app/features/alerting/TestRuleResult.tsx":
/*!*********************************************************!*\
  !*** ./public/app/features/alerting/TestRuleResult.tsx ***!
  \*********************************************************/
/*! exports provided: TestRuleResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestRuleResult", function() { return TestRuleResult; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var app_core_components_CopyToClipboard_CopyToClipboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/CopyToClipboard/CopyToClipboard */ "./public/app/core/components/CopyToClipboard/CopyToClipboard.tsx");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var TestRuleResult =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TestRuleResult, _PureComponent);

  function TestRuleResult() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TestRuleResult);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TestRuleResult)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isLoading: false,
      allNodesExpanded: null,
      testRuleResponse: {}
    };

    _this.setFormattedJson = function (formattedJson) {
      _this.formattedJson = formattedJson;
    };

    _this.getTextForClipboard = function () {
      return JSON.stringify(_this.formattedJson, null, 2);
    };

    _this.onClipboardSuccess = function () {
      app_core_app_events__WEBPACK_IMPORTED_MODULE_2__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["AppEvents"].alertSuccess, ['内容已复制到剪贴板']);
    };

    _this.onToggleExpand = function () {
      _this.setState(function (prevState) {
        return _objectSpread({}, prevState, {
          allNodesExpanded: !_this.state.allNodesExpanded
        });
      });
    };

    _this.getNrOfOpenNodes = function () {
      if (_this.state.allNodesExpanded === null) {
        return 3; // 3 is default, ie when state is null
      } else if (_this.state.allNodesExpanded) {
        return 20;
      }

      return 1;
    };

    _this.renderExpandCollapse = function () {
      var allNodesExpanded = _this.state.allNodesExpanded;
      var collapse = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
        name: "minus-circle"
      }), " Collapse All");
      var expand = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
        name: "plus-circle"
      }), " Expand All");
      return allNodesExpanded ? collapse : expand;
    };

    return _this;
  }

  _createClass(TestRuleResult, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.testRule();
    }
  }, {
    key: "testRule",
    value: function () {
      var _testRule = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this$props, dashboard, panel, model, payload, testRuleResponse;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = this.props, dashboard = _this$props.dashboard, panel = _this$props.panel; // dashboard save model

                model = dashboard.getSaveModelClone(); // now replace panel to get current edits

                model.panels = model.panels.map(function (dashPanel) {
                  return dashPanel.id === panel.editSourceId ? panel.getSaveModel() : dashPanel;
                });
                payload = {
                  dashboard: model,
                  panelId: panel.id
                };
                this.setState({
                  isLoading: true
                });
                _context.next = 7;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getBackendSrv"])().post("/api/alerts/test", payload);

              case 7:
                testRuleResponse = _context.sent;
                this.setState({
                  isLoading: false,
                  testRuleResponse: testRuleResponse
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function testRule() {
        return _testRule.apply(this, arguments);
      }

      return testRule;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          testRuleResponse = _this$state.testRuleResponse,
          isLoading = _this$state.isLoading;

      if (isLoading === true) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LoadingPlaceholder"], {
          text: "\u8BC4\u4F30\u89C4\u5219"
        });
      }

      var openNodes = this.getNrOfOpenNodes();
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pull-right"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-transparent btn-p-x-0 m-r-1",
        onClick: this.onToggleExpand
      }, this.renderExpandCollapse()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_CopyToClipboard_CopyToClipboard__WEBPACK_IMPORTED_MODULE_3__["CopyToClipboard"], {
        className: "btn btn-transparent btn-p-x-0",
        text: this.getTextForClipboard,
        onSuccess: this.onClipboardSuccess
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
        name: "copy"
      }), " \u590D\u5236\u5230\u526A\u8D34\u677F")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["JSONFormatter"], {
        json: testRuleResponse,
        open: openNodes,
        onDidRender: this.setFormattedJson
      }));
    }
  }]);

  return TestRuleResult;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/***/ }),

/***/ "./public/app/features/dashboard/components/AddPanelWidget/AddPanelWidget.tsx":
/*!************************************************************************************!*\
  !*** ./public/app/features/dashboard/components/AddPanelWidget/AddPanelWidget.tsx ***!
  \************************************************************************************/
/*! exports provided: AddPanelWidgetUnconnected, AddPanelWidget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddPanelWidgetUnconnected", function() { return AddPanelWidgetUnconnected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddPanelWidget", function() { return AddPanelWidget; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var app_core_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/store */ "./public/app/core/store.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var app_features_dashboard_state_reducers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/features/dashboard/state/reducers */ "./public/app/features/dashboard/state/reducers.ts");
/* harmony import */ var app_core_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/constants */ "./public/app/core/constants.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var tinycolor2__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");
/* harmony import */ var tinycolor2__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(tinycolor2__WEBPACK_IMPORTED_MODULE_11__);
function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n      color: ", ";\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n      cursor: pointer;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      margin-bottom: ", ";\n      &:hover {\n        background: ", ";\n      }\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n      position: absolute;\n      cursor: grab;\n      top: 0;\n      left: 0;\n      height: 26px;\n      padding: 0 ", ";\n      width: 100%;\n      display: flex;\n      justify-content: flex-end;\n      align-items: center;\n      transition: background-color 0.1s ease-in-out;\n      &:hover {\n        background: ", ";\n      }\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      height: 100%;\n      justify-content: center;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      overflow: hidden;\n      outline: 2px dotted transparent;\n      outline-offset: 2px;\n      box-shadow: 0 0 0 2px black, 0 0 0px 4px #1f60c4;\n      animation: ", " 2s ease infinite;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    0% {box-shadow: 0 0 0 2px ", ", 0 0 0px 4px ", ";}\n    50% {box-shadow: 0 0 0 2px ", ", 0 0 0px 4px ", ";}\n    100% {box-shadow: 0 0 0 2px ", ", 0 0 0px 4px  ", ";}\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// Libraries




 // Utils


 // Store


 // Types





var getCopiedPanelPlugins = function getCopiedPanelPlugins() {
  var panels = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.chain(app_core_config__WEBPACK_IMPORTED_MODULE_5__["default"].panels).filter({
    hideFromList: false
  }).map(function (item) {
    return item;
  }).value();

  var copiedPanels = [];
  var copiedPanelJson = app_core_store__WEBPACK_IMPORTED_MODULE_6__["default"].get(app_core_constants__WEBPACK_IMPORTED_MODULE_9__["LS_PANEL_COPY_KEY"]);

  if (copiedPanelJson) {
    var copiedPanel = JSON.parse(copiedPanelJson);

    var pluginInfo = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(panels, {
      id: copiedPanel.type
    });

    if (pluginInfo) {
      var pluginCopy = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.cloneDeep(pluginInfo);

      pluginCopy.name = copiedPanel.title;
      pluginCopy.sort = -1;
      pluginCopy.defaults = copiedPanel;
      copiedPanels.push(pluginCopy);
    }
  }

  return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.sortBy(copiedPanels, 'sort');
};

var AddPanelWidgetUnconnected = function AddPanelWidgetUnconnected(_ref) {
  var panel = _ref.panel,
      dashboard = _ref.dashboard,
      updateLocation = _ref.updateLocation,
      addPanel = _ref.addPanel;
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["useTheme"])();

  var onCancelAddPanel = function onCancelAddPanel(evt) {
    evt.preventDefault();
    dashboard.removePanel(panel);
  };

  var onCreateNewPanel = function onCreateNewPanel() {
    var gridPos = panel.gridPos;
    var newPanel = {
      type: 'graph',
      title: '面板标题',
      gridPos: {
        x: gridPos.x,
        y: gridPos.y,
        w: gridPos.w,
        h: gridPos.h
      }
    };
    dashboard.addPanel(newPanel);
    dashboard.removePanel(panel);
    var location = {
      query: {
        editPanel: newPanel.id
      },
      partial: true
    };
    updateLocation(location);
  };

  var onPasteCopiedPanel = function onPasteCopiedPanel(panelPluginInfo) {
    var gridPos = panel.gridPos;
    var newPanel = {
      type: panelPluginInfo.id,
      title: '面板标题',
      gridPos: {
        x: gridPos.x,
        y: gridPos.y,
        w: panelPluginInfo.defaults.gridPos.w,
        h: panelPluginInfo.defaults.gridPos.h
      }
    }; // apply panel template / defaults

    if (panelPluginInfo.defaults) {
      lodash__WEBPACK_IMPORTED_MODULE_1___default.a.defaults(newPanel, panelPluginInfo.defaults);

      newPanel.title = panelPluginInfo.defaults.title;
      app_core_store__WEBPACK_IMPORTED_MODULE_6__["default"].delete(app_core_constants__WEBPACK_IMPORTED_MODULE_9__["LS_PANEL_COPY_KEY"]);
    }

    dashboard.addPanel(newPanel);
    dashboard.removePanel(panel);
  };

  var onCreateNewRow = function onCreateNewRow() {
    var newRow = {
      type: 'row',
      title: '行标题',
      gridPos: {
        x: 0,
        y: 0
      }
    };
    dashboard.addPanel(newRow);
    dashboard.removePanel(panel);
  };

  var styles = getStyles(theme);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_10__["cx"])('panel-container', styles.wrapper)
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AddPanelWidgetHandle, {
    onCancel: onCancelAddPanel
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.actionsWrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(AddPanelWidgetCreate, {
    onCreate: onCreateNewPanel,
    onPasteCopiedPanel: onPasteCopiedPanel
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["HorizontalGroup"], {
    justify: "center"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    onClick: onCreateNewRow,
    variant: "secondary",
    size: "sm"
  }, "\u8F6C\u6362\u4E3A\u884C")))));
};
var mapDispatchToProps = {
  addPanel: app_features_dashboard_state_reducers__WEBPACK_IMPORTED_MODULE_8__["addPanel"],
  updateLocation: app_core_actions__WEBPACK_IMPORTED_MODULE_7__["updateLocation"]
};
var AddPanelWidget = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(null, mapDispatchToProps)(AddPanelWidgetUnconnected);

var AddPanelWidgetHandle = function AddPanelWidgetHandle(_ref2) {
  var onCancel = _ref2.onCancel;
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["useTheme"])();
  var styles = getAddPanelWigetHandleStyles(theme);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_10__["cx"])(styles.handle, 'grid-drag-handle')
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["IconButton"], {
    name: "times",
    onClick: onCancel,
    surface: "header",
    className: "add-panel-widget__close"
  }));
};

var AddPanelWidgetCreate = function AddPanelWidgetCreate(_ref3) {
  var onCreate = _ref3.onCreate,
      onPasteCopiedPanel = _ref3.onPasteCopiedPanel;
  var copiedPanelPlugins = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return getCopiedPanelPlugins();
  }, []);
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["useTheme"])();
  var styles = getAddPanelWidgetCreateStyles(theme);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.wrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["HorizontalGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    icon: "plus",
    size: "md",
    onClick: onCreate,
    "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_3__["selectors"].pages.AddDashboard.addNewPanel
  }, "\u6DFB\u52A0\u65B0\u4EEA\u8868\u677F"), copiedPanelPlugins.length === 1 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "secondary",
    size: "md",
    onClick: function onClick() {
      return onPasteCopiedPanel(copiedPanelPlugins[0]);
    }
  }, "\u7C98\u8D34\u590D\u5236\u7684\u9762\u677F")));
};

var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function (theme) {
  var pulsate = Object(emotion__WEBPACK_IMPORTED_MODULE_10__["keyframes"])(_templateObject(), theme.colors.bodyBg, theme.colors.formFocusOutline, theme.colors.bodyBg, tinycolor2__WEBPACK_IMPORTED_MODULE_11___default()(theme.colors.formFocusOutline).darken(20).toHexString(), theme.colors.bodyBg, theme.colors.formFocusOutline);
  return {
    wrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_10__["css"])(_templateObject2(), pulsate),
    actionsWrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_10__["css"])(_templateObject3())
  };
});
var getAddPanelWigetHandleStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function (theme) {
  return {
    handle: Object(emotion__WEBPACK_IMPORTED_MODULE_10__["css"])(_templateObject4(), theme.spacing.xs, theme.colors.bg2)
  };
});
var getAddPanelWidgetCreateStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function (theme) {
  return {
    wrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_10__["css"])(_templateObject5(), theme.spacing.lg, theme.colors.bg2),
    icon: Object(emotion__WEBPACK_IMPORTED_MODULE_10__["css"])(_templateObject6(), theme.colors.textWeak)
  };
});

/***/ }),

/***/ "./public/app/features/dashboard/components/AddPanelWidget/index.ts":
/*!**************************************************************************!*\
  !*** ./public/app/features/dashboard/components/AddPanelWidget/index.ts ***!
  \**************************************************************************/
/*! exports provided: AddPanelWidget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddPanelWidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddPanelWidget */ "./public/app/features/dashboard/components/AddPanelWidget/AddPanelWidget.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AddPanelWidget", function() { return _AddPanelWidget__WEBPACK_IMPORTED_MODULE_0__["AddPanelWidget"]; });



/***/ }),

/***/ "./public/app/features/dashboard/components/DashboardRow/DashboardRow.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/features/dashboard/components/DashboardRow/DashboardRow.tsx ***!
  \********************************************************************************/
/*! exports provided: DashboardRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRow", function() { return DashboardRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/features/templating/template_srv */ "./public/app/features/templating/template_srv.ts");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _RowOptions_RowOptionsButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../RowOptions/RowOptionsButton */ "./public/app/features/dashboard/components/RowOptions/RowOptionsButton.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var DashboardRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DashboardRow, _React$Component);

  function DashboardRow(props) {
    var _this;

    _classCallCheck(this, DashboardRow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DashboardRow).call(this, props));

    _this.onVariableUpdated = function () {
      _this.forceUpdate();
    };

    _this.onToggle = function () {
      _this.props.dashboard.toggleRow(_this.props.panel);

      _this.setState(function (prevState) {
        return {
          collapsed: !prevState.collapsed
        };
      });
    };

    _this.onUpdate = function (title, repeat) {
      _this.props.panel['title'] = title;
      _this.props.panel['repeat'] = repeat;

      _this.props.panel.render();

      _this.props.dashboard.processRepeats();

      _this.forceUpdate();
    };

    _this.onDelete = function () {
      app_core_app_events__WEBPACK_IMPORTED_MODULE_4__["default"].emit(app_types__WEBPACK_IMPORTED_MODULE_5__["CoreEvents"].showConfirmModal, {
        title: '删除行',
        text: '您确定要删除此行及其所有面板吗？',
        altActionText: '仅删除行',
        icon: 'fa-trash',
        onConfirm: function onConfirm() {
          _this.props.dashboard.removeRow(_this.props.panel, true);
        },
        onAltAction: function onAltAction() {
          _this.props.dashboard.removeRow(_this.props.panel, false);
        }
      });
    };

    _this.state = {
      collapsed: _this.props.panel.collapsed
    };

    _this.props.dashboard.on(app_types__WEBPACK_IMPORTED_MODULE_5__["CoreEvents"].templateVariableValueUpdated, _this.onVariableUpdated);

    return _this;
  }

  _createClass(DashboardRow, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.dashboard.off(app_types__WEBPACK_IMPORTED_MODULE_5__["CoreEvents"].templateVariableValueUpdated, this.onVariableUpdated);
    }
  }, {
    key: "render",
    value: function render() {
      var classes = classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        'dashboard-row': true,
        'dashboard-row--collapsed': this.state.collapsed
      });
      var title = app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_3__["default"].replace(this.props.panel.title, this.props.panel.scopedVars, 'text');
      var count = this.props.panel.panels ? this.props.panel.panels.length : 0;
      var panels = count === 1 ? '面板' : '面板';
      var canEdit = this.props.dashboard.meta.canEdit === true;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "dashboard-row__title pointer",
        onClick: this.onToggle
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
        name: this.state.collapsed ? 'angle-right' : 'angle-down'
      }), title, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "dashboard-row__panel_count"
      }, "(", count, " ", panels, ")")), canEdit && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "dashboard-row__actions"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RowOptions_RowOptionsButton__WEBPACK_IMPORTED_MODULE_6__["RowOptionsButton"], {
        title: this.props.panel.title,
        repeat: this.props.panel.repeat,
        onUpdate: this.onUpdate
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "pointer",
        onClick: this.onDelete
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
        name: "trash-alt"
      }))), this.state.collapsed === true && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "dashboard-row__toggle-target",
        onClick: this.onToggle
      }, "\xA0"), canEdit && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "dashboard-row__drag grid-drag-handle"
      }));
    }
  }]);

  return DashboardRow;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/***/ }),

/***/ "./public/app/features/dashboard/components/DashboardRow/index.ts":
/*!************************************************************************!*\
  !*** ./public/app/features/dashboard/components/DashboardRow/index.ts ***!
  \************************************************************************/
/*! exports provided: DashboardRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DashboardRow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashboardRow */ "./public/app/features/dashboard/components/DashboardRow/DashboardRow.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DashboardRow", function() { return _DashboardRow__WEBPACK_IMPORTED_MODULE_0__["DashboardRow"]; });



/***/ }),

/***/ "./public/app/features/dashboard/components/Inspector/DetailText.tsx":
/*!***************************************************************************!*\
  !*** ./public/app/features/dashboard/components/Inspector/DetailText.tsx ***!
  \***************************************************************************/
/*! exports provided: DetailText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailText", function() { return DetailText; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin: 0;\n  margin-left: ", ";\n  font-size: ", ";\n  color: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var getStyles = function getStyles(theme) {
  return Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject(), theme.spacing.md, theme.typography.size.sm, theme.colors.textWeak);
};

var DetailText = function DetailText(_ref) {
  var children = _ref.children;
  var collapsedTextStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["useStyles"])(getStyles);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
    className: collapsedTextStyles
  }, children);
};

/***/ }),

/***/ "./public/app/features/dashboard/components/Inspector/InspectContent.tsx":
/*!*******************************************************************************!*\
  !*** ./public/app/features/dashboard/components/Inspector/InspectContent.tsx ***!
  \*******************************************************************************/
/*! exports provided: InspectContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InspectContent", function() { return InspectContent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles */ "./public/app/features/dashboard/components/Inspector/styles.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _InspectSubtitle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InspectSubtitle */ "./public/app/features/dashboard/components/Inspector/InspectSubtitle.tsx");
/* harmony import */ var _InspectDataTab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./InspectDataTab */ "./public/app/features/dashboard/components/Inspector/InspectDataTab.tsx");
/* harmony import */ var _InspectMetadataTab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./InspectMetadataTab */ "./public/app/features/dashboard/components/Inspector/InspectMetadataTab.tsx");
/* harmony import */ var _InspectJSONTab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./InspectJSONTab */ "./public/app/features/dashboard/components/Inspector/InspectJSONTab.tsx");
/* harmony import */ var _InspectErrorTab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./InspectErrorTab */ "./public/app/features/dashboard/components/Inspector/InspectErrorTab.tsx");
/* harmony import */ var _InspectStatsTab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./InspectStatsTab */ "./public/app/features/dashboard/components/Inspector/InspectStatsTab.tsx");
/* harmony import */ var _QueryInspector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./QueryInspector */ "./public/app/features/dashboard/components/Inspector/QueryInspector.tsx");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types */ "./public/app/features/dashboard/components/Inspector/types.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }












var InspectContent = function InspectContent(_ref) {
  var panel = _ref.panel,
      plugin = _ref.plugin,
      dashboard = _ref.dashboard,
      tabs = _ref.tabs,
      data = _ref.data,
      isDataLoading = _ref.isDataLoading,
      dataOptions = _ref.dataOptions,
      metadataDatasource = _ref.metadataDatasource,
      defaultTab = _ref.defaultTab,
      onDataOptionsChange = _ref.onDataOptionsChange,
      onClose = _ref.onClose;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(defaultTab !== null && defaultTab !== void 0 ? defaultTab : _types__WEBPACK_IMPORTED_MODULE_10__["InspectTab"].Data),
      _useState2 = _slicedToArray(_useState, 2),
      currentTab = _useState2[0],
      setCurrentTab = _useState2[1];

  if (!plugin) {
    return null;
  }

  var styles = Object(_styles__WEBPACK_IMPORTED_MODULE_1__["getPanelInspectorStyles"])();
  var error = data === null || data === void 0 ? void 0 : data.error; // Validate that the active tab is actually valid and allowed

  var activeTab = currentTab;

  if (!tabs.find(function (item) {
    return item.value === currentTab;
  })) {
    activeTab = _types__WEBPACK_IMPORTED_MODULE_10__["InspectTab"].JSON;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Drawer"], {
    title: "\u68C0\u67E5: ".concat(panel.title) || false,
    subtitle: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InspectSubtitle__WEBPACK_IMPORTED_MODULE_3__["InspectSubtitle"], {
      tabs: tabs,
      tab: activeTab,
      data: data,
      onSelectTab: function onSelectTab(item) {
        return setCurrentTab(item.value || _types__WEBPACK_IMPORTED_MODULE_10__["InspectTab"].Data);
      }
    }),
    width: "50%",
    onClose: onClose,
    expandable: true
  }, activeTab === _types__WEBPACK_IMPORTED_MODULE_10__["InspectTab"].Data && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InspectDataTab__WEBPACK_IMPORTED_MODULE_4__["InspectDataTab"], {
    panel: panel,
    data: data && data.series,
    isLoading: isDataLoading,
    options: dataOptions,
    onOptionsChange: onDataOptionsChange
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["CustomScrollbar"], {
    autoHeightMin: "100%"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["TabContent"], {
    className: styles.tabContent
  }, data && activeTab === _types__WEBPACK_IMPORTED_MODULE_10__["InspectTab"].Meta && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InspectMetadataTab__WEBPACK_IMPORTED_MODULE_5__["InspectMetadataTab"], {
    data: data,
    metadataDatasource: metadataDatasource
  }), activeTab === _types__WEBPACK_IMPORTED_MODULE_10__["InspectTab"].JSON && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InspectJSONTab__WEBPACK_IMPORTED_MODULE_6__["InspectJSONTab"], {
    panel: panel,
    dashboard: dashboard,
    data: data,
    onClose: onClose
  }), activeTab === _types__WEBPACK_IMPORTED_MODULE_10__["InspectTab"].Error && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InspectErrorTab__WEBPACK_IMPORTED_MODULE_7__["InspectErrorTab"], {
    error: error
  }), data && activeTab === _types__WEBPACK_IMPORTED_MODULE_10__["InspectTab"].Stats && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InspectStatsTab__WEBPACK_IMPORTED_MODULE_8__["InspectStatsTab"], {
    data: data,
    timeZone: dashboard.getTimezone()
  }), data && activeTab === _types__WEBPACK_IMPORTED_MODULE_10__["InspectTab"].Query && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_QueryInspector__WEBPACK_IMPORTED_MODULE_9__["QueryInspector"], {
    panel: panel,
    data: data.series
  }))));
};

/***/ }),

/***/ "./public/app/features/dashboard/components/Inspector/InspectDataTab.tsx":
/*!*******************************************************************************!*\
  !*** ./public/app/features/dashboard/components/Inspector/InspectDataTab.tsx ***!
  \*******************************************************************************/
/*! exports provided: InspectDataTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InspectDataTab", function() { return InspectDataTab; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
/* harmony import */ var react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-virtualized-auto-sizer */ "./node_modules/react-virtualized-auto-sizer/dist/index.esm.js");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./styles */ "./public/app/features/dashboard/components/Inspector/styles.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var app_core_components_QueryOperationRow_QueryOperationRow__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/components/QueryOperationRow/QueryOperationRow */ "./public/app/core/components/QueryOperationRow/QueryOperationRow.tsx");
/* harmony import */ var _DetailText__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./DetailText */ "./public/app/features/dashboard/components/Inspector/DetailText.tsx");
/* harmony import */ var _plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n              margin-bottom: 10px;\n            "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }













var InspectDataTab =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(InspectDataTab, _PureComponent);

  function InspectDataTab(props) {
    var _this;

    _classCallCheck(this, InspectDataTab);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InspectDataTab).call(this, props));

    _this.exportCsv = function (dataFrame) {
      var panel = _this.props.panel;
      var transformId = _this.state.transformId;
      var dataFrameCsv = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["toCSV"])([dataFrame]);
      var blob = new Blob([String.fromCharCode(0xfeff), dataFrameCsv], {
        type: 'text/csv;charset=utf-8'
      });
      var transformation = transformId !== _grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataTransformerID"].noop ? '-as-' + transformId.toLocaleLowerCase() : '';
      var fileName = "".concat(panel.title, "-data").concat(transformation, "-").concat(Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["dateTimeFormat"])(new Date()), ".csv");
      Object(file_saver__WEBPACK_IMPORTED_MODULE_7__["saveAs"])(blob, fileName);
    };

    _this.onDataFrameChange = function (item) {
      _this.setState({
        transformId: item.value === _grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataTransformerID"].seriesToColumns ? _grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataTransformerID"].seriesToColumns : _grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataTransformerID"].noop,
        dataFrameIndex: typeof item.value === 'number' ? item.value : 0,
        selectedDataFrame: item.value
      });

      _this.props.onOptionsChange(_objectSpread({}, _this.props.options));
    };

    _this.state = {
      selectedDataFrame: 0,
      dataFrameIndex: 0,
      transformId: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataTransformerID"].noop,
      transformationOptions: buildTransformationOptions()
    };
    return _this;
  }

  _createClass(InspectDataTab, [{
    key: "getTransformedData",
    value: function getTransformedData() {
      var _this$state = this.state,
          transformId = _this$state.transformId,
          transformationOptions = _this$state.transformationOptions;
      var data = this.props.data;

      if (!data) {
        return [];
      }

      var currentTransform = transformationOptions.find(function (item) {
        return item.value === transformId;
      });

      if (currentTransform && currentTransform.transformer.id !== _grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataTransformerID"].noop) {
        return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["transformDataFrame"])([currentTransform.transformer], data);
      }

      return data;
    }
  }, {
    key: "getProcessedData",
    value: function getProcessedData() {
      var options = this.props.options;
      var data = this.props.data;

      if (!data) {
        return [];
      }

      if (this.state.transformId !== _grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataTransformerID"].noop) {
        data = this.getTransformedData();
      } // In case the transform removes the currently selected data frame


      if (!data[this.state.dataFrameIndex]) {
        this.setState({
          dataFrameIndex: 0,
          selectedDataFrame: 0
        });
      }

      if (!options.withFieldConfig) {
        return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["applyRawFieldOverrides"])(data);
      } // We need to apply field config even though it was already applied in the PanelQueryRunner.
      // That's because transformers create new fields and data frames, so i.e. display processor is no longer there


      return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["applyFieldOverrides"])({
        data: data,
        theme: app_core_config__WEBPACK_IMPORTED_MODULE_6__["config"].theme,
        fieldConfig: this.props.panel.fieldConfig,
        replaceVariables: function replaceVariables(value) {
          return value;
        },
        getDataSourceSettingsByUid: Object(_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_11__["getDatasourceSrv"])().getDataSourceSettingsByUid
      });
    }
  }, {
    key: "getActiveString",
    value: function getActiveString() {
      var selectedDataFrame = this.state.selectedDataFrame;
      var _this$props = this.props,
          options = _this$props.options,
          data = _this$props.data;
      var activeString = '';

      if (!data) {
        return activeString;
      }

      var parts = [];

      if (selectedDataFrame === _grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataTransformerID"].seriesToColumns) {
        parts.push('按时间连接的系列');
      } else if (data.length > 1) {
        parts.push(Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["getFrameDisplayName"])(data[selectedDataFrame]));
      }

      if (options.withTransforms || options.withFieldConfig) {
        if (options.withTransforms) {
          parts.push('面板转换');
        }

        if (options.withTransforms && options.withFieldConfig) {}

        if (options.withFieldConfig) {
          parts.push('格式化数据');
        }
      }

      return parts.join(', ');
    }
  }, {
    key: "renderDataOptions",
    value: function renderDataOptions(dataFrames) {
      var _panel$plugin;

      var _this$props2 = this.props,
          options = _this$props2.options,
          onOptionsChange = _this$props2.onOptionsChange,
          panel = _this$props2.panel,
          data = _this$props2.data;
      var _this$state2 = this.state,
          transformId = _this$state2.transformId,
          transformationOptions = _this$state2.transformationOptions,
          selectedDataFrame = _this$state2.selectedDataFrame;
      var styles = Object(_styles__WEBPACK_IMPORTED_MODULE_5__["getPanelInspectorStyles"])();
      var panelTransformations = panel.getTransformations();
      var showPanelTransformationsOption = panelTransformations && panelTransformations.length > 0 && transformId !== 'join by time';
      var showFieldConfigsOption = !((_panel$plugin = panel.plugin) === null || _panel$plugin === void 0 ? void 0 : _panel$plugin.fieldConfigRegistry.isEmpty());
      var showDataOptions = showPanelTransformationsOption || showFieldConfigsOption;
      var dataSelect = dataFrames;

      if (selectedDataFrame === _grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataTransformerID"].seriesToColumns) {
        dataSelect = data;
      }

      var choices = dataSelect.map(function (frame, index) {
        return {
          value: index,
          label: "".concat(Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["getFrameDisplayName"])(frame), " (").concat(index, ")")
        };
      });
      var selectableOptions = [].concat(_toConsumableArray(transformationOptions), _toConsumableArray(choices));

      if (!showDataOptions) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_QueryOperationRow_QueryOperationRow__WEBPACK_IMPORTED_MODULE_9__["QueryOperationRow"], {
        id: "Data options",
        index: 0,
        title: "\u6570\u636E\u9009\u9879",
        headerElement: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DetailText__WEBPACK_IMPORTED_MODULE_10__["DetailText"], null, this.getActiveString()),
        isOpen: false
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.options
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["VerticalGroup"], {
        spacing: "none"
      }, data.length > 1 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
        label: "\u663E\u793A\u6570\u636E\u5E27"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], {
        options: selectableOptions,
        value: selectedDataFrame,
        onChange: this.onDataFrameChange,
        width: 30
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["HorizontalGroup"], null, showPanelTransformationsOption && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
        label: "\u5E94\u7528\u9762\u677F\u8F6C\u6362",
        description: "\u5C06\u663E\u793A\u8868\u6570\u636E\uFF0C\u5E76\u5728\u9762\u677F\u7684\u201C\u8F6C\u6362\u201D\u9009\u9879\u5361\u4E2D\u5B9A\u4E49\u8F6C\u6362\u3002"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Switch"], {
        value: !!options.withTransforms,
        onChange: function onChange() {
          return onOptionsChange(_objectSpread({}, options, {
            withTransforms: !options.withTransforms
          }));
        }
      })), showFieldConfigsOption && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
        label: "\u683C\u5F0F\u5316\u6570\u636E",
        description: "\u8868\u6570\u636E\u4F7F\u7528\u201C\u5B57\u6BB5\u201D\u548C\u201C\u66FF\u4EE3\u201D\u9009\u9879\u5361\u4E2D\u5B9A\u4E49\u7684\u9009\u9879\u8FDB\u884C\u683C\u5F0F\u5316\u3002"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Switch"], {
        value: !!options.withFieldConfig,
        onChange: function onChange() {
          return onOptionsChange(_objectSpread({}, options, {
            withFieldConfig: !options.withFieldConfig
          }));
        }
      }))))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var isLoading = this.props.isLoading;
      var dataFrameIndex = this.state.dataFrameIndex;
      var styles = Object(_styles__WEBPACK_IMPORTED_MODULE_5__["getPanelInspectorStyles"])();

      if (isLoading) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "\u52A0\u8F7D\u4E2D ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
          name: "fa fa-spinner",
          className: "fa-spin",
          size: "lg"
        }));
      }

      var dataFrames = this.getProcessedData();

      if (!dataFrames || !dataFrames.length) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "\u65E0\u6570\u636E");
      }

      if (!dataFrames[dataFrameIndex]) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "\u627E\u4E0D\u5230\u6570\u636E\u6846");
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.dataTabContent,
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_3__["selectors"].components.PanelInspector.Data.content
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.actionsWrapper
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.dataDisplayOptions
      }, this.renderDataOptions(dataFrames)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        variant: "primary",
        onClick: function onClick() {
          return _this2.exportCsv(dataFrames[dataFrameIndex]);
        },
        className: Object(emotion__WEBPACK_IMPORTED_MODULE_8__["css"])(_templateObject())
      }, "\u4E0B\u8F7DCSV")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Container"], {
        grow: 1
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_4__["default"], null, function (_ref) {
        var width = _ref.width,
            height = _ref.height;

        if (width === 0) {
          return null;
        }

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          style: {
            width: width,
            height: height
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Table"], {
          width: width,
          height: height,
          data: dataFrames[dataFrameIndex]
        }));
      })));
    }
  }]);

  return InspectDataTab;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function buildTransformationOptions() {
  var transformations = [{
    value: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataTransformerID"].seriesToColumns,
    label: '按时间连接的系列',
    transformer: {
      id: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataTransformerID"].seriesToColumns,
      options: {
        byField: 'Time'
      }
    }
  }];
  return transformations;
}

/***/ }),

/***/ "./public/app/features/dashboard/components/Inspector/InspectErrorTab.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/features/dashboard/components/Inspector/InspectErrorTab.tsx ***!
  \********************************************************************************/
/*! exports provided: InspectErrorTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InspectErrorTab", function() { return InspectErrorTab; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");


var InspectErrorTab = function InspectErrorTab(_ref) {
  var error = _ref.error;

  if (!error) {
    return null;
  }

  if (error.data) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, error.data.message), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["JSONFormatter"], {
      json: error,
      open: 2
    }));
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, error.message);
};

/***/ }),

/***/ "./public/app/features/dashboard/components/Inspector/InspectJSONTab.tsx":
/*!*******************************************************************************!*\
  !*** ./public/app/features/dashboard/components/Inspector/InspectJSONTab.tsx ***!
  \*******************************************************************************/
/*! exports provided: InspectJSONTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InspectJSONTab", function() { return InspectJSONTab; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-virtualized-auto-sizer */ "./node_modules/react-virtualized-auto-sizer/dist/index.esm.js");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
/* harmony import */ var app_core_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/core */ "./public/app/core/core.ts");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./styles */ "./public/app/features/dashboard/components/Inspector/styles.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var ShowContent;

(function (ShowContent) {
  ShowContent["PanelJSON"] = "panel";
  ShowContent["PanelData"] = "data";
  ShowContent["DataStructure"] = "structure";
})(ShowContent || (ShowContent = {}));

var options = [{
  label: '面板JSON',
  description: '保存在仪表板JSON中的模型，用于配置一切工作方式。',
  value: ShowContent.PanelJSON
}, {
  label: '面板数据',
  description: '原始模型传递给面板可视化',
  value: ShowContent.PanelData
}, {
  label: '数据帧结构',
  description: '没有任何值的响应信息',
  value: ShowContent.DataStructure
}];
var InspectJSONTab =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(InspectJSONTab, _PureComponent);

  function InspectJSONTab(props) {
    var _this;

    _classCallCheck(this, InspectJSONTab);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InspectJSONTab).call(this, props));

    _this.onSelectChanged = function (item) {
      var show = _this.getJSONObject(item.value);

      var text = getPrettyJSON(show);

      _this.setState({
        text: text,
        show: item.value
      });
    };

    _this.onTextChanged = function (text) {
      _this.setState({
        text: text
      });
    };

    _this.onApplyPanelModel = function () {
      var _this$props = _this.props,
          panel = _this$props.panel,
          dashboard = _this$props.dashboard,
          onClose = _this$props.onClose;

      try {
        if (!dashboard.meta.canEdit) {
          app_core_core__WEBPACK_IMPORTED_MODULE_6__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["AppEvents"].alertError, ['无法申请']);
        } else {
          var updates = JSON.parse(_this.state.text);
          panel.restoreModel(updates);
          panel.refresh();
          app_core_core__WEBPACK_IMPORTED_MODULE_6__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["AppEvents"].alertSuccess, ['面板型号更新']);
        }
      } catch (err) {
        console.error('应用更新时出错', err);
        app_core_core__WEBPACK_IMPORTED_MODULE_6__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["AppEvents"].alertError, ['无效的JSON文字']);
      }

      onClose();
    };

    _this.state = {
      show: ShowContent.PanelJSON,
      text: getPrettyJSON(props.panel.getSaveModel())
    };
    return _this;
  }

  _createClass(InspectJSONTab, [{
    key: "getJSONObject",
    value: function getJSONObject(show) {
      if (show === ShowContent.PanelData) {
        return this.props.data;
      }

      if (show === ShowContent.DataStructure) {
        var _this$props$data;

        var series = (_this$props$data = this.props.data) === null || _this$props$data === void 0 ? void 0 : _this$props$data.series;

        if (!series) {
          return {
            note: '缺少响应日期'
          };
        }

        return this.props.data.series.map(function (frame) {
          var _ref = frame,
              table = _ref.table,
              fields = _ref.fields,
              rest = _objectWithoutProperties(_ref, ["table", "fields"]); // remove 'table' from arrow response


          return _objectSpread({}, rest, {
            fields: frame.fields.map(function (field) {
              return Object(lodash__WEBPACK_IMPORTED_MODULE_1__["chain"])(field).omit('values').omit('state').omit('display').value();
            })
          });
        });
      }

      if (show === ShowContent.PanelJSON) {
        return this.props.panel.getSaveModel();
      }

      return {
        note: "\u672A\u77E5\u5BF9\u8C61: ".concat(show)
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var dashboard = this.props.dashboard;
      var _this$state = this.state,
          show = _this$state.show,
          text = _this$state.text;
      var selected = options.find(function (v) {
        return v.value === show;
      });
      var isPanelJSON = show === ShowContent.PanelJSON;
      var canEdit = dashboard.meta.canEdit;
      var styles = Object(_styles__WEBPACK_IMPORTED_MODULE_7__["getPanelInspectorStyles"])();
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.toolbar,
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_5__["selectors"].components.PanelInspector.Json.content
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Field"], {
        label: "\u9009\u62E9\u6765\u6E90",
        className: "flex-grow-1"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Select"], {
        options: options,
        value: selected,
        onChange: this.onSelectChanged
      })), isPanelJSON && canEdit && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        className: styles.toolbarItem,
        onClick: this.onApplyPanelModel
      }, "\u5E94\u7528")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.content
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_4__["default"], {
        disableWidth: true
      }, function (_ref2) {
        var height = _ref2.height;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["CodeEditor"], {
          width: "100%",
          height: height,
          language: "json",
          showLineNumbers: true,
          showMiniMap: (text && text.length) > 100,
          value: text || '',
          readOnly: !isPanelJSON,
          onBlur: _this2.onTextChanged
        });
      })));
    }
  }]);

  return InspectJSONTab;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

function getPrettyJSON(obj) {
  return JSON.stringify(obj, null, 2);
}

/***/ }),

/***/ "./public/app/features/dashboard/components/Inspector/InspectMetadataTab.tsx":
/*!***********************************************************************************!*\
  !*** ./public/app/features/dashboard/components/Inspector/InspectMetadataTab.tsx ***!
  \***********************************************************************************/
/*! exports provided: InspectMetadataTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InspectMetadataTab", function() { return InspectMetadataTab; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var InspectMetadataTab = function InspectMetadataTab(_ref) {
  var _metadataDatasource$c;

  var data = _ref.data,
      metadataDatasource = _ref.metadataDatasource;

  if (!metadataDatasource || !((_metadataDatasource$c = metadataDatasource.components) === null || _metadataDatasource$c === void 0 ? void 0 : _metadataDatasource$c.MetadataInspector)) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "No Metadata Inspector");
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(metadataDatasource.components.MetadataInspector, {
    datasource: metadataDatasource,
    data: data.series
  });
};

/***/ }),

/***/ "./public/app/features/dashboard/components/Inspector/InspectSubtitle.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/features/dashboard/components/Inspector/InspectSubtitle.tsx ***!
  \********************************************************************************/
/*! exports provided: InspectSubtitle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InspectSubtitle", function() { return InspectSubtitle; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      padding-left: ", ";\n      margin: ", " -", " -", " -", ";\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var InspectSubtitle = function InspectSubtitle(_ref) {
  var tab = _ref.tab,
      tabs = _ref.tabs,
      onSelectTab = _ref.onSelectTab,
      data = _ref.data;
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["useTheme"])();
  var styles = getStyles(theme);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, data && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "muted"
  }, formatStats(data)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["TabsBar"], {
    className: styles.tabsBar
  }, tabs.map(function (t, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Tab"], {
      key: "".concat(t.value, "-").concat(index),
      label: t.label,
      active: t.value === tab,
      onChangeTab: function onChangeTab() {
        return onSelectTab(t);
      }
    });
  })));
};
var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function (theme) {
  return {
    tabsBar: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject(), theme.spacing.md, theme.spacing.lg, theme.spacing.sm, theme.spacing.lg, theme.spacing.lg)
  };
});

function formatStats(data) {
  var request = data.request;

  if (!request) {
    return '';
  }

  var queryCount = request.targets.length;
  var requestTime = request.endTime ? request.endTime - request.startTime : 0;
  var formatted = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["formattedValueToString"])(Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["getValueFormat"])('ms')(requestTime));
  return "".concat(queryCount, " \u4E2A\u67E5\u8BE2\uFF0C\u603B\u67E5\u8BE2\u65F6\u95F4\u4E3A ").concat(formatted);
}

/***/ }),

/***/ "./public/app/features/dashboard/components/Inspector/PanelInspector.tsx":
/*!*******************************************************************************!*\
  !*** ./public/app/features/dashboard/components/Inspector/PanelInspector.tsx ***!
  \*******************************************************************************/
/*! exports provided: PanelInspector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelInspector", function() { return PanelInspector; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _PanelEditor_usePanelLatestData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../PanelEditor/usePanelLatestData */ "./public/app/features/dashboard/components/PanelEditor/usePanelLatestData.ts");
/* harmony import */ var _InspectContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InspectContent */ "./public/app/features/dashboard/components/Inspector/InspectContent.tsx");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hooks */ "./public/app/features/dashboard/components/Inspector/hooks.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var PanelInspectorUnconnected = function PanelInspectorUnconnected(_ref) {
  var panel = _ref.panel,
      dashboard = _ref.dashboard,
      defaultTab = _ref.defaultTab,
      plugin = _ref.plugin;

  if (!plugin) {
    return null;
  }

  var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    withTransforms: false,
    withFieldConfig: true
  }),
      _useState2 = _slicedToArray(_useState, 2),
      dataOptions = _useState2[0],
      setDataOptions = _useState2[1];

  var _usePanelLatestData = Object(_PanelEditor_usePanelLatestData__WEBPACK_IMPORTED_MODULE_2__["usePanelLatestData"])(panel, dataOptions),
      data = _usePanelLatestData.data,
      isLoading = _usePanelLatestData.isLoading,
      error = _usePanelLatestData.error;

  var metaDs = Object(_hooks__WEBPACK_IMPORTED_MODULE_4__["useDatasourceMetadata"])(data);
  var tabs = Object(_hooks__WEBPACK_IMPORTED_MODULE_4__["useInspectTabs"])(plugin, dashboard, error, metaDs);
  var onClose = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_5__["updateLocation"])({
      query: {
        inspect: null,
        inspectTab: null
      },
      partial: true
    }));
  }, [app_core_actions__WEBPACK_IMPORTED_MODULE_5__["updateLocation"]]);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InspectContent__WEBPACK_IMPORTED_MODULE_3__["InspectContent"], {
    dashboard: dashboard,
    panel: panel,
    plugin: plugin,
    defaultTab: defaultTab,
    tabs: tabs,
    data: data,
    isDataLoading: isLoading,
    dataOptions: dataOptions,
    onDataOptionsChange: setDataOptions,
    metadataDatasource: metaDs,
    onClose: onClose
  });
};

var mapStateToProps = function mapStateToProps(state, props) {
  var panelState = state.dashboard.panels[props.panel.id];

  if (!panelState) {
    return {
      plugin: null
    };
  }

  return {
    plugin: panelState.plugin
  };
};

var PanelInspector = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(PanelInspectorUnconnected);

/***/ }),

/***/ "./public/app/features/dashboard/components/Inspector/QueryInspector.tsx":
/*!*******************************************************************************!*\
  !*** ./public/app/features/dashboard/components/Inspector/QueryInspector.tsx ***!
  \*******************************************************************************/
/*! exports provided: QueryInspector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryInspector", function() { return QueryInspector; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var app_core_components_CopyToClipboard_CopyToClipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/CopyToClipboard/CopyToClipboard */ "./public/app/core/components/CopyToClipboard/CopyToClipboard.tsx");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./styles */ "./public/app/features/dashboard/components/Inspector/styles.ts");
/* harmony import */ var _PanelEditor_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../PanelEditor/utils */ "./public/app/features/dashboard/components/PanelEditor/utils.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        font-weight: ", ";\n        color: ", ";\n        margin-right: 8px;\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }












var QueryInspector =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(QueryInspector, _PureComponent);

  function QueryInspector(props) {
    var _this;

    _classCallCheck(this, QueryInspector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(QueryInspector).call(this, props));

    _this.onIssueNewQuery = function () {
      _this.props.panel.refresh();
    };

    _this.onPanelRefresh = function () {
      _this.setState(function (prevState) {
        return _objectSpread({}, prevState, {
          dsQuery: {
            isLoading: true,
            response: {}
          }
        });
      });
    };

    _this.setFormattedJson = function (formattedJson) {
      _this.formattedJson = formattedJson;
    };

    _this.getTextForClipboard = function () {
      return JSON.stringify(_this.formattedJson, null, 2);
    };

    _this.onClipboardSuccess = function () {
      app_core_app_events__WEBPACK_IMPORTED_MODULE_4__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["AppEvents"].alertSuccess, ['内容已复制到剪贴板']);
    };

    _this.onToggleExpand = function () {
      _this.setState(function (prevState) {
        return _objectSpread({}, prevState, {
          allNodesExpanded: !_this.state.allNodesExpanded
        });
      });
    };

    _this.onToggleMocking = function () {
      _this.setState(function (prevState) {
        return _objectSpread({}, prevState, {
          isMocking: !_this.state.isMocking
        });
      });
    };

    _this.getNrOfOpenNodes = function () {
      if (_this.state.allNodesExpanded === null) {
        return 3; // 3 is default, ie when state is null
      } else if (_this.state.allNodesExpanded) {
        return 20;
      }

      return 1;
    };

    _this.setMockedResponse = function (evt) {
      var mockedResponse = evt.target.value;

      _this.setState(function (prevState) {
        return _objectSpread({}, prevState, {
          mockedResponse: mockedResponse
        });
      });
    };

    _this.state = {
      executedQueries: [],
      allNodesExpanded: null,
      isMocking: false,
      mockedResponse: '',
      dsQuery: {
        isLoading: false,
        response: {}
      }
    };
    return _this;
  }

  _createClass(QueryInspector, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.subscription = app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_10__["backendSrv"].getInspectorStream().subscribe({
        next: function next(response) {
          return _this2.onDataSourceResponse(response);
        }
      });
      this.props.panel.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["PanelEvents"].refresh, this.onPanelRefresh);
      this.updateQueryList();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(oldProps) {
      if (this.props.data !== oldProps.data) {
        this.updateQueryList();
      }
    }
    /**
     * Find the list of executed queries
     */

  }, {
    key: "updateQueryList",
    value: function updateQueryList() {
      var data = this.props.data;
      var executedQueries = [];

      if (data === null || data === void 0 ? void 0 : data.length) {
        var last = undefined;
        data.forEach(function (frame, idx) {
          var _frame$meta;

          var query = (_frame$meta = frame.meta) === null || _frame$meta === void 0 ? void 0 : _frame$meta.executedQueryString;

          if (query) {
            var _last;

            var refId = frame.refId || '?';

            if (((_last = last) === null || _last === void 0 ? void 0 : _last.refId) === refId) {
              last.frames++;
              last.rows += frame.length;
            } else {
              last = {
                refId: refId,
                frames: 0,
                rows: frame.length,
                query: query
              };
              executedQueries.push(last);
            }
          }
        });
      }

      this.setState({
        executedQueries: executedQueries
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var panel = this.props.panel;

      if (this.subscription) {
        this.subscription.unsubscribe();
      }

      panel.events.off(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["PanelEvents"].refresh, this.onPanelRefresh);
    }
  }, {
    key: "onDataSourceResponse",
    value: function onDataSourceResponse(response) {
      var _response$config;

      // ignore silent requests
      if ((_response$config = response.config) === null || _response$config === void 0 ? void 0 : _response$config.hideFromInspector) {
        return;
      }

      response = _objectSpread({}, response); // clone - dont modify the response

      if (response.headers) {
        delete response.headers;
      }

      if (response.config) {
        response.request = response.config;
        delete response.config;
        delete response.request.transformRequest;
        delete response.request.transformResponse;
        delete response.request.paramSerializer;
        delete response.request.jsonpCallbackParam;
        delete response.request.headers;
        delete response.request.requestId;
        delete response.request.inspect;
        delete response.request.retry;
        delete response.request.timeout;
      }

      if (response.data) {
        response.response = response.data;
        delete response.config;
        delete response.data;
        delete response.status;
        delete response.statusText;
        delete response.ok;
        delete response.url;
        delete response.redirected;
        delete response.type;
        delete response.$$config;
      }

      this.setState(function (prevState) {
        return _objectSpread({}, prevState, {
          dsQuery: {
            isLoading: false,
            response: response
          }
        });
      });
    }
  }, {
    key: "renderExecutedQueries",
    value: function renderExecutedQueries(executedQueries) {
      if (!executedQueries.length) {
        return null;
      }

      var styles = {
        refId: Object(emotion__WEBPACK_IMPORTED_MODULE_9__["css"])(_templateObject(), _grafana_runtime__WEBPACK_IMPORTED_MODULE_8__["config"].theme.typography.weight.semibold, _grafana_runtime__WEBPACK_IMPORTED_MODULE_8__["config"].theme.colors.textBlue)
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, executedQueries.map(function (info) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: info.refId
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: styles.refId
        }, info.refId, ":"), info.frames > 1 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, info.frames, " frames, "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, info.rows, " \u884C")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", null, info.query));
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          allNodesExpanded = _this$state.allNodesExpanded,
          executedQueries = _this$state.executedQueries;
      var _this$state$dsQuery = this.state.dsQuery,
          response = _this$state$dsQuery.response,
          isLoading = _this$state$dsQuery.isLoading;
      var openNodes = this.getNrOfOpenNodes();
      var styles = Object(_styles__WEBPACK_IMPORTED_MODULE_6__["getPanelInspectorStyles"])();
      var haveData = Object.keys(response).length > 0;

      if (!Object(_PanelEditor_utils__WEBPACK_IMPORTED_MODULE_7__["supportsDataQuery"])(this.props.panel.plugin)) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_2__["selectors"].components.PanelInspector.Query.content
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
        className: "section-heading"
      }, "\u67E5\u8BE2\u68C0\u67E5\u5668"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "small muted"
      }, "\u67E5\u8BE2\u68C0\u67E5\u5668\u4F7F\u60A8\u53EF\u4EE5\u67E5\u770B\u539F\u59CB\u8BF7\u6C42\u548C\u54CD\u5E94\u3002 \u4E3A\u4E86\u6536\u96C6\u6B64\u6570\u636E\uFF0CGrafana\u9700\u8981\u53D1\u51FA\u4E00\u4E2A\u65B0\u67E5\u8BE2\u3002 \u70B9\u51FB\u4E0B\u9762\u7684\u5237\u65B0\u6309\u94AE\u4EE5\u89E6\u53D1\u65B0\u67E5\u8BE2\u3002")), this.renderExecutedQueries(executedQueries), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.toolbar
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        icon: "sync",
        onClick: this.onIssueNewQuery,
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_2__["selectors"].components.PanelInspector.Query.refreshButton
      }, "\u5237\u65B0"), haveData && allNodesExpanded && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        icon: "minus",
        variant: "secondary",
        className: styles.toolbarItem,
        onClick: this.onToggleExpand
      }, "\u5408\u5E76\u6240\u6709"), haveData && !allNodesExpanded && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        icon: "plus",
        variant: "secondary",
        className: styles.toolbarItem,
        onClick: this.onToggleExpand
      }, "\u5C55\u5F00\u6240\u6709"), haveData && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_CopyToClipboard_CopyToClipboard__WEBPACK_IMPORTED_MODULE_5__["CopyToClipboard"], {
        text: this.getTextForClipboard,
        onSuccess: this.onClipboardSuccess,
        elType: "div",
        className: styles.toolbarItem
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        icon: "copy",
        variant: "secondary"
      }, "\u590D\u5236\u5230\u526A\u5207\u677F")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "flex-grow-1"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.contentQueryInspector
      }, isLoading && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LoadingPlaceholder"], {
        text: "\u52A0\u8F7D\u67E5\u8BE2\u68C0\u67E5\u5668..."
      }), !isLoading && haveData && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["JSONFormatter"], {
        json: response,
        open: openNodes,
        onDidRender: this.setFormattedJson
      }), !isLoading && !haveData && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "muted"
      }, "\u5C1A\u672A\u6536\u96C6\u4EFB\u4F55\u8BF7\u6C42\u548C\u54CD\u5E94\u3002 \u70B9\u51FB\u5237\u65B0\u6309\u94AE")));
    }
  }]);

  return QueryInspector;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/***/ }),

/***/ "./public/app/features/dashboard/components/Inspector/hooks.ts":
/*!*********************************************************************!*\
  !*** ./public/app/features/dashboard/components/Inspector/hooks.ts ***!
  \*********************************************************************/
/*! exports provided: useDatasourceMetadata, useInspectTabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDatasourceMetadata", function() { return useDatasourceMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useInspectTabs", function() { return useInspectTabs; });
/* harmony import */ var react_use_lib_useAsync__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-use/lib/useAsync */ "./node_modules/react-use/lib/useAsync.js");
/* harmony import */ var react_use_lib_useAsync__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_use_lib_useAsync__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _PanelEditor_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../PanelEditor/utils */ "./public/app/features/dashboard/components/PanelEditor/utils.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "./public/app/features/dashboard/components/Inspector/types.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






/**
 * Given PanelData return first data source supporting metadata inspector
 */

var useDatasourceMetadata = function useDatasourceMetadata(data) {
  var state = react_use_lib_useAsync__WEBPACK_IMPORTED_MODULE_0___default()(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _data$request;

    var targets, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, frame, _dataSource$component, dataSource;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            targets = (data === null || data === void 0 ? void 0 : (_data$request = data.request) === null || _data$request === void 0 ? void 0 : _data$request.targets) || [];

            if (!(data && data.series && targets.length)) {
              _context.next = 32;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 5;
            _iterator = data.series[Symbol.iterator]();

          case 7:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 18;
              break;
            }

            frame = _step.value;

            if (!(frame.meta && frame.meta.custom)) {
              _context.next = 15;
              break;
            }

            _context.next = 12;
            return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getDataSourceSrv"])().get(targets[0].datasource);

          case 12:
            dataSource = _context.sent;

            if (!(dataSource && ((_dataSource$component = dataSource.components) === null || _dataSource$component === void 0 ? void 0 : _dataSource$component.MetadataInspector))) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", dataSource);

          case 15:
            _iteratorNormalCompletion = true;
            _context.next = 7;
            break;

          case 18:
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](5);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 24:
            _context.prev = 24;
            _context.prev = 25;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 27:
            _context.prev = 27;

            if (!_didIteratorError) {
              _context.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return _context.finish(27);

          case 31:
            return _context.finish(24);

          case 32:
            return _context.abrupt("return", undefined);

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 20, 24, 32], [25,, 27, 31]]);
  })), [data]);
  return state.value;
};
/**
 * Configures tabs for PanelInspector
 */

var useInspectTabs = function useInspectTabs(plugin, dashboard, error, metaDs) {
  return Object(react__WEBPACK_IMPORTED_MODULE_2__["useMemo"])(function () {
    var tabs = [];

    if (Object(_PanelEditor_utils__WEBPACK_IMPORTED_MODULE_3__["supportsDataQuery"])(plugin)) {
      tabs.push({
        label: '数据',
        value: _types__WEBPACK_IMPORTED_MODULE_4__["InspectTab"].Data
      });
      tabs.push({
        label: '状态',
        value: _types__WEBPACK_IMPORTED_MODULE_4__["InspectTab"].Stats
      });
    }

    if (metaDs) {
      tabs.push({
        label: '元数据',
        value: _types__WEBPACK_IMPORTED_MODULE_4__["InspectTab"].Meta
      });
    }

    tabs.push({
      label: 'JSON',
      value: _types__WEBPACK_IMPORTED_MODULE_4__["InspectTab"].JSON
    });

    if (error && error.message) {
      tabs.push({
        label: '错误',
        value: _types__WEBPACK_IMPORTED_MODULE_4__["InspectTab"].Error
      });
    }

    if (dashboard.meta.canEdit && Object(_PanelEditor_utils__WEBPACK_IMPORTED_MODULE_3__["supportsDataQuery"])(plugin)) {
      tabs.push({
        label: '查询',
        value: _types__WEBPACK_IMPORTED_MODULE_4__["InspectTab"].Query
      });
    }

    return tabs;
  }, [plugin, metaDs, dashboard, error]);
};

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/AngularPanelOptions.tsx":
/*!**************************************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/AngularPanelOptions.tsx ***!
  \**************************************************************************************/
/*! exports provided: AngularPanelOptionsUnconnected, AngularPanelOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularPanelOptionsUnconnected", function() { return AngularPanelOptionsUnconnected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularPanelOptions", function() { return AngularPanelOptions; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../state/actions */ "./public/app/features/dashboard/state/actions.ts");
/* harmony import */ var _state_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state/utils */ "./public/app/features/dashboard/components/PanelEditor/state/utils.ts");
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

 // Utils & Services

 // Types



var AngularPanelOptionsUnconnected =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AngularPanelOptionsUnconnected, _PureComponent);

  function AngularPanelOptionsUnconnected(props) {
    _classCallCheck(this, AngularPanelOptionsUnconnected);

    return _possibleConstructorReturn(this, _getPrototypeOf(AngularPanelOptionsUnconnected).call(this, props));
  }

  _createClass(AngularPanelOptionsUnconnected, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadAngularOptions();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.plugin !== prevProps.plugin) {
        this.cleanUpAngularOptions();
      }

      this.loadAngularOptions();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cleanUpAngularOptions();
    }
  }, {
    key: "cleanUpAngularOptions",
    value: function cleanUpAngularOptions() {
      if (this.angularOptions) {
        this.angularOptions.destroy();
        this.angularOptions = null;
      }
    }
  }, {
    key: "loadAngularOptions",
    value: function loadAngularOptions() {
      var _this = this;

      var _this$props = this.props,
          panel = _this$props.panel,
          angularPanelComponent = _this$props.angularPanelComponent,
          changePanelPlugin = _this$props.changePanelPlugin;

      if (!this.element || !angularPanelComponent || this.angularOptions) {
        return;
      }

      var scope = angularPanelComponent.getScope(); // When full page reloading in edit mode the angular panel has on fully compiled & instantiated yet

      if (!scope.$$childHead) {
        setTimeout(function () {
          _this.forceUpdate();
        });
        return;
      }

      var panelCtrl = scope.$$childHead.ctrl;
      panelCtrl.initEditMode();

      panelCtrl.onPluginTypeChange = function (plugin) {
        changePanelPlugin(panel, plugin.id);
      };

      var template = '';

      for (var i = 0; i < panelCtrl.editorTabs.length; i++) {
        var tab = panelCtrl.editorTabs[i];
        tab.isOpen = Object(_state_utils__WEBPACK_IMPORTED_MODULE_4__["getSectionOpenState"])(tab.title, i === 0);
        template += "\n      <div class=\"panel-options-group\" ng-cloak>        \n        <div class=\"panel-options-group__header\" ng-click=\"toggleOptionGroup(".concat(i, ")\" aria-label=\"").concat(tab.title, " section\">\n          <div class=\"panel-options-group__icon\">\n            <icon name=\"ctrl.editorTabs[").concat(i, "].isOpen ? 'angle-down' : 'angle-right'\"></icon>\n          </div>\n          <div class=\"panel-options-group__title\">").concat(tab.title, "</div>\n        </div>\n        <div class=\"panel-options-group__body\" ng-if=\"ctrl.editorTabs[").concat(i, "].isOpen\">\n          <panel-editor-tab editor-tab=\"ctrl.editorTabs[").concat(i, "]\" ctrl=\"ctrl\"></panel-editor-tab>\n        </div>\n      </div>\n      ");
      }

      var loader = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getAngularLoader"])();
      var scopeProps = {
        ctrl: panelCtrl,
        toggleOptionGroup: function toggleOptionGroup(index) {
          var tab = panelCtrl.editorTabs[index];
          tab.isOpen = !tab.isOpen;
          Object(_state_utils__WEBPACK_IMPORTED_MODULE_4__["saveSectionOpenState"])(tab.title, tab.isOpen);
        }
      };
      this.angularOptions = loader.load(this.element, scopeProps, template);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        ref: function ref(elem) {
          return _this2.element = elem;
        }
      });
    }
  }]);

  return AngularPanelOptionsUnconnected;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    angularPanelComponent: state.dashboard.panels[props.panel.id].angularComponent
  };
};

var mapDispatchToProps = {
  changePanelPlugin: _state_actions__WEBPACK_IMPORTED_MODULE_3__["changePanelPlugin"]
};
var AngularPanelOptions = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AngularPanelOptionsUnconnected);

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/DynamicConfigValueEditor.tsx":
/*!*******************************************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/DynamicConfigValueEditor.tsx ***!
  \*******************************************************************************************/
/*! exports provided: DynamicConfigValueEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicConfigValueEditor", function() { return DynamicConfigValueEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _OptionsGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OptionsGroup */ "./public/app/features/dashboard/components/PanelEditor/OptionsGroup.tsx");
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      label: collapsibleOverrideEditor;\n      & + .dynamicConfigValueEditor--nonCollapsible {\n        margin-top: ", "px;\n      }\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n          padding-left: 0;\n          padding-right: 0;\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var DynamicConfigValueEditor = function DynamicConfigValueEditor(_ref) {
  var property = _ref.property,
      context = _ref.context,
      registry = _ref.registry,
      _onChange = _ref.onChange,
      onRemove = _ref.onRemove,
      isCollapsible = _ref.isCollapsible;
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["useTheme"])();
  var styles = getStyles(theme);
  var item = registry === null || registry === void 0 ? void 0 : registry.getIfExists(property.id);

  if (!item) {
    return null;
  }

  var editor;

  var renderLabel = function renderLabel() {
    var includeDescription = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var includeCounter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return function () {
      var isExpanded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["HorizontalGroup"], {
        justify: "space-between"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Label"], {
        description: includeDescription ? item.description : undefined
      }, item.name, !isExpanded && includeCounter && item.getItemsCount && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Counter"], {
        value: item.getItemsCount(property.value)
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["IconButton"], {
        name: "times",
        onClick: onRemove
      })));
    };
  };

  if (isCollapsible) {
    editor = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OptionsGroup__WEBPACK_IMPORTED_MODULE_3__["OptionsGroup"], {
      id: item.name,
      renderTitle: renderLabel(false, true),
      className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject()),
      nested: true,
      defaultToClosed: property.value !== undefined
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(item.override, {
      value: property.value,
      onChange: function onChange(value) {
        _onChange(value);
      },
      item: item,
      context: context
    }));
  } else {
    editor = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      label: renderLabel()(),
      description: item.description
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(item.override, {
      value: property.value,
      onChange: function onChange(value) {
        _onChange(value);
      },
      item: item,
      context: context
    })));
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])(isCollapsible && styles.collapsibleOverrideEditor, !isCollapsible && 'dynamicConfigValueEditor--nonCollapsible')
  }, editor);
};
var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["stylesFactory"])(function (theme) {
  return {
    collapsibleOverrideEditor: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject2(), theme.spacing.formSpacingBase)
  };
});

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/FieldConfigEditor.tsx":
/*!************************************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/FieldConfigEditor.tsx ***!
  \************************************************************************************/
/*! exports provided: OverrideFieldConfigEditor, DefaultFieldConfigEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OverrideFieldConfigEditor", function() { return OverrideFieldConfigEditor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultFieldConfigEditor", function() { return DefaultFieldConfigEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _panel_panellinks_link_srv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../panel/panellinks/link_srv */ "./public/app/features/panel/panellinks/link_srv.ts");
/* harmony import */ var _OverrideEditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./OverrideEditor */ "./public/app/features/dashboard/components/PanelEditor/OverrideEditor.tsx");
/* harmony import */ var lodash_groupBy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash/groupBy */ "./node_modules/lodash/groupBy.js");
/* harmony import */ var lodash_groupBy__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_groupBy__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _OptionsGroup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./OptionsGroup */ "./public/app/features/dashboard/components/PanelEditor/OptionsGroup.tsx");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var app_core_utils_docsLinks__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/utils/docsLinks */ "./public/app/core/utils/docsLinks.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils */ "./public/app/features/dashboard/components/PanelEditor/utils.ts");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            margin: ", ";\n          "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














/**
 * Expects the container div to have size set and will fill it 100%
 */
var OverrideFieldConfigEditor = function OverrideFieldConfigEditor(props) {
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["useTheme"])();
  var config = props.config;

  var onOverrideChange = function onOverrideChange(index, override) {
    var config = props.config;
    var overrides = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"])(config.overrides);
    overrides[index] = override;
    props.onChange(_objectSpread({}, config, {
      overrides: overrides
    }));
  };

  var onOverrideRemove = function onOverrideRemove(overrideIndex) {
    var config = props.config;
    var overrides = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"])(config.overrides);
    overrides.splice(overrideIndex, 1);
    props.onChange(_objectSpread({}, config, {
      overrides: overrides
    }));
  };

  var onOverrideAdd = function onOverrideAdd(value) {
    var onChange = props.onChange,
        config = props.config;
    onChange(_objectSpread({}, config, {
      overrides: [].concat(_toConsumableArray(config.overrides), [{
        matcher: {
          id: value.value
        },
        properties: []
      }])
    }));
  };

  var renderOverrides = function renderOverrides() {
    var config = props.config,
        data = props.data,
        plugin = props.plugin;
    var fieldConfigRegistry = plugin.fieldConfigRegistry;

    if (config.overrides.length === 0) {
      return null;
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, config.overrides.map(function (o, i) {
      // TODO:  apply matcher to retrieve fields
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OverrideEditor__WEBPACK_IMPORTED_MODULE_5__["OverrideEditor"], {
        name: "\u8986\u76D6 ".concat(i + 1),
        key: "".concat(o.matcher.id, "/").concat(i),
        data: data,
        override: o,
        onChange: function onChange(value) {
          return onOverrideChange(i, value);
        },
        onRemove: function onRemove() {
          return onOverrideRemove(i);
        },
        registry: fieldConfigRegistry
      });
    }));
  };

  var renderAddOverride = function renderAddOverride() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Container"], {
      padding: "md"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["ValuePicker"], {
      icon: "plus",
      label: "\u6DFB\u52A0\u66FF\u4EE3",
      variant: "secondary",
      options: _grafana_ui__WEBPACK_IMPORTED_MODULE_3__["fieldMatchersUI"].list().map(function (i) {
        return {
          label: i.name,
          value: i.id,
          description: i.description
        };
      }),
      onChange: function onChange(value) {
        return onOverrideAdd(value);
      },
      isFullWidth: false
    }));
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_8__["selectors"].components.OverridesConfigEditor.content
  }, config.overrides.length === 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FeatureInfoBox"], {
    title: "\u8986\u76D6",
    url: Object(app_core_utils_docsLinks__WEBPACK_IMPORTED_MODULE_10__["getDocsLink"])(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["DocsId"].FieldConfigOverrides),
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_9__["css"])(_templateObject(), theme.spacing.md)
  }, "\u5B57\u6BB5\u8986\u76D6\u89C4\u5219\u4F7F\u60A8\u53EF\u4EE5\u66F4\u597D\u5730\u63A7\u5236\u6570\u636E\u7684\u663E\u793A\u65B9\u5F0F\u3002", ' '), renderOverrides(), renderAddOverride());
};
var DefaultFieldConfigEditor = function DefaultFieldConfigEditor(_ref) {
  var data = _ref.data,
      onChange = _ref.onChange,
      config = _ref.config,
      plugin = _ref.plugin;
  var onDefaultValueChange = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (name, value, isCustom) {
    onChange(Object(_utils__WEBPACK_IMPORTED_MODULE_11__["updateDefaultFieldConfigValue"])(config, name, value, isCustom));
  }, [config, onChange]);
  var renderEditor = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (item, categoryItemCount) {
    var _item$category, _item$category2;

    if (item.isCustom && item.showIf && !item.showIf(config.defaults.custom)) {
      return null;
    }

    var defaults = config.defaults;
    var value = item.isCustom ? defaults.custom ? Object(lodash__WEBPACK_IMPORTED_MODULE_1__["get"])(defaults.custom, item.path) : undefined : Object(lodash__WEBPACK_IMPORTED_MODULE_1__["get"])(defaults, item.path);
    var label = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Label"], {
      description: item.description,
      category: (_item$category = item.category) === null || _item$category === void 0 ? void 0 : _item$category.slice(1)
    }, item.name); // hide label if there is only one item and category name is same as item, name

    if (categoryItemCount === 1 && ((_item$category2 = item.category) === null || _item$category2 === void 0 ? void 0 : _item$category2[0]) === item.name) {
      label = undefined;
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Field"], {
      label: label,
      key: "".concat(item.id, "/").concat(item.isCustom)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(item.editor, {
      item: item,
      value: value,
      onChange: function onChange(v) {
        return onDefaultValueChange(item.path, v, item.isCustom);
      },
      context: {
        data: data,
        getSuggestions: function getSuggestions(scope) {
          return Object(_panel_panellinks_link_srv__WEBPACK_IMPORTED_MODULE_4__["getDataLinksVariableSuggestions"])(data, scope);
        }
      }
    }));
  }, [config]);
  var groupedConfigs = lodash_groupBy__WEBPACK_IMPORTED_MODULE_6___default()(plugin.fieldConfigRegistry.list(), function (i) {
    return i.category && i.category[0];
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_8__["selectors"].components.FieldConfigEditor.content
  }, Object.keys(groupedConfigs).map(function (k, i) {
    var groupItemsCounter = countGroupItems(groupedConfigs[k], config);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OptionsGroup__WEBPACK_IMPORTED_MODULE_7__["OptionsGroup"], {
      renderTitle: function renderTitle(isExpanded) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, k, " ", !isExpanded && groupItemsCounter && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Counter"], {
          value: groupItemsCounter
        }));
      },
      id: "".concat(k, "/").concat(i),
      key: "".concat(k, "/").concat(i)
    }, groupedConfigs[k].map(function (c) {
      return renderEditor(c, groupedConfigs[k].length);
    }));
  }));
};

var countGroupItems = function countGroupItems(group, config) {
  var counter = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = group[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      var value = item.isCustom ? config.defaults.custom ? config.defaults.custom[item.path] : undefined : config.defaults[item.path];

      if (item.getItemsCount && item.getItemsCount(value) > 0) {
        counter = counter + item.getItemsCount(value);
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

  return counter === 0 ? undefined : counter;
};

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/OptionsGroup.tsx":
/*!*******************************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/OptionsGroup.tsx ***!
  \*******************************************************************************/
/*! exports provided: OptionsGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsGroup", function() { return OptionsGroup; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/dashboard/components/PanelEditor/state/reducers.ts");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/index.js");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n          position: relative;\n          padding-right: 0;\n          &:before {\n            content: '';\n            position: absolute;\n            top: 0;\n            left: 8px;\n            width: 1px;\n            height: 100%;\n            background: ", ";\n          }\n        "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n        padding: ", " ", " ", " ", ";\n      "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n          padding-left: 0;\n          padding-right: 0;\n          padding-top: 0;\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n        display: flex;\n        cursor: pointer;\n        align-items: baseline;\n        padding: ", " ", " ", " ", ";\n        color: ", ";\n        font-weight: ", ";\n\n        &:hover {\n          color: ", ";\n\n          .editor-options-group-toggle {\n            color: ", ";\n          }\n        }\n      "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n      flex-grow: 1;\n      overflow: hidden;\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      color: ", ";\n      margin-right: ", ";\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n          margin-bottom: ", "px;\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n          border-bottom: 1px solid ", ";\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var OptionsGroup = function OptionsGroup(_ref) {
  var id = _ref.id,
      title = _ref.title,
      children = _ref.children,
      defaultToClosed = _ref.defaultToClosed,
      renderTitle = _ref.renderTitle,
      className = _ref.className,
      _ref$nested = _ref.nested,
      nested = _ref$nested === void 0 ? false : _ref$nested,
      _ref$persistMe = _ref.persistMe,
      persistMe = _ref$persistMe === void 0 ? true : _ref$persistMe,
      onToggle = _ref.onToggle;

  if (persistMe) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CollapsibleSectionWithPersistence, {
      id: id,
      defaultToClosed: defaultToClosed,
      className: className,
      nested: nested,
      renderTitle: renderTitle,
      persistMe: persistMe,
      title: title,
      onToggle: onToggle
    }, children);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CollapsibleSection, {
    id: id,
    defaultToClosed: defaultToClosed,
    className: className,
    nested: nested,
    renderTitle: renderTitle,
    title: title,
    onToggle: onToggle
  }, children);
};
var CollapsibleSectionWithPersistence = Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(function (props) {
  var _useLocalStorage = Object(react_use__WEBPACK_IMPORTED_MODULE_5__["useLocalStorage"])(getOptionGroupStorageKey(props.id), {
    defaultToClosed: props.defaultToClosed
  }),
      _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
      value = _useLocalStorage2[0],
      setValue = _useLocalStorage2[1];

  var onToggle = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (isExpanded) {
    setValue({
      defaultToClosed: !isExpanded
    });

    if (props.onToggle) {
      props.onToggle(isExpanded);
    }
  }, [setValue, props.onToggle]);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CollapsibleSection, _extends({}, props, {
    defaultToClosed: value.defaultToClosed,
    onToggle: onToggle
  }));
});

var CollapsibleSection = function CollapsibleSection(_ref2) {
  var id = _ref2.id,
      title = _ref2.title,
      children = _ref2.children,
      defaultToClosed = _ref2.defaultToClosed,
      renderTitle = _ref2.renderTitle,
      className = _ref2.className,
      _ref2$nested = _ref2.nested,
      nested = _ref2$nested === void 0 ? false : _ref2$nested,
      onToggle = _ref2.onToggle;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(!defaultToClosed),
      _useState2 = _slicedToArray(_useState, 2),
      isExpanded = _useState2[0],
      toggleExpand = _useState2[1];

  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["useTheme"])();
  var styles = getStyles(theme, isExpanded, nested);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (onToggle) {
      onToggle(isExpanded);
    }
  }, [isExpanded]);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["cx"])(styles.box, className, 'options-group')
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.header,
    onClick: function onClick() {
      return toggleExpand(!isExpanded);
    },
    "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_6__["selectors"].components.OptionsGroup.toggle(id)
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["cx"])(styles.toggle, 'editor-options-group-toggle')
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Icon"], {
    name: isExpanded ? 'angle-down' : 'angle-right'
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.title
  }, renderTitle ? renderTitle(isExpanded) : title)), isExpanded && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.body
  }, lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isFunction(children) ? children(toggleExpand) : children));
};

var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["stylesFactory"])(function (theme, isExpanded, isNested) {
  return {
    box: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["cx"])(!isNested && Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject(), theme.colors.pageHeaderBorder), isNested && isExpanded && Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2(), theme.spacing.formSpacingBase * 2)),
    toggle: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3(), theme.colors.textWeak, theme.spacing.sm),
    title: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject4()),
    header: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["cx"])(Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject5(), theme.spacing.sm, theme.spacing.md, theme.spacing.sm, theme.spacing.sm, isExpanded ? theme.colors.text : theme.colors.formLabel, theme.typography.weight.semibold, theme.colors.text, theme.colors.text), isNested && Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject6())),
    body: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["cx"])(Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject7(), theme.spacing.sm, theme.spacing.md, theme.spacing.sm, theme.spacing.xl), isNested && Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject8(), theme.colors.pageHeaderBorder))
  };
});

var getOptionGroupStorageKey = function getOptionGroupStorageKey(id) {
  return "".concat(_state_reducers__WEBPACK_IMPORTED_MODULE_4__["PANEL_EDITOR_UI_STATE_STORAGE_KEY"], ".optionGroup[").concat(id, "]");
};

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/OptionsPaneContent.tsx":
/*!*************************************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/OptionsPaneContent.tsx ***!
  \*************************************************************************************/
/*! exports provided: OptionsPaneContent, TabsBarContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsPaneContent", function() { return OptionsPaneContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsBarContent", function() { return TabsBarContent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-transition-group/Transition */ "./node_modules/react-transition-group/esm/Transition.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _FieldConfigEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FieldConfigEditor */ "./public/app/features/dashboard/components/PanelEditor/FieldConfigEditor.tsx");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _PanelOptionsTab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PanelOptionsTab */ "./public/app/features/dashboard/components/PanelEditor/PanelOptionsTab.tsx");
/* harmony import */ var app_features_dashboard_components_DashNav_DashNavButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/features/dashboard/components/DashNav/DashNavButton */ "./public/app/features/dashboard/components/DashNav/DashNavButton.tsx");
/* harmony import */ var _usePanelLatestData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./usePanelLatestData */ "./public/app/features/dashboard/components/PanelEditor/usePanelLatestData.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n      label: legacy-options;\n      .panel-options-grid {\n        display: flex;\n        flex-direction: column;\n      }\n      .panel-options-group {\n        margin-bottom: 0;\n      }\n      .panel-options-group__body {\n        padding: ", " 0;\n      }\n\n      .section {\n        display: block;\n        margin: ", " 0;\n\n        &:first-child {\n          margin-top: 0;\n        }\n      }\n    "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n      padding: 0;\n      display: flex;\n      flex-direction: column;\n      flex-grow: 1;\n      min-height: 0;\n      background: ", ";\n      border-left: 1px solid ", ";\n    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n      cursor: pointer;\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n      color: ", ";\n      flex-grow: 1;\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      flex-grow: 1;\n      flex-direction: row-reverse;\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      padding-right: ", ";\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      height: 100%;\n      width: 100%;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      flex-direction: column;\n      height: 100%;\n      padding-top: ", ";\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var OptionsPaneContent = function OptionsPaneContent(_ref) {
  var plugin = _ref.plugin,
      panel = _ref.panel,
      width = _ref.width,
      onFieldConfigsChange = _ref.onFieldConfigsChange,
      onPanelOptionsChanged = _ref.onPanelOptionsChanged,
      onPanelConfigChange = _ref.onPanelConfigChange,
      onClose = _ref.onClose,
      dashboard = _ref.dashboard;
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["useTheme"])();
  var styles = getStyles(theme);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('options'),
      _useState2 = _slicedToArray(_useState, 2),
      activeTab = _useState2[0],
      setActiveTab = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isSearching = _useState4[0],
      setSearchMode = _useState4[1];

  var _usePanelLatestData = Object(_usePanelLatestData__WEBPACK_IMPORTED_MODULE_7__["usePanelLatestData"])(panel, {
    withTransforms: true,
    withFieldConfig: false
  }),
      data = _usePanelLatestData.data,
      hasSeries = _usePanelLatestData.hasSeries;

  var renderFieldOptions = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (plugin) {
    var fieldConfig = panel.getFieldConfig();

    if (!fieldConfig || !hasSeries) {
      return null;
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FieldConfigEditor__WEBPACK_IMPORTED_MODULE_3__["DefaultFieldConfigEditor"], {
      config: fieldConfig,
      plugin: plugin,
      onChange: onFieldConfigsChange
      /* hasSeries makes sure current data is there */
      ,
      data: data.series
    });
  }, [data, plugin, panel, onFieldConfigsChange]);
  var renderFieldOverrideOptions = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (plugin) {
    var fieldConfig = panel.getFieldConfig();

    if (!fieldConfig || !hasSeries) {
      return null;
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FieldConfigEditor__WEBPACK_IMPORTED_MODULE_3__["OverrideFieldConfigEditor"], {
      config: fieldConfig,
      plugin: plugin,
      onChange: onFieldConfigsChange
      /* hasSeries makes sure current data is there */
      ,
      data: data.series
    });
  }, [data, plugin, panel, onFieldConfigsChange]); // When the panel has no query only show the main tab

  var showMainTab = activeTab === 'options' || plugin.meta.skipDataQuery;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.panelOptionsPane,
    "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_8__["selectors"].components.PanelEditor.OptionsPane.content
  }, plugin && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.wrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["TabsBar"], {
    className: styles.tabsBar
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabsBarContent, {
    width: width,
    plugin: plugin,
    isSearching: isSearching,
    styles: styles,
    activeTab: activeTab,
    onClose: onClose,
    setSearchMode: setSearchMode,
    setActiveTab: setActiveTab,
    panel: panel
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["TabContent"], {
    className: styles.tabContent
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["CustomScrollbar"], {
    autoHeightMin: "100%"
  }, showMainTab ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PanelOptionsTab__WEBPACK_IMPORTED_MODULE_5__["PanelOptionsTab"], {
    panel: panel,
    plugin: plugin,
    dashboard: dashboard,
    data: data,
    onPanelConfigChange: onPanelConfigChange,
    onPanelOptionsChanged: onPanelOptionsChanged
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, activeTab === 'defaults' && renderFieldOptions(plugin), activeTab === 'overrides' && renderFieldOverrideOptions(plugin))))));
};
var TabsBarContent = function TabsBarContent(_ref2) {
  var width = _ref2.width,
      plugin = _ref2.plugin,
      isSearching = _ref2.isSearching,
      activeTab = _ref2.activeTab,
      onClose = _ref2.onClose,
      setSearchMode = _ref2.setSearchMode,
      setActiveTab = _ref2.setActiveTab,
      styles = _ref2.styles,
      panel = _ref2.panel;
  var overridesCount = panel.getFieldConfig().overrides.length === 0 ? undefined : panel.getFieldConfig().overrides.length;

  if (isSearching) {
    var defaultStyles = {
      transition: 'width 50ms ease-in-out',
      width: '50%',
      display: 'flex'
    };
    var transitionStyles = {
      entered: {
        width: '100%'
      }
    };
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_1__["default"], {
      in: true,
      timeout: 0,
      appear: true
    }, function (state) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.searchWrapper
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: _objectSpread({}, defaultStyles, {}, transitionStyles[state])
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
        className: styles.searchInput,
        type: "text",
        prefix: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
          name: "search"
        }),
        ref: function ref(elem) {
          return elem && elem.focus();
        },
        placeholder: "\u641C\u7D22\u6240\u6709\u9009\u9879",
        suffix: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
          name: "times",
          onClick: function onClick() {
            return setSearchMode(false);
          },
          className: styles.searchRemoveIcon
        })
      })));
    });
  } // Show the appropriate tabs


  var tabs = tabSelections;
  var active = tabs.find(function (v) {
    return v.value === activeTab;
  }); // If no field configs hide Fields & Override tab

  if (plugin.fieldConfigRegistry.isEmpty()) {
    active = tabSelections[0];
    tabs = [active];
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, width < 352 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex-grow-1",
    "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_8__["selectors"].components.PanelEditor.OptionsPane.select
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], {
    options: tabs,
    value: active,
    onChange: function onChange(v) {
      setActiveTab(v.value);
    }
  })) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, tabs.map(function (item) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Tab"], {
      key: item.value,
      label: item.label,
      counter: item.value === 'overrides' ? overridesCount : undefined,
      active: active.value === item.value,
      onChangeTab: function onChangeTab() {
        return setActiveTab(item.value);
      },
      title: item.tooltip,
      "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_8__["selectors"].components.PanelEditor.OptionsPane.tab(item.label)
    });
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "flex-grow-1"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.tabsButton
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_features_dashboard_components_DashNav_DashNavButton__WEBPACK_IMPORTED_MODULE_6__["DashNavButton"], {
    icon: "angle-right",
    tooltip: "\u5173\u95ED\u9009\u9879\u7A97\u683C",
    classSuffix: "close-options",
    onClick: onClose,
    iconSize: "lg"
  })));
};
var tabSelections = [{
  label: '仪表板',
  value: 'options',
  tooltip: '配置面板显示选项'
}, {
  label: '字段',
  value: 'defaults',
  tooltip: '配置字段选项'
}, {
  label: '覆盖',
  value: 'overrides',
  tooltip: '配置字段选项替代'
}];
var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function (theme) {
  return {
    wrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(_templateObject(), theme.spacing.md),
    panelOptionsPane: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(_templateObject2()),
    tabsBar: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(_templateObject3(), theme.spacing.sm),
    searchWrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(_templateObject4()),
    searchInput: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(_templateObject5(), theme.colors.textWeak),
    searchRemoveIcon: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(_templateObject6()),
    tabContent: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(_templateObject7(), theme.colors.bodyBg, theme.colors.pageHeaderBorder),
    tabsButton: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(_templateObject8()),
    legacyOptions: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(_templateObject9(), theme.spacing.md, theme.spacing.md)
  };
});

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/OverrideEditor.tsx":
/*!*********************************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/OverrideEditor.tsx ***!
  \*********************************************************************************/
/*! exports provided: OverrideEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OverrideEditor", function() { return OverrideEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _DynamicConfigValueEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DynamicConfigValueEditor */ "./public/app/features/dashboard/components/PanelEditor/DynamicConfigValueEditor.tsx");
/* harmony import */ var _panel_panellinks_link_srv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../panel/panellinks/link_srv */ "./public/app/features/panel/panellinks/link_srv.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _OptionsGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./OptionsGroup */ "./public/app/features/dashboard/components/PanelEditor/OptionsGroup.tsx");
function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n      overflow: hidden;\n      padding-right: ", ";\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      font-size: ", ";\n      color: ", ";\n      font-weight: ", ";\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      margin-top: ", "px;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      padding: ", ";\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }








var COLLECTION_STANDARD_PROPERTIES = [_grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldConfigProperty"].Thresholds, _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldConfigProperty"].Links, _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldConfigProperty"].Mappings];
var OverrideEditor = function OverrideEditor(_ref) {
  var name = _ref.name,
      data = _ref.data,
      override = _ref.override,
      onChange = _ref.onChange,
      onRemove = _ref.onRemove,
      registry = _ref.registry;
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["useTheme"])();
  var matcherUi = _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["fieldMatchersUI"].get(override.matcher.id);
  var styles = getStyles(theme);
  var matcherLabel = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Label"], null, matcherUi.name);
  var onMatcherConfigChange = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (matcherConfig) {
    override.matcher.options = matcherConfig;
    onChange(override);
  }, [override, onChange]);
  var onDynamicConfigValueChange = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (index, value) {
    override.properties[index].value = value;
    onChange(override);
  }, [override, onChange]);
  var onDynamicConfigValueRemove = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (index) {
    override.properties.splice(index, 1);
    onChange(override);
  }, [override, onChange]);
  var onDynamicConfigValueAdd = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (id) {
    var registryItem = registry.get(id);
    var propertyConfig = {
      id: id,
      value: registryItem.defaultValue
    };

    if (override.properties) {
      override.properties.push(propertyConfig);
    } else {
      override.properties = [propertyConfig];
    }

    onChange(override);
  }, [override, onChange]);
  var configPropertiesOptions = registry.list().map(function (item) {
    return {
      label: item.name,
      value: item.id,
      description: item.description
    };
  });

  var renderOverrideTitle = function renderOverrideTitle(isExpanded) {
    var overriddenProperites = override.properties.map(function (p) {
      return registry.get(p.id).name;
    }).join(', ');
    var matcherOptions = matcherUi.optionsToLabel(override.matcher.options);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["HorizontalGroup"], {
      justify: "space-between"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["IconButton"], {
      name: "trash-alt",
      onClick: onRemove
    })), !isExpanded && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: styles.overrideDetails
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: styles.options,
      title: matcherOptions
    }, matcherUi.name, " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
      name: "angle-right"
    }), " ", matcherOptions), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: styles.options,
      title: overriddenProperites
    }, "Properties overridden ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
      name: "angle-right"
    }), overriddenProperites)));
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OptionsGroup__WEBPACK_IMPORTED_MODULE_6__["OptionsGroup"], {
    renderTitle: renderOverrideTitle,
    id: name,
    key: name
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
    label: matcherLabel
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(matcherUi.component, {
    matcher: matcherUi.matcher,
    data: data,
    options: override.matcher.options,
    onChange: function onChange(option) {
      return onMatcherConfigChange(option);
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, override.properties.map(function (p, j) {
    var item = registry.getIfExists(p.id);

    if (!item) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "\u672A\u77E5\u7684\u5C5E\u6027\uFF1A ", p.id);
    }

    var isCollapsible = Array.isArray(p.value) || COLLECTION_STANDARD_PROPERTIES.includes(p.id);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DynamicConfigValueEditor__WEBPACK_IMPORTED_MODULE_3__["DynamicConfigValueEditor"], {
      key: "".concat(p.id, "/").concat(j),
      isCollapsible: isCollapsible,
      onChange: function onChange(value) {
        return onDynamicConfigValueChange(j, value);
      },
      onRemove: function onRemove() {
        return onDynamicConfigValueRemove(j);
      },
      property: p,
      registry: registry,
      context: {
        data: data,
        getSuggestions: function getSuggestions(scope) {
          return Object(_panel_panellinks_link_srv__WEBPACK_IMPORTED_MODULE_4__["getDataLinksVariableSuggestions"])(data, scope);
        }
      }
    });
  }), override.matcher.options && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.propertyPickerWrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["ValuePicker"], {
    label: "\u6DFB\u52A0\u66FF\u4EE3\u5C5E\u6027",
    variant: "secondary",
    icon: "plus",
    options: configPropertiesOptions,
    onChange: function onChange(o) {
      onDynamicConfigValueAdd(o.value);
    },
    isFullWidth: false
  }))));
};
var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function (theme) {
  return {
    matcherUi: Object(emotion__WEBPACK_IMPORTED_MODULE_5__["css"])(_templateObject(), theme.spacing.sm),
    propertyPickerWrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_5__["css"])(_templateObject2(), theme.spacing.formSpacingBase * 2),
    overrideDetails: Object(emotion__WEBPACK_IMPORTED_MODULE_5__["css"])(_templateObject3(), theme.typography.size.sm, theme.colors.textWeak, theme.typography.weight.regular),
    options: Object(emotion__WEBPACK_IMPORTED_MODULE_5__["css"])(_templateObject4(), theme.spacing.xl)
  };
});

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/PanelEditor.tsx":
/*!******************************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/PanelEditor.tsx ***!
  \******************************************************************************/
/*! exports provided: PanelEditorUnconnected, PanelEditor, getStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelEditorUnconnected", function() { return PanelEditorUnconnected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelEditor", function() { return PanelEditor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyles", function() { return getStyles; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-virtualized-auto-sizer */ "./node_modules/react-virtualized-auto-sizer/dist/index.esm.js");
/* harmony import */ var _dashgrid_DashboardPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../dashgrid/DashboardPanel */ "./public/app/features/dashboard/dashgrid/DashboardPanel.tsx");
/* harmony import */ var react_split_pane__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-split-pane */ "./node_modules/react-split-pane/dist/index.esm.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _core_reducers_location__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../core/reducers/location */ "./public/app/core/reducers/location.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./types */ "./public/app/features/dashboard/components/PanelEditor/types.ts");
/* harmony import */ var _PanelEditorTabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PanelEditorTabs */ "./public/app/features/dashboard/components/PanelEditor/PanelEditorTabs.tsx");
/* harmony import */ var _DashNav_DashNavTimeControls__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../DashNav/DashNavTimeControls */ "./public/app/features/dashboard/components/DashNav/DashNavTimeControls.tsx");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils */ "./public/app/features/dashboard/components/PanelEditor/utils.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/dashboard/components/PanelEditor/state/actions.ts");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/dashboard/components/PanelEditor/state/reducers.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/dashboard/components/PanelEditor/state/selectors.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../state/selectors */ "./public/app/features/dashboard/state/selectors.ts");
/* harmony import */ var _OptionsPaneContent__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./OptionsPaneContent */ "./public/app/features/dashboard/components/PanelEditor/OptionsPaneContent.tsx");
/* harmony import */ var app_features_profile_state_reducers__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! app/features/profile/state/reducers */ "./public/app/features/profile/state/reducers.ts");
/* harmony import */ var app_features_dashboard_components_DashNav_DashNavButton__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! app/features/dashboard/components/DashNav/DashNavButton */ "./public/app/features/dashboard/components/DashNav/DashNavButton.tsx");
/* harmony import */ var app_features_variables_state_selectors__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! app/features/variables/state/selectors */ "./public/app/features/variables/state/selectors.ts");
/* harmony import */ var app_features_dashboard_components_SubMenu_SubMenuItems__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! app/features/dashboard/components/SubMenu/SubMenuItems */ "./public/app/features/dashboard/components/SubMenu/SubMenuItems.tsx");
/* harmony import */ var app_core_components_BackButton_BackButton__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! app/core/components/BackButton/BackButton */ "./public/app/core/components/BackButton/BackButton.tsx");
/* harmony import */ var app_core_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! app/core/core */ "./public/app/core/core.ts");
/* harmony import */ var _SaveDashboard_SaveDashboardModalProxy__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../SaveDashboard/SaveDashboardModalProxy */ "./public/app/features/dashboard/components/SaveDashboard/SaveDashboardModalProxy.tsx");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject15() {
  var data = _taggedTemplateLiteral(["\n      font-size: ", ";\n      padding-left: ", ";\n    "]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    "]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n      padding-left: ", ";\n    "]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      padding: ", " 0 ", " ", ";\n      justify-content: space-between;\n      flex-wrap: wrap;\n    "]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      padding: ", ";\n      background: ", ";\n      justify-content: space-between;\n      border-bottom: 1px solid ", ";\n    "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n      height: 100%;\n      width: 100%;\n    "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n        height: ", ";\n        cursor: row-resize;\n        position: relative;\n        top: 0px;\n        z-index: 1;\n        border-top-width: 1px;\n        margin-left: ", ";\n      "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n        cursor: col-resize;\n        width: ", ";\n        border-right-width: 1px;\n        margin-top: 18px;\n      "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n      flex: 1 1 0;\n      min-height: 0;\n      width: 100%;\n      padding-left: ", ";\n    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n      label: variablesWrapper;\n      display: flex;\n      flex-grow: 1;\n      flex-wrap: wrap;\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n      padding-bottom: ", ";\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      flex-direction: column;\n      height: 100%;\n      width: 100%;\n      padding-right: ", ";\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      flex-direction: column;\n      height: 100%;\n      width: 100%;\n      position: relative;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      width: 100%;\n      height: 100%;\n      position: fixed;\n      z-index: ", ";\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      background: ", ";\n      display: flex;\n      flex-direction: column;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    font-style: italic;\n    background: transparent;\n    border-top: 0;\n    border-right: 0;\n    border-bottom: 0;\n    border-left: 0;\n    border-color: transparent;\n    border-style: solid;\n    transition: 0.2s border-color ease-in-out;\n\n    &:hover {\n      border-color: ", ";\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




























var PanelEditorUnconnected =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(PanelEditorUnconnected, _PureComponent);

  function PanelEditorUnconnected() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PanelEditorUnconnected);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PanelEditorUnconnected)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onPanelExit = function () {
      _this.props.updateLocation({
        query: {
          editPanel: null,
          tab: null
        },
        partial: true
      });
    };

    _this.onDiscard = function () {
      _this.props.setDiscardChanges(true);

      _this.props.updateLocation({
        query: {
          editPanel: null,
          tab: null
        },
        partial: true
      });
    };

    _this.onOpenDashboardSettings = function () {
      _this.props.updateLocation({
        query: {
          editview: 'settings'
        },
        partial: true
      });
    };

    _this.onSaveDashboard = function () {
      app_core_core__WEBPACK_IMPORTED_MODULE_24__["appEvents"].emit(app_types__WEBPACK_IMPORTED_MODULE_12__["CoreEvents"].showModalReact, {
        component: _SaveDashboard_SaveDashboardModalProxy__WEBPACK_IMPORTED_MODULE_25__["SaveDashboardModalProxy"],
        props: {
          dashboard: _this.props.dashboard
        }
      });
    };

    _this.onChangeTab = function (tab) {
      _this.props.updateLocation({
        query: {
          tab: tab.id
        },
        partial: true
      });
    };

    _this.onFieldConfigChange = function (config) {
      var panel = _this.props.panel;
      panel.updateFieldConfig(_objectSpread({}, config));

      _this.forceUpdate();
    };

    _this.onPanelOptionsChanged = function (options) {
      _this.props.panel.updateOptions(options);

      _this.forceUpdate();
    };

    _this.onPanelConfigChanged = function (configKey, value) {
      // @ts-ignore
      _this.props.panel[configKey] = value;

      _this.props.panel.render();

      _this.forceUpdate();
    };

    _this.onDragFinished = function (pane, size) {
      document.body.style.cursor = 'auto'; // When the drag handle is just clicked size is undefined

      if (!size) {
        return;
      }

      var targetPane = pane === Pane.Top ? 'topPaneSize' : 'rightPaneSize';
      var updatePanelEditorUIState = _this.props.updatePanelEditorUIState;
      updatePanelEditorUIState(_defineProperty({}, targetPane, size));
    };

    _this.onDragStarted = function () {
      document.body.style.cursor = 'row-resize';
    };

    _this.onDiplayModeChange = function (mode) {
      var updatePanelEditorUIState = _this.props.updatePanelEditorUIState;
      updatePanelEditorUIState({
        mode: mode
      });
    };

    _this.onTogglePanelOptions = function () {
      var _this$props = _this.props,
          uiState = _this$props.uiState,
          updatePanelEditorUIState = _this$props.updatePanelEditorUIState;
      updatePanelEditorUIState({
        isPanelOptionsVisible: !uiState.isPanelOptionsVisible
      });
    };

    _this.renderPanel = function (styles) {
      var _this$props2 = _this.props,
          dashboard = _this$props2.dashboard,
          panel = _this$props2.panel,
          tabs = _this$props2.tabs,
          uiState = _this$props2.uiState;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])(styles.mainPaneWrapper, tabs.length === 0 && styles.mainPaneWrapperNoTabs)
      }, _this.renderPanelToolbar(styles), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.panelWrapper
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_4__["default"], null, function (_ref) {
        var width = _ref.width,
            height = _ref.height;

        if (width < 3 || height < 3) {
          return null;
        }

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: styles.centeringContainer,
          style: {
            width: width,
            height: height
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          style: Object(_utils__WEBPACK_IMPORTED_MODULE_13__["calculatePanelSize"])(uiState.mode, width, height, panel)
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dashgrid_DashboardPanel__WEBPACK_IMPORTED_MODULE_5__["DashboardPanel"], {
          dashboard: dashboard,
          panel: panel,
          isEditing: true,
          isViewing: false,
          isInView: true
        })));
      })));
    };

    return _this;
  }

  _createClass(PanelEditorUnconnected, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.initPanelEditor(this.props.sourcePanel, this.props.dashboard);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.panelEditorCleanUp();
    }
  }, {
    key: "renderHorizontalSplit",
    value: function renderHorizontalSplit(styles) {
      var _this2 = this;

      var _this$props3 = this.props,
          dashboard = _this$props3.dashboard,
          panel = _this$props3.panel,
          tabs = _this$props3.tabs,
          uiState = _this$props3.uiState;
      return tabs.length > 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_split_pane__WEBPACK_IMPORTED_MODULE_6__["default"], {
        split: "horizontal",
        minSize: 200,
        primary: "first"
        /* Use persisted state for default size */
        ,
        defaultSize: uiState.topPaneSize,
        pane2Style: {
          minHeight: 0
        },
        resizerClassName: styles.resizerH,
        onDragStarted: this.onDragStarted,
        onDragFinished: function onDragFinished(size) {
          return _this2.onDragFinished(Pane.Top, size);
        }
      }, this.renderPanel(styles), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.tabsWrapper,
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_26__["selectors"].components.PanelEditor.DataPane.content
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PanelEditorTabs__WEBPACK_IMPORTED_MODULE_10__["PanelEditorTabs"], {
        panel: panel,
        dashboard: dashboard,
        tabs: tabs,
        onChangeTab: this.onChangeTab
      }))) : this.renderPanel(styles);
    }
  }, {
    key: "renderTemplateVariables",
    value: function renderTemplateVariables(styles) {
      var variables = this.props.variables;

      if (!variables.length) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.variablesWrapper
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_features_dashboard_components_SubMenu_SubMenuItems__WEBPACK_IMPORTED_MODULE_22__["SubMenuItems"], {
        variables: variables
      }));
    }
  }, {
    key: "renderPanelToolbar",
    value: function renderPanelToolbar(styles) {
      var _this$props4 = this.props,
          dashboard = _this$props4.dashboard,
          location = _this$props4.location,
          uiState = _this$props4.uiState,
          variables = _this$props4.variables,
          updateTimeZoneForSession = _this$props4.updateTimeZoneForSession;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.panelToolbar
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["HorizontalGroup"], {
        justify: variables.length > 0 ? 'space-between' : 'flex-end',
        align: "flex-start"
      }, this.renderTemplateVariables(styles), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["HorizontalGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["RadioButtonGroup"], {
        value: uiState.mode,
        options: _types__WEBPACK_IMPORTED_MODULE_9__["displayModes"],
        onChange: this.onDiplayModeChange
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DashNav_DashNavTimeControls__WEBPACK_IMPORTED_MODULE_11__["DashNavTimeControls"], {
        dashboard: dashboard,
        location: location,
        onChangeTimeZone: updateTimeZoneForSession
      }), !uiState.isPanelOptionsVisible && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_features_dashboard_components_DashNav_DashNavButton__WEBPACK_IMPORTED_MODULE_20__["DashNavButton"], {
        onClick: this.onTogglePanelOptions,
        tooltip: "\u6253\u5F00\u9009\u9879\u7A97\u683C",
        classSuffix: "close-options"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
        name: "angle-left"
      }), " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          paddingLeft: '6px'
        }
      }, "\u663E\u793A\u9009\u9879")))));
    }
  }, {
    key: "editorToolbar",
    value: function editorToolbar(styles) {
      var dashboard = this.props.dashboard;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.editorToolbar
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["HorizontalGroup"], {
        justify: "space-between",
        align: "center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.toolbarLeft
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["HorizontalGroup"], {
        spacing: "none"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_BackButton_BackButton__WEBPACK_IMPORTED_MODULE_23__["BackButton"], {
        onClick: this.onPanelExit,
        surface: "panel"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: styles.editorTitle
      }, dashboard.title, " / \u7F16\u8F91\u4EEA\u8868\u677F"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["HorizontalGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["HorizontalGroup"], {
        spacing: "sm",
        align: "center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        icon: "cog",
        onClick: this.onOpenDashboardSettings,
        variant: "secondary",
        title: "\u6253\u5F00\u4EEA\u8868\u76D8\u8BBE\u7F6E"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        onClick: this.onDiscard,
        variant: "secondary",
        title: "\u64A4\u6D88\u6240\u6709\u66F4\u6539"
      }, "\u653E\u5F03"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        onClick: this.onSaveDashboard,
        variant: "secondary",
        title: "\u5E94\u7528\u66F4\u6539\u5E76\u4FDD\u5B58\u4EEA\u8868\u677F"
      }, "\u4FDD\u5B58"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        onClick: this.onPanelExit,
        title: "\u5E94\u7528\u66F4\u6539\u5E76\u8FD4\u56DE\u5230\u4EEA\u8868\u677F"
      }, "\u5E94\u7528")))));
    }
  }, {
    key: "renderOptionsPane",
    value: function renderOptionsPane() {
      var _this$props5 = this.props,
          plugin = _this$props5.plugin,
          dashboard = _this$props5.dashboard,
          panel = _this$props5.panel,
          uiState = _this$props5.uiState;

      if (!plugin) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null);
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OptionsPaneContent__WEBPACK_IMPORTED_MODULE_18__["OptionsPaneContent"], {
        plugin: plugin,
        dashboard: dashboard,
        panel: panel,
        width: uiState.rightPaneSize,
        onClose: this.onTogglePanelOptions,
        onFieldConfigsChange: this.onFieldConfigChange,
        onPanelOptionsChanged: this.onPanelOptionsChanged,
        onPanelConfigChange: this.onPanelConfigChanged
      });
    }
  }, {
    key: "renderWithOptionsPane",
    value: function renderWithOptionsPane(styles) {
      var _this3 = this;

      var uiState = this.props.uiState;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_split_pane__WEBPACK_IMPORTED_MODULE_6__["default"], {
        split: "vertical",
        minSize: 300,
        primary: "second"
        /* Use persisted state for default size */
        ,
        defaultSize: uiState.rightPaneSize,
        resizerClassName: styles.resizerV,
        onDragStarted: function onDragStarted() {
          return document.body.style.cursor = 'col-resize';
        },
        onDragFinished: function onDragFinished(size) {
          return _this3.onDragFinished(Pane.Right, size);
        }
      }, this.renderHorizontalSplit(styles), this.renderOptionsPane());
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          initDone = _this$props6.initDone,
          uiState = _this$props6.uiState;
      var styles = getStyles(app_core_config__WEBPACK_IMPORTED_MODULE_3__["default"].theme, this.props);

      if (!initDone) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.wrapper,
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_26__["selectors"].components.PanelEditor.General.content
      }, this.editorToolbar(styles), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.verticalSplitPanesWrapper
      }, uiState.isPanelOptionsVisible ? this.renderWithOptionsPane(styles) : this.renderHorizontalSplit(styles)));
    }
  }]);

  return PanelEditorUnconnected;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state, props) {
  var panel = state.panelEditor.getPanel();

  var _getPanelStateById = Object(_state_selectors__WEBPACK_IMPORTED_MODULE_17__["getPanelStateById"])(state.dashboard, panel.id),
      plugin = _getPanelStateById.plugin;

  return {
    location: state.location,
    plugin: plugin,
    panel: panel,
    initDone: state.panelEditor.initDone,
    tabs: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_16__["getPanelEditorTabs"])(state.location, plugin),
    uiState: state.panelEditor.ui,
    variables: Object(app_features_variables_state_selectors__WEBPACK_IMPORTED_MODULE_21__["getVariables"])(state)
  };
};

var mapDispatchToProps = {
  updateLocation: _core_reducers_location__WEBPACK_IMPORTED_MODULE_8__["updateLocation"],
  initPanelEditor: _state_actions__WEBPACK_IMPORTED_MODULE_14__["initPanelEditor"],
  panelEditorCleanUp: _state_actions__WEBPACK_IMPORTED_MODULE_14__["panelEditorCleanUp"],
  setDiscardChanges: _state_reducers__WEBPACK_IMPORTED_MODULE_15__["setDiscardChanges"],
  updatePanelEditorUIState: _state_actions__WEBPACK_IMPORTED_MODULE_14__["updatePanelEditorUIState"],
  updateTimeZoneForSession: app_features_profile_state_reducers__WEBPACK_IMPORTED_MODULE_19__["updateTimeZoneForSession"]
};
var PanelEditor = Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStateToProps, mapDispatchToProps)(PanelEditorUnconnected);
var Pane;
/*
 * Styles
 */

(function (Pane) {
  Pane[Pane["Right"] = 0] = "Right";
  Pane[Pane["Top"] = 1] = "Top";
})(Pane || (Pane = {}));

var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["stylesFactory"])(function (theme, props) {
  var uiState = props.uiState;
  var handleColor = theme.palette.blue95;
  var paneSpacing = theme.spacing.md;
  var resizer = Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject(), handleColor);
  return {
    wrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject2(), theme.zIndex.sidemenu, theme.colors.dashboardBg),
    verticalSplitPanesWrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject3()),
    mainPaneWrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject4(), uiState.isPanelOptionsVisible ? 0 : paneSpacing),
    mainPaneWrapperNoTabs: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject5(), paneSpacing),
    variablesWrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject6()),
    panelWrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject7(), paneSpacing),
    resizerV: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])(resizer, Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject8(), paneSpacing)),
    resizerH: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])(resizer, Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject9(), paneSpacing, paneSpacing)),
    tabsWrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject10()),
    editorToolbar: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject11(), theme.spacing.sm, theme.colors.panelBg, theme.colors.panelBorder),
    panelToolbar: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject12(), paneSpacing, paneSpacing, paneSpacing),
    toolbarLeft: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject13(), theme.spacing.sm),
    centeringContainer: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject14()),
    editorTitle: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject15(), theme.typography.size.lg, theme.spacing.md)
  };
});

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/PanelEditorTabs.tsx":
/*!**********************************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/PanelEditorTabs.tsx ***!
  \**********************************************************************************/
/*! exports provided: PanelEditorTabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelEditorTabs", function() { return PanelEditorTabs; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "./public/app/features/dashboard/components/PanelEditor/types.ts");
/* harmony import */ var _panel_editor_QueriesTab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../panel_editor/QueriesTab */ "./public/app/features/dashboard/panel_editor/QueriesTab.tsx");
/* harmony import */ var app_features_alerting_AlertTab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/features/alerting/AlertTab */ "./public/app/features/alerting/AlertTab.tsx");
/* harmony import */ var _TransformationsEditor_TransformationsEditor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../TransformationsEditor/TransformationsEditor */ "./public/app/features/dashboard/components/TransformationsEditor/TransformationsEditor.tsx");
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      padding: 0;\n      display: flex;\n      flex-direction: column;\n      flex-grow: 1;\n      min-height: 0;\n      background: ", ";\n      border-right: 1px solid ", ";\n\n      .toolbar {\n        background: transparent;\n      }\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      padding-left: ", ";\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      flex-direction: column;\n      height: 100%;\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









var PanelEditorTabs = function PanelEditorTabs(_ref) {
  var panel = _ref.panel,
      dashboard = _ref.dashboard,
      tabs = _ref.tabs,
      _onChangeTab = _ref.onChangeTab;
  var styles = getPanelEditorTabsStyles();
  var activeTab = tabs.find(function (item) {
    return item.active;
  });
  var getCounter = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (tab) {
    var _panel$getTransformat;

    switch (tab.id) {
      case _types__WEBPACK_IMPORTED_MODULE_4__["PanelEditorTabId"].Query:
        return panel.targets.length;

      case _types__WEBPACK_IMPORTED_MODULE_4__["PanelEditorTabId"].Alert:
        return panel.alert ? 1 : 0;

      case _types__WEBPACK_IMPORTED_MODULE_4__["PanelEditorTabId"].Transform:
        var transformations = (_panel$getTransformat = panel.getTransformations()) !== null && _panel$getTransformat !== void 0 ? _panel$getTransformat : [];
        return transformations.length;
    }

    return null;
  }, [panel]);

  if (tabs.length === 0) {
    return null;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.wrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["TabsBar"], {
    className: styles.tabBar
  }, tabs.map(function (tab) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Tab"], {
      key: tab.id,
      label: tab.text,
      active: tab.active,
      onChangeTab: function onChangeTab() {
        return _onChangeTab(tab);
      },
      icon: tab.icon,
      counter: getCounter(tab)
    });
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["TabContent"], {
    className: styles.tabContent
  }, activeTab.id === _types__WEBPACK_IMPORTED_MODULE_4__["PanelEditorTabId"].Query && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_panel_editor_QueriesTab__WEBPACK_IMPORTED_MODULE_5__["QueriesTab"], {
    panel: panel,
    dashboard: dashboard
  }), activeTab.id === _types__WEBPACK_IMPORTED_MODULE_4__["PanelEditorTabId"].Alert && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_features_alerting_AlertTab__WEBPACK_IMPORTED_MODULE_6__["AlertTab"], {
    panel: panel,
    dashboard: dashboard
  }), activeTab.id === _types__WEBPACK_IMPORTED_MODULE_4__["PanelEditorTabId"].Transform && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TransformationsEditor_TransformationsEditor__WEBPACK_IMPORTED_MODULE_7__["TransformationsEditor"], {
    panel: panel
  })));
};
var getPanelEditorTabsStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["stylesFactory"])(function () {
  var theme = app_core_config__WEBPACK_IMPORTED_MODULE_1__["config"].theme;
  return {
    wrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject()),
    tabBar: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject2(), theme.spacing.md),
    tabContent: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject3(), theme.colors.panelBg, theme.colors.pageHeaderBorder)
  };
});

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/PanelNotSupported.tsx":
/*!************************************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/PanelNotSupported.tsx ***!
  \************************************************************************************/
/*! exports provided: PanelNotSupported */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelNotSupported", function() { return PanelNotSupported; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_ui_src_components_Layout_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui/src/components/Layout/Layout */ "./packages/grafana-ui/src/components/Layout/Layout.tsx");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "./public/app/features/dashboard/components/PanelEditor/types.ts");
/* harmony import */ var _core_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../core/actions */ "./public/app/core/actions/index.ts");






var PanelNotSupported = function PanelNotSupported(_ref) {
  var message = _ref.message,
      propsDispatch = _ref.dispatch;
  var dispatch = propsDispatch ? propsDispatch : Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
  var onBackToQueries = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    dispatch(Object(_core_actions__WEBPACK_IMPORTED_MODULE_5__["updateLocation"])({
      query: {
        tab: _types__WEBPACK_IMPORTED_MODULE_4__["PanelEditorTabId"].Query
      },
      partial: true
    }));
  }, [dispatch]);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui_src_components_Layout_Layout__WEBPACK_IMPORTED_MODULE_3__["Layout"], {
    justify: "center",
    style: {
      marginTop: '100px'
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["VerticalGroup"], {
    spacing: "md"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, message), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    size: "md",
    variant: "secondary",
    icon: "arrow-left",
    onClick: onBackToQueries
  }, "\u8FD4\u56DE\u67E5\u8BE2"))));
};

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/PanelOptionsEditor.tsx":
/*!*************************************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/PanelOptionsEditor.tsx ***!
  \*************************************************************************************/
/*! exports provided: PanelOptionsEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelOptionsEditor", function() { return PanelOptionsEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var lodash_groupBy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/groupBy */ "./node_modules/lodash/groupBy.js");
/* harmony import */ var lodash_groupBy__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_groupBy__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _OptionsGroup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OptionsGroup */ "./public/app/features/dashboard/components/PanelEditor/OptionsGroup.tsx");
/* harmony import */ var app_features_panel_panellinks_link_srv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/features/panel/panellinks/link_srv */ "./public/app/features/panel/panellinks/link_srv.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var PanelOptionsEditor = function PanelOptionsEditor(_ref) {
  var plugin = _ref.plugin,
      options = _ref.options,
      onChange = _ref.onChange,
      data = _ref.data,
      replaceVariables = _ref.replaceVariables;
  var optionEditors = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return lodash_groupBy__WEBPACK_IMPORTED_MODULE_3___default()(plugin.optionEditors.list(), function (i) {
      return i.category ? i.category[0] : '显示';
    });
  }, [plugin]);

  var onOptionChange = function onOptionChange(key, value) {
    var newOptions = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["set"])(_objectSpread({}, options), key, value);
    onChange(newOptions);
  };

  var context = {
    data: data || [],
    replaceVariables: replaceVariables,
    options: options,
    getSuggestions: function getSuggestions(scope) {
      return Object(app_features_panel_panellinks_link_srv__WEBPACK_IMPORTED_MODULE_5__["getPanelOptionsVariableSuggestions"])(plugin, data);
    }
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, Object.keys(optionEditors).map(function (c, i) {
    var optionsToShow = optionEditors[c].map(function (e, j) {
      var _e$category;

      if (e.showIf && !e.showIf(options)) {
        return null;
      }

      var label = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Label"], {
        description: e.description,
        category: (_e$category = e.category) === null || _e$category === void 0 ? void 0 : _e$category.slice(1)
      }, e.name);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Field"], {
        label: label,
        key: "".concat(e.id, "/").concat(j)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(e.editor, {
        value: Object(lodash__WEBPACK_IMPORTED_MODULE_1__["get"])(options, e.path),
        onChange: function onChange(value) {
          return onOptionChange(e.path, value);
        },
        item: e,
        context: context
      }));
    }).filter(function (e) {
      return e !== null;
    });
    return optionsToShow.length > 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OptionsGroup__WEBPACK_IMPORTED_MODULE_4__["OptionsGroup"], {
      title: c,
      defaultToClosed: true,
      id: "".concat(c, "/").concat(i),
      key: "".concat(c, "/").concat(i)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, optionsToShow)) : null;
  }));
};

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/PanelOptionsTab.tsx":
/*!**********************************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/PanelOptionsTab.tsx ***!
  \**********************************************************************************/
/*! exports provided: PanelOptionsTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelOptionsTab", function() { return PanelOptionsTab; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _panel_panellinks_link_srv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../panel/panellinks/link_srv */ "./public/app/features/panel/panellinks/link_srv.ts");
/* harmony import */ var _PanelOptionsEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PanelOptionsEditor */ "./public/app/features/dashboard/components/PanelEditor/PanelOptionsEditor.tsx");
/* harmony import */ var _AngularPanelOptions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AngularPanelOptions */ "./public/app/features/dashboard/components/PanelEditor/AngularPanelOptions.tsx");
/* harmony import */ var _VisualizationTab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VisualizationTab */ "./public/app/features/dashboard/components/PanelEditor/VisualizationTab.tsx");
/* harmony import */ var _OptionsGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./OptionsGroup */ "./public/app/features/dashboard/components/PanelEditor/OptionsGroup.tsx");
/* harmony import */ var _RepeatRowSelect_RepeatRowSelect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../RepeatRowSelect/RepeatRowSelect */ "./public/app/features/dashboard/components/RepeatRowSelect/RepeatRowSelect.tsx");








var PanelOptionsTab = function PanelOptionsTab(_ref) {
  var panel = _ref.panel,
      plugin = _ref.plugin,
      data = _ref.data,
      dashboard = _ref.dashboard,
      onPanelConfigChange = _ref.onPanelConfigChange,
      onPanelOptionsChanged = _ref.onPanelOptionsChanged;
  var visTabInputRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  var linkVariablesSuggestions = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return Object(_panel_panellinks_link_srv__WEBPACK_IMPORTED_MODULE_2__["getPanelLinksVariableSuggestions"])();
  }, []);
  var onRepeatRowSelectChange = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (value) {
    return onPanelConfigChange('repeat', value);
  }, [onPanelConfigChange]);
  var elements = [];
  var panelLinksCount = panel && panel.links ? panel.links.length : 0;
  var directionOptions = [{
    label: 'Horizontal',
    value: 'h'
  }, {
    label: 'Vertical',
    value: 'v'
  }];
  var maxPerRowOptions = [2, 3, 4, 6, 8, 12].map(function (value) {
    return {
      label: value.toString(),
      value: value
    };
  });

  var focusVisPickerInput = function focusVisPickerInput(isExpanded) {
    if (isExpanded && visTabInputRef.current) {
      visTabInputRef.current.focus();
    }
  }; // Fist common panel settings Title, description


  elements.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OptionsGroup__WEBPACK_IMPORTED_MODULE_6__["OptionsGroup"], {
    title: "\u8BBE\u7F6E",
    id: "Panel settings",
    key: "Panel settings"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
    label: "\u9762\u677F\u6807\u9898"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
    defaultValue: panel.title,
    onBlur: function onBlur(e) {
      return onPanelConfigChange('title', e.currentTarget.value);
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
    label: "\u63CF\u8FF0",
    description: "\u9762\u677F\u63CF\u8FF0\u652F\u6301markdown\u548C\u94FE\u63A5\u3002"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["TextArea"], {
    defaultValue: panel.description,
    onBlur: function onBlur(e) {
      return onPanelConfigChange('description', e.currentTarget.value);
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
    label: "\u900F\u660E",
    description: "\u663E\u793A\u9762\u677F\u65E0\u80CC\u666F\u3002"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Switch"], {
    value: panel.transparent,
    onChange: function onChange(e) {
      return onPanelConfigChange('transparent', e.currentTarget.checked);
    }
  }))));
  elements.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OptionsGroup__WEBPACK_IMPORTED_MODULE_6__["OptionsGroup"], {
    title: "\u53EF\u89C6\u5316",
    id: "Panel type",
    key: "Panel type",
    defaultToClosed: true,
    onToggle: focusVisPickerInput
  }, function (toggleExpand) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VisualizationTab__WEBPACK_IMPORTED_MODULE_5__["VisualizationTab"], {
      panel: panel,
      ref: visTabInputRef,
      onToggleOptionGroup: toggleExpand
    });
  })); // Old legacy react editor

  if (plugin.editor && panel && !plugin.optionEditors) {
    elements.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OptionsGroup__WEBPACK_IMPORTED_MODULE_6__["OptionsGroup"], {
      title: "\u9009\u9879",
      id: "legacy react editor",
      key: "legacy react editor"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(plugin.editor, {
      data: data,
      options: panel.getOptions(),
      onOptionsChange: onPanelOptionsChanged
    })));
  }

  if (plugin.optionEditors && panel) {
    elements.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PanelOptionsEditor__WEBPACK_IMPORTED_MODULE_3__["PanelOptionsEditor"], {
      key: "panel options",
      options: panel.getOptions(),
      onChange: onPanelOptionsChanged,
      replaceVariables: panel.replaceVariables,
      plugin: plugin,
      data: data === null || data === void 0 ? void 0 : data.series
    }));
  }

  if (plugin.angularPanelCtrl) {
    elements.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AngularPanelOptions__WEBPACK_IMPORTED_MODULE_4__["AngularPanelOptions"], {
      panel: panel,
      dashboard: dashboard,
      plugin: plugin,
      key: "angular panel options"
    }));
  }

  elements.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OptionsGroup__WEBPACK_IMPORTED_MODULE_6__["OptionsGroup"], {
    renderTitle: function renderTitle(isExpanded) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "\u94FE\u63A5 ", !isExpanded && panelLinksCount > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Counter"], {
        value: panelLinksCount
      }));
    },
    id: "panel links",
    key: "panel links",
    defaultToClosed: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["DataLinksInlineEditor"], {
    links: panel.links,
    onChange: function onChange(links) {
      return onPanelConfigChange('链接', links);
    },
    suggestions: linkVariablesSuggestions,
    data: []
  })));
  elements.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OptionsGroup__WEBPACK_IMPORTED_MODULE_6__["OptionsGroup"], {
    title: "\u91CD\u590D\u9009\u9879",
    id: "panel repeats",
    key: "panel repeats",
    defaultToClosed: true
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
    label: "\u6309\u53D8\u91CF\u91CD\u590D",
    description: "\u5BF9\u6240\u9009\u53D8\u91CF\u4E2D\u7684\u6BCF\u4E2A\u503C\u91CD\u590D\u6B64\u9762\u677F\u3002\u5728\u7F16\u8F91\u6A21\u5F0F\u4E0B\u4E0D\u53EF\u89C1\u3002 \u60A8\u9700\u8981\u8FD4\u56DE\u5230\u4EEA\u8868\u677F\uFF0C\u7136\u540E\u66F4\u65B0\u53D8\u91CF\u6216\u91CD\u65B0\u52A0\u8F7D\u4EEA\u8868\u677F\u3002"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RepeatRowSelect_RepeatRowSelect__WEBPACK_IMPORTED_MODULE_7__["RepeatRowSelect"], {
    repeat: panel.repeat,
    onChange: onRepeatRowSelectChange
  })), panel.repeat && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
    label: "\u91CD\u590D\u65B9\u5411"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["RadioButtonGroup"], {
    options: directionOptions,
    value: panel.repeatDirection || 'h',
    onChange: function onChange(value) {
      return onPanelConfigChange('repeatDirection', value);
    }
  })), panel.repeat && panel.repeatDirection === 'h' && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
    label: "\u6BCF\u884C\u6700\u5927"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Select"], {
    options: maxPerRowOptions,
    value: panel.maxPerRow,
    onChange: function onChange(value) {
      return onPanelConfigChange('maxPerRow', value.value);
    }
  }))));
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, elements);
};

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/VisualizationTab.tsx":
/*!***********************************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/VisualizationTab.tsx ***!
  \***********************************************************************************/
/*! exports provided: VisualizationTabUnconnected, VisualizationTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualizationTabUnconnected", function() { return VisualizationTabUnconnected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualizationTab", function() { return VisualizationTab; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../state/actions */ "./public/app/features/dashboard/state/actions.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _panel_editor_VizTypePicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../panel_editor/VizTypePicker */ "./public/app/features/dashboard/panel_editor/VizTypePicker.tsx");
/* harmony import */ var _grafana_ui_src_components_Forms_Field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/ui/src/components/Forms/Field */ "./packages/grafana-ui/src/components/Forms/Field.tsx");
function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      color: ", ";\n      cursor: pointer;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      flex-direction: column;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      color: ", ";\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var VisualizationTabUnconnected = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function (_ref, ref) {
  var panel = _ref.panel,
      plugin = _ref.plugin,
      changePanelPlugin = _ref.changePanelPlugin,
      onToggleOptionGroup = _ref.onToggleOptionGroup;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState2 = _slicedToArray(_useState, 2),
      searchQuery = _useState2[0],
      setSearchQuery = _useState2[1];

  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["useTheme"])();
  var styles = getStyles(theme);

  if (!plugin) {
    return null;
  }

  var onPluginTypeChange = function onPluginTypeChange(meta) {
    if (meta.id === plugin.meta.id) {
      onToggleOptionGroup(false);
    } else {
      changePanelPlugin(panel, meta.id);
    }
  };

  var onKeyPress = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (e) {
    if (e.key === 'Enter') {
      var query = e.currentTarget.value;
      var plugins = Object(_panel_editor_VizTypePicker__WEBPACK_IMPORTED_MODULE_5__["getAllPanelPluginMeta"])();
      var match = Object(_panel_editor_VizTypePicker__WEBPACK_IMPORTED_MODULE_5__["filterPluginList"])(plugins, query, plugin.meta);

      if (match && match.length) {
        onPluginTypeChange(match[0]);
      }
    }
  }, [onPluginTypeChange]);
  var suffix = searchQuery !== '' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: styles.searchClear,
    onClick: function onClick() {
      return setSearchQuery('');
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
    name: "times"
  }), "Clear filter") : null;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.wrapper
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui_src_components_Forms_Field__WEBPACK_IMPORTED_MODULE_6__["Field"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], {
    value: searchQuery,
    onChange: function onChange(e) {
      return setSearchQuery(e.currentTarget.value);
    },
    onKeyPress: onKeyPress,
    prefix: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
      name: "filter",
      className: styles.icon
    }),
    suffix: suffix,
    placeholder: "\u8FC7\u6EE4\u5668\u53EF\u89C6\u5316",
    ref: ref
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_panel_editor_VizTypePicker__WEBPACK_IMPORTED_MODULE_5__["VizTypePicker"], {
    current: plugin.meta,
    onTypeChange: onPluginTypeChange,
    searchQuery: searchQuery,
    onClose: function onClose() {}
  }));
});
var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function (theme) {
  return {
    icon: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject(), theme.palette.gray33),
    wrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2()),
    searchClear: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3(), theme.palette.gray60)
  };
});

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    plugin: state.plugins.panels[props.panel.type]
  };
};

var mapDispatchToProps = {
  changePanelPlugin: _state_actions__WEBPACK_IMPORTED_MODULE_3__["changePanelPlugin"]
};
var VisualizationTab = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps, undefined, {
  forwardRef: true
})(VisualizationTabUnconnected);

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/state/actions.ts":
/*!*******************************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/state/actions.ts ***!
  \*******************************************************************************/
/*! exports provided: initPanelEditor, panelEditorCleanUp, updatePanelEditorUIState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPanelEditor", function() { return initPanelEditor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "panelEditorCleanUp", function() { return panelEditorCleanUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePanelEditorUIState", function() { return updatePanelEditorUIState; });
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reducers */ "./public/app/features/dashboard/components/PanelEditor/state/reducers.ts");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../state/reducers */ "./public/app/features/dashboard/state/reducers.ts");
/* harmony import */ var _core_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../core/store */ "./public/app/core/store.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function initPanelEditor(sourcePanel, dashboard) {
  return function (dispatch) {
    var panel = dashboard.initEditPanel(sourcePanel);
    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_0__["updateEditorInitState"])({
      panel: panel,
      sourcePanel: sourcePanel
    }));
  };
}
function panelEditorCleanUp() {
  return function (dispatch, getStore) {
    var dashboard = getStore().dashboard.getModel();
    var _getStore$panelEditor = getStore().panelEditor,
        getPanel = _getStore$panelEditor.getPanel,
        getSourcePanel = _getStore$panelEditor.getSourcePanel,
        shouldDiscardChanges = _getStore$panelEditor.shouldDiscardChanges;

    if (!shouldDiscardChanges) {
      var panel = getPanel();
      var modifiedSaveModel = panel.getSaveModel();
      var sourcePanel = getSourcePanel();
      var panelTypeChanged = sourcePanel.type !== panel.type; // restore the source panel id before we update source panel

      modifiedSaveModel.id = sourcePanel.id;
      sourcePanel.restoreModel(modifiedSaveModel); // Loaded plugin is not included in the persisted properties
      // So is not handled by restoreModel

      sourcePanel.plugin = panel.plugin;

      if (panelTypeChanged) {
        dispatch(Object(_state_reducers__WEBPACK_IMPORTED_MODULE_1__["panelModelAndPluginReady"])({
          panelId: sourcePanel.id,
          plugin: panel.plugin
        }));
      } // Resend last query result on source panel query runner
      // But do this after the panel edit editor exit process has completed


      setTimeout(function () {
        sourcePanel.getQueryRunner().useLastResultFrom(panel.getQueryRunner());
      }, 20);
    }

    if (dashboard) {
      dashboard.exitPanelEditor();
    }

    dispatch(Object(_state_reducers__WEBPACK_IMPORTED_MODULE_1__["cleanUpEditPanel"])());
    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_0__["closeCompleted"])());
  };
}
function updatePanelEditorUIState(uiState) {
  return function (dispatch, getStore) {
    var nextState = _objectSpread({}, getStore().panelEditor.ui, {}, uiState);

    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_0__["setPanelEditorUIState"])(nextState));

    try {
      _core_store__WEBPACK_IMPORTED_MODULE_2__["default"].setObject(_reducers__WEBPACK_IMPORTED_MODULE_0__["PANEL_EDITOR_UI_STATE_STORAGE_KEY"], nextState);
    } catch (error) {
      console.error(error);
    }
  };
}

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/state/selectors.ts":
/*!*********************************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/state/selectors.ts ***!
  \*********************************************************************************/
/*! exports provided: getPanelEditorTabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPanelEditorTabs", function() { return getPanelEditorTabs; });
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./public/app/features/dashboard/components/PanelEditor/types.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");



var getPanelEditorTabs = Object(memoize_one__WEBPACK_IMPORTED_MODULE_0__["default"])(function (location, plugin) {
  var _tabs$find;

  var tabs = [];

  if (!plugin) {
    return tabs;
  }

  var defaultTab = _types__WEBPACK_IMPORTED_MODULE_1__["PanelEditorTabId"].Visualize;

  if (plugin.meta.skipDataQuery) {
    return [];
  }

  if (!plugin.meta.skipDataQuery) {
    defaultTab = _types__WEBPACK_IMPORTED_MODULE_1__["PanelEditorTabId"].Query;
    tabs.push({
      id: _types__WEBPACK_IMPORTED_MODULE_1__["PanelEditorTabId"].Query,
      text: '查询',
      icon: 'database',
      active: false
    });
    tabs.push({
      id: _types__WEBPACK_IMPORTED_MODULE_1__["PanelEditorTabId"].Transform,
      text: '转换',
      icon: 'process',
      active: false
    });
  }

  if (Object(app_core_config__WEBPACK_IMPORTED_MODULE_2__["getConfig"])().alertingEnabled && plugin.meta.id === 'graph') {
    tabs.push({
      id: _types__WEBPACK_IMPORTED_MODULE_1__["PanelEditorTabId"].Alert,
      text: '警报',
      icon: 'bell',
      active: false
    });
  }

  var activeTab = (_tabs$find = tabs.find(function (item) {
    return item.id === (location.query.tab || defaultTab);
  })) !== null && _tabs$find !== void 0 ? _tabs$find : tabs[0];
  activeTab.active = true;
  return tabs;
});

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/state/utils.ts":
/*!*****************************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/state/utils.ts ***!
  \*****************************************************************************/
/*! exports provided: saveSectionOpenState, getSectionOpenState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveSectionOpenState", function() { return saveSectionOpenState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSectionOpenState", function() { return getSectionOpenState; });
/* harmony import */ var app_core_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/store */ "./public/app/core/store.ts");

function saveSectionOpenState(id, isOpen) {
  app_core_store__WEBPACK_IMPORTED_MODULE_0__["default"].set("panel-edit-section-".concat(id), isOpen ? 'true' : 'false');
}
function getSectionOpenState(id, defaultValue) {
  return app_core_store__WEBPACK_IMPORTED_MODULE_0__["default"].getBool("panel-edit-section-".concat(id), defaultValue);
}

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/usePanelLatestData.ts":
/*!************************************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/usePanelLatestData.ts ***!
  \************************************************************************************/
/*! exports provided: usePanelLatestData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usePanelLatestData", function() { return usePanelLatestData; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




/**
 * Subscribes and returns latest panel data from PanelQueryRunner
 */
var usePanelLatestData = function usePanelLatestData(panel, options) {
  var querySubscription = Object(react__WEBPACK_IMPORTED_MODULE_1__["useRef"])();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(),
      _useState2 = _slicedToArray(_useState, 2),
      latestData = _useState2[0],
      setLatestData = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    querySubscription.current = panel.getQueryRunner().getData(options).subscribe({
      next: function next(data) {
        return setLatestData(data);
      }
    });
    return function () {
      if (querySubscription.current) {
        querySubscription.current.unsubscribe();
      }
    };
    /**
     * Adding separate options to dependencies array to avoid additional hook for comparing previous options with current.
     * Otherwise, passing different references to the same object may cause troubles.
     */
  }, [panel, options.withFieldConfig, options.withTransforms]);
  return {
    data: latestData,
    error: latestData && latestData.error,
    isLoading: latestData ? latestData.state === _grafana_data__WEBPACK_IMPORTED_MODULE_0__["LoadingState"].Loading : true,
    hasSeries: latestData ? !!latestData.series : false
  };
};

/***/ }),

/***/ "./public/app/features/dashboard/components/PanelEditor/utils.ts":
/*!***********************************************************************!*\
  !*** ./public/app/features/dashboard/components/PanelEditor/utils.ts ***!
  \***********************************************************************/
/*! exports provided: calculatePanelSize, supportsDataQuery, updateDefaultFieldConfigValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculatePanelSize", function() { return calculatePanelSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsDataQuery", function() { return supportsDataQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateDefaultFieldConfigValue", function() { return updateDefaultFieldConfigValue; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./public/app/features/dashboard/components/PanelEditor/types.ts");
/* harmony import */ var app_core_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/constants */ "./public/app/core/constants.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function calculatePanelSize(mode, width, height, panel) {
  if (mode === _types__WEBPACK_IMPORTED_MODULE_1__["DisplayMode"].Fill) {
    return {
      width: width,
      height: height
    };
  }

  var colWidth = (window.innerWidth - app_core_constants__WEBPACK_IMPORTED_MODULE_2__["GRID_CELL_VMARGIN"] * 4) / app_core_constants__WEBPACK_IMPORTED_MODULE_2__["GRID_COLUMN_COUNT"];
  var pWidth = colWidth * panel.gridPos.w;
  var pHeight = app_core_constants__WEBPACK_IMPORTED_MODULE_2__["GRID_CELL_HEIGHT"] * panel.gridPos.h;
  var scale = Math.min(width / pWidth, height / pHeight);

  if (mode === _types__WEBPACK_IMPORTED_MODULE_1__["DisplayMode"].Exact && pWidth <= width && pHeight <= height) {
    return {
      width: pWidth,
      height: pHeight
    };
  }

  return {
    width: pWidth * scale,
    height: pHeight * scale
  };
}
function supportsDataQuery(plugin) {
  return (plugin === null || plugin === void 0 ? void 0 : plugin.meta.skipDataQuery) === false;
}
var updateDefaultFieldConfigValue = function updateDefaultFieldConfigValue(config, name, value, isCustom) {
  var defaults = _objectSpread({}, config.defaults);

  var remove = value === undefined || value === null || '';

  if (isCustom) {
    if (defaults.custom) {
      if (remove) {
        defaults.custom = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["omit"])(defaults.custom, name);
      } else {
        defaults.custom = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["set"])(_objectSpread({}, defaults.custom), name, value);
      }
    } else if (!remove) {
      defaults.custom = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["set"])(_objectSpread({}, defaults.custom), name, value);
    }
  } else if (remove) {
    defaults = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["omit"])(defaults, name);
  } else {
    defaults = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["set"])(_objectSpread({}, defaults), name, value);
  }

  return _objectSpread({}, config, {
    defaults: defaults
  });
};

/***/ }),

/***/ "./public/app/features/dashboard/components/RepeatRowSelect/RepeatRowSelect.tsx":
/*!**************************************************************************************!*\
  !*** ./public/app/features/dashboard/components/RepeatRowSelect/RepeatRowSelect.tsx ***!
  \**************************************************************************************/
/*! exports provided: RepeatRowSelect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RepeatRowSelect", function() { return RepeatRowSelect; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _variables_state_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../variables/state/selectors */ "./public/app/features/variables/state/selectors.ts");




var RepeatRowSelect = function RepeatRowSelect(_ref) {
  var repeat = _ref.repeat,
      onChange = _ref.onChange;
  var variables = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(function (state) {
    return Object(_variables_state_selectors__WEBPACK_IMPORTED_MODULE_3__["getVariables"])(state);
  });
  var variableOptions = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    var options = variables.map(function (item) {
      return {
        label: item.name,
        value: item.name
      };
    });

    if (options.length === 0) {
      options.unshift({
        label: '找不到模板变量',
        value: null
      });
    }

    options.unshift({
      label: '禁用重复',
      value: null
    });
    return options;
  }, variables);
  var onSelectChange = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (option) {
    return onChange(option.value);
  }, [onChange]);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], {
    value: repeat,
    onChange: onSelectChange,
    options: variableOptions
  });
};

/***/ }),

/***/ "./public/app/features/dashboard/components/RowOptions/RowOptionsButton.tsx":
/*!**********************************************************************************!*\
  !*** ./public/app/features/dashboard/components/RowOptions/RowOptionsButton.tsx ***!
  \**********************************************************************************/
/*! exports provided: RowOptionsButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RowOptionsButton", function() { return RowOptionsButton; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _RowOptionsModal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RowOptionsModal */ "./public/app/features/dashboard/components/RowOptions/RowOptionsModal.tsx");



var RowOptionsButton = function RowOptionsButton(_ref) {
  var repeat = _ref.repeat,
      title = _ref.title,
      onUpdate = _ref.onUpdate;

  var onUpdateChange = function onUpdateChange(hideModal) {
    return function (title, repeat) {
      onUpdate(title, repeat);
      hideModal();
    };
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["ModalsController"], null, function (_ref2) {
    var showModal = _ref2.showModal,
        hideModal = _ref2.hideModal;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "pointer",
      onClick: function onClick() {
        showModal(_RowOptionsModal__WEBPACK_IMPORTED_MODULE_2__["RowOptionsModal"], {
          title: title,
          repeat: repeat,
          onDismiss: hideModal,
          onUpdate: onUpdateChange(hideModal)
        });
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      name: "cog"
    }));
  });
};
RowOptionsButton.displayName = 'RowOptionsButton';

/***/ }),

/***/ "./public/app/features/dashboard/components/RowOptions/RowOptionsForm.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/features/dashboard/components/RowOptions/RowOptionsForm.tsx ***!
  \********************************************************************************/
/*! exports provided: RowOptionsForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RowOptionsForm", function() { return RowOptionsForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _RepeatRowSelect_RepeatRowSelect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../RepeatRowSelect/RepeatRowSelect */ "./public/app/features/dashboard/components/RepeatRowSelect/RepeatRowSelect.tsx");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var RowOptionsForm = function RowOptionsForm(_ref) {
  var repeat = _ref.repeat,
      title = _ref.title,
      onUpdate = _ref.onUpdate,
      onCancel = _ref.onCancel;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(repeat),
      _useState2 = _slicedToArray(_useState, 2),
      newRepeat = _useState2[0],
      setNewRepeat = _useState2[1];

  var onChangeRepeat = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function (name) {
    return setNewRepeat(name);
  }, [setNewRepeat]);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Form"], {
    defaultValues: {
      title: title
    },
    onSubmit: function onSubmit(formData) {
      onUpdate(formData.title, newRepeat);
    }
  }, function (_ref2) {
    var register = _ref2.register;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      label: "\u6807\u9898"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], {
      name: "title",
      ref: register,
      type: "text"
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Field"], {
      label: "\u91CD\u590D"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RepeatRowSelect_RepeatRowSelect__WEBPACK_IMPORTED_MODULE_2__["RepeatRowSelect"], {
      repeat: newRepeat,
      onChange: onChangeRepeat
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["HorizontalGroup"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      type: "submit"
    }, "\u66F4\u65B0"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      variant: "secondary",
      onClick: onCancel
    }, "\u53D6\u6D88")));
  });
};

/***/ }),

/***/ "./public/app/features/dashboard/components/RowOptions/RowOptionsModal.tsx":
/*!*********************************************************************************!*\
  !*** ./public/app/features/dashboard/components/RowOptions/RowOptionsModal.tsx ***!
  \*********************************************************************************/
/*! exports provided: RowOptionsModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RowOptionsModal", function() { return RowOptionsModal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _RowOptionsForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RowOptionsForm */ "./public/app/features/dashboard/components/RowOptions/RowOptionsForm.tsx");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      label: RowOptionsModal;\n      width: 500px;\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var RowOptionsModal = function RowOptionsModal(_ref) {
  var repeat = _ref.repeat,
      title = _ref.title,
      onDismiss = _ref.onDismiss,
      onUpdate = _ref.onUpdate;
  var styles = getStyles();
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
    isOpen: true,
    title: "\u884C\u9009\u9879",
    icon: "copy",
    onDismiss: onDismiss,
    className: styles.modal
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RowOptionsForm__WEBPACK_IMPORTED_MODULE_3__["RowOptionsForm"], {
    repeat: repeat,
    title: title,
    onCancel: onDismiss,
    onUpdate: onUpdate
  }));
};
var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["stylesFactory"])(function () {
  return {
    modal: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(_templateObject())
  };
});

/***/ }),

/***/ "./public/app/features/dashboard/components/SubMenu/Annotations.tsx":
/*!**************************************************************************!*\
  !*** ./public/app/features/dashboard/components/SubMenu/Annotations.tsx ***!
  \**************************************************************************/
/*! exports provided: Annotations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Annotations", function() { return Annotations; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var Switch = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].Switch;
var Annotations = function Annotations(_ref) {
  var annotations = _ref.annotations,
      onAnnotationChanged = _ref.onAnnotationChanged;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      visibleAnnotations = _useState2[0],
      setVisibleAnnotations = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    setVisibleAnnotations(annotations.filter(function (annotation) {
      return annotation.hide !== true;
    }));
  }, [annotations]);

  if (visibleAnnotations.length === 0) {
    return null;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, visibleAnnotations.map(function (annotation) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: annotation.name,
      className: annotation.enable ? 'submenu-item' : 'submenu-item annotation-disabled'
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Switch, {
      label: annotation.name,
      className: "gf-form",
      checked: annotation.enable,
      onChange: function onChange() {
        return onAnnotationChanged(annotation);
      }
    }));
  }));
};

/***/ }),

/***/ "./public/app/features/dashboard/components/SubMenu/DashboardLinks.tsx":
/*!*****************************************************************************!*\
  !*** ./public/app/features/dashboard/components/SubMenu/DashboardLinks.tsx ***!
  \*****************************************************************************/
/*! exports provided: DashboardLinks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardLinks", function() { return DashboardLinks; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data_src_text_sanitize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data/src/text/sanitize */ "./packages/grafana-data/src/text/sanitize.ts");
/* harmony import */ var _DashboardLinksDashboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DashboardLinksDashboard */ "./public/app/features/dashboard/components/SubMenu/DashboardLinksDashboard.tsx");
/* harmony import */ var _panel_panellinks_link_srv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../panel/panellinks/link_srv */ "./public/app/features/panel/panellinks/link_srv.ts");
/* harmony import */ var _DashLinks_DashLinksEditorCtrl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DashLinks/DashLinksEditorCtrl */ "./public/app/features/dashboard/components/DashLinks/DashLinksEditorCtrl.ts");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/index.js");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var DashboardLinks = function DashboardLinks(_ref) {
  var dashboard = _ref.dashboard,
      links = _ref.links;

  if (!links.length) {
    return null;
  } // Emulate forceUpdate (https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate)


  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"])(function (x) {
    return x + 1;
  }, 0),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      forceUpdate = _useReducer2[1];

  Object(react_use__WEBPACK_IMPORTED_MODULE_6__["useEffectOnce"])(function () {
    dashboard.on(app_types__WEBPACK_IMPORTED_MODULE_7__["CoreEvents"].timeRangeUpdated, forceUpdate);
    return function () {
      dashboard.off(app_types__WEBPACK_IMPORTED_MODULE_7__["CoreEvents"].timeRangeUpdated, forceUpdate);
    };
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, links.map(function (link, index) {
    var linkInfo = Object(_panel_panellinks_link_srv__WEBPACK_IMPORTED_MODULE_4__["getLinkSrv"])().getAnchorInfo(link);
    var key = "".concat(link.title, "-$").concat(index);

    if (link.type === 'dashboards') {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DashboardLinksDashboard__WEBPACK_IMPORTED_MODULE_3__["DashboardLinksDashboard"], {
        key: key,
        link: link,
        linkInfo: linkInfo,
        dashboardId: dashboard.id
      });
    }

    var linkElement = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "gf-form-label",
      href: Object(_grafana_data_src_text_sanitize__WEBPACK_IMPORTED_MODULE_2__["sanitizeUrl"])(linkInfo.href),
      target: link.targetBlank ? '_blank' : '_self',
      "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_8__["selectors"].components.DashboardLinks.link
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
      name: _DashLinks_DashLinksEditorCtrl__WEBPACK_IMPORTED_MODULE_5__["iconMap"][link.icon],
      style: {
        marginRight: '4px'
      }
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Object(_grafana_data_src_text_sanitize__WEBPACK_IMPORTED_MODULE_2__["sanitize"])(linkInfo.title)));
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: key,
      className: "gf-form",
      "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_8__["selectors"].components.DashboardLinks.container
    }, link.tooltip ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
      content: link.tooltip
    }, linkElement) : linkElement);
  }));
};

/***/ }),

/***/ "./public/app/features/dashboard/components/SubMenu/DashboardLinksDashboard.tsx":
/*!**************************************************************************************!*\
  !*** ./public/app/features/dashboard/components/SubMenu/DashboardLinksDashboard.tsx ***!
  \**************************************************************************************/
/*! exports provided: DashboardLinksDashboard, searchForTags, resolveLinks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardLinksDashboard", function() { return DashboardLinksDashboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchForTags", function() { return searchForTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveLinks", function() { return resolveLinks; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data_src_text_sanitize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data/src/text/sanitize */ "./packages/grafana-data/src/text/sanitize.ts");
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");
/* harmony import */ var _panel_panellinks_link_srv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../panel/panellinks/link_srv */ "./public/app/features/panel/panellinks/link_srv.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
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







var DashboardLinksDashboard =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DashboardLinksDashboard, _PureComponent);

  function DashboardLinksDashboard() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DashboardLinksDashboard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DashboardLinksDashboard)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      resolvedLinks: []
    };
    _this.searchForDashboards =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _this$props, dashboardId, link, searchHits, resolvedLinks;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, dashboardId = _this$props.dashboardId, link = _this$props.link;
              _context.next = 3;
              return searchForTags(link);

            case 3:
              searchHits = _context.sent;
              resolvedLinks = resolveLinks(dashboardId, link, searchHits);

              _this.setState({
                resolvedLinks: resolvedLinks
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    _this.renderElement = function (linkElement, key, selector) {
      var link = _this.props.link;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form",
        key: key,
        "aria-label": selector
      }, link.tooltip && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
        content: link.tooltip
      }, linkElement), !link.tooltip && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, linkElement));
    };

    _this.renderList = function () {
      var link = _this.props.link;
      var resolvedLinks = _this.state.resolvedLinks;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, resolvedLinks.length > 0 && resolvedLinks.map(function (resolvedLink, index) {
        var linkElement = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          className: "gf-form-label",
          href: resolvedLink.url,
          target: link.targetBlank ? '_blank' : '_self',
          "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_5__["selectors"].components.DashboardLinks.link
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
          name: "apps",
          style: {
            marginRight: '4px'
          }
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, resolvedLink.title));
        return _this.renderElement(linkElement, "dashlinks-list-item-".concat(resolvedLink.id, "-").concat(index), _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_5__["selectors"].components.DashboardLinks.container);
      }));
    };

    _this.renderDropdown = function () {
      var _this$props2 = _this.props,
          link = _this$props2.link,
          linkInfo = _this$props2.linkInfo;
      var resolvedLinks = _this.state.resolvedLinks;
      var linkElement = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "gf-form-label pointer",
        onClick: _this.searchForDashboards,
        "data-placement": "bottom",
        "data-toggle": "dropdown"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Icon"], {
        name: "bars"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, linkInfo.title)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "dropdown-menu pull-right",
        role: "menu"
      }, resolvedLinks.length > 0 && resolvedLinks.map(function (resolvedLink, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: "dashlinks-dropdown-item-".concat(resolvedLink.id, "-").concat(index)
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: resolvedLink.url,
          target: link.targetBlank ? '_blank' : '_self',
          "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_5__["selectors"].components.DashboardLinks.link
        }, resolvedLink.title));
      })));
      return _this.renderElement(linkElement, 'dashlinks-dropdown', _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_5__["selectors"].components.DashboardLinks.dropDown);
    };

    return _this;
  }

  _createClass(DashboardLinksDashboard, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.searchForDashboards();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.link !== prevProps.link || this.props.linkInfo !== prevProps.linkInfo) {
        this.searchForDashboards();
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.link.asDropdown) {
        return this.renderDropdown();
      }

      return this.renderList();
    }
  }]);

  return DashboardLinksDashboard;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
function searchForTags(_x) {
  return _searchForTags.apply(this, arguments);
}

function _searchForTags() {
  _searchForTags = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(link) {
    var dependencies,
        limit,
        searchHits,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dependencies = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {
              getBackendSrv: app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_3__["getBackendSrv"]
            };
            limit = 100;
            _context2.next = 4;
            return dependencies.getBackendSrv().search({
              tag: link.tags,
              limit: limit
            });

          case 4:
            searchHits = _context2.sent;
            return _context2.abrupt("return", searchHits);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _searchForTags.apply(this, arguments);
}

function resolveLinks(dashboardId, link, searchHits) {
  var dependencies = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
    getLinkSrv: _panel_panellinks_link_srv__WEBPACK_IMPORTED_MODULE_4__["getLinkSrv"],
    sanitize: _grafana_data_src_text_sanitize__WEBPACK_IMPORTED_MODULE_2__["sanitize"],
    sanitizeUrl: _grafana_data_src_text_sanitize__WEBPACK_IMPORTED_MODULE_2__["sanitizeUrl"]
  };
  return searchHits.filter(function (searchHit) {
    return searchHit.id !== dashboardId;
  }).map(function (searchHit) {
    var id = searchHit.id;
    var title = dependencies.sanitize(searchHit.title);
    var resolvedLink = dependencies.getLinkSrv().getLinkUrl(_objectSpread({}, link, {
      url: searchHit.url
    }));
    var url = dependencies.sanitizeUrl(resolvedLink);
    return {
      id: id,
      title: title,
      url: url
    };
  });
}

/***/ }),

/***/ "./public/app/features/dashboard/components/SubMenu/SubMenu.tsx":
/*!**********************************************************************!*\
  !*** ./public/app/features/dashboard/components/SubMenu/SubMenu.tsx ***!
  \**********************************************************************/
/*! exports provided: SubMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubMenu", function() { return SubMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _variables_state_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../variables/state/selectors */ "./public/app/features/variables/state/selectors.ts");
/* harmony import */ var _variables_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../variables/types */ "./public/app/features/variables/types.ts");
/* harmony import */ var _DashboardLinks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DashboardLinks */ "./public/app/features/dashboard/components/SubMenu/DashboardLinks.tsx");
/* harmony import */ var _Annotations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Annotations */ "./public/app/features/dashboard/components/SubMenu/Annotations.tsx");
/* harmony import */ var _SubMenuItems__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SubMenuItems */ "./public/app/features/dashboard/components/SubMenu/SubMenuItems.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var SubMenuUnConnected =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(SubMenuUnConnected, _PureComponent);

  function SubMenuUnConnected() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SubMenuUnConnected);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SubMenuUnConnected)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onAnnotationStateChanged = function (updatedAnnotation) {
      // we're mutating dashboard state directly here until annotations are in Redux.
      for (var index = 0; index < _this.props.dashboard.annotations.list.length; index++) {
        var annotation = _this.props.dashboard.annotations.list[index];

        if (annotation.name === updatedAnnotation.name) {
          annotation.enable = !annotation.enable;
          break;
        }
      }

      _this.props.dashboard.startRefresh();

      _this.forceUpdate();
    };

    _this.isSubMenuVisible = function () {
      if (_this.props.dashboard.links.length > 0) {
        return true;
      }

      var visibleVariables = _this.props.variables.filter(function (variable) {
        return variable.hide !== _variables_types__WEBPACK_IMPORTED_MODULE_3__["VariableHide"].hideVariable;
      });

      if (visibleVariables.length > 0) {
        return true;
      }

      var visibleAnnotations = _this.props.dashboard.annotations.list.filter(function (annotation) {
        return annotation.hide !== true;
      });

      return visibleAnnotations.length > 0;
    };

    return _this;
  }

  _createClass(SubMenuUnConnected, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          dashboard = _this$props.dashboard,
          variables = _this$props.variables,
          links = _this$props.links;

      if (!this.isSubMenuVisible()) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "submenu-controls"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SubMenuItems__WEBPACK_IMPORTED_MODULE_6__["SubMenuItems"], {
        variables: variables
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Annotations__WEBPACK_IMPORTED_MODULE_5__["Annotations"], {
        annotations: dashboard.annotations.list,
        onAnnotationChanged: this.onAnnotationStateChanged
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form gf-form--grow"
      }), dashboard && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DashboardLinks__WEBPACK_IMPORTED_MODULE_4__["DashboardLinks"], {
        dashboard: dashboard,
        links: links
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "clearfix"
      }));
    }
  }]);

  return SubMenuUnConnected;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    variables: Object(_variables_state_selectors__WEBPACK_IMPORTED_MODULE_2__["getSubMenuVariables"])(state.templating.variables)
  };
};

var SubMenu = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps)(SubMenuUnConnected);
SubMenu.displayName = 'SubMenu';

/***/ }),

/***/ "./public/app/features/dashboard/components/SubMenu/SubMenuItems.tsx":
/*!***************************************************************************!*\
  !*** ./public/app/features/dashboard/components/SubMenu/SubMenuItems.tsx ***!
  \***************************************************************************/
/*! exports provided: SubMenuItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubMenuItems", function() { return SubMenuItems; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _variables_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../variables/types */ "./public/app/features/variables/types.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
/* harmony import */ var _variables_pickers_PickerRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../variables/pickers/PickerRenderer */ "./public/app/features/variables/pickers/PickerRenderer.tsx");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var SubMenuItems = function SubMenuItems(_ref) {
  var variables = _ref.variables;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]),
      _useState2 = _slicedToArray(_useState, 2),
      visibleVariables = _useState2[0],
      setVisibleVariables = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    setVisibleVariables(variables.filter(function (state) {
      return state.hide !== _variables_types__WEBPACK_IMPORTED_MODULE_1__["VariableHide"].hideVariable;
    }));
  }, [variables]);

  if (visibleVariables.length === 0) {
    return null;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, visibleVariables.map(function (variable) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: variable.id,
      className: "submenu-item gf-form-inline",
      "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_2__["selectors"].pages.Dashboard.SubMenu.submenuItem
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_variables_pickers_PickerRenderer__WEBPACK_IMPORTED_MODULE_3__["PickerRenderer"], {
      variable: variable
    }));
  }));
};

/***/ }),

/***/ "./public/app/features/dashboard/components/TransformationsEditor/TransformationEditor.tsx":
/*!*************************************************************************************************!*\
  !*** ./public/app/features/dashboard/components/TransformationsEditor/TransformationEditor.tsx ***!
  \*************************************************************************************************/
/*! exports provided: TransformationEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransformationEditor", function() { return TransformationEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n      flex-grow: 1;\n      height: 100%;\n      overflow: hidden;\n      padding: ", ";\n    "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n      margin-top: ", ";\n      padding: 0 ", " ", " ", ";\n      border: 1px solid ", ";\n      background: ", ";\n      border-radius: ", ";\n      width: 100%;\n      min-height: 300px;\n      display: flex;\n      flex-direction: column;\n      align-self: stretch;\n    "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n      padding: ", " ", ";\n      font-family: ", ";\n      font-size: ", ";\n      color: ", ";\n      border-bottom: 1px solid ", ";\n      flex-grow: 0;\n      flex-shrink: 1;\n    "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n      width: 48px;\n      min-height: 300px;\n      display: flex;\n      align-items: center;\n      align-self: stretch;\n      justify-content: center;\n      margin: 0 ", ";\n      color: ", ";\n    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      flex-direction: row;\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n      background: transparent;\n      border: none;\n      box-shadow: none;\n      cursor: pointer;\n      color: ", ";\n      margin-left: ", ";\n      &:hover {\n        color: ", ";\n      }\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      font-weight: ", ";\n      color: ", ";\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      padding: 4px 8px 4px 8px;\n      position: relative;\n      height: 35px;\n      border-radius: 4px 4px 0 0;\n      flex-wrap: nowrap;\n      justify-content: space-between;\n      align-items: center;\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var TransformationEditor = function TransformationEditor(_ref) {
  var editor = _ref.editor,
      input = _ref.input,
      output = _ref.output,
      debugMode = _ref.debugMode,
      name = _ref.name;
  var theme = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["ThemeContext"]);
  var styles = getStyles(theme);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.editor,
    "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_3__["selectors"].components.TransformTab.transformationEditor(name)
  }, editor, debugMode && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.debugWrapper,
    "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_3__["selectors"].components.TransformTab.transformationEditorDebugger(name)
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.debug
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.debugTitle
  }, "\u8F6C\u6362\u8F93\u5165\u6570\u636E"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.debugJson
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["JSONFormatter"], {
    json: input
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.debugSeparator
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Icon"], {
    name: "arrow-right"
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.debug
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.debugTitle
  }, "\u8F6C\u6362\u8F93\u51FA\u6570\u636E"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.debugJson
  }, output && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["JSONFormatter"], {
    json: output
  })))));
};

var getStyles = function getStyles(theme) {
  var debugBorder = theme.isLight ? theme.palette.gray85 : theme.palette.gray15;
  return {
    title: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject()),
    name: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2(), theme.typography.weight.semibold, theme.colors.textBlue),
    iconRow: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3()),
    icon: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject4(), theme.colors.textWeak, theme.spacing.sm, theme.colors.text),
    editor: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject5()),
    debugWrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject6()),
    debugSeparator: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject7(), theme.spacing.xs, theme.colors.textBlue),
    debugTitle: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject8(), theme.spacing.sm, theme.spacing.xxs, theme.typography.fontFamily.monospace, theme.typography.size.sm, theme.colors.text, debugBorder),
    debug: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject9(), theme.spacing.sm, theme.spacing.sm, theme.spacing.sm, theme.spacing.sm, debugBorder, theme.isLight ? theme.palette.white : theme.palette.gray05, theme.border.radius.sm),
    debugJson: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject10(), theme.spacing.xs)
  };
};

/***/ }),

/***/ "./public/app/features/dashboard/components/TransformationsEditor/TransformationOperationRow.tsx":
/*!*******************************************************************************************************!*\
  !*** ./public/app/features/dashboard/components/TransformationsEditor/TransformationOperationRow.tsx ***!
  \*******************************************************************************************************/
/*! exports provided: TransformationOperationRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransformationOperationRow", function() { return TransformationOperationRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _TransformationEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TransformationEditor */ "./public/app/features/dashboard/components/TransformationsEditor/TransformationEditor.tsx");
/* harmony import */ var app_core_components_QueryOperationRow_QueryOperationRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/QueryOperationRow/QueryOperationRow */ "./public/app/core/components/QueryOperationRow/QueryOperationRow.tsx");
/* harmony import */ var app_core_components_QueryOperationRow_QueryOperationAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/QueryOperationRow/QueryOperationAction */ "./public/app/core/components/QueryOperationRow/QueryOperationAction.tsx");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






var TransformationOperationRow = function TransformationOperationRow(_ref) {
  var children = _ref.children,
      onRemove = _ref.onRemove,
      index = _ref.index,
      id = _ref.id,
      props = _objectWithoutProperties(_ref, ["children", "onRemove", "index", "id"]);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      showDebug = _useState2[0],
      setShowDebug = _useState2[1];

  var renderActions = function renderActions(_ref2) {
    var isOpen = _ref2.isOpen;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["HorizontalGroup"], {
      align: "center",
      width: "auto"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_QueryOperationRow_QueryOperationAction__WEBPACK_IMPORTED_MODULE_4__["QueryOperationAction"], {
      title: "Debug",
      disabled: !isOpen,
      icon: "bug",
      onClick: function onClick() {
        setShowDebug(!showDebug);
      }
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_QueryOperationRow_QueryOperationAction__WEBPACK_IMPORTED_MODULE_4__["QueryOperationAction"], {
      title: "\u79FB\u9664",
      icon: "trash-alt",
      onClick: onRemove
    }));
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_QueryOperationRow_QueryOperationRow__WEBPACK_IMPORTED_MODULE_3__["QueryOperationRow"], {
    id: id,
    index: index,
    title: props.name,
    draggable: true,
    actions: renderActions
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TransformationEditor__WEBPACK_IMPORTED_MODULE_2__["TransformationEditor"], _extends({}, props, {
    debugMode: showDebug
  })));
};

/***/ }),

/***/ "./public/app/features/dashboard/components/TransformationsEditor/TransformationsEditor.tsx":
/*!**************************************************************************************************!*\
  !*** ./public/app/features/dashboard/components/TransformationsEditor/TransformationsEditor.tsx ***!
  \**************************************************************************************************/
/*! exports provided: TransformationsEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransformationsEditor", function() { return TransformationsEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _TransformationOperationRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TransformationOperationRow */ "./public/app/features/dashboard/components/TransformationsEditor/TransformationOperationRow.tsx");
/* harmony import */ var _core_components_Card_Card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../core/components/Card/Card */ "./public/app/core/components/Card/Card.tsx");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
/* harmony import */ var app_core_utils_docsLinks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/utils/docsLinks */ "./public/app/core/utils/docsLinks.ts");
/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-beautiful-dnd */ "./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js");
/* harmony import */ var _PanelEditor_PanelNotSupported__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../PanelEditor/PanelNotSupported */ "./public/app/features/dashboard/components/PanelEditor/PanelNotSupported.tsx");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../types */ "./public/app/types/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      background: ", ";\n      width: 100%;\n      border: none;\n      padding: ", ";\n\n      // hack because these cards use classes from a very different card for some reason\n      .add-data-source-item-text {\n        font-size: ", ";\n      }\n\n      &:hover {\n        background: ", ";\n        box-shadow: none;\n        border: none;\n      }\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n          max-width: 66%;\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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












var TransformationsEditor =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(TransformationsEditor, _React$PureComponent);

  function TransformationsEditor(props) {
    var _this;

    _classCallCheck(this, TransformationsEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TransformationsEditor).call(this, props));

    _this.getTransformationNextId = function (name) {
      var transformations = _this.state.transformations;
      var nextId = 0;
      var existingIds = transformations.filter(function (t) {
        return t.id.startsWith(name);
      }).map(function (t) {
        return t.id;
      });

      if (existingIds.length !== 0) {
        nextId = Math.max.apply(Math, _toConsumableArray(existingIds.map(function (i) {
          return parseInt(i.match(/\d+/)[0], 10);
        }))) + 1;
      }

      return "".concat(name, "-").concat(nextId);
    };

    _this.onTransformationAdd = function (selectable) {
      var transformations = _this.state.transformations;

      var nextId = _this.getTransformationNextId(selectable.value);

      _this.onChange([].concat(_toConsumableArray(transformations), [{
        id: nextId,
        transformation: {
          id: selectable.value,
          options: {}
        }
      }]));
    };

    _this.onTransformationChange = function (idx, config) {
      var transformations = _this.state.transformations;
      var next = Array.from(transformations);
      next[idx].transformation = config;

      _this.onChange(next);
    };

    _this.onTransformationRemove = function (idx) {
      var transformations = _this.state.transformations;
      var next = Array.from(transformations);
      next.splice(idx, 1);

      _this.onChange(next);
    };

    _this.renderTransformationSelector = function () {
      var availableTransformers = _grafana_data__WEBPACK_IMPORTED_MODULE_2__["standardTransformersRegistry"].list().map(function (t) {
        return {
          value: t.transformation.id,
          label: t.name,
          description: t.description
        };
      });
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: Object(emotion__WEBPACK_IMPORTED_MODULE_5__["css"])(_templateObject())
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["ValuePicker"], {
        size: "md",
        variant: "secondary",
        label: "\u6DFB\u52A0\u8F6C\u6362",
        options: availableTransformers,
        onChange: _this.onTransformationAdd,
        isFullWidth: false,
        menuPlacement: "bottom"
      }));
    };

    _this.onDragEnd = function (result) {
      var transformations = _this.state.transformations;

      if (!result || !result.destination) {
        return;
      }

      var startIndex = result.source.index;
      var endIndex = result.destination.index;

      if (startIndex === endIndex) {
        return;
      }

      var update = Array.from(transformations);

      var _update$splice = update.splice(startIndex, 1),
          _update$splice2 = _slicedToArray(_update$splice, 1),
          removed = _update$splice2[0];

      update.splice(endIndex, 0, removed);

      _this.onChange(update);
    };

    _this.renderTransformationEditors = function () {
      var _this$state = _this.state,
          data = _this$state.data,
          transformations = _this$state.transformations;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_8__["DragDropContext"], {
        onDragEnd: _this.onDragEnd
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_8__["Droppable"], {
        droppableId: "transformations-list",
        direction: "vertical"
      }, function (provided) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({
          ref: provided.innerRef
        }, provided.droppableProps), transformations.map(function (t, i) {
          // Transformations are not identified uniquely by any property apart from array index.
          // For drag and drop to work we need to generate unique ids. This record stores counters for each transformation type
          // based on which ids are generated
          var editor;
          var transformationUI = _grafana_data__WEBPACK_IMPORTED_MODULE_2__["standardTransformersRegistry"].getIfExists(t.transformation.id);

          if (!transformationUI) {
            return null;
          }

          var input = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["transformDataFrame"])(transformations.slice(0, i).map(function (t) {
            return t.transformation;
          }), data);
          var output = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["transformDataFrame"])(transformations.slice(i).map(function (t) {
            return t.transformation;
          }), input);

          if (transformationUI) {
            editor = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(transformationUI.editor, {
              options: _objectSpread({}, transformationUI.transformation.defaultOptions, {}, t.transformation.options),
              input: input,
              onChange: function onChange(options) {
                _this.onTransformationChange(i, {
                  id: t.transformation.id,
                  options: options
                });
              }
            });
          }

          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TransformationOperationRow__WEBPACK_IMPORTED_MODULE_3__["TransformationOperationRow"], {
            index: i,
            id: "".concat(t.id),
            key: "".concat(t.id),
            input: input || [],
            output: output || [],
            onRemove: function onRemove() {
              return _this.onTransformationRemove(i);
            },
            editor: editor,
            name: transformationUI.name,
            description: transformationUI.description
          });
        }), provided.placeholder);
      }));
    };

    var _transformations = props.panel.transformations || [];

    var ids = _this.buildTransformationIds(_transformations);

    _this.state = {
      transformations: _transformations.map(function (t, i) {
        return {
          transformation: t,
          id: ids[i]
        };
      }),
      data: []
    };
    return _this;
  }

  _createClass(TransformationsEditor, [{
    key: "buildTransformationIds",
    value: function buildTransformationIds(transformations) {
      var transformationCounters = {};
      var transformationIds = [];

      for (var i = 0; i < transformations.length; i++) {
        var transformation = transformations[i];

        if (transformationCounters[transformation.id] === undefined) {
          transformationCounters[transformation.id] = 0;
        } else {
          transformationCounters[transformation.id] += 1;
        }

        transformationIds.push("".concat(transformations[i].id, "-").concat(transformationCounters[transformations[i].id]));
      }

      return transformationIds;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.subscription = this.props.panel.getQueryRunner().getData({
        withTransforms: false,
        withFieldConfig: false
      }).subscribe({
        next: function next(panelData) {
          return _this2.setState({
            data: panelData.series
          });
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  }, {
    key: "onChange",
    value: function onChange(transformations) {
      this.setState({
        transformations: transformations
      });
      this.props.panel.setTransformations(transformations.map(function (t) {
        return t.transformation;
      }));
    } // Transformation uid are stored in a name-X form. name is NOT unique hence we need to parse the ids and increase X
    // for transformations with the same name

  }, {
    key: "renderNoAddedTransformsState",
    value: function renderNoAddedTransformsState() {
      var _this3 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["VerticalGroup"], {
        spacing: 'lg'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Container"], {
        grow: 1
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["FeatureInfoBox"], {
        title: "\u8F6C\u6362",
        url: Object(app_core_utils_docsLinks__WEBPACK_IMPORTED_MODULE_7__["getDocsLink"])(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["DocsId"].Transformations)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "\u8F6C\u6362\u4F7F\u60A8\u53EF\u4EE5\u5728\u53EF\u89C6\u5316\u4E4B\u524D\u52A0\u5165\uFF0C\u8BA1\u7B97\uFF0C\u91CD\u65B0\u6392\u5E8F\uFF0C\u9690\u85CF\u548C\u91CD\u547D\u540D\u67E5\u8BE2\u7ED3\u679C\u3002 ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "\u5982\u679C\u60A8\u4F7F\u7528\u7684\u662FGraph\u53EF\u89C6\u5316\uFF0C\u5219\u8BB8\u591A\u8F6C\u6362\u90FD\u4E0D\u9002\u5408\uFF0C\u56E0\u4E3A\u5B83\u76EE\u524D\u4EC5\u652F\u6301\u65F6\u95F4\u5E8F\u5217\u3002 ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "\u5B83\u53EF\u4EE5\u5E2E\u52A9\u5207\u6362\u5230\u8868\u53EF\u89C6\u5316\uFF0C\u4EE5\u4E86\u89E3\u8F6C\u6362\u5728\u505A\u4EC0\u4E48\u3002 ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["VerticalGroup"], null, _grafana_data__WEBPACK_IMPORTED_MODULE_2__["standardTransformersRegistry"].list().map(function (t) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TransformationCard, {
          key: t.name,
          title: t.name,
          description: t.description,
          actions: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Button"], null, "\u9009\u62E9"),
          ariaLabel: _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_6__["selectors"].components.TransformTab.newTransform(t.name),
          onClick: function onClick() {
            _this3.onTransformationAdd({
              value: t.id
            });
          }
        });
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var alert = this.props.panel.alert;
      var transformations = this.state.transformations;
      var hasTransforms = transformations.length > 0;

      if (!hasTransforms && alert) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PanelEditor_PanelNotSupported__WEBPACK_IMPORTED_MODULE_9__["PanelNotSupported"], {
          message: "\u4E0D\u80FD\u5728\u5177\u6709\u73B0\u6709\u8B66\u62A5\u7684\u9762\u677F\u4E0A\u4F7F\u7528\u8F6C\u6362"
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["CustomScrollbar"], {
        autoHeightMin: "100%"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Container"], {
        padding: "md"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_6__["selectors"].components.TransformTab.content
      }, hasTransforms && alert ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Alert"], {
        severity: _types__WEBPACK_IMPORTED_MODULE_10__["AppNotificationSeverity"].Error,
        title: "\u4E0D\u80FD\u5728\u5E26\u6709\u8B66\u62A5\u7684\u9762\u677F\u4E0A\u4F7F\u7528\u8F6C\u6362"
      }) : null, !hasTransforms && this.renderNoAddedTransformsState(), hasTransforms && this.renderTransformationEditors(), hasTransforms && this.renderTransformationSelector())));
    }
  }]);

  return TransformationsEditor;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

var TransformationCard = function TransformationCard(props) {
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["useTheme"])();
  var styles = getTransformationCardStyles(theme);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_core_components_Card_Card__WEBPACK_IMPORTED_MODULE_4__["Card"], _extends({}, props, {
    className: styles.card
  }));
};

var getTransformationCardStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["stylesFactory"])(function (theme) {
  return {
    card: Object(emotion__WEBPACK_IMPORTED_MODULE_5__["css"])(_templateObject2(), theme.colors.bg2, theme.spacing.sm, theme.typography.size.md, theme.colors.bg3)
  };
});

/***/ }),

/***/ "./public/app/features/dashboard/containers/DashboardPage.tsx":
/*!********************************************************************!*\
  !*** ./public/app/features/dashboard/containers/DashboardPage.tsx ***!
  \********************************************************************/
/*! exports provided: DashboardPage, mapStateToProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPage", function() { return DashboardPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_copy_appNotification__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/copy/appNotification */ "./public/app/core/copy/appNotification.ts");
/* harmony import */ var app_core_utils_errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/utils/errors */ "./public/app/core/utils/errors.ts");
/* harmony import */ var app_core_components_Branding_Branding__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/Branding/Branding */ "./public/app/core/components/Branding/Branding.tsx");
/* harmony import */ var _dashgrid_DashboardGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../dashgrid/DashboardGrid */ "./public/app/features/dashboard/dashgrid/DashboardGrid.tsx");
/* harmony import */ var _components_DashNav__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/DashNav */ "./public/app/features/dashboard/components/DashNav/index.ts");
/* harmony import */ var _components_DashboardSettings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/DashboardSettings */ "./public/app/features/dashboard/components/DashboardSettings/index.ts");
/* harmony import */ var _components_PanelEditor_PanelEditor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/PanelEditor/PanelEditor */ "./public/app/features/dashboard/components/PanelEditor/PanelEditor.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _state_initDashboard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../state/initDashboard */ "./public/app/features/dashboard/state/initDashboard.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _components_Inspector_PanelInspector__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../components/Inspector/PanelInspector */ "./public/app/features/dashboard/components/Inspector/PanelInspector.tsx");
/* harmony import */ var _components_SubMenu_SubMenu__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../components/SubMenu/SubMenu */ "./public/app/features/dashboard/components/SubMenu/SubMenu.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../state/actions */ "./public/app/features/dashboard/state/actions.ts");
/* harmony import */ var _variables_state_actions__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../variables/state/actions */ "./public/app/features/variables/state/actions.ts");
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

// Libraries



 // Services & Utils



 // Components





 // Redux


 // Types






var DashboardPage =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DashboardPage, _PureComponent);

  function DashboardPage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DashboardPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DashboardPage)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      editPanel: null,
      viewPanel: null,
      showLoadingState: false,
      scrollTop: 0,
      rememberScrollTop: 0
    };

    _this.setScrollTop = function (e) {
      var target = e.target;

      _this.setState({
        scrollTop: target.scrollTop,
        updateScrollTop: undefined
      });
    };

    _this.onAddPanel = function () {
      var dashboard = _this.props.dashboard;

      if (!dashboard) {
        return;
      } // Return if the "Add panel" exists already


      if (dashboard.panels.length > 0 && dashboard.panels[0].type === 'add-panel') {
        return;
      }

      dashboard.addPanel({
        type: 'add-panel',
        gridPos: {
          x: 0,
          y: 0,
          w: 12,
          h: 8
        },
        title: '面板标题'
      }); // scroll to top after adding panel

      _this.setState({
        updateScrollTop: 0
      });
    };

    _this.cancelVariables = function () {
      _this.props.updateLocation({
        path: '/'
      });
    };

    return _this;
  }

  _createClass(DashboardPage, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.props.initDashboard({
                  $injector: this.props.$injector,
                  $scope: this.props.$scope,
                  urlSlug: this.props.urlSlug,
                  urlUid: this.props.urlUid,
                  urlType: this.props.urlType,
                  urlFolderId: this.props.urlFolderId,
                  routeInfo: this.props.routeInfo,
                  fixUrl: true
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.cleanUpDashboardAndVariables();
      this.setPanelFullscreenClass(false);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      var _this$props = this.props,
          dashboard = _this$props.dashboard,
          urlEditPanelId = _this$props.urlEditPanelId,
          urlViewPanelId = _this$props.urlViewPanelId,
          urlUid = _this$props.urlUid;
      var _this$state = this.state,
          editPanel = _this$state.editPanel,
          viewPanel = _this$state.viewPanel;

      if (!dashboard) {
        return;
      } // if we just got dashboard update title


      if (!prevProps.dashboard) {
        document.title = dashboard.title + ' - ' + app_core_components_Branding_Branding__WEBPACK_IMPORTED_MODULE_6__["Branding"].AppTitle;
      } // Due to the angular -> react url bridge we can ge an update here with new uid before the container unmounts
      // Can remove this condition after we switch to react router


      if (prevProps.urlUid !== urlUid) {
        return;
      } // entering edit mode


      if (!editPanel && urlEditPanelId) {
        this.getPanelByIdFromUrlParam(urlEditPanelId, function (panel) {
          // if no edit permission show error
          if (!dashboard.canEditPanel(panel)) {
            _this2.props.notifyApp(Object(app_core_copy_appNotification__WEBPACK_IMPORTED_MODULE_4__["createErrorNotification"])('编辑面板的权限被拒绝'));

            return;
          }

          _this2.setState({
            editPanel: panel
          });
        });
      } // leaving edit mode


      if (editPanel && !urlEditPanelId) {
        this.setState({
          editPanel: null
        });
      } // entering view mode


      if (!viewPanel && urlViewPanelId) {
        this.getPanelByIdFromUrlParam(urlViewPanelId, function (panel) {
          _this2.setPanelFullscreenClass(true);

          dashboard.initViewPanel(panel);

          _this2.setState({
            viewPanel: panel,
            rememberScrollTop: _this2.state.scrollTop
          });
        });
      } // leaving view mode


      if (viewPanel && !urlViewPanelId) {
        this.setPanelFullscreenClass(false);
        dashboard.exitViewPanel(viewPanel);
        this.setState({
          viewPanel: null,
          updateScrollTop: this.state.rememberScrollTop
        }, this.triggerPanelsRendering.bind(this));
      }
    }
  }, {
    key: "getPanelByIdFromUrlParam",
    value: function getPanelByIdFromUrlParam(urlPanelId, callback) {
      var dashboard = this.props.dashboard;
      var panelId = parseInt(urlPanelId, 10);
      dashboard.expandParentRowFor(panelId);
      var panel = dashboard.getPanelById(panelId);

      if (!panel) {
        // Panel not found
        this.props.notifyApp(Object(app_core_copy_appNotification__WEBPACK_IMPORTED_MODULE_4__["createErrorNotification"])("\u627E\u4E0D\u5230ID\u4E3A ".concat(urlPanelId, " \u7684\u9762\u677F"))); // Clear url state

        this.props.updateLocation({
          query: {
            editPanel: null,
            viewPanel: null
          },
          partial: true
        });
        return;
      }

      callback(panel);
    }
  }, {
    key: "triggerPanelsRendering",
    value: function triggerPanelsRendering() {
      try {
        this.props.dashboard.render();
      } catch (err) {
        console.error(err);
        this.props.notifyApp(Object(app_core_copy_appNotification__WEBPACK_IMPORTED_MODULE_4__["createErrorNotification"])("\u9762\u677F\u6E32\u67D3\u9519\u8BEF", err));
      }
    }
  }, {
    key: "setPanelFullscreenClass",
    value: function setPanelFullscreenClass(isFullscreen) {
      jquery__WEBPACK_IMPORTED_MODULE_0___default()('body').toggleClass('panel-in-fullscreen', isFullscreen);
    }
  }, {
    key: "renderSlowInitState",
    value: function renderSlowInitState() {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "dashboard-loading"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "dashboard-loading__text"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_11__["VerticalGroup"], {
        spacing: "md"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_11__["HorizontalGroup"], {
        align: "center",
        justify: "center",
        spacing: "xs"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_11__["Icon"], {
        name: "fa fa-spinner",
        className: "fa-spin"
      }), " ", this.props.initPhase), ' ', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_11__["HorizontalGroup"], {
        align: "center",
        justify: "center"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        variant: "secondary",
        size: "md",
        icon: "repeat",
        onClick: this.cancelVariables
      }, "\u53D6\u6D88\u52A0\u8F7D\u4EEA\u8868\u677F")))));
    }
  }, {
    key: "renderInitFailedState",
    value: function renderInitFailedState() {
      var initError = this.props.initError;

      if (!initError) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "dashboard-loading"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_11__["Alert"], {
        severity: app_types__WEBPACK_IMPORTED_MODULE_14__["AppNotificationSeverity"].Error,
        title: initError.message,
        children: Object(app_core_utils_errors__WEBPACK_IMPORTED_MODULE_5__["getMessageFromError"])(initError.error)
      }));
    }
  }, {
    key: "getInspectPanel",
    value: function getInspectPanel() {
      var _this$props2 = this.props,
          dashboard = _this$props2.dashboard,
          inspectPanelId = _this$props2.inspectPanelId;

      if (!dashboard || !inspectPanelId) {
        return null;
      }

      var inspectPanel = dashboard.getPanelById(parseInt(inspectPanelId, 10)); // cannot inspect panels plugin is not already loaded

      if (!inspectPanel) {
        return null;
      }

      return inspectPanel;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          dashboard = _this$props3.dashboard,
          editview = _this$props3.editview,
          $injector = _this$props3.$injector,
          isInitSlow = _this$props3.isInitSlow,
          initError = _this$props3.initError,
          inspectTab = _this$props3.inspectTab,
          isPanelEditorOpen = _this$props3.isPanelEditorOpen,
          updateLocation = _this$props3.updateLocation;
      var _this$state2 = this.state,
          editPanel = _this$state2.editPanel,
          viewPanel = _this$state2.viewPanel,
          scrollTop = _this$state2.scrollTop,
          updateScrollTop = _this$state2.updateScrollTop;

      if (!dashboard) {
        if (isInitSlow) {
          return this.renderSlowInitState();
        }

        return null;
      } // Only trigger render when the scroll has moved by 25


      var approximateScrollTop = Math.round(scrollTop / 25) * 25;
      var inspectPanel = this.getInspectPanel();
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "dashboard-container"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_DashNav__WEBPACK_IMPORTED_MODULE_8__["DashNav"], {
        dashboard: dashboard,
        isFullscreen: !!viewPanel,
        $injector: $injector,
        onAddPanel: this.onAddPanel
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "dashboard-scroll"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_11__["CustomScrollbar"], {
        autoHeightMin: "100%",
        setScrollTop: this.setScrollTop,
        scrollTop: updateScrollTop,
        updateAfterMountMs: 500,
        className: "custom-scrollbar--page"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "dashboard-content"
      }, initError && this.renderInitFailedState(), !editPanel && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_SubMenu_SubMenu__WEBPACK_IMPORTED_MODULE_16__["SubMenu"], {
        dashboard: dashboard,
        links: dashboard.links
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_dashgrid_DashboardGrid__WEBPACK_IMPORTED_MODULE_7__["DashboardGrid"], {
        dashboard: dashboard,
        viewPanel: viewPanel,
        editPanel: editPanel,
        scrollTop: approximateScrollTop,
        isPanelEditorOpen: isPanelEditorOpen
      })))), inspectPanel && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Inspector_PanelInspector__WEBPACK_IMPORTED_MODULE_15__["PanelInspector"], {
        dashboard: dashboard,
        panel: inspectPanel,
        defaultTab: inspectTab
      }), editPanel && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_PanelEditor_PanelEditor__WEBPACK_IMPORTED_MODULE_10__["PanelEditor"], {
        dashboard: dashboard,
        sourcePanel: editPanel
      }), editview && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_DashboardSettings__WEBPACK_IMPORTED_MODULE_9__["DashboardSettings"], {
        dashboard: dashboard,
        updateLocation: updateLocation
      }));
    }
  }]);

  return DashboardPage;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]);
var mapStateToProps = function mapStateToProps(state) {
  return {
    urlUid: state.location.routeParams.uid,
    urlSlug: state.location.routeParams.slug,
    urlType: state.location.routeParams.type,
    editview: state.location.query.editview,
    urlPanelId: state.location.query.panelId,
    urlFolderId: state.location.query.folderId,
    urlEditPanelId: state.location.query.editPanel,
    urlViewPanelId: state.location.query.viewPanel,
    inspectPanelId: state.location.query.inspect,
    initPhase: state.dashboard.initPhase,
    isInitSlow: state.dashboard.isInitSlow,
    initError: state.dashboard.initError,
    dashboard: state.dashboard.getModel(),
    inspectTab: state.location.query.inspectTab,
    isPanelEditorOpen: state.panelEditor.isOpen
  };
};
var mapDispatchToProps = {
  initDashboard: _state_initDashboard__WEBPACK_IMPORTED_MODULE_12__["initDashboard"],
  cleanUpDashboardAndVariables: _state_actions__WEBPACK_IMPORTED_MODULE_17__["cleanUpDashboardAndVariables"],
  notifyApp: app_core_actions__WEBPACK_IMPORTED_MODULE_13__["notifyApp"],
  updateLocation: app_core_actions__WEBPACK_IMPORTED_MODULE_13__["updateLocation"],
  cancelVariables: _variables_state_actions__WEBPACK_IMPORTED_MODULE_18__["cancelVariables"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(DashboardPage)));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/dashboard/dashgrid/DashboardGrid.tsx":
/*!******************************************************************!*\
  !*** ./public/app/features/dashboard/dashgrid/DashboardGrid.tsx ***!
  \******************************************************************/
/*! exports provided: DashboardGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardGrid", function() { return DashboardGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_grid_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-grid-layout */ "./node_modules/react-grid-layout/index.js");
/* harmony import */ var react_grid_layout__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_grid_layout__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_sizeme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-sizeme */ "./node_modules/react-sizeme/dist/react-sizeme.js");
/* harmony import */ var react_sizeme__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_sizeme__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_AddPanelWidget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/AddPanelWidget */ "./public/app/features/dashboard/components/AddPanelWidget/index.ts");
/* harmony import */ var _components_DashboardRow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/DashboardRow */ "./public/app/features/dashboard/components/DashboardRow/index.ts");
/* harmony import */ var app_core_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/constants */ "./public/app/core/constants.ts");
/* harmony import */ var _DashboardPanel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DashboardPanel */ "./public/app/features/dashboard/dashgrid/DashboardPanel.tsx");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _state_PanelModel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../state/PanelModel */ "./public/app/features/dashboard/state/PanelModel.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Libaries



 // @ts-ignore

 // Components


 // Types





var lastGridWidth = 1200;
var ignoreNextWidthChange = false;

function GridWrapper(_ref) {
  var size = _ref.size,
      layout = _ref.layout,
      onLayoutChange = _ref.onLayoutChange,
      children = _ref.children,
      onDragStop = _ref.onDragStop,
      onResize = _ref.onResize,
      onResizeStop = _ref.onResizeStop,
      onWidthChange = _ref.onWidthChange,
      className = _ref.className,
      isResizable = _ref.isResizable,
      isDraggable = _ref.isDraggable,
      viewPanel = _ref.viewPanel;
  var width = size.width > 0 ? size.width : lastGridWidth; // logic to ignore width changes (optimization)

  if (width !== lastGridWidth) {
    if (ignoreNextWidthChange) {
      ignoreNextWidthChange = false;
    } else if (!viewPanel && Math.abs(width - lastGridWidth) > 8) {
      onWidthChange();
      lastGridWidth = width;
    }
  }
  /*
    Disable draggable if mobile device, solving an issue with unintentionally
     moving panels. https://github.com/grafana/grafana/issues/18497
     theme.breakpoints.md = 769
  */


  var draggable = width <= 769 ? false : isDraggable;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_grid_layout__WEBPACK_IMPORTED_MODULE_2___default.a, {
    width: lastGridWidth,
    className: className,
    isDraggable: draggable,
    isResizable: isResizable,
    containerPadding: [0, 0],
    useCSSTransforms: false,
    margin: [app_core_constants__WEBPACK_IMPORTED_MODULE_7__["GRID_CELL_VMARGIN"], app_core_constants__WEBPACK_IMPORTED_MODULE_7__["GRID_CELL_VMARGIN"]],
    cols: app_core_constants__WEBPACK_IMPORTED_MODULE_7__["GRID_COLUMN_COUNT"],
    rowHeight: app_core_constants__WEBPACK_IMPORTED_MODULE_7__["GRID_CELL_HEIGHT"],
    draggableHandle: ".grid-drag-handle",
    layout: layout,
    onResize: onResize,
    onResizeStop: onResizeStop,
    onDragStop: onDragStop,
    onLayoutChange: onLayoutChange
  }, children);
}

var SizedReactLayoutGrid = react_sizeme__WEBPACK_IMPORTED_MODULE_4___default()({
  monitorWidth: true
})(GridWrapper);
var DashboardGrid =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DashboardGrid, _PureComponent);

  function DashboardGrid() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DashboardGrid);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DashboardGrid)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.panelRef = {};

    _this.onLayoutChange = function (newLayout) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = newLayout[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var newPos = _step.value;

          _this.panelMap[newPos.i].updateGridPos(newPos);
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

      _this.props.dashboard.sortPanelsByGridPos(); // Call render() after any changes.  This is called when the layour loads


      _this.forceUpdate();
    };

    _this.triggerForceUpdate = function () {
      _this.forceUpdate();
    };

    _this.onWidthChange = function () {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _this.props.dashboard.panels[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var panel = _step2.value;
          panel.resizeDone();
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
    };

    _this.updateGridPos = function (item, layout) {
      _this.panelMap[item.i].updateGridPos(item); // react-grid-layout has a bug (#670), and onLayoutChange() is only called when the component is mounted.
      // So it's required to call it explicitly when panel resized or moved to save layout changes.


      _this.onLayoutChange(layout);
    };

    _this.onResize = function (layout, oldItem, newItem) {
      _this.panelMap[newItem.i].updateGridPos(newItem);
    };

    _this.onResizeStop = function (layout, oldItem, newItem) {
      _this.updateGridPos(newItem, layout);

      _this.panelMap[newItem.i].resizeDone();
    };

    _this.onDragStop = function (layout, oldItem, newItem) {
      _this.updateGridPos(newItem, layout);
    };

    _this.isInView = function (panel) {
      if (panel.isViewing || panel.isEditing) {
        return true;
      } // elem is set *after* the first render


      var elem = _this.panelRef[panel.id.toString()];

      if (!elem) {
        // NOTE the gridPos is also not valid until after the first render
        // since it is passed to the layout engine and made to be valid
        // for example, you can have Y=0 for everything and it will stack them
        // down vertically in the second call
        return false;
      }

      var top = elem.offsetTop;
      var height = panel.gridPos.h * app_core_constants__WEBPACK_IMPORTED_MODULE_7__["GRID_CELL_HEIGHT"] + 40;
      var bottom = top + height; // Show things that are almost in the view

      var buffer = 250;
      var viewTop = _this.props.scrollTop;

      if (viewTop > bottom + buffer) {
        return false; // The panel is above the viewport
      } // Use the whole browser height (larger than real value)
      // TODO? is there a better way


      var viewHeight = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
      var viewBot = viewTop + viewHeight;

      if (top > viewBot + buffer) {
        return false;
      }

      return !_this.props.dashboard.otherPanelInFullscreen(panel);
    };

    return _this;
  }

  _createClass(DashboardGrid, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var dashboard = this.props.dashboard;
      dashboard.on(_state_PanelModel__WEBPACK_IMPORTED_MODULE_10__["panelAdded"], this.triggerForceUpdate);
      dashboard.on(_state_PanelModel__WEBPACK_IMPORTED_MODULE_10__["panelRemoved"], this.triggerForceUpdate);
      dashboard.on(app_types__WEBPACK_IMPORTED_MODULE_9__["CoreEvents"].repeatsProcessed, this.triggerForceUpdate);
      dashboard.on(app_types__WEBPACK_IMPORTED_MODULE_9__["CoreEvents"].rowCollapsed, this.triggerForceUpdate);
      dashboard.on(app_types__WEBPACK_IMPORTED_MODULE_9__["CoreEvents"].rowExpanded, this.triggerForceUpdate);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var dashboard = this.props.dashboard;
      dashboard.off(_state_PanelModel__WEBPACK_IMPORTED_MODULE_10__["panelAdded"], this.triggerForceUpdate);
      dashboard.off(_state_PanelModel__WEBPACK_IMPORTED_MODULE_10__["panelRemoved"], this.triggerForceUpdate);
      dashboard.off(app_types__WEBPACK_IMPORTED_MODULE_9__["CoreEvents"].repeatsProcessed, this.triggerForceUpdate);
      dashboard.off(app_types__WEBPACK_IMPORTED_MODULE_9__["CoreEvents"].rowCollapsed, this.triggerForceUpdate);
      dashboard.off(app_types__WEBPACK_IMPORTED_MODULE_9__["CoreEvents"].rowExpanded, this.triggerForceUpdate);
    }
  }, {
    key: "buildLayout",
    value: function buildLayout() {
      var layout = [];
      this.panelMap = {};
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.props.dashboard.panels[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var panel = _step3.value;
          var stringId = panel.id.toString();
          this.panelMap[stringId] = panel;

          if (!panel.gridPos) {
            console.log('panel without gridpos');
            continue;
          }

          var panelPos = {
            i: stringId,
            x: panel.gridPos.x,
            y: panel.gridPos.y,
            w: panel.gridPos.w,
            h: panel.gridPos.h
          };

          if (panel.type === 'row') {
            panelPos.w = app_core_constants__WEBPACK_IMPORTED_MODULE_7__["GRID_COLUMN_COUNT"];
            panelPos.h = 1;
            panelPos.isResizable = false;
            panelPos.isDraggable = panel.collapsed;
          }

          layout.push(panelPos);
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

      return layout;
    }
  }, {
    key: "renderPanels",
    value: function renderPanels() {
      var _this2 = this;

      var panelElements = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        var _loop = function _loop() {
          var panel = _step4.value;
          var panelClasses = classnames__WEBPACK_IMPORTED_MODULE_3___default()({
            'react-grid-item--fullscreen': panel.isViewing
          });
          var id = panel.id.toString();
          panel.isInView = _this2.isInView(panel);
          panelElements.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            key: id,
            className: panelClasses,
            id: 'panel-' + id,
            ref: function ref(elem) {
              return elem && (_this2.panelRef[id] = elem);
            }
          }, _this2.renderPanel(panel)));
        };

        for (var _iterator4 = this.props.dashboard.panels[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          _loop();
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

      return panelElements;
    }
  }, {
    key: "renderPanel",
    value: function renderPanel(panel) {
      if (panel.type === 'row') {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_DashboardRow__WEBPACK_IMPORTED_MODULE_6__["DashboardRow"], {
          panel: panel,
          dashboard: this.props.dashboard
        });
      }

      if (panel.type === 'add-panel') {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AddPanelWidget__WEBPACK_IMPORTED_MODULE_5__["AddPanelWidget"], {
          panel: panel,
          dashboard: this.props.dashboard
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DashboardPanel__WEBPACK_IMPORTED_MODULE_8__["DashboardPanel"], {
        panel: panel,
        dashboard: this.props.dashboard,
        isEditing: panel.isEditing,
        isViewing: panel.isViewing,
        isInView: panel.isInView
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          dashboard = _this$props.dashboard,
          viewPanel = _this$props.viewPanel;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SizedReactLayoutGrid, {
        className: classnames__WEBPACK_IMPORTED_MODULE_3___default()({
          layout: true
        }),
        layout: this.buildLayout(),
        isResizable: dashboard.meta.canEdit,
        isDraggable: dashboard.meta.canEdit,
        onLayoutChange: this.onLayoutChange,
        onWidthChange: this.onWidthChange,
        onDragStop: this.onDragStop,
        onResize: this.onResize,
        onResizeStop: this.onResizeStop,
        viewPanel: viewPanel
      }, this.renderPanels());
    }
  }]);

  return DashboardGrid;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module)(DashboardGrid));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/QueriesTab.tsx":
/*!*******************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/QueriesTab.tsx ***!
  \*******************************************************************/
/*! exports provided: QueriesTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueriesTab", function() { return QueriesTab; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/components/Select/DataSourcePicker */ "./public/app/core/components/Select/DataSourcePicker.tsx");
/* harmony import */ var _QueryOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QueryOptions */ "./public/app/features/dashboard/panel_editor/QueryOptions.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _QueryEditorRows__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./QueryEditorRows */ "./public/app/features/dashboard/panel_editor/QueryEditorRows.tsx");
/* harmony import */ var app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/features/plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_components_PluginHelp_PluginHelp__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/components/PluginHelp/PluginHelp */ "./public/app/core/components/PluginHelp/PluginHelp.tsx");
/* harmony import */ var app_core_utils_query__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/utils/query */ "./public/app/core/utils/query.ts");
/* harmony import */ var app_plugins_datasource_dashboard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/plugins/datasource/dashboard */ "./public/app/plugins/datasource/dashboard/index.ts");
/* harmony import */ var app_features_expressions_ExpressionDatasource__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/features/expressions/ExpressionDatasource */ "./public/app/features/expressions/ExpressionDatasource.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n      padding-bottom: 16px;\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n      flex-grow: 1;\n      margin-right: ", ";\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      margin-right: ", ";\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      margin-bottom: ", ";\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      display: flex;\n      flex-direction: column;\n      height: 100%;\n      padding: ", ";\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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

// Libraries
 // Components





 // Services



 // Types








var QueriesTab =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(QueriesTab, _PureComponent);

  function QueriesTab() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, QueriesTab);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(QueriesTab)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.datasources = Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_6__["getDatasourceSrv"])().getMetricSources();
    _this.backendSrv = app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_7__["backendSrv"];
    _this.state = {
      isLoadingHelp: false,
      dataSourceItem: _this.findCurrentDataSource(),
      helpContent: null,
      isPickerOpen: false,
      isAddingMixed: false,
      isHelpOpen: false,
      scrollTop: 0,
      data: {
        state: _grafana_data__WEBPACK_IMPORTED_MODULE_9__["LoadingState"].NotStarted,
        series: [],
        timeRange: _grafana_data__WEBPACK_IMPORTED_MODULE_9__["DefaultTimeRange"]
      }
    };

    _this.onChangeDataSource =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(newDsItem) {
        var panel, dataSourceItem, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, target, dataSource;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                panel = _this.props.panel;
                dataSourceItem = _this.state.dataSourceItem; // switching to mixed

                if (!newDsItem.meta.mixed) {
                  _context.next = 6;
                  break;
                }

                // Set the datasource on all targets
                panel.targets.forEach(function (target) {
                  if (target.datasource !== app_features_expressions_ExpressionDatasource__WEBPACK_IMPORTED_MODULE_13__["ExpressionDatasourceID"]) {
                    target.datasource = panel.datasource;

                    if (!target.datasource) {
                      target.datasource = app_core_config__WEBPACK_IMPORTED_MODULE_8__["default"].defaultDatasource;
                    }
                  }
                });
                _context.next = 30;
                break;

              case 6:
                if (!dataSourceItem) {
                  _context.next = 30;
                  break;
                }

                if (!dataSourceItem.meta.mixed) {
                  _context.next = 29;
                  break;
                }

                // Remove the explicit datasource
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 11;

                for (_iterator = panel.targets[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  target = _step.value;

                  if (target.datasource !== app_features_expressions_ExpressionDatasource__WEBPACK_IMPORTED_MODULE_13__["ExpressionDatasourceID"]) {
                    delete target.datasource;
                  }
                }

                _context.next = 19;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](11);
                _didIteratorError = true;
                _iteratorError = _context.t0;

              case 19:
                _context.prev = 19;
                _context.prev = 20;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 22:
                _context.prev = 22;

                if (!_didIteratorError) {
                  _context.next = 25;
                  break;
                }

                throw _iteratorError;

              case 25:
                return _context.finish(22);

              case 26:
                return _context.finish(19);

              case 27:
                _context.next = 30;
                break;

              case 29:
                if (dataSourceItem.meta.id !== newDsItem.meta.id) {
                  // we are changing data source type, clear queries
                  panel.targets = [{
                    refId: 'A'
                  }];
                }

              case 30:
                _context.next = 32;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getDataSourceSrv"])().get(newDsItem.value);

              case 32:
                dataSource = _context.sent;
                panel.datasource = newDsItem.value;

                _this.setState({
                  dataSourceItem: newDsItem,
                  dataSource: dataSource,
                  dataSourceError: undefined
                }, function () {
                  return panel.refresh();
                });

              case 35:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[11, 15, 19, 27], [20,, 22, 26]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.openQueryInspector = function () {
      var panel = _this.props.panel;
      Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getLocationSrv"])().update({
        query: {
          inspect: panel.id,
          inspectTab: 'query'
        },
        partial: true
      });
    };

    _this.renderHelp = function () {
      return;
    };

    _this.onUpdateQueries = function (queries) {
      _this.props.panel.targets = queries;

      _this.forceUpdate();
    };

    _this.onAddQueryClick = function () {
      if (_this.state.dataSourceItem.meta.mixed) {
        _this.setState({
          isAddingMixed: true
        });

        return;
      }

      _this.onUpdateQueries(Object(app_core_utils_query__WEBPACK_IMPORTED_MODULE_11__["addQuery"])(_this.props.panel.targets));

      _this.onScrollBottom();
    };

    _this.onAddExpressionClick = function () {
      _this.onUpdateQueries(Object(app_core_utils_query__WEBPACK_IMPORTED_MODULE_11__["addQuery"])(_this.props.panel.targets, app_features_expressions_ExpressionDatasource__WEBPACK_IMPORTED_MODULE_13__["expressionDatasource"].newQuery()));

      _this.onScrollBottom();
    };

    _this.onScrollBottom = function () {
      _this.setState({
        scrollTop: 1000
      });
    };

    _this.onOpenHelp = function () {
      _this.setState({
        isHelpOpen: true
      });
    };

    _this.onCloseHelp = function () {
      _this.setState({
        isHelpOpen: false
      });
    };

    _this.renderMixedPicker = function () {
      // We cannot filter on mixed flag as some mixed data sources like external plugin
      // meta queries data source is mixed but also supports it's own queries
      var filteredDsList = _this.datasources.filter(function (ds) {
        return ds.meta.id !== 'mixed';
      });

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_1__["DataSourcePicker"], {
        datasources: filteredDsList,
        onChange: _this.onAddMixedQuery,
        current: null,
        autoFocus: true,
        onBlur: _this.onMixedPickerBlur,
        openMenuOnFocus: true
      });
    };

    _this.onAddMixedQuery = function (datasource) {
      _this.props.panel.targets = Object(app_core_utils_query__WEBPACK_IMPORTED_MODULE_11__["addQuery"])(_this.props.panel.targets, {
        datasource: datasource.name
      });

      _this.setState({
        isAddingMixed: false,
        scrollTop: _this.state.scrollTop + 10000
      });

      _this.forceUpdate();
    };

    _this.onMixedPickerBlur = function () {
      _this.setState({
        isAddingMixed: false
      });
    };

    _this.onQueryChange = function (query, index) {
      _this.props.panel.changeQuery(query, index);

      _this.forceUpdate();
    };

    _this.setScrollTop = function (event) {
      var target = event.target;

      _this.setState({
        scrollTop: target.scrollTop
      });
    };

    return _this;
  }

  _createClass(QueriesTab, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var panel, queryRunner, ds, _ds, dataSourceItem;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                panel = this.props.panel;
                queryRunner = panel.getQueryRunner();
                this.querySubscription = queryRunner.getData({
                  withTransforms: false,
                  withFieldConfig: false
                }).subscribe({
                  next: function next(data) {
                    return _this2.onPanelDataUpdate(data);
                  }
                });
                _context2.prev = 3;
                _context2.next = 6;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getDataSourceSrv"])().get(panel.datasource);

              case 6:
                ds = _context2.sent;
                this.setState({
                  dataSource: ds
                });
                _context2.next = 17;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](3);
                _context2.next = 14;
                return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getDataSourceSrv"])().get();

              case 14:
                _ds = _context2.sent;
                dataSourceItem = this.findCurrentDataSource(_ds.name);
                this.setState({
                  dataSource: _ds,
                  dataSourceError: _context2.t0 === null || _context2.t0 === void 0 ? void 0 : _context2.t0.message,
                  dataSourceItem: dataSourceItem
                });

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 10]]);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.querySubscription) {
        this.querySubscription.unsubscribe();
        this.querySubscription = null;
      }
    }
  }, {
    key: "onPanelDataUpdate",
    value: function onPanelDataUpdate(data) {
      this.setState({
        data: data
      });
    }
  }, {
    key: "findCurrentDataSource",
    value: function findCurrentDataSource() {
      var dataSourceName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.panel.datasource;
      return this.datasources.find(function (datasource) {
        return datasource.value === dataSourceName;
      }) || this.datasources[0];
    }
  }, {
    key: "renderTopSection",
    value: function renderTopSection(styles) {
      var panel = this.props.panel;
      var _this$state = this.state,
          dataSourceItem = _this$state.dataSourceItem,
          data = _this$state.data,
          dataSource = _this$state.dataSource,
          dataSourceError = _this$state.dataSourceError;

      if (!dataSource) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.dataSourceRow
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.dataSourceRowItem
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Field"], {
        invalid: !!dataSourceError,
        error: dataSourceError
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_1__["DataSourcePicker"], {
        datasources: this.datasources,
        onChange: this.onChangeDataSource,
        current: dataSourceItem
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.dataSourceRowItem
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        variant: "secondary",
        icon: "question-circle",
        title: "\u6253\u5F00\u6570\u636E\u6E90\u5E2E\u52A9",
        onClick: this.onOpenHelp
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.dataSourceRowItemOptions
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_QueryOptions__WEBPACK_IMPORTED_MODULE_2__["QueryOptions"], {
        panel: panel,
        dataSource: dataSource,
        data: data
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.dataSourceRowItem
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        variant: "secondary",
        onClick: this.openQueryInspector,
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_15__["selectors"].components.QueryTab.queryInspectorButton
      }, "\u67E5\u8BE2\u68C0\u67E5\u5668"))));
    }
  }, {
    key: "renderQueries",
    value: function renderQueries() {
      var _this3 = this;

      var _this$props = this.props,
          panel = _this$props.panel,
          dashboard = _this$props.dashboard;
      var _this$state2 = this.state,
          dataSourceItem = _this$state2.dataSourceItem,
          data = _this$state2.data;

      if (Object(app_plugins_datasource_dashboard__WEBPACK_IMPORTED_MODULE_12__["isSharedDashboardQuery"])(dataSourceItem.name)) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_plugins_datasource_dashboard__WEBPACK_IMPORTED_MODULE_12__["DashboardQueryEditor"], {
          panel: panel,
          panelData: data,
          onChange: function onChange(query) {
            return _this3.onUpdateQueries([query]);
          }
        });
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_15__["selectors"].components.QueryTab.content
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_QueryEditorRows__WEBPACK_IMPORTED_MODULE_5__["QueryEditorRows"], {
        queries: panel.targets,
        datasource: dataSourceItem,
        onChangeQueries: this.onUpdateQueries,
        onScrollBottom: this.onScrollBottom,
        panel: panel,
        dashboard: dashboard,
        data: data
      }));
    }
  }, {
    key: "renderAddQueryRow",
    value: function renderAddQueryRow() {
      var _this$state3 = this.state,
          dataSourceItem = _this$state3.dataSourceItem,
          isAddingMixed = _this$state3.isAddingMixed;
      var showAddButton = !(isAddingMixed || Object(app_plugins_datasource_dashboard__WEBPACK_IMPORTED_MODULE_12__["isSharedDashboardQuery"])(dataSourceItem.name));
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["HorizontalGroup"], {
        spacing: "md",
        align: "flex-start"
      }, showAddButton && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        icon: "plus",
        onClick: this.onAddQueryClick,
        variant: "secondary",
        "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_15__["selectors"].components.QueryTab.addQuery
      }, "\u67E5\u8BE2"), isAddingMixed && this.renderMixedPicker(), app_core_config__WEBPACK_IMPORTED_MODULE_8__["default"].featureToggles.expressions && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        icon: "plus",
        onClick: this.onAddExpressionClick,
        variant: "secondary"
      }, "\u8868\u8FBE\u5F0F"));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state4 = this.state,
          scrollTop = _this$state4.scrollTop,
          isHelpOpen = _this$state4.isHelpOpen;
      var styles = getStyles();
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["CustomScrollbar"], {
        autoHeightMin: "100%",
        autoHide: true,
        updateAfterMountMs: 300,
        scrollTop: scrollTop,
        setScrollTop: this.setScrollTop
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.innerWrapper
      }, this.renderTopSection(styles), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.queriesWrapper
      }, this.renderQueries()), this.renderAddQueryRow(), isHelpOpen && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Modal"], {
        title: "\u6570\u636E\u6E90\u5E2E\u52A9",
        isOpen: true,
        onDismiss: this.onCloseHelp
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_PluginHelp_PluginHelp__WEBPACK_IMPORTED_MODULE_10__["PluginHelp"], {
        plugin: this.state.dataSourceItem.meta,
        type: "query_help"
      }))));
    }
  }]);

  return QueriesTab;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["stylesFactory"])(function () {
  var theme = app_core_config__WEBPACK_IMPORTED_MODULE_8__["default"].theme;
  return {
    innerWrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_14__["css"])(_templateObject(), theme.spacing.md),
    dataSourceRow: Object(emotion__WEBPACK_IMPORTED_MODULE_14__["css"])(_templateObject2(), theme.spacing.md),
    dataSourceRowItem: Object(emotion__WEBPACK_IMPORTED_MODULE_14__["css"])(_templateObject3(), theme.spacing.inlineFormMargin),
    dataSourceRowItemOptions: Object(emotion__WEBPACK_IMPORTED_MODULE_14__["css"])(_templateObject4(), theme.spacing.inlineFormMargin),
    queriesWrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_14__["css"])(_templateObject5())
  };
});

/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/QueryEditorRows.tsx":
/*!************************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/QueryEditorRows.tsx ***!
  \************************************************************************/
/*! exports provided: QueryEditorRows */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryEditorRows", function() { return QueryEditorRows; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _QueryEditorRow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QueryEditorRow */ "./public/app/features/dashboard/panel_editor/QueryEditorRow.tsx");
/* harmony import */ var app_core_utils_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/utils/query */ "./public/app/core/utils/query.ts");
/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-beautiful-dnd */ "./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Libraries
 // Types




var QueryEditorRows =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(QueryEditorRows, _PureComponent);

  function QueryEditorRows() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, QueryEditorRows);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(QueryEditorRows)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onAddQuery = function (query) {
      var _this$props = _this.props,
          queries = _this$props.queries,
          onChangeQueries = _this$props.onChangeQueries;
      onChangeQueries(Object(app_core_utils_query__WEBPACK_IMPORTED_MODULE_2__["addQuery"])(queries, query));

      _this.props.onScrollBottom();
    };

    _this.onRemoveQuery = function (query) {
      var _this$props2 = _this.props,
          queries = _this$props2.queries,
          onChangeQueries = _this$props2.onChangeQueries,
          panel = _this$props2.panel;
      var removed = queries.filter(function (q) {
        return q !== query;
      });
      onChangeQueries(removed);
      panel.refresh();
    };

    _this.onDragEnd = function (result) {
      var _this$props3 = _this.props,
          queries = _this$props3.queries,
          onChangeQueries = _this$props3.onChangeQueries,
          panel = _this$props3.panel;

      if (!result || !result.destination) {
        return;
      }

      var startIndex = result.source.index;
      var endIndex = result.destination.index;

      if (startIndex === endIndex) {
        return;
      }

      var update = Array.from(queries);

      var _update$splice = update.splice(startIndex, 1),
          _update$splice2 = _slicedToArray(_update$splice, 1),
          removed = _update$splice2[0];

      update.splice(endIndex, 0, removed);
      onChangeQueries(update);
      panel.refresh();
    };

    return _this;
  }

  _createClass(QueryEditorRows, [{
    key: "onChangeQuery",
    value: function onChangeQuery(query, index) {
      var _this$props4 = this.props,
          queries = _this$props4.queries,
          onChangeQueries = _this$props4.onChangeQueries;
      var old = queries[index]; // ensure refId & datasource are maintained

      query.refId = old.refId;

      if (old.datasource) {
        query.datasource = old.datasource;
      } // update query in array


      onChangeQueries(queries.map(function (item, itemIndex) {
        if (itemIndex === index) {
          return query;
        }

        return item;
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_3__["DragDropContext"], {
        onDragEnd: this.onDragEnd
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_3__["Droppable"], {
        droppableId: "transformations-list",
        direction: "vertical"
      }, function (provided) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({
          ref: provided.innerRef
        }, provided.droppableProps), props.queries.map(function (query, index) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_QueryEditorRow__WEBPACK_IMPORTED_MODULE_1__["QueryEditorRow"], {
            dataSourceValue: query.datasource || props.datasource.value,
            id: query.refId,
            index: index,
            key: query.refId,
            panel: props.panel,
            dashboard: props.dashboard,
            data: props.data,
            query: query,
            onChange: function onChange(query) {
              return _this2.onChangeQuery(query, index);
            },
            onRemoveQuery: _this2.onRemoveQuery,
            onAddQuery: _this2.onAddQuery,
            inMixedMode: props.datasource.meta.mixed
          });
        }), provided.placeholder);
      }));
    }
  }]);

  return QueryEditorRows;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/QueryOptions.tsx":
/*!*********************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/QueryOptions.tsx ***!
  \*********************************************************************/
/*! exports provided: QueryOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryOptions", function() { return QueryOptions; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_QueryOperationRow_QueryOperationRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/QueryOperationRow/QueryOperationRow */ "./public/app/core/components/QueryOperationRow/QueryOperationRow.tsx");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      margin-left: ", ";\n      font-size: ", ";\n      color: ", ";\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Libraries
 // Utils

 // Components


var Switch = _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LegacyForms"].Switch,
    Input = _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LegacyForms"].Input; // Types





var timeRangeValidationEvents = _defineProperty({}, _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["EventsWithValidation"].onBlur, [{
  rule: function rule(value) {
    if (!value) {
      return true;
    }

    return _grafana_data__WEBPACK_IMPORTED_MODULE_1__["rangeUtil"].isValidTimeSpan(value);
  },
  errorMessage: '无效的时间跨度'
}]);

var emptyToNull = function emptyToNull(value) {
  return value === '' ? null : value;
};

var QueryOptions =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(QueryOptions, _PureComponent);

  function QueryOptions(props) {
    var _props$panel$maxDataP;

    var _this;

    _classCallCheck(this, QueryOptions);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(QueryOptions).call(this, props));

    _this.onRelativeTimeChange = function (event) {
      _this.setState({
        relativeTime: event.target.value
      });
    };

    _this.onTimeShiftChange = function (event) {
      _this.setState({
        timeShift: event.target.value
      });
    };

    _this.onOverrideTime = function (event, status) {
      var value = event.target.value;
      var panel = _this.props.panel;
      var emptyToNullValue = emptyToNull(value);

      if (status === _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LegacyInputStatus"].Valid && panel.timeFrom !== emptyToNullValue) {
        panel.timeFrom = emptyToNullValue;
        panel.refresh();
      }
    };

    _this.onTimeShift = function (event, status) {
      var value = event.target.value;
      var panel = _this.props.panel;
      var emptyToNullValue = emptyToNull(value);

      if (status === _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LegacyInputStatus"].Valid && panel.timeShift !== emptyToNullValue) {
        panel.timeShift = emptyToNullValue;
        panel.refresh();
      }
    };

    _this.onToggleTimeOverride = function () {
      var panel = _this.props.panel;

      _this.setState({
        hideTimeOverride: !_this.state.hideTimeOverride
      }, function () {
        panel.hideTimeOverride = _this.state.hideTimeOverride;
        panel.refresh();
      });
    };

    _this.onDataSourceOptionBlur = function (panelKey) {
      return function () {
        var panel = _this.props.panel; // @ts-ignore

        panel[panelKey] = _this.state[panelKey];
        panel.refresh();
      };
    };

    _this.onDataSourceOptionChange = function (panelKey) {
      return function (event) {
        _this.setState(_objectSpread({}, _this.state, _defineProperty({}, panelKey, event.target.value)));
      };
    };

    _this.onMaxDataPointsBlur = function () {
      var panel = _this.props.panel;
      var maxDataPoints = parseInt(_this.state.maxDataPoints, 10);

      if (isNaN(maxDataPoints)) {
        delete panel.maxDataPoints;
      } else {
        panel.maxDataPoints = maxDataPoints;
      }

      panel.refresh();
    };

    _this.onOpenOptions = function () {
      _this.setState({
        isOpen: true
      });
    };

    _this.onCloseOptions = function () {
      _this.setState({
        isOpen: false
      });
    };

    _this.state = {
      relativeTime: props.panel.timeFrom || '',
      timeShift: props.panel.timeShift || '',
      cacheTimeout: props.panel.cacheTimeout || '',
      maxDataPoints: (_props$panel$maxDataP = props.panel.maxDataPoints) !== null && _props$panel$maxDataP !== void 0 ? _props$panel$maxDataP : '',
      interval: props.panel.interval || '',
      hideTimeOverride: props.panel.hideTimeOverride || false,
      isOpen: false
    };
    return _this;
  }

  _createClass(QueryOptions, [{
    key: "renderCacheTimeoutOption",
    value: function renderCacheTimeoutOption() {
      var _dataSource$meta$quer;

      var dataSource = this.props.dataSource;
      var cacheTimeout = this.state.cacheTimeout;
      var tooltip = "\u5982\u679C\u60A8\u7684\u65F6\u95F4\u5E8F\u5217\u5B58\u50A8\u533A\u5177\u6709\u67E5\u8BE2\u7F13\u5B58\uFF0C\u5219\u6B64\u9009\u9879\u53EF\u4EE5\u8986\u76D6\u9ED8\u8BA4\u7684\u7F13\u5B58\u8D85\u65F6\u3002 \u4EE5\u79D2\u4E3A\u5355\u4F4D\u6307\u5B9A\u4E00\u4E2A\u6570\u503C\u3002";

      if (!((_dataSource$meta$quer = dataSource.meta.queryOptions) === null || _dataSource$meta$quer === void 0 ? void 0 : _dataSource$meta$quer.cacheTimeout)) {
        return null;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
        width: 9,
        tooltip: tooltip
      }, "Cache timeout"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        type: "text",
        className: "width-6",
        placeholder: "60",
        name: name,
        spellCheck: false,
        onBlur: this.onDataSourceOptionBlur('cacheTimeout'),
        onChange: this.onDataSourceOptionChange('cacheTimeout'),
        value: cacheTimeout
      })));
    }
  }, {
    key: "renderMaxDataPointsOption",
    value: function renderMaxDataPointsOption() {
      var _data$request;

      var data = this.props.data;
      var maxDataPoints = this.state.maxDataPoints;
      var realMd = (_data$request = data.request) === null || _data$request === void 0 ? void 0 : _data$request.maxDataPoints;
      var isAuto = maxDataPoints === '';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
        width: 9,
        tooltip: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "\u6BCF\u4E2A\u5E8F\u5217\u7684\u6700\u5927\u6570\u636E\u70B9\u3002 \u7531\u67D0\u4E9B\u6570\u636E\u6E90\u76F4\u63A5\u4F7F\u7528\uFF0C\u5E76\u7528\u4E8E\u81EA\u52A8\u95F4\u9694\u7684\u8BA1\u7B97\u3002 \u5BF9\u4E8E\u6D41\u6570\u636E\uFF0C\u6B64\u503C\u5C06\u7528\u4E8E\u6EDA\u52A8\u7F13\u51B2\u533A\u3002")
      }, "\u6700\u5927\u6570\u636E\u70B9"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        type: "number",
        className: "width-6",
        placeholder: "".concat(realMd),
        name: name,
        spellCheck: false,
        onBlur: this.onMaxDataPointsBlur,
        onChange: this.onDataSourceOptionChange('maxDataPoints'),
        value: maxDataPoints
      }), isAuto && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-label query-segment-operator"
      }, "="), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-label"
      }, "\u9762\u677F\u5BBD\u5EA6"))));
    }
  }, {
    key: "renderIntervalOption",
    value: function renderIntervalOption() {
      var _data$request2, _dataSource$interval;

      var _this$props = this.props,
          data = _this$props.data,
          dataSource = _this$props.dataSource;
      var interval = this.state.interval;
      var realInterval = (_data$request2 = data.request) === null || _data$request2 === void 0 ? void 0 : _data$request2.interval;
      var minIntervalOnDs = (_dataSource$interval = dataSource.interval) !== null && _dataSource$interval !== void 0 ? _dataSource$interval : 'No limit';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
        width: 9,
        tooltip: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "\u95F4\u9694\u7684\u4E0B\u9650\u3002 \u5EFA\u8BAE\u8BBE\u7F6E\u4E3A\u5199\u5165\u9891\u7387\uFF0C\u4F8B\u5982\uFF0C\u5982\u679C\u6BCF\u5206\u949F\u5199\u5165\u4E00\u6B21\u6570\u636E\uFF0C\u5219\u4E3A", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, " 1m "), " ", '', "\u3002 \u53EF\u4EE5\u5728\u5927\u591A\u6570\u6570\u636E\u6E90\u7684\u6570\u636E\u6E90\u8BBE\u7F6E\u4E2D\u8BBE\u7F6E\u9ED8\u8BA4\u503C\u3002")
      }, "\u6700\u5C0F\u95F4\u9694"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        type: "text",
        className: "width-6",
        placeholder: "".concat(minIntervalOnDs),
        name: name,
        spellCheck: false,
        onBlur: this.onDataSourceOptionBlur('interval'),
        onChange: this.onDataSourceOptionChange('interval'),
        value: interval
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
        width: 9,
        tooltip: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "\u53D1\u9001\u5230\u6570\u636E\u6E90\u5E76\u5728", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, " $ __ interval "), "\u548C", '', " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, " $ __ interval_ms "), "\u4E2D\u4F7F\u7528\u7684\u8BC4\u4F30\u95F4\u9694")
      }, "\u95F4\u9694"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
        width: 6
      }, realInterval), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-label query-segment-operator"
      }, "="), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-label"
      }, "\u6700\u5927\u6570\u636E\u70B9/\u65F6\u95F4\u8303\u56F4"))));
    }
  }, {
    key: "renderCollapsedText",
    value: function renderCollapsedText(styles) {
      var data = this.props.data;
      var _this$state = this.state,
          isOpen = _this$state.isOpen,
          maxDataPoints = _this$state.maxDataPoints,
          interval = _this$state.interval;

      if (isOpen) {
        return undefined;
      }

      var mdDesc = maxDataPoints;

      if (maxDataPoints === '' && data.request) {
        mdDesc = "auto = ".concat(data.request.maxDataPoints);
      }

      var intervalDesc = interval;

      if (data.request) {
        intervalDesc = "".concat(data.request.interval);
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.collapsedText
      }, "MD = ", mdDesc), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: styles.collapsedText
      }, "Interval = ", intervalDesc));
    }
  }, {
    key: "render",
    value: function render() {
      var hideTimeOverride = this.state.hideTimeOverride;
      var _this$state2 = this.state,
          relativeTime = _this$state2.relativeTime,
          timeShift = _this$state2.timeShift,
          isOpen = _this$state2.isOpen;
      var styles = getStyles();
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_QueryOperationRow_QueryOperationRow__WEBPACK_IMPORTED_MODULE_3__["QueryOperationRow"], {
        id: "Query options",
        index: 0,
        title: "\u67E5\u8BE2\u9009\u9879",
        headerElement: this.renderCollapsedText(styles),
        isOpen: isOpen,
        onOpen: this.onOpenOptions,
        onClose: this.onCloseOptions
      }, this.renderMaxDataPointsOption(), this.renderIntervalOption(), this.renderCacheTimeoutOption(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["InlineFormLabel"], {
        width: 9
      }, "\u76F8\u5BF9\u65F6\u95F4"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        type: "text",
        className: "width-6",
        placeholder: "1h",
        onChange: this.onRelativeTimeChange,
        onBlur: this.onOverrideTime,
        validationEvents: timeRangeValidationEvents,
        hideErrorMessage: true,
        value: relativeTime
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "gf-form-label width-9"
      }, "\u65F6\u79FB"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Input, {
        type: "text",
        className: "width-6",
        placeholder: "1h",
        onChange: this.onTimeShiftChange,
        onBlur: this.onTimeShift,
        validationEvents: timeRangeValidationEvents,
        hideErrorMessage: true,
        value: timeShift
      })), (timeShift || relativeTime) && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Switch, {
        label: "\u9690\u85CF\u65F6\u95F4\u4FE1\u606F",
        labelClass: "width-9",
        checked: hideTimeOverride,
        onChange: this.onToggleTimeOverride
      })));
    }
  }]);

  return QueryOptions;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function () {
  var theme = app_core_config__WEBPACK_IMPORTED_MODULE_4__["config"].theme;
  return {
    collapsedText: Object(emotion__WEBPACK_IMPORTED_MODULE_5__["css"])(_templateObject(), theme.spacing.md, theme.typography.size.sm, theme.colors.textWeak)
  };
});

/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/VizTypePicker.tsx":
/*!**********************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/VizTypePicker.tsx ***!
  \**********************************************************************/
/*! exports provided: getAllPanelPluginMeta, filterPluginList, VizTypePicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllPanelPluginMeta", function() { return getAllPanelPluginMeta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterPluginList", function() { return filterPluginList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VizTypePicker", function() { return VizTypePicker; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var _VizTypePickerPlugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VizTypePickerPlugin */ "./public/app/features/dashboard/panel_editor/VizTypePickerPlugin.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      max-width: 100%;\n      display: grid;\n      grid-gap: ", ";\n      grid-template-columns: repeat(auto-fit, minmax(116px, 1fr));\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







function getAllPanelPluginMeta() {
  var allPanels = app_core_config__WEBPACK_IMPORTED_MODULE_1__["default"].panels;
  return Object.keys(allPanels).filter(function (key) {
    return allPanels[key]['hideFromList'] === false;
  }).map(function (key) {
    return allPanels[key];
  }).sort(function (a, b) {
    return a.sort - b.sort;
  });
}
function filterPluginList(pluginsList, searchQuery, current) {
  if (!searchQuery.length) {
    return pluginsList.filter(function (p) {
      if (p.state === _grafana_data__WEBPACK_IMPORTED_MODULE_4__["PluginState"].deprecated) {
        return current.id === p.id;
      }

      return true;
    });
  }

  var query = searchQuery.toLowerCase();
  var first = [];
  var match = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = pluginsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (item.state === _grafana_data__WEBPACK_IMPORTED_MODULE_4__["PluginState"].deprecated && current.id !== item.id) {
        continue;
      }

      var name = item.name.toLowerCase();
      var idx = name.indexOf(query);

      if (idx === 0) {
        first.push(item);
      } else if (idx > 0) {
        match.push(item);
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

  return first.concat(match);
}
var VizTypePicker = function VizTypePicker(_ref) {
  var searchQuery = _ref.searchQuery,
      onTypeChange = _ref.onTypeChange,
      current = _ref.current;
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["useTheme"])();
  var styles = getStyles(theme);
  var pluginsList = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return getAllPanelPluginMeta();
  }, []);
  var getFilteredPluginList = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
    return filterPluginList(pluginsList, searchQuery, current);
  }, [searchQuery]);

  var renderVizPlugin = function renderVizPlugin(plugin, index) {
    var isCurrent = plugin.id === current.id;
    var filteredPluginList = getFilteredPluginList();
    var matchesQuery = filteredPluginList.indexOf(plugin) > -1;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VizTypePickerPlugin__WEBPACK_IMPORTED_MODULE_2__["default"], {
      disabled: !matchesQuery && !!searchQuery,
      key: plugin.id,
      isCurrent: isCurrent,
      plugin: plugin,
      onClick: function onClick() {
        return onTypeChange(plugin);
      }
    });
  };

  var filteredPluginList = getFilteredPluginList();
  var hasResults = filteredPluginList.length > 0;
  var renderList = filteredPluginList.concat(pluginsList.filter(function (p) {
    return filteredPluginList.indexOf(p) === -1;
  }));
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.grid
  }, hasResults ? renderList.map(function (plugin, index) {
    if (plugin.state === _grafana_data__WEBPACK_IMPORTED_MODULE_4__["PluginState"].deprecated) {
      return null;
    }

    return renderVizPlugin(plugin, index);
  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["EmptySearchResult"], null, "\u627E\u4E0D\u5230\u4E0E\u60A8\u7684\u67E5\u8BE2\u5339\u914D\u7684\u5185\u5BB9"));
};
VizTypePicker.displayName = 'VizTypePicker';
var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["stylesFactory"])(function (theme) {
  return {
    grid: Object(emotion__WEBPACK_IMPORTED_MODULE_5__["css"])(_templateObject(), theme.spacing.md)
  };
});

/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/VizTypePickerPlugin.tsx":
/*!****************************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/VizTypePickerPlugin.tsx ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n      position: absolute;\n      bottom: ", ";\n      right: ", ";\n      z-index: 1;\n    "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n      height: 55px;\n    "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n      text-overflow: ellipsis;\n      overflow: hidden;\n      white-space: nowrap;\n      font-size: ", ";\n      text-align: center;\n      height: 23px;\n      font-weight: ", ";\n      padding: 0 10px;\n      width: 100%;\n    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n      opacity: 0.2;\n      filter: grayscale(1);\n      cursor: default;\n      pointer-events: none;\n      &:hover {\n        border: 1px solid ", ";\n      }\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n      label: currentVisualizationItem;\n      > div:first-child {\n        ", ";\n      }\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n      position: relative;\n      z-index: 1;\n      width: 100%;\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      flex-shrink: 0;\n      flex-direction: column;\n      text-align: center;\n      cursor: pointer;\n      display: flex;\n      margin-right: 10px;\n      align-items: center;\n      justify-content: center;\n      padding-bottom: 6px;\n      height: 100px;\n      width: 100%;\n      position: relative;\n\n      &:hover {\n        > div:first-child {\n          transform: scale(1.05);\n          border-color: ", ";\n        }\n      }\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background: ", ";\n      border: 1px solid ", ";\n      border-radius: 3px;\n      transform: scale(1);\n      transform-origin: center;\n      transition: all 0.1s ease-in;\n      z-index: 0;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      position: relative;\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var VizTypePickerPlugin = function VizTypePickerPlugin(_ref) {
  var _cx;

  var isCurrent = _ref.isCurrent,
      plugin = _ref.plugin,
      onClick = _ref.onClick,
      disabled = _ref.disabled;
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["useTheme"])();
  var styles = getStyles(theme);
  var cssClass = Object(emotion__WEBPACK_IMPORTED_MODULE_3__["cx"])((_cx = {}, _defineProperty(_cx, styles.item, true), _defineProperty(_cx, styles.disabled, disabled || plugin.state === _grafana_data__WEBPACK_IMPORTED_MODULE_1__["PluginState"].deprecated), _defineProperty(_cx, styles.current, isCurrent), _cx));
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.wrapper,
    "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_4__["selectors"].components.PluginVisualization.item(plugin.name)
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: cssClass,
    onClick: disabled ? function () {} : onClick,
    title: isCurrent ? '再次单击以关闭此部分' : plugin.name
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.bg
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.itemContent
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.name,
    title: plugin.name
  }, plugin.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: styles.img,
    src: plugin.info.logos.small
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["cx"])(styles.badge, disabled && styles.disabled)
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PanelPluginBadge, {
    plugin: plugin
  })));
};

VizTypePickerPlugin.displayName = 'VizTypePickerPlugin';
var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function (theme) {
  return {
    wrapper: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(_templateObject()),
    bg: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(_templateObject2(), theme.colors.bg2, theme.colors.border2),
    item: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(_templateObject3(), theme.colors.formFocusOutline),
    itemContent: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(_templateObject4()),
    current: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(_templateObject5(), _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["styleMixins"].focusCss(theme)),
    disabled: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(_templateObject6(), theme.colors.border2),
    name: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(_templateObject7(), theme.typography.size.sm, theme.typography.weight.semibold),
    img: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(_templateObject8()),
    badge: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(_templateObject9(), theme.spacing.xs, theme.spacing.xs)
  };
});
/* harmony default export */ __webpack_exports__["default"] = (VizTypePickerPlugin);

var PanelPluginBadge = function PanelPluginBadge(_ref2) {
  var plugin = _ref2.plugin;
  var display = getPanelStateBadgeDisplayModel(plugin);

  if (plugin.state !== _grafana_data__WEBPACK_IMPORTED_MODULE_1__["PluginState"].deprecated && plugin.state !== _grafana_data__WEBPACK_IMPORTED_MODULE_1__["PluginState"].alpha) {
    return null;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Badge"], {
    color: display.color,
    text: display.text,
    icon: display.icon,
    tooltip: display.tooltip
  });
};

function getPanelStateBadgeDisplayModel(panel) {
  switch (panel.state) {
    case _grafana_data__WEBPACK_IMPORTED_MODULE_1__["PluginState"].deprecated:
      return {
        text: '不推荐使用',
        icon: 'exclamation-triangle',
        color: 'red',
        tooltip: "".concat(panel.name, " \u9762\u677F\u5DF2\u5F03\u7528")
      };
  }

  return {
    text: 'Alpha',
    icon: 'rocket',
    color: 'blue',
    tooltip: "".concat(panel.name, " \u9762\u677F\u662F\u5B9E\u9A8C\u6027\u7684")
  };
}

PanelPluginBadge.displayName = 'PanelPluginBadge';

/***/ }),

/***/ "./public/app/features/dashboard/state/selectors.ts":
/*!**********************************************************!*\
  !*** ./public/app/features/dashboard/state/selectors.ts ***!
  \**********************************************************/
/*! exports provided: getPanelStateById */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPanelStateById", function() { return getPanelStateById; });
function getPanelStateById(state, panelId) {
  var _state$panels$panelId;

  if (!panelId) {
    return {};
  }

  return (_state$panels$panelId = state.panels[panelId]) !== null && _state$panels$panelId !== void 0 ? _state$panels$panelId : {};
}

/***/ }),

/***/ "./public/app/features/variables/pickers/PickerRenderer.tsx":
/*!******************************************************************!*\
  !*** ./public/app/features/variables/pickers/PickerRenderer.tsx ***!
  \******************************************************************/
/*! exports provided: PickerRenderer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PickerRenderer", function() { return PickerRenderer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types */ "./public/app/features/variables/types.ts");
/* harmony import */ var _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/e2e-selectors */ "./packages/grafana-e2e-selectors/src/index.ts");
/* harmony import */ var _adapters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../adapters */ "./public/app/features/variables/adapters.ts");




var PickerRenderer = function PickerRenderer(props) {
  var PickerToRender = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return _adapters__WEBPACK_IMPORTED_MODULE_3__["variableAdapters"].get(props.variable.type).picker;
  }, [props.variable]);
  var labelOrName = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return props.variable.label || props.variable.name;
  }, [props.variable]);

  if (!props.variable) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "\u65E0\u6CD5\u52A0\u8F7D\u53D8\u91CF");
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form"
  }, props.variable.hide === _types__WEBPACK_IMPORTED_MODULE_1__["VariableHide"].dontHide && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "gf-form-label gf-form-label--variable",
    "aria-label": _grafana_e2e_selectors__WEBPACK_IMPORTED_MODULE_2__["selectors"].pages.Dashboard.SubMenu.submenuItemLabels(labelOrName)
  }, labelOrName), props.variable.hide !== _types__WEBPACK_IMPORTED_MODULE_1__["VariableHide"].hideVariable && PickerToRender && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PickerToRender, {
    variable: props.variable
  }));
};

/***/ })

}]);
//# sourceMappingURL=DashboardPage.1ebdc265fc3bd7452fcd.js.map