
const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
const upload = require("../config/upload");
const { ensureAuthenticated } = require("../middleware/auth");

// PUBLIC: read-only list of all menu items - no login required
router.get("/", async (req, res) => {
  try {
    let query = {};

    // Additional feature idea if you want to add search back later

    const items = await MenuItem.find(query).sort({ category: 1, name: 1 });
    res.render("menu/index", { title: "Our Menu", items });
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Could not load the menu");
    res.redirect("/");
  }
});

// PRIVATE: form to add a new menu item with an image (the additional feature)
router.get("/new", ensureAuthenticated, (req, res) => {
  res.render("menu/new", { title: "Add Menu Item" });
});

// PRIVATE: handle the upload + create the item
router.post("/new", ensureAuthenticated, upload.single("image"), async (req, res) => {
  try {
    const { name, description, category, basePrice } = req.body;

    const newItem = {
      name,
      description,
      category,
      basePrice,
      createdBy: req.user._id,
    };

    if (req.file) {
      newItem.imagePath = "/uploads/" + req.file.filename;
    }

    await MenuItem.create(newItem);
    req.flash("success_msg", "Menu item added");
    res.redirect("/menu");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Could not add menu item: " + err.message);
    res.redirect("/menu/new");
  }
});

module.exports = router;