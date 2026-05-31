// Web Audio API Synthesizer for Tarot applications
// Generates ambient mystical soundscapes dynamically without asset files.

export function playChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Deep crystal bowl vibration
    const oscMain = ctx.createOscillator();
    const gainMain = ctx.createGain();
    oscMain.type = "sine";
    oscMain.frequency.setValueAtTime(147.14, ctx.currentTime); // D3 note: meditative hum
    gainMain.gain.setValueAtTime(0.2, ctx.currentTime);
    gainMain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    
    oscMain.connect(gainMain);
    gainMain.connect(ctx.destination);
    
    oscMain.start();
    oscMain.stop(ctx.currentTime + 1.6);
    
    // Shimmering celestial chimes (pentatonic notes ascending)
    const now = ctx.currentTime;
    const notes = [587.33, 659.25, 783.99, 880.00, 1174.66]; // D5, E5, G5, A5, D6 (magical celestial chords)
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      
      // Ring modulation effect
      const subHarmonic = ctx.createOscillator();
      const subGain = ctx.createGain();
      subHarmonic.type = "triangle";
      subHarmonic.frequency.setValueAtTime(freq * 1.503, now + idx * 0.12); // Intricate chime overtone
      
      gainNode.gain.setValueAtTime(0.0, now);
      gainNode.gain.setValueAtTime(0.12, now + idx * 0.12);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.8);
      
      subGain.gain.setValueAtTime(0.04, now + idx * 0.12);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);

      osc.connect(gainNode);
      subHarmonic.connect(subGain);
      
      gainNode.connect(ctx.destination);
      subGain.connect(ctx.destination);
      
      osc.start(now + idx * 0.12);
      subHarmonic.start(now + idx * 0.12);
      
      osc.stop(now + idx * 0.12 + 1.0);
      subHarmonic.stop(now + idx * 0.12 + 0.5);
    });
  } catch (e) {
    // Fail silently when audio is blocked or unsupported
  }
}

export function playCardFlip() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    const now = ctx.currentTime;
    
    // Paper friction noise sweep
    const bufferSize = ctx.sampleRate * 0.2; // 200ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      channelData[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(400, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(1400, now + 0.15);
    noiseFilter.Q.setValueAtTime(1.5, now);
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.03, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    
    // Intricate crystal ping on flip completion
    const chimeOsc = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chimeOsc.type = "sine";
    chimeOsc.frequency.setValueAtTime(880.00, now); // A5 note
    chimeOsc.frequency.exponentialRampToValueAtTime(1760.00, now + 0.08); // slide up
    
    chimeGain.gain.setValueAtTime(0.05, now);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    chimeOsc.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    
    noiseSource.start(now);
    chimeOsc.start(now);
    
    noiseSource.stop(now + 0.22);
    chimeOsc.stop(now + 0.22);
  } catch (e) {
    // Fail silently
  }
}

export function playDrawCard() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    // Low sweeping air whoosh
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(270, now + 0.25);
    
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.27);
  } catch (e) {
    // Fail silently
  }
}
