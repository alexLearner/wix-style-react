import { eyesItInstance } from '../../test/utils/eyes-it';
import {
  storySettings,
  testStories,
} from '../../stories/ColorInput/storySettings';

import { createTestStoryUrl } from '../../test/utils/storybook-helpers';

const eyes = eyesItInstance();
const testStoryUrl = testName =>
  createTestStoryUrl({ ...storySettings, testName });

describe('ColorInput', () => {
  describe('test stories', () => {
    const checkTestStory = async testName => {
      await browser.get(testStoryUrl(testName));
      eyes.checkWindow(testName);
    };

    eyes.it('check colorinput states', async () => {
      await checkTestStory(testStories.STATES);
    });
  });
});
