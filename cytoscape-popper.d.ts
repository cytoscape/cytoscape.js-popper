import * as cy from "cytoscape";

declare const cytoscapePopper: (factory: cytoscapePopper.PopperFactory) => cy.Ext;
export = cytoscapePopper;
export as namespace cytoscapePopper;

declare namespace cytoscapePopper {
  interface Dimensions {
    w: number;
    h: number;
  }

  interface PopperOptions {
  }
  interface PopperInstance {
  }

  type RefElement = Pick<Element, 'getBoundingClientRect'>;

  interface Options<Type> {
    /*
     * The HTML content of the popper. May be a DOM Element reference or a function that returns one.
     */
    content?: HTMLElement | (() => HTMLElement);
    /*
     * A function that can be used to override the [rendered](http://js.cytoscape.org/#notation/position) Cytoscape position of the Popper target.
     * This option is mandatory when using Popper on the core.
     * For an element, the centre of its bounding box is used by default.
     */
    renderedPosition?: (el: Type) => cytoscape.Position;
    /*
     * A function that can be used to override the [rendered](http://js.cytoscape.org/#notation/position) Cytoscape bounding box dimensions
     * considered for the popper target (i.e. `cy` or `ele`).
     * It defines only the effective `width` and `height` (`bb.w` and `bb.h`) of the Popper target.
     * This option is more often useful for elements rather than for the core.
     */
    renderedDimensions?: (el: Type) => Dimensions;
    /*
     * The PopperOptions object.
     * You may use this to override Popper options.
     */
    popper?: PopperOptions;
  }

  type getPopperInstance<Type> = (opts?: Options<Type>) => PopperInstance;

  type getPopperRef<Type> = (opts?: Options<Type>) => RefElement;

  type PopperFactory = (ref: RefElement, content: HTMLElement, options?: PopperOptions) => PopperInstance;
}

declare global {
  namespace cytoscape {
    interface SingularData {
      /*
       * User-provided popper factory
       */
      popperFactory: cytoscapePopper.PopperFactory;
      /*
       * Make a PopperInstance using provided popperFactory for the specified element.
       */
      popper: cytoscapePopper.getPopperInstance<SingularData>;
      /*
       * Make a virtual popperRef element from the cytoscape instance
       */
      popperRef: cytoscapePopper.getPopperRef<SingularData>;
    }

    interface Core {
      /*
       * User-provided popper factory
       */
      popperFactory: cytoscapePopper.PopperFactory;
      /*
       * Make a PopperInstance using provided popperFactory for the specified element.
       */
      popper: cytoscapePopper.getPopperInstance<SingularData>;
      /*
       * Make a virtual popperRef element from the cytoscape instance
       */
      popperRef: cytoscapePopper.getPopperRef<SingularData>;
    }
  }
}