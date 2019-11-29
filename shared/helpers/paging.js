class PagingHelper {
    build(query = {}) {
  
      const sort = {};
      const page = parseInt(query.page, 10) || 1;
      const limit = parseInt(query.limit, 10) || 10;
      let skip = (page - 1) * limit;
      skip = skip < 0 ? 0 : skip;
  
      Object.keys(query).forEach((prop) => {
        if (prop.match('sort_')) {
          sort[prop.replace('sort_', '')] = query[prop] === 'asc' ? 1 : query[prop] === 'desc' ? -1 : 1;
        }
      });
  
      return {
        page,
        limit,
        skip,
        sort
      };
    }
  
    resolve(meta, total) {
      let pages = parseInt(total / meta.limit, 10);
      if ((total % 2) > 0) {
        pages += 1;
      }
  
      if (pages === 0) pages = 1;
  
      return {
        currentPage: meta.page,
        itemsPerPage: meta.limit,
        totalPages: pages,
        totalItems: total
      };
    }
  }
  
  module.exports = new PagingHelper();
  