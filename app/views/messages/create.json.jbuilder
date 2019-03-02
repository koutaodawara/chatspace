json.message_id @message.id
json.body       @message.body
json.image      @message.image_url
json.user_name  @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")
