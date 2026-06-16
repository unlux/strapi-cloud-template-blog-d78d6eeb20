import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCodeBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_code_blocks';
  info: {
    displayName: 'Code Block';
    icon: 'code';
  };
  attributes: {
    caption: Schema.Attribute.String;
    code: Schema.Attribute.Text & Schema.Attribute.Required;
    language: Schema.Attribute.String;
  };
}

export interface SharedCtaBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_blocks';
  info: {
    displayName: 'CTA Block';
    icon: 'cursor';
  };
  attributes: {
    body: Schema.Attribute.Text;
    buttonLabelOverride: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    preset: Schema.Attribute.Relation<'oneToOne', 'api::cta-preset.cta-preset'>;
  };
}

export interface SharedImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_image_blocks';
  info: {
    displayName: 'Image Block';
    icon: 'picture';
  };
  attributes: {
    altText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    credit: Schema.Attribute.String;
    decorative: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    image: Schema.Attribute.Media<'images'>;
    objectPosition: Schema.Attribute.String;
  };
}

export interface SharedLinkedinEmbed extends Struct.ComponentSchema {
  collectionName: 'components_shared_linkedin_embeds';
  info: {
    displayName: 'LinkedIn Embed';
    icon: 'link';
  };
  attributes: {
    fallbackImage: Schema.Attribute.Media<'images'>;
    fallbackText: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedProofMetric extends Struct.ComponentSchema {
  collectionName: 'components_shared_proof_metrics';
  info: {
    displayName: 'Proof Metric';
    icon: 'chartBubble';
  };
  attributes: {
    description: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich Text';
    icon: 'align-left';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'Seo';
    icon: 'search';
  };
  attributes: {
    canonicalOverride: Schema.Attribute.String;
    noindex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    seoDescription: Schema.Attribute.Text;
    seoImage: Schema.Attribute.Media<'images'>;
    seoTitle: Schema.Attribute.String;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedTableBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_table_blocks';
  info: {
    displayName: 'Table Block';
    icon: 'grid';
  };
  attributes: {
    caption: Schema.Attribute.String;
    columns: Schema.Attribute.JSON;
    rows: Schema.Attribute.JSON;
  };
}

export interface SharedTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonials';
  info: {
    displayName: 'Testimonial';
    icon: 'quote';
  };
  attributes: {
    company: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    role: Schema.Attribute.String;
  };
}

export interface SharedYoutubeEmbed extends Struct.ComponentSchema {
  collectionName: 'components_shared_youtube_embeds';
  info: {
    displayName: 'YouTube Embed';
    icon: 'play';
  };
  attributes: {
    allowAutoplay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    posterImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.code-block': SharedCodeBlock;
      'shared.cta-block': SharedCtaBlock;
      'shared.image-block': SharedImageBlock;
      'shared.linkedin-embed': SharedLinkedinEmbed;
      'shared.media': SharedMedia;
      'shared.proof-metric': SharedProofMetric;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.table-block': SharedTableBlock;
      'shared.testimonial': SharedTestimonial;
      'shared.youtube-embed': SharedYoutubeEmbed;
    }
  }
}
