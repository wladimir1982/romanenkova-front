import { Page404Module } from './page404.module';

describe('Page404Module', () => {
  let page404Module: Page404Module;

  beforeEach(() => {
    page404Module = new Page404Module();
  });

  it('should create an instance', () => {
    expect(page404Module).toBeTruthy();
  });
});
