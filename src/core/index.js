const popperRenderer = require('./render.js');
const createReferenceObject = require('./createReferenceObject.js'); 

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
function resolveUndefined(userOptions){
    if(! userOptions){
      return {};
    }
    else {
      return userOptions;
    }
}

