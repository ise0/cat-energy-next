export { getDirectionCoords } from './get-direction-coords';
export type { TDirections } from './get-direction-coords';

export const generateThresholdsArray = (threshold: number) => {
  const thresholds = [];
  let current = 0;
  while (current < 1) {
    thresholds.push(current);
    current += threshold;
  }
  return thresholds;
};

export const findScrollableParents = (element: HTMLElement): HTMLElement[] => {
  const scrollableParents: HTMLElement[] = [];
  let parent = element.parentElement;

  while (parent && parent.tagName !== 'BODY') {
    if (parent.scrollHeight > parent.clientHeight || parent.scrollWidth > parent.clientWidth)
      scrollableParents.push(parent);
    parent = parent.parentElement;
  }

  return scrollableParents;
};
