app.controller('SettingPageController', ['$rootScope', '$scope', 'SettingUtils',
function($rootScope, $scope, SettingUtils) {

	// ------------------------------------------
	// Private
	// ------------------------------------------

	/**
	 * 初期化処理
	 */
	var _init = function() {

		// イベント初期化
		_initEvents();

		// 設定値読み込み
		loadSettings();
	};


	/**
	 * イベント初期化処理
	 */
	var _initEvents = function() {
	};


	/**
	 * 設定値読み込み
	 */
	var loadSettings = function() {

		// 設定値の取得
		var settings = SettingUtils.getSettings();

		// 設定値を画面へ設定
		$scope.interval        = settings.interval;
		$scope.onVibrate       = settings.onVibrate;
		$scope.imageSrcHome    = settings.imageUriHome;
		$scope.imageSrcCalling = settings.imageUriCalling;

	};


	/**
	 * 画像読み取り
	 */
	$scope.getPhoto = function(p) {

		navigator.camera.getPicture(
			function(imageUri) {

				// 画面へ画像を設定
				switch(p.type) {
					case 'home':
						$scope.imageSrcHome = imageUri;
						$scope.$apply();
						break;
					case 'calling':
						$scope.imageSrcCalling = imageUri;;
						$scope.$apply();
						break;
					default: break;
				}
			},
			function(message) {
				// error
				alert(message);
				console.log(message);
			},
			{
				quality: 50,
				destinationType: Camera.DestinationType.FILE_URI,
				sourceType: Camera.PictureSourceType.PHOTOLIBRARY
			}
		);
	}


	// ------------------------------------------
	// Public
	// ------------------------------------------
	$scope.goBackPage = function() {

		// 設定を保存する
		var s = {
			interval        : $scope.interval,
			onVibrate       : $scope.onVibrate,
			imageUriHome    : $scope.imageSrcHome,
			imageUriCalling : $scope.imageSrcCalling,
		};
		SettingUtils.saveSettings(s);


		// 変更内容を通知
		$rootScope.$emit('eventRefreshScreen', s);


		// 前のページへ戻る
		ons.navigator.popPage();
	};


	/**
	 * デフォルト設定
	 */
	$scope.setDefault = function() {

		// デフォルト設定
		SettingUtils.setDefault();

		// 設定値読み込み
		loadSettings();
	};




	$scope.intervals = [
		{value: 1000,  display: '１秒',},
		{value: 2000,  display: '２秒',},
		{value: 3000,  display: '３秒',},
		{value: 5000,  display: '５秒',},
		{value: 10000, display: '１０秒',},
	];
	$scope.interval;
	$scope.onVibrate;
	$scope.imageSrcHome;
	$scope.imageSrcCalling;

	// 初期化処理
	_init();

}]);
