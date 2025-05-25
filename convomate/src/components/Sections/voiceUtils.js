// convomate/src/components/Sections/voiceUtils.js
export const loadVoices = () => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
    }
  });
};

export const getDefaultVoice = (voices) => {
  // Try to find Google US English first
  const googleUS = voices.find(
    (voice) =>
      voice.name.includes("Google US English") ||
      voice.name.includes("English United States"),
  );

  // Fallback to first English voice
  const englishVoice = voices.find(
    (voice) => voice.lang.includes("en-US") || voice.lang.includes("en_GB"),
  );

  return googleUS || englishVoice || voices[0];
};
