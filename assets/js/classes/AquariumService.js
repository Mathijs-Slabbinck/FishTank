class AquariumService {
    constructor(aquariumName) {
        this._maxFish = 10; // default max fish
        this._aquariumLevel = 1; // default level
        this._aquariumName = aquariumName;
        this._aquariumValue = 0;
        this._foodAmount = 0;
        this.waterQuality = 100; // default water quality
        this.waterColor = 'blue'; // default water color
        this._hasFood = false; // default no food
        this.fishList = []; // to hold fish objects
    }

    // Getters and setters
    get AmountOfFish() {
        return this.FishList.length;
    }

    get MaxFish() {
        return this._maxFish;
    }
    set MaxFish(value) {
        this._maxFish = value;
    }

    get AquariumLevel() {
        return this._aquariumLevel;
    }
    set AquariumLevel(value) {
        this._aquariumLevel = value;
    }

    get AquariumName() {
        return this._aquariumName;
    }
    set AquariumName(value) {
        this._aquariumName = value;
    }

    get AquariumValue() {
        return this._aquariumValue;
    }
    set AquariumValue(value) {
        this._aquariumValue = value;
    }

    get FoodAmount() {
        return this._foodAmount;
    }
    set FoodAmount(value) {
        this._foodAmount = value;
    }

    get WaterQuality() {
        return this.waterQuality;
    }
    set WaterQuality(value) {
        this.waterQuality = value;
    }

    get WaterColor() {
        return this.waterColor;
    }
    set WaterColor(value) {
        this.waterColor = value;
    }

    get FishList() {
        return this.fishList;
    }
    set FishList(value) {
        this.fishList = value;
    }

    get HasFood() {
        return this._hasFood;
    }
    set HasFood(value) {
        this._hasFood = value;
    }
}
