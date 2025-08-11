const isDevelopment = process.env.NODE_ENV === "development";
export const serverEndpoint = isDevelopment
  ? "http://localhost:3001"
  : `${process.env.SERVER_ENDPOINT}`;
