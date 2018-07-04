import { DiplomasModule } from './diplomas.module';

describe('DiplomasModule', () => {
  let diplomasModule: DiplomasModule;

  beforeEach(() => {
    diplomasModule = new DiplomasModule();
  });

  it('should create an instance', () => {
    expect(diplomasModule).toBeTruthy();
  });
});
