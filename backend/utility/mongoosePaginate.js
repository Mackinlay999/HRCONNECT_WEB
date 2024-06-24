const mongoosePaginate = require('mongoose-paginate-v2');

mongoosePaginate.paginate.options = {
  customLabels: {
    docs: 'data',
    meta: 'meta',
  },
  lean: true,
  leanWithId: false,
  page: 1,
  limit: 1,
};

module.exports = mongoosePaginate;
