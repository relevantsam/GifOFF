import { GifpickerPage } from './app.po';

describe('gifpicker App', () => {
  let page: GifpickerPage;

  beforeEach(() => {
    page = new GifpickerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
