
module.exports = (ctx, body) => {
  ctx.status = 201;
  ctx.body = (body) ? body : '';
};
