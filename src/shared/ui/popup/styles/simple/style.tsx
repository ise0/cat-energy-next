import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import type { TCreateStyle } from '..';
import styles from './scss/popup.module.scss';

export type TSimpleStyleModifiers = unknown;

const createSimpleStyle: TCreateStyle = (chosenModifiers) =>
  mergeStylesWithModifiers(styles, {}, chosenModifiers);

export default createSimpleStyle;
