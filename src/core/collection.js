const popperRenderer = require('./render.js');

//Create a popper object on each elements in collection 
module.exports = function (userOptions) {
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
