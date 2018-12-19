json.body       @message.body
json.image      @message.image
json.user.name  @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")
json.user_id    @message.user.id
json.group_id   @message.group.id
