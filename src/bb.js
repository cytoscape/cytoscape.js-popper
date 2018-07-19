function getBoundingBox(target, opts) {
  let { renderedPosition, cy, renderedDimensions } = opts;
  let offset = cy.container().getBoundingClientRect();
  let dims = renderedDimensions(target);
  let pos = renderedPosition(target);

  return {
    top: pos.y + offset.top,
    left: pos.x + offset.left,
    right: pos.x + dims.w + offset.left,
    bottom: pos.y + dims.h + offset.top,
    width: dims.w,
    height: dims.h
  };
}

module.exports = { getBoundingBox };
