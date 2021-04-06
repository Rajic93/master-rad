
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Link, useHistory } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  InputNumber,
} from 'antd';
import RegisterForm from '../../stores/Auth/Register';
import { useStores } from '../../stores';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Test = observer(() => {
  const [form] = useState(new RegisterForm());
  const history = useHistory();
  const { authStatus } = useStores();

  const onFinish = (values: any) => form.submit().then(() => {
    authStatus.setRecentlyRegistered(true);
    history.push('/login');
  });

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
      {...formItemLayout}
      // form={form}
      name="register"
      // onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input value={form.email} onChange={({ target: { value } }) => onChangeHandler('email', value)} />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password value={form.password} onChange={({ target: { value } }) => onChangeHandler('password', value)}   />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password value={form.confirmPassword} onChange={({ target: { value } }) => onChangeHandler('confirmPassword', value)}    />
      </Form.Item>

      <Form.Item
        name="age"
        label="Age"
        tooltip="How young are you?"
        rules={[{ required: true, message: 'Please input age!'}]}
      >
        <InputNumber min={10} max={75} value={form.age} onChange={(value) => onChangeHandler('age', value)}    />
      </Form.Item>

      <Form.Item
        name="city"
        label="City"
        tooltip="What city is your home?"
        rules={[{ required: true, message: 'Please input city!', whitespace: true }]}
      >
        <Input value={form.city} onChange={({ target: { value } }) => onChangeHandler('city', value)}    />
      </Form.Item>


      <Form.Item
        name="country"
        label="Country"
        tooltip="What country is your home?"
        rules={[{ required: true, message: 'Please input country!', whitespace: true }]}
      >
        <Input  value={form.country} onChange={({ target: { value } }) => onChangeHandler('country', value)}   />
      </Form.Item>


      <Form.Item
        name="street"
        label="Street"
        tooltip="What street is your home?"
      >
        <Input value={form.street} onChange={({ target: { value } }) => onChangeHandler('street', value)}    />
      </Form.Item>


      <Form.Item
        name="state"
        label="State"
        tooltip="What state is your home?"
      >
        <Input  value={form.state} onChange={({ target: { value } }) => onChangeHandler('state', value)}   />
      </Form.Item>


      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I accept the rules!
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" onClick={onFinish}>
          Register
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
