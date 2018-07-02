import { TopKidsPage } from './app.po';

describe('top-kids App', () => {
  let page: TopKidsPage;

  beforeEach(() => {
    page = new TopKidsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
