import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
      error: false
    }
  }

  componentDidMount() {
    getOrders()
      .then(data => {
        this.setState({ error: false })
        this.setState({ orders: data.orders })
      })
      .catch(err => {
        this.setState({ error: true })
        console.error('Error fetching:', err)
      });
  }

  addOrder = (newOrder) => {
    this.setState({ orders: [...this.state.orders, newOrder]})
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1 className="page-title">Burrito Builder</h1>
          {this.state.error && <p className="load-error">Oh no! There was a problem loading the data. Please try again later.</p>}
          <OrderForm addOrder={this.addOrder}/>
        </header>
      
        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
