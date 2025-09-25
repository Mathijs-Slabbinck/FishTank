class Fish {
    constructor(
        name,
        fishTypeName,
        age,
        size,
        isAlive,
        bodyColor,
        tailFinColor,
        bottomFinColor,
        topFinColor,
        speed,
        hasSideFin = true,
        hasPattern = false,
        sideFinColor = null,
        patternColor = null,
        eyeWhiteColor = "white",
        pupilColor = "black",
        hungerAmount = 0,
        costPrice = 0,
        svgElement = null,
        foodEaten = 0,

    ) {
        // Basic properties
        this.name = name;
        this.fishTypeName = fishTypeName;
        this.age = age;
        this.size = size;
        this.isAlive = isAlive;
        this.bodyColor = bodyColor;
        this.tailFinColor = tailFinColor;
        this.bottomFinColor = bottomFinColor;
        this.topFinColor = topFinColor;
        this.speed = speed;
        // Optional with defaults
        this.hasSideFin = hasSideFin; // Indicates if the fish has a side fin
        this.hasPattern = hasPattern; // Indicates if the fish has a pattern
        this.sideFinColor = sideFinColor;
        this.patternColor = patternColor;
        this.eyeWhiteColor = eyeWhiteColor;
        this.pupilColor = pupilColor;
        this.hungerAmount = hungerAmount;
        this.costPrice = costPrice; // Cost price of the fish
        this.svgElement = svgElement; // SVG representation of the fish
        this.foodEaten = foodEaten; // Amount of food eaten by the fish
    }

    // Getters and setters
    get Name() { return this.name; }
    set Name(value) { this.name = value; }

    get FishTypeName() { return this.fishTypeName; }
    set FishTypeName(value) { this.fishTypeName = value; }

    get Age() { return this.age; }
    set Age(value) { this.age = value; }

    get Size() { return this.size; }
    set Size(value) { this.size = value; }

    get IsAlive() { return this.isAlive; }
    set IsAlive(value) { this.isAlive = value; }

    get BodyColor() { return this.bodyColor; }
    set BodyColor(value) { this.bodyColor = value; }

    get TailFinColor() { return this.tailFinColor; }
    set TailFinColor(value) { this.tailFinColor = value; }

    get BottomFinColor() { return this.bottomFinColor; }
    set BottomFinColor(value) { this.bottomFinColor = value; }

    get TopFinColor() { return this.topFinColor; }
    set TopFinColor(value) { this.topFinColor = value; }

    get SideFinColor() { return this.sideFinColor; }
    set SideFinColor(value) { this.sideFinColor = value; }

    get PatternColor() { return this.patternColor; }
    set PatternColor(value) { this.patternColor = value };

    get EyeWhiteColor() { return this.eyeWhiteColor; }
    set EyeWhiteColor(value) { this.eyeWhiteColor = value; }

    get PupilColor() { return this.pupilColor; }
    set PupilColor(value) { this.pupilColor = value; }

    get HungerAmount() { return this.hungerAmount; }
    set HungerAmount(value) { this.hungerAmount = value; }

    get CostPrice() { return this.costPrice; }
    set CostPrice(value) { this.costPrice = value; }

    get SvgElement() { return this.svgElement; }
    set SvgElement(value) { this.svgElement = value; }

    get HasPattern() { return this.hasPattern; }

    get HasSideFin() { return this.hasSideFin; }

    get Speed() { return this.speed; }
    set Speed(value) {
        if (value < 0) {
            throw new Error("Speed cannot be negative!");
        }
        if (value > 7) {
            throw new Error("Speed cannot exceed 7!");
        }
        this.speed = value;
    }

    get FoodEaten() {
        return this.foodEaten;
    }
    set FoodEaten(value) {
        if (value < 0) {
            throw new Error("Food eaten cannot be negative!");
        }
        else if (value > 100) {
            this.size = 7;
            this.SvgElement.attr('width', 170);
            this.SvgElement.attr('height', 100);
        }
        else if (value > 75) {
            this.size = 6;
            this.SvgElement.attr('width', 160);
            this.SvgElement.attr('height', 90);
        }
        else if (value > 50) {
            this.size = 5;
            this.SvgElement.attr('width', 150);
            this.SvgElement.attr('height', 80);
        }
        else if (value > 30) {
            this.size = 4;
            this.SvgElement.attr('width', 140);
            this.SvgElement.attr('height', 70);
        }
        else if (value > 20) {
            this.size = 3;
            this.SvgElement.attr('width', 130);
            this.SvgElement.attr('height', 60);
        }
        else if (value > 10) {
            this.size = 2;
            this.SvgElement.attr('width', 120);
            this.SvgElement.attr('height', 50);
        }
        else if (value > 5) {
            this.size = 1;
            this.SvgElement.attr('width', 100);
            this.SvgElement.attr('height', 40);
        }
        this.foodEaten = value;
    }

    GetSpeedInPixelsPerSecond() {
        return this.speed * 10;
    }

    toString() {
        return this.name;
    }
}
