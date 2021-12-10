
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Card, Row, Rate, Pagination, Typography, Tabs, Spin, Input, Popover } from 'antd';
import { CheckOutlined, CloseOutlined, StarOutlined } from '@ant-design/icons';
import Books from '../../stores/Artefacts/Books';
import { useStores } from '../../stores';

const { Meta } = Card;
const { Search } = Input;

const { TabPane } = Tabs;

const Book = ({ isAuthenticated, book, onRate, userId }) => {
  const [rated, setRated] = useState(book.rating ? 0 : 0);
  const [rating, setRating] = useState(book.rating || 0);

  const Description = () => (
    <>
      <Typography.Text>{`Authors: ${book.authors}`}</Typography.Text>
      <br />
      <Typography.Text>{`Pulisher: ${book.publisher}`}</Typography.Text>
      <br />
      <Typography.Text>{`ISBN: ${book.isbn}`}</Typography.Text>
      <br />
      <Typography.Text>{`Year: ${book.year}`}</Typography.Text>
    </>
  )

  return (
    <Card
      style={{ width: 300, margin: 10, height: 'fit-content' }}
      cover={
        <img
          alt={book.title}
          src={book.image_url_l}
          style={{ width: 300, height: 400, objectFit: 'cover' }}
        />
      }
      actions={isAuthenticated && [
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
        title={(
          <Popover
            content={book.title}
          >
            <Typography.Title
              level={4}
              style={{ cursor: 'help' }}
            >
              {book.title}
            </Typography.Title>
          </Popover>
        )}
        description={<Description />}
      />
    </Card>
  )
}

const TabContent = observer(({ clusterLabel, enableSearch = false, isAuthenticated, userId, emptyMessage, config, disablePagination }) => {
  const [books] = useState(new Books(config));
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [phrase, setPhrase] = useState('');
  const [limit, setLimit] = useState(100);
console.log({ clusterLabel, userId })
  useEffect(() => {
    document.addEventListener('onLogout', () => {
      books.clear();
    });
  }, [])

  useEffect(() => {
    setIsLoading(true);
    books
    .load({ userId, pageSize: limit, page: offset, phrase, clusterLabel })
    .then(() => setIsLoading(false))
    .catch(() => setIsLoading(false));
  }, [offset, limit, phrase]);


  if (isLoading) {
    return (
      <div style={{ width: '100%', paddingTop: '30vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <Typography.Paragraph>We are getting your books. Please be patient.</Typography.Paragraph>
        </div>
        <div style={{ flex: 1 }}>
          <Spin size="large"/>
        </div>
      </div>
    )
  }

  return (
    <>
      {enableSearch && (
        <Row>
          <Search
            placeholder="Search by title or author..."
            onSearch={(newPhrase) => setPhrase(newPhrase)}
            allowClear
          />
        </Row>
      )}
      {books.list && books.list.length > 0 && (
        <Row justify="center">
          {books.list.map((book) => <Book userId={userId} isAuthenticated={isAuthenticated} book={book} onRate={(id, rating) => books.rate(id, rating, userId)} />)}
        </Row>
      )}
      {!disablePagination && books.list && books.list.length > 0 && (
        <Pagination
          current={offset + 1} 
          total={books.count}
          onShowSizeChange={(current,size) => {
            console.log({ size, current })
            setLimit(size)}
          }
          showSizeChanger
          onChange={(page) => setOffset(page)}
        />
      )}
      {books.list && books.list.length === 0 && (
        <Typography.Paragraph>
          {emptyMessage}
        </Typography.Paragraph>
      )}
    </>
  )
});

const Home = observer(() => {
  const { authStatus } = useStores();
  const [currentKey, setCurrentKey] = useState('1');
  console.log({ authStatus })

  return (
    <React.Fragment>
      <Tabs defaultActiveKey={currentKey} onChange={(activeKey) => setCurrentKey(activeKey)}>
        {authStatus.isAuthenticated && (
          <TabPane
            tab="All Books"
            key="1"
          >
            <TabContent
              isAuthenticated={authStatus.isAuthenticated}
              userId={authStatus.userId}
              emptyMessage="Currently there are no any books."
              key="1"
              currentyKey={currentKey}
              enableSearch
            />
          </TabPane>
        )}
        {authStatus.isAuthenticated && (
          <TabPane
            tab="Your recommendations"
            key="2"
          >
            <TabContent
              isAuthenticated={authStatus.isAuthenticated}
              userId={authStatus.userId}
              emptyMessage="Currently there are no books similar to what you have liked. See recommendations from your neighbourhood and try again later."
              config={{ isPersonal: true }}
              key="2"
              currentyKey={currentKey}
            />
          </TabPane>
        )}
        {authStatus.isAuthenticated && (
          <TabPane
            tab="From your hood"
            key="3"
          >
            <TabContent
              isAuthenticated={authStatus.isAuthenticated}
              userId={authStatus.userId}
              clusterLabel={authStatus.clusterLabel}
              emptyMessage="Currently your neighbourhood is empty. Try again later once someone comes in."
              config={{ isHood: true }}
              key="3"
              currentyKey={currentKey}
              disablePagination
            />
          </TabPane>
        )}
        {authStatus.isAuthenticated && (
          <TabPane
            tab="History"
            key="4"
          >
            <TabContent
              isAuthenticated={authStatus.isAuthenticated}
              userId={authStatus.userId}
              emptyMessage="You have not rated any book yet."
              config={{ isHistory: true }}
              key="4"
              currentyKey={currentKey}
            />
          </TabPane>
        )}
        {!authStatus.isAuthenticated && (
          <TabPane style={{ display: 'flex', justifyContent: 'center' }} key="5">
            <Typography.Text>Please login to get your recommendations</Typography.Text>
          </TabPane>
        )}
      </Tabs>
    </React.Fragment>
  );
});

export default Home;
