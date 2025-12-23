import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions for reference (iPhone 14 Pro - 393x852)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

/**
 * Get responsive width based on screen width
 * @param size - Base size in pixels
 * @returns Responsive size scaled to current screen width
 */
export const wp = (size: number): number => {
  return (size / BASE_WIDTH) * SCREEN_WIDTH;
};

/**
 * Get responsive height based on screen height
 * @param size - Base size in pixels
 * @returns Responsive size scaled to current screen height
 */
export const hp = (size: number): number => {
  return (size / BASE_HEIGHT) * SCREEN_HEIGHT;
};

/**
 * Get responsive font size based on screen width
 * @param size - Base font size in pixels
 * @returns Responsive font size scaled to current screen width
 */
export const fontSize = (size: number): number => {
  return (size / BASE_WIDTH) * SCREEN_WIDTH;
};

/**
 * Get screen width
 */
export const getScreenWidth = (): number => SCREEN_WIDTH;

/**
 * Get screen height
 */
export const getScreenHeight = (): number => SCREEN_HEIGHT;

/**
 * Get percentage of screen width
 * @param percentage - Percentage of screen width (0-100)
 * @returns Width in pixels
 */
export const widthPercentage = (percentage: number): number => {
  return (SCREEN_WIDTH * percentage) / 100;
};

/**
 * Get percentage of screen height
 * @param percentage - Percentage of screen height (0-100)
 * @returns Height in pixels
 */
export const heightPercentage = (percentage: number): number => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

