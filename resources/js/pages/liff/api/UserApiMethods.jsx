import liff from '@line/liff';
import { getLiffIdToken, clearExpiredIdToken } from '@/components/common/LiffInit';

export const getUser = async (idToken, setUser) => {
  const searchParams = {
    params: { token: idToken }
  };
  return await axios.get('/api/v1/users', searchParams)
  .then((response) => {
    setUser(response.data.user)
    console.log(response.data.user);
    return response.data.user;
  })
  .catch(error => {
    console.error(error)
    const liffId = process.env.MIX_LIFF_ID
    clearExpiredIdToken(liffId)
    
    liff.init({liffId: process.env.MIX_LIFF_ID})
      .then(() => {
        if(liff.isLoggedIn() === false) liff.login()
      })
      .catch((err) => {
        console.log(err.code, err.message);
      });
    getLiffIdToken();
  });
};

export const updateUser = async (id, formValue, setErrors) => {
  return await axios.put(`/api/v1/users/${id}`, formValue)
  .then((response) => {
    console.log(response.data.user);
    return response.data.user
  })
  .catch(error => {
      console.error(error);
      setErrors(error.response.data.errors)
  });
};