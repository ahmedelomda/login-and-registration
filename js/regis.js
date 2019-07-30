$("#regisform").submit(function(e){
					  
		        e.preventDefault();
                var Firstname = document.getElementById("first");
			    var lastname = document.getElementById("last");
                var Email = document.getElementById("user_login");
				var password = document.getElementById("user_pass");
			    var rePassword = document.getElementById("user_repass");
			    var phone = document.getElementById("mobile");
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			    var myPhone = /^\d{11}$/;
			    

				if(!Firstname.value)
                {
                    document.getElementById("div1").innerHTML="Enter your firstname";
                    document.getElementById("div1").style.color="Red";
                   // Firstname.focus();
                } 
			 
				else if(!lastname.value)
                {
				    document.getElementById("div1").innerHTML="";
                    document.getElementById("div2").innerHTML="Enter your lastname";
                    document.getElementById("div2").style.color="Red";
					//lastname.focus();
                    
                }
			          
                 else if((!filter.test(Email.value)))
                {
			        document.getElementById("div2").innerHTML="";
                    document.getElementById("div3").innerHTML="Enter the correct email address";
                    document.getElementById("div3").style.color="Red";
					//Email.focus();
					
                }
                
                   				
				else if( password.value.length < 6 )
				{   
				    document.getElementById("div3").innerHTML="";
	                document.getElementById("div4").innerHTML="Please enter password but not weak";
                    document.getElementById("div4").style.color="Red";
					//password.focus();
					
                }
			 
			    else if( (password.value != rePassword.value) )
				{   
					document.getElementById("div4").innerHTML="";
	                document.getElementById("div5").innerHTML="Password not identical";
                    document.getElementById("div5").style.color="Red";
					//rePassword.focus();
					
                }
			    
			    else if(!phone.value.match(myPhone))
				{
					document.getElementById("div4").innerHTML="";
					document.getElementById("div5").innerHTML="Correct";					document.getElementById("div5").style.color="green";
					document.getElementById("div5").style.fontWeight="bold";
					
                    document.getElementById("div6").style.color="Red";
					//phone.focus();
					document.getElementById("div6").innerHTML="you must enter 11 digits";
				    
				}
	            
	            else{     //connect with backend...
					
				    var firstName = $("#first").val();
                 	var lastName = $("#last").val();
                 	var userName = $("#user_login").val();
                 	var password = $("#user_pass").val();
					var phone = $("#mobile").val();
					 
				 		
                    $.ajax
                    ({
                        type: "POST",
                        //the url where you want to sent the userName and password to
                        url: "http://6.6.7.51/book_store/signup.php",
                        dataType: 'json',
                        async: false,
                        //json object to sent to the authentication url
                        data: {"firstname": firstName , "lastname": lastName ,"email": userName , "password": password , "mobile": phone } ,
                        success: function (data) {
                         	//do any process for successful authentication here
							if(data.status == 1){
							 var myDiv = document.getElementById("divShow");
								myDiv.style.display = 'none';
							    myDiv.style.display = 'block';
							    myDiv.innerHTML = data.message;
							    myDiv.style.backgroundColor = '#dfe3e800';
							    myDiv.style.fontSize = '25px';
							    myDiv.style.fontWeight = 'bold';
							    myDiv.style.color = 'black';
							    myDiv.style.fontFamily = 'Arial (Body CS)';
							    myDiv.style.textAlign = 'center';
	    					    myDiv.style.position = 'absolute';
								myDiv.style.top = '450px';
								myDiv.style.left = '450px';
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
								Firstname.focus();
							}
                        },
						error:function (data) {
							
							alert(data.status);
						}
                    
					});   
					}
                   });

// 

