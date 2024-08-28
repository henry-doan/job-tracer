class Api::InterviewController < ApplicationController
  before_action :set_jobapp
  before_action :set_interview, only: [:show, :update, :destroy]

  def index
    render json: @jobapp.interviews
  end  
  
  def show
    render json: @interview
  end
  
  def create
    @interview = @jobapp.interviews.new(interview_params)
    if @interview.save
      render json: @interview
    else
      render json: { errors: @interview.errors }, status: :unprocessable_entity
    end
  end
  
  def update
    if @interview.update(interview_params)
      render json: @interview
    else
      render json: { errors: @interview.errors }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @interview.destroy
    render json: { message: 'Note deleted' }
  end  

  private
    def set_jobapp
      @jobapp = Jobapp.find(params[:jobapp_id])
    end

    def set_interview
      @interview = @jobapp.interviews.find(params[:id])
    end

    def interview_params
      params.require(:interview).permit(:stage, :when)
    end
end
