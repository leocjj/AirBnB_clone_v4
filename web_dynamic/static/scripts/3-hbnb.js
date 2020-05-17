let checked = {};
$(document).ready(function () {
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      checked[$(this).data('id')] = $(this).data('name');
    } else {
      delete checked[$(this).data('id')];
    }
    $('div.amenities h4').html(function () {
      let amenities = [];
      Object.keys(checked).forEach(function (key) {
        amenities.push(checked[key]);
      });
      if (amenities.length === 0) {
        return ('&nbsp');
      }
      return (amenities.join(', '));
    });
  });
});

$.get('http://374566e96a79.19.hbtn-cod.io:37218/api/v1/status/', function (data, status) {
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});

/*$.post('http://05c25b3efdc0.19.hbtn-cod.io:37166/api/v1/places_search/', 
  { },
  function (data, status) {
     console.log('estado '+status);
    for (let i of data) {
$('.places').append('<article> <div class="title"> <h2>' + i.name + '</h2><div class="price_by_night">' + '$' + i.price_by_night + '</div></div> <div class="information"> <div class="max_guest"> <i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + i.max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + i.number_rooms + ' Bedrooms </div> <div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + i.number_bathrooms + ' Bathroom  </div></div> <div class="user"></div><div class="description">' + i.description + '</div></article>');
    }
},"json");*/

$.ajax({
  type: 'POST',
  url: 'http://374566e96a79.19.hbtn-cod.io:37218/api/v1/places_search/',
  contentType: 'application/json',
  data: '{}',
  success: function (data) {
    for (let currentPlace of data) {
     // $('.places').append('<article> <div class="price_title"> <h2>' + currentPlace.name + '</h2><div class="price_by_night">' + '$' + currentPlace.price_by_night + '</div></div> <div class="information"> <div class="max_guest"> <i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + currentPlace.max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_rooms + ' Bedrooms </div> <div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + currentPlace.number_bathrooms + ' Bathroom  </div></div> <div class="user"></div><div class="description">' + currentPlace.description + '</div></article>');

        $('.places .articles').append('<ARTICLE> <DIV class="price_title"> <DIV class="article_title"> <H2>' + currentPlace.name + '</H2> </DIV> <DIV class="price_by_night"> <DIV class="price"> $' + currentPlace.price_by_night + '</DIV></DIV></DIV><DIV class="information"><DIV class="max_guest"> <DIV class="guest_icon"></DIV><DIV class="guest_number"> <H2>'+currentPlace.max_guest + ' Guest</H2> </DIV> </DIV> <DIV class="number_rooms"> <DIV class="rooms_icon"> </DIV> <DIV class="rooms_number"> <H2>'+  currentPlace.number_rooms + ' Room</H2> </DIV> </DIV> <DIV class="number_bathrooms"> <DIV class="bathrooms_icon"> </DIV> <DIV class="bathrooms_number"> <H2>' + currentPlace.number_bathrooms + ' Bathroom</H2> </DIV> </DIV> </DIV> <DIV class="user"> <B>Owner: </B>{{ place.user.first_name }} {{ place.user.last_name }} </DIV> <DIV class="description">'+  currentPlace.description+' </DIV> </ARTICLE>');
    }
  }
});
