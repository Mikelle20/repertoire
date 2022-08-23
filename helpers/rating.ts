const ratingAvg = (sum: number, count: number) => {
  const avg = (sum / count) * 5.0;
  return avg;
};

module.exports = {
  ratingAvg,
};
