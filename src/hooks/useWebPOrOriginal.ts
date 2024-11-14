import { useEffect, useMemo, useState } from 'react';
import { useCompletPath } from './useCompletPath';
import useSupportWebP from './useSupportWebP';
import { eState } from './types';

const useWebPOrOriginal = (basePath: string, originalRelativePath?: string) => {
  const supportWebP = useSupportWebP();
  const { original, webp } = useCompletPath(basePath, originalRelativePath) ?? {};
  const [exists, setExists] = useState<eState>(eState.LOADING);

  useEffect(() => {
    if (supportWebP == eState.TRUE) {
      if (webp) {
        const img = new Image();
        img.onload = () => setExists(eState.TRUE);
        img.onerror = () => setExists(eState.FALSE);
        img.src = webp;
      }
    } else if (supportWebP == eState.FALSE) {
      setExists(eState.FALSE);
    }
  }, [supportWebP, webp]);

  const getUrl = useMemo(() => {
    if (exists == eState.LOADING) {
      return null;
    } else if (exists == eState.TRUE) {
      return webp;
    } else {
      return original;
    }
  }, [exists, original, webp]);

  if (!original && !webp) return null;
  return getUrl;
};

export default useWebPOrOriginal;
