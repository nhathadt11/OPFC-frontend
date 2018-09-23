import React, { Component } from 'react';
import {
  Steps, Button, Row, Col,
} from 'antd';
import './CreateBrand.css';
import StepBrandName from './StepBrandName/StepBrandName';
import StepBrandInformation from './StepBrandInformation/StepBrandInformation';

const { Step } = Steps;

class CreateBrand extends Component {
  state = {
    current: 0,
  }

  steps = [{
    title: 'Brand Name',
    content: <StepBrandName next={() => this.next()} />,
  }, {
    title: 'Information',
    content: <StepBrandInformation />,
  }, {
    title: 'Account',
    content: 'Last-content',
  }];

  next() {
    this.setState(({ current }) => ({ current: current + 1 }));
  }

  prev() {
    this.setState(({ current }) => ({ current: current - 1 }));
  }

  render() {
    const { current } = this.state;

    return (
      <Row type="flex" className="opfc-create-brand-container">
        <Col style={{ padding: 100 }}>
          <Steps current={current} direction="vertical">
            {this.steps.map(item => <Step key={item.title} title={item.title} />)}
          </Steps>
        </Col>
        <Col className="opfc-step-content">
          {this.steps[current].content}
          <div className="steps-action">
            {
              (current < this.steps.length - 1) && (current !== 0)
              && <Button type="primary" size="large" onClick={() => this.next()}>Next</Button>
            }
            {
              current === this.steps.length - 1
              && <Button type="primary" size="large">Done</Button>
            }
            {
              current > 0
              && (
              <Button style={{ marginLeft: 8 }} size="large" onClick={() => this.prev()}>
                Previous
              </Button>
              )
            }
          </div>
        </Col>
      </Row>
    );
  }
}

export default CreateBrand;
