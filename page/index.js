'use strict';
var PageGenerator = require('../helpers/PageGenerator');

/**
 * @class PageBlockGenerator
 * @extends PageGenerator
 */
module.exports = PageGenerator.extend(/**@lends PageBlockGenerator#*/{

    /**
     * @public
     */
    initializing: function () {
        PageGenerator.prototype.initializing.call(this);

        /**
         * @public for templates
         * @type {string}
         */
        this.title = this.name;
    },

    /**
     * @returns {Array.<object>}
     * @protected
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
            }
        ].concat(PageGenerator.prototype._getPrompts.call(this), [{
                type: 'input',
                name: 'routing',
                message: 'Enter path to your routing file:',
                'default': 'desktop.bundles/index/index.routing.yml',
                store: true,
                validate: function (input) {
                    return this._isFilePathValid(input, /^[0-9a-zA-Z._\/-]+\.routing\.yml$/g) || 'Please enter a valid path';
                }.bind(this)
            }, {
                type: 'input',
                name: 'bemdecl',
                message: 'Enter path to your bemdecl file:',
                'default': 'desktop.bundles/index/index.bemdecl.js',
                store: true,
                validate: function (input) {
                    return this._isFilePathValid(input, /^[0-9a-zA-Z._\/-]+\.bemdecl\.js$/g) || 'Please enter a valid path';
                }.bind(this)
            }]);
    },

    /**
     * we need this because yeoman looks only on methods defined in
     * prototype of instance, not in parent's prototype
     * @public
     */
    prompting: function () {
        PageGenerator.prototype.prompting.call(this);
    },

    /**
     * @param {function} done
     * @param {object} props
     * @protected
     */
    _onPromptingEnd: function (done, props) {
        this.title = props.title;
        PageGenerator.prototype._onPromptingEnd.apply(this, arguments);
    },

    /**
     * @public
     */
    writing: function () {
        PageGenerator.prototype.writing.call(this);
        this._updateAppRouting();
        this._updateAppDeclaration();
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
