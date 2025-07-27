export const formatPrice = (price: number): string => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(1)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(0)} Lakh`;
  } else {
    return `₹${price.toLocaleString('en-IN')}`;
  }
};

export const formatPriceDetailed = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
};