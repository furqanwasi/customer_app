//= require_tree .

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

});