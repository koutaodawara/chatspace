class MessagesController < ApplicationController
  def index
    @messages = Messages.all
  end

  def create
  end

  private
  def message_params
  end
end
