//Get dependencies
const coreImpl = require('./core');
const collectionImpl = require('./collection');

// registers the extension on a cytoscape lib ref
let register = function (cytoscape) {
  if (!cytoscape) { return; } // can't register if cytoscape unspecified

  // register with cytoscape.js
  cytoscape('core', 'popper', coreImpl.core);  //Cytoscape Core
  cytoscape('collection', 'popper', collectionImpl.collection); //Cytoscape Collections
  cytoscape('core', 'popperRef', coreImpl.coreRef);  //Cytoscape Core for References 
  cytoscape('collection', 'popperRef', collectionImpl.collectionRef); //Cytoscape Collections for References

};

if (typeof cytoscape !== 'undefined') { // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape);
}

module.exports = register;
