cytoscape-popper
================================================================================


## Description

A Cytoscape.js extension for integrating Popper.js.

This Extension has been ported from the Joseph Stahl's implemention to the newer tooling layout used by the Cytoscape Consortium.


## Dependencies

 * Cytoscape.js ^3.2.0
 * Popper.js ^1.12.0


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

#### Popper Basic Usage 
``` js
let cyNode = cy.nodes()[0];
//Create Basic Popper
let popperTest = cyNode.popper({
  content: "targetID",
  popper: popperOptions,
  boundingBox : boundingBoxFunction
});
```
* Returns a Popper Object  
* (Required) (String, Function, or HTML Element) content : Refers to the actual HTML content of your popper. 
* (Required) Options : Refer to [Popper.js](http://popper.js.org) for more information on popper options
* (Optional) BoundingBox : Provides ability to manually set a bounding box

#### Popper Ref Basic Usage
``` js 
cyNode.popperRef(options)
```

* Returns a Reference Object
* (Optional) Options : Allows for the user to override the bounding box 

#### Basic Binding (Sticky Tooltips)
```js
cyNode.on('drag', function () {
   popperTest.scheduleUpdate();
});
```

#### Popper With Custom Bounding Box
```js
//Bind Popper with Custom Bounding Box
let popperTest2 = cy.popper({
   content: "core-popper",
   popper: {
     placement: "bottom"
   },
   boundingBox: function (data) {
      return {
        top: 450 + window.pageYOffset,
        left: 600 + window.pageXOffset,
        right: 700 + window.pageXOffset,
        bottom: 220 + window.pageYOffset,
        width: 1,
        height: 1,
      };
  }
});
```

#### Defining Custom Popper Options
```js
//Example of defining custom popper options
let popperTest3 = cyNode.popper({
  content: "core-popper-ref",
  refObject : refObject,
    popper: {
       placement: "bottom",
       eventsEnabled: true,
       removeOnDestroy: true
    }
 });
```

### Providing a custom position for nodes
If you wish you may also provide a custom position by providing a function which returns a position object;

```
userOptions = {
  content : ...,
  popper : ...,
  boundingBox : ...,
  position : positionFunc
}
```

### Using Cytoscape-Popper with Tippy.js
Cytoscape popper can also be used to enable Tippy.js functionality with Cytoscape Elements, by simply passing the `popperRef' object into tippy. 

#### Tippy Initialization
```js
//Create Tippy.js tooltip using popper.js
  let tippyReference = cyNode.popperRef();
  let tippyOptions = {html: '#tippy-popper-test', trigger: 'manual', hideOnClick: false, arrow: false };
  tippyTest = tippy(tippyReference, tippyOptions); 
```

* Refer to [Tippy.js](https://atomiks.github.io/tippyjs/) for more details on `tippyOptions`

#### Binding to the Tippy Object
```js
cyNode.on('tap', function () { 
  let tippyPopper = tippyTest.getPopperElement(tippyTest.selector) 
  tippyTest.show(tippyPopper, 500);
});
```
* Refer to [Tippy.js](https://atomiks.github.io/tippyjs/) for more details on tippy methods. 



## Build targets

* `npm run test` : Run Mocha tests in `./test`
* `npm run build` : Build `./src/**` into `cytoscape-popper.js`
* `npm run watch` : Automatically build on changes with live reloading (N.b. you must already have an HTTP server running)
* `npm run dev` : Automatically build on changes with live reloading with webpack dev server
* `npm run lint` : Run eslint on the source

N.b. all builds use babel, so modern ES features can be used in the `src`.


## Publishing instructions

This project is set up to automatically be published to npm and bower.  To publish:

1. Build the extension : `npm run build`
1. Commit the build : `git commit -am "Build for release"`
1. Bump the version number and tag: `npm version major|minor|patch`
1. Push to origin: `git push && git push --tags`
1. Publish to npm: `npm publish .`
1. If publishing to bower for the first time, you'll need to run `bower register cytoscape-popper https://github.com/cytoscape&#x2F;cytoscape.js-popper.git`
