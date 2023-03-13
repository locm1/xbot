export const generateEnv = () => {
  let liffId;
  let mock;
  switch (process.env.NODE_ENV) {
    case 'production':
      liffId = process.env.MIX_LIFF_ID ?? '';
      mock = false;
      break;
    case 'dev':
      liffId = process.env.MIX_LIFF_ID;
      mock = true;
      break;
  }
  return {liffId, mock};
};