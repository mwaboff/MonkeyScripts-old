# == Schema Information
#
# Table name: scripts
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  user_id     :string(255)      not null
#  description :text
#  code        :text
#  downloads   :integer          default(0)
#  created_at  :datetime
#  updated_at  :datetime
#

require 'test_helper'

class ScriptTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
