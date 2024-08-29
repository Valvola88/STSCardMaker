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

let ButtonToggleEnergy;
let ButtonToggleUpgradeCard;
let ButtonToggleUpgradeEnergy;
let ButtonToggleGlow;
let ButtonToggleShowBorder;
//let ButtonLoadURL;

let UIShowGlow;
let UIHideGlow;
let UIShowBorder;
let UIHideBorder;

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

    UIShowBorder = loadImage("ui/BorderButton.png");
    UIHideBorder = loadImage("ui/BorderNoButton.png");

    UIShowGlow = loadImage("ui/GlowButton.png");
    UIHideGlow = loadImage("ui/GlowNoButton.png");
	
}

function ButtonSetup() {

	for( i = 0; i < Color.Last; i++){
		UIColorImage[i].resize(48, 48);
		let Button = new StandardButton(450 + i * 50, 230, UIColorImage[i], ChangeColor, i);
		ColorButtons.push(Button);
		Buttons.push(Button);
	}

	for( i = 0; i < Type.Last; i++){
		UITypeImage[i].resize(48, 48);
		let Button = new StandardButton(450 + i * 50, 280, UITypeImage[i], ChangeType, i);
		TypeButtons.push(Button);
		Buttons.push(Button);

	}

	for( i = 0; i < Rarity.Last; i++){
		UIRarityImage[i].resize(48, 48);
		let Button = new StandardButton(450 + i * 50, 330, UIRarityImage[i], ChangeRarity, i);
		RarityButtons.push(Button);
		Buttons.push(Button);
	}
	
	for( i = 0; i < Icon.Last; i++){
		UIIcon[i].resize(32, 32);
		let Button = new StandardButton(460 + (i % 10) * 32, 125 + Math.floor(i / 10) * 32, UIIcon[i], AddIcon, i);
		IconButtons.push(Button);
		Buttons.push(Button);
	}

	for( i = 0; i < Keyword.Last; i++){
		UIKeyword[i].resize(32, 32);
		let Button = new StandardButton(460 + i * 32, 125 + 64, UIKeyword[i], AddKeyword, i);
		KeywordButton.push(Button);
		Buttons.push(Button);
	}

	ColorButtons[Color.Red].enabled = false;
	TypeButtons[Type.Attack].enabled = false;
	RarityButtons[Rarity.Starter].enabled = false; 

	UICheckFalse.resize(48,48);
	UICheckTrue.resize(48,48);

	ButtonToggleEnergy = new ToggleImageButton(8, 16, UICheckTrue, UICheckFalse, ToggleEnergy, true);
	ButtonToggleUpgradeEnergy = new ToggleImageButton(110, 16, UICheckTrue, UICheckFalse, ToggleEnergyUpgrade, false);
	ButtonToggleUpgradeEnergy.main_tint = [0,255,0];
	ButtonToggleUpgradeEnergy.hover_tint = [64,192,64];
	
	ButtonToggleUpgradeCard = new ToggleImageButton(274, 0, UICheckTrue, UICheckFalse, ToggleNameUpgrade, false);
	ButtonToggleUpgradeCard.main_tint = [0,255,0];
	ButtonToggleUpgradeCard.hover_tint = [64,192,64];

    UIShowBorder.resize(48,48);
    UIHideBorder.resize(48,48);
    UIShowGlow.resize(48,48);
    UIHideGlow.resize(48,48);

	ButtonToggleGlow = new ToggleImageButton(700, 330, UIHideGlow, UIShowGlow, ToggleGlow, false);
	ButtonToggleShowBorder = new ToggleImageButton(750,330,UIHideBorder, UIShowBorder, ToggleBoardGameMode, true);

	Buttons.push(ButtonToggleEnergy);
	Buttons.push(ButtonToggleUpgradeCard);
	Buttons.push(ButtonToggleUpgradeEnergy);
	Buttons.push(ButtonToggleGlow);
	Buttons.push(ButtonToggleShowBorder);

	UICenterX.resize(40,40);
	UICenterY.resize(40,40);
	UICenterZoom.resize(40,40);

	UIExportButtonImage.resize(64, 64);
	UIRemoveButtonImage.resize(48, 48);
	UIRemoveResetImage.resize(48, 48);

	ButtonCenterX = new StandardButton(450, 400, UICenterX, ImageCenterX);
	ButtonCenterY = new StandardButton(450, 440, UICenterY, ImageCenterY);
	ButtonCenterZoom = new StandardButton(450, 480, UICenterZoom, ImageCenterZoom);
	ButtonExport = new StandardButton(760, 435 - 8, UIExportButtonImage, DownloadPng);
	ButtonRemove = new StandardButton(705, 435, UIRemoveButtonImage, removeArt);
    //ButtonLoadURL = new StandardButton(450,500,UIRemoveButtonImage, LoadImageFromURL);
	
	Buttons.push(ButtonCenterX);
	Buttons.push(ButtonCenterY);
	Buttons.push(ButtonCenterZoom);
	Buttons.push(ButtonExport);
	Buttons.push(ButtonRemove);
	//Buttons.push(ButtonLoadURL);

	ButtonCenterX.visible = false;
	ButtonCenterY.visible = false;
	ButtonCenterZoom.visible = false;
	ButtonRemove.visible = false;
	//ButtonResetImage.visible = false;
}