import { loadBooks, rateBook } from "../../endpoints/books";
import { action, observable } from "mobx";

const books = {
    "count": 110913,
    "rows": [
        {
            "id": 639856,
            "isbn": "0684848783",
            "title": "Tis : A Memoir",
            "authors": "Frank McCourt",
            "year": 1999,
            "average_rating": "0.00",
            "publisher": "Scribner",
            "image_url_s": "http://images.amazon.com/images/P/0684848783.01.THUMBZZZ.jpg",
            "image_url_m": "http://images.amazon.com/images/P/0684848783.01.MZZZZZZZ.jpg",
            "image_url_l": "http://images.amazon.com/images/P/0684848783.01.LZZZZZZZ.jpg"
        },
        {
            "id": 639861,
            "isbn": "0749748028",
            "title": "The Folk of the Faraway Tree",
            "authors": "Enid Blyton",
            "year": 2002,
            "average_rating": "0.00",
            "publisher": "Egmont Childrens Books",
            "image_url_s": "http://images.amazon.com/images/P/0749748028.01.THUMBZZZ.jpg",
            "image_url_m": "http://images.amazon.com/images/P/0749748028.01.MZZZZZZZ.jpg",
            "image_url_l": "http://images.amazon.com/images/P/0749748028.01.LZZZZZZZ.jpg"
        },
        {
            "id": 639864,
            "isbn": "1563898586",
            "title": "The League of Extraordinary Gentlemen, Vol. 1",
            "authors": "Alan Moore",
            "year": 2002,
            "average_rating": "0.00",
            "publisher": "DC Comics",
            "image_url_s": "http://images.amazon.com/images/P/1563898586.01.THUMBZZZ.jpg",
            "image_url_m": "http://images.amazon.com/images/P/1563898586.01.MZZZZZZZ.jpg",
            "image_url_l": "http://images.amazon.com/images/P/1563898586.01.LZZZZZZZ.jpg"
        },
        {
            "id": 639922,
            "isbn": "0345422392",
            "title": "Vittorio the Vampire: New Tales of the Vampires",
            "authors": "Anne Rice",
            "year": 2001,
            "average_rating": "0.00",
            "publisher": "Ballantine Books",
            "image_url_s": "http://images.amazon.com/images/P/0345422392.01.THUMBZZZ.jpg",
            "image_url_m": "http://images.amazon.com/images/P/0345422392.01.MZZZZZZZ.jpg",
            "image_url_l": "http://images.amazon.com/images/P/0345422392.01.LZZZZZZZ.jpg"
        },
        {
            "id": 639933,
            "isbn": "0440206154",
            "title": "Red Dragon",
            "authors": "Thomas Harris",
            "year": 2000,
            "average_rating": "0.00",
            "publisher": "Dell Publishing Company",
            "image_url_s": "http://images.amazon.com/images/P/0440206154.01.THUMBZZZ.jpg",
            "image_url_m": "http://images.amazon.com/images/P/0440206154.01.MZZZZZZZ.jpg",
            "image_url_l": "http://images.amazon.com/images/P/0440206154.01.LZZZZZZZ.jpg"
        },
        {
            "id": 639942,
            "isbn": "0449134482",
            "title": "Dances With Wolves",
            "authors": "Michael Blake",
            "year": 1990,
            "average_rating": "0.00",
            "publisher": "Fawcett Books",
            "image_url_s": "http://images.amazon.com/images/P/0449134482.01.THUMBZZZ.jpg",
            "image_url_m": "http://images.amazon.com/images/P/0449134482.01.MZZZZZZZ.jpg",
            "image_url_l": "http://images.amazon.com/images/P/0449134482.01.LZZZZZZZ.jpg"
        },
        {
            "id": 639915,
            "isbn": "0440215625",
            "title": "Dragonfly in Amber",
            "authors": "DIANA GABALDON",
            "year": 1993,
            "average_rating": "0.00",
            "publisher": "Dell",
            "image_url_s": "http://images.amazon.com/images/P/0440215625.01.THUMBZZZ.jpg",
            "image_url_m": "http://images.amazon.com/images/P/0440215625.01.MZZZZZZZ.jpg",
            "image_url_l": "http://images.amazon.com/images/P/0440215625.01.LZZZZZZZ.jpg"
        },
        {
            "id": 639939,
            "isbn": "042512892X",
            "title": "Into the Darkness",
            "authors": "Barbara Michaels",
            "year": 1996,
            "average_rating": "0.00",
            "publisher": "Berkley Publishing Group",
            "image_url_s": "http://images.amazon.com/images/P/042512892X.01.THUMBZZZ.jpg",
            "image_url_m": "http://images.amazon.com/images/P/042512892X.01.MZZZZZZZ.jpg",
            "image_url_l": "http://images.amazon.com/images/P/042512892X.01.LZZZZZZZ.jpg"
        },
        {
            "id": 641557,
            "isbn": "034071879X",
            "title": "Exclusion Zone",
            "authors": "John Nichol",
            "year": 1998,
            "average_rating": "0.00",
            "publisher": "Hodder &amp",
            "image_url_s": " Stoughton General Division",
            "image_url_m": "http://images.amazon.com/images/P/034071879X.01.THUMBZZZ.jpg",
            "image_url_l": "http://images.amazon.com/images/P/034071879X.01.MZZZZZZZ.jpg"
        },
        {
            "id": 639961,
            "isbn": "0380002450",
            "title": "Awakening",
            "authors": "Kate Chopin",
            "year": 1982,
            "average_rating": "0.00",
            "publisher": "Avon",
            "image_url_s": "http://images.amazon.com/images/P/0380002450.01.THUMBZZZ.jpg",
            "image_url_m": "http://images.amazon.com/images/P/0380002450.01.MZZZZZZZ.jpg",
            "image_url_l": "http://images.amazon.com/images/P/0380002450.01.LZZZZZZZ.jpg"
        },
        {
            "id": 639846,
            "isbn": "0345378490",
            "title": "Congo",
            "authors": "Michael Crichton",
            "year": 1995,
            "average_rating": "0.00",
            "publisher": "Ballantine Books",
            "image_url_s": "http://images.amazon.com/images/P/0345378490.01.THUMBZZZ.jpg",
            "image_url_m": "http://images.amazon.com/images/P/0345378490.01.MZZZZZZZ.jpg",
            "image_url_l": "http://images.amazon.com/images/P/0345378490.01.LZZZZZZZ.jpg"
        },
        {
            "id": 639863,
            "isbn": "0963094424",
            "title": "Angels and Visitations: A Miscellany",
            "authors": "Neil Gaiman",
            "year": 1993,
            "average_rating": "0.00",
            "publisher": "Dreamhaven Books",
            "image_url_s": "http://images.amazon.com/images/P/0963094424.01.THUMBZZZ.jpg",
            "image_url_m": "http://images.amazon.com/images/P/0963094424.01.MZZZZZZZ.jpg",
            "image_url_l": "http://images.amazon.com/images/P/0963094424.01.LZZZZZZZ.jpg"
        },
        {
            "id": 639891,
            "isbn": "1860198597",
            "title": "How to Draw Celtic Knotwork: A Practical Handbook",
            "authors": "Andy Sloss",
            "year": 0,
            "average_rating": "0.00",
            "publisher": "Brockhampton Press",
            "image_url_s": "http://images.amazon.com/images/P/1860198597.01.THUMBZZZ.jpg",
            "image_url_m": "http://images.amazon.com/images/P/1860198597.01.MZZZZZZZ.jpg",
            "image_url_l": "http://images.amazon.com/images/P/1860198597.01.LZZZZZZZ.jpg"
        }
    ]
};

class Books {
    @observable list = [];
    @observable count = 0;
    @observable config;

    constructor(config = { isAll: true }) {
        this.config = config
    }

    @action load(query: any) {
        if (this.config.isPersonal) {
            return new Promise(async (resolve) => {
                setTimeout(() => { resolve(books) }, 1000);
            })
            .then(({
                count, rows,
            }) => {
                console.log({
                    rows,
                    count,
                })
                this.list = rows;
                this.count = count
            });
        }
        return loadBooks({
            ...this.config,
            ...query
        })
            .then(({
                count, rows,
            }) => {
                console.log({
                    rows,
                    count,
                })
                this.list = rows;
                this.count = count
            });
    }

    @action rate(id, rating, userId) {
        return rateBook({ entityId: id, rating, userId: userId || 999999 });
    }

    @action clear() {
        this.list = [];
        this.count = 0;
    }
}

export default Books;
