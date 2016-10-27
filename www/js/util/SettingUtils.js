app.factory('SettingUtils', function() {

	// ------------------------------------------
	// Private
	// ------------------------------------------

	var KEY_SETTINGS = 'key-settings';

	var DEFAULT_INTERVAL          = 5000;
	var DEFAULT_ON_VIBRATE        = true;
	var DEFAULT_IMAGE_URI_HOME    = 'images/default_home.png';
	var DEFAULT_IMAGE_URI_CALLING = 'images/default_calling.png';


	// 設定初期化処理
	var _init = function() {

		if (!(localStorage.getItem(KEY_SETTINGS))) {
			var s = {
				interval        : DEFAULT_INTERVAL,
				onVibrate       : DEFAULT_ON_VIBRATE,
				imageUriHome    : DEFAULT_IMAGE_URI_HOME,
				imageUriCalling : DEFAULT_IMAGE_URI_CALLING,
			};
			saveSettings(s);
		}
	};


	// ------------------------------------------
	// Public
	// ------------------------------------------

	var saveSettings = function(s) {
		localStorage.setItem(KEY_SETTINGS, angular.toJson(s));
	};

	var getSettings = function() {
		_init();
		var s = localStorage.getItem(KEY_SETTINGS);
		return JSON.parse(s);
	};


	/**
	 * 設定クリア
	 */
	var setDefault = function() {
		localStorage.clear();
		_init();
	 };


	/**
	 * インターバル取得
	 */
	var getInterval = function() {
		var s = getSettings();
		return s.interval;
	};


	/**
	 * スクリーンショット取得
	 */
	var getScreenshot = function() {
		var s = getSettings();
		return s.imageUriHome;
	};


	return {
		setDefault    : setDefault,		/** 設定クリア */
		saveSettings  : saveSettings,	/** 設定保存 */
		getInterval   : getInterval,	/** インターバル取得 */
		getScreenshot : getScreenshot,	/** スクリーンショット取得 */
		getSettings   : getSettings,	/** 設定内容取得 */
	 };

});
