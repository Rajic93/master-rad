    
class SequelizeOrmUtils {
    static constructConfigurationObject({
        query = {},
        attributes,
        orderBy,
        joins,
        limit = 10,
        offset = 0,
    }) {
        const where = query;
        const include = this.makeJoins(joins);
        const order = this.resolveOrderBy(orderBy); 

        return {
            attributes,
            where,
            include,
            order,
            limit,
            offset,
        }
    }

    static makeJoins(joins = []) {
        if (!joins || joins.length === 0) {
            return undefined;
        }

        return joins;
    }

    static resolveOrderBy(columns) {
        return columns;
    }
}

module.exports = SequelizeOrmUtils;
