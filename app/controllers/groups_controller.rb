class GroupsController < ApplicationController
  before_action :get_current_group, only: [:edit, :update]

  def index
    @groups = current_user.groups
  end

  def new
    # グループ新規作成画面
    @group = Group.new
    @group.users << current_user
  end

  def create
    # グループをDBに保存
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: "グループを作成しました"
    else
      render :new
    end
  end

  def update
    # グループ編集をDBに反映
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to root_path, notice: "グループを編集しました"
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, { user_ids: [] } )
  end

  def get_current_group
    @group = Group.find(params[:id])
  end
end
