<?php



/////////////////////////////////////////////
///  https://mixplat.ru/mixplat_subscriptions.pdf
//  $user_phone - Номер телефона абонента в международном формате без символа"+"
//  $profile_id - ID профиля подписки.
//	$merchant_subscription_id - ID подписки в системе ТСП.
class mixplat{
/////////////////////////////////////////////

	//	PROJECT API KEY
	static $api_key = "f5c8f28b707138e37483ee529f3f9cd81910bac3";

	//	Ссылка для создания подписки
	static $url_create_subscription = "https://api.mixplat.com/create_subscription";



	//============================================
	// subscription 1 - Полная защита телефона (simpleprotect.ru),
	static function create_subscription_1($user_phone){
		//============================================
		if(empty($user_phone)) return null;

		$profile_id = "10223";
		$merchant_subscription_id = "326787";

		$result = self::create_subscription($user_phone,$profile_id,$merchant_subscription_id);
		return $result;
	}
	//============================================


	//============================================
	// subscription 2 - Защита телефона 
	static function create_subscription_2($user_phone){
		//============================================
		if(empty($user_phone)) return null;

		$profile_id = "10224";
		$merchant_subscription_id = "326786";

		$result = self::create_subscription($user_phone,$profile_id,$merchant_subscription_id);
		return $result;
	}
	//============================================


	//============================================
	// subscription 3 - Продленная гарантия 
	static function create_subscription_3($user_phone){
		//============================================
		if(empty($user_phone)) return null;

		$profile_id = "10186";
		$merchant_subscription_id = "325927";

		$result = self::create_subscription($user_phone,$profile_id,$merchant_subscription_id);
		return $result;
	}
	//============================================


	//============================================
	static function create_subscription($user_phone,$profile_id,$merchant_subscription_id){
		//============================================
		if(empty($user_phone)) return null;
		if(empty($profile_id)) return null;
		if(empty($merchant_subscription_id)) return null;

		//	Phone check
		$user_phone = self::phone_normalize_rus($user_phone);
		if(empty($user_phone)) return ["error"=>"Номер не корректен"];


		//	Уникальный идентификатор запроса, обеспечивающий
		// идемпотентность вызовов (повторные запросы с тем же request_id
		//не будут приводить к созданию новой подписки, а параметры ответа
		//будут полностью повторять параметры ответа первоначального
		//вызова с данным request_id).
		$request_id = md5($user_phone.$merchant_subscription_id."1");
		//	Подпись запроса. Формируется как md5(profile_id + user_phone +merchant_subscription_id + PROJECT_API_KEY). Если нет merchant_subscription_id тут его тоже не надо
		$signature = md5($profile_id.$user_phone.self::$api_key);


		$post_fields = [
			"api_version"=>3,

			"request_id "=>$request_id ,
			"profile_id"=>$profile_id,
			"user_phone"=>$user_phone,
			/*"merchant_subscription_id"=>$merchant_subscription_id,*/
			"signature"=>$signature,

			"merchant_data"=>"v2.0" /*Произвольные данные ТСП, связанные с подпиской.*/
		];


		//	CREATE CURL SEND
		$curl_out = self::curl_create(self::$url_create_subscription,$post_fields);
    
		//	Получилось подписаться
		if(!empty($curl_out['result']) && ($curl_out['result']=='ok')) {
			return ['ok' => 1, "Подписались"];
		} else {
      //	Возвращаем все ошибки
			if(!empty($curl_out['error_description'])) 
      return ["error"=>$curl_out['error_description']];
      
		}	
		// echo 'Error';
		return ['error'=>"Не подписались, попробуйте снова"];
	}
	//============================================



	//============================================
	static function curl_create($url,$post_fields){
		//============================================
		if(empty($url)) return null;
		if(empty($post_fields)) return null;

		$ch = curl_init();
		$options = [
			CURLOPT_URL => $url,
			CURLOPT_POST => 1,
			CURLOPT_POSTFIELDS => json_encode($post_fields),
			CURLOPT_RETURNTRANSFER => true
		];
		curl_setopt_array($ch, $options);
		$output = curl_exec($ch);

		$out_arr = "";
		if(!empty($output)) $out_arr = json_decode($output,true);

		return $out_arr;
	}
	//============================================



	//============================================
	// Номер телефона абонента в международном формате без символа"+"
	static function phone_normalize_rus($user_phone){
		//============================================
		if(empty($user_phone)) return null;

		//	Убираем все знаки
    $phone = preg_replace("/[^0-9]/", "", $user_phone);

		if(strlen($phone) < 10) return ["error" => "Слишком короткий номер"];

		//	Убираем все возможные цифры слева.
		$phone = substr($phone, -10);
		$phone_rus = "7".$phone;

		return $phone_rus;
	}
	//============================================
}
/////////////////////////////////////////////

?>