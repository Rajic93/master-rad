const tf = require('@tensorflow/tfjs-node');

let booksLocation;
let booksModel;

const loadModel = async (url) => tf.loadLayersModel(url);

const recommend = (data, type) => {
    if (type === 'books') {
        if (!booksModel) {
            return;
        }

        console.log('Found books model');
        console.log(booksModel);
    }
}

const init = ({
    models: {
        locations: {
            books,
        },
    },
} = { models: { locations: {} } }) => {
    booksLocation = books;
    if (books) {
        console.log(booksLocation)
        booksModel = loadModel(booksLocation);
    }

    return { recommend }
};

module.exports = init
