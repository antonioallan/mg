<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Controllers;

use jaspion\Controllers\Controller;
use jaspion\Interfaces\Security\SecurityControllerInterface;

/**
 * Description of SecurityController
 *
 * @author allan
 */
class SecurityController extends Controller implements SecurityControllerInterface {

    //put your code here

    public function logarAction($msg = null, $controle = null, $acao = null, $parametro = null) {
        $this->addScript("captacha");
        if (!is_null($msg)) {
            $this->mensagem($msg, 1);
        }
        $this->view->controle = is_null($controle) ? "inicio" : $controle;
        $this->view->acao = is_null($acao) ? "inicio" : $acao;
        $this->view->parametro = is_array($parametro) ? implode("/", $parametro) : null;
        $this->render('login');
    }

    public function loginAction() {
        $security = \jaspion\Util\Security\Security::getSecurity();
        $controle = isset($_POST["_controle"]) ? $_POST["_controle"] : "inicio";
        $acao = isset($_POST["_acao"]) ? $_POST["_acao"] : "inicio";
        $parametro = isset($_POST["_parametro"]) ? $_POST["_parametro"] : null;
        if (isset($_POST["_username"]) && isset($_POST["_password"])) {
            if ($security->setUser($_POST["_username"], $_POST['_password'])) {
                \HttpResponse::redirect(DIR_ROOT . $controle . $acao . $parametro);
            } else {
                if (strpos($parametro, "/") === 0) {
                    $parametro = implode("/", $parametro);
                }
                $this->logarAction("Usuário Inválido", $controle, $acao, $parametro);
            }
        } else {
            $this->logarAction();
        }
    }

    public function logoutAction() {
        $register = new \jaspion\Util\RegistrySession();
        $register->unregisty();
        \HttpResponse::redirect(DIR_ROOT);
    }

    public function loginNfseAction($userpass) {
        $userpass = array_shift($userpass);
        $userpass = explode('|%=%=|', base64_decode($userpass));
        $username = base64_decode($userpass[0]);
        $password = base64_decode(base64_decode($userpass[1]));
        $security = \jaspion\Util\Security\Security::getSecurity();
        if (isset($username) && isset($password)) {
            if ($security->setUser($username, $password)) {
                \HttpResponse::redirect(DIR_ROOT . '/');
            } else {
                $this->logarAction("Usuário Inválido", null, null, null);
            }
        } else {
            $this->logarAction();
        }
    }

    public function erro($controlle = null, $acao = null, $parametro = null) {
        $this->logarAction($controlle = null, $acao = null, $parametro = null);
    }

    public function filtrar($controlle = null, $acao = null, $parametro = null) {
        $security = \jaspion\Util\Security\Security::getSecurity();
        return $security->isUser();
    }

    public function geraCapchaAction($teste = "") {
        $string = '';
        for ($i = 0; $i < 6; $i++) {
            $string .= chr(rand(97, 122));
        }
        $_SESSION['captcha'] = $string;
        $ret = array();
        $ret['texto'] = $string;
        echo \jaspion\Util\JSonUtil::criaJson($ret);
    }

    public function validaCaptchaAction() {
        if (isset($_REQUEST['code'])) {
            echo json_encode(strtolower($_REQUEST['code']) == strtolower($_SESSION['captcha']));
        } else {
            echo 0;
        }
    }

}
