class WeatherMap {
  buckets: Array<{ key: string; value: number }[]>;
  bucketLimit: number;
  collisionCount: number;

  constructor(initialLimit = 26) {
    this.buckets = Array.from({ length: initialLimit }, () => []);
    this.collisionCount = 0;
    this.bucketLimit = initialLimit;
  }

  set(key: string, value: number) {
    const index = this.calculateIndex(key);
    const bucket = this.buckets[index];

    const existingItem = bucket.find(
      (el) => el.key.toLowerCase() === key.toLowerCase()
    );
    if (existingItem) {
      existingItem.value = value;
    } else {
      bucket.push({ key, value });
      if (bucket.length > 1) {
        this.collisionCount++;
      }
    }
    return this;
  }

  get(key: string) {
    const index = this.calculateIndex(key);
    const bucket = this.buckets[index];
    const existingItem = bucket.find(
      (el) => el.key.toLowerCase() === key.toLowerCase()
    );
    return existingItem ? existingItem.value : undefined;
  }

  hashFunc(key: string): number {
    return key.charCodeAt(0) - "A".charCodeAt(0);
  }

  calculateIndex(key: string): number {
    const firstChar = key.charAt(0).toUpperCase();
    return this.hashFunc(firstChar) % this.bucketLimit;
  }

  delete(key: string): boolean {
    const index = this.calculateIndex(key);
    const bucket = this.buckets[index];
    const entryIndex = bucket.findIndex(
      (el) => el.key.toLowerCase() === key.toLowerCase()
    );

    if (entryIndex !== -1) {
      const wasCollisions = bucket.length > 1;
      bucket.splice(entryIndex, 1);
      if (bucket.length > 0 && wasCollisions) {
        this.collisionCount--;
      }
      return true;
    }
    return false;
  }

  clear() {
    this.buckets = Array.from({ length: this.bucketLimit }, () => []);
    this.collisionCount = 0;
  }
}

const weatherMap = new WeatherMap();
weatherMap.set("London", 28);
weatherMap.set("Berlin", 21);
weatherMap.set("Moscow", 17);
weatherMap.set("Paris", 15);
weatherMap.set("Boston", 26);

console.log(weatherMap);

weatherMap.delete("Paris");
console.log(weatherMap.get("London"));
console.log(weatherMap);
