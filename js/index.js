	
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
			
			var start = new build.element('button', 'start', document.body);
				start.element.innerHTML = 'Start';
				start.element.onclick = function(){	
					try{
						var recognition = new SpeechRecognition();
							recognition.onresult = function(event) {	
								if (event.results.length > 0){			
									var blackboard = new build.element('div', 'blackboard', document.body);								
										blackboard.element.innerHTML += event.results[0][0].transcript;
								}
							}			
						recognition.start();
					}
					catch(e){
						alert(e.message);	
					}
				}
		};