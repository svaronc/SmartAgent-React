class Api::V1::TicketsController < ApplicationController
  before_action :set_ticket, only: %i[show update destroy]

  # GET api/v1/tickets
  # GET api/v1/tickets.json
  def index
    @tickets = Ticket.all
    render json: @tickets.as_json(include: {
                                    conversations: {
                                      methods: :attachments_urls
                                    }
                                  })
  end

  # GET api/v1/tickets/1
  # GET api/v1/tickets/1.json
  def show
    ticket = Ticket.find(params[:id])
    render json: ticket.as_json(include: {
                                  conversations: {
                                    methods: :attachments_urls
                                  }
                                })
  end

  # POST api/v1/tickets
  # POST api/v1/tickets.json
  def create
    @ticket = Ticket.new(ticket_params.except(:body))

    if @ticket.save
      @ticket.conversations.create!(body: ticket_params[:body], from_customer: true)
      render json: @ticket, status: :created
    else
      render json: @ticket.errors, status: :unprocessable_entity
    end
  end

  def respond
    @ticket = Ticket.find(params[:ticket_id])
    response = params[:response]

    ApplicationMailer.ticket_response(@ticket, response).deliver_now

    render json: { message: 'Response sent' }, status: :ok
  end

  # PATCH/PUT api/v1/tickets/1
  # PATCH/PUT api/v1/tickets/1.json
  def update
    if @ticket.update(ticket_params)
      render :show, status: :ok, location: @ticket
    else
      render json: @ticket.errors, status: :unprocessable_entity
    end
  end

  # DELETE api/v1/tickets/1
  # DELETE api/v1/tickets/1.json
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
    params.require(:ticket).permit(:from_email, :customer_name, :title, :agent_id, :status_id, :body)
  end
end
