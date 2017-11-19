import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getRouterOutletConten() {
    return element(by.css('app-root router-outlet')).getText();
  }
}
