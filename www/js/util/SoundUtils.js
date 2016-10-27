
app.factory('SoundUtils', ['$timeout', '$interval', function($timeout, $interval) {

	// ------------------------------------------
	// Private
	// ------------------------------------------

	var media         = null;
	var mediaInterval = null;
	var soundFile     = 'sounds/GetACall.mp3';

	var timer = null;
	var playPreAction = null;


	var onVibrate = false;


	/**
	 * ローカルパス取得処理
	 */
	var _getPath = function() {
		var str = location.pathname;
		var i = str.lastIndexOf('/');
		return str.substring(0, i+1);
	};


	/**
	 * 再生処理
	 *
	 * + 機能
	 *     - サウンド再生
	 *     - 振動
	 */
	var playAudio = function() {

		playPreAction();

		// サウンド準備
		media = new Media(
			_getPath() + soundFile,
			function() {
				//成功時のコールバック関数
			},
			function(error) {
				//失敗時のコールバック関数
				alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
			}
		);

		// 再生
		media.play({numberOfLoops:"infinite"});


		// 振動
		if(onVibrate == true) {
			mediaInterval = $interval(function(){
					navigator.notification.vibrate(800);
				},
				1000
			);
		}
	};


	/**
	 * 停止処理
	 *
	 * + 機能
	 *     - 振動停止
	 *     - サウンド停止
	 */
	var stopAudio =  function() {

		if(timer != null) {
			$timeout.cancel(timer);
		}

		// 振動停止
		if(mediaInterval != null) {
			$interval.cancel(mediaInterval);
			mediaInterval = null;
		}

		// サウンド停止
		if (media != null) {
			media.stop();
			media = null;
		}
	};


	var setCalling = function(preAction, delay_ms) {
		playPreAction = preAction;
		timer = $timeout(playAudio, delay_ms);
	};


	var setOnVibrate = function(prOnVibrate) {
		onVibrate = prOnVibrate;
	};

	// 返却
	return {
		stop      : stopAudio,		/** 停止処理 */
		setCalling: setCalling,
		setOnVibrate: setOnVibrate, /** 振動有効フラグ */
	};

}]);

