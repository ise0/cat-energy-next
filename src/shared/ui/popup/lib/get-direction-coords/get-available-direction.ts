import type { TDirections } from './get-direction-coords';

const getAvailableDirections = (
  anchor: HTMLElement,
  anchorIOEntry: IntersectionObserverEntry,
  elem: HTMLElement,
  relative: 'viewport' | 'page'
): TDirections[number][] => {
  if (anchorIOEntry.intersectionRatio === 0) return [];

  const bcRect = anchorIOEntry.boundingClientRect;
  const iRect = anchorIOEntry.intersectionRect;
  const rectDeviation = {
    left: bcRect.left - iRect.left < -0.1,
    top: bcRect.top - iRect.top < -0.1,
    right: bcRect.right - iRect.right < -0.1,
    bottom: bcRect.bottom - iRect.bottom < -0.1,
  };

  const anchorBcRect = bcRect;
  const anchorVRect = anchor.getBoundingClientRect();

  const availableSpaceTop =
    relative === 'viewport' ? visualViewport.scale * anchorVRect.top : anchorBcRect.top;
  const availableSpaceBottom =
    relative === 'viewport'
      ? visualViewport.height - visualViewport.scale * anchorVRect.bottom
      : document.body.scrollHeight - anchorBcRect.bottom;
  const availableSpaceLeft =
    relative === 'viewport'
      ? visualViewport.scale * anchorVRect.left
      : window.scrollX + anchorBcRect.left;
  const availableSpaceRight =
    relative === 'viewport'
      ? visualViewport.width - visualViewport.scale * anchorVRect.right
      : document.body.scrollWidth - anchorBcRect.right;

  const anchorHeight = anchor.offsetHeight;
  const anchorWidth = anchor.offsetWidth;
  const elemHeight = elem.offsetHeight;
  const elemWidth = elem.offsetWidth;

  const availableSides = [];

  if (!rectDeviation.left && !rectDeviation.right) {
    if (!rectDeviation.bottom && elemHeight <= availableSpaceBottom) availableSides.push('bottom');
    if (!rectDeviation.top && elemHeight <= availableSpaceTop) availableSides.push('top');
  }
  if (!rectDeviation.top && !rectDeviation.bottom) {
    if (!rectDeviation.right && elemWidth <= availableSpaceRight) availableSides.push('right');
    if (!rectDeviation.left && elemWidth <= availableSpaceLeft) availableSides.push('left');
  }

  const availableDirections: string[] = [];

  availableSides.forEach((side) => {
    if (side === 'top' || side === 'bottom') {
      if (
        (elemWidth - anchorWidth) / 2 <= availableSpaceLeft &&
        (elemWidth - anchorWidth) / 2 <= availableSpaceRight
      ) {
        availableDirections.push(`${side}-center`);
      }
      if (elemWidth - anchorWidth <= availableSpaceRight) availableDirections.push(`${side}-left`);
      if (elemWidth - anchorWidth <= availableSpaceLeft) availableDirections.push(`${side}-right`);
    }
    if (side === 'left' || side === 'right') {
      if (elemHeight - anchorHeight <= availableSpaceBottom)
        availableDirections.push(`${side}-top`);
      if (
        (elemHeight - anchorHeight) / 2 <= availableSpaceBottom &&
        (elemHeight - anchorHeight) / 2 <= availableSpaceTop
      ) {
        availableDirections.push(`${side}-center`);
      }
      if (elemHeight - anchorHeight <= availableSpaceTop)
        availableDirections.push(`${side}-bottom`);
    }
  });

  return availableDirections as TDirections[number][];
};

export default getAvailableDirections;
