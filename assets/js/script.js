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
let allFishes = [];
let clickedFish = null;
let selectedAquariumIndex = 0;
let selectedSaveFileIndex = 0;
let autoSaveTimeoutId = null;
let saveFiles = [];
var player;
let backgroundMusic;

$(document).ready(function () {
    if (window.innerWidth < 600) {
        $('#rotatePhone').show();
        $('#fishTank').hide();
        $('#coinDisplayBlock').hide();
        $('#openShopImg').hide();
        $('#settingsImg').hide();
        notRotatedAtStart = true;
    } else {
        startNewGame();
        /*
        pushStarterFishes();
        */
    }
    //updateStats();
});

// check if this works

function autoSaver() {
    // Stop if auto-save is off
    if (!player.AutoSaveOn) return;

    // Perform save
    saveToLocalStorage();
    console.log("Game auto-saved on " + new Date().toLocaleString() + ".");
    spawnGameSavedText();

    // Clear any previous scheduled timeout to prevent double scheduling
    if (autoSaveTimeoutId !== null) {
        clearTimeout(autoSaveTimeoutId);
    }

    // Schedule next auto-save in 1 minute (60000 ms)
    autoSaveTimeoutId = setTimeout(autoSaver, 60000);
}

function stopAutoSaver() {
    if (autoSaveTimeoutId !== null) {
        clearTimeout(autoSaveTimeoutId);
        autoSaveTimeoutId = null;
    }
}

function checkOrientation() {
    if (window.innerWidth < 600) {
        $('#rotatePhone').show();
        $('#fishTank').hide();
        $('#coinDisplayBlock').hide();
        $('#openShopImg').hide();
        $('#settingsImg').hide();
    } else {
        $('#rotatePhone').hide();
        $('#fishTank').show();
        $('#coinDisplayBlock').show();
        $('#openShopImg').show();
        $('#settingsImg').show();

        if (notRotatedAtStart) {
            startNewGame();
            /*
            pushStarterFishes();
            pushShopFishes();
            */
            notRotatedAtStart = false;
        }
    }
}

function startNewGame() {
    loadFromLocalStorage();

    for (let i = 0; i < saveFiles.length; i++) {
        const saveFileBlock = $('<div class="saveFileBlock" id="saveFile' + (i + 1) + '"><div class="saveFileInfo"><strong>Save File ' + (i + 1) + '</strong><p>Amount of Fish: <span id="saveFile' + (i + 1) + 'FishAmount">' + saveFiles[i].FishAmount + '</span></p><p>Coins: <span id="saveFile' + (i + 1) + 'MoneyAmount">' + saveFiles[i].MoneyAmount + '</span></p></div><div id="startMenuButtonsContainer"><div class="modalButtonBlock greenButton loadFileButtonHolder" id="loadFileButton' + (i + 1) + '"><p class="clickAble">load</p></div><div class="modalButtonBlock redButton deleteFileButtonHolder" id="deleteFileButton' + (i + 1) + '"><p class="clickAble">delete</p></div></div></div>');

        $("#modalSaveFilesContainer").append(saveFileBlock);
    }

    const newGameBlock = $('<div id="startNewGameBlock"><div class="modalButtonBlock greenButton" id="startNewGameButtonHolder"><p class="clickAble" id="startNewGameButton">start new game</p></div></div>');

    $('#modalSaveFilesContainer').append(newGameBlock);
}

function applyFishColors(fish) {
    const $svg = fish.SvgElement;

    $svg.css({
        '--body-color': fish.BodyColor,
        '--tail-color': fish.TailFinColor,
        '--top-fin-color': fish.TopFinColor,
        '--bottom-fin-color': fish.BottomFinColor,
        '--side-fin-color': fish.SideFinColor,
        '--pattern-color': fish.PatternColor
    });
}

function toggleMusic() {
    if (player.BackgroundMusicOn) {
        backgroundMusic.pause();
        player.BackgroundMusicOn = false;
    }
    else {
        backgroundMusic.play();
        player.BackgroundMusicOn = true;
    }
    updateStats();
}

function startBackGroundMusic() {
    if (player.BackgroundMusicOn === false) return;
    backgroundMusic = new Audio('/assets/media/audio/backgroundMusic1.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 1;
    backgroundMusic.play();
}

async function loadAquarium() {
    $("#swimZone").empty(); // clear the DOM

    const aquarium = player.AquariumList[0];
    if (!aquarium || !aquarium.FishList) return;

    // Only assign SVGs if they don't already have one
    for (let fish of aquarium.FishList) {
        if (!fish.SvgElement) {
            fish = await assignSvgToFish(fish);
        }

        applyFishColors(fish);
        prepareAndAppendFishToSwimZone(fish);
        finalSpawn(fish);
    }

    pushShopFishes();
}

async function assignSvgToFish(fish) {
    const path = FishSvgPaths[fish.FishTypeName];
    if (!path) throw new Error(`No SVG path defined for fish type ${fish.FishTypeName}`);

    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load SVG for ${fish.FishTypeName}`);

    const svgText = await response.text();
    const $svg = $(svgText);
    $svg.addClass('spawned-fish');

    // --- Generate unique ID for patterns ---
    $svg.find('pattern').each((i, pattern) => {
        const $pattern = $(pattern);
        const oldId = $pattern.attr('id');
        if (!oldId) return;

        const newId = `${oldId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
        $pattern.attr('id', newId);

        // Update all references inside this SVG
        $svg.find(`[fill="url(#${oldId})"]`).attr('fill', `url(#${newId})`);
    });

    // Apply colors via CSS variables
    $svg.css({
        '--body-color': fish.BodyColor,
        '--tail-color': fish.TailFinColor,
        '--top-fin-color': fish.TopFinColor,
        '--bottom-fin-color': fish.BottomFinColor,
        '--side-fin-color': fish.SideFinColor,
        '--pattern-color': fish.PatternColor
    });

    fish.SvgElement = $svg;
    return fish;
}

async function pushStarterFishes() {
    let starterFishTypes = [];
    while (starterFishTypes.length < 3) {
        let fishType = getRandomNormalFishType();
        if (!starterFishTypes.includes(fishType)) {
            starterFishTypes.push(fishType);
        }
    }

    const fish1 = await createNewFish(starterFishTypes[0], true, true);
    addFishToBlock(fish1, "#starterFish1Block");
    starterFishes.push(fish1);

    const fish2 = await createNewFish(starterFishTypes[1], true, true);
    addFishToBlock(fish2, "#starterFish2Block");
    starterFishes.push(fish2);

    const fish3 = await createNewFish(starterFishTypes[2], true, true);
    addFishToBlock(fish3, "#starterFish3Block");
    starterFishes.push(fish3);
}

async function pushShopFishes() {
    const allFishTypeValues = Object.values(AllFishTypes);

    for (let i = 0; i < allFishTypeValues.length; i += 3) {

        const fishType1 = allFishTypeValues[i];
        const fishType2 = allFishTypeValues[i + 1];
        const fishType3 = allFishTypeValues[i + 2];

        const newBlock = $('<div class="fishShopFishRow"><div class="fishBlock" id="fishBlock' + i + '"><p id="fishTypeName' + i + '">' + fishType1 + '</p></div><div class="fishBlock" id="fishBlock' + (i + 1) + '"><p id="fishTypeName' + (i + 1) + '">' + fishType2 + '</p></div><div class="fishBlock" id="fishBlock' + (i + 2) + '"><p id="fishTypeName' + (i + 2) + '">' + fishType3 + '</p></div></div>');

        const buyButton1 = $('<div class="modalButtonBlock greenButton buyFishButton" id="modalBuyFish' + i + '"><p class="clickAble">buy</p></div>');
        const buyButton2 = $('<div class="modalButtonBlock greenButton buyFishButton" id="modalBuyFish' + (i + 1) + '"><p class="clickAble">buy</p></div>');
        const buyButton3 = $('<div class="modalButtonBlock greenButton buyFishButton" id="modalBuyFish' + (i + 2) + '"><p class="clickAble">buy</p></div>');

        $('#fishShopItemsContainer').append(newBlock);

        const fishTypeNameBlock1 = newBlock.find('#fishTypeName' + i);
        const fishTypeNameBlock2 = newBlock.find('#fishTypeName' + (i + 1));
        const fishTypeNameBlock3 = newBlock.find('#fishTypeName' + (i + 2));

        fishTypeNameBlock1.text(camelCaseToCapitalizedText(fishType1));
        fishTypeNameBlock2.text(camelCaseToCapitalizedText(fishType2));
        fishTypeNameBlock3.text(camelCaseToCapitalizedText(fishType3));

        const innerFishBlock1 = newBlock.find('#fishBlock' + i);
        const innerFishBlock2 = newBlock.find('#fishBlock' + (i + 1));
        const innerFishBlock3 = newBlock.find('#fishBlock' + (i + 2));

        const fish1 = await createNewFish(fishType1, false);
        const fish2 = await createNewFish(fishType2, false);
        const fish3 = await createNewFish(fishType3, false);

        allFishes.push(fish1);
        allFishes.push(fish2);
        allFishes.push(fish3);

        const CostPriceBlock = $('<p class="costPrice">Price: ' + fish1.CostPrice + '</p>')
        const CostPriceBlock2 = $('<p class="costPrice">Price: ' + fish2.CostPrice + '</p>')
        const CostPriceBlock3 = $('<p class="costPrice">Price: ' + fish3.CostPrice + '</p>')


        addFishToBlock(fish1, innerFishBlock1);
        addFishToBlock(fish2, innerFishBlock2);
        addFishToBlock(fish3, innerFishBlock3);

        innerFishBlock1.append(buyButton1);
        innerFishBlock2.append(buyButton2);
        innerFishBlock3.append(buyButton3);

        innerFishBlock1.append(CostPriceBlock);
        innerFishBlock2.append(CostPriceBlock2);
        innerFishBlock3.append(CostPriceBlock3);
    }
}

function createNewFish(fishType, useRandomColors, isStarterFish = false) {
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
            "fish" + parseInt(player.AquariumList[selectedAquariumIndex].AmountOfFish + 1),
            // fishTypeName
            fishType,
            // bodyColor
            bodyColor,
            // tailFinColor
            tailFinColor,
            player.AquariumList[selectedAquariumIndex].AmountOfFish + 1, // id
            isStarterFish, // isStarterFish
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
            /*
            svg.add(svg.find('*')).css({
                "stroke": "black",
                "stroke-width": "0.6px",
                "stroke-linejoin": "round"
            });
            */
            svg.data('fish', newFish);
            newFish.SvgElement = svg;

            resolve(newFish);
        }, 'xml').fail(reject);
    });
}

function addFishToBlock(fish, blockSelector) {
    fish.SvgElement.css({ top: '', left: '' });
    fish.SvgElement.css({ position: 'relative', scale: '3', transform: 'scaleX(1)' });
    fish.SvgElement.css("margin", "5vh auto 5vh auto");
    $(blockSelector).append(fish.SvgElement);
}

function prepareFishForSpawning(fish) {
    fish.SvgElement.css({ scale: '' });

    const fishFlipWrapper = $('<span class="fish-flip-wrapper"><span class="fish-rotate-wrapper"></span></span>');
    fishFlipWrapper.find('.fish-rotate-wrapper').append(fish.SvgElement);

    fishFlipWrapper.css({
        position: 'absolute',
        left: 100,
        top: 100,
        zIndex: 5
    });
}

function spawnFish(fish) {
    player.AquariumList[selectedAquariumIndex].FishList.push(fish);
    fish.SvgElement.addClass('spawned-fish');

    const fishFlipWrapper = fish.SvgElement.parent().parent();
    $('#swimZone').append(fishFlipWrapper);

    moveFishRandomly(fish);
}

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
        newY = zoneY - 40 + Math.random() * (zoneHeight - fishFlipWrapper.height() + 40);
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
        transform: `scaleX(${scaleX})`
    });

    fishRotateWrapper.css({
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
    player.AquariumList[selectedAquariumIndex].FishList.forEach(fish => {
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
    const fishFlipWrapper = fish.SvgElement.parent().parent();
    const fishRotateWrapper = fish.SvgElement.parent();

    const fishOffset = fishFlipWrapper.position(); // relative to parent
    const fishX = fishOffset.left;
    const fishY = fishOffset.top;

    const dx = foodX - fishX;
    const dy = foodY - fishY;
    const distance = Math.hypot(dx, dy);

    // --- Check if fish reached the food ---
    if (distance < 8) {
        player.AquariumList[selectedAquariumIndex].HasFood = false;
        console.log(`${fish.Name} has reached the food!`);
        fish.FoodEaten += 1;

        $('#CBMI').attr('id', 'closeBottomMenuImg');

        // Remove the food using the stored target data
        $('img.food').each(function () {
            const foodPos = $(this).data('foodTarget');
            if (!foodPos) return;
            const dist = Math.hypot(foodPos.x - foodX, foodPos.y - foodY);
            if (dist < 10) $(this).remove();
        });

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
    const normalizeAngle = angle => (((angle + 180) % 360 + 360) % 360) - 180;
    const rotationToApply = normalizeAngle(scaleX === -1 ? 180 - rawAngle : rawAngle);

    fishFlipWrapper.css({ transform: `scaleX(${scaleX})` });
    fishRotateWrapper.css({ transform: `rotate(${rotationToApply}deg)` });

    // --- Animate towards food ---
    fishFlipWrapper.animate(
        { left: newX, top: newY },
        {
            duration: 100,
            easing: 'linear',
            step: () => havePooChance(fish),
            complete: () => directFishToFood(fish, foodX, foodY)
        }
    );
}

function havePooChance(fish) {
    // increase when buying fish gets possible
    let random = getRandomNumber(1, 100000 - (fish.CostPrice * 5 + fish.Size * 5));
    if (random === 1) {
        const fishFlipWrapper = fish.SvgElement.parent().parent();
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

function updateStats() {
    if (player.BackgroundMusicOn) {
        $("#modalMusicButtonHolder").removeClass("redButton").addClass("greenButton").find("p").text("music: ON");
        $('#musicOnIcon').show();
        $('#musicOffIcon').hide();
    }
    else {
        $("#modalMusicButtonHolder").removeClass("greenButton").addClass("redButton").find("p").text("music: OFF");
        $('#musicOnIcon').hide();
        $('#musicOffIcon').show();
    }

    if (player.AutoSaveOn) {
        $("#modalAutoSaveButtonHolder").removeClass("redButton").addClass("greenButton").find("p").text("auto-save: ON");
        $('#autoSaveOnIcon').show();
        $('#autoSaveOffIcon').hide();
        setTimeout(autoSaver, 30000);
    }
    else {
        $("#modalAutoSaveButtonHolder").removeClass("greenButton").addClass("redButton").find("p").text("auto-save: OFF");
        $('#autoSaveOnIcon').hide();
        $('#autoSaveOffIcon').show();
        stopAutoSaver();
    }

    $('#fishFoodAmount').text(player.FoodAmount);
    $("#moneyAmount").text(player.MoneyAmount);
}

function spawnGameSavedText(autoSave = true) {
    let savedText;
    if (autoSave) {
        savedText = $('<div id="gameSavedText">💾 game auto-saved ✅</div>');
    }
    else {
        savedText = $('<div id="gameSavedText">💾 game saved ✅</div>');
    }

    $("#fishTank").append(savedText);

    setTimeout(() => {
        savedText.fadeOut(500, function () {
            $(this).remove();
        });
    }, 4100);
}

function spawnBubble(x, y) {
    // Create a new bubble element
    const bubble = $('<img class="bubble" src="images/airBubble.png" alt="air bubble">');

    // Position the bubble at the click location
    bubble.css({
        left: `${x}px`,
        top: `${y + 100}px`
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
        top: `${y + 120}px`
    });

    // Append to poo tank
    $("#fishTank").append(poo);
}

function spawnFood(x, y) {
    setTimeout(function () {
        if (!player.AquariumList[selectedAquariumIndex].HasFood) {
            const swimZone = $('#swimZone');
            const zoneOffset = swimZone.offset();

            // Food position relative to #swimZone
            const foodX = x - zoneOffset.left;
            const foodY = y - zoneOffset.top;

            // Offset for fish animation if you move them up visually
            const fishTargetY = foodY - 100;

            const food = $('<img class="food" src="images/fishFood.png" alt="fish food">');
            food.css({
                position: 'absolute',
                left: `${foodX}px`,
                top: `${foodY}px` // food stays at original visual position
            });

            // Store the **same target the fish are swimming to**
            food.data('foodTarget', { x: foodX, y: fishTargetY });

            swimZone.append(food);

            player.AquariumList[selectedAquariumIndex].HasFood = true;

            $("#closeBottomMenuImg").off("click touchstart");
            $('#closeBottomMenuImg').attr('id', 'CBMI');

            // Make all fish swim toward the **offset target**
            player.AquariumList[selectedAquariumIndex].FishList.forEach(fish => {
                if (fish.SvgElement) {
                    const fishFlipWrapper = fish.SvgElement.parent().parent();
                    fishFlipWrapper.stop();
                    directFishToFood(fish, foodX, fishTargetY);
                } else {
                    throw new Error(`Fish ${fish.Name} has no SVG element!`);
                }
            });
        }
    }, 100);
}


function closeStarterFishModal() {
    $("#modalStarterFishContainer").hide();
}

function closeFishInfoModal() {
    $("#modalFishInfoContainer").hide();
}

function openBottomMenu() {
    $("#fishTank").css("height", "85vh");
    $("#bottomMenu").css("display", "flex");
    $("#openBottomMenuImg").css("display", "none");
    $("#closeBottomMenuImg").css("display", "inline-block");
    if (player.AquariumList[selectedAquariumIndex].HasFood === false) {
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

function closeShopModal() {
    $("#modalShopContainer").hide();
}

function closeFishShopModal() {
    $("#modalFishShopContainer").hide();
}

function handleRedoClick(element) {
    const arrowImg = $(element).find("img");
    const elementBlock = $(element).parent();
    const inputField = elementBlock.find("input");

    if (arrowImg.hasClass("rotateArrows")) {
        arrowImg.removeClass("rotateArrows");
        arrowImg.addClass("rotateArrowsBack");
        arrowImg.attr("placeholder", "redo button arrows");
        $(element).css("background-color", "darkgreen");
        inputField.val("");
        inputField.attr("type", "hidden");

        if (elementBlock.attr("id") === "modalFishName") {
            elementBlock.find("strong").show();
        }
        else {
            elementBlock.find("b").show();
        }
    } else if (arrowImg.hasClass("checkMark")) {
        if (elementBlock.attr("id") !== "modalFishName") {
            handleColorInput(elementBlock);
            arrowImg.attr("placeholder", "check mark");
        }
        else {
            handleNameInput(elementBlock);
            arrowImg.attr("placeholder", "check mark");
        }
        arrowImg.removeClass("checkMark");
        arrowImg.attr("src", "images/GUI/modals/redoButtonArrows.png");
        arrowImg.addClass("rotateArrowsBack");
        $(element).css("background-color", "darkgreen");
        inputField.attr("type", "hidden");
        if (elementBlock.attr("id") === "modalFishName") {
            elementBlock.find("strong").show();
        }
        else {
            elementBlock.find("b").show();
        }
    } else {
        arrowImg.removeClass("rotateArrowsBack");
        arrowImg.addClass("rotateArrows");
        $(element).css("background-color", "yellowgreen");
        elementBlock.find("input").attr("type", "text");
        if (elementBlock.attr("id") === "modalFishName") {
            elementBlock.find("strong").hide();
        }
        else {
            elementBlock.find("b").hide();
        }
    }
}

function handleColorInput(element) {
    const inputField = element.find("input");
    const input = inputField.val().trim().replace(/[\u200B-\u200D\uFEFF]/g, "");
    if (isValidHex(input)) {
        console.log(clickedFish);
        if (clickedFish) {
            switch (element.parent().attr("id")) {
                case "modalBodyColor":
                    $("#modalFishImgContainer svg").css('--body-color', input);
                    break;
                case "modalTailFinColor":
                    $("#modalFishImgContainer svg").css('--tail-color', input);
                    break;
                case "modalTopFinColor":
                    if (clickedFish.HasTopFin) $("#modalFishImgContainer svg").css('--top-fin-color', input);
                    break;
                case "modalBottomFinColor":
                    if (clickedFish.HasBottomFin) $("#modalFishImgContainer svg").css('--bottom-fin-color', input);
                    break;
                case "modalSideFinColor":
                    if (clickedFish.HasSideFin) $("#modalFishImgContainer svg").css('--side-fin-color', input);
                    break;
                case "modalPatternColor":
                    if (clickedFish.HasPattern) $("#modalFishImgContainer svg").css('--pattern-color', input);
                    break;
                default:
                    throw new Error("Unknown color part for fish!");
            }
            element.parent().css("background-color", input);
            element.parent().find("b").text(input);
            if (isDarkColor(input)) {
                element.parent().find("b").css("color", "white");
                element.parent().find("strong").css("color", "white");
            } else {
                element.parent().find("b").css("color", "black");
                element.parent().find("strong").css("color", "black");
            }
        }
        else {
            // this should never happen, it's an extra failsafe
            throw new Error("No fish selected for color change!");
        }
    }
    else {
        alert("Please enter a valid hex color code (e.g., #ff8800).");
    }
}

function handleNameInput(element) {
    const inputField = element.find("input");
    const input = inputField.val().trim();
    if (input !== "") {
        if (input.length > 35) {
            alert("Name cannot be longer than 35 characters!");
        }
        else {
            if (clickedFish) {
                element.find("strong").text(input);
            }
            else {
                // this should never happen, it's an extra failsafe
                throw new Error("No fish selected for name change!");
            }
        }
    }
    else {
        alert("Name cannot be empty!");
    }
}

function updateFishColors(element) {
    const $el = $(element); // wrap once
    const inputField = $el.find("input");
    const input = inputField.val().trim();

    switch ($el.parent().attr("id")) {
        case "modalBodyColor":
            clickedFish.BodyColor = input;
            break;
        case "modalTailFinColor":
            clickedFish.TailFinColor = input;
            break;
        case "modalTopFinColor":
            if (clickedFish.HasTopFin) clickedFish.TopFinColor = input;
            break;
        case "modalBottomFinColor":
            if (clickedFish.HasBottomFin) clickedFish.BottomFinColor = input;
            break;
        case "modalSideFinColor":
            if (clickedFish.HasSideFin) clickedFish.SideFinColor = input;
            break;
        case "modalPatternColor":
            if (clickedFish.HasPattern) clickedFish.PatternColor = input;
            break;
        default:
            throw new Error("Unknown color part for fish!");
    }
}

function saveToLocalStorage() {
    // players = array of PlayerService instances
    saveFiles[selectedSaveFileIndex] = player;
    localStorage.setItem("playerSaves", JSON.stringify(saveFiles.map(p => p.toJSON())));
}

function loadFromLocalStorage() {
    const savedData = JSON.parse(localStorage.getItem("playerSaves")) || [];
    saveFiles = savedData.map(data => PlayerService.fromJSON(data));
}

function changeArrowsToCheckMark(element) {
    let elementBlock;
    if ($(element).parent().attr("id") === "modalFishName") {
        elementBlock = $(element).parent();
    }
    else {
        elementBlock = $(element).parent().parent();
    }
    const arrowImg = elementBlock.find(".redoButton").find("img");
    arrowImg.removeClass("rotateArrows");
    arrowImg.removeClass("rotateArrowsBack");
    arrowImg.attr("src", "images/GUI/modals/checkMark.png");
    arrowImg.addClass("checkMark");
    arrowImg.attr("placeholder", "check mark");
}

function saveGameViaMenu() {
    saveToLocalStorage();
    updateStats();
    spawnGameSavedText(false);
    $("#saveGameButtonHolder").find("p").css("background-color", "yellowgreen");
    setTimeout(function () {
        $("#saveGameButtonHolder").find("p").css("background-color", "darkgreen");
    }, 300);
}

function updateFishInAquarium() {
    console.log("updating colors of fish in aquarium");
    $(".colorInfoBlock").each(function () {
        if ($(this).find("input").val().trim() !== "") {
            updateFishColors(this);
        }
    });
    player.AquariumList[selectedAquariumIndex].FishList.forEach(fish => {
        if (fish.FishId === clickedFish.FishId) {
            fish.Name = $("#modalFishName strong").text();
            fish.SvgElement.css('--body-color', clickedFish.BodyColor);
            fish.SvgElement.css('--tail-color', clickedFish.TailFinColor);
            if (clickedFish.HasTopFin) fish.SvgElement.css('--top-fin-color', clickedFish.TopFinColor);
            if (clickedFish.HasBottomFin) fish.SvgElement.css('--bottom-fin-color', clickedFish.BottomFinColor);
            if (clickedFish.HasSideFin) fish.SvgElement.css('--side-fin-color', clickedFish.SideFinColor);
            if (clickedFish.HasPattern) fish.SvgElement.css('--pattern-color', clickedFish.PatternColor);
        }
    });
}

function renumberSaveFileBlocks() {
    $('.saveFileBlock').each((i, block) => {
        const $block = $(block);
        $block.attr('id', 'saveFile' + (i + 1));
        $block.find('.loadFileButtonHolder').attr('id', 'loadFileButton' + (i + 1));
        $block.find('.deleteFileButtonHolder').attr('id', 'deleteFileButton' + (i + 1));
        $block.find('.newGameButtonHolder').attr('id', 'newGameButton' + (i + 1));

        // Also update displayed FishAmount and MoneyAmount IDs
        $block.find(`#saveFile${i + 2}FishAmount`).attr('id', `saveFile${i + 1}FishAmount`);
        $block.find(`#saveFile${i + 2}MoneyAmount`).attr('id', `saveFile${i + 1}MoneyAmount`);
    });
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

function isValidHex(hex) {
    // Start with #, then either 3 or 6 hex digits only
    const hexRegex = /^#(?:[A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
    return hexRegex.test(hex);
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


//#region helper functions

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

function isAnyModalOpen() {
    return $("#modalStarterFishContainer").is(":visible") || $("#modalShopContainer").is(":visible") || $('#fishInfoModal').is(":visible") || $("#modalFishShopContainer").is(":visible") || $("#modalSettingsContainer").is(":visible") || $("#modalSaveFilesContainer").is(":visible") || $("#modalLoadNewGameContainer").is(":visible");
}

const normalizeAngle = angle => (((angle + 180) % 360 + 360) % 360) - 180;

function getRandomNormalFishType() {
    const randomIndex = Math.floor(Math.random() * NormalFishTypes.length);
    return NormalFishTypes[randomIndex];
}

function getStandardColor(fishType, part) {
    const fishData = StandardFishColors[fishType];
    if (!fishData) throw new Error("This fishtype is not recognized!");

    const color = fishData[part];
    if (color == null) throw new Error("This fish has no " + part + "!");

    return color;
}


//#endregion


//#region EVENT HANDLERS

$(window).on('resize', function () {
    checkOrientation();
});

$("#fishTank").on("pointerdown", function (event) {
    // Check if the click target is the #swimZone
    const swimZone = $("#swimZone");
    if (event.target !== swimZone[0]) return;

    const x = event.offsetX;
    const y = event.offsetY;

    if (swimZone.hasClass("foodCursor")) {
        if (!player.AquariumList[selectedAquariumIndex].HasFood) {
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

$("#fishFoodImg").on("pointerdown", function () {
    closeBottomMenu();
    if ($("#swimZone").hasClass("dustpanCursor")) {
        $("#swimZone").removeClass("dustpanCursor");
    }
    $("#swimZone").toggleClass("foodCursor");
});

$("#dustpanImg").on("pointerdown", function () {
    closeBottomMenu();
    if ($("#swimZone").hasClass("foodCursor")) {
        $("#swimZone").removeClass("foodCursor");
    }
    $("#swimZone").toggleClass("dustpanCursor");
})

$('#closeFishInfoModal').on("pointerdown", function () {
    closeFishInfoModal();
});

$("#starterFish1ButtonHolder").on("pointerdown", function () {
    var fish = starterFishes[0];
    prepareFishForSpawning(fish);
    closeStarterFishModal();
    spawnFish(fish);
});

$("#starterFish2ButtonHolder").on("pointerdown", function () {
    var fish = starterFishes[1];
    prepareFishForSpawning(fish);
    closeStarterFishModal();
    spawnFish(fish);
});

$("#starterFish3ButtonHolder").on("pointerdown", function () {
    var fish = starterFishes[2];
    prepareFishForSpawning(fish);
    closeStarterFishModal();
    spawnFish(fish);
});

$("#openShopImg").on("pointerdown", function () {
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

$('#closeStarterFishModal').on("pointerdown", function () {
    closeStarterFishModal();
});

$('#closeShopModal').on("pointerdown", function () {
    closeShopModal();
});

$(document).on('pointerdown', '#closeBottomMenuImg', function () {
    closeBottomMenu();
});

$("#openBottomMenuImg").on("pointerdown", function () {
    if (!isAnyModalOpen()) {
        if (!player.AquariumList[selectedAquariumIndex].HasFood) {
            openBottomMenu();
        }
    }
});

$("#openBottomMenuImg").hover(function () {
    if (!isAnyModalOpen()) {
        if (player.AquariumList[selectedAquariumIndex].HasFood) {
            $("#openBottomMenuImg").addClass("noClickCursor");
        }
        else {
            $("#openBottomMenuImg").removeClass("noClickCursor");
        }
    }
    else {
        $("#openBottomMenuImg").addClass("noClickCursor");
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

$("#fishTank").on("pointerdown", ".poo", function () {
    if ($("#swimZone").hasClass("dustpanCursor")) {
        $(this).remove();
        player.MoneyAmount += 3;
        updateStats();
    }
});

$('#fishTank').on("pointerdown", '.spawned-fish', function () {
    const fish = $(this).data('fish');
    clickedFish = fish;
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
    $('#modalTailFinColor b').text(`${fish.TailFinColor}`);
    if (isDarkColor(fish.TailFinColor)) {
        $("#modalTailFinColor strong").css("color", "white");
        $('#modalTailFinColor b').css('color', 'white');
    }
    else {
        $("#modalTailFinColor strong").css("color", "black");
        $('#modalTailFinColor b').css('color', 'black');
    }
    $('#modalTailFinColor').css("background-color", fish.TailFinColor);
    $('#modalBodyColor b').text(`${fish.BodyColor}`);
    if (isDarkColor(fish.BodyColor)) {
        $("#modalBodyColor strong").css("color", "white");
        $('#modalBodyColor b').css('color', 'white');
    }
    else {
        $("#modalBodyColor strong").css("color", "black");
        $('#modalBodyColor b').css('color', 'black');
    }
    $('#modalBodyColor').css("background-color", fish.BodyColor);

    if (fish.HasTopFin) {
        $('#modalTopFinColor b').text(`${fish.TopFinColor}`);
        $('#redoTopFinColorButton').show();
        if (isDarkColor(fish.TopFinColor)) {
            $("#modalTopFinColor strong").css("color", "white");
            $('#modalTopFinColor b').css('color', 'white');
        }
        else {
            $("#modalTopFinColor strong").css("color", "black");
            $('#modalTopFinColor b').css('color', 'black');
        }
        $('#modalTopFinColor').css("background-color", fish.TopFinColor);
    }
    else {
        $('#modalTopFinColor b').text(`No Top Fin`);
        $('#redoTopFinColorButton').css("visibility", "hidden");
        $('#modalTopFinColor>span').css("justify-content", "left");
        $('#modalTopFinColor b').css("color", "black");
        $('#modalTopFinColor').css("background-color", "transparent");
    }

    if (fish.HasBottomFin) {
        $('#modalBottomFinColor b').text(`${fish.BottomFinColor}`);
        $('#redoBottomFinColorButton').show();
        if (isDarkColor(fish.BottomFinColor)) {
            $("#modalBottomFinColor strong").css("color", "white");
            $('#modalBottomFinColor b').css('color', 'white');
        }
        else {
            $("#modalBottomFinColor strong").css("color", "black");
            $('#modalBottomFinColor b').css('color', 'black');
        }
        $('#modalBottomFinColor').css("background-color", fish.BottomFinColor);
    }
    else {
        $('#modalBottomFinColor b').text(`No Bottom Fin`);
        $('#redoBottomFinColorButton').css("visibility", "hidden");
        $('#modalBottomFinColor>span').css("justify-content", "left");
        $('#modalBottomFinColor b').css("color", "black");
        $('#modalBottomFinColor b').css("margin", "1vh 0 1vh 0");
        $('#modalBottomFinColor').css("background-color", "transparent");
    }

    $('#modalSpeed p').text(`${fish.Speed}`);
    $('#modalStatAge p').text(`${fish.Age}`);
    $('#modalStatSize p').text(`${fish.Size}`);
    $('#modalStatFoodEaten p').text(`${fish.FoodEaten}`);
    $("#modalStatCostPrice p").text(`${fish.CostPrice}`);
    $("#modalStatCurrentValue p").text(`${fish.CurrentValue}`);

    if (fish.HasSideFin) {
        $('#modalSideFinColor b').text(`${fish.SideFinColor}`);
        $('#redoSideFinColorButton').show();
        if (isDarkColor(fish.SideFinColor)) {
            $("#modalSideFinColor strong").css("color", "white");
            $('#modalSideFinColor b').css('color', 'white');
        }
        else {
            $("#modalSideFinColor strong").css("color", "black");
            $('#modalSideFinColor b').css('color', 'black');
        }
        $('#modalSideFinColor').css("background-color", fish.SideFinColor);
    }
    else {
        $('#modalSideFinColor b').text(`No Side Fin`);
        $('#redoSideFinColorButton').css("visibility", "hidden");
        $('#modalSideFinColor>span').css("justify-content", "left");
        $('#modalSideFinColor b').css("color", "black");
        $('#modalSideFinColor').css("background-color", "transparent");
    }

    if (fish.HasPattern) {
        $('#modalPatternColor b').text(`${fish.PatternColor}`);
        $('#redoPatternColorButton').show();
        if (isDarkColor(fish.PatternColor)) {
            $("#modalPatternColor strong").css("color", "white");
            $('#modalPatternColor b').css('color', 'white');
        }
        else {
            $("#modalPatternColor strong").css("color", "black");
            $('#modalPatternColor b').css('color', 'black');
        }
        $('#modalPatternColor').css("background-color", fish.PatternColor);
    }
    else {
        $('#modalPatternColor b').text(`No Pattern`);
        $('#redoPatternColorButton').css("visibility", "hidden");
        $('#modalPatternColor>span').css("justify-content", "left");
        $('#modalPatternColor b').css("color", "black");
        $('#modalPatternColor').css("background-color", "transparent");
    }
});

$("#redoTailFinColorButton").on("pointerdown", function () {
    const element = this;
    handleRedoClick(element);
});

$("#redoBodyColorButton").on("pointerdown", function () {
    const element = this;
    handleRedoClick(element);
});

$("#redoTopFinColorButton").on("pointerdown", function () {
    const element = this;
    handleRedoClick(element);
});

$("#redoBottomFinColorButton").on("pointerdown", function () {
    const element = this;
    handleRedoClick(element);
});

$("#redoSideFinColorButton").on("pointerdown", function () {
    const element = this;
    handleRedoClick(element);
});

$("#redoPatternColorButton").on("pointerdown", function () {
    const element = this;
    handleRedoClick(element);
});

$("#redoNameButton").on("pointerdown", function () {
    const element = this;
    handleRedoClick(element);
});

$("#tailFinColorInput").on("pointerdown", function () {
    const element = this;
    changeArrowsToCheckMark(element);
});

$("#bodyColorInput").on("input", function () {
    const element = this;
    changeArrowsToCheckMark(element);
});

$("#topFinColorInput").on("input", function () {
    const element = this;
    changeArrowsToCheckMark(element);
});

$("#bottomFinColorInput").on("input", function () {
    const element = this;
    changeArrowsToCheckMark(element);
});

$("#sideFinColorInput").on("input", function () {
    const element = this;
    changeArrowsToCheckMark(element);
});

$("#patternColorInput").on("input", function () {
    const element = this;
    changeArrowsToCheckMark(element);
});

$("#fishNameInput").on("input", function () {
    const element = this;
    changeArrowsToCheckMark(element);
});

$("#modalFishInfoSaveBlock").on("pointerdown", function () {
    updateFishInAquarium();
    closeFishInfoModal();
});

$("#closeFishShopModal").on("pointerdown", function () {
    closeFishShopModal();
});

$(document).on("pointerdown", "#startNewGameButton", function () {
    var aquarium = new AquariumService("My Aquarium");
    var newPlayer = new PlayerService("Player" + saveFiles.length + 1);
    newPlayer.AquariumList.push(aquarium);
    saveFiles.push(newPlayer);
    player = newPlayer;

    $("#modalLoadNewGameContainer").hide();
    saveToLocalStorage();
    startBackGroundMusic();
    pushStarterFishes()
    $("#modalStarterFishContainer").css("display", "flex");
    updateStats();
});

$(document).on("pointerdown", ".loadFileButtonHolder", function () {
    const $btn = $(this);

    if ($btn.data('disabled')) return; // prevent spam clicking
    $btn.data('disabled', true);

    const id = $btn.attr('id') || '';
    const idx = parseInt(id.replace(/^loadFileButton/, ''), 10) - 1;

    selectedSaveFileIndex = idx;

    if (!Number.isInteger(idx) || idx < 0 || idx >= saveFiles.length) {
        throw new Error("Could not parse valid save file index from id: " + id);
    }
    else {
        $btn.find("p").css("background-color", "yellowgreen");
        setTimeout(async () => {
            $btn.find("p").css("background-color", "darkgreen");
            player = saveFiles[idx];
            updateStats();
            await loadAquarium();
            if (player.AquariumList.length === 1 && player.AquariumList[0].FishList.length === 0) {
                pushStarterFishes();
                $("#modalStarterFishContainer").css("display", "flex");
            }
            $btn.data('disabled', false); // re-enable
            $("#modalLoadNewGameContainer").hide();
            startBackGroundMusic();
        }, 300);
    }
});

$(document).on("pointerdown", ".deleteFileButtonHolder", function () {
    const $btn = $(this);
    const saveFileContainer = $btn.closest('.saveFileBlock');

    if ($btn.data('disabled')) return; // prevent spam clicking
    $btn.data('disabled', true);

    const id = $btn.attr('id') || '';
    const idx = parseInt(id.replace(/^deleteFileButton/, ''), 10) - 1;

    if (!Number.isInteger(idx) || idx < 0 || idx >= saveFiles.length) {
        $btn.data('disabled', false);
        throw new Error("Could not parse valid save file index from id: " + id);
    }

    if (!confirm("Are you sure you want to delete this save file? This action cannot be undone.")) {
        $btn.data('disabled', false);
        return; // exit if user cancels
    }

    // Animate the button
    $btn.find("p").css("background-color", "red");
    setTimeout(() => {
        // Remove the save from array
        saveFiles.splice(idx, 1);

        // Remove the DOM element
        saveFileContainer.remove();

        renumberSaveFileBlocks();

        // Update localStorage
        localStorage.setItem("playerSaves", JSON.stringify(saveFiles.map(p => p.toJSON())));
    }, 300);
});

$("#musicOnIcon").on("pointerdown", function () {
    toggleMusic();
});

$("#musicOffIcon").on("pointerdown", function () {
    toggleMusic();
});

$("#modalMusicButtonHolder").on("pointerdown", function () {
    toggleMusic();
});

// Helper to create a clean fish instance from a template
function createFishFromTemplate(template) {
    // Clone only the *data* properties, not DOM references
    const fish = {
        Name: "fish" + (player.AquariumList[selectedAquariumIndex].AmountOfFish + 1),
        FishTypeName: template.FishTypeName,
        BodyColor: template.BodyColor,
        TailFinColor: template.TailFinColor,
        Speed: 1,
        FishId: (player.AquariumList[selectedAquariumIndex].AmountOfFish + 1),
        FoodEaten: 0
    };

    fish.Age = template.Age;
    fish.Size = template.Size;
    fish.CostPrice = template.CostPrice;
    fish.CurrentValue = template.CurrentValue;
    fish.SideFinColor = template.SideFinColor;
    fish.TopFinColor = template.TopFinColor;
    fish.BottomFinColor = template.BottomFinColor;
    fish.PatternColor = template.PatternColor;
    fish.EyewWhiteColor = template.EyewWhiteColor;
    fish.PupilColor = template.PupilColor;
    fish.HungerAmount = template.HungerAmount;
    fish.FoodEaten = 0;
    fish.IsAlive = true;
    fish.HasSideFin = template.HasSideFin;
    fish.HasTopFin = template.HasTopFin;
    fish.HasBottomFin = template.HasBottomFin;
    fish.HasPattern = template.HasPattern;

    // Now clone the SVG element separately
    if (template.SvgElement && template.SvgElement.length) {
        fish.SvgElement = template.SvgElement.clone(false); // clone DOM node only
        fish.SvgElement.removeAttr('id');
    } else {
        fish.SvgElement = null;
    }

    return fish;
}


// Prepare (wrap) and append fish to DOM inside #swimZone, returns fish with wrappers set
function prepareAndAppendFishToSwimZone(fish) {
    if (!fish.SvgElement) {
        throw new Error("Fish has no SvgElement to spawn");
    }

    const swimZone = $('#swimZone');

    // Create *fresh* wrappers
    const fishFlipWrapper = $('<span class="fish-flip-wrapper"><span class="fish-rotate-wrapper"></span></span>');
    const fishRotateWrapper = fishFlipWrapper.find('.fish-rotate-wrapper');

    // Append SVG clone into rotate wrapper
    fishRotateWrapper.append(fish.SvgElement);

    // Put it in a valid start position (numeric left/top)
    const zoneW = swimZone.width();
    const zoneH = swimZone.height();
    const startX = Math.floor(Math.random() * Math.max(0, zoneW - 150));
    const startY = Math.floor(Math.random() * Math.max(0, zoneH - 80));

    fishFlipWrapper.css({
        position: 'absolute',
        left: startX + 'px',
        top: startY + 'px',
        zIndex: 5
    });

    fish.SvgElement.add(fish.SvgElement.find('*')).css({
        "stroke": "black",
        "stroke-width": "0.6px",
        "stroke-linejoin": "round"
    });

    // Then reapply proper pattern stroke for paths using CSS vars
    fish.SvgElement.find('path').each(function () {
        const strokeAttr = this.getAttribute('stroke');
        if (strokeAttr && strokeAttr.includes('var(--pattern-color')) {
            // Restore the color + make pattern thicker again
            this.style.stroke = `var(--pattern-color)`;
            this.style.strokeWidth = "6px"; // or any value you want
        }
    });


    // Append wrapper to swimZone (this is crucial)
    swimZone.append(fishFlipWrapper);

    // Keep references on fish object
    fish.SvgElement.data('fish', fish);
    fish.SvgElement.css("scale", "");
    if (fish.Size === 1) {
        fish.SvgElement.attr("width", 80);
        fish.SvgElement.attr("height", 30);
    }
    else if (fish.Size === 2) {
        fish.SvgElement.attr("width", 100);
        fish.SvgElement.attr("height", 40);
    }
    else if (fish.Size === 3) {
        fish.SvgElement.attr("width", 120);
        fish.SvgElement.attr("height", 50);
    }
    else if (fish.Size === 4) {
        fish.SvgElement.attr("width", 140);
        fish.SvgElement.attr("height", 60);
    }
    else if (fish.Size === 5) {
        fish.SvgElement.attr('width', 140);
        fish.SvgElement.attr('height', 70);
    }
    else if (fish.Size === 6) {
        fish.SvgElement.attr('width', 150);
        fish.SvgElement.attr('height', 80);
    }
    else if (fish.Size === 7) {
        fish.SvgElement.attr('width', 160);
        fish.SvgElement.attr('height', 90);
    }
    else if (fish.Size === 8) {
        fish.SvgElement.attr('width', 170);
        fish.SvgElement.attr('height', 100);
    }
    else {
        // should never happen
        throw new Error("Fish size is out of bounds!");
    }

    fish.FlipWrapper = fishFlipWrapper;
    fish.RotateWrapper = fishRotateWrapper;

    // Set a class so CSS is consistent
    fish.SvgElement.addClass('spawned-fish');

    return fish;
}

// Final spawn: push into aquarium and start movement
function finalSpawn(fish, isLoadedIn = false) {
    if (isLoadedIn) {
        player.AquariumList[selectedAquariumIndex].FishList.push(fish);
    }
    moveFishRandomly(fish);
}

$(document).on("pointerdown", ".buyFishButton", function () {
    const $btn = $(this);

    // Prevent spam clicking
    if ($btn.data('disabled')) return;
    $btn.data('disabled', true);

    const id = $btn.attr('id') || '';
    const idx = parseInt(id.replace(/^modalBuyFish/, ''), 10);
    if (!Number.isInteger(idx)) throw new Error("Could not parse fish index from id: " + id);

    const cost = allFishes[idx].CostPrice;

    if (player.MoneyAmount >= cost) {
        player.MoneyAmount -= cost;
        updateStats();

        // Visual feedback
        $btn.find("p").css("background-color", "yellowgreen");
        setTimeout(() => {
            $btn.find("p").css("background-color", "darkgreen");
            $btn.data('disabled', false); // re-enable
        }, 500);
    } else {
        // Visual feedback for failure
        alert("You don't have enough money to buy this fish!");
        $btn.find("p").css("background-color", "darkred");
        setTimeout(() => {
            $btn.find("p").css("background-color", "darkgreen");
            $btn.data('disabled', false); // re-enable
        }, 500);
        return;
    }

    // Create instance from template
    const template = allFishes[idx];
    if (!template) return console.error('no template for index', idx);

    const fish = createFishFromTemplate(template);

    prepareAndAppendFishToSwimZone(fish);
    finalSpawn(fish, true);
});

$("#fishShopButtonHolder").on("pointerdown", function () {
    closeShopModal();
    $("#modalFishShopContainer").css("display", "flex");
});

$("#settingsImg").on("pointerdown", function () {
    if (!isAnyModalOpen()) {
        $("#modalSettingsContainer").css("display", "flex");
    }
});

$("#settingsImg").hover(function () {
    if (isAnyModalOpen()) {
        $("#settingsImg").addClass("noClickCursor");
    }
    else {
        $("#settingsImg").removeClass("noClickCursor");
    }
});

$("#closeSettingsModal").on("pointerdown", function () {
    $("#modalSettingsContainer").css("display", "none");
});

$("#saveGameIcon").on("pointerdown", function () {
    saveGameViaMenu();
});

$("#saveGameButtonHolder").on("pointerdown", function () {
    saveGameViaMenu();
});

$("#modalAutoSaveButtonHolder").on("pointerdown", function () {
    if (player.AutoSaveOn) {
        player.AutoSaveOn = false;
        $("#modalAutoSaveButtonHolder p").css("background-color", "darkred");
        $("#modalAutoSaveButtonHolder p").text("auto-save: OFF");
        stopAutoSaver();
    }
    else {
        player.AutoSaveOn = true;
        $("#modalAutoSaveButtonHolder p").css("background-color", "darkgreen");
        $("#modalAutoSaveButtonHolder p").text("auto-save: ON");
        startAutoSaver();
    }
});

//#endregion


//#region test functions

/* THESE FUNCTIONS ARE CURRENTLY NOT IN USE */

function spawnNewRandomFish(fishType) {
    const newFish = new Fish(
        "fish" + (player.AquariumList[selectedAquariumIndex].AmountOfFish + 1),
        fishType,
        getRandomColor(),
        getRandomColor(),
        player.AquariumList[selectedAquariumIndex].AmountOfFish + 1
    );

    if (newFish.HasSideFin) newFish.SideFinColor = getRandomColor();
    if (newFish.HasPattern) newFish.PatternColor = getRandomColor();
    if (newFish.HasTopFin) newFish.TopFinColor = getRandomColor();
    if (newFish.HasBottomFin) newFish.BottomFinColor = getRandomColor();

    player.AquariumList[selectedAquariumIndex].FishList.push(newFish);

    $.get(`assets/media/fish/${fishType}.svg`, function (data) {
        const svg = $(data).find('svg');

        svg.addClass('spawned-fish').css({
            '--body-color': newFish.BodyColor,
            '--tail-color': newFish.TailFinColor,
            position: 'absolute',
            top: 0,
            left: 0,
            width: 80,
            height: 30,
            stroke: 'black',
            'stroke-width': 1,
            'stroke-linejoin': 'round',
            scale: ''
        });

        if (newFish.HasPattern) svg.css('--pattern-color', newFish.PatternColor);
        if (newFish.HasSideFin) svg.css('--side-fin-color', newFish.SideFinColor);
        if (newFish.HasTopFin) svg.css('--top-fin-color', newFish.TopFinColor);
        if (newFish.HasBottomFin) svg.css('--bottom-fin-color', newFish.BottomFinColor);

        svg.data('fish', newFish);
        newFish.SvgElement = svg;

        // Wrap SVG
        const fishFlipWrapper = $('<span class="fish-flip-wrapper"><span class="fish-rotate-wrapper"></span></span>');
        fishFlipWrapper.find('.fish-rotate-wrapper').append(svg);

        fishFlipWrapper.css({
            position: 'absolute',
            left: 200,
            top: 200,
            zIndex: 5
        });

        // Append wrapper to swimZone
        $('#swimZone').append(fishFlipWrapper);

        moveFishRandomly(newFish);
    }, 'xml');
}


function spawnAllFishForTesting() {
    console.log("spawning all fish types for testing");
    Object.values(AllFishTypes).forEach(fishType => {
        spawnNewRandomFish(fishType);
    });
}

//#endregion