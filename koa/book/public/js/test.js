/**
 * Created by wanglinfei on 2017/4/6.
 */

function queryList(){
    $.ajax({
        url: servUrl,
        data: {
            'pathL':'/articleTag/usedList',
            'num':6
        },
        type: 'get',
        cache: false,
        dataType: "json",
        timeout: 30000,
        success: function (res) {
           console.log(res);
        },
        error: function (res) {
            console.log(res);
        }
    });
}
queryList();
$('.pagination').paging({
    pageNo: 10,
    totalPage: 100,
    callback: function (data) {
        console.log($(this)[0].pageNo)
    }
});
function submitW() {
    var aFile=$('#uploadForm input').get(0).files[0];
    console.log(aFile);
    var data = new FormData();
    data.append("file", aFile);
    var xhr = getXMLHttpRequest();
    xhr.open("post", servpath+'/uploadImg?small=true');
    xhr.send(data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = eval('(' + xhr.responseText + ')');
            $('.uploadImg').attr('src',data.data.url);
        }
    };
}
function getXMLHttpRequest() {
    var xmlHttpRequest;
    if (window.XMLHttpRequest) {
        xmlHttpRequest = new XMLHttpRequest();
        if (xmlHttpRequest.overrideMimeType) {
            xmlHttpRequest.overrideMimeType("text/xml");
        }
    } else if (window.ActiveXObject) {
        var activexName = [ "MSXML2.XMLHTTP", "Microsoft.XMLHTTP" ];
        for ( var i = 0; i < activexName.length; i++) {
            try {
                xmlHttpRequest = new ActiveXObject(activexName[i]);
                if(xmlHttpRequest){
                    break;
                }
            } catch (e) {
            }
        }
    }
    return xmlHttpRequest;
}
$('.imgCode').attr('src',servpath+'/imgVerifyCode/'+new Date()).click(function(){
    $(this).attr('src',servpath+'/imgVerifyCode/'+new Date());
});
$('.goUsers').click(function(){
    window.location.href='/html/wang.html';
});



