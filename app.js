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

function startReading() {
    const startButton = document.getElementById("startButton");
    const stopButton = document.getElementById("stopButton");

    const textInput = document.getElementById("textInput");
    const speedRange = document.getElementById("speedRange");
    const boxInfo = document.querySelector('.box-info')

    if (!isReading) {
        const inputText = textInput.value.trim().split(' ');

        if (inputText.length === 0) {
            alert("Введите текст для скорочтения.");
            return;
        }

        startButton.style.display = "none";
        stopButton.style.display = "block";
        textInput.style.display = "none";
        boxInfo.style.display = "none"
        textContainer.style.display = "block";
        isReading = true;

        const speed = parseInt(speedRange.value);

        intervalId = setInterval(() => {
            if (currentWordIndex < inputText.length) {
                textContainer.textContent = inputText[currentWordIndex];
                currentWordIndex++;
            } else {
                clearInterval(intervalId);
                isReading = false;
                startButton.style.display = "block";
                textInput.style.display = "block";
                boxInfo.style.display = "block"
                stopButton.style.display = "none";

                textContainer.style.display = "none";
                currentWordIndex = 0;
            }
        }, 1000 / speed);
    }
}

function stopReading() {
    if (isReading) {
        clearInterval(intervalId);
        isReading = false;
        boxInfo.style.display = 'block';
        document.getElementById("startButton").style.display = "block";
        document.getElementById("stopButton").style.display = "none";
        document.getElementById("textInput").style.display = "block";
        document.getElementById("textContainer").style.display = "none";
        currentWordIndex = 0;
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





