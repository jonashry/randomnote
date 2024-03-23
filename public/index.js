const context = new AudioContext();
const A = 55.00;
const step_to_note = {
    0: "A",
    1: "A#",
    2: "B",
    3: "C",
    4: "C#",
    5: "D",
    6: "D#",
    7: "E",
    8: "F",
    9: "F#",
    10: "G",
    11: "G#"
}

function generateNote() {
    var randomOctave = Math.floor(Math.random()*3+1); 
    var randomStep = Math.floor(Math.random()*11);
    var randomFrequency = getNoteFrequency(randomOctave, randomStep);
    document.getElementById("note").innerText = randomFrequency.toFixed(2) + "Hz - " + getNoteName(randomOctave, randomStep);

    oscillator = context.createOscillator();
    
    oscillator.type = "sine"
    oscillator.frequency.value = randomFrequency;

    const gainNode = context.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    gainNode.gain.exponentialRampToValueAtTime(0.000001, context.currentTime+5);
    oscillator.start(0);
}

function getNoteName(octave, step) {
    return step_to_note[step]+octave.toString();
}

function getNoteFrequency(octave, step) {
    var exponent = (12*(octave-1)+step)/12; 
    return A*Math.pow(2, exponent)
}