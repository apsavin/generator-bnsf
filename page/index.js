'use strict';
var yeoman = require('yeoman-generator'),
    path = require('path'),
    fs = require('fs');

/**
 * @const {string}
 */
var PREFIX = 'page-';

/**
 * @const {string}
 */
var STUB_BLOCK_NAME = 'page';

module.exports = yeoman.generators.NamedBase.extend({

    /**
     * @public
     */
    initializing: function () {

        /**
         * @public for templates
         * @type {string}
         */
        this.fullName = PREFIX + this.name;

        /**
         * @public for templates
         * @type {string}
         */
        this.title = this.name;

        /**
         * @type {object}
         * @private
         */
        this._properties = {};
    },

    /**
     * @returns {Array.<object>}
     * @private
     */
    _getPrompts: function () {
        return [
            {
                type: 'input',
                name: 'title',
                message: 'Enter your page title:',
                'default': this.name
            },
            {
                type: 'input',
                name: 'path',
                message: 'Enter your page path:',
                'default': '/' + this.name
            },
            {
                type: 'input',
                name: 'directory',
                message: 'Enter your pages directory:',
                'default': 'desktop.blocks',
                store: true,
                validate: function (input) {
                    return this._isDirPathValid(input) || 'Please enter a valid name';
                }.bind(this)
            },
            {
                type: 'input',
                name: 'routing',
                message: 'Enter path to your routing file:',
                'default': 'desktop.bundles/index/index.routing.yml',
                store: true,
                validate: function (input) {
                    return this._isFilePathValid(input, /^[0-9a-zA-Z._\/-]+\.routing\.yml$/g) || 'Please enter a valid path';
                }.bind(this)
            },
            {
                type: 'input',
                name: 'bemdecl',
                message: 'Enter path to your bemdecl file:',
                'default': 'desktop.bundles/index/index.bemdecl.js',
                store: true,
                validate: function (input) {
                    return this._isFilePathValid(input, /^[0-9a-zA-Z._\/-]+\.bemdecl\.js$/g) || 'Please enter a valid path';
                }.bind(this)
            }
        ];
    },

    /**
     * @public
     */
    prompting: function () {
        var done = this.async(),
            prompts = this._getPrompts();
        this.prompt(prompts, function (props) {
            this.title = props.title;
            this._properties = props;
            done();
        }.bind(this));
    },

    /**
     * @public
     */
    writing: function () {
        this._writePageFiles();
        this._updateAppRouting();
        this._updateAppDeclaration();
    },

    /**
     * @private
     */
    _writePageFiles: function () {
        var sourceRoot = this.sourceRoot(),
            files = this.expandFiles(STUB_BLOCK_NAME + '/*', {cwd: sourceRoot}),
            pageDirectory = this.destinationPath(this._properties.directory, this.fullName);

        this._.each(files, function (filePath) {
            var src = this.templatePath(filePath),
                dest = path.join(pageDirectory, path.basename(filePath).replace(STUB_BLOCK_NAME, this.fullName));
            this.template(src, dest);
        }, this);
    },

    /**
     * @param {string} filePath
     * @returns {boolean}
     * @private
     */
    _isFileReadable: function (filePath) {
        try {
            this.read(this.destinationPath(filePath));
        } catch (e) {
            return false;
        }
        return true;
    },

    /**
     * @param {string} dir
     * @returns {boolean}
     * @private
     */
    _isDirPathValid: function (dir) {
        return /^[0-9a-zA-Z._-]+$/g.test(dir) && fs.existsSync(this.destinationPath(dir));
    },

    /**
     * @param {string} path
     * @param {RegExp} regexp
     * @returns {boolean}
     * @private
     */
    _isFilePathValid: function (path, regexp) {
        return regexp.test(path) && this._isFileReadable(path);
    },

    /**
     * @private
     */
    _updateAppRouting: function () {
        var routingPath = this.destinationPath(this._properties.routing),
            routing = this.read(routingPath);
        this.write(routingPath, routing + '\n- id: ' + this.fullName + '\n  path: ' + this._properties.path + '\n');
    },

    /**
     * todo: work with AST
     * @private
     */
    _updateAppDeclaration: function () {
        var bemdeclPath = this.destinationPath(this._properties.bemdecl),
            bemdecl = this.read(bemdeclPath);
        this.write(bemdeclPath, bemdecl.replace('}\n];', "},\n    {name: '" + this.fullName + "'}\n];"));
    }
});
