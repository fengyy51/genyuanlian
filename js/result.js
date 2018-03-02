$(document).ready(function () {
    var urlGetInfo=urlServer+'/sell/init';
    var userId=getCookie("userId");
    console.log(userId);
    if(userId==undefined){
        alert("您的登陆信息已失效，请重新登陆");
        window.location.href='login.html';
    }else{
        getInfo();
    }

    function getInfo() {
        $.ajax({
            url:urlGetInfo,
            type:"GET",
            data:{
                userId:userId,
            },
            success:function (data) {
                var code=data.code;
                if(code==200){
                    var isBegin=data.data.isBegin,
                        isOver=data.data.isOver,
                        isAbleToBuy=data.data.isAbleToBuy,
                        list=data.data.list;
                    // isBegin=false;
                    // isOver=true;
                    // isAbleToBuy=false;
                    // list=[];
//                        时间开始，未售罄情况下判断能否购买
                    if(isBegin==true){
                        if(isOver==true){
                            $('#buy1').html('已售罄');
                            $('#buy1').attr("disabled",true);
                            $('#buy1').attr("title",'商品已售罄');
                        }else {
                            if(isAbleToBuy==false){
                                $('#buy1').html('已购买');
                                $('#buy1').attr("disabled",true);
                                $('#buy1').attr("title",'您已购买');
                            }else{
                                $('#buy1').removeAttr("disabled");
                                $('#buy1').attr("title",'');
                            }
                        }
                    }
                    $('.notice')
                    // $('.notice').attr('title','');
                    if(list.length!=0){
                        $('#buyData tr')[1].remove();
                        for(var i=0;i<list.length;i++){
                            var time=getDeailTime(list[i].buyTime);
                            var period;
                            if(list[i].period==1){
                                period='第二期根源链计算机'
                            }
                            var status=list[i].status;
                            var btn='';
                            var id=list[i].id;
                            console.log(id);
                            if(status==0){
                                status='成功';
                                btn='<a href="updateInfo.html?id='+id+'"><button type="button" class="info btn btn-primary" id="'+list[i].id+'"class="btn btn-primary" style="margin-right: 10px;">确认信息</button> </a>' ;
                            }else{
                                status='失败';
//                                    btn='<button type="button" class="info" disabled class="btn btn-primary" style="margin-right: 10px;">购买</button>';
                            }
                            var str='<tr><td>'+list[i].id+'</td><td>'+time+'</td><td>'+period+'</td><td>'+list[i].buyNum+'台</td>' +
                                '<td>'+list[i].qq+'</td><td>'+list[i].email+'</td><td>'+status+'</td><td>'+list[i].address+'</td>'+
                                '<td>'+list[i].name+'</td><td>'+list[i].phone+'</td><td>'+btn+'</td></tr>';
                            $('#buyData').append(str);
                        }
                    }
                }else{
                    console.log(data);
                    alert("获取展示信息失败，请重试！");
                }
            },
            error:function (error) {
                console.log(error);
                alert("获取展示信息失败！");
            }
        });
    }
//        确认信息点击
//     var infos=$('.info');
//     for(var i=0;i<infos.length;i++){
//         infos[i].click(function (event) {
//             console.log('s');
//             var id=$(this).parent("tr").find('td')[0];
//             window.location.'+id;
//         })
//     }
//
//     console.log($('.info'));
//        购买点击
    $('.buy').click(function (event) {
//            var id=$(this).parent("tr").find('td')[0];
        window.location.href='buying.html';
    })
//        公告点击
    $('.notice').click(function (event) {
//            var id=$(this).parent("tr").find('td')[0];
        window.location.href='notice.html';
    })
    console.log($('.info').val());
});
