class Api::V1::RequestsController < ApplicationController
  before_action :set_request, only: %i[show update destroy]

  # GET api/v1/requests
  # GET api/v1/requests.json
  def index
    @requests = Request.all
    render json: @requests, include: { tickets: { include: %i[agent status] }, conversations: {} }
  end

  # GET api/v1/requests/1
  # GET api/v1/requests/1.json
  def show
    render json: @request, inlcude: { ticket: {}, conversations: {} }
  end

  # POST api/v1/requests
  # POST api/v1/requests.json
  def create
    @request = Request.new(request_params.except(:body))
    @conversation = Conversation.new(body: params[:request][:body], request: @request)
    if @request.valid? && @conversation.valid?
      RequestMailer.request_mail(@request, @conversation).deliver_now
      render json: { message: 'Request created' }, status: :created
    else
      Rails.logger.debug @request.errors.full_messages
      Rails.logger.debug @conversation.errors.full_messages
      render json: { request_errors: @request.errors, conversation_errors: @conversation.errors },
             status: :unprocessable_entity
    end
  end

  # PATCH/PUT api/v1/requests/1
  # PATCH/PUT api/v1/requests/1.json
  def update
    if @request.update(request_params)
      render :show, status: :ok, location: @request
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  # DELETE api/v1/requests/1
  # DELETE api/v1/requests/1.json
  def destroy
    @request.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_request
    @request = Request.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def request_params
    params.require(:request).permit(:from_email, :customer_name, :title, :body, :default_status_id, :default_agent_id)
  end
end
