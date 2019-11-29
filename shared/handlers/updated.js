module.exports = (ctx, body) => {
  ctx.status = 200;
  ctx.body = (body) ? body : '';
};
