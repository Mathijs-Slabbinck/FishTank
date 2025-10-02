class Fish {
    constructor(
        name,
        fishTypeName,
        bodyColor,
        tailFinColor,
        speed = 1,
        size = 1,
        sideFinColor = null,
        patternColor = null,
        topFinColor = null,
        bottomFinColor = null,
        eyeWhiteColor = "white",
        pupilColor = "black",
        hungerAmount = 0,
        costPrice = 0,
        svgElement = null,
        foodEaten = 0,
        isAlive = true,
        age = 0,
        currentValue = 0
    ) {
        // Basic properties
        this.name = name;
        this.FishTypeName = fishTypeName;
        this.bodyColor = bodyColor;
        this.tailFinColor = tailFinColor;
        this.Speed = speed;
        this.Size = size;
        // Optional with defaults
        this.sideFinColor = sideFinColor;
        this.patternColor = patternColor;
        this.topFinColor = topFinColor;
        this.bottomFinColor = bottomFinColor;
        this.eyeWhiteColor = eyeWhiteColor;
        this.pupilColor = pupilColor;
        this.hungerAmount = hungerAmount;
        this.costPrice = costPrice; // Cost price of the fish
        this.SvgElement = svgElement; // SVG representation of the fish
        this.foodEaten = foodEaten; // Amount of food eaten by the fish
        this.isAlive = isAlive;
        this.age = age;
        this.currentValue = currentValue; // Current value of the fish based on age and size
    }

    // Getters and setters

    get Name() { return this.name; }
    set Name(value) {
        if (value === undefined || value === null || value.trim() === "") {
            throw new Error("The name of the fish can't be empty!");
        }
        else {
            this.name = value;
        }
    }

    get FishTypeName() { return this.fishTypeName; }
    set FishTypeName(value) {
        if (isInEnum(value, AllFishTypes)) {
            this.fishTypeName = value;
        } else {
            throw new Error("This fishtype is not recognized!");
        }
    }

    get BodyColor() { return this.bodyColor; }
    set BodyColor(value) { this.bodyColor = value; }

    get TailFinColor() { return this.tailFinColor; }
    set TailFinColor(value) { this.tailFinColor = value; }

    get Size() { return this.size; }
    set Size(value) {
        if (value < 1) {
            throw new Error("Size cannot be less than 1!");
        }
        if (value > 7) {
            throw new Error("Size cannot exceed 7!");
        }
        this.size = value;
    }

    get Speed() { return this.speed; }
    set Speed(value) {
        if (value < 0) {
            throw new Error("Speed cannot be negative!");
        }
        if (value > 5) {
            throw new Error("Speed cannot exceed 5!");
        }
        this.speed = value;
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

    get SideFinColor() { return this.sideFinColor; }
    set SideFinColor(value) { this.sideFinColor = value; }

    get PatternColor() { return this.patternColor; }
    set PatternColor(value) { this.patternColor = value; }

    get BottomFinColor() { return this.bottomFinColor; }
    set BottomFinColor(value) { this.bottomFinColor = value; }

    get TopFinColor() { return this.topFinColor; }
    set TopFinColor(value) { this.topFinColor = value; }

    get EyeWhiteColor() { return this.eyeWhiteColor; }
    set EyeWhiteColor(value) { this.eyeWhiteColor = value; }

    get PupilColor() { return this.pupilColor; }
    set PupilColor(value) { this.pupilColor = value; }

    get HungerAmount() { return this.hungerAmount; }
    set HungerAmount(value) { this.hungerAmount = value; }

    get CostPrice() { return this.costPrice; }
    set CostPrice(value) { this.costPrice = value; }

    get SvgElement() { return this.svgElement; }
    set SvgElement(value) {
        if (!value) {
            this.svgElement = null;
        }
        else if (value.jquery) {
            // Already a jQuery object
            this.svgElement = value;
        }
        else {
            // Wrap raw DOM node
            this.svgElement = $(value);
        }
    }

    get FoodEaten() {
        return this.foodEaten;
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
        this.foodEaten = value;
    }

    get IsAlive() { return this.isAlive; }
    set IsAlive(value) { this.isAlive = value; }

    get Age() { return this.age; }
    set Age(value) { this.age = value; }

    get CurrentValue() { return this.currentValue; }
    set CurrentValue(value) { this.currentValue = value; }

    get StandardBodyColor() {
        switch (this.FishTypeName) {
            case AllFishTypes.bubbleback:
                return "#ff5c5c";
            case AllFishTypes.bubblemark:
                return "#00dddd";
            case AllFishTypes.clownfish:
                return "#ff6600";
            case AllFishTypes.longpaddlefin:
                return "#66ddff";
            case AllFishTypes.normalBroadback:
                return "#fc0";
            case AllFishTypes.normalOvalfin:
                return "#4af";
            case AllFishTypes.normalPaddlefin:
                return "#5d5";
            case AllFishTypes.normalRoundback:
                return "#59f";
            case AllFishTypes.normalSlimtail:
                return "#f77";
            case AllFishTypes.piranha:
                return "#1f9e6e";
            case AllFishTypes.tigerstripes:
                return "#ffdd00";
            case AllFishTypes.wavyfin:
                return "#f28c28";
            default:
                throw new Error("This fishtype is not recognized!");
        }
    }

    get StandardTailFinColor() {
        switch (this.FishTypeName) {
            case AllFishTypes.bubbleback:
                return "#ff3b3b";
            case AllFishTypes.bubblemark:
                return "#00cccc";
            case AllFishTypes.clownfish:
                return "#ff6600";
            case AllFishTypes.longpaddlefin:
                return "#0077aa";
            case AllFishTypes.normalBroadback:
                return "#fa5";
            case AllFishTypes.normalOvalfin:
                return "#6cc";
            case AllFishTypes.normalPaddlefin:
                return "#9f9";
            case AllFishTypes.normalRoundback:
                return "#7dd";
            case AllFishTypes.normalSlimtail:
                return "#f99";
            case AllFishTypes.piranha:
                return "#1f9e6e";
            case AllFishTypes.tigerstripes:
                return "#ffaa00";
            case AllFishTypes.wavyfin:
                return "#f28c28";
            default:
                throw new Error("This fishtype is not recognized!");
        }
    }

    get StandardTopFinColor() {
        if (this.HasTopFin) {
            switch (this.fishTypeName) {
                case AllFishTypes.bubbleback:
                    return "#ff5c5c";
                case AllFishTypes.bubblemark:
                    return "#33eeee";
                case AllFishTypes.clownfish:
                    return "#ff6600";
                case AllFishTypes.longpaddlefin:
                    return "#3399cc";
                case AllFishTypes.normalBroadback:
                    return "#fc0";
                case AllFishTypes.normalOvalfin:
                    return "#7ad";
                case AllFishTypes.normalPaddlefin:
                    return "#6e6";
                case AllFishTypes.normalRoundback:
                    return "#6ac";
                case AllFishTypes.normalSlimtail:
                    return "#faa";
                case AllFishTypes.piranha:
                    return "#1f9e6e";
                case AllFishTypes.tigerstripes:
                    return "#ffcc00";
                case AllFishTypes.wavyfin:
                    return "#f28c28";
                default:
                    throw new Error("This fishtype is not recognized!");
            }
        }
        else {
            throw new Error("This fish has no top fin!");
        }
    }

    get StandardBottomFinColor() {
        if (this.HasBottomFin) {
            switch (this.FishTypeName) {
                case AllFishTypes.bubbleback:
                    return "#ff5c5c";
                case AllFishTypes.bubblemark:
                    return "#33eeee";
                case AllFishTypes.longpaddlefin:
                    return "#3399cc";
                case AllFishTypes.normalBroadback:
                    return "#fc0";
                case AllFishTypes.normalOvalfin:
                    return "#7ad";
                case AllFishTypes.normalPaddlefin:
                    return "#6e6";
                case AllFishTypes.normalRoundback:
                    return "#6ac";
                case AllFishTypes.normalSlimtail:
                    return "#faa";
                case AllFishTypes.piranha:
                    return "#1f9e6e";
                case AllFishTypes.tigerstripes:
                    return "#ffcc00";
                case AllFishTypes.wavyfin:
                    return "#f28c28";
                default:
                    throw new Error("This fishtype is not recognized!");
            }
        }
        else {
            throw new Error("This fish has no bottom fin!");
        }
    }

    get StandardSideFinColor() {
        if (this.HasSideFin) {
            switch (this.FishTypeName) {
                case AllFishTypes.bubblemark:
                    return "#00aaaa";
                case AllFishTypes.clownfish:
                    return "#ff6600";
                case AllFishTypes.longpaddlefin:
                    return "#006699";
                case AllFishTypes.normalBroadback:
                    return "#b80";
                case AllFishTypes.normalOvalfin:
                    return "#6cc";
                case AllFishTypes.normalPaddlefin:
                    return "#3c3";
                case AllFishTypes.normalRoundback:
                    return "#3a8";
                case AllFishTypes.normalSlimtail:
                    return "#c44";
                case AllFishTypes.tigerstripes:
                    return "#ffaa00";
                default:
                    throw new Error("This fishtype is not recognized!");
            }
        } else {
            throw new Error("This fish has no side fin!");
        }
    }

    get StandardPatternColor() {
        if (this.HasPattern) {
            switch (this.FishTypeName) {
                case AllFishTypes.bubbleback:
                    return "#fff";
                case AllFishTypes.bubblemark:
                    return "#fff";
                case AllFishTypes.clownfish:
                    return "#fff";
                case AllFishTypes.longpaddlefin:
                    return "#33aaff";
                case AllFishTypes.piranha:
                    return "#a1f0cc";
                case AllFishTypes.tigerstripes:
                    return "#000000";
                case AllFishTypes.wavyfin:
                    return "#fff";
                default:
                    throw new Error("This fishtype is not recognized!");
            }
        }
        else {
            throw new Error("This fish has no pattern!");
        }
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