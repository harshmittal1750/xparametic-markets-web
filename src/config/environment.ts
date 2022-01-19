import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

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

const networkConfigVariables = [
  'PREDICTION_MARKET_CONTRACT_ADDRESS',
  'REALITIO_ERC20_CONTRACT_ADDRESS',
  'ERC20_CONTRACT_ADDRESS',
  'NETWORK_ID',
  'WEB3_PROVIDER',
  'WEB3_EVENTS_PROVIDER'
] as const;

const networkVariableRegularExp = new RegExp(
  '^REACT_APP_NETWORK_([0-9]+)((_[A-Z0-9]+)*)$'
);

export type EnvironmentConfigVariable =
  typeof environmentConfigVariables[number];

export type NetworkConfigVariable = typeof networkConfigVariables[number];

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

function getNetworksConfigVariables() {
  const networksVariables = Object.keys(process.env).filter(variable =>
    variable.match(networkVariableRegularExp)
  );

  return networksVariables;
}

function groupNetworksVariablesById(variables: string[]) {
  const networks = {};

  function addVariableToGroup(variable: string) {
    const regexMatchResult = variable.match(networkVariableRegularExp);
    const group = !isNull(regexMatchResult) ? regexMatchResult[1] : undefined;

    if (!isUndefined(group)) {
      networks[group] = [...(networks[group] || []), variable];
    }
  }

  variables.forEach(addVariableToGroup);

  return networks;
}

function buildEnvironmentConfigObject() {
  const networkVariables = getNetworksConfigVariables();
  const networksVariablesById = groupNetworksVariablesById(networkVariables);

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
