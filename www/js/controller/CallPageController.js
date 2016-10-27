app.controller('CallPageController', ['$rootScope', '$scope', 'SoundUtils', 'SettingUtils',
function($rootScope, $scope, SoundUtils, SettingUtils) {


	// ------------------------------------------
	// Private
	// ------------------------------------------

	/**
	 * 初期化処理
	 */
	var _init = function() {

		// イベント初期化
		_initEvents();

		// 呼び出しの遅延設定
		reserveCalling();
	};


	/**
	 * イベント初期化処理
	 */
	var _initEvents = function() {
	};


	/**
	 * 呼び出し処理の遅延設定
	 */
	var reserveCalling = function() {

		// 設定値の取得
		var s = SettingUtils.getSettings();

		// 背景設定
		$scope.backgroundImageSrc = s.imageUriHome;

		// 呼び出し処理の遅延設定
		SoundUtils.setOnVibrate(s.onVibrate);
		SoundUtils.setCalling(function() {
				$scope.backgroundImageSrc = s.imageUriCalling;
			},
			s.interval);

		// 呼び出し処理設定フラグ：ON
		$scope.isCallReserved = true;
	};


	var stopCall = function(){

		// 停止
		SoundUtils.stop();

		// 呼び出し処理設定フラグ：OFF
		$scope.isCallReserved = false;
	};


	// ------------------------------------------
	// Public
	// ------------------------------------------

	$scope.backgroundImageSrc = '';			// 背景画像URI
	$scope.isCallReserved     = false;		// 呼び出し処理設定フラグ


	/**
	 * 呼び出し処理：停止
	 */
	$scope.stopCall = stopCall;


	/**
	 * 呼び出し処理：再開
	 */
	$scope.restartCall = function() {

		// 呼び出しの遅延設定
		reserveCalling();
	};


	/**
	 * 画面遷移：設定ページ
	 */
	$scope.goSettingPage = function() {
		stopCall();
		ons.navigator.pushPage('settings.html');
	};



	/**
	 * イベント：設定変更後
	 */
	$rootScope.$on('eventRefreshScreen', function(event, data){
		$scope.backgroundImageSrc = data.imageUriHome;
	});


	// 初期化処理
	_init();
}]);
