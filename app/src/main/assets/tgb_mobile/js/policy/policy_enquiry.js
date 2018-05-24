$(function(){
    pageSize=20;
    page = 0;
    initPolicyPage();
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
     * 上拉加载具体业务实现
     */
    function pullupRefresh() {
        initPolicyPage();
    }
    function pulldownRefresh() {
        getFirstPolicy(true);
    }
    function initPolicyPage(){
        page++;
        var queryData = {"page":page,"pageSize": pageSize};
        $.ajax({
            url:its.configuration.serviceUrl+"tpolicy/appqueryPage",
            data:JSON.stringify(queryData),
            type:"post",
            contentType:"application/json;charset=UTF-8",
            dataType:"json",
            success:function(res){
                    if(res.resultList&&res.resultList.length>0){
                    for(var i=0;i<res.resultList.length;i++) {
                        var policyId = res.resultList[i].id;
                        var v1 = '<div class="loading_div"  data-policyId="' + policyId + '" >' +
                            '<p style="display:none"> <span class="word_shop"id="policyId">政策Id:</span>' + res.resultList[i].id + '</p>' +
                            '<p class="loading_titile"> ' + res.resultList[i].policyTitle + '</p>' +
                            '<div> <img class="loading_time" src="../../img/time.png"/><p class="loading_html"> ' + res.resultList[i].pubTime + '</p></div>' +
                            '<img class="goCome" src="../../img/goCome.png" />' +
                            '</div>';
                        $('.list').append(v1);
                    }
                        mui(".list").on('tap','.loading_div',function(){
                            var policyId = $(this).attr('data-policyId');
                            getMessage(policyId);
                        });
                        mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了
                    }else if(res.resultList.length == 0){
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

    function getFirstPolicy(isDownFlash){
        mui('#pullrefresh').pullRefresh().refresh(true);
        mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
        page = 1;
        var queryData = {"page":page,"pageSize":pageSize};
        $.ajax({
            url:its.configuration.serviceUrl +"tpolicy/appqueryPage",
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
                    for(var i=0;i<res.resultList.length;i++) {
                        var policyId = res.resultList[i].id;
                        var v1 = '<div class="loading_div"  data-policyId="' + policyId + '" >' +
                            '<p style="display:none"> <span class="word_shop"id="policyId">政策Id:</span>' + res.resultList[i].id + '</p>' +
                            '<p class="loading_titile"> ' + res.resultList[i].policyTitle + '</p>' +
                            '<div> <img class="loading_time" src="../../img/time.png"/><p class="loading_html"> ' + res.resultList[i].pubTime + '</p></div>' +
                            '<img class="goCome" src="../../img/goCome.png" />' +
                            '</div>';
                        $('.list').append(v1);
                    }
                    mui(".list").on('tap','.loading_div',function(){
                        var policyId = $(this).attr('data-policyId');
                        getMessage(policyId);
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
    function getMessage(id){
        $.ajax({
            url:its.configuration.serviceUrl+"/tpolicy/querySingleById?id="+id,
            type:"get",
            success:function(res){
                if(res){
                    if(!res.policyContent){
                        commonObj.alertMsg("暂无详情信息");
                        return false;
                    }
                    var policycontent = res.policyContent?res.policyContent : '';
                    var policytitle = res.policyTitle?res.policyTitle:'';
                    var policytime = res.pubTime?res.pubTime:'';
                    localStorage.setItem('policycontent', policycontent);
                    localStorage.setItem('policytitle', policytitle);
                    localStorage.setItem('policytime', policytime);
                    window.location.href="../../html/policy/policy_info.html";
                }
            },
            error:function(e){
            }
        });

    }

});
