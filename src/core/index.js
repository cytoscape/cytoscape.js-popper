const popperRenderer = require('./render.js');

//Create a popper object (This is for use on the core)
module.exports.core = function (userOptions) {
  //Get cytoscape object and container
  var cy = this;

  //Create popper object
  var popper = popperRenderer.createPopperObject(cy, userOptions);

  return popper;
};

//Create a popper object for  all elements in a collection
module.exports.collection = function (userOptions) {
  var elements = this;
  var element = elements[0];

  //Popper.js Should only be used on 1 element
  if (elements.length > 1) {
    console.log("Popper.js Extension should only be used on one element.");
    console.log("Ignoring all subsequent elements");
  }

  //Create popper object
  var popper = popperRenderer.createPopperObject(element, userOptions);

  return popper; // chainability
};
