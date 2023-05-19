const getUrlParams = (url: string) => {
  return url.replace(/[^0-9]/g, '');
};

export default getUrlParams;
