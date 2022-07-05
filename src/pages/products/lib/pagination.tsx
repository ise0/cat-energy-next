export const MAX_PAGE_ELEMS = 4;
// eslint-disable-next-line prefer-const
let MAX_VISIBLE_PAGES = 3;

export const getPagesToDisplay = (totalQty: number, currentPage: number) => {
  const numPages = Math.ceil(totalQty / MAX_PAGE_ELEMS) || 1;

  // eslint-disable-next-line no-param-reassign
  currentPage = currentPage > numPages || currentPage < 0 ? 1 : currentPage;
  let range: { start: number; end: number };

  switch (MAX_VISIBLE_PAGES) {
    case 1:
      range = { start: currentPage, end: currentPage };
      break;
    case 2:
      if (currentPage > 1) {
        range = { start: currentPage - 1, end: currentPage };
      } else {
        range = { start: currentPage, end: currentPage + 1 };
      }
      break;
    default: {
      const numPagesBySide = Math.floor(MAX_VISIBLE_PAGES / 2);

      const numPrevPages = numPagesBySide >= currentPage ? currentPage - 1 : numPagesBySide;
      const numNextPages =
        numPagesBySide >= numPages - currentPage ? numPages - currentPage : numPagesBySide;

      const extraNextPages = numPagesBySide - numPrevPages;
      const extraPrevPages = numPagesBySide - numNextPages;

      const start =
        currentPage - numPrevPages - extraPrevPages > 0
          ? currentPage - numPrevPages - extraPrevPages
          : 1;

      const end =
        currentPage + numNextPages + extraNextPages < numPages
          ? currentPage + numNextPages + extraNextPages
          : numPages;

      range = { start, end };
      break;
    }
  }

  const pagesArr: number[] = [];
  for (let page = range.start; page <= range.end; page += 1) {
    pagesArr.push(page);
  }

  return pagesArr;
};
