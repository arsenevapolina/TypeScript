class WeatherMap {
  private buckets: Array<{ key: string; value: number }[]>;
  private bucketLimit: number;
  private collisionCount: number;

  constructor(initialLimit = 26) {
    this.buckets = new Array(initialLimit).fill(null).map(() => []);
    this.collisionCount = 0;
    this.bucketLimit = initialLimit;
  }

  set(key: string, value: number) {
    const index = this.getIndexForKey(key);
    const bucket = this.buckets[index];

    const existingItem = bucket.find(
      (el) => el.key.toLowerCase() === key.toLowerCase()
    );
    if (existingItem) {
      existingItem.value = value;
      return;
    }
    bucket.push({ key, value });
    if (bucket.length > 1) {
      this.collisionCount += 1;
    }
  }

  get(key: string) {
    const index = this.getIndexForKey(key);
    const bucket = this.buckets[index];
    const existingItem = bucket.find(
      (el) => el.key.toLowerCase() === key.toLowerCase()
    );
    return existingItem ? existingItem.value : undefined;
  }

  delete(key: string): boolean {
    const index = this.getIndexForKey(key);
    const bucket = this.buckets[index];
    const entryIndex = bucket.findIndex(
      (el) => el.key.toLowerCase() === key.toLowerCase()
    );

    if (entryIndex === -1) {
      return false;
    }

    const hasCollisions = bucket.length > 1;
    bucket.splice(entryIndex, 1);

    if (bucket.length > 0 && hasCollisions) {
      this.collisionCount--;
    }

    return true;
  }

  clear() {
    this.buckets = Array(this.bucketLimit)
      .fill(null)
      .map(() => []);
    this.collisionCount = 0;
  }

  private hashFunc(key: string): number {
    return key.charCodeAt(0) - "A".charCodeAt(0);
  }

  private calculateIndex(key: string): number {
    const firstChar = key.charAt(0).toUpperCase();
    return this.hashFunc(firstChar) % this.bucketLimit;
  }

  private getIndexForKey(key: string): number {
    return this.calculateIndex(key);
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
