// A environment variable must have the prefix `REACT_APP_` in .env file
const environmentConfigVariables = [
  'ERC20_CONTRACT_ADDRESS',
  'IP_API_KEY',
  'NETWORK_ID',
  'POLKAMARKETS_API_URL',
  'PREDICTION_MARKET_CONTRACT_ADDRESS',
  'REALITIO_ERC20_CONTRACT_ADDRESS',
  'RESTRICTED_COUNTRIES',
  'WEB3_PROVIDER'
] as const;

export type EnvironmentConfigVariable =
  typeof environmentConfigVariables[number];

export type EnvironmentConfig = {
  [_variable in typeof environmentConfigVariables[number]]: string | undefined;
};

/**
 * This method will retrieve any configuration variable.
 * @param variable
 * @returns string | undefined
 */
function getEnvironmentConfigVariable(
  variable: EnvironmentConfigVariable
): string | undefined {
  if (!(`REACT_APP_${variable}` in process.env)) {
    throw new Error(`Environment variable REACT_APP_${variable} is undefined!`);
  }
  return process.env[`REACT_APP_${variable}`];
}

function buildEnvironmentConfigObject() {
  return environmentConfigVariables.reduce(
    (acc, variable) => ({
      ...acc,
      [variable]: getEnvironmentConfigVariable(variable)
    }),
    {} as EnvironmentConfig
  );
}

const environmentConfig = buildEnvironmentConfigObject();

export default environmentConfig;
