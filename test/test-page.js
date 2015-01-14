'use strict';

var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test;

describe('bnsf:page', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../app'))
            .withArguments('name')
            .withOptions({ 'skip-install': true })
            .on('end', function () {
                var dir = process.cwd();
                helpers.run(path.join(__dirname, '../page'))
                    .withArguments('name --force')
                    .on('ready', function () {
                        process.chdir(dir);
                    })
                    .on('end', done);
            });
    });

    it('creates page files', function () {
        assert.file([
            'desktop.blocks/page-name/page-name.bemtree',
            'desktop.blocks/page-name/page-name.deps.js'
        ]);
    });

    it('updates config files', function () {
        assert.fileContent([[
            'desktop.bundles/index/index.bemdecl.js',
            /page-name/g
        ], [
            'desktop.bundles/index/index.routing.yml',
            /page-name/g
        ]]);
    });
});
