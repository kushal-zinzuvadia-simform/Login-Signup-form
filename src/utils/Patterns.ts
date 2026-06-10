export const patterns = {
  address: /^[a-zA-Z0-9\s.,#/-]{5,100}$/,
  city: /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/, // Only allow punctuation for separating words
};
