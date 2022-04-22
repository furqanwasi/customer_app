# CustomerListsController Controller
#
class CustomerListsController < ApplicationController

  before_action :set_customer, only: %I[update show]
  # PUT method for updating in database a customer based on id 
  def update
    if @customer.update(line_items: (@customer.present? ? params['customer']['line_item'] : {}))
      flash[:notice] = t('customer_info_update_success')
    else
      flash[:alert] = @customer.errors.full_messages.first
    end
    
    redirect_to customer_path(@customer), status: 303 
  end

  # PUT method for updating in database a customer based on id 
  def show
    respond_to do |format|
      format.html
      format.json { render json: @customer.present? ? @customer.line_items : {} }
    end
  end

  private 
  
  def set_customer
    @customer = Customer.where(id: params[:id]).try(:first)
    unless @customer.present?
      flash[:alert] = t('invlid_url')   
      redirect_to root_path, status: 303 
    end

  end

  def customer_params   
    params.require(:customer).permit(:line_item)   
  end   

end
