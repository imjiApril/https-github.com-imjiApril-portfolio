
//document ready
$(function(){
  //네비게이션, 컨텐츠의 사이즈 체크
  $(window).resize(function(){
    resizing();
  }).resize();

  function resizing(){
    var contentsH=$('#contents').height();
    var sidenavW = $('#sidenav').width();
    $('#sidenav>div').width(sidenavW);
    $('#sidenav').height(contentsH);
  }

  //play/pause button's location
  //리스트의 수
  var itemLength = $('.carousel-indicators li').length-1;
  console.log(itemLength);
  //
  var olW = $('.carousel-indicators').width();
  console.log(olW);
  $('#slideImg button').css('margin-left', olW/2+5);
  $('#slideImg button').on('click',function(){
    //정지/재생 아이콘의 값을 누를 때마다 변경
    $(this).toggleClass('ion-pause ion-play');
    if($(this).hasClass('ion-play')){//일시정지
      $('#slideImg').carousel('pause');
    }else{//재생
      $('#slideImg').carousel('cycle');
    }
  })

  //profile 슬라이드 효과
  $(window).scroll(function(){
    $('#profile > div').each(function(index){
      var pos = $(this).offset().top;
      var winTop = $(window).scrollTop();
      if(pos < winTop + 600){
        if(index ==0){
          $(this).addClass('slide-left');
        }else{
          $(this).addClass('slide-right');
        }
      }
    })
  })
})
