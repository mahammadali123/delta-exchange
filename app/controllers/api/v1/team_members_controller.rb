module Api
    module V1
        class TeamMembersController < ApplicationController   
            protect_from_forgery with: :null_session
            
            def index
                members=TeamMember.all
                render json: TeamMemberSerializer.new(members).serialized_json
            end

            def new
                
            end

            def create
                member=TeamMember.find_by(name: team_member_params[:name])
                
                if member
                    render json:{status: 422,message: "Member Creation Failed."}
                else
                    member=TeamMember.new(team_member_params)
                    if member.save
                        render json:{status: 200,message: "Member Successfully Created."}
                    else
                        render json:{status: 422,message: "Member Creation Failed."}
                    end
                end
            end

            def show
                
            end

            def edit
                logger.debug "#{params[:id]}"
                member=TeamMember.find_by(id: params[:id]);
                if member.destroy
                    render json:{status:200,message: "Member Successfully Destroyed."}
                else
                    render json:{status:200,message: "Member Deletion Failed."}
                end
            end
            private

            def team_member_params
                params.require(:team_member).permit(:name,:company,:status,:last_update,:notes)
            end
            
        end
    end
end