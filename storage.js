import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

class Memory {
  constructor(uri, type, description, location, address, date) {
    this.uri = uri;
    this.type = type;
    this.description = description;
    this.location = location;
    this.address = address;
    this.date = date;
  }
}

const storage = {
  async saveMemory(memory) {
    try {
      // Save to app's document directory
      const fileName = memory.uri.split('/').pop();
      const newPath = FileSystem.documentDirectory + fileName;
      
      await FileSystem.moveAsync({
        from: memory.uri,
        to: newPath,
      });
      
      // Update memory URI to new path
      memory.uri = newPath;
      
      // Save to device's media library
      if (memory.type === 'photo') {
        await MediaLibrary.saveToLibraryAsync(memory.uri);
      } else {
        // For videos, we might need a different approach
      }
      
      // Save memory data to AsyncStorage
      const memories = await this.getMemories();
      memories.push(memory);
      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + 'memories.json',
        JSON.stringify(memories)
      );
    } catch (error) {
      console.error('Error saving memory:', error);
    }
  },
  
  async getMemories() {
    try {
      const fileInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'memories.json');
      if (fileInfo.exists) {
        const content = await FileSystem.readAsStringAsync(fileInfo.uri);
        return JSON.parse(content);
      }
      return [];
    } catch (error) {
      console.error('Error loading memories:', error);
      return [];
    }
  },
};

export { storage, Memory };