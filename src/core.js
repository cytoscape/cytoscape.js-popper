const assign = require('./assign');
const { getPopper } = require('./popper');
const { getRef } = require('./ref');

function popper(opts) {
  return getPopper(this, createOptionsObject(this, opts));
}


function popperRef(opts) {
  return getRef(this, createOptionsObject(this, opts));
}

//Create a options object with required default values
function createOptionsObject(target, opts) {
  let defaults = {
    boundingBox : {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      w: 3,
      h: 3,
    },
    renderedDimensions : () => ({w: 3, h: 3}),
    redneredPosition : () => ({x : 0, y : 0}),
    popper : {},
    cy : target
  };

  return assign( {}, defaults, opts );
}

module.exports = { popper, popperRef };
