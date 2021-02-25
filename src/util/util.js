export const minTime = 0.001;

export const clamp = (val, min, max) => Math.min(max, Math.max(min, val));

// Keyboard key to note map
const noteMap = {
    'a': 'C0',
    'w': 'C#0',
    's': 'D0',
    'e': 'D#0',
    'd': 'E0',
    'f': 'F0',
    't': 'F#0',
    'g': 'G0',
    'y': 'G#0',
    'h': 'A0',
    'u': 'A#0',
    'j': 'B0',
    'k': 'C1',
    'o': 'C#1',
    'l': 'D1',
    'p': 'D#1',
    ';': 'E1',
};

// Frequency of 3rd octave
const freqMap = {
    'C': 261.63,
    'C#': 277.18,
    'D': 293.66,
    'D#': 311.13,
    'E': 329.63,
    'F': 349.23,
    'F#': 369.99,
    'G': 392.00,
    'G#': 415.30,
    'A': 440.00,
    'A#': 466.16,
    'B': 493.88,
};

// Gets the note info based on the key pressed and octaveMod
export const getNoteInfo = (key, octaveMod) => {
    const noteInfo = noteMap[key];
    if (!noteInfo) return false;

    const note = noteInfo.slice(0, -1);
    const oct = parseInt(noteInfo.slice(-1)) + octaveMod;
    const freq = freqMap[note] * Math.pow(2, oct - 3);

    return { note: `${note}${oct}`, oct, freq };
};
