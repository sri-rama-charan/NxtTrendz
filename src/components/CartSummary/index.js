// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const sumOfList = valuesList => {
        let total = 0
        valuesList.forEach(num => {
          total += num
        })
        return total
      }

      const orderTotal = () => {
        const orderValue = 0
        const totalValueList = cartList.map(
          eachItem => eachItem.quantity * eachItem.price,
        )
        return sumOfList(totalValueList)
      }
      return (
        <div>
          <h1>Order Total: {orderTotal()}</h1>
          <p>{cartList.length} items in cart</p>
          <button type="button" className="btn btn-primary">
            checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
