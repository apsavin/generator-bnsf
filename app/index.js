'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.NamedBase.extend({

    /**
     * @constructor
     */
    constructor: function () {
        yeoman.generators.NamedBase.apply(this, arguments);
        this.option('skip-install', {
            desc: 'Skip the installation of dependencies and libraries after generation of the project',
            type: Boolean,
            required: 'false'
        });
    },

    /**
     * @public
     */
    writing: function () {
        var sourceRoot = this.sourceRoot(),
            files = this.expandFiles('**', { dot: true, cwd: sourceRoot });

        this._.each(files, function (filePath) {
            var src = this.templatePath(filePath),
                dest = this.destinationPath(this.name, filePath);
            this.template(src, dest);
        }, this);
    },

    /**
     * @public
     */
    install: function () {
        process.chdir(this.destinationPath(this.name));
        this.installDependencies({
            bower: false,
            skipInstall: this.options['skip-install']
        });
    }
});
