(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("popper.js"));
	else if(typeof define === 'function' && define.amd)
		define(["popper.js"], factory);
	else if(typeof exports === 'object')
		exports["cytoscapePopper"] = factory(require("popper.js"));
	else
		root["cytoscapePopper"] = factory(root["popper.js"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
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


//Update popper position
module.exports.updatePopperObjectPosition = function (cyElement) {
    var popper = cyElement.scratch('popper');
    popper.scheduleUpdate();
    return popper;
};

//Return dimensions
module.exports.getPopperObjectDimensions = function (cyElement, userOptions) {
    //Set Defaults
    var width = cyElement.width();
    var height = cyElement.height();

    //Overide with the outer-dimensions if a bounding box is provided
    if (userOptions.boundingBox) {
        width = userOptions.boundingBox.w;
        height = userOptions.boundingBox.h;
    }

    //Return a dimension object
    return { w: width, h: height };
};

//Wrap given bounding Box to match popper.js bounding box
module.exports.getPopperBoundingBox = function (cyElement, cy, isNode, dim, boundingBox) {
    var position;

    //Create a bounding box if one isn't provided

    if (isNode) {
        position = cyElement.renderedPosition();
    } else {
        position = cyElement.midpoint();
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
module.exports.getPopperHtmlObject = function (cyElement, targetOpt) {
    var target = null;

    //If target option is invalid, return error
    if (!targetOpt) {
        throw new Exception("Error : NULL Target");
    }
    //Execute function if user opted for a dyanamic target
    else if (typeof targetOpt === 'function') {
            target = document.getElementById(targetOpt(cyElement));
        }
        //Treat target option as an ID if  user opted for a static target
        else if (typeof targetOpt === 'string') {
                target = document.getElementById(targetOpt);
            }
            //Target option is an HTML element
            else if (targetOpt instanceof HTMLElement) {
                    return targetOpt;
                } else {
                    throw new Exception("Error : Target Does Not Exist");
                }

    //Check validity of parsed target
    if (target === null) {
        throw new Exception("Error : Target Could Not Be Found");
    } else {
        return target;
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createBoundingBox = __webpack_require__(0);

//Create a reference object for an element
module.exports.getRef = function (cyElement, userOptions) {
    //Determine element properties to determine how to generate a reference object
    var isCy = cyElement.pan !== undefined && typeof cyElement.pan === 'function';
    var iscyElement = !isCy;
    var isNode = iscyElement && cyElement.isNode();
    var cy = isCy ? cyElement : cyElement.cy();

    //Get Dimensions for popper (Set Default to 3,3)
    var dim = createBoundingBox.getPopperObjectDimensions(cyElement, userOptions);

    //Define popper reference object
    var refObject;

    //Override if a reference override is provided
    if (userOptions.refObject) {
        refObject = userOptions.refObject;
    } else {
        refObject = {

            //Store copies of dimensions and cyElement objects
            dim: dim,
            cyElement: cyElement,

            //Define the bounding box for the popper target
            getBoundingClientRect: userOptions.boundingBox ? userOptions.boundingBox : function () {
                return createBoundingBox.getPopperBoundingBox(cyElement, cy, isNode, this.dim, userOptions.boundingBox);
            },
            //Dynamically generate the dimension object for height and width
            get clientWidth() {
                var newDim = createBoundingBox.getPopperObjectDimensions(this.cyElement, {});
                this.dim = newDim;
                return newDim.w;
            },
            get clientHeight() {
                var newDim = createBoundingBox.getPopperObjectDimensions(this.cyElement, {});
                this.dim = newDim;
                return newDim.h;
            }
        };
    }

    return refObject;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var popperRenderer = __webpack_require__(3);
var createReferenceObject = __webpack_require__(1);

//Create a popper object (This is for use on the core)
module.exports.core = function (userOptions) {
  //Get cytoscape object and container
  var cy = this;

  userOptions = resolveUndefined(userOptions);

  //Create popper object
  var popper = popperRenderer.createPopperObject(cy, userOptions);

  return popper;
};

//Create a popper object for first element in a collection
module.exports.collection = function (userOptions) {
  var elements = this;
  var element = elements[0];
  userOptions = resolveUndefined(userOptions);

  //Popper.js Should only be used on 1 element
  if (elements.length > 1) {
    console.warn("Popper.js Extension should only be used on one element.");
    console.warn("Ignoring all subsequent elements");
  }

  //Create popper object
  var popper = popperRenderer.createPopperObject(element, userOptions);

  return popper; // chainability
};

//Create a reference object (This is for use on the core)
module.exports.coreRef = function (userOptions) {
  //Get cytoscape object and container
  var cy = this;

  userOptions = resolveUndefined(userOptions);

  //Create popper object
  var popperRef = createReferenceObject.getRef(cy, userOptions);

  return popperRef;
};

//Create a reference object for a element in a collection
module.exports.collectionRef = function (userOptions) {
  var elements = this;
  var element = elements[0];
  userOptions = resolveUndefined(userOptions);

  //Popper.js Should only be used on 1 element
  if (elements.length > 1) {
    console.warn("Popper.js Extension should only be used on one element.");
    console.warn("Ignoring all subsequent elements");
  }

  //Create a reference object
  var popperRef = createReferenceObject.getRef(element, userOptions);

  return popperRef; // chainability
};

//Resolve undefined errors 
function resolveUndefined(userOptions) {
  if (!userOptions) {
    return {};
  } else {
    return userOptions;
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Include helper functions and Popper
//import Popper from 'popper.js';
var createBoundingBox = __webpack_require__(0);
var createReferenceObject = __webpack_require__(1);

//Fix Popper.js webpack import conflict (Use .default if using webpack)
var Popper = __webpack_require__(5);
var EsmWebpackPopper = Popper.default;
if (EsmWebpackPopper != null && EsmWebpackPopper.Defaults != null) {
    Popper = Popper.default;
}

//Create a new popper object associated with a cytoscape element (Nodes or Edges)
module.exports.createPopperObject = function (cyElement, userOptions) {
    //Define popper reference object
    var refObject = createReferenceObject.getRef(cyElement, userOptions);

    //Get Values from scratchpad
    var popperOpts = userOptions.popper;
    popperOpts.placement = popperOpts.placement || 'bottom';
    var targetOpt = userOptions.target;
    var target = null;

    //Get target to bind popper to
    try {
        target = createBoundingBox.getPopperHtmlObject(cyElement, targetOpt);
    } catch (e) {
        //Stop creating a popper
        return;
    }

    //Create and return actual popper object
    var popper = new Popper(refObject, target, popperOpts);

    return popper;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Get dependencies
var impl = __webpack_require__(2);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  // register with cytoscape.js
  cytoscape('core', 'popper', impl.core); //Cytoscape Core
  cytoscape('collection', 'popper', impl.collection); //Cytoscape Collections
  cytoscape('core', 'popperRef', impl.coreRef); //Cytoscape Core for References 
  cytoscape('collection', 'popperRef', impl.collectionRef); //Cytoscape Collections for References
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape);
}

module.exports = register;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiZDM3YjFmZjZmNWU4MTU5ZjAwNyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jcmVhdGVCb3VuZGluZ0JveC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9jcmVhdGVSZWZlcmVuY2VPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvcmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwb3BwZXIuanNcIiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwidXBkYXRlUG9wcGVyT2JqZWN0UG9zaXRpb24iLCJjeUVsZW1lbnQiLCJwb3BwZXIiLCJzY3JhdGNoIiwic2NoZWR1bGVVcGRhdGUiLCJnZXRQb3BwZXJPYmplY3REaW1lbnNpb25zIiwidXNlck9wdGlvbnMiLCJ3aWR0aCIsImhlaWdodCIsImJvdW5kaW5nQm94IiwidyIsImgiLCJnZXRQb3BwZXJCb3VuZGluZ0JveCIsImN5IiwiaXNOb2RlIiwiZGltIiwicG9zaXRpb24iLCJyZW5kZXJlZFBvc2l0aW9uIiwibWlkcG9pbnQiLCJjeU9mZnNldCIsImNvbnRhaW5lciIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIngiLCJpc05hTiIsInRvcCIsInkiLCJ3aW5kb3ciLCJwYWdlWU9mZnNldCIsImxlZnQiLCJwYWdlWE9mZnNldCIsInJpZ2h0IiwiYm90dG9tIiwiZ2V0UG9wcGVySHRtbE9iamVjdCIsInRhcmdldE9wdCIsInRhcmdldCIsIkV4Y2VwdGlvbiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJIVE1MRWxlbWVudCIsImNyZWF0ZUJvdW5kaW5nQm94IiwicmVxdWlyZSIsImdldFJlZiIsImlzQ3kiLCJwYW4iLCJ1bmRlZmluZWQiLCJpc2N5RWxlbWVudCIsInJlZk9iamVjdCIsImNsaWVudFdpZHRoIiwibmV3RGltIiwiY2xpZW50SGVpZ2h0IiwicG9wcGVyUmVuZGVyZXIiLCJjcmVhdGVSZWZlcmVuY2VPYmplY3QiLCJjb3JlIiwicmVzb2x2ZVVuZGVmaW5lZCIsImNyZWF0ZVBvcHBlck9iamVjdCIsImNvbGxlY3Rpb24iLCJlbGVtZW50cyIsImVsZW1lbnQiLCJsZW5ndGgiLCJjb25zb2xlIiwid2FybiIsImNvcmVSZWYiLCJwb3BwZXJSZWYiLCJjb2xsZWN0aW9uUmVmIiwiUG9wcGVyIiwiRXNtV2VicGFja1BvcHBlciIsImRlZmF1bHQiLCJEZWZhdWx0cyIsInBvcHBlck9wdHMiLCJwbGFjZW1lbnQiLCJlIiwiaW1wbCIsInJlZ2lzdGVyIiwiY3l0b3NjYXBlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDaEVBO0FBQ0FBLE9BQU9DLE9BQVAsQ0FBZUMsMEJBQWYsR0FBNEMsVUFBVUMsU0FBVixFQUFxQjtBQUM3RCxRQUFJQyxTQUFTRCxVQUFVRSxPQUFWLENBQWtCLFFBQWxCLENBQWI7QUFDQUQsV0FB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LEVBUGtDLENBT3lCO0FBRTVELENBVEQ7O0FBV0EsSUFBSSxPQUFPVSxTQUFQLEtBQXFCLFdBQXpCLEVBQXNDO0FBQUU7QUFDdENELFdBQVVDLFNBQVY7QUFDRDs7QUFFRDNFLE9BQU9DLE9BQVAsR0FBaUJ5RSxRQUFqQixDOzs7Ozs7QUNuQkEsK0MiLCJmaWxlIjoiY3l0b3NjYXBlLXBvcHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcInBvcHBlci5qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJwb3BwZXIuanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiY3l0b3NjYXBlUG9wcGVyXCJdID0gZmFjdG9yeShyZXF1aXJlKFwicG9wcGVyLmpzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJjeXRvc2NhcGVQb3BwZXJcIl0gPSBmYWN0b3J5KHJvb3RbXCJwb3BwZXIuanNcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiZDM3YjFmZjZmNWU4MTU5ZjAwNyIsIi8vVXBkYXRlIHBvcHBlciBwb3NpdGlvblxubW9kdWxlLmV4cG9ydHMudXBkYXRlUG9wcGVyT2JqZWN0UG9zaXRpb24gPSBmdW5jdGlvbiAoY3lFbGVtZW50KSB7XG4gICAgdmFyIHBvcHBlciA9IGN5RWxlbWVudC5zY3JhdGNoKCdwb3BwZXInKTtcbiAgICBwb3BwZXIuc2NoZWR1bGVVcGRhdGUoKTtcbiAgICByZXR1cm4gcG9wcGVyO1xufTtcblxuLy9SZXR1cm4gZGltZW5zaW9uc1xubW9kdWxlLmV4cG9ydHMuZ2V0UG9wcGVyT2JqZWN0RGltZW5zaW9ucyA9IGZ1bmN0aW9uIChjeUVsZW1lbnQsIHVzZXJPcHRpb25zKSB7XG4gICAgLy9TZXQgRGVmYXVsdHNcbiAgICB2YXIgd2lkdGggPSBjeUVsZW1lbnQud2lkdGgoKTtcbiAgICB2YXIgaGVpZ2h0ID0gY3lFbGVtZW50LmhlaWdodCgpO1xuXG4gICAgLy9PdmVyaWRlIHdpdGggdGhlIG91dGVyLWRpbWVuc2lvbnMgaWYgYSBib3VuZGluZyBib3ggaXMgcHJvdmlkZWRcbiAgICBpZiAodXNlck9wdGlvbnMuYm91bmRpbmdCb3gpIHtcbiAgICAgICAgd2lkdGggPSB1c2VyT3B0aW9ucy5ib3VuZGluZ0JveC53O1xuICAgICAgICBoZWlnaHQgPSB1c2VyT3B0aW9ucy5ib3VuZGluZ0JveC5oO1xuICAgIH1cblxuICAgIC8vUmV0dXJuIGEgZGltZW5zaW9uIG9iamVjdFxuICAgIHJldHVybiB7IHc6IHdpZHRoLCBoOiBoZWlnaHQgfTtcbn07XG5cbi8vV3JhcCBnaXZlbiBib3VuZGluZyBCb3ggdG8gbWF0Y2ggcG9wcGVyLmpzIGJvdW5kaW5nIGJveFxubW9kdWxlLmV4cG9ydHMuZ2V0UG9wcGVyQm91bmRpbmdCb3ggPSBmdW5jdGlvbiAoY3lFbGVtZW50LCBjeSwgaXNOb2RlLCBkaW0sIGJvdW5kaW5nQm94KSB7XG4gICAgdmFyIHBvc2l0aW9uO1xuXG4gICAgLy9DcmVhdGUgYSBib3VuZGluZyBib3ggaWYgb25lIGlzbid0IHByb3ZpZGVkXG5cbiAgICBpZiAoaXNOb2RlKSB7XG4gICAgICAgIHBvc2l0aW9uID0gY3lFbGVtZW50LnJlbmRlcmVkUG9zaXRpb24oKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHBvc2l0aW9uID0gY3lFbGVtZW50Lm1pZHBvaW50KCk7XG4gICAgfVxuXG4gICAgdmFyIGN5T2Zmc2V0ID0gY3kuY29udGFpbmVyKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAvL0V4aXQgaWYgcG9zaXRpb24gaXMgaW52YWxpZFxuICAgIGlmICghcG9zaXRpb24gfHwgcG9zaXRpb24ueCA9PSBudWxsIHx8IGlzTmFOKHBvc2l0aW9uLngpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvL1JldHVybiB0aGUgYm91bmRpbmcgIGJveFxuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogcG9zaXRpb24ueSArIGN5T2Zmc2V0LnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCxcbiAgICAgICAgbGVmdDogcG9zaXRpb24ueCArIGN5T2Zmc2V0LmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQsXG4gICAgICAgIHJpZ2h0OiBwb3NpdGlvbi54ICsgZGltLncgKyBjeU9mZnNldC5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgICAgICBib3R0b206IHBvc2l0aW9uLnkgKyBkaW0uaCArIGN5T2Zmc2V0LnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCxcbiAgICAgICAgd2lkdGg6IGRpbS53LFxuICAgICAgICBoZWlnaHQ6IGRpbS5oLFxuICAgIH07XG59O1xuXG4vL1JldHVybiBQb3BwZXIgVGFyZ2V0IChUaGUgZWxlbWVudCB0byBiaW5kIHBvcHBlciB0bylcbm1vZHVsZS5leHBvcnRzLmdldFBvcHBlckh0bWxPYmplY3QgPSBmdW5jdGlvbiAoY3lFbGVtZW50LCB0YXJnZXRPcHQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gbnVsbDtcblxuICAgIC8vSWYgdGFyZ2V0IG9wdGlvbiBpcyBpbnZhbGlkLCByZXR1cm4gZXJyb3JcbiAgICBpZiAoISh0YXJnZXRPcHQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJFcnJvciA6IE5VTEwgVGFyZ2V0XCIpO1xuICAgIH1cbiAgICAvL0V4ZWN1dGUgZnVuY3Rpb24gaWYgdXNlciBvcHRlZCBmb3IgYSBkeWFuYW1pYyB0YXJnZXRcbiAgICBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0T3B0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldE9wdChjeUVsZW1lbnQpKTtcbiAgICB9XG4gICAgLy9UcmVhdCB0YXJnZXQgb3B0aW9uIGFzIGFuIElEIGlmICB1c2VyIG9wdGVkIGZvciBhIHN0YXRpYyB0YXJnZXRcbiAgICBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0T3B0ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRPcHQpO1xuICAgIH1cbiAgICAvL1RhcmdldCBvcHRpb24gaXMgYW4gSFRNTCBlbGVtZW50XG4gICAgZWxzZSBpZiAodGFyZ2V0T3B0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpe1xuICAgICAgICByZXR1cm4gdGFyZ2V0T3B0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIkVycm9yIDogVGFyZ2V0IERvZXMgTm90IEV4aXN0XCIpO1xuICAgIH1cblxuICAgIC8vQ2hlY2sgdmFsaWRpdHkgb2YgcGFyc2VkIHRhcmdldFxuICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIkVycm9yIDogVGFyZ2V0IENvdWxkIE5vdCBCZSBGb3VuZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb3JlL2NyZWF0ZUJvdW5kaW5nQm94LmpzIiwiY29uc3QgY3JlYXRlQm91bmRpbmdCb3ggPSByZXF1aXJlKCcuL2NyZWF0ZUJvdW5kaW5nQm94LmpzJyk7XG5cbi8vQ3JlYXRlIGEgcmVmZXJlbmNlIG9iamVjdCBmb3IgYW4gZWxlbWVudFxubW9kdWxlLmV4cG9ydHMuZ2V0UmVmPSBmdW5jdGlvbiAoY3lFbGVtZW50LCB1c2VyT3B0aW9ucykge1xuICAgIC8vRGV0ZXJtaW5lIGVsZW1lbnQgcHJvcGVydGllcyB0byBkZXRlcm1pbmUgaG93IHRvIGdlbmVyYXRlIGEgcmVmZXJlbmNlIG9iamVjdFxuICAgIHZhciBpc0N5ID0gY3lFbGVtZW50LnBhbiAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjeUVsZW1lbnQucGFuID09PSAnZnVuY3Rpb24nO1xuICAgIHZhciBpc2N5RWxlbWVudCA9ICFpc0N5O1xuICAgIHZhciBpc05vZGUgPSBpc2N5RWxlbWVudCAmJiBjeUVsZW1lbnQuaXNOb2RlKCk7XG4gICAgdmFyIGN5ID0gaXNDeSA/IGN5RWxlbWVudCA6IGN5RWxlbWVudC5jeSgpO1xuXG4gICAgLy9HZXQgRGltZW5zaW9ucyBmb3IgcG9wcGVyIChTZXQgRGVmYXVsdCB0byAzLDMpXG4gICAgdmFyIGRpbSA9IGNyZWF0ZUJvdW5kaW5nQm94LmdldFBvcHBlck9iamVjdERpbWVuc2lvbnMoY3lFbGVtZW50LCB1c2VyT3B0aW9ucyk7XG5cbiAgICAvL0RlZmluZSBwb3BwZXIgcmVmZXJlbmNlIG9iamVjdFxuICAgIHZhciByZWZPYmplY3Q7XG5cbiAgICAvL092ZXJyaWRlIGlmIGEgcmVmZXJlbmNlIG92ZXJyaWRlIGlzIHByb3ZpZGVkXG4gICAgaWYgKHVzZXJPcHRpb25zLnJlZk9iamVjdCkge1xuICAgICAgICByZWZPYmplY3QgPSB1c2VyT3B0aW9ucy5yZWZPYmplY3Q7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZWZPYmplY3QgPSB7XG5cbiAgICAgICAgICAgIC8vU3RvcmUgY29waWVzIG9mIGRpbWVuc2lvbnMgYW5kIGN5RWxlbWVudCBvYmplY3RzXG4gICAgICAgICAgICBkaW0gOiBkaW0sXG4gICAgICAgICAgICBjeUVsZW1lbnQgOiBjeUVsZW1lbnQsXG5cbiAgICAgICAgICAgIC8vRGVmaW5lIHRoZSBib3VuZGluZyBib3ggZm9yIHRoZSBwb3BwZXIgdGFyZ2V0XG4gICAgICAgICAgICBnZXRCb3VuZGluZ0NsaWVudFJlY3Q6IHVzZXJPcHRpb25zLmJvdW5kaW5nQm94ID8gdXNlck9wdGlvbnMuYm91bmRpbmdCb3ggOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUJvdW5kaW5nQm94LmdldFBvcHBlckJvdW5kaW5nQm94KGN5RWxlbWVudCwgY3ksIGlzTm9kZSwgdGhpcy5kaW0sIHVzZXJPcHRpb25zLmJvdW5kaW5nQm94KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvL0R5bmFtaWNhbGx5IGdlbmVyYXRlIHRoZSBkaW1lbnNpb24gb2JqZWN0IGZvciBoZWlnaHQgYW5kIHdpZHRoXG4gICAgICAgICAgICBnZXQgY2xpZW50V2lkdGgoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0RpbSA9IGNyZWF0ZUJvdW5kaW5nQm94LmdldFBvcHBlck9iamVjdERpbWVuc2lvbnModGhpcy5jeUVsZW1lbnQsIHt9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpbSA9IG5ld0RpbTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3RGltLnc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0IGNsaWVudEhlaWdodCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3RGltID0gY3JlYXRlQm91bmRpbmdCb3guZ2V0UG9wcGVyT2JqZWN0RGltZW5zaW9ucyh0aGlzLmN5RWxlbWVudCwge30pO1xuICAgICAgICAgICAgICAgIHRoaXMuZGltID0gbmV3RGltO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdEaW0uaDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlZk9iamVjdDtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvY3JlYXRlUmVmZXJlbmNlT2JqZWN0LmpzIiwiY29uc3QgcG9wcGVyUmVuZGVyZXIgPSByZXF1aXJlKCcuL3JlbmRlci5qcycpO1xuY29uc3QgY3JlYXRlUmVmZXJlbmNlT2JqZWN0ID0gcmVxdWlyZSgnLi9jcmVhdGVSZWZlcmVuY2VPYmplY3QuanMnKTsgXG5cbi8vQ3JlYXRlIGEgcG9wcGVyIG9iamVjdCAoVGhpcyBpcyBmb3IgdXNlIG9uIHRoZSBjb3JlKVxubW9kdWxlLmV4cG9ydHMuY29yZSA9IGZ1bmN0aW9uICh1c2VyT3B0aW9ucykge1xuICAvL0dldCBjeXRvc2NhcGUgb2JqZWN0IGFuZCBjb250YWluZXJcbiAgdmFyIGN5ID0gdGhpcztcblxuICB1c2VyT3B0aW9ucyA9IHJlc29sdmVVbmRlZmluZWQodXNlck9wdGlvbnMpOyBcblxuICAvL0NyZWF0ZSBwb3BwZXIgb2JqZWN0XG4gIHZhciBwb3BwZXIgPSBwb3BwZXJSZW5kZXJlci5jcmVhdGVQb3BwZXJPYmplY3QoY3ksIHVzZXJPcHRpb25zKTtcblxuICByZXR1cm4gcG9wcGVyO1xufTtcblxuLy9DcmVhdGUgYSBwb3BwZXIgb2JqZWN0IGZvciBmaXJzdCBlbGVtZW50IGluIGEgY29sbGVjdGlvblxubW9kdWxlLmV4cG9ydHMuY29sbGVjdGlvbiA9IGZ1bmN0aW9uICh1c2VyT3B0aW9ucykge1xuICB2YXIgZWxlbWVudHMgPSB0aGlzO1xuICB2YXIgZWxlbWVudCA9IGVsZW1lbnRzWzBdO1xuICB1c2VyT3B0aW9ucyA9IHJlc29sdmVVbmRlZmluZWQodXNlck9wdGlvbnMpOyBcblxuICAvL1BvcHBlci5qcyBTaG91bGQgb25seSBiZSB1c2VkIG9uIDEgZWxlbWVudFxuICBpZiAoZWxlbWVudHMubGVuZ3RoID4gMSkge1xuICAgIGNvbnNvbGUud2FybihcIlBvcHBlci5qcyBFeHRlbnNpb24gc2hvdWxkIG9ubHkgYmUgdXNlZCBvbiBvbmUgZWxlbWVudC5cIik7XG4gICAgY29uc29sZS53YXJuKFwiSWdub3JpbmcgYWxsIHN1YnNlcXVlbnQgZWxlbWVudHNcIik7XG4gIH1cblxuICAvL0NyZWF0ZSBwb3BwZXIgb2JqZWN0XG4gIHZhciBwb3BwZXIgPSBwb3BwZXJSZW5kZXJlci5jcmVhdGVQb3BwZXJPYmplY3QoZWxlbWVudCwgdXNlck9wdGlvbnMpO1xuXG4gIHJldHVybiBwb3BwZXI7IC8vIGNoYWluYWJpbGl0eVxufTtcblxuLy9DcmVhdGUgYSByZWZlcmVuY2Ugb2JqZWN0IChUaGlzIGlzIGZvciB1c2Ugb24gdGhlIGNvcmUpXG5tb2R1bGUuZXhwb3J0cy5jb3JlUmVmID0gZnVuY3Rpb24gKHVzZXJPcHRpb25zKSB7XG4gIC8vR2V0IGN5dG9zY2FwZSBvYmplY3QgYW5kIGNvbnRhaW5lclxuICB2YXIgY3kgPSB0aGlzO1xuXG4gIHVzZXJPcHRpb25zID0gcmVzb2x2ZVVuZGVmaW5lZCh1c2VyT3B0aW9ucyk7IFxuXG4gIC8vQ3JlYXRlIHBvcHBlciBvYmplY3RcbiAgdmFyIHBvcHBlclJlZiA9IGNyZWF0ZVJlZmVyZW5jZU9iamVjdC5nZXRSZWYoY3ksIHVzZXJPcHRpb25zKTtcblxuICByZXR1cm4gcG9wcGVyUmVmO1xufTtcblxuLy9DcmVhdGUgYSByZWZlcmVuY2Ugb2JqZWN0IGZvciBhIGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uXG5tb2R1bGUuZXhwb3J0cy5jb2xsZWN0aW9uUmVmID0gZnVuY3Rpb24gKHVzZXJPcHRpb25zKSB7XG4gIHZhciBlbGVtZW50cyA9IHRoaXM7XG4gIHZhciBlbGVtZW50ID0gZWxlbWVudHNbMF07XG4gIHVzZXJPcHRpb25zID0gcmVzb2x2ZVVuZGVmaW5lZCh1c2VyT3B0aW9ucyk7IFxuXG4gIC8vUG9wcGVyLmpzIFNob3VsZCBvbmx5IGJlIHVzZWQgb24gMSBlbGVtZW50XG4gIGlmIChlbGVtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgY29uc29sZS53YXJuKFwiUG9wcGVyLmpzIEV4dGVuc2lvbiBzaG91bGQgb25seSBiZSB1c2VkIG9uIG9uZSBlbGVtZW50LlwiKTtcbiAgICBjb25zb2xlLndhcm4oXCJJZ25vcmluZyBhbGwgc3Vic2VxdWVudCBlbGVtZW50c1wiKTtcbiAgfVxuXG4gIC8vQ3JlYXRlIGEgcmVmZXJlbmNlIG9iamVjdFxuICB2YXIgcG9wcGVyUmVmID0gY3JlYXRlUmVmZXJlbmNlT2JqZWN0LmdldFJlZihlbGVtZW50LCB1c2VyT3B0aW9ucyk7XG5cbiAgcmV0dXJuIHBvcHBlclJlZjsgLy8gY2hhaW5hYmlsaXR5XG59O1xuXG4vL1Jlc29sdmUgdW5kZWZpbmVkIGVycm9ycyBcbmZ1bmN0aW9uIHJlc29sdmVVbmRlZmluZWQodXNlck9wdGlvbnMpe1xuICAgIGlmKCEgdXNlck9wdGlvbnMpe1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiB1c2VyT3B0aW9ucztcbiAgICB9XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb3JlL2luZGV4LmpzIiwiLy9JbmNsdWRlIGhlbHBlciBmdW5jdGlvbnMgYW5kIFBvcHBlclxuLy9pbXBvcnQgUG9wcGVyIGZyb20gJ3BvcHBlci5qcyc7XG5jb25zdCBjcmVhdGVCb3VuZGluZ0JveCA9IHJlcXVpcmUoJy4vY3JlYXRlQm91bmRpbmdCb3guanMnKTtcbmNvbnN0IGNyZWF0ZVJlZmVyZW5jZU9iamVjdCA9IHJlcXVpcmUoJy4vY3JlYXRlUmVmZXJlbmNlT2JqZWN0LmpzJyk7XG5cbi8vRml4IFBvcHBlci5qcyB3ZWJwYWNrIGltcG9ydCBjb25mbGljdCAoVXNlIC5kZWZhdWx0IGlmIHVzaW5nIHdlYnBhY2spXG5sZXQgUG9wcGVyID0gcmVxdWlyZSgncG9wcGVyLmpzJyk7XG5sZXQgRXNtV2VicGFja1BvcHBlciA9IFBvcHBlci5kZWZhdWx0O1xuaWYgKEVzbVdlYnBhY2tQb3BwZXIgIT0gbnVsbCAmJiBFc21XZWJwYWNrUG9wcGVyLkRlZmF1bHRzICE9IG51bGwpIHtcbiAgICBQb3BwZXIgPSBQb3BwZXIuZGVmYXVsdDtcbn1cblxuLy9DcmVhdGUgYSBuZXcgcG9wcGVyIG9iamVjdCBhc3NvY2lhdGVkIHdpdGggYSBjeXRvc2NhcGUgZWxlbWVudCAoTm9kZXMgb3IgRWRnZXMpXG5tb2R1bGUuZXhwb3J0cy5jcmVhdGVQb3BwZXJPYmplY3QgPSBmdW5jdGlvbiAoY3lFbGVtZW50LCB1c2VyT3B0aW9ucykge1xuICAgIC8vRGVmaW5lIHBvcHBlciByZWZlcmVuY2Ugb2JqZWN0XG4gICAgdmFyIHJlZk9iamVjdCA9IGNyZWF0ZVJlZmVyZW5jZU9iamVjdC5nZXRSZWYoY3lFbGVtZW50LCB1c2VyT3B0aW9ucyk7XG5cbiAgICAvL0dldCBWYWx1ZXMgZnJvbSBzY3JhdGNocGFkXG4gICAgdmFyIHBvcHBlck9wdHMgPSB1c2VyT3B0aW9ucy5wb3BwZXI7XG4gICAgcG9wcGVyT3B0cy5wbGFjZW1lbnQgPSBwb3BwZXJPcHRzLnBsYWNlbWVudCB8fCAnYm90dG9tJztcbiAgICB2YXIgdGFyZ2V0T3B0ID0gdXNlck9wdGlvbnMudGFyZ2V0O1xuICAgIHZhciB0YXJnZXQgPSBudWxsO1xuXG4gICAgLy9HZXQgdGFyZ2V0IHRvIGJpbmQgcG9wcGVyIHRvXG4gICAgdHJ5IHtcbiAgICAgICAgdGFyZ2V0ID0gY3JlYXRlQm91bmRpbmdCb3guZ2V0UG9wcGVySHRtbE9iamVjdChjeUVsZW1lbnQsIHRhcmdldE9wdCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIC8vU3RvcCBjcmVhdGluZyBhIHBvcHBlclxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy9DcmVhdGUgYW5kIHJldHVybiBhY3R1YWwgcG9wcGVyIG9iamVjdFxuICAgIHZhciBwb3BwZXIgPSBuZXcgUG9wcGVyKHJlZk9iamVjdCwgdGFyZ2V0LCBwb3BwZXJPcHRzKTtcblxuICAgIHJldHVybiBwb3BwZXI7XG5cblxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb3JlL3JlbmRlci5qcyIsIi8vR2V0IGRlcGVuZGVuY2llc1xuY29uc3QgaW1wbCA9IHJlcXVpcmUoJy4vY29yZS9pbmRleC5qcycpO1xuXG4vLyByZWdpc3RlcnMgdGhlIGV4dGVuc2lvbiBvbiBhIGN5dG9zY2FwZSBsaWIgcmVmXG5sZXQgcmVnaXN0ZXIgPSBmdW5jdGlvbiggY3l0b3NjYXBlICl7XG4gIGlmKCAhY3l0b3NjYXBlICl7IHJldHVybjsgfSAvLyBjYW4ndCByZWdpc3RlciBpZiBjeXRvc2NhcGUgdW5zcGVjaWZpZWRcblxuICAvLyByZWdpc3RlciB3aXRoIGN5dG9zY2FwZS5qc1xuICBjeXRvc2NhcGUoICdjb3JlJywgJ3BvcHBlcicsIGltcGwuY29yZSApOyAgLy9DeXRvc2NhcGUgQ29yZVxuICBjeXRvc2NhcGUoICdjb2xsZWN0aW9uJywgJ3BvcHBlcicsIGltcGwuY29sbGVjdGlvbik7IC8vQ3l0b3NjYXBlIENvbGxlY3Rpb25zXG4gIGN5dG9zY2FwZSggJ2NvcmUnLCAncG9wcGVyUmVmJywgaW1wbC5jb3JlUmVmICk7ICAvL0N5dG9zY2FwZSBDb3JlIGZvciBSZWZlcmVuY2VzIFxuICBjeXRvc2NhcGUoICdjb2xsZWN0aW9uJywgJ3BvcHBlclJlZicsIGltcGwuY29sbGVjdGlvblJlZik7IC8vQ3l0b3NjYXBlIENvbGxlY3Rpb25zIGZvciBSZWZlcmVuY2VzXG5cbn07XG5cbmlmKCB0eXBlb2YgY3l0b3NjYXBlICE9PSAndW5kZWZpbmVkJyApeyAvLyBleHBvc2UgdG8gZ2xvYmFsIGN5dG9zY2FwZSAoaS5lLiB3aW5kb3cuY3l0b3NjYXBlKVxuICByZWdpc3RlciggY3l0b3NjYXBlICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVnaXN0ZXI7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNV9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicG9wcGVyLmpzXCJcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==