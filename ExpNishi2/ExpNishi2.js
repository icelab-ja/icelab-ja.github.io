var expID="ExpNishi2";
//var expTag="ExpNishi2";
var expFolder="ExpNishi2_x1204529x";
var headSentence="メロディー聴取実験テスト";
var cur_lyrics_sentence=""

var data_info = []
var tmp_content=data_info_str.split('\n');
for(var i=0,len=tmp_content.length;i<len;i+=1){
	if(tmp_content[i]==""){continue;}
	data_info.push(tmp_content[i].split('\t'))
}//endfor i
//console.log(data_info_str);
//console.log(data_info);

var selected_sampleIdx = []

document.getElementById("head_sentence").innerHTML="<font color=\"#ffffff\">"+headSentence+"</font>";

var userXID="";
for(let i=0;i<10;i++){userXID+=(Math.random()%100).toString(32).substring(2,4);}

document.getElementById("representUserXID").innerHTML="セッションID: "+userXID;


var workCounter=0;

var varAge="-1";
var varListenTime="-1";
var varMusicActivity="-1";
var varHarmonyEducation="-1";

var descriptions=["曲を評価（任意）","ひどすぎる","とても悪い","悪い","少し悪い","まずまず","少し良い","良い","とても良い","素晴らしい","芸術的"];

var curRatingA=0;
var curDesriptionA=descriptions[0];
var curRatingB=0;
var curDesriptionB=descriptions[0];

var status = "inquiry";
//inquiry or selecting or selected

////////////////////////////////////////////////
//document.getElementById("questionnare").hidden = true;
//status="selecting";
//SetupTest();
////////////////////////////////////////////////

xhr = new XMLHttpRequest();

var curAID="";
var curBID="";
//var curSong="";
//var curASong="";
//var curBSong="";
//var curAName="";
//var curBName="";
//var curFaceA="";
//var curFaceB="";
//var curMp3A="";
//var curMp3B="";

document.getElementById('sendButton').addEventListener('click', function(event){

	if(status=="inquiry"){
//		console.log(varAge,varListenTime,varMusicActivity,varHarmonyEducation);

		document.getElementById("questionnare").hidden = true;
		status="selecting";
		SetupTest();

	}else if(status=="selecting"){

		let chosenID=((document.getElementById("radio1").checked)? curAID:curBID);

		xhr.open('POST', 'https://creevo-art.com/experiment/');
		xhr.setRequestHeader( 'Content-Type', 'application/json' );
		var data = {"expID":expID, "userXID":userXID, "varAge":varAge, "varListenTime":varListenTime, "varMusicActivity":varMusicActivity, "varHarmonyEducation":varHarmonyEducation, "curAID":curAID, "curBID":curBID, "chosenID":chosenID, "curRatingA":curRatingA, "curRatingB":curRatingB, };
		xhr.send( JSON.stringify(data) );

//		if(workCounter>=20){
//			document.getElementById("report_sentence").innerHTML="<a href=\"https://docs.google.com/forms/d/e/1FAIpQLSeRKAQ57Rzvb_HYrWNhrNmij_EpIm0gpdGksbhJG-GSDNqMRw/viewform?usp=pp_url&entry.1859172827="+userXID+"\" target=\"_blank\" rel=\"noopener noreferrer\"><strong>作業報告をする</strong></a>";
//		}//endif

//		document.getElementById("exit_sentence").innerHTML="<a href=\"https://creevomusic.github.io/exp/thankyou.html\">今日の聴き比べはここまでにする</a>";
		document.getElementById("exit_sentence").innerHTML="<a href=\"https://creevomusic.github.io/exp/thankyou.html\">今日の聴き比べはここまでにする</a>";

		$('#boxA').removeClass("box-notclickable").addClass("box-clickable");
		$('#boxB').removeClass("box-notclickable").addClass("box-clickable");
//		$('#ratingBoxA').removeClass("box-notclickable").addClass("box-clickable");
//		$('#ratingBoxB').removeClass("box-notclickable").addClass("box-clickable");
		$('#label1').removeClass("box-notclickable").addClass("box-clickable");
		$('#label2').removeClass("box-notclickable").addClass("box-clickable");

		status="selecting";
		SetupTest();

	}//endif

});

document.getElementsByName('selector').forEach(function(e) {
	e.addEventListener("click", function() {
		if(status=="selecting"){
			if(document.querySelector("input:checked[name=selector]").value=="A"){
				ClickedA();
			}else{
				ClickedB();
			}//endif
		}//endif
	});
});

document.getElementById('boxA').addEventListener('click', function(event){
	if(status=="selecting"){
		ClickedA();
	}//endif
});
document.getElementById('boxB').addEventListener('click', function(event){
	if(status=="selecting"){
		ClickedB();
	}//endif
});

function ClickedA(){
	document.getElementById("sendButton").disabled=false;
	document.getElementById("boxA").style.backgroundColor = '#ff9245';
	document.getElementById("boxB").style.backgroundColor = '#eeeeee';
	document.getElementById("radio1").checked = true;
}//end ClickedA

function ClickedB(){
	document.getElementById("sendButton").disabled=false;
	document.getElementById("boxA").style.backgroundColor = '#eeeeee';
	document.getElementById("boxB").style.backgroundColor = '#ff9245';
	document.getElementById("radio2").checked = true;
}//end ClickedB

function SetupTest(){

	document.getElementById("boxAContainer").hidden = false;
	document.getElementById("boxSpacer").hidden = false;
	document.getElementById("boxBContainer").hidden = false;

	document.getElementById("main_sentence").innerHTML="AとBのメロディーを聴いて、自分が良いと思う方を選んでください";

	document.getElementById("sendButton").value="結果を送る";
	document.getElementById("labelSendButton").innerHTML="結果を送る";

	document.getElementById("radio1").checked = false;
	document.getElementById("radio2").checked = false;
	document.getElementById("sendButton").disabled=true;
	document.getElementById("boxA").style.backgroundColor = '#eeeeee';
	document.getElementById("boxB").style.backgroundColor = '#eeeeee';

//	document.getElementById("faceA").src="https://creevomusic.github.io/exp/image/Mugao.png";
//	document.getElementById("faceB").src="https://creevomusic.github.io/exp/image/Mugao.png";
	document.getElementById("faceA").src="./image/Mugao.png";
	document.getElementById("faceB").src="./image/Mugao.png";

	document.getElementById("label1").innerHTML="Aの方が良い";
	document.getElementById("label2").innerHTML="Bの方が良い";

	let sampleIdx=-1
	for(var i=0,len=100;i<len;i+=1){
		sampleIdx = Math.floor( Math.random() * data_info.length );
		for(var j=0,len=selected_sampleIdx.length;j<len;j+=1){
			if(sampleIdx==selected_sampleIdx[j]){sampleIdx=-1; break;}
		}//endfor j
//		if(sampleIdx in selected_sampleIdx){sampleIdx=-1;}
		if(sampleIdx>=0){break;}
	}//endfor i

	curAID=data_info[sampleIdx][0];
	curBID=data_info[sampleIdx][1];
	cur_lyrics_sentence = data_info[sampleIdx][2]
	selected_sampleIdx.push(sampleIdx)

//	document.getElementById("label1").innerHTML=curAID;
//	document.getElementById("label2").innerHTML=curBID;
//	console.log(selected_sampleIdx)

	curMp3AURL='https://creevo-music.com/experiment/'+expFolder+'/'+curBID+'.mp3';
	curMp3BURL='https://creevo-music.com/experiment/'+expFolder+'/'+curAID+'.mp3';

	document.getElementById("Audio1A").src=curMp3AURL;
	document.getElementById("Audio1B").src=curMp3BURL;

	ClearRating();
	document.getElementById("lyrics_sentence").innerHTML=cur_lyrics_sentence;

	workCounter+=1;
//	document.getElementById("ShowWorkCounter").innerHTML=String(workCounter)+' 回目の聴き比べです（あと '+String(Math.max(0,21-workCounter))+' 回お願いします）';
	document.getElementById("ShowWorkCounter").innerHTML=String(workCounter)+' 回目の聴き比べです';

}//end SetupTest

function ClearRating(){
	curRatingA=0;
	curDesriptionA=descriptions[0];
	curRatingB=0;
	curDesriptionB=descriptions[0];
//	$('.starA').siblings().removeClass('star-color').addClass( "star-nocolor" );
//	$('.starA').siblings().removeClass('selectedA');
//	$('.starB').siblings().removeClass('star-color').addClass( "star-nocolor" );
//	$('.starB').siblings().removeClass('selectedB');
//	document.getElementById("popup_descriptionA").innerHTML=curDesriptionA;
//	document.getElementById("popup_descriptionB").innerHTML=curDesriptionB;
}//end ClearRating


document.getElementsByName('age').forEach(function(e) {
	e.addEventListener("click", function() {
		varAge=document.querySelector("input:checked[name=age]").value;
		AnsweredQuestion();
	});
});

document.getElementsByName('listenTime').forEach(function(e) {
	e.addEventListener("click", function() {
		varListenTime=document.querySelector("input:checked[name=listenTime]").value;
		AnsweredQuestion();
	});
});

document.getElementsByName('musicActivity').forEach(function(e) {
	e.addEventListener("click", function() {
		varMusicActivity=document.querySelector("input:checked[name=musicActivity]").value;
		AnsweredQuestion();
	});
});

document.getElementsByName('harmonyEducation').forEach(function(e) {
	e.addEventListener("click", function() {
		varHarmonyEducation=document.querySelector("input:checked[name=harmonyEducation]").value;
		AnsweredQuestion();
	});
});

function AnsweredQuestion(){
	if(varAge!="-1" && varListenTime!="-1" && varMusicActivity!="-1" && varHarmonyEducation!="-1"){
		document.getElementById("sendButton").disabled=false;
	}//endif
}//end AnsweredQuestion


//$('.starA').on('mouseover', function(){
//	if(status=="selecting"){
//		var $this = $(this);
//		$this.nextAll().removeClass('star-color').addClass( "star-nocolor" );
//		$this.prevAll().removeClass( "star-nocolor" ).addClass('star-color');
//		$this.removeClass( "star-nocolor" ).addClass('star-color');
//		let tmpRating=parseInt($this.attr('id').slice(-2));
//		document.getElementById("popup_descriptionA").innerHTML=descriptions[tmpRating];
//	}//endif
//});
//$('.starA').on('mouseleave', function(){
//	if(status=="selecting"){
//		var select = $('.selectedA');
//		if(select.attr('id') == undefined){
//			var $this = $(this);
//			$this.removeClass('star-color').addClass( "star-nocolor" );
//			$this.siblings().removeClass('star-color').addClass( "star-nocolor" );
//		}else{
//			select.nextAll().removeClass('star-color').addClass( "star-nocolor" );
//			select.prevAll().removeClass( "star-nocolor" ).addClass('star-color');
//			select.removeClass( "star-nocolor" ).addClass('star-color');
//		}//endif
//		document.getElementById("popup_descriptionA").innerHTML=curDesriptionA;
//	}//endif
//});
//$('.starA').on('click',function(){
//	if(status=="selecting"){
//		var $this = $(this);
//		$this.addClass('selectedA').siblings().removeClass('selectedA');
//		curRatingA=parseInt($this.attr('id').slice(-2));
//		curDesriptionA=descriptions[curRatingA];
//		document.getElementById("popup_descriptionA").innerHTML=curDesriptionA;
//	}//endif
//});
//
//$('.starB').on('mouseover', function(){
//	if(status=="selecting"){
//		var $this = $(this);
//		$this.nextAll().removeClass('star-color').addClass( "star-nocolor" );
//		$this.prevAll().removeClass( "star-nocolor" ).addClass('star-color');
//		$this.removeClass( "star-nocolor" ).addClass('star-color');
//		let tmpRating=parseInt($this.attr('id').slice(-2));
//		document.getElementById("popup_descriptionB").innerHTML=descriptions[tmpRating];
//	}//endif
//});
//$('.starB').on('mouseleave', function(){
//	if(status=="selecting"){
//		var select = $('.selectedB');
//		if(select.attr('id') == undefined){
//			var $this = $(this);
//			$this.removeClass('star-color').addClass( "star-nocolor" );
//			$this.siblings().removeClass('star-color').addClass( "star-nocolor" );
//		}else{
//			select.nextAll().removeClass('star-color').addClass( "star-nocolor" );
//			select.prevAll().removeClass( "star-nocolor" ).addClass('star-color');
//			select.removeClass( "star-nocolor" ).addClass('star-color');
//		}//endif
//		document.getElementById("popup_descriptionB").innerHTML=curDesriptionB;
//	}//endif
//});
//$('.starB').on('click',function(){
//	if(status=="selecting"){
//		var $this = $(this);
//		$this.addClass('selectedB').siblings().removeClass('selectedB');
//		curRatingB=parseInt($this.attr('id').slice(-2));
//		curDesriptionB=descriptions[curRatingB];
//		document.getElementById("popup_descriptionB").innerHTML=curDesriptionB;
//	}//endif
//});


