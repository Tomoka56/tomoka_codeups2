
jQuery(function ($) {
    // ヘッダーの高さ分だけコンテンツを下げる
  $(function () {
    const height = $(".js-header").height();
    // pc-nav__item aをクリックしたときの処理
    $(".pc-nav__item a, .sp-nav__item a").click(function () {
    $("main").css("margin-top", height);
    });
  });

  $(document).on('click', 'a[href*="#"]', function () {
    let time = 400;
    let header = $('header').innerHeight();
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $('html,body').animate({ scrollTop: targetY }, time, 'swing');
    return false;
  });

  $(document).ready(function() {
    let scrollPosition = $(window).scrollTop(); // 現在のスクロール位置を保存
    $('top').css('overflow', 'hidden'); // 背景のスクロールを無効にする
    $('.js-loading').delay(3000).fadeOut(2000, function() {
      $('top').css('overflow', 'auto'); // アニメーション終了後に背景のスクロールを有効化する
      window.location.hash = 'scroll=' + scrollPosition; // スクロール位置をURLのハッシュに追加
    });
  });


  $(function(){
  let flg = null;
  let check_access = function () {
    // ★sessionStorageの値を判定
    if (sessionStorage.getItem('access_flg')) {
      // 2回目以降
      flg = 1;
    } else {
      // 1回目
      sessionStorage.setItem('access_flg', true);
      flg = 0
    }
    return flg;
  }

  let $i = check_access();
  if($i == 0){
    // 1回目アクセスの処理
    $(document).ready(function() {
           // ローディング画面ちらつき防止
          $('.js-loading').css('display','block');
          $('.js-loading').delay(3000).fadeOut(2000);
          $('body').css('display','block');
        setTimeout(function() {
          // fvスライダー
          const swiper1 = new Swiper(".js-fv-slider", {
            loop: true,
            speed: 1500,
            autoplay: {
              delay: 2500,
            },
          });
          $('.js-btn,.js-mask').addClass('is-hidden');
          $('.js-header').addClass('color');
        }, 7000); // 遅延時間
      });
  }else{
    // 2回目アクセスの処理
    $(document).ready(function() {
      $('.js-loading').hide();
      $('.js-btn,.js-mask,.js-loading').addClass('is-hidden');
      $('body').css('display','block');
    setTimeout(function() {
      const swiper1 = new Swiper(".js-fv-slider", {
        loop: true,
        speed: 1500,
        autoplay: {
          delay: 2500,
        },
      });
      $('.js-header').addClass('color');
    }, 4000); 
  });
  }
})

// ハンバーガーメニュー/ドロワーメニュー
$('.js-hamburger,.sp-nav__link').click(function() {
    // メニューを開く
    $(".js-bar").toggleClass("is-active");
    $(".js-header").toggleClass("is-open");
    $(".js-drawer").toggleClass("is-open");
  });

var flg = false;
var winPos;

$('.js-hamburger,.sp-nav__link').on('click', function(){
	if(flg == false) {
		winPos = $(window).scrollTop();
		$('html').addClass('is-fixed').css({'top': -winPos});
		flg = true;
	} else {
		$('html').removeClass('is-fixed').css({'top': 0});
		window.scrollTo( 0 , winPos );
		flg = false;
	}
});


  // キャンペーンスライダー
  const swiper2 = new Swiper(".js-campaign-slider", {
    slidesPerView: 1.25,
    spaceBetween: 30,
    loop: true,
        breakpoints: {
      768: {
        slidesPerView: 3.5,
        spaceBetween: 41,
      },
    },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      },
});

// トップへ戻るボタン
$(window).on("scroll", function() {
  let scrollHeight = $(document).height();
  let scrollPosition = $(window).height() + $(window).scrollTop();
  let footHeight = $("footer").innerHeight();
  if ( scrollHeight - scrollPosition  <= footHeight ) {
      $(".js-page-top").css({
          "position":"absolute",
          "bottom": footHeight + 19
      });
  } else {
      $(".js-page-top").css({
          "position":"fixed",
          "bottom": "16px"
      });9
  }
});

  let topBtn = $('#page-top');
  topBtn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500, 'swing');
    return false;
  });

  // 背景色が伸びて画像を表示
  function BgFadeAnime(){
    $('.js-extend').each(function(){
      let elemPos = $(this).offset().top-50;
      let scroll = $(window).scrollTop();
      let windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight){
        $(this).addClass('extend');
      }else{
        $(this).removeClass('extend');
      }
    });

    // 画像を囲う子要素
    $('.js-wrapper').each(function(){
      var elemPos = $(this).offset().top-50;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight){
        $(this).addClass('wrap');
      }else{
        $(this).removeClass('wrap');
      }
    });
  }

  // 画面をスクロールをしたら動かしたい場合の記述
  $(window).scroll(function (){
    BgFadeAnime();
  });
  // 画面が読み込まれたらすぐに動かしたい場合の記述
  $(window).on('load', function() {
    BgFadeAnime();
  });


// Aboutモーダル

  // JavaScriptの部分
let scrollPos;

$(".js-photo").click(function () {
  scrollPos = $(window).scrollTop();
  $(".js-overlay").html($(this).prop("outerHTML"));
  $(".js-overlay").fadeIn(200);
  $(".js-header, .js-page-top").hide();
  $('html').addClass('is-fixed');
  return false;
});

$(".js-overlay").click(function () {
  $(".js-overlay").fadeOut(200, function () {
    $(".js-header, .js-page-top").fadeIn();
    $('html').removeClass('is-fixed');
    $(window).scrollTop(scrollPos);
  });
  return false;
});


  // Informationタブメニュー
$(function () {
  $(".js-content:first-of-type").css("display", "block");
  $(".js-tab").on("click", function () {
    $(".is-active").removeClass("is-active");
    $(this).addClass("is-active");
    const index = $(this).index();
    $(".js-content").hide().eq(index).fadeIn(300);
  });
});


$('.js-accordion').on('click',     function () {
  $(this).next().slideToggle(300);
  $(this).toggleClass('is-close', 300);
});

});
