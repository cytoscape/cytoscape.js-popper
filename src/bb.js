function getBoundingBox(target, opts) {
  let { renderedPosition, cy, renderedDimensions } = opts;
  let offset = cy.container().getBoundingClientRect();
  let dims = renderedDimensions(target);
  let pos = renderedPosition(target);
  let scrollY = window.pageYOffset;
  let scrollX = window.pageXOffset;

  return {
    top: pos.y + offset.top + scrollY,
    left: pos.x + offset.left + scrollX,
    right: pos.x + dims.w + offset.left + scrollX,
    bottom: pos.y + dims.h + offset.top + scrollY,
    width: dims.w,
    height: dims.h
  };
}

module.exports = { getBoundingBox };
