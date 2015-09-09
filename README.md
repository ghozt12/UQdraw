# UQdraw
UQDraw web application for DECO3801.
How to Install web application
upload all files from the UQDraw folder onto webserver 

# SCSS
Make sure you are editing the .scss files and not the main.css file. See style guide for more info.
To convert the scss to css we are using compass.

Compass is a ruby command line program that automatically converts and combines the scss to css.

# Installing compass
## Windows
You will have to download ruby if you dont have it
- Go to: http://rubyinstaller.org
- Click big red download button
- Install

You will need to run commandpromt-ruby (just search for ruby and it should show up or you can navigate to the folder you installed ruby in)

once it has opened, navigate to the UQDraw folder: 
(easiest way is to open it in file explorer and just copy the path)\
- cd path
Then type
- gem install compass
hit enter

Once that is done you can run compass by typing 
- compass watch

## Mac
http://code.tutsplus.com/tutorials/how-to-install-ruby-on-a-mac--net-21664

Once that is done cd to your working directory
- cd Documents/UQDraw/    (example)

Type 
- gem install compass

Run
- compass watch

# UQDRAW CSS STYLE GUIDE

## Naming 
Keep the naming as simple as possible

For example if your css code is in _header.scss then use header as the first part of the name: 
<div class=“header-example”> 


## Folder Structure

[Will update]

## Grid

We are using Gridism http://cobyism.com/gridism/

## Other

[Will update]

## Compass

## SCSS tips

### Extend
You can use ‘@extend className’ to copy all the classes attributes.

example 
.noselect {
	 user-select: none;
}

.button {
	@extend .noselect;
	height: 10px;
	width: 100px;
}

### &
You can use &:hover

className {
	background: black;

	&:hover {
		background: white;
	}
}

