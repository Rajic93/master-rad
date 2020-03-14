
const Service = require('../Service');
const ServiceRegistry = require('../ServiceRegistry');
const http = require('../../utilities/http');

class RecommendationService extends Service {
    constructor() {
        super('recommendation');
    }

    async books(userId, ...params) {
        const books = await http.get(
            'recommendation_engine/books',
            {
                params:
                {
                    userId,
                    ...params
                },
            },
        );
        return books;
    }
}

ServiceRegistry.registerService('recommendation', RecommendationService);

module.exports = RecommendationService;
