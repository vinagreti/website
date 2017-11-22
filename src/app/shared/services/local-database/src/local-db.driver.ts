export const LocalDbDriver = {

  checkStorageAvailability: () => {
    let type = '';
    try {
      const testKey = '__np_storage_test__' + Date.now();
      type = 'localStorage';
      localStorage.setItem(testKey, 'work');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.error('LocalDatabaseServiceError: Cannot find ' + type + ' on this browser.');
      return false;
    }
  },

  get: (itemName) => {
    if (!itemName) {
      return;
    }
    const localValue = localStorage.getItem(itemName);
    if (localValue) {
      return JSON.parse(localValue);
    } else {
      return undefined;
    }
  },

  set: (itemName, value) => {
    try {
      if (value) {
        localStorage.setItem(itemName, JSON.stringify(value));
      } else {
        LocalDbDriver.remove(itemName);
      }
      return true;
    } catch (e) {
      return false;
    }
  },

  remove: (itemName) => {
    try {
      localStorage.removeItem(itemName);
      return true;
    } catch (e) {
      return false;
    }
  },

  delete: (collectionName, document) => {
    const collection = LocalDbDriver.get(collectionName);
    if (collection) {
      const newCollection = collection.map(item => item.id !== document.id);
      if (collection !== newCollection) {
        LocalDbDriver.set(collectionName, newCollection);
      }
    }
  },

  create: (collectionName, document) => {
    const collection = LocalDbDriver.get(collectionName) || [];
    collection.push(document);
    LocalDbDriver.set(collectionName, collection);
  },

  update: (collectionName, document) => {
    const collection = LocalDbDriver.get(collectionName);
    if (collection) {
      const newCollection = collection.map(item => {
        if (item.id === document.id) {
          item = document;
        }
        return item;
      });
      if (collection !== newCollection) {
        LocalDbDriver.set(collectionName, newCollection);
      }
    }
  }

};
