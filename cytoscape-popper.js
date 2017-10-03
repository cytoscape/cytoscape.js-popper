(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapePopper"] = factory();
	else
		root["cytoscapePopper"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var popperRenderer = __webpack_require__(3);

//Create a popper object (This is for use on the core)
module.exports.core = function (userOptions) {
  //Get cytoscape object and container
  var cy = this;
  var container = cy.container();

  //Generate options and assign them on the scratchpad 
  var options = popperRenderer.createPopperOptionsObject(userOptions);
  cy.scratch('popper-opts', options.popper);
  cy.scratch('popper-target', options.target);

  //Create popper object
  var popper = popperRenderer.createPopperObject(cy);
  cy.scratch('popper', popper);

  return this;
};

//Create a popper object for  all elements in a collection
module.exports.collection = function (userOptions) {
  var elements = this;
  var cy = this.cy();
  var container = cy.container();

  //Loop over each element in the current collection
  elements.each(function (element, i) {
    //Create options object for current element
    var options = popperRenderer.createPopperOptionsObject(userOptions);

    //Store options and target in temp scratchpad
    element.scratch('popper-opts', options.popper || {});
    element.scratch('popper-target', options.target);

    //Create popper object
    var popper = popperRenderer.createPopperObject(element);
    element.scratch('popper', popper);
  });

  return this; // chainability
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Update popper position
module.exports.updatePopperObjectPosition = function (cyElement) {
    var popper = cyElement.scratch('popper');
    popper.scheduleUpdate();
    return popper;
};

//Return dimensions
module.exports.getPopperObjectDimensions = function (cyElement, isNode) {
    //Set Defaults
    var width = 3;
    var height = 3;

    //Overide with the outer-dimensions if the element is a node
    if (isNode) {
        width = cyElement.renderedOuterWidth();
        height = cyElement.renderedOuterHeight();
    }

    //Return a dimension object
    return { w: width, h: height };
};

//Return the bounding rectangle for the given element
module.exports.getPopperBoundingBox = function (cyElement, cy, isNode, dim) {
    var position;

    if (isNode) {
        position = cyElement.renderedPosition();
    } else {
        position = undefined;
    }

    var cyOffset = cy.container().getBoundingClientRect();

    //Exit if position is invalid
    if (!position || position.x == null || isNaN(position.x)) {
        return;
    }

    //Return the bounding  box
    return {
        top: position.y + cyOffset.top + window.pageYOffset,
        left: position.x + cyOffset.left + window.pageXOffset,
        right: position.x + dim.w + cyOffset.left + window.pageXOffset,
        bottom: position.y + dim.h + cyOffset.top + window.pageYOffset,
        width: dim.w,
        height: dim.h
    };
};

//Return Popper Target (The element to bind popper to)
module.exports.getPopperObjectTarget = function (cyElement, targetOpt) {
    var target = null;

    //If target option is invalid, return error
    if (!targetOpt) {
        throw "Error : NULL Target";
    }
    //Execute function if user opted for a dyanamic target
    else if (typeof targetOpt === 'function') {
            target = document.getElementById(targetOpt(cyElement));
        }
        //Treat target option as an ID if  user opted for a static target
        else if (typeof targetOpt === 'string') {
                target = document.getElementById(targetOpt.substr(1));
            } else {
                throw "Error : No Target";
            }

    //Check validity of parsed target
    if (target === null) {
        throw "Error : No Target";
    } else {
        return target;
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.12.5
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var nativeHints = ['native code', '[object MutationObserverConstructor]'];

/**
 * Determine if a function is implemented natively (as opposed to a polyfill).
 * @method
 * @memberof Popper.Utils
 * @argument {Function | undefined} fn the function to check
 * @returns {Boolean}
 */
var isNative = function isNative(fn) {
  return nativeHints.some(function (hint) {
    return (fn || '').toString().indexOf(hint) > -1;
  });
};

var isBrowser = typeof window !== 'undefined';
var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var scheduled = false;
  var i = 0;
  var elem = document.createElement('span');

  // MutationObserver provides a mechanism for scheduling microtasks, which
  // are scheduled *before* the next task. This gives us a way to debounce
  // a function but ensure it's called *before* the next paint.
  var observer = new MutationObserver(function () {
    fn();
    scheduled = false;
  });

  observer.observe(elem, { attributes: true });

  return function () {
    if (!scheduled) {
      scheduled = true;
      elem.setAttribute('x-index', i);
      i = i + 1; // don't use compund (+=) because it doesn't get optimized in V8
    }
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

// It's common for MutationObserver polyfills to be seen in the wild, however
// these rely on Mutation Events which only occur when an element is connected
// to the DOM. The algorithm used in this module does not use a connected element,
// and so we must ensure that a *native* MutationObserver is available.
var supportsNativeMutationObserver = isBrowser && isNative(window.MutationObserver);

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsNativeMutationObserver ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element || ['HTML', 'BODY', '#document'].indexOf(element.nodeName) !== -1) {
    return window.document.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  // NOTE: 1 DOM access here
  var offsetParent = element && element.offsetParent;
  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return window.document.documentElement;
  }

  // .offsetParent will return the closest TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return window.document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = window.document.documentElement;
    var scrollingElement = window.document.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return +styles['border' + sideA + 'Width'].split('px')[0] + +styles['border' + sideB + 'Width'].split('px')[0];
}

/**
 * Tells if you are running Internet Explorer 10
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean} isIE10
 */
var isIE10 = undefined;

var isIE10$1 = function isIE10$1() {
  if (isIE10 === undefined) {
    isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
  }
  return isIE10;
};

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE10$1() ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
}

function getWindowSizes() {
  var body = window.document.body;
  var html = window.document.documentElement;
  var computedStyle = isIE10$1() && window.getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var _extends = Object.assign || function (target) {
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

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  if (isIE10$1()) {
    try {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } catch (err) {}
  } else {
    rect = element.getBoundingClientRect();
  }

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var isIE10 = isIE10$1();
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = +styles.borderTopWidth.split('px')[0];
  var borderLeftWidth = +styles.borderLeftWidth.split('px')[0];

  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = +styles.marginTop.split('px')[0];
    var marginLeft = +styles.marginLeft.split('px')[0];

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var html = window.document.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = getScroll(html);
  var scrollLeft = getScroll(html, 'left');

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  return isFixed(getParentNode(element));
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  // NOTE: 1 DOM access here
  var boundaries = { top: 0, left: 0 };
  var offsetParent = findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(popper));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = window.document.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = window.document.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  boundaries.left += padding;
  boundaries.top += padding;
  boundaries.right -= padding;
  boundaries.bottom -= padding;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var commonOffsetParent = findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier.function) {
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier.function || modifier.fn;
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function _update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref3) {
    var name = _ref3.name,
        enabled = _ref3.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var _i = 0; _i < prefixes.length - 1; _i++) {
    var prefix = prefixes[_i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof window.document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroy the popper
 * @method
 * @memberof Popper
 */
function _destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.left = '';
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? window : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  window.addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function _enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  window.removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger onUpdate callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function _disableEventListeners() {
  if (this.state.eventsEnabled) {
    window.cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper.
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  // floor sides to avoid blurry text
  var offsets = {
    left: Math.floor(popper.left),
    top: Math.floor(popper.top),
    bottom: Math.floor(popper.bottom),
    right: Math.floor(popper.right)
  };

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    top = -offsetParentRect.height + offsets.bottom;
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    left = -offsetParentRect.width + offsets.right;
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref4) {
    var name = _ref4.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjuction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var popperMarginSide = getStyleComputedProperty(data.instance.popper, 'margin' + sideCapitalized).replace('px', '');
  var sideValue = center - getClientRect(data.offsets.popper)[side] - popperMarginSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = {};
  data.offsets.arrow[side] = Math.round(sideValue);
  data.offsets.arrow[altSide] = ''; // make sure to unset any eventual altSide value from the DOM node

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-right` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets2 = data.offsets,
      popper = _data$offsets2.popper,
      reference = _data$offsets2.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref5) {
  var offset = _ref5.offset;
  var placement = data.placement,
      _data$offsets3 = data.offsets,
      popper = _data$offsets3.popper,
      reference = _data$offsets3.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement);
  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return _defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return _defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets4 = data.offsets,
        reference = _data$offsets4.reference,
        popper = _data$offsets4.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: _defineProperty({}, side, reference[side]),
      end: _defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets5 = data.offsets,
      popper = _data$offsets5.popper,
      reference = _data$offsets5.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unitless, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the height.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * An scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper this makes sure the popper has always a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier, can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near eachothers
   * without leaving any gap between the two. Expecially useful when the arrow is
   * enabled and you want to assure it to point to its reference element.
   * It cares only about the first axis, you can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjuction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations).
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position,
     * the popper will never be placed outside of the defined boundaries
     * (except if keepTogether is enabled)
     */
    boundariesElement: 'viewport'
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define you own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the informations used by Popper.js
 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overriden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass as 3rd argument an object with the same
 * structure of this object, example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Whether events (resize, scroll) are initially enabled
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated, this callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods

var Popper = function () {
  /**
   * Create a new Popper.js instance
   * @class Popper
   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper.
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference.jquery ? reference[0] : reference;
    this.popper = popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  _createClass(Popper, [{
    key: 'update',
    value: function update() {
      return _update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      return _destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners() {
      return _enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners() {
      return _disableEventListeners.call(this);
    }

    /**
     * Schedule an update, it will run on the next UI update available
     * @method scheduleUpdate
     * @memberof Popper
     */

    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);

  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */

Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

exports.default = Popper;
//# sourceMappingURL=popper.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _popper = __webpack_require__(2);

var _popper2 = _interopRequireDefault(_popper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Include helper functions and Popper
var helper = __webpack_require__(1);


//Generate a options object to wrap the given user options
module.exports.createPopperOptionsObject = function (userOptions) {
    var options = Object.assign({}, userOptions);

    //If id is undefined, created a unique id based on time
    if (!userOptions.id) {
        options.id = 'cy-popper-target-' + (Date.now() + Math.round(Math.random() + 10000));
    }

    return options;
};

//Create a new popper object associated with a cytoscape element (Nodes or Edges)
module.exports.createPopperObject = function (cyElement) {
    //If popper object already exists, update its position
    if (cyElement.scratch('popper')) {
        return helper.updatePopperObjectPosition(cyElement);
    }
    //Otherwise create a new popper object
    else {
            //Determine element properties to determine hoe to draw popper object
            var isCy = cyElement.pan !== undefined && typeof cyElement.pan === 'function';
            var iscyElement = !isCy;
            var isNode = iscyElement && cyElement.isNode();
            var cy = isCy ? cyElement : cyElement.cy();

            //Get Demensions for popper (Set Default to 3,3)
            var dim = helper.getPopperObjectDimensions(cyElement, isNode);

            //Define popper object
            var refObject = {
                getBoundingClientRect: function getBoundingClientRect() {
                    return helper.getPopperBoundingBox(cyElement, cy, isNode, dim);
                },
                get clientWidth() {
                    return dim.w;
                },
                get clientHeight() {
                    return dim.h;
                }
            };

            //Get Values from scratchpad
            var popperOpts = cyElement.scratch('popper-opts');
            popperOpts.placement = popperOpts.placement || 'bottom';
            var targetOpt = cyElement.scratch('popper-target');
            var target = null;

            //Get target to bind popper to
            try {
                target = helper.getPopperObjectTarget(cyElement, targetOpt);
            } catch (e) {
                //Stop creating a popper
                return;;
            }

            //Create and return actual popper object
            var popper = new _popper2.default(refObject, target, popperOpts);
            return popper;
        }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Get dependencies
var impl = __webpack_require__(0);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  // register with cytoscape.js
  cytoscape('core', 'popper', impl.core); //Cytoscape Core
  cytoscape('collection', 'popper', impl.collection); //Cytoscape Collections
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape);
}

module.exports = register;

/***/ }),
/* 5 */
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


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhZWY1MmRlNDkxMmM5NjMyNDcwZiIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvcG9wcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL3JlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyJdLCJuYW1lcyI6WyJwb3BwZXJSZW5kZXJlciIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwiY29yZSIsInVzZXJPcHRpb25zIiwiY3kiLCJjb250YWluZXIiLCJvcHRpb25zIiwiY3JlYXRlUG9wcGVyT3B0aW9uc09iamVjdCIsInNjcmF0Y2giLCJwb3BwZXIiLCJ0YXJnZXQiLCJjcmVhdGVQb3BwZXJPYmplY3QiLCJjb2xsZWN0aW9uIiwiZWxlbWVudHMiLCJlYWNoIiwiZWxlbWVudCIsImkiLCJ1cGRhdGVQb3BwZXJPYmplY3RQb3NpdGlvbiIsImN5RWxlbWVudCIsInNjaGVkdWxlVXBkYXRlIiwiZ2V0UG9wcGVyT2JqZWN0RGltZW5zaW9ucyIsImlzTm9kZSIsIndpZHRoIiwiaGVpZ2h0IiwicmVuZGVyZWRPdXRlcldpZHRoIiwicmVuZGVyZWRPdXRlckhlaWdodCIsInciLCJoIiwiZ2V0UG9wcGVyQm91bmRpbmdCb3giLCJkaW0iLCJwb3NpdGlvbiIsInJlbmRlcmVkUG9zaXRpb24iLCJ1bmRlZmluZWQiLCJjeU9mZnNldCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIngiLCJpc05hTiIsInRvcCIsInkiLCJ3aW5kb3ciLCJwYWdlWU9mZnNldCIsImxlZnQiLCJwYWdlWE9mZnNldCIsInJpZ2h0IiwiYm90dG9tIiwiZ2V0UG9wcGVyT2JqZWN0VGFyZ2V0IiwidGFyZ2V0T3B0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN1YnN0ciIsIm5hdGl2ZUhpbnRzIiwiaXNOYXRpdmUiLCJzb21lIiwiZm4iLCJ0b1N0cmluZyIsImluZGV4T2YiLCJoaW50IiwiaXNCcm93c2VyIiwibG9uZ2VyVGltZW91dEJyb3dzZXJzIiwidGltZW91dER1cmF0aW9uIiwibGVuZ3RoIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwibWljcm90YXNrRGVib3VuY2UiLCJzY2hlZHVsZWQiLCJlbGVtIiwiY3JlYXRlRWxlbWVudCIsIm9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJhdHRyaWJ1dGVzIiwic2V0QXR0cmlidXRlIiwidGFza0RlYm91bmNlIiwic2V0VGltZW91dCIsInN1cHBvcnRzTmF0aXZlTXV0YXRpb25PYnNlcnZlciIsImRlYm91bmNlIiwiaXNGdW5jdGlvbiIsImZ1bmN0aW9uVG9DaGVjayIsImdldFR5cGUiLCJjYWxsIiwiZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5IiwicHJvcGVydHkiLCJub2RlVHlwZSIsImNzcyIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQYXJlbnROb2RlIiwibm9kZU5hbWUiLCJwYXJlbnROb2RlIiwiaG9zdCIsImdldFNjcm9sbFBhcmVudCIsImJvZHkiLCJvdmVyZmxvdyIsIm92ZXJmbG93WCIsIm92ZXJmbG93WSIsInRlc3QiLCJnZXRPZmZzZXRQYXJlbnQiLCJvZmZzZXRQYXJlbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJpc09mZnNldENvbnRhaW5lciIsImZpcnN0RWxlbWVudENoaWxkIiwiZ2V0Um9vdCIsIm5vZGUiLCJmaW5kQ29tbW9uT2Zmc2V0UGFyZW50IiwiZWxlbWVudDEiLCJlbGVtZW50MiIsIm9yZGVyIiwiY29tcGFyZURvY3VtZW50UG9zaXRpb24iLCJOb2RlIiwiRE9DVU1FTlRfUE9TSVRJT05fRk9MTE9XSU5HIiwic3RhcnQiLCJlbmQiLCJyYW5nZSIsImNyZWF0ZVJhbmdlIiwic2V0U3RhcnQiLCJzZXRFbmQiLCJjb21tb25BbmNlc3RvckNvbnRhaW5lciIsImNvbnRhaW5zIiwiZWxlbWVudDFyb290IiwiZ2V0U2Nyb2xsIiwic2lkZSIsInVwcGVyU2lkZSIsImh0bWwiLCJzY3JvbGxpbmdFbGVtZW50IiwiaW5jbHVkZVNjcm9sbCIsInJlY3QiLCJzdWJ0cmFjdCIsInNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJtb2RpZmllciIsImdldEJvcmRlcnNTaXplIiwic3R5bGVzIiwiYXhpcyIsInNpZGVBIiwic2lkZUIiLCJzcGxpdCIsImlzSUUxMCIsImlzSUUxMCQxIiwiYXBwVmVyc2lvbiIsImdldFNpemUiLCJjb21wdXRlZFN0eWxlIiwiTWF0aCIsIm1heCIsImdldFdpbmRvd1NpemVzIiwiX2V4dGVuZHMiLCJPYmplY3QiLCJhc3NpZ24iLCJhcmd1bWVudHMiLCJzb3VyY2UiLCJrZXkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImdldENsaWVudFJlY3QiLCJvZmZzZXRzIiwiZXJyIiwicmVzdWx0Iiwic2l6ZXMiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImhvcml6U2Nyb2xsYmFyIiwib2Zmc2V0V2lkdGgiLCJ2ZXJ0U2Nyb2xsYmFyIiwib2Zmc2V0SGVpZ2h0IiwiZ2V0T2Zmc2V0UmVjdFJlbGF0aXZlVG9BcmJpdHJhcnlOb2RlIiwiY2hpbGRyZW4iLCJwYXJlbnQiLCJpc0hUTUwiLCJjaGlsZHJlblJlY3QiLCJwYXJlbnRSZWN0Iiwic2Nyb2xsUGFyZW50IiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJMZWZ0V2lkdGgiLCJtYXJnaW5Ub3AiLCJtYXJnaW5MZWZ0IiwiZ2V0Vmlld3BvcnRPZmZzZXRSZWN0UmVsYXRpdmVUb0FydGJpdHJhcnlOb2RlIiwicmVsYXRpdmVPZmZzZXQiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJvZmZzZXQiLCJpc0ZpeGVkIiwiZ2V0Qm91bmRhcmllcyIsInJlZmVyZW5jZSIsInBhZGRpbmciLCJib3VuZGFyaWVzRWxlbWVudCIsImJvdW5kYXJpZXMiLCJib3VuZGFyaWVzTm9kZSIsImdldEFyZWEiLCJjb21wdXRlQXV0b1BsYWNlbWVudCIsInBsYWNlbWVudCIsInJlZlJlY3QiLCJyZWN0cyIsInNvcnRlZEFyZWFzIiwia2V5cyIsIm1hcCIsImFyZWEiLCJzb3J0IiwiYSIsImIiLCJmaWx0ZXJlZEFyZWFzIiwiZmlsdGVyIiwiY29tcHV0ZWRQbGFjZW1lbnQiLCJ2YXJpYXRpb24iLCJnZXRSZWZlcmVuY2VPZmZzZXRzIiwic3RhdGUiLCJjb21tb25PZmZzZXRQYXJlbnQiLCJnZXRPdXRlclNpemVzIiwicGFyc2VGbG9hdCIsIm1hcmdpbkJvdHRvbSIsIm1hcmdpblJpZ2h0IiwiZ2V0T3Bwb3NpdGVQbGFjZW1lbnQiLCJoYXNoIiwicmVwbGFjZSIsIm1hdGNoZWQiLCJnZXRQb3BwZXJPZmZzZXRzIiwicmVmZXJlbmNlT2Zmc2V0cyIsInBvcHBlclJlY3QiLCJwb3BwZXJPZmZzZXRzIiwiaXNIb3JpeiIsIm1haW5TaWRlIiwic2Vjb25kYXJ5U2lkZSIsIm1lYXN1cmVtZW50Iiwic2Vjb25kYXJ5TWVhc3VyZW1lbnQiLCJmaW5kIiwiYXJyIiwiY2hlY2siLCJBcnJheSIsImZpbmRJbmRleCIsInByb3AiLCJ2YWx1ZSIsImN1ciIsIm1hdGNoIiwib2JqIiwicnVuTW9kaWZpZXJzIiwibW9kaWZpZXJzIiwiZGF0YSIsImVuZHMiLCJtb2RpZmllcnNUb1J1biIsInNsaWNlIiwiZm9yRWFjaCIsImZ1bmN0aW9uIiwiY29uc29sZSIsIndhcm4iLCJlbmFibGVkIiwidXBkYXRlIiwiaXNEZXN0cm95ZWQiLCJpbnN0YW5jZSIsImFycm93U3R5bGVzIiwiZmxpcHBlZCIsImZsaXAiLCJvcmlnaW5hbFBsYWNlbWVudCIsImlzQ3JlYXRlZCIsIm9uQ3JlYXRlIiwib25VcGRhdGUiLCJpc01vZGlmaWVyRW5hYmxlZCIsIm1vZGlmaWVyTmFtZSIsIm5hbWUiLCJnZXRTdXBwb3J0ZWRQcm9wZXJ0eU5hbWUiLCJwcmVmaXhlcyIsInVwcGVyUHJvcCIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwicHJlZml4IiwidG9DaGVjayIsInN0eWxlIiwiZGVzdHJveSIsInJlbW92ZUF0dHJpYnV0ZSIsImRpc2FibGVFdmVudExpc3RlbmVycyIsInJlbW92ZU9uRGVzdHJveSIsInJlbW92ZUNoaWxkIiwiYXR0YWNoVG9TY3JvbGxQYXJlbnRzIiwiZXZlbnQiLCJjYWxsYmFjayIsInNjcm9sbFBhcmVudHMiLCJpc0JvZHkiLCJhZGRFdmVudExpc3RlbmVyIiwicGFzc2l2ZSIsInB1c2giLCJzZXR1cEV2ZW50TGlzdGVuZXJzIiwidXBkYXRlQm91bmQiLCJzY3JvbGxFbGVtZW50IiwiZXZlbnRzRW5hYmxlZCIsImVuYWJsZUV2ZW50TGlzdGVuZXJzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lcnMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJpc051bWVyaWMiLCJuIiwiaXNGaW5pdGUiLCJzZXRTdHlsZXMiLCJ1bml0Iiwic2V0QXR0cmlidXRlcyIsImFwcGx5U3R5bGUiLCJhcnJvd0VsZW1lbnQiLCJhcHBseVN0eWxlT25Mb2FkIiwibW9kaWZpZXJPcHRpb25zIiwiY29tcHV0ZVN0eWxlIiwibGVnYWN5R3B1QWNjZWxlcmF0aW9uT3B0aW9uIiwiZ3B1QWNjZWxlcmF0aW9uIiwib2Zmc2V0UGFyZW50UmVjdCIsImZsb29yIiwicHJlZml4ZWRQcm9wZXJ0eSIsIndpbGxDaGFuZ2UiLCJpbnZlcnRUb3AiLCJpbnZlcnRMZWZ0IiwiYXJyb3ciLCJpc01vZGlmaWVyUmVxdWlyZWQiLCJyZXF1ZXN0aW5nTmFtZSIsInJlcXVlc3RlZE5hbWUiLCJyZXF1ZXN0aW5nIiwiaXNSZXF1aXJlZCIsInJlcXVlc3RlZCIsInF1ZXJ5U2VsZWN0b3IiLCJpc1ZlcnRpY2FsIiwibGVuIiwic2lkZUNhcGl0YWxpemVkIiwidG9Mb3dlckNhc2UiLCJhbHRTaWRlIiwib3BTaWRlIiwiYXJyb3dFbGVtZW50U2l6ZSIsImNlbnRlciIsInBvcHBlck1hcmdpblNpZGUiLCJzaWRlVmFsdWUiLCJtaW4iLCJyb3VuZCIsImdldE9wcG9zaXRlVmFyaWF0aW9uIiwicGxhY2VtZW50cyIsInZhbGlkUGxhY2VtZW50cyIsImNsb2Nrd2lzZSIsImNvdW50ZXIiLCJpbmRleCIsImNvbmNhdCIsInJldmVyc2UiLCJCRUhBVklPUlMiLCJGTElQIiwiQ0xPQ0tXSVNFIiwiQ09VTlRFUkNMT0NLV0lTRSIsInBsYWNlbWVudE9wcG9zaXRlIiwiZmxpcE9yZGVyIiwiYmVoYXZpb3IiLCJzdGVwIiwicmVmT2Zmc2V0cyIsIm92ZXJsYXBzUmVmIiwib3ZlcmZsb3dzTGVmdCIsIm92ZXJmbG93c1JpZ2h0Iiwib3ZlcmZsb3dzVG9wIiwib3ZlcmZsb3dzQm90dG9tIiwib3ZlcmZsb3dzQm91bmRhcmllcyIsImZsaXBwZWRWYXJpYXRpb24iLCJmbGlwVmFyaWF0aW9ucyIsImtlZXBUb2dldGhlciIsInRvVmFsdWUiLCJzdHIiLCJzaXplIiwicGFyc2VPZmZzZXQiLCJiYXNlUGxhY2VtZW50IiwidXNlSGVpZ2h0IiwiZnJhZ21lbnRzIiwiZnJhZyIsInRyaW0iLCJkaXZpZGVyIiwic2VhcmNoIiwic3BsaXRSZWdleCIsIm9wcyIsIm9wIiwibWVyZ2VXaXRoUHJldmlvdXMiLCJyZWR1Y2UiLCJpbmRleDIiLCJwcmV2ZW50T3ZlcmZsb3ciLCJwcmlvcml0eSIsInByaW1hcnkiLCJlc2NhcGVXaXRoUmVmZXJlbmNlIiwic2Vjb25kYXJ5Iiwic2hpZnQiLCJzaGlmdHZhcmlhdGlvbiIsInNoaWZ0T2Zmc2V0cyIsImhpZGUiLCJib3VuZCIsImlubmVyIiwic3VidHJhY3RMZW5ndGgiLCJvbkxvYWQiLCJEZWZhdWx0cyIsIlBvcHBlciIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImJpbmQiLCJqcXVlcnkiLCJVdGlscyIsImdsb2JhbCIsIlBvcHBlclV0aWxzIiwiaGVscGVyIiwiaWQiLCJEYXRlIiwibm93IiwicmFuZG9tIiwiaXNDeSIsInBhbiIsImlzY3lFbGVtZW50IiwicmVmT2JqZWN0IiwicG9wcGVyT3B0cyIsImUiLCJpbXBsIiwicmVnaXN0ZXIiLCJjeXRvc2NhcGUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNoRUEsSUFBTUEsaUJBQWlCLG1CQUFBQyxDQUFRLENBQVIsQ0FBdkI7O0FBRUE7QUFDQUMsT0FBT0MsT0FBUCxDQUFlQyxJQUFmLEdBQXNCLFVBQVNDLFdBQVQsRUFBcUI7QUFDekM7QUFDQSxNQUFJQyxLQUFLLElBQVQ7QUFDQSxNQUFJQyxZQUFZRCxHQUFHQyxTQUFILEVBQWhCOztBQUVBO0FBQ0EsTUFBSUMsVUFBVVIsZUFBZVMseUJBQWYsQ0FBeUNKLFdBQXpDLENBQWQ7QUFDQUMsS0FBR0ksT0FBSCxDQUFXLGFBQVgsRUFBMEJGLFFBQVFHLE1BQWxDO0FBQ0FMLEtBQUdJLE9BQUgsQ0FBVyxlQUFYLEVBQTRCRixRQUFRSSxNQUFwQzs7QUFFQTtBQUNBLE1BQUlELFNBQVVYLGVBQWVhLGtCQUFmLENBQWtDUCxFQUFsQyxDQUFkO0FBQ0FBLEtBQUdJLE9BQUgsQ0FBVyxRQUFYLEVBQXFCQyxNQUFyQjs7QUFF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QVk1QixVQUFVVixPQUFWLENBQWtCLGVBQWxCLENBQWhCO0FBQ0EsZ0JBQUlFLFNBQVMsSUFBYjs7QUFFQTtBQUNBLGdCQUFHO0FBQ0hBLHlCQUFTeVgsT0FBT3RWLHFCQUFQLENBQTZCM0IsU0FBN0IsRUFBd0M0QixTQUF4QyxDQUFUO0FBQ0MsYUFGRCxDQUdBLE9BQU0rVixDQUFOLEVBQVE7QUFDSjtBQUNBLHVCQUFPO0FBQ1Y7O0FBRUQ7QUFDQSxnQkFBSXBZLFNBQVMscUJBQVdrWSxTQUFYLEVBQXNCalksTUFBdEIsRUFBOEJrWSxVQUE5QixDQUFiO0FBQ0EsbUJBQU9uWSxNQUFQO0FBQ0g7QUFFSixDQWpERCxDOzs7Ozs7Ozs7QUNsQkE7QUFDQSxJQUFNcVksT0FBTyxtQkFBQS9ZLENBQVEsQ0FBUixDQUFiOztBQUVBO0FBQ0EsSUFBSWdaLFdBQVcsU0FBWEEsUUFBVyxDQUFVQyxTQUFWLEVBQXFCO0FBQ2xDLE1BQUksQ0FBQ0EsU0FBTCxFQUFnQjtBQUFFO0FBQVMsR0FETyxDQUNOOztBQUU1QjtBQUNBQSxZQUFXLE1BQVgsRUFBbUIsUUFBbkIsRUFBNkJGLEtBQUs1WSxJQUFsQyxFQUprQyxDQUlTO0FBQzNDOFksWUFBVyxZQUFYLEVBQXlCLFFBQXpCLEVBQW1DRixLQUFLbFksVUFBeEMsRUFMa0MsQ0FLbUI7QUFFdEQsQ0FQRDs7QUFTQSxJQUFJLE9BQU9vWSxTQUFQLEtBQXFCLFdBQXpCLEVBQXNDO0FBQUU7QUFDdENELFdBQVVDLFNBQVY7QUFDRDs7QUFFRGhaLE9BQU9DLE9BQVAsR0FBaUI4WSxRQUFqQixDOzs7Ozs7QUNqQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUMiLCJmaWxlIjoiY3l0b3NjYXBlLXBvcHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImN5dG9zY2FwZVBvcHBlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjeXRvc2NhcGVQb3BwZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBhZWY1MmRlNDkxMmM5NjMyNDcwZiIsImNvbnN0IHBvcHBlclJlbmRlcmVyID0gcmVxdWlyZSgnLi9yZW5kZXIuanMnKTtcblxuLy9DcmVhdGUgYSBwb3BwZXIgb2JqZWN0IChUaGlzIGlzIGZvciB1c2Ugb24gdGhlIGNvcmUpXG5tb2R1bGUuZXhwb3J0cy5jb3JlID0gZnVuY3Rpb24odXNlck9wdGlvbnMpe1xuICAvL0dldCBjeXRvc2NhcGUgb2JqZWN0IGFuZCBjb250YWluZXJcbiAgdmFyIGN5ID0gdGhpcztcbiAgdmFyIGNvbnRhaW5lciA9IGN5LmNvbnRhaW5lcigpO1xuXG4gIC8vR2VuZXJhdGUgb3B0aW9ucyBhbmQgYXNzaWduIHRoZW0gb24gdGhlIHNjcmF0Y2hwYWQgXG4gIHZhciBvcHRpb25zID0gcG9wcGVyUmVuZGVyZXIuY3JlYXRlUG9wcGVyT3B0aW9uc09iamVjdCh1c2VyT3B0aW9ucyk7XG4gIGN5LnNjcmF0Y2goJ3BvcHBlci1vcHRzJywgb3B0aW9ucy5wb3BwZXIpO1xuICBjeS5zY3JhdGNoKCdwb3BwZXItdGFyZ2V0Jywgb3B0aW9ucy50YXJnZXQpO1xuXG4gIC8vQ3JlYXRlIHBvcHBlciBvYmplY3RcbiAgdmFyIHBvcHBlciAgPSBwb3BwZXJSZW5kZXJlci5jcmVhdGVQb3BwZXJPYmplY3QoY3kpO1xuICBjeS5zY3JhdGNoKCdwb3BwZXInLCBwb3BwZXIpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9DcmVhdGUgYSBwb3BwZXIgb2JqZWN0IGZvciAgYWxsIGVsZW1lbnRzIGluIGEgY29sbGVjdGlvblxubW9kdWxlLmV4cG9ydHMuY29sbGVjdGlvbiA9IGZ1bmN0aW9uICh1c2VyT3B0aW9ucykge1xuICB2YXIgZWxlbWVudHMgPSB0aGlzO1xuICB2YXIgY3kgPSB0aGlzLmN5KCk7XG4gIHZhciBjb250YWluZXIgPSBjeS5jb250YWluZXIoKTtcblxuICAvL0xvb3Agb3ZlciBlYWNoIGVsZW1lbnQgaW4gdGhlIGN1cnJlbnQgY29sbGVjdGlvblxuICBlbGVtZW50cy5lYWNoKGZ1bmN0aW9uIChlbGVtZW50LCBpKXtcbiAgICAgIC8vQ3JlYXRlIG9wdGlvbnMgb2JqZWN0IGZvciBjdXJyZW50IGVsZW1lbnRcbiAgICAgIHZhciBvcHRpb25zID0gcG9wcGVyUmVuZGVyZXIuY3JlYXRlUG9wcGVyT3B0aW9uc09iamVjdCh1c2VyT3B0aW9ucyk7XG5cbiAgICAgIC8vU3RvcmUgb3B0aW9ucyBhbmQgdGFyZ2V0IGluIHRlbXAgc2NyYXRjaHBhZFxuICAgICAgZWxlbWVudC5zY3JhdGNoKCdwb3BwZXItb3B0cycsIG9wdGlvbnMucG9wcGVyIHx8IHt9KTtcbiAgICAgIGVsZW1lbnQuc2NyYXRjaCgncG9wcGVyLXRhcmdldCcsIG9wdGlvbnMudGFyZ2V0KTtcblxuICAgICAgLy9DcmVhdGUgcG9wcGVyIG9iamVjdFxuICAgICAgdmFyIHBvcHBlciA9ICBwb3BwZXJSZW5kZXJlci5jcmVhdGVQb3BwZXJPYmplY3QoZWxlbWVudCk7XG4gICAgICBlbGVtZW50LnNjcmF0Y2goJ3BvcHBlcicsIHBvcHBlcik7XG4gIH0pO1xuXG4gIHJldHVybiB0aGlzOyAvLyBjaGFpbmFiaWxpdHlcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9pbmRleC5qcyIsIi8vVXBkYXRlIHBvcHBlciBwb3NpdGlvblxubW9kdWxlLmV4cG9ydHMudXBkYXRlUG9wcGVyT2JqZWN0UG9zaXRpb24gPSBmdW5jdGlvbiAoY3lFbGVtZW50KSB7XG4gICAgdmFyIHBvcHBlciA9IGN5RWxlbWVudC5zY3JhdGNoKCdwb3BwZXInKTtcbiAgICBwb3BwZXIuc2NoZWR1bGVVcGRhdGUoKTtcbiAgICByZXR1cm4gcG9wcGVyO1xufTtcblxuLy9SZXR1cm4gZGltZW5zaW9uc1xubW9kdWxlLmV4cG9ydHMuZ2V0UG9wcGVyT2JqZWN0RGltZW5zaW9ucyA9IGZ1bmN0aW9uIChjeUVsZW1lbnQsIGlzTm9kZSkge1xuICAgIC8vU2V0IERlZmF1bHRzXG4gICAgdmFyIHdpZHRoID0gMztcbiAgICB2YXIgaGVpZ2h0ID0gMztcblxuICAgIC8vT3ZlcmlkZSB3aXRoIHRoZSBvdXRlci1kaW1lbnNpb25zIGlmIHRoZSBlbGVtZW50IGlzIGEgbm9kZVxuICAgIGlmIChpc05vZGUpIHtcbiAgICAgICAgd2lkdGggPSBjeUVsZW1lbnQucmVuZGVyZWRPdXRlcldpZHRoKCk7XG4gICAgICAgIGhlaWdodCA9IGN5RWxlbWVudC5yZW5kZXJlZE91dGVySGVpZ2h0KCk7XG4gICAgfVxuXG4gICAgLy9SZXR1cm4gYSBkaW1lbnNpb24gb2JqZWN0XG4gICAgcmV0dXJuIHsgdzogd2lkdGgsIGg6IGhlaWdodCB9O1xufTtcblxuLy9SZXR1cm4gdGhlIGJvdW5kaW5nIHJlY3RhbmdsZSBmb3IgdGhlIGdpdmVuIGVsZW1lbnRcbm1vZHVsZS5leHBvcnRzLmdldFBvcHBlckJvdW5kaW5nQm94ID0gZnVuY3Rpb24gKGN5RWxlbWVudCwgY3ksIGlzTm9kZSwgZGltKSB7XG4gICAgdmFyIHBvc2l0aW9uO1xuXG4gICAgaWYgKGlzTm9kZSkge1xuICAgICAgICBwb3NpdGlvbiA9IGN5RWxlbWVudC5yZW5kZXJlZFBvc2l0aW9uKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBwb3NpdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB2YXIgY3lPZmZzZXQgPSBjeS5jb250YWluZXIoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vRXhpdCBpZiBwb3NpdGlvbiBpcyBpbnZhbGlkXG4gICAgaWYgKCFwb3NpdGlvbiB8fCBwb3NpdGlvbi54ID09IG51bGwgfHwgaXNOYU4ocG9zaXRpb24ueCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vUmV0dXJuIHRoZSBib3VuZGluZyAgYm94XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiBwb3NpdGlvbi55ICsgY3lPZmZzZXQudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0LFxuICAgICAgICBsZWZ0OiBwb3NpdGlvbi54ICsgY3lPZmZzZXQubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCxcbiAgICAgICAgcmlnaHQ6IHBvc2l0aW9uLnggKyBkaW0udyArIGN5T2Zmc2V0LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQsXG4gICAgICAgIGJvdHRvbTogcG9zaXRpb24ueSArIGRpbS5oICsgY3lPZmZzZXQudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0LFxuICAgICAgICB3aWR0aDogZGltLncsXG4gICAgICAgIGhlaWdodDogZGltLmgsXG4gICAgfTtcbn07XG5cbi8vUmV0dXJuIFBvcHBlciBUYXJnZXQgKFRoZSBlbGVtZW50IHRvIGJpbmQgcG9wcGVyIHRvKVxubW9kdWxlLmV4cG9ydHMuZ2V0UG9wcGVyT2JqZWN0VGFyZ2V0ID0gZnVuY3Rpb24gKGN5RWxlbWVudCwgdGFyZ2V0T3B0KSB7XG4gICAgdmFyIHRhcmdldCA9IG51bGw7XG5cbiAgICAvL0lmIHRhcmdldCBvcHRpb24gaXMgaW52YWxpZCwgcmV0dXJuIGVycm9yXG4gICAgaWYgKCEodGFyZ2V0T3B0KSkge1xuICAgICAgICB0aHJvdyBcIkVycm9yIDogTlVMTCBUYXJnZXRcIjtcbiAgICB9XG4gICAgLy9FeGVjdXRlIGZ1bmN0aW9uIGlmIHVzZXIgb3B0ZWQgZm9yIGEgZHlhbmFtaWMgdGFyZ2V0XG4gICAgZWxzZSBpZiAodHlwZW9mIHRhcmdldE9wdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRPcHQoY3lFbGVtZW50KSk7XG4gICAgfVxuICAgIC8vVHJlYXQgdGFyZ2V0IG9wdGlvbiBhcyBhbiBJRCBpZiAgdXNlciBvcHRlZCBmb3IgYSBzdGF0aWMgdGFyZ2V0XG4gICAgZWxzZSBpZiAodHlwZW9mIHRhcmdldE9wdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0T3B0LnN1YnN0cigxKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBcIkVycm9yIDogTm8gVGFyZ2V0XCI7XG4gICAgfVxuXG4gICAgLy9DaGVjayB2YWxpZGl0eSBvZiBwYXJzZWQgdGFyZ2V0XG4gICAgaWYgKHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBcIkVycm9yIDogTm8gVGFyZ2V0XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9oZWxwZXIuanMiLCIvKiohXG4gKiBAZmlsZU92ZXJ2aWV3IEtpY2thc3MgbGlicmFyeSB0byBjcmVhdGUgYW5kIHBsYWNlIHBvcHBlcnMgbmVhciB0aGVpciByZWZlcmVuY2UgZWxlbWVudHMuXG4gKiBAdmVyc2lvbiAxLjEyLjVcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgRmVkZXJpY28gWml2b2xvIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5jb25zdCBuYXRpdmVIaW50cyA9IFsnbmF0aXZlIGNvZGUnLCAnW29iamVjdCBNdXRhdGlvbk9ic2VydmVyQ29uc3RydWN0b3JdJ107XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgZnVuY3Rpb24gaXMgaW1wbGVtZW50ZWQgbmF0aXZlbHkgKGFzIG9wcG9zZWQgdG8gYSBwb2x5ZmlsbCkuXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0Z1bmN0aW9uIHwgdW5kZWZpbmVkfSBmbiB0aGUgZnVuY3Rpb24gdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG52YXIgaXNOYXRpdmUgPSAoZm4gPT4gbmF0aXZlSGludHMuc29tZShoaW50ID0+IChmbiB8fCAnJykudG9TdHJpbmcoKS5pbmRleE9mKGhpbnQpID4gLTEpKTtcblxuY29uc3QgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG5jb25zdCBsb25nZXJUaW1lb3V0QnJvd3NlcnMgPSBbJ0VkZ2UnLCAnVHJpZGVudCcsICdGaXJlZm94J107XG5sZXQgdGltZW91dER1cmF0aW9uID0gMDtcbmZvciAobGV0IGkgPSAwOyBpIDwgbG9uZ2VyVGltZW91dEJyb3dzZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gIGlmIChpc0Jyb3dzZXIgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKGxvbmdlclRpbWVvdXRCcm93c2Vyc1tpXSkgPj0gMCkge1xuICAgIHRpbWVvdXREdXJhdGlvbiA9IDE7XG4gICAgYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWljcm90YXNrRGVib3VuY2UoZm4pIHtcbiAgbGV0IHNjaGVkdWxlZCA9IGZhbHNlO1xuICBsZXQgaSA9IDA7XG4gIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgLy8gTXV0YXRpb25PYnNlcnZlciBwcm92aWRlcyBhIG1lY2hhbmlzbSBmb3Igc2NoZWR1bGluZyBtaWNyb3Rhc2tzLCB3aGljaFxuICAvLyBhcmUgc2NoZWR1bGVkICpiZWZvcmUqIHRoZSBuZXh0IHRhc2suIFRoaXMgZ2l2ZXMgdXMgYSB3YXkgdG8gZGVib3VuY2VcbiAgLy8gYSBmdW5jdGlvbiBidXQgZW5zdXJlIGl0J3MgY2FsbGVkICpiZWZvcmUqIHRoZSBuZXh0IHBhaW50LlxuICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICBmbigpO1xuICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICB9KTtcblxuICBvYnNlcnZlci5vYnNlcnZlKGVsZW0sIHsgYXR0cmlidXRlczogdHJ1ZSB9KTtcblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICBzY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ3gtaW5kZXgnLCBpKTtcbiAgICAgIGkgPSBpICsgMTsgLy8gZG9uJ3QgdXNlIGNvbXB1bmQgKCs9KSBiZWNhdXNlIGl0IGRvZXNuJ3QgZ2V0IG9wdGltaXplZCBpbiBWOFxuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gdGFza0RlYm91bmNlKGZuKSB7XG4gIGxldCBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgc2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgZm4oKTtcbiAgICAgIH0sIHRpbWVvdXREdXJhdGlvbik7XG4gICAgfVxuICB9O1xufVxuXG4vLyBJdCdzIGNvbW1vbiBmb3IgTXV0YXRpb25PYnNlcnZlciBwb2x5ZmlsbHMgdG8gYmUgc2VlbiBpbiB0aGUgd2lsZCwgaG93ZXZlclxuLy8gdGhlc2UgcmVseSBvbiBNdXRhdGlvbiBFdmVudHMgd2hpY2ggb25seSBvY2N1ciB3aGVuIGFuIGVsZW1lbnQgaXMgY29ubmVjdGVkXG4vLyB0byB0aGUgRE9NLiBUaGUgYWxnb3JpdGhtIHVzZWQgaW4gdGhpcyBtb2R1bGUgZG9lcyBub3QgdXNlIGEgY29ubmVjdGVkIGVsZW1lbnQsXG4vLyBhbmQgc28gd2UgbXVzdCBlbnN1cmUgdGhhdCBhICpuYXRpdmUqIE11dGF0aW9uT2JzZXJ2ZXIgaXMgYXZhaWxhYmxlLlxuY29uc3Qgc3VwcG9ydHNOYXRpdmVNdXRhdGlvbk9ic2VydmVyID0gaXNCcm93c2VyICYmIGlzTmF0aXZlKHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKTtcblxuLyoqXG4qIENyZWF0ZSBhIGRlYm91bmNlZCB2ZXJzaW9uIG9mIGEgbWV0aG9kLCB0aGF0J3MgYXN5bmNocm9ub3VzbHkgZGVmZXJyZWRcbiogYnV0IGNhbGxlZCBpbiB0aGUgbWluaW11bSB0aW1lIHBvc3NpYmxlLlxuKlxuKiBAbWV0aG9kXG4qIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiogQGFyZ3VtZW50IHtGdW5jdGlvbn0gZm5cbiogQHJldHVybnMge0Z1bmN0aW9ufVxuKi9cbnZhciBkZWJvdW5jZSA9IHN1cHBvcnRzTmF0aXZlTXV0YXRpb25PYnNlcnZlciA/IG1pY3JvdGFza0RlYm91bmNlIDogdGFza0RlYm91bmNlO1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiB2YXJpYWJsZSBpcyBhIGZ1bmN0aW9uXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0FueX0gZnVuY3Rpb25Ub0NoZWNrIC0gdmFyaWFibGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSBhbnN3ZXIgdG86IGlzIGEgZnVuY3Rpb24/XG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuY3Rpb25Ub0NoZWNrKSB7XG4gIGNvbnN0IGdldFR5cGUgPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uVG9DaGVjayAmJiBnZXRUeXBlLnRvU3RyaW5nLmNhbGwoZnVuY3Rpb25Ub0NoZWNrKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBHZXQgQ1NTIGNvbXB1dGVkIHByb3BlcnR5IG9mIHRoZSBnaXZlbiBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VlbWVudH0gZWxlbWVudFxuICogQGFyZ3VtZW50IHtTdHJpbmd9IHByb3BlcnR5XG4gKi9cbmZ1bmN0aW9uIGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShlbGVtZW50LCBwcm9wZXJ0eSkge1xuICBpZiAoZWxlbWVudC5ub2RlVHlwZSAhPT0gMSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICAvLyBOT1RFOiAxIERPTSBhY2Nlc3MgaGVyZVxuICBjb25zdCBjc3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKTtcbiAgcmV0dXJuIHByb3BlcnR5ID8gY3NzW3Byb3BlcnR5XSA6IGNzcztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwYXJlbnROb2RlIG9yIHRoZSBob3N0IG9mIHRoZSBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtFbGVtZW50fSBwYXJlbnRcbiAqL1xuZnVuY3Rpb24gZ2V0UGFyZW50Tm9kZShlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlIHx8IGVsZW1lbnQuaG9zdDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzY3JvbGxpbmcgcGFyZW50IG9mIHRoZSBnaXZlbiBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtFbGVtZW50fSBzY3JvbGwgcGFyZW50XG4gKi9cbmZ1bmN0aW9uIGdldFNjcm9sbFBhcmVudChlbGVtZW50KSB7XG4gIC8vIFJldHVybiBib2R5LCBgZ2V0U2Nyb2xsYCB3aWxsIHRha2UgY2FyZSB0byBnZXQgdGhlIGNvcnJlY3QgYHNjcm9sbFRvcGAgZnJvbSBpdFxuICBpZiAoIWVsZW1lbnQgfHwgWydIVE1MJywgJ0JPRFknLCAnI2RvY3VtZW50J10uaW5kZXhPZihlbGVtZW50Lm5vZGVOYW1lKSAhPT0gLTEpIHtcbiAgICByZXR1cm4gd2luZG93LmRvY3VtZW50LmJvZHk7XG4gIH1cblxuICAvLyBGaXJlZm94IHdhbnQgdXMgdG8gY2hlY2sgYC14YCBhbmQgYC15YCB2YXJpYXRpb25zIGFzIHdlbGxcbiAgY29uc3QgeyBvdmVyZmxvdywgb3ZlcmZsb3dYLCBvdmVyZmxvd1kgfSA9IGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShlbGVtZW50KTtcbiAgaWYgKC8oYXV0b3xzY3JvbGwpLy50ZXN0KG92ZXJmbG93ICsgb3ZlcmZsb3dZICsgb3ZlcmZsb3dYKSkge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcmV0dXJuIGdldFNjcm9sbFBhcmVudChnZXRQYXJlbnROb2RlKGVsZW1lbnQpKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBvZmZzZXQgcGFyZW50IG9mIHRoZSBnaXZlbiBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtFbGVtZW50fSBvZmZzZXQgcGFyZW50XG4gKi9cbmZ1bmN0aW9uIGdldE9mZnNldFBhcmVudChlbGVtZW50KSB7XG4gIC8vIE5PVEU6IDEgRE9NIGFjY2VzcyBoZXJlXG4gIGNvbnN0IG9mZnNldFBhcmVudCA9IGVsZW1lbnQgJiYgZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gIGNvbnN0IG5vZGVOYW1lID0gb2Zmc2V0UGFyZW50ICYmIG9mZnNldFBhcmVudC5ub2RlTmFtZTtcblxuICBpZiAoIW5vZGVOYW1lIHx8IG5vZGVOYW1lID09PSAnQk9EWScgfHwgbm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgIHJldHVybiB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB9XG5cbiAgLy8gLm9mZnNldFBhcmVudCB3aWxsIHJldHVybiB0aGUgY2xvc2VzdCBURCBvciBUQUJMRSBpbiBjYXNlXG4gIC8vIG5vIG9mZnNldFBhcmVudCBpcyBwcmVzZW50LCBJIGhhdGUgdGhpcyBqb2IuLi5cbiAgaWYgKFsnVEQnLCAnVEFCTEUnXS5pbmRleE9mKG9mZnNldFBhcmVudC5ub2RlTmFtZSkgIT09IC0xICYmIGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShvZmZzZXRQYXJlbnQsICdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgIHJldHVybiBnZXRPZmZzZXRQYXJlbnQob2Zmc2V0UGFyZW50KTtcbiAgfVxuXG4gIHJldHVybiBvZmZzZXRQYXJlbnQ7XG59XG5cbmZ1bmN0aW9uIGlzT2Zmc2V0Q29udGFpbmVyKGVsZW1lbnQpIHtcbiAgY29uc3QgeyBub2RlTmFtZSB9ID0gZWxlbWVudDtcbiAgaWYgKG5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIG5vZGVOYW1lID09PSAnSFRNTCcgfHwgZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpID09PSBlbGVtZW50O1xufVxuXG4vKipcbiAqIEZpbmRzIHRoZSByb290IG5vZGUgKGRvY3VtZW50LCBzaGFkb3dET00gcm9vdCkgb2YgdGhlIGdpdmVuIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gbm9kZVxuICogQHJldHVybnMge0VsZW1lbnR9IHJvb3Qgbm9kZVxuICovXG5mdW5jdGlvbiBnZXRSb290KG5vZGUpIHtcbiAgaWYgKG5vZGUucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgIHJldHVybiBnZXRSb290KG5vZGUucGFyZW50Tm9kZSk7XG4gIH1cblxuICByZXR1cm4gbm9kZTtcbn1cblxuLyoqXG4gKiBGaW5kcyB0aGUgb2Zmc2V0IHBhcmVudCBjb21tb24gdG8gdGhlIHR3byBwcm92aWRlZCBub2Rlc1xuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50MVxuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50MlxuICogQHJldHVybnMge0VsZW1lbnR9IGNvbW1vbiBvZmZzZXQgcGFyZW50XG4gKi9cbmZ1bmN0aW9uIGZpbmRDb21tb25PZmZzZXRQYXJlbnQoZWxlbWVudDEsIGVsZW1lbnQyKSB7XG4gIC8vIFRoaXMgY2hlY2sgaXMgbmVlZGVkIHRvIGF2b2lkIGVycm9ycyBpbiBjYXNlIG9uZSBvZiB0aGUgZWxlbWVudHMgaXNuJ3QgZGVmaW5lZCBmb3IgYW55IHJlYXNvblxuICBpZiAoIWVsZW1lbnQxIHx8ICFlbGVtZW50MS5ub2RlVHlwZSB8fCAhZWxlbWVudDIgfHwgIWVsZW1lbnQyLm5vZGVUeXBlKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH1cblxuICAvLyBIZXJlIHdlIG1ha2Ugc3VyZSB0byBnaXZlIGFzIFwic3RhcnRcIiB0aGUgZWxlbWVudCB0aGF0IGNvbWVzIGZpcnN0IGluIHRoZSBET01cbiAgY29uc3Qgb3JkZXIgPSBlbGVtZW50MS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihlbGVtZW50MikgJiBOb2RlLkRPQ1VNRU5UX1BPU0lUSU9OX0ZPTExPV0lORztcbiAgY29uc3Qgc3RhcnQgPSBvcmRlciA/IGVsZW1lbnQxIDogZWxlbWVudDI7XG4gIGNvbnN0IGVuZCA9IG9yZGVyID8gZWxlbWVudDIgOiBlbGVtZW50MTtcblxuICAvLyBHZXQgY29tbW9uIGFuY2VzdG9yIGNvbnRhaW5lclxuICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gIHJhbmdlLnNldFN0YXJ0KHN0YXJ0LCAwKTtcbiAgcmFuZ2Uuc2V0RW5kKGVuZCwgMCk7XG4gIGNvbnN0IHsgY29tbW9uQW5jZXN0b3JDb250YWluZXIgfSA9IHJhbmdlO1xuXG4gIC8vIEJvdGggbm9kZXMgYXJlIGluc2lkZSAjZG9jdW1lbnRcbiAgaWYgKGVsZW1lbnQxICE9PSBjb21tb25BbmNlc3RvckNvbnRhaW5lciAmJiBlbGVtZW50MiAhPT0gY29tbW9uQW5jZXN0b3JDb250YWluZXIgfHwgc3RhcnQuY29udGFpbnMoZW5kKSkge1xuICAgIGlmIChpc09mZnNldENvbnRhaW5lcihjb21tb25BbmNlc3RvckNvbnRhaW5lcikpIHtcbiAgICAgIHJldHVybiBjb21tb25BbmNlc3RvckNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0T2Zmc2V0UGFyZW50KGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyKTtcbiAgfVxuXG4gIC8vIG9uZSBvZiB0aGUgbm9kZXMgaXMgaW5zaWRlIHNoYWRvd0RPTSwgZmluZCB3aGljaCBvbmVcbiAgY29uc3QgZWxlbWVudDFyb290ID0gZ2V0Um9vdChlbGVtZW50MSk7XG4gIGlmIChlbGVtZW50MXJvb3QuaG9zdCkge1xuICAgIHJldHVybiBmaW5kQ29tbW9uT2Zmc2V0UGFyZW50KGVsZW1lbnQxcm9vdC5ob3N0LCBlbGVtZW50Mik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZpbmRDb21tb25PZmZzZXRQYXJlbnQoZWxlbWVudDEsIGdldFJvb3QoZWxlbWVudDIpLmhvc3QpO1xuICB9XG59XG5cbi8qKlxuICogR2V0cyB0aGUgc2Nyb2xsIHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50IGluIHRoZSBnaXZlbiBzaWRlICh0b3AgYW5kIGxlZnQpXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBzaWRlIGB0b3BgIG9yIGBsZWZ0YFxuICogQHJldHVybnMge251bWJlcn0gYW1vdW50IG9mIHNjcm9sbGVkIHBpeGVsc1xuICovXG5mdW5jdGlvbiBnZXRTY3JvbGwoZWxlbWVudCwgc2lkZSA9ICd0b3AnKSB7XG4gIGNvbnN0IHVwcGVyU2lkZSA9IHNpZGUgPT09ICd0b3AnID8gJ3Njcm9sbFRvcCcgOiAnc2Nyb2xsTGVmdCc7XG4gIGNvbnN0IG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZTtcblxuICBpZiAobm9kZU5hbWUgPT09ICdCT0RZJyB8fCBub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgY29uc3QgaHRtbCA9IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgY29uc3Qgc2Nyb2xsaW5nRWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IGh0bWw7XG4gICAgcmV0dXJuIHNjcm9sbGluZ0VsZW1lbnRbdXBwZXJTaWRlXTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50W3VwcGVyU2lkZV07XG59XG5cbi8qXG4gKiBTdW0gb3Igc3VidHJhY3QgdGhlIGVsZW1lbnQgc2Nyb2xsIHZhbHVlcyAobGVmdCBhbmQgdG9wKSBmcm9tIGEgZ2l2ZW4gcmVjdCBvYmplY3RcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWN0IC0gUmVjdCBvYmplY3QgeW91IHdhbnQgdG8gY2hhbmdlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gVGhlIGVsZW1lbnQgZnJvbSB0aGUgZnVuY3Rpb24gcmVhZHMgdGhlIHNjcm9sbCB2YWx1ZXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc3VidHJhY3QgLSBzZXQgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBzdWJ0cmFjdCB0aGUgc2Nyb2xsIHZhbHVlc1xuICogQHJldHVybiB7T2JqZWN0fSByZWN0IC0gVGhlIG1vZGlmaWVyIHJlY3Qgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGluY2x1ZGVTY3JvbGwocmVjdCwgZWxlbWVudCwgc3VidHJhY3QgPSBmYWxzZSkge1xuICBjb25zdCBzY3JvbGxUb3AgPSBnZXRTY3JvbGwoZWxlbWVudCwgJ3RvcCcpO1xuICBjb25zdCBzY3JvbGxMZWZ0ID0gZ2V0U2Nyb2xsKGVsZW1lbnQsICdsZWZ0Jyk7XG4gIGNvbnN0IG1vZGlmaWVyID0gc3VidHJhY3QgPyAtMSA6IDE7XG4gIHJlY3QudG9wICs9IHNjcm9sbFRvcCAqIG1vZGlmaWVyO1xuICByZWN0LmJvdHRvbSArPSBzY3JvbGxUb3AgKiBtb2RpZmllcjtcbiAgcmVjdC5sZWZ0ICs9IHNjcm9sbExlZnQgKiBtb2RpZmllcjtcbiAgcmVjdC5yaWdodCArPSBzY3JvbGxMZWZ0ICogbW9kaWZpZXI7XG4gIHJldHVybiByZWN0O1xufVxuXG4vKlxuICogSGVscGVyIHRvIGRldGVjdCBib3JkZXJzIG9mIGEgZ2l2ZW4gZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtDU1NTdHlsZURlY2xhcmF0aW9ufSBzdHlsZXNcbiAqIFJlc3VsdCBvZiBgZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5YCBvbiB0aGUgZ2l2ZW4gZWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IGF4aXMgLSBgeGAgb3IgYHlgXG4gKiBAcmV0dXJuIHtudW1iZXJ9IGJvcmRlcnMgLSBUaGUgYm9yZGVycyBzaXplIG9mIHRoZSBnaXZlbiBheGlzXG4gKi9cblxuZnVuY3Rpb24gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCBheGlzKSB7XG4gIGNvbnN0IHNpZGVBID0gYXhpcyA9PT0gJ3gnID8gJ0xlZnQnIDogJ1RvcCc7XG4gIGNvbnN0IHNpZGVCID0gc2lkZUEgPT09ICdMZWZ0JyA/ICdSaWdodCcgOiAnQm90dG9tJztcblxuICByZXR1cm4gK3N0eWxlc1tgYm9yZGVyJHtzaWRlQX1XaWR0aGBdLnNwbGl0KCdweCcpWzBdICsgK3N0eWxlc1tgYm9yZGVyJHtzaWRlQn1XaWR0aGBdLnNwbGl0KCdweCcpWzBdO1xufVxuXG4vKipcbiAqIFRlbGxzIGlmIHlvdSBhcmUgcnVubmluZyBJbnRlcm5ldCBFeHBsb3JlciAxMFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHJldHVybnMge0Jvb2xlYW59IGlzSUUxMFxuICovXG5sZXQgaXNJRTEwID0gdW5kZWZpbmVkO1xuXG52YXIgaXNJRTEwJDEgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChpc0lFMTAgPT09IHVuZGVmaW5lZCkge1xuICAgIGlzSUUxMCA9IG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoJ01TSUUgMTAnKSAhPT0gLTE7XG4gIH1cbiAgcmV0dXJuIGlzSUUxMDtcbn07XG5cbmZ1bmN0aW9uIGdldFNpemUoYXhpcywgYm9keSwgaHRtbCwgY29tcHV0ZWRTdHlsZSkge1xuICByZXR1cm4gTWF0aC5tYXgoYm9keVtgb2Zmc2V0JHtheGlzfWBdLCBib2R5W2BzY3JvbGwke2F4aXN9YF0sIGh0bWxbYGNsaWVudCR7YXhpc31gXSwgaHRtbFtgb2Zmc2V0JHtheGlzfWBdLCBodG1sW2BzY3JvbGwke2F4aXN9YF0sIGlzSUUxMCQxKCkgPyBodG1sW2BvZmZzZXQke2F4aXN9YF0gKyBjb21wdXRlZFN0eWxlW2BtYXJnaW4ke2F4aXMgPT09ICdIZWlnaHQnID8gJ1RvcCcgOiAnTGVmdCd9YF0gKyBjb21wdXRlZFN0eWxlW2BtYXJnaW4ke2F4aXMgPT09ICdIZWlnaHQnID8gJ0JvdHRvbScgOiAnUmlnaHQnfWBdIDogMCk7XG59XG5cbmZ1bmN0aW9uIGdldFdpbmRvd1NpemVzKCkge1xuICBjb25zdCBib2R5ID0gd2luZG93LmRvY3VtZW50LmJvZHk7XG4gIGNvbnN0IGh0bWwgPSB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gaXNJRTEwJDEoKSAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShodG1sKTtcblxuICByZXR1cm4ge1xuICAgIGhlaWdodDogZ2V0U2l6ZSgnSGVpZ2h0JywgYm9keSwgaHRtbCwgY29tcHV0ZWRTdHlsZSksXG4gICAgd2lkdGg6IGdldFNpemUoJ1dpZHRoJywgYm9keSwgaHRtbCwgY29tcHV0ZWRTdHlsZSlcbiAgfTtcbn1cblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbi8qKlxuICogR2l2ZW4gZWxlbWVudCBvZmZzZXRzLCBnZW5lcmF0ZSBhbiBvdXRwdXQgc2ltaWxhciB0byBnZXRCb3VuZGluZ0NsaWVudFJlY3RcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvZmZzZXRzXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBDbGllbnRSZWN0IGxpa2Ugb3V0cHV0XG4gKi9cbmZ1bmN0aW9uIGdldENsaWVudFJlY3Qob2Zmc2V0cykge1xuICByZXR1cm4gX2V4dGVuZHMoe30sIG9mZnNldHMsIHtcbiAgICByaWdodDogb2Zmc2V0cy5sZWZ0ICsgb2Zmc2V0cy53aWR0aCxcbiAgICBib3R0b206IG9mZnNldHMudG9wICsgb2Zmc2V0cy5oZWlnaHRcbiAgfSk7XG59XG5cbi8qKlxuICogR2V0IGJvdW5kaW5nIGNsaWVudCByZWN0IG9mIGdpdmVuIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge09iamVjdH0gY2xpZW50IHJlY3RcbiAqL1xuZnVuY3Rpb24gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQpIHtcbiAgbGV0IHJlY3QgPSB7fTtcblxuICAvLyBJRTEwIDEwIEZJWDogUGxlYXNlLCBkb24ndCBhc2ssIHRoZSBlbGVtZW50IGlzbid0XG4gIC8vIGNvbnNpZGVyZWQgaW4gRE9NIGluIHNvbWUgY2lyY3Vtc3RhbmNlcy4uLlxuICAvLyBUaGlzIGlzbid0IHJlcHJvZHVjaWJsZSBpbiBJRTEwIGNvbXBhdGliaWxpdHkgbW9kZSBvZiBJRTExXG4gIGlmIChpc0lFMTAkMSgpKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gZ2V0U2Nyb2xsKGVsZW1lbnQsICd0b3AnKTtcbiAgICAgIGNvbnN0IHNjcm9sbExlZnQgPSBnZXRTY3JvbGwoZWxlbWVudCwgJ2xlZnQnKTtcbiAgICAgIHJlY3QudG9wICs9IHNjcm9sbFRvcDtcbiAgICAgIHJlY3QubGVmdCArPSBzY3JvbGxMZWZ0O1xuICAgICAgcmVjdC5ib3R0b20gKz0gc2Nyb2xsVG9wO1xuICAgICAgcmVjdC5yaWdodCArPSBzY3JvbGxMZWZ0O1xuICAgIH0gY2F0Y2ggKGVycikge31cbiAgfSBlbHNlIHtcbiAgICByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICBsZWZ0OiByZWN0LmxlZnQsXG4gICAgdG9wOiByZWN0LnRvcCxcbiAgICB3aWR0aDogcmVjdC5yaWdodCAtIHJlY3QubGVmdCxcbiAgICBoZWlnaHQ6IHJlY3QuYm90dG9tIC0gcmVjdC50b3BcbiAgfTtcblxuICAvLyBzdWJ0cmFjdCBzY3JvbGxiYXIgc2l6ZSBmcm9tIHNpemVzXG4gIGNvbnN0IHNpemVzID0gZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnID8gZ2V0V2luZG93U2l6ZXMoKSA6IHt9O1xuICBjb25zdCB3aWR0aCA9IHNpemVzLndpZHRoIHx8IGVsZW1lbnQuY2xpZW50V2lkdGggfHwgcmVzdWx0LnJpZ2h0IC0gcmVzdWx0LmxlZnQ7XG4gIGNvbnN0IGhlaWdodCA9IHNpemVzLmhlaWdodCB8fCBlbGVtZW50LmNsaWVudEhlaWdodCB8fCByZXN1bHQuYm90dG9tIC0gcmVzdWx0LnRvcDtcblxuICBsZXQgaG9yaXpTY3JvbGxiYXIgPSBlbGVtZW50Lm9mZnNldFdpZHRoIC0gd2lkdGg7XG4gIGxldCB2ZXJ0U2Nyb2xsYmFyID0gZWxlbWVudC5vZmZzZXRIZWlnaHQgLSBoZWlnaHQ7XG5cbiAgLy8gaWYgYW4gaHlwb3RoZXRpY2FsIHNjcm9sbGJhciBpcyBkZXRlY3RlZCwgd2UgbXVzdCBiZSBzdXJlIGl0J3Mgbm90IGEgYGJvcmRlcmBcbiAgLy8gd2UgbWFrZSB0aGlzIGNoZWNrIGNvbmRpdGlvbmFsIGZvciBwZXJmb3JtYW5jZSByZWFzb25zXG4gIGlmIChob3JpelNjcm9sbGJhciB8fCB2ZXJ0U2Nyb2xsYmFyKSB7XG4gICAgY29uc3Qgc3R5bGVzID0gZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsZW1lbnQpO1xuICAgIGhvcml6U2Nyb2xsYmFyIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3gnKTtcbiAgICB2ZXJ0U2Nyb2xsYmFyIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3knKTtcblxuICAgIHJlc3VsdC53aWR0aCAtPSBob3JpelNjcm9sbGJhcjtcbiAgICByZXN1bHQuaGVpZ2h0IC09IHZlcnRTY3JvbGxiYXI7XG4gIH1cblxuICByZXR1cm4gZ2V0Q2xpZW50UmVjdChyZXN1bHQpO1xufVxuXG5mdW5jdGlvbiBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUoY2hpbGRyZW4sIHBhcmVudCkge1xuICBjb25zdCBpc0lFMTAgPSBpc0lFMTAkMSgpO1xuICBjb25zdCBpc0hUTUwgPSBwYXJlbnQubm9kZU5hbWUgPT09ICdIVE1MJztcbiAgY29uc3QgY2hpbGRyZW5SZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGNoaWxkcmVuKTtcbiAgY29uc3QgcGFyZW50UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChwYXJlbnQpO1xuICBjb25zdCBzY3JvbGxQYXJlbnQgPSBnZXRTY3JvbGxQYXJlbnQoY2hpbGRyZW4pO1xuXG4gIGNvbnN0IHN0eWxlcyA9IGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShwYXJlbnQpO1xuICBjb25zdCBib3JkZXJUb3BXaWR0aCA9ICtzdHlsZXMuYm9yZGVyVG9wV2lkdGguc3BsaXQoJ3B4JylbMF07XG4gIGNvbnN0IGJvcmRlckxlZnRXaWR0aCA9ICtzdHlsZXMuYm9yZGVyTGVmdFdpZHRoLnNwbGl0KCdweCcpWzBdO1xuXG4gIGxldCBvZmZzZXRzID0gZ2V0Q2xpZW50UmVjdCh7XG4gICAgdG9wOiBjaGlsZHJlblJlY3QudG9wIC0gcGFyZW50UmVjdC50b3AgLSBib3JkZXJUb3BXaWR0aCxcbiAgICBsZWZ0OiBjaGlsZHJlblJlY3QubGVmdCAtIHBhcmVudFJlY3QubGVmdCAtIGJvcmRlckxlZnRXaWR0aCxcbiAgICB3aWR0aDogY2hpbGRyZW5SZWN0LndpZHRoLFxuICAgIGhlaWdodDogY2hpbGRyZW5SZWN0LmhlaWdodFxuICB9KTtcbiAgb2Zmc2V0cy5tYXJnaW5Ub3AgPSAwO1xuICBvZmZzZXRzLm1hcmdpbkxlZnQgPSAwO1xuXG4gIC8vIFN1YnRyYWN0IG1hcmdpbnMgb2YgZG9jdW1lbnRFbGVtZW50IGluIGNhc2UgaXQncyBiZWluZyB1c2VkIGFzIHBhcmVudFxuICAvLyB3ZSBkbyB0aGlzIG9ubHkgb24gSFRNTCBiZWNhdXNlIGl0J3MgdGhlIG9ubHkgZWxlbWVudCB0aGF0IGJlaGF2ZXNcbiAgLy8gZGlmZmVyZW50bHkgd2hlbiBtYXJnaW5zIGFyZSBhcHBsaWVkIHRvIGl0LiBUaGUgbWFyZ2lucyBhcmUgaW5jbHVkZWQgaW5cbiAgLy8gdGhlIGJveCBvZiB0aGUgZG9jdW1lbnRFbGVtZW50LCBpbiB0aGUgb3RoZXIgY2FzZXMgbm90LlxuICBpZiAoIWlzSUUxMCAmJiBpc0hUTUwpIHtcbiAgICBjb25zdCBtYXJnaW5Ub3AgPSArc3R5bGVzLm1hcmdpblRvcC5zcGxpdCgncHgnKVswXTtcbiAgICBjb25zdCBtYXJnaW5MZWZ0ID0gK3N0eWxlcy5tYXJnaW5MZWZ0LnNwbGl0KCdweCcpWzBdO1xuXG4gICAgb2Zmc2V0cy50b3AgLT0gYm9yZGVyVG9wV2lkdGggLSBtYXJnaW5Ub3A7XG4gICAgb2Zmc2V0cy5ib3R0b20gLT0gYm9yZGVyVG9wV2lkdGggLSBtYXJnaW5Ub3A7XG4gICAgb2Zmc2V0cy5sZWZ0IC09IGJvcmRlckxlZnRXaWR0aCAtIG1hcmdpbkxlZnQ7XG4gICAgb2Zmc2V0cy5yaWdodCAtPSBib3JkZXJMZWZ0V2lkdGggLSBtYXJnaW5MZWZ0O1xuXG4gICAgLy8gQXR0YWNoIG1hcmdpblRvcCBhbmQgbWFyZ2luTGVmdCBiZWNhdXNlIGluIHNvbWUgY2lyY3Vtc3RhbmNlcyB3ZSBtYXkgbmVlZCB0aGVtXG4gICAgb2Zmc2V0cy5tYXJnaW5Ub3AgPSBtYXJnaW5Ub3A7XG4gICAgb2Zmc2V0cy5tYXJnaW5MZWZ0ID0gbWFyZ2luTGVmdDtcbiAgfVxuXG4gIGlmIChpc0lFMTAgPyBwYXJlbnQuY29udGFpbnMoc2Nyb2xsUGFyZW50KSA6IHBhcmVudCA9PT0gc2Nyb2xsUGFyZW50ICYmIHNjcm9sbFBhcmVudC5ub2RlTmFtZSAhPT0gJ0JPRFknKSB7XG4gICAgb2Zmc2V0cyA9IGluY2x1ZGVTY3JvbGwob2Zmc2V0cywgcGFyZW50KTtcbiAgfVxuXG4gIHJldHVybiBvZmZzZXRzO1xufVxuXG5mdW5jdGlvbiBnZXRWaWV3cG9ydE9mZnNldFJlY3RSZWxhdGl2ZVRvQXJ0Yml0cmFyeU5vZGUoZWxlbWVudCkge1xuICBjb25zdCBodG1sID0gd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgY29uc3QgcmVsYXRpdmVPZmZzZXQgPSBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUoZWxlbWVudCwgaHRtbCk7XG4gIGNvbnN0IHdpZHRoID0gTWF0aC5tYXgoaHRtbC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG4gIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KGh0bWwuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCk7XG5cbiAgY29uc3Qgc2Nyb2xsVG9wID0gZ2V0U2Nyb2xsKGh0bWwpO1xuICBjb25zdCBzY3JvbGxMZWZ0ID0gZ2V0U2Nyb2xsKGh0bWwsICdsZWZ0Jyk7XG5cbiAgY29uc3Qgb2Zmc2V0ID0ge1xuICAgIHRvcDogc2Nyb2xsVG9wIC0gcmVsYXRpdmVPZmZzZXQudG9wICsgcmVsYXRpdmVPZmZzZXQubWFyZ2luVG9wLFxuICAgIGxlZnQ6IHNjcm9sbExlZnQgLSByZWxhdGl2ZU9mZnNldC5sZWZ0ICsgcmVsYXRpdmVPZmZzZXQubWFyZ2luTGVmdCxcbiAgICB3aWR0aCxcbiAgICBoZWlnaHRcbiAgfTtcblxuICByZXR1cm4gZ2V0Q2xpZW50UmVjdChvZmZzZXQpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiBlbGVtZW50IGlzIGZpeGVkIG9yIGlzIGluc2lkZSBhIGZpeGVkIHBhcmVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGN1c3RvbUNvbnRhaW5lclxuICogQHJldHVybnMge0Jvb2xlYW59IGFuc3dlciB0byBcImlzRml4ZWQ/XCJcbiAqL1xuZnVuY3Rpb24gaXNGaXhlZChlbGVtZW50KSB7XG4gIGNvbnN0IG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZTtcbiAgaWYgKG5vZGVOYW1lID09PSAnQk9EWScgfHwgbm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsZW1lbnQsICdwb3NpdGlvbicpID09PSAnZml4ZWQnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGlzRml4ZWQoZ2V0UGFyZW50Tm9kZShlbGVtZW50KSk7XG59XG5cbi8qKlxuICogQ29tcHV0ZWQgdGhlIGJvdW5kYXJpZXMgbGltaXRzIGFuZCByZXR1cm4gdGhlbVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcG9wcGVyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByZWZlcmVuY2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBwYWRkaW5nXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBib3VuZGFyaWVzRWxlbWVudCAtIEVsZW1lbnQgdXNlZCB0byBkZWZpbmUgdGhlIGJvdW5kYXJpZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9IENvb3JkaW5hdGVzIG9mIHRoZSBib3VuZGFyaWVzXG4gKi9cbmZ1bmN0aW9uIGdldEJvdW5kYXJpZXMocG9wcGVyLCByZWZlcmVuY2UsIHBhZGRpbmcsIGJvdW5kYXJpZXNFbGVtZW50KSB7XG4gIC8vIE5PVEU6IDEgRE9NIGFjY2VzcyBoZXJlXG4gIGxldCBib3VuZGFyaWVzID0geyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgY29uc3Qgb2Zmc2V0UGFyZW50ID0gZmluZENvbW1vbk9mZnNldFBhcmVudChwb3BwZXIsIHJlZmVyZW5jZSk7XG5cbiAgLy8gSGFuZGxlIHZpZXdwb3J0IGNhc2VcbiAgaWYgKGJvdW5kYXJpZXNFbGVtZW50ID09PSAndmlld3BvcnQnKSB7XG4gICAgYm91bmRhcmllcyA9IGdldFZpZXdwb3J0T2Zmc2V0UmVjdFJlbGF0aXZlVG9BcnRiaXRyYXJ5Tm9kZShvZmZzZXRQYXJlbnQpO1xuICB9IGVsc2Uge1xuICAgIC8vIEhhbmRsZSBvdGhlciBjYXNlcyBiYXNlZCBvbiBET00gZWxlbWVudCB1c2VkIGFzIGJvdW5kYXJpZXNcbiAgICBsZXQgYm91bmRhcmllc05vZGU7XG4gICAgaWYgKGJvdW5kYXJpZXNFbGVtZW50ID09PSAnc2Nyb2xsUGFyZW50Jykge1xuICAgICAgYm91bmRhcmllc05vZGUgPSBnZXRTY3JvbGxQYXJlbnQoZ2V0UGFyZW50Tm9kZShwb3BwZXIpKTtcbiAgICAgIGlmIChib3VuZGFyaWVzTm9kZS5ub2RlTmFtZSA9PT0gJ0JPRFknKSB7XG4gICAgICAgIGJvdW5kYXJpZXNOb2RlID0gd2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGJvdW5kYXJpZXNFbGVtZW50ID09PSAnd2luZG93Jykge1xuICAgICAgYm91bmRhcmllc05vZGUgPSB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBib3VuZGFyaWVzTm9kZSA9IGJvdW5kYXJpZXNFbGVtZW50O1xuICAgIH1cblxuICAgIGNvbnN0IG9mZnNldHMgPSBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUoYm91bmRhcmllc05vZGUsIG9mZnNldFBhcmVudCk7XG5cbiAgICAvLyBJbiBjYXNlIG9mIEhUTUwsIHdlIG5lZWQgYSBkaWZmZXJlbnQgY29tcHV0YXRpb25cbiAgICBpZiAoYm91bmRhcmllc05vZGUubm9kZU5hbWUgPT09ICdIVE1MJyAmJiAhaXNGaXhlZChvZmZzZXRQYXJlbnQpKSB7XG4gICAgICBjb25zdCB7IGhlaWdodCwgd2lkdGggfSA9IGdldFdpbmRvd1NpemVzKCk7XG4gICAgICBib3VuZGFyaWVzLnRvcCArPSBvZmZzZXRzLnRvcCAtIG9mZnNldHMubWFyZ2luVG9wO1xuICAgICAgYm91bmRhcmllcy5ib3R0b20gPSBoZWlnaHQgKyBvZmZzZXRzLnRvcDtcbiAgICAgIGJvdW5kYXJpZXMubGVmdCArPSBvZmZzZXRzLmxlZnQgLSBvZmZzZXRzLm1hcmdpbkxlZnQ7XG4gICAgICBib3VuZGFyaWVzLnJpZ2h0ID0gd2lkdGggKyBvZmZzZXRzLmxlZnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvciBhbGwgdGhlIG90aGVyIERPTSBlbGVtZW50cywgdGhpcyBvbmUgaXMgZ29vZFxuICAgICAgYm91bmRhcmllcyA9IG9mZnNldHM7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHBhZGRpbmdzXG4gIGJvdW5kYXJpZXMubGVmdCArPSBwYWRkaW5nO1xuICBib3VuZGFyaWVzLnRvcCArPSBwYWRkaW5nO1xuICBib3VuZGFyaWVzLnJpZ2h0IC09IHBhZGRpbmc7XG4gIGJvdW5kYXJpZXMuYm90dG9tIC09IHBhZGRpbmc7XG5cbiAgcmV0dXJuIGJvdW5kYXJpZXM7XG59XG5cbmZ1bmN0aW9uIGdldEFyZWEoeyB3aWR0aCwgaGVpZ2h0IH0pIHtcbiAgcmV0dXJuIHdpZHRoICogaGVpZ2h0O1xufVxuXG4vKipcbiAqIFV0aWxpdHkgdXNlZCB0byB0cmFuc2Zvcm0gdGhlIGBhdXRvYCBwbGFjZW1lbnQgdG8gdGhlIHBsYWNlbWVudCB3aXRoIG1vcmVcbiAqIGF2YWlsYWJsZSBzcGFjZS5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSB1cGRhdGUgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVBdXRvUGxhY2VtZW50KHBsYWNlbWVudCwgcmVmUmVjdCwgcG9wcGVyLCByZWZlcmVuY2UsIGJvdW5kYXJpZXNFbGVtZW50LCBwYWRkaW5nID0gMCkge1xuICBpZiAocGxhY2VtZW50LmluZGV4T2YoJ2F1dG8nKSA9PT0gLTEpIHtcbiAgICByZXR1cm4gcGxhY2VtZW50O1xuICB9XG5cbiAgY29uc3QgYm91bmRhcmllcyA9IGdldEJvdW5kYXJpZXMocG9wcGVyLCByZWZlcmVuY2UsIHBhZGRpbmcsIGJvdW5kYXJpZXNFbGVtZW50KTtcblxuICBjb25zdCByZWN0cyA9IHtcbiAgICB0b3A6IHtcbiAgICAgIHdpZHRoOiBib3VuZGFyaWVzLndpZHRoLFxuICAgICAgaGVpZ2h0OiByZWZSZWN0LnRvcCAtIGJvdW5kYXJpZXMudG9wXG4gICAgfSxcbiAgICByaWdodDoge1xuICAgICAgd2lkdGg6IGJvdW5kYXJpZXMucmlnaHQgLSByZWZSZWN0LnJpZ2h0LFxuICAgICAgaGVpZ2h0OiBib3VuZGFyaWVzLmhlaWdodFxuICAgIH0sXG4gICAgYm90dG9tOiB7XG4gICAgICB3aWR0aDogYm91bmRhcmllcy53aWR0aCxcbiAgICAgIGhlaWdodDogYm91bmRhcmllcy5ib3R0b20gLSByZWZSZWN0LmJvdHRvbVxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgd2lkdGg6IHJlZlJlY3QubGVmdCAtIGJvdW5kYXJpZXMubGVmdCxcbiAgICAgIGhlaWdodDogYm91bmRhcmllcy5oZWlnaHRcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc29ydGVkQXJlYXMgPSBPYmplY3Qua2V5cyhyZWN0cykubWFwKGtleSA9PiBfZXh0ZW5kcyh7XG4gICAga2V5XG4gIH0sIHJlY3RzW2tleV0sIHtcbiAgICBhcmVhOiBnZXRBcmVhKHJlY3RzW2tleV0pXG4gIH0pKS5zb3J0KChhLCBiKSA9PiBiLmFyZWEgLSBhLmFyZWEpO1xuXG4gIGNvbnN0IGZpbHRlcmVkQXJlYXMgPSBzb3J0ZWRBcmVhcy5maWx0ZXIoKHsgd2lkdGgsIGhlaWdodCB9KSA9PiB3aWR0aCA+PSBwb3BwZXIuY2xpZW50V2lkdGggJiYgaGVpZ2h0ID49IHBvcHBlci5jbGllbnRIZWlnaHQpO1xuXG4gIGNvbnN0IGNvbXB1dGVkUGxhY2VtZW50ID0gZmlsdGVyZWRBcmVhcy5sZW5ndGggPiAwID8gZmlsdGVyZWRBcmVhc1swXS5rZXkgOiBzb3J0ZWRBcmVhc1swXS5rZXk7XG5cbiAgY29uc3QgdmFyaWF0aW9uID0gcGxhY2VtZW50LnNwbGl0KCctJylbMV07XG5cbiAgcmV0dXJuIGNvbXB1dGVkUGxhY2VtZW50ICsgKHZhcmlhdGlvbiA/IGAtJHt2YXJpYXRpb259YCA6ICcnKTtcbn1cblxuLyoqXG4gKiBHZXQgb2Zmc2V0cyB0byB0aGUgcmVmZXJlbmNlIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtFbGVtZW50fSBwb3BwZXIgLSB0aGUgcG9wcGVyIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gcmVmZXJlbmNlIC0gdGhlIHJlZmVyZW5jZSBlbGVtZW50ICh0aGUgcG9wcGVyIHdpbGwgYmUgcmVsYXRpdmUgdG8gdGhpcylcbiAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBvZmZzZXRzIHdoaWNoIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgcG9wcGVyXG4gKi9cbmZ1bmN0aW9uIGdldFJlZmVyZW5jZU9mZnNldHMoc3RhdGUsIHBvcHBlciwgcmVmZXJlbmNlKSB7XG4gIGNvbnN0IGNvbW1vbk9mZnNldFBhcmVudCA9IGZpbmRDb21tb25PZmZzZXRQYXJlbnQocG9wcGVyLCByZWZlcmVuY2UpO1xuICByZXR1cm4gZ2V0T2Zmc2V0UmVjdFJlbGF0aXZlVG9BcmJpdHJhcnlOb2RlKHJlZmVyZW5jZSwgY29tbW9uT2Zmc2V0UGFyZW50KTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIG91dGVyIHNpemVzIG9mIHRoZSBnaXZlbiBlbGVtZW50IChvZmZzZXQgc2l6ZSArIG1hcmdpbnMpXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtPYmplY3R9IG9iamVjdCBjb250YWluaW5nIHdpZHRoIGFuZCBoZWlnaHQgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBnZXRPdXRlclNpemVzKGVsZW1lbnQpIHtcbiAgY29uc3Qgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gIGNvbnN0IHggPSBwYXJzZUZsb2F0KHN0eWxlcy5tYXJnaW5Ub3ApICsgcGFyc2VGbG9hdChzdHlsZXMubWFyZ2luQm90dG9tKTtcbiAgY29uc3QgeSA9IHBhcnNlRmxvYXQoc3R5bGVzLm1hcmdpbkxlZnQpICsgcGFyc2VGbG9hdChzdHlsZXMubWFyZ2luUmlnaHQpO1xuICBjb25zdCByZXN1bHQgPSB7XG4gICAgd2lkdGg6IGVsZW1lbnQub2Zmc2V0V2lkdGggKyB5LFxuICAgIGhlaWdodDogZWxlbWVudC5vZmZzZXRIZWlnaHQgKyB4XG4gIH07XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0IHRoZSBvcHBvc2l0ZSBwbGFjZW1lbnQgb2YgdGhlIGdpdmVuIG9uZVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IHBsYWNlbWVudFxuICogQHJldHVybnMge1N0cmluZ30gZmxpcHBlZCBwbGFjZW1lbnRcbiAqL1xuZnVuY3Rpb24gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIGNvbnN0IGhhc2ggPSB7IGxlZnQ6ICdyaWdodCcsIHJpZ2h0OiAnbGVmdCcsIGJvdHRvbTogJ3RvcCcsIHRvcDogJ2JvdHRvbScgfTtcbiAgcmV0dXJuIHBsYWNlbWVudC5yZXBsYWNlKC9sZWZ0fHJpZ2h0fGJvdHRvbXx0b3AvZywgbWF0Y2hlZCA9PiBoYXNoW21hdGNoZWRdKTtcbn1cblxuLyoqXG4gKiBHZXQgb2Zmc2V0cyB0byB0aGUgcG9wcGVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9zaXRpb24gLSBDU1MgcG9zaXRpb24gdGhlIFBvcHBlciB3aWxsIGdldCBhcHBsaWVkXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwb3BwZXIgLSB0aGUgcG9wcGVyIGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWZlcmVuY2VPZmZzZXRzIC0gdGhlIHJlZmVyZW5jZSBvZmZzZXRzICh0aGUgcG9wcGVyIHdpbGwgYmUgcmVsYXRpdmUgdG8gdGhpcylcbiAqIEBwYXJhbSB7U3RyaW5nfSBwbGFjZW1lbnQgLSBvbmUgb2YgdGhlIHZhbGlkIHBsYWNlbWVudCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBwb3BwZXJPZmZzZXRzIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9mZnNldHMgd2hpY2ggd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXJcbiAqL1xuZnVuY3Rpb24gZ2V0UG9wcGVyT2Zmc2V0cyhwb3BwZXIsIHJlZmVyZW5jZU9mZnNldHMsIHBsYWNlbWVudCkge1xuICBwbGFjZW1lbnQgPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcblxuICAvLyBHZXQgcG9wcGVyIG5vZGUgc2l6ZXNcbiAgY29uc3QgcG9wcGVyUmVjdCA9IGdldE91dGVyU2l6ZXMocG9wcGVyKTtcblxuICAvLyBBZGQgcG9zaXRpb24sIHdpZHRoIGFuZCBoZWlnaHQgdG8gb3VyIG9mZnNldHMgb2JqZWN0XG4gIGNvbnN0IHBvcHBlck9mZnNldHMgPSB7XG4gICAgd2lkdGg6IHBvcHBlclJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiBwb3BwZXJSZWN0LmhlaWdodFxuICB9O1xuXG4gIC8vIGRlcGVuZGluZyBieSB0aGUgcG9wcGVyIHBsYWNlbWVudCB3ZSBoYXZlIHRvIGNvbXB1dGUgaXRzIG9mZnNldHMgc2xpZ2h0bHkgZGlmZmVyZW50bHlcbiAgY29uc3QgaXNIb3JpeiA9IFsncmlnaHQnLCAnbGVmdCddLmluZGV4T2YocGxhY2VtZW50KSAhPT0gLTE7XG4gIGNvbnN0IG1haW5TaWRlID0gaXNIb3JpeiA/ICd0b3AnIDogJ2xlZnQnO1xuICBjb25zdCBzZWNvbmRhcnlTaWRlID0gaXNIb3JpeiA/ICdsZWZ0JyA6ICd0b3AnO1xuICBjb25zdCBtZWFzdXJlbWVudCA9IGlzSG9yaXogPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gIGNvbnN0IHNlY29uZGFyeU1lYXN1cmVtZW50ID0gIWlzSG9yaXogPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgcG9wcGVyT2Zmc2V0c1ttYWluU2lkZV0gPSByZWZlcmVuY2VPZmZzZXRzW21haW5TaWRlXSArIHJlZmVyZW5jZU9mZnNldHNbbWVhc3VyZW1lbnRdIC8gMiAtIHBvcHBlclJlY3RbbWVhc3VyZW1lbnRdIC8gMjtcbiAgaWYgKHBsYWNlbWVudCA9PT0gc2Vjb25kYXJ5U2lkZSkge1xuICAgIHBvcHBlck9mZnNldHNbc2Vjb25kYXJ5U2lkZV0gPSByZWZlcmVuY2VPZmZzZXRzW3NlY29uZGFyeVNpZGVdIC0gcG9wcGVyUmVjdFtzZWNvbmRhcnlNZWFzdXJlbWVudF07XG4gIH0gZWxzZSB7XG4gICAgcG9wcGVyT2Zmc2V0c1tzZWNvbmRhcnlTaWRlXSA9IHJlZmVyZW5jZU9mZnNldHNbZ2V0T3Bwb3NpdGVQbGFjZW1lbnQoc2Vjb25kYXJ5U2lkZSldO1xuICB9XG5cbiAgcmV0dXJuIHBvcHBlck9mZnNldHM7XG59XG5cbi8qKlxuICogTWltaWNzIHRoZSBgZmluZGAgbWV0aG9kIG9mIEFycmF5XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0FycmF5fSBhcnJcbiAqIEBhcmd1bWVudCBwcm9wXG4gKiBAYXJndW1lbnQgdmFsdWVcbiAqIEByZXR1cm5zIGluZGV4IG9yIC0xXG4gKi9cbmZ1bmN0aW9uIGZpbmQoYXJyLCBjaGVjaykge1xuICAvLyB1c2UgbmF0aXZlIGZpbmQgaWYgc3VwcG9ydGVkXG4gIGlmIChBcnJheS5wcm90b3R5cGUuZmluZCkge1xuICAgIHJldHVybiBhcnIuZmluZChjaGVjayk7XG4gIH1cblxuICAvLyB1c2UgYGZpbHRlcmAgdG8gb2J0YWluIHRoZSBzYW1lIGJlaGF2aW9yIG9mIGBmaW5kYFxuICByZXR1cm4gYXJyLmZpbHRlcihjaGVjaylbMF07XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hpbmcgb2JqZWN0XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0FycmF5fSBhcnJcbiAqIEBhcmd1bWVudCBwcm9wXG4gKiBAYXJndW1lbnQgdmFsdWVcbiAqIEByZXR1cm5zIGluZGV4IG9yIC0xXG4gKi9cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnIsIHByb3AsIHZhbHVlKSB7XG4gIC8vIHVzZSBuYXRpdmUgZmluZEluZGV4IGlmIHN1cHBvcnRlZFxuICBpZiAoQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCkge1xuICAgIHJldHVybiBhcnIuZmluZEluZGV4KGN1ciA9PiBjdXJbcHJvcF0gPT09IHZhbHVlKTtcbiAgfVxuXG4gIC8vIHVzZSBgZmluZGAgKyBgaW5kZXhPZmAgaWYgYGZpbmRJbmRleGAgaXNuJ3Qgc3VwcG9ydGVkXG4gIGNvbnN0IG1hdGNoID0gZmluZChhcnIsIG9iaiA9PiBvYmpbcHJvcF0gPT09IHZhbHVlKTtcbiAgcmV0dXJuIGFyci5pbmRleE9mKG1hdGNoKTtcbn1cblxuLyoqXG4gKiBMb29wIHRyb3VnaCB0aGUgbGlzdCBvZiBtb2RpZmllcnMgYW5kIHJ1biB0aGVtIGluIG9yZGVyLFxuICogZWFjaCBvZiB0aGVtIHdpbGwgdGhlbiBlZGl0IHRoZSBkYXRhIG9iamVjdC5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7ZGF0YU9iamVjdH0gZGF0YVxuICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzXG4gKiBAcGFyYW0ge1N0cmluZ30gZW5kcyAtIE9wdGlvbmFsIG1vZGlmaWVyIG5hbWUgdXNlZCBhcyBzdG9wcGVyXG4gKiBAcmV0dXJucyB7ZGF0YU9iamVjdH1cbiAqL1xuZnVuY3Rpb24gcnVuTW9kaWZpZXJzKG1vZGlmaWVycywgZGF0YSwgZW5kcykge1xuICBjb25zdCBtb2RpZmllcnNUb1J1biA9IGVuZHMgPT09IHVuZGVmaW5lZCA/IG1vZGlmaWVycyA6IG1vZGlmaWVycy5zbGljZSgwLCBmaW5kSW5kZXgobW9kaWZpZXJzLCAnbmFtZScsIGVuZHMpKTtcblxuICBtb2RpZmllcnNUb1J1bi5mb3JFYWNoKG1vZGlmaWVyID0+IHtcbiAgICBpZiAobW9kaWZpZXIuZnVuY3Rpb24pIHtcbiAgICAgIGNvbnNvbGUud2FybignYG1vZGlmaWVyLmZ1bmN0aW9uYCBpcyBkZXByZWNhdGVkLCB1c2UgYG1vZGlmaWVyLmZuYCEnKTtcbiAgICB9XG4gICAgY29uc3QgZm4gPSBtb2RpZmllci5mdW5jdGlvbiB8fCBtb2RpZmllci5mbjtcbiAgICBpZiAobW9kaWZpZXIuZW5hYmxlZCAmJiBpc0Z1bmN0aW9uKGZuKSkge1xuICAgICAgLy8gQWRkIHByb3BlcnRpZXMgdG8gb2Zmc2V0cyB0byBtYWtlIHRoZW0gYSBjb21wbGV0ZSBjbGllbnRSZWN0IG9iamVjdFxuICAgICAgLy8gd2UgZG8gdGhpcyBiZWZvcmUgZWFjaCBtb2RpZmllciB0byBtYWtlIHN1cmUgdGhlIHByZXZpb3VzIG9uZSBkb2Vzbid0XG4gICAgICAvLyBtZXNzIHdpdGggdGhlc2UgdmFsdWVzXG4gICAgICBkYXRhLm9mZnNldHMucG9wcGVyID0gZ2V0Q2xpZW50UmVjdChkYXRhLm9mZnNldHMucG9wcGVyKTtcbiAgICAgIGRhdGEub2Zmc2V0cy5yZWZlcmVuY2UgPSBnZXRDbGllbnRSZWN0KGRhdGEub2Zmc2V0cy5yZWZlcmVuY2UpO1xuXG4gICAgICBkYXRhID0gZm4oZGF0YSwgbW9kaWZpZXIpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIHBvcHBlciwgY29tcHV0aW5nIHRoZSBuZXcgb2Zmc2V0cyBhbmQgYXBwbHlpbmdcbiAqIHRoZSBuZXcgc3R5bGUuPGJyIC8+XG4gKiBQcmVmZXIgYHNjaGVkdWxlVXBkYXRlYCBvdmVyIGB1cGRhdGVgIGJlY2F1c2Ugb2YgcGVyZm9ybWFuY2UgcmVhc29ucy5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXJcbiAqL1xuZnVuY3Rpb24gdXBkYXRlKCkge1xuICAvLyBpZiBwb3BwZXIgaXMgZGVzdHJveWVkLCBkb24ndCBwZXJmb3JtIGFueSBmdXJ0aGVyIHVwZGF0ZVxuICBpZiAodGhpcy5zdGF0ZS5pc0Rlc3Ryb3llZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBkYXRhID0ge1xuICAgIGluc3RhbmNlOiB0aGlzLFxuICAgIHN0eWxlczoge30sXG4gICAgYXJyb3dTdHlsZXM6IHt9LFxuICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgIGZsaXBwZWQ6IGZhbHNlLFxuICAgIG9mZnNldHM6IHt9XG4gIH07XG5cbiAgLy8gY29tcHV0ZSByZWZlcmVuY2UgZWxlbWVudCBvZmZzZXRzXG4gIGRhdGEub2Zmc2V0cy5yZWZlcmVuY2UgPSBnZXRSZWZlcmVuY2VPZmZzZXRzKHRoaXMuc3RhdGUsIHRoaXMucG9wcGVyLCB0aGlzLnJlZmVyZW5jZSk7XG5cbiAgLy8gY29tcHV0ZSBhdXRvIHBsYWNlbWVudCwgc3RvcmUgcGxhY2VtZW50IGluc2lkZSB0aGUgZGF0YSBvYmplY3QsXG4gIC8vIG1vZGlmaWVycyB3aWxsIGJlIGFibGUgdG8gZWRpdCBgcGxhY2VtZW50YCBpZiBuZWVkZWRcbiAgLy8gYW5kIHJlZmVyIHRvIG9yaWdpbmFsUGxhY2VtZW50IHRvIGtub3cgdGhlIG9yaWdpbmFsIHZhbHVlXG4gIGRhdGEucGxhY2VtZW50ID0gY29tcHV0ZUF1dG9QbGFjZW1lbnQodGhpcy5vcHRpb25zLnBsYWNlbWVudCwgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSwgdGhpcy5wb3BwZXIsIHRoaXMucmVmZXJlbmNlLCB0aGlzLm9wdGlvbnMubW9kaWZpZXJzLmZsaXAuYm91bmRhcmllc0VsZW1lbnQsIHRoaXMub3B0aW9ucy5tb2RpZmllcnMuZmxpcC5wYWRkaW5nKTtcblxuICAvLyBzdG9yZSB0aGUgY29tcHV0ZWQgcGxhY2VtZW50IGluc2lkZSBgb3JpZ2luYWxQbGFjZW1lbnRgXG4gIGRhdGEub3JpZ2luYWxQbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudDtcblxuICAvLyBjb21wdXRlIHRoZSBwb3BwZXIgb2Zmc2V0c1xuICBkYXRhLm9mZnNldHMucG9wcGVyID0gZ2V0UG9wcGVyT2Zmc2V0cyh0aGlzLnBvcHBlciwgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSwgZGF0YS5wbGFjZW1lbnQpO1xuICBkYXRhLm9mZnNldHMucG9wcGVyLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcblxuICAvLyBydW4gdGhlIG1vZGlmaWVyc1xuICBkYXRhID0gcnVuTW9kaWZpZXJzKHRoaXMubW9kaWZpZXJzLCBkYXRhKTtcblxuICAvLyB0aGUgZmlyc3QgYHVwZGF0ZWAgd2lsbCBjYWxsIGBvbkNyZWF0ZWAgY2FsbGJhY2tcbiAgLy8gdGhlIG90aGVyIG9uZXMgd2lsbCBjYWxsIGBvblVwZGF0ZWAgY2FsbGJhY2tcbiAgaWYgKCF0aGlzLnN0YXRlLmlzQ3JlYXRlZCkge1xuICAgIHRoaXMuc3RhdGUuaXNDcmVhdGVkID0gdHJ1ZTtcbiAgICB0aGlzLm9wdGlvbnMub25DcmVhdGUoZGF0YSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5vcHRpb25zLm9uVXBkYXRlKGRhdGEpO1xuICB9XG59XG5cbi8qKlxuICogSGVscGVyIHVzZWQgdG8ga25vdyBpZiB0aGUgZ2l2ZW4gbW9kaWZpZXIgaXMgZW5hYmxlZC5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpc01vZGlmaWVyRW5hYmxlZChtb2RpZmllcnMsIG1vZGlmaWVyTmFtZSkge1xuICByZXR1cm4gbW9kaWZpZXJzLnNvbWUoKHsgbmFtZSwgZW5hYmxlZCB9KSA9PiBlbmFibGVkICYmIG5hbWUgPT09IG1vZGlmaWVyTmFtZSk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBwcmVmaXhlZCBzdXBwb3J0ZWQgcHJvcGVydHkgbmFtZVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IHByb3BlcnR5IChjYW1lbENhc2UpXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBwcmVmaXhlZCBwcm9wZXJ0eSAoY2FtZWxDYXNlIG9yIFBhc2NhbENhc2UsIGRlcGVuZGluZyBvbiB0aGUgdmVuZG9yIHByZWZpeClcbiAqL1xuZnVuY3Rpb24gZ2V0U3VwcG9ydGVkUHJvcGVydHlOYW1lKHByb3BlcnR5KSB7XG4gIGNvbnN0IHByZWZpeGVzID0gW2ZhbHNlLCAnbXMnLCAnV2Via2l0JywgJ01veicsICdPJ107XG4gIGNvbnN0IHVwcGVyUHJvcCA9IHByb3BlcnR5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcGVydHkuc2xpY2UoMSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVmaXhlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICBjb25zdCBwcmVmaXggPSBwcmVmaXhlc1tpXTtcbiAgICBjb25zdCB0b0NoZWNrID0gcHJlZml4ID8gYCR7cHJlZml4fSR7dXBwZXJQcm9wfWAgOiBwcm9wZXJ0eTtcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5kb2N1bWVudC5ib2R5LnN0eWxlW3RvQ2hlY2tdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRvQ2hlY2s7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIERlc3Ryb3kgdGhlIHBvcHBlclxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlclxuICovXG5mdW5jdGlvbiBkZXN0cm95KCkge1xuICB0aGlzLnN0YXRlLmlzRGVzdHJveWVkID0gdHJ1ZTtcblxuICAvLyB0b3VjaCBET00gb25seSBpZiBgYXBwbHlTdHlsZWAgbW9kaWZpZXIgaXMgZW5hYmxlZFxuICBpZiAoaXNNb2RpZmllckVuYWJsZWQodGhpcy5tb2RpZmllcnMsICdhcHBseVN0eWxlJykpIHtcbiAgICB0aGlzLnBvcHBlci5yZW1vdmVBdHRyaWJ1dGUoJ3gtcGxhY2VtZW50Jyk7XG4gICAgdGhpcy5wb3BwZXIuc3R5bGUubGVmdCA9ICcnO1xuICAgIHRoaXMucG9wcGVyLnN0eWxlLnBvc2l0aW9uID0gJyc7XG4gICAgdGhpcy5wb3BwZXIuc3R5bGUudG9wID0gJyc7XG4gICAgdGhpcy5wb3BwZXIuc3R5bGVbZ2V0U3VwcG9ydGVkUHJvcGVydHlOYW1lKCd0cmFuc2Zvcm0nKV0gPSAnJztcbiAgfVxuXG4gIHRoaXMuZGlzYWJsZUV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgLy8gcmVtb3ZlIHRoZSBwb3BwZXIgaWYgdXNlciBleHBsaWNpdHkgYXNrZWQgZm9yIHRoZSBkZWxldGlvbiBvbiBkZXN0cm95XG4gIC8vIGRvIG5vdCB1c2UgYHJlbW92ZWAgYmVjYXVzZSBJRTExIGRvZXNuJ3Qgc3VwcG9ydCBpdFxuICBpZiAodGhpcy5vcHRpb25zLnJlbW92ZU9uRGVzdHJveSkge1xuICAgIHRoaXMucG9wcGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5wb3BwZXIpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBhdHRhY2hUb1Njcm9sbFBhcmVudHMoc2Nyb2xsUGFyZW50LCBldmVudCwgY2FsbGJhY2ssIHNjcm9sbFBhcmVudHMpIHtcbiAgY29uc3QgaXNCb2R5ID0gc2Nyb2xsUGFyZW50Lm5vZGVOYW1lID09PSAnQk9EWSc7XG4gIGNvbnN0IHRhcmdldCA9IGlzQm9keSA/IHdpbmRvdyA6IHNjcm9sbFBhcmVudDtcbiAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrLCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgaWYgKCFpc0JvZHkpIHtcbiAgICBhdHRhY2hUb1Njcm9sbFBhcmVudHMoZ2V0U2Nyb2xsUGFyZW50KHRhcmdldC5wYXJlbnROb2RlKSwgZXZlbnQsIGNhbGxiYWNrLCBzY3JvbGxQYXJlbnRzKTtcbiAgfVxuICBzY3JvbGxQYXJlbnRzLnB1c2godGFyZ2V0KTtcbn1cblxuLyoqXG4gKiBTZXR1cCBuZWVkZWQgZXZlbnQgbGlzdGVuZXJzIHVzZWQgdG8gdXBkYXRlIHRoZSBwb3BwZXIgcG9zaXRpb25cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNldHVwRXZlbnRMaXN0ZW5lcnMocmVmZXJlbmNlLCBvcHRpb25zLCBzdGF0ZSwgdXBkYXRlQm91bmQpIHtcbiAgLy8gUmVzaXplIGV2ZW50IGxpc3RlbmVyIG9uIHdpbmRvd1xuICBzdGF0ZS51cGRhdGVCb3VuZCA9IHVwZGF0ZUJvdW5kO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc3RhdGUudXBkYXRlQm91bmQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICAvLyBTY3JvbGwgZXZlbnQgbGlzdGVuZXIgb24gc2Nyb2xsIHBhcmVudHNcbiAgY29uc3Qgc2Nyb2xsRWxlbWVudCA9IGdldFNjcm9sbFBhcmVudChyZWZlcmVuY2UpO1xuICBhdHRhY2hUb1Njcm9sbFBhcmVudHMoc2Nyb2xsRWxlbWVudCwgJ3Njcm9sbCcsIHN0YXRlLnVwZGF0ZUJvdW5kLCBzdGF0ZS5zY3JvbGxQYXJlbnRzKTtcbiAgc3RhdGUuc2Nyb2xsRWxlbWVudCA9IHNjcm9sbEVsZW1lbnQ7XG4gIHN0YXRlLmV2ZW50c0VuYWJsZWQgPSB0cnVlO1xuXG4gIHJldHVybiBzdGF0ZTtcbn1cblxuLyoqXG4gKiBJdCB3aWxsIGFkZCByZXNpemUvc2Nyb2xsIGV2ZW50cyBhbmQgc3RhcnQgcmVjYWxjdWxhdGluZ1xuICogcG9zaXRpb24gb2YgdGhlIHBvcHBlciBlbGVtZW50IHdoZW4gdGhleSBhcmUgdHJpZ2dlcmVkLlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlclxuICovXG5mdW5jdGlvbiBlbmFibGVFdmVudExpc3RlbmVycygpIHtcbiAgaWYgKCF0aGlzLnN0YXRlLmV2ZW50c0VuYWJsZWQpIHtcbiAgICB0aGlzLnN0YXRlID0gc2V0dXBFdmVudExpc3RlbmVycyh0aGlzLnJlZmVyZW5jZSwgdGhpcy5vcHRpb25zLCB0aGlzLnN0YXRlLCB0aGlzLnNjaGVkdWxlVXBkYXRlKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMgdXNlZCB0byB1cGRhdGUgdGhlIHBvcHBlciBwb3NpdGlvblxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnMocmVmZXJlbmNlLCBzdGF0ZSkge1xuICAvLyBSZW1vdmUgcmVzaXplIGV2ZW50IGxpc3RlbmVyIG9uIHdpbmRvd1xuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc3RhdGUudXBkYXRlQm91bmQpO1xuXG4gIC8vIFJlbW92ZSBzY3JvbGwgZXZlbnQgbGlzdGVuZXIgb24gc2Nyb2xsIHBhcmVudHNcbiAgc3RhdGUuc2Nyb2xsUGFyZW50cy5mb3JFYWNoKHRhcmdldCA9PiB7XG4gICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHN0YXRlLnVwZGF0ZUJvdW5kKTtcbiAgfSk7XG5cbiAgLy8gUmVzZXQgc3RhdGVcbiAgc3RhdGUudXBkYXRlQm91bmQgPSBudWxsO1xuICBzdGF0ZS5zY3JvbGxQYXJlbnRzID0gW107XG4gIHN0YXRlLnNjcm9sbEVsZW1lbnQgPSBudWxsO1xuICBzdGF0ZS5ldmVudHNFbmFibGVkID0gZmFsc2U7XG4gIHJldHVybiBzdGF0ZTtcbn1cblxuLyoqXG4gKiBJdCB3aWxsIHJlbW92ZSByZXNpemUvc2Nyb2xsIGV2ZW50cyBhbmQgd29uJ3QgcmVjYWxjdWxhdGUgcG9wcGVyIHBvc2l0aW9uXG4gKiB3aGVuIHRoZXkgYXJlIHRyaWdnZXJlZC4gSXQgYWxzbyB3b24ndCB0cmlnZ2VyIG9uVXBkYXRlIGNhbGxiYWNrIGFueW1vcmUsXG4gKiB1bmxlc3MgeW91IGNhbGwgYHVwZGF0ZWAgbWV0aG9kIG1hbnVhbGx5LlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlclxuICovXG5mdW5jdGlvbiBkaXNhYmxlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gIGlmICh0aGlzLnN0YXRlLmV2ZW50c0VuYWJsZWQpIHtcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5zY2hlZHVsZVVwZGF0ZSk7XG4gICAgdGhpcy5zdGF0ZSA9IHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMucmVmZXJlbmNlLCB0aGlzLnN0YXRlKTtcbiAgfVxufVxuXG4vKipcbiAqIFRlbGxzIGlmIGEgZ2l2ZW4gaW5wdXQgaXMgYSBudW1iZXJcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7Kn0gaW5wdXQgdG8gY2hlY2tcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzTnVtZXJpYyhuKSB7XG4gIHJldHVybiBuICE9PSAnJyAmJiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgaXNGaW5pdGUobik7XG59XG5cbi8qKlxuICogU2V0IHRoZSBzdHlsZSB0byB0aGUgZ2l2ZW4gcG9wcGVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnQgLSBFbGVtZW50IHRvIGFwcGx5IHRoZSBzdHlsZSB0b1xuICogQGFyZ3VtZW50IHtPYmplY3R9IHN0eWxlc1xuICogT2JqZWN0IHdpdGggYSBsaXN0IG9mIHByb3BlcnRpZXMgYW5kIHZhbHVlcyB3aGljaCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gc2V0U3R5bGVzKGVsZW1lbnQsIHN0eWxlcykge1xuICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgbGV0IHVuaXQgPSAnJztcbiAgICAvLyBhZGQgdW5pdCBpZiB0aGUgdmFsdWUgaXMgbnVtZXJpYyBhbmQgaXMgb25lIG9mIHRoZSBmb2xsb3dpbmdcbiAgICBpZiAoWyd3aWR0aCcsICdoZWlnaHQnLCAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J10uaW5kZXhPZihwcm9wKSAhPT0gLTEgJiYgaXNOdW1lcmljKHN0eWxlc1twcm9wXSkpIHtcbiAgICAgIHVuaXQgPSAncHgnO1xuICAgIH1cbiAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gc3R5bGVzW3Byb3BdICsgdW5pdDtcbiAgfSk7XG59XG5cbi8qKlxuICogU2V0IHRoZSBhdHRyaWJ1dGVzIHRvIHRoZSBnaXZlbiBwb3BwZXJcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gZWxlbWVudCAtIEVsZW1lbnQgdG8gYXBwbHkgdGhlIGF0dHJpYnV0ZXMgdG9cbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBzdHlsZXNcbiAqIE9iamVjdCB3aXRoIGEgbGlzdCBvZiBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXMgd2hpY2ggd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlcykge1xuICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgY29uc3QgdmFsdWUgPSBhdHRyaWJ1dGVzW3Byb3BdO1xuICAgIGlmICh2YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKHByb3AsIGF0dHJpYnV0ZXNbcHJvcF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShwcm9wKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEuc3R5bGVzIC0gTGlzdCBvZiBzdHlsZSBwcm9wZXJ0aWVzIC0gdmFsdWVzIHRvIGFwcGx5IHRvIHBvcHBlciBlbGVtZW50XG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YS5hdHRyaWJ1dGVzIC0gTGlzdCBvZiBhdHRyaWJ1dGUgcHJvcGVydGllcyAtIHZhbHVlcyB0byBhcHBseSB0byBwb3BwZXIgZWxlbWVudFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIHNhbWUgZGF0YSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gYXBwbHlTdHlsZShkYXRhKSB7XG4gIC8vIGFueSBwcm9wZXJ0eSBwcmVzZW50IGluIGBkYXRhLnN0eWxlc2Agd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIsXG4gIC8vIGluIHRoaXMgd2F5IHdlIGNhbiBtYWtlIHRoZSAzcmQgcGFydHkgbW9kaWZpZXJzIGFkZCBjdXN0b20gc3R5bGVzIHRvIGl0XG4gIC8vIEJlIGF3YXJlLCBtb2RpZmllcnMgY291bGQgb3ZlcnJpZGUgdGhlIHByb3BlcnRpZXMgZGVmaW5lZCBpbiB0aGUgcHJldmlvdXNcbiAgLy8gbGluZXMgb2YgdGhpcyBtb2RpZmllciFcbiAgc2V0U3R5bGVzKGRhdGEuaW5zdGFuY2UucG9wcGVyLCBkYXRhLnN0eWxlcyk7XG5cbiAgLy8gYW55IHByb3BlcnR5IHByZXNlbnQgaW4gYGRhdGEuYXR0cmlidXRlc2Agd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIsXG4gIC8vIHRoZXkgd2lsbCBiZSBzZXQgYXMgSFRNTCBhdHRyaWJ1dGVzIG9mIHRoZSBlbGVtZW50XG4gIHNldEF0dHJpYnV0ZXMoZGF0YS5pbnN0YW5jZS5wb3BwZXIsIGRhdGEuYXR0cmlidXRlcyk7XG5cbiAgLy8gaWYgYXJyb3dFbGVtZW50IGlzIGRlZmluZWQgYW5kIGFycm93U3R5bGVzIGhhcyBzb21lIHByb3BlcnRpZXNcbiAgaWYgKGRhdGEuYXJyb3dFbGVtZW50ICYmIE9iamVjdC5rZXlzKGRhdGEuYXJyb3dTdHlsZXMpLmxlbmd0aCkge1xuICAgIHNldFN0eWxlcyhkYXRhLmFycm93RWxlbWVudCwgZGF0YS5hcnJvd1N0eWxlcyk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIHgtcGxhY2VtZW50IGF0dHJpYnV0ZSBiZWZvcmUgZXZlcnl0aGluZyBlbHNlIGJlY2F1c2UgaXQgY291bGQgYmUgdXNlZFxuICogdG8gYWRkIG1hcmdpbnMgdG8gdGhlIHBvcHBlciBtYXJnaW5zIG5lZWRzIHRvIGJlIGNhbGN1bGF0ZWQgdG8gZ2V0IHRoZVxuICogY29ycmVjdCBwb3BwZXIgb2Zmc2V0cy5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIubW9kaWZpZXJzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByZWZlcmVuY2UgLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgdXNlZCB0byBwb3NpdGlvbiB0aGUgcG9wcGVyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwb3BwZXIgLSBUaGUgSFRNTCBlbGVtZW50IHVzZWQgYXMgcG9wcGVyLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBQb3BwZXIuanMgb3B0aW9uc1xuICovXG5mdW5jdGlvbiBhcHBseVN0eWxlT25Mb2FkKHJlZmVyZW5jZSwgcG9wcGVyLCBvcHRpb25zLCBtb2RpZmllck9wdGlvbnMsIHN0YXRlKSB7XG4gIC8vIGNvbXB1dGUgcmVmZXJlbmNlIGVsZW1lbnQgb2Zmc2V0c1xuICBjb25zdCByZWZlcmVuY2VPZmZzZXRzID0gZ2V0UmVmZXJlbmNlT2Zmc2V0cyhzdGF0ZSwgcG9wcGVyLCByZWZlcmVuY2UpO1xuXG4gIC8vIGNvbXB1dGUgYXV0byBwbGFjZW1lbnQsIHN0b3JlIHBsYWNlbWVudCBpbnNpZGUgdGhlIGRhdGEgb2JqZWN0LFxuICAvLyBtb2RpZmllcnMgd2lsbCBiZSBhYmxlIHRvIGVkaXQgYHBsYWNlbWVudGAgaWYgbmVlZGVkXG4gIC8vIGFuZCByZWZlciB0byBvcmlnaW5hbFBsYWNlbWVudCB0byBrbm93IHRoZSBvcmlnaW5hbCB2YWx1ZVxuICBjb25zdCBwbGFjZW1lbnQgPSBjb21wdXRlQXV0b1BsYWNlbWVudChvcHRpb25zLnBsYWNlbWVudCwgcmVmZXJlbmNlT2Zmc2V0cywgcG9wcGVyLCByZWZlcmVuY2UsIG9wdGlvbnMubW9kaWZpZXJzLmZsaXAuYm91bmRhcmllc0VsZW1lbnQsIG9wdGlvbnMubW9kaWZpZXJzLmZsaXAucGFkZGluZyk7XG5cbiAgcG9wcGVyLnNldEF0dHJpYnV0ZSgneC1wbGFjZW1lbnQnLCBwbGFjZW1lbnQpO1xuXG4gIC8vIEFwcGx5IGBwb3NpdGlvbmAgdG8gcG9wcGVyIGJlZm9yZSBhbnl0aGluZyBlbHNlIGJlY2F1c2VcbiAgLy8gd2l0aG91dCB0aGUgcG9zaXRpb24gYXBwbGllZCB3ZSBjYW4ndCBndWFyYW50ZWUgY29ycmVjdCBjb21wdXRhdGlvbnNcbiAgc2V0U3R5bGVzKHBvcHBlciwgeyBwb3NpdGlvbjogJ2Fic29sdXRlJyB9KTtcblxuICByZXR1cm4gb3B0aW9ucztcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSBgdXBkYXRlYCBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZVN0eWxlKGRhdGEsIG9wdGlvbnMpIHtcbiAgY29uc3QgeyB4LCB5IH0gPSBvcHRpb25zO1xuICBjb25zdCB7IHBvcHBlciB9ID0gZGF0YS5vZmZzZXRzO1xuXG4gIC8vIFJlbW92ZSB0aGlzIGxlZ2FjeSBzdXBwb3J0IGluIFBvcHBlci5qcyB2MlxuICBjb25zdCBsZWdhY3lHcHVBY2NlbGVyYXRpb25PcHRpb24gPSBmaW5kKGRhdGEuaW5zdGFuY2UubW9kaWZpZXJzLCBtb2RpZmllciA9PiBtb2RpZmllci5uYW1lID09PSAnYXBwbHlTdHlsZScpLmdwdUFjY2VsZXJhdGlvbjtcbiAgaWYgKGxlZ2FjeUdwdUFjY2VsZXJhdGlvbk9wdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc29sZS53YXJuKCdXQVJOSU5HOiBgZ3B1QWNjZWxlcmF0aW9uYCBvcHRpb24gbW92ZWQgdG8gYGNvbXB1dGVTdHlsZWAgbW9kaWZpZXIgYW5kIHdpbGwgbm90IGJlIHN1cHBvcnRlZCBpbiBmdXR1cmUgdmVyc2lvbnMgb2YgUG9wcGVyLmpzIScpO1xuICB9XG4gIGNvbnN0IGdwdUFjY2VsZXJhdGlvbiA9IGxlZ2FjeUdwdUFjY2VsZXJhdGlvbk9wdGlvbiAhPT0gdW5kZWZpbmVkID8gbGVnYWN5R3B1QWNjZWxlcmF0aW9uT3B0aW9uIDogb3B0aW9ucy5ncHVBY2NlbGVyYXRpb247XG5cbiAgY29uc3Qgb2Zmc2V0UGFyZW50ID0gZ2V0T2Zmc2V0UGFyZW50KGRhdGEuaW5zdGFuY2UucG9wcGVyKTtcbiAgY29uc3Qgb2Zmc2V0UGFyZW50UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChvZmZzZXRQYXJlbnQpO1xuXG4gIC8vIFN0eWxlc1xuICBjb25zdCBzdHlsZXMgPSB7XG4gICAgcG9zaXRpb246IHBvcHBlci5wb3NpdGlvblxuICB9O1xuXG4gIC8vIGZsb29yIHNpZGVzIHRvIGF2b2lkIGJsdXJyeSB0ZXh0XG4gIGNvbnN0IG9mZnNldHMgPSB7XG4gICAgbGVmdDogTWF0aC5mbG9vcihwb3BwZXIubGVmdCksXG4gICAgdG9wOiBNYXRoLmZsb29yKHBvcHBlci50b3ApLFxuICAgIGJvdHRvbTogTWF0aC5mbG9vcihwb3BwZXIuYm90dG9tKSxcbiAgICByaWdodDogTWF0aC5mbG9vcihwb3BwZXIucmlnaHQpXG4gIH07XG5cbiAgY29uc3Qgc2lkZUEgPSB4ID09PSAnYm90dG9tJyA/ICd0b3AnIDogJ2JvdHRvbSc7XG4gIGNvbnN0IHNpZGVCID0geSA9PT0gJ3JpZ2h0JyA/ICdsZWZ0JyA6ICdyaWdodCc7XG5cbiAgLy8gaWYgZ3B1QWNjZWxlcmF0aW9uIGlzIHNldCB0byBgdHJ1ZWAgYW5kIHRyYW5zZm9ybSBpcyBzdXBwb3J0ZWQsXG4gIC8vICB3ZSB1c2UgYHRyYW5zbGF0ZTNkYCB0byBhcHBseSB0aGUgcG9zaXRpb24gdG8gdGhlIHBvcHBlciB3ZVxuICAvLyBhdXRvbWF0aWNhbGx5IHVzZSB0aGUgc3VwcG9ydGVkIHByZWZpeGVkIHZlcnNpb24gaWYgbmVlZGVkXG4gIGNvbnN0IHByZWZpeGVkUHJvcGVydHkgPSBnZXRTdXBwb3J0ZWRQcm9wZXJ0eU5hbWUoJ3RyYW5zZm9ybScpO1xuXG4gIC8vIG5vdywgbGV0J3MgbWFrZSBhIHN0ZXAgYmFjayBhbmQgbG9vayBhdCB0aGlzIGNvZGUgY2xvc2VseSAod3RmPylcbiAgLy8gSWYgdGhlIGNvbnRlbnQgb2YgdGhlIHBvcHBlciBncm93cyBvbmNlIGl0J3MgYmVlbiBwb3NpdGlvbmVkLCBpdFxuICAvLyBtYXkgaGFwcGVuIHRoYXQgdGhlIHBvcHBlciBnZXRzIG1pc3BsYWNlZCBiZWNhdXNlIG9mIHRoZSBuZXcgY29udGVudFxuICAvLyBvdmVyZmxvd2luZyBpdHMgcmVmZXJlbmNlIGVsZW1lbnRcbiAgLy8gVG8gYXZvaWQgdGhpcyBwcm9ibGVtLCB3ZSBwcm92aWRlIHR3byBvcHRpb25zICh4IGFuZCB5KSwgd2hpY2ggYWxsb3dcbiAgLy8gdGhlIGNvbnN1bWVyIHRvIGRlZmluZSB0aGUgb2Zmc2V0IG9yaWdpbi5cbiAgLy8gSWYgd2UgcG9zaXRpb24gYSBwb3BwZXIgb24gdG9wIG9mIGEgcmVmZXJlbmNlIGVsZW1lbnQsIHdlIGNhbiBzZXRcbiAgLy8gYHhgIHRvIGB0b3BgIHRvIG1ha2UgdGhlIHBvcHBlciBncm93IHRvd2FyZHMgaXRzIHRvcCBpbnN0ZWFkIG9mXG4gIC8vIGl0cyBib3R0b20uXG4gIGxldCBsZWZ0LCB0b3A7XG4gIGlmIChzaWRlQSA9PT0gJ2JvdHRvbScpIHtcbiAgICB0b3AgPSAtb2Zmc2V0UGFyZW50UmVjdC5oZWlnaHQgKyBvZmZzZXRzLmJvdHRvbTtcbiAgfSBlbHNlIHtcbiAgICB0b3AgPSBvZmZzZXRzLnRvcDtcbiAgfVxuICBpZiAoc2lkZUIgPT09ICdyaWdodCcpIHtcbiAgICBsZWZ0ID0gLW9mZnNldFBhcmVudFJlY3Qud2lkdGggKyBvZmZzZXRzLnJpZ2h0O1xuICB9IGVsc2Uge1xuICAgIGxlZnQgPSBvZmZzZXRzLmxlZnQ7XG4gIH1cbiAgaWYgKGdwdUFjY2VsZXJhdGlvbiAmJiBwcmVmaXhlZFByb3BlcnR5KSB7XG4gICAgc3R5bGVzW3ByZWZpeGVkUHJvcGVydHldID0gYHRyYW5zbGF0ZTNkKCR7bGVmdH1weCwgJHt0b3B9cHgsIDApYDtcbiAgICBzdHlsZXNbc2lkZUFdID0gMDtcbiAgICBzdHlsZXNbc2lkZUJdID0gMDtcbiAgICBzdHlsZXMud2lsbENoYW5nZSA9ICd0cmFuc2Zvcm0nO1xuICB9IGVsc2Uge1xuICAgIC8vIG90aHdlcmlzZSwgd2UgdXNlIHRoZSBzdGFuZGFyZCBgdG9wYCwgYGxlZnRgLCBgYm90dG9tYCBhbmQgYHJpZ2h0YCBwcm9wZXJ0aWVzXG4gICAgY29uc3QgaW52ZXJ0VG9wID0gc2lkZUEgPT09ICdib3R0b20nID8gLTEgOiAxO1xuICAgIGNvbnN0IGludmVydExlZnQgPSBzaWRlQiA9PT0gJ3JpZ2h0JyA/IC0xIDogMTtcbiAgICBzdHlsZXNbc2lkZUFdID0gdG9wICogaW52ZXJ0VG9wO1xuICAgIHN0eWxlc1tzaWRlQl0gPSBsZWZ0ICogaW52ZXJ0TGVmdDtcbiAgICBzdHlsZXMud2lsbENoYW5nZSA9IGAke3NpZGVBfSwgJHtzaWRlQn1gO1xuICB9XG5cbiAgLy8gQXR0cmlidXRlc1xuICBjb25zdCBhdHRyaWJ1dGVzID0ge1xuICAgICd4LXBsYWNlbWVudCc6IGRhdGEucGxhY2VtZW50XG4gIH07XG5cbiAgLy8gVXBkYXRlIGBkYXRhYCBhdHRyaWJ1dGVzLCBzdHlsZXMgYW5kIGFycm93U3R5bGVzXG4gIGRhdGEuYXR0cmlidXRlcyA9IF9leHRlbmRzKHt9LCBhdHRyaWJ1dGVzLCBkYXRhLmF0dHJpYnV0ZXMpO1xuICBkYXRhLnN0eWxlcyA9IF9leHRlbmRzKHt9LCBzdHlsZXMsIGRhdGEuc3R5bGVzKTtcbiAgZGF0YS5hcnJvd1N0eWxlcyA9IF9leHRlbmRzKHt9LCBkYXRhLm9mZnNldHMuYXJyb3csIGRhdGEuYXJyb3dTdHlsZXMpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIEhlbHBlciB1c2VkIHRvIGtub3cgaWYgdGhlIGdpdmVuIG1vZGlmaWVyIGRlcGVuZHMgZnJvbSBhbm90aGVyIG9uZS48YnIgLz5cbiAqIEl0IGNoZWNrcyBpZiB0aGUgbmVlZGVkIG1vZGlmaWVyIGlzIGxpc3RlZCBhbmQgZW5hYmxlZC5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7QXJyYXl9IG1vZGlmaWVycyAtIGxpc3Qgb2YgbW9kaWZpZXJzXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdGluZ05hbWUgLSBuYW1lIG9mIHJlcXVlc3RpbmcgbW9kaWZpZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0ZWROYW1lIC0gbmFtZSBvZiByZXF1ZXN0ZWQgbW9kaWZpZXJcbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpc01vZGlmaWVyUmVxdWlyZWQobW9kaWZpZXJzLCByZXF1ZXN0aW5nTmFtZSwgcmVxdWVzdGVkTmFtZSkge1xuICBjb25zdCByZXF1ZXN0aW5nID0gZmluZChtb2RpZmllcnMsICh7IG5hbWUgfSkgPT4gbmFtZSA9PT0gcmVxdWVzdGluZ05hbWUpO1xuXG4gIGNvbnN0IGlzUmVxdWlyZWQgPSAhIXJlcXVlc3RpbmcgJiYgbW9kaWZpZXJzLnNvbWUobW9kaWZpZXIgPT4ge1xuICAgIHJldHVybiBtb2RpZmllci5uYW1lID09PSByZXF1ZXN0ZWROYW1lICYmIG1vZGlmaWVyLmVuYWJsZWQgJiYgbW9kaWZpZXIub3JkZXIgPCByZXF1ZXN0aW5nLm9yZGVyO1xuICB9KTtcblxuICBpZiAoIWlzUmVxdWlyZWQpIHtcbiAgICBjb25zdCByZXF1ZXN0aW5nID0gYFxcYCR7cmVxdWVzdGluZ05hbWV9XFxgYDtcbiAgICBjb25zdCByZXF1ZXN0ZWQgPSBgXFxgJHtyZXF1ZXN0ZWROYW1lfVxcYGA7XG4gICAgY29uc29sZS53YXJuKGAke3JlcXVlc3RlZH0gbW9kaWZpZXIgaXMgcmVxdWlyZWQgYnkgJHtyZXF1ZXN0aW5nfSBtb2RpZmllciBpbiBvcmRlciB0byB3b3JrLCBiZSBzdXJlIHRvIGluY2x1ZGUgaXQgYmVmb3JlICR7cmVxdWVzdGluZ30hYCk7XG4gIH1cbiAgcmV0dXJuIGlzUmVxdWlyZWQ7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgdXBkYXRlIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBhcnJvdyhkYXRhLCBvcHRpb25zKSB7XG4gIC8vIGFycm93IGRlcGVuZHMgb24ga2VlcFRvZ2V0aGVyIGluIG9yZGVyIHRvIHdvcmtcbiAgaWYgKCFpc01vZGlmaWVyUmVxdWlyZWQoZGF0YS5pbnN0YW5jZS5tb2RpZmllcnMsICdhcnJvdycsICdrZWVwVG9nZXRoZXInKSkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgbGV0IGFycm93RWxlbWVudCA9IG9wdGlvbnMuZWxlbWVudDtcblxuICAvLyBpZiBhcnJvd0VsZW1lbnQgaXMgYSBzdHJpbmcsIHN1cHBvc2UgaXQncyBhIENTUyBzZWxlY3RvclxuICBpZiAodHlwZW9mIGFycm93RWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICBhcnJvd0VsZW1lbnQgPSBkYXRhLmluc3RhbmNlLnBvcHBlci5xdWVyeVNlbGVjdG9yKGFycm93RWxlbWVudCk7XG5cbiAgICAvLyBpZiBhcnJvd0VsZW1lbnQgaXMgbm90IGZvdW5kLCBkb24ndCBydW4gdGhlIG1vZGlmaWVyXG4gICAgaWYgKCFhcnJvd0VsZW1lbnQpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBpZiB0aGUgYXJyb3dFbGVtZW50IGlzbid0IGEgcXVlcnkgc2VsZWN0b3Igd2UgbXVzdCBjaGVjayB0aGF0IHRoZVxuICAgIC8vIHByb3ZpZGVkIERPTSBub2RlIGlzIGNoaWxkIG9mIGl0cyBwb3BwZXIgbm9kZVxuICAgIGlmICghZGF0YS5pbnN0YW5jZS5wb3BwZXIuY29udGFpbnMoYXJyb3dFbGVtZW50KSkge1xuICAgICAgY29uc29sZS53YXJuKCdXQVJOSU5HOiBgYXJyb3cuZWxlbWVudGAgbXVzdCBiZSBjaGlsZCBvZiBpdHMgcG9wcGVyIGVsZW1lbnQhJyk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuICBjb25zdCB7IHBvcHBlciwgcmVmZXJlbmNlIH0gPSBkYXRhLm9mZnNldHM7XG4gIGNvbnN0IGlzVmVydGljYWwgPSBbJ2xlZnQnLCAncmlnaHQnXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xO1xuXG4gIGNvbnN0IGxlbiA9IGlzVmVydGljYWwgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gIGNvbnN0IHNpZGVDYXBpdGFsaXplZCA9IGlzVmVydGljYWwgPyAnVG9wJyA6ICdMZWZ0JztcbiAgY29uc3Qgc2lkZSA9IHNpZGVDYXBpdGFsaXplZC50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBhbHRTaWRlID0gaXNWZXJ0aWNhbCA/ICdsZWZ0JyA6ICd0b3AnO1xuICBjb25zdCBvcFNpZGUgPSBpc1ZlcnRpY2FsID8gJ2JvdHRvbScgOiAncmlnaHQnO1xuICBjb25zdCBhcnJvd0VsZW1lbnRTaXplID0gZ2V0T3V0ZXJTaXplcyhhcnJvd0VsZW1lbnQpW2xlbl07XG5cbiAgLy9cbiAgLy8gZXh0ZW5kcyBrZWVwVG9nZXRoZXIgYmVoYXZpb3IgbWFraW5nIHN1cmUgdGhlIHBvcHBlciBhbmQgaXRzXG4gIC8vIHJlZmVyZW5jZSBoYXZlIGVub3VnaCBwaXhlbHMgaW4gY29uanVjdGlvblxuICAvL1xuXG4gIC8vIHRvcC9sZWZ0IHNpZGVcbiAgaWYgKHJlZmVyZW5jZVtvcFNpZGVdIC0gYXJyb3dFbGVtZW50U2l6ZSA8IHBvcHBlcltzaWRlXSkge1xuICAgIGRhdGEub2Zmc2V0cy5wb3BwZXJbc2lkZV0gLT0gcG9wcGVyW3NpZGVdIC0gKHJlZmVyZW5jZVtvcFNpZGVdIC0gYXJyb3dFbGVtZW50U2l6ZSk7XG4gIH1cbiAgLy8gYm90dG9tL3JpZ2h0IHNpZGVcbiAgaWYgKHJlZmVyZW5jZVtzaWRlXSArIGFycm93RWxlbWVudFNpemUgPiBwb3BwZXJbb3BTaWRlXSkge1xuICAgIGRhdGEub2Zmc2V0cy5wb3BwZXJbc2lkZV0gKz0gcmVmZXJlbmNlW3NpZGVdICsgYXJyb3dFbGVtZW50U2l6ZSAtIHBvcHBlcltvcFNpZGVdO1xuICB9XG5cbiAgLy8gY29tcHV0ZSBjZW50ZXIgb2YgdGhlIHBvcHBlclxuICBjb25zdCBjZW50ZXIgPSByZWZlcmVuY2Vbc2lkZV0gKyByZWZlcmVuY2VbbGVuXSAvIDIgLSBhcnJvd0VsZW1lbnRTaXplIC8gMjtcblxuICAvLyBDb21wdXRlIHRoZSBzaWRlVmFsdWUgdXNpbmcgdGhlIHVwZGF0ZWQgcG9wcGVyIG9mZnNldHNcbiAgLy8gdGFrZSBwb3BwZXIgbWFyZ2luIGluIGFjY291bnQgYmVjYXVzZSB3ZSBkb24ndCBoYXZlIHRoaXMgaW5mbyBhdmFpbGFibGVcbiAgY29uc3QgcG9wcGVyTWFyZ2luU2lkZSA9IGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShkYXRhLmluc3RhbmNlLnBvcHBlciwgYG1hcmdpbiR7c2lkZUNhcGl0YWxpemVkfWApLnJlcGxhY2UoJ3B4JywgJycpO1xuICBsZXQgc2lkZVZhbHVlID0gY2VudGVyIC0gZ2V0Q2xpZW50UmVjdChkYXRhLm9mZnNldHMucG9wcGVyKVtzaWRlXSAtIHBvcHBlck1hcmdpblNpZGU7XG5cbiAgLy8gcHJldmVudCBhcnJvd0VsZW1lbnQgZnJvbSBiZWluZyBwbGFjZWQgbm90IGNvbnRpZ3VvdXNseSB0byBpdHMgcG9wcGVyXG4gIHNpZGVWYWx1ZSA9IE1hdGgubWF4KE1hdGgubWluKHBvcHBlcltsZW5dIC0gYXJyb3dFbGVtZW50U2l6ZSwgc2lkZVZhbHVlKSwgMCk7XG5cbiAgZGF0YS5hcnJvd0VsZW1lbnQgPSBhcnJvd0VsZW1lbnQ7XG4gIGRhdGEub2Zmc2V0cy5hcnJvdyA9IHt9O1xuICBkYXRhLm9mZnNldHMuYXJyb3dbc2lkZV0gPSBNYXRoLnJvdW5kKHNpZGVWYWx1ZSk7XG4gIGRhdGEub2Zmc2V0cy5hcnJvd1thbHRTaWRlXSA9ICcnOyAvLyBtYWtlIHN1cmUgdG8gdW5zZXQgYW55IGV2ZW50dWFsIGFsdFNpZGUgdmFsdWUgZnJvbSB0aGUgRE9NIG5vZGVcblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIG9wcG9zaXRlIHBsYWNlbWVudCB2YXJpYXRpb24gb2YgdGhlIGdpdmVuIG9uZVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IHBsYWNlbWVudCB2YXJpYXRpb25cbiAqIEByZXR1cm5zIHtTdHJpbmd9IGZsaXBwZWQgcGxhY2VtZW50IHZhcmlhdGlvblxuICovXG5mdW5jdGlvbiBnZXRPcHBvc2l0ZVZhcmlhdGlvbih2YXJpYXRpb24pIHtcbiAgaWYgKHZhcmlhdGlvbiA9PT0gJ2VuZCcpIHtcbiAgICByZXR1cm4gJ3N0YXJ0JztcbiAgfSBlbHNlIGlmICh2YXJpYXRpb24gPT09ICdzdGFydCcpIHtcbiAgICByZXR1cm4gJ2VuZCc7XG4gIH1cbiAgcmV0dXJuIHZhcmlhdGlvbjtcbn1cblxuLyoqXG4gKiBMaXN0IG9mIGFjY2VwdGVkIHBsYWNlbWVudHMgdG8gdXNlIGFzIHZhbHVlcyBvZiB0aGUgYHBsYWNlbWVudGAgb3B0aW9uLjxiciAvPlxuICogVmFsaWQgcGxhY2VtZW50cyBhcmU6XG4gKiAtIGBhdXRvYFxuICogLSBgdG9wYFxuICogLSBgcmlnaHRgXG4gKiAtIGBib3R0b21gXG4gKiAtIGBsZWZ0YFxuICpcbiAqIEVhY2ggcGxhY2VtZW50IGNhbiBoYXZlIGEgdmFyaWF0aW9uIGZyb20gdGhpcyBsaXN0OlxuICogLSBgLXN0YXJ0YFxuICogLSBgLWVuZGBcbiAqXG4gKiBWYXJpYXRpb25zIGFyZSBpbnRlcnByZXRlZCBlYXNpbHkgaWYgeW91IHRoaW5rIG9mIHRoZW0gYXMgdGhlIGxlZnQgdG8gcmlnaHRcbiAqIHdyaXR0ZW4gbGFuZ3VhZ2VzLiBIb3Jpem9udGFsbHkgKGB0b3BgIGFuZCBgYm90dG9tYCksIGBzdGFydGAgaXMgbGVmdCBhbmQgYGVuZGBcbiAqIGlzIHJpZ2h0LjxiciAvPlxuICogVmVydGljYWxseSAoYGxlZnRgIGFuZCBgcmlnaHRgKSwgYHN0YXJ0YCBpcyB0b3AgYW5kIGBlbmRgIGlzIGJvdHRvbS5cbiAqXG4gKiBTb21lIHZhbGlkIGV4YW1wbGVzIGFyZTpcbiAqIC0gYHRvcC1lbmRgIChvbiB0b3Agb2YgcmVmZXJlbmNlLCByaWdodCBhbGlnbmVkKVxuICogLSBgcmlnaHQtc3RhcnRgIChvbiByaWdodCBvZiByZWZlcmVuY2UsIHRvcCBhbGlnbmVkKVxuICogLSBgYm90dG9tYCAob24gYm90dG9tLCBjZW50ZXJlZClcbiAqIC0gYGF1dG8tcmlnaHRgIChvbiB0aGUgc2lkZSB3aXRoIG1vcmUgc3BhY2UgYXZhaWxhYmxlLCBhbGlnbm1lbnQgZGVwZW5kcyBieSBwbGFjZW1lbnQpXG4gKlxuICogQHN0YXRpY1xuICogQHR5cGUge0FycmF5fVxuICogQGVudW0ge1N0cmluZ31cbiAqIEByZWFkb25seVxuICogQG1ldGhvZCBwbGFjZW1lbnRzXG4gKiBAbWVtYmVyb2YgUG9wcGVyXG4gKi9cbnZhciBwbGFjZW1lbnRzID0gWydhdXRvLXN0YXJ0JywgJ2F1dG8nLCAnYXV0by1lbmQnLCAndG9wLXN0YXJ0JywgJ3RvcCcsICd0b3AtZW5kJywgJ3JpZ2h0LXN0YXJ0JywgJ3JpZ2h0JywgJ3JpZ2h0LWVuZCcsICdib3R0b20tZW5kJywgJ2JvdHRvbScsICdib3R0b20tc3RhcnQnLCAnbGVmdC1lbmQnLCAnbGVmdCcsICdsZWZ0LXN0YXJ0J107XG5cbi8vIEdldCByaWQgb2YgYGF1dG9gIGBhdXRvLXN0YXJ0YCBhbmQgYGF1dG8tZW5kYFxuY29uc3QgdmFsaWRQbGFjZW1lbnRzID0gcGxhY2VtZW50cy5zbGljZSgzKTtcblxuLyoqXG4gKiBHaXZlbiBhbiBpbml0aWFsIHBsYWNlbWVudCwgcmV0dXJucyBhbGwgdGhlIHN1YnNlcXVlbnQgcGxhY2VtZW50c1xuICogY2xvY2t3aXNlIChvciBjb3VudGVyLWNsb2Nrd2lzZSkuXG4gKlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IHBsYWNlbWVudCAtIEEgdmFsaWQgcGxhY2VtZW50IChpdCBhY2NlcHRzIHZhcmlhdGlvbnMpXG4gKiBAYXJndW1lbnQge0Jvb2xlYW59IGNvdW50ZXIgLSBTZXQgdG8gdHJ1ZSB0byB3YWxrIHRoZSBwbGFjZW1lbnRzIGNvdW50ZXJjbG9ja3dpc2VcbiAqIEByZXR1cm5zIHtBcnJheX0gcGxhY2VtZW50cyBpbmNsdWRpbmcgdGhlaXIgdmFyaWF0aW9uc1xuICovXG5mdW5jdGlvbiBjbG9ja3dpc2UocGxhY2VtZW50LCBjb3VudGVyID0gZmFsc2UpIHtcbiAgY29uc3QgaW5kZXggPSB2YWxpZFBsYWNlbWVudHMuaW5kZXhPZihwbGFjZW1lbnQpO1xuICBjb25zdCBhcnIgPSB2YWxpZFBsYWNlbWVudHMuc2xpY2UoaW5kZXggKyAxKS5jb25jYXQodmFsaWRQbGFjZW1lbnRzLnNsaWNlKDAsIGluZGV4KSk7XG4gIHJldHVybiBjb3VudGVyID8gYXJyLnJldmVyc2UoKSA6IGFycjtcbn1cblxuY29uc3QgQkVIQVZJT1JTID0ge1xuICBGTElQOiAnZmxpcCcsXG4gIENMT0NLV0lTRTogJ2Nsb2Nrd2lzZScsXG4gIENPVU5URVJDTE9DS1dJU0U6ICdjb3VudGVyY2xvY2t3aXNlJ1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSB1cGRhdGUgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGZsaXAoZGF0YSwgb3B0aW9ucykge1xuICAvLyBpZiBgaW5uZXJgIG1vZGlmaWVyIGlzIGVuYWJsZWQsIHdlIGNhbid0IHVzZSB0aGUgYGZsaXBgIG1vZGlmaWVyXG4gIGlmIChpc01vZGlmaWVyRW5hYmxlZChkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgJ2lubmVyJykpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGlmIChkYXRhLmZsaXBwZWQgJiYgZGF0YS5wbGFjZW1lbnQgPT09IGRhdGEub3JpZ2luYWxQbGFjZW1lbnQpIHtcbiAgICAvLyBzZWVtcyBsaWtlIGZsaXAgaXMgdHJ5aW5nIHRvIGxvb3AsIHByb2JhYmx5IHRoZXJlJ3Mgbm90IGVub3VnaCBzcGFjZSBvbiBhbnkgb2YgdGhlIGZsaXBwYWJsZSBzaWRlc1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgY29uc3QgYm91bmRhcmllcyA9IGdldEJvdW5kYXJpZXMoZGF0YS5pbnN0YW5jZS5wb3BwZXIsIGRhdGEuaW5zdGFuY2UucmVmZXJlbmNlLCBvcHRpb25zLnBhZGRpbmcsIG9wdGlvbnMuYm91bmRhcmllc0VsZW1lbnQpO1xuXG4gIGxldCBwbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuICBsZXQgcGxhY2VtZW50T3Bwb3NpdGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICBsZXQgdmFyaWF0aW9uID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVsxXSB8fCAnJztcblxuICBsZXQgZmxpcE9yZGVyID0gW107XG5cbiAgc3dpdGNoIChvcHRpb25zLmJlaGF2aW9yKSB7XG4gICAgY2FzZSBCRUhBVklPUlMuRkxJUDpcbiAgICAgIGZsaXBPcmRlciA9IFtwbGFjZW1lbnQsIHBsYWNlbWVudE9wcG9zaXRlXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQkVIQVZJT1JTLkNMT0NLV0lTRTpcbiAgICAgIGZsaXBPcmRlciA9IGNsb2Nrd2lzZShwbGFjZW1lbnQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBCRUhBVklPUlMuQ09VTlRFUkNMT0NLV0lTRTpcbiAgICAgIGZsaXBPcmRlciA9IGNsb2Nrd2lzZShwbGFjZW1lbnQsIHRydWUpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGZsaXBPcmRlciA9IG9wdGlvbnMuYmVoYXZpb3I7XG4gIH1cblxuICBmbGlwT3JkZXIuZm9yRWFjaCgoc3RlcCwgaW5kZXgpID0+IHtcbiAgICBpZiAocGxhY2VtZW50ICE9PSBzdGVwIHx8IGZsaXBPcmRlci5sZW5ndGggPT09IGluZGV4ICsgMSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbiAgICBwbGFjZW1lbnRPcHBvc2l0ZSA9IGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCk7XG5cbiAgICBjb25zdCBwb3BwZXJPZmZzZXRzID0gZGF0YS5vZmZzZXRzLnBvcHBlcjtcbiAgICBjb25zdCByZWZPZmZzZXRzID0gZGF0YS5vZmZzZXRzLnJlZmVyZW5jZTtcblxuICAgIC8vIHVzaW5nIGZsb29yIGJlY2F1c2UgdGhlIHJlZmVyZW5jZSBvZmZzZXRzIG1heSBjb250YWluIGRlY2ltYWxzIHdlIGFyZSBub3QgZ29pbmcgdG8gY29uc2lkZXIgaGVyZVxuICAgIGNvbnN0IGZsb29yID0gTWF0aC5mbG9vcjtcbiAgICBjb25zdCBvdmVybGFwc1JlZiA9IHBsYWNlbWVudCA9PT0gJ2xlZnQnICYmIGZsb29yKHBvcHBlck9mZnNldHMucmlnaHQpID4gZmxvb3IocmVmT2Zmc2V0cy5sZWZ0KSB8fCBwbGFjZW1lbnQgPT09ICdyaWdodCcgJiYgZmxvb3IocG9wcGVyT2Zmc2V0cy5sZWZ0KSA8IGZsb29yKHJlZk9mZnNldHMucmlnaHQpIHx8IHBsYWNlbWVudCA9PT0gJ3RvcCcgJiYgZmxvb3IocG9wcGVyT2Zmc2V0cy5ib3R0b20pID4gZmxvb3IocmVmT2Zmc2V0cy50b3ApIHx8IHBsYWNlbWVudCA9PT0gJ2JvdHRvbScgJiYgZmxvb3IocG9wcGVyT2Zmc2V0cy50b3ApIDwgZmxvb3IocmVmT2Zmc2V0cy5ib3R0b20pO1xuXG4gICAgY29uc3Qgb3ZlcmZsb3dzTGVmdCA9IGZsb29yKHBvcHBlck9mZnNldHMubGVmdCkgPCBmbG9vcihib3VuZGFyaWVzLmxlZnQpO1xuICAgIGNvbnN0IG92ZXJmbG93c1JpZ2h0ID0gZmxvb3IocG9wcGVyT2Zmc2V0cy5yaWdodCkgPiBmbG9vcihib3VuZGFyaWVzLnJpZ2h0KTtcbiAgICBjb25zdCBvdmVyZmxvd3NUb3AgPSBmbG9vcihwb3BwZXJPZmZzZXRzLnRvcCkgPCBmbG9vcihib3VuZGFyaWVzLnRvcCk7XG4gICAgY29uc3Qgb3ZlcmZsb3dzQm90dG9tID0gZmxvb3IocG9wcGVyT2Zmc2V0cy5ib3R0b20pID4gZmxvb3IoYm91bmRhcmllcy5ib3R0b20pO1xuXG4gICAgY29uc3Qgb3ZlcmZsb3dzQm91bmRhcmllcyA9IHBsYWNlbWVudCA9PT0gJ2xlZnQnICYmIG92ZXJmbG93c0xlZnQgfHwgcGxhY2VtZW50ID09PSAncmlnaHQnICYmIG92ZXJmbG93c1JpZ2h0IHx8IHBsYWNlbWVudCA9PT0gJ3RvcCcgJiYgb3ZlcmZsb3dzVG9wIHx8IHBsYWNlbWVudCA9PT0gJ2JvdHRvbScgJiYgb3ZlcmZsb3dzQm90dG9tO1xuXG4gICAgLy8gZmxpcCB0aGUgdmFyaWF0aW9uIGlmIHJlcXVpcmVkXG4gICAgY29uc3QgaXNWZXJ0aWNhbCA9IFsndG9wJywgJ2JvdHRvbSddLmluZGV4T2YocGxhY2VtZW50KSAhPT0gLTE7XG4gICAgY29uc3QgZmxpcHBlZFZhcmlhdGlvbiA9ICEhb3B0aW9ucy5mbGlwVmFyaWF0aW9ucyAmJiAoaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdzdGFydCcgJiYgb3ZlcmZsb3dzTGVmdCB8fCBpc1ZlcnRpY2FsICYmIHZhcmlhdGlvbiA9PT0gJ2VuZCcgJiYgb3ZlcmZsb3dzUmlnaHQgfHwgIWlzVmVydGljYWwgJiYgdmFyaWF0aW9uID09PSAnc3RhcnQnICYmIG92ZXJmbG93c1RvcCB8fCAhaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdlbmQnICYmIG92ZXJmbG93c0JvdHRvbSk7XG5cbiAgICBpZiAob3ZlcmxhcHNSZWYgfHwgb3ZlcmZsb3dzQm91bmRhcmllcyB8fCBmbGlwcGVkVmFyaWF0aW9uKSB7XG4gICAgICAvLyB0aGlzIGJvb2xlYW4gdG8gZGV0ZWN0IGFueSBmbGlwIGxvb3BcbiAgICAgIGRhdGEuZmxpcHBlZCA9IHRydWU7XG5cbiAgICAgIGlmIChvdmVybGFwc1JlZiB8fCBvdmVyZmxvd3NCb3VuZGFyaWVzKSB7XG4gICAgICAgIHBsYWNlbWVudCA9IGZsaXBPcmRlcltpbmRleCArIDFdO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmxpcHBlZFZhcmlhdGlvbikge1xuICAgICAgICB2YXJpYXRpb24gPSBnZXRPcHBvc2l0ZVZhcmlhdGlvbih2YXJpYXRpb24pO1xuICAgICAgfVxuXG4gICAgICBkYXRhLnBsYWNlbWVudCA9IHBsYWNlbWVudCArICh2YXJpYXRpb24gPyAnLScgKyB2YXJpYXRpb24gOiAnJyk7XG5cbiAgICAgIC8vIHRoaXMgb2JqZWN0IGNvbnRhaW5zIGBwb3NpdGlvbmAsIHdlIHdhbnQgdG8gcHJlc2VydmUgaXQgYWxvbmcgd2l0aFxuICAgICAgLy8gYW55IGFkZGl0aW9uYWwgcHJvcGVydHkgd2UgbWF5IGFkZCBpbiB0aGUgZnV0dXJlXG4gICAgICBkYXRhLm9mZnNldHMucG9wcGVyID0gX2V4dGVuZHMoe30sIGRhdGEub2Zmc2V0cy5wb3BwZXIsIGdldFBvcHBlck9mZnNldHMoZGF0YS5pbnN0YW5jZS5wb3BwZXIsIGRhdGEub2Zmc2V0cy5yZWZlcmVuY2UsIGRhdGEucGxhY2VtZW50KSk7XG5cbiAgICAgIGRhdGEgPSBydW5Nb2RpZmllcnMoZGF0YS5pbnN0YW5jZS5tb2RpZmllcnMsIGRhdGEsICdmbGlwJyk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgdXBkYXRlIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBrZWVwVG9nZXRoZXIoZGF0YSkge1xuICBjb25zdCB7IHBvcHBlciwgcmVmZXJlbmNlIH0gPSBkYXRhLm9mZnNldHM7XG4gIGNvbnN0IHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50LnNwbGl0KCctJylbMF07XG4gIGNvbnN0IGZsb29yID0gTWF0aC5mbG9vcjtcbiAgY29uc3QgaXNWZXJ0aWNhbCA9IFsndG9wJywgJ2JvdHRvbSddLmluZGV4T2YocGxhY2VtZW50KSAhPT0gLTE7XG4gIGNvbnN0IHNpZGUgPSBpc1ZlcnRpY2FsID8gJ3JpZ2h0JyA6ICdib3R0b20nO1xuICBjb25zdCBvcFNpZGUgPSBpc1ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XG4gIGNvbnN0IG1lYXN1cmVtZW50ID0gaXNWZXJ0aWNhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcblxuICBpZiAocG9wcGVyW3NpZGVdIDwgZmxvb3IocmVmZXJlbmNlW29wU2lkZV0pKSB7XG4gICAgZGF0YS5vZmZzZXRzLnBvcHBlcltvcFNpZGVdID0gZmxvb3IocmVmZXJlbmNlW29wU2lkZV0pIC0gcG9wcGVyW21lYXN1cmVtZW50XTtcbiAgfVxuICBpZiAocG9wcGVyW29wU2lkZV0gPiBmbG9vcihyZWZlcmVuY2Vbc2lkZV0pKSB7XG4gICAgZGF0YS5vZmZzZXRzLnBvcHBlcltvcFNpZGVdID0gZmxvb3IocmVmZXJlbmNlW3NpZGVdKTtcbiAgfVxuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgc3RyaW5nIGNvbnRhaW5pbmcgdmFsdWUgKyB1bml0IGludG8gYSBweCB2YWx1ZSBudW1iZXJcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIHttb2RpZmllcnN+b2Zmc2V0fVxuICogQHByaXZhdGVcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBzdHIgLSBWYWx1ZSArIHVuaXQgc3RyaW5nXG4gKiBAYXJndW1lbnQge1N0cmluZ30gbWVhc3VyZW1lbnQgLSBgaGVpZ2h0YCBvciBgd2lkdGhgXG4gKiBAYXJndW1lbnQge09iamVjdH0gcG9wcGVyT2Zmc2V0c1xuICogQGFyZ3VtZW50IHtPYmplY3R9IHJlZmVyZW5jZU9mZnNldHNcbiAqIEByZXR1cm5zIHtOdW1iZXJ8U3RyaW5nfVxuICogVmFsdWUgaW4gcGl4ZWxzLCBvciBvcmlnaW5hbCBzdHJpbmcgaWYgbm8gdmFsdWVzIHdlcmUgZXh0cmFjdGVkXG4gKi9cbmZ1bmN0aW9uIHRvVmFsdWUoc3RyLCBtZWFzdXJlbWVudCwgcG9wcGVyT2Zmc2V0cywgcmVmZXJlbmNlT2Zmc2V0cykge1xuICAvLyBzZXBhcmF0ZSB2YWx1ZSBmcm9tIHVuaXRcbiAgY29uc3Qgc3BsaXQgPSBzdHIubWF0Y2goLygoPzpcXC18XFwrKT9cXGQqXFwuP1xcZCopKC4qKS8pO1xuICBjb25zdCB2YWx1ZSA9ICtzcGxpdFsxXTtcbiAgY29uc3QgdW5pdCA9IHNwbGl0WzJdO1xuXG4gIC8vIElmIGl0J3Mgbm90IGEgbnVtYmVyIGl0J3MgYW4gb3BlcmF0b3IsIEkgZ3Vlc3NcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICBpZiAodW5pdC5pbmRleE9mKCclJykgPT09IDApIHtcbiAgICBsZXQgZWxlbWVudDtcbiAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgIGNhc2UgJyVwJzpcbiAgICAgICAgZWxlbWVudCA9IHBvcHBlck9mZnNldHM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnJSc6XG4gICAgICBjYXNlICclcic6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBlbGVtZW50ID0gcmVmZXJlbmNlT2Zmc2V0cztcbiAgICB9XG5cbiAgICBjb25zdCByZWN0ID0gZ2V0Q2xpZW50UmVjdChlbGVtZW50KTtcbiAgICByZXR1cm4gcmVjdFttZWFzdXJlbWVudF0gLyAxMDAgKiB2YWx1ZTtcbiAgfSBlbHNlIGlmICh1bml0ID09PSAndmgnIHx8IHVuaXQgPT09ICd2dycpIHtcbiAgICAvLyBpZiBpcyBhIHZoIG9yIHZ3LCB3ZSBjYWxjdWxhdGUgdGhlIHNpemUgYmFzZWQgb24gdGhlIHZpZXdwb3J0XG4gICAgbGV0IHNpemU7XG4gICAgaWYgKHVuaXQgPT09ICd2aCcpIHtcbiAgICAgIHNpemUgPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNpemUgPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xuICAgIH1cbiAgICByZXR1cm4gc2l6ZSAvIDEwMCAqIHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIC8vIGlmIGlzIGFuIGV4cGxpY2l0IHBpeGVsIHVuaXQsIHdlIGdldCByaWQgb2YgdGhlIHVuaXQgYW5kIGtlZXAgdGhlIHZhbHVlXG4gICAgLy8gaWYgaXMgYW4gaW1wbGljaXQgdW5pdCwgaXQncyBweCwgYW5kIHdlIHJldHVybiBqdXN0IHRoZSB2YWx1ZVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuXG4vKipcbiAqIFBhcnNlIGFuIGBvZmZzZXRgIHN0cmluZyB0byBleHRyYXBvbGF0ZSBgeGAgYW5kIGB5YCBudW1lcmljIG9mZnNldHMuXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiB7bW9kaWZpZXJzfm9mZnNldH1cbiAqIEBwcml2YXRlXG4gKiBAYXJndW1lbnQge1N0cmluZ30gb2Zmc2V0XG4gKiBAYXJndW1lbnQge09iamVjdH0gcG9wcGVyT2Zmc2V0c1xuICogQGFyZ3VtZW50IHtPYmplY3R9IHJlZmVyZW5jZU9mZnNldHNcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBiYXNlUGxhY2VtZW50XG4gKiBAcmV0dXJucyB7QXJyYXl9IGEgdHdvIGNlbGxzIGFycmF5IHdpdGggeCBhbmQgeSBvZmZzZXRzIGluIG51bWJlcnNcbiAqL1xuZnVuY3Rpb24gcGFyc2VPZmZzZXQob2Zmc2V0LCBwb3BwZXJPZmZzZXRzLCByZWZlcmVuY2VPZmZzZXRzLCBiYXNlUGxhY2VtZW50KSB7XG4gIGNvbnN0IG9mZnNldHMgPSBbMCwgMF07XG5cbiAgLy8gVXNlIGhlaWdodCBpZiBwbGFjZW1lbnQgaXMgbGVmdCBvciByaWdodCBhbmQgaW5kZXggaXMgMCBvdGhlcndpc2UgdXNlIHdpZHRoXG4gIC8vIGluIHRoaXMgd2F5IHRoZSBmaXJzdCBvZmZzZXQgd2lsbCB1c2UgYW4gYXhpcyBhbmQgdGhlIHNlY29uZCBvbmVcbiAgLy8gd2lsbCB1c2UgdGhlIG90aGVyIG9uZVxuICBjb25zdCB1c2VIZWlnaHQgPSBbJ3JpZ2h0JywgJ2xlZnQnXS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpICE9PSAtMTtcblxuICAvLyBTcGxpdCB0aGUgb2Zmc2V0IHN0cmluZyB0byBvYnRhaW4gYSBsaXN0IG9mIHZhbHVlcyBhbmQgb3BlcmFuZHNcbiAgLy8gVGhlIHJlZ2V4IGFkZHJlc3NlcyB2YWx1ZXMgd2l0aCB0aGUgcGx1cyBvciBtaW51cyBzaWduIGluIGZyb250ICgrMTAsIC0yMCwgZXRjKVxuICBjb25zdCBmcmFnbWVudHMgPSBvZmZzZXQuc3BsaXQoLyhcXCt8XFwtKS8pLm1hcChmcmFnID0+IGZyYWcudHJpbSgpKTtcblxuICAvLyBEZXRlY3QgaWYgdGhlIG9mZnNldCBzdHJpbmcgY29udGFpbnMgYSBwYWlyIG9mIHZhbHVlcyBvciBhIHNpbmdsZSBvbmVcbiAgLy8gdGhleSBjb3VsZCBiZSBzZXBhcmF0ZWQgYnkgY29tbWEgb3Igc3BhY2VcbiAgY29uc3QgZGl2aWRlciA9IGZyYWdtZW50cy5pbmRleE9mKGZpbmQoZnJhZ21lbnRzLCBmcmFnID0+IGZyYWcuc2VhcmNoKC8sfFxccy8pICE9PSAtMSkpO1xuXG4gIGlmIChmcmFnbWVudHNbZGl2aWRlcl0gJiYgZnJhZ21lbnRzW2RpdmlkZXJdLmluZGV4T2YoJywnKSA9PT0gLTEpIHtcbiAgICBjb25zb2xlLndhcm4oJ09mZnNldHMgc2VwYXJhdGVkIGJ5IHdoaXRlIHNwYWNlKHMpIGFyZSBkZXByZWNhdGVkLCB1c2UgYSBjb21tYSAoLCkgaW5zdGVhZC4nKTtcbiAgfVxuXG4gIC8vIElmIGRpdmlkZXIgaXMgZm91bmQsIHdlIGRpdmlkZSB0aGUgbGlzdCBvZiB2YWx1ZXMgYW5kIG9wZXJhbmRzIHRvIGRpdmlkZVxuICAvLyB0aGVtIGJ5IG9mc2V0IFggYW5kIFkuXG4gIGNvbnN0IHNwbGl0UmVnZXggPSAvXFxzKixcXHMqfFxccysvO1xuICBsZXQgb3BzID0gZGl2aWRlciAhPT0gLTEgPyBbZnJhZ21lbnRzLnNsaWNlKDAsIGRpdmlkZXIpLmNvbmNhdChbZnJhZ21lbnRzW2RpdmlkZXJdLnNwbGl0KHNwbGl0UmVnZXgpWzBdXSksIFtmcmFnbWVudHNbZGl2aWRlcl0uc3BsaXQoc3BsaXRSZWdleClbMV1dLmNvbmNhdChmcmFnbWVudHMuc2xpY2UoZGl2aWRlciArIDEpKV0gOiBbZnJhZ21lbnRzXTtcblxuICAvLyBDb252ZXJ0IHRoZSB2YWx1ZXMgd2l0aCB1bml0cyB0byBhYnNvbHV0ZSBwaXhlbHMgdG8gYWxsb3cgb3VyIGNvbXB1dGF0aW9uc1xuICBvcHMgPSBvcHMubWFwKChvcCwgaW5kZXgpID0+IHtcbiAgICAvLyBNb3N0IG9mIHRoZSB1bml0cyByZWx5IG9uIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgcG9wcGVyXG4gICAgY29uc3QgbWVhc3VyZW1lbnQgPSAoaW5kZXggPT09IDEgPyAhdXNlSGVpZ2h0IDogdXNlSGVpZ2h0KSA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICBsZXQgbWVyZ2VXaXRoUHJldmlvdXMgPSBmYWxzZTtcbiAgICByZXR1cm4gb3BcbiAgICAvLyBUaGlzIGFnZ3JlZ2F0ZXMgYW55IGArYCBvciBgLWAgc2lnbiB0aGF0IGFyZW4ndCBjb25zaWRlcmVkIG9wZXJhdG9yc1xuICAgIC8vIGUuZy46IDEwICsgKzUgPT4gWzEwLCArLCArNV1cbiAgICAucmVkdWNlKChhLCBiKSA9PiB7XG4gICAgICBpZiAoYVthLmxlbmd0aCAtIDFdID09PSAnJyAmJiBbJysnLCAnLSddLmluZGV4T2YoYikgIT09IC0xKSB7XG4gICAgICAgIGFbYS5sZW5ndGggLSAxXSA9IGI7XG4gICAgICAgIG1lcmdlV2l0aFByZXZpb3VzID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgICB9IGVsc2UgaWYgKG1lcmdlV2l0aFByZXZpb3VzKSB7XG4gICAgICAgIGFbYS5sZW5ndGggLSAxXSArPSBiO1xuICAgICAgICBtZXJnZVdpdGhQcmV2aW91cyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gYTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAgICAgIH1cbiAgICB9LCBbXSlcbiAgICAvLyBIZXJlIHdlIGNvbnZlcnQgdGhlIHN0cmluZyB2YWx1ZXMgaW50byBudW1iZXIgdmFsdWVzIChpbiBweClcbiAgICAubWFwKHN0ciA9PiB0b1ZhbHVlKHN0ciwgbWVhc3VyZW1lbnQsIHBvcHBlck9mZnNldHMsIHJlZmVyZW5jZU9mZnNldHMpKTtcbiAgfSk7XG5cbiAgLy8gTG9vcCB0cm91Z2ggdGhlIG9mZnNldHMgYXJyYXlzIGFuZCBleGVjdXRlIHRoZSBvcGVyYXRpb25zXG4gIG9wcy5mb3JFYWNoKChvcCwgaW5kZXgpID0+IHtcbiAgICBvcC5mb3JFYWNoKChmcmFnLCBpbmRleDIpID0+IHtcbiAgICAgIGlmIChpc051bWVyaWMoZnJhZykpIHtcbiAgICAgICAgb2Zmc2V0c1tpbmRleF0gKz0gZnJhZyAqIChvcFtpbmRleDIgLSAxXSA9PT0gJy0nID8gLTEgOiAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBvZmZzZXRzO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IHVwZGF0ZSBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEBhcmd1bWVudCB7TnVtYmVyfFN0cmluZ30gb3B0aW9ucy5vZmZzZXQ9MFxuICogVGhlIG9mZnNldCB2YWx1ZSBhcyBkZXNjcmliZWQgaW4gdGhlIG1vZGlmaWVyIGRlc2NyaXB0aW9uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIG9mZnNldChkYXRhLCB7IG9mZnNldCB9KSB7XG4gIGNvbnN0IHsgcGxhY2VtZW50LCBvZmZzZXRzOiB7IHBvcHBlciwgcmVmZXJlbmNlIH0gfSA9IGRhdGE7XG4gIGNvbnN0IGJhc2VQbGFjZW1lbnQgPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcblxuICBsZXQgb2Zmc2V0cztcbiAgaWYgKGlzTnVtZXJpYygrb2Zmc2V0KSkge1xuICAgIG9mZnNldHMgPSBbK29mZnNldCwgMF07XG4gIH0gZWxzZSB7XG4gICAgb2Zmc2V0cyA9IHBhcnNlT2Zmc2V0KG9mZnNldCwgcG9wcGVyLCByZWZlcmVuY2UsIGJhc2VQbGFjZW1lbnQpO1xuICB9XG5cbiAgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICdsZWZ0Jykge1xuICAgIHBvcHBlci50b3AgKz0gb2Zmc2V0c1swXTtcbiAgICBwb3BwZXIubGVmdCAtPSBvZmZzZXRzWzFdO1xuICB9IGVsc2UgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICdyaWdodCcpIHtcbiAgICBwb3BwZXIudG9wICs9IG9mZnNldHNbMF07XG4gICAgcG9wcGVyLmxlZnQgKz0gb2Zmc2V0c1sxXTtcbiAgfSBlbHNlIGlmIChiYXNlUGxhY2VtZW50ID09PSAndG9wJykge1xuICAgIHBvcHBlci5sZWZ0ICs9IG9mZnNldHNbMF07XG4gICAgcG9wcGVyLnRvcCAtPSBvZmZzZXRzWzFdO1xuICB9IGVsc2UgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICdib3R0b20nKSB7XG4gICAgcG9wcGVyLmxlZnQgKz0gb2Zmc2V0c1swXTtcbiAgICBwb3BwZXIudG9wICs9IG9mZnNldHNbMV07XG4gIH1cblxuICBkYXRhLnBvcHBlciA9IHBvcHBlcjtcbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgYHVwZGF0ZWAgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIHByZXZlbnRPdmVyZmxvdyhkYXRhLCBvcHRpb25zKSB7XG4gIGxldCBib3VuZGFyaWVzRWxlbWVudCA9IG9wdGlvbnMuYm91bmRhcmllc0VsZW1lbnQgfHwgZ2V0T2Zmc2V0UGFyZW50KGRhdGEuaW5zdGFuY2UucG9wcGVyKTtcblxuICAvLyBJZiBvZmZzZXRQYXJlbnQgaXMgdGhlIHJlZmVyZW5jZSBlbGVtZW50LCB3ZSByZWFsbHkgd2FudCB0b1xuICAvLyBnbyBvbmUgc3RlcCB1cCBhbmQgdXNlIHRoZSBuZXh0IG9mZnNldFBhcmVudCBhcyByZWZlcmVuY2UgdG9cbiAgLy8gYXZvaWQgdG8gbWFrZSB0aGlzIG1vZGlmaWVyIGNvbXBsZXRlbHkgdXNlbGVzcyBhbmQgbG9vayBsaWtlIGJyb2tlblxuICBpZiAoZGF0YS5pbnN0YW5jZS5yZWZlcmVuY2UgPT09IGJvdW5kYXJpZXNFbGVtZW50KSB7XG4gICAgYm91bmRhcmllc0VsZW1lbnQgPSBnZXRPZmZzZXRQYXJlbnQoYm91bmRhcmllc0VsZW1lbnQpO1xuICB9XG5cbiAgY29uc3QgYm91bmRhcmllcyA9IGdldEJvdW5kYXJpZXMoZGF0YS5pbnN0YW5jZS5wb3BwZXIsIGRhdGEuaW5zdGFuY2UucmVmZXJlbmNlLCBvcHRpb25zLnBhZGRpbmcsIGJvdW5kYXJpZXNFbGVtZW50KTtcbiAgb3B0aW9ucy5ib3VuZGFyaWVzID0gYm91bmRhcmllcztcblxuICBjb25zdCBvcmRlciA9IG9wdGlvbnMucHJpb3JpdHk7XG4gIGxldCBwb3BwZXIgPSBkYXRhLm9mZnNldHMucG9wcGVyO1xuXG4gIGNvbnN0IGNoZWNrID0ge1xuICAgIHByaW1hcnkocGxhY2VtZW50KSB7XG4gICAgICBsZXQgdmFsdWUgPSBwb3BwZXJbcGxhY2VtZW50XTtcbiAgICAgIGlmIChwb3BwZXJbcGxhY2VtZW50XSA8IGJvdW5kYXJpZXNbcGxhY2VtZW50XSAmJiAhb3B0aW9ucy5lc2NhcGVXaXRoUmVmZXJlbmNlKSB7XG4gICAgICAgIHZhbHVlID0gTWF0aC5tYXgocG9wcGVyW3BsYWNlbWVudF0sIGJvdW5kYXJpZXNbcGxhY2VtZW50XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4geyBbcGxhY2VtZW50XTogdmFsdWUgfTtcbiAgICB9LFxuICAgIHNlY29uZGFyeShwbGFjZW1lbnQpIHtcbiAgICAgIGNvbnN0IG1haW5TaWRlID0gcGxhY2VtZW50ID09PSAncmlnaHQnID8gJ2xlZnQnIDogJ3RvcCc7XG4gICAgICBsZXQgdmFsdWUgPSBwb3BwZXJbbWFpblNpZGVdO1xuICAgICAgaWYgKHBvcHBlcltwbGFjZW1lbnRdID4gYm91bmRhcmllc1twbGFjZW1lbnRdICYmICFvcHRpb25zLmVzY2FwZVdpdGhSZWZlcmVuY2UpIHtcbiAgICAgICAgdmFsdWUgPSBNYXRoLm1pbihwb3BwZXJbbWFpblNpZGVdLCBib3VuZGFyaWVzW3BsYWNlbWVudF0gLSAocGxhY2VtZW50ID09PSAncmlnaHQnID8gcG9wcGVyLndpZHRoIDogcG9wcGVyLmhlaWdodCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgW21haW5TaWRlXTogdmFsdWUgfTtcbiAgICB9XG4gIH07XG5cbiAgb3JkZXIuZm9yRWFjaChwbGFjZW1lbnQgPT4ge1xuICAgIGNvbnN0IHNpZGUgPSBbJ2xlZnQnLCAndG9wJ10uaW5kZXhPZihwbGFjZW1lbnQpICE9PSAtMSA/ICdwcmltYXJ5JyA6ICdzZWNvbmRhcnknO1xuICAgIHBvcHBlciA9IF9leHRlbmRzKHt9LCBwb3BwZXIsIGNoZWNrW3NpZGVdKHBsYWNlbWVudCkpO1xuICB9KTtcblxuICBkYXRhLm9mZnNldHMucG9wcGVyID0gcG9wcGVyO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBzaGlmdChkYXRhKSB7XG4gIGNvbnN0IHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50O1xuICBjb25zdCBiYXNlUGxhY2VtZW50ID0gcGxhY2VtZW50LnNwbGl0KCctJylbMF07XG4gIGNvbnN0IHNoaWZ0dmFyaWF0aW9uID0gcGxhY2VtZW50LnNwbGl0KCctJylbMV07XG5cbiAgLy8gaWYgc2hpZnQgc2hpZnR2YXJpYXRpb24gaXMgc3BlY2lmaWVkLCBydW4gdGhlIG1vZGlmaWVyXG4gIGlmIChzaGlmdHZhcmlhdGlvbikge1xuICAgIGNvbnN0IHsgcmVmZXJlbmNlLCBwb3BwZXIgfSA9IGRhdGEub2Zmc2V0cztcbiAgICBjb25zdCBpc1ZlcnRpY2FsID0gWydib3R0b20nLCAndG9wJ10uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG4gICAgY29uc3Qgc2lkZSA9IGlzVmVydGljYWwgPyAnbGVmdCcgOiAndG9wJztcbiAgICBjb25zdCBtZWFzdXJlbWVudCA9IGlzVmVydGljYWwgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG5cbiAgICBjb25zdCBzaGlmdE9mZnNldHMgPSB7XG4gICAgICBzdGFydDogeyBbc2lkZV06IHJlZmVyZW5jZVtzaWRlXSB9LFxuICAgICAgZW5kOiB7XG4gICAgICAgIFtzaWRlXTogcmVmZXJlbmNlW3NpZGVdICsgcmVmZXJlbmNlW21lYXN1cmVtZW50XSAtIHBvcHBlclttZWFzdXJlbWVudF1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IF9leHRlbmRzKHt9LCBwb3BwZXIsIHNoaWZ0T2Zmc2V0c1tzaGlmdHZhcmlhdGlvbl0pO1xuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgdXBkYXRlIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBoaWRlKGRhdGEpIHtcbiAgaWYgKCFpc01vZGlmaWVyUmVxdWlyZWQoZGF0YS5pbnN0YW5jZS5tb2RpZmllcnMsICdoaWRlJywgJ3ByZXZlbnRPdmVyZmxvdycpKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBjb25zdCByZWZSZWN0ID0gZGF0YS5vZmZzZXRzLnJlZmVyZW5jZTtcbiAgY29uc3QgYm91bmQgPSBmaW5kKGRhdGEuaW5zdGFuY2UubW9kaWZpZXJzLCBtb2RpZmllciA9PiBtb2RpZmllci5uYW1lID09PSAncHJldmVudE92ZXJmbG93JykuYm91bmRhcmllcztcblxuICBpZiAocmVmUmVjdC5ib3R0b20gPCBib3VuZC50b3AgfHwgcmVmUmVjdC5sZWZ0ID4gYm91bmQucmlnaHQgfHwgcmVmUmVjdC50b3AgPiBib3VuZC5ib3R0b20gfHwgcmVmUmVjdC5yaWdodCA8IGJvdW5kLmxlZnQpIHtcbiAgICAvLyBBdm9pZCB1bm5lY2Vzc2FyeSBET00gYWNjZXNzIGlmIHZpc2liaWxpdHkgaGFzbid0IGNoYW5nZWRcbiAgICBpZiAoZGF0YS5oaWRlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBkYXRhLmhpZGUgPSB0cnVlO1xuICAgIGRhdGEuYXR0cmlidXRlc1sneC1vdXQtb2YtYm91bmRhcmllcyddID0gJyc7XG4gIH0gZWxzZSB7XG4gICAgLy8gQXZvaWQgdW5uZWNlc3NhcnkgRE9NIGFjY2VzcyBpZiB2aXNpYmlsaXR5IGhhc24ndCBjaGFuZ2VkXG4gICAgaWYgKGRhdGEuaGlkZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGRhdGEuaGlkZSA9IGZhbHNlO1xuICAgIGRhdGEuYXR0cmlidXRlc1sneC1vdXQtb2YtYm91bmRhcmllcyddID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSBgdXBkYXRlYCBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gaW5uZXIoZGF0YSkge1xuICBjb25zdCBwbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudDtcbiAgY29uc3QgYmFzZVBsYWNlbWVudCA9IHBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuICBjb25zdCB7IHBvcHBlciwgcmVmZXJlbmNlIH0gPSBkYXRhLm9mZnNldHM7XG4gIGNvbnN0IGlzSG9yaXogPSBbJ2xlZnQnLCAncmlnaHQnXS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpICE9PSAtMTtcblxuICBjb25zdCBzdWJ0cmFjdExlbmd0aCA9IFsndG9wJywgJ2xlZnQnXS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID09PSAtMTtcblxuICBwb3BwZXJbaXNIb3JpeiA/ICdsZWZ0JyA6ICd0b3AnXSA9IHJlZmVyZW5jZVtiYXNlUGxhY2VtZW50XSAtIChzdWJ0cmFjdExlbmd0aCA/IHBvcHBlcltpc0hvcml6ID8gJ3dpZHRoJyA6ICdoZWlnaHQnXSA6IDApO1xuXG4gIGRhdGEucGxhY2VtZW50ID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQocGxhY2VtZW50KTtcbiAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IGdldENsaWVudFJlY3QocG9wcGVyKTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBNb2RpZmllciBmdW5jdGlvbiwgZWFjaCBtb2RpZmllciBjYW4gaGF2ZSBhIGZ1bmN0aW9uIG9mIHRoaXMgdHlwZSBhc3NpZ25lZFxuICogdG8gaXRzIGBmbmAgcHJvcGVydHkuPGJyIC8+XG4gKiBUaGVzZSBmdW5jdGlvbnMgd2lsbCBiZSBjYWxsZWQgb24gZWFjaCB1cGRhdGUsIHRoaXMgbWVhbnMgdGhhdCB5b3UgbXVzdFxuICogbWFrZSBzdXJlIHRoZXkgYXJlIHBlcmZvcm1hbnQgZW5vdWdoIHRvIGF2b2lkIHBlcmZvcm1hbmNlIGJvdHRsZW5lY2tzLlxuICpcbiAqIEBmdW5jdGlvbiBNb2RpZmllckZuXG4gKiBAYXJndW1lbnQge2RhdGFPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge2RhdGFPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuXG4vKipcbiAqIE1vZGlmaWVycyBhcmUgcGx1Z2lucyB1c2VkIHRvIGFsdGVyIHRoZSBiZWhhdmlvciBvZiB5b3VyIHBvcHBlcnMuPGJyIC8+XG4gKiBQb3BwZXIuanMgdXNlcyBhIHNldCBvZiA5IG1vZGlmaWVycyB0byBwcm92aWRlIGFsbCB0aGUgYmFzaWMgZnVuY3Rpb25hbGl0aWVzXG4gKiBuZWVkZWQgYnkgdGhlIGxpYnJhcnkuXG4gKlxuICogVXN1YWxseSB5b3UgZG9uJ3Qgd2FudCB0byBvdmVycmlkZSB0aGUgYG9yZGVyYCwgYGZuYCBhbmQgYG9uTG9hZGAgcHJvcHMuXG4gKiBBbGwgdGhlIG90aGVyIHByb3BlcnRpZXMgYXJlIGNvbmZpZ3VyYXRpb25zIHRoYXQgY291bGQgYmUgdHdlYWtlZC5cbiAqIEBuYW1lc3BhY2UgbW9kaWZpZXJzXG4gKi9cbnZhciBtb2RpZmllcnMgPSB7XG4gIC8qKlxuICAgKiBNb2RpZmllciB1c2VkIHRvIHNoaWZ0IHRoZSBwb3BwZXIgb24gdGhlIHN0YXJ0IG9yIGVuZCBvZiBpdHMgcmVmZXJlbmNlXG4gICAqIGVsZW1lbnQuPGJyIC8+XG4gICAqIEl0IHdpbGwgcmVhZCB0aGUgdmFyaWF0aW9uIG9mIHRoZSBgcGxhY2VtZW50YCBwcm9wZXJ0eS48YnIgLz5cbiAgICogSXQgY2FuIGJlIG9uZSBlaXRoZXIgYC1lbmRgIG9yIGAtc3RhcnRgLlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgc2hpZnQ6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9MTAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiAxMDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBzaGlmdFxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGUgYG9mZnNldGAgbW9kaWZpZXIgY2FuIHNoaWZ0IHlvdXIgcG9wcGVyIG9uIGJvdGggaXRzIGF4aXMuXG4gICAqXG4gICAqIEl0IGFjY2VwdHMgdGhlIGZvbGxvd2luZyB1bml0czpcbiAgICogLSBgcHhgIG9yIHVuaXRsZXNzLCBpbnRlcnByZXRlZCBhcyBwaXhlbHNcbiAgICogLSBgJWAgb3IgYCVyYCwgcGVyY2VudGFnZSByZWxhdGl2ZSB0byB0aGUgbGVuZ3RoIG9mIHRoZSByZWZlcmVuY2UgZWxlbWVudFxuICAgKiAtIGAlcGAsIHBlcmNlbnRhZ2UgcmVsYXRpdmUgdG8gdGhlIGxlbmd0aCBvZiB0aGUgcG9wcGVyIGVsZW1lbnRcbiAgICogLSBgdndgLCBDU1Mgdmlld3BvcnQgd2lkdGggdW5pdFxuICAgKiAtIGB2aGAsIENTUyB2aWV3cG9ydCBoZWlnaHQgdW5pdFxuICAgKlxuICAgKiBGb3IgbGVuZ3RoIGlzIGludGVuZGVkIHRoZSBtYWluIGF4aXMgcmVsYXRpdmUgdG8gdGhlIHBsYWNlbWVudCBvZiB0aGUgcG9wcGVyLjxiciAvPlxuICAgKiBUaGlzIG1lYW5zIHRoYXQgaWYgdGhlIHBsYWNlbWVudCBpcyBgdG9wYCBvciBgYm90dG9tYCwgdGhlIGxlbmd0aCB3aWxsIGJlIHRoZVxuICAgKiBgd2lkdGhgLiBJbiBjYXNlIG9mIGBsZWZ0YCBvciBgcmlnaHRgLCBpdCB3aWxsIGJlIHRoZSBoZWlnaHQuXG4gICAqXG4gICAqIFlvdSBjYW4gcHJvdmlkZSBhIHNpbmdsZSB2YWx1ZSAoYXMgYE51bWJlcmAgb3IgYFN0cmluZ2ApLCBvciBhIHBhaXIgb2YgdmFsdWVzXG4gICAqIGFzIGBTdHJpbmdgIGRpdmlkZWQgYnkgYSBjb21tYSBvciBvbmUgKG9yIG1vcmUpIHdoaXRlIHNwYWNlcy48YnIgLz5cbiAgICogVGhlIGxhdHRlciBpcyBhIGRlcHJlY2F0ZWQgbWV0aG9kIGJlY2F1c2UgaXQgbGVhZHMgdG8gY29uZnVzaW9uIGFuZCB3aWxsIGJlXG4gICAqIHJlbW92ZWQgaW4gdjIuPGJyIC8+XG4gICAqIEFkZGl0aW9uYWxseSwgaXQgYWNjZXB0cyBhZGRpdGlvbnMgYW5kIHN1YnRyYWN0aW9ucyBiZXR3ZWVuIGRpZmZlcmVudCB1bml0cy5cbiAgICogTm90ZSB0aGF0IG11bHRpcGxpY2F0aW9ucyBhbmQgZGl2aXNpb25zIGFyZW4ndCBzdXBwb3J0ZWQuXG4gICAqXG4gICAqIFZhbGlkIGV4YW1wbGVzIGFyZTpcbiAgICogYGBgXG4gICAqIDEwXG4gICAqICcxMCUnXG4gICAqICcxMCwgMTAnXG4gICAqICcxMCUsIDEwJ1xuICAgKiAnMTAgKyAxMCUnXG4gICAqICcxMCAtIDV2aCArIDMlJ1xuICAgKiAnLTEwcHggKyA1dmgsIDVweCAtIDYlJ1xuICAgKiBgYGBcbiAgICogPiAqKk5CKio6IElmIHlvdSBkZXNpcmUgdG8gYXBwbHkgb2Zmc2V0cyB0byB5b3VyIHBvcHBlcnMgaW4gYSB3YXkgdGhhdCBtYXkgbWFrZSB0aGVtIG92ZXJsYXBcbiAgICogPiB3aXRoIHRoZWlyIHJlZmVyZW5jZSBlbGVtZW50LCB1bmZvcnR1bmF0ZWx5LCB5b3Ugd2lsbCBoYXZlIHRvIGRpc2FibGUgdGhlIGBmbGlwYCBtb2RpZmllci5cbiAgICogPiBNb3JlIG9uIHRoaXMgW3JlYWRpbmcgdGhpcyBpc3N1ZV0oaHR0cHM6Ly9naXRodWIuY29tL0ZlelZyYXN0YS9wb3BwZXIuanMvaXNzdWVzLzM3MylcbiAgICpcbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIG9mZnNldDoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj0yMDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDIwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IG9mZnNldCxcbiAgICAvKiogQHByb3Age051bWJlcnxTdHJpbmd9IG9mZnNldD0wXG4gICAgICogVGhlIG9mZnNldCB2YWx1ZSBhcyBkZXNjcmliZWQgaW4gdGhlIG1vZGlmaWVyIGRlc2NyaXB0aW9uXG4gICAgICovXG4gICAgb2Zmc2V0OiAwXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gcHJldmVudCB0aGUgcG9wcGVyIGZyb20gYmVpbmcgcG9zaXRpb25lZCBvdXRzaWRlIHRoZSBib3VuZGFyeS5cbiAgICpcbiAgICogQW4gc2NlbmFyaW8gZXhpc3RzIHdoZXJlIHRoZSByZWZlcmVuY2UgaXRzZWxmIGlzIG5vdCB3aXRoaW4gdGhlIGJvdW5kYXJpZXMuPGJyIC8+XG4gICAqIFdlIGNhbiBzYXkgaXQgaGFzIFwiZXNjYXBlZCB0aGUgYm91bmRhcmllc1wiIOKAlCBvciBqdXN0IFwiZXNjYXBlZFwiLjxiciAvPlxuICAgKiBJbiB0aGlzIGNhc2Ugd2UgbmVlZCB0byBkZWNpZGUgd2hldGhlciB0aGUgcG9wcGVyIHNob3VsZCBlaXRoZXI6XG4gICAqXG4gICAqIC0gZGV0YWNoIGZyb20gdGhlIHJlZmVyZW5jZSBhbmQgcmVtYWluIFwidHJhcHBlZFwiIGluIHRoZSBib3VuZGFyaWVzLCBvclxuICAgKiAtIGlmIGl0IHNob3VsZCBpZ25vcmUgdGhlIGJvdW5kYXJ5IGFuZCBcImVzY2FwZSB3aXRoIGl0cyByZWZlcmVuY2VcIlxuICAgKlxuICAgKiBXaGVuIGBlc2NhcGVXaXRoUmVmZXJlbmNlYCBpcyBzZXQgdG9gdHJ1ZWAgYW5kIHJlZmVyZW5jZSBpcyBjb21wbGV0ZWx5XG4gICAqIG91dHNpZGUgaXRzIGJvdW5kYXJpZXMsIHRoZSBwb3BwZXIgd2lsbCBvdmVyZmxvdyAob3IgY29tcGxldGVseSBsZWF2ZSlcbiAgICogdGhlIGJvdW5kYXJpZXMgaW4gb3JkZXIgdG8gcmVtYWluIGF0dGFjaGVkIHRvIHRoZSBlZGdlIG9mIHRoZSByZWZlcmVuY2UuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBwcmV2ZW50T3ZlcmZsb3c6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9MzAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiAzMDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBwcmV2ZW50T3ZlcmZsb3csXG4gICAgLyoqXG4gICAgICogQHByb3Age0FycmF5fSBbcHJpb3JpdHk9WydsZWZ0JywncmlnaHQnLCd0b3AnLCdib3R0b20nXV1cbiAgICAgKiBQb3BwZXIgd2lsbCB0cnkgdG8gcHJldmVudCBvdmVyZmxvdyBmb2xsb3dpbmcgdGhlc2UgcHJpb3JpdGllcyBieSBkZWZhdWx0LFxuICAgICAqIHRoZW4sIGl0IGNvdWxkIG92ZXJmbG93IG9uIHRoZSBsZWZ0IGFuZCBvbiB0b3Agb2YgdGhlIGBib3VuZGFyaWVzRWxlbWVudGBcbiAgICAgKi9cbiAgICBwcmlvcml0eTogWydsZWZ0JywgJ3JpZ2h0JywgJ3RvcCcsICdib3R0b20nXSxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7bnVtYmVyfSBwYWRkaW5nPTVcbiAgICAgKiBBbW91bnQgb2YgcGl4ZWwgdXNlZCB0byBkZWZpbmUgYSBtaW5pbXVtIGRpc3RhbmNlIGJldHdlZW4gdGhlIGJvdW5kYXJpZXNcbiAgICAgKiBhbmQgdGhlIHBvcHBlciB0aGlzIG1ha2VzIHN1cmUgdGhlIHBvcHBlciBoYXMgYWx3YXlzIGEgbGl0dGxlIHBhZGRpbmdcbiAgICAgKiBiZXR3ZWVuIHRoZSBlZGdlcyBvZiBpdHMgY29udGFpbmVyXG4gICAgICovXG4gICAgcGFkZGluZzogNSxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7U3RyaW5nfEhUTUxFbGVtZW50fSBib3VuZGFyaWVzRWxlbWVudD0nc2Nyb2xsUGFyZW50J1xuICAgICAqIEJvdW5kYXJpZXMgdXNlZCBieSB0aGUgbW9kaWZpZXIsIGNhbiBiZSBgc2Nyb2xsUGFyZW50YCwgYHdpbmRvd2AsXG4gICAgICogYHZpZXdwb3J0YCBvciBhbnkgRE9NIGVsZW1lbnQuXG4gICAgICovXG4gICAgYm91bmRhcmllc0VsZW1lbnQ6ICdzY3JvbGxQYXJlbnQnXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gbWFrZSBzdXJlIHRoZSByZWZlcmVuY2UgYW5kIGl0cyBwb3BwZXIgc3RheSBuZWFyIGVhY2hvdGhlcnNcbiAgICogd2l0aG91dCBsZWF2aW5nIGFueSBnYXAgYmV0d2VlbiB0aGUgdHdvLiBFeHBlY2lhbGx5IHVzZWZ1bCB3aGVuIHRoZSBhcnJvdyBpc1xuICAgKiBlbmFibGVkIGFuZCB5b3Ugd2FudCB0byBhc3N1cmUgaXQgdG8gcG9pbnQgdG8gaXRzIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgKiBJdCBjYXJlcyBvbmx5IGFib3V0IHRoZSBmaXJzdCBheGlzLCB5b3UgY2FuIHN0aWxsIGhhdmUgcG9wcGVycyB3aXRoIG1hcmdpblxuICAgKiBiZXR3ZWVuIHRoZSBwb3BwZXIgYW5kIGl0cyByZWZlcmVuY2UgZWxlbWVudC5cbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIGtlZXBUb2dldGhlcjoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj00MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDQwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGtlZXBUb2dldGhlclxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGlzIG1vZGlmaWVyIGlzIHVzZWQgdG8gbW92ZSB0aGUgYGFycm93RWxlbWVudGAgb2YgdGhlIHBvcHBlciB0byBtYWtlXG4gICAqIHN1cmUgaXQgaXMgcG9zaXRpb25lZCBiZXR3ZWVuIHRoZSByZWZlcmVuY2UgZWxlbWVudCBhbmQgaXRzIHBvcHBlciBlbGVtZW50LlxuICAgKiBJdCB3aWxsIHJlYWQgdGhlIG91dGVyIHNpemUgb2YgdGhlIGBhcnJvd0VsZW1lbnRgIG5vZGUgdG8gZGV0ZWN0IGhvdyBtYW55XG4gICAqIHBpeGVscyBvZiBjb25qdWN0aW9uIGFyZSBuZWVkZWQuXG4gICAqXG4gICAqIEl0IGhhcyBubyBlZmZlY3QgaWYgbm8gYGFycm93RWxlbWVudGAgaXMgcHJvdmlkZWQuXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBhcnJvdzoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj01MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDUwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGFycm93LFxuICAgIC8qKiBAcHJvcCB7U3RyaW5nfEhUTUxFbGVtZW50fSBlbGVtZW50PSdbeC1hcnJvd10nIC0gU2VsZWN0b3Igb3Igbm9kZSB1c2VkIGFzIGFycm93ICovXG4gICAgZWxlbWVudDogJ1t4LWFycm93XSdcbiAgfSxcblxuICAvKipcbiAgICogTW9kaWZpZXIgdXNlZCB0byBmbGlwIHRoZSBwb3BwZXIncyBwbGFjZW1lbnQgd2hlbiBpdCBzdGFydHMgdG8gb3ZlcmxhcCBpdHNcbiAgICogcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAqXG4gICAqIFJlcXVpcmVzIHRoZSBgcHJldmVudE92ZXJmbG93YCBtb2RpZmllciBiZWZvcmUgaXQgaW4gb3JkZXIgdG8gd29yay5cbiAgICpcbiAgICogKipOT1RFOioqIHRoaXMgbW9kaWZpZXIgd2lsbCBpbnRlcnJ1cHQgdGhlIGN1cnJlbnQgdXBkYXRlIGN5Y2xlIGFuZCB3aWxsXG4gICAqIHJlc3RhcnQgaXQgaWYgaXQgZGV0ZWN0cyB0aGUgbmVlZCB0byBmbGlwIHRoZSBwbGFjZW1lbnQuXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBmbGlwOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTYwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogNjAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogZmxpcCxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7U3RyaW5nfEFycmF5fSBiZWhhdmlvcj0nZmxpcCdcbiAgICAgKiBUaGUgYmVoYXZpb3IgdXNlZCB0byBjaGFuZ2UgdGhlIHBvcHBlcidzIHBsYWNlbWVudC4gSXQgY2FuIGJlIG9uZSBvZlxuICAgICAqIGBmbGlwYCwgYGNsb2Nrd2lzZWAsIGBjb3VudGVyY2xvY2t3aXNlYCBvciBhbiBhcnJheSB3aXRoIGEgbGlzdCBvZiB2YWxpZFxuICAgICAqIHBsYWNlbWVudHMgKHdpdGggb3B0aW9uYWwgdmFyaWF0aW9ucykuXG4gICAgICovXG4gICAgYmVoYXZpb3I6ICdmbGlwJyxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7bnVtYmVyfSBwYWRkaW5nPTVcbiAgICAgKiBUaGUgcG9wcGVyIHdpbGwgZmxpcCBpZiBpdCBoaXRzIHRoZSBlZGdlcyBvZiB0aGUgYGJvdW5kYXJpZXNFbGVtZW50YFxuICAgICAqL1xuICAgIHBhZGRpbmc6IDUsXG4gICAgLyoqXG4gICAgICogQHByb3Age1N0cmluZ3xIVE1MRWxlbWVudH0gYm91bmRhcmllc0VsZW1lbnQ9J3ZpZXdwb3J0J1xuICAgICAqIFRoZSBlbGVtZW50IHdoaWNoIHdpbGwgZGVmaW5lIHRoZSBib3VuZGFyaWVzIG9mIHRoZSBwb3BwZXIgcG9zaXRpb24sXG4gICAgICogdGhlIHBvcHBlciB3aWxsIG5ldmVyIGJlIHBsYWNlZCBvdXRzaWRlIG9mIHRoZSBkZWZpbmVkIGJvdW5kYXJpZXNcbiAgICAgKiAoZXhjZXB0IGlmIGtlZXBUb2dldGhlciBpcyBlbmFibGVkKVxuICAgICAqL1xuICAgIGJvdW5kYXJpZXNFbGVtZW50OiAndmlld3BvcnQnXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gbWFrZSB0aGUgcG9wcGVyIGZsb3cgdG93YXJkIHRoZSBpbm5lciBvZiB0aGUgcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAqIEJ5IGRlZmF1bHQsIHdoZW4gdGhpcyBtb2RpZmllciBpcyBkaXNhYmxlZCwgdGhlIHBvcHBlciB3aWxsIGJlIHBsYWNlZCBvdXRzaWRlXG4gICAqIHRoZSByZWZlcmVuY2UgZWxlbWVudC5cbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIGlubmVyOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTcwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogNzAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD1mYWxzZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogZmFsc2UsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBpbm5lclxuICB9LFxuXG4gIC8qKlxuICAgKiBNb2RpZmllciB1c2VkIHRvIGhpZGUgdGhlIHBvcHBlciB3aGVuIGl0cyByZWZlcmVuY2UgZWxlbWVudCBpcyBvdXRzaWRlIG9mIHRoZVxuICAgKiBwb3BwZXIgYm91bmRhcmllcy4gSXQgd2lsbCBzZXQgYSBgeC1vdXQtb2YtYm91bmRhcmllc2AgYXR0cmlidXRlIHdoaWNoIGNhblxuICAgKiBiZSB1c2VkIHRvIGhpZGUgd2l0aCBhIENTUyBzZWxlY3RvciB0aGUgcG9wcGVyIHdoZW4gaXRzIHJlZmVyZW5jZSBpc1xuICAgKiBvdXQgb2YgYm91bmRhcmllcy5cbiAgICpcbiAgICogUmVxdWlyZXMgdGhlIGBwcmV2ZW50T3ZlcmZsb3dgIG1vZGlmaWVyIGJlZm9yZSBpdCBpbiBvcmRlciB0byB3b3JrLlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgaGlkZToge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj04MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDgwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGhpZGVcbiAgfSxcblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIHN0eWxlIHRoYXQgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIgZWxlbWVudCB0byBnZXRzXG4gICAqIHByb3Blcmx5IHBvc2l0aW9uZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIG1vZGlmaWVyIHdpbGwgbm90IHRvdWNoIHRoZSBET00sIGl0IGp1c3QgcHJlcGFyZXMgdGhlIHN0eWxlc1xuICAgKiBzbyB0aGF0IGBhcHBseVN0eWxlYCBtb2RpZmllciBjYW4gYXBwbHkgaXQuIFRoaXMgc2VwYXJhdGlvbiBpcyB1c2VmdWxcbiAgICogaW4gY2FzZSB5b3UgbmVlZCB0byByZXBsYWNlIGBhcHBseVN0eWxlYCB3aXRoIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uLlxuICAgKlxuICAgKiBUaGlzIG1vZGlmaWVyIGhhcyBgODUwYCBhcyBgb3JkZXJgIHZhbHVlIHRvIG1haW50YWluIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICogd2l0aCBwcmV2aW91cyB2ZXJzaW9ucyBvZiBQb3BwZXIuanMuIEV4cGVjdCB0aGUgbW9kaWZpZXJzIG9yZGVyaW5nIG1ldGhvZFxuICAgKiB0byBjaGFuZ2UgaW4gZnV0dXJlIG1ham9yIHZlcnNpb25zIG9mIHRoZSBsaWJyYXJ5LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgY29tcHV0ZVN0eWxlOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTg1MCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogODUwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogY29tcHV0ZVN0eWxlLFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtCb29sZWFufSBncHVBY2NlbGVyYXRpb249dHJ1ZVxuICAgICAqIElmIHRydWUsIGl0IHVzZXMgdGhlIENTUyAzZCB0cmFuc2Zvcm1hdGlvbiB0byBwb3NpdGlvbiB0aGUgcG9wcGVyLlxuICAgICAqIE90aGVyd2lzZSwgaXQgd2lsbCB1c2UgdGhlIGB0b3BgIGFuZCBgbGVmdGAgcHJvcGVydGllcy5cbiAgICAgKi9cbiAgICBncHVBY2NlbGVyYXRpb246IHRydWUsXG4gICAgLyoqXG4gICAgICogQHByb3Age3N0cmluZ30gW3g9J2JvdHRvbSddXG4gICAgICogV2hlcmUgdG8gYW5jaG9yIHRoZSBYIGF4aXMgKGBib3R0b21gIG9yIGB0b3BgKS4gQUtBIFggb2Zmc2V0IG9yaWdpbi5cbiAgICAgKiBDaGFuZ2UgdGhpcyBpZiB5b3VyIHBvcHBlciBzaG91bGQgZ3JvdyBpbiBhIGRpcmVjdGlvbiBkaWZmZXJlbnQgZnJvbSBgYm90dG9tYFxuICAgICAqL1xuICAgIHg6ICdib3R0b20nLFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtzdHJpbmd9IFt4PSdsZWZ0J11cbiAgICAgKiBXaGVyZSB0byBhbmNob3IgdGhlIFkgYXhpcyAoYGxlZnRgIG9yIGByaWdodGApLiBBS0EgWSBvZmZzZXQgb3JpZ2luLlxuICAgICAqIENoYW5nZSB0aGlzIGlmIHlvdXIgcG9wcGVyIHNob3VsZCBncm93IGluIGEgZGlyZWN0aW9uIGRpZmZlcmVudCBmcm9tIGByaWdodGBcbiAgICAgKi9cbiAgICB5OiAncmlnaHQnXG4gIH0sXG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdGhlIGNvbXB1dGVkIHN0eWxlcyB0byB0aGUgcG9wcGVyIGVsZW1lbnQuXG4gICAqXG4gICAqIEFsbCB0aGUgRE9NIG1hbmlwdWxhdGlvbnMgYXJlIGxpbWl0ZWQgdG8gdGhpcyBtb2RpZmllci4gVGhpcyBpcyB1c2VmdWwgaW4gY2FzZVxuICAgKiB5b3Ugd2FudCB0byBpbnRlZ3JhdGUgUG9wcGVyLmpzIGluc2lkZSBhIGZyYW1ld29yayBvciB2aWV3IGxpYnJhcnkgYW5kIHlvdVxuICAgKiB3YW50IHRvIGRlbGVnYXRlIGFsbCB0aGUgRE9NIG1hbmlwdWxhdGlvbnMgdG8gaXQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBpZiB5b3UgZGlzYWJsZSB0aGlzIG1vZGlmaWVyLCB5b3UgbXVzdCBtYWtlIHN1cmUgdGhlIHBvcHBlciBlbGVtZW50XG4gICAqIGhhcyBpdHMgcG9zaXRpb24gc2V0IHRvIGBhYnNvbHV0ZWAgYmVmb3JlIFBvcHBlci5qcyBjYW4gZG8gaXRzIHdvcmshXG4gICAqXG4gICAqIEp1c3QgZGlzYWJsZSB0aGlzIG1vZGlmaWVyIGFuZCBkZWZpbmUgeW91IG93biB0byBhY2hpZXZlIHRoZSBkZXNpcmVkIGVmZmVjdC5cbiAgICpcbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIGFwcGx5U3R5bGU6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9OTAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiA5MDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBhcHBseVN0eWxlLFxuICAgIC8qKiBAcHJvcCB7RnVuY3Rpb259ICovXG4gICAgb25Mb2FkOiBhcHBseVN0eWxlT25Mb2FkLFxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gMS4xMC4wLCB0aGUgcHJvcGVydHkgbW92ZWQgdG8gYGNvbXB1dGVTdHlsZWAgbW9kaWZpZXJcbiAgICAgKiBAcHJvcCB7Qm9vbGVhbn0gZ3B1QWNjZWxlcmF0aW9uPXRydWVcbiAgICAgKiBJZiB0cnVlLCBpdCB1c2VzIHRoZSBDU1MgM2QgdHJhbnNmb3JtYXRpb24gdG8gcG9zaXRpb24gdGhlIHBvcHBlci5cbiAgICAgKiBPdGhlcndpc2UsIGl0IHdpbGwgdXNlIHRoZSBgdG9wYCBhbmQgYGxlZnRgIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgZ3B1QWNjZWxlcmF0aW9uOiB1bmRlZmluZWRcbiAgfVxufTtcblxuLyoqXG4gKiBUaGUgYGRhdGFPYmplY3RgIGlzIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgaW5mb3JtYXRpb25zIHVzZWQgYnkgUG9wcGVyLmpzXG4gKiB0aGlzIG9iamVjdCBnZXQgcGFzc2VkIHRvIG1vZGlmaWVycyBhbmQgdG8gdGhlIGBvbkNyZWF0ZWAgYW5kIGBvblVwZGF0ZWAgY2FsbGJhY2tzLlxuICogQG5hbWUgZGF0YU9iamVjdFxuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEuaW5zdGFuY2UgVGhlIFBvcHBlci5qcyBpbnN0YW5jZVxuICogQHByb3BlcnR5IHtTdHJpbmd9IGRhdGEucGxhY2VtZW50IFBsYWNlbWVudCBhcHBsaWVkIHRvIHBvcHBlclxuICogQHByb3BlcnR5IHtTdHJpbmd9IGRhdGEub3JpZ2luYWxQbGFjZW1lbnQgUGxhY2VtZW50IG9yaWdpbmFsbHkgZGVmaW5lZCBvbiBpbml0XG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGRhdGEuZmxpcHBlZCBUcnVlIGlmIHBvcHBlciBoYXMgYmVlbiBmbGlwcGVkIGJ5IGZsaXAgbW9kaWZpZXJcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGF0YS5oaWRlIFRydWUgaWYgdGhlIHJlZmVyZW5jZSBlbGVtZW50IGlzIG91dCBvZiBib3VuZGFyaWVzLCB1c2VmdWwgdG8ga25vdyB3aGVuIHRvIGhpZGUgdGhlIHBvcHBlci5cbiAqIEBwcm9wZXJ0eSB7SFRNTEVsZW1lbnR9IGRhdGEuYXJyb3dFbGVtZW50IE5vZGUgdXNlZCBhcyBhcnJvdyBieSBhcnJvdyBtb2RpZmllclxuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEuc3R5bGVzIEFueSBDU1MgcHJvcGVydHkgZGVmaW5lZCBoZXJlIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgcG9wcGVyLCBpdCBleHBlY3RzIHRoZSBKYXZhU2NyaXB0IG5vbWVuY2xhdHVyZSAoZWcuIGBtYXJnaW5Cb3R0b21gKVxuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEuYXJyb3dTdHlsZXMgQW55IENTUyBwcm9wZXJ0eSBkZWZpbmVkIGhlcmUgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIgYXJyb3csIGl0IGV4cGVjdHMgdGhlIEphdmFTY3JpcHQgbm9tZW5jbGF0dXJlIChlZy4gYG1hcmdpbkJvdHRvbWApXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5ib3VuZGFyaWVzIE9mZnNldHMgb2YgdGhlIHBvcHBlciBib3VuZGFyaWVzXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5vZmZzZXRzIFRoZSBtZWFzdXJlbWVudHMgb2YgcG9wcGVyLCByZWZlcmVuY2UgYW5kIGFycm93IGVsZW1lbnRzLlxuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEub2Zmc2V0cy5wb3BwZXIgYHRvcGAsIGBsZWZ0YCwgYHdpZHRoYCwgYGhlaWdodGAgdmFsdWVzXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSBgdG9wYCwgYGxlZnRgLCBgd2lkdGhgLCBgaGVpZ2h0YCB2YWx1ZXNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkYXRhLm9mZnNldHMuYXJyb3ddIGB0b3BgIGFuZCBgbGVmdGAgb2Zmc2V0cywgb25seSBvbmUgb2YgdGhlbSB3aWxsIGJlIGRpZmZlcmVudCBmcm9tIDBcbiAqL1xuXG4vKipcbiAqIERlZmF1bHQgb3B0aW9ucyBwcm92aWRlZCB0byBQb3BwZXIuanMgY29uc3RydWN0b3IuPGJyIC8+XG4gKiBUaGVzZSBjYW4gYmUgb3ZlcnJpZGVuIHVzaW5nIHRoZSBgb3B0aW9uc2AgYXJndW1lbnQgb2YgUG9wcGVyLmpzLjxiciAvPlxuICogVG8gb3ZlcnJpZGUgYW4gb3B0aW9uLCBzaW1wbHkgcGFzcyBhcyAzcmQgYXJndW1lbnQgYW4gb2JqZWN0IHdpdGggdGhlIHNhbWVcbiAqIHN0cnVjdHVyZSBvZiB0aGlzIG9iamVjdCwgZXhhbXBsZTpcbiAqIGBgYFxuICogbmV3IFBvcHBlcihyZWYsIHBvcCwge1xuICogICBtb2RpZmllcnM6IHtcbiAqICAgICBwcmV2ZW50T3ZlcmZsb3c6IHsgZW5hYmxlZDogZmFsc2UgfVxuICogICB9XG4gKiB9KVxuICogYGBgXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHN0YXRpY1xuICogQG1lbWJlcm9mIFBvcHBlclxuICovXG52YXIgRGVmYXVsdHMgPSB7XG4gIC8qKlxuICAgKiBQb3BwZXIncyBwbGFjZW1lbnRcbiAgICogQHByb3Age1BvcHBlci5wbGFjZW1lbnRzfSBwbGFjZW1lbnQ9J2JvdHRvbSdcbiAgICovXG4gIHBsYWNlbWVudDogJ2JvdHRvbScsXG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgZXZlbnRzIChyZXNpemUsIHNjcm9sbCkgYXJlIGluaXRpYWxseSBlbmFibGVkXG4gICAqIEBwcm9wIHtCb29sZWFufSBldmVudHNFbmFibGVkPXRydWVcbiAgICovXG4gIGV2ZW50c0VuYWJsZWQ6IHRydWUsXG5cbiAgLyoqXG4gICAqIFNldCB0byB0cnVlIGlmIHlvdSB3YW50IHRvIGF1dG9tYXRpY2FsbHkgcmVtb3ZlIHRoZSBwb3BwZXIgd2hlblxuICAgKiB5b3UgY2FsbCB0aGUgYGRlc3Ryb3lgIG1ldGhvZC5cbiAgICogQHByb3Age0Jvb2xlYW59IHJlbW92ZU9uRGVzdHJveT1mYWxzZVxuICAgKi9cbiAgcmVtb3ZlT25EZXN0cm95OiBmYWxzZSxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgY2FsbGVkIHdoZW4gdGhlIHBvcHBlciBpcyBjcmVhdGVkLjxiciAvPlxuICAgKiBCeSBkZWZhdWx0LCBpcyBzZXQgdG8gbm8tb3AuPGJyIC8+XG4gICAqIEFjY2VzcyBQb3BwZXIuanMgaW5zdGFuY2Ugd2l0aCBgZGF0YS5pbnN0YW5jZWAuXG4gICAqIEBwcm9wIHtvbkNyZWF0ZX1cbiAgICovXG4gIG9uQ3JlYXRlOiAoKSA9PiB7fSxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgY2FsbGVkIHdoZW4gdGhlIHBvcHBlciBpcyB1cGRhdGVkLCB0aGlzIGNhbGxiYWNrIGlzIG5vdCBjYWxsZWRcbiAgICogb24gdGhlIGluaXRpYWxpemF0aW9uL2NyZWF0aW9uIG9mIHRoZSBwb3BwZXIsIGJ1dCBvbmx5IG9uIHN1YnNlcXVlbnRcbiAgICogdXBkYXRlcy48YnIgLz5cbiAgICogQnkgZGVmYXVsdCwgaXMgc2V0IHRvIG5vLW9wLjxiciAvPlxuICAgKiBBY2Nlc3MgUG9wcGVyLmpzIGluc3RhbmNlIHdpdGggYGRhdGEuaW5zdGFuY2VgLlxuICAgKiBAcHJvcCB7b25VcGRhdGV9XG4gICAqL1xuICBvblVwZGF0ZTogKCkgPT4ge30sXG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgbW9kaWZpZXJzIHVzZWQgdG8gbW9kaWZ5IHRoZSBvZmZzZXRzIGJlZm9yZSB0aGV5IGFyZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIuXG4gICAqIFRoZXkgcHJvdmlkZSBtb3N0IG9mIHRoZSBmdW5jdGlvbmFsaXRpZXMgb2YgUG9wcGVyLmpzXG4gICAqIEBwcm9wIHttb2RpZmllcnN9XG4gICAqL1xuICBtb2RpZmllcnNcbn07XG5cbi8qKlxuICogQGNhbGxiYWNrIG9uQ3JlYXRlXG4gKiBAcGFyYW0ge2RhdGFPYmplY3R9IGRhdGFcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayBvblVwZGF0ZVxuICogQHBhcmFtIHtkYXRhT2JqZWN0fSBkYXRhXG4gKi9cblxuLy8gVXRpbHNcbi8vIE1ldGhvZHNcbmNsYXNzIFBvcHBlciB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgUG9wcGVyLmpzIGluc3RhbmNlXG4gICAqIEBjbGFzcyBQb3BwZXJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxyZWZlcmVuY2VPYmplY3R9IHJlZmVyZW5jZSAtIFRoZSByZWZlcmVuY2UgZWxlbWVudCB1c2VkIHRvIHBvc2l0aW9uIHRoZSBwb3BwZXJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcG9wcGVyIC0gVGhlIEhUTUwgZWxlbWVudCB1c2VkIGFzIHBvcHBlci5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBZb3VyIGN1c3RvbSBvcHRpb25zIHRvIG92ZXJyaWRlIHRoZSBvbmVzIGRlZmluZWQgaW4gW0RlZmF1bHRzXSgjZGVmYXVsdHMpXG4gICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2UgLSBUaGUgZ2VuZXJhdGVkIFBvcHBlci5qcyBpbnN0YW5jZVxuICAgKi9cbiAgY29uc3RydWN0b3IocmVmZXJlbmNlLCBwb3BwZXIsIG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMuc2NoZWR1bGVVcGRhdGUgPSAoKSA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGUpO1xuXG4gICAgLy8gbWFrZSB1cGRhdGUoKSBkZWJvdW5jZWQsIHNvIHRoYXQgaXQgb25seSBydW5zIGF0IG1vc3Qgb25jZS1wZXItdGlja1xuICAgIHRoaXMudXBkYXRlID0gZGVib3VuY2UodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cbiAgICAvLyB3aXRoIHt9IHdlIGNyZWF0ZSBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgb3B0aW9ucyBpbnNpZGUgaXRcbiAgICB0aGlzLm9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgUG9wcGVyLkRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgIC8vIGluaXQgc3RhdGVcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNEZXN0cm95ZWQ6IGZhbHNlLFxuICAgICAgaXNDcmVhdGVkOiBmYWxzZSxcbiAgICAgIHNjcm9sbFBhcmVudHM6IFtdXG4gICAgfTtcblxuICAgIC8vIGdldCByZWZlcmVuY2UgYW5kIHBvcHBlciBlbGVtZW50cyAoYWxsb3cgalF1ZXJ5IHdyYXBwZXJzKVxuICAgIHRoaXMucmVmZXJlbmNlID0gcmVmZXJlbmNlLmpxdWVyeSA/IHJlZmVyZW5jZVswXSA6IHJlZmVyZW5jZTtcbiAgICB0aGlzLnBvcHBlciA9IHBvcHBlci5qcXVlcnkgPyBwb3BwZXJbMF0gOiBwb3BwZXI7XG5cbiAgICAvLyBEZWVwIG1lcmdlIG1vZGlmaWVycyBvcHRpb25zXG4gICAgdGhpcy5vcHRpb25zLm1vZGlmaWVycyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKF9leHRlbmRzKHt9LCBQb3BwZXIuRGVmYXVsdHMubW9kaWZpZXJzLCBvcHRpb25zLm1vZGlmaWVycykpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICB0aGlzLm9wdGlvbnMubW9kaWZpZXJzW25hbWVdID0gX2V4dGVuZHMoe30sIFBvcHBlci5EZWZhdWx0cy5tb2RpZmllcnNbbmFtZV0gfHwge30sIG9wdGlvbnMubW9kaWZpZXJzID8gb3B0aW9ucy5tb2RpZmllcnNbbmFtZV0gOiB7fSk7XG4gICAgfSk7XG5cbiAgICAvLyBSZWZhY3RvcmluZyBtb2RpZmllcnMnIGxpc3QgKE9iamVjdCA9PiBBcnJheSlcbiAgICB0aGlzLm1vZGlmaWVycyA9IE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5tb2RpZmllcnMpLm1hcChuYW1lID0+IF9leHRlbmRzKHtcbiAgICAgIG5hbWVcbiAgICB9LCB0aGlzLm9wdGlvbnMubW9kaWZpZXJzW25hbWVdKSlcbiAgICAvLyBzb3J0IHRoZSBtb2RpZmllcnMgYnkgb3JkZXJcbiAgICAuc29ydCgoYSwgYikgPT4gYS5vcmRlciAtIGIub3JkZXIpO1xuXG4gICAgLy8gbW9kaWZpZXJzIGhhdmUgdGhlIGFiaWxpdHkgdG8gZXhlY3V0ZSBhcmJpdHJhcnkgY29kZSB3aGVuIFBvcHBlci5qcyBnZXQgaW5pdGVkXG4gICAgLy8gc3VjaCBjb2RlIGlzIGV4ZWN1dGVkIGluIHRoZSBzYW1lIG9yZGVyIG9mIGl0cyBtb2RpZmllclxuICAgIC8vIHRoZXkgY291bGQgYWRkIG5ldyBwcm9wZXJ0aWVzIHRvIHRoZWlyIG9wdGlvbnMgY29uZmlndXJhdGlvblxuICAgIC8vIEJFIEFXQVJFOiBkb24ndCBhZGQgb3B0aW9ucyB0byBgb3B0aW9ucy5tb2RpZmllcnMubmFtZWAgYnV0IHRvIGBtb2RpZmllck9wdGlvbnNgIVxuICAgIHRoaXMubW9kaWZpZXJzLmZvckVhY2gobW9kaWZpZXJPcHRpb25zID0+IHtcbiAgICAgIGlmIChtb2RpZmllck9wdGlvbnMuZW5hYmxlZCAmJiBpc0Z1bmN0aW9uKG1vZGlmaWVyT3B0aW9ucy5vbkxvYWQpKSB7XG4gICAgICAgIG1vZGlmaWVyT3B0aW9ucy5vbkxvYWQodGhpcy5yZWZlcmVuY2UsIHRoaXMucG9wcGVyLCB0aGlzLm9wdGlvbnMsIG1vZGlmaWVyT3B0aW9ucywgdGhpcy5zdGF0ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBmaXJlIHRoZSBmaXJzdCB1cGRhdGUgdG8gcG9zaXRpb24gdGhlIHBvcHBlciBpbiB0aGUgcmlnaHQgcGxhY2VcbiAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgY29uc3QgZXZlbnRzRW5hYmxlZCA9IHRoaXMub3B0aW9ucy5ldmVudHNFbmFibGVkO1xuICAgIGlmIChldmVudHNFbmFibGVkKSB7XG4gICAgICAvLyBzZXR1cCBldmVudCBsaXN0ZW5lcnMsIHRoZXkgd2lsbCB0YWtlIGNhcmUgb2YgdXBkYXRlIHRoZSBwb3NpdGlvbiBpbiBzcGVjaWZpYyBzaXR1YXRpb25zXG4gICAgICB0aGlzLmVuYWJsZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZS5ldmVudHNFbmFibGVkID0gZXZlbnRzRW5hYmxlZDtcbiAgfVxuXG4gIC8vIFdlIGNhbid0IHVzZSBjbGFzcyBwcm9wZXJ0aWVzIGJlY2F1c2UgdGhleSBkb24ndCBnZXQgbGlzdGVkIGluIHRoZVxuICAvLyBjbGFzcyBwcm90b3R5cGUgYW5kIGJyZWFrIHN0dWZmIGxpa2UgU2lub24gc3R1YnNcbiAgdXBkYXRlKCkge1xuICAgIHJldHVybiB1cGRhdGUuY2FsbCh0aGlzKTtcbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHJldHVybiBkZXN0cm95LmNhbGwodGhpcyk7XG4gIH1cbiAgZW5hYmxlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgcmV0dXJuIGVuYWJsZUV2ZW50TGlzdGVuZXJzLmNhbGwodGhpcyk7XG4gIH1cbiAgZGlzYWJsZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHJldHVybiBkaXNhYmxlRXZlbnRMaXN0ZW5lcnMuY2FsbCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY2hlZHVsZSBhbiB1cGRhdGUsIGl0IHdpbGwgcnVuIG9uIHRoZSBuZXh0IFVJIHVwZGF0ZSBhdmFpbGFibGVcbiAgICogQG1ldGhvZCBzY2hlZHVsZVVwZGF0ZVxuICAgKiBAbWVtYmVyb2YgUG9wcGVyXG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgdXRpbGl0aWVzIHVzZWZ1bCB3aGVuIHdyaXRpbmcgY3VzdG9tIG1vZGlmaWVycy5cbiAgICogU3RhcnRpbmcgZnJvbSB2ZXJzaW9uIDEuNywgdGhpcyBtZXRob2QgaXMgYXZhaWxhYmxlIG9ubHkgaWYgeW91XG4gICAqIGluY2x1ZGUgYHBvcHBlci11dGlscy5qc2AgYmVmb3JlIGBwb3BwZXIuanNgLlxuICAgKlxuICAgKiAqKkRFUFJFQ0FUSU9OKio6IFRoaXMgd2F5IHRvIGFjY2VzcyBQb3BwZXJVdGlscyBpcyBkZXByZWNhdGVkXG4gICAqIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdjIhIFVzZSB0aGUgUG9wcGVyVXRpbHMgbW9kdWxlIGRpcmVjdGx5IGluc3RlYWQuXG4gICAqIER1ZSB0byB0aGUgaGlnaCBpbnN0YWJpbGl0eSBvZiB0aGUgbWV0aG9kcyBjb250YWluZWQgaW4gVXRpbHMsIHdlIGNhbid0XG4gICAqIGd1YXJhbnRlZSB0aGVtIHRvIGZvbGxvdyBzZW12ZXIuIFVzZSB0aGVtIGF0IHlvdXIgb3duIHJpc2shXG4gICAqIEBzdGF0aWNcbiAgICogQHByaXZhdGVcbiAgICogQHR5cGUge09iamVjdH1cbiAgICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAxLjhcbiAgICogQG1lbWJlciBVdGlsc1xuICAgKiBAbWVtYmVyb2YgUG9wcGVyXG4gICAqL1xufVxuXG4vKipcbiAqIFRoZSBgcmVmZXJlbmNlT2JqZWN0YCBpcyBhbiBvYmplY3QgdGhhdCBwcm92aWRlcyBhbiBpbnRlcmZhY2UgY29tcGF0aWJsZSB3aXRoIFBvcHBlci5qc1xuICogYW5kIGxldHMgeW91IHVzZSBpdCBhcyByZXBsYWNlbWVudCBvZiBhIHJlYWwgRE9NIG5vZGUuPGJyIC8+XG4gKiBZb3UgY2FuIHVzZSB0aGlzIG1ldGhvZCB0byBwb3NpdGlvbiBhIHBvcHBlciByZWxhdGl2ZWx5IHRvIGEgc2V0IG9mIGNvb3JkaW5hdGVzXG4gKiBpbiBjYXNlIHlvdSBkb24ndCBoYXZlIGEgRE9NIG5vZGUgdG8gdXNlIGFzIHJlZmVyZW5jZS5cbiAqXG4gKiBgYGBcbiAqIG5ldyBQb3BwZXIocmVmZXJlbmNlT2JqZWN0LCBwb3BwZXJOb2RlKTtcbiAqIGBgYFxuICpcbiAqIE5COiBUaGlzIGZlYXR1cmUgaXNuJ3Qgc3VwcG9ydGVkIGluIEludGVybmV0IEV4cGxvcmVyIDEwXG4gKiBAbmFtZSByZWZlcmVuY2VPYmplY3RcbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGRhdGEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0XG4gKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHNldCBvZiBjb29yZGluYXRlcyBjb21wYXRpYmxlIHdpdGggdGhlIG5hdGl2ZSBgZ2V0Qm91bmRpbmdDbGllbnRSZWN0YCBtZXRob2QuXG4gKiBAcHJvcGVydHkge251bWJlcn0gZGF0YS5jbGllbnRXaWR0aFxuICogQW4gRVM2IGdldHRlciB0aGF0IHdpbGwgcmV0dXJuIHRoZSB3aWR0aCBvZiB0aGUgdmlydHVhbCByZWZlcmVuY2UgZWxlbWVudC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkYXRhLmNsaWVudEhlaWdodFxuICogQW4gRVM2IGdldHRlciB0aGF0IHdpbGwgcmV0dXJuIHRoZSBoZWlnaHQgb2YgdGhlIHZpcnR1YWwgcmVmZXJlbmNlIGVsZW1lbnQuXG4gKi9cblxuUG9wcGVyLlV0aWxzID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKS5Qb3BwZXJVdGlscztcblBvcHBlci5wbGFjZW1lbnRzID0gcGxhY2VtZW50cztcblBvcHBlci5EZWZhdWx0cyA9IERlZmF1bHRzO1xuXG5leHBvcnQgZGVmYXVsdCBQb3BwZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wb3BwZXIuanMubWFwXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9wb3BwZXIuanMiLCIvL0luY2x1ZGUgaGVscGVyIGZ1bmN0aW9ucyBhbmQgUG9wcGVyXG5jb25zdCBoZWxwZXIgPSByZXF1aXJlKCcuL2hlbHBlci5qcycpO1xuaW1wb3J0IFBvcHBlciBmcm9tICcuL3BvcHBlci5qcyc7XG5cblxuLy9HZW5lcmF0ZSBhIG9wdGlvbnMgb2JqZWN0IHRvIHdyYXAgdGhlIGdpdmVuIHVzZXIgb3B0aW9uc1xubW9kdWxlLmV4cG9ydHMuY3JlYXRlUG9wcGVyT3B0aW9uc09iamVjdCA9IGZ1bmN0aW9uICh1c2VyT3B0aW9ucykge1xuICAgIHZhciBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdXNlck9wdGlvbnMpO1xuXG4gICAgLy9JZiBpZCBpcyB1bmRlZmluZWQsIGNyZWF0ZWQgYSB1bmlxdWUgaWQgYmFzZWQgb24gdGltZVxuICAgIGlmICghKHVzZXJPcHRpb25zLmlkKSkge1xuICAgICAgICBvcHRpb25zLmlkID0gJ2N5LXBvcHBlci10YXJnZXQtJyArIChEYXRlLm5vdygpICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICsgMTAwMDApKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucztcbn07XG5cbi8vQ3JlYXRlIGEgbmV3IHBvcHBlciBvYmplY3QgYXNzb2NpYXRlZCB3aXRoIGEgY3l0b3NjYXBlIGVsZW1lbnQgKE5vZGVzIG9yIEVkZ2VzKVxubW9kdWxlLmV4cG9ydHMuY3JlYXRlUG9wcGVyT2JqZWN0ID0gZnVuY3Rpb24gKGN5RWxlbWVudCkge1xuICAgIC8vSWYgcG9wcGVyIG9iamVjdCBhbHJlYWR5IGV4aXN0cywgdXBkYXRlIGl0cyBwb3NpdGlvblxuICAgIGlmIChjeUVsZW1lbnQuc2NyYXRjaCgncG9wcGVyJykpIHtcbiAgICAgICAgcmV0dXJuIGhlbHBlci51cGRhdGVQb3BwZXJPYmplY3RQb3NpdGlvbihjeUVsZW1lbnQpO1xuICAgIH1cbiAgICAvL090aGVyd2lzZSBjcmVhdGUgYSBuZXcgcG9wcGVyIG9iamVjdFxuICAgIGVsc2Uge1xuICAgICAgICAvL0RldGVybWluZSBlbGVtZW50IHByb3BlcnRpZXMgdG8gZGV0ZXJtaW5lIGhvZSB0byBkcmF3IHBvcHBlciBvYmplY3RcbiAgICAgICAgdmFyIGlzQ3kgPSBjeUVsZW1lbnQucGFuICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGN5RWxlbWVudC5wYW4gPT09ICdmdW5jdGlvbic7XG4gICAgICAgIHZhciBpc2N5RWxlbWVudCA9ICFpc0N5O1xuICAgICAgICB2YXIgaXNOb2RlID0gaXNjeUVsZW1lbnQgJiYgY3lFbGVtZW50LmlzTm9kZSgpO1xuICAgICAgICB2YXIgY3kgPSBpc0N5ID8gY3lFbGVtZW50IDogY3lFbGVtZW50LmN5KCk7XG5cbiAgICAgICAgLy9HZXQgRGVtZW5zaW9ucyBmb3IgcG9wcGVyIChTZXQgRGVmYXVsdCB0byAzLDMpXG4gICAgICAgIHZhciBkaW0gPSBoZWxwZXIuZ2V0UG9wcGVyT2JqZWN0RGltZW5zaW9ucyhjeUVsZW1lbnQsIGlzTm9kZSk7XG5cbiAgICAgICAgLy9EZWZpbmUgcG9wcGVyIG9iamVjdFxuICAgICAgICB2YXIgcmVmT2JqZWN0ID0ge1xuICAgICAgICAgICAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhlbHBlci5nZXRQb3BwZXJCb3VuZGluZ0JveChjeUVsZW1lbnQsIGN5LCBpc05vZGUsIGRpbSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IGNsaWVudFdpZHRoKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaW0udztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXQgY2xpZW50SGVpZ2h0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkaW0uaDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgLy9HZXQgVmFsdWVzIGZyb20gc2NyYXRjaHBhZFxuICAgICAgICB2YXIgcG9wcGVyT3B0cyA9IGN5RWxlbWVudC5zY3JhdGNoKCdwb3BwZXItb3B0cycpO1xuICAgICAgICBwb3BwZXJPcHRzLnBsYWNlbWVudCA9IHBvcHBlck9wdHMucGxhY2VtZW50IHx8ICdib3R0b20nO1xuICAgICAgICB2YXIgdGFyZ2V0T3B0ID0gY3lFbGVtZW50LnNjcmF0Y2goJ3BvcHBlci10YXJnZXQnKTtcbiAgICAgICAgdmFyIHRhcmdldCA9IG51bGw7XG5cbiAgICAgICAgLy9HZXQgdGFyZ2V0IHRvIGJpbmQgcG9wcGVyIHRvXG4gICAgICAgIHRyeXtcbiAgICAgICAgdGFyZ2V0ID0gaGVscGVyLmdldFBvcHBlck9iamVjdFRhcmdldChjeUVsZW1lbnQsIHRhcmdldE9wdCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2goZSl7XG4gICAgICAgICAgICAvL1N0b3AgY3JlYXRpbmcgYSBwb3BwZXJcbiAgICAgICAgICAgIHJldHVybjs7XG4gICAgICAgIH1cblxuICAgICAgICAvL0NyZWF0ZSBhbmQgcmV0dXJuIGFjdHVhbCBwb3BwZXIgb2JqZWN0XG4gICAgICAgIHZhciBwb3BwZXIgPSBuZXcgUG9wcGVyKHJlZk9iamVjdCwgdGFyZ2V0LCBwb3BwZXJPcHRzKTtcbiAgICAgICAgcmV0dXJuIHBvcHBlcjtcbiAgICB9XG5cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9yZW5kZXIuanMiLCIvL0dldCBkZXBlbmRlbmNpZXNcbmNvbnN0IGltcGwgPSByZXF1aXJlKCcuL2NvcmUvaW5kZXguanMnKTtcblxuLy8gcmVnaXN0ZXJzIHRoZSBleHRlbnNpb24gb24gYSBjeXRvc2NhcGUgbGliIHJlZlxubGV0IHJlZ2lzdGVyID0gZnVuY3Rpb24oIGN5dG9zY2FwZSApe1xuICBpZiggIWN5dG9zY2FwZSApeyByZXR1cm47IH0gLy8gY2FuJ3QgcmVnaXN0ZXIgaWYgY3l0b3NjYXBlIHVuc3BlY2lmaWVkXG5cbiAgLy8gcmVnaXN0ZXIgd2l0aCBjeXRvc2NhcGUuanNcbiAgY3l0b3NjYXBlKCAnY29yZScsICdwb3BwZXInLCBpbXBsLmNvcmUgKTsgIC8vQ3l0b3NjYXBlIENvcmVcbiAgY3l0b3NjYXBlKCAnY29sbGVjdGlvbicsICdwb3BwZXInLCBpbXBsLmNvbGxlY3Rpb24pOyAvL0N5dG9zY2FwZSBDb2xsZWN0aW9uc1xuXG59O1xuXG5pZiggdHlwZW9mIGN5dG9zY2FwZSAhPT0gJ3VuZGVmaW5lZCcgKXsgLy8gZXhwb3NlIHRvIGdsb2JhbCBjeXRvc2NhcGUgKGkuZS4gd2luZG93LmN5dG9zY2FwZSlcbiAgcmVnaXN0ZXIoIGN5dG9zY2FwZSApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlZ2lzdGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=