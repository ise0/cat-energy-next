import Header from 'widgets/header';
import Footer from 'widgets/footer';
import Partnership from 'widgets/partnership';

import createSimpleStyle from './styles';
import cn from 'classnames';
import { useEffect, useState } from 'react';
import PetForm from './sections/pet-form';

const isServer = typeof window === 'undefined';

const PetFormPage = () => {
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
    <div className={cn(styles['pet-form-page'], hideSSRStylesFlash)}>
      <Header
        className={cn(styles['pet-form-page__header'])}
        modifiers={blockModifiers['pet-form-page__header']}
      />
      <PetForm
        className={cn(styles['pet-form-page__form'])}
        modifiers={blockModifiers['pet-form-page__form']}
      />
      <Partnership
        className={cn(styles['pet-form-page__partnership'])}
        modifiers={blockModifiers['pet-form-page__partnership']}
      />
      <div className={cn(styles['pet-form-page__footer-wrapper'])}>
        <Footer
          className={cn(styles['pet-form-page__footer'])}
          modifiers={blockModifiers['pet-form-page__footer']}
        />
      </div>
    </div>
  );
};

export default PetFormPage;
