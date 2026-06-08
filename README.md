# toyhouse-css-killer
Turns off individual CSS pages on toyhouse while still keeping CSS visible elsewhere.
I originally made a suggestion for this feature to be added to toyhouse officially, and then later realized I could code it myself with a user script. It's not seamless, but it get ths job done. If you'd like for toyhouse to make an official functionality to take its place, consider voicing your support on <a href = "https://toyhou.se/~forums/14.suggestions-bugs/784693.disable-custom-css-on-a-usercharacter-level>my thread</a>.

## Installation
I created this for Tampermonkey!
- Install Tampermonkey extension
- Click on [css-killer.user.js](https://raw.githubusercontent.com/Drakizora/toyhouse-css-killer/refs/heads/main/css-killer.user.js) to install or update.

## Features
This script places a CSS button next to your toyhouse notifications. When clicked while on a user's profile, character, or world, their CSS will be disabled on your browser. Clicking it again will turn it back on.

## Notes
- If CSS is disabled for a page, there's a small delay between the page loading and the script running to turn the CSS off.
- The button does not display for your own user profile. I assumed that wouldn't be necessary.
