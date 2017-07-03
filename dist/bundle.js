(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.inherit = __webpack_require__(15);
exports.clone = __webpack_require__(7);
exports.type = __webpack_require__(23);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Module dependencies.
 */

var keys = __webpack_require__(36);

var objToString = Object.prototype.toString;

/**
 * Tests if a value is a number.
 *
 * @name isNumber
 * @api private
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if `val` is a number, otherwise `false`.
 */
// TODO: Move to library
var isNumber = function isNumber(val) {
  var type = typeof val;
  return type === 'number' || (type === 'object' && objToString.call(val) === '[object Number]');
};

/**
 * Tests if a value is an array.
 *
 * @name isArray
 * @api private
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if the value is an array, otherwise `false`.
 */
// TODO: Move to library
var isArray = typeof Array.isArray === 'function' ? Array.isArray : function isArray(val) {
  return objToString.call(val) === '[object Array]';
};

/**
 * Tests if a value is array-like. Array-like means the value is not a function and has a numeric
 * `.length` property.
 *
 * @name isArrayLike
 * @api private
 * @param {*} val
 * @return {boolean}
 */
// TODO: Move to library
var isArrayLike = function isArrayLike(val) {
  return val != null && (isArray(val) || (val !== 'function' && isNumber(val.length)));
};

/**
 * Internal implementation of `each`. Works on arrays and array-like data structures.
 *
 * @name arrayEach
 * @api private
 * @param {Function(value, key, collection)} iterator The function to invoke per iteration.
 * @param {Array} array The array(-like) structure to iterate over.
 * @return {undefined}
 */
var arrayEach = function arrayEach(iterator, array) {
  for (var i = 0; i < array.length; i += 1) {
    // Break iteration early if `iterator` returns `false`
    if (iterator(array[i], i, array) === false) {
      break;
    }
  }
};

/**
 * Internal implementation of `each`. Works on objects.
 *
 * @name baseEach
 * @api private
 * @param {Function(value, key, collection)} iterator The function to invoke per iteration.
 * @param {Object} object The object to iterate over.
 * @return {undefined}
 */
var baseEach = function baseEach(iterator, object) {
  var ks = keys(object);

  for (var i = 0; i < ks.length; i += 1) {
    // Break iteration early if `iterator` returns `false`
    if (iterator(object[ks[i]], ks[i], object) === false) {
      break;
    }
  }
};

/**
 * Iterate over an input collection, invoking an `iterator` function for each element in the
 * collection and passing to it three arguments: `(value, index, collection)`. The `iterator`
 * function can end iteration early by returning `false`.
 *
 * @name each
 * @api public
 * @param {Function(value, key, collection)} iterator The function to invoke per iteration.
 * @param {Array|Object|string} collection The collection to iterate over.
 * @return {undefined} Because `each` is run only for side effects, always returns `undefined`.
 * @example
 * var log = console.log.bind(console);
 *
 * each(log, ['a', 'b', 'c']);
 * //-> 'a', 0, ['a', 'b', 'c']
 * //-> 'b', 1, ['a', 'b', 'c']
 * //-> 'c', 2, ['a', 'b', 'c']
 * //=> undefined
 *
 * each(log, 'tim');
 * //-> 't', 2, 'tim'
 * //-> 'i', 1, 'tim'
 * //-> 'm', 0, 'tim'
 * //=> undefined
 *
 * // Note: Iteration order not guaranteed across environments
 * each(log, { name: 'tim', occupation: 'enchanter' });
 * //-> 'tim', 'name', { name: 'tim', occupation: 'enchanter' }
 * //-> 'enchanter', 'occupation', { name: 'tim', occupation: 'enchanter' }
 * //=> undefined
 */
var each = function each(iterator, collection) {
  return (isArrayLike(collection) ? arrayEach : baseEach).call(this, iterator, collection);
};

/*
 * Exports.
 */

module.exports = each;


/***/ }),
/* 2 */
/***/ (function(module, exports) {


/**
 * Expose `debug()` as the module.
 */

module.exports = debug;

/**
 * Create a debugger with the given `name`.
 *
 * @param {String} name
 * @return {Type}
 * @api public
 */

function debug(name) {
  if (!debug.enabled(name)) return function(){};

  return function(fmt){
    fmt = coerce(fmt);

    var curr = new Date;
    var ms = curr - (debug[name] || curr);
    debug[name] = curr;

    fmt = name
      + ' '
      + fmt
      + ' +' + debug.humanize(ms);

    // This hackery is required for IE8
    // where `console.log` doesn't have 'apply'
    window.console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }
}

/**
 * The currently active debug mode names.
 */

debug.names = [];
debug.skips = [];

/**
 * Enables a debug mode by name. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} name
 * @api public
 */

debug.enable = function(name) {
  try {
    localStorage.debug = name;
  } catch(e){}

  var split = (name || '').split(/[\s,]+/)
    , len = split.length;

  for (var i = 0; i < len; i++) {
    name = split[i].replace('*', '.*?');
    if (name[0] === '-') {
      debug.skips.push(new RegExp('^' + name.substr(1) + '$'));
    }
    else {
      debug.names.push(new RegExp('^' + name + '$'));
    }
  }
};

/**
 * Disable debug output.
 *
 * @api public
 */

debug.disable = function(){
  debug.enable('');
};

/**
 * Humanize the given `ms`.
 *
 * @param {Number} m
 * @return {String}
 * @api private
 */

debug.humanize = function(ms) {
  var sec = 1000
    , min = 60 * 1000
    , hour = 60 * min;

  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
  if (ms >= min) return (ms / min).toFixed(1) + 'm';
  if (ms >= sec) return (ms / sec | 0) + 's';
  return ms + 'ms';
};

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

debug.enabled = function(name) {
  for (var i = 0, len = debug.skips.length; i < len; i++) {
    if (debug.skips[i].test(name)) {
      return false;
    }
  }
  for (var i = 0, len = debug.names.length; i < len; i++) {
    if (debug.names[i].test(name)) {
      return true;
    }
  }
  return false;
};

/**
 * Coerce `val`.
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

// persist

try {
  if (window.localStorage) debug.enable(localStorage.debug);
} catch(e){}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Module dependencies.
 */

var drop = __webpack_require__(59);
var rest = __webpack_require__(60);

var has = Object.prototype.hasOwnProperty;
var objToString = Object.prototype.toString;

/**
 * Returns `true` if a value is an object, otherwise `false`.
 *
 * @name isObject
 * @api private
 * @param {*} val The value to test.
 * @return {boolean}
 */
// TODO: Move to a library
var isObject = function isObject(value) {
  return Boolean(value) && typeof value === 'object';
};

/**
 * Returns `true` if a value is a plain object, otherwise `false`.
 *
 * @name isPlainObject
 * @api private
 * @param {*} val The value to test.
 * @return {boolean}
 */
// TODO: Move to a library
var isPlainObject = function isPlainObject(value) {
  return Boolean(value) && objToString.call(value) === '[object Object]';
};

/**
 * Assigns a key-value pair to a target object when the value assigned is owned,
 * and where target[key] is undefined.
 *
 * @name shallowCombiner
 * @api private
 * @param {Object} target
 * @param {Object} source
 * @param {*} value
 * @param {string} key
 */
var shallowCombiner = function shallowCombiner(target, source, value, key) {
  if (has.call(source, key) && target[key] === undefined) {
    target[key] = value;
  }
  return source;
};

/**
 * Assigns a key-value pair to a target object when the value assigned is owned,
 * and where target[key] is undefined; also merges objects recursively.
 *
 * @name deepCombiner
 * @api private
 * @param {Object} target
 * @param {Object} source
 * @param {*} value
 * @param {string} key
 * @return {Object}
 */
var deepCombiner = function(target, source, value, key) {
  if (has.call(source, key)) {
    if (isPlainObject(target[key]) && isPlainObject(value)) {
        target[key] = defaultsDeep(target[key], value);
    } else if (target[key] === undefined) {
        target[key] = value;
    }
  }

  return source;
};

/**
 * TODO: Document
 *
 * @name defaultsWith
 * @api private
 * @param {Function} combiner
 * @param {Object} target
 * @param {...Object} sources
 * @return {Object} Return the input `target`.
 */
var defaultsWith = function(combiner, target /*, ...sources */) {
  if (!isObject(target)) {
    return target;
  }

  combiner = combiner || shallowCombiner;
  var sources = drop(2, arguments);

  for (var i = 0; i < sources.length; i += 1) {
    for (var key in sources[i]) {
      combiner(target, sources[i], sources[i][key], key);
    }
  }

  return target;
};

/**
 * Copies owned, enumerable properties from a source object(s) to a target
 * object when the value of that property on the source object is `undefined`.
 * Recurses on objects.
 *
 * @name defaultsDeep
 * @api public
 * @param {Object} target
 * @param {...Object} sources
 * @return {Object} The input `target`.
 */
var defaultsDeep = function defaultsDeep(target /*, sources */) {
  // TODO: Replace with `partial` call?
  return defaultsWith.apply(null, [deepCombiner, target].concat(rest(arguments)));
};

/**
 * Copies owned, enumerable properties from a source object(s) to a target
 * object when the value of that property on the source object is `undefined`.
 *
 * @name defaults
 * @api public
 * @param {Object} target
 * @param {...Object} sources
 * @return {Object}
 * @example
 * var a = { a: 1 };
 * var b = { a: 2, b: 2 };
 *
 * defaults(a, b);
 * console.log(a); //=> { a: 1, b: 2 }
 */
var defaults = function(target /*, ...sources */) {
  // TODO: Replace with `partial` call?
  return defaultsWith.apply(null, [null, target].concat(rest(arguments)));
};

/*
 * Exports.
 */

module.exports = defaults;
module.exports.deep = defaultsDeep;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Facade = __webpack_require__(6);

/**
 * Expose specific-method facades.
 */

Facade.Alias = __webpack_require__(55);
Facade.Group = __webpack_require__(56);
Facade.Identify = __webpack_require__(29);
Facade.Track = __webpack_require__(17);
Facade.Page = __webpack_require__(31);
Facade.Screen = __webpack_require__(57);

/**
 * Exports.
 */

module.exports = Facade;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var address = __webpack_require__(50);
var clone = __webpack_require__(0).clone;
var isEnabled = __webpack_require__(51);
var newDate = __webpack_require__(16);
var objCase = __webpack_require__(9);
var traverse = __webpack_require__(25);
var type = __webpack_require__(0).type;

/**
 * Initialize a new `Facade` with an `obj` of arguments.
 *
 * @param {Object} obj
 * @param {Object} opts
 */
function Facade(obj, opts) {
  opts = opts || {};
  if (!('clone' in opts)) opts.clone = true;
  if (opts.clone) obj = clone(obj);
  if (!('traverse' in opts)) opts.traverse = true;
  if (!('timestamp' in obj)) obj.timestamp = new Date();
  else obj.timestamp = newDate(obj.timestamp);
  if (opts.traverse) traverse(obj);
  this.opts = opts;
  this.obj = obj;
}

/**
 * Mixin address traits.
 */

address(Facade.prototype);

/**
 * Return a proxy function for a `field` that will attempt to first use methods,
 * and fallback to accessing the underlying object directly. You can specify
 * deeply nested fields too like:
 *
 *   this.proxy('options.Librato');
 *
 * @param {string} field
 */
Facade.prototype.proxy = function(field) {
  var fields = field.split('.');
  field = fields.shift();

  // Call a function at the beginning to take advantage of facaded fields
  var obj = this[field] || this.field(field);
  if (!obj) return obj;
  if (typeof obj === 'function') obj = obj.call(this) || {};
  if (fields.length === 0) return this.opts.clone ? transform(obj) : obj;

  obj = objCase(obj, fields.join('.'));
  return this.opts.clone ? transform(obj) : obj;
};

/**
 * Directly access a specific `field` from the underlying object, returning a
 * clone so outsiders don't mess with stuff.
 *
 * @param {string} field
 * @return {*}
 */
Facade.prototype.field = function(field) {
  var obj = this.obj[field];
  return this.opts.clone ? transform(obj) : obj;
};

/**
 * Utility method to always proxy a particular `field`. You can specify deeply
 * nested fields too like:
 *
 *   Facade.proxy('options.Librato');
 *
 * @param {string} field
 * @return {Function}
 */
Facade.proxy = function(field) {
  return function() {
    return this.proxy(field);
  };
};

/**
 * Utility method to directly access a `field`.
 *
 * @param {string} field
 * @return {Function}
 */
Facade.field = function(field) {
  return function() {
    return this.field(field);
  };
};

/**
 * Proxy multiple `path`.
 *
 * @param {string} path
 * @return {Array}
 */
Facade.multi = function(path) {
  return function() {
    var multi = this.proxy(path + 's');
    if (type(multi) === 'array') return multi;
    var one = this.proxy(path);
    if (one) one = [this.opts.clone ? clone(one) : one];
    return one || [];
  };
};

/**
 * Proxy one `path`.
 *
 * @param {string} path
 * @return {*}
 */
Facade.one = function(path) {
  return function() {
    var one = this.proxy(path);
    if (one) return one;
    var multi = this.proxy(path + 's');
    if (type(multi) === 'array') return multi[0];
  };
};

/**
 * Get the basic json object of this facade.
 *
 * @return {Object}
 */
Facade.prototype.json = function() {
  var ret = this.opts.clone ? clone(this.obj) : this.obj;
  if (this.type) ret.type = this.type();
  return ret;
};

/**
 * Get the options of a call (formerly called "context"). If you pass an
 * integration name, it will get the options for that specific integration, or
 * undefined if the integration is not enabled.
 *
 * @param {string} [integration]
 * @return {Object or Null}
 */
Facade.prototype.options = function(integration) {
  var obj = this.obj.options || this.obj.context || {};
  var options = this.opts.clone ? clone(obj) : obj;
  if (!integration) return options;
  if (!this.enabled(integration)) return;
  var integrations = this.integrations();
  var value = integrations[integration] || objCase(integrations, integration);
  if (typeof value !== 'object') value = objCase(this.options(), integration);
  return typeof value === 'object' ? value : {};
};

Facade.prototype.context = Facade.prototype.options;

/**
 * Check whether an integration is enabled.
 *
 * @param {string} integration
 * @return {boolean}
 */
Facade.prototype.enabled = function(integration) {
  var allEnabled = this.proxy('options.providers.all');
  if (typeof allEnabled !== 'boolean') allEnabled = this.proxy('options.all');
  if (typeof allEnabled !== 'boolean') allEnabled = this.proxy('integrations.all');
  if (typeof allEnabled !== 'boolean') allEnabled = true;

  var enabled = allEnabled && isEnabled(integration);
  var options = this.integrations();

  // If the integration is explicitly enabled or disabled, use that
  // First, check options.providers for backwards compatibility
  if (options.providers && options.providers.hasOwnProperty(integration)) {
    enabled = options.providers[integration];
  }

  // Next, check for the integration's existence in 'options' to enable it.
  // If the settings are a boolean, use that, otherwise it should be enabled.
  if (options.hasOwnProperty(integration)) {
    var settings = options[integration];
    if (typeof settings === 'boolean') {
      enabled = settings;
    } else {
      enabled = true;
    }
  }

  return !!enabled;
};

/**
 * Get all `integration` options.
 *
 * @api private
 * @param {string} integration
 * @return {Object}
 */
Facade.prototype.integrations = function() {
  return this.obj.integrations || this.proxy('options.providers') || this.options();
};

/**
 * Check whether the user is active.
 *
 * @return {boolean}
 */
Facade.prototype.active = function() {
  var active = this.proxy('options.active');
  if (active === null || active === undefined) active = true;
  return active;
};

/**
 * Get `sessionId / anonymousId`.
 *
 * @api public
 * @return {*}
 */
Facade.prototype.anonymousId = function() {
  return this.field('anonymousId') || this.field('sessionId');
};

Facade.prototype.sessionId = Facade.prototype.anonymousId;

/**
 * Get `groupId` from `context.groupId`.
 *
 * @api public
 * @return {string}
 */
Facade.prototype.groupId = Facade.proxy('options.groupId');

/**
 * Get the call's "super properties" which are just traits that have been
 * passed in as if from an identify call.
 *
 * @param {Object} aliases
 * @return {Object}
 */
Facade.prototype.traits = function(aliases) {
  var ret = this.proxy('options.traits') || {};
  var id = this.userId();
  aliases = aliases || {};

  if (id) ret.id = id;

  for (var alias in aliases) {
    var value = this[alias] == null ? this.proxy('options.traits.' + alias) : this[alias]();
    if (value == null) continue;
    ret[aliases[alias]] = value;
    delete ret[alias];
  }

  return ret;
};

/**
 * Add a convenient way to get the library name and version
 */
Facade.prototype.library = function() {
  var library = this.proxy('options.library');
  if (!library) return { name: 'unknown', version: null };
  if (typeof library === 'string') return { name: library, version: null };
  return library;
};

/**
 * Return the device information or an empty object
 *
 * @return {Object}
 */
Facade.prototype.device = function() {
  var device = this.proxy('context.device');
  if (type(device) !== 'object') device = {};
  var library = this.library().name;
  if (device.type) return device;

  if (library.indexOf('ios') > -1) device.type = 'ios';
  if (library.indexOf('android') > -1) device.type = 'android';
  return device;
};

/**
 * Set up some basic proxies.
 */

Facade.prototype.userAgent = Facade.proxy('context.userAgent');
Facade.prototype.timezone = Facade.proxy('context.timezone');
Facade.prototype.timestamp = Facade.field('timestamp');
Facade.prototype.channel = Facade.field('channel');
Facade.prototype.ip = Facade.proxy('context.ip');
Facade.prototype.userId = Facade.field('userId');

/**
 * Return the cloned and traversed object
 *
 * @param {*} obj
 * @return {*}
 */
function transform(obj) {
  return clone(obj);
}

/**
 * Exports.
 */

module.exports = Facade;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Module dependencies.
 */

var type = __webpack_require__(10);

/**
 * Deeply clone an object.
 *
 * @param {*} obj Any object.
 */

var clone = function clone(obj) {
  var t = type(obj);

  if (t === 'object') {
    var copy = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = clone(obj[key]);
      }
    }
    return copy;
  }

  if (t === 'array') {
    var copy = new Array(obj.length);
    for (var i = 0, l = obj.length; i < l; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy;
  }

  if (t === 'regexp') {
    // from millermedeiros/amd-utils - MIT
    var flags = '';
    flags += obj.multiline ? 'm' : '';
    flags += obj.global ? 'g' : '';
    flags += obj.ignoreCase ? 'i' : '';
    return new RegExp(obj.source, flags);
  }

  if (t === 'date') {
    return new Date(obj.getTime());
  }

  // string, number, boolean, etc.
  return obj;
};

/*
 * Exports.
 */

module.exports = clone;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(33);

function bindAll(obj) {
  // eslint-disable-next-line guard-for-in
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'function') {
      obj[key] = bind(obj, obj[key]);
    }
  }
  return obj;
}

module.exports = bindAll;


/***/ }),
/* 9 */
/***/ (function(module, exports) {


var identity = function(_){ return _; };
var normalize = null;

/**
 * Module exports, export
 */

module.exports = multiple(find);
module.exports.find = module.exports;


/**
 * Export the replacement function, return the modified object
 */

module.exports.replace = function (obj, key, val, options) {
  multiple(replace).call(this, obj, key, val, options);
  return obj;
};


/**
 * Export the delete function, return the modified object
 */

module.exports.del = function (obj, key, options) {
  multiple(del).call(this, obj, key, null, options);
  return obj;
};


/**
 * Compose applying the function to a nested key
 */

function multiple (fn) {
  return function (obj, path, val, options) {
    normalize = options && isFunction(options.normalizer) ? options.normalizer : defaultNormalize;
    path = normalize(path);

    var key;
    var finished = false;

    while (!finished) loop();

    function loop() {
      for (key in obj) {
        var normalizedKey = normalize(key);
        if (0 === path.indexOf(normalizedKey)) {
          var temp = path.substr(normalizedKey.length);
          if (temp.charAt(0) === '.' || temp.length === 0) {
            path = temp.substr(1);
            var child = obj[key];

            // we're at the end and there is nothing.
            if (null == child) {
              finished = true;
              return;
            }

            // we're at the end and there is something.
            if (!path.length) {
              finished = true;
              return;
            }

            // step into child
            obj = child;

            // but we're done here
            return;
          }
        }
      }

      key = undefined;
      // if we found no matching properties
      // on the current object, there's no match.
      finished = true;
    }

    if (!key) return;
    if (null == obj) return obj;

    // the `obj` and `key` is one above the leaf object and key, so
    // start object: { a: { 'b.c': 10 } }
    // end object: { 'b.c': 10 }
    // end key: 'b.c'
    // this way, you can do `obj[key]` and get `10`.
    return fn(obj, key, val);
  };
}


/**
 * Find an object by its key
 *
 * find({ first_name : 'Calvin' }, 'firstName')
 */

function find (obj, key) {
  if (obj.hasOwnProperty(key)) return obj[key];
}


/**
 * Delete a value for a given key
 *
 * del({ a : 'b', x : 'y' }, 'X' }) -> { a : 'b' }
 */

function del (obj, key) {
  if (obj.hasOwnProperty(key)) delete obj[key];
  return obj;
}


/**
 * Replace an objects existing value with a new one
 *
 * replace({ a : 'b' }, 'a', 'c') -> { a : 'c' }
 */

function replace (obj, key, val) {
  if (obj.hasOwnProperty(key)) obj[key] = val;
  return obj;
}

/**
 * Normalize a `dot.separated.path`.
 *
 * A.HELL(!*&#(!)O_WOR   LD.bar => ahelloworldbar
 *
 * @param {String} path
 * @return {String}
 */

function defaultNormalize(path) {
  return path.replace(/[^a-zA-Z0-9\.]+/g, '').toLowerCase();
}

/**
 * Check if a value is a function.
 *
 * @param {*} val
 * @return {boolean} Returns `true` if `val` is a function, otherwise `false`.
 */

function isFunction(val) {
  return typeof val === 'function';
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
    case '[object Error]': return 'error';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val !== val) return 'nan';
  if (val && val.nodeType === 1) return 'element';

  if (isBuffer(val)) return 'buffer';

  val = val.valueOf
    ? val.valueOf()
    : Object.prototype.valueOf.apply(val);

  return typeof val;
};

// code borrowed from https://github.com/feross/is-buffer/blob/master/index.js
function isBuffer(obj) {
  return !!(obj != null &&
    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
      (obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj))
    ))
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* globals window, HTMLElement */



/**!
 * is
 * the definitive JavaScript type testing library
 *
 * @copyright 2013-2014 Enrico Marino / Jordan Harband
 * @license MIT
 */

var objProto = Object.prototype;
var owns = objProto.hasOwnProperty;
var toStr = objProto.toString;
var symbolValueOf;
if (typeof Symbol === 'function') {
  symbolValueOf = Symbol.prototype.valueOf;
}
var isActualNaN = function (value) {
  return value !== value;
};
var NON_HOST_TYPES = {
  'boolean': 1,
  number: 1,
  string: 1,
  undefined: 1
};

var base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
var hexRegex = /^[A-Fa-f0-9]+$/;

/**
 * Expose `is`
 */

var is = {};

/**
 * Test general.
 */

/**
 * is.type
 * Test if `value` is a type of `type`.
 *
 * @param {Mixed} value value to test
 * @param {String} type type
 * @return {Boolean} true if `value` is a type of `type`, false otherwise
 * @api public
 */

is.a = is.type = function (value, type) {
  return typeof value === type;
};

/**
 * is.defined
 * Test if `value` is defined.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is defined, false otherwise
 * @api public
 */

is.defined = function (value) {
  return typeof value !== 'undefined';
};

/**
 * is.empty
 * Test if `value` is empty.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is empty, false otherwise
 * @api public
 */

is.empty = function (value) {
  var type = toStr.call(value);
  var key;

  if (type === '[object Array]' || type === '[object Arguments]' || type === '[object String]') {
    return value.length === 0;
  }

  if (type === '[object Object]') {
    for (key in value) {
      if (owns.call(value, key)) {
        return false;
      }
    }
    return true;
  }

  return !value;
};

/**
 * is.equal
 * Test if `value` is equal to `other`.
 *
 * @param {Mixed} value value to test
 * @param {Mixed} other value to compare with
 * @return {Boolean} true if `value` is equal to `other`, false otherwise
 */

is.equal = function equal(value, other) {
  if (value === other) {
    return true;
  }

  var type = toStr.call(value);
  var key;

  if (type !== toStr.call(other)) {
    return false;
  }

  if (type === '[object Object]') {
    for (key in value) {
      if (!is.equal(value[key], other[key]) || !(key in other)) {
        return false;
      }
    }
    for (key in other) {
      if (!is.equal(value[key], other[key]) || !(key in value)) {
        return false;
      }
    }
    return true;
  }

  if (type === '[object Array]') {
    key = value.length;
    if (key !== other.length) {
      return false;
    }
    while (key--) {
      if (!is.equal(value[key], other[key])) {
        return false;
      }
    }
    return true;
  }

  if (type === '[object Function]') {
    return value.prototype === other.prototype;
  }

  if (type === '[object Date]') {
    return value.getTime() === other.getTime();
  }

  return false;
};

/**
 * is.hosted
 * Test if `value` is hosted by `host`.
 *
 * @param {Mixed} value to test
 * @param {Mixed} host host to test with
 * @return {Boolean} true if `value` is hosted by `host`, false otherwise
 * @api public
 */

is.hosted = function (value, host) {
  var type = typeof host[value];
  return type === 'object' ? !!host[value] : !NON_HOST_TYPES[type];
};

/**
 * is.instance
 * Test if `value` is an instance of `constructor`.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an instance of `constructor`
 * @api public
 */

is.instance = is['instanceof'] = function (value, constructor) {
  return value instanceof constructor;
};

/**
 * is.nil / is.null
 * Test if `value` is null.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is null, false otherwise
 * @api public
 */

is.nil = is['null'] = function (value) {
  return value === null;
};

/**
 * is.undef / is.undefined
 * Test if `value` is undefined.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is undefined, false otherwise
 * @api public
 */

is.undef = is.undefined = function (value) {
  return typeof value === 'undefined';
};

/**
 * Test arguments.
 */

/**
 * is.args
 * Test if `value` is an arguments object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 * @api public
 */

is.args = is.arguments = function (value) {
  var isStandardArguments = toStr.call(value) === '[object Arguments]';
  var isOldArguments = !is.array(value) && is.arraylike(value) && is.object(value) && is.fn(value.callee);
  return isStandardArguments || isOldArguments;
};

/**
 * Test array.
 */

/**
 * is.array
 * Test if 'value' is an array.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an array, false otherwise
 * @api public
 */

is.array = Array.isArray || function (value) {
  return toStr.call(value) === '[object Array]';
};

/**
 * is.arguments.empty
 * Test if `value` is an empty arguments object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an empty arguments object, false otherwise
 * @api public
 */
is.args.empty = function (value) {
  return is.args(value) && value.length === 0;
};

/**
 * is.array.empty
 * Test if `value` is an empty array.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an empty array, false otherwise
 * @api public
 */
is.array.empty = function (value) {
  return is.array(value) && value.length === 0;
};

/**
 * is.arraylike
 * Test if `value` is an arraylike object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an arguments object, false otherwise
 * @api public
 */

is.arraylike = function (value) {
  return !!value && !is.bool(value)
    && owns.call(value, 'length')
    && isFinite(value.length)
    && is.number(value.length)
    && value.length >= 0;
};

/**
 * Test boolean.
 */

/**
 * is.bool
 * Test if `value` is a boolean.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a boolean, false otherwise
 * @api public
 */

is.bool = is['boolean'] = function (value) {
  return toStr.call(value) === '[object Boolean]';
};

/**
 * is.false
 * Test if `value` is false.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is false, false otherwise
 * @api public
 */

is['false'] = function (value) {
  return is.bool(value) && Boolean(Number(value)) === false;
};

/**
 * is.true
 * Test if `value` is true.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is true, false otherwise
 * @api public
 */

is['true'] = function (value) {
  return is.bool(value) && Boolean(Number(value)) === true;
};

/**
 * Test date.
 */

/**
 * is.date
 * Test if `value` is a date.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a date, false otherwise
 * @api public
 */

is.date = function (value) {
  return toStr.call(value) === '[object Date]';
};

/**
 * is.date.valid
 * Test if `value` is a valid date.
 *
 * @param {Mixed} value value to test
 * @returns {Boolean} true if `value` is a valid date, false otherwise
 */
is.date.valid = function (value) {
  return is.date(value) && !isNaN(Number(value));
};

/**
 * Test element.
 */

/**
 * is.element
 * Test if `value` is an html element.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an HTML Element, false otherwise
 * @api public
 */

is.element = function (value) {
  return value !== undefined
    && typeof HTMLElement !== 'undefined'
    && value instanceof HTMLElement
    && value.nodeType === 1;
};

/**
 * Test error.
 */

/**
 * is.error
 * Test if `value` is an error object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an error object, false otherwise
 * @api public
 */

is.error = function (value) {
  return toStr.call(value) === '[object Error]';
};

/**
 * Test function.
 */

/**
 * is.fn / is.function (deprecated)
 * Test if `value` is a function.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a function, false otherwise
 * @api public
 */

is.fn = is['function'] = function (value) {
  var isAlert = typeof window !== 'undefined' && value === window.alert;
  if (isAlert) {
    return true;
  }
  var str = toStr.call(value);
  return str === '[object Function]' || str === '[object GeneratorFunction]' || str === '[object AsyncFunction]';
};

/**
 * Test number.
 */

/**
 * is.number
 * Test if `value` is a number.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a number, false otherwise
 * @api public
 */

is.number = function (value) {
  return toStr.call(value) === '[object Number]';
};

/**
 * is.infinite
 * Test if `value` is positive or negative infinity.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is positive or negative Infinity, false otherwise
 * @api public
 */
is.infinite = function (value) {
  return value === Infinity || value === -Infinity;
};

/**
 * is.decimal
 * Test if `value` is a decimal number.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a decimal number, false otherwise
 * @api public
 */

is.decimal = function (value) {
  return is.number(value) && !isActualNaN(value) && !is.infinite(value) && value % 1 !== 0;
};

/**
 * is.divisibleBy
 * Test if `value` is divisible by `n`.
 *
 * @param {Number} value value to test
 * @param {Number} n dividend
 * @return {Boolean} true if `value` is divisible by `n`, false otherwise
 * @api public
 */

is.divisibleBy = function (value, n) {
  var isDividendInfinite = is.infinite(value);
  var isDivisorInfinite = is.infinite(n);
  var isNonZeroNumber = is.number(value) && !isActualNaN(value) && is.number(n) && !isActualNaN(n) && n !== 0;
  return isDividendInfinite || isDivisorInfinite || (isNonZeroNumber && value % n === 0);
};

/**
 * is.integer
 * Test if `value` is an integer.
 *
 * @param value to test
 * @return {Boolean} true if `value` is an integer, false otherwise
 * @api public
 */

is.integer = is['int'] = function (value) {
  return is.number(value) && !isActualNaN(value) && value % 1 === 0;
};

/**
 * is.maximum
 * Test if `value` is greater than 'others' values.
 *
 * @param {Number} value value to test
 * @param {Array} others values to compare with
 * @return {Boolean} true if `value` is greater than `others` values
 * @api public
 */

is.maximum = function (value, others) {
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.arraylike(others)) {
    throw new TypeError('second argument must be array-like');
  }
  var len = others.length;

  while (--len >= 0) {
    if (value < others[len]) {
      return false;
    }
  }

  return true;
};

/**
 * is.minimum
 * Test if `value` is less than `others` values.
 *
 * @param {Number} value value to test
 * @param {Array} others values to compare with
 * @return {Boolean} true if `value` is less than `others` values
 * @api public
 */

is.minimum = function (value, others) {
  if (isActualNaN(value)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.arraylike(others)) {
    throw new TypeError('second argument must be array-like');
  }
  var len = others.length;

  while (--len >= 0) {
    if (value > others[len]) {
      return false;
    }
  }

  return true;
};

/**
 * is.nan
 * Test if `value` is not a number.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is not a number, false otherwise
 * @api public
 */

is.nan = function (value) {
  return !is.number(value) || value !== value;
};

/**
 * is.even
 * Test if `value` is an even number.
 *
 * @param {Number} value value to test
 * @return {Boolean} true if `value` is an even number, false otherwise
 * @api public
 */

is.even = function (value) {
  return is.infinite(value) || (is.number(value) && value === value && value % 2 === 0);
};

/**
 * is.odd
 * Test if `value` is an odd number.
 *
 * @param {Number} value value to test
 * @return {Boolean} true if `value` is an odd number, false otherwise
 * @api public
 */

is.odd = function (value) {
  return is.infinite(value) || (is.number(value) && value === value && value % 2 !== 0);
};

/**
 * is.ge
 * Test if `value` is greater than or equal to `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean}
 * @api public
 */

is.ge = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value >= other;
};

/**
 * is.gt
 * Test if `value` is greater than `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean}
 * @api public
 */

is.gt = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value > other;
};

/**
 * is.le
 * Test if `value` is less than or equal to `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} if 'value' is less than or equal to 'other'
 * @api public
 */

is.le = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value <= other;
};

/**
 * is.lt
 * Test if `value` is less than `other`.
 *
 * @param {Number} value value to test
 * @param {Number} other value to compare with
 * @return {Boolean} if `value` is less than `other`
 * @api public
 */

is.lt = function (value, other) {
  if (isActualNaN(value) || isActualNaN(other)) {
    throw new TypeError('NaN is not a valid value');
  }
  return !is.infinite(value) && !is.infinite(other) && value < other;
};

/**
 * is.within
 * Test if `value` is within `start` and `finish`.
 *
 * @param {Number} value value to test
 * @param {Number} start lower bound
 * @param {Number} finish upper bound
 * @return {Boolean} true if 'value' is is within 'start' and 'finish'
 * @api public
 */
is.within = function (value, start, finish) {
  if (isActualNaN(value) || isActualNaN(start) || isActualNaN(finish)) {
    throw new TypeError('NaN is not a valid value');
  } else if (!is.number(value) || !is.number(start) || !is.number(finish)) {
    throw new TypeError('all arguments must be numbers');
  }
  var isAnyInfinite = is.infinite(value) || is.infinite(start) || is.infinite(finish);
  return isAnyInfinite || (value >= start && value <= finish);
};

/**
 * Test object.
 */

/**
 * is.object
 * Test if `value` is an object.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is an object, false otherwise
 * @api public
 */
is.object = function (value) {
  return toStr.call(value) === '[object Object]';
};

/**
 * is.primitive
 * Test if `value` is a primitive.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a primitive, false otherwise
 * @api public
 */
is.primitive = function isPrimitive(value) {
  if (!value) {
    return true;
  }
  if (typeof value === 'object' || is.object(value) || is.fn(value) || is.array(value)) {
    return false;
  }
  return true;
};

/**
 * is.hash
 * Test if `value` is a hash - a plain object literal.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a hash, false otherwise
 * @api public
 */

is.hash = function (value) {
  return is.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
};

/**
 * Test regexp.
 */

/**
 * is.regexp
 * Test if `value` is a regular expression.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a regexp, false otherwise
 * @api public
 */

is.regexp = function (value) {
  return toStr.call(value) === '[object RegExp]';
};

/**
 * Test string.
 */

/**
 * is.string
 * Test if `value` is a string.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is a string, false otherwise
 * @api public
 */

is.string = function (value) {
  return toStr.call(value) === '[object String]';
};

/**
 * Test base64 string.
 */

/**
 * is.base64
 * Test if `value` is a valid base64 encoded string.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is a base64 encoded string, false otherwise
 * @api public
 */

is.base64 = function (value) {
  return is.string(value) && (!value.length || base64Regex.test(value));
};

/**
 * Test base64 string.
 */

/**
 * is.hex
 * Test if `value` is a valid hex encoded string.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if 'value' is a hex encoded string, false otherwise
 * @api public
 */

is.hex = function (value) {
  return is.string(value) && (!value.length || hexRegex.test(value));
};

/**
 * is.symbol
 * Test if `value` is an ES6 Symbol
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a Symbol, false otherise
 * @api public
 */

is.symbol = function (value) {
  return typeof Symbol === 'function' && toStr.call(value) === '[object Symbol]' && typeof symbolValueOf.call(value) === 'symbol';
};

module.exports = is;


/***/ }),
/* 12 */
/***/ (function(module, exports) {


module.exports = function isEmail (string) {
    return (/.+\@.+\..+/).test(string);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate) {

var callable, byObserver;

callable = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};

byObserver = function (Observer) {
	var node = document.createTextNode(''), queue, i = 0;
	new Observer(function () {
		var data;
		if (!queue) return;
		data = queue;
		queue = null;
		if (typeof data === 'function') {
			data();
			return;
		}
		data.forEach(function (fn) { fn(); });
	}).observe(node, { characterData: true });
	return function (fn) {
		callable(fn);
		if (queue) {
			if (typeof queue === 'function') queue = [queue, fn];
			else queue.push(fn);
			return;
		}
		queue = fn;
		node.data = (i = ++i % 2);
	};
};

module.exports = (function () {
	// Node.js
	if ((typeof process !== 'undefined') && process &&
			(typeof process.nextTick === 'function')) {
		return process.nextTick;
	}

	// MutationObserver=
	if ((typeof document === 'object') && document) {
		if (typeof MutationObserver === 'function') {
			return byObserver(MutationObserver);
		}
		if (typeof WebKitMutationObserver === 'function') {
			return byObserver(WebKitMutationObserver);
		}
	}

	// W3C Draft
	// http://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html
	if (typeof setImmediate === 'function') {
		return function (cb) { setImmediate(callable(cb)); };
	}

	// Wide available standard
	if (typeof setTimeout === 'function') {
		return function (cb) { setTimeout(callable(cb), 0); };
	}

	return null;
}());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14), __webpack_require__(67).setImmediate))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 15 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var is = __webpack_require__(11);
var isodate = __webpack_require__(24);
var milliseconds = __webpack_require__(52);
var seconds = __webpack_require__(53);

/**
 * Returns a new Javascript Date object, allowing a variety of extra input types
 * over the native Date constructor.
 *
 * @param {Date|string|number} val
 */
module.exports = function newDate(val) {
  if (is.date(val)) return val;
  if (is.number(val)) return new Date(toMs(val));

  // date strings
  if (isodate.is(val)) {
    return isodate.parse(val);
  }
  if (milliseconds.is(val)) {
    return milliseconds.parse(val);
  }
  if (seconds.is(val)) {
    return seconds.parse(val);
  }

  // fallback to Date.parse
  return new Date(val);
};


/**
 * If the number passed val is seconds from the epoch, turn it into milliseconds.
 * Milliseconds would be greater than 31557600000 (December 31, 1970).
 *
 * @param {number} num
 */
function toMs(num) {
  if (num < 31557600000) return num * 1000;
  return num;
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherit = __webpack_require__(0).inherit;
var type = __webpack_require__(0).type;
var Facade = __webpack_require__(6);
var Identify = __webpack_require__(29);
var isEmail = __webpack_require__(12);
var get = __webpack_require__(9);

/**
 * Initialize a new `Track` facade with a `dictionary` of arguments.
 *
 * @param {object} dictionary
 *   @property {string} event
 *   @property {string} userId
 *   @property {string} sessionId
 *   @property {Object} properties
 *   @property {Object} options
 * @param {Object} opts
 *   @property {boolean|undefined} clone
 */

function Track(dictionary, opts) {
  Facade.call(this, dictionary, opts);
}

/**
 * Inherit from `Facade`.
 */

inherit(Track, Facade);

/**
 * Return the facade's action.
 *
 * @return {string}
 */

Track.prototype.action = function() {
  return 'track';
};

Track.prototype.type = Track.prototype.action;

/**
 * Setup some basic proxies.
 */

Track.prototype.event = Facade.field('event');
Track.prototype.value = Facade.proxy('properties.value');

/**
 * Misc
 */

Track.prototype.category = Facade.proxy('properties.category');

/**
 * Ecommerce
 */

/**
 * ids
 */

Track.prototype.id = Facade.proxy('properties.id');
Track.prototype.productId = function() {
  return this.proxy('properties.product_id') || this.proxy('properties.productId');
};
Track.prototype.promotionId = function() {
  return this.proxy('properties.promotion_id') || this.proxy('properties.promotionId');
};
Track.prototype.cartId = function() {
  return this.proxy('properties.cart_id') || this.proxy('properties.cartId');
};
Track.prototype.checkoutId = function() {
  return this.proxy('properties.checkout_id') || this.proxy('properties.checkoutId');
};
Track.prototype.paymentId = function() {
  return this.proxy('properties.payment_id') || this.proxy('properties.paymentId');
};
Track.prototype.couponId = function() {
  return this.proxy('properties.coupon_id') || this.proxy('properties.couponId');
};
Track.prototype.wishlistId = function() {
  return this.proxy('properties.wishlist_id') || this.proxy('properties.wishlistId');
};
Track.prototype.reviewId = function() {
  return this.proxy('properties.review_id') || this.proxy('properties.reviewId');
};

Track.prototype.orderId = function() {
  // doesn't follow above convention since this fallback order was how it used to be
  return this.proxy('properties.id')
    || this.proxy('properties.order_id')
    || this.proxy('properties.orderId');
};

Track.prototype.sku = Facade.proxy('properties.sku');
Track.prototype.tax = Facade.proxy('properties.tax');
Track.prototype.name = Facade.proxy('properties.name');
Track.prototype.price = Facade.proxy('properties.price');
Track.prototype.total = Facade.proxy('properties.total');
Track.prototype.repeat = Facade.proxy('properties.repeat');
Track.prototype.coupon = Facade.proxy('properties.coupon');
Track.prototype.shipping = Facade.proxy('properties.shipping');
Track.prototype.discount = Facade.proxy('properties.discount');

Track.prototype.shippingMethod = function() {
  return this.proxy('properties.shipping_method') || this.proxy('properties.shippingMethod');
};

Track.prototype.paymentMethod = function() {
  return this.proxy('properties.payment_method') || this.proxy('properties.paymentMethod');
};

/**
 * Description
 */

Track.prototype.description = Facade.proxy('properties.description');

/**
 * Plan
 */

Track.prototype.plan = Facade.proxy('properties.plan');

/**
 * Get subtotal.
 *
 * @return {number}
 */
Track.prototype.subtotal = function() {
  var subtotal = get(this.properties(), 'subtotal');
  var total = this.total() || this.revenue();

  if (subtotal) return subtotal;
  if (!total) return 0;

  if (this.total()) {
    var n = this.tax();
    if (n) total -= n;
    n = this.shipping();
    if (n) total -= n;
    n = this.discount();
    if (n) total += n;
  }

  return total;
};

/**
 * Get products.
 *
 * @return {Array}
 */
Track.prototype.products = function() {
  var props = this.properties();
  var products = get(props, 'products');
  return type(products) === 'array' ? products : [];
};

/**
 * Get quantity.
 *
 * @return {number}
 */
Track.prototype.quantity = function() {
  var props = this.obj.properties || {};
  return props.quantity || 1;
};

/**
 * Get currency.
 *
 * @return {string}
 */
Track.prototype.currency = function() {
  var props = this.obj.properties || {};
  return props.currency || 'USD';
};

/**
 * BACKWARDS COMPATIBILITY: should probably re-examine where these come from.
 */

Track.prototype.referrer = function() {
  return this.proxy('context.referrer.url')
    || this.proxy('context.page.referrer')
    || this.proxy('properties.referrer');
};

Track.prototype.query = Facade.proxy('options.query');

/**
 * Get the call's properties.
 *
 * @param {Object} aliases
 * @return {Object}
 */
Track.prototype.properties = function(aliases) {
  var ret = this.field('properties') || {};
  aliases = aliases || {};

  for (var alias in aliases) {
    var value = this[alias] == null ? this.proxy('properties.' + alias) : this[alias]();
    if (value == null) continue;
    ret[aliases[alias]] = value;
    delete ret[alias];
  }

  return ret;
};

/**
 * Get the call's username.
 *
 * @return {string|undefined}
 */
Track.prototype.username = function() {
  return this.proxy('traits.username')
    || this.proxy('properties.username')
    || this.userId()
    || this.sessionId();
};

/**
 * Get the call's email, using an the user ID if it's a valid email.
 *
 * @return {string|undefined}
 */
Track.prototype.email = function() {
  var email = this.proxy('traits.email')
    || this.proxy('properties.email')
    || this.proxy('options.traits.email');
  if (email) return email;

  var userId = this.userId();
  if (isEmail(userId)) return userId;
};

/**
 * Get the call's revenue, parsing it from a string with an optional leading
 * dollar sign.
 *
 * For products/services that don't have shipping and are not directly taxed,
 * they only care about tracking `revenue`. These are things like
 * SaaS companies, who sell monthly subscriptions. The subscriptions aren't
 * taxed directly, and since it's a digital product, it has no shipping.
 *
 * The only case where there's a difference between `revenue` and `total`
 * (in the context of analytics) is on ecommerce platforms, where they want
 * the `revenue` function to actually return the `total` (which includes
 * tax and shipping, total = subtotal + tax + shipping). This is probably
 * because on their backend they assume tax and shipping has been applied to
 * the value, and so can get the revenue on their own.
 *
 * @return {number}
 */
Track.prototype.revenue = function() {
  var revenue = this.proxy('properties.revenue');
  var event = this.event();
  var orderCompletedRegExp = /^[ _]?completed[ _]?order[ _]?|^[ _]?order[ _]?completed[ _]?$/i;

  // it's always revenue, unless it's called during an order completion.
  if (!revenue && event && event.match(orderCompletedRegExp)) {
    revenue = this.proxy('properties.total');
  }

  return currency(revenue);
};

/**
 * Get cents.
 *
 * @return {number}
 */
Track.prototype.cents = function() {
  var revenue = this.revenue();
  return typeof revenue !== 'number' ? this.value() || 0 : revenue * 100;
};

/**
 * A utility to turn the pieces of a track call into an identify. Used for
 * integrations with super properties or rate limits.
 *
 * TODO: remove me.
 *
 * @return {Facade}
 */
Track.prototype.identify = function() {
  var json = this.json();
  json.traits = this.traits();
  return new Identify(json, this.opts);
};

/**
 * Get float from currency value.
 *
 * @param {*} val
 * @return {number}
 */
function currency(val) {
  if (!val) return;
  if (typeof val === 'number') {
    return val;
  }
  if (typeof val !== 'string') {
    return;
  }

  val = val.replace(/\$/g, '');
  val = parseFloat(val);

  if (!isNaN(val)) {
    return val;
  }
}

/**
 * Exports.
 */

module.exports = Track;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var bindAll = __webpack_require__(8);
var clone = __webpack_require__(7);
var cookie = __webpack_require__(20);
var debug = __webpack_require__(2)('analytics.js:cookie');
var defaults = __webpack_require__(3);
var json = __webpack_require__(34);
var topDomain = __webpack_require__(63);

/**
 * Initialize a new `Cookie` with `options`.
 *
 * @param {Object} options
 */

function Cookie(options) {
  this.options(options);
}


/**
 * Get or set the cookie options.
 *
 * @param {Object} options
 *   @field {Number} maxage (1 year)
 *   @field {String} domain
 *   @field {String} path
 *   @field {Boolean} secure
 */

Cookie.prototype.options = function(options) {
  if (arguments.length === 0) return this._options;

  options = options || {};

  var domain = '.' + topDomain(window.location.href);
  if (domain === '.') domain = null;

  this._options = defaults(options, {
    // default to a year
    maxage: 31536000000,
    path: '/',
    domain: domain
  });

  // http://curl.haxx.se/rfc/cookie_spec.html
  // https://publicsuffix.org/list/effective_tld_names.dat
  //
  // try setting a dummy cookie with the options
  // if the cookie isn't set, it probably means
  // that the domain is on the public suffix list
  // like myapp.herokuapp.com or localhost / ip.
  this.set('ajs:test', true);
  if (!this.get('ajs:test')) {
    debug('fallback to domain=null');
    this._options.domain = null;
  }
  this.remove('ajs:test');
};


/**
 * Set a `key` and `value` in our cookie.
 *
 * @param {String} key
 * @param {Object} value
 * @return {Boolean} saved
 */

Cookie.prototype.set = function(key, value) {
  try {
    value = json.stringify(value);
    cookie(key, value, clone(this._options));
    return true;
  } catch (e) {
    return false;
  }
};


/**
 * Get a value from our cookie by `key`.
 *
 * @param {String} key
 * @return {Object} value
 */

Cookie.prototype.get = function(key) {
  try {
    var value = cookie(key);
    value = value ? json.parse(value) : null;
    return value;
  } catch (e) {
    return null;
  }
};


/**
 * Remove a value from our cookie by `key`.
 *
 * @param {String} key
 * @return {Boolean} removed
 */

Cookie.prototype.remove = function(key) {
  try {
    cookie(key, null, clone(this._options));
    return true;
  } catch (e) {
    return false;
  }
};


/**
 * Expose the cookie singleton.
 */

module.exports = bindAll(new Cookie());


/**
 * Expose the `Cookie` constructor.
 */

module.exports.Cookie = Cookie;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(2)('cookie');

/**
 * Set or get cookie `name` with `value` and `options` object.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {Mixed}
 * @api public
 */

module.exports = function(name, value, options){
  switch (arguments.length) {
    case 3:
    case 2:
      return set(name, value, options);
    case 1:
      return get(name);
    default:
      return all();
  }
};

/**
 * Set cookie `name` to `value`.
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @api private
 */

function set(name, value, options) {
  options = options || {};
  var str = encode(name) + '=' + encode(value);

  if (null == value) options.maxage = -1;

  if (options.maxage) {
    options.expires = new Date(+new Date + options.maxage);
  }

  if (options.path) str += '; path=' + options.path;
  if (options.domain) str += '; domain=' + options.domain;
  if (options.expires) str += '; expires=' + options.expires.toUTCString();
  if (options.secure) str += '; secure';

  document.cookie = str;
}

/**
 * Return all cookies.
 *
 * @return {Object}
 * @api private
 */

function all() {
  var str;
  try {
    str = document.cookie;
  } catch (err) {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(err.stack || err);
    }
    return {};
  }
  return parse(str);
}

/**
 * Get cookie `name`.
 *
 * @param {String} name
 * @return {String}
 * @api private
 */

function get(name) {
  return all()[name];
}

/**
 * Parse cookie `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parse(str) {
  var obj = {};
  var pairs = str.split(/ *; */);
  var pair;
  if ('' == pairs[0]) return obj;
  for (var i = 0; i < pairs.length; ++i) {
    pair = pairs[i].split('=');
    obj[decode(pair[0])] = decode(pair[1]);
  }
  return obj;
}

/**
 * Encode.
 */

function encode(value){
  try {
    return encodeURIComponent(value);
  } catch (e) {
    debug('error `encode(%o)` - %o', value, e)
  }
}

/**
 * Decode.
 */

function decode(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    debug('error `decode(%o)` - %o', value, e)
  }
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Module dependencies.
 */

var each = __webpack_require__(1);

/**
 * Reduces all the values in a collection down into a single value. Does so by iterating through the
 * collection from left to right, repeatedly calling an `iterator` function and passing to it four
 * arguments: `(accumulator, value, index, collection)`.
 *
 * Returns the final return value of the `iterator` function.
 *
 * @name foldl
 * @api public
 * @param {Function} iterator The function to invoke per iteration.
 * @param {*} accumulator The initial accumulator value, passed to the first invocation of `iterator`.
 * @param {Array|Object} collection The collection to iterate over.
 * @return {*} The return value of the final call to `iterator`.
 * @example
 * foldl(function(total, n) {
 *   return total + n;
 * }, 0, [1, 2, 3]);
 * //=> 6
 *
 * var phonebook = { bob: '555-111-2345', tim: '655-222-6789', sheila: '655-333-1298' };
 *
 * foldl(function(results, phoneNumber) {
 *  if (phoneNumber[0] === '6') {
 *    return results.concat(phoneNumber);
 *  }
 *  return results;
 * }, [], phonebook);
 * // => ['655-222-6789', '655-333-1298']
 */
var foldl = function foldl(iterator, accumulator, collection) {
  if (typeof iterator !== 'function') {
    throw new TypeError('Expected a function but received a ' + typeof iterator);
  }

  each(function(val, i, collection) {
    accumulator = iterator(accumulator, val, i, collection);
  }, collection);

  return accumulator;
};

/*
 * Exports.
 */

module.exports = foldl;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Module dependencies.
 */

var each = __webpack_require__(1);

var strIndexOf = String.prototype.indexOf;

/**
 * Object.is/sameValueZero polyfill.
 *
 * @api private
 * @param {*} value1
 * @param {*} value2
 * @return {boolean}
 */
// TODO: Move to library
var sameValueZero = function sameValueZero(value1, value2) {
  // Normal values and check for 0 / -0
  if (value1 === value2) {
    return value1 !== 0 || 1 / value1 === 1 / value2;
  }
  // NaN
  return value1 !== value1 && value2 !== value2;
};

/**
 * Searches a given `collection` for a value, returning true if the collection
 * contains the value and false otherwise. Can search strings, arrays, and
 * objects.
 *
 * @name includes
 * @api public
 * @param {*} searchElement The element to search for.
 * @param {Object|Array|string} collection The collection to search.
 * @return {boolean}
 * @example
 * includes(2, [1, 2, 3]);
 * //=> true
 *
 * includes(4, [1, 2, 3]);
 * //=> false
 *
 * includes(2, { a: 1, b: 2, c: 3 });
 * //=> true
 *
 * includes('a', { a: 1, b: 2, c: 3 });
 * //=> false
 *
 * includes('abc', 'xyzabc opq');
 * //=> true
 *
 * includes('nope', 'xyzabc opq');
 * //=> false
 */
var includes = function includes(searchElement, collection) {
  var found = false;

  // Delegate to String.prototype.indexOf when `collection` is a string
  if (typeof collection === 'string') {
    return strIndexOf.call(collection, searchElement) !== -1;
  }

  // Iterate through enumerable/own array elements and object properties.
  each(function(value) {
    if (sameValueZero(value, searchElement)) {
      found = true;
      // Exit iteration early when found
      return false;
    }
  }, collection);

  return found;
};

/*
 * Exports.
 */

module.exports = includes;


/***/ }),
/* 23 */
/***/ (function(module, exports) {


/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Function]': return 'function';
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val === Object(val)) return 'object';

  return typeof val;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Matcher, slightly modified from:
 *
 * https://github.com/csnover/js-iso8601/blob/lax/iso8601.js
 */

var matcher = /^(\d{4})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:([ T])(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;

/**
 * Convert an ISO date string to a date. Fallback to native `Date.parse`.
 *
 * https://github.com/csnover/js-iso8601/blob/lax/iso8601.js
 *
 * @param {String} iso
 * @return {Date}
 */

exports.parse = function(iso) {
  var numericKeys = [1, 5, 6, 7, 11, 12];
  var arr = matcher.exec(iso);
  var offset = 0;

  // fallback to native parsing
  if (!arr) {
    return new Date(iso);
  }

  /* eslint-disable no-cond-assign */
  // remove undefined values
  for (var i = 0, val; val = numericKeys[i]; i++) {
    arr[val] = parseInt(arr[val], 10) || 0;
  }
  /* eslint-enable no-cond-assign */

  // allow undefined days and months
  arr[2] = parseInt(arr[2], 10) || 1;
  arr[3] = parseInt(arr[3], 10) || 1;

  // month is 0-11
  arr[2]--;

  // allow abitrary sub-second precision
  arr[8] = arr[8] ? (arr[8] + '00').substring(0, 3) : 0;

  // apply timezone if one exists
  if (arr[4] === ' ') {
    offset = new Date().getTimezoneOffset();
  } else if (arr[9] !== 'Z' && arr[10]) {
    offset = arr[11] * 60 + arr[12];
    if (arr[10] === '+') {
      offset = 0 - offset;
    }
  }

  var millis = Date.UTC(arr[1], arr[2], arr[3], arr[5], arr[6] + offset, arr[7], arr[8]);
  return new Date(millis);
};


/**
 * Checks whether a `string` is an ISO date string. `strict` mode requires that
 * the date string at least have a year, month and date.
 *
 * @param {String} string
 * @param {Boolean} strict
 * @return {Boolean}
 */

exports.is = function(string, strict) {
  if (strict && (/^\d{4}-\d{2}-\d{2}/).test(string) === false) {
    return false;
  }
  return matcher.test(string);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var type = __webpack_require__(10);
var each = __webpack_require__(26);
var isodate = __webpack_require__(24);

/**
 * Expose `traverse`.
 */

module.exports = traverse;

/**
 * Traverse an object or array, and return a clone with all ISO strings parsed
 * into Date objects.
 *
 * @param {Object} obj
 * @return {Object}
 */

function traverse(input, strict) {
  if (strict === undefined) strict = true;

  if (type(input) === 'object') return object(input, strict);
  if (type(input) === 'array') return array(input, strict);
  return input;
}

/**
 * Object traverser.
 *
 * @param {Object} obj
 * @param {Boolean} strict
 * @return {Object}
 */

function object(obj, strict) {
  each(obj, function(key, val) {
    if (isodate.is(val, strict)) {
      obj[key] = isodate.parse(val);
    } else if (type(val) === 'object' || type(val) === 'array') {
      traverse(val, strict);
    }
  });
  return obj;
}

/**
 * Array traverser.
 *
 * @param {Array} arr
 * @param {Boolean} strict
 * @return {Array}
 */

function array(arr, strict) {
  each(arr, function(val, x) {
    if (type(val) === 'object') {
      traverse(val, strict);
    } else if (isodate.is(val, strict)) {
      arr[x] = isodate.parse(val);
    }
  });
  return arr;
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

try {
  var type = __webpack_require__(27);
} catch (err) {
  var type = __webpack_require__(27);
}

var toFunction = __webpack_require__(54);

/**
 * HOP reference.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Iterate the given `obj` and invoke `fn(val, i)`
 * in optional context `ctx`.
 *
 * @param {String|Array|Object} obj
 * @param {Function} fn
 * @param {Object} [ctx]
 * @api public
 */

module.exports = function(obj, fn, ctx){
  fn = toFunction(fn);
  ctx = ctx || this;
  switch (type(obj)) {
    case 'array':
      return array(obj, fn, ctx);
    case 'object':
      if ('number' == typeof obj.length) return array(obj, fn, ctx);
      return object(obj, fn, ctx);
    case 'string':
      return string(obj, fn, ctx);
  }
};

/**
 * Iterate string chars.
 *
 * @param {String} obj
 * @param {Function} fn
 * @param {Object} ctx
 * @api private
 */

function string(obj, fn, ctx) {
  for (var i = 0; i < obj.length; ++i) {
    fn.call(ctx, obj.charAt(i), i);
  }
}

/**
 * Iterate object keys.
 *
 * @param {Object} obj
 * @param {Function} fn
 * @param {Object} ctx
 * @api private
 */

function object(obj, fn, ctx) {
  for (var key in obj) {
    if (has.call(obj, key)) {
      fn.call(ctx, key, obj[key]);
    }
  }
}

/**
 * Iterate array-ish.
 *
 * @param {Array|Object} obj
 * @param {Function} fn
 * @param {Object} ctx
 * @api private
 */

function array(obj, fn, ctx) {
  for (var i = 0; i < obj.length; ++i) {
    fn.call(ctx, obj[i], i);
  }
}


/***/ }),
/* 27 */
/***/ (function(module, exports) {


/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Function]': return 'function';
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
    case '[object String]': return 'string';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val && val.nodeType === 1) return 'element';
  if (val === Object(val)) return 'object';

  return typeof val;
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

/**
 * Global Names
 */

var globals = /\b(Array|Date|Object|Math|JSON)\b/g;

/**
 * Return immediate identifiers parsed from `str`.
 *
 * @param {String} str
 * @param {String|Function} map function or prefix
 * @return {Array}
 * @api public
 */

module.exports = function(str, fn){
  var p = unique(props(str));
  if (fn && 'string' == typeof fn) fn = prefixed(fn);
  if (fn) return map(str, p, fn);
  return p;
};

/**
 * Return immediate identifiers in `str`.
 *
 * @param {String} str
 * @return {Array}
 * @api private
 */

function props(str) {
  return str
    .replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g, '')
    .replace(globals, '')
    .match(/[a-zA-Z_]\w*/g)
    || [];
}

/**
 * Return `str` with `props` mapped with `fn`.
 *
 * @param {String} str
 * @param {Array} props
 * @param {Function} fn
 * @return {String}
 * @api private
 */

function map(str, props, fn) {
  var re = /\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g;
  return str.replace(re, function(_){
    if ('(' == _[_.length - 1]) return fn(_);
    if (!~props.indexOf(_)) return _;
    return fn(_);
  });
}

/**
 * Return unique array.
 *
 * @param {Array} arr
 * @return {Array}
 * @api private
 */

function unique(arr) {
  var ret = [];

  for (var i = 0; i < arr.length; i++) {
    if (~ret.indexOf(arr[i])) continue;
    ret.push(arr[i]);
  }

  return ret;
}

/**
 * Map with prefix `str`.
 */

function prefixed(str) {
  return function(_){
    return str + _;
  };
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Facade = __webpack_require__(6);
var get = __webpack_require__(9);
var inherit = __webpack_require__(0).inherit;
var isEmail = __webpack_require__(12);
var newDate = __webpack_require__(16);
var trim = __webpack_require__(30);
var type = __webpack_require__(0).type;

/**
 * Initialize a new `Identify` facade with a `dictionary` of arguments.
 *
 * @param {Object} dictionary
 *   @param {string} userId
 *   @param {string} sessionId
 *   @param {Object} traits
 *   @param {Object} options
 * @param {Object} opts
 *   @property {boolean|undefined} clone
 */
function Identify(dictionary, opts) {
  Facade.call(this, dictionary, opts);
}

/**
 * Inherit from `Facade`.
 */

inherit(Identify, Facade);

/**
 * Get the facade's action.
 */
Identify.prototype.action = function() {
  return 'identify';
};

Identify.prototype.type = Identify.prototype.action;

/**
 * Get the user's traits.
 *
 * @param {Object} aliases
 * @return {Object}
 */
Identify.prototype.traits = function(aliases) {
  var ret = this.field('traits') || {};
  var id = this.userId();
  aliases = aliases || {};

  if (id) ret.id = id;

  for (var alias in aliases) {
    var value = this[alias] == null ? this.proxy('traits.' + alias) : this[alias]();
    if (value == null) continue;
    ret[aliases[alias]] = value;
    if (alias !== aliases[alias]) delete ret[alias];
  }

  return ret;
};

/**
 * Get the user's email, falling back to their user ID if it's a valid email.
 *
 * @return {string}
 */
Identify.prototype.email = function() {
  var email = this.proxy('traits.email');
  if (email) return email;

  var userId = this.userId();
  if (isEmail(userId)) return userId;
};

/**
 * Get the user's created date, optionally looking for `createdAt` since lots of
 * people do that instead.
 *
 * @return {Date|undefined}
 */
Identify.prototype.created = function() {
  var created = this.proxy('traits.created') || this.proxy('traits.createdAt');
  if (created) return newDate(created);
};

/**
 * Get the company created date.
 *
 * @return {Date|undefined}
 */
Identify.prototype.companyCreated = function() {
  var created = this.proxy('traits.company.created') || this.proxy('traits.company.createdAt');

  if (created) {
    return newDate(created);
  }
};

/**
 * Get the user's name, optionally combining a first and last name if that's all
 * that was provided.
 *
 * @return {string|undefined}
 */
Identify.prototype.name = function() {
  var name = this.proxy('traits.name');
  if (typeof name === 'string') {
    return trim(name);
  }

  var firstName = this.firstName();
  var lastName = this.lastName();
  if (firstName && lastName) {
    return trim(firstName + ' ' + lastName);
  }
};

/**
 * Get the user's first name, optionally splitting it out of a single name if
 * that's all that was provided.
 *
 * @return {string|undefined}
 */
Identify.prototype.firstName = function() {
  var firstName = this.proxy('traits.firstName');
  if (typeof firstName === 'string') {
    return trim(firstName);
  }

  var name = this.proxy('traits.name');
  if (typeof name === 'string') {
    return trim(name).split(' ')[0];
  }
};

/**
 * Get the user's last name, optionally splitting it out of a single name if
 * that's all that was provided.
 *
 * @return {string|undefined}
 */
Identify.prototype.lastName = function() {
  var lastName = this.proxy('traits.lastName');
  if (typeof lastName === 'string') {
    return trim(lastName);
  }

  var name = this.proxy('traits.name');
  if (typeof name !== 'string') {
    return;
  }

  var space = trim(name).indexOf(' ');
  if (space === -1) {
    return;
  }

  return trim(name.substr(space + 1));
};

/**
 * Get the user's unique id.
 *
 * @return {string|undefined}
 */
Identify.prototype.uid = function() {
  return this.userId() || this.username() || this.email();
};

/**
 * Get description.
 *
 * @return {string}
 */
Identify.prototype.description = function() {
  return this.proxy('traits.description') || this.proxy('traits.background');
};

/**
 * Get the age.
 *
 * If the age is not explicitly set
 * the method will compute it from `.birthday()`
 * if possible.
 *
 * @return {number}
 */
Identify.prototype.age = function() {
  var date = this.birthday();
  var age = get(this.traits(), 'age');
  if (age != null) return age;
  if (type(date) !== 'date') return;
  var now = new Date();
  return now.getFullYear() - date.getFullYear();
};

/**
 * Get the avatar.
 *
 * .photoUrl needed because help-scout
 * implementation uses `.avatar || .photoUrl`.
 *
 * .avatarUrl needed because trakio uses it.
 *
 * @return {*}
 */
Identify.prototype.avatar = function() {
  var traits = this.traits();
  return get(traits, 'avatar') || get(traits, 'photoUrl') || get(traits, 'avatarUrl');
};

/**
 * Get the position.
 *
 * .jobTitle needed because some integrations use it.
 *
 * @return {*}
 */
Identify.prototype.position = function() {
  var traits = this.traits();
  return get(traits, 'position') || get(traits, 'jobTitle');
};

/**
 * Setup sme basic "special" trait proxies.
 */

Identify.prototype.username = Facade.proxy('traits.username');
Identify.prototype.website = Facade.one('traits.website');
Identify.prototype.websites = Facade.multi('traits.website');
Identify.prototype.phone = Facade.one('traits.phone');
Identify.prototype.phones = Facade.multi('traits.phone');
Identify.prototype.address = Facade.proxy('traits.address');
Identify.prototype.gender = Facade.proxy('traits.gender');
Identify.prototype.birthday = Facade.proxy('traits.birthday');

/**
 * Exports.
 */

module.exports = Identify;


/***/ }),
/* 30 */
/***/ (function(module, exports) {


exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherit = __webpack_require__(0).inherit;
var Facade = __webpack_require__(6);
var Track = __webpack_require__(17);
var isEmail = __webpack_require__(12);

/**
 * Initialize new `Page` facade with `dictionary`.
 *
 * @param {Object} dictionary
 *   @param {string} category
 *   @param {string} name
 *   @param {Object} traits
 *   @param {Object} options
 * @param {Object} opts
 *   @property {Boolean|Undefined} clone
 */

function Page(dictionary, opts) {
  Facade.call(this, dictionary, opts);
}

/**
 * Inherit from `Facade`
 */

inherit(Page, Facade);

/**
 * Get the facade's action.
 *
 * @return {string}
 */
Page.prototype.action = function() {
  return 'page';
};

Page.prototype.type = Page.prototype.action;

/**
 * Fields
 */

Page.prototype.category = Facade.field('category');
Page.prototype.name = Facade.field('name');

/**
 * Proxies.
 */

Page.prototype.title = Facade.proxy('properties.title');
Page.prototype.path = Facade.proxy('properties.path');
Page.prototype.url = Facade.proxy('properties.url');

/**
 * Referrer.
 */
Page.prototype.referrer = function() {
  return this.proxy('context.referrer.url')
    || this.proxy('context.page.referrer')
    || this.proxy('properties.referrer');
};

/**
 * Get the page properties mixing `category` and `name`.
 *
 * @param {Object} aliases
 * @return {Object}
 */
Page.prototype.properties = function(aliases) {
  var props = this.field('properties') || {};
  var category = this.category();
  var name = this.name();
  aliases = aliases || {};

  if (category) props.category = category;
  if (name) props.name = name;

  for (var alias in aliases) {
    var value = this[alias] == null
      ? this.proxy('properties.' + alias)
      : this[alias]();
    if (value == null) continue;
    props[aliases[alias]] = value;
    if (alias !== aliases[alias]) delete props[alias];
  }

  return props;
};

/**
 * Get the user's email, falling back to their user ID if it's a valid email.
 *
 * @return {string}
 */
Page.prototype.email = function() {
  var email = this.proxy('context.traits.email') || this.proxy('properties.email');
  if (email) return email;

  var userId = this.userId();
  if (isEmail(userId)) return userId;
};

/**
 * Get the page fullName.
 *
 * @return {string}
 */
Page.prototype.fullName = function() {
  var category = this.category();
  var name = this.name();
  return name && category
    ? category + ' ' + name
    : name;
};

/**
 * Get event with `name`.
 *
 * @return {string}
 */
Page.prototype.event = function(name) {
  return name
    ? 'Viewed ' + name + ' Page'
    : 'Loaded a Page';
};

/**
 * Convert this Page to a Track facade with `name`.
 *
 * @param {string} name
 * @return {Track}
 */
Page.prototype.track = function(name) {
  var json = this.json();
  json.event = this.event(name);
  json.timestamp = this.timestamp();
  json.properties = this.properties();
  return new Track(json, this.opts);
};

/**
 * Exports.
 */

module.exports = Page;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Module dependencies.
 */

var arity = __webpack_require__(58);

var objToString = Object.prototype.toString;

/**
 * Determine if a value is a function.
 *
 * @param {*} val
 * @return {boolean}
 */
// TODO: Move to lib
var isFunction = function(val) {
  return typeof val === 'function';
};

/**
 * Determine if a value is a number.
 *
 * @param {*} val
 * @return {boolean}
 */
// TODO: Move to lib
var isNumber = function(val) {
  var type = typeof val;
  return type === 'number' || (type === 'object' && objToString.call(val) === '[object Number]');
};

/**
 * Wrap a function `fn` in a function that will invoke `fn` when invoked `n` or
 * more times.
 *
 * @name after
 * @api public
 * @category Function
 * @param {Number} n The number of
 * @param {Function} fn The function to wrap.
 * @return {Function} A function that will call `fn` after `n` or more
 * invocations.
 * @example
 */
var after = function after(n, fn) {
  if (!isNumber(n)) {
    throw new TypeError('Expected a number but received ' + typeof n);
  }

  if (!isFunction(fn)) {
    throw new TypeError('Expected a function but received ' + typeof fn);
  }

  var callCount = 0;

  return arity(fn.length, function() {
    callCount += 1;

    if (callCount < n) {
      return;
    }

    return fn.apply(this, arguments);
  });
};

/*
 * Exports.
 */

module.exports = after;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = "function" === "function" && __webpack_require__(62);

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root["Object"]());
    exports || (exports = root["Object"]());

    // Native constructor aliases.
    var Number = context["Number"] || root["Number"],
        String = context["String"] || root["String"],
        Object = context["Object"] || root["Object"],
        Date = context["Date"] || root["Date"],
        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
        TypeError = context["TypeError"] || root["TypeError"],
        Math = context["Math"] || root["Math"],
        nativeJSON = context["JSON"] || root["JSON"];

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty, forEach, undef;

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    try {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    } catch (exception) {}

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] !== undef) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("json-parse");
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            try {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undef &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undef) === undef &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undef &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undef]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undef, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            } catch (exception) {
              stringifySupported = false;
            }
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse;
          if (typeof parse == "function") {
            try {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  try {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  } catch (exception) {}
                  if (parseSupported) {
                    try {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    } catch (exception) {}
                  }
                  if (parseSupported) {
                    try {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    } catch (exception) {}
                  }
                }
              }
            } catch (exception) {
              parseSupported = false;
            }
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Define additional utility methods if the `Date` methods are buggy.
      if (!isExtended) {
        var floor = Math.floor;
        // A mapping between the months of the year and the number of days between
        // January 1st and the first of the respective month.
        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        // Internal: Calculates the number of days between the Unix epoch and the
        // first day of the given month.
        var getDay = function (year, month) {
          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
        };
      }

      // Internal: Determines if a property is a direct property of the given
      // object. Delegates to the native `Object#hasOwnProperty` method.
      if (!(isProperty = objectProto.hasOwnProperty)) {
        isProperty = function (property) {
          var members = {}, constructor;
          if ((members.__proto__ = null, members.__proto__ = {
            // The *proto* property cannot be set multiple times in recent
            // versions of Firefox and SeaMonkey.
            "toString": 1
          }, members).toString != getClass) {
            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
            // supports the mutable *proto* property.
            isProperty = function (property) {
              // Capture and break the object's prototype chain (see section 8.6.2
              // of the ES 5.1 spec). The parenthesized expression prevents an
              // unsafe transformation by the Closure Compiler.
              var original = this.__proto__, result = property in (this.__proto__ = null, this);
              // Restore the original prototype chain.
              this.__proto__ = original;
              return result;
            };
          } else {
            // Capture a reference to the top-level `Object` constructor.
            constructor = members.constructor;
            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
            // other environments.
            isProperty = function (property) {
              var parent = (this.constructor || constructor).prototype;
              return property in this && !(property in parent && this[property] === parent[property]);
            };
          }
          members = null;
          return isProperty.call(this, property);
        };
      }

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      forEach = function (object, callback) {
        var size = 0, Properties, members, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        members = new Properties();
        for (property in members) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(members, property)) {
            size++;
          }
        }
        Properties = members = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
          };
        } else if (size == 2) {
          // Safari <= 2.0.4 enumerates shadowed properties twice.
          forEach = function (object, callback) {
            // Create a set of iterated properties.
            var members = {}, isFunction = getClass.call(object) == functionClass, property;
            for (property in object) {
              // Store each property name to prevent double enumeration. The
              // `prototype` property of functions is not enumerated due to cross-
              // environment inconsistencies.
              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forEach(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Double-quotes a string `value`, replacing all ASCII control
        // characters (characters with code unit values between 0 and 31) with
        // their escaped equivalents. This is an implementation of the
        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
        var unicodePrefix = "\\u00";
        var quote = function (value) {
          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
          for (; index < length; index++) {
            var charCode = value.charCodeAt(index);
            // If the character is a control character, append its Unicode or
            // shorthand escape sequence; otherwise, append the character as-is.
            switch (charCode) {
              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                result += Escapes[charCode];
                break;
              default:
                if (charCode < 32) {
                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                  break;
                }
                result += useCharIndex ? symbols[index] : value.charAt(index);
            }
          }
          return result + '"';
        };

        // Internal: Recursively serializes an object. Implements the
        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
          try {
            // Necessary for host object support.
            value = object[property];
          } catch (exception) {}
          if (typeof value == "object" && value) {
            className = getClass.call(value);
            if (className == dateClass && !isProperty.call(value, "toJSON")) {
              if (value > -1 / 0 && value < 1 / 0) {
                // Dates are serialized according to the `Date#toJSON` method
                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                // for the ISO 8601 date time string format.
                if (getDay) {
                  // Manually compute the year, month, date, hours, minutes,
                  // seconds, and milliseconds if the `getUTC*` methods are
                  // buggy. Adapted from @Yaffle's `date-shim` project.
                  date = floor(value / 864e5);
                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                  date = 1 + date - getDay(year, month);
                  // The `time` value specifies the time within the day (see ES
                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                  // to compute `A modulo B`, as the `%` operator does not
                  // correspond to the `modulo` operation for negative numbers.
                  time = (value % 864e5 + 864e5) % 864e5;
                  // The hours, minutes, seconds, and milliseconds are obtained by
                  // decomposing the time within the day. See section 15.9.1.10.
                  hours = floor(time / 36e5) % 24;
                  minutes = floor(time / 6e4) % 60;
                  seconds = floor(time / 1e3) % 60;
                  milliseconds = time % 1e3;
                } else {
                  year = value.getUTCFullYear();
                  month = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  minutes = value.getUTCMinutes();
                  seconds = value.getUTCSeconds();
                  milliseconds = value.getUTCMilliseconds();
                }
                // Serialize extended years correctly.
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
              } else {
                value = null;
              }
            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
              // ignores all `toJSON` methods on these objects unless they are
              // defined directly on an instance.
              value = value.toJSON(property);
            }
          }
          if (callback) {
            // If a replacement function was provided, call it to obtain the value
            // for serialization.
            value = callback.call(object, property, value);
          }
          if (value === null) {
            return "null";
          }
          className = getClass.call(value);
          if (className == booleanClass) {
            // Booleans are represented literally.
            return "" + value;
          } else if (className == numberClass) {
            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
            // `"null"`.
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          } else if (className == stringClass) {
            // Strings are double-quoted and escaped.
            return quote("" + value);
          }
          // Recursively serialize objects and arrays.
          if (typeof value == "object") {
            // Check for cyclic structures. This is a linear search; performance
            // is inversely proportional to the number of unique nested objects.
            for (length = stack.length; length--;) {
              if (stack[length] === value) {
                // Cyclic structures cannot be serialized by `JSON.stringify`.
                throw TypeError();
              }
            }
            // Add the object to the stack of traversed objects.
            stack.push(value);
            results = [];
            // Save the current indentation level and indent one additional level.
            prefix = indentation;
            indentation += whitespace;
            if (className == arrayClass) {
              // Recursively serialize array elements.
              for (index = 0, length = value.length; index < length; index++) {
                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
            } else {
              // Recursively serialize object members. Members are selected from
              // either a user-specified list of property names, or the object
              // itself.
              forEach(properties || value, function (property) {
                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                if (element !== undef) {
                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                  // is not the empty string, let `member` {quote(property) + ":"}
                  // be the concatenation of `member` and the `space` character."
                  // The "`space` character" refers to the literal space
                  // character, not the `space` {width} argument provided to
                  // `JSON.stringify`.
                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                }
              });
              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
            }
            // Remove the object from the traversed object stack.
            stack.pop();
            return result;
          }
        };

        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
        exports.stringify = function (source, filter, width) {
          var whitespace, callback, properties, className;
          if (objectTypes[typeof filter] && filter) {
            if ((className = getClass.call(filter)) == functionClass) {
              callback = filter;
            } else if (className == arrayClass) {
              // Convert the property names array into a makeshift set.
              properties = {};
              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
            }
          }
          if (width) {
            if ((className = getClass.call(width)) == numberClass) {
              // Convert the `width` to an integer and create a string containing
              // `width` number of space characters.
              if ((width -= width % 1) > 0) {
                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
              }
            } else if (className == stringClass) {
              whitespace = width.length <= 10 ? width : width.slice(0, 10);
            }
          }
          // Opera <= 7.54u2 discards the values associated with empty string keys
          // (`""`) only if they are used directly within an object member list
          // (e.g., `!("" in { "": 1})`).
          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
        };
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                if (source.slice(Index, Index + 4) == "true") {
                  Index += 4;
                  return true;
                } else if (source.slice(Index, Index + 5) == "false") {
                  Index += 5;
                  return false;
                } else if (source.slice(Index, Index + 4) == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undef) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forEach` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(value, length, callback);
              }
            } else {
              forEach(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports["runInContext"] = runInContext;
    return exports;
  }

  if (freeExports && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, freeExports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
        previousJSON = root["JSON3"],
        isRestored = false;

    var JSON3 = runInContext(root, (root["JSON3"] = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root["JSON3"] = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return JSON3;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}).call(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(61)(module), __webpack_require__(4)))

/***/ }),
/* 35 */
/***/ (function(module, exports) {


/**
 * Parse the given `url`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

exports.parse = function(url){
  var a = document.createElement('a');
  a.href = url;
  return {
    href: a.href,
    host: a.host || location.host,
    port: ('0' === a.port || '' === a.port) ? port(a.protocol) : a.port,
    hash: a.hash,
    hostname: a.hostname || location.hostname,
    pathname: a.pathname.charAt(0) != '/' ? '/' + a.pathname : a.pathname,
    protocol: !a.protocol || ':' == a.protocol ? location.protocol : a.protocol,
    search: a.search,
    query: a.search.slice(1)
  };
};

/**
 * Check if `url` is absolute.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

exports.isAbsolute = function(url){
  return 0 == url.indexOf('//') || !!~url.indexOf('://');
};

/**
 * Check if `url` is relative.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

exports.isRelative = function(url){
  return !exports.isAbsolute(url);
};

/**
 * Check if `url` is cross domain.
 *
 * @param {String} url
 * @return {Boolean}
 * @api public
 */

exports.isCrossDomain = function(url){
  url = exports.parse(url);
  var location = exports.parse(window.location.href);
  return url.hostname !== location.hostname
    || url.port !== location.port
    || url.protocol !== location.protocol;
};

/**
 * Return default port for `protocol`.
 *
 * @param  {String} protocol
 * @return {String}
 * @api private
 */
function port (protocol){
  switch (protocol) {
    case 'http:':
      return 80;
    case 'https:':
      return 443;
    default:
      return location.port;
  }
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hop = Object.prototype.hasOwnProperty;
var strCharAt = String.prototype.charAt;
var toStr = Object.prototype.toString;

/**
 * Returns the character at a given index.
 *
 * @param {string} str
 * @param {number} index
 * @return {string|undefined}
 */
// TODO: Move to a library
var charAt = function(str, index) {
  return strCharAt.call(str, index);
};

/**
 * hasOwnProperty, wrapped as a function.
 *
 * @name has
 * @api private
 * @param {*} context
 * @param {string|number} prop
 * @return {boolean}
 */

// TODO: Move to a library
var has = function has(context, prop) {
  return hop.call(context, prop);
};

/**
 * Returns true if a value is a string, otherwise false.
 *
 * @name isString
 * @api private
 * @param {*} val
 * @return {boolean}
 */

// TODO: Move to a library
var isString = function isString(val) {
  return toStr.call(val) === '[object String]';
};

/**
 * Returns true if a value is array-like, otherwise false. Array-like means a
 * value is not null, undefined, or a function, and has a numeric `length`
 * property.
 *
 * @name isArrayLike
 * @api private
 * @param {*} val
 * @return {boolean}
 */
// TODO: Move to a library
var isArrayLike = function isArrayLike(val) {
  return val != null && (typeof val !== 'function' && typeof val.length === 'number');
};


/**
 * indexKeys
 *
 * @name indexKeys
 * @api private
 * @param {} target
 * @param {Function} pred
 * @return {Array}
 */
var indexKeys = function indexKeys(target, pred) {
  pred = pred || has;

  var results = [];

  for (var i = 0, len = target.length; i < len; i += 1) {
    if (pred(target, i)) {
      results.push(String(i));
    }
  }

  return results;
};

/**
 * Returns an array of an object's owned keys.
 *
 * @name objectKeys
 * @api private
 * @param {*} target
 * @param {Function} pred Predicate function used to include/exclude values from
 * the resulting array.
 * @return {Array}
 */
var objectKeys = function objectKeys(target, pred) {
  pred = pred || has;

  var results = [];

  for (var key in target) {
    if (pred(target, key)) {
      results.push(String(key));
    }
  }

  return results;
};

/**
 * Creates an array composed of all keys on the input object. Ignores any non-enumerable properties.
 * More permissive than the native `Object.keys` function (non-objects will not throw errors).
 *
 * @name keys
 * @api public
 * @category Object
 * @param {Object} source The value to retrieve keys from.
 * @return {Array} An array containing all the input `source`'s keys.
 * @example
 * keys({ likes: 'avocado', hates: 'pineapple' });
 * //=> ['likes', 'pineapple'];
 *
 * // Ignores non-enumerable properties
 * var hasHiddenKey = { name: 'Tim' };
 * Object.defineProperty(hasHiddenKey, 'hidden', {
 *   value: 'i am not enumerable!',
 *   enumerable: false
 * })
 * keys(hasHiddenKey);
 * //=> ['name'];
 *
 * // Works on arrays
 * keys(['a', 'b', 'c']);
 * //=> ['0', '1', '2']
 *
 * // Skips unpopulated indices in sparse arrays
 * var arr = [1];
 * arr[4] = 4;
 * keys(arr);
 * //=> ['0', '4']
 */
var keys = function keys(source) {
  if (source == null) {
    return [];
  }

  // IE6-8 compatibility (string)
  if (isString(source)) {
    return indexKeys(source, charAt);
  }

  // IE6-8 compatibility (arguments)
  if (isArrayLike(source)) {
    return indexKeys(source, has);
  }

  return objectKeys(source);
};

/*
 * Exports.
 */

module.exports = keys;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Module dependencies.
 */

var clone = __webpack_require__(7);
var cookie = __webpack_require__(19);
var debug = __webpack_require__(2)('analytics:entity');
var defaults = __webpack_require__(3);
var extend = __webpack_require__(38);
var memory = __webpack_require__(39);
var store = __webpack_require__(40);
var isodateTraverse = __webpack_require__(25);

/**
 * Expose `Entity`
 */

module.exports = Entity;


/**
 * Initialize new `Entity` with `options`.
 *
 * @param {Object} options
 */

function Entity(options) {
  this.options(options);
  this.initialize();
}

/**
 * Initialize picks the storage.
 *
 * Checks to see if cookies can be set
 * otherwise fallsback to localStorage.
 */

Entity.prototype.initialize = function() {
  cookie.set('ajs:cookies', true);

  // cookies are enabled.
  if (cookie.get('ajs:cookies')) {
    cookie.remove('ajs:cookies');
    this._storage = cookie;
    return;
  }

  // localStorage is enabled.
  if (store.enabled) {
    this._storage = store;
    return;
  }

  // fallback to memory storage.
  debug('warning using memory store both cookies and localStorage are disabled');
  this._storage = memory;
};

/**
 * Get the storage.
 */

Entity.prototype.storage = function() {
  return this._storage;
};


/**
 * Get or set storage `options`.
 *
 * @param {Object} options
 *   @property {Object} cookie
 *   @property {Object} localStorage
 *   @property {Boolean} persist (default: `true`)
 */

Entity.prototype.options = function(options) {
  if (arguments.length === 0) return this._options;
  this._options = defaults(options || {}, this.defaults || {});
};


/**
 * Get or set the entity's `id`.
 *
 * @param {String} id
 */

Entity.prototype.id = function(id) {
  switch (arguments.length) {
  case 0: return this._getId();
  case 1: return this._setId(id);
  default:
      // No default case
  }
};


/**
 * Get the entity's id.
 *
 * @return {String}
 */

Entity.prototype._getId = function() {
  var ret = this._options.persist
    ? this.storage().get(this._options.cookie.key)
    : this._id;
  return ret === undefined ? null : ret;
};


/**
 * Set the entity's `id`.
 *
 * @param {String} id
 */

Entity.prototype._setId = function(id) {
  if (this._options.persist) {
    this.storage().set(this._options.cookie.key, id);
  } else {
    this._id = id;
  }
};


/**
 * Get or set the entity's `traits`.
 *
 * BACKWARDS COMPATIBILITY: aliased to `properties`
 *
 * @param {Object} traits
 */

Entity.prototype.properties = Entity.prototype.traits = function(traits) {
  switch (arguments.length) {
  case 0: return this._getTraits();
  case 1: return this._setTraits(traits);
  default:
      // No default case
  }
};


/**
 * Get the entity's traits. Always convert ISO date strings into real dates,
 * since they aren't parsed back from local storage.
 *
 * @return {Object}
 */

Entity.prototype._getTraits = function() {
  var ret = this._options.persist ? store.get(this._options.localStorage.key) : this._traits;
  return ret ? isodateTraverse(clone(ret)) : {};
};


/**
 * Set the entity's `traits`.
 *
 * @param {Object} traits
 */

Entity.prototype._setTraits = function(traits) {
  traits = traits || {};
  if (this._options.persist) {
    store.set(this._options.localStorage.key, traits);
  } else {
    this._traits = traits;
  }
};


/**
 * Identify the entity with an `id` and `traits`. If we it's the same entity,
 * extend the existing `traits` instead of overwriting.
 *
 * @param {String} id
 * @param {Object} traits
 */

Entity.prototype.identify = function(id, traits) {
  traits = traits || {};
  var current = this.id();
  if (current === null || current === id) traits = extend(this.traits(), traits);
  if (id) this.id(id);
  this.debug('identify %o, %o', id, traits);
  this.traits(traits);
  this.save();
};


/**
 * Save the entity to local storage and the cookie.
 *
 * @return {Boolean}
 */

Entity.prototype.save = function() {
  if (!this._options.persist) return false;
  cookie.set(this._options.cookie.key, this.id());
  store.set(this._options.localStorage.key, this.traits());
  return true;
};


/**
 * Log the entity out, reseting `id` and `traits` to defaults.
 */

Entity.prototype.logout = function() {
  this.id(null);
  this.traits({});
  cookie.remove(this._options.cookie.key);
  store.remove(this._options.localStorage.key);
};


/**
 * Reset all entity state, logging out and returning options to defaults.
 */

Entity.prototype.reset = function() {
  this.logout();
  this.options({});
};


/**
 * Load saved entity `id` or `traits` from storage.
 */

Entity.prototype.load = function() {
  this.id(cookie.get(this._options.cookie.key));
  this.traits(store.get(this._options.localStorage.key));
};



/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

/**
 * Copy the properties of one or more `objects` onto a destination object. Input objects are iterated over
 * in left-to-right order, so duplicate properties on later objects will overwrite those from
 * erevious ones. Only enumerable and own properties of the input objects are copied onto the
 * resulting object.
 *
 * @name extend
 * @api public
 * @category Object
 * @param {Object} dest The destination object.
 * @param {...Object} sources The source objects.
 * @return {Object} `dest`, extended with the properties of all `sources`.
 * @example
 * var a = { a: 'a' };
 * var b = { b: 'b' };
 * var c = { c: 'c' };
 *
 * extend(a, b, c);
 * //=> { a: 'a', b: 'b', c: 'c' };
 */
var extend = function extend(dest /*, sources */) {
  var sources = Array.prototype.slice.call(arguments, 1);

  for (var i = 0; i < sources.length; i += 1) {
    for (var key in sources[i]) {
      if (has.call(sources[i], key)) {
        dest[key] = sources[i][key];
      }
    }
  }

  return dest;
};

/*
 * Exports.
 */

module.exports = extend;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Module Dependencies.
 */

var bindAll = __webpack_require__(8);
var clone = __webpack_require__(7);

/**
 * HOP.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Expose `Memory`
 */

module.exports = bindAll(new Memory());

/**
 * Initialize `Memory` store
 */

function Memory() {
  this.store = {};
}

/**
 * Set a `key` and `value`.
 *
 * @param {String} key
 * @param {Mixed} value
 * @return {Boolean}
 */

Memory.prototype.set = function(key, value) {
  this.store[key] = clone(value);
  return true;
};

/**
 * Get a `key`.
 *
 * @param {String} key
 */

Memory.prototype.get = function(key) {
  if (!has.call(this.store, key)) return;
  return clone(this.store[key]);
};

/**
 * Remove a `key`.
 *
 * @param {String} key
 * @return {Boolean}
 */

Memory.prototype.remove = function(key) {
  delete this.store[key];
  return true;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Module dependencies.
 */

var bindAll = __webpack_require__(8);
var defaults = __webpack_require__(3);
var store = __webpack_require__(65);

/**
 * Initialize a new `Store` with `options`.
 *
 * @param {Object} options
 */

function Store(options) {
  this.options(options);
}

/**
 * Set the `options` for the store.
 *
 * @param {Object} options
 *   @field {Boolean} enabled (true)
 */

Store.prototype.options = function(options) {
  if (arguments.length === 0) return this._options;

  options = options || {};
  defaults(options, { enabled: true });

  this.enabled = options.enabled && store.enabled;
  this._options = options;
};


/**
 * Set a `key` and `value` in local storage.
 *
 * @param {string} key
 * @param {Object} value
 */

Store.prototype.set = function(key, value) {
  if (!this.enabled) return false;
  return store.set(key, value);
};


/**
 * Get a value from local storage by `key`.
 *
 * @param {string} key
 * @return {Object}
 */

Store.prototype.get = function(key) {
  if (!this.enabled) return null;
  return store.get(key);
};


/**
 * Remove a value from local storage by `key`.
 *
 * @param {string} key
 */

Store.prototype.remove = function(key) {
  if (!this.enabled) return false;
  return store.remove(key);
};


/**
 * Expose the store singleton.
 */

module.exports = bindAll(new Store());


/**
 * Expose the `Store` constructor.
 */

module.exports.Store = Store;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Module dependencies.
 */

var each = __webpack_require__(1);

/**
 * Produce a new array by passing each value in the input `collection` through a transformative
 * `iterator` function. The `iterator` function is passed three arguments:
 * `(value, index, collection)`.
 *
 * @name map
 * @api public
 * @param {Function} iterator The transformer function to invoke per iteration.
 * @param {Array} collection The collection to iterate over.
 * @return {Array} A new array containing the results of each `iterator` invocation.
 * @example
 * var square = function(x) { return x * x; };
 *
 * map(square, [1, 2, 3]);
 * //=> [1, 4, 9]
 */
var map = function map(iterator, collection) {
  if (typeof iterator !== 'function') {
    throw new TypeError('Expected a function but received a ' + typeof iterator);
  }

  var result = [];

  each(function(val, i, collection) {
    result.push(iterator(val, i, collection));
  }, collection);

  return result;
};

/*
 * Exports.
 */

module.exports = map;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 43 */
/***/ (function(module, exports) {


// https://github.com/thirdpartyjs/thirdpartyjs-code/blob/master/examples/templates/02/loading-files/index.html

/**
 * Invoke `fn(err)` when the given `el` script loads.
 *
 * @param {Element} el
 * @param {Function} fn
 * @api public
 */

module.exports = function(el, fn){
  return el.addEventListener
    ? add(el, fn)
    : attach(el, fn);
};

/**
 * Add event listener to `el`, `fn()`.
 *
 * @param {Element} el
 * @param {Function} fn
 * @api private
 */

function add(el, fn){
  el.addEventListener('load', function(_, e){ fn(null, e); }, false);
  el.addEventListener('error', function(e){
    var err = new Error('script error "' + el.src + '"');
    err.event = e;
    fn(err);
  }, false);
}

/**
 * Attach event.
 *
 * @param {Element} el
 * @param {Function} fn
 * @api private
 */

function attach(el, fn){
  el.attachEvent('onreadystatechange', function(e){
    if (!/complete|loaded/.test(el.readyState)) return;
    fn(null, e);
  });
  el.attachEvent('onerror', function(e){
    var err = new Error('failed to load the script "' + el.src + '"');
    err.event = e || window.event;
    fn(err);
  });
}


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(45);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/*
import { init } from 'analyticsjs';
import { config } from './analytics-config'

init(config);
*/

var analytics = __webpack_require__(46);
var analyticsConfig = __webpack_require__(82);

analytics.init(analyticsConfig.config);


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {


var Analytics = __webpack_require__(47);
var AnalyticsActions = __webpack_require__(81);

module.exports = {
    init: function(conf) {

        var analytics = Analytics.create(conf);
        var analyticsActions = AnalyticsActions.createActions(analytics)

        function arrayToPushAnalytics(arr) {
            var arrayLength = arr.length;
            var currentItem = null;

            while(arrayLength > 0) {

                currentItem = arr.pop();
        
                analyticsActions.forEach(function(action){
                    if(currentItem.type == action.type){
                        action.push(currentItem.data); 
                    }
                })

                arrayLength --;
            }
        }

        window.AnalyticsArray = function(arr) {
            var array = arr || [];
            array.push = function(){
                Array.prototype.push.apply(this, arguments);
                arrayToPushAnalytics(this);
                
                return true;
            }
    
            return array;
        };

        window.initAnalytics = function(arr) {
            arrayToPushAnalytics(arr)
        }
    }
} 




/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var analytics = __webpack_require__(48);

module.exports = {
    create: function (integrations) {
        var initializeObj = {};

        integrations.forEach(function(config){
          analytics.use(config.package);
          initializeObj[config.name] = config.settings;
        })

        analytics.initialize(initializeObj);

        return analytics;
    }

}


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Analytics.js
 *
 * (C) 2013-2016 Segment.io Inc.
 */

var Analytics = __webpack_require__(49);

// Create a new `analytics` singleton.
var analytics = new Analytics();

// Expose package version.
analytics.VERSION = __webpack_require__(80).version;

/*
 * Exports.
 */

module.exports = analytics;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _analytics = global.analytics;

/*
 * Module dependencies.
 */

var Alias = __webpack_require__(5).Alias;
var Emitter = __webpack_require__(18);
var Group = __webpack_require__(5).Group;
var Identify = __webpack_require__(5).Identify;
var Page = __webpack_require__(5).Page;
var Track = __webpack_require__(5).Track;
var after = __webpack_require__(32);
var bindAll = __webpack_require__(8);
var clone = __webpack_require__(7);
var cookie = __webpack_require__(19);
var debug = __webpack_require__(2);
var defaults = __webpack_require__(3);
var each = __webpack_require__(1);
var foldl = __webpack_require__(21);
var group = __webpack_require__(64);
var is = __webpack_require__(11);
var isMeta = __webpack_require__(66);
var keys = __webpack_require__(36);
var memory = __webpack_require__(39);
var nextTick = __webpack_require__(13);
var normalize = __webpack_require__(69);
var on = __webpack_require__(70).bind;
var pageDefaults = __webpack_require__(71);
var pick = __webpack_require__(73);
var prevent = __webpack_require__(74);
var querystring = __webpack_require__(75);
var store = __webpack_require__(40);
var user = __webpack_require__(77);
var type = __webpack_require__(10);

/**
 * Initialize a new `Analytics` instance.
 */

function Analytics() {
  this._options({});
  this.Integrations = {};
  this._integrations = {};
  this._readied = false;
  this._timeout = 300;
  // XXX: BACKWARDS COMPATIBILITY
  this._user = user;
  this.log = debug('analytics.js');
  bindAll(this);

  var self = this;
  this.on('initialize', function(settings, options) {
    if (options.initialPageview) self.page();
    self._parseQuery(window.location.search);
  });
}

/**
 * Mix in event emitter.
 */

Emitter(Analytics.prototype);

/**
 * Use a `plugin`.
 *
 * @param {Function} plugin
 * @return {Analytics}
 */

Analytics.prototype.use = function(plugin) {
  plugin(this);
  return this;
};

/**
 * Define a new `Integration`.
 *
 * @param {Function} Integration
 * @return {Analytics}
 */

Analytics.prototype.addIntegration = function(Integration) {
  var name = Integration.prototype.name;
  if (!name) throw new TypeError('attempted to add an invalid integration');
  this.Integrations[name] = Integration;
  return this;
};

/**
 * Initialize with the given integration `settings` and `options`.
 *
 * Aliased to `init` for convenience.
 *
 * @param {Object} [settings={}]
 * @param {Object} [options={}]
 * @return {Analytics}
 */

Analytics.prototype.init = Analytics.prototype.initialize = function(settings, options) {
  settings = settings || {};
  options = options || {};

  this._options(options);
  this._readied = false;

  // clean unknown integrations from settings
  var self = this;
  each(function(opts, name) {
    var Integration = self.Integrations[name];
    if (!Integration) delete settings[name];
  }, settings);

  // add integrations
  each(function(opts, name) {
    var Integration = self.Integrations[name];
    var integration = new Integration(clone(opts));
    self.log('initialize %o - %o', name, opts);
    self.add(integration);
  }, settings);

  var integrations = this._integrations;

  // load user now that options are set
  user.load();
  group.load();

  // make ready callback
  var integrationCount = keys(integrations).length;
  var ready = after(integrationCount, function() {
    self._readied = true;
    self.emit('ready');
  });

  // init if no integrations
  if (integrationCount <= 0) {
    ready();
  }

  // initialize integrations, passing ready
  each(function(integration) {
    if (options.initialPageview && integration.options.initialPageview === false) {
      integration.page = after(2, integration.page);
    }

    integration.analytics = self;
    integration.once('ready', ready);
    integration.initialize();
  }, integrations);

  // backwards compat with angular plugin.
  // TODO: remove
  this.initialized = true;

  this.emit('initialize', settings, options);
  return this;
};

/**
 * Set the user's `id`.
 *
 * @param {Mixed} id
 */

Analytics.prototype.setAnonymousId = function(id) {
  this.user().anonymousId(id);
  return this;
};

/**
 * Add an integration.
 *
 * @param {Integration} integration
 */

Analytics.prototype.add = function(integration) {
  this._integrations[integration.name] = integration;
  return this;
};

/**
 * Identify a user by optional `id` and `traits`.
 *
 * @param {string} [id=user.id()] User ID.
 * @param {Object} [traits=null] User traits.
 * @param {Object} [options=null]
 * @param {Function} [fn]
 * @return {Analytics}
 */

Analytics.prototype.identify = function(id, traits, options, fn) {
  // Argument reshuffling.
  /* eslint-disable no-unused-expressions, no-sequences */
  if (is.fn(options)) fn = options, options = null;
  if (is.fn(traits)) fn = traits, options = null, traits = null;
  if (is.object(id)) options = traits, traits = id, id = user.id();
  /* eslint-enable no-unused-expressions, no-sequences */

  // clone traits before we manipulate so we don't do anything uncouth, and take
  // from `user` so that we carryover anonymous traits
  user.identify(id, traits);

  var msg = this.normalize({
    options: options,
    traits: user.traits(),
    userId: user.id()
  });

  this._invoke('identify', new Identify(msg));

  // emit
  this.emit('identify', id, traits, options);
  this._callback(fn);
  return this;
};

/**
 * Return the current user.
 *
 * @return {Object}
 */

Analytics.prototype.user = function() {
  return user;
};

/**
 * Identify a group by optional `id` and `traits`. Or, if no arguments are
 * supplied, return the current group.
 *
 * @param {string} [id=group.id()] Group ID.
 * @param {Object} [traits=null] Group traits.
 * @param {Object} [options=null]
 * @param {Function} [fn]
 * @return {Analytics|Object}
 */

Analytics.prototype.group = function(id, traits, options, fn) {
  /* eslint-disable no-unused-expressions, no-sequences */
  if (!arguments.length) return group;
  if (is.fn(options)) fn = options, options = null;
  if (is.fn(traits)) fn = traits, options = null, traits = null;
  if (is.object(id)) options = traits, traits = id, id = group.id();
  /* eslint-enable no-unused-expressions, no-sequences */


  // grab from group again to make sure we're taking from the source
  group.identify(id, traits);

  var msg = this.normalize({
    options: options,
    traits: group.traits(),
    groupId: group.id()
  });

  this._invoke('group', new Group(msg));

  this.emit('group', id, traits, options);
  this._callback(fn);
  return this;
};

/**
 * Track an `event` that a user has triggered with optional `properties`.
 *
 * @param {string} event
 * @param {Object} [properties=null]
 * @param {Object} [options=null]
 * @param {Function} [fn]
 * @return {Analytics}
 */

Analytics.prototype.track = function(event, properties, options, fn) {
  // Argument reshuffling.
  /* eslint-disable no-unused-expressions, no-sequences */
  if (is.fn(options)) fn = options, options = null;
  if (is.fn(properties)) fn = properties, options = null, properties = null;
  /* eslint-enable no-unused-expressions, no-sequences */

  // figure out if the event is archived.
  var plan = this.options.plan || {};
  var events = plan.track || {};

  // normalize
  var msg = this.normalize({
    properties: properties,
    options: options,
    event: event
  });

  // plan.
  plan = events[event];
  if (plan) {
    this.log('plan %o - %o', event, plan);
    if (plan.enabled === false) return this._callback(fn);
    defaults(msg.integrations, plan.integrations || {});
  }

  this._invoke('track', new Track(msg));

  this.emit('track', event, properties, options);
  this._callback(fn);
  return this;
};

/**
 * Helper method to track an outbound link that would normally navigate away
 * from the page before the analytics calls were sent.
 *
 * BACKWARDS COMPATIBILITY: aliased to `trackClick`.
 *
 * @param {Element|Array} links
 * @param {string|Function} event
 * @param {Object|Function} properties (optional)
 * @return {Analytics}
 */

Analytics.prototype.trackClick = Analytics.prototype.trackLink = function(links, event, properties) {
  if (!links) return this;
  // always arrays, handles jquery
  if (type(links) === 'element') links = [links];

  var self = this;
  each(function(el) {
    if (type(el) !== 'element') {
      throw new TypeError('Must pass HTMLElement to `analytics.trackLink`.');
    }
    on(el, 'click', function(e) {
      var ev = is.fn(event) ? event(el) : event;
      var props = is.fn(properties) ? properties(el) : properties;
      var href = el.getAttribute('href')
        || el.getAttributeNS('http://www.w3.org/1999/xlink', 'href')
        || el.getAttribute('xlink:href');

      self.track(ev, props);

      if (href && el.target !== '_blank' && !isMeta(e)) {
        prevent(e);
        self._callback(function() {
          window.location.href = href;
        });
      }
    });
  }, links);

  return this;
};

/**
 * Helper method to track an outbound form that would normally navigate away
 * from the page before the analytics calls were sent.
 *
 * BACKWARDS COMPATIBILITY: aliased to `trackSubmit`.
 *
 * @param {Element|Array} forms
 * @param {string|Function} event
 * @param {Object|Function} properties (optional)
 * @return {Analytics}
 */

Analytics.prototype.trackSubmit = Analytics.prototype.trackForm = function(forms, event, properties) {
  if (!forms) return this;
  // always arrays, handles jquery
  if (type(forms) === 'element') forms = [forms];

  var self = this;
  each(function(el) {
    if (type(el) !== 'element') throw new TypeError('Must pass HTMLElement to `analytics.trackForm`.');
    function handler(e) {
      prevent(e);

      var ev = is.fn(event) ? event(el) : event;
      var props = is.fn(properties) ? properties(el) : properties;
      self.track(ev, props);

      self._callback(function() {
        el.submit();
      });
    }

    // Support the events happening through jQuery or Zepto instead of through
    // the normal DOM API, because `el.submit` doesn't bubble up events...
    var $ = window.jQuery || window.Zepto;
    if ($) {
      $(el).submit(handler);
    } else {
      on(el, 'submit', handler);
    }
  }, forms);

  return this;
};

/**
 * Trigger a pageview, labeling the current page with an optional `category`,
 * `name` and `properties`.
 *
 * @param {string} [category]
 * @param {string} [name]
 * @param {Object|string} [properties] (or path)
 * @param {Object} [options]
 * @param {Function} [fn]
 * @return {Analytics}
 */

Analytics.prototype.page = function(category, name, properties, options, fn) {
  // Argument reshuffling.
  /* eslint-disable no-unused-expressions, no-sequences */
  if (is.fn(options)) fn = options, options = null;
  if (is.fn(properties)) fn = properties, options = properties = null;
  if (is.fn(name)) fn = name, options = properties = name = null;
  if (type(category) === 'object') options = name, properties = category, name = category = null;
  if (type(name) === 'object') options = properties, properties = name, name = null;
  if (type(category) === 'string' && type(name) !== 'string') name = category, category = null;
  /* eslint-enable no-unused-expressions, no-sequences */

  properties = clone(properties) || {};
  if (name) properties.name = name;
  if (category) properties.category = category;

  // Ensure properties has baseline spec properties.
  // TODO: Eventually move these entirely to `options.context.page`
  var defs = pageDefaults();
  defaults(properties, defs);

  // Mirror user overrides to `options.context.page` (but exclude custom properties)
  // (Any page defaults get applied in `this.normalize` for consistency.)
  // Weird, yeah--moving special props to `context.page` will fix this in the long term.
  var overrides = pick(keys(defs), properties);
  if (!is.empty(overrides)) {
    options = options || {};
    options.context = options.context || {};
    options.context.page = overrides;
  }

  var msg = this.normalize({
    properties: properties,
    category: category,
    options: options,
    name: name
  });

  this._invoke('page', new Page(msg));

  this.emit('page', category, name, properties, options);
  this._callback(fn);
  return this;
};

/**
 * FIXME: BACKWARDS COMPATIBILITY: convert an old `pageview` to a `page` call.
 *
 * @param {string} [url]
 * @return {Analytics}
 * @api private
 */

Analytics.prototype.pageview = function(url) {
  var properties = {};
  if (url) properties.path = url;
  this.page(properties);
  return this;
};

/**
 * Merge two previously unassociated user identities.
 *
 * @param {string} to
 * @param {string} from (optional)
 * @param {Object} options (optional)
 * @param {Function} fn (optional)
 * @return {Analytics}
 */

Analytics.prototype.alias = function(to, from, options, fn) {
  // Argument reshuffling.
  /* eslint-disable no-unused-expressions, no-sequences */
  if (is.fn(options)) fn = options, options = null;
  if (is.fn(from)) fn = from, options = null, from = null;
  if (is.object(from)) options = from, from = null;
  /* eslint-enable no-unused-expressions, no-sequences */

  var msg = this.normalize({
    options: options,
    previousId: from,
    userId: to
  });

  this._invoke('alias', new Alias(msg));

  this.emit('alias', to, from, options);
  this._callback(fn);
  return this;
};

/**
 * Register a `fn` to be fired when all the analytics services are ready.
 *
 * @param {Function} fn
 * @return {Analytics}
 */

Analytics.prototype.ready = function(fn) {
  if (is.fn(fn)) {
    if (this._readied) {
      nextTick(fn);
    } else {
      this.once('ready', fn);
    }
  }
  return this;
};

/**
 * Set the `timeout` (in milliseconds) used for callbacks.
 *
 * @param {Number} timeout
 */

Analytics.prototype.timeout = function(timeout) {
  this._timeout = timeout;
};

/**
 * Enable or disable debug.
 *
 * @param {string|boolean} str
 */

Analytics.prototype.debug = function(str) {
  if (!arguments.length || str) {
    debug.enable('analytics:' + (str || '*'));
  } else {
    debug.disable();
  }
};

/**
 * Apply options.
 *
 * @param {Object} options
 * @return {Analytics}
 * @api private
 */

Analytics.prototype._options = function(options) {
  options = options || {};
  this.options = options;
  cookie.options(options.cookie);
  store.options(options.localStorage);
  user.options(options.user);
  group.options(options.group);
  return this;
};

/**
 * Callback a `fn` after our defined timeout period.
 *
 * @param {Function} fn
 * @return {Analytics}
 * @api private
 */

Analytics.prototype._callback = function(fn) {
  if (is.fn(fn)) {
    this._timeout ? setTimeout(fn, this._timeout) : nextTick(fn);
  }
  return this;
};

/**
 * Call `method` with `facade` on all enabled integrations.
 *
 * @param {string} method
 * @param {Facade} facade
 * @return {Analytics}
 * @api private
 */

Analytics.prototype._invoke = function(method, facade) {
  this.emit('invoke', facade);

  each(function(integration, name) {
    if (!facade.enabled(name)) return;
    integration.invoke.call(integration, method, facade);
  }, this._integrations);

  return this;
};

/**
 * Push `args`.
 *
 * @param {Array} args
 * @api private
 */

Analytics.prototype.push = function(args) {
  var method = args.shift();
  if (!this[method]) return;
  this[method].apply(this, args);
};

/**
 * Reset group and user traits and id's.
 *
 * @api public
 */

Analytics.prototype.reset = function() {
  this.user().logout();
  this.group().logout();
};

/**
 * Parse the query string for callable methods.
 *
 * @param {String} query
 * @return {Analytics}
 * @api private
 */

Analytics.prototype._parseQuery = function(query) {
  // Parse querystring to an object
  var q = querystring.parse(query);
  // Create traits and properties objects, populate from querysting params
  var traits = pickPrefix('ajs_trait_', q);
  var props = pickPrefix('ajs_prop_', q);
  // Trigger based on callable parameters in the URL
  if (q.ajs_uid) this.identify(q.ajs_uid, traits);
  if (q.ajs_event) this.track(q.ajs_event, props);
  if (q.ajs_aid) user.anonymousId(q.ajs_aid);
  return this;

  /**
   * Create a shallow copy of an input object containing only the properties
   * whose keys are specified by a prefix, stripped of that prefix
   *
   * @param {String} prefix
   * @param {Object} object
   * @return {Object}
   * @api private
   */

  function pickPrefix(prefix, object) {
    var length = prefix.length;
    var sub;
    return foldl(function(acc, val, key) {
      if (key.substr(0, length) === prefix) {
        sub = key.substr(length);
        acc[sub] = val;
      }
      return acc;
    }, {}, object);
  }
};

/**
 * Normalize the given `msg`.
 *
 * @param {Object} msg
 * @return {Object}
 */

Analytics.prototype.normalize = function(msg) {
  msg = normalize(msg, keys(this._integrations));
  if (msg.anonymousId) user.anonymousId(msg.anonymousId);
  msg.anonymousId = user.anonymousId();

  // Ensure all outgoing requests include page data in their contexts.
  msg.context.page = defaults(msg.context.page || {}, pageDefaults());

  return msg;
};

/**
 * No conflict support.
 */

Analytics.prototype.noConflict = function() {
  window.analytics = _analytics;
  return this;
};

/*
 * Exports.
 */

module.exports = Analytics;
module.exports.cookie = cookie;
module.exports.memory = memory;
module.exports.store = store;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var get = __webpack_require__(9);

/**
 * Add address getters to `proto`.
 *
 * @param {Function} proto
 */
module.exports = function(proto) {
  proto.zip = trait('postalCode', 'zip');
  proto.country = trait('country');
  proto.street = trait('street');
  proto.state = trait('state');
  proto.city = trait('city');
  proto.region = trait('region');

  function trait(a, b) {
    return function() {
      var traits = this.traits();
      var props = this.properties ? this.properties() : {};

      return get(traits, 'address.' + a)
        || get(traits, a)
        || (b ? get(traits, 'address.' + b) : null)
        || (b ? get(traits, b) : null)
        || get(props, 'address.' + a)
        || get(props, a)
        || (b ? get(props, 'address.' + b) : null)
        || (b ? get(props, b) : null);
    };
  }
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A few integrations are disabled by default. They must be explicitly
 * enabled by setting options[Provider] = true.
 */

var disabled = {
  Salesforce: true
};

/**
 * Check whether an integration should be enabled by default.
 *
 * @param {string} integration
 * @return {boolean}
 */

module.exports = function(integration) {
  return !disabled[integration];
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Matcher.
 */

var matcher = /\d{13}/;


/**
 * Check whether a string is a millisecond date string.
 *
 * @param {string} string
 * @return {boolean}
 */
exports.is = function(string) {
  return matcher.test(string);
};


/**
 * Convert a millisecond string to a date.
 *
 * @param {string} millis
 * @return {Date}
 */
exports.parse = function(millis) {
  millis = parseInt(millis, 10);
  return new Date(millis);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Matcher.
 */

var matcher = /\d{10}/;


/**
 * Check whether a string is a second date string.
 *
 * @param {string} string
 * @return {Boolean}
 */
exports.is = function(string) {
  return matcher.test(string);
};


/**
 * Convert a second string to a date.
 *
 * @param {string} seconds
 * @return {Date}
 */
exports.parse = function(seconds) {
  var millis = parseInt(seconds, 10) * 1000;
  return new Date(millis);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module Dependencies
 */

var expr;
try {
  expr = __webpack_require__(28);
} catch(e) {
  expr = __webpack_require__(28);
}

/**
 * Expose `toFunction()`.
 */

module.exports = toFunction;

/**
 * Convert `obj` to a `Function`.
 *
 * @param {Mixed} obj
 * @return {Function}
 * @api private
 */

function toFunction(obj) {
  switch ({}.toString.call(obj)) {
    case '[object Object]':
      return objectToFunction(obj);
    case '[object Function]':
      return obj;
    case '[object String]':
      return stringToFunction(obj);
    case '[object RegExp]':
      return regexpToFunction(obj);
    default:
      return defaultToFunction(obj);
  }
}

/**
 * Default to strict equality.
 *
 * @param {Mixed} val
 * @return {Function}
 * @api private
 */

function defaultToFunction(val) {
  return function(obj){
    return val === obj;
  };
}

/**
 * Convert `re` to a function.
 *
 * @param {RegExp} re
 * @return {Function}
 * @api private
 */

function regexpToFunction(re) {
  return function(obj){
    return re.test(obj);
  };
}

/**
 * Convert property `str` to a function.
 *
 * @param {String} str
 * @return {Function}
 * @api private
 */

function stringToFunction(str) {
  // immediate such as "> 20"
  if (/^ *\W+/.test(str)) return new Function('_', 'return _ ' + str);

  // properties such as "name.first" or "age > 18" or "age > 18 && age < 36"
  return new Function('_', 'return ' + get(str));
}

/**
 * Convert `object` to a function.
 *
 * @param {Object} object
 * @return {Function}
 * @api private
 */

function objectToFunction(obj) {
  var match = {};
  for (var key in obj) {
    match[key] = typeof obj[key] === 'string'
      ? defaultToFunction(obj[key])
      : toFunction(obj[key]);
  }
  return function(val){
    if (typeof val !== 'object') return false;
    for (var key in match) {
      if (!(key in val)) return false;
      if (!match[key](val[key])) return false;
    }
    return true;
  };
}

/**
 * Built the getter function. Supports getter style functions
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function get(str) {
  var props = expr(str);
  if (!props.length) return '_.' + str;

  var val, i, prop;
  for (i = 0; i < props.length; i++) {
    prop = props[i];
    val = '_.' + prop;
    val = "('function' == typeof " + val + " ? " + val + "() : " + val + ")";

    // mimic negative lookbehind to avoid problems with nested properties
    str = stripNested(prop, str, val);
  }

  return str;
}

/**
 * Mimic negative lookbehind to avoid problems with nested properties.
 *
 * See: http://blog.stevenlevithan.com/archives/mimic-lookbehind-javascript
 *
 * @param {String} prop
 * @param {String} str
 * @param {String} val
 * @return {String}
 * @api private
 */

function stripNested (prop, str, val) {
  return str.replace(new RegExp('(\\.)?' + prop, 'g'), function($0, $1) {
    return $1 ? $0 : val;
  });
}


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var inherit = __webpack_require__(0).inherit;
var Facade = __webpack_require__(6);

/**
 * Initialize a new `Alias` facade with a `dictionary` of arguments.
 *
 * @param {Object} dictionary
 *   @property {string} from
 *   @property {string} to
 *   @property {Object} options
 * @param {Object} opts
 *   @property {boolean|undefined} clone
 */
function Alias(dictionary, opts) {
  Facade.call(this, dictionary, opts);
}

/**
 * Inherit from `Facade`.
 */

inherit(Alias, Facade);

/**
 * Return type of facade.
 *
 * @return {string}
 */
Alias.prototype.action = function() {
  return 'alias';
};

Alias.prototype.type = Alias.prototype.action;

/**
 * Get `previousId`.
 *
 * @api public
 * @return {*}
 */
Alias.prototype.previousId = function() {
  return this.field('previousId') || this.field('from');
};

Alias.prototype.from = Alias.prototype.previousId;

/**
 * Get `userId`.
 *
 * @api public
 * @return {string}
 */
Alias.prototype.userId = function() {
  return this.field('userId') || this.field('to');
};

Alias.prototype.to = Alias.prototype.userId;

/**
 * Exports.
 */

module.exports = Alias;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var inherit = __webpack_require__(0).inherit;
var isEmail = __webpack_require__(12);
var newDate = __webpack_require__(16);
var Facade = __webpack_require__(6);

/**
 * Initialize a new `Group` facade with a `dictionary` of arguments.
 *
 * @param {Object} dictionary
 *   @param {string} userId
 *   @param {string} groupId
 *   @param {Object} properties
 *   @param {Object} options
 * @param {Object} opts
 *   @property {boolean|undefined} clone
 */
function Group(dictionary, opts) {
  Facade.call(this, dictionary, opts);
}

/**
 * Inherit from `Facade`
 */

inherit(Group, Facade);

/**
 * Get the facade's action.
 */
Group.prototype.action = function() {
  return 'group';
};

Group.prototype.type = Group.prototype.action;

/**
 * Setup some basic proxies.
 */
Group.prototype.groupId = Facade.field('groupId');

/**
 * Get created or createdAt.
 *
 * @return {Date}
 */
Group.prototype.created = function() {
  var created = this.proxy('traits.createdAt')
    || this.proxy('traits.created')
    || this.proxy('properties.createdAt')
    || this.proxy('properties.created');

  if (created) return newDate(created);
};

/**
 * Get the group's email, falling back to the group ID if it's a valid email.
 *
 * @return {string}
 */
Group.prototype.email = function() {
  var email = this.proxy('traits.email');
  if (email) return email;
  var groupId = this.groupId();
  if (isEmail(groupId)) return groupId;
};

/**
 * Get the group's traits.
 *
 * @param {Object} aliases
 * @return {Object}
 */
Group.prototype.traits = function(aliases) {
  var ret = this.properties();
  var id = this.groupId();
  aliases = aliases || {};

  if (id) ret.id = id;

  for (var alias in aliases) {
    var value = this[alias] == null ? this.proxy('traits.' + alias) : this[alias]();
    if (value == null) continue;
    ret[aliases[alias]] = value;
    delete ret[alias];
  }

  return ret;
};

/**
 * Special traits.
 */

Group.prototype.name = Facade.proxy('traits.name');
Group.prototype.industry = Facade.proxy('traits.industry');
Group.prototype.employees = Facade.proxy('traits.employees');

/**
 * Get traits or properties.
 *
 * TODO: remove me
 *
 * @return {Object}
 */
Group.prototype.properties = function() {
  return this.field('traits') || this.field('properties') || {};
};

/**
 * Exports.
 */

module.exports = Group;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherit = __webpack_require__(0).inherit;
var Page = __webpack_require__(31);
var Track = __webpack_require__(17);

/**
 * Initialize new `Screen` facade with `dictionary`.
 *
 * @param {Object} dictionary
 *   @param {string} category
 *   @param {string} name
 *   @param {Object} traits
 *   @param {Object} options
 * @param {Object} opts
 *   @property {boolean|undefined} clone
 */
function Screen(dictionary, opts) {
  Page.call(this, dictionary, opts);
}

/**
 * Inherit from `Page`
 */

inherit(Screen, Page);

/**
 * Get the facade's action.
 *
 * @api public
 * @return {string}
 */
Screen.prototype.action = function() {
  return 'screen';
};

Screen.prototype.type = Screen.prototype.action;

/**
 * Get event with `name`.
 *
 * @api public
 * @param {string} name
 * @return {string}
 */
Screen.prototype.event = function(name) {
  return name ? 'Viewed ' + name + ' Screen' : 'Loaded a Screen';
};

/**
 * Convert this Screen.
 *
 * @api public
 * @param {string} name
 * @return {Track}
 */
Screen.prototype.track = function(name) {
  var json = this.json();
  json.event = this.event(name);
  json.timestamp = this.timestamp();
  json.properties = this.properties();
  return new Track(json, this.opts);
};

/**
 * Exports.
 */

module.exports = Screen;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objToString = Object.prototype.toString;

/**
 * Determine if a value is a function.
 *
 * @param {*} val
 * @return {boolean}
 */
// TODO: Move to lib
var isFunction = function(val) {
  return typeof val === 'function';
};

/**
 * Determine if a value is a number.
 *
 * @param {*} val
 * @return {boolean}
 */
// TODO: Move to lib
var isNumber = function(val) {
  var type = typeof val;
  return type === 'number' || (type === 'object' && objToString.call(val) === '[object Number]');
};

 /**
  * Creates an array of generic, numbered argument names.
  *
  * @name createParams
  * @api private
  * @param {number} n
  * @return {Array}
  * @example
  * argNames(2);
  * //=> ['arg1', 'arg2']
  */
var createParams = function createParams(n) {
  var args = [];

  for (var i = 1; i <= n; i += 1) {
    args.push('arg' + i);
  }

  return args;
};

 /**
  * Dynamically construct a wrapper function of `n` arity that.
  *
  * If at all possible, prefer a function from the arity wrapper cache above to
  * avoid allocating a new function at runtime.
  *
  * @name createArityWrapper
  * @api private
  * @param {number} n
  * @return {Function(Function)}
  */
var createArityWrapper = function createArityWrapper(n) {
  var paramNames = createParams(n).join(', ');
  var wrapperBody = ''.concat(
    '  return function(', paramNames, ') {\n',
    '    return func.apply(this, arguments);\n',
    '  };'
  );

  /* eslint-disable no-new-func */
  return new Function('func', wrapperBody);
  /* eslint-enable no-new-func */
};

// Cache common arity wrappers to avoid constructing them at runtime
var arityWrapperCache = [
  /* eslint-disable no-unused-vars */
  function(fn) {
    return function() {
      return fn.apply(this, arguments);
    };
  },

  function(fn) {
    return function(arg1) {
      return fn.apply(this, arguments);
    };
  },

  function(fn) {
    return function(arg1, arg2) {
      return fn.apply(this, arguments);
    };
  },

  function(fn) {
    return function(arg1, arg2, arg3) {
      return fn.apply(this, arguments);
    };
  },

  function(fn) {
    return function(arg1, arg2, arg3, arg4) {
      return fn.apply(this, arguments);
    };
  },

  function(fn) {
    return function(arg1, arg2, arg3, arg4, arg5) {
      return fn.apply(this, arguments);
    };
  }
  /* eslint-enable no-unused-vars */
];

/**
 * Takes a function and an [arity](https://en.wikipedia.org/wiki/Arity) `n`, and returns a new
 * function that expects `n` arguments.
 *
 * @name arity
 * @api public
 * @category Function
 * @see {@link curry}
 * @param {Number} n The desired arity of the returned function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A function of n arity, wrapping `fn`.
 * @example
 * var add = function(a, b) {
 *   return a + b;
 * };
 *
 * // Check the number of arguments this function expects by accessing `.length`:
 * add.length;
 * //=> 2
 *
 * var unaryAdd = arity(1, add);
 * unaryAdd.length;
 * //=> 1
 */
var arity = function arity(n, func) {
  if (!isFunction(func)) {
    throw new TypeError('Expected a function but got ' + typeof func);
  }

  n = Math.max(isNumber(n) ? n : 0, 0);

  if (!arityWrapperCache[n]) {
    arityWrapperCache[n] = createArityWrapper(n);
  }

  return arityWrapperCache[n](func);
};

/*
 * Exports.
 */

module.exports = arity;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var max = Math.max;

/**
 * Produce a new array composed of all but the first `n` elements of an input `collection`.
 *
 * @name drop
 * @api public
 * @param {number} count The number of elements to drop.
 * @param {Array} collection The collection to iterate over.
 * @return {Array} A new array containing all but the first element from `collection`.
 * @example
 * drop(0, [1, 2, 3]); // => [1, 2, 3]
 * drop(1, [1, 2, 3]); // => [2, 3]
 * drop(2, [1, 2, 3]); // => [3]
 * drop(3, [1, 2, 3]); // => []
 * drop(4, [1, 2, 3]); // => []
 */
var drop = function drop(count, collection) {
  var length = collection ? collection.length : 0;

  if (!length) {
    return [];
  }

  // Preallocating an array *significantly* boosts performance when dealing with
  // `arguments` objects on v8. For a summary, see:
  // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
  var toDrop = max(Number(count) || 0, 0);
  var resultsLength = max(length - toDrop, 0);
  var results = new Array(resultsLength);

  for (var i = 0; i < resultsLength; i += 1) {
    results[i] = collection[i + toDrop];
  }

  return results;
};

/*
 * Exports.
 */

module.exports = drop;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var max = Math.max;

/**
 * Produce a new array by passing each value in the input `collection` through a transformative
 * `iterator` function. The `iterator` function is passed three arguments:
 * `(value, index, collection)`.
 *
 * @name rest
 * @api public
 * @param {Array} collection The collection to iterate over.
 * @return {Array} A new array containing all but the first element from `collection`.
 * @example
 * rest([1, 2, 3]); // => [2, 3]
 */
var rest = function rest(collection) {
  if (collection == null || !collection.length) {
    return [];
  }

  // Preallocating an array *significantly* boosts performance when dealing with
  // `arguments` objects on v8. For a summary, see:
  // https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
  var results = new Array(max(collection.length - 2, 0));

  for (var i = 1; i < collection.length; i += 1) {
    results[i - 1] = collection[i];
  }

  return results;
};

/*
 * Exports.
 */

module.exports = rest;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var parse = __webpack_require__(35).parse;
var cookie = __webpack_require__(20);

/**
 * Get the top domain.
 *
 * The function constructs the levels of domain and attempts to set a global
 * cookie on each one when it succeeds it returns the top level domain.
 *
 * The method returns an empty string when the hostname is an ip or `localhost`.
 *
 * Example levels:
 *
 *      domain.levels('http://www.google.co.uk');
 *      // => ["co.uk", "google.co.uk", "www.google.co.uk"]
 *
 * Example:
 *
 *      domain('http://localhost:3000/baz');
 *      // => ''
 *      domain('http://dev:3000/baz');
 *      // => ''
 *      domain('http://127.0.0.1:3000/baz');
 *      // => ''
 *      domain('http://segment.io/baz');
 *      // => 'segment.io'
 *
 * @param {string} url
 * @return {string}
 * @api public
 */
function domain(url) {
  var cookie = exports.cookie;
  var levels = exports.levels(url);

  // Lookup the real top level one.
  for (var i = 0; i < levels.length; ++i) {
    var cname = '__tld__';
    var domain = levels[i];
    var opts = { domain: '.' + domain };

    cookie(cname, 1, opts);
    if (cookie(cname)) {
      cookie(cname, null, opts);
      return domain;
    }
  }

  return '';
}

/**
 * Levels returns all levels of the given url.
 *
 * @param {string} url
 * @return {Array}
 * @api public
 */
domain.levels = function(url) {
  var host = parse(url).hostname;
  var parts = host.split('.');
  var last = parts[parts.length - 1];
  var levels = [];

  // Ip address.
  if (parts.length === 4 && last === parseInt(last, 10)) {
    return levels;
  }

  // Localhost.
  if (parts.length <= 1) {
    return levels;
  }

  // Create levels.
  for (var i = parts.length - 2; i >= 0; --i) {
    levels.push(parts.slice(i).join('.'));
  }

  return levels;
};

/**
 * Expose cookie on domain.
 */
domain.cookie = cookie;

/*
 * Exports.
 */

exports = module.exports = domain;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Module dependencies.
 */

var Entity = __webpack_require__(37);
var bindAll = __webpack_require__(8);
var debug = __webpack_require__(2)('analytics:group');
var inherit = __webpack_require__(15);

/**
 * Group defaults
 */

Group.defaults = {
  persist: true,
  cookie: {
    key: 'ajs_group_id'
  },
  localStorage: {
    key: 'ajs_group_properties'
  }
};


/**
 * Initialize a new `Group` with `options`.
 *
 * @param {Object} options
 */

function Group(options) {
  this.defaults = Group.defaults;
  this.debug = debug;
  Entity.call(this, options);
}


/**
 * Inherit `Entity`
 */

inherit(Group, Entity);


/**
 * Expose the group singleton.
 */

module.exports = bindAll(new Group());


/**
 * Expose the `Group` constructor.
 */

module.exports.Group = Group;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var JSON = __webpack_require__(34);

module.exports = (function() {
	// Store.js
	var store = {},
		win = (typeof window != 'undefined' ? window : global),
		doc = win.document,
		localStorageName = 'localStorage',
		scriptTag = 'script',
		storage

	store.disabled = false
	store.version = '1.3.20'
	store.set = function(key, value) {}
	store.get = function(key, defaultVal) {}
	store.has = function(key) { return store.get(key) !== undefined }
	store.remove = function(key) {}
	store.clear = function() {}
	store.transact = function(key, defaultVal, transactionFn) {
		if (transactionFn == null) {
			transactionFn = defaultVal
			defaultVal = null
		}
		if (defaultVal == null) {
			defaultVal = {}
		}
		var val = store.get(key, defaultVal)
		transactionFn(val)
		store.set(key, val)
	}
	store.getAll = function() {
		var ret = {}
		store.forEach(function(key, val) {
			ret[key] = val
		})
		return ret
	}
	store.forEach = function() {}
	store.serialize = function(value) {
		return JSON.stringify(value)
	}
	store.deserialize = function(value) {
		if (typeof value != 'string') { return undefined }
		try { return JSON.parse(value) }
		catch(e) { return value || undefined }
	}

	// Functions to encapsulate questionable FireFox 3.6.13 behavior
	// when about.config::dom.storage.enabled === false
	// See https://github.com/marcuswestin/store.js/issues#issue/13
	function isLocalStorageNameSupported() {
		try { return (localStorageName in win && win[localStorageName]) }
		catch(err) { return false }
	}

	if (isLocalStorageNameSupported()) {
		storage = win[localStorageName]
		store.set = function(key, val) {
			if (val === undefined) { return store.remove(key) }
			storage.setItem(key, store.serialize(val))
			return val
		}
		store.get = function(key, defaultVal) {
			var val = store.deserialize(storage.getItem(key))
			return (val === undefined ? defaultVal : val)
		}
		store.remove = function(key) { storage.removeItem(key) }
		store.clear = function() { storage.clear() }
		store.forEach = function(callback) {
			for (var i=0; i<storage.length; i++) {
				var key = storage.key(i)
				callback(key, store.get(key))
			}
		}
	} else if (doc && doc.documentElement.addBehavior) {
		var storageOwner,
			storageContainer
		// Since #userData storage applies only to specific paths, we need to
		// somehow link our data to a specific path.  We choose /favicon.ico
		// as a pretty safe option, since all browsers already make a request to
		// this URL anyway and being a 404 will not hurt us here.  We wrap an
		// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
		// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
		// since the iframe access rules appear to allow direct access and
		// manipulation of the document element, even for a 404 page.  This
		// document can be used instead of the current document (which would
		// have been limited to the current path) to perform #userData storage.
		try {
			storageContainer = new ActiveXObject('htmlfile')
			storageContainer.open()
			storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
			storageContainer.close()
			storageOwner = storageContainer.w.frames[0].document
			storage = storageOwner.createElement('div')
		} catch(e) {
			// somehow ActiveXObject instantiation failed (perhaps some special
			// security settings or otherwse), fall back to per-path storage
			storage = doc.createElement('div')
			storageOwner = doc.body
		}
		var withIEStorage = function(storeFunction) {
			return function() {
				var args = Array.prototype.slice.call(arguments, 0)
				args.unshift(storage)
				// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
				// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
				storageOwner.appendChild(storage)
				storage.addBehavior('#default#userData')
				storage.load(localStorageName)
				var result = storeFunction.apply(store, args)
				storageOwner.removeChild(storage)
				return result
			}
		}

		// In IE7, keys cannot start with a digit or contain certain chars.
		// See https://github.com/marcuswestin/store.js/issues/40
		// See https://github.com/marcuswestin/store.js/issues/83
		var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
		var ieKeyFix = function(key) {
			return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
		}
		store.set = withIEStorage(function(storage, key, val) {
			key = ieKeyFix(key)
			if (val === undefined) { return store.remove(key) }
			storage.setAttribute(key, store.serialize(val))
			storage.save(localStorageName)
			return val
		})
		store.get = withIEStorage(function(storage, key, defaultVal) {
			key = ieKeyFix(key)
			var val = store.deserialize(storage.getAttribute(key))
			return (val === undefined ? defaultVal : val)
		})
		store.remove = withIEStorage(function(storage, key) {
			key = ieKeyFix(key)
			storage.removeAttribute(key)
			storage.save(localStorageName)
		})
		store.clear = withIEStorage(function(storage) {
			var attributes = storage.XMLDocument.documentElement.attributes
			storage.load(localStorageName)
			for (var i=attributes.length-1; i>=0; i--) {
				storage.removeAttribute(attributes[i].name)
			}
			storage.save(localStorageName)
		})
		store.forEach = withIEStorage(function(storage, callback) {
			var attributes = storage.XMLDocument.documentElement.attributes
			for (var i=0, attr; attr=attributes[i]; ++i) {
				callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
			}
		})
	}

	try {
		var testKey = '__storejs__'
		store.set(testKey, testKey)
		if (store.get(testKey) != testKey) { store.disabled = true }
		store.remove(testKey)
	} catch(e) {
		store.disabled = true
	}
	store.enabled = !store.disabled
	
	return store
}())

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isMeta(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
    return true;
  }

  // Logic that handles checks for the middle mouse button, based
  // on [jQuery](https://github.com/jquery/jquery/blob/master/src/event.js#L466).
  var which = e.which;
  var button = e.button;
  if (!which && button !== undefined) {
    // eslint-disable-next-line no-bitwise, no-extra-parens
    return (!button & 1) && (!button & 2) && (button & 4);
  } else if (which === 2) {
    return true;
  }

  return false;
}

/*
 * Exports.
 */

module.exports = isMeta;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(68);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(14)))

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module Dependencies.
 */

var debug = __webpack_require__(2)('analytics.js:normalize');
var defaults = __webpack_require__(3);
var each = __webpack_require__(1);
var includes = __webpack_require__(22);
var map = __webpack_require__(41);
var type = __webpack_require__(10);

/**
 * HOP.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Expose `normalize`
 */

module.exports = normalize;

/**
 * Toplevel properties.
 */

var toplevel = [
  'integrations',
  'anonymousId',
  'timestamp',
  'context'
];

/**
 * Normalize `msg` based on integrations `list`.
 *
 * @param {Object} msg
 * @param {Array} list
 * @return {Function}
 */

function normalize(msg, list) {
  var lower = map(function(s) { return s.toLowerCase(); }, list);
  var opts = msg.options || {};
  var integrations = opts.integrations || {};
  var providers = opts.providers || {};
  var context = opts.context || {};
  var ret = {};
  debug('<-', msg);

  // integrations.
  each(function(value, key) {
    if (!integration(key)) return;
    if (!has.call(integrations, key)) integrations[key] = value;
    delete opts[key];
  }, opts);

  // providers.
  delete opts.providers;
  each(function(value, key) {
    if (!integration(key)) return;
    if (type(integrations[key]) === 'object') return;
    if (has.call(integrations, key) && typeof providers[key] === 'boolean') return;
    integrations[key] = value;
  }, providers);

  // move all toplevel options to msg
  // and the rest to context.
  each(function(value, key) {
    if (includes(key, toplevel)) {
      ret[key] = opts[key];
    } else {
      context[key] = opts[key];
    }
  }, opts);

  // cleanup
  delete msg.options;
  ret.integrations = integrations;
  ret.context = context;
  ret = defaults(ret, msg);
  debug('->', ret);
  return ret;

  function integration(name) {
    return !!(includes(name, list) || name.toLowerCase() === 'all' || includes(name.toLowerCase(), lower));
  }
}


/***/ }),
/* 70 */
/***/ (function(module, exports) {

var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Module dependencies.
 */

var canonical = __webpack_require__(72);
var includes = __webpack_require__(22);
var url = __webpack_require__(35);

/**
 * Return a default `options.context.page` object.
 *
 * https://segment.com/docs/spec/page/#properties
 *
 * @return {Object}
 */

function pageDefaults() {
  return {
    path: canonicalPath(),
    referrer: document.referrer,
    search: searchPath(),
    title: document.title,
    url: canonicalUrl(location.search)
  };
}

/**
 * Return the canonical path for the page.
 *
 * @return {string}
 */

function canonicalPath() {
  var canon = canonical();
  if (!canon) return window.location.pathname;
  var parsed = url.parse(canon);
  return parsed.pathname;
}

/**
 * Return the canonical URL for the page concat the given `search`
 * and strip the hash.
 *
 * @param {string} search
 * @return {string}
 */

function canonicalUrl(search) {
  var canon = canonical();
  if (canon) return includes('?', canon) ? canon : canon + search;
  var url = window.location.href;
  var i = url.indexOf('#');
  return i === -1 ? url : url.slice(0, i);
}

/**
 * Return the search path for the page
 * This is preferable to window.location.search because SPAs
 * can have a # in the url which will include the query param in
 * the hash
 *
 * @return {string}
 */

function searchPath() {
  var url = window.location.href;
  var u = url.indexOf('?');
  return u === -1 ? '' : url.slice(u, -1);
}

/*
 * Exports.
 */

module.exports = pageDefaults;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Get the current page's canonical URL.
 *
 * @return {string|undefined}
 */
function canonical() {
  var tags = document.getElementsByTagName('link');
  // eslint-disable-next-line no-cond-assign
  for (var i = 0, tag; tag = tags[i]; i++) {
    if (tag.getAttribute('rel') === 'canonical') {
      return tag.getAttribute('href');
    }
  }
}

/*
 * Exports.
 */

module.exports = canonical;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objToString = Object.prototype.toString;

// TODO: Move to lib
var existy = function(val) {
  return val != null;
};

// TODO: Move to lib
var isArray = function(val) {
  return objToString.call(val) === '[object Array]';
};

// TODO: Move to lib
var isString = function(val) {
   return typeof val === 'string' || objToString.call(val) === '[object String]';
};

// TODO: Move to lib
var isObject = function(val) {
  return val != null && typeof val === 'object';
};

/**
 * Returns a copy of the new `object` containing only the specified properties.
 *
 * @name pick
 * @api public
 * @param {string|string[]} props The property or properties to keep.
 * @param {Object} object The object to iterate over.
 * @return {Object} A new object containing only the specified properties from `object`.
 * @example
 * var person = { name: 'Tim', occupation: 'enchanter', fears: 'rabbits' };
 *
 * pick('name', person);
 * //=> { name: 'Tim' }
 *
 * pick(['name', 'fears'], person);
 * //=> { name: 'Tim', fears: 'rabbits' }
 */
var pick = function pick(props, object) {
  if (!existy(object) || !isObject(object)) {
    return {};
  }

  if (isString(props)) {
    props = [props];
  }

  if (!isArray(props)) {
    props = [];
  }

  var result = {};

  for (var i = 0; i < props.length; i += 1) {
    if (isString(props[i]) && props[i] in object) {
      result[props[i]] = object[props[i]];
    }
  }

  return result;
};

/*
 * Exports.
 */

module.exports = pick;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Prevent default on a given event.
 *
 * @param {Event} e
 * @example
 * anchor.onclick = prevent;
 * anchor.onclick = function(e){
 *   if (something) return prevent(e);
 * };
 */

function preventDefault(e) {
  e = e || window.event;
  return e.preventDefault ? e.preventDefault() : e.returnValue = false;
}

/*
 * Exports.
 */

module.exports = preventDefault;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var trim = __webpack_require__(30);
var type = __webpack_require__(76);

var pattern = /(\w+)\[(\d+)\]/

/**
 * Safely encode the given string
 * 
 * @param {String} str
 * @return {String}
 * @api private
 */

var encode = function(str) {
  try {
    return encodeURIComponent(str);
  } catch (e) {
    return str;
  }
};

/**
 * Safely decode the string
 * 
 * @param {String} str
 * @return {String}
 * @api private
 */

var decode = function(str) {
  try {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  } catch (e) {
    return str;
  }
}

/**
 * Parse the given query `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

exports.parse = function(str){
  if ('string' != typeof str) return {};

  str = trim(str);
  if ('' == str) return {};
  if ('?' == str.charAt(0)) str = str.slice(1);

  var obj = {};
  var pairs = str.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var parts = pairs[i].split('=');
    var key = decode(parts[0]);
    var m;

    if (m = pattern.exec(key)) {
      obj[m[1]] = obj[m[1]] || [];
      obj[m[1]][m[2]] = decode(parts[1]);
      continue;
    }

    obj[parts[0]] = null == parts[1]
      ? ''
      : decode(parts[1]);
  }

  return obj;
};

/**
 * Stringify the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api public
 */

exports.stringify = function(obj){
  if (!obj) return '';
  var pairs = [];

  for (var key in obj) {
    var value = obj[key];

    if ('array' == type(value)) {
      for (var i = 0; i < value.length; ++i) {
        pairs.push(encode(key + '[' + i + ']') + '=' + encode(value[i]));
      }
      continue;
    }

    pairs.push(encode(key) + '=' + encode(obj[key]));
  }

  return pairs.join('&');
};


/***/ }),
/* 76 */
/***/ (function(module, exports) {

/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
    case '[object Error]': return 'error';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val !== val) return 'nan';
  if (val && val.nodeType === 1) return 'element';

  val = val.valueOf
    ? val.valueOf()
    : Object.prototype.valueOf.apply(val)

  return typeof val;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Module dependencies.
 */

var Entity = __webpack_require__(37);
var bindAll = __webpack_require__(8);
var cookie = __webpack_require__(19);
var debug = __webpack_require__(2)('analytics:user');
var inherit = __webpack_require__(15);
var rawCookie = __webpack_require__(20);
var uuid = __webpack_require__(78);

/**
 * User defaults
 */

User.defaults = {
  persist: true,
  cookie: {
    key: 'ajs_user_id',
    oldKey: 'ajs_user'
  },
  localStorage: {
    key: 'ajs_user_traits'
  }
};


/**
 * Initialize a new `User` with `options`.
 *
 * @param {Object} options
 */

function User(options) {
  this.defaults = User.defaults;
  this.debug = debug;
  Entity.call(this, options);
}


/**
 * Inherit `Entity`
 */

inherit(User, Entity);

/**
 * Set/get the user id.
 *
 * When the user id changes, the method will reset his anonymousId to a new one.
 *
 * // FIXME: What are the mixed types?
 * @param {string} id
 * @return {Mixed}
 * @example
 * // didn't change because the user didn't have previous id.
 * anonymousId = user.anonymousId();
 * user.id('foo');
 * assert.equal(anonymousId, user.anonymousId());
 *
 * // didn't change because the user id changed to null.
 * anonymousId = user.anonymousId();
 * user.id('foo');
 * user.id(null);
 * assert.equal(anonymousId, user.anonymousId());
 *
 * // change because the user had previous id.
 * anonymousId = user.anonymousId();
 * user.id('foo');
 * user.id('baz'); // triggers change
 * user.id('baz'); // no change
 * assert.notEqual(anonymousId, user.anonymousId());
 */

User.prototype.id = function(id) {
  var prev = this._getId();
  var ret = Entity.prototype.id.apply(this, arguments);
  if (prev == null) return ret;
  // FIXME: We're relying on coercion here (1 == "1"), but our API treats these
  // two values differently. Figure out what will break if we remove this and
  // change to strict equality
  /* eslint-disable eqeqeq */
  if (prev != id && id) this.anonymousId(null);
  /* eslint-enable eqeqeq */
  return ret;
};

/**
 * Set / get / remove anonymousId.
 *
 * @param {String} anonymousId
 * @return {String|User}
 */

User.prototype.anonymousId = function(anonymousId) {
  var store = this.storage();

  // set / remove
  if (arguments.length) {
    store.set('ajs_anonymous_id', anonymousId);
    return this;
  }

  // new
  anonymousId = store.get('ajs_anonymous_id');
  if (anonymousId) {
    return anonymousId;
  }

  // old - it is not stringified so we use the raw cookie.
  anonymousId = rawCookie('_sio');
  if (anonymousId) {
    anonymousId = anonymousId.split('----')[0];
    store.set('ajs_anonymous_id', anonymousId);
    store.remove('_sio');
    return anonymousId;
  }

  // empty
  anonymousId = uuid.v4();
  store.set('ajs_anonymous_id', anonymousId);
  return store.get('ajs_anonymous_id');
};

/**
 * Remove anonymous id on logout too.
 */

User.prototype.logout = function() {
  Entity.prototype.logout.call(this);
  this.anonymousId(null);
};

/**
 * Load saved user `id` or `traits` from storage.
 */

User.prototype.load = function() {
  if (this._loadOldCookie()) return;
  Entity.prototype.load.call(this);
};


/**
 * BACKWARDS COMPATIBILITY: Load the old user from the cookie.
 *
 * @api private
 * @return {boolean}
 */

User.prototype._loadOldCookie = function() {
  var user = cookie.get(this._options.cookie.oldKey);
  if (!user) return false;

  this.id(user.id);
  this.traits(user.traits);
  cookie.remove(this._options.cookie.oldKey);
  return true;
};


/**
 * Expose the user singleton.
 */

module.exports = bindAll(new User());


/**
 * Expose the `User` constructor.
 */

module.exports.User = User;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var _rng = __webpack_require__(79);

// Maps for number <-> hex string conversion
var _byteToHex = [];
var _hexToByte = {};
for (var i = 0; i < 256; i++) {
  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
  _hexToByte[_byteToHex[i]] = i;
}

// **`parse()` - Parse a UUID into it's component bytes**
function parse(s, buf, offset) {
  var i = (buf && offset) || 0, ii = 0;

  buf = buf || [];
  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
    if (ii < 16) { // Don't overflow!
      buf[i + ii++] = _hexToByte[oct];
    }
  });

  // Zero out remaining bytes if string was short
  while (ii < 16) {
    buf[i + ii++] = 0;
  }

  return buf;
}

// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
function unparse(buf, offset) {
  var i = offset || 0, bth = _byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = _rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; n++) {
    b[i + n] = node[n];
  }

  return buf ? buf : unparse(b);
}

// **`v4()` - Generate random UUID**

// See https://github.com/broofa/node-uuid for API details
function v4(options, buf, offset) {
  // Deprecated - 'format' argument, as supported in v1.2
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || _rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ii++) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || unparse(rnds);
}

// Export public API
var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.parse = parse;
uuid.unparse = unparse;

module.exports = uuid;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
  // Moderately fast, high quality
  var _rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(_rnds8);
    return _rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  _rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return _rnds;
  };
}

module.exports = rng;


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = {
	"_from": "git+https://github.com/yuunusdurmus/analytics.js-core.git",
	"_id": "@segment/analytics.js-core@3.0.0",
	"_inBundle": false,
	"_integrity": "sha1-4u8wOMkHyJnu6R3X2azibjcxX6o=",
	"_location": "/@segment/analytics.js-core",
	"_phantomChildren": {},
	"_requested": {
		"type": "git",
		"raw": "@segment/analytics.js-core@git+https://github.com/yuunusdurmus/analytics.js-core.git",
		"name": "@segment/analytics.js-core",
		"escapedName": "@segment%2fanalytics.js-core",
		"scope": "@segment",
		"rawSpec": "git+https://github.com/yuunusdurmus/analytics.js-core.git",
		"saveSpec": "git+https://github.com/yuunusdurmus/analytics.js-core.git",
		"fetchSpec": "https://github.com/yuunusdurmus/analytics.js-core.git",
		"gitCommittish": "master"
	},
	"_requiredBy": [
		"/analyticsjs"
	],
	"_resolved": "git+https://github.com/yuunusdurmus/analytics.js-core.git#fbf07bf5fb4964a7f2d68be81dd38cac63ea6ba9",
	"_spec": "@segment/analytics.js-core@git+https://github.com/yuunusdurmus/analytics.js-core.git",
	"_where": "/Users/yunus/Desktop/analyticsjs-example/node_modules/analyticsjs",
	"author": {
		"name": "Segment",
		"email": "friends@segment.com"
	},
	"bugs": {
		"url": "https://github.com/segmentio/analytics.js-core/issues"
	},
	"bundleDependencies": false,
	"dependencies": {
		"@ndhoule/after": "^1.0.0",
		"@ndhoule/clone": "^1.0.0",
		"@ndhoule/defaults": "^2.0.1",
		"@ndhoule/each": "^2.0.1",
		"@ndhoule/extend": "^2.0.0",
		"@ndhoule/foldl": "^2.0.1",
		"@ndhoule/includes": "^2.0.1",
		"@ndhoule/keys": "^2.0.0",
		"@ndhoule/map": "^2.0.1",
		"@ndhoule/pick": "^2.0.0",
		"@segment/canonical": "^1.0.0",
		"@segment/is-meta": "^1.0.0",
		"@segment/isodate": "^1.0.2",
		"@segment/isodate-traverse": "^1.0.1",
		"@segment/prevent-default": "^1.0.0",
		"@segment/store": "^1.3.20",
		"@segment/top-domain": "^3.0.0",
		"bind-all": "^1.0.0",
		"component-cookie": "^1.1.2",
		"component-emitter": "^1.2.1",
		"component-event": "^0.1.4",
		"component-querystring": "^2.0.0",
		"component-type": "^1.2.1",
		"component-url": "^0.2.1",
		"debug": "^0.7.4",
		"inherits": "^2.0.1",
		"install": "^0.7.3",
		"is": "^3.1.0",
		"json3": "^3.3.2",
		"new-date": "^1.0.0",
		"next-tick": "^0.2.2",
		"segmentio-facade": "^3.0.2",
		"uuid": "^2.0.2"
	},
	"deprecated": false,
	"description": "The hassle-free way to integrate analytics into any web application.",
	"devDependencies": {
		"@segment/analytics.js-integration": "^2.0.1",
		"@segment/eslint-config": "^3.1.1",
		"browserify": "^13.0.0",
		"browserify-istanbul": "^2.0.0",
		"compat-trigger-event": "^1.0.0",
		"component-each": "^0.2.6",
		"eslint": "^2.9.0",
		"eslint-plugin-mocha": "^2.2.0",
		"eslint-plugin-require-path-exists": "^1.1.5",
		"istanbul": "^0.4.3",
		"jquery": "^1.12.3",
		"karma": "^0.13.22",
		"karma-browserify": "^5.0.4",
		"karma-chrome-launcher": "^1.0.1",
		"karma-coverage": "^1.0.0",
		"karma-junit-reporter": "^1.0.0",
		"karma-mocha": "^1.0.1",
		"karma-phantomjs-launcher": "^1.0.0",
		"karma-sauce-launcher": "^1.0.0",
		"karma-spec-reporter": "0.0.26",
		"mocha": "^2.2.5",
		"phantomjs-prebuilt": "^2.1.7",
		"proclaim": "^3.4.1",
		"sinon": "^1.7.3",
		"watchify": "^3.7.0"
	},
	"homepage": "https://github.com/segmentio/analytics.js-core#readme",
	"keywords": [
		"analytics",
		"analytics.js",
		"segment",
		"segment.io"
	],
	"license": "SEE LICENSE IN LICENSE",
	"main": "lib/index.js",
	"name": "@segment/analytics.js-core",
	"repository": {
		"type": "git",
		"url": "git+https://github.com/segmentio/analytics.js-core.git"
	},
	"scripts": {
		"test": "make test"
	},
	"version": "3.0.0"
};

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = {
    createActions : function(analytics) {
        return [
            {
                type: 'identify',
                push: function(data) {
                    analytics.identify(data.id, data.user);
                }
            },
            {
                type: 'page Viewed',
                push: function(data) {
                    analytics.page(data);
                }
            },
            {
                type: 'Product List Viewed',
                push: function(data) {
                  analytics.track('Product List Viewed', data);
                }
            },
            {
                type: 'Product Viewed',
                push: function(data) {
                  analytics.track('Product Viewed' ,data);
                }
            },
            {
                type: 'Product Viewed',
                push: function(data) {
                    analytics.track('Product Viewed', data);
                }
            },
            {
                type: 'Product Viewed',
                push: function(data) {
                    analytics.track('Product Viewed', data);
                }
            },
            {
                type: 'Cart Viewed',
                push: function(data) {
                    analytics.track('Cart Viewed', data);
                }
            },
            {
                type: 'Product Added',
                push: function(data) {
                    analytics.track('Product Added', data);
                }
            },
            {
                type: 'Product Removed',
                push: function(data) {
                    analytics.track('Product Removed', data);
                }
            },
            {
                type: 'Checkout Step Viewed',
                push: function(data) {
                    analytics.track('Checkout Step Viewed', data);
                }
            },
            {
                type: 'Checkout Started',
                push: function(data) {
                    analytics.track('Checkout Started', data);
                }
            },
            {
                type: 'Checkout Step Completed',
                push: function(data) {
                    analytics.track('Checkout Step Completed', data);
                }
            }
        ]
    }
}


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  config: [
    {
      package: __webpack_require__(83),
      name: 'Google Analytics',
      settings: {
        trackingId: 'UA-XXXXXXXXX-X' 
      }
    }
  ]
}



/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var Track = __webpack_require__(5).Track;
var defaults = __webpack_require__(3);
var dot = __webpack_require__(9);
var each = __webpack_require__(26);
var integration = __webpack_require__(84);
var is = __webpack_require__(11);
var len = __webpack_require__(97).length;
var push = __webpack_require__(98)('_gaq');
var reject = __webpack_require__(101);
var useHttps = __webpack_require__(102);
var user;

/**
 * Expose plugin.
 */

module.exports = exports = function(analytics) {
  // eslint-disable-next-line no-use-before-define
  analytics.addIntegration(GA);
  user = analytics.user();
};

/**
 * Expose `GA` integration.
 *
 * http://support.google.com/analytics/bin/answer.py?hl=en&answer=2558867
 * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration#_gat.GA_Tracker_._setSiteSpeedSampleRate
 */

var GA = exports.Integration = integration('Google Analytics')
  .readyOnLoad()
  .global('ga')
  .global('gaplugins')
  .global('_gaq')
  .global('GoogleAnalyticsObject')
  .option('anonymizeIp', false)
  .option('classic', false)
  .option('contentGroupings', {})
  .option('dimensions', {})
  .option('domain', 'auto')
  .option('doubleClick', false)
  .option('enhancedEcommerce', false)
  .option('enhancedLinkAttribution', false)
  .option('ignoredReferrers', null)
  .option('includeSearch', false)
  .option('setAllMappedProps', true)
  .option('metrics', {})
  .option('nonInteraction', false)
  .option('sendUserId', false)
  .option('siteSpeedSampleRate', 1)
  .option('sampleRate', 100)
  .option('trackCategorizedPages', true)
  .option('trackNamedPages', true)
  .option('trackingId', '')
  .option('optimize', '')
  .tag('library', '<script src="//www.google-analytics.com/analytics.js">')
  .tag('double click', '<script src="//stats.g.doubleclick.net/dc.js">')
  .tag('http', '<script src="http://www.google-analytics.com/ga.js">')
  .tag('https', '<script src="https://ssl.google-analytics.com/ga.js">');

/**
 * On `construct` swap any config-based methods to the proper implementation.
 */

GA.on('construct', function(integration) {
  if (integration.options.classic) {
    integration.initialize = integration.initializeClassic;
    integration.loaded = integration.loadedClassic;
    integration.page = integration.pageClassic;
    integration.track = integration.trackClassic;
    integration.orderCompleted = integration.completedOrderClassic;
  } else if (integration.options.enhancedEcommerce) {
    integration.productViewed = integration.productViewedEnhanced;
    integration.productClicked = integration.productClickedEnhanced;
    integration.productAdded = integration.productAddedEnhanced;
    integration.productRemoved = integration.productRemovedEnhanced;
    integration.checkoutStarted = integration.checkoutStartedEnhanced;
    integration.checkoutStepViewed = integration.checkoutStepViewedEnhanced;
    integration.checkoutStepCompleted = integration.checkoutStepCompletedEnhanced;
    integration.orderUpdated = integration.orderUpdatedEnhanced;
    integration.orderCompleted = integration.orderCompletedEnhanced;
    integration.orderRefunded = integration.orderRefundedEnhanced;
    integration.promotionViewed = integration.promotionViewedEnhanced;
    integration.promotionClicked = integration.promotionClickedEnhanced;
    integration.productListViewed = integration.productListViewedEnhanced;
    integration.productListFiltered = integration.productListFilteredEnhanced;
  }
});

/**
 * Initialize.
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/advanced
 */

GA.prototype.initialize = function() {
  this.pageCalled = false;
  var opts = this.options;

  // setup the tracker globals
  window.GoogleAnalyticsObject = 'ga';
  window.ga = window.ga || function() {
    window.ga.q = window.ga.q || [];
    window.ga.q.push(arguments);
  };
  window.ga.l = new Date().getTime();

  if (window.location.hostname === 'localhost') opts.domain = 'none';

  window.ga('create', opts.trackingId, {
    // Fall back on default to protect against empty string
    cookieDomain: opts.domain || GA.prototype.defaults.domain,
    siteSpeedSampleRate: opts.siteSpeedSampleRate,
    sampleRate: opts.sampleRate,
    allowLinker: true
  });

  if (opts.optimize) window.ga('require', opts.optimize);

  // display advertising
  if (opts.doubleClick) {
    window.ga('require', 'displayfeatures');
  }

  // https://support.google.com/analytics/answer/2558867?hl=en
  if (opts.enhancedLinkAttribution) {
    window.ga('require', 'linkid', 'linkid.js');
  }

  // send global id
  if (opts.sendUserId && user.id()) {
    window.ga('set', 'userId', user.id());
  }

  // anonymize after initializing, otherwise a warning is shown
  // in google analytics debugger
  if (opts.anonymizeIp) window.ga('set', 'anonymizeIp', true);

  // initialize page with `id` appended to user's traits
  // sets `id` as a custom dimension for the lifetime of the tracker object and
  // ensures `id` sent as a custom dimension for all hits on the page
  var userTraits = user.traits();
  if (user.id()) {
    userTraits.id = user.id();
  }

  // custom dimensions & metrics
  var custom = metrics(userTraits, opts);
  if (len(custom)) window.ga('set', custom);

  this.load('library', this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

GA.prototype.loaded = function() {
  return !!window.gaplugins;
};

/**
 * Page.
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications#multiple-hits
 *
 * @api public
 * @param {Page} page
 */

GA.prototype.page = function(page) {
  var category = page.category();
  var props = page.properties();
  var name = page.fullName();
  var opts = this.options;
  var campaign = page.proxy('context.campaign') || {};
  var pageview = {};
  var pagePath = path(props, this.options);
  var pageTitle = name || props.title;
  var pageReferrer = page.referrer() || '';
  var track;

  // store for later
  // TODO: Why? Document this better
  this._category = category;

  pageview.page = pagePath;
  pageview.title = pageTitle;
  pageview.location = props.url;

  if (campaign.name) pageview.campaignName = campaign.name;
  if (campaign.source) pageview.campaignSource = campaign.source;
  if (campaign.medium) pageview.campaignMedium = campaign.medium;
  if (campaign.content) pageview.campaignContent = campaign.content;
  if (campaign.term) pageview.campaignKeyword = campaign.term;

  // set
  var payload = {
    page: pagePath,
    title: pageTitle
  };

  // custom dimensions, metrics and content groupings
  var custom = metrics(props, opts);
  if (len(custom)) {
    if (opts.setAllMappedProps) {
      window.ga('set', custom);
    } else {
      // Add custom dimensions / metrics to pageview payload
      each(custom, function(key, value) {
        pageview[key] = value;
      });
    }
  }
  
  if (pageReferrer !== document.referrer) payload.referrer = pageReferrer; // allow referrer override if referrer was manually set
  window.ga('set', payload);

  if (this.pageCalled) delete pageview.location;

  // send
  window.ga('send', 'pageview', pageview);

  // categorized pages
  if (category && this.options.trackCategorizedPages) {
    track = page.track(category);
    this.track(track, { nonInteraction: 1 });
  }

  // named pages
  if (name && this.options.trackNamedPages) {
    track = page.track(name);
    this.track(track, { nonInteraction: 1 });
  }

  this.pageCalled = true;
};

/**
 * Identify.
 *
 * @api public
 * @param {Identify} event
 */

GA.prototype.identify = function(identify) {
  var opts = this.options;

  if (opts.sendUserId && identify.userId()) {
    window.ga('set', 'userId', identify.userId());
  }

  // Set dimensions
  var custom = metrics(identify.traits(), opts);
  if (len(custom)) window.ga('set', custom);
};

/**
 * Track.
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
 *
 * @param {Track} event
 */

GA.prototype.track = function(track, options) {
  var contextOpts = track.options(this.name);
  var interfaceOpts = this.options;
  var opts = defaults(options || {}, contextOpts);
  opts = defaults(opts, interfaceOpts);
  var props = track.properties();
  var campaign = track.proxy('context.campaign') || {};

  var payload = {
    eventAction: track.event(),
    eventCategory: track.category() || this._category || 'All',
    eventLabel: props.label,
    eventValue: formatValue(props.value || track.revenue()),
    // Allow users to override their nonInteraction integration setting for any single particluar event.
    nonInteraction: props.nonInteraction !== undefined ? !!props.nonInteraction : !!opts.nonInteraction
  };

  if (campaign.name) payload.campaignName = campaign.name;
  if (campaign.source) payload.campaignSource = campaign.source;
  if (campaign.medium) payload.campaignMedium = campaign.medium;
  if (campaign.content) payload.campaignContent = campaign.content;
  if (campaign.term) payload.campaignKeyword = campaign.term;
  
  // custom dimensions & metrics
  var custom = metrics(props, interfaceOpts);
  if (len(custom)) {
    if (interfaceOpts.setAllMappedProps) {
      window.ga('set', custom);
    } else {
      // Add custom dimensions / metrics to payload
      each(custom, function(key, value) {
        payload[key] = value;
      });
    }
  }

  window.ga('send', 'event', payload);
};

/**
 * Order completed.
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce#multicurrency
 *
 * @param {Track} track
 * @api private
 */

GA.prototype.orderCompleted = function(track) {
  var total = track.total() || track.revenue() || 0;
  var orderId = track.orderId();
  var products = track.products();
  var props = track.properties();

  // orderId is required.
  if (!orderId) return;

  // require ecommerce
  if (!this.ecommerce) {
    window.ga('require', 'ecommerce');
    this.ecommerce = true;
  }

  // add transaction
  window.ga('ecommerce:addTransaction', {
    affiliation: props.affiliation,
    shipping: track.shipping(),
    revenue: total,
    tax: track.tax(),
    id: orderId,
    currency: track.currency()
  });

  // add products
  each(products, function(product) {
    var productTrack = createProductTrack(track, product);
    window.ga('ecommerce:addItem', {
      category: productTrack.category(),
      quantity: productTrack.quantity(),
      price: productTrack.price(),
      name: productTrack.name(),
      sku: productTrack.sku(),
      id: orderId,
      currency: productTrack.currency()
    });
  });

  // send
  window.ga('ecommerce:send');
};

/**
 * Initialize (classic).
 *
 * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration
 */

GA.prototype.initializeClassic = function() {
  var opts = this.options;
  var anonymize = opts.anonymizeIp;
  var domain = opts.domain;
  var enhanced = opts.enhancedLinkAttribution;
  var ignore = opts.ignoredReferrers;
  var sample = opts.siteSpeedSampleRate;

  window._gaq = window._gaq || [];
  push('_setAccount', opts.trackingId);
  push('_setAllowLinker', true);

  if (anonymize) push('_gat._anonymizeIp');
  if (domain) push('_setDomainName', domain);
  if (sample) push('_setSiteSpeedSampleRate', sample);

  if (enhanced) {
    var protocol = document.location.protocol === 'https:' ? 'https:' : 'http:';
    var pluginUrl = protocol + '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
    push('_require', 'inpage_linkid', pluginUrl);
  }

  if (ignore) {
    if (!is.array(ignore)) ignore = [ignore];
    each(ignore, function(domain) {
      push('_addIgnoredRef', domain);
    });
  }

  if (this.options.doubleClick) {
    this.load('double click', this.ready);
  } else {
    var name = useHttps() ? 'https' : 'http';
    this.load(name, this.ready);
  }
};

/**
 * Loaded? (classic)
 *
 * @return {Boolean}
 */

GA.prototype.loadedClassic = function() {
  return !!(window._gaq && window._gaq.push !== Array.prototype.push);
};

/**
 * Page (classic).
 *
 * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration
 *
 * @param {Page} page
 */

GA.prototype.pageClassic = function(page) {
  var category = page.category();
  var props = page.properties();
  var name = page.fullName();
  var track;

  push('_trackPageview', path(props, this.options));

  // categorized pages
  if (category && this.options.trackCategorizedPages) {
    track = page.track(category);
    this.track(track, { nonInteraction: 1 });
  }

  // named pages
  if (name && this.options.trackNamedPages) {
    track = page.track(name);
    this.track(track, { nonInteraction: 1 });
  }
};

/**
 * Track (classic).
 *
 * https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiEventTracking
 *
 * @param {Track} track
 */

GA.prototype.trackClassic = function(track, options) {
  var opts = options || track.options(this.name);
  var props = track.properties();
  var revenue = track.revenue();
  var event = track.event();
  var category = this._category || track.category() || 'All';
  var label = props.label;
  var value = formatValue(revenue || props.value);
  var nonInteraction = !!(props.nonInteraction || opts.nonInteraction);
  push('_trackEvent', category, event, label, value, nonInteraction);
};

/**
 * Completed order.
 *
 * https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingEcommerce
 * https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingEcommerce#localcurrencies
 *
 * @param {Track} track
 * @api private
 */

GA.prototype.completedOrderClassic = function(track) {
  var total = track.total() || track.revenue() || 0;
  var orderId = track.orderId();
  var products = track.products() || [];
  var props = track.properties();
  var currency = track.currency();

  // required
  if (!orderId) return;

  // add transaction
  push('_addTrans',
    orderId,
    props.affiliation,
    total,
    track.tax(),
    track.shipping(),
    track.city(),
    track.state(),
    track.country());

  // add items
  each(products, function(product) {
    var track = new Track({ properties: product });
    push('_addItem',
      orderId,
      track.sku(),
      track.name(),
      track.category(),
      track.price(),
      track.quantity());
  });

  // send
  push('_set', 'currencyCode', currency);
  push('_trackTrans');
};

/**
 * Return the path based on `properties` and `options`.
 *
 * @param {Object} properties
 * @param {Object} options
 * @return {string|undefined}
 */

function path(properties, options) {
  if (!properties) return;
  var str = properties.path;
  if (options.includeSearch && properties.search) str += properties.search;
  return str;
}

/**
 * Format the value property to Google's liking.
 *
 * @param {Number} value
 * @return {Number}
 */

function formatValue(value) {
  if (!value || value < 0) return 0;
  return Math.round(value);
}

/**
 * Map google's custom dimensions, metrics & content groupings with `obj`.
 *
 * Example:
 *
 *      metrics({ revenue: 1.9 }, { { metrics : { revenue: 'metric8' } });
 *      // => { metric8: 1.9 }
 *
 *      metrics({ revenue: 1.9 }, {});
 *      // => {}
 *
 * @param {Object} obj
 * @param {Object} data
 * @return {Object|null}
 * @api private
 */

function metrics(obj, data) {
  var dimensions = data.dimensions;
  var metrics = data.metrics;
  var contentGroupings = data.contentGroupings;

  var ret = {};

  each([metrics, dimensions, contentGroupings], function(group) {
    each(group, function(prop, key) {
      var value = dot(obj, prop) || obj[prop];
      if (is.bool(value)) value = value.toString();
      if (value || value === 0) ret[key] = value;
    });
  });

  return ret;
}

/**
 * Loads ec.js (unless already loaded)
 *
 * @param {Track} track
 */

GA.prototype.loadEnhancedEcommerce = function(track) {
  if (!this.enhancedEcommerceLoaded) {
    window.ga('require', 'ec');
    this.enhancedEcommerceLoaded = true;
  }

  // Ensure we set currency for every hit
  window.ga('set', '&cu', track.currency());
};

/**
 * Pushes an event and all previously set EE data to GA.
 *
 * @api private
 * @param {Track} track
 */

GA.prototype.pushEnhancedEcommerce = function(track) {
  // Send a custom non-interaction event to ensure all EE data is pushed.
  // Without doing this we'd need to require page display after setting EE data.
  var args = reject([
    'send',
    'event',
    track.category() || 'EnhancedEcommerce',
    track.event() || 'Action not defined',
    track.properties().label,
    { nonInteraction: 1 }
  ]);
  window.ga.apply(window, args);
};

/**
 * Started order - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#checkout-steps
 *
 * @api private
 * @param {Track} track
 */

GA.prototype.checkoutStartedEnhanced = function(track) {
  // same as viewed checkout step #1
  this.checkoutStepViewed(track);
};

/**
 * Updated order - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#checkout-steps
 *
 * @api private
 * @param {Track} track
 */

GA.prototype.orderUpdatedEnhanced = function(track) {
  // Same event as started order - will override
  this.checkoutStartedEnhanced(track);
};

/**
 * Viewed checkout step - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#checkout-steps
 *
 * @api private
 * @param {Track} track
 */

GA.prototype.checkoutStepViewedEnhanced = function(track) {
  var products = track.products();
  var props = track.properties();
  var options = extractCheckoutOptions(props);

  this.loadEnhancedEcommerce(track);

  each(products, function(product) {
    var productTrack = createProductTrack(track, product);
    enhancedEcommerceTrackProduct(productTrack);
  });

  window.ga('ec:setAction', 'checkout', {
    step: props.step || 1,
    option: options || undefined
  });

  this.pushEnhancedEcommerce(track);
};

/**
 * Completed checkout step - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#checkout-options
 *
 * @api private
 * @param {Track} track
 */

GA.prototype.checkoutStepCompletedEnhanced = function(track) {
  var props = track.properties();
  var options = extractCheckoutOptions(props);

  // Only send an event if we have step and options to update
  if (!props.step || !options) return;

  this.loadEnhancedEcommerce(track);

  window.ga('ec:setAction', 'checkout_option', {
    step: props.step || 1,
    option: options
  });

  window.ga('send', 'event', 'Checkout', 'Option');
};

/**
 * Completed order - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-transactions
 *
 * @api private
 * @param {Track} track
 */

GA.prototype.orderCompletedEnhanced = function(track) {
  var total = track.total() || track.revenue() || 0;
  var orderId = track.orderId();
  var products = track.products();
  var props = track.properties();

  // orderId is required.
  if (!orderId) return;

  this.loadEnhancedEcommerce(track);

  each(products, function(product) {
    var productTrack = createProductTrack(track, product);
    enhancedEcommerceTrackProduct(productTrack);
  });

  window.ga('ec:setAction', 'purchase', {
    id: orderId,
    affiliation: props.affiliation,
    revenue: total,
    tax: track.tax(),
    shipping: track.shipping(),
    coupon: track.coupon()
  });

  this.pushEnhancedEcommerce(track);
};

/**
 * Refunded order - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-refunds
 *
 * @api private
 * @param {Track} track
 */

GA.prototype.orderRefundedEnhanced = function(track) {
  var orderId = track.orderId();
  var products = track.products();

  // orderId is required.
  if (!orderId) return;

  this.loadEnhancedEcommerce(track);

  // Without any products it's a full refund
  each(products, function(product) {
    var track = new Track({ properties: product });
    window.ga('ec:addProduct', {
      id: track.productId() || track.id() || track.sku(),
      quantity: track.quantity()
    });
  });

  window.ga('ec:setAction', 'refund', {
    id: orderId
  });

  this.pushEnhancedEcommerce(track);
};

/**
 * Added product - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#add-remove-cart
 *
 * @api private
 * @param {Track} track
 */

GA.prototype.productAddedEnhanced = function(track) {
  this.loadEnhancedEcommerce(track);
  enhancedEcommerceProductAction(track, 'add');
  this.pushEnhancedEcommerce(track);
};

/**
 * Removed product - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#add-remove-cart
 *
 * @api private
 * @param {Track} track
 */

GA.prototype.productRemovedEnhanced = function(track) {
  this.loadEnhancedEcommerce(track);
  enhancedEcommerceProductAction(track, 'remove');
  this.pushEnhancedEcommerce(track);
};

/**
 * Viewed product details - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#product-detail-view
 *
 * @api private
 * @param {Track} track
 */

GA.prototype.productViewedEnhanced = function(track) {
  var props = track.properties();
  var data = {};

  this.loadEnhancedEcommerce(track);
  // list property is optional
  if (props.list) data.list = props.list;
  enhancedEcommerceProductAction(track, 'detail', data);
  this.pushEnhancedEcommerce(track);
};

/**
 * Clicked product - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-actions
 *
 * @api private
 * @param {Track} track
 */

GA.prototype.productClickedEnhanced = function(track) {
  var props = track.properties();
  var data = {};

  this.loadEnhancedEcommerce(track);
  // list property is optional
  if (props.list) data.list = props.list;
  enhancedEcommerceProductAction(track, 'click', data);
  this.pushEnhancedEcommerce(track);
};

/**
 * Viewed promotion - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-promo-impressions
 *
 * @api private
 * @param {Track} track
 */

GA.prototype.promotionViewedEnhanced = function(track) {
  var props = track.properties();

  this.loadEnhancedEcommerce(track);
  window.ga('ec:addPromo', {
    id: track.promotionId() || track.id(),
    name: track.name(),
    creative: props.creative,
    position: props.position
  });
  this.pushEnhancedEcommerce(track);
};

/**
 * Clicked promotion - Enhanced Ecommerce
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-promo-clicks
 *
 * @api private
 * @param {Track} track
 */

GA.prototype.promotionClickedEnhanced = function(track) {
  var props = track.properties();

  this.loadEnhancedEcommerce(track);
  window.ga('ec:addPromo', {
    id: track.promotionId() || track.id(),
    name: track.name(),
    creative: props.creative,
    position: props.position
  });
  window.ga('ec:setAction', 'promo_click', {});
  this.pushEnhancedEcommerce(track);
};

/**
 * Product List Viewed - Enhanced Ecommerce (Mapped to Product Impression)
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#product-impression
 *
 * @api private
 * @param {Track} track
 */

GA.prototype.productListViewedEnhanced = function(track) {
  var props = track.properties();
  var products = track.products();
  this.loadEnhancedEcommerce(track);
  each(products, function(product) {
    // If we don't have an ID/SKU or name, return - GA will reject the impression.
    var item = new Track({ properties: product });
    if (!(item.productId() || item.sku()) && !item.name()) return;
    var impressionObj = {
      id: item.productId() || item.sku(),
      name: item.name(),
      category: item.category() || track.category(),
      list: props.list_id || track.category() || 'products',
      brand: item.properties().brand,
      variant: item.properties().variant,
      price: item.price(),
      position: products.map(function(x) { return x.product_id; }).indexOf(item.productId()) + 1
    };

    for (var prop in impressionObj) {
      if (impressionObj[prop] === undefined) delete impressionObj[prop];
    }
    window.ga('ec:addImpression', impressionObj);
  });

  this.pushEnhancedEcommerce(track);
};

/**
 * Product List Filtered - Enhanced Ecommerce (Mapped to Product Impression)
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#product-impression
 *
 * @api private
 * @param {Track} track
 */

GA.prototype.productListFilteredEnhanced = function(track) {
  var props = track.properties();
  var products = track.products();
  props.filters = props.filters || [];
  props.sorters = props.sorters || [];
  var filters = props.filters.map(function(obj) { return obj.type + ':' + obj.value;}).join();
  var sorts = props.sorts.map(function(obj) { return obj.type + ':' + obj.value;}).join();
  this.loadEnhancedEcommerce(track);
  each(products, function(product) {
    // If we don't have an ID/SKU or name, return - GA will reject the impression.
    var item = new Track({ properties: product });
    if (!(item.productId() || item.sku()) && !item.name()) return;
    var impressionObj = {
      id: item.productId() || item.sku(),
      name: item.name(),
      category: item.category() || track.category(),
      list: props.list_id || track.category() || 'search results',
      brand: item.properties().brand,
      variant: filters + '::' + sorts,
      price: item.price(),
      position: products.map(function(x) { return x.product_id; }).indexOf(item.productId()) + 1
    };
    for (var prop in impressionObj) {
      if (impressionObj[prop] === undefined) delete impressionObj[prop];
    }
    window.ga('ec:addImpression', impressionObj);
  });

  this.pushEnhancedEcommerce(track);
};


/**
 * Enhanced ecommerce track product.
 *
 * Simple helper so that we don't repeat `ec:addProduct` everywhere.
 *
 * @api private
 * @param {Track} track
 */

function enhancedEcommerceTrackProduct(track) {
  var props = track.properties();
  var product = {
    id: track.productId() || track.id() || track.sku(),
    name: track.name(),
    category: track.category(),
    quantity: track.quantity(),
    price: track.price(),
    brand: props.brand,
    variant: props.variant,
    currency: track.currency()
  };

  // append coupon if it set
  // https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-transactions
  var coupon = track.proxy('properties.coupon');
  if (coupon) product.coupon = coupon;
  window.ga('ec:addProduct', product);
}

/**
 * Set `action` on `track` with `data`.
 *
 * @api private
 * @param {Track} track
 * @param {String} action
 * @param {Object} data
 */

function enhancedEcommerceProductAction(track, action, data) {
  enhancedEcommerceTrackProduct(track);
  window.ga('ec:setAction', action, data || {});
}

/**
 * Extracts checkout options.
 *
 * @api private
 * @param {Object} props
 * @return {string|null}
 */

function extractCheckoutOptions(props) {
  var options = [
    props.paymentMethod,
    props.shippingMethod
  ];

  // Remove all nulls, and join with commas.
  var valid = reject(options);
  return valid.length > 0 ? valid.join(', ') : null;
}

/**
 * Creates a track out of product properties.
 *
 * @api private
 * @param {Track} track
 * @param {Object} properties
 * @return {Track}
 */

function createProductTrack(track, properties) {
  properties.currency = properties.currency || track.currency();
  return new Track({ properties: properties });
}


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var bind = __webpack_require__(33);
var clone = __webpack_require__(7);
var debug = __webpack_require__(85);
var defaults = __webpack_require__(3);
var extend = __webpack_require__(38);
var slug = __webpack_require__(87);
var protos = __webpack_require__(88);
var statics = __webpack_require__(95);

/**
 * Create a new `Integration` constructor.
 *
 * @constructs Integration
 * @param {string} name
 * @return {Function} Integration
 */

function createIntegration(name) {
  /**
   * Initialize a new `Integration`.
   *
   * @class
   * @param {Object} options
   */

  function Integration(options) {
    if (options && options.addIntegration) {
      // plugin
      return options.addIntegration(Integration);
    }
    this.debug = debug('analytics:integration:' + slug(name));
    this.options = defaults(clone(options) || {}, this.defaults);
    this._queue = [];
    this.once('ready', bind(this, this.flush));

    Integration.emit('construct', this);
    this.ready = bind(this, this.ready);
    this._wrapInitialize();
    this._wrapPage();
    this._wrapTrack();
  }

  Integration.prototype.defaults = {};
  Integration.prototype.globals = [];
  Integration.prototype.templates = {};
  Integration.prototype.name = name;
  extend(Integration, statics);
  extend(Integration.prototype, protos);

  return Integration;
}

/**
 * Exports.
 */

module.exports = createIntegration;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(86);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(42);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 87 */
/***/ (function(module, exports) {


/**
 * Generate a slug from the given `str`.
 *
 * example:
 *
 *        generate('foo bar');
 *        // > foo-bar
 *
 * @param {String} str
 * @param {Object} options
 * @config {String|RegExp} [replace] characters to replace, defaulted to `/[^a-z0-9]/g`
 * @config {String} [separator] separator to insert, defaulted to `-`
 * @return {String}
 */

module.exports = function (str, options) {
  options || (options = {});
  return str.toLowerCase()
    .replace(options.replace || /[^a-z0-9]/g, ' ')
    .replace(/^ +| +$/g, '')
    .replace(/ +/g, options.separator || '-')
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var Emitter = __webpack_require__(18);
var after = __webpack_require__(32);
var each = __webpack_require__(1);
var events = __webpack_require__(89);
var every = __webpack_require__(90);
var fmt = __webpack_require__(91);
var foldl = __webpack_require__(21);
var is = __webpack_require__(11);
var loadIframe = __webpack_require__(92);
var loadScript = __webpack_require__(93);
var nextTick = __webpack_require__(13);
var normalize = __webpack_require__(94);

/**
 * hasOwnProperty reference.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * No operation.
 */

var noop = function noop() {};

/**
 * Window defaults.
 */

var onerror = window.onerror;
var onload = null;

/**
 * Mixin emitter.
 */

/* eslint-disable new-cap */
Emitter(exports);
/* eslint-enable new-cap */

/**
 * Initialize.
 */

exports.initialize = function() {
  var ready = this.ready;
  nextTick(ready);
};

/**
 * Loaded?
 *
 * @api private
 * @return {boolean}
 */

exports.loaded = function() {
  return false;
};

/**
 * Page.
 *
 * @api public
 * @param {Page} page
 */

/* eslint-disable no-unused-vars */
exports.page = function(page) {};
/* eslint-enable no-unused-vars */

/**
 * Track.
 *
 * @api public
 * @param {Track} track
 */

/* eslint-disable no-unused-vars */
exports.track = function(track) {};
/* eslint-enable no-unused-vars */

/**
 * Get values from items in `options` that are mapped to `key`.
 * `options` is an integration setting which is a collection
 * of type 'map', 'array', or 'mixed'
 *
 * Use cases include mapping events to pixelIds (map), sending generic
 * conversion pixels only for specific events (array), or configuring dynamic
 * mappings of event properties to query string parameters based on event (mixed)
 *
 * @api public
 * @param {Object|Object[]|String[]} options An object, array of objects, or
 * array of strings pulled from settings.mapping.
 * @param {string} key The name of the item in options whose metadata
 * we're looking for.
 * @return {Array} An array of settings that match the input `key` name.
 * @example
 *
 * // 'Map'
 * var events = { my_event: 'a4991b88' };
 * .map(events, 'My Event');
 * // => ["a4991b88"]
 * .map(events, 'whatever');
 * // => []
 *
 * // 'Array'
 * * var events = ['Completed Order', 'My Event'];
 * .map(events, 'My Event');
 * // => ["My Event"]
 * .map(events, 'whatever');
 * // => []
 *
 * // 'Mixed'
 * var events = [{ key: 'my event', value: '9b5eb1fa' }];
 * .map(events, 'my_event');
 * // => ["9b5eb1fa"]
 * .map(events, 'whatever');
 * // => []
 */

exports.map = function(options, key) {
  var normalizedComparator = normalize(key);
  var mappingType = getMappingType(options);

  if (mappingType === 'unknown') {
    return [];
  }

  return foldl(function(matchingValues, val, key) {
    var compare;
    var result;

    if (mappingType === 'map') {
      compare = key;
      result = val;
    }

    if (mappingType === 'array') {
      compare = val;
      result = val;
    }

    if (mappingType === 'mixed') {
      compare = val.key;
      result = val.value;
    }

    if (normalize(compare) === normalizedComparator) {
      matchingValues.push(result);
    }

    return matchingValues;
  }, [], options);
};

/**
 * Invoke a `method` that may or may not exist on the prototype with `args`,
 * queueing or not depending on whether the integration is "ready". Don't
 * trust the method call, since it contains integration party code.
 *
 * @api private
 * @param {string} method
 * @param {...*} args
 */

exports.invoke = function(method) {
  if (!this[method]) return;
  var args = Array.prototype.slice.call(arguments, 1);
  if (!this._ready) return this.queue(method, args);
  var ret;

  try {
    this.debug('%s with %o', method, args);
    ret = this[method].apply(this, args);
  } catch (e) {
    this.debug('error %o calling %s with %o', e, method, args);
  }

  return ret;
};

/**
 * Queue a `method` with `args`.
 *
 * @api private
 * @param {string} method
 * @param {Array} args
 */

exports.queue = function(method, args) {
  this._queue.push({ method: method, args: args });
};

/**
 * Flush the internal queue.
 *
 * @api private
 */

exports.flush = function() {
  this._ready = true;
  var self = this;

  each(function(call) {
    self[call.method].apply(self, call.args);
  }, this._queue);

  // Empty the queue.
  this._queue.length = 0;
};

/**
 * Reset the integration, removing its global variables.
 *
 * @api private
 */

exports.reset = function() {
  for (var i = 0; i < this.globals.length; i++) {
    window[this.globals[i]] = undefined;
  }

  window.onerror = onerror;
  window.onload = onload;
};

/**
 * Load a tag by `name`.
 *
 * @param {string} name The name of the tag.
 * @param {Object} locals Locals used to populate the tag's template variables
 * (e.g. `userId` in '<img src="https://whatever.com/{{ userId }}">').
 * @param {Function} [callback=noop] A callback, invoked when the tag finishes
 * loading.
 */

exports.load = function(name, locals, callback) {
  // Argument shuffling
  if (typeof name === 'function') { callback = name; locals = null; name = null; }
  if (name && typeof name === 'object') { callback = locals; locals = name; name = null; }
  if (typeof locals === 'function') { callback = locals; locals = null; }

  // Default arguments
  name = name || 'library';
  locals = locals || {};

  locals = this.locals(locals);
  var template = this.templates[name];
  if (!template) throw new Error(fmt('template "%s" not defined.', name));
  var attrs = render(template, locals);
  callback = callback || noop;
  var self = this;
  var el;

  switch (template.type) {
  case 'img':
    attrs.width = 1;
    attrs.height = 1;
    el = loadImage(attrs, callback);
    break;
  case 'script':
    el = loadScript(attrs, function(err) {
      if (!err) return callback();
      self.debug('error loading "%s" error="%s"', self.name, err);
    });
      // TODO: hack until refactoring load-script
    delete attrs.src;
    each(function(val, key) {
      el.setAttribute(key, val);
    }, attrs);
    break;
  case 'iframe':
    el = loadIframe(attrs, callback);
    break;
  default:
      // No default case
  }

  return el;
};

/**
 * Locals for tag templates.
 *
 * By default it includes a cache buster and all of the options.
 *
 * @param {Object} [locals]
 * @return {Object}
 */

exports.locals = function(locals) {
  locals = locals || {};
  var cache = Math.floor(new Date().getTime() / 3600000);
  if (!locals.hasOwnProperty('cache')) locals.cache = cache;
  each(function(val, key) {
    if (!locals.hasOwnProperty(key)) locals[key] = val;
  }, this.options);
  return locals;
};

/**
 * Simple way to emit ready.
 *
 * @api public
 */

exports.ready = function() {
  this.emit('ready');
};

/**
 * Wrap the initialize method in an exists check, so we don't have to do it for
 * every single integration.
 *
 * @api private
 */

exports._wrapInitialize = function() {
  var initialize = this.initialize;
  this.initialize = function() {
    this.debug('initialize');
    this._initialized = true;
    var ret = initialize.apply(this, arguments);
    this.emit('initialize');
    return ret;
  };
};

/**
 * Wrap the page method to call to noop the first page call if the integration assumes
 * a pageview.
 *
 * @api private
 */

exports._wrapPage = function() {
  // Noop the first page call if integration assumes pageview
  if (this._assumesPageview) return this.page = after(2, this.page);
};

/**
 * Wrap the track method to call other ecommerce methods if available depending
 * on the `track.event()`.
 *
 * @api private
 */

exports._wrapTrack = function() {
  var t = this.track;
  this.track = function(track) {
    var event = track.event();
    var called;
    var ret;

    for (var method in events) {
      if (has.call(events, method)) {
        var regexp = events[method];
        if (!this[method]) continue;
        if (!regexp.test(event)) continue;
        ret = this[method].apply(this, arguments);
        called = true;
        break;
      }
    }

    if (!called) ret = t.apply(this, arguments);
    return ret;
  };
};

/**
 * Determine the type of the option passed to `#map`
 *
 * @api private
 * @param {Object|Object[]} mapping
 * @return {String} mappingType
 */

function getMappingType(mapping) {
  if (is.array(mapping)) {
    return every(isMixed, mapping) ? 'mixed' : 'array';
  }
  if (is.object(mapping)) return 'map';
  return 'unknown';
}

/**
 * Determine if item in mapping array is a valid "mixed" type value
 *
 * Must be an object with properties "key" (of type string)
 * and "value" (of any type)
 *
 * @api private
 * @param {*} item
 * @return {Boolean}
 */

function isMixed(item) {
  if (!is.object(item)) return false;
  if (!is.string(item.key)) return false;
  if (!has.call(item, 'value')) return false;
  return true;
}

/**
 * TODO: Document me
 *
 * @api private
 * @param {Object} attrs
 * @param {Function} fn
 * @return {Image}
 */

function loadImage(attrs, fn) {
  fn = fn || function() {};
  var img = new Image();
  img.onerror = error(fn, 'failed to load pixel', img);
  img.onload = function() { fn(); };
  img.src = attrs.src;
  img.width = 1;
  img.height = 1;
  return img;
}

/**
 * TODO: Document me
 *
 * @api private
 * @param {Function} fn
 * @param {string} message
 * @param {Element} img
 * @return {Function}
 */

function error(fn, message, img) {
  return function(e) {
    e = e || window.event;
    var err = new Error(message);
    err.event = e;
    err.source = img;
    fn(err);
  };
}

/**
 * Render template + locals into an `attrs` object.
 *
 * @api private
 * @param {Object} template
 * @param {Object} locals
 * @return {Object}
 */

function render(template, locals) {
  return foldl(function(attrs, val, key) {
    attrs[key] = val.replace(/\{\{\ *(\w+)\ *\}\}/g, function(_, $1) {
      return locals[$1];
    });
    return attrs;
  }, {}, template.attrs);
}


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module Dependencies
 */

var map = __webpack_require__(41);
var foldl = __webpack_require__(21);

var eventMap = {
  // Videos
  videoPlaybackStarted: [{
    object: 'video playback',
    action: 'started'
  }],
  videoPlaybackPaused: [{
    object: 'video playback',
    action: 'paused'
  }],
  videoPlaybackInterrupted: [{
    object: 'video playback',
    action: 'interrupted'
  }],
  videoPlaybackResumed: [{
    object: 'video playback',
    action: 'resumed'
  }],
  videoPlaybackCompleted: [{
    object: 'video playback',
    action: 'completed'
  }],
  videoPlaybackBufferStarted: [{
    object: 'video playback buffer',
    action: 'started'
  }],
  videoPlaybackBufferCompleted: [{
    object: 'video playback buffer',
    action: 'completed'
  }],
  videoPlaybackSeekStarted: [{
    object: 'video playback seek',
    action: 'started'
  }],
  videoPlaybackSeekCompleted: [{
    object: 'video playback seek',
    action: 'completed'
  }],
  videoContentStarted: [{
    object: 'video content',
    action: 'started'
  }],
  videoContentPlaying: [{
    object: 'video content',
    action: 'playing'
  }],
  videoContentCompleted: [{
    object: 'video content',
    action: 'completed'
  }],
  videoAdStarted: [{
    object: 'video ad',
    action: 'started'
  }],
  videoAdPlaying: [{
    object: 'video ad',
    action: 'playing'
  }],
  videoAdCompleted: [{
    object: 'video ad',
    action: 'completed'
  }],

  // Promotions
  promotionViewed: [{
    object: 'promotion',
    action: 'viewed'
  }],
  promotionClicked: [{
    object: 'promotion',
    action: 'clicked'
  }],

  // Browsing
  productsSearched: [{
    object: 'products',
    action: 'searched'
  }],
  productListViewed: [{
    object: 'product list',
    action: 'viewed'
  }, {
    object: 'product category',
    action: 'viewed'
  }],
  productListFiltered: [{
    object: 'product list',
    action: 'filtered'
  }],

  // Core Ordering
  productClicked: [{
    object: 'product',
    action: 'clicked'
  }],
  productViewed: [{
    object: 'product',
    action: 'viewed'
  }],
  productAdded: [{
    object: 'product',
    action: 'added'
  }],
  productRemoved: [{
    object: 'product',
    action: 'removed'
  }],
  cartViewed: [{
    object: 'cart',
    action: 'viewed'
  }],
  orderUpdated: [{
    object: 'order',
    action: 'updated'
  }],
  orderCompleted: [{
    object: 'order',
    action: 'completed'
  }],
  orderRefunded: [{
    object: 'order',
    action: 'refunded'
  }],
  orderCancelled: [{
    object: 'order',
    action: 'cancelled'
  }],
  paymentInfoEntered: [{
    object: 'payment info',
    action: 'entered'
  }],
  checkoutStarted: [{
    object: 'checkout',
    action: 'started'
  }],
  checkoutStepViewed: [{
    object: 'checkout step',
    action: 'viewed'
  }],
  checkoutStepCompleted: [{
    object: 'checkout step',
    action: 'completed'
  }],

  // Coupons
  couponEntered: [{
    object: 'coupon',
    action: 'entered'
  }],
  couponApplied: [{
    object: 'coupon',
    action: 'applied'
  }],
  couponDenied: [{
    object: 'coupon',
    action: 'denied'
  }],
  couponRemoved: [{
    object: 'coupon',
    action: 'removed'
  }],

  // Wishlisting
  productAddedToWishlist: [{
    object: 'product',
    action: 'added to wishlist'
  }],
  productRemovedFromWishlist: [{
    object: 'product',
    action: 'removed from wishlist'
  }],
  productAddedFromWishlistToCart: [{
    object: 'product',
    action: 'added to cart from wishlist'
  }, {
    object: 'product',
    action: 'added from wishlist to cart'
  }],

  // Sharing
  productShared: [{
    object: 'product',
    action: 'shared'
  }],
  cartShared: [{
    object: 'cart',
    action: 'shared'
  }],

  // Reviewing
  productReviewed: [{
    object: 'product',
    action: 'reviewed'
  }],

  // App Lifecycle
  applicationInstalled: [{
    object: 'application',
    action: 'installed'
  }],
  applicationUpdated: [{
    object: 'application',
    action: 'updated'
  }],
  applicationOpened: [{
    object: 'application',
    action: 'opened'
  }],
  applicationBackgrounded: [{
    object: 'application',
    action: 'backgrounded'
  }],
  applicationUninstalled: [{
    object: 'application',
    action: 'uninstalled'
  }],

  // App Campaign and Referral Events
  installAttributed: [{
    object: 'install',
    action: 'attributed'
  }],
  deepLinkOpened: [{
    object: 'deep link',
    action: 'opened'
  }],
  pushNotificationReceived: [{
    object: 'push notification',
    action: 'received'
  }],
  pushNotificationTapped: [{
    object: 'push notification',
    action: 'tapped'
  }],
  pushNotificationBounced: [{
    object: 'push notification',
    action: 'bounced'
  }]
};

/**
 * Export the event map
 *
 * For each method
 *   - For each of its object:action alias pairs
 *     - For each permutation of that pair
 *       - Create a regex string
 *   - Join them and assign it to its respective method value
 *
 *  [{
 *    object: 'product list',
 *    action: 'viewed'
 *  },{
 *    object: 'product category',
 *    action: 'viewed'
 *  }] => /
 *    ^[ _]?product[ _]?list[ _]?viewed[ _]?
 *   |^[ _]?viewed[ _]?product[ _]?list[ _]?
 *   |^[ _]?product[ _]?category[ _]?viewed[ _]?
 *   |^[ _]?viewed[ _]?product[ _]?category[ _]?
 *   $/i
 *
 *  todo(cs/wj/nh): memoization strategy / build step?
 */

module.exports = foldl(function transform(ret, pairs, method) {
  var values = map(function(pair) {
    return map(function(permutation) {
      var flattened = [].concat.apply([], map(function(words) {
        return words.split(' ');
      }, permutation));
      return '^[ _]?' + flattened.join('[ _]?') + '[ _]?';
    }, [
      [pair.action, pair.object],
      [pair.object, pair.action]
    ]).join('|');
  }, pairs);
  var conjoined = values.join('|') + '$';
  ret[method] = new RegExp(conjoined, 'i');
  return ret;
}, {}, eventMap);


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Module dependencies.
 */

var each = __webpack_require__(1);

/**
 * Check if a predicate function returns `true` for all values in a `collection`.
 * Checks owned, enumerable values and exits early when `predicate` returns
 * `false`.
 *
 * @name every
 * @param {Function} predicate The function used to test values.
 * @param {Array|Object|string} collection The collection to search.
 * @return {boolean} True if all values passes the predicate test, otherwise false.
 * @example
 * var isEven = function(num) { return num % 2 === 0; };
 *
 * every(isEven, []); // => true
 * every(isEven, [1, 2]); // => false
 * every(isEven, [2, 4, 6]); // => true
 */
var every = function every(predicate, collection) {
  if (typeof predicate !== 'function') {
    throw new TypeError('`predicate` must be a function but was a ' + typeof predicate);
  }

  var result = true;

  each(function(val, key, collection) {
    result = !!predicate(val, key, collection);

    // Exit early
    if (!result) {
      return false;
    }
  }, collection);

  return result;
};

/*
 * Exports.
 */

module.exports = every;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// Stringifier
var toString = global.JSON && typeof JSON.stringify === 'function' ? JSON.stringify : String;

/**
 * Format the given `str`.
 *
 * @param {string} str
 * @param {...*} [args]
 * @return {string}
 */
function fmt(str) {
  var args = Array.prototype.slice.call(arguments, 1);
  var j = 0;

  return str.replace(/%([a-z])/gi, function(match, f) {
    return fmt[f] ? fmt[f](args[j++]) : match + f;
  });
}

// Formatters
fmt.o = toString;
fmt.s = String;
fmt.d = parseInt;

/*
 * Exports.
 */

module.exports = fmt;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var is = __webpack_require__(11);
var onload = __webpack_require__(43);
var tick = __webpack_require__(13);

/**
 * Expose `loadScript`.
 *
 * @param {Object} options
 * @param {Function} fn
 * @api public
 */

module.exports = function loadIframe(options, fn){
  if (!options) throw new Error('Cant load nothing...');

  // Allow for the simplest case, just passing a `src` string.
  if (is.string(options)) options = { src : options };

  var https = document.location.protocol === 'https:' ||
              document.location.protocol === 'chrome-extension:';

  // If you use protocol relative URLs, third-party scripts like Google
  // Analytics break when testing with `file:` so this fixes that.
  if (options.src && options.src.indexOf('//') === 0) {
    options.src = https ? 'https:' + options.src : 'http:' + options.src;
  }

  // Allow them to pass in different URLs depending on the protocol.
  if (https && options.https) options.src = options.https;
  else if (!https && options.http) options.src = options.http;

  // Make the `<iframe>` element and insert it before the first iframe on the
  // page, which is guaranteed to exist since this Javaiframe is running.
  var iframe = document.createElement('iframe');
  iframe.src = options.src;
  iframe.width = options.width || 1;
  iframe.height = options.height || 1;
  iframe.style.display = 'none';

  // If we have a fn, attach event handlers, even in IE. Based off of
  // the Third-Party Javascript script loading example:
  // https://github.com/thirdpartyjs/thirdpartyjs-code/blob/master/examples/templates/02/loading-files/index.html
  if (is.fn(fn)) {
    onload(iframe, fn);
  }

  tick(function(){
    // Append after event listeners are attached for IE.
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(iframe, firstScript);
  });

  // Return the iframe element in case they want to do anything special, like
  // give it an ID or attributes.
  return iframe;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Module dependencies.
 */

var onload = __webpack_require__(43);
var tick = __webpack_require__(13);
var type = __webpack_require__(10);

/**
 * Loads a script asynchronously.
 *
 * @param {Object} options
 * @param {Function} cb
 */
function loadScript(options, cb) {
  if (!options) {
    throw new Error('Can\'t load nothing...');
  }

  // Allow for the simplest case, just passing a `src` string.
  if (type(options) === 'string') {
    options = { src : options };
  }

  var https = document.location.protocol === 'https:' || document.location.protocol === 'chrome-extension:';

  // If you use protocol relative URLs, third-party scripts like Google
  // Analytics break when testing with `file:` so this fixes that.
  if (options.src && options.src.indexOf('//') === 0) {
    options.src = (https ? 'https:' : 'http:') + options.src;
  }

  // Allow them to pass in different URLs depending on the protocol.
  if (https && options.https) {
    options.src = options.https;
  } else if (!https && options.http) {
    options.src = options.http;
  }

  // Make the `<script>` element and insert it before the first script on the
  // page, which is guaranteed to exist since this Javascript is running.
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = options.src;

  // If we have a cb, attach event handlers. Does not work on < IE9 because
  // older browser versions don't register element.onerror
  if (type(cb) === 'function') {
    onload(script, cb);
  }

  tick(function() {
    // Append after event listeners are attached for IE.
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  });

  // Return the script element in case they want to do anything special, like
  // give it an ID or attributes.
  return script;
}

/*
 * Exports.
 */

module.exports = loadScript;


/***/ }),
/* 94 */
/***/ (function(module, exports) {


/**
 * Expose `toNoCase`.
 */

module.exports = toNoCase;


/**
 * Test whether a string is camel-case.
 */

var hasSpace = /\s/;
var hasSeparator = /[\W_]/;


/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

function toNoCase (string) {
  if (hasSpace.test(string)) return string.toLowerCase();
  if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase();
  return uncamelize(string).toLowerCase();
}


/**
 * Separator splitter.
 */

var separatorSplitter = /[\W_]+(.|$)/g;


/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate (string) {
  return string.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : '';
  });
}


/**
 * Camelcase splitter.
 */

var camelSplitter = /(.)([A-Z]+)/g;


/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize (string) {
  return string.replace(camelSplitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ');
  });
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var Emitter = __webpack_require__(18);
var domify = __webpack_require__(96);
var each = __webpack_require__(1);
var includes = __webpack_require__(22);

/**
 * Mix in emitter.
 */

/* eslint-disable new-cap */
Emitter(exports);
/* eslint-enable new-cap */

/**
 * Add a new option to the integration by `key` with default `value`.
 *
 * @api public
 * @param {string} key
 * @param {*} value
 * @return {Integration}
 */

exports.option = function(key, value) {
  this.prototype.defaults[key] = value;
  return this;
};

/**
 * Add a new mapping option.
 *
 * This will create a method `name` that will return a mapping for you to use.
 *
 * @api public
 * @param {string} name
 * @return {Integration}
 * @example
 * Integration('My Integration')
 *   .mapping('events');
 *
 * new MyIntegration().track('My Event');
 *
 * .track = function(track){
 *   var events = this.events(track.event());
 *   each(send, events);
 *  };
 */

exports.mapping = function(name) {
  this.option(name, []);
  this.prototype[name] = function(key) {
    return this.map(this.options[name], key);
  };
  return this;
};

/**
 * Register a new global variable `key` owned by the integration, which will be
 * used to test whether the integration is already on the page.
 *
 * @api public
 * @param {string} key
 * @return {Integration}
 */

exports.global = function(key) {
  this.prototype.globals.push(key);
  return this;
};

/**
 * Mark the integration as assuming an initial pageview, so to defer the first page call, keep track of
 * whether we already nooped the first page call.
 *
 * @api public
 * @return {Integration}
 */

exports.assumesPageview = function() {
  this.prototype._assumesPageview = true;
  return this;
};

/**
 * Mark the integration as being "ready" once `load` is called.
 *
 * @api public
 * @return {Integration}
 */

exports.readyOnLoad = function() {
  this.prototype._readyOnLoad = true;
  return this;
};

/**
 * Mark the integration as being "ready" once `initialize` is called.
 *
 * @api public
 * @return {Integration}
 */

exports.readyOnInitialize = function() {
  this.prototype._readyOnInitialize = true;
  return this;
};

/**
 * Define a tag to be loaded.
 *
 * @api public
 * @param {string} [name='library'] A nicename for the tag, commonly used in
 * #load. Helpful when the integration has multiple tags and you need a way to
 * specify which of the tags you want to load at a given time.
 * @param {String} str DOM tag as string or URL.
 * @return {Integration}
 */

exports.tag = function(name, tag) {
  if (tag == null) {
    tag = name;
    name = 'library';
  }
  this.prototype.templates[name] = objectify(tag);
  return this;
};

/**
 * Given a string, give back DOM attributes.
 *
 * Do it in a way where the browser doesn't load images or iframes. It turns
 * out domify will load images/iframes because whenever you construct those
 * DOM elements, the browser immediately loads them.
 *
 * @api private
 * @param {string} str
 * @return {Object}
 */

function objectify(str) {
  // replace `src` with `data-src` to prevent image loading
  str = str.replace(' src="', ' data-src="');

  var el = domify(str);
  var attrs = {};

  each(function(attr) {
    // then replace it back
    var name = attr.name === 'data-src' ? 'src' : attr.name;
    if (!includes(attr.name + '=', str)) return;
    attrs[name] = attr.value;
  }, el.attributes);

  return {
    type: el.tagName.toLowerCase(),
    attrs: attrs
  };
}


/***/ }),
/* 96 */
/***/ (function(module, exports) {


/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Tests for browser support.
 */

var innerHTMLBug = false;
var bugTestDiv;
if (typeof document !== 'undefined') {
  bugTestDiv = document.createElement('div');
  // Setup
  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
  // Make sure that link elements get serialized correctly by innerHTML
  // This requires a wrapper element in IE
  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
  bugTestDiv = undefined;
}

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  // for script/link/style tags to work in IE6-8, you have to wrap
  // in a div with a non-whitespace character in front, ha!
  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.polyline =
map.ellipse =
map.polygon =
map.circle =
map.text =
map.line =
map.path =
map.rect =
map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return a DOM Node instance, which could be a TextNode,
 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
 * instance, depending on the contents of the `html` string.
 *
 * @param {String} html - HTML string to "domify"
 * @param {Document} doc - The `document` instance to create the Node for
 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
 * @api private
 */

function parse(html, doc) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // default to the global `document` object
  if (!doc) doc = document;

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return doc.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = doc.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = doc.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = doc.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}


/***/ }),
/* 97 */
/***/ (function(module, exports) {


/**
 * HOP ref.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Return own keys in `obj`.
 *
 * @param {Object} obj
 * @return {Array}
 * @api public
 */

exports.keys = Object.keys || function(obj){
  var keys = [];
  for (var key in obj) {
    if (has.call(obj, key)) {
      keys.push(key);
    }
  }
  return keys;
};

/**
 * Return own values in `obj`.
 *
 * @param {Object} obj
 * @return {Array}
 * @api public
 */

exports.values = function(obj){
  var vals = [];
  for (var key in obj) {
    if (has.call(obj, key)) {
      vals.push(obj[key]);
    }
  }
  return vals;
};

/**
 * Merge `b` into `a`.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api public
 */

exports.merge = function(a, b){
  for (var key in b) {
    if (has.call(b, key)) {
      a[key] = b[key];
    }
  }
  return a;
};

/**
 * Return length of `obj`.
 *
 * @param {Object} obj
 * @return {Number}
 * @api public
 */

exports.length = function(obj){
  return exports.keys(obj).length;
};

/**
 * Check if `obj` is empty.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api public
 */

exports.isEmpty = function(obj){
  return 0 == exports.length(obj);
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var debug = __webpack_require__(99);

/**
 * Expose `generate`.
 */

module.exports = generate;

/**
 * Generate a global queue pushing method with `name`.
 *
 * @param {String} name
 * @param {Object} options
 *   @property {Boolean} wrap
 * @return {Function}
 */

function generate (name, options) {
  var log = debug('global-queue:' + name);
  options = options || {};

  return function (args) {
    args = [].slice.call(arguments);
    window[name] || (window[name] = []);
    log('%o', args);
    options.wrap === false
      ? window[name].push.apply(window[name], args)
      : window[name].push(args);
  };
}


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(100);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(42);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var type = __webpack_require__(23);

/**
 * Expose `reject`
 */

module.exports = reject;

/**
 * Reject `obj`, `fn`.
 *
 * If `fn` is omitted a default function
 * that removes nulls (undefined/null) will
 * be supplied.
 *
 * @param {Object} obj
 * @param {Function} fn
 * @return {Object}
 * @api public
 */

function reject(obj, fn){
  fn = fn || compact;
  return 'array' == type(obj)
    ? reject.array(obj, fn)
    : reject.object(obj, fn);
}

/**
 * Reject `arr`, `fn`.
 *
 * @param {Array|String} arr
 * @param {Function} fn
 * @return {Object}
 * @api public
 */

reject.array = function(arr, fn){
  var ret = [];

  for (var i = 0; i < arr.length; ++i) {
    if (!fn(arr[i], i)) ret[ret.length] = arr[i];
  }

  return ret;
};

/**
 * Reject `obj`, `fn`.
 *
 * @param {Object} obj
 * @param {Function} fn
 * @return {Object}
 * @api public
 */

reject.object = function(obj, fn){
  var ret = {};

  for (var k in obj) {
    if (obj.hasOwnProperty(k) && !fn(obj[k], k)) {
      ret[k] = obj[k]
    }
  }

  return ret;
};

/**
 * Reject `type(s)` of `obj/arr`.
 *
 * @param {Object|Array} obj
 * @param {Array|String} type(s)
 * @return {Object|Array}
 * @api public
 */

reject.types =
reject.type = function(obj, types){
  if (!Array.isArray(types)) types = [types];
  return reject(obj, function(value){
    return -1 != types.indexOf(type(value));
  });
};

/**
 * Reject `value` if it's `null` or `undefined`.
 *
 * @param {Mixed} value
 * @return {Mixed}
 * @api private
 */

function compact(value){
  return null == value;
}


/***/ }),
/* 102 */
/***/ (function(module, exports) {


/**
 * Protocol.
 */

module.exports = function (url) {
  switch (arguments.length) {
    case 0: return check();
    case 1: return transform(url);
  }
};


/**
 * Transform a protocol-relative `url` to the use the proper protocol.
 *
 * @param {String} url
 * @return {String}
 */

function transform (url) {
  return check() ? 'https:' + url : 'http:' + url;
}


/**
 * Check whether `https:` be used for loading scripts.
 *
 * @return {Boolean}
 */

function check () {
  return (
    location.protocol == 'https:' ||
    location.protocol == 'chrome-extension:'
  );
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzNWE4YjA1OGQ1MDIzMzhjNGY3MiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2VnbWVudGlvLWZhY2FkZS9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BuZGhvdWxlL2VhY2gvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlYnVnL2RlYnVnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbmRob3VsZS9kZWZhdWx0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zZWdtZW50aW8tZmFjYWRlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2VnbWVudGlvLWZhY2FkZS9saWIvZmFjYWRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbmRob3VsZS9jbG9uZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmluZC1hbGwvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vYmotY2FzZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LXR5cGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy1lbWFpbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC10aWNrL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25ldy1kYXRlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2VnbWVudGlvLWZhY2FkZS9saWIvdHJhY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9hbmFseXRpY3MuanMtY29yZS9saWIvY29va2llLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21wb25lbnQtY29va2llL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbmRob3VsZS9mb2xkbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG5kaG91bGUvaW5jbHVkZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3R5cGUtY29tcG9uZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9pc29kYXRlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvaXNvZGF0ZS10cmF2ZXJzZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1lYWNoL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21wb25lbnQtZWFjaC9ub2RlX21vZHVsZXMvY29tcG9uZW50LXR5cGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1wcm9wcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2VnbWVudGlvLWZhY2FkZS9saWIvaWRlbnRpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RyaW0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NlZ21lbnRpby1mYWNhZGUvbGliL3BhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BuZGhvdWxlL2FmdGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21wb25lbnQtYmluZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanNvbjMvbGliL2pzb24zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21wb25lbnQtdXJsL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbmRob3VsZS9rZXlzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9hbmFseXRpY3MuanMtY29yZS9saWIvZW50aXR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbmRob3VsZS9leHRlbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L2FuYWx5dGljcy5qcy1jb3JlL2xpYi9tZW1vcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L2FuYWx5dGljcy5qcy1jb3JlL2xpYi9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG5kaG91bGUvbWFwL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2NyaXB0LW9ubG9hZC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FuYWx5dGljc2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hbmFseXRpY3Nqcy9saWJyYXJ5L2FuYWx5dGljcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvYW5hbHl0aWNzLmpzLWNvcmUvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9hbmFseXRpY3MuanMtY29yZS9saWIvYW5hbHl0aWNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zZWdtZW50aW8tZmFjYWRlL2xpYi9hZGRyZXNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zZWdtZW50aW8tZmFjYWRlL2xpYi9pcy1lbmFibGVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZXctZGF0ZS9saWIvbWlsbGlzZWNvbmRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZXctZGF0ZS9saWIvc2Vjb25kcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG8tZnVuY3Rpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NlZ21lbnRpby1mYWNhZGUvbGliL2FsaWFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zZWdtZW50aW8tZmFjYWRlL2xpYi9ncm91cC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2VnbWVudGlvLWZhY2FkZS9saWIvc2NyZWVuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbmRob3VsZS9hcml0eS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG5kaG91bGUvZHJvcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQG5kaG91bGUvcmVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvdG9wLWRvbWFpbi9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L2FuYWx5dGljcy5qcy1jb3JlL2xpYi9ncm91cC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvc3RvcmUvc3JjL3N0b3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9pcy1tZXRhL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvYW5hbHl0aWNzLmpzLWNvcmUvbGliL25vcm1hbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWV2ZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9hbmFseXRpY3MuanMtY29yZS9saWIvcGFnZURlZmF1bHRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9jYW5vbmljYWwvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AbmRob3VsZS9waWNrL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9wcmV2ZW50LWRlZmF1bHQvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb21wb25lbnQtcXVlcnlzdHJpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1xdWVyeXN0cmluZy9ub2RlX21vZHVsZXMvY29tcG9uZW50LXR5cGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L2FuYWx5dGljcy5qcy1jb3JlL2xpYi91c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL3V1aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvcm5nLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L2FuYWx5dGljcy5qcy1jb3JlL3BhY2thZ2UuanNvbiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYW5hbHl0aWNzanMvbGlicmFyeS9hbmFseXRpY3NBY3Rpb25zLmpzIiwid2VicGFjazovLy8uL2FuYWx5dGljcy1jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L2FuYWx5dGljcy5qcy1pbnRlZ3JhdGlvbi1nb29nbGUtYW5hbHl0aWNzL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvYW5hbHl0aWNzLmpzLWludGVncmF0aW9uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvYW5hbHl0aWNzLmpzLWludGVncmF0aW9uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvYW5hbHl0aWNzLmpzLWludGVncmF0aW9uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NsdWctY29tcG9uZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9hbmFseXRpY3MuanMtaW50ZWdyYXRpb24vbGliL3Byb3Rvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYW5hbHl0aWNzLWV2ZW50cy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BuZGhvdWxlL2V2ZXJ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9mbXQvbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9sb2FkLWlmcmFtZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvbG9hZC1zY3JpcHQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RvLW5vLWNhc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L2FuYWx5dGljcy5qcy1pbnRlZ3JhdGlvbi9saWIvc3RhdGljcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZG9taWZ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vYmplY3QtY29tcG9uZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbG9iYWwtcXVldWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsb2JhbC1xdWV1ZS9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsb2JhbC1xdWV1ZS9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2RlYnVnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3VzZS1odHRwcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNE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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDbkJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBLFdBQVcsTUFBTTtBQUNqQixXQUFXLE1BQU07QUFDakIsWUFBWSxRQUFRO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxNQUFNO0FBQ2pCLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFlBQVksUUFBUTtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQixZQUFZLFFBQVE7QUFDcEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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Q0FBQzs7Ozs7Ozs7QUMvREQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7OztBQ3ZMdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxtQkFBbUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGdCQUFnQixPQUFPO0FBQ3ZCLGdCQUFnQixPQUFPO0FBQ3ZCLGdCQUFnQixPQUFPO0FBQ3ZCLGdCQUFnQixPQUFPO0FBQ3ZCLGdCQUFnQixPQUFPO0FBQ3ZCLFdBQVcsT0FBTztBQUNsQixnQkFBZ0Isa0JBQWtCO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFB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O0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ3JMQTs7QUFFQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFOzs7Ozs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNWQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQywwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsc0JBQXNCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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RUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQyxFQUFFLGFBQWEsRUFBRTtBQUNqRDtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUcsSUFBSTtBQUNQOzs7Ozs7OztBQ25kQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7O0FDdkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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aXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi4vXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNDQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDM1YThiMDU4ZDUwMjMzOGM0ZjcyIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmluaGVyaXQgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuZXhwb3J0cy5jbG9uZSA9IHJlcXVpcmUoJ0BuZGhvdWxlL2Nsb25lJyk7XG5leHBvcnRzLnR5cGUgPSByZXF1aXJlKCd0eXBlLWNvbXBvbmVudCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2VnbWVudGlvLWZhY2FkZS9saWIvdXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIga2V5cyA9IHJlcXVpcmUoJ0BuZGhvdWxlL2tleXMnKTtcblxudmFyIG9ialRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBUZXN0cyBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICpcbiAqIEBuYW1lIGlzTnVtYmVyXG4gKiBAYXBpIHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHJldHVybiB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbGAgaXMgYSBudW1iZXIsIG90aGVyd2lzZSBgZmFsc2VgLlxuICovXG4vLyBUT0RPOiBNb3ZlIHRvIGxpYnJhcnlcbnZhciBpc051bWJlciA9IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gIHJldHVybiB0eXBlID09PSAnbnVtYmVyJyB8fCAodHlwZSA9PT0gJ29iamVjdCcgJiYgb2JqVG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBOdW1iZXJdJyk7XG59O1xuXG4vKipcbiAqIFRlc3RzIGlmIGEgdmFsdWUgaXMgYW4gYXJyYXkuXG4gKlxuICogQG5hbWUgaXNBcnJheVxuICogQGFwaSBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhbiBhcnJheSwgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gKi9cbi8vIFRPRE86IE1vdmUgdG8gbGlicmFyeVxudmFyIGlzQXJyYXkgPSB0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ2Z1bmN0aW9uJyA/IEFycmF5LmlzQXJyYXkgOiBmdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gb2JqVG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiBhIHZhbHVlIGlzIGFycmF5LWxpa2UuIEFycmF5LWxpa2UgbWVhbnMgdGhlIHZhbHVlIGlzIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBudW1lcmljXG4gKiBgLmxlbmd0aGAgcHJvcGVydHkuXG4gKlxuICogQG5hbWUgaXNBcnJheUxpa2VcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbi8vIFRPRE86IE1vdmUgdG8gbGlicmFyeVxudmFyIGlzQXJyYXlMaWtlID0gZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiAoaXNBcnJheSh2YWwpIHx8ICh2YWwgIT09ICdmdW5jdGlvbicgJiYgaXNOdW1iZXIodmFsLmxlbmd0aCkpKTtcbn07XG5cbi8qKlxuICogSW50ZXJuYWwgaW1wbGVtZW50YXRpb24gb2YgYGVhY2hgLiBXb3JrcyBvbiBhcnJheXMgYW5kIGFycmF5LWxpa2UgZGF0YSBzdHJ1Y3R1cmVzLlxuICpcbiAqIEBuYW1lIGFycmF5RWFjaFxuICogQGFwaSBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9uKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pfSBpdGVyYXRvciBUaGUgZnVuY3Rpb24gdG8gaW52b2tlIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkoLWxpa2UpIHN0cnVjdHVyZSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gKi9cbnZhciBhcnJheUVhY2ggPSBmdW5jdGlvbiBhcnJheUVhY2goaXRlcmF0b3IsIGFycmF5KSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAvLyBCcmVhayBpdGVyYXRpb24gZWFybHkgaWYgYGl0ZXJhdG9yYCByZXR1cm5zIGBmYWxzZWBcbiAgICBpZiAoaXRlcmF0b3IoYXJyYXlbaV0sIGksIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBJbnRlcm5hbCBpbXBsZW1lbnRhdGlvbiBvZiBgZWFjaGAuIFdvcmtzIG9uIG9iamVjdHMuXG4gKlxuICogQG5hbWUgYmFzZUVhY2hcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKX0gaXRlcmF0b3IgVGhlIGZ1bmN0aW9uIHRvIGludm9rZSBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAqL1xudmFyIGJhc2VFYWNoID0gZnVuY3Rpb24gYmFzZUVhY2goaXRlcmF0b3IsIG9iamVjdCkge1xuICB2YXIga3MgPSBrZXlzKG9iamVjdCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIC8vIEJyZWFrIGl0ZXJhdGlvbiBlYXJseSBpZiBgaXRlcmF0b3JgIHJldHVybnMgYGZhbHNlYFxuICAgIGlmIChpdGVyYXRvcihvYmplY3Rba3NbaV1dLCBrc1tpXSwgb2JqZWN0KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gaW5wdXQgY29sbGVjdGlvbiwgaW52b2tpbmcgYW4gYGl0ZXJhdG9yYCBmdW5jdGlvbiBmb3IgZWFjaCBlbGVtZW50IGluIHRoZVxuICogY29sbGVjdGlvbiBhbmQgcGFzc2luZyB0byBpdCB0aHJlZSBhcmd1bWVudHM6IGAodmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKWAuIFRoZSBgaXRlcmF0b3JgXG4gKiBmdW5jdGlvbiBjYW4gZW5kIGl0ZXJhdGlvbiBlYXJseSBieSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAbmFtZSBlYWNoXG4gKiBAYXBpIHB1YmxpY1xuICogQHBhcmFtIHtGdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKX0gaXRlcmF0b3IgVGhlIGZ1bmN0aW9uIHRvIGludm9rZSBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtBcnJheXxPYmplY3R8c3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gQmVjYXVzZSBgZWFjaGAgaXMgcnVuIG9ubHkgZm9yIHNpZGUgZWZmZWN0cywgYWx3YXlzIHJldHVybnMgYHVuZGVmaW5lZGAuXG4gKiBAZXhhbXBsZVxuICogdmFyIGxvZyA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gKlxuICogZWFjaChsb2csIFsnYScsICdiJywgJ2MnXSk7XG4gKiAvLy0+ICdhJywgMCwgWydhJywgJ2InLCAnYyddXG4gKiAvLy0+ICdiJywgMSwgWydhJywgJ2InLCAnYyddXG4gKiAvLy0+ICdjJywgMiwgWydhJywgJ2InLCAnYyddXG4gKiAvLz0+IHVuZGVmaW5lZFxuICpcbiAqIGVhY2gobG9nLCAndGltJyk7XG4gKiAvLy0+ICd0JywgMiwgJ3RpbSdcbiAqIC8vLT4gJ2knLCAxLCAndGltJ1xuICogLy8tPiAnbScsIDAsICd0aW0nXG4gKiAvLz0+IHVuZGVmaW5lZFxuICpcbiAqIC8vIE5vdGU6IEl0ZXJhdGlvbiBvcmRlciBub3QgZ3VhcmFudGVlZCBhY3Jvc3MgZW52aXJvbm1lbnRzXG4gKiBlYWNoKGxvZywgeyBuYW1lOiAndGltJywgb2NjdXBhdGlvbjogJ2VuY2hhbnRlcicgfSk7XG4gKiAvLy0+ICd0aW0nLCAnbmFtZScsIHsgbmFtZTogJ3RpbScsIG9jY3VwYXRpb246ICdlbmNoYW50ZXInIH1cbiAqIC8vLT4gJ2VuY2hhbnRlcicsICdvY2N1cGF0aW9uJywgeyBuYW1lOiAndGltJywgb2NjdXBhdGlvbjogJ2VuY2hhbnRlcicgfVxuICogLy89PiB1bmRlZmluZWRcbiAqL1xudmFyIGVhY2ggPSBmdW5jdGlvbiBlYWNoKGl0ZXJhdG9yLCBjb2xsZWN0aW9uKSB7XG4gIHJldHVybiAoaXNBcnJheUxpa2UoY29sbGVjdGlvbikgPyBhcnJheUVhY2ggOiBiYXNlRWFjaCkuY2FsbCh0aGlzLCBpdGVyYXRvciwgY29sbGVjdGlvbik7XG59O1xuXG4vKlxuICogRXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVhY2g7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AbmRob3VsZS9lYWNoL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJ1ZztcblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge1R5cGV9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRlYnVnKG5hbWUpIHtcbiAgaWYgKCFkZWJ1Zy5lbmFibGVkKG5hbWUpKSByZXR1cm4gZnVuY3Rpb24oKXt9O1xuXG4gIHJldHVybiBmdW5jdGlvbihmbXQpe1xuICAgIGZtdCA9IGNvZXJjZShmbXQpO1xuXG4gICAgdmFyIGN1cnIgPSBuZXcgRGF0ZTtcbiAgICB2YXIgbXMgPSBjdXJyIC0gKGRlYnVnW25hbWVdIHx8IGN1cnIpO1xuICAgIGRlYnVnW25hbWVdID0gY3VycjtcblxuICAgIGZtdCA9IG5hbWVcbiAgICAgICsgJyAnXG4gICAgICArIGZtdFxuICAgICAgKyAnICsnICsgZGVidWcuaHVtYW5pemUobXMpO1xuXG4gICAgLy8gVGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRThcbiAgICAvLyB3aGVyZSBgY29uc29sZS5sb2dgIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG4gICAgd2luZG93LmNvbnNvbGVcbiAgICAgICYmIGNvbnNvbGUubG9nXG4gICAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMuXG4gKi9cblxuZGVidWcubmFtZXMgPSBbXTtcbmRlYnVnLnNraXBzID0gW107XG5cbi8qKlxuICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZS4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5kZWJ1Zy5lbmFibGUgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHRyeSB7XG4gICAgbG9jYWxTdG9yYWdlLmRlYnVnID0gbmFtZTtcbiAgfSBjYXRjaChlKXt9XG5cbiAgdmFyIHNwbGl0ID0gKG5hbWUgfHwgJycpLnNwbGl0KC9bXFxzLF0rLylcbiAgICAsIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgbmFtZSA9IHNwbGl0W2ldLnJlcGxhY2UoJyonLCAnLio/Jyk7XG4gICAgaWYgKG5hbWVbMF0gPT09ICctJykge1xuICAgICAgZGVidWcuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWUuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZGVidWcubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWUgKyAnJCcpKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5kZWJ1Zy5kaXNhYmxlID0gZnVuY3Rpb24oKXtcbiAgZGVidWcuZW5hYmxlKCcnKTtcbn07XG5cbi8qKlxuICogSHVtYW5pemUgdGhlIGdpdmVuIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1cbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmRlYnVnLmh1bWFuaXplID0gZnVuY3Rpb24obXMpIHtcbiAgdmFyIHNlYyA9IDEwMDBcbiAgICAsIG1pbiA9IDYwICogMTAwMFxuICAgICwgaG91ciA9IDYwICogbWluO1xuXG4gIGlmIChtcyA+PSBob3VyKSByZXR1cm4gKG1zIC8gaG91cikudG9GaXhlZCgxKSArICdoJztcbiAgaWYgKG1zID49IG1pbikgcmV0dXJuIChtcyAvIG1pbikudG9GaXhlZCgxKSArICdtJztcbiAgaWYgKG1zID49IHNlYykgcmV0dXJuIChtcyAvIHNlYyB8IDApICsgJ3MnO1xuICByZXR1cm4gbXMgKyAnbXMnO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmRlYnVnLmVuYWJsZWQgPSBmdW5jdGlvbihuYW1lKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBkZWJ1Zy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChkZWJ1Zy5za2lwc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBkZWJ1Zy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChkZWJ1Zy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKi9cblxuZnVuY3Rpb24gY29lcmNlKHZhbCkge1xuICBpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG4gIHJldHVybiB2YWw7XG59XG5cbi8vIHBlcnNpc3RcblxudHJ5IHtcbiAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIGRlYnVnLmVuYWJsZShsb2NhbFN0b3JhZ2UuZGVidWcpO1xufSBjYXRjaChlKXt9XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kZWJ1Zy9kZWJ1Zy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBkcm9wID0gcmVxdWlyZSgnQG5kaG91bGUvZHJvcCcpO1xudmFyIHJlc3QgPSByZXF1aXJlKCdAbmRob3VsZS9yZXN0Jyk7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIG9ialRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiBhIHZhbHVlIGlzIGFuIG9iamVjdCwgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gKlxuICogQG5hbWUgaXNPYmplY3RcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG4vLyBUT0RPOiBNb3ZlIHRvIGEgbGlicmFyeVxudmFyIGlzT2JqZWN0ID0gZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIEJvb2xlYW4odmFsdWUpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3QsIG90aGVyd2lzZSBgZmFsc2VgLlxuICpcbiAqIEBuYW1lIGlzUGxhaW5PYmplY3RcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG4vLyBUT0RPOiBNb3ZlIHRvIGEgbGlicmFyeVxudmFyIGlzUGxhaW5PYmplY3QgPSBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBCb29sZWFuKHZhbHVlKSAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59O1xuXG4vKipcbiAqIEFzc2lnbnMgYSBrZXktdmFsdWUgcGFpciB0byBhIHRhcmdldCBvYmplY3Qgd2hlbiB0aGUgdmFsdWUgYXNzaWduZWQgaXMgb3duZWQsXG4gKiBhbmQgd2hlcmUgdGFyZ2V0W2tleV0gaXMgdW5kZWZpbmVkLlxuICpcbiAqIEBuYW1lIHNoYWxsb3dDb21iaW5lclxuICogQGFwaSBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKi9cbnZhciBzaGFsbG93Q29tYmluZXIgPSBmdW5jdGlvbiBzaGFsbG93Q29tYmluZXIodGFyZ2V0LCBzb3VyY2UsIHZhbHVlLCBrZXkpIHtcbiAgaWYgKGhhcy5jYWxsKHNvdXJjZSwga2V5KSAmJiB0YXJnZXRba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGFyZ2V0W2tleV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gc291cmNlO1xufTtcblxuLyoqXG4gKiBBc3NpZ25zIGEga2V5LXZhbHVlIHBhaXIgdG8gYSB0YXJnZXQgb2JqZWN0IHdoZW4gdGhlIHZhbHVlIGFzc2lnbmVkIGlzIG93bmVkLFxuICogYW5kIHdoZXJlIHRhcmdldFtrZXldIGlzIHVuZGVmaW5lZDsgYWxzbyBtZXJnZXMgb2JqZWN0cyByZWN1cnNpdmVseS5cbiAqXG4gKiBAbmFtZSBkZWVwQ29tYmluZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG52YXIgZGVlcENvbWJpbmVyID0gZnVuY3Rpb24odGFyZ2V0LCBzb3VyY2UsIHZhbHVlLCBrZXkpIHtcbiAgaWYgKGhhcy5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHRhcmdldFtrZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IGRlZmF1bHRzRGVlcCh0YXJnZXRba2V5XSwgdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0W2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzb3VyY2U7XG59O1xuXG4vKipcbiAqIFRPRE86IERvY3VtZW50XG4gKlxuICogQG5hbWUgZGVmYXVsdHNXaXRoXG4gKiBAYXBpIHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbWJpbmVyXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0gey4uLk9iamVjdH0gc291cmNlc1xuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm4gdGhlIGlucHV0IGB0YXJnZXRgLlxuICovXG52YXIgZGVmYXVsdHNXaXRoID0gZnVuY3Rpb24oY29tYmluZXIsIHRhcmdldCAvKiwgLi4uc291cmNlcyAqLykge1xuICBpZiAoIWlzT2JqZWN0KHRhcmdldCkpIHtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG5cbiAgY29tYmluZXIgPSBjb21iaW5lciB8fCBzaGFsbG93Q29tYmluZXI7XG4gIHZhciBzb3VyY2VzID0gZHJvcCgyLCBhcmd1bWVudHMpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2VzW2ldKSB7XG4gICAgICBjb21iaW5lcih0YXJnZXQsIHNvdXJjZXNbaV0sIHNvdXJjZXNbaV1ba2V5XSwga2V5KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuLyoqXG4gKiBDb3BpZXMgb3duZWQsIGVudW1lcmFibGUgcHJvcGVydGllcyBmcm9tIGEgc291cmNlIG9iamVjdChzKSB0byBhIHRhcmdldFxuICogb2JqZWN0IHdoZW4gdGhlIHZhbHVlIG9mIHRoYXQgcHJvcGVydHkgb24gdGhlIHNvdXJjZSBvYmplY3QgaXMgYHVuZGVmaW5lZGAuXG4gKiBSZWN1cnNlcyBvbiBvYmplY3RzLlxuICpcbiAqIEBuYW1lIGRlZmF1bHRzRGVlcFxuICogQGFwaSBwdWJsaWNcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBzb3VyY2VzXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBpbnB1dCBgdGFyZ2V0YC5cbiAqL1xudmFyIGRlZmF1bHRzRGVlcCA9IGZ1bmN0aW9uIGRlZmF1bHRzRGVlcCh0YXJnZXQgLyosIHNvdXJjZXMgKi8pIHtcbiAgLy8gVE9ETzogUmVwbGFjZSB3aXRoIGBwYXJ0aWFsYCBjYWxsP1xuICByZXR1cm4gZGVmYXVsdHNXaXRoLmFwcGx5KG51bGwsIFtkZWVwQ29tYmluZXIsIHRhcmdldF0uY29uY2F0KHJlc3QoYXJndW1lbnRzKSkpO1xufTtcblxuLyoqXG4gKiBDb3BpZXMgb3duZWQsIGVudW1lcmFibGUgcHJvcGVydGllcyBmcm9tIGEgc291cmNlIG9iamVjdChzKSB0byBhIHRhcmdldFxuICogb2JqZWN0IHdoZW4gdGhlIHZhbHVlIG9mIHRoYXQgcHJvcGVydHkgb24gdGhlIHNvdXJjZSBvYmplY3QgaXMgYHVuZGVmaW5lZGAuXG4gKlxuICogQG5hbWUgZGVmYXVsdHNcbiAqIEBhcGkgcHVibGljXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0gey4uLk9iamVjdH0gc291cmNlc1xuICogQHJldHVybiB7T2JqZWN0fVxuICogQGV4YW1wbGVcbiAqIHZhciBhID0geyBhOiAxIH07XG4gKiB2YXIgYiA9IHsgYTogMiwgYjogMiB9O1xuICpcbiAqIGRlZmF1bHRzKGEsIGIpO1xuICogY29uc29sZS5sb2coYSk7IC8vPT4geyBhOiAxLCBiOiAyIH1cbiAqL1xudmFyIGRlZmF1bHRzID0gZnVuY3Rpb24odGFyZ2V0IC8qLCAuLi5zb3VyY2VzICovKSB7XG4gIC8vIFRPRE86IFJlcGxhY2Ugd2l0aCBgcGFydGlhbGAgY2FsbD9cbiAgcmV0dXJuIGRlZmF1bHRzV2l0aC5hcHBseShudWxsLCBbbnVsbCwgdGFyZ2V0XS5jb25jYXQocmVzdChhcmd1bWVudHMpKSk7XG59O1xuXG4vKlxuICogRXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xubW9kdWxlLmV4cG9ydHMuZGVlcCA9IGRlZmF1bHRzRGVlcDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BuZGhvdWxlL2RlZmF1bHRzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBGYWNhZGUgPSByZXF1aXJlKCcuL2ZhY2FkZScpO1xuXG4vKipcbiAqIEV4cG9zZSBzcGVjaWZpYy1tZXRob2QgZmFjYWRlcy5cbiAqL1xuXG5GYWNhZGUuQWxpYXMgPSByZXF1aXJlKCcuL2FsaWFzJyk7XG5GYWNhZGUuR3JvdXAgPSByZXF1aXJlKCcuL2dyb3VwJyk7XG5GYWNhZGUuSWRlbnRpZnkgPSByZXF1aXJlKCcuL2lkZW50aWZ5Jyk7XG5GYWNhZGUuVHJhY2sgPSByZXF1aXJlKCcuL3RyYWNrJyk7XG5GYWNhZGUuUGFnZSA9IHJlcXVpcmUoJy4vcGFnZScpO1xuRmFjYWRlLlNjcmVlbiA9IHJlcXVpcmUoJy4vc2NyZWVuJyk7XG5cbi8qKlxuICogRXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZhY2FkZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NlZ21lbnRpby1mYWNhZGUvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFkZHJlc3MgPSByZXF1aXJlKCcuL2FkZHJlc3MnKTtcbnZhciBjbG9uZSA9IHJlcXVpcmUoJy4vdXRpbHMnKS5jbG9uZTtcbnZhciBpc0VuYWJsZWQgPSByZXF1aXJlKCcuL2lzLWVuYWJsZWQnKTtcbnZhciBuZXdEYXRlID0gcmVxdWlyZSgnbmV3LWRhdGUnKTtcbnZhciBvYmpDYXNlID0gcmVxdWlyZSgnb2JqLWNhc2UnKTtcbnZhciB0cmF2ZXJzZSA9IHJlcXVpcmUoJ0BzZWdtZW50L2lzb2RhdGUtdHJhdmVyc2UnKTtcbnZhciB0eXBlID0gcmVxdWlyZSgnLi91dGlscycpLnR5cGU7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRmFjYWRlYCB3aXRoIGFuIGBvYmpgIG9mIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICovXG5mdW5jdGlvbiBGYWNhZGUob2JqLCBvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuICBpZiAoISgnY2xvbmUnIGluIG9wdHMpKSBvcHRzLmNsb25lID0gdHJ1ZTtcbiAgaWYgKG9wdHMuY2xvbmUpIG9iaiA9IGNsb25lKG9iaik7XG4gIGlmICghKCd0cmF2ZXJzZScgaW4gb3B0cykpIG9wdHMudHJhdmVyc2UgPSB0cnVlO1xuICBpZiAoISgndGltZXN0YW1wJyBpbiBvYmopKSBvYmoudGltZXN0YW1wID0gbmV3IERhdGUoKTtcbiAgZWxzZSBvYmoudGltZXN0YW1wID0gbmV3RGF0ZShvYmoudGltZXN0YW1wKTtcbiAgaWYgKG9wdHMudHJhdmVyc2UpIHRyYXZlcnNlKG9iaik7XG4gIHRoaXMub3B0cyA9IG9wdHM7XG4gIHRoaXMub2JqID0gb2JqO1xufVxuXG4vKipcbiAqIE1peGluIGFkZHJlc3MgdHJhaXRzLlxuICovXG5cbmFkZHJlc3MoRmFjYWRlLnByb3RvdHlwZSk7XG5cbi8qKlxuICogUmV0dXJuIGEgcHJveHkgZnVuY3Rpb24gZm9yIGEgYGZpZWxkYCB0aGF0IHdpbGwgYXR0ZW1wdCB0byBmaXJzdCB1c2UgbWV0aG9kcyxcbiAqIGFuZCBmYWxsYmFjayB0byBhY2Nlc3NpbmcgdGhlIHVuZGVybHlpbmcgb2JqZWN0IGRpcmVjdGx5LiBZb3UgY2FuIHNwZWNpZnlcbiAqIGRlZXBseSBuZXN0ZWQgZmllbGRzIHRvbyBsaWtlOlxuICpcbiAqICAgdGhpcy5wcm94eSgnb3B0aW9ucy5MaWJyYXRvJyk7XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZpZWxkXG4gKi9cbkZhY2FkZS5wcm90b3R5cGUucHJveHkgPSBmdW5jdGlvbihmaWVsZCkge1xuICB2YXIgZmllbGRzID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgZmllbGQgPSBmaWVsZHMuc2hpZnQoKTtcblxuICAvLyBDYWxsIGEgZnVuY3Rpb24gYXQgdGhlIGJlZ2lubmluZyB0byB0YWtlIGFkdmFudGFnZSBvZiBmYWNhZGVkIGZpZWxkc1xuICB2YXIgb2JqID0gdGhpc1tmaWVsZF0gfHwgdGhpcy5maWVsZChmaWVsZCk7XG4gIGlmICghb2JqKSByZXR1cm4gb2JqO1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykgb2JqID0gb2JqLmNhbGwodGhpcykgfHwge307XG4gIGlmIChmaWVsZHMubGVuZ3RoID09PSAwKSByZXR1cm4gdGhpcy5vcHRzLmNsb25lID8gdHJhbnNmb3JtKG9iaikgOiBvYmo7XG5cbiAgb2JqID0gb2JqQ2FzZShvYmosIGZpZWxkcy5qb2luKCcuJykpO1xuICByZXR1cm4gdGhpcy5vcHRzLmNsb25lID8gdHJhbnNmb3JtKG9iaikgOiBvYmo7XG59O1xuXG4vKipcbiAqIERpcmVjdGx5IGFjY2VzcyBhIHNwZWNpZmljIGBmaWVsZGAgZnJvbSB0aGUgdW5kZXJseWluZyBvYmplY3QsIHJldHVybmluZyBhXG4gKiBjbG9uZSBzbyBvdXRzaWRlcnMgZG9uJ3QgbWVzcyB3aXRoIHN0dWZmLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7Kn1cbiAqL1xuRmFjYWRlLnByb3RvdHlwZS5maWVsZCA9IGZ1bmN0aW9uKGZpZWxkKSB7XG4gIHZhciBvYmogPSB0aGlzLm9ialtmaWVsZF07XG4gIHJldHVybiB0aGlzLm9wdHMuY2xvbmUgPyB0cmFuc2Zvcm0ob2JqKSA6IG9iajtcbn07XG5cbi8qKlxuICogVXRpbGl0eSBtZXRob2QgdG8gYWx3YXlzIHByb3h5IGEgcGFydGljdWxhciBgZmllbGRgLiBZb3UgY2FuIHNwZWNpZnkgZGVlcGx5XG4gKiBuZXN0ZWQgZmllbGRzIHRvbyBsaWtlOlxuICpcbiAqICAgRmFjYWRlLnByb3h5KCdvcHRpb25zLkxpYnJhdG8nKTtcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5GYWNhZGUucHJveHkgPSBmdW5jdGlvbihmaWVsZCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJveHkoZmllbGQpO1xuICB9O1xufTtcblxuLyoqXG4gKiBVdGlsaXR5IG1ldGhvZCB0byBkaXJlY3RseSBhY2Nlc3MgYSBgZmllbGRgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbkZhY2FkZS5maWVsZCA9IGZ1bmN0aW9uKGZpZWxkKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5maWVsZChmaWVsZCk7XG4gIH07XG59O1xuXG4vKipcbiAqIFByb3h5IG11bHRpcGxlIGBwYXRoYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aFxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cbkZhY2FkZS5tdWx0aSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBtdWx0aSA9IHRoaXMucHJveHkocGF0aCArICdzJyk7XG4gICAgaWYgKHR5cGUobXVsdGkpID09PSAnYXJyYXknKSByZXR1cm4gbXVsdGk7XG4gICAgdmFyIG9uZSA9IHRoaXMucHJveHkocGF0aCk7XG4gICAgaWYgKG9uZSkgb25lID0gW3RoaXMub3B0cy5jbG9uZSA/IGNsb25lKG9uZSkgOiBvbmVdO1xuICAgIHJldHVybiBvbmUgfHwgW107XG4gIH07XG59O1xuXG4vKipcbiAqIFByb3h5IG9uZSBgcGF0aGAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAqIEByZXR1cm4geyp9XG4gKi9cbkZhY2FkZS5vbmUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgb25lID0gdGhpcy5wcm94eShwYXRoKTtcbiAgICBpZiAob25lKSByZXR1cm4gb25lO1xuICAgIHZhciBtdWx0aSA9IHRoaXMucHJveHkocGF0aCArICdzJyk7XG4gICAgaWYgKHR5cGUobXVsdGkpID09PSAnYXJyYXknKSByZXR1cm4gbXVsdGlbMF07XG4gIH07XG59O1xuXG4vKipcbiAqIEdldCB0aGUgYmFzaWMganNvbiBvYmplY3Qgb2YgdGhpcyBmYWNhZGUuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5GYWNhZGUucHJvdG90eXBlLmpzb24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJldCA9IHRoaXMub3B0cy5jbG9uZSA/IGNsb25lKHRoaXMub2JqKSA6IHRoaXMub2JqO1xuICBpZiAodGhpcy50eXBlKSByZXQudHlwZSA9IHRoaXMudHlwZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIG9wdGlvbnMgb2YgYSBjYWxsIChmb3JtZXJseSBjYWxsZWQgXCJjb250ZXh0XCIpLiBJZiB5b3UgcGFzcyBhblxuICogaW50ZWdyYXRpb24gbmFtZSwgaXQgd2lsbCBnZXQgdGhlIG9wdGlvbnMgZm9yIHRoYXQgc3BlY2lmaWMgaW50ZWdyYXRpb24sIG9yXG4gKiB1bmRlZmluZWQgaWYgdGhlIGludGVncmF0aW9uIGlzIG5vdCBlbmFibGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbaW50ZWdyYXRpb25dXG4gKiBAcmV0dXJuIHtPYmplY3Qgb3IgTnVsbH1cbiAqL1xuRmFjYWRlLnByb3RvdHlwZS5vcHRpb25zID0gZnVuY3Rpb24oaW50ZWdyYXRpb24pIHtcbiAgdmFyIG9iaiA9IHRoaXMub2JqLm9wdGlvbnMgfHwgdGhpcy5vYmouY29udGV4dCB8fCB7fTtcbiAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdHMuY2xvbmUgPyBjbG9uZShvYmopIDogb2JqO1xuICBpZiAoIWludGVncmF0aW9uKSByZXR1cm4gb3B0aW9ucztcbiAgaWYgKCF0aGlzLmVuYWJsZWQoaW50ZWdyYXRpb24pKSByZXR1cm47XG4gIHZhciBpbnRlZ3JhdGlvbnMgPSB0aGlzLmludGVncmF0aW9ucygpO1xuICB2YXIgdmFsdWUgPSBpbnRlZ3JhdGlvbnNbaW50ZWdyYXRpb25dIHx8IG9iakNhc2UoaW50ZWdyYXRpb25zLCBpbnRlZ3JhdGlvbik7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB2YWx1ZSA9IG9iakNhc2UodGhpcy5vcHRpb25zKCksIGludGVncmF0aW9uKTtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgPyB2YWx1ZSA6IHt9O1xufTtcblxuRmFjYWRlLnByb3RvdHlwZS5jb250ZXh0ID0gRmFjYWRlLnByb3RvdHlwZS5vcHRpb25zO1xuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYW4gaW50ZWdyYXRpb24gaXMgZW5hYmxlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaW50ZWdyYXRpb25cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbkZhY2FkZS5wcm90b3R5cGUuZW5hYmxlZCA9IGZ1bmN0aW9uKGludGVncmF0aW9uKSB7XG4gIHZhciBhbGxFbmFibGVkID0gdGhpcy5wcm94eSgnb3B0aW9ucy5wcm92aWRlcnMuYWxsJyk7XG4gIGlmICh0eXBlb2YgYWxsRW5hYmxlZCAhPT0gJ2Jvb2xlYW4nKSBhbGxFbmFibGVkID0gdGhpcy5wcm94eSgnb3B0aW9ucy5hbGwnKTtcbiAgaWYgKHR5cGVvZiBhbGxFbmFibGVkICE9PSAnYm9vbGVhbicpIGFsbEVuYWJsZWQgPSB0aGlzLnByb3h5KCdpbnRlZ3JhdGlvbnMuYWxsJyk7XG4gIGlmICh0eXBlb2YgYWxsRW5hYmxlZCAhPT0gJ2Jvb2xlYW4nKSBhbGxFbmFibGVkID0gdHJ1ZTtcblxuICB2YXIgZW5hYmxlZCA9IGFsbEVuYWJsZWQgJiYgaXNFbmFibGVkKGludGVncmF0aW9uKTtcbiAgdmFyIG9wdGlvbnMgPSB0aGlzLmludGVncmF0aW9ucygpO1xuXG4gIC8vIElmIHRoZSBpbnRlZ3JhdGlvbiBpcyBleHBsaWNpdGx5IGVuYWJsZWQgb3IgZGlzYWJsZWQsIHVzZSB0aGF0XG4gIC8vIEZpcnN0LCBjaGVjayBvcHRpb25zLnByb3ZpZGVycyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgaWYgKG9wdGlvbnMucHJvdmlkZXJzICYmIG9wdGlvbnMucHJvdmlkZXJzLmhhc093blByb3BlcnR5KGludGVncmF0aW9uKSkge1xuICAgIGVuYWJsZWQgPSBvcHRpb25zLnByb3ZpZGVyc1tpbnRlZ3JhdGlvbl07XG4gIH1cblxuICAvLyBOZXh0LCBjaGVjayBmb3IgdGhlIGludGVncmF0aW9uJ3MgZXhpc3RlbmNlIGluICdvcHRpb25zJyB0byBlbmFibGUgaXQuXG4gIC8vIElmIHRoZSBzZXR0aW5ncyBhcmUgYSBib29sZWFuLCB1c2UgdGhhdCwgb3RoZXJ3aXNlIGl0IHNob3VsZCBiZSBlbmFibGVkLlxuICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShpbnRlZ3JhdGlvbikpIHtcbiAgICB2YXIgc2V0dGluZ3MgPSBvcHRpb25zW2ludGVncmF0aW9uXTtcbiAgICBpZiAodHlwZW9mIHNldHRpbmdzID09PSAnYm9vbGVhbicpIHtcbiAgICAgIGVuYWJsZWQgPSBzZXR0aW5ncztcbiAgICB9IGVsc2Uge1xuICAgICAgZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuICEhZW5hYmxlZDtcbn07XG5cbi8qKlxuICogR2V0IGFsbCBgaW50ZWdyYXRpb25gIG9wdGlvbnMuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gaW50ZWdyYXRpb25cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuRmFjYWRlLnByb3RvdHlwZS5pbnRlZ3JhdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMub2JqLmludGVncmF0aW9ucyB8fCB0aGlzLnByb3h5KCdvcHRpb25zLnByb3ZpZGVycycpIHx8IHRoaXMub3B0aW9ucygpO1xufTtcblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIHRoZSB1c2VyIGlzIGFjdGl2ZS5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5GYWNhZGUucHJvdG90eXBlLmFjdGl2ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYWN0aXZlID0gdGhpcy5wcm94eSgnb3B0aW9ucy5hY3RpdmUnKTtcbiAgaWYgKGFjdGl2ZSA9PT0gbnVsbCB8fCBhY3RpdmUgPT09IHVuZGVmaW5lZCkgYWN0aXZlID0gdHJ1ZTtcbiAgcmV0dXJuIGFjdGl2ZTtcbn07XG5cbi8qKlxuICogR2V0IGBzZXNzaW9uSWQgLyBhbm9ueW1vdXNJZGAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqIEByZXR1cm4geyp9XG4gKi9cbkZhY2FkZS5wcm90b3R5cGUuYW5vbnltb3VzSWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZmllbGQoJ2Fub255bW91c0lkJykgfHwgdGhpcy5maWVsZCgnc2Vzc2lvbklkJyk7XG59O1xuXG5GYWNhZGUucHJvdG90eXBlLnNlc3Npb25JZCA9IEZhY2FkZS5wcm90b3R5cGUuYW5vbnltb3VzSWQ7XG5cbi8qKlxuICogR2V0IGBncm91cElkYCBmcm9tIGBjb250ZXh0Lmdyb3VwSWRgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbkZhY2FkZS5wcm90b3R5cGUuZ3JvdXBJZCA9IEZhY2FkZS5wcm94eSgnb3B0aW9ucy5ncm91cElkJyk7XG5cbi8qKlxuICogR2V0IHRoZSBjYWxsJ3MgXCJzdXBlciBwcm9wZXJ0aWVzXCIgd2hpY2ggYXJlIGp1c3QgdHJhaXRzIHRoYXQgaGF2ZSBiZWVuXG4gKiBwYXNzZWQgaW4gYXMgaWYgZnJvbSBhbiBpZGVudGlmeSBjYWxsLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhbGlhc2VzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbkZhY2FkZS5wcm90b3R5cGUudHJhaXRzID0gZnVuY3Rpb24oYWxpYXNlcykge1xuICB2YXIgcmV0ID0gdGhpcy5wcm94eSgnb3B0aW9ucy50cmFpdHMnKSB8fCB7fTtcbiAgdmFyIGlkID0gdGhpcy51c2VySWQoKTtcbiAgYWxpYXNlcyA9IGFsaWFzZXMgfHwge307XG5cbiAgaWYgKGlkKSByZXQuaWQgPSBpZDtcblxuICBmb3IgKHZhciBhbGlhcyBpbiBhbGlhc2VzKSB7XG4gICAgdmFyIHZhbHVlID0gdGhpc1thbGlhc10gPT0gbnVsbCA/IHRoaXMucHJveHkoJ29wdGlvbnMudHJhaXRzLicgKyBhbGlhcykgOiB0aGlzW2FsaWFzXSgpO1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSBjb250aW51ZTtcbiAgICByZXRbYWxpYXNlc1thbGlhc11dID0gdmFsdWU7XG4gICAgZGVsZXRlIHJldFthbGlhc107XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcblxuLyoqXG4gKiBBZGQgYSBjb252ZW5pZW50IHdheSB0byBnZXQgdGhlIGxpYnJhcnkgbmFtZSBhbmQgdmVyc2lvblxuICovXG5GYWNhZGUucHJvdG90eXBlLmxpYnJhcnkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxpYnJhcnkgPSB0aGlzLnByb3h5KCdvcHRpb25zLmxpYnJhcnknKTtcbiAgaWYgKCFsaWJyYXJ5KSByZXR1cm4geyBuYW1lOiAndW5rbm93bicsIHZlcnNpb246IG51bGwgfTtcbiAgaWYgKHR5cGVvZiBsaWJyYXJ5ID09PSAnc3RyaW5nJykgcmV0dXJuIHsgbmFtZTogbGlicmFyeSwgdmVyc2lvbjogbnVsbCB9O1xuICByZXR1cm4gbGlicmFyeTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBkZXZpY2UgaW5mb3JtYXRpb24gb3IgYW4gZW1wdHkgb2JqZWN0XG4gKlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5GYWNhZGUucHJvdG90eXBlLmRldmljZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZGV2aWNlID0gdGhpcy5wcm94eSgnY29udGV4dC5kZXZpY2UnKTtcbiAgaWYgKHR5cGUoZGV2aWNlKSAhPT0gJ29iamVjdCcpIGRldmljZSA9IHt9O1xuICB2YXIgbGlicmFyeSA9IHRoaXMubGlicmFyeSgpLm5hbWU7XG4gIGlmIChkZXZpY2UudHlwZSkgcmV0dXJuIGRldmljZTtcblxuICBpZiAobGlicmFyeS5pbmRleE9mKCdpb3MnKSA+IC0xKSBkZXZpY2UudHlwZSA9ICdpb3MnO1xuICBpZiAobGlicmFyeS5pbmRleE9mKCdhbmRyb2lkJykgPiAtMSkgZGV2aWNlLnR5cGUgPSAnYW5kcm9pZCc7XG4gIHJldHVybiBkZXZpY2U7XG59O1xuXG4vKipcbiAqIFNldCB1cCBzb21lIGJhc2ljIHByb3hpZXMuXG4gKi9cblxuRmFjYWRlLnByb3RvdHlwZS51c2VyQWdlbnQgPSBGYWNhZGUucHJveHkoJ2NvbnRleHQudXNlckFnZW50Jyk7XG5GYWNhZGUucHJvdG90eXBlLnRpbWV6b25lID0gRmFjYWRlLnByb3h5KCdjb250ZXh0LnRpbWV6b25lJyk7XG5GYWNhZGUucHJvdG90eXBlLnRpbWVzdGFtcCA9IEZhY2FkZS5maWVsZCgndGltZXN0YW1wJyk7XG5GYWNhZGUucHJvdG90eXBlLmNoYW5uZWwgPSBGYWNhZGUuZmllbGQoJ2NoYW5uZWwnKTtcbkZhY2FkZS5wcm90b3R5cGUuaXAgPSBGYWNhZGUucHJveHkoJ2NvbnRleHQuaXAnKTtcbkZhY2FkZS5wcm90b3R5cGUudXNlcklkID0gRmFjYWRlLmZpZWxkKCd1c2VySWQnKTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGNsb25lZCBhbmQgdHJhdmVyc2VkIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHsqfVxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm0ob2JqKSB7XG4gIHJldHVybiBjbG9uZShvYmopO1xufVxuXG4vKipcbiAqIEV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBGYWNhZGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zZWdtZW50aW8tZmFjYWRlL2xpYi9mYWNhZGUuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgdHlwZSA9IHJlcXVpcmUoJ2NvbXBvbmVudC10eXBlJyk7XG5cbi8qKlxuICogRGVlcGx5IGNsb25lIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0geyp9IG9iaiBBbnkgb2JqZWN0LlxuICovXG5cbnZhciBjbG9uZSA9IGZ1bmN0aW9uIGNsb25lKG9iaikge1xuICB2YXIgdCA9IHR5cGUob2JqKTtcblxuICBpZiAodCA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgY29weSA9IHt9O1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBjb3B5W2tleV0gPSBjbG9uZShvYmpba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb3B5O1xuICB9XG5cbiAgaWYgKHQgPT09ICdhcnJheScpIHtcbiAgICB2YXIgY29weSA9IG5ldyBBcnJheShvYmoubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGNvcHlbaV0gPSBjbG9uZShvYmpbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gY29weTtcbiAgfVxuXG4gIGlmICh0ID09PSAncmVnZXhwJykge1xuICAgIC8vIGZyb20gbWlsbGVybWVkZWlyb3MvYW1kLXV0aWxzIC0gTUlUXG4gICAgdmFyIGZsYWdzID0gJyc7XG4gICAgZmxhZ3MgKz0gb2JqLm11bHRpbGluZSA/ICdtJyA6ICcnO1xuICAgIGZsYWdzICs9IG9iai5nbG9iYWwgPyAnZycgOiAnJztcbiAgICBmbGFncyArPSBvYmouaWdub3JlQ2FzZSA/ICdpJyA6ICcnO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKG9iai5zb3VyY2UsIGZsYWdzKTtcbiAgfVxuXG4gIGlmICh0ID09PSAnZGF0ZScpIHtcbiAgICByZXR1cm4gbmV3IERhdGUob2JqLmdldFRpbWUoKSk7XG4gIH1cblxuICAvLyBzdHJpbmcsIG51bWJlciwgYm9vbGVhbiwgZXRjLlxuICByZXR1cm4gb2JqO1xufTtcblxuLypcbiAqIEV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BuZGhvdWxlL2Nsb25lL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCdjb21wb25lbnQtYmluZCcpO1xuXG5mdW5jdGlvbiBiaW5kQWxsKG9iaikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZ3VhcmQtZm9yLWluXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9ialtrZXldID0gYmluZChvYmosIG9ialtrZXldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kQWxsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmluZC1hbGwvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxudmFyIGlkZW50aXR5ID0gZnVuY3Rpb24oXyl7IHJldHVybiBfOyB9O1xudmFyIG5vcm1hbGl6ZSA9IG51bGw7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMsIGV4cG9ydFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gbXVsdGlwbGUoZmluZCk7XG5tb2R1bGUuZXhwb3J0cy5maW5kID0gbW9kdWxlLmV4cG9ydHM7XG5cblxuLyoqXG4gKiBFeHBvcnQgdGhlIHJlcGxhY2VtZW50IGZ1bmN0aW9uLCByZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxuICovXG5cbm1vZHVsZS5leHBvcnRzLnJlcGxhY2UgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbCwgb3B0aW9ucykge1xuICBtdWx0aXBsZShyZXBsYWNlKS5jYWxsKHRoaXMsIG9iaiwga2V5LCB2YWwsIG9wdGlvbnMpO1xuICByZXR1cm4gb2JqO1xufTtcblxuXG4vKipcbiAqIEV4cG9ydCB0aGUgZGVsZXRlIGZ1bmN0aW9uLCByZXR1cm4gdGhlIG1vZGlmaWVkIG9iamVjdFxuICovXG5cbm1vZHVsZS5leHBvcnRzLmRlbCA9IGZ1bmN0aW9uIChvYmosIGtleSwgb3B0aW9ucykge1xuICBtdWx0aXBsZShkZWwpLmNhbGwodGhpcywgb2JqLCBrZXksIG51bGwsIG9wdGlvbnMpO1xuICByZXR1cm4gb2JqO1xufTtcblxuXG4vKipcbiAqIENvbXBvc2UgYXBwbHlpbmcgdGhlIGZ1bmN0aW9uIHRvIGEgbmVzdGVkIGtleVxuICovXG5cbmZ1bmN0aW9uIG11bHRpcGxlIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKG9iaiwgcGF0aCwgdmFsLCBvcHRpb25zKSB7XG4gICAgbm9ybWFsaXplID0gb3B0aW9ucyAmJiBpc0Z1bmN0aW9uKG9wdGlvbnMubm9ybWFsaXplcikgPyBvcHRpb25zLm5vcm1hbGl6ZXIgOiBkZWZhdWx0Tm9ybWFsaXplO1xuICAgIHBhdGggPSBub3JtYWxpemUocGF0aCk7XG5cbiAgICB2YXIga2V5O1xuICAgIHZhciBmaW5pc2hlZCA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKCFmaW5pc2hlZCkgbG9vcCgpO1xuXG4gICAgZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICB2YXIgbm9ybWFsaXplZEtleSA9IG5vcm1hbGl6ZShrZXkpO1xuICAgICAgICBpZiAoMCA9PT0gcGF0aC5pbmRleE9mKG5vcm1hbGl6ZWRLZXkpKSB7XG4gICAgICAgICAgdmFyIHRlbXAgPSBwYXRoLnN1YnN0cihub3JtYWxpemVkS2V5Lmxlbmd0aCk7XG4gICAgICAgICAgaWYgKHRlbXAuY2hhckF0KDApID09PSAnLicgfHwgdGVtcC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHBhdGggPSB0ZW1wLnN1YnN0cigxKTtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IG9ialtrZXldO1xuXG4gICAgICAgICAgICAvLyB3ZSdyZSBhdCB0aGUgZW5kIGFuZCB0aGVyZSBpcyBub3RoaW5nLlxuICAgICAgICAgICAgaWYgKG51bGwgPT0gY2hpbGQpIHtcbiAgICAgICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHdlJ3JlIGF0IHRoZSBlbmQgYW5kIHRoZXJlIGlzIHNvbWV0aGluZy5cbiAgICAgICAgICAgIGlmICghcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHN0ZXAgaW50byBjaGlsZFxuICAgICAgICAgICAgb2JqID0gY2hpbGQ7XG5cbiAgICAgICAgICAgIC8vIGJ1dCB3ZSdyZSBkb25lIGhlcmVcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAga2V5ID0gdW5kZWZpbmVkO1xuICAgICAgLy8gaWYgd2UgZm91bmQgbm8gbWF0Y2hpbmcgcHJvcGVydGllc1xuICAgICAgLy8gb24gdGhlIGN1cnJlbnQgb2JqZWN0LCB0aGVyZSdzIG5vIG1hdGNoLlxuICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICgha2V5KSByZXR1cm47XG4gICAgaWYgKG51bGwgPT0gb2JqKSByZXR1cm4gb2JqO1xuXG4gICAgLy8gdGhlIGBvYmpgIGFuZCBga2V5YCBpcyBvbmUgYWJvdmUgdGhlIGxlYWYgb2JqZWN0IGFuZCBrZXksIHNvXG4gICAgLy8gc3RhcnQgb2JqZWN0OiB7IGE6IHsgJ2IuYyc6IDEwIH0gfVxuICAgIC8vIGVuZCBvYmplY3Q6IHsgJ2IuYyc6IDEwIH1cbiAgICAvLyBlbmQga2V5OiAnYi5jJ1xuICAgIC8vIHRoaXMgd2F5LCB5b3UgY2FuIGRvIGBvYmpba2V5XWAgYW5kIGdldCBgMTBgLlxuICAgIHJldHVybiBmbihvYmosIGtleSwgdmFsKTtcbiAgfTtcbn1cblxuXG4vKipcbiAqIEZpbmQgYW4gb2JqZWN0IGJ5IGl0cyBrZXlcbiAqXG4gKiBmaW5kKHsgZmlyc3RfbmFtZSA6ICdDYWx2aW4nIH0sICdmaXJzdE5hbWUnKVxuICovXG5cbmZ1bmN0aW9uIGZpbmQgKG9iaiwga2V5KSB7XG4gIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkgcmV0dXJuIG9ialtrZXldO1xufVxuXG5cbi8qKlxuICogRGVsZXRlIGEgdmFsdWUgZm9yIGEgZ2l2ZW4ga2V5XG4gKlxuICogZGVsKHsgYSA6ICdiJywgeCA6ICd5JyB9LCAnWCcgfSkgLT4geyBhIDogJ2InIH1cbiAqL1xuXG5mdW5jdGlvbiBkZWwgKG9iaiwga2V5KSB7XG4gIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkgZGVsZXRlIG9ialtrZXldO1xuICByZXR1cm4gb2JqO1xufVxuXG5cbi8qKlxuICogUmVwbGFjZSBhbiBvYmplY3RzIGV4aXN0aW5nIHZhbHVlIHdpdGggYSBuZXcgb25lXG4gKlxuICogcmVwbGFjZSh7IGEgOiAnYicgfSwgJ2EnLCAnYycpIC0+IHsgYSA6ICdjJyB9XG4gKi9cblxuZnVuY3Rpb24gcmVwbGFjZSAob2JqLCBrZXksIHZhbCkge1xuICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIG9ialtrZXldID0gdmFsO1xuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSBhIGBkb3Quc2VwYXJhdGVkLnBhdGhgLlxuICpcbiAqIEEuSEVMTCghKiYjKCEpT19XT1IgICBMRC5iYXIgPT4gYWhlbGxvd29ybGRiYXJcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIGRlZmF1bHROb3JtYWxpemUocGF0aCkge1xuICByZXR1cm4gcGF0aC5yZXBsYWNlKC9bXmEtekEtWjAtOVxcLl0rL2csICcnKS50b0xvd2VyQ2FzZSgpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGEgdmFsdWUgaXMgYSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbGAgaXMgYSBmdW5jdGlvbiwgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gKi9cblxuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbic7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9vYmotY2FzZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIHRvU3RyaW5nIHJlZi5cbiAqL1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFJldHVybiB0aGUgdHlwZSBvZiBgdmFsYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWwpe1xuICBzd2l0Y2ggKHRvU3RyaW5nLmNhbGwodmFsKSkge1xuICAgIGNhc2UgJ1tvYmplY3QgRGF0ZV0nOiByZXR1cm4gJ2RhdGUnO1xuICAgIGNhc2UgJ1tvYmplY3QgUmVnRXhwXSc6IHJldHVybiAncmVnZXhwJztcbiAgICBjYXNlICdbb2JqZWN0IEFyZ3VtZW50c10nOiByZXR1cm4gJ2FyZ3VtZW50cyc7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheV0nOiByZXR1cm4gJ2FycmF5JztcbiAgICBjYXNlICdbb2JqZWN0IEVycm9yXSc6IHJldHVybiAnZXJyb3InO1xuICB9XG5cbiAgaWYgKHZhbCA9PT0gbnVsbCkgcmV0dXJuICdudWxsJztcbiAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gIGlmICh2YWwgIT09IHZhbCkgcmV0dXJuICduYW4nO1xuICBpZiAodmFsICYmIHZhbC5ub2RlVHlwZSA9PT0gMSkgcmV0dXJuICdlbGVtZW50JztcblxuICBpZiAoaXNCdWZmZXIodmFsKSkgcmV0dXJuICdidWZmZXInO1xuXG4gIHZhbCA9IHZhbC52YWx1ZU9mXG4gICAgPyB2YWwudmFsdWVPZigpXG4gICAgOiBPYmplY3QucHJvdG90eXBlLnZhbHVlT2YuYXBwbHkodmFsKTtcblxuICByZXR1cm4gdHlwZW9mIHZhbDtcbn07XG5cbi8vIGNvZGUgYm9ycm93ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2lzLWJ1ZmZlci9ibG9iL21hc3Rlci9pbmRleC5qc1xuZnVuY3Rpb24gaXNCdWZmZXIob2JqKSB7XG4gIHJldHVybiAhIShvYmogIT0gbnVsbCAmJlxuICAgIChvYmouX2lzQnVmZmVyIHx8IC8vIEZvciBTYWZhcmkgNS03IChtaXNzaW5nIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IpXG4gICAgICAob2JqLmNvbnN0cnVjdG9yICYmXG4gICAgICB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmXG4gICAgICBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKSlcbiAgICApKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LXR5cGUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIGdsb2JhbHMgd2luZG93LCBIVE1MRWxlbWVudCAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKiFcbiAqIGlzXG4gKiB0aGUgZGVmaW5pdGl2ZSBKYXZhU2NyaXB0IHR5cGUgdGVzdGluZyBsaWJyYXJ5XG4gKlxuICogQGNvcHlyaWdodCAyMDEzLTIwMTQgRW5yaWNvIE1hcmlubyAvIEpvcmRhbiBIYXJiYW5kXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuXG52YXIgb2JqUHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xudmFyIG93bnMgPSBvYmpQcm90by5oYXNPd25Qcm9wZXJ0eTtcbnZhciB0b1N0ciA9IG9ialByb3RvLnRvU3RyaW5nO1xudmFyIHN5bWJvbFZhbHVlT2Y7XG5pZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuICBzeW1ib2xWYWx1ZU9mID0gU3ltYm9sLnByb3RvdHlwZS52YWx1ZU9mO1xufVxudmFyIGlzQWN0dWFsTmFOID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59O1xudmFyIE5PTl9IT1NUX1RZUEVTID0ge1xuICAnYm9vbGVhbic6IDEsXG4gIG51bWJlcjogMSxcbiAgc3RyaW5nOiAxLFxuICB1bmRlZmluZWQ6IDFcbn07XG5cbnZhciBiYXNlNjRSZWdleCA9IC9eKFtBLVphLXowLTkrL117NH0pKihbQS1aYS16MC05Ky9dezR9fFtBLVphLXowLTkrL117M309fFtBLVphLXowLTkrL117Mn09PSkkLztcbnZhciBoZXhSZWdleCA9IC9eW0EtRmEtZjAtOV0rJC87XG5cbi8qKlxuICogRXhwb3NlIGBpc2BcbiAqL1xuXG52YXIgaXMgPSB7fTtcblxuLyoqXG4gKiBUZXN0IGdlbmVyYWwuXG4gKi9cblxuLyoqXG4gKiBpcy50eXBlXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYSB0eXBlIG9mIGB0eXBlYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSB0eXBlXG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYSB0eXBlIG9mIGB0eXBlYCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmEgPSBpcy50eXBlID0gZnVuY3Rpb24gKHZhbHVlLCB0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IHR5cGU7XG59O1xuXG4vKipcbiAqIGlzLmRlZmluZWRcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBkZWZpbmVkLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgJ3ZhbHVlJyBpcyBkZWZpbmVkLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMuZGVmaW5lZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJztcbn07XG5cbi8qKlxuICogaXMuZW1wdHlcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBlbXB0eS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgZW1wdHksIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5lbXB0eSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHRvU3RyLmNhbGwodmFsdWUpO1xuICB2YXIga2V5O1xuXG4gIGlmICh0eXBlID09PSAnW29iamVjdCBBcnJheV0nIHx8IHR5cGUgPT09ICdbb2JqZWN0IEFyZ3VtZW50c10nIHx8IHR5cGUgPT09ICdbb2JqZWN0IFN0cmluZ10nKSB7XG4gICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA9PT0gMDtcbiAgfVxuXG4gIGlmICh0eXBlID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIGZvciAoa2V5IGluIHZhbHVlKSB7XG4gICAgICBpZiAob3ducy5jYWxsKHZhbHVlLCBrZXkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gIXZhbHVlO1xufTtcblxuLyoqXG4gKiBpcy5lcXVhbFxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGVxdWFsIHRvIGBvdGhlcmAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHBhcmFtIHtNaXhlZH0gb3RoZXIgdmFsdWUgdG8gY29tcGFyZSB3aXRoXG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgZXF1YWwgdG8gYG90aGVyYCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cblxuaXMuZXF1YWwgPSBmdW5jdGlvbiBlcXVhbCh2YWx1ZSwgb3RoZXIpIHtcbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdmFyIHR5cGUgPSB0b1N0ci5jYWxsKHZhbHVlKTtcbiAgdmFyIGtleTtcblxuICBpZiAodHlwZSAhPT0gdG9TdHIuY2FsbChvdGhlcikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICBmb3IgKGtleSBpbiB2YWx1ZSkge1xuICAgICAgaWYgKCFpcy5lcXVhbCh2YWx1ZVtrZXldLCBvdGhlcltrZXldKSB8fCAhKGtleSBpbiBvdGhlcikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGtleSBpbiBvdGhlcikge1xuICAgICAgaWYgKCFpcy5lcXVhbCh2YWx1ZVtrZXldLCBvdGhlcltrZXldKSB8fCAhKGtleSBpbiB2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAga2V5ID0gdmFsdWUubGVuZ3RoO1xuICAgIGlmIChrZXkgIT09IG90aGVyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB3aGlsZSAoa2V5LS0pIHtcbiAgICAgIGlmICghaXMuZXF1YWwodmFsdWVba2V5XSwgb3RoZXJba2V5XSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlID09PSAnW29iamVjdCBGdW5jdGlvbl0nKSB7XG4gICAgcmV0dXJuIHZhbHVlLnByb3RvdHlwZSA9PT0gb3RoZXIucHJvdG90eXBlO1xuICB9XG5cbiAgaWYgKHR5cGUgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgIHJldHVybiB2YWx1ZS5nZXRUaW1lKCkgPT09IG90aGVyLmdldFRpbWUoKTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogaXMuaG9zdGVkXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgaG9zdGVkIGJ5IGBob3N0YC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSB0byB0ZXN0XG4gKiBAcGFyYW0ge01peGVkfSBob3N0IGhvc3QgdG8gdGVzdCB3aXRoXG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgaG9zdGVkIGJ5IGBob3N0YCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmhvc3RlZCA9IGZ1bmN0aW9uICh2YWx1ZSwgaG9zdCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBob3N0W3ZhbHVlXTtcbiAgcmV0dXJuIHR5cGUgPT09ICdvYmplY3QnID8gISFob3N0W3ZhbHVlXSA6ICFOT05fSE9TVF9UWVBFU1t0eXBlXTtcbn07XG5cbi8qKlxuICogaXMuaW5zdGFuY2VcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBhbiBpbnN0YW5jZSBvZiBgY29uc3RydWN0b3JgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhbiBpbnN0YW5jZSBvZiBgY29uc3RydWN0b3JgXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmluc3RhbmNlID0gaXNbJ2luc3RhbmNlb2YnXSA9IGZ1bmN0aW9uICh2YWx1ZSwgY29uc3RydWN0b3IpIHtcbiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgY29uc3RydWN0b3I7XG59O1xuXG4vKipcbiAqIGlzLm5pbCAvIGlzLm51bGxcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBudWxsLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBudWxsLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMubmlsID0gaXNbJ251bGwnXSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGw7XG59O1xuXG4vKipcbiAqIGlzLnVuZGVmIC8gaXMudW5kZWZpbmVkXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgdW5kZWZpbmVkLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyB1bmRlZmluZWQsIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy51bmRlZiA9IGlzLnVuZGVmaW5lZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcbn07XG5cbi8qKlxuICogVGVzdCBhcmd1bWVudHMuXG4gKi9cblxuLyoqXG4gKiBpcy5hcmdzXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYW4gYXJndW1lbnRzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYW4gYXJndW1lbnRzIG9iamVjdCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmFyZ3MgPSBpcy5hcmd1bWVudHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIGlzU3RhbmRhcmRBcmd1bWVudHMgPSB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG4gIHZhciBpc09sZEFyZ3VtZW50cyA9ICFpcy5hcnJheSh2YWx1ZSkgJiYgaXMuYXJyYXlsaWtlKHZhbHVlKSAmJiBpcy5vYmplY3QodmFsdWUpICYmIGlzLmZuKHZhbHVlLmNhbGxlZSk7XG4gIHJldHVybiBpc1N0YW5kYXJkQXJndW1lbnRzIHx8IGlzT2xkQXJndW1lbnRzO1xufTtcblxuLyoqXG4gKiBUZXN0IGFycmF5LlxuICovXG5cbi8qKlxuICogaXMuYXJyYXlcbiAqIFRlc3QgaWYgJ3ZhbHVlJyBpcyBhbiBhcnJheS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5hcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbi8qKlxuICogaXMuYXJndW1lbnRzLmVtcHR5XG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYW4gZW1wdHkgYXJndW1lbnRzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYW4gZW1wdHkgYXJndW1lbnRzIG9iamVjdCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5pcy5hcmdzLmVtcHR5ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiBpcy5hcmdzKHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDA7XG59O1xuXG4vKipcbiAqIGlzLmFycmF5LmVtcHR5XG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYW4gZW1wdHkgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBgdmFsdWVgIGlzIGFuIGVtcHR5IGFycmF5LCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cbmlzLmFycmF5LmVtcHR5ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiBpcy5hcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwO1xufTtcblxuLyoqXG4gKiBpcy5hcnJheWxpa2VcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBhbiBhcnJheWxpa2Ugb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhbiBhcmd1bWVudHMgb2JqZWN0LCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMuYXJyYXlsaWtlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmICFpcy5ib29sKHZhbHVlKVxuICAgICYmIG93bnMuY2FsbCh2YWx1ZSwgJ2xlbmd0aCcpXG4gICAgJiYgaXNGaW5pdGUodmFsdWUubGVuZ3RoKVxuICAgICYmIGlzLm51bWJlcih2YWx1ZS5sZW5ndGgpXG4gICAgJiYgdmFsdWUubGVuZ3RoID49IDA7XG59O1xuXG4vKipcbiAqIFRlc3QgYm9vbGVhbi5cbiAqL1xuXG4vKipcbiAqIGlzLmJvb2xcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBhIGJvb2xlYW4uXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBgdmFsdWVgIGlzIGEgYm9vbGVhbiwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmJvb2wgPSBpc1snYm9vbGVhbiddID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xufTtcblxuLyoqXG4gKiBpcy5mYWxzZVxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGZhbHNlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBmYWxzZSwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzWydmYWxzZSddID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiBpcy5ib29sKHZhbHVlKSAmJiBCb29sZWFuKE51bWJlcih2YWx1ZSkpID09PSBmYWxzZTtcbn07XG5cbi8qKlxuICogaXMudHJ1ZVxuICogVGVzdCBpZiBgdmFsdWVgIGlzIHRydWUuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBgdmFsdWVgIGlzIHRydWUsIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pc1sndHJ1ZSddID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiBpcy5ib29sKHZhbHVlKSAmJiBCb29sZWFuKE51bWJlcih2YWx1ZSkpID09PSB0cnVlO1xufTtcblxuLyoqXG4gKiBUZXN0IGRhdGUuXG4gKi9cblxuLyoqXG4gKiBpcy5kYXRlXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYSBkYXRlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhIGRhdGUsIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5kYXRlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufTtcblxuLyoqXG4gKiBpcy5kYXRlLnZhbGlkXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBkYXRlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBkYXRlLCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuaXMuZGF0ZS52YWxpZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gaXMuZGF0ZSh2YWx1ZSkgJiYgIWlzTmFOKE51bWJlcih2YWx1ZSkpO1xufTtcblxuLyoqXG4gKiBUZXN0IGVsZW1lbnQuXG4gKi9cblxuLyoqXG4gKiBpcy5lbGVtZW50XG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYW4gaHRtbCBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhbiBIVE1MIEVsZW1lbnQsIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5lbGVtZW50ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgJiYgdHlwZW9mIEhUTUxFbGVtZW50ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHZhbHVlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgICAmJiB2YWx1ZS5ub2RlVHlwZSA9PT0gMTtcbn07XG5cbi8qKlxuICogVGVzdCBlcnJvci5cbiAqL1xuXG4vKipcbiAqIGlzLmVycm9yXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYW4gZXJyb3Igb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhbiBlcnJvciBvYmplY3QsIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5lcnJvciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdG9TdHIuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IEVycm9yXSc7XG59O1xuXG4vKipcbiAqIFRlc3QgZnVuY3Rpb24uXG4gKi9cblxuLyoqXG4gKiBpcy5mbiAvIGlzLmZ1bmN0aW9uIChkZXByZWNhdGVkKVxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5mbiA9IGlzWydmdW5jdGlvbiddID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBpc0FsZXJ0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgPT09IHdpbmRvdy5hbGVydDtcbiAgaWYgKGlzQWxlcnQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgc3RyID0gdG9TdHIuY2FsbCh2YWx1ZSk7XG4gIHJldHVybiBzdHIgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXScgfHwgc3RyID09PSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nIHx8IHN0ciA9PT0gJ1tvYmplY3QgQXN5bmNGdW5jdGlvbl0nO1xufTtcblxuLyoqXG4gKiBUZXN0IG51bWJlci5cbiAqL1xuXG4vKipcbiAqIGlzLm51bWJlclxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGEgbnVtYmVyLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhIG51bWJlciwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLm51bWJlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdG9TdHIuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xufTtcblxuLyoqXG4gKiBpcy5pbmZpbml0ZVxuICogVGVzdCBpZiBgdmFsdWVgIGlzIHBvc2l0aXZlIG9yIG5lZ2F0aXZlIGluZmluaXR5LlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBwb3NpdGl2ZSBvciBuZWdhdGl2ZSBJbmZpbml0eSwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5pcy5pbmZpbml0ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IEluZmluaXR5IHx8IHZhbHVlID09PSAtSW5maW5pdHk7XG59O1xuXG4vKipcbiAqIGlzLmRlY2ltYWxcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBhIGRlY2ltYWwgbnVtYmVyLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhIGRlY2ltYWwgbnVtYmVyLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMuZGVjaW1hbCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gaXMubnVtYmVyKHZhbHVlKSAmJiAhaXNBY3R1YWxOYU4odmFsdWUpICYmICFpcy5pbmZpbml0ZSh2YWx1ZSkgJiYgdmFsdWUgJSAxICE9PSAwO1xufTtcblxuLyoqXG4gKiBpcy5kaXZpc2libGVCeVxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGRpdmlzaWJsZSBieSBgbmAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBuIGRpdmlkZW5kXG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgZGl2aXNpYmxlIGJ5IGBuYCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmRpdmlzaWJsZUJ5ID0gZnVuY3Rpb24gKHZhbHVlLCBuKSB7XG4gIHZhciBpc0RpdmlkZW5kSW5maW5pdGUgPSBpcy5pbmZpbml0ZSh2YWx1ZSk7XG4gIHZhciBpc0Rpdmlzb3JJbmZpbml0ZSA9IGlzLmluZmluaXRlKG4pO1xuICB2YXIgaXNOb25aZXJvTnVtYmVyID0gaXMubnVtYmVyKHZhbHVlKSAmJiAhaXNBY3R1YWxOYU4odmFsdWUpICYmIGlzLm51bWJlcihuKSAmJiAhaXNBY3R1YWxOYU4obikgJiYgbiAhPT0gMDtcbiAgcmV0dXJuIGlzRGl2aWRlbmRJbmZpbml0ZSB8fCBpc0Rpdmlzb3JJbmZpbml0ZSB8fCAoaXNOb25aZXJvTnVtYmVyICYmIHZhbHVlICUgbiA9PT0gMCk7XG59O1xuXG4vKipcbiAqIGlzLmludGVnZXJcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBhbiBpbnRlZ2VyLlxuICpcbiAqIEBwYXJhbSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYW4gaW50ZWdlciwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmludGVnZXIgPSBpc1snaW50J10gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIGlzLm51bWJlcih2YWx1ZSkgJiYgIWlzQWN0dWFsTmFOKHZhbHVlKSAmJiB2YWx1ZSAlIDEgPT09IDA7XG59O1xuXG4vKipcbiAqIGlzLm1heGltdW1cbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBncmVhdGVyIHRoYW4gJ290aGVycycgdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcGFyYW0ge0FycmF5fSBvdGhlcnMgdmFsdWVzIHRvIGNvbXBhcmUgd2l0aFxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBgdmFsdWVgIGlzIGdyZWF0ZXIgdGhhbiBgb3RoZXJzYCB2YWx1ZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMubWF4aW11bSA9IGZ1bmN0aW9uICh2YWx1ZSwgb3RoZXJzKSB7XG4gIGlmIChpc0FjdHVhbE5hTih2YWx1ZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdOYU4gaXMgbm90IGEgdmFsaWQgdmFsdWUnKTtcbiAgfSBlbHNlIGlmICghaXMuYXJyYXlsaWtlKG90aGVycykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdzZWNvbmQgYXJndW1lbnQgbXVzdCBiZSBhcnJheS1saWtlJyk7XG4gIH1cbiAgdmFyIGxlbiA9IG90aGVycy5sZW5ndGg7XG5cbiAgd2hpbGUgKC0tbGVuID49IDApIHtcbiAgICBpZiAodmFsdWUgPCBvdGhlcnNbbGVuXSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBpcy5taW5pbXVtXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgbGVzcyB0aGFuIGBvdGhlcnNgIHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHBhcmFtIHtBcnJheX0gb3RoZXJzIHZhbHVlcyB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBsZXNzIHRoYW4gYG90aGVyc2AgdmFsdWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLm1pbmltdW0gPSBmdW5jdGlvbiAodmFsdWUsIG90aGVycykge1xuICBpZiAoaXNBY3R1YWxOYU4odmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTmFOIGlzIG5vdCBhIHZhbGlkIHZhbHVlJyk7XG4gIH0gZWxzZSBpZiAoIWlzLmFycmF5bGlrZShvdGhlcnMpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYXJyYXktbGlrZScpO1xuICB9XG4gIHZhciBsZW4gPSBvdGhlcnMubGVuZ3RoO1xuXG4gIHdoaWxlICgtLWxlbiA+PSAwKSB7XG4gICAgaWYgKHZhbHVlID4gb3RoZXJzW2xlbl0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogaXMubmFuXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgbm90IGEgbnVtYmVyLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBub3QgYSBudW1iZXIsIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5uYW4gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuICFpcy5udW1iZXIodmFsdWUpIHx8IHZhbHVlICE9PSB2YWx1ZTtcbn07XG5cbi8qKlxuICogaXMuZXZlblxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGFuIGV2ZW4gbnVtYmVyLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYW4gZXZlbiBudW1iZXIsIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5ldmVuID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiBpcy5pbmZpbml0ZSh2YWx1ZSkgfHwgKGlzLm51bWJlcih2YWx1ZSkgJiYgdmFsdWUgPT09IHZhbHVlICYmIHZhbHVlICUgMiA9PT0gMCk7XG59O1xuXG4vKipcbiAqIGlzLm9kZFxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGFuIG9kZCBudW1iZXIuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhbiBvZGQgbnVtYmVyLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMub2RkID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiBpcy5pbmZpbml0ZSh2YWx1ZSkgfHwgKGlzLm51bWJlcih2YWx1ZSkgJiYgdmFsdWUgPT09IHZhbHVlICYmIHZhbHVlICUgMiAhPT0gMCk7XG59O1xuXG4vKipcbiAqIGlzLmdlXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIGBvdGhlcmAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBvdGhlciB2YWx1ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmdlID0gZnVuY3Rpb24gKHZhbHVlLCBvdGhlcikge1xuICBpZiAoaXNBY3R1YWxOYU4odmFsdWUpIHx8IGlzQWN0dWFsTmFOKG90aGVyKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ05hTiBpcyBub3QgYSB2YWxpZCB2YWx1ZScpO1xuICB9XG4gIHJldHVybiAhaXMuaW5maW5pdGUodmFsdWUpICYmICFpcy5pbmZpbml0ZShvdGhlcikgJiYgdmFsdWUgPj0gb3RoZXI7XG59O1xuXG4vKipcbiAqIGlzLmd0XG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgZ3JlYXRlciB0aGFuIGBvdGhlcmAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBvdGhlciB2YWx1ZSB0byBjb21wYXJlIHdpdGhcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmd0ID0gZnVuY3Rpb24gKHZhbHVlLCBvdGhlcikge1xuICBpZiAoaXNBY3R1YWxOYU4odmFsdWUpIHx8IGlzQWN0dWFsTmFOKG90aGVyKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ05hTiBpcyBub3QgYSB2YWxpZCB2YWx1ZScpO1xuICB9XG4gIHJldHVybiAhaXMuaW5maW5pdGUodmFsdWUpICYmICFpcy5pbmZpbml0ZShvdGhlcikgJiYgdmFsdWUgPiBvdGhlcjtcbn07XG5cbi8qKlxuICogaXMubGVcbiAqIFRlc3QgaWYgYHZhbHVlYCBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYG90aGVyYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHBhcmFtIHtOdW1iZXJ9IG90aGVyIHZhbHVlIHRvIGNvbXBhcmUgd2l0aFxuICogQHJldHVybiB7Qm9vbGVhbn0gaWYgJ3ZhbHVlJyBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJ290aGVyJ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5pcy5sZSA9IGZ1bmN0aW9uICh2YWx1ZSwgb3RoZXIpIHtcbiAgaWYgKGlzQWN0dWFsTmFOKHZhbHVlKSB8fCBpc0FjdHVhbE5hTihvdGhlcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdOYU4gaXMgbm90IGEgdmFsaWQgdmFsdWUnKTtcbiAgfVxuICByZXR1cm4gIWlzLmluZmluaXRlKHZhbHVlKSAmJiAhaXMuaW5maW5pdGUob3RoZXIpICYmIHZhbHVlIDw9IG90aGVyO1xufTtcblxuLyoqXG4gKiBpcy5sdFxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGxlc3MgdGhhbiBgb3RoZXJgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcGFyYW0ge051bWJlcn0gb3RoZXIgdmFsdWUgdG8gY29tcGFyZSB3aXRoXG4gKiBAcmV0dXJuIHtCb29sZWFufSBpZiBgdmFsdWVgIGlzIGxlc3MgdGhhbiBgb3RoZXJgXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmx0ID0gZnVuY3Rpb24gKHZhbHVlLCBvdGhlcikge1xuICBpZiAoaXNBY3R1YWxOYU4odmFsdWUpIHx8IGlzQWN0dWFsTmFOKG90aGVyKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ05hTiBpcyBub3QgYSB2YWxpZCB2YWx1ZScpO1xuICB9XG4gIHJldHVybiAhaXMuaW5maW5pdGUodmFsdWUpICYmICFpcy5pbmZpbml0ZShvdGhlcikgJiYgdmFsdWUgPCBvdGhlcjtcbn07XG5cbi8qKlxuICogaXMud2l0aGluXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgd2l0aGluIGBzdGFydGAgYW5kIGBmaW5pc2hgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcGFyYW0ge051bWJlcn0gc3RhcnQgbG93ZXIgYm91bmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBmaW5pc2ggdXBwZXIgYm91bmRcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgJ3ZhbHVlJyBpcyBpcyB3aXRoaW4gJ3N0YXJ0JyBhbmQgJ2ZpbmlzaCdcbiAqIEBhcGkgcHVibGljXG4gKi9cbmlzLndpdGhpbiA9IGZ1bmN0aW9uICh2YWx1ZSwgc3RhcnQsIGZpbmlzaCkge1xuICBpZiAoaXNBY3R1YWxOYU4odmFsdWUpIHx8IGlzQWN0dWFsTmFOKHN0YXJ0KSB8fCBpc0FjdHVhbE5hTihmaW5pc2gpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTmFOIGlzIG5vdCBhIHZhbGlkIHZhbHVlJyk7XG4gIH0gZWxzZSBpZiAoIWlzLm51bWJlcih2YWx1ZSkgfHwgIWlzLm51bWJlcihzdGFydCkgfHwgIWlzLm51bWJlcihmaW5pc2gpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYWxsIGFyZ3VtZW50cyBtdXN0IGJlIG51bWJlcnMnKTtcbiAgfVxuICB2YXIgaXNBbnlJbmZpbml0ZSA9IGlzLmluZmluaXRlKHZhbHVlKSB8fCBpcy5pbmZpbml0ZShzdGFydCkgfHwgaXMuaW5maW5pdGUoZmluaXNoKTtcbiAgcmV0dXJuIGlzQW55SW5maW5pdGUgfHwgKHZhbHVlID49IHN0YXJ0ICYmIHZhbHVlIDw9IGZpbmlzaCk7XG59O1xuXG4vKipcbiAqIFRlc3Qgb2JqZWN0LlxuICovXG5cbi8qKlxuICogaXMub2JqZWN0XG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGZhbHNlIG90aGVyd2lzZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuaXMub2JqZWN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59O1xuXG4vKipcbiAqIGlzLnByaW1pdGl2ZVxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGEgcHJpbWl0aXZlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgYHZhbHVlYCBpcyBhIHByaW1pdGl2ZSwgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5pcy5wcmltaXRpdmUgPSBmdW5jdGlvbiBpc1ByaW1pdGl2ZSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgaXMub2JqZWN0KHZhbHVlKSB8fCBpcy5mbih2YWx1ZSkgfHwgaXMuYXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBpcy5oYXNoXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYSBoYXNoIC0gYSBwbGFpbiBvYmplY3QgbGl0ZXJhbC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYSBoYXNoLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMuaGFzaCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gaXMub2JqZWN0KHZhbHVlKSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0ICYmICF2YWx1ZS5ub2RlVHlwZSAmJiAhdmFsdWUuc2V0SW50ZXJ2YWw7XG59O1xuXG4vKipcbiAqIFRlc3QgcmVnZXhwLlxuICovXG5cbi8qKlxuICogaXMucmVnZXhwXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYSByZWd1bGFyIGV4cHJlc3Npb24uXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiBgdmFsdWVgIGlzIGEgcmVnZXhwLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMucmVnZXhwID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG4vKipcbiAqIFRlc3Qgc3RyaW5nLlxuICovXG5cbi8qKlxuICogaXMuc3RyaW5nXG4gKiBUZXN0IGlmIGB2YWx1ZWAgaXMgYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZSBpZiAndmFsdWUnIGlzIGEgc3RyaW5nLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuaXMuc3RyaW5nID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG59O1xuXG4vKipcbiAqIFRlc3QgYmFzZTY0IHN0cmluZy5cbiAqL1xuXG4vKipcbiAqIGlzLmJhc2U2NFxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYmFzZTY0IGVuY29kZWQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgJ3ZhbHVlJyBpcyBhIGJhc2U2NCBlbmNvZGVkIHN0cmluZywgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmJhc2U2NCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gaXMuc3RyaW5nKHZhbHVlKSAmJiAoIXZhbHVlLmxlbmd0aCB8fCBiYXNlNjRSZWdleC50ZXN0KHZhbHVlKSk7XG59O1xuXG4vKipcbiAqIFRlc3QgYmFzZTY0IHN0cmluZy5cbiAqL1xuXG4vKipcbiAqIGlzLmhleFxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaGV4IGVuY29kZWQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWUgaWYgJ3ZhbHVlJyBpcyBhIGhleCBlbmNvZGVkIHN0cmluZywgZmFsc2Ugb3RoZXJ3aXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLmhleCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gaXMuc3RyaW5nKHZhbHVlKSAmJiAoIXZhbHVlLmxlbmd0aCB8fCBoZXhSZWdleC50ZXN0KHZhbHVlKSk7XG59O1xuXG4vKipcbiAqIGlzLnN5bWJvbFxuICogVGVzdCBpZiBgdmFsdWVgIGlzIGFuIEVTNiBTeW1ib2xcbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSB0cnVlIGlmIGB2YWx1ZWAgaXMgYSBTeW1ib2wsIGZhbHNlIG90aGVyaXNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmlzLnN5bWJvbCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgU3ltYm9sXScgJiYgdHlwZW9mIHN5bWJvbFZhbHVlT2YuY2FsbCh2YWx1ZSkgPT09ICdzeW1ib2wnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2lzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNFbWFpbCAoc3RyaW5nKSB7XG4gICAgcmV0dXJuICgvLitcXEAuK1xcLi4rLykudGVzdChzdHJpbmcpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pcy1lbWFpbC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FsbGFibGUsIGJ5T2JzZXJ2ZXI7XG5cbmNhbGxhYmxlID0gZnVuY3Rpb24gKGZuKSB7XG5cdGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBUeXBlRXJyb3IoZm4gKyBcIiBpcyBub3QgYSBmdW5jdGlvblwiKTtcblx0cmV0dXJuIGZuO1xufTtcblxuYnlPYnNlcnZlciA9IGZ1bmN0aW9uIChPYnNlcnZlcikge1xuXHR2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKSwgcXVldWUsIGkgPSAwO1xuXHRuZXcgT2JzZXJ2ZXIoZnVuY3Rpb24gKCkge1xuXHRcdHZhciBkYXRhO1xuXHRcdGlmICghcXVldWUpIHJldHVybjtcblx0XHRkYXRhID0gcXVldWU7XG5cdFx0cXVldWUgPSBudWxsO1xuXHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0ZGF0YSgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRkYXRhLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7IGZuKCk7IH0pO1xuXHR9KS5vYnNlcnZlKG5vZGUsIHsgY2hhcmFjdGVyRGF0YTogdHJ1ZSB9KTtcblx0cmV0dXJuIGZ1bmN0aW9uIChmbikge1xuXHRcdGNhbGxhYmxlKGZuKTtcblx0XHRpZiAocXVldWUpIHtcblx0XHRcdGlmICh0eXBlb2YgcXVldWUgPT09ICdmdW5jdGlvbicpIHF1ZXVlID0gW3F1ZXVlLCBmbl07XG5cdFx0XHRlbHNlIHF1ZXVlLnB1c2goZm4pO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRxdWV1ZSA9IGZuO1xuXHRcdG5vZGUuZGF0YSA9IChpID0gKytpICUgMik7XG5cdH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG5cdC8vIE5vZGUuanNcblx0aWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpICYmIHByb2Nlc3MgJiZcblx0XHRcdCh0eXBlb2YgcHJvY2Vzcy5uZXh0VGljayA9PT0gJ2Z1bmN0aW9uJykpIHtcblx0XHRyZXR1cm4gcHJvY2Vzcy5uZXh0VGljaztcblx0fVxuXG5cdC8vIE11dGF0aW9uT2JzZXJ2ZXI9XG5cdGlmICgodHlwZW9mIGRvY3VtZW50ID09PSAnb2JqZWN0JykgJiYgZG9jdW1lbnQpIHtcblx0XHRpZiAodHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHJldHVybiBieU9ic2VydmVyKE11dGF0aW9uT2JzZXJ2ZXIpO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIFdlYktpdE11dGF0aW9uT2JzZXJ2ZXIgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHJldHVybiBieU9ic2VydmVyKFdlYktpdE11dGF0aW9uT2JzZXJ2ZXIpO1xuXHRcdH1cblx0fVxuXG5cdC8vIFczQyBEcmFmdFxuXHQvLyBodHRwOi8vZHZjcy53My5vcmcvaGcvd2VicGVyZi9yYXctZmlsZS90aXAvc3BlY3Mvc2V0SW1tZWRpYXRlL092ZXJ2aWV3Lmh0bWxcblx0aWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKGNiKSB7IHNldEltbWVkaWF0ZShjYWxsYWJsZShjYikpOyB9O1xuXHR9XG5cblx0Ly8gV2lkZSBhdmFpbGFibGUgc3RhbmRhcmRcblx0aWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChjYikgeyBzZXRUaW1lb3V0KGNhbGxhYmxlKGNiKSwgMCk7IH07XG5cdH1cblxuXHRyZXR1cm4gbnVsbDtcbn0oKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9uZXh0LXRpY2svaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImlmICh0eXBlb2YgT2JqZWN0LmNyZWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBpbXBsZW1lbnRhdGlvbiBmcm9tIHN0YW5kYXJkIG5vZGUuanMgJ3V0aWwnIG1vZHVsZVxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yXG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xufSBlbHNlIHtcbiAgLy8gb2xkIHNjaG9vbCBzaGltIGZvciBvbGQgYnJvd3NlcnNcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9XG4gICAgVGVtcEN0b3IucHJvdG90eXBlID0gc3VwZXJDdG9yLnByb3RvdHlwZVxuICAgIGN0b3IucHJvdG90eXBlID0gbmV3IFRlbXBDdG9yKClcbiAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3JcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaW5oZXJpdHMvaW5oZXJpdHNfYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXMgPSByZXF1aXJlKCdpcycpO1xudmFyIGlzb2RhdGUgPSByZXF1aXJlKCdAc2VnbWVudC9pc29kYXRlJyk7XG52YXIgbWlsbGlzZWNvbmRzID0gcmVxdWlyZSgnLi9taWxsaXNlY29uZHMnKTtcbnZhciBzZWNvbmRzID0gcmVxdWlyZSgnLi9zZWNvbmRzJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBKYXZhc2NyaXB0IERhdGUgb2JqZWN0LCBhbGxvd2luZyBhIHZhcmlldHkgb2YgZXh0cmEgaW5wdXQgdHlwZXNcbiAqIG92ZXIgdGhlIG5hdGl2ZSBEYXRlIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxzdHJpbmd8bnVtYmVyfSB2YWxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBuZXdEYXRlKHZhbCkge1xuICBpZiAoaXMuZGF0ZSh2YWwpKSByZXR1cm4gdmFsO1xuICBpZiAoaXMubnVtYmVyKHZhbCkpIHJldHVybiBuZXcgRGF0ZSh0b01zKHZhbCkpO1xuXG4gIC8vIGRhdGUgc3RyaW5nc1xuICBpZiAoaXNvZGF0ZS5pcyh2YWwpKSB7XG4gICAgcmV0dXJuIGlzb2RhdGUucGFyc2UodmFsKTtcbiAgfVxuICBpZiAobWlsbGlzZWNvbmRzLmlzKHZhbCkpIHtcbiAgICByZXR1cm4gbWlsbGlzZWNvbmRzLnBhcnNlKHZhbCk7XG4gIH1cbiAgaWYgKHNlY29uZHMuaXModmFsKSkge1xuICAgIHJldHVybiBzZWNvbmRzLnBhcnNlKHZhbCk7XG4gIH1cblxuICAvLyBmYWxsYmFjayB0byBEYXRlLnBhcnNlXG4gIHJldHVybiBuZXcgRGF0ZSh2YWwpO1xufTtcblxuXG4vKipcbiAqIElmIHRoZSBudW1iZXIgcGFzc2VkIHZhbCBpcyBzZWNvbmRzIGZyb20gdGhlIGVwb2NoLCB0dXJuIGl0IGludG8gbWlsbGlzZWNvbmRzLlxuICogTWlsbGlzZWNvbmRzIHdvdWxkIGJlIGdyZWF0ZXIgdGhhbiAzMTU1NzYwMDAwMCAoRGVjZW1iZXIgMzEsIDE5NzApLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1cbiAqL1xuZnVuY3Rpb24gdG9NcyhudW0pIHtcbiAgaWYgKG51bSA8IDMxNTU3NjAwMDAwKSByZXR1cm4gbnVtICogMTAwMDtcbiAgcmV0dXJuIG51bTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL25ldy1kYXRlL2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdCA9IHJlcXVpcmUoJy4vdXRpbHMnKS5pbmhlcml0O1xudmFyIHR5cGUgPSByZXF1aXJlKCcuL3V0aWxzJykudHlwZTtcbnZhciBGYWNhZGUgPSByZXF1aXJlKCcuL2ZhY2FkZScpO1xudmFyIElkZW50aWZ5ID0gcmVxdWlyZSgnLi9pZGVudGlmeScpO1xudmFyIGlzRW1haWwgPSByZXF1aXJlKCdpcy1lbWFpbCcpO1xudmFyIGdldCA9IHJlcXVpcmUoJ29iai1jYXNlJyk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgVHJhY2tgIGZhY2FkZSB3aXRoIGEgYGRpY3Rpb25hcnlgIG9mIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gZGljdGlvbmFyeVxuICogICBAcHJvcGVydHkge3N0cmluZ30gZXZlbnRcbiAqICAgQHByb3BlcnR5IHtzdHJpbmd9IHVzZXJJZFxuICogICBAcHJvcGVydHkge3N0cmluZ30gc2Vzc2lvbklkXG4gKiAgIEBwcm9wZXJ0eSB7T2JqZWN0fSBwcm9wZXJ0aWVzXG4gKiAgIEBwcm9wZXJ0eSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogICBAcHJvcGVydHkge2Jvb2xlYW58dW5kZWZpbmVkfSBjbG9uZVxuICovXG5cbmZ1bmN0aW9uIFRyYWNrKGRpY3Rpb25hcnksIG9wdHMpIHtcbiAgRmFjYWRlLmNhbGwodGhpcywgZGljdGlvbmFyeSwgb3B0cyk7XG59XG5cbi8qKlxuICogSW5oZXJpdCBmcm9tIGBGYWNhZGVgLlxuICovXG5cbmluaGVyaXQoVHJhY2ssIEZhY2FkZSk7XG5cbi8qKlxuICogUmV0dXJuIHRoZSBmYWNhZGUncyBhY3Rpb24uXG4gKlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5cblRyYWNrLnByb3RvdHlwZS5hY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICd0cmFjayc7XG59O1xuXG5UcmFjay5wcm90b3R5cGUudHlwZSA9IFRyYWNrLnByb3RvdHlwZS5hY3Rpb247XG5cbi8qKlxuICogU2V0dXAgc29tZSBiYXNpYyBwcm94aWVzLlxuICovXG5cblRyYWNrLnByb3RvdHlwZS5ldmVudCA9IEZhY2FkZS5maWVsZCgnZXZlbnQnKTtcblRyYWNrLnByb3RvdHlwZS52YWx1ZSA9IEZhY2FkZS5wcm94eSgncHJvcGVydGllcy52YWx1ZScpO1xuXG4vKipcbiAqIE1pc2NcbiAqL1xuXG5UcmFjay5wcm90b3R5cGUuY2F0ZWdvcnkgPSBGYWNhZGUucHJveHkoJ3Byb3BlcnRpZXMuY2F0ZWdvcnknKTtcblxuLyoqXG4gKiBFY29tbWVyY2VcbiAqL1xuXG4vKipcbiAqIGlkc1xuICovXG5cblRyYWNrLnByb3RvdHlwZS5pZCA9IEZhY2FkZS5wcm94eSgncHJvcGVydGllcy5pZCcpO1xuVHJhY2sucHJvdG90eXBlLnByb2R1Y3RJZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5wcm94eSgncHJvcGVydGllcy5wcm9kdWN0X2lkJykgfHwgdGhpcy5wcm94eSgncHJvcGVydGllcy5wcm9kdWN0SWQnKTtcbn07XG5UcmFjay5wcm90b3R5cGUucHJvbW90aW9uSWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucHJveHkoJ3Byb3BlcnRpZXMucHJvbW90aW9uX2lkJykgfHwgdGhpcy5wcm94eSgncHJvcGVydGllcy5wcm9tb3Rpb25JZCcpO1xufTtcblRyYWNrLnByb3RvdHlwZS5jYXJ0SWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucHJveHkoJ3Byb3BlcnRpZXMuY2FydF9pZCcpIHx8IHRoaXMucHJveHkoJ3Byb3BlcnRpZXMuY2FydElkJyk7XG59O1xuVHJhY2sucHJvdG90eXBlLmNoZWNrb3V0SWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucHJveHkoJ3Byb3BlcnRpZXMuY2hlY2tvdXRfaWQnKSB8fCB0aGlzLnByb3h5KCdwcm9wZXJ0aWVzLmNoZWNrb3V0SWQnKTtcbn07XG5UcmFjay5wcm90b3R5cGUucGF5bWVudElkID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnByb3h5KCdwcm9wZXJ0aWVzLnBheW1lbnRfaWQnKSB8fCB0aGlzLnByb3h5KCdwcm9wZXJ0aWVzLnBheW1lbnRJZCcpO1xufTtcblRyYWNrLnByb3RvdHlwZS5jb3Vwb25JZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5wcm94eSgncHJvcGVydGllcy5jb3Vwb25faWQnKSB8fCB0aGlzLnByb3h5KCdwcm9wZXJ0aWVzLmNvdXBvbklkJyk7XG59O1xuVHJhY2sucHJvdG90eXBlLndpc2hsaXN0SWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucHJveHkoJ3Byb3BlcnRpZXMud2lzaGxpc3RfaWQnKSB8fCB0aGlzLnByb3h5KCdwcm9wZXJ0aWVzLndpc2hsaXN0SWQnKTtcbn07XG5UcmFjay5wcm90b3R5cGUucmV2aWV3SWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucHJveHkoJ3Byb3BlcnRpZXMucmV2aWV3X2lkJykgfHwgdGhpcy5wcm94eSgncHJvcGVydGllcy5yZXZpZXdJZCcpO1xufTtcblxuVHJhY2sucHJvdG90eXBlLm9yZGVySWQgPSBmdW5jdGlvbigpIHtcbiAgLy8gZG9lc24ndCBmb2xsb3cgYWJvdmUgY29udmVudGlvbiBzaW5jZSB0aGlzIGZhbGxiYWNrIG9yZGVyIHdhcyBob3cgaXQgdXNlZCB0byBiZVxuICByZXR1cm4gdGhpcy5wcm94eSgncHJvcGVydGllcy5pZCcpXG4gICAgfHwgdGhpcy5wcm94eSgncHJvcGVydGllcy5vcmRlcl9pZCcpXG4gICAgfHwgdGhpcy5wcm94eSgncHJvcGVydGllcy5vcmRlcklkJyk7XG59O1xuXG5UcmFjay5wcm90b3R5cGUuc2t1ID0gRmFjYWRlLnByb3h5KCdwcm9wZXJ0aWVzLnNrdScpO1xuVHJhY2sucHJvdG90eXBlLnRheCA9IEZhY2FkZS5wcm94eSgncHJvcGVydGllcy50YXgnKTtcblRyYWNrLnByb3RvdHlwZS5uYW1lID0gRmFjYWRlLnByb3h5KCdwcm9wZXJ0aWVzLm5hbWUnKTtcblRyYWNrLnByb3RvdHlwZS5wcmljZSA9IEZhY2FkZS5wcm94eSgncHJvcGVydGllcy5wcmljZScpO1xuVHJhY2sucHJvdG90eXBlLnRvdGFsID0gRmFjYWRlLnByb3h5KCdwcm9wZXJ0aWVzLnRvdGFsJyk7XG5UcmFjay5wcm90b3R5cGUucmVwZWF0ID0gRmFjYWRlLnByb3h5KCdwcm9wZXJ0aWVzLnJlcGVhdCcpO1xuVHJhY2sucHJvdG90eXBlLmNvdXBvbiA9IEZhY2FkZS5wcm94eSgncHJvcGVydGllcy5jb3Vwb24nKTtcblRyYWNrLnByb3RvdHlwZS5zaGlwcGluZyA9IEZhY2FkZS5wcm94eSgncHJvcGVydGllcy5zaGlwcGluZycpO1xuVHJhY2sucHJvdG90eXBlLmRpc2NvdW50ID0gRmFjYWRlLnByb3h5KCdwcm9wZXJ0aWVzLmRpc2NvdW50Jyk7XG5cblRyYWNrLnByb3RvdHlwZS5zaGlwcGluZ01ldGhvZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5wcm94eSgncHJvcGVydGllcy5zaGlwcGluZ19tZXRob2QnKSB8fCB0aGlzLnByb3h5KCdwcm9wZXJ0aWVzLnNoaXBwaW5nTWV0aG9kJyk7XG59O1xuXG5UcmFjay5wcm90b3R5cGUucGF5bWVudE1ldGhvZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5wcm94eSgncHJvcGVydGllcy5wYXltZW50X21ldGhvZCcpIHx8IHRoaXMucHJveHkoJ3Byb3BlcnRpZXMucGF5bWVudE1ldGhvZCcpO1xufTtcblxuLyoqXG4gKiBEZXNjcmlwdGlvblxuICovXG5cblRyYWNrLnByb3RvdHlwZS5kZXNjcmlwdGlvbiA9IEZhY2FkZS5wcm94eSgncHJvcGVydGllcy5kZXNjcmlwdGlvbicpO1xuXG4vKipcbiAqIFBsYW5cbiAqL1xuXG5UcmFjay5wcm90b3R5cGUucGxhbiA9IEZhY2FkZS5wcm94eSgncHJvcGVydGllcy5wbGFuJyk7XG5cbi8qKlxuICogR2V0IHN1YnRvdGFsLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuVHJhY2sucHJvdG90eXBlLnN1YnRvdGFsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzdWJ0b3RhbCA9IGdldCh0aGlzLnByb3BlcnRpZXMoKSwgJ3N1YnRvdGFsJyk7XG4gIHZhciB0b3RhbCA9IHRoaXMudG90YWwoKSB8fCB0aGlzLnJldmVudWUoKTtcblxuICBpZiAoc3VidG90YWwpIHJldHVybiBzdWJ0b3RhbDtcbiAgaWYgKCF0b3RhbCkgcmV0dXJuIDA7XG5cbiAgaWYgKHRoaXMudG90YWwoKSkge1xuICAgIHZhciBuID0gdGhpcy50YXgoKTtcbiAgICBpZiAobikgdG90YWwgLT0gbjtcbiAgICBuID0gdGhpcy5zaGlwcGluZygpO1xuICAgIGlmIChuKSB0b3RhbCAtPSBuO1xuICAgIG4gPSB0aGlzLmRpc2NvdW50KCk7XG4gICAgaWYgKG4pIHRvdGFsICs9IG47XG4gIH1cblxuICByZXR1cm4gdG90YWw7XG59O1xuXG4vKipcbiAqIEdldCBwcm9kdWN0cy5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xuVHJhY2sucHJvdG90eXBlLnByb2R1Y3RzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwcm9wcyA9IHRoaXMucHJvcGVydGllcygpO1xuICB2YXIgcHJvZHVjdHMgPSBnZXQocHJvcHMsICdwcm9kdWN0cycpO1xuICByZXR1cm4gdHlwZShwcm9kdWN0cykgPT09ICdhcnJheScgPyBwcm9kdWN0cyA6IFtdO1xufTtcblxuLyoqXG4gKiBHZXQgcXVhbnRpdHkuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5UcmFjay5wcm90b3R5cGUucXVhbnRpdHkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHByb3BzID0gdGhpcy5vYmoucHJvcGVydGllcyB8fCB7fTtcbiAgcmV0dXJuIHByb3BzLnF1YW50aXR5IHx8IDE7XG59O1xuXG4vKipcbiAqIEdldCBjdXJyZW5jeS5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cblRyYWNrLnByb3RvdHlwZS5jdXJyZW5jeSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcHJvcHMgPSB0aGlzLm9iai5wcm9wZXJ0aWVzIHx8IHt9O1xuICByZXR1cm4gcHJvcHMuY3VycmVuY3kgfHwgJ1VTRCc7XG59O1xuXG4vKipcbiAqIEJBQ0tXQVJEUyBDT01QQVRJQklMSVRZOiBzaG91bGQgcHJvYmFibHkgcmUtZXhhbWluZSB3aGVyZSB0aGVzZSBjb21lIGZyb20uXG4gKi9cblxuVHJhY2sucHJvdG90eXBlLnJlZmVycmVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnByb3h5KCdjb250ZXh0LnJlZmVycmVyLnVybCcpXG4gICAgfHwgdGhpcy5wcm94eSgnY29udGV4dC5wYWdlLnJlZmVycmVyJylcbiAgICB8fCB0aGlzLnByb3h5KCdwcm9wZXJ0aWVzLnJlZmVycmVyJyk7XG59O1xuXG5UcmFjay5wcm90b3R5cGUucXVlcnkgPSBGYWNhZGUucHJveHkoJ29wdGlvbnMucXVlcnknKTtcblxuLyoqXG4gKiBHZXQgdGhlIGNhbGwncyBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhbGlhc2VzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cblRyYWNrLnByb3RvdHlwZS5wcm9wZXJ0aWVzID0gZnVuY3Rpb24oYWxpYXNlcykge1xuICB2YXIgcmV0ID0gdGhpcy5maWVsZCgncHJvcGVydGllcycpIHx8IHt9O1xuICBhbGlhc2VzID0gYWxpYXNlcyB8fCB7fTtcblxuICBmb3IgKHZhciBhbGlhcyBpbiBhbGlhc2VzKSB7XG4gICAgdmFyIHZhbHVlID0gdGhpc1thbGlhc10gPT0gbnVsbCA/IHRoaXMucHJveHkoJ3Byb3BlcnRpZXMuJyArIGFsaWFzKSA6IHRoaXNbYWxpYXNdKCk7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIGNvbnRpbnVlO1xuICAgIHJldFthbGlhc2VzW2FsaWFzXV0gPSB2YWx1ZTtcbiAgICBkZWxldGUgcmV0W2FsaWFzXTtcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgY2FsbCdzIHVzZXJuYW1lLlxuICpcbiAqIEByZXR1cm4ge3N0cmluZ3x1bmRlZmluZWR9XG4gKi9cblRyYWNrLnByb3RvdHlwZS51c2VybmFtZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5wcm94eSgndHJhaXRzLnVzZXJuYW1lJylcbiAgICB8fCB0aGlzLnByb3h5KCdwcm9wZXJ0aWVzLnVzZXJuYW1lJylcbiAgICB8fCB0aGlzLnVzZXJJZCgpXG4gICAgfHwgdGhpcy5zZXNzaW9uSWQoKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBjYWxsJ3MgZW1haWwsIHVzaW5nIGFuIHRoZSB1c2VyIElEIGlmIGl0J3MgYSB2YWxpZCBlbWFpbC5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd8dW5kZWZpbmVkfVxuICovXG5UcmFjay5wcm90b3R5cGUuZW1haWwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGVtYWlsID0gdGhpcy5wcm94eSgndHJhaXRzLmVtYWlsJylcbiAgICB8fCB0aGlzLnByb3h5KCdwcm9wZXJ0aWVzLmVtYWlsJylcbiAgICB8fCB0aGlzLnByb3h5KCdvcHRpb25zLnRyYWl0cy5lbWFpbCcpO1xuICBpZiAoZW1haWwpIHJldHVybiBlbWFpbDtcblxuICB2YXIgdXNlcklkID0gdGhpcy51c2VySWQoKTtcbiAgaWYgKGlzRW1haWwodXNlcklkKSkgcmV0dXJuIHVzZXJJZDtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBjYWxsJ3MgcmV2ZW51ZSwgcGFyc2luZyBpdCBmcm9tIGEgc3RyaW5nIHdpdGggYW4gb3B0aW9uYWwgbGVhZGluZ1xuICogZG9sbGFyIHNpZ24uXG4gKlxuICogRm9yIHByb2R1Y3RzL3NlcnZpY2VzIHRoYXQgZG9uJ3QgaGF2ZSBzaGlwcGluZyBhbmQgYXJlIG5vdCBkaXJlY3RseSB0YXhlZCxcbiAqIHRoZXkgb25seSBjYXJlIGFib3V0IHRyYWNraW5nIGByZXZlbnVlYC4gVGhlc2UgYXJlIHRoaW5ncyBsaWtlXG4gKiBTYWFTIGNvbXBhbmllcywgd2hvIHNlbGwgbW9udGhseSBzdWJzY3JpcHRpb25zLiBUaGUgc3Vic2NyaXB0aW9ucyBhcmVuJ3RcbiAqIHRheGVkIGRpcmVjdGx5LCBhbmQgc2luY2UgaXQncyBhIGRpZ2l0YWwgcHJvZHVjdCwgaXQgaGFzIG5vIHNoaXBwaW5nLlxuICpcbiAqIFRoZSBvbmx5IGNhc2Ugd2hlcmUgdGhlcmUncyBhIGRpZmZlcmVuY2UgYmV0d2VlbiBgcmV2ZW51ZWAgYW5kIGB0b3RhbGBcbiAqIChpbiB0aGUgY29udGV4dCBvZiBhbmFseXRpY3MpIGlzIG9uIGVjb21tZXJjZSBwbGF0Zm9ybXMsIHdoZXJlIHRoZXkgd2FudFxuICogdGhlIGByZXZlbnVlYCBmdW5jdGlvbiB0byBhY3R1YWxseSByZXR1cm4gdGhlIGB0b3RhbGAgKHdoaWNoIGluY2x1ZGVzXG4gKiB0YXggYW5kIHNoaXBwaW5nLCB0b3RhbCA9IHN1YnRvdGFsICsgdGF4ICsgc2hpcHBpbmcpLiBUaGlzIGlzIHByb2JhYmx5XG4gKiBiZWNhdXNlIG9uIHRoZWlyIGJhY2tlbmQgdGhleSBhc3N1bWUgdGF4IGFuZCBzaGlwcGluZyBoYXMgYmVlbiBhcHBsaWVkIHRvXG4gKiB0aGUgdmFsdWUsIGFuZCBzbyBjYW4gZ2V0IHRoZSByZXZlbnVlIG9uIHRoZWlyIG93bi5cbiAqXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cblRyYWNrLnByb3RvdHlwZS5yZXZlbnVlID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXZlbnVlID0gdGhpcy5wcm94eSgncHJvcGVydGllcy5yZXZlbnVlJyk7XG4gIHZhciBldmVudCA9IHRoaXMuZXZlbnQoKTtcbiAgdmFyIG9yZGVyQ29tcGxldGVkUmVnRXhwID0gL15bIF9dP2NvbXBsZXRlZFsgX10/b3JkZXJbIF9dP3xeWyBfXT9vcmRlclsgX10/Y29tcGxldGVkWyBfXT8kL2k7XG5cbiAgLy8gaXQncyBhbHdheXMgcmV2ZW51ZSwgdW5sZXNzIGl0J3MgY2FsbGVkIGR1cmluZyBhbiBvcmRlciBjb21wbGV0aW9uLlxuICBpZiAoIXJldmVudWUgJiYgZXZlbnQgJiYgZXZlbnQubWF0Y2gob3JkZXJDb21wbGV0ZWRSZWdFeHApKSB7XG4gICAgcmV2ZW51ZSA9IHRoaXMucHJveHkoJ3Byb3BlcnRpZXMudG90YWwnKTtcbiAgfVxuXG4gIHJldHVybiBjdXJyZW5jeShyZXZlbnVlKTtcbn07XG5cbi8qKlxuICogR2V0IGNlbnRzLlxuICpcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuVHJhY2sucHJvdG90eXBlLmNlbnRzID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXZlbnVlID0gdGhpcy5yZXZlbnVlKCk7XG4gIHJldHVybiB0eXBlb2YgcmV2ZW51ZSAhPT0gJ251bWJlcicgPyB0aGlzLnZhbHVlKCkgfHwgMCA6IHJldmVudWUgKiAxMDA7XG59O1xuXG4vKipcbiAqIEEgdXRpbGl0eSB0byB0dXJuIHRoZSBwaWVjZXMgb2YgYSB0cmFjayBjYWxsIGludG8gYW4gaWRlbnRpZnkuIFVzZWQgZm9yXG4gKiBpbnRlZ3JhdGlvbnMgd2l0aCBzdXBlciBwcm9wZXJ0aWVzIG9yIHJhdGUgbGltaXRzLlxuICpcbiAqIFRPRE86IHJlbW92ZSBtZS5cbiAqXG4gKiBAcmV0dXJuIHtGYWNhZGV9XG4gKi9cblRyYWNrLnByb3RvdHlwZS5pZGVudGlmeSA9IGZ1bmN0aW9uKCkge1xuICB2YXIganNvbiA9IHRoaXMuanNvbigpO1xuICBqc29uLnRyYWl0cyA9IHRoaXMudHJhaXRzKCk7XG4gIHJldHVybiBuZXcgSWRlbnRpZnkoanNvbiwgdGhpcy5vcHRzKTtcbn07XG5cbi8qKlxuICogR2V0IGZsb2F0IGZyb20gY3VycmVuY3kgdmFsdWUuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gY3VycmVuY3kodmFsKSB7XG4gIGlmICghdmFsKSByZXR1cm47XG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWw7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWwgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFsID0gdmFsLnJlcGxhY2UoL1xcJC9nLCAnJyk7XG4gIHZhbCA9IHBhcnNlRmxvYXQodmFsKTtcblxuICBpZiAoIWlzTmFOKHZhbCkpIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59XG5cbi8qKlxuICogRXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWNrO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2VnbWVudGlvLWZhY2FkZS9saWIvdHJhY2suanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxyXG4vKipcclxuICogRXhwb3NlIGBFbWl0dGVyYC5cclxuICovXHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xyXG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcclxuICBmb3IgKHZhciBrZXkgaW4gRW1pdHRlci5wcm90b3R5cGUpIHtcclxuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcclxuICB9XHJcbiAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9uID1cclxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gICh0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXSlcclxuICAgIC5wdXNoKGZuKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcclxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgZnVuY3Rpb24gb24oKSB7XHJcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xyXG4gICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICB9XHJcblxyXG4gIG9uLmZuID0gZm47XHJcbiAgdGhpcy5vbihldmVudCwgb24pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXHJcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vZmYgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuXHJcbiAgLy8gYWxsXHJcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIHNwZWNpZmljIGV2ZW50XHJcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xyXG5cclxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXHJcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXHJcbiAgdmFyIGNiO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcclxuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XHJcbiAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXHJcbiAgICAsIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcblxyXG4gIGlmIChjYWxsYmFja3MpIHtcclxuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0FycmF5fVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW107XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgcmV0dXJuICEhIHRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgYmluZEFsbCA9IHJlcXVpcmUoJ2JpbmQtYWxsJyk7XG52YXIgY2xvbmUgPSByZXF1aXJlKCdAbmRob3VsZS9jbG9uZScpO1xudmFyIGNvb2tpZSA9IHJlcXVpcmUoJ2NvbXBvbmVudC1jb29raWUnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2FuYWx5dGljcy5qczpjb29raWUnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJ0BuZGhvdWxlL2RlZmF1bHRzJyk7XG52YXIganNvbiA9IHJlcXVpcmUoJ2pzb24zJyk7XG52YXIgdG9wRG9tYWluID0gcmVxdWlyZSgnQHNlZ21lbnQvdG9wLWRvbWFpbicpO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYENvb2tpZWAgd2l0aCBgb3B0aW9uc2AuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuXG5mdW5jdGlvbiBDb29raWUob3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMob3B0aW9ucyk7XG59XG5cblxuLyoqXG4gKiBHZXQgb3Igc2V0IHRoZSBjb29raWUgb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogICBAZmllbGQge051bWJlcn0gbWF4YWdlICgxIHllYXIpXG4gKiAgIEBmaWVsZCB7U3RyaW5nfSBkb21haW5cbiAqICAgQGZpZWxkIHtTdHJpbmd9IHBhdGhcbiAqICAgQGZpZWxkIHtCb29sZWFufSBzZWN1cmVcbiAqL1xuXG5Db29raWUucHJvdG90eXBlLm9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdGhpcy5fb3B0aW9ucztcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgZG9tYWluID0gJy4nICsgdG9wRG9tYWluKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgaWYgKGRvbWFpbiA9PT0gJy4nKSBkb21haW4gPSBudWxsO1xuXG4gIHRoaXMuX29wdGlvbnMgPSBkZWZhdWx0cyhvcHRpb25zLCB7XG4gICAgLy8gZGVmYXVsdCB0byBhIHllYXJcbiAgICBtYXhhZ2U6IDMxNTM2MDAwMDAwLFxuICAgIHBhdGg6ICcvJyxcbiAgICBkb21haW46IGRvbWFpblxuICB9KTtcblxuICAvLyBodHRwOi8vY3VybC5oYXh4LnNlL3JmYy9jb29raWVfc3BlYy5odG1sXG4gIC8vIGh0dHBzOi8vcHVibGljc3VmZml4Lm9yZy9saXN0L2VmZmVjdGl2ZV90bGRfbmFtZXMuZGF0XG4gIC8vXG4gIC8vIHRyeSBzZXR0aW5nIGEgZHVtbXkgY29va2llIHdpdGggdGhlIG9wdGlvbnNcbiAgLy8gaWYgdGhlIGNvb2tpZSBpc24ndCBzZXQsIGl0IHByb2JhYmx5IG1lYW5zXG4gIC8vIHRoYXQgdGhlIGRvbWFpbiBpcyBvbiB0aGUgcHVibGljIHN1ZmZpeCBsaXN0XG4gIC8vIGxpa2UgbXlhcHAuaGVyb2t1YXBwLmNvbSBvciBsb2NhbGhvc3QgLyBpcC5cbiAgdGhpcy5zZXQoJ2Fqczp0ZXN0JywgdHJ1ZSk7XG4gIGlmICghdGhpcy5nZXQoJ2Fqczp0ZXN0JykpIHtcbiAgICBkZWJ1ZygnZmFsbGJhY2sgdG8gZG9tYWluPW51bGwnKTtcbiAgICB0aGlzLl9vcHRpb25zLmRvbWFpbiA9IG51bGw7XG4gIH1cbiAgdGhpcy5yZW1vdmUoJ2Fqczp0ZXN0Jyk7XG59O1xuXG5cbi8qKlxuICogU2V0IGEgYGtleWAgYW5kIGB2YWx1ZWAgaW4gb3VyIGNvb2tpZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHNhdmVkXG4gKi9cblxuQ29va2llLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgdmFsdWUgPSBqc29uLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgY29va2llKGtleSwgdmFsdWUsIGNsb25lKHRoaXMuX29wdGlvbnMpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIEdldCBhIHZhbHVlIGZyb20gb3VyIGNvb2tpZSBieSBga2V5YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcmV0dXJuIHtPYmplY3R9IHZhbHVlXG4gKi9cblxuQ29va2llLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihrZXkpIHtcbiAgdHJ5IHtcbiAgICB2YXIgdmFsdWUgPSBjb29raWUoa2V5KTtcbiAgICB2YWx1ZSA9IHZhbHVlID8ganNvbi5wYXJzZSh2YWx1ZSkgOiBudWxsO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlIGEgdmFsdWUgZnJvbSBvdXIgY29va2llIGJ5IGBrZXlgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHJlbW92ZWRcbiAqL1xuXG5Db29raWUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGtleSkge1xuICB0cnkge1xuICAgIGNvb2tpZShrZXksIG51bGwsIGNsb25lKHRoaXMuX29wdGlvbnMpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIEV4cG9zZSB0aGUgY29va2llIHNpbmdsZXRvbi5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmRBbGwobmV3IENvb2tpZSgpKTtcblxuXG4vKipcbiAqIEV4cG9zZSB0aGUgYENvb2tpZWAgY29uc3RydWN0b3IuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMuQ29va2llID0gQ29va2llO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvYW5hbHl0aWNzLmpzLWNvcmUvbGliL2Nvb2tpZS5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnY29va2llJyk7XG5cbi8qKlxuICogU2V0IG9yIGdldCBjb29raWUgYG5hbWVgIHdpdGggYHZhbHVlYCBhbmQgYG9wdGlvbnNgIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSwgdmFsdWUsIG9wdGlvbnMpe1xuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDM6XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIHNldChuYW1lLCB2YWx1ZSwgb3B0aW9ucyk7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIGdldChuYW1lKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGFsbCgpO1xuICB9XG59O1xuXG4vKipcbiAqIFNldCBjb29raWUgYG5hbWVgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNldChuYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHN0ciA9IGVuY29kZShuYW1lKSArICc9JyArIGVuY29kZSh2YWx1ZSk7XG5cbiAgaWYgKG51bGwgPT0gdmFsdWUpIG9wdGlvbnMubWF4YWdlID0gLTE7XG5cbiAgaWYgKG9wdGlvbnMubWF4YWdlKSB7XG4gICAgb3B0aW9ucy5leHBpcmVzID0gbmV3IERhdGUoK25ldyBEYXRlICsgb3B0aW9ucy5tYXhhZ2UpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMucGF0aCkgc3RyICs9ICc7IHBhdGg9JyArIG9wdGlvbnMucGF0aDtcbiAgaWYgKG9wdGlvbnMuZG9tYWluKSBzdHIgKz0gJzsgZG9tYWluPScgKyBvcHRpb25zLmRvbWFpbjtcbiAgaWYgKG9wdGlvbnMuZXhwaXJlcykgc3RyICs9ICc7IGV4cGlyZXM9JyArIG9wdGlvbnMuZXhwaXJlcy50b1VUQ1N0cmluZygpO1xuICBpZiAob3B0aW9ucy5zZWN1cmUpIHN0ciArPSAnOyBzZWN1cmUnO1xuXG4gIGRvY3VtZW50LmNvb2tpZSA9IHN0cjtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYWxsIGNvb2tpZXMuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gYWxsKCkge1xuICB2YXIgc3RyO1xuICB0cnkge1xuICAgIHN0ciA9IGRvY3VtZW50LmNvb2tpZTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2sgfHwgZXJyKTtcbiAgICB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG4gIHJldHVybiBwYXJzZShzdHIpO1xufVxuXG4vKipcbiAqIEdldCBjb29raWUgYG5hbWVgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBnZXQobmFtZSkge1xuICByZXR1cm4gYWxsKClbbmFtZV07XG59XG5cbi8qKlxuICogUGFyc2UgY29va2llIGBzdHJgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICB2YXIgb2JqID0ge307XG4gIHZhciBwYWlycyA9IHN0ci5zcGxpdCgvICo7ICovKTtcbiAgdmFyIHBhaXI7XG4gIGlmICgnJyA9PSBwYWlyc1swXSkgcmV0dXJuIG9iajtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7ICsraSkge1xuICAgIHBhaXIgPSBwYWlyc1tpXS5zcGxpdCgnPScpO1xuICAgIG9ialtkZWNvZGUocGFpclswXSldID0gZGVjb2RlKHBhaXJbMV0pO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogRW5jb2RlLlxuICovXG5cbmZ1bmN0aW9uIGVuY29kZSh2YWx1ZSl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBkZWJ1ZygnZXJyb3IgYGVuY29kZSglbylgIC0gJW8nLCB2YWx1ZSwgZSlcbiAgfVxufVxuXG4vKipcbiAqIERlY29kZS5cbiAqL1xuXG5mdW5jdGlvbiBkZWNvZGUodmFsdWUpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGRlYnVnKCdlcnJvciBgZGVjb2RlKCVvKWAgLSAlbycsIHZhbHVlLCBlKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb21wb25lbnQtY29va2llL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBlYWNoID0gcmVxdWlyZSgnQG5kaG91bGUvZWFjaCcpO1xuXG4vKipcbiAqIFJlZHVjZXMgYWxsIHRoZSB2YWx1ZXMgaW4gYSBjb2xsZWN0aW9uIGRvd24gaW50byBhIHNpbmdsZSB2YWx1ZS4gRG9lcyBzbyBieSBpdGVyYXRpbmcgdGhyb3VnaCB0aGVcbiAqIGNvbGxlY3Rpb24gZnJvbSBsZWZ0IHRvIHJpZ2h0LCByZXBlYXRlZGx5IGNhbGxpbmcgYW4gYGl0ZXJhdG9yYCBmdW5jdGlvbiBhbmQgcGFzc2luZyB0byBpdCBmb3VyXG4gKiBhcmd1bWVudHM6IGAoYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbilgLlxuICpcbiAqIFJldHVybnMgdGhlIGZpbmFsIHJldHVybiB2YWx1ZSBvZiB0aGUgYGl0ZXJhdG9yYCBmdW5jdGlvbi5cbiAqXG4gKiBAbmFtZSBmb2xkbFxuICogQGFwaSBwdWJsaWNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdG9yIFRoZSBmdW5jdGlvbiB0byBpbnZva2UgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gYWNjdW11bGF0b3IgVGhlIGluaXRpYWwgYWNjdW11bGF0b3IgdmFsdWUsIHBhc3NlZCB0byB0aGUgZmlyc3QgaW52b2NhdGlvbiBvZiBgaXRlcmF0b3JgLlxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7Kn0gVGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgZmluYWwgY2FsbCB0byBgaXRlcmF0b3JgLlxuICogQGV4YW1wbGVcbiAqIGZvbGRsKGZ1bmN0aW9uKHRvdGFsLCBuKSB7XG4gKiAgIHJldHVybiB0b3RhbCArIG47XG4gKiB9LCAwLCBbMSwgMiwgM10pO1xuICogLy89PiA2XG4gKlxuICogdmFyIHBob25lYm9vayA9IHsgYm9iOiAnNTU1LTExMS0yMzQ1JywgdGltOiAnNjU1LTIyMi02Nzg5Jywgc2hlaWxhOiAnNjU1LTMzMy0xMjk4JyB9O1xuICpcbiAqIGZvbGRsKGZ1bmN0aW9uKHJlc3VsdHMsIHBob25lTnVtYmVyKSB7XG4gKiAgaWYgKHBob25lTnVtYmVyWzBdID09PSAnNicpIHtcbiAqICAgIHJldHVybiByZXN1bHRzLmNvbmNhdChwaG9uZU51bWJlcik7XG4gKiAgfVxuICogIHJldHVybiByZXN1bHRzO1xuICogfSwgW10sIHBob25lYm9vayk7XG4gKiAvLyA9PiBbJzY1NS0yMjItNjc4OScsICc2NTUtMzMzLTEyOTgnXVxuICovXG52YXIgZm9sZGwgPSBmdW5jdGlvbiBmb2xkbChpdGVyYXRvciwgYWNjdW11bGF0b3IsIGNvbGxlY3Rpb24pIHtcbiAgaWYgKHR5cGVvZiBpdGVyYXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgZnVuY3Rpb24gYnV0IHJlY2VpdmVkIGEgJyArIHR5cGVvZiBpdGVyYXRvcik7XG4gIH1cblxuICBlYWNoKGZ1bmN0aW9uKHZhbCwgaSwgY29sbGVjdGlvbikge1xuICAgIGFjY3VtdWxhdG9yID0gaXRlcmF0b3IoYWNjdW11bGF0b3IsIHZhbCwgaSwgY29sbGVjdGlvbik7XG4gIH0sIGNvbGxlY3Rpb24pO1xuXG4gIHJldHVybiBhY2N1bXVsYXRvcjtcbn07XG5cbi8qXG4gKiBFeHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZm9sZGw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AbmRob3VsZS9mb2xkbC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgZWFjaCA9IHJlcXVpcmUoJ0BuZGhvdWxlL2VhY2gnKTtcblxudmFyIHN0ckluZGV4T2YgPSBTdHJpbmcucHJvdG90eXBlLmluZGV4T2Y7XG5cbi8qKlxuICogT2JqZWN0LmlzL3NhbWVWYWx1ZVplcm8gcG9seWZpbGwuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlMVxuICogQHBhcmFtIHsqfSB2YWx1ZTJcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbi8vIFRPRE86IE1vdmUgdG8gbGlicmFyeVxudmFyIHNhbWVWYWx1ZVplcm8gPSBmdW5jdGlvbiBzYW1lVmFsdWVaZXJvKHZhbHVlMSwgdmFsdWUyKSB7XG4gIC8vIE5vcm1hbCB2YWx1ZXMgYW5kIGNoZWNrIGZvciAwIC8gLTBcbiAgaWYgKHZhbHVlMSA9PT0gdmFsdWUyKSB7XG4gICAgcmV0dXJuIHZhbHVlMSAhPT0gMCB8fCAxIC8gdmFsdWUxID09PSAxIC8gdmFsdWUyO1xuICB9XG4gIC8vIE5hTlxuICByZXR1cm4gdmFsdWUxICE9PSB2YWx1ZTEgJiYgdmFsdWUyICE9PSB2YWx1ZTI7XG59O1xuXG4vKipcbiAqIFNlYXJjaGVzIGEgZ2l2ZW4gYGNvbGxlY3Rpb25gIGZvciBhIHZhbHVlLCByZXR1cm5pbmcgdHJ1ZSBpZiB0aGUgY29sbGVjdGlvblxuICogY29udGFpbnMgdGhlIHZhbHVlIGFuZCBmYWxzZSBvdGhlcndpc2UuIENhbiBzZWFyY2ggc3RyaW5ncywgYXJyYXlzLCBhbmRcbiAqIG9iamVjdHMuXG4gKlxuICogQG5hbWUgaW5jbHVkZXNcbiAqIEBhcGkgcHVibGljXG4gKiBAcGFyYW0geyp9IHNlYXJjaEVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fHN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBzZWFyY2guXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICogQGV4YW1wbGVcbiAqIGluY2x1ZGVzKDIsIFsxLCAyLCAzXSk7XG4gKiAvLz0+IHRydWVcbiAqXG4gKiBpbmNsdWRlcyg0LCBbMSwgMiwgM10pO1xuICogLy89PiBmYWxzZVxuICpcbiAqIGluY2x1ZGVzKDIsIHsgYTogMSwgYjogMiwgYzogMyB9KTtcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIGluY2x1ZGVzKCdhJywgeyBhOiAxLCBiOiAyLCBjOiAzIH0pO1xuICogLy89PiBmYWxzZVxuICpcbiAqIGluY2x1ZGVzKCdhYmMnLCAneHl6YWJjIG9wcScpO1xuICogLy89PiB0cnVlXG4gKlxuICogaW5jbHVkZXMoJ25vcGUnLCAneHl6YWJjIG9wcScpO1xuICogLy89PiBmYWxzZVxuICovXG52YXIgaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyhzZWFyY2hFbGVtZW50LCBjb2xsZWN0aW9uKSB7XG4gIHZhciBmb3VuZCA9IGZhbHNlO1xuXG4gIC8vIERlbGVnYXRlIHRvIFN0cmluZy5wcm90b3R5cGUuaW5kZXhPZiB3aGVuIGBjb2xsZWN0aW9uYCBpcyBhIHN0cmluZ1xuICBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHN0ckluZGV4T2YuY2FsbChjb2xsZWN0aW9uLCBzZWFyY2hFbGVtZW50KSAhPT0gLTE7XG4gIH1cblxuICAvLyBJdGVyYXRlIHRocm91Z2ggZW51bWVyYWJsZS9vd24gYXJyYXkgZWxlbWVudHMgYW5kIG9iamVjdCBwcm9wZXJ0aWVzLlxuICBlYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKHNhbWVWYWx1ZVplcm8odmFsdWUsIHNlYXJjaEVsZW1lbnQpKSB7XG4gICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAvLyBFeGl0IGl0ZXJhdGlvbiBlYXJseSB3aGVuIGZvdW5kXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCBjb2xsZWN0aW9uKTtcblxuICByZXR1cm4gZm91bmQ7XG59O1xuXG4vKlxuICogRXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGluY2x1ZGVzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQG5kaG91bGUvaW5jbHVkZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiB0b1N0cmluZyByZWYuXG4gKi9cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBSZXR1cm4gdGhlIHR5cGUgb2YgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsKXtcbiAgc3dpdGNoICh0b1N0cmluZy5jYWxsKHZhbCkpIHtcbiAgICBjYXNlICdbb2JqZWN0IEZ1bmN0aW9uXSc6IHJldHVybiAnZnVuY3Rpb24nO1xuICAgIGNhc2UgJ1tvYmplY3QgRGF0ZV0nOiByZXR1cm4gJ2RhdGUnO1xuICAgIGNhc2UgJ1tvYmplY3QgUmVnRXhwXSc6IHJldHVybiAncmVnZXhwJztcbiAgICBjYXNlICdbb2JqZWN0IEFyZ3VtZW50c10nOiByZXR1cm4gJ2FyZ3VtZW50cyc7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheV0nOiByZXR1cm4gJ2FycmF5JztcbiAgfVxuXG4gIGlmICh2YWwgPT09IG51bGwpIHJldHVybiAnbnVsbCc7XG4gIGlmICh2YWwgPT09IHVuZGVmaW5lZCkgcmV0dXJuICd1bmRlZmluZWQnO1xuICBpZiAodmFsID09PSBPYmplY3QodmFsKSkgcmV0dXJuICdvYmplY3QnO1xuXG4gIHJldHVybiB0eXBlb2YgdmFsO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGUtY29tcG9uZW50L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTWF0Y2hlciwgc2xpZ2h0bHkgbW9kaWZpZWQgZnJvbTpcbiAqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY3Nub3Zlci9qcy1pc284NjAxL2Jsb2IvbGF4L2lzbzg2MDEuanNcbiAqL1xuXG52YXIgbWF0Y2hlciA9IC9eKFxcZHs0fSkoPzotPyhcXGR7Mn0pKD86LT8oXFxkezJ9KSk/KT8oPzooWyBUXSkoXFxkezJ9KTo/KFxcZHsyfSkoPzo6PyhcXGR7Mn0pKD86WyxcXC5dKFxcZHsxLH0pKT8pPyg/OihaKXwoWytcXC1dKShcXGR7Mn0pKD86Oj8oXFxkezJ9KSk/KT8pPyQvO1xuXG4vKipcbiAqIENvbnZlcnQgYW4gSVNPIGRhdGUgc3RyaW5nIHRvIGEgZGF0ZS4gRmFsbGJhY2sgdG8gbmF0aXZlIGBEYXRlLnBhcnNlYC5cbiAqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vY3Nub3Zlci9qcy1pc284NjAxL2Jsb2IvbGF4L2lzbzg2MDEuanNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaXNvXG4gKiBAcmV0dXJuIHtEYXRlfVxuICovXG5cbmV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbihpc28pIHtcbiAgdmFyIG51bWVyaWNLZXlzID0gWzEsIDUsIDYsIDcsIDExLCAxMl07XG4gIHZhciBhcnIgPSBtYXRjaGVyLmV4ZWMoaXNvKTtcbiAgdmFyIG9mZnNldCA9IDA7XG5cbiAgLy8gZmFsbGJhY2sgdG8gbmF0aXZlIHBhcnNpbmdcbiAgaWYgKCFhcnIpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoaXNvKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbmQtYXNzaWduICovXG4gIC8vIHJlbW92ZSB1bmRlZmluZWQgdmFsdWVzXG4gIGZvciAodmFyIGkgPSAwLCB2YWw7IHZhbCA9IG51bWVyaWNLZXlzW2ldOyBpKyspIHtcbiAgICBhcnJbdmFsXSA9IHBhcnNlSW50KGFyclt2YWxdLCAxMCkgfHwgMDtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbmQtYXNzaWduICovXG5cbiAgLy8gYWxsb3cgdW5kZWZpbmVkIGRheXMgYW5kIG1vbnRoc1xuICBhcnJbMl0gPSBwYXJzZUludChhcnJbMl0sIDEwKSB8fCAxO1xuICBhcnJbM10gPSBwYXJzZUludChhcnJbM10sIDEwKSB8fCAxO1xuXG4gIC8vIG1vbnRoIGlzIDAtMTFcbiAgYXJyWzJdLS07XG5cbiAgLy8gYWxsb3cgYWJpdHJhcnkgc3ViLXNlY29uZCBwcmVjaXNpb25cbiAgYXJyWzhdID0gYXJyWzhdID8gKGFycls4XSArICcwMCcpLnN1YnN0cmluZygwLCAzKSA6IDA7XG5cbiAgLy8gYXBwbHkgdGltZXpvbmUgaWYgb25lIGV4aXN0c1xuICBpZiAoYXJyWzRdID09PSAnICcpIHtcbiAgICBvZmZzZXQgPSBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCk7XG4gIH0gZWxzZSBpZiAoYXJyWzldICE9PSAnWicgJiYgYXJyWzEwXSkge1xuICAgIG9mZnNldCA9IGFyclsxMV0gKiA2MCArIGFyclsxMl07XG4gICAgaWYgKGFyclsxMF0gPT09ICcrJykge1xuICAgICAgb2Zmc2V0ID0gMCAtIG9mZnNldDtcbiAgICB9XG4gIH1cblxuICB2YXIgbWlsbGlzID0gRGF0ZS5VVEMoYXJyWzFdLCBhcnJbMl0sIGFyclszXSwgYXJyWzVdLCBhcnJbNl0gKyBvZmZzZXQsIGFycls3XSwgYXJyWzhdKTtcbiAgcmV0dXJuIG5ldyBEYXRlKG1pbGxpcyk7XG59O1xuXG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgYSBgc3RyaW5nYCBpcyBhbiBJU08gZGF0ZSBzdHJpbmcuIGBzdHJpY3RgIG1vZGUgcmVxdWlyZXMgdGhhdFxuICogdGhlIGRhdGUgc3RyaW5nIGF0IGxlYXN0IGhhdmUgYSB5ZWFyLCBtb250aCBhbmQgZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHN0cmljdFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG5leHBvcnRzLmlzID0gZnVuY3Rpb24oc3RyaW5nLCBzdHJpY3QpIHtcbiAgaWYgKHN0cmljdCAmJiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfS8pLnRlc3Qoc3RyaW5nKSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIG1hdGNoZXIudGVzdChzdHJpbmcpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L2lzb2RhdGUvbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciB0eXBlID0gcmVxdWlyZSgnY29tcG9uZW50LXR5cGUnKTtcbnZhciBlYWNoID0gcmVxdWlyZSgnY29tcG9uZW50LWVhY2gnKTtcbnZhciBpc29kYXRlID0gcmVxdWlyZSgnQHNlZ21lbnQvaXNvZGF0ZScpO1xuXG4vKipcbiAqIEV4cG9zZSBgdHJhdmVyc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gdHJhdmVyc2U7XG5cbi8qKlxuICogVHJhdmVyc2UgYW4gb2JqZWN0IG9yIGFycmF5LCBhbmQgcmV0dXJuIGEgY2xvbmUgd2l0aCBhbGwgSVNPIHN0cmluZ3MgcGFyc2VkXG4gKiBpbnRvIERhdGUgb2JqZWN0cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cblxuZnVuY3Rpb24gdHJhdmVyc2UoaW5wdXQsIHN0cmljdCkge1xuICBpZiAoc3RyaWN0ID09PSB1bmRlZmluZWQpIHN0cmljdCA9IHRydWU7XG5cbiAgaWYgKHR5cGUoaW5wdXQpID09PSAnb2JqZWN0JykgcmV0dXJuIG9iamVjdChpbnB1dCwgc3RyaWN0KTtcbiAgaWYgKHR5cGUoaW5wdXQpID09PSAnYXJyYXknKSByZXR1cm4gYXJyYXkoaW5wdXQsIHN0cmljdCk7XG4gIHJldHVybiBpbnB1dDtcbn1cblxuLyoqXG4gKiBPYmplY3QgdHJhdmVyc2VyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc3RyaWN0XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cblxuZnVuY3Rpb24gb2JqZWN0KG9iaiwgc3RyaWN0KSB7XG4gIGVhY2gob2JqLCBmdW5jdGlvbihrZXksIHZhbCkge1xuICAgIGlmIChpc29kYXRlLmlzKHZhbCwgc3RyaWN0KSkge1xuICAgICAgb2JqW2tleV0gPSBpc29kYXRlLnBhcnNlKHZhbCk7XG4gICAgfSBlbHNlIGlmICh0eXBlKHZhbCkgPT09ICdvYmplY3QnIHx8IHR5cGUodmFsKSA9PT0gJ2FycmF5Jykge1xuICAgICAgdHJhdmVyc2UodmFsLCBzdHJpY3QpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogQXJyYXkgdHJhdmVyc2VyLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHBhcmFtIHtCb29sZWFufSBzdHJpY3RcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5cbmZ1bmN0aW9uIGFycmF5KGFyciwgc3RyaWN0KSB7XG4gIGVhY2goYXJyLCBmdW5jdGlvbih2YWwsIHgpIHtcbiAgICBpZiAodHlwZSh2YWwpID09PSAnb2JqZWN0Jykge1xuICAgICAgdHJhdmVyc2UodmFsLCBzdHJpY3QpO1xuICAgIH0gZWxzZSBpZiAoaXNvZGF0ZS5pcyh2YWwsIHN0cmljdCkpIHtcbiAgICAgIGFyclt4XSA9IGlzb2RhdGUucGFyc2UodmFsKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYXJyO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvaXNvZGF0ZS10cmF2ZXJzZS9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnRyeSB7XG4gIHZhciB0eXBlID0gcmVxdWlyZSgndHlwZScpO1xufSBjYXRjaCAoZXJyKSB7XG4gIHZhciB0eXBlID0gcmVxdWlyZSgnY29tcG9uZW50LXR5cGUnKTtcbn1cblxudmFyIHRvRnVuY3Rpb24gPSByZXF1aXJlKCd0by1mdW5jdGlvbicpO1xuXG4vKipcbiAqIEhPUCByZWZlcmVuY2UuXG4gKi9cblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogSXRlcmF0ZSB0aGUgZ2l2ZW4gYG9iamAgYW5kIGludm9rZSBgZm4odmFsLCBpKWBcbiAqIGluIG9wdGlvbmFsIGNvbnRleHQgYGN0eGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl8T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gW2N0eF1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmosIGZuLCBjdHgpe1xuICBmbiA9IHRvRnVuY3Rpb24oZm4pO1xuICBjdHggPSBjdHggfHwgdGhpcztcbiAgc3dpdGNoICh0eXBlKG9iaikpIHtcbiAgICBjYXNlICdhcnJheSc6XG4gICAgICByZXR1cm4gYXJyYXkob2JqLCBmbiwgY3R4KTtcbiAgICBjYXNlICdvYmplY3QnOlxuICAgICAgaWYgKCdudW1iZXInID09IHR5cGVvZiBvYmoubGVuZ3RoKSByZXR1cm4gYXJyYXkob2JqLCBmbiwgY3R4KTtcbiAgICAgIHJldHVybiBvYmplY3Qob2JqLCBmbiwgY3R4KTtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHN0cmluZyhvYmosIGZuLCBjdHgpO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgc3RyaW5nIGNoYXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBvYmpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzdHJpbmcob2JqLCBmbiwgY3R4KSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgKytpKSB7XG4gICAgZm4uY2FsbChjdHgsIG9iai5jaGFyQXQoaSksIGkpO1xuICB9XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvYmplY3Qga2V5cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3R9IGN0eFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gb2JqZWN0KG9iaiwgZm4sIGN0eCkge1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgZm4uY2FsbChjdHgsIGtleSwgb2JqW2tleV0pO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEl0ZXJhdGUgYXJyYXktaXNoLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBhcnJheShvYmosIGZuLCBjdHgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyArK2kpIHtcbiAgICBmbi5jYWxsKGN0eCwgb2JqW2ldLCBpKTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVhY2gvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiB0b1N0cmluZyByZWYuXG4gKi9cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBSZXR1cm4gdGhlIHR5cGUgb2YgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsKXtcbiAgc3dpdGNoICh0b1N0cmluZy5jYWxsKHZhbCkpIHtcbiAgICBjYXNlICdbb2JqZWN0IEZ1bmN0aW9uXSc6IHJldHVybiAnZnVuY3Rpb24nO1xuICAgIGNhc2UgJ1tvYmplY3QgRGF0ZV0nOiByZXR1cm4gJ2RhdGUnO1xuICAgIGNhc2UgJ1tvYmplY3QgUmVnRXhwXSc6IHJldHVybiAncmVnZXhwJztcbiAgICBjYXNlICdbb2JqZWN0IEFyZ3VtZW50c10nOiByZXR1cm4gJ2FyZ3VtZW50cyc7XG4gICAgY2FzZSAnW29iamVjdCBBcnJheV0nOiByZXR1cm4gJ2FycmF5JztcbiAgICBjYXNlICdbb2JqZWN0IFN0cmluZ10nOiByZXR1cm4gJ3N0cmluZyc7XG4gIH1cblxuICBpZiAodmFsID09PSBudWxsKSByZXR1cm4gJ251bGwnO1xuICBpZiAodmFsID09PSB1bmRlZmluZWQpIHJldHVybiAndW5kZWZpbmVkJztcbiAgaWYgKHZhbCAmJiB2YWwubm9kZVR5cGUgPT09IDEpIHJldHVybiAnZWxlbWVudCc7XG4gIGlmICh2YWwgPT09IE9iamVjdCh2YWwpKSByZXR1cm4gJ29iamVjdCc7XG5cbiAgcmV0dXJuIHR5cGVvZiB2YWw7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVhY2gvbm9kZV9tb2R1bGVzL2NvbXBvbmVudC10eXBlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEdsb2JhbCBOYW1lc1xuICovXG5cbnZhciBnbG9iYWxzID0gL1xcYihBcnJheXxEYXRlfE9iamVjdHxNYXRofEpTT04pXFxiL2c7XG5cbi8qKlxuICogUmV0dXJuIGltbWVkaWF0ZSBpZGVudGlmaWVycyBwYXJzZWQgZnJvbSBgc3RyYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gbWFwIGZ1bmN0aW9uIG9yIHByZWZpeFxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc3RyLCBmbil7XG4gIHZhciBwID0gdW5pcXVlKHByb3BzKHN0cikpO1xuICBpZiAoZm4gJiYgJ3N0cmluZycgPT0gdHlwZW9mIGZuKSBmbiA9IHByZWZpeGVkKGZuKTtcbiAgaWYgKGZuKSByZXR1cm4gbWFwKHN0ciwgcCwgZm4pO1xuICByZXR1cm4gcDtcbn07XG5cbi8qKlxuICogUmV0dXJuIGltbWVkaWF0ZSBpZGVudGlmaWVycyBpbiBgc3RyYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHByb3BzKHN0cikge1xuICByZXR1cm4gc3RyXG4gICAgLnJlcGxhY2UoL1xcLlxcdyt8XFx3KyAqXFwofFwiW15cIl0qXCJ8J1teJ10qJ3xcXC8oW14vXSspXFwvL2csICcnKVxuICAgIC5yZXBsYWNlKGdsb2JhbHMsICcnKVxuICAgIC5tYXRjaCgvW2EtekEtWl9dXFx3Ki9nKVxuICAgIHx8IFtdO1xufVxuXG4vKipcbiAqIFJldHVybiBgc3RyYCB3aXRoIGBwcm9wc2AgbWFwcGVkIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG1hcChzdHIsIHByb3BzLCBmbikge1xuICB2YXIgcmUgPSAvXFwuXFx3K3xcXHcrICpcXCh8XCJbXlwiXSpcInwnW14nXSonfFxcLyhbXi9dKylcXC98W2EtekEtWl9dXFx3Ki9nO1xuICByZXR1cm4gc3RyLnJlcGxhY2UocmUsIGZ1bmN0aW9uKF8pe1xuICAgIGlmICgnKCcgPT0gX1tfLmxlbmd0aCAtIDFdKSByZXR1cm4gZm4oXyk7XG4gICAgaWYgKCF+cHJvcHMuaW5kZXhPZihfKSkgcmV0dXJuIF87XG4gICAgcmV0dXJuIGZuKF8pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdW5pcXVlIGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiB1bmlxdWUoYXJyKSB7XG4gIHZhciByZXQgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmICh+cmV0LmluZGV4T2YoYXJyW2ldKSkgY29udGludWU7XG4gICAgcmV0LnB1c2goYXJyW2ldKTtcbiAgfVxuXG4gIHJldHVybiByZXQ7XG59XG5cbi8qKlxuICogTWFwIHdpdGggcHJlZml4IGBzdHJgLlxuICovXG5cbmZ1bmN0aW9uIHByZWZpeGVkKHN0cikge1xuICByZXR1cm4gZnVuY3Rpb24oXyl7XG4gICAgcmV0dXJuIHN0ciArIF87XG4gIH07XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb21wb25lbnQtcHJvcHMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIEZhY2FkZSA9IHJlcXVpcmUoJy4vZmFjYWRlJyk7XG52YXIgZ2V0ID0gcmVxdWlyZSgnb2JqLWNhc2UnKTtcbnZhciBpbmhlcml0ID0gcmVxdWlyZSgnLi91dGlscycpLmluaGVyaXQ7XG52YXIgaXNFbWFpbCA9IHJlcXVpcmUoJ2lzLWVtYWlsJyk7XG52YXIgbmV3RGF0ZSA9IHJlcXVpcmUoJ25ldy1kYXRlJyk7XG52YXIgdHJpbSA9IHJlcXVpcmUoJ3RyaW0nKTtcbnZhciB0eXBlID0gcmVxdWlyZSgnLi91dGlscycpLnR5cGU7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgSWRlbnRpZnlgIGZhY2FkZSB3aXRoIGEgYGRpY3Rpb25hcnlgIG9mIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGljdGlvbmFyeVxuICogICBAcGFyYW0ge3N0cmluZ30gdXNlcklkXG4gKiAgIEBwYXJhbSB7c3RyaW5nfSBzZXNzaW9uSWRcbiAqICAgQHBhcmFtIHtPYmplY3R9IHRyYWl0c1xuICogICBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqICAgQHByb3BlcnR5IHtib29sZWFufHVuZGVmaW5lZH0gY2xvbmVcbiAqL1xuZnVuY3Rpb24gSWRlbnRpZnkoZGljdGlvbmFyeSwgb3B0cykge1xuICBGYWNhZGUuY2FsbCh0aGlzLCBkaWN0aW9uYXJ5LCBvcHRzKTtcbn1cblxuLyoqXG4gKiBJbmhlcml0IGZyb20gYEZhY2FkZWAuXG4gKi9cblxuaW5oZXJpdChJZGVudGlmeSwgRmFjYWRlKTtcblxuLyoqXG4gKiBHZXQgdGhlIGZhY2FkZSdzIGFjdGlvbi5cbiAqL1xuSWRlbnRpZnkucHJvdG90eXBlLmFjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ2lkZW50aWZ5Jztcbn07XG5cbklkZW50aWZ5LnByb3RvdHlwZS50eXBlID0gSWRlbnRpZnkucHJvdG90eXBlLmFjdGlvbjtcblxuLyoqXG4gKiBHZXQgdGhlIHVzZXIncyB0cmFpdHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFsaWFzZXNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuSWRlbnRpZnkucHJvdG90eXBlLnRyYWl0cyA9IGZ1bmN0aW9uKGFsaWFzZXMpIHtcbiAgdmFyIHJldCA9IHRoaXMuZmllbGQoJ3RyYWl0cycpIHx8IHt9O1xuICB2YXIgaWQgPSB0aGlzLnVzZXJJZCgpO1xuICBhbGlhc2VzID0gYWxpYXNlcyB8fCB7fTtcblxuICBpZiAoaWQpIHJldC5pZCA9IGlkO1xuXG4gIGZvciAodmFyIGFsaWFzIGluIGFsaWFzZXMpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzW2FsaWFzXSA9PSBudWxsID8gdGhpcy5wcm94eSgndHJhaXRzLicgKyBhbGlhcykgOiB0aGlzW2FsaWFzXSgpO1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSBjb250aW51ZTtcbiAgICByZXRbYWxpYXNlc1thbGlhc11dID0gdmFsdWU7XG4gICAgaWYgKGFsaWFzICE9PSBhbGlhc2VzW2FsaWFzXSkgZGVsZXRlIHJldFthbGlhc107XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIHVzZXIncyBlbWFpbCwgZmFsbGluZyBiYWNrIHRvIHRoZWlyIHVzZXIgSUQgaWYgaXQncyBhIHZhbGlkIGVtYWlsLlxuICpcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuSWRlbnRpZnkucHJvdG90eXBlLmVtYWlsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBlbWFpbCA9IHRoaXMucHJveHkoJ3RyYWl0cy5lbWFpbCcpO1xuICBpZiAoZW1haWwpIHJldHVybiBlbWFpbDtcblxuICB2YXIgdXNlcklkID0gdGhpcy51c2VySWQoKTtcbiAgaWYgKGlzRW1haWwodXNlcklkKSkgcmV0dXJuIHVzZXJJZDtcbn07XG5cbi8qKlxuICogR2V0IHRoZSB1c2VyJ3MgY3JlYXRlZCBkYXRlLCBvcHRpb25hbGx5IGxvb2tpbmcgZm9yIGBjcmVhdGVkQXRgIHNpbmNlIGxvdHMgb2ZcbiAqIHBlb3BsZSBkbyB0aGF0IGluc3RlYWQuXG4gKlxuICogQHJldHVybiB7RGF0ZXx1bmRlZmluZWR9XG4gKi9cbklkZW50aWZ5LnByb3RvdHlwZS5jcmVhdGVkID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjcmVhdGVkID0gdGhpcy5wcm94eSgndHJhaXRzLmNyZWF0ZWQnKSB8fCB0aGlzLnByb3h5KCd0cmFpdHMuY3JlYXRlZEF0Jyk7XG4gIGlmIChjcmVhdGVkKSByZXR1cm4gbmV3RGF0ZShjcmVhdGVkKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBjb21wYW55IGNyZWF0ZWQgZGF0ZS5cbiAqXG4gKiBAcmV0dXJuIHtEYXRlfHVuZGVmaW5lZH1cbiAqL1xuSWRlbnRpZnkucHJvdG90eXBlLmNvbXBhbnlDcmVhdGVkID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjcmVhdGVkID0gdGhpcy5wcm94eSgndHJhaXRzLmNvbXBhbnkuY3JlYXRlZCcpIHx8IHRoaXMucHJveHkoJ3RyYWl0cy5jb21wYW55LmNyZWF0ZWRBdCcpO1xuXG4gIGlmIChjcmVhdGVkKSB7XG4gICAgcmV0dXJuIG5ld0RhdGUoY3JlYXRlZCk7XG4gIH1cbn07XG5cbi8qKlxuICogR2V0IHRoZSB1c2VyJ3MgbmFtZSwgb3B0aW9uYWxseSBjb21iaW5pbmcgYSBmaXJzdCBhbmQgbGFzdCBuYW1lIGlmIHRoYXQncyBhbGxcbiAqIHRoYXQgd2FzIHByb3ZpZGVkLlxuICpcbiAqIEByZXR1cm4ge3N0cmluZ3x1bmRlZmluZWR9XG4gKi9cbklkZW50aWZ5LnByb3RvdHlwZS5uYW1lID0gZnVuY3Rpb24oKSB7XG4gIHZhciBuYW1lID0gdGhpcy5wcm94eSgndHJhaXRzLm5hbWUnKTtcbiAgaWYgKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0cmltKG5hbWUpO1xuICB9XG5cbiAgdmFyIGZpcnN0TmFtZSA9IHRoaXMuZmlyc3ROYW1lKCk7XG4gIHZhciBsYXN0TmFtZSA9IHRoaXMubGFzdE5hbWUoKTtcbiAgaWYgKGZpcnN0TmFtZSAmJiBsYXN0TmFtZSkge1xuICAgIHJldHVybiB0cmltKGZpcnN0TmFtZSArICcgJyArIGxhc3ROYW1lKTtcbiAgfVxufTtcblxuLyoqXG4gKiBHZXQgdGhlIHVzZXIncyBmaXJzdCBuYW1lLCBvcHRpb25hbGx5IHNwbGl0dGluZyBpdCBvdXQgb2YgYSBzaW5nbGUgbmFtZSBpZlxuICogdGhhdCdzIGFsbCB0aGF0IHdhcyBwcm92aWRlZC5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd8dW5kZWZpbmVkfVxuICovXG5JZGVudGlmeS5wcm90b3R5cGUuZmlyc3ROYW1lID0gZnVuY3Rpb24oKSB7XG4gIHZhciBmaXJzdE5hbWUgPSB0aGlzLnByb3h5KCd0cmFpdHMuZmlyc3ROYW1lJyk7XG4gIGlmICh0eXBlb2YgZmlyc3ROYW1lID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0cmltKGZpcnN0TmFtZSk7XG4gIH1cblxuICB2YXIgbmFtZSA9IHRoaXMucHJveHkoJ3RyYWl0cy5uYW1lJyk7XG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdHJpbShuYW1lKS5zcGxpdCgnICcpWzBdO1xuICB9XG59O1xuXG4vKipcbiAqIEdldCB0aGUgdXNlcidzIGxhc3QgbmFtZSwgb3B0aW9uYWxseSBzcGxpdHRpbmcgaXQgb3V0IG9mIGEgc2luZ2xlIG5hbWUgaWZcbiAqIHRoYXQncyBhbGwgdGhhdCB3YXMgcHJvdmlkZWQuXG4gKlxuICogQHJldHVybiB7c3RyaW5nfHVuZGVmaW5lZH1cbiAqL1xuSWRlbnRpZnkucHJvdG90eXBlLmxhc3ROYW1lID0gZnVuY3Rpb24oKSB7XG4gIHZhciBsYXN0TmFtZSA9IHRoaXMucHJveHkoJ3RyYWl0cy5sYXN0TmFtZScpO1xuICBpZiAodHlwZW9mIGxhc3ROYW1lID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0cmltKGxhc3ROYW1lKTtcbiAgfVxuXG4gIHZhciBuYW1lID0gdGhpcy5wcm94eSgndHJhaXRzLm5hbWUnKTtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBzcGFjZSA9IHRyaW0obmFtZSkuaW5kZXhPZignICcpO1xuICBpZiAoc3BhY2UgPT09IC0xKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmV0dXJuIHRyaW0obmFtZS5zdWJzdHIoc3BhY2UgKyAxKSk7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgdXNlcidzIHVuaXF1ZSBpZC5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd8dW5kZWZpbmVkfVxuICovXG5JZGVudGlmeS5wcm90b3R5cGUudWlkID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnVzZXJJZCgpIHx8IHRoaXMudXNlcm5hbWUoKSB8fCB0aGlzLmVtYWlsKCk7XG59O1xuXG4vKipcbiAqIEdldCBkZXNjcmlwdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbklkZW50aWZ5LnByb3RvdHlwZS5kZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5wcm94eSgndHJhaXRzLmRlc2NyaXB0aW9uJykgfHwgdGhpcy5wcm94eSgndHJhaXRzLmJhY2tncm91bmQnKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBhZ2UuXG4gKlxuICogSWYgdGhlIGFnZSBpcyBub3QgZXhwbGljaXRseSBzZXRcbiAqIHRoZSBtZXRob2Qgd2lsbCBjb21wdXRlIGl0IGZyb20gYC5iaXJ0aGRheSgpYFxuICogaWYgcG9zc2libGUuXG4gKlxuICogQHJldHVybiB7bnVtYmVyfVxuICovXG5JZGVudGlmeS5wcm90b3R5cGUuYWdlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBkYXRlID0gdGhpcy5iaXJ0aGRheSgpO1xuICB2YXIgYWdlID0gZ2V0KHRoaXMudHJhaXRzKCksICdhZ2UnKTtcbiAgaWYgKGFnZSAhPSBudWxsKSByZXR1cm4gYWdlO1xuICBpZiAodHlwZShkYXRlKSAhPT0gJ2RhdGUnKSByZXR1cm47XG4gIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICByZXR1cm4gbm93LmdldEZ1bGxZZWFyKCkgLSBkYXRlLmdldEZ1bGxZZWFyKCk7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgYXZhdGFyLlxuICpcbiAqIC5waG90b1VybCBuZWVkZWQgYmVjYXVzZSBoZWxwLXNjb3V0XG4gKiBpbXBsZW1lbnRhdGlvbiB1c2VzIGAuYXZhdGFyIHx8IC5waG90b1VybGAuXG4gKlxuICogLmF2YXRhclVybCBuZWVkZWQgYmVjYXVzZSB0cmFraW8gdXNlcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHsqfVxuICovXG5JZGVudGlmeS5wcm90b3R5cGUuYXZhdGFyID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0cmFpdHMgPSB0aGlzLnRyYWl0cygpO1xuICByZXR1cm4gZ2V0KHRyYWl0cywgJ2F2YXRhcicpIHx8IGdldCh0cmFpdHMsICdwaG90b1VybCcpIHx8IGdldCh0cmFpdHMsICdhdmF0YXJVcmwnKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBwb3NpdGlvbi5cbiAqXG4gKiAuam9iVGl0bGUgbmVlZGVkIGJlY2F1c2Ugc29tZSBpbnRlZ3JhdGlvbnMgdXNlIGl0LlxuICpcbiAqIEByZXR1cm4geyp9XG4gKi9cbklkZW50aWZ5LnByb3RvdHlwZS5wb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdHJhaXRzID0gdGhpcy50cmFpdHMoKTtcbiAgcmV0dXJuIGdldCh0cmFpdHMsICdwb3NpdGlvbicpIHx8IGdldCh0cmFpdHMsICdqb2JUaXRsZScpO1xufTtcblxuLyoqXG4gKiBTZXR1cCBzbWUgYmFzaWMgXCJzcGVjaWFsXCIgdHJhaXQgcHJveGllcy5cbiAqL1xuXG5JZGVudGlmeS5wcm90b3R5cGUudXNlcm5hbWUgPSBGYWNhZGUucHJveHkoJ3RyYWl0cy51c2VybmFtZScpO1xuSWRlbnRpZnkucHJvdG90eXBlLndlYnNpdGUgPSBGYWNhZGUub25lKCd0cmFpdHMud2Vic2l0ZScpO1xuSWRlbnRpZnkucHJvdG90eXBlLndlYnNpdGVzID0gRmFjYWRlLm11bHRpKCd0cmFpdHMud2Vic2l0ZScpO1xuSWRlbnRpZnkucHJvdG90eXBlLnBob25lID0gRmFjYWRlLm9uZSgndHJhaXRzLnBob25lJyk7XG5JZGVudGlmeS5wcm90b3R5cGUucGhvbmVzID0gRmFjYWRlLm11bHRpKCd0cmFpdHMucGhvbmUnKTtcbklkZW50aWZ5LnByb3RvdHlwZS5hZGRyZXNzID0gRmFjYWRlLnByb3h5KCd0cmFpdHMuYWRkcmVzcycpO1xuSWRlbnRpZnkucHJvdG90eXBlLmdlbmRlciA9IEZhY2FkZS5wcm94eSgndHJhaXRzLmdlbmRlcicpO1xuSWRlbnRpZnkucHJvdG90eXBlLmJpcnRoZGF5ID0gRmFjYWRlLnByb3h5KCd0cmFpdHMuYmlydGhkYXknKTtcblxuLyoqXG4gKiBFeHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gSWRlbnRpZnk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zZWdtZW50aW8tZmFjYWRlL2xpYi9pZGVudGlmeS5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB0cmltO1xuXG5mdW5jdGlvbiB0cmltKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpO1xufVxuXG5leHBvcnRzLmxlZnQgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpO1xufTtcblxuZXhwb3J0cy5yaWdodCA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHJpbS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdCA9IHJlcXVpcmUoJy4vdXRpbHMnKS5pbmhlcml0O1xudmFyIEZhY2FkZSA9IHJlcXVpcmUoJy4vZmFjYWRlJyk7XG52YXIgVHJhY2sgPSByZXF1aXJlKCcuL3RyYWNrJyk7XG52YXIgaXNFbWFpbCA9IHJlcXVpcmUoJ2lzLWVtYWlsJyk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBuZXcgYFBhZ2VgIGZhY2FkZSB3aXRoIGBkaWN0aW9uYXJ5YC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGljdGlvbmFyeVxuICogICBAcGFyYW0ge3N0cmluZ30gY2F0ZWdvcnlcbiAqICAgQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqICAgQHBhcmFtIHtPYmplY3R9IHRyYWl0c1xuICogICBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqICAgQHByb3BlcnR5IHtCb29sZWFufFVuZGVmaW5lZH0gY2xvbmVcbiAqL1xuXG5mdW5jdGlvbiBQYWdlKGRpY3Rpb25hcnksIG9wdHMpIHtcbiAgRmFjYWRlLmNhbGwodGhpcywgZGljdGlvbmFyeSwgb3B0cyk7XG59XG5cbi8qKlxuICogSW5oZXJpdCBmcm9tIGBGYWNhZGVgXG4gKi9cblxuaW5oZXJpdChQYWdlLCBGYWNhZGUpO1xuXG4vKipcbiAqIEdldCB0aGUgZmFjYWRlJ3MgYWN0aW9uLlxuICpcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuUGFnZS5wcm90b3R5cGUuYWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAncGFnZSc7XG59O1xuXG5QYWdlLnByb3RvdHlwZS50eXBlID0gUGFnZS5wcm90b3R5cGUuYWN0aW9uO1xuXG4vKipcbiAqIEZpZWxkc1xuICovXG5cblBhZ2UucHJvdG90eXBlLmNhdGVnb3J5ID0gRmFjYWRlLmZpZWxkKCdjYXRlZ29yeScpO1xuUGFnZS5wcm90b3R5cGUubmFtZSA9IEZhY2FkZS5maWVsZCgnbmFtZScpO1xuXG4vKipcbiAqIFByb3hpZXMuXG4gKi9cblxuUGFnZS5wcm90b3R5cGUudGl0bGUgPSBGYWNhZGUucHJveHkoJ3Byb3BlcnRpZXMudGl0bGUnKTtcblBhZ2UucHJvdG90eXBlLnBhdGggPSBGYWNhZGUucHJveHkoJ3Byb3BlcnRpZXMucGF0aCcpO1xuUGFnZS5wcm90b3R5cGUudXJsID0gRmFjYWRlLnByb3h5KCdwcm9wZXJ0aWVzLnVybCcpO1xuXG4vKipcbiAqIFJlZmVycmVyLlxuICovXG5QYWdlLnByb3RvdHlwZS5yZWZlcnJlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5wcm94eSgnY29udGV4dC5yZWZlcnJlci51cmwnKVxuICAgIHx8IHRoaXMucHJveHkoJ2NvbnRleHQucGFnZS5yZWZlcnJlcicpXG4gICAgfHwgdGhpcy5wcm94eSgncHJvcGVydGllcy5yZWZlcnJlcicpO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIHBhZ2UgcHJvcGVydGllcyBtaXhpbmcgYGNhdGVnb3J5YCBhbmQgYG5hbWVgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhbGlhc2VzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cblBhZ2UucHJvdG90eXBlLnByb3BlcnRpZXMgPSBmdW5jdGlvbihhbGlhc2VzKSB7XG4gIHZhciBwcm9wcyA9IHRoaXMuZmllbGQoJ3Byb3BlcnRpZXMnKSB8fCB7fTtcbiAgdmFyIGNhdGVnb3J5ID0gdGhpcy5jYXRlZ29yeSgpO1xuICB2YXIgbmFtZSA9IHRoaXMubmFtZSgpO1xuICBhbGlhc2VzID0gYWxpYXNlcyB8fCB7fTtcblxuICBpZiAoY2F0ZWdvcnkpIHByb3BzLmNhdGVnb3J5ID0gY2F0ZWdvcnk7XG4gIGlmIChuYW1lKSBwcm9wcy5uYW1lID0gbmFtZTtcblxuICBmb3IgKHZhciBhbGlhcyBpbiBhbGlhc2VzKSB7XG4gICAgdmFyIHZhbHVlID0gdGhpc1thbGlhc10gPT0gbnVsbFxuICAgICAgPyB0aGlzLnByb3h5KCdwcm9wZXJ0aWVzLicgKyBhbGlhcylcbiAgICAgIDogdGhpc1thbGlhc10oKTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgY29udGludWU7XG4gICAgcHJvcHNbYWxpYXNlc1thbGlhc11dID0gdmFsdWU7XG4gICAgaWYgKGFsaWFzICE9PSBhbGlhc2VzW2FsaWFzXSkgZGVsZXRlIHByb3BzW2FsaWFzXTtcbiAgfVxuXG4gIHJldHVybiBwcm9wcztcbn07XG5cbi8qKlxuICogR2V0IHRoZSB1c2VyJ3MgZW1haWwsIGZhbGxpbmcgYmFjayB0byB0aGVpciB1c2VyIElEIGlmIGl0J3MgYSB2YWxpZCBlbWFpbC5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cblBhZ2UucHJvdG90eXBlLmVtYWlsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBlbWFpbCA9IHRoaXMucHJveHkoJ2NvbnRleHQudHJhaXRzLmVtYWlsJykgfHwgdGhpcy5wcm94eSgncHJvcGVydGllcy5lbWFpbCcpO1xuICBpZiAoZW1haWwpIHJldHVybiBlbWFpbDtcblxuICB2YXIgdXNlcklkID0gdGhpcy51c2VySWQoKTtcbiAgaWYgKGlzRW1haWwodXNlcklkKSkgcmV0dXJuIHVzZXJJZDtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBwYWdlIGZ1bGxOYW1lLlxuICpcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuUGFnZS5wcm90b3R5cGUuZnVsbE5hbWUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNhdGVnb3J5ID0gdGhpcy5jYXRlZ29yeSgpO1xuICB2YXIgbmFtZSA9IHRoaXMubmFtZSgpO1xuICByZXR1cm4gbmFtZSAmJiBjYXRlZ29yeVxuICAgID8gY2F0ZWdvcnkgKyAnICcgKyBuYW1lXG4gICAgOiBuYW1lO1xufTtcblxuLyoqXG4gKiBHZXQgZXZlbnQgd2l0aCBgbmFtZWAuXG4gKlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5QYWdlLnByb3RvdHlwZS5ldmVudCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWVcbiAgICA/ICdWaWV3ZWQgJyArIG5hbWUgKyAnIFBhZ2UnXG4gICAgOiAnTG9hZGVkIGEgUGFnZSc7XG59O1xuXG4vKipcbiAqIENvbnZlcnQgdGhpcyBQYWdlIHRvIGEgVHJhY2sgZmFjYWRlIHdpdGggYG5hbWVgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtUcmFja31cbiAqL1xuUGFnZS5wcm90b3R5cGUudHJhY2sgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBqc29uID0gdGhpcy5qc29uKCk7XG4gIGpzb24uZXZlbnQgPSB0aGlzLmV2ZW50KG5hbWUpO1xuICBqc29uLnRpbWVzdGFtcCA9IHRoaXMudGltZXN0YW1wKCk7XG4gIGpzb24ucHJvcGVydGllcyA9IHRoaXMucHJvcGVydGllcygpO1xuICByZXR1cm4gbmV3IFRyYWNrKGpzb24sIHRoaXMub3B0cyk7XG59O1xuXG4vKipcbiAqIEV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBQYWdlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2VnbWVudGlvLWZhY2FkZS9saWIvcGFnZS5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgYXJpdHkgPSByZXF1aXJlKCdAbmRob3VsZS9hcml0eScpO1xuXG52YXIgb2JqVG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbi8vIFRPRE86IE1vdmUgdG8gbGliXG52YXIgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBudW1iZXIuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbi8vIFRPRE86IE1vdmUgdG8gbGliXG52YXIgaXNOdW1iZXIgPSBmdW5jdGlvbih2YWwpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICByZXR1cm4gdHlwZSA9PT0gJ251bWJlcicgfHwgKHR5cGUgPT09ICdvYmplY3QnICYmIG9ialRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgTnVtYmVyXScpO1xufTtcblxuLyoqXG4gKiBXcmFwIGEgZnVuY3Rpb24gYGZuYCBpbiBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBpbnZva2UgYGZuYCB3aGVuIGludm9rZWQgYG5gIG9yXG4gKiBtb3JlIHRpbWVzLlxuICpcbiAqIEBuYW1lIGFmdGVyXG4gKiBAYXBpIHB1YmxpY1xuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gbiBUaGUgbnVtYmVyIG9mXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIGZ1bmN0aW9uIHRoYXQgd2lsbCBjYWxsIGBmbmAgYWZ0ZXIgYG5gIG9yIG1vcmVcbiAqIGludm9jYXRpb25zLlxuICogQGV4YW1wbGVcbiAqL1xudmFyIGFmdGVyID0gZnVuY3Rpb24gYWZ0ZXIobiwgZm4pIHtcbiAgaWYgKCFpc051bWJlcihuKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgbnVtYmVyIGJ1dCByZWNlaXZlZCAnICsgdHlwZW9mIG4pO1xuICB9XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGZuKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgZnVuY3Rpb24gYnV0IHJlY2VpdmVkICcgKyB0eXBlb2YgZm4pO1xuICB9XG5cbiAgdmFyIGNhbGxDb3VudCA9IDA7XG5cbiAgcmV0dXJuIGFyaXR5KGZuLmxlbmd0aCwgZnVuY3Rpb24oKSB7XG4gICAgY2FsbENvdW50ICs9IDE7XG5cbiAgICBpZiAoY2FsbENvdW50IDwgbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9KTtcbn07XG5cbi8qXG4gKiBFeHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gYWZ0ZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AbmRob3VsZS9hZnRlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBTbGljZSByZWZlcmVuY2UuXG4gKi9cblxudmFyIHNsaWNlID0gW10uc2xpY2U7XG5cbi8qKlxuICogQmluZCBgb2JqYCB0byBgZm5gLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBmbiBvciBzdHJpbmdcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgZm4pe1xuICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGZuKSBmbiA9IG9ialtmbl07XG4gIGlmICgnZnVuY3Rpb24nICE9IHR5cGVvZiBmbikgdGhyb3cgbmV3IEVycm9yKCdiaW5kKCkgcmVxdWlyZXMgYSBmdW5jdGlvbicpO1xuICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KG9iaiwgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb21wb25lbnQtYmluZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohIEpTT04gdjMuMy4yIHwgaHR0cDovL2Jlc3RpZWpzLmdpdGh1Yi5pby9qc29uMyB8IENvcHlyaWdodCAyMDEyLTIwMTQsIEtpdCBDYW1icmlkZ2UgfCBodHRwOi8va2l0Lm1pdC1saWNlbnNlLm9yZyAqL1xuOyhmdW5jdGlvbiAoKSB7XG4gIC8vIERldGVjdCB0aGUgYGRlZmluZWAgZnVuY3Rpb24gZXhwb3NlZCBieSBhc3luY2hyb25vdXMgbW9kdWxlIGxvYWRlcnMuIFRoZVxuICAvLyBzdHJpY3QgYGRlZmluZWAgY2hlY2sgaXMgbmVjZXNzYXJ5IGZvciBjb21wYXRpYmlsaXR5IHdpdGggYHIuanNgLlxuICB2YXIgaXNMb2FkZXIgPSB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZDtcblxuICAvLyBBIHNldCBvZiB0eXBlcyB1c2VkIHRvIGRpc3Rpbmd1aXNoIG9iamVjdHMgZnJvbSBwcmltaXRpdmVzLlxuICB2YXIgb2JqZWN0VHlwZXMgPSB7XG4gICAgXCJmdW5jdGlvblwiOiB0cnVlLFxuICAgIFwib2JqZWN0XCI6IHRydWVcbiAgfTtcblxuICAvLyBEZXRlY3QgdGhlIGBleHBvcnRzYCBvYmplY3QgZXhwb3NlZCBieSBDb21tb25KUyBpbXBsZW1lbnRhdGlvbnMuXG4gIHZhciBmcmVlRXhwb3J0cyA9IG9iamVjdFR5cGVzW3R5cGVvZiBleHBvcnRzXSAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbiAgLy8gVXNlIHRoZSBgZ2xvYmFsYCBvYmplY3QgZXhwb3NlZCBieSBOb2RlIChpbmNsdWRpbmcgQnJvd3NlcmlmeSB2aWFcbiAgLy8gYGluc2VydC1tb2R1bGUtZ2xvYmFsc2ApLCBOYXJ3aGFsLCBhbmQgUmluZ28gYXMgdGhlIGRlZmF1bHQgY29udGV4dCxcbiAgLy8gYW5kIHRoZSBgd2luZG93YCBvYmplY3QgaW4gYnJvd3NlcnMuIFJoaW5vIGV4cG9ydHMgYSBgZ2xvYmFsYCBmdW5jdGlvblxuICAvLyBpbnN0ZWFkLlxuICB2YXIgcm9vdCA9IG9iamVjdFR5cGVzW3R5cGVvZiB3aW5kb3ddICYmIHdpbmRvdyB8fCB0aGlzLFxuICAgICAgZnJlZUdsb2JhbCA9IGZyZWVFeHBvcnRzICYmIG9iamVjdFR5cGVzW3R5cGVvZiBtb2R1bGVdICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIHR5cGVvZiBnbG9iYWwgPT0gXCJvYmplY3RcIiAmJiBnbG9iYWw7XG5cbiAgaWYgKGZyZWVHbG9iYWwgJiYgKGZyZWVHbG9iYWxbXCJnbG9iYWxcIl0gPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbFtcIndpbmRvd1wiXSA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsW1wic2VsZlwiXSA9PT0gZnJlZUdsb2JhbCkpIHtcbiAgICByb290ID0gZnJlZUdsb2JhbDtcbiAgfVxuXG4gIC8vIFB1YmxpYzogSW5pdGlhbGl6ZXMgSlNPTiAzIHVzaW5nIHRoZSBnaXZlbiBgY29udGV4dGAgb2JqZWN0LCBhdHRhY2hpbmcgdGhlXG4gIC8vIGBzdHJpbmdpZnlgIGFuZCBgcGFyc2VgIGZ1bmN0aW9ucyB0byB0aGUgc3BlY2lmaWVkIGBleHBvcnRzYCBvYmplY3QuXG4gIGZ1bmN0aW9uIHJ1bkluQ29udGV4dChjb250ZXh0LCBleHBvcnRzKSB7XG4gICAgY29udGV4dCB8fCAoY29udGV4dCA9IHJvb3RbXCJPYmplY3RcIl0oKSk7XG4gICAgZXhwb3J0cyB8fCAoZXhwb3J0cyA9IHJvb3RbXCJPYmplY3RcIl0oKSk7XG5cbiAgICAvLyBOYXRpdmUgY29uc3RydWN0b3IgYWxpYXNlcy5cbiAgICB2YXIgTnVtYmVyID0gY29udGV4dFtcIk51bWJlclwiXSB8fCByb290W1wiTnVtYmVyXCJdLFxuICAgICAgICBTdHJpbmcgPSBjb250ZXh0W1wiU3RyaW5nXCJdIHx8IHJvb3RbXCJTdHJpbmdcIl0sXG4gICAgICAgIE9iamVjdCA9IGNvbnRleHRbXCJPYmplY3RcIl0gfHwgcm9vdFtcIk9iamVjdFwiXSxcbiAgICAgICAgRGF0ZSA9IGNvbnRleHRbXCJEYXRlXCJdIHx8IHJvb3RbXCJEYXRlXCJdLFxuICAgICAgICBTeW50YXhFcnJvciA9IGNvbnRleHRbXCJTeW50YXhFcnJvclwiXSB8fCByb290W1wiU3ludGF4RXJyb3JcIl0sXG4gICAgICAgIFR5cGVFcnJvciA9IGNvbnRleHRbXCJUeXBlRXJyb3JcIl0gfHwgcm9vdFtcIlR5cGVFcnJvclwiXSxcbiAgICAgICAgTWF0aCA9IGNvbnRleHRbXCJNYXRoXCJdIHx8IHJvb3RbXCJNYXRoXCJdLFxuICAgICAgICBuYXRpdmVKU09OID0gY29udGV4dFtcIkpTT05cIl0gfHwgcm9vdFtcIkpTT05cIl07XG5cbiAgICAvLyBEZWxlZ2F0ZSB0byB0aGUgbmF0aXZlIGBzdHJpbmdpZnlgIGFuZCBgcGFyc2VgIGltcGxlbWVudGF0aW9ucy5cbiAgICBpZiAodHlwZW9mIG5hdGl2ZUpTT04gPT0gXCJvYmplY3RcIiAmJiBuYXRpdmVKU09OKSB7XG4gICAgICBleHBvcnRzLnN0cmluZ2lmeSA9IG5hdGl2ZUpTT04uc3RyaW5naWZ5O1xuICAgICAgZXhwb3J0cy5wYXJzZSA9IG5hdGl2ZUpTT04ucGFyc2U7XG4gICAgfVxuXG4gICAgLy8gQ29udmVuaWVuY2UgYWxpYXNlcy5cbiAgICB2YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlLFxuICAgICAgICBnZXRDbGFzcyA9IG9iamVjdFByb3RvLnRvU3RyaW5nLFxuICAgICAgICBpc1Byb3BlcnR5LCBmb3JFYWNoLCB1bmRlZjtcblxuICAgIC8vIFRlc3QgdGhlIGBEYXRlI2dldFVUQypgIG1ldGhvZHMuIEJhc2VkIG9uIHdvcmsgYnkgQFlhZmZsZS5cbiAgICB2YXIgaXNFeHRlbmRlZCA9IG5ldyBEYXRlKC0zNTA5ODI3MzM0NTczMjkyKTtcbiAgICB0cnkge1xuICAgICAgLy8gVGhlIGBnZXRVVENGdWxsWWVhcmAsIGBNb250aGAsIGFuZCBgRGF0ZWAgbWV0aG9kcyByZXR1cm4gbm9uc2Vuc2ljYWxcbiAgICAgIC8vIHJlc3VsdHMgZm9yIGNlcnRhaW4gZGF0ZXMgaW4gT3BlcmEgPj0gMTAuNTMuXG4gICAgICBpc0V4dGVuZGVkID0gaXNFeHRlbmRlZC5nZXRVVENGdWxsWWVhcigpID09IC0xMDkyNTIgJiYgaXNFeHRlbmRlZC5nZXRVVENNb250aCgpID09PSAwICYmIGlzRXh0ZW5kZWQuZ2V0VVRDRGF0ZSgpID09PSAxICYmXG4gICAgICAgIC8vIFNhZmFyaSA8IDIuMC4yIHN0b3JlcyB0aGUgaW50ZXJuYWwgbWlsbGlzZWNvbmQgdGltZSB2YWx1ZSBjb3JyZWN0bHksXG4gICAgICAgIC8vIGJ1dCBjbGlwcyB0aGUgdmFsdWVzIHJldHVybmVkIGJ5IHRoZSBkYXRlIG1ldGhvZHMgdG8gdGhlIHJhbmdlIG9mXG4gICAgICAgIC8vIHNpZ25lZCAzMi1iaXQgaW50ZWdlcnMgKFstMiAqKiAzMSwgMiAqKiAzMSAtIDFdKS5cbiAgICAgICAgaXNFeHRlbmRlZC5nZXRVVENIb3VycygpID09IDEwICYmIGlzRXh0ZW5kZWQuZ2V0VVRDTWludXRlcygpID09IDM3ICYmIGlzRXh0ZW5kZWQuZ2V0VVRDU2Vjb25kcygpID09IDYgJiYgaXNFeHRlbmRlZC5nZXRVVENNaWxsaXNlY29uZHMoKSA9PSA3MDg7XG4gICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7fVxuXG4gICAgLy8gSW50ZXJuYWw6IERldGVybWluZXMgd2hldGhlciB0aGUgbmF0aXZlIGBKU09OLnN0cmluZ2lmeWAgYW5kIGBwYXJzZWBcbiAgICAvLyBpbXBsZW1lbnRhdGlvbnMgYXJlIHNwZWMtY29tcGxpYW50LiBCYXNlZCBvbiB3b3JrIGJ5IEtlbiBTbnlkZXIuXG4gICAgZnVuY3Rpb24gaGFzKG5hbWUpIHtcbiAgICAgIGlmIChoYXNbbmFtZV0gIT09IHVuZGVmKSB7XG4gICAgICAgIC8vIFJldHVybiBjYWNoZWQgZmVhdHVyZSB0ZXN0IHJlc3VsdC5cbiAgICAgICAgcmV0dXJuIGhhc1tuYW1lXTtcbiAgICAgIH1cbiAgICAgIHZhciBpc1N1cHBvcnRlZDtcbiAgICAgIGlmIChuYW1lID09IFwiYnVnLXN0cmluZy1jaGFyLWluZGV4XCIpIHtcbiAgICAgICAgLy8gSUUgPD0gNyBkb2Vzbid0IHN1cHBvcnQgYWNjZXNzaW5nIHN0cmluZyBjaGFyYWN0ZXJzIHVzaW5nIHNxdWFyZVxuICAgICAgICAvLyBicmFja2V0IG5vdGF0aW9uLiBJRSA4IG9ubHkgc3VwcG9ydHMgdGhpcyBmb3IgcHJpbWl0aXZlcy5cbiAgICAgICAgaXNTdXBwb3J0ZWQgPSBcImFcIlswXSAhPSBcImFcIjtcbiAgICAgIH0gZWxzZSBpZiAobmFtZSA9PSBcImpzb25cIikge1xuICAgICAgICAvLyBJbmRpY2F0ZXMgd2hldGhlciBib3RoIGBKU09OLnN0cmluZ2lmeWAgYW5kIGBKU09OLnBhcnNlYCBhcmVcbiAgICAgICAgLy8gc3VwcG9ydGVkLlxuICAgICAgICBpc1N1cHBvcnRlZCA9IGhhcyhcImpzb24tc3RyaW5naWZ5XCIpICYmIGhhcyhcImpzb24tcGFyc2VcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdmFsdWUsIHNlcmlhbGl6ZWQgPSAne1wiYVwiOlsxLHRydWUsZmFsc2UsbnVsbCxcIlxcXFx1MDAwMFxcXFxiXFxcXG5cXFxcZlxcXFxyXFxcXHRcIl19JztcbiAgICAgICAgLy8gVGVzdCBgSlNPTi5zdHJpbmdpZnlgLlxuICAgICAgICBpZiAobmFtZSA9PSBcImpzb24tc3RyaW5naWZ5XCIpIHtcbiAgICAgICAgICB2YXIgc3RyaW5naWZ5ID0gZXhwb3J0cy5zdHJpbmdpZnksIHN0cmluZ2lmeVN1cHBvcnRlZCA9IHR5cGVvZiBzdHJpbmdpZnkgPT0gXCJmdW5jdGlvblwiICYmIGlzRXh0ZW5kZWQ7XG4gICAgICAgICAgaWYgKHN0cmluZ2lmeVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgLy8gQSB0ZXN0IGZ1bmN0aW9uIG9iamVjdCB3aXRoIGEgY3VzdG9tIGB0b0pTT05gIG1ldGhvZC5cbiAgICAgICAgICAgICh2YWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9KS50b0pTT04gPSB2YWx1ZTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHN0cmluZ2lmeVN1cHBvcnRlZCA9XG4gICAgICAgICAgICAgICAgLy8gRmlyZWZveCAzLjFiMSBhbmQgYjIgc2VyaWFsaXplIHN0cmluZywgbnVtYmVyLCBhbmQgYm9vbGVhblxuICAgICAgICAgICAgICAgIC8vIHByaW1pdGl2ZXMgYXMgb2JqZWN0IGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeSgwKSA9PT0gXCIwXCIgJiZcbiAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgYjIsIGFuZCBKU09OIDIgc2VyaWFsaXplIHdyYXBwZWQgcHJpbWl0aXZlcyBhcyBvYmplY3RcbiAgICAgICAgICAgICAgICAvLyBsaXRlcmFscy5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkobmV3IE51bWJlcigpKSA9PT0gXCIwXCIgJiZcbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkobmV3IFN0cmluZygpKSA9PSAnXCJcIicgJiZcbiAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgMiB0aHJvdyBhbiBlcnJvciBpZiB0aGUgdmFsdWUgaXMgYG51bGxgLCBgdW5kZWZpbmVkYCwgb3JcbiAgICAgICAgICAgICAgICAvLyBkb2VzIG5vdCBkZWZpbmUgYSBjYW5vbmljYWwgSlNPTiByZXByZXNlbnRhdGlvbiAodGhpcyBhcHBsaWVzIHRvXG4gICAgICAgICAgICAgICAgLy8gb2JqZWN0cyB3aXRoIGB0b0pTT05gIHByb3BlcnRpZXMgYXMgd2VsbCwgKnVubGVzcyogdGhleSBhcmUgbmVzdGVkXG4gICAgICAgICAgICAgICAgLy8gd2l0aGluIGFuIG9iamVjdCBvciBhcnJheSkuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KGdldENsYXNzKSA9PT0gdW5kZWYgJiZcbiAgICAgICAgICAgICAgICAvLyBJRSA4IHNlcmlhbGl6ZXMgYHVuZGVmaW5lZGAgYXMgYFwidW5kZWZpbmVkXCJgLiBTYWZhcmkgPD0gNS4xLjcgYW5kXG4gICAgICAgICAgICAgICAgLy8gRkYgMy4xYjMgcGFzcyB0aGlzIHRlc3QuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KHVuZGVmKSA9PT0gdW5kZWYgJiZcbiAgICAgICAgICAgICAgICAvLyBTYWZhcmkgPD0gNS4xLjcgYW5kIEZGIDMuMWIzIHRocm93IGBFcnJvcmBzIGFuZCBgVHlwZUVycm9yYHMsXG4gICAgICAgICAgICAgICAgLy8gcmVzcGVjdGl2ZWx5LCBpZiB0aGUgdmFsdWUgaXMgb21pdHRlZCBlbnRpcmVseS5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkoKSA9PT0gdW5kZWYgJiZcbiAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgMiB0aHJvdyBhbiBlcnJvciBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgbm90IGEgbnVtYmVyLFxuICAgICAgICAgICAgICAgIC8vIHN0cmluZywgYXJyYXksIG9iamVjdCwgQm9vbGVhbiwgb3IgYG51bGxgIGxpdGVyYWwuIFRoaXMgYXBwbGllcyB0b1xuICAgICAgICAgICAgICAgIC8vIG9iamVjdHMgd2l0aCBjdXN0b20gYHRvSlNPTmAgbWV0aG9kcyBhcyB3ZWxsLCB1bmxlc3MgdGhleSBhcmUgbmVzdGVkXG4gICAgICAgICAgICAgICAgLy8gaW5zaWRlIG9iamVjdCBvciBhcnJheSBsaXRlcmFscy4gWVVJIDMuMC4wYjEgaWdub3JlcyBjdXN0b20gYHRvSlNPTmBcbiAgICAgICAgICAgICAgICAvLyBtZXRob2RzIGVudGlyZWx5LlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeSh2YWx1ZSkgPT09IFwiMVwiICYmXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KFt2YWx1ZV0pID09IFwiWzFdXCIgJiZcbiAgICAgICAgICAgICAgICAvLyBQcm90b3R5cGUgPD0gMS42LjEgc2VyaWFsaXplcyBgW3VuZGVmaW5lZF1gIGFzIGBcIltdXCJgIGluc3RlYWQgb2ZcbiAgICAgICAgICAgICAgICAvLyBgXCJbbnVsbF1cImAuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KFt1bmRlZl0pID09IFwiW251bGxdXCIgJiZcbiAgICAgICAgICAgICAgICAvLyBZVUkgMy4wLjBiMSBmYWlscyB0byBzZXJpYWxpemUgYG51bGxgIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeShudWxsKSA9PSBcIm51bGxcIiAmJlxuICAgICAgICAgICAgICAgIC8vIEZGIDMuMWIxLCAyIGhhbHRzIHNlcmlhbGl6YXRpb24gaWYgYW4gYXJyYXkgY29udGFpbnMgYSBmdW5jdGlvbjpcbiAgICAgICAgICAgICAgICAvLyBgWzEsIHRydWUsIGdldENsYXNzLCAxXWAgc2VyaWFsaXplcyBhcyBcIlsxLHRydWUsXSxcIi4gRkYgMy4xYjNcbiAgICAgICAgICAgICAgICAvLyBlbGlkZXMgbm9uLUpTT04gdmFsdWVzIGZyb20gb2JqZWN0cyBhbmQgYXJyYXlzLCB1bmxlc3MgdGhleVxuICAgICAgICAgICAgICAgIC8vIGRlZmluZSBjdXN0b20gYHRvSlNPTmAgbWV0aG9kcy5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkoW3VuZGVmLCBnZXRDbGFzcywgbnVsbF0pID09IFwiW251bGwsbnVsbCxudWxsXVwiICYmXG4gICAgICAgICAgICAgICAgLy8gU2ltcGxlIHNlcmlhbGl6YXRpb24gdGVzdC4gRkYgMy4xYjEgdXNlcyBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZXNcbiAgICAgICAgICAgICAgICAvLyB3aGVyZSBjaGFyYWN0ZXIgZXNjYXBlIGNvZGVzIGFyZSBleHBlY3RlZCAoZS5nLiwgYFxcYmAgPT4gYFxcdTAwMDhgKS5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkoeyBcImFcIjogW3ZhbHVlLCB0cnVlLCBmYWxzZSwgbnVsbCwgXCJcXHgwMFxcYlxcblxcZlxcclxcdFwiXSB9KSA9PSBzZXJpYWxpemVkICYmXG4gICAgICAgICAgICAgICAgLy8gRkYgMy4xYjEgYW5kIGIyIGlnbm9yZSB0aGUgYGZpbHRlcmAgYW5kIGB3aWR0aGAgYXJndW1lbnRzLlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeShudWxsLCB2YWx1ZSkgPT09IFwiMVwiICYmXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KFsxLCAyXSwgbnVsbCwgMSkgPT0gXCJbXFxuIDEsXFxuIDJcXG5dXCIgJiZcbiAgICAgICAgICAgICAgICAvLyBKU09OIDIsIFByb3RvdHlwZSA8PSAxLjcsIGFuZCBvbGRlciBXZWJLaXQgYnVpbGRzIGluY29ycmVjdGx5XG4gICAgICAgICAgICAgICAgLy8gc2VyaWFsaXplIGV4dGVuZGVkIHllYXJzLlxuICAgICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgRGF0ZSgtOC42NGUxNSkpID09ICdcIi0yNzE4MjEtMDQtMjBUMDA6MDA6MDAuMDAwWlwiJyAmJlxuICAgICAgICAgICAgICAgIC8vIFRoZSBtaWxsaXNlY29uZHMgYXJlIG9wdGlvbmFsIGluIEVTIDUsIGJ1dCByZXF1aXJlZCBpbiA1LjEuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBEYXRlKDguNjRlMTUpKSA9PSAnXCIrMjc1NzYwLTA5LTEzVDAwOjAwOjAwLjAwMFpcIicgJiZcbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94IDw9IDExLjAgaW5jb3JyZWN0bHkgc2VyaWFsaXplcyB5ZWFycyBwcmlvciB0byAwIGFzIG5lZ2F0aXZlXG4gICAgICAgICAgICAgICAgLy8gZm91ci1kaWdpdCB5ZWFycyBpbnN0ZWFkIG9mIHNpeC1kaWdpdCB5ZWFycy4gQ3JlZGl0czogQFlhZmZsZS5cbiAgICAgICAgICAgICAgICBzdHJpbmdpZnkobmV3IERhdGUoLTYyMTk4NzU1MmU1KSkgPT0gJ1wiLTAwMDAwMS0wMS0wMVQwMDowMDowMC4wMDBaXCInICYmXG4gICAgICAgICAgICAgICAgLy8gU2FmYXJpIDw9IDUuMS41IGFuZCBPcGVyYSA+PSAxMC41MyBpbmNvcnJlY3RseSBzZXJpYWxpemUgbWlsbGlzZWNvbmRcbiAgICAgICAgICAgICAgICAvLyB2YWx1ZXMgbGVzcyB0aGFuIDEwMDAuIENyZWRpdHM6IEBZYWZmbGUuXG4gICAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBEYXRlKC0xKSkgPT0gJ1wiMTk2OS0xMi0zMVQyMzo1OTo1OS45OTlaXCInO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICAgIHN0cmluZ2lmeVN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpc1N1cHBvcnRlZCA9IHN0cmluZ2lmeVN1cHBvcnRlZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBUZXN0IGBKU09OLnBhcnNlYC5cbiAgICAgICAgaWYgKG5hbWUgPT0gXCJqc29uLXBhcnNlXCIpIHtcbiAgICAgICAgICB2YXIgcGFyc2UgPSBleHBvcnRzLnBhcnNlO1xuICAgICAgICAgIGlmICh0eXBlb2YgcGFyc2UgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgYjIgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYSBiYXJlIGxpdGVyYWwgaXMgcHJvdmlkZWQuXG4gICAgICAgICAgICAgIC8vIENvbmZvcm1pbmcgaW1wbGVtZW50YXRpb25zIHNob3VsZCBhbHNvIGNvZXJjZSB0aGUgaW5pdGlhbCBhcmd1bWVudCB0b1xuICAgICAgICAgICAgICAvLyBhIHN0cmluZyBwcmlvciB0byBwYXJzaW5nLlxuICAgICAgICAgICAgICBpZiAocGFyc2UoXCIwXCIpID09PSAwICYmICFwYXJzZShmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBTaW1wbGUgcGFyc2luZyB0ZXN0LlxuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2Uoc2VyaWFsaXplZCk7XG4gICAgICAgICAgICAgICAgdmFyIHBhcnNlU3VwcG9ydGVkID0gdmFsdWVbXCJhXCJdLmxlbmd0aCA9PSA1ICYmIHZhbHVlW1wiYVwiXVswXSA9PT0gMTtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNhZmFyaSA8PSA1LjEuMiBhbmQgRkYgMy4xYjEgYWxsb3cgdW5lc2NhcGVkIHRhYnMgaW4gc3RyaW5ncy5cbiAgICAgICAgICAgICAgICAgICAgcGFyc2VTdXBwb3J0ZWQgPSAhcGFyc2UoJ1wiXFx0XCInKTtcbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge31cbiAgICAgICAgICAgICAgICAgIGlmIChwYXJzZVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIEZGIDQuMCBhbmQgNC4wLjEgYWxsb3cgbGVhZGluZyBgK2Agc2lnbnMgYW5kIGxlYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAvLyBkZWNpbWFsIHBvaW50cy4gRkYgNC4wLCA0LjAuMSwgYW5kIElFIDktMTAgYWxzbyBhbGxvd1xuICAgICAgICAgICAgICAgICAgICAgIC8vIGNlcnRhaW4gb2N0YWwgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgICAgICAgICAgcGFyc2VTdXBwb3J0ZWQgPSBwYXJzZShcIjAxXCIpICE9PSAxO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAocGFyc2VTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBGRiA0LjAsIDQuMC4xLCBhbmQgUmhpbm8gMS43UjMtUjQgYWxsb3cgdHJhaWxpbmcgZGVjaW1hbFxuICAgICAgICAgICAgICAgICAgICAgIC8vIHBvaW50cy4gVGhlc2UgZW52aXJvbm1lbnRzLCBhbG9uZyB3aXRoIEZGIDMuMWIxIGFuZCAyLFxuICAgICAgICAgICAgICAgICAgICAgIC8vIGFsc28gYWxsb3cgdHJhaWxpbmcgY29tbWFzIGluIEpTT04gb2JqZWN0cyBhbmQgYXJyYXlzLlxuICAgICAgICAgICAgICAgICAgICAgIHBhcnNlU3VwcG9ydGVkID0gcGFyc2UoXCIxLlwiKSAhPT0gMTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7fVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICAgIHBhcnNlU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlzU3VwcG9ydGVkID0gcGFyc2VTdXBwb3J0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXNbbmFtZV0gPSAhIWlzU3VwcG9ydGVkO1xuICAgIH1cblxuICAgIGlmICghaGFzKFwianNvblwiKSkge1xuICAgICAgLy8gQ29tbW9uIGBbW0NsYXNzXV1gIG5hbWUgYWxpYXNlcy5cbiAgICAgIHZhciBmdW5jdGlvbkNsYXNzID0gXCJbb2JqZWN0IEZ1bmN0aW9uXVwiLFxuICAgICAgICAgIGRhdGVDbGFzcyA9IFwiW29iamVjdCBEYXRlXVwiLFxuICAgICAgICAgIG51bWJlckNsYXNzID0gXCJbb2JqZWN0IE51bWJlcl1cIixcbiAgICAgICAgICBzdHJpbmdDbGFzcyA9IFwiW29iamVjdCBTdHJpbmddXCIsXG4gICAgICAgICAgYXJyYXlDbGFzcyA9IFwiW29iamVjdCBBcnJheV1cIixcbiAgICAgICAgICBib29sZWFuQ2xhc3MgPSBcIltvYmplY3QgQm9vbGVhbl1cIjtcblxuICAgICAgLy8gRGV0ZWN0IGluY29tcGxldGUgc3VwcG9ydCBmb3IgYWNjZXNzaW5nIHN0cmluZyBjaGFyYWN0ZXJzIGJ5IGluZGV4LlxuICAgICAgdmFyIGNoYXJJbmRleEJ1Z2d5ID0gaGFzKFwiYnVnLXN0cmluZy1jaGFyLWluZGV4XCIpO1xuXG4gICAgICAvLyBEZWZpbmUgYWRkaXRpb25hbCB1dGlsaXR5IG1ldGhvZHMgaWYgdGhlIGBEYXRlYCBtZXRob2RzIGFyZSBidWdneS5cbiAgICAgIGlmICghaXNFeHRlbmRlZCkge1xuICAgICAgICB2YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuICAgICAgICAvLyBBIG1hcHBpbmcgYmV0d2VlbiB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyIGFuZCB0aGUgbnVtYmVyIG9mIGRheXMgYmV0d2VlblxuICAgICAgICAvLyBKYW51YXJ5IDFzdCBhbmQgdGhlIGZpcnN0IG9mIHRoZSByZXNwZWN0aXZlIG1vbnRoLlxuICAgICAgICB2YXIgTW9udGhzID0gWzAsIDMxLCA1OSwgOTAsIDEyMCwgMTUxLCAxODEsIDIxMiwgMjQzLCAyNzMsIDMwNCwgMzM0XTtcbiAgICAgICAgLy8gSW50ZXJuYWw6IENhbGN1bGF0ZXMgdGhlIG51bWJlciBvZiBkYXlzIGJldHdlZW4gdGhlIFVuaXggZXBvY2ggYW5kIHRoZVxuICAgICAgICAvLyBmaXJzdCBkYXkgb2YgdGhlIGdpdmVuIG1vbnRoLlxuICAgICAgICB2YXIgZ2V0RGF5ID0gZnVuY3Rpb24gKHllYXIsIG1vbnRoKSB7XG4gICAgICAgICAgcmV0dXJuIE1vbnRoc1ttb250aF0gKyAzNjUgKiAoeWVhciAtIDE5NzApICsgZmxvb3IoKHllYXIgLSAxOTY5ICsgKG1vbnRoID0gKyhtb250aCA+IDEpKSkgLyA0KSAtIGZsb29yKCh5ZWFyIC0gMTkwMSArIG1vbnRoKSAvIDEwMCkgKyBmbG9vcigoeWVhciAtIDE2MDEgKyBtb250aCkgLyA0MDApO1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyBJbnRlcm5hbDogRGV0ZXJtaW5lcyBpZiBhIHByb3BlcnR5IGlzIGEgZGlyZWN0IHByb3BlcnR5IG9mIHRoZSBnaXZlblxuICAgICAgLy8gb2JqZWN0LiBEZWxlZ2F0ZXMgdG8gdGhlIG5hdGl2ZSBgT2JqZWN0I2hhc093blByb3BlcnR5YCBtZXRob2QuXG4gICAgICBpZiAoIShpc1Byb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHkpKSB7XG4gICAgICAgIGlzUHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICB2YXIgbWVtYmVycyA9IHt9LCBjb25zdHJ1Y3RvcjtcbiAgICAgICAgICBpZiAoKG1lbWJlcnMuX19wcm90b19fID0gbnVsbCwgbWVtYmVycy5fX3Byb3RvX18gPSB7XG4gICAgICAgICAgICAvLyBUaGUgKnByb3RvKiBwcm9wZXJ0eSBjYW5ub3QgYmUgc2V0IG11bHRpcGxlIHRpbWVzIGluIHJlY2VudFxuICAgICAgICAgICAgLy8gdmVyc2lvbnMgb2YgRmlyZWZveCBhbmQgU2VhTW9ua2V5LlxuICAgICAgICAgICAgXCJ0b1N0cmluZ1wiOiAxXG4gICAgICAgICAgfSwgbWVtYmVycykudG9TdHJpbmcgIT0gZ2V0Q2xhc3MpIHtcbiAgICAgICAgICAgIC8vIFNhZmFyaSA8PSAyLjAuMyBkb2Vzbid0IGltcGxlbWVudCBgT2JqZWN0I2hhc093blByb3BlcnR5YCwgYnV0XG4gICAgICAgICAgICAvLyBzdXBwb3J0cyB0aGUgbXV0YWJsZSAqcHJvdG8qIHByb3BlcnR5LlxuICAgICAgICAgICAgaXNQcm9wZXJ0eSA9IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAvLyBDYXB0dXJlIGFuZCBicmVhayB0aGUgb2JqZWN0J3MgcHJvdG90eXBlIGNoYWluIChzZWUgc2VjdGlvbiA4LjYuMlxuICAgICAgICAgICAgICAvLyBvZiB0aGUgRVMgNS4xIHNwZWMpLiBUaGUgcGFyZW50aGVzaXplZCBleHByZXNzaW9uIHByZXZlbnRzIGFuXG4gICAgICAgICAgICAgIC8vIHVuc2FmZSB0cmFuc2Zvcm1hdGlvbiBieSB0aGUgQ2xvc3VyZSBDb21waWxlci5cbiAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsID0gdGhpcy5fX3Byb3RvX18sIHJlc3VsdCA9IHByb3BlcnR5IGluICh0aGlzLl9fcHJvdG9fXyA9IG51bGwsIHRoaXMpO1xuICAgICAgICAgICAgICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBwcm90b3R5cGUgY2hhaW4uXG4gICAgICAgICAgICAgIHRoaXMuX19wcm90b19fID0gb3JpZ2luYWw7XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBDYXB0dXJlIGEgcmVmZXJlbmNlIHRvIHRoZSB0b3AtbGV2ZWwgYE9iamVjdGAgY29uc3RydWN0b3IuXG4gICAgICAgICAgICBjb25zdHJ1Y3RvciA9IG1lbWJlcnMuY29uc3RydWN0b3I7XG4gICAgICAgICAgICAvLyBVc2UgdGhlIGBjb25zdHJ1Y3RvcmAgcHJvcGVydHkgdG8gc2ltdWxhdGUgYE9iamVjdCNoYXNPd25Qcm9wZXJ0eWAgaW5cbiAgICAgICAgICAgIC8vIG90aGVyIGVudmlyb25tZW50cy5cbiAgICAgICAgICAgIGlzUHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgdmFyIHBhcmVudCA9ICh0aGlzLmNvbnN0cnVjdG9yIHx8IGNvbnN0cnVjdG9yKS5wcm90b3R5cGU7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9wZXJ0eSBpbiB0aGlzICYmICEocHJvcGVydHkgaW4gcGFyZW50ICYmIHRoaXNbcHJvcGVydHldID09PSBwYXJlbnRbcHJvcGVydHldKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIG1lbWJlcnMgPSBudWxsO1xuICAgICAgICAgIHJldHVybiBpc1Byb3BlcnR5LmNhbGwodGhpcywgcHJvcGVydHkpO1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyBJbnRlcm5hbDogTm9ybWFsaXplcyB0aGUgYGZvci4uLmluYCBpdGVyYXRpb24gYWxnb3JpdGhtIGFjcm9zc1xuICAgICAgLy8gZW52aXJvbm1lbnRzLiBFYWNoIGVudW1lcmF0ZWQga2V5IGlzIHlpZWxkZWQgdG8gYSBgY2FsbGJhY2tgIGZ1bmN0aW9uLlxuICAgICAgZm9yRWFjaCA9IGZ1bmN0aW9uIChvYmplY3QsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBzaXplID0gMCwgUHJvcGVydGllcywgbWVtYmVycywgcHJvcGVydHk7XG5cbiAgICAgICAgLy8gVGVzdHMgZm9yIGJ1Z3MgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQncyBgZm9yLi4uaW5gIGFsZ29yaXRobS4gVGhlXG4gICAgICAgIC8vIGB2YWx1ZU9mYCBwcm9wZXJ0eSBpbmhlcml0cyB0aGUgbm9uLWVudW1lcmFibGUgZmxhZyBmcm9tXG4gICAgICAgIC8vIGBPYmplY3QucHJvdG90eXBlYCBpbiBvbGRlciB2ZXJzaW9ucyBvZiBJRSwgTmV0c2NhcGUsIGFuZCBNb3ppbGxhLlxuICAgICAgICAoUHJvcGVydGllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnZhbHVlT2YgPSAwO1xuICAgICAgICB9KS5wcm90b3R5cGUudmFsdWVPZiA9IDA7XG5cbiAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBgUHJvcGVydGllc2AgY2xhc3MuXG4gICAgICAgIG1lbWJlcnMgPSBuZXcgUHJvcGVydGllcygpO1xuICAgICAgICBmb3IgKHByb3BlcnR5IGluIG1lbWJlcnMpIHtcbiAgICAgICAgICAvLyBJZ25vcmUgYWxsIHByb3BlcnRpZXMgaW5oZXJpdGVkIGZyb20gYE9iamVjdC5wcm90b3R5cGVgLlxuICAgICAgICAgIGlmIChpc1Byb3BlcnR5LmNhbGwobWVtYmVycywgcHJvcGVydHkpKSB7XG4gICAgICAgICAgICBzaXplKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFByb3BlcnRpZXMgPSBtZW1iZXJzID0gbnVsbDtcblxuICAgICAgICAvLyBOb3JtYWxpemUgdGhlIGl0ZXJhdGlvbiBhbGdvcml0aG0uXG4gICAgICAgIGlmICghc2l6ZSkge1xuICAgICAgICAgIC8vIEEgbGlzdCBvZiBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGluaGVyaXRlZCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC5cbiAgICAgICAgICBtZW1iZXJzID0gW1widmFsdWVPZlwiLCBcInRvU3RyaW5nXCIsIFwidG9Mb2NhbGVTdHJpbmdcIiwgXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLCBcImlzUHJvdG90eXBlT2ZcIiwgXCJoYXNPd25Qcm9wZXJ0eVwiLCBcImNvbnN0cnVjdG9yXCJdO1xuICAgICAgICAgIC8vIElFIDw9IDgsIE1vemlsbGEgMS4wLCBhbmQgTmV0c2NhcGUgNi4yIGlnbm9yZSBzaGFkb3dlZCBub24tZW51bWVyYWJsZVxuICAgICAgICAgIC8vIHByb3BlcnRpZXMuXG4gICAgICAgICAgZm9yRWFjaCA9IGZ1bmN0aW9uIChvYmplY3QsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgaXNGdW5jdGlvbiA9IGdldENsYXNzLmNhbGwob2JqZWN0KSA9PSBmdW5jdGlvbkNsYXNzLCBwcm9wZXJ0eSwgbGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGhhc1Byb3BlcnR5ID0gIWlzRnVuY3Rpb24gJiYgdHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciAhPSBcImZ1bmN0aW9uXCIgJiYgb2JqZWN0VHlwZXNbdHlwZW9mIG9iamVjdC5oYXNPd25Qcm9wZXJ0eV0gJiYgb2JqZWN0Lmhhc093blByb3BlcnR5IHx8IGlzUHJvcGVydHk7XG4gICAgICAgICAgICBmb3IgKHByb3BlcnR5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgICAvLyBHZWNrbyA8PSAxLjAgZW51bWVyYXRlcyB0aGUgYHByb3RvdHlwZWAgcHJvcGVydHkgb2YgZnVuY3Rpb25zIHVuZGVyXG4gICAgICAgICAgICAgIC8vIGNlcnRhaW4gY29uZGl0aW9uczsgSUUgZG9lcyBub3QuXG4gICAgICAgICAgICAgIGlmICghKGlzRnVuY3Rpb24gJiYgcHJvcGVydHkgPT0gXCJwcm90b3R5cGVcIikgJiYgaGFzUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTWFudWFsbHkgaW52b2tlIHRoZSBjYWxsYmFjayBmb3IgZWFjaCBub24tZW51bWVyYWJsZSBwcm9wZXJ0eS5cbiAgICAgICAgICAgIGZvciAobGVuZ3RoID0gbWVtYmVycy5sZW5ndGg7IHByb3BlcnR5ID0gbWVtYmVyc1stLWxlbmd0aF07IGhhc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkgJiYgY2FsbGJhY2socHJvcGVydHkpKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKHNpemUgPT0gMikge1xuICAgICAgICAgIC8vIFNhZmFyaSA8PSAyLjAuNCBlbnVtZXJhdGVzIHNoYWRvd2VkIHByb3BlcnRpZXMgdHdpY2UuXG4gICAgICAgICAgZm9yRWFjaCA9IGZ1bmN0aW9uIChvYmplY3QsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBzZXQgb2YgaXRlcmF0ZWQgcHJvcGVydGllcy5cbiAgICAgICAgICAgIHZhciBtZW1iZXJzID0ge30sIGlzRnVuY3Rpb24gPSBnZXRDbGFzcy5jYWxsKG9iamVjdCkgPT0gZnVuY3Rpb25DbGFzcywgcHJvcGVydHk7XG4gICAgICAgICAgICBmb3IgKHByb3BlcnR5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgICAvLyBTdG9yZSBlYWNoIHByb3BlcnR5IG5hbWUgdG8gcHJldmVudCBkb3VibGUgZW51bWVyYXRpb24uIFRoZVxuICAgICAgICAgICAgICAvLyBgcHJvdG90eXBlYCBwcm9wZXJ0eSBvZiBmdW5jdGlvbnMgaXMgbm90IGVudW1lcmF0ZWQgZHVlIHRvIGNyb3NzLVxuICAgICAgICAgICAgICAvLyBlbnZpcm9ubWVudCBpbmNvbnNpc3RlbmNpZXMuXG4gICAgICAgICAgICAgIGlmICghKGlzRnVuY3Rpb24gJiYgcHJvcGVydHkgPT0gXCJwcm90b3R5cGVcIikgJiYgIWlzUHJvcGVydHkuY2FsbChtZW1iZXJzLCBwcm9wZXJ0eSkgJiYgKG1lbWJlcnNbcHJvcGVydHldID0gMSkgJiYgaXNQcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBObyBidWdzIGRldGVjdGVkOyB1c2UgdGhlIHN0YW5kYXJkIGBmb3IuLi5pbmAgYWxnb3JpdGhtLlxuICAgICAgICAgIGZvckVhY2ggPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGlzRnVuY3Rpb24gPSBnZXRDbGFzcy5jYWxsKG9iamVjdCkgPT0gZnVuY3Rpb25DbGFzcywgcHJvcGVydHksIGlzQ29uc3RydWN0b3I7XG4gICAgICAgICAgICBmb3IgKHByb3BlcnR5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgICBpZiAoIShpc0Z1bmN0aW9uICYmIHByb3BlcnR5ID09IFwicHJvdG90eXBlXCIpICYmIGlzUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSAmJiAhKGlzQ29uc3RydWN0b3IgPSBwcm9wZXJ0eSA9PT0gXCJjb25zdHJ1Y3RvclwiKSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTWFudWFsbHkgaW52b2tlIHRoZSBjYWxsYmFjayBmb3IgdGhlIGBjb25zdHJ1Y3RvcmAgcHJvcGVydHkgZHVlIHRvXG4gICAgICAgICAgICAvLyBjcm9zcy1lbnZpcm9ubWVudCBpbmNvbnNpc3RlbmNpZXMuXG4gICAgICAgICAgICBpZiAoaXNDb25zdHJ1Y3RvciB8fCBpc1Byb3BlcnR5LmNhbGwob2JqZWN0LCAocHJvcGVydHkgPSBcImNvbnN0cnVjdG9yXCIpKSkge1xuICAgICAgICAgICAgICBjYWxsYmFjayhwcm9wZXJ0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9yRWFjaChvYmplY3QsIGNhbGxiYWNrKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIFB1YmxpYzogU2VyaWFsaXplcyBhIEphdmFTY3JpcHQgYHZhbHVlYCBhcyBhIEpTT04gc3RyaW5nLiBUaGUgb3B0aW9uYWxcbiAgICAgIC8vIGBmaWx0ZXJgIGFyZ3VtZW50IG1heSBzcGVjaWZ5IGVpdGhlciBhIGZ1bmN0aW9uIHRoYXQgYWx0ZXJzIGhvdyBvYmplY3QgYW5kXG4gICAgICAvLyBhcnJheSBtZW1iZXJzIGFyZSBzZXJpYWxpemVkLCBvciBhbiBhcnJheSBvZiBzdHJpbmdzIGFuZCBudW1iZXJzIHRoYXRcbiAgICAgIC8vIGluZGljYXRlcyB3aGljaCBwcm9wZXJ0aWVzIHNob3VsZCBiZSBzZXJpYWxpemVkLiBUaGUgb3B0aW9uYWwgYHdpZHRoYFxuICAgICAgLy8gYXJndW1lbnQgbWF5IGJlIGVpdGhlciBhIHN0cmluZyBvciBudW1iZXIgdGhhdCBzcGVjaWZpZXMgdGhlIGluZGVudGF0aW9uXG4gICAgICAvLyBsZXZlbCBvZiB0aGUgb3V0cHV0LlxuICAgICAgaWYgKCFoYXMoXCJqc29uLXN0cmluZ2lmeVwiKSkge1xuICAgICAgICAvLyBJbnRlcm5hbDogQSBtYXAgb2YgY29udHJvbCBjaGFyYWN0ZXJzIGFuZCB0aGVpciBlc2NhcGVkIGVxdWl2YWxlbnRzLlxuICAgICAgICB2YXIgRXNjYXBlcyA9IHtcbiAgICAgICAgICA5MjogXCJcXFxcXFxcXFwiLFxuICAgICAgICAgIDM0OiAnXFxcXFwiJyxcbiAgICAgICAgICA4OiBcIlxcXFxiXCIsXG4gICAgICAgICAgMTI6IFwiXFxcXGZcIixcbiAgICAgICAgICAxMDogXCJcXFxcblwiLFxuICAgICAgICAgIDEzOiBcIlxcXFxyXCIsXG4gICAgICAgICAgOTogXCJcXFxcdFwiXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSW50ZXJuYWw6IENvbnZlcnRzIGB2YWx1ZWAgaW50byBhIHplcm8tcGFkZGVkIHN0cmluZyBzdWNoIHRoYXQgaXRzXG4gICAgICAgIC8vIGxlbmd0aCBpcyBhdCBsZWFzdCBlcXVhbCB0byBgd2lkdGhgLiBUaGUgYHdpZHRoYCBtdXN0IGJlIDw9IDYuXG4gICAgICAgIHZhciBsZWFkaW5nWmVyb2VzID0gXCIwMDAwMDBcIjtcbiAgICAgICAgdmFyIHRvUGFkZGVkU3RyaW5nID0gZnVuY3Rpb24gKHdpZHRoLCB2YWx1ZSkge1xuICAgICAgICAgIC8vIFRoZSBgfHwgMGAgZXhwcmVzc2lvbiBpcyBuZWNlc3NhcnkgdG8gd29yayBhcm91bmQgYSBidWcgaW5cbiAgICAgICAgICAvLyBPcGVyYSA8PSA3LjU0dTIgd2hlcmUgYDAgPT0gLTBgLCBidXQgYFN0cmluZygtMCkgIT09IFwiMFwiYC5cbiAgICAgICAgICByZXR1cm4gKGxlYWRpbmdaZXJvZXMgKyAodmFsdWUgfHwgMCkpLnNsaWNlKC13aWR0aCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSW50ZXJuYWw6IERvdWJsZS1xdW90ZXMgYSBzdHJpbmcgYHZhbHVlYCwgcmVwbGFjaW5nIGFsbCBBU0NJSSBjb250cm9sXG4gICAgICAgIC8vIGNoYXJhY3RlcnMgKGNoYXJhY3RlcnMgd2l0aCBjb2RlIHVuaXQgdmFsdWVzIGJldHdlZW4gMCBhbmQgMzEpIHdpdGhcbiAgICAgICAgLy8gdGhlaXIgZXNjYXBlZCBlcXVpdmFsZW50cy4gVGhpcyBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbiAgICAgICAgLy8gYFF1b3RlKHZhbHVlKWAgb3BlcmF0aW9uIGRlZmluZWQgaW4gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMy5cbiAgICAgICAgdmFyIHVuaWNvZGVQcmVmaXggPSBcIlxcXFx1MDBcIjtcbiAgICAgICAgdmFyIHF1b3RlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9ICdcIicsIGluZGV4ID0gMCwgbGVuZ3RoID0gdmFsdWUubGVuZ3RoLCB1c2VDaGFySW5kZXggPSAhY2hhckluZGV4QnVnZ3kgfHwgbGVuZ3RoID4gMTA7XG4gICAgICAgICAgdmFyIHN5bWJvbHMgPSB1c2VDaGFySW5kZXggJiYgKGNoYXJJbmRleEJ1Z2d5ID8gdmFsdWUuc3BsaXQoXCJcIikgOiB2YWx1ZSk7XG4gICAgICAgICAgZm9yICg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICB2YXIgY2hhckNvZGUgPSB2YWx1ZS5jaGFyQ29kZUF0KGluZGV4KTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBjaGFyYWN0ZXIgaXMgYSBjb250cm9sIGNoYXJhY3RlciwgYXBwZW5kIGl0cyBVbmljb2RlIG9yXG4gICAgICAgICAgICAvLyBzaG9ydGhhbmQgZXNjYXBlIHNlcXVlbmNlOyBvdGhlcndpc2UsIGFwcGVuZCB0aGUgY2hhcmFjdGVyIGFzLWlzLlxuICAgICAgICAgICAgc3dpdGNoIChjaGFyQ29kZSkge1xuICAgICAgICAgICAgICBjYXNlIDg6IGNhc2UgOTogY2FzZSAxMDogY2FzZSAxMjogY2FzZSAxMzogY2FzZSAzNDogY2FzZSA5MjpcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gRXNjYXBlc1tjaGFyQ29kZV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlIDwgMzIpIHtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSB1bmljb2RlUHJlZml4ICsgdG9QYWRkZWRTdHJpbmcoMiwgY2hhckNvZGUudG9TdHJpbmcoMTYpKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gdXNlQ2hhckluZGV4ID8gc3ltYm9sc1tpbmRleF0gOiB2YWx1ZS5jaGFyQXQoaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0ICsgJ1wiJztcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogUmVjdXJzaXZlbHkgc2VyaWFsaXplcyBhbiBvYmplY3QuIEltcGxlbWVudHMgdGhlXG4gICAgICAgIC8vIGBTdHIoa2V5LCBob2xkZXIpYCwgYEpPKHZhbHVlKWAsIGFuZCBgSkEodmFsdWUpYCBvcGVyYXRpb25zLlxuICAgICAgICB2YXIgc2VyaWFsaXplID0gZnVuY3Rpb24gKHByb3BlcnR5LCBvYmplY3QsIGNhbGxiYWNrLCBwcm9wZXJ0aWVzLCB3aGl0ZXNwYWNlLCBpbmRlbnRhdGlvbiwgc3RhY2spIHtcbiAgICAgICAgICB2YXIgdmFsdWUsIGNsYXNzTmFtZSwgeWVhciwgbW9udGgsIGRhdGUsIHRpbWUsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXNlY29uZHMsIHJlc3VsdHMsIGVsZW1lbnQsIGluZGV4LCBsZW5ndGgsIHByZWZpeCwgcmVzdWx0O1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBOZWNlc3NhcnkgZm9yIGhvc3Qgb2JqZWN0IHN1cHBvcnQuXG4gICAgICAgICAgICB2YWx1ZSA9IG9iamVjdFtwcm9wZXJ0eV07XG4gICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7fVxuICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIiAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lID09IGRhdGVDbGFzcyAmJiAhaXNQcm9wZXJ0eS5jYWxsKHZhbHVlLCBcInRvSlNPTlwiKSkge1xuICAgICAgICAgICAgICBpZiAodmFsdWUgPiAtMSAvIDAgJiYgdmFsdWUgPCAxIC8gMCkge1xuICAgICAgICAgICAgICAgIC8vIERhdGVzIGFyZSBzZXJpYWxpemVkIGFjY29yZGluZyB0byB0aGUgYERhdGUjdG9KU09OYCBtZXRob2RcbiAgICAgICAgICAgICAgICAvLyBzcGVjaWZpZWQgaW4gRVMgNS4xIHNlY3Rpb24gMTUuOS41LjQ0LiBTZWUgc2VjdGlvbiAxNS45LjEuMTVcbiAgICAgICAgICAgICAgICAvLyBmb3IgdGhlIElTTyA4NjAxIGRhdGUgdGltZSBzdHJpbmcgZm9ybWF0LlxuICAgICAgICAgICAgICAgIGlmIChnZXREYXkpIHtcbiAgICAgICAgICAgICAgICAgIC8vIE1hbnVhbGx5IGNvbXB1dGUgdGhlIHllYXIsIG1vbnRoLCBkYXRlLCBob3VycywgbWludXRlcyxcbiAgICAgICAgICAgICAgICAgIC8vIHNlY29uZHMsIGFuZCBtaWxsaXNlY29uZHMgaWYgdGhlIGBnZXRVVEMqYCBtZXRob2RzIGFyZVxuICAgICAgICAgICAgICAgICAgLy8gYnVnZ3kuIEFkYXB0ZWQgZnJvbSBAWWFmZmxlJ3MgYGRhdGUtc2hpbWAgcHJvamVjdC5cbiAgICAgICAgICAgICAgICAgIGRhdGUgPSBmbG9vcih2YWx1ZSAvIDg2NGU1KTtcbiAgICAgICAgICAgICAgICAgIGZvciAoeWVhciA9IGZsb29yKGRhdGUgLyAzNjUuMjQyNSkgKyAxOTcwIC0gMTsgZ2V0RGF5KHllYXIgKyAxLCAwKSA8PSBkYXRlOyB5ZWFyKyspO1xuICAgICAgICAgICAgICAgICAgZm9yIChtb250aCA9IGZsb29yKChkYXRlIC0gZ2V0RGF5KHllYXIsIDApKSAvIDMwLjQyKTsgZ2V0RGF5KHllYXIsIG1vbnRoICsgMSkgPD0gZGF0ZTsgbW9udGgrKyk7XG4gICAgICAgICAgICAgICAgICBkYXRlID0gMSArIGRhdGUgLSBnZXREYXkoeWVhciwgbW9udGgpO1xuICAgICAgICAgICAgICAgICAgLy8gVGhlIGB0aW1lYCB2YWx1ZSBzcGVjaWZpZXMgdGhlIHRpbWUgd2l0aGluIHRoZSBkYXkgKHNlZSBFU1xuICAgICAgICAgICAgICAgICAgLy8gNS4xIHNlY3Rpb24gMTUuOS4xLjIpLiBUaGUgZm9ybXVsYSBgKEEgJSBCICsgQikgJSBCYCBpcyB1c2VkXG4gICAgICAgICAgICAgICAgICAvLyB0byBjb21wdXRlIGBBIG1vZHVsbyBCYCwgYXMgdGhlIGAlYCBvcGVyYXRvciBkb2VzIG5vdFxuICAgICAgICAgICAgICAgICAgLy8gY29ycmVzcG9uZCB0byB0aGUgYG1vZHVsb2Agb3BlcmF0aW9uIGZvciBuZWdhdGl2ZSBudW1iZXJzLlxuICAgICAgICAgICAgICAgICAgdGltZSA9ICh2YWx1ZSAlIDg2NGU1ICsgODY0ZTUpICUgODY0ZTU7XG4gICAgICAgICAgICAgICAgICAvLyBUaGUgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMsIGFuZCBtaWxsaXNlY29uZHMgYXJlIG9idGFpbmVkIGJ5XG4gICAgICAgICAgICAgICAgICAvLyBkZWNvbXBvc2luZyB0aGUgdGltZSB3aXRoaW4gdGhlIGRheS4gU2VlIHNlY3Rpb24gMTUuOS4xLjEwLlxuICAgICAgICAgICAgICAgICAgaG91cnMgPSBmbG9vcih0aW1lIC8gMzZlNSkgJSAyNDtcbiAgICAgICAgICAgICAgICAgIG1pbnV0ZXMgPSBmbG9vcih0aW1lIC8gNmU0KSAlIDYwO1xuICAgICAgICAgICAgICAgICAgc2Vjb25kcyA9IGZsb29yKHRpbWUgLyAxZTMpICUgNjA7XG4gICAgICAgICAgICAgICAgICBtaWxsaXNlY29uZHMgPSB0aW1lICUgMWUzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB5ZWFyID0gdmFsdWUuZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAgICAgICAgICAgICAgIG1vbnRoID0gdmFsdWUuZ2V0VVRDTW9udGgoKTtcbiAgICAgICAgICAgICAgICAgIGRhdGUgPSB2YWx1ZS5nZXRVVENEYXRlKCk7XG4gICAgICAgICAgICAgICAgICBob3VycyA9IHZhbHVlLmdldFVUQ0hvdXJzKCk7XG4gICAgICAgICAgICAgICAgICBtaW51dGVzID0gdmFsdWUuZ2V0VVRDTWludXRlcygpO1xuICAgICAgICAgICAgICAgICAgc2Vjb25kcyA9IHZhbHVlLmdldFVUQ1NlY29uZHMoKTtcbiAgICAgICAgICAgICAgICAgIG1pbGxpc2Vjb25kcyA9IHZhbHVlLmdldFVUQ01pbGxpc2Vjb25kcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBTZXJpYWxpemUgZXh0ZW5kZWQgeWVhcnMgY29ycmVjdGx5LlxuICAgICAgICAgICAgICAgIHZhbHVlID0gKHllYXIgPD0gMCB8fCB5ZWFyID49IDFlNCA/ICh5ZWFyIDwgMCA/IFwiLVwiIDogXCIrXCIpICsgdG9QYWRkZWRTdHJpbmcoNiwgeWVhciA8IDAgPyAteWVhciA6IHllYXIpIDogdG9QYWRkZWRTdHJpbmcoNCwgeWVhcikpICtcbiAgICAgICAgICAgICAgICAgIFwiLVwiICsgdG9QYWRkZWRTdHJpbmcoMiwgbW9udGggKyAxKSArIFwiLVwiICsgdG9QYWRkZWRTdHJpbmcoMiwgZGF0ZSkgK1xuICAgICAgICAgICAgICAgICAgLy8gTW9udGhzLCBkYXRlcywgaG91cnMsIG1pbnV0ZXMsIGFuZCBzZWNvbmRzIHNob3VsZCBoYXZlIHR3b1xuICAgICAgICAgICAgICAgICAgLy8gZGlnaXRzOyBtaWxsaXNlY29uZHMgc2hvdWxkIGhhdmUgdGhyZWUuXG4gICAgICAgICAgICAgICAgICBcIlRcIiArIHRvUGFkZGVkU3RyaW5nKDIsIGhvdXJzKSArIFwiOlwiICsgdG9QYWRkZWRTdHJpbmcoMiwgbWludXRlcykgKyBcIjpcIiArIHRvUGFkZGVkU3RyaW5nKDIsIHNlY29uZHMpICtcbiAgICAgICAgICAgICAgICAgIC8vIE1pbGxpc2Vjb25kcyBhcmUgb3B0aW9uYWwgaW4gRVMgNS4wLCBidXQgcmVxdWlyZWQgaW4gNS4xLlxuICAgICAgICAgICAgICAgICAgXCIuXCIgKyB0b1BhZGRlZFN0cmluZygzLCBtaWxsaXNlY29uZHMpICsgXCJaXCI7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZS50b0pTT04gPT0gXCJmdW5jdGlvblwiICYmICgoY2xhc3NOYW1lICE9IG51bWJlckNsYXNzICYmIGNsYXNzTmFtZSAhPSBzdHJpbmdDbGFzcyAmJiBjbGFzc05hbWUgIT0gYXJyYXlDbGFzcykgfHwgaXNQcm9wZXJ0eS5jYWxsKHZhbHVlLCBcInRvSlNPTlwiKSkpIHtcbiAgICAgICAgICAgICAgLy8gUHJvdG90eXBlIDw9IDEuNi4xIGFkZHMgbm9uLXN0YW5kYXJkIGB0b0pTT05gIG1ldGhvZHMgdG8gdGhlXG4gICAgICAgICAgICAgIC8vIGBOdW1iZXJgLCBgU3RyaW5nYCwgYERhdGVgLCBhbmQgYEFycmF5YCBwcm90b3R5cGVzLiBKU09OIDNcbiAgICAgICAgICAgICAgLy8gaWdub3JlcyBhbGwgYHRvSlNPTmAgbWV0aG9kcyBvbiB0aGVzZSBvYmplY3RzIHVubGVzcyB0aGV5IGFyZVxuICAgICAgICAgICAgICAvLyBkZWZpbmVkIGRpcmVjdGx5IG9uIGFuIGluc3RhbmNlLlxuICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvSlNPTihwcm9wZXJ0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgLy8gSWYgYSByZXBsYWNlbWVudCBmdW5jdGlvbiB3YXMgcHJvdmlkZWQsIGNhbGwgaXQgdG8gb2J0YWluIHRoZSB2YWx1ZVxuICAgICAgICAgICAgLy8gZm9yIHNlcmlhbGl6YXRpb24uXG4gICAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrLmNhbGwob2JqZWN0LCBwcm9wZXJ0eSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm51bGxcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbCh2YWx1ZSk7XG4gICAgICAgICAgaWYgKGNsYXNzTmFtZSA9PSBib29sZWFuQ2xhc3MpIHtcbiAgICAgICAgICAgIC8vIEJvb2xlYW5zIGFyZSByZXByZXNlbnRlZCBsaXRlcmFsbHkuXG4gICAgICAgICAgICByZXR1cm4gXCJcIiArIHZhbHVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2xhc3NOYW1lID09IG51bWJlckNsYXNzKSB7XG4gICAgICAgICAgICAvLyBKU09OIG51bWJlcnMgbXVzdCBiZSBmaW5pdGUuIGBJbmZpbml0eWAgYW5kIGBOYU5gIGFyZSBzZXJpYWxpemVkIGFzXG4gICAgICAgICAgICAvLyBgXCJudWxsXCJgLlxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID4gLTEgLyAwICYmIHZhbHVlIDwgMSAvIDAgPyBcIlwiICsgdmFsdWUgOiBcIm51bGxcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNsYXNzTmFtZSA9PSBzdHJpbmdDbGFzcykge1xuICAgICAgICAgICAgLy8gU3RyaW5ncyBhcmUgZG91YmxlLXF1b3RlZCBhbmQgZXNjYXBlZC5cbiAgICAgICAgICAgIHJldHVybiBxdW90ZShcIlwiICsgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBSZWN1cnNpdmVseSBzZXJpYWxpemUgb2JqZWN0cyBhbmQgYXJyYXlzLlxuICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGN5Y2xpYyBzdHJ1Y3R1cmVzLiBUaGlzIGlzIGEgbGluZWFyIHNlYXJjaDsgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIC8vIGlzIGludmVyc2VseSBwcm9wb3J0aW9uYWwgdG8gdGhlIG51bWJlciBvZiB1bmlxdWUgbmVzdGVkIG9iamVjdHMuXG4gICAgICAgICAgICBmb3IgKGxlbmd0aCA9IHN0YWNrLmxlbmd0aDsgbGVuZ3RoLS07KSB7XG4gICAgICAgICAgICAgIGlmIChzdGFja1tsZW5ndGhdID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIEN5Y2xpYyBzdHJ1Y3R1cmVzIGNhbm5vdCBiZSBzZXJpYWxpemVkIGJ5IGBKU09OLnN0cmluZ2lmeWAuXG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFkZCB0aGUgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICAgICAgICAgIHN0YWNrLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgLy8gU2F2ZSB0aGUgY3VycmVudCBpbmRlbnRhdGlvbiBsZXZlbCBhbmQgaW5kZW50IG9uZSBhZGRpdGlvbmFsIGxldmVsLlxuICAgICAgICAgICAgcHJlZml4ID0gaW5kZW50YXRpb247XG4gICAgICAgICAgICBpbmRlbnRhdGlvbiArPSB3aGl0ZXNwYWNlO1xuICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSA9PSBhcnJheUNsYXNzKSB7XG4gICAgICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZSBhcnJheSBlbGVtZW50cy5cbiAgICAgICAgICAgICAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gc2VyaWFsaXplKGluZGV4LCB2YWx1ZSwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIHdoaXRlc3BhY2UsIGluZGVudGF0aW9uLCBzdGFjayk7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGVsZW1lbnQgPT09IHVuZGVmID8gXCJudWxsXCIgOiBlbGVtZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHRzLmxlbmd0aCA/ICh3aGl0ZXNwYWNlID8gXCJbXFxuXCIgKyBpbmRlbnRhdGlvbiArIHJlc3VsdHMuam9pbihcIixcXG5cIiArIGluZGVudGF0aW9uKSArIFwiXFxuXCIgKyBwcmVmaXggKyBcIl1cIiA6IChcIltcIiArIHJlc3VsdHMuam9pbihcIixcIikgKyBcIl1cIikpIDogXCJbXVwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gUmVjdXJzaXZlbHkgc2VyaWFsaXplIG9iamVjdCBtZW1iZXJzLiBNZW1iZXJzIGFyZSBzZWxlY3RlZCBmcm9tXG4gICAgICAgICAgICAgIC8vIGVpdGhlciBhIHVzZXItc3BlY2lmaWVkIGxpc3Qgb2YgcHJvcGVydHkgbmFtZXMsIG9yIHRoZSBvYmplY3RcbiAgICAgICAgICAgICAgLy8gaXRzZWxmLlxuICAgICAgICAgICAgICBmb3JFYWNoKHByb3BlcnRpZXMgfHwgdmFsdWUsIGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gc2VyaWFsaXplKHByb3BlcnR5LCB2YWx1ZSwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIHdoaXRlc3BhY2UsIGluZGVudGF0aW9uLCBzdGFjayk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IHVuZGVmKSB7XG4gICAgICAgICAgICAgICAgICAvLyBBY2NvcmRpbmcgdG8gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMzogXCJJZiBgZ2FwYCB7d2hpdGVzcGFjZX1cbiAgICAgICAgICAgICAgICAgIC8vIGlzIG5vdCB0aGUgZW1wdHkgc3RyaW5nLCBsZXQgYG1lbWJlcmAge3F1b3RlKHByb3BlcnR5KSArIFwiOlwifVxuICAgICAgICAgICAgICAgICAgLy8gYmUgdGhlIGNvbmNhdGVuYXRpb24gb2YgYG1lbWJlcmAgYW5kIHRoZSBgc3BhY2VgIGNoYXJhY3Rlci5cIlxuICAgICAgICAgICAgICAgICAgLy8gVGhlIFwiYHNwYWNlYCBjaGFyYWN0ZXJcIiByZWZlcnMgdG8gdGhlIGxpdGVyYWwgc3BhY2VcbiAgICAgICAgICAgICAgICAgIC8vIGNoYXJhY3Rlciwgbm90IHRoZSBgc3BhY2VgIHt3aWR0aH0gYXJndW1lbnQgcHJvdmlkZWQgdG9cbiAgICAgICAgICAgICAgICAgIC8vIGBKU09OLnN0cmluZ2lmeWAuXG4gICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocXVvdGUocHJvcGVydHkpICsgXCI6XCIgKyAod2hpdGVzcGFjZSA/IFwiIFwiIDogXCJcIikgKyBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHRzLmxlbmd0aCA/ICh3aGl0ZXNwYWNlID8gXCJ7XFxuXCIgKyBpbmRlbnRhdGlvbiArIHJlc3VsdHMuam9pbihcIixcXG5cIiArIGluZGVudGF0aW9uKSArIFwiXFxuXCIgKyBwcmVmaXggKyBcIn1cIiA6IChcIntcIiArIHJlc3VsdHMuam9pbihcIixcIikgKyBcIn1cIikpIDogXCJ7fVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBvYmplY3QgZnJvbSB0aGUgdHJhdmVyc2VkIG9iamVjdCBzdGFjay5cbiAgICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gUHVibGljOiBgSlNPTi5zdHJpbmdpZnlgLiBTZWUgRVMgNS4xIHNlY3Rpb24gMTUuMTIuMy5cbiAgICAgICAgZXhwb3J0cy5zdHJpbmdpZnkgPSBmdW5jdGlvbiAoc291cmNlLCBmaWx0ZXIsIHdpZHRoKSB7XG4gICAgICAgICAgdmFyIHdoaXRlc3BhY2UsIGNhbGxiYWNrLCBwcm9wZXJ0aWVzLCBjbGFzc05hbWU7XG4gICAgICAgICAgaWYgKG9iamVjdFR5cGVzW3R5cGVvZiBmaWx0ZXJdICYmIGZpbHRlcikge1xuICAgICAgICAgICAgaWYgKChjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKGZpbHRlcikpID09IGZ1bmN0aW9uQ2xhc3MpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sgPSBmaWx0ZXI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNsYXNzTmFtZSA9PSBhcnJheUNsYXNzKSB7XG4gICAgICAgICAgICAgIC8vIENvbnZlcnQgdGhlIHByb3BlcnR5IG5hbWVzIGFycmF5IGludG8gYSBtYWtlc2hpZnQgc2V0LlxuICAgICAgICAgICAgICBwcm9wZXJ0aWVzID0ge307XG4gICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0gZmlsdGVyLmxlbmd0aCwgdmFsdWU7IGluZGV4IDwgbGVuZ3RoOyB2YWx1ZSA9IGZpbHRlcltpbmRleCsrXSwgKChjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHZhbHVlKSksIGNsYXNzTmFtZSA9PSBzdHJpbmdDbGFzcyB8fCBjbGFzc05hbWUgPT0gbnVtYmVyQ2xhc3MpICYmIChwcm9wZXJ0aWVzW3ZhbHVlXSA9IDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHdpZHRoKSB7XG4gICAgICAgICAgICBpZiAoKGNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwod2lkdGgpKSA9PSBudW1iZXJDbGFzcykge1xuICAgICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBgd2lkdGhgIHRvIGFuIGludGVnZXIgYW5kIGNyZWF0ZSBhIHN0cmluZyBjb250YWluaW5nXG4gICAgICAgICAgICAgIC8vIGB3aWR0aGAgbnVtYmVyIG9mIHNwYWNlIGNoYXJhY3RlcnMuXG4gICAgICAgICAgICAgIGlmICgod2lkdGggLT0gd2lkdGggJSAxKSA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKHdoaXRlc3BhY2UgPSBcIlwiLCB3aWR0aCA+IDEwICYmICh3aWR0aCA9IDEwKTsgd2hpdGVzcGFjZS5sZW5ndGggPCB3aWR0aDsgd2hpdGVzcGFjZSArPSBcIiBcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xhc3NOYW1lID09IHN0cmluZ0NsYXNzKSB7XG4gICAgICAgICAgICAgIHdoaXRlc3BhY2UgPSB3aWR0aC5sZW5ndGggPD0gMTAgPyB3aWR0aCA6IHdpZHRoLnNsaWNlKDAsIDEwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gT3BlcmEgPD0gNy41NHUyIGRpc2NhcmRzIHRoZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGVtcHR5IHN0cmluZyBrZXlzXG4gICAgICAgICAgLy8gKGBcIlwiYCkgb25seSBpZiB0aGV5IGFyZSB1c2VkIGRpcmVjdGx5IHdpdGhpbiBhbiBvYmplY3QgbWVtYmVyIGxpc3RcbiAgICAgICAgICAvLyAoZS5nLiwgYCEoXCJcIiBpbiB7IFwiXCI6IDF9KWApLlxuICAgICAgICAgIHJldHVybiBzZXJpYWxpemUoXCJcIiwgKHZhbHVlID0ge30sIHZhbHVlW1wiXCJdID0gc291cmNlLCB2YWx1ZSksIGNhbGxiYWNrLCBwcm9wZXJ0aWVzLCB3aGl0ZXNwYWNlLCBcIlwiLCBbXSk7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIFB1YmxpYzogUGFyc2VzIGEgSlNPTiBzb3VyY2Ugc3RyaW5nLlxuICAgICAgaWYgKCFoYXMoXCJqc29uLXBhcnNlXCIpKSB7XG4gICAgICAgIHZhciBmcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xuXG4gICAgICAgIC8vIEludGVybmFsOiBBIG1hcCBvZiBlc2NhcGVkIGNvbnRyb2wgY2hhcmFjdGVycyBhbmQgdGhlaXIgdW5lc2NhcGVkXG4gICAgICAgIC8vIGVxdWl2YWxlbnRzLlxuICAgICAgICB2YXIgVW5lc2NhcGVzID0ge1xuICAgICAgICAgIDkyOiBcIlxcXFxcIixcbiAgICAgICAgICAzNDogJ1wiJyxcbiAgICAgICAgICA0NzogXCIvXCIsXG4gICAgICAgICAgOTg6IFwiXFxiXCIsXG4gICAgICAgICAgMTE2OiBcIlxcdFwiLFxuICAgICAgICAgIDExMDogXCJcXG5cIixcbiAgICAgICAgICAxMDI6IFwiXFxmXCIsXG4gICAgICAgICAgMTE0OiBcIlxcclwiXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSW50ZXJuYWw6IFN0b3JlcyB0aGUgcGFyc2VyIHN0YXRlLlxuICAgICAgICB2YXIgSW5kZXgsIFNvdXJjZTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogUmVzZXRzIHRoZSBwYXJzZXIgc3RhdGUgYW5kIHRocm93cyBhIGBTeW50YXhFcnJvcmAuXG4gICAgICAgIHZhciBhYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBJbmRleCA9IFNvdXJjZSA9IG51bGw7XG4gICAgICAgICAgdGhyb3cgU3ludGF4RXJyb3IoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogUmV0dXJucyB0aGUgbmV4dCB0b2tlbiwgb3IgYFwiJFwiYCBpZiB0aGUgcGFyc2VyIGhhcyByZWFjaGVkXG4gICAgICAgIC8vIHRoZSBlbmQgb2YgdGhlIHNvdXJjZSBzdHJpbmcuIEEgdG9rZW4gbWF5IGJlIGEgc3RyaW5nLCBudW1iZXIsIGBudWxsYFxuICAgICAgICAvLyBsaXRlcmFsLCBvciBCb29sZWFuIGxpdGVyYWwuXG4gICAgICAgIHZhciBsZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHNvdXJjZSA9IFNvdXJjZSwgbGVuZ3RoID0gc291cmNlLmxlbmd0aCwgdmFsdWUsIGJlZ2luLCBwb3NpdGlvbiwgaXNTaWduZWQsIGNoYXJDb2RlO1xuICAgICAgICAgIHdoaWxlIChJbmRleCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7XG4gICAgICAgICAgICBzd2l0Y2ggKGNoYXJDb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgOTogY2FzZSAxMDogY2FzZSAxMzogY2FzZSAzMjpcbiAgICAgICAgICAgICAgICAvLyBTa2lwIHdoaXRlc3BhY2UgdG9rZW5zLCBpbmNsdWRpbmcgdGFicywgY2FycmlhZ2UgcmV0dXJucywgbGluZVxuICAgICAgICAgICAgICAgIC8vIGZlZWRzLCBhbmQgc3BhY2UgY2hhcmFjdGVycy5cbiAgICAgICAgICAgICAgICBJbmRleCsrO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDEyMzogY2FzZSAxMjU6IGNhc2UgOTE6IGNhc2UgOTM6IGNhc2UgNTg6IGNhc2UgNDQ6XG4gICAgICAgICAgICAgICAgLy8gUGFyc2UgYSBwdW5jdHVhdG9yIHRva2VuIChge2AsIGB9YCwgYFtgLCBgXWAsIGA6YCwgb3IgYCxgKSBhdFxuICAgICAgICAgICAgICAgIC8vIHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgICAgICAgICAgICAgIHZhbHVlID0gY2hhckluZGV4QnVnZ3kgPyBzb3VyY2UuY2hhckF0KEluZGV4KSA6IHNvdXJjZVtJbmRleF07XG4gICAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgICAgICAgLy8gYFwiYCBkZWxpbWl0cyBhIEpTT04gc3RyaW5nOyBhZHZhbmNlIHRvIHRoZSBuZXh0IGNoYXJhY3RlciBhbmRcbiAgICAgICAgICAgICAgICAvLyBiZWdpbiBwYXJzaW5nIHRoZSBzdHJpbmcuIFN0cmluZyB0b2tlbnMgYXJlIHByZWZpeGVkIHdpdGggdGhlXG4gICAgICAgICAgICAgICAgLy8gc2VudGluZWwgYEBgIGNoYXJhY3RlciB0byBkaXN0aW5ndWlzaCB0aGVtIGZyb20gcHVuY3R1YXRvcnMgYW5kXG4gICAgICAgICAgICAgICAgLy8gZW5kLW9mLXN0cmluZyB0b2tlbnMuXG4gICAgICAgICAgICAgICAgZm9yICh2YWx1ZSA9IFwiQFwiLCBJbmRleCsrOyBJbmRleCA8IGxlbmd0aDspIHtcbiAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlIDwgMzIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVW5lc2NhcGVkIEFTQ0lJIGNvbnRyb2wgY2hhcmFjdGVycyAodGhvc2Ugd2l0aCBhIGNvZGUgdW5pdFxuICAgICAgICAgICAgICAgICAgICAvLyBsZXNzIHRoYW4gdGhlIHNwYWNlIGNoYXJhY3RlcikgYXJlIG5vdCBwZXJtaXR0ZWQuXG4gICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJDb2RlID09IDkyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEEgcmV2ZXJzZSBzb2xpZHVzIChgXFxgKSBtYXJrcyB0aGUgYmVnaW5uaW5nIG9mIGFuIGVzY2FwZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gY29udHJvbCBjaGFyYWN0ZXIgKGluY2x1ZGluZyBgXCJgLCBgXFxgLCBhbmQgYC9gKSBvciBVbmljb2RlXG4gICAgICAgICAgICAgICAgICAgIC8vIGVzY2FwZSBzZXF1ZW5jZS5cbiAgICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjaGFyQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNhc2UgOTI6IGNhc2UgMzQ6IGNhc2UgNDc6IGNhc2UgOTg6IGNhc2UgMTE2OiBjYXNlIDExMDogY2FzZSAxMDI6IGNhc2UgMTE0OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmV2aXZlIGVzY2FwZWQgY29udHJvbCBjaGFyYWN0ZXJzLlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gVW5lc2NhcGVzW2NoYXJDb2RlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICBjYXNlIDExNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGBcXHVgIG1hcmtzIHRoZSBiZWdpbm5pbmcgb2YgYSBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkdmFuY2UgdG8gdGhlIGZpcnN0IGNoYXJhY3RlciBhbmQgdmFsaWRhdGUgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3VyLWRpZ2l0IGNvZGUgcG9pbnQuXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpbiA9ICsrSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHBvc2l0aW9uID0gSW5kZXggKyA0OyBJbmRleCA8IHBvc2l0aW9uOyBJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBIHZhbGlkIHNlcXVlbmNlIGNvbXByaXNlcyBmb3VyIGhleGRpZ2l0cyAoY2FzZS1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW5zZW5zaXRpdmUpIHRoYXQgZm9ybSBhIHNpbmdsZSBoZXhhZGVjaW1hbCB2YWx1ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcgfHwgY2hhckNvZGUgPj0gOTcgJiYgY2hhckNvZGUgPD0gMTAyIHx8IGNoYXJDb2RlID49IDY1ICYmIGNoYXJDb2RlIDw9IDcwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEludmFsaWQgVW5pY29kZSBlc2NhcGUgc2VxdWVuY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmV2aXZlIHRoZSBlc2NhcGVkIGNoYXJhY3Rlci5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IGZyb21DaGFyQ29kZShcIjB4XCIgKyBzb3VyY2Uuc2xpY2UoYmVnaW4sIEluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW52YWxpZCBlc2NhcGUgc2VxdWVuY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPT0gMzQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBBbiB1bmVzY2FwZWQgZG91YmxlLXF1b3RlIGNoYXJhY3RlciBtYXJrcyB0aGUgZW5kIG9mIHRoZVxuICAgICAgICAgICAgICAgICAgICAgIC8vIHN0cmluZy5cbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgYmVnaW4gPSBJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgLy8gT3B0aW1pemUgZm9yIHRoZSBjb21tb24gY2FzZSB3aGVyZSBhIHN0cmluZyBpcyB2YWxpZC5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGNoYXJDb2RlID49IDMyICYmIGNoYXJDb2RlICE9IDkyICYmIGNoYXJDb2RlICE9IDM0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdGhlIHN0cmluZyBhcy1pcy5cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gc291cmNlLnNsaWNlKGJlZ2luLCBJbmRleCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuY2hhckNvZGVBdChJbmRleCkgPT0gMzQpIHtcbiAgICAgICAgICAgICAgICAgIC8vIEFkdmFuY2UgdG8gdGhlIG5leHQgY2hhcmFjdGVyIGFuZCByZXR1cm4gdGhlIHJldml2ZWQgc3RyaW5nLlxuICAgICAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVW50ZXJtaW5hdGVkIHN0cmluZy5cbiAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIFBhcnNlIG51bWJlcnMgYW5kIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgIGJlZ2luID0gSW5kZXg7XG4gICAgICAgICAgICAgICAgLy8gQWR2YW5jZSBwYXN0IHRoZSBuZWdhdGl2ZSBzaWduLCBpZiBvbmUgaXMgc3BlY2lmaWVkLlxuICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PSA0NSkge1xuICAgICAgICAgICAgICAgICAgaXNTaWduZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gUGFyc2UgYW4gaW50ZWdlciBvciBmbG9hdGluZy1wb2ludCB2YWx1ZS5cbiAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpIHtcbiAgICAgICAgICAgICAgICAgIC8vIExlYWRpbmcgemVyb2VzIGFyZSBpbnRlcnByZXRlZCBhcyBvY3RhbCBsaXRlcmFscy5cbiAgICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PSA0OCAmJiAoKGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXggKyAxKSksIGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbGxlZ2FsIG9jdGFsIGxpdGVyYWwuXG4gICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpc1NpZ25lZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgdGhlIGludGVnZXIgY29tcG9uZW50LlxuICAgICAgICAgICAgICAgICAgZm9yICg7IEluZGV4IDwgbGVuZ3RoICYmICgoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCkpLCBjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7IEluZGV4KyspO1xuICAgICAgICAgICAgICAgICAgLy8gRmxvYXRzIGNhbm5vdCBjb250YWluIGEgbGVhZGluZyBkZWNpbWFsIHBvaW50OyBob3dldmVyLCB0aGlzXG4gICAgICAgICAgICAgICAgICAvLyBjYXNlIGlzIGFscmVhZHkgYWNjb3VudGVkIGZvciBieSB0aGUgcGFyc2VyLlxuICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KSA9PSA0Nikge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9ICsrSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIHRoZSBkZWNpbWFsIGNvbXBvbmVudC5cbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IHBvc2l0aW9uIDwgbGVuZ3RoICYmICgoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChwb3NpdGlvbikpLCBjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7IHBvc2l0aW9uKyspO1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPT0gSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJbGxlZ2FsIHRyYWlsaW5nIGRlY2ltYWwuXG4gICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBJbmRleCA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgZXhwb25lbnRzLiBUaGUgYGVgIGRlbm90aW5nIHRoZSBleHBvbmVudCBpc1xuICAgICAgICAgICAgICAgICAgLy8gY2FzZS1pbnNlbnNpdGl2ZS5cbiAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlID09IDEwMSB8fCBjaGFyQ29kZSA9PSA2OSkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KCsrSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIHBhc3QgdGhlIHNpZ24gZm9sbG93aW5nIHRoZSBleHBvbmVudCwgaWYgb25lIGlzXG4gICAgICAgICAgICAgICAgICAgIC8vIHNwZWNpZmllZC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlID09IDQzIHx8IGNoYXJDb2RlID09IDQ1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBQYXJzZSB0aGUgZXhwb25lbnRpYWwgY29tcG9uZW50LlxuICAgICAgICAgICAgICAgICAgICBmb3IgKHBvc2l0aW9uID0gSW5kZXg7IHBvc2l0aW9uIDwgbGVuZ3RoICYmICgoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChwb3NpdGlvbikpLCBjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7IHBvc2l0aW9uKyspO1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPT0gSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJbGxlZ2FsIGVtcHR5IGV4cG9uZW50LlxuICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgSW5kZXggPSBwb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIC8vIENvZXJjZSB0aGUgcGFyc2VkIHZhbHVlIHRvIGEgSmF2YVNjcmlwdCBudW1iZXIuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gK3NvdXJjZS5zbGljZShiZWdpbiwgSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBBIG5lZ2F0aXZlIHNpZ24gbWF5IG9ubHkgcHJlY2VkZSBudW1iZXJzLlxuICAgICAgICAgICAgICAgIGlmIChpc1NpZ25lZCkge1xuICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gYHRydWVgLCBgZmFsc2VgLCBhbmQgYG51bGxgIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2Uuc2xpY2UoSW5kZXgsIEluZGV4ICsgNCkgPT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICAgIEluZGV4ICs9IDQ7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZS5zbGljZShJbmRleCwgSW5kZXggKyA1KSA9PSBcImZhbHNlXCIpIHtcbiAgICAgICAgICAgICAgICAgIEluZGV4ICs9IDU7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzb3VyY2Uuc2xpY2UoSW5kZXgsIEluZGV4ICsgNCkgPT0gXCJudWxsXCIpIHtcbiAgICAgICAgICAgICAgICAgIEluZGV4ICs9IDQ7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVW5yZWNvZ25pemVkIHRva2VuLlxuICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFJldHVybiB0aGUgc2VudGluZWwgYCRgIGNoYXJhY3RlciBpZiB0aGUgcGFyc2VyIGhhcyByZWFjaGVkIHRoZSBlbmRcbiAgICAgICAgICAvLyBvZiB0aGUgc291cmNlIHN0cmluZy5cbiAgICAgICAgICByZXR1cm4gXCIkXCI7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSW50ZXJuYWw6IFBhcnNlcyBhIEpTT04gYHZhbHVlYCB0b2tlbi5cbiAgICAgICAgdmFyIGdldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIHZhciByZXN1bHRzLCBoYXNNZW1iZXJzO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIiRcIikge1xuICAgICAgICAgICAgLy8gVW5leHBlY3RlZCBlbmQgb2YgaW5wdXQuXG4gICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGlmICgoY2hhckluZGV4QnVnZ3kgPyB2YWx1ZS5jaGFyQXQoMCkgOiB2YWx1ZVswXSkgPT0gXCJAXCIpIHtcbiAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBzZW50aW5lbCBgQGAgY2hhcmFjdGVyLlxuICAgICAgICAgICAgICByZXR1cm4gdmFsdWUuc2xpY2UoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBQYXJzZSBvYmplY3QgYW5kIGFycmF5IGxpdGVyYWxzLlxuICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiW1wiKSB7XG4gICAgICAgICAgICAgIC8vIFBhcnNlcyBhIEpTT04gYXJyYXksIHJldHVybmluZyBhIG5ldyBKYXZhU2NyaXB0IGFycmF5LlxuICAgICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICAgIGZvciAoOzsgaGFzTWVtYmVycyB8fCAoaGFzTWVtYmVycyA9IHRydWUpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBsZXgoKTtcbiAgICAgICAgICAgICAgICAvLyBBIGNsb3Npbmcgc3F1YXJlIGJyYWNrZXQgbWFya3MgdGhlIGVuZCBvZiB0aGUgYXJyYXkgbGl0ZXJhbC5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCJdXCIpIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgYXJyYXkgbGl0ZXJhbCBjb250YWlucyBlbGVtZW50cywgdGhlIGN1cnJlbnQgdG9rZW5cbiAgICAgICAgICAgICAgICAvLyBzaG91bGQgYmUgYSBjb21tYSBzZXBhcmF0aW5nIHRoZSBwcmV2aW91cyBlbGVtZW50IGZyb20gdGhlXG4gICAgICAgICAgICAgICAgLy8gbmV4dC5cbiAgICAgICAgICAgICAgICBpZiAoaGFzTWVtYmVycykge1xuICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiLFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gbGV4KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIl1cIikge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFVuZXhwZWN0ZWQgdHJhaWxpbmcgYCxgIGluIGFycmF5IGxpdGVyYWwuXG4gICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQSBgLGAgbXVzdCBzZXBhcmF0ZSBlYWNoIGFycmF5IGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEVsaXNpb25zIGFuZCBsZWFkaW5nIGNvbW1hcyBhcmUgbm90IHBlcm1pdHRlZC5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCIsXCIpIHtcbiAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChnZXQodmFsdWUpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gXCJ7XCIpIHtcbiAgICAgICAgICAgICAgLy8gUGFyc2VzIGEgSlNPTiBvYmplY3QsIHJldHVybmluZyBhIG5ldyBKYXZhU2NyaXB0IG9iamVjdC5cbiAgICAgICAgICAgICAgcmVzdWx0cyA9IHt9O1xuICAgICAgICAgICAgICBmb3IgKDs7IGhhc01lbWJlcnMgfHwgKGhhc01lbWJlcnMgPSB0cnVlKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbGV4KCk7XG4gICAgICAgICAgICAgICAgLy8gQSBjbG9zaW5nIGN1cmx5IGJyYWNlIG1hcmtzIHRoZSBlbmQgb2YgdGhlIG9iamVjdCBsaXRlcmFsLlxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIn1cIikge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBvYmplY3QgbGl0ZXJhbCBjb250YWlucyBtZW1iZXJzLCB0aGUgY3VycmVudCB0b2tlblxuICAgICAgICAgICAgICAgIC8vIHNob3VsZCBiZSBhIGNvbW1hIHNlcGFyYXRvci5cbiAgICAgICAgICAgICAgICBpZiAoaGFzTWVtYmVycykge1xuICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiLFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gbGV4KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIn1cIikge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFVuZXhwZWN0ZWQgdHJhaWxpbmcgYCxgIGluIG9iamVjdCBsaXRlcmFsLlxuICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEEgYCxgIG11c3Qgc2VwYXJhdGUgZWFjaCBvYmplY3QgbWVtYmVyLlxuICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBMZWFkaW5nIGNvbW1hcyBhcmUgbm90IHBlcm1pdHRlZCwgb2JqZWN0IHByb3BlcnR5IG5hbWVzIG11c3QgYmVcbiAgICAgICAgICAgICAgICAvLyBkb3VibGUtcXVvdGVkIHN0cmluZ3MsIGFuZCBhIGA6YCBtdXN0IHNlcGFyYXRlIGVhY2ggcHJvcGVydHlcbiAgICAgICAgICAgICAgICAvLyBuYW1lIGFuZCB2YWx1ZS5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCIsXCIgfHwgdHlwZW9mIHZhbHVlICE9IFwic3RyaW5nXCIgfHwgKGNoYXJJbmRleEJ1Z2d5ID8gdmFsdWUuY2hhckF0KDApIDogdmFsdWVbMF0pICE9IFwiQFwiIHx8IGxleCgpICE9IFwiOlwiKSB7XG4gICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHRzW3ZhbHVlLnNsaWNlKDEpXSA9IGdldChsZXgoKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBVbmV4cGVjdGVkIHRva2VuIGVuY291bnRlcmVkLlxuICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEludGVybmFsOiBVcGRhdGVzIGEgdHJhdmVyc2VkIG9iamVjdCBtZW1iZXIuXG4gICAgICAgIHZhciB1cGRhdGUgPSBmdW5jdGlvbiAoc291cmNlLCBwcm9wZXJ0eSwgY2FsbGJhY2spIHtcbiAgICAgICAgICB2YXIgZWxlbWVudCA9IHdhbGsoc291cmNlLCBwcm9wZXJ0eSwgY2FsbGJhY2spO1xuICAgICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZikge1xuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZVtwcm9wZXJ0eV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNvdXJjZVtwcm9wZXJ0eV0gPSBlbGVtZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBJbnRlcm5hbDogUmVjdXJzaXZlbHkgdHJhdmVyc2VzIGEgcGFyc2VkIEpTT04gb2JqZWN0LCBpbnZva2luZyB0aGVcbiAgICAgICAgLy8gYGNhbGxiYWNrYCBmdW5jdGlvbiBmb3IgZWFjaCB2YWx1ZS4gVGhpcyBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbiAgICAgICAgLy8gYFdhbGsoaG9sZGVyLCBuYW1lKWAgb3BlcmF0aW9uIGRlZmluZWQgaW4gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMi5cbiAgICAgICAgdmFyIHdhbGsgPSBmdW5jdGlvbiAoc291cmNlLCBwcm9wZXJ0eSwgY2FsbGJhY2spIHtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBzb3VyY2VbcHJvcGVydHldLCBsZW5ndGg7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBgZm9yRWFjaGAgY2FuJ3QgYmUgdXNlZCB0byB0cmF2ZXJzZSBhbiBhcnJheSBpbiBPcGVyYSA8PSA4LjU0XG4gICAgICAgICAgICAvLyBiZWNhdXNlIGl0cyBgT2JqZWN0I2hhc093blByb3BlcnR5YCBpbXBsZW1lbnRhdGlvbiByZXR1cm5zIGBmYWxzZWBcbiAgICAgICAgICAgIC8vIGZvciBhcnJheSBpbmRpY2VzIChlLmcuLCBgIVsxLCAyLCAzXS5oYXNPd25Qcm9wZXJ0eShcIjBcIilgKS5cbiAgICAgICAgICAgIGlmIChnZXRDbGFzcy5jYWxsKHZhbHVlKSA9PSBhcnJheUNsYXNzKSB7XG4gICAgICAgICAgICAgIGZvciAobGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBsZW5ndGgtLTspIHtcbiAgICAgICAgICAgICAgICB1cGRhdGUodmFsdWUsIGxlbmd0aCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGUodmFsdWUsIHByb3BlcnR5LCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2suY2FsbChzb3VyY2UsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gUHVibGljOiBgSlNPTi5wYXJzZWAuIFNlZSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4yLlxuICAgICAgICBleHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKHNvdXJjZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICB2YXIgcmVzdWx0LCB2YWx1ZTtcbiAgICAgICAgICBJbmRleCA9IDA7XG4gICAgICAgICAgU291cmNlID0gXCJcIiArIHNvdXJjZTtcbiAgICAgICAgICByZXN1bHQgPSBnZXQobGV4KCkpO1xuICAgICAgICAgIC8vIElmIGEgSlNPTiBzdHJpbmcgY29udGFpbnMgbXVsdGlwbGUgdG9rZW5zLCBpdCBpcyBpbnZhbGlkLlxuICAgICAgICAgIGlmIChsZXgoKSAhPSBcIiRcIikge1xuICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gUmVzZXQgdGhlIHBhcnNlciBzdGF0ZS5cbiAgICAgICAgICBJbmRleCA9IFNvdXJjZSA9IG51bGw7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrICYmIGdldENsYXNzLmNhbGwoY2FsbGJhY2spID09IGZ1bmN0aW9uQ2xhc3MgPyB3YWxrKCh2YWx1ZSA9IHt9LCB2YWx1ZVtcIlwiXSA9IHJlc3VsdCwgdmFsdWUpLCBcIlwiLCBjYWxsYmFjaykgOiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0c1tcInJ1bkluQ29udGV4dFwiXSA9IHJ1bkluQ29udGV4dDtcbiAgICByZXR1cm4gZXhwb3J0cztcbiAgfVxuXG4gIGlmIChmcmVlRXhwb3J0cyAmJiAhaXNMb2FkZXIpIHtcbiAgICAvLyBFeHBvcnQgZm9yIENvbW1vbkpTIGVudmlyb25tZW50cy5cbiAgICBydW5JbkNvbnRleHQocm9vdCwgZnJlZUV4cG9ydHMpO1xuICB9IGVsc2Uge1xuICAgIC8vIEV4cG9ydCBmb3Igd2ViIGJyb3dzZXJzIGFuZCBKYXZhU2NyaXB0IGVuZ2luZXMuXG4gICAgdmFyIG5hdGl2ZUpTT04gPSByb290LkpTT04sXG4gICAgICAgIHByZXZpb3VzSlNPTiA9IHJvb3RbXCJKU09OM1wiXSxcbiAgICAgICAgaXNSZXN0b3JlZCA9IGZhbHNlO1xuXG4gICAgdmFyIEpTT04zID0gcnVuSW5Db250ZXh0KHJvb3QsIChyb290W1wiSlNPTjNcIl0gPSB7XG4gICAgICAvLyBQdWJsaWM6IFJlc3RvcmVzIHRoZSBvcmlnaW5hbCB2YWx1ZSBvZiB0aGUgZ2xvYmFsIGBKU09OYCBvYmplY3QgYW5kXG4gICAgICAvLyByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBgSlNPTjNgIG9iamVjdC5cbiAgICAgIFwibm9Db25mbGljdFwiOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghaXNSZXN0b3JlZCkge1xuICAgICAgICAgIGlzUmVzdG9yZWQgPSB0cnVlO1xuICAgICAgICAgIHJvb3QuSlNPTiA9IG5hdGl2ZUpTT047XG4gICAgICAgICAgcm9vdFtcIkpTT04zXCJdID0gcHJldmlvdXNKU09OO1xuICAgICAgICAgIG5hdGl2ZUpTT04gPSBwcmV2aW91c0pTT04gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBKU09OMztcbiAgICAgIH1cbiAgICB9KSk7XG5cbiAgICByb290LkpTT04gPSB7XG4gICAgICBcInBhcnNlXCI6IEpTT04zLnBhcnNlLFxuICAgICAgXCJzdHJpbmdpZnlcIjogSlNPTjMuc3RyaW5naWZ5XG4gICAgfTtcbiAgfVxuXG4gIC8vIEV4cG9ydCBmb3IgYXN5bmNocm9ub3VzIG1vZHVsZSBsb2FkZXJzLlxuICBpZiAoaXNMb2FkZXIpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIEpTT04zO1xuICAgIH0pO1xuICB9XG59KS5jYWxsKHRoaXMpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvanNvbjMvbGliL2pzb24zLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGB1cmxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uKHVybCl7XG4gIHZhciBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICBhLmhyZWYgPSB1cmw7XG4gIHJldHVybiB7XG4gICAgaHJlZjogYS5ocmVmLFxuICAgIGhvc3Q6IGEuaG9zdCB8fCBsb2NhdGlvbi5ob3N0LFxuICAgIHBvcnQ6ICgnMCcgPT09IGEucG9ydCB8fCAnJyA9PT0gYS5wb3J0KSA/IHBvcnQoYS5wcm90b2NvbCkgOiBhLnBvcnQsXG4gICAgaGFzaDogYS5oYXNoLFxuICAgIGhvc3RuYW1lOiBhLmhvc3RuYW1lIHx8IGxvY2F0aW9uLmhvc3RuYW1lLFxuICAgIHBhdGhuYW1lOiBhLnBhdGhuYW1lLmNoYXJBdCgwKSAhPSAnLycgPyAnLycgKyBhLnBhdGhuYW1lIDogYS5wYXRobmFtZSxcbiAgICBwcm90b2NvbDogIWEucHJvdG9jb2wgfHwgJzonID09IGEucHJvdG9jb2wgPyBsb2NhdGlvbi5wcm90b2NvbCA6IGEucHJvdG9jb2wsXG4gICAgc2VhcmNoOiBhLnNlYXJjaCxcbiAgICBxdWVyeTogYS5zZWFyY2guc2xpY2UoMSlcbiAgfTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYHVybGAgaXMgYWJzb2x1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5pc0Fic29sdXRlID0gZnVuY3Rpb24odXJsKXtcbiAgcmV0dXJuIDAgPT0gdXJsLmluZGV4T2YoJy8vJykgfHwgISF+dXJsLmluZGV4T2YoJzovLycpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBgdXJsYCBpcyByZWxhdGl2ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmlzUmVsYXRpdmUgPSBmdW5jdGlvbih1cmwpe1xuICByZXR1cm4gIWV4cG9ydHMuaXNBYnNvbHV0ZSh1cmwpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBgdXJsYCBpcyBjcm9zcyBkb21haW4uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5pc0Nyb3NzRG9tYWluID0gZnVuY3Rpb24odXJsKXtcbiAgdXJsID0gZXhwb3J0cy5wYXJzZSh1cmwpO1xuICB2YXIgbG9jYXRpb24gPSBleHBvcnRzLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgcmV0dXJuIHVybC5ob3N0bmFtZSAhPT0gbG9jYXRpb24uaG9zdG5hbWVcbiAgICB8fCB1cmwucG9ydCAhPT0gbG9jYXRpb24ucG9ydFxuICAgIHx8IHVybC5wcm90b2NvbCAhPT0gbG9jYXRpb24ucHJvdG9jb2w7XG59O1xuXG4vKipcbiAqIFJldHVybiBkZWZhdWx0IHBvcnQgZm9yIGBwcm90b2NvbGAuXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSBwcm90b2NvbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHBvcnQgKHByb3RvY29sKXtcbiAgc3dpdGNoIChwcm90b2NvbCkge1xuICAgIGNhc2UgJ2h0dHA6JzpcbiAgICAgIHJldHVybiA4MDtcbiAgICBjYXNlICdodHRwczonOlxuICAgICAgcmV0dXJuIDQ0MztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGxvY2F0aW9uLnBvcnQ7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC11cmwvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgc3RyQ2hhckF0ID0gU3RyaW5nLnByb3RvdHlwZS5jaGFyQXQ7XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGNoYXJhY3RlciBhdCBhIGdpdmVuIGluZGV4LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICogQHJldHVybiB7c3RyaW5nfHVuZGVmaW5lZH1cbiAqL1xuLy8gVE9ETzogTW92ZSB0byBhIGxpYnJhcnlcbnZhciBjaGFyQXQgPSBmdW5jdGlvbihzdHIsIGluZGV4KSB7XG4gIHJldHVybiBzdHJDaGFyQXQuY2FsbChzdHIsIGluZGV4KTtcbn07XG5cbi8qKlxuICogaGFzT3duUHJvcGVydHksIHdyYXBwZWQgYXMgYSBmdW5jdGlvbi5cbiAqXG4gKiBAbmFtZSBoYXNcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHsqfSBjb250ZXh0XG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IHByb3BcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cblxuLy8gVE9ETzogTW92ZSB0byBhIGxpYnJhcnlcbnZhciBoYXMgPSBmdW5jdGlvbiBoYXMoY29udGV4dCwgcHJvcCkge1xuICByZXR1cm4gaG9wLmNhbGwoY29udGV4dCwgcHJvcCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBhIHZhbHVlIGlzIGEgc3RyaW5nLCBvdGhlcndpc2UgZmFsc2UuXG4gKlxuICogQG5hbWUgaXNTdHJpbmdcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cblxuLy8gVE9ETzogTW92ZSB0byBhIGxpYnJhcnlcbnZhciBpc1N0cmluZyA9IGZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdG9TdHIuY2FsbCh2YWwpID09PSAnW29iamVjdCBTdHJpbmddJztcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGEgdmFsdWUgaXMgYXJyYXktbGlrZSwgb3RoZXJ3aXNlIGZhbHNlLiBBcnJheS1saWtlIG1lYW5zIGFcbiAqIHZhbHVlIGlzIG5vdCBudWxsLCB1bmRlZmluZWQsIG9yIGEgZnVuY3Rpb24sIGFuZCBoYXMgYSBudW1lcmljIGBsZW5ndGhgXG4gKiBwcm9wZXJ0eS5cbiAqXG4gKiBAbmFtZSBpc0FycmF5TGlrZVxuICogQGFwaSBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuLy8gVE9ETzogTW92ZSB0byBhIGxpYnJhcnlcbnZhciBpc0FycmF5TGlrZSA9IGZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgKHR5cGVvZiB2YWwgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbC5sZW5ndGggPT09ICdudW1iZXInKTtcbn07XG5cblxuLyoqXG4gKiBpbmRleEtleXNcbiAqXG4gKiBAbmFtZSBpbmRleEtleXNcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHt9IHRhcmdldFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZFxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cbnZhciBpbmRleEtleXMgPSBmdW5jdGlvbiBpbmRleEtleXModGFyZ2V0LCBwcmVkKSB7XG4gIHByZWQgPSBwcmVkIHx8IGhhcztcblxuICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0YXJnZXQubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICBpZiAocHJlZCh0YXJnZXQsIGkpKSB7XG4gICAgICByZXN1bHRzLnB1c2goU3RyaW5nKGkpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0cztcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiBhbiBvYmplY3QncyBvd25lZCBrZXlzLlxuICpcbiAqIEBuYW1lIG9iamVjdEtleXNcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB0YXJnZXRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgUHJlZGljYXRlIGZ1bmN0aW9uIHVzZWQgdG8gaW5jbHVkZS9leGNsdWRlIHZhbHVlcyBmcm9tXG4gKiB0aGUgcmVzdWx0aW5nIGFycmF5LlxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cbnZhciBvYmplY3RLZXlzID0gZnVuY3Rpb24gb2JqZWN0S2V5cyh0YXJnZXQsIHByZWQpIHtcbiAgcHJlZCA9IHByZWQgfHwgaGFzO1xuXG4gIHZhciByZXN1bHRzID0gW107XG5cbiAgZm9yICh2YXIga2V5IGluIHRhcmdldCkge1xuICAgIGlmIChwcmVkKHRhcmdldCwga2V5KSkge1xuICAgICAgcmVzdWx0cy5wdXNoKFN0cmluZyhrZXkpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0cztcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjb21wb3NlZCBvZiBhbGwga2V5cyBvbiB0aGUgaW5wdXQgb2JqZWN0LiBJZ25vcmVzIGFueSBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICogTW9yZSBwZXJtaXNzaXZlIHRoYW4gdGhlIG5hdGl2ZSBgT2JqZWN0LmtleXNgIGZ1bmN0aW9uIChub24tb2JqZWN0cyB3aWxsIG5vdCB0aHJvdyBlcnJvcnMpLlxuICpcbiAqIEBuYW1lIGtleXNcbiAqIEBhcGkgcHVibGljXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSB2YWx1ZSB0byByZXRyaWV2ZSBrZXlzIGZyb20uXG4gKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGlucHV0IGBzb3VyY2VgJ3Mga2V5cy5cbiAqIEBleGFtcGxlXG4gKiBrZXlzKHsgbGlrZXM6ICdhdm9jYWRvJywgaGF0ZXM6ICdwaW5lYXBwbGUnIH0pO1xuICogLy89PiBbJ2xpa2VzJywgJ3BpbmVhcHBsZSddO1xuICpcbiAqIC8vIElnbm9yZXMgbm9uLWVudW1lcmFibGUgcHJvcGVydGllc1xuICogdmFyIGhhc0hpZGRlbktleSA9IHsgbmFtZTogJ1RpbScgfTtcbiAqIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShoYXNIaWRkZW5LZXksICdoaWRkZW4nLCB7XG4gKiAgIHZhbHVlOiAnaSBhbSBub3QgZW51bWVyYWJsZSEnLFxuICogICBlbnVtZXJhYmxlOiBmYWxzZVxuICogfSlcbiAqIGtleXMoaGFzSGlkZGVuS2V5KTtcbiAqIC8vPT4gWyduYW1lJ107XG4gKlxuICogLy8gV29ya3Mgb24gYXJyYXlzXG4gKiBrZXlzKFsnYScsICdiJywgJ2MnXSk7XG4gKiAvLz0+IFsnMCcsICcxJywgJzInXVxuICpcbiAqIC8vIFNraXBzIHVucG9wdWxhdGVkIGluZGljZXMgaW4gc3BhcnNlIGFycmF5c1xuICogdmFyIGFyciA9IFsxXTtcbiAqIGFycls0XSA9IDQ7XG4gKiBrZXlzKGFycik7XG4gKiAvLz0+IFsnMCcsICc0J11cbiAqL1xudmFyIGtleXMgPSBmdW5jdGlvbiBrZXlzKHNvdXJjZSkge1xuICBpZiAoc291cmNlID09IG51bGwpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvLyBJRTYtOCBjb21wYXRpYmlsaXR5IChzdHJpbmcpXG4gIGlmIChpc1N0cmluZyhzb3VyY2UpKSB7XG4gICAgcmV0dXJuIGluZGV4S2V5cyhzb3VyY2UsIGNoYXJBdCk7XG4gIH1cblxuICAvLyBJRTYtOCBjb21wYXRpYmlsaXR5IChhcmd1bWVudHMpXG4gIGlmIChpc0FycmF5TGlrZShzb3VyY2UpKSB7XG4gICAgcmV0dXJuIGluZGV4S2V5cyhzb3VyY2UsIGhhcyk7XG4gIH1cblxuICByZXR1cm4gb2JqZWN0S2V5cyhzb3VyY2UpO1xufTtcblxuLypcbiAqIEV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQG5kaG91bGUva2V5cy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgY2xvbmUgPSByZXF1aXJlKCdAbmRob3VsZS9jbG9uZScpO1xudmFyIGNvb2tpZSA9IHJlcXVpcmUoJy4vY29va2llJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdhbmFseXRpY3M6ZW50aXR5Jyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCdAbmRob3VsZS9kZWZhdWx0cycpO1xudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ0BuZGhvdWxlL2V4dGVuZCcpO1xudmFyIG1lbW9yeSA9IHJlcXVpcmUoJy4vbWVtb3J5Jyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuL3N0b3JlJyk7XG52YXIgaXNvZGF0ZVRyYXZlcnNlID0gcmVxdWlyZSgnQHNlZ21lbnQvaXNvZGF0ZS10cmF2ZXJzZScpO1xuXG4vKipcbiAqIEV4cG9zZSBgRW50aXR5YFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gRW50aXR5O1xuXG5cbi8qKlxuICogSW5pdGlhbGl6ZSBuZXcgYEVudGl0eWAgd2l0aCBgb3B0aW9uc2AuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuXG5mdW5jdGlvbiBFbnRpdHkob3B0aW9ucykge1xuICB0aGlzLm9wdGlvbnMob3B0aW9ucyk7XG4gIHRoaXMuaW5pdGlhbGl6ZSgpO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemUgcGlja3MgdGhlIHN0b3JhZ2UuXG4gKlxuICogQ2hlY2tzIHRvIHNlZSBpZiBjb29raWVzIGNhbiBiZSBzZXRcbiAqIG90aGVyd2lzZSBmYWxsc2JhY2sgdG8gbG9jYWxTdG9yYWdlLlxuICovXG5cbkVudGl0eS5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICBjb29raWUuc2V0KCdhanM6Y29va2llcycsIHRydWUpO1xuXG4gIC8vIGNvb2tpZXMgYXJlIGVuYWJsZWQuXG4gIGlmIChjb29raWUuZ2V0KCdhanM6Y29va2llcycpKSB7XG4gICAgY29va2llLnJlbW92ZSgnYWpzOmNvb2tpZXMnKTtcbiAgICB0aGlzLl9zdG9yYWdlID0gY29va2llO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIGxvY2FsU3RvcmFnZSBpcyBlbmFibGVkLlxuICBpZiAoc3RvcmUuZW5hYmxlZCkge1xuICAgIHRoaXMuX3N0b3JhZ2UgPSBzdG9yZTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBmYWxsYmFjayB0byBtZW1vcnkgc3RvcmFnZS5cbiAgZGVidWcoJ3dhcm5pbmcgdXNpbmcgbWVtb3J5IHN0b3JlIGJvdGggY29va2llcyBhbmQgbG9jYWxTdG9yYWdlIGFyZSBkaXNhYmxlZCcpO1xuICB0aGlzLl9zdG9yYWdlID0gbWVtb3J5O1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIHN0b3JhZ2UuXG4gKi9cblxuRW50aXR5LnByb3RvdHlwZS5zdG9yYWdlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9zdG9yYWdlO1xufTtcblxuXG4vKipcbiAqIEdldCBvciBzZXQgc3RvcmFnZSBgb3B0aW9uc2AuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqICAgQHByb3BlcnR5IHtPYmplY3R9IGNvb2tpZVxuICogICBAcHJvcGVydHkge09iamVjdH0gbG9jYWxTdG9yYWdlXG4gKiAgIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcGVyc2lzdCAoZGVmYXVsdDogYHRydWVgKVxuICovXG5cbkVudGl0eS5wcm90b3R5cGUub3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICB0aGlzLl9vcHRpb25zID0gZGVmYXVsdHMob3B0aW9ucyB8fCB7fSwgdGhpcy5kZWZhdWx0cyB8fCB7fSk7XG59O1xuXG5cbi8qKlxuICogR2V0IG9yIHNldCB0aGUgZW50aXR5J3MgYGlkYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAqL1xuXG5FbnRpdHkucHJvdG90eXBlLmlkID0gZnVuY3Rpb24oaWQpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gIGNhc2UgMDogcmV0dXJuIHRoaXMuX2dldElkKCk7XG4gIGNhc2UgMTogcmV0dXJuIHRoaXMuX3NldElkKGlkKTtcbiAgZGVmYXVsdDpcbiAgICAgIC8vIE5vIGRlZmF1bHQgY2FzZVxuICB9XG59O1xuXG5cbi8qKlxuICogR2V0IHRoZSBlbnRpdHkncyBpZC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuRW50aXR5LnByb3RvdHlwZS5fZ2V0SWQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJldCA9IHRoaXMuX29wdGlvbnMucGVyc2lzdFxuICAgID8gdGhpcy5zdG9yYWdlKCkuZ2V0KHRoaXMuX29wdGlvbnMuY29va2llLmtleSlcbiAgICA6IHRoaXMuX2lkO1xuICByZXR1cm4gcmV0ID09PSB1bmRlZmluZWQgPyBudWxsIDogcmV0O1xufTtcblxuXG4vKipcbiAqIFNldCB0aGUgZW50aXR5J3MgYGlkYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAqL1xuXG5FbnRpdHkucHJvdG90eXBlLl9zZXRJZCA9IGZ1bmN0aW9uKGlkKSB7XG4gIGlmICh0aGlzLl9vcHRpb25zLnBlcnNpc3QpIHtcbiAgICB0aGlzLnN0b3JhZ2UoKS5zZXQodGhpcy5fb3B0aW9ucy5jb29raWUua2V5LCBpZCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5faWQgPSBpZDtcbiAgfVxufTtcblxuXG4vKipcbiAqIEdldCBvciBzZXQgdGhlIGVudGl0eSdzIGB0cmFpdHNgLlxuICpcbiAqIEJBQ0tXQVJEUyBDT01QQVRJQklMSVRZOiBhbGlhc2VkIHRvIGBwcm9wZXJ0aWVzYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0cmFpdHNcbiAqL1xuXG5FbnRpdHkucHJvdG90eXBlLnByb3BlcnRpZXMgPSBFbnRpdHkucHJvdG90eXBlLnRyYWl0cyA9IGZ1bmN0aW9uKHRyYWl0cykge1xuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgY2FzZSAwOiByZXR1cm4gdGhpcy5fZ2V0VHJhaXRzKCk7XG4gIGNhc2UgMTogcmV0dXJuIHRoaXMuX3NldFRyYWl0cyh0cmFpdHMpO1xuICBkZWZhdWx0OlxuICAgICAgLy8gTm8gZGVmYXVsdCBjYXNlXG4gIH1cbn07XG5cblxuLyoqXG4gKiBHZXQgdGhlIGVudGl0eSdzIHRyYWl0cy4gQWx3YXlzIGNvbnZlcnQgSVNPIGRhdGUgc3RyaW5ncyBpbnRvIHJlYWwgZGF0ZXMsXG4gKiBzaW5jZSB0aGV5IGFyZW4ndCBwYXJzZWQgYmFjayBmcm9tIGxvY2FsIHN0b3JhZ2UuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cbkVudGl0eS5wcm90b3R5cGUuX2dldFRyYWl0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmV0ID0gdGhpcy5fb3B0aW9ucy5wZXJzaXN0ID8gc3RvcmUuZ2V0KHRoaXMuX29wdGlvbnMubG9jYWxTdG9yYWdlLmtleSkgOiB0aGlzLl90cmFpdHM7XG4gIHJldHVybiByZXQgPyBpc29kYXRlVHJhdmVyc2UoY2xvbmUocmV0KSkgOiB7fTtcbn07XG5cblxuLyoqXG4gKiBTZXQgdGhlIGVudGl0eSdzIGB0cmFpdHNgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0cmFpdHNcbiAqL1xuXG5FbnRpdHkucHJvdG90eXBlLl9zZXRUcmFpdHMgPSBmdW5jdGlvbih0cmFpdHMpIHtcbiAgdHJhaXRzID0gdHJhaXRzIHx8IHt9O1xuICBpZiAodGhpcy5fb3B0aW9ucy5wZXJzaXN0KSB7XG4gICAgc3RvcmUuc2V0KHRoaXMuX29wdGlvbnMubG9jYWxTdG9yYWdlLmtleSwgdHJhaXRzKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl90cmFpdHMgPSB0cmFpdHM7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBJZGVudGlmeSB0aGUgZW50aXR5IHdpdGggYW4gYGlkYCBhbmQgYHRyYWl0c2AuIElmIHdlIGl0J3MgdGhlIHNhbWUgZW50aXR5LFxuICogZXh0ZW5kIHRoZSBleGlzdGluZyBgdHJhaXRzYCBpbnN0ZWFkIG9mIG92ZXJ3cml0aW5nLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICogQHBhcmFtIHtPYmplY3R9IHRyYWl0c1xuICovXG5cbkVudGl0eS5wcm90b3R5cGUuaWRlbnRpZnkgPSBmdW5jdGlvbihpZCwgdHJhaXRzKSB7XG4gIHRyYWl0cyA9IHRyYWl0cyB8fCB7fTtcbiAgdmFyIGN1cnJlbnQgPSB0aGlzLmlkKCk7XG4gIGlmIChjdXJyZW50ID09PSBudWxsIHx8IGN1cnJlbnQgPT09IGlkKSB0cmFpdHMgPSBleHRlbmQodGhpcy50cmFpdHMoKSwgdHJhaXRzKTtcbiAgaWYgKGlkKSB0aGlzLmlkKGlkKTtcbiAgdGhpcy5kZWJ1ZygnaWRlbnRpZnkgJW8sICVvJywgaWQsIHRyYWl0cyk7XG4gIHRoaXMudHJhaXRzKHRyYWl0cyk7XG4gIHRoaXMuc2F2ZSgpO1xufTtcblxuXG4vKipcbiAqIFNhdmUgdGhlIGVudGl0eSB0byBsb2NhbCBzdG9yYWdlIGFuZCB0aGUgY29va2llLlxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuRW50aXR5LnByb3RvdHlwZS5zYXZlID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5fb3B0aW9ucy5wZXJzaXN0KSByZXR1cm4gZmFsc2U7XG4gIGNvb2tpZS5zZXQodGhpcy5fb3B0aW9ucy5jb29raWUua2V5LCB0aGlzLmlkKCkpO1xuICBzdG9yZS5zZXQodGhpcy5fb3B0aW9ucy5sb2NhbFN0b3JhZ2Uua2V5LCB0aGlzLnRyYWl0cygpKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cbi8qKlxuICogTG9nIHRoZSBlbnRpdHkgb3V0LCByZXNldGluZyBgaWRgIGFuZCBgdHJhaXRzYCB0byBkZWZhdWx0cy5cbiAqL1xuXG5FbnRpdHkucHJvdG90eXBlLmxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmlkKG51bGwpO1xuICB0aGlzLnRyYWl0cyh7fSk7XG4gIGNvb2tpZS5yZW1vdmUodGhpcy5fb3B0aW9ucy5jb29raWUua2V5KTtcbiAgc3RvcmUucmVtb3ZlKHRoaXMuX29wdGlvbnMubG9jYWxTdG9yYWdlLmtleSk7XG59O1xuXG5cbi8qKlxuICogUmVzZXQgYWxsIGVudGl0eSBzdGF0ZSwgbG9nZ2luZyBvdXQgYW5kIHJldHVybmluZyBvcHRpb25zIHRvIGRlZmF1bHRzLlxuICovXG5cbkVudGl0eS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5sb2dvdXQoKTtcbiAgdGhpcy5vcHRpb25zKHt9KTtcbn07XG5cblxuLyoqXG4gKiBMb2FkIHNhdmVkIGVudGl0eSBgaWRgIG9yIGB0cmFpdHNgIGZyb20gc3RvcmFnZS5cbiAqL1xuXG5FbnRpdHkucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5pZChjb29raWUuZ2V0KHRoaXMuX29wdGlvbnMuY29va2llLmtleSkpO1xuICB0aGlzLnRyYWl0cyhzdG9yZS5nZXQodGhpcy5fb3B0aW9ucy5sb2NhbFN0b3JhZ2Uua2V5KSk7XG59O1xuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9hbmFseXRpY3MuanMtY29yZS9saWIvZW50aXR5LmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENvcHkgdGhlIHByb3BlcnRpZXMgb2Ygb25lIG9yIG1vcmUgYG9iamVjdHNgIG9udG8gYSBkZXN0aW5hdGlvbiBvYmplY3QuIElucHV0IG9iamVjdHMgYXJlIGl0ZXJhdGVkIG92ZXJcbiAqIGluIGxlZnQtdG8tcmlnaHQgb3JkZXIsIHNvIGR1cGxpY2F0ZSBwcm9wZXJ0aWVzIG9uIGxhdGVyIG9iamVjdHMgd2lsbCBvdmVyd3JpdGUgdGhvc2UgZnJvbVxuICogZXJldmlvdXMgb25lcy4gT25seSBlbnVtZXJhYmxlIGFuZCBvd24gcHJvcGVydGllcyBvZiB0aGUgaW5wdXQgb2JqZWN0cyBhcmUgY29waWVkIG9udG8gdGhlXG4gKiByZXN1bHRpbmcgb2JqZWN0LlxuICpcbiAqIEBuYW1lIGV4dGVuZFxuICogQGFwaSBwdWJsaWNcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gc291cmNlcyBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcmV0dXJuIHtPYmplY3R9IGBkZXN0YCwgZXh0ZW5kZWQgd2l0aCB0aGUgcHJvcGVydGllcyBvZiBhbGwgYHNvdXJjZXNgLlxuICogQGV4YW1wbGVcbiAqIHZhciBhID0geyBhOiAnYScgfTtcbiAqIHZhciBiID0geyBiOiAnYicgfTtcbiAqIHZhciBjID0geyBjOiAnYycgfTtcbiAqXG4gKiBleHRlbmQoYSwgYiwgYyk7XG4gKiAvLz0+IHsgYTogJ2EnLCBiOiAnYicsIGM6ICdjJyB9O1xuICovXG52YXIgZXh0ZW5kID0gZnVuY3Rpb24gZXh0ZW5kKGRlc3QgLyosIHNvdXJjZXMgKi8pIHtcbiAgdmFyIHNvdXJjZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2VzW2ldKSB7XG4gICAgICBpZiAoaGFzLmNhbGwoc291cmNlc1tpXSwga2V5KSkge1xuICAgICAgICBkZXN0W2tleV0gPSBzb3VyY2VzW2ldW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG4vKlxuICogRXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BuZGhvdWxlL2V4dGVuZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuICogTW9kdWxlIERlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgYmluZEFsbCA9IHJlcXVpcmUoJ2JpbmQtYWxsJyk7XG52YXIgY2xvbmUgPSByZXF1aXJlKCdAbmRob3VsZS9jbG9uZScpO1xuXG4vKipcbiAqIEhPUC5cbiAqL1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBFeHBvc2UgYE1lbW9yeWBcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmRBbGwobmV3IE1lbW9yeSgpKTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGBNZW1vcnlgIHN0b3JlXG4gKi9cblxuZnVuY3Rpb24gTWVtb3J5KCkge1xuICB0aGlzLnN0b3JlID0ge307XG59XG5cbi8qKlxuICogU2V0IGEgYGtleWAgYW5kIGB2YWx1ZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuTWVtb3J5LnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gIHRoaXMuc3RvcmVba2V5XSA9IGNsb25lKHZhbHVlKTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEdldCBhIGBrZXlgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqL1xuXG5NZW1vcnkucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGtleSkge1xuICBpZiAoIWhhcy5jYWxsKHRoaXMuc3RvcmUsIGtleSkpIHJldHVybjtcbiAgcmV0dXJuIGNsb25lKHRoaXMuc3RvcmVba2V5XSk7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhIGBrZXlgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuTWVtb3J5LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihrZXkpIHtcbiAgZGVsZXRlIHRoaXMuc3RvcmVba2V5XTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvYW5hbHl0aWNzLmpzLWNvcmUvbGliL21lbW9yeS5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgYmluZEFsbCA9IHJlcXVpcmUoJ2JpbmQtYWxsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCdAbmRob3VsZS9kZWZhdWx0cycpO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnQHNlZ21lbnQvc3RvcmUnKTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBTdG9yZWAgd2l0aCBgb3B0aW9uc2AuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuXG5mdW5jdGlvbiBTdG9yZShvcHRpb25zKSB7XG4gIHRoaXMub3B0aW9ucyhvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGBvcHRpb25zYCBmb3IgdGhlIHN0b3JlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiAgIEBmaWVsZCB7Qm9vbGVhbn0gZW5hYmxlZCAodHJ1ZSlcbiAqL1xuXG5TdG9yZS5wcm90b3R5cGUub3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB0aGlzLl9vcHRpb25zO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBkZWZhdWx0cyhvcHRpb25zLCB7IGVuYWJsZWQ6IHRydWUgfSk7XG5cbiAgdGhpcy5lbmFibGVkID0gb3B0aW9ucy5lbmFibGVkICYmIHN0b3JlLmVuYWJsZWQ7XG4gIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xufTtcblxuXG4vKipcbiAqIFNldCBhIGBrZXlgIGFuZCBgdmFsdWVgIGluIGxvY2FsIHN0b3JhZ2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gKi9cblxuU3RvcmUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgaWYgKCF0aGlzLmVuYWJsZWQpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHN0b3JlLnNldChrZXksIHZhbHVlKTtcbn07XG5cblxuLyoqXG4gKiBHZXQgYSB2YWx1ZSBmcm9tIGxvY2FsIHN0b3JhZ2UgYnkgYGtleWAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cblN0b3JlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihrZXkpIHtcbiAgaWYgKCF0aGlzLmVuYWJsZWQpIHJldHVybiBudWxsO1xuICByZXR1cm4gc3RvcmUuZ2V0KGtleSk7XG59O1xuXG5cbi8qKlxuICogUmVtb3ZlIGEgdmFsdWUgZnJvbSBsb2NhbCBzdG9yYWdlIGJ5IGBrZXlgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqL1xuXG5TdG9yZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oa2V5KSB7XG4gIGlmICghdGhpcy5lbmFibGVkKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBzdG9yZS5yZW1vdmUoa2V5KTtcbn07XG5cblxuLyoqXG4gKiBFeHBvc2UgdGhlIHN0b3JlIHNpbmdsZXRvbi5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmRBbGwobmV3IFN0b3JlKCkpO1xuXG5cbi8qKlxuICogRXhwb3NlIHRoZSBgU3RvcmVgIGNvbnN0cnVjdG9yLlxuICovXG5cbm1vZHVsZS5leHBvcnRzLlN0b3JlID0gU3RvcmU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9hbmFseXRpY3MuanMtY29yZS9saWIvc3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLypcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGVhY2ggPSByZXF1aXJlKCdAbmRob3VsZS9lYWNoJyk7XG5cbi8qKlxuICogUHJvZHVjZSBhIG5ldyBhcnJheSBieSBwYXNzaW5nIGVhY2ggdmFsdWUgaW4gdGhlIGlucHV0IGBjb2xsZWN0aW9uYCB0aHJvdWdoIGEgdHJhbnNmb3JtYXRpdmVcbiAqIGBpdGVyYXRvcmAgZnVuY3Rpb24uIFRoZSBgaXRlcmF0b3JgIGZ1bmN0aW9uIGlzIHBhc3NlZCB0aHJlZSBhcmd1bWVudHM6XG4gKiBgKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbilgLlxuICpcbiAqIEBuYW1lIG1hcFxuICogQGFwaSBwdWJsaWNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdG9yIFRoZSB0cmFuc2Zvcm1lciBmdW5jdGlvbiB0byBpbnZva2UgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7QXJyYXl9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGFycmF5IGNvbnRhaW5pbmcgdGhlIHJlc3VsdHMgb2YgZWFjaCBgaXRlcmF0b3JgIGludm9jYXRpb24uXG4gKiBAZXhhbXBsZVxuICogdmFyIHNxdWFyZSA9IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHggKiB4OyB9O1xuICpcbiAqIG1hcChzcXVhcmUsIFsxLCAyLCAzXSk7XG4gKiAvLz0+IFsxLCA0LCA5XVxuICovXG52YXIgbWFwID0gZnVuY3Rpb24gbWFwKGl0ZXJhdG9yLCBjb2xsZWN0aW9uKSB7XG4gIGlmICh0eXBlb2YgaXRlcmF0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIGZ1bmN0aW9uIGJ1dCByZWNlaXZlZCBhICcgKyB0eXBlb2YgaXRlcmF0b3IpO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gIGVhY2goZnVuY3Rpb24odmFsLCBpLCBjb2xsZWN0aW9uKSB7XG4gICAgcmVzdWx0LnB1c2goaXRlcmF0b3IodmFsLCBpLCBjb2xsZWN0aW9uKSk7XG4gIH0sIGNvbGxlY3Rpb24pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKlxuICogRXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BuZGhvdWxlL21hcC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBIZWxwZXJzLlxuICovXG5cbnZhciBzID0gMTAwMDtcbnZhciBtID0gcyAqIDYwO1xudmFyIGggPSBtICogNjA7XG52YXIgZCA9IGggKiAyNDtcbnZhciB5ID0gZCAqIDM2NS4yNTtcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHBhcnNlKHZhbCk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgaXNOYU4odmFsKSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb25nID8gZm10TG9uZyh2YWwpIDogZm10U2hvcnQodmFsKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3ZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgdmFsaWQgbnVtYmVyLiB2YWw9JyArXG4gICAgICBKU09OLnN0cmluZ2lmeSh2YWwpXG4gICk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChzdHIubGVuZ3RoID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtYXRjaCA9IC9eKCg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoXG4gICAgc3RyXG4gICk7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5O1xuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gbiAqIGQ7XG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoO1xuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWlucyc6XG4gICAgY2FzZSAnbWluJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbTtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY3MnOlxuICAgIGNhc2UgJ3NlYyc6XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gbiAqIHM7XG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10U2hvcnQobXMpIHtcbiAgaWYgKG1zID49IGQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICB9XG4gIGlmIChtcyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztcbiAgfVxuICBpZiAobXMgPj0gbSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gIH1cbiAgaWYgKG1zID49IHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICB9XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRMb25nKG1zKSB7XG4gIHJldHVybiBwbHVyYWwobXMsIGQsICdkYXknKSB8fFxuICAgIHBsdXJhbChtcywgaCwgJ2hvdXInKSB8fFxuICAgIHBsdXJhbChtcywgbSwgJ21pbnV0ZScpIHx8XG4gICAgcGx1cmFsKG1zLCBzLCAnc2Vjb25kJykgfHxcbiAgICBtcyArICcgbXMnO1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbiwgbmFtZSkge1xuICBpZiAobXMgPCBuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChtcyA8IG4gKiAxLjUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihtcyAvIG4pICsgJyAnICsgbmFtZTtcbiAgfVxuICByZXR1cm4gTWF0aC5jZWlsKG1zIC8gbikgKyAnICcgKyBuYW1lICsgJ3MnO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RoaXJkcGFydHlqcy90aGlyZHBhcnR5anMtY29kZS9ibG9iL21hc3Rlci9leGFtcGxlcy90ZW1wbGF0ZXMvMDIvbG9hZGluZy1maWxlcy9pbmRleC5odG1sXG5cbi8qKlxuICogSW52b2tlIGBmbihlcnIpYCB3aGVuIHRoZSBnaXZlbiBgZWxgIHNjcmlwdCBsb2Fkcy5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsLCBmbil7XG4gIHJldHVybiBlbC5hZGRFdmVudExpc3RlbmVyXG4gICAgPyBhZGQoZWwsIGZuKVxuICAgIDogYXR0YWNoKGVsLCBmbik7XG59O1xuXG4vKipcbiAqIEFkZCBldmVudCBsaXN0ZW5lciB0byBgZWxgLCBgZm4oKWAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGFkZChlbCwgZm4pe1xuICBlbC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oXywgZSl7IGZuKG51bGwsIGUpOyB9LCBmYWxzZSk7XG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24oZSl7XG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignc2NyaXB0IGVycm9yIFwiJyArIGVsLnNyYyArICdcIicpO1xuICAgIGVyci5ldmVudCA9IGU7XG4gICAgZm4oZXJyKTtcbiAgfSwgZmFsc2UpO1xufVxuXG4vKipcbiAqIEF0dGFjaCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gYXR0YWNoKGVsLCBmbil7XG4gIGVsLmF0dGFjaEV2ZW50KCdvbnJlYWR5c3RhdGVjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICBpZiAoIS9jb21wbGV0ZXxsb2FkZWQvLnRlc3QoZWwucmVhZHlTdGF0ZSkpIHJldHVybjtcbiAgICBmbihudWxsLCBlKTtcbiAgfSk7XG4gIGVsLmF0dGFjaEV2ZW50KCdvbmVycm9yJywgZnVuY3Rpb24oZSl7XG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignZmFpbGVkIHRvIGxvYWQgdGhlIHNjcmlwdCBcIicgKyBlbC5zcmMgKyAnXCInKTtcbiAgICBlcnIuZXZlbnQgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgICBmbihlcnIpO1xuICB9KTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NjcmlwdC1vbmxvYWQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5pbXBvcnQgeyBpbml0IH0gZnJvbSAnYW5hbHl0aWNzanMnO1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9hbmFseXRpY3MtY29uZmlnJ1xuXG5pbml0KGNvbmZpZyk7XG4qL1xuXG52YXIgYW5hbHl0aWNzID0gcmVxdWlyZSgnYW5hbHl0aWNzanMnKTtcbnZhciBhbmFseXRpY3NDb25maWcgPSByZXF1aXJlKCcuL2FuYWx5dGljcy1jb25maWcnKTtcblxuYW5hbHl0aWNzLmluaXQoYW5hbHl0aWNzQ29uZmlnLmNvbmZpZyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG52YXIgQW5hbHl0aWNzID0gcmVxdWlyZSgnLi9saWJyYXJ5L2FuYWx5dGljcycpO1xudmFyIEFuYWx5dGljc0FjdGlvbnMgPSByZXF1aXJlKCcuL2xpYnJhcnkvYW5hbHl0aWNzQWN0aW9ucycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbml0OiBmdW5jdGlvbihjb25mKSB7XG5cbiAgICAgICAgdmFyIGFuYWx5dGljcyA9IEFuYWx5dGljcy5jcmVhdGUoY29uZik7XG4gICAgICAgIHZhciBhbmFseXRpY3NBY3Rpb25zID0gQW5hbHl0aWNzQWN0aW9ucy5jcmVhdGVBY3Rpb25zKGFuYWx5dGljcylcblxuICAgICAgICBmdW5jdGlvbiBhcnJheVRvUHVzaEFuYWx5dGljcyhhcnIpIHtcbiAgICAgICAgICAgIHZhciBhcnJheUxlbmd0aCA9IGFyci5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgY3VycmVudEl0ZW0gPSBudWxsO1xuXG4gICAgICAgICAgICB3aGlsZShhcnJheUxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnRJdGVtID0gYXJyLnBvcCgpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBhbmFseXRpY3NBY3Rpb25zLmZvckVhY2goZnVuY3Rpb24oYWN0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoY3VycmVudEl0ZW0udHlwZSA9PSBhY3Rpb24udHlwZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24ucHVzaChjdXJyZW50SXRlbS5kYXRhKTsgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgYXJyYXlMZW5ndGggLS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuQW5hbHl0aWNzQXJyYXkgPSBmdW5jdGlvbihhcnIpIHtcbiAgICAgICAgICAgIHZhciBhcnJheSA9IGFyciB8fCBbXTtcbiAgICAgICAgICAgIGFycmF5LnB1c2ggPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgYXJyYXlUb1B1c2hBbmFseXRpY3ModGhpcyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgICAgIH07XG5cbiAgICAgICAgd2luZG93LmluaXRBbmFseXRpY3MgPSBmdW5jdGlvbihhcnIpIHtcbiAgICAgICAgICAgIGFycmF5VG9QdXNoQW5hbHl0aWNzKGFycilcbiAgICAgICAgfVxuICAgIH1cbn0gXG5cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYW5hbHl0aWNzanMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhbmFseXRpY3MgPSByZXF1aXJlKCdAc2VnbWVudC9hbmFseXRpY3MuanMtY29yZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIChpbnRlZ3JhdGlvbnMpIHtcbiAgICAgICAgdmFyIGluaXRpYWxpemVPYmogPSB7fTtcblxuICAgICAgICBpbnRlZ3JhdGlvbnMuZm9yRWFjaChmdW5jdGlvbihjb25maWcpe1xuICAgICAgICAgIGFuYWx5dGljcy51c2UoY29uZmlnLnBhY2thZ2UpO1xuICAgICAgICAgIGluaXRpYWxpemVPYmpbY29uZmlnLm5hbWVdID0gY29uZmlnLnNldHRpbmdzO1xuICAgICAgICB9KVxuXG4gICAgICAgIGFuYWx5dGljcy5pbml0aWFsaXplKGluaXRpYWxpemVPYmopO1xuXG4gICAgICAgIHJldHVybiBhbmFseXRpY3M7XG4gICAgfVxuXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hbmFseXRpY3Nqcy9saWJyYXJ5L2FuYWx5dGljcy5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEFuYWx5dGljcy5qc1xuICpcbiAqIChDKSAyMDEzLTIwMTYgU2VnbWVudC5pbyBJbmMuXG4gKi9cblxudmFyIEFuYWx5dGljcyA9IHJlcXVpcmUoJy4vYW5hbHl0aWNzJyk7XG5cbi8vIENyZWF0ZSBhIG5ldyBgYW5hbHl0aWNzYCBzaW5nbGV0b24uXG52YXIgYW5hbHl0aWNzID0gbmV3IEFuYWx5dGljcygpO1xuXG4vLyBFeHBvc2UgcGFja2FnZSB2ZXJzaW9uLlxuYW5hbHl0aWNzLlZFUlNJT04gPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKS52ZXJzaW9uO1xuXG4vKlxuICogRXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuYWx5dGljcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L2FuYWx5dGljcy5qcy1jb3JlL2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2FuYWx5dGljcyA9IGdsb2JhbC5hbmFseXRpY3M7XG5cbi8qXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBBbGlhcyA9IHJlcXVpcmUoJ3NlZ21lbnRpby1mYWNhZGUnKS5BbGlhcztcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBHcm91cCA9IHJlcXVpcmUoJ3NlZ21lbnRpby1mYWNhZGUnKS5Hcm91cDtcbnZhciBJZGVudGlmeSA9IHJlcXVpcmUoJ3NlZ21lbnRpby1mYWNhZGUnKS5JZGVudGlmeTtcbnZhciBQYWdlID0gcmVxdWlyZSgnc2VnbWVudGlvLWZhY2FkZScpLlBhZ2U7XG52YXIgVHJhY2sgPSByZXF1aXJlKCdzZWdtZW50aW8tZmFjYWRlJykuVHJhY2s7XG52YXIgYWZ0ZXIgPSByZXF1aXJlKCdAbmRob3VsZS9hZnRlcicpO1xudmFyIGJpbmRBbGwgPSByZXF1aXJlKCdiaW5kLWFsbCcpO1xudmFyIGNsb25lID0gcmVxdWlyZSgnQG5kaG91bGUvY2xvbmUnKTtcbnZhciBjb29raWUgPSByZXF1aXJlKCcuL2Nvb2tpZScpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJ0BuZGhvdWxlL2RlZmF1bHRzJyk7XG52YXIgZWFjaCA9IHJlcXVpcmUoJ0BuZGhvdWxlL2VhY2gnKTtcbnZhciBmb2xkbCA9IHJlcXVpcmUoJ0BuZGhvdWxlL2ZvbGRsJyk7XG52YXIgZ3JvdXAgPSByZXF1aXJlKCcuL2dyb3VwJyk7XG52YXIgaXMgPSByZXF1aXJlKCdpcycpO1xudmFyIGlzTWV0YSA9IHJlcXVpcmUoJ0BzZWdtZW50L2lzLW1ldGEnKTtcbnZhciBrZXlzID0gcmVxdWlyZSgnQG5kaG91bGUva2V5cycpO1xudmFyIG1lbW9yeSA9IHJlcXVpcmUoJy4vbWVtb3J5Jyk7XG52YXIgbmV4dFRpY2sgPSByZXF1aXJlKCduZXh0LXRpY2snKTtcbnZhciBub3JtYWxpemUgPSByZXF1aXJlKCcuL25vcm1hbGl6ZScpO1xudmFyIG9uID0gcmVxdWlyZSgnY29tcG9uZW50LWV2ZW50JykuYmluZDtcbnZhciBwYWdlRGVmYXVsdHMgPSByZXF1aXJlKCcuL3BhZ2VEZWZhdWx0cycpO1xudmFyIHBpY2sgPSByZXF1aXJlKCdAbmRob3VsZS9waWNrJyk7XG52YXIgcHJldmVudCA9IHJlcXVpcmUoJ0BzZWdtZW50L3ByZXZlbnQtZGVmYXVsdCcpO1xudmFyIHF1ZXJ5c3RyaW5nID0gcmVxdWlyZSgnY29tcG9uZW50LXF1ZXJ5c3RyaW5nJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuL3N0b3JlJyk7XG52YXIgdXNlciA9IHJlcXVpcmUoJy4vdXNlcicpO1xudmFyIHR5cGUgPSByZXF1aXJlKCdjb21wb25lbnQtdHlwZScpO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEFuYWx5dGljc2AgaW5zdGFuY2UuXG4gKi9cblxuZnVuY3Rpb24gQW5hbHl0aWNzKCkge1xuICB0aGlzLl9vcHRpb25zKHt9KTtcbiAgdGhpcy5JbnRlZ3JhdGlvbnMgPSB7fTtcbiAgdGhpcy5faW50ZWdyYXRpb25zID0ge307XG4gIHRoaXMuX3JlYWRpZWQgPSBmYWxzZTtcbiAgdGhpcy5fdGltZW91dCA9IDMwMDtcbiAgLy8gWFhYOiBCQUNLV0FSRFMgQ09NUEFUSUJJTElUWVxuICB0aGlzLl91c2VyID0gdXNlcjtcbiAgdGhpcy5sb2cgPSBkZWJ1ZygnYW5hbHl0aWNzLmpzJyk7XG4gIGJpbmRBbGwodGhpcyk7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLm9uKCdpbml0aWFsaXplJywgZnVuY3Rpb24oc2V0dGluZ3MsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5pbml0aWFsUGFnZXZpZXcpIHNlbGYucGFnZSgpO1xuICAgIHNlbGYuX3BhcnNlUXVlcnkod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gIH0pO1xufVxuXG4vKipcbiAqIE1peCBpbiBldmVudCBlbWl0dGVyLlxuICovXG5cbkVtaXR0ZXIoQW5hbHl0aWNzLnByb3RvdHlwZSk7XG5cbi8qKlxuICogVXNlIGEgYHBsdWdpbmAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGx1Z2luXG4gKiBAcmV0dXJuIHtBbmFseXRpY3N9XG4gKi9cblxuQW5hbHl0aWNzLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbihwbHVnaW4pIHtcbiAgcGx1Z2luKHRoaXMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGVmaW5lIGEgbmV3IGBJbnRlZ3JhdGlvbmAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gSW50ZWdyYXRpb25cbiAqIEByZXR1cm4ge0FuYWx5dGljc31cbiAqL1xuXG5BbmFseXRpY3MucHJvdG90eXBlLmFkZEludGVncmF0aW9uID0gZnVuY3Rpb24oSW50ZWdyYXRpb24pIHtcbiAgdmFyIG5hbWUgPSBJbnRlZ3JhdGlvbi5wcm90b3R5cGUubmFtZTtcbiAgaWYgKCFuYW1lKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdhdHRlbXB0ZWQgdG8gYWRkIGFuIGludmFsaWQgaW50ZWdyYXRpb24nKTtcbiAgdGhpcy5JbnRlZ3JhdGlvbnNbbmFtZV0gPSBJbnRlZ3JhdGlvbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemUgd2l0aCB0aGUgZ2l2ZW4gaW50ZWdyYXRpb24gYHNldHRpbmdzYCBhbmQgYG9wdGlvbnNgLlxuICpcbiAqIEFsaWFzZWQgdG8gYGluaXRgIGZvciBjb252ZW5pZW5jZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW3NldHRpbmdzPXt9XVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XVxuICogQHJldHVybiB7QW5hbHl0aWNzfVxuICovXG5cbkFuYWx5dGljcy5wcm90b3R5cGUuaW5pdCA9IEFuYWx5dGljcy5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKHNldHRpbmdzLCBvcHRpb25zKSB7XG4gIHNldHRpbmdzID0gc2V0dGluZ3MgfHwge307XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHRoaXMuX29wdGlvbnMob3B0aW9ucyk7XG4gIHRoaXMuX3JlYWRpZWQgPSBmYWxzZTtcblxuICAvLyBjbGVhbiB1bmtub3duIGludGVncmF0aW9ucyBmcm9tIHNldHRpbmdzXG4gIHZhciBzZWxmID0gdGhpcztcbiAgZWFjaChmdW5jdGlvbihvcHRzLCBuYW1lKSB7XG4gICAgdmFyIEludGVncmF0aW9uID0gc2VsZi5JbnRlZ3JhdGlvbnNbbmFtZV07XG4gICAgaWYgKCFJbnRlZ3JhdGlvbikgZGVsZXRlIHNldHRpbmdzW25hbWVdO1xuICB9LCBzZXR0aW5ncyk7XG5cbiAgLy8gYWRkIGludGVncmF0aW9uc1xuICBlYWNoKGZ1bmN0aW9uKG9wdHMsIG5hbWUpIHtcbiAgICB2YXIgSW50ZWdyYXRpb24gPSBzZWxmLkludGVncmF0aW9uc1tuYW1lXTtcbiAgICB2YXIgaW50ZWdyYXRpb24gPSBuZXcgSW50ZWdyYXRpb24oY2xvbmUob3B0cykpO1xuICAgIHNlbGYubG9nKCdpbml0aWFsaXplICVvIC0gJW8nLCBuYW1lLCBvcHRzKTtcbiAgICBzZWxmLmFkZChpbnRlZ3JhdGlvbik7XG4gIH0sIHNldHRpbmdzKTtcblxuICB2YXIgaW50ZWdyYXRpb25zID0gdGhpcy5faW50ZWdyYXRpb25zO1xuXG4gIC8vIGxvYWQgdXNlciBub3cgdGhhdCBvcHRpb25zIGFyZSBzZXRcbiAgdXNlci5sb2FkKCk7XG4gIGdyb3VwLmxvYWQoKTtcblxuICAvLyBtYWtlIHJlYWR5IGNhbGxiYWNrXG4gIHZhciBpbnRlZ3JhdGlvbkNvdW50ID0ga2V5cyhpbnRlZ3JhdGlvbnMpLmxlbmd0aDtcbiAgdmFyIHJlYWR5ID0gYWZ0ZXIoaW50ZWdyYXRpb25Db3VudCwgZnVuY3Rpb24oKSB7XG4gICAgc2VsZi5fcmVhZGllZCA9IHRydWU7XG4gICAgc2VsZi5lbWl0KCdyZWFkeScpO1xuICB9KTtcblxuICAvLyBpbml0IGlmIG5vIGludGVncmF0aW9uc1xuICBpZiAoaW50ZWdyYXRpb25Db3VudCA8PSAwKSB7XG4gICAgcmVhZHkoKTtcbiAgfVxuXG4gIC8vIGluaXRpYWxpemUgaW50ZWdyYXRpb25zLCBwYXNzaW5nIHJlYWR5XG4gIGVhY2goZnVuY3Rpb24oaW50ZWdyYXRpb24pIHtcbiAgICBpZiAob3B0aW9ucy5pbml0aWFsUGFnZXZpZXcgJiYgaW50ZWdyYXRpb24ub3B0aW9ucy5pbml0aWFsUGFnZXZpZXcgPT09IGZhbHNlKSB7XG4gICAgICBpbnRlZ3JhdGlvbi5wYWdlID0gYWZ0ZXIoMiwgaW50ZWdyYXRpb24ucGFnZSk7XG4gICAgfVxuXG4gICAgaW50ZWdyYXRpb24uYW5hbHl0aWNzID0gc2VsZjtcbiAgICBpbnRlZ3JhdGlvbi5vbmNlKCdyZWFkeScsIHJlYWR5KTtcbiAgICBpbnRlZ3JhdGlvbi5pbml0aWFsaXplKCk7XG4gIH0sIGludGVncmF0aW9ucyk7XG5cbiAgLy8gYmFja3dhcmRzIGNvbXBhdCB3aXRoIGFuZ3VsYXIgcGx1Z2luLlxuICAvLyBUT0RPOiByZW1vdmVcbiAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgdGhpcy5lbWl0KCdpbml0aWFsaXplJywgc2V0dGluZ3MsIG9wdGlvbnMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSB1c2VyJ3MgYGlkYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBpZFxuICovXG5cbkFuYWx5dGljcy5wcm90b3R5cGUuc2V0QW5vbnltb3VzSWQgPSBmdW5jdGlvbihpZCkge1xuICB0aGlzLnVzZXIoKS5hbm9ueW1vdXNJZChpZCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGQgYW4gaW50ZWdyYXRpb24uXG4gKlxuICogQHBhcmFtIHtJbnRlZ3JhdGlvbn0gaW50ZWdyYXRpb25cbiAqL1xuXG5BbmFseXRpY3MucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGludGVncmF0aW9uKSB7XG4gIHRoaXMuX2ludGVncmF0aW9uc1tpbnRlZ3JhdGlvbi5uYW1lXSA9IGludGVncmF0aW9uO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogSWRlbnRpZnkgYSB1c2VyIGJ5IG9wdGlvbmFsIGBpZGAgYW5kIGB0cmFpdHNgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbaWQ9dXNlci5pZCgpXSBVc2VyIElELlxuICogQHBhcmFtIHtPYmplY3R9IFt0cmFpdHM9bnVsbF0gVXNlciB0cmFpdHMuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9bnVsbF1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge0FuYWx5dGljc31cbiAqL1xuXG5BbmFseXRpY3MucHJvdG90eXBlLmlkZW50aWZ5ID0gZnVuY3Rpb24oaWQsIHRyYWl0cywgb3B0aW9ucywgZm4pIHtcbiAgLy8gQXJndW1lbnQgcmVzaHVmZmxpbmcuXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9ucywgbm8tc2VxdWVuY2VzICovXG4gIGlmIChpcy5mbihvcHRpb25zKSkgZm4gPSBvcHRpb25zLCBvcHRpb25zID0gbnVsbDtcbiAgaWYgKGlzLmZuKHRyYWl0cykpIGZuID0gdHJhaXRzLCBvcHRpb25zID0gbnVsbCwgdHJhaXRzID0gbnVsbDtcbiAgaWYgKGlzLm9iamVjdChpZCkpIG9wdGlvbnMgPSB0cmFpdHMsIHRyYWl0cyA9IGlkLCBpZCA9IHVzZXIuaWQoKTtcbiAgLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMsIG5vLXNlcXVlbmNlcyAqL1xuXG4gIC8vIGNsb25lIHRyYWl0cyBiZWZvcmUgd2UgbWFuaXB1bGF0ZSBzbyB3ZSBkb24ndCBkbyBhbnl0aGluZyB1bmNvdXRoLCBhbmQgdGFrZVxuICAvLyBmcm9tIGB1c2VyYCBzbyB0aGF0IHdlIGNhcnJ5b3ZlciBhbm9ueW1vdXMgdHJhaXRzXG4gIHVzZXIuaWRlbnRpZnkoaWQsIHRyYWl0cyk7XG5cbiAgdmFyIG1zZyA9IHRoaXMubm9ybWFsaXplKHtcbiAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgIHRyYWl0czogdXNlci50cmFpdHMoKSxcbiAgICB1c2VySWQ6IHVzZXIuaWQoKVxuICB9KTtcblxuICB0aGlzLl9pbnZva2UoJ2lkZW50aWZ5JywgbmV3IElkZW50aWZ5KG1zZykpO1xuXG4gIC8vIGVtaXRcbiAgdGhpcy5lbWl0KCdpZGVudGlmeScsIGlkLCB0cmFpdHMsIG9wdGlvbnMpO1xuICB0aGlzLl9jYWxsYmFjayhmbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGN1cnJlbnQgdXNlci5cbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cblxuQW5hbHl0aWNzLnByb3RvdHlwZS51c2VyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB1c2VyO1xufTtcblxuLyoqXG4gKiBJZGVudGlmeSBhIGdyb3VwIGJ5IG9wdGlvbmFsIGBpZGAgYW5kIGB0cmFpdHNgLiBPciwgaWYgbm8gYXJndW1lbnRzIGFyZVxuICogc3VwcGxpZWQsIHJldHVybiB0aGUgY3VycmVudCBncm91cC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gW2lkPWdyb3VwLmlkKCldIEdyb3VwIElELlxuICogQHBhcmFtIHtPYmplY3R9IFt0cmFpdHM9bnVsbF0gR3JvdXAgdHJhaXRzLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPW51bGxdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtBbmFseXRpY3N8T2JqZWN0fVxuICovXG5cbkFuYWx5dGljcy5wcm90b3R5cGUuZ3JvdXAgPSBmdW5jdGlvbihpZCwgdHJhaXRzLCBvcHRpb25zLCBmbikge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMsIG5vLXNlcXVlbmNlcyAqL1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBncm91cDtcbiAgaWYgKGlzLmZuKG9wdGlvbnMpKSBmbiA9IG9wdGlvbnMsIG9wdGlvbnMgPSBudWxsO1xuICBpZiAoaXMuZm4odHJhaXRzKSkgZm4gPSB0cmFpdHMsIG9wdGlvbnMgPSBudWxsLCB0cmFpdHMgPSBudWxsO1xuICBpZiAoaXMub2JqZWN0KGlkKSkgb3B0aW9ucyA9IHRyYWl0cywgdHJhaXRzID0gaWQsIGlkID0gZ3JvdXAuaWQoKTtcbiAgLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMsIG5vLXNlcXVlbmNlcyAqL1xuXG5cbiAgLy8gZ3JhYiBmcm9tIGdyb3VwIGFnYWluIHRvIG1ha2Ugc3VyZSB3ZSdyZSB0YWtpbmcgZnJvbSB0aGUgc291cmNlXG4gIGdyb3VwLmlkZW50aWZ5KGlkLCB0cmFpdHMpO1xuXG4gIHZhciBtc2cgPSB0aGlzLm5vcm1hbGl6ZSh7XG4gICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICB0cmFpdHM6IGdyb3VwLnRyYWl0cygpLFxuICAgIGdyb3VwSWQ6IGdyb3VwLmlkKClcbiAgfSk7XG5cbiAgdGhpcy5faW52b2tlKCdncm91cCcsIG5ldyBHcm91cChtc2cpKTtcblxuICB0aGlzLmVtaXQoJ2dyb3VwJywgaWQsIHRyYWl0cywgb3B0aW9ucyk7XG4gIHRoaXMuX2NhbGxiYWNrKGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFRyYWNrIGFuIGBldmVudGAgdGhhdCBhIHVzZXIgaGFzIHRyaWdnZXJlZCB3aXRoIG9wdGlvbmFsIGBwcm9wZXJ0aWVzYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbcHJvcGVydGllcz1udWxsXVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPW51bGxdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtBbmFseXRpY3N9XG4gKi9cblxuQW5hbHl0aWNzLnByb3RvdHlwZS50cmFjayA9IGZ1bmN0aW9uKGV2ZW50LCBwcm9wZXJ0aWVzLCBvcHRpb25zLCBmbikge1xuICAvLyBBcmd1bWVudCByZXNodWZmbGluZy5cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zLCBuby1zZXF1ZW5jZXMgKi9cbiAgaWYgKGlzLmZuKG9wdGlvbnMpKSBmbiA9IG9wdGlvbnMsIG9wdGlvbnMgPSBudWxsO1xuICBpZiAoaXMuZm4ocHJvcGVydGllcykpIGZuID0gcHJvcGVydGllcywgb3B0aW9ucyA9IG51bGwsIHByb3BlcnRpZXMgPSBudWxsO1xuICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC1leHByZXNzaW9ucywgbm8tc2VxdWVuY2VzICovXG5cbiAgLy8gZmlndXJlIG91dCBpZiB0aGUgZXZlbnQgaXMgYXJjaGl2ZWQuXG4gIHZhciBwbGFuID0gdGhpcy5vcHRpb25zLnBsYW4gfHwge307XG4gIHZhciBldmVudHMgPSBwbGFuLnRyYWNrIHx8IHt9O1xuXG4gIC8vIG5vcm1hbGl6ZVxuICB2YXIgbXNnID0gdGhpcy5ub3JtYWxpemUoe1xuICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXMsXG4gICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICBldmVudDogZXZlbnRcbiAgfSk7XG5cbiAgLy8gcGxhbi5cbiAgcGxhbiA9IGV2ZW50c1tldmVudF07XG4gIGlmIChwbGFuKSB7XG4gICAgdGhpcy5sb2coJ3BsYW4gJW8gLSAlbycsIGV2ZW50LCBwbGFuKTtcbiAgICBpZiAocGxhbi5lbmFibGVkID09PSBmYWxzZSkgcmV0dXJuIHRoaXMuX2NhbGxiYWNrKGZuKTtcbiAgICBkZWZhdWx0cyhtc2cuaW50ZWdyYXRpb25zLCBwbGFuLmludGVncmF0aW9ucyB8fCB7fSk7XG4gIH1cblxuICB0aGlzLl9pbnZva2UoJ3RyYWNrJywgbmV3IFRyYWNrKG1zZykpO1xuXG4gIHRoaXMuZW1pdCgndHJhY2snLCBldmVudCwgcHJvcGVydGllcywgb3B0aW9ucyk7XG4gIHRoaXMuX2NhbGxiYWNrKGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEhlbHBlciBtZXRob2QgdG8gdHJhY2sgYW4gb3V0Ym91bmQgbGluayB0aGF0IHdvdWxkIG5vcm1hbGx5IG5hdmlnYXRlIGF3YXlcbiAqIGZyb20gdGhlIHBhZ2UgYmVmb3JlIHRoZSBhbmFseXRpY3MgY2FsbHMgd2VyZSBzZW50LlxuICpcbiAqIEJBQ0tXQVJEUyBDT01QQVRJQklMSVRZOiBhbGlhc2VkIHRvIGB0cmFja0NsaWNrYC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR8QXJyYXl9IGxpbmtzXG4gKiBAcGFyYW0ge3N0cmluZ3xGdW5jdGlvbn0gZXZlbnRcbiAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSBwcm9wZXJ0aWVzIChvcHRpb25hbClcbiAqIEByZXR1cm4ge0FuYWx5dGljc31cbiAqL1xuXG5BbmFseXRpY3MucHJvdG90eXBlLnRyYWNrQ2xpY2sgPSBBbmFseXRpY3MucHJvdG90eXBlLnRyYWNrTGluayA9IGZ1bmN0aW9uKGxpbmtzLCBldmVudCwgcHJvcGVydGllcykge1xuICBpZiAoIWxpbmtzKSByZXR1cm4gdGhpcztcbiAgLy8gYWx3YXlzIGFycmF5cywgaGFuZGxlcyBqcXVlcnlcbiAgaWYgKHR5cGUobGlua3MpID09PSAnZWxlbWVudCcpIGxpbmtzID0gW2xpbmtzXTtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICBpZiAodHlwZShlbCkgIT09ICdlbGVtZW50Jykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBwYXNzIEhUTUxFbGVtZW50IHRvIGBhbmFseXRpY3MudHJhY2tMaW5rYC4nKTtcbiAgICB9XG4gICAgb24oZWwsICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBldiA9IGlzLmZuKGV2ZW50KSA/IGV2ZW50KGVsKSA6IGV2ZW50O1xuICAgICAgdmFyIHByb3BzID0gaXMuZm4ocHJvcGVydGllcykgPyBwcm9wZXJ0aWVzKGVsKSA6IHByb3BlcnRpZXM7XG4gICAgICB2YXIgaHJlZiA9IGVsLmdldEF0dHJpYnV0ZSgnaHJlZicpXG4gICAgICAgIHx8IGVsLmdldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywgJ2hyZWYnKVxuICAgICAgICB8fCBlbC5nZXRBdHRyaWJ1dGUoJ3hsaW5rOmhyZWYnKTtcblxuICAgICAgc2VsZi50cmFjayhldiwgcHJvcHMpO1xuXG4gICAgICBpZiAoaHJlZiAmJiBlbC50YXJnZXQgIT09ICdfYmxhbmsnICYmICFpc01ldGEoZSkpIHtcbiAgICAgICAgcHJldmVudChlKTtcbiAgICAgICAgc2VsZi5fY2FsbGJhY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBocmVmO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSwgbGlua3MpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBIZWxwZXIgbWV0aG9kIHRvIHRyYWNrIGFuIG91dGJvdW5kIGZvcm0gdGhhdCB3b3VsZCBub3JtYWxseSBuYXZpZ2F0ZSBhd2F5XG4gKiBmcm9tIHRoZSBwYWdlIGJlZm9yZSB0aGUgYW5hbHl0aWNzIGNhbGxzIHdlcmUgc2VudC5cbiAqXG4gKiBCQUNLV0FSRFMgQ09NUEFUSUJJTElUWTogYWxpYXNlZCB0byBgdHJhY2tTdWJtaXRgLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudHxBcnJheX0gZm9ybXNcbiAqIEBwYXJhbSB7c3RyaW5nfEZ1bmN0aW9ufSBldmVudFxuICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IHByb3BlcnRpZXMgKG9wdGlvbmFsKVxuICogQHJldHVybiB7QW5hbHl0aWNzfVxuICovXG5cbkFuYWx5dGljcy5wcm90b3R5cGUudHJhY2tTdWJtaXQgPSBBbmFseXRpY3MucHJvdG90eXBlLnRyYWNrRm9ybSA9IGZ1bmN0aW9uKGZvcm1zLCBldmVudCwgcHJvcGVydGllcykge1xuICBpZiAoIWZvcm1zKSByZXR1cm4gdGhpcztcbiAgLy8gYWx3YXlzIGFycmF5cywgaGFuZGxlcyBqcXVlcnlcbiAgaWYgKHR5cGUoZm9ybXMpID09PSAnZWxlbWVudCcpIGZvcm1zID0gW2Zvcm1zXTtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICBpZiAodHlwZShlbCkgIT09ICdlbGVtZW50JykgdGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBwYXNzIEhUTUxFbGVtZW50IHRvIGBhbmFseXRpY3MudHJhY2tGb3JtYC4nKTtcbiAgICBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgIHByZXZlbnQoZSk7XG5cbiAgICAgIHZhciBldiA9IGlzLmZuKGV2ZW50KSA/IGV2ZW50KGVsKSA6IGV2ZW50O1xuICAgICAgdmFyIHByb3BzID0gaXMuZm4ocHJvcGVydGllcykgPyBwcm9wZXJ0aWVzKGVsKSA6IHByb3BlcnRpZXM7XG4gICAgICBzZWxmLnRyYWNrKGV2LCBwcm9wcyk7XG5cbiAgICAgIHNlbGYuX2NhbGxiYWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBlbC5zdWJtaXQoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFN1cHBvcnQgdGhlIGV2ZW50cyBoYXBwZW5pbmcgdGhyb3VnaCBqUXVlcnkgb3IgWmVwdG8gaW5zdGVhZCBvZiB0aHJvdWdoXG4gICAgLy8gdGhlIG5vcm1hbCBET00gQVBJLCBiZWNhdXNlIGBlbC5zdWJtaXRgIGRvZXNuJ3QgYnViYmxlIHVwIGV2ZW50cy4uLlxuICAgIHZhciAkID0gd2luZG93LmpRdWVyeSB8fCB3aW5kb3cuWmVwdG87XG4gICAgaWYgKCQpIHtcbiAgICAgICQoZWwpLnN1Ym1pdChoYW5kbGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb24oZWwsICdzdWJtaXQnLCBoYW5kbGVyKTtcbiAgICB9XG4gIH0sIGZvcm1zKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogVHJpZ2dlciBhIHBhZ2V2aWV3LCBsYWJlbGluZyB0aGUgY3VycmVudCBwYWdlIHdpdGggYW4gb3B0aW9uYWwgYGNhdGVnb3J5YCxcbiAqIGBuYW1lYCBhbmQgYHByb3BlcnRpZXNgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbY2F0ZWdvcnldXG4gKiBAcGFyYW0ge3N0cmluZ30gW25hbWVdXG4gKiBAcGFyYW0ge09iamVjdHxzdHJpbmd9IFtwcm9wZXJ0aWVzXSAob3IgcGF0aClcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge0FuYWx5dGljc31cbiAqL1xuXG5BbmFseXRpY3MucHJvdG90eXBlLnBhZ2UgPSBmdW5jdGlvbihjYXRlZ29yeSwgbmFtZSwgcHJvcGVydGllcywgb3B0aW9ucywgZm4pIHtcbiAgLy8gQXJndW1lbnQgcmVzaHVmZmxpbmcuXG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC1leHByZXNzaW9ucywgbm8tc2VxdWVuY2VzICovXG4gIGlmIChpcy5mbihvcHRpb25zKSkgZm4gPSBvcHRpb25zLCBvcHRpb25zID0gbnVsbDtcbiAgaWYgKGlzLmZuKHByb3BlcnRpZXMpKSBmbiA9IHByb3BlcnRpZXMsIG9wdGlvbnMgPSBwcm9wZXJ0aWVzID0gbnVsbDtcbiAgaWYgKGlzLmZuKG5hbWUpKSBmbiA9IG5hbWUsIG9wdGlvbnMgPSBwcm9wZXJ0aWVzID0gbmFtZSA9IG51bGw7XG4gIGlmICh0eXBlKGNhdGVnb3J5KSA9PT0gJ29iamVjdCcpIG9wdGlvbnMgPSBuYW1lLCBwcm9wZXJ0aWVzID0gY2F0ZWdvcnksIG5hbWUgPSBjYXRlZ29yeSA9IG51bGw7XG4gIGlmICh0eXBlKG5hbWUpID09PSAnb2JqZWN0Jykgb3B0aW9ucyA9IHByb3BlcnRpZXMsIHByb3BlcnRpZXMgPSBuYW1lLCBuYW1lID0gbnVsbDtcbiAgaWYgKHR5cGUoY2F0ZWdvcnkpID09PSAnc3RyaW5nJyAmJiB0eXBlKG5hbWUpICE9PSAnc3RyaW5nJykgbmFtZSA9IGNhdGVnb3J5LCBjYXRlZ29yeSA9IG51bGw7XG4gIC8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zLCBuby1zZXF1ZW5jZXMgKi9cblxuICBwcm9wZXJ0aWVzID0gY2xvbmUocHJvcGVydGllcykgfHwge307XG4gIGlmIChuYW1lKSBwcm9wZXJ0aWVzLm5hbWUgPSBuYW1lO1xuICBpZiAoY2F0ZWdvcnkpIHByb3BlcnRpZXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcblxuICAvLyBFbnN1cmUgcHJvcGVydGllcyBoYXMgYmFzZWxpbmUgc3BlYyBwcm9wZXJ0aWVzLlxuICAvLyBUT0RPOiBFdmVudHVhbGx5IG1vdmUgdGhlc2UgZW50aXJlbHkgdG8gYG9wdGlvbnMuY29udGV4dC5wYWdlYFxuICB2YXIgZGVmcyA9IHBhZ2VEZWZhdWx0cygpO1xuICBkZWZhdWx0cyhwcm9wZXJ0aWVzLCBkZWZzKTtcblxuICAvLyBNaXJyb3IgdXNlciBvdmVycmlkZXMgdG8gYG9wdGlvbnMuY29udGV4dC5wYWdlYCAoYnV0IGV4Y2x1ZGUgY3VzdG9tIHByb3BlcnRpZXMpXG4gIC8vIChBbnkgcGFnZSBkZWZhdWx0cyBnZXQgYXBwbGllZCBpbiBgdGhpcy5ub3JtYWxpemVgIGZvciBjb25zaXN0ZW5jeS4pXG4gIC8vIFdlaXJkLCB5ZWFoLS1tb3Zpbmcgc3BlY2lhbCBwcm9wcyB0byBgY29udGV4dC5wYWdlYCB3aWxsIGZpeCB0aGlzIGluIHRoZSBsb25nIHRlcm0uXG4gIHZhciBvdmVycmlkZXMgPSBwaWNrKGtleXMoZGVmcyksIHByb3BlcnRpZXMpO1xuICBpZiAoIWlzLmVtcHR5KG92ZXJyaWRlcykpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLmNvbnRleHQgPSBvcHRpb25zLmNvbnRleHQgfHwge307XG4gICAgb3B0aW9ucy5jb250ZXh0LnBhZ2UgPSBvdmVycmlkZXM7XG4gIH1cblxuICB2YXIgbXNnID0gdGhpcy5ub3JtYWxpemUoe1xuICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXMsXG4gICAgY2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgbmFtZTogbmFtZVxuICB9KTtcblxuICB0aGlzLl9pbnZva2UoJ3BhZ2UnLCBuZXcgUGFnZShtc2cpKTtcblxuICB0aGlzLmVtaXQoJ3BhZ2UnLCBjYXRlZ29yeSwgbmFtZSwgcHJvcGVydGllcywgb3B0aW9ucyk7XG4gIHRoaXMuX2NhbGxiYWNrKGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEZJWE1FOiBCQUNLV0FSRFMgQ09NUEFUSUJJTElUWTogY29udmVydCBhbiBvbGQgYHBhZ2V2aWV3YCB0byBhIGBwYWdlYCBjYWxsLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdXJsXVxuICogQHJldHVybiB7QW5hbHl0aWNzfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuQW5hbHl0aWNzLnByb3RvdHlwZS5wYWdldmlldyA9IGZ1bmN0aW9uKHVybCkge1xuICB2YXIgcHJvcGVydGllcyA9IHt9O1xuICBpZiAodXJsKSBwcm9wZXJ0aWVzLnBhdGggPSB1cmw7XG4gIHRoaXMucGFnZShwcm9wZXJ0aWVzKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE1lcmdlIHR3byBwcmV2aW91c2x5IHVuYXNzb2NpYXRlZCB1c2VyIGlkZW50aXRpZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRvXG4gKiBAcGFyYW0ge3N0cmluZ30gZnJvbSAob3B0aW9uYWwpXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAob3B0aW9uYWwpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAob3B0aW9uYWwpXG4gKiBAcmV0dXJuIHtBbmFseXRpY3N9XG4gKi9cblxuQW5hbHl0aWNzLnByb3RvdHlwZS5hbGlhcyA9IGZ1bmN0aW9uKHRvLCBmcm9tLCBvcHRpb25zLCBmbikge1xuICAvLyBBcmd1bWVudCByZXNodWZmbGluZy5cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zLCBuby1zZXF1ZW5jZXMgKi9cbiAgaWYgKGlzLmZuKG9wdGlvbnMpKSBmbiA9IG9wdGlvbnMsIG9wdGlvbnMgPSBudWxsO1xuICBpZiAoaXMuZm4oZnJvbSkpIGZuID0gZnJvbSwgb3B0aW9ucyA9IG51bGwsIGZyb20gPSBudWxsO1xuICBpZiAoaXMub2JqZWN0KGZyb20pKSBvcHRpb25zID0gZnJvbSwgZnJvbSA9IG51bGw7XG4gIC8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLWV4cHJlc3Npb25zLCBuby1zZXF1ZW5jZXMgKi9cblxuICB2YXIgbXNnID0gdGhpcy5ub3JtYWxpemUoe1xuICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgcHJldmlvdXNJZDogZnJvbSxcbiAgICB1c2VySWQ6IHRvXG4gIH0pO1xuXG4gIHRoaXMuX2ludm9rZSgnYWxpYXMnLCBuZXcgQWxpYXMobXNnKSk7XG5cbiAgdGhpcy5lbWl0KCdhbGlhcycsIHRvLCBmcm9tLCBvcHRpb25zKTtcbiAgdGhpcy5fY2FsbGJhY2soZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVnaXN0ZXIgYSBgZm5gIHRvIGJlIGZpcmVkIHdoZW4gYWxsIHRoZSBhbmFseXRpY3Mgc2VydmljZXMgYXJlIHJlYWR5LlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtBbmFseXRpY3N9XG4gKi9cblxuQW5hbHl0aWNzLnByb3RvdHlwZS5yZWFkeSA9IGZ1bmN0aW9uKGZuKSB7XG4gIGlmIChpcy5mbihmbikpIHtcbiAgICBpZiAodGhpcy5fcmVhZGllZCkge1xuICAgICAgbmV4dFRpY2soZm4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uY2UoJ3JlYWR5JywgZm4pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBgdGltZW91dGAgKGluIG1pbGxpc2Vjb25kcykgdXNlZCBmb3IgY2FsbGJhY2tzLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lb3V0XG4gKi9cblxuQW5hbHl0aWNzLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24odGltZW91dCkge1xuICB0aGlzLl90aW1lb3V0ID0gdGltZW91dDtcbn07XG5cbi8qKlxuICogRW5hYmxlIG9yIGRpc2FibGUgZGVidWcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8Ym9vbGVhbn0gc3RyXG4gKi9cblxuQW5hbHl0aWNzLnByb3RvdHlwZS5kZWJ1ZyA9IGZ1bmN0aW9uKHN0cikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGggfHwgc3RyKSB7XG4gICAgZGVidWcuZW5hYmxlKCdhbmFseXRpY3M6JyArIChzdHIgfHwgJyonKSk7XG4gIH0gZWxzZSB7XG4gICAgZGVidWcuZGlzYWJsZSgpO1xuICB9XG59O1xuXG4vKipcbiAqIEFwcGx5IG9wdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge0FuYWx5dGljc31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkFuYWx5dGljcy5wcm90b3R5cGUuX29wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICBjb29raWUub3B0aW9ucyhvcHRpb25zLmNvb2tpZSk7XG4gIHN0b3JlLm9wdGlvbnMob3B0aW9ucy5sb2NhbFN0b3JhZ2UpO1xuICB1c2VyLm9wdGlvbnMob3B0aW9ucy51c2VyKTtcbiAgZ3JvdXAub3B0aW9ucyhvcHRpb25zLmdyb3VwKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGxiYWNrIGEgYGZuYCBhZnRlciBvdXIgZGVmaW5lZCB0aW1lb3V0IHBlcmlvZC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7QW5hbHl0aWNzfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuQW5hbHl0aWNzLnByb3RvdHlwZS5fY2FsbGJhY2sgPSBmdW5jdGlvbihmbikge1xuICBpZiAoaXMuZm4oZm4pKSB7XG4gICAgdGhpcy5fdGltZW91dCA/IHNldFRpbWVvdXQoZm4sIHRoaXMuX3RpbWVvdXQpIDogbmV4dFRpY2soZm4pO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDYWxsIGBtZXRob2RgIHdpdGggYGZhY2FkZWAgb24gYWxsIGVuYWJsZWQgaW50ZWdyYXRpb25zLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7RmFjYWRlfSBmYWNhZGVcbiAqIEByZXR1cm4ge0FuYWx5dGljc31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkFuYWx5dGljcy5wcm90b3R5cGUuX2ludm9rZSA9IGZ1bmN0aW9uKG1ldGhvZCwgZmFjYWRlKSB7XG4gIHRoaXMuZW1pdCgnaW52b2tlJywgZmFjYWRlKTtcblxuICBlYWNoKGZ1bmN0aW9uKGludGVncmF0aW9uLCBuYW1lKSB7XG4gICAgaWYgKCFmYWNhZGUuZW5hYmxlZChuYW1lKSkgcmV0dXJuO1xuICAgIGludGVncmF0aW9uLmludm9rZS5jYWxsKGludGVncmF0aW9uLCBtZXRob2QsIGZhY2FkZSk7XG4gIH0sIHRoaXMuX2ludGVncmF0aW9ucyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFB1c2ggYGFyZ3NgLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3NcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkFuYWx5dGljcy5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgdmFyIG1ldGhvZCA9IGFyZ3Muc2hpZnQoKTtcbiAgaWYgKCF0aGlzW21ldGhvZF0pIHJldHVybjtcbiAgdGhpc1ttZXRob2RdLmFwcGx5KHRoaXMsIGFyZ3MpO1xufTtcblxuLyoqXG4gKiBSZXNldCBncm91cCBhbmQgdXNlciB0cmFpdHMgYW5kIGlkJ3MuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5BbmFseXRpY3MucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMudXNlcigpLmxvZ291dCgpO1xuICB0aGlzLmdyb3VwKCkubG9nb3V0KCk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBxdWVyeSBzdHJpbmcgZm9yIGNhbGxhYmxlIG1ldGhvZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gKiBAcmV0dXJuIHtBbmFseXRpY3N9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5BbmFseXRpY3MucHJvdG90eXBlLl9wYXJzZVF1ZXJ5ID0gZnVuY3Rpb24ocXVlcnkpIHtcbiAgLy8gUGFyc2UgcXVlcnlzdHJpbmcgdG8gYW4gb2JqZWN0XG4gIHZhciBxID0gcXVlcnlzdHJpbmcucGFyc2UocXVlcnkpO1xuICAvLyBDcmVhdGUgdHJhaXRzIGFuZCBwcm9wZXJ0aWVzIG9iamVjdHMsIHBvcHVsYXRlIGZyb20gcXVlcnlzdGluZyBwYXJhbXNcbiAgdmFyIHRyYWl0cyA9IHBpY2tQcmVmaXgoJ2Fqc190cmFpdF8nLCBxKTtcbiAgdmFyIHByb3BzID0gcGlja1ByZWZpeCgnYWpzX3Byb3BfJywgcSk7XG4gIC8vIFRyaWdnZXIgYmFzZWQgb24gY2FsbGFibGUgcGFyYW1ldGVycyBpbiB0aGUgVVJMXG4gIGlmIChxLmFqc191aWQpIHRoaXMuaWRlbnRpZnkocS5hanNfdWlkLCB0cmFpdHMpO1xuICBpZiAocS5hanNfZXZlbnQpIHRoaXMudHJhY2socS5hanNfZXZlbnQsIHByb3BzKTtcbiAgaWYgKHEuYWpzX2FpZCkgdXNlci5hbm9ueW1vdXNJZChxLmFqc19haWQpO1xuICByZXR1cm4gdGhpcztcblxuICAvKipcbiAgICogQ3JlYXRlIGEgc2hhbGxvdyBjb3B5IG9mIGFuIGlucHV0IG9iamVjdCBjb250YWluaW5nIG9ubHkgdGhlIHByb3BlcnRpZXNcbiAgICogd2hvc2Uga2V5cyBhcmUgc3BlY2lmaWVkIGJ5IGEgcHJlZml4LCBzdHJpcHBlZCBvZiB0aGF0IHByZWZpeFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJlZml4XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgZnVuY3Rpb24gcGlja1ByZWZpeChwcmVmaXgsIG9iamVjdCkge1xuICAgIHZhciBsZW5ndGggPSBwcmVmaXgubGVuZ3RoO1xuICAgIHZhciBzdWI7XG4gICAgcmV0dXJuIGZvbGRsKGZ1bmN0aW9uKGFjYywgdmFsLCBrZXkpIHtcbiAgICAgIGlmIChrZXkuc3Vic3RyKDAsIGxlbmd0aCkgPT09IHByZWZpeCkge1xuICAgICAgICBzdWIgPSBrZXkuc3Vic3RyKGxlbmd0aCk7XG4gICAgICAgIGFjY1tzdWJdID0gdmFsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSwgb2JqZWN0KTtcbiAgfVxufTtcblxuLyoqXG4gKiBOb3JtYWxpemUgdGhlIGdpdmVuIGBtc2dgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBtc2dcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuXG5BbmFseXRpY3MucHJvdG90eXBlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG1zZykge1xuICBtc2cgPSBub3JtYWxpemUobXNnLCBrZXlzKHRoaXMuX2ludGVncmF0aW9ucykpO1xuICBpZiAobXNnLmFub255bW91c0lkKSB1c2VyLmFub255bW91c0lkKG1zZy5hbm9ueW1vdXNJZCk7XG4gIG1zZy5hbm9ueW1vdXNJZCA9IHVzZXIuYW5vbnltb3VzSWQoKTtcblxuICAvLyBFbnN1cmUgYWxsIG91dGdvaW5nIHJlcXVlc3RzIGluY2x1ZGUgcGFnZSBkYXRhIGluIHRoZWlyIGNvbnRleHRzLlxuICBtc2cuY29udGV4dC5wYWdlID0gZGVmYXVsdHMobXNnLmNvbnRleHQucGFnZSB8fCB7fSwgcGFnZURlZmF1bHRzKCkpO1xuXG4gIHJldHVybiBtc2c7XG59O1xuXG4vKipcbiAqIE5vIGNvbmZsaWN0IHN1cHBvcnQuXG4gKi9cblxuQW5hbHl0aWNzLnByb3RvdHlwZS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gIHdpbmRvdy5hbmFseXRpY3MgPSBfYW5hbHl0aWNzO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qXG4gKiBFeHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gQW5hbHl0aWNzO1xubW9kdWxlLmV4cG9ydHMuY29va2llID0gY29va2llO1xubW9kdWxlLmV4cG9ydHMubWVtb3J5ID0gbWVtb3J5O1xubW9kdWxlLmV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L2FuYWx5dGljcy5qcy1jb3JlL2xpYi9hbmFseXRpY3MuanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBnZXQgPSByZXF1aXJlKCdvYmotY2FzZScpO1xuXG4vKipcbiAqIEFkZCBhZGRyZXNzIGdldHRlcnMgdG8gYHByb3RvYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcm90b1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHByb3RvKSB7XG4gIHByb3RvLnppcCA9IHRyYWl0KCdwb3N0YWxDb2RlJywgJ3ppcCcpO1xuICBwcm90by5jb3VudHJ5ID0gdHJhaXQoJ2NvdW50cnknKTtcbiAgcHJvdG8uc3RyZWV0ID0gdHJhaXQoJ3N0cmVldCcpO1xuICBwcm90by5zdGF0ZSA9IHRyYWl0KCdzdGF0ZScpO1xuICBwcm90by5jaXR5ID0gdHJhaXQoJ2NpdHknKTtcbiAgcHJvdG8ucmVnaW9uID0gdHJhaXQoJ3JlZ2lvbicpO1xuXG4gIGZ1bmN0aW9uIHRyYWl0KGEsIGIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdHJhaXRzID0gdGhpcy50cmFpdHMoKTtcbiAgICAgIHZhciBwcm9wcyA9IHRoaXMucHJvcGVydGllcyA/IHRoaXMucHJvcGVydGllcygpIDoge307XG5cbiAgICAgIHJldHVybiBnZXQodHJhaXRzLCAnYWRkcmVzcy4nICsgYSlcbiAgICAgICAgfHwgZ2V0KHRyYWl0cywgYSlcbiAgICAgICAgfHwgKGIgPyBnZXQodHJhaXRzLCAnYWRkcmVzcy4nICsgYikgOiBudWxsKVxuICAgICAgICB8fCAoYiA/IGdldCh0cmFpdHMsIGIpIDogbnVsbClcbiAgICAgICAgfHwgZ2V0KHByb3BzLCAnYWRkcmVzcy4nICsgYSlcbiAgICAgICAgfHwgZ2V0KHByb3BzLCBhKVxuICAgICAgICB8fCAoYiA/IGdldChwcm9wcywgJ2FkZHJlc3MuJyArIGIpIDogbnVsbClcbiAgICAgICAgfHwgKGIgPyBnZXQocHJvcHMsIGIpIDogbnVsbCk7XG4gICAgfTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NlZ21lbnRpby1mYWNhZGUvbGliL2FkZHJlc3MuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGZldyBpbnRlZ3JhdGlvbnMgYXJlIGRpc2FibGVkIGJ5IGRlZmF1bHQuIFRoZXkgbXVzdCBiZSBleHBsaWNpdGx5XG4gKiBlbmFibGVkIGJ5IHNldHRpbmcgb3B0aW9uc1tQcm92aWRlcl0gPSB0cnVlLlxuICovXG5cbnZhciBkaXNhYmxlZCA9IHtcbiAgU2FsZXNmb3JjZTogdHJ1ZVxufTtcblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIGludGVncmF0aW9uIHNob3VsZCBiZSBlbmFibGVkIGJ5IGRlZmF1bHQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGludGVncmF0aW9uXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW50ZWdyYXRpb24pIHtcbiAgcmV0dXJuICFkaXNhYmxlZFtpbnRlZ3JhdGlvbl07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2VnbWVudGlvLWZhY2FkZS9saWIvaXMtZW5hYmxlZC5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1hdGNoZXIuXG4gKi9cblxudmFyIG1hdGNoZXIgPSAvXFxkezEzfS87XG5cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGEgc3RyaW5nIGlzIGEgbWlsbGlzZWNvbmQgZGF0ZSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0cy5pcyA9IGZ1bmN0aW9uKHN0cmluZykge1xuICByZXR1cm4gbWF0Y2hlci50ZXN0KHN0cmluZyk7XG59O1xuXG5cbi8qKlxuICogQ29udmVydCBhIG1pbGxpc2Vjb25kIHN0cmluZyB0byBhIGRhdGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1pbGxpc1xuICogQHJldHVybiB7RGF0ZX1cbiAqL1xuZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uKG1pbGxpcykge1xuICBtaWxsaXMgPSBwYXJzZUludChtaWxsaXMsIDEwKTtcbiAgcmV0dXJuIG5ldyBEYXRlKG1pbGxpcyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbmV3LWRhdGUvbGliL21pbGxpc2Vjb25kcy5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1hdGNoZXIuXG4gKi9cblxudmFyIG1hdGNoZXIgPSAvXFxkezEwfS87XG5cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGEgc3RyaW5nIGlzIGEgc2Vjb25kIGRhdGUgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydHMuaXMgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgcmV0dXJuIG1hdGNoZXIudGVzdChzdHJpbmcpO1xufTtcblxuXG4vKipcbiAqIENvbnZlcnQgYSBzZWNvbmQgc3RyaW5nIHRvIGEgZGF0ZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc2Vjb25kc1xuICogQHJldHVybiB7RGF0ZX1cbiAqL1xuZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uKHNlY29uZHMpIHtcbiAgdmFyIG1pbGxpcyA9IHBhcnNlSW50KHNlY29uZHMsIDEwKSAqIDEwMDA7XG4gIHJldHVybiBuZXcgRGF0ZShtaWxsaXMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL25ldy1kYXRlL2xpYi9zZWNvbmRzLmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogTW9kdWxlIERlcGVuZGVuY2llc1xuICovXG5cbnZhciBleHByO1xudHJ5IHtcbiAgZXhwciA9IHJlcXVpcmUoJ3Byb3BzJyk7XG59IGNhdGNoKGUpIHtcbiAgZXhwciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1wcm9wcycpO1xufVxuXG4vKipcbiAqIEV4cG9zZSBgdG9GdW5jdGlvbigpYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRvRnVuY3Rpb247XG5cbi8qKlxuICogQ29udmVydCBgb2JqYCB0byBhIGBGdW5jdGlvbmAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gb2JqXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHRvRnVuY3Rpb24ob2JqKSB7XG4gIHN3aXRjaCAoe30udG9TdHJpbmcuY2FsbChvYmopKSB7XG4gICAgY2FzZSAnW29iamVjdCBPYmplY3RdJzpcbiAgICAgIHJldHVybiBvYmplY3RUb0Z1bmN0aW9uKG9iaik7XG4gICAgY2FzZSAnW29iamVjdCBGdW5jdGlvbl0nOlxuICAgICAgcmV0dXJuIG9iajtcbiAgICBjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxuICAgICAgcmV0dXJuIHN0cmluZ1RvRnVuY3Rpb24ob2JqKTtcbiAgICBjYXNlICdbb2JqZWN0IFJlZ0V4cF0nOlxuICAgICAgcmV0dXJuIHJlZ2V4cFRvRnVuY3Rpb24ob2JqKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGRlZmF1bHRUb0Z1bmN0aW9uKG9iaik7XG4gIH1cbn1cblxuLyoqXG4gKiBEZWZhdWx0IHRvIHN0cmljdCBlcXVhbGl0eS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZGVmYXVsdFRvRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmope1xuICAgIHJldHVybiB2YWwgPT09IG9iajtcbiAgfTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGByZWAgdG8gYSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge1JlZ0V4cH0gcmVcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcmVnZXhwVG9GdW5jdGlvbihyZSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqKXtcbiAgICByZXR1cm4gcmUudGVzdChvYmopO1xuICB9O1xufVxuXG4vKipcbiAqIENvbnZlcnQgcHJvcGVydHkgYHN0cmAgdG8gYSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHN0cmluZ1RvRnVuY3Rpb24oc3RyKSB7XG4gIC8vIGltbWVkaWF0ZSBzdWNoIGFzIFwiPiAyMFwiXG4gIGlmICgvXiAqXFxXKy8udGVzdChzdHIpKSByZXR1cm4gbmV3IEZ1bmN0aW9uKCdfJywgJ3JldHVybiBfICcgKyBzdHIpO1xuXG4gIC8vIHByb3BlcnRpZXMgc3VjaCBhcyBcIm5hbWUuZmlyc3RcIiBvciBcImFnZSA+IDE4XCIgb3IgXCJhZ2UgPiAxOCAmJiBhZ2UgPCAzNlwiXG4gIHJldHVybiBuZXcgRnVuY3Rpb24oJ18nLCAncmV0dXJuICcgKyBnZXQoc3RyKSk7XG59XG5cbi8qKlxuICogQ29udmVydCBgb2JqZWN0YCB0byBhIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gb2JqZWN0VG9GdW5jdGlvbihvYmopIHtcbiAgdmFyIG1hdGNoID0ge307XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBtYXRjaFtrZXldID0gdHlwZW9mIG9ialtrZXldID09PSAnc3RyaW5nJ1xuICAgICAgPyBkZWZhdWx0VG9GdW5jdGlvbihvYmpba2V5XSlcbiAgICAgIDogdG9GdW5jdGlvbihvYmpba2V5XSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbCl7XG4gICAgaWYgKHR5cGVvZiB2YWwgIT09ICdvYmplY3QnKSByZXR1cm4gZmFsc2U7XG4gICAgZm9yICh2YXIga2V5IGluIG1hdGNoKSB7XG4gICAgICBpZiAoIShrZXkgaW4gdmFsKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKCFtYXRjaFtrZXldKHZhbFtrZXldKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn1cblxuLyoqXG4gKiBCdWlsdCB0aGUgZ2V0dGVyIGZ1bmN0aW9uLiBTdXBwb3J0cyBnZXR0ZXIgc3R5bGUgZnVuY3Rpb25zXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZ2V0KHN0cikge1xuICB2YXIgcHJvcHMgPSBleHByKHN0cik7XG4gIGlmICghcHJvcHMubGVuZ3RoKSByZXR1cm4gJ18uJyArIHN0cjtcblxuICB2YXIgdmFsLCBpLCBwcm9wO1xuICBmb3IgKGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICBwcm9wID0gcHJvcHNbaV07XG4gICAgdmFsID0gJ18uJyArIHByb3A7XG4gICAgdmFsID0gXCIoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgXCIgKyB2YWwgKyBcIiA/IFwiICsgdmFsICsgXCIoKSA6IFwiICsgdmFsICsgXCIpXCI7XG5cbiAgICAvLyBtaW1pYyBuZWdhdGl2ZSBsb29rYmVoaW5kIHRvIGF2b2lkIHByb2JsZW1zIHdpdGggbmVzdGVkIHByb3BlcnRpZXNcbiAgICBzdHIgPSBzdHJpcE5lc3RlZChwcm9wLCBzdHIsIHZhbCk7XG4gIH1cblxuICByZXR1cm4gc3RyO1xufVxuXG4vKipcbiAqIE1pbWljIG5lZ2F0aXZlIGxvb2tiZWhpbmQgdG8gYXZvaWQgcHJvYmxlbXMgd2l0aCBuZXN0ZWQgcHJvcGVydGllcy5cbiAqXG4gKiBTZWU6IGh0dHA6Ly9ibG9nLnN0ZXZlbmxldml0aGFuLmNvbS9hcmNoaXZlcy9taW1pYy1sb29rYmVoaW5kLWphdmFzY3JpcHRcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvcFxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc3RyaXBOZXN0ZWQgKHByb3AsIHN0ciwgdmFsKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKCcoXFxcXC4pPycgKyBwcm9wLCAnZycpLCBmdW5jdGlvbigkMCwgJDEpIHtcbiAgICByZXR1cm4gJDEgPyAkMCA6IHZhbDtcbiAgfSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90by1mdW5jdGlvbi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGluaGVyaXQgPSByZXF1aXJlKCcuL3V0aWxzJykuaW5oZXJpdDtcbnZhciBGYWNhZGUgPSByZXF1aXJlKCcuL2ZhY2FkZScpO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEFsaWFzYCBmYWNhZGUgd2l0aCBhIGBkaWN0aW9uYXJ5YCBvZiBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRpY3Rpb25hcnlcbiAqICAgQHByb3BlcnR5IHtzdHJpbmd9IGZyb21cbiAqICAgQHByb3BlcnR5IHtzdHJpbmd9IHRvXG4gKiAgIEBwcm9wZXJ0eSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogICBAcHJvcGVydHkge2Jvb2xlYW58dW5kZWZpbmVkfSBjbG9uZVxuICovXG5mdW5jdGlvbiBBbGlhcyhkaWN0aW9uYXJ5LCBvcHRzKSB7XG4gIEZhY2FkZS5jYWxsKHRoaXMsIGRpY3Rpb25hcnksIG9wdHMpO1xufVxuXG4vKipcbiAqIEluaGVyaXQgZnJvbSBgRmFjYWRlYC5cbiAqL1xuXG5pbmhlcml0KEFsaWFzLCBGYWNhZGUpO1xuXG4vKipcbiAqIFJldHVybiB0eXBlIG9mIGZhY2FkZS5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbkFsaWFzLnByb3RvdHlwZS5hY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdhbGlhcyc7XG59O1xuXG5BbGlhcy5wcm90b3R5cGUudHlwZSA9IEFsaWFzLnByb3RvdHlwZS5hY3Rpb247XG5cbi8qKlxuICogR2V0IGBwcmV2aW91c0lkYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICogQHJldHVybiB7Kn1cbiAqL1xuQWxpYXMucHJvdG90eXBlLnByZXZpb3VzSWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZmllbGQoJ3ByZXZpb3VzSWQnKSB8fCB0aGlzLmZpZWxkKCdmcm9tJyk7XG59O1xuXG5BbGlhcy5wcm90b3R5cGUuZnJvbSA9IEFsaWFzLnByb3RvdHlwZS5wcmV2aW91c0lkO1xuXG4vKipcbiAqIEdldCBgdXNlcklkYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5BbGlhcy5wcm90b3R5cGUudXNlcklkID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmZpZWxkKCd1c2VySWQnKSB8fCB0aGlzLmZpZWxkKCd0bycpO1xufTtcblxuQWxpYXMucHJvdG90eXBlLnRvID0gQWxpYXMucHJvdG90eXBlLnVzZXJJZDtcblxuLyoqXG4gKiBFeHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gQWxpYXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zZWdtZW50aW8tZmFjYWRlL2xpYi9hbGlhcy5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGluaGVyaXQgPSByZXF1aXJlKCcuL3V0aWxzJykuaW5oZXJpdDtcbnZhciBpc0VtYWlsID0gcmVxdWlyZSgnaXMtZW1haWwnKTtcbnZhciBuZXdEYXRlID0gcmVxdWlyZSgnbmV3LWRhdGUnKTtcbnZhciBGYWNhZGUgPSByZXF1aXJlKCcuL2ZhY2FkZScpO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEdyb3VwYCBmYWNhZGUgd2l0aCBhIGBkaWN0aW9uYXJ5YCBvZiBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRpY3Rpb25hcnlcbiAqICAgQHBhcmFtIHtzdHJpbmd9IHVzZXJJZFxuICogICBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJZFxuICogICBAcGFyYW0ge09iamVjdH0gcHJvcGVydGllc1xuICogICBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqICAgQHByb3BlcnR5IHtib29sZWFufHVuZGVmaW5lZH0gY2xvbmVcbiAqL1xuZnVuY3Rpb24gR3JvdXAoZGljdGlvbmFyeSwgb3B0cykge1xuICBGYWNhZGUuY2FsbCh0aGlzLCBkaWN0aW9uYXJ5LCBvcHRzKTtcbn1cblxuLyoqXG4gKiBJbmhlcml0IGZyb20gYEZhY2FkZWBcbiAqL1xuXG5pbmhlcml0KEdyb3VwLCBGYWNhZGUpO1xuXG4vKipcbiAqIEdldCB0aGUgZmFjYWRlJ3MgYWN0aW9uLlxuICovXG5Hcm91cC5wcm90b3R5cGUuYWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnZ3JvdXAnO1xufTtcblxuR3JvdXAucHJvdG90eXBlLnR5cGUgPSBHcm91cC5wcm90b3R5cGUuYWN0aW9uO1xuXG4vKipcbiAqIFNldHVwIHNvbWUgYmFzaWMgcHJveGllcy5cbiAqL1xuR3JvdXAucHJvdG90eXBlLmdyb3VwSWQgPSBGYWNhZGUuZmllbGQoJ2dyb3VwSWQnKTtcblxuLyoqXG4gKiBHZXQgY3JlYXRlZCBvciBjcmVhdGVkQXQuXG4gKlxuICogQHJldHVybiB7RGF0ZX1cbiAqL1xuR3JvdXAucHJvdG90eXBlLmNyZWF0ZWQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNyZWF0ZWQgPSB0aGlzLnByb3h5KCd0cmFpdHMuY3JlYXRlZEF0JylcbiAgICB8fCB0aGlzLnByb3h5KCd0cmFpdHMuY3JlYXRlZCcpXG4gICAgfHwgdGhpcy5wcm94eSgncHJvcGVydGllcy5jcmVhdGVkQXQnKVxuICAgIHx8IHRoaXMucHJveHkoJ3Byb3BlcnRpZXMuY3JlYXRlZCcpO1xuXG4gIGlmIChjcmVhdGVkKSByZXR1cm4gbmV3RGF0ZShjcmVhdGVkKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBncm91cCdzIGVtYWlsLCBmYWxsaW5nIGJhY2sgdG8gdGhlIGdyb3VwIElEIGlmIGl0J3MgYSB2YWxpZCBlbWFpbC5cbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbkdyb3VwLnByb3RvdHlwZS5lbWFpbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZW1haWwgPSB0aGlzLnByb3h5KCd0cmFpdHMuZW1haWwnKTtcbiAgaWYgKGVtYWlsKSByZXR1cm4gZW1haWw7XG4gIHZhciBncm91cElkID0gdGhpcy5ncm91cElkKCk7XG4gIGlmIChpc0VtYWlsKGdyb3VwSWQpKSByZXR1cm4gZ3JvdXBJZDtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBncm91cCdzIHRyYWl0cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYWxpYXNlc1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5Hcm91cC5wcm90b3R5cGUudHJhaXRzID0gZnVuY3Rpb24oYWxpYXNlcykge1xuICB2YXIgcmV0ID0gdGhpcy5wcm9wZXJ0aWVzKCk7XG4gIHZhciBpZCA9IHRoaXMuZ3JvdXBJZCgpO1xuICBhbGlhc2VzID0gYWxpYXNlcyB8fCB7fTtcblxuICBpZiAoaWQpIHJldC5pZCA9IGlkO1xuXG4gIGZvciAodmFyIGFsaWFzIGluIGFsaWFzZXMpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzW2FsaWFzXSA9PSBudWxsID8gdGhpcy5wcm94eSgndHJhaXRzLicgKyBhbGlhcykgOiB0aGlzW2FsaWFzXSgpO1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSBjb250aW51ZTtcbiAgICByZXRbYWxpYXNlc1thbGlhc11dID0gdmFsdWU7XG4gICAgZGVsZXRlIHJldFthbGlhc107XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcblxuLyoqXG4gKiBTcGVjaWFsIHRyYWl0cy5cbiAqL1xuXG5Hcm91cC5wcm90b3R5cGUubmFtZSA9IEZhY2FkZS5wcm94eSgndHJhaXRzLm5hbWUnKTtcbkdyb3VwLnByb3RvdHlwZS5pbmR1c3RyeSA9IEZhY2FkZS5wcm94eSgndHJhaXRzLmluZHVzdHJ5Jyk7XG5Hcm91cC5wcm90b3R5cGUuZW1wbG95ZWVzID0gRmFjYWRlLnByb3h5KCd0cmFpdHMuZW1wbG95ZWVzJyk7XG5cbi8qKlxuICogR2V0IHRyYWl0cyBvciBwcm9wZXJ0aWVzLlxuICpcbiAqIFRPRE86IHJlbW92ZSBtZVxuICpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuR3JvdXAucHJvdG90eXBlLnByb3BlcnRpZXMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZmllbGQoJ3RyYWl0cycpIHx8IHRoaXMuZmllbGQoJ3Byb3BlcnRpZXMnKSB8fCB7fTtcbn07XG5cbi8qKlxuICogRXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyb3VwO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2VnbWVudGlvLWZhY2FkZS9saWIvZ3JvdXAuanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluaGVyaXQgPSByZXF1aXJlKCcuL3V0aWxzJykuaW5oZXJpdDtcbnZhciBQYWdlID0gcmVxdWlyZSgnLi9wYWdlJyk7XG52YXIgVHJhY2sgPSByZXF1aXJlKCcuL3RyYWNrJyk7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBuZXcgYFNjcmVlbmAgZmFjYWRlIHdpdGggYGRpY3Rpb25hcnlgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkaWN0aW9uYXJ5XG4gKiAgIEBwYXJhbSB7c3RyaW5nfSBjYXRlZ29yeVxuICogICBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogICBAcGFyYW0ge09iamVjdH0gdHJhaXRzXG4gKiAgIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogICBAcHJvcGVydHkge2Jvb2xlYW58dW5kZWZpbmVkfSBjbG9uZVxuICovXG5mdW5jdGlvbiBTY3JlZW4oZGljdGlvbmFyeSwgb3B0cykge1xuICBQYWdlLmNhbGwodGhpcywgZGljdGlvbmFyeSwgb3B0cyk7XG59XG5cbi8qKlxuICogSW5oZXJpdCBmcm9tIGBQYWdlYFxuICovXG5cbmluaGVyaXQoU2NyZWVuLCBQYWdlKTtcblxuLyoqXG4gKiBHZXQgdGhlIGZhY2FkZSdzIGFjdGlvbi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5TY3JlZW4ucHJvdG90eXBlLmFjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ3NjcmVlbic7XG59O1xuXG5TY3JlZW4ucHJvdG90eXBlLnR5cGUgPSBTY3JlZW4ucHJvdG90eXBlLmFjdGlvbjtcblxuLyoqXG4gKiBHZXQgZXZlbnQgd2l0aCBgbmFtZWAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cblNjcmVlbi5wcm90b3R5cGUuZXZlbnQgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHJldHVybiBuYW1lID8gJ1ZpZXdlZCAnICsgbmFtZSArICcgU2NyZWVuJyA6ICdMb2FkZWQgYSBTY3JlZW4nO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0IHRoaXMgU2NyZWVuLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHJldHVybiB7VHJhY2t9XG4gKi9cblNjcmVlbi5wcm90b3R5cGUudHJhY2sgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBqc29uID0gdGhpcy5qc29uKCk7XG4gIGpzb24uZXZlbnQgPSB0aGlzLmV2ZW50KG5hbWUpO1xuICBqc29uLnRpbWVzdGFtcCA9IHRoaXMudGltZXN0YW1wKCk7XG4gIGpzb24ucHJvcGVydGllcyA9IHRoaXMucHJvcGVydGllcygpO1xuICByZXR1cm4gbmV3IFRyYWNrKGpzb24sIHRoaXMub3B0cyk7XG59O1xuXG4vKipcbiAqIEV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBTY3JlZW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zZWdtZW50aW8tZmFjYWRlL2xpYi9zY3JlZW4uanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIG9ialRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG4vLyBUT0RPOiBNb3ZlIHRvIGxpYlxudmFyIGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbic7XG59O1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgbnVtYmVyLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG4vLyBUT0RPOiBNb3ZlIHRvIGxpYlxudmFyIGlzTnVtYmVyID0gZnVuY3Rpb24odmFsKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgcmV0dXJuIHR5cGUgPT09ICdudW1iZXInIHx8ICh0eXBlID09PSAnb2JqZWN0JyAmJiBvYmpUb1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IE51bWJlcl0nKTtcbn07XG5cbiAvKipcbiAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIGdlbmVyaWMsIG51bWJlcmVkIGFyZ3VtZW50IG5hbWVzLlxuICAqXG4gICogQG5hbWUgY3JlYXRlUGFyYW1zXG4gICogQGFwaSBwcml2YXRlXG4gICogQHBhcmFtIHtudW1iZXJ9IG5cbiAgKiBAcmV0dXJuIHtBcnJheX1cbiAgKiBAZXhhbXBsZVxuICAqIGFyZ05hbWVzKDIpO1xuICAqIC8vPT4gWydhcmcxJywgJ2FyZzInXVxuICAqL1xudmFyIGNyZWF0ZVBhcmFtcyA9IGZ1bmN0aW9uIGNyZWF0ZVBhcmFtcyhuKSB7XG4gIHZhciBhcmdzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPD0gbjsgaSArPSAxKSB7XG4gICAgYXJncy5wdXNoKCdhcmcnICsgaSk7XG4gIH1cblxuICByZXR1cm4gYXJncztcbn07XG5cbiAvKipcbiAgKiBEeW5hbWljYWxseSBjb25zdHJ1Y3QgYSB3cmFwcGVyIGZ1bmN0aW9uIG9mIGBuYCBhcml0eSB0aGF0LlxuICAqXG4gICogSWYgYXQgYWxsIHBvc3NpYmxlLCBwcmVmZXIgYSBmdW5jdGlvbiBmcm9tIHRoZSBhcml0eSB3cmFwcGVyIGNhY2hlIGFib3ZlIHRvXG4gICogYXZvaWQgYWxsb2NhdGluZyBhIG5ldyBmdW5jdGlvbiBhdCBydW50aW1lLlxuICAqXG4gICogQG5hbWUgY3JlYXRlQXJpdHlXcmFwcGVyXG4gICogQGFwaSBwcml2YXRlXG4gICogQHBhcmFtIHtudW1iZXJ9IG5cbiAgKiBAcmV0dXJuIHtGdW5jdGlvbihGdW5jdGlvbil9XG4gICovXG52YXIgY3JlYXRlQXJpdHlXcmFwcGVyID0gZnVuY3Rpb24gY3JlYXRlQXJpdHlXcmFwcGVyKG4pIHtcbiAgdmFyIHBhcmFtTmFtZXMgPSBjcmVhdGVQYXJhbXMobikuam9pbignLCAnKTtcbiAgdmFyIHdyYXBwZXJCb2R5ID0gJycuY29uY2F0KFxuICAgICcgIHJldHVybiBmdW5jdGlvbignLCBwYXJhbU5hbWVzLCAnKSB7XFxuJyxcbiAgICAnICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XFxuJyxcbiAgICAnICB9OydcbiAgKTtcblxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYyAqL1xuICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdmdW5jJywgd3JhcHBlckJvZHkpO1xuICAvKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jICovXG59O1xuXG4vLyBDYWNoZSBjb21tb24gYXJpdHkgd3JhcHBlcnMgdG8gYXZvaWQgY29uc3RydWN0aW5nIHRoZW0gYXQgcnVudGltZVxudmFyIGFyaXR5V3JhcHBlckNhY2hlID0gW1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICBmdW5jdGlvbihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0sXG5cbiAgZnVuY3Rpb24oZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oYXJnMSkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSxcblxuICBmdW5jdGlvbihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbihhcmcxLCBhcmcyKSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9LFxuXG4gIGZ1bmN0aW9uKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0sXG5cbiAgZnVuY3Rpb24oZm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oYXJnMSwgYXJnMiwgYXJnMywgYXJnNCkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSxcblxuICBmdW5jdGlvbihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbihhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbl07XG5cbi8qKlxuICogVGFrZXMgYSBmdW5jdGlvbiBhbmQgYW4gW2FyaXR5XShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Bcml0eSkgYG5gLCBhbmQgcmV0dXJucyBhIG5ld1xuICogZnVuY3Rpb24gdGhhdCBleHBlY3RzIGBuYCBhcmd1bWVudHMuXG4gKlxuICogQG5hbWUgYXJpdHlcbiAqIEBhcGkgcHVibGljXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBzZWUge0BsaW5rIGN1cnJ5fVxuICogQHBhcmFtIHtOdW1iZXJ9IG4gVGhlIGRlc2lyZWQgYXJpdHkgb2YgdGhlIHJldHVybmVkIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvZiBuIGFyaXR5LCB3cmFwcGluZyBgZm5gLlxuICogQGV4YW1wbGVcbiAqIHZhciBhZGQgPSBmdW5jdGlvbihhLCBiKSB7XG4gKiAgIHJldHVybiBhICsgYjtcbiAqIH07XG4gKlxuICogLy8gQ2hlY2sgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgdGhpcyBmdW5jdGlvbiBleHBlY3RzIGJ5IGFjY2Vzc2luZyBgLmxlbmd0aGA6XG4gKiBhZGQubGVuZ3RoO1xuICogLy89PiAyXG4gKlxuICogdmFyIHVuYXJ5QWRkID0gYXJpdHkoMSwgYWRkKTtcbiAqIHVuYXJ5QWRkLmxlbmd0aDtcbiAqIC8vPT4gMVxuICovXG52YXIgYXJpdHkgPSBmdW5jdGlvbiBhcml0eShuLCBmdW5jKSB7XG4gIGlmICghaXNGdW5jdGlvbihmdW5jKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgZnVuY3Rpb24gYnV0IGdvdCAnICsgdHlwZW9mIGZ1bmMpO1xuICB9XG5cbiAgbiA9IE1hdGgubWF4KGlzTnVtYmVyKG4pID8gbiA6IDAsIDApO1xuXG4gIGlmICghYXJpdHlXcmFwcGVyQ2FjaGVbbl0pIHtcbiAgICBhcml0eVdyYXBwZXJDYWNoZVtuXSA9IGNyZWF0ZUFyaXR5V3JhcHBlcihuKTtcbiAgfVxuXG4gIHJldHVybiBhcml0eVdyYXBwZXJDYWNoZVtuXShmdW5jKTtcbn07XG5cbi8qXG4gKiBFeHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gYXJpdHk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9AbmRob3VsZS9hcml0eS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogUHJvZHVjZSBhIG5ldyBhcnJheSBjb21wb3NlZCBvZiBhbGwgYnV0IHRoZSBmaXJzdCBgbmAgZWxlbWVudHMgb2YgYW4gaW5wdXQgYGNvbGxlY3Rpb25gLlxuICpcbiAqIEBuYW1lIGRyb3BcbiAqIEBhcGkgcHVibGljXG4gKiBAcGFyYW0ge251bWJlcn0gY291bnQgVGhlIG51bWJlciBvZiBlbGVtZW50cyB0byBkcm9wLlxuICogQHBhcmFtIHtBcnJheX0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgYXJyYXkgY29udGFpbmluZyBhbGwgYnV0IHRoZSBmaXJzdCBlbGVtZW50IGZyb20gYGNvbGxlY3Rpb25gLlxuICogQGV4YW1wbGVcbiAqIGRyb3AoMCwgWzEsIDIsIDNdKTsgLy8gPT4gWzEsIDIsIDNdXG4gKiBkcm9wKDEsIFsxLCAyLCAzXSk7IC8vID0+IFsyLCAzXVxuICogZHJvcCgyLCBbMSwgMiwgM10pOyAvLyA9PiBbM11cbiAqIGRyb3AoMywgWzEsIDIsIDNdKTsgLy8gPT4gW11cbiAqIGRyb3AoNCwgWzEsIDIsIDNdKTsgLy8gPT4gW11cbiAqL1xudmFyIGRyb3AgPSBmdW5jdGlvbiBkcm9wKGNvdW50LCBjb2xsZWN0aW9uKSB7XG4gIHZhciBsZW5ndGggPSBjb2xsZWN0aW9uID8gY29sbGVjdGlvbi5sZW5ndGggOiAwO1xuXG4gIGlmICghbGVuZ3RoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLy8gUHJlYWxsb2NhdGluZyBhbiBhcnJheSAqc2lnbmlmaWNhbnRseSogYm9vc3RzIHBlcmZvcm1hbmNlIHdoZW4gZGVhbGluZyB3aXRoXG4gIC8vIGBhcmd1bWVudHNgIG9iamVjdHMgb24gdjguIEZvciBhIHN1bW1hcnksIHNlZTpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3BldGthYW50b25vdi9ibHVlYmlyZC93aWtpL09wdGltaXphdGlvbi1raWxsZXJzIzMyLWxlYWtpbmctYXJndW1lbnRzXG4gIHZhciB0b0Ryb3AgPSBtYXgoTnVtYmVyKGNvdW50KSB8fCAwLCAwKTtcbiAgdmFyIHJlc3VsdHNMZW5ndGggPSBtYXgobGVuZ3RoIC0gdG9Ecm9wLCAwKTtcbiAgdmFyIHJlc3VsdHMgPSBuZXcgQXJyYXkocmVzdWx0c0xlbmd0aCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzTGVuZ3RoOyBpICs9IDEpIHtcbiAgICByZXN1bHRzW2ldID0gY29sbGVjdGlvbltpICsgdG9Ecm9wXTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHRzO1xufTtcblxuLypcbiAqIEV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBkcm9wO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQG5kaG91bGUvZHJvcC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG5cbi8qKlxuICogUHJvZHVjZSBhIG5ldyBhcnJheSBieSBwYXNzaW5nIGVhY2ggdmFsdWUgaW4gdGhlIGlucHV0IGBjb2xsZWN0aW9uYCB0aHJvdWdoIGEgdHJhbnNmb3JtYXRpdmVcbiAqIGBpdGVyYXRvcmAgZnVuY3Rpb24uIFRoZSBgaXRlcmF0b3JgIGZ1bmN0aW9uIGlzIHBhc3NlZCB0aHJlZSBhcmd1bWVudHM6XG4gKiBgKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbilgLlxuICpcbiAqIEBuYW1lIHJlc3RcbiAqIEBhcGkgcHVibGljXG4gKiBAcGFyYW0ge0FycmF5fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBhcnJheSBjb250YWluaW5nIGFsbCBidXQgdGhlIGZpcnN0IGVsZW1lbnQgZnJvbSBgY29sbGVjdGlvbmAuXG4gKiBAZXhhbXBsZVxuICogcmVzdChbMSwgMiwgM10pOyAvLyA9PiBbMiwgM11cbiAqL1xudmFyIHJlc3QgPSBmdW5jdGlvbiByZXN0KGNvbGxlY3Rpb24pIHtcbiAgaWYgKGNvbGxlY3Rpb24gPT0gbnVsbCB8fCAhY29sbGVjdGlvbi5sZW5ndGgpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvLyBQcmVhbGxvY2F0aW5nIGFuIGFycmF5ICpzaWduaWZpY2FudGx5KiBib29zdHMgcGVyZm9ybWFuY2Ugd2hlbiBkZWFsaW5nIHdpdGhcbiAgLy8gYGFyZ3VtZW50c2Agb2JqZWN0cyBvbiB2OC4gRm9yIGEgc3VtbWFyeSwgc2VlOlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vcGV0a2FhbnRvbm92L2JsdWViaXJkL3dpa2kvT3B0aW1pemF0aW9uLWtpbGxlcnMjMzItbGVha2luZy1hcmd1bWVudHNcbiAgdmFyIHJlc3VsdHMgPSBuZXcgQXJyYXkobWF4KGNvbGxlY3Rpb24ubGVuZ3RoIC0gMiwgMCkpO1xuXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgY29sbGVjdGlvbi5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHJlc3VsdHNbaSAtIDFdID0gY29sbGVjdGlvbltpXTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHRzO1xufTtcblxuLypcbiAqIEV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSByZXN0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQG5kaG91bGUvcmVzdC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiBnbG9iYWxzIF9fd2VicGFja19hbWRfb3B0aW9uc19fICovXHJcbm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgcGFyc2UgPSByZXF1aXJlKCdjb21wb25lbnQtdXJsJykucGFyc2U7XG52YXIgY29va2llID0gcmVxdWlyZSgnY29tcG9uZW50LWNvb2tpZScpO1xuXG4vKipcbiAqIEdldCB0aGUgdG9wIGRvbWFpbi5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gY29uc3RydWN0cyB0aGUgbGV2ZWxzIG9mIGRvbWFpbiBhbmQgYXR0ZW1wdHMgdG8gc2V0IGEgZ2xvYmFsXG4gKiBjb29raWUgb24gZWFjaCBvbmUgd2hlbiBpdCBzdWNjZWVkcyBpdCByZXR1cm5zIHRoZSB0b3AgbGV2ZWwgZG9tYWluLlxuICpcbiAqIFRoZSBtZXRob2QgcmV0dXJucyBhbiBlbXB0eSBzdHJpbmcgd2hlbiB0aGUgaG9zdG5hbWUgaXMgYW4gaXAgb3IgYGxvY2FsaG9zdGAuXG4gKlxuICogRXhhbXBsZSBsZXZlbHM6XG4gKlxuICogICAgICBkb21haW4ubGV2ZWxzKCdodHRwOi8vd3d3Lmdvb2dsZS5jby51aycpO1xuICogICAgICAvLyA9PiBbXCJjby51a1wiLCBcImdvb2dsZS5jby51a1wiLCBcInd3dy5nb29nbGUuY28udWtcIl1cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAgZG9tYWluKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvYmF6Jyk7XG4gKiAgICAgIC8vID0+ICcnXG4gKiAgICAgIGRvbWFpbignaHR0cDovL2RldjozMDAwL2JheicpO1xuICogICAgICAvLyA9PiAnJ1xuICogICAgICBkb21haW4oJ2h0dHA6Ly8xMjcuMC4wLjE6MzAwMC9iYXonKTtcbiAqICAgICAgLy8gPT4gJydcbiAqICAgICAgZG9tYWluKCdodHRwOi8vc2VnbWVudC5pby9iYXonKTtcbiAqICAgICAgLy8gPT4gJ3NlZ21lbnQuaW8nXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHJldHVybiB7c3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gZG9tYWluKHVybCkge1xuICB2YXIgY29va2llID0gZXhwb3J0cy5jb29raWU7XG4gIHZhciBsZXZlbHMgPSBleHBvcnRzLmxldmVscyh1cmwpO1xuXG4gIC8vIExvb2t1cCB0aGUgcmVhbCB0b3AgbGV2ZWwgb25lLlxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxldmVscy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBjbmFtZSA9ICdfX3RsZF9fJztcbiAgICB2YXIgZG9tYWluID0gbGV2ZWxzW2ldO1xuICAgIHZhciBvcHRzID0geyBkb21haW46ICcuJyArIGRvbWFpbiB9O1xuXG4gICAgY29va2llKGNuYW1lLCAxLCBvcHRzKTtcbiAgICBpZiAoY29va2llKGNuYW1lKSkge1xuICAgICAgY29va2llKGNuYW1lLCBudWxsLCBvcHRzKTtcbiAgICAgIHJldHVybiBkb21haW47XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIExldmVscyByZXR1cm5zIGFsbCBsZXZlbHMgb2YgdGhlIGdpdmVuIHVybC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cbmRvbWFpbi5sZXZlbHMgPSBmdW5jdGlvbih1cmwpIHtcbiAgdmFyIGhvc3QgPSBwYXJzZSh1cmwpLmhvc3RuYW1lO1xuICB2YXIgcGFydHMgPSBob3N0LnNwbGl0KCcuJyk7XG4gIHZhciBsYXN0ID0gcGFydHNbcGFydHMubGVuZ3RoIC0gMV07XG4gIHZhciBsZXZlbHMgPSBbXTtcblxuICAvLyBJcCBhZGRyZXNzLlxuICBpZiAocGFydHMubGVuZ3RoID09PSA0ICYmIGxhc3QgPT09IHBhcnNlSW50KGxhc3QsIDEwKSkge1xuICAgIHJldHVybiBsZXZlbHM7XG4gIH1cblxuICAvLyBMb2NhbGhvc3QuXG4gIGlmIChwYXJ0cy5sZW5ndGggPD0gMSkge1xuICAgIHJldHVybiBsZXZlbHM7XG4gIH1cblxuICAvLyBDcmVhdGUgbGV2ZWxzLlxuICBmb3IgKHZhciBpID0gcGFydHMubGVuZ3RoIC0gMjsgaSA+PSAwOyAtLWkpIHtcbiAgICBsZXZlbHMucHVzaChwYXJ0cy5zbGljZShpKS5qb2luKCcuJykpO1xuICB9XG5cbiAgcmV0dXJuIGxldmVscztcbn07XG5cbi8qKlxuICogRXhwb3NlIGNvb2tpZSBvbiBkb21haW4uXG4gKi9cbmRvbWFpbi5jb29raWUgPSBjb29raWU7XG5cbi8qXG4gKiBFeHBvcnRzLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGRvbWFpbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L3RvcC1kb21haW4vbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBFbnRpdHkgPSByZXF1aXJlKCcuL2VudGl0eScpO1xudmFyIGJpbmRBbGwgPSByZXF1aXJlKCdiaW5kLWFsbCcpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnYW5hbHl0aWNzOmdyb3VwJyk7XG52YXIgaW5oZXJpdCA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbi8qKlxuICogR3JvdXAgZGVmYXVsdHNcbiAqL1xuXG5Hcm91cC5kZWZhdWx0cyA9IHtcbiAgcGVyc2lzdDogdHJ1ZSxcbiAgY29va2llOiB7XG4gICAga2V5OiAnYWpzX2dyb3VwX2lkJ1xuICB9LFxuICBsb2NhbFN0b3JhZ2U6IHtcbiAgICBrZXk6ICdhanNfZ3JvdXBfcHJvcGVydGllcydcbiAgfVxufTtcblxuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEdyb3VwYCB3aXRoIGBvcHRpb25zYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5cbmZ1bmN0aW9uIEdyb3VwKG9wdGlvbnMpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IEdyb3VwLmRlZmF1bHRzO1xuICB0aGlzLmRlYnVnID0gZGVidWc7XG4gIEVudGl0eS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xufVxuXG5cbi8qKlxuICogSW5oZXJpdCBgRW50aXR5YFxuICovXG5cbmluaGVyaXQoR3JvdXAsIEVudGl0eSk7XG5cblxuLyoqXG4gKiBFeHBvc2UgdGhlIGdyb3VwIHNpbmdsZXRvbi5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmRBbGwobmV3IEdyb3VwKCkpO1xuXG5cbi8qKlxuICogRXhwb3NlIHRoZSBgR3JvdXBgIGNvbnN0cnVjdG9yLlxuICovXG5cbm1vZHVsZS5leHBvcnRzLkdyb3VwID0gR3JvdXA7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9hbmFseXRpY3MuanMtY29yZS9saWIvZ3JvdXAuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBKU09OID0gcmVxdWlyZSgnanNvbjMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG5cdC8vIFN0b3JlLmpzXG5cdHZhciBzdG9yZSA9IHt9LFxuXHRcdHdpbiA9ICh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKSxcblx0XHRkb2MgPSB3aW4uZG9jdW1lbnQsXG5cdFx0bG9jYWxTdG9yYWdlTmFtZSA9ICdsb2NhbFN0b3JhZ2UnLFxuXHRcdHNjcmlwdFRhZyA9ICdzY3JpcHQnLFxuXHRcdHN0b3JhZ2VcblxuXHRzdG9yZS5kaXNhYmxlZCA9IGZhbHNlXG5cdHN0b3JlLnZlcnNpb24gPSAnMS4zLjIwJ1xuXHRzdG9yZS5zZXQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7fVxuXHRzdG9yZS5nZXQgPSBmdW5jdGlvbihrZXksIGRlZmF1bHRWYWwpIHt9XG5cdHN0b3JlLmhhcyA9IGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gc3RvcmUuZ2V0KGtleSkgIT09IHVuZGVmaW5lZCB9XG5cdHN0b3JlLnJlbW92ZSA9IGZ1bmN0aW9uKGtleSkge31cblx0c3RvcmUuY2xlYXIgPSBmdW5jdGlvbigpIHt9XG5cdHN0b3JlLnRyYW5zYWN0ID0gZnVuY3Rpb24oa2V5LCBkZWZhdWx0VmFsLCB0cmFuc2FjdGlvbkZuKSB7XG5cdFx0aWYgKHRyYW5zYWN0aW9uRm4gPT0gbnVsbCkge1xuXHRcdFx0dHJhbnNhY3Rpb25GbiA9IGRlZmF1bHRWYWxcblx0XHRcdGRlZmF1bHRWYWwgPSBudWxsXG5cdFx0fVxuXHRcdGlmIChkZWZhdWx0VmFsID09IG51bGwpIHtcblx0XHRcdGRlZmF1bHRWYWwgPSB7fVxuXHRcdH1cblx0XHR2YXIgdmFsID0gc3RvcmUuZ2V0KGtleSwgZGVmYXVsdFZhbClcblx0XHR0cmFuc2FjdGlvbkZuKHZhbClcblx0XHRzdG9yZS5zZXQoa2V5LCB2YWwpXG5cdH1cblx0c3RvcmUuZ2V0QWxsID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHJldCA9IHt9XG5cdFx0c3RvcmUuZm9yRWFjaChmdW5jdGlvbihrZXksIHZhbCkge1xuXHRcdFx0cmV0W2tleV0gPSB2YWxcblx0XHR9KVxuXHRcdHJldHVybiByZXRcblx0fVxuXHRzdG9yZS5mb3JFYWNoID0gZnVuY3Rpb24oKSB7fVxuXHRzdG9yZS5zZXJpYWxpemUgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcblx0fVxuXHRzdG9yZS5kZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgeyByZXR1cm4gdW5kZWZpbmVkIH1cblx0XHR0cnkgeyByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSkgfVxuXHRcdGNhdGNoKGUpIHsgcmV0dXJuIHZhbHVlIHx8IHVuZGVmaW5lZCB9XG5cdH1cblxuXHQvLyBGdW5jdGlvbnMgdG8gZW5jYXBzdWxhdGUgcXVlc3Rpb25hYmxlIEZpcmVGb3ggMy42LjEzIGJlaGF2aW9yXG5cdC8vIHdoZW4gYWJvdXQuY29uZmlnOjpkb20uc3RvcmFnZS5lbmFibGVkID09PSBmYWxzZVxuXHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21hcmN1c3dlc3Rpbi9zdG9yZS5qcy9pc3N1ZXMjaXNzdWUvMTNcblx0ZnVuY3Rpb24gaXNMb2NhbFN0b3JhZ2VOYW1lU3VwcG9ydGVkKCkge1xuXHRcdHRyeSB7IHJldHVybiAobG9jYWxTdG9yYWdlTmFtZSBpbiB3aW4gJiYgd2luW2xvY2FsU3RvcmFnZU5hbWVdKSB9XG5cdFx0Y2F0Y2goZXJyKSB7IHJldHVybiBmYWxzZSB9XG5cdH1cblxuXHRpZiAoaXNMb2NhbFN0b3JhZ2VOYW1lU3VwcG9ydGVkKCkpIHtcblx0XHRzdG9yYWdlID0gd2luW2xvY2FsU3RvcmFnZU5hbWVdXG5cdFx0c3RvcmUuc2V0ID0gZnVuY3Rpb24oa2V5LCB2YWwpIHtcblx0XHRcdGlmICh2YWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gc3RvcmUucmVtb3ZlKGtleSkgfVxuXHRcdFx0c3RvcmFnZS5zZXRJdGVtKGtleSwgc3RvcmUuc2VyaWFsaXplKHZhbCkpXG5cdFx0XHRyZXR1cm4gdmFsXG5cdFx0fVxuXHRcdHN0b3JlLmdldCA9IGZ1bmN0aW9uKGtleSwgZGVmYXVsdFZhbCkge1xuXHRcdFx0dmFyIHZhbCA9IHN0b3JlLmRlc2VyaWFsaXplKHN0b3JhZ2UuZ2V0SXRlbShrZXkpKVxuXHRcdFx0cmV0dXJuICh2YWwgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWwgOiB2YWwpXG5cdFx0fVxuXHRcdHN0b3JlLnJlbW92ZSA9IGZ1bmN0aW9uKGtleSkgeyBzdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KSB9XG5cdFx0c3RvcmUuY2xlYXIgPSBmdW5jdGlvbigpIHsgc3RvcmFnZS5jbGVhcigpIH1cblx0XHRzdG9yZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0XHRcdGZvciAodmFyIGk9MDsgaTxzdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBrZXkgPSBzdG9yYWdlLmtleShpKVxuXHRcdFx0XHRjYWxsYmFjayhrZXksIHN0b3JlLmdldChrZXkpKVxuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIGlmIChkb2MgJiYgZG9jLmRvY3VtZW50RWxlbWVudC5hZGRCZWhhdmlvcikge1xuXHRcdHZhciBzdG9yYWdlT3duZXIsXG5cdFx0XHRzdG9yYWdlQ29udGFpbmVyXG5cdFx0Ly8gU2luY2UgI3VzZXJEYXRhIHN0b3JhZ2UgYXBwbGllcyBvbmx5IHRvIHNwZWNpZmljIHBhdGhzLCB3ZSBuZWVkIHRvXG5cdFx0Ly8gc29tZWhvdyBsaW5rIG91ciBkYXRhIHRvIGEgc3BlY2lmaWMgcGF0aC4gIFdlIGNob29zZSAvZmF2aWNvbi5pY29cblx0XHQvLyBhcyBhIHByZXR0eSBzYWZlIG9wdGlvbiwgc2luY2UgYWxsIGJyb3dzZXJzIGFscmVhZHkgbWFrZSBhIHJlcXVlc3QgdG9cblx0XHQvLyB0aGlzIFVSTCBhbnl3YXkgYW5kIGJlaW5nIGEgNDA0IHdpbGwgbm90IGh1cnQgdXMgaGVyZS4gIFdlIHdyYXAgYW5cblx0XHQvLyBpZnJhbWUgcG9pbnRpbmcgdG8gdGhlIGZhdmljb24gaW4gYW4gQWN0aXZlWE9iamVjdChodG1sZmlsZSkgb2JqZWN0XG5cdFx0Ly8gKHNlZTogaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2FhNzUyNTc0KHY9VlMuODUpLmFzcHgpXG5cdFx0Ly8gc2luY2UgdGhlIGlmcmFtZSBhY2Nlc3MgcnVsZXMgYXBwZWFyIHRvIGFsbG93IGRpcmVjdCBhY2Nlc3MgYW5kXG5cdFx0Ly8gbWFuaXB1bGF0aW9uIG9mIHRoZSBkb2N1bWVudCBlbGVtZW50LCBldmVuIGZvciBhIDQwNCBwYWdlLiAgVGhpc1xuXHRcdC8vIGRvY3VtZW50IGNhbiBiZSB1c2VkIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgZG9jdW1lbnQgKHdoaWNoIHdvdWxkXG5cdFx0Ly8gaGF2ZSBiZWVuIGxpbWl0ZWQgdG8gdGhlIGN1cnJlbnQgcGF0aCkgdG8gcGVyZm9ybSAjdXNlckRhdGEgc3RvcmFnZS5cblx0XHR0cnkge1xuXHRcdFx0c3RvcmFnZUNvbnRhaW5lciA9IG5ldyBBY3RpdmVYT2JqZWN0KCdodG1sZmlsZScpXG5cdFx0XHRzdG9yYWdlQ29udGFpbmVyLm9wZW4oKVxuXHRcdFx0c3RvcmFnZUNvbnRhaW5lci53cml0ZSgnPCcrc2NyaXB0VGFnKyc+ZG9jdW1lbnQudz13aW5kb3c8Lycrc2NyaXB0VGFnKyc+PGlmcmFtZSBzcmM9XCIvZmF2aWNvbi5pY29cIj48L2lmcmFtZT4nKVxuXHRcdFx0c3RvcmFnZUNvbnRhaW5lci5jbG9zZSgpXG5cdFx0XHRzdG9yYWdlT3duZXIgPSBzdG9yYWdlQ29udGFpbmVyLncuZnJhbWVzWzBdLmRvY3VtZW50XG5cdFx0XHRzdG9yYWdlID0gc3RvcmFnZU93bmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0fSBjYXRjaChlKSB7XG5cdFx0XHQvLyBzb21laG93IEFjdGl2ZVhPYmplY3QgaW5zdGFudGlhdGlvbiBmYWlsZWQgKHBlcmhhcHMgc29tZSBzcGVjaWFsXG5cdFx0XHQvLyBzZWN1cml0eSBzZXR0aW5ncyBvciBvdGhlcndzZSksIGZhbGwgYmFjayB0byBwZXItcGF0aCBzdG9yYWdlXG5cdFx0XHRzdG9yYWdlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0XHRzdG9yYWdlT3duZXIgPSBkb2MuYm9keVxuXHRcdH1cblx0XHR2YXIgd2l0aElFU3RvcmFnZSA9IGZ1bmN0aW9uKHN0b3JlRnVuY3Rpb24pIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApXG5cdFx0XHRcdGFyZ3MudW5zaGlmdChzdG9yYWdlKVxuXHRcdFx0XHQvLyBTZWUgaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTMxMDgxKHY9VlMuODUpLmFzcHhcblx0XHRcdFx0Ly8gYW5kIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzMTQyNCh2PVZTLjg1KS5hc3B4XG5cdFx0XHRcdHN0b3JhZ2VPd25lci5hcHBlbmRDaGlsZChzdG9yYWdlKVxuXHRcdFx0XHRzdG9yYWdlLmFkZEJlaGF2aW9yKCcjZGVmYXVsdCN1c2VyRGF0YScpXG5cdFx0XHRcdHN0b3JhZ2UubG9hZChsb2NhbFN0b3JhZ2VOYW1lKVxuXHRcdFx0XHR2YXIgcmVzdWx0ID0gc3RvcmVGdW5jdGlvbi5hcHBseShzdG9yZSwgYXJncylcblx0XHRcdFx0c3RvcmFnZU93bmVyLnJlbW92ZUNoaWxkKHN0b3JhZ2UpXG5cdFx0XHRcdHJldHVybiByZXN1bHRcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJbiBJRTcsIGtleXMgY2Fubm90IHN0YXJ0IHdpdGggYSBkaWdpdCBvciBjb250YWluIGNlcnRhaW4gY2hhcnMuXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJjdXN3ZXN0aW4vc3RvcmUuanMvaXNzdWVzLzQwXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJjdXN3ZXN0aW4vc3RvcmUuanMvaXNzdWVzLzgzXG5cdFx0dmFyIGZvcmJpZGRlbkNoYXJzUmVnZXggPSBuZXcgUmVnRXhwKFwiWyFcXFwiIyQlJicoKSorLC9cXFxcXFxcXDo7PD0+P0BbXFxcXF1eYHt8fX5dXCIsIFwiZ1wiKVxuXHRcdHZhciBpZUtleUZpeCA9IGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0cmV0dXJuIGtleS5yZXBsYWNlKC9eZC8sICdfX18kJicpLnJlcGxhY2UoZm9yYmlkZGVuQ2hhcnNSZWdleCwgJ19fXycpXG5cdFx0fVxuXHRcdHN0b3JlLnNldCA9IHdpdGhJRVN0b3JhZ2UoZnVuY3Rpb24oc3RvcmFnZSwga2V5LCB2YWwpIHtcblx0XHRcdGtleSA9IGllS2V5Rml4KGtleSlcblx0XHRcdGlmICh2YWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gc3RvcmUucmVtb3ZlKGtleSkgfVxuXHRcdFx0c3RvcmFnZS5zZXRBdHRyaWJ1dGUoa2V5LCBzdG9yZS5zZXJpYWxpemUodmFsKSlcblx0XHRcdHN0b3JhZ2Uuc2F2ZShsb2NhbFN0b3JhZ2VOYW1lKVxuXHRcdFx0cmV0dXJuIHZhbFxuXHRcdH0pXG5cdFx0c3RvcmUuZ2V0ID0gd2l0aElFU3RvcmFnZShmdW5jdGlvbihzdG9yYWdlLCBrZXksIGRlZmF1bHRWYWwpIHtcblx0XHRcdGtleSA9IGllS2V5Rml4KGtleSlcblx0XHRcdHZhciB2YWwgPSBzdG9yZS5kZXNlcmlhbGl6ZShzdG9yYWdlLmdldEF0dHJpYnV0ZShrZXkpKVxuXHRcdFx0cmV0dXJuICh2YWwgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWwgOiB2YWwpXG5cdFx0fSlcblx0XHRzdG9yZS5yZW1vdmUgPSB3aXRoSUVTdG9yYWdlKGZ1bmN0aW9uKHN0b3JhZ2UsIGtleSkge1xuXHRcdFx0a2V5ID0gaWVLZXlGaXgoa2V5KVxuXHRcdFx0c3RvcmFnZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KVxuXHRcdFx0c3RvcmFnZS5zYXZlKGxvY2FsU3RvcmFnZU5hbWUpXG5cdFx0fSlcblx0XHRzdG9yZS5jbGVhciA9IHdpdGhJRVN0b3JhZ2UoZnVuY3Rpb24oc3RvcmFnZSkge1xuXHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSBzdG9yYWdlLlhNTERvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hdHRyaWJ1dGVzXG5cdFx0XHRzdG9yYWdlLmxvYWQobG9jYWxTdG9yYWdlTmFtZSlcblx0XHRcdGZvciAodmFyIGk9YXR0cmlidXRlcy5sZW5ndGgtMTsgaT49MDsgaS0tKSB7XG5cdFx0XHRcdHN0b3JhZ2UucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZXNbaV0ubmFtZSlcblx0XHRcdH1cblx0XHRcdHN0b3JhZ2Uuc2F2ZShsb2NhbFN0b3JhZ2VOYW1lKVxuXHRcdH0pXG5cdFx0c3RvcmUuZm9yRWFjaCA9IHdpdGhJRVN0b3JhZ2UoZnVuY3Rpb24oc3RvcmFnZSwgY2FsbGJhY2spIHtcblx0XHRcdHZhciBhdHRyaWJ1dGVzID0gc3RvcmFnZS5YTUxEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXR0cmlidXRlc1xuXHRcdFx0Zm9yICh2YXIgaT0wLCBhdHRyOyBhdHRyPWF0dHJpYnV0ZXNbaV07ICsraSkge1xuXHRcdFx0XHRjYWxsYmFjayhhdHRyLm5hbWUsIHN0b3JlLmRlc2VyaWFsaXplKHN0b3JhZ2UuZ2V0QXR0cmlidXRlKGF0dHIubmFtZSkpKVxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cblxuXHR0cnkge1xuXHRcdHZhciB0ZXN0S2V5ID0gJ19fc3RvcmVqc19fJ1xuXHRcdHN0b3JlLnNldCh0ZXN0S2V5LCB0ZXN0S2V5KVxuXHRcdGlmIChzdG9yZS5nZXQodGVzdEtleSkgIT0gdGVzdEtleSkgeyBzdG9yZS5kaXNhYmxlZCA9IHRydWUgfVxuXHRcdHN0b3JlLnJlbW92ZSh0ZXN0S2V5KVxuXHR9IGNhdGNoKGUpIHtcblx0XHRzdG9yZS5kaXNhYmxlZCA9IHRydWVcblx0fVxuXHRzdG9yZS5lbmFibGVkID0gIXN0b3JlLmRpc2FibGVkXG5cdFxuXHRyZXR1cm4gc3RvcmVcbn0oKSlcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L3N0b3JlL3NyYy9zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBpc01ldGEoZSkge1xuICBpZiAoZS5tZXRhS2V5IHx8IGUuYWx0S2V5IHx8IGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBMb2dpYyB0aGF0IGhhbmRsZXMgY2hlY2tzIGZvciB0aGUgbWlkZGxlIG1vdXNlIGJ1dHRvbiwgYmFzZWRcbiAgLy8gb24gW2pRdWVyeV0oaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvYmxvYi9tYXN0ZXIvc3JjL2V2ZW50LmpzI0w0NjYpLlxuICB2YXIgd2hpY2ggPSBlLndoaWNoO1xuICB2YXIgYnV0dG9uID0gZS5idXR0b247XG4gIGlmICghd2hpY2ggJiYgYnV0dG9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZSwgbm8tZXh0cmEtcGFyZW5zXG4gICAgcmV0dXJuICghYnV0dG9uICYgMSkgJiYgKCFidXR0b24gJiAyKSAmJiAoYnV0dG9uICYgNCk7XG4gIH0gZWxzZSBpZiAod2hpY2ggPT09IDIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLypcbiAqIEV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBpc01ldGE7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9pcy1tZXRhL2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkge1xuICBpZiAodGltZW91dCkge1xuICAgIHRpbWVvdXQuY2xvc2UoKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbCh3aW5kb3csIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBzZXRpbW1lZGlhdGUgYXR0YWNoZXMgaXRzZWxmIHRvIHRoZSBnbG9iYWwgb2JqZWN0XG5yZXF1aXJlKFwic2V0aW1tZWRpYXRlXCIpO1xuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gY2xlYXJJbW1lZGlhdGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSA2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgdW5kZWZpbmVkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG5leHRIYW5kbGUgPSAxOyAvLyBTcGVjIHNheXMgZ3JlYXRlciB0aGFuIHplcm9cbiAgICB2YXIgdGFza3NCeUhhbmRsZSA9IHt9O1xuICAgIHZhciBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICB2YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuICAgIHZhciByZWdpc3RlckltbWVkaWF0ZTtcblxuICAgIGZ1bmN0aW9uIHNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuICAgICAgLy8gQ2FsbGJhY2sgY2FuIGVpdGhlciBiZSBhIGZ1bmN0aW9uIG9yIGEgc3RyaW5nXG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBuZXcgRnVuY3Rpb24oXCJcIiArIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIC8vIENvcHkgZnVuY3Rpb24gYXJndW1lbnRzXG4gICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAxXTtcbiAgICAgIH1cbiAgICAgIC8vIFN0b3JlIGFuZCByZWdpc3RlciB0aGUgdGFza1xuICAgICAgdmFyIHRhc2sgPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgYXJnczogYXJncyB9O1xuICAgICAgdGFza3NCeUhhbmRsZVtuZXh0SGFuZGxlXSA9IHRhc2s7XG4gICAgICByZWdpc3RlckltbWVkaWF0ZShuZXh0SGFuZGxlKTtcbiAgICAgIHJldHVybiBuZXh0SGFuZGxlKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaGFuZGxlKSB7XG4gICAgICAgIGRlbGV0ZSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuKHRhc2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGFzay5jYWxsYmFjaztcbiAgICAgICAgdmFyIGFyZ3MgPSB0YXNrLmFyZ3M7XG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuSWZQcmVzZW50KGhhbmRsZSkge1xuICAgICAgICAvLyBGcm9tIHRoZSBzcGVjOiBcIldhaXQgdW50aWwgYW55IGludm9jYXRpb25zIG9mIHRoaXMgYWxnb3JpdGhtIHN0YXJ0ZWQgYmVmb3JlIHRoaXMgb25lIGhhdmUgY29tcGxldGVkLlwiXG4gICAgICAgIC8vIFNvIGlmIHdlJ3JlIGN1cnJlbnRseSBydW5uaW5nIGEgdGFzaywgd2UnbGwgbmVlZCB0byBkZWxheSB0aGlzIGludm9jYXRpb24uXG4gICAgICAgIGlmIChjdXJyZW50bHlSdW5uaW5nQVRhc2spIHtcbiAgICAgICAgICAgIC8vIERlbGF5IGJ5IGRvaW5nIGEgc2V0VGltZW91dC4gc2V0SW1tZWRpYXRlIHdhcyB0cmllZCBpbnN0ZWFkLCBidXQgaW4gRmlyZWZveCA3IGl0IGdlbmVyYXRlZCBhXG4gICAgICAgICAgICAvLyBcInRvbyBtdWNoIHJlY3Vyc2lvblwiIGVycm9yLlxuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGFzayA9IHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICAgICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBydW4odGFzayk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbW1lZGlhdGUoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHsgcnVuSWZQcmVzZW50KGhhbmRsZSk7IH0pO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhblVzZVBvc3RNZXNzYWdlKCkge1xuICAgICAgICAvLyBUaGUgdGVzdCBhZ2FpbnN0IGBpbXBvcnRTY3JpcHRzYCBwcmV2ZW50cyB0aGlzIGltcGxlbWVudGF0aW9uIGZyb20gYmVpbmcgaW5zdGFsbGVkIGluc2lkZSBhIHdlYiB3b3JrZXIsXG4gICAgICAgIC8vIHdoZXJlIGBnbG9iYWwucG9zdE1lc3NhZ2VgIG1lYW5zIHNvbWV0aGluZyBjb21wbGV0ZWx5IGRpZmZlcmVudCBhbmQgY2FuJ3QgYmUgdXNlZCBmb3IgdGhpcyBwdXJwb3NlLlxuICAgICAgICBpZiAoZ2xvYmFsLnBvc3RNZXNzYWdlICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgICAgICAgICAgdmFyIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG9sZE9uTWVzc2FnZSA9IGdsb2JhbC5vbm1lc3NhZ2U7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShcIlwiLCBcIipcIik7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gb2xkT25NZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgLy8gSW5zdGFsbHMgYW4gZXZlbnQgaGFuZGxlciBvbiBgZ2xvYmFsYCBmb3IgdGhlIGBtZXNzYWdlYCBldmVudDogc2VlXG4gICAgICAgIC8vICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL3dpbmRvdy5wb3N0TWVzc2FnZVxuICAgICAgICAvLyAqIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL2NvbW1zLmh0bWwjY3Jvc3NEb2N1bWVudE1lc3NhZ2VzXG5cbiAgICAgICAgdmFyIG1lc3NhZ2VQcmVmaXggPSBcInNldEltbWVkaWF0ZSRcIiArIE1hdGgucmFuZG9tKCkgKyBcIiRcIjtcbiAgICAgICAgdmFyIG9uR2xvYmFsTWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBnbG9iYWwgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgZXZlbnQuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuaW5kZXhPZihtZXNzYWdlUHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudCgrZXZlbnQuZGF0YS5zbGljZShtZXNzYWdlUHJlZml4Lmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KFwib25tZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKG1lc3NhZ2VQcmVmaXggKyBoYW5kbGUsIFwiKlwiKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZShoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIDxzY3JpcHQ+IGVsZW1lbnQ7IGl0cyByZWFkeXN0YXRlY2hhbmdlIGV2ZW50IHdpbGwgYmUgZmlyZWQgYXN5bmNocm9ub3VzbHkgb25jZSBpdCBpcyBpbnNlcnRlZFxuICAgICAgICAgICAgLy8gaW50byB0aGUgZG9jdW1lbnQuIERvIHNvLCB0aHVzIHF1ZXVpbmcgdXAgdGhlIHRhc2suIFJlbWVtYmVyIHRvIGNsZWFuIHVwIG9uY2UgaXQncyBiZWVuIGNhbGxlZC5cbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaHRtbC5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgICAgIHNjcmlwdCA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaHRtbC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJZiBzdXBwb3J0ZWQsIHdlIHNob3VsZCBhdHRhY2ggdG8gdGhlIHByb3RvdHlwZSBvZiBnbG9iYWwsIHNpbmNlIHRoYXQgaXMgd2hlcmUgc2V0VGltZW91dCBldCBhbC4gbGl2ZS5cbiAgICB2YXIgYXR0YWNoVG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbCk7XG4gICAgYXR0YWNoVG8gPSBhdHRhY2hUbyAmJiBhdHRhY2hUby5zZXRUaW1lb3V0ID8gYXR0YWNoVG8gOiBnbG9iYWw7XG5cbiAgICAvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IGUuZy4gYnJvd3NlcmlmeSBlbnZpcm9ubWVudHMuXG4gICAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoZ2xvYmFsLnByb2Nlc3MpID09PSBcIltvYmplY3QgcHJvY2Vzc11cIikge1xuICAgICAgICAvLyBGb3IgTm9kZS5qcyBiZWZvcmUgMC45XG4gICAgICAgIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGNhblVzZVBvc3RNZXNzYWdlKCkpIHtcbiAgICAgICAgLy8gRm9yIG5vbi1JRTEwIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChnbG9iYWwuTWVzc2FnZUNoYW5uZWwpIHtcbiAgICAgICAgLy8gRm9yIHdlYiB3b3JrZXJzLCB3aGVyZSBzdXBwb3J0ZWRcbiAgICAgICAgaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZG9jICYmIFwib25yZWFkeXN0YXRlY2hhbmdlXCIgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIikpIHtcbiAgICAgICAgLy8gRm9yIElFIDbigJM4XG4gICAgICAgIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciBvbGRlciBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCk7XG4gICAgfVxuXG4gICAgYXR0YWNoVG8uc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlO1xuICAgIGF0dGFjaFRvLmNsZWFySW1tZWRpYXRlID0gY2xlYXJJbW1lZGlhdGU7XG59KHR5cGVvZiBzZWxmID09PSBcInVuZGVmaW5lZFwiID8gdHlwZW9mIGdsb2JhbCA9PT0gXCJ1bmRlZmluZWRcIiA/IHRoaXMgOiBnbG9iYWwgOiBzZWxmKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zZXRpbW1lZGlhdGUvc2V0SW1tZWRpYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIERlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdhbmFseXRpY3MuanM6bm9ybWFsaXplJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCdAbmRob3VsZS9kZWZhdWx0cycpO1xudmFyIGVhY2ggPSByZXF1aXJlKCdAbmRob3VsZS9lYWNoJyk7XG52YXIgaW5jbHVkZXMgPSByZXF1aXJlKCdAbmRob3VsZS9pbmNsdWRlcycpO1xudmFyIG1hcCA9IHJlcXVpcmUoJ0BuZGhvdWxlL21hcCcpO1xudmFyIHR5cGUgPSByZXF1aXJlKCdjb21wb25lbnQtdHlwZScpO1xuXG4vKipcbiAqIEhPUC5cbiAqL1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBFeHBvc2UgYG5vcm1hbGl6ZWBcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5vcm1hbGl6ZTtcblxuLyoqXG4gKiBUb3BsZXZlbCBwcm9wZXJ0aWVzLlxuICovXG5cbnZhciB0b3BsZXZlbCA9IFtcbiAgJ2ludGVncmF0aW9ucycsXG4gICdhbm9ueW1vdXNJZCcsXG4gICd0aW1lc3RhbXAnLFxuICAnY29udGV4dCdcbl07XG5cbi8qKlxuICogTm9ybWFsaXplIGBtc2dgIGJhc2VkIG9uIGludGVncmF0aW9ucyBgbGlzdGAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG1zZ1xuICogQHBhcmFtIHtBcnJheX0gbGlzdFxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cblxuZnVuY3Rpb24gbm9ybWFsaXplKG1zZywgbGlzdCkge1xuICB2YXIgbG93ZXIgPSBtYXAoZnVuY3Rpb24ocykgeyByZXR1cm4gcy50b0xvd2VyQ2FzZSgpOyB9LCBsaXN0KTtcbiAgdmFyIG9wdHMgPSBtc2cub3B0aW9ucyB8fCB7fTtcbiAgdmFyIGludGVncmF0aW9ucyA9IG9wdHMuaW50ZWdyYXRpb25zIHx8IHt9O1xuICB2YXIgcHJvdmlkZXJzID0gb3B0cy5wcm92aWRlcnMgfHwge307XG4gIHZhciBjb250ZXh0ID0gb3B0cy5jb250ZXh0IHx8IHt9O1xuICB2YXIgcmV0ID0ge307XG4gIGRlYnVnKCc8LScsIG1zZyk7XG5cbiAgLy8gaW50ZWdyYXRpb25zLlxuICBlYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICBpZiAoIWludGVncmF0aW9uKGtleSkpIHJldHVybjtcbiAgICBpZiAoIWhhcy5jYWxsKGludGVncmF0aW9ucywga2V5KSkgaW50ZWdyYXRpb25zW2tleV0gPSB2YWx1ZTtcbiAgICBkZWxldGUgb3B0c1trZXldO1xuICB9LCBvcHRzKTtcblxuICAvLyBwcm92aWRlcnMuXG4gIGRlbGV0ZSBvcHRzLnByb3ZpZGVycztcbiAgZWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgaWYgKCFpbnRlZ3JhdGlvbihrZXkpKSByZXR1cm47XG4gICAgaWYgKHR5cGUoaW50ZWdyYXRpb25zW2tleV0pID09PSAnb2JqZWN0JykgcmV0dXJuO1xuICAgIGlmIChoYXMuY2FsbChpbnRlZ3JhdGlvbnMsIGtleSkgJiYgdHlwZW9mIHByb3ZpZGVyc1trZXldID09PSAnYm9vbGVhbicpIHJldHVybjtcbiAgICBpbnRlZ3JhdGlvbnNba2V5XSA9IHZhbHVlO1xuICB9LCBwcm92aWRlcnMpO1xuXG4gIC8vIG1vdmUgYWxsIHRvcGxldmVsIG9wdGlvbnMgdG8gbXNnXG4gIC8vIGFuZCB0aGUgcmVzdCB0byBjb250ZXh0LlxuICBlYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICBpZiAoaW5jbHVkZXMoa2V5LCB0b3BsZXZlbCkpIHtcbiAgICAgIHJldFtrZXldID0gb3B0c1trZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZXh0W2tleV0gPSBvcHRzW2tleV07XG4gICAgfVxuICB9LCBvcHRzKTtcblxuICAvLyBjbGVhbnVwXG4gIGRlbGV0ZSBtc2cub3B0aW9ucztcbiAgcmV0LmludGVncmF0aW9ucyA9IGludGVncmF0aW9ucztcbiAgcmV0LmNvbnRleHQgPSBjb250ZXh0O1xuICByZXQgPSBkZWZhdWx0cyhyZXQsIG1zZyk7XG4gIGRlYnVnKCctPicsIHJldCk7XG4gIHJldHVybiByZXQ7XG5cbiAgZnVuY3Rpb24gaW50ZWdyYXRpb24obmFtZSkge1xuICAgIHJldHVybiAhIShpbmNsdWRlcyhuYW1lLCBsaXN0KSB8fCBuYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhbGwnIHx8IGluY2x1ZGVzKG5hbWUudG9Mb3dlckNhc2UoKSwgbG93ZXIpKTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvYW5hbHl0aWNzLmpzLWNvcmUvbGliL25vcm1hbGl6ZS5qc1xuLy8gbW9kdWxlIGlkID0gNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGJpbmQgPSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdhdHRhY2hFdmVudCcsXG4gICAgdW5iaW5kID0gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIgPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnZGV0YWNoRXZlbnQnLFxuICAgIHByZWZpeCA9IGJpbmQgIT09ICdhZGRFdmVudExpc3RlbmVyJyA/ICdvbicgOiAnJztcblxuLyoqXG4gKiBCaW5kIGBlbGAgZXZlbnQgYHR5cGVgIHRvIGBmbmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGNhcHR1cmVcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmJpbmQgPSBmdW5jdGlvbihlbCwgdHlwZSwgZm4sIGNhcHR1cmUpe1xuICBlbFtiaW5kXShwcmVmaXggKyB0eXBlLCBmbiwgY2FwdHVyZSB8fCBmYWxzZSk7XG4gIHJldHVybiBmbjtcbn07XG5cbi8qKlxuICogVW5iaW5kIGBlbGAgZXZlbnQgYHR5cGVgJ3MgY2FsbGJhY2sgYGZuYC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gY2FwdHVyZVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMudW5iaW5kID0gZnVuY3Rpb24oZWwsIHR5cGUsIGZuLCBjYXB0dXJlKXtcbiAgZWxbdW5iaW5kXShwcmVmaXggKyB0eXBlLCBmbiwgY2FwdHVyZSB8fCBmYWxzZSk7XG4gIHJldHVybiBmbjtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWV2ZW50L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBjYW5vbmljYWwgPSByZXF1aXJlKCdAc2VnbWVudC9jYW5vbmljYWwnKTtcbnZhciBpbmNsdWRlcyA9IHJlcXVpcmUoJ0BuZGhvdWxlL2luY2x1ZGVzJyk7XG52YXIgdXJsID0gcmVxdWlyZSgnY29tcG9uZW50LXVybCcpO1xuXG4vKipcbiAqIFJldHVybiBhIGRlZmF1bHQgYG9wdGlvbnMuY29udGV4dC5wYWdlYCBvYmplY3QuXG4gKlxuICogaHR0cHM6Ly9zZWdtZW50LmNvbS9kb2NzL3NwZWMvcGFnZS8jcHJvcGVydGllc1xuICpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiBwYWdlRGVmYXVsdHMoKSB7XG4gIHJldHVybiB7XG4gICAgcGF0aDogY2Fub25pY2FsUGF0aCgpLFxuICAgIHJlZmVycmVyOiBkb2N1bWVudC5yZWZlcnJlcixcbiAgICBzZWFyY2g6IHNlYXJjaFBhdGgoKSxcbiAgICB0aXRsZTogZG9jdW1lbnQudGl0bGUsXG4gICAgdXJsOiBjYW5vbmljYWxVcmwobG9jYXRpb24uc2VhcmNoKVxuICB9O1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgY2Fub25pY2FsIHBhdGggZm9yIHRoZSBwYWdlLlxuICpcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiBjYW5vbmljYWxQYXRoKCkge1xuICB2YXIgY2Fub24gPSBjYW5vbmljYWwoKTtcbiAgaWYgKCFjYW5vbikgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgdmFyIHBhcnNlZCA9IHVybC5wYXJzZShjYW5vbik7XG4gIHJldHVybiBwYXJzZWQucGF0aG5hbWU7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBjYW5vbmljYWwgVVJMIGZvciB0aGUgcGFnZSBjb25jYXQgdGhlIGdpdmVuIGBzZWFyY2hgXG4gKiBhbmQgc3RyaXAgdGhlIGhhc2guXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIGNhbm9uaWNhbFVybChzZWFyY2gpIHtcbiAgdmFyIGNhbm9uID0gY2Fub25pY2FsKCk7XG4gIGlmIChjYW5vbikgcmV0dXJuIGluY2x1ZGVzKCc/JywgY2Fub24pID8gY2Fub24gOiBjYW5vbiArIHNlYXJjaDtcbiAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICB2YXIgaSA9IHVybC5pbmRleE9mKCcjJyk7XG4gIHJldHVybiBpID09PSAtMSA/IHVybCA6IHVybC5zbGljZSgwLCBpKTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIHNlYXJjaCBwYXRoIGZvciB0aGUgcGFnZVxuICogVGhpcyBpcyBwcmVmZXJhYmxlIHRvIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggYmVjYXVzZSBTUEFzXG4gKiBjYW4gaGF2ZSBhICMgaW4gdGhlIHVybCB3aGljaCB3aWxsIGluY2x1ZGUgdGhlIHF1ZXJ5IHBhcmFtIGluXG4gKiB0aGUgaGFzaFxuICpcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiBzZWFyY2hQYXRoKCkge1xuICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gIHZhciB1ID0gdXJsLmluZGV4T2YoJz8nKTtcbiAgcmV0dXJuIHUgPT09IC0xID8gJycgOiB1cmwuc2xpY2UodSwgLTEpO1xufVxuXG4vKlxuICogRXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhZ2VEZWZhdWx0cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L2FuYWx5dGljcy5qcy1jb3JlL2xpYi9wYWdlRGVmYXVsdHMuanNcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBHZXQgdGhlIGN1cnJlbnQgcGFnZSdzIGNhbm9uaWNhbCBVUkwuXG4gKlxuICogQHJldHVybiB7c3RyaW5nfHVuZGVmaW5lZH1cbiAqL1xuZnVuY3Rpb24gY2Fub25pY2FsKCkge1xuICB2YXIgdGFncyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaW5rJyk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25kLWFzc2lnblxuICBmb3IgKHZhciBpID0gMCwgdGFnOyB0YWcgPSB0YWdzW2ldOyBpKyspIHtcbiAgICBpZiAodGFnLmdldEF0dHJpYnV0ZSgncmVsJykgPT09ICdjYW5vbmljYWwnKSB7XG4gICAgICByZXR1cm4gdGFnLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIH1cbiAgfVxufVxuXG4vKlxuICogRXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNhbm9uaWNhbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L2Nhbm9uaWNhbC9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIG9ialRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLy8gVE9ETzogTW92ZSB0byBsaWJcbnZhciBleGlzdHkgPSBmdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsO1xufTtcblxuLy8gVE9ETzogTW92ZSB0byBsaWJcbnZhciBpc0FycmF5ID0gZnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiBvYmpUb1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG4vLyBUT0RPOiBNb3ZlIHRvIGxpYlxudmFyIGlzU3RyaW5nID0gZnVuY3Rpb24odmFsKSB7XG4gICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgfHwgb2JqVG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBTdHJpbmddJztcbn07XG5cbi8vIFRPRE86IE1vdmUgdG8gbGliXG52YXIgaXNPYmplY3QgPSBmdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgY29weSBvZiB0aGUgbmV3IGBvYmplY3RgIGNvbnRhaW5pbmcgb25seSB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXG4gKlxuICogQG5hbWUgcGlja1xuICogQGFwaSBwdWJsaWNcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBwcm9wcyBUaGUgcHJvcGVydHkgb3IgcHJvcGVydGllcyB0byBrZWVwLlxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm4ge09iamVjdH0gQSBuZXcgb2JqZWN0IGNvbnRhaW5pbmcgb25seSB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMgZnJvbSBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKiB2YXIgcGVyc29uID0geyBuYW1lOiAnVGltJywgb2NjdXBhdGlvbjogJ2VuY2hhbnRlcicsIGZlYXJzOiAncmFiYml0cycgfTtcbiAqXG4gKiBwaWNrKCduYW1lJywgcGVyc29uKTtcbiAqIC8vPT4geyBuYW1lOiAnVGltJyB9XG4gKlxuICogcGljayhbJ25hbWUnLCAnZmVhcnMnXSwgcGVyc29uKTtcbiAqIC8vPT4geyBuYW1lOiAnVGltJywgZmVhcnM6ICdyYWJiaXRzJyB9XG4gKi9cbnZhciBwaWNrID0gZnVuY3Rpb24gcGljayhwcm9wcywgb2JqZWN0KSB7XG4gIGlmICghZXhpc3R5KG9iamVjdCkgfHwgIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBpZiAoaXNTdHJpbmcocHJvcHMpKSB7XG4gICAgcHJvcHMgPSBbcHJvcHNdO1xuICB9XG5cbiAgaWYgKCFpc0FycmF5KHByb3BzKSkge1xuICAgIHByb3BzID0gW107XG4gIH1cblxuICB2YXIgcmVzdWx0ID0ge307XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChpc1N0cmluZyhwcm9wc1tpXSkgJiYgcHJvcHNbaV0gaW4gb2JqZWN0KSB7XG4gICAgICByZXN1bHRbcHJvcHNbaV1dID0gb2JqZWN0W3Byb3BzW2ldXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLypcbiAqIEV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBwaWNrO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQG5kaG91bGUvcGljay9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFByZXZlbnQgZGVmYXVsdCBvbiBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnR9IGVcbiAqIEBleGFtcGxlXG4gKiBhbmNob3Iub25jbGljayA9IHByZXZlbnQ7XG4gKiBhbmNob3Iub25jbGljayA9IGZ1bmN0aW9uKGUpe1xuICogICBpZiAoc29tZXRoaW5nKSByZXR1cm4gcHJldmVudChlKTtcbiAqIH07XG4gKi9cblxuZnVuY3Rpb24gcHJldmVudERlZmF1bHQoZSkge1xuICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gIHJldHVybiBlLnByZXZlbnREZWZhdWx0ID8gZS5wcmV2ZW50RGVmYXVsdCgpIDogZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xufVxuXG4vKlxuICogRXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHByZXZlbnREZWZhdWx0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvcHJldmVudC1kZWZhdWx0L2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHRyaW0gPSByZXF1aXJlKCd0cmltJyk7XG52YXIgdHlwZSA9IHJlcXVpcmUoJ3R5cGUnKTtcblxudmFyIHBhdHRlcm4gPSAvKFxcdyspXFxbKFxcZCspXFxdL1xuXG4vKipcbiAqIFNhZmVseSBlbmNvZGUgdGhlIGdpdmVuIHN0cmluZ1xuICogXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgZW5jb2RlID0gZnVuY3Rpb24oc3RyKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufTtcblxuLyoqXG4gKiBTYWZlbHkgZGVjb2RlIHRoZSBzdHJpbmdcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIGRlY29kZSA9IGZ1bmN0aW9uKHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gcXVlcnkgYHN0cmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnBhcnNlID0gZnVuY3Rpb24oc3RyKXtcbiAgaWYgKCdzdHJpbmcnICE9IHR5cGVvZiBzdHIpIHJldHVybiB7fTtcblxuICBzdHIgPSB0cmltKHN0cik7XG4gIGlmICgnJyA9PSBzdHIpIHJldHVybiB7fTtcbiAgaWYgKCc/JyA9PSBzdHIuY2hhckF0KDApKSBzdHIgPSBzdHIuc2xpY2UoMSk7XG5cbiAgdmFyIG9iaiA9IHt9O1xuICB2YXIgcGFpcnMgPSBzdHIuc3BsaXQoJyYnKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwYXJ0cyA9IHBhaXJzW2ldLnNwbGl0KCc9Jyk7XG4gICAgdmFyIGtleSA9IGRlY29kZShwYXJ0c1swXSk7XG4gICAgdmFyIG07XG5cbiAgICBpZiAobSA9IHBhdHRlcm4uZXhlYyhrZXkpKSB7XG4gICAgICBvYmpbbVsxXV0gPSBvYmpbbVsxXV0gfHwgW107XG4gICAgICBvYmpbbVsxXV1bbVsyXV0gPSBkZWNvZGUocGFydHNbMV0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgb2JqW3BhcnRzWzBdXSA9IG51bGwgPT0gcGFydHNbMV1cbiAgICAgID8gJydcbiAgICAgIDogZGVjb2RlKHBhcnRzWzFdKTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG4vKipcbiAqIFN0cmluZ2lmeSB0aGUgZ2l2ZW4gYG9iamAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uKG9iail7XG4gIGlmICghb2JqKSByZXR1cm4gJyc7XG4gIHZhciBwYWlycyA9IFtdO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICB2YXIgdmFsdWUgPSBvYmpba2V5XTtcblxuICAgIGlmICgnYXJyYXknID09IHR5cGUodmFsdWUpKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHBhaXJzLnB1c2goZW5jb2RlKGtleSArICdbJyArIGkgKyAnXScpICsgJz0nICsgZW5jb2RlKHZhbHVlW2ldKSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBwYWlycy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKG9ialtrZXldKSk7XG4gIH1cblxuICByZXR1cm4gcGFpcnMuam9pbignJicpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1xdWVyeXN0cmluZy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiB0b1N0cmluZyByZWYuXG4gKi9cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBSZXR1cm4gdGhlIHR5cGUgb2YgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsKXtcbiAgc3dpdGNoICh0b1N0cmluZy5jYWxsKHZhbCkpIHtcbiAgICBjYXNlICdbb2JqZWN0IERhdGVdJzogcmV0dXJuICdkYXRlJztcbiAgICBjYXNlICdbb2JqZWN0IFJlZ0V4cF0nOiByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgY2FzZSAnW29iamVjdCBBcmd1bWVudHNdJzogcmV0dXJuICdhcmd1bWVudHMnO1xuICAgIGNhc2UgJ1tvYmplY3QgQXJyYXldJzogcmV0dXJuICdhcnJheSc7XG4gICAgY2FzZSAnW29iamVjdCBFcnJvcl0nOiByZXR1cm4gJ2Vycm9yJztcbiAgfVxuXG4gIGlmICh2YWwgPT09IG51bGwpIHJldHVybiAnbnVsbCc7XG4gIGlmICh2YWwgPT09IHVuZGVmaW5lZCkgcmV0dXJuICd1bmRlZmluZWQnO1xuICBpZiAodmFsICE9PSB2YWwpIHJldHVybiAnbmFuJztcbiAgaWYgKHZhbCAmJiB2YWwubm9kZVR5cGUgPT09IDEpIHJldHVybiAnZWxlbWVudCc7XG5cbiAgdmFsID0gdmFsLnZhbHVlT2ZcbiAgICA/IHZhbC52YWx1ZU9mKClcbiAgICA6IE9iamVjdC5wcm90b3R5cGUudmFsdWVPZi5hcHBseSh2YWwpXG5cbiAgcmV0dXJuIHR5cGVvZiB2YWw7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LXF1ZXJ5c3RyaW5nL25vZGVfbW9kdWxlcy9jb21wb25lbnQtdHlwZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgRW50aXR5ID0gcmVxdWlyZSgnLi9lbnRpdHknKTtcbnZhciBiaW5kQWxsID0gcmVxdWlyZSgnYmluZC1hbGwnKTtcbnZhciBjb29raWUgPSByZXF1aXJlKCcuL2Nvb2tpZScpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnYW5hbHl0aWNzOnVzZXInKTtcbnZhciBpbmhlcml0ID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcbnZhciByYXdDb29raWUgPSByZXF1aXJlKCdjb21wb25lbnQtY29va2llJyk7XG52YXIgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKTtcblxuLyoqXG4gKiBVc2VyIGRlZmF1bHRzXG4gKi9cblxuVXNlci5kZWZhdWx0cyA9IHtcbiAgcGVyc2lzdDogdHJ1ZSxcbiAgY29va2llOiB7XG4gICAga2V5OiAnYWpzX3VzZXJfaWQnLFxuICAgIG9sZEtleTogJ2Fqc191c2VyJ1xuICB9LFxuICBsb2NhbFN0b3JhZ2U6IHtcbiAgICBrZXk6ICdhanNfdXNlcl90cmFpdHMnXG4gIH1cbn07XG5cblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBVc2VyYCB3aXRoIGBvcHRpb25zYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5cbmZ1bmN0aW9uIFVzZXIob3B0aW9ucykge1xuICB0aGlzLmRlZmF1bHRzID0gVXNlci5kZWZhdWx0cztcbiAgdGhpcy5kZWJ1ZyA9IGRlYnVnO1xuICBFbnRpdHkuY2FsbCh0aGlzLCBvcHRpb25zKTtcbn1cblxuXG4vKipcbiAqIEluaGVyaXQgYEVudGl0eWBcbiAqL1xuXG5pbmhlcml0KFVzZXIsIEVudGl0eSk7XG5cbi8qKlxuICogU2V0L2dldCB0aGUgdXNlciBpZC5cbiAqXG4gKiBXaGVuIHRoZSB1c2VyIGlkIGNoYW5nZXMsIHRoZSBtZXRob2Qgd2lsbCByZXNldCBoaXMgYW5vbnltb3VzSWQgdG8gYSBuZXcgb25lLlxuICpcbiAqIC8vIEZJWE1FOiBXaGF0IGFyZSB0aGUgbWl4ZWQgdHlwZXM/XG4gKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGV4YW1wbGVcbiAqIC8vIGRpZG4ndCBjaGFuZ2UgYmVjYXVzZSB0aGUgdXNlciBkaWRuJ3QgaGF2ZSBwcmV2aW91cyBpZC5cbiAqIGFub255bW91c0lkID0gdXNlci5hbm9ueW1vdXNJZCgpO1xuICogdXNlci5pZCgnZm9vJyk7XG4gKiBhc3NlcnQuZXF1YWwoYW5vbnltb3VzSWQsIHVzZXIuYW5vbnltb3VzSWQoKSk7XG4gKlxuICogLy8gZGlkbid0IGNoYW5nZSBiZWNhdXNlIHRoZSB1c2VyIGlkIGNoYW5nZWQgdG8gbnVsbC5cbiAqIGFub255bW91c0lkID0gdXNlci5hbm9ueW1vdXNJZCgpO1xuICogdXNlci5pZCgnZm9vJyk7XG4gKiB1c2VyLmlkKG51bGwpO1xuICogYXNzZXJ0LmVxdWFsKGFub255bW91c0lkLCB1c2VyLmFub255bW91c0lkKCkpO1xuICpcbiAqIC8vIGNoYW5nZSBiZWNhdXNlIHRoZSB1c2VyIGhhZCBwcmV2aW91cyBpZC5cbiAqIGFub255bW91c0lkID0gdXNlci5hbm9ueW1vdXNJZCgpO1xuICogdXNlci5pZCgnZm9vJyk7XG4gKiB1c2VyLmlkKCdiYXonKTsgLy8gdHJpZ2dlcnMgY2hhbmdlXG4gKiB1c2VyLmlkKCdiYXonKTsgLy8gbm8gY2hhbmdlXG4gKiBhc3NlcnQubm90RXF1YWwoYW5vbnltb3VzSWQsIHVzZXIuYW5vbnltb3VzSWQoKSk7XG4gKi9cblxuVXNlci5wcm90b3R5cGUuaWQgPSBmdW5jdGlvbihpZCkge1xuICB2YXIgcHJldiA9IHRoaXMuX2dldElkKCk7XG4gIHZhciByZXQgPSBFbnRpdHkucHJvdG90eXBlLmlkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIGlmIChwcmV2ID09IG51bGwpIHJldHVybiByZXQ7XG4gIC8vIEZJWE1FOiBXZSdyZSByZWx5aW5nIG9uIGNvZXJjaW9uIGhlcmUgKDEgPT0gXCIxXCIpLCBidXQgb3VyIEFQSSB0cmVhdHMgdGhlc2VcbiAgLy8gdHdvIHZhbHVlcyBkaWZmZXJlbnRseS4gRmlndXJlIG91dCB3aGF0IHdpbGwgYnJlYWsgaWYgd2UgcmVtb3ZlIHRoaXMgYW5kXG4gIC8vIGNoYW5nZSB0byBzdHJpY3QgZXF1YWxpdHlcbiAgLyogZXNsaW50LWRpc2FibGUgZXFlcWVxICovXG4gIGlmIChwcmV2ICE9IGlkICYmIGlkKSB0aGlzLmFub255bW91c0lkKG51bGwpO1xuICAvKiBlc2xpbnQtZW5hYmxlIGVxZXFlcSAqL1xuICByZXR1cm4gcmV0O1xufTtcblxuLyoqXG4gKiBTZXQgLyBnZXQgLyByZW1vdmUgYW5vbnltb3VzSWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFub255bW91c0lkXG4gKiBAcmV0dXJuIHtTdHJpbmd8VXNlcn1cbiAqL1xuXG5Vc2VyLnByb3RvdHlwZS5hbm9ueW1vdXNJZCA9IGZ1bmN0aW9uKGFub255bW91c0lkKSB7XG4gIHZhciBzdG9yZSA9IHRoaXMuc3RvcmFnZSgpO1xuXG4gIC8vIHNldCAvIHJlbW92ZVxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHN0b3JlLnNldCgnYWpzX2Fub255bW91c19pZCcsIGFub255bW91c0lkKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIG5ld1xuICBhbm9ueW1vdXNJZCA9IHN0b3JlLmdldCgnYWpzX2Fub255bW91c19pZCcpO1xuICBpZiAoYW5vbnltb3VzSWQpIHtcbiAgICByZXR1cm4gYW5vbnltb3VzSWQ7XG4gIH1cblxuICAvLyBvbGQgLSBpdCBpcyBub3Qgc3RyaW5naWZpZWQgc28gd2UgdXNlIHRoZSByYXcgY29va2llLlxuICBhbm9ueW1vdXNJZCA9IHJhd0Nvb2tpZSgnX3NpbycpO1xuICBpZiAoYW5vbnltb3VzSWQpIHtcbiAgICBhbm9ueW1vdXNJZCA9IGFub255bW91c0lkLnNwbGl0KCctLS0tJylbMF07XG4gICAgc3RvcmUuc2V0KCdhanNfYW5vbnltb3VzX2lkJywgYW5vbnltb3VzSWQpO1xuICAgIHN0b3JlLnJlbW92ZSgnX3NpbycpO1xuICAgIHJldHVybiBhbm9ueW1vdXNJZDtcbiAgfVxuXG4gIC8vIGVtcHR5XG4gIGFub255bW91c0lkID0gdXVpZC52NCgpO1xuICBzdG9yZS5zZXQoJ2Fqc19hbm9ueW1vdXNfaWQnLCBhbm9ueW1vdXNJZCk7XG4gIHJldHVybiBzdG9yZS5nZXQoJ2Fqc19hbm9ueW1vdXNfaWQnKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFub255bW91cyBpZCBvbiBsb2dvdXQgdG9vLlxuICovXG5cblVzZXIucHJvdG90eXBlLmxvZ291dCA9IGZ1bmN0aW9uKCkge1xuICBFbnRpdHkucHJvdG90eXBlLmxvZ291dC5jYWxsKHRoaXMpO1xuICB0aGlzLmFub255bW91c0lkKG51bGwpO1xufTtcblxuLyoqXG4gKiBMb2FkIHNhdmVkIHVzZXIgYGlkYCBvciBgdHJhaXRzYCBmcm9tIHN0b3JhZ2UuXG4gKi9cblxuVXNlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5fbG9hZE9sZENvb2tpZSgpKSByZXR1cm47XG4gIEVudGl0eS5wcm90b3R5cGUubG9hZC5jYWxsKHRoaXMpO1xufTtcblxuXG4vKipcbiAqIEJBQ0tXQVJEUyBDT01QQVRJQklMSVRZOiBMb2FkIHRoZSBvbGQgdXNlciBmcm9tIHRoZSBjb29raWUuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5cblVzZXIucHJvdG90eXBlLl9sb2FkT2xkQ29va2llID0gZnVuY3Rpb24oKSB7XG4gIHZhciB1c2VyID0gY29va2llLmdldCh0aGlzLl9vcHRpb25zLmNvb2tpZS5vbGRLZXkpO1xuICBpZiAoIXVzZXIpIHJldHVybiBmYWxzZTtcblxuICB0aGlzLmlkKHVzZXIuaWQpO1xuICB0aGlzLnRyYWl0cyh1c2VyLnRyYWl0cyk7XG4gIGNvb2tpZS5yZW1vdmUodGhpcy5fb3B0aW9ucy5jb29raWUub2xkS2V5KTtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5cbi8qKlxuICogRXhwb3NlIHRoZSB1c2VyIHNpbmdsZXRvbi5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmRBbGwobmV3IFVzZXIoKSk7XG5cblxuLyoqXG4gKiBFeHBvc2UgdGhlIGBVc2VyYCBjb25zdHJ1Y3Rvci5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cy5Vc2VyID0gVXNlcjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L2FuYWx5dGljcy5qcy1jb3JlL2xpYi91c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAgICAgdXVpZC5qc1xuLy9cbi8vICAgICBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxMiBSb2JlcnQgS2llZmZlclxuLy8gICAgIE1JVCBMaWNlbnNlIC0gaHR0cDovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXG4vLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgV2UgZmVhdHVyZVxuLy8gZGV0ZWN0IHRvIGRldGVybWluZSB0aGUgYmVzdCBSTkcgc291cmNlLCBub3JtYWxpemluZyB0byBhIGZ1bmN0aW9uIHRoYXRcbi8vIHJldHVybnMgMTI4LWJpdHMgb2YgcmFuZG9tbmVzcywgc2luY2UgdGhhdCdzIHdoYXQncyB1c3VhbGx5IHJlcXVpcmVkXG52YXIgX3JuZyA9IHJlcXVpcmUoJy4vcm5nJyk7XG5cbi8vIE1hcHMgZm9yIG51bWJlciA8LT4gaGV4IHN0cmluZyBjb252ZXJzaW9uXG52YXIgX2J5dGVUb0hleCA9IFtdO1xudmFyIF9oZXhUb0J5dGUgPSB7fTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgX2J5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG4gIF9oZXhUb0J5dGVbX2J5dGVUb0hleFtpXV0gPSBpO1xufVxuXG4vLyAqKmBwYXJzZSgpYCAtIFBhcnNlIGEgVVVJRCBpbnRvIGl0J3MgY29tcG9uZW50IGJ5dGVzKipcbmZ1bmN0aW9uIHBhcnNlKHMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gKGJ1ZiAmJiBvZmZzZXQpIHx8IDAsIGlpID0gMDtcblxuICBidWYgPSBidWYgfHwgW107XG4gIHMudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bMC05YS1mXXsyfS9nLCBmdW5jdGlvbihvY3QpIHtcbiAgICBpZiAoaWkgPCAxNikgeyAvLyBEb24ndCBvdmVyZmxvdyFcbiAgICAgIGJ1ZltpICsgaWkrK10gPSBfaGV4VG9CeXRlW29jdF07XG4gICAgfVxuICB9KTtcblxuICAvLyBaZXJvIG91dCByZW1haW5pbmcgYnl0ZXMgaWYgc3RyaW5nIHdhcyBzaG9ydFxuICB3aGlsZSAoaWkgPCAxNikge1xuICAgIGJ1ZltpICsgaWkrK10gPSAwO1xuICB9XG5cbiAgcmV0dXJuIGJ1Zjtcbn1cblxuLy8gKipgdW5wYXJzZSgpYCAtIENvbnZlcnQgVVVJRCBieXRlIGFycmF5IChhbGEgcGFyc2UoKSkgaW50byBhIHN0cmluZyoqXG5mdW5jdGlvbiB1bnBhcnNlKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDAsIGJ0aCA9IF9ieXRlVG9IZXg7XG4gIHJldHVybiAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dO1xufVxuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbi8vIHJhbmRvbSAjJ3Mgd2UgbmVlZCB0byBpbml0IG5vZGUgYW5kIGNsb2Nrc2VxXG52YXIgX3NlZWRCeXRlcyA9IF9ybmcoKTtcblxuLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG52YXIgX25vZGVJZCA9IFtcbiAgX3NlZWRCeXRlc1swXSB8IDB4MDEsXG4gIF9zZWVkQnl0ZXNbMV0sIF9zZWVkQnl0ZXNbMl0sIF9zZWVkQnl0ZXNbM10sIF9zZWVkQnl0ZXNbNF0sIF9zZWVkQnl0ZXNbNV1cbl07XG5cbi8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG52YXIgX2Nsb2Nrc2VxID0gKF9zZWVkQnl0ZXNbNl0gPDwgOCB8IF9zZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMCwgX2xhc3ROU2VjcyA9IDA7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAvLyBgdGltZV9sb3dgXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfbWlkYFxuICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gIC8vIGBjbG9ja19zZXFfbG93YFxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgLy8gYG5vZGVgXG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgbisrKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IHVucGFyc2UoYik7XG59XG5cbi8vICoqYHY0KClgIC0gR2VuZXJhdGUgcmFuZG9tIFVVSUQqKlxuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICAvLyBEZXByZWNhdGVkIC0gJ2Zvcm1hdCcgYXJndW1lbnQsIGFzIHN1cHBvcnRlZCBpbiB2MS4yXG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZykoKTtcblxuICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyBpaSsrKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgdW5wYXJzZShybmRzKTtcbn1cblxuLy8gRXhwb3J0IHB1YmxpYyBBUElcbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG51dWlkLnBhcnNlID0gcGFyc2U7XG51dWlkLnVucGFyc2UgPSB1bnBhcnNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy91dWlkL3V1aWQuanNcbi8vIG1vZHVsZSBpZCA9IDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxudmFyIHJuZztcblxudmFyIGNyeXB0byA9IGdsb2JhbC5jcnlwdG8gfHwgZ2xvYmFsLm1zQ3J5cHRvOyAvLyBmb3IgSUUgMTFcbmlmIChjcnlwdG8gJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvLWJhc2VkIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgLy8gTW9kZXJhdGVseSBmYXN0LCBoaWdoIHF1YWxpdHlcbiAgdmFyIF9ybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbiAgcm5nID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMoX3JuZHM4KTtcbiAgICByZXR1cm4gX3JuZHM4O1xuICB9O1xufVxuXG5pZiAoIXJuZykge1xuICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gIC8vXG4gIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gIC8vIHF1YWxpdHkuXG4gIHZhciAgX3JuZHMgPSBuZXcgQXJyYXkoMTYpO1xuICBybmcgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgX3JuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9ybmRzO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJuZztcblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdXVpZC9ybmctYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwiX2Zyb21cIjogXCJnaXQraHR0cHM6Ly9naXRodWIuY29tL3l1dW51c2R1cm11cy9hbmFseXRpY3MuanMtY29yZS5naXRcIixcblx0XCJfaWRcIjogXCJAc2VnbWVudC9hbmFseXRpY3MuanMtY29yZUAzLjAuMFwiLFxuXHRcIl9pbkJ1bmRsZVwiOiBmYWxzZSxcblx0XCJfaW50ZWdyaXR5XCI6IFwic2hhMS00dTh3T01rSHlKbnU2UjNYMmF6aWJqY3hYNm89XCIsXG5cdFwiX2xvY2F0aW9uXCI6IFwiL0BzZWdtZW50L2FuYWx5dGljcy5qcy1jb3JlXCIsXG5cdFwiX3BoYW50b21DaGlsZHJlblwiOiB7fSxcblx0XCJfcmVxdWVzdGVkXCI6IHtcblx0XHRcInR5cGVcIjogXCJnaXRcIixcblx0XHRcInJhd1wiOiBcIkBzZWdtZW50L2FuYWx5dGljcy5qcy1jb3JlQGdpdCtodHRwczovL2dpdGh1Yi5jb20veXV1bnVzZHVybXVzL2FuYWx5dGljcy5qcy1jb3JlLmdpdFwiLFxuXHRcdFwibmFtZVwiOiBcIkBzZWdtZW50L2FuYWx5dGljcy5qcy1jb3JlXCIsXG5cdFx0XCJlc2NhcGVkTmFtZVwiOiBcIkBzZWdtZW50JTJmYW5hbHl0aWNzLmpzLWNvcmVcIixcblx0XHRcInNjb3BlXCI6IFwiQHNlZ21lbnRcIixcblx0XHRcInJhd1NwZWNcIjogXCJnaXQraHR0cHM6Ly9naXRodWIuY29tL3l1dW51c2R1cm11cy9hbmFseXRpY3MuanMtY29yZS5naXRcIixcblx0XHRcInNhdmVTcGVjXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS95dXVudXNkdXJtdXMvYW5hbHl0aWNzLmpzLWNvcmUuZ2l0XCIsXG5cdFx0XCJmZXRjaFNwZWNcIjogXCJodHRwczovL2dpdGh1Yi5jb20veXV1bnVzZHVybXVzL2FuYWx5dGljcy5qcy1jb3JlLmdpdFwiLFxuXHRcdFwiZ2l0Q29tbWl0dGlzaFwiOiBcIm1hc3RlclwiXG5cdH0sXG5cdFwiX3JlcXVpcmVkQnlcIjogW1xuXHRcdFwiL2FuYWx5dGljc2pzXCJcblx0XSxcblx0XCJfcmVzb2x2ZWRcIjogXCJnaXQraHR0cHM6Ly9naXRodWIuY29tL3l1dW51c2R1cm11cy9hbmFseXRpY3MuanMtY29yZS5naXQjZmJmMDdiZjVmYjQ5NjRhN2YyZDY4YmU4MWRkMzhjYWM2M2VhNmJhOVwiLFxuXHRcIl9zcGVjXCI6IFwiQHNlZ21lbnQvYW5hbHl0aWNzLmpzLWNvcmVAZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS95dXVudXNkdXJtdXMvYW5hbHl0aWNzLmpzLWNvcmUuZ2l0XCIsXG5cdFwiX3doZXJlXCI6IFwiL1VzZXJzL3l1bnVzL0Rlc2t0b3AvYW5hbHl0aWNzanMtZXhhbXBsZS9ub2RlX21vZHVsZXMvYW5hbHl0aWNzanNcIixcblx0XCJhdXRob3JcIjoge1xuXHRcdFwibmFtZVwiOiBcIlNlZ21lbnRcIixcblx0XHRcImVtYWlsXCI6IFwiZnJpZW5kc0BzZWdtZW50LmNvbVwiXG5cdH0sXG5cdFwiYnVnc1wiOiB7XG5cdFx0XCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vc2VnbWVudGlvL2FuYWx5dGljcy5qcy1jb3JlL2lzc3Vlc1wiXG5cdH0sXG5cdFwiYnVuZGxlRGVwZW5kZW5jaWVzXCI6IGZhbHNlLFxuXHRcImRlcGVuZGVuY2llc1wiOiB7XG5cdFx0XCJAbmRob3VsZS9hZnRlclwiOiBcIl4xLjAuMFwiLFxuXHRcdFwiQG5kaG91bGUvY2xvbmVcIjogXCJeMS4wLjBcIixcblx0XHRcIkBuZGhvdWxlL2RlZmF1bHRzXCI6IFwiXjIuMC4xXCIsXG5cdFx0XCJAbmRob3VsZS9lYWNoXCI6IFwiXjIuMC4xXCIsXG5cdFx0XCJAbmRob3VsZS9leHRlbmRcIjogXCJeMi4wLjBcIixcblx0XHRcIkBuZGhvdWxlL2ZvbGRsXCI6IFwiXjIuMC4xXCIsXG5cdFx0XCJAbmRob3VsZS9pbmNsdWRlc1wiOiBcIl4yLjAuMVwiLFxuXHRcdFwiQG5kaG91bGUva2V5c1wiOiBcIl4yLjAuMFwiLFxuXHRcdFwiQG5kaG91bGUvbWFwXCI6IFwiXjIuMC4xXCIsXG5cdFx0XCJAbmRob3VsZS9waWNrXCI6IFwiXjIuMC4wXCIsXG5cdFx0XCJAc2VnbWVudC9jYW5vbmljYWxcIjogXCJeMS4wLjBcIixcblx0XHRcIkBzZWdtZW50L2lzLW1ldGFcIjogXCJeMS4wLjBcIixcblx0XHRcIkBzZWdtZW50L2lzb2RhdGVcIjogXCJeMS4wLjJcIixcblx0XHRcIkBzZWdtZW50L2lzb2RhdGUtdHJhdmVyc2VcIjogXCJeMS4wLjFcIixcblx0XHRcIkBzZWdtZW50L3ByZXZlbnQtZGVmYXVsdFwiOiBcIl4xLjAuMFwiLFxuXHRcdFwiQHNlZ21lbnQvc3RvcmVcIjogXCJeMS4zLjIwXCIsXG5cdFx0XCJAc2VnbWVudC90b3AtZG9tYWluXCI6IFwiXjMuMC4wXCIsXG5cdFx0XCJiaW5kLWFsbFwiOiBcIl4xLjAuMFwiLFxuXHRcdFwiY29tcG9uZW50LWNvb2tpZVwiOiBcIl4xLjEuMlwiLFxuXHRcdFwiY29tcG9uZW50LWVtaXR0ZXJcIjogXCJeMS4yLjFcIixcblx0XHRcImNvbXBvbmVudC1ldmVudFwiOiBcIl4wLjEuNFwiLFxuXHRcdFwiY29tcG9uZW50LXF1ZXJ5c3RyaW5nXCI6IFwiXjIuMC4wXCIsXG5cdFx0XCJjb21wb25lbnQtdHlwZVwiOiBcIl4xLjIuMVwiLFxuXHRcdFwiY29tcG9uZW50LXVybFwiOiBcIl4wLjIuMVwiLFxuXHRcdFwiZGVidWdcIjogXCJeMC43LjRcIixcblx0XHRcImluaGVyaXRzXCI6IFwiXjIuMC4xXCIsXG5cdFx0XCJpbnN0YWxsXCI6IFwiXjAuNy4zXCIsXG5cdFx0XCJpc1wiOiBcIl4zLjEuMFwiLFxuXHRcdFwianNvbjNcIjogXCJeMy4zLjJcIixcblx0XHRcIm5ldy1kYXRlXCI6IFwiXjEuMC4wXCIsXG5cdFx0XCJuZXh0LXRpY2tcIjogXCJeMC4yLjJcIixcblx0XHRcInNlZ21lbnRpby1mYWNhZGVcIjogXCJeMy4wLjJcIixcblx0XHRcInV1aWRcIjogXCJeMi4wLjJcIlxuXHR9LFxuXHRcImRlcHJlY2F0ZWRcIjogZmFsc2UsXG5cdFwiZGVzY3JpcHRpb25cIjogXCJUaGUgaGFzc2xlLWZyZWUgd2F5IHRvIGludGVncmF0ZSBhbmFseXRpY3MgaW50byBhbnkgd2ViIGFwcGxpY2F0aW9uLlwiLFxuXHRcImRldkRlcGVuZGVuY2llc1wiOiB7XG5cdFx0XCJAc2VnbWVudC9hbmFseXRpY3MuanMtaW50ZWdyYXRpb25cIjogXCJeMi4wLjFcIixcblx0XHRcIkBzZWdtZW50L2VzbGludC1jb25maWdcIjogXCJeMy4xLjFcIixcblx0XHRcImJyb3dzZXJpZnlcIjogXCJeMTMuMC4wXCIsXG5cdFx0XCJicm93c2VyaWZ5LWlzdGFuYnVsXCI6IFwiXjIuMC4wXCIsXG5cdFx0XCJjb21wYXQtdHJpZ2dlci1ldmVudFwiOiBcIl4xLjAuMFwiLFxuXHRcdFwiY29tcG9uZW50LWVhY2hcIjogXCJeMC4yLjZcIixcblx0XHRcImVzbGludFwiOiBcIl4yLjkuMFwiLFxuXHRcdFwiZXNsaW50LXBsdWdpbi1tb2NoYVwiOiBcIl4yLjIuMFwiLFxuXHRcdFwiZXNsaW50LXBsdWdpbi1yZXF1aXJlLXBhdGgtZXhpc3RzXCI6IFwiXjEuMS41XCIsXG5cdFx0XCJpc3RhbmJ1bFwiOiBcIl4wLjQuM1wiLFxuXHRcdFwianF1ZXJ5XCI6IFwiXjEuMTIuM1wiLFxuXHRcdFwia2FybWFcIjogXCJeMC4xMy4yMlwiLFxuXHRcdFwia2FybWEtYnJvd3NlcmlmeVwiOiBcIl41LjAuNFwiLFxuXHRcdFwia2FybWEtY2hyb21lLWxhdW5jaGVyXCI6IFwiXjEuMC4xXCIsXG5cdFx0XCJrYXJtYS1jb3ZlcmFnZVwiOiBcIl4xLjAuMFwiLFxuXHRcdFwia2FybWEtanVuaXQtcmVwb3J0ZXJcIjogXCJeMS4wLjBcIixcblx0XHRcImthcm1hLW1vY2hhXCI6IFwiXjEuMC4xXCIsXG5cdFx0XCJrYXJtYS1waGFudG9tanMtbGF1bmNoZXJcIjogXCJeMS4wLjBcIixcblx0XHRcImthcm1hLXNhdWNlLWxhdW5jaGVyXCI6IFwiXjEuMC4wXCIsXG5cdFx0XCJrYXJtYS1zcGVjLXJlcG9ydGVyXCI6IFwiMC4wLjI2XCIsXG5cdFx0XCJtb2NoYVwiOiBcIl4yLjIuNVwiLFxuXHRcdFwicGhhbnRvbWpzLXByZWJ1aWx0XCI6IFwiXjIuMS43XCIsXG5cdFx0XCJwcm9jbGFpbVwiOiBcIl4zLjQuMVwiLFxuXHRcdFwic2lub25cIjogXCJeMS43LjNcIixcblx0XHRcIndhdGNoaWZ5XCI6IFwiXjMuNy4wXCJcblx0fSxcblx0XCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9zZWdtZW50aW8vYW5hbHl0aWNzLmpzLWNvcmUjcmVhZG1lXCIsXG5cdFwia2V5d29yZHNcIjogW1xuXHRcdFwiYW5hbHl0aWNzXCIsXG5cdFx0XCJhbmFseXRpY3MuanNcIixcblx0XHRcInNlZ21lbnRcIixcblx0XHRcInNlZ21lbnQuaW9cIlxuXHRdLFxuXHRcImxpY2Vuc2VcIjogXCJTRUUgTElDRU5TRSBJTiBMSUNFTlNFXCIsXG5cdFwibWFpblwiOiBcImxpYi9pbmRleC5qc1wiLFxuXHRcIm5hbWVcIjogXCJAc2VnbWVudC9hbmFseXRpY3MuanMtY29yZVwiLFxuXHRcInJlcG9zaXRvcnlcIjoge1xuXHRcdFwidHlwZVwiOiBcImdpdFwiLFxuXHRcdFwidXJsXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS9zZWdtZW50aW8vYW5hbHl0aWNzLmpzLWNvcmUuZ2l0XCJcblx0fSxcblx0XCJzY3JpcHRzXCI6IHtcblx0XHRcInRlc3RcIjogXCJtYWtlIHRlc3RcIlxuXHR9LFxuXHRcInZlcnNpb25cIjogXCIzLjAuMFwiXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L2FuYWx5dGljcy5qcy1jb3JlL3BhY2thZ2UuanNvblxuLy8gbW9kdWxlIGlkID0gODBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY3JlYXRlQWN0aW9ucyA6IGZ1bmN0aW9uKGFuYWx5dGljcykge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdpZGVudGlmeScsXG4gICAgICAgICAgICAgICAgcHVzaDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBhbmFseXRpY3MuaWRlbnRpZnkoZGF0YS5pZCwgZGF0YS51c2VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdwYWdlIFZpZXdlZCcsXG4gICAgICAgICAgICAgICAgcHVzaDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBhbmFseXRpY3MucGFnZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQcm9kdWN0IExpc3QgVmlld2VkJyxcbiAgICAgICAgICAgICAgICBwdXNoOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICBhbmFseXRpY3MudHJhY2soJ1Byb2R1Y3QgTGlzdCBWaWV3ZWQnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQcm9kdWN0IFZpZXdlZCcsXG4gICAgICAgICAgICAgICAgcHVzaDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgYW5hbHl0aWNzLnRyYWNrKCdQcm9kdWN0IFZpZXdlZCcgLGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1Byb2R1Y3QgVmlld2VkJyxcbiAgICAgICAgICAgICAgICBwdXNoOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuYWx5dGljcy50cmFjaygnUHJvZHVjdCBWaWV3ZWQnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQcm9kdWN0IFZpZXdlZCcsXG4gICAgICAgICAgICAgICAgcHVzaDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBhbmFseXRpY3MudHJhY2soJ1Byb2R1Y3QgVmlld2VkJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnQ2FydCBWaWV3ZWQnLFxuICAgICAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5hbHl0aWNzLnRyYWNrKCdDYXJ0IFZpZXdlZCcsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ1Byb2R1Y3QgQWRkZWQnLFxuICAgICAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5hbHl0aWNzLnRyYWNrKCdQcm9kdWN0IEFkZGVkJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnUHJvZHVjdCBSZW1vdmVkJyxcbiAgICAgICAgICAgICAgICBwdXNoOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuYWx5dGljcy50cmFjaygnUHJvZHVjdCBSZW1vdmVkJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnQ2hlY2tvdXQgU3RlcCBWaWV3ZWQnLFxuICAgICAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5hbHl0aWNzLnRyYWNrKCdDaGVja291dCBTdGVwIFZpZXdlZCcsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ0NoZWNrb3V0IFN0YXJ0ZWQnLFxuICAgICAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5hbHl0aWNzLnRyYWNrKCdDaGVja291dCBTdGFydGVkJywgZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnQ2hlY2tvdXQgU3RlcCBDb21wbGV0ZWQnLFxuICAgICAgICAgICAgICAgIHB1c2g6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5hbHl0aWNzLnRyYWNrKCdDaGVja291dCBTdGVwIENvbXBsZXRlZCcsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2FuYWx5dGljc2pzL2xpYnJhcnkvYW5hbHl0aWNzQWN0aW9ucy5qc1xuLy8gbW9kdWxlIGlkID0gODFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbmZpZzogW1xuICAgIHtcbiAgICAgIHBhY2thZ2U6IHJlcXVpcmUoJ0BzZWdtZW50L2FuYWx5dGljcy5qcy1pbnRlZ3JhdGlvbi1nb29nbGUtYW5hbHl0aWNzJyksXG4gICAgICBuYW1lOiAnR29vZ2xlIEFuYWx5dGljcycsXG4gICAgICBzZXR0aW5nczoge1xuICAgICAgICB0cmFja2luZ0lkOiAnVUEtWFhYWFhYWFhYLVgnIFxuICAgICAgfVxuICAgIH1cbiAgXVxufVxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FuYWx5dGljcy1jb25maWcuanNcbi8vIG1vZHVsZSBpZCA9IDgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBUcmFjayA9IHJlcXVpcmUoJ3NlZ21lbnRpby1mYWNhZGUnKS5UcmFjaztcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJ0BuZGhvdWxlL2RlZmF1bHRzJyk7XG52YXIgZG90ID0gcmVxdWlyZSgnb2JqLWNhc2UnKTtcbnZhciBlYWNoID0gcmVxdWlyZSgnY29tcG9uZW50LWVhY2gnKTtcbnZhciBpbnRlZ3JhdGlvbiA9IHJlcXVpcmUoJ0BzZWdtZW50L2FuYWx5dGljcy5qcy1pbnRlZ3JhdGlvbicpO1xudmFyIGlzID0gcmVxdWlyZSgnaXMnKTtcbnZhciBsZW4gPSByZXF1aXJlKCdvYmplY3QtY29tcG9uZW50JykubGVuZ3RoO1xudmFyIHB1c2ggPSByZXF1aXJlKCdnbG9iYWwtcXVldWUnKSgnX2dhcScpO1xudmFyIHJlamVjdCA9IHJlcXVpcmUoJ3JlamVjdCcpO1xudmFyIHVzZUh0dHBzID0gcmVxdWlyZSgndXNlLWh0dHBzJyk7XG52YXIgdXNlcjtcblxuLyoqXG4gKiBFeHBvc2UgcGx1Z2luLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZ1bmN0aW9uKGFuYWx5dGljcykge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgYW5hbHl0aWNzLmFkZEludGVncmF0aW9uKEdBKTtcbiAgdXNlciA9IGFuYWx5dGljcy51c2VyKCk7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgR0FgIGludGVncmF0aW9uLlxuICpcbiAqIGh0dHA6Ly9zdXBwb3J0Lmdvb2dsZS5jb20vYW5hbHl0aWNzL2Jpbi9hbnN3ZXIucHk/aGw9ZW4mYW5zd2VyPTI1NTg4NjdcbiAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9nYWpzL21ldGhvZHMvZ2FKU0FwaUJhc2ljQ29uZmlndXJhdGlvbiNfZ2F0LkdBX1RyYWNrZXJfLl9zZXRTaXRlU3BlZWRTYW1wbGVSYXRlXG4gKi9cblxudmFyIEdBID0gZXhwb3J0cy5JbnRlZ3JhdGlvbiA9IGludGVncmF0aW9uKCdHb29nbGUgQW5hbHl0aWNzJylcbiAgLnJlYWR5T25Mb2FkKClcbiAgLmdsb2JhbCgnZ2EnKVxuICAuZ2xvYmFsKCdnYXBsdWdpbnMnKVxuICAuZ2xvYmFsKCdfZ2FxJylcbiAgLmdsb2JhbCgnR29vZ2xlQW5hbHl0aWNzT2JqZWN0JylcbiAgLm9wdGlvbignYW5vbnltaXplSXAnLCBmYWxzZSlcbiAgLm9wdGlvbignY2xhc3NpYycsIGZhbHNlKVxuICAub3B0aW9uKCdjb250ZW50R3JvdXBpbmdzJywge30pXG4gIC5vcHRpb24oJ2RpbWVuc2lvbnMnLCB7fSlcbiAgLm9wdGlvbignZG9tYWluJywgJ2F1dG8nKVxuICAub3B0aW9uKCdkb3VibGVDbGljaycsIGZhbHNlKVxuICAub3B0aW9uKCdlbmhhbmNlZEVjb21tZXJjZScsIGZhbHNlKVxuICAub3B0aW9uKCdlbmhhbmNlZExpbmtBdHRyaWJ1dGlvbicsIGZhbHNlKVxuICAub3B0aW9uKCdpZ25vcmVkUmVmZXJyZXJzJywgbnVsbClcbiAgLm9wdGlvbignaW5jbHVkZVNlYXJjaCcsIGZhbHNlKVxuICAub3B0aW9uKCdzZXRBbGxNYXBwZWRQcm9wcycsIHRydWUpXG4gIC5vcHRpb24oJ21ldHJpY3MnLCB7fSlcbiAgLm9wdGlvbignbm9uSW50ZXJhY3Rpb24nLCBmYWxzZSlcbiAgLm9wdGlvbignc2VuZFVzZXJJZCcsIGZhbHNlKVxuICAub3B0aW9uKCdzaXRlU3BlZWRTYW1wbGVSYXRlJywgMSlcbiAgLm9wdGlvbignc2FtcGxlUmF0ZScsIDEwMClcbiAgLm9wdGlvbigndHJhY2tDYXRlZ29yaXplZFBhZ2VzJywgdHJ1ZSlcbiAgLm9wdGlvbigndHJhY2tOYW1lZFBhZ2VzJywgdHJ1ZSlcbiAgLm9wdGlvbigndHJhY2tpbmdJZCcsICcnKVxuICAub3B0aW9uKCdvcHRpbWl6ZScsICcnKVxuICAudGFnKCdsaWJyYXJ5JywgJzxzY3JpcHQgc3JjPVwiLy93d3cuZ29vZ2xlLWFuYWx5dGljcy5jb20vYW5hbHl0aWNzLmpzXCI+JylcbiAgLnRhZygnZG91YmxlIGNsaWNrJywgJzxzY3JpcHQgc3JjPVwiLy9zdGF0cy5nLmRvdWJsZWNsaWNrLm5ldC9kYy5qc1wiPicpXG4gIC50YWcoJ2h0dHAnLCAnPHNjcmlwdCBzcmM9XCJodHRwOi8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2dhLmpzXCI+JylcbiAgLnRhZygnaHR0cHMnLCAnPHNjcmlwdCBzcmM9XCJodHRwczovL3NzbC5nb29nbGUtYW5hbHl0aWNzLmNvbS9nYS5qc1wiPicpO1xuXG4vKipcbiAqIE9uIGBjb25zdHJ1Y3RgIHN3YXAgYW55IGNvbmZpZy1iYXNlZCBtZXRob2RzIHRvIHRoZSBwcm9wZXIgaW1wbGVtZW50YXRpb24uXG4gKi9cblxuR0Eub24oJ2NvbnN0cnVjdCcsIGZ1bmN0aW9uKGludGVncmF0aW9uKSB7XG4gIGlmIChpbnRlZ3JhdGlvbi5vcHRpb25zLmNsYXNzaWMpIHtcbiAgICBpbnRlZ3JhdGlvbi5pbml0aWFsaXplID0gaW50ZWdyYXRpb24uaW5pdGlhbGl6ZUNsYXNzaWM7XG4gICAgaW50ZWdyYXRpb24ubG9hZGVkID0gaW50ZWdyYXRpb24ubG9hZGVkQ2xhc3NpYztcbiAgICBpbnRlZ3JhdGlvbi5wYWdlID0gaW50ZWdyYXRpb24ucGFnZUNsYXNzaWM7XG4gICAgaW50ZWdyYXRpb24udHJhY2sgPSBpbnRlZ3JhdGlvbi50cmFja0NsYXNzaWM7XG4gICAgaW50ZWdyYXRpb24ub3JkZXJDb21wbGV0ZWQgPSBpbnRlZ3JhdGlvbi5jb21wbGV0ZWRPcmRlckNsYXNzaWM7XG4gIH0gZWxzZSBpZiAoaW50ZWdyYXRpb24ub3B0aW9ucy5lbmhhbmNlZEVjb21tZXJjZSkge1xuICAgIGludGVncmF0aW9uLnByb2R1Y3RWaWV3ZWQgPSBpbnRlZ3JhdGlvbi5wcm9kdWN0Vmlld2VkRW5oYW5jZWQ7XG4gICAgaW50ZWdyYXRpb24ucHJvZHVjdENsaWNrZWQgPSBpbnRlZ3JhdGlvbi5wcm9kdWN0Q2xpY2tlZEVuaGFuY2VkO1xuICAgIGludGVncmF0aW9uLnByb2R1Y3RBZGRlZCA9IGludGVncmF0aW9uLnByb2R1Y3RBZGRlZEVuaGFuY2VkO1xuICAgIGludGVncmF0aW9uLnByb2R1Y3RSZW1vdmVkID0gaW50ZWdyYXRpb24ucHJvZHVjdFJlbW92ZWRFbmhhbmNlZDtcbiAgICBpbnRlZ3JhdGlvbi5jaGVja291dFN0YXJ0ZWQgPSBpbnRlZ3JhdGlvbi5jaGVja291dFN0YXJ0ZWRFbmhhbmNlZDtcbiAgICBpbnRlZ3JhdGlvbi5jaGVja291dFN0ZXBWaWV3ZWQgPSBpbnRlZ3JhdGlvbi5jaGVja291dFN0ZXBWaWV3ZWRFbmhhbmNlZDtcbiAgICBpbnRlZ3JhdGlvbi5jaGVja291dFN0ZXBDb21wbGV0ZWQgPSBpbnRlZ3JhdGlvbi5jaGVja291dFN0ZXBDb21wbGV0ZWRFbmhhbmNlZDtcbiAgICBpbnRlZ3JhdGlvbi5vcmRlclVwZGF0ZWQgPSBpbnRlZ3JhdGlvbi5vcmRlclVwZGF0ZWRFbmhhbmNlZDtcbiAgICBpbnRlZ3JhdGlvbi5vcmRlckNvbXBsZXRlZCA9IGludGVncmF0aW9uLm9yZGVyQ29tcGxldGVkRW5oYW5jZWQ7XG4gICAgaW50ZWdyYXRpb24ub3JkZXJSZWZ1bmRlZCA9IGludGVncmF0aW9uLm9yZGVyUmVmdW5kZWRFbmhhbmNlZDtcbiAgICBpbnRlZ3JhdGlvbi5wcm9tb3Rpb25WaWV3ZWQgPSBpbnRlZ3JhdGlvbi5wcm9tb3Rpb25WaWV3ZWRFbmhhbmNlZDtcbiAgICBpbnRlZ3JhdGlvbi5wcm9tb3Rpb25DbGlja2VkID0gaW50ZWdyYXRpb24ucHJvbW90aW9uQ2xpY2tlZEVuaGFuY2VkO1xuICAgIGludGVncmF0aW9uLnByb2R1Y3RMaXN0Vmlld2VkID0gaW50ZWdyYXRpb24ucHJvZHVjdExpc3RWaWV3ZWRFbmhhbmNlZDtcbiAgICBpbnRlZ3JhdGlvbi5wcm9kdWN0TGlzdEZpbHRlcmVkID0gaW50ZWdyYXRpb24ucHJvZHVjdExpc3RGaWx0ZXJlZEVuaGFuY2VkO1xuICB9XG59KTtcblxuLyoqXG4gKiBJbml0aWFsaXplLlxuICpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9hZHZhbmNlZFxuICovXG5cbkdBLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGFnZUNhbGxlZCA9IGZhbHNlO1xuICB2YXIgb3B0cyA9IHRoaXMub3B0aW9ucztcblxuICAvLyBzZXR1cCB0aGUgdHJhY2tlciBnbG9iYWxzXG4gIHdpbmRvdy5Hb29nbGVBbmFseXRpY3NPYmplY3QgPSAnZ2EnO1xuICB3aW5kb3cuZ2EgPSB3aW5kb3cuZ2EgfHwgZnVuY3Rpb24oKSB7XG4gICAgd2luZG93LmdhLnEgPSB3aW5kb3cuZ2EucSB8fCBbXTtcbiAgICB3aW5kb3cuZ2EucS5wdXNoKGFyZ3VtZW50cyk7XG4gIH07XG4gIHdpbmRvdy5nYS5sID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ2xvY2FsaG9zdCcpIG9wdHMuZG9tYWluID0gJ25vbmUnO1xuXG4gIHdpbmRvdy5nYSgnY3JlYXRlJywgb3B0cy50cmFja2luZ0lkLCB7XG4gICAgLy8gRmFsbCBiYWNrIG9uIGRlZmF1bHQgdG8gcHJvdGVjdCBhZ2FpbnN0IGVtcHR5IHN0cmluZ1xuICAgIGNvb2tpZURvbWFpbjogb3B0cy5kb21haW4gfHwgR0EucHJvdG90eXBlLmRlZmF1bHRzLmRvbWFpbixcbiAgICBzaXRlU3BlZWRTYW1wbGVSYXRlOiBvcHRzLnNpdGVTcGVlZFNhbXBsZVJhdGUsXG4gICAgc2FtcGxlUmF0ZTogb3B0cy5zYW1wbGVSYXRlLFxuICAgIGFsbG93TGlua2VyOiB0cnVlXG4gIH0pO1xuXG4gIGlmIChvcHRzLm9wdGltaXplKSB3aW5kb3cuZ2EoJ3JlcXVpcmUnLCBvcHRzLm9wdGltaXplKTtcblxuICAvLyBkaXNwbGF5IGFkdmVydGlzaW5nXG4gIGlmIChvcHRzLmRvdWJsZUNsaWNrKSB7XG4gICAgd2luZG93LmdhKCdyZXF1aXJlJywgJ2Rpc3BsYXlmZWF0dXJlcycpO1xuICB9XG5cbiAgLy8gaHR0cHM6Ly9zdXBwb3J0Lmdvb2dsZS5jb20vYW5hbHl0aWNzL2Fuc3dlci8yNTU4ODY3P2hsPWVuXG4gIGlmIChvcHRzLmVuaGFuY2VkTGlua0F0dHJpYnV0aW9uKSB7XG4gICAgd2luZG93LmdhKCdyZXF1aXJlJywgJ2xpbmtpZCcsICdsaW5raWQuanMnKTtcbiAgfVxuXG4gIC8vIHNlbmQgZ2xvYmFsIGlkXG4gIGlmIChvcHRzLnNlbmRVc2VySWQgJiYgdXNlci5pZCgpKSB7XG4gICAgd2luZG93LmdhKCdzZXQnLCAndXNlcklkJywgdXNlci5pZCgpKTtcbiAgfVxuXG4gIC8vIGFub255bWl6ZSBhZnRlciBpbml0aWFsaXppbmcsIG90aGVyd2lzZSBhIHdhcm5pbmcgaXMgc2hvd25cbiAgLy8gaW4gZ29vZ2xlIGFuYWx5dGljcyBkZWJ1Z2dlclxuICBpZiAob3B0cy5hbm9ueW1pemVJcCkgd2luZG93LmdhKCdzZXQnLCAnYW5vbnltaXplSXAnLCB0cnVlKTtcblxuICAvLyBpbml0aWFsaXplIHBhZ2Ugd2l0aCBgaWRgIGFwcGVuZGVkIHRvIHVzZXIncyB0cmFpdHNcbiAgLy8gc2V0cyBgaWRgIGFzIGEgY3VzdG9tIGRpbWVuc2lvbiBmb3IgdGhlIGxpZmV0aW1lIG9mIHRoZSB0cmFja2VyIG9iamVjdCBhbmRcbiAgLy8gZW5zdXJlcyBgaWRgIHNlbnQgYXMgYSBjdXN0b20gZGltZW5zaW9uIGZvciBhbGwgaGl0cyBvbiB0aGUgcGFnZVxuICB2YXIgdXNlclRyYWl0cyA9IHVzZXIudHJhaXRzKCk7XG4gIGlmICh1c2VyLmlkKCkpIHtcbiAgICB1c2VyVHJhaXRzLmlkID0gdXNlci5pZCgpO1xuICB9XG5cbiAgLy8gY3VzdG9tIGRpbWVuc2lvbnMgJiBtZXRyaWNzXG4gIHZhciBjdXN0b20gPSBtZXRyaWNzKHVzZXJUcmFpdHMsIG9wdHMpO1xuICBpZiAobGVuKGN1c3RvbSkpIHdpbmRvdy5nYSgnc2V0JywgY3VzdG9tKTtcblxuICB0aGlzLmxvYWQoJ2xpYnJhcnknLCB0aGlzLnJlYWR5KTtcbn07XG5cbi8qKlxuICogTG9hZGVkP1xuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuR0EucHJvdG90eXBlLmxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gISF3aW5kb3cuZ2FwbHVnaW5zO1xufTtcblxuLyoqXG4gKiBQYWdlLlxuICpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9wYWdlc1xuICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL3NpbmdsZS1wYWdlLWFwcGxpY2F0aW9ucyNtdWx0aXBsZS1oaXRzXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqIEBwYXJhbSB7UGFnZX0gcGFnZVxuICovXG5cbkdBLnByb3RvdHlwZS5wYWdlID0gZnVuY3Rpb24ocGFnZSkge1xuICB2YXIgY2F0ZWdvcnkgPSBwYWdlLmNhdGVnb3J5KCk7XG4gIHZhciBwcm9wcyA9IHBhZ2UucHJvcGVydGllcygpO1xuICB2YXIgbmFtZSA9IHBhZ2UuZnVsbE5hbWUoKTtcbiAgdmFyIG9wdHMgPSB0aGlzLm9wdGlvbnM7XG4gIHZhciBjYW1wYWlnbiA9IHBhZ2UucHJveHkoJ2NvbnRleHQuY2FtcGFpZ24nKSB8fCB7fTtcbiAgdmFyIHBhZ2V2aWV3ID0ge307XG4gIHZhciBwYWdlUGF0aCA9IHBhdGgocHJvcHMsIHRoaXMub3B0aW9ucyk7XG4gIHZhciBwYWdlVGl0bGUgPSBuYW1lIHx8IHByb3BzLnRpdGxlO1xuICB2YXIgcGFnZVJlZmVycmVyID0gcGFnZS5yZWZlcnJlcigpIHx8ICcnO1xuICB2YXIgdHJhY2s7XG5cbiAgLy8gc3RvcmUgZm9yIGxhdGVyXG4gIC8vIFRPRE86IFdoeT8gRG9jdW1lbnQgdGhpcyBiZXR0ZXJcbiAgdGhpcy5fY2F0ZWdvcnkgPSBjYXRlZ29yeTtcblxuICBwYWdldmlldy5wYWdlID0gcGFnZVBhdGg7XG4gIHBhZ2V2aWV3LnRpdGxlID0gcGFnZVRpdGxlO1xuICBwYWdldmlldy5sb2NhdGlvbiA9IHByb3BzLnVybDtcblxuICBpZiAoY2FtcGFpZ24ubmFtZSkgcGFnZXZpZXcuY2FtcGFpZ25OYW1lID0gY2FtcGFpZ24ubmFtZTtcbiAgaWYgKGNhbXBhaWduLnNvdXJjZSkgcGFnZXZpZXcuY2FtcGFpZ25Tb3VyY2UgPSBjYW1wYWlnbi5zb3VyY2U7XG4gIGlmIChjYW1wYWlnbi5tZWRpdW0pIHBhZ2V2aWV3LmNhbXBhaWduTWVkaXVtID0gY2FtcGFpZ24ubWVkaXVtO1xuICBpZiAoY2FtcGFpZ24uY29udGVudCkgcGFnZXZpZXcuY2FtcGFpZ25Db250ZW50ID0gY2FtcGFpZ24uY29udGVudDtcbiAgaWYgKGNhbXBhaWduLnRlcm0pIHBhZ2V2aWV3LmNhbXBhaWduS2V5d29yZCA9IGNhbXBhaWduLnRlcm07XG5cbiAgLy8gc2V0XG4gIHZhciBwYXlsb2FkID0ge1xuICAgIHBhZ2U6IHBhZ2VQYXRoLFxuICAgIHRpdGxlOiBwYWdlVGl0bGVcbiAgfTtcblxuICAvLyBjdXN0b20gZGltZW5zaW9ucywgbWV0cmljcyBhbmQgY29udGVudCBncm91cGluZ3NcbiAgdmFyIGN1c3RvbSA9IG1ldHJpY3MocHJvcHMsIG9wdHMpO1xuICBpZiAobGVuKGN1c3RvbSkpIHtcbiAgICBpZiAob3B0cy5zZXRBbGxNYXBwZWRQcm9wcykge1xuICAgICAgd2luZG93LmdhKCdzZXQnLCBjdXN0b20pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBZGQgY3VzdG9tIGRpbWVuc2lvbnMgLyBtZXRyaWNzIHRvIHBhZ2V2aWV3IHBheWxvYWRcbiAgICAgIGVhY2goY3VzdG9tLCBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgIHBhZ2V2aWV3W2tleV0gPSB2YWx1ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBcbiAgaWYgKHBhZ2VSZWZlcnJlciAhPT0gZG9jdW1lbnQucmVmZXJyZXIpIHBheWxvYWQucmVmZXJyZXIgPSBwYWdlUmVmZXJyZXI7IC8vIGFsbG93IHJlZmVycmVyIG92ZXJyaWRlIGlmIHJlZmVycmVyIHdhcyBtYW51YWxseSBzZXRcbiAgd2luZG93LmdhKCdzZXQnLCBwYXlsb2FkKTtcblxuICBpZiAodGhpcy5wYWdlQ2FsbGVkKSBkZWxldGUgcGFnZXZpZXcubG9jYXRpb247XG5cbiAgLy8gc2VuZFxuICB3aW5kb3cuZ2EoJ3NlbmQnLCAncGFnZXZpZXcnLCBwYWdldmlldyk7XG5cbiAgLy8gY2F0ZWdvcml6ZWQgcGFnZXNcbiAgaWYgKGNhdGVnb3J5ICYmIHRoaXMub3B0aW9ucy50cmFja0NhdGVnb3JpemVkUGFnZXMpIHtcbiAgICB0cmFjayA9IHBhZ2UudHJhY2soY2F0ZWdvcnkpO1xuICAgIHRoaXMudHJhY2sodHJhY2ssIHsgbm9uSW50ZXJhY3Rpb246IDEgfSk7XG4gIH1cblxuICAvLyBuYW1lZCBwYWdlc1xuICBpZiAobmFtZSAmJiB0aGlzLm9wdGlvbnMudHJhY2tOYW1lZFBhZ2VzKSB7XG4gICAgdHJhY2sgPSBwYWdlLnRyYWNrKG5hbWUpO1xuICAgIHRoaXMudHJhY2sodHJhY2ssIHsgbm9uSW50ZXJhY3Rpb246IDEgfSk7XG4gIH1cblxuICB0aGlzLnBhZ2VDYWxsZWQgPSB0cnVlO1xufTtcblxuLyoqXG4gKiBJZGVudGlmeS5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICogQHBhcmFtIHtJZGVudGlmeX0gZXZlbnRcbiAqL1xuXG5HQS5wcm90b3R5cGUuaWRlbnRpZnkgPSBmdW5jdGlvbihpZGVudGlmeSkge1xuICB2YXIgb3B0cyA9IHRoaXMub3B0aW9ucztcblxuICBpZiAob3B0cy5zZW5kVXNlcklkICYmIGlkZW50aWZ5LnVzZXJJZCgpKSB7XG4gICAgd2luZG93LmdhKCdzZXQnLCAndXNlcklkJywgaWRlbnRpZnkudXNlcklkKCkpO1xuICB9XG5cbiAgLy8gU2V0IGRpbWVuc2lvbnNcbiAgdmFyIGN1c3RvbSA9IG1ldHJpY3MoaWRlbnRpZnkudHJhaXRzKCksIG9wdHMpO1xuICBpZiAobGVuKGN1c3RvbSkpIHdpbmRvdy5nYSgnc2V0JywgY3VzdG9tKTtcbn07XG5cbi8qKlxuICogVHJhY2suXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2V2ZW50c1xuICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2ZpZWxkLXJlZmVyZW5jZVxuICpcbiAqIEBwYXJhbSB7VHJhY2t9IGV2ZW50XG4gKi9cblxuR0EucHJvdG90eXBlLnRyYWNrID0gZnVuY3Rpb24odHJhY2ssIG9wdGlvbnMpIHtcbiAgdmFyIGNvbnRleHRPcHRzID0gdHJhY2sub3B0aW9ucyh0aGlzLm5hbWUpO1xuICB2YXIgaW50ZXJmYWNlT3B0cyA9IHRoaXMub3B0aW9ucztcbiAgdmFyIG9wdHMgPSBkZWZhdWx0cyhvcHRpb25zIHx8IHt9LCBjb250ZXh0T3B0cyk7XG4gIG9wdHMgPSBkZWZhdWx0cyhvcHRzLCBpbnRlcmZhY2VPcHRzKTtcbiAgdmFyIHByb3BzID0gdHJhY2sucHJvcGVydGllcygpO1xuICB2YXIgY2FtcGFpZ24gPSB0cmFjay5wcm94eSgnY29udGV4dC5jYW1wYWlnbicpIHx8IHt9O1xuXG4gIHZhciBwYXlsb2FkID0ge1xuICAgIGV2ZW50QWN0aW9uOiB0cmFjay5ldmVudCgpLFxuICAgIGV2ZW50Q2F0ZWdvcnk6IHRyYWNrLmNhdGVnb3J5KCkgfHwgdGhpcy5fY2F0ZWdvcnkgfHwgJ0FsbCcsXG4gICAgZXZlbnRMYWJlbDogcHJvcHMubGFiZWwsXG4gICAgZXZlbnRWYWx1ZTogZm9ybWF0VmFsdWUocHJvcHMudmFsdWUgfHwgdHJhY2sucmV2ZW51ZSgpKSxcbiAgICAvLyBBbGxvdyB1c2VycyB0byBvdmVycmlkZSB0aGVpciBub25JbnRlcmFjdGlvbiBpbnRlZ3JhdGlvbiBzZXR0aW5nIGZvciBhbnkgc2luZ2xlIHBhcnRpY2x1YXIgZXZlbnQuXG4gICAgbm9uSW50ZXJhY3Rpb246IHByb3BzLm5vbkludGVyYWN0aW9uICE9PSB1bmRlZmluZWQgPyAhIXByb3BzLm5vbkludGVyYWN0aW9uIDogISFvcHRzLm5vbkludGVyYWN0aW9uXG4gIH07XG5cbiAgaWYgKGNhbXBhaWduLm5hbWUpIHBheWxvYWQuY2FtcGFpZ25OYW1lID0gY2FtcGFpZ24ubmFtZTtcbiAgaWYgKGNhbXBhaWduLnNvdXJjZSkgcGF5bG9hZC5jYW1wYWlnblNvdXJjZSA9IGNhbXBhaWduLnNvdXJjZTtcbiAgaWYgKGNhbXBhaWduLm1lZGl1bSkgcGF5bG9hZC5jYW1wYWlnbk1lZGl1bSA9IGNhbXBhaWduLm1lZGl1bTtcbiAgaWYgKGNhbXBhaWduLmNvbnRlbnQpIHBheWxvYWQuY2FtcGFpZ25Db250ZW50ID0gY2FtcGFpZ24uY29udGVudDtcbiAgaWYgKGNhbXBhaWduLnRlcm0pIHBheWxvYWQuY2FtcGFpZ25LZXl3b3JkID0gY2FtcGFpZ24udGVybTtcbiAgXG4gIC8vIGN1c3RvbSBkaW1lbnNpb25zICYgbWV0cmljc1xuICB2YXIgY3VzdG9tID0gbWV0cmljcyhwcm9wcywgaW50ZXJmYWNlT3B0cyk7XG4gIGlmIChsZW4oY3VzdG9tKSkge1xuICAgIGlmIChpbnRlcmZhY2VPcHRzLnNldEFsbE1hcHBlZFByb3BzKSB7XG4gICAgICB3aW5kb3cuZ2EoJ3NldCcsIGN1c3RvbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFkZCBjdXN0b20gZGltZW5zaW9ucyAvIG1ldHJpY3MgdG8gcGF5bG9hZFxuICAgICAgZWFjaChjdXN0b20sIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgcGF5bG9hZFtrZXldID0gdmFsdWU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB3aW5kb3cuZ2EoJ3NlbmQnLCAnZXZlbnQnLCBwYXlsb2FkKTtcbn07XG5cbi8qKlxuICogT3JkZXIgY29tcGxldGVkLlxuICpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9lY29tbWVyY2VcbiAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9lY29tbWVyY2UjbXVsdGljdXJyZW5jeVxuICpcbiAqIEBwYXJhbSB7VHJhY2t9IHRyYWNrXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5HQS5wcm90b3R5cGUub3JkZXJDb21wbGV0ZWQgPSBmdW5jdGlvbih0cmFjaykge1xuICB2YXIgdG90YWwgPSB0cmFjay50b3RhbCgpIHx8IHRyYWNrLnJldmVudWUoKSB8fCAwO1xuICB2YXIgb3JkZXJJZCA9IHRyYWNrLm9yZGVySWQoKTtcbiAgdmFyIHByb2R1Y3RzID0gdHJhY2sucHJvZHVjdHMoKTtcbiAgdmFyIHByb3BzID0gdHJhY2sucHJvcGVydGllcygpO1xuXG4gIC8vIG9yZGVySWQgaXMgcmVxdWlyZWQuXG4gIGlmICghb3JkZXJJZCkgcmV0dXJuO1xuXG4gIC8vIHJlcXVpcmUgZWNvbW1lcmNlXG4gIGlmICghdGhpcy5lY29tbWVyY2UpIHtcbiAgICB3aW5kb3cuZ2EoJ3JlcXVpcmUnLCAnZWNvbW1lcmNlJyk7XG4gICAgdGhpcy5lY29tbWVyY2UgPSB0cnVlO1xuICB9XG5cbiAgLy8gYWRkIHRyYW5zYWN0aW9uXG4gIHdpbmRvdy5nYSgnZWNvbW1lcmNlOmFkZFRyYW5zYWN0aW9uJywge1xuICAgIGFmZmlsaWF0aW9uOiBwcm9wcy5hZmZpbGlhdGlvbixcbiAgICBzaGlwcGluZzogdHJhY2suc2hpcHBpbmcoKSxcbiAgICByZXZlbnVlOiB0b3RhbCxcbiAgICB0YXg6IHRyYWNrLnRheCgpLFxuICAgIGlkOiBvcmRlcklkLFxuICAgIGN1cnJlbmN5OiB0cmFjay5jdXJyZW5jeSgpXG4gIH0pO1xuXG4gIC8vIGFkZCBwcm9kdWN0c1xuICBlYWNoKHByb2R1Y3RzLCBmdW5jdGlvbihwcm9kdWN0KSB7XG4gICAgdmFyIHByb2R1Y3RUcmFjayA9IGNyZWF0ZVByb2R1Y3RUcmFjayh0cmFjaywgcHJvZHVjdCk7XG4gICAgd2luZG93LmdhKCdlY29tbWVyY2U6YWRkSXRlbScsIHtcbiAgICAgIGNhdGVnb3J5OiBwcm9kdWN0VHJhY2suY2F0ZWdvcnkoKSxcbiAgICAgIHF1YW50aXR5OiBwcm9kdWN0VHJhY2sucXVhbnRpdHkoKSxcbiAgICAgIHByaWNlOiBwcm9kdWN0VHJhY2sucHJpY2UoKSxcbiAgICAgIG5hbWU6IHByb2R1Y3RUcmFjay5uYW1lKCksXG4gICAgICBza3U6IHByb2R1Y3RUcmFjay5za3UoKSxcbiAgICAgIGlkOiBvcmRlcklkLFxuICAgICAgY3VycmVuY3k6IHByb2R1Y3RUcmFjay5jdXJyZW5jeSgpXG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIHNlbmRcbiAgd2luZG93LmdhKCdlY29tbWVyY2U6c2VuZCcpO1xufTtcblxuLyoqXG4gKiBJbml0aWFsaXplIChjbGFzc2ljKS5cbiAqXG4gKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vZ2Fqcy9tZXRob2RzL2dhSlNBcGlCYXNpY0NvbmZpZ3VyYXRpb25cbiAqL1xuXG5HQS5wcm90b3R5cGUuaW5pdGlhbGl6ZUNsYXNzaWMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG9wdHMgPSB0aGlzLm9wdGlvbnM7XG4gIHZhciBhbm9ueW1pemUgPSBvcHRzLmFub255bWl6ZUlwO1xuICB2YXIgZG9tYWluID0gb3B0cy5kb21haW47XG4gIHZhciBlbmhhbmNlZCA9IG9wdHMuZW5oYW5jZWRMaW5rQXR0cmlidXRpb247XG4gIHZhciBpZ25vcmUgPSBvcHRzLmlnbm9yZWRSZWZlcnJlcnM7XG4gIHZhciBzYW1wbGUgPSBvcHRzLnNpdGVTcGVlZFNhbXBsZVJhdGU7XG5cbiAgd2luZG93Ll9nYXEgPSB3aW5kb3cuX2dhcSB8fCBbXTtcbiAgcHVzaCgnX3NldEFjY291bnQnLCBvcHRzLnRyYWNraW5nSWQpO1xuICBwdXNoKCdfc2V0QWxsb3dMaW5rZXInLCB0cnVlKTtcblxuICBpZiAoYW5vbnltaXplKSBwdXNoKCdfZ2F0Ll9hbm9ueW1pemVJcCcpO1xuICBpZiAoZG9tYWluKSBwdXNoKCdfc2V0RG9tYWluTmFtZScsIGRvbWFpbik7XG4gIGlmIChzYW1wbGUpIHB1c2goJ19zZXRTaXRlU3BlZWRTYW1wbGVSYXRlJywgc2FtcGxlKTtcblxuICBpZiAoZW5oYW5jZWQpIHtcbiAgICB2YXIgcHJvdG9jb2wgPSBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOicgPyAnaHR0cHM6JyA6ICdodHRwOic7XG4gICAgdmFyIHBsdWdpblVybCA9IHByb3RvY29sICsgJy8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL3BsdWdpbnMvZ2EvaW5wYWdlX2xpbmtpZC5qcyc7XG4gICAgcHVzaCgnX3JlcXVpcmUnLCAnaW5wYWdlX2xpbmtpZCcsIHBsdWdpblVybCk7XG4gIH1cblxuICBpZiAoaWdub3JlKSB7XG4gICAgaWYgKCFpcy5hcnJheShpZ25vcmUpKSBpZ25vcmUgPSBbaWdub3JlXTtcbiAgICBlYWNoKGlnbm9yZSwgZnVuY3Rpb24oZG9tYWluKSB7XG4gICAgICBwdXNoKCdfYWRkSWdub3JlZFJlZicsIGRvbWFpbik7XG4gICAgfSk7XG4gIH1cblxuICBpZiAodGhpcy5vcHRpb25zLmRvdWJsZUNsaWNrKSB7XG4gICAgdGhpcy5sb2FkKCdkb3VibGUgY2xpY2snLCB0aGlzLnJlYWR5KTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbmFtZSA9IHVzZUh0dHBzKCkgPyAnaHR0cHMnIDogJ2h0dHAnO1xuICAgIHRoaXMubG9hZChuYW1lLCB0aGlzLnJlYWR5KTtcbiAgfVxufTtcblxuLyoqXG4gKiBMb2FkZWQ/IChjbGFzc2ljKVxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuR0EucHJvdG90eXBlLmxvYWRlZENsYXNzaWMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICEhKHdpbmRvdy5fZ2FxICYmIHdpbmRvdy5fZ2FxLnB1c2ggIT09IEFycmF5LnByb3RvdHlwZS5wdXNoKTtcbn07XG5cbi8qKlxuICogUGFnZSAoY2xhc3NpYykuXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2dhanMvbWV0aG9kcy9nYUpTQXBpQmFzaWNDb25maWd1cmF0aW9uXG4gKlxuICogQHBhcmFtIHtQYWdlfSBwYWdlXG4gKi9cblxuR0EucHJvdG90eXBlLnBhZ2VDbGFzc2ljID0gZnVuY3Rpb24ocGFnZSkge1xuICB2YXIgY2F0ZWdvcnkgPSBwYWdlLmNhdGVnb3J5KCk7XG4gIHZhciBwcm9wcyA9IHBhZ2UucHJvcGVydGllcygpO1xuICB2YXIgbmFtZSA9IHBhZ2UuZnVsbE5hbWUoKTtcbiAgdmFyIHRyYWNrO1xuXG4gIHB1c2goJ190cmFja1BhZ2V2aWV3JywgcGF0aChwcm9wcywgdGhpcy5vcHRpb25zKSk7XG5cbiAgLy8gY2F0ZWdvcml6ZWQgcGFnZXNcbiAgaWYgKGNhdGVnb3J5ICYmIHRoaXMub3B0aW9ucy50cmFja0NhdGVnb3JpemVkUGFnZXMpIHtcbiAgICB0cmFjayA9IHBhZ2UudHJhY2soY2F0ZWdvcnkpO1xuICAgIHRoaXMudHJhY2sodHJhY2ssIHsgbm9uSW50ZXJhY3Rpb246IDEgfSk7XG4gIH1cblxuICAvLyBuYW1lZCBwYWdlc1xuICBpZiAobmFtZSAmJiB0aGlzLm9wdGlvbnMudHJhY2tOYW1lZFBhZ2VzKSB7XG4gICAgdHJhY2sgPSBwYWdlLnRyYWNrKG5hbWUpO1xuICAgIHRoaXMudHJhY2sodHJhY2ssIHsgbm9uSW50ZXJhY3Rpb246IDEgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogVHJhY2sgKGNsYXNzaWMpLlxuICpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9nYWpzL21ldGhvZHMvZ2FKU0FwaUV2ZW50VHJhY2tpbmdcbiAqXG4gKiBAcGFyYW0ge1RyYWNrfSB0cmFja1xuICovXG5cbkdBLnByb3RvdHlwZS50cmFja0NsYXNzaWMgPSBmdW5jdGlvbih0cmFjaywgb3B0aW9ucykge1xuICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwgdHJhY2sub3B0aW9ucyh0aGlzLm5hbWUpO1xuICB2YXIgcHJvcHMgPSB0cmFjay5wcm9wZXJ0aWVzKCk7XG4gIHZhciByZXZlbnVlID0gdHJhY2sucmV2ZW51ZSgpO1xuICB2YXIgZXZlbnQgPSB0cmFjay5ldmVudCgpO1xuICB2YXIgY2F0ZWdvcnkgPSB0aGlzLl9jYXRlZ29yeSB8fCB0cmFjay5jYXRlZ29yeSgpIHx8ICdBbGwnO1xuICB2YXIgbGFiZWwgPSBwcm9wcy5sYWJlbDtcbiAgdmFyIHZhbHVlID0gZm9ybWF0VmFsdWUocmV2ZW51ZSB8fCBwcm9wcy52YWx1ZSk7XG4gIHZhciBub25JbnRlcmFjdGlvbiA9ICEhKHByb3BzLm5vbkludGVyYWN0aW9uIHx8IG9wdHMubm9uSW50ZXJhY3Rpb24pO1xuICBwdXNoKCdfdHJhY2tFdmVudCcsIGNhdGVnb3J5LCBldmVudCwgbGFiZWwsIHZhbHVlLCBub25JbnRlcmFjdGlvbik7XG59O1xuXG4vKipcbiAqIENvbXBsZXRlZCBvcmRlci5cbiAqXG4gKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vZ2Fqcy9nYVRyYWNraW5nRWNvbW1lcmNlXG4gKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vZ2Fqcy9nYVRyYWNraW5nRWNvbW1lcmNlI2xvY2FsY3VycmVuY2llc1xuICpcbiAqIEBwYXJhbSB7VHJhY2t9IHRyYWNrXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5HQS5wcm90b3R5cGUuY29tcGxldGVkT3JkZXJDbGFzc2ljID0gZnVuY3Rpb24odHJhY2spIHtcbiAgdmFyIHRvdGFsID0gdHJhY2sudG90YWwoKSB8fCB0cmFjay5yZXZlbnVlKCkgfHwgMDtcbiAgdmFyIG9yZGVySWQgPSB0cmFjay5vcmRlcklkKCk7XG4gIHZhciBwcm9kdWN0cyA9IHRyYWNrLnByb2R1Y3RzKCkgfHwgW107XG4gIHZhciBwcm9wcyA9IHRyYWNrLnByb3BlcnRpZXMoKTtcbiAgdmFyIGN1cnJlbmN5ID0gdHJhY2suY3VycmVuY3koKTtcblxuICAvLyByZXF1aXJlZFxuICBpZiAoIW9yZGVySWQpIHJldHVybjtcblxuICAvLyBhZGQgdHJhbnNhY3Rpb25cbiAgcHVzaCgnX2FkZFRyYW5zJyxcbiAgICBvcmRlcklkLFxuICAgIHByb3BzLmFmZmlsaWF0aW9uLFxuICAgIHRvdGFsLFxuICAgIHRyYWNrLnRheCgpLFxuICAgIHRyYWNrLnNoaXBwaW5nKCksXG4gICAgdHJhY2suY2l0eSgpLFxuICAgIHRyYWNrLnN0YXRlKCksXG4gICAgdHJhY2suY291bnRyeSgpKTtcblxuICAvLyBhZGQgaXRlbXNcbiAgZWFjaChwcm9kdWN0cywgZnVuY3Rpb24ocHJvZHVjdCkge1xuICAgIHZhciB0cmFjayA9IG5ldyBUcmFjayh7IHByb3BlcnRpZXM6IHByb2R1Y3QgfSk7XG4gICAgcHVzaCgnX2FkZEl0ZW0nLFxuICAgICAgb3JkZXJJZCxcbiAgICAgIHRyYWNrLnNrdSgpLFxuICAgICAgdHJhY2submFtZSgpLFxuICAgICAgdHJhY2suY2F0ZWdvcnkoKSxcbiAgICAgIHRyYWNrLnByaWNlKCksXG4gICAgICB0cmFjay5xdWFudGl0eSgpKTtcbiAgfSk7XG5cbiAgLy8gc2VuZFxuICBwdXNoKCdfc2V0JywgJ2N1cnJlbmN5Q29kZScsIGN1cnJlbmN5KTtcbiAgcHVzaCgnX3RyYWNrVHJhbnMnKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBwYXRoIGJhc2VkIG9uIGBwcm9wZXJ0aWVzYCBhbmQgYG9wdGlvbnNgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7c3RyaW5nfHVuZGVmaW5lZH1cbiAqL1xuXG5mdW5jdGlvbiBwYXRoKHByb3BlcnRpZXMsIG9wdGlvbnMpIHtcbiAgaWYgKCFwcm9wZXJ0aWVzKSByZXR1cm47XG4gIHZhciBzdHIgPSBwcm9wZXJ0aWVzLnBhdGg7XG4gIGlmIChvcHRpb25zLmluY2x1ZGVTZWFyY2ggJiYgcHJvcGVydGllcy5zZWFyY2gpIHN0ciArPSBwcm9wZXJ0aWVzLnNlYXJjaDtcbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiBGb3JtYXQgdGhlIHZhbHVlIHByb3BlcnR5IHRvIEdvb2dsZSdzIGxpa2luZy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRWYWx1ZSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlIHx8IHZhbHVlIDwgMCkgcmV0dXJuIDA7XG4gIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBNYXAgZ29vZ2xlJ3MgY3VzdG9tIGRpbWVuc2lvbnMsIG1ldHJpY3MgJiBjb250ZW50IGdyb3VwaW5ncyB3aXRoIGBvYmpgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgICBtZXRyaWNzKHsgcmV2ZW51ZTogMS45IH0sIHsgeyBtZXRyaWNzIDogeyByZXZlbnVlOiAnbWV0cmljOCcgfSB9KTtcbiAqICAgICAgLy8gPT4geyBtZXRyaWM4OiAxLjkgfVxuICpcbiAqICAgICAgbWV0cmljcyh7IHJldmVudWU6IDEuOSB9LCB7fSk7XG4gKiAgICAgIC8vID0+IHt9XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAqIEByZXR1cm4ge09iamVjdHxudWxsfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWV0cmljcyhvYmosIGRhdGEpIHtcbiAgdmFyIGRpbWVuc2lvbnMgPSBkYXRhLmRpbWVuc2lvbnM7XG4gIHZhciBtZXRyaWNzID0gZGF0YS5tZXRyaWNzO1xuICB2YXIgY29udGVudEdyb3VwaW5ncyA9IGRhdGEuY29udGVudEdyb3VwaW5ncztcblxuICB2YXIgcmV0ID0ge307XG5cbiAgZWFjaChbbWV0cmljcywgZGltZW5zaW9ucywgY29udGVudEdyb3VwaW5nc10sIGZ1bmN0aW9uKGdyb3VwKSB7XG4gICAgZWFjaChncm91cCwgZnVuY3Rpb24ocHJvcCwga2V5KSB7XG4gICAgICB2YXIgdmFsdWUgPSBkb3Qob2JqLCBwcm9wKSB8fCBvYmpbcHJvcF07XG4gICAgICBpZiAoaXMuYm9vbCh2YWx1ZSkpIHZhbHVlID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgIGlmICh2YWx1ZSB8fCB2YWx1ZSA9PT0gMCkgcmV0W2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuLyoqXG4gKiBMb2FkcyBlYy5qcyAodW5sZXNzIGFscmVhZHkgbG9hZGVkKVxuICpcbiAqIEBwYXJhbSB7VHJhY2t9IHRyYWNrXG4gKi9cblxuR0EucHJvdG90eXBlLmxvYWRFbmhhbmNlZEVjb21tZXJjZSA9IGZ1bmN0aW9uKHRyYWNrKSB7XG4gIGlmICghdGhpcy5lbmhhbmNlZEVjb21tZXJjZUxvYWRlZCkge1xuICAgIHdpbmRvdy5nYSgncmVxdWlyZScsICdlYycpO1xuICAgIHRoaXMuZW5oYW5jZWRFY29tbWVyY2VMb2FkZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8gRW5zdXJlIHdlIHNldCBjdXJyZW5jeSBmb3IgZXZlcnkgaGl0XG4gIHdpbmRvdy5nYSgnc2V0JywgJyZjdScsIHRyYWNrLmN1cnJlbmN5KCkpO1xufTtcblxuLyoqXG4gKiBQdXNoZXMgYW4gZXZlbnQgYW5kIGFsbCBwcmV2aW91c2x5IHNldCBFRSBkYXRhIHRvIEdBLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHtUcmFja30gdHJhY2tcbiAqL1xuXG5HQS5wcm90b3R5cGUucHVzaEVuaGFuY2VkRWNvbW1lcmNlID0gZnVuY3Rpb24odHJhY2spIHtcbiAgLy8gU2VuZCBhIGN1c3RvbSBub24taW50ZXJhY3Rpb24gZXZlbnQgdG8gZW5zdXJlIGFsbCBFRSBkYXRhIGlzIHB1c2hlZC5cbiAgLy8gV2l0aG91dCBkb2luZyB0aGlzIHdlJ2QgbmVlZCB0byByZXF1aXJlIHBhZ2UgZGlzcGxheSBhZnRlciBzZXR0aW5nIEVFIGRhdGEuXG4gIHZhciBhcmdzID0gcmVqZWN0KFtcbiAgICAnc2VuZCcsXG4gICAgJ2V2ZW50JyxcbiAgICB0cmFjay5jYXRlZ29yeSgpIHx8ICdFbmhhbmNlZEVjb21tZXJjZScsXG4gICAgdHJhY2suZXZlbnQoKSB8fCAnQWN0aW9uIG5vdCBkZWZpbmVkJyxcbiAgICB0cmFjay5wcm9wZXJ0aWVzKCkubGFiZWwsXG4gICAgeyBub25JbnRlcmFjdGlvbjogMSB9XG4gIF0pO1xuICB3aW5kb3cuZ2EuYXBwbHkod2luZG93LCBhcmdzKTtcbn07XG5cbi8qKlxuICogU3RhcnRlZCBvcmRlciAtIEVuaGFuY2VkIEVjb21tZXJjZVxuICpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9lbmhhbmNlZC1lY29tbWVyY2UjY2hlY2tvdXQtc3RlcHNcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqIEBwYXJhbSB7VHJhY2t9IHRyYWNrXG4gKi9cblxuR0EucHJvdG90eXBlLmNoZWNrb3V0U3RhcnRlZEVuaGFuY2VkID0gZnVuY3Rpb24odHJhY2spIHtcbiAgLy8gc2FtZSBhcyB2aWV3ZWQgY2hlY2tvdXQgc3RlcCAjMVxuICB0aGlzLmNoZWNrb3V0U3RlcFZpZXdlZCh0cmFjayk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZWQgb3JkZXIgLSBFbmhhbmNlZCBFY29tbWVyY2VcbiAqXG4gKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vYW5hbHl0aWNzanMvZW5oYW5jZWQtZWNvbW1lcmNlI2NoZWNrb3V0LXN0ZXBzXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKiBAcGFyYW0ge1RyYWNrfSB0cmFja1xuICovXG5cbkdBLnByb3RvdHlwZS5vcmRlclVwZGF0ZWRFbmhhbmNlZCA9IGZ1bmN0aW9uKHRyYWNrKSB7XG4gIC8vIFNhbWUgZXZlbnQgYXMgc3RhcnRlZCBvcmRlciAtIHdpbGwgb3ZlcnJpZGVcbiAgdGhpcy5jaGVja291dFN0YXJ0ZWRFbmhhbmNlZCh0cmFjayk7XG59O1xuXG4vKipcbiAqIFZpZXdlZCBjaGVja291dCBzdGVwIC0gRW5oYW5jZWQgRWNvbW1lcmNlXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2VuaGFuY2VkLWVjb21tZXJjZSNjaGVja291dC1zdGVwc1xuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHtUcmFja30gdHJhY2tcbiAqL1xuXG5HQS5wcm90b3R5cGUuY2hlY2tvdXRTdGVwVmlld2VkRW5oYW5jZWQgPSBmdW5jdGlvbih0cmFjaykge1xuICB2YXIgcHJvZHVjdHMgPSB0cmFjay5wcm9kdWN0cygpO1xuICB2YXIgcHJvcHMgPSB0cmFjay5wcm9wZXJ0aWVzKCk7XG4gIHZhciBvcHRpb25zID0gZXh0cmFjdENoZWNrb3V0T3B0aW9ucyhwcm9wcyk7XG5cbiAgdGhpcy5sb2FkRW5oYW5jZWRFY29tbWVyY2UodHJhY2spO1xuXG4gIGVhY2gocHJvZHVjdHMsIGZ1bmN0aW9uKHByb2R1Y3QpIHtcbiAgICB2YXIgcHJvZHVjdFRyYWNrID0gY3JlYXRlUHJvZHVjdFRyYWNrKHRyYWNrLCBwcm9kdWN0KTtcbiAgICBlbmhhbmNlZEVjb21tZXJjZVRyYWNrUHJvZHVjdChwcm9kdWN0VHJhY2spO1xuICB9KTtcblxuICB3aW5kb3cuZ2EoJ2VjOnNldEFjdGlvbicsICdjaGVja291dCcsIHtcbiAgICBzdGVwOiBwcm9wcy5zdGVwIHx8IDEsXG4gICAgb3B0aW9uOiBvcHRpb25zIHx8IHVuZGVmaW5lZFxuICB9KTtcblxuICB0aGlzLnB1c2hFbmhhbmNlZEVjb21tZXJjZSh0cmFjayk7XG59O1xuXG4vKipcbiAqIENvbXBsZXRlZCBjaGVja291dCBzdGVwIC0gRW5oYW5jZWQgRWNvbW1lcmNlXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2VuaGFuY2VkLWVjb21tZXJjZSNjaGVja291dC1vcHRpb25zXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKiBAcGFyYW0ge1RyYWNrfSB0cmFja1xuICovXG5cbkdBLnByb3RvdHlwZS5jaGVja291dFN0ZXBDb21wbGV0ZWRFbmhhbmNlZCA9IGZ1bmN0aW9uKHRyYWNrKSB7XG4gIHZhciBwcm9wcyA9IHRyYWNrLnByb3BlcnRpZXMoKTtcbiAgdmFyIG9wdGlvbnMgPSBleHRyYWN0Q2hlY2tvdXRPcHRpb25zKHByb3BzKTtcblxuICAvLyBPbmx5IHNlbmQgYW4gZXZlbnQgaWYgd2UgaGF2ZSBzdGVwIGFuZCBvcHRpb25zIHRvIHVwZGF0ZVxuICBpZiAoIXByb3BzLnN0ZXAgfHwgIW9wdGlvbnMpIHJldHVybjtcblxuICB0aGlzLmxvYWRFbmhhbmNlZEVjb21tZXJjZSh0cmFjayk7XG5cbiAgd2luZG93LmdhKCdlYzpzZXRBY3Rpb24nLCAnY2hlY2tvdXRfb3B0aW9uJywge1xuICAgIHN0ZXA6IHByb3BzLnN0ZXAgfHwgMSxcbiAgICBvcHRpb246IG9wdGlvbnNcbiAgfSk7XG5cbiAgd2luZG93LmdhKCdzZW5kJywgJ2V2ZW50JywgJ0NoZWNrb3V0JywgJ09wdGlvbicpO1xufTtcblxuLyoqXG4gKiBDb21wbGV0ZWQgb3JkZXIgLSBFbmhhbmNlZCBFY29tbWVyY2VcbiAqXG4gKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vYW5hbHl0aWNzanMvZW5oYW5jZWQtZWNvbW1lcmNlI21lYXN1cmluZy10cmFuc2FjdGlvbnNcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqIEBwYXJhbSB7VHJhY2t9IHRyYWNrXG4gKi9cblxuR0EucHJvdG90eXBlLm9yZGVyQ29tcGxldGVkRW5oYW5jZWQgPSBmdW5jdGlvbih0cmFjaykge1xuICB2YXIgdG90YWwgPSB0cmFjay50b3RhbCgpIHx8IHRyYWNrLnJldmVudWUoKSB8fCAwO1xuICB2YXIgb3JkZXJJZCA9IHRyYWNrLm9yZGVySWQoKTtcbiAgdmFyIHByb2R1Y3RzID0gdHJhY2sucHJvZHVjdHMoKTtcbiAgdmFyIHByb3BzID0gdHJhY2sucHJvcGVydGllcygpO1xuXG4gIC8vIG9yZGVySWQgaXMgcmVxdWlyZWQuXG4gIGlmICghb3JkZXJJZCkgcmV0dXJuO1xuXG4gIHRoaXMubG9hZEVuaGFuY2VkRWNvbW1lcmNlKHRyYWNrKTtcblxuICBlYWNoKHByb2R1Y3RzLCBmdW5jdGlvbihwcm9kdWN0KSB7XG4gICAgdmFyIHByb2R1Y3RUcmFjayA9IGNyZWF0ZVByb2R1Y3RUcmFjayh0cmFjaywgcHJvZHVjdCk7XG4gICAgZW5oYW5jZWRFY29tbWVyY2VUcmFja1Byb2R1Y3QocHJvZHVjdFRyYWNrKTtcbiAgfSk7XG5cbiAgd2luZG93LmdhKCdlYzpzZXRBY3Rpb24nLCAncHVyY2hhc2UnLCB7XG4gICAgaWQ6IG9yZGVySWQsXG4gICAgYWZmaWxpYXRpb246IHByb3BzLmFmZmlsaWF0aW9uLFxuICAgIHJldmVudWU6IHRvdGFsLFxuICAgIHRheDogdHJhY2sudGF4KCksXG4gICAgc2hpcHBpbmc6IHRyYWNrLnNoaXBwaW5nKCksXG4gICAgY291cG9uOiB0cmFjay5jb3Vwb24oKVxuICB9KTtcblxuICB0aGlzLnB1c2hFbmhhbmNlZEVjb21tZXJjZSh0cmFjayk7XG59O1xuXG4vKipcbiAqIFJlZnVuZGVkIG9yZGVyIC0gRW5oYW5jZWQgRWNvbW1lcmNlXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2VuaGFuY2VkLWVjb21tZXJjZSNtZWFzdXJpbmctcmVmdW5kc1xuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHtUcmFja30gdHJhY2tcbiAqL1xuXG5HQS5wcm90b3R5cGUub3JkZXJSZWZ1bmRlZEVuaGFuY2VkID0gZnVuY3Rpb24odHJhY2spIHtcbiAgdmFyIG9yZGVySWQgPSB0cmFjay5vcmRlcklkKCk7XG4gIHZhciBwcm9kdWN0cyA9IHRyYWNrLnByb2R1Y3RzKCk7XG5cbiAgLy8gb3JkZXJJZCBpcyByZXF1aXJlZC5cbiAgaWYgKCFvcmRlcklkKSByZXR1cm47XG5cbiAgdGhpcy5sb2FkRW5oYW5jZWRFY29tbWVyY2UodHJhY2spO1xuXG4gIC8vIFdpdGhvdXQgYW55IHByb2R1Y3RzIGl0J3MgYSBmdWxsIHJlZnVuZFxuICBlYWNoKHByb2R1Y3RzLCBmdW5jdGlvbihwcm9kdWN0KSB7XG4gICAgdmFyIHRyYWNrID0gbmV3IFRyYWNrKHsgcHJvcGVydGllczogcHJvZHVjdCB9KTtcbiAgICB3aW5kb3cuZ2EoJ2VjOmFkZFByb2R1Y3QnLCB7XG4gICAgICBpZDogdHJhY2sucHJvZHVjdElkKCkgfHwgdHJhY2suaWQoKSB8fCB0cmFjay5za3UoKSxcbiAgICAgIHF1YW50aXR5OiB0cmFjay5xdWFudGl0eSgpXG4gICAgfSk7XG4gIH0pO1xuXG4gIHdpbmRvdy5nYSgnZWM6c2V0QWN0aW9uJywgJ3JlZnVuZCcsIHtcbiAgICBpZDogb3JkZXJJZFxuICB9KTtcblxuICB0aGlzLnB1c2hFbmhhbmNlZEVjb21tZXJjZSh0cmFjayk7XG59O1xuXG4vKipcbiAqIEFkZGVkIHByb2R1Y3QgLSBFbmhhbmNlZCBFY29tbWVyY2VcbiAqXG4gKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vYW5hbHl0aWNzanMvZW5oYW5jZWQtZWNvbW1lcmNlI2FkZC1yZW1vdmUtY2FydFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHtUcmFja30gdHJhY2tcbiAqL1xuXG5HQS5wcm90b3R5cGUucHJvZHVjdEFkZGVkRW5oYW5jZWQgPSBmdW5jdGlvbih0cmFjaykge1xuICB0aGlzLmxvYWRFbmhhbmNlZEVjb21tZXJjZSh0cmFjayk7XG4gIGVuaGFuY2VkRWNvbW1lcmNlUHJvZHVjdEFjdGlvbih0cmFjaywgJ2FkZCcpO1xuICB0aGlzLnB1c2hFbmhhbmNlZEVjb21tZXJjZSh0cmFjayk7XG59O1xuXG4vKipcbiAqIFJlbW92ZWQgcHJvZHVjdCAtIEVuaGFuY2VkIEVjb21tZXJjZVxuICpcbiAqIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9lbmhhbmNlZC1lY29tbWVyY2UjYWRkLXJlbW92ZS1jYXJ0XG4gKlxuICogQGFwaSBwcml2YXRlXG4gKiBAcGFyYW0ge1RyYWNrfSB0cmFja1xuICovXG5cbkdBLnByb3RvdHlwZS5wcm9kdWN0UmVtb3ZlZEVuaGFuY2VkID0gZnVuY3Rpb24odHJhY2spIHtcbiAgdGhpcy5sb2FkRW5oYW5jZWRFY29tbWVyY2UodHJhY2spO1xuICBlbmhhbmNlZEVjb21tZXJjZVByb2R1Y3RBY3Rpb24odHJhY2ssICdyZW1vdmUnKTtcbiAgdGhpcy5wdXNoRW5oYW5jZWRFY29tbWVyY2UodHJhY2spO1xufTtcblxuLyoqXG4gKiBWaWV3ZWQgcHJvZHVjdCBkZXRhaWxzIC0gRW5oYW5jZWQgRWNvbW1lcmNlXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2VuaGFuY2VkLWVjb21tZXJjZSNwcm9kdWN0LWRldGFpbC12aWV3XG4gKlxuICogQGFwaSBwcml2YXRlXG4gKiBAcGFyYW0ge1RyYWNrfSB0cmFja1xuICovXG5cbkdBLnByb3RvdHlwZS5wcm9kdWN0Vmlld2VkRW5oYW5jZWQgPSBmdW5jdGlvbih0cmFjaykge1xuICB2YXIgcHJvcHMgPSB0cmFjay5wcm9wZXJ0aWVzKCk7XG4gIHZhciBkYXRhID0ge307XG5cbiAgdGhpcy5sb2FkRW5oYW5jZWRFY29tbWVyY2UodHJhY2spO1xuICAvLyBsaXN0IHByb3BlcnR5IGlzIG9wdGlvbmFsXG4gIGlmIChwcm9wcy5saXN0KSBkYXRhLmxpc3QgPSBwcm9wcy5saXN0O1xuICBlbmhhbmNlZEVjb21tZXJjZVByb2R1Y3RBY3Rpb24odHJhY2ssICdkZXRhaWwnLCBkYXRhKTtcbiAgdGhpcy5wdXNoRW5oYW5jZWRFY29tbWVyY2UodHJhY2spO1xufTtcblxuLyoqXG4gKiBDbGlja2VkIHByb2R1Y3QgLSBFbmhhbmNlZCBFY29tbWVyY2VcbiAqXG4gKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vYW5hbHl0aWNzanMvZW5oYW5jZWQtZWNvbW1lcmNlI21lYXN1cmluZy1hY3Rpb25zXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKiBAcGFyYW0ge1RyYWNrfSB0cmFja1xuICovXG5cbkdBLnByb3RvdHlwZS5wcm9kdWN0Q2xpY2tlZEVuaGFuY2VkID0gZnVuY3Rpb24odHJhY2spIHtcbiAgdmFyIHByb3BzID0gdHJhY2sucHJvcGVydGllcygpO1xuICB2YXIgZGF0YSA9IHt9O1xuXG4gIHRoaXMubG9hZEVuaGFuY2VkRWNvbW1lcmNlKHRyYWNrKTtcbiAgLy8gbGlzdCBwcm9wZXJ0eSBpcyBvcHRpb25hbFxuICBpZiAocHJvcHMubGlzdCkgZGF0YS5saXN0ID0gcHJvcHMubGlzdDtcbiAgZW5oYW5jZWRFY29tbWVyY2VQcm9kdWN0QWN0aW9uKHRyYWNrLCAnY2xpY2snLCBkYXRhKTtcbiAgdGhpcy5wdXNoRW5oYW5jZWRFY29tbWVyY2UodHJhY2spO1xufTtcblxuLyoqXG4gKiBWaWV3ZWQgcHJvbW90aW9uIC0gRW5oYW5jZWQgRWNvbW1lcmNlXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2VuaGFuY2VkLWVjb21tZXJjZSNtZWFzdXJpbmctcHJvbW8taW1wcmVzc2lvbnNcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqIEBwYXJhbSB7VHJhY2t9IHRyYWNrXG4gKi9cblxuR0EucHJvdG90eXBlLnByb21vdGlvblZpZXdlZEVuaGFuY2VkID0gZnVuY3Rpb24odHJhY2spIHtcbiAgdmFyIHByb3BzID0gdHJhY2sucHJvcGVydGllcygpO1xuXG4gIHRoaXMubG9hZEVuaGFuY2VkRWNvbW1lcmNlKHRyYWNrKTtcbiAgd2luZG93LmdhKCdlYzphZGRQcm9tbycsIHtcbiAgICBpZDogdHJhY2sucHJvbW90aW9uSWQoKSB8fCB0cmFjay5pZCgpLFxuICAgIG5hbWU6IHRyYWNrLm5hbWUoKSxcbiAgICBjcmVhdGl2ZTogcHJvcHMuY3JlYXRpdmUsXG4gICAgcG9zaXRpb246IHByb3BzLnBvc2l0aW9uXG4gIH0pO1xuICB0aGlzLnB1c2hFbmhhbmNlZEVjb21tZXJjZSh0cmFjayk7XG59O1xuXG4vKipcbiAqIENsaWNrZWQgcHJvbW90aW9uIC0gRW5oYW5jZWQgRWNvbW1lcmNlXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2VuaGFuY2VkLWVjb21tZXJjZSNtZWFzdXJpbmctcHJvbW8tY2xpY2tzXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKiBAcGFyYW0ge1RyYWNrfSB0cmFja1xuICovXG5cbkdBLnByb3RvdHlwZS5wcm9tb3Rpb25DbGlja2VkRW5oYW5jZWQgPSBmdW5jdGlvbih0cmFjaykge1xuICB2YXIgcHJvcHMgPSB0cmFjay5wcm9wZXJ0aWVzKCk7XG5cbiAgdGhpcy5sb2FkRW5oYW5jZWRFY29tbWVyY2UodHJhY2spO1xuICB3aW5kb3cuZ2EoJ2VjOmFkZFByb21vJywge1xuICAgIGlkOiB0cmFjay5wcm9tb3Rpb25JZCgpIHx8IHRyYWNrLmlkKCksXG4gICAgbmFtZTogdHJhY2submFtZSgpLFxuICAgIGNyZWF0aXZlOiBwcm9wcy5jcmVhdGl2ZSxcbiAgICBwb3NpdGlvbjogcHJvcHMucG9zaXRpb25cbiAgfSk7XG4gIHdpbmRvdy5nYSgnZWM6c2V0QWN0aW9uJywgJ3Byb21vX2NsaWNrJywge30pO1xuICB0aGlzLnB1c2hFbmhhbmNlZEVjb21tZXJjZSh0cmFjayk7XG59O1xuXG4vKipcbiAqIFByb2R1Y3QgTGlzdCBWaWV3ZWQgLSBFbmhhbmNlZCBFY29tbWVyY2UgKE1hcHBlZCB0byBQcm9kdWN0IEltcHJlc3Npb24pXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2VuaGFuY2VkLWVjb21tZXJjZSNwcm9kdWN0LWltcHJlc3Npb25cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqIEBwYXJhbSB7VHJhY2t9IHRyYWNrXG4gKi9cblxuR0EucHJvdG90eXBlLnByb2R1Y3RMaXN0Vmlld2VkRW5oYW5jZWQgPSBmdW5jdGlvbih0cmFjaykge1xuICB2YXIgcHJvcHMgPSB0cmFjay5wcm9wZXJ0aWVzKCk7XG4gIHZhciBwcm9kdWN0cyA9IHRyYWNrLnByb2R1Y3RzKCk7XG4gIHRoaXMubG9hZEVuaGFuY2VkRWNvbW1lcmNlKHRyYWNrKTtcbiAgZWFjaChwcm9kdWN0cywgZnVuY3Rpb24ocHJvZHVjdCkge1xuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYW4gSUQvU0tVIG9yIG5hbWUsIHJldHVybiAtIEdBIHdpbGwgcmVqZWN0IHRoZSBpbXByZXNzaW9uLlxuICAgIHZhciBpdGVtID0gbmV3IFRyYWNrKHsgcHJvcGVydGllczogcHJvZHVjdCB9KTtcbiAgICBpZiAoIShpdGVtLnByb2R1Y3RJZCgpIHx8IGl0ZW0uc2t1KCkpICYmICFpdGVtLm5hbWUoKSkgcmV0dXJuO1xuICAgIHZhciBpbXByZXNzaW9uT2JqID0ge1xuICAgICAgaWQ6IGl0ZW0ucHJvZHVjdElkKCkgfHwgaXRlbS5za3UoKSxcbiAgICAgIG5hbWU6IGl0ZW0ubmFtZSgpLFxuICAgICAgY2F0ZWdvcnk6IGl0ZW0uY2F0ZWdvcnkoKSB8fCB0cmFjay5jYXRlZ29yeSgpLFxuICAgICAgbGlzdDogcHJvcHMubGlzdF9pZCB8fCB0cmFjay5jYXRlZ29yeSgpIHx8ICdwcm9kdWN0cycsXG4gICAgICBicmFuZDogaXRlbS5wcm9wZXJ0aWVzKCkuYnJhbmQsXG4gICAgICB2YXJpYW50OiBpdGVtLnByb3BlcnRpZXMoKS52YXJpYW50LFxuICAgICAgcHJpY2U6IGl0ZW0ucHJpY2UoKSxcbiAgICAgIHBvc2l0aW9uOiBwcm9kdWN0cy5tYXAoZnVuY3Rpb24oeCkgeyByZXR1cm4geC5wcm9kdWN0X2lkOyB9KS5pbmRleE9mKGl0ZW0ucHJvZHVjdElkKCkpICsgMVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBwcm9wIGluIGltcHJlc3Npb25PYmopIHtcbiAgICAgIGlmIChpbXByZXNzaW9uT2JqW3Byb3BdID09PSB1bmRlZmluZWQpIGRlbGV0ZSBpbXByZXNzaW9uT2JqW3Byb3BdO1xuICAgIH1cbiAgICB3aW5kb3cuZ2EoJ2VjOmFkZEltcHJlc3Npb24nLCBpbXByZXNzaW9uT2JqKTtcbiAgfSk7XG5cbiAgdGhpcy5wdXNoRW5oYW5jZWRFY29tbWVyY2UodHJhY2spO1xufTtcblxuLyoqXG4gKiBQcm9kdWN0IExpc3QgRmlsdGVyZWQgLSBFbmhhbmNlZCBFY29tbWVyY2UgKE1hcHBlZCB0byBQcm9kdWN0IEltcHJlc3Npb24pXG4gKlxuICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2VuaGFuY2VkLWVjb21tZXJjZSNwcm9kdWN0LWltcHJlc3Npb25cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqIEBwYXJhbSB7VHJhY2t9IHRyYWNrXG4gKi9cblxuR0EucHJvdG90eXBlLnByb2R1Y3RMaXN0RmlsdGVyZWRFbmhhbmNlZCA9IGZ1bmN0aW9uKHRyYWNrKSB7XG4gIHZhciBwcm9wcyA9IHRyYWNrLnByb3BlcnRpZXMoKTtcbiAgdmFyIHByb2R1Y3RzID0gdHJhY2sucHJvZHVjdHMoKTtcbiAgcHJvcHMuZmlsdGVycyA9IHByb3BzLmZpbHRlcnMgfHwgW107XG4gIHByb3BzLnNvcnRlcnMgPSBwcm9wcy5zb3J0ZXJzIHx8IFtdO1xuICB2YXIgZmlsdGVycyA9IHByb3BzLmZpbHRlcnMubWFwKGZ1bmN0aW9uKG9iaikgeyByZXR1cm4gb2JqLnR5cGUgKyAnOicgKyBvYmoudmFsdWU7fSkuam9pbigpO1xuICB2YXIgc29ydHMgPSBwcm9wcy5zb3J0cy5tYXAoZnVuY3Rpb24ob2JqKSB7IHJldHVybiBvYmoudHlwZSArICc6JyArIG9iai52YWx1ZTt9KS5qb2luKCk7XG4gIHRoaXMubG9hZEVuaGFuY2VkRWNvbW1lcmNlKHRyYWNrKTtcbiAgZWFjaChwcm9kdWN0cywgZnVuY3Rpb24ocHJvZHVjdCkge1xuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgYW4gSUQvU0tVIG9yIG5hbWUsIHJldHVybiAtIEdBIHdpbGwgcmVqZWN0IHRoZSBpbXByZXNzaW9uLlxuICAgIHZhciBpdGVtID0gbmV3IFRyYWNrKHsgcHJvcGVydGllczogcHJvZHVjdCB9KTtcbiAgICBpZiAoIShpdGVtLnByb2R1Y3RJZCgpIHx8IGl0ZW0uc2t1KCkpICYmICFpdGVtLm5hbWUoKSkgcmV0dXJuO1xuICAgIHZhciBpbXByZXNzaW9uT2JqID0ge1xuICAgICAgaWQ6IGl0ZW0ucHJvZHVjdElkKCkgfHwgaXRlbS5za3UoKSxcbiAgICAgIG5hbWU6IGl0ZW0ubmFtZSgpLFxuICAgICAgY2F0ZWdvcnk6IGl0ZW0uY2F0ZWdvcnkoKSB8fCB0cmFjay5jYXRlZ29yeSgpLFxuICAgICAgbGlzdDogcHJvcHMubGlzdF9pZCB8fCB0cmFjay5jYXRlZ29yeSgpIHx8ICdzZWFyY2ggcmVzdWx0cycsXG4gICAgICBicmFuZDogaXRlbS5wcm9wZXJ0aWVzKCkuYnJhbmQsXG4gICAgICB2YXJpYW50OiBmaWx0ZXJzICsgJzo6JyArIHNvcnRzLFxuICAgICAgcHJpY2U6IGl0ZW0ucHJpY2UoKSxcbiAgICAgIHBvc2l0aW9uOiBwcm9kdWN0cy5tYXAoZnVuY3Rpb24oeCkgeyByZXR1cm4geC5wcm9kdWN0X2lkOyB9KS5pbmRleE9mKGl0ZW0ucHJvZHVjdElkKCkpICsgMVxuICAgIH07XG4gICAgZm9yICh2YXIgcHJvcCBpbiBpbXByZXNzaW9uT2JqKSB7XG4gICAgICBpZiAoaW1wcmVzc2lvbk9ialtwcm9wXSA9PT0gdW5kZWZpbmVkKSBkZWxldGUgaW1wcmVzc2lvbk9ialtwcm9wXTtcbiAgICB9XG4gICAgd2luZG93LmdhKCdlYzphZGRJbXByZXNzaW9uJywgaW1wcmVzc2lvbk9iaik7XG4gIH0pO1xuXG4gIHRoaXMucHVzaEVuaGFuY2VkRWNvbW1lcmNlKHRyYWNrKTtcbn07XG5cblxuLyoqXG4gKiBFbmhhbmNlZCBlY29tbWVyY2UgdHJhY2sgcHJvZHVjdC5cbiAqXG4gKiBTaW1wbGUgaGVscGVyIHNvIHRoYXQgd2UgZG9uJ3QgcmVwZWF0IGBlYzphZGRQcm9kdWN0YCBldmVyeXdoZXJlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHtUcmFja30gdHJhY2tcbiAqL1xuXG5mdW5jdGlvbiBlbmhhbmNlZEVjb21tZXJjZVRyYWNrUHJvZHVjdCh0cmFjaykge1xuICB2YXIgcHJvcHMgPSB0cmFjay5wcm9wZXJ0aWVzKCk7XG4gIHZhciBwcm9kdWN0ID0ge1xuICAgIGlkOiB0cmFjay5wcm9kdWN0SWQoKSB8fCB0cmFjay5pZCgpIHx8IHRyYWNrLnNrdSgpLFxuICAgIG5hbWU6IHRyYWNrLm5hbWUoKSxcbiAgICBjYXRlZ29yeTogdHJhY2suY2F0ZWdvcnkoKSxcbiAgICBxdWFudGl0eTogdHJhY2sucXVhbnRpdHkoKSxcbiAgICBwcmljZTogdHJhY2sucHJpY2UoKSxcbiAgICBicmFuZDogcHJvcHMuYnJhbmQsXG4gICAgdmFyaWFudDogcHJvcHMudmFyaWFudCxcbiAgICBjdXJyZW5jeTogdHJhY2suY3VycmVuY3koKVxuICB9O1xuXG4gIC8vIGFwcGVuZCBjb3Vwb24gaWYgaXQgc2V0XG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9lbmhhbmNlZC1lY29tbWVyY2UjbWVhc3VyaW5nLXRyYW5zYWN0aW9uc1xuICB2YXIgY291cG9uID0gdHJhY2sucHJveHkoJ3Byb3BlcnRpZXMuY291cG9uJyk7XG4gIGlmIChjb3Vwb24pIHByb2R1Y3QuY291cG9uID0gY291cG9uO1xuICB3aW5kb3cuZ2EoJ2VjOmFkZFByb2R1Y3QnLCBwcm9kdWN0KTtcbn1cblxuLyoqXG4gKiBTZXQgYGFjdGlvbmAgb24gYHRyYWNrYCB3aXRoIGBkYXRhYC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqIEBwYXJhbSB7VHJhY2t9IHRyYWNrXG4gKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICovXG5cbmZ1bmN0aW9uIGVuaGFuY2VkRWNvbW1lcmNlUHJvZHVjdEFjdGlvbih0cmFjaywgYWN0aW9uLCBkYXRhKSB7XG4gIGVuaGFuY2VkRWNvbW1lcmNlVHJhY2tQcm9kdWN0KHRyYWNrKTtcbiAgd2luZG93LmdhKCdlYzpzZXRBY3Rpb24nLCBhY3Rpb24sIGRhdGEgfHwge30pO1xufVxuXG4vKipcbiAqIEV4dHJhY3RzIGNoZWNrb3V0IG9wdGlvbnMuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAqIEByZXR1cm4ge3N0cmluZ3xudWxsfVxuICovXG5cbmZ1bmN0aW9uIGV4dHJhY3RDaGVja291dE9wdGlvbnMocHJvcHMpIHtcbiAgdmFyIG9wdGlvbnMgPSBbXG4gICAgcHJvcHMucGF5bWVudE1ldGhvZCxcbiAgICBwcm9wcy5zaGlwcGluZ01ldGhvZFxuICBdO1xuXG4gIC8vIFJlbW92ZSBhbGwgbnVsbHMsIGFuZCBqb2luIHdpdGggY29tbWFzLlxuICB2YXIgdmFsaWQgPSByZWplY3Qob3B0aW9ucyk7XG4gIHJldHVybiB2YWxpZC5sZW5ndGggPiAwID8gdmFsaWQuam9pbignLCAnKSA6IG51bGw7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHRyYWNrIG91dCBvZiBwcm9kdWN0IHByb3BlcnRpZXMuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKiBAcGFyYW0ge1RyYWNrfSB0cmFja1xuICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXNcbiAqIEByZXR1cm4ge1RyYWNrfVxuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2R1Y3RUcmFjayh0cmFjaywgcHJvcGVydGllcykge1xuICBwcm9wZXJ0aWVzLmN1cnJlbmN5ID0gcHJvcGVydGllcy5jdXJyZW5jeSB8fCB0cmFjay5jdXJyZW5jeSgpO1xuICByZXR1cm4gbmV3IFRyYWNrKHsgcHJvcGVydGllczogcHJvcGVydGllcyB9KTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L2FuYWx5dGljcy5qcy1pbnRlZ3JhdGlvbi1nb29nbGUtYW5hbHl0aWNzL2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gODNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGJpbmQgPSByZXF1aXJlKCdjb21wb25lbnQtYmluZCcpO1xudmFyIGNsb25lID0gcmVxdWlyZSgnQG5kaG91bGUvY2xvbmUnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCdAbmRob3VsZS9kZWZhdWx0cycpO1xudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ0BuZGhvdWxlL2V4dGVuZCcpO1xudmFyIHNsdWcgPSByZXF1aXJlKCdzbHVnLWNvbXBvbmVudCcpO1xudmFyIHByb3RvcyA9IHJlcXVpcmUoJy4vcHJvdG9zJyk7XG52YXIgc3RhdGljcyA9IHJlcXVpcmUoJy4vc3RhdGljcycpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBgSW50ZWdyYXRpb25gIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBjb25zdHJ1Y3RzIEludGVncmF0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHJldHVybiB7RnVuY3Rpb259IEludGVncmF0aW9uXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlSW50ZWdyYXRpb24obmFtZSkge1xuICAvKipcbiAgICogSW5pdGlhbGl6ZSBhIG5ldyBgSW50ZWdyYXRpb25gLlxuICAgKlxuICAgKiBAY2xhc3NcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICovXG5cbiAgZnVuY3Rpb24gSW50ZWdyYXRpb24ob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuYWRkSW50ZWdyYXRpb24pIHtcbiAgICAgIC8vIHBsdWdpblxuICAgICAgcmV0dXJuIG9wdGlvbnMuYWRkSW50ZWdyYXRpb24oSW50ZWdyYXRpb24pO1xuICAgIH1cbiAgICB0aGlzLmRlYnVnID0gZGVidWcoJ2FuYWx5dGljczppbnRlZ3JhdGlvbjonICsgc2x1ZyhuYW1lKSk7XG4gICAgdGhpcy5vcHRpb25zID0gZGVmYXVsdHMoY2xvbmUob3B0aW9ucykgfHwge30sIHRoaXMuZGVmYXVsdHMpO1xuICAgIHRoaXMuX3F1ZXVlID0gW107XG4gICAgdGhpcy5vbmNlKCdyZWFkeScsIGJpbmQodGhpcywgdGhpcy5mbHVzaCkpO1xuXG4gICAgSW50ZWdyYXRpb24uZW1pdCgnY29uc3RydWN0JywgdGhpcyk7XG4gICAgdGhpcy5yZWFkeSA9IGJpbmQodGhpcywgdGhpcy5yZWFkeSk7XG4gICAgdGhpcy5fd3JhcEluaXRpYWxpemUoKTtcbiAgICB0aGlzLl93cmFwUGFnZSgpO1xuICAgIHRoaXMuX3dyYXBUcmFjaygpO1xuICB9XG5cbiAgSW50ZWdyYXRpb24ucHJvdG90eXBlLmRlZmF1bHRzID0ge307XG4gIEludGVncmF0aW9uLnByb3RvdHlwZS5nbG9iYWxzID0gW107XG4gIEludGVncmF0aW9uLnByb3RvdHlwZS50ZW1wbGF0ZXMgPSB7fTtcbiAgSW50ZWdyYXRpb24ucHJvdG90eXBlLm5hbWUgPSBuYW1lO1xuICBleHRlbmQoSW50ZWdyYXRpb24sIHN0YXRpY3MpO1xuICBleHRlbmQoSW50ZWdyYXRpb24ucHJvdG90eXBlLCBwcm90b3MpO1xuXG4gIHJldHVybiBJbnRlZ3JhdGlvbjtcbn1cblxuLyoqXG4gKiBFeHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlSW50ZWdyYXRpb247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9hbmFseXRpY3MuanMtaW50ZWdyYXRpb24vbGliL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kZWJ1ZycpO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWVcbiAgICAgICAgICAgICAgICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbFxuICAgICAgICAgICAgICAgICAgOiBsb2NhbHN0b3JhZ2UoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG4gICdsaWdodHNlYWdyZWVuJyxcbiAgJ2ZvcmVzdGdyZWVuJyxcbiAgJ2dvbGRlbnJvZCcsXG4gICdkb2RnZXJibHVlJyxcbiAgJ2RhcmtvcmNoaWQnLFxuICAnY3JpbXNvbidcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG4gIC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG4gIC8vIGV4cGxpY2l0bHlcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIGlzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG4gIC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG4gIHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuICAgIC8vIGlzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcbiAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuICAgIC8vIGlzIGZpcmVmb3ggPj0gdjMxP1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxKSB8fFxuICAgIC8vIGRvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLykpO1xufVxuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uKHYpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiAnW1VuZXhwZWN0ZWRKU09OUGFyc2VFcnJvcl06ICcgKyBlcnIubWVzc2FnZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuICB2YXIgdXNlQ29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cbiAgYXJnc1swXSA9ICh1c2VDb2xvcnMgPyAnJWMnIDogJycpXG4gICAgKyB0aGlzLm5hbWVzcGFjZVxuICAgICsgKHVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKVxuICAgICsgYXJnc1swXVxuICAgICsgKHVzZUNvbG9ycyA/ICclYyAnIDogJyAnKVxuICAgICsgJysnICsgZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG4gIGlmICghdXNlQ29sb3JzKSByZXR1cm47XG5cbiAgdmFyIGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuICBhcmdzLnNwbGljZSgxLCAwLCBjLCAnY29sb3I6IGluaGVyaXQnKVxuXG4gIC8vIHRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG4gIC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cbiAgLy8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsYXN0QyA9IDA7XG4gIGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIGlmICgnJSUnID09PSBtYXRjaCkgcmV0dXJuO1xuICAgIGluZGV4Kys7XG4gICAgaWYgKCclYycgPT09IG1hdGNoKSB7XG4gICAgICAvLyB3ZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcbiAgICAgIC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG4gICAgICBsYXN0QyA9IGluZGV4O1xuICAgIH1cbiAgfSk7XG5cbiAgYXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUubG9nKClgIHdoZW4gYXZhaWxhYmxlLlxuICogTm8tb3Agd2hlbiBgY29uc29sZS5sb2dgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGxvZygpIHtcbiAgLy8gdGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRTgvOSwgd2hlcmVcbiAgLy8gdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcbiAgcmV0dXJuICdvYmplY3QnID09PSB0eXBlb2YgY29uc29sZVxuICAgICYmIGNvbnNvbGUubG9nXG4gICAgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5sb2csIGNvbnNvbGUsIGFyZ3VtZW50cyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuICB0cnkge1xuICAgIGlmIChudWxsID09IG5hbWVzcGFjZXMpIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UuZGVidWcgPSBuYW1lc3BhY2VzO1xuICAgIH1cbiAgfSBjYXRjaChlKSB7fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvYWQoKSB7XG4gIHZhciByO1xuICB0cnkge1xuICAgIHIgPSBleHBvcnRzLnN0b3JhZ2UuZGVidWc7XG4gIH0gY2F0Y2goZSkge31cblxuICAvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG4gIGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuICAgIHIgPSBwcm9jZXNzLmVudi5ERUJVRztcbiAgfVxuXG4gIHJldHVybiByO1xufVxuXG4vKipcbiAqIEVuYWJsZSBuYW1lc3BhY2VzIGxpc3RlZCBpbiBgbG9jYWxTdG9yYWdlLmRlYnVnYCBpbml0aWFsbHkuXG4gKi9cblxuZXhwb3J0cy5lbmFibGUobG9hZCgpKTtcblxuLyoqXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxuICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2NhbHN0b3JhZ2UoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gIH0gY2F0Y2ggKGUpIHt9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9hbmFseXRpY3MuanMtaW50ZWdyYXRpb24vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogVGhpcyBpcyB0aGUgY29tbW9uIGxvZ2ljIGZvciBib3RoIHRoZSBOb2RlLmpzIGFuZCB3ZWIgYnJvd3NlclxuICogaW1wbGVtZW50YXRpb25zIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gY3JlYXRlRGVidWcuZGVidWcgPSBjcmVhdGVEZWJ1Z1snZGVmYXVsdCddID0gY3JlYXRlRGVidWc7XG5leHBvcnRzLmNvZXJjZSA9IGNvZXJjZTtcbmV4cG9ydHMuZGlzYWJsZSA9IGRpc2FibGU7XG5leHBvcnRzLmVuYWJsZSA9IGVuYWJsZTtcbmV4cG9ydHMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5leHBvcnRzLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblxuLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL1xuXG5leHBvcnRzLm5hbWVzID0gW107XG5leHBvcnRzLnNraXBzID0gW107XG5cbi8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBQcmV2aW91cyBsb2cgdGltZXN0YW1wLlxuICovXG5cbnZhciBwcmV2VGltZTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuICB2YXIgaGFzaCA9IDAsIGk7XG5cbiAgZm9yIChpIGluIG5hbWVzcGFjZSkge1xuICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW01hdGguYWJzKGhhc2gpICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cbiAgZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgLy8gZGlzYWJsZWQ/XG4gICAgaWYgKCFkZWJ1Zy5lbmFibGVkKSByZXR1cm47XG5cbiAgICB2YXIgc2VsZiA9IGRlYnVnO1xuXG4gICAgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbiAgICB2YXIgY3VyciA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG4gICAgc2VsZi5kaWZmID0gbXM7XG4gICAgc2VsZi5wcmV2ID0gcHJldlRpbWU7XG4gICAgc2VsZi5jdXJyID0gY3VycjtcbiAgICBwcmV2VGltZSA9IGN1cnI7XG5cbiAgICAvLyB0dXJuIHRoZSBgYXJndW1lbnRzYCBpbnRvIGEgcHJvcGVyIEFycmF5XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGFyZ3NbMF0gPSBleHBvcnRzLmNvZXJjZShhcmdzWzBdKTtcblxuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGFyZ3NbMF0pIHtcbiAgICAgIC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG4gICAgICBhcmdzLnVuc2hpZnQoJyVPJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCBmdW5jdGlvbihtYXRjaCwgZm9ybWF0KSB7XG4gICAgICAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG4gICAgICBpZiAobWF0Y2ggPT09ICclJScpIHJldHVybiBtYXRjaDtcbiAgICAgIGluZGV4Kys7XG4gICAgICB2YXIgZm9ybWF0dGVyID0gZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZvcm1hdHRlcikge1xuICAgICAgICB2YXIgdmFsID0gYXJnc1tpbmRleF07XG4gICAgICAgIG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuICAgICAgICAvLyBub3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG4gICAgICAgIGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaW5kZXgtLTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcblxuICAgIC8vIGFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG4gICAgZXhwb3J0cy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cbiAgICB2YXIgbG9nRm4gPSBkZWJ1Zy5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuXG4gIGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgZGVidWcuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpO1xuICBkZWJ1Zy51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICBkZWJ1Zy5jb2xvciA9IHNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG5cbiAgLy8gZW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBleHBvcnRzLmluaXQpIHtcbiAgICBleHBvcnRzLmluaXQoZGVidWcpO1xuICB9XG5cbiAgcmV0dXJuIGRlYnVnO1xufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgZXhwb3J0cy5zYXZlKG5hbWVzcGFjZXMpO1xuXG4gIGV4cG9ydHMubmFtZXMgPSBbXTtcbiAgZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4gIHZhciBzcGxpdCA9ICh0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycgPyBuYW1lc3BhY2VzIDogJycpLnNwbGl0KC9bXFxzLF0rLyk7XG4gIHZhciBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghc3BsaXRbaV0pIGNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgIGV4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIGV4cG9ydHMuZW5hYmxlKCcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICB2YXIgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICByZXR1cm4gdmFsO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvYW5hbHl0aWNzLmpzLWludGVncmF0aW9uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanNcbi8vIG1vZHVsZSBpZCA9IDg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBHZW5lcmF0ZSBhIHNsdWcgZnJvbSB0aGUgZ2l2ZW4gYHN0cmAuXG4gKlxuICogZXhhbXBsZTpcbiAqXG4gKiAgICAgICAgZ2VuZXJhdGUoJ2ZvbyBiYXInKTtcbiAqICAgICAgICAvLyA+IGZvby1iYXJcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGNvbmZpZyB7U3RyaW5nfFJlZ0V4cH0gW3JlcGxhY2VdIGNoYXJhY3RlcnMgdG8gcmVwbGFjZSwgZGVmYXVsdGVkIHRvIGAvW15hLXowLTldL2dgXG4gKiBAY29uZmlnIHtTdHJpbmd9IFtzZXBhcmF0b3JdIHNlcGFyYXRvciB0byBpbnNlcnQsIGRlZmF1bHRlZCB0byBgLWBcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgcmV0dXJuIHN0ci50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2Uob3B0aW9ucy5yZXBsYWNlIHx8IC9bXmEtejAtOV0vZywgJyAnKVxuICAgIC5yZXBsYWNlKC9eICt8ICskL2csICcnKVxuICAgIC5yZXBsYWNlKC8gKy9nLCBvcHRpb25zLnNlcGFyYXRvciB8fCAnLScpXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2x1Zy1jb21wb25lbnQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDg3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBhZnRlciA9IHJlcXVpcmUoJ0BuZGhvdWxlL2FmdGVyJyk7XG52YXIgZWFjaCA9IHJlcXVpcmUoJ0BuZGhvdWxlL2VhY2gnKTtcbnZhciBldmVudHMgPSByZXF1aXJlKCdhbmFseXRpY3MtZXZlbnRzJyk7XG52YXIgZXZlcnkgPSByZXF1aXJlKCdAbmRob3VsZS9ldmVyeScpO1xudmFyIGZtdCA9IHJlcXVpcmUoJ0BzZWdtZW50L2ZtdCcpO1xudmFyIGZvbGRsID0gcmVxdWlyZSgnQG5kaG91bGUvZm9sZGwnKTtcbnZhciBpcyA9IHJlcXVpcmUoJ2lzJyk7XG52YXIgbG9hZElmcmFtZSA9IHJlcXVpcmUoJ2xvYWQtaWZyYW1lJyk7XG52YXIgbG9hZFNjcmlwdCA9IHJlcXVpcmUoJ0BzZWdtZW50L2xvYWQtc2NyaXB0Jyk7XG52YXIgbmV4dFRpY2sgPSByZXF1aXJlKCduZXh0LXRpY2snKTtcbnZhciBub3JtYWxpemUgPSByZXF1aXJlKCd0by1uby1jYXNlJyk7XG5cbi8qKlxuICogaGFzT3duUHJvcGVydHkgcmVmZXJlbmNlLlxuICovXG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIE5vIG9wZXJhdGlvbi5cbiAqL1xuXG52YXIgbm9vcCA9IGZ1bmN0aW9uIG5vb3AoKSB7fTtcblxuLyoqXG4gKiBXaW5kb3cgZGVmYXVsdHMuXG4gKi9cblxudmFyIG9uZXJyb3IgPSB3aW5kb3cub25lcnJvcjtcbnZhciBvbmxvYWQgPSBudWxsO1xuXG4vKipcbiAqIE1peGluIGVtaXR0ZXIuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbmV3LWNhcCAqL1xuRW1pdHRlcihleHBvcnRzKTtcbi8qIGVzbGludC1lbmFibGUgbmV3LWNhcCAqL1xuXG4vKipcbiAqIEluaXRpYWxpemUuXG4gKi9cblxuZXhwb3J0cy5pbml0aWFsaXplID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZWFkeSA9IHRoaXMucmVhZHk7XG4gIG5leHRUaWNrKHJlYWR5KTtcbn07XG5cbi8qKlxuICogTG9hZGVkP1xuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuXG5leHBvcnRzLmxvYWRlZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIFBhZ2UuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqIEBwYXJhbSB7UGFnZX0gcGFnZVxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5leHBvcnRzLnBhZ2UgPSBmdW5jdGlvbihwYWdlKSB7fTtcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBUcmFjay5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICogQHBhcmFtIHtUcmFja30gdHJhY2tcbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuZXhwb3J0cy50cmFjayA9IGZ1bmN0aW9uKHRyYWNrKSB7fTtcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBHZXQgdmFsdWVzIGZyb20gaXRlbXMgaW4gYG9wdGlvbnNgIHRoYXQgYXJlIG1hcHBlZCB0byBga2V5YC5cbiAqIGBvcHRpb25zYCBpcyBhbiBpbnRlZ3JhdGlvbiBzZXR0aW5nIHdoaWNoIGlzIGEgY29sbGVjdGlvblxuICogb2YgdHlwZSAnbWFwJywgJ2FycmF5Jywgb3IgJ21peGVkJ1xuICpcbiAqIFVzZSBjYXNlcyBpbmNsdWRlIG1hcHBpbmcgZXZlbnRzIHRvIHBpeGVsSWRzIChtYXApLCBzZW5kaW5nIGdlbmVyaWNcbiAqIGNvbnZlcnNpb24gcGl4ZWxzIG9ubHkgZm9yIHNwZWNpZmljIGV2ZW50cyAoYXJyYXkpLCBvciBjb25maWd1cmluZyBkeW5hbWljXG4gKiBtYXBwaW5ncyBvZiBldmVudCBwcm9wZXJ0aWVzIHRvIHF1ZXJ5IHN0cmluZyBwYXJhbWV0ZXJzIGJhc2VkIG9uIGV2ZW50IChtaXhlZClcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICogQHBhcmFtIHtPYmplY3R8T2JqZWN0W118U3RyaW5nW119IG9wdGlvbnMgQW4gb2JqZWN0LCBhcnJheSBvZiBvYmplY3RzLCBvclxuICogYXJyYXkgb2Ygc3RyaW5ncyBwdWxsZWQgZnJvbSBzZXR0aW5ncy5tYXBwaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgbmFtZSBvZiB0aGUgaXRlbSBpbiBvcHRpb25zIHdob3NlIG1ldGFkYXRhXG4gKiB3ZSdyZSBsb29raW5nIGZvci5cbiAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBvZiBzZXR0aW5ncyB0aGF0IG1hdGNoIHRoZSBpbnB1dCBga2V5YCBuYW1lLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyAnTWFwJ1xuICogdmFyIGV2ZW50cyA9IHsgbXlfZXZlbnQ6ICdhNDk5MWI4OCcgfTtcbiAqIC5tYXAoZXZlbnRzLCAnTXkgRXZlbnQnKTtcbiAqIC8vID0+IFtcImE0OTkxYjg4XCJdXG4gKiAubWFwKGV2ZW50cywgJ3doYXRldmVyJyk7XG4gKiAvLyA9PiBbXVxuICpcbiAqIC8vICdBcnJheSdcbiAqICogdmFyIGV2ZW50cyA9IFsnQ29tcGxldGVkIE9yZGVyJywgJ015IEV2ZW50J107XG4gKiAubWFwKGV2ZW50cywgJ015IEV2ZW50Jyk7XG4gKiAvLyA9PiBbXCJNeSBFdmVudFwiXVxuICogLm1hcChldmVudHMsICd3aGF0ZXZlcicpO1xuICogLy8gPT4gW11cbiAqXG4gKiAvLyAnTWl4ZWQnXG4gKiB2YXIgZXZlbnRzID0gW3sga2V5OiAnbXkgZXZlbnQnLCB2YWx1ZTogJzliNWViMWZhJyB9XTtcbiAqIC5tYXAoZXZlbnRzLCAnbXlfZXZlbnQnKTtcbiAqIC8vID0+IFtcIjliNWViMWZhXCJdXG4gKiAubWFwKGV2ZW50cywgJ3doYXRldmVyJyk7XG4gKiAvLyA9PiBbXVxuICovXG5cbmV4cG9ydHMubWFwID0gZnVuY3Rpb24ob3B0aW9ucywga2V5KSB7XG4gIHZhciBub3JtYWxpemVkQ29tcGFyYXRvciA9IG5vcm1hbGl6ZShrZXkpO1xuICB2YXIgbWFwcGluZ1R5cGUgPSBnZXRNYXBwaW5nVHlwZShvcHRpb25zKTtcblxuICBpZiAobWFwcGluZ1R5cGUgPT09ICd1bmtub3duJykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJldHVybiBmb2xkbChmdW5jdGlvbihtYXRjaGluZ1ZhbHVlcywgdmFsLCBrZXkpIHtcbiAgICB2YXIgY29tcGFyZTtcbiAgICB2YXIgcmVzdWx0O1xuXG4gICAgaWYgKG1hcHBpbmdUeXBlID09PSAnbWFwJykge1xuICAgICAgY29tcGFyZSA9IGtleTtcbiAgICAgIHJlc3VsdCA9IHZhbDtcbiAgICB9XG5cbiAgICBpZiAobWFwcGluZ1R5cGUgPT09ICdhcnJheScpIHtcbiAgICAgIGNvbXBhcmUgPSB2YWw7XG4gICAgICByZXN1bHQgPSB2YWw7XG4gICAgfVxuXG4gICAgaWYgKG1hcHBpbmdUeXBlID09PSAnbWl4ZWQnKSB7XG4gICAgICBjb21wYXJlID0gdmFsLmtleTtcbiAgICAgIHJlc3VsdCA9IHZhbC52YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAobm9ybWFsaXplKGNvbXBhcmUpID09PSBub3JtYWxpemVkQ29tcGFyYXRvcikge1xuICAgICAgbWF0Y2hpbmdWYWx1ZXMucHVzaChyZXN1bHQpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXRjaGluZ1ZhbHVlcztcbiAgfSwgW10sIG9wdGlvbnMpO1xufTtcblxuLyoqXG4gKiBJbnZva2UgYSBgbWV0aG9kYCB0aGF0IG1heSBvciBtYXkgbm90IGV4aXN0IG9uIHRoZSBwcm90b3R5cGUgd2l0aCBgYXJnc2AsXG4gKiBxdWV1ZWluZyBvciBub3QgZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhlIGludGVncmF0aW9uIGlzIFwicmVhZHlcIi4gRG9uJ3RcbiAqIHRydXN0IHRoZSBtZXRob2QgY2FsbCwgc2luY2UgaXQgY29udGFpbnMgaW50ZWdyYXRpb24gcGFydHkgY29kZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7Li4uKn0gYXJnc1xuICovXG5cbmV4cG9ydHMuaW52b2tlID0gZnVuY3Rpb24obWV0aG9kKSB7XG4gIGlmICghdGhpc1ttZXRob2RdKSByZXR1cm47XG4gIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgaWYgKCF0aGlzLl9yZWFkeSkgcmV0dXJuIHRoaXMucXVldWUobWV0aG9kLCBhcmdzKTtcbiAgdmFyIHJldDtcblxuICB0cnkge1xuICAgIHRoaXMuZGVidWcoJyVzIHdpdGggJW8nLCBtZXRob2QsIGFyZ3MpO1xuICAgIHJldCA9IHRoaXNbbWV0aG9kXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRoaXMuZGVidWcoJ2Vycm9yICVvIGNhbGxpbmcgJXMgd2l0aCAlbycsIGUsIG1ldGhvZCwgYXJncyk7XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcblxuLyoqXG4gKiBRdWV1ZSBhIGBtZXRob2RgIHdpdGggYGFyZ3NgLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtBcnJheX0gYXJnc1xuICovXG5cbmV4cG9ydHMucXVldWUgPSBmdW5jdGlvbihtZXRob2QsIGFyZ3MpIHtcbiAgdGhpcy5fcXVldWUucHVzaCh7IG1ldGhvZDogbWV0aG9kLCBhcmdzOiBhcmdzIH0pO1xufTtcblxuLyoqXG4gKiBGbHVzaCB0aGUgaW50ZXJuYWwgcXVldWUuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5mbHVzaCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9yZWFkeSA9IHRydWU7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBlYWNoKGZ1bmN0aW9uKGNhbGwpIHtcbiAgICBzZWxmW2NhbGwubWV0aG9kXS5hcHBseShzZWxmLCBjYWxsLmFyZ3MpO1xuICB9LCB0aGlzLl9xdWV1ZSk7XG5cbiAgLy8gRW1wdHkgdGhlIHF1ZXVlLlxuICB0aGlzLl9xdWV1ZS5sZW5ndGggPSAwO1xufTtcblxuLyoqXG4gKiBSZXNldCB0aGUgaW50ZWdyYXRpb24sIHJlbW92aW5nIGl0cyBnbG9iYWwgdmFyaWFibGVzLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdsb2JhbHMubGVuZ3RoOyBpKyspIHtcbiAgICB3aW5kb3dbdGhpcy5nbG9iYWxzW2ldXSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHdpbmRvdy5vbmVycm9yID0gb25lcnJvcjtcbiAgd2luZG93Lm9ubG9hZCA9IG9ubG9hZDtcbn07XG5cbi8qKlxuICogTG9hZCBhIHRhZyBieSBgbmFtZWAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIHRhZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBsb2NhbHMgTG9jYWxzIHVzZWQgdG8gcG9wdWxhdGUgdGhlIHRhZydzIHRlbXBsYXRlIHZhcmlhYmxlc1xuICogKGUuZy4gYHVzZXJJZGAgaW4gJzxpbWcgc3JjPVwiaHR0cHM6Ly93aGF0ZXZlci5jb20ve3sgdXNlcklkIH19XCI+JykuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2s9bm9vcF0gQSBjYWxsYmFjaywgaW52b2tlZCB3aGVuIHRoZSB0YWcgZmluaXNoZXNcbiAqIGxvYWRpbmcuXG4gKi9cblxuZXhwb3J0cy5sb2FkID0gZnVuY3Rpb24obmFtZSwgbG9jYWxzLCBjYWxsYmFjaykge1xuICAvLyBBcmd1bWVudCBzaHVmZmxpbmdcbiAgaWYgKHR5cGVvZiBuYW1lID09PSAnZnVuY3Rpb24nKSB7IGNhbGxiYWNrID0gbmFtZTsgbG9jYWxzID0gbnVsbDsgbmFtZSA9IG51bGw7IH1cbiAgaWYgKG5hbWUgJiYgdHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSB7IGNhbGxiYWNrID0gbG9jYWxzOyBsb2NhbHMgPSBuYW1lOyBuYW1lID0gbnVsbDsgfVxuICBpZiAodHlwZW9mIGxvY2FscyA9PT0gJ2Z1bmN0aW9uJykgeyBjYWxsYmFjayA9IGxvY2FsczsgbG9jYWxzID0gbnVsbDsgfVxuXG4gIC8vIERlZmF1bHQgYXJndW1lbnRzXG4gIG5hbWUgPSBuYW1lIHx8ICdsaWJyYXJ5JztcbiAgbG9jYWxzID0gbG9jYWxzIHx8IHt9O1xuXG4gIGxvY2FscyA9IHRoaXMubG9jYWxzKGxvY2Fscyk7XG4gIHZhciB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGVzW25hbWVdO1xuICBpZiAoIXRlbXBsYXRlKSB0aHJvdyBuZXcgRXJyb3IoZm10KCd0ZW1wbGF0ZSBcIiVzXCIgbm90IGRlZmluZWQuJywgbmFtZSkpO1xuICB2YXIgYXR0cnMgPSByZW5kZXIodGVtcGxhdGUsIGxvY2Fscyk7XG4gIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgbm9vcDtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgZWw7XG5cbiAgc3dpdGNoICh0ZW1wbGF0ZS50eXBlKSB7XG4gIGNhc2UgJ2ltZyc6XG4gICAgYXR0cnMud2lkdGggPSAxO1xuICAgIGF0dHJzLmhlaWdodCA9IDE7XG4gICAgZWwgPSBsb2FkSW1hZ2UoYXR0cnMsIGNhbGxiYWNrKTtcbiAgICBicmVhaztcbiAgY2FzZSAnc2NyaXB0JzpcbiAgICBlbCA9IGxvYWRTY3JpcHQoYXR0cnMsIGZ1bmN0aW9uKGVycikge1xuICAgICAgaWYgKCFlcnIpIHJldHVybiBjYWxsYmFjaygpO1xuICAgICAgc2VsZi5kZWJ1ZygnZXJyb3IgbG9hZGluZyBcIiVzXCIgZXJyb3I9XCIlc1wiJywgc2VsZi5uYW1lLCBlcnIpO1xuICAgIH0pO1xuICAgICAgLy8gVE9ETzogaGFjayB1bnRpbCByZWZhY3RvcmluZyBsb2FkLXNjcmlwdFxuICAgIGRlbGV0ZSBhdHRycy5zcmM7XG4gICAgZWFjaChmdW5jdGlvbih2YWwsIGtleSkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKGtleSwgdmFsKTtcbiAgICB9LCBhdHRycyk7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ2lmcmFtZSc6XG4gICAgZWwgPSBsb2FkSWZyYW1lKGF0dHJzLCBjYWxsYmFjayk7XG4gICAgYnJlYWs7XG4gIGRlZmF1bHQ6XG4gICAgICAvLyBObyBkZWZhdWx0IGNhc2VcbiAgfVxuXG4gIHJldHVybiBlbDtcbn07XG5cbi8qKlxuICogTG9jYWxzIGZvciB0YWcgdGVtcGxhdGVzLlxuICpcbiAqIEJ5IGRlZmF1bHQgaXQgaW5jbHVkZXMgYSBjYWNoZSBidXN0ZXIgYW5kIGFsbCBvZiB0aGUgb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW2xvY2Fsc11cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuXG5leHBvcnRzLmxvY2FscyA9IGZ1bmN0aW9uKGxvY2Fscykge1xuICBsb2NhbHMgPSBsb2NhbHMgfHwge307XG4gIHZhciBjYWNoZSA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAzNjAwMDAwKTtcbiAgaWYgKCFsb2NhbHMuaGFzT3duUHJvcGVydHkoJ2NhY2hlJykpIGxvY2Fscy5jYWNoZSA9IGNhY2hlO1xuICBlYWNoKGZ1bmN0aW9uKHZhbCwga2V5KSB7XG4gICAgaWYgKCFsb2NhbHMuaGFzT3duUHJvcGVydHkoa2V5KSkgbG9jYWxzW2tleV0gPSB2YWw7XG4gIH0sIHRoaXMub3B0aW9ucyk7XG4gIHJldHVybiBsb2NhbHM7XG59O1xuXG4vKipcbiAqIFNpbXBsZSB3YXkgdG8gZW1pdCByZWFkeS5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMucmVhZHkgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbWl0KCdyZWFkeScpO1xufTtcblxuLyoqXG4gKiBXcmFwIHRoZSBpbml0aWFsaXplIG1ldGhvZCBpbiBhbiBleGlzdHMgY2hlY2ssIHNvIHdlIGRvbid0IGhhdmUgdG8gZG8gaXQgZm9yXG4gKiBldmVyeSBzaW5nbGUgaW50ZWdyYXRpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5fd3JhcEluaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGluaXRpYWxpemUgPSB0aGlzLmluaXRpYWxpemU7XG4gIHRoaXMuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZGVidWcoJ2luaXRpYWxpemUnKTtcbiAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgdmFyIHJldCA9IGluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLmVtaXQoJ2luaXRpYWxpemUnKTtcbiAgICByZXR1cm4gcmV0O1xuICB9O1xufTtcblxuLyoqXG4gKiBXcmFwIHRoZSBwYWdlIG1ldGhvZCB0byBjYWxsIHRvIG5vb3AgdGhlIGZpcnN0IHBhZ2UgY2FsbCBpZiB0aGUgaW50ZWdyYXRpb24gYXNzdW1lc1xuICogYSBwYWdldmlldy5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLl93cmFwUGFnZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBOb29wIHRoZSBmaXJzdCBwYWdlIGNhbGwgaWYgaW50ZWdyYXRpb24gYXNzdW1lcyBwYWdldmlld1xuICBpZiAodGhpcy5fYXNzdW1lc1BhZ2V2aWV3KSByZXR1cm4gdGhpcy5wYWdlID0gYWZ0ZXIoMiwgdGhpcy5wYWdlKTtcbn07XG5cbi8qKlxuICogV3JhcCB0aGUgdHJhY2sgbWV0aG9kIHRvIGNhbGwgb3RoZXIgZWNvbW1lcmNlIG1ldGhvZHMgaWYgYXZhaWxhYmxlIGRlcGVuZGluZ1xuICogb24gdGhlIGB0cmFjay5ldmVudCgpYC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLl93cmFwVHJhY2sgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHQgPSB0aGlzLnRyYWNrO1xuICB0aGlzLnRyYWNrID0gZnVuY3Rpb24odHJhY2spIHtcbiAgICB2YXIgZXZlbnQgPSB0cmFjay5ldmVudCgpO1xuICAgIHZhciBjYWxsZWQ7XG4gICAgdmFyIHJldDtcblxuICAgIGZvciAodmFyIG1ldGhvZCBpbiBldmVudHMpIHtcbiAgICAgIGlmIChoYXMuY2FsbChldmVudHMsIG1ldGhvZCkpIHtcbiAgICAgICAgdmFyIHJlZ2V4cCA9IGV2ZW50c1ttZXRob2RdO1xuICAgICAgICBpZiAoIXRoaXNbbWV0aG9kXSkgY29udGludWU7XG4gICAgICAgIGlmICghcmVnZXhwLnRlc3QoZXZlbnQpKSBjb250aW51ZTtcbiAgICAgICAgcmV0ID0gdGhpc1ttZXRob2RdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY2FsbGVkKSByZXQgPSB0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lIHRoZSB0eXBlIG9mIHRoZSBvcHRpb24gcGFzc2VkIHRvIGAjbWFwYFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R8T2JqZWN0W119IG1hcHBpbmdcbiAqIEByZXR1cm4ge1N0cmluZ30gbWFwcGluZ1R5cGVcbiAqL1xuXG5mdW5jdGlvbiBnZXRNYXBwaW5nVHlwZShtYXBwaW5nKSB7XG4gIGlmIChpcy5hcnJheShtYXBwaW5nKSkge1xuICAgIHJldHVybiBldmVyeShpc01peGVkLCBtYXBwaW5nKSA/ICdtaXhlZCcgOiAnYXJyYXknO1xuICB9XG4gIGlmIChpcy5vYmplY3QobWFwcGluZykpIHJldHVybiAnbWFwJztcbiAgcmV0dXJuICd1bmtub3duJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgaXRlbSBpbiBtYXBwaW5nIGFycmF5IGlzIGEgdmFsaWQgXCJtaXhlZFwiIHR5cGUgdmFsdWVcbiAqXG4gKiBNdXN0IGJlIGFuIG9iamVjdCB3aXRoIHByb3BlcnRpZXMgXCJrZXlcIiAob2YgdHlwZSBzdHJpbmcpXG4gKiBhbmQgXCJ2YWx1ZVwiIChvZiBhbnkgdHlwZSlcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gaXRlbVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG5mdW5jdGlvbiBpc01peGVkKGl0ZW0pIHtcbiAgaWYgKCFpcy5vYmplY3QoaXRlbSkpIHJldHVybiBmYWxzZTtcbiAgaWYgKCFpcy5zdHJpbmcoaXRlbS5rZXkpKSByZXR1cm4gZmFsc2U7XG4gIGlmICghaGFzLmNhbGwoaXRlbSwgJ3ZhbHVlJykpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogVE9ETzogRG9jdW1lbnQgbWVcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0ltYWdlfVxuICovXG5cbmZ1bmN0aW9uIGxvYWRJbWFnZShhdHRycywgZm4pIHtcbiAgZm4gPSBmbiB8fCBmdW5jdGlvbigpIHt9O1xuICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gIGltZy5vbmVycm9yID0gZXJyb3IoZm4sICdmYWlsZWQgdG8gbG9hZCBwaXhlbCcsIGltZyk7XG4gIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHsgZm4oKTsgfTtcbiAgaW1nLnNyYyA9IGF0dHJzLnNyYztcbiAgaW1nLndpZHRoID0gMTtcbiAgaW1nLmhlaWdodCA9IDE7XG4gIHJldHVybiBpbWc7XG59XG5cbi8qKlxuICogVE9ETzogRG9jdW1lbnQgbWVcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICogQHBhcmFtIHtFbGVtZW50fSBpbWdcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5cbmZ1bmN0aW9uIGVycm9yKGZuLCBtZXNzYWdlLCBpbWcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGUpIHtcbiAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICBlcnIuZXZlbnQgPSBlO1xuICAgIGVyci5zb3VyY2UgPSBpbWc7XG4gICAgZm4oZXJyKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGVtcGxhdGUgKyBsb2NhbHMgaW50byBhbiBgYXR0cnNgIG9iamVjdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB0ZW1wbGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGxvY2Fsc1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIHJlbmRlcih0ZW1wbGF0ZSwgbG9jYWxzKSB7XG4gIHJldHVybiBmb2xkbChmdW5jdGlvbihhdHRycywgdmFsLCBrZXkpIHtcbiAgICBhdHRyc1trZXldID0gdmFsLnJlcGxhY2UoL1xce1xce1xcICooXFx3KylcXCAqXFx9XFx9L2csIGZ1bmN0aW9uKF8sICQxKSB7XG4gICAgICByZXR1cm4gbG9jYWxzWyQxXTtcbiAgICB9KTtcbiAgICByZXR1cm4gYXR0cnM7XG4gIH0sIHt9LCB0ZW1wbGF0ZS5hdHRycyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9Ac2VnbWVudC9hbmFseXRpY3MuanMtaW50ZWdyYXRpb24vbGliL3Byb3Rvcy5qc1xuLy8gbW9kdWxlIGlkID0gODhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1vZHVsZSBEZXBlbmRlbmNpZXNcbiAqL1xuXG52YXIgbWFwID0gcmVxdWlyZSgnQG5kaG91bGUvbWFwJyk7XG52YXIgZm9sZGwgPSByZXF1aXJlKCdAbmRob3VsZS9mb2xkbCcpO1xuXG52YXIgZXZlbnRNYXAgPSB7XG4gIC8vIFZpZGVvc1xuICB2aWRlb1BsYXliYWNrU3RhcnRlZDogW3tcbiAgICBvYmplY3Q6ICd2aWRlbyBwbGF5YmFjaycsXG4gICAgYWN0aW9uOiAnc3RhcnRlZCdcbiAgfV0sXG4gIHZpZGVvUGxheWJhY2tQYXVzZWQ6IFt7XG4gICAgb2JqZWN0OiAndmlkZW8gcGxheWJhY2snLFxuICAgIGFjdGlvbjogJ3BhdXNlZCdcbiAgfV0sXG4gIHZpZGVvUGxheWJhY2tJbnRlcnJ1cHRlZDogW3tcbiAgICBvYmplY3Q6ICd2aWRlbyBwbGF5YmFjaycsXG4gICAgYWN0aW9uOiAnaW50ZXJydXB0ZWQnXG4gIH1dLFxuICB2aWRlb1BsYXliYWNrUmVzdW1lZDogW3tcbiAgICBvYmplY3Q6ICd2aWRlbyBwbGF5YmFjaycsXG4gICAgYWN0aW9uOiAncmVzdW1lZCdcbiAgfV0sXG4gIHZpZGVvUGxheWJhY2tDb21wbGV0ZWQ6IFt7XG4gICAgb2JqZWN0OiAndmlkZW8gcGxheWJhY2snLFxuICAgIGFjdGlvbjogJ2NvbXBsZXRlZCdcbiAgfV0sXG4gIHZpZGVvUGxheWJhY2tCdWZmZXJTdGFydGVkOiBbe1xuICAgIG9iamVjdDogJ3ZpZGVvIHBsYXliYWNrIGJ1ZmZlcicsXG4gICAgYWN0aW9uOiAnc3RhcnRlZCdcbiAgfV0sXG4gIHZpZGVvUGxheWJhY2tCdWZmZXJDb21wbGV0ZWQ6IFt7XG4gICAgb2JqZWN0OiAndmlkZW8gcGxheWJhY2sgYnVmZmVyJyxcbiAgICBhY3Rpb246ICdjb21wbGV0ZWQnXG4gIH1dLFxuICB2aWRlb1BsYXliYWNrU2Vla1N0YXJ0ZWQ6IFt7XG4gICAgb2JqZWN0OiAndmlkZW8gcGxheWJhY2sgc2VlaycsXG4gICAgYWN0aW9uOiAnc3RhcnRlZCdcbiAgfV0sXG4gIHZpZGVvUGxheWJhY2tTZWVrQ29tcGxldGVkOiBbe1xuICAgIG9iamVjdDogJ3ZpZGVvIHBsYXliYWNrIHNlZWsnLFxuICAgIGFjdGlvbjogJ2NvbXBsZXRlZCdcbiAgfV0sXG4gIHZpZGVvQ29udGVudFN0YXJ0ZWQ6IFt7XG4gICAgb2JqZWN0OiAndmlkZW8gY29udGVudCcsXG4gICAgYWN0aW9uOiAnc3RhcnRlZCdcbiAgfV0sXG4gIHZpZGVvQ29udGVudFBsYXlpbmc6IFt7XG4gICAgb2JqZWN0OiAndmlkZW8gY29udGVudCcsXG4gICAgYWN0aW9uOiAncGxheWluZydcbiAgfV0sXG4gIHZpZGVvQ29udGVudENvbXBsZXRlZDogW3tcbiAgICBvYmplY3Q6ICd2aWRlbyBjb250ZW50JyxcbiAgICBhY3Rpb246ICdjb21wbGV0ZWQnXG4gIH1dLFxuICB2aWRlb0FkU3RhcnRlZDogW3tcbiAgICBvYmplY3Q6ICd2aWRlbyBhZCcsXG4gICAgYWN0aW9uOiAnc3RhcnRlZCdcbiAgfV0sXG4gIHZpZGVvQWRQbGF5aW5nOiBbe1xuICAgIG9iamVjdDogJ3ZpZGVvIGFkJyxcbiAgICBhY3Rpb246ICdwbGF5aW5nJ1xuICB9XSxcbiAgdmlkZW9BZENvbXBsZXRlZDogW3tcbiAgICBvYmplY3Q6ICd2aWRlbyBhZCcsXG4gICAgYWN0aW9uOiAnY29tcGxldGVkJ1xuICB9XSxcblxuICAvLyBQcm9tb3Rpb25zXG4gIHByb21vdGlvblZpZXdlZDogW3tcbiAgICBvYmplY3Q6ICdwcm9tb3Rpb24nLFxuICAgIGFjdGlvbjogJ3ZpZXdlZCdcbiAgfV0sXG4gIHByb21vdGlvbkNsaWNrZWQ6IFt7XG4gICAgb2JqZWN0OiAncHJvbW90aW9uJyxcbiAgICBhY3Rpb246ICdjbGlja2VkJ1xuICB9XSxcblxuICAvLyBCcm93c2luZ1xuICBwcm9kdWN0c1NlYXJjaGVkOiBbe1xuICAgIG9iamVjdDogJ3Byb2R1Y3RzJyxcbiAgICBhY3Rpb246ICdzZWFyY2hlZCdcbiAgfV0sXG4gIHByb2R1Y3RMaXN0Vmlld2VkOiBbe1xuICAgIG9iamVjdDogJ3Byb2R1Y3QgbGlzdCcsXG4gICAgYWN0aW9uOiAndmlld2VkJ1xuICB9LCB7XG4gICAgb2JqZWN0OiAncHJvZHVjdCBjYXRlZ29yeScsXG4gICAgYWN0aW9uOiAndmlld2VkJ1xuICB9XSxcbiAgcHJvZHVjdExpc3RGaWx0ZXJlZDogW3tcbiAgICBvYmplY3Q6ICdwcm9kdWN0IGxpc3QnLFxuICAgIGFjdGlvbjogJ2ZpbHRlcmVkJ1xuICB9XSxcblxuICAvLyBDb3JlIE9yZGVyaW5nXG4gIHByb2R1Y3RDbGlja2VkOiBbe1xuICAgIG9iamVjdDogJ3Byb2R1Y3QnLFxuICAgIGFjdGlvbjogJ2NsaWNrZWQnXG4gIH1dLFxuICBwcm9kdWN0Vmlld2VkOiBbe1xuICAgIG9iamVjdDogJ3Byb2R1Y3QnLFxuICAgIGFjdGlvbjogJ3ZpZXdlZCdcbiAgfV0sXG4gIHByb2R1Y3RBZGRlZDogW3tcbiAgICBvYmplY3Q6ICdwcm9kdWN0JyxcbiAgICBhY3Rpb246ICdhZGRlZCdcbiAgfV0sXG4gIHByb2R1Y3RSZW1vdmVkOiBbe1xuICAgIG9iamVjdDogJ3Byb2R1Y3QnLFxuICAgIGFjdGlvbjogJ3JlbW92ZWQnXG4gIH1dLFxuICBjYXJ0Vmlld2VkOiBbe1xuICAgIG9iamVjdDogJ2NhcnQnLFxuICAgIGFjdGlvbjogJ3ZpZXdlZCdcbiAgfV0sXG4gIG9yZGVyVXBkYXRlZDogW3tcbiAgICBvYmplY3Q6ICdvcmRlcicsXG4gICAgYWN0aW9uOiAndXBkYXRlZCdcbiAgfV0sXG4gIG9yZGVyQ29tcGxldGVkOiBbe1xuICAgIG9iamVjdDogJ29yZGVyJyxcbiAgICBhY3Rpb246ICdjb21wbGV0ZWQnXG4gIH1dLFxuICBvcmRlclJlZnVuZGVkOiBbe1xuICAgIG9iamVjdDogJ29yZGVyJyxcbiAgICBhY3Rpb246ICdyZWZ1bmRlZCdcbiAgfV0sXG4gIG9yZGVyQ2FuY2VsbGVkOiBbe1xuICAgIG9iamVjdDogJ29yZGVyJyxcbiAgICBhY3Rpb246ICdjYW5jZWxsZWQnXG4gIH1dLFxuICBwYXltZW50SW5mb0VudGVyZWQ6IFt7XG4gICAgb2JqZWN0OiAncGF5bWVudCBpbmZvJyxcbiAgICBhY3Rpb246ICdlbnRlcmVkJ1xuICB9XSxcbiAgY2hlY2tvdXRTdGFydGVkOiBbe1xuICAgIG9iamVjdDogJ2NoZWNrb3V0JyxcbiAgICBhY3Rpb246ICdzdGFydGVkJ1xuICB9XSxcbiAgY2hlY2tvdXRTdGVwVmlld2VkOiBbe1xuICAgIG9iamVjdDogJ2NoZWNrb3V0IHN0ZXAnLFxuICAgIGFjdGlvbjogJ3ZpZXdlZCdcbiAgfV0sXG4gIGNoZWNrb3V0U3RlcENvbXBsZXRlZDogW3tcbiAgICBvYmplY3Q6ICdjaGVja291dCBzdGVwJyxcbiAgICBhY3Rpb246ICdjb21wbGV0ZWQnXG4gIH1dLFxuXG4gIC8vIENvdXBvbnNcbiAgY291cG9uRW50ZXJlZDogW3tcbiAgICBvYmplY3Q6ICdjb3Vwb24nLFxuICAgIGFjdGlvbjogJ2VudGVyZWQnXG4gIH1dLFxuICBjb3Vwb25BcHBsaWVkOiBbe1xuICAgIG9iamVjdDogJ2NvdXBvbicsXG4gICAgYWN0aW9uOiAnYXBwbGllZCdcbiAgfV0sXG4gIGNvdXBvbkRlbmllZDogW3tcbiAgICBvYmplY3Q6ICdjb3Vwb24nLFxuICAgIGFjdGlvbjogJ2RlbmllZCdcbiAgfV0sXG4gIGNvdXBvblJlbW92ZWQ6IFt7XG4gICAgb2JqZWN0OiAnY291cG9uJyxcbiAgICBhY3Rpb246ICdyZW1vdmVkJ1xuICB9XSxcblxuICAvLyBXaXNobGlzdGluZ1xuICBwcm9kdWN0QWRkZWRUb1dpc2hsaXN0OiBbe1xuICAgIG9iamVjdDogJ3Byb2R1Y3QnLFxuICAgIGFjdGlvbjogJ2FkZGVkIHRvIHdpc2hsaXN0J1xuICB9XSxcbiAgcHJvZHVjdFJlbW92ZWRGcm9tV2lzaGxpc3Q6IFt7XG4gICAgb2JqZWN0OiAncHJvZHVjdCcsXG4gICAgYWN0aW9uOiAncmVtb3ZlZCBmcm9tIHdpc2hsaXN0J1xuICB9XSxcbiAgcHJvZHVjdEFkZGVkRnJvbVdpc2hsaXN0VG9DYXJ0OiBbe1xuICAgIG9iamVjdDogJ3Byb2R1Y3QnLFxuICAgIGFjdGlvbjogJ2FkZGVkIHRvIGNhcnQgZnJvbSB3aXNobGlzdCdcbiAgfSwge1xuICAgIG9iamVjdDogJ3Byb2R1Y3QnLFxuICAgIGFjdGlvbjogJ2FkZGVkIGZyb20gd2lzaGxpc3QgdG8gY2FydCdcbiAgfV0sXG5cbiAgLy8gU2hhcmluZ1xuICBwcm9kdWN0U2hhcmVkOiBbe1xuICAgIG9iamVjdDogJ3Byb2R1Y3QnLFxuICAgIGFjdGlvbjogJ3NoYXJlZCdcbiAgfV0sXG4gIGNhcnRTaGFyZWQ6IFt7XG4gICAgb2JqZWN0OiAnY2FydCcsXG4gICAgYWN0aW9uOiAnc2hhcmVkJ1xuICB9XSxcblxuICAvLyBSZXZpZXdpbmdcbiAgcHJvZHVjdFJldmlld2VkOiBbe1xuICAgIG9iamVjdDogJ3Byb2R1Y3QnLFxuICAgIGFjdGlvbjogJ3Jldmlld2VkJ1xuICB9XSxcblxuICAvLyBBcHAgTGlmZWN5Y2xlXG4gIGFwcGxpY2F0aW9uSW5zdGFsbGVkOiBbe1xuICAgIG9iamVjdDogJ2FwcGxpY2F0aW9uJyxcbiAgICBhY3Rpb246ICdpbnN0YWxsZWQnXG4gIH1dLFxuICBhcHBsaWNhdGlvblVwZGF0ZWQ6IFt7XG4gICAgb2JqZWN0OiAnYXBwbGljYXRpb24nLFxuICAgIGFjdGlvbjogJ3VwZGF0ZWQnXG4gIH1dLFxuICBhcHBsaWNhdGlvbk9wZW5lZDogW3tcbiAgICBvYmplY3Q6ICdhcHBsaWNhdGlvbicsXG4gICAgYWN0aW9uOiAnb3BlbmVkJ1xuICB9XSxcbiAgYXBwbGljYXRpb25CYWNrZ3JvdW5kZWQ6IFt7XG4gICAgb2JqZWN0OiAnYXBwbGljYXRpb24nLFxuICAgIGFjdGlvbjogJ2JhY2tncm91bmRlZCdcbiAgfV0sXG4gIGFwcGxpY2F0aW9uVW5pbnN0YWxsZWQ6IFt7XG4gICAgb2JqZWN0OiAnYXBwbGljYXRpb24nLFxuICAgIGFjdGlvbjogJ3VuaW5zdGFsbGVkJ1xuICB9XSxcblxuICAvLyBBcHAgQ2FtcGFpZ24gYW5kIFJlZmVycmFsIEV2ZW50c1xuICBpbnN0YWxsQXR0cmlidXRlZDogW3tcbiAgICBvYmplY3Q6ICdpbnN0YWxsJyxcbiAgICBhY3Rpb246ICdhdHRyaWJ1dGVkJ1xuICB9XSxcbiAgZGVlcExpbmtPcGVuZWQ6IFt7XG4gICAgb2JqZWN0OiAnZGVlcCBsaW5rJyxcbiAgICBhY3Rpb246ICdvcGVuZWQnXG4gIH1dLFxuICBwdXNoTm90aWZpY2F0aW9uUmVjZWl2ZWQ6IFt7XG4gICAgb2JqZWN0OiAncHVzaCBub3RpZmljYXRpb24nLFxuICAgIGFjdGlvbjogJ3JlY2VpdmVkJ1xuICB9XSxcbiAgcHVzaE5vdGlmaWNhdGlvblRhcHBlZDogW3tcbiAgICBvYmplY3Q6ICdwdXNoIG5vdGlmaWNhdGlvbicsXG4gICAgYWN0aW9uOiAndGFwcGVkJ1xuICB9XSxcbiAgcHVzaE5vdGlmaWNhdGlvbkJvdW5jZWQ6IFt7XG4gICAgb2JqZWN0OiAncHVzaCBub3RpZmljYXRpb24nLFxuICAgIGFjdGlvbjogJ2JvdW5jZWQnXG4gIH1dXG59O1xuXG4vKipcbiAqIEV4cG9ydCB0aGUgZXZlbnQgbWFwXG4gKlxuICogRm9yIGVhY2ggbWV0aG9kXG4gKiAgIC0gRm9yIGVhY2ggb2YgaXRzIG9iamVjdDphY3Rpb24gYWxpYXMgcGFpcnNcbiAqICAgICAtIEZvciBlYWNoIHBlcm11dGF0aW9uIG9mIHRoYXQgcGFpclxuICogICAgICAgLSBDcmVhdGUgYSByZWdleCBzdHJpbmdcbiAqICAgLSBKb2luIHRoZW0gYW5kIGFzc2lnbiBpdCB0byBpdHMgcmVzcGVjdGl2ZSBtZXRob2QgdmFsdWVcbiAqXG4gKiAgW3tcbiAqICAgIG9iamVjdDogJ3Byb2R1Y3QgbGlzdCcsXG4gKiAgICBhY3Rpb246ICd2aWV3ZWQnXG4gKiAgfSx7XG4gKiAgICBvYmplY3Q6ICdwcm9kdWN0IGNhdGVnb3J5JyxcbiAqICAgIGFjdGlvbjogJ3ZpZXdlZCdcbiAqICB9XSA9PiAvXG4gKiAgICBeWyBfXT9wcm9kdWN0WyBfXT9saXN0WyBfXT92aWV3ZWRbIF9dP1xuICogICB8XlsgX10/dmlld2VkWyBfXT9wcm9kdWN0WyBfXT9saXN0WyBfXT9cbiAqICAgfF5bIF9dP3Byb2R1Y3RbIF9dP2NhdGVnb3J5WyBfXT92aWV3ZWRbIF9dP1xuICogICB8XlsgX10/dmlld2VkWyBfXT9wcm9kdWN0WyBfXT9jYXRlZ29yeVsgX10/XG4gKiAgICQvaVxuICpcbiAqICB0b2RvKGNzL3dqL25oKTogbWVtb2l6YXRpb24gc3RyYXRlZ3kgLyBidWlsZCBzdGVwP1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZm9sZGwoZnVuY3Rpb24gdHJhbnNmb3JtKHJldCwgcGFpcnMsIG1ldGhvZCkge1xuICB2YXIgdmFsdWVzID0gbWFwKGZ1bmN0aW9uKHBhaXIpIHtcbiAgICByZXR1cm4gbWFwKGZ1bmN0aW9uKHBlcm11dGF0aW9uKSB7XG4gICAgICB2YXIgZmxhdHRlbmVkID0gW10uY29uY2F0LmFwcGx5KFtdLCBtYXAoZnVuY3Rpb24od29yZHMpIHtcbiAgICAgICAgcmV0dXJuIHdvcmRzLnNwbGl0KCcgJyk7XG4gICAgICB9LCBwZXJtdXRhdGlvbikpO1xuICAgICAgcmV0dXJuICdeWyBfXT8nICsgZmxhdHRlbmVkLmpvaW4oJ1sgX10/JykgKyAnWyBfXT8nO1xuICAgIH0sIFtcbiAgICAgIFtwYWlyLmFjdGlvbiwgcGFpci5vYmplY3RdLFxuICAgICAgW3BhaXIub2JqZWN0LCBwYWlyLmFjdGlvbl1cbiAgICBdKS5qb2luKCd8Jyk7XG4gIH0sIHBhaXJzKTtcbiAgdmFyIGNvbmpvaW5lZCA9IHZhbHVlcy5qb2luKCd8JykgKyAnJCc7XG4gIHJldFttZXRob2RdID0gbmV3IFJlZ0V4cChjb25qb2luZWQsICdpJyk7XG4gIHJldHVybiByZXQ7XG59LCB7fSwgZXZlbnRNYXApO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYW5hbHl0aWNzLWV2ZW50cy9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDg5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLypcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGVhY2ggPSByZXF1aXJlKCdAbmRob3VsZS9lYWNoJyk7XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBwcmVkaWNhdGUgZnVuY3Rpb24gcmV0dXJucyBgdHJ1ZWAgZm9yIGFsbCB2YWx1ZXMgaW4gYSBgY29sbGVjdGlvbmAuXG4gKiBDaGVja3Mgb3duZWQsIGVudW1lcmFibGUgdmFsdWVzIGFuZCBleGl0cyBlYXJseSB3aGVuIGBwcmVkaWNhdGVgIHJldHVybnNcbiAqIGBmYWxzZWAuXG4gKlxuICogQG5hbWUgZXZlcnlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gdXNlZCB0byB0ZXN0IHZhbHVlcy5cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fHN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBzZWFyY2guXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGFsbCB2YWx1ZXMgcGFzc2VzIHRoZSBwcmVkaWNhdGUgdGVzdCwgb3RoZXJ3aXNlIGZhbHNlLlxuICogQGV4YW1wbGVcbiAqIHZhciBpc0V2ZW4gPSBmdW5jdGlvbihudW0pIHsgcmV0dXJuIG51bSAlIDIgPT09IDA7IH07XG4gKlxuICogZXZlcnkoaXNFdmVuLCBbXSk7IC8vID0+IHRydWVcbiAqIGV2ZXJ5KGlzRXZlbiwgWzEsIDJdKTsgLy8gPT4gZmFsc2VcbiAqIGV2ZXJ5KGlzRXZlbiwgWzIsIDQsIDZdKTsgLy8gPT4gdHJ1ZVxuICovXG52YXIgZXZlcnkgPSBmdW5jdGlvbiBldmVyeShwcmVkaWNhdGUsIGNvbGxlY3Rpb24pIHtcbiAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdgcHJlZGljYXRlYCBtdXN0IGJlIGEgZnVuY3Rpb24gYnV0IHdhcyBhICcgKyB0eXBlb2YgcHJlZGljYXRlKTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSB0cnVlO1xuXG4gIGVhY2goZnVuY3Rpb24odmFsLCBrZXksIGNvbGxlY3Rpb24pIHtcbiAgICByZXN1bHQgPSAhIXByZWRpY2F0ZSh2YWwsIGtleSwgY29sbGVjdGlvbik7XG5cbiAgICAvLyBFeGl0IGVhcmx5XG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIGNvbGxlY3Rpb24pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKlxuICogRXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV2ZXJ5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQG5kaG91bGUvZXZlcnkvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDkwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLy8gU3RyaW5naWZpZXJcbnZhciB0b1N0cmluZyA9IGdsb2JhbC5KU09OICYmIHR5cGVvZiBKU09OLnN0cmluZ2lmeSA9PT0gJ2Z1bmN0aW9uJyA/IEpTT04uc3RyaW5naWZ5IDogU3RyaW5nO1xuXG4vKipcbiAqIEZvcm1hdCB0aGUgZ2l2ZW4gYHN0cmAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHBhcmFtIHsuLi4qfSBbYXJnc11cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZm10KHN0cikge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gIHZhciBqID0gMDtcblxuICByZXR1cm4gc3RyLnJlcGxhY2UoLyUoW2Etel0pL2dpLCBmdW5jdGlvbihtYXRjaCwgZikge1xuICAgIHJldHVybiBmbXRbZl0gPyBmbXRbZl0oYXJnc1tqKytdKSA6IG1hdGNoICsgZjtcbiAgfSk7XG59XG5cbi8vIEZvcm1hdHRlcnNcbmZtdC5vID0gdG9TdHJpbmc7XG5mbXQucyA9IFN0cmluZztcbmZtdC5kID0gcGFyc2VJbnQ7XG5cbi8qXG4gKiBFeHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZm10O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvZm10L2xpYi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gOTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBpcyA9IHJlcXVpcmUoJ2lzJyk7XG52YXIgb25sb2FkID0gcmVxdWlyZSgnc2NyaXB0LW9ubG9hZCcpO1xudmFyIHRpY2sgPSByZXF1aXJlKCduZXh0LXRpY2snKTtcblxuLyoqXG4gKiBFeHBvc2UgYGxvYWRTY3JpcHRgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxvYWRJZnJhbWUob3B0aW9ucywgZm4pe1xuICBpZiAoIW9wdGlvbnMpIHRocm93IG5ldyBFcnJvcignQ2FudCBsb2FkIG5vdGhpbmcuLi4nKTtcblxuICAvLyBBbGxvdyBmb3IgdGhlIHNpbXBsZXN0IGNhc2UsIGp1c3QgcGFzc2luZyBhIGBzcmNgIHN0cmluZy5cbiAgaWYgKGlzLnN0cmluZyhvcHRpb25zKSkgb3B0aW9ucyA9IHsgc3JjIDogb3B0aW9ucyB9O1xuXG4gIHZhciBodHRwcyA9IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6JyB8fFxuICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2Nocm9tZS1leHRlbnNpb246JztcblxuICAvLyBJZiB5b3UgdXNlIHByb3RvY29sIHJlbGF0aXZlIFVSTHMsIHRoaXJkLXBhcnR5IHNjcmlwdHMgbGlrZSBHb29nbGVcbiAgLy8gQW5hbHl0aWNzIGJyZWFrIHdoZW4gdGVzdGluZyB3aXRoIGBmaWxlOmAgc28gdGhpcyBmaXhlcyB0aGF0LlxuICBpZiAob3B0aW9ucy5zcmMgJiYgb3B0aW9ucy5zcmMuaW5kZXhPZignLy8nKSA9PT0gMCkge1xuICAgIG9wdGlvbnMuc3JjID0gaHR0cHMgPyAnaHR0cHM6JyArIG9wdGlvbnMuc3JjIDogJ2h0dHA6JyArIG9wdGlvbnMuc3JjO1xuICB9XG5cbiAgLy8gQWxsb3cgdGhlbSB0byBwYXNzIGluIGRpZmZlcmVudCBVUkxzIGRlcGVuZGluZyBvbiB0aGUgcHJvdG9jb2wuXG4gIGlmIChodHRwcyAmJiBvcHRpb25zLmh0dHBzKSBvcHRpb25zLnNyYyA9IG9wdGlvbnMuaHR0cHM7XG4gIGVsc2UgaWYgKCFodHRwcyAmJiBvcHRpb25zLmh0dHApIG9wdGlvbnMuc3JjID0gb3B0aW9ucy5odHRwO1xuXG4gIC8vIE1ha2UgdGhlIGA8aWZyYW1lPmAgZWxlbWVudCBhbmQgaW5zZXJ0IGl0IGJlZm9yZSB0aGUgZmlyc3QgaWZyYW1lIG9uIHRoZVxuICAvLyBwYWdlLCB3aGljaCBpcyBndWFyYW50ZWVkIHRvIGV4aXN0IHNpbmNlIHRoaXMgSmF2YWlmcmFtZSBpcyBydW5uaW5nLlxuICB2YXIgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gIGlmcmFtZS5zcmMgPSBvcHRpb25zLnNyYztcbiAgaWZyYW1lLndpZHRoID0gb3B0aW9ucy53aWR0aCB8fCAxO1xuICBpZnJhbWUuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgMTtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgLy8gSWYgd2UgaGF2ZSBhIGZuLCBhdHRhY2ggZXZlbnQgaGFuZGxlcnMsIGV2ZW4gaW4gSUUuIEJhc2VkIG9mZiBvZlxuICAvLyB0aGUgVGhpcmQtUGFydHkgSmF2YXNjcmlwdCBzY3JpcHQgbG9hZGluZyBleGFtcGxlOlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vdGhpcmRwYXJ0eWpzL3RoaXJkcGFydHlqcy1jb2RlL2Jsb2IvbWFzdGVyL2V4YW1wbGVzL3RlbXBsYXRlcy8wMi9sb2FkaW5nLWZpbGVzL2luZGV4Lmh0bWxcbiAgaWYgKGlzLmZuKGZuKSkge1xuICAgIG9ubG9hZChpZnJhbWUsIGZuKTtcbiAgfVxuXG4gIHRpY2soZnVuY3Rpb24oKXtcbiAgICAvLyBBcHBlbmQgYWZ0ZXIgZXZlbnQgbGlzdGVuZXJzIGFyZSBhdHRhY2hlZCBmb3IgSUUuXG4gICAgdmFyIGZpcnN0U2NyaXB0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgIGZpcnN0U2NyaXB0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGlmcmFtZSwgZmlyc3RTY3JpcHQpO1xuICB9KTtcblxuICAvLyBSZXR1cm4gdGhlIGlmcmFtZSBlbGVtZW50IGluIGNhc2UgdGhleSB3YW50IHRvIGRvIGFueXRoaW5nIHNwZWNpYWwsIGxpa2VcbiAgLy8gZ2l2ZSBpdCBhbiBJRCBvciBhdHRyaWJ1dGVzLlxuICByZXR1cm4gaWZyYW1lO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2xvYWQtaWZyYW1lL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA5MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBvbmxvYWQgPSByZXF1aXJlKCdzY3JpcHQtb25sb2FkJyk7XG52YXIgdGljayA9IHJlcXVpcmUoJ25leHQtdGljaycpO1xudmFyIHR5cGUgPSByZXF1aXJlKCdjb21wb25lbnQtdHlwZScpO1xuXG4vKipcbiAqIExvYWRzIGEgc2NyaXB0IGFzeW5jaHJvbm91c2x5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYlxuICovXG5mdW5jdGlvbiBsb2FkU2NyaXB0KG9wdGlvbnMsIGNiKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2FuXFwndCBsb2FkIG5vdGhpbmcuLi4nKTtcbiAgfVxuXG4gIC8vIEFsbG93IGZvciB0aGUgc2ltcGxlc3QgY2FzZSwganVzdCBwYXNzaW5nIGEgYHNyY2Agc3RyaW5nLlxuICBpZiAodHlwZShvcHRpb25zKSA9PT0gJ3N0cmluZycpIHtcbiAgICBvcHRpb25zID0geyBzcmMgOiBvcHRpb25zIH07XG4gIH1cblxuICB2YXIgaHR0cHMgPSBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOicgfHwgZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgPT09ICdjaHJvbWUtZXh0ZW5zaW9uOic7XG5cbiAgLy8gSWYgeW91IHVzZSBwcm90b2NvbCByZWxhdGl2ZSBVUkxzLCB0aGlyZC1wYXJ0eSBzY3JpcHRzIGxpa2UgR29vZ2xlXG4gIC8vIEFuYWx5dGljcyBicmVhayB3aGVuIHRlc3Rpbmcgd2l0aCBgZmlsZTpgIHNvIHRoaXMgZml4ZXMgdGhhdC5cbiAgaWYgKG9wdGlvbnMuc3JjICYmIG9wdGlvbnMuc3JjLmluZGV4T2YoJy8vJykgPT09IDApIHtcbiAgICBvcHRpb25zLnNyYyA9IChodHRwcyA/ICdodHRwczonIDogJ2h0dHA6JykgKyBvcHRpb25zLnNyYztcbiAgfVxuXG4gIC8vIEFsbG93IHRoZW0gdG8gcGFzcyBpbiBkaWZmZXJlbnQgVVJMcyBkZXBlbmRpbmcgb24gdGhlIHByb3RvY29sLlxuICBpZiAoaHR0cHMgJiYgb3B0aW9ucy5odHRwcykge1xuICAgIG9wdGlvbnMuc3JjID0gb3B0aW9ucy5odHRwcztcbiAgfSBlbHNlIGlmICghaHR0cHMgJiYgb3B0aW9ucy5odHRwKSB7XG4gICAgb3B0aW9ucy5zcmMgPSBvcHRpb25zLmh0dHA7XG4gIH1cblxuICAvLyBNYWtlIHRoZSBgPHNjcmlwdD5gIGVsZW1lbnQgYW5kIGluc2VydCBpdCBiZWZvcmUgdGhlIGZpcnN0IHNjcmlwdCBvbiB0aGVcbiAgLy8gcGFnZSwgd2hpY2ggaXMgZ3VhcmFudGVlZCB0byBleGlzdCBzaW5jZSB0aGlzIEphdmFzY3JpcHQgaXMgcnVubmluZy5cbiAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICBzY3JpcHQuc3JjID0gb3B0aW9ucy5zcmM7XG5cbiAgLy8gSWYgd2UgaGF2ZSBhIGNiLCBhdHRhY2ggZXZlbnQgaGFuZGxlcnMuIERvZXMgbm90IHdvcmsgb24gPCBJRTkgYmVjYXVzZVxuICAvLyBvbGRlciBicm93c2VyIHZlcnNpb25zIGRvbid0IHJlZ2lzdGVyIGVsZW1lbnQub25lcnJvclxuICBpZiAodHlwZShjYikgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvbmxvYWQoc2NyaXB0LCBjYik7XG4gIH1cblxuICB0aWNrKGZ1bmN0aW9uKCkge1xuICAgIC8vIEFwcGVuZCBhZnRlciBldmVudCBsaXN0ZW5lcnMgYXJlIGF0dGFjaGVkIGZvciBJRS5cbiAgICB2YXIgZmlyc3RTY3JpcHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgZmlyc3RTY3JpcHQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2NyaXB0LCBmaXJzdFNjcmlwdCk7XG4gIH0pO1xuXG4gIC8vIFJldHVybiB0aGUgc2NyaXB0IGVsZW1lbnQgaW4gY2FzZSB0aGV5IHdhbnQgdG8gZG8gYW55dGhpbmcgc3BlY2lhbCwgbGlrZVxuICAvLyBnaXZlIGl0IGFuIElEIG9yIGF0dHJpYnV0ZXMuXG4gIHJldHVybiBzY3JpcHQ7XG59XG5cbi8qXG4gKiBFeHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gbG9hZFNjcmlwdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL0BzZWdtZW50L2xvYWQtc2NyaXB0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA5M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogRXhwb3NlIGB0b05vQ2FzZWAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB0b05vQ2FzZTtcblxuXG4vKipcbiAqIFRlc3Qgd2hldGhlciBhIHN0cmluZyBpcyBjYW1lbC1jYXNlLlxuICovXG5cbnZhciBoYXNTcGFjZSA9IC9cXHMvO1xudmFyIGhhc1NlcGFyYXRvciA9IC9bXFxXX10vO1xuXG5cbi8qKlxuICogUmVtb3ZlIGFueSBzdGFydGluZyBjYXNlIGZyb20gYSBgc3RyaW5nYCwgbGlrZSBjYW1lbCBvciBzbmFrZSwgYnV0IGtlZXBcbiAqIHNwYWNlcyBhbmQgcHVuY3R1YXRpb24gdGhhdCBtYXkgYmUgaW1wb3J0YW50IG90aGVyd2lzZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gdG9Ob0Nhc2UgKHN0cmluZykge1xuICBpZiAoaGFzU3BhY2UudGVzdChzdHJpbmcpKSByZXR1cm4gc3RyaW5nLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChoYXNTZXBhcmF0b3IudGVzdChzdHJpbmcpKSByZXR1cm4gKHVuc2VwYXJhdGUoc3RyaW5nKSB8fCBzdHJpbmcpLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiB1bmNhbWVsaXplKHN0cmluZykudG9Mb3dlckNhc2UoKTtcbn1cblxuXG4vKipcbiAqIFNlcGFyYXRvciBzcGxpdHRlci5cbiAqL1xuXG52YXIgc2VwYXJhdG9yU3BsaXR0ZXIgPSAvW1xcV19dKygufCQpL2c7XG5cblxuLyoqXG4gKiBVbi1zZXBhcmF0ZSBhIGBzdHJpbmdgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5mdW5jdGlvbiB1bnNlcGFyYXRlIChzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKHNlcGFyYXRvclNwbGl0dGVyLCBmdW5jdGlvbiAobSwgbmV4dCkge1xuICAgIHJldHVybiBuZXh0ID8gJyAnICsgbmV4dCA6ICcnO1xuICB9KTtcbn1cblxuXG4vKipcbiAqIENhbWVsY2FzZSBzcGxpdHRlci5cbiAqL1xuXG52YXIgY2FtZWxTcGxpdHRlciA9IC8oLikoW0EtWl0rKS9nO1xuXG5cbi8qKlxuICogVW4tY2FtZWxjYXNlIGEgYHN0cmluZ2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5cbmZ1bmN0aW9uIHVuY2FtZWxpemUgKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoY2FtZWxTcGxpdHRlciwgZnVuY3Rpb24gKG0sIHByZXZpb3VzLCB1cHBlcnMpIHtcbiAgICByZXR1cm4gcHJldmlvdXMgKyAnICcgKyB1cHBlcnMudG9Mb3dlckNhc2UoKS5zcGxpdCgnJykuam9pbignICcpO1xuICB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90by1uby1jYXNlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA5NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG52YXIgZG9taWZ5ID0gcmVxdWlyZSgnZG9taWZ5Jyk7XG52YXIgZWFjaCA9IHJlcXVpcmUoJ0BuZGhvdWxlL2VhY2gnKTtcbnZhciBpbmNsdWRlcyA9IHJlcXVpcmUoJ0BuZGhvdWxlL2luY2x1ZGVzJyk7XG5cbi8qKlxuICogTWl4IGluIGVtaXR0ZXIuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbmV3LWNhcCAqL1xuRW1pdHRlcihleHBvcnRzKTtcbi8qIGVzbGludC1lbmFibGUgbmV3LWNhcCAqL1xuXG4vKipcbiAqIEFkZCBhIG5ldyBvcHRpb24gdG8gdGhlIGludGVncmF0aW9uIGJ5IGBrZXlgIHdpdGggZGVmYXVsdCBgdmFsdWVgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtJbnRlZ3JhdGlvbn1cbiAqL1xuXG5leHBvcnRzLm9wdGlvbiA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgdGhpcy5wcm90b3R5cGUuZGVmYXVsdHNba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkIGEgbmV3IG1hcHBpbmcgb3B0aW9uLlxuICpcbiAqIFRoaXMgd2lsbCBjcmVhdGUgYSBtZXRob2QgYG5hbWVgIHRoYXQgd2lsbCByZXR1cm4gYSBtYXBwaW5nIGZvciB5b3UgdG8gdXNlLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHJldHVybiB7SW50ZWdyYXRpb259XG4gKiBAZXhhbXBsZVxuICogSW50ZWdyYXRpb24oJ015IEludGVncmF0aW9uJylcbiAqICAgLm1hcHBpbmcoJ2V2ZW50cycpO1xuICpcbiAqIG5ldyBNeUludGVncmF0aW9uKCkudHJhY2soJ015IEV2ZW50Jyk7XG4gKlxuICogLnRyYWNrID0gZnVuY3Rpb24odHJhY2spe1xuICogICB2YXIgZXZlbnRzID0gdGhpcy5ldmVudHModHJhY2suZXZlbnQoKSk7XG4gKiAgIGVhY2goc2VuZCwgZXZlbnRzKTtcbiAqICB9O1xuICovXG5cbmV4cG9ydHMubWFwcGluZyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdGhpcy5vcHRpb24obmFtZSwgW10pO1xuICB0aGlzLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiB0aGlzLm1hcCh0aGlzLm9wdGlvbnNbbmFtZV0sIGtleSk7XG4gIH07XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZWdpc3RlciBhIG5ldyBnbG9iYWwgdmFyaWFibGUgYGtleWAgb3duZWQgYnkgdGhlIGludGVncmF0aW9uLCB3aGljaCB3aWxsIGJlXG4gKiB1c2VkIHRvIHRlc3Qgd2hldGhlciB0aGUgaW50ZWdyYXRpb24gaXMgYWxyZWFkeSBvbiB0aGUgcGFnZS5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHJldHVybiB7SW50ZWdyYXRpb259XG4gKi9cblxuZXhwb3J0cy5nbG9iYWwgPSBmdW5jdGlvbihrZXkpIHtcbiAgdGhpcy5wcm90b3R5cGUuZ2xvYmFscy5wdXNoKGtleSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNYXJrIHRoZSBpbnRlZ3JhdGlvbiBhcyBhc3N1bWluZyBhbiBpbml0aWFsIHBhZ2V2aWV3LCBzbyB0byBkZWZlciB0aGUgZmlyc3QgcGFnZSBjYWxsLCBrZWVwIHRyYWNrIG9mXG4gKiB3aGV0aGVyIHdlIGFscmVhZHkgbm9vcGVkIHRoZSBmaXJzdCBwYWdlIGNhbGwuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqIEByZXR1cm4ge0ludGVncmF0aW9ufVxuICovXG5cbmV4cG9ydHMuYXNzdW1lc1BhZ2V2aWV3ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucHJvdG90eXBlLl9hc3N1bWVzUGFnZXZpZXcgPSB0cnVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTWFyayB0aGUgaW50ZWdyYXRpb24gYXMgYmVpbmcgXCJyZWFkeVwiIG9uY2UgYGxvYWRgIGlzIGNhbGxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICogQHJldHVybiB7SW50ZWdyYXRpb259XG4gKi9cblxuZXhwb3J0cy5yZWFkeU9uTG9hZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnByb3RvdHlwZS5fcmVhZHlPbkxvYWQgPSB0cnVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTWFyayB0aGUgaW50ZWdyYXRpb24gYXMgYmVpbmcgXCJyZWFkeVwiIG9uY2UgYGluaXRpYWxpemVgIGlzIGNhbGxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICogQHJldHVybiB7SW50ZWdyYXRpb259XG4gKi9cblxuZXhwb3J0cy5yZWFkeU9uSW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnByb3RvdHlwZS5fcmVhZHlPbkluaXRpYWxpemUgPSB0cnVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGVmaW5lIGEgdGFnIHRvIGJlIGxvYWRlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lPSdsaWJyYXJ5J10gQSBuaWNlbmFtZSBmb3IgdGhlIHRhZywgY29tbW9ubHkgdXNlZCBpblxuICogI2xvYWQuIEhlbHBmdWwgd2hlbiB0aGUgaW50ZWdyYXRpb24gaGFzIG11bHRpcGxlIHRhZ3MgYW5kIHlvdSBuZWVkIGEgd2F5IHRvXG4gKiBzcGVjaWZ5IHdoaWNoIG9mIHRoZSB0YWdzIHlvdSB3YW50IHRvIGxvYWQgYXQgYSBnaXZlbiB0aW1lLlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBET00gdGFnIGFzIHN0cmluZyBvciBVUkwuXG4gKiBAcmV0dXJuIHtJbnRlZ3JhdGlvbn1cbiAqL1xuXG5leHBvcnRzLnRhZyA9IGZ1bmN0aW9uKG5hbWUsIHRhZykge1xuICBpZiAodGFnID09IG51bGwpIHtcbiAgICB0YWcgPSBuYW1lO1xuICAgIG5hbWUgPSAnbGlicmFyeSc7XG4gIH1cbiAgdGhpcy5wcm90b3R5cGUudGVtcGxhdGVzW25hbWVdID0gb2JqZWN0aWZ5KHRhZyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBHaXZlbiBhIHN0cmluZywgZ2l2ZSBiYWNrIERPTSBhdHRyaWJ1dGVzLlxuICpcbiAqIERvIGl0IGluIGEgd2F5IHdoZXJlIHRoZSBicm93c2VyIGRvZXNuJ3QgbG9hZCBpbWFnZXMgb3IgaWZyYW1lcy4gSXQgdHVybnNcbiAqIG91dCBkb21pZnkgd2lsbCBsb2FkIGltYWdlcy9pZnJhbWVzIGJlY2F1c2Ugd2hlbmV2ZXIgeW91IGNvbnN0cnVjdCB0aG9zZVxuICogRE9NIGVsZW1lbnRzLCB0aGUgYnJvd3NlciBpbW1lZGlhdGVseSBsb2FkcyB0aGVtLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIG9iamVjdGlmeShzdHIpIHtcbiAgLy8gcmVwbGFjZSBgc3JjYCB3aXRoIGBkYXRhLXNyY2AgdG8gcHJldmVudCBpbWFnZSBsb2FkaW5nXG4gIHN0ciA9IHN0ci5yZXBsYWNlKCcgc3JjPVwiJywgJyBkYXRhLXNyYz1cIicpO1xuXG4gIHZhciBlbCA9IGRvbWlmeShzdHIpO1xuICB2YXIgYXR0cnMgPSB7fTtcblxuICBlYWNoKGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAvLyB0aGVuIHJlcGxhY2UgaXQgYmFja1xuICAgIHZhciBuYW1lID0gYXR0ci5uYW1lID09PSAnZGF0YS1zcmMnID8gJ3NyYycgOiBhdHRyLm5hbWU7XG4gICAgaWYgKCFpbmNsdWRlcyhhdHRyLm5hbWUgKyAnPScsIHN0cikpIHJldHVybjtcbiAgICBhdHRyc1tuYW1lXSA9IGF0dHIudmFsdWU7XG4gIH0sIGVsLmF0dHJpYnV0ZXMpO1xuXG4gIHJldHVybiB7XG4gICAgdHlwZTogZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpLFxuICAgIGF0dHJzOiBhdHRyc1xuICB9O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvQHNlZ21lbnQvYW5hbHl0aWNzLmpzLWludGVncmF0aW9uL2xpYi9zdGF0aWNzLmpzXG4vLyBtb2R1bGUgaWQgPSA5NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogRXhwb3NlIGBwYXJzZWAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZTtcblxuLyoqXG4gKiBUZXN0cyBmb3IgYnJvd3NlciBzdXBwb3J0LlxuICovXG5cbnZhciBpbm5lckhUTUxCdWcgPSBmYWxzZTtcbnZhciBidWdUZXN0RGl2O1xuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgYnVnVGVzdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAvLyBTZXR1cFxuICBidWdUZXN0RGl2LmlubmVySFRNTCA9ICcgIDxsaW5rLz48dGFibGU+PC90YWJsZT48YSBocmVmPVwiL2FcIj5hPC9hPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIi8+JztcbiAgLy8gTWFrZSBzdXJlIHRoYXQgbGluayBlbGVtZW50cyBnZXQgc2VyaWFsaXplZCBjb3JyZWN0bHkgYnkgaW5uZXJIVE1MXG4gIC8vIFRoaXMgcmVxdWlyZXMgYSB3cmFwcGVyIGVsZW1lbnQgaW4gSUVcbiAgaW5uZXJIVE1MQnVnID0gIWJ1Z1Rlc3REaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpbmsnKS5sZW5ndGg7XG4gIGJ1Z1Rlc3REaXYgPSB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogV3JhcCBtYXAgZnJvbSBqcXVlcnkuXG4gKi9cblxudmFyIG1hcCA9IHtcbiAgbGVnZW5kOiBbMSwgJzxmaWVsZHNldD4nLCAnPC9maWVsZHNldD4nXSxcbiAgdHI6IFsyLCAnPHRhYmxlPjx0Ym9keT4nLCAnPC90Ym9keT48L3RhYmxlPiddLFxuICBjb2w6IFsyLCAnPHRhYmxlPjx0Ym9keT48L3Rib2R5Pjxjb2xncm91cD4nLCAnPC9jb2xncm91cD48L3RhYmxlPiddLFxuICAvLyBmb3Igc2NyaXB0L2xpbmsvc3R5bGUgdGFncyB0byB3b3JrIGluIElFNi04LCB5b3UgaGF2ZSB0byB3cmFwXG4gIC8vIGluIGEgZGl2IHdpdGggYSBub24td2hpdGVzcGFjZSBjaGFyYWN0ZXIgaW4gZnJvbnQsIGhhIVxuICBfZGVmYXVsdDogaW5uZXJIVE1MQnVnID8gWzEsICdYPGRpdj4nLCAnPC9kaXY+J10gOiBbMCwgJycsICcnXVxufTtcblxubWFwLnRkID1cbm1hcC50aCA9IFszLCAnPHRhYmxlPjx0Ym9keT48dHI+JywgJzwvdHI+PC90Ym9keT48L3RhYmxlPiddO1xuXG5tYXAub3B0aW9uID1cbm1hcC5vcHRncm91cCA9IFsxLCAnPHNlbGVjdCBtdWx0aXBsZT1cIm11bHRpcGxlXCI+JywgJzwvc2VsZWN0PiddO1xuXG5tYXAudGhlYWQgPVxubWFwLnRib2R5ID1cbm1hcC5jb2xncm91cCA9XG5tYXAuY2FwdGlvbiA9XG5tYXAudGZvb3QgPSBbMSwgJzx0YWJsZT4nLCAnPC90YWJsZT4nXTtcblxubWFwLnBvbHlsaW5lID1cbm1hcC5lbGxpcHNlID1cbm1hcC5wb2x5Z29uID1cbm1hcC5jaXJjbGUgPVxubWFwLnRleHQgPVxubWFwLmxpbmUgPVxubWFwLnBhdGggPVxubWFwLnJlY3QgPVxubWFwLmcgPSBbMSwgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZlcnNpb249XCIxLjFcIj4nLCc8L3N2Zz4nXTtcblxuLyoqXG4gKiBQYXJzZSBgaHRtbGAgYW5kIHJldHVybiBhIERPTSBOb2RlIGluc3RhbmNlLCB3aGljaCBjb3VsZCBiZSBhIFRleHROb2RlLFxuICogSFRNTCBET00gTm9kZSBvZiBzb21lIGtpbmQgKDxkaXY+IGZvciBleGFtcGxlKSwgb3IgYSBEb2N1bWVudEZyYWdtZW50XG4gKiBpbnN0YW5jZSwgZGVwZW5kaW5nIG9uIHRoZSBjb250ZW50cyBvZiB0aGUgYGh0bWxgIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaHRtbCAtIEhUTUwgc3RyaW5nIHRvIFwiZG9taWZ5XCJcbiAqIEBwYXJhbSB7RG9jdW1lbnR9IGRvYyAtIFRoZSBgZG9jdW1lbnRgIGluc3RhbmNlIHRvIGNyZWF0ZSB0aGUgTm9kZSBmb3JcbiAqIEByZXR1cm4ge0RPTU5vZGV9IHRoZSBUZXh0Tm9kZSwgRE9NIE5vZGUsIG9yIERvY3VtZW50RnJhZ21lbnQgaW5zdGFuY2VcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKGh0bWwsIGRvYykge1xuICBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIGh0bWwpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1N0cmluZyBleHBlY3RlZCcpO1xuXG4gIC8vIGRlZmF1bHQgdG8gdGhlIGdsb2JhbCBgZG9jdW1lbnRgIG9iamVjdFxuICBpZiAoIWRvYykgZG9jID0gZG9jdW1lbnQ7XG5cbiAgLy8gdGFnIG5hbWVcbiAgdmFyIG0gPSAvPChbXFx3Ol0rKS8uZXhlYyhodG1sKTtcbiAgaWYgKCFtKSByZXR1cm4gZG9jLmNyZWF0ZVRleHROb2RlKGh0bWwpO1xuXG4gIGh0bWwgPSBodG1sLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTsgLy8gUmVtb3ZlIGxlYWRpbmcvdHJhaWxpbmcgd2hpdGVzcGFjZVxuXG4gIHZhciB0YWcgPSBtWzFdO1xuXG4gIC8vIGJvZHkgc3VwcG9ydFxuICBpZiAodGFnID09ICdib2R5Jykge1xuICAgIHZhciBlbCA9IGRvYy5jcmVhdGVFbGVtZW50KCdodG1sJyk7XG4gICAgZWwuaW5uZXJIVE1MID0gaHRtbDtcbiAgICByZXR1cm4gZWwucmVtb3ZlQ2hpbGQoZWwubGFzdENoaWxkKTtcbiAgfVxuXG4gIC8vIHdyYXAgbWFwXG4gIHZhciB3cmFwID0gbWFwW3RhZ10gfHwgbWFwLl9kZWZhdWx0O1xuICB2YXIgZGVwdGggPSB3cmFwWzBdO1xuICB2YXIgcHJlZml4ID0gd3JhcFsxXTtcbiAgdmFyIHN1ZmZpeCA9IHdyYXBbMl07XG4gIHZhciBlbCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZWwuaW5uZXJIVE1MID0gcHJlZml4ICsgaHRtbCArIHN1ZmZpeDtcbiAgd2hpbGUgKGRlcHRoLS0pIGVsID0gZWwubGFzdENoaWxkO1xuXG4gIC8vIG9uZSBlbGVtZW50XG4gIGlmIChlbC5maXJzdENoaWxkID09IGVsLmxhc3RDaGlsZCkge1xuICAgIHJldHVybiBlbC5yZW1vdmVDaGlsZChlbC5maXJzdENoaWxkKTtcbiAgfVxuXG4gIC8vIHNldmVyYWwgZWxlbWVudHNcbiAgdmFyIGZyYWdtZW50ID0gZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgd2hpbGUgKGVsLmZpcnN0Q2hpbGQpIHtcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbC5yZW1vdmVDaGlsZChlbC5maXJzdENoaWxkKSk7XG4gIH1cblxuICByZXR1cm4gZnJhZ21lbnQ7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kb21pZnkvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBIT1AgcmVmLlxuICovXG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFJldHVybiBvd24ga2V5cyBpbiBgb2JqYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5rZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ob2JqKXtcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4ga2V5cztcbn07XG5cbi8qKlxuICogUmV0dXJuIG93biB2YWx1ZXMgaW4gYG9iamAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMudmFsdWVzID0gZnVuY3Rpb24ob2JqKXtcbiAgdmFyIHZhbHMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHZhbHMucHVzaChvYmpba2V5XSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWxzO1xufTtcblxuLyoqXG4gKiBNZXJnZSBgYmAgaW50byBgYWAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uKGEsIGIpe1xuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChoYXMuY2FsbChiLCBrZXkpKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBhO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gbGVuZ3RoIG9mIGBvYmpgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5sZW5ndGggPSBmdW5jdGlvbihvYmope1xuICByZXR1cm4gZXhwb3J0cy5rZXlzKG9iaikubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBlbXB0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmlzRW1wdHkgPSBmdW5jdGlvbihvYmope1xuICByZXR1cm4gMCA9PSBleHBvcnRzLmxlbmd0aChvYmopO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9vYmplY3QtY29tcG9uZW50L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA5N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpO1xuXG4vKipcbiAqIEV4cG9zZSBgZ2VuZXJhdGVgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGU7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBnbG9iYWwgcXVldWUgcHVzaGluZyBtZXRob2Qgd2l0aCBgbmFtZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiAgIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gd3JhcFxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cblxuZnVuY3Rpb24gZ2VuZXJhdGUgKG5hbWUsIG9wdGlvbnMpIHtcbiAgdmFyIGxvZyA9IGRlYnVnKCdnbG9iYWwtcXVldWU6JyArIG5hbWUpO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICByZXR1cm4gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHdpbmRvd1tuYW1lXSB8fCAod2luZG93W25hbWVdID0gW10pO1xuICAgIGxvZygnJW8nLCBhcmdzKTtcbiAgICBvcHRpb25zLndyYXAgPT09IGZhbHNlXG4gICAgICA/IHdpbmRvd1tuYW1lXS5wdXNoLmFwcGx5KHdpbmRvd1tuYW1lXSwgYXJncylcbiAgICAgIDogd2luZG93W25hbWVdLnB1c2goYXJncyk7XG4gIH07XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbG9iYWwtcXVldWUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDk4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2RlYnVnJyk7XG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZVxuICAgICAgICAgICAgICAgJiYgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZS5zdG9yYWdlXG4gICAgICAgICAgICAgICAgICA/IGNocm9tZS5zdG9yYWdlLmxvY2FsXG4gICAgICAgICAgICAgICAgICA6IGxvY2Fsc3RvcmFnZSgpO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFtcbiAgJ2xpZ2h0c2VhZ3JlZW4nLFxuICAnZm9yZXN0Z3JlZW4nLFxuICAnZ29sZGVucm9kJyxcbiAgJ2RvZGdlcmJsdWUnLFxuICAnZGFya29yY2hpZCcsXG4gICdjcmltc29uJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgLy8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcbiAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG4gICAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG4gICAgLy8gZG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybjtcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpXG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuXG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcbiAgaWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG4gICAgciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsb2JhbC1xdWV1ZS9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDk5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnWydkZWZhdWx0J10gPSBjcmVhdGVEZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4vKipcbiAqIFByZXZpb3VzIGxvZyB0aW1lc3RhbXAuXG4gKi9cblxudmFyIHByZXZUaW1lO1xuXG4vKipcbiAqIFNlbGVjdCBhIGNvbG9yLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG4gIHZhciBoYXNoID0gMCwgaTtcblxuICBmb3IgKGkgaW4gbmFtZXNwYWNlKSB7XG4gICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblxuICBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAvLyBkaXNhYmxlZD9cbiAgICBpZiAoIWRlYnVnLmVuYWJsZWQpIHJldHVybjtcblxuICAgIHZhciBzZWxmID0gZGVidWc7XG5cbiAgICAvLyBzZXQgYGRpZmZgIHRpbWVzdGFtcFxuICAgIHZhciBjdXJyID0gK25ldyBEYXRlKCk7XG4gICAgdmFyIG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcbiAgICBzZWxmLmRpZmYgPSBtcztcbiAgICBzZWxmLnByZXYgPSBwcmV2VGltZTtcbiAgICBzZWxmLmN1cnIgPSBjdXJyO1xuICAgIHByZXZUaW1lID0gY3VycjtcblxuICAgIC8vIHR1cm4gdGhlIGBhcmd1bWVudHNgIGludG8gYSBwcm9wZXIgQXJyYXlcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgYXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO1xuXG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgYXJnc1swXSkge1xuICAgICAgLy8gYW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cbiAgICAgIGFyZ3MudW5zaGlmdCgnJU8nKTtcbiAgICB9XG5cbiAgICAvLyBhcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgYXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16QS1aJV0pL2csIGZ1bmN0aW9uKG1hdGNoLCBmb3JtYXQpIHtcbiAgICAgIC8vIGlmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcbiAgICAgIGlmIChtYXRjaCA9PT0gJyUlJykgcmV0dXJuIG1hdGNoO1xuICAgICAgaW5kZXgrKztcbiAgICAgIHZhciBmb3JtYXR0ZXIgPSBleHBvcnRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZm9ybWF0dGVyKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcmdzW2luZGV4XTtcbiAgICAgICAgbWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG4gICAgICAgIC8vIG5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcbiAgICAgICAgYXJncy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpbmRleC0tO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuXG4gICAgLy8gYXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcbiAgICBleHBvcnRzLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuICAgIHZhciBsb2dGbiA9IGRlYnVnLmxvZyB8fCBleHBvcnRzLmxvZyB8fCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuICAgIGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG5cbiAgZGVidWcubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICBkZWJ1Zy5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKG5hbWVzcGFjZSk7XG4gIGRlYnVnLnVzZUNvbG9ycyA9IGV4cG9ydHMudXNlQ29sb3JzKCk7XG4gIGRlYnVnLmNvbG9yID0gc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcblxuICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuaW5pdCkge1xuICAgIGV4cG9ydHMuaW5pdChkZWJ1Zyk7XG4gIH1cblxuICByZXR1cm4gZGVidWc7XG59XG5cbi8qKlxuICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuICBleHBvcnRzLnNhdmUobmFtZXNwYWNlcyk7XG5cbiAgZXhwb3J0cy5uYW1lcyA9IFtdO1xuICBleHBvcnRzLnNraXBzID0gW107XG5cbiAgdmFyIHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcbiAgdmFyIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKCFzcGxpdFtpXSkgY29udGludWU7IC8vIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG4gICAgbmFtZXNwYWNlcyA9IHNwbGl0W2ldLnJlcGxhY2UoL1xcKi9nLCAnLio/Jyk7XG4gICAgaWYgKG5hbWVzcGFjZXNbMF0gPT09ICctJykge1xuICAgICAgZXhwb3J0cy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcy5zdWJzdHIoMSkgKyAnJCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIERpc2FibGUgZGVidWcgb3V0cHV0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgZXhwb3J0cy5lbmFibGUoJycpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlZChuYW1lKSB7XG4gIHZhciBpLCBsZW47XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMuc2tpcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5za2lwc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMubmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENvZXJjZSBgdmFsYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gY29lcmNlKHZhbCkge1xuICBpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG4gIHJldHVybiB2YWw7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbG9iYWwtcXVldWUvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9kZWJ1Zy5qc1xuLy8gbW9kdWxlIGlkID0gMTAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciB0eXBlID0gcmVxdWlyZSgndHlwZS1jb21wb25lbnQnKTtcblxuLyoqXG4gKiBFeHBvc2UgYHJlamVjdGBcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlamVjdDtcblxuLyoqXG4gKiBSZWplY3QgYG9iamAsIGBmbmAuXG4gKlxuICogSWYgYGZuYCBpcyBvbWl0dGVkIGEgZGVmYXVsdCBmdW5jdGlvblxuICogdGhhdCByZW1vdmVzIG51bGxzICh1bmRlZmluZWQvbnVsbCkgd2lsbFxuICogYmUgc3VwcGxpZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gcmVqZWN0KG9iaiwgZm4pe1xuICBmbiA9IGZuIHx8IGNvbXBhY3Q7XG4gIHJldHVybiAnYXJyYXknID09IHR5cGUob2JqKVxuICAgID8gcmVqZWN0LmFycmF5KG9iaiwgZm4pXG4gICAgOiByZWplY3Qub2JqZWN0KG9iaiwgZm4pO1xufVxuXG4vKipcbiAqIFJlamVjdCBgYXJyYCwgYGZuYC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gYXJyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZWplY3QuYXJyYXkgPSBmdW5jdGlvbihhcnIsIGZuKXtcbiAgdmFyIHJldCA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCFmbihhcnJbaV0sIGkpKSByZXRbcmV0Lmxlbmd0aF0gPSBhcnJbaV07XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcblxuLyoqXG4gKiBSZWplY3QgYG9iamAsIGBmbmAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVqZWN0Lm9iamVjdCA9IGZ1bmN0aW9uKG9iaiwgZm4pe1xuICB2YXIgcmV0ID0ge307XG5cbiAgZm9yICh2YXIgayBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspICYmICFmbihvYmpba10sIGspKSB7XG4gICAgICByZXRba10gPSBvYmpba11cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0O1xufTtcblxuLyoqXG4gKiBSZWplY3QgYHR5cGUocylgIG9mIGBvYmovYXJyYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqXG4gKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gdHlwZShzKVxuICogQHJldHVybiB7T2JqZWN0fEFycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZWplY3QudHlwZXMgPVxucmVqZWN0LnR5cGUgPSBmdW5jdGlvbihvYmosIHR5cGVzKXtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHR5cGVzKSkgdHlwZXMgPSBbdHlwZXNdO1xuICByZXR1cm4gcmVqZWN0KG9iaiwgZnVuY3Rpb24odmFsdWUpe1xuICAgIHJldHVybiAtMSAhPSB0eXBlcy5pbmRleE9mKHR5cGUodmFsdWUpKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFJlamVjdCBgdmFsdWVgIGlmIGl0J3MgYG51bGxgIG9yIGB1bmRlZmluZWRgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvbXBhY3QodmFsdWUpe1xuICByZXR1cm4gbnVsbCA9PSB2YWx1ZTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlamVjdC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBQcm90b2NvbC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gY2hlY2soKTtcbiAgICBjYXNlIDE6IHJldHVybiB0cmFuc2Zvcm0odXJsKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFRyYW5zZm9ybSBhIHByb3RvY29sLXJlbGF0aXZlIGB1cmxgIHRvIHRoZSB1c2UgdGhlIHByb3BlciBwcm90b2NvbC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxuZnVuY3Rpb24gdHJhbnNmb3JtICh1cmwpIHtcbiAgcmV0dXJuIGNoZWNrKCkgPyAnaHR0cHM6JyArIHVybCA6ICdodHRwOicgKyB1cmw7XG59XG5cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGBodHRwczpgIGJlIHVzZWQgZm9yIGxvYWRpbmcgc2NyaXB0cy5cbiAqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmZ1bmN0aW9uIGNoZWNrICgpIHtcbiAgcmV0dXJuIChcbiAgICBsb2NhdGlvbi5wcm90b2NvbCA9PSAnaHR0cHM6JyB8fFxuICAgIGxvY2F0aW9uLnByb3RvY29sID09ICdjaHJvbWUtZXh0ZW5zaW9uOidcbiAgKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy91c2UtaHR0cHMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEwMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9