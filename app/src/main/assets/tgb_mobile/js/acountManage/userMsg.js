$(document).ready(function() {
    if(localStorage.getItem('userInfo')){
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        $('#userphone').val(userInfo.phone);
        $('#username').val(userInfo.userName);
        $('#emailphone').val(userInfo.email);
        $('#name').val(userInfo.name);
        $('#checkId').val(userInfo.cardId);
        $('#corporation_name').val(userInfo.companyName);
        $('#carNo1').val(userInfo.cardNo1);
        $('#carNo2').val(userInfo.cardNo2);
        $('#all').val(userInfo.companyCode);
        $('#ocean_code').val(userInfo.custCode);
    }
    if(localStorage.getItem('userType')){
        userType = localStorage.getItem('userType');
    }else{
        userType = 1;
    }
    //userType = 4;
    if (userType == 1) {
        $(".contentBox .same #userphone").parent().css('display', 'block');
        $(".contentBox .same #userphone").attr('disabled','disabled');
        $(".contentBox .same #name").parent().css('display', 'block');
        $('.contentBox .same #checkId').parent().css('display', 'block');
        $('.contentBox .same #emailphone').parent().css('display', 'block');
        $('#checkCodeBar').show();

        $('#goBack').off('click');
        $('#goBack').on('click',function(){
            location.href = "../../index.html";
        });
    } else if (userType == 2||userType == 3) {
        $('.contentBox .same #corporation_name').parent().css('display', 'block');
        $('.contentBox .same #customsCode').parent().css('display', 'block');
        $('.contentBox .same #all').parent().css('display', 'block');
        $('.contentBox .same #emailphone').parent().css('display', 'block');
        $('#checkCodeBar').show();
        $('#goBack').off('click')
        $('#goBack').on('click',function(){
            location.href = "../../index.html";
        });
    }
    else if (userType == 4) {
        $('.contentBox .same #corporation_name').parent().css('display', 'block');
        $(".contentBox .same #checkId").parent().css('display', 'block');
        $(".contentBox .same #name").parent().css('display', 'block');
        $('.contentBox .same #emailphone').parent().css('display', 'block');
        $('.contentBox .same #carNo1').parent().css('display', 'block');
        $('.contentBox .same #carNo2').parent().css('display', 'block');
        $('#checkCodeBar').show();
        $('#goBack').off('click')
        $('#goBack').on('click',function(){
            location.href = "../../index.html";
        });
    }
    else if (userType == 5) {  //找回密码界面
        $('#tittle').text("找回密码");
        $('.contentBox .same #userphone').parent().css('display', 'block');
        $('#checkCodeBar').show();
        $('#goBack').off('click')
        $('#goBack').on('click',function(){
            location.href = "../../login.html";
        });
    }
    else if (userType == 6) {  //重设密码界面
        $('#tittle').text("重设密码");
        $('.contentBox .same #password').parent().css('display', 'block');
        $('.contentBox .same #password2').parent().css('display', 'block');
        $('#goBack').off('click');
        $('#goBack').on('click',function(){
            localStorage.setItem('userType',5);
            location.reload();
        });
    }
    //commonObj.flexibleInput("#inputFlexBox");
    //$('input').on('click',function(e){
    //    console.log(e.clientX, e.clientY);
    //    commonObj.flexibleInput("#inputFlexBox");
    //});
    $('#userphone').change(function () {
        var phoneNum = $.trim($('#userphone').val());
        var mPattern =/(1[3-9]\d{9}$)/;
        if(!mPattern.test(phoneNum)){
            commonObj.alertMsg("电话号码格式不正确!")
            return false;
        };
    });
    $('#emailphone').change(function(e){
        var emailText = $.trim($('#emailphone').val());
        var pattern =/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(!pattern.test(emailText)){
            //alert("邮箱格式不正确!")
            //commonObj.alertMsg()
            return false;
        };
    });
    $('#checkId').change(function(){
        var checkIdText = $.trim($('#checkId').val());
        var pattern = /^([0-9]){18}(x|X)?$/;
        if(!pattern.test(checkIdText)){
           commonObj.alertMsg("身份证格式不正确!");
            return false;
        };
    });
    $('#password').change(function(){
        var passwordText = $.trim($('#password').val());
        var pattern = /^[a-zA-Z0-9]\w{5,19}$/;
        if(!pattern.test(passwordText)){
            commonObj.alertMsg("请输入6至20位的密码!");
            return false;
        };
    });
    $('#password2').change(function(){
        var passwordText = $.trim($('#password').val());
        var passwordText2 = $.trim($('#password2').val());
        if(passwordText!=passwordText2){
            commonObj.alertMsg("两次输入的密码不一致!");
            return false;
        }
    });

    var isFisrtTime = true;
    $('#qrcode').on('click',function(){
        if(!isFisrtTime)return false;
        $(this).css('backgroundColor','#7086c5');
        $('#countDown').css('display', 'block');
        var phoneNum = $.trim($('#userphone').val());
        if(phoneNum==''){
            commonObj.alertMsg('请先输入电话号码!');
            return false;
        }
        commonObj.openLoading();
        var userData = {"phone":phoneNum};
        $.ajax({
            url:its.configuration.serviceUrl + "/user/sendVertionCode?phone="+phoneNum,
            data:userData,
            type:"get",
            success:function(res){
                commonObj.closeLoading();
                if(res.success){

                }else{
                    commonObj.alertMsg("获取不成功!");
                }
            },
            error:function(e){
                commonObj.closeLoading();
                commonObj.alertMsg('网络错误!');
            }
        });
        var countDownNum = 60;
        var interval = setInterval(function(){
            isFisrtTime = false
            countDownNum--;
            $('#qrcode').html('获取验证码<span id="countDown" style="font-size: 12px;">('+countDownNum+'s)</span>');
            if(countDownNum==0){
                clearInterval(interval);
                isFisrtTime = true;
                $('#qrcode').css('backgroundColor','royalblue');
                $('#qrcode').html('获取验证码');
            }
        },1000);
    });

    $('#submit').on('click',function() {
        for(var i=0;i<$('.contentBox input').length;i++){
            if($('.contentBox input').eq(i).parent().css('display')=='block'){
                var text = $.trim($('.contentBox input').eq(i).val());
                if(text==''){
                    commonObj.alertMsg($('.contentBox input').eq(i).attr('placeholder')+"不能为空!");
                    return false;
                }
            }
        }
        if(userType==5){
            var mPattern =/(1[3-9]\d{9}$)/;
            var phoneNum = $.trim($('#userphone').val());
            if(!mPattern.test(phoneNum)){
                commonObj.alertMsg("电话号码格式不正确!")
                return false;
            }
            var userData = {"phone":$.trim($('#userphone').val()),"verCode":$.trim($('#checkcode').val())};
            commonObj.openLoading();
            $.ajax({
                url:its.configuration.serviceUrl + "/user/checkCode",
                data:JSON.stringify(userData),
                type:"post",
                contentType:"application/json;charset=UTF-8",
                dataType:"json",
                success:function(res){
                    commonObj.closeLoading();
                    if(res.success){
                        var forgetPhoneNo = $.trim($('#userphone').val());
                        localStorage.setItem('forgetPhoneNo',forgetPhoneNo);//存储找回密码用户的手机号
                        localStorage.setItem('userType',6);
                        setTimeout(function(){
                            location.reload();
                        })
                    }else{
                        commonObj.alertMsg('请重获取验证码!');
                    }
                },
                error:function(e){
                    commonObj.closeLoading();
                    commonObj.alertMsg('网络错误!');
                }
            });
        }else if(userType==6){
            var passwordText = $.trim($('#password').val());
            var passwordText2 = $.trim($('#password2').val());
            if(!ppattern.test(passwordText)){
                commonObj.alertMsg("请输入6至20位的密码!");
                return false;
            }
            if(passwordText!=passwordText2){
                commonObj.alertMsg("两次输入的密码不一致!");
                return false;
            }
            var forgetPhoneNo = localStorage.getItem('forgetPhoneNo');
            var userData = {"pwd":$.trim($('#password').val()),"phone":forgetPhoneNo};//userInfo.phone
            commonObj.openLoading();
            $.ajax({
                url:its.configuration.serviceUrl + "/user/userUpdatePwd",
                data:JSON.stringify(userData),
                type:"post",
                contentType:"application/json;charset=UTF-8",
                dataType:"json",
                success:function(res){
                    commonObj.closeLoading();
                    commonObj.alertMsg("密码修改成功!");
                    location.href = '../../login.html';
                },
                error:function(e){
                    commonObj.closeLoading();
                    commonObj.alertMsg('网络错误!');
                }
            });
        }else{
            var passwordText = $.trim($('#password').val());
            var phoneText = $.trim($('#userphone').val());
            var usernameText = $.trim($('#username').val());
            var emailText = $.trim($('#emailphone').val());
            var nameText = $.trim($('#name').val());
            var checkIdText = $.trim($('#checkId').val());
            var companyNameText = $.trim($('#corporation_name').val());
            var carNo1Text = $.trim($('#carNo1').val());
            var carNo2Text = $.trim($('#carNo2').val());
            var allText = $.trim($('#all').val());
            var customCodeText = $.trim($('#ocean_code').val());
            var verCodeText = $.trim($('#checkcode').val());
            var tuser = {"userName":usernameText,"pwd":passwordText,"name":nameText,"phone":phoneText,
                "cardId":checkIdText,"email":emailText,"companyName":companyNameText,
                "companyCode":allText,"custCode":customCodeText,"cardNo1":carNo1Text,
                "carNo2Text":carNo2Text,"status":'',"type":userType,"verCode":verCodeText,
            "phone":userInfo.phone};
            commonObj.openLoading();
            $.ajax({
                url:its.configuration.serviceUrl + "user/updateTuser",
                data:JSON.stringify(tuser),
                type:"post",
                contentType:"application/json;charset=UTF-8",
                dataType:"json",
                success:function(res){
                    commonObj.closeLoading();
                    console.log(res);
                    location.href = "../../login.html";
                },
                error:function(e){
                    commonObj.closeLoading();
                    commonObj.alertMsg("网络错误!")
                }
            });
        }
    });
});

function resetform() {
    $("input").val('');
}