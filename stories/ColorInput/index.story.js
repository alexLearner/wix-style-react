import React from 'react';
import { storySettings } from './storySettings';
import {
  tab,
  api,
  playground,
  description,
  testkit,
  importExample,
  columns,
  liveCode as baseLiveCode,
} from 'wix-storybook-utils/Sections';

import { Layout, Cell } from 'wix-style-react/Layout';
import ColorInput from 'wix-style-react/ColorInput';
import { placements } from 'wix-style-react/Popover';
import { baseScope } from '../utils/Components/LiveCodeExample';

import usage from '!raw-loader!./Usage.md';
import * as examples from './examples';
import styles from './examples.scss';

const baseProps = {
  autoRender: false,
  previewProps: {
    className: styles.livePreview,
  },
};

const liveCode = config =>
  baseLiveCode({ components: { ...baseScope }, ...baseProps, ...config });

const example = ({ title, text, source }) =>
  columns({
    items: [description({ title, text }), liveCode({ compact: true, source })],
  });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: ColorInput,
  componentPath: '../../src/ColorInput/ColorInput.js',

  componentProps: setState => ({
    value: '',
    placeholder: 'Please choose a color',
    dataHook: storySettings.dataHook,
    onConfirm: value => setState({ value }),
    size: 'medium',
    error: false,
    errorMessage: '',
    popoverPlacement: 'bottom',
    popoverAppendTo: 'parent',
    disabled: false,
  }),

  componentWrapper: ({ component }) => (
    <Layout>
      <Cell span={6}>{component}</Cell>
    </Layout>
  ),

  exampleProps: {
    errorMessage: '',
    size: ['small', 'medium', 'large'],
    popoverPlacement: [...placements],
    popoverAppendTo: [
      { label: 'window', value: window },
      { label: 'scrollParent', value: 'scrollParent' },
      { label: 'viewport', value: 'viewport' },
      { label: 'parent', value: 'parent' },
      { label: 'null', value: null },
    ],
  },

  sections: [
    tab({
      title: 'Description',
      sections: [
        description({
          text: '🎨 Color input with color picker popover.',
        }),

        importExample({
          source: "import ColorInput from 'wix-style-react/ColorInput';",
        }),

        description({
          title: 'Usage',
          text: usage,
        }),

        columns({
          items: [
            description({
              text: '### Examples',
            }),
            description(),
          ],
        }),

        ...[
          {
            title: 'Plain Example',
            text: 'Example shows how to use component.',
            source: examples.basicExample,
          },
          {
            title: 'Size',
            text: 'ColorInput supports `small`, `medium` and `large` sizes.',
            source: examples.sizes,
          },

          {
            title: 'Error, Null and Disabled',
            text: 'ColorInput has `error`, `null` and `disabled` states.',
            source: examples.states,
          },
        ].map(example),
      ],
    }),

    tab({
      title: 'Playground',
      sections: [playground()],
    }),

    tab({
      title: 'API',
      sections: [api()],
    }),

    tab({
      title: 'Testkit',
      sections: [testkit()],
    }),
  ],
};
