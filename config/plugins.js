module.exports = ({ env }) => {
  // Use Cloudflare R2 (S3-compatible) for uploads when credentials are present
  // (i.e. on Strapi Cloud). Locally, with no AWS_* env vars, fall back to
  // Strapi's default local upload provider so `npm run develop` just works.
  const hasR2 = Boolean(env("AWS_ACCESS_KEY_ID") && env("AWS_ENDPOINT"));

  if (!hasR2) {
    return {};
  }

  return {
    upload: {
      config: {
        provider: "aws-s3",
        providerOptions: {
          baseUrl: env("CDN_URL"),
          s3Options: {
            credentials: {
              accessKeyId: env("AWS_ACCESS_KEY_ID"),
              secretAccessKey: env("AWS_ACCESS_SECRET"),
            },
            endpoint: env("AWS_ENDPOINT"),
            region: env("AWS_REGION", "auto"),
            params: {
              Bucket: env("AWS_BUCKET"),
            },
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  };
};
