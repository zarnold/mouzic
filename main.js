class Tune {
    constructor(targetId, params) {
        const { freq, name } = params
        const targetEl = document.getElementById(targetId)
  
        // Creating the button
        this.tuneContainer = document.createElement("div")
        const playButton = document.createElement("button")
        playButton.addEventListener("click", this.play.bind(this))
        playButton.innerText =name
        this.tuneContainer.appendChild(playButton)

        targetEl.appendChild(this.tuneContainer)
    }

    play() {
        console.log('play')
    }
}

function launch() {
    console.log("======== Launching")
}


launch()

const A = new Tune("keyboard", { freq:440, name:"A" })
const B = new Tune("keyboard", { freq:457, name:"B" })