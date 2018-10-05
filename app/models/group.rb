class Group < ApplicationRecord
  validates :name, presence: true

  has_many :users,     through: :members
  has_many :members
  # has_many :members, dependent: :destroy
  accepts_nested_attributes_for :members
  # accepts_nested_attributes_for :members, allow_destroy: true
end
