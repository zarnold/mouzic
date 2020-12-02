var contexteAudio = new (window.AudioContext || window.webkitAudioContext)();

class Tune {
  constructor(targetId, params) {
    const { freq, name, type } = params;
    const targetEl = document.getElementById(targetId);

    this.freq = freq;
    this.type = type;
    // Creating the button
    this.tuneContainer = document.createElement("div");
    const playButton = document.createElement("div");
    this.tuneContainer.classList.add("key");
    if (name.includes("#")) {
      this.tuneContainer.classList.add("blackKey");
    } else {
      this.tuneContainer.classList.add("whiteKey");
    }

    this.tuneContainer.addEventListener("click", this.play.bind(this));
    this.tuneContainer.innerText = name;

    this.tuneContainer.appendChild(playButton);

    targetEl.appendChild(this.tuneContainer);
  }

  play() {
    console.log(`Playing Frequency ${this.freq}`);

    // create Oscillator node
    var oscillator = contexteAudio.createOscillator();
    oscillator.connect(contexteAudio.destination);
    oscillator.type = this.type;
    oscillator.frequency.value = this.freq; // valeur en hertz

    oscillator.start();
    oscillator.stop(contexteAudio.currentTime + 1);
  }
}

function launch() {
  console.log("======== Launching");
}

launch();
// C = Do
const tunesName = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
console.log(tunesName.length);
const tuneValues = tunesName.map((note, idx) => ({
  name: note,
  freq: 261.626 * 1.05946 ** idx,
}));

tuneValues.map((note) => new Tune("keyboard", { type:"sine", ...note }));
tuneValues.map((note) => new Tune("keyboard-square", { type:"square", ...note }));
tuneValues.map((note) => new Tune("keyboard-sawtooth", { type:"sawtooth", ...note }));
tuneValues.map((note) => new Tune("keyboard-triangle", { type:"triangle", ...note }));
tuneValues.map((note) => new Tune("keyboard-custom", { type:"sine", ...note }));