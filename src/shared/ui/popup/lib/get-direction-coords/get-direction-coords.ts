import getAvailableDirections from './get-available-direction';
import getCoordsByDirection from './get-coords-by-direction';

export type TDirections = [
  'top-center',
  'top-left',
  'top-right',
  'right-top',
  'right-center',
  'right-bottom',
  'bottom-center',
  'bottom-left',
  'bottom-right',
  'left-top',
  'left-center',
  'left-bottom'
];

export const getDirectionCoords = (
  anchor: HTMLElement,
  anchorViewportIOEntry: IntersectionObserverEntry,
  anchorBodyIOEntry: IntersectionObserverEntry,
  elem: HTMLElement,
  relative: 'page' | 'viewport',
  prevDirection: TDirections[number] | null,
  priorityDirections?: Array<TDirections[number]>
): { direction: TDirections[number] | null; value: { left: number; top: number } } | null => {
  let availableDirections: TDirections[number][] = [];

  if (relative === 'viewport') {
    availableDirections = getAvailableDirections(anchor, anchorViewportIOEntry, elem, 'viewport');
  }
  if (availableDirections.length === 0) {
    availableDirections = getAvailableDirections(anchor, anchorBodyIOEntry, elem, 'page');
  }

  let direction: TDirections[number] | undefined;
  
  if (availableDirections.length > 0) {
    if (priorityDirections) {
      direction = priorityDirections.find((el) => availableDirections.includes(el));
    }
    if (!direction && prevDirection && availableDirections.find((el) => prevDirection === el)) {
      direction = prevDirection;
    } else {
      [direction] = availableDirections;
    }
  }

  if (direction) {
    return {
      direction: direction as TDirections[number],
      value: getCoordsByDirection(anchor, elem, direction),
    };
  }

  if (anchorBodyIOEntry.intersectionRatio === 0) return null;

  let left: number;
  if (elem.offsetWidth > document.body.scrollWidth) {
    left = 0;
  } else {
    left = (document.body.scrollWidth - elem.offsetWidth) / 2;
  }

  return {
    direction: null,
    value: {
      top: anchorBodyIOEntry.boundingClientRect.bottom,
      left,
    },
  };
};
