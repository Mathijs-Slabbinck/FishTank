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

var aquarium = new AquariumService("My Aquarium");
var player = new PlayerService("Player1", 10, 100);

$(document).ready(function () {
    if (window.innerWidth < 600) {
        $('#rotatePhone').show();
        $('#fishTank').hide();
        $('#coinDisplayBlock').hide();
        $('#openShopImg').hide();
        notRotatedAtStart = true;
    } else {
        pushStarterFishes();
        pushShopFishes();
    }
    updateStats();
});

function checkOrientation() {
    if (window.innerWidth < 600) {
        $('#rotatePhone').show();
        $('#fishTank').hide();
        $('#coinDisplayBlock').hide();
        $('#openShopImg').hide();
    } else {
        $('#rotatePhone').hide();
        $('#fishTank').show();
        $('#coinDisplayBlock').show();
        $('#openShopImg').show();

        if (notRotatedAtStart) {
            pushStarterFishes();
            pushShopFishes();
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

        const buyButton1 = $('<div class="modalGreenButtonBlock buyFishButton" id="modalBuyFish' + i + '"><p class="clickAble">buy</p></div>');
        const buyButton2 = $('<div class="modalGreenButtonBlock buyFishButton" id="modalBuyFish' + (i + 1) + '"><p class="clickAble">buy</p></div>');
        const buyButton3 = $('<div class="modalGreenButtonBlock buyFishButton" id="modalBuyFish' + (i + 2) + '"><p class="clickAble">buy</p></div>');

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
            "fish" + parseInt(aquarium.AmountOfFish + 1),
            // fishTypeName
            fishType,
            // bodyColor
            bodyColor,
            // tailFinColor
            tailFinColor,
            aquarium.AmountOfFish + 1, // id
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
    aquarium.FishList.push(fish);
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
    const fishFlipWrapper = fish.SvgElement.parent().parent();
    const fishRotateWrapper = fish.SvgElement.parent();

    const fishOffset = fishFlipWrapper.position(); // relative to parent
    const fishX = fishOffset.left;
    const fishY = fishOffset.top;

    const dx = foodX - fishX;
    const dy = foodY - fishY;
    const distance = Math.hypot(dx, dy);

    // --- Check if fish reached the food ---
    if (distance < 6) {
        aquarium.HasFood = false;
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
        top: `${y + 120}px`
    });

    // Append to poo tank
    $("#fishTank").append(poo);
}

function spawnFood(x, y) {
    setTimeout(function () {
        if (!aquarium.HasFood) {
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

            aquarium.HasFood = true;

            $("#closeBottomMenuImg").off("click touchstart");
            $('#closeBottomMenuImg').attr('id', 'CBMI');

            // Make all fish swim toward the **offset target**
            aquarium.FishList.forEach(fish => {
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
        }
        else {
            handleNameInput(elementBlock);
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
}

function updateFishInAquarium() {
    console.log("updating colors of fish in aquarium");
    $(".colorInfoBlock").each(function () {
        if ($(this).find("input").val().trim() !== "") {
            updateFishColors(this);
        }
    });
    aquarium.FishList.forEach(fish => {
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
    return $("#modalStarterFishContainer").is(":visible") || $("#modalShopContainer").is(":visible") || $('#fishInfoModal').is(":visible");
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

// Helper to create a clean fish instance from a template
function createFishFromTemplate(template) {
    // Clone only the *data* properties, not DOM references
    const fish = {
        Name: "fish" + (aquarium.AmountOfFish + 1),
        FishTypeName: template.FishTypeName,
        BodyColor: template.BodyColor,
        TailFinColor: template.TailFinColor,
        Speed: 1,
        FishId: (aquarium.AmountOfFish + 1),
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

    // Append wrapper to swimZone (this is crucial)
    swimZone.append(fishFlipWrapper);

    // Keep references on fish object
    fish.SvgElement.data('fish', fish);
    fish.SvgElement.css("scale", "");
    fish.FlipWrapper = fishFlipWrapper;
    fish.RotateWrapper = fishRotateWrapper;

    // Set a class so CSS is consistent
    fish.SvgElement.addClass('spawned-fish');

    return fish;
}

// Final spawn: push into aquarium and start movement
function finalSpawn(fish) {
    aquarium.FishList.push(fish);
    moveFishRandomly(fish);
}

// Usage in buy handler
$(document).on("click", ".buyFishButton", function () {
    const id = this.id || $(this).attr('id') || '';
    const idx = parseInt(id.replace(/^modalBuyFish/, ''), 10);
    if (!Number.isInteger(idx)) throw new Error("Could not parse fish index from id: " + id);

    if (player.MoneyAmount >= allFishes[idx].CostPrice) {
        player.MoneyAmount -= allFishes[idx].CostPrice;
        updateStats();
    }
    else {
        return alert("You don't have enough money to buy this fish!");
    }

    const template = allFishes[idx];
    if (!template) return console.error('no template for index', idx);

    // create instance from template
    const fish = createFishFromTemplate(template);

    // prepare and append to DOM and then finalize spawn
    prepareAndAppendFishToSwimZone(fish);
    finalSpawn(fish);
});

$("#fishShopButtonHolder").on("click", function () {
    closeShopModal();
    $("#modalFishShopContainer").css("display", "flex");
});

//#endregion


//#region test functions

/* THESE FUNCTIONS ARE CURRENTLY NOT IN USE */

function spawnNewRandomFish(fishType) {
    const newFish = new Fish(
        "fish" + (aquarium.AmountOfFish + 1),
        fishType,
        getRandomColor(),
        getRandomColor(),
        aquarium.AmountOfFish + 1
    );

    if (newFish.HasSideFin) newFish.SideFinColor = getRandomColor();
    if (newFish.HasPattern) newFish.PatternColor = getRandomColor();
    if (newFish.HasTopFin) newFish.TopFinColor = getRandomColor();
    if (newFish.HasBottomFin) newFish.BottomFinColor = getRandomColor();

    aquarium.FishList.push(newFish);

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