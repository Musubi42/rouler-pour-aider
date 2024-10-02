import type { Schema, Attribute } from '@strapi/strapi';

export interface Cat1Test extends Schema.Component {
  collectionName: 'components_cat1_tests';
  info: {
    displayName: 'test';
    icon: 'alien';
  };
  attributes: {
    test: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'cat1.test': Cat1Test;
    }
  }
}
