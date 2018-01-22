function getContent(target, content) {
  let contentObject = null;

  if (typeof content === "function") {
    //Execute function if user opted for a dyanamic target
    contentObject = content(target);
  } else if (content instanceof HTMLElement) {
    //Target option is an HTML element
    return content;
  } else {
    throw new Error(`Can not create popper from 'target' with unknown type`);
  }

  // Check validity of parsed target
  if (contentObject === null) {
    throw new Error(`No 'target' specified to create popper`);
  } else {
    return contentObject;
  }
}

module.exports = { getContent };
