document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  keyMapper(100, playNotes);
});

function keyMapper(keystrokeDelay, callback) {
  const charList = "ADEFGHJKLOPSTUWYZ";

  let lastKeyTime = Date.now();
  let buffer = [];

  document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();

    if (charList.indexOf(key) === -1) {
      return;
    }

    const currentTime = Date.now();

    if (currentTime - lastKeyTime > keystrokeDelay) {
      buffer = [];
    }

    let tKey = wKeyNote(key);

    buffer.push(tKey);
    lastKeyTime = currentTime;

    if (buffer.length < 2) {
      kP = document.querySelector(`.key[data-key="${event.keyCode}"]`);
      kP.classList.add("playing");
      callback(buffer);

      setTimeout(function () {
        kP.classList.remove("playing");
      }, 200);
    }
  });
}

function playNotes(notes) {
  let ac = new AudioContext();
  let tempo = 140;
  let sequence = new TinyMusic.Sequence(ac, tempo, notes);

  sequence.loop = false;
  sequence.play();
}

function wKeyNote(keyNote) {
  let octave = document.getElementById("octave").value;

  switch (keyNote) {
    case "A":
      return `C${octave} q`;
    case "W":
      return `C#${octave} q`;
    case "S":
      return `D${octave} q`;
    case "E":
      return `D#${octave} q`;
    case "D":
      return `E${octave} q`;
    case "F":
      return `F${octave} q`;
    case "T":
      return `F#${octave} q`;
    case "G":
      return `G${octave} q`;
    case "Y":
      return `G#${octave} q`;
    case "H":
      return `A${octave} q`;
    case "U":
      return `A#${octave} q`;
    case "J":
      return `B${octave} q`;
    case "K":
      return `C${parseInt(octave) + 1} q`;
    case "L":
      return `C#${parseInt(octave) + 1} q`;
    case "P":
      return `D${parseInt(octave) + 1} q`;
    case "Z":
      return `D#${parseInt(octave) + 1} q`;
    default:
      return "- q";
  }
}

function changeRange(newVal) {
  let octVal = document.getElementById("oct-val");

  octVal.innerHTML = `Range: C${newVal} - D#${parseInt(newVal) + 1}`;
}
