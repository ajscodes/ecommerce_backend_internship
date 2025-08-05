const Order = require('../models/Order');

exports.placeOrder = async (req, res, next) => {
  try {
    const { order_items, total_amount } = req.body;
    if (!order_items || !total_amount)
      return res.status(400).json({ message: 'Order items and total amount required' });

    const order = new Order({
      user_id: req.user.userId,
      order_items,
      total_amount
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user_id: req.user.userId });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('order_items.product_id');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (String(order.user_id) !== req.user.userId)
      return res.status(401).json({ message: 'Not authorized' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    if (String(order.user_id) !== req.user.userId)
      return res.status(401).json({ message: 'Not authorized' });
    
    if (order.status === 'delivered' || order.status === 'shipped')
      return res.status(400).json({ message: 'Cannot cancel order that is already shipped or delivered' });
    
    order.status = 'cancelled';
    await order.save();
    
    res.json({ message: 'Order cancelled successfully', order });
  } catch (err) {
    next(err);
  }
};
