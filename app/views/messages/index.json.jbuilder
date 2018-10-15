json.array! @messages do |message|
  json.user_name  message.user.name
  json.body       message.body
  json.image      message.image
  json.created_at message.created_at.to_s
end
