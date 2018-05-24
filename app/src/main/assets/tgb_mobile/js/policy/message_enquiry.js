/**
 * Created by its on 2018/5/3.
 */
/**
 * Created by its on 2018/5/3.
 */
$(function(){
    pageSize=20;
    page = 0;
    initMeassagePage();
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
    /**
     * 上拉具体业务实现
     */
    function pullupRefresh() {
        initMeassagePage();
    }

    function pulldownRefresh() {
        getFirstMessage(true);
    }
    function initMeassagePage(){
        page++;
        var queryData = {"page":page,"pageSize":pageSize};
        $.ajax({
            url:its.configuration.serviceUrl +"tinfo/appqueryPage",
            data:JSON.stringify(queryData),
            type:"post",
            contentType:"application/json;charset=UTF-8",
            dataType:"json",
            success:function(res){
                if(res.resultList&&res.resultList.length>0){
                    for(var i=0;i<res.resultList.length;i++){
                        var messageId=res.resultList[i].id;
                        var v1 = '<div class="loading_div" data-messageId="'+messageId+'" >'+
                            '<p style="display:none"> <span class="word_shop"id="messageId">消息Id：</span>'+res.resultList[i].id+'</p>'+
                            '<p>'+res.resultList[i].infoTitle+'</p>'+
                            '<div><img class="loading_time" src="../../img/time.png"/><p class="loading_html">'+ res.resultList[i].pubTime+'</p></div>'+
                            '<img class="goCome" src="../../img/goCome.png"  />'+
                            '</div>';
                        $('.list').append(v1);
                    }
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
                    mui(".list").on('tap','.loading_div',function(){
                        var messageId = $(this).attr('data-messageId');
                        getMessage(messageId);
                    });
                }
                else if(res.resultList.length == 0){
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
                    if(page==1)commonObj.alertMsg("暂无数据!");
                }else{
                    commonObj.alertMsg("暂无数据!");
                }
            },
            error:function(e){
                commonObj.alertMsg("暂无数据!");
                page--;//请求不成功的时候把page回退一位
            }
        });
    }
    function getFirstMessage(isDownFlash){
        mui('#pullrefresh').pullRefresh().refresh(true);
        mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
        page = 1;
        var queryData = {"page":page,"pageSize":pageSize};
        $.ajax({
            url:its.configuration.serviceUrl +"tinfo/appqueryPage",
            data:JSON.stringify(queryData),
            type:"post",
            contentType:"application/json;charset=UTF-8",
            dataType:"json",
            success:function(res){
                $('.list').empty();
                if(res.resultList&&res.resultList.length==0){
                    commonObj.alertMsg("暂无数据!");
                    return false;
                }
                else if(res.resultList&&res.resultList.length>0){
                    for(var i=0;i<res.resultList.length;i++){
                        var messageId=res.resultList[i].id;
                        var v1 = '<div class="loading_div" data-messageId="'+messageId+'" >'+
                            '<p style="display:none"> <span class="word_shop"id="messageId">消息Id：</span>'+res.resultList[i].id+'</p>'+
                            '<p>'+res.resultList[i].infoTitle+'</p>'+
                            '<div><img class="loading_time" src="../../img/time.png"/><p class="loading_html">'+ res.resultList[i].pubTime+'</p></div>'+
                            '<img class="goCome" src="../../img/goCome.png"  />'+
                            '</div>';
                        $('.list').append(v1);
                    }
                    mui(".list").on('tap','.loading_div',function(){
                        var messageId = $(this).attr('data-messageId');
                        getMessage(messageId);
                    });
                    if(isDownFlash) mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
                }
            },
            error:function(e){
                commonObj.alertMsg("网络错误!");
                if(isDownFlash) mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
            }
        });
    }
    function getMessage(id) {
        $.ajax({
            url: its.configuration.serviceUrl + "/tinfo/querySingleById?id=" + id,
            type: "get",
            success: function (res) {
                if(res){
                    if(!res.infoContent){
                        commonObj.alertMsg("暂无详情信息");
                        return false;
                    }
                    var messagecontent = res.infoContent? res.infoContent: '';
                    var messagetitle=res.infoTitle?res.infoTitle:'';
                    var messagetime=res.pubTime?res.pubTime:'';
                    localStorage.setItem('messagecontent', messagecontent);
                    localStorage.setItem('messagetitle', messagetitle);
                    localStorage.setItem('messagetime', messagetime);
                    window.location.href="../../html/policy/message_info.html"
                }
            },
                        error: function (e) {
                            console.log('error');
                        }
                    });
                    return false;
    }
        });


