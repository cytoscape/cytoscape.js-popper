const popperRenderer = require('./render.js');

//Create a popper object (This is for use on the core)
module.exports.core = function(userOptions){
  //Get cytoscape object and container
  var cy = this;
  var container = cy.container();

  //Generate options and assign them on the scratchpad 
  var options = popperRenderer.createPopperOptionsObject(userOptions);
  cy.scratch('popper-opts', options.popper);
  cy.scratch('popper-target', options.target);

  //Create popper object
  var popper  = popperRenderer.createPopperObject(cy);
  cy.scratch('popper', popper);

  return this; 
};

module.exports.collection = function (userOptions) {
  var elements = this;
  var cy = this.cy();
  var container = cy.container();

  //Loop over each element in the current collection
  elements.each(function (element, i){
      //Create options object for current element
      var options = popperRenderer.createPopperOptionsObject(userOptions);
      element.scratch('popper-opts', options.popper || {});
      element.scratch('popper-target', options.target);

      //Create popper object
      var popper =  popperRenderer.createPopperObject(element);
      element.scratch('popper', popper);
  });

  return this; // chainability
};
