import React from 'react';
import CardBase from './Card';
import Container from 'react-bootstrap/Container';

const getMaster = () => {

}

class App extends React.Component {
  render() {
    return (
      <Container fluid>
        <main>
          <CardBase />
        </main>
      </Container>
    );
  }
}

export default App;