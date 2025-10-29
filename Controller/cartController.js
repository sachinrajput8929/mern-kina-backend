import Cart from "../models/cartModel.js";
// const express = require("express");

// ✅ Add to Cart
const addToCart = async (req, res) => {
  try {
    const { item_id, item_title, item_type, item_quan, item_user, session_id } = req.body;

    if (!item_id || (!item_user && !session_id)) {
      return res.status(400).json({ success: false, message: "Missing required data" });
    }

    // ✅ Check if same product already exists in cart for this user or guest
    const existingCart = await Cart.findOne({
      item_id,
      $or: [{ item_user }, { session_id }],
    });

    if (existingCart) {
      existingCart.item_quan += Number(item_quan || 1);
      existingCart.updated_at = Date.now();
      await existingCart.save();

      return res.json({
        success: true,
        message: "Cart updated successfully",
        data: existingCart,
      });
    }

    // ✅ Create new cart entry
    const cart = new Cart({
      item_id,
      item_title,
      item_type,
      item_quan,
      item_user,
      session_id,
    });

    await cart.save();

    res.json({
      success: true,
      message: "Item added to cart successfully",
      data: cart,
    });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get Cart (for user or guest)
const getCart = async (req, res) => {
  try {
    const { item_user, session_id } = req.query;

    if (!item_user && !session_id) {
      return res.status(400).json({
        success: false,
        message: "Missing user or session ID",
      });
    }

    const filter = item_user ? { item_user } : { session_id };
    const items = await Cart.find(filter).populate("item_id");

    res.json({
      success: true,
      data: items,
    });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Alternate Fetch Cart Items (same logic, different param naming)



   // Controller: getCartItems
const getCartItems = async (req, res) => {
   try {
    const { user_id, session_id } = req.query;

    let query = {};

    // ✅ Logged-in user
    if (user_id) {
      query.item_user = user_id;
    }
    // ✅ Guest user
    else if (session_id) {
      query.session_id = session_id;
    } 
     else {
      return res.status(400).json({
        success: false,
        message: "User ID or session ID required",
      });
    }

    const cartItems = await Cart.find(query);

    return res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      data: cartItems || [],
    });
  } catch (error) {
    console.error("Error in getCartItems:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


  // try {
  //   const items = await Cart.find(); // fetch everything
  //   res.status(200).json({
  //     success: true,
  //     data: items,
  //   });
  // } catch (error) {
  //   console.error("Error fetching cart items:", error);
  //   res.status(500).json({
  //     success: false,
  //     message: "Server error while fetching cart",
  //   });
  // }

 

// ✅ Remove Item from Cart
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Item removed from cart successfully",
    });
  } catch (err) {
    console.error("Error removing cart item:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Export all functions
export { addToCart, getCart, getCartItems, removeFromCart };
