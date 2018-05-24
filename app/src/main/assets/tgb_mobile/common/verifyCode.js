///**
// * Created by its on 2018/5/3.
//*/
var verfiCode={};
jQuery(function($){

    /**����һ�������**/
    function randomNum(min, max) {
        var mathValue=Math.floor(Math.random() * (max - min) + min);
        return  mathValue;
    }
    /**����һ�����ɫ**/
    function randomColor(min, max) {
        var r = randomNum(min, max);
        var g = randomNum(min, max);
        var b= randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    var code=drawPic();
    document.getElementById("changeImg").onclick = function(e) {
        $('.verification_code').val("");
        e.preventDefault();
         code=drawPic();
        localStorage.setItem('code',code );
    }
    /**������֤��ͼƬ**/
    function drawPic() {
        var canvas = document.getElementById("canvas");
        var width = canvas.width;
        var height = canvas.height;
        //��ȡ��canvas��2D��ͼ����
        var ctx = canvas.getContext('2d');
        ctx.textBaseline ='bottom';
        /**���Ʊ���ɫ**/
        ctx.fillStyle = randomColor(180,240);
        //��ɫ��̫����ܵ��¿�����
        ctx.fillRect(0,0,width,height);
        /**��������**/
        var str ='ABCEFGHJKLMNPQRSTWXY123456789';
        var code="";
        //�����ĸ���֤��
        for(var i=1;i<=4;i++) {
            var txt = str[randomNum(0,str.length)];
            code=code+txt;
            ctx.fillStyle = randomColor(50,160);
            //�������������ɫ
            ctx.font = randomNum(15,40) +'px SimHei';
            //������������С
            var x =i *15;
            var y = randomNum(25,35);
            var deg = randomNum(-30,30);
            //�޸�����ԭ�����ת�Ƕ�
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI /180);
            ctx.fillText(txt,0,0);
            //�ָ�����ԭ�����ת�Ƕ�
            ctx.rotate(-deg * Math.PI /180);
            ctx.translate(-x, -y);
        }
        return code;
    }
        ///**���Ƹ�����**/=
        // for(var i=0;i<3;i++) {
        //    ctx.strokeStyle = randomColor(40, 180);
        //    ctx.beginPath();
        //    ctx.moveTo(randomNum(0,width/2), randomNum(0,height/2));
        //    ctx.lineTo(randomNum(0,width/2), randomNum(0,height));
        //    ctx.stroke();
        //}
        ///**���Ƹ��ŵ�**/
        //for(var i=0;i <50;i++) {
        //    ctx.fillStyle = randomColor(255);
        //    ctx.beginPath();
        //    ctx.arc(randomNum(0, width), randomNum(0, height),1,0,2* Math.PI);
        //    ctx.fill();
        //}
    localStorage.setItem('code',code );
    verfiCode.verify = drawPic;
});
