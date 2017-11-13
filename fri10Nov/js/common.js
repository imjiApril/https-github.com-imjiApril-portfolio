
//document ready
$(function(){
  //네비게이션, 컨텐츠의 사이즈 체크
  $(window).resize(function(){
    resizing();

    //모달창 스크롤바
    var height = $(window).height()-150;
    console.log('!!!!height: ' + height);
    $('#modal .modal-body').css({'height':height,'overflow':'auto'})
  }).resize();

  //메뉴 클릭시 부드럽게 스크롤 처리
  $('#sidenav h2 a, #sidenav .nav a, .goTop').on('click',function(event){

    if(this.hash!=''){
      event.preventDefault();
      var hash=this.hash;
      console.log(hash);
      $('html, body').animate({
        scrollTop:$(hash).offset().top
      },1000,function(){
        window.location.hash=hash;
      })
    }
    $(this).addClass('active');
  })

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

  //카테고리 필터
  $('#works .nav a').on('click',function(event){
    event.preventDefault();
    //카테고리 메뉴 전체 초기화
    $('#works .nav li').removeClass('active');
    //선택한 메뉴 활성화
    $(this).parent().addClass('active');

var category = $(this).text();
console.log(category);
// var Dcategory = $('#works .item').each(function(){
//   $(this).attr('data-category');
// });
// console.log(Dcategory);
 


  });


  //갤러리 팝업(모달)
$('#works .item a').on('click',function(){
  event.preventDefault();
  //a태그를 기준으로 부모인 panel을 찾고 부모를 기준으로 내가 원하는 요소를 다시 찾음
  //parent는 가장 가까운부모 s가붙으면 특정한 부모
  var title=$(this).parents('.panel').find('.panel-title .title').text();
  var src=$(this).attr('data-src');
  console.log(title, src);
  $('#modal').find('h4').text(title);
  $('#modal').modal().find('img').attr('src',src);

  //모달창 가운데 정렬/css에서 설정했음
  // $('#modal .modal-body img').css({'margin':'auto'});
})

//팝업창 열렸을때
  $('#modal').on('shown.bs.modal',function(){
    $('#modal .modal-body').outerHeight($(window).innerHeight()-150);
  })
//팝업창 열렸을때
$('#modal').on('hidden.bs.modal',function(){
  $('#modal .modal-body').outerHeight('');
})

  //프로그래스바 애니메이션, 위로가기 활성화
  $(window).scroll(function(){ //window 스크롤이 발생됬을때
    //위로가기
    var windowTop = $(window).scrollTop();
    if(windowTop>100){
      $('.goTop').addClass('on');
    }else{
      $('.goTop').removeClass('on');
    }

    $('#works .item').each(function(){
      var pos = $(this).offset().top;
      var winTop = $(window).scrollTop()+400;
      // console.log('pos:' + pos);
      // console.log('winTop:' + winTop);
      if(pos<winTop){
        //스크롤이 해당 위치와 일치하게 되면 작동
        $(this).find('.progress-bar').each(function(){
          //프로그래스 바의 max값을 받아오기
          var percent = $(this).attr('aria-valuenow');
          // console.log('percent:' + percent);
          $(this).animate({
            width:percent
            },{
              duration:1000,
              step:function(now){
            $(this).text(Math.floor(now)+'%');
          },
          //애니매이션 종료 시 줄무늬 움직이는 클라스 지우기
          complete:function(){
            $(this).removeClass('progress-bar-striped active');
          }
        })
        })
      }
    })
  }).scroll();
/*
  값이 소수점으로 나올때 처리방법
  반올림 Math.round(number)
  올림 Math.ceil(number)
  내림 Math.floor(numcer)
*/



})
