module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [clusters] = await queryInterface.sequelize.query('select distinct(cluster_label) from users');

    const clusterRecords = clusters.map((c) => ({
      label: c.cluster_label,
      scope: 'default',
    })).filter(e => e.label);
    await queryInterface.bulkInsert('clusters', clusterRecords);
    const [createdClusters] = await queryInterface.sequelize.query('select id, label from clusters');

    const [users] = await queryInterface.sequelize.query('select id, cluster_label from users ');
    console.log('idemooo', users.length)
    const relations = users.map((u) => {
      const cluster = createdClusters.find((c) => {
        return c.label == u.cluster_label
      });
      if (!cluster) {
        return null
      }

      return {
        user_id: u.id,
        cluster_id: cluster.id,
        is_valid: true,
      };
    }).filter(e => e);
    console.log(relations?.length)

    return queryInterface.bulkInsert('cluster_users', relations);
  },
};