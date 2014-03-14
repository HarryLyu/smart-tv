var LinguaLeoAuthorization = {
    isValidAccount: false
}

var bURL = "https://www.google.com/accounts/ClientLogin";
var gmailData=null;
var xhttpObject=null;


LinguaLeoAuthorization.checkAccount = function(id, pw, fnCallback) {
    alert("id=====" + id);
    alert("pw====" + pw);

    //gmailData="accountType=HOSTED_OR_GOOGLE&Email="+id+"&Passwd="+pw+"&service=mail&source=";
    //parsebrowserData(fnCallback);
}



function parsebrowserData(fnCallback)
{
    if (window.XMLHttpRequest)
    {
        if (this.xhttpObject != null) {
            this.xhttpObject.destroy();
        }
        xhttpObject = new XMLHttpRequest();
    }

    if (xhttpObject!=null)
    {
        document.getElementById("check").innerHTML=xhttpObject.responseText;
        xhttpObject.onreadystatechange = function ()
        {
            if (xhttpObject.readyState == 4)
            {
                document.getElementById("check").innerHTML=xhttpObject.responseText;
                if (xhttpObject.status == 200)
                {
                    receivebrowserXHRResponse(fnCallback);
                }

                if(xhttpObject.status == 403)
                {
                    isValidAccount=0;
                    getResponse(fnCallback);
                }
            }
        }

        xhttpObject.open("POST", bURL, true);
        xhttpObject.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhttpObject.send(gmailData);

    }
}


function receivebrowserXHRResponse(fnCallback)
{
    var AuthData=xhttpObject.responseText;
    var startIndex=AuthData.indexOf("Auth");
    var endIndex=AuthData.indexOf("");
    var subStringElement=AuthData.substring(startIndex+5);

    if(subStringElement)
        isValidAccount=1;

    getResponse(fnCallback);
}

function getResponse(fnCallback) {
    fnCallback(LinguaLeoAuthorization.isValidAccount ? 'TRUE' : 'FALSE');
}