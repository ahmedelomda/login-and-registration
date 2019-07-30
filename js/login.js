$("#loginform").submit(function(e){
					  
		        e.preventDefault();
                var Email = document.getElementById("user_login");
				var password = document.getElementById("user_pass");
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

              
                if((!filter.test(Email.value)) || Email.value == "")
                {
                    document.getElementById("div1").innerHTML="Enter the correct email address";
                    document.getElementById("div1").style.color="Red";
					Email.focus();
					
                }
                 else if(password.value.length < 6 || password.value == "")
                {
                   
                   document.getElementById("div1").innerHTML="";
					document.getElementById("div2").innerHTML="Please enter password but not weak";
                    document.getElementById("div2").style.color="Red";
					password.focus();
					
                }
                 
		//connect with backend... (api)	
	
               else {
                 	var userName = $("#user_login").val();
                 	var password = $("#user_pass").val();
										
                    $.ajax
                    ({
                        type: "POST",
                        //the url where you want to sent the userName and password to
                        url: "http://6.6.7.51/book_store/login.php",
                        dataType: 'json',
                        async: false,
                        //json object to sent to the authentication url
                        data: {"email": userName , "password": password } ,
                        success: function (data) {
                         	//do any process for successful authentication here
							if(data.status == 1){
							    var myDiv = document.getElementById("divShow");
								myDiv.style.display = 'none';
							    myDiv.style.display = 'block';
							    myDiv.innerHTML = data.message;
							    myDiv.style.backgroundColor = '#dfe3e800';
							    myDiv.style.fontSize = '30px';
							    myDiv.style.fontWeight = 'bold';
							    myDiv.style.color = 'black';
							    myDiv.style.fontFamily = 'Arial (Body CS)';
							    myDiv.style.textAlign = 'center';
							    myDiv.style.marginTop = '160px';
							    setTimeout(function(){
									 window.open("index.html","_self"); }, 5000);
							
							}else{
							var myShow = document.getElementById("error");
							myShow.innerHTML = data.message;
						    myShow.style.fontSize = '15px';
							myShow.style.fontWeight = 'bold';
							myShow.style.color = 'red';
							myShow.style.fontFamily = 'Arial (Body CS)';
						    myShow.style.textAlign = 'center';
						
								
							}
							
                        },
						error:function (data) {
							
							alert(data.status);
							
						}
						
                     });
			       }
                 });

