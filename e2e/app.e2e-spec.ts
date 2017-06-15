import { MoviewPage } from './app.po';

describe('moview App', () => {
  let page: MoviewPage;

  beforeEach(() => {
    page = new MoviewPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
