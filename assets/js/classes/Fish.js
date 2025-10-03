class Fish {
    constructor(
        _name,
        _fishTypeName,
        _bodyColor,
        _tailFinColor,
        _speed = 1,
        _size = 1,
        _sideFinColor = null,
        _patternColor = null,
        _topFinColor = null,
        _bottomFinColor = null,
        _eyeWhiteColor = "white",
        _pupilColor = "black",
        _hungerAmount = 0,
        _costPrice = 0,
        _svgElement = null,
        _foodEaten = 0,
        _isAlive = true,
        _age = 0,
        _currentValue = 0
    ) {
        // Basic properties
        this._name = _name;
        this.FishTypeName = _fishTypeName;
        this._bodyColor = _bodyColor;
        this._tailFinColor = _tailFinColor;
        this.Speed = _speed;
        this.Size = _size;
        // Optional with defaults
        this._sideFinColor = _sideFinColor;
        this._patternColor = _patternColor;
        this._topFinColor = _topFinColor;
        this._bottomFinColor = _bottomFinColor;
        this._eyeWhiteColor = _eyeWhiteColor;
        this._pupilColor = _pupilColor;
        this._hungerAmount = _hungerAmount;
        this._costPrice = _costPrice; // Cost price of the fish
        this._svgElement = _svgElement; // SVG representation of the fish
        this._foodEaten = _foodEaten; // Amount of food eaten by the fish
        this._isAlive = _isAlive;
        this._age = _age;
        this._currentValue = _currentValue; // Current value of the fish based on age and size
    }

    // Getters and setters

    get Name() { return this._name; }
    set Name(value) {
        if (value === undefined || value === null || value.trim() === "") {
            throw new Error("The name of the fish can't be empty!");
        }
        else {
            this._name = value;
        }
    }

    get FishTypeName() { return this._fishTypeName; }
    set FishTypeName(value) {
        if (isInEnum(value, AllFishTypes)) {
            this._fishTypeName = value;
        } else {
            throw new Error("This fishtype is not recognized!");
        }
    }

    get BodyColor() { return this._bodyColor; }
    set BodyColor(value) { this._bodyColor = value; }

    get TailFinColor() { return this._tailFinColor; }
    set TailFinColor(value) { this._tailFinColor = value; }

    get Size() { return this._size; }
    set Size(value) {
        if (value < 1) {
            throw new Error("Size cannot be less than 1!");
        }
        if (value > 7) {
            throw new Error("Size cannot exceed 7!");
        }
        this._size = value;
    }

    get Speed() { return this._speed; }
    set Speed(value) {
        if (value < 0) {
            throw new Error("Speed cannot be negative!");
        }
        if (value > 5) {
            throw new Error("Speed cannot exceed 5!");
        }
        this._speed = value;
    }

    get HasBottomFin() {
        if (
            this.FishTypeName === AllFishTypes.bubbleback ||
            this.FishTypeName === AllFishTypes.bubblemark ||
            this.FishTypeName === AllFishTypes.longpaddlefin ||
            this.FishTypeName === AllFishTypes.normalBroadback ||
            this.FishTypeName === AllFishTypes.normalOvalfin ||
            this.FishTypeName === AllFishTypes.normalPaddlefin ||
            this.FishTypeName === AllFishTypes.normalRoundback ||
            this.FishTypeName === AllFishTypes.normalSlimtail ||
            this.FishTypeName === AllFishTypes.piranha ||
            this.FishTypeName === AllFishTypes.tigerstripes ||
            this.FishTypeName === AllFishTypes.wavyfin
        ) {
            return true;
        } else {
            return false;
        }
    }

    get HasTopFin() {
        if (
            this.FishTypeName === AllFishTypes.bubbleback ||
            this.FishTypeName === AllFishTypes.bubblemark ||
            this.FishTypeName === AllFishTypes.clownfish ||
            this.FishTypeName === AllFishTypes.longpaddlefin ||
            this.FishTypeName === AllFishTypes.normalBroadback ||
            this.FishTypeName === AllFishTypes.normalOvalfin ||
            this.FishTypeName === AllFishTypes.normalPaddlefin ||
            this.FishTypeName === AllFishTypes.normalRoundback ||
            this.FishTypeName === AllFishTypes.normalSlimtail ||
            this.FishTypeName === AllFishTypes.piranha ||
            this.FishTypeName === AllFishTypes.tigerstripes ||
            this.FishTypeName === AllFishTypes.wavyfin
        ) {
            return true;
        } else {
            return false;
        }
    }

    get HasPattern() {
        if (
            this.FishTypeName === AllFishTypes.normalBroadback ||
            this.FishTypeName === AllFishTypes.normalOvalfin ||
            this.FishTypeName === AllFishTypes.normalPaddlefin ||
            this.FishTypeName === AllFishTypes.normalRoundback ||
            this.FishTypeName === AllFishTypes.normalSlimtail
        ) {
            return false;
        } else {
            return true;
        }
    }

    get HasSideFin() {
        if (
            this.FishTypeName === AllFishTypes.bubblemark ||
            this.FishTypeName === AllFishTypes.clownfish ||
            this.FishTypeName === AllFishTypes.longpaddlefin ||
            this.FishTypeName === AllFishTypes.normalBroadback ||
            this.FishTypeName === AllFishTypes.normalOvalfin ||
            this.FishTypeName === AllFishTypes.normalPaddlefin ||
            this.FishTypeName === AllFishTypes.normalRoundback ||
            this.FishTypeName === AllFishTypes.normalSlimtail ||
            this.FishTypeName === AllFishTypes.tigerstripes
        ) {
            return true;
        } else {
            return false;
        }
    }

    get SideFinColor() { return this._sideFinColor; }
    set SideFinColor(value) { this._sideFinColor = value; }

    get PatternColor() { return this._patternColor; }
    set PatternColor(value) { this._patternColor = value; }

    get BottomFinColor() { return this._bottomFinColor; }
    set BottomFinColor(value) { this._bottomFinColor = value; }

    get TopFinColor() { return this._topFinColor; }
    set TopFinColor(value) { this._topFinColor = value; }

    get EyeWhiteColor() { return this._eyeWhiteColor; }
    set EyeWhiteColor(value) { this._eyeWhiteColor = value; }

    get PupilColor() { return this._pupilColor; }
    set PupilColor(value) { this._pupilColor = value; }

    get HungerAmount() { return this._hungerAmount; }
    set HungerAmount(value) { this._hungerAmount = value; }

    get CostPrice() { return this._costPrice; }
    set CostPrice(value) { this._costPrice = value; }

    get SvgElement() { return this._svgElement; }
    set SvgElement(value) {
        if (!value) {
            this._svgElement = null;
        }
        else if (value.jquery) {
            // Already a jQuery object
            this._svgElement = value;
        }
        else {
            // Wrap raw DOM node
            this._svgElement = $(value);
        }
    }

    get FoodEaten() {
        return this._foodEaten;
    }
    set FoodEaten(value) {
        if (value < 0) {
            throw new Error("Food eaten cannot be negative!");
        }
        else if (value > 100) {
            this.Size = 7;
            this.SvgElement.attr('width', 170);
            this.SvgElement.attr('height', 100);
        }
        else if (value > 75) {
            this.Size = 6;
            this.SvgElement.attr('width', 160);
            this.SvgElement.attr('height', 90);
        }
        else if (value > 50) {
            this.Size = 5;
            this.SvgElement.attr('width', 150);
            this.SvgElement.attr('height', 80);
        }
        else if (value > 30) {
            this.Size = 4;
            this.SvgElement.attr('width', 140);
            this.SvgElement.attr('height', 70);
        }
        else if (value > 20) {
            this.Size = 3;
            this.SvgElement.attr('width', 130);
            this.SvgElement.attr('height', 60);
        }
        else if (value > 10) {
            this.Size = 2;
            this.SvgElement.attr('width', 120);
            this.SvgElement.attr('height', 50);
        }
        else if (value > 5) {
            this.Size = 1;
            this.SvgElement.attr('width', 100);
            this.SvgElement.attr('height', 40);
        }
        this._foodEaten = value;
    }

    get IsAlive() { return this._isAlive; }
    set IsAlive(value) { this._isAlive = value; }

    get Age() { return this._age; }
    set Age(value) { this._age = value; }

    get CurrentValue() { return this._currentValue; }
    set CurrentValue(value) { this._currentValue = value; }

    getSpeedInPixelsPerSecond() {
        return this.Speed * 10;
    }

    toString() {
        return this.Name;
    }
}

function isInEnum(value, enumObj) {
    return Object.values(enumObj).includes(value);
}