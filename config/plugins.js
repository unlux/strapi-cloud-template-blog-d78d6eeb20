module.exports = () => ({
  // Upload provider is configured per-environment. Production (Strapi Cloud)
  // uses Cloudflare R2 via config/env/production/plugins.js — it MUST live there
  // because Strapi Cloud overrides the global config on deploy. Local dev uses
  // Strapi's default local upload provider (no override needed here).
});
