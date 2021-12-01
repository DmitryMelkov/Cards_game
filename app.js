(() => {
  //задание количества карточек
  let input = document.querySelector("#memory-input__input");
  let buttonRun = document.querySelector("#memory-input__btn");
  let buttonReset = document.querySelector("#memory-btn__reset");

  let inputValue;

  let memoryCardItem = document.querySelector(".memory-card__item");

  let hasFlippedCard = false; //перевернутая карта
  let lockBoard = false; //блокировка
  let firstCard;
  let secondCard;

  //появление/исчезание заголовка с вводом кол-ва карточек
  const inputTitle = document.querySelector(".memory-input");
  if (inputValue == undefined) {
    inputTitle.style.display = "flex";

  }

  buttonRun.addEventListener("click", function () {
    inputValue = input.value;
    createNewGrid(inputValue);
    if (inputValue >= 0) {
      inputTitle.style.display = "none";
      buttonReset.style.display = "block";
    }
  });

  buttonReset.addEventListener("click", function () {
    window.history.go(0); //метод для загрузки определенной страницы из истории сеанса (0 - текущая страница)
  });

  //от преподавателя
  const cardImgUrls = [
    {
      src: "../img/vue.svg",
      alt: "Aurelia",
      attribute: "aurelia",
    },
    {
      src: "../img/aurelia.svg",
      alt: "Vue",
      attribute: "vue",
    },
    {
      src: "../img/angular.svg",
      alt: "Angular",
      attribute: "angular",
    },
    {
      src: "../img/ember.svg",
      alt: "Ember",
      attribute: "ember",
    },
    {
      src: "../img/backbone.svg",
      alt: "Backbone",
      attribute: "backbone",
    },
    {
      src: "../img/react.svg",
      alt: "React",
      attribute: "react",
    },
    {
      src: "../img/django.svg",
      alt: "Django",
      attribute: "django",
    },
    {
      src: "../img/pyramid.svg",
      alt: "Pyramid",
      attribute: "pyramid",
    },
    {
      src: "../img/python.svg",
      alt: "Python",
      attribute: "python",
    },
  ];

  function createNewGrid(count) {
    let cardsArray = [];
    for (let i = 1; i <= count / 2; i++) {
      cardsArray.push(i, i);
    }

    cardsArray.sort(() => Math.random() - 0.5);

    for (const num of cardsArray) {
      //создаем объекты
      let memoryCard = document.createElement("div");
      memoryCard.classList.add("memory-card");
      memoryCard.setAttribute("data-framework", cardImgUrls[num].attribute);
      memoryCardItem.append(memoryCard);

      let frontFace = document.createElement("img");
      frontFace.src = cardImgUrls[num].src;
      frontFace.alt = cardImgUrls[num].alt;
      frontFace.classList.add("front-face");
      memoryCard.append(frontFace);

      let backFace = document.createElement("img");
      backFace.src = "../img/js-badge.svg";
      backFace.alt = "JS Badge";
      backFace.classList.add("back-face");

      memoryCard.addEventListener("click", flipCard);
      memoryCard.append(backFace);
    }
  }


  //переворачивает карту
  function flipCard() {
    if (lockBoard) {
      return;
    }

    //дважды щелкнув на карту
    if (this === firstCard) {
      return;
    }

    this.classList.add("flip");

    if (!hasFlippedCard) {
      // first click
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    //second click
    secondCard = this;

    checkForMatch();
  }

  //сравнивает 2 карты
  function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
      const title = document.querySelector(".memory-card__title");
      let flips = document.querySelectorAll(".flip").length;
      let numberCards = document.querySelectorAll(".memory-card").length;

      if (flips == numberCards) {
        title.style.display = "block";
        memoryCardItem.style.display = "none"
      }

      disableCards();
      return;
    }

    unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
  }

  //переворачивает обратно
  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 500);
  }

  //дважды щелкнув на карту чтобы сбрасывалось
  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
})();
