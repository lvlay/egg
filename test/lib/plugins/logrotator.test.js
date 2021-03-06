'use strict';

const path = require('path');
const glob = require('glob');
const utils = require('../../utils');

describe('test/lib/plugins/logrotator.test.js', () => {
  let app;
  before(() => {
    app = utils.app('apps/logrotator-app');
    return app.ready();
  });

  after(() => app.close());

  it('should rotate log file default', function* () {
    const file = require.resolve('egg-logrotator/app/schedule/rotate_by_file.js');
    yield app.runSchedule(file);
    const files = glob.sync(path.join(app.config.logger.dir, '*.log.*'));
    files.length.should.above(0);
    files.forEach(file => {
      file.should.match(/\.log\.\d{4}\-\d{2}\-\d{2}$/);
    });
  });
});
