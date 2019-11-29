const onError = require('./error');
const onSuccess = require('./success');
const onSuccessWithoutMeta = require('./success-without-meta');
const onCreated = require('./created');
const onUpdated = require('./updated');
const onBadRequest = require('./bad-request');
const onNoContent = require('./no-content');

module.exports = { onError, onSuccess, onSuccessWithoutMeta, onCreated, onBadRequest, onNoContent, onUpdated };
