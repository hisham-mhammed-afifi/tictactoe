export const whiteList = (str: string = "") => {
  if (!str) return "*";
  const arr = str.split(",");
  if (arr.length === 1) return arr[0];
  return arr;
};
