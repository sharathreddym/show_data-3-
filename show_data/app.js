$(document).ready(function() {

  $('.btn-primary').click(function() {
    $('.spinner').show();
    $('#content').text('');
    $('#colors').text('');
    
    var line = $('textarea').val();
    var datas = JSON.stringify({"title": line});
    
    // $('#user-para').html(line);
    var colors_arr = [];
    $.ajax({
      url: "http://localhost:8080/book",
      type: "POST",
      data: datas,
      dataType: "json",
      processData: false,
      contentType: "application/json",
      success: function (data) {
        $('.spinner').hide();
        var unique_languages = [];
        data.forEach((element) => {
          unique_languages.push(element[1]);
        });
        
        var uniqueArray = [...new Set(unique_languages)];
        uniqueArray.forEach((ele) => {
          if(ele != 'O') {
            var color = randomColor({ luminosity: 'dark'});
            var obj = {};
            obj[ele] = color;
            colors_arr.push(obj);
          }
        })
        colors_arr.push({O: '#fff'});
        // console.log(colors_arr);
        
        data.forEach(element => {
          var color_obj = colors_arr.find(function (obj) { return obj[element[1]] });
          b = Object.values(color_obj)
          var color = b[0]
          
          $('#content').append(`<span style='background-color: ${color}${color != "#fff" ? ";color:#fff" : ""}'> ${element[0]} </span>`);
        })

        var colo = colors_arr.filter(function (obj) {
          return obj.O != '#fff';
        });


        colo.forEach(obj => {
         for (var key in obj) {
           if (obj.hasOwnProperty(key)) {
             $('#colors').append(`<p>${key}<span class="box" style="background:${obj[key]}"}></span></p>`)
           }
         }
       })
        
      }


    })
  });

 
  
  $('.btn-danger').click(function () {
    $('textarea').val('');
    $('#content').text('');
    $('#colors').text('');
  });
  
  
});


// $.each(json, function (key, value) {
//   if(value != 'O') {
//     value = '<span class="red">' + value + '</span>';
//   }
//   $('#content').append('<b>' + key + '</b>: ' + value + ' | ');
// }); 

