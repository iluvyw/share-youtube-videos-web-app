export const getLocalEnvVariable = (key: string): string => {
  return import.meta.env[key];
};
