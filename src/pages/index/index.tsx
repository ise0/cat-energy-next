import Banner from './sections/banner';
import Objectives from './sections/objectives';
import Features from './sections/features';
import Achivements from './sections/achivements';
import Header from 'widgets/header';
import Footer from 'widgets/footer';
import Partnership from 'widgets/partnership';

import createSimpleStyle from './styles';
import cn from 'classnames';
import { useEffect, useState } from 'react';

const isServer = typeof window === 'undefined';

const IndexPage = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const onWindowResize = () => setWindowWidth(window.innerWidth);
    onWindowResize();
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  const { styles, blockModifiers } = createSimpleStyle({ windowWidth });

  const hideSSRStylesFlash = isServer || windowWidth === 0 ? 'visually-hidden' : '';
  return (
    <div className={cn(styles['index-page'], hideSSRStylesFlash)}>
      <Header
        className={cn(styles['index-page__header'])}
        modifiers={blockModifiers['index-page__header']}
      />
      <Banner
        className={cn(styles['index-page__banner'])}
        modifiers={blockModifiers['index-page__banner']}
      />
      <Objectives
        className={cn(styles['index-page__objectives'])}
        modifiers={blockModifiers['index-page__objectives']}
      />
      <Features
        className={cn(styles['index-page__features'])}
        modifiers={blockModifiers['index-page__features']}
      />
      <div className={cn(styles['index-page__achivements-wrapper'])}>
        <Achivements
          className={cn(styles['index-page__achivements'])}
          modifiers={blockModifiers['index-page__achivements']}
        />
      </div>
      <Partnership
        className={cn(styles['index-page__partnership'])}
        modifiers={blockModifiers['index-page__partnership']}
      />
      <div className={cn(styles['index-page__footer-wrapper'])}>
        <Footer
          className={cn(styles['index-page__footer'])}
          modifiers={blockModifiers['index-page__footer']}
        />
      </div>
    </div>
  );
};

export default IndexPage;
