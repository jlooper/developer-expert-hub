import { DevExpertHubPage } from './app.po';

describe('dev-expert-hub App', () => {
  let page: DevExpertHubPage;

  beforeEach(() => {
    page = new DevExpertHubPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
