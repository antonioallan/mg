<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Dao;

use jaspion\DAO\DAO;
use jaspion\Interfaces\Security\UserProviders;
use \App\Models\Usuario;
use App\Util\Converter;

/**
 * Description of UsuarioDAO
 *
 * @author allan
 */
class UsuarioDAO extends DAO implements UserProviders {

    public function __construct() {
        parent::__construct('Firebird', New Usuario(), 'cadastro');
    }

    public function getUser($username, $password) {
        $password = md5($password);
        $username = Converter::trataMascara($username);
        $sql = $this->executa("SELECT * FROM {$this->table} WHERE CNPJ = '{$username}' and SENHA = '{$password}'");
        $rs = $sql->fetch(\PDO::FETCH_ASSOC);
        if ($rs) {
            $this->model->popularBanco($rs);
            return $this->model;
        } else {
            return null;
        }
    }

    //  TIPO_DECLARACAO
}
