import liff from '@line/liff';
import Cookies from 'js-cookie';

export const clearExpiredIdToken = (liffId) => {
  const keyPrefix = `LIFF_STORE:${liffId}:`
  const key = keyPrefix + 'decodedIDToken'
  const decodedIDTokenString = localStorage.getItem(key)
  if (!decodedIDTokenString) {
    return
  }
  const decodedIDToken = JSON.parse(decodedIDTokenString)
  // 有効期限をチェック
  if (new Date().getTime() > decodedIDToken.exp * 1000) {
      const keys = getLiffLocalStorageKeys(keyPrefix)
      keys.forEach(function(key) {
        localStorage.removeItem(key)
      })
  }
}

export const getLiffIdToken = () => {
  liff.init({
    liffId: process.env.MIX_LIFF_ID
  })
  .then(() => {
    const idToken = liff.getIDToken();
    Cookies.set('TOKEN', idToken, { expires: 1/24 })
  }); 
};

const getLiffLocalStorageKeys = (prefix) => {
  const keys = []
  for (var i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.indexOf(prefix) === 0) {
      keys.push(key)
    }
  }
  return keys
}