
import React from 'react';
import { observer, Provider as MobxProvider } from 'mobx-react';
import {
  BrowserRouter,
  Link
} from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';


const { Header, Content, Footer } = Layout;

import stores, { useStores } from './stores';
import Routes from './routes';

const ReactiveMenu = observer(() => {
  const { authStatus } = useStores();

  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1">
        <Link to="/">
          Home
        </Link>
      </Menu.Item>
      {authStatus.recentlyRegistered && (
        <Menu.Item key="2">
          <Link to="/affinities">
            Affinities
          </Link>
        </Menu.Item>
      )}
      {!authStatus.isAuthenticated && (
        <>
          <Menu.Item key="3">
            <Link to="/login">
              Login
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/Register">
              Register
            </Link>
            </Menu.Item>
        </>
      )}
      {authStatus.isAuthenticated && (
        <Menu.Item key="5" onClick={() => authStatus.invalidate()}>
            Log out
        </Menu.Item>
      )}
    </Menu>
  );
});

const App = () => {
  return (
    <MobxProvider {...stores}>
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <ReactiveMenu />
          </Header>
          <Content className="site-layout" style={{ margin: 64 }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
              <Routes />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Find Your Book @2021 Created by Neca &amp; Aca</Footer>
        </Layout>,
      </BrowserRouter>
    </MobxProvider>
  );
}

export default App;
