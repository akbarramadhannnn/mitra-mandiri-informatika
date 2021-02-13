import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';
import { Container, Col } from 'react-bootstrap';

const App = () => {
  return (
    <Container>
      <Col className="mt-sm-4">
        <Col className="text-center mb-sm-4">
          <h1>Master Karyawan</h1>
        </Col>
        <Switch>
          {routes.map((route, i) => (
            <Route
              key={i}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </Col>
    </Container>
  );
};

export default App;
