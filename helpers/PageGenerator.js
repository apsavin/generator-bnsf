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

/**
 * @class PageGenerator
 * @extends NamedBase
 */
module.exports = yeoman.generators.NamedBase.extend(/**@lends PageGenerator#*/{

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
         * @type {object}
         * @protected
         */
        this._properties = {};
    },

    /**
     * @returns {Array.<object>}
     * @protected
     */
    _getPrompts: function () {
        return [
            {
                type: 'input',
                name: 'directory',
                message: 'Enter your pages directory:',
                'default': 'desktop.blocks',
                store: true,
                validate: function (input) {
                    return this._isDirPathValid(input) || 'Please enter a valid name';
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
        this.prompt(prompts, this._onPromptingEnd.bind(this, done));
    },

    /**
     * @param {function} done
     * @param {object} props
     * @protected
     */
    _onPromptingEnd: function (done, props) {
        this._properties = props;
        done();
    },

    /**
     * @public
     */
    writing: function () {
        this._writePageFiles();
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
     * @param {string} dir
     * @returns {boolean}
     * @private
     */
    _isDirPathValid: function (dir) {
        return /^[0-9a-zA-Z._-]+$/g.test(dir) && fs.existsSync(this.destinationPath(dir));
    }
});
