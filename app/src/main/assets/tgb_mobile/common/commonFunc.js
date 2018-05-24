/**
 * Created by bhl on 2018/4/27.
 */
var commonObj = {
    flexibleInput : function(targetDom){
        //if($('body').height()/2< e.clientY){
        //    //解决第三方软键盘唤起时底部input输入框被遮挡问题
        //    var bfscrolltop = $(targetDom).scrollTop();//获取软键盘唤起前浏览器滚动部分的高度
        //    var changeHeig = e.clientY - $('body').height()/2 + 50;
        //    $(targetDom).append('<div id="tempDiv" style="width: 100%;height:'+changeHeig+'px;"></div>');
        //    $(targetDom).animate({scrollTop:changeHeig},300);
        //    e.target.onblur = function(){//设定输入框失去焦点时的事件
        //        $(targetDom).animate({scrollTop:bfscrolltop},300);
        //        $("#tempDiv").remove();
        //    };
        //}
        var bfscrolltop = $(targetDom).scrollTop();//获取软键盘唤起前浏览器滚动部分的高度
        document.onclick = function(e){
            if(e.target.tagName=='INPUT'){
                if($('body').height()/2< e.clientY){
                    //解决第三方软键盘唤起时底部input输入框被遮挡问题
                    var changeHeig = e.clientY - $('body').height()/2 + 50;
                    if(document.getElementById('tempDiv')){
                        $('#tempDiv').height(changeHeig);
                    }else{
                        $(targetDom).append('<div id="tempDiv" class="tempDiv" style="width: 100%;height:'+changeHeig+'px;position:relative;"></div>');
                    }
                    $(targetDom).animate({scrollTop:changeHeig},300);
                }
            }else{
                $(targetDom).animate({scrollTop:bfscrolltop},300,function(){
                    $(".tempDiv").remove();
                });
            }
        }

    },
    alertMsg:function(msgText){
        var alertMsgHtml = '<div id="alertBox" class="alertBox">'+
                                '<div id="alertMsg" class="alertMsg">'+msgText+'</div>'+
                            '</div>';
        if(document.getElementById('alertBox')){
            $('#alertMsg').text(msgText);
        }else{
            $('body').append(alertMsgHtml);
        }
        $('#alertBox').fadeIn(300,function(){
            $('#alertBox').off('click');
            $('#alertBox').on('click',function(){
                $('#alertBox').fadeOut(100);
                $('#alertBox').remove();
            });
        });
    },
    openLoading:function(){
        var locationHref = location.href.split('tgb_mobile')[0]+'tgb_mobile/';
        var loadingHtml = '<div id="loadingBox" class="loadingBox"><img src="'+locationHref+'img/loading.gif" alt=""/></div>';
        $('body').append(loadingHtml);
    },
    closeLoading:function(){
        $('#loadingBox').remove();
    }
}