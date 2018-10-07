import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import EventPlannerSider from './components/EventPlannerSider/EventPlannerSider';
import EventPlannerAccount from './components/EventPlannerAccount/EventPlannerAccount';
import './EventPlanner.css';
import { EventPlannerTabContentStyled } from './EventPlanner.styled';
import EventPlannerOrder from './components/EventPlannerOrder/EventPlannerOrder';
import EventPlannerAddress from './components/EventPlannerAddress/EventPlannerAddress';
import EventPlannerPayment from './components/EventPlannerPayment/EventPlannerPayment';
import EventPlannerBookmark from './components/EventPlannerBookmark/EventPlannerBookmark';
import EventPlannerEvent from './components/EventPlannerEvent/EventPlannerEvent';
import EventPlanningFlow from './components/EventPlanningFlow/EventPlanningFlow';

const EventPlannerProfile = () => (
  <Fragment>
    <EventPlannerSider />
    <EventPlannerTabContentStyled>
      <Switch>
        <Route path="/profile/event-planner/account" component={EventPlannerAccount} />
        <Route path="/profile/event-planner/event" component={EventPlannerEvent} />
        <Route path="/profile/event-planner/order" component={EventPlannerOrder} />
        <Route path="/profile/event-planner/address" component={EventPlannerAddress} />
        <Route path="/profile/event-planner/payment" component={EventPlannerPayment} />
        <Route path="/profile/event-planner/bookmark" component={EventPlannerBookmark} />
      </Switch>
    </EventPlannerTabContentStyled>
  </Fragment>
);

const EventPlanner = () => (
  <Layout className="opfc-event-planner">
    <Switch>
      <Route path="/profile/event-planner/event/:id" component={EventPlanningFlow} />
      <Route path="/profile/event-planner" component={EventPlannerProfile} />
    </Switch>
  </Layout>
);

export default EventPlanner;
