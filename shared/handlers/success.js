module.exports = (meta, data, ctx) => {
  ctx.status = 200;
  ctx.body = {
    meta,
    data
  };
  if (!meta['currentPage']) {
    delete ctx.body['meta'];
  }
};
