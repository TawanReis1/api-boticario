module.exports = (body, ctx) => {
  ctx.status = 400;
  ctx.body = body;
};
