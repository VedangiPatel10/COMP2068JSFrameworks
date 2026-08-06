// Full CRUD for a logged-in user's own orders.
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const { ensureAuthenticated } = require("../middleware/auth");

// Simple price calculator for the customization feature
function calculatePrice(basePrice, size, extraShots) {
  let price = Number(basePrice);
  if (size === "Medium") price += 0.5;
  if (size === "Large") price += 1.0;
  price += Number(extraShots) * 0.75;
  return Math.round(price * 100) / 100;
}

// READ - list only the logged-in user's orders
router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("menuItem")
      .sort({ createdAt: -1 });
    res.render("orders/index", { title: "My Orders", orders });
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Could not load your orders");
    res.redirect("/");
  }
});

// CREATE - form
router.get("/new", ensureAuthenticated, async (req, res) => {
  try {
    const menuItems = await MenuItem.find().sort({ name: 1 });
    res.render("orders/new", { title: "New Order", menuItems });
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Could not load the menu");
    res.redirect("/orders");
  }
});

// CREATE - handle submit
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    const { menuItem, size, milk, extraShots } = req.body;
    const item = await MenuItem.findById(menuItem);
    if (!item) {
      req.flash("error_msg", "Selected drink no longer exists");
      return res.redirect("/orders/new");
    }

    const totalPrice = calculatePrice(item.basePrice, size, extraShots);

    await Order.create({
      user: req.user._id,
      menuItem: item._id,
      size,
      milk,
      extraShots,
      totalPrice,
    });

    req.flash("success_msg", "Order placed!");
    res.redirect("/orders");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Could not place order: " + err.message);
    res.redirect("/orders/new");
  }
});

// UPDATE - edit form
router.get("/:id/edit", ensureAuthenticated, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id }).populate("menuItem");
    if (!order) {
      req.flash("error_msg", "Order not found");
      return res.redirect("/orders");
    }
    const menuItems = await MenuItem.find().sort({ name: 1 });
    res.render("orders/edit", { title: "Edit Order", order, menuItems });
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Could not load order");
    res.redirect("/orders");
  }
});

// UPDATE - handle submit (only owner can edit, and only if still Pending)
router.put("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) {
      req.flash("error_msg", "Order not found");
      return res.redirect("/orders");
    }
    if (order.status !== "Pending") {
      req.flash("error_msg", "You can only edit orders that are still Pending");
      return res.redirect("/orders");
    }

    const { menuItem, size, milk, extraShots } = req.body;
    const item = await MenuItem.findById(menuItem);
    const totalPrice = calculatePrice(item.basePrice, size, extraShots);

    order.menuItem = menuItem;
    order.size = size;
    order.milk = milk;
    order.extraShots = extraShots;
    order.totalPrice = totalPrice;
    await order.save();

    req.flash("success_msg", "Order updated");
    res.redirect("/orders");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Could not update order: " + err.message);
    res.redirect("/orders");
  }
});

// DELETE - with confirmation happening client-side in the view
router.delete("/:id", ensureAuthenticated, async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!order) {
      req.flash("error_msg", "Order not found");
    } else {
      req.flash("success_msg", "Order cancelled");
    }
    res.redirect("/orders");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Could not cancel order");
    res.redirect("/orders");
  }
});

module.exports = router;