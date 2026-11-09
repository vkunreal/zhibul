const ORDER_ONLY_LABEL = 'Под заказ'

/** Цена для витрины. При is_order_only вместо суммы — «Под заказ». */
const buildDisplayPrice = (item, valute) => {
  if (item.is_order_only) {
    return ORDER_ONLY_LABEL
  }

  if (item.price) {
    return item.price
  }

  if (
    item.purchase_price &&
    item.profitabilaty &&
    valute &&
    item.price_postfix
  ) {
    return `${(item.purchase_price * item.profitabilaty * valute).toFixed(1)}0 ${
      item.price_postfix
    }`
  }

  return ''
}

module.exports = { buildDisplayPrice, ORDER_ONLY_LABEL }
