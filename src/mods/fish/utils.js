// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
const utils = {
    randomIntInclusive: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
};
