class Group < ApplicationRecord

  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages

  # validates :name, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: {case_sensitive: true}

  def show_last_message
    last_message = messages.last
    if last_message.present?
      if last_message.text?
        last_message.text
      else
        "画像が投稿されています。"
      end
    else
      "まだメッセージはありません。"
    end
  end

end
