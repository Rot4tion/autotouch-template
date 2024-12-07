export const testPlayAudio = () => {
  const audioFilePath = "./resources/audio.mp3";

  const repeatTimes = 5;

  // Play an audio file with speicified repeat times
  at.playAudio(audioFilePath, repeatTimes);

  // Pause the current audio playing
  // at.pauseAudio()

  // Resume the current audio playing
  // at.resumeAudio()

  // Stop the current audio playing
  // at.stopAudio()
};
