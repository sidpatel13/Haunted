class RoomsController < ApplicationController

  def generate
    sample_pool = [*"a".."z"] + [*"0".."9"]
    room_session = sample_pool.sample(6).join("")
    redirect_to "/#{room_session}"
  end

  def show
    @room_session = params[:room_session]
    @show_game = true
  end

  def sandbox
    @js = "sandbox"
    @show_game = true
    render :show
  end

end
