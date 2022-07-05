import { ChangeEvent, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';

type TSlider = (props: { styles: Record<string, string> }) => JSX.Element;

const Slider: TSlider = ({ styles }) => {
  const [sliderRange, changeRange] = useState(50);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onWindowResize = () => {
      if (wrapperRef.current) setWrapperWidth(wrapperRef.current.clientWidth);
    };
    const timerId = setTimeout(onWindowResize);

    window.addEventListener('resize', onWindowResize);

    return () => {
      clearTimeout(timerId);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  const onSliderRangeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    changeRange(+evt.target.value);
  };

  return (
    <div className={cn(styles['achivements__slider'], styles['slider'])}>
      <div className={cn(styles['slider__images-wrapper'])} ref={wrapperRef}>
        <div className={cn(styles['slider__img-before'])} style={{ width: `${sliderRange}%` }}>
          <div
            className={cn(styles['slider__img'])}
            style={{ position: 'relative', width: `${wrapperWidth}px`, height: '100%' }}
          >
            <Image src="/images/before-desktop@2x.png" alt="" layout="fill" objectFit="contain" />
          </div>
        </div>
        <div className={cn(styles['slider__img-after'])} style={{ width: `${100 - sliderRange}%` }}>
          <div
            className={cn(styles['slider__img'])}
            style={{
              position: 'relative',
              width: `${wrapperWidth}px`,
              height: '100%',
              float: 'right',
            }}
          >
            <Image
              className={cn(styles['slider__img'])}
              src="/images/after-desktop@2x.png"
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>

      <div className={cn(styles['slider__input-wrapper'])}>
        <span className={cn(styles['slider__text'])}>Было</span>
        <input
          className={cn(styles['slider__input'])}
          type="range"
          min={0}
          max={100}
          value={sliderRange}
          onChange={onSliderRangeChange}
        />
        <span className={cn(styles['slider__text'])}>Стало</span>
      </div>
    </div>
  );
};

export default Slider;
