export const errorParser = (error: any) => {
  if (error.message.includes('E11000 duplicate key error')) {
    const duplicateValue = error.message.match(/"([^']+)"/)[1];
    return { status: 400, message: `${duplicateValue} already exists!` };
  }
  return { status: 500, message: error.message };
};
