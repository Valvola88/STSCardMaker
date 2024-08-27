let canvas;
let cardCanvas;

let numOfRows = 1;

let inputButton;
let addButton;
let removeButton;

let upgradeCheckbox;
let statusCheckbox;

let inputs = [];
let rows = [];

let CardArt;

class Char {
	constructor(char, colored) {
		this.char = char;
		this.colored = colored; // 0 - normal; 1 - yellow; 2 - green; 8 - Gold Text; 9 - icon
	}
}

class Row {
	constructor() {
		this.chars = [];
		this.string = "";
		this.len = 0;
	}
}



let testString = "";
let stringLen = 0;

let AddArt; //button to add card art (from local files)

let ArtXPosition; //slider to change the art's x position
let ArtYPosition; //slider to change the art's y position
//let ArtWidth; //slider to change the art's width
//let ArtHeight; //slider to change the art's height
let SliderZoom;

let EnergyInput;
let Energy = "";
let EnergyX = 0;
let EnergyY = 0;

let NameInput;
let Name = "";

let InputType;
let CurrentType = "Attack";

let fontKreon;
let fontKreonBold;

let OldCardMana;
let OldCardBackground;
let OldCardFrame;

let Icons = [];

let IconDice = [];

let IconExhaust;
let IconEthereal;



let CardMap;
let CardColor;
let CardRarity;
let CardType;
let CardManaIcon;


let questionPressed = false;
let infoPressed = false;

let TextArea;
let ArtZoom = 100;



function preload() {
	//#region Cards
	ImagePreload();

	//#endregion

	HelpImage = loadImage("assets/HelpImage.png");

	fontKreon = loadFont("assets/Kreon.ttf");
	fontKreonBold = loadFont("assets/Kreon-Bold.ttf");

	//#region Icons
	for (i = 0; i < Icon.Last; i++)
	{
		if (i == Icon.Dice || i == Icon.Energy)
		{
			Icons[i] = null;
			continue;
		}

		Icons[i] = loadImage("icon/" + IconString[i] + ".png")
	}

	for (i = 1; i < 7; i++)
	{
		IconDice[i] = loadImage("icon/D" + i + ".png");
	}

	Icons[Icon.Dice] = IconDice;
	//#endregion

	ButtonPreLoad();
}

function setup() {
	pixelDensity(3.0);
	canvas = createCanvas(800, 550);
	cardCanvas = createGraphics(350, 455);

	imageCanvas = createGraphics(265, 200);

	downloadCanvas = createGraphics(350, 455);

	let context = canvas.elt.getContext("2d");
	context.miterLimit = 3;
	let pgContext = cardCanvas.elt.getContext("2d");
	pgContext.miterLimit = 3;
	clear();

	//#region Images Resize
	ImageResize();

	for (i = 0; i < Icon.Last; i++)
	{
		if (i == Icon.Dice || i == Icon.Energy)
		{
			continue;
		}

		Icons[i].resize(28,28);
	}

	for(i =1; i < 7; i++)
	{
		IconDice[i].resize(28,28);
	}
	//#endregion



	OldCardBackground = RedAttackBackground;
	OldCardFrame = CommonAttackFrame;
	OldCardMana = RedMana;
	CurrentManaColor = Color.Red;

	TextArea = createElement("textarea");
	TextArea.attribute("rows", 5);
	TextArea.attribute("cols", 42);
	TextArea.position(415, 42);
	TextArea.input(call);

	TextArea.elt.value = "Card >Text< @";

	for (z = 0; z <= 4; z++) {
		rows.push(new Row());
	}

	AddArt = createFileInput(addArt);
	AddArt.position(410, 450);

	ArtXPosition = createSlider(-175, 175, 0);
	ArtXPosition.position(450 + 5, 420);
	ArtXPosition.style("width", "200px");
	//ArtXPosition.input(frameUpdate);

	ArtYPosition = createSlider(-100, 100, 0);
	ArtYPosition.position(450 + 5, 458);
	ArtYPosition.style("width", "200px");
	//ArtYPosition.input(frameUpdate);

	SliderZoom = createSlider(10, 200, 100);
	SliderZoom.position(450 + 5, 496);
	SliderZoom.style("width", "200px");
	//SliderZoom.input(frameUpdate);


	ArtXPosition.hide();
	ArtYPosition.hide();
	SliderZoom.hide();

	EnergyInput = createInput();
	EnergyInput.position(690 - 612, 38);
	EnergyInput.attribute("maxlength", 1);
	EnergyInput.size(12);
	EnergyInput.input(frameUpdate);

	NameInput = createInput("Card");
	NameInput.position(200, 50);
	NameInput.attribute("maxlength", 18);
	NameInput.input(frameUpdate);

	InputType = createInput("Attack");
	InputType.position(573, 222 + 50 + 30);
	InputType.changed(frameUpdate);

	statusCheckbox = createCheckbox("Energy", true);
	statusCheckbox.position(520, 160);
	statusCheckbox.hide();
	statusCheckbox.changed(frameUpdate);

	CreateCardMap();

	//for the call() at the end of setup():

	textFont(fontKreon);
	cardCanvas.textFont(fontKreon);
	textSize(26);
	cardCanvas.textSize(26);

	ButtonSetup();

	call();


	//noLoop(); //disables draw(); should always be the last line in setup().
}

function CreateCardMap() {
	CardMap = new Map();
	CardMap.set("RedMana", RedMana);
	CardMap.set("RedManaGem", RedManaGem);
	CardMap.set("RedAttackBackground", RedAttackBackground);
	CardMap.set("RedSkillBackground", RedSkillBackground);
	CardMap.set("RedPowerBackground", RedPowerBackground);

	CardMap.set("GreenMana", GreenMana);
	CardMap.set("GreenManaGem", GreenManaGem);
	CardMap.set("GreenAttackBackground", GreenAttackBackground);
	CardMap.set("GreenSkillBackground", GreenSkillBackground);
	CardMap.set("GreenPowerBackground", GreenPowerBackground);

	CardMap.set("BlueMana", BlueMana);
	CardMap.set("BlueManaGem", BlueManaGem);
	CardMap.set("BlueAttackBackground", BlueAttackBackground);
	CardMap.set("BlueSkillBackground", BlueSkillBackground);
	CardMap.set("BluePowerBackground", BluePowerBackground);

	CardMap.set("PurpleMana", PurpleMana);
	CardMap.set("PurpleManaGem", PurpleManaGem);
	CardMap.set("PurpleAttackBackground", PurpleAttackBackground);
	CardMap.set("PurpleSkillBackground", PurpleSkillBackground);
	CardMap.set("PurplePowerBackground", PurplePowerBackground);

	CardMap.set("CurseAttackBackground", CurseAttackBackground);
	CardMap.set("CurseSkillBackground", CurseSkillBackground);
	CardMap.set("CursePowerBackground", CursePowerBackground);

	CardMap.set("ColorlessMana", ColorlessMana);
	CardMap.set("ColorlessManaGem", RedManaGem);
	CardMap.set("ColorlessAttackBackground", ColorlessAttackBackground);
	CardMap.set("ColorlessSkillBackground", ColorlessSkillBackground);
	CardMap.set("ColorlessPowerBackground", ColorlessPowerBackground);

	CardMap.set("StatusManaGem", RedManaGem);

	CardMap.set("CurseManaGem", RedManaGem);

	CardMap.set("CommonAttackFrame", CommonAttackFrame);
	CardMap.set("CommonSkillFrame", CommonSkillFrame);
	CardMap.set("CommonPowerFrame", CommonPowerFrame);

	CardMap.set("StarterAttackFrame", CommonAttackFrame);
	CardMap.set("StarterSkillFrame", CommonSkillFrame);
	CardMap.set("StarterPowerFrame", CommonPowerFrame);

	CardMap.set("UncommonAttackFrame", UncommonAttackFrame);
	CardMap.set("UncommonSkillFrame", UncommonSkillFrame);
	CardMap.set("UncommonPowerFrame", UncommonPowerFrame);
	CardMap.set("RareAttackFrame", RareAttackFrame);
	CardMap.set("RareSkillFrame", RareSkillFrame);
	CardMap.set("RarePowerFrame", RarePowerFrame);
}

let CurrentManaColor;

//#region  DRAW
function draw() {
	clear();
	background(45, 62, 72);
	fill(255);
	rect(69,140,265,200);
	if (EnergyUpgradeToggleButton.state && EnergyToggleButton.state)
	{
		image(ManaGemUpgrade[CurrentManaColor], 48 - 6, 4, (OldCardMana.width * .9) + 10,(OldCardMana.height * .9) + 10);
	}
	image(OldCardMana, 48 - 1, 10 - 2, OldCardMana.width * .8,OldCardMana.height * .8);

	ButtonDraw();


	fill(255);
	stroke(52, 41, 41);
	strokeWeight(1);
	text("Text:", 420, 24);
	if (NameUpgradeToggleButton.state)
		{
			fill(133, 214, 40);
			text("Name+:", 200, 32)
		}
		else
		text("Name:", 200, 32)
	
	fill(133, 214, 40);
	text("#G#", 480, 24);
	fill(225, 195, 108);
	text(">Y<", 530, 24);
	noStroke();

	ImageDraw();

	image(imageCanvas, 69, 120 + 20);
	image(cardCanvas, 20, 60 + 20);


}

//#endregion

function resetArt() {
	ImageCenterX();
	ImageCenterY();
	ImageCenterZoom();

	frameUpdate();
}



function ImageCenterX(){
	ArtXPosition.value(0);
}

function ImageCenterY(){
	ArtYPosition.value(0);

}
function ImageCenterZoom(){
	SliderZoom.value(100);

}

function ImageDraw() {

	if (DragImage)
	{
		let DeltaX = mouseX - DragInitialX;
		let DeltaY = mouseY - DragInitialY;

		print(DeltaX);
		print(DeltaY);
		ArtXPosition.value(DragInitialImageX + DeltaX);
		ArtYPosition.value(DragInitialImageY + DeltaY);
	}

	imageCanvas.imageMode(CENTER);

	if (CardArt != null) {
		imageCanvas.clear();
		imageCanvas.image(CardArt,			
			ArtXPosition.value() + 265 / 2,
			ArtYPosition.value() + 100,
			265 * (SliderZoom.value() / 100),
			200 * (SliderZoom.value() / 100)
		);
	}

	if (ImageFocus)
	{
		CurrentKeyWait -= deltaTime / 1000;
		if (CurrentKeyWait < 0)
		{
			if (keyIsDown(LEFT_ARROW)){
				ArtXPosition.value(ArtXPosition.value() - 2);
			}
			else if (keyIsDown(RIGHT_ARROW)){
				ArtXPosition.value(ArtXPosition.value() + 2);
			}
			else if (keyIsDown(UP_ARROW)){
				ArtYPosition.value(ArtYPosition.value() - 2);
			}
			else if (keyIsDown(DOWN_ARROW)){
				ArtYPosition.value(ArtYPosition.value() + 2);
			}	
		}
	}

	imageMode(CORNER);
}


function frameUpdate() {

	noLoop();
	cardCanvas.clear();


	noStroke();
	fill(255);

	/*stroke(0);

	if (questionPressed === true) {
		noFill();
		strokeWeight(4);
		circle(750, 30, 25);

		line(750, 45, 700, 185);
		rect(425, 185, 350, 122, 20);

		image(HelpImage, 450, 200);
	}
	if (infoPressed === true) {
		noFill();
		strokeWeight(4);
		circle(780, 30, 25);

		line(780, 45, 700, 185);
		rect(425, 185, 350, 122, 20);

		strokeWeight(1);
		textSize(24);
		fill(0);
		text("Slay the Spire Custom Card Maker", 440, 210);

		textSize(18);
		text("Disclaimer: This tool is not affiliated with", 440, 260);
		text("nor endorsed by Slay the Spire and Mega Crit.", 440, 275);
		text("Card assets are property of Mega Crit.", 440, 290);
	}*/

	fill(0);
	noStroke();
	textFont(fontKreon);
	cardCanvas.textFont(fontKreon);
	textSize(23);
	//text("Energy:", 10, 35);
	//text("Name:", 200, 37);

	//image(CardBackground, 20, 80);
	cardCanvas.image(OldCardBackground, 0, 0);
	//image(CardFrame, 20, 80);
	cardCanvas.image(OldCardFrame, 0, 0);


	if (EnergyToggleButton.state) {
		cardCanvas.image(OldCardMana, -5, 0);
	}

	//fill(91, 91, 91);
	cardCanvas.fill(91, 91, 91);
	//textSize(17);
	cardCanvas.textSize(17);
	//textFont(fontKreonBold);
	cardCanvas.textFont(fontKreonBold);
	//stroke(91, 91, 91);
	cardCanvas.stroke(91, 91, 91);
	//strokeWeight(0.4);
	cardCanvas.strokeWeight(0.4);

	cardCanvas.textAlign(CENTER);
	cardCanvas.text(InputType.value(), 180, 262)
	cardCanvas.textAlign(LEFT);

	textSize(24);
	noStroke();
	Name = split(NameInput.value(), "");
	if (NameUpgradeToggleButton.state) {
		append(Name, "+");
	}
	let NameLength = 0;
	for (let d = 0; d < Name.length; d++) {
		NameLength = NameLength + textWidth(Name[d]) + 2;
	}

	let coeff = 0;

	//fill(95, 94, 92);
	cardCanvas.fill(95, 94, 92);
	for (d = 0; d < Name.length; d++) {
		//textSize(24);
		cardCanvas.textSize(24);
		//stroke(0, 0, 0, 60);
		cardCanvas.stroke(0, 0, 0, 60);
		//strokeWeight(4);
		cardCanvas.strokeWeight(4);
		//text(Name[d], 202-NameLength/2+coeff, 149);
		cardCanvas.text(Name[d], 182 - NameLength / 2 + coeff, 69);

		coeff = coeff + textWidth(Name[d]) + 2;
	}

	coeff = 0;
	if (NameUpgradeToggleButton.state) {
		//fill(133,214,40);
		cardCanvas.fill(133, 214, 40);
	} else {
		//fill(252,248,234);
		cardCanvas.fill(252, 248, 234);
	}
	//stroke(91,86,81);
	cardCanvas.stroke(91, 86, 81);
	//strokeWeight(4);
	cardCanvas.strokeWeight(4);
	//textSize(24);
	cardCanvas.textSize(24);
	for (d = 0; d < Name.length; d++) {
		//text(Name[d], 199-NameLength/2+coeff, 146);
		cardCanvas.text(Name[d], 179 - NameLength / 2 + coeff, 66);
		coeff = coeff + textWidth(Name[d]) + 2;
	}

	Energy = EnergyInput.value();
	if (Energy != "") {
		if (EnergyToggleButton.state) {
			if (EnergyUpgradeToggleButton.state) {
				//fill(133,214,40);
				cardCanvas.fill(133, 214, 40);
			} else {
				//fill(249,242,230);
				cardCanvas.fill(249, 242, 230);
			}

			cardCanvas.strokeWeight(8);
			cardCanvas.textFont(fontKreonBold);
			cardCanvas.textSize(40);
			cardCanvas.strokeJoin(BEVEL);

			EnergyX = 0;
			EnergyY = 0;

			if (Energy === "2") {
				EnergyX = 3;
				EnergyY = 1;
			} else if (Energy === "3") {
				EnergyX = 2;
			} else if (Energy === "4") {
				EnergyX = 4;
				EnergyY = 1;
			} else if (Energy === "5") {
				EnergyX = 2;
			} else if (Energy === "6") {
				EnergyX = 3.5;
			} else if (Energy === "8") {
				EnergyX = 3.5;
				EnergyY = 1;
			} else if (Energy === "9") {
				EnergyX = 2;
			} else if (Energy === "X") {
				EnergyX = 3.5;
			} else if (Energy === "0") {
				EnergyX = 4.0;
			}


			//ENERGY NUMBER
			cardCanvas.stroke(100, 165);
			cardCanvas.text(Energy, 29.5 - EnergyX , 51.5 - EnergyY + 5);
			cardCanvas.stroke(75, 71, 58);
			cardCanvas.text(Energy, 28 - EnergyX, 50 - EnergyY + 5);
		}
	}

	//noStroke();
	cardCanvas.noStroke();
	//textFont(fontKreon);
	cardCanvas.textFont(fontKreon);
	//textSize(25);
	cardCanvas.textSize(25);
	for (let z = 0; z < numOfRows; z++) {


		if (rows[z].string != "") {
			let coeff = 0;

			for (let k = 0; k < rows[z].chars.length; k++) {
				let CurrChar = rows[z].chars[k].char;

				if (rows[z].chars[k].colored == 8)
					{
						//Gold Number;

						cardCanvas.stroke(52, 41, 41);
						cardCanvas.strokeWeight(1);

						cardCanvas.textSize(20);
						cardCanvas.textAlign(CENTER);
						cardCanvas.fill(52, 41, 41);
						cardCanvas.text(
							rows[z].chars[k].char,
							(180.9 - 4 - rows[z].len / 2 + coeff) - 1,
							(347.6 - 13.5 * (numOfRows - 1) + z * 28) - 3
						);		
						cardCanvas.textAlign(LEFT);
						cardCanvas.textSize(25);			
						continue;
					};

				if (CurrChar == "@") {
					//image(CardMap.get(CardColor.value()+"ManaGem"), 197.6-rows[z].len/2+coeff, 404-13.5*(numOfRows-1)+z*28);
					cardCanvas.image(
						CardMap.get(ColorString[CardColor] + "ManaGem"),
						177.6 - rows[z].len / 2 + coeff,
						324 - 13.5 * (numOfRows - 1) + z * 28
					);
				} else if (rows[z].chars[k].colored == 9) {

					let CurrentIcon = Icons[Icon.Attack];

					if (CurrChar == 1 || CurrChar == 2 ||
						CurrChar == 3 || CurrChar == 4 ||
						CurrChar == 5 || CurrChar == 6 )
					{
						CurrentIcon = IconDice[CurrChar]
					}
					else if (CurrChar == "G")
					{
						CurrentIcon = Icons[Icon.Gold];
						if (k + 1 < rows[z].chars.length)
						{
							if (parseInt(rows[z].chars[k + 1].char) != NaN)
							{
								
								print(parseInt(rows[z].chars[k + 1].char))
								rows[z].chars[k + 1].colored = 8;

							}
						}
					}
					else
					{
						for (let m = 0; m < Icon.Last; m++)
						{
							if (m == Icon.Dice || m == Icon.Energy)
								continue;

							if (CurrChar == IconCode[m])
							{
								CurrentIcon = Icons[m];
								break;
							}
						}
					}
					
					cardCanvas.image(
						CurrentIcon,
						177.6 - rows[z].len / 2 + coeff,
						324 - 13.5 * (numOfRows - 1) + z * 28
					);
				} else {
					//stroke(52, 41, 41);
					cardCanvas.stroke(52, 41, 41);
					//strokeWeight(1);
					cardCanvas.strokeWeight(1);
					//fill(52, 41, 41);
					cardCanvas.fill(52, 41, 41);
					//Shadow
					cardCanvas.text(
						rows[z].chars[k].char,
						183.2 - 4 - rows[z].len / 2 + coeff,
						349.3 - 13.5 * (numOfRows - 1) + z * 28
					);
					if (rows[z].chars[k].colored === 1) {
						fill(225, 195, 108);
						cardCanvas.fill(225, 195, 108);
					} else if (rows[z].chars[k].colored === 2) {
						fill(133, 214, 40);
						cardCanvas.fill(133, 214, 40);
					} else {
						fill(249, 242, 230);
						cardCanvas.fill(249, 242, 230);
					}
					//noStroke();
					cardCanvas.noStroke();
					//Left I Think
					cardCanvas.text(
						rows[z].chars[k].char,
						180.9 - 4 - rows[z].len / 2 + coeff,
						347.6 - 13.5 * (numOfRows - 1) + z * 28
					);
					//I don't know
					cardCanvas.text(
						rows[z].chars[k].char,
						181.2 - 4 - rows[z].len / 2 + coeff,
						347.8 - 13.5 * (numOfRows - 1) + z * 28
					);
				}
				coeff = coeff + textWidth(rows[z].chars[k].char) + 0.2;
			}
		}
	}

	//image(UIExportButtonImage, 690, 500);
	//image(cardCanvas, 20, 80);
	loop();
}

//#region BUTTONS
let Buttons = [];

let UIExportButtonImage;
let UIRemoveButtonImage;
let UIRemoveResetImage;

let ButtonExport;
let ButtonRemove;
let ButtonResetImage;

let UIColorImage = [];
let UITypeImage = [];
let UIRarityImage = [];

let ColorButtons = [];
let TypeButtons = [];
let RarityButtons = [];

let UICheckTrue;
let UICheckFalse;

let EnergyToggleButton;

let UICenterX;
let UICenterY;
let UICenterZoom;

let ButtonCenterX;
let ButtonCenterY;
let ButtonCenterZoom;

let UIIcon = [];
let IconButtons = [];

let UIKeyword = [];
let KeywordButton = [];

let NameUpgradeToggleButton;
let EnergyUpgradeToggleButton;

function ButtonPreLoad() {
	UIExportButtonImage = loadImage("ui/Download.png");
	UIRemoveButtonImage = loadImage("ui/RemoveArt.png");
	UIRemoveResetImage = loadImage("ui/reset.png");

	for(i = 0; i < Color.Last; i++){
		UIColorImage[i] = loadImage("ui/" + ColorString[i] + "Button.png");
	}

	for (i = 0; i < Type.Last; i++)
		UITypeImage[i] = loadImage("ui/" + TypeString[i] + "Button.png");

	for (i = 0; i < Rarity.Last; i++)
		UIRarityImage[i] = loadImage("ui/" + RarityString[i] + "Button.png");

	for(i = 0;  i < Icon.Last; i++)
	{	
		UIIcon[i] = loadImage("icon/" + IconString[i] + "Button.png");
	}

	for(i = 0;  i < Keyword.Last; i++)
	{	
		UIKeyword[i] = loadImage("keyword/" + KeywordString[i] + "Button.png");
	}

	UICheckTrue = loadImage("ui/TickboxTrue.png");
	UICheckFalse = loadImage("ui/TickboxFalse.png");

	UICenterX = loadImage("ui/CenterX.png");
	UICenterY = loadImage("ui/CenterY.png");
	UICenterZoom = loadImage("ui/CenterZoom.png");
	
}

function ButtonSetup() {

	for( i = 0; i < Color.Last; i++){
		UIColorImage[i].resize(48, 48);
		let Button = new StandardButton(400 + i * 50, 230, UIColorImage[i], ChangeColor, i);
		ColorButtons.push(Button);
		Buttons.push(Button);
	}

	for( i = 0; i < Type.Last; i++){
		UITypeImage[i].resize(48, 48);
		let Button = new StandardButton(400 + i * 50, 280, UITypeImage[i], ChangeType, i);
		TypeButtons.push(Button);
		Buttons.push(Button);

	}

	for( i = 0; i < Rarity.Last; i++){
		UIRarityImage[i].resize(48, 48);
		let Button = new StandardButton(400 + i * 50, 330, UIRarityImage[i], ChangeRarity, i);
		RarityButtons.push(Button);
		Buttons.push(Button);
	}
	
	for( i = 0; i < Icon.Last; i++){
		UIIcon[i].resize(32, 32);
		let Button = new StandardButton(410 + (i % 10) * 32, 125 + Math.floor(i / 10) * 32, UIIcon[i], AddIcon, i);
		IconButtons.push(Button);
		Buttons.push(Button);
	}

	for( i = 0; i < Keyword.Last; i++){
		UIKeyword[i].resize(32, 32);
		let Button = new StandardButton(410 + i * 32, 125 + 64, UIKeyword[i], AddKeyword, i);
		KeywordButton.push(Button);
		Buttons.push(Button);
	}

	ColorButtons[Color.Red].enabled = false;
	TypeButtons[Type.Attack].enabled = false;
	RarityButtons[Rarity.Common].enabled = false; 

	CardColor = Color.Red;
	CardType = Type.Attack;
	CardRarity = Rarity.Common;

	UICheckFalse.resize(48,48);
	UICheckTrue.resize(48,48);

	EnergyToggleButton = new ToggleImageButton(8, 16, UICheckTrue, UICheckFalse, ToggleEnergy, true);
	EnergyUpgradeToggleButton = new ToggleImageButton(110, 16, UICheckTrue, UICheckFalse, ToggleTicked, false);
	EnergyUpgradeToggleButton.main_tint = [0,255,0];
	EnergyUpgradeToggleButton.hover_tint = [64,192,64];
	
	NameUpgradeToggleButton = new ToggleImageButton(274, 0, UICheckTrue, UICheckFalse, ToggleTicked, false);
	NameUpgradeToggleButton.main_tint = [0,255,0];
	NameUpgradeToggleButton.hover_tint = [64,192,64];

	Buttons.push(EnergyToggleButton);
	Buttons.push(NameUpgradeToggleButton);
	Buttons.push(EnergyUpgradeToggleButton);

	UICenterX.resize(40,40);
	UICenterY.resize(40,40);
	UICenterZoom.resize(40,40);

	UIExportButtonImage.resize(64, 64);
	UIRemoveButtonImage.resize(48, 48);
	UIRemoveResetImage.resize(48, 48);

	ButtonCenterX = new StandardButton(400, 400, UICenterX, ImageCenterX);
	ButtonCenterY = new StandardButton(400, 440, UICenterY, ImageCenterY);
	ButtonCenterZoom = new StandardButton(400, 480, UICenterZoom, ImageCenterZoom);
	ButtonExport = new StandardButton(710, 435 - 8, UIExportButtonImage, exportPng);
	ButtonRemove = new StandardButton(655, 435, UIRemoveButtonImage, removeArt);
	//ButtonResetImage = new StandardButton(660, 370, UIRemoveResetImage, resetArt);

	Buttons.push(ButtonCenterX);
	Buttons.push(ButtonCenterY);
	Buttons.push(ButtonCenterZoom);
	Buttons.push(ButtonExport);
	Buttons.push(ButtonRemove);
	//Buttons.push(ButtonResetImage);

	ButtonCenterX.visible = false;
	ButtonCenterY.visible = false;
	ButtonCenterZoom.visible = false;
	ButtonRemove.visible = false;
	//ButtonResetImage.visible = false;
}

function AddIcon(IconToAdd)
{
	if (IconToAdd == Icon.Energy)
	{
		TextArea.elt.value += "@ ";
	}
	else if (IconToAdd == Icon.Gold)
	{
		TextArea.elt.value += " {" + IconCode[IconToAdd] + "1} ";
	}
	else
	{
		TextArea.elt.value += " {" + IconCode[IconToAdd] + "} ";
	}

	call();
}

function AddKeyword(KeywordToAdd)
{
	let tmpStr = ">" + KeywordString[KeywordToAdd] + "<";

	TextArea.elt.value += tmpStr;
	call();
}

function ButtonDraw() {
	
	//fill(220);
	//rect(378, 0, width - 200, height);
	//fill(0);

	Buttons.forEach(Button => {
		Button.Draw();
	})


}
//#endregion

function ToggleEnergy(NewState){

	if (NewState)
	{
		EnergyInput.show()
		EnergyUpgradeToggleButton.visible = true;
	}
	else{
		EnergyInput.hide();
		EnergyUpgradeToggleButton.visible = false;
	}
	ToggleTicked();
}

function ToggleTicked(NewState){
	frameUpdate();
}

function ChangeColor(ColorToChange) {

	ColorButtons[CardColor].enabled = true;

	if (ColorToChange == Color.Curse || ColorToChange == Color.Status)
	{

		RarityButtons[CardRarity].enabled = true;
		CardRarity = Rarity.Common;
		RarityButtons[CardRarity].enabled = false;

		TypeButtons[CardType].enabled = true;
		CardType = Type.Skill;
		TypeButtons[CardType].enabled = false;

		InputType.value(ColorString[ColorToChange]);

		if (CardColor != Color.Status && CardColor != Color.Curse)
			InputType.value(TypeString[CardType]);

		CardManaIcon = CardMap.get("ColorlessManaGem");
		EnergyToggleButton.state = false;
		EnergyInput.hide();
		EnergyUpgradeToggleButton.visible = false;
	}
	else
	{
		InputType.value(TypeString[CardType]);
		CardManaIcon = CardMap.get(ColorString[CardColor] + "ManaGem");
		EnergyToggleButton.state = true;
		EnergyInput.show();
		EnergyUpgradeToggleButton.visible = true;
	}

	CardColor = ColorToChange;
	ColorButtons[CardColor].enabled = false;
	changeCardFrame();
}

function ChangeRarity(RarityToChange) {

	RarityButtons[CardRarity].enabled = true;
	CardRarity = RarityToChange;
	RarityButtons[CardRarity].enabled = false;

	changeCardFrame();
}

function ChangeType(TypeToChange) {

	TypeButtons[CardType].enabled = true;
	CardType = TypeToChange;
	TypeButtons[CardType].enabled = false;

	if (CardColor != Color.Status && CardColor != Color.Curse)
		InputType.value(TypeString[CardType]);
	
	changeCardFrame();
}


function call() {
	let allText = split(TextArea.elt.value, "\n");
	numOfRows = allText.length > 5 ? 5 : allText.length;

	for (p = 0; p < numOfRows; p++) {
		let str = allText[p];
		rows[p].chars = [];

		let colored = 0;
		let curr;
		for (let i = 0; i <= str.length - 1; i++) {
			curr = str.substring(i, i + 1);

			if (colored === 0 && curr === ">") {
				colored = 1;
			} else if (colored === 1 && curr === "<") {
				colored = 0;
			}

			//Test for codes, using colored for not wasting space
			else if (colored === 0 && curr === "{") {
				colored = 9;
			} else if (colored === 9 && curr === "}") {
				colored = 0;
			} else if (curr === "#") {
				if (colored === 0) {
					colored = 2;
				} else if (colored === 2) {
					colored = 0;
				}
			} else {
				rows[p].chars.push(new Char(curr, colored));
			}
		}

		rows[p].string = "";
		for (let j = 0; j < rows[p].chars.length; j++) {
			rows[p].string = rows[p].string + rows[p].chars[j].char;
		}
		rows[p].len = textWidth(rows[p].string);
	}
	frameUpdate();

}

function addArt(file) {
	if (file.type == "image") {
		CardArt = loadImage(file.data);
		AddArt.hide();

		ArtXPosition.show();
		ArtYPosition.show();
		SliderZoom.show();
		//ArtHeight.show();

		//ButtonExport.visible = true;
		ButtonRemove.visible = true;
		//ButtonResetImage.visible = true;

		ButtonCenterX.visible = true;
		ButtonCenterY.visible = true;
		ButtonCenterZoom.visible = true;

		
		imageCanvas.clear();
	} else {
		CardArt = null;
	}

	setTimeout(frameUpdate, 100);
}

function removeArt() {
	CardArt = null;
	AddArt.show();

	ArtXPosition.hide();
	ArtYPosition.hide();
	SliderZoom.hide();
	//ArtHeight.hide();

	//ButtonExport.visible = false;
	ButtonRemove.visible = false;
	//ButtonResetImage.visible = false;

	ButtonCenterX.visible = false;
	ButtonCenterY.visible = false;
	ButtonCenterZoom.visible = false;

	imageCanvas.clear();

	resetArt();
}

function changeCardFrame() {

	noLoop();

	let ColorStr = ColorString[CardColor];
	let RarityStr = RarityString[CardRarity];
	let TypeStr = TypeString[CardType];

	if (CardColor == Color.Status) {
		OldCardMana = ColorlessMana;
		CurrentManaColor = Color.Colorless;
		OldCardBackground = ColorlessSkillBackground;
		OldCardFrame = CardMap.get(RarityStr + "SkillFrame");
		
	} else if (CardColor == Color.Curse) {
		
		OldCardMana = ColorlessMana;
		CurrentManaColor = Color.Colorless;
		OldCardBackground = CardMap.get(
			ColorStr + TypeStr + "Background"
		);
		OldCardFrame = CardMap.get(RarityStr + TypeStr + "Frame");
	
	} else {
		OldCardMana = CardMap.get(ColorStr + "Mana");
		CurrentManaColor = CardColor;
		OldCardBackground = CardMap.get(
			ColorStr + TypeStr + "Background"
		);
		OldCardFrame = CardMap.get(RarityStr + TypeStr + "Frame");
	}


	frameUpdate();
}

function updateArt(){

	if (CardArt != null) {
		downloadCanvas.image(
			CardArt,			
			ArtXPosition.value() + 69 - 20,
			ArtYPosition.value() + 140 - 80,
			265 * (SliderZoom.value() / 100),
			200 * (SliderZoom.value() / 100)
		);
	}

}

function exportPng() {
	//let imagePng = canvas.get(20, 80, 350, 455);
	//imagePng.save(NameInput.value(), 'png');

	//imagePng = null;
	let downloadName = NameInput.value();
	downloadName = downloadName + (NameUpgradeToggleButton.state ? " plus" : "");

	downloadCanvas.clear()

	updateArt();
	downloadCanvas.image(cardCanvas, 0, 0);
	downloadCanvas.save(downloadName + ".png");
}

let DragImage = false;
let ImageFocus = false;
let DragInitialX;
let DragInitialY;
let DragInitialImageX;
let DragInitialImageY;

function mousePressed() {
	ImageFocus = false;
	if (mouseX >= 738 && mouseX <= 793 && mouseY <= 38) {
		if (mouseX <= 763) {
			if (questionPressed === false || infoPressed === true) {
				questionPressed = true;
				infoPressed = false;
			} else if (questionPressed === true) {
				questionPressed = false;
			}
		} else if (mouseX >= 768) {
			if (infoPressed === false || questionPressed === true) {
				infoPressed = true;
				questionPressed = false;
			} else if (infoPressed === true) {
				infoPressed = false;
			}
		}
		frameUpdate();
	} else {
		if (questionPressed === true || infoPressed === true) {
			questionPressed = false;
			infoPressed = false;
			frameUpdate();
		}
	}

	if (mouseX >= 69 && mouseX <= 69 + 265 && mouseY >= 140 && mouseY <= 140 + 200)
	{
		DragInitialX = mouseX;
		DragInitialY = mouseY;
		DragImage = true;
		ImageFocus = true;
		DragInitialImageX = ArtXPosition.value();
		DragInitialImageY = ArtYPosition.value();
	}

	Buttons.forEach(Button => {
		Button.MousePressed();
	})
}

let KeyWait = .5;
let CurrentKeyWait = .5;

function keyPressed() {

	CurrentKeyWait = KeyWait;

	if (ImageFocus){
		if (keyCode == LEFT_ARROW){
			ArtXPosition.value(ArtXPosition.value() - 2);
		}
		else if (keyCode == RIGHT_ARROW){
			ArtXPosition.value(ArtXPosition.value() + 2);
		}
		else if (keyCode == UP_ARROW){
			ArtYPosition.value(ArtYPosition.value() - 2);
		}
		else if (keyCode == DOWN_ARROW){
			ArtYPosition.value(ArtYPosition.value() + 2);
		}
	}
}

function mouseWheel(event){
	if (mouseX >= 69 && mouseX <= 69 + 265 && mouseY >= 140 && mouseY <= 140 + 200){
		print(event.delta);
		SliderZoom.value(SliderZoom.value() + event.delta / -20);
	}
}

function mouseReleased(){
	DragImage = false;
}

