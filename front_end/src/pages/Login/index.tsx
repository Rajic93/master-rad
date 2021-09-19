
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Link, useHistory } from 'react-router-dom';
import { useStores } from '../../stores';
import { Card, Row, Col, Input, Form , Checkbox, Button } from 'antd';
import LoginForm from '../../stores/Auth/Login';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Test = observer(() => {
  const {
    authStatus,
    userInfo,
  } = useStores();
  const [form] = useState(new LoginForm());

  const history = useHistory();

  const onFinish = (values: any) => {
    form.submit().then(({ token, role, id }) => {
      authStatus.authenticate({
        token,
        role: role || 'regular',
        id,
      });
      authStatus.recentlyRegistered
       ? history.push('/affinities')
       : history.push('/');
    });
    // userInfo.update({
    //   accessGroup: 'regular',
    //   status: 1,
    //   accessLevel: 2,
    // });
    // history.goBack();
  }

  const onChangeHandler = (field, value) => form.setField(field, value)
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
          <Form
            {...layout}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input value={form.email} onChange={({ target: { value } }) => onChangeHandler('email', value)}  />
            </Form.Item>
      
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password value={form.password} onChange={({ target: { value } }) => onChangeHandler('password', value)}  />
            </Form.Item>
      
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={onFinish}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
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
