module.exports = {
  name: 'aloofly',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/aloofly',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
