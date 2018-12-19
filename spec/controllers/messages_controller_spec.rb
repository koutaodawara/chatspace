require 'rails_helper'

describe MessagesController, type: :controller do

  let(:group) { create(:group) }
  let(:user)  { create(:user) }

  describe 'GET #index' do
    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      example '@messageがあるか' do
        # assignsは直前リクエスト内で定義した変数を参照できる
        # beforeでget :index としているので、ここでは
        # indexアクションの変数を持ってこれる状態となってる
        expect(assigns(:message)).to be_a_new(Message)
      end

      example '@groupがあるか' do
        expect(assigns(:group)).to eq(group)
      end

      example '該当するビューが描画されてるか' do
        expect(response).to render_template(:index)
      end
    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end

      example '意図したビューにリダイレクトできてるか' do
        # beforeでindexにリクエストを出しているので
        # responseはindexアクションで描画されるビューを持ってる
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    let(:params) {{ group_id: group.id, user_id: user.id, message: attributes_for(:message) }}

    context 'log in' do
      before do
        login user
      end
      context 'can save' do
        # expectの引数に渡す予定のものをsubjectと名付けて定義している
        # 内容は「postメソッドでcreateアクションをリクエストした結果」
        subject {
          post :create,
          params: params
        }

        example 'メッセージの数が増えたかどうか' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        example '意図したビューが表示されるかどうか' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        # わざとバリデーションに引っかかるための変数invalid_paramsを定義しておく
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, body: nil, image: nil) }}
        subject {
          post :create,
          params: invalid_params
        }

        example 'メッセージの数が増えなかったかどうか' do
          expect{ subject }.not_to change(Message, :count)
        end

        example '意図したビュー(index)が描画されるかどうか' do
          subject
          expect(response).to render_template(:index)
        end
      end
    end

    context 'not log in' do
      example '意図したビュー(ログイン画面)へリダイレクトしているかどうか' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

end
