import React, { useState } from 'react';
import { FaTrashAlt, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

const initialCart = [
  {
    id: 1,
    name: "Grilled Salmon",
    price: 96,
    quantity: 2,
    image: "/grilled.jpg",
  },
  {
    id: 2,
    name: "Meat vegetable",
    price: 65.08,
    quantity: 2,
    image: "/veg.jpg",
  },
];

const Cart = () => {
  const [cart, setCart] = useState(initialCart);

  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-pink-100 flex justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4 space-y-4 relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <FaArrowLeft className="text-gray-500 cursor-pointer" />
          <h2 className="text-xl font-bold">Item Carts</h2>
          <div className="relative">
            <FaShoppingCart className="text-gray-700 text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {totalQuantity}
            </span>
          </div>
        </div>

        {/* Food Cart Items */}
        <h3 className="text-lg font-semibold">Your Food Cart</h3>

        {cart.map(item => (
          <div key={item.id} className="flex bg-gray-50 p-3 rounded-lg shadow-sm items-center">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-full object-cover" />
            <div className="flex-1 px-3">
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
              <div className="flex items-center mt-2 space-x-2">
                <button onClick={() => updateQuantity(item.id, -1)} className="px-2 bg-gray-200 rounded">-</button>
                <span className="bg-red-500 text-white px-3 py-1 rounded text-sm">Add To {item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-2 bg-gray-200 rounded">+</button>
              </div>
            </div>
            <button onClick={() => deleteItem(item.id)} className="text-red-500">
              <FaTrashAlt />
            </button>
          </div>
        ))}

        {/* Promo Code Input */}
        <div className="flex items-center bg-gray-100 p-2 rounded-md">
          <input
            type="text"
            placeholder="Add Your Promo Code"
            className="flex-1 outline-none px-3 py-2 bg-transparent"
          />
          <span className="text-red-400 pr-2">🏷️</span>
        </div>

        {/* Total Cost Section */}
        <div className="bg-gray-100 rounded-lg p-4 space-y-1">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span>${(item.price * item.quantity).toFixed(0)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg pt-2">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h4 className="font-semibold text-md pb-2">Payment Method</h4>
          <div className="flex items-center bg-gray-100 p-2 rounded-md">
            <img
              src="https://cdn-icons-png.flaticon.com/512/196/196565.png"
              alt="card"
              className="w-8 h-8 mr-2"
            />
            <span>Credit/Debit Card</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
