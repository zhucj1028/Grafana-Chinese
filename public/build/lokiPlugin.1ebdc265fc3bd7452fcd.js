(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["lokiPlugin"],{

/***/ "./node_modules/charenc/charenc.js":
/*!*****************************************!*\
  !*** ./node_modules/charenc/charenc.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),

/***/ "./node_modules/crypt/crypt.js":
/*!*************************************!*\
  !*** ./node_modules/crypt/crypt.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/lodash/escapeRegExp.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/escapeRegExp.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
    reHasRegExpChar = RegExp(reRegExpChar.source);

/**
 * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
 * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = toString(string);
  return (string && reHasRegExpChar.test(string))
    ? string.replace(reRegExpChar, '\\$&')
    : string;
}

module.exports = escapeRegExp;


/***/ }),

/***/ "./node_modules/md5/md5.js":
/*!*********************************!*\
  !*** ./node_modules/md5/md5.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__(/*! crypt */ "./node_modules/crypt/crypt.js"),
      utf8 = __webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").utf8,
      isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js"),
      bin = __webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/dom/WebSocketSubject.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/dom/WebSocketSubject.js ***!
  \*****************************************************************************/
/*! exports provided: WebSocketSubject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebSocketSubject", function() { return WebSocketSubject; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/* harmony import */ var _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ReplaySubject */ "./node_modules/rxjs/_esm5/internal/ReplaySubject.js");
/** PURE_IMPORTS_START tslib,_.._Subject,_.._Subscriber,_.._Observable,_.._Subscription,_.._ReplaySubject PURE_IMPORTS_END */






var DEFAULT_WEBSOCKET_CONFIG = {
    url: '',
    deserializer: function (e) { return JSON.parse(e.data); },
    serializer: function (value) { return JSON.stringify(value); },
};
var WEBSOCKETSUBJECT_INVALID_ERROR_OBJECT = 'WebSocketSubject.error must be called with an object with an error code, and an optional reason: { code: number, reason: string }';
var WebSocketSubject = /*@__PURE__*/ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WebSocketSubject, _super);
    function WebSocketSubject(urlConfigOrSource, destination) {
        var _this = _super.call(this) || this;
        if (urlConfigOrSource instanceof _Observable__WEBPACK_IMPORTED_MODULE_3__["Observable"]) {
            _this.destination = destination;
            _this.source = urlConfigOrSource;
        }
        else {
            var config = _this._config = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, DEFAULT_WEBSOCKET_CONFIG);
            _this._output = new _Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
            if (typeof urlConfigOrSource === 'string') {
                config.url = urlConfigOrSource;
            }
            else {
                for (var key in urlConfigOrSource) {
                    if (urlConfigOrSource.hasOwnProperty(key)) {
                        config[key] = urlConfigOrSource[key];
                    }
                }
            }
            if (!config.WebSocketCtor && WebSocket) {
                config.WebSocketCtor = WebSocket;
            }
            else if (!config.WebSocketCtor) {
                throw new Error('no WebSocket constructor can be found');
            }
            _this.destination = new _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"]();
        }
        return _this;
    }
    WebSocketSubject.prototype.lift = function (operator) {
        var sock = new WebSocketSubject(this._config, this.destination);
        sock.operator = operator;
        sock.source = this;
        return sock;
    };
    WebSocketSubject.prototype._resetState = function () {
        this._socket = null;
        if (!this.source) {
            this.destination = new _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"]();
        }
        this._output = new _Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    };
    WebSocketSubject.prototype.multiplex = function (subMsg, unsubMsg, messageFilter) {
        var self = this;
        return new _Observable__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (observer) {
            try {
                self.next(subMsg());
            }
            catch (err) {
                observer.error(err);
            }
            var subscription = self.subscribe(function (x) {
                try {
                    if (messageFilter(x)) {
                        observer.next(x);
                    }
                }
                catch (err) {
                    observer.error(err);
                }
            }, function (err) { return observer.error(err); }, function () { return observer.complete(); });
            return function () {
                try {
                    self.next(unsubMsg());
                }
                catch (err) {
                    observer.error(err);
                }
                subscription.unsubscribe();
            };
        });
    };
    WebSocketSubject.prototype._connectSocket = function () {
        var _this = this;
        var _a = this._config, WebSocketCtor = _a.WebSocketCtor, protocol = _a.protocol, url = _a.url, binaryType = _a.binaryType;
        var observer = this._output;
        var socket = null;
        try {
            socket = protocol ?
                new WebSocketCtor(url, protocol) :
                new WebSocketCtor(url);
            this._socket = socket;
            if (binaryType) {
                this._socket.binaryType = binaryType;
            }
        }
        catch (e) {
            observer.error(e);
            return;
        }
        var subscription = new _Subscription__WEBPACK_IMPORTED_MODULE_4__["Subscription"](function () {
            _this._socket = null;
            if (socket && socket.readyState === 1) {
                socket.close();
            }
        });
        socket.onopen = function (e) {
            var _socket = _this._socket;
            if (!_socket) {
                socket.close();
                _this._resetState();
                return;
            }
            var openObserver = _this._config.openObserver;
            if (openObserver) {
                openObserver.next(e);
            }
            var queue = _this.destination;
            _this.destination = _Subscriber__WEBPACK_IMPORTED_MODULE_2__["Subscriber"].create(function (x) {
                if (socket.readyState === 1) {
                    try {
                        var serializer = _this._config.serializer;
                        socket.send(serializer(x));
                    }
                    catch (e) {
                        _this.destination.error(e);
                    }
                }
            }, function (e) {
                var closingObserver = _this._config.closingObserver;
                if (closingObserver) {
                    closingObserver.next(undefined);
                }
                if (e && e.code) {
                    socket.close(e.code, e.reason);
                }
                else {
                    observer.error(new TypeError(WEBSOCKETSUBJECT_INVALID_ERROR_OBJECT));
                }
                _this._resetState();
            }, function () {
                var closingObserver = _this._config.closingObserver;
                if (closingObserver) {
                    closingObserver.next(undefined);
                }
                socket.close();
                _this._resetState();
            });
            if (queue && queue instanceof _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"]) {
                subscription.add(queue.subscribe(_this.destination));
            }
        };
        socket.onerror = function (e) {
            _this._resetState();
            observer.error(e);
        };
        socket.onclose = function (e) {
            _this._resetState();
            var closeObserver = _this._config.closeObserver;
            if (closeObserver) {
                closeObserver.next(e);
            }
            if (e.wasClean) {
                observer.complete();
            }
            else {
                observer.error(e);
            }
        };
        socket.onmessage = function (e) {
            try {
                var deserializer = _this._config.deserializer;
                observer.next(deserializer(e));
            }
            catch (err) {
                observer.error(err);
            }
        };
    };
    WebSocketSubject.prototype._subscribe = function (subscriber) {
        var _this = this;
        var source = this.source;
        if (source) {
            return source.subscribe(subscriber);
        }
        if (!this._socket) {
            this._connectSocket();
        }
        this._output.subscribe(subscriber);
        subscriber.add(function () {
            var _socket = _this._socket;
            if (_this._output.observers.length === 0) {
                if (_socket && _socket.readyState === 1) {
                    _socket.close();
                }
                _this._resetState();
            }
        });
        return subscriber;
    };
    WebSocketSubject.prototype.unsubscribe = function () {
        var _socket = this._socket;
        if (_socket && _socket.readyState === 1) {
            _socket.close();
        }
        this._resetState();
        _super.prototype.unsubscribe.call(this);
    };
    return WebSocketSubject;
}(_Subject__WEBPACK_IMPORTED_MODULE_1__["AnonymousSubject"]));

//# sourceMappingURL=WebSocketSubject.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/dom/webSocket.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/dom/webSocket.js ***!
  \**********************************************************************/
/*! exports provided: webSocket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "webSocket", function() { return webSocket; });
/* harmony import */ var _WebSocketSubject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebSocketSubject */ "./node_modules/rxjs/_esm5/internal/observable/dom/WebSocketSubject.js");
/** PURE_IMPORTS_START _WebSocketSubject PURE_IMPORTS_END */

function webSocket(urlConfigOrSource) {
    return new _WebSocketSubject__WEBPACK_IMPORTED_MODULE_0__["WebSocketSubject"](urlConfigOrSource);
}
//# sourceMappingURL=webSocket.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/webSocket/index.js":
/*!****************************************************!*\
  !*** ./node_modules/rxjs/_esm5/webSocket/index.js ***!
  \****************************************************/
/*! exports provided: webSocket, WebSocketSubject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_observable_dom_webSocket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/observable/dom/webSocket */ "./node_modules/rxjs/_esm5/internal/observable/dom/webSocket.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "webSocket", function() { return _internal_observable_dom_webSocket__WEBPACK_IMPORTED_MODULE_0__["webSocket"]; });

/* harmony import */ var _internal_observable_dom_WebSocketSubject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/observable/dom/WebSocketSubject */ "./node_modules/rxjs/_esm5/internal/observable/dom/WebSocketSubject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebSocketSubject", function() { return _internal_observable_dom_WebSocketSubject__WEBPACK_IMPORTED_MODULE_1__["WebSocketSubject"]; });

/** PURE_IMPORTS_START  PURE_IMPORTS_END */


//# sourceMappingURL=index.js.map


/***/ }),

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

/***/ "./public/app/features/explore/utils/links.ts":
/*!****************************************************!*\
  !*** ./public/app/features/explore/utils/links.ts ***!
  \****************************************************/
/*! exports provided: getFieldLinksForExplore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFieldLinksForExplore", function() { return getFieldLinksForExplore; });
/* harmony import */ var _panel_panellinks_link_srv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../panel/panellinks/link_srv */ "./public/app/features/panel/panellinks/link_srv.ts");
/* harmony import */ var _grafana_data_src_utils_dataLinks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data/src/utils/dataLinks */ "./packages/grafana-data/src/utils/dataLinks.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");



/**
 * Get links from the field of a dataframe and in addition check if there is associated
 * metadata with datasource in which case we will add onClick to open the link in new split window. This assumes
 * that we just supply datasource name and field value and Explore split window will know how to render that
 * appropriately. This is for example used for transition from log with traceId to trace datasource to show that
 * trace.
 */

var getFieldLinksForExplore = function getFieldLinksForExplore(field, rowIndex, splitOpenFn, range) {
  var scopedVars = {};
  scopedVars['__value'] = {
    value: {
      raw: field.values.get(rowIndex)
    },
    text: 'Raw value'
  };
  return field.config.links ? field.config.links.map(function (link) {
    if (!link.internal) {
      var linkModel = Object(_panel_panellinks_link_srv__WEBPACK_IMPORTED_MODULE_0__["getLinkSrv"])().getDataLinkUIModel(link, scopedVars, field);

      if (!linkModel.title) {
        linkModel.title = getTitleFromHref(linkModel.href);
      }

      return linkModel;
    } else {
      return Object(_grafana_data_src_utils_dataLinks__WEBPACK_IMPORTED_MODULE_1__["mapInternalLinkToExplore"])(link, scopedVars, range, field, {
        onClickFn: splitOpenFn,
        replaceVariables: Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])().replace.bind(Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getTemplateSrv"])()),
        getDataSourceSettingsByUid: Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getDataSourceSrv"])().getDataSourceSettingsByUid.bind(Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getDataSourceSrv"])())
      });
    }
  }) : [];
};

function getTitleFromHref(href) {
  // The URL constructor needs the url to have protocol
  if (href.indexOf('://') < 0) {
    // Doesn't really matter what protocol we use.
    href = "http://".concat(href);
  }

  var title;

  try {
    var parsedUrl = new URL(href);
    title = parsedUrl.hostname;
  } catch (_e) {
    // Should be good enough fallback, user probably did not input valid url.
    title = href;
  }

  return title;
}

/***/ }),

/***/ "./public/app/plugins/datasource/loki/LokiAnnotationsQueryCtrl.tsx":
/*!*************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/LokiAnnotationsQueryCtrl.tsx ***!
  \*************************************************************************/
/*! exports provided: LokiAnnotationsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiAnnotationsQueryCtrl", function() { return LokiAnnotationsQueryCtrl; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Just a simple wrapper for a react component that is actually implementing the query editor.
 */
var LokiAnnotationsQueryCtrl =
/*#__PURE__*/
function () {
  /** @ngInject */
  function LokiAnnotationsQueryCtrl() {
    _classCallCheck(this, LokiAnnotationsQueryCtrl);

    this.annotation.target = this.annotation.target || {};
    this.onQueryChange = this.onQueryChange.bind(this);
  }

  _createClass(LokiAnnotationsQueryCtrl, [{
    key: "onQueryChange",
    value: function onQueryChange(expr) {
      this.annotation.expr = expr;
    }
  }]);

  return LokiAnnotationsQueryCtrl;
}();
LokiAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';

/***/ }),

/***/ "./public/app/plugins/datasource/loki/components/LokiCheatSheet.tsx":
/*!**************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/components/LokiCheatSheet.tsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LokiCheatSheet; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
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



var DEFAULT_EXAMPLES = ['{job="default/prometheus"}'];
var PREFERRED_LABELS = ['job', 'app', 'k8s_app'];
var EXAMPLES_LIMIT = 5;
var LOGQL_EXAMPLES = [{
  title: 'Count over time',
  expression: 'count_over_time({job="mysql"}[5m])',
  label: 'This query counts all the log lines within the last five minutes for the MySQL job.'
}, {
  title: 'Rate',
  expression: 'rate(({job="mysql"} |= "error" != "timeout")[10s])',
  label: 'This query gets the per-second rate of all non-timeout errors within the last ten seconds for the MySQL job.'
}, {
  title: 'Aggregate, count, and group',
  expression: 'sum(count_over_time({job="mysql"}[5m])) by (level)',
  label: 'Get the count of logs during the last five minutes, grouping by level.'
}];

var LokiCheatSheet =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(LokiCheatSheet, _PureComponent);

  function LokiCheatSheet() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LokiCheatSheet);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LokiCheatSheet)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      userExamples: DEFAULT_EXAMPLES
    };
    _this.checkUserLabels =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _this$props$datasourc;

      var provider, labels, preferredLabel, values, userExamples;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Set example from user labels
              provider = (_this$props$datasourc = _this.props.datasource) === null || _this$props$datasourc === void 0 ? void 0 : _this$props$datasourc.languageProvider;

              if (!provider.started) {
                _context.next = 12;
                break;
              }

              labels = provider.getLabelKeys() || [];
              preferredLabel = PREFERRED_LABELS.find(function (l) {
                return labels.includes(l);
              });

              if (!preferredLabel) {
                _context.next = 10;
                break;
              }

              _context.next = 7;
              return provider.getLabelValues(preferredLabel);

            case 7:
              values = _context.sent;
              userExamples = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["shuffle"])(values).slice(0, EXAMPLES_LIMIT).map(function (value) {
                return "{".concat(preferredLabel, "=\"").concat(value, "\"}");
              });

              _this.setState({
                userExamples: userExamples
              });

            case 10:
              _context.next = 13;
              break;

            case 12:
              _this.scheduleUserLabelChecking();

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _this;
  }

  _createClass(LokiCheatSheet, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scheduleUserLabelChecking();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.userLabelTimer);
    }
  }, {
    key: "scheduleUserLabelChecking",
    value: function scheduleUserLabelChecking() {
      this.userLabelTimer = setTimeout(this.checkUserLabels, 1000);
    }
  }, {
    key: "renderExpression",
    value: function renderExpression(expr) {
      var onClickExample = this.props.onClickExample;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cheat-sheet-item__example",
        key: expr,
        onClick: function onClick(e) {
          return onClickExample({
            refId: 'A',
            expr: expr
          });
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, expr));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var userExamples = this.state.userExamples;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Loki Cheat Sheet"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cheat-sheet-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cheat-sheet-item__title"
      }, "See your logs"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cheat-sheet-item__label"
      }, "Start by selecting a log stream from the Log labels selector."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cheat-sheet-item__label"
      }, "Alternatively, you can write a stream selector into the query field:"), this.renderExpression('{job="default/prometheus"}'), userExamples !== DEFAULT_EXAMPLES && userExamples.length > 0 ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cheat-sheet-item__label"
      }, "Here are some example streams from your logs:"), userExamples.map(function (example) {
        return _this2.renderExpression(example);
      })) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cheat-sheet-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cheat-sheet-item__title"
      }, "Combine stream selectors"), this.renderExpression('{app="cassandra",namespace="prod"}'), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cheat-sheet-item__label"
      }, "Returns all log lines from streams that have both labels.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cheat-sheet-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cheat-sheet-item__title"
      }, "Filtering for search terms."), this.renderExpression('{app="cassandra"} |~ "(duration|latency)s*(=|is|of)s*[d.]+"'), this.renderExpression('{app="cassandra"} |= "exact match"'), this.renderExpression('{app="cassandra"} != "do not match"'), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "cheat-sheet-item__label"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "https://github.com/grafana/loki/blob/master/docs/logql.md#filter-expression",
        target: "logql"
      }, "LogQL"), ' ', "supports exact and regular expression filters.")), LOGQL_EXAMPLES.map(function (item) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "cheat-sheet-item",
          key: item.expression
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "cheat-sheet-item__title"
        }, item.title), _this2.renderExpression(item.expression), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "cheat-sheet-item__label"
        }, item.label));
      }));
    }
  }]);

  return LokiCheatSheet;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);



/***/ }),

/***/ "./public/app/plugins/datasource/loki/components/LokiExploreExtraField.tsx":
/*!*********************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/components/LokiExploreExtraField.tsx ***!
  \*********************************************************************************/
/*! exports provided: LokiExploreExtraField, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiExploreExtraField", function() { return LokiExploreExtraField; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
// Libraries
 // Types


function LokiExploreExtraField(props) {
  var label = props.label,
      onChangeFunc = props.onChangeFunc,
      onKeyDownFunc = props.onKeyDownFunc,
      value = props.value,
      type = props.type,
      min = props.min;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-inline"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
    width: 5
  }, label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    type: type,
    className: "gf-form-input width-4",
    placeholder: 'auto',
    onChange: onChangeFunc,
    onKeyDown: onKeyDownFunc,
    min: min,
    value: value
  })));
}
/* harmony default export */ __webpack_exports__["default"] = (Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(LokiExploreExtraField));

/***/ }),

/***/ "./public/app/plugins/datasource/loki/components/LokiExploreQueryEditor.tsx":
/*!**********************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/components/LokiExploreQueryEditor.tsx ***!
  \**********************************************************************************/
/*! exports provided: LokiExploreQueryEditor, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiExploreQueryEditor", function() { return LokiExploreQueryEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LokiQueryField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LokiQueryField */ "./public/app/plugins/datasource/loki/components/LokiQueryField.tsx");
/* harmony import */ var _LokiExploreExtraField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LokiExploreExtraField */ "./public/app/plugins/datasource/loki/components/LokiExploreExtraField.tsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Libraries



function LokiExploreQueryEditor(props) {
  var _query$maxLines;

  var range = props.range,
      query = props.query,
      data = props.data,
      datasource = props.datasource,
      history = props.history,
      onChange = props.onChange,
      onRunQuery = props.onRunQuery;

  function onChangeQueryLimit(value) {
    var query = props.query,
        onChange = props.onChange;

    var nextQuery = _objectSpread({}, query, {
      maxLines: preprocessMaxLines(value)
    });

    onChange(nextQuery);
  }

  function preprocessMaxLines(value) {
    if (value.length === 0) {
      // empty input - falls back to dataSource.maxLines limit
      return NaN;
    } else if (value.length > 0 && (isNaN(+value) || +value < 0)) {
      // input with at least 1 character and that is either incorrect (value in the input field is not a number) or negative
      // falls back to the limit of 0 lines
      return 0;
    } else {
      // default case - correct input
      return +value;
    }
  }

  function onMaxLinesChange(e) {
    if (query.maxLines !== preprocessMaxLines(e.currentTarget.value)) {
      onChangeQueryLimit(e.currentTarget.value);
    }
  }

  function onReturnKeyDown(e) {
    if (e.key === 'Enter') {
      onRunQuery();
    }
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LokiQueryField__WEBPACK_IMPORTED_MODULE_1__["LokiQueryField"], {
    datasource: datasource,
    query: query,
    onChange: onChange,
    onBlur: function onBlur() {},
    onRunQuery: onRunQuery,
    history: history,
    data: data,
    range: range,
    ExtraFieldElement: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LokiExploreExtraField__WEBPACK_IMPORTED_MODULE_2__["default"], {
      label: 'Line limit',
      onChangeFunc: onMaxLinesChange,
      onKeyDownFunc: onReturnKeyDown,
      value: (query === null || query === void 0 ? void 0 : (_query$maxLines = query.maxLines) === null || _query$maxLines === void 0 ? void 0 : _query$maxLines.toString()) || '',
      type: 'number',
      min: 0
    })
  });
}
/* harmony default export */ __webpack_exports__["default"] = (Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(LokiExploreQueryEditor));

/***/ }),

/***/ "./public/app/plugins/datasource/loki/components/LokiQueryEditor.tsx":
/*!***************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/components/LokiQueryEditor.tsx ***!
  \***************************************************************************/
/*! exports provided: LokiQueryEditor, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiQueryEditor", function() { return LokiQueryEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _LokiQueryField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LokiQueryField */ "./public/app/plugins/datasource/loki/components/LokiQueryField.tsx");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Libraries
 // Types



var LokiQueryEditor =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(LokiQueryEditor, _PureComponent);

  // Query target to be modified and used for queries
  function LokiQueryEditor(props) {
    var _query$legendFormat;

    var _this;

    _classCallCheck(this, LokiQueryEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LokiQueryEditor).call(this, props)); // Use default query to prevent undefined input values

    _this.onFieldChange = function (query, override) {
      _this.query.expr = query.expr;
    };

    _this.onLegendChange = function (e) {
      var legendFormat = e.currentTarget.value;
      _this.query.legendFormat = legendFormat;

      _this.setState({
        legendFormat: legendFormat
      });
    };

    _this.onRunQuery = function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          query = _assertThisInitialize.query;

      _this.props.onChange(query);

      _this.props.onRunQuery();
    };

    var defaultQuery = {
      expr: '',
      legendFormat: ''
    };

    var _query = Object.assign({}, defaultQuery, props.query);

    _this.query = _query; // Query target properties that are fully controlled inputs

    _this.state = {
      // Fully controlled text inputs
      legendFormat: (_query$legendFormat = _query.legendFormat) !== null && _query$legendFormat !== void 0 ? _query$legendFormat : ''
    };
    return _this;
  }

  _createClass(LokiQueryEditor, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          datasource = _this$props.datasource,
          query = _this$props.query,
          data = _this$props.data,
          range = _this$props.range;
      var legendFormat = this.state.legendFormat;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LokiQueryField__WEBPACK_IMPORTED_MODULE_2__["LokiQueryField"], {
        datasource: datasource,
        query: query,
        onChange: this.onFieldChange,
        onRunQuery: this.onRunQuery,
        history: [],
        data: data,
        range: range
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form-inline"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "gf-form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["InlineFormLabel"], {
        width: 7,
        tooltip: "\u4F7F\u7528\u540D\u79F0\u6216\u6A21\u5F0F\u63A7\u5236\u65F6\u95F4\u5E8F\u5217\u7684\u540D\u79F0\u3002 \u4F8B\u5982\uFF0C{{hostname}}\u5C06\u66FF\u6362\u4E3A\u6807\u7B7E\u4E3B\u673A\u540D\u7684\u6807\u7B7E\u503C\u3002"
      }, "\u56FE\u4F8B"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "gf-form-input",
        placeholder: "\u56FE\u4F8B\u683C\u5F0F",
        value: legendFormat,
        onChange: this.onLegendChange,
        onBlur: this.onRunQuery
      }))));
    }
  }]);

  return LokiQueryEditor;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);
/* harmony default export */ __webpack_exports__["default"] = (LokiQueryEditor);

/***/ }),

/***/ "./public/app/plugins/datasource/loki/components/LokiQueryField.tsx":
/*!**************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/components/LokiQueryField.tsx ***!
  \**************************************************************************/
/*! exports provided: LokiQueryField, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiQueryField", function() { return LokiQueryField; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LokiQueryFieldForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LokiQueryFieldForm */ "./public/app/plugins/datasource/loki/components/LokiQueryFieldForm.tsx");
/* harmony import */ var _useLokiSyntaxAndLabels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useLokiSyntaxAndLabels */ "./public/app/plugins/datasource/loki/components/useLokiSyntaxAndLabels.ts");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




var LokiQueryField = function LokiQueryField(props) {
  var datasource = props.datasource,
      range = props.range,
      otherProps = _objectWithoutProperties(props, ["datasource", "range"]);

  var absoluteTimeRange = {
    from: range.from.valueOf(),
    to: range.to.valueOf()
  }; // Range here is never optional

  var _useLokiSyntaxAndLabe = Object(_useLokiSyntaxAndLabels__WEBPACK_IMPORTED_MODULE_2__["useLokiSyntaxAndLabels"])(datasource.languageProvider, absoluteTimeRange),
      isSyntaxReady = _useLokiSyntaxAndLabe.isSyntaxReady,
      setActiveOption = _useLokiSyntaxAndLabe.setActiveOption,
      refreshLabels = _useLokiSyntaxAndLabe.refreshLabels,
      syntax = _useLokiSyntaxAndLabe.syntax,
      logLabelOptions = _useLokiSyntaxAndLabe.logLabelOptions;

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LokiQueryFieldForm__WEBPACK_IMPORTED_MODULE_1__["LokiQueryFieldForm"], _extends({
    datasource: datasource
    /**
     * setActiveOption name is intentional. Because of the way rc-cascader requests additional data
     * https://github.com/react-component/cascader/blob/master/src/Cascader.jsx#L165
     * we are notyfing useLokiSyntax hook, what the active option is, and then it's up to the hook logic
     * to fetch data of options that aren't fetched yet
     */
    ,
    onLoadOptions: setActiveOption,
    onLabelsRefresh: refreshLabels,
    absoluteRange: absoluteTimeRange,
    syntax: syntax,
    syntaxLoaded: isSyntaxReady,
    logLabelOptions: logLabelOptions
  }, otherProps));
};
/* harmony default export */ __webpack_exports__["default"] = (LokiQueryField);

/***/ }),

/***/ "./public/app/plugins/datasource/loki/configuration/ConfigEditor.tsx":
/*!***************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/configuration/ConfigEditor.tsx ***!
  \***************************************************************************/
/*! exports provided: ConfigEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _MaxLinesField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MaxLinesField */ "./public/app/plugins/datasource/loki/configuration/MaxLinesField.tsx");
/* harmony import */ var _DerivedFields__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DerivedFields */ "./public/app/plugins/datasource/loki/configuration/DerivedFields.tsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var makeJsonUpdater = function makeJsonUpdater(field) {
  return function (options, value) {
    return _objectSpread({}, options, {
      jsonData: _objectSpread({}, options.jsonData, _defineProperty({}, field, value))
    });
  };
};

var setMaxLines = makeJsonUpdater('maxLines');
var setDerivedFields = makeJsonUpdater('derivedFields');
var ConfigEditor = function ConfigEditor(props) {
  var options = props.options,
      onOptionsChange = props.onOptionsChange;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["DataSourceHttpSettings"], {
    defaultUrl: 'http://localhost:3100',
    dataSourceConfig: options,
    showAccessOptions: false,
    onChange: onOptionsChange
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-inline"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MaxLinesField__WEBPACK_IMPORTED_MODULE_2__["MaxLinesField"], {
    value: options.jsonData.maxLines || '',
    onChange: function onChange(value) {
      return onOptionsChange(setMaxLines(options, value));
    }
  })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DerivedFields__WEBPACK_IMPORTED_MODULE_3__["DerivedFields"], {
    value: options.jsonData.derivedFields,
    onChange: function onChange(value) {
      return onOptionsChange(setDerivedFields(options, value));
    }
  }));
};

/***/ }),

/***/ "./public/app/plugins/datasource/loki/configuration/DebugSection.tsx":
/*!***************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/configuration/DebugSection.tsx ***!
  \***************************************************************************/
/*! exports provided: DebugSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DebugSection", function() { return DebugSection; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _features_explore_utils_links__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../features/explore/utils/links */ "./public/app/features/explore/utils/links.ts");
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n                width: 100%;\n              "]);

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





var FormField = _grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LegacyForms"].FormField;


var DebugSection = function DebugSection(props) {
  var derivedFields = props.derivedFields,
      className = props.className;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(''),
      _useState2 = _slicedToArray(_useState, 2),
      debugText = _useState2[0],
      setDebugText = _useState2[1];

  var debugFields = [];

  if (debugText && derivedFields) {
    debugFields = makeDebugFields(derivedFields, debugText);
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: className
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    labelWidth: 12,
    label: 'Debug log message',
    inputEl: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
      placeholder: 'Paste an example log line here to test the regular expressions of your derived fields',
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('gf-form-input gf-form-textarea', Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject())),
      value: debugText,
      onChange: function onChange(event) {
        return setDebugText(event.currentTarget.value);
      }
    })
  }), !!debugFields.length && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DebugFields, {
    fields: debugFields
  }));
};

var DebugFields = function DebugFields(_ref) {
  var fields = _ref.fields;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: 'filter-table'
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Name"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Value"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Url"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, fields.map(function (field) {
    var value = field.value;

    if (field.error) {
      value = field.error.message;
    } else if (field.href) {
      value = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: field.href
      }, value);
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: "".concat(field.name, "=").concat(field.value)
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, field.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, value), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, field.href ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: field.href
    }, field.href) : ''));
  })));
};

function makeDebugFields(derivedFields, debugText) {
  return derivedFields.filter(function (field) {
    return field.name && field.matcherRegex;
  }).map(function (field) {
    try {
      var testMatch = debugText.match(field.matcherRegex);
      var value = testMatch && testMatch[1];
      var link = null;

      if (field.url && value) {
        link = Object(_features_explore_utils_links__WEBPACK_IMPORTED_MODULE_5__["getFieldLinksForExplore"])({
          name: '',
          type: _grafana_data__WEBPACK_IMPORTED_MODULE_4__["FieldType"].string,
          values: new _grafana_data__WEBPACK_IMPORTED_MODULE_4__["ArrayVector"]([value]),
          config: {
            links: [{
              title: '',
              url: field.url
            }]
          }
        }, 0, function () {}, {})[0];
      }

      return {
        name: field.name,
        value: value || '<no match>',
        href: link && link.href
      };
    } catch (error) {
      return {
        name: field.name,
        error: error
      };
    }
  });
}

/***/ }),

/***/ "./public/app/plugins/datasource/loki/configuration/DerivedField.tsx":
/*!***************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/configuration/DerivedField.tsx ***!
  \***************************************************************************/
/*! exports provided: DerivedField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DerivedField", function() { return DerivedField; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/Select/DataSourcePicker */ "./public/app/core/components/Select/DataSourcePicker.tsx");
/* harmony import */ var app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/features/plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");
/* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-use */ "./node_modules/react-use/esm/index.js");
function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n          width: 100%;\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n            margin-left: 8px;\n          "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n    flex: 3;\n  "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    flex: 2;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    align-items: baseline;\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var Switch = _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LegacyForms"].Switch,
    FormField = _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LegacyForms"].FormField;



var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function () {
  return {
    row: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject()),
    nameField: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2()),
    regexField: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3())
  };
});
var DerivedField = function DerivedField(props) {
  var value = props.value,
      _onChange = props.onChange,
      onDelete = props.onDelete,
      suggestions = props.suggestions,
      className = props.className;
  var styles = getStyles();

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(!!value.datasourceUid),
      _useState2 = _slicedToArray(_useState, 2),
      showInternalLink = _useState2[0],
      setShowInternalLink = _useState2[1];

  var previousUid = Object(react_use__WEBPACK_IMPORTED_MODULE_5__["usePrevious"])(value.datasourceUid); // Force internal link visibility change if uid changed outside of this component.

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (!previousUid && value.datasourceUid && !showInternalLink) {
      setShowInternalLink(true);
    }

    if (previousUid && !value.datasourceUid && showInternalLink) {
      setShowInternalLink(false);
    }
  }, [previousUid, value.datasourceUid, showInternalLink]);

  var handleChange = function handleChange(field) {
    return function (event) {
      _onChange(_objectSpread({}, value, _defineProperty({}, field, event.currentTarget.value)));
    };
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: className
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.row
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    className: styles.nameField,
    labelWidth: 5 // A bit of a hack to prevent using default value for the width from FormField
    ,
    inputWidth: null,
    label: "\u540D\u5B57",
    type: "text",
    value: value.name,
    onChange: handleChange('name')
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    className: styles.regexField,
    inputWidth: null,
    label: "\u6B63\u5219",
    type: "text",
    value: value.matcherRegex,
    onChange: handleChange('matcherRegex'),
    tooltip: '用于解析和捕获日志消息的某些部分。 您可以在模板中使用捕获的组。'
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "destructive",
    title: "\u79FB\u9664\u5B57\u6BB5",
    icon: "times",
    onClick: function onClick(event) {
      event.preventDefault();
      onDelete();
    },
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject4())
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    label: showInternalLink ? 'Query' : 'URL',
    labelWidth: 5,
    inputEl: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["DataLinkInput"], {
      placeholder: showInternalLink ? '${__value.raw}' : 'http://example.com/${__value.raw}',
      value: value.url || '',
      onChange: function onChange(newValue) {
        return _onChange(_objectSpread({}, value, {
          url: newValue
        }));
      },
      suggestions: suggestions
    }),
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject5())
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.row
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Switch, {
    label: "\u5185\u90E8\u8FDE\u7ED3",
    checked: showInternalLink,
    onChange: function onChange() {
      if (showInternalLink) {
        _onChange(_objectSpread({}, value, {
          datasourceUid: undefined
        }));
      }

      setShowInternalLink(!showInternalLink);
    }
  }), showInternalLink && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DataSourceSection, {
    onChange: function onChange(datasourceUid) {
      _onChange(_objectSpread({}, value, {
        datasourceUid: datasourceUid
      }));
    },
    datasourceUid: value.datasourceUid
  })));
};

var DataSourceSection = function DataSourceSection(props) {
  var datasourceUid = props.datasourceUid,
      _onChange2 = props.onChange;
  var datasources = Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_4__["getDatasourceSrv"])().getExternal() // At this moment only Jaeger and Zipkin datasource is supported as the link target.
  .filter(function (ds) {
    return ds.meta.tracing;
  }).map(function (ds) {
    return {
      value: ds.uid,
      name: ds.name,
      meta: ds.meta
    };
  });
  var selectedDatasource = datasourceUid && datasources.find(function (d) {
    return d.value === datasourceUid;
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_3__["default"] // Uid and value should be always set in the db and so in the items.
  , {
    onChange: function onChange(ds) {
      return _onChange2(ds.value);
    },
    datasources: datasources,
    current: selectedDatasource || undefined
  });
};

/***/ }),

/***/ "./public/app/plugins/datasource/loki/configuration/DerivedFields.tsx":
/*!****************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/configuration/DerivedFields.tsx ***!
  \****************************************************************************/
/*! exports provided: DerivedFields */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DerivedFields", function() { return DerivedFields; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/emotion.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _DerivedField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DerivedField */ "./public/app/plugins/datasource/loki/configuration/DerivedField.tsx");
/* harmony import */ var _DebugSection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DebugSection */ "./public/app/plugins/datasource/loki/configuration/DebugSection.tsx");
function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n              margin-bottom: 10px;\n            "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n              margin-right: 10px;\n            "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    margin-bottom: ", ";\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    padding-bottom: ", ";\n    color: ", ";\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function (theme) {
  return {
    infoText: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject(), theme.spacing.md, theme.colors.textWeak),
    derivedField: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject2(), theme.spacing.sm)
  };
});
var DerivedFields = function DerivedFields(props) {
  var value = props.value,
      _onChange = props.onChange;
  var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["useTheme"])();
  var styles = getStyles(theme);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      showDebug = _useState2[0],
      setShowDebug = _useState2[1];

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "page-heading"
  }, "\u6D3E\u751F\u5B57\u6BB5"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: styles.infoText
  }, "\u6D3E\u751F\u5B57\u6BB5\u53EF\u7528\u4E8E\u4ECE\u65E5\u5FD7\u6D88\u606F\u4E2D\u63D0\u53D6\u65B0\u5B57\u6BB5\uFF0C\u5E76\u6839\u636E\u5176\u503C\u521B\u5EFA\u94FE\u63A5\u3002"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-group"
  }, value && value.map(function (field, index) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DerivedField__WEBPACK_IMPORTED_MODULE_4__["DerivedField"], {
      className: styles.derivedField,
      key: index,
      value: field,
      onChange: function onChange(newField) {
        var newDerivedFields = _toConsumableArray(value);

        newDerivedFields.splice(index, 1, newField);

        _onChange(newDerivedFields);
      },
      onDelete: function onDelete() {
        var newDerivedFields = _toConsumableArray(value);

        newDerivedFields.splice(index, 1);

        _onChange(newDerivedFields);
      },
      suggestions: [{
        value: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["DataLinkBuiltInVars"].valueRaw,
        label: '原始值',
        documentation: '正则表达式捕获的确切字符串',
        origin: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["VariableOrigin"].Value
      }]
    });
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "secondary",
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject3()),
    icon: "plus",
    onClick: function onClick(event) {
      event.preventDefault();
      var newDerivedFields = [].concat(_toConsumableArray(value || []), [{
        name: '',
        matcherRegex: ''
      }]);

      _onChange(newDerivedFields);
    }
  }, "\u6DFB\u52A0"), value && value.length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    variant: "secondary",
    onClick: function onClick() {
      return setShowDebug(!showDebug);
    }
  }, showDebug ? '隐藏示例日志消息' : '显示示例日志消息'))), showDebug && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "gf-form-group"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DebugSection__WEBPACK_IMPORTED_MODULE_5__["DebugSection"], {
    className: Object(emotion__WEBPACK_IMPORTED_MODULE_1__["css"])(_templateObject4()),
    derivedFields: value
  })));
};

/***/ }),

/***/ "./public/app/plugins/datasource/loki/configuration/MaxLinesField.tsx":
/*!****************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/configuration/MaxLinesField.tsx ***!
  \****************************************************************************/
/*! exports provided: MaxLinesField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaxLinesField", function() { return MaxLinesField; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");


var FormField = _grafana_ui__WEBPACK_IMPORTED_MODULE_1__["LegacyForms"].FormField;
var MaxLinesField = function MaxLinesField(props) {
  var value = props.value,
      _onChange = props.onChange;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FormField, {
    label: "\u6700\u5927\u884C\u6570",
    labelWidth: 11,
    inputWidth: 20,
    inputEl: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "number",
      className: "gf-form-input width-8 gf-form-input--has-help-icon",
      value: value,
      onChange: function onChange(event) {
        return _onChange(event.currentTarget.value);
      },
      spellCheck: false,
      placeholder: "1000"
    }),
    tooltip: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Loki\u67E5\u8BE2\u5FC5\u987B\u5305\u542B\u8FD4\u56DE\u7684\u6700\u5927\u884C\u6570\u9650\u5236\uFF08\u9ED8\u8BA4\u503C\uFF1A1000\uFF09\u3002 \u589E\u52A0\u6B64\u9650\u5236\u53EF\u4E3A\u4E34\u65F6\u5206\u6790\u63D0\u4F9B\u66F4\u5927\u7684\u7ED3\u679C\u96C6\u3002 \u5982\u679C\u663E\u793A\u65E5\u5FD7\u7ED3\u679C\u65F6\u6D4F\u89C8\u5668\u53D8\u6162\uFF0C\u8BF7\u51CF\u5C0F\u6B64\u9650\u5236\u3002")
  });
};

/***/ }),

/***/ "./public/app/plugins/datasource/loki/datasource.ts":
/*!**********************************************************!*\
  !*** ./public/app/plugins/datasource/loki/datasource.ts ***!
  \**********************************************************/
/*! exports provided: DEFAULT_MAX_LINES, LOKI_ENDPOINT, LokiDatasource, lokiRegularEscape, lokiSpecialRegexEscape, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_MAX_LINES", function() { return DEFAULT_MAX_LINES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOKI_ENDPOINT", function() { return LOKI_ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiDatasource", function() { return LokiDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lokiRegularEscape", function() { return lokiRegularEscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lokiSpecialRegexEscape", function() { return lokiSpecialRegexEscape; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_plugins_datasource_prometheus_add_label_to_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/plugins/datasource/prometheus/add_label_to_query */ "./public/app/plugins/datasource/prometheus/add_label_to_query.ts");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var _result_transformer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./result_transformer */ "./public/app/plugins/datasource/loki/result_transformer.ts");
/* harmony import */ var _query_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./query_utils */ "./public/app/plugins/datasource/loki/query_utils.ts");
/* harmony import */ var app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/features/dashboard/services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./types */ "./public/app/plugins/datasource/loki/types.ts");
/* harmony import */ var _live_streams__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./live_streams */ "./public/app/plugins/datasource/loki/live_streams.ts");
/* harmony import */ var _language_provider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./language_provider */ "./public/app/plugins/datasource/loki/language_provider.ts");
/* harmony import */ var _core_utils_fetch__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../core/utils/fetch */ "./public/app/core/utils/fetch.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

// Libraries


 // Types












var DEFAULT_MAX_LINES = 1000;
var LOKI_ENDPOINT = '/loki/api/v1';
var RANGE_QUERY_ENDPOINT = "".concat(LOKI_ENDPOINT, "/query_range");
var INSTANT_QUERY_ENDPOINT = "".concat(LOKI_ENDPOINT, "/query");
var DEFAULT_QUERY_PARAMS = {
  direction: 'BACKWARD',
  limit: DEFAULT_MAX_LINES,
  query: ''
};
var LokiDatasource =
/*#__PURE__*/
function (_DataSourceApi) {
  LokiDatasource.$inject = ["instanceSettings", "templateSrv"];

  _inherits(LokiDatasource, _DataSourceApi);

  /** @ngInject */
  function LokiDatasource(instanceSettings, templateSrv) {
    var _settingsData$maxLine;

    var _this;

    _classCallCheck(this, LokiDatasource);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LokiDatasource).call(this, instanceSettings));
    _this.instanceSettings = instanceSettings;
    _this.templateSrv = templateSrv;
    _this.streams = new _live_streams__WEBPACK_IMPORTED_MODULE_11__["LiveStreams"]();

    _this.runInstantQuery = function (target, options, responseListLength) {
      var timeNs = _this.getTime(options.range.to, true);

      var query = {
        query: target.expr,
        time: "".concat(timeNs + (1e9 - timeNs % 1e9)),
        limit: Math.min(options.maxDataPoints || Infinity, _this.maxLines)
      };
      /** Show results of Loki instant queries only in table */

      var meta = {
        preferredVisualisationType: 'table'
      };
      return _this._request(INSTANT_QUERY_ENDPOINT, query).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
        if (response.data.data.resultType === _types__WEBPACK_IMPORTED_MODULE_10__["LokiResultType"].Stream) {
          return {
            data: [],
            key: "".concat(target.refId, "_instant")
          };
        }

        return {
          data: [Object(_result_transformer__WEBPACK_IMPORTED_MODULE_7__["lokiResultsToTableModel"])(response.data.data.result, responseListLength, target.refId, meta, true)],
          key: "".concat(target.refId, "_instant")
        };
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function (err) {
        return _this.throwUnless(err, err.status === 404, target);
      }));
    };

    _this.runRangeQuery = function (target, options) {
      var responseListLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      // target.maxLines value already preprocessed
      // available cases:
      // 1) empty input -> mapped to NaN, falls back to dataSource.maxLines limit
      // 2) input with at least 1 character and that is either incorrect (value in the input field is not a number) or negative
      //    - mapped to 0, falls back to the limit of 0 lines
      // 3) default case - correct input, mapped to the value from the input field
      var linesLimit = 0;

      if (target.maxLines === undefined) {
        // no target.maxLines, using options.maxDataPoints
        linesLimit = Math.min(options.maxDataPoints || Infinity, _this.maxLines);
      } else {
        // using target.maxLines
        if (isNaN(target.maxLines)) {
          linesLimit = _this.maxLines;
        } else {
          linesLimit = target.maxLines;
        }
      }

      var queryOptions = _objectSpread({}, options, {
        maxDataPoints: linesLimit
      });

      if (options.liveStreaming) {
        return _this.runLiveQuery(target, queryOptions);
      }

      var query = _this.createRangeQuery(target, queryOptions);

      return _this._request(RANGE_QUERY_ENDPOINT, query).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function (err) {
        return _this.throwUnless(err, err.status === 404, target);
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (response) {
        return Object(_result_transformer__WEBPACK_IMPORTED_MODULE_7__["processRangeQueryResponse"])(response.data, target, query, responseListLength, linesLimit, _this.instanceSettings.jsonData, options.scopedVars, options.reverse);
      }));
    };

    _this.runLiveQuery = function (target, options) {
      var liveTarget = _this.createLiveTarget(target, options);

      return _this.streams.getStream(liveTarget).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (data) {
        return {
          data: data,
          key: "loki-".concat(liveTarget.refId),
          state: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["LoadingState"].Streaming
        };
      }));
    };

    _this.getLogRowContext = function (row, options) {
      var target = _this.prepareLogRowContextQueryTarget(row, options && options.limit || 10, options && options.direction || 'BACKWARD');

      var reverse = options && options.direction === 'FORWARD';
      return _this._request(RANGE_QUERY_ENDPOINT, target).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function (err) {
        if (err.status === 404) {
          return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(err);
        }

        var error = {
          message: 'Error during context query. Please check JS console logs.',
          status: err.status,
          statusText: err.statusText
        };
        throw error;
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(function (res) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])({
          data: res.data ? res.data.data.result.map(function (stream) {
            return Object(_result_transformer__WEBPACK_IMPORTED_MODULE_7__["lokiStreamResultToDataFrame"])(stream, reverse);
          }) : []
        });
      })).toPromise();
    };

    _this.prepareLogRowContextQueryTarget = function (row, limit, direction) {
      var query = Object.keys(row.labels).map(function (label) {
        return "".concat(label, "=\"").concat(row.labels[label].replace(/\\/g, '\\\\'), "\"");
      }) // escape backslashes in label as users can't escape them by themselves
      .join(',');
      var contextTimeBuffer = 2 * 60 * 60 * 1000; // 2h buffer

      var commonTargetOptions = {
        limit: limit,
        query: "{".concat(query, "}"),
        expr: "{".concat(query, "}"),
        direction: direction
      };
      var fieldCache = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldCache"](row.dataFrame);
      var nsField = fieldCache.getFieldByName('tsNs');
      var nsTimestamp = nsField.values.get(row.rowIndex);

      if (direction === 'BACKWARD') {
        return _objectSpread({}, commonTargetOptions, {
          // convert to ns, we loose some precision here but it is not that important at the far points of the context
          start: row.timeEpochMs - contextTimeBuffer + '000000',
          end: nsTimestamp,
          direction: direction
        });
      } else {
        return _objectSpread({}, commonTargetOptions, {
          // start param in Loki API is inclusive so we'll have to filter out the row that this request is based from
          // and any other that were logged in the same ns but before the row. Right now these rows will be lost
          // because the are before but came it he response that should return only rows after.
          start: nsTimestamp,
          // convert to ns, we loose some precision here but it is not that important at the far points of the context
          end: row.timeEpochMs + contextTimeBuffer + '000000'
        });
      }
    };

    _this.languageProvider = new _language_provider__WEBPACK_IMPORTED_MODULE_12__["default"](_assertThisInitialized(_this));
    var settingsData = instanceSettings.jsonData || {};
    _this.maxLines = parseInt((_settingsData$maxLine = settingsData.maxLines) !== null && _settingsData$maxLine !== void 0 ? _settingsData$maxLine : '0', 10) || DEFAULT_MAX_LINES;
    return _this;
  }

  _createClass(LokiDatasource, [{
    key: "_request",
    value: function _request(apiUrl, data, options) {
      var baseUrl = this.instanceSettings.url;
      var params = data ? Object(_core_utils_fetch__WEBPACK_IMPORTED_MODULE_13__["serializeParams"])(data) : '';
      var url = "".concat(baseUrl).concat(apiUrl).concat(params.length ? "?".concat(params) : '');

      var req = _objectSpread({}, options, {
        url: url
      });

      return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getBackendSrv"])().fetch(req);
    }
  }, {
    key: "query",
    value: function query(options) {
      var _this2 = this;

      var subQueries = [];
      var filteredTargets = options.targets.filter(function (target) {
        return target.expr && !target.hide;
      }).map(function (target) {
        return _objectSpread({}, target, {
          expr: _this2.templateSrv.replace(target.expr, options.scopedVars, _this2.interpolateQueryExpr)
        });
      });
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = filteredTargets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var target = _step.value;

          if (options.app === _grafana_data__WEBPACK_IMPORTED_MODULE_3__["CoreApp"].Explore) {
            subQueries.push(this.runInstantQuery(target, options, filteredTargets.length));
          }

          subQueries.push(this.runRangeQuery(target, options, filteredTargets.length));
        } // No valid targets, return the empty result to save a round trip.

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

      if (Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isEmpty"])(subQueries)) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])({
          data: [],
          state: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["LoadingState"].Done
        });
      }

      return rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"].apply(void 0, subQueries);
    }
  }, {
    key: "createRangeQuery",
    value: function createRangeQuery(target, options) {
      var query = target.expr;
      var range = {};

      if (options.range) {
        var startNs = this.getTime(options.range.from, false);
        var endNs = this.getTime(options.range.to, true);
        var rangeMs = Math.ceil((endNs - startNs) / 1e6);
        var step = Math.ceil(this.adjustInterval(options.intervalMs || 1000, rangeMs) / 1000);
        var alignedTimes = {
          start: startNs - startNs % 1e9,
          end: endNs + (1e9 - endNs % 1e9)
        };
        range = {
          start: alignedTimes.start,
          end: alignedTimes.end,
          step: step
        };
      }

      return _objectSpread({}, DEFAULT_QUERY_PARAMS, {}, range, {
        query: query,
        limit: Math.min(options.maxDataPoints || Infinity, this.maxLines)
      });
    }
    /**
     * Attempts to send a query to /loki/api/v1/query_range
     */

  }, {
    key: "createLiveTarget",
    value: function createLiveTarget(target, options) {
      var query = target.expr;
      var baseUrl = this.instanceSettings.url;
      var params = Object(_core_utils_fetch__WEBPACK_IMPORTED_MODULE_13__["serializeParams"])({
        query: query
      });
      return {
        query: query,
        url: Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["convertToWebSocketUrl"])("".concat(baseUrl, "/loki/api/v1/tail?").concat(params)),
        refId: target.refId,
        size: Math.min(options.maxDataPoints || Infinity, this.maxLines)
      };
    }
    /**
     * Runs live queries which in this case means creating a websocket and listening on it for new logs.
     * This returns a bit different dataFrame than runQueries as it returns single dataframe even if there are multiple
     * Loki streams, sets only common labels on dataframe.labels and has additional dataframe.fields.labels for unique
     * labels per row.
     */

  }, {
    key: "interpolateVariablesInQueries",
    value: function interpolateVariablesInQueries(queries, scopedVars) {
      var _this3 = this;

      var expandedQueries = queries;

      if (queries && queries.length) {
        expandedQueries = queries.map(function (query) {
          return _objectSpread({}, query, {
            datasource: _this3.name,
            expr: _this3.templateSrv.replace(query.expr, scopedVars, _this3.interpolateQueryExpr)
          });
        });
      }

      return expandedQueries;
    }
  }, {
    key: "getQueryDisplayText",
    value: function getQueryDisplayText(query) {
      return query.expr;
    }
  }, {
    key: "importQueries",
    value: function () {
      var _importQueries = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(queries, originMeta) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.languageProvider.importQueries(queries, originMeta.id));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function importQueries(_x, _x2) {
        return _importQueries.apply(this, arguments);
      }

      return importQueries;
    }()
  }, {
    key: "metadataRequest",
    value: function () {
      var _metadataRequest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(url, params) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._request(url, params, {
                  hideFromInspector: true
                }).toPromise();

              case 2:
                res = _context2.sent;
                return _context2.abrupt("return", res.data.data || res.data.values || []);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function metadataRequest(_x3, _x4) {
        return _metadataRequest.apply(this, arguments);
      }

      return metadataRequest;
    }()
  }, {
    key: "metricFindQuery",
    value: function () {
      var _metricFindQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(query, optionalOptions) {
        var interpolated;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (query) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", Promise.resolve([]));

              case 2:
                interpolated = this.templateSrv.replace(query, {}, this.interpolateQueryExpr);
                _context3.next = 5;
                return this.processMetricFindQuery(interpolated, optionalOptions === null || optionalOptions === void 0 ? void 0 : optionalOptions.range);

              case 5:
                return _context3.abrupt("return", _context3.sent);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function metricFindQuery(_x5, _x6) {
        return _metricFindQuery.apply(this, arguments);
      }

      return metricFindQuery;
    }()
  }, {
    key: "processMetricFindQuery",
    value: function () {
      var _processMetricFindQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(query, range) {
        var labelNamesRegex, labelValuesRegex, timeRange, params, labelNames, labelValues;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                labelNamesRegex = /^label_names\(\)\s*$/;
                labelValuesRegex = /^label_values\((?:(.+),\s*)?([a-zA-Z_][a-zA-Z0-9_]*)\)\s*$/;
                timeRange = range || Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_9__["getTimeSrv"])().timeRange();
                params = Object(_language_provider__WEBPACK_IMPORTED_MODULE_12__["rangeToParams"])({
                  from: timeRange.from.valueOf(),
                  to: timeRange.to.valueOf()
                });
                labelNames = query.match(labelNamesRegex);

                if (!labelNames) {
                  _context4.next = 9;
                  break;
                }

                _context4.next = 8;
                return this.labelNamesQuery(params);

              case 8:
                return _context4.abrupt("return", _context4.sent);

              case 9:
                labelValues = query.match(labelValuesRegex);

                if (!labelValues) {
                  _context4.next = 14;
                  break;
                }

                _context4.next = 13;
                return this.labelValuesQuery(labelValues[2], params);

              case 13:
                return _context4.abrupt("return", _context4.sent);

              case 14:
                return _context4.abrupt("return", Promise.resolve([]));

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function processMetricFindQuery(_x7, _x8) {
        return _processMetricFindQuery.apply(this, arguments);
      }

      return processMetricFindQuery;
    }()
  }, {
    key: "labelNamesQuery",
    value: function () {
      var _labelNamesQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(params) {
        var url, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                url = "".concat(LOKI_ENDPOINT, "/label");
                _context5.next = 3;
                return this.metadataRequest(url, params);

              case 3:
                result = _context5.sent;
                return _context5.abrupt("return", result.map(function (value) {
                  return {
                    text: value
                  };
                }));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function labelNamesQuery(_x9) {
        return _labelNamesQuery.apply(this, arguments);
      }

      return labelNamesQuery;
    }()
  }, {
    key: "labelValuesQuery",
    value: function () {
      var _labelValuesQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(label, params) {
        var url, result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                url = "".concat(LOKI_ENDPOINT, "/label/").concat(label, "/values");
                _context6.next = 3;
                return this.metadataRequest(url, params);

              case 3:
                result = _context6.sent;
                return _context6.abrupt("return", result.map(function (value) {
                  return {
                    text: value
                  };
                }));

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function labelValuesQuery(_x10, _x11) {
        return _labelValuesQuery.apply(this, arguments);
      }

      return labelValuesQuery;
    }()
  }, {
    key: "interpolateQueryExpr",
    value: function interpolateQueryExpr(value, variable) {
      // if no multi or include all do not regexEscape
      if (!variable.multi && !variable.includeAll) {
        return lokiRegularEscape(value);
      }

      if (typeof value === 'string') {
        return lokiSpecialRegexEscape(value);
      }

      var escapedValues = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["map"])(value, lokiSpecialRegexEscape);
      return escapedValues.join('|');
    }
  }, {
    key: "modifyQuery",
    value: function modifyQuery(query, action) {
      var _query$expr;

      var expression = (_query$expr = query.expr) !== null && _query$expr !== void 0 ? _query$expr : '';

      switch (action.type) {
        case 'ADD_FILTER':
          {
            expression = Object(app_plugins_datasource_prometheus_add_label_to_query__WEBPACK_IMPORTED_MODULE_5__["addLabelToQuery"])(expression, action.key, action.value, undefined, true);
            break;
          }

        case 'ADD_FILTER_OUT':
          {
            expression = Object(app_plugins_datasource_prometheus_add_label_to_query__WEBPACK_IMPORTED_MODULE_5__["addLabelToQuery"])(expression, action.key, action.value, '!=', true);
            break;
          }

        default:
          break;
      }

      return _objectSpread({}, query, {
        expr: expression
      });
    }
  }, {
    key: "getHighlighterExpression",
    value: function getHighlighterExpression(query) {
      return Object(_query_utils__WEBPACK_IMPORTED_MODULE_8__["getHighlighterExpressionsFromQuery"])(query.expr);
    }
  }, {
    key: "getTime",
    value: function getTime(date, roundUp) {
      if (typeof date === 'string') {
        date = _grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateMath"].parse(date, roundUp);
      }

      return Math.ceil(date.valueOf() * 1e6);
    }
  }, {
    key: "testDatasource",
    value: function testDatasource() {
      // Consider only last 10 minutes otherwise request takes too long
      var startMs = Date.now() - 10 * 60 * 1000;
      var start = "".concat(startMs, "000000"); // API expects nanoseconds

      return this._request("".concat(LOKI_ENDPOINT, "/label"), {
        start: start
      }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
        var _res$data, _res$data2;

        var values = (res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.data) || (res === null || res === void 0 ? void 0 : (_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.values) || [];
        var testResult = values.length > 0 ? {
          status: 'success',
          message: 'Data source connected and labels found.'
        } : {
          status: 'error',
          message: 'Data source connected, but no labels received. Verify that Loki and Promtail is configured properly.'
        };
        return testResult;
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function (err) {
        var message = 'Loki: ';

        if (err.statusText) {
          message += err.statusText;
        } else {
          message += 'Cannot connect to Loki';
        }

        if (err.status) {
          message += ". ".concat(err.status);
        }

        if (err.data && err.data.message) {
          message += ". ".concat(err.data.message);
        } else if (err.data) {
          message += ". ".concat(err.data);
        }

        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])({
          status: 'error',
          message: message
        });
      })).toPromise();
    }
  }, {
    key: "annotationQuery",
    value: function () {
      var _annotationQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(options) {
        var interpolatedExpr, query, _ref, data, annotations, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop, _iterator2, _step2;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (options.annotation.expr) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return", []);

              case 2:
                interpolatedExpr = this.templateSrv.replace(options.annotation.expr, {}, this.interpolateQueryExpr);
                query = {
                  refId: "annotation-".concat(options.annotation.name),
                  expr: interpolatedExpr
                };
                _context7.next = 6;
                return this.runRangeQuery(query, options).toPromise();

              case 6:
                _ref = _context7.sent;
                data = _ref.data;
                annotations = [];
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context7.prev = 12;

                _loop = function _loop() {
                  var frame = _step2.value;
                  var tags = [];
                  var _iteratorNormalCompletion3 = true;
                  var _didIteratorError3 = false;
                  var _iteratorError3 = undefined;

                  try {
                    for (var _iterator3 = frame.fields[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                      var field = _step3.value;

                      if (field.labels) {
                        tags.push.apply(tags, _toConsumableArray(new Set(Object.values(field.labels).map(function (label) {
                          return label.trim();
                        }))));
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

                  var view = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["DataFrameView"](frame);
                  view.forEach(function (row) {
                    annotations.push({
                      time: new Date(row.ts).valueOf(),
                      text: row.line,
                      tags: tags
                    });
                  });
                };

                for (_iterator2 = data[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  _loop();
                }

                _context7.next = 21;
                break;

              case 17:
                _context7.prev = 17;
                _context7.t0 = _context7["catch"](12);
                _didIteratorError2 = true;
                _iteratorError2 = _context7.t0;

              case 21:
                _context7.prev = 21;
                _context7.prev = 22;

                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }

              case 24:
                _context7.prev = 24;

                if (!_didIteratorError2) {
                  _context7.next = 27;
                  break;
                }

                throw _iteratorError2;

              case 27:
                return _context7.finish(24);

              case 28:
                return _context7.finish(21);

              case 29:
                return _context7.abrupt("return", annotations);

              case 30:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[12, 17, 21, 29], [22,, 24, 28]]);
      }));

      function annotationQuery(_x12) {
        return _annotationQuery.apply(this, arguments);
      }

      return annotationQuery;
    }()
  }, {
    key: "showContextToggle",
    value: function showContextToggle(row) {
      return (row && row.searchWords && row.searchWords.length > 0) === true;
    }
  }, {
    key: "throwUnless",
    value: function throwUnless(err, condition, target) {
      if (condition) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(err);
      }

      var error = this.processError(err, target);
      throw error;
    }
  }, {
    key: "processError",
    value: function processError(err, target) {
      var error = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"])(err);

      if (err.data.message.includes('escape') && target.expr.includes('\\')) {
        error.data.message = "Error: ".concat(err.data.message, ". Make sure that all special characters are escaped with \\. For more information on escaping of special characters visit LogQL documentation at https://github.com/grafana/loki/blob/master/docs/logql.md.");
      }

      return error;
    }
  }, {
    key: "adjustInterval",
    value: function adjustInterval(interval, range) {
      // Loki will drop queries that might return more than 11000 data points.
      // Calibrate interval if it is too small.
      if (interval !== 0 && range / interval > 11000) {
        interval = Math.ceil(range / 11000);
      }

      return Math.max(interval, 1000);
    }
  }]);

  return LokiDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["DataSourceApi"]);
function lokiRegularEscape(value) {
  if (typeof value === 'string') {
    return value.replace(/'/g, "\\\\'");
  }

  return value;
}
function lokiSpecialRegexEscape(value) {
  if (typeof value === 'string') {
    return lokiRegularEscape(value.replace(/\\/g, '\\\\\\\\').replace(/[$^*{}\[\]+?.()|]/g, '\\\\$&'));
  }

  return value;
}
/* harmony default export */ __webpack_exports__["default"] = (LokiDatasource);

/***/ }),

/***/ "./public/app/plugins/datasource/loki/language_provider.ts":
/*!*****************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/language_provider.ts ***!
  \*****************************************************************/
/*! exports provided: LABEL_REFRESH_INTERVAL, rangeToParams, addHistoryMetadata, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LABEL_REFRESH_INTERVAL", function() { return LABEL_REFRESH_INTERVAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangeToParams", function() { return rangeToParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addHistoryMetadata", function() { return addHistoryMetadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LokiLanguageProvider; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lru_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lru-cache */ "./node_modules/lru-cache/index.js");
/* harmony import */ var lru_cache__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lru_cache__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_plugins_datasource_prometheus_language_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/plugins/datasource/prometheus/language_utils */ "./public/app/plugins/datasource/prometheus/language_utils.ts");
/* harmony import */ var _syntax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./syntax */ "./public/app/plugins/datasource/loki/syntax.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _prometheus_promql__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../prometheus/promql */ "./public/app/plugins/datasource/prometheus/promql.ts");
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Libraries

 // Services & Utils


 // Types



var DEFAULT_KEYS = ['job', 'namespace'];
var EMPTY_SELECTOR = '{}';
var HISTORY_ITEM_COUNT = 10;
var HISTORY_COUNT_CUTOFF = 1000 * 60 * 60 * 24; // 24h

var NS_IN_MS = 1000000;
var LABEL_REFRESH_INTERVAL = 1000 * 30; // 30sec

var wrapLabel = function wrapLabel(label) {
  return {
    label: label
  };
};

var rangeToParams = function rangeToParams(range) {
  return {
    start: range.from * NS_IN_MS,
    end: range.to * NS_IN_MS
  };
};
function addHistoryMetadata(item, history) {
  var cutoffTs = Date.now() - HISTORY_COUNT_CUTOFF;
  var historyForItem = history.filter(function (h) {
    return h.ts > cutoffTs && h.query.expr === item.label;
  });
  var hint = "\u5728\u6700\u8FD124\u5C0F\u65F6\u5185\u67E5\u8BE2 ".concat(historyForItem.length, " \u6B21\u3002");
  var recent = historyForItem[0];

  if (recent) {
    var lastQueried = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["dateTime"])(recent.ts).fromNow();
    hint = "".concat(hint, " \u6700\u540E\u67E5\u8BE2 ").concat(lastQueried, ".");
  }

  return _objectSpread({}, item, {
    documentation: hint
  });
}

var LokiLanguageProvider =
/*#__PURE__*/
function (_LanguageProvider) {
  _inherits(LokiLanguageProvider, _LanguageProvider);

  // Dynamically set to true for big/slow instances

  /**
   *  Cache for labels of series. This is bit simplistic in the sense that it just counts responses each as a 1 and does
   *  not account for different size of a response. If that is needed a `length` function can be added in the options.
   *  10 as a max size is totally arbitrary right now.
   */
  function LokiLanguageProvider(datasource, initialValues) {
    var _this;

    _classCallCheck(this, LokiLanguageProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LokiLanguageProvider).call(this));
    _this.seriesCache = new lru_cache__WEBPACK_IMPORTED_MODULE_1___default.a(10);
    _this.labelsCache = new lru_cache__WEBPACK_IMPORTED_MODULE_1___default.a(10);

    _this.cleanText = function (s) {
      return s.replace(/[{}[\]="(),!~+\-*/^%]/g, '').trim();
    };

    _this.request =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(url, params) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this.datasource.metadataRequest(url, params);

              case 3:
                return _context.abrupt("return", _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);

              case 9:
                return _context.abrupt("return", undefined);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.start = function () {
      if (!_this.startTask) {
        _this.startTask = _this.fetchLogLabels(_this.initialRange).then(function () {
          _this.started = true;
          return [];
        });
      }

      return _this.startTask;
    };

    _this.getBeginningCompletionItems = function (context) {
      return {
        suggestions: [].concat(_toConsumableArray(_this.getEmptyCompletionItems(context).suggestions), _toConsumableArray(_this.getTermCompletionItems().suggestions))
      };
    };

    _this.getTermCompletionItems = function () {
      var suggestions = [];
      suggestions.push({
        prefixMatch: true,
        label: '功能',
        items: _syntax__WEBPACK_IMPORTED_MODULE_3__["FUNCTIONS"].map(function (suggestion) {
          return _objectSpread({}, suggestion, {
            kind: 'function'
          });
        })
      });
      return {
        suggestions: suggestions
      };
    };

    _this.fetchSeriesLabels =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(match, absoluteRange) {
        var rangeParams, url, start, end, cacheKey, params, value, data, _processLabels, values;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                rangeParams = absoluteRange ? rangeToParams(absoluteRange) : {
                  start: 0,
                  end: 0
                };
                url = '/loki/api/v1/series';
                start = rangeParams.start, end = rangeParams.end;
                cacheKey = _this.generateCacheKey(url, start, end, match);
                params = {
                  match: match,
                  start: start,
                  end: end
                };
                value = _this.seriesCache.get(cacheKey);

                if (value) {
                  _context2.next = 14;
                  break;
                }

                // Clear value when requesting new one. Empty object being truthy also makes sure we don't request twice.
                _this.seriesCache.set(cacheKey, {});

                _context2.next = 10;
                return _this.request(url, params);

              case 10:
                data = _context2.sent;
                _processLabels = Object(app_plugins_datasource_prometheus_language_utils__WEBPACK_IMPORTED_MODULE_2__["processLabels"])(data), values = _processLabels.values;
                value = values;

                _this.seriesCache.set(cacheKey, value);

              case 14:
                return _context2.abrupt("return", value);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.addLabelValuesToOptions = function (labelKey, values) {
      return _this.logLabelOptions.map(function (keyOption) {
        return keyOption.value === labelKey ? _objectSpread({}, keyOption, {
          children: values.map(function (value) {
            return {
              label: value,
              value: value
            };
          })
        }) : keyOption;
      });
    };

    _this.datasource = datasource;
    _this.labelKeys = [];
    _this.logLabelFetchTs = 0;
    Object.assign(_assertThisInitialized(_this), initialValues);
    return _this;
  } // Strip syntax chars


  _createClass(LokiLanguageProvider, [{
    key: "getSyntax",
    value: function getSyntax() {
      return _syntax__WEBPACK_IMPORTED_MODULE_3__["default"];
    }
  }, {
    key: "getLabelKeys",
    value: function getLabelKeys() {
      return this.labelKeys;
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
      regeneratorRuntime.mark(function _callee3(input, context) {
        var wrapperClasses, value, prefix, text, emptyResult, empty, selectedLines, currentLine, nextCharacter, tokenRecognized, prefixUnrecognized, noSuffix, safePrefix, operatorsPattern, isNextOperand;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                wrapperClasses = input.wrapperClasses, value = input.value, prefix = input.prefix, text = input.text;
                emptyResult = {
                  suggestions: []
                };

                if (value) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", emptyResult);

              case 4:
                // Local text properties
                empty = (value === null || value === void 0 ? void 0 : value.document.text.length) === 0;
                selectedLines = value.document.getTextsAtRange(value.selection);
                currentLine = selectedLines.size === 1 ? selectedLines.first().getText() : null;
                nextCharacter = currentLine ? currentLine[value.selection.anchor.offset] : null; // Syntax spans have 3 classes by default. More indicate a recognized token

                tokenRecognized = wrapperClasses.length > 3; // Non-empty prefix, but not inside known token

                prefixUnrecognized = prefix && !tokenRecognized; // Prevent suggestions in `function(|suffix)`

                noSuffix = !nextCharacter || nextCharacter === ')'; // Prefix is safe if it does not immediately follow a complete expression and has no text after it

                safePrefix = prefix && !text.match(/^['"~=\]})\s]+$/) && noSuffix; // About to type next operand if preceded by binary operator

                operatorsPattern = /[+\-*/^%]/;
                isNextOperand = text.match(operatorsPattern); // Determine candidates by CSS context

                if (!wrapperClasses.includes('context-range')) {
                  _context3.next = 18;
                  break;
                }

                return _context3.abrupt("return", this.getRangeCompletionItems());

              case 18:
                if (!wrapperClasses.includes('context-labels')) {
                  _context3.next = 24;
                  break;
                }

                _context3.next = 21;
                return this.getLabelCompletionItems(input, context);

              case 21:
                return _context3.abrupt("return", _context3.sent);

              case 24:
                if (!empty) {
                  _context3.next = 28;
                  break;
                }

                return _context3.abrupt("return", this.getEmptyCompletionItems(context));

              case 28:
                if (!(prefixUnrecognized && noSuffix && !isNextOperand)) {
                  _context3.next = 32;
                  break;
                }

                return _context3.abrupt("return", this.getBeginningCompletionItems(context));

              case 32:
                if (!(prefixUnrecognized && safePrefix)) {
                  _context3.next = 34;
                  break;
                }

                return _context3.abrupt("return", this.getTermCompletionItems());

              case 34:
                return _context3.abrupt("return", emptyResult);

              case 35:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function provideCompletionItems(_x5, _x6) {
        return _provideCompletionItems.apply(this, arguments);
      }

      return provideCompletionItems;
    }()
  }, {
    key: "getEmptyCompletionItems",
    value: function getEmptyCompletionItems(context) {
      var history = context === null || context === void 0 ? void 0 : context.history;
      var suggestions = [];

      if (history && history.length) {
        var historyItems = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.chain(history).map(function (h) {
          return h.query.expr;
        }).filter().uniq().take(HISTORY_ITEM_COUNT).map(wrapLabel).map(function (item) {
          return addHistoryMetadata(item, history);
        }).value();

        suggestions.push({
          prefixMatch: true,
          skipSort: true,
          label: '历史',
          items: historyItems
        });
      }

      return {
        suggestions: suggestions
      };
    }
  }, {
    key: "getRangeCompletionItems",
    value: function getRangeCompletionItems() {
      return {
        context: 'context-range',
        suggestions: [{
          label: '范围向量',
          items: _toConsumableArray(_prometheus_promql__WEBPACK_IMPORTED_MODULE_5__["RATE_RANGES"])
        }]
      };
    }
  }, {
    key: "getLabelCompletionItems",
    value: function () {
      var _getLabelCompletionItems = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(_ref3, _ref4) {
        var text, wrapperClasses, labelKey, value, absoluteRange, context, suggestions, line, cursorOffset, isValueStart, selector, parsedSelector, allLabels, existingKeys, labelValues, labelValuesForKey, labelKeys, possibleKeys, newItems, newSuggestion;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                text = _ref3.text, wrapperClasses = _ref3.wrapperClasses, labelKey = _ref3.labelKey, value = _ref3.value;
                absoluteRange = _ref4.absoluteRange;
                context = 'context-labels';
                suggestions = [];

                if (value) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", {
                  context: context,
                  suggestions: []
                });

              case 6:
                line = value.anchorBlock.getText();
                cursorOffset = value.selection.anchor.offset;
                isValueStart = text.match(/^(=|=~|!=|!~)/); // Get normalized selector

                try {
                  parsedSelector = Object(app_plugins_datasource_prometheus_language_utils__WEBPACK_IMPORTED_MODULE_2__["parseSelector"])(line, cursorOffset);
                  selector = parsedSelector.selector;
                } catch (_unused) {
                  selector = EMPTY_SELECTOR;
                }

                if (!(!isValueStart && selector === EMPTY_SELECTOR)) {
                  _context4.next = 15;
                  break;
                }

                _context4.next = 13;
                return this.start();

              case 13:
                allLabels = this.getLabelKeys();
                return _context4.abrupt("return", {
                  context: context,
                  suggestions: [{
                    label: "\u6807\u7B7E",
                    items: allLabels.map(wrapLabel)
                  }]
                });

              case 15:
                existingKeys = parsedSelector ? parsedSelector.labelKeys : [];

                if (!selector) {
                  _context4.next = 27;
                  break;
                }

                if (!(selector === EMPTY_SELECTOR && labelKey)) {
                  _context4.next = 24;
                  break;
                }

                _context4.next = 20;
                return this.getLabelValues(labelKey, absoluteRange);

              case 20:
                labelValuesForKey = _context4.sent;
                labelValues = _defineProperty({}, labelKey, labelValuesForKey);
                _context4.next = 27;
                break;

              case 24:
                _context4.next = 26;
                return this.getSeriesLabels(selector, absoluteRange);

              case 26:
                labelValues = _context4.sent;

              case 27:
                if (labelValues) {
                  _context4.next = 30;
                  break;
                }

                console.warn("\u670D\u52A1\u5668\u6CA1\u4E3A\u9009\u62E9\u5668=".concat(selector, "\u8FD4\u56DE\u4EFB\u4F55\u503C"));
                return _context4.abrupt("return", {
                  context: context,
                  suggestions: suggestions
                });

              case 30:
                if (text && isValueStart || wrapperClasses.includes('attr-value')) {
                  // Label values
                  if (labelKey && labelValues[labelKey]) {
                    context = 'context-label-values';
                    suggestions.push({
                      label: "\"".concat(labelKey, "\"\u7684\u6807\u7B7E\u503C"),
                      items: labelValues[labelKey].map(wrapLabel)
                    });
                  }
                } else {
                  // Label keys
                  labelKeys = labelValues ? Object.keys(labelValues) : DEFAULT_KEYS;

                  if (labelKeys) {
                    possibleKeys = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.difference(labelKeys, existingKeys);

                    if (possibleKeys.length) {
                      newItems = possibleKeys.map(function (key) {
                        return {
                          label: key
                        };
                      });
                      newSuggestion = {
                        label: "\u6807\u7B7E",
                        items: newItems
                      };
                      suggestions.push(newSuggestion);
                    }
                  }
                }

                return _context4.abrupt("return", {
                  context: context,
                  suggestions: suggestions
                });

              case 32:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getLabelCompletionItems(_x7, _x8) {
        return _getLabelCompletionItems.apply(this, arguments);
      }

      return getLabelCompletionItems;
    }()
  }, {
    key: "importQueries",
    value: function () {
      var _importQueries = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(queries, datasourceType) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(datasourceType === 'prometheus')) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", Promise.all(queries.map(
                /*#__PURE__*/
                function () {
                  var _ref5 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee5(query) {
                    var expr, _ref6, rest;

                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return _this2.importPrometheusQuery(query.expr);

                          case 2:
                            expr = _context5.sent;
                            _ref6 = query, rest = Object.assign({}, _ref6);
                            return _context5.abrupt("return", _objectSpread({}, rest, {
                              expr: expr
                            }));

                          case 5:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  }));

                  return function (_x11) {
                    return _ref5.apply(this, arguments);
                  };
                }())));

              case 2:
                return _context6.abrupt("return", queries.map(function (query) {
                  return {
                    refId: query.refId,
                    expr: ''
                  };
                }));

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function importQueries(_x9, _x10) {
        return _importQueries.apply(this, arguments);
      }

      return importQueries;
    }()
  }, {
    key: "importPrometheusQuery",
    value: function () {
      var _importPrometheusQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(query) {
        var selectorMatch, selector, labels, existingKeys, labelsToKeep, _key, labelKeys, cleanSelector;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (query) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return", '');

              case 2:
                // Consider only first selector in query
                selectorMatch = query.match(app_plugins_datasource_prometheus_language_utils__WEBPACK_IMPORTED_MODULE_2__["selectorRegexp"]);

                if (selectorMatch) {
                  _context7.next = 5;
                  break;
                }

                return _context7.abrupt("return", '');

              case 5:
                selector = selectorMatch[0];
                labels = {};
                selector.replace(app_plugins_datasource_prometheus_language_utils__WEBPACK_IMPORTED_MODULE_2__["labelRegexp"], function (_, key, operator, value) {
                  labels[key] = {
                    value: value,
                    operator: operator
                  };
                  return '';
                }); // Keep only labels that exist on origin and target datasource

                _context7.next = 10;
                return this.start();

              case 10:
                // fetches all existing label keys
                existingKeys = this.labelKeys;
                labelsToKeep = {};

                if (existingKeys && existingKeys.length) {
                  // Check for common labels
                  for (_key in labels) {
                    if (existingKeys && existingKeys.includes(_key)) {
                      // Should we check for label value equality here?
                      labelsToKeep[_key] = labels[_key];
                    }
                  }
                } else {
                  // Keep all labels by default
                  labelsToKeep = labels;
                }

                labelKeys = Object.keys(labelsToKeep).sort();
                cleanSelector = labelKeys.map(function (key) {
                  return "".concat(key).concat(labelsToKeep[key].operator).concat(labelsToKeep[key].value);
                }).join(',');
                return _context7.abrupt("return", ['{', cleanSelector, '}'].join(''));

              case 16:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function importPrometheusQuery(_x12) {
        return _importPrometheusQuery.apply(this, arguments);
      }

      return importPrometheusQuery;
    }()
  }, {
    key: "getSeriesLabels",
    value: function () {
      var _getSeriesLabels = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(selector, absoluteRange) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this.lookupsDisabled) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return", undefined);

              case 2:
                _context8.prev = 2;
                _context8.next = 5;
                return this.fetchSeriesLabels(selector, absoluteRange);

              case 5:
                return _context8.abrupt("return", _context8.sent);

              case 8:
                _context8.prev = 8;
                _context8.t0 = _context8["catch"](2);
                // TODO: better error handling
                console.error(_context8.t0);
                return _context8.abrupt("return", undefined);

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[2, 8]]);
      }));

      function getSeriesLabels(_x13, _x14) {
        return _getSeriesLabels.apply(this, arguments);
      }

      return getSeriesLabels;
    }()
    /**
     * Fetches all label keys
     * @param absoluteRange Fetches
     */

  }, {
    key: "fetchLogLabels",
    value: function () {
      var _fetchLogLabels = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(absoluteRange) {
        var url, rangeParams, res;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                url = '/loki/api/v1/label';
                _context9.prev = 1;
                this.logLabelFetchTs = Date.now().valueOf();
                rangeParams = absoluteRange ? rangeToParams(absoluteRange) : {};
                _context9.next = 6;
                return this.request(url, rangeParams);

              case 6:
                res = _context9.sent;
                this.labelKeys = res.slice().sort();
                this.logLabelOptions = this.labelKeys.map(function (key) {
                  return {
                    label: key,
                    value: key,
                    isLeaf: false
                  };
                });
                _context9.next = 14;
                break;

              case 11:
                _context9.prev = 11;
                _context9.t0 = _context9["catch"](1);
                console.error(_context9.t0);

              case 14:
                return _context9.abrupt("return", []);

              case 15:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[1, 11]]);
      }));

      function fetchLogLabels(_x15) {
        return _fetchLogLabels.apply(this, arguments);
      }

      return fetchLogLabels;
    }()
  }, {
    key: "refreshLogLabels",
    value: function () {
      var _refreshLogLabels = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(absoluteRange, forceRefresh) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(this.labelKeys && Date.now().valueOf() - this.logLabelFetchTs > LABEL_REFRESH_INTERVAL || forceRefresh)) {
                  _context10.next = 3;
                  break;
                }

                _context10.next = 3;
                return this.fetchLogLabels(absoluteRange);

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function refreshLogLabels(_x16, _x17) {
        return _refreshLogLabels.apply(this, arguments);
      }

      return refreshLogLabels;
    }()
    /**
     * Fetch labels for a selector. This is cached by it's args but also by the global timeRange currently selected as
     * they can change over requested time.
     * @param name
     */

  }, {
    key: "generateCacheKey",
    // Cache key is a bit different here. We round up to a minute the intervals.
    // The rounding may seem strange but makes relative intervals like now-1h less prone to need separate request every
    // millisecond while still actually getting all the keys for the correct interval. This still can create problems
    // when user does not the newest values for a minute if already cached.
    value: function generateCacheKey(url, start, end, param) {
      return [url, this.roundTime(start), this.roundTime(end), param].join();
    } // Round nanos epoch to nearest 5 minute interval

  }, {
    key: "roundTime",
    value: function roundTime(nanos) {
      return nanos ? Math.floor(nanos / NS_IN_MS / 1000 / 60 / 5) : 0;
    }
  }, {
    key: "getLabelValues",
    value: function () {
      var _getLabelValues = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(key) {
        var absoluteRange,
            _args11 = arguments;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                absoluteRange = _args11.length > 1 && _args11[1] !== undefined ? _args11[1] : this.initialRange;
                _context11.next = 3;
                return this.fetchLabelValues(key, absoluteRange);

              case 3:
                return _context11.abrupt("return", _context11.sent);

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function getLabelValues(_x18) {
        return _getLabelValues.apply(this, arguments);
      }

      return getLabelValues;
    }()
  }, {
    key: "fetchLabelValues",
    value: function () {
      var _fetchLabelValues = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12(key, absoluteRange) {
        var _value;

        var url, values, rangeParams, start, end, cacheKey, params, value, res;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                url = "/loki/api/v1/label/".concat(key, "/values");
                values = [];
                rangeParams = absoluteRange ? rangeToParams(absoluteRange) : {
                  start: 0,
                  end: 0
                };
                start = rangeParams.start, end = rangeParams.end;
                cacheKey = this.generateCacheKey(url, start, end, key);
                params = {
                  start: start,
                  end: end
                };
                value = this.labelsCache.get(cacheKey);

                if (value) {
                  _context12.next = 24;
                  break;
                }

                _context12.prev = 8;
                // Clear value when requesting new one. Empty object being truthy also makes sure we don't request twice.
                this.labelsCache.set(cacheKey, []);
                _context12.next = 12;
                return this.request(url, params);

              case 12:
                res = _context12.sent;
                values = res.slice().sort();
                value = values;
                this.labelsCache.set(cacheKey, value);
                this.logLabelOptions = this.addLabelValuesToOptions(key, values);
                _context12.next = 22;
                break;

              case 19:
                _context12.prev = 19;
                _context12.t0 = _context12["catch"](8);
                console.error(_context12.t0);

              case 22:
                _context12.next = 25;
                break;

              case 24:
                this.logLabelOptions = this.addLabelValuesToOptions(key, value);

              case 25:
                return _context12.abrupt("return", (_value = value) !== null && _value !== void 0 ? _value : []);

              case 26:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[8, 19]]);
      }));

      function fetchLabelValues(_x19, _x20) {
        return _fetchLabelValues.apply(this, arguments);
      }

      return fetchLabelValues;
    }()
  }]);

  return LokiLanguageProvider;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["LanguageProvider"]);



/***/ }),

/***/ "./public/app/plugins/datasource/loki/live_streams.ts":
/*!************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/live_streams.ts ***!
  \************************************************************/
/*! exports provided: LiveStreams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveStreams", function() { return LiveStreams; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_webSocket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/webSocket */ "./node_modules/rxjs/_esm5/webSocket/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _result_transformer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./result_transformer */ "./public/app/plugins/datasource/loki/result_transformer.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






/**
 * Maps directly to a query in the UI (refId is key)
 */

/**
 * Cache of websocket streams that can be returned as observable. In case there already is a stream for particular
 * target it is returned and on subscription returns the latest dataFrame.
 */
var LiveStreams =
/*#__PURE__*/
function () {
  function LiveStreams() {
    _classCallCheck(this, LiveStreams);

    this.streams = {};
  }

  _createClass(LiveStreams, [{
    key: "getStream",
    value: function getStream(target) {
      var _this = this;

      var stream = this.streams[target.url];

      if (stream) {
        return stream;
      }

      var data = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["CircularDataFrame"]({
        capacity: target.size
      });
      data.addField({
        name: 'ts',
        type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].time,
        config: {
          displayName: 'Time'
        }
      });
      data.addField({
        name: 'tsNs',
        type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].time,
        config: {
          displayName: 'Time ns'
        }
      });
      data.addField({
        name: 'line',
        type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].string
      }).labels = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["parseLabels"])(target.query);
      data.addField({
        name: 'labels',
        type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].other
      }); // The labels for each line

      data.addField({
        name: 'id',
        type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].string
      });
      data.meta = _objectSpread({}, data.meta, {
        preferredVisualisationType: 'logs'
      });
      stream = Object(rxjs_webSocket__WEBPACK_IMPORTED_MODULE_2__["webSocket"])(target.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
        Object(_result_transformer__WEBPACK_IMPORTED_MODULE_4__["appendResponseToBufferedData"])(response, data);
        return [data];
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])("error: ".concat(err.reason));
      }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["finalize"])(function () {
        delete _this.streams[target.url];
      }));
      this.streams[target.url] = stream;
      return stream;
    }
  }]);

  return LiveStreams;
}();

/***/ }),

/***/ "./public/app/plugins/datasource/loki/module.ts":
/*!******************************************************!*\
  !*** ./public/app/plugins/datasource/loki/module.ts ***!
  \******************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/loki/datasource.ts");
/* harmony import */ var _components_LokiCheatSheet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/LokiCheatSheet */ "./public/app/plugins/datasource/loki/components/LokiCheatSheet.tsx");
/* harmony import */ var _components_LokiExploreQueryEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/LokiExploreQueryEditor */ "./public/app/plugins/datasource/loki/components/LokiExploreQueryEditor.tsx");
/* harmony import */ var _components_LokiQueryEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/LokiQueryEditor */ "./public/app/plugins/datasource/loki/components/LokiQueryEditor.tsx");
/* harmony import */ var _LokiAnnotationsQueryCtrl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LokiAnnotationsQueryCtrl */ "./public/app/plugins/datasource/loki/LokiAnnotationsQueryCtrl.tsx");
/* harmony import */ var _configuration_ConfigEditor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./configuration/ConfigEditor */ "./public/app/plugins/datasource/loki/configuration/ConfigEditor.tsx");







var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_1__["default"]).setQueryEditor(_components_LokiQueryEditor__WEBPACK_IMPORTED_MODULE_4__["default"]).setConfigEditor(_configuration_ConfigEditor__WEBPACK_IMPORTED_MODULE_6__["ConfigEditor"]).setExploreQueryField(_components_LokiExploreQueryEditor__WEBPACK_IMPORTED_MODULE_3__["default"]).setExploreStartPage(_components_LokiCheatSheet__WEBPACK_IMPORTED_MODULE_2__["default"]).setAnnotationQueryCtrl(_LokiAnnotationsQueryCtrl__WEBPACK_IMPORTED_MODULE_5__["LokiAnnotationsQueryCtrl"]);

/***/ }),

/***/ "./public/app/plugins/datasource/loki/query_utils.ts":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/loki/query_utils.ts ***!
  \***********************************************************/
/*! exports provided: formatQuery, getHighlighterExpressionsFromQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatQuery", function() { return formatQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHighlighterExpressionsFromQuery", function() { return getHighlighterExpressionsFromQuery; });
/* harmony import */ var lodash_escapeRegExp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/escapeRegExp */ "./node_modules/lodash/escapeRegExp.js");
/* harmony import */ var lodash_escapeRegExp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_escapeRegExp__WEBPACK_IMPORTED_MODULE_0__);

function formatQuery(selector) {
  return "".concat(selector || '').trim();
}
/**
 * Returns search terms from a LogQL query.
 * E.g., `{} |= foo |=bar != baz` returns `['foo', 'bar']`.
 */

function getHighlighterExpressionsFromQuery(input) {
  var expression = input;
  var results = []; // Consume filter expression from left to right

  while (expression) {
    var filterStart = expression.search(/\|=|\|~|!=|!~/); // Nothing more to search

    if (filterStart === -1) {
      break;
    } // Drop terms for negative filters


    var filterOperator = expression.substr(filterStart, 2);
    var skip = expression.substr(filterStart).search(/!=|!~/) === 0;
    expression = expression.substr(filterStart + 2);

    if (skip) {
      continue;
    } // Check if there is more chained


    var filterEnd = expression.search(/\|=|\|~|!=|!~/);
    var filterTerm = void 0;

    if (filterEnd === -1) {
      filterTerm = expression.trim();
    } else {
      filterTerm = expression.substr(0, filterEnd).trim();
      expression = expression.substr(filterEnd);
    } // Unwrap the filter term by removing quotes


    var quotedTerm = filterTerm.match(/^"((?:[^\\"]|\\")*)"$/);

    if (quotedTerm) {
      var unwrappedFilterTerm = quotedTerm[1];
      var regexOperator = filterOperator === '|~';
      results.push(regexOperator ? unwrappedFilterTerm : lodash_escapeRegExp__WEBPACK_IMPORTED_MODULE_0___default()(unwrappedFilterTerm));
    } else {
      return [];
    }
  }

  return results;
}

/***/ }),

/***/ "./public/app/plugins/datasource/loki/result_transformer.ts":
/*!******************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/result_transformer.ts ***!
  \******************************************************************/
/*! exports provided: lokiStreamResultToDataFrame, appendResponseToBufferedData, lokiResultsToTableModel, createMetricLabel, decamelize, lokiStreamsToDataframes, enhanceDataFrame, rangeQueryResponseToTimeSeries, processRangeQueryResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lokiStreamResultToDataFrame", function() { return lokiStreamResultToDataFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendResponseToBufferedData", function() { return appendResponseToBufferedData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lokiResultsToTableModel", function() { return lokiResultsToTableModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMetricLabel", function() { return createMetricLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decamelize", function() { return decamelize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lokiStreamsToDataframes", function() { return lokiStreamsToDataframes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enhanceDataFrame", function() { return enhanceDataFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangeQueryResponseToTimeSeries", function() { return rangeQueryResponseToTimeSeries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processRangeQueryResponse", function() { return processRangeQueryResponse; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! md5 */ "./node_modules/md5/md5.js");
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(md5__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/features/templating/template_srv */ "./public/app/features/templating/template_srv.ts");
/* harmony import */ var app_core_table_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/table_model */ "./public/app/core/table_model.ts");
/* harmony import */ var _query_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./query_utils */ "./public/app/plugins/datasource/loki/query_utils.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./types */ "./public/app/plugins/datasource/loki/types.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









/**
 * Transforms LokiStreamResult structure into a dataFrame. Used when doing standard queries and newer version of Loki.
 */

function lokiStreamResultToDataFrame(stream, reverse, refId) {
  var labels = stream.stream;
  var labelsString = Object.entries(labels).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return "".concat(key, "=\"").concat(val, "\"");
  }).sort().join('');
  var times = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["ArrayVector"]([]);
  var timesNs = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["ArrayVector"]([]);
  var lines = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["ArrayVector"]([]);
  var uids = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["ArrayVector"]([]);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = stream.values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          ts = _step$value[0],
          line = _step$value[1];

      // num ns epoch in string, we convert it to iso string here so it matches old format
      times.add(new Date(parseInt(ts.substr(0, ts.length - 6), 10)).toISOString());
      timesNs.add(ts);
      lines.add(line);
      uids.add(createUid(ts, labelsString, line));
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

  return constructDataFrame(times, timesNs, lines, uids, labels, reverse, refId);
}
/**
 * Constructs dataFrame with supplied fields and other data. Also makes sure it is properly reversed if needed.
 */

function constructDataFrame(times, timesNs, lines, uids, labels, reverse, refId) {
  var dataFrame = {
    refId: refId,
    fields: [{
      name: 'ts',
      type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].time,
      config: {
        displayName: 'Time'
      },
      values: times
    }, // Time
    {
      name: 'line',
      type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].string,
      config: {},
      values: lines,
      labels: labels
    }, // Line - needs to be the first field with string type
    {
      name: 'id',
      type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].string,
      config: {},
      values: uids
    }, {
      name: 'tsNs',
      type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].time,
      config: {
        displayName: 'Time ns'
      },
      values: timesNs
    } // Time
    ],
    length: times.length
  };

  if (reverse) {
    var mutableDataFrame = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["MutableDataFrame"](dataFrame);
    mutableDataFrame.reverse();
    return mutableDataFrame;
  }

  return dataFrame;
}
/**
 * Transform LokiResponse data and appends it to MutableDataFrame. Used for streaming where the dataFrame can be
 * a CircularDataFrame creating a fixed size rolling buffer.
 * TODO: Probably could be unified with the logStreamToDataFrame function.
 * @param response
 * @param data Needs to have ts, line, labels, id as fields
 */


function appendResponseToBufferedData(response, data) {
  // Should we do anything with: response.dropped_entries?
  var streams = response.streams;

  if (!streams || !streams.length) {
    return;
  }

  var baseLabels = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = data.fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var f = _step2.value;

      if (f.type === _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].string) {
        if (f.labels) {
          baseLabels = f.labels;
        }

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

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = streams[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var stream = _step3.value;
      // Find unique labels
      var unique = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["findUniqueLabels"])(stream.stream, baseLabels);
      var allLabelsString = Object.entries(stream.stream).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            val = _ref4[1];

        return "".concat(key, "=\"").concat(val, "\"");
      }).sort().join(''); // Add each line

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = stream.values[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _step4$value = _slicedToArray(_step4.value, 2),
              ts = _step4$value[0],
              line = _step4$value[1];

          data.values.ts.add(new Date(parseInt(ts.substr(0, ts.length - 6), 10)).toISOString());
          data.values.tsNs.add(ts);
          data.values.line.add(line);
          data.values.labels.add(unique);
          data.values.id.add(createUid(ts, allLabelsString, line));
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
}

function createUid(ts, labelsString, line) {
  return md5__WEBPACK_IMPORTED_MODULE_1___default()("".concat(ts, "_").concat(labelsString, "_").concat(line));
}

function lokiMatrixToTimeSeries(matrixResult, options) {
  var name = createMetricLabel(matrixResult.metric, options);
  return {
    target: name,
    title: name,
    datapoints: lokiPointsToTimeseriesPoints(matrixResult.values, options),
    tags: matrixResult.metric,
    meta: options.meta,
    refId: options.refId
  };
}

function lokiPointsToTimeseriesPoints(data, options) {
  var stepMs = options.step * 1000;
  var datapoints = [];
  var baseTimestampMs = options.start / 1e6;
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = data[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var _step5$value = _slicedToArray(_step5.value, 2),
          time = _step5$value[0],
          value = _step5$value[1];

      var datapointValue = parseFloat(value);

      if (isNaN(datapointValue)) {
        datapointValue = null;
      }

      var timestamp = time * 1000;

      for (var _t = baseTimestampMs; _t < timestamp; _t += stepMs) {
        datapoints.push([0, _t]);
      }

      baseTimestampMs = timestamp + stepMs;
      datapoints.push([datapointValue, timestamp]);
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

  var endTimestamp = options.end / 1e6;

  for (var t = baseTimestampMs; t <= endTimestamp; t += stepMs) {
    datapoints.push([0, t]);
  }

  return datapoints;
}

function lokiResultsToTableModel(lokiResults, resultCount, refId, meta, valueWithRefId) {
  if (!lokiResults || lokiResults.length === 0) {
    return new app_core_table_model__WEBPACK_IMPORTED_MODULE_5__["default"]();
  } // Collect all labels across all metrics


  var metricLabels = new Set(lokiResults.reduce(function (acc, cur) {
    return acc.concat(Object.keys(cur.metric));
  }, [])); // Sort metric labels, create columns for them and record their index

  var sortedLabels = _toConsumableArray(metricLabels.values()).sort();

  var table = new app_core_table_model__WEBPACK_IMPORTED_MODULE_5__["default"]();
  table.refId = refId;
  table.meta = meta;
  table.columns = [{
    text: 'Time',
    type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].time
  }].concat(_toConsumableArray(sortedLabels.map(function (label) {
    return {
      text: label,
      filterable: true
    };
  })), [{
    text: resultCount > 1 || valueWithRefId ? "Value #".concat(refId) : 'Value',
    type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].number
  }]); // Populate rows, set value to empty string when label not present.

  lokiResults.forEach(function (series) {
    var newSeries = {
      metric: series.metric,
      values: series.value ? [series.value] : series.values
    };

    if (!newSeries.values) {
      return;
    }

    if (!newSeries.metric) {
      table.rows.concat(newSeries.values.map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            a = _ref6[0],
            b = _ref6[1];

        return [a * 1000, parseFloat(b)];
      }));
    } else {
      var _table$rows;

      (_table$rows = table.rows).push.apply(_table$rows, _toConsumableArray(newSeries.values.map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            a = _ref8[0],
            b = _ref8[1];

        return [a * 1000].concat(_toConsumableArray(sortedLabels.map(function (label) {
          return newSeries.metric[label] || '';
        })), [parseFloat(b)]);
      })));
    }
  });
  return table;
}
function createMetricLabel(labelData, options) {
  var _options$legendFormat;

  var label = options === undefined || lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEmpty(options.legendFormat) ? getOriginalMetricName(labelData) : renderTemplate(app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_4__["default"].replace((_options$legendFormat = options.legendFormat) !== null && _options$legendFormat !== void 0 ? _options$legendFormat : '', options.scopedVars), labelData);

  if (!label && options) {
    label = options.query;
  }

  return label;
}

function renderTemplate(aliasPattern, aliasData) {
  var aliasRegex = /\{\{\s*(.+?)\s*\}\}/g;
  return aliasPattern.replace(aliasRegex, function (_, g1) {
    return aliasData[g1] ? aliasData[g1] : g1;
  });
}

function getOriginalMetricName(labelData) {
  var metricName = labelData.__name__ || '';
  delete labelData.__name__;
  var labelPart = Object.entries(labelData).map(function (label) {
    return "".concat(label[0], "=\"").concat(label[1], "\"");
  }).join(',');
  return "".concat(metricName, "{").concat(labelPart, "}");
}

function decamelize(s) {
  return s.replace(/[A-Z]/g, function (m) {
    return " ".concat(m.toLowerCase());
  });
} // Turn loki stats { metric: value } into meta stat { title: metric, value: value }

function lokiStatsToMetaStat(stats) {
  var result = [];

  if (!stats) {
    return result;
  }

  for (var section in stats) {
    var values = stats[section];

    for (var label in values) {
      var value = values[label];
      var unit = void 0;

      if (/time/i.test(label) && value) {
        unit = 's';
      } else if (/bytes.*persecond/i.test(label)) {
        unit = 'Bps';
      } else if (/bytes/i.test(label)) {
        unit = 'decbytes';
      }

      var title = "".concat(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.capitalize(section), ": ").concat(decamelize(label));
      result.push({
        displayName: title,
        value: value,
        unit: unit
      });
    }
  }

  return result;
}

function lokiStreamsToDataframes(response, target, limit, config) {
  var reverse = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var data = limit > 0 ? response.data.result : [];
  var stats = lokiStatsToMetaStat(response.data.stats); // Use custom mechanism to identify which stat we want to promote to label

  var custom = {
    lokiQueryStatKey: 'Summary: total bytes processed'
  };
  var meta = {
    searchWords: Object(_query_utils__WEBPACK_IMPORTED_MODULE_6__["getHighlighterExpressionsFromQuery"])(Object(_query_utils__WEBPACK_IMPORTED_MODULE_6__["formatQuery"])(target.expr)),
    limit: limit,
    stats: stats,
    custom: custom,
    preferredVisualisationType: 'logs'
  };
  var series = data.map(function (stream) {
    var dataFrame = lokiStreamResultToDataFrame(stream, reverse);
    enhanceDataFrame(dataFrame, config);
    return _objectSpread({}, dataFrame, {
      refId: target.refId,
      meta: meta
    });
  });

  if (stats.length && !data.length) {
    return [{
      fields: [],
      length: 0,
      refId: target.refId,
      meta: meta
    }];
  }

  return series;
}
/**
 * Adds new fields and DataLinks to DataFrame based on DataSource instance config.
 */

var enhanceDataFrame = function enhanceDataFrame(dataFrame, config) {
  var _config$derivedFields;

  if (!config) {
    return;
  }

  var derivedFields = (_config$derivedFields = config.derivedFields) !== null && _config$derivedFields !== void 0 ? _config$derivedFields : [];

  if (!derivedFields.length) {
    return;
  }

  var derivedFieldsGrouped = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.groupBy(derivedFields, 'name');

  var newFields = Object.values(derivedFieldsGrouped).map(fieldFromDerivedFieldConfig);
  var view = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["DataFrameView"](dataFrame);
  view.forEach(function (row) {
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = newFields[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var field = _step6.value;
        var logMatch = row.line.match(derivedFieldsGrouped[field.name][0].matcherRegex);
        field.values.add(logMatch && logMatch[1]);
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
  });
  dataFrame.fields = [].concat(_toConsumableArray(dataFrame.fields), _toConsumableArray(newFields));
};
/**
 * Transform derivedField config into dataframe field with config that contains link.
 */

function fieldFromDerivedFieldConfig(derivedFieldConfigs) {
  var dataLinks = derivedFieldConfigs.reduce(function (acc, derivedFieldConfig) {
    // Having field.datasourceUid means it is an internal link.
    if (derivedFieldConfig.datasourceUid) {
      acc.push({
        // Will be filled out later
        title: '',
        url: '',
        // This is hardcoded for Jaeger or Zipkin not way right now to specify datasource specific query object
        internal: {
          query: {
            query: derivedFieldConfig.url
          },
          datasourceUid: derivedFieldConfig.datasourceUid
        }
      });
    } else if (derivedFieldConfig.url) {
      acc.push({
        // We do not know what title to give here so we count on presentation layer to create a title from metadata.
        title: '',
        // This is hardcoded for Jaeger or Zipkin not way right now to specify datasource specific query object
        url: derivedFieldConfig.url
      });
    }

    return acc;
  }, []);
  return {
    name: derivedFieldConfigs[0].name,
    type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].string,
    config: {
      links: dataLinks
    },
    // We are adding values later on
    values: new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["ArrayVector"]([])
  };
}

function rangeQueryResponseToTimeSeries(response, query, target, responseListLength, scopedVars) {
  var _target$legendFormat;

  /** Show results of Loki metric queries only in graph */
  var meta = {
    preferredVisualisationType: 'graph'
  };
  var transformerOptions = {
    format: target.format,
    legendFormat: (_target$legendFormat = target.legendFormat) !== null && _target$legendFormat !== void 0 ? _target$legendFormat : '',
    start: query.start,
    end: query.end,
    step: query.step,
    query: query.query,
    responseListLength: responseListLength,
    refId: target.refId,
    meta: meta,
    valueWithRefId: target.valueWithRefId,
    scopedVars: scopedVars
  };

  switch (response.data.resultType) {
    case _types__WEBPACK_IMPORTED_MODULE_7__["LokiResultType"].Vector:
      return response.data.result.map(function (vecResult) {
        return lokiMatrixToTimeSeries({
          metric: vecResult.metric,
          values: [vecResult.value]
        }, transformerOptions);
      });

    case _types__WEBPACK_IMPORTED_MODULE_7__["LokiResultType"].Matrix:
      return response.data.result.map(function (matrixResult) {
        return lokiMatrixToTimeSeries(matrixResult, transformerOptions);
      });

    default:
      return [];
  }
}
function processRangeQueryResponse(response, target, query, responseListLength, limit, config, scopedVars) {
  var reverse = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

  switch (response.data.resultType) {
    case _types__WEBPACK_IMPORTED_MODULE_7__["LokiResultType"].Stream:
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({
        data: lokiStreamsToDataframes(response, target, limit, config, reverse),
        key: "".concat(target.refId, "_log")
      });

    case _types__WEBPACK_IMPORTED_MODULE_7__["LokiResultType"].Vector:
    case _types__WEBPACK_IMPORTED_MODULE_7__["LokiResultType"].Matrix:
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({
        data: rangeQueryResponseToTimeSeries(response, query, _objectSpread({}, target, {
          format: 'time_series'
        }), responseListLength, scopedVars),
        key: target.refId
      });

    default:
      throw new Error("Unknown result type \"".concat(response.data.resultType, "\"."));
  }
}

/***/ }),

/***/ "./public/app/plugins/datasource/loki/syntax.ts":
/*!******************************************************!*\
  !*** ./public/app/plugins/datasource/loki/syntax.ts ***!
  \******************************************************/
/*! exports provided: RANGE_VEC_FUNCTIONS, FUNCTIONS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RANGE_VEC_FUNCTIONS", function() { return RANGE_VEC_FUNCTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FUNCTIONS", function() { return FUNCTIONS; });
var AGGREGATION_OPERATORS = [{
  label: 'sum',
  insertText: 'sum',
  documentation: 'Calculate sum over dimensions'
}, {
  label: 'min',
  insertText: 'min',
  documentation: 'Select minimum over dimensions'
}, {
  label: 'max',
  insertText: 'max',
  documentation: 'Select maximum over dimensions'
}, {
  label: 'avg',
  insertText: 'avg',
  documentation: 'Calculate the average over dimensions'
}, {
  label: 'stddev',
  insertText: 'stddev',
  documentation: 'Calculate population standard deviation over dimensions'
}, {
  label: 'stdvar',
  insertText: 'stdvar',
  documentation: 'Calculate population standard variance over dimensions'
}, {
  label: 'count',
  insertText: 'count',
  documentation: 'Count number of elements in the vector'
}, {
  label: 'bottomk',
  insertText: 'bottomk',
  documentation: 'Smallest k elements by sample value'
}, {
  label: 'topk',
  insertText: 'topk',
  documentation: 'Largest k elements by sample value'
}];
var RANGE_VEC_FUNCTIONS = [{
  insertText: 'count_over_time',
  label: 'count_over_time',
  detail: 'count_over_time(range-vector)',
  documentation: 'The count of all values in the specified interval.'
}, {
  insertText: 'rate',
  label: 'rate',
  detail: 'rate(v range-vector)',
  documentation: "Calculates the per-second average rate of increase of the time series in the range vector. Breaks in monotonicity (such as counter resets due to target restarts) are automatically adjusted for. Also, the calculation extrapolates to the ends of the time range, allowing for missed scrapes or imperfect alignment of scrape cycles with the range's time period."
}];
var FUNCTIONS = [].concat(AGGREGATION_OPERATORS, RANGE_VEC_FUNCTIONS);
var tokenizer = {
  comment: {
    pattern: /#.*/
  },
  'context-aggregation': {
    pattern: /((without|by)\s*)\([^)]*\)/,
    // by ()
    lookbehind: true,
    inside: {
      'label-key': {
        pattern: /[^(),\s][^,)]*[^),\s]*/,
        alias: 'attr-name'
      },
      punctuation: /[()]/
    }
  },
  'context-labels': {
    pattern: /\{[^}]*(?=})/,
    greedy: true,
    inside: {
      comment: {
        pattern: /#.*/
      },
      'label-key': {
        pattern: /[a-z_]\w*(?=\s*(=|!=|=~|!~))/,
        alias: 'attr-name',
        greedy: true
      },
      'label-value': {
        pattern: /"(?:\\.|[^\\"])*"/,
        greedy: true,
        alias: 'attr-value'
      },
      punctuation: /[{]/
    }
  },
  function: new RegExp("\\b(?:".concat(FUNCTIONS.map(function (f) {
    return f.label;
  }).join('|'), ")(?=\\s*\\()"), 'i'),
  'context-range': [{
    pattern: /\[[^\]]*(?=\])/,
    // [1m]
    inside: {
      'range-duration': {
        pattern: /\b\d+[smhdwy]\b/i,
        alias: 'number'
      }
    }
  }, {
    pattern: /(offset\s+)\w+/,
    // offset 1m
    lookbehind: true,
    inside: {
      'range-duration': {
        pattern: /\b\d+[smhdwy]\b/i,
        alias: 'number'
      }
    }
  }],
  number: /\b-?\d+((\.\d*)?([eE][+-]?\d+)?)?\b/,
  operator: new RegExp("/&&?|\\|?\\||!=?|<(?:=>?|<|>)?|>[>=]?", 'i'),
  punctuation: /[{}()`,.]/
};
/* harmony default export */ __webpack_exports__["default"] = (tokenizer);

/***/ }),

/***/ "./public/app/plugins/datasource/loki/types.ts":
/*!*****************************************************!*\
  !*** ./public/app/plugins/datasource/loki/types.ts ***!
  \*****************************************************/
/*! exports provided: LokiResultType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiResultType", function() { return LokiResultType; });
var LokiResultType;

(function (LokiResultType) {
  LokiResultType["Stream"] = "streams";
  LokiResultType["Vector"] = "vector";
  LokiResultType["Matrix"] = "matrix";
})(LokiResultType || (LokiResultType = {}));

/***/ })

}]);
//# sourceMappingURL=lokiPlugin.1ebdc265fc3bd7452fcd.js.map