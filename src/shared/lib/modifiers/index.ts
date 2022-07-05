import cn from 'classnames';

type TMofifiers = {
  [k: string]: {
    targetClass: string;
    value: { [k: string]: string | string[] } | string | string[];
  };
};

export function mergeStylesWithModifiers(
  styles: { [k: string]: string },
  styleModifiers: TMofifiers,
  chosenModifiers: { [k: string]: string | boolean }
) {
  const newClasses: typeof styles = {};
  const chosenModifiersEntries = Object.entries(chosenModifiers);

  chosenModifiersEntries.forEach((item) => {
    if (item[0] === 'style') {
      return;
    }

    const modifier = item[0];
    const value = item[1];

    const styleModifier = styleModifiers?.[modifier];

    const { targetClass } = styleModifier;
    const modifierClass = (
      typeof value === 'string'
        ? (styleModifier['value'] as Record<string, unknown>)[value]
        : styleModifier['value']
    ) as string | string[];

    newClasses[targetClass] = cn(
      newClasses[targetClass],
      styles[targetClass],
      Array.isArray(modifierClass)
        ? modifierClass.map((elem) => styles[elem])
        : styles[modifierClass]
    );
  });

  return { ...styles, ...newClasses };
}
