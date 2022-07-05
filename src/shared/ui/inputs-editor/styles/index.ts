import createSimpleStyles from './simple/style';
import type { TSimpleStyleModifiers } from './simple/style';
import CheckBtn from 'shared/ui/check-btn';
import InputText from 'shared/ui/text-input';
import BtnLink from 'shared/ui/btn-link';

export type TBlockModifiers = {
  ['inputs-editor__pick-many-chkbox']: Parameters<typeof CheckBtn>[0]['modifiers'];
  ['inputs-editor__range-item']: Parameters<typeof InputText>[0]['modifiers'];
  ['inputs-editor__reset']: Parameters<typeof BtnLink>[0]['modifiers'];
  ['inputs-editor__confirm']: Parameters<typeof BtnLink>[0]['modifiers'];
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
