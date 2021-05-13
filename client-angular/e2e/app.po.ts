import { browser, element, by } from 'protractor';

export class MaterialDashboardAngularPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
