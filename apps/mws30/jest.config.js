module.exports = {
  name: 'mws30',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/mws30',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
