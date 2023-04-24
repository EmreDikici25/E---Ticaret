const categoryList = document.querySelector('.categories');
const productList = document.querySelector('.products')
const openBtn = document.getElementById('open-btn')
const closeBtn = document.getElementById('close-btn')
const modal = document.getElementById('modal-wrapper')
const modalList = document.querySelector('.modal-list')

document.addEventListener('DOMContentLoaded', () => {
    //CALLBACK İçerisinde başka fonksiyon çalıştıran fonksiyon
    fetchCategories();
    fetchProducts();
});

function fetchCategories() {
    fetch('https://api.escuelajs.co/api/v1/categories')
    // Gelen veriyi işleme
    .then((response) => response.json())
    // Oluşan datayı forEach ile her bir obje için fonksiyon çalıştırma
    .then((data) => data.slice(0, 4).forEach((category) => {
        // Gelen herbir obje için div oluşturma
        const categoryDıv = document.createElement('div');
        // Dive Class ekleme
        categoryDıv.classList.add('category');
        // Divin içeriğini değiştirme
        categoryDıv.innerHTML = `
            <img src="${category.image}">
            <span>${category.title}</span>
        `;
        // Oluşan categoriyi HTML deki listeye atma
        categoryList.appendChild(categoryDıv);
    }))
    .catch((err) => console.log(err));
}

//Ürünleri Çekme
function fetchProducts(){
    //Apiye İstek Atma
    fetch('https://api.escuelajs.co/api/v1/products')
    //İstek başarılı olursa veriyi işle
    .then((res) => res.json())
    //İşlenen veriyi al ve ekrana bas
    .then((data) => data.slice(0,24).forEach((product) => {
        //DİV oluştur
        const productDiv = document.createElement('div')
        productDiv.classList.add('product')
        //İçeriği değiştir
        productDiv.innerHTML = `
                <img src="${product.images[0]}" />
                <p class="product-title">${product.title}</p>
                <p class="product-category">${product.category.name}</p>
                <div class="product-action">
                    <p>${product.price} $</p>
                    <button onclick='sepeteEkle({id:"${product.id}", name:"${product.title}", price:"${product.price}", image:"${product.images[0]}", amount:1})'>Sepete Ekle</button>
                </div>
        `;
        //HTML ye göndereceğiz
        productList.appendChild(productDiv)
    }))
    //Hata olursa devreye gir
    .catch();
}

// Butona tıklanma olayını izliyoruz

const basket = [];

const addList = () => {
    basket.forEach((product) => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');
        listItem.innerHTML = `
                        <div>
                            <img src="${product.image}" alt="">
                        </div>
                        <h2>${product.name}</h2>
                        <h2>${product.price}</h2>
                        <div class='modal-amount'><h2>${product.amount}</h2></div>
        `;
    modalList.appendChild(listItem);
    });
};

openBtn.addEventListener('click', () => {
    toggleModal();
    addList();
});
closeBtn.addEventListener('click', () => {
    toggleModal();
    modalList.innerHTML = '';
});

//Eğer dışarıya boş ekrana tıklanırsa da sepeti kapatır
modal.addEventListener('click', (e) => {
    if (e.target.id !== 'modal'){
        modal.classList.remove('active');
    }
   console.log(e.target);
})

//Eğer butona tıklanırsa class eklenip çıkarılıyor
function toggleModal(){
    modal.classList.toggle('active');
}

//! SEPETE EKLEME İŞLEMİ


function sepeteEkle(product){
    const findItem = basket.find((eleman) => eleman.id === product.id);
    
    if(findItem){
        findItem.amount += 1;
    }else{
        basket.push(product);
    }
}
       

