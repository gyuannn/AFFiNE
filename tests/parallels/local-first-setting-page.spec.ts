import { resolve } from 'node:path';

import { expect } from '@playwright/test';

import { openHomePage } from '../libs/load-page';
import { waitMarkdownImported } from '../libs/page-logic';
import { test } from '../libs/playwright';
import { clickSideBarSettingButton } from '../libs/sidebar';
import { testResultDir } from '../libs/utils';

test.describe('Local first setting page', () => {
  test('Should highlight the setting page menu when selected', async ({
    page,
  }) => {
    await openHomePage(page);
    await waitMarkdownImported(page);
    const element = await page.getByTestId(
      'slider-bar-workspace-setting-button'
    );
    const prev = await element.screenshot({
      path: resolve(
        testResultDir,
        'slider-bar-workspace-setting-button-prev.png'
      ),
    });
    await clickSideBarSettingButton(page);
    await page.waitForTimeout(50);
    const after = await element.screenshot({
      path: resolve(
        testResultDir,
        'slider-bar-workspace-setting-button-after.png'
      ),
    });
    expect(prev).not.toEqual(after);
  });
});
