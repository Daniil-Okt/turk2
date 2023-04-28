<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/Exception.php';
$mail = mew PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setFrom('infp@fls.guru', 'Фрилансер по жизни');
//кому отправить
$mail->addAddress('danikoktysyk@gmail.com', 'Фрилансер по жизни');
//тема письма
$maul->Subject = 'Привет!';

$body = ""

if(trim(!empty($_POST[ 'name' ]))) {
    $body.='<p><strong>Телефон:</strong> '.$_POST['tel'].'</p>';
}
if(trim(!empty($_POST[ 'email' ]))) {
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}

$mail->Bidy = $body

if(!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены';
}

$response = ['messege'=> $message];


header('Content-type: application/json');
echo json_encode($response);
?>