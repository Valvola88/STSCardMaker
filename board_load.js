//Colored border, for th Board Game
let RarityBorder = [];
let ColorBorder = [];

function BoardPreload(){
    for (i = 0; i < Rarity.Last; i++)
    {
        RarityBorder[i] = loadImage("board/" + RarityString[i] + "Border.png");
        //print(i)
    }

    for (i = 0; i < ManaColor.length; i++)
    {
        ColorBorder[i] = loadImage("board/" + ManaColor[i] + "Border.png");
    }
}

function BoardSetup(){
    for (i = 0; i < Rarity.Last; i++)
    {
        RarityBorder[i].resize(380, 510);
    }

    for (i = 0; i < ManaColor.length; i++)
    {
        ColorBorder[i].resize(380, 510);
    }

    CurrentCardBorder = RarityBorder[Rarity.Starter];

}
