const { v4: uuidv4 } = require('uuid');

const bookmarks = [
    {
        id: uuidv4(),
        title: 'This',
        url:'https://www.dictionary.com/browse/this',
        description: 'Definition of "This"',
        rating: 4
    },
    {
        id: uuidv4(),
        title: 'That',
        url:'https://www.dictionary.com/browse/that',
        description: 'Definition of "That"',
        rating: 4
    },
    {
        id: uuidv4(),
        title: 'Thou',
        url:'https://www.dictionary.com/browse/thou',
        description: 'Definition of "Thou"',
        rating: 5
    },
]

module.exports = {bookmarks}
