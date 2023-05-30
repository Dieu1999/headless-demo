// hydrogen.config.ts

export default defineConfig({
    privateStorefrontToken:
    /* In this example, the environment variable is stored in `Oxygen.env`.
       If you're not deploying to Oxygen, then you can choose a different storage location.*/
      Oxygen?.env?.PRIVATE_STOREFRONT_API_TOKEN,
  });
