// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"


var ready = function() {  
     
   }  
   $(document).ready(ready);  
   $(document).on('page:load', ready); 


 jQuery(function () {

   if ($(this).val() == "Other") {
         $("#otherType").show();
   } else {
         $("#otherType").hide();
   }
   $("#customer_budget_type").change(function () {
          if ($(this).val() == "Other") {
              $("#otherType").show();
          } else {
              $("#otherType").hide();
          }
      });

   $("#addRow").click(function(){
      var s = "<label>Other Type</label> <input type='text' /><br>";
      $("#appendLineTextHere").append(s);
      });
  });