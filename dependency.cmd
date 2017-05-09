(npm install)
npm install rxjs --save
npm install @ionic-native/core --save
ionic plugin add --save cordova-plugin-camera
npm install --save @ionic-native/camera
ionic plugin add --save cordova-plugin-file-transfer
npm install --save @ionic-native/transfer
ionic plugin add cordova-plugin-file --save
npm install --save @ionic-native/file
ionic plugin add cordova-plugin-filepath --save
npm install --save @ionic-native/file-path
npm uninstall --save @ionic-native/core
npm install --save @ionic-native/core@latest
npm install -g typings --save
typings install dt~cordova --save --global (do not use proxy!)


ionic platform add ios
ionic build ios
ionic emulate ios -l -c

export ANDROID_HOME=~/IdeaProjects/AndroidSDK/adt-bundle-mac-x86_64-20140702/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools

ionic run android --device
chrome://inspect/#devices

