export const cleanObject = (obj: any): any => {
  return Object.keys(obj).reduce((acc: any, key: string) => {
    const value = obj[key];

    // Si el valor es un objeto, limpiamos recursivamente
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const cleanedSubObject = cleanObject(value);

      // Solo agregamos el subobjeto si no está vacío
      if (Object.keys(cleanedSubObject).length > 0) {
        acc[key] = cleanedSubObject;
      }
    }
    // Si el valor no es "" ni undefined, lo agregamos al objeto limpio
    else if (value !== undefined && value !== "") {
      acc[key] = value;
    }

    return acc;
  }, {});
};
