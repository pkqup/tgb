/**
 * Created by lbj on 2018/5/2.
 */
pageSize=20;
page = 1;
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
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
    getFirstList(true);
}
var count = 0;
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
    page++;
    var queryData = {"productCode":$.trim($('#goodsCode').val()),"productName":$.trim($('#goodsName').val()),"page":page,"pageSize":pageSize};
    $.ajax({
        url:its.configuration.serviceUrl+"productcode/queryPage",
        data:JSON.stringify(queryData),
        type:"post",
        contentType:"application/json;charset=UTF-8",
        dataType:"json",
		headers: {
				authorization: "" + localStorage.getItem('token')
		},
        success:function(res){
            if(res.resultList&&res.resultList.length>0){
                for(var i=0;i<res.resultList.length;i++){
                    var v1 = '<div class="loading_div">\
                                    <div class="goodsCodeBar"> <span class="word_shop">商品编码:</span>'+res.resultList[i].productCode+'</div>\
                                    <div class="goodsRank_name"> <span class="word_shop">商品名称:</span>'+ res.resultList[i].productName+'</p>\
                                </div>';
                    $('.mui-table-view').append(v1);
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
                }
            }else if(res.resultList.length == 0){
                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
            }else{
                var code = verfiCode.verify();
                localStorage.setItem('code',code );
                $('#goods_verification_code').val('');
                commonObj.alertMsg("暂无数据!");
            }
        },
        error:function(e){
            commonObj.alertMsg("网络错误!");
            page--;//请求不成功的时候把page回退一位
        }
    });
}
//			if (mui.os.plus) {
//				mui.plusReady(function() {
//					setTimeout(function() {
//						mui('#pullrefresh').pullRefresh().pullupLoading();
//					}, 1000);
//
//				});
//			} else {
//				mui.ready(function() {
//					mui('#pullrefresh').pullRefresh().pullupLoading();
//				});
//			}
$('#submit').on('click',function(){
    getFirstList(false);
});

function getFirstList(isDownFlash){
    var goodsCodeText=$.trim($("#goodsCode").val());
    var goodsNameText=$.trim($("#goodsName").val());
    var goods_verification_codeText=$.trim($("#goods_verification_code").val());
    var code=localStorage.getItem('code');
    if(goodsCodeText==''&&goodsNameText==''){
        commonObj.alertMsg("两个里面必须填一个");
        return false;
    }
    else if(goods_verification_codeText==''){
        commonObj.alertMsg('验证码不能为空！');
        return false;
    }
    else if(code.toLowerCase()!=goods_verification_codeText.toLowerCase()){
        commonObj.alertMsg('验证码错误！');
        return false;
    }

    mui('#pullrefresh').pullRefresh().refresh(true);
    mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
    page = 1;
    var queryData = {"productCode":$.trim($('#goodsCode').val()),"productName":$.trim($('#goodsName').val()),"page":page,"pageSize":pageSize};
    commonObj.openLoading();
    $.ajax({
        url:its.configuration.serviceUrl+"productcode/queryPage",
        data:JSON.stringify(queryData),
        type:"post",
        contentType:"application/json;charset=UTF-8",
        dataType:"json",
		headers: {
				authorization: "" + localStorage.getItem('token')
		},
        success:function(res){
            commonObj.closeLoading();
            $('.mui-table-view').empty();
            if(res.resultList&&res.resultList.length==0){
                var code = verfiCode.verify();
                localStorage.setItem('code',code );
                $('#goods_verification_code').val('');
                commonObj.alertMsg("暂无数据!");
                return false;
            }else if(res.resultList&&res.resultList.length>0){
                for(var i=0;i<res.resultList.length;i++){
                    var v1 = '<div class="loading_div">\
                                    <div class="goodsCodeBar"> <span class="word_shop">商品编码:</span>'+res.resultList[i].productCode+'</div>\
                                    <div class="goodsRank_name"> <span class="word_shop">商品名称:</span>'+ res.resultList[i].productName+'</p>\
                                </div>';
                    $('.mui-table-view').append(v1);
                }
            }
            if(isDownFlash)mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed var code = verfiCode.verify();
        },
        error:function(e){
            commonObj.closeLoading();
            commonObj.alertMsg("网络错误!");
            if(isDownFlash)mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
        }
    });
}