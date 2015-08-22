'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;

describe('bnsf:app', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../app'))
            .withArguments('name')
            .withOptions({ 'skip-install': true })
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            '.enb/make.js',
            'bundles/index/index.api.routing.yml',
            'bundles/index/index.bemdecl.js',
            'bundles/index/index.routing.yml',
            '.bowerrc',
            '.editorconfig',
            '.gitignore',
            'bower.json',
            'package.json',
            'README.md'
        ]);
    });
});
