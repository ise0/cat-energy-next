import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import styles from './scss/catalog-page.module.scss';
import Header from 'widgets/header';
import Footer from 'widgets/footer';
import Partnership from 'widgets/partnership';
import Catalog from '../sections/catalog';
import ExtraCatalog from '../sections/extra-catalog';

export type TBlockModifiers = {
  ['catalog-page__header']: Parameters<typeof Header>[0]['modifiers'];
  ['catalog-page__catalog']: Parameters<typeof Catalog>[0]['modifiers'];
  ['catalog-page__extra-catalog']: Parameters<typeof ExtraCatalog>[0]['modifiers'];
  ['catalog-page__partnership']: Parameters<typeof Partnership>[0]['modifiers'];
  ['catalog-page__footer']: Parameters<typeof Footer>[0]['modifiers'];
};

type TSimpleStyleModifiers = { size: 's' | 'm' | 'l' };

type TCreateStyle = (states: { windowWidth: number }) => {
  styles: { [k: string]: string };
  blockModifiers: TBlockModifiers;
};

const modifiers = {
  size: {
    targetClass: 'catalog-page',
    value: {
      s: 'catalog-page_size_s',
      m: 'catalog-page_size_m',
      l: 'catalog-page_size_l',
    },
  },
};

const createSimpleStyle: TCreateStyle = ({ windowWidth }) => {
  let blockModifiers: TBlockModifiers;
  let selfModifiers: TSimpleStyleModifiers;

  if (windowWidth < 768) {
    selfModifiers = { size: 's' };
    blockModifiers = {
      'catalog-page__header': { style: 'simple', size: 's' },
      'catalog-page__catalog': { style: 'simple', size: 's' },
      'catalog-page__extra-catalog': { style: 'simple', size: 's' },
      'catalog-page__footer': { style: 'simple', size: 's' },
      'catalog-page__partnership': { style: 'simple', size: 's' },
    };
  } else if (windowWidth < 1280) {
    selfModifiers = { size: 'm' };
    blockModifiers = {
      'catalog-page__header': { style: 'simple', size: 'm' },
      'catalog-page__catalog': { style: 'simple', size: 'm' },
      'catalog-page__extra-catalog': { style: 'simple', size: 'm' },
      'catalog-page__footer': { style: 'simple', size: 'm' },
      'catalog-page__partnership': { style: 'simple', size: 'm' },
    };
  } else {
    selfModifiers = { size: 'l' };
    blockModifiers = {
      'catalog-page__header': { style: 'simple', size: 'l' },
      'catalog-page__catalog': { style: 'simple', size: 'l' },
      'catalog-page__extra-catalog': { style: 'simple', size: 'l' },
      'catalog-page__footer': { style: 'simple', size: 'm' },
      'catalog-page__partnership': { style: 'simple', size: 'l' },
    };
  }

  return {
    styles: mergeStylesWithModifiers(styles, modifiers, selfModifiers),
    blockModifiers,
  };
};

export default createSimpleStyle;
