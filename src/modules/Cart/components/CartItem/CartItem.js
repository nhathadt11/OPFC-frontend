import React, { Component } from 'react';
import {
  Row, Col, Button, Icon, Input, Modal, Tooltip,
} from 'antd';
import { shape, arrayOf, func } from 'prop-types';
import { map } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './CartItem.css';
import LocalIcon from '../../../../fonts/LocalFont';
import {
  MenuNameStyled, ByBrandNameStyled, ViewMealsInThisMenu,
  MenuPriceStyled, ShippingFeeStyled, SubTotalStyled, NoteWrapperStyled,
  EditingActionsStyled,
  MealListStyled,
} from './CartItem.styled';
import { deselectMenu } from '../../../EventPlanner/actions/planningFlow';

// const { RangePicker } = DatePicker;
const { TextArea } = Input;

const confirmRemove = (onOk) => {
  const modal = Modal.confirm({
    title: 'Remove Menu',
    content: 'Are you sure to remove this Menu?',
    okText: 'Remove',
    cancelText: 'Cancel',
    okType: 'danger',
    maskClosable: true,
    onOk: () => { onOk(); modal.destroy(); },
  });
};

const MealList = ({ meals }) => (
  <MealListStyled>
    { map(meals, m => <li>{m.mealName}</li>) }
  </MealListStyled>
);

MealList.propTypes = {
  meals: arrayOf(shape({})).isRequired,
};

class CartItem extends Component {
  static propTypes = {
    menu: shape({}).isRequired,
    deselectMenuAction: func.isRequired,
  }

  state = {
    editing: false,
  }

  enableEditing = () => this.setState({ editing: true })

  disableEditing = () => this.setState({ editing: false })

  render() {
    const { menu, deselectMenuAction } = this.props;
    const { editing } = this.state;

    return (
      <Row type="flex" gutter={24} className="opfc-cart-item">
        <Col>
          <img src="https://66.media.tumblr.com/a2f0c1471f30dd3e89325ee9f6b86bc8/tumblr_pflxnarapM1sxuwguo1_640.jpg" alt="Menu" width={120} />
        </Col>
        <Col span={4}>
          <div>
            <MenuNameStyled>{menu.menuName}</MenuNameStyled>
            <ByBrandNameStyled>by {menu.brandName || 'N/A'}</ByBrandNameStyled>
            <section>
              <span><LocalIcon type="icon-dish" /> x {menu.mealList ? menu.mealList.length : 0}</span>
            </section>
            <section>
              <span><Icon type="team" /> x {menu.servingNumber || 0}</span>
            </section>
            <Tooltip title={<MealList meals={menu.mealList} />} placement="right" overlayClassName="opfc-meal-list-view">
              <ViewMealsInThisMenu>View meals</ViewMealsInThisMenu>
            </Tooltip>
          </div>
        </Col>
        <Col span={10} className="opfc-cart-item-service-info">
          {/* <ServiceTimeStyled>Service time</ServiceTimeStyled>
          {
            editing ? (
              <RangePicker
                style={{ width: 'auto' }}
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                placeholder={['Start Time', 'End Time']}
              />
            ) : (<div>Sep 12, 12:00 PM - 13:00 PM</div>)
          } */}
          <NoteWrapperStyled>
            {
              editing ? (
                <TextArea
                  placeholder="Extra note"
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer eget ante id urna blandit venenatis in vitae enim."
                />
              ) : (
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer eget ante id urna blandit venenatis in vitae enim.
                </p>
              )
            }
          </NoteWrapperStyled>
        </Col>
        <Col span={4} className="opfc-cart-item-price-group">
          <Row>
            <Col span={12} className="opfc-menu-price">Price:</Col>
            <Col className="opfc-cart-item-align-right"><MenuPriceStyled>$ {menu.price}</MenuPriceStyled></Col>
          </Row>
          <Row>
            <Col span={12} className="opfc-menu-shipping-fee">Other fee:</Col>
            <Col className="opfc-cart-item-align-right"><ShippingFeeStyled>$ {menu.shippingFee || 0}</ShippingFeeStyled></Col>
          </Row>
          <Row>
            <Col span={12} className="opfc-menu-sub-total">Sub Total:</Col>
            <Col className="opfc-cart-item-align-right"><SubTotalStyled>$ {(menu.price || 0) + (menu.shippingFee || 0) }</SubTotalStyled></Col>
          </Row>
        </Col>
        <Col span={4} className="opfc-cart-item-actions">
          {
            editing ? (
              <EditingActionsStyled>
                <Button shape="circle" type="primary" onClick={this.disableEditing}>
                  <Icon type="check" theme="outlined" />
                </Button>
                <Button shape="circle" onClick={this.disableEditing}>
                  <Icon type="close" theme="outlined" />
                </Button>
              </EditingActionsStyled>
            ) : (
              <Button shape="circle" onClick={this.enableEditing}>
                <Icon type="edit" theme="outlined" />
              </Button>
            )
          }
          <Button shape="circle" type="danger" onClick={() => confirmRemove(() => deselectMenuAction(menu.id))}>
            <Icon type="delete" theme="outlined" />
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = {
  deselectMenuAction: deselectMenu,
};

export default compose(
  connect(undefined, mapDispatchToProps),
)(CartItem);
