const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const zeroPad = (num, places) => String(num).padStart(places, '0')

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    createDate: {
      type: Date,
      required: true,
      default: Date.now,
      trim: true,
    },
    customer: {
      type: String,
      required: true,
      trim: true,
    },
    products: {
      type: [{}],
      required: true,
      trim: true,
    },
    totalAmountInput: {
      type: Number,
      trim: true,
    },
    totalAmountOutput: {
      type: Number,
      trim: true,
    },
    totalAmountBeforeTaxes: {
      type: Number,
      trim: true,
    },
    totalAmountAfterTaxes: {
      type: Number,
      trim: true,
    },
    profitBeforeTaxes: {
      type: Number,
      trim: true,
    },
    profitAfterTaxes: {
      type: Number,
      trim: true,
    },
    profit: {
      type: Number,
      trim: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

orderSchema.pre('save', async function (next) {
  const doc = this;
  const latestOrder = await Order.find().sort({$natural:-1}).limit(1); //for the latest record
  let orderId = latestOrder?.[0]?.orderId || null;
  orderId = orderId ? orderId.toString().replace('DH', '') : 0;

  orderId = parseInt(orderId);
  orderId = orderId + 1;
  orderId = 'DH' + zeroPad(orderId, 8);
  doc.orderId = orderId;
  const products = doc?.products;
  totalAmountInput = products.reduce((a,b) => (a.priceInput * a.quantity) + (b.priceInput * b.quantity))
  totalAmountOutput = products.reduce((a,b) => (a.priceOutput * a.quantity) + (b.priceOutput* b.quantity))
  totalAmountAfterTaxes = totalAmountOutput * 0.9
  profitBeforeTaxes= totalAmountOutput - totalAmountInput
  profitAfterTaxes= totalAmountAfterTaxes - totalAmountInput
  doc.totalAmountInput = totalAmountInput
  doc.totalAmountOutput = totalAmountOutput
  doc.totalAmountAfterTaxes = totalAmountAfterTaxes
  doc.profitBeforeTaxes = profitBeforeTaxes
  doc.profitAfterTaxes = profitAfterTaxes
  next();
});

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
