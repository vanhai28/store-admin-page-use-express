const numPagePerPagination = 4;
MAX_NUMBER_PAGE = 9; //this is got by API

module.exports.prevPage = (currentMinPage) => {
  if (currentMinPage < numPagePerPagination) {
    return 0;
  }

  return currentMinPage - 1;
};
module.exports.nextPage = (currentMinPage) => {
  if (currentMinPage + numPagePerPagination <= MAX_NUMBER_PAGE) {
    return currentMinPage + numPagePerPagination;
  }

  return 0;
};

module.exports.pagination = (page) => {
  let paginationArr = [];

  let temp = 0;

  if (page % numPagePerPagination == 0) {
    temp = numPagePerPagination - 1;

    while (temp >= 0) {
      paginationArr.push({ number: page - temp });
      temp--;
    }

    return paginationArr;
  }

  temp = 1;

  while ((page % numPagePerPagination) - temp >= 0) {
    paginationArr.push({
      number: page - ((page % numPagePerPagination) - temp),
    });
    temp++;
  }

  while (
    temp <= numPagePerPagination &&
    page + (temp - (page % numPagePerPagination)) <= MAX_NUMBER_PAGE
  ) {
    paginationArr.push({
      number: page + (temp - (page % numPagePerPagination)),
    });
    temp++;
  }

  return paginationArr;
};
