class MemoryPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user: user)
    end
  end

  def home?
  	return true
  end

  def create?
  	return true
  end

  def show?
  	return true
  end

  def update?
  	record.user == user
  end

  def destroy?
    record.user == user
  end
end