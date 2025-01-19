// Your script here.

const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');

let speechSynthesis = window.speechSynthesis;
let currentSpeech = null;

// Function to populate the voice select menu
function populateVoices() {
  if (speechSynthesis.getVoices().length > 0) {
    speechSynthesis.getVoices().forEach(voice => {
      const option = document.createElement('option');
      option.textContent = voice.name;
      option.value = voice;
      voiceSelect.appendChild(option);
    });
  } else {
    const option = document.createElement('option');
    option.textContent = 'No voices available';
    option.disabled = true;
    voiceSelect.appendChild(option);
  }
}

// Function to speak the text
function speak() {
  if (!currentSpeech) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = textInput.value;
    utterance.voice = voiceSelect.value;
    utterance.rate = rateInput.value;
    utterance.pitch = pitchInput.value;
    currentSpeech = utterance;
    utterance.onend = () => {
      currentSpeech = null;
      stopButton.disabled = true;
      startButton.disabled = false;
    };
    speechSynthesis.speak(utterance);
    stopButton.disabled = false;
    startButton.disabled = true;
  }
}

// Function to stop speaking
function stop() {
  if (currentSpeech) {
    currentSpeech.cancel();
    currentSpeech = null;
    stopButton.disabled = true;
    startButton.disabled = false;
  }
}

// Event listeners
startButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);
rateInput.addEventListener('change', () => {
  if (currentSpeech) {
    currentSpeech.rate = rateInput.value;
  }
});
pitchInput.addEventListener('change', () => {
  if (currentSpeech) {
    currentSpeech.pitch = pitchInput.value;
  }
});

populateVoices();