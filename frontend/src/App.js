import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

function Home() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Trang Chu Nguyen Tuan Thanh</h1>
          <p>Đây là nội dung trang chủ.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;