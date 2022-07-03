import { Outlet, history, useLocation } from 'umi';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import React, { useState } from 'react';

import './index.less';

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuProps['items'] = [
  getItem('百度百科', '/'),

  getItem('十足', '/function'),

  getItem('Navigation Two', '/w', <AppstoreOutlined />, [
    getItem('Option 5', '/docs'),
    getItem('Option 6', '/jsis'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuClick = ({ item, key, keyPath, domEvent }) => {
    history.push(key)
    console.log(item, key, keyPath, domEvent)
  }

  const location = useLocation()
  const pathname = location.pathname

  return (
    <Layout className="app-root">
      <Sider trigger={null} width={320} collapsible collapsed={collapsed}>
        <div className="sidebar-logo">
          <a href="https://ng.ant.design/" target="_blank">
            <img src="https://ng.ant.design/assets/img/logo.svg" alt="logo" />
            <h1>Ant Design Of Angular</h1>
          </a>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          onSelect={menuClick}
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background site-layout-header">
          <span className="header-trigger">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '8px',
            padding: '12px 24px',
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
