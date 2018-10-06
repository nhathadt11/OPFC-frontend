import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { shape, func, bool } from 'prop-types';
import { hideCreateMealModal } from '../../actions/modals';
import { createMealRequest } from '../../actions/meal';

class CreateMealModal extends Component {
  static propTypes = {
    form: shape({
      getFieldDecorator: func.isRequired,
      validateFieldsAndScroll: func.isRequired,
    }).isRequired,
    hideCreateMealModalAction: func.isRequired,
    visible: bool.isRequired,
    createMealRequestAction: func.isRequired,
  }

  handleCancel = () => {
    const { hideCreateMealModalAction } = this.props;
    hideCreateMealModalAction();
  }

  handleSubmit = () => {
    const { form: { validateFieldsAndScroll }, createMealRequestAction } = this.props;

    validateFieldsAndScroll((err, values) => {
      if (!err) createMealRequestAction(values);
    });
  }

  render() {
    const { form: { getFieldDecorator }, visible } = this.props;

    return (
      <Modal
        title="Create new Meal"
        visible={visible}
        onCancel={this.handleCancel}
        onOk={this.handleSubmit}
      >
        <Form>
          <Form.Item label="Name">
            {
              getFieldDecorator('mealName', {
                required: true, message: 'Meal name is required!',
              })(
                <Input />,
              )
            }
          </Form.Item>
          <Form.Item label="Description">
            {
              getFieldDecorator('description')(
                <Input.TextArea name="description" />,
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  visible: state.brandProfileReducer.modal.mealModalVisible,
});

const mapDispatchToProps = {
  hideCreateMealModalAction: hideCreateMealModal,
  createMealRequestAction: createMealRequest,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  Form.create(),
)(CreateMealModal);
