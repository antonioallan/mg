<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Converter
 *
 * @author gilmario
 */

namespace App\Util;

class Converter {

    public static function stringParaDouble($valor) {
        $valor = str_replace(".", "", $valor);
        $valor = str_replace(",", ".", $valor);
        return $valor;
    }

    public static function stringParaData($data) {
        if (strlen($data) === 10) {
            $dia = substr($data, 0, 2);
            $mes = substr($data, 3, 2);
            $ano = substr($data, 6, 4);
            $dataC = $ano . "-" . $mes . "-" . $dia;
            return $dataC;
        } else {
            return null;
        }
    }

    public static function colocaMascaraCPF($cpf) {
        return substr($cpf, 0, 3) . "." . substr($cpf, 3, 3) . "." . substr($cpf, 6, 3) . "-" . substr($cpf, 9, 2);
    }

    public static function colocaMascaraCNPJ($cnpj) {
        return substr($cnpj, 0, 2) . "." . substr($cnpj, 2, 3) . "." . substr($cnpj, 5, 3) . "/" . substr($cnpj, 8, 4) . "-" . substr($cnpj, 12, 14);
    }

    public static function colocaMascaraCEP($cep) {
        return substr($cep, 0, 2) . "." . substr($cep, 2, 3) . "-" . substr($cep, 5, 3);
    }

    public static function colocaMascaraInscricao($insc) {
        return substr($insc, 0, 6) . "-" . substr($insc, 6, 7);
    }

    public static function colocaMascaraCartografia($carto) {
        return substr($carto, 0, 2) . "." . substr($carto, 2, 2) . "." . substr($carto, 4, 3) . "." . substr($carto, 7, 4) . "." . substr($carto, 11, 3);
    }

    public static function doubleParaString($valor) {
        return number_format($valor, 2, ',', '.');
    }

    public static function doubleParaStringReal($valor) {
        return "R$ " . number_format($valor, 2, ',', '.');
    }

    public static function dataParaString($data) {
        $arrayData = explode('-', $data);
        krsort($arrayData);
        $dataC = implode('/', $arrayData);
        return $dataC;
    }

    public static function dataTimeParaString($dataTime) {
        $data = self::dataParaString(substr($dataTime, 0, 10));
        return $data; //. ' ' . substr($dataTime, 10);
    }

    public static function mesExtenco($num) {
        $meses = array(1 => "Janeiro", 2 => "Fevereiro", 3 => "Março", 4 => "Abril", 5 => "Maio", 6 => "Junho", 7 => "Julho", 8 => "Agosto", 9 => "Setembro", 10 => "Outubro", 11 => "Novembro", 12 => "Dezembro");
        return $meses[$num];
    }

    public static function trataMascara($campo) {
        if (strlen($campo) > 0) {
            $campo = str_replace(".", "", $campo);
            $campo = str_replace(".", "", $campo);
            $campo = str_replace(".", "", $campo);
            $campo = str_replace(".", "", $campo);
            $campo = str_replace("(", "", $campo);
            $campo = str_replace(")", "", $campo);
            $campo = str_replace(" ", "", $campo);
            $campo = str_replace(" ", "", $campo);
            $campo = str_replace(" ", "", $campo);
            $campo = str_replace(" ", "", $campo);
            $campo = str_replace(" ", "", $campo);
            $campo = str_replace(" ", "", $campo);
            $campo = str_replace("/", "", $campo);
            $campo = str_replace("-", "", $campo);
        }
        return $campo;
    }

    public static function removeMascaraDinheiro($array) {
        foreach ($array as $key => $value) {
                if(floatval($value) || $value == "0,00"){
                    $array[$key] = self::stringParaDouble($value);
                } 
        }
        return $array;
    }

}
