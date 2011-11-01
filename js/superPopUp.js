
(function( $ ){
  $.fn.superPopUp = function(options, details) {
  
	var settings = {			
		'top' : '20%',
		'left' : '50%',
		'padding' : '10px',
		'position' : 'absolute',
		'background-color' : 'white',
		'width' : 'auto',
		'height' : 'auto',
		'border-radius' : '10px',
		'box-shadow' : '0px 0px 10px 10px #333333'
    };
	
	var properties = {
		'containerID' : 'test',
		'atBtnPos' : false,
		'closeButtonID' : 'closeButton'
	}

	this.live("click", function() {        
      // If options exist, lets merge them
      // with our default settings
      if ( options ) { 
        $.extend( settings, options );
      }
	  
	  if ( details ) { 
        $.extend( properties, details );
      }
		
		
		var mLeft = settings.width;
		var mPre = mLeft.replace("px", "");
		var mLrftNew = mPre / 2 ;
			  
		if ($("#"+properties.containerID).length <= 0)
		 {
			var style = $.map(settings, function(val,index) {                    
			     var str = index + ":" + val;
			     return str;
			}).join(";");
			
		var bodyH = document.body.scrollHeight;
		var opacityDiv = "<div id='opacityDiv' style='width:100%; background-color:#111111;opacity:0.7;  filter: alpha(opacity = 70);height:"+bodyH+"px;position: absolute;left:0;top: 0;'></div>";
		  var template = "<div id='"+properties.containerID+"' style='margin-left:-"+mLrftNew+"px;"+style+";'><p></p><a id='"+properties.closeButtonID+"' style='position:absolute;bottom:10px;right:10px;'>Chiudi</a></div>";
		  
	      $('body').append(opacityDiv);
	      $('body').append(template);
		  
		  var ajaxUrl = $(this).attr("name");
		  if(ajaxUrl) {
			/*$.get(ajaxUrl, function(data) {
				$('#'+properties.containerID).append(data);
			});
			*/
			$.getJSON(
				ajaxUrl,
				function(data){
					// ciclo l'array
					for(i=0; i<data.length; i++){
						var content = '<div>';
						content += data[i].nickname + ' ' + data[i].type;
						content += '</div>';
						$('#test').append(content);
					}
				}
			);


			
		  }
		  
		  if (properties.atBtnPos == true) {
			var currentButton = $(this);
			var position = currentButton.offset();
			$("#"+properties.containerID).css("top", position.top);
		  }
			
			$("#"+properties.closeButtonID).live("click", function(){
				$("#"+properties.containerID).remove();
				$("#opacityDiv").remove();

			})
			
		}


    });


  };
})( jQuery );