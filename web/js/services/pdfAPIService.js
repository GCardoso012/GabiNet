var app = angular.module('gabiNet');

app.factory("pdf", function ($scope) {

    $scope.order = {};
    $scope.order.showPopupAddedToCart = false;


    $scope.HtmlData = "<b>Hi Roadid. </b>";

    $scope.click = function () {
        //    console.log("button clicked");
        //  $scope.order.showPopupAddedToCart = !$scope.order.showPopupAddedToCart;
        var doc = new jsPDF();
        doc.text(20, 20, 'Hello world!');
        doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
        doc.addPage();
        doc.text(20, 20, 'Do you like that?');

        // Save the PDF
        doc.save('Test.pdf');
    };

    $scope.HTMLclick = function () {

        console.log("starting HTMLclick");
        var pdf = new jsPDF('p', 'pt', 'letter');

        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.

        var source = $scope.HtmlData;

        // we support special element handlers. Register them with jQuery-style 
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors 
        // (class, of compound) at this time.

        var specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '#bypassme': function (element, renderer) {
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
                function (dispose) {
                    // dispose: object with X, Y of the last line add to the PDF 
                    //          this allow the insertion of new lines after html

                    //Didn't work
                    //   console.log("Saving HTMLclick");
                    // pdf.save('Test.pdf');
                },
                margins
                );

        console.log("after from HTML.");
        pdf.save('Test.pdf');

    };

});