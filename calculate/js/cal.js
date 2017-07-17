window.onload=function(){
	clickFun();
}
//点击功能
function clickFun(){
	var container=document.getElementById('container');
	var cal=document.getElementById('calc'),
		winTool=document.getElementById('win_tool'),
		equals=document.getElementById('equals'),//等于号
		remove=document.getElementById('remove');//删除符号
	var reset=document.getElementById('reset'),
		remove=document.getElementById('remove');
		/***三个按钮区***/
		var close=document.getElementById('close'),
		    max=document.getElementById('max'),
		    min=document.getElementById('min');

		/***结果区域***/
		var spans=document.querySelectorAll("#bottom span");
		var express=document.getElementById('express'),
		    res=document.getElementById('res'),
		    keyBorde=null;
		 var preKey='';
		/*符号*/
		var symbol={
			"+":"+",
			"-":"-",
			"*":"*",
			"/":"/",
			"%":"%",
			"=":"="
		}

		/***鼠标划过三个小按钮显示功能图标***/
		max.onmouseover=close.onmouseover=function(){
			this.innerHTML=this.dataset.ico;
		}
		max.onmouseout=close.onmouseout=function(){
			this.innerHTML="&nbsp;";
		}
		/*******关闭按钮功能*******/
		close.onclick=function(e){
			var h=cal.offsetHeight+15;
			cal.style.webkitTransform="translateY("+h+"px)";
			cal.style.transform="translateY("+h+"px)";
			e.stopPropagation();
		}
		/*******点击键盘功能********/
		
		/*****键盘按钮*****/
		for(var i=0;i<spans.length;i++){
			keyBorde=spans[i];
			keyBorde.onclick=function(){
				var number=this.dataset["number"];
				clickNumber(number);
			}
		}
		/*****点击键盘进行输入***/
		function clickNumber(number){
			var resVal=res.innerHTML,//结果内容
				expVal=express.innerHTML;
			//表达式最后一位符号
			var lastsymbol=expVal.substring(expVal.length-1,expVal.length);
			//如果点击的不是删除键和复位键才能进行输入	
			if(number !=="<-" || number !=="CE"){
				//是否已经存在点，如果存在不能再输入点了，且上一个字符不是符号字符
				var hasPoint=(resVal.indexOf('.') !== -1)?true:false;
				if(hasPoint && number==="."){
					//上一个字符如果是符号的话，变成0的形式
					if(symbol[preKey]){
						res.innerHTML="0";
					}else{
						return false;
					}
				}
				// //转换显示符 可以省略.
				// if(isNaN(number)){
				// 	number=number.replace(/\*/g,'×').replace(/\//g,'÷');
				// }
				//如果输入的是不是上述的符号的话，就要固定长度
				if(!symbol[number] && resVal.length > 12){
					return false
				}
				//点击的是符号
				if(symbol[number]){
					//上次点击的是符号键
					if(preKey !== "=" && symbol[preKey]){
						express.innerHTML=expVal.slice(0,-1)+number;

					}else{
						if(expVal=""){
							express.innerHTML=resVal+number;
						}else{
							express.innerHTML+=resVal+number;
						}
						if(symbol[lastsymbol]){
							expVal=express.innerHTML.replace(/×/g,"*").replace(/÷/,"/");
							res.innerHTML=eval(expVal.slice(0,-1));
						}
					}
				}else{
					 //如果首位是符号，0
                	if((symbol[number] || symbol[preKey] || resVal=="0") && number !== '.'){
                    	res.innerHTML = "";
                	}
                	res.innerHTML += number;
				}
				preKey = number;
			}
		}
		/***点击等于号计算结果****/
		equals.onclick=function(){
			calEquals()
		}
		function calEquals(){
			var expVal=express.innerHTML,
				resVal=res.innerHTML,
				val="";
			if(expVal){
				var symbolLast=expVal.substring(expVal.length-1,expVal.length);
				var temp="";
				if(symbol[symbolLast] && resVal){
					temp=expVal.replace(/×/g,"*").replace(/÷/,"/");
					temp = eval(temp.slice(0,-1)) + symbol[symbolLast] + resVal;
				}else{
					temp = expVal.replace(/×/g,"*").replace(/÷/,"/");
				}
				val = eval(temp);
				express.innerHTML = "";
                res.innerHTML = val;
                preKey = "=";
			}
		}
		/*******复位操作*****/
		reset.onclick=function(){
			express.innerHTML="";
			res.innerHTML="0";
		}
		/****减位操作***/
		remove.onclick = function(){
        	var tempRes = res.innerHTML;
        	if(tempRes.length>1){
            	tempRes = tempRes.slice(0,-1);
            	res.innerHTML = tempRes;
        	}else{
            	res.innerHTML = 0;
        	}
    	};
}