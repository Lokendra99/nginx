var hiding_box=function(){
  document.getElementById('hiding').style.display="none";
};

(function() {

  var app = angular.module('game0fThrones', ["ngRoute","ngSanitize"]);
  app.controller('gotController', ('$http','$scope', function($scope, $http) {
    var match = this;
    match.combined_arr=[];

    match.slct = function() {

      if($scope.mydata==='books'){

        document.getElementById('hose').style.display='none';
        document.getElementById('chart').style.display='none';
        document.getElementById('boks').style.display='block';

          $http({
              method : "GET",
              url : 'http://anapioficeandfire.com/api/books?pageSize=20'

          }).then(function(response_books) {
              console.log(response_books);
              match.netdata_books=response_books.data;
          })

      }
      if($scope.mydata==='characters'){
          document.getElementById('boks').style.display='none';
          document.getElementById('hose').style.display='none';
          document.getElementById('chart').style.display='block';
          $http({
              method : "GET",
              url : 'http://anapioficeandfire.com/api/characters?&pageSize=10'

          }).then(function(response_characters) {
              console.log(response_characters);
              match.netdata_characters=response_characters.data;
          })
      }
      if($scope.mydata==='houses'){
          document.getElementById('boks').style.display='none';
          document.getElementById('chart').style.display='none';
          document.getElementById('hose').style.display='block';
          $http({

              method : "GET",
              url : 'http://anapioficeandfire.com/api/houses?&pageSize=10'

          }).then(function(response_houses) {
              console.log(response_houses);
              match.netdata_houses=response_houses.data;
          })
      }

    }


  }));
  app.controller('ctrl2',function ($http,$routeParams) {
      var match1=this;
      match1.limiting_value=8;
      $http({
          method : "GET",
          url : 'http://anapioficeandfire.com/api/books?&pageSize=20'

      }).then(function(response_book) {
          match1.netdata_book_detail=response_book.data;
      });

      match1.which_book=$routeParams.bookID;


  });
    app.controller('ctrl3',function ($http,$routeParams) {
        var match3=this;
        match3.limiting_value=8;
        $http({
            method : "GET",
            url : 'http://anapioficeandfire.com/api/characters?&pageSize=10'

        }).then(function(character) {
            match3.netdata_characters=character.data;
        });

        match3.which_character=$routeParams.characterID;


    });
    app.controller('ctrl4',function ($http,$routeParams) {
        var match4=this;
        match4.limiting_value=8;
        $http({
            method : "GET",
            url : 'http://anapioficeandfire.com/api/houses?&pageSize=10'

        }).then(function(house) {
            match4.netdata_houses=house.data;
            console.log(match4.netdata_houses[match4.which_house].coatOfArms);
        });

        match4.which_house=$routeParams.houseID;


    });
    app.filter('changing_empty_space_to_Unknown',function(){
        return function (input) {
            if(input===""){
               var input1= input.replace("","Not available");
                return input1;
            }
            else{
                return input;
            }

        }

    });


  app.directive('booksDetail', function() {
    return {
      restrict: 'E',
      templateUrl: 'books-detail.html',
      link:function(scope,element,attribute){
        element.css({
          backgroundColor:'rgba(249, 211, 150, 0.46)',
          color:'black',
        })
      }

    }
  });
  app.directive('charactersDetail', function() {
    return {
      restrict: 'E',
      templateUrl: 'characters-detail.html',
      link:function(scope,element,attribute){
        element.css({
           backgroundColor:'rgba(131, 248, 128, 0.63)',
          //color:'black'
        })
      }
    }
  });
  app.directive('housesDetail', function() {
    return {
      restrict: 'E',
      templateUrl: 'houses-detail.html',
      link:function(scope,element,attribute){
        element.css({
           backgroundColor:'rgba(144, 144, 144, 0.57)',
          color:'black'
        })
      }
    }
  })
    app.config(function($routeProvider) {
        $routeProvider
            .when("/GOT", {
                templateUrl : "GOT.html",
                controller : "gotController",
                controllerAs : "gotCtrl"
            })
            .when("/book/:bookID", {
                templateUrl : "book.html",
                controller : "ctrl2",
                controllerAs:'ct'
            })
            .when("/character/:characterID", {
                templateUrl : "characters.html",
                controller : "ctrl3",
                controllerAs:'ct3'
            })
            .when("/house/:houseID", {
                templateUrl : "houses.html",
                controller : "ctrl4",
                controllerAs:'ct4'
            })


    });



})();
