(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("popper.js"));
	else if(typeof define === 'function' && define.amd)
		define(["popper.js"], factory);
	else if(typeof exports === 'object')
		exports["cytoscapePopper"] = factory(require("popper.js"));
	else
		root["cytoscapePopper"] = factory(root["Popper"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__) {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Simple, internal Object.assign() polyfill for options objects etc.

module.exports = Object.assign != null ? Object.assign.bind(Object) : function (tgt) {
  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  srcs.forEach(function (src) {
    Object.keys(src).forEach(function (k) {
      return tgt[k] = src[k];
    });
  });

  return tgt;
};

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(0);

var _require = __webpack_require__(9),
    getPopper = _require.getPopper;

var _require2 = __webpack_require__(7),
    getRef = _require2.getRef;

function popper(opts) {
  checkForWarning(this);

  return getPopper(this[0], createOptionsObject(this[0], opts));
}

function popperRef(opts) {
  checkForWarning(this);

  return getRef(this[0], createOptionsObject(this[0], opts));
}

function createOptionsObject(target, opts) {
  var renderedDimensions = function renderedDimensions(el) {
    return { w: el.renderedWidth(), h: el.renderedHeight() };
  };
  var renderedPosition = function renderedPosition(el) {
    return el.isNode() ? getRenderedCenter(el, renderedDimensions) : getRenderedMidpoint(el);
  };
  var popper = {};
  var cy = target.cy();

  var defaults = { renderedDimensions: renderedDimensions, renderedPosition: renderedPosition, popper: popper, cy: cy };

  return assign({}, defaults, opts);
}

//Get the rendered center
function getRenderedCenter(target, renderedDimensions) {
  var pos = target.renderedPosition();
  var dimensions = renderedDimensions(target);
  var offsetX = dimensions.w / 2;
  var offsetY = dimensions.h / 2;

  return {
    x: pos.x - offsetX,
    y: pos.y - offsetY
  };
}

//Get the rendered position of the midpoint
function getRenderedMidpoint(target) {
  var p = target.midpoint();
  var pan = target.cy().pan();
  var zoom = target.cy().zoom();

  return {
    x: p.x * zoom + pan.x,
    y: p.y * zoom + pan.y
  };
}

//Warn user about misuse of the plugin
function checkForWarning(elements) {
  /* eslint-disable no-console */

  //Popper.js Should only be used on 1 element
  if (elements.length > 1) {
    console.warn("Popper.js Extension should only be used on one element.");
    console.warn("Ignoring all subsequent elements");
  }

  /* eslint-enable */
}

module.exports = { popper: popper, popperRef: popperRef };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(0);

var _require = __webpack_require__(9),
    getPopper = _require.getPopper;

var _require2 = __webpack_require__(7),
    getRef = _require2.getRef;

function popper(opts) {
  return getPopper(this, createOptionsObject(this, opts));
}

function popperRef(opts) {
  return getRef(this, createOptionsObject(this, opts));
}

//Create a options object with required default values
function createOptionsObject(target, opts) {
  var defaults = {
    boundingBox: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      w: 3,
      h: 3
    },
    renderedDimensions: function renderedDimensions() {
      return { w: 3, h: 3 };
    },
    redneredPosition: function redneredPosition() {
      return { x: 0, y: 0 };
    },
    popper: {},
    cy: target
  };

  return assign({}, defaults, opts);
}

module.exports = { popper: popper, popperRef: popperRef };

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global cytoscape */

var coreImpl = __webpack_require__(3);
var collectionImpl = __webpack_require__(2);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  // register with cytoscape.js
  cytoscape('core', 'popper', coreImpl.popper); //Cytoscape Core
  cytoscape('collection', 'popper', collectionImpl.popper); //Cytoscape Collections
  cytoscape('core', 'popperRef', coreImpl.popperRef); //Cytoscape Core for References
  cytoscape('collection', 'popperRef', collectionImpl.popperRef); //Cytoscape Collections for References
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape);
}

module.exports = register;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(11),
    getBoundingBox = _require.getBoundingBox;

// Create a popper reference object
// https://popper.js.org/popper-documentation.html#referenceObject


function getRef(target, opts) {
  var renderedDimensions = opts.renderedDimensions;

  //Define popper reference object and cy reference  object

  var refObject = {
    getBoundingClientRect: function getBoundingClientRect() {
      return getBoundingBox(target, opts);
    },

    get clientWidth() {
      return renderedDimensions(target).w;
    },

    get clientHeight() {
      return renderedDimensions(target).h;
    }
  };

  return refObject;
}

module.exports = { getRef: getRef };

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(0);

var _require = __webpack_require__(7),
    getRef = _require.getRef;

var _require2 = __webpack_require__(10),
    getContent = _require2.getContent;

var popperDefaults = {};

//Fix Popper.js webpack import conflict (Use .default if using webpack)
var Popper = __webpack_require__(6);
var EsmWebpackPopper = Popper.default;
if (EsmWebpackPopper != null && EsmWebpackPopper.Defaults != null) {
  Popper = Popper.default;
}

// Create a new popper object for a core or element target
function getPopper(target, opts) {
  var refObject = getRef(target, opts);
  var content = getContent(target, opts.content);
  var popperOpts = assign({}, popperDefaults, opts.popper);

  return new Popper(refObject, content, popperOpts);
}

module.exports = { getPopper: getPopper };

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getContent(target, content) {
  var contentObject = null;

  if (typeof content === "function") {
    //Execute function if user opted for a dyanamic target
    contentObject = content(target);
  } else if (content instanceof HTMLElement) {
    //Target option is an HTML element
    return content;
  } else {
    throw new Error("Can not create popper from 'target' with unknown type");
  }

  // Check validity of parsed target
  if (contentObject === null) {
    throw new Error("No 'target' specified to create popper");
  } else {
    return contentObject;
  }
}

module.exports = { getContent: getContent };

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getBoundingBox(target, opts) {
  var renderedPosition = opts.renderedPosition,
      cy = opts.cy,
      renderedDimensions = opts.renderedDimensions;

  var offset = cy.container().getBoundingClientRect();
  var dims = renderedDimensions(target);
  var pos = renderedPosition(target);
  var scrollY = window.pageYOffset;
  var scrollX = window.pageXOffset;

  return {
    top: pos.y + offset.top + scrollY,
    left: pos.x + offset.left + scrollX,
    right: pos.x + dims.w + offset.left + scrollX,
    bottom: pos.y + dims.h + offset.top + scrollY,
    width: dims.w,
    height: dims.h
  };
}

module.exports = { getBoundingBox: getBoundingBox };

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzMTg2MGRhZWFjOTEyZjg5NmJlNSIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9jb2xsZWN0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInBvcHBlci5qc1wiLFwiY29tbW9uanMyXCI6XCJwb3BwZXIuanNcIixcImFtZFwiOlwicG9wcGVyLmpzXCIsXCJyb290XCI6XCJQb3BwZXJcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9iYi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiT2JqZWN0IiwiYXNzaWduIiwiYmluZCIsInRndCIsInNyY3MiLCJmb3JFYWNoIiwia2V5cyIsInNyYyIsImsiLCJyZXF1aXJlIiwiZ2V0UG9wcGVyIiwiZ2V0UmVmIiwicG9wcGVyIiwib3B0cyIsImNoZWNrRm9yV2FybmluZyIsImNyZWF0ZU9wdGlvbnNPYmplY3QiLCJwb3BwZXJSZWYiLCJ0YXJnZXQiLCJyZW5kZXJlZERpbWVuc2lvbnMiLCJ3IiwiZWwiLCJyZW5kZXJlZFdpZHRoIiwiaCIsInJlbmRlcmVkSGVpZ2h0IiwicmVuZGVyZWRQb3NpdGlvbiIsImlzTm9kZSIsImdldFJlbmRlcmVkQ2VudGVyIiwiZ2V0UmVuZGVyZWRNaWRwb2ludCIsImN5IiwiZGVmYXVsdHMiLCJwb3MiLCJkaW1lbnNpb25zIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJ4IiwieSIsInAiLCJtaWRwb2ludCIsInBhbiIsInpvb20iLCJlbGVtZW50cyIsImxlbmd0aCIsImNvbnNvbGUiLCJ3YXJuIiwiYm91bmRpbmdCb3giLCJ0b3AiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJyZWRuZXJlZFBvc2l0aW9uIiwiY29yZUltcGwiLCJjb2xsZWN0aW9uSW1wbCIsInJlZ2lzdGVyIiwiY3l0b3NjYXBlIiwiZ2V0Qm91bmRpbmdCb3giLCJyZWZPYmplY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImdldENvbnRlbnQiLCJwb3BwZXJEZWZhdWx0cyIsIlBvcHBlciIsIkVzbVdlYnBhY2tQb3BwZXIiLCJkZWZhdWx0IiwiRGVmYXVsdHMiLCJjb250ZW50IiwicG9wcGVyT3B0cyIsImNvbnRlbnRPYmplY3QiLCJIVE1MRWxlbWVudCIsIkVycm9yIiwib2Zmc2V0IiwiY29udGFpbmVyIiwiZGltcyIsInNjcm9sbFkiLCJ3aW5kb3ciLCJwYWdlWU9mZnNldCIsInNjcm9sbFgiLCJwYWdlWE9mZnNldCIsIndpZHRoIiwiaGVpZ2h0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDaEVB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U0FBS2YsSUFBSUssQ0FBSixHQUFRbUMsT0FBT3pCLEdBQWYsR0FBcUI0QixPQURyQjtBQUVMM0IsVUFBTWhCLElBQUlJLENBQUosR0FBUW9DLE9BQU94QixJQUFmLEdBQXNCOEIsT0FGdkI7QUFHTDdCLFdBQU9qQixJQUFJSSxDQUFKLEdBQVFzQyxLQUFLckQsQ0FBYixHQUFpQm1ELE9BQU94QixJQUF4QixHQUErQjhCLE9BSGpDO0FBSUw1QixZQUFRbEIsSUFBSUssQ0FBSixHQUFRcUMsS0FBS2xELENBQWIsR0FBaUJnRCxPQUFPekIsR0FBeEIsR0FBOEI0QixPQUpqQztBQUtMSyxXQUFPTixLQUFLckQsQ0FMUDtBQU1MNEQsWUFBUVAsS0FBS2xEO0FBTlIsR0FBUDtBQVFEOztBQUVEeEIsT0FBT0MsT0FBUCxHQUFpQixFQUFFdUQsOEJBQUYsRUFBakIsQyIsImZpbGUiOiJjeXRvc2NhcGUtcG9wcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicG9wcGVyLmpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInBvcHBlci5qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJjeXRvc2NhcGVQb3BwZXJcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJwb3BwZXIuanNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN5dG9zY2FwZVBvcHBlclwiXSA9IGZhY3Rvcnkocm9vdFtcIlBvcHBlclwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDMxODYwZGFlYWM5MTJmODk2YmU1IiwiLy8gU2ltcGxlLCBpbnRlcm5hbCBPYmplY3QuYXNzaWduKCkgcG9seWZpbGwgZm9yIG9wdGlvbnMgb2JqZWN0cyBldGMuXG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiAhPSBudWxsID8gT2JqZWN0LmFzc2lnbi5iaW5kKE9iamVjdCkgOiBmdW5jdGlvbiAodGd0LCAuLi5zcmNzKSB7XG4gIHNyY3MuZm9yRWFjaChzcmMgPT4ge1xuICAgIE9iamVjdC5rZXlzKHNyYykuZm9yRWFjaChrID0+IHRndFtrXSA9IHNyY1trXSk7XG4gIH0pO1xuXG4gIHJldHVybiB0Z3Q7XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Fzc2lnbi5qcyIsImNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJy4vYXNzaWduJyk7XG5jb25zdCB7IGdldFBvcHBlciB9ID0gcmVxdWlyZSgnLi9wb3BwZXInKTtcbmNvbnN0IHsgZ2V0UmVmIH0gPSByZXF1aXJlKCcuL3JlZicpO1xuXG5mdW5jdGlvbiBwb3BwZXIgKG9wdHMpIHtcbiAgY2hlY2tGb3JXYXJuaW5nKHRoaXMpO1xuXG4gIHJldHVybiBnZXRQb3BwZXIodGhpc1swXSwgY3JlYXRlT3B0aW9uc09iamVjdCh0aGlzWzBdLCBvcHRzKSk7XG59XG5cbmZ1bmN0aW9uIHBvcHBlclJlZihvcHRzKSB7XG4gIGNoZWNrRm9yV2FybmluZyh0aGlzKTtcblxuICByZXR1cm4gZ2V0UmVmKHRoaXNbMF0sIGNyZWF0ZU9wdGlvbnNPYmplY3QodGhpc1swXSwgb3B0cykpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPcHRpb25zT2JqZWN0KHRhcmdldCwgb3B0cykge1xuICBsZXQgcmVuZGVyZWREaW1lbnNpb25zID0gZWwgPT4gKHsgdzogZWwucmVuZGVyZWRXaWR0aCgpLCBoOiBlbC5yZW5kZXJlZEhlaWdodCgpIH0pO1xuICBsZXQgcmVuZGVyZWRQb3NpdGlvbiA9IGVsID0+IGVsLmlzTm9kZSgpID8gZ2V0UmVuZGVyZWRDZW50ZXIoZWwsIHJlbmRlcmVkRGltZW5zaW9ucykgOiBnZXRSZW5kZXJlZE1pZHBvaW50KGVsKTtcbiAgbGV0IHBvcHBlciA9IHt9O1xuICBsZXQgY3kgPSB0YXJnZXQuY3koKTtcblxuICBsZXQgZGVmYXVsdHMgPSB7IHJlbmRlcmVkRGltZW5zaW9ucywgcmVuZGVyZWRQb3NpdGlvbiwgcG9wcGVyLCBjeSB9O1xuXG4gIHJldHVybiBhc3NpZ24oIHt9LCBkZWZhdWx0cywgb3B0cyApO1xufVxuXG4vL0dldCB0aGUgcmVuZGVyZWQgY2VudGVyXG5mdW5jdGlvbiBnZXRSZW5kZXJlZENlbnRlcih0YXJnZXQsIHJlbmRlcmVkRGltZW5zaW9ucyl7XG4gIGxldCBwb3MgPSB0YXJnZXQucmVuZGVyZWRQb3NpdGlvbigpO1xuICBsZXQgZGltZW5zaW9ucyA9IHJlbmRlcmVkRGltZW5zaW9ucyh0YXJnZXQpO1xuICBsZXQgb2Zmc2V0WCA9IGRpbWVuc2lvbnMudyAvIDI7XG4gIGxldCBvZmZzZXRZID0gZGltZW5zaW9ucy5oIC8gMjtcblxuICByZXR1cm4ge1xuICAgIHggOiAocG9zLnggLSBvZmZzZXRYKSxcbiAgICB5IDogKHBvcy55IC0gb2Zmc2V0WSlcbiAgfTtcbn1cblxuLy9HZXQgdGhlIHJlbmRlcmVkIHBvc2l0aW9uIG9mIHRoZSBtaWRwb2ludFxuZnVuY3Rpb24gZ2V0UmVuZGVyZWRNaWRwb2ludCh0YXJnZXQpe1xuICBsZXQgcCA9IHRhcmdldC5taWRwb2ludCgpO1xuICBsZXQgcGFuID0gdGFyZ2V0LmN5KCkucGFuKCk7XG4gIGxldCB6b29tID0gdGFyZ2V0LmN5KCkuem9vbSgpO1xuXG4gIHJldHVybiB7XG4gICAgeDogcC54ICogem9vbSArIHBhbi54LFxuICAgIHk6IHAueSAqIHpvb20gKyBwYW4ueVxuICB9O1xufVxuXG4vL1dhcm4gdXNlciBhYm91dCBtaXN1c2Ugb2YgdGhlIHBsdWdpblxuZnVuY3Rpb24gY2hlY2tGb3JXYXJuaW5nKGVsZW1lbnRzKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblxuICAvL1BvcHBlci5qcyBTaG91bGQgb25seSBiZSB1c2VkIG9uIDEgZWxlbWVudFxuICBpZiAoZWxlbWVudHMubGVuZ3RoID4gMSkge1xuICAgIGNvbnNvbGUud2FybihcIlBvcHBlci5qcyBFeHRlbnNpb24gc2hvdWxkIG9ubHkgYmUgdXNlZCBvbiBvbmUgZWxlbWVudC5cIik7XG4gICAgY29uc29sZS53YXJuKFwiSWdub3JpbmcgYWxsIHN1YnNlcXVlbnQgZWxlbWVudHNcIik7XG4gIH1cblxuICAvKiBlc2xpbnQtZW5hYmxlICovXG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBwb3BwZXIsIHBvcHBlclJlZiB9O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbGxlY3Rpb24uanMiLCJjb25zdCBhc3NpZ24gPSByZXF1aXJlKCcuL2Fzc2lnbicpO1xuY29uc3QgeyBnZXRQb3BwZXIgfSA9IHJlcXVpcmUoJy4vcG9wcGVyJyk7XG5jb25zdCB7IGdldFJlZiB9ID0gcmVxdWlyZSgnLi9yZWYnKTtcblxuZnVuY3Rpb24gcG9wcGVyKG9wdHMpIHtcbiAgcmV0dXJuIGdldFBvcHBlcih0aGlzLCBjcmVhdGVPcHRpb25zT2JqZWN0KHRoaXMsIG9wdHMpKTtcbn1cblxuXG5mdW5jdGlvbiBwb3BwZXJSZWYob3B0cykge1xuICByZXR1cm4gZ2V0UmVmKHRoaXMsIGNyZWF0ZU9wdGlvbnNPYmplY3QodGhpcywgb3B0cykpO1xufVxuXG4vL0NyZWF0ZSBhIG9wdGlvbnMgb2JqZWN0IHdpdGggcmVxdWlyZWQgZGVmYXVsdCB2YWx1ZXNcbmZ1bmN0aW9uIGNyZWF0ZU9wdGlvbnNPYmplY3QodGFyZ2V0LCBvcHRzKSB7XG4gIGxldCBkZWZhdWx0cyA9IHtcbiAgICBib3VuZGluZ0JveCA6IHtcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICByaWdodDogMCxcbiAgICAgIGJvdHRvbTogMCxcbiAgICAgIHc6IDMsXG4gICAgICBoOiAzLFxuICAgIH0sXG4gICAgcmVuZGVyZWREaW1lbnNpb25zIDogKCkgPT4gKHt3OiAzLCBoOiAzfSksXG4gICAgcmVkbmVyZWRQb3NpdGlvbiA6ICgpID0+ICh7eCA6IDAsIHkgOiAwfSksXG4gICAgcG9wcGVyIDoge30sXG4gICAgY3kgOiB0YXJnZXRcbiAgfTtcblxuICByZXR1cm4gYXNzaWduKCB7fSwgZGVmYXVsdHMsIG9wdHMgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IHBvcHBlciwgcG9wcGVyUmVmIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS5qcyIsIi8qIGdsb2JhbCBjeXRvc2NhcGUgKi9cblxuY29uc3QgY29yZUltcGwgPSByZXF1aXJlKCcuL2NvcmUnKTtcbmNvbnN0IGNvbGxlY3Rpb25JbXBsID0gcmVxdWlyZSgnLi9jb2xsZWN0aW9uJyk7XG5cbi8vIHJlZ2lzdGVycyB0aGUgZXh0ZW5zaW9uIG9uIGEgY3l0b3NjYXBlIGxpYiByZWZcbmxldCByZWdpc3RlciA9IGZ1bmN0aW9uIChjeXRvc2NhcGUpIHtcbiAgaWYgKCFjeXRvc2NhcGUpIHsgcmV0dXJuOyB9IC8vIGNhbid0IHJlZ2lzdGVyIGlmIGN5dG9zY2FwZSB1bnNwZWNpZmllZFxuXG4gIC8vIHJlZ2lzdGVyIHdpdGggY3l0b3NjYXBlLmpzXG4gIGN5dG9zY2FwZSgnY29yZScsICdwb3BwZXInLCBjb3JlSW1wbC5wb3BwZXIpOyAgLy9DeXRvc2NhcGUgQ29yZVxuICBjeXRvc2NhcGUoJ2NvbGxlY3Rpb24nLCAncG9wcGVyJywgY29sbGVjdGlvbkltcGwucG9wcGVyKTsgLy9DeXRvc2NhcGUgQ29sbGVjdGlvbnNcbiAgY3l0b3NjYXBlKCdjb3JlJywgJ3BvcHBlclJlZicsIGNvcmVJbXBsLnBvcHBlclJlZik7ICAvL0N5dG9zY2FwZSBDb3JlIGZvciBSZWZlcmVuY2VzXG4gIGN5dG9zY2FwZSgnY29sbGVjdGlvbicsICdwb3BwZXJSZWYnLCBjb2xsZWN0aW9uSW1wbC5wb3BwZXJSZWYpOyAvL0N5dG9zY2FwZSBDb2xsZWN0aW9ucyBmb3IgUmVmZXJlbmNlc1xuXG59O1xuXG5pZiAodHlwZW9mIGN5dG9zY2FwZSAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gZXhwb3NlIHRvIGdsb2JhbCBjeXRvc2NhcGUgKGkuZS4gd2luZG93LmN5dG9zY2FwZSlcbiAgcmVnaXN0ZXIoY3l0b3NjYXBlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWdpc3RlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInBvcHBlci5qc1wiLFwiY29tbW9uanMyXCI6XCJwb3BwZXIuanNcIixcImFtZFwiOlwicG9wcGVyLmpzXCIsXCJyb290XCI6XCJQb3BwZXJcIn1cbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY29uc3QgeyBnZXRCb3VuZGluZ0JveCB9ID0gcmVxdWlyZSgnLi9iYicpO1xuXG4vLyBDcmVhdGUgYSBwb3BwZXIgcmVmZXJlbmNlIG9iamVjdFxuLy8gaHR0cHM6Ly9wb3BwZXIuanMub3JnL3BvcHBlci1kb2N1bWVudGF0aW9uLmh0bWwjcmVmZXJlbmNlT2JqZWN0XG5mdW5jdGlvbiBnZXRSZWYodGFyZ2V0LCBvcHRzKSB7XG4gIGxldCB7IHJlbmRlcmVkRGltZW5zaW9ucyB9ID0gb3B0cztcblxuICAvL0RlZmluZSBwb3BwZXIgcmVmZXJlbmNlIG9iamVjdCBhbmQgY3kgcmVmZXJlbmNlICBvYmplY3RcbiAgbGV0IHJlZk9iamVjdCA9IHtcbiAgICBnZXRCb3VuZGluZ0NsaWVudFJlY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGdldEJvdW5kaW5nQm94KHRhcmdldCwgb3B0cyk7XG4gICAgfSxcblxuICAgIGdldCBjbGllbnRXaWR0aCgpIHtcbiAgICAgIHJldHVybiByZW5kZXJlZERpbWVuc2lvbnModGFyZ2V0KS53O1xuICAgIH0sXG5cbiAgICBnZXQgY2xpZW50SGVpZ2h0KCkge1xuICAgICAgcmV0dXJuIHJlbmRlcmVkRGltZW5zaW9ucyh0YXJnZXQpLmg7XG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gcmVmT2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgZ2V0UmVmIH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVmLmpzIiwiY29uc3QgYXNzaWduID0gcmVxdWlyZSgnLi9hc3NpZ24nKTtcbmNvbnN0IHsgZ2V0UmVmIH0gPSByZXF1aXJlKCcuL3JlZicpO1xuY29uc3QgeyBnZXRDb250ZW50IH0gPSByZXF1aXJlKCcuL2NvbnRlbnQnKTtcblxuY29uc3QgcG9wcGVyRGVmYXVsdHMgPSB7fTtcblxuLy9GaXggUG9wcGVyLmpzIHdlYnBhY2sgaW1wb3J0IGNvbmZsaWN0IChVc2UgLmRlZmF1bHQgaWYgdXNpbmcgd2VicGFjaylcbmxldCBQb3BwZXIgPSByZXF1aXJlKCdwb3BwZXIuanMnKTtcbmxldCBFc21XZWJwYWNrUG9wcGVyID0gUG9wcGVyLmRlZmF1bHQ7XG5pZiAoRXNtV2VicGFja1BvcHBlciAhPSBudWxsICYmIEVzbVdlYnBhY2tQb3BwZXIuRGVmYXVsdHMgIT0gbnVsbCkge1xuICBQb3BwZXIgPSBQb3BwZXIuZGVmYXVsdDtcbn1cblxuLy8gQ3JlYXRlIGEgbmV3IHBvcHBlciBvYmplY3QgZm9yIGEgY29yZSBvciBlbGVtZW50IHRhcmdldFxuZnVuY3Rpb24gZ2V0UG9wcGVyKHRhcmdldCwgb3B0cykge1xuICBsZXQgcmVmT2JqZWN0ID0gZ2V0UmVmKHRhcmdldCwgb3B0cyk7XG4gIGxldCBjb250ZW50ID0gZ2V0Q29udGVudCh0YXJnZXQsIG9wdHMuY29udGVudCk7XG4gIGxldCBwb3BwZXJPcHRzID0gYXNzaWduKHt9LCBwb3BwZXJEZWZhdWx0cywgb3B0cy5wb3BwZXIpO1xuXG4gIHJldHVybiBuZXcgUG9wcGVyKHJlZk9iamVjdCwgY29udGVudCwgcG9wcGVyT3B0cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBnZXRQb3BwZXIgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wb3BwZXIuanMiLCJmdW5jdGlvbiBnZXRDb250ZW50KHRhcmdldCwgY29udGVudCkge1xuICBsZXQgY29udGVudE9iamVjdCA9IG51bGw7XG5cbiAgaWYgKHR5cGVvZiBjb250ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAvL0V4ZWN1dGUgZnVuY3Rpb24gaWYgdXNlciBvcHRlZCBmb3IgYSBkeWFuYW1pYyB0YXJnZXRcbiAgICBjb250ZW50T2JqZWN0ID0gY29udGVudCh0YXJnZXQpO1xuICB9IGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgIC8vVGFyZ2V0IG9wdGlvbiBpcyBhbiBIVE1MIGVsZW1lbnRcbiAgICByZXR1cm4gY29udGVudDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbiBub3QgY3JlYXRlIHBvcHBlciBmcm9tICd0YXJnZXQnIHdpdGggdW5rbm93biB0eXBlYCk7XG4gIH1cblxuICAvLyBDaGVjayB2YWxpZGl0eSBvZiBwYXJzZWQgdGFyZ2V0XG4gIGlmIChjb250ZW50T2JqZWN0ID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyAndGFyZ2V0JyBzcGVjaWZpZWQgdG8gY3JlYXRlIHBvcHBlcmApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb250ZW50T2JqZWN0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBnZXRDb250ZW50IH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC5qcyIsImZ1bmN0aW9uIGdldEJvdW5kaW5nQm94KHRhcmdldCwgb3B0cykge1xuICBsZXQgeyByZW5kZXJlZFBvc2l0aW9uLCBjeSwgcmVuZGVyZWREaW1lbnNpb25zIH0gPSBvcHRzO1xuICBsZXQgb2Zmc2V0ID0gY3kuY29udGFpbmVyKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGxldCBkaW1zID0gcmVuZGVyZWREaW1lbnNpb25zKHRhcmdldCk7XG4gIGxldCBwb3MgPSByZW5kZXJlZFBvc2l0aW9uKHRhcmdldCk7XG4gIGxldCBzY3JvbGxZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICBsZXQgc2Nyb2xsWCA9IHdpbmRvdy5wYWdlWE9mZnNldDtcblxuICByZXR1cm4ge1xuICAgIHRvcDogcG9zLnkgKyBvZmZzZXQudG9wICsgc2Nyb2xsWSxcbiAgICBsZWZ0OiBwb3MueCArIG9mZnNldC5sZWZ0ICsgc2Nyb2xsWCxcbiAgICByaWdodDogcG9zLnggKyBkaW1zLncgKyBvZmZzZXQubGVmdCArIHNjcm9sbFgsXG4gICAgYm90dG9tOiBwb3MueSArIGRpbXMuaCArIG9mZnNldC50b3AgKyBzY3JvbGxZLFxuICAgIHdpZHRoOiBkaW1zLncsXG4gICAgaGVpZ2h0OiBkaW1zLmhcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IGdldEJvdW5kaW5nQm94IH07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmIuanMiXSwic291cmNlUm9vdCI6IiJ9