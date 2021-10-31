
const registerRoutes = (app, services) => {
    app.use('/ping', async (req, res) => {
        await services.artefactsService.recommend([], 'books');
        res.send('Hello from recommendation engine!');
      });
};

module.exports = registerRoutes;