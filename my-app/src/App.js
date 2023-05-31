import React from 'react';
import './App.css';
const mysql = require('mysql');
import headerImage from './header.jpg'; // Import the image
import flower1Image from './flower1.jpg'; // Import product image
import tool1Image from './tool1.jpg'; // Import product image
import flower2Image from './flower2.jpg'; // Import product image
import tool2Image from './tool2.jpg'; // Import product image
import 'whatwg-fetch'; // Import the fetch polyfill

class App extends React.Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = this.state;

    // Send the form data to the server for storage in the database
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        // Show the alert message
        alert('Thank you for subscribing to our newsletter!');
        // Reset form fields
        this.setState({
          name: '',
          email: '',
        });
      } else {
        // Handle error response
        console.error('Failed to subscribe:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Failed to subscribe:', error);
    }
  };

  componentDidMount() {
    // Connect to the Cloud SQL database
    const connection = mysql.createConnection({
      host: '34.31.186.62',
      port: 3306,
      user: 'my-flourish-user',
      password: 'admin123',
      database: 'my-flourish-db',
    });

    // Connect to the database
    connection.connect((error) => {
      if (error) {
        console.error('Error connecting to the database:', error);
      } else {
        console.log('Connected to the database');
      }
    });

    // Close the database connection
    connection.end();
  }

  render() {
    const { name, email } = this.state;

    return (
      <div className="App">
        <img src={headerImage} alt="Header" className="header-image" />
        <nav className="navbar">
          <a className="active" href="www.google.com">
            Home
          </a>
          <a href="www.google.com">Flowers</a>
          <a href="www.google.com#">Seeds</a>
          <a href="www.google.com#">Plants</a>
          <a href="www.google.com#">Gardening Tools</a>
          <a href="www.google.com#">Soil</a>
          <a href="www.google.com">Fertilizer</a>
        </nav>
        <h1>Flourish - Your Plant and Gardening Tools Store</h1>
        <h2>Our featured items</h2>
        <div className="product-list">
          {/* Display your products here */}
          <div className="product">
            <div className="product-box">
              <img src={flower1Image} alt="Product" className="product-image" />
              <h3>White Roses</h3>
              <p>Description: Elegant and timeless, our white roses add a touch of grace to any garden. With their delicate petals and sweet fragrance, these roses are perfect for romantic occasions or simply brightening up your outdoor space.</p>
              <button className="buy-now-button">Buy Now</button>
            </div>
          </div>
          <div className="product">
            <div className="product-box">
              <img src={tool1Image} alt="Product" className="product-image" />
              <h3>Misting Bottle</h3>
              <p>Keep your plants happy and hydrated with our convenient water spray thingy. This misting bottle is designed to provide a fine, gentle spray that mimics natural rainfall, ensuring your plants receive the moisture they need without overwatering. It's perfect for delicate plants, seedlings, and maintaining optimal humidity levels in terrariums. Say goodbye to dry leaves and hello to thriving, lush greenery.</p>
              <button className="buy-now-button">Buy Now</button>
            </div>
          </div>
          <div className="product">
            <div className="product-box">
              <img src={flower2Image} alt="Product" className="product-image" />
              <h3>Red Flowers</h3>
              <p>Add a pop of vibrant color to your garden with our red flowers. These bold and beautiful blooms are sure to catch the eye and create a stunning focal point in any flowerbed or container. Whether you're looking to attract pollinators or create a striking display, our red flowers are a fantastic choice.</p>
              <button className="buy-now-button">Buy Now</button>
            </div>
          </div>
          <div className="product">
            <div className="product-box">
              <img src={tool2Image} alt="Product" className="product-image" />
              <h3>Gardening Tool Kit</h3>
              <p>Description: Our gardening tool kit is a must-have for every gardening enthusiast. This comprehensive set includes all the essential tools you need to maintain your garden with ease. From sturdy trowels and hand forks to pruning shears and a durable gardening bag, this kit has you covered. Stay organized and make your gardening tasks a breeze with our reliable tool kit.</p>
              <button className="buy-now-button">Buy Now</button>
            </div>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <h2>Sign up for our newsletter!</h2>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={name} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={this.handleChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
