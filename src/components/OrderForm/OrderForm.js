import React, { Component } from 'react';
import './OrderForm.css'

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: false,
      fetchError: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name && this.state.ingredients.length >= 1) {
      this.setState({ error: false })
      this.postOrder();
    } else {
      this.setState({ error: true })
    }
    this.clearInputs();
  }

  postOrder = () => {
    const order = {
      name: this.state.name,
      ingredients: this.state.ingredients
    }

    fetch("http://localhost:3001/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })
    .then(data => {
      this.props.addOrder(data)
      this.setState({ fetchError: false })
    })
    .catch(error => this.setState({ fetchError: true }))
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  handleIngredientChange = (e) => {
    e.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, e.target.value]})
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value})
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button className="ing-btn" id={ingredient} key={ingredient} name={ingredient} value={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          className='name-input'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        <div className="form-left">
        { ingredientButtons }
        </div>
        <p className="order-info">Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>
        {this.state.error && <p className="form-error">Please include your name and at least one ingredient in your order</p>}

        <button className="sub-btn" onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
        {this.state.fetchError && <p className="post-error">Oh no! There was a problem submitting your order. Please try again later!</p>}

      </form>
    )
  }
}

export default OrderForm;
