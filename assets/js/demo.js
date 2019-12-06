type = ['','info','success','warning','danger'];


demo = {
		initPickColor: function(){
			$('.pick-class-label').click(function(){
				var new_class = $(this).attr('new-class');  
				var old_class = $('#display-buttons').attr('data-class');
				var display_div = $('#display-buttons');
				if(display_div.length) {
					var display_buttons = display_div.find('.btn');
					display_buttons.removeClass(old_class);
					display_buttons.addClass(new_class);
					display_div.attr('data-class', new_class);
				}
			});
		},

		initChartist: function(){    

			var data = {
					labels: keys,
					series: [	
					         chartVal,
					         chartBase
					        ]
			};

			var options = {
					seriesBarDistance: 10,
					showArea: true,
					high: Math.ceil(Math.max.apply(Math,chartVal)),
					axisY: {
						
        ticks: ['', 'one', 'two', 'three', 'four', 'five'],
        stretch:true
					},
					axisX: {
						showGrid: false
					},
					
					height: "245px"
					
			};

			var responsiveOptions = [
			                         ['screen and (max-width: 640px)', {
			                        	 seriesBarDistance: 5,
			                        	 axisX: {
			                        		 labelInterpolationFnc: function (value) {
			                        			 return value[0];
			                        		 }
			                        	 }
			                         }]
			                         ];

			Chartist.Line('#chartActivity', data, options, responsiveOptions);

			var dataPreferences = {
					series: [
					         [25, 30, 20, 25]
					        ]
			};

			var optionsPreferences = {
					donut: true,
					donutWidth: 35,
					startAngle: 0,
					total: 100,
					showLabel: false,
					axisX: {
						showGrid: false
					}
			};
			
			Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

			Chartist.Pie('#chartPreferences', {

				labels: [pieChartResult.passPer.toString()+'%',pieChartResult.remainsPer.toString()+'%'],
				series: [pieChartResult.passPer,pieChartResult.remainsPer],
				//labels: ['10%','30%','60%'],
				//series: [10, 30, 60],
			});   
		},

		showNotification: function(from, align){
			color = Math.floor((Math.random() * 4) + 1);

			$.notify({
				icon: "pe-7s-gift",
				message: "Welcome "

			},{
				type: type[color],
				timer: 4000,
				placement: {
					from: from,
					align: align
				}
			});
		}

		
}

