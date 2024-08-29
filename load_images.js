//Loading everything needed for making the card

let RedMana;
let RedManaGem;
let RedAttackBackground;
let RedSkillBackground;
let RedPowerBackground;

let GreenMana;
let GreenManaGem;
let GreenAttackBackground;
let GreenSkillBackground;
let GreenPowerBackground;

let BlueMana;
let BlueManaGem;
let BlueAttackBackground;
let BlueSkillBackground;
let BluePowerBackground;

let PurpleMana;
let PurpleManaGem;
let PurpleAttackBackground;
let PurpleSkillBackground;
let PurplePowerBackground;

let ColorlessMana;
let ColorlessAttackBackground;
let ColorlessSkillBackground;
let ColorlessPowerBackground;

let CommonAttackFrame;
let CommonSkillFrame;
let UncommonAttackFrame;
let UncommonSkillFrame;
let UncommonPowerFrame;
let RareAttackFrame;
let RareSkillFrame;
let RarePowerFrame;

let CursePowerBackground;
let CurseSkillBackground;
let CurseAttackBackground;

let ImageUpgrade;

//Green Glow of the Gem when upgraded
let ManaGemUpgrade = [];

function ImagePreload()
{
	RedMana = loadImage("assets/RedMana.png");
	RedManaGem = loadImage("assets/RedManaGem.png");
	RedAttackBackground = loadImage("assets/RedAttackBackground.png");
	RedSkillBackground = loadImage("assets/RedSkillBackground.png");
	RedPowerBackground = loadImage("assets/RedPowerBackground.png");

	GreenMana = loadImage("assets/GreenMana.png");
	GreenManaGem = loadImage("assets/GreenManaGem.png");
	GreenAttackBackground = loadImage("assets/GreenAttackBackground.png");
	GreenSkillBackground = loadImage("assets/GreenSkillBackground.png");
	GreenPowerBackground = loadImage("assets/GreenPowerBackground.png");

	BlueMana = loadImage("assets/BlueMana.png");
	BlueManaGem = loadImage("assets/BlueManaGem.png");
	BlueAttackBackground = loadImage("assets/BlueAttackBackground.png");
	BlueSkillBackground = loadImage("assets/BlueSkillBackground.png");
	BluePowerBackground = loadImage("assets/BluePowerBackground.png");

	PurpleMana = loadImage("assets/PurpleMana.png");
	PurpleManaGem = loadImage("assets/PurpleManaGem.png");
	PurpleAttackBackground = loadImage("assets/PurpleAttackBackground.png");
	PurpleSkillBackground = loadImage("assets/PurpleSkillBackground.png");
	PurplePowerBackground = loadImage("assets/PurplePowerBackground.png");

	ColorlessMana = loadImage("assets/ColorlessMana.png");
	ColorlessAttackBackground = loadImage("assets/ColorlessAttackBackground.png");
	ColorlessSkillBackground = loadImage("assets/ColorlessSkillBackground.png");
	ColorlessPowerBackground = loadImage("assets/ColorlessPowerBackground.png");

	CommonPowerFrame = loadImage("assets/CommonPowerFrame.png")
	CommonAttackFrame = loadImage("assets/CommonAttackFrame.png");
	CommonSkillFrame = loadImage("assets/CommonSkillFrame.png");
	UncommonAttackFrame = loadImage("assets/UncommonAttackFrame.png");
	UncommonSkillFrame = loadImage("assets/UncommonSkillFrame.png");
	UncommonPowerFrame = loadImage("assets/UncommonPowerFrame.png");
	RareAttackFrame = loadImage("assets/RareAttackFrame.png");
	RareSkillFrame = loadImage("assets/RareSkillFrame.png");
	RarePowerFrame = loadImage("assets/RarePowerFrame.png");

	CursePowerBackground = loadImage("assets/CursePowerBackground.png");
	CurseAttackBackground = loadImage("assets/CurseAttackBackground.png");
	CurseSkillBackground = loadImage("assets/CurseSkillBackground.png");

	ImageUpgrade = loadImage("ui/Upgrade.png");

	for (i = 0; i < 5; i++)
	{
		let ManaUpgrade = loadImage("assets/" + ManaColor[i] + "Mana.png");
		ManaGemUpgrade.push(ManaUpgrade);
	}
}

function ImageResize()
{
	RedMana.resize(350, 0);
	RedManaGem.resize(28, 28);
	RedAttackBackground.resize(350, 0);
	RedSkillBackground.resize(350, 0);
	RedPowerBackground.resize(350, 0);

	CommonAttackFrame.resize(350, 0);
	CommonSkillFrame.resize(350, 0);
	CommonPowerFrame.resize(350, 0);
	UncommonAttackFrame.resize(350, 0);
	UncommonSkillFrame.resize(350, 0);
	UncommonPowerFrame.resize(350, 0);
	RareAttackFrame.resize(350, 0);
	RareSkillFrame.resize(350, 0);
	RarePowerFrame.resize(350, 0);

	GreenMana.resize(350, 0);
	GreenAttackBackground.resize(350, 0);
	GreenSkillBackground.resize(350, 0);
	GreenPowerBackground.resize(350, 0);

	BlueMana.resize(350, 0);
	BlueAttackBackground.resize(350, 0);
	BlueSkillBackground.resize(350, 0);
	BluePowerBackground.resize(350, 0);

	PurpleMana.resize(350, 0);
	PurpleAttackBackground.resize(350, 0);
	PurpleSkillBackground.resize(350, 0);
	PurplePowerBackground.resize(350, 0);

	ColorlessMana.resize(350, 0);
	ColorlessAttackBackground.resize(350, 0);
	ColorlessSkillBackground.resize(350, 0);
	ColorlessPowerBackground.resize(350, 0);

	CurseAttackBackground.resize(350, 0);
	CurseSkillBackground.resize(350, 0);
	CursePowerBackground.resize(350, 0);
	
	for (i = 0; i < 5; i++)
	{	
		ManaUpgrade = ManaGemUpgrade[i];
		//ManaUpgrade.getContext("2d", { willReadFrequently: true })
		//ManaUpgrade.loadPixels();
		/*for(j = 0; j < ManaUpgrade.pixels.length; j += 4)
		{
			ManaUpgrade.pixels[j] = 0;
			ManaUpgrade.pixels[j + 1] = 255;
			ManaUpgrade.pixels[j + 2] = 0;
		}*/

		//ManaUpgrade.updatePixels();	
		ManaUpgrade.filter(THRESHOLD, 10);
		ManaUpgrade.filter(INVERT);
		ManaUpgrade.resize(350,0);
		ManaUpgrade.filter(BLUR, 4)
	}
}