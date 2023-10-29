let dn = document.querySelector('.tgl')
const textContainer = document.getElementById("textContainer");


dn.addEventListener('click', function(){
    dn.classList.toggle('active')
    day()
})


let isDayMode = false; // Изначально установлен дневной режим

function toggleMode() {
    let container = document.querySelector('.container');
    let colorSpeed = document.querySelector('.speed');
    let colorInput = document.querySelector('.inpt');
    
    if (isDayMode) {
        container.style.background = '#000';
        colorSpeed.style.color = '#fff';
        colorInput.style.color = '#fff';
        textContainer.style.color = '#fff'
    } else {
        container.style.background = '#ffff';
        colorSpeed.style.color = '#000';
        colorInput.style.color = '#000';
        textContainer.style.color = '#000'

    }
    
    isDayMode = !isDayMode; // Переключаем режим
}

const toggleButton = document.getElementById('toggleButton');
toggleButton.addEventListener('click', toggleMode);


let currentWordIndex = 0;
let intervalId;
let isReading = false;
let isPaused = false;

function startReading() {
    const startButton = document.getElementById("startButton");
    const pauseButton = document.getElementById("pauseButton");
    const textInput = document.getElementById("textInput");
    const textContainer = document.getElementById("textContainer");
    const speedRange = document.getElementById("speedRange");
    const boxInfo = document.querySelector('.box-info')


    if (!isReading) {
        const inputText = textInput.value.trim().split(' ');

        if (inputText.length === 0) {
            alert("Введите текст для скорочтения.");
            return;
        }
        boxInfo.style.display = "none"
        startButton.style.display = "none";
        pauseButton.style.display = "block";
        textInput.style.display = "none";
        textContainer.style.display = "block";
        isReading = true;
        isPaused = false;

        const speed = parseInt(speedRange.value);

        intervalId = setInterval(() => {
            if (!isPaused) {
                if (currentWordIndex < inputText.length) {
                    textContainer.textContent = inputText[currentWordIndex];
                    currentWordIndex++;
                } else {
                    clearInterval(intervalId);
                    isReading = false;
                    startButton.style.display = "block";
                    pauseButton.style.display = "none";
                    stopButton.style.display = "none";
                    textInput.style.display = "block";
                    textContainer.style.display = "none";
                    currentWordIndex = 0;
                }
            }
        }, 1000 / speed);
    }
}

function pauseReading() {
    if (isReading && !isPaused) {
        isPaused = true;
        document.getElementById("pauseButton").textContent = "Пауза";
    } else if (isReading && isPaused) {
        isPaused = false;
        document.getElementById("pauseButton").textContent = "Продолжить";
    }
}



function loadTextFromFile() {
    const fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const text = e.target.result;
            document.getElementById("textInput").value = text;
        };
        reader.readAsText(file);
    });
}

const loadButton = document.getElementById("loadButton");
loadButton.addEventListener("click", () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
});

loadTextFromFile();
