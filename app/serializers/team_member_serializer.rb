class TeamMemberSerializer
    include FastJsonapi::ObjectSerializer
    attributes :name, :company, :status, :last_update, :notes
  end
  