const KEY = 'products';

export const readCart = () => {
  const response = localStorage.getItem(KEY);
  if (response) return JSON.parse(response);
  return [];
};

export const createCart = (obj) => {
  const dbCart = readCart();
  if (dbCart.length) {
    localStorage.setItem(KEY, JSON.stringify([...dbCart, obj]));
    return [...dbCart, obj];
  }
  localStorage.setItem(KEY, JSON.stringify([obj]));
  return [obj];
};

export const updateCart = (obj) => {
  const dbCart = readCart();
  if (dbCart.length) {
    const dbFilter = dbCart.map((item) => {
      if (item.id === obj.id) return obj;
      return item;
    });
    localStorage.setItem(KEY, JSON.stringify(dbFilter));
    return dbFilter;
  }
};

export const deleteProducts = (id) => {
  const dbCart = readCart();
  const productsFiltered = dbCart.filter((product) => product.id !== id);
  localStorage.setItem(KEY, JSON.stringify(productsFiltered));
  return productsFiltered;
};
