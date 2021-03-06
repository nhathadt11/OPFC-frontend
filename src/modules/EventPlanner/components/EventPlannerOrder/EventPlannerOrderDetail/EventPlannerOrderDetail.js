import React, { Component } from 'react';
import {
  Row, List, Col, Spin, Modal,
} from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  shape, func, number, string, oneOfType, bool,
} from 'prop-types';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { groupBy, map, reduce } from 'lodash';
import './EventPlannerOrderDetail.css';
import {
  OrderDetailEventNameStyled, OrderDetailDateStyled,
  OrderDetailStatusOverallWrapperStyled,
  EventStartTimeStyled, ByBrandNameStyled, OrderItemSubTotalLabel,
  RatedStyled, BrandOrderStatusStyled,
} from './EventPlannerOrderDetail.styled';
import { fetchEventPlannerOrderDetailRequest } from '../../../actions/order';
import EventPlannerOrderDetailLine from './EventPlannerOrderDetailLine';
import { markAsCompletedRequest, markAsIncompletedRequest } from '../../../../BrandProfile/actions/order';
import { ORDER_STATUS } from '../../../../../constants/AppConstants';
import { showRatingModal } from '../../../actions/planningFlow';

class EventPlannerOrderDetail extends Component {
  static propTypes = {
    orderDetail: shape({}).isRequired,
    fetchEventPlannerOrderDetailRequestAction: func.isRequired,
    markAsCompletedRequestAction: func.isRequired,
    markAsIncompletedRequestAction: func.isRequired,
    match: shape({
      params: shape({
        id: oneOfType([string, number]),
      }),
    }).isRequired,
    fetching: bool,
    showRatingModalAction: func.isRequired,
  }

  static defaultProps = {
    fetching: false,
  }

  componentDidMount() {
    const {
      fetchEventPlannerOrderDetailRequestAction,
      match: { params: { id } },
    } = this.props;

    fetchEventPlannerOrderDetailRequestAction(id);
  }

  confirmMarkAsCompleted = (orderLineId) => {
    const { markAsCompletedRequestAction } = this.props;

    const modal = Modal.confirm({
      title: 'Mark as Complete',
      content: 'Are you sure to mark this order as completed?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => { markAsCompletedRequestAction(orderLineId); modal.destroy(); },
      maskClosable: true,
    });
  }

  confirmMarkAsIncompleted = (orderLineId) => {
    const { markAsIncompletedRequestAction } = this.props;

    const modal = Modal.confirm({
      title: 'Mark as Complete',
      content: 'Are you sure to mark this order as incompleted?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => { markAsIncompletedRequestAction(orderLineId); modal.destroy(); },
      maskClosable: true,
    });
  }

  render() {
    const {
      orderDetail, fetching, showRatingModalAction,
    } = this.props;
    const orderLineListByBrandName = groupBy(orderDetail.orderLineList, ol => ol.brandName);

    return (
      <div className="opfc-order-detail-container">
        <Spin spinning={fetching}>
          <Row>
            <OrderDetailEventNameStyled>#{orderDetail.orderNo}</OrderDetailEventNameStyled>
            <OrderDetailEventNameStyled>
              {orderDetail.eventName}
              <EventStartTimeStyled>Starts at {moment.utc(orderDetail.startAt).format('HH:mm A YYYY, MMM DD')}</EventStartTimeStyled>
              <OrderDetailStatusOverallWrapperStyled>
                {/* <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> */}
                {/* <OrderDetailStatusOverallStyled success>{orderDetail.orderStatus || 'N/A'}</OrderDetailStatusOverallStyled> */}
                {/* <OverallStyled>Overall</OverallStyled> */}
              </OrderDetailStatusOverallWrapperStyled>
            </OrderDetailEventNameStyled>
            <OrderDetailDateStyled>Ordered on {moment.utc(orderDetail.orderAt).format('YYYY, MMM DDD')}</OrderDetailDateStyled>
          </Row>
          <Row>
            {
              map(orderLineListByBrandName, (ol, brandName) => (
                <List
                  key={brandName}
                  dataSource={ol}
                  renderItem={item => (
                    <List.Item>
                      <EventPlannerOrderDetailLine data={item} />
                    </List.Item>
                  )}
                  header={(
                    <ByBrandNameStyled>
                      {brandName}
                      <BrandOrderStatusStyled
                        requesting={ol[0].statusId === ORDER_STATUS.REQUESTING}
                        completed={ol[0].statusId === ORDER_STATUS.COMPLETED}
                        incompleted={ol[0].statusId === ORDER_STATUS.INCOMPLETED}
                        canceled={ol[0].statusId === ORDER_STATUS.CANCELED}
                        approved={ol[0].statusId === ORDER_STATUS.APPROVED}
                      >
                        {ORDER_STATUS.COMPLETED === ol[0].statusId && !ol[0].didRate && (
                          <a
                            href="javascript:;"
                            role="button"
                            style={{ fontSize: '13px', textDecoration: 'underline' }}
                            onClick={() => showRatingModalAction(
                              ol[0].brandOrderLineId,
                              brandName,
                              orderDetail.eventName,
                              orderDetail.eventDate,
                            )}
                          >
                            Rate for brand
                          </a>
                        ) }
                        {
                          ol[0].didRate && <RatedStyled>Rated</RatedStyled>
                        }
                        {
                          ORDER_STATUS.APPROVED === ol[0].statusId && (
                            <span>
                              <a
                                href="javascript:;"
                                role="button"
                                style={{ fontSize: '13px', textDecoration: 'underline' }}
                                onClick={() => this.confirmMarkAsCompleted(ol[0].brandOrderLineId)}
                              >
                                Mark as Completed
                              </a> <a href="javascript:;">/</a> {' '}
                              <a
                                href="javascript:;"
                                role="button"
                                style={{ fontSize: '13px', textDecoration: 'underline' }}
                                onClick={() => this.confirmMarkAsIncompleted(ol[0].brandOrderLineId)}
                              >
                                Incompleted
                              </a>
                            </span>)
                        }
                        <span>{ol[0].statusName}</span>
                      </BrandOrderStatusStyled>
                    </ByBrandNameStyled>)}
                  bordered={false}
                  footer={(
                    <OrderDetailSubTotal
                      totalPrice={reduce(ol, (acc, cur) => acc + cur.price, 0)}
                    />)
                  }
                />
              ))
            }
          </Row>
          <Row type="flex" className="opfc-order-detail-total">
            <Col className="opfc-order-detail-total-overall">
              <OrderItemSubTotalLabel>Total:</OrderItemSubTotalLabel>
              <span>${orderDetail.totalPrice}</span>
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
}

const OrderDetailSubTotal = ({ totalPrice }) => (
  <List.Item>
    <Row type="flex" className="opfc-order-detail-subtotal">
      <Col className="opfc-order-detail-subtotal-inner">
        <OrderItemSubTotalLabel>Sub Total:</OrderItemSubTotalLabel>
        <span>${totalPrice}</span>
      </Col>
    </Row>
  </List.Item>
);

OrderDetailSubTotal.propTypes = {
  totalPrice: number,
};

OrderDetailSubTotal.defaultProps = {
  totalPrice: 0,
};

const mapStateToProps = state => ({
  orderDetail: state.eventPlannerReducer.order.orderDetail,
  fetching: state.eventPlannerReducer.order.fetchingOrderDetail,
});

const mapDispatchToProps = {
  fetchEventPlannerOrderDetailRequestAction: fetchEventPlannerOrderDetailRequest,
  markAsCompletedRequestAction: markAsCompletedRequest,
  markAsIncompletedRequestAction: markAsIncompletedRequest,
  showRatingModalAction: showRatingModal,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(EventPlannerOrderDetail);
