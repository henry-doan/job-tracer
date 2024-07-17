class Api::NotesController < ApplicationController
  before_action :set_jobapp
  before_action :set_note, only: [:show, :update, :destroy]

  def index
    render json: @jobapp.notes
  end  
  
  def show
    render json: @note
  end
  
  def create
    @note = @jobapp.notes.new(note_params)
    if @note.save
      render json: @note
    else
      render json: { errors: @note.errors }, status: :unprocessable_entity
    end
  end
  
  def update
    if @note.update(note_params)
      render json: @note
    else
      render json: { errors: @note.errors }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @note.destroy
    render json: { message: 'Note deleted' }
  end  

  private
    def set_jobapp
      @jobapp = Jobapp.find(params[:jobapp_id])
    end

    def set_note
      @note = @jobapp.notes.find(params[:id])
    end

    def note_params
      params.require(:note).permit(:subject, :body)
    end
end
