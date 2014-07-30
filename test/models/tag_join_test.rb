# == Schema Information
#
# Table name: tag_joins
#
#  id         :integer          not null, primary key
#  script_id  :integer          not null
#  tag_id     :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

require 'test_helper'

class TagJoinTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
