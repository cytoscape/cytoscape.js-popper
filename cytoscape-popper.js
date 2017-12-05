(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("popper.js"));
	else if(typeof define === 'function' && define.amd)
		define(["popper.js"], factory);
	else if(typeof exports === 'object')
		exports["cytoscapePopper"] = factory(require("popper.js"));
	else
		root["cytoscapePopper"] = factory(root["Popper"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createBoundingBox = __webpack_require__(2);

//Create a reference object for an element
module.exports.getRef = function (target, userOptions) {
    //Define popper reference object and cy reference  object
    var refObject = {

        // Store copies of dimensions and cyElement objects
        cyElement: target,

        // Define the bounding box for the popper target
        getBoundingClientRect: userOptions.boundingBox ? userOptions.boundingBox : function () {
            return createBoundingBox.getPopperBoundingBox(target, userOptions);
        },
        //Dynamically generate the dimension object for height and width
        get clientWidth() {
            var newDim = userOptions.getDimensions(this.cyElement);
            return newDim.w;
        },
        get clientHeight() {
            var newDim = userOptions.getDimensions(this.cyElement);
            return newDim.h;
        },

        //Dummy event listener and attribute functions
        //This allows the reference object to be used in place of an HTML element
        attributes: {},
        parentNode: document.body,
        addEventListener: function addEventListener() {
            return true;
        },
        removeEventListener: function removeEventListener() {
            return true;
        },
        setAttribute: function setAttribute(key, val) {
            return refObject.attributes[key] = val;
        },
        getAttribute: function getAttribute(key) {
            return refObject.attributes[key];
        }
    };

    return refObject;
};

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Update popper position
module.exports.updatePopperObjectPosition = function (target) {
    var popper = target.scratch('popper');
    popper.scheduleUpdate();
    return popper;
};

//Wrap given bounding Box to match popper.js bounding box
module.exports.getPopperBoundingBox = function (target, userOptions) {
    var position = userOptions.position,
        cy = userOptions.cy,
        getDimensions = userOptions.getDimensions;

    var cyOffset = cy.container().getBoundingClientRect();
    var dimensions = getDimensions(target);
    var renderedPosition = position(target);
    var scrollY = window.pageYOffset;
    var scrollX = window.pageXOffset;

    //Throw error if position is invalid
    if (!renderedPosition || renderedPosition.x == null || isNaN(renderedPosition.x)) {
        throw new Error('Error : Invalid Position');
    }

    //Return the bounding  box
    return {
        top: renderedPosition.y + cyOffset.top + scrollY,
        left: renderedPosition.x + cyOffset.left + scrollX,
        right: renderedPosition.x + dimensions.w + cyOffset.left + scrollX,
        bottom: renderedPosition.y + dimensions.h + cyOffset.top + scrollY,
        width: dimensions.w,
        height: dimensions.h
    };
};

//Return Popper Target (The element to bind popper to)
module.exports.getPopperHtmlObject = function (target, content) {
    var contentObject = null;

    //If target option is invalid, return error
    if (!content) {
        throw new Error('Error : NULL Target');
    }
    //Execute function if user opted for a dyanamic target
    else if (typeof content === 'function') {
            contentObject = document.getElementById(content(target));
        }
        //Treat target option as an ID if  user opted for a static target
        else if (typeof content === 'string') {
                contentObject = document.getElementById(content);
            }
            //Target option is an HTML element
            else if (content instanceof HTMLElement) {
                    return content;
                } else {
                    throw new Error('Error : Target Does Not Exist');
                }

    //Check validity of parsed target
    if (contentObject === null) {
        throw new Error('Error : Target Could Not Be Found');
    } else {
        return contentObject;
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Include helper functions and Popper
//import Popper from 'popper.js';
var createBoundingBox = __webpack_require__(2);
var createReferenceObject = __webpack_require__(0);

//Fix Popper.js webpack import conflict (Use .default if using webpack)
var Popper = __webpack_require__(7);
var EsmWebpackPopper = Popper.default;
if (EsmWebpackPopper != null && EsmWebpackPopper.Defaults != null) {
  Popper = Popper.default;
}

//Create a new popper object associated with a cytoscape element (Nodes or Edges)
module.exports.createPopperObject = function (target, userOptions) {
  //Define popper reference object
  var refObject = createReferenceObject.getRef(target, userOptions);

  //Get values from user options
  var popperOpts = userOptions.popper;
  popperOpts.placement = popperOpts.placement || 'bottom';
  var targetOpt = userOptions.content;
  var content = null;

  //Get target to bind popper to
  content = createBoundingBox.getPopperHtmlObject(target, targetOpt);

  //Create and return actual popper object
  var popper = new Popper(refObject, content, popperOpts);

  return popper;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var popperRenderer = __webpack_require__(3);
var createReferenceObject = __webpack_require__(0);
var assign = __webpack_require__(1);

//Create apopper object for first element in a collection
module.exports.popper = function (userOptions) {
  warn(this);
  return popperRenderer.createPopperObject(this[0], createOptionsObject(this[0], userOptions));
};

//Create a reference object for a element in a collection
module.exports.popperRef = function (userOptions) {
  warn(this);
  return createReferenceObject.getRef(this[0], createOptionsObject(this[0], userOptions));
};

//Create a options object with required default values
function createOptionsObject(target, userOptions) {
  //Set Defaults
  var defaults = {
    getDimensions: function getDimensions(target) {
      return { w: target.renderedWidth(), h: target.renderedHeight() };
    },
    position: function position(target) {
      return target.isNode() ? getRenderedCenter(target, defaults.getDimensions) : getRenderedMidpoint(target);
    },
    popper: {},
    cy: target.cy()
  };

  //Create a user options object
  userOptions = assign({}, defaults, userOptions);

  return userOptions;
}

//Get the rendered center
function getRenderedCenter(target, getDimensions) {
  var pos = target.renderedPosition();
  var dimensions = getDimensions(target);
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
function warn(elements) {
  //Popper.js Should only be used on 1 element
  if (elements.length > 1) {
    console.warn("Popper.js Extension should only be used on one element.");
    console.warn("Ignoring all subsequent elements");
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var popperRenderer = __webpack_require__(3);
var createReferenceObject = __webpack_require__(0);
var assign = __webpack_require__(1);

//Create a popper object (This is for use on the core)
module.exports.popper = function (userOptions) {
  return popperRenderer.createPopperObject(this, createOptionsObject(this, userOptions));
};

//Create a reference object (This is for use on the core)
module.exports.popperRef = function (userOptions) {
  return createReferenceObject.getRef(this, createOptionsObject(this, userOptions));
};

//Create a options object with required default values
function createOptionsObject(target, userOptions) {

  //Set Defaults 
  var defaults = {
    boundingBox: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      w: 3,
      h: 3
    },
    getDimensions: function getDimensions() {
      return { w: 3, h: 3 };
    },
    position: function position() {
      return { x: 0, y: 0 };
    },
    popper: {},
    cy: target
  };

  //Create a user options object
  userOptions = assign({}, defaults, userOptions);

  return userOptions;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Get dependencies
var coreImpl = __webpack_require__(5);
var collectionImpl = __webpack_require__(4);

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
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ })
/******/ ]);
});