class MessagesController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
    # @g_users = @group.users
    @messages = @group.messages.includes(:user)
    @message = Message.new
  end

  def create
    @group = Group.find(params[:group_id])
    @message = @group.messages.new(message_params)

    if @message.save
      respond_to do |format|
        format.html {
          redirect_to group_messages_path(@group), notice: "メッセージが送信されました"
        }
        format.json
      end
    else
      # respond_to do |format|
        # format.html {
          @messages = @group.messages.includes(:user)
          flash.now[:alert] = 'メッセージを入力してください。'
          render :index
        # }
        # format.json
      # end
    end
  end

  private

  def message_params
    params.require(:message).permit(:text, :image).merge(user_id: current_user.id)
  end

end
