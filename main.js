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
    if (this.type === "custom") {
      const n = 64;
      var real;
      var imag;

      real = [0,1, 0.4, 0.8, 0.1, 0.3, 0.6, 0.2, 0.1, 0.1, 0.05];
      imag = new Array(real.length).fill(0);

      var wave = contexteAudio.createPeriodicWave(real, imag, {
        disableNormalization: false,
      });
      // if you use your own periodic wave,
      // do not set type
      oscillator.setPeriodicWave(wave);
    } else {
      oscillator.type = this.type;
    }

    oscillator.connect(contexteAudio.destination);

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
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];

const A_STANDARD_PITCH = 440;

const tuneValues = tunesName.map((note, idx) => ({
  name: note,
  freq: A_STANDARD_PITCH * 1.05946 ** idx,
}));

// Functionnal programming
tuneValues.map((note) => new Tune("keyboard", { type: "sine", ...note }));
tuneValues.map(
  (note) => new Tune("keyboard-square", { type: "square", ...note })
);
tuneValues.map(
  (note) => new Tune("keyboard-sawtooth", { type: "sawtooth", ...note })
);
tuneValues.map(
  (note) => new Tune("keyboard-triangle", { type: "triangle", ...note })
);
tuneValues.map(
  (note) => new Tune("keyboard-custom", { type: "custom", ...note })
);
