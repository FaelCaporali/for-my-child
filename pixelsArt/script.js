window.onload = function () {
  let colors = document.getElementsByClassName("color");
  // função que gera código rgb randômico
  let geraCor = function () {
    let r = parseInt(Math.random() * 255);
    let g = parseInt(Math.random() * 255);
    let b = parseInt(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  };
  // preenche a paleta com cores randômicas
  function randomPaleteColor() {
    for (let i = 1; i < colors.length; i += 1) {
      colors[i].style.backgroundColor = geraCor();
    }
  }
  //Primeiro ítem da paleta é preto
  function firstColorBlack() {
    document.querySelector(".color").style.backgroundColor = "black";
    document.querySelector(".color").classList.add("selected");
  }
  //seleciona a classe clicada
  function selectClass(event) {
    let boxSelected = document.getElementsByClassName("selected");

    if (boxSelected.length == 0) {
      event.target.classList.add("selected");
    } else {
      boxSelected[0].classList.remove("selected");
      document.getElementById("colorInputBox").classList.remove("selection");
      event.target.classList.add("selected");
    }
    if (boxSelected[0] == document.getElementById("colorInput")) {
      document.getElementById("colorInputBox").classList.add("selection");
    }
  }
  //adiciona os eventListeners para selecionar a classe em paletas
  function settingListeners() {
    for (let i = 0; i < colors.length; i += 1) {
      colors[i].addEventListener("click", selectClass);
    }
    document
      .getElementById("colorInput")
      .addEventListener("click", selectClass);
  }
  //tira o fundo da caixa input type=color
  function inputBoxColor() {
    let input = document.getElementById("colorInput");
    let inputBox = document.getElementById("colorInputBox");
    input.addEventListener("change", function () {
      inputBox.style.backgroundColor = input.value;
    });
    inputBox.style.backgroundColor = input.value;
  }
  //pinta o pixel
  function paint(event) {
    let selecionado = document.querySelector(".selected");
    if (selecionado.tagName == "DIV") {
      event.target.style.backgroundColor = selecionado.style.backgroundColor;
    } else {
      event.target.style.backgroundColor = selecionado.value;
    }
  }
  //add Event Listener para pixels
  function pixelsListeners() {
    let pixels = document.getElementsByClassName("pixel");
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].addEventListener("click", paint);
    }
  }
  //limpa o quadro
  function clear() {
    let pixels = document.getElementsByClassName("pixel");
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = "white";
    }
  }
  // instalando input de numero
  function numberInput() {
    let inputNumber = document.getElementById("board-size");
    inputNumber.max = 50;
    inputNumber.min = 5;
    inputNumber.required = true;
  }
  //button generate new box handler
  function resetBoardHandler() {
    let num = document.getElementById("board-size").value;
    if (num <= 0) {
      return window.alert("Board inválido!");
    } else {
        adjustNumbers();
        eraseBoard();
        createNewBoard();
    }
  }
  //Ajusta números
  function adjustNumbers() {
    let parametro = document.getElementById("board-size").value;
    if (parametro > 50) {
      parametro = 50;
    } else if (parametro < 5) {
      parametro = 5;
    }
    return parametro;
  }
//cria nova tabela
  function createNewTable (){
    let table = document.createElement("table");
    let mae = document.getElementById("tela");
    table.id = "pixel-board";
    mae.appendChild(table);
  }
  //busca tabela, cria linha e a percorre, cria linha e a percorre...
    function createNewBoard() {
    let parametro = adjustNumbers();
    createNewTable();
    let table = document.querySelector("table");
    for (let i = 1; i <= parametro; i += 1) {
      let line = document.createElement("tr");
      table.appendChild(line);
      for (let x = 1; x <= parametro; x += 1) {
        let celula = document.createElement("td");
        celula.classList.add("pixel");
        line.appendChild(celula);
      }
    }
    pixelsListeners();
  }
  //deletando board antiga
  function eraseBoard() {
    document.querySelector("table").remove();
  }
  //eventListener para botão VQV
  document
    .getElementById("generate-board")
    .addEventListener("click", resetBoardHandler);
  //eventListener do botão clear
  document.getElementById("clear-board").addEventListener("click", clear);
  // funções de inicialização
  numberInput();
  inputBoxColor();
  randomPaleteColor();
  firstColorBlack();
  settingListeners();
  pixelsListeners();

  function randomColor (event) {
    event.target.style.backgroundColor = geraCor();
  };
  function ativaRandomColor(event) {
    let pi = document.querySelectorAll('.pixel');
    if (event.target.innerText !== 'desativa aleatório') {
      event.target.innerText = 'desativa aleatório';
      for (i in pi) {
        pi[i].addEventListener('click', randomColor);
        pi[i].removeEventListener('click', paint)
      };
    } else {
      event.target.innerText = 'ativa aleatório';
      pixelsListeners();
      for (i in pi) {
        pi[i].removeEventListener('click', randomColor);
      };
    };
  };
  document.getElementById('random').addEventListener('click', ativaRandomColor);
};
