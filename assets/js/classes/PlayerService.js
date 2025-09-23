class PlayerService {
    constructor(name, foodAmount, moneyAmount) {
        this._name = name;
        this._foodAmount = foodAmount;
        this._moneyAmount = moneyAmount;
    }

    // Getter and setter for name
    get Name() {
        return this._name;
    }
    set Name(value) {
        this._name = value;
    }

    // Getter and setter for foodAmount
    get FoodAmount() {
        return this._foodAmount;
    }
    set FoodAmount(value) {
        if (value < 0) {
            throw new Error("You can't use more food then you have!");
        }
        else {
            this._foodAmount = value;
        }
    }

    // Getter and setter for moneyAmount
    get MoneyAmount() {
        return this._moneyAmount;
    }
    set MoneyAmount(value) {
        this._moneyAmount = value;
    }
}
