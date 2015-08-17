# This is how the SCSS folder is structerd
# Based on SMACSS 

# Modules -> Specific items. Mixins and stuff that doesnt output css
# Partials (layout stuff) -> typography, buttons, textboxes, selectboxes, resets etc. If in doubt put it here
# Vendor -> For files from other projects

# EXAMPLE LAyOUT BELOW: 

scss/
|
|-- modules/              # Common modules
|   |-- _all.scss         # Include to get all modules
|   |-- _utility.scss     # Module name
|   |-- _colors.scss      # Etc...
|   ...
|
|-- partials/             # Partials
|   |-- _base.sass        # imports for all mixins + global project variables
|   |-- _buttons.scss     # buttons
|   |-- _figures.scss     # figures
|   |-- _grids.scss       # grids
|   |-- _typography.scss  # typography
|   |-- _reset.scss       # reset
|   ...
|
|-- vendor/               # CSS or Sass from other projects
|   |-- _colorpicker.scss
|   |-- _jquery.ui.core.scss
|   ...
|
`-- main.scss            # primary Sass file
