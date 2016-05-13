var app = angular.module("gabiNet");

app.controller("atividadesCtrl", function ($scope, atividadeAPI, atividades, $route) {
    $scope.atividades = atividades.data;

    $scope.excluiAtividade = function (id) {
        if (confirm("Confirma a exclusão da Atividade?")) {
            atividadeAPI.deleteAtividade(id)
            .success(function () {
                $route.reload();
            });  
        }
    };
});

app.controller("novaAtividadeCtrl", function ($scope, atividadeAPI, $location) {
    $scope.novaAtividade = function (atividade) {
        atividadeAPI.novaAtividade(atividade)
                .success(function () {
                    delete $scope.atividade;
                    $scope.AtividadeForm.$setPristine();
                    $location.path("/atividades");
                });
    };
});

app.controller("atividadeCtrl", function ($scope, atividade, atividadeAPI, $location) {
    $scope.atividade = atividade.data;
         
    $scope.gerarPdf = function() {
        console.log("starting HTMLclick");
      var pdf = new jsPDF('p', 'pt', 'letter');

      // source can be HTML-formatted string, or a reference
      // to an actual DOM element from which the text will be scraped.

      var source = $("#render").get(0);

      // we support special element handlers. Register them with jQuery-style 
      // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
      // There is no support for any other type of selectors 
      // (class, of compound) at this time.

      var specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function(element, renderer) {
          // true = "handled elsewhere, bypass text extraction"
          return true;
        }
      };

      var margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
      };

      console.log("Building  HTML" + source);
      // all coords and widths are in jsPDF instance's declared units
      // 'inches' in this case
      pdf.fromHTML(
        source // HTML string or DOM elem ref.
        , margins.left // x coord
        , margins.top // y coord
        , {
          'width': margins.width // max width of content on PDF
          ,
          'elementHandlers': specialElementHandlers
        },
        function(dispose) {
          // dispose: object with X, Y of the last line add to the PDF 
          //          this allow the insertion of new lines after html
          
          //Didn't work
          //   console.log("Saving HTMLclick");
          
        },
        margins
      );
      pdf.save('Test.pdf');
        console.log("after from HTML.");
           
    };
    
    $scope.alterarAtividade = function (atividade) {
        atividadeAPI.setAtividade(atividade)
                .success(function () {
                    $location.path("/atividades");
                });
    };
});