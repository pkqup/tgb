/**
 * Created by its on 2018/5/3.
 */
$(function() {
    pageSize=20;
    page = 0;
    initCodePage();
    mui.init({
        pullRefresh: {
            container: '#pullrefresh',
            down: {
                callback: pulldownRefresh
            },
            up: {
                contentrefresh: '正在加载...',
                callback: pullupRefresh
            }
        }
    });
    function pullupRefresh() {
        initCodePage();
    }
    function pulldownRefresh() {
        getFirstCode(true);
    }

    function  initCodePage() {
        page++;
        var phone;
        if(localStorage.getItem('userInfo')) {
            var userInfo = JSON.parse(localStorage.getItem('userInfo'));
             phone= userInfo.phone;
        }else {
            phone='';
        }
        var queryData = {"page": page, "pageSize": pageSize, "phone": phone};
        $.ajax({
            url: its.configuration.serviceUrl + "tqrCode/queryByCarNo",
            data: JSON.stringify(queryData),
            type: "post",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (res) {
                if(res.resultList&&res.resultList.length>0){
                    for (var i = 0; i < res.resultList.length; i++) {
                        var policyId = res.resultList[i].id;
                        var url = its.configuration.serviceUrl + 'tqrCode/queryByqrCode?id=' + res.resultList[i].id;
                        var v1 = '<div class="loading_div">' +
                            '<p style="display:none"> <span class="word_shop"id="messageId">消息Id：</span>' + res.resultList[i].id + '</p>' +
                            '<p> <span class="word_shop">场站编码：</span>' + res.resultList[i].areaCode + '</p>' +
                            '<p class="loading_html"> <span class="word_shop">场站名称:</span>' + res.resultList[i].areaName + '</p> ' +
                            '<img  src ="' + url + '" class="code_img" data-urlId="' + url + '" /> ' +
                            '</div>';
                        $('.list').append(v1);
                    }
                    mui(".loading_div").on('tap','.code_img',function(){
                        var urlId=$(this).attr('data-urlId');
                        ImgZoomIn(urlId);
                    });
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了
                }
            else if(res.resultList.length == 0){
            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
        }else{
            commonObj.alertMsg("暂无数据!");}
    },
    error:function(e){
        commonObj.alertMsg("暂无数据!");
        page--;//请求不成功的时候把page回退一位
    }
        });
    }

    function getFirstCode(isDownFlash){
        mui('#pullrefresh').pullRefresh().refresh(true);
        mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
        page = 1;
        var phone;
        if(localStorage.getItem('userInfo')) {
            var userInfo = JSON.parse(localStorage.getItem('userInfo'));
            phone= userInfo.phone;
        }else {
            phone='';
        }
        commonObj.openLoading();
        var queryData = {"page": page, "pageSize": pageSize, "phone": phone};
        $.ajax({
            url: its.configuration.serviceUrl + "tqrCode/queryByCarNo",
            data: JSON.stringify(queryData),
            type: "post",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success:function(res){
                commonObj.closeLoading();
                $('.list').empty();
                if(res.resultList.length == 0){
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
                }
                else if(res.resultList&&res.resultList.length>0){
                    for (var i = 0; i < res.resultList.length; i++) {
                        var policyId = res.resultList[i].id;
                        var url = its.configuration.serviceUrl + 'tqrCode/queryByqrCode?id=' + res.resultList[i].id;
                        var v1 = '<div class="loading_div">' +
                            '<p style="display:none"> <span class="word_shop"id="messageId">消息Id：</span>' + res.resultList[i].id + '</p>' +
                            '<p> <span class="word_shop">场站编码：</span>' + res.resultList[i].areaCode + '</p>' +
                            '<p class="loading_html"> <span class="word_shop">场站名称:</span>' + res.resultList[i].areaName + '</p> ' +
                            '<img  src ="' + url + '" class="code_img"   data-urlId="' + url + '" /> ' +
                            '</div>';
                        $('.list').append(v1);
                    }
                    mui(".loading_div").on('tap','.code_img',function(){
                        var urlId=$(this).attr('data-urlId');
                        ImgZoomIn(urlId);
                    });
                    if(isDownFlash) mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
                }
                },
            error:function(e){
                commonObj.closeLoading();
                commonObj.alertMsg("网络错误!");
                if(isDownFlash) mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
            }
        });
    }

    //function getPic(id){
    //    $.ajax({
    //        url:its.configuration.serviceUrl+"/tqrCode/queryByqrCode?id="+id,
    //        type:"get",
    //        success:function(res){
    //           console.log('success');
    //        },
    //        error:function(e){
    //            console.log('error');
    //        }
    //    });
    //    return false;
    //}

/*图片放大*/
 function  ImgZoomIn(url) {

        bgstr = '<div id="ImgZoomInBG" style=" background:#000000; filter:Alpha(Opacity=70); opacity:0.7; position:fixed; left:0; top:0; z-index:10000; width:100%; height:100%; display:none;"><iframe src="about:blank" frameborder="5px" scrolling="yes" style="width:100%; height:100%;"></iframe></div>';
//alert($(this).attr('src'));
        imgstr = '<img id="ImgZoomInImage" src="'+ url+'" onclick=$(\'#ImgZoomInImage\').hide();$(\'#ImgZoomInBG\').hide(); style="cursor:pointer; display:none; position:absolute; z-index:10001;" />';
        if ($('#ImgZoomInBG').length < 1) {
            $('body').append(bgstr);
        }
        if ($('#ImgZoomInImage').length < 1) {
            $('body').append(imgstr);
        }
        else {
            $('#ImgZoomInImage').attr('src', url);
        }
        $('#ImgZoomInImage').css('left', $(window).scrollLeft() + ($(window).width() - $('#ImgZoomInImage').width()) / 2-15);
        $('#ImgZoomInImage').css('top', $(window).scrollTop() + ($(window).height() - $('#ImgZoomInImage').height()) / 2-100);
        $('#ImgZoomInBG').show();
        $('#ImgZoomInImage').show();
    };

    $(document).ready(function () {
        $("#imgTest").bind("click", function () {
            $(this).ImgZoomIn();
        });
    });

});