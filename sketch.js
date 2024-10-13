let Canvas;
let CanvasCard;
let CanvasGlow;
let CanvasArt;
let CanvasDownload;
let CanvasDownloadWithBorder
let CanvasTooltip;

let numOfRows = 1;

let inputButton;
let addButton;
let removeButton;

let upgradeCheckbox;
let statusCheckbox;

let inputs = [];
let rows = [];

let CardArt;
let CardWidth;
let CardHeight;


class Char {
	constructor(char, colored) {
		this.char = char;
		this.colored = colored; // 0 - normal; 1 - yellow; 2 - green; 3 - Blue; 4 - Red; 5 - Light Gray; 8 - Gold Text; 9 - icon
	}
}
/*
if (rows[z].chars[k].colored === 1) {
	fill(225, 195, 108);
	CanvasCard.fill(225, 195, 108);
} else if (rows[z].chars[k].colored === 2) {
	fill(133, 214, 40);
	CanvasCard.fill(133, 214, 40);
} else if (rows[z].chars[k].colored === 3) {
	fill(40, 160, 214);
	CanvasCard.fill(40, 160, 214);
} else if (rows[z].chars[k].colored === 4) {
	fill(214, 80, 80);
	CanvasCard.fill(214, 80, 80);
} else {
	fill(249, 242, 230);
	CanvasCard.fill(249, 242, 230);	
}*/
const TextColor = [
	[249, 242, 230],
	[225, 195, 108],
	[133, 214, 40],
	[40, 160, 214],
	[214, 80, 80],
	[164, 160, 158]
]

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

let CurrentCardMana;
let CurrentCardBackground;
let CurrentCardFrame;

let Icons = [];

let IconDice = [];

let IconExhaust;
let IconEthereal;



let CardMap;
let CurrentCardColor;
let CurrentCardRarity;
let CurrentCardType;
let CardManaIcon;


let questionPressed = false;
let infoPressed = false;

let TextArea;
let ArtZoom = 100;

let CurrentCardBorder;

let CurrentCard;
let GlowIsAlreadyMade;

function preload() {
	//#region Cards
	ImagePreload();

	//#endregion


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
	BoardPreload();
}


function setup() {

	//Canvas Initializartion

	pixelDensity(3.0);
	//Main Canvas
	Canvas = createCanvas(820, 620);
	//Card 
	CanvasCard = createGraphics(350, 455);
	//Image / Art
	CanvasArt = createGraphics(265, 200);
	//Colored Border, for Board Game
	CanvasGlow = createGraphics(380, 510);
	//Download only the main card
	CanvasDownload = createGraphics(350, 455);
	//Download card with Border, for the Board Game
	CanvasDownloadWithBorder = createGraphics(380, 510);
	//Tooltip, why not?
	CanvasTooltip = createGraphics(820, 620);

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

	CurrentCard = new Card(Color.Red, Type.Attack, Rarity.Starter, "", false);

	CurrentCardBackground = RedAttackBackground;
	CurrentCardFrame = CommonAttackFrame;
	CurrentCardMana = RedMana;
	CurrentManaColor = Color.Red;

	TextArea = createElement("textarea");
	TextArea.attribute("rows", 5);
	TextArea.attribute("cols", 42);
	TextArea.style("resize", "none");
	TextArea.position(465, 42);
	TextArea.input(PreTextUpdate);

	TextArea.elt.value = "Card >Text< @";

	for (z = 0; z <= 4; z++) {
		rows.push(new Row());
	}

	AddArt = createFileInput(addArt);
	AddArt.position(500, 450);

	ArtXPosition = createSlider(-175, 175, 0);
	ArtXPosition.position(500 + 5, 420);
	ArtXPosition.style("width", "200px");
	//ArtXPosition.input(frameUpdate);

	ArtYPosition = createSlider(-100, 100, 0);
	ArtYPosition.position(500 + 5, 458);
	ArtYPosition.style("width", "200px");
	//ArtYPosition.input(frameUpdate);

	SliderZoom = createSlider(10, 200, 100);
	SliderZoom.position(500 + 5, 496);
	SliderZoom.style("width", "200px");
	//SliderZoom.input(frameUpdate);


	ArtXPosition.hide();
	ArtYPosition.hide();
	SliderZoom.hide();

	EnergyInput = createInput();
	EnergyInput.position(690 - 612, 38);
	EnergyInput.attribute("maxlength", 1);
	EnergyInput.size(12);
	EnergyInput.input(FrameUpdate);

	NameInput = createInput("Card");
	NameInput.position(200, 50);
	NameInput.attribute("maxlength", 18);
	NameInput.input(FrameUpdate);

	InputType = createInput("Attack");
	InputType.position(623, 222 + 50 + 30);
	InputType.changed(FrameUpdate);

	/*URLInput = createInput();
	URLInput.position(520, 522);
	URLInput.attribute("placeholder", "Insert URL to image");
	URLInput.size(250);*/

	CreateCardMap();

	//for the call() at the end of setup():

	textFont(fontKreon);
	CanvasCard.textFont(fontKreon);
	textSize(26);
	CanvasCard.textSize(26);

	CurrentCard.Color = Color.Red;
	CurrentCard.Type = Type.Attack;
	CurrentCard.Rarity = Rarity.Starter;

	ButtonSetup();
	BoardSetup();

	PreTextUpdate();


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
	tint(0,255,0);
	if (ButtonToggleUpgradeEnergy.state && ButtonToggleEnergy.state)
		{
			image(ManaGemUpgrade[CurrentManaColor],
				42,
				4,
				(CurrentCardMana.width * .9),
				(CurrentCardMana.height * .9))
				;
		}
	tint(255);
	image(CurrentCardMana, 48 - 1, 10 - 2, CurrentCardMana.width * .8,CurrentCardMana.height * .8);
	ButtonDraw();

	fill(0);


	fill(255);
	stroke(52, 41, 41);
	strokeWeight(1);
	text("Text:", 420, 24);
	if (CurrentCard.IsUpgraded)
		{
			fill(133, 214, 40);
			text("Name+:", 200, 32)
		}
		else
		text("Name:", 200, 32)
	
	fill(133, 214, 40);
	text("#G#", 480, 24);

	fill(225, 195, 108);
	text(">Y<", 540, 24);

	fill(40, 160, 214);
	text("~B~", 590, 24);

	fill(214, 80, 80);
	text("^R^", 640, 24);

	noStroke();
	
	ImageDraw();
	fill(255);
	if (CardArt == null)
	{
		text("Load image from device:", 480, 430)
		//text("Load image from URL:", 480, 490)
	}

	//rect(20, 80, 390, 530)
	if (CurrentCard.HasBorder)
	{
		image(CurrentCardBorder, 0 + 20, 0 + 80);
		if (CurrentCard.IsGlowing)
			{
				image(CanvasGlow, 0 + 18, 0 + 80);
			}
	}
	//image(BoardRed[3], 15, 80);



	image(CanvasArt, 65 + 15, 80 + 80);
	image(CanvasCard, 15 + 18, 20 + 80);
	image(CanvasTooltip, 0,0)
}

//#endregion

function FrameUpdate() {

	CanvasCard.clear();
	//cardCanvas.background(0);
	noStroke();
	fill(255);


	fill(0);
	noStroke();
	textFont(fontKreon);
	CanvasCard.textFont(fontKreon);
	textSize(23);

	CanvasCard.image(CurrentCardBackground, 0, 0);
	CanvasCard.image(CurrentCardFrame, 0, 0);


	if (ButtonToggleEnergy.state) {
		CanvasCard.image(CurrentCardMana, 0-5
		, 0);
	}



	UpdateName();
	UpdateEnergy();
	UpdateText();

}

function UpdateGlow() {
	
	if (!CurrentCard.IsGlowing)
		return;
	
	//print("GLOW");
	
	CanvasGlow.clear();
	CanvasGlow.image(CanvasCard, 15, 20);
	CanvasGlow.filter(THRESHOLD, 10);
	CanvasGlow.filter(INVERT);
	CanvasGlow.filter(BLUR, 8);
	GlowIsAlreadyMade = true;
}

function UpdateName() {
	//fill(91, 91, 91);
	CanvasCard.fill(91, 91, 91);
	//textSize(17);
	CanvasCard.textSize(17);
	//textFont(fontKreonBold);
	CanvasCard.textFont(fontKreonBold);
	//stroke(91, 91, 91);
	CanvasCard.stroke(91, 91, 91);
	//strokeWeight(0.4);
	CanvasCard.strokeWeight(0.4);

	CanvasCard.textAlign(CENTER);
	CanvasCard.text(InputType.value(), 180, 262)
	CanvasCard.textAlign(LEFT);

	textSize(24);
	noStroke();
	Name = split(NameInput.value(), "");
	if (CurrentCard.IsUpgraded) {
		append(Name, "+");
	}
	let NameLength = 0;
	for (let d = 0; d < Name.length; d++) {
		NameLength = NameLength + textWidth(Name[d]) + 2;
	}

	let coeff = 0;

	//fill(95, 94, 92);
	CanvasCard.fill(95, 94, 92);
	for (d = 0; d < Name.length; d++) {

		CanvasCard.textSize(24);
		CanvasCard.stroke(0, 0, 0, 60);
		CanvasCard.strokeWeight(4);
		CanvasCard.text(Name[d], 182 - NameLength / 2 + coeff, 68);

		coeff = coeff + textWidth(Name[d]) + 2;
	}

	coeff = 0;
	if (CurrentCard.IsUpgraded) {
		CanvasCard.fill(133, 214, 40);
	} else {
		CanvasCard.fill(252, 248, 234);
	}


	CanvasCard.stroke(91, 86, 81);
	CanvasCard.strokeWeight(4);
	CanvasCard.textSize(24);
	for (d = 0; d < Name.length; d++) {
		//text(Name[d], 199-NameLength/2+coeff, 146);
		CanvasCard.text(Name[d], 179 - NameLength / 2 + coeff,65);
		coeff = coeff + textWidth(Name[d]) + 2;
	}

	CurrentCard.Name = NameInput.value();
}


function UpdateEnergy() {

	Energy = EnergyInput.value();

	CurrentCard.Energy = Energy;
	CurrentCard.ShowEnergy = ButtonToggleEnergy.state;
	CurrentCard.EnergyUpgraded = ButtonToggleUpgradeEnergy.state;


	if (Energy != "") {
		if (CurrentCard.ShowEnergy) {
			if (CurrentCard.EnergyUpgraded) {
				//fill(133,214,40);
				CanvasCard.fill(133, 214, 40);
			} else {
				//fill(249,242,230);
				CanvasCard.fill(249, 242, 230);
			}

			CanvasCard.strokeWeight(8);
			CanvasCard.textFont(fontKreonBold);
			CanvasCard.textSize(40);
			CanvasCard.strokeJoin(BEVEL);

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
			CanvasCard.stroke(100, 165);
			CanvasCard.text(Energy, 29.5 - EnergyX , 51.5 - EnergyY + 5);
			CanvasCard.stroke(75, 71, 58);
			CanvasCard.text(Energy, 28 - EnergyX, 50 - EnergyY + 5);
		}
	}
}

function UpdateBorder() {

	if (CurrentCard.Color == Color.Curse )
	{
		CurrentCardBorder = ColorBorder[Color.Colorless];
	}
	else if (CurrentCard.IsUpgraded)
	{
		CurrentCardBorder = ColorBorder[CurrentCard.Color];
	}
	else
	{
		CurrentCardBorder = RarityBorder[CurrentCard.Rarity]
		if (CurrentCard.Color == Color.Colorless)
		{
			CurrentCardBorder = RarityBorder[Rarity.Uncommon];
		}
	}

	if (CurrentCard.Color == Color.Curse || CurrentCard.Color == Color.Status)
	{
		CurrentCard.IsGlowing = false;
		ButtonToggleGlow.state = false;
	}
	else if (CurrentCard.IsUpgraded || (CurrentCard.Rarity == Rarity.Rare && CurrentCard.Color != Color.Colorless))
	{
		CurrentCard.IsGlowing = true;
		ButtonToggleGlow.state = true;
	}
	else
	{
		CurrentCard.IsGlowing = false;
		ButtonToggleGlow.state = false;
	}

	FrameUpdate();
}

function UpdateText() {
	//noStroke();
	CanvasCard.noStroke();
	//textFont(fontKreon);
	CanvasCard.textFont(fontKreon);
	//textSize(25);
	CanvasCard.textSize(25);
	for (let z = 0; z < numOfRows; z++) {


		if (rows[z].string != "") {
			let coeff = 0;

			for (let k = 0; k < rows[z].chars.length; k++) {
				let CurrChar = rows[z].chars[k].char;

				if (rows[z].chars[k].colored == 8)
					{
						//Gold Number;
						CanvasCard.stroke(52, 41, 41);
						CanvasCard.strokeWeight(1);

						CanvasCard.textSize(20);
						CanvasCard.textAlign(CENTER);
						CanvasCard.fill(52, 41, 41);
						CanvasCard.text(
							rows[z].chars[k].char,
							(180.9 - 4 - rows[z].len / 2 + coeff) - 1,
							(347.6 - 13.5 * (numOfRows - 1) + z * 28) - 3+2
						);		
						CanvasCard.textAlign(LEFT);
						CanvasCard.textSize(25);			
						continue;
					};

				if (CurrChar == "@") {
					//image(CardMap.get(CardColor.value()+"ManaGem"), 197.6-rows[z].len/2+coeff, 404-13.5*(numOfRows-1)+z*28);
					CanvasCard.image(
						CardMap.get(ColorString[CurrentCard.Color] + "ManaGem"),
						177.6 - rows[z].len / 2 + coeff,
						324 - 13.5 * (numOfRows - 1) + z * 28+2
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
					
					CanvasCard.image(
						CurrentIcon,
						177.6 - rows[z].len / 2 + coeff,
						324 - 13.5 * (numOfRows - 1) + z * 28+2
					);
				} else {
					//stroke(52, 41, 41);
					CanvasCard.stroke(52, 41, 41);
					//strokeWeight(1);
					CanvasCard.strokeWeight(1);
					//fill(52, 41, 41);
					CanvasCard.fill(52, 41, 41);
					//Shadow
					CanvasCard.text(
						rows[z].chars[k].char,
						183.2 - 4 - rows[z].len / 2 + coeff,
						349.3 - 13.5 * (numOfRows - 1) + z * 28+2
					);

					cc = TextColor[rows[z].chars[k].colored];
					fill(cc[0], cc[1], cc[2]);
					CanvasCard.fill(cc[0], cc[1], cc[2]);
					//noStroke();
					CanvasCard.noStroke();
					//Left I Think
					CanvasCard.text(
						rows[z].chars[k].char,
						180.9 - 4 - rows[z].len / 2 + coeff,
						347.6 - 13.5 * (numOfRows - 1) + z * 28+2
					);
					//I don't know
					CanvasCard.text(
						rows[z].chars[k].char,
						181.2 - 4 - rows[z].len / 2 + coeff,
						347.8 - 13.5 * (numOfRows - 1) + z * 28 +2
					);
				}
				coeff = coeff + textWidth(rows[z].chars[k].char) + 0.2;
			}
		}
	}

	CurrentCard.Effect = TextArea.elt.value;
}

function PreTextUpdate() {
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
			} else if (curr === "~") {
				if (colored === 0) {
					colored = 3;
				} else if (colored === 3) {
					colored = 0;
				}
			} else if (curr === "^") {
				if (colored === 0) {
					colored = 4;
				} else if (colored === 4) {
					colored = 0;
				}
			} else if (curr === "$") {
				if (colored === 0) {
					colored = 5;
				} else if (colored === 5) {
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
	FrameUpdate();

}

//#region BUTTONS


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

	PreTextUpdate();
}

function AddKeyword(KeywordToAdd)
{
	let tmpStr = ">" + KeywordString[KeywordToAdd] + "<";

	TextArea.elt.value += tmpStr;
	PreTextUpdate();
}

function ButtonDraw() {
	CanvasTooltip.clear();

	Buttons.forEach(Button => {
		Button.Draw();
	})
}
//#endregion



//#region Buttons Fuction

function ToggleEnergy(NewState){

	if (NewState)
	{
		EnergyInput.show()
		ButtonToggleUpgradeEnergy.visible = true;
	}
	else{
		EnergyInput.hide();
		ButtonToggleUpgradeEnergy.visible = false;
	}
	ToggleTicked();
}

function ToggleEnergyUpgrade(newState)
{
	UpdateBorder();
	FrameUpdate();	
}

function ToggleCardUpgrade (newState) {

	CurrentCard.IsUpgraded = newState;
	
	UpdateBorder();
	FrameUpdate();
	if (newState)
	{
		UpdateGlow();	
	}
}

function ToggleGlow(newState){
	CurrentCard.IsGlowing = newState;
	FrameUpdate();
	if (newState)
	{
		UpdateGlow();	
	}	
}

function ToggleBoardGameMode(newState)
{
	ButtonToggleGlow.visible = newState;
	CurrentCard.HasBorder = newState;
	FrameUpdate();
}

function ToggleTicked(NewState){
	FrameUpdate();
}

function ChangeColor(ColorToChange) {

	ColorButtons[CurrentCard.Color].enabled = true;

	if (ColorToChange == Color.Curse || ColorToChange == Color.Status)
	{

		RarityButtons[CurrentCard.Rarity].enabled = true;
		RarityButtons[Rarity.Starter].enabled = false;
		CurrentCard.Rarity = Rarity.Starter;

		TypeButtons[CurrentCard.Type].enabled = true;
		TypeButtons[Type.Skill].enabled = false;
		CurrentCard.Type = Type.Skill;

		InputType.value(ColorString[ColorToChange]);

		CardManaIcon = CardMap.get("ColorlessManaGem");
		ButtonToggleEnergy.state = false;
		ButtonToggleUpgradeCard.state = false;
		CurrentCard.IsUpgraded = false;
		EnergyInput.hide();
		ButtonToggleUpgradeEnergy.visible = false;
	}
	else
	{
		InputType.value(TypeString[CurrentCard.Type]);
		CardManaIcon = CardMap.get(ColorString[CurrentCard.Color] + "ManaGem");
		ButtonToggleEnergy.state = true;
		EnergyInput.show();
		ButtonToggleUpgradeEnergy.visible = true;
	}

	CurrentCard.Color = ColorToChange;
	ColorButtons[CurrentCard.Color].enabled = false;


	UpdateBorder();
	changeCardFrame();

	UpdateGlow();

}

function ChangeRarity(RarityToChange) {

	RarityButtons[CurrentCard.Rarity].enabled = true;
	CurrentCard.Rarity = RarityToChange;
	RarityButtons[CurrentCard.Rarity].enabled = false;

	UpdateBorder();
	changeCardFrame();

	UpdateGlow();
}

function ChangeType(TypeToChange) {
	
	TypeButtons[CurrentCard.Type].enabled = true;
	CurrentCard.Type = TypeToChange;
	TypeButtons[CurrentCard.Type].enabled = false;
	
	
	if (CurrentCard.Color != Color.Status && CurrentCard.Color != Color.Curse)
		InputType.value(TypeString[CurrentCard.Type]);

	print(CurrentCard.IsGlowing)
	
	UpdateBorder();
	changeCardFrame();

	UpdateGlow();
}
//#endregion


function changeCardFrame() {

	let ColorStr = ColorString[CurrentCard.Color];
	let RarityStr = RarityString[CurrentCard.Rarity];
	let TypeStr = TypeString[CurrentCard.Type];

	if (CurrentCard.Color == Color.Status) {
		CurrentCardMana = ColorlessMana;
		CurrentManaColor = Color.Colorless;
		CurrentCardBackground = ColorlessSkillBackground;
		CurrentCardFrame = CardMap.get(RarityStr + "SkillFrame");
		
	} else if (CurrentCard.Color == Color.Curse) {
		
		CurrentCardMana = ColorlessMana;
		CurrentManaColor = Color.Colorless;
		CurrentCardBackground = CardMap.get(
			ColorStr + TypeStr + "Background"
		);
		CurrentCardFrame = CardMap.get(RarityStr + TypeStr + "Frame");
	
	} else {
		CurrentCardMana = CardMap.get(ColorStr + "Mana");
		CurrentManaColor = CurrentCard.Color;
		CurrentCardBackground = CardMap.get(
			ColorStr + TypeStr + "Background"
		);
		CurrentCardFrame = CardMap.get(RarityStr + TypeStr + "Frame");
	}
	FrameUpdate();
}

//#region ImageFunction
function resetArt() {
	ImageCenterX();
	ImageCenterY();
	ImageCenterZoom();

	FrameUpdate();
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

		ArtXPosition.value(DragInitialImageX + DeltaX);
		ArtYPosition.value(DragInitialImageY + DeltaY);
	}

	CanvasArt.imageMode(CENTER);

	if (CardArt != null) {
		CanvasArt.clear();
		CanvasArt.image(CardArt,			
			ArtXPosition.value() + 265 / 2,
			ArtYPosition.value() + 100,
			265 * (SliderZoom.value() / 100),
			((CardArt.height * 265 ) / CardArt.width) * (SliderZoom.value() / 100)
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

function updateArt(){

	if (CardArt != null) {
		CanvasDownload.image(
			CanvasArt,			
			65 - 15,
			80 - 20
		);
	}

}

function addArt(file) {

	if (file.type == "image") {
		CardArt = loadImage(file.data);

		//CardArt.resize(265, 0);

		//CardHeight = CardArt.height;

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

		
		CanvasArt.clear();
	} else {
		CardArt = null;
	}
	setTimeout(FrameUpdate, 100);
}

function removeArt() {
	CardArt = null;
	AddArt.value(null);
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

	CanvasArt.clear();

	resetArt();
}
//#endregion


function DownloadPng() {
	//let imagePng = canvas.get(20, 80, 350, 455);
	//imagePng.save(NameInput.value(), 'png');

	CanvasDownload.clear()
	CanvasDownloadWithBorder.clear();
	//imagePng = null;
	let downloadName = NameInput.value();
	downloadName = downloadName + (CurrentCard.IsUpgraded ? " plus" : "");
	
	updateArt();

	if (CurrentCard.HasBorder)
	{
		CanvasDownloadWithBorder.image(CurrentCardBorder, 0, 0);
		if (CurrentCard.IsGlowing)
			{
				CanvasDownloadWithBorder.image(CanvasGlow, -2 , 0);
			}
		if (CardArt != null) {
			CanvasDownloadWithBorder.image(
				CanvasArt,			
				60 - 2,
				80,
			);
		}

	
	
		CanvasDownloadWithBorder.image(CanvasCard, 15 - 2, 20);
		CanvasDownloadWithBorder.save(downloadName + ".png");

	}
	else
	{
		CanvasDownload.image(CanvasCard, 0, 0);
		CanvasDownload.save(downloadName + ".png");
	}
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
		FrameUpdate();
	} else {
		if (questionPressed === true || infoPressed === true) {
			questionPressed = false;
			infoPressed = false;
			FrameUpdate();
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
		SliderZoom.value(SliderZoom.value() + event.delta / -20);
	}
}

function mouseReleased(){
	DragImage = false;
}

