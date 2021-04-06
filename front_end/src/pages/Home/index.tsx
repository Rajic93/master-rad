
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Card, Row, Rate, Pagination, Typography, Tabs } from 'antd';
import { CheckOutlined, CloseOutlined, StarOutlined } from '@ant-design/icons';
import Books from '../../stores/Artefacts/Books';
import { useStores } from '../../stores';

const { Meta } = Card;

const { TabPane } = Tabs;

const Book = ({ book, onRate }) => {
  const [rated, setRated] = useState(0);
  const [rating, setRating] = useState(0);

  const Description = () => (
    <>
      <Typography.Text>{book.authors}</Typography.Text>
    </>
  )

  return (
    <Card
      style={{ width: 300, margin: 10 }}
      cover={
        <img
          alt={book.title}
          src={book.image_url_l}
          style={{ width: 300, height: 400, objectFit: 'cover' }}
        />
      }
      actions={[
        <>
          {rated === 0 && (
            <Row align="middle" justify="center" onClick={() => setRated(1)}>
              <StarOutlined style={{ fontSize: 24, marginRight: 5 }}/>
              <Typography.Text>{rating || book.average_rating}</Typography.Text>
            </Row>
          )}
          {rated === 1  && <Rate count={10} key="rate" value={rating} onChange={(rating) => {
                  setRating(rating);
                  setRated(2)
          }}
             />}
          {rated === 2  && (
            <Row justify="center">
              <CheckOutlined key="confirm" style={{ fontSize: 24, cursor: 'pointer', color: 'green' }}
                onClick={() => {
                  setRated(0);
                  setRating(rating);
                  typeof onRate === 'function' && onRate(book.id, rating);
                }}/>
              <CloseOutlined key="reject" style={{ fontSize: 24, cursor: 'pointer', color: 'red' }} onClick={() => setRated(0)}/>
            </Row>
          )}
        </>
      ]}
    >
      <Meta
        title={book.title}
        description={<Description />}
      />
    </Card>
  )
}

const Test = observer(() => {
  const [books] = useState(new Books())
  const [hoodLimit, setHLimit] = useState(10);
  const [hoodOffset, setHOffset] = useState(0);
  const [userLimit, setULimit] = useState(10);
  const [userOffset, setUOffset] = useState(0);
  const { authStatus } = useStores();

  useEffect(() => { books.load({ userLimit, userOffset, hoodOffset, hoodLimit }); }, [hoodLimit, hoodOffset, userLimit, userOffset]);

  return (
    <React.Fragment>
      <Tabs defaultActiveKey="1">
        {authStatus.isAuthenticated && (
          <TabPane tab="Your likeables" key="1">
            <Row justify="center">
              {books.yourList.map((book) => <Book book={book} onRate={(id, rating) => books.rate(id, rating)} />)}
            </Row>
            {books.yourList && books.yourList.length > 0 && (
              <Pagination
                defaultCurrent={Math.floor(books.yourCount / (userOffset * userLimit))} 
                total={books.yourCount}
                onShowSizeChange={(current,size) => {
                  console.log({ size, current })
                  setULimit(size)}
                }
                showSizeChanger
                onChange={(page) => setUOffset(page)}
              />
            )}
          </TabPane>
        )}
        <TabPane tab="From your hood" key="2">
          <Row justify="center">
            {books.hoodList.map((book) => <Book book={book} onRate={(id, rating) => books.rate(id, rating)} />)}
          </Row>
            {books.hoodList && books.hoodList.length > 0 && (
            <Pagination
              defaultCurrent={Math.floor(books.hoodCount / (hoodOffset * hoodLimit))} 
              total={books.hoodCount}
              onShowSizeChange={(current,size) => {
                console.log({ size, current })
                setHLimit(size)}
              }
              showSizeChanger
              onChange={(page) => setHOffset(page)}
            />
          )}
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
});

export default Test;
