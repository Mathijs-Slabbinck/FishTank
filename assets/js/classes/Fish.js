class Fish {
    constructor(
        name,
        fishTypeName,
        size,
        speed,
        bodyColor,
        tailFinColor,
        sideFinColor = null,
        patternColor = null,
        bottomFinColor = null,
        topFinColor = null,
        eyeWhiteColor = "white",
        pupilColor = "black",
        hungerAmount = 0,
        costPrice = 0,
        svgElement = null,
        foodEaten = 0,
        isAlive = true,
        age = 0,
    ) {
        // Basic properties
        this._name = name;
        this.FishTypeName = fishTypeName;
        this._size = size;
        this._bodyColor = bodyColor;
        this._tailFinColor = tailFinColor;
        this.Speed = speed;
        // Optional with defaults
        this._sideFinColor = sideFinColor;
        this._patternColor = patternColor;
        this._topFinColor = topFinColor;
        this._bottomFinColor = bottomFinColor;
        this._eyeWhiteColor = eyeWhiteColor;
        this._pupilColor = pupilColor;
        this._hungerAmount = hungerAmount;
        this._costPrice = costPrice; // Cost price of the fish
        this.SvgElement = svgElement; // SVG representation of the fish
        this._foodEaten = foodEaten; // Amount of food eaten by the fish
        this._isAlive = isAlive;
        this._age = age;
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

    get Age() { return this._age; }
    set Age(value) { this._age = value; }

    get Size() { return this._size; }

    get IsAlive() { return this._isAlive; }
    set IsAlive(value) { this._isAlive = value; }

    get BodyColor() { return this._bodyColor; }
    set BodyColor(value) { this._bodyColor = value; }

    get TailFinColor() { return this._tailFinColor; }
    set TailFinColor(value) { this._tailFinColor = value; }

    get Speed() { return this._speed; }
    set Speed(value) {
        if (value < 0) {
            throw new Error("Speed cannot be negative!");
        }
        if (value > 7) {
            throw new Error("Speed cannot exceed 7!");
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
            this._size = 7;
            this._svgElement.attr('width', 170);
            this._svgElement.attr('height', 100);
        }
        else if (value > 75) {
            this._size = 6;
            this._svgElement.attr('width', 160);
            this._svgElement.attr('height', 90);
        }
        else if (value > 50) {
            this._size = 5;
            this._svgElement.attr('width', 150);
            this._svgElement.attr('height', 80);
        }
        else if (value > 30) {
            this._size = 4;
            this._svgElement.attr('width', 140);
            this._svgElement.attr('height', 70);
        }
        else if (value > 20) {
            this._size = 3;
            this._svgElement.attr('width', 130);
            this._svgElement.attr('height', 60);
        }
        else if (value > 10) {
            this._size = 2;
            this._svgElement.attr('width', 120);
            this._svgElement.attr('height', 50);
        }
        else if (value > 5) {
            this._size = 1;
            this._svgElement.attr('width', 100);
            this._svgElement.attr('height', 40);
        }
        this._foodEaten = value;
    }

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