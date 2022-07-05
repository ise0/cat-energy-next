import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import type { TBlockModifiers, TCreateStyle } from '..';
import styles from './scss/inputs-editor.module.scss';

export type TSimpleStyleModifiers = unknown;

const modifiers = {};

const createSimpleStyle: TCreateStyle = (chosenModifiers) => {
  const blockModifiers: TBlockModifiers = {
    'inputs-editor__range-item': { style: 'simple', size: 's' },
    'inputs-editor__pick-many-chkbox': { style: 'box', size: 's' },
    'inputs-editor__reset': { style: 'text', size: 's' },
    'inputs-editor__confirm': { style: 'simple', size: 's', theme: 'green' },
  };

  return {
    styles: mergeStylesWithModifiers(styles, modifiers, chosenModifiers),
    blockModifiers,
  };
};
export default createSimpleStyle;