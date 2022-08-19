exports.editDistance = function(source, target, callback) {
  const n = source.length + 1;
  const m = target.length + 1;
  const distMatrix = [];
  let min = 0;
  let i, j;
  for (i = 0; i < n; i++) {
    distMatrix[i] = [];
  }
  for (i = 0; i < n; i++) {
    distMatrix[i][0] = i;
  }
  for (i = 0; i < m; i++) {
    distMatrix[0][i] = i;
  }
  for (i = 1; i < n; i++) {
    for (j = 1; j < m; j++) {
      if (source.charAt(j - 1) === target.charAt(i - 1)) {
        min = distMatrix[i - 1][j - 1];
      }
      else {
        min = Math.min(
          distMatrix[i - 1][j - 1] + 1,
          distMatrix[i - 1][j] + 1,
          distMatrix[i][j - 1] + 1,
        );
      }
      distMatrix[i][j] = min;
    }
  }
  callback(distMatrix[n - 1][m - 1]);
};
