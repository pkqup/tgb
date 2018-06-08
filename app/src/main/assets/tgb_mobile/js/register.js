var userType = 1;
$(document).ready(function() {
    //用户注册的下拉选项
    $("#select_box").change(function () {
        var select_now = $("#select_box").val();
        if (select_now == 1) {
            userType = 1;
            $(".contentBox  #checkId_div").css('display', 'block');
            $('.contentBox  #corporation_name_div').css('display', 'none');
            $('.contentBox #ocean_code_div').css('display', 'none');
            $('.contentBox  #all_div').css('display', 'none');
            $('.contentBox  #carNo1_div').css('display', 'none');
            $('.contentBox  #carNo2_div').css('display', 'none');
        } else if (select_now == 2) {
            userType = 2;
            $('.contentBox  #corporation_name_div').css('display', 'block');
            $('.contentBox  #ocean_code_div').css('display', 'block');
            $('.contentBox  #all_div').css('display', 'block');
            $(".contentBox  #checkId_div").css('display', 'none');
            $('.contentBox #carNo1_div').css('display', 'none');
            $('.contentBox  #carNo2_div').css('display', 'none');
        }
        else if (select_now == 3) {
            userType = 2;
            $('.contentBox  #corporation_name_div').css('display', 'block');
            $('.contentBox  #ocean_code_div').css('display', 'block');
            $('.contentBox  #all_div').css('display', 'block');
            $(".contentBox  #checkId_div").css('display', 'none');
            $('.contentBox  #carNo1_div').css('display', 'none');
            $('.contentBox  #carNo2_div').css('display', 'none');
        }
        else if (select_now == 4) {
            userType = 3;
            $('.contentBox #corporation_name_div').css('display', 'block');
            $('.contentBox  #ocean_code_div').css('display', 'none');
            $('.contentBox  #carNo1_div').css('display', 'block');
            $('.contentBox  #carNo2_div').css('display', 'block');
            $('.contentBox  #all_div').css('display', 'none');
            $(".contentBox #checkId_div").css('display', 'block');

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
        $.ajax({
            url:its.configuration.serviceUrl + "/user/sendVertionCode?phone="+phoneNum,
            type:"get",
            success:function(res){
                commonObj.closeLoading();
                if(res.success){

                }else{
                    commonObj.alertMsg('请重获取验证码!');
                }
            },
            error:function(e){
                commonObj.closeLoading();
                commonObj.alertMsg('网络错误!');
            }
        });
        var countDownNum = 60;
        var interval = setInterval(function(){
            isFisrtTime = false;
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
    $('#goBack').on('click',function(){
        location.href = "./login.html";
    });

    $('input').on('click',function(e){
        //console.log(e.clientX, e.clientY);
        //commonObj.flexibleInput(e,".contentBox");
        //commonObj.flexibleInput("#inputFlexBox");
    });
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
        var epattern =/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(!epattern.test(emailText)){
            commonObj.alertMsg("邮箱格式不正确!")
            return false;
        };
    });
    $('#checkId').change(function(){
        var checkIdText = $.trim($('#checkId').val());
        var ipattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(!ipattern.test(checkIdText)){
            commonObj.alertMsg("身份证格式不正确!");
            return false;
        };
    });
    $('#password').change(function(){
        var passwordText = $.trim($('#password').val());
        var ppattern = /^[a-zA-Z0-9_~!@#$%^&*]{6,19}$/;
        if(!ppattern.test(passwordText)){
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
    $('#submitData').off('click');
    $('#submitData').on('click',function(){
        for(var i=0;i<$('.contentBox input').length;i++){
            if($('.contentBox input').eq(i).parent().css('display')=='block'||$('.contentBox input').eq(i).parent().css('display')=='inline-block'){
                var text = $.trim($('.contentBox input').eq(i).val());
                if(text==''){
                    commonObj.alertMsg ($('.contentBox input').eq(i).attr('placeholder')+"不能为空!");
                    //break;
                    return false;
                }
            }
        }
        var passwordText = $.trim($('#password').val());
        var phoneNum = $.trim($('#userphone').val());
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
        var passwordText2 = $.trim($('#password2').val());
        var ppattern = /^[a-zA-Z0-9_~!@#$%^&*]{6,19}$/;
        var mPattern =/(1[3-9]\d{9}$)/;
        var epattern =/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var ipattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

        if(!mPattern.test(phoneNum)){
            commonObj.alertMsg("电话号码格式不正确!")
            return false;
        }
        if(!ppattern.test(passwordText)){
            commonObj.alertMsg("请输入6至20位的密码!");
            return false;
        }
        if(passwordText!=passwordText2){
            commonObj.alertMsg("两次输入的密码不一致!");
            return false;
        }
        if(!epattern.test(emailText)){
            commonObj.alertMsg("邮箱格式不正确!")
            return false;
        }
        if(userType == 1||userType == 3){
            if(!ipattern.test(checkIdText)){
                commonObj.alertMsg("身份证格式不正确!");
                return false;
            }
        }

        var userData = {"userName":usernameText,"pwd":passwordText,"name":nameText,"phone":phoneNum,
            "cardId":checkIdText,"email":emailText,"companyName":companyNameText,
            "companyCode":allText,"custCode":customCodeText,"cardNo1":carNo1Text,
            "carNo2Text":carNo2Text,"status":'',"type":userType,"verCode":verCodeText};
        commonObj.openLoading();
        $.ajax({
            url:its.configuration.serviceUrl + "/user/userAdd",
            data:JSON.stringify(userData),
            type:"post",
            contentType:"application/json;charset=UTF-8",
            dataType:"json",
            success:function(res){
                commonObj.closeLoading();
                if(res.success){
                    commonObj.alertMsg("注册成功!");
                    setTimeout(function(){
                        location.href = "login.html";
                    },300);
                }else{
                    commonObj.alertMsg(res.object);
                }

            },
            error:function(e){
                commonObj.closeLoading();
                commonObj.alertMsg("网络错误!")
            }
        });
    });
});
function checkPassword() {
    var pass1 = $("#password").val();
    var pass2 = $("#password2").val();
    if (pass1 != pass2) {
        document.getElementById("password2").setCustomValidity('两次密码不一致');
    }
    else {
        document.getElementById("password2").setCustomValidity('');
    }
}
function resetform(){
    $("input").val('');
}
