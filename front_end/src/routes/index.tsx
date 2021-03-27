
import React from 'react';
import { observer } from 'mobx-react';
import { Switch, Route } from 'react-router';

import pages from './pagesMappings';
import { useStores } from '../stores';

const Routes = observer(() => {
  const {
    router
  } = useStores();

  console.log({ allowedRoutes: router.allowedRoutes })

  return (
    <React.Suspense fallback={() => 'Loading'}>
      <Switch>
        {router.allowedRoutes.map(({
          key,
          url,
          component
        }) => pages[key] && (
            <Route
              exact
              path={url}
              component={pages[key]}
              key={key}
            />
        ))}
      </Switch>
    </React.Suspense>
  )
});

export default Routes;
