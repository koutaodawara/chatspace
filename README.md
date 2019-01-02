# README
EXP試験を突破するため、ChatSpaceのエラー問題を作りました！！

ChatSpace作成後に解いてみてください

## 事前準備

適当なディレクトリでclone

`$ git clone https://github.com/KazYam1001/error-chat.git`

cloneしたディレクトリでいつものコマンド

`$ bundle`

`$ bundle exec rake db:create`

`$ bundle exec rake db:migrate`

**gemが古いので警告が色々出る可能性がありますが、エラーでなければ気にせず進めて下さい**

## 進め方
アプリ内に以下のファイルがあります

__questions.txt(問題)__

__answers.txt(解答)__

questions.txtにエラーの内容が書かれているので、順番に解消してください

## answers.txt
解答の読み方です。以下の形式で書かれています
```
aaa/bbb.rb
  ①l99 hoge => fuga
  ②l55 以下を追加
    puts "EXPメンターになるぞ！"
```
1行目は編集すべきファイル名です

一部問題の順番と編集するファイルの順番が一致してないのでご注意を！

①、②...はquestionsの問題番号を表しています

l99やl55はファイル内で何行目を編集すればいいかを表しています
