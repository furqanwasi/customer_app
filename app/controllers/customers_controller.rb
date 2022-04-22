# CustomersController Controller
#

class CustomersController < ApplicationController
  before_action :set_customer, only: %I[show edit destroy]
  
  # GET method to get all customers from database   
  def index
    #@customers = Customer.all
    @customers = Customer.order(:name).page(params[:page]).per(10)
  end

  # GET method to get a customer by id  
  def show
  end

  # GET method
  def show_json
    @customer =  Customer.order(:name).page(params[:page]).per(2)
    respond_to do |format|
      format.html
      format.json
    end
  end

  # GET method for the new customer form   
  def new
    @customer = Customer.new
  end

  # POST method for processing form data
  def create
    
    @customer = Customer.new(customer_params)
    if@customer.save
      flash[:notice] = t('customer_added_success')
      redirect_to root_path
    else
      flash[:alert] = @customer.errors.full_messages.first
      redirect_to new_customer_path(), status: 303 
    end
  end

   # GET method for editing a customer based on id  
  def edit
  end

  # PUT method for updating in database a customer based on id 
  def update
    @customer = Customer.find(params[:id])
    if @customer.update(customer_params)
      flash[:notice] = t('customer_update_success')
      redirect_to root_path   
    else   
      flash[:alert] = @customer.errors.full_messages.first
      redirect_to edit_customer_path(@customer), status: 303    
    end  
  end
  
   # DELETE method for deleting a customer from database based on id  
  def destroy
    if @customer.destroy   
      flash[:notice] = t('customer_delete_success')
      redirect_to root_path, status: 303 
      #redirect_to customer_path(), status: 303 
    else   
      flash[:alert] = t('customer_delete_failed')
      render :destroy   
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
    params.require(:customer).permit(:name, :email, :cost, :budget_type, :other_type, :line_items)   
  end   

end
