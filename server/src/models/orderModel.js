const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      default: ""
    },

    mobile: {
      type: String,
      default: ""
    },

    fileName: {
      type: String,
      default: ""
    },

    pages: {
      type: Number,
      default: 0
    },

    copies: {
      type: Number,
      default: 1
    },

    printType: {
      type: String,
      default: "bw"
    },

    amount: {
      type: Number,
      default: 0
    },

    paymentId: {
      type: String,
      default: ""
    },

    orderStatus: {
      type: String,
      default: "Paid"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);
