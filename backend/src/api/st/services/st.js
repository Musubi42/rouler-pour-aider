'use strict';

/**
 * st service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::st.st');
