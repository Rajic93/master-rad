
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Link, useHistory } from 'react-router-dom';
import AffinitiesStore from '../../stores/Artefacts/Affinities';
import { Card, Row, Col, Input, Form , Rate, Button, Typography } from 'antd';
import { useStores } from '../../stores';

const { Title } = Typography;


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Affinities = observer(() => {
  const [affinities] = useState(new AffinitiesStore());

  const history = useHistory();
  const { authStatus } = useStores();

  useEffect(() => { affinities.load() }, []);


  const onSubmitHandler = () => affinities.submit().then(() => {
    authStatus.setRecentlyRegistered(false);
    history.push('/home');
  });


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
            <Form.Item>
              <Title level={3}>Please provide us with some feedback!</Title>
            </Form.Item>
            {affinities.list.map((item) => (
              <Form.Item
                key={item.id}
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <span className="ant-rate-text">{item.title}</span>
                <Rate
                  allowClear={false}
                  count={10}
                  value={affinities.ratings[item.id]}
                  onChange={(rating) => affinities.setRating(item.id, rating)}
                />
              </Form.Item>
            ))}
                   
            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={onSubmitHandler}
                // disabled={!affinities.isAllSelected}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
});

export default Affinities;


