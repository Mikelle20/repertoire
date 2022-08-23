var ratingAvg = function (sum, count) {
    var avg = (sum / count) * 5.0;
    return avg;
};
module.exports = {
    ratingAvg: ratingAvg,
};
