import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function cardHeader() {
  const { headerCard } = this.props;
  
  return (
    <Card.Header>
      <h2>{ headerCard }</h2>
    </Card.Header>
  );
}

function cardTitle() {
  const { titleCard } = this.props;

  return (
    <Card.Title>
      <h3>{ titleCard }</h3>
    </Card.Title>
  );
}

function cardText() {}

function cardBody() {
  return (
    <Card.Body>
      <cardTitle />
      <cardText />
    </Card.Body>
  );
}

class CardBase extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <cardHeader />
        <cardBody />
      </Card>
    );
  };
}

export default CardBase;