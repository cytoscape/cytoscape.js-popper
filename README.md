cytoscape-popper
================================================================================

[![DOI](https://zenodo.org/badge/102492695.svg)](https://zenodo.org/badge/latestdoi/102492695)

## Description

A Cytoscape.js extension for integrating [Popper.js](https://popper.js.org/) ([demo](https://cytoscape.github.io/cytoscape.js-popper)) ([tippy demo](https://cytoscape.github.io/cytoscape.js-popper/demo-tippy.html))

Popper.js allows you to dynamically align a div, e.g. a tooltip, to another element in the page.  This extension allows you to use Popper.js on Cytoscape elements.  This allows you to create DOM elements positioned on or around Cytoscape elements.  It is useful for tooltips and overlays, for example.

## Dependencies

 * Cytoscape.js ^3.2.0
 * Popper.js ^2.0.0


## Usage instructions

Download the library:
 * via npm: `npm install cytoscape-popper`,
 * via bower: `bower install cytoscape-popper`, or
 * via direct download in the repository (probably from a tag).

Import the library as appropriate for your project:

ES import:

```js
import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';

cytoscape.use( popper );
```

CommonJS require:

```js
let cytoscape = require('cytoscape');
let popper = require('cytoscape-popper');

cytoscape.use( popper ); // register extension
```

AMD:

```js
require(['cytoscape', 'cytoscape-popper'], function( cytoscape, popper ){
  popper( cytoscape ); // register extension
});
```

Plain HTML/JS has the extension registered for you automatically, because no `require()` is needed.

## API

This extension exposes two functions, `popper()` and `popperRef()`.  These functions are defined for both the core and for elements, so you can call `cy.popper()` or `ele.popper()` for example.

Each function takes an options object, as follows:

`cy.popper( options )` or `ele.popper( options )` : Get a [Popper Instance](https://popper.js.org/docs/v2/constructors/) for the specified core Cytoscape instance or the specified element.  This is useful for positioning a div relative to or on top of a core instance or element.

`cy.popperRef( options )` or `ele.popperRef( options )` : Get a [Popper virtual element](https://popper.js.org/docs/v2/virtual-elements/) (aka `Popper reference object` in Popper v1) for the specified core Cytoscape instance or the specified element.  A Popper virtual element is useful only for positioning, as it represent the target rather than the content.  This is useful for cases where you want to create a new Popper instance manually via Popper constructor `createPopper()` or where you need to pass a `popperRef` object to another library like Tippy.js.

 - `options`
   - `content` : The HTML content of the popper.  May be a DOM `Element` reference or a function that returns one.
   - `renderedPosition` : A function that can be used to override the [rendered Cytoscape position](http://js.cytoscape.org/#notation/position) of the Popper target.  This option is mandatory when using Popper on the core.  For an element, the centre of its bounding box is used by default.
   - `renderedDimensions` : A function that can be used to override the [rendered](http://js.cytoscape.org/#notation/position) Cytoscape [bounding box dimensions](http://js.cytoscape.org/#eles.renderedBoundingBox) considered for the popper target (i.e. `cy` or `ele`).  It defines only the effective width and height (`bb.w` and `bb.h`) of the Popper target.   This option is more often useful for elements rather than for the core.
   - `popper` : The Popper [options object](https://popper.js.org/docs/v2/constructors/#options).  You may use this to override Popper options.

### `popper()` example

``` js
// create a basic popper on the first node
let popper1 = cy.nodes()[0].popper({
  content: () => {
    let div = document.createElement('div');

    div.innerHTML = 'Popper content';

    document.body.appendChild(div);

    return div;
  },
  popper: {} // my popper options here
});

// create a basic popper on the core
let popper2 = cy.popper({
  content: () => {
    let div = document.createElement('div');

    div.innerHTML = 'Popper content';

    document.body.appendChild(div);

    return div;
  },
  renderedPosition: () => ({ x: 100, y: 200 }),
  popper: {} // my popper options here
});
```

### `popperRef()` example

``` js
// create a basic popper ref for the first node
let popperRef1 = cy.nodes()[0].popperRef();

// create a basic popper ref on the core
let popperRef2 = cy.popperRef({
  renderedPosition: () => ({ x: 200, y: 300 })
});
```

### Sticky `popper()` example

```js
let node = cy.nodes().first();

let popper = node.popper({
  content: () => {
    let div = document.createElement('div');

    div.innerHTML = 'Sticky Popper content';

    document.body.appendChild( div );

    return div;
  }
});

let update = () => {
  popper.update();
};

node.on('position', update);

cy.on('pan zoom resize', update);
```
Note that for Popper v2 the update method is asynchronous and returns a promise. See [Manual update](https://popper.js.org/docs/v2/lifecycle/#manual-update).
### Usage with Tippy.js

This extension can also be used to enable [Tippy.js](https://github.com/atomiks/tippyjs) tooltip functionality with Cytoscape.  Any version of Tippy that is compatible with Popper v2 is compatible with this extension.

The creation of many `Tippy` instances at once has performance implications, especially for large graphs.  Create each instance on demand, e.g. on `tap`.  Use [`destroy()`](https://atomiks.github.io/tippyjs/v6/methods/#destroy) instead of `hide()` where possible.

```js
let node = cy.nodes().first();

let ref = node.popperRef(); // used only for positioning

// A dummy element must be passed as tippy only accepts dom element(s) as the target
// https://atomiks.github.io/tippyjs/v6/constructor/#target-types
let dummyDomEle = document.createElement('div');

let tip = new Tippy(dummyDomEle, { // tippy props:
   getReferenceClientRect: ref.getBoundingClientRect, // https://atomiks.github.io/tippyjs/v6/all-props/#getreferenceclientrect
   trigger: 'manual', // mandatory, we cause the tippy to show programmatically.
   
   // your own custom props
   // content prop can be used when the target is a single element https://atomiks.github.io/tippyjs/v6/constructor/#prop
   content: () => {
      let content = document.createElement('div');

      content.innerHTML = 'Tippy content';

      return content;
   }
});

tip.show();
```

Refer to [Tippy.js](https://atomiks.github.io/tippyjs/) documentation for more details.

## v2 changes
This version of cytoscape-popper has been updated to use Popper 2 and be compatible with Tippy 6. Thus, it is no longer compatible with Popper v1/Tippy v5. If your application needs Popper v1/Tippy v5, use the latest v1 version of cytoscape-popper instead. Cytoscape-popper v1 dependencies are Cytoscape.js ^3.2.0 and Popper.js ^1.12.0.

The cytoscape-popper api has not changed in v2, but you may need to update your code if it references Popper/Tippy. See [Migrating to Popper 2](https://popper.js.org/docs/v2/migration-guide/) and [Tippy Migration Guide](https://github.com/atomiks/tippyjs/blob/master/MIGRATION_GUIDE.md#5x-to-6x).

## Build targets

* `npm run test` : Run Mocha tests in `./test`
* `npm run build` : Build `./src/**` into `cytoscape-popper.js`
* `npm run watch` : Automatically build on changes with live reloading (N.b. you must already have an HTTP server running)
* `npm run dev` : Automatically build on changes with live reloading with webpack dev server
* `npm run lint` : Run eslint on the source

N.b. all builds use babel, so modern ES features can be used in the `src`.


## Publishing instructions

This project is set up to automatically be published to npm and bower.  To publish:

1. Build the extension : `npm run build:release`
1. Commit the build : `git commit -am "Build for release"`
1. Bump the version number and tag: `npm version major|minor|patch`
1. Push to origin: `git push && git push --tags`
1. Publish to npm: `npm publish .`
1. If publishing to bower for the first time, you'll need to run `bower register cytoscape-popper https://github.com/cytoscape/cytoscape.js-popper.git`
1. [Make a new release](https://github.com/cytoscape/cytoscape.js-popper/releases/new) for Zenodo.
