<?php

namespace App\Models;

use jaspion\Interfaces\Security\UserInterface;
use App\Models\ModelCharset;
/**
 * Description of Usuario
 *
 * @author gilmario
 */
class Usuario extends ModelCharset implements UserInterface {

    private $token;

    /**
     *
     * @formName=prestador_emissor
     * @columnDb=CODIGO
     */
    protected $emissor;

    /**
     *
     * @formName=prestador_contibuinte
     * @columnDb=CODCONTRIBUINTE
     */
    protected $codContribuinte;

    /**
     *
     * @formName=prestador_cnpj
     * @columnDb=CNPJ
     */
    protected $cnpj;

    /**
     *
     * @formName=prestador_senha
     * @columnDb=SENHA
     */
    protected $senha;

    /**
     *
     * @formName=pretador_razao
     * @columnDb=RAZAOSOCIAL
     */
    protected $razao;

    /**
     *
     * @formName=pretador_nome
     * @columnDb=NOME
     */
    protected $nome;

    /**
     *
     * @formName=pretador_inscricao
     * @columnDb=INSCRMUNICIPAL
     */
    protected $inscricao;

    /**
     *
     * @formName=prestador_logradouro
     * @columnDb=LOGRADOURO
     */
    protected $logradouro;

    /**
     *
     * @formName=prestador_numero
     * @columnDb=NUMERO
     */
    protected $numero;

    /**
     *
     * @formName=prestador_complemento
     * @columnDb=COMPLEMENTO
     */
    protected $complemento;

    /**
     *
     * @formName=prestador_bairro
     * @columnDb=BAIRRO
     */
    protected $bairro;

    /**
     *
     * @formName=prestador_municipio
     * @columnDb=MUNICIPIO
     */
    protected $municipio;

    /**
     *
     * @formName=prestador_uf
     * @columnDb=UF
     */
    protected $uf;

    /**
     *
     * @formName=prestador_cep
     * @columnDb=CEP
     */
    protected $cep;

    /**
     *
     * @formName=tipo_declaracao
     * @columnDb=CODTIPODECLARACAO
     */
    protected $tipoDeclaracao;
    
    /**
     *
     * @formName=aliquota_ns
     * @columnDb=ALIQUOTASN
     */
    protected $aliquotaSimples;
    
   /**
     *
     * @formName=aterar_aliquota_ns
     * @columnDb=ALTALIQUOTASN
     */
    protected $mesAnoAlteracaoAliqSimples;
    

    function __construct() {
        $this->gerarToken();
    }

    public function getEmissor() {
        return $this->emissor;
    }

    public function getCodContribuinte() {
        return $this->codContribuinte;
    }

    public function getCnpj() {
        return $this->cnpj;
    }

    public function getSenha() {
        return $this->senha;
    }

    public function getRazao() {
        return $this->razao;
    }

    public function getNome() {
        return $this->nome;
    }

    public function getInscricao() {
        return \App\Util\Converter::colocaMascaraInscricao($this->inscricao);
    }

    public function getLogradouro() {
        return $this->logradouro;
    }

    public function getNumero() {
        return $this->numero;
    }

    public function getComplemento() {
        return $this->complemento;
    }

    public function getBairro() {
        return $this->bairro;
    }

    public function getMunicipio() {
        return $this->municipio;
    }

    public function getUf() {
        return $this->uf;
    }

    public function getCep() {
        return $this->cep;
    }
    
    public function getAliquotaSimples() {
        return floatval($this->aliquotaSimples);
    }
    
    public function getMesAnoAlteracaoAliqSimples() {
        return $this->mesAnoAlteracaoAliqSimples;
    }
    
    public function setEmissor($emissor) {
        $this->emissor = $emissor;
    }

    public function setCodContribuinte($codContribuinte) {
        $this->codContribuinte = $codContribuinte;
    }

    public function setCnpj($cnpj) {
        $this->cnpj = \App\Util\Converter::trataMascara($cnpj);
    }

    public function setSenha($senha) {
        $this->senha = md5($senha);
    }

    public function setRazao($razao) {
        $this->razao = $razao;
    }

    public function setNome($nome) {
        $this->nome = $nome;
    }

    public function setInscricao($inscricao) {
        $this->inscricao = \App\Util\Converter::trataMascara($inscricao);
    }

    public function setLogradouro($logradouro) {
        $this->logradouro = $logradouro;
    }

    public function setNumero($numero) {
        $this->numero = $numero;
    }

    public function setComplemento($complemento) {
        $this->complemento = $complemento;
    }

    public function setBairro($bairro) {
        $this->bairro = $bairro;
    }

    public function setMunicipio($municipio) {
        $this->municipio = $municipio;
    }

    public function setUf($uf) {
        $this->uf = $uf;
    }

    public function setCep($cep) {
        $this->cep = $cep;
    }

    public function getRole() {
        return "ROLE_USER";
    }

    public function gerarToken() {
        $this->token = uniqid();
    }

    public function getToken() {
        return $this->token;
    }

    public function getTipoDeclaracao() {
        return $this->tipoDeclaracao;
    }

    public function setTipoDeclaracao($tipoDeclaracao) {
        $this->tipoDeclaracao = $tipoDeclaracao;
    }
    
    public function setAliquotaSimples($aliquotaSimples) {
        $this->aliquotaSimples = $aliquotaSimples;
    }
    
    public function setMesAnoAlteracaoAliqSimples($mesAnoAlteracaoAliqSimples) {
        $this->mesAnoAlteracaoAliqSimples = $mesAnoAlteracaoAliqSimples;
    }

}
