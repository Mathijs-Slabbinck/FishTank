class PlayerService {
    constructor(
        _name,
        _dateMade = new Date(),
        _foodAmount = 10,
        _moneyAmount = 100,
        _aquariumList = [],
        _backgroundMusicOn = true,
        _autoSaveOn = true
    ) {
        this._name = _name;
        this._dateMade = _dateMade;
        this._foodAmount = _foodAmount;
        this._moneyAmount = _moneyAmount;
        this._aquariumList = _aquariumList;
        this._backgroundMusicOn = _backgroundMusicOn;
        this._autoSaveOn = _autoSaveOn;
    }

    // --- Getters & Setters ---
    get Name() { return this._name; }
    set Name(value) { this._name = value; }

    get DateMade() { return this._dateMade; }
    set DateMade(value) { this._dateMade = value; }

    get FoodAmount() { return this._foodAmount; }
    set FoodAmount(value) {
        if (value < 0) throw new Error("You can't use more food than you have!");
        this._foodAmount = value;
    }

    get MoneyAmount() { return this._moneyAmount; }
    set MoneyAmount(value) { this._moneyAmount = value; }

    get AquariumList() { return this._aquariumList; }
    set AquariumList(value) { this._aquariumList = value; }

    get BackgroundMusicOn() { return this._backgroundMusicOn; }
    set BackgroundMusicOn(value) { this._backgroundMusicOn = value; }

    get AutoSaveOn() { return this._autoSaveOn; }
    set AutoSaveOn(value) { this._autoSaveOn = value; }

    get FishAmount() {
        return this._aquariumList.reduce((total, aquarium) => total + aquarium.FishList.length, 0);
    }

    // --- Serialization (to JSON-safe object) ---
    toJSON() {
        return {
            Name: this.Name,
            DateMade: this.DateMade,
            FoodAmount: this.FoodAmount,
            MoneyAmount: this.MoneyAmount,
            AquariumList: this.AquariumList.map(aq => aq.toJSON()),
            BackgroundMusicOn: this.BackgroundMusicOn,
            AutoSaveOn: this.AutoSaveOn
        };
    }

    static fromJSON(json) {
        return new PlayerService(
            json.Name,
            json.DateMade,
            json.FoodAmount,
            json.MoneyAmount,
            (json.AquariumList || []).map(aq => AquariumService.fromJSON(aq)),
            json.BackgroundMusicOn,
            json.AutoSaveOn
        );
    }
}
