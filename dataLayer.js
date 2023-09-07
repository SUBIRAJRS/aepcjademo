var pageName;
var channel="";
var userId="";
var loginStatus="";
var prodId;
var prodName;
var prodPrice;
var prodBrand;
var n;
var cartItemCount="";
var checkValue=location.pathname.split(".")[0].split("/");
var length=location.pathname.split(".")[0].split("/").length;
var pageName2="gm"
for(var i=0;i<length;i++)
    {
        if (checkValue[i]=="geometrix-site")
        {
         
           n=i;
            break;
        }
    }
for(var i=n+1;i<length;i++)
    {
	 channel=checkValue[n+1];
        if(checkValue[i].indexOf(checkValue[i-1])>-1)
        {
                    pageName2=pageName2;
                   
        }
        else
        {
                    pageName2=pageName2+":"+checkValue[i];
                    
        }
    }
	pageName=pageName2;
	
	if(location.pathname==="/aepcdpfg/geometrix-site/" || location.pathname.indexOf("index.html")>-1 )
{
pageName="gm:homepage";
channel="home";
title="homepage";
}
if(document.getElementsByClassName("product")[0])
{
var pdpProduct=document.getElementsByClassName("product")[0].innerText.split("\n");
 prodId=pdpProduct[5].split(":")[1].trim();
prodName=pdpProduct[2];
prodPrice=parseInt(pdpProduct[4].split(":")[1].slice(2).trim());
prodBrand=pdpProduct[3].slice(2).trim();
}	
function getParameterByName(name, url = window.location.href) {1
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

	if(localStorage.getItem("cartItems"))
	{
	var cartItemSubi = [];
	var cartSubi = localStorage.getItem("cartItems").split("&");
	cartItemCount=cartSubi.length;
cartSubi.forEach(function(item, index, array){
var individualItem=item.split("|");
cartItemSubi.push({
"SKU": individualItem[0],
"name":individualItem[1],
"quantity":individualItem[4],
"priceTotal":individualItem[3]
});
});
}
	
if(document.URL.indexOf("userId")>-1)
{
 localStorage.setItem("userId", getParameterByName('userId'));
      }
	  if(localStorage.getItem("userId"))
	  {
	  userId=localStorage.getItem("userId");
	  loginStatus="loggedIn";
	  }
	  else
	  {
	  userId="";
	  loginStatus="anonymous";

	  }
window.digitalData = {
  "page": {
    "pageInfo": {
      "breadcrumbs": "",
      "pageShortName": "",
      "pageName":pageName,
	  "channel":channel,
      "destinationURL":document.URL,
      "isIframe": false,
      "contentIframe": false,
      "hierarchie1":"",
      "title": "",
      "internalPageName": "",
      "pageID": "",
      "tagging": "",
      "server": "tealium.coolpage.biz",
      "urlShortcut": ""
    },
    "category": {
      "type": "",
      "version": ""
    },
    "attributes": {},
    "components": []
  },
  "product": [
    {
      "productInfo": {
        "sku": prodId,
        "title": prodName,
        "price": prodPrice,
		"brand":prodBrand
      }
    }
  ],
  "cart": {
    
    "cartEntries": cartItemSubi
  },
  "user": [
    {
      "profile": [
        {
          "profileInfo": {},
          "attributes": {
            "loggedIn": loginStatus,
            "username": userId
          }
        }
      ]
    }
  ],
  
  "language": "en"
};
window.digitalData.page.pageInfo.referringURL = document.referrer;
window.digitalData.page.pageInfo.sysEnv = navigator.userAgent;
function cartItems()
{
if(document.getElementsByClassName("product")[0])
{
    {
	var productDetails=document.getElementsByClassName("product")[0].innerText.split("\n");
        var cartProducts=productDetails[5].split(":")[1].trim()+"|"+productDetails[2]+"|"+productDetails[3].slice(2).trim()+"|"+parseInt(productDetails[4].split(":")[1].slice(2).trim())+"|"+1;
		var cartProductNew=productDetails[5].split(":")[1].trim()+"|"+productDetails[2]+"|"+productDetails[3].slice(2).trim()+"|"+parseInt(productDetails[4].split(":")[1].slice(2).trim());
		
      
        if(localStorage.getItem("cartItems"))
           {
           if(localStorage.getItem("cartItems").indexOf(productDetails[5].split(":")[1].trim())>-1)
           {      
		   
		   var ar=localStorage.getItem("cartItems").split("&");
arlength=ar.length;
var newprodlist="";
for(var i=0;i<arlength;i++)
    {
        if(ar[i].indexOf(productDetails[5].split(":")[1].trim())>-1)
        {
            var check=ar[i].split("|");
            var checklength=check.length;
            var quantity=parseInt(check[checklength-1])+1;
            ar[i]=cartProductNew+"|"+quantity;
			console.log("hoo"+ar[i]);
          
        }
		if(i==(arlength-1))
		{
		 newprodlist=newprodlist+ar[i];
		 }
		 else
		 {
		 newprodlist=newprodlist+ar[i]+"&";
		 }
    }
	localStorage.setItem("cartItems",newprodlist)
	
               }
			   else
			   {
			   localStorage.setItem("cartItems",localStorage.getItem("cartItems")+"&"+cartProducts);
			   }
        }
        else
        {
           
            localStorage.setItem("cartItems",cartProducts);
        }
    
	if(localStorage.getItem("cartItems"))
	{
	//console.log("enterd");
	var cartItemSubiAdd = [];
	var cartSubiAdd = localStorage.getItem("cartItems").split("&");
	
cartSubiAdd.forEach(function(item, index, array){
var individualItemAdd=item.split("|");
cartItemSubiAdd.push({
"SKU": individualItemAdd[0],
"name":individualItemAdd[1],
"quantity":individualItemAdd[4],
"priceTotal":individualItemAdd[3]
});
});
if(digitalData)
{
	//console.log("enterd2");

digitalData.cart.cartEntries=cartItemSubiAdd;
}
}
	}
	}
  simpleCart.add('name='+prodName,'price='+prodPrice);

}
