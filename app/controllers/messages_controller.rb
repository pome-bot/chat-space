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

    respond_to do |format|
      format.html
        # {
        #   if @message.save
        #     redirect_to group_messages_path(@group), notice: "メッセージが送信されました"
        #   else
        #     @messages = @group.messages.includes(:user)
        #     flash.now[:alert] = 'メッセージを入力してください。'
        #     render :index
        #   end
        # }
      format.json { @message.save }
    end
  end

  private

  def message_params
    params.require(:message).permit(:text, :image).merge(user_id: current_user.id)
  end

end
