const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

const calculateTotal = (newItemPrice, cartTotal) => {
  return (newItemPrice + cartTotal).toFixed(2);
};

const calculateDiscount = (cartTotal, isMember) => {
  return (isMember ? cartTotal - (cartTotal * 10) / 100 : cartTotal).toFixed(2);
};

const calculateTax = (cartTotal) => {
  return ((cartTotal * 5) / 100).toFixed(2);
};

const getEstimateDeliveryTime = (shippingMethod, distance) => {
  return (
    shippingMethod === 'express' ? distance / 100 : distance / 50
  ).toFixed(0);
};

const calculateShippingCost = (weight, distance) => {
  return (weight * distance * 0.1).toFixed(0);
};

app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateDiscount(newItemPrice, cartTotal));
});

app.get('/membership-discount', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember === 'true';
  res.send(calculateTotal(cartTotal, isMember));
});

app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal));
});

app.get('/estimate-delivery', (req, res) => {
  const distance = parseFloat(req.query.distance);
  const shippingMethod = req.query.shippingMethod;
  res.send(getEstimateDeliveryTime(shippingMethod, distance));
});

app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance));
});

app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send((purchaseAmount * 2).toFixed(0));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
