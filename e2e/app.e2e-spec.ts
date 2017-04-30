import { LinkingWordsFEPage } from './app.po';

describe('linking-words-fe App', () => {
  let page: LinkingWordsFEPage;

  beforeEach(() => {
    page = new LinkingWordsFEPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
