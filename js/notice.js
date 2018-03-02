$(document).ready(function () {
    var urlGetInfo=urlServer+'/sell/notice';
//        var id=getQueryString("id");
    $('h3').html('第二期根源链计算机发售公告');
//        var userId=getCookie("userId");
//        if(userId==undefined){
//            alert("您的登陆信息已失效，请重新登陆");
//            window.location.href='login.html';
//        }
    getInfo();
    function getInfo() {
        $.ajax({
            url:urlGetInfo,
            success:function (data) {
                var code=data.code;
                if(code==200){
                    var list=data.data;
                    if(list.length!=0){
                        $('#buyData tr')[1].remove();
                        for(var i=0;i<list.length;i++){
                            var time=getDeailTime(list[i].buyTime);
                            var status=list[i].status;
                            if(status==0){
                                status='成功';
                            }else{
                                status='失败';
                            }
                            var str='<tr><td>'+list[i].qq+'</td><td>'+time+'</td><td>'+status+'</td></tr>';
                            $('#buyData').append(str);
                        }
                    }
                }else{
                    alert("获取展示信息失败，请重试！");
                }
            },
            error:function (error) {
                console.log(error);
                alert("获取展示信息失败！");
            }
        });
    }
});
