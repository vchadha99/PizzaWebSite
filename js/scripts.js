// The order is stored here
var order = [];
var max_pizzas = 5;
var orders = load_orders();
var delivery_price = 3.00;

var pizzas = [
  {name: 'Veggie Loaded', price: 120, image: 'pizza-1.png'},
  {name: 'Farm House', price: 130, image: 'pizza-2.png'},
  {name: 'Cheesy Delight', price: 130, image: 'pizza-3.png'},
  {name: 'Mexican Spice', price: 130, image: 'pizza-4.png'},
  {name: 'Paneer Tikka', price: 140, image: 'pizza-1.png'},
  {name: 'Chicken Tikka', price: 150, image: 'pizza-2.png'},
  {name: 'Chicken Sausage', price: 150, image: 'pizza-3.png'},
  {name: 'Mutton Tikka', price: 160, image: 'pizza-4.png'},
  {name: 'Salami', price: 160, image: 'pizza-1.png'},
  {name: 'Fish Fry', price: 170, image: 'pizza-2.png'},
  {name: 'Chef Special Veg', price: 160, image: 'pizza-3.png'},
  {name: 'Chef Special Non Veg', price: 190, image: 'pizza-4.png'}
];


function load_orders(){
  try {
    return JSON.parse(window.localStorage["orders"]);
  }
  catch (e) {
    return [];
  }
}

function save_order() {
  orders.push({pizzas: order, form: $('form').serializeArray()});

  save_orders();
}

function save_orders() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

function get_order_html(pizzas, delivery, show_delete) {
    order_html = "";

    total = 0.0;

    for (var i = 0; i < pizzas.length; ++i) {
      pizza = pizzas[i];
      total += pizza.price;

      order_html += '<tr id="' + i + '"><th>' + pizza.name + '</th><td>₹' + pizza.price.toFixed(2) + '</td>';
      if (show_delete) {
        order_html += '<td><button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove"></span></button></td>';
      }
      order_html += '</tr>';
    }

    if (delivery) {
      total += delivery_price;
      order_html += '<tr><th>Delivery</th><td>₹' + delivery_price.toFixed(2) + '</td></tr>';
    }

    order_html += '<tr><th>GST</th><th>₹' + (total * 3 / 23).toFixed(2) + '</th></tr>';

    order_html += '<tr><th>Total</th><th>₹' + total + '</th></tr>';

    return order_html;
}