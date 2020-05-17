$(document).ready(function () {
  const amens = {};
  $('input:checkbox').click(function () {
    $(this).each(function () {
      if (this.checked) {
        amens[$(this).data('id')] = $(this).data('name');
      } else {
        delete amens[$(this).data('id')];
      }
    });
    if (Object.values(amens).length > 0) {
      $('.amenities h4').text(Object.values(amens).join(', '));
    } else {
      $('.amenities h4').html('&nbsp');
    }
  });

  /*  const users = {};
  $.getJSON('http://0.0.0.0:5001/api/v1/users', function (data) {
    for (const user of data) {
      users[user.id] = user.first_name + ' ' + user.last_name;
    }
  }); */

  // when the user check an amenity put into amenities div
  const checked = {};
  $(document).ready(function () {
    $('input:checkbox').change(function () {
      if ($(this).is(':checked')) {
        checked[$(this).data('id')] = $(this).data('name');
      } else {
        delete checked[$(this).data('id')];
      }
      $('div.amenities h4').html(function () {
        const amenities = [];
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

  // to get status to display signal light into web page

  $.get('http://374566e96a79.19.hbtn-cod.io:37218/api/v1/status/', function (data, status) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  // get places to display

  $.ajax({
    type: 'POST',
    url: 'http://374566e96a79.19.hbtn-cod.io:37218/api/v1/places_search/',
    contentType: 'application/json',
    dataType: 'json',
    data: '{}',
    success: function (data) {
      for (const currentPlace of data) {
        $('.places .articles').append('<ARTICLE> <DIV class="price_title"> <DIV class="article_title"> <H2>' + currentPlace.name + '</H2> </DIV> <DIV class="price_by_night"> <DIV class="price"> $' + currentPlace.price_by_night + '</DIV></DIV></DIV><DIV class="information"><DIV class="max_guest"> <DIV class="guest_icon"></DIV><DIV class="guest_number"> <H2>' + currentPlace.max_guest + ' Guest</H2> </DIV> </DIV> <DIV class="number_rooms"> <DIV class="rooms_icon"> </DIV> <DIV class="rooms_number"> <H2>' + currentPlace.number_rooms + ' Room</H2> </DIV> </DIV> <DIV class="number_bathrooms"> <DIV class="bathrooms_icon"> </DIV> <DIV class="bathrooms_number"> <H2>' + currentPlace.number_bathrooms + ' Bathroom</H2> </DIV> </DIV> </DIV> <DIV class="user"> <B>Owner: </B> ' + currentPlace.username + ' </DIV> <DIV class="description">' + currentPlace.description + ' </DIV> </ARTICLE>');
      }
    }
  });

  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://374566e96a79.19.hbtn-cod.io:37218/api/v1/places_search/',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ amenities: Object.keys(amens) }),
      success: function (data) {
        $('article').remove();
        for (const currentPlace of data) {
          $('.places .articles').append('<ARTICLE> <DIV class="price_title"> <DIV class="article_title"> <H2>' + currentPlace.name + '</H2> </DIV> <DIV class="price_by_night"> <DIV class="price"> $' + currentPlace.price_by_night + '</DIV></DIV></DIV><DIV class="information"><DIV class="max_guest"> <DIV class="guest_icon"></DIV><DIV class="guest_number"> <H2>' + currentPlace.max_guest + ' Guest</H2> </DIV> </DIV> <DIV class="number_rooms"> <DIV class="rooms_icon"> </DIV> <DIV class="rooms_number"> <H2>' + currentPlace.number_rooms + ' Room</H2> </DIV> </DIV> <DIV class="number_bathrooms"> <DIV class="bathrooms_icon"> </DIV> <DIV class="bathrooms_number"> <H2>' + currentPlace.number_bathrooms + ' Bathroom</H2> </DIV> </DIV> </DIV> <DIV class="user"> <B>Owner: </B> ' + currentPlace.username + ' </DIV> <DIV class="description">' + currentPlace.description + ' </DIV> </ARTICLE>');
          // $('section.places').append('<article><div class="title"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div><div class="information">' + '<div class="max_guest">' + '<i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place.max_guest + ' Guests</div>' + '<div class="number_rooms">' + '<i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place.number_rooms + ' Bedrooms</div>' + '<div class="number_bathrooms">' + '<i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place.number_bathrooms + 'Bathroom</div>' + '</div><div class="user"><strong>Owner: ' + `${users[place.user_id]}</strong></div>` + '<div class="description">' + place.description + '</div></article>');
        }
      }
    });
  });
});
