import cn from 'classnames';
import { ReactNode, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import {
  findScrollableParents,
  generateThresholdsArray,
  getDirectionCoords,
  TDirections,
} from '../lib';
import { TPopupPositionTypes } from '../types';

type TAnchorPopup = (props: {
  children: ReactNode;
  position: TPopupPositionTypes['anchor']['value'];
  popupRef: RefObject<HTMLDivElement>;
  tabIndex?: number;
  styles: { [k: string]: string };
}) => JSX.Element;

const AnchorPopup: TAnchorPopup = ({ children, position, popupRef, tabIndex, styles }) => {
  const [, rerender] = useState({});
  const forceRerender = useCallback(() => rerender({}), []);
  const [coords, setCoords] = useState<{
    direction: TDirections[number] | null;
    value: { left: number; top: number };
  } | null>();

  const [anchorViewportIOEntry, setAnchorViewPortIOEntry] =
    useState<IntersectionObserverEntry | null>(null);
  const [anchorBodyIOEntry, setAnchorBodyIOEntry] = useState<IntersectionObserverEntry | null>(
    null
  );
  const targetElem = position.target.current;

  const [scrollableParents, setScrollableParents] = useState<HTMLElement[]>([]);
  const scrollableParentsRef = useRef<HTMLElement[]>([]);
  useEffect(() => {
    scrollableParentsRef.current = scrollableParents;
  }, [scrollableParents]);

  useEffect(() => {
    const findAndSetScrollableParents = () => {
      setScrollableParents((prevState) => {
        if (!targetElem) return prevState;

        const scrollableParentsArr = findScrollableParents(targetElem);
        const unmountedParents = prevState.filter((el) => !scrollableParentsArr.includes(el));
        const newParents = scrollableParentsArr.filter((el) => !prevState.includes(el));

        if (unmountedParents.length) {
          unmountedParents.forEach((el) => el.removeEventListener('scroll', forceRerender));
        }
        if (newParents.length) {
          newParents.forEach((el) => el.addEventListener('scroll', forceRerender));
        }

        if (
          (prevState.length === 0 && scrollableParentsArr.length > 0) ||
          unmountedParents.length ||
          newParents.length
        ) {
          return scrollableParentsArr;
        }
        return prevState;
      });
    };
    findAndSetScrollableParents();
    const timerId = setInterval(findAndSetScrollableParents, 1500);

    return () => {
      clearInterval(timerId);
      scrollableParentsRef.current.forEach((el) => el.removeEventListener('scroll', forceRerender));
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', forceRerender);
    window.addEventListener('scroll', forceRerender);
    return () => {
      window.removeEventListener('resize', forceRerender);
      window.removeEventListener('scroll', forceRerender);
    };
  }, []);

  useEffect(() => {
    if (!targetElem || !popupRef.current) return;
    const thresholdsArray = generateThresholdsArray(0.01);
    const viewportObserver = new IntersectionObserver(
      ([entry]) => setAnchorViewPortIOEntry(entry),
      {
        threshold: thresholdsArray,
      }
    );
    const bodyObserver = new IntersectionObserver(([entry]) => setAnchorBodyIOEntry(entry), {
      threshold: thresholdsArray,
      root: document.documentElement,
    });

    viewportObserver.observe(targetElem);
    bodyObserver.observe(targetElem);
    return () => {
      viewportObserver.disconnect();
      bodyObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    let newCoords: typeof coords = null;

    if (popupRef.current && targetElem && anchorViewportIOEntry && anchorBodyIOEntry) {
      newCoords = getDirectionCoords(
        targetElem,
        anchorViewportIOEntry,
        anchorBodyIOEntry,
        popupRef.current,
        position.relative,
        coords?.direction || null,
        position.directions
      );
    }
    if (JSON.stringify(newCoords) !== JSON.stringify(coords)) setCoords(newCoords);
  });

  return (
    <div
      className={cn(styles['popup'])}
      ref={popupRef}
      style={{
        position: 'absolute',
        ...(coords ? { ...coords.value, zIndex: 9999 } : { zIndex: -9999, opacity: 0 }),
      }}
      tabIndex={tabIndex}
    >
      {children}
    </div>
  );
};

export default AnchorPopup;
