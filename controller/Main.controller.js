sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("brasileirao.controller.Main", {
            onInit: function () {

            // DADOS PREENCHIDOS COM OS ARQUIVOS PARTIDAS E TABELA 
            // var dadosGerais = {
            // nomeCampeonato : "Brasileirão 2023 - canal FioriNET",
            // rodada : 99  
            // };
            
            // var dadosModel = new JSONModel();
            // dadosModel.setData(dadosGerais);
            // var tela = this.getView();
            // tela.setModel(dadosModel, "ModeloDadosGerais")

            // NOVOS OBJETOS PARA OS DADOS DO CAMPEONATO, CLASSIFICAÇÃO E PARTIDAS
            var dadosGerais = {};
            var classificacao = {};
            var partidas = {};

            // MODELOS NOVOS
            var dadosModel = new JSONModel();
            var classificacaoModel = new JSONModel();
            var partidasModel = new JSONModel();

            //COLOCAR OS DADOS DAS VARIÁVEIS OBJETOS DENTRO DOS MODELOS NOVOS
            dadosModel.setData(dadosGerais);
            classificacaoModel.setData(classificacao);
            partidasModel.setData(partidas);

            //ATRIBUIR MODELOS NA TELA (VIEW)
            var tela = this.getView();
            tela.setModel(dadosModel, "ModeloDadosGerais");
            tela.setModel(classificacaoModel, "ModeloTabela");
            tela.setModel(partidasModel, "ModeloPartidas")


            //CHAMADA DA FUNÇÃO
            this.onBuscarClassificacao();
            this.onBuscarDadosGerais();
            },

            onBuscarClassificacao: function(){
                var oModeleloTabela = this.getView().getModel("ModeloTabela");
                //PARÂMETROS DA API FUTEBOL
                var configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    method : "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                    "Authorization" : "Bearer test_8c8427a1b37da75f78ac9155286121"
                }
                };

                //CHAMADA DA API FUTEBOL USANDO AJAX
                $.ajax(configuracoes).done(
                  function(response){
                   //MUDAR OS DADOS DO MODEL
                   oModeleloTabela.setData(
                    {
                       "Classificacao" : response
                    }
                   );
                  }.bind(this)
                )
        
            },

            onBuscarDadosGerais: function(){
                var oModeloDadosGerais = this.getView().getModel("ModeloDadosGerais"); 
 
                //PARÂMETROS DA API FUTEBOL
                var configuracoes = {
                 url : "https://api.api-futebol.com.br/v1/campeonatos/10",
                 method : "GET",
                 async : true,
                 crossDomain : true,
                 headers : {
                     "Authorization": "Bearer test_8c8427a1b37da75f78ac9155286121"
                 }
                };
                
                //CHAMADA DA API FUTEBOL USANDO AJAX
                $.ajax(configuracoes).done(
                 function(response){
                     
                //MUDAR OS DADOS DO MODEL
                   oModeloDadosGerais.setData(response);
                     var rodadaAtual = response.rodada_atual.rodada;
                     this.onBuscarPartidas(rodadaAtual);
                 }.bind(this)
                )
 
             },
             onBuscarPartidas: function(rodadaAtual){
                var oModeloPartidas = this.getView().getModel("ModeloPartidas"); 
 
                //PARÂMETROS DA API FUTEBOL
                var configuracoes = {
                 url : "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodadaAtual,
                 method : "GET",
                 async : true,
                 crossDomain : true,
                 headers : {
                     "Authorization": "Bearer test_8c8427a1b37da75f78ac9155286121"
                 }
                };
                debugger
                //CHAMADA DA API FUTEBOL USANDO AJAX
                $.ajax(configuracoes).done(
                 function(response){
                     debugger
                   //MUDAR OS DADOS DO MODEL
                   oModeloPartidas.setData(response);
                 }.bind(this)
                )
 
             }

        });
    });