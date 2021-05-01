import { loadBooks, rateBook } from "../../endpoints/books";
import { action, observable } from "mobx";

class Books {
    @observable yourList = [];
    @observable hoodList = [];
    @observable yourCount = 0;
    @observable hoodCount = 0;

    @action load(query: any) {
        return loadBooks(query)
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
                console.log({
                    yourBooks,
                    hoodBooks,
                    yourCount,
                    hoodCount,
                })
                this.yourList = yourBooks || [];
                if (Object.keys(yourBooks).length === 0) {
                    this.yourList = yourBooks || [];
                }
                this.hoodList = hoodBooks || [];
                this.yourCount = yourCount || 0;
                this.hoodCount = hoodCount || 0;
            });
    }

    @action rate(id, rating) {
        return rateBook({ entityId: id, rating, userId: 999999 });
    }
}

export default Books;
