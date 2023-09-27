/* eslint-disable import/prefer-default-export */
type Filter = {
  name: string;
  values: string[];
  multiple: boolean;
};

function parseFiltersFromEnv(variable: string | undefined): Filter[] {
  if (!variable) {
    return [];
  }

  try {
    const parsedVariable = JSON.parse(variable);
    const filters = parsedVariable.map(item => ({
      name: item.name,
      values: item.values,
      multiple: item.multiple
    }));

    return filters;
  } catch (error) {
    return [];
  }
}

export { parseFiltersFromEnv };
