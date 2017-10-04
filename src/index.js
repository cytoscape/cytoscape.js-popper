//Get dependencies
const impl = require('./core/index.js');

// registers the extension on a cytoscape lib ref
let register = function( cytoscape ){
  if( !cytoscape ){ return; } // can't register if cytoscape unspecified

  // register with cytoscape.js
  cytoscape( 'core', 'popper', impl.core );  //Cytoscape Core
  cytoscape( 'collection', 'popper', impl.collection); //Cytoscape Collections
  cytoscape( 'core', 'popperRef', impl.coreRef );  //Cytoscape Core for References 
  cytoscape( 'collection', 'popperRef', impl.collectionRef); //Cytoscape Collections for References

};

if( typeof cytoscape !== 'undefined' ){ // expose to global cytoscape (i.e. window.cytoscape)
  register( cytoscape );
}

module.exports = register;
