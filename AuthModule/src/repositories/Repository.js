
class Repository {
    constructor(context, ormUtils = SequelizeOrmUtils) {
        this.context = context;
        this.ormUtils = ormUtils;
    }

    prepareQuery(query) {
        return this.ormUtils.constructConfigurationObject(query);
    }

    async findOne(params) {
        return this.context.findOne(this.prepareQuery(params));
    }

    async findAll(params) {
        return this.context.findAll(this.prepareQuery(params));
    }

    async addOne() {

    }

    async bulkAdd() {

    }

    async removeOne() {

    }

    async bulkRemove() {

    }
}

module.exports = Repository;
