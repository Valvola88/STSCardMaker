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

	//AButton.TooltipCanvas = CanvasTooltip;
	CanvasTooltip.textFont(fontKreon);
	CanvasTooltip.textSize(24);
	CanvasTooltip.textAlign(CENTER);
	CanvasTooltip.rectMode(CENTER);

	for( i = 0; i < Color.Last; i++){
		UIColorImage[i].resize(48, 48);
		let Button = new StandardButton(450 + i * 50, 230, UIColorImage[i], ChangeColor, i);
		Button.Tooltip = ColorString[i];
		ColorButtons.push(Button);
		Buttons.push(Button);
	}

	for( i = 0; i < Type.Last; i++){
		UITypeImage[i].resize(48, 48);
		let Button = new StandardButton(450 + i * 50, 280, UITypeImage[i], ChangeType, i);
		Button.Tooltip = TypeString[i]
		TypeButtons.push(Button);
		Buttons.push(Button);
		

	}

	for( i = 0; i < Rarity.Last; i++){
		UIRarityImage[i].resize(48, 48);
		let Button = new StandardButton(450 + i * 50, 330, UIRarityImage[i], ChangeRarity, i);
		Button.Tooltip = RarityString[i]
		Button.TooltipYOffset = +30;
		RarityButtons.push(Button);
		Buttons.push(Button);
	}
	
	for( i = 0; i < Icon.Last; i++){
		UIIcon[i].resize(32, 32);
		let Button = new StandardButton(460 + (i % 10) * 32, 125 + Math.floor(i / 10) * 32, UIIcon[i], AddIcon, i);
		Button.Tooltip = IconString[i];
		if (i < 10)
		{
			Button.TooltipYOffset = +30;
		}
		IconButtons.push(Button);
		Buttons.push(Button);
	}

	for( i = 0; i < Keyword.Last; i++){
		UIKeyword[i].resize(32, 32);
		let Button = new StandardButton(460 + i * 32, 125 + 64, UIKeyword[i], AddKeyword, i);
		Button.Tooltip = KeywordString[i]
		KeywordButton.push(Button);
		Buttons.push(Button);
	}

	ColorButtons[Color.Red].enabled = false;
	TypeButtons[Type.Attack].enabled = false;
	RarityButtons[Rarity.Starter].enabled = false; 

	UICheckFalse.resize(48,48);
	UICheckTrue.resize(48,48);

	ButtonToggleEnergy = new ToggleImageButton(8, 16, UICheckTrue, UICheckFalse, ToggleEnergy, true);
	ButtonToggleEnergy.Tooltip = "Toggle Energy";
	ButtonToggleEnergy.TooltipYOffset = 50;
	ButtonToggleEnergy.TooltipXOffset = 70;
	

	ButtonToggleUpgradeEnergy = new ToggleImageButton(110, 16, UICheckTrue, UICheckFalse, ToggleEnergyUpgrade, false);
	ButtonToggleUpgradeEnergy.Tooltip = "Upgrade Energy";
	ButtonToggleUpgradeEnergy.TooltipYOffset = 50;
	ButtonToggleUpgradeEnergy.main_tint = [0,255,0];
	ButtonToggleUpgradeEnergy.hover_tint = [64,192,64];
	
	ButtonToggleUpgradeCard = new ToggleImageButton(274, 0, UICheckTrue, UICheckFalse, ToggleNameUpgrade, false);
	ButtonToggleUpgradeCard.Tooltip = "Upgrade Card"
	ButtonToggleUpgradeCard.main_tint = [0,255,0];
	ButtonToggleUpgradeCard.hover_tint = [64,192,64];
	ButtonToggleUpgradeCard.TooltipYOffset = 70;
	ButtonToggleUpgradeCard.TooltipXOffset = 0;



    UIShowBorder.resize(48,48);
    UIHideBorder.resize(48,48);
    UIShowGlow.resize(48,48);
    UIHideGlow.resize(48,48);

	ButtonToggleGlow = new ToggleImageButton(700, 330, UIHideGlow, UIShowGlow, ToggleGlow, false);
	ButtonToggleGlow.Tooltip = "Toggle Glow"
	ButtonToggleGlow.TooltipYOffset = +30;
	ButtonToggleShowBorder = new ToggleImageButton(750,330,UIHideBorder, UIShowBorder, ToggleBoardGameMode, true);
	ButtonToggleShowBorder.Tooltip = "Toggle Border Card"
	ButtonToggleShowBorder.TooltipYOffset = +30;
	
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
	ButtonCenterX.Tooltip = "Center X"
	ButtonCenterX.TooltipXOffset = -60;
	ButtonCenterX.TooltipYOffset = -10;

	ButtonCenterY = new StandardButton(450, 440, UICenterY, ImageCenterY);
	ButtonCenterY.Tooltip = "Center Y"
	ButtonCenterY.TooltipXOffset = -60;
	ButtonCenterY.TooltipYOffset = -10;

	ButtonCenterZoom = new StandardButton(450, 480, UICenterZoom, ImageCenterZoom);
	ButtonCenterZoom.Tooltip = "Set Zoom to 1"
	ButtonCenterZoom.TooltipXOffset = -90;
	ButtonCenterZoom.TooltipYOffset = -10;

	ButtonExport = new StandardButton(760, 435 - 8, UIExportButtonImage, DownloadPng);
	ButtonExport.Tooltip = "Download Card"
	ButtonRemove = new StandardButton(705, 435, UIRemoveButtonImage, removeArt);
	ButtonRemove.Tooltip = "Remove Card Art"
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