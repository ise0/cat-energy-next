import { mergeStylesWithModifiers } from 'shared/lib/modifiers';
import styles from './scss/index-page.module.scss';
import Banner from '../sections/banner';
import Objectives from '../sections/objectives';
import Features from '../sections/features';
import Achivements from '../sections/achivements';
import Header from 'widgets/header';
import Footer from 'widgets/footer';
import Partnership from 'widgets/partnership';

type TBlockModifiers = {
  ['index-page__header']: Parameters<typeof Header>[0]['modifiers'];
  ['index-page__banner']: Parameters<typeof Banner>[0]['modifiers'];
  ['index-page__objectives']: Parameters<typeof Objectives>[0]['modifiers'];
  ['index-page__features']: Parameters<typeof Features>[0]['modifiers'];
  ['index-page__achivements']: Parameters<typeof Achivements>[0]['modifiers'];
  ['index-page__partnership']: Parameters<typeof Partnership>[0]['modifiers'];
  ['index-page__footer']: Parameters<typeof Footer>[0]['modifiers'];
};

type TSimpleStyleModifiers = { size: 's' | 'm' | 'l' };

type TCreateStyle = (states: { windowWidth: number }) => {
  styles: { [k: string]: string };
  blockModifiers: TBlockModifiers;
};

const modifiers = {
  size: {
    targetClass: 'index-page',
    value: {
      s: 'index-page_size_s',
      m: 'index-page_size_m',
      l: 'index-page_size_l',
    },
  },
};

const createSimpleStyle: TCreateStyle = ({ windowWidth }) => {
  let blockModifiers: TBlockModifiers;
  let selfModifiers: TSimpleStyleModifiers;

  if (windowWidth < 768) {
    selfModifiers = { size: 's' };
    blockModifiers = {
      'index-page__achivements': { style: 'simple', size: 's' },
      'index-page__banner': { style: 'simple', size: 's' },
      'index-page__features': { style: 'simple', size: 's' },
      'index-page__footer': { style: 'simple', size: 's' },
      'index-page__header': { style: 'simple', size: 's' },
      'index-page__objectives': { style: 'simple', size: 's' },
      'index-page__partnership': { style: 'simple', size: 's' },
    };
  } else if (windowWidth < 1280) {
    selfModifiers = { size: 'm' };
    blockModifiers = {
      'index-page__achivements': { style: 'simple', size: 'm' },
      'index-page__banner': { style: 'simple', size: 'm' },
      'index-page__features': { style: 'simple', size: 'm' },
      'index-page__footer': { style: 'simple', size: 'm' },
      'index-page__header': { style: 'simple', size: 'm' },
      'index-page__objectives': { style: 'simple', size: 'm' },
      'index-page__partnership': { style: 'simple', size: 'm' },
    };
  } else {
    selfModifiers = { size: 'l' };
    blockModifiers = {
      'index-page__achivements': { style: 'simple', size: 'l' },
      'index-page__banner': { style: 'simple', size: 'l' },
      'index-page__features': { style: 'simple', size: 'm' },
      'index-page__footer': { style: 'simple', size: 'm' },
      'index-page__header': { style: 'simple', size: 'l', theme: 'white' },
      'index-page__objectives': { style: 'simple', size: 'l' },
      'index-page__partnership': { style: 'simple', size: 'l' },
    };
  }

  return {
    styles: mergeStylesWithModifiers(styles, modifiers, selfModifiers),
    blockModifiers,
  };
};

export default createSimpleStyle;
