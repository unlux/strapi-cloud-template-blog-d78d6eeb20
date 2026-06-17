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

  // TEMP DIAGNOSTIC — logs credential *presence* (never the secret values) plus
  // the non-secret config so the Strapi Cloud boot log shows exactly what's set
  // and which provider was chosen. Remove once R2 uploads are confirmed.
  console.info(
    "[r2-upload-check] " +
      JSON.stringify({
        AWS_ACCESS_KEY_ID: Boolean(accessKeyId),
        AWS_ACCESS_SECRET: Boolean(secretAccessKey),
        AWS_ENDPOINT: endpoint || null,
        AWS_BUCKET: bucket || null,
        AWS_REGION: env("AWS_REGION") || null,
        CDN_URL: env("CDN_URL") || null,
        provider:
          accessKeyId && secretAccessKey && endpoint && bucket
            ? "aws-s3"
            : "LOCAL-FALLBACK",
      }),
  );

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
