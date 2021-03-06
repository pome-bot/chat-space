class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :group_users
  has_many :groups, through: :group_users
  has_many :messages

  validates :name, presence: true, uniqueness: {case_sensitive: true}
  # validates :name, presence: true, uniqueness: true

  # validates :email, presence: true, uniqueness: true  #add
  # validates :encrypted_password, presence: true       #add

  
end
