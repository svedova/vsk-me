export const elems = {};
export const STICKY_CLASS = "is-sticky";
export const STICKY_ATTR = "__sticky";

let id = 0;

/**
 * Return the window scroll position.
 *
 * @return {{top: (Number|number), left: (Number|number)}}
 */
export const getScrollPosition = () => {
  return {
    top: window.pageYOffset || document.documentElement.scrollTop,
    left: window.pageXOffset || document.documentElement.scrollLeft
  };
};

/**
 * Makes an element sticky.
 *
 * @param elem
 * @param style
 */
export const makeSticky = (elem, style) => {
  elem[STICKY_ATTR] = id;
  elems[id] = {
    elem,
    style,
    defaultRect: {
      top: elem.getBoundingClientRect().top + getScrollPosition().top
    }
  };

  id++;

  return elem;
};

/**
 * Make the element with given id sticky.
 *
 * @param _id
 */
const toSticky = _id => {
  const { elem, style } = elems[_id];
  elem.classList.add(STICKY_CLASS);

  const clone = elem.cloneNode(true);

  elems[_id].defaultVisibility = elem.style.visibility;
  elems[_id].defaultOpacity = elem.style.opacity;
  elems[_id].clone = clone;

  // Make the element invisible
  elem.style.visibility = "hidden";
  elem.style.opacity = 0;

  // Then lets merge the style
  if (style) {
    Object.keys(style).forEach(key => {
      clone.style[key] = style[key];
    });
  }

  // Now lets make it sticky
  clone.style.position = "fixed";
  clone.style.top = 0;

  elem.parentNode.insertBefore(clone, elem);
};

/**
 * Remove the sticky styles and classes from the element with given id.
 *
 * @param _id
 */
const toUnsticky = _id => {
  const { elem, clone, defaultVisibility, defaultOpacity } = elems[_id];
  elem.classList.remove(STICKY_CLASS);
  elem.style.visibility = defaultVisibility;
  elem.style.opacity = defaultOpacity;
  clone.parentNode.removeChild(clone);
};

export const listener = {
  /**
   * Start listening to scroll event.
   */
  init: () => {
    window.addEventListener("scroll", listener.onScroll, false);
  },

  /**
   * Stop listening to scroll event.
   */
  stop: () => {
    window.removeEventListener("scroll", listener.onScroll, false);
  },

  /**
   * The listener function. This function will listen the scroll
   * event and it will loop through registered elements. If they
   * are in viewport, they will be made sticky. Otherwise left as
   * they were.
   */
  onScroll: () => {
    const scrollPos = getScrollPosition();

    Object.keys(elems).forEach(_id => {
      const {
        defaultRect: { top },
        elem
      } = elems[_id];

      if (top <= scrollPos.top) {
        if (elem.classList.contains(STICKY_CLASS) === false) {
          toSticky(_id);
        }
      } else {
        if (elem.classList.contains(STICKY_CLASS)) {
          toUnsticky(_id);
        }
      }
    });
  }
};
