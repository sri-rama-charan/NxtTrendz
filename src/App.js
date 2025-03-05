import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const newCartList = cartList.filter(
      eachItem => eachItem.title === product.title,
    )
    if (newCartList.length === 0) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const finalCartList = cartList.map(eachItem => {
        if (eachItem.title === product.title) {
          const newQuantity = eachItem.quantity + product.quantity
          return {...eachItem, quantity: newQuantity}
        }
        return eachItem
      })
      this.setState({cartList: finalCartList})
    }
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: filteredList})
  }

  incrementCartItemQuantity = (cartItemDetails, id) => {
    const {cartList} = this.state
    const newCartList = cartList.map(item => {
      if (item.id === id) {
        console.log(id)
        return {...cartItemDetails, quantity: cartItemDetails.quantity + 1}
      }
      return item
    })
    this.setState({cartList: newCartList})
  }

  decrementCartItemQuantity = (cartItemDetails, id) => {
    const {cartList} = this.state
    const newCartList = cartList
      .map(item => {
        if (item.id === id) {
          if (cartItemDetails.quantity !== 1) {
            return {...cartItemDetails, quantity: cartItemDetails.quantity - 1}
          }
          return null
        }
        return item
      })
      .filter(item => item !== null)
    this.setState({cartList: newCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
