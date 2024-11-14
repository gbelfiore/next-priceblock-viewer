import path from 'path-browserify';

interface IUseImageReturn {
  original?: string;
  webp?: string;
}

const getCompletPath = (basePath: string, url?: string): IUseImageReturn | null => {
  if (!url) return {};
  const cleanUrl = new URL(`${basePath}/${url}`).pathname;
  const ext = path.parse(cleanUrl).ext;
  return {
    original: `${basePath}/${url}`,
    webp: `${basePath}/${url.replace(ext, '.webp')}`,
  };
};

const useCompletPath = (basePath: string, url?: string): IUseImageReturn | null => {
  return getCompletPath(basePath, url);
};

export { getCompletPath, useCompletPath };
