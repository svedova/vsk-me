import { STICKY_ATTR, listener, elems, makeSticky } from "./dom";

const Sticky = {
  /**
   * Make the given elem sticky when elem scrolls out of viewport.
   *
   * @param {HTMLElement} elem
   * @param {Object} style Extra style to be merged
   * @returns {HTMLElement|void} Returns the element on success and void on failure.
   */
  sticky: (elem, style) => {
    // In case we already have the elem already registered
    if (!elem || typeof elem[STICKY_ATTR] === "number") {
      return;
    }

    if (Object.keys(elems).length === 0) {
      listener.init();
    }

    const el = makeSticky(elem, style);
    listener.onScroll();
    return el;
  },

  /**
   * Return the element to initial state.
   *
   * @param {HTMLElement} elem div
   * @returns {HTMLElement|void} Returns the element on success and undefined on failure.
   */
  unsticky: elem => {
    const _id = elem && elem[STICKY_ATTR];

    if (!elem || typeof elems[_id] === "undefined") {
      return;
    }

    delete elems[_id];
    delete elem[STICKY_ATTR];

    if (Object.keys(elems).length === 0) {
      listener.stop();
    }

    return elem;
  },

  /**
   * Make all active elements unsticky.
   */
  unstickyAll: () => {
    Object.keys(elems).forEach(k => Sticky.unsticky(elems[k].elem));
  },

  /**
   * Return all active sticky elements.
   *
   * @return {Array}
   */
  all: () => {
    return Object.keys(elems).map(k => elems[k].elem);
  }
};

export const { sticky } = Sticky;
export const { unsticky } = Sticky;
export const { unstickyAll } = Sticky;
export const { all } = Sticky;
