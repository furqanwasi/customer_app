
  /**
 * Customer operations
 *
 * @author Furqan Wasi<furqan.wasi66@gmail.com>
 *
 * Customer  Handler
 *
 *
 * @returns {Customer}
 *
 */
   var that;

   function Customer() {
    
    
    that = this;
    that.app_obj = {};

    /**
     *
     * @param app_obj
     */
    this.initialize = function(app_obj) {
        this.app_obj = app_obj;
        fetch_customer_items();
        bindings();
    };

    /**
     *  bindings all methods
     */
    const bindings = function() {
        add_more_items();
        category_change();
    };

    /**
     *  add_more_items
     */
    const add_more_items = function() {
      $('#addRow').on('click', function(){
        console.log("button clicked");
        let rowCount = $("input[type='number']").length;
        add_list_item(rowCount)
      });
    };


    /**
     *  fetch_customer_items
     */
    const fetch_customer_items = function() {
        let data = {
          action: 'fetch_customer_items'
        };
        that.app_obj.classAction($('.edit_customer').data('line-item-list'), data, 'JSON', 'GET', '', that, true);
    };

    /**
     *
     * @param response
     */
    this.fetch_customer_items = function(response) {
        if (response.length > 0) {
            $.each(response, function(key, single_item){
                add_list_item(single_item.budget, single_item.cost, single_item.other)
            });
        } else {
            $('#budgetTable tbody').append('<tr> <td colspan="2"> No Records Found!</td></tr>');
        }
    };

    /**
     * category_change
     */
    const category_change = function(){

        $(document).on('change', ".budgetType", function () {
                //alert(this.value);
                console.log("change clicked");
                if(this.value == 'Other'){
                  $(this).closest('td').find('input').css("display", "block");
                  $('.show_hide').show();
                } else {
                  $(this).closest('td').find('input').css("display", "none");
                }
            });

    };

    /**
     *
     * @param budget
     * @param cost
     * @param other
     */
    const add_list_item = function(budget = '', cost = '', other = '' ){
         let row_count = $(".customers_cost").length;
        
        var addElement = "<tr>"
                    +"<td><input required='true' class='form-control p-2 customers_cost' type='number' placeholder='Cost' name='customer[line_item][" + row_count + "][cost]' id='customer_line_item_" + row_count + "_cost' value='" + cost + "'/></td>"
                    +"<td><select class='form-control budgetType ' name='customer[line_item][" + row_count + "][budget]' id='customer_line_item_" + row_count + "_budget'>"
                    +"<option " + (budget == 'Direct Mail' ? 'selected="selected"' : '') + " value='Direct Mail'>Direct Mail</option>"
                    +"<option " + (budget == 'Skip Tracing' ? 'selected="selected"' : '') + " value='Skip Tracing'>Skip Tracing</option>"
                    +"<option " + (budget == 'Other' ? 'selected="selected"' : '') +" value='Other'>Other</option>"
                    +"</select> <div class='show_hide w-100 mt-2'><input class='form-control w-100 ' placeholder='Other Category' style='" + (budget == 'Other' ? '' : 'display:none;') +"' type='text' name='customer[line_item][" + row_count + "][other]' id='customer_line_item_" + row_count + "_other' value='" + other + "'/></div></td>"
                    +"<td><input type='button' value='X' onclick=\"removeRow(this)\"/></td>"
                    +"</tr>";
                    console.log(addElement);
        $('#budgetTable tbody').append(addElement);

    };

    /**
     *
     * @param response
     * @param container
     * @param requestData
     */
    this.handlecallback = function (response, container, requestData) {
        try {
            eval('this.' + requestData.action + '(response,container,requestData)');
        } catch (err) {
            console.log(err);
        }
    };
}