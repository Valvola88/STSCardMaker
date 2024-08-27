const Color = {
	Red: 0,
	Green: 1,
	Blue: 2,
	Purple: 3,
	Colorless: 4,
	Status: 5,
	Curse: 6,
	Last: 7
}

const Rarity = {
	Starter: 0,
	Common: 1,
	Uncommon: 2,
	Rare: 3,
	Last: 4
}

const Type = {
	Attack: 0,
	Skill: 1,
	Power: 2,
	Last: 3
}

const ManaColor = ["Red", "Green", "Blue", "Purple", "Colorless"];
const TypeString = ["Attack", "Skill", "Power"];
const ColorString = ["Red", "Green", "Blue", "Purple", "Colorless", "Status", "Curse"];
const RarityString = ["Starter", "Common", "Uncommon", "Rare"];

const Icon = {
	Attack: 0,
	Block: 1,
	Vulnerable: 2,
	Weak: 3,
	Strength: 4,
	Energy: 5,
	Row: 6,
	Poison: 7,
	Miracle: 8,
	Daze: 9,
	Shiv: 10,
	Potion: 11,
	Dice: 12,
    Trinket: 13,
    Slime: 14,
    Flame: 15,
    Common: 16,
    Upgrade: 17,
    Rare: 18,
    Gold: 19,
	Last: 20
}

const IconString = [
    "Attack",
    "Block",
    "Vulnerable",
    "Weak",
    "Strength",
    "Energy",
    "Row",
    "Poison",
    "Miracle",
    "Daze",
    "Shiv",
    "Potion",
    "Dice",
    "Trinket",
    "Slime",
    "Flame",
    "Common",
    "Upgrade",
    "Rare",
    "Gold"
]
const IconCode = ["A", "B", "V", "W", "U", "@", "R", "P", "M", "D", "S", "O", "1", "T", "L", "F", "C", "Y", "K", "G"];

const Keyword = {
    Exhaust: 0,
    Ethereal: 1,
    Evoke: 2,
    Channel: 3,
    Lightning: 4,
    Frost: 5,
    Dark: 6,
    Calm: 7,
    Wrath: 8,
    Retain: 9,
    Last: 10
}

const KeywordString = [
    "Exhaust",
    "Ethereal",
    "Evoke",
    "Channel",
    "Lightning",
    "Frost",
    "Dark",
    "Calm",
    "Wrath",
    "Retain"
]

