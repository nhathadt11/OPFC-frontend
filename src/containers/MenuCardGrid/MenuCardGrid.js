import React from 'react';
import { map, isEmpty } from 'lodash';
import { Row, Col, Spin } from 'antd';
import { arrayOf, shape, bool } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import MenuCard from '../../components/MenuCard/MenuCard';
import './MenuCardGrid.css';
import LocalIcon from '../../fonts/LocalFont';

const NoMenuFound = (
  <div className="opfc-no-menu-found">
    <LocalIcon type="icon-menu" />
    <section>Sorry! No menu found.</section>
  </div>
);

const MenuCardGrid = ({ dataList, fetching, forceFetching }) => (
  <Spin spinning={forceFetching || fetching}>
    <Row type="flex" gutter={24} className="opfc-menu-card-grid">
      {
        map(dataList, (item, index) => <Col key={index} style={{ margin: '12px 0' }}><MenuCard menu={item} /></Col>)
      }
      {
        !fetching && !forceFetching && isEmpty(dataList) && NoMenuFound
      }
    </Row>
  </Spin>
);

MenuCardGrid.propTypes = {
  dataList: arrayOf(shape({})).isRequired,
  fetching: bool,
  forceFetching: bool,
};

MenuCardGrid.defaultProps = {
  fetching: false,
  forceFetching: false,
};

const mapStateToProps = state => ({
  fetching: state.generalReducer.fetching,
});

export default compose(
  connect(mapStateToProps),
)(MenuCardGrid);
