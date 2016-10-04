(function() {
	"use strict";
	
	// https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#examples
	
	this.addEventListener("load", function() {
		
		var spoken = document.getElementById("spoken"),
			talk = document.getElementById("talk"),
			language = document.getElementById("language"),
			field = document.getElementById("field"),
			section = document.getElementById("section");
		
		var app = {
			initialize: function() {
				document.addEventListener("deviceready", this.deviceready);
				
			},
			deviceready: function() {
				app.write("DeviceReady");
				
			},
			talk: function() {
				try{
					talk.style.background = '#86DD79';
					
					var recognition = new SpeechRecognition();
						recognition.onresult = function(e) {
							talk.style.background = '#00aeff';
							if (e.results.length > 0) {
								talk.style.background = '#3b3b3b';
								app.write(e.results[0][0].transcript);
							}
						}
					recognition.start();
				} catch(e) { alert(e.message); }
			},
			
			spoken: function() {
				try {
					var sound = new SpeechSynthesisUtterance();
						sound.text = field.value;
						sound.lang = language.value;
						sound.rate = 1.2;
						sound.onend = function(data) {
							var t = (JSON.stringify(data) == "{}")? "☺" : "☹";
							app.write("Spoken: "+t);
						};
						speechSynthesis.speak(sound);
						
				} catch(e) { alert(e.stack); }
			},
			
			write: function(e) {
				section.innerHTML += "<p>"+e+"</p>";
			}
		};
		
		talk.addEventListener("click", app.talk);
		spoken.addEventListener("click", app.spoken);
		
		app.initialize();		
	}, false);
}).call(this);
