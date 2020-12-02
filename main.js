var contexteAudio = new (window.AudioContext || window.webkitAudioContext)();


class Tune {
    constructor(targetId, params) {
        const { freq, name } = params
        const targetEl = document.getElementById(targetId)
  
        this.freq=freq

        // Creating the button 
        this.tuneContainer = document.createElement("div")
        const playButton = document.createElement("button")
        playButton.addEventListener("click", this.play.bind(this))
        playButton.innerText =name
        this.tuneContainer.appendChild(playButton)

        targetEl.appendChild(this.tuneContainer)
    }

    play() {
        console.log(`Playing Frequency ${this.freq}`)

        // create Oscillator node
        var oscillator = contexteAudio.createOscillator();
        oscillator.connect(contexteAudio.destination);
        oscillator.type = 'sine';
        oscillator.frequency.value = this.freq; // valeur en hertz

        oscillator.start();
        oscillator.stop(contexteAudio.currentTime + 1)
    }
}

function launch() {
    console.log("======== Launching")
}


launch() 
// C = Do
const tunesName=['C','C#','D','D#','E','F','F#','G','G#', 'A','A#','B',]
console.log(tunesName.length)
const tuneValues = tunesName.map( (note, idx) => ({name:note, freq:261.626 * (1.05946**idx)}))


tuneValues.map(note => new Tune("keyboard", note))
const A = new Tune("keyboard", { freq:440, name:"A" })
const B = new Tune("keyboard", { freq:457, name:"B" })