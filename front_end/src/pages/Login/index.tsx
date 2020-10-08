
import React from 'react';
import { observer } from 'mobx-react';
import { Link, useHistory } from 'react-router-dom';
import { useStores } from '../../stores';
import { Card, Row, Col } from 'antd';


const Test = observer(() => {
  const {
    authStatus,
    userInfo,
  } = useStores();

  const history = useHistory();

  return (
    <Row>
      <Col
        xs={{ span: 24 }}
        md={{
          span: 20,
          offset: 2,
        }}
        lg={{
          span: 12,
          offset: 6,
        }}
      >
        <Card>
          <button
            onClick={() => {
              authStatus.authenticate({
                token: 'some_token_provided_by_backend',
                role: 'regular',
              });
              userInfo.update({
                accessGroup: 'regular',
                status: 1,
                accessLevel: 2,
              });
              history.goBack();
            }}
          >
            login
          </button>
        </Card>
      </Col>
    </Row>
  );

  return (
    <React.Fragment>
      <h1>LOGIN</h1>
      <Link
        to='/'
      >
        <span>landing</span>
      </Link>
      <br/>
    </React.Fragment>
  );
});

export default Test;
