import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import type { TCreateStyle } from '..';
import styles from './scss/spin.module.scss';

export type TSimpleStyleModifiers = unknown;

const modifiers = {};

const createSimpleStyle: TCreateStyle = (chosenModifiers) =>
  mergeStylesWithModifiers(styles, modifiers, chosenModifiers);

export default createSimpleStyle;
