import { loadSamples, rateSamples } from "../../endpoints/books";
import { action, computed, observable } from "mobx";

class Affinities {
    @observable list = [];

    @observable ratings = {};

    @action load() {
        return loadSamples()
            .then(samples => { this.list = samples});
    }

    @action setRating(id, rating) {
        this.ratings[id] = rating;
    }

    @action submit() {
        if (Object.keys(this.ratings).length === 0) {
            return Promise.resolve();
        }
        return rateSamples({...this.ratings, userId: 999999});
    }

    @computed get isAllSelected() {
        return this.list.every(item => !!this.ratings[item.id]);
    }
}

export default Affinities;
