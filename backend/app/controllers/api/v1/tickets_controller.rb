class Api::V1::TicketsController < ApplicationController
  before_action :set_ticket, only: %i[show update destroy]

  # GET /tickets
  # GET /tickets.json
  def index
    render json: @tickets = Ticket.all
  end

  # GET /tickets/1
  # GET /tickets/1.json
  def show
  end

  # POST /tickets/1/responses
  def respond
    @ticket = Ticket.includes(:request).find(params[:ticket_id])
    @response = params[:response]
    ApplicationMailer.ticket_response(@ticket, @response).deliver_now
    render json: { message: 'Response sent' }, status: :ok
  end

  # POST /tickets
  # POST /tickets.json
  def create
    @ticket = Ticket.new(ticket_params)

    if @ticket.save
      render :show, status: :created, location: @ticket
    else
      render json: @ticket.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tickets/1
  # PATCH/PUT /tickets/1.json
  def update
    if @ticket.update(ticket_params)
      render :show, status: :ok, location: @ticket
    else
      render json: @ticket.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tickets/1
  # DELETE /tickets/1.json
  def destroy
    @ticket.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_ticket
    @ticket = Ticket.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def ticket_params
    params.require(:ticket).permit(:agent_id, :request_id, :status_id)
  end
end
