require 'rails_helper'

# Rspec.describe Message, type: :model do
  describe '#create' do

    context 'can save' do
      example 'メッセージがあれば保存できる' do
        message = build(:message, image: nil)
        expect(message).to be_valid
      end

      example '画像があれば保存できる' do
        message = build(:message, body: nil)
        expect(message).to be_valid
      end

      example '画像とメッセージがあれば保存できる' do
        message = build(:message)
        expect(message).to be_valid
      end
    end

    context 'cant save' do
      example 'メッセージも画像も無いと保存できない' do
        message = build(:message, body: nil, image: nil)
        message.valid?
        expect(message.errors[:body_or_image]).to include('を入力してください')
      end

      example 'group_idが無いと保存できない' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end

      example 'user_idが無いと保存できない' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end

  end
# end
