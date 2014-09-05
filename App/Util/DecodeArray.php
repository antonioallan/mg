<?php

namespace App\Util;

/**
 * Description of DecodeArray
 *
 * @author gilmario
 */
class DecodeArray {

    public static function decodeArray($array) {
        $return = array();
        foreach ($array as $key => $value) {
            $return[$key] = utf8_decode($value);
        }
        return $return;
    }

    public static function encodeArray($array) {
        $return = array();
        foreach ($array as $key => $value) {
            $return[$key] = utf8_encode($value);
        }
        return $return;
    }

}
