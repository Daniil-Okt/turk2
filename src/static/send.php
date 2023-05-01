<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['tel'];
$text = $_POST['text'];
$option = $_POST['nights'];
$option2 = $_POST['nights2'];


// Формирование самого письма
$title = "Pegas Турция";
$body = "
<h2>Заявка с сайта</h2>
<b>Имя:</b> $name<br>
<b>Телефон:</b> $phone<br>
<b>Пожелания:</b> $text<br>
<b>Количество ночей:</b> $option<br>
<b>Количество ночей:</b> $option2<br><br>
";
// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    $mail->Host       = 'mailbe05.hoster.by'; 
    $mail->Username   = 'postmaster@web-divingstudio.by'; 
    $mail->Password   = 'Vitaly97';
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('postmaster@web-divingstudio.by', 'Pegas'); 
    // Получатель письма
    $mail->addAddress('danikoktysyk@gmail.com');  

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);