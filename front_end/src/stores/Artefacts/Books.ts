import { loadBooks, rateBook } from "../../endpoints/books";
import { action, observable } from "mobx";

class Books {
    @observable list = [];
    @observable count = 0;
    @observable config;

    constructor(config = { isAll: true }) {
        this.config = config
    }

    @action load(query: any) {
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
