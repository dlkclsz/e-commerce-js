const productList=document.getElementById("productList");
const cardItemsElement = document.getElementById("cardItems");
const cardTotalElement= document.getElementById("cardTotal");
let menu = document.querySelector(".navbar");
let menuIcon = document.querySelector("#menu-icon");
menuIcon.addEventListener("click", () => menu.classList.toggle("open-menu"));
let card = JSON.parse(localStorage.getItem("card")) || [];

//ürünler
const products = [
    {
    id:1,
    title:"Auto Hoodle",
    price: 264.9,
    image:"https://pangaia.com/cdn/shop/products/Recycled-Nylon-NW-Flwrdwn-Quilted-Collarless-Jacket-Cerulean-Blue-Female-1_bf4b2a54-8a7f-4174-bc49-8ef22b24bfdd.jpg?v=1666708230&width=1426",

},
{
    id: 2,
    title: "FUSION HOODIE",
    price: 295,
    image:
      "https://images.undiz.com/on/demandware.static/-/Sites-ZLIN-master/default/dw2264d914/merch/BTS/654206666_x.jpg?sw=1250",
  },
  {
    id: 3,
    title: "Chestnut Brown",
    price: 74.9,
    image:
    "https://images.undiz.com/on/demandware.static/-/Sites-ZLIN-master/default/dw2264d914/merch/BTS/654206666_x.jpg?sw=1250",
  },
  {
    id: 4,
    title: "Nike Sportswear",
    price: 80,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61734ec7-dad8-40f3-9b95-c7500939150a/sportswear-club-mens-french-terry-crew-neck-sweatshirt-tdFDRc.png",
  },
  {
    id: 5,
    title: "Champion BASIC",
    price: 48.99,
    image:
      "https://img01.ztat.net/article/spp-media-p1/7067458719b744fe81ffee62d3d0b912/abad421e7d8e47f08a2abc1c6ffe07dc.jpg?imwidth=1800",
  },
  {
    id: 6,
    title: "Cotton Hoodie",
    price: 395,
    image:
      "https://pangaia.com/cdn/shop/files/Reclaim-3.0-Hoodie-Reclaim-Jade-Womens-3.jpg?v=1693398673&width=1426",
  },
  {
    id: 7,
    title: "CLASSIC CREWNECK",
    price: 48.99,
    image:
      "https://img01.ztat.net/article/spp-media-p1/10cea44041564f81ac585fc6c8978907/c4c32dbc45dd4dbc9d15087c846538f2.jpg?imwidth=1800",
  },
  {
    id: 8,
    title: "TAPE HOODED",
    price: 79.99,
    image:
      "https://img01.ztat.net/article/spp-media-p1/d391f90be278469ebfdff731800cfccc/6d2101bd672f4e059501f01fe726f315.jpg?imwidth=1800",
  },
];

//Ürünleri ekrana renderlayacak fonksiyon
function renderProducts() {
productList.innerHTML=products.map((product) => `
      <div class="product">
          <img src= "${product.image}"class="product-img"/>
          <div class= "product-info">
            <h2>${product.title}</h2>
            <p>${product.price}</p>
            <a class="add-to-cart"data-id="${product.id}">add to cart</a>
          </div>
        </div>
    `
  )
  .join("");

  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  
  for(let i = 0; i < addToCartButtons.length; i++) {
   const addToCartButton = addToCartButtons[i];
   addToCartButton.addEventListener("click", addToCart);
}
}


//sepete ekleme işlemi
function addToCart(event) {
  //sepete ekle butonuna tıkladığımızda sepete ekleyeceğimiz ürünün id sine erişme
  
  const productID = parseInt(event.target.dataset.id);

  //dizinin içerisinde tıkladığımız id li elemanı bulmak için find metodunu kullandık

  const product = products.find((product) => product.id === productID);
 
  if(product){
    //sepette tıklanılan veri önceden var mı yok mu kontrol ederiz
    const existingItem = card.find((item) => item.id === productID);
    //sepette tıkladığımız bir ürün varsa miktarını bir arttırırız
    
    if  (existingItem){
      existingItem.quantity++;

    }
    else{
     // tıkladığımız ürün sepette yoksa yeni bir ürün şeklinde ekleriz 
      const cardItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      // yeni oluşturduğumuz ürünü cart dizisine ekleriz
      card.push(cardItem);
  
      }
  event.target.textContent = "Added";
  //toplam miktarları günceller
  updateCardIcon();
  saveToLocalStorage();
  renderCardItems();
  calculateCardTotal();
  
}
}

//card dizisinden ve localstoragedan silmek istediğimiz ürünü sildik ve sayfayı güncelledik

function removeFromCard(event) {
     const productID = parseInt(event.target.dataset.id);
     console.log(card);

  // card dizisinden silmek istediğimiz ürünü id sine göre card dizisinden sildik
  card = card.filter((item) => item.id !== productID);
  
  // localstorage ı güncelle
  saveToLocalStorage();
  // sayfayı güncelledik
  renderCardItems();
  //sepetteki toplam fiyatı günceller
  calculateCardTotal();
  //toplam miktarı günceller
  updateCardIcon();
}
//ınputun içerisindeki miktar değişince çalışacak fonksiyon
function changeQuantity(event) {
  const productID = parseInt(event.target.dataset.id);
  const quantity = parseInt(event.target.value);

  if (quantity > 0) {
    const cardItem = card.find((item) => item.id === productID);
    if (cardItem) {
      cardItem.quantity = quantity;
      saveToLocalStorage();
      calculateCardTotal();
      updateCardIcon();
    }
  }
}
// localstorage veri eklemek için kullandık

function saveToLocalStorage() {
  localStorage.setItem("card",JSON.stringify(card));
}


function renderCardItems(){
   cardItemsElement.innerHTML = card.map((item) => `
           <div class="card-item">
             <img src="${item.image}"
              alt="${item.title}"/>
        <div class="card-item-info">

           <h2 class="card-item-title">${item.title}</h2>
             <input type="number"min="1"value="${item.quantity}"class=" card-item-quantity" 
             data-id="${item.id}"/>             
        </div>
             <h2>${item.price}</h2>
              <button class="remove-from-cart"data-id="${item.id}>"Remove</button>
       </div>)`)
.join("");

const removeButtons = document.getElementsByClassName("remove-from-cart");
for(let i = 0; i < removeButtons.length; i++) {
  const removeButton = removeButtons[i];
  removeButton.addEventListener("click",removeFromCard);
}
const quantityInputs = document.getElementsByClassName("card-item-quantity");
for(let i = 0; i < quantityInputs.length; i++) {
  const quantityInput = quantityInputs[i]; 
  quantityInput.addEventListener("change",changeQuantity);

}
updateCardIcon();

//sepetteki toplam fiyatı hesaplar
function calculateCardTotal() {
  // reduce iiki değer ister,bunlardan birincisi içerisinde yapacağımız işlem ,ikincisi is başlangıç
  const total = card.reduce((sum,item) => sum + item.price * item.quantity,0);
  cardTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}
// sayfa cart.html sayfasındaysa rendercartıtems fonksiyonun çalışması gerekiyor

if(window.location.pathname.includes("card.html")) {
  renderCardItems();
  calculateCardTotal();
} else {
  //sayfa index.htmlsayfasındaysa renderproducts foksiyonu çalışacak
  renderProducts();
}  

function updateCardIcon(){
   const cardIcon = document.getElementById("card-icon");

   const i = document.querySelector(".bx-shopping-bag");
   let totalQuantity = card.reduce((sum,item) => sum + item.quantity,0);
   i.setAttribute("data-quantity", totalQuantity);
   if(card.length === 0) {
    totalQuantity = 0;
   }
   cardIcon.setAttribute("data-quantity" ,totalQuantity);
}
  updateCardIcon();
  function updateCardIconOnCardChange() {
    updateCardIcon();
  }
  window.addEventListener("storage",updateCardIconOnCardChange);

  renderProducts();
  renderCardItems();
  calculateCardTotal();

}