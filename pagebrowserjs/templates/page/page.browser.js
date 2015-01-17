modules.define('<%= fullName %>', ['i-page'], function (provide, Page) {
    "use strict";

    provide(Page.decl(this.name, {

        /**
         * @param {RequestData} data
         * @returns {Promise}
         */
        update: function (data) {

        }

    }));
});
