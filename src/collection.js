const assign = require('./assign');
const { getPopper } = require('./popper');
const { getRef } = require('./ref');

function popper (opts) {
  checkForWarning(this);

  return getPopper(this[0], createOptionsObject(this[0], opts));
}

function popperRef(opts) {
  checkForWarning(this);

  return getRef(this[0], createOptionsObject(this[0], opts));
}

function createOptionsObject(target, opts) {
  let renderedDimensions = el => el.isNode() ? ({ w: el.renderedWidth(), h: el.renderedHeight() }) : ({ w: 3, h: 3 });
  let renderedPosition = el => el.isNode() ? getRenderedCenter(el, renderedDimensions) : getRenderedMidpoint(el);
  let popper = {};
  let cy = target.cy();

  let defaults = { renderedDimensions, renderedPosition, popper, cy };

  return assign( {}, defaults, opts );
}

//Get the rendered center
function getRenderedCenter(target, renderedDimensions){
  let pos = target.renderedPosition();
  let dimensions = renderedDimensions(target);
  let offsetX = dimensions.w / 2;
  let offsetY = dimensions.h / 2;

  return {
    x : (pos.x - offsetX),
    y : (pos.y - offsetY)
  };
}

//Get the rendered position of the midpoint
function getRenderedMidpoint(target){
  let p = target.midpoint();
  let pan = target.cy().pan();
  let zoom = target.cy().zoom();

  return {
    x: p.x * zoom + pan.x,
    y: p.y * zoom + pan.y
  };
}

//Warn user about misuse of the plugin
function checkForWarning(elements) {
  /* eslint-disable no-console */

  //Popper.js Should only be used on 1 element
  if (elements.length > 1) {
    console.warn("Popper.js Extension should only be used on one element.");
    console.warn("Ignoring all subsequent elements");
  }

  /* eslint-enable */
}

module.exports = { popper, popperRef };
