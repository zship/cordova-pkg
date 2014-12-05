var fs = require('fs');


function get(obj, prop){
	var parts = prop.split('.'),
		last = parts.pop();

	while (prop = parts.shift()) {
		obj = obj[prop];
		if (typeof obj !== 'object' || !obj) return;
	}

	return obj[last];
}


var config = fs.readFileSync(process.argv[2], 'utf8');
config = JSON.parse(config);


if (config.plugins) {
	config.plugins = config.plugins.join('|');
}

if (config.icons) {
	config.icons = Object.keys(config.icons).map(function(size) {
		var src = config.icons[size];
		return size + '|' + src;
	}).join(':');
}


var mappings = {
	'id': 'APP_ID',
	'name': 'APP_NAME',
	'version': 'APP_VERSION',
	'iosBuildNumber': 'APP_IOS_BUILD_NUMBER',
	'androidBuildNumber': 'APP_ANDROID_BUILD_NUMBER',
	'icons': 'APP_ICONS',
	'splash': 'APP_SPLASH',
	'plugins': 'APP_PLUGINS',
	'sign.android.keystore': 'APP_ANDROID_KEYSTORE',
	'sign.android.alias': 'APP_ANDROID_ALIAS',
	'sign.android.keypass': 'APP_ANDROID_KEYPASS',
	'sign.android.storepass': 'APP_ANDROID_STOREPASS',
	'sign.ios.provisioning_profile': 'APP_IOS_PROVISIONING_PROFILE',
	'sign.ios.identity': 'APP_IOS_IDENTITY'
};

Object.keys(mappings).forEach(function(key) {
	var translation = mappings[key];
	var val = get(config, key);
	if (val) {
		process.stdout.write('export ' + translation + '="' + val + '"; ');
	}
});
