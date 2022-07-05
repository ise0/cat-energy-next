import createSimpleStyles from './simple/style';
import type { TSimpleStyleModifiers } from './simple/style';

export type TModifiers = { style: 'simple' } & TSimpleStyleModifiers;

const styles = {
  simple: createSimpleStyles,
};

export type TCreateStyle = (chosenModifiers: TModifiers) => { [k: string]: string };

export const getStyles = (chosenModifiers: TModifiers) =>
  styles[chosenModifiers.style](chosenModifiers);
