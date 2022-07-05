import createSimpleStyles from './simple/style';
import createTextStyles from './text/style';
import type { TSimpleStyleModifiers } from './simple/style';
import type { TTextStyleModifiers } from './text/style';

export type TModifiers =
  | ({ style: 'simple' } & TSimpleStyleModifiers)
  | ({ style: 'text' } & TTextStyleModifiers);

const styles = {
  simple: createSimpleStyles,
  text: createTextStyles,
};

export type TCreateStyle = (chosenModifiers: TModifiers) => { [k: string]: string };

export const getStyles = (chosenModifiers: TModifiers) =>
  styles[chosenModifiers.style](chosenModifiers);
