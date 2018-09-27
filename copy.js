const copy = require('recursive-copy');

copy('dist/front', '../romanenkova/front', {overwrite: true})
  .then(function(results) {
    console.info('Copied ' + results.length + ' files');
  })
  .catch(function(error) {
    console.error('Copy failed: ' + error);
  });
