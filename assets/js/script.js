/* jshint esversion: 6 */

"use strict";

const AllFishTypes = {
    normalBroadback: 'normalBroadback',
    normalOvalfin: 'normalOvalfin',
    normalPaddlefin: 'normalPaddlefin',
    normalRoundback: 'normalRoundback',
    normalSlimtail: 'normalSlimtail',
    bubblemark: 'bubblemark',
    tigerstripes: 'tigerstripes',
    longpaddlefin: 'longpaddlefin',
    clownfish: 'clownfish',
    bubbleback: 'bubbleback',
    wavyfin: 'wavyfin',
    piranha: 'piranha'
};

const NormalFishTypes = [
    AllFishTypes.normalBroadback,
    AllFishTypes.normalOvalfin,
    AllFishTypes.normalPaddlefin,
    AllFishTypes.normalRoundback,
    AllFishTypes.normalSlimtail
];

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

function getRandomNormalFishType() {
    const randomIndex = Math.floor(Math.random() * NormalFishTypes.length);
    return NormalFishTypes[randomIndex];
}


/*
function SpawnFishes() {
    spawnRandomFish(AllFishTypes.normalBroadback);
    spawnRandomFish(AllFishTypes.normalOvalfin);
    spawnRandomFish(AllFishTypes.normalPaddlefin);
    spawnRandomFish(AllFishTypes.normalRoundback);
    spawnRandomFish(AllFishTypes.normalSlimtail);
    spawnRandomFish(AllFishTypes.tigerstripes, true); // Spawn a tigerstripes fish with pattern
    spawnRandomFish(AllFishTypes.bubblemark, true); // Spawn a bubblemark fish with pattern
    spawnRandomFish(AllFishTypes.longpaddlefin, true); // Spawn a longpaddlefin fish with pattern
    spawnRandomFish(AllFishTypes.clownfish, true); // Spawn a clownfish with pattern
    spawnRandomFish(AllFishTypes.bubbleback, true, false); // Spawn a bubbleback fish with pattern
    spawnRandomFish(AllFishTypes.wavyfin, true, false); // Spawn a wavyfin fish with pattern
    spawnRandomFish(AllFishTypes.piranha, true, false); // Spawn a piranha fish with pattern
}
    */

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

function pushStarterFishes() {
    createStarterFish(getRandomNormalFishType()).then(fish => {
        starterFishes.push(fish);
        fish.svgElement.css({ top: '', left: '' });
        fish.svgElement.css({ position: 'relative', scale: '3', transform: 'scaleX(1)' });
        fish.svgElement.css("margin", "5vh auto 5vh auto");
        $("#starterFish1Block").append(fish.svgElement);
        console.log(fish);
    });

    createStarterFish(getRandomNormalFishType()).then(fish => {
        starterFishes.push(fish);
        fish.svgElement.css({ top: '', left: '' });
        fish.svgElement.css({ position: 'relative', scale: '3', transform: 'scaleX(1)' });
        fish.svgElement.css("margin", "5vh auto 5vh auto");
        $("#starterFish2Block").append(fish.svgElement);
        console.log(fish);
    });

    createStarterFish(getRandomNormalFishType()).then(fish => {
        starterFishes.push(fish);
        fish.svgElement.css({ top: '', left: '' });
        fish.svgElement.css({ position: 'relative', scale: '3', transform: 'scaleX(1)' });
        fish.svgElement.css("margin", "5vh auto 5vh auto");
        $("#starterFish3Block").append(fish.svgElement);
        console.log(fish);
    });
}

$("#starterFish1ButtonHolder").click(function () {
    var fish = starterFishes[0];
    fish.svgElement.css({ position: 'absolute', top: 0, left: 0, scale: '', transform: 'scaleX(1)' });
    closeStarterFishModal();
    spawnFish(fish);
});

$("#starterFish2ButtonHolder").click(function () {
    var fish = starterFishes[1];
    fish.svgElement.css({ position: 'absolute', top: 0, left: 0, scale: '', transform: 'scaleX(1)' });
    closeStarterFishModal();
    spawnFish(fish);
});

$("#starterFish3ButtonHolder").click(function () {
    var fish = starterFishes[2];
    fish.svgElement.css({ position: 'absolute', top: 0, left: 0, scale: '', transform: 'scaleX(1)' });
    closeStarterFishModal();
    spawnFish(fish);
});

function createStarterFish(fishType, hasPattern = false, hasSideFin = true) {
    return new Promise((resolve, reject) => {
        const topAndBottomFinColor = getRandomColor();
        const newFish = new Fish(
            "fish" + parseInt(aquarium.AmountOfFish + 1),
            fishType,
            1,
            1,
            true,
            getRandomColor(),
            getRandomColor(),
            topAndBottomFinColor,
            topAndBottomFinColor,
            getRandomNumber(1, 7),
            hasSideFin,
            hasPattern
        );

        if (hasSideFin) newFish.sideFinColor = getRandomColor();
        if (hasPattern) newFish.patternColor = getRandomColor();

        $.get(`assets/media/fish/${fishType}.svg`, function (data) {
            const svg = $(data).find('svg');
            svg.addClass('spawned-fish').css({
                '--body-color': newFish.BodyColor,
                '--tail-color': newFish.TailFinColor,
                '--fin-color': newFish.BottomFinColor,
                position: 'absolute',
                top: 0,
                left: 0
            });

            if (hasPattern) svg.css('--pattern-color', newFish.patternColor);
            if (hasSideFin) svg.css('--side-fin-color', newFish.sideFinColor);

            svg.attr({ width: 80, height: 30 });
            svg.data('fish', newFish);
            newFish.svgElement = svg;

            resolve(newFish);
        }, 'xml').fail(reject);
    });
}


/* THIS FUNCTION IS UNUSED NOW */

function spawnRandomFish(fishType, hasPattern = false, hasSideFin = true) {
    console.log(`Spawning fish of type: ${fishType}, hasPattern: ${hasPattern}, hasSideFin: ${hasSideFin}`);
    const topAndBottomFinColor = getRandomColor();

    // name, fishtype, age, size, isAlive, bodyColor, tailFinColor, bottomFinColor, topFinColor, speed, hasSideFin, sideFinColor, hasPattern
    const newFish = new Fish(
        "fish" + parseInt(aquarium.AmountOfFish + 1), // name
        fishType, // fishTypeName
        1, // age
        1, // size
        true, // isAlive
        getRandomColor(), // bodyColor
        getRandomColor(), // tailFinColor
        topAndBottomFinColor, // bottomFinColor
        topAndBottomFinColor, // topFinColor
        getRandomNumber(1, 7), // speed
        hasSideFin, // hasSideFin
        hasPattern
    );


    if (hasSideFin) {
        newFish.sideFinColor = getRandomColor(); // Assign a random color for the side fin
    }

    if (hasPattern) {
        newFish.patternColor = getRandomColor(); // Assign a random color for the pattern
    }

    aquarium.FishList.push(newFish);

    $.get(`assets/media/fish/${fishType}.svg`, function (data) {
        const svg = $(data).find('svg');

        svg.addClass('spawned-fish');
        svg.css({
            '--body-color': newFish.BodyColor,
            '--tail-color': newFish.TailFinColor,
            '--fin-color': newFish.BottomFinColor,
            position: 'absolute',
            top: 0,
            left: 0
        });

        if (hasPattern) {
            svg.css('--pattern-color', newFish.patternColor);
        }

        if (hasSideFin) {
            svg.css('--side-fin-color', newFish.sideFinColor);
        }

        svg.attr('width', 80);
        svg.attr('height', 30);
        svg.data('fish', newFish);

        $('#swimZone').append(svg);

        newFish.svgElement = svg;
        moveFishRandomly(newFish);
    }, 'xml');
}

function spawnFish(fish) {
    aquarium.FishList.push(fish);
    $('#swimZone').append(fish.svgElement);
    moveFishRandomly(fish);
}

function moveFishRandomly(fish) {
    havePooChance(fish);
    const tankWidth = $('#swimZone').width();
    const tankHeight = $('#swimZone').height();

    const maxX = tankWidth - fish.svgElement.width();
    const maxY = tankHeight - fish.svgElement.height();

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    // Get current position
    const currentPos = fish.svgElement.position();
    const dx = newX - currentPos.left;
    const dy = newY - currentPos.top;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = fish.speed * 15; // px/sec
    const duration = (distance / speed) * 1000;

    // Flip direction based on movement
    if (dx < 0) {
        fish.svgElement.css('transform', 'scaleX(-1)');
    } else {
        fish.svgElement.css('transform', 'scaleX(1)');
    }

    // Animate movement
    fish.svgElement.animate(
        {
            left: newX,
            top: newY
        },
        {
            duration: duration,
            easing: 'linear',
            step: function () {
                havePooChance(fish);
            },
            complete: function () {
                moveFishRandomly(fish);
            }
        }
    );
}

function restartMovingAllFish() {
    aquarium.FishList.forEach(fish => {
        if (fish.svgElement) {
            fish.svgElement.stop(true);
            moveFishRandomly(fish);
        }
    });
}

function directFishToFood(fish, foodX, foodY) {
    const fishX = fish.svgElement.position().left;
    const fishY = fish.svgElement.position().top;
    const deltaX = foodX - fishX;
    const deltaY = foodY - fishY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < 6) {
        // Fish has reached the food
        aquarium.HasFood = false;
        console.log(`${fish.Name} has reached the food!`);
        fish.FoodEaten += 1; // Increment food eaten count
        $('#CBMI').attr('id', 'closeBottomMenuImg');
        setTimeout(function () {
            $(`img.food`).filter(function () {
                const food = $(this)[0];
                const rect = food.getBoundingClientRect();
                const parentRect = $("#swimZone")[0].getBoundingClientRect();

                // Convert rect to container-relative coordinates
                const currentLeft = rect.left - parentRect.left;
                const currentTop = rect.top - parentRect.top;
                return Math.abs(currentLeft - foodX) < 10 && Math.abs(currentTop - foodY) < 10;
            }).remove();
        }, 750);

        aquarium.HasFood = false; // Reset food availability
        updateStats(); // Update food amount display
        restartMovingAllFish();
        return;
    }

    // Move closer to the food position each step
    const speed = fish.speed * 3; // Adjust pixels per step for smoothness
    const directionX = deltaX / distance;
    const directionY = deltaY / distance;
    const newX = fishX + directionX * speed;
    const newY = fishY + directionY * speed;

    // Flip direction based on movement
    if (deltaX < 0) {
        fish.svgElement.css('transform', 'scaleX(-1)');
    } else {
        fish.svgElement.css('transform', 'scaleX(1)');
    }

    fish.svgElement.animate(
        { left: newX, top: newY },
        {
            duration: 100, // miliseconds per step
            step: function () {
                havePooChance(fish);
            },
            complete: function () {
                directFishToFood(fish, foodX, foodY);
            }
        }
    );

}

function havePooChance(fish) {
    let random = getRandomNumber(1, 10000 - fish.CostPrice * 20 - fish.Size * 25);
    if (random === 1) {
        const fishX = fish.svgElement.position().left;
        const fishY = fish.svgElement.position().top;
        spawnPoo(fishX, fishY);
    }
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

function updateStats() {
    $('#fishFoodAmount').text(player.FoodAmount);
    $("#moneyAmount").text(player.MoneyAmount);
}



$("#openBottomMenuImg").click(function () {
    if (!aquarium.HasFood) {
        openBottomMenu();
    }
});

$("#openBottomMenuImg").hover(function () {
    if (aquarium.HasFood) {
        $("#openBottomMenuImg").addClass("noClickCursor");
    }
    else {
        $("#openBottomMenuImg").removeClass("noClickCursor");
    }
});

$(document).on('click', '#closeBottomMenuImg', function () {
    closeBottomMenu();
});

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
                if (fish.svgElement) {
                    fish.svgElement.stop(); // Stop any current animation
                    directFishToFood(fish, x, y);
                }
            });
        }
    }, 100);
}


$('#fishTank').on("click", '.spawned-fish', function () {
    const fish = $(this).data('fish');
    console.log(fish);
    $("#modalFishInfoContainer").css("display", "flex");
    $('#fishInfoModal').show();
    $('#modalFishImgContainer').empty();
    $('#modalFishImgContainer').append(fish.svgElement.clone());
    $('#modalFishImgContainer svg').toggleClass('spawned-fish');
    $('#modalFishImgContainer svg').css("position", "relative");
    $('#modalFishImgContainer svg').css("top", "0");
    $('#modalFishImgContainer svg').css("left", "0");
    $('#modalFishImgContainer svg').css("scale", "3");
    $('#modalFishImgContainer svg').css("width", "80");
    $('#modalFishImgContainer svg').css("height", "30");
    $('#modalFishImgContainer svg').css("transform", "scaleX(1)");
    $('#modalFishName strong').text(fish.Name);
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
    $('#modalFinColor b').text(`Fin Color: ${fish.BottomFinColor}`);
    if (isDarkColor(fish.BottomFinColor)) {
        $('#modalFinColor b').css('color', 'white');
    }
    else {
        $('#modalFinColor b').css('color', 'black');
    }
    $('#modalFinColor').css("background-color", fish.BottomFinColor);
    $('#modalSpeed p').text(`${fish.Speed}`);
    $('#modalStatAge p').text(`${fish.Age}`);
    $('#modalStatSize p').text(`${fish.Size}`);
    $('#modalStatFoodEaten p').text(`${fish.FoodEaten}`);
    $("#modalStatCostPrice p").text(`${fish.CostPrice}`);
    $("#modalStatHunger p").text(`${fish.HungerAmount}`);

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

$(window).on('resize', function () {
    checkOrientation();
});

$('#closeFishInfoModal').click(function () {
    $('#fishInfoModal').hide();
    $("#modalFishInfoContainer").hide();
});

$('#closeStarterFishModal').click(function () {
    closeStarterFishModal();
});

function closeStarterFishModal() {
    $('#starterFishModal').hide();
    $("#modalStarterFishContainer").hide();
}

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



/* vvv !!! CHATGPT WITH EXTRA COMMENTS; UNDERSTAND THIS !!! vvv */


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


/* TEMP FUNCTION TO TEST vvv */

function getBrightNessLevel(color) {
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
    return brightness;
}