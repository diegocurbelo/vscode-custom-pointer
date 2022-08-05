# Custom Pointer

[![Badge](https://vsmarketplacebadge.apphb.com/version-short/diegocurbelo.custom-pointer.svg?color=blue&style=?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=diegocurbelo.custom-pointer)
[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/diegocurbelo.custom-pointer.svg?color=blue&style=flat-square)](https://marketplace.visualstudio.com/items?itemName=diegocurbelo.custom-pointer)
[![License](https://img.shields.io/badge/license-MIT-orange.svg?color=blue&style=flat-square)](http://opensource.org/licenses/MIT)

This extension updates the VS Code styles to change the hand cursor to a normal pointer.

> If you're using **Windows**, _Visual Studio Code_ must be running as an administrator in order for this extension to be able to add the new css styles.

## Install
Follow the instructions in the Marketplace, or run the following in the command palette:

ext install diegocurbelo.custom-pointer

## Usage
The extension will be enabled by default. And can be enabled or disabled with the following commands:

> You can open the Command Palette with `Shift+CMD+P`

* `Custom Pointer: Enable`: enable the extension

* `Custom Pointer: Disable`: disable the extension

## Important Notice
As the description says, this extension overrides the editor CSS styles to use `cursor:default` instead of `cursor:pointer` throughout the UI.

To achieve this it adds new styles at the end of the file `workbench.desktop.main.css`; and modifying this file causes the editor to detect the installation as corrupt and display a warning notification (that can be hidden by selecting "Don't Show Again').

![warning](warning.png)

_NOTE_: Disabling the extension removes the custom CSS styles, and after  restarting the editor the notification is no longer displayed, there is no need to reinstall VS Code.