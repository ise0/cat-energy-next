import createSimpleStyles from './simple/style';
import type { TSimpleStyleModifiers } from './simple/style';
import BtnLink from 'shared/ui/btn-link';

export type TBlockModifiers = {
  ['menu__item-ctrl']: Parameters<typeof BtnLink>[0]['modifiers'];
};

export type TModifiers = { style: 'simple' } & TSimpleStyleModifiers;

const styles = {
  simple: createSimpleStyles,
};

export type TCreateStyle = (chosenModifiers: TModifiers) => {
  styles: { [k: string]: string };
  blockModifiers: TBlockModifiers;
};

export const getStyles = (chosenModifiers: TModifiers) =>
  styles[chosenModifiers.style](chosenModifiers);
