module.exports = {
  PACKING_ENV: process.env.PACKING_ENV || 'development',
  PACKING_SITE: process.env.PACKING_SITE || '',  // default to local
  PACKING_GAME: process.env.PACKING_GAME || 'G0028', // given game id
};
