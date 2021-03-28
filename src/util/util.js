export const minTime = 0.005;

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

// Frequency of 4th octave
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
export const getNoteInfo = (key, octaveMod = 4) => {
    const noteInfo = noteMap[key];
    if (!noteInfo) return false;

    const note = noteInfo.slice(0, -1);
    const oct = parseInt(noteInfo.slice(-1)) + octaveMod;
    const freq = freqMap[note] * Math.pow(2, oct - 4);

    return { note: `${note}${oct}`, oct, freq };
};

// - SVG Path Maps -
export const WAVEFORM = {
    sine: 'M 10 25 Q 18 10 25 25 Q 32 40 40 25',
    triangle: 'M 10 25 L 19 16 L 31 34 L 40 25',
    square: 'M 10 32 L 10 18 L 25 18 L 25 32 L 40 32 L 40 18',
    sawtooth: 'M 10 32 L 10 18 L 25 32 L 25 18 L 40 32 L 40 18',
};

export const FILTER = {
    lowpass: 'M 10 22 L 26 22 L 31 16 L 40 34',
    highpass: 'M 40 22 L 24 22 L 19 16 L 10 34',
    bandpass: 'M 10 34 L 15 34 L 21 16 L 29 16 L 35 34 L 40 34',
    notch: 'M 10 16 L 15 16 L 21 34 L 29 34 L 35 16 L 40 16',
    lowshelf: 'M 10 16 L 20 16 L 30 34 L 40 34',
    highshelf: 'M 10 34 L 20 34 L 30 16 L 40 16',
};

export const REVERB = {
    reverb1: 'M 20 20 A 8.5 5 0 1 1 30 20 A 3 2.5 0 1 1 30 30 A 8.5 5 0 1 1 20 30 A 3 2.5 0 1 1 20 20',
    reverb2: 'M 18 18 A 4 4 0 1 1 32 18 A 7 7 0 1 1 32 32 A 4 4 0 1 1 18 32 A 7 7 0 1 1 18 18',
    reverb3: 'M 20 22 A 2 2 0 1 1 30 22 A 3 1 0 1 1 30 28 A 2 2 0 1 1 20 28 A 3 1 0 1 1 20 22',
    reverb4: 'M 22 20 Q 25 22 28 20 A 8 8 0 1 1 28 30 Q 25 28 22 30 A 8 8 0 1 1 22 20',
    reverb5: 'M 22 20 A 4 4 0 1 1 28 20 A 6 6 0 1 1 28 30 A 4 4 0 1 1 22 30 A 6 6 0 1 1 22 20',
    reverb6: 'M 15 25 A 10 10 0 1 1 15 25.1',
};
