// Mock lodash for TextInput component
// The TextInput component uses lodash.set which tries to mutate props
// We need to clone objects before mutation to avoid React's read-only prop errors

const actualLodash = jest.requireActual('lodash');

module.exports = {
  ...actualLodash,
  set: (obj, path, value) => {
    // Clone the object to avoid mutating read-only React props
    const clone = Array.isArray(obj) ? [...obj] : { ...obj };

    // Handle nested paths by splitting on dots
    const keys = typeof path === 'string' ? path.split('.') : [path];
    let current = clone;

    // Navigate to the parent of the target property
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      } else {
        current[key] = Array.isArray(current[key])
          ? [...current[key]]
          : { ...current[key] };
      }
      current = current[key];
    }

    // Set the final value
    current[keys[keys.length - 1]] = value;

    return clone;
  },
};
