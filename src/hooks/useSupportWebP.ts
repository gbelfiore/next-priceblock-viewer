import { useEffect, useState } from 'react';
import supportsWebP from 'supports-webp';
import { eState } from './types';

const useSupportWebP = () => {
  const [supportWebP, setSupportWebP] = useState<eState>(eState.LOADING);

  useEffect(() => {
    if (supportWebP == eState.LOADING) {
      supportsWebP
        .then((supported) => {
          if (supported) {
            setSupportWebP(eState.TRUE);
          } else {
            setSupportWebP(eState.FALSE);
          }
        })
        .catch((error) => {
          setSupportWebP(eState.FALSE);
          console.error(error);
        });
    }
  }, [supportWebP]);

  return supportWebP;
};

export default useSupportWebP;
