module.exports = ({ env }) => {
  // Activate Cloudflare R2 (S3) uploads ONLY when the full credential set is
  // present. A partial set would let the S3 client initialize with undefined
  // values and crash Strapi at boot, so require all of them or fall back to
  // Strapi's local upload provider (which is also what local dev uses).
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
