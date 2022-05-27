
let pathWayToEmojiDreams = './images/Emojis/dreams';
let dreams = [
    {id: 0, Name: 'Drink the best beer', Price: 50, Category: 'Food', ImgPath: `${pathWayToEmojiDreams}/beer.png`},
    {id: 1, Name: 'Rodeo', Price: '200', Category: 'Adventure', ImgPath: `${pathWayToEmojiDreams}/cowboy.png`},
    {id: 2, Name: 'Become a king or queen', Price: 60, Category: 'Adventure', ImgPath: `${pathWayToEmojiDreams}/crown.png`},
    {id: 3, Name: 'Swim with dolphins', Price: 1000, Category: 'Animals', ImgPath: `${pathWayToEmojiDreams}/dolphin.png`},
    {id: 4, Name: 'Travel around the world', Price: 70, Category: 'Travel', ImgPath: `${pathWayToEmojiDreams}/earth.png`},
    {id: 5, Name: 'Master the piano', Price: 300, Category: 'Skill', ImgPath: `${pathWayToEmojiDreams}/keyboard.png`},
    {id: 6, Name: 'The most relaxing massage ', Price: 40 , Category: 'Adventure', ImgPath: `${pathWayToEmojiDreams}/massage.png`},
    {id: 7, Name: 'Drink the oldest wine bottle', Price: 200, Category: 'Food', ImgPath: `${pathWayToEmojiDreams}/wine.png`},
    {id: 8, Name: 'Be the owner of a perfect house', Price: 600, Category: 'Item', ImgPath: `${pathWayToEmojiDreams}/house.png`},
    {id: 9, Name: 'Meet a kind ghost', Price: 200, Category: 'Adventure', ImgPath: `${pathWayToEmojiDreams}/ghost.png`},
    {id: 10, Name: 'Become rich', Price: 100, Category: 'Item', ImgPath: `${pathWayToEmojiDreams}/money.png`},
    {id: 11, Name: 'Travel to the moon', Price: 450, Category: 'Travel', ImgPath: `${pathWayToEmojiDreams}/moon.png`},
    {id: 12, Name: 'Walk on a rainbow', Price: 600, Category: 'Adventure', ImgPath: `${pathWayToEmojiDreams}/rainbow.png`},
    {id: 13, Name: 'Eat the best pizza in life', Price: 430, Category: 'Food', ImgPath: `${pathWayToEmojiDreams}/pizza.png`},
    {id: 14, Name: 'Become a professional pilot', Price: 100, Category: 'Skill', ImgPath: `${pathWayToEmojiDreams}/plane.png`},
    {id: 15, Name: 'Be the owner of a star', Price: 800, Category: 'Item', ImgPath: `${pathWayToEmojiDreams}/star.png`},
    {id: 16, Name: 'Space trip', Price: 600, Category: 'Trip', ImgPath: `${pathWayToEmojiDreams}/rocket.png`},
    {id: 17, Name: 'Meet the Santa', Price: 100, Category: 'Adventure', ImgPath: `${pathWayToEmojiDreams}/santa.png`},
    {id: 18, Name: 'Eat best burger in life', Price: 800, Category: 'Food', ImgPath: `${pathWayToEmojiDreams}/burger.png`},
]

/*
SELECTED ELEMENTS
*/


//Carosuel el
const dreamArticle = document.querySelector('.dreams');
const clouds = document.querySelectorAll(".dreams__carousel--clouds div");
const emojis = document.querySelectorAll(".dreams__carousel--clouds div img");
const dreamName = document.querySelector(".dreams__carousel--name");
const price = document.querySelector(".dreams__carousel--price span");
const addToBasketBtn = document.getElementById('add-to-busket');
const carrouselFingers = document.querySelectorAll('.dreams__carousel--finger')

//Filters el
const searchInput = document.querySelector('.dreams__filters--search div input');
const coastsInput = document.querySelector('.dreams__filters--coast');
const sortSelectFilter = document.querySelector('.dreams__filters--sort')
const categorySelectFilter = document.querySelector('.dreams__filters--categories');

//Hero el
const dreamsBasketList = document.querySelector('.basket__box--list');
const dreamBasketListElem = document.querySelector('.basket__box--list li');
//& hero hidden boxes - userbox, basketbox
const basketStatusText = document.querySelector('.basket__box--title');
const baskteTotalRow = document.querySelector('.basket__box--total-row')
const totalNumber = document.querySelector('.basket__box--total-row h1 span')
const userBox = document.querySelector('.user__box');
const userNavigationIcon = document.getElementById('user-nav');
const close = document.getElementById('close');

/*
SCROLL INTO VIEW
*/
const scrollDownText = document.querySelector('.hero__circle--small');
console.log(scrollDownText)



scrollDownText.addEventListener('click', function(){
    dreamArticle.scrollIntoView({behavior: "smooth", block: "end"});
})

/*
FILTERS FUNCTIONS
*/
const sortDreamsBySearch = (event) => {
    searchingDream = event.target.value.toLowerCase();
    dreams.sort((a,b)=>{
        return b.Name.toLocaleLowerCase().includes(searchingDream) - a.Name.toLocaleLowerCase().includes(searchingDream);
    });
    showFiltredResults(dreams);
};

searchInput.addEventListener('input', sortDreamsBySearch);

const sortByCategory = (event) => {
    const selectedCategory = event.target.value;
    dreams.sort((a,b)=>{
        return b.Category.includes(selectedCategory) - a.Category.includes(selectedCategory);
    });
    showFiltredResults(dreams);
};

categorySelectFilter.addEventListener('change', sortByCategory)


const sortByPrice = (event) => {
    let coastFrom = parseInt(coastsInput.value);
    let indexArr = []
    let filtredCoastArr = [];
    dreams.sort((a,b)=>{ //sorting array by price
        return (a.Price < b.Price) ? -1 : (a.Price > b.Price) ? 0 : 1;
    });
    for (i=0; i<dreams.length; i++) {
        if (dreams[i].Price >= coastFrom) {
            indexArr.push([i]);
        }
    }
    filtredCoastArr = dreams.splice(indexArr[0], indexArr.length);
    for (i=filtredCoastArr.length-1; i>-1; i--) {
        dreams.unshift(filtredCoastArr[i]);
    }
    showFiltredResults(dreams);
}

coastsInput.addEventListener('input', sortByPrice);



const sortBySelect = event => { //sort depends on statement
    searchInput.value = '';
    const choseCategoryValue = event.target.value;
    if (choseCategoryValue == 'A-Z') {
    dreams.sort((a,b)=>{
        return  (a.Name < b.Name) ? -1 : (a.Name > b.Name) ? 0 : 1;
    });
    } else if (choseCategoryValue == 'Z-A') {
        dreams.sort((a,b)=>{
            return (a.Name < b.Name) ? 1 : (a.Name > b.Name) ? -1 : 0;
        });
    } else if (choseCategoryValue == 'From lowest coast')  {
        dreams.sort((a,b)=>{
        return (a.Price < b.Price) ? -1 : (a.Price > b.Price) ? 0 : 1;
        });
    } else if (choseCategoryValue == 'From highest coast')   {
        dreams.sort((a,b)=>{
        return (a.Price < b.Price) ? 1 : (a.Price > b.Price) ? -1 : 0;
        });
    }
    showFiltredResults(dreams);
}


sortSelectFilter.addEventListener('change', sortBySelect);



function showFiltredResults(sortedDreams) {
    dreams.unshift(dreams.pop()); //make last elements first, searched elements starts from middle cloud to right
    for (i=0; i<clouds.length; i++) {
        clouds[i].firstElementChild.setAttribute('src', dreams[i].ImgPath);
        clouds[i].setAttribute('orderData', i+1);
        clouds[i].style.order = i+1
        if (clouds[i].getAttribute('orderData') === '2') {
            clouds[i].classList.add('dreams__carousel--cloud')
            clouds[i].classList.remove('dreams__carousel--cloud-side')
        } else {
            clouds[i].classList.add('dreams__carousel--cloud-side')
            clouds[i].classList.remove('dreams__carousel--cloud')
        }
    }
    dreamName.innerHTML = dreams[1].Name;
    price.innerHTML = dreams[1].Price;
    // Reseting counters,order after user used filters
    arrCloudsOrder = [1,2,3]
    counter = 1;
    counterRight = 2;
    counterLeft = 0;
}



/*
CAROUSEL
*/
function directionOfSliding(event) {
    let clickedFinger = event.target;
    if (clickedFinger.classList.contains('finger-right')) {
        changingOrdersOfClouds(-1)
    } else if (clickedFinger.classList.contains('finger-left')) {
        changingOrdersOfClouds(+1)
    }
}

carrouselFingers.forEach(elem => {
    elem.addEventListener('click', directionOfSliding);
});

let arrCloudsOrder = [];
let changableCloudsOrderArr = []

//I wrote this animation for add animation on clouds changing order. I will back to that
function changingOrdersOfClouds(sign) {
    const direction = sign == 1 ? 'left' : 'right'
    for (let i=0; i<clouds.length; i++) {
        arrCloudsOrder.push(parseInt(clouds[i].getAttribute('orderData')));
        arrCloudsOrder[i] = arrCloudsOrder[i] + sign;
        if (arrCloudsOrder[i]>3) {
            arrCloudsOrder[i] = 1;
        } else if (arrCloudsOrder[i]<1) {
            arrCloudsOrder[i] = 3;
        }
        clouds[i].setAttribute('orderData', arrCloudsOrder[i]);
        clouds[i].style.order = arrCloudsOrder[i];
        if (clouds[i].getAttribute('orderData') === '2') {
            clouds[i].classList.add('dreams__carousel--cloud')
            clouds[i].classList.remove('dreams__carousel--cloud-side')
        } else {
            clouds[i].classList.add('dreams__carousel--cloud-side')
            clouds[i].classList.remove('dreams__carousel--cloud')
        }
    }
    arrCloudsOrder.length = 3;
    emojiIconSlide(direction)
}

let counter = 1 // counter for single elements
let counterRight = 2; // counter for right cloud
let counterLeft = 0; // counter for left cloud


function emojiIconSlide(direction) {
    if (direction === 'right') {
        slideRight();
    } else {
        slideLeft();
    }
}

function slideLeft() {
    counterLeft = counterLeft - 1
    counterRight = counterLeft + 2
    counter = counter - 1
    if (counterLeft < 0) {
        counterLeft = dreams.length-1;
    }
    for (i=0; i<clouds.length; i++) {
        if (clouds[i].getAttribute('orderData') === '1')
        clouds[i].firstElementChild.setAttribute('src', dreams[counterLeft].ImgPath);
    }
    if (counter < 0) {
        counter = dreams.length-1;
    }
    dreamName.innerHTML = dreams[counter].Name;
    price.innerHTML = dreams[counter].Price;
}


function slideRight() {
    counterRight = counterRight + 1
    counterLeft = counterRight - 2
    counter = counter + 1
    if (counterRight > dreams.length-1) {
        counterRight = 0;
    }
    for (i=0; i<clouds.length; i++) {
        if (clouds[i].getAttribute('orderData') === '3')
        clouds[i].firstElementChild.setAttribute('src', dreams[counterRight].ImgPath);
    }
    if (counter > dreams.length-1) {
        counter = 0;
    }
    dreamName.innerHTML = dreams[counter].Name;
    price.innerHTML = dreams[counter].Price;
}

/*
BOXES
*/
let openCloseElementsUserBox = [close, userNavigationIcon]
openCloseElementsUserBox.forEach(elem=>{
    elem.addEventListener('click', function(event){
        userBox.classList.toggle('hidden');
    });
});


let basketArray = []
//Adding dreams to basket
function addToBasket(event) {
    basketStatusText.innerHTML = 'Choosed dreams';
    baskteTotalRow.style.display = 'block';
    let element = dreams[counter].Name;
    let checkingDreamIsAlreadyAdd = basketArray.some(dream =>{
        return dream.Name === element;
    })
    if (basketArray.length > 4) {
        basketArray.length = 4;
    }
    if (!checkingDreamIsAlreadyAdd) {
        basketArray.push(dreams[counter]);
        updateBasket()
    }
}

// update dreams
function updateBasket() {
    renderDreamsInBasket();
    renderTotal();
    deleteDreams();
}

//caclulate and render total

function renderTotal() {
    let totalPrice = 0
    basketArray.forEach((dreamPrice)=> {
        totalPrice += parseInt(dreamPrice.Price);
    });
    totalNumber.innerHTML = totalPrice
}

// render cart dream
function renderDreamsInBasket() {
        dreamsBasketList.innerHTML = ""; //clear basket element
    basketArray.forEach((dream) => {
        dreamsBasketList.innerHTML += `
        <li id="${dream.id}" class="basket__box--list-element">
            <img class='basket__box--list-element-image'src="${dream.ImgPath}">
            <span class="basket__box--list-element-name">${dream.Name}</span>
            <span class="basket__box--list-element-price">${dream.Price}</span>
            <img src="./images/delete.png" class="basket__box--list-element-bean" alt="rubbish bean">
        </li>
        `
    })
}

let deltedPrice = 0;

//Adding event listners to every added bean
function deleteDreams() {
    let deleteBins = document.querySelectorAll('.basket__box--list-element-bean')
    deleteBins.forEach(elem=> {
        elem.addEventListener('click', function(event){
            let deletingDreamId = parseInt(event.target.parentElement.getAttribute('id'));
            for (i=0; i<basketArray.length; i++) {
                if (basketArray[i].id == deletingDreamId) {
                    basketArray.splice(i,1)
                }
            }
            event.target.parentElement.remove();
            renderTotal(); //change total
            if (basketArray.length == 0) {
                setEmptyBasket();
            }
        });
    });
};


//Reset styles for basket box if basketArray lenght is 0
function setEmptyBasket() {
    basketStatusText.innerHTML = 'Basket is empty';
    baskteTotalRow.style.display = 'none';
}
addToBasketBtn.addEventListener('click', addToBasket);



