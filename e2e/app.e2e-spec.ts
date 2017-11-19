import { AppPage } from './app.po';

describe('personal App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have router outlet with content', () => {
    page.navigateTo();
    expect(page.getRouterOutletConten()).toBeDefined();
  });
});
