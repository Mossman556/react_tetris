
export const audioContext = new (window.AudioContext || window.AudioContext)();


class AudioManager {
  private soundBank: { [key: string]: HTMLAudioElement };

  constructor() {
    this.soundBank = {};
    this.loadSounds();
  }

  playSFX(sfxName: string) {
    const audio = this.soundBank[sfxName];
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  private loadSounds() {
    this.soundBank = {
      erase4: new Audio('/sounds/erase4.ogg'),
    };
  }
}





export const audioManager = new AudioManager();




export function playSquareWaveSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
  
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set frequency to 440 Hz (A4 note)
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Set volume to 10%
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5); // Fade out over 0.5 seconds
  
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
  
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5); // Stop playing after 0.5 seconds
  }
  

export async function playSound(url: string) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
}



