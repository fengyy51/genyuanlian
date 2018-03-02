$('#qq').blur(function () {
    var qqVal=$('#qq').val();
    if(qqVal==''){
        $('#qqNull').css("display","block");
    }else{
        $('#qqNull').css("display","none");
    }
    var reg=/^[1-9][0-9]{4,10}$/;
    if(reg.test(qqVal)){
        $('#qqWrong').css("display","none");
    }else{
        $('#qqWrong').css("display","block");
    }

});

$('#email').blur(function () {
    var emailVal=$('#email').val();
    if(emailVal==''){
        $('#emailNull').css("display","block");
    }else{
        $('#emailNull').css("display","none");
    }
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if(reg.test(emailVal)){
        $('#emailWrong').css("display","none");
    }else {
        $('#emailWrong').css("display","block");
    }
});
$(document).ready(function () {
    //    <!--获取用户信息-->
    var userId=getCookie("userId");
    if(userId==undefined){
        alert("您的登陆信息已失效，请重新登陆");
        window.location.href='login.html';
    }
    var id=getQueryString("id");
    $('#submit').click(function () {
        var qqVal=$('#qq').val();
        var emailVal=$('#email').val();
        var numVal=$('#num').val();

        if(numVal==''){
            $('#numNull').css("display","block");
        }else{
            $('#numNull').css("display","none");
        }
        if(parseInt(numVal)<=2&&parseInt(numVal)>0){
            $('#numWrong').css("display","none");
        }else {
            $('#numWrong').css("display","block");
        }

        if(qqVal!=''&&emailVal!=''&&numVal!=''&&parseInt(numVal)<=2&&parseInt(numVal)>0){
            var vali_status=false;
            $('.vali_fail').each(function () {
                if($(this).css("display")=='block'){
                    vali_status=true;
                }
            });
            console.log(vali_status)
            if(vali_status==false){
                $('#submit').attr("disabled",true);
                postForm();
            }

        }else{
            alert("有必填项未按要求填写")
        }

    })
    function postForm() {
        var urlPostBuy=urlServer+'/sell/do-buy';
        var qq=$('#qq').val(),
            num=$('#num').val(),
            email=$('#email').val();

        $.ajax({
            url:urlPostBuy,
            type:"POST",
            data:{
                userId:userId,
                email:email,
                qq:qq,
                num:num,
            },
            success:function (data) {
                console.log(data);
                var code=data.code;
                if(code==200){
                    var result=data.data.result;
                    if(result==true){
                        alert("购买成功!");
                        window.location.href='result.html';
                    }else{
                        alert("抱歉，本产品已售完！");
                        window.location.href='result.html';
                    }
                }else{
                    $('#submit').removeAttr("disabled");
                    console.log(data);
                    alert("系统繁忙，请重新提交!")
                }
            },
            error:function (error) {
                $('#submit').removeAttr("disabled");
                console.log(error);
                alert("提交购买信息失败！");
            }
        })
    }
})