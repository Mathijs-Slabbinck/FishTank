/* jshint esversion: 6 */

"use strict";

const NormalFishTypes = [
    AllFishTypes.normalBroadback,
    AllFishTypes.normalOvalfin,
    AllFishTypes.normalPaddlefin,
    AllFishTypes.normalRoundback,
    AllFishTypes.normalSlimtail
];

const StandardFishColors = {
    bubbleback: {
        body: "#ff5c5c",
        tailFin: "#ff3b3b",
        topFin: "#ff5c5c",
        bottomFin: "#ff5c5c",
        sideFin: null,
        pattern: "#ffffff"
    },
    bubblemark: {
        body: "#00dddd",
        tailFin: "#00cccc",
        topFin: "#33eeee",
        bottomFin: "#33eeee",
        sideFin: "#00aaaa",
        pattern: "#ffffff"
    },
    clownfish: {
        body: "#ff6600",
        tailFin: "#ff6600",
        topFin: "#ff6600",
        bottomFin: "#ff6600",
        sideFin: "#ff6600",
        pattern: "#ffffff"
    },
    longpaddlefin: {
        body: "#66ddff",
        tailFin: "#0077aa",
        topFin: "#3399cc",
        bottomFin: "#3399cc",
        sideFin: "#006699",
        pattern: "#33aaff"
    },
    normalBroadback: {
        body: "#ffcc00",
        tailFin: "#ffaa55",
        topFin: "#ffcc00",
        bottomFin: "#ffcc00",
        sideFin: "#bb8800",
        pattern: null
    },
    normalOvalfin: {
        body: "#44aaff",
        tailFin: "#66ccff",
        topFin: "#77aadd",
        bottomFin: "#77aadd",
        sideFin: "#66aacc",
        pattern: null
    },
    normalPaddlefin: {
        body: "#55dd55",
        tailFin: "#99ff99",
        topFin: "#66ee66",
        bottomFin: "#66ee66",
        sideFin: "#33cc33",
        pattern: null
    },
    normalRoundback: {
        body: "#5599ff",
        tailFin: "#77dddd",
        topFin: "#66aacc",
        bottomFin: "#66aacc",
        sideFin: "#33aa88",
        pattern: null
    },
    normalSlimtail: {
        body: "#ff7777",
        tailFin: "#ff9999",
        topFin: "#ffaaaa",
        bottomFin: "#ffaaaa",
        sideFin: "#cc4444",
        pattern: null
    },
    piranha: {
        body: "#1f9e6e",
        tailFin: "#1f9e6e",
        topFin: "#1f9e6e",
        bottomFin: "#1f9e6e",
        sideFin: null,
        pattern: "#a1f0cc"
    },
    tigerstripes: {
        body: "#ffdd00",
        tailFin: "#ffaa00",
        topFin: "#ffcc00",
        bottomFin: "#ffcc00",
        sideFin: "#ffaa00",
        pattern: "#000000"
    },
    wavyfin: {
        body: "#f28c28",
        tailFin: "#f28c28",
        topFin: "#f28c28",
        bottomFin: "#f28c28",
        sideFin: null,
        pattern: "#ffffff"
    }
};

let notRotatedAtStart = false;
let starterFishes = [];

var aquarium = new AquariumService("My Aquarium");
var player = new PlayerService("Player1", 10, 100);

$(document).ready(function () {
    if (window.innerWidth < 600) {
        $('#rotatePhone').show();
        $('#fishTank').hide();
        $('#coinDisplayBlock').hide();
        notRotatedAtStart = true;
    } else {
        pushStarterFishes();
    }
    updateStats();
});

function getStandardColor(fishType, part) {
    const fishData = StandardFishColors[fishType];
    if (!fishData) throw new Error("This fishtype is not recognized!");

    const color = fishData[part];
    if (color == null) throw new Error("This fish has no " + part + "!");

    return color;
}


function getRandomNormalFishType() {
    const randomIndex = Math.floor(Math.random() * NormalFishTypes.length);
    return NormalFishTypes[randomIndex];
}

function checkOrientation() {
    if (window.innerWidth < 600) {
        $('#rotatePhone').show();
        $('#fishTank').hide();
        $('#coinDisplayBlock').hide();
    } else {
        $('#rotatePhone').hide();
        $('#fishTank').show();
        $('#coinDisplayBlock').show();

        if (notRotatedAtStart) {
            pushStarterFishes();
        }

        if (notRotatedAtStart) {
            notRotatedAtStart = false;
        }
    }
}

async function pushStarterFishes() {
    let starterFishTypes = [];
    while (starterFishTypes.length < 3) {
        let fishType = getRandomNormalFishType();
        if (!starterFishTypes.includes(fishType)) {
            starterFishTypes.push(fishType);
        }
    }

    const fish1 = await createNewFish(starterFishTypes[0], true);
    addFishToBlock(fish1, "#starterFish1Block");
    starterFishes.push(fish1);

    const fish2 = await createNewFish(starterFishTypes[1], true);
    addFishToBlock(fish2, "#starterFish2Block");
    starterFishes.push(fish2);

    const fish3 = await createNewFish(starterFishTypes[2], true);
    addFishToBlock(fish3, "#starterFish3Block");
    starterFishes.push(fish3);
}

function addFishToBlock(fish, blockSelector) {
    fish.SvgElement.css({ top: '', left: '' });
    fish.SvgElement.css({ position: 'relative', scale: '3', transform: 'scaleX(1)' });
    fish.SvgElement.css("margin", "5vh auto 5vh auto");
    $(blockSelector).append(fish.SvgElement);
}

function createNewFish(fishType, useRandomColors) {
    let bodyColor;
    let tailFinColor;

    if (useRandomColors) {
        bodyColor = getRandomColor();
        tailFinColor = getRandomColor();
    }
    else {
        bodyColor = getStandardColor(fishType, FishParts.Body);
        tailFinColor = getStandardColor(fishType, FishParts.Tail);
    }

    return new Promise((resolve, reject) => {
        // name, fishType, size, speed, bodyColor, tailFinColor, sideFinColor (=null), patternColor (=null), topFinColor (=null), bottomFinColor (=null)
        const newFish = new Fish(
            // name
            "fish" + parseInt(aquarium.AmountOfFish + 1),
            // fishTypeName
            fishType,
            // bodyColor
            bodyColor,
            // tailFinColor
            tailFinColor
        );

        if (useRandomColors) {
            if (newFish.HasTopFin) newFish.TopFinColor = getRandomColor();
            if (newFish.HasBottomFin) newFish.BottomFinColor = getRandomColor();
            if (newFish.HasSideFin) newFish.SideFinColor = getRandomColor();
            if (newFish.HasPattern) newFish.PatternColor = getRandomColor();
        }
        else {
            if (newFish.HasTopFin) newFish.TopFinColor = getStandardColor(fishType, FishParts.TopFin);
            if (newFish.HasBottomFin) newFish.BottomFinColor = getStandardColor(fishType, FishParts.BottomFin);
            if (newFish.HasSideFin) newFish.SideFinColor = getStandardColor(fishType, FishParts.SideFin);
            if (newFish.HasPattern) newFish.PatternColor = getStandardColor(fishType, FishParts.Pattern);
        }

        $.get(`assets/media/fish/${fishType}.svg`, function (data) {
            const svg = $(data).find('svg');
            svg.css({
                '--body-color': newFish.BodyColor,
                '--tail-color': newFish.TailFinColor,
            });

            if (newFish.HasTopFin) svg.css('--top-fin-color', newFish.TopFinColor);
            if (newFish.HasBottomFin) svg.css('--bottom-fin-color', newFish.BottomFinColor);
            if (newFish.HasSideFin) svg.css('--side-fin-color', newFish.SideFinColor);
            if (newFish.HasPattern) svg.css('--pattern-color', newFish.PatternColor);

            svg.attr({ width: 80, height: 30, position: 'relative' });
            svg.add(svg.find('*')).css({
                "stroke": "black",
                "stroke-width": "0.6px",
                "stroke-linejoin": "round"
            });
            svg.data('fish', newFish);
            newFish.SvgElement = svg;

            resolve(newFish);
        }, 'xml').fail(reject);
    });
}

function prepareFishForSpawning(fish) {
    fish.SvgElement.css({ scale: '' });

    const fishFlipWrapper = $('<span class="fish-flip-wrapper"><span class="fish-rotate-wrapper"></span></span>');
    fishFlipWrapper.find('.fish-rotate-wrapper').append(fish.SvgElement);

    fishFlipWrapper.css({
        position: 'absolute',
        left: 200,
        top: 200,
        zIndex: 5
    });
}

function spawnFish(fish) {
    aquarium.FishList.push(fish);
    fish.SvgElement.addClass('spawned-fish');

    const fishFlipWrapper = fish.SvgElement.parent().parent();
    $('#swimZone').append(fishFlipWrapper);

    moveFishRandomly(fish);
}

const normalizeAngle = angle => (((angle + 180) % 360 + 360) % 360) - 180;

function moveFishRandomly(fish) {
    havePooChance(fish);

    const computeRotation = (angle, scaleX) =>
        normalizeAngle(scaleX === -1 ? 180 - angle : angle);


    const fishFlipWrapper = fish.SvgElement.parent().parent();
    const fishRotateWrapper = fish.SvgElement.parent();
    const swimZone = $('#swimZone');
    const zoneOffset = swimZone.offset();
    const tankOffset = $('#fishTank').offset();

    // Calculate swimZone boundaries relative to #fishTank
    const zoneX = zoneOffset.left - tankOffset.left;
    const zoneY = zoneOffset.top - tankOffset.top;
    const zoneWidth = swimZone.width();
    const zoneHeight = swimZone.height();

    // Current position
    const currentPos = fishFlipWrapper.position();

    // Pick target pos far enough away
    let newX, newY, dx, dy, distance, tries = 0;
    do {
        if (tries++ > 500) throw new Error("Could not find valid fish position.");
        newX = zoneX + Math.random() * (zoneWidth - fishFlipWrapper.width());
        newY = zoneY + Math.random() * (zoneHeight - fishFlipWrapper.height());
        dx = newX - currentPos.left;
        dy = newY - currentPos.top;
        distance = Math.hypot(dx, dy);
    } while (distance < 100);

    // Direction and speed
    const directionAngle = Math.atan2(dy, dx) * 180 / Math.PI;
    const scaleX = dx < 0 ? -1 : 1;
    const rotationToApply = computeRotation(directionAngle, scaleX);

    const speed = (fish.Speed / 0.6) * 30; // px/sec
    const duration = clamp((distance / speed) * 1000, 2000, 10000);

    // Flip + rotate
    fishFlipWrapper.css({
        transition: 'transform 0.3s ease',
        transform: `scaleX(${scaleX})`
    });

    fishRotateWrapper.css({
        transition: 'transform 3s ease',
        transform: `rotate(${rotationToApply}deg)`
    });

    // Animate position
    fishFlipWrapper.animate(
        { left: newX, top: newY },
        {
            duration,
            easing: 'linear',
            step: () => havePooChance(fish),
            complete: () => {
                const delay = getRandomNumber(0, 4) === 0
                    ? getRandomNumber(0, 1000)
                    : 0;
                setTimeout(() => moveFishRandomly(fish), delay);
            }
        }
    );
}

function restartMovingAllFish() {
    aquarium.FishList.forEach(fish => {
        if (fish.SvgElement) {
            const fishFlipWrapper = fish.SvgElement.parent().parent();
            fishFlipWrapper.stop(true);
            moveFishRandomly(fish);
        }
        else {
            throw new Error(`Fish ${fish.Name} has no SVG element!`);
        }
    });
}

function directFishToFood(fish, foodX, foodY) {
    // Offset target so the fish doesn't "cover" the food awkwardly
    const targetX = foodX - 10;
    const targetY = foodY - 35;

    const fishFlipWrapper = fish.SvgElement.parent().parent();
    const fishRotateWrapper = fish.SvgElement.parent();

    const fishX = fishFlipWrapper.position().left;
    const fishY = fishFlipWrapper.position().top;

    const dx = targetX - fishX;
    const dy = targetY - fishY;
    const distance = Math.hypot(dx, dy);

    // --- Check if reached food ---
    if (distance < 6) {
        aquarium.HasFood = false;
        console.log(`${fish.Name} has reached the food!`);
        fish.FoodEaten += 1;

        $('#CBMI').attr('id', 'closeBottomMenuImg');

        setTimeout(() => {
            $(`img.food`).filter(function () {
                const rect = this.getBoundingClientRect();
                const parentRect = $("#swimZone")[0].getBoundingClientRect();
                const currentLeft = rect.left - parentRect.left;
                const currentTop = rect.top - parentRect.top;

                return Math.abs(currentLeft - foodX) < 10 &&
                    Math.abs(currentTop - foodY) < 10;
            }).remove();
        }, 750);

        updateStats();
        restartMovingAllFish();
        return;
    }

    // --- Movement step ---
    const stepSize = (fish.Speed / 0.6) * 7; // tweak for realism
    const directionX = dx / distance;
    const directionY = dy / distance;
    const newX = fishX + directionX * stepSize;
    const newY = fishY + directionY * stepSize;

    // --- Angle + flipping ---
    const rawAngle = Math.atan2(dy, dx) * 180 / Math.PI;
    const scaleX = dx < 0 ? -1 : 1;

    // Normalize rotation with flip
    const normalizeAngle = angle => (((angle + 180) % 360 + 360) % 360) - 180;
    const rotationToApply = normalizeAngle(scaleX === -1 ? 180 - rawAngle : rawAngle);

    // --- Apply transforms ---
    fishFlipWrapper.css({
        transition: 'transform 0.3s ease',
        transform: `scaleX(${scaleX})`
    });

    fishRotateWrapper.css({
        transition: 'transform 0.2s ease',
        transform: `rotate(${rotationToApply}deg)`
    });

    // --- Animate towards food ---
    fishFlipWrapper.animate(
        { left: newX, top: newY },
        {
            duration: 100, // smoother stepping
            easing: 'linear',
            step: () => havePooChance(fish),
            complete: () => directFishToFood(fish, foodX, foodY)
        }
    );
}

function havePooChance(fish) {
    let random = getRandomNumber(1, 10000 - fish.CostPrice * 20 - fish.Size * 25);
    if (random === 1) {
        const fishFlipWrapper = fish.SvgElement.parent().parent();;
        const fishY = fishFlipWrapper.position().top + 30;

        let fishX;
        if (getScaleX(fishFlipWrapper) === 1) {
            fishX = fishFlipWrapper.position().left;
        }
        else {
            fishX = fishFlipWrapper.position().left + 25;
        }
        spawnPoo(fishX, fishY);
    }
}

function getScaleX(element) {
    const transform = element.css('transform');
    if (transform && transform !== 'none') {
        const values = transform.match(/matrix\(([^)]+)\)/);
        if (values) {
            const parts = values[1].split(', ');
            // parts[0] is scaleX
            return parseFloat(parts[0]);
        }
    }
    return 1; // default scaleX
}

function updateStats() {
    $('#fishFoodAmount').text(player.FoodAmount);
    $("#moneyAmount").text(player.MoneyAmount);
}

function spawnBubble(x, y) {
    // Create a new bubble element
    const bubble = $('<img class="bubble" src="images/airBubble.png" alt="air bubble">');

    // Position the bubble at the click location
    bubble.css({
        left: `${x}px`,
        top: `${y}px`
    });

    // Append to fish tank
    $("#fishTank").append(bubble);

    // remove the bubble after animation ends
    setTimeout(() => {
        bubble.remove();
    }, 2000); // match animation duration
}

function spawnPoo(x, y) {
    // Create a new bubble element
    const poo = $('<img class="poo" src="images/poo.png" alt="poo">');

    // Position the bubble at the click location
    poo.css({
        left: `${x}px`,
        top: `${y}px`
    });

    // Append to poo tank
    $("#fishTank").append(poo);
}

function spawnFood(x, y) {
    setTimeout(function () {
        if (!aquarium.HasFood) {
            const food = $('<img class="food" src="images/fishFood.png" alt="fish food">');
            food.css({
                left: `${x}px`,
                top: `${y + 60}px`
            });
            $("#fishTank").append(food);

            aquarium.HasFood = true;

            $("#closeBottomMenuImg").off("click");
            $('#closeBottomMenuImg').attr('id', 'CBMI');

            // Make all fish swim toward the food
            aquarium.FishList.forEach(fish => {
                if (fish.SvgElement) {
                    const fishFlipWrapper = fish.SvgElement.parent().parent();
                    fishFlipWrapper.stop(); // Stop any current animation
                    directFishToFood(fish, x, y);
                }
                else {
                    throw new Error(`Fish ${fish.Name} has no SVG element!`);
                }
            });
        }
    }, 100);
}

function closeStarterFishModal() {
    $('#starterFishModal').hide();
    $("#modalStarterFishContainer").hide();
}

function openBottomMenu() {
    $("#fishTank").css("height", "85vh");
    $("#bottomMenu").css("display", "flex");
    $("#openBottomMenuImg").css("display", "none");
    $("#closeBottomMenuImg").css("display", "inline-block");
    if (aquarium.HasFood === false) {
        restartMovingAllFish();
    }
}

function closeBottomMenu() {
    $("#fishTank").css("height", "100vh");
    $("#bottomMenu").css("display", "none");
    $("#openBottomMenuImg").css("display", "inline-block");
    $("#closeBottomMenuImg").css("display", "none");
    restartMovingAllFish();
}

function isAnyModalOpen() {
    return $("#modalStarterFishContainer").is(":visible") || $("#modalShopContainer").is(":visible") || $('#fishInfoModal').is(":visible");
}

//#region BASIC HELPER FUNCTIONS

function camelCaseToCapitalizedText(str) {
    if (!str) return "";
    return str
        .replace(/([a-z])([A-Z])/g, "$1 $2") // insert space before capital letters
        .replace(/^./, match => match.toUpperCase()); // capitalize first letter
}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF)
        .toString(16)
        .padStart(6, '0');
}

function getRandomNumber(min, max) {
    // Returns a random integer between min and max, inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isBetween(value, min, max) {
    if (min > max) throw new Error("Min cannot be greater than max in isBetween function!");
    return value >= min && value <= max;
}

function clamp(value, min, max) {
    if (min > max) throw new Error("Min cannot be greater than max in clamp function!");
    return Math.min(Math.max(value, min), max);
}

function swapSign(num) {
    return -num;
}


function isDarkColor(color) {
    if (!color || color.toLowerCase() === "transparent") {
        return false; // treat transparent as light
    }

    // We'll normalize the color into an RGB array: [red, green, blue]
    let rgb = color;

    // Case 1: The color is in HEX format like "#ff8800"
    if (rgb.startsWith("#")) {
        // Remove the "#" and parse the hex string into a number
        let bigint = parseInt(rgb.slice(1), 16);

        // Extract red, green, and blue using bitwise operations
        // Example: for #ff8800 (hex ff8800 = decimal 16744192)
        // r = ff (255), g = 88 (136), b = 00 (0)
        let r = (bigint >> 16) & 255; // shift 16 bits to the right → red
        let g = (bigint >> 8) & 255;  // shift 8 bits → green
        let b = bigint & 255;         // lowest 8 bits → blue

        // Replace rgb variable with array of values
        rgb = [r, g, b];

        // Case 2: The color is already in "rgb(...)" or "rgba(...)" format
    } else if (rgb.startsWith("rgb")) {
        // Grab all the numbers inside the string (ignores "rgb", commas, parentheses)
        // Example: "rgb(255, 136, 0)" → [255, 136, 0]
        rgb = rgb.match(/\d+/g).map(Number).slice(0, 3);
        // slice(0, 3) ensures we drop alpha if it's "rgba(...)"
    } else {
        throw new Error("Unrecognized color format: " + color);
    }

    // Destructure red, green, blue into their own variables
    const [r, g, b] = rgb;

    // Now we compute "perceived brightness" of the color.
    // This isn't a simple average, because human eyes are more sensitive
    // to green, less to blue. The formula weights the channels accordingly.
    //
    // Formula explanation (YIQ color space approximation):
    // brightness = 0.299*R + 0.587*G + 0.114*B
    //
    // Multiplying by 1000 and using integers avoids floating-point mess.
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Pick a threshold to decide what's "dark."
    // Brightness scale goes 0 (black) to 255 (white).
    // 128 is a middle-ish cutoff. Below = "dark", above = "light."
    return brightness < 100;
}

//#endregion


//#region EVENT HANDLERS

$(window).on('resize', function () {
    checkOrientation();
});

$("#fishTank").click(function (event) {
    // Check if the click target is the #swimZone
    const swimZone = $("#swimZone");
    if (event.target !== swimZone[0]) return;

    const x = event.offsetX;
    const y = event.offsetY;

    if (swimZone.hasClass("foodCursor")) {
        if (!aquarium.HasFood) {
            closeBottomMenu();
            try {
                player.FoodAmount -= 1; // Decrease food amount
                spawnFood(x, y);
            }
            catch (errorMsg) {
                alert(errorMsg.message);
            }
        }
    }
    else {
        spawnBubble(x, y);
    }
});

$("#fishFoodImg").click(function () {
    closeBottomMenu();
    if ($("#swimZone").hasClass("dustpanCursor")) {
        $("#swimZone").removeClass("dustpanCursor");
    }
    $("#swimZone").toggleClass("foodCursor");
});

$("#dustpanImg").click(function () {
    closeBottomMenu();
    if ($("#swimZone").hasClass("foodCursor")) {
        $("#swimZone").removeClass("foodCursor");
    }
    $("#swimZone").toggleClass("dustpanCursor");
})

$('#closeFishInfoModal').click(function () {
    $('#fishInfoModal').hide();
    $("#modalFishInfoContainer").hide();
});

$("#starterFish1ButtonHolder").click(function () {
    var fish = starterFishes[0];
    prepareFishForSpawning(fish);
    closeStarterFishModal();
    spawnFish(fish);
});

$("#starterFish2ButtonHolder").click(function () {
    var fish = starterFishes[1];
    prepareFishForSpawning(fish);
    closeStarterFishModal();
    spawnFish(fish);
});

$("#starterFish3ButtonHolder").click(function () {
    var fish = starterFishes[2];
    prepareFishForSpawning(fish);
    closeStarterFishModal();
    spawnFish(fish);
});

$("#openShopImg").click(function () {
    if (!isAnyModalOpen()) {
        $("#modalShopContainer").css("display", "flex");
    }
});

$("#openShopImg").hover(function () {
    if (isAnyModalOpen()) {
        $("#openShopImg").addClass("noClickCursor");
    }
    else {
        $("#openShopImg").removeClass("noClickCursor");
    }
});

$('#closeStarterFishModal').click(function () {
    closeStarterFishModal();
});

$('#closeShopModal').click(function () {
    $("#modalShopContainer").hide();
});

$(document).on('click', '#closeBottomMenuImg', function () {
    closeBottomMenu();
});

$("#openBottomMenuImg").click(function () {
    if (!aquarium.HasFood && !isAnyModalOpen()) {
        openBottomMenu();
    }
});

$("#openBottomMenuImg").hover(function () {
    if (aquarium.HasFood || isAnyModalOpen()) {
        $("#openBottomMenuImg").addClass("noClickCursor");
    }
    else {
        $("#openBottomMenuImg").removeClass("noClickCursor");
    }
});

$("#fishTank").on("mouseenter", ".poo", function () {
    if ($("#swimZone").hasClass("dustpanCursor")) {
        $(this).addClass("dustpanGreenCursor");
    }
});

$("#fishTank").on("mouseleave", ".poo", function () {
    $(this).removeClass("dustpanGreenCursor");
});

$("#fishTank").on("click", ".poo", function () {
    if ($("#swimZone").hasClass("dustpanCursor")) {
        $(this).remove();
        player.MoneyAmount += 3;
        updateStats();
    }
});

$('#fishTank').on("click", '.spawned-fish', function () {
    const fish = $(this).data('fish');
    console.log("--------------------------------------------------");
    console.log("Clicked on fish:");
    console.log(fish);
    console.log("--------------------------------------------------");
    $("#modalFishInfoContainer").css("display", "flex");
    $('#fishInfoModal').show();
    $('#modalFishImgContainer').empty();
    $('#modalFishImgContainer').append(fish.SvgElement.clone());
    $('#modalFishImgContainer svg').toggleClass('spawned-fish');
    $('#modalFishImgContainer svg').css("position", "relative");
    $('#modalFishImgContainer svg').css("top", "0");
    $('#modalFishImgContainer svg').css("left", "0");
    $('#modalFishImgContainer svg').css("scale", "3");
    $('#modalFishImgContainer svg').css("width", "80");
    $('#modalFishImgContainer svg').css("height", "30");
    $('#modalFishImgContainer svg').css("transform", "scaleX(1)");
    $('#modalFishName strong').text(fish.Name);
    $('#modalStatFishType p').text(camelCaseToCapitalizedText(fish.FishTypeName));
    $('#modalTailColor b').text(`Tail Fin Color: ${fish.TailFinColor}`);
    if (isDarkColor(fish.TailFinColor)) {
        $('#modalTailColor b').css('color', 'white');
    }
    else {
        $('#modalTailColor b').css('color', 'black');
    }
    $('#modalTailColor').css("background-color", fish.TailFinColor);
    $('#modalBodyColor b').text(`Body Color: ${fish.BodyColor}`);
    if (isDarkColor(fish.BodyColor)) {
        $('#modalBodyColor b').css('color', 'white');
    }
    else {
        $('#modalBodyColor b').css('color', 'black');
    }
    $('#modalBodyColor').css("background-color", fish.BodyColor);

    if (fish.HasTopFin) {
        $('#modalTopFinColor b').text(`Top Fin Color: ${fish.TopFinColor}`);
        if (isDarkColor(fish.TopFinColor)) {
            $('#modalTopFinColor b').css('color', 'white');
        }
        else {
            $('#modalTopFinColor b').css('color', 'black');
        }
        $('#modalTopFinColor').css("background-color", fish.TopFinColor);
    }
    else {
        $('#modalTopFinColor b').text(`No Top Fin`);
        $('#modalTopFinColor b').css("color", "black");
        $('#modalTopFinColor').css("background-color", "transparent");
    }

    if (fish.HasBottomFin) {
        $('#modalBottomFinColor b').text(`Bottom Fin Color: ${fish.BottomFinColor}`);
        if (isDarkColor(fish.BottomFinColor)) {
            $('#modalBottomFinColor b').css('color', 'white');
        }
        else {
            $('#modalBottomFinColor b').css('color', 'black');
        }
        $('#modalBottomFinColor').css("background-color", fish.BottomFinColor);
    }
    else {
        $('#modalBottomFinColor b').text(`No Bottom Fin`);
        $('#modalBottomFinColor b').css("color", "black");
        $('#modalBottomFinColor').css("background-color", "transparent");
    }

    $('#modalSpeed p').text(`${fish.Speed}`);
    $('#modalStatAge p').text(`${fish.Age}`);
    $('#modalStatSize p').text(`${fish.Size}`);
    $('#modalStatFoodEaten p').text(`${fish.FoodEaten}`);
    $("#modalStatCostPrice p").text(`${fish.CostPrice}`);

    if (fish.HasSideFin) {
        $('#modalSideFinColor b').text(`Side Fin Color: ${fish.SideFinColor}`);
        if (isDarkColor(fish.SideFinColor)) {
            $('#modalSideFinColor b').css('color', 'white');
        }
        else {
            $('#modalSideFinColor b').css('color', 'black');
        }
        $('#modalSideFinColor').css("background-color", fish.SideFinColor);
    }
    else {
        $('#modalSideFinColor b').text(`No Side Fin`);
        $('#modalSideFinColor b').css("color", "black");
        $('#modalSideFinColor').css("background-color", "transparent");
    }

    if (fish.HasPattern) {
        $('#modalPatternColor b').text(`Pattern Color: ${fish.PatternColor}`);
        if (isDarkColor(fish.PatternColor)) {
            $('#modalPatternColor b').css('color', 'white');
        }
        else {
            $('#modalPatternColor b').css('color', 'black');
        }
        $('#modalPatternColor').css("background-color", fish.PatternColor);
    }
    else {
        $('#modalPatternColor b').text(`No Pattern`);
        $('#modalPatternColor b').css("color", "black");
        $('#modalPatternColor').css("background-color", "transparent");
    }
});

//#endregion

function spawnAllFishForTesting() {
    for (let i = 0; i < AllFishTypes.length; i++) {
        spawnNewRandomFish(AllFishTypes[i]);
    }
}


/* THIS FUNCTION IS CURRENTLY NOT IN USE */

function spawnNewRandomFish(fishType) {
    const newFish = new Fish(
        "fish" + parseInt(aquarium.AmountOfFish + 1), // name
        fishType, // fishTypeName
        getRandomColor(), // bodyColor
        getRandomColor(), // tailFinColor
        getRandomNumber(1, 7), // speed
    );


    if (newFish.HasSideFin) newFish.SideFinColor = getRandomColor(); // sideFinColor
    if (newFish.HasPattern) newFish.PatternColor = getRandomColor(); // patternColor
    if (newFish.HasTopFin) newFish.TopFinColor = getRandomColor(); // topFinColor
    if (newFish.HasBottomFin) newFish.BottomFinColor = getRandomColor(); // bottomFinColor

    aquarium.FishList.push(newFish);

    $.get(`assets/media/fish/${fishType}.svg`, function (data) {
        const svg = $(data).find('svg');

        svg.addClass('spawned-fish');
        svg.css({
            '--body-color': newFish.BodyColor,
            '--tail-color': newFish.TailFinColor,
            position: 'absolute',
            top: 0,
            left: 0
        });

        if (newFish.HasPattern) {
            svg.css('--pattern-color', newFish.PatternColor);
        }

        if (newFish.HasSideFin) {
            svg.css('--side-fin-color', newFish.SideFinColor);
        }

        if (newFish.HasTopFin) {
            svg.css('--top-fin-color', newFish.TopFinColor);
        }

        if (newFish.HasBottomFin) {
            svg.css('--bottom-fin-color', newFish.BottomFinColor);
        }

        svg.attr('width', 80);
        svg.attr('height', 30);
        svg.css("stroke", "black");
        svg.css("stroke-width", 1);
        svg.css("stroke-linejoin", "round");
        svg.data('fish', newFish);

        $('#swimZone').append(svg);

        newFish.SvgElement = svg;
        moveFishRandomly(newFish);
    }, 'xml');
}