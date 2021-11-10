class Product {
  constructor(title, image, desc, price) {
    //We are creating this fields with the dot notation
    //and assigning a value when creating a Product object with the 'new' syntax
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}
class ProductList {
  products = [
    new Product(
      "A pillow",
      "https://images.pexels.com/photos/177809/pexels-photo-177809.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "A soft pillow",
      19.98
    ),
    new Product(
      "A carpet",
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Chase_William_Merritt_The_Tenth_Street_Studio.jpg",
      "A carpet you may like !",
      25.58
    ),
  ];
  constructor() {}
  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    //Logic to render a single product.
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }
  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    console.log(`RootElement: ${rootElement}`);
    if (cssClasses && typeof cssClasses === "string") {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    console.log(`This is hooks: '${this.hookId}, ${rootElement}'`);
   return rootElement;
  }
}

//To guarantee the structure we can add a new class
class ElementAttribute {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class ShoppingCart extends Component {

  constructor(renderHookId){
    //Call the constructor in the parent (extended) class
    super(renderHookId);
 }
  items = [];
  set cartItems(value) {
    // I override the existing array with a new one.
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total \$${this.totalAmount}</h2>`;
  }
  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curValue) => prevValue + curValue.price,
      0
    );
    return sum.toFixed(2);
  }
  addProduct(product) {
    //Real copy of the items array
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }
  render() {
    // const cartEl = document.createElement("section");
    const cartEl = this.createRootElement('section', 'cart');
    console.log('cartEl',cartEl);
    cartEl.innerHTML = `
        <h2>Total \$${!this.totalOutput ? 0 : this.totalOutput}</h2>
        <button>Order now</button>
        `;
    cartEl.className = "cart";
    //Creating totalOutput with dot notation.
    this.totalOutput = cartEl.querySelector("h2");
  }
 
}
//The order of classes dont matter, when the script loads Javascript will parse it entirely before execution
//And all the classes and mehods are understood and recognize by the V8 Javascript engine.
class ProductItem extends Component {
  //Responsible for render a single item
  constructor(product) {
    this.product = product;
  }
  addToCart() {
    console.log("addToCart");
    App.addProductToCart(this.product);
  }
  render() {
    // const prodEl = document.createElement("li");
    const prodEl = this.createRootElement('li', 'product-item')
    // prodEl.className = "product-item";
    prodEl.innerHTML = `
              <div>
              <img src="${this.product.imageUrl}" alt="${this.product.title}" />
                <div class="product-item__content">
                <h1>${this.product.title}</h1>
                <h3>\$${this.product.price}</h3>
                <p>${this.product.description}</p>
                <button> Add to cart </button>
                </div>
              </div>
              `;
    //Here we use a query selector that gives us back the first button that it finds.
    const addCartButton = prodEl.querySelector("button");
    /* 
    I add a click listener
    With this configuration Javascript binds 'this' to the source of this event 
    Wich in this case is the button itself
    addCartButton.addEventListener('click',this.addToCart);
    
        addToCart(){
        console.log('Adding product to cart');
        console.log(this.product);
        }
        Displays in console 
         Adding product to cart
         undefined
  } 
     */
    addCartButton.addEventListener("click", () => this.addToCart(this.product));
    return prodEl;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");
    this.cart = new ShoppingCart('app');  
    this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();
    renderHook.append(prodListEl);
  }
}
class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }
  static addProductToCart(product) {
    console.log("this.product", product);
    const prod = this.cart.addProduct(product);
    console.log("prod+_", prod);
  }
}

App.init();
