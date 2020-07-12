class UsersController < ApplicationController

  def index
    return nil if params[:keyword] == ""
    # group = Group.find(params[:group_id])

    usersA = User.where(['name LIKE ?', "%#{params[:keyword]}%"]).where.not(id: current_user.id).limit(10)
    usersB = User.where(id: params[:user_ids])
    @users = usersA - usersB

    # respond_to do |format|
    #   format.json
    # end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
  
end
