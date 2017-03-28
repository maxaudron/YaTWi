import { YatwiPage } from './app.po';

describe('yatwi App', () => {
  let page: YatwiPage;

  beforeEach(() => {
    page = new YatwiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
