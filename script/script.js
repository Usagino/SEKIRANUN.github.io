let arrow_add = vector => {
  $(".hamburger span:nth-child(1)").addClass('ham_' + vector + '_topleft');
  $(".hamburger span:nth-child(2)").addClass('ham_' + vector + '_topright');
  $(".hamburger span:nth-child(3)").addClass('ham_' + vector + '_center');
  $(".hamburger span:nth-child(4)").addClass('ham_' + vector + '_bottomleft');
  $(".hamburger span:nth-child(5)").addClass('ham_' + vector + '_bottomright');
}
let arrow_remove = vector => {
  $(".hamburger span:nth-child(1)").removeClass('ham_' + vector + '_topleft');
  $(".hamburger span:nth-child(2)").removeClass('ham_' + vector + '_topright');
  $(".hamburger span:nth-child(3)").removeClass('ham_' + vector + '_center');
  $(".hamburger span:nth-child(4)").removeClass('ham_' + vector + '_bottomleft');
  $(".hamburger span:nth-child(5)").removeClass('ham_' + vector + '_bottomright');
}

let menu_anime = (opacity, z_index, transform) => {
  $("header").css({
    "opacity": opacity,
    "z-index": z_index
  });
  $(".menu").css({
    "transform": "translateX(" + transform + "px)"
  });
}
let start= 0;
let isScrolling = 0;
let timeoutId;
let down = "down";
let up = "up";
let animationEnd = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

let titlelist = [
  "阿蘇外輪山",
  "雲海テラス",
  "東京スカイツリー",
  "高ボッチ高原",
  "山形県川尻",
  "鳥海山",
  "富士山",
  "津別峠"
]
let textlist = [
  "阿蘇山は日本の九州の中央部、熊本県阿蘇地方に位置する活火山です。外輪山と数個の中央火口丘から成り、外輪山は南北25km、東西18kmに及び世界最大級の面積380km2の広大なカルデラ地形（鍋型）を形成されています。下に広がる雲海は、羊の羽毛をバスタブいっぱいに浮かべたように見えなくもありません",

  "雲海テラスは北海道にある勇払郡占冠村の山岳リゾート、星野リゾートからいけます。小麦粉の袋を覗いたような白と北海道の大自然に囲まれたリゾート地です。そこでしか見られない植物や山岳で飲むコーヒーは必ずあなたのことを満たしてくれるでしょう",

  "634mの東京の空へと突きささる電波塔、浅草から見えるその塔は現在450mの展望デッキまで登ることができます。大都会の狭い空を我が物顔で聳えたち、高層ビルを受けから見渡すことができます。また22時まで空いているので綺麗な夜景を見ることもできます。",

  "高ボッチ高原は長野県岡谷市と塩尻市との境にある、標高1,665メートルの山です。ここは雲だけではなく星空も有名で昼夜問わず外に出て遊部ことができます。家族づれが多く集まり大自然によって作られた綺麗な空気は都会の喧騒を忘れさせてくれます。",

  "言ってしまえばここは観光地ではありません。しかし盆地広がる山々に囲まれた山形の大自然に、どこまでも続く田んぼの上に広がる大きい空。そこに浮かぶ積乱雲はまさに絶景です。ここへ来る途中の鶴岡市は映画「おくりびと」のロケ地でもあります。あえて何もないところへ行くという選択肢を取ってみるというのも、ありなのではないでしょうか。",

  "鳥海山は山形県と秋田県の間にある霊山です。古くから山岳信仰の対象となっていたこの山は、今でも山伏の方々が修行の場として使っているため、道が綺麗に舗装されています。山頂へムカまでの道のりにある樹木の圧倒さには感服するほどです。山形県は温泉の名地でもあるため、電車で少し行ったところにある銀山温泉に行ってみてもいいかもしれませんね",

  "富士山は日本最大の山であり、日本の象徴でもあります。その背景にそびえる雲、そして山頂に登った後に見える雲海は私たちを包みこまんばかりの偉大さを誇っています。",

  "津別峠は標高754m、北海道網走郡津別町と川上郡弟子屈町との境にある峠です。網走と釧路を分ける峠の一つです。何より峠から見える雲海はどこよりも綺麗で雲の「海」だと再認識されます。"

];
let maplist = [
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13401.701643407687!2d131.07535203533118!3d32.88691894502153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3540d87b844258f9%3A0x374a44e66d271103!2z6Zi_6JiH5bGx!5e0!3m2!1sja!2sjp!4v1532398118818",

  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d306814.7707016628!2d138.13804251735667!3d35.89175235814968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601c5c75ffa3faf9%3A0x65163ad3ca5a284d!2z6Zuy5rW344OG44Op44K5!5e0!3m2!1sja!2sjp!4v1532399083475",

  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.6567846113153!2d139.80851171536256!3d35.71006268018759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188ed0d12f9adf%3A0x7d1d4fb31f43f72a!2z5p2x5Lqs44K544Kr44Kk44OE44Oq44O8!5e0!3m2!1sja!2sjp!4v1532399589442",

  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3222.4155366052782!2d138.03257031537373!3d36.13209438009164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601d05b30ebd78cf%3A0xd579babbb8e8faa1!2z6auY44Oc44OD44OB6auY5Y6f!5e0!3m2!1sja!2sjp!4v1532400355954",

  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12446.151708422192!2d139.92559843779674!3d38.75136442349326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f8c1cad3ecad92b%3A0xd25ffef7d99f57dc!2z44CSOTk5LTc2NDQg5bGx5b2i55yM6ba05bKh5biC5bed5bC7!5e0!3m2!1sja!2sjp!4v1532401206135",

  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12385.283245272738!2d140.04207853795373!3d39.09916572263874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f8eed559b6f460d%3A0x8e67ba4656d9ec4d!2z6bOl5rW35bGx!5e0!3m2!1sja!2sjp!4v1532401490050",

  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16704.47314230657!2d138.87622737514232!3d35.417619435326884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60196f92596a144d%3A0x2f4af010626a45dd!2z5a-M5aOr5bGx44Ks44O844OH44Oz44Ob44OG44Or!5e0!3m2!1sja!2sjp!4v1532401680472",

  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46227.529777570984!2d144.18509935483326!3d43.60194800537384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f6d633df1d25c13%3A0xd12647de4103572f!2z5rSl5Yil5bOg5bGV5pyb5pa96Kit!5e0!3m2!1sja!2sjp!4v1532405536472",

];
let imagelist =[
  "material/cloud_1.jpg",
  "material/cloud_2.jpg",
  "material/cloud_3.jpg",
  "material/cloud_4.jpg",
  "material/cloud_5.jpg",
  "material/cloud_6.jpg",
  "material/cloud_7.jpg",
  "material/cloud_8.jpg",
]

$(window).on('load', function() {
  $(".bucket .screen").on(animationEnd, function() {
    $(".loading").addClass('trash')
  });
});
let first_pos = $('.first').offset().top;
let content_pos = $('.content').offset().top;
let clouds_pos = $('.clouds').offset().top;

$(function() {
  $(".menu_top").click(function() {
    $("html,body").animate({
      scrollTop:first_pos
    });
  });
  $(".menu_about").click(function() {
    $("html,body").animate({
      scrollTop:content_pos -70
    });
  });
  $(".menu_clouds").click(function() {
    $("html,body").animate({
      scrollTop:clouds_pos - 70
    });
  });

  $(window).scroll(function() {
    let pos = $(this).scrollTop();
    h_boundary = start - pos;
    if (1 < h_boundary) {

      arrow_remove("down");
      arrow_add("up");

    } else if (-1 > h_boundary) {
      arrow_remove("up");
      arrow_add("down");

    } else {
      arrow_remove("up");
      arrow_remove("down");
    }
    start = pos;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(function() {
      arrow_remove("up");
      arrow_remove("down");
    }, 2000);

  });
  $(".hamburger").click(function() {
    opacity = 1;
    z_index = 901;
    translateX = -300;
    menu_anime(opacity, z_index, translateX);
  });
  $(".close").click(function() {
    opacity = 0;
    z_index = -1;
    translateX = 0;
    menu_anime(opacity, z_index, translateX);
  });

  $(".clouds_cloud").click(function() {
    $(".clouds_wrap").addClass('clouds_anime');

  });


  for( let i=0; i<=7; i++) {
    $(".clouds_c"+ i).click(function() {
      $(".clouds_contentwrap .text h1").text(titlelist[i]);
      $(".clouds_contentwrap .text p").text(textlist[i]);
      $(".clouds_contentwrap .map iframe").attr('src',maplist[i]);
      $(".clouds_contentwrap .image img").attr('src',imagelist[i]);
    });
  }

  $(".clouds_wrap_close").click(function() {
    $(".clouds_wrap").removeClass('clouds_anime');
  });

});
