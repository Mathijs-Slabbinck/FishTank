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

const colors = {
    red: '#FF0000',
    blue: '#0000FF',
    green: '#00FF00',
    yellow: '#FFFF00',
    purple: '#800080',
    black: '#000000',
    white: '#FFFFFF',
    orange: '#FFA500',
    pink: '#FFC0CB',
    cyan: '#00FFFF',
    magenta: '#FF00FF',
    brown: '#A52A2A',
    gray: '#808080',
    darkGreen: '#006400',
    lightGreen: '#90EE90',
    lightGray: '#D3D3D3',
    darkGray: '#A9A9A9',
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32',
    teal: '#008080',
    navy: '#000080',
    maroon: '#800000',
    olive: '#808000',
    coral: '#FF7F50',
    salmon: '#FA8072',
    lavender: '#E6E6FA',
    mint: '#98FF98',
    peach: '#FFDAB9',
    indigo: '#4B0082',
    violet: '#EE82EE',
    lightPink: '#FFB6C1',
    darkRed: '#8B0000',
    darkBlue: '#00008B',
    darkCyan: '#008B8B',
    darkMagenta: '#8B008B',
    darkOrange: '#FF8C00',
    darkOlive: '#556B2F',
    darkSalmon: '#E9967A',
    darkViolet: '#9400D3',
    darkTeal: '#008080',
    darkGrayBlue: '#4682B4',
    darkGrayGreen: '#6B8E23',
    darkGrayRed: '#B22222',
    darkGrayPurple: '#800080',
    darkGrayPink: '#DDA0DD',
    darkGrayGold: '#B8860B',
    darkGraySilver: '#C0C0C0',
    darkGrayBronze: '#CD853F',
    darkGrayTeal: '#008080',
    darkGrayNavy: '#000080',
    darkGrayMaroon: '#800000',
    darkGrayOlive: '#808000',
    darkGrayCoral: '#FF6347',
    darkGraySalmon: '#FA8072',
    darkGrayLavender: '#E6E6FA',
    darkGrayMint: '#98FF98',
    darkGrayPeach: '#FFDAB9',
    darkGrayIndigo: '#4B0082',
    darkGrayViolet: '#EE82EE',
    darkGrayLightPink: '#FFB6C1',
    darkGrayDarkRed: '#8B0000',
    darkGrayDarkBlue: '#00008B',
}

let notRotatedAtStart = false;

var aquarium = new AquariumService("My Aquarium");
var player = new PlayerService("Player1", 10, 100);

$(document).ready(function () {
    if (window.innerWidth < 600) {
        $('#rotatePhone').show();
        $('#fishTank').hide();
        notRotatedAtStart = true;
    } else {
        SpawnFishes();

    }
    UpdateStats();
});

function SpawnFishes() {
    SpawnRandomFish(AllFishTypes.normalBroadback);
    SpawnRandomFish(AllFishTypes.normalOvalfin);
    SpawnRandomFish(AllFishTypes.normalPaddlefin);
    SpawnRandomFish(AllFishTypes.normalRoundback);
    SpawnRandomFish(AllFishTypes.normalSlimtail);
    SpawnRandomFish(AllFishTypes.tigerstripes, true); // Spawn a tigerstripes fish with pattern
    SpawnRandomFish(AllFishTypes.bubblemark, true); // Spawn a bubblemark fish with pattern
    SpawnRandomFish(AllFishTypes.longpaddlefin, true); // Spawn a longpaddlefin fish with pattern
    SpawnRandomFish(AllFishTypes.clownfish, true); // Spawn a clownfish with pattern
    SpawnRandomFish(AllFishTypes.bubbleback, true, false); // Spawn a bubbleback fish with pattern
    SpawnRandomFish(AllFishTypes.wavyfin, true, false); // Spawn a wavyfin fish with pattern
    SpawnRandomFish(AllFishTypes.piranha, true, false); // Spawn a piranha fish with pattern
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
            notRotatedAtStart = false;
            SpawnFishes();
        }
        RestartMovingAllFish();
    }
}


function SpawnRandomFish(fishType, hasPattern = false, hasSideFin = true) {
    console.log(`Spawning fish of type: ${fishType}, hasPattern: ${hasPattern}, hasSideFin: ${hasSideFin}`);
    const topAndBottomFinColor = GetRandomColor();

    // name, fishtype, age, size, isAlive, bodyColor, tailFinColor, bottomFinColor, topFinColor, speed, hasSideFin, sideFinColor, hasPattern
    const newFish = new Fish(
        "fish" + parseInt(aquarium.AmountOfFish + 1), // name
        fishType, // fishTypeName
        1, // age
        1, // size
        true, // isAlive
        GetRandomColor(), // bodyColor
        GetRandomColor(), // tailFinColor
        topAndBottomFinColor, // bottomFinColor
        topAndBottomFinColor, // topFinColor
        GetRandomNumber(1, 7), // speed
        hasSideFin, // hasSideFin
        hasPattern
    );


    if (hasSideFin) {
        newFish.sideFinColor = GetRandomColor(); // Assign a random color for the side fin
    }

    if (hasPattern) {
        newFish.patternColor = GetRandomColor(); // Assign a random color for the pattern
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

        $('#fishTank').append(svg);

        newFish.svgElement = svg;
        MoveFishRandomly(newFish);
    }, 'xml');
}

function MoveFishRandomly(fish) {
    const tankWidth = $('#fishTank').width();
    const tankHeight = $('#fishTank').height();

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
    fish.svgElement.animate({
        left: newX,
        top: newY
    }, duration, 'linear', function () {
        MoveFishRandomly(fish);
    });
}

function RestartMovingAllFish() {
    aquarium.FishList.forEach(fish => {
        if (fish.svgElement) {
            fish.svgElement.stop(true);
            MoveFishRandomly(fish);
        }
    });
}

function DirectFishToFood(fish, foodX, foodY) {
    isFoodInAquarium = true;
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
                const parentRect = $("#fishTank")[0].getBoundingClientRect();

                // Convert rect to container-relative coordinates
                const currentLeft = rect.left - parentRect.left;
                const currentTop = rect.top - parentRect.top;
                return Math.abs(currentLeft - foodX) < 10 && Math.abs(currentTop - foodY) < 10;
            }).remove();
        }, 750);

        aquarium.HasFood = false; // Reset food availability
        UpdateStats(); // Update food amount display
        RestartMovingAllFish();
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
        100, // milliseconds per step
        function () {
            DirectFishToFood(fish, foodX, foodY); // Continue until close
        }
    );
}



function GetRandomColor() {
    const colorKeys = Object.keys(colors);
    const randomIndex = Math.floor(Math.random() * colorKeys.length);
    return colors[colorKeys[randomIndex]];
}

function GetRandomNumber(min, max) {
    // Returns a random integer between min and max, inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function UpdateStats() {
    $('#fishFoodAmount').text(player.FoodAmount);
    $("#moneyAmount").text(player.MoneyAmount);
}



$("#openBottomMenuImg").click(function () {
    if (!aquarium.HasFood) {
        OpenBottomMenu();
    }
});

$(document).on('click', '#closeBottomMenuImg', function () {
    CloseBottomMenu();
});

function OpenBottomMenu() {
    $("#fishTank").css("height", "85vh");
    $("#bottomMenu").css("display", "flex");
    $("#openBottomMenuImg").css("display", "none");
    $("#closeBottomMenuImg").css("display", "inline-block");
    if (aquarium.HasFood === false) {
        RestartMovingAllFish();
    }
}

function CloseBottomMenu() {
    $("#fishTank").css("height", "100vh");
    $("#bottomMenu").css("display", "none");
    $("#openBottomMenuImg").css("display", "inline-block");
    $("#closeBottomMenuImg").css("display", "none");
    RestartMovingAllFish();
}

$("#fishFoodImg").click(function () {
    CloseBottomMenu();
    $("#fishTank").toggleClass("foodCursor");
});

$("#fishTank").click(function (event) {
    // Check if the click target is the #fishTank itself, not its children
    if (event.target !== this) return;

    const x = event.offsetX;
    const y = event.offsetY;

    if ($(this).hasClass("foodCursor")) {
        if (!aquarium.HasFood) {
            CloseBottomMenu();
            try {
                player.FoodAmount -= 1; // Decrease food amount
                SpawnFood(x, y);
            }
            catch (errorMsg) {
                alert(errorMsg.message);
            }
        }
    }
    else {
        SpawnBubble(x, y);
    }
});

function SpawnBubble(x, y) {
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

function SpawnFood(x, y) {
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
                    fish.svgElement.stop(true); // Stop any current animation
                    DirectFishToFood(fish, x, y);
                }
            });
        }
    }, 100);
}


$('#fishTank').on('click', '.spawned-fish', function () {
    const fish = $(this).data('fish');
    console.log(fish);
    $(".modalContainer").css("display", "flex");
    $('#fishModal').show();
    $('#modalFishImgContainer').empty();
    $('#modalFishImgContainer').append(fish.svgElement.clone());
    $('#modalFishImgContainer svg').toggleClass('spawned-fish');
    $('#modalFishImgContainer svg').css("position", "relative");
    $('#modalFishImgContainer svg').css("top", "0");
    $('#modalFishImgContainer svg').css("left", "0");
    $('#modalFishImgContainer svg').css("scale", "3");
    $('#modalFishImgContainer svg').css("width", "80");
    $('#modalFishImgContainer svg').css("height", "30");
    $('#modalFishName strong').text(fish.Name);
    $('#modalTailColor b').text(`Tail Fin Color: ${fish.TailFinColor}`);
    $('#modalTailColor').css("background-color", fish.TailFinColor);
    $('#modalBodyColor b').text(`Body Color: ${fish.BodyColor}`);
    $('#modalBodyColor').css("background-color", fish.BodyColor);
    $('#modalFinColor b').text(`Fin Color: ${fish.BottomFinColor}`);
    $('#modalFinColor').css("background-color", fish.BottomFinColor);
    $('#modalSpeed p').text(`${fish.Speed}`);
    $('#modalStatAge p').text(`${fish.Age}`);
    $('#modalStatSize p').text(`${fish.Size}`);
    $('#modalStatFoodEaten p').text(`${fish.FoodEaten}`);
    $("#modalStatCostPrice p").text(`${fish.CostPrice}`);
    $("#modalStatHunger p").text(`${fish.HungerAmount}`);
    if (fish.hasSideFin) {
        $('#modalSideFinColor b').text(`Side Fin Color: ${fish.SideFinColor}`);
        $('#modalSideFinColor').css("background-color", fish.SideFinColor);
    }
    else {
        $('#modalSideFinColor b').text(`No Side Fin`);
        $('#modalSideFinColor').css("background-color", "transparent");
    }

    if (fish.hasPattern) {
        $('#modalPatternColor b').text(`Pattern Color: ${fish.patternColor}`);
        $('#modalPatternColor').css("background-color", fish.patternColor);
    }
    else {
        $('#modalPatternColor b').text(`No Pattern`);
        $('#modalPatternColor').css("background-color", "transparent");
    }
});

$(window).on('resize', function () {
    checkOrientation();
});

$('#closeModal').click(function () {
    $('#fishModal').hide();
    $(".modalContainer").hide();
});