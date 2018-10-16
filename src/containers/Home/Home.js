import React, { Component } from 'react';
import { Layout } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { shape, arrayOf, func } from 'prop-types';
import MenuCardGrid from '../MenuCardGrid/MenuCardGrid';
import MenuFilterSider from '../../components/MenuFilterSider/MenuFilterSider';
import { fetchMenuManyRequest } from '../../modules/General/actions/general';

const { Sider, Content } = Layout;

class Home extends Component {
  static propTypes = {
    menuList: arrayOf(shape({})).isRequired,
    fetchMenuManyRequestAction: func.isRequired,
  }

  componentDidMount() {
    const { fetchMenuManyRequestAction } = this.props;
    fetchMenuManyRequestAction();
  }

  render() {
    const { menuList } = this.props;

    return (
      <Layout>
        <Sider theme="light" width={280}>
          <MenuFilterSider />
        </Sider>
        <Content className="opfc-main-content">
          <MenuCardGrid dataList={menuList} />
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  menuList: state.generalReducer.menuList,
});

const mapDispatchToProps = {
  fetchMenuManyRequestAction: fetchMenuManyRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
