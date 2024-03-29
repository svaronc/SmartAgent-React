class RequestsController < ApplicationController
  before_action :set_request, only: %i[ show update destroy ]

  # GET /requests
  # GET /requests.json
  def index
    @requests = Request.all
  end

  # GET /requests/1
  # GET /requests/1.json
  def show
  end

  # POST /requests
  # POST /requests.json
  def create
    @request = Request.new(request_params)

    if @request.save
      render :show, status: :created, location: @request
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /requests/1
  # PATCH/PUT /requests/1.json
  def update
    if @request.update(request_params)
      render :show, status: :ok, location: @request
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  # DELETE /requests/1
  # DELETE /requests/1.json
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
      params.require(:request).permit(:from_email, :customer_name, :body, :created_at, :title)
    end
end
