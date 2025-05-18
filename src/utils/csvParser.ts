import Papa from 'papaparse';
import { Location } from '../types';

/**
 * Loads and parses a CSV file containing location data
 * @param url Path to the CSV file
 * @returns Promise resolving to an array of Location objects
 */
export async function loadLocationData(url: string): Promise<Location[]> {
  try {
    const response = await fetch(url);
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          if (results.errors && results.errors.length > 0) {
            reject(new Error(`CSV parsing error: ${results.errors[0].message}`));
            return;
          }
          
          // Convert parsed data to Location type
          const locations = results.data as Location[];
          resolve(locations);
        },
        error: (error) => {
          reject(new Error(`CSV parsing error: ${error.message}`));
        }
      });
    });
  } catch (error) {
    console.error('Error loading CSV file:', error);
    throw error;
  }
}