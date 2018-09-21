import React from 'react';
import { Layout, Button } from 'antd';
import Search from 'antd/lib/input/Search';
import './Header.css';
import { UserIconGroupStyled } from './Header.styled';

const Header = () => (
  <Layout.Header className="header">
    <img src="https://via.placeholder.com/150x58" alt="Logo" />

    <Search
      placeholder="Menus"
      size="large"
      className="header-search"
      enterButton
    />

    <UserIconGroupStyled>
      <Button icon="notification" size="large" shape="circle" className="header-icon" />
      <Button icon="heart" size="large" shape="circle" className="header-icon" />
      <Button icon="meh" size="large" shape="circle" className="header-icon" />
      <Button type="primary" size="large">Create a Profile</Button>
    </UserIconGroupStyled>
  </Layout.Header>
);

export default Header;
