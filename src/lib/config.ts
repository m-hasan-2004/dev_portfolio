export const config = {
  github: {
    enabled:
      process.env.GITHUB_TOKEN &&
      process.env.GITHUB_TOKEN !== "off",
    token: process.env.GITHUB_TOKEN || "",
  },
};
