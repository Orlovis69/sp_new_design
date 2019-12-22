<?php

include_once "mixplat.php";

$return_val = null;

//	Проверка необходимых параметров
if(empty($_REQUEST['phone']))  {
	echo json_encode(["error"=>"Нет телефона"]);
	return;
}
if(empty($_REQUEST['subscribe_id']))  {
	echo json_encode(["error"=>"Нет типа подписки"]);
	return ;
}


//	Выбор подписки
switch ($_REQUEST['subscribe_id']){

	case 1:
		$return_mixplat = mixplat::create_subscription_1($_REQUEST['phone']);
		break;

	case 2:
		$return_mixplat = mixplat::create_subscription_2($_REQUEST['phone']);
		break;

	case 3:
		$return_mixplat = mixplat::create_subscription_3($_REQUEST['phone']);
		break;
}

//$tt = mixplat::create_subscription_1("+79778997914");
// echo $return_mixplat;

echo json_encode($return_mixplat);

?>