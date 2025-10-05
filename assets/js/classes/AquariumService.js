class AquariumService {
    constructor(aquariumName) {
        this._aquariumName = aquariumName;
        this._maxFish = 10;
        this._aquariumLevel = 1;
        this._aquariumValue = 0;
        this._foodAmount = 0;
        this._waterQuality = 100;
        this._waterColor = 'blue';
        this._hasFood = false;
        this._fishList = [];
    }

    // --- Getters and setters ---
    get AmountOfFish() {
        return this._fishList.length;
    }

    get MaxFish() { return this._maxFish; }
    set MaxFish(value) { this._maxFish = value; }

    get AquariumLevel() { return this._aquariumLevel; }
    set AquariumLevel(value) { this._aquariumLevel = value; }

    get AquariumName() { return this._aquariumName; }
    set AquariumName(value) { this._aquariumName = value; }

    get AquariumValue() { return this._aquariumValue; }
    set AquariumValue(value) { this._aquariumValue = value; }

    get FoodAmount() { return this._foodAmount; }
    set FoodAmount(value) { this._foodAmount = value; }

    get WaterQuality() { return this._waterQuality; }
    set WaterQuality(value) { this._waterQuality = value; }

    get WaterColor() { return this._waterColor; }
    set WaterColor(value) { this._waterColor = value; }

    get FishList() { return this._fishList; }
    set FishList(value) { this._fishList = value; }

    get HasFood() { return this._hasFood; }
    set HasFood(value) { this._hasFood = value; }

    // --- Serialization (for localStorage) ---
    toJSON() {
        return {
            MaxFish: this.MaxFish,
            AquariumLevel: this.AquariumLevel,
            AquariumName: this.AquariumName,
            AquariumValue: this.AquariumValue,
            FoodAmount: this.FoodAmount,
            WaterQuality: this.WaterQuality,
            WaterColor: this.WaterColor,
            HasFood: this.HasFood,
            FishList: this.FishList.map(f => f.toJSON()) // serialize fish data only
        };
    }

    static fromJSON(json) {
        const aquarium = new AquariumService(json.AquariumName);
        aquarium.MaxFish = json.MaxFish;
        aquarium.AquariumLevel = json.AquariumLevel;
        aquarium.AquariumValue = json.AquariumValue;
        aquarium.FoodAmount = json.FoodAmount;
        aquarium.WaterQuality = json.WaterQuality;
        aquarium.WaterColor = json.WaterColor;
        aquarium.HasFood = json.HasFood;
        aquarium.FishList = (json.FishList || []).map(f => Fish.fromJSON(f)); // recreate fish objects
        return aquarium;
    }
}
