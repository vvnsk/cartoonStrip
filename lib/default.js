$(window).load(function() {
    var topJaw = $("#topJaw"),bottomJaw = $("#bottomJaw"),bomb = $("#bomb"),kaboom=$("#kaboom"),
        slide = $("#slide"),villain = $("#villain"),victim = $("#victim"),
        progressValue = $("#progressValue"),
        totalProgressValue = $("#totalProgressValue"),
        timeValue = $("#timeValue"),
        totalTimeValue = $("#totalTimeValue"),
        restartBtn = $("#restartBtn"),
        //txtContainer = $("#txtContainer"),
        tl,
        progressSlider,
        totalProgressSlider,
        txt;

    /* config sliders */

    progressSlider = $("#progressSlider").slider({
        range: false,
        min: 0,
        max: 100,
        step:.1,
        slide: function ( event, ui ) {
            tl.pause();
            tl.progress( ui.value/100 );
        }
    });

    totalProgressSlider = $("#totalProgressSlider").slider({
        range: false,
        min: 0,
        max: 100,
        step:.1,
        slide: function ( event, ui ) {
            tl.totalProgress( ui.value/100 ).pause();
        }
    });



    /* build DOM elements*/

    /*function splitText(phrase) {
        var prevLetter, sentence,
            sentence = phrase.split("");
        $.each(sentence, function(index, val) {
            if(val === " "){
                val = "&nbsp;";
            }
            var letter = $("<div/>", {
                id : "txt" + index
            }).addClass('txt').html(val).appendTo(txtContainer);

            if(prevLetter) {
                $(letter).css("left", ($(prevLetter).position().left + $(letter).width()) + "px");
            };
            prevLetter = letter;
        });
        txt = $(".txt");
    }*/

    function buildTimeline() {

        //note this timeline uses 3D transforms which will only work in recent versions of Safari, Chrome, and FireFox. IE10 will support 3D transforms as well. All other browsers simply will not show those properties being tweened.

       // TweenLite.set(txtContainer, {perspective:500});

        tl = new TimelineMax({onUpdate:updateUI, yoyo:true});
        tl.from(topJaw, 0.5, {top:'-=42px'});
        tl.from(bottomJaw, 0.5, {bottom:'-=40px'});
        tl.to(bomb, 0.5, {width:'+=40px',height:'+=40px',left:'-=60px',bottom:'+=10px'});
        tl.to(kaboom, 0.5, {width:'+=163px',height:'+=130px',top:'-=38px',left:'-=81px'});
        tl.to(slide, 3, {left:'+=460px'});
        tl.to(victim, 0.5, {rotationY:'+=180'});
        tl.to(villain, 1, {left:'-=115'});
        tl.to(victim, 0.5, {rotationY:'+=180',left:'-=300px'});
        tl.to(villain, 0.5, {left:'-=350'});
        /*tl.staggerFrom(txt, 0.4, {alpha:0}, 0.06, "textEffect");
        //tl.staggerFrom(txt, 0.8, {rotationY:"-270deg", top:80, transformOrigin: "50% 50% -80"}, ease:Back.easeOut, 0.06, "textEffect");
        tl.staggerTo(txt, 0.6, {rotationX:"360deg", color:"#90e500", transformOrigin:"50% 50% 10"}, 0.02);*/
    }

    /* callbacks */

    function updateUI() {
        //change slider value
        //progressSlider.slider("value", tl.progress() *100);
        totalProgressSlider.slider("value", tl.totalProgress() *100);

        //update display of values
        //progressValue.html(tl.progress().toFixed(2));
        totalProgressValue.html(tl.totalProgress().toFixed(2));
        //timeValue.html(tl.time().toFixed(2));
        totalTimeValue.html(tl.totalTime().toFixed(2));
    }

    restartBtn.click(function() {
        //Start playing from a progress of 0.
        tl.restart();
    });

    function init() {
        //splitText("We Hope You Enjoyed the Tour");
        buildTimeline();
        //show the demoBackground div after DOM is ready and all images loaded
        TweenLite.set($("#demoBackground"), {visibility:"visible"});
    }

    init();
});