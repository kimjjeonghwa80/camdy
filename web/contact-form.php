<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once '../phpmailer/PHPMailerAutoload.php';


define('SENDTO','salman@camdy.photo');
define('SMTPUSER', 'salman@camdy.photo'); // sec. smtp username
define('SMTPPWD', 'gengmalay86'); // sec. password
define('SMTPSERVER', 'smtp.zoho.com'); // sec. smtp server
define('SETFROMMAIL', 'salman@camdy.photo'); // sec. smtp server
define('SETFROMMAILNAME', 'CAMDY WEBSITE ENQUIRY'); // sec. smtp server
define('PORT', '587'); // sec. smtp server


if (isset($_POST['inputName']) && isset($_POST['inputEmail']) && isset($_POST['inputSubject']) && isset($_POST['inputMessage'])) {

    //check if any of the inputs are empty
    if (empty($_POST['inputName']) || empty($_POST['inputEmail']) || empty($_POST['inputSubject']) || empty($_POST['inputMessage'])) {
        $data = array('success' => false, 'message' => 'Please fill up the form');
        echo json_encode($data);
        exit;
    }


    //create an instance of PHPMailer
    $mail = new PHPMailer();

    $mail->isSMTP();                                      
    $mail->Host =SMTPSERVER;                       
    $mail->SMTPAuth = true;  
    $mail->CharSet = 'UTF-8';                              
    $mail->Username = SMTPUSER;                   
    $mail->Password = SMTPPWD;            
    $mail->SMTPSecure = 'tls';                            
    $mail->Port = PORT;                                        
    $mail->setFrom(SETFROMMAIL,SETFROMMAILNAME);      
    $mail->WordWrap = 50;                            


   // $mail->From = $_POST['inputEmail'];
  // $mail->FromName = $_POST['inputName'];
    $mail->AddAddress(SENDTO); //recipient 
    $mail->Subject = $_POST['inputSubject'];
    $mail->Body = "Name: " . $_POST['inputName'] 
                . "\r\n\r\nEmail: " . $_POST['inputEmail']
                . "\r\n\r\nMessage: " . stripslashes($_POST['inputMessage']);

    if (isset($_POST['ref'])) {
        $mail->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    }

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Error sending problem. Please report to us info@camdy.photo ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Message succesfully sent');
    echo json_encode($data);

} else {

    $data = array('success' => false, 'message' => 'Message Unsuccessful.  Please report to us info@camdy.photo ');
    echo json_encode($data);

}