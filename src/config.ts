export const apiUrl =
  import.meta.env.VITE_BACKEND_DEV_ADDRESS ||
  import.meta.env.VITE_BACKEND_PROD_ADDRESS;

export const runningInProd = import.meta.env.PROD;
