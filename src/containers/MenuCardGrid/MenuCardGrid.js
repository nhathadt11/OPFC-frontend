import React from 'react';
import { map } from 'lodash';
import { Row, Col } from 'antd';
import { arrayOf, shape } from 'prop-types';
import MenuCard from '../../components/MenuCard/MenuCard';
import './MenuCardGrid.css';

const MenuCardGrid = ({ dataList }) => (
  <Row type="flex" gutter={24} className="opfc-menu-card-grid">
    {
      map(dataList, (item, index) => <Col key={index} style={{ margin: '12px 0' }}><MenuCard menu={item} /></Col>)
    }
  </Row>
);

MenuCardGrid.propTypes = {
  dataList: arrayOf(shape({})).isRequired,
};

export default MenuCardGrid;
