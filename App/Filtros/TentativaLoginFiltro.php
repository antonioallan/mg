<?php

namespace App\Filtros;

/**
 * Description of UsuarioFiltro
 *
 * @author gilmario
 */
class TentativaLoginFiltro implements \jaspion\Interfaces\Filtro\Filtro {

    public function erro($controlle = null, $acao = null, $parametro = null) {
        $controle = new \App\Controllers\UsuarioController();
        // Desabilitar o usuario aqui
        $controle->render("bloqueio");
    }

    public function filtrar($controlle = null, $acao = null, $parametro = null) {
        if (isset($_POST['cpf'])) {
            if (!isset($_SESSION[$_POST['cpf']])) {
                $_SESSION[$_POST['cpf']] = 1;
            } else {
                $_SESSION[$_POST['cpf']] = $_SESSION[$_POST['cpf']] + 1;
            }
            $t = $_SESSION[$_POST['cpf']];
            return $_SESSION[$_POST['cpf']] <= 5;
        } else {
            return true;
        }
    }

}
