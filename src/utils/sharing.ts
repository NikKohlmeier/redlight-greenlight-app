import * as Clipboard from 'expo-clipboard';
import { Drive } from '../types';
import { LightEmojis } from '../constants/colors';

export const generateShareText = (drive: Drive): string => {
  const date = new Date(drive.startTime).toLocaleDateString();
  const driveName = drive.name || 'My Drive';

  // Calculate scores
  const redCount = drive.lights.filter(l => l.color === 'red').length;
  const yellowCount = drive.lights.filter(l => l.color === 'yellow').length;
  const greenCount = drive.lights.filter(l => l.color === 'green').length;

  // Determine winner
  const winner = drive.greenScore > drive.redScore
    ? `Green Wins! +${drive.greenScore - drive.redScore} points`
    : drive.greenScore === drive.redScore
    ? 'Tie!'
    : `Red Wins! +${drive.redScore - drive.greenScore} points`;

  // Create emoji sequence
  const emojiSequence = drive.lights
    .map(light => LightEmojis[light.color])
    .join('');

  return `🚦 Red Light Green Light
${driveName} - ${date}
${LightEmojis.red} ${redCount} | ${LightEmojis.green} ${greenCount} | ${LightEmojis.yellow} ${yellowCount}
${winner}
${emojiSequence}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await Clipboard.setStringAsync(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  });
};
