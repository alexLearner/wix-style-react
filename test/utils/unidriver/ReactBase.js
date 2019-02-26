import { Simulate } from 'react-dom/test-utils';

/**
 *Temporary workaround for implementing missing Unidriver methods in React/DOM only.
 *
 * @param {UniDriver} base
 */
export function ReactBase(base) {
  const htmlElement = () => {
    if (base.type !== 'react') {
      throw new Error('Supported only in React/DOM.');
    }
    return base.getNative();
  };

  return {
    pressKey: async key => Simulate.keyDown(await htmlElement(), { key }),
    mouseLeave: async () => Simulate.mouseLeave(await htmlElement()),
    tagName: async () => (await htmlElement()).tagName,
    innerHtml: async () => (await htmlElement()).innerHTML,
    children: async () => (await htmlElement()).children,
    focus: async () => Simulate.focus(await htmlElement()),
    blur: async () => Simulate.blur(await htmlElement()),
  };
}
