class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  # ファイルを800x800に変換する
  process resize_to_fit: [800, 800]
  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
end
