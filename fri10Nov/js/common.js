
//document ready
$(function(){
  //문서가 모두 로드되고 난 후 body내용 보임 처리
  $(window).on('load',function(){
    console.log('로딩완료!');
    $('#loading-bg2').animate({
      opacity:0
    },1000,function(){
      //로딩화면 투명처리완료되면
      $(this).remove();//요소삭제
      $('html, body').removeAttr('style');
    });


  });

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
  var $item=$('#works .item');

  $('#works .nav a').on('click',function(event){
    event.preventDefault();
    //카테고리 메뉴 전체 초기화
    $('#works .nav li').removeClass('active');
    //선택한 메뉴 활성화
    $(this).parent().addClass('active');

    //선택한 카테고리만 활성화 되도록 코드 작성
    //아이템 초기화
    $item.fadeOut(100,resizing);
    //선택한 메뉴의 이름
    var menu = $(this).text();

    if(menu=='All'){
      $item.fadeIn(100,resizing);
      //count 대신 아이템의 전체 수를 전달
      fn_alertMessage($item.length);
    }else{
      var count = 0;//검색된 수
      $item.each(function(index){
        //각 아이템의 카테고리 값
        var category = $(this).attr('data-category');
        if(menu==category){
          count++;
          $item.eq(index).fadeIn(1000,resizing);
        }
      })
      console.log('검색된 아이템수: ' + count);
      fn_alertMessage(count);
    }
// var category = $(this).text();
// console.log(category);
// // var Dcategory = $('#works .item').each(function(){
// //   $(this).attr('data-category');
// //  });
// // console.log(Dcategory);
// $('#works .item').each(function(){
//   var i = $(this).attr('data-category');
//
//   if(i != category){
//     $(this).hide();
//   }
// });

  });
  //카테고리 필터 끝

//검색 필터
$('.search-form button').on('click',function(){
  //내기 검색할 단어를 영어면 대문자로 변경, 앞뒤에 공백 있다면 제거
  var quicksearchVal=$('.quicksearch').val().toUpperCase().trim();
//  console.log("검색할 단어:" + quicksearchVal);

//아이템 초기화
  $item.fadeOut(100,resizing);

  if(quicksearchVal==''){//검색갑이 없을 경우(빈값)
    $item.fadeIn(100,resizing);
    fn_alertMessage($item.length);
  }else{
    //지역변수(해당 영역에서만 사용할 수 있는 변수)
    var count = 0;
    //아이템에 순차적으로 접근해서 처리
    $item.each(function(index){
      var search=$(this).text().toUpperCase().replace(/\s/g,'');
    //  console.log(index + '검색대상 문자열: '+search);
      var regex = new RegExp(quicksearchVal, 'g');
      var list = search.match(regex);
    //  console.log('매칭결과: '+list);

      if(list != null){//검색된 결과가 있을 경우
          //console.log(list.length);
          // for(var i=0; i<list.length; i++){
            if(quicksearchVal == list[0]){
              console.log('찾는 단어: ' + quicksearchVal, '찾은 단어:' +list[0], '해당하는 아이템: ' +index);
              //해당 아이템을 찾았을 경우
              count++;
              $item.eq(index).fadeIn(1000,resizing);
              //break;
            }
          //}
        }
    })
    //검색 결과를 알림창으로 알려주기
    fn_alertMessage(count);
  }
//검색버튼을 누르면 스크롤 위치 이동
// $(this).animate({scrollTop:$(#works).offset().top},1000)
})

  //검색 결과를 알림창으로 보여주기
function fn_alertMessage(count){
   var alertText;
   if(count == 0){
     alertText="선택하신 카테고리의 작업물이 없습니다."
   }else{
     alertText=count + "건이 검색되었습니다."
   }
   var alertMessage='<div class="alert-bg">'
   +'<div class="alert alert-warning alert-dismissible" role="alert">'
  +'<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
  +'<span aria-hidden="true">&times;</span></button>'
  +'<strong>'+alertText+'</strong>'
  +'</div>'
  +'</div>';

   //알림 메시지창을 body태그에 붙여줌
   $('body').append(alertMessage);
   //알림 메시지창 닫을 때 백그라운드로 삭제 처리
   $('.alert').on('closed.bs.alert',function(){
     console.log('닫힘');
     $('.alert-bg').remove();
   })
}

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
