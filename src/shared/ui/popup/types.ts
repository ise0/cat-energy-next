import { RefObject } from 'react';
import { TDirections } from './lib';

export type TPopupPositionTypes = {
  anchor: {
    type: 'anchor';
    value: {
      target: RefObject<HTMLElement>;
      relative: 'page' | 'viewport';
      directions?: Array<TDirections[number]>;
    };
  };
};
