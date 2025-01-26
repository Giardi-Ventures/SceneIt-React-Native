export function constructPropertyMapper(...propList: any[]) {
  const propertyMap = propList.reduce((dict, props: [] | Object) => {
    if (Array.isArray(props)) {
      for (let item of props) {
        dict[item] = item;
      }

      return dict;
    }

    return {...dict, ...props};
  }, {});

  return (property: Object, value : Object = {}) => {
    const objectReturn = value;

    for (let key of Object.keys(property)) {
      if (key in propertyMap) {
        objectReturn[propertyMap[key]] = property[key];
        delete property[key];
      }
    }

    return objectReturn;
  };
}

export function mapPropertyValue(object, props) {
  for (let key of Object.keys(props)) {
    if (key in object) {
      const value = props[key];

      delete object[key];

      return value;
    }
  }

  return null;
}
