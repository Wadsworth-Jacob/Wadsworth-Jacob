      
       var states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut'
                    ,'Deleware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas'
                    ,'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota'
                    ,'Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey'
                    ,'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon'
                    ,'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas'
                    ,'Utah', 'Vermont', 'Virginia', 'Washington', 'Washington D.C.', 'West Virginia', 'Wisconsin'
                    ,'Wyoming'];
       var stateCdes = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS'
                       ,'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','HJ','NM','NY'
                       ,'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','DC','WV'
                       ,'WI','WY'];

        function crtStSlctr(){
         /*   var optnTxt = '';
            for(i=0; i < 51; i++){
            optnTxt += '<option value="' + stateCdes[i] + '">' + states[i] + '<option>'
            };
            document.getElementById('slctStates').innerHTML = optnTxt;*/

            var a = document.getElementById('slctStates');
            for (i=0; i<51; i++){
                
                var option = document.createElement("option");
                option.text = states[i];
                option.value = stateCdes[i];
                a.add(option);

            };
        };

            function loadInfo(){
            var cde = document.getElementById("slctStates").value;
            var parksURL = 'https://developer.nps.gov/api/v1/parks?stateCode=' 
                          +  cde
                          + '&fields=images&api_key=DoggIuLI6iLdqIkFcxYslNODaJVXYkoijNfvfLbB';
          //  document.getElementById("test").innerHTML = parksURL;
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", parksURL, true);
            xhttp.send();

            xhttp.onload = function () {
            var parks = JSON.parse(xhttp.response);
             console.log(parks);
             var parksString = JSON.stringify(xhttp.response);

            var finalTxt = '';
         
            for (var i = 0; i < parks.total; i++){
          
             
          if (parks.data[i].images[0] == undefined){
              var parkPic = '';
          } else {
            var parkPic = '<img class="parkPic" src="' + parks.data[i].images[0].url + '" alt = "pic"><br><br>'; 
          };
          if (parks.data[i].directionsInfo == ""){var directions = 'No diretions included for this park.'
          } else {
            var directions = parks.data[i].directionsInfo;
          };

         finalTxt += '<p class="cdePrgrph"><b><u><a href="' + parks.data[i].url + '">'+ parks.data[i].fullName + '</a></u></b><br><br>'
                   
                   + '<b>Description: </b>' + parks.data[i].description + '<br><br>'
                   + '<b>Directions: </b>' + directions + '<br><br></p>'
                   + parkPic;
        };
        document.getElementById("nationalParks").innerHTML = finalTxt;
    };


};