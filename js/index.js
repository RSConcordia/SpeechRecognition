	
	var build = {	
		element: function(type, classe, append){
			var element = document.createElement(type);
				element.setAttribute('class', classe);
			append.appendChild(element);			
			this.element = element;
		}
	};
	
		document.body.onload = function(){
		
			var title = new build.element('h2', 'title', document.body);
				title.element.innerHTML = "Speech Recognition";
//------------------------------------------------------------------------------------------------------------------Spoken		
			var fild = new build.element('input', '', document.body);
				fild.element.setAttribute('type', 'text'); 
				
			var spoken = new build.element('button', 'start', document.body);
				spoken.element.innerHTML = 'Spoken';
				spoken.element.onclick = function(){	
					try{						
						var sound = new SpeechSynthesisUtterance();
							sound.text = fild.element.value;
							sound.lang = 'en-US';
							sound.rate = 1.2;
							sound.onend = function(event) {
								alert('Finished in ' + event.elapsedTime + ' seconds.'); 
							}
							
							speechSynthesis.speak(sound);
					}
					catch(e){
						alert(e.message);	
					}
				}			
//------------------------------------------------------------------------------------------------------------------Talk				
			var talk = new build.element('button', 'start', document.body);
				talk.element.setAttribute('style', 'display: block');
				talk.element.innerHTML = 'Talk';
				talk.element.onclick = function(){
					try{
						talk.element.style.background = '#86DD79';
						var recognition = new SpeechRecognition();
							recognition.onresult = function(event) {
								talk.element.style.background = '#00aeff';
								if (event.results.length > 0){
									talk.element.style.background = '#3b3b3b';
									var blackboard = new build.element('div', 'blackboard', document.body);								
										blackboard.element.innerHTML += event.results[0][0].transcript;
								}
							}			
						recognition.start();
					}
					catch(e){
						talk.element.style.background = '#3b3b3b';
						alert(e.message);	
					}
				}
			
		};