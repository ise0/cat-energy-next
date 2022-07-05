import createBoxStyles from './box/style';
import createRadioStyles from './radio/style';
import type { TBoxStyleModifiers } from './box/style';
import type { TRadioStyleModifiers } from './radio/style';

export type TModifiers =
  | ({ style: 'box' } & TBoxStyleModifiers)
  | ({ style: 'radio' } & TRadioStyleModifiers);

const styles = {
  box: createBoxStyles,
  radio: createRadioStyles,
};

export type TCreateStyle = (chosenModifiers: TModifiers) => { [k: string]: string };

export const getStyles = (chosenModifiers: TModifiers) =>
  styles[chosenModifiers.style](chosenModifiers);
