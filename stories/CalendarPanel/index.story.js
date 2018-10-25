import React from 'react';
import CalendarPanel from '../../src/CalendarPanel';
import CodeExample from 'wix-storybook-utils/CodeExample';

import {Container, Row, Col} from 'wix-style-react/Grid';

import CalendarPanelRangeExample from './CalendarPanelRangeExample';
import CalendarPanelRangeExampleRaw from '!raw-loader!./CalendarPanelRangeExample';

import {CalendarPanelDayExample} from './CalendarPanelDayExample';
import CalendarPanelDayExampleRaw from '!raw-loader!./CalendarPanelDayExample';


export default {
  category: 'Components',
  storyName: 'CalendarPanel',

  component: CalendarPanel,
  componentPath: '../../src/CalendarPanel',

  componentProps: {
    dataHook: 'storybook-calendar-panel'
  },

  examples: (
    <Container>
      <Row>
        <Col span={12}>
          <div style={{backgroundColor: '#F0F4F7', padding: '30px'}}>
            <CodeExample title="CalendarPanel (selectionMode: 'range')" code={CalendarPanelRangeExampleRaw}>
              <CalendarPanelRangeExample/>
            </CodeExample>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div style={{backgroundColor: '#F0F4F7', padding: '30px'}}>
            <CodeExample title="CalendarPanel (selectionMode: 'day')" code={CalendarPanelDayExampleRaw}>
              <CalendarPanelDayExample/>
            </CodeExample>
          </div>
        </Col>
      </Row>
    </Container>
  )
};