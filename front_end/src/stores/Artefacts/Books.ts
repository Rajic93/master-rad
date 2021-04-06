import { loadBooks, rateBook } from "../../endpoints/books";
import { action, observable } from "mobx";

class Books {
    @observable yourList = [];
    @observable hoodList = [];
    @observable yourCount = 0;
    @observable hoodCount = 0;

    @action load(query) {
        return loadBooks({...query, userId: 999999 })
            .then(({
                yourRecommendations: {
                    rows: yourBooks,
                    count: yourCount,
                },
                hoodRecommendations: {
                    rows: hoodBooks,
                    count: hoodCount,
                },
            }) => {
                this.yourList = yourBooks;
                this.hoodList = hoodBooks;
                this.yourCount = yourCount;
                this.hoodCount = hoodCount;
            });
    }

    @action rate(id, rating) {
        return rateBook({ entityId: id, rating, userId: 999999 });
    }
}

export default Books;
