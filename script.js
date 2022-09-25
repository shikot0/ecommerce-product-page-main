const body = document.querySelector('body');
const addToCartBtn = document.querySelector('.add-to-cart-button');  
const counterElement = document.getElementById('counter-element');
const cartBtn = document.getElementById('cart-button'); 
const cartModal = document.getElementById('cart-modal');
const incrementBtn = document.getElementById('increment-button');
const decrementBtn = document.getElementById('decrement-button');  
const cartItemWrapper = document.getElementById('cart-item-wrapper');
const sliderModal = document.getElementById('lightbox-gallery');
const lightboxSlides = document.querySelectorAll('.main-slide');
const slideThumbnails = document.querySelectorAll('.slide-thumbnail-div'); 
const previousSlideBtn = document.getElementById('previous-slide-button');
const nextSlideBtn = document.getElementById('next-slide-button');
const closeSliderBtn = document.getElementById('close-slider-button'); 
const mainImage = document.querySelector('.main-image-div');  
const showNavBtn = document.getElementById('show-nav-button');
const nav = document.querySelector('nav');
const mainSlides = document.querySelectorAll('.main-image');  
const mainImageThumbnails = document.querySelectorAll('.thumbnail-div'); 
const notification = document.querySelector('.notification');
 
let currentSlide = 0; 
let pairsCounter = 0; 


                          // MODALS
cartBtn.addEventListener('click',() => {
    cartModal.toggleAttribute('open');
})
showNavBtn.addEventListener('click', () => {
    if(nav.classList.contains('visible')) {
        nav.classList.remove('visible');
        showNavBtn.innerHTML = `<img src="images/icon-menu.svg" alt="">`;
    }else {
        nav.classList.add('visible');
        showNavBtn.innerHTML = `<img src="images/icon-close.svg" alt="">`;
    }
}) 
mainImage.addEventListener('click', () => {
    sliderModal.classList.add('visible');
    body.style.overflowY = 'hidden'; 
    sliderModal.style.top = `${window.scrollY}px`;  
})
closeSliderBtn.addEventListener('click', () => {
    sliderModal.classList.remove('visible');  
    body.style.overflowY = 'initial';  
})

  

                    //CART FUNCTIONALITY
function updateCounters() {  
    counterElement.innerText = pairsCounter;  
}
incrementBtn.addEventListener('click', () => {
    pairsCounter++;
    updateCounters();
}) 
decrementBtn.addEventListener('click', () => {
    if(pairsCounter == 0) { 
        return 
    }
    pairsCounter--;
    updateCounters();
})
addToCartBtn.addEventListener('click', () => {
    if(pairsCounter >= 1) {   
        if(cartItemWrapper.childElementCount >= 1) {
            return; 
        }else {
            cartItemWrapper.innerText = ''; 
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `<div class="cart-item-details">
                                    <img src="images/image-product-1-thumbnail.jpg" alt="">
                                    <p>Fall Limited Edition Sneakers</p>   
                                    <p>$125.00 x <span id="pairs"></span> <span class="total-price"></span></p>
                                  </div>
                                  <button class="delete-button"><img src="images/icon-delete.svg" alt=""></button>`;

                                  const checkoutBtn = document.createElement('button'); 
                                  checkoutBtn.classList.add('checkout-button');
            checkoutBtn.innerText = 'Checkout';
            cartItemWrapper.append(cartItem); 
            cartModal.append(checkoutBtn); 
            const pairs = document.getElementById('pairs');
            const totalPrice = document.querySelector('.total-price');
            totalPrice.innerText = `$${(pairsCounter * 125).toFixed(2)}`;  
            pairs.innerText = pairsCounter;  
            notification.innerText = pairsCounter;  


            const deleteBtns = document.querySelectorAll('.delete-button');
            deleteBtns.forEach(button => { 
                button.addEventListener('click', () => { 
                    button.parentElement.remove();  
                    if(cartItemWrapper.childElementCount == 0) {
                        cartItemWrapper.innerText = `Your cart is empty`; 
                        checkoutBtn.remove();
                    } 
                }) 
            })
        }
        updateCounters();
    } 
})



                          //SLIDERS
 
mainSlides.forEach((slide,index) => {
    slide.style.left = `${index * 100}%`
})

mainImageThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {  
        mainImageThumbnails.forEach(thumbnail => {
            thumbnail.classList.remove('selected');  
        })   
        thumbnail.classList.add('selected'); 
        mainSlides.forEach(slide => {
            slide.style.transform = `translateX(0)`; 
            slide.style.transform = `translateX(-${index * 100}%)`;
        })  
        currentSlide = index; 
    })
})

lightboxSlides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`
}) 
function carousel() {
    if(currentSlide === lightboxSlides.length) {
        currentSlide = 0;
    }
    if(currentSlide < 0) {
        currentSlide = lightboxSlides.length -1; 
    }
    lightboxSlides.forEach(slide => {
        slide.style.transform = `translateX(-${currentSlide * 100}%)`
        slideThumbnails.forEach(thumbnail => {
            thumbnail.classList.remove('selected');  
        })  
        slideThumbnails[currentSlide].classList.add('selected'); 
    })
}
nextSlideBtn.addEventListener('click', () => {
    currentSlide++;
    carousel();
})
previousSlideBtn.addEventListener('click', () => {
    currentSlide--;
    carousel();
})
slideThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {  
        slideThumbnails.forEach(thumbnail => {
            thumbnail.classList.remove('selected');  
        })  
        thumbnail.classList.add('selected'); 
        lightboxSlides.forEach(slide => {
            slide.style.transform = `translateX(0)`; 
            slide.style.transform = `translateX(-${index * 100}%)`;
        })  
        currentSlide = index; 
    })
})

