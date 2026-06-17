module.exports = ({ env }) => {
  // Cloudflare R2 (S3-compatible) upload provider for PRODUCTION (Strapi Cloud).
  //
  // This MUST live under config/env/production/ — on Strapi Cloud the global
  // config/plugins.js is overridden by the platform, so a custom upload provider
  // placed there never loads and uploads silently fall back to managed storage
  // (*.media.strapiapp.com). See https://docs.strapi.io/cloud/advanced/upload
  //
  // Activates R2 only when the full credential set is present; otherwise returns
  // {} so a partial config can't crash Strapi at boot.
  const accessKeyId = env("AWS_ACCESS_KEY_ID");
  const secretAccessKey = env("AWS_ACCESS_SECRET");
  const endpoint = env("AWS_ENDPOINT");
  const bucket = env("AWS_BUCKET");

  if (!accessKeyId || !secretAccessKey || !endpoint || !bucket) {
    return {};
  }

  return {
    upload: {
      config: {
        provider: "aws-s3",
        providerOptions: {
          baseUrl: env("CDN_URL"),
          s3Options: {
            credentials: { accessKeyId, secretAccessKey },
            endpoint,
            region: env("AWS_REGION", "auto"),
            params: { Bucket: bucket },
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
