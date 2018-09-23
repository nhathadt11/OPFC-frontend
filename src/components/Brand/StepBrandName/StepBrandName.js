import React from 'react';
import { func } from 'prop-types';
import {
  Input, Button, Icon, Form,
} from 'antd';
import './StepBrandName.css';

const StepBrandName = ({ next }) => (
  <Form layout="inline" className="opfc-step-brand-name">
    <Input name="brandName" size="large" title="Brand Name" placeholder="Enter a Brand Name" />
    <Button type="primary" size="large" onClick={next}>
      <Icon type="right-circle" theme="outlined" style={{ fontSize: 24 }} />
    </Button>
  </Form>
);

StepBrandName.propTypes = {
  next: func.isRequired,
};

export default StepBrandName;
