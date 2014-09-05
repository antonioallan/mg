<?php

namespace App\Controllers;

use jaspion\Controllers\Controller;

class InicioController extends Controller {

    
    public function __construct() {
        parent::__construct();
    }

    public function inicioAction() {
        $this->addScript('inicio/rss');
        $this->render('index');
    }
    
    public function xmlAction(){
        $this->simpleRender('xml');
    }

    public function erro400() {
        $this->render("erro400");
    }

    public function erro404() {
        $this->render("erro404");
    }

    public function erro500($ex = null) {
        $this->view->ex = $ex;
        $this->render("erro500");
    }

}
