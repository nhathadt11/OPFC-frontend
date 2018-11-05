import React, { Component } from 'react';
import {
  Form, Input, Rate, Button,
} from 'antd';
import { compose } from 'redux';
import { shape, func, number } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './ReviewForm.css';
import { createMenuRatingRequest } from '../../../modules/Rating/actions/rating';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

class ReviewForm extends Component {
  static propTypes = {
    form: shape({
      getFieldDecorator: func.isRequired,
      validateFieldsAndScroll: func.isRequired,
      resetFields: func.isRequired,
    }).isRequired,
    createMenuRatingRequestAction: func.isRequired,
    match: shape({
      params: shape({
        id: number,
      }),
    }).isRequired,
  }

  state = {

  }

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      form: { validateFieldsAndScroll, resetFields },
      createMenuRatingRequestAction,
      match: { params: { id } },
    } = this.props;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        createMenuRatingRequestAction(values, id, () => resetFields());
      }
    });
  }

  render() {
    const { form: { getFieldDecorator } } = this.props;

    return (
      <Form layout="horizontal" className="opfc-review-form" onSubmit={this.handleSubmit}>
        <Form.Item label="Title" {...formItemLayout}>
          {
            getFieldDecorator('title', {
              rules: [{ required: true, message: 'Title is required!' }],
            })(
              <Input />,
            )
          }
        </Form.Item>
        <Form.Item label="Rating" {...formItemLayout}>
          {
            getFieldDecorator('rate', {
              rules: [{ required: true, message: 'Rating is required!' }],
            })(
              <Rate allowHalf />,
            )
          }
        </Form.Item>
        <Form.Item label="Comment" {...formItemLayout}>
          {
            getFieldDecorator('comment', {
              rules: [{ required: true, message: 'Comment is required!' }],
            })(
              <Input.TextArea />,
            )
          }
        </Form.Item>
        <Form.Item label=" " {...formItemLayout} className="opfc-post-comment">
          <Button htmlType="submit" type="primary">Post Comment</Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapDispatchToProps = {
  createMenuRatingRequestAction: createMenuRatingRequest,
};

export default compose(
  Form.create(),
  withRouter,
  connect(undefined, mapDispatchToProps),
)(ReviewForm);
