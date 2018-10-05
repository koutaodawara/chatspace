class GroupsController < ApplicationController
  def new
    # グループ新規作成画面
    @group = Group.new
    @group.users << current_user
  end

  def create
    # グループをDBに保存
    @group = Group.new(group_params)
    if @group.save
      user_ids = user_ids_params[:user_ids]
      user_ids.each do |id|
        new_group_id = Group.last.id
        Member.create(user_id: id, group_id: new_group_id)
      end
      redirect_to root_path, notice: "グループを作成しました"
    else
      render :new
    end
  end

  def edit
    # グループ編集画面
  end

  def update
    # グループ編集をDBに反映
  end

  private
  def group_params
    params.require(:group).permit(:name)
  end

  def user_ids_params
    params.require(:group).permit(user_ids: [])
  end
end
