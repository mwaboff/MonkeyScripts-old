# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  tag_name   :string(255)      not null
#  created_at :datetime
#  updated_at :datetime

class Tag < ActiveRecord::Base
  validates :tag_name, presence: true, uniqueness: true

  has_many(:tag_joins)
  has_many(:scripts,
    through: :tag_joins,
    source: :script)
end