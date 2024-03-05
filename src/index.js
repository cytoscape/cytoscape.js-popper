const coreImpl = require('./core');
const collectionImpl = require('./collection');

// registers the extension on a cytoscape lib ref
let registerFactory = function(popperFactory) {
  if (typeof popperFactory !== "function") {
    throw new Error(`Provide 'popperFactory' before registering the module`);
  }

  return function register(cytoscape) {
    if (!cytoscape) { return; } // can't register if cytoscape unspecified

    // register with cytoscape.js
    cytoscape('core', 'popperFactory', popperFactory);  // Cytoscape Core factory
    cytoscape('collection', 'popperFactory', popperFactory); //Cytoscape Collections factory
    cytoscape('core', 'popper', coreImpl.popper);  //Cytoscape Core
    cytoscape('collection', 'popper', collectionImpl.popper); //Cytoscape Collections
    cytoscape('core', 'popperRef', coreImpl.popperRef);  //Cytoscape Core for References
    cytoscape('collection', 'popperRef', collectionImpl.popperRef); //Cytoscape Collections for References
  };
} ;

module.exports = registerFactory;
