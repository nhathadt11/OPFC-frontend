import React from 'react';

import 'antd/dist/antd.css';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Header from '../components/Header/Header';
import BreadCrumb from '../components/BreadCrumb/BreadCrumb';
import EventType from '../components/MenuFilterSider/EventType/EventType';
import BudgetRange from '../components/MenuFilterSider/BudgetRange/BudgetRange';
import MenuCard from '../components/MenuCard/MenuCard';
import MenuCardGrid from '../containers/MenuCardGrid/MenuCardGrid';
import CreateBrand from '../components/Brand/CreateBrand';
import CreateProfileButton from '../components/Brand/CreateProfileButton/CreateProfileButton';
import BrandProfileHeader from '../modules/BrandProfile/components/BrandProfileHeader/BrandProfileHeader';
import BrandProfileContent from '../modules/BrandProfile/components/BrandProfileContent/BrandProfileContent';
import MenuDetail from '../components/MenuDetail/MenuDetail';
import ReviewList from '../components/ReviewList/ReviewList';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('Layout', module)
  .add('Header', () => <Header />);

storiesOf('Component', module)
  .add('BreadCrumb', () => <BreadCrumb />);

storiesOf('MenuFilterSider', module)
  .add('EventType', () => <EventType />)
  .add('BudgetRange', () => <BudgetRange />);

storiesOf('Card', module)
  .add('Menu card', () => <MenuCard />)
  .add('Menu card with loading', () => <MenuCard loading />);

storiesOf('Menu Grid', module)
  .add('Menu Grid', () => <MenuCardGrid />)
  .add('Menu Detail', () => <MenuDetail />);

storiesOf('Brand', module)
  .add('Create Brand', () => <CreateBrand />)
  .add('Create Brand with modal', () => <CreateProfileButton />);

storiesOf('Brand Profile', module)
  .add('Header', () => <BrandProfileHeader />)
  .add('Content', () => <BrandProfileContent />)
  .add('ChatList', () => <ReviewList />);
