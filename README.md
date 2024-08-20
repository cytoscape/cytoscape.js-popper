cytoscape-popper
================================================================================

[![DOI](https://zenodo.org/badge/102492695.svg)](https://zenodo.org/badge/latestdoi/102492695)

## Description

Popper allows you to dynamically align a div, e.g. a tooltip, to another element in the page.  This extension allows you to use any popper library on Cytoscape elements.  This allows you to create DOM elements positioned on or around Cytoscape elements.  It is useful for tooltips and overlays, for example.

Integration examples:
- Floating UI - [demo](https://cytoscape.github.io/cytoscape.js-popper), [usage](#usage-with-floating-ui)
- Popper.js@2 - [demo](https://cytoscape.github.io/cytoscape.js-popper/demo-popper.html), [usage](#usage-with-popperjs--deprecated-)
- Tippy.JS - [demo](https://cytoscape.github.io/cytoscape.js-popper/demo-tippy.html), [usage](#usage-with-tippyjs)


## Migration from v2

Since `Popper.js` has become `@floating-ui` (https://floating-ui.com/docs/migration) and the API has changed a lot it becomes harder to support both versions
(for example TippyJS, that supports only the previous version), so instead of depending on a specific external version
this extension allows users to use any Popper library with providing `popperFactory` function during initializing.

See [FloatingUI](#usage-with-floating-ui) or [Popper.js](#usage-with-popperjs--deprecated-) sections.



## Dependencies

 * Cytoscape.js ^3.2.0


## Usage instructions

Download the library:
 * via npm: `npm install cytoscape-popper`,
 * via bower: `bower install cytoscape-popper`, or
 * via direct download in the repository (probably from a tag).

Import the library as appropriate for your project:

ES import:

```js
import cytoscape from 'cytoscape';
import cytoscapePopper from 'cytoscape-popper';

function popperFactory(ref, content, opts) {
  // See integration sections
}

cytoscape.use( cytoscapePopper(popperFactory) );
```

CommonJS require:

```js
let cytoscape = require('cytoscape');
let cytoscapePopper = require('cytoscape-popper');

function popperFactory(ref, content, opts) {
   // See integration sections
}

cytoscape.use( cytoscapePopper(popperFactory) ); // register extension
```

AMD:

```js
require(['cytoscape', 'cytoscape-popper'], function( cytoscape, popper ){
  function popperFactory(ref, content, opts) {
     // See integration sections
  }
  // register extension
  popper(popperFactory)(cytoscape);
});
```

## API

This extension exposes `popper()` and `popperRef()` functions and provided `popperFactory()`.  These functions are defined for both the core and for elements, so you can call `cy.popper()` or `ele.popper()` for example.

Each function takes an options object, as follows:

`cy.popper( options )` or `ele.popper( options )` : Make a `PopperInstance` for the specified core Cytoscape instance or the specified element.  This is useful for positioning a div relative to or on top of a core instance or element.

`cy.popperRef( options )` or `ele.popperRef( options )` : Make a `PopperInstance` for the specified core Cytoscape instance or the specified element.  A Popper virtual element is useful only for positioning, as it represent the target rather than the content.  This is useful for cases where you want to create a new Popper instance manually via Popper constructor `createPopper()` or where you need to pass a `popperRef` object to another library like Tippy.js.

 - `options`
   - `content` : The HTML content of the popper.  May be a DOM `Element` reference or a function that returns one.
   - `renderedPosition` : A function that can be used to override the [rendered Cytoscape position](http://js.cytoscape.org/#notation/position) of the Popper target.  This option is mandatory when using Popper on the core.  For an element, the centre of its bounding box is used by default.
   - `renderedDimensions` : A function that can be used to override the [rendered](http://js.cytoscape.org/#notation/position) Cytoscape [bounding box dimensions](http://js.cytoscape.org/#eles.renderedBoundingBox) considered for the popper target (i.e. `cy` or `ele`).  It defines only the effective width and height (`bb.w` and `bb.h`) of the Popper target.   This option is more often useful for elements rather than for the core.
   - `popper` : The `PopperOptions` object. These options are used in provided `popperFactory`.

## Usage with @floating-ui

### Initializing

``` js
import cytoscape from 'cytoscape';
import cytoscapePopper from 'cytoscape-popper';
import {
  computePosition,
  flip,
  shift,
  limitShift,
} from '@floating-ui/dom';

function popperFactory(ref, content, opts) {
   // see https://floating-ui.com/docs/computePosition#options
   const popperOptions = {
       // matching the default behaviour from Popper@2
       // https://floating-ui.com/docs/migration#configure-middleware
       middleware: [
           flip(),
           shift({limiter: limitShift()})
       ],
       ...opts,
   }

   function update() {
       computePosition(ref, content, popperOptions).then(({x, y}) => {
           Object.assign(content.style, {
               left: `${x}px`,
               top: `${y}px`,
           });
       });
   }
   update();
   return { update };
}

cytoscape.use(cytoscapePopper(popperFactory));
```

### `popper()` example

``` js		
// create a basic popper on the first node
let popper1 = cy.nodes()[0].popper({
  content: () => {
    let div = document.createElement('div');

    div.innerHTML = 'Popper content';

    document.body.appendChild(div);

    return div;
  }
});

// create a basic popper on the core with custom options
let popper2 = cy.popper({
  content: () => {
    let div = document.createElement('div');

    div.innerHTML = 'Popper content';

    document.body.appendChild(div);

    return div;
  },
  renderedPosition: () => ({ x: 100, y: 200 }),
  popper: {
      placement: 'bottom',
  } // @flaoting-ui options (https://floating-ui.com/docs/middleware)
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

## Usage with Popper.js (deprecated)

### Initializing

``` js
import cytoscape from 'cytoscape';
import cytoscapePopper from 'cytoscape-popper';
import { createPopper } from '@popperjs/core';

cytoscape.use(cytoscapePopper(createPopper));
```

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

## Usage with Tippy.js

This extension can also be used to enable [Tippy.js](https://github.com/atomiks/tippyjs) tooltip functionality with Cytoscape.  Any version of Tippy that is compatible with Popper v2 is compatible with this extension.

### Initializing

```js
import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';
import tippy from 'tippy.js';

function tippyFactory(ref, content){
   // Since tippy constructor requires DOM element/elements, create a placeholder
   var dummyDomEle = document.createElement('div');

   var tip = tippy( dummyDomEle, {
       getReferenceClientRect: ref.getBoundingClientRect,
       trigger: 'manual', // mandatory
       // dom element inside the tippy:
       content: content,
       // your own preferences:
       arrow: true,
       placement: 'bottom',
       hideOnClick: false,
       sticky: "reference",

       // if interactive:
       interactive: true,
       appendTo: document.body // or append dummyDomEle to document.body
   } );

   return tip;
}

cytoscape.use(cytoscapePopper(tippyFactory));
```
The creation of many `Tippy` instances at once has performance implications, especially for large graphs.  Create each instance on demand, e.g. on `tap`.  Use [`destroy()`](https://atomiks.github.io/tippyjs/v6/methods/#destroy) instead of `hide()` where possible.

```js
let node = cy.nodes().first();

var tip = node.popper({
   content: () => {
      let content = document.createElement('div');

      content.innerHTML = 'Tippy content';

      return content;
   },
});

tip.show();
```

Refer to [Tippy.js](https://atomiks.github.io/tippyjs/) documentation for more details.

## Typescript

This extension exports empty `PopperInstance` and `PopperOptions` interfaces allows to extend them according to the final Popper implementation.

`@floating-ui` example:
```ts
import { ComputePositionConfig } from '@floating-ui/dom';

declare module 'cytoscape-popper' {
  interface PopperOptions extends ComputePositionConfig {
  }
  interface PopperInstance {
    update(): void;
  }
}

```

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
