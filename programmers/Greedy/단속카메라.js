function solution(routes) {
  routes.sort((a, b) => a[1] - b[1]);

  let camera = routes.length;
  let endPoint = routes.shift()[1];

  routes.forEach(route => {
    if (endPoint >= route[0]) camera -= 1;
    else endPoint = route[1];
  });

  return camera;
}
