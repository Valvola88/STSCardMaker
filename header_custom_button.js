/*class AButton {
  
}

class ToggleButton {

}


class CustomButton {
  constructor(x, y, image, onPress, visible = true, enabled = true) {
    this.enable = enabled;
    this.x = x;
    this.y = y;
	this.image = image;
    this.w = image.width;
    this.h = image.height;

    this.hover_tint =  [192, 192, 192];
    this.disable_tint = [64, 64, 64];

    this.onPress = onPress;
    this.visible = visible;
    this.enabled = enabled;

  }

  Draw() {

    if (!this.visible)
      return;

    if (this.isMouseInside())
      {
        tint(192,192,192);
      }
      else{
        tint('white');
      }
      image(this.image, this.x, this.y);
    
  }

  isMouseInside()
  {
    return mouseX > this.x &&
    mouseX < this.x + this.w &&
    mouseY > this.y &&
    mouseY < this.y + this.h;
  }


  MousePressed() {
    if (!this.visible)
      return;

    if (this.isMouseInside()) {
      this.onPress();
    }
  }
}*/


class AButton {
	constructor(x, y, image, onPress,extra, visible, enabled, tooltip)
	{
		this.enable = enabled;
		this.x = x;
		this.y = y;

		this.image = image;
		this.extra = extra;

		this.w = image.width;
		this.h = image.height;

		this.onPress = onPress;
		this.visible = visible;
		this.enabled = enabled;
	}

	IsMouseInside()
	{
		return mouseX > this.x &&
		mouseX < this.x + this.w &&
		mouseY > this.y &&
		mouseY < this.y + this.h;
	}

	MousePressed() {
		if (!this.visible)
			return;
		if (!this.enabled)
			return;

		if (this.IsMouseInside()) {
			if (this.extra)
				this.onPress(this.extra);
			else
				this.onPress(0);
		}
	}

	Draw() {
		if (!this.visible)
			return;

		if (!this.enabled)
		{
			this.DrawDisable();
		}
		else if (this.IsMouseInside())
		{
			this.DrawHover();
		}
		else 
		{
			this.DrawEnable();
		}

		tint('white')
	}

	DrawDisable(){};
	DrawEnable(){};
	DrawHover(){};
}

class ToggleImageButton extends AButton{
	constructor(x, y, imageTrue, imageFalse, onPress, startState = false, extra = null, visible = true, enabled = true) {
		super(x, y, imageTrue, onPress, extra, visible, enabled);

		this.imageFalse = imageFalse;

		this.state = startState;

		this.main_tint = [255,255,255];
		this.hover_tint =  [255, 255, 64];
		this.disable_tint = [64, 64, 64];

	}
	
	MousePressed() {
		if (!this.visible)
			return;
		if (!this.enabled)
			return;

		if (this.IsMouseInside()) {
			this.state = !this.state;
			this.onPress(this.state, this.extra);
		}
	}

	DrawDisable() {
		tint(this.disable_tint[0], this.disable_tint[1], this.disable_tint[2]);
		image(this.state ? this.image : this.imageFalse, this.x, this.y);
	}

	DrawHover() {
		tint(this.hover_tint[0], this.hover_tint[1], this.hover_tint[2]);
		image(this.state ? this.image : this.imageFalse, this.x, this.y);
	}

	DrawEnable() {
		tint(this.main_tint);
		image(this.state ? this.image : this.imageFalse, this.x, this.y);
	}
	
}


class StandardButton extends AButton {

	constructor(x, y, image, onPress, extra = null, visible = true, enabled = true) {
		super(x, y, image, onPress, extra, visible, enabled);

		this.hover_tint =  [255, 255, 64];
		this.disable_tint = [64, 64, 64];
	}

	DrawDisable() {
		tint(this.disable_tint[0], this.disable_tint[1], this.disable_tint[2]);
		image(this.image, this.x, this.y);
	}

	DrawHover() {
		tint(this.hover_tint[0], this.hover_tint[1], this.hover_tint[2]);
		image(this.image, this.x, this.y);
	}

	DrawEnable() {
		tint('white');
		image(this.image, this.x, this.y);
	}


}