export const formatIndianShort = (num) => {
  if (num === undefined || num === null || isNaN(num)) return "0";
  const absNum = Math.abs(num);
  if (absNum >= 100000) return (num / 100000).toFixed(2) + "L";
  if (absNum >= 1000) return (num / 1000).toFixed(2) + "k";
  return num.toFixed(2);
};