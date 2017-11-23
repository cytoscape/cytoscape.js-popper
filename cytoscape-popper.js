(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("popper.js"));
	else if(typeof define === 'function' && define.amd)
		define(["popper.js"], factory);
	else if(typeof exports === 'object')
		exports["cytoscapePopper"] = factory(require("popper.js"));
	else
		root["cytoscapePopper"] = factory(root["popper.js"]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhZTMzMTRiNGI5YzAwOGQ5ZmU0MCIsIndlYnBhY2s6Ly8vLi9zcmMvY3JlYXRlUmVmZXJlbmNlT2JqZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NyZWF0ZUJvdW5kaW5nQm94LmpzIiwid2VicGFjazovLy8uL3NyYy9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInBvcHBlci5qc1wiIl0sIm5hbWVzIjpbImNyZWF0ZUJvdW5kaW5nQm94IiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXRSZWYiLCJ0YXJnZXQiLCJ1c2VyT3B0aW9ucyIsInJlZk9iamVjdCIsImN5RWxlbWVudCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdW5kaW5nQm94IiwiZ2V0UG9wcGVyQm91bmRpbmdCb3giLCJjbGllbnRXaWR0aCIsIm5ld0RpbSIsImdldERpbWVuc2lvbnMiLCJ3IiwiY2xpZW50SGVpZ2h0IiwiaCIsIk9iamVjdCIsImFzc2lnbiIsImJpbmQiLCJ0Z3QiLCJzcmNzIiwiZm9yRWFjaCIsImtleXMiLCJzcmMiLCJrIiwidXBkYXRlUG9wcGVyT2JqZWN0UG9zaXRpb24iLCJwb3BwZXIiLCJzY3JhdGNoIiwic2NoZWR1bGVVcGRhdGUiLCJwb3NpdGlvbiIsImN5IiwiY3lPZmZzZXQiLCJjb250YWluZXIiLCJkaW1lbnNpb25zIiwicmVuZGVyZWRQb3NpdGlvbiIsInNjcm9sbFkiLCJ3aW5kb3ciLCJwYWdlWU9mZnNldCIsInNjcm9sbFgiLCJwYWdlWE9mZnNldCIsIngiLCJpc05hTiIsIkVycm9yIiwidG9wIiwieSIsImxlZnQiLCJyaWdodCIsImJvdHRvbSIsIndpZHRoIiwiaGVpZ2h0IiwiZ2V0UG9wcGVySHRtbE9iamVjdCIsImNvbnRlbnQiLCJjb250ZW50T2JqZWN0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIkhUTUxFbGVtZW50IiwiY3JlYXRlUmVmZXJlbmNlT2JqZWN0IiwiUG9wcGVyIiwiRXNtV2VicGFja1BvcHBlciIsImRlZmF1bHQiLCJEZWZhdWx0cyIsImNyZWF0ZVBvcHBlck9iamVjdCIsInBvcHBlck9wdHMiLCJwbGFjZW1lbnQiLCJ0YXJnZXRPcHQiLCJwb3BwZXJSZW5kZXJlciIsIndhcm4iLCJjcmVhdGVPcHRpb25zT2JqZWN0IiwicG9wcGVyUmVmIiwiZGVmYXVsdHMiLCJyZW5kZXJlZFdpZHRoIiwicmVuZGVyZWRIZWlnaHQiLCJpc05vZGUiLCJnZXRSZW5kZXJlZENlbnRlciIsImdldFJlbmRlcmVkTWlkcG9pbnQiLCJwb3MiLCJvZmZzZXRYIiwib2Zmc2V0WSIsInAiLCJtaWRwb2ludCIsInBhbiIsInpvb20iLCJlbGVtZW50cyIsImxlbmd0aCIsImNvbnNvbGUiLCJjb3JlSW1wbCIsImNvbGxlY3Rpb25JbXBsIiwicmVnaXN0ZXIiLCJjeXRvc2NhcGUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5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LFlBQVUsWUFBVixFQUF3QixRQUF4QixFQUFrQ0YsZUFBZTVELE1BQWpELEVBTGtDLENBS3dCO0FBQzFEOEQsWUFBVSxNQUFWLEVBQWtCLFdBQWxCLEVBQStCSCxTQUFTakIsU0FBeEMsRUFOa0MsQ0FNbUI7QUFDckRvQixZQUFVLFlBQVYsRUFBd0IsV0FBeEIsRUFBcUNGLGVBQWVsQixTQUFwRCxFQVBrQyxDQU84QjtBQUVqRSxDQVREOztBQVdBLElBQUksT0FBT29CLFNBQVAsS0FBcUIsV0FBekIsRUFBc0M7QUFBRTtBQUN0Q0QsV0FBU0MsU0FBVDtBQUNEOztBQUVEeEYsT0FBT0MsT0FBUCxHQUFpQnNGLFFBQWpCLEM7Ozs7OztBQ3BCQSwrQyIsImZpbGUiOiJjeXRvc2NhcGUtcG9wcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicG9wcGVyLmpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInBvcHBlci5qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJjeXRvc2NhcGVQb3BwZXJcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJwb3BwZXIuanNcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImN5dG9zY2FwZVBvcHBlclwiXSA9IGZhY3Rvcnkocm9vdFtcInBvcHBlci5qc1wiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGFlMzMxNGI0YjljMDA4ZDlmZTQwIiwiY29uc3QgY3JlYXRlQm91bmRpbmdCb3ggPSByZXF1aXJlKCcuL2NyZWF0ZUJvdW5kaW5nQm94Jyk7XG5cbi8vQ3JlYXRlIGEgcmVmZXJlbmNlIG9iamVjdCBmb3IgYW4gZWxlbWVudFxubW9kdWxlLmV4cG9ydHMuZ2V0UmVmID0gZnVuY3Rpb24gKHRhcmdldCwgdXNlck9wdGlvbnMpIHtcbiAgICAvL0RlZmluZSBwb3BwZXIgcmVmZXJlbmNlIG9iamVjdCBhbmQgY3kgcmVmZXJlbmNlICBvYmplY3RcbiAgICBsZXQgcmVmT2JqZWN0ID0ge1xuXG4gICAgICAgIC8vIFN0b3JlIGNvcGllcyBvZiBkaW1lbnNpb25zIGFuZCBjeUVsZW1lbnQgb2JqZWN0c1xuICAgICAgICBjeUVsZW1lbnQ6IHRhcmdldCxcblxuICAgICAgICAvLyBEZWZpbmUgdGhlIGJvdW5kaW5nIGJveCBmb3IgdGhlIHBvcHBlciB0YXJnZXRcbiAgICAgICAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0OiB1c2VyT3B0aW9ucy5ib3VuZGluZ0JveCA/IHVzZXJPcHRpb25zLmJvdW5kaW5nQm94IDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUJvdW5kaW5nQm94LmdldFBvcHBlckJvdW5kaW5nQm94KHRhcmdldCwgdXNlck9wdGlvbnMpO1xuICAgICAgICB9LFxuICAgICAgICAvL0R5bmFtaWNhbGx5IGdlbmVyYXRlIHRoZSBkaW1lbnNpb24gb2JqZWN0IGZvciBoZWlnaHQgYW5kIHdpZHRoXG4gICAgICAgIGdldCBjbGllbnRXaWR0aCgpIHtcbiAgICAgICAgICAgIGxldCBuZXdEaW0gPSB1c2VyT3B0aW9ucy5nZXREaW1lbnNpb25zKHRoaXMuY3lFbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdEaW0udztcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGNsaWVudEhlaWdodCgpIHtcbiAgICAgICAgICAgIGxldCBuZXdEaW0gPSB1c2VyT3B0aW9ucy5nZXREaW1lbnNpb25zKHRoaXMuY3lFbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiBuZXdEaW0uaDtcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHJlZk9iamVjdDtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NyZWF0ZVJlZmVyZW5jZU9iamVjdC5qcyIsIi8vIFNpbXBsZSwgaW50ZXJuYWwgT2JqZWN0LmFzc2lnbigpIHBvbHlmaWxsIGZvciBvcHRpb25zIG9iamVjdHMgZXRjLlxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gIT0gbnVsbCA/IE9iamVjdC5hc3NpZ24uYmluZChPYmplY3QpIDogZnVuY3Rpb24gKHRndCwgLi4uc3Jjcykge1xuICBzcmNzLmZvckVhY2goc3JjID0+IHtcbiAgICBPYmplY3Qua2V5cyhzcmMpLmZvckVhY2goayA9PiB0Z3Rba10gPSBzcmNba10pO1xuICB9KTtcblxuICByZXR1cm4gdGd0O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hc3NpZ24uanMiLCIvL1VwZGF0ZSBwb3BwZXIgcG9zaXRpb25cbm1vZHVsZS5leHBvcnRzLnVwZGF0ZVBvcHBlck9iamVjdFBvc2l0aW9uID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGxldCBwb3BwZXIgPSB0YXJnZXQuc2NyYXRjaCgncG9wcGVyJyk7XG4gICAgcG9wcGVyLnNjaGVkdWxlVXBkYXRlKCk7XG4gICAgcmV0dXJuIHBvcHBlcjtcbn07XG5cbi8vV3JhcCBnaXZlbiBib3VuZGluZyBCb3ggdG8gbWF0Y2ggcG9wcGVyLmpzIGJvdW5kaW5nIGJveFxubW9kdWxlLmV4cG9ydHMuZ2V0UG9wcGVyQm91bmRpbmdCb3ggPSBmdW5jdGlvbiAodGFyZ2V0LCB1c2VyT3B0aW9ucykge1xuXG4gICAgbGV0IHtwb3NpdGlvbiwgY3ksIGdldERpbWVuc2lvbnN9ID0gdXNlck9wdGlvbnM7XG4gICAgbGV0IGN5T2Zmc2V0ID0gY3kuY29udGFpbmVyKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IGRpbWVuc2lvbnMgPSBnZXREaW1lbnNpb25zKHRhcmdldCk7XG4gICAgbGV0IHJlbmRlcmVkUG9zaXRpb24gPSBwb3NpdGlvbih0YXJnZXQpO1xuICAgIGxldCBzY3JvbGxZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgIGxldCBzY3JvbGxYID0gd2luZG93LnBhZ2VYT2Zmc2V0O1xuICAgXG4gICAgLy9UaHJvdyBlcnJvciBpZiBwb3NpdGlvbiBpcyBpbnZhbGlkXG4gICAgaWYgKCFyZW5kZXJlZFBvc2l0aW9uIHx8IHJlbmRlcmVkUG9zaXRpb24ueCA9PSBudWxsIHx8IGlzTmFOKHJlbmRlcmVkUG9zaXRpb24ueCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciA6IEludmFsaWQgUG9zaXRpb24nKTtcbiAgICB9XG5cbiAgICAvL1JldHVybiB0aGUgYm91bmRpbmcgIGJveFxuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogcmVuZGVyZWRQb3NpdGlvbi55ICsgY3lPZmZzZXQudG9wICsgc2Nyb2xsWSxcbiAgICAgICAgbGVmdDogcmVuZGVyZWRQb3NpdGlvbi54ICsgY3lPZmZzZXQubGVmdCArIHNjcm9sbFgsXG4gICAgICAgIHJpZ2h0OiByZW5kZXJlZFBvc2l0aW9uLnggKyBkaW1lbnNpb25zLncgKyBjeU9mZnNldC5sZWZ0ICsgc2Nyb2xsWCxcbiAgICAgICAgYm90dG9tOiByZW5kZXJlZFBvc2l0aW9uLnkgKyBkaW1lbnNpb25zLmggKyBjeU9mZnNldC50b3AgKyBzY3JvbGxZLFxuICAgICAgICB3aWR0aDogZGltZW5zaW9ucy53LFxuICAgICAgICBoZWlnaHQ6IGRpbWVuc2lvbnMuaCxcbiAgICB9O1xufTtcblxuLy9SZXR1cm4gUG9wcGVyIFRhcmdldCAoVGhlIGVsZW1lbnQgdG8gYmluZCBwb3BwZXIgdG8pXG5tb2R1bGUuZXhwb3J0cy5nZXRQb3BwZXJIdG1sT2JqZWN0ID0gZnVuY3Rpb24gKHRhcmdldCwgY29udGVudCkge1xuICAgIGxldCBjb250ZW50T2JqZWN0ID0gbnVsbDtcblxuICAgIC8vSWYgdGFyZ2V0IG9wdGlvbiBpcyBpbnZhbGlkLCByZXR1cm4gZXJyb3JcbiAgICBpZiAoIShjb250ZW50KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIDogTlVMTCBUYXJnZXQnKTtcbiAgICB9XG4gICAgLy9FeGVjdXRlIGZ1bmN0aW9uIGlmIHVzZXIgb3B0ZWQgZm9yIGEgZHlhbmFtaWMgdGFyZ2V0XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29udGVudE9iamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRlbnQodGFyZ2V0KSk7XG4gICAgfVxuICAgIC8vVHJlYXQgdGFyZ2V0IG9wdGlvbiBhcyBhbiBJRCBpZiAgdXNlciBvcHRlZCBmb3IgYSBzdGF0aWMgdGFyZ2V0XG4gICAgZWxzZSBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnRlbnRPYmplY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250ZW50KTtcbiAgICB9XG4gICAgLy9UYXJnZXQgb3B0aW9uIGlzIGFuIEhUTUwgZWxlbWVudFxuICAgIGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3IgOiBUYXJnZXQgRG9lcyBOb3QgRXhpc3QnKTtcbiAgICB9XG5cbiAgICAvL0NoZWNrIHZhbGlkaXR5IG9mIHBhcnNlZCB0YXJnZXRcbiAgICBpZiAoY29udGVudE9iamVjdCA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIDogVGFyZ2V0IENvdWxkIE5vdCBCZSBGb3VuZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb250ZW50T2JqZWN0O1xuICAgIH1cblxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jcmVhdGVCb3VuZGluZ0JveC5qcyIsIi8vSW5jbHVkZSBoZWxwZXIgZnVuY3Rpb25zIGFuZCBQb3BwZXJcbi8vaW1wb3J0IFBvcHBlciBmcm9tICdwb3BwZXIuanMnO1xuY29uc3QgY3JlYXRlQm91bmRpbmdCb3ggPSByZXF1aXJlKCcuL2NyZWF0ZUJvdW5kaW5nQm94Jyk7XG5jb25zdCBjcmVhdGVSZWZlcmVuY2VPYmplY3QgPSByZXF1aXJlKCcuL2NyZWF0ZVJlZmVyZW5jZU9iamVjdCcpO1xuXG4vL0ZpeCBQb3BwZXIuanMgd2VicGFjayBpbXBvcnQgY29uZmxpY3QgKFVzZSAuZGVmYXVsdCBpZiB1c2luZyB3ZWJwYWNrKVxubGV0IFBvcHBlciA9IHJlcXVpcmUoJ3BvcHBlci5qcycpO1xubGV0IEVzbVdlYnBhY2tQb3BwZXIgPSBQb3BwZXIuZGVmYXVsdDtcbmlmIChFc21XZWJwYWNrUG9wcGVyICE9IG51bGwgJiYgRXNtV2VicGFja1BvcHBlci5EZWZhdWx0cyAhPSBudWxsKSB7XG4gIFBvcHBlciA9IFBvcHBlci5kZWZhdWx0O1xufVxuXG4vL0NyZWF0ZSBhIG5ldyBwb3BwZXIgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCBhIGN5dG9zY2FwZSBlbGVtZW50IChOb2RlcyBvciBFZGdlcylcbm1vZHVsZS5leHBvcnRzLmNyZWF0ZVBvcHBlck9iamVjdCA9IGZ1bmN0aW9uICh0YXJnZXQsIHVzZXJPcHRpb25zKSB7XG4gIC8vRGVmaW5lIHBvcHBlciByZWZlcmVuY2Ugb2JqZWN0XG4gIGxldCByZWZPYmplY3QgPSBjcmVhdGVSZWZlcmVuY2VPYmplY3QuZ2V0UmVmKHRhcmdldCwgdXNlck9wdGlvbnMpO1xuXG4gIC8vR2V0IHZhbHVlcyBmcm9tIHVzZXIgb3B0aW9uc1xuICBsZXQgcG9wcGVyT3B0cyA9IHVzZXJPcHRpb25zLnBvcHBlcjtcbiAgcG9wcGVyT3B0cy5wbGFjZW1lbnQgPSBwb3BwZXJPcHRzLnBsYWNlbWVudCB8fCAnYm90dG9tJztcbiAgbGV0IHRhcmdldE9wdCA9IHVzZXJPcHRpb25zLmNvbnRlbnQ7XG4gIGxldCBjb250ZW50ID0gbnVsbDtcblxuICAvL0dldCB0YXJnZXQgdG8gYmluZCBwb3BwZXIgdG9cbiAgY29udGVudCA9IGNyZWF0ZUJvdW5kaW5nQm94LmdldFBvcHBlckh0bWxPYmplY3QodGFyZ2V0LCB0YXJnZXRPcHQpO1xuXG4gIC8vQ3JlYXRlIGFuZCByZXR1cm4gYWN0dWFsIHBvcHBlciBvYmplY3RcbiAgbGV0IHBvcHBlciA9IG5ldyBQb3BwZXIocmVmT2JqZWN0LCBjb250ZW50LCBwb3BwZXJPcHRzKTtcblxuICByZXR1cm4gcG9wcGVyO1xuXG5cbn07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9yZW5kZXIuanMiLCJjb25zdCBwb3BwZXJSZW5kZXJlciA9IHJlcXVpcmUoJy4vcmVuZGVyJyk7XG5jb25zdCBjcmVhdGVSZWZlcmVuY2VPYmplY3QgPSByZXF1aXJlKCcuL2NyZWF0ZVJlZmVyZW5jZU9iamVjdCcpO1xuY29uc3QgYXNzaWduID0gcmVxdWlyZSgnLi9hc3NpZ24nKTtcblxuLy9DcmVhdGUgYXBvcHBlciBvYmplY3QgZm9yIGZpcnN0IGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uXG5tb2R1bGUuZXhwb3J0cy5wb3BwZXIgPSBmdW5jdGlvbiAodXNlck9wdGlvbnMpIHtcbiAgd2Fybih0aGlzKTtcbiAgcmV0dXJuIHBvcHBlclJlbmRlcmVyLmNyZWF0ZVBvcHBlck9iamVjdCh0aGlzWzBdLCBjcmVhdGVPcHRpb25zT2JqZWN0KHRoaXNbMF0sIHVzZXJPcHRpb25zKSk7XG59O1xuXG4vL0NyZWF0ZSBhIHJlZmVyZW5jZSBvYmplY3QgZm9yIGEgZWxlbWVudCBpbiBhIGNvbGxlY3Rpb25cbm1vZHVsZS5leHBvcnRzLnBvcHBlclJlZiA9IGZ1bmN0aW9uICh1c2VyT3B0aW9ucykge1xuICB3YXJuKHRoaXMpO1xuICByZXR1cm4gY3JlYXRlUmVmZXJlbmNlT2JqZWN0LmdldFJlZih0aGlzWzBdLCBjcmVhdGVPcHRpb25zT2JqZWN0KHRoaXNbMF0sIHVzZXJPcHRpb25zKSk7XG5cbn07XG5cbi8vQ3JlYXRlIGEgb3B0aW9ucyBvYmplY3Qgd2l0aCByZXF1aXJlZCBkZWZhdWx0IHZhbHVlc1xuZnVuY3Rpb24gY3JlYXRlT3B0aW9uc09iamVjdCh0YXJnZXQsIHVzZXJPcHRpb25zKSB7XG4gIC8vU2V0IERlZmF1bHRzXG4gIGxldCBkZWZhdWx0cyA9IHtcbiAgICBnZXREaW1lbnNpb25zOiAodGFyZ2V0KSA9PiAoeyB3OiB0YXJnZXQucmVuZGVyZWRXaWR0aCgpLCBoOiB0YXJnZXQucmVuZGVyZWRIZWlnaHQoKSB9KSxcbiAgICBwb3NpdGlvbjogKHRhcmdldCkgPT4gdGFyZ2V0LmlzTm9kZSgpID8gZ2V0UmVuZGVyZWRDZW50ZXIodGFyZ2V0LCBkZWZhdWx0cy5nZXREaW1lbnNpb25zKSA6IGdldFJlbmRlcmVkTWlkcG9pbnQodGFyZ2V0KSxcbiAgICBwb3BwZXIgOiB7fSxcbiAgICBjeTogdGFyZ2V0LmN5KClcbiAgfTtcblxuICAvL0NyZWF0ZSBhIHVzZXIgb3B0aW9ucyBvYmplY3RcbiAgdXNlck9wdGlvbnMgPSBhc3NpZ24oIHt9LCBkZWZhdWx0cywgdXNlck9wdGlvbnMgKTtcblxuICByZXR1cm4gdXNlck9wdGlvbnM7XG59XG5cbi8vR2V0IHRoZSByZW5kZXJlZCBjZW50ZXJcbmZ1bmN0aW9uIGdldFJlbmRlcmVkQ2VudGVyKHRhcmdldCwgZ2V0RGltZW5zaW9ucyl7XG4gIGxldCBwb3MgPSB0YXJnZXQucmVuZGVyZWRQb3NpdGlvbigpO1xuICBsZXQgZGltZW5zaW9ucyA9IGdldERpbWVuc2lvbnModGFyZ2V0KTtcbiAgbGV0IG9mZnNldFggPSBkaW1lbnNpb25zLncgLyAyO1xuICBsZXQgb2Zmc2V0WSA9IGRpbWVuc2lvbnMuaCAvIDI7XG5cbiAgcmV0dXJuIHtcbiAgICB4IDogKHBvcy54IC0gb2Zmc2V0WCksXG4gICAgeSA6IChwb3MueSAtIG9mZnNldFkpXG4gIH07XG59XG5cbi8vR2V0IHRoZSByZW5kZXJlZCBwb3NpdGlvbiBvZiB0aGUgbWlkcG9pbnRcbmZ1bmN0aW9uIGdldFJlbmRlcmVkTWlkcG9pbnQodGFyZ2V0KXtcbiAgbGV0IHAgPSB0YXJnZXQubWlkcG9pbnQoKTtcbiAgbGV0IHBhbiA9IHRhcmdldC5jeSgpLnBhbigpO1xuICBsZXQgem9vbSA9IHRhcmdldC5jeSgpLnpvb20oKTtcblxuICByZXR1cm4ge1xuICAgIHg6IHAueCAqIHpvb20gKyBwYW4ueCxcbiAgICB5OiBwLnkgKiB6b29tICsgcGFuLnlcbiAgfTtcbn1cblxuLy9XYXJuIHVzZXIgYWJvdXQgbWlzdXNlIG9mIHRoZSBwbHVnaW5cbmZ1bmN0aW9uIHdhcm4oZWxlbWVudHMpIHtcbiAgLy9Qb3BwZXIuanMgU2hvdWxkIG9ubHkgYmUgdXNlZCBvbiAxIGVsZW1lbnRcbiAgaWYgKGVsZW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICBjb25zb2xlLndhcm4oXCJQb3BwZXIuanMgRXh0ZW5zaW9uIHNob3VsZCBvbmx5IGJlIHVzZWQgb24gb25lIGVsZW1lbnQuXCIpO1xuICAgIGNvbnNvbGUud2FybihcIklnbm9yaW5nIGFsbCBzdWJzZXF1ZW50IGVsZW1lbnRzXCIpO1xuICB9XG59XG5cblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb2xsZWN0aW9uLmpzIiwiY29uc3QgcG9wcGVyUmVuZGVyZXIgPSByZXF1aXJlKCcuL3JlbmRlcicpO1xuY29uc3QgY3JlYXRlUmVmZXJlbmNlT2JqZWN0ID0gcmVxdWlyZSgnLi9jcmVhdGVSZWZlcmVuY2VPYmplY3QnKTtcbmNvbnN0IGFzc2lnbiA9IHJlcXVpcmUoJy4vYXNzaWduJyk7XG5cbi8vQ3JlYXRlIGEgcG9wcGVyIG9iamVjdCAoVGhpcyBpcyBmb3IgdXNlIG9uIHRoZSBjb3JlKVxubW9kdWxlLmV4cG9ydHMucG9wcGVyID0gZnVuY3Rpb24gKHVzZXJPcHRpb25zKSB7XG4gIHJldHVybiBwb3BwZXJSZW5kZXJlci5jcmVhdGVQb3BwZXJPYmplY3QodGhpcywgY3JlYXRlT3B0aW9uc09iamVjdCh0aGlzLCB1c2VyT3B0aW9ucykpO1xufTtcblxuXG4vL0NyZWF0ZSBhIHJlZmVyZW5jZSBvYmplY3QgKFRoaXMgaXMgZm9yIHVzZSBvbiB0aGUgY29yZSlcbm1vZHVsZS5leHBvcnRzLnBvcHBlclJlZiA9IGZ1bmN0aW9uICh1c2VyT3B0aW9ucykge1xuICByZXR1cm4gY3JlYXRlUmVmZXJlbmNlT2JqZWN0LmdldFJlZih0aGlzLCBjcmVhdGVPcHRpb25zT2JqZWN0KHRoaXMsIHVzZXJPcHRpb25zKSk7XG59O1xuXG4vL0NyZWF0ZSBhIG9wdGlvbnMgb2JqZWN0IHdpdGggcmVxdWlyZWQgZGVmYXVsdCB2YWx1ZXNcbmZ1bmN0aW9uIGNyZWF0ZU9wdGlvbnNPYmplY3QodGFyZ2V0LCB1c2VyT3B0aW9ucykge1xuICBcbiAgLy9TZXQgRGVmYXVsdHMgXG4gIGxldCBkZWZhdWx0cyA9IHtcbiAgICBib3VuZGluZ0JveCA6IHtcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICByaWdodDogMCxcbiAgICAgIGJvdHRvbTogMCxcbiAgICAgIHc6IDMsXG4gICAgICBoOiAzLFxuICAgIH0sXG4gICAgZ2V0RGltZW5zaW9ucyA6ICgpID0+ICh7dzogMywgaDogM30pLFxuICAgIHBvc2l0aW9uIDogKCkgPT4gKHt4IDogMCwgeSA6IDB9KSxcbiAgICBwb3BwZXIgOiB7fSxcbiAgICBjeSA6IHRhcmdldFxuICB9O1xuXG4gIC8vQ3JlYXRlIGEgdXNlciBvcHRpb25zIG9iamVjdFxuICB1c2VyT3B0aW9ucyA9IGFzc2lnbigge30sIGRlZmF1bHRzLCB1c2VyT3B0aW9ucyApO1xuXG4gIHJldHVybiB1c2VyT3B0aW9ucztcbn1cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS5qcyIsIi8vR2V0IGRlcGVuZGVuY2llc1xuY29uc3QgY29yZUltcGwgPSByZXF1aXJlKCcuL2NvcmUnKTtcbmNvbnN0IGNvbGxlY3Rpb25JbXBsID0gcmVxdWlyZSgnLi9jb2xsZWN0aW9uJyk7XG5cbi8vIHJlZ2lzdGVycyB0aGUgZXh0ZW5zaW9uIG9uIGEgY3l0b3NjYXBlIGxpYiByZWZcbmxldCByZWdpc3RlciA9IGZ1bmN0aW9uIChjeXRvc2NhcGUpIHtcbiAgaWYgKCFjeXRvc2NhcGUpIHsgcmV0dXJuOyB9IC8vIGNhbid0IHJlZ2lzdGVyIGlmIGN5dG9zY2FwZSB1bnNwZWNpZmllZFxuXG4gIC8vIHJlZ2lzdGVyIHdpdGggY3l0b3NjYXBlLmpzXG4gIGN5dG9zY2FwZSgnY29yZScsICdwb3BwZXInLCBjb3JlSW1wbC5wb3BwZXIpOyAgLy9DeXRvc2NhcGUgQ29yZVxuICBjeXRvc2NhcGUoJ2NvbGxlY3Rpb24nLCAncG9wcGVyJywgY29sbGVjdGlvbkltcGwucG9wcGVyKTsgLy9DeXRvc2NhcGUgQ29sbGVjdGlvbnNcbiAgY3l0b3NjYXBlKCdjb3JlJywgJ3BvcHBlclJlZicsIGNvcmVJbXBsLnBvcHBlclJlZik7ICAvL0N5dG9zY2FwZSBDb3JlIGZvciBSZWZlcmVuY2VzIFxuICBjeXRvc2NhcGUoJ2NvbGxlY3Rpb24nLCAncG9wcGVyUmVmJywgY29sbGVjdGlvbkltcGwucG9wcGVyUmVmKTsgLy9DeXRvc2NhcGUgQ29sbGVjdGlvbnMgZm9yIFJlZmVyZW5jZXNcblxufTtcblxuaWYgKHR5cGVvZiBjeXRvc2NhcGUgIT09ICd1bmRlZmluZWQnKSB7IC8vIGV4cG9zZSB0byBnbG9iYWwgY3l0b3NjYXBlIChpLmUuIHdpbmRvdy5jeXRvc2NhcGUpXG4gIHJlZ2lzdGVyKGN5dG9zY2FwZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVnaXN0ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicG9wcGVyLmpzXCJcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==