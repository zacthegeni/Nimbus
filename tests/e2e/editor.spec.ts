import { _electron as electron, test, expect } from '@playwright/test';

 test('launch', async () => {
  const app = await electron.launch({ args: ['.'] });
  const win = await app.firstWindow();
  await expect(win).toBeTruthy();
  await app.close();
});
