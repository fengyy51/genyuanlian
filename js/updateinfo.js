$('#address').blur(function () {
    var addressVal=$('#address').val();
    if(addressVal==''){
        $('#addressNull').css("display","block");
    }else{
        $('#addressNull').css("display","none");
    }
});

$('#name').blur(function () {
    var nameVal=$('#name').val();
    if(nameVal==''){
        $('#nameNull').css("display","block");
    }else{
        $('#nameNull').css("display","none");
    }
    var reg=/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
    if(reg.test(nameVal)){
        $('#nameWrong').css("display","none");
    }else{
        $('#nameWrong').css("display","block");
    }
});
$('#phone').blur(function () {
    var phoneVal=$('#phone').val();
    if(phoneVal==''){
        $('#phoneNull').css("display","block");
    }else{
        $('#phoneNull').css("display","none");
    }
    var reg=/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/;
    if(reg.test(phoneVal)){
        $('#phoneWrong').css("display","none");
    }else{
        $('#phoneWrong').css("display","block");
    }
});
//    <!--获取用户信息-->
$(document).ready(function () {
    var userId=getCookie("userId");
    if(userId==undefined){
        alert("您的登陆信息已失效，请重新登陆");
        window.location.href='login.html';
    }
    //
    var id=getQueryString("id");
    var urlGetInfo=urlServer+'/sell/get-detail-by-id';
    //获取初始注册信息
    getInfo();
    function getInfo() {
        $.ajax({
            url:urlGetInfo,
            type:"GET",
            data:{
                id:id,
            },
            success:function (data) {
                var code=data.code;
                if(code==200){
                    var period=data.data.period,
                        num=data.data.buyNum,
                        address=data.data.address,
                        name=data.data.name,
                        phone=data.data.phone;
//                            email=data.data.email;
                    if(period==1){
                        period="第二期根源链计算机";
                    }
                    $('#product').val(period);
                    $('#num').val(num);
                    $('#address').val(address);
                    $('#name').val(name);
                    $('#phone').val(phone);
//                        $('#email').val(email);
                }else{
                    alert("获取个人信息失败，请重试！");
                }
            },
            error:function (error) {
                console.log(error);
                alert("获取个人信息失败！");
            }
        });
    }
    $('#submit').click(function () {
        var addressVal=$('#address').val();
        var nameVal=$('#name').val();
        var phoneVal=$('#phone').val();
//            var emailVal=$('#email').val();

//            if(emailVal==''){
//                $('#emailNull').css("display","block");
//            }else{
//                $('#emailNull').css("display","none");
//            }
//            var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
//            if(reg.test(emailVal)){
//                $('#emailWrong').css("display","none");
//            }else {
//                $('#emailWrong').css("display","block");
//            }
        if(addressVal!=''&&nameVal!=''&&phoneVal!=''){
            var vali_status=false;
            $('.vali_fail').each(function () {
                if($(this).css("display")=='block'){
                    vali_status=true;
                }
            });
            if(vali_status==false){
                $('#submit').attr("disabled",true);
                postForm();
            }

        }else{
            alert("有必填项未按要求填写")
        }

    })
    function postForm() {
        var urlPostInfo=urlServer+'/sell/update-buy-detail';
        var address=$('#address').val(),
            name=$('#name').val(),
            phone=$('#phone').val();
//                email=$('#email').val();

            $.ajax({
            url:urlPostInfo,
            type:"POST",
            data:{
                address:address,
                name:name,
                phone:phone,
//                    email:email,
                id:id,
            },
            success:function (data) {
                var code=data.code;
                if(code==200){
                    var result=data.data.result;
                    if(result==true){
                        alert("信息确认成功!");
                        window.location.href='result.html';
                    }else{
                        $('#submit').removeAttr("disabled");
                        alert("信息确认失败！");
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
                alert("提交确认信息失败！");
            }
        });
    }
})